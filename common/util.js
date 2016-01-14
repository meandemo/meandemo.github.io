//
// Util functions in a static class
// Can't use isNaN 
// http://stackoverflow.com/questions/32967380/how-compatible-is-will-be-typescript-to-es6-ecmascript-2015
System.register([], function(exports_1) {
    var Util;
    return {
        setters:[],
        execute: function() {
            Util = (function () {
                function Util() {
                }
                Util.CRC16 = function (v) {
                    var mask1 = 0x1021; // CRC-CCITT
                    var mask2 = 0xFFFF;
                    // implement a quick CRC
                    var r = (v << 1) & mask2;
                    if (v >= 0x8000) {
                        r = r ^ mask1;
                    }
                    return r;
                };
                Util.to_04X = function (v) {
                    var r = '000' + v.toString(16).toUpperCase();
                    return r.slice(-4);
                };
                Util.to_hex = function (v) {
                    v = Math.round(v);
                    if (v < 0) {
                        return '00';
                    }
                    else if (v > 255) {
                        return 'ff';
                    }
                    else if (v < 16) {
                        return '0' + v.toString(16);
                    }
                    else {
                        return v.toString(16);
                    }
                };
                Util.rgb2str = function (r, g, b) {
                    return '#' + Util.to_hex(r) + Util.to_hex(g) + Util.to_hex(b);
                };
                Util.clip3 = function (v, min, max) {
                    v = isNaN(v) ? 0 : v;
                    if (v < min) {
                        return min;
                    }
                    if (v > max) {
                        return max;
                    }
                    return v;
                };
                return Util;
            })();
            exports_1("Util", Util);
        }
    }
});
