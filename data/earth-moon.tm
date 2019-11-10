 KPL/FK

         \begintext

             Kernels to load are:

                Earth association FK:      earth_assoc_itrf93.tf

                Earth binary PCK:          earth_000101_070620_070329.bpc

                Text PCK for Earth radii:  pck00010.tpc

                Leapseconds kernel (for
                time conversion):          naif0012.tls

                Planetary ephemeris (for
                sub-Earth computation):    de430.bsp

         \begindata

         KERNELS_TO_LOAD = ( 'earth_assoc_itrf93.tf'
                             'earth_070425_370426_predict.bpc'
                             'pck00010.tpc'
                             'naif0012.tls'         
                             'de430.bsp'                     )
         \begintext

         End of kernel