importScripts(
  '/js/spicejs/StringFactory.js',
  '/js/spicejs/DoubleFactory.js',
  '/js/spicejs/NumberFactory.js',
  '/js/spicejs/DoubleArrayFactory.js',
  '/js/spicejs/NumberArrayFactory.js',
  '/js/spicejs/UintArrayFactory.js',
  '/js/spicejs/DoubleMatrixFactory.js');

const pointers = [];

const MemoryManager = {
  factory: {
    stringFactory: new StringFactory(pointers),
    doubleFactory: new DoubleFactory(pointers),
    numberFactory: new NumberFactory(pointers),
    doubleArrayFactory: new DoubleArrayFactory(pointers),
    numberArrayFactory: new NumberArrayFactory(pointers),
    uintArrayFactory: new UintArrayFactory(pointers),
    doubleMatrixFactory: new DoubleMatrixFactory(pointers)
  },
  freeMemory: function() {

    let last;
    while (pointers.length)  {
      last = pointers.pop();
      Module._free(last);
    }
  }
}
