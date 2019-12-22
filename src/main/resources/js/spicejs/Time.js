const str2et_c = Module.cwrap("str2et_c", null, ["number", "number"]);
const timout_c = Module.cwrap("timout_c", null, ["number", "number"]);

/**
 * Converts a time string to ET seconds past J2000
 * @param {string} dateString - Date to convert
 * @returns {number} seconds past J2000
 */
function str2et(dateString) {
  let datePointer = MemoryManager.factory.stringFactory.create(dateString);
  let tdb = MemoryManager.factory.doubleFactory.create();
  str2et_c(datePointer, tdb);
  return Module.getValue(tdb, "double");
}

function timout() {}
