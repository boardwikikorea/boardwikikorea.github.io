// Fixed 720x400 projected geometry. No physical wheel identity or hidden-point synthesis.
const distance = (a, b) => Math.hypot(a[1] - b[1], a[2] - b[2]);
function frame(points) {
  const x = points.reduce((s, p) => s + p[1], 0) / points.length,
    y = points.reduce((s, p) => s + p[2], 0) / points.length;
  let xx = 0,
    yy = 0,
    xy = 0;
  for (const p of points) {
    const a = p[1] - x,
      b = p[2] - y;
    xx += a * a;
    yy += b * b;
    xy += a * b;
  }
  const angle = 0.5 * Math.atan2(2 * xy, xx - yy),
    ax = Math.cos(angle),
    ay = Math.sin(angle);
  const along = (p) => (p[1] - x) * ax + (p[2] - y) * ay,
    normal = (p) => Math.abs(-(p[1] - x) * ay + (p[2] - y) * ax);
  const t = points.map(along),
    lo = Math.min(...t),
    hi = Math.max(...t);
  return { along, normal, lo, hi, span: hi - lo };
}
export function groupParts(points) {
  const wheels = [];
  for (const p of [...points].sort((a, b) => b[3] - a[3]))
    if (p[0] === 0 && wheels.every((q) => distance(p, q) >= 16)) wheels.push(p);
  let best,
    score = -Infinity;
  for (let i = 0; i < wheels.length; i++)
    for (let j = i + 1; j < wheels.length; j++) {
      const a = wheels[i],
        b = wheels[j],
        span = distance(a, b);
      if (span < 24) continue;
      const ax = (b[1] - a[1]) / span,
        ay = (b[2] - a[2]) / span;
      const members = wheels
        .map((p) => ({
          p,
          t: (p[1] - a[1]) * ax + (p[2] - a[2]) * ay,
          d: Math.abs(-(p[1] - a[1]) * ay + (p[2] - a[2]) * ax),
        }))
        .filter(
          (v) =>
            v.t >= -0.15 * span &&
            v.t <= 1.15 * span &&
            v.d <= Math.max(10, 0.16 * span),
        )
        .sort(
          (a, b) => b.p[3] - (0.5 * b.d) / span - (a.p[3] - (0.5 * a.d) / span),
        )
        .slice(0, 4);
      const s =
        members.reduce((s, v) => s + v.p[3] - (0.5 * v.d) / span, 0) -
        0.0015 * span;
      if (members.length >= 2 && s > score) {
        score = s;
        best = members.map((v) => v.p);
      }
    }
  if (!best) return [];
  const f = frame(best);
  if (f.span < 24) return [];
  const ends = [];
  for (const p of points
    .filter((p) => p[0] === 1)
    .sort((a, b) => b[3] - a[3])) {
    if (
      f.along(p) < f.lo - 0.45 * f.span ||
      f.along(p) > f.hi + 0.45 * f.span ||
      f.normal(p) > Math.max(18, 0.35 * f.span)
    )
      continue;
    if (
      Math.min(...best.map((q) => distance(p, q))) > Math.max(24, 0.65 * f.span)
    )
      continue;
    if (ends.length < 2 && ends.every((q) => distance(p, q) >= 16))
      ends.push(p);
  }
  return points.filter((p) => best.includes(p) || ends.includes(p));
}
export function guardParts(raw) {
  const base = groupParts(raw),
    out = [...base],
    anchors = base.filter((p) => p[0] === 0);
  if (anchors.length < 2) return out;
  const f = frame(anchors);
  if (f.span < 24 || f.span > 216) return out;
  // Preserve recovery ordering/cap before veto, matching the frozen Python pipeline.
  const recovered = [];
  for (const p of [...raw].sort((a, b) => b[3] - a[3])) {
    if (
      p[0] !== 0 ||
      base.includes(p) ||
      p[3] < 0.4 ||
      anchors.length + recovered.length >= 4
    )
      continue;
    const nearest = Math.min(...anchors.map((q) => distance(p, q)));
    if (
      nearest >= 16 &&
      nearest <= f.span + 16 &&
      f.normal(p) <= 0.8 * f.span + 16
    )
      recovered.push(p);
  }
  for (const p of recovered) {
    const stronger = raw.filter(
      (q) => q[0] === 0 && q[3] >= 0.5 && q[3] > p[3],
    );
    let veto = false;
    for (let i = 0; i < stronger.length; i++)
      for (let j = i + 1; j < stronger.length; j++) {
        const a = stronger[i],
          b = stronger[j],
          span = distance(a, b);
        if ((!base.includes(a) && !base.includes(b)) || span < 24 || span > 200)
          continue;
        const ax = (b[1] - a[1]) / span,
          ay = (b[2] - a[2]) / span,
          t = ((p[1] - a[1]) * ax + (p[2] - a[2]) * ay) / span,
          n = Math.abs(-(p[1] - a[1]) * ay + (p[2] - a[2]) * ax);
        if (t >= 0.35 && t <= 0.65 && n <= Math.max(4, 0.3 * span)) veto = true;
      }
    if (!veto) out.push(p);
  }
  return out;
}
export function decodeParts(data, count) {
  const candidates = [];
  for (let i = 0; i < count; i++) {
    const cls = data[4 * count + i] >= data[5 * count + i] ? 0 : 1,
      score = data[(4 + cls) * count + i];
    if (score < 0.25) continue;
    candidates.push({
      cls,
      score,
      x: data[i],
      y: data[count + i],
      w: data[2 * count + i],
      h: data[3 * count + i],
      i,
    });
  }
  const kept = [];
  for (const c of candidates.sort((a, b) => b.score - a.score)) {
    if (
      kept.some((b) => {
        if (c.cls !== b.cls) return false;
        const area =
          Math.max(
            0,
            Math.min(c.x + c.w / 2, b.x + b.w / 2) -
              Math.max(c.x - c.w / 2, b.x - b.w / 2),
          ) *
          Math.max(
            0,
            Math.min(c.y + c.h / 2, b.y + b.h / 2) -
              Math.max(c.y - c.h / 2, b.y - b.h / 2),
          );
        return area / (c.w * c.h + b.w * b.h - area) > 0.7;
      })
    )
      continue;
    kept.push(c);
    if (kept.length === 12) break;
  }
  return kept
    .filter((c) => data[8 * count + c.i] >= 0.5)
    .map((c) => [
      c.cls,
      Math.max(0, Math.min(720, (data[6 * count + c.i] * 720) / 512)),
      Math.max(
        0,
        Math.min(
          400,
          ((data[7 * count + c.i] - (288 - (400 * 512) / 720) / 2) * 720) / 512,
        ),
      ),
      c.score,
      data[8 * count + c.i],
    ]);
}
// Local Canny-style connected edge support; bounded centroid, never a semantic deck mask.
export function refineEnds(rgba, width, height, points) {
  if (!points.some((p) => p[0] === 1)) return points;
  const n = width * height,
    gray = new Uint8Array(n),
    blur = new Uint8Array(n),
    gx = new Int16Array(n),
    gy = new Int16Array(n),
    mag = new Int32Array(n),
    edge = new Uint8Array(n);
  for (let i = 0; i < n; i++)
    gray[i] = Math.round(
      0.299 * rgba[4 * i] + 0.587 * rgba[4 * i + 1] + 0.114 * rgba[4 * i + 2],
    );
  const reflect = (v, size) => (v < 0 ? -v : v >= size ? 2 * size - v - 2 : v);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (let j = -1; j <= 1; j++)
        for (let i = -1; i <= 1; i++)
          sum +=
            gray[reflect(y + j, height) * width + reflect(x + i, width)] *
            (i === 0 ? 2 : 1) *
            (j === 0 ? 2 : 1);
      blur[y * width + x] = Math.floor((sum + 8) / 16);
    }
  const at = (x, y) =>
    blur[
      Math.max(0, Math.min(height - 1, y)) * width +
        Math.max(0, Math.min(width - 1, x))
    ];
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const k = y * width + x;
      gx[k] =
        at(x + 1, y - 1) +
        2 * at(x + 1, y) +
        at(x + 1, y + 1) -
        at(x - 1, y - 1) -
        2 * at(x - 1, y) -
        at(x - 1, y + 1);
      gy[k] =
        at(x - 1, y + 1) +
        2 * at(x, y + 1) +
        at(x + 1, y + 1) -
        at(x - 1, y - 1) -
        2 * at(x, y - 1) -
        at(x + 1, y - 1);
      mag[k] = Math.abs(gx[k]) + Math.abs(gy[k]);
    }
  const value = (x, y) =>
      x < 0 || x >= width || y < 0 || y >= height ? 0 : mag[y * width + x],
    stack = [];
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const k = y * width + x,
        m = mag[k];
      if (m <= 30) continue;
      const ax = Math.abs(gx[k]),
        ay = Math.abs(gy[k]);
      let peak;
      if (ay < ax * 0.41421356237)
        peak = m > value(x - 1, y) && m >= value(x + 1, y);
      else if (ay > ax * 2.41421356237)
        peak = m > value(x, y - 1) && m >= value(x, y + 1);
      else {
        const sign = gx[k] * gy[k] < 0 ? -1 : 1;
        peak = m > value(x - sign, y - 1) && m > value(x + sign, y + 1);
      }
      if (peak) {
        edge[k] = m > 90 ? 2 : 1;
        if (m > 90) stack.push(k);
      }
    }
  const neighbors = (k, fn) => {
    const x = k % width,
      y = Math.floor(k / width);
    for (let j = -1; j <= 1; j++)
      for (let i = -1; i <= 1; i++)
        if (
          (i || j) &&
          x + i >= 0 &&
          x + i < width &&
          y + j >= 0 &&
          y + j < height
        )
          fn(k + j * width + i);
  };
  while (stack.length) {
    const k = stack.pop();
    neighbors(k, (q) => {
      if (edge[q] === 1) {
        edge[q] = 2;
        stack.push(q);
      }
    });
  }
  const dilated = new Uint8Array(n),
    closed = new Uint8Array(n);
  for (let k = 0; k < n; k++)
    if (edge[k] === 2) {
      dilated[k] = 1;
      neighbors(k, (q) => {
        dilated[q] = 1;
      });
    }
  for (let k = 0; k < n; k++) {
    let yes = !!dilated[k];
    neighbors(k, (q) => {
      if (!dilated[q]) yes = false;
    });
    if (yes) closed[k] = 1;
  }
  const labels = new Int32Array(n),
    components = [[]];
  for (let k = 0; k < n; k++)
    if (closed[k] && !labels[k]) {
      const id = components.length,
        list = [];
      stack.push(k);
      labels[k] = id;
      while (stack.length) {
        const q = stack.pop();
        list.push(q);
        neighbors(q, (r) => {
          if (closed[r] && !labels[r]) {
            labels[r] = id;
            stack.push(r);
          }
        });
      }
      components.push(list);
    }
  return points.map((p) => {
    if (p[0] !== 1) return p;
    let best,
      nearest = Infinity;
    for (const list of components.slice(1)) {
      let min = Infinity,
        sx = 0,
        sy = 0,
        count = 0,
        xlo = Infinity,
        xhi = -Infinity,
        ylo = Infinity,
        yhi = -Infinity;
      for (const k of list) {
        const x = k % width,
          y = Math.floor(k / width),
          d = (x - p[1]) ** 2 + (y - p[2]) ** 2;
        min = Math.min(min, d);
        if (d <= 576) {
          sx += x;
          sy += y;
          count++;
          xlo = Math.min(xlo, x);
          xhi = Math.max(xhi, x);
          ylo = Math.min(ylo, y);
          yhi = Math.max(yhi, y);
        }
      }
      if (min > 64 || count < 8 || Math.max(xhi - xlo, yhi - ylo) < 12)
        continue;
      const x = sx / count,
        y = sy / count;
      if (Math.hypot(x - p[1], y - p[2]) <= 16 && min < nearest) {
        nearest = min;
        best = [1, x, y, ...p.slice(3)];
      }
    }
    return best ?? p;
  });
}
export function resizePixels(rgba, width, height, targetWidth, targetHeight) {
  if (width === targetWidth && height === targetHeight) return rgba;
  const result = new Uint8ClampedArray(targetWidth * targetHeight * 4);
  for (let y = 0; y < targetHeight; y++)
    for (let x = 0; x < targetWidth; x++) {
      const sx = ((x + 0.5) * width) / targetWidth - 0.5,
        sy = ((y + 0.5) * height) / targetHeight - 0.5;
      const x0 = Math.floor(sx),
        y0 = Math.floor(sy),
        fx = sx - x0,
        fy = sy - y0;
      for (let c = 0; c < 3; c++) {
        const pixel = (dx, dy) =>
          rgba[
            (Math.max(0, Math.min(height - 1, y0 + dy)) * width +
              Math.max(0, Math.min(width - 1, x0 + dx))) *
              4 +
              c
          ];
        // Round each separable pass, matching the existing ARM OpenCV image pipeline.
        const top = Math.round(pixel(0, 0) * (1 - fx) + pixel(1, 0) * fx);
        const bottom = Math.round(pixel(0, 1) * (1 - fx) + pixel(1, 1) * fx);
        result[(y * targetWidth + x) * 4 + c] = Math.round(
          top * (1 - fy) + bottom * fy,
        );
      }
      result[(y * targetWidth + x) * 4 + 3] = 255;
    }
  return result;
}
export function modelInput(rgba) {
  const resized = resizePixels(rgba, 720, 400, 512, 284),
    n = 512 * 288,
    input = new Float32Array(n * 3);
  input.fill(114 / 255);
  for (let y = 0; y < 284; y++)
    for (let x = 0; x < 512; x++)
      for (let c = 0; c < 3; c++)
        input[c * n + (y + 2) * 512 + x] = resized[(y * 512 + x) * 4 + c] / 255;
  return input;
}

// Select only after independent postprocessing, preserving the deck baseline.
export function combineComponents(deck, wheel) {
  return [
    ...wheel.filter((p) => p[0] === 0),
    ...deck.filter((p) => p[0] === 1),
  ];
}
