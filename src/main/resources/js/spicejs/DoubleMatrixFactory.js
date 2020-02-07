function DoubleMatrixFactory(pointers) {
  this.pointers = pointers;
}

/**
 *
 */
DoubleMatrixFactory.prototype.create = function(width, height) {

  let length = width * height;
  data = new Float64Array(length);
  let bytesPerElement = data.BYTES_PER_ELEMENT;
  let dataPointer = Module._malloc(length * bytesPerElement);
  this.pointers.push(dataPointer);

  return dataPointer;
};
