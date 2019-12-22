function UintArrayFactory(pointers) {
  this.pointers = pointers;
}

/**
 * Create an instance of 32-bit unsigned integers typed array corresponding
 * to the C integer data type
 * @param {number|Array} input - Either the length of the array or a javascript array
 * @returns {number} The address in memory of the array
 */
UintArrayFactory.prototype.create = function() {

  let result;

  if (typeof arguments[0] === 'number') {
    let length = arguments[0];
    let a = new Uint32Array(length);
    let bytesPerElement = a.BYTES_PER_ELEMENT;
    result = Module._malloc(length * bytesPerElement);
  } else {
    let input = arguments[0];
    let length = input.length;
    let a = new Uint32Array(input);
    let bytesPerElement = a.BYTES_PER_ELEMENT;
    result = Module._malloc(length * bytesPerElement);
    Module.writeArrayToMemory(a, result);
  }

  this.pointers.push(result);
  return result;
}
