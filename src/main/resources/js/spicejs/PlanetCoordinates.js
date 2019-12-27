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

/**
 * Planetocentric coordinate system:
 *
 *  -- The x-axis of the Planetocentric coordinate system for a specified body lies both in the body's equatorial plane and in the plane containing the body's prime meridian.
 *
 *  -- The z-axis is parallel to the body's mean axis of rotation and points North of the invariable plane of the solar system (regardless of the body's spin direction). The north pole is the pole of rotation.
 *
 *  -- The y-axis is defined as the cross product of the z and x axes, in that order. Thus, the frame is right-handed.
 */
