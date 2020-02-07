const mxv_c = Module.cwrap("mxv_c", null, ["number", "number", "number"]);
const m2q_c = Module.cwrap("m2q_c", null, ["number", "number"]);

/**
 * Multiply a 3x3 double precision matrix with a 3-dimensional
 * double precision vector
 * @param {Array | number} ml - 3 x 3 double precision matrix or its address
 * @param {Array | number} vin - 3-dimensional double precision vector or its address
 * @returns {Array} 3-dimensional double presicion vector, the product of ml * vin
 */
function mxv(ml, vin) {
  let length = 3;
  let vout = MemoryManager.factory.doubleArrayFactory.create(length);
  mxv_c(ml, vin, vout);
  return new Float64Array(Module.HEAPF64.buffer, vout, length);
}

/**
 * Find a unit quaternion corresponding to a specified rotation matrix
 * @param {number} r - A rotation matrix address
 * @returns {Array} A unit quaternion representing r
 */
function m2q(r) {
  let length = 4;
  let q = MemoryManager.factory.doubleArrayFactory.create(length);
  m2q_c(r, q);
  return new Float64Array(Module.HEAPF64.buffer, q, length);
}
