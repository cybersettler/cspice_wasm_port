function DoubleFactory(pointers) {
  this.pointers = pointers;
}

DoubleFactory.prototype.create = function(value) {
  // alloc 8 bytes of memory for value (64-bit floating point number)
  let result = Module._malloc(8);
  this.pointers.push(result);
  if (typeof value !== "undefined") {
    Module.setValue(result, value, "double");
  }
  return result;
}
