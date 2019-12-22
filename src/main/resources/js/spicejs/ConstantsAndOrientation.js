const bodvrd_c = Module.cwrap("bodvrd_c", null, ["number", "number", "number", "number", "number"]);
const pxform_c = Module.cwrap("pxform_c", null, ["number", "number", "number", "number"]);

/**
 * Fetch from the kernel pool the double precision values of an item associated with a body
 * @param {string} body - Body name
 * @param {string} property - Item for which values are desired. ("RADII", "NUT_PREC_ANGLES", etc.)
 * @param {number} maxReturnedValues - Maximum number of values that may be returned
 * @returns {Array} Array of values associated with the requested kernel variable
 */
function bodvrd(body, property, maxReturnedValues) {
    let bodyPointer = MemoryManager.factory.stringFactory.create(body);
    let propertyPointer = MemoryManager.factory.stringFactory.create(property);
    let dim = MemoryManager.factory.numberFactory.create();
    let values = MemoryManager.factory.doubleArrayFactory.create(maxReturnedValues);

    bodvrd_c(bodyPointer, propertyPointer, maxReturnedValues, dim, values);
    let size = Module.getValue(dim, "i32");
    return new Float64Array(Module.HEAPF64.buffer, values, size);
}

/**
 * Return the matrix that transforms position vectors from one specified frame
 * to another at a specified epoch
 * @param {string} from - Name of the frame to transform from
 * @param {string} to - Name of the frame to transform to
 * @param {number} et - Epoch of the rotation matrix
 * @returns {Array} A rotation matrix
 */
function pxform(from, to, et) {
  let rotation = pxform_ptr(from, to, et);
  return new Float32Array(Module.HEAPF32.buffer, rotation, 3);
}

/**
 * Return address of the matrix that transforms position vectors from one
 * specified frame to another at a specified epoch
 * @param {string} from - Name of the frame to transform from
 * @param {string} to - Name of the frame to transform to
 * @param {number} et - Epoch of the rotation matrix
 * @returns {number} A rotation matrix address
 */
function pxform_ptr(from, to, et) {
  let fromPtr = MemoryManager.factory.stringFactory.create(from);
  let toPtr = MemoryManager.factory.stringFactory.create(to);
  let rotation = MemoryManager.factory.doubleMatrixFactory.create(3, 3);
  pxform_c(fromPtr, toPtr, et, rotation);
  return rotation;
}
