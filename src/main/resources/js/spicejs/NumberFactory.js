function NumberFactory(pointers) {
  this.pointers = pointers;
}

NumberFactory.prototype.create = function(value) {
  
  let result = Module._malloc(4);
  this.pointers.push(result);
  if (typeof value !== "undefined") {
    Module.setValue(result, value, "i32");
  }
  return result;
}
