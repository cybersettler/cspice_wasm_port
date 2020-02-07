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
    let a = new Float64Array(input);
    let nDataBytes = a.length * a.BYTES_PER_ELEMENT;
    let ptr = Module._malloc(nDataBytes);
    let dataHeap = new Uint8Array(Module.HEAPU8.buffer, ptr, nDataBytes);
    dataHeap.set(new Uint8Array(a.buffer, a.byteOffset, nDataBytes));
    result = ptr;
    this.pointers.push(result);
  }

  return result;
}
