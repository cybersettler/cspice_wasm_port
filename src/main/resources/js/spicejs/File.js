const loadFile = Module.cwrap("furnsh_c", null, ["number"]);
const unloadFile = Module.cwrap("unload_c", null, ["number"]);

/**
 * Loads an individual kernel or a collection of kernels
 * @param {string} path - Path to the file
 */
function furnsh(path) {
  let dataFile = MemoryManager.factory.stringFactory.create(path);
  loadFile(dataFile);
}

/**
 * Unloads an individual kernel or a collection of kernels
 * @param {string} path - Path to the file
 */
function unload(path) {
  let dataFile = MemoryManager.factory.stringFactory.create(path);
  unloadFile(dataFile);
}
