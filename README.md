# cspice_wasm_port
WASM port of NASA's NAIF cspice library

## Building

To build the WASM CSPICE library, follow the next steps:

* Install emscripten
* Download and extract [f2c library](https://www.netlib.org/f2c/)
* Build the f2c library with emscripten
* Download and extract [cspice library](https://naif.jpl.nasa.gov/naif/toolkit_C.html)
* Build cspice library with emscripten
* Build cspice WASM file

## Using EMSCRIPTEN

Sources are compiled using emscripten, so make sure that before executing emcc for the first time, execute the following command from emsdk folder: `source emsdk_set_env.sh`.

Also change the `emsdk_set_env.sh` script to include the following variables (specially important when compiling cspice library):

```bash
export TKCOMPILER=emcc
export TKCOMPILEOPTIONS="-m64 -c -ansi -O2 -I/<absolute-path-to-cspice-library>/cspice/include"
```

## Building F2C with EMSCRIPTEN

There is an [F2C emscripten port](https://github.com/josephwinston/emscripten-f2c), however, the current compiled
library located in `lib/f2c.bc` was compiled using the source code in
`src/f2c` folder.

1. Change `sysdep.c`and `systest.c` (see below and https://github.com/emscripten-core/emscripten/issues/2973 https://stackoverflow.com/questions/19479746/implicit-declaration-of-mkdir)
2. Copy `src/f2c/makefile` in this project to the extracted f2c `src` folder
3. Execute the makefile following instructions in `src/f2c/README`

The following was added to `sysdep.c`:

```c
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>
```

The following was added to `systest`:

```c
#define _POSIX_SOURCE
```

## Building CSPICE C library

Before proceeding you may want to delete `csupport.a` and `cspice.a`files in the `lib` directory

1. Change the files `src/cspice/err.c`, `src/cspice/s_paus.c` as described below
2. Replace `cspice/src/csupport/mkprodct.csh` file, with the one in this project
located in the `src/csupport` folder
3. Execute `csh mkprodct.csh` from `cspice/src/csupport`folder. this will generate `csupport.a` in the lib folder
4. Replace `cspice/src/cspice/mkprodct.csh` file, with the one in this project
located in the `src/cspice` folder
3. Execute `csh mkprodct.csh` from `cspice/src/cspice`folder. this will generate `cspice.a` in the lib folder
4. Copy the generated `f2c` file to the cspice lib folder adding the _bc_ extension

Is necessary to add `#define _POSIX_SOURCE` at the beginning of `err.c` file.

For `s_paus.c` the following headers are used:

```c
#define _POSIX_SOURCE
#include "stdio.h"
#include "f2c.h"
#define PAUSESIG 15
```

## Buling CSPICE WASM library

The following is an example of how to build the library:

```sh
emcc -O2 lib/cspice.a -o cspice.js -s WASM=1 -s EXPORTED_FUNCTIONS='["_furnsh_c", "_str2et_c", "_spkezr_c"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap", "getValue", "setValue"]' -s TOTAL_MEMORY=512MB --preload-file data
```

This will generate the `cspice.wasm` file and the `cspice.js` script that serves as the _glue code_.

Change the `EXPORTED_FUNCTIONS` value to include the desired functions for
your project. Also `TOTAL_MEMORY` may require a different value.
