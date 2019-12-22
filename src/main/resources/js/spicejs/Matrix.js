const mxv_c = Module.cwrap("mxv_c", null, ["number", "number", "number"]);

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
