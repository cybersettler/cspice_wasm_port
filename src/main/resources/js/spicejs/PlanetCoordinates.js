const georec_c = Module.cwrap("georec_c", null, ["number", "number", "number", "number", "number", "number"]);

/**
 * Convert geodetic coordinates to rectangular coordinate
 * @param {number} lon - Geodetic longitude of point (radians)
 * @param {number} lat - Geodetic latitude of point (radians)
 * @param {number} alt - Altitude of point above the reference spheroid
 * @param {number} re - Equatorial radius of the reference spheroid
 * @param {number} f - Flattening coefficient
 * @returns {Array} Rectangular coordinates of point
 */
function georec(lon, lat, alt, re, f) {
  let rectan = georec_ptr(lon, lat, alt, re, f);
  return new Float64Array(Module.HEAPF64.buffer, rectan, 3);
}

/**
 * Convert geodetic coordinates to rectangular coordinate
 * @param {number} lon - Geodetic longitude of point (radians)
 * @param {number} lat - Geodetic latitude of point (radians)
 * @param {number} alt - Altitude of point above the reference spheroid
 * @param {number} re - Equatorial radius of the reference spheroid
 * @param {number} f - Flattening coefficient
 * @returns {number} Address of rectangular coordinates of point array
 */
function georec_ptr(lon, lat, alt, re, f) {
  let length = 3;
  let rectan = MemoryManager.factory.doubleArrayFactory.create(length);
  georec_c(lon, lat, alt, re, f, rectan);
  return rectan;
}
