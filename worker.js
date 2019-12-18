importScripts('cspice.js');

const loadEphemerisFile = Module.cwrap("furnsh_c", null, ["number"]);
const stringToEphemerisTime = Module.cwrap("str2et_c", null, ["number", "number"]);
const computeState = Module.cwrap("spkezr_c", null, ["number", "number", "number", "number", "number", "number", "number"]);
const pointers = [];

onmessage = function() {
  //let leapFile = initString("./data/cook_01.tls");
  //let dataFile = initString("./data/cook_01.bsp");
  let dataFile = initString("/home/web_user/data/kernel_metadata.txt");
  let dateString = initString("1990 NOV 21 02:40:21.3");
  let tdb = initDouble();
  let target = initString("SUN");
  let frame = initString("J2000");
  let correction = initString("LT+S");
  let observer = initString("EARTH");
  let state = initDoubleArray(6);
  let lightTime = initDouble();

  // Load spice files
  // loadEphemerisFile(leapFile);
  loadEphemerisFile(dataFile);

  // Convert UTC time to ephemeris time, or Barycentric Dynamical Time (TDB),
  stringToEphemerisTime(dateString, tdb);
  let tdbSeconds = Module.getValue(tdb, "double");
  console.log("tdb seconds after:", tdbSeconds);
  // Retrieve state vector from the SPK file at your requested time
  computeState(target, tdbSeconds, frame, correction, observer, state, lightTime);
  // Display results
  var output_array = new Float64Array(Module.HEAPF64.buffer, state, 6); // extract data to another JS array
  console.log("Sun position observed from Earth:");
  console.log("X:", output_array[0]);
  console.log("Y:", output_array[1]);
  console.log("Z:", output_array[2]);
  console.log("light time:", Module.getValue(lightTime, "double"));
  postMessage({state: output_array});
  freeMemory();
}

function initString(str) {
  var len = str.length; // one byte per character
  var result = Module._malloc(len*1);
  var convertedString  = new Uint8Array(toUTF8Array(str));
  Module.HEAPU8.set(convertedString, result);
  pointers.push(result);
  return result;
}

function initDoubleArray(length) {
  let a = new Float64Array(length);
  let bytesPerElement = a.BYTES_PER_ELEMENT;
  let result = Module._malloc(length * bytesPerElement);
  pointers.push(result);
  // Module.HEAPF64.set(a, result/bytesPerElement);
  return result;
}

function initDouble(value) {
  // alloc 8 bytes of memory for value (64-bit floating point number)
  let result = Module._malloc(8);
  pointers.push(result);
  if (typeof value !== "undefined") {
    Module.setValue(result, value, "double");
  }
  return result;
}

function freeMemory() {
  pointers.forEach(item => Module._free(item));
}

function toUTF8Array(str) {
  var utf8 = [];
  for (var i=0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);
    if (charcode < 0x80) utf8.push(charcode);
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
    }
    else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode>>6) & 0x3f), 0x80 | (charcode & 0x3f));
    }
    else {
      i++;
      charcode = 0x10000 + (((charcode & 0x3ff)<<10) | (str.charCodeAt(i) & 0x3ff));
      utf8.push(0xf0 | (charcode >>18), 0x80 | ((charcode>>12) & 0x3f), 0x80 | ((charcode>>6) & 0x3f), 0x80 | (charcode & 0x3f));
    }
  }
  return utf8;
}
