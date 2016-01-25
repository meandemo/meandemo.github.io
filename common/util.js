//
// Util functions in a static class
// Can't use isNaN
// http://stackoverflow.com/questions/32967380/how-compatible-is-will-be-typescript-to-es6-ecmascript-2015
System.register([], function(exports_1) {
    var Util, HexColor2Name;
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
                Util.str2rgb = function (hex) {
                    var re_long_hex_ = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i;
                    var re_short_hex_ = /^#([\da-f])([\da-f])([\da-f])$/i;
                    var res = [0, 0, 0];
                    var tokens = hex.match(re_long_hex_);
                    if (tokens) {
                        res[0] = parseInt(tokens[1], 16);
                        res[1] = parseInt(tokens[2], 16);
                        res[2] = parseInt(tokens[3], 16);
                    }
                    return res;
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
                // create a vector of nb_ticks values 
                // evenly spaced which includes min and max
                // nb_ticks must be >= 2
                // example with 5 values
                //  min                         max
                //   +======+======+======+======+
                // v[0]   v[1]   v[2]   v[3]    v[4]
                //
                Util.create_ticks = function (nb_ticks, min, max) {
                    var delta = (max - min) / (nb_ticks - 1);
                    var res = [min];
                    var data = min;
                    for (var i = 1; i < (nb_ticks - 1); i++) {
                        data += delta;
                        res.push(Math.round(data));
                    }
                    res.push(max);
                    return res;
                };
                // create a vector of nb_values values 
                // evenly spaced between min and max
                // example with 3 values
                // nb_values >= 1
                //  min                         max
                //   +======+======+======+======+
                //         v[0]   v[1]   v[2]
                //
                Util.create_values = function (nb_values, min, max) {
                    var delta = (max - min) / (nb_values + 1);
                    var res = [];
                    var data = min;
                    for (var i = 0; i < nb_values; i++) {
                        data += delta;
                        res.push(Math.round(data));
                    }
                    return res;
                };
                return Util;
            })();
            exports_1("Util", Util);
            HexColor2Name = (function () {
                function HexColor2Name() {
                }
                HexColor2Name.translate = function (s) {
                    return HexColor2Name.table[s.toUpperCase()];
                };
                HexColor2Name.table = {
                    '#000000': 'Black',
                    '#000080': 'Navy',
                    '#00008B': 'DarkBlue',
                    '#0000CD': 'MediumBlue',
                    '#0000FF': 'Blue',
                    '#006400': 'DarkGreen',
                    '#008000': 'Green',
                    '#008080': 'Teal',
                    '#008B8B': 'DarkCyan',
                    '#00BFFF': 'DeepSkyBlue',
                    '#00CED1': 'DarkTurquoise',
                    '#00FA9A': 'MediumSpringGreen',
                    '#00FF00': 'Lime',
                    '#00FF7F': 'SpringGreen',
                    '#00FFFF': 'Cyan',
                    '#191970': 'MidnightBlue',
                    '#1E90FF': 'DodgerBlue',
                    '#20B2AA': 'LightSeaGreen',
                    '#228B22': 'ForestGreen',
                    '#2E8B57': 'SeaGreen',
                    '#2F4F4F': 'DarkSlateGray',
                    '#32CD32': 'LimeGreen',
                    '#3CB371': 'MediumSeaGreen',
                    '#40E0D0': 'Turquoise',
                    '#4169E1': 'RoyalBlue',
                    '#4682B4': 'SteelBlue',
                    '#483D8B': 'DarkSlateBlue',
                    '#48D1CC': 'MediumTurquoise',
                    '#4B0082': 'Indigo',
                    '#556B2F': 'DarkOliveGreen',
                    '#5F9EA0': 'CadetBlue',
                    '#6495ED': 'CornflowerBlue',
                    '#663399': 'RebeccaPurple',
                    '#66CDAA': 'MediumAquaMarine',
                    '#696969': 'DimGray',
                    '#778899': 'LightSlateGray',
                    '#7B68EE': 'MediumSlateBlue',
                    '#7CFC00': 'LawnGreen',
                    '#7FFF00': 'Chartreuse',
                    '#7FFFD4': 'Aquamarine',
                    '#800000': 'Maroon',
                    '#800080': 'Purple',
                    '#808000': 'Olive',
                    '#808080': 'Gray',
                    '#87CEEB': 'SkyBlue',
                    '#87CEFA': 'LightSkyBlue',
                    '#8A2BE2': 'BlueViolet',
                    '#8B0000': 'DarkRed',
                    '#8B008B': 'DarkMagenta',
                    '#8B4513': 'SaddleBrown',
                    '#8FBC8F': 'DarkSeaGreen',
                    '#90EE90': 'LightGreen',
                    '#9370DB': 'MediumPurple',
                    '#9400D3': 'DarkViolet',
                    '#98FB98': 'PaleGreen',
                    '#9932CC': 'DarkOrchid',
                    '#9ACD32': 'YellowGreen',
                    '#A0522D': 'Sienna',
                    '#A52A2A': 'Brown',
                    '#A9A9A9': 'DarkGray',
                    '#ADD8E6': 'LightBlue',
                    '#ADFF2F': 'GreenYellow',
                    '#AFEEEE': 'PaleTurquoise',
                    '#B0C4DE': 'LightSteelBlue',
                    '#B0E0E6': 'PowderBlue',
                    '#B22222': 'FireBrick',
                    '#B8860B': 'DarkGoldenRod',
                    '#BA55D3': 'MediumOrchid',
                    '#BC8F8F': 'RosyBrown',
                    '#BDB76B': 'DarkKhaki',
                    '#C0C0C0': 'Silver',
                    '#C71585': 'MediumVioletRed',
                    '#CD5C5C': 'IndianRed',
                    '#CD853F': 'Peru',
                    '#D2691E': 'Chocolate',
                    '#D2B48C': 'Tan',
                    '#D3D3D3': 'LightGray',
                    '#D8BFD8': 'Thistle',
                    '#DA70D6': 'Orchid',
                    '#DAA520': 'GoldenRod',
                    '#DB7093': 'PaleVioletRed',
                    '#DC143C': 'Crimson',
                    '#DCDCDC': 'Gainsboro',
                    '#DDA0DD': 'Plum',
                    '#DEB887': 'BurlyWood',
                    '#E0FFFF': 'LightCyan',
                    '#E6E6FA': 'Lavender',
                    '#E9967A': 'DarkSalmon',
                    '#EE82EE': 'Violet',
                    '#EEE8AA': 'PaleGoldenRod',
                    '#F08080': 'LightCoral',
                    '#F0E68C': 'Khaki',
                    '#F0F8FF': 'AliceBlue',
                    '#F0FFF0': 'HoneyDew',
                    '#F0FFFF': 'Azure',
                    '#F4A460': 'SandyBrown',
                    '#F5DEB3': 'Wheat',
                    '#F5F5DC': 'Beige',
                    '#F5F5F5': 'WhiteSmoke',
                    '#F5FFFA': 'MintCream',
                    '#F8F8FF': 'GhostWhite',
                    '#FA8072': 'Salmon',
                    '#FAEBD7': 'AntiqueWhite',
                    '#FAF0E6': 'Linen',
                    '#FAFAD2': 'LightGoldenRodYellow',
                    '#FDF5E6': 'OldLace',
                    '#FF0000': 'Red',
                    '#FF00FF': 'Magenta',
                    '#FF1493': 'DeepPink',
                    '#FF4500': 'OrangeRed',
                    '#FF6347': 'Tomato',
                    '#FF69B4': 'HotPink',
                    '#FF7F50': 'Coral',
                    '#FF8C00': 'DarkOrange',
                    '#FFA07A': 'LightSalmon',
                    '#FFA500': 'Orange',
                    '#FFB6C1': 'LightPink',
                    '#FFC0CB': 'Pink',
                    '#FFD700': 'Gold',
                    '#FFDAB9': 'PeachPuff',
                    '#FFDEAD': 'NavajoWhite',
                    '#FFE4B5': 'Moccasin',
                    '#FFE4C4': 'Bisque',
                    '#FFE4E1': 'MistyRose',
                    '#FFEBCD': 'BlanchedAlmond',
                    '#FFEFD5': 'PapayaWhip',
                    '#FFF0F5': 'LavenderBlush',
                    '#FFF5EE': 'SeaShell',
                    '#FFF8DC': 'Cornsilk',
                    '#FFFACD': 'LemonChiffon',
                    '#FFFAF0': 'FloralWhite',
                    '#FFFAFA': 'Snow',
                    '#FFFF00': 'Yellow',
                    '#FFFFE0': 'LightYellow',
                    '#FFFFF0': 'Ivory',
                    '#FFFFFF': 'White'
                };
                return HexColor2Name;
            })();
            exports_1("HexColor2Name", HexColor2Name);
        }
    }
});
