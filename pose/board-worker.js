// Experimental 2D patch tracking only; no object recognition or network access.
export const BOARD_TRACK_VERSION = "patch-pair-v1";
function patch(image, w, h, p, r = 7) {
  const x = Math.round(p.x),
    y = Math.round(p.y);
  if (x - r < 0 || y - r < 0 || x + r >= w || y + r >= h) return null;
  const values = [];
  let sum = 0,
    squares = 0;
  for (let j = -r; j <= r; j++)
    for (let i = -r; i <= r; i++) {
      const v = image[(y + j) * w + x + i];
      values.push(v);
      sum += v;
      squares += v * v;
    }
  const mean = sum / values.length,
    energy = squares - sum * mean;
  if (energy / values.length < 25) return null;
  return { values: values.map((v) => v - mean), energy, r };
}
function score(template, image, w, h, x, y) {
  const r = template.r;
  if (x - r < 0 || y - r < 0 || x + r >= w || y + r >= h) return -1;
  let sum = 0,
    squares = 0,
    dot = 0,
    k = 0;
  for (let j = -r; j <= r; j++)
    for (let i = -r; i <= r; i++) {
      const v = image[(y + j) * w + x + i];
      sum += v;
      squares += v * v;
      dot += v * template.values[k++];
    }
  const energy = squares - (sum * sum) / k;
  return energy > 1 ? dot / Math.sqrt(template.energy * energy) : -1;
}
function search(template, image, w, h, point, radius) {
  const cx = Math.round(point.x),
    cy = Math.round(point.y),
    candidates = [];
  let best = { x: cx, y: cy, score: -1 };
  for (let y = cy - radius; y <= cy + radius; y += 2)
    for (let x = cx - radius; x <= cx + radius; x += 2) {
      const s = score(template, image, w, h, x, y);
      const c = { x, y, score: s };
      candidates.push(c);
      if (s > best.score) best = c;
    }
  const coarse = best;
  for (let y = coarse.y - 1; y <= coarse.y + 1; y++)
    for (let x = coarse.x - 1; x <= coarse.x + 1; x++) {
      const s = score(template, image, w, h, x, y);
      if (s > best.score) best = { x, y, score: s };
    }
  const second = Math.max(
    -1,
    ...candidates
      .filter((c) => Math.hypot(c.x - best.x, c.y - best.y) > 5)
      .map((c) => c.score),
  );
  return { ...best, margin: best.score - second };
}
export function trackPair(previous, next, anchor, w, h, points, anchorPoints) {
  if (
    previous.length !== w * h ||
    next.length !== w * h ||
    anchor.length !== w * h ||
    points.length !== 2 ||
    anchorPoints.length !== 2
  )
    return { state: "lost", reason: "input" };
  const result = [];
  let quality = 1;
  for (let i = 0; i < 2; i++) {
    const source = patch(previous, w, h, points[i]),
      initial = patch(anchor, w, h, anchorPoints[i]);
    if (!source || !initial) return { state: "lost", reason: "texture" };
    const best = search(source, next, w, h, points[i], 24);
    if (best.score < 0.8 || best.margin < 0.025)
      return { state: "lost", reason: "appearance" };
    if (score(initial, next, w, h, best.x, best.y) < 0.5)
      return { state: "lost", reason: "anchor-drift" };
    const target = patch(next, w, h, best);
    if (!target) return { state: "lost", reason: "texture" };
    const back = search(target, previous, w, h, best, 24);
    if (
      back.score < 0.8 ||
      Math.hypot(back.x - points[i].x, back.y - points[i].y) > 2.5
    )
      return { state: "lost", reason: "consistency" };
    quality = Math.min(quality, best.score);
    result.push({ x: best.x, y: best.y });
  }
  const distance = (p) => Math.hypot(p[1].x - p[0].x, p[1].y - p[0].y);
  const before = distance(points),
    after = distance(result);
  const angle = (p) => Math.atan2(p[1].y - p[0].y, p[1].x - p[0].x);
  const delta = Math.atan2(
    Math.sin(angle(result) - angle(points)),
    Math.cos(angle(result) - angle(points)),
  );
  if (
    after < 12 ||
    after / before < 0.85 ||
    after / before > 1.15 ||
    Math.abs(delta) > Math.PI / 9
  )
    return { state: "lost", reason: "geometry" };
  return { state: "tracked", points: result, quality };
}
let previous, anchor, width, height, points, anchorPoints;
if (typeof self !== "undefined" && typeof document === "undefined")
  self.onmessage = ({ data }) => {
    const { id, type } = data;
    try {
      if (type === "seed") {
        width = data.width;
        height = data.height;
        previous = new Uint8Array(data.gray);
        anchor = previous.slice();
        points = data.points;
        anchorPoints = points.map((p) => ({ ...p }));
        if (!points.every((p) => patch(previous, width, height, p)))
          throw new Error("texture");
        self.postMessage({ id, state: "manual", points });
      } else if (type === "track" && previous) {
        const next = new Uint8Array(data.gray),
          result = trackPair(
            previous,
            next,
            anchor,
            width,
            height,
            points,
            anchorPoints,
          );
        if (result.state === "tracked") {
          previous = next;
          points = result.points;
        } else previous = undefined;
        self.postMessage({ id, ...result });
      } else throw new Error("not-ready");
    } catch {
      self.postMessage({ id, state: "lost", reason: "input" });
    }
  };
