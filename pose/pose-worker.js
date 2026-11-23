/* Local-only inference. No user-media network API: only fixed runtime/model GETs. */
let model;
self.onmessage = async ({ data }) => {
  const { id, type, bitmap } = data;
  try {
    if (type === "init") {
      const { FilesetResolver, PoseLandmarker } =
        await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/vision_bundle.mjs");
      const files = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm",
      );
      model = await PoseLandmarker.createFromOptions(files, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
          delegate: "CPU",
        },
        canvas: new OffscreenCanvas(1, 1),
        runningMode: "IMAGE",
        numPoses: 2,
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        outputSegmentationMasks: false,
      });
      self.postMessage({ id });
    } else if (type === "detect" && model) {
      const result = model.detect(bitmap);
      self.postMessage({
        id,
        poses: result.landmarks.map((points) =>
          points.map(({ x, y, visibility }) => ({ x, y, visibility })),
        ),
      });
    } else throw new Error("not-ready");
  } catch {
    self.postMessage({ id, error: true });
  } finally {
    bitmap?.close();
  }
};
