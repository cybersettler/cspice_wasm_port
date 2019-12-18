if (typeof(Module) === "undefined") Module = {};

function createFiles(content, dir) {
  var KERNEL_FILE_LIST_PATTERN = /KERNELS_TO_LOAD\s*=\s*\((\s*.*[\s\S]+)*/;
  if (!KERNEL_FILE_LIST_PATTERN.test(content)) {
    console.warn("No kernel files found");
    return;
  }

  var match = KERNEL_FILE_LIST_PATTERN.exec(content);

  if(match.length < 2) {
    console.warn("Empty kernel list");
    return;
  }

  var FILE_NAME_PATTERN = /\$KERNELS\/(.*)/;
  var list = match[1].trim();
  list.split(/\s*'(.*)'\s*,*\s*/)
  .filter(function(item) {
    return FILE_NAME_PATTERN.test(item);
  })
  .forEach(function(item) {
    var m = FILE_NAME_PATTERN.exec(item);
    if (m.length > 1) {
      var filename = m[1];
      FS.createLazyFile(dir, filename, "/data/" + filename, true, false);
      console.log("filename:", filename);
    } else {
      console.warn('A kernel filename seems to be invalid:', item);
    }
  });
}

      Module["preInit"] = function() {

          var dir = FS.mkdir('/home/web_user/data');
          var file = FS.createLazyFile(dir, "kernel_metadata.txt", "/data/kernel_metadata.txt", true, false);

          console.log("File created:",file);
          var filePath = FS.getPath(file);
          var content = FS.readFile(filePath, { encoding: 'utf8' });
          console.log("Pattern search");

          createFiles(content, dir);
          console.log("End");
      };
