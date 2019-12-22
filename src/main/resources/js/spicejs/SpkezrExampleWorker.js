importScripts('/js/spicejs/cspice.js',
              '/js/spicejs/MemoryManager.js',
              '/js/spicejs/File.js',
              '/js/spicejs/Time.js',
              '/js/spicejs/Position.js');

onmessage = function() {
  let dataFile = "/home/web_user/data/kernel_metadata.txt";
  let dateString = "1990 NOV 21 02:40:21.3";
  let target = "SUN";
  let frame = "J2000";
  let correction = "LT+S";
  let observer = "EARTH";

  furnsh(dataFile);

  let epoch = str2et(dateString);
  let output = spkezr(target, epoch, frame, correction, observer);

  console.log("Sun position observed from Earth:");
  console.log("X:", output.state[0]);
  console.log("Y:", output.state[1]);
  console.log("Z:", output.state[2]);
  console.log("light time:", output.lightTime);

  postMessage(output);
  MemoryManager.freeMemory();
}
