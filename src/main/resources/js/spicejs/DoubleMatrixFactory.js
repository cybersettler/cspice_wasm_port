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

  let matrix = new Uint32Array(height);
  matrix.forEach(function(item, i) {
    matrix[i] = dataPointer + i * data.BYTES_PER_ELEMENT * width;
  });

  let matrixPointerBytes = matrix.length * matrix.BYTES_PER_ELEMENT;
  let result = Module._malloc(matrixPointerBytes);
  this.pointers.push(result);
  return result;
};
