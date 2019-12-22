function DoubleArrayFactory(pointers) {
  this.pointers = pointers;
}

/**
 * Create an instance of a Float64 typed array corresponding
 * to the C double data type
 * @param {number|Array} input - Either the length of the array or a javascript array
 * @returns {number} The address in memory of the array
 */
DoubleArrayFactory.prototype.create = function() {

  let result;

  if (typeof arguments[0] === 'number') {
    let length = arguments[0];
    let a = new Float64Array(length);
    let bytesPerElement = a.BYTES_PER_ELEMENT;
    result = Module._malloc(length * bytesPerElement);
    this.pointers.push(result);
  } else {
    let input = arguments[0];
    let length = input.length;
    let a = new Float64Array(input);
    let bytesPerElement = a.BYTES_PER_ELEMENT;
    result = Module._malloc(length * bytesPerElement);
    Module.writeArrayToMemory(a, result);
    this.pointers.push(result);
  }

  return result;
}
