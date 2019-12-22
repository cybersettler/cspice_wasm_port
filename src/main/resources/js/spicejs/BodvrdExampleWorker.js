importScripts('/js/spicejs/cspice.js',
              '/js/spicejs/MemoryManager.js',
              '/js/spicejs/File.js',
              '/js/spicejs/Time.js',
              '/js/spicejs/ConstantsAndOrientation.js',
              '/js/spicejs/PlanetCoordinates.js',
              '/js/spicejs/Matrix.js');

onmessage = function() {

  let dataFile = "/home/web_user/data/kernel_metadata.txt";
  let body = "EARTH";
  let property = "RADII";
  let dateString = "2019 NOV 21 02:40:21.3";

  furnsh(dataFile);

  let lon = 0;
  let lat = 0;

  let abc = bodvrd(body, property, 3);
  let equatr = abc[0];
  let polar = abc[2];
  let f = (equatr - polar) / equatr;
  let et = str2et(dateString);

  let epos = georec_ptr(lon, lat, 0.0, equatr, f);
  let rotate = pxform_ptr("ITRF93", "J2000", et);
  let jpos = mxv(rotate, epos);

  console.log("jpos", jpos);

  postMessage(jpos);
  MemoryManager.freeMemory();
}
