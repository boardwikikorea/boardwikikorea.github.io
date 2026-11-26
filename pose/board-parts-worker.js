// Local experimental two-class landmark model, fixed version and single-thread WASM.
import * as ort from "./vendor/onnxruntime-1.23.2/ort.wasm.min.mjs";
import {
  decodeParts,
  combineComponents,
  guardParts,
  refineEnds,
  modelInput,
  resizePixels,
} from "./board-parts-core.mjs?v=e6beb08c-c3bdd538-v1";
let sessions;
self.onmessage = async ({ data }) => {
  const bitmap = data.bitmap;
  try {
    if (data.type === "init") {
      ort.env.wasm.numThreads = 1;
      ort.env.wasm.wasmPaths = new URL(
        "./vendor/onnxruntime-1.23.2/",
        self.location.href,
      ).href;
      sessions = {};
      for (const [kind, file] of Object.entries({
        wheel: "board-wheel-e6beb08c.onnx",
        deck: "board-deck-c3bdd538.onnx",
      })) {
        sessions[kind] = await ort.InferenceSession.create(
          `/pose/models/${file}`,
          { executionProviders: ["wasm"] },
        );
      }
      self.postMessage({ ready: true });
      return;
    }
    if (!sessions || !bitmap) throw new Error("not ready");
    const crop = new OffscreenCanvas(bitmap.width, bitmap.height),
      cropCtx = crop.getContext("2d", { willReadFrequently: true });
    cropCtx.drawImage(bitmap, 0, 0);
    const rgba = resizePixels(
        cropCtx.getImageData(0, 0, bitmap.width, bitmap.height).data,
        bitmap.width,
        bitmap.height,
        720,
        400,
      ),
      input = modelInput(rgba);
    const components = {};
    // Each model keeps its own geometry evidence before selecting its component.
    for (const [kind, session] of Object.entries(sessions)) {
      const result = await session.run({
        [session.inputNames[0]]: new ort.Tensor(
          "float32",
          input,
          [1, 3, 288, 512],
        ),
      });
      const output = result[session.outputNames[0]];
      components[kind] = refineEnds(
        rgba,
        720,
        400,
        guardParts(decodeParts(output.data, output.dims[2])),
      );
    }
    self.postMessage({
      points: combineComponents(components.deck, components.wheel),
    });
  } catch {
    self.postMessage({ error: "parts inference failed" });
  } finally {
    bitmap?.close();
  }
};
