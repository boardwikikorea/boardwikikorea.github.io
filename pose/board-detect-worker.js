/* Local inference only. Classic worker required by MediaPipe's WASM loader. */
let detector;
self.onmessage = async ({ data }) => {
  try {
    if (data.type === "init") {
      const { FilesetResolver, ObjectDetector } =
        await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/vision_bundle.mjs");
      const files = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm",
      );
      detector = await ObjectDetector.createFromOptions(files, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float32/1/efficientdet_lite0.tflite",
          delegate: "CPU",
        },
        runningMode: "IMAGE",
        scoreThreshold: 0.25,
        maxResults: 5,
        categoryAllowlist: ["skateboard"],
      });
      self.postMessage({ ready: true });
    } else if (data.type === "detect" && detector) {
      const result = detector.detect(data.bitmap);
      self.postMessage({
        boxes: result.detections.map((d) => ({
          ...d.boundingBox,
          score: d.categories[0].score,
        })),
      });
    } else throw new Error("not-ready");
  } catch {
    self.postMessage({ error: true });
  } finally {
    data.bitmap?.close();
  }
};
