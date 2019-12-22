function StringFactory(pointers) {
  this.pointers = pointers;
}

StringFactory.prototype.create = function(str) {

  let maxLength = lengthBytesUTF8(str) + 1; // one byte per character
  let result = Module._malloc(maxLength);
  this.pointers.push(result);
  Module.stringToUTF8(str, result, maxLength); // Copies given javascript string object to emscripten HEAP address given by the pointer
  return result;
}
