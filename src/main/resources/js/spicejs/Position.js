const spkezr_c = Module.cwrap("spkezr_c", null, ["number", "number", "number", "number", "number", "number", "number"]);
const spkpos_c = Module.cwrap("spkpos_c", null, ["number", "number", "number", "number", "number", "number", "number"]);

/**
 * Returns the state of a target body relative to an observing body
 * @param {string} target - Target body name
 * @param {number} epoch - Observer epoch
 * @param {string} frame - Reference frame of output state vector
 * @param {string} correction - Aberration correction floating
 * @param {string} observer - Observing body name
 * @return {Object} State of target and one way light time
 */
function spkezr(target, epoch, frame, correction, observer) {
  let targetPointer = MemoryManager.factory.stringFactory.create(target);
  let framePointer = MemoryManager.factory.stringFactory.create(frame);
  let correctionPointer = MemoryManager.factory.stringFactory.create(correction);
  let observerPointer = MemoryManager.factory.stringFactory.create(observer);
  let state = MemoryManager.factory.doubleArrayFactory.create(6);
  let lightTime = MemoryManager.factory.doubleFactory.create();
  spkezr_c(targetPointer, epoch, framePointer, correctionPointer, observerPointer, state, lightTime);
  return {
    state: new Float64Array(Module.HEAPF64.buffer, state, 6),
    lightTime: Module.getValue(lightTime, "double")
  };
}

/**
 * Return the position of a target body relative to an observing body,
 * optionally corrected for light time (planetary aberration) and stellar
 * aberration
 * @param {string} target - Target body name
 * @param {number} epoch - Observer epoch
 * @param {string} frame - Reference frame of output state vector
 * @param {string} correction - Aberration correction floating
 * @param {string} observer - Observing body name
 * @return {Object} State of target and one way light time
 */
function spkpos(target, epoch, frame, correction, observer) {
  let targetPointer = MemoryManager.factory.stringFactory.create(target);
  let framePointer = MemoryManager.factory.stringFactory.create(frame);
  let correctionPointer = MemoryManager.factory.stringFactory.create(correction);
  let observerPointer = MemoryManager.factory.stringFactory.create(observer);
  let state = MemoryManager.factory.doubleArrayFactory.create(3);
  let lightTime = MemoryManager.factory.doubleFactory.create();
  spkpos_c(targetPointer, epoch, framePointer, correctionPointer, observerPointer, state, lightTime);
  return {
    position: new Float64Array(Module.HEAPF64.buffer, state, 3),
    lightTime: Module.getValue(lightTime, "double")
  };
}
