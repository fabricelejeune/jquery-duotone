/**
 * jquery.duotone v1.0.0 - 2015-1-5
 * A jQuery plugin which turn all your images to duotone.
 * 
 * Copyright 2015 Fabrice Lejeune; MIT Licensed
 */
// (c) Dean McNamee <dean@gmail.com>, 2012.
//
// https://github.com/deanm/css-color-parser-js
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.

// http://www.w3.org/TR/css3-color/
var kCSSColorTable = {
  "transparent": [0,0,0,0], "aliceblue": [240,248,255,1],
  "antiquewhite": [250,235,215,1], "aqua": [0,255,255,1],
  "aquamarine": [127,255,212,1], "azure": [240,255,255,1],
  "beige": [245,245,220,1], "bisque": [255,228,196,1],
  "black": [0,0,0,1], "blanchedalmond": [255,235,205,1],
  "blue": [0,0,255,1], "blueviolet": [138,43,226,1],
  "brown": [165,42,42,1], "burlywood": [222,184,135,1],
  "cadetblue": [95,158,160,1], "chartreuse": [127,255,0,1],
  "chocolate": [210,105,30,1], "coral": [255,127,80,1],
  "cornflowerblue": [100,149,237,1], "cornsilk": [255,248,220,1],
  "crimson": [220,20,60,1], "cyan": [0,255,255,1],
  "darkblue": [0,0,139,1], "darkcyan": [0,139,139,1],
  "darkgoldenrod": [184,134,11,1], "darkgray": [169,169,169,1],
  "darkgreen": [0,100,0,1], "darkgrey": [169,169,169,1],
  "darkkhaki": [189,183,107,1], "darkmagenta": [139,0,139,1],
  "darkolivegreen": [85,107,47,1], "darkorange": [255,140,0,1],
  "darkorchid": [153,50,204,1], "darkred": [139,0,0,1],
  "darksalmon": [233,150,122,1], "darkseagreen": [143,188,143,1],
  "darkslateblue": [72,61,139,1], "darkslategray": [47,79,79,1],
  "darkslategrey": [47,79,79,1], "darkturquoise": [0,206,209,1],
  "darkviolet": [148,0,211,1], "deeppink": [255,20,147,1],
  "deepskyblue": [0,191,255,1], "dimgray": [105,105,105,1],
  "dimgrey": [105,105,105,1], "dodgerblue": [30,144,255,1],
  "firebrick": [178,34,34,1], "floralwhite": [255,250,240,1],
  "forestgreen": [34,139,34,1], "fuchsia": [255,0,255,1],
  "gainsboro": [220,220,220,1], "ghostwhite": [248,248,255,1],
  "gold": [255,215,0,1], "goldenrod": [218,165,32,1],
  "gray": [128,128,128,1], "green": [0,128,0,1],
  "greenyellow": [173,255,47,1], "grey": [128,128,128,1],
  "honeydew": [240,255,240,1], "hotpink": [255,105,180,1],
  "indianred": [205,92,92,1], "indigo": [75,0,130,1],
  "ivory": [255,255,240,1], "khaki": [240,230,140,1],
  "lavender": [230,230,250,1], "lavenderblush": [255,240,245,1],
  "lawngreen": [124,252,0,1], "lemonchiffon": [255,250,205,1],
  "lightblue": [173,216,230,1], "lightcoral": [240,128,128,1],
  "lightcyan": [224,255,255,1], "lightgoldenrodyellow": [250,250,210,1],
  "lightgray": [211,211,211,1], "lightgreen": [144,238,144,1],
  "lightgrey": [211,211,211,1], "lightpink": [255,182,193,1],
  "lightsalmon": [255,160,122,1], "lightseagreen": [32,178,170,1],
  "lightskyblue": [135,206,250,1], "lightslategray": [119,136,153,1],
  "lightslategrey": [119,136,153,1], "lightsteelblue": [176,196,222,1],
  "lightyellow": [255,255,224,1], "lime": [0,255,0,1],
  "limegreen": [50,205,50,1], "linen": [250,240,230,1],
  "magenta": [255,0,255,1], "maroon": [128,0,0,1],
  "mediumaquamarine": [102,205,170,1], "mediumblue": [0,0,205,1],
  "mediumorchid": [186,85,211,1], "mediumpurple": [147,112,219,1],
  "mediumseagreen": [60,179,113,1], "mediumslateblue": [123,104,238,1],
  "mediumspringgreen": [0,250,154,1], "mediumturquoise": [72,209,204,1],
  "mediumvioletred": [199,21,133,1], "midnightblue": [25,25,112,1],
  "mintcream": [245,255,250,1], "mistyrose": [255,228,225,1],
  "moccasin": [255,228,181,1], "navajowhite": [255,222,173,1],
  "navy": [0,0,128,1], "oldlace": [253,245,230,1],
  "olive": [128,128,0,1], "olivedrab": [107,142,35,1],
  "orange": [255,165,0,1], "orangered": [255,69,0,1],
  "orchid": [218,112,214,1], "palegoldenrod": [238,232,170,1],
  "palegreen": [152,251,152,1], "paleturquoise": [175,238,238,1],
  "palevioletred": [219,112,147,1], "papayawhip": [255,239,213,1],
  "peachpuff": [255,218,185,1], "peru": [205,133,63,1],
  "pink": [255,192,203,1], "plum": [221,160,221,1],
  "powderblue": [176,224,230,1], "purple": [128,0,128,1],
  "red": [255,0,0,1], "rosybrown": [188,143,143,1],
  "royalblue": [65,105,225,1], "saddlebrown": [139,69,19,1],
  "salmon": [250,128,114,1], "sandybrown": [244,164,96,1],
  "seagreen": [46,139,87,1], "seashell": [255,245,238,1],
  "sienna": [160,82,45,1], "silver": [192,192,192,1],
  "skyblue": [135,206,235,1], "slateblue": [106,90,205,1],
  "slategray": [112,128,144,1], "slategrey": [112,128,144,1],
  "snow": [255,250,250,1], "springgreen": [0,255,127,1],
  "steelblue": [70,130,180,1], "tan": [210,180,140,1],
  "teal": [0,128,128,1], "thistle": [216,191,216,1],
  "tomato": [255,99,71,1], "turquoise": [64,224,208,1],
  "violet": [238,130,238,1], "wheat": [245,222,179,1],
  "white": [255,255,255,1], "whitesmoke": [245,245,245,1],
  "yellow": [255,255,0,1], "yellowgreen": [154,205,50,1]};

function clamp_css_byte(i) {  // Clamp to integer 0 .. 255.
  i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
  return i < 0 ? 0 : i > 255 ? 255 : i;
}

function clamp_css_float(f) {  // Clamp to float 0.0 .. 1.0.
  return f < 0 ? 0 : f > 1 ? 1 : f;
}

function parse_css_int(str) {  // int or percentage.
  if (str[str.length - 1] === '%')
    return clamp_css_byte(parseFloat(str) / 100 * 255);
  return clamp_css_byte(parseInt(str));
}

function parse_css_float(str) {  // float or percentage.
  if (str[str.length - 1] === '%')
    return clamp_css_float(parseFloat(str) / 100);
  return clamp_css_float(parseFloat(str));
}

function css_hue_to_rgb(m1, m2, h) {
  if (h < 0) h += 1;
  else if (h > 1) h -= 1;

  if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
  if (h * 2 < 1) return m2;
  if (h * 3 < 2) return m1 + (m2 - m1) * (2/3 - h) * 6;
  return m1;
}

function parseCSSColor(css_str) {
  // Remove all whitespace, not compliant, but should just be more accepting.
  var str = css_str.replace(/ /g, '').toLowerCase();

  // Color keywords (and transparent) lookup.
  if (str in kCSSColorTable) return kCSSColorTable[str].slice();  // dup.

  // #abc and #abc123 syntax.
  if (str[0] === '#') {
    if (str.length === 4) {
      var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
      if (!(iv >= 0 && iv <= 0xfff)) return null;  // Covers NaN.
      return [((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8),
              (iv & 0xf0) | ((iv & 0xf0) >> 4),
              (iv & 0xf) | ((iv & 0xf) << 4),
              1];
    } else if (str.length === 7) {
      var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
      if (!(iv >= 0 && iv <= 0xffffff)) return null;  // Covers NaN.
      return [(iv & 0xff0000) >> 16,
              (iv & 0xff00) >> 8,
              iv & 0xff,
              1];
    }

    return null;
  }

  var op = str.indexOf('('), ep = str.indexOf(')');
  if (op !== -1 && ep + 1 === str.length) {
    var fname = str.substr(0, op);
    var params = str.substr(op+1, ep-(op+1)).split(',');
    var alpha = 1;  // To allow case fallthrough.
    switch (fname) {
      case 'rgba':
        if (params.length !== 4) return null;
        alpha = parse_css_float(params.pop());
        break;
        // Fall through.
      case 'rgb':
        if (params.length !== 3) return null;
        return [parse_css_int(params[0]),
                parse_css_int(params[1]),
                parse_css_int(params[2]),
                alpha];
      case 'hsla':
        if (params.length !== 4) return null;
        alpha = parse_css_float(params.pop());
        break;
        // Fall through.
      case 'hsl':
        if (params.length !== 3) return null;
        var h = (((parseFloat(params[0]) % 360) + 360) % 360) / 360;  // 0 .. 1
        // NOTE(deanm): According to the CSS spec s/l should only be
        // percentages, but we don't bother and let float or percentage.
        var s = parse_css_float(params[1]);
        var l = parse_css_float(params[2]);
        var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        var m1 = l * 2 - m2;
        return [clamp_css_byte(css_hue_to_rgb(m1, m2, h+1/3) * 255),
                clamp_css_byte(css_hue_to_rgb(m1, m2, h) * 255),
                clamp_css_byte(css_hue_to_rgb(m1, m2, h-1/3) * 255),
                alpha];
      default:
        return null;
    }
  }

  return null;
}

try { exports.parseCSSColor = parseCSSColor; } catch(e) { }
var __slice = [].slice;

(function($) {
  var Duotone;
  Duotone = (function() {
    var getColorStops, getGradientColors, process;

    Duotone.prototype.settings = {
      gradientMap: 'black, white'
    };

    function Duotone(el, options) {
      var original, self;
      self = this;
      this.$el = $(el);
      this.options = $.extend({}, this.settings, this.$el.data(), options);
      original = new Image();
      original.src = this.$el.attr('src');
      original.onload = function() {
        var color_stops, duotoned;
        self.$el.data('original', this);
        color_stops = getColorStops(self.options.gradientMap);
        duotoned = process.call(self, this, color_stops);
        return self.$el.attr('src', duotoned).addClass('processed');
      };
      original.onerror = function() {
        throw new Error("Can not load the image: `" + this.src + "`");
      };
    }

    process = function(image, color_stops) {
      var avg, b, canvas, ctx, g, gradient_colors, i, imageData, pixels, r, _i, _ref;
      gradient_colors = getGradientColors(color_stops);
      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d');
      canvas.width = this.$el.width();
      canvas.height = this.$el.height();
      ctx.drawImage(image, 0, 0, this.$el.width(), this.$el.height());
      imageData = ctx.getImageData(0, 0, this.$el.width(), this.$el.height());
      pixels = imageData.data;
      for (i = _i = 0, _ref = pixels.length; _i <= _ref; i = _i += 4) {
        r = pixels[i];
        g = pixels[i + 1];
        b = pixels[i + 2];
        avg = 0.2126 * r + 0.7152 * g + 0.0722 * b | 0;
        pixels[i] = gradient_colors[avg][0];
        pixels[i + 1] = gradient_colors[avg][1];
        pixels[i + 2] = gradient_colors[avg][2];
      }
      ctx.putImageData(imageData, 0, 0);
      return canvas.toDataURL();
    };

    getColorStops = function(gradient_map) {
      var color_stop, color_stop_matches, current_pos, delta, end_pos, i, j, matches, n_stops, pos_match, start_pos, stop, stops, _i, _j, _k, _len, _ref, _ref1, _ref2;
      matches = gradient_map.match(/(((rgb|hsl)a?\(\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*0?\.?\d+)?\)|\w+|#[0-9a-fA-F]{1,6})(\s+(0?\.\d+|\d{1,3}%))?)/g);
      stops = [];
      for (_i = 0, _len = matches.length; _i < _len; _i++) {
        color_stop = matches[_i];
        color_stop_matches = color_stop.match(/(?:((rgb|hsl)a?\(\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*0?\.?\d+)?\)|\w+|#[0-9a-fA-F]{1,6})(\s+(?:0?\.\d+|\d{1,3}%))?)/);
        if (color_stop_matches && color_stop_matches.length >= 4) {
          pos_match = color_stop_matches[3];
          stops.push({
            color: parseCSSColor(color_stop_matches[1]),
            pos: pos_match ? parse_css_float(pos_match) * 100 : null
          });
        }
      }
      if (stops.length <= 1) {
        throw new Error("You must define at least 2 color stops");
      }
      stop = stops[0];
      if (!stop.pos) {
        stop.pos = 0;
      } else {
        stop.pos = Math.min(100, Math.max(0, stop.pos));
      }
      current_pos = stop.pos;
      stop = stops[stops.length - 1];
      if (!stop.pos) {
        stop.pos = 100;
      } else {
        stop.pos = Math.min(100, Math.max(0, stop.pos));
      }
      for (i = _j = 1, _ref = stops.length - 1; 1 <= _ref ? _j <= _ref : _j >= _ref; i = 1 <= _ref ? ++_j : --_j) {
        stop = stops[i];
        if (stop.pos && stop.pos < current_pos) {
          stop.pos = current_pos;
        }
        if (stop.pos > 100) {
          stop.pos = 100;
        }
        current_pos = stop.pos;
      }
      i = 1;
      while (i < (stops.length - 1)) {
        if (!stops[i].pos) {
          for (j = _k = _ref1 = i + 1, _ref2 = stops.length; _ref1 <= _ref2 ? _k <= _ref2 : _k >= _ref2; j = _ref1 <= _ref2 ? ++_k : --_k) {
            if (stops[j].pos) {
              break;
            }
          }
          start_pos = stops[i - 1].pos;
          end_pos = stops[j].pos;
          n_stops = j - 1 + 1;
          delta = Math.round((end_pos - start_pos) / n_stops);
          while (i < j) {
            stops[i].pos = stops[i - 1].pos + delta;
            i++;
          }
        }
        i++;
      }
      if (stops[0].pos !== 0) {
        stops.unshift({
          color: stops[0].color,
          pos: 0
        });
      }
      if (stops[stops.length - 1].pos !== 100) {
        stops.push({
          color: stops[stops.length - 1].color,
          pos: 100
        });
      }
      return stops;
    };

    getGradientColors = function(color_stops) {
      var b, canvas, ctx, g, gradient_colors, grd, i, imageData, p, pixels, r, stop, _i, _j, _len, _ref;
      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d');
      grd = ctx.createLinearGradient(0, 0, 256, 0);
      for (_i = 0, _len = color_stops.length; _i < _len; _i++) {
        stop = color_stops[_i];
        r = stop.color[0];
        g = stop.color[1];
        b = stop.color[2];
        p = stop.pos / 100;
        grd.addColorStop(p, "rgb(" + r + ", " + g + ", " + b + ")");
      }
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 256, 1);
      imageData = ctx.getImageData(0, 0, 256, 1);
      pixels = imageData.data;
      gradient_colors = [];
      for (i = _j = 0, _ref = pixels.length; _j <= _ref; i = _j += 4) {
        r = pixels[i];
        g = pixels[i + 1];
        b = pixels[i + 2];
        gradient_colors.push([r, g, b]);
      }
      return gradient_colors;
    };

    Duotone.prototype.defaults = function(opts) {
      this.options = $.extend(this.options, opts);
      return this.$el;
    };

    Duotone.prototype.reset = function() {
      return this.$el.attr('src', this.$el.data('original').src).removeClass('processed');
    };

    Duotone.prototype.process = function() {
      var color_stops, duotoned;
      color_stops = getColorStops(this.options.gradientMap);
      duotoned = process.call(this, this.$el.data('original'), color_stops);
      return this.$el.attr('src', duotoned).addClass('processed');
    };

    return Duotone;

  })();
  return $.fn.extend({
    duotone: function() {
      var args, options;
      options = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!document.createElement('canvas').getContext) {
        return;
      }
      return this.each(function() {
        var duotone, _ref;
        if ($(this).is('img')) {
          duotone = $.data(this, 'duotone');
          if (!duotone) {
            $.data(this, 'duotone', (duotone = new Duotone(this, options)));
          }
          if (typeof options === 'string') {
            return duotone[options].apply(duotone, args);
          }
        } else {
          return (_ref = $(this).find('img')).duotone.apply(_ref, [options].concat(__slice.call(args)));
        }
      });
    }
  });
})(window.jQuery);
