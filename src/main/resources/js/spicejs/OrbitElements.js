const conics_c = Module.cwrap("conics_c", null, ["number", "number", "number"]);
const oscelt_c = Module.cwrap("oscelt_c", null, ["number", "number", "number", "number"]);

/**
 * Determines the state (position, velocity) of an orbiting body from a set
 * of elliptic, hyperbolic, or parabolic orbital elements
 * @param {Array | number} elts - Conic elements or its address
 * @param {number} et - Input time
 * @returns {Array} State of orbiting body at et
 */
function conics(elts, et) {
  let state = conics_ptr(elts, et);
  return new Float64Array(Module.HEAPF64.buffer, state, 6);
}

/**
 * Determines the state (position, velocity) of an orbiting body from a set
 * of elliptic, hyperbolic, or parabolic orbital elements
 * @param {Array | number} elts - Conic elements or its address
 * @param {number} et - Input time
 * @returns {number} Address of state of orbiting body at et
 */
function conics_ptr(elts, et) {
  let eltsPointer;
  if (typeof elts === 'object') {
    eltsPointer = MemoryManager.factory.doubleArrayFactory.create(elts);
  } else {
    eltsPointer = elts;
  }
  let state = MemoryManager.factory.doubleArrayFactory.create(6);
  conics_c(eltsPointer, et, state);
  return state;
}

/**
 * Determine the set of osculating conic orbital elements that
 * corresponds to the state (position, velocity) of a body at some epoch
 * @param {Array | number} state - State of body at epoch of elements
 * @param {number} et - Epoch of elements
 * @param {number} mu - Gravitational parameter (GM) of primary body
 * @returns {Array} State of orbiting body at et
 */
function oscelt(state, et, mu) {
  let elts = oscelt_ptr(state, et, mu);
  return new Float64Array(Module.HEAPF64.buffer, elts, 8);
}

/**
 * Determine the set of osculating conic orbital elements that
 * corresponds to the state (position, velocity) of a body at some epoch
 * @param {Array | number} state - State of body at epoch of elements
 * @param {number} et - Epoch of elements
 * @param {number} mu - Gravitational parameter (GM) of primary body
 * @returns {number} Address of state of orbiting body at et
 */
function oscelt_ptr(state, et, mu) {
  let statePointer;
  if (typeof state === 'object') {
    statePointer = MemoryManager.factory.doubleArrayFactory.create(state);
  } else {
    statePointer = state;
  }
  let elts = MemoryManager.factory.doubleArrayFactory.create(8);
  oscelt_c(statePointer, et, mu, elts);
  return elts;
}
