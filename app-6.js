
if (!document.createElement("canvas").getContext) {
  (function() {
    var ab = Math;
    var n = ab.round;
    var l = ab.sin;
    var A = ab.cos;
    var H = ab.abs;
    var N = ab.sqrt;
    var d = 10;
    var f = d / 2;
    var z = +navigator.userAgent.match(/MSIE ([\d.]+)?/)[1];

    function y() {
      return this.context_ || (this.context_ = new D(this))
    }
    var t = Array.prototype.slice;

    function g(j, m, p) {
      var i = t.call(arguments, 2);
      return function() {
        return j.apply(m, i.concat(t.call(arguments)))
      }
    }

    function af(i) {
      return String(i).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    }

    function Y(m, j, i) {
      Ext.onReady(function() {
        if (!m.namespaces[j]) {
          m.namespaces.add(j, i, "#default#VML")
        }
      })
    }

    function R(j) {
      Y(j, "g_vml_", "urn:schemas-microsoft-com:vml");
      Y(j, "g_o_", "urn:schemas-microsoft-com:office:office");
      if (!j.styleSheets.ex_canvas_) {
        var i = j.createStyleSheet();
        i.owningElement.id = "ex_canvas_";
        i.cssText =
          "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"
      }
    }
    R(document);

    var e = {
      init: function(i) {
        var j = i || document;
        j.createElement("canvas");
        j.attachEvent("onreadystatechange", g(this.init_, this, j))
      },
      init_: function(p) {
        var m = p.getElementsByTagName("canvas");
        for (var j = 0; j < m.length; j++) {
          this.initElement(m[j])
        }
      },
      initElement: function(j) {
        if (!j.getContext) {
          j.getContext = y;
          R(j.ownerDocument);
          j.innerHTML = "";
          j.attachEvent("onpropertychange", x);
          j.attachEvent("onresize", W);
          var i = j.attributes;
          if (i.width && i.width.specified) {
            j.style.width = i.width.nodeValue + "px"
          } else {
            j.width = j.clientWidth
          }
          if (i.height && i.height.specified) {
            j.style.height = i.height.nodeValue + "px"
          } else {
            j.height = j.clientHeight
          }
        }
        return j
      }
    };

    function x(j) {
      var i = j.srcElement;
      switch (j.propertyName) {
        case "width":
          i.getContext().clearRect();
          i.style.width = i.attributes.width.nodeValue + "px";
          i.firstChild.style.width = i.clientWidth + "px";
          break;
        case "height":
          i.getContext().clearRect();
          i.style.height = i.attributes.height.nodeValue + "px";
          i.firstChild.style.height = i.clientHeight + "px";
          break
      }
    }

    function W(j) {
      var i = j.srcElement;
      if (i.firstChild) {
        i.firstChild.style.width = i.clientWidth + "px";
        i.firstChild.style.height = i.clientHeight + "px"
      }
    }
    e.init();
    var k = [];
    for (var ae = 0; ae < 16; ae++) {
      for (var ad = 0; ad < 16; ad++) {
        k[ae * 16 + ad] = ae.toString(16) + ad.toString(16)
      }
    }

    function B() {
      return [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ]
    }

    function J(p, m) {
      var j = B();
      for (var i = 0; i < 3; i++) {
        for (var ah = 0; ah < 3; ah++) {
          var Z = 0;
          for (var ag = 0; ag < 3; ag++) {
            Z += p[i][ag] * m[ag][ah]
          }
          j[i][ah] = Z
        }
      }
      return j
    }

    function v(j, i) {
      i.fillStyle = j.fillStyle;
      i.lineCap = j.lineCap;
      i.lineJoin = j.lineJoin;
      i.lineDash = j.lineDash;
      i.lineWidth = j.lineWidth;
      i.miterLimit = j.miterLimit;
      i.shadowBlur = j.shadowBlur;
      i.shadowColor = j.shadowColor;
      i.shadowOffsetX = j.shadowOffsetX;
      i.shadowOffsetY = j.shadowOffsetY;
      i.strokeStyle = j.strokeStyle;
      i.globalAlpha = j.globalAlpha;
      i.font = j.font;
      i.textAlign = j.textAlign;
      i.textBaseline = j.textBaseline;
      i.arcScaleX_ = j.arcScaleX_;
      i.arcScaleY_ = j.arcScaleY_;
      i.lineScale_ = j.lineScale_
    }
    var b = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgreen: "#006400",
      darkgrey: "#A9A9A9",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      grey: "#808080",
      greenyellow: "#ADFF2F",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgreen: "#90EE90",
      lightgrey: "#D3D3D3",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      oldlace: "#FDF5E6",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      whitesmoke: "#F5F5F5",
      yellowgreen: "#9ACD32"
    };

    function M(j) {
      var p = j.indexOf("(", 3);
      var i = j.indexOf(")", p + 1);
      var m = j.substring(p + 1, i).split(",");
      if (m.length != 4 || j.charAt(3) != "a") {
        m[3] = 1
      }
      return m
    }

    function c(i) {
      return parseFloat(i) / 100
    }

    function r(j, m, i) {
      return Math.min(i, Math.max(m, j))
    }

    function I(ag) {
      var i, ai, aj, ah, ak, Z;
      ah = parseFloat(ag[0]) / 360 % 360;
      if (ah < 0) {
        ah++
      }
      ak = r(c(ag[1]), 0, 1);
      Z = r(c(ag[2]), 0, 1);
      if (ak == 0) {
        i = ai = aj = Z
      } else {
        var j = Z < 0.5 ? Z * (1 + ak) : Z + ak - Z * ak;
        var m = 2 * Z - j;
        i = a(m, j, ah + 1 / 3);
        ai = a(m, j, ah);
        aj = a(m, j, ah - 1 / 3)
      }
      return "#" + k[Math.floor(i * 255)] + k[Math.floor(ai * 255)] + k[Math.floor(
        aj * 255)]
    }

    function a(j, i, m) {
      if (m < 0) {
        m++
      }
      if (m > 1) {
        m--
      }
      if (6 * m < 1) {
        return j + (i - j) * 6 * m
      } else {
        if (2 * m < 1) {
          return i
        } else {
          if (3 * m < 2) {
            return j + (i - j) * (2 / 3 - m) * 6
          } else {
            return j
          }
        }
      }
    }
    var C = {};

    function F(j) {
      if (j in C) {
        return C[j]
      }
      var ag, Z = 1;
      j = String(j);
      if (j.charAt(0) == "#") {
        ag = j
      } else {
        if (/^rgb/.test(j)) {
          var p = M(j);
          var ag = "#",
            ah;
          for (var m = 0; m < 3; m++) {
            if (p[m].indexOf("%") != -1) {
              ah = Math.floor(c(p[m]) * 255)
            } else {
              ah = +p[m]
            }
            ag += k[r(ah, 0, 255)]
          }
          Z = +p[3]
        } else {
          if (/^hsl/.test(j)) {
            var p = M(j);
            ag = I(p);
            Z = p[3]
          } else {
            ag = b[j] || j
          }
        }
      }
      return C[j] = {
        color: ag,
        alpha: Z
      }
    }
    var o = {
      style: "normal",
      variant: "normal",
      weight: "normal",
      size: 10,
      family: "sans-serif"
    };
    var L = {};

    function E(i) {
      if (L[i]) {
        return L[i]
      }
      var p = document.createElement("div");
      var m = p.style;
      try {
        m.font = i
      } catch (j) {}
      return L[i] = {
        style: m.fontStyle || o.style,
        variant: m.fontVariant || o.variant,
        weight: m.fontWeight || o.weight,
        size: m.fontSize || o.size,
        family: m.fontFamily || o.family
      }
    }

    function u(m, j) {
      var i = {};
      for (var ah in m) {
        i[ah] = m[ah]
      }
      var ag = parseFloat(j.currentStyle.fontSize),
        Z = parseFloat(m.size);
      if (typeof m.size == "number") {
        i.size = m.size
      } else {
        if (m.size.indexOf("px") != -1) {
          i.size = Z
        } else {
          if (m.size.indexOf("em") != -1) {
            i.size = ag * Z
          } else {
            if (m.size.indexOf("%") != -1) {
              i.size = (ag / 100) * Z
            } else {
              if (m.size.indexOf("pt") != -1) {
                i.size = Z / 0.75
              } else {
                i.size = ag
              }
            }
          }
        }
      }
      i.size *= 0.981;
      return i
    }

    function ac(i) {
      return i.style + " " + i.variant + " " + i.weight + " " + i.size +
        "px " + i.family
    }
    var s = {
      butt: "flat",
      round: "round"
    };

    function S(i) {
      return s[i] || "square"
    }

    function D(i) {
      this.m_ = B();
      this.mStack_ = [];
      this.aStack_ = [];
      this.currentPath_ = [];
      this.strokeStyle = "#000";
      this.fillStyle = "#000";
      this.lineWidth = 1;
      this.lineJoin = "miter";
      this.lineDash = [];
      this.lineCap = "butt";
      this.miterLimit = d * 1;
      this.globalAlpha = 1;
      this.font = "10px sans-serif";
      this.textAlign = "left";
      this.textBaseline = "alphabetic";
      this.canvas = i;
      var m = "width:" + i.clientWidth + "px;height:" + i.clientHeight +
        "px;overflow:hidden;position:absolute";
      var j = i.ownerDocument.createElement("div");
      j.style.cssText = m;
      i.appendChild(j);
      var p = j.cloneNode(false);
      p.style.backgroundColor = "red";
      p.style.filter = "alpha(opacity=0)";
      i.appendChild(p);
      this.element_ = j;
      this.arcScaleX_ = 1;
      this.arcScaleY_ = 1;
      this.lineScale_ = 1
    }
    var q = D.prototype;
    q.clearRect = function() {
      if (this.textMeasureEl_) {
        this.textMeasureEl_.removeNode(true);
        this.textMeasureEl_ = null
      }
      this.element_.innerHTML = ""
    };
    q.beginPath = function() {
      this.currentPath_ = []
    };
    q.moveTo = function(j, i) {
      var m = V(this, j, i);
      this.currentPath_.push({
        type: "moveTo",
        x: m.x,
        y: m.y
      });
      this.currentX_ = m.x;
      this.currentY_ = m.y
    };
    q.lineTo = function(j, i) {
      var m = V(this, j, i);
      this.currentPath_.push({
        type: "lineTo",
        x: m.x,
        y: m.y
      });
      this.currentX_ = m.x;
      this.currentY_ = m.y
    };
    q.bezierCurveTo = function(m, j, ak, aj, ai, ag) {
      var i = V(this, ai, ag);
      var ah = V(this, m, j);
      var Z = V(this, ak, aj);
      K(this, ah, Z, i)
    };

    function K(i, Z, m, j) {
      i.currentPath_.push({
        type: "bezierCurveTo",
        cp1x: Z.x,
        cp1y: Z.y,
        cp2x: m.x,
        cp2y: m.y,
        x: j.x,
        y: j.y
      });
      i.currentX_ = j.x;
      i.currentY_ = j.y
    }
    q.quadraticCurveTo = function(ai, m, j, i) {
      var ah = V(this, ai, m);
      var ag = V(this, j, i);
      var aj = {
        x: this.currentX_ + 2 / 3 * (ah.x - this.currentX_),
        y: this.currentY_ + 2 / 3 * (ah.y - this.currentY_)
      };
      var Z = {
        x: aj.x + (ag.x - this.currentX_) / 3,
        y: aj.y + (ag.y - this.currentY_) / 3
      };
      K(this, aj, Z, ag)
    };
    q.arc = function(al, aj, ak, ag, j, m) {
      ak *= d;
      var ap = m ? "at" : "wa";
      var am = al + A(ag) * ak - f;
      var ao = aj + l(ag) * ak - f;
      var i = al + A(j) * ak - f;
      var an = aj + l(j) * ak - f;
      if (am == i && !m) {
        am += 0.125
      }
      var Z = V(this, al, aj);
      var ai = V(this, am, ao);
      var ah = V(this, i, an);
      this.currentPath_.push({
        type: ap,
        x: Z.x,
        y: Z.y,
        radius: ak,
        xStart: ai.x,
        yStart: ai.y,
        xEnd: ah.x,
        yEnd: ah.y
      })
    };
    q.rect = function(m, j, i, p) {
      this.moveTo(m, j);
      this.lineTo(m + i, j);
      this.lineTo(m + i, j + p);
      this.lineTo(m, j + p);
      this.closePath()
    };
    q.strokeRect = function(m, j, i, p) {
      var Z = this.currentPath_;
      this.beginPath();
      this.moveTo(m, j);
      this.lineTo(m + i, j);
      this.lineTo(m + i, j + p);
      this.lineTo(m, j + p);
      this.closePath();
      this.stroke();
      this.currentPath_ = Z
    };
    q.fillRect = function(m, j, i, p) {
      var Z = this.currentPath_;
      this.beginPath();
      this.moveTo(m, j);
      this.lineTo(m + i, j);
      this.lineTo(m + i, j + p);
      this.lineTo(m, j + p);
      this.closePath();
      this.fill();
      this.currentPath_ = Z
    };
    q.createLinearGradient = function(j, p, i, m) {
      var Z = new U("gradient");
      Z.x0_ = j;
      Z.y0_ = p;
      Z.x1_ = i;
      Z.y1_ = m;
      return Z
    };
    q.createRadialGradient = function(p, ag, m, j, Z, i) {
      var ah = new U("gradientradial");
      ah.x0_ = p;
      ah.y0_ = ag;
      ah.r0_ = m;
      ah.x1_ = j;
      ah.y1_ = Z;
      ah.r1_ = i;
      return ah
    };
    q.drawImage = function(an, j) {
      var ah, Z, aj, ar, al, ak, ao, av;
      var ai = an.runtimeStyle.width;
      var am = an.runtimeStyle.height;
      an.runtimeStyle.width = "auto";
      an.runtimeStyle.height = "auto";
      var ag = an.width;
      var aq = an.height;
      an.runtimeStyle.width = ai;
      an.runtimeStyle.height = am;
      if (arguments.length == 3) {
        ah = arguments[1];
        Z = arguments[2];
        al = ak = 0;
        ao = aj = ag;
        av = ar = aq
      } else {
        if (arguments.length == 5) {
          ah = arguments[1];
          Z = arguments[2];
          aj = arguments[3];
          ar = arguments[4];
          al = ak = 0;
          ao = ag;
          av = aq
        } else {
          if (arguments.length == 9) {
            al = arguments[1];
            ak = arguments[2];
            ao = arguments[3];
            av = arguments[4];
            ah = arguments[5];
            Z = arguments[6];
            aj = arguments[7];
            ar = arguments[8]
          } else {
            throw Error("Invalid number of arguments")
          }
        }
      }
      var au = V(this, ah, Z);
      var at = [];
      var i = 10;
      var p = 10;
      var ap = this.m_;
      at.push(" <g_vml_:group", ' coordsize="', d * i, ",", d * p, '"',
        ' coordorigin="0,0"', ' style="width:', n(i * ap[0][0]),
        "px;height:", n(p * ap[1][1]), "px;position:absolute;", "top:", n(
          au.y / d), "px;left:", n(au.x / d), "px; rotation:", n(Math.atan(
          ap[0][1] / ap[1][1]) * 180 / Math.PI), ";");
      at.push('" >', '<g_vml_:image src="', an.src, '"', ' style="width:',
        d * aj, "px;", " height:", d * ar, 'px"', ' cropleft="', al / ag,
        '"', ' croptop="', ak / aq, '"', ' cropright="', (ag - al - ao) /
        ag, '"', ' cropbottom="', (aq - ak - av) / aq, '"', " />",
        "</g_vml_:group>");
      this.element_.insertAdjacentHTML("BeforeEnd", at.join(""))
    };
    q.setLineDash = function(i) {
      if (i.length === 1) {
        i = i.slice();
        i[1] = i[0]
      }
      this.lineDash = i
    };
    q.getLineDash = function() {
      return this.lineDash
    };
    q.stroke = function(ak) {
      var ai = [];
      var m = 10;
      var al = 10;
      ai.push("<g_vml_:shape", ' filled="', !!ak, '"',
        ' style="position:absolute;width:', m, "px;height:", al,
        'px;left:0px;top:0px;"', ' coordorigin="0,0"', ' coordsize="', d *
        m, ",", d * al, '"', ' stroked="', !ak, '"', ' path="');
      var Z = {
        x: null,
        y: null
      };
      var aj = {
        x: null,
        y: null
      };
      for (var ag = 0; ag < this.currentPath_.length; ag++) {
        var j = this.currentPath_[ag];
        var ah;
        switch (j.type) {
          case "moveTo":
            ah = j;
            ai.push(" m ", n(j.x), ",", n(j.y));
            break;
          case "lineTo":
            ai.push(" l ", n(j.x), ",", n(j.y));
            break;
          case "close":
            ai.push(" x ");
            j = null;
            break;
          case "bezierCurveTo":
            ai.push(" c ", n(j.cp1x), ",", n(j.cp1y), ",", n(j.cp2x), ",",
              n(j.cp2y), ",", n(j.x), ",", n(j.y));
            break;
          case "at":
          case "wa":
            ai.push(" ", j.type, " ", n(j.x - this.arcScaleX_ * j.radius),
              ",", n(j.y - this.arcScaleY_ * j.radius), " ", n(j.x + this
                .arcScaleX_ * j.radius), ",", n(j.y + this.arcScaleY_ * j
                .radius), " ", n(j.xStart), ",", n(j.yStart), " ", n(j.xEnd),
              ",", n(j.yEnd));
            break
        }
        if (j) {
          if (Z.x == null || j.x < Z.x) {
            Z.x = j.x
          }
          if (aj.x == null || j.x > aj.x) {
            aj.x = j.x
          }
          if (Z.y == null || j.y < Z.y) {
            Z.y = j.y
          }
          if (aj.y == null || j.y > aj.y) {
            aj.y = j.y
          }
        }
      }
      ai.push(' ">');
      if (!ak) {
        w(this, ai)
      } else {
        G(this, ai, Z, aj)
      }
      ai.push("</g_vml_:shape>");
      this.element_.insertAdjacentHTML("beforeEnd", ai.join(""))
    };

    function w(m, ag) {
      var j = F(m.strokeStyle);
      var p = j.color;
      var Z = j.alpha * m.globalAlpha;
      var i = m.lineScale_ * m.lineWidth;
      if (i < 1) {
        Z *= i
      }
      ag.push("<g_vml_:stroke", ' opacity="', Z, '"', ' joinstyle="', m.lineJoin,
        '"', ' dashstyle="', m.lineDash.join(" "), '"', ' miterlimit="', m.miterLimit,
        '"', ' endcap="', S(m.lineCap), '"', ' weight="', i, 'px"',
        ' color="', p, '" />')
    }

    function G(aq, ai, aK, ar) {
      var aj = aq.fillStyle;
      var aB = aq.arcScaleX_;
      var aA = aq.arcScaleY_;
      var j = ar.x - aK.x;
      var p = ar.y - aK.y;
      if (aj instanceof U) {
        var an = 0;
        var aF = {
          x: 0,
          y: 0
        };
        var ax = 0;
        var am = 1;
        if (aj.type_ == "gradient") {
          var al = aj.x0_ / aB;
          var m = aj.y0_ / aA;
          var ak = aj.x1_ / aB;
          var aM = aj.y1_ / aA;
          var aJ = V(aq, al, m);
          var aI = V(aq, ak, aM);
          var ag = aI.x - aJ.x;
          var Z = aI.y - aJ.y;
          an = Math.atan2(ag, Z) * 180 / Math.PI;
          if (an < 0) {
            an += 360
          }
          if (an < 0.000001) {
            an = 0
          }
        } else {
          var aJ = V(aq, aj.x0_, aj.y0_);
          aF = {
            x: (aJ.x - aK.x) / j,
            y: (aJ.y - aK.y) / p
          };
          j /= aB * d;
          p /= aA * d;
          var aD = ab.max(j, p);
          ax = 2 * aj.r0_ / aD;
          am = 2 * aj.r1_ / aD - ax
        }
        var av = aj.colors_;
        av.sort(function(aN, i) {
          return aN.offset - i.offset
        });
        var ap = av.length;
        var au = av[0].color;
        var at = av[ap - 1].color;
        var az = av[0].alpha * aq.globalAlpha;
        var ay = av[ap - 1].alpha * aq.globalAlpha;
        var aE = [];
        for (var aH = 0; aH < ap; aH++) {
          var ao = av[aH];
          aE.push(ao.offset * am + ax + " " + ao.color)
        }
        ai.push('<g_vml_:fill type="', aj.type_, '"',
          ' method="none" focus="100%"', ' color="', au, '"', ' color2="',
          at, '"', ' colors="', aE.join(","), '"', ' opacity="', ay, '"',
          ' g_o_:opacity2="', az, '"', ' angle="', an, '"',
          ' focusposition="', aF.x, ",", aF.y, '" />')
      } else {
        if (aj instanceof T) {
          if (j && p) {
            var ah = -aK.x;
            var aC = -aK.y;
            ai.push("<g_vml_:fill", ' position="', ah / j * aB * aB, ",", aC /
              p * aA * aA, '"', ' type="tile"', ' src="', aj.src_, '" />')
          }
        } else {
          var aL = F(aq.fillStyle);
          var aw = aL.color;
          var aG = aL.alpha * aq.globalAlpha;
          ai.push('<g_vml_:fill color="', aw, '" opacity="', aG, '" />')
        }
      }
    }
    q.fill = function() {
      this.$stroke(true)
    };
    q.closePath = function() {
      this.currentPath_.push({
        type: "close"
      })
    };

    function V(j, Z, p) {
      var i = j.m_;
      return {
        x: d * (Z * i[0][0] + p * i[1][0] + i[2][0]) - f,
        y: d * (Z * i[0][1] + p * i[1][1] + i[2][1]) - f
      }
    }
    q.save = function() {
      var i = {};
      v(this, i);
      this.aStack_.push(i);
      this.mStack_.push(this.m_);
      this.m_ = J(B(), this.m_)
    };
    q.restore = function() {
      if (this.aStack_.length) {
        v(this.aStack_.pop(), this);
        this.m_ = this.mStack_.pop()
      }
    };

    function h(i) {
      return isFinite(i[0][0]) && isFinite(i[0][1]) && isFinite(i[1][0]) &&
        isFinite(i[1][1]) && isFinite(i[2][0]) && isFinite(i[2][1])
    }

    function aa(j, i, p) {
      if (!h(i)) {
        return
      }
      j.m_ = i;
      if (p) {
        var Z = i[0][0] * i[1][1] - i[0][1] * i[1][0];
        j.lineScale_ = N(H(Z))
      }
    }
    q.translate = function(m, j) {
      var i = [
        [1, 0, 0],
        [0, 1, 0],
        [m, j, 1]
      ];
      aa(this, J(i, this.m_), false)
    };
    q.rotate = function(j) {
      var p = A(j);
      var m = l(j);
      var i = [
        [p, m, 0],
        [-m, p, 0],
        [0, 0, 1]
      ];
      aa(this, J(i, this.m_), false)
    };
    q.scale = function(m, j) {
      this.arcScaleX_ *= m;
      this.arcScaleY_ *= j;
      var i = [
        [m, 0, 0],
        [0, j, 0],
        [0, 0, 1]
      ];
      aa(this, J(i, this.m_), true)
    };
    q.transform = function(Z, p, ah, ag, j, i) {
      var m = [
        [Z, p, 0],
        [ah, ag, 0],
        [j, i, 1]
      ];
      aa(this, J(m, this.m_), true)
    };
    q.setTransform = function(ag, Z, ai, ah, p, j) {
      var i = [
        [ag, Z, 0],
        [ai, ah, 0],
        [p, j, 1]
      ];
      aa(this, i, true)
    };
    q.drawText_ = function(am, ak, aj, ap, ai) {
      var ao = this.m_,
        at = 1000,
        j = 0,
        ar = at,
        ah = {
          x: 0,
          y: 0
        },
        ag = [];
      var i = u(E(this.font), this.element_);
      var p = ac(i);
      var au = this.element_.currentStyle;
      var Z = this.textAlign.toLowerCase();
      switch (Z) {
        case "left":
        case "center":
        case "right":
          break;
        case "end":
          Z = au.direction == "ltr" ? "right" : "left";
          break;
        case "start":
          Z = au.direction == "rtl" ? "right" : "left";
          break;
        default:
          Z = "left"
      }
      switch (this.textBaseline) {
        case "hanging":
        case "top":
          ah.y = i.size / 1.75;
          break;
        case "middle":
          break;
        default:
        case null:
        case "alphabetic":
        case "ideographic":
        case "bottom":
          ah.y = -i.size / 3;
          break
      }
      switch (Z) {
        case "right":
          j = at;
          ar = 0.05;
          break;
        case "center":
          j = ar = at / 2;
          break
      }
      var aq = V(this, ak + ah.x, aj + ah.y);
      ag.push('<g_vml_:line from="', -j, ' 0" to="', ar, ' 0.05" ',
        ' coordsize="100 100" coordorigin="0 0"', ' filled="', !ai,
        '" stroked="', !!ai,
        '" style="position:absolute;width:1px;height:1px;left:0px;top:0px;">'
      );
      if (ai) {
        w(this, ag)
      } else {
        G(this, ag, {
          x: -j,
          y: 0
        }, {
          x: ar,
          y: i.size
        })
      }
      var an = ao[0][0].toFixed(3) + "," + ao[1][0].toFixed(3) + "," + ao[0]
        [1].toFixed(3) + "," + ao[1][1].toFixed(3) + ",0,0";
      var al = n(aq.x / d) + "," + n(aq.y / d);
      ag.push('<g_vml_:skew on="t" matrix="', an, '" ', ' offset="', al,
        '" origin="', j, ' 0" />', '<g_vml_:path textpathok="true" />',
        '<g_vml_:textpath on="true" string="', af(am),
        '" style="v-text-align:', Z, ";font:", af(p),
        '" /></g_vml_:line>');
      this.element_.insertAdjacentHTML("beforeEnd", ag.join(""))
    };
    q.fillText = function(m, i, p, j) {
      this.drawText_(m, i, p, j, false)
    };
    q.strokeText = function(m, i, p, j) {
      this.drawText_(m, i, p, j, true)
    };
    q.measureText = function(m) {
      if (!this.textMeasureEl_) {
        var i =
          '<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>';
        this.element_.insertAdjacentHTML("beforeEnd", i);
        this.textMeasureEl_ = this.element_.lastChild
      }
      var j = this.element_.ownerDocument;
      this.textMeasureEl_.innerHTML = "";
      this.textMeasureEl_.style.font = this.font;
      this.textMeasureEl_.appendChild(j.createTextNode(m));
      return {
        width: this.textMeasureEl_.offsetWidth
      }
    };
    q.clip = function() {};
    q.arcTo = function() {};
    q.createPattern = function(j, i) {
      return new T(j, i)
    };

    function U(i) {
      this.type_ = i;
      this.x0_ = 0;
      this.y0_ = 0;
      this.r0_ = 0;
      this.x1_ = 0;
      this.y1_ = 0;
      this.r1_ = 0;
      this.colors_ = []
    }
    U.prototype.addColorStop = function(j, i) {
      i = F(i);
      this.colors_.push({
        offset: j,
        color: i.color,
        alpha: i.alpha
      })
    };

    function T(j, i) {
      Q(j);
      switch (i) {
        case "repeat":
        case null:
        case "":
          this.repetition_ = "repeat";
          break;
        case "repeat-x":
        case "repeat-y":
        case "no-repeat":
          this.repetition_ = i;
          break;
        default:
          O("SYNTAX_ERR")
      }
      this.src_ = j.src;
      this.width_ = j.width;
      this.height_ = j.height
    }

    function O(i) {
      throw new P(i)
    }

    function Q(i) {
      if (!i || i.nodeType != 1 || i.tagName != "IMG") {
        O("TYPE_MISMATCH_ERR")
      }
      if (i.readyState != "complete") {
        O("INVALID_STATE_ERR")
      }
    }

    function P(i) {
      this.code = this[i];
      this.message = i + ": DOM Exception " + this.code
    }
    var X = P.prototype = new Error();
    X.INDEX_SIZE_ERR = 1;
    X.DOMSTRING_SIZE_ERR = 2;
    X.HIERARCHY_REQUEST_ERR = 3;
    X.WRONG_DOCUMENT_ERR = 4;
    X.INVALID_CHARACTER_ERR = 5;
    X.NO_DATA_ALLOWED_ERR = 6;
    X.NO_MODIFICATION_ALLOWED_ERR = 7;
    X.NOT_FOUND_ERR = 8;
    X.NOT_SUPPORTED_ERR = 9;
    X.INUSE_ATTRIBUTE_ERR = 10;
    X.INVALID_STATE_ERR = 11;
    X.SYNTAX_ERR = 12;
    X.INVALID_MODIFICATION_ERR = 13;
    X.NAMESPACE_ERR = 14;
    X.INVALID_ACCESS_ERR = 15;
    X.VALIDATION_ERR = 16;
    X.TYPE_MISMATCH_ERR = 17;
    G_vmlCanvasManager = e;
    CanvasRenderingContext2D = D;
    CanvasGradient = U;
    CanvasPattern = T;
    DOMException = P
  })()
}(Ext.cmd.derive("Ext.draw.engine.Canvas", Ext.draw.Surface, {
  config: {
    highPrecision: false
  },
  statics: {
    contextOverrides: {
      setGradientBBox: function(a) {
        this.bbox = a
      },
      fill: function() {
        var c = this.fillStyle,
          a = this.fillGradient,
          b = this.fillOpacity,
          d = this.globalAlpha,
          e = this.bbox;
        if (c !== Ext.draw.Color.RGBA_NONE && b !== 0) {
          if (a && e) {
            this.fillStyle = a.generateGradient(this, e)
          }
          if (b !== 1) {
            this.globalAlpha = d * b
          }
          this.$fill();
          if (b !== 1) {
            this.globalAlpha = d
          }
          if (a && e) {
            this.fillStyle = c
          }
        }
      },
      stroke: function() {
        var e = this.strokeStyle,
          c = this.strokeGradient,
          a = this.strokeOpacity,
          b = this.globalAlpha,
          d = this.bbox;
        if (e !== Ext.draw.Color.RGBA_NONE && a !== 0) {
          if (c && d) {
            this.strokeStyle = c.generateGradient(this, d)
          }
          if (a !== 1) {
            this.globalAlpha = b * a
          }
          this.$stroke();
          if (a !== 1) {
            this.globalAlpha = b
          }
          if (c && d) {
            this.strokeStyle = e
          }
        }
      },
      fillStroke: function(d, e) {
        var j = this,
          i = this.fillStyle,
          h = this.fillOpacity,
          f = this.strokeStyle,
          c = this.strokeOpacity,
          b = j.shadowColor,
          a = j.shadowBlur,
          g = Ext.draw.Color.RGBA_NONE;
        if (e === undefined) {
          e = d.transformFillStroke
        }
        if (!e) {
          d.inverseMatrix.toContext(j)
        }
        if (i !== g && h !== 0) {
          j.fill();
          j.shadowColor = g;
          j.shadowBlur = 0
        }
        if (f !== g && c !== 0) {
          j.stroke()
        }
        j.shadowColor = b;
        j.shadowBlur = a
      },
      setLineDash: function(a) {
        if (this.$setLineDash) {
          this.$setLineDash(a)
        }
      },
      ellipse: function(g, e, c, a, j, b, f, d) {
        var i = Math.cos(j),
          h = Math.sin(j);
        this.transform(i * c, h * c, -h * a, i * a, g, e);
        this.arc(0, 0, 1, b, f, d);
        this.transform(i / c, -h / a, h / c, i / a, -(i * g + h * e) / c, (
          h * g - i * e) / a)
      },
      appendPath: function(f) {
        var e = this,
          c = 0,
          b = 0,
          a = f.commands,
          g = f.params,
          d = a.length;
        e.beginPath();
        for (; c < d; c++) {
          switch (a[c]) {
            case "M":
              e.moveTo(g[b], g[b + 1]);
              b += 2;
              break;
            case "L":
              e.lineTo(g[b], g[b + 1]);
              b += 2;
              break;
            case "C":
              e.bezierCurveTo(g[b], g[b + 1], g[b + 2], g[b + 3], g[b + 4],
                g[b + 5]);
              b += 6;
              break;
            case "Z":
              e.closePath();
              break
          }
        }
      },
      save: function() {
        var c = this.toSave,
          d = c.length,
          e = d && {},
          b = 0,
          a;
        for (; b < d; b++) {
          a = c[b];
          if (a in this) {
            e[a] = this[a]
          }
        }
        this.state.push(e);
        this.$save()
      },
      restore: function() {
        var b = this.state.pop(),
          a;
        if (b) {
          for (a in b) {
            this[a] = b[a]
          }
        }
        this.$restore()
      }
    }
  },
  splitThreshold: 3000,
  toSave: ["fillGradient", "strokeGradient"],
  element: {
    reference: "element",
    style: {
      position: "absolute"
    },
    children: [{
      reference: "innerElement",
      style: {
        width: "100%",
        height: "100%",
        position: "relative"
      }
    }]
  },
  createCanvas: function() {
    var c = Ext.Element.create({
      tag: "canvas",
      cls: "x-surface-canvas"
    });
    window.G_vmlCanvasManager && G_vmlCanvasManager.initElement(c.dom);
    var e = Ext.draw.engine.Canvas.contextOverrides,
      a = c.dom.getContext("2d"),
      d = a.webkitBackingStorePixelRatio || a.mozBackingStorePixelRatio ||
      a.msBackingStorePixelRatio || a.oBackingStorePixelRatio || a.backingStorePixelRatio ||
      1,
      b;
    this.devicePixelRatio /= (Ext.os.is.WindowsPhone) ? window.innerWidth /
      window.screen.width : d;
    if (a.ellipse) {
      delete e.ellipse
    }
    a.state = [];
    a.toSave = this.toSave;
    for (b in e) {
      a["$" + b] = a[b]
    }
    Ext.apply(a, e);
    if (this.getHighPrecision()) {
      this.enablePrecisionCompensation(a)
    } else {
      this.disablePrecisionCompensation(a)
    }
    this.innerElement.appendChild(c);
    this.canvases.push(c);
    this.contexts.push(a)
  },
  afterCachedConfig: function() {
    Ext.draw.Surface.prototype.afterCachedConfig.call(this);
    this.createCanvas()
  },
  updateHighPrecision: function(d) {
    var e = this.contexts,
      c = e.length,
      b, a;
    for (b = 0; b < c; b++) {
      a = e[b];
      if (d) {
        this.enablePrecisionCompensation(a)
      } else {
        this.disablePrecisionCompensation(a)
      }
    }
  },
  precisionNames: ["rect", "fillRect", "strokeRect", "clearRect", "moveTo",
    "lineTo", "arc", "arcTo", "save", "restore",
    "updatePrecisionCompensate", "setTransform", "transform", "scale",
    "translate", "rotate", "quadraticCurveTo", "bezierCurveTo",
    "createLinearGradient", "createRadialGradient", "fillText",
    "strokeText", "drawImage"
  ],
  disablePrecisionCompensation: function(b) {
    var a = Ext.draw.engine.Canvas.contextOverrides,
      f = this.precisionNames,
      e = f.length,
      d, c;
    for (d = 0; d < e; d++) {
      c = f[d];
      if (!(c in a)) {
        delete b[c]
      }
    }
    this.setDirty(true)
  },
  enablePrecisionCompensation: function(j) {
    var c = this,
      a = 1,
      g = 1,
      l = 0,
      k = 0,
      i = new Ext.draw.Matrix(),
      b = [],
      e = {},
      d = Ext.draw.engine.Canvas.contextOverrides,
      h = j.constructor.prototype;
    var f = {
      toSave: c.toSave,
      rect: function(m, p, n, o) {
        return h.rect.call(this, m * a + l, p * g + k, n * a, o * g)
      },
      fillRect: function(m, p, n, o) {
        this.updatePrecisionCompensateRect();
        h.fillRect.call(this, m * a + l, p * g + k, n * a, o * g);
        this.updatePrecisionCompensate()
      },
      strokeRect: function(m, p, n, o) {
        this.updatePrecisionCompensateRect();
        h.strokeRect.call(this, m * a + l, p * g + k, n * a, o * g);
        this.updatePrecisionCompensate()
      },
      clearRect: function(m, p, n, o) {
        return h.clearRect.call(this, m * a + l, p * g + k, n * a, o *
          g)
      },
      moveTo: function(m, n) {
        return h.moveTo.call(this, m * a + l, n * g + k)
      },
      lineTo: function(m, n) {
        return h.lineTo.call(this, m * a + l, n * g + k)
      },
      arc: function(n, r, m, p, o, q) {
        this.updatePrecisionCompensateRect();
        h.arc.call(this, n * a + l, r * a + k, m * a, p, o, q);
        this.updatePrecisionCompensate()
      },
      arcTo: function(o, q, n, p, m) {
        this.updatePrecisionCompensateRect();
        h.arcTo.call(this, o * a + l, q * g + k, n * a + l, p * g + k,
          m * a);
        this.updatePrecisionCompensate()
      },
      save: function() {
        b.push(i);
        i = i.clone();
        d.save.call(this);
        h.save.call(this)
      },
      restore: function() {
        i = b.pop();
        d.restore.call(this);
        h.restore.call(this);
        this.updatePrecisionCompensate()
      },
      updatePrecisionCompensate: function() {
        i.precisionCompensate(c.devicePixelRatio, e);
        a = e.xx;
        g = e.yy;
        l = e.dx;
        k = e.dy;
        h.setTransform.call(this, c.devicePixelRatio, e.b, e.c, e.d,
          0, 0)
      },
      updatePrecisionCompensateRect: function() {
        i.precisionCompensateRect(c.devicePixelRatio, e);
        a = e.xx;
        g = e.yy;
        l = e.dx;
        k = e.dy;
        h.setTransform.call(this, c.devicePixelRatio, e.b, e.c, e.d,
          0, 0)
      },
      setTransform: function(q, o, n, m, r, p) {
        i.set(q, o, n, m, r, p);
        this.updatePrecisionCompensate()
      },
      transform: function(q, o, n, m, r, p) {
        i.append(q, o, n, m, r, p);
        this.updatePrecisionCompensate()
      },
      scale: function(n, m) {
        this.transform(n, 0, 0, m, 0, 0)
      },
      translate: function(n, m) {
        this.transform(1, 0, 0, 1, n, m)
      },
      rotate: function(o) {
        var n = Math.cos(o),
          m = Math.sin(o);
        this.transform(n, m, -m, n, 0, 0)
      },
      quadraticCurveTo: function(n, p, m, o) {
        h.quadraticCurveTo.call(this, n * a + l, p * g + k, m * a + l,
          o * g + k)
      },
      bezierCurveTo: function(r, p, o, n, m, q) {
        h.bezierCurveTo.call(this, r * a + l, p * g + k, o * a + l, n *
          g + k, m * a + l, q * g + k)
      },
      createLinearGradient: function(n, p, m, o) {
        this.updatePrecisionCompensateRect();
        var q = h.createLinearGradient.call(this, n * a + l, p * g +
          k, m * a + l, o * g + k);
        this.updatePrecisionCompensate();
        return q
      },
      createRadialGradient: function(p, r, o, n, q, m) {
        this.updatePrecisionCompensateRect();
        var s = h.createLinearGradient.call(this, p * a + l, r * a +
          k, o * a, n * a + l, q * a + k, m * a);
        this.updatePrecisionCompensate();
        return s
      },
      fillText: function(o, m, p, n) {
        h.setTransform.apply(this, i.elements);
        if (typeof n === "undefined") {
          h.fillText.call(this, o, m, p)
        } else {
          h.fillText.call(this, o, m, p, n)
        }
        this.updatePrecisionCompensate()
      },
      strokeText: function(o, m, p, n) {
        h.setTransform.apply(this, i.elements);
        if (typeof n === "undefined") {
          h.strokeText.call(this, o, m, p)
        } else {
          h.strokeText.call(this, o, m, p, n)
        }
        this.updatePrecisionCompensate()
      },
      fill: function() {
        var m = this.fillGradient,
          n = this.bbox;
        this.updatePrecisionCompensateRect();
        if (m && n) {
          this.fillStyle = m.generateGradient(this, n)
        }
        h.fill.call(this);
        this.updatePrecisionCompensate()
      },
      stroke: function() {
        var m = this.strokeGradient,
          n = this.bbox;
        this.updatePrecisionCompensateRect();
        if (m && n) {
          this.strokeStyle = m.generateGradient(this, n)
        }
        h.stroke.call(this);
        this.updatePrecisionCompensate()
      },
      drawImage: function(u, s, r, q, p, o, n, m, t) {
        switch (arguments.length) {
          case 3:
            return h.drawImage.call(this, u, s * a + l, r * g + k);
          case 5:
            return h.drawImage.call(this, u, s * a + l, r * g + k, q *
              a, p * g);
          case 9:
            return h.drawImage.call(this, u, s, r, q, p, o * a + l, n *
              g * k, m * a, t * g)
        }
      }
    };
    Ext.apply(j, f);
    this.setDirty(true)
  },
  updateRect: function(a) {
    Ext.draw.Surface.prototype.updateRect.call(this, a);
    var C = this,
      p = Math.floor(a[0]),
      e = Math.floor(a[1]),
      g = Math.ceil(a[0] + a[2]),
      B = Math.ceil(a[1] + a[3]),
      u = C.devicePixelRatio,
      D = C.canvases,
      d = g - p,
      y = B - e,
      n = Math.round(C.splitThreshold / u),
      c = C.xSplits = Math.ceil(d / n),
      f = C.ySplits = Math.ceil(y / n),
      v, s, q, A, z, x, o, m;
    for (s = 0, z = 0; s < f; s++, z += n) {
      for (v = 0, A = 0; v < c; v++, A += n) {
        q = s * c + v;
        if (q >= D.length) {
          C.createCanvas()
        }
        x = D[q].dom;
        x.style.left = A + "px";
        x.style.top = z + "px";
        m = Math.min(n, y - z);
        if (m * u !== x.height) {
          x.height = m * u;
          x.style.height = m + "px"
        }
        o = Math.min(n, d - A);
        if (o * u !== x.width) {
          x.width = o * u;
          x.style.width = o + "px"
        }
        C.applyDefaults(C.contexts[q])
      }
    }
    for (q += 1; q < D.length; q++) {
      D[q].destroy()
    }
    C.activeCanvases = c * f;
    D.length = C.activeCanvases;
    C.clear()
  },
  clearTransform: function() {
    var f = this,
      a = f.xSplits,
      g = f.ySplits,
      d = f.contexts,
      h = f.splitThreshold,
      l = f.devicePixelRatio,
      e, c, b, m;
    for (e = 0; e < a; e++) {
      for (c = 0; c < g; c++) {
        b = c * a + e;
        m = d[b];
        m.translate(-h * e, -h * c);
        m.scale(l, l);
        f.matrix.toContext(m)
      }
    }
  },
  renderSprite: function(q) {
    var C = this,
      b = C.getRect(),
      e = C.matrix,
      g = q.getParent(),
      v = Ext.draw.Matrix.fly([1, 0, 0, 1, 0, 0]),
      p = C.splitThreshold / C.devicePixelRatio,
      c = C.xSplits,
      m = C.ySplits,
      A, z, s, a, r, o, d = 0,
      B, n = 0,
      f, l = b[2],
      y = b[3],
      x, u, t;
    while (g && (g !== C)) {
      v.prependMatrix(g.matrix || g.attr && g.attr.matrix);
      g = g.getParent()
    }
    v.prependMatrix(e);
    a = q.getBBox();
    if (a) {
      a = v.transformBBox(a)
    }
    q.preRender(C);
    if (q.attr.hidden || q.attr.globalAlpha === 0) {
      q.setDirty(false);
      return
    }
    for (u = 0, z = 0; u < m; u++, z += p) {
      for (x = 0, A = 0; x < c; x++, A += p) {
        t = u * c + x;
        s = C.contexts[t];
        r = Math.min(p, l - A);
        o = Math.min(p, y - z);
        d = A;
        B = d + r;
        n = z;
        f = n + o;
        if (a) {
          if (a.x > B || a.x + a.width < d || a.y > f || a.y + a.height <
            n) {
            continue
          }
        }
        s.save();
        q.useAttributes(s, b);
        if (false === q.render(C, s, [d, n, r, o], b)) {
          return false
        }
        s.restore()
      }
    }
    q.setDirty(false)
  },
  flatten: function(n, a) {
    var k = document.createElement("canvas"),
      f = Ext.getClassName(this),
      g = this.devicePixelRatio,
      l = k.getContext("2d"),
      b, c, h, e, d, m;
    k.width = Math.ceil(n.width * g);
    k.height = Math.ceil(n.height * g);
    for (e = 0; e < a.length; e++) {
      b = a[e];
      if (Ext.getClassName(b) !== f) {
        continue
      }
      h = b.getRect();
      for (d = 0; d < b.canvases.length; d++) {
        c = b.canvases[d];
        m = c.getOffsetsTo(c.getParent());
        l.drawImage(c.dom, (h[0] + m[0]) * g, (h[1] + m[1]) * g)
      }
    }
    return {
      data: k.toDataURL(),
      type: "png"
    }
  },
  applyDefaults: function(a) {
    var b = Ext.draw.Color.RGBA_NONE;
    a.strokeStyle = b;
    a.fillStyle = b;
    a.textAlign = "start";
    a.textBaseline = "alphabetic";
    a.miterLimit = 1
  },
  clear: function() {
    var d = this,
      e = d.activeCanvases,
      c, b, a;
    for (c = 0; c < e; c++) {
      b = d.canvases[c].dom;
      a = d.contexts[c];
      a.setTransform(1, 0, 0, 1, 0, 0);
      a.clearRect(0, 0, b.width, b.height)
    }
    d.setDirty(true)
  },
  destroy: function() {
    var c = this,
      a, b = c.canvases.length;
    for (a = 0; a < b; a++) {
      c.contexts[a] = null;
      c.canvases[a].destroy();
      c.canvases[a] = null
    }
    delete c.contexts;
    delete c.canvases;
    Ext.draw.Surface.prototype.destroy.call(this)
  },
  privates: {
    initElement: function() {
      var a = this;
      Ext.draw.Surface.prototype.initElement.call(this);
      a.canvases = [];
      a.contexts = [];
      a.activeCanvases = (a.xSplits = 0) * (a.ySplits = 0)
    }
  }
}, 0, 0, ["widget", "surface"], {
  widget: true,
  surface: true
}, 0, 0, [Ext.draw.engine, "Canvas"], function() {
  var c = this,
    b = c.prototype,
    a = 10000000000;
  if (Ext.os.is.Android4 && Ext.browser.is.Chrome) {
    a = 3000
  } else {
    if (Ext.is.iOS) {
      a = 2200
    }
  }
  b.splitThreshold = a
}));
(Ext.cmd.derive("Ext.draw.Container", Ext.draw.ContainerBase, {
    alternateClassName: "Ext.draw.Component",
    defaultType: "surface",
    engine: "Ext.draw.engine.Canvas",
    config: {
      cls: "x-draw-container",
      resizeHandler: null,
      sprites: null,
      gradients: []
    },
    defaultDownloadServerUrl: "http://svg.sencha.io",
    supportedFormats: ["png", "pdf", "jpeg", "gif"],
    supportedOptions: {
      version: Ext.isNumber,
      data: Ext.isString,
      format: function(a) {
        return Ext.Array.indexOf(this.supportedFormats, a) >= 0
      },
      filename: Ext.isString,
      width: Ext.isNumber,
      height: Ext.isNumber,
      scale: Ext.isNumber,
      pdf: Ext.isObject,
      jpeg: Ext.isObject
    },
    initAnimator: function() {
      this.frameCallbackId = Ext.draw.Animator.addFrameCallback(
        "renderFrame", this)
    },
    applyGradients: function(b) {
      var a = [],
        c, f, d, e;
      if (!Ext.isArray(b)) {
        return a
      }
      for (c = 0, f = b.length; c < f; c++) {
        d = b[c];
        if (!Ext.isObject(d)) {
          continue
        }
        if (typeof d.type !== "string") {
          d.type = "linear"
        }
        if (d.angle) {
          d.degrees = d.angle;
          delete d.angle
        }
        if (Ext.isObject(d.stops)) {
          d.stops = (function(i) {
            var g = [],
              h;
            for (e in i) {
              h = i[e];
              h.offset = e / 100;
              g.push(h)
            }
            return g
          })(d.stops)
        }
        a.push(d)
      }
      Ext.draw.gradient.GradientDefinition.add(a);
      return a
    },
    applySprites: function(f) {
      if (!f) {
        return
      }
      f = Ext.Array.from(f);
      var e = f.length,
        b = [],
        d, a, c;
      for (d = 0; d < e; d++) {
        c = f[d];
        a = c.surface;
        if (!(a && a.isSurface)) {
          if (Ext.isString(a)) {
            a = this.getSurface(a)
          } else {
            a = this.getSurface("main")
          }
        }
        c = a.add(c);
        b.push(c)
      }
      return b
    },
    onBodyResize: function() {
      var b = this.element,
        a;
      if (!b) {
        return
      }
      a = b.getSize();
      if (a.width && a.height) {
        this.setBodySize(a)
      }
    },
    setBodySize: function(c) {
      var d = this,
        b = d.getResizeHandler() || d.defaultResizeHandler,
        a;
      d.fireEvent("bodyresize", d, c);
      a = b.call(d, c);
      if (a !== false) {
        d.renderFrame()
      }
    },
    defaultResizeHandler: function(a) {
      this.getItems().each(function(b) {
        b.setRect([0, 0, a.width, a.height])
      })
    },
    getSurface: function(d) {
      d = this.getId() + "-" + (d || "main");
      var c = this,
        b = c.getItems(),
        a = b.get(d);
      if (!a) {
        a = c.add({
          xclass: c.engine,
          id: d
        });
        c.onBodyResize()
      }
      return a
    },
    renderFrame: function() {
      var e = this,
        a = e.getItems(),
        b, d, c;
      for (b = 0, d = a.length; b < d; b++) {
        c = a.items[b];
        if (c.isSurface) {
          c.renderFrame()
        }
      }
    },
    getImage: function(k) {
      var l = this.innerElement.getSize(),
        a = Array.prototype.slice.call(this.items.items),
        d, g, c = this.surfaceZIndexes,
        f, e, b, h;
      for (e = 1; e < a.length; e++) {
        b = a[e];
        h = c[b.type];
        f = e - 1;
        while (f >= 0 && c[a[f].type] > h) {
          a[f + 1] = a[f];
          f--
        }
        a[f + 1] = b
      }
      d = a[0].flatten(l, a);
      if (k === "image") {
        g = new Image();
        g.src = d.data;
        d.data = g;
        return d
      }
      if (k === "stream") {
        d.data = d.data.replace(/^data:image\/[^;]+/,
          "data:application/octet-stream");
        return d
      }
      return d
    },
    download: function(d) {
      var e = this,
        a = [],
        b, c, f;
      d = Ext.apply({
        version: 2,
        data: e.getImage().data
      }, d);
      for (c in d) {
        if (d.hasOwnProperty(c)) {
          f = d[c];
          if (c in e.supportedOptions) {
            if (e.supportedOptions[c].call(e, f)) {
              a.push({
                tag: "input",
                type: "hidden",
                name: c,
                value: Ext.String.htmlEncode(Ext.isObject(f) ? Ext.JSON
                  .encode(f) : f)
              })
            }
          }
        }
      }
      b = Ext.dom.Helper.markup({
        tag: "html",
        children: [{
          tag: "head"
        }, {
          tag: "body",
          children: [{
            tag: "form",
            method: "POST",
            action: d.url || e.defaultDownloadServerUrl,
            children: a
          }, {
            tag: "script",
            type: "text/javascript",
            children: 'document.getElementsByTagName("form")[0].submit();'
          }]
        }]
      });
      window.open("", "ImageDownload_" + Date.now()).document.write(b)
    },
    destroy: function() {
      var a = this.frameCallbackId;
      if (a) {
        Ext.draw.Animator.removeFrameCallback(a)
      }
      Ext.draw.ContainerBase.prototype.destroy.call(this)
    }
  }, 0, ["draw"], ["component", "box", "container", "panel", "draw"], {
    component: true,
    box: true,
    container: true,
    panel: true,
    draw: true
  }, ["widget.draw"], 0, [Ext.draw, "Container", Ext.draw, "Component"],
  function() {
    if (location.search.match("svg")) {
      Ext.draw.Container.prototype.engine = "Ext.draw.engine.Svg"
    } else {
      if ((Ext.os.is.BlackBerry && Ext.os.version.getMajor() === 10) || (Ext.browser
          .is.AndroidStock4 && (Ext.os.version.getMinor() === 1 || Ext.os.version
            .getMinor() === 2 || Ext.os.version.getMinor() === 3))) {
        Ext.draw.Container.prototype.engine = "Ext.draw.engine.Svg"
      }
    }
  }));
(Ext.cmd.derive("Ext.chart.theme.Base", Ext.Base, {
  factoryConfig: {
    type: "chart.theme"
  },
  isTheme: true,
  config: {
    baseColor: null,
    colors: undefined,
    gradients: null,
    chart: {
      defaults: {
        background: "white"
      }
    },
    axis: {
      defaults: {
        label: {
          x: 0,
          y: 0,
          textBaseline: "middle",
          textAlign: "center",
          fontSize: "default",
          fontFamily: "default",
          fontWeight: "default",
          fillStyle: "black"
        },
        title: {
          fillStyle: "black",
          fontSize: "default*1.23",
          fontFamily: "default",
          fontWeight: "default"
        },
        style: {
          strokeStyle: "black"
        },
        grid: {
          strokeStyle: "rgb(221, 221, 221)"
        }
      },
      top: {
        style: {
          textPadding: 5
        }
      },
      bottom: {
        style: {
          textPadding: 5
        }
      }
    },
    series: {
      defaults: {
        label: {
          fillStyle: "black",
          strokeStyle: "none",
          fontFamily: "default",
          fontWeight: "default",
          fontSize: "default*1.077",
          textBaseline: "middle",
          textAlign: "center"
        },
        labelOverflowPadding: 5
      }
    },
    sprites: {
      text: {
        fontSize: "default",
        fontWeight: "default",
        fontFamily: "default",
        fillStyle: "black"
      }
    },
    seriesThemes: undefined,
    markerThemes: {
      type: ["circle", "cross", "plus", "square", "triangle", "diamond"]
    },
    useGradients: false,
    background: null
  },
  colorDefaults: ["#94ae0a", "#115fa6", "#a61120", "#ff8809", "#ffd13e",
    "#a61187", "#24ad9a", "#7c7474", "#a66111"
  ],
  constructor: function(a) {
    this.initConfig(a);
    this.resolveDefaults()
  },
  defaultRegEx: /^default([+\-/\*]\d+(?:\.\d+)?)?$/,
  defaultOperators: {
    "*": function(b, a) {
      return b * a
    },
    "+": function(b, a) {
      return b + a
    },
    "-": function(b, a) {
      return b - a
    }
  },
  resolveDefaults: function() {
    var a = this;
    Ext.onReady(function() {
      var f = Ext.clone(a.getSprites()),
        e = Ext.clone(a.getAxis()),
        d = Ext.clone(a.getSeries()),
        g, c, b;
      if (!a.superclass.defaults) {
        g = Ext.getBody().createChild({
          tag: "div",
          cls: "x-component"
        });
        a.superclass.defaults = {
          fontFamily: g.getStyle("fontFamily"),
          fontWeight: g.getStyle("fontWeight"),
          fontSize: parseFloat(g.getStyle("fontSize")),
          fontVariant: g.getStyle("fontVariant"),
          fontStyle: g.getStyle("fontStyle")
        };
        g.destroy()
      }
      a.replaceDefaults(f.text);
      a.setSprites(f);
      for (c in e) {
        b = e[c];
        a.replaceDefaults(b.label);
        a.replaceDefaults(b.title)
      }
      a.setAxis(e);
      for (c in d) {
        b = d[c];
        a.replaceDefaults(b.label)
      }
      a.setSeries(d)
    })
  },
  replaceDefaults: function(h) {
    var e = this,
      g = e.superclass.defaults,
      a = e.defaultRegEx,
      d, f, c, b;
    if (Ext.isObject(h)) {
      for (d in g) {
        c = a.exec(h[d]);
        if (c) {
          f = g[d];
          c = c[1];
          if (c) {
            b = e.defaultOperators[c.charAt(0)];
            f = Math.round(b(f, parseFloat(c.substr(1))))
          }
          h[d] = f
        }
      }
    }
  },
  applyBaseColor: function(c) {
    var a, b;
    if (c) {
      a = c.isColor ? c : Ext.draw.Color.fromString(c);
      b = a.getHSL()[2];
      if (b < 0.15) {
        a = a.createLighter(0.3)
      } else {
        if (b < 0.3) {
          a = a.createLighter(0.15)
        } else {
          if (b > 0.85) {
            a = a.createDarker(0.3)
          } else {
            if (b > 0.7) {
              a = a.createDarker(0.15)
            }
          }
        }
      }
      this.setColors([a.createDarker(0.3).toString(), a.createDarker(0.15)
        .toString(), a.toString(), a.createLighter(0.12).toString(),
        a.createLighter(0.24).toString(), a.createLighter(0.31).toString()
      ])
    }
    return c
  },
  applyColors: function(a) {
    return a || this.colorDefaults
  },
  updateUseGradients: function(a) {
    if (a) {
      this.updateGradients({
        type: "linear",
        degrees: 90
      })
    }
  },
  updateBackground: function(a) {
    if (a) {
      var b = this.getChart();
      b.defaults.background = a;
      this.setChart(b)
    }
  },
  updateGradients: function(a) {
    var c = this.getColors(),
      e = [],
      h, b, d, f, g;
    if (Ext.isObject(a)) {
      for (f = 0, g = c && c.length || 0; f < g; f++) {
        b = Ext.draw.Color.fromString(c[f]);
        if (b) {
          d = b.createLighter(0.15).toString();
          h = Ext.apply(Ext.Object.chain(a), {
            stops: [{
              offset: 1,
              color: b.toString()
            }, {
              offset: 0,
              color: d.toString()
            }]
          });
          e.push(h)
        }
      }
      this.setColors(e)
    }
  },
  applySeriesThemes: function(a) {
    this.getBaseColor();
    this.getUseGradients();
    this.getGradients();
    var b = this.getColors();
    if (!a) {
      a = {
        fillStyle: Ext.Array.clone(b),
        strokeStyle: Ext.Array.map(b, function(d) {
          var c = Ext.draw.Color.fromString(d.stops ? d.stops[0].color :
            d);
          return c.createDarker(0.15).toString()
        })
      }
    }
    return a
  }
}, 1, 0, 0, 0, 0, [
  ["factoryable", Ext.mixin.Factoryable]
], [Ext.chart.theme, "Base"], 0));
(Ext.cmd.derive("Ext.chart.theme.Default", Ext.chart.theme.Base, {
  singleton: true
}, 0, 0, 0, 0, ["chart.theme.Base", "chart.theme.default"], 0, [Ext.chart.theme,
  "Default"
], 0));
(Ext.cmd.derive("Ext.chart.Markers", Ext.draw.sprite.Instancing, {
  isMarkers: true,
  defaultCategory: "default",
  constructor: function() {
    Ext.draw.sprite.Instancing.prototype.constructor.apply(this,
      arguments);
    this.categories = {};
    this.revisions = {}
  },
  getMarkerFor: function(b, a) {
    if (b in this.categories) {
      var c = this.categories[b];
      if (a in c) {
        return this.get(c[a])
      }
    }
  },
  clear: function(a) {
    a = a || this.defaultCategory;
    if (!(a in this.revisions)) {
      this.revisions[a] = 1
    } else {
      this.revisions[a]++
    }
  },
  putMarkerFor: function(e, b, c, h, f) {
    e = e || this.defaultCategory;
    var d = this,
      g = d.categories[e] || (d.categories[e] = {}),
      a;
    if (c in g) {
      d.setAttributesFor(g[c], b, h)
    } else {
      g[c] = d.getCount();
      d.createInstance(b, h)
    }
    a = d.get(g[c]);
    if (a) {
      a.category = e;
      if (!f) {
        a.revision = d.revisions[e] || (d.revisions[e] = 1)
      }
    }
  },
  getMarkerBBoxFor: function(c, a, b) {
    if (c in this.categories) {
      var d = this.categories[c];
      if (a in d) {
        return this.getBBoxFor(d[a], b)
      }
    }
  },
  getBBox: function() {
    return null
  },
  render: function(a, l, b) {
    var f = this,
      k = f.revisions,
      j = f.attr.matrix,
      h = f.getTemplate(),
      d = h.attr,
      g, c, e;
    j.toContext(l);
    h.preRender(a, l, b);
    h.useAttributes(l, b);
    for (c = 0, e = f.instances.length; c < e; c++) {
      g = f.get(c);
      if (g.hidden || g.revision !== k[g.category]) {
        continue
      }
      l.save();
      h.attr = g;
      h.useAttributes(l, b);
      h.render(a, l, b);
      l.restore()
    }
    h.attr = d
  }
}, 1, 0, 0, 0, 0, 0, [Ext.chart, "Markers"], 0));
(Ext.cmd.derive("Ext.chart.label.Callout", Ext.draw.modifier.Modifier, {
  prepareAttributes: function(a) {
    if (!a.hasOwnProperty("calloutOriginal")) {
      a.calloutOriginal = Ext.Object.chain(a);
      a.calloutOriginal.prototype = a
    }
    if (this._previous) {
      this._previous.prepareAttributes(a.calloutOriginal)
    }
  },
  setAttrs: function(e, h) {
    var d = e.callout,
      i = e.calloutOriginal,
      l = e.bbox.plain,
      c = (l.width || 0) + e.labelOverflowPadding,
      m = (l.height || 0) + e.labelOverflowPadding,
      p, o;
    if ("callout" in h) {
      d = h.callout
    }
    if ("callout" in h || "calloutPlaceX" in h || "calloutPlaceY" in h ||
      "x" in h || "y" in h) {
      var n = "rotationRads" in h ? i.rotationRads = h.rotationRads : i.rotationRads,
        g = "x" in h ? (i.x = h.x) : i.x,
        f = "y" in h ? (i.y = h.y) : i.y,
        b = "calloutPlaceX" in h ? h.calloutPlaceX : e.calloutPlaceX,
        a = "calloutPlaceY" in h ? h.calloutPlaceY : e.calloutPlaceY,
        k = "calloutVertical" in h ? h.calloutVertical : e.calloutVertical,
        j;
      n %= Math.PI * 2;
      if (Math.cos(n) < 0) {
        n = (n + Math.PI) % (Math.PI * 2)
      }
      if (n > Math.PI) {
        n -= Math.PI * 2
      }
      if (k) {
        n = n * (1 - d) - Math.PI / 2 * d;
        j = c;
        c = m;
        m = j
      } else {
        n = n * (1 - d)
      }
      h.rotationRads = n;
      h.x = g * (1 - d) + b * d;
      h.y = f * (1 - d) + a * d;
      p = b - g;
      o = a - f;
      if (Math.abs(o * c) > Math.abs(p * m)) {
        if (o > 0) {
          h.calloutEndX = h.x - (m / 2) * (p / o) * d;
          h.calloutEndY = h.y - (m / 2) * d
        } else {
          h.calloutEndX = h.x + (m / 2) * (p / o) * d;
          h.calloutEndY = h.y + (m / 2) * d
        }
      } else {
        if (p > 0) {
          h.calloutEndX = h.x - c / 2;
          h.calloutEndY = h.y - (c / 2) * (o / p) * d
        } else {
          h.calloutEndX = h.x + c / 2;
          h.calloutEndY = h.y + (c / 2) * (o / p) * d
        }
      }
      if (h.calloutStartX && h.calloutStartY) {
        h.calloutHasLine = (p > 0 && h.calloutStartX < h.calloutEndX) ||
          (p <= 0 && h.calloutStartX > h.calloutEndX) || (o > 0 && h.calloutStartY <
            h.calloutEndY) || (o <= 0 && h.calloutStartY > h.calloutEndY)
      } else {
        h.calloutHasLine = true
      }
    }
    return h
  },
  pushDown: function(a, b) {
    b = Ext.draw.modifier.Modifier.prototype.pushDown.call(this, a.calloutOriginal,
      b);
    return this.setAttrs(a, b)
  },
  popUp: function(a, b) {
    a = a.prototype;
    b = this.setAttrs(a, b);
    if (this._next) {
      return this._next.popUp(a, b)
    } else {
      return Ext.apply(a, b)
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.chart.label, "Callout"], 0));
(Ext.cmd.derive("Ext.chart.label.Label", Ext.draw.sprite.Text, {
  inheritableStatics: {
    def: {
      processors: {
        callout: "limited01",
        calloutHasLine: "bool",
        calloutPlaceX: "number",
        calloutPlaceY: "number",
        calloutStartX: "number",
        calloutStartY: "number",
        calloutEndX: "number",
        calloutEndY: "number",
        calloutColor: "color",
        calloutWidth: "number",
        calloutVertical: "bool",
        labelOverflowPadding: "number",
        display: "enums(none,under,over,rotate,insideStart,insideEnd,inside,outside)",
        orientation: "enums(horizontal,vertical)",
        renderer: "default"
      },
      defaults: {
        callout: 0,
        calloutHasLine: true,
        calloutPlaceX: 0,
        calloutPlaceY: 0,
        calloutStartX: 0,
        calloutStartY: 0,
        calloutEndX: 0,
        calloutEndY: 0,
        calloutWidth: 1,
        calloutVertical: false,
        calloutColor: "black",
        labelOverflowPadding: 5,
        display: "none",
        orientation: "",
        renderer: null
      },
      triggers: {
        callout: "transform",
        calloutPlaceX: "transform",
        calloutPlaceY: "transform",
        labelOverflowPadding: "transform",
        calloutRotation: "transform",
        display: "hidden"
      },
      updaters: {
        hidden: function(a) {
          a.hidden = a.display === "none"
        }
      }
    }
  },
  config: {
    fx: {
      customDurations: {
        callout: 200
      }
    },
    field: null,
    calloutLine: true
  },
  applyCalloutLine: function(a) {
    if (a) {
      return Ext.apply({}, a)
    }
  },
  prepareModifiers: function() {
    Ext.draw.sprite.Text.prototype.prepareModifiers.apply(this, arguments);
    this.calloutModifier = new Ext.chart.label.Callout({
      sprite: this
    });
    this.fx.setNext(this.calloutModifier);
    this.calloutModifier.setNext(this.topModifier)
  },
  render: function(b, c) {
    var e = this,
      a = e.attr,
      d = a.calloutColor;
    c.save();
    c.globalAlpha *= a.callout;
    if (c.globalAlpha > 0 && a.calloutHasLine) {
      if (d && d.isGradient) {
        d = d.getStops()[0].color
      }
      c.strokeStyle = d;
      c.fillStyle = d;
      c.lineWidth = a.calloutWidth;
      c.beginPath();
      c.moveTo(e.attr.calloutStartX, e.attr.calloutStartY);
      c.lineTo(e.attr.calloutEndX, e.attr.calloutEndY);
      c.stroke();
      c.beginPath();
      c.arc(e.attr.calloutStartX, e.attr.calloutStartY, 1 * a.calloutWidth,
        0, 2 * Math.PI, true);
      c.fill();
      c.beginPath();
      c.arc(e.attr.calloutEndX, e.attr.calloutEndY, 1 * a.calloutWidth, 0,
        2 * Math.PI, true);
      c.fill()
    }
    c.restore();
    Ext.draw.sprite.Text.prototype.render.apply(e, arguments)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.chart.label, "Label"], 0));
(Ext.cmd.derive("Ext.chart.series.Series", Ext.Base, {
  isSeries: true,
  defaultBindProperty: "store",
  type: null,
  seriesType: "sprite",
  identifiablePrefix: "ext-line-",
  observableType: "series",
  darkerStrokeRatio: 0.15,
  config: {
    chart: null,
    title: null,
    renderer: null,
    showInLegend: true,
    triggerAfterDraw: false,
    style: {},
    subStyle: {},
    themeStyle: {},
    colors: null,
    useDarkerStrokeColor: true,
    store: null,
    label: {},
    labelOverflowPadding: null,
    showMarkers: true,
    marker: null,
    markerSubStyle: null,
    itemInstancing: null,
    background: null,
    highlightItem: null,
    surface: null,
    overlaySurface: null,
    hidden: false,
    highlight: false,
    highlightCfg: {
      merge: function(a) {
        return a
      },
      $value: {
        fillStyle: "yellow",
        strokeStyle: "red"
      }
    },
    animation: null,
    tooltip: null
  },
  directions: [],
  sprites: null,
  themeColorCount: function() {
    return 1
  },
  themeMarkerCount: function() {
    return 0
  },
  getFields: function(f) {
    var e = this,
      a = [],
      c, b, d;
    for (b = 0, d = f.length; b < d; b++) {
      c = e["get" + f[b] + "Field"]();
      if (Ext.isArray(c)) {
        a.push.apply(a, c)
      } else {
        a.push(c)
      }
    }
    return a
  },
  applyAnimation: function(a, b) {
    if (!a) {
      a = {
        duration: 0
      }
    } else {
      if (a === true) {
        a = {
          easing: "easeInOut",
          duration: 500
        }
      }
    }
    return b ? Ext.apply({}, a, b) : a
  },
  getAnimation: function() {
    var a = this.getChart();
    if (a && a.animationSuspendCount) {
      return {
        duration: 0
      }
    } else {
      return (arguments.callee.$previous || Ext.Base.prototype.getAnimation)
        .call(this)
    }
  },
  updateTitle: function(a) {
    var j = this,
      g = j.getChart();
    if (!g || g.isInitializing) {
      return
    }
    a = Ext.Array.from(a);
    var c = g.getSeries(),
      b = Ext.Array.indexOf(c, j),
      e = g.getLegendStore(),
      h = j.getYField(),
      d, l, k, f;
    if (e.getCount() && b !== -1) {
      f = h ? Math.min(a.length, h.length) : a.length;
      for (d = 0; d < f; d++) {
        k = a[d];
        l = e.getAt(b + d);
        if (k && l) {
          l.set("name", k)
        }
      }
    }
  },
  applyHighlight: function(a, b) {
    if (Ext.isObject(a)) {
      a = Ext.merge({}, this.config.highlightCfg, a)
    } else {
      if (a === true) {
        a = this.config.highlightCfg
      }
    }
    return Ext.apply(b || {}, a)
  },
  updateHighlight: function(a) {
    this.getStyle();
    if (!Ext.Object.isEmpty(a)) {
      this.addItemHighlight()
    }
  },
  updateHighlightCfg: function(a) {
    if (!Ext.Object.equals(a, this.defaultConfig.highlightCfg)) {
      this.addItemHighlight()
    }
  },
  applyItemInstancing: function(a, b) {
    return Ext.merge(b || {}, a)
  },
  setAttributesForItem: function(c, d) {
    var b = c && c.sprite,
      a;
    if (b) {
      if (b.itemsMarker && c.category === "items") {
        b.putMarker(c.category, d, c.index, false, true)
      }
      if (b.isMarkerHolder && c.category === "markers") {
        b.putMarker(c.category, d, c.index, false, true)
      } else {
        if (b.isInstancing) {
          b.setAttributesFor(c.index, d)
        } else {
          if (Ext.isArray(b)) {
            for (a = 0; a < b.length; a++) {
              b[a].setAttributes(d)
            }
          } else {
            b.setAttributes(d)
          }
        }
      }
    }
  },
  getBBoxForItem: function(a) {
    if (a && a.sprite) {
      if (a.sprite.itemsMarker && a.category === "items") {
        return a.sprite.getMarkerBBox(a.category, a.index)
      } else {
        if (a.sprite instanceof Ext.draw.sprite.Instancing) {
          return a.sprite.getBBoxFor(a.index)
        } else {
          return a.sprite.getBBox()
        }
      }
    }
    return null
  },
  applyHighlightItem: function(d, a) {
    if (d === a) {
      return
    }
    if (Ext.isObject(d) && Ext.isObject(a)) {
      var c = d.sprite === a.sprite,
        b = d.index === a.index;
      if (c && b) {
        return
      }
    }
    return d
  },
  updateHighlightItem: function(b, a) {
    this.setAttributesForItem(a, {
      highlighted: false
    });
    this.setAttributesForItem(b, {
      highlighted: true
    })
  },
  constructor: function(a) {
    var b = this,
      c;
    a = a || {};
    if (a.tips) {
      a = Ext.apply({
        tooltip: a.tips
      }, a)
    }
    if (a.highlightCfg) {
      a = Ext.apply({
        highlight: a.highlightCfg
      }, a)
    }
    if ("id" in a) {
      c = a.id
    } else {
      if ("id" in b.config) {
        c = b.config.id
      } else {
        c = b.getId()
      }
    }
    b.setId(c);
    b.sprites = [];
    b.dataRange = [];
    b.mixins.observable.constructor.call(b, a);
    b.initBindable()
  },
  lookupViewModel: function(a) {
    var b = this.getChart();
    return b ? b.lookupViewModel(a) : null
  },
  applyTooltip: function(c, b) {
    var a = Ext.apply({
      xtype: "tooltip",
      renderer: Ext.emptyFn,
      constrainPosition: true,
      shrinkWrapDock: true,
      autoHide: true,
      offsetX: 10,
      offsetY: 10
    }, c);
    return Ext.create(a)
  },
  updateTooltip: function() {
    this.addItemHighlight()
  },
  addItemHighlight: function() {
    var d = this.getChart();
    if (!d) {
      return
    }
    var e = d.getInteractions(),
      c, a, b;
    for (c = 0; c < e.length; c++) {
      a = e[c];
      if (a.isItemHighlight || a.isItemEdit) {
        b = true;
        break
      }
    }
    if (!b) {
      e.push("itemhighlight");
      d.setInteractions(e)
    }
  },
  showTooltip: function(l, m) {
    var d = this,
      n = d.getTooltip(),
      j, a, i, f, h, k, g, e, b, c;
    if (!n) {
      return
    }
    clearTimeout(d.tooltipTimeout);
    b = n.config;
    if (n.trackMouse) {
      m[0] += b.offsetX;
      m[1] += b.offsetY
    } else {
      j = l.sprite;
      a = j.getSurface();
      i = Ext.get(a.getId());
      if (i) {
        k = l.series.getBBoxForItem(l);
        g = k.x + k.width / 2;
        e = k.y + k.height / 2;
        h = a.matrix.transformPoint([g, e]);
        f = i.getXY();
        c = a.getInherited().rtl;
        g = c ? f[0] + i.getWidth() - h[0] : f[0] + h[0];
        e = f[1] + h[1];
        m = [g, e]
      }
    }
    Ext.callback(n.renderer, n.scope, [n, l.record, l], 0, d);
    n.show(m)
  },
  hideTooltip: function(b) {
    var a = this,
      c = a.getTooltip();
    if (!c) {
      return
    }
    clearTimeout(a.tooltipTimeout);
    a.tooltipTimeout = Ext.defer(function() {
      c.hide()
    }, 1)
  },
  applyStore: function(a) {
    return a && Ext.StoreManager.lookup(a)
  },
  getStore: function() {
    return this._store || this.getChart() && this.getChart().getStore()
  },
  updateStore: function(b, a) {
    var h = this,
      g = h.getChart(),
      c = g && g.getStore(),
      f, j, e, d;
    a = a || c;
    if (a && a !== b) {
      a.un({
        datachanged: "onDataChanged",
        update: "onDataChanged",
        scope: h
      })
    }
    if (b) {
      b.on({
        datachanged: "onDataChanged",
        update: "onDataChanged",
        scope: h
      });
      f = h.getSprites();
      for (d = 0, e = f.length; d < e; d++) {
        j = f[d];
        if (j.setStore) {
          j.setStore(b)
        }
      }
      h.onDataChanged()
    }
    h.fireEvent("storechange", h, b, a)
  },
  onStoreChange: function(b, a, c) {
    if (!this._store) {
      this.updateStore(a, c)
    }
  },
  coordinate: function(o, m, e) {
    var l = this,
      p = l.getStore(),
      h = l.getHidden(),
      k = p.getData().items,
      b = l["get" + o + "Axis"](),
      f = {
        min: Infinity,
        max: -Infinity
      },
      q = l["fieldCategory" + o] || [o],
      g = l.getFields(q),
      d, n, c, a = {},
      j = l.getSprites();
    if (j.length > 0) {
      if (!Ext.isBoolean(h) || !h) {
        for (d = 0; d < q.length; d++) {
          n = g[d];
          c = l.coordinateData(k, n, b);
          l.getRangeOfData(c, f);
          a["data" + q[d]] = c
        }
      }
      l.dataRange[m] = f.min;
      l.dataRange[m + e] = f.max;
      a["dataMin" + o] = f.min;
      a["dataMax" + o] = f.max;
      if (b) {
        b.range = null;
        a["range" + o] = b.getRange()
      }
      for (d = 0; d < j.length; d++) {
        j[d].setAttributes(a)
      }
    }
  },
  coordinateData: function(b, h, d) {
    var g = [],
      f = b.length,
      e = d && d.getLayout(),
      c, a;
    for (c = 0; c < f; c++) {
      a = b[c].data[h];
      if (!Ext.isEmpty(a, true)) {
        if (e) {
          g[c] = e.getCoordFor(a, h, c, b)
        } else {
          g[c] = +a
        }
      } else {
        g[c] = a
      }
    }
    return g
  },
  getRangeOfData: function(g, b) {
    var e = g.length,
      d = b.min,
      a = b.max,
      c, f;
    for (c = 0; c < e; c++) {
      f = g[c];
      if (f < d) {
        d = f
      }
      if (f > a) {
        a = f
      }
    }
    b.min = d;
    b.max = a
  },
  updateLabelData: function() {
    var h = this,
      l = h.getStore(),
      g = l.getData().items,
      f = h.getSprites(),
      a = h.getLabel().getTemplate(),
      n = Ext.Array.from(a.getField()),
      c, b, e, d, m, k;
    if (!f.length || !n.length) {
      return
    }
    for (c = 0; c < f.length; c++) {
      d = [];
      m = f[c];
      k = m.getField();
      if (Ext.Array.indexOf(n, k) < 0) {
        k = n[c]
      }
      for (b = 0, e = g.length; b < e; b++) {
        d.push(g[b].get(k))
      }
      m.setAttributes({
        labels: d
      })
    }
  },
  processData: function() {
    if (!this.getStore()) {
      return
    }
    var d = this,
      f = this.directions,
      a, c = f.length,
      e, b;
    for (a = 0; a < c; a++) {
      e = f[a];
      b = d["get" + e + "Axis"]();
      if (b) {
        b.processData(d);
        continue
      }
      if (d["coordinate" + e]) {
        d["coordinate" + e]()
      }
    }
    d.updateLabelData()
  },
  applyBackground: function(a) {
    if (this.getChart()) {
      this.getSurface().setBackground(a);
      return this.getSurface().getBackground()
    } else {
      return a
    }
  },
  updateChart: function(d, a) {
    var c = this,
      b = c._store;
    if (a) {
      a.un("axeschange", "onAxesChange", c);
      c.clearSprites();
      c.setSurface(null);
      c.setOverlaySurface(null);
      a.unregister(c);
      c.onChartDetached(a);
      if (!b) {
        c.updateStore(null)
      }
    }
    if (d) {
      c.setSurface(d.getSurface("series"));
      c.setOverlaySurface(d.getSurface("overlay"));
      d.on("axeschange", "onAxesChange", c);
      if (d.getAxes()) {
        c.onAxesChange(d)
      }
      c.onChartAttached(d);
      d.register(c);
      if (!b) {
        c.updateStore(d.getStore())
      }
    }
  },
  onAxesChange: function(h) {
    var k = this,
      g = h.getAxes(),
      c, a = {},
      b = {},
      e = false,
      j = this.directions,
      l, d, f;
    for (d = 0, f = j.length; d < f; d++) {
      l = j[d];
      b[l] = k.getFields(k["fieldCategory" + l])
    }
    for (d = 0, f = g.length; d < f; d++) {
      c = g[d];
      if (!a[c.getDirection()]) {
        a[c.getDirection()] = [c]
      } else {
        a[c.getDirection()].push(c)
      }
    }
    for (d = 0, f = j.length; d < f; d++) {
      l = j[d];
      if (k["get" + l + "Axis"]()) {
        continue
      }
      if (a[l]) {
        c = k.findMatchingAxis(a[l], b[l]);
        if (c) {
          k["set" + l + "Axis"](c);
          if (c.getNeedHighPrecision()) {
            e = true
          }
        }
      }
    }
    this.getSurface().setHighPrecision(e)
  },
  findMatchingAxis: function(f, e) {
    var d, c, b, a;
    for (b = 0; b < f.length; b++) {
      d = f[b];
      c = d.getFields();
      if (!c.length) {
        return d
      } else {
        if (e) {
          for (a = 0; a < e.length; a++) {
            if (Ext.Array.indexOf(c, e[a]) >= 0) {
              return d
            }
          }
        }
      }
    }
  },
  onChartDetached: function(a) {
    var b = this;
    b.fireEvent("chartdetached", a, b);
    a.un("storechange", "onStoreChange", b)
  },
  onChartAttached: function(a) {
    var b = this;
    b.setBackground(b.getBackground());
    b.fireEvent("chartattached", a, b);
    a.on("storechange", "onStoreChange", b);
    b.processData()
  },
  updateOverlaySurface: function(a) {
    var b = this;
    if (a) {
      if (b.getLabel()) {
        b.getOverlaySurface().add(b.getLabel())
      }
    }
  },
  applyLabel: function(a, b) {
    if (!b) {
      b = new Ext.chart.Markers({
        zIndex: 10
      });
      b.setTemplate(new Ext.chart.label.Label(a))
    } else {
      b.getTemplate().setAttributes(a)
    }
    return b
  },
  createItemInstancingSprite: function(c, b) {
    var e = this,
      f = new Ext.chart.Markers(),
      a, d;
    f.setAttributes({
      zIndex: Number.MAX_VALUE
    });
    a = Ext.apply({}, b);
    if (e.getHighlight()) {
      a.highlight = e.getHighlight();
      a.modifiers = ["highlight"]
    }
    f.setTemplate(a);
    d = f.getTemplate();
    d.setAttributes(e.getStyle());
    d.fx.on("animationstart", "onSpriteAnimationStart", this);
    d.fx.on("animationend", "onSpriteAnimationEnd", this);
    c.bindMarker("items", f);
    e.getSurface().add(f);
    return f
  },
  getDefaultSpriteConfig: function() {
    return {
      type: this.seriesType,
      renderer: this.getRenderer()
    }
  },
  updateRenderer: function(c) {
    var b = this,
      a = b.getChart(),
      d;
    if (a && a.isInitializing) {
      return
    }
    d = b.getSprites();
    if (d.length) {
      d[0].setAttributes({
        renderer: c || null
      });
      if (a && !a.isInitializing) {
        a.redraw()
      }
    }
  },
  createSprite: function() {
    var f = this,
      a = f.getSurface(),
      e = f.getItemInstancing(),
      d = a.add(f.getDefaultSpriteConfig()),
      b, c;
    d.setAttributes(f.getStyle());
    d.setSeries(f);
    if (e) {
      d.itemsMarker = f.createItemInstancingSprite(d, e)
    }
    if (d.bindMarker) {
      if (f.getShowMarkers() && f.getMarker()) {
        b = new Ext.chart.Markers();
        c = Ext.Object.chain(f.getMarker());
        if (f.getHighlight()) {
          c.highlight = f.getHighlight();
          c.modifiers = ["highlight"]
        }
        b.setTemplate(c);
        b.getTemplate().fx.setCustomDurations({
          translationX: 0,
          translationY: 0
        });
        d.dataMarker = b;
        d.bindMarker("markers", b);
        f.getOverlaySurface().add(b)
      }
      if (f.getLabel().getTemplate().getField()) {
        d.bindMarker("labels", f.getLabel())
      }
    }
    if (d.setStore) {
      d.setStore(f.getStore())
    }
    d.fx.on("animationstart", "onSpriteAnimationStart", f);
    d.fx.on("animationend", "onSpriteAnimationEnd", f);
    f.sprites.push(d);
    return d
  },
  getSprites: Ext.emptyFn,
  onDataChanged: function() {
    var d = this,
      c = d.getChart(),
      b = c && c.getStore(),
      a = d.getStore();
    if (a !== b) {
      d.processData()
    }
  },
  isXType: function(a) {
    return a === "series"
  },
  getItemId: function() {
    return this.getId()
  },
  applyThemeStyle: function(e, a) {
    var b = this,
      d, c;
    d = e && e.subStyle && e.subStyle.fillStyle;
    c = d && e.subStyle.strokeStyle;
    if (d && !c) {
      e.subStyle.strokeStyle = b.getStrokeColorsFromFillColors(d)
    }
    d = e && e.markerSubStyle && e.markerSubStyle.fillStyle;
    c = d && e.markerSubStyle.strokeStyle;
    if (d && !c) {
      e.markerSubStyle.strokeStyle = b.getStrokeColorsFromFillColors(d)
    }
    return Ext.apply(a || {}, e)
  },
  applyStyle: function(c, b) {
    var a = Ext.ClassManager.get(Ext.ClassManager.getNameByAlias(
      "sprite." + this.seriesType));
    if (a && a.def) {
      c = a.def.normalize(c)
    }
    return Ext.apply({}, c, b)
  },
  applySubStyle: function(b, c) {
    var a = Ext.ClassManager.get(Ext.ClassManager.getNameByAlias(
      "sprite." + this.seriesType));
    if (a && a.def) {
      b = a.def.batchedNormalize(b, true)
    }
    return Ext.merge({}, c, b)
  },
  applyMarker: function(c, a) {
    var d = (c && c.type) || (a && a.type) || "circle",
      b = Ext.ClassManager.get(Ext.ClassManager.getNameByAlias("sprite." +
        d));
    if (b && b.def) {
      c = b.def.normalize(Ext.isObject(c) ? c : {}, true);
      c.type = d
    }
    return Ext.merge(a || {}, c)
  },
  applyMarkerSubStyle: function(c, a) {
    var d = (c && c.type) || (a && a.type) || "circle",
      b = Ext.ClassManager.get(Ext.ClassManager.getNameByAlias("sprite." +
        d));
    if (b && b.def) {
      c = b.def.batchedNormalize(c, true)
    }
    return Ext.merge(a || {}, c)
  },
  updateHidden: function(b) {
    var a = this;
    a.getColors();
    a.getSubStyle();
    a.setSubStyle({
      hidden: b
    });
    a.processData();
    a.doUpdateStyles();
    if (!Ext.isArray(b)) {
      a.updateLegendStore(b)
    }
  },
  updateLegendStore: function(f, b) {
    var e = this,
      d = e.getChart(),
      c = d.getLegendStore(),
      g = e.getId(),
      a;
    if (c) {
      if (arguments.length > 1) {
        a = c.findBy(function(h) {
          return h.get("series") === g && h.get("index") === b
        });
        if (a !== -1) {
          a = c.getAt(a)
        }
      } else {
        a = c.findRecord("series", g)
      }
      if (a && a.get("disabled") !== f) {
        a.set("disabled", f)
      }
    }
  },
  setHiddenByIndex: function(a, c) {
    var b = this;
    if (Ext.isArray(b.getHidden())) {
      b.getHidden()[a] = c;
      b.updateHidden(b.getHidden());
      b.updateLegendStore(c, a)
    } else {
      b.setHidden(c)
    }
  },
  getStrokeColorsFromFillColors: function(a) {
    var c = this,
      e = c.getUseDarkerStrokeColor(),
      b = (Ext.isNumber(e) ? e : c.darkerStrokeRatio),
      d;
    if (e) {
      d = Ext.Array.map(a, function(f) {
        f = Ext.isString(f) ? f : f.stops[0].color;
        f = Ext.draw.Color.fromString(f);
        return f.createDarker(b).toString()
      })
    } else {
      d = Ext.Array.clone(a)
    }
    return d
  },
  updateThemeColors: function(b) {
    var c = this,
      d = c.getThemeStyle(),
      a = Ext.Array.clone(b),
      f = c.getStrokeColorsFromFillColors(b),
      e = {
        fillStyle: a,
        strokeStyle: f
      };
    d.subStyle = Ext.apply(d.subStyle || {}, e);
    d.markerSubStyle = Ext.apply(d.markerSubStyle || {}, e);
    c.doUpdateStyles()
  },
  themeOnlyIfConfigured: {},
  updateTheme: function(d) {
    var h = this,
      a = d.getSeries(),
      n = h.getInitialConfig(),
      c = h.defaultConfig,
      f = h.getConfigurator().configs,
      j = a.defaults,
      k = a[h.type],
      g = h.themeOnlyIfConfigured,
      l, i, o, b, m, e;
    a = Ext.merge({}, j, k);
    for (l in a) {
      i = a[l];
      e = f[l];
      if (i !== null && i !== undefined && e) {
        m = n[l];
        o = Ext.isObject(i);
        b = m === c[l];
        if (o) {
          if (b && g[l]) {
            continue
          }
          i = Ext.merge({}, i, m)
        }
        if (b || o) {
          h[e.names.set](i)
        }
      }
    }
  },
  updateChartColors: function(a) {
    var b = this;
    if (!b.getColors()) {
      b.updateThemeColors(a)
    }
  },
  updateColors: function(a) {
    this.updateThemeColors(a)
  },
  updateStyle: function() {
    this.doUpdateStyles()
  },
  updateSubStyle: function() {
    this.doUpdateStyles()
  },
  updateThemeStyle: function() {
    this.doUpdateStyles()
  },
  doUpdateStyles: function() {
    var f = this,
      g = f.sprites,
      c = f.getItemInstancing(),
      b = 0,
      e = g && g.length,
      a = f.getMarker(),
      d;
    for (; b < e; b++) {
      d = f.getStyleByIndex(b);
      if (c) {
        g[b].itemsMarker.getTemplate().setAttributes(d)
      }
      g[b].setAttributes(d);
      if (a && g[b].dataMarker) {
        g[b].dataMarker.getTemplate().setAttributes(f.getMarkerStyleByIndex(
          b))
      }
    }
  },
  getStyleWithTheme: function() {
    var b = this,
      c = b.getThemeStyle(),
      d = (c && c.style) || {},
      a = Ext.applyIf(Ext.apply({}, b.getStyle()), d);
    return a
  },
  getSubStyleWithTheme: function() {
    var c = this,
      d = c.getThemeStyle(),
      a = (d && d.subStyle) || {},
      b = Ext.applyIf(Ext.apply({}, c.getSubStyle()), a);
    return b
  },
  getStyleByIndex: function(b) {
    var e = this,
      h = e.getThemeStyle(),
      d, g, c, f, a = {};
    d = e.getStyle();
    g = (h && h.style) || {};
    c = e.styleDataForIndex(e.getSubStyle(), b);
    f = e.styleDataForIndex((h && h.subStyle), b);
    Ext.apply(a, g);
    Ext.apply(a, f);
    Ext.apply(a, d);
    Ext.apply(a, c);
    return a
  },
  getMarkerStyleByIndex: function(d) {
    var g = this,
      c = g.getThemeStyle(),
      a, e, k, j, b, l, h, f, m = {};
    a = g.getStyle();
    e = (c && c.style) || {};
    k = g.styleDataForIndex(g.getSubStyle(), d);
    j = g.styleDataForIndex((c && c.subStyle), d);
    b = g.getMarker();
    l = (c && c.marker) || {};
    h = g.getMarkerSubStyle();
    f = g.styleDataForIndex((c && c.markerSubStyle), d);
    Ext.apply(m, e);
    Ext.apply(m, j);
    Ext.apply(m, l);
    Ext.apply(m, f);
    Ext.apply(m, a);
    Ext.apply(m, k);
    Ext.apply(m, b);
    Ext.apply(m, h);
    return m
  },
  styleDataForIndex: function(d, c) {
    var e, b, a = {};
    if (d) {
      for (b in d) {
        e = d[b];
        if (Ext.isArray(e)) {
          a[b] = e[c % e.length]
        } else {
          a[b] = e
        }
      }
    }
    return a
  },
  getItemForPoint: Ext.emptyFn,
  getItemByIndex: function(a, e) {
    var d = this,
      f = d.getSprites(),
      b = f && f[0],
      c;
    if (!b) {
      return
    }
    if (e === undefined && b.isMarkerHolder) {
      e = d.getItemInstancing() ? "items" : "markers"
    } else {
      if (!e || e === "" || e === "sprites") {
        b = f[a]
      }
    }
    if (b) {
      c = {
        series: d,
        category: e,
        index: a,
        record: d.getStore().getData().items[a],
        field: d.getYField(),
        sprite: b
      };
      return c
    }
  },
  onSpriteAnimationStart: function(a) {
    this.fireEvent("animationstart", this, a)
  },
  onSpriteAnimationEnd: function(a) {
    this.fireEvent("animationend", this, a)
  },
  resolveListenerScope: function(e) {
    var d = this,
      a = Ext._namedScopes[e],
      c = d.getChart(),
      b;
    if (!a) {
      b = c ? c.resolveListenerScope(e, false) : (e || d)
    } else {
      if (a.isThis) {
        b = d
      } else {
        if (a.isController) {
          b = c ? c.resolveListenerScope(e, false) : d
        } else {
          if (a.isSelf) {
            b = c ? c.resolveListenerScope(e, false) : d;
            if (b === c && !c.getInheritedConfig("defaultListenerScope")) {
              b = d
            }
          }
        }
      }
    }
    return b
  },
  provideLegendInfo: function(a) {
    a.push({
      name: this.getTitle() || this.getId(),
      mark: "black",
      disabled: this.getHidden(),
      series: this.getId(),
      index: 0
    })
  },
  clearSprites: function() {
    var d = this.sprites,
      b, a, c;
    for (a = 0, c = d.length; a < c; a++) {
      b = d[a];
      if (b && b.isSprite) {
        b.destroy()
      }
    }
    this.sprites = []
  },
  destroy: function() {
    var b = this,
      a = b._store,
      c = b.getConfig("tooltip", true);
    if (a && a.getAutoDestroy()) {
      Ext.destroy(a)
    }
    b.setChart(null);
    b.clearListeners();
    if (c) {
      Ext.destroy(c);
      clearTimeout(b.tooltipTimeout)
    }
    b.callParent()
  }
}, 1, 0, 0, 0, 0, [
  [Ext.mixin.Observable.prototype.mixinId || Ext.mixin.Observable.$className,
    Ext.mixin.Observable
  ],
  [Ext.mixin.Bindable.prototype.mixinId || Ext.mixin.Bindable.$className,
    Ext.mixin.Bindable
  ]
], [Ext.chart.series, "Series"], 0));
(Ext.cmd.derive("Ext.chart.interactions.Abstract", Ext.Base, {
  config: {
    gestures: {
      tap: "onGesture"
    },
    chart: null,
    enabled: true
  },
  throttleGap: 0,
  stopAnimationBeforeSync: false,
  constructor: function(a) {
    var b = this,
      c;
    a = a || {};
    if ("id" in a) {
      c = a.id
    } else {
      if ("id" in b.config) {
        c = b.config.id
      } else {
        c = b.getId()
      }
    }
    b.setId(c);
    b.mixins.observable.constructor.call(b, a)
  },
  initialize: Ext.emptyFn,
  updateChart: function(c, a) {
    var b = this;
    if (a === c) {
      return
    }
    if (a) {
      a.unregister(b);
      b.removeChartListener(a)
    }
    if (c) {
      c.register(b);
      b.addChartListener()
    }
  },
  updateEnabled: function(a) {
    var c = this,
      b = c.getChart();
    if (b) {
      if (a) {
        c.addChartListener()
      } else {
        c.removeChartListener(b)
      }
    }
  },
  onGesture: Ext.emptyFn,
  getItemForEvent: function(d) {
    var b = this,
      a = b.getChart(),
      c = a.getEventXY(d);
    return a.getItemForPoint(c[0], c[1])
  },
  getItemsForEvent: function(d) {
    var b = this,
      a = b.getChart(),
      c = a.getEventXY(d);
    return a.getItemsForPoint(c[0], c[1])
  },
  addChartListener: function() {
    var c = this,
      b = c.getChart(),
      e = c.getGestures(),
      a;
    if (!c.getEnabled()) {
      return
    }

    function d(f, g) {
      b.addElementListener(f, c.listeners[f] = function(j) {
        var i = c.getLocks(),
          h;
        if (c.getEnabled() && (!(f in i) || i[f] === c)) {
          h = (Ext.isFunction(g) ? g : c[g]).apply(this, arguments);
          if (h === false && j && j.stopPropagation) {
            j.stopPropagation()
          }
          return h
        }
      }, c)
    }
    c.listeners = c.listeners || {};
    for (a in e) {
      d(a, e[a])
    }
  },
  removeChartListener: function(c) {
    var d = this,
      e = d.getGestures(),
      b;

    function a(f) {
      var g = d.listeners[f];
      if (g) {
        c.removeElementListener(f, g);
        delete d.listeners[f]
      }
    }
    if (d.listeners) {
      for (b in e) {
        a(b)
      }
    }
  },
  lockEvents: function() {
    var d = this,
      c = d.getLocks(),
      a = Array.prototype.slice.call(arguments),
      b = a.length;
    while (b--) {
      c[a[b]] = d
    }
  },
  unlockEvents: function() {
    var c = this.getLocks(),
      a = Array.prototype.slice.call(arguments),
      b = a.length;
    while (b--) {
      delete c[a[b]]
    }
  },
  getLocks: function() {
    var a = this.getChart();
    return a.lockedEvents || (a.lockedEvents = {})
  },
  isMultiTouch: function() {
    if (Ext.browser.is.IE10) {
      return true
    }
    return !Ext.os.is.Desktop
  },
  initializeDefaults: Ext.emptyFn,
  doSync: function() {
    var b = this,
      a = b.getChart();
    if (b.syncTimer) {
      clearTimeout(b.syncTimer);
      b.syncTimer = null
    }
    if (b.stopAnimationBeforeSync) {
      a.animationSuspendCount++
    }
    a.redraw();
    if (b.stopAnimationBeforeSync) {
      a.animationSuspendCount--
    }
    b.syncThrottle = Date.now() + b.throttleGap
  },
  sync: function() {
    var a = this;
    if (a.throttleGap && Ext.frameStartTime < a.syncThrottle) {
      if (a.syncTimer) {
        return
      }
      a.syncTimer = Ext.defer(function() {
        a.doSync()
      }, a.throttleGap)
    } else {
      a.doSync()
    }
  },
  getItemId: function() {
    return this.getId()
  },
  isXType: function(a) {
    return a === "interaction"
  },
  destroy: function() {
    var a = this;
    a.setChart(null);
    delete a.listeners;
    a.callParent()
  }
}, 1, ["interaction"], ["interaction"], {
  interaction: true
}, ["widget.interaction"], [
  ["observable", Ext.mixin.Observable]
], [Ext.chart.interactions, "Abstract"], function() {
  if (Ext.os.is.Android4) {
    this.prototype.throttleGap = 40
  }
}));
(Ext.cmd.derive("Ext.chart.MarkerHolder", Ext.Mixin, {
  mixinConfig: {
    id: "markerHolder",
    after: {
      constructor: "constructor",
      preRender: "preRender"
    },
    before: {
      destroy: "destroy"
    }
  },
  isMarkerHolder: true,
  surfaceMatrix: null,
  inverseSurfaceMatrix: null,
  deprecated: {
    6: {
      methods: {
        getBoundMarker: {
          message: "Please use the 'getMarker' method instead.",
          fn: function(b) {
            var a = this.boundMarkers[b];
            return a ? [a] : a
          }
        }
      }
    }
  },
  constructor: function() {
    this.boundMarkers = {};
    this.cleanRedraw = false
  },
  bindMarker: function(b, a) {
    var c = this,
      d = c.boundMarkers;
    if (a && a.isMarkers) {
      d[b] = a
    }
  },
  getMarker: function(a) {
    return this.boundMarkers[a]
  },
  preRender: function() {
    var f = this,
      g = f.getId(),
      d = f.boundMarkers,
      e = f.getParent(),
      c, a, b;
    if (f.surfaceMatrix) {
      b = f.surfaceMatrix.set(1, 0, 0, 1, 0, 0)
    } else {
      b = f.surfaceMatrix = new Ext.draw.Matrix()
    }
    f.cleanRedraw = !f.attr.dirty;
    if (!f.cleanRedraw) {
      for (c in d) {
        a = d[c];
        if (a) {
          a.clear(g)
        }
      }
    }
    while (e && e.attr && e.attr.matrix) {
      b.prependMatrix(e.attr.matrix);
      e = e.getParent()
    }
    b.prependMatrix(e.matrix);
    f.surfaceMatrix = b;
    f.inverseSurfaceMatrix = b.inverse(f.inverseSurfaceMatrix)
  },
  putMarker: function(d, a, c, g, e) {
    var b = this.boundMarkers[d],
      f = this.getId();
    if (b) {
      b.putMarkerFor(f, a, c, g, e)
    }
  },
  getMarkerBBox: function(c, b, d) {
    var a = this.boundMarkers[c],
      e = this.getId();
    if (a) {
      return a.getMarkerBBoxFor(e, b, d)
    }
  },
  destroy: function() {
    var c = this.boundMarkers,
      b, a;
    for (b in c) {
      a = c[b];
      a.destroy()
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.chart, "MarkerHolder"], 0));
(Ext.cmd.derive("Ext.chart.axis.sprite.Axis", Ext.draw.sprite.Sprite, {
  type: "axis",
  inheritableStatics: {
    def: {
      processors: {
        grid: "bool",
        axisLine: "bool",
        minorTicks: "bool",
        minorTickSize: "number",
        majorTicks: "bool",
        majorTickSize: "number",
        length: "number",
        startGap: "number",
        endGap: "number",
        dataMin: "number",
        dataMax: "number",
        visibleMin: "number",
        visibleMax: "number",
        position: "enums(left,right,top,bottom,angular,radial,gauge)",
        minStepSize: "number",
        estStepSize: "number",
        titleOffset: "number",
        textPadding: "number",
        min: "number",
        max: "number",
        centerX: "number",
        centerY: "number",
        radius: "number",
        totalAngle: "number",
        baseRotation: "number",
        data: "default",
        enlargeEstStepSizeByText: "bool"
      },
      defaults: {
        grid: false,
        axisLine: true,
        minorTicks: false,
        minorTickSize: 3,
        majorTicks: true,
        majorTickSize: 5,
        length: 0,
        startGap: 0,
        endGap: 0,
        visibleMin: 0,
        visibleMax: 1,
        dataMin: 0,
        dataMax: 1,
        position: "",
        minStepSize: 0,
        estStepSize: 20,
        min: 0,
        max: 1,
        centerX: 0,
        centerY: 0,
        radius: 1,
        baseRotation: 0,
        data: null,
        titleOffset: 0,
        textPadding: 0,
        scalingCenterY: 0,
        scalingCenterX: 0,
        strokeStyle: "black",
        enlargeEstStepSizeByText: false
      },
      triggers: {
        minorTickSize: "bbox",
        majorTickSize: "bbox",
        position: "bbox,layout",
        axisLine: "bbox,layout",
        min: "layout",
        max: "layout",
        length: "layout",
        minStepSize: "layout",
        estStepSize: "layout",
        data: "layout",
        dataMin: "layout",
        dataMax: "layout",
        visibleMin: "layout",
        visibleMax: "layout",
        enlargeEstStepSizeByText: "layout"
      },
      updaters: {
        layout: function() {
          this.doLayout()
        }
      }
    }
  },
  config: {
    label: null,
    layout: null,
    segmenter: null,
    renderer: null,
    layoutContext: null,
    axis: null
  },
  thickness: 0,
  stepSize: 0,
  getBBox: function() {
    return null
  },
  doDefaultRender: function(a) {
    return this.segmenter.renderer(a, this)
  },
  doLayout: function() {
    var h = this,
      f = h.getAxis().getChart();
    if (f.isInitializing) {
      return
    }
    var e = h.attr,
      d = h.getLayout(),
      g = f.getInherited().rtl,
      b = e.dataMin + (e.dataMax - e.dataMin) * e.visibleMin,
      i = e.dataMin + (e.dataMax - e.dataMin) * e.visibleMax,
      c = e.position,
      a = {
        attr: e,
        segmenter: h.getSegmenter(),
        renderer: h.doDefaultRender
      };
    if (c === "left" || c === "right") {
      e.translationX = 0;
      e.translationY = i * e.length / (i - b);
      e.scalingX = 1;
      e.scalingY = -e.length / (i - b);
      e.scalingCenterY = 0;
      e.scalingCenterX = 0;
      h.applyTransformations(true)
    } else {
      if (c === "top" || c === "bottom") {
        if (g) {
          e.translationX = e.length + b * e.length / (i - b) + 1
        } else {
          e.translationX = -b * e.length / (i - b)
        }
        e.translationY = 0;
        e.scalingX = (g ? -1 : 1) * e.length / (i - b);
        e.scalingY = 1;
        e.scalingCenterY = 0;
        e.scalingCenterX = 0;
        h.applyTransformations(true)
      }
    }
    if (d) {
      d.calculateLayout(a);
      h.setLayoutContext(a)
    }
  },
  iterate: function(e, j) {
    var c, g, a, b, h, d, k = Ext.Array.some,
      m = Math.abs,
      f;
    if (e.getLabel) {
      if (e.min < e.from) {
        j.call(this, e.min, e.getLabel(e.min), -1, e)
      }
      for (c = 0; c <= e.steps; c++) {
        j.call(this, e.get(c), e.getLabel(c), c, e)
      }
      if (e.max > e.to) {
        j.call(this, e.max, e.getLabel(e.max), e.steps + 1, e)
      }
    } else {
      b = this.getAxis();
      h = b.floatingAxes;
      d = [];
      f = (e.to - e.from) / (e.steps + 1);
      if (b.getFloating()) {
        for (a in h) {
          d.push(h[a])
        }
      }

      function l(i) {
        return !d.length || k(d, function(n) {
          return m(n - i) > f
        })
      }
      if (e.min < e.from && l(e.min)) {
        j.call(this, e.min, e.min, -1, e)
      }
      for (c = 0; c <= e.steps; c++) {
        g = e.get(c);
        if (l(g)) {
          j.call(this, g, g, c, e)
        }
      }
      if (e.max > e.to && l(e.max)) {
        j.call(this, e.max, e.max, e.steps + 1, e)
      }
    }
  },
  renderTicks: function(l, m, s, p) {
    var v = this,
      k = v.attr,
      u = k.position,
      n = k.matrix,
      e = 0.5 * k.lineWidth,
      f = n.getXX(),
      i = n.getDX(),
      j = n.getYY(),
      h = n.getDY(),
      o = s.majorTicks,
      d = k.majorTickSize,
      a = s.minorTicks,
      r = k.minorTickSize;
    if (o) {
      switch (u) {
        case "right":
          function q(w) {
            return function(x, z, y) {
              x = l.roundPixel(x * j + h) + e;
              m.moveTo(0, x);
              m.lineTo(w, x)
            }
          }
          v.iterate(o, q(d));
          a && v.iterate(a, q(r));
          break;
        case "left":
          function t(w) {
            return function(x, z, y) {
              x = l.roundPixel(x * j + h) + e;
              m.moveTo(p[2] - w, x);
              m.lineTo(p[2], x)
            }
          }
          v.iterate(o, t(d));
          a && v.iterate(a, t(r));
          break;
        case "bottom":
          function c(w) {
            return function(x, z, y) {
              x = l.roundPixel(x * f + i) - e;
              m.moveTo(x, 0);
              m.lineTo(x, w)
            }
          }
          v.iterate(o, c(d));
          a && v.iterate(a, c(r));
          break;
        case "top":
          function b(w) {
            return function(x, z, y) {
              x = l.roundPixel(x * f + i) - e;
              m.moveTo(x, p[3]);
              m.lineTo(x, p[3] - w)
            }
          }
          v.iterate(o, b(d));
          a && v.iterate(a, b(r));
          break;
        case "angular":
          v.iterate(o, function(w, y, x) {
            w = w / (k.max + 1) * Math.PI * 2 + k.baseRotation;
            m.moveTo(k.centerX + (k.length) * Math.cos(w), k.centerY +
              (k.length) * Math.sin(w));
            m.lineTo(k.centerX + (k.length + d) * Math.cos(w), k.centerY +
              (k.length + d) * Math.sin(w))
          });
          break;
        case "gauge":
          var g = v.getGaugeAngles();
          v.iterate(o, function(w, y, x) {
            w = (w - k.min) / (k.max - k.min + 1) * k.totalAngle - k.totalAngle +
              g.start;
            m.moveTo(k.centerX + (k.length) * Math.cos(w), k.centerY +
              (k.length) * Math.sin(w));
            m.lineTo(k.centerX + (k.length + d) * Math.cos(w), k.centerY +
              (k.length + d) * Math.sin(w))
          });
          break
      }
    }
  },
  renderLabels: function(E, q, D, K) {
    var o = this,
      k = o.attr,
      i = 0.5 * k.lineWidth,
      u = k.position,
      y = k.matrix,
      A = k.textPadding,
      x = y.getXX(),
      d = y.getDX(),
      g = y.getYY(),
      c = y.getDY(),
      n = 0,
      I = D.majorTicks,
      G = Math.max(k.majorTickSize, k.minorTickSize) + k.lineWidth,
      f = Ext.draw.Draw.isBBoxIntersect,
      F = o.getLabel(),
      J, s, r = null,
      w = 0,
      b = 0,
      m = D.segmenter,
      B = o.getRenderer(),
      t = o.getAxis(),
      z = t.getTitle(),
      a = z && z.attr.text !== "" && z.getBBox(),
      l, h = null,
      p, C, v, e, H;
    if (I && F && !F.attr.hidden) {
      J = F.attr.font;
      if (q.font !== J) {
        q.font = J
      }
      F.setAttributes({
        translationX: 0,
        translationY: 0
      }, true, true);
      F.applyTransformations();
      l = F.attr.inverseMatrix.elements.slice(0);
      switch (u) {
        case "left":
          e = a ? a.x + a.width : 0;
          switch (F.attr.textAlign) {
            case "start":
              H = E.roundPixel(e + d) - i;
              break;
            case "end":
              H = E.roundPixel(K[2] - G + d) - i;
              break;
            default:
              H = E.roundPixel(e + (K[2] - e - G) / 2 + d) - i
          }
          F.setAttributes({
            translationX: H
          }, true, true);
          break;
        case "right":
          e = a ? K[2] - a.x : 0;
          switch (F.attr.textAlign) {
            case "start":
              H = E.roundPixel(G + d) + i;
              break;
            case "end":
              H = E.roundPixel(K[2] - e + d) + i;
              break;
            default:
              H = E.roundPixel(G + (K[2] - G - e) / 2 + d) + i
          }
          F.setAttributes({
            translationX: H
          }, true, true);
          break;
        case "top":
          e = a ? a.y + a.height : 0;
          F.setAttributes({
            translationY: E.roundPixel(e + (K[3] - e - G) / 2) - i
          }, true, true);
          break;
        case "bottom":
          e = a ? K[3] - a.y : 0;
          F.setAttributes({
            translationY: E.roundPixel(G + (K[3] - G - e) / 2) + i
          }, true, true);
          break;
        case "radial":
          F.setAttributes({
            translationX: k.centerX
          }, true, true);
          break;
        case "angular":
          F.setAttributes({
            translationY: k.centerY
          }, true, true);
          break;
        case "gauge":
          F.setAttributes({
            translationY: k.centerY
          }, true, true);
          break
      }
      if (u === "left" || u === "right") {
        o.iterate(I, function(L, N, M) {
          if (N === undefined) {
            return
          }
          if (B) {
            v = Ext.callback(B, null, [t, N, D, r], 0, t)
          } else {
            v = m.renderer(N, D, r)
          }
          r = N;
          F.setAttributes({
            text: String(v),
            translationY: E.roundPixel(L * g + c)
          }, true, true);
          F.applyTransformations();
          n = Math.max(n, F.getBBox().width + G);
          if (n <= o.thickness) {
            C = Ext.draw.Matrix.fly(F.attr.matrix.elements.slice(0));
            p = C.prepend.apply(C, l).transformBBox(F.getBBox(true));
            if (h && !f(p, h, A)) {
              return
            }
            E.renderSprite(F);
            h = p;
            w += p.height;
            b++
          }
        })
      } else {
        if (u === "top" || u === "bottom") {
          o.iterate(I, function(L, N, M) {
            if (N === undefined) {
              return
            }
            if (B) {
              v = Ext.callback(B, null, [t, N, D, r], 0, t)
            } else {
              v = m.renderer(N, D, r)
            }
            r = N;
            F.setAttributes({
              text: String(v),
              translationX: E.roundPixel(L * x + d)
            }, true, true);
            F.applyTransformations();
            n = Math.max(n, F.getBBox().height + G);
            if (n <= o.thickness) {
              C = Ext.draw.Matrix.fly(F.attr.matrix.elements.slice(0));
              p = C.prepend.apply(C, l).transformBBox(F.getBBox(true));
              if (h && !f(p, h, A)) {
                return
              }
              E.renderSprite(F);
              h = p;
              w += p.width;
              b++
            }
          })
        } else {
          if (u === "radial") {
            o.iterate(I, function(L, N, M) {
              if (N === undefined) {
                return
              }
              if (B) {
                v = Ext.callback(B, null, [t, N, D, r], 0, t)
              } else {
                v = m.renderer(N, D, r)
              }
              r = N;
              if (typeof v !== "undefined") {
                F.setAttributes({
                  text: String(v),
                  translationX: k.centerX - E.roundPixel(L) / k.max *
                    k.length * Math.cos(k.baseRotation + Math.PI /
                      2),
                  translationY: k.centerY - E.roundPixel(L) / k.max *
                    k.length * Math.sin(k.baseRotation + Math.PI /
                      2)
                }, true, true);
                F.applyTransformations();
                p = F.attr.matrix.transformBBox(F.getBBox(true));
                if (h && !f(p, h)) {
                  return
                }
                E.renderSprite(F);
                h = p;
                w += p.width;
                b++
              }
            })
          } else {
            if (u === "angular") {
              s = k.majorTickSize + k.lineWidth * 0.5 + (parseInt(F.attr.fontSize,
                10) || 10) / 2;
              o.iterate(I, function(L, N, M) {
                if (N === undefined) {
                  return
                }
                if (B) {
                  v = Ext.callback(B, null, [t, N, D, r], 0, t)
                } else {
                  v = m.renderer(N, D, r)
                }
                r = N;
                n = Math.max(n, Math.max(k.majorTickSize, k.minorTickSize) +
                  (k.lineCap !== "butt" ? k.lineWidth * 0.5 : 0));
                if (typeof v !== "undefined") {
                  var O = L / (k.max + 1) * Math.PI * 2 + k.baseRotation;
                  F.setAttributes({
                    text: String(v),
                    translationX: k.centerX + (k.length + s) *
                      Math.cos(O),
                    translationY: k.centerY + (k.length + s) *
                      Math.sin(O)
                  }, true, true);
                  F.applyTransformations();
                  p = F.attr.matrix.transformBBox(F.getBBox(true));
                  if (h && !f(p, h)) {
                    return
                  }
                  E.renderSprite(F);
                  h = p;
                  w += p.width;
                  b++
                }
              })
            } else {
              if (u === "gauge") {
                var j = o.getGaugeAngles();
                o.iterate(I, function(L, N, M) {
                  if (N === undefined) {
                    return
                  }
                  if (B) {
                    v = Ext.callback(B, null, [t, N, D, r], 0, t)
                  } else {
                    v = m.renderer(N, D, r)
                  }
                  r = N;
                  if (typeof v !== "undefined") {
                    var O = (L - k.min) / (k.max - k.min + 1) * k.totalAngle -
                      k.totalAngle + j.start;
                    F.setAttributes({
                      text: String(v),
                      translationX: k.centerX + (k.length + 10) *
                        Math.cos(O),
                      translationY: k.centerY + (k.length + 10) *
                        Math.sin(O)
                    }, true, true);
                    F.applyTransformations();
                    p = F.attr.matrix.transformBBox(F.getBBox(true));
                    if (h && !f(p, h)) {
                      return
                    }
                    E.renderSprite(F);
                    h = p;
                    w += p.width;
                    b++
                  }
                })
              }
            }
          }
        }
      }
      if (k.enlargeEstStepSizeByText && b) {
        w /= b;
        w += G;
        w *= 2;
        if (k.estStepSize < w) {
          k.estStepSize = w
        }
      }
      if (Math.abs(o.thickness - (n)) > 1) {
        o.thickness = n;
        k.bbox.plain.dirty = true;
        k.bbox.transform.dirty = true;
        o.doThicknessChanged();
        return false
      }
    }
  },
  renderAxisLine: function(a, i, e, c) {
    var h = this,
      g = h.attr,
      b = g.lineWidth * 0.5,
      j = g.position,
      d, f;
    if (g.axisLine && g.length) {
      switch (j) {
        case "left":
          d = a.roundPixel(c[2]) - b;
          i.moveTo(d, -g.endGap);
          i.lineTo(d, g.length + g.startGap + 1);
          break;
        case "right":
          i.moveTo(b, -g.endGap);
          i.lineTo(b, g.length + g.startGap + 1);
          break;
        case "bottom":
          i.moveTo(-g.startGap, b);
          i.lineTo(g.length + g.endGap, b);
          break;
        case "top":
          d = a.roundPixel(c[3]) - b;
          i.moveTo(-g.startGap, d);
          i.lineTo(g.length + g.endGap, d);
          break;
        case "angular":
          i.moveTo(g.centerX + g.length, g.centerY);
          i.arc(g.centerX, g.centerY, g.length, 0, Math.PI * 2, true);
          break;
        case "gauge":
          f = h.getGaugeAngles();
          i.moveTo(g.centerX + Math.cos(f.start) * g.length, g.centerY +
            Math.sin(f.start) * g.length);
          i.arc(g.centerX, g.centerY, g.length, f.start, f.end, true);
          break
      }
    }
  },
  getGaugeAngles: function() {
    var a = this,
      c = a.attr.totalAngle,
      b;
    if (c <= Math.PI) {
      b = (Math.PI - c) * 0.5
    } else {
      b = -(Math.PI * 2 - c) * 0.5
    }
    b = Math.PI * 2 - b;
    return {
      start: b,
      end: b - c
    }
  },
  renderGridLines: function(m, n, s, r) {
    var t = this,
      b = t.getAxis(),
      l = t.attr,
      p = l.matrix,
      d = l.startGap,
      a = l.endGap,
      c = p.getXX(),
      k = p.getYY(),
      h = p.getDX(),
      g = p.getDY(),
      u = l.position,
      f = b.getGridAlignment(),
      q = s.majorTicks,
      e, o, i;
    if (l.grid) {
      if (q) {
        if (u === "left" || u === "right") {
          i = l.min * k + g + a + d;
          t.iterate(q, function(j, w, v) {
            e = j * k + g + a;
            t.putMarker(f + "-" + (v % 2 ? "odd" : "even"), {
              y: e,
              height: i - e
            }, o = v, true);
            i = e
          });
          o++;
          e = 0;
          t.putMarker(f + "-" + (o % 2 ? "odd" : "even"), {
            y: e,
            height: i - e
          }, o, true)
        } else {
          if (u === "top" || u === "bottom") {
            i = l.min * c + h + d;
            if (d) {
              t.putMarker(f + "-even", {
                x: 0,
                width: i
              }, -1, true)
            }
            t.iterate(q, function(j, w, v) {
              e = j * c + h + d;
              t.putMarker(f + "-" + (v % 2 ? "odd" : "even"), {
                x: e,
                width: i - e
              }, o = v, true);
              i = e
            });
            o++;
            e = l.length + l.startGap + l.endGap;
            t.putMarker(f + "-" + (o % 2 ? "odd" : "even"), {
              x: e,
              width: i - e
            }, o, true)
          } else {
            if (u === "radial") {
              t.iterate(q, function(j, w, v) {
                if (!j) {
                  return
                }
                e = j / l.max * l.length;
                t.putMarker(f + "-" + (v % 2 ? "odd" : "even"), {
                  scalingX: e,
                  scalingY: e
                }, v, true);
                i = e
              })
            } else {
              if (u === "angular") {
                t.iterate(q, function(j, w, v) {
                  if (!l.length) {
                    return
                  }
                  e = j / (l.max + 1) * Math.PI * 2 + l.baseRotation;
                  t.putMarker(f + "-" + (v % 2 ? "odd" : "even"), {
                    rotationRads: e,
                    rotationCenterX: 0,
                    rotationCenterY: 0,
                    scalingX: l.length,
                    scalingY: l.length
                  }, v, true);
                  i = e
                })
              }
            }
          }
        }
      }
    }
  },
  renderLimits: function(o) {
    var t = this,
      a = t.getAxis(),
      h = a.getChart(),
      p = h.getInnerPadding(),
      d = Ext.Array.from(a.getLimits());
    if (!d.length) {
      return
    }
    var r = a.limits.surface.getRect(),
      m = t.attr,
      n = m.matrix,
      u = m.position,
      k = Ext.Object.chain,
      v = a.limits.titles,
      c, j, b, s, l, q, f, g, e;
    v.instances = [];
    v.position = 0;
    if (u === "left" || u === "right") {
      for (q = 0, f = d.length; q < f; q++) {
        s = k(d[q]);
        !s.line && (s.line = {});
        l = Ext.isString(s.value) ? a.getCoordFor(s.value) : s.value;
        l = l * n.getYY() + n.getDY();
        s.line.y = l + p.top;
        s.line.strokeStyle = s.line.strokeStyle || m.strokeStyle;
        t.putMarker("horizontal-limit-lines", s.line, q, true);
        if (s.line.title) {
          v.createInstance(s.line.title);
          c = v.getBBoxFor(v.position - 1);
          j = s.line.title.position || (u === "left" ? "start" : "end");
          switch (j) {
            case "start":
              g = 10;
              break;
            case "end":
              g = r[2] - 10;
              break;
            case "middle":
              g = r[2] / 2;
              break
          }
          v.setAttributesFor(v.position - 1, {
            x: g,
            y: s.line.y - c.height / 2,
            textAlign: j,
            fillStyle: s.line.title.fillStyle || s.line.strokeStyle
          })
        }
      }
    } else {
      if (u === "top" || u === "bottom") {
        for (q = 0, f = d.length; q < f; q++) {
          s = k(d[q]);
          !s.line && (s.line = {});
          l = Ext.isString(s.value) ? a.getCoordFor(s.value) : s.value;
          l = l * n.getXX() + n.getDX();
          s.line.x = l + p.left;
          s.line.strokeStyle = s.line.strokeStyle || m.strokeStyle;
          t.putMarker("vertical-limit-lines", s.line, q, true);
          if (s.line.title) {
            v.createInstance(s.line.title);
            c = v.getBBoxFor(v.position - 1);
            j = s.line.title.position || (u === "top" ? "end" : "start");
            switch (j) {
              case "start":
                e = r[3] - c.width / 2 - 10;
                break;
              case "end":
                e = c.width / 2 + 10;
                break;
              case "middle":
                e = r[3] / 2;
                break
            }
            v.setAttributesFor(v.position - 1, {
              x: s.line.x + c.height / 2,
              y: e,
              fillStyle: s.line.title.fillStyle || s.line.strokeStyle,
              rotationRads: Math.PI / 2
            })
          }
        }
      } else {
        if (u === "radial") {
          for (q = 0, f = d.length; q < f; q++) {
            s = k(d[q]);
            !s.line && (s.line = {});
            l = Ext.isString(s.value) ? a.getCoordFor(s.value) : s.value;
            if (l > m.max) {
              continue
            }
            l = l / m.max * m.length;
            s.line.cx = m.centerX;
            s.line.cy = m.centerY;
            s.line.scalingX = l;
            s.line.scalingY = l;
            s.line.strokeStyle = s.line.strokeStyle || m.strokeStyle;
            t.putMarker("circular-limit-lines", s.line, q, true);
            if (s.line.title) {
              v.createInstance(s.line.title);
              c = v.getBBoxFor(v.position - 1);
              v.setAttributesFor(v.position - 1, {
                x: m.centerX,
                y: m.centerY - l - c.height / 2,
                fillStyle: s.line.title.fillStyle || s.line.strokeStyle
              })
            }
          }
        } else {
          if (u === "angular") {
            for (q = 0, f = d.length; q < f; q++) {
              s = k(d[q]);
              !s.line && (s.line = {});
              l = Ext.isString(s.value) ? a.getCoordFor(s.value) : s.value;
              l = l / (m.max + 1) * Math.PI * 2 + m.baseRotation;
              s.line.translationX = m.centerX;
              s.line.translationY = m.centerY;
              s.line.rotationRads = l;
              s.line.rotationCenterX = 0;
              s.line.rotationCenterY = 0;
              s.line.scalingX = m.length;
              s.line.scalingY = m.length;
              s.line.strokeStyle = s.line.strokeStyle || m.strokeStyle;
              t.putMarker("radial-limit-lines", s.line, q, true);
              if (s.line.title) {
                v.createInstance(s.line.title);
                c = v.getBBoxFor(v.position - 1);
                b = ((l > -0.5 * Math.PI && l < 0.5 * Math.PI) || (l >
                  1.5 * Math.PI && l < 2 * Math.PI)) ? 1 : -1;
                v.setAttributesFor(v.position - 1, {
                  x: m.centerX + 0.5 * m.length * Math.cos(l) + b * c
                    .height / 2 * Math.sin(l),
                  y: m.centerY + 0.5 * m.length * Math.sin(l) - b * c
                    .height / 2 * Math.cos(l),
                  rotationRads: b === 1 ? l : l - Math.PI,
                  fillStyle: s.line.title.fillStyle || s.line.strokeStyle
                })
              }
            }
          } else {
            if (u === "gauge") {}
          }
        }
      }
    }
  },
  doThicknessChanged: function() {
    var a = this.getAxis();
    if (a) {
      a.onThicknessChanged()
    }
  },
  render: function(a, c, d) {
    var e = this,
      b = e.getLayoutContext();
    if (b) {
      if (false === e.renderLabels(a, c, b, d)) {
        return false
      }
      c.beginPath();
      e.renderTicks(a, c, b, d);
      e.renderAxisLine(a, c, b, d);
      e.renderGridLines(a, c, b, d);
      e.renderLimits(d);
      c.stroke()
    }
  }
}, 0, 0, 0, 0, ["sprite.axis"], [
  ["markerHolder", Ext.chart.MarkerHolder]
], [Ext.chart.axis.sprite, "Axis"], 0));
(Ext.cmd.derive("Ext.chart.axis.segmenter.Segmenter", Ext.Base, {
  config: {
    axis: null
  },
  constructor: function(a) {
    this.initConfig(a)
  },
  renderer: function(b, a) {
    return String(b)
  },
  from: function(a) {
    return a
  },
  diff: Ext.emptyFn,
  align: Ext.emptyFn,
  add: Ext.emptyFn,
  preferredStep: Ext.emptyFn
}, 1, 0, 0, 0, 0, 0, [Ext.chart.axis.segmenter, "Segmenter"], 0));
(Ext.cmd.derive("Ext.chart.axis.segmenter.Names", Ext.chart.axis.segmenter.Segmenter, {
    renderer: function(b, a) {
      return b
    },
    diff: function(b, a, c) {
      return Math.floor(a - b)
    },
    align: function(c, b, a) {
      return Math.floor(c)
    },
    add: function(c, b, a) {
      return c + b
    },
    preferredStep: function(c, a, b, d) {
      return {
        unit: 1,
        step: 1
      }
    }
  }, 0, 0, 0, 0, ["segmenter.names"], 0, [Ext.chart.axis.segmenter, "Names"],
  0));
(Ext.cmd.derive("Ext.chart.axis.segmenter.Numeric", Ext.chart.axis.segmenter.Segmenter, {
  isNumeric: true,
  renderer: function(b, a) {
    return b.toFixed(Math.max(0, a.majorTicks.unit.fixes))
  },
  diff: function(b, a, c) {
    return Math.floor((a - b) / c.scale)
  },
  align: function(c, b, a) {
    return Math.floor(c / (a.scale * b)) * a.scale * b
  },
  add: function(c, b, a) {
    return c + b * a.scale
  },
  preferredStep: function(c, b) {
    var a = Math.floor(Math.log(b) * Math.LOG10E),
      d = Math.pow(10, a);
    b /= d;
    if (b < 2) {
      b = 2
    } else {
      if (b < 5) {
        b = 5
      } else {
        if (b < 10) {
          b = 10;
          a++
        }
      }
    }
    return {
      unit: {
        fixes: -a,
        scale: d
      },
      step: b
    }
  },
  exactStep: function(c, b) {
    var a = Math.floor(Math.log(b) * Math.LOG10E),
      d = Math.pow(10, a);
    return {
      unit: {
        fixes: -a + (b % d === 0 ? 0 : 1),
        scale: 1
      },
      step: b
    }
  },
  adjustByMajorUnit: function(e, g, c) {
    var d = c[0],
      b = c[1],
      a = e * g,
      f = d % a;
    if (f !== 0) {
      c[0] = d - f + (d < 0 ? -a : 0)
    }
    f = b % a;
    if (f !== 0) {
      c[1] = b - f + (b > 0 ? a : 0)
    }
  }
}, 0, 0, 0, 0, ["segmenter.numeric"], 0, [Ext.chart.axis.segmenter,
  "Numeric"
], 0));
(Ext.cmd.derive("Ext.chart.axis.segmenter.Time", Ext.chart.axis.segmenter.Segmenter, {
  config: {
    step: null
  },
  renderer: function(c, b) {
    var a = Ext.Date;
    switch (b.majorTicks.unit) {
      case "y":
        return a.format(c, "Y");
      case "mo":
        return a.format(c, "Y-m");
      case "d":
        return a.format(c, "Y-m-d")
    }
    return a.format(c, "Y-m-d\nH:i:s")
  },
  from: function(a) {
    return new Date(a)
  },
  diff: function(b, a, c) {
    if (isFinite(b)) {
      b = new Date(b)
    }
    if (isFinite(a)) {
      a = new Date(a)
    }
    return Ext.Date.diff(b, a, c)
  },
  align: function(a, c, b) {
    if (b === "d" && c >= 7) {
      a = Ext.Date.align(a, "d", c);
      a.setDate(a.getDate() - a.getDay() + 1);
      return a
    } else {
      return Ext.Date.align(a, b, c)
    }
  },
  add: function(c, b, a) {
    return Ext.Date.add(new Date(c), a, b)
  },
  stepUnits: [
    [Ext.Date.YEAR, 1, 2, 5, 10, 20, 50, 100, 200, 500],
    [Ext.Date.MONTH, 1, 3, 6],
    [Ext.Date.DAY, 1, 7, 14],
    [Ext.Date.HOUR, 1, 6, 12],
    [Ext.Date.MINUTE, 1, 5, 15, 30],
    [Ext.Date.SECOND, 1, 5, 15, 30],
    [Ext.Date.MILLI, 1, 2, 5, 10, 20, 50, 100, 200, 500]
  ],
  preferredStep: function(b, e) {
    if (this.getStep()) {
      return this.getStep()
    }
    var f = new Date(+b),
      g = new Date(+b + Math.ceil(e)),
      d = this.stepUnits,
      l, k, h, c, a;
    for (c = 0; c < d.length; c++) {
      k = d[c][0];
      h = this.diff(f, g, k);
      if (h > 0) {
        for (a = 1; a < d[c].length; a++) {
          if (h <= d[c][a]) {
            l = {
              unit: k,
              step: d[c][a]
            };
            break
          }
        }
        if (!l) {
          c--;
          l = {
            unit: d[c][0],
            step: 1
          }
        }
        break
      }
    }
    if (!l) {
      l = {
        unit: Ext.Date.DAY,
        step: 1
      }
    }
    return l
  }
}, 0, 0, 0, 0, ["segmenter.time"], 0, [Ext.chart.axis.segmenter, "Time"], 0));
(Ext.cmd.derive("Ext.chart.axis.layout.Layout", Ext.Base, {
  config: {
    axis: null
  },
  constructor: function(a) {
    this.mixins.observable.constructor.call(this, a)
  },
  processData: function(b) {
    var e = this,
      c = e.getAxis(),
      f = c.getDirection(),
      g = c.boundSeries,
      a, d;
    if (b) {
      b["coordinate" + f]()
    } else {
      for (a = 0, d = g.length; a < d; a++) {
        g[a]["coordinate" + f]()
      }
    }
  },
  calculateMajorTicks: function(a) {
    var f = this,
      e = a.attr,
      d = e.max - e.min,
      i = d / Math.max(1, e.length) * (e.visibleMax - e.visibleMin),
      h = e.min + d * e.visibleMin,
      b = e.min + d * e.visibleMax,
      g = e.estStepSize * i,
      c = f.snapEnds(a, e.min, e.max, g);
    if (c) {
      f.trimByRange(a, c, h, b);
      a.majorTicks = c
    }
  },
  calculateMinorTicks: function(a) {
    if (this.snapMinorEnds) {
      a.minorTicks = this.snapMinorEnds(a)
    }
  },
  calculateLayout: function(b) {
    var c = this,
      a = b.attr;
    if (a.length === 0) {
      return null
    }
    if (a.majorTicks) {
      c.calculateMajorTicks(b);
      if (a.minorTicks) {
        c.calculateMinorTicks(b)
      }
    }
  },
  snapEnds: Ext.emptyFn,
  trimByRange: function(b, f, i, a) {
    var g = b.segmenter,
      j = f.unit,
      h = g.diff(f.from, i, j),
      d = g.diff(f.from, a, j),
      c = Math.max(0, Math.ceil(h / f.step)),
      e = Math.min(f.steps, Math.floor(d / f.step));
    if (e < f.steps) {
      f.to = g.add(f.from, e * f.step, j)
    }
    if (f.max > a) {
      f.max = f.to
    }
    if (f.from < i) {
      f.from = g.add(f.from, c * f.step, j);
      while (f.from < i) {
        c++;
        f.from = g.add(f.from, f.step, j)
      }
    }
    if (f.min < i) {
      f.min = f.from
    }
    f.steps = e - c
  }
}, 1, 0, 0, 0, 0, [
  ["observable", Ext.mixin.Observable]
], [Ext.chart.axis.layout, "Layout"], 0));
(Ext.cmd.derive("Ext.chart.axis.layout.Discrete", Ext.chart.axis.layout.Layout, {
  isDiscrete: true,
  processData: function() {
    var f = this,
      d = f.getAxis(),
      c = d.boundSeries,
      g = d.getDirection(),
      b, e, a;
    f.labels = [];
    f.labelMap = {};
    for (b = 0, e = c.length; b < e; b++) {
      a = c[b];
      if (a["get" + g + "Axis"]() === d) {
        a["coordinate" + g]()
      }
    }
    d.getSprites()[0].setAttributes({
      data: f.labels
    });
    f.fireEvent("datachange", f.labels)
  },
  calculateLayout: function(a) {
    a.data = this.labels;
    Ext.chart.axis.layout.Layout.prototype.calculateLayout.call(this, a)
  },
  calculateMajorTicks: function(a) {
    var g = this,
      f = a.attr,
      d = a.data,
      e = f.max - f.min,
      j = e / Math.max(1, f.length) * (f.visibleMax - f.visibleMin),
      i = f.min + e * f.visibleMin,
      b = f.min + e * f.visibleMax,
      h = f.estStepSize * j;
    var c = g.snapEnds(a, Math.max(0, f.min), Math.min(f.max, d.length -
      1), h);
    if (c) {
      g.trimByRange(a, c, i, b);
      a.majorTicks = c
    }
  },
  snapEnds: function(e, d, a, b) {
    b = Math.ceil(b);
    var c = Math.floor((a - d) / b),
      f = e.data;
    return {
      min: d,
      max: a,
      from: d,
      to: c * b + d,
      step: b,
      steps: c,
      unit: 1,
      getLabel: function(g) {
        return f[this.from + this.step * g]
      },
      get: function(g) {
        return this.from + this.step * g
      }
    }
  },
  trimByRange: function(b, f, h, a) {
    var i = f.unit,
      g = Math.ceil((h - f.from) / i) * i,
      d = Math.floor((a - f.from) / i) * i,
      c = Math.max(0, Math.ceil(g / f.step)),
      e = Math.min(f.steps, Math.floor(d / f.step));
    if (e < f.steps) {
      f.to = e
    }
    if (f.max > a) {
      f.max = f.to
    }
    if (f.from < h && f.step > 0) {
      f.from = f.from + c * f.step * i;
      while (f.from < h) {
        c++;
        f.from += f.step * i
      }
    }
    if (f.min < h) {
      f.min = f.from
    }
    f.steps = e - c
  },
  getCoordFor: function(c, d, a, b) {
    this.labels.push(c);
    return this.labels.length - 1
  }
}, 0, 0, 0, 0, ["axisLayout.discrete"], 0, [Ext.chart.axis.layout,
  "Discrete"
], 0));
(Ext.cmd.derive("Ext.chart.axis.layout.CombineDuplicate", Ext.chart.axis.layout
  .Discrete, {
    getCoordFor: function(d, e, b, c) {
      if (!(d in this.labelMap)) {
        var a = this.labelMap[d] = this.labels.length;
        this.labels.push(d);
        return a
      }
      return this.labelMap[d]
    }
  }, 0, 0, 0, 0, ["axisLayout.combineDuplicate"], 0, [Ext.chart.axis.layout,
    "CombineDuplicate"
  ], 0));
(Ext.cmd.derive("Ext.chart.axis.layout.Continuous", Ext.chart.axis.layout.Layout, {
  isContinuous: true,
  config: {
    adjustMinimumByMajorUnit: false,
    adjustMaximumByMajorUnit: false
  },
  getCoordFor: function(c, d, a, b) {
    return +c
  },
  snapEnds: function(a, d, i, h) {
    var f = a.segmenter,
      c = this.getAxis(),
      l = c.getMajorTickSteps(),
      e = l && f.exactStep ? f.exactStep(d, (i - d) / l) : f.preferredStep(
        d, h),
      k = e.unit,
      b = e.step,
      j = f.align(d, b, k),
      g = (l || f.diff(d, i, k)) + 1;
    return {
      min: f.from(d),
      max: f.from(i),
      from: j,
      to: f.add(j, g * b, k),
      step: b,
      steps: g,
      unit: k,
      get: function(m) {
        return f.add(this.from, this.step * m, k)
      }
    }
  },
  snapMinorEnds: function(a) {
    var e = a.majorTicks,
      m = this.getAxis().getMinorTickSteps(),
      f = a.segmenter,
      d = e.min,
      i = e.max,
      k = e.from,
      l = e.unit,
      b = e.step / m,
      n = b * l.scale,
      j = k - d,
      c = Math.floor(j / n),
      h = c + Math.floor((i - e.to) / n) + 1,
      g = e.steps * m + h;
    return {
      min: d,
      max: i,
      from: d + j % n,
      to: f.add(k, g * b, l),
      step: b,
      steps: g,
      unit: l,
      get: function(o) {
        return (o % m + c + 1 !== 0) ? f.add(this.from, this.step * o,
          l) : null
      }
    }
  }
}, 0, 0, 0, 0, ["axisLayout.continuous"], 0, [Ext.chart.axis.layout,
  "Continuous"
], 0));
(Ext.cmd.derive("Ext.chart.axis.Axis", Ext.Base, {
  isAxis: true,
  config: {
    position: "bottom",
    fields: [],
    label: undefined,
    grid: false,
    limits: null,
    renderer: null,
    chart: null,
    style: null,
    margin: 0,
    titleMargin: 4,
    background: null,
    minimum: NaN,
    maximum: NaN,
    reconcileRange: false,
    minZoom: 1,
    maxZoom: 10000,
    layout: "continuous",
    segmenter: "numeric",
    hidden: false,
    majorTickSteps: 0,
    minorTickSteps: 0,
    adjustByMajorUnit: true,
    title: null,
    increment: 0.5,
    length: 0,
    center: null,
    radius: null,
    totalAngle: Math.PI,
    rotation: null,
    labelInSpan: null,
    visibleRange: [0, 1],
    needHighPrecision: false,
    linkedTo: null,
    floating: null
  },
  titleOffset: 0,
  spriteAnimationCount: 0,
  prevMin: 0,
  prevMax: 1,
  boundSeries: [],
  sprites: null,
  surface: null,
  range: null,
  xValues: [],
  yValues: [],
  masterAxis: null,
  applyRotation: function(b) {
    var a = Math.PI * 2;
    return (b % a + Math.PI) % a - Math.PI
  },
  updateRotation: function(b) {
    var c = this.getSprites(),
      a = this.getPosition();
    if (!this.getHidden() && a === "angular" && c[0]) {
      c[0].setAttributes({
        baseRotation: b
      })
    }
  },
  applyTitle: function(c, b) {
    var a;
    if (Ext.isString(c)) {
      c = {
        text: c
      }
    }
    if (!b) {
      b = Ext.create("sprite.text", c);
      if ((a = this.getSurface())) {
        a.add(b)
      }
    } else {
      b.setAttributes(c)
    }
    return b
  },
  applyFloating: function(b, a) {
    if (b === null) {
      b = {
        value: null,
        alongAxis: null
      }
    } else {
      if (Ext.isNumber(b)) {
        b = {
          value: b,
          alongAxis: null
        }
      }
    }
    if (Ext.isObject(b)) {
      if (a && a.alongAxis) {
        delete this.getChart().getAxis(a.alongAxis).floatingAxes[this.getId()]
      }
      return b
    }
    return a
  },
  constructor: function(a) {
    var b = this,
      c;
    b.sprites = [];
    b.labels = [];
    b.floatingAxes = {};
    a = a || {};
    if (a.position === "angular") {
      a.style = a.style || {};
      a.style.estStepSize = 1
    }
    if ("id" in a) {
      c = a.id
    } else {
      if ("id" in b.config) {
        c = b.config.id
      } else {
        c = b.getId()
      }
    }
    b.setId(c);
    b.mixins.observable.constructor.apply(b, arguments)
  },
  getAlignment: function() {
    switch (this.getPosition()) {
      case "left":
      case "right":
        return "vertical";
      case "top":
      case "bottom":
        return "horizontal";
      case "radial":
        return "radial";
      case "angular":
        return "angular"
    }
  },
  getGridAlignment: function() {
    switch (this.getPosition()) {
      case "left":
      case "right":
        return "horizontal";
      case "top":
      case "bottom":
        return "vertical";
      case "radial":
        return "circular";
      case "angular":
        return "radial"
    }
  },
  getSurface: function() {
    var e = this,
      d = e.getChart();
    if (d && !e.surface) {
      var b = e.surface = d.getSurface(e.getId(), "axis"),
        c = e.gridSurface = d.getSurface("main"),
        a = e.getSprites()[0],
        f = e.getGridAlignment();
      c.waitFor(b);
      e.getGrid();
      if (e.getLimits() && f) {
        f = f.replace("3d", "");
        e.limits = {
          surface: d.getSurface("overlay"),
          lines: new Ext.chart.Markers(),
          titles: new Ext.draw.sprite.Instancing()
        };
        e.limits.lines.setTemplate({
          xclass: "grid." + f
        });
        e.limits.lines.getTemplate().setAttributes({
          strokeStyle: "black"
        });
        e.limits.surface.add(e.limits.lines);
        a.bindMarker(f + "-limit-lines", e.limits.lines);
        e.limitTitleTpl = new Ext.draw.sprite.Text();
        e.limits.titles.setTemplate(e.limitTitleTpl);
        e.limits.surface.add(e.limits.titles);
        d.on("redraw", e.renderLimits, e)
      }
    }
    return e.surface
  },
  applyGrid: function(a) {
    if (a === true) {
      return {}
    }
    return a
  },
  updateGrid: function(b) {
    var e = this,
      d = e.getChart();
    if (!d) {
      e.on({
        chartattached: Ext.bind(e.updateGrid, e, [b]),
        single: true
      });
      return
    }
    var c = e.gridSurface,
      a = e.getSprites()[0],
      f = e.getGridAlignment(),
      g;
    if (b) {
      g = e.gridSpriteEven;
      if (!g) {
        g = e.gridSpriteEven = new Ext.chart.Markers();
        g.setTemplate({
          xclass: "grid." + f
        });
        c.add(g);
        a.bindMarker(f + "-even", g)
      }
      if (Ext.isObject(b)) {
        g.getTemplate().setAttributes(b);
        if (Ext.isObject(b.even)) {
          g.getTemplate().setAttributes(b.even)
        }
      }
      g = e.gridSpriteOdd;
      if (!g) {
        g = e.gridSpriteOdd = new Ext.chart.Markers();
        g.setTemplate({
          xclass: "grid." + f
        });
        c.add(g);
        a.bindMarker(f + "-odd", g)
      }
      if (Ext.isObject(b)) {
        g.getTemplate().setAttributes(b);
        if (Ext.isObject(b.odd)) {
          g.getTemplate().setAttributes(b.odd)
        }
      }
    }
  },
  renderLimits: function() {
    this.getSprites()[0].renderLimits()
  },
  getCoordFor: function(c, d, a, b) {
    return this.getLayout().getCoordFor(c, d, a, b)
  },
  applyPosition: function(a) {
    return a.toLowerCase()
  },
  applyLength: function(b, a) {
    return b > 0 ? b : a
  },
  applyLabel: function(b, a) {
    if (!a) {
      a = new Ext.draw.sprite.Text({})
    }
    if (this.limitTitleTpl) {
      this.limitTitleTpl.setAttributes(b)
    }
    a.setAttributes(b);
    return a
  },
  applyLayout: function(b, a) {
    b = Ext.factory(b, null, a, "axisLayout");
    b.setAxis(this);
    return b
  },
  applySegmenter: function(a, b) {
    a = Ext.factory(a, null, b, "segmenter");
    a.setAxis(this);
    return a
  },
  updateMinimum: function() {
    this.range = null
  },
  updateMaximum: function() {
    this.range = null
  },
  hideLabels: function() {
    this.getSprites()[0].setDirty(true);
    this.setLabel({
      hidden: true
    })
  },
  showLabels: function() {
    this.getSprites()[0].setDirty(true);
    this.setLabel({
      hidden: false
    })
  },
  renderFrame: function() {
    this.getSurface().renderFrame()
  },
  updateChart: function(d, b) {
    var c = this,
      a;
    if (b) {
      b.unregister(c);
      b.un("serieschange", c.onSeriesChange, c);
      b.un("redraw", c.renderLimits, c);
      c.linkAxis();
      c.fireEvent("chartdetached", b, c)
    }
    if (d) {
      d.on("serieschange", c.onSeriesChange, c);
      c.surface = null;
      a = c.getSurface();
      c.getLabel().setSurface(a);
      a.add(c.getSprites());
      a.add(c.getTitle());
      d.register(c);
      c.fireEvent("chartattached", d, c)
    }
  },
  applyBackground: function(a) {
    var b = Ext.ClassManager.getByAlias("sprite.rect");
    return b.def.normalize(a)
  },
  processData: function() {
    this.getLayout().processData();
    this.range = null
  },
  getDirection: function() {
    return this.getChart().getDirectionForAxis(this.getPosition())
  },
  isSide: function() {
    var a = this.getPosition();
    return a === "left" || a === "right"
  },
  applyFields: function(a) {
    return Ext.Array.from(a)
  },
  applyVisibleRange: function(a, c) {
    this.getChart();
    if (a[0] > a[1]) {
      var b = a[0];
      a[0] = a[1];
      a[0] = b
    }
    if (a[1] === a[0]) {
      a[1] += 1 / this.getMaxZoom()
    }
    if (a[1] > a[0] + 1) {
      a[0] = 0;
      a[1] = 1
    } else {
      if (a[0] < 0) {
        a[1] -= a[0];
        a[0] = 0
      } else {
        if (a[1] > 1) {
          a[0] -= a[1] - 1;
          a[1] = 1
        }
      }
    }
    if (c && a[0] === c[0] && a[1] === c[1]) {
      return undefined
    }
    return a
  },
  updateVisibleRange: function(a) {
    this.fireEvent("visiblerangechange", this, a)
  },
  onSeriesChange: function(e) {
    var f = this,
      b = e.getSeries(),
      j = "get" + f.getDirection() + "Axis",
      g = [],
      c, d = b.length,
      a, h;
    for (c = 0; c < d; c++) {
      if (this === b[c][j]()) {
        g.push(b[c])
      }
    }
    f.boundSeries = g;
    a = f.getLinkedTo();
    h = !Ext.isEmpty(a) && e.getAxis(a);
    if (h) {
      f.linkAxis(h)
    } else {
      f.getLayout().processData()
    }
  },
  linkAxis: function(a) {
    var c = this;

    function b(f, d, e) {
      e.getLayout()[f]("datachange", "onDataChange", d);
      e[f]("rangechange", "onMasterAxisRangeChange", d)
    }
    if (c.masterAxis) {
      b("un", c, c.masterAxis);
      c.masterAxis = null
    }
    if (a) {
      if (a.type !== this.type) {
        Ext.Error.raise("Linked axes must be of the same type.")
      }
      b("on", c, a);
      c.onDataChange(a.getLayout().labels);
      c.onMasterAxisRangeChange(a, a.range);
      c.setStyle(Ext.apply({}, c.config.style, a.config.style));
      c.setTitle(Ext.apply({}, c.config.title, a.config.title));
      c.setLabel(Ext.apply({}, c.config.label, a.config.label));
      c.masterAxis = a
    }
  },
  onDataChange: function(a) {
    this.getLayout().labels = a
  },
  onMasterAxisRangeChange: function(b, a) {
    this.range = a
  },
  applyRange: function(a) {
    if (!a) {
      return this.dataRange.slice(0)
    } else {
      return [a[0] === null ? this.dataRange[0] : a[0], a[1] === null ?
        this.dataRange[1] : a[1]
      ]
    }
  },
  getRange: function() {
    var m = this;
    if (m.range) {
      return m.range
    } else {
      if (m.masterAxis) {
        return m.masterAxis.range
      }
    }
    if (Ext.isNumber(m.getMinimum() + m.getMaximum())) {
      return m.range = [m.getMinimum(), m.getMaximum()]
    }
    var d = Infinity,
      n = -Infinity,
      o = m.boundSeries,
      h = m.getLayout(),
      l = m.getSegmenter(),
      p = m.getVisibleRange(),
      b = "get" + m.getDirection() + "Range",
      a, j, g, f, e, k;
    for (e = 0, k = o.length; e < k; e++) {
      f = o[e];
      var c = f[b]();
      if (c) {
        if (c[0] < d) {
          d = c[0]
        }
        if (c[1] > n) {
          n = c[1]
        }
      }
    }
    if (!isFinite(n)) {
      n = m.prevMax
    }
    if (!isFinite(d)) {
      d = m.prevMin
    }
    if (m.getLabelInSpan() || d === n) {
      n += m.getIncrement();
      d -= m.getIncrement()
    }
    if (Ext.isNumber(m.getMinimum())) {
      d = m.getMinimum()
    } else {
      m.prevMin = d
    }
    if (Ext.isNumber(m.getMaximum())) {
      n = m.getMaximum()
    } else {
      m.prevMax = n
    }
    m.range = [Ext.Number.correctFloat(d), Ext.Number.correctFloat(n)];
    if (m.getReconcileRange()) {
      m.reconcileRange()
    }
    if (m.getAdjustByMajorUnit() && l.adjustByMajorUnit && !m.getMajorTickSteps()) {
      j = Ext.Object.chain(m.getSprites()[0].attr);
      j.min = m.range[0];
      j.max = m.range[1];
      j.visibleMin = p[0];
      j.visibleMax = p[1];
      a = {
        attr: j,
        segmenter: l
      };
      h.calculateLayout(a);
      g = a.majorTicks;
      if (g) {
        l.adjustByMajorUnit(g.step, g.unit.scale, m.range);
        j.min = m.range[0];
        j.max = m.range[1];
        delete a.majorTicks;
        h.calculateLayout(a);
        g = a.majorTicks;
        l.adjustByMajorUnit(g.step, g.unit.scale, m.range)
      } else {
        if (!m.hasClearRangePending) {
          m.hasClearRangePending = true;
          m.getChart().on("layout", "clearRange", m)
        }
      }
    }
    if (!Ext.Array.equals(m.range, m.oldRange || [])) {
      m.fireEvent("rangechange", m, m.range);
      m.oldRange = m.range
    }
    return m.range
  },
  clearRange: function() {
    delete this.hasClearRangePending;
    this.range = null
  },
  reconcileRange: function() {
    var e = this,
      g = e.getChart().getAxes(),
      f = e.getDirection(),
      b, d, c, a;
    if (!g) {
      return
    }
    for (b = 0, d = g.length; b < d; b++) {
      c = g[b];
      a = c.getRange();
      if (c === e || c.getDirection() !== f || !a || !c.getReconcileRange()) {
        continue
      }
      if (a[0] < e.range[0]) {
        e.range[0] = a[0]
      }
      if (a[1] > e.range[1]) {
        e.range[1] = a[1]
      }
    }
  },
  applyStyle: function(c, b) {
    var a = Ext.ClassManager.getByAlias("sprite." + this.seriesType);
    if (a && a.def) {
      c = a.def.normalize(c)
    }
    b = Ext.apply(b || {}, c);
    return b
  },
  themeOnlyIfConfigured: {
    grid: true
  },
  updateTheme: function(d) {
    var i = this,
      k = d.getAxis(),
      e = i.getPosition(),
      o = i.getInitialConfig(),
      c = i.defaultConfig,
      g = i.getConfigurator().configs,
      a = k.defaults,
      n = k[e],
      h = i.themeOnlyIfConfigured,
      l, j, p, b, m, f;
    k = Ext.merge({}, a, n);
    for (l in k) {
      j = k[l];
      f = g[l];
      if (j !== null && j !== undefined && f) {
        m = o[l];
        p = Ext.isObject(j);
        b = m === c[l];
        if (p) {
          if (b && h[l]) {
            continue
          }
          j = Ext.merge({}, j, m)
        }
        if (b || p) {
          i[f.names.set](j)
        }
      }
    }
  },
  updateCenter: function(b) {
    var e = this.getSprites(),
      a = e[0],
      d = b[0],
      c = b[1];
    if (a) {
      a.setAttributes({
        centerX: d,
        centerY: c
      })
    }
    if (this.gridSpriteEven) {
      this.gridSpriteEven.getTemplate().setAttributes({
        translationX: d,
        translationY: c,
        rotationCenterX: d,
        rotationCenterY: c
      })
    }
    if (this.gridSpriteOdd) {
      this.gridSpriteOdd.getTemplate().setAttributes({
        translationX: d,
        translationY: c,
        rotationCenterX: d,
        rotationCenterY: c
      })
    }
  },
  getSprites: function() {
    if (!this.getChart()) {
      return
    }
    var i = this,
      e = i.getRange(),
      f = i.getPosition(),
      g = i.getChart(),
      c = g.getAnimation(),
      d, a, b = i.getLength(),
      h = i.superclass;
    if (c === false) {
      c = {
        duration: 0
      }
    }
    if (e) {
      a = Ext.applyIf({
        position: f,
        axis: i,
        min: e[0],
        max: e[1],
        length: b,
        grid: i.getGrid(),
        hidden: i.getHidden(),
        titleOffset: i.titleOffset,
        layout: i.getLayout(),
        segmenter: i.getSegmenter(),
        totalAngle: i.getTotalAngle(),
        label: i.getLabel()
      }, i.getStyle());
      if (!i.sprites.length) {
        while (!h.xtype) {
          h = h.superclass
        }
        d = Ext.create("sprite." + h.xtype, a);
        d.fx.setCustomDurations({
          baseRotation: 0
        });
        d.fx.on("animationstart", "onAnimationStart", i);
        d.fx.on("animationend", "onAnimationEnd", i);
        d.setLayout(i.getLayout());
        d.setSegmenter(i.getSegmenter());
        d.setLabel(i.getLabel());
        i.sprites.push(d);
        i.updateTitleSprite()
      } else {
        d = i.sprites[0];
        d.fx.setConfig(c);
        d.setAttributes(a)
      }
      if (i.getRenderer()) {
        d.setRenderer(i.getRenderer())
      }
    }
    return i.sprites
  },
  updateTitleSprite: function() {
    var f = this,
      b = f.getLength();
    if (!f.sprites[0] || !Ext.isNumber(b)) {
      return
    }
    var h = this.sprites[0].thickness,
      a = f.getSurface(),
      g = f.getTitle(),
      e = f.getPosition(),
      c = f.getMargin(),
      i = f.getTitleMargin(),
      d = a.roundPixel(b / 2);
    if (g) {
      switch (e) {
        case "top":
          g.setAttributes({
            x: d,
            y: c + i / 2,
            textBaseline: "top",
            textAlign: "center"
          }, true, true);
          g.applyTransformations();
          f.titleOffset = g.getBBox().height + i;
          break;
        case "bottom":
          g.setAttributes({
            x: d,
            y: h + i / 2,
            textBaseline: "top",
            textAlign: "center"
          }, true, true);
          g.applyTransformations();
          f.titleOffset = g.getBBox().height + i;
          break;
        case "left":
          g.setAttributes({
            x: c + i / 2,
            y: d,
            textBaseline: "top",
            textAlign: "center",
            rotationCenterX: c + i / 2,
            rotationCenterY: d,
            rotationRads: -Math.PI / 2
          }, true, true);
          g.applyTransformations();
          f.titleOffset = g.getBBox().width + i;
          break;
        case "right":
          g.setAttributes({
            x: h - c + i / 2,
            y: d,
            textBaseline: "bottom",
            textAlign: "center",
            rotationCenterX: h + i / 2,
            rotationCenterY: d,
            rotationRads: Math.PI / 2
          }, true, true);
          g.applyTransformations();
          f.titleOffset = g.getBBox().width + i;
          break
      }
    }
  },
  onThicknessChanged: function() {
    this.getChart().onThicknessChanged()
  },
  getThickness: function() {
    if (this.getHidden()) {
      return 0
    }
    return (this.sprites[0] && this.sprites[0].thickness || 1) + this.titleOffset +
      this.getMargin()
  },
  onAnimationStart: function() {
    this.spriteAnimationCount++;
    if (this.spriteAnimationCount === 1) {
      this.fireEvent("animationstart", this)
    }
  },
  onAnimationEnd: function() {
    this.spriteAnimationCount--;
    if (this.spriteAnimationCount === 0) {
      this.fireEvent("animationend", this)
    }
  },
  getItemId: function() {
    return this.getId()
  },
  getAncestorIds: function() {
    return [this.getChart().getId()]
  },
  isXType: function(a) {
    return a === "axis"
  },
  resolveListenerScope: function(e) {
    var d = this,
      a = Ext._namedScopes[e],
      c = d.getChart(),
      b;
    if (!a) {
      b = c ? c.resolveListenerScope(e, false) : (e || d)
    } else {
      if (a.isThis) {
        b = d
      } else {
        if (a.isController) {
          b = c ? c.resolveListenerScope(e, false) : d
        } else {
          if (a.isSelf) {
            b = c ? c.resolveListenerScope(e, false) : d;
            if (b === c && !c.getInheritedConfig("defaultListenerScope")) {
              b = d
            }
          }
        }
      }
    }
    return b
  },
  destroy: function() {
    var a = this;
    a.setChart(null);
    a.surface.destroy();
    a.surface = null;
    a.callParent()
  }
}, 1, ["axis"], ["axis"], {
  axis: true
}, ["widget.axis"], [
  ["observable", Ext.mixin.Observable]
], [Ext.chart.axis, "Axis"], 0));
(Ext.cmd.derive("Ext.chart.LegendBase", Ext.view.View, {
  config: {
    tpl: ['<div class="', "x-", 'legend-container">', '<tpl for=".">',
      '<div class="', "x-", 'legend-item">', "<span ", 'class="', "x-",
      "legend-item-marker {[ values.disabled ? Ext.baseCSSPrefix + 'legend-inactive' : '' ]}\" ",
      'style="background:{mark};">', "</span>{name}", "</div>", "</tpl>",
      "</div>"
    ],
    nodeContainerSelector: "div.x-legend-container",
    itemSelector: "div.x-legend-item",
    docked: "bottom"
  },
  setDocked: function(d) {
    var c = this,
      a = c.ownerCt,
      b;
    c.docked = d;
    switch (d) {
      case "top":
      case "bottom":
        c.addCls("x-horizontal");
        b = "hbox";
        break;
      case "left":
      case "right":
        c.removeCls("x-horizontal");
        b = "vbox";
        break
    }
    if (a) {
      a.setDocked(d)
    }
  },
  setStore: function(a) {
    this.bindStore(a)
  },
  clearViewEl: function() {
    Ext.view.View.prototype.clearViewEl.apply(this, arguments);
    Ext.removeNode(this.getNodeContainer())
  },
  onItemClick: function(a, c, b, d) {
    Ext.view.View.prototype.onItemClick.apply(this, arguments);
    this.toggleItem(b)
  }
}, 0, 0, ["component", "box", "dataview"], {
  component: true,
  box: true,
  dataview: true
}, 0, 0, [Ext.chart, "LegendBase"], 0));
(Ext.cmd.derive("Ext.chart.Legend", Ext.chart.LegendBase, {
  config: {
    baseCls: "x-legend",
    padding: 5,
    rect: null,
    disableSelection: true,
    toggleable: true
  },
  toggleItem: function(c) {
    if (!this.getToggleable()) {
      return
    }
    var b = this.getStore(),
      h = 0,
      e, g = true,
      d, f, a;
    if (b) {
      f = b.getCount();
      for (d = 0; d < f; d++) {
        a = b.getAt(d);
        if (a.get("disabled")) {
          h++
        }
      }
      g = f - h > 1;
      a = b.getAt(c);
      if (a) {
        e = a.get("disabled");
        if (e || g) {
          a.set("disabled", !e)
        }
      }
    }
  }
}, 0, ["legend"], ["component", "box", "dataview", "legend"], {
  component: true,
  box: true,
  dataview: true,
  legend: true
}, ["widget.legend"], 0, [Ext.chart, "Legend"], 0));
(Ext.cmd.derive("Ext.chart.AbstractChart", Ext.draw.Container, {
  isChart: true,
  defaultBindProperty: "store",
  config: {
    store: "ext-empty-store",
    theme: "default",
    style: null,
    animation: !Ext.isIE8,
    series: [],
    axes: [],
    legend: null,
    colors: null,
    insetPadding: {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10
    },
    background: null,
    interactions: [],
    mainRect: null,
    resizeHandler: null,
    highlightItem: null
  },
  animationSuspendCount: 0,
  chartLayoutSuspendCount: 0,
  axisThicknessSuspendCount: 0,
  thicknessChanged: false,
  surfaceZIndexes: {
    background: 0,
    main: 1,
    grid: 2,
    series: 3,
    axis: 4,
    chart: 5,
    overlay: 6,
    events: 7
  },
  constructor: function(a) {
    var b = this;
    b.itemListeners = {};
    b.surfaceMap = {};
    b.chartComponents = {};
    b.isInitializing = true;
    b.suspendChartLayout();
    b.animationSuspendCount++;
    Ext.draw.Container.prototype.constructor.apply(this, arguments);
    delete b.isInitializing;
    b.getSurface("main");
    b.getSurface("chart").setFlipRtlText(b.getInherited().rtl);
    b.getSurface("overlay").waitFor(b.getSurface("series"));
    b.animationSuspendCount--;
    b.resumeChartLayout()
  },
  applyAnimation: function(a, b) {
    if (!a) {
      a = {
        duration: 0
      }
    } else {
      if (a === true) {
        a = {
          easing: "easeInOut",
          duration: 500
        }
      }
    }
    return b ? Ext.apply({}, a, b) : a
  },
  getAnimation: function() {
    if (this.animationSuspendCount) {
      return {
        duration: 0
      }
    } else {
      return (arguments.callee.$previous || Ext.draw.Container.prototype.getAnimation)
        .call(this)
    }
  },
  applyInsetPadding: function(b, a) {
    if (!Ext.isObject(b)) {
      return Ext.util.Format.parseBox(b)
    } else {
      if (!a) {
        return b
      } else {
        return Ext.apply(a, b)
      }
    }
  },
  suspendAnimation: function() {
    var d = this,
      c = d.getSeries(),
      e = c.length,
      b = -1,
      a;
    d.animationSuspendCount++;
    if (d.animationSuspendCount === 1) {
      while (++b < e) {
        a = c[b];
        a.setAnimation(a.getAnimation())
      }
    }
  },
  resumeAnimation: function() {
    var d = this,
      c = d.getSeries(),
      f = c.length,
      b = -1,
      a, e;
    d.animationSuspendCount--;
    if (d.animationSuspendCount === 0) {
      while (++b < f) {
        a = c[b];
        e = a.getAnimation();
        a.setAnimation(e.duration && e || d.getAnimation())
      }
    }
  },
  suspendChartLayout: function() {
    this.chartLayoutSuspendCount++;
    if (this.chartLayoutSuspendCount === 1) {
      if (this.scheduledLayoutId) {
        this.layoutInSuspension = true;
        this.cancelChartLayout()
      } else {
        this.layoutInSuspension = false
      }
    }
  },
  resumeChartLayout: function() {
    this.chartLayoutSuspendCount--;
    if (this.chartLayoutSuspendCount === 0) {
      if (this.layoutInSuspension) {
        this.scheduleLayout()
      }
    }
  },
  cancelChartLayout: function() {
    if (this.scheduledLayoutId) {
      Ext.draw.Animator.cancel(this.scheduledLayoutId);
      this.scheduledLayoutId = null
    }
  },
  scheduleLayout: function() {
    var a = this;
    if (a.allowSchedule() && !a.scheduledLayoutId) {
      a.scheduledLayoutId = Ext.draw.Animator.schedule("doScheduleLayout",
        a)
    }
  },
  allowSchedule: function() {
    return true
  },
  doScheduleLayout: function() {
    if (this.chartLayoutSuspendCount) {
      this.layoutInSuspension = true
    } else {
      this.performLayout()
    }
  },
  suspendThicknessChanged: function() {
    this.axisThicknessSuspendCount++
  },
  resumeThicknessChanged: function() {
    if (this.axisThicknessSuspendCount > 0) {
      this.axisThicknessSuspendCount--;
      if (this.axisThicknessSuspendCount === 0 && this.thicknessChanged) {
        this.onThicknessChanged()
      }
    }
  },
  onThicknessChanged: function() {
    if (this.axisThicknessSuspendCount === 0) {
      this.thicknessChanged = false;
      this.performLayout()
    } else {
      this.thicknessChanged = true
    }
  },
  applySprites: function(b) {
    var a = this.getSurface("chart");
    b = Ext.Array.from(b);
    a.removeAll(true);
    a.add(b);
    return b
  },
  initItems: function() {
    var a = this.items,
      b, d, c;
    if (a && !a.isMixedCollection) {
      this.items = [];
      a = Ext.Array.from(a);
      for (b = 0, d = a.length; b < d; b++) {
        c = a[b];
        if (c.type) {
          Ext.raise(
            "To add custom sprites to the chart use the 'sprites' config."
          )
        } else {
          this.items.push(c)
        }
      }
    }
    this.callParent()
  },
  applyBackground: function(c, e) {
    var b = this.getSurface("background"),
      d, a, f;
    if (c) {
      if (e) {
        d = e.attr.width;
        a = e.attr.height;
        f = e.type === (c.type || "rect")
      }
      if (c.isSprite) {
        e = c
      } else {
        if (c.type === "image" && Ext.isString(c.src)) {
          if (f) {
            e.setAttributes({
              src: c.src
            })
          } else {
            b.remove(e, true);
            e = b.add(c)
          }
        } else {
          if (f) {
            e.setAttributes({
              fillStyle: c
            })
          } else {
            b.remove(e, true);
            e = b.add({
              type: "rect",
              fillStyle: c,
              fx: {
                customDurations: {
                  x: 0,
                  y: 0,
                  width: 0,
                  height: 0
                }
              }
            })
          }
        }
      }
    }
    if (d && a) {
      e.setAttributes({
        width: d,
        height: a
      })
    }
    e.fx.setConfig(this.getAnimation());
    return e
  },
  getLegendStore: function() {
    return this.legendStore
  },
  refreshLegendStore: function() {
    if (this.getLegendStore()) {
      var d, e, c = this.getSeries(),
        b, a = [];
      if (c) {
        for (d = 0, e = c.length; d < e; d++) {
          b = c[d];
          if (b.getShowInLegend()) {
            b.provideLegendInfo(a)
          }
        }
      }
      this.getLegendStore().setData(a)
    }
  },
  resetLegendStore: function() {
    var c = this.getLegendStore(),
      e, d, a, b;
    if (c) {
      e = this.getLegendStore().getData().items;
      for (d = 0, a = e.length; d < a; d++) {
        b = e[d];
        b.beginEdit();
        b.set("disabled", false);
        b.commit()
      }
    }
  },
  onUpdateLegendStore: function(b, a) {
    var d = this.getSeries(),
      c;
    if (a && d) {
      c = d.map[a.get("series")];
      if (c) {
        c.setHiddenByIndex(a.get("index"), a.get("disabled"));
        this.redraw()
      }
    }
  },
  defaultResizeHandler: function(a) {
    this.scheduleLayout();
    return false
  },
  applyMainRect: function(a, b) {
    if (!b) {
      return a
    }
    this.getSeries();
    this.getAxes();
    if (a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]) {
      return b
    } else {
      return a
    }
  },
  register: function(a) {
    var b = this.chartComponents,
      c = a.getId();
    b[c] = a
  },
  unregister: function(a) {
    var b = this.chartComponents,
      c = a.getId();
    delete b[c]
  },
  get: function(a) {
    return this.chartComponents[a]
  },
  getAxis: function(a) {
    if (a instanceof Ext.chart.axis.Axis) {
      return a
    } else {
      if (Ext.isNumber(a)) {
        return this.getAxes()[a]
      } else {
        if (Ext.isString(a)) {
          return this.get(a)
        }
      }
    }
  },
  getSurface: function(b, c) {
    b = b || "main";
    c = c || b;
    var d = this,
      a = Ext.draw.Container.prototype.getSurface.call(this, b),
      f = d.surfaceZIndexes,
      e = d.surfaceMap;
    if (c in f) {
      a.element.setStyle("zIndex", f[c])
    }
    if (!e[c]) {
      e[c] = []
    }
    if (Ext.Array.indexOf(e[c], a) < 0) {
      a.type = c;
      e[c].push(a);
      a.on("destroy", d.forgetSurface, d)
    }
    return a
  },
  forgetSurface: function(a) {
    var d = this.surfaceMap;
    if (!d || this.isDestroying) {
      return
    }
    var c = d[a.type],
      b = c ? Ext.Array.indexOf(c, a) : -1;
    if (b >= 0) {
      c.splice(b, 1)
    }
  },
  applyAxes: function(b, k) {
    var l = this,
      g = {
        left: "right",
        right: "left"
      },
      m = [],
      c, d, e, a, f, h, j;
    l.animationSuspendCount++;
    l.getStore();
    if (!k) {
      k = [];
      k.map = {}
    }
    j = k.map;
    m.map = {};
    b = Ext.Array.from(b, true);
    for (f = 0, h = b.length; f < h; f++) {
      c = b[f];
      if (!c) {
        continue
      }
      if (c instanceof Ext.chart.axis.Axis) {
        d = j[c.getId()];
        c.setChart(l)
      } else {
        c = Ext.Object.chain(c);
        e = c.linkedTo;
        a = c.id;
        if (Ext.isNumber(e)) {
          c = Ext.merge({}, b[e], c)
        } else {
          if (Ext.isString(e)) {
            Ext.Array.each(b, function(i) {
              if (i.id === c.linkedTo) {
                c = Ext.merge({}, i, c);
                return false
              }
            })
          }
        }
        c.id = a;
        c.chart = l;
        if (l.getInherited().rtl) {
          c.position = g[c.position] || c.position
        }
        a = c.getId && c.getId() || c.id;
        c = Ext.factory(c, null, d = j[a], "axis")
      }
      if (c) {
        m.push(c);
        m.map[c.getId()] = c;
        if (!d) {
          c.on("animationstart", "onAnimationStart", l);
          c.on("animationend", "onAnimationEnd", l)
        }
      }
    }
    for (f in j) {
      if (!m.map[f]) {
        j[f].destroy()
      }
    }
    l.animationSuspendCount--;
    return m
  },
  updateAxes: function() {
    if (!this.isDestroying) {
      this.scheduleLayout()
    }
  },
  circularCopyArray: function(e, f, d) {
    var c = [],
      b, a = e && e.length;
    if (a) {
      for (b = 0; b < d; b++) {
        c.push(e[(f + b) % a])
      }
    }
    return c
  },
  circularCopyObject: function(f, g, d) {
    var c = this,
      b, e, a = {};
    if (d) {
      for (b in f) {
        if (f.hasOwnProperty(b)) {
          e = f[b];
          if (Ext.isArray(e)) {
            a[b] = c.circularCopyArray(e, g, d)
          } else {
            a[b] = e
          }
        }
      }
    }
    return a
  },
  getColors: function() {
    var b = this,
      a = b.config.colors,
      c = b.getTheme();
    if (Ext.isArray(a) && a.length > 0) {
      a = b.applyColors(a)
    }
    return a || (c && c.getColors())
  },
  applyColors: function(a) {
    a = Ext.Array.map(a, function(b) {
      if (Ext.isString(b)) {
        return b
      } else {
        return b.toString()
      }
    });
    return a
  },
  updateColors: function(c) {
    var k = this,
      f = k.getTheme(),
      a = c || (f && f.getColors()),
      m = a.length,
      l = 0,
      g = k.getSeries(),
      d = g && g.length,
      e, j, b, h;
    if (m) {
      for (e = 0; e < d; e++) {
        j = g[e];
        h = j.themeColorCount();
        b = k.circularCopyArray(a, l, h);
        l += h;
        j.updateChartColors(b)
      }
    }
    k.refreshLegendStore()
  },
  applyTheme: function(a) {
    if (a && a.isTheme) {
      return a
    }
    return Ext.Factory.chartTheme(a)
  },
  updateTheme: function(g) {
    var e = this,
      f = e.getAxes(),
      d = e.getSeries(),
      a = e.getColors(),
      c, b;
    e.updateChartTheme(g);
    for (b = 0; b < f.length; b++) {
      f[b].updateTheme(g)
    }
    for (b = 0; b < d.length; b++) {
      c = d[b];
      c.updateTheme(g)
    }
    e.updateSpriteTheme(g);
    e.updateColors(a);
    e.redraw()
  },
  themeOnlyIfConfigured: {},
  updateChartTheme: function(c) {
    var i = this,
      k = c.getChart(),
      n = i.getInitialConfig(),
      b = i.defaultConfig,
      e = i.getConfigurator().configs,
      f = k.defaults,
      g = k[i.xtype],
      h = i.themeOnlyIfConfigured,
      l, j, o, a, m, d;
    k = Ext.merge({}, f, g);
    for (l in k) {
      j = k[l];
      d = e[l];
      if (j !== null && j !== undefined && d) {
        m = n[l];
        o = Ext.isObject(j);
        a = m === b[l];
        if (o) {
          if (a && h[l]) {
            continue
          }
          j = Ext.merge({}, j, m)
        }
        if (a || o) {
          i[d.names.set](j)
        }
      }
    }
  },
  updateSpriteTheme: function(c) {
    this.getSprites();
    var j = this,
      e = j.getSurface("chart"),
      h = e.getItems(),
      m = c.getSprites(),
      k, a, l, f, d, b, g;
    for (b = 0, g = h.length; b < g; b++) {
      k = h[b];
      a = m[k.type];
      if (a) {
        f = {};
        d = k.type === "text";
        for (l in a) {
          if (!(l in k.config)) {
            if (!(d && l.indexOf("font") === 0 && k.config.font)) {
              f[l] = a[l]
            }
          }
        }
        k.setAttributes(f)
      }
    }
  },
  addSeries: function(b) {
    var a = this.getSeries();
    Ext.Array.push(a, b);
    this.setSeries(a)
  },
  removeSeries: function(d) {
    d = Ext.Array.from(d);
    var b = this.getSeries(),
      f = [],
      a = d.length,
      g = {},
      c, e;
    for (c = 0; c < a; c++) {
      e = d[c];
      if (typeof e !== "string") {
        e = e.getId()
      }
      g[e] = true
    }
    for (c = 0, a = b.length; c < a; c++) {
      if (!g[b[c].getId()]) {
        f.push(b[c])
      }
    }
    this.setSeries(f)
  },
  applySeries: function(e, d) {
    var g = this,
      j = [],
      h, a, c, f, b;
    g.animationSuspendCount++;
    g.getAxes();
    if (d) {
      h = d.map
    } else {
      d = [];
      h = d.map = {}
    }
    j.map = {};
    e = Ext.Array.from(e, true);
    for (c = 0, f = e.length; c < f; c++) {
      b = e[c];
      if (!b) {
        continue
      }
      a = h[b.getId && b.getId() || b.id];
      if (b instanceof Ext.chart.series.Series) {
        if (a && a !== b) {
          a.destroy()
        }
        b.setChart(g)
      } else {
        if (Ext.isObject(b)) {
          if (a) {
            a.setConfig(b);
            b = a
          } else {
            if (Ext.isString(b)) {
              b = {
                type: b
              }
            }
            b.chart = g;
            b = Ext.create(b.xclass || ("series." + b.type), b);
            b.on("animationstart", "onAnimationStart", g);
            b.on("animationend", "onAnimationEnd", g)
          }
        }
      }
      j.push(b);
      j.map[b.getId()] = b
    }
    for (c in h) {
      if (!j.map[h[c].getId()]) {
        h[c].destroy()
      }
    }
    g.animationSuspendCount--;
    return j
  },
  applyLegend: function(b, a) {
    return Ext.factory(b, Ext.chart.Legend, a)
  },
  updateLegend: function(b, a) {
    if (a) {
      a.destroy()
    }
    if (b) {
      this.getItems();
      this.legendStore = new Ext.data.Store({
        autoDestroy: true,
        fields: ["id", "name", "mark", "disabled", "series", "index"]
      });
      b.setStore(this.legendStore);
      this.refreshLegendStore();
      this.legendStore.on("update", "onUpdateLegendStore", this)
    }
  },
  updateSeries: function(b, a) {
    var c = this;
    if (c.isDestroying) {
      return
    }
    c.animationSuspendCount++;
    c.fireEvent("serieschange", c, b, a);
    c.refreshLegendStore();
    if (!Ext.isEmpty(b)) {
      c.updateTheme(c.getTheme())
    }
    c.scheduleLayout();
    c.animationSuspendCount--
  },
  applyInteractions: function(h, d) {
    if (!d) {
      d = [];
      d.map = {}
    }
    var g = this,
      a = [],
      c = d.map,
      e, f, b;
    a.map = {};
    h = Ext.Array.from(h, true);
    for (e = 0, f = h.length; e < f; e++) {
      b = h[e];
      if (!b) {
        continue
      }
      b = Ext.factory(b, null, c[b.getId && b.getId() || b.id],
        "interaction");
      if (b) {
        b.setChart(g);
        a.push(b);
        a.map[b.getId()] = b
      }
    }
    for (e in c) {
      if (!a.map[e]) {
        c[e].destroy()
      }
    }
    return a
  },
  getInteraction: function(e) {
    var f = this.getInteractions(),
      a = f && f.length,
      c = null,
      b, d;
    if (a) {
      for (d = 0; d < a; ++d) {
        b = f[d];
        if (b.tyoe === e) {
          c = b;
          break
        }
      }
    }
    return c
  },
  applyStore: function(a) {
    return a && Ext.StoreManager.lookup(a)
  },
  updateStore: function(a, c) {
    var b = this;
    if (c) {
      c.un({
        datachanged: "onDataChanged",
        update: "onDataChanged",
        scope: b,
        order: "after"
      });
      if (c.autoDestroy) {
        c.destroy()
      }
    }
    if (a) {
      a.on({
        datachanged: "onDataChanged",
        update: "onDataChanged",
        scope: b,
        order: "after"
      })
    }
    b.fireEvent("storechange", b, a, c);
    b.onDataChanged()
  },
  redraw: function() {
    this.fireEvent("redraw", this)
  },
  performLayout: function() {
    var d = this,
      b = d.innerElement.getSize(),
      c = [0, 0, b.width, b.height],
      a = d.getBackground();
    d.hasFirstLayout = true;
    d.fireEvent("layout", d);
    d.cancelChartLayout();
    d.getSurface("background").setRect(c);
    d.getSurface("chart").setRect(c);
    a.setAttributes({
      width: b.width,
      height: b.height
    })
  },
  getEventXY: function(a) {
    return this.getSurface().getEventXY(a)
  },
  getItemForPoint: function(h, g) {
    var f = this,
      a = f.getSeries(),
      e = f.getMainRect(),
      d = a.length,
      b = f.hasFirstLayout ? d - 1 : -1,
      c, j;
    if (!(e && h >= 0 && h <= e[2] && g >= 0 && g <= e[3])) {
      return null
    }
    for (; b >= 0; b--) {
      c = a[b];
      j = c.getItemForPoint(h, g);
      if (j) {
        return j
      }
    }
    return null
  },
  getItemsForPoint: function(h, g) {
    var f = this,
      a = f.getSeries(),
      d = a.length,
      b = f.hasFirstLayout ? d - 1 : -1,
      e = [],
      c, j;
    for (; b >= 0; b--) {
      c = a[b];
      j = c.getItemForPoint(h, g);
      if (j) {
        e.push(j)
      }
    }
    return e
  },
  onAnimationStart: function() {
    this.fireEvent("animationstart", this)
  },
  onAnimationEnd: function() {
    this.fireEvent("animationend", this)
  },
  onDataChanged: function() {
    var g = this;
    if (g.isInitializing) {
      return
    }
    var f = g.getMainRect(),
      b = g.getStore(),
      d = g.getSeries(),
      h = g.getAxes(),
      a = g.getColors(),
      c, e;
    if (!b || !h || !d) {
      return
    }
    if (!f) {
      g.on({
        redraw: g.onDataChanged,
        scope: g,
        single: true
      });
      return
    }
    for (c = 0, e = d.length; c < e; c++) {
      d[c].processData()
    }
    g.updateColors(a);
    g.redraw()
  },
  bindStore: function(a) {
    this.setStore(a)
  },
  applyHighlightItem: function(f, a) {
    if (f === a) {
      return
    }
    if (Ext.isObject(f) && Ext.isObject(a)) {
      var e = f,
        d = a,
        c = e.sprite && (e.sprite[0] || e.sprite),
        b = d.sprite && (d.sprite[0] || d.sprite);
      if (c === b && e.index === d.index) {
        return
      }
    }
    return f
  },
  updateHighlightItem: function(b, a) {
    if (a) {
      a.series.setAttributesForItem(a, {
        highlighted: false
      })
    }
    if (b) {
      b.series.setAttributesForItem(b, {
        highlighted: true
      });
      this.fireEvent("itemhighlight", this, b, a)
    }
  },
  destroyChart: function() {
    var f = this,
      d = f.getLegend(),
      g = f.getAxes(),
      c = f.getSeries(),
      h = f.getInteractions(),
      b = [],
      a, e;
    f.surfaceMap = null;
    for (a = 0, e = h.length; a < e; a++) {
      h[a].destroy()
    }
    for (a = 0, e = g.length; a < e; a++) {
      g[a].destroy()
    }
    for (a = 0, e = c.length; a < e; a++) {
      c[a].destroy()
    }
    f.setInteractions(b);
    f.setAxes(b);
    f.setSeries(b);
    if (d) {
      d.destroy();
      f.setLegend(null)
    }
    f.legendStore = null;
    f.setStore(null);
    f.cancelChartLayout()
  },
  getRefItems: function(b) {
    var g = this,
      e = g.getSeries(),
      h = g.getAxes(),
      a = g.getInteractions(),
      c = [],
      d, f;
    for (d = 0, f = e.length; d < f; d++) {
      c.push(e[d]);
      if (e[d].getRefItems) {
        c.push.apply(c, e[d].getRefItems(b))
      }
    }
    for (d = 0, f = h.length; d < f; d++) {
      c.push(h[d]);
      if (h[d].getRefItems) {
        c.push.apply(c, h[d].getRefItems(b))
      }
    }
    for (d = 0, f = a.length; d < f; d++) {
      c.push(a[d]);
      if (a[d].getRefItems) {
        c.push.apply(c, a[d].getRefItems(b))
      }
    }
    return c
  }
}, 1, 0, ["component", "box", "container", "panel", "draw"], {
  component: true,
  box: true,
  container: true,
  panel: true,
  draw: true
}, 0, 0, [Ext.chart, "AbstractChart"], 0));
Ext.define("Ext.chart.overrides.AbstractChart", {
  override: "Ext.chart.AbstractChart",
  updateLegend: function(b, a) {
    var c;
    arguments.callee.$previous.call(this, b, a);
    if (b) {
      c = b.docked;
      this.addDocked({
        dock: c,
        xtype: "panel",
        shrinkWrap: true,
        scrollable: true,
        layout: {
          type: c === "top" || c === "bottom" ? "hbox" : "vbox",
          pack: "center"
        },
        items: b,
        cls: "x-legend-panel"
      })
    }
  },
  performLayout: function() {
    if (this.isVisible(true)) {
      return arguments.callee.$previous.call(this)
    }
    this.cancelChartLayout();
    return false
  },
  afterComponentLayout: function(c, a, b, d) {
    (arguments.callee.$previous || Ext.draw.Container.prototype.afterComponentLayout)
    .call(this, c, a, b, d);
    this.scheduleLayout()
  },
  allowSchedule: function() {
    return this.rendered
  },
  onDestroy: function() {
    this.destroyChart();
    (arguments.callee.$previous || Ext.draw.Container.prototype.onDestroy)
    .apply(this, arguments)
  }
});
(Ext.cmd.derive("Ext.chart.grid.HorizontalGrid", Ext.draw.sprite.Sprite, {
    inheritableStatics: {
      def: {
        processors: {
          x: "number",
          y: "number",
          width: "number",
          height: "number"
        },
        defaults: {
          x: 0,
          y: 0,
          width: 1,
          height: 1,
          strokeStyle: "#DDD"
        }
      }
    },
    render: function(b, c, e) {
      var a = this.attr,
        f = b.roundPixel(a.y),
        d = c.lineWidth * 0.5;
      c.beginPath();
      c.rect(e[0] - b.matrix.getDX(), f + d, +e[2], a.height);
      c.fill();
      c.beginPath();
      c.moveTo(e[0] - b.matrix.getDX(), f + d);
      c.lineTo(e[0] + e[2] - b.matrix.getDX(), f + d);
      c.stroke()
    }
  }, 0, 0, 0, 0, ["grid.horizontal"], 0, [Ext.chart.grid, "HorizontalGrid"],
  0));
(Ext.cmd.derive("Ext.chart.grid.VerticalGrid", Ext.draw.sprite.Sprite, {
  inheritableStatics: {
    def: {
      processors: {
        x: "number",
        y: "number",
        width: "number",
        height: "number"
      },
      defaults: {
        x: 0,
        y: 0,
        width: 1,
        height: 1,
        strokeStyle: "#DDD"
      }
    }
  },
  render: function(c, d, f) {
    var b = this.attr,
      a = c.roundPixel(b.x),
      e = d.lineWidth * 0.5;
    d.beginPath();
    d.rect(a - e, f[1] - c.matrix.getDY(), b.width, f[3]);
    d.fill();
    d.beginPath();
    d.moveTo(a - e, f[1] - c.matrix.getDY());
    d.lineTo(a - e, f[1] + f[3] - c.matrix.getDY());
    d.stroke()
  }
}, 0, 0, 0, 0, ["grid.vertical"], 0, [Ext.chart.grid, "VerticalGrid"], 0));
(Ext.cmd.derive("Ext.chart.CartesianChart", Ext.chart.AbstractChart, {
  alternateClassName: "Ext.chart.Chart",
  isCartesian: true,
  config: {
    flipXY: false,
    innerRect: [0, 0, 1, 1],
    innerPadding: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  },
  applyInnerPadding: function(b, a) {
    if (!Ext.isObject(b)) {
      return Ext.util.Format.parseBox(b)
    } else {
      if (!a) {
        return b
      } else {
        return Ext.apply(a, b)
      }
    }
  },
  getDirectionForAxis: function(a) {
    var b = this.getFlipXY();
    if (a === "left" || a === "right") {
      if (b) {
        return "X"
      } else {
        return "Y"
      }
    } else {
      if (b) {
        return "Y"
      } else {
        return "X"
      }
    }
  },
  performLayout: function() {
    var A = this;
    A.animationSuspendCount++;
    if (Ext.chart.AbstractChart.prototype.performLayout.call(this) ===
      false) {
      --A.animationSuspendCount;
      return
    }
    A.suspendThicknessChanged();
    var d = A.getSurface("chart").getRect(),
      o = d[2],
      n = d[3],
      z = A.getAxes(),
      b, q = A.getSeries(),
      h, l, a, f = A.getInsetPadding(),
      v = A.getInnerPadding(),
      r, c, e = Ext.apply({}, f),
      u, p, s, k, m, y, t, x, g, j = A.getInherited().rtl,
      w = A.getFlipXY();
    if (o <= 0 || n <= 0) {
      return
    }
    for (x = 0; x < z.length; x++) {
      b = z[x];
      l = b.getSurface();
      m = b.getFloating();
      y = m ? m.value : null;
      a = b.getThickness();
      switch (b.getPosition()) {
        case "top":
          l.setRect([0, e.top + 1, o, a]);
          break;
        case "bottom":
          l.setRect([0, n - (e.bottom + a), o, a]);
          break;
        case "left":
          l.setRect([e.left, 0, a, n]);
          break;
        case "right":
          l.setRect([o - (e.right + a), 0, a, n]);
          break
      }
      if (y === null) {
        e[b.getPosition()] += a
      }
    }
    o -= e.left + e.right;
    n -= e.top + e.bottom;
    u = [e.left, e.top, o, n];
    e.left += v.left;
    e.top += v.top;
    e.right += v.right;
    e.bottom += v.bottom;
    p = o - v.left - v.right;
    s = n - v.top - v.bottom;
    A.setInnerRect([e.left, e.top, p, s]);
    if (p <= 0 || s <= 0) {
      return
    }
    A.setMainRect(u);
    A.getSurface().setRect(u);
    for (x = 0, g = A.surfaceMap.grid && A.surfaceMap.grid.length; x < g; x++) {
      c = A.surfaceMap.grid[x];
      c.setRect(u);
      c.matrix.set(1, 0, 0, 1, v.left, v.top);
      c.matrix.inverse(c.inverseMatrix)
    }
    for (x = 0; x < z.length; x++) {
      b = z[x];
      l = b.getSurface();
      t = l.matrix;
      k = t.elements;
      switch (b.getPosition()) {
        case "top":
        case "bottom":
          k[4] = e.left;
          b.setLength(p);
          break;
        case "left":
        case "right":
          k[5] = e.top;
          b.setLength(s);
          break
      }
      b.updateTitleSprite();
      t.inverse(l.inverseMatrix)
    }
    for (x = 0, g = q.length; x < g; x++) {
      h = q[x];
      r = h.getSurface();
      r.setRect(u);
      if (w) {
        if (j) {
          r.matrix.set(0, -1, -1, 0, v.left + p, v.top + s)
        } else {
          r.matrix.set(0, -1, 1, 0, v.left, v.top + s)
        }
      } else {
        r.matrix.set(1, 0, 0, -1, v.left, v.top + s)
      }
      r.matrix.inverse(r.inverseMatrix);
      h.getOverlaySurface().setRect(u)
    }
    A.redraw();
    A.animationSuspendCount--;
    A.resumeThicknessChanged()
  },
  refloatAxes: function() {
    var h = this,
      g = h.getAxes(),
      o = (g && g.length) || 0,
      c, d, n, f, l, b, k, r = h.innerElement.getSize(),
      q = h.getInsetPadding(),
      p = h.getInnerPadding(),
      a = r.width - q.left - q.right,
      m = r.height - q.top - q.bottom,
      j, e;
    for (e = 0; e < o; e++) {
      c = g[e];
      f = c.getFloating();
      l = f ? f.value : null;
      if (l === null) {
        delete c.floatingAtCoord;
        continue
      }
      d = c.getSurface();
      n = d.getRect();
      if (!n) {
        continue
      }
      n = n.slice();
      b = h.getAxis(f.alongAxis);
      if (b) {
        j = b.getAlignment() === "horizontal";
        if (Ext.isString(l)) {
          l = b.getCoordFor(l)
        }
        b.floatingAxes[c.getId()] = l;
        k = b.getSprites()[0].attr.matrix;
        if (j) {
          l = l * k.getXX() + k.getDX();
          c.floatingAtCoord = l + p.left + p.right
        } else {
          l = l * k.getYY() + k.getDY();
          c.floatingAtCoord = l + p.top + p.bottom
        }
      } else {
        j = c.getAlignment() === "horizontal";
        if (j) {
          c.floatingAtCoord = l + p.top + p.bottom
        } else {
          c.floatingAtCoord = l + p.left + p.right
        }
        l = d.roundPixel(0.01 * l * (j ? m : a))
      }
      switch (c.getPosition()) {
        case "top":
          n[1] = q.top + p.top + l - n[3] + 1;
          break;
        case "bottom":
          n[1] = q.top + p.top + (b ? l : m - l);
          break;
        case "left":
          n[0] = q.left + p.left + l - n[2];
          break;
        case "right":
          n[0] = q.left + p.left + (b ? l : a - l) - 1;
          break
      }
      d.setRect(n)
    }
  },
  redraw: function() {
    var C = this,
      r = C.getSeries(),
      z = C.getAxes(),
      b = C.getMainRect(),
      p, t, w = C.getInnerPadding(),
      f, l, s, e, q, A, v, g, d, c, a, k, n, y = C.getFlipXY(),
      x = 1000,
      m, u, h, o, B;
    if (!b) {
      return
    }
    p = b[2] - w.left - w.right;
    t = b[3] - w.top - w.bottom;
    for (A = 0; A < r.length; A++) {
      h = r[A];
      if ((c = h.getXAxis())) {
        n = c.getVisibleRange();
        l = c.getRange();
        l = [l[0] + (l[1] - l[0]) * n[0], l[0] + (l[1] - l[0]) * n[1]]
      } else {
        l = h.getXRange()
      }
      if ((a = h.getYAxis())) {
        n = a.getVisibleRange();
        s = a.getRange();
        s = [s[0] + (s[1] - s[0]) * n[0], s[0] + (s[1] - s[0]) * n[1]]
      } else {
        s = h.getYRange()
      }
      q = {
        visibleMinX: l[0],
        visibleMaxX: l[1],
        visibleMinY: s[0],
        visibleMaxY: s[1],
        innerWidth: p,
        innerHeight: t,
        flipXY: y
      };
      f = h.getSprites();
      for (v = 0, g = f.length; v < g; v++) {
        o = f[v];
        m = o.attr.zIndex;
        if (m < x) {
          m += (A + 1) * 100 + x;
          o.attr.zIndex = m;
          B = o.getMarker("items");
          if (B) {
            u = B.attr.zIndex;
            if (u === Number.MAX_VALUE) {
              B.attr.zIndex = m
            } else {
              if (u < x) {
                B.attr.zIndex = m + u
              }
            }
          }
        }
        o.setAttributes(q, true)
      }
    }
    for (A = 0; A < z.length; A++) {
      d = z[A];
      e = d.isSide();
      f = d.getSprites();
      k = d.getRange();
      n = d.getVisibleRange();
      q = {
        dataMin: k[0],
        dataMax: k[1],
        visibleMin: n[0],
        visibleMax: n[1]
      };
      if (e) {
        q.length = t;
        q.startGap = w.bottom;
        q.endGap = w.top
      } else {
        q.length = p;
        q.startGap = w.left;
        q.endGap = w.right
      }
      for (v = 0, g = f.length; v < g; v++) {
        f[v].setAttributes(q, true)
      }
    }
    C.renderFrame();
    Ext.chart.AbstractChart.prototype.redraw.apply(this, arguments)
  },
  renderFrame: function() {
    this.refloatAxes();
    Ext.chart.AbstractChart.prototype.renderFrame.call(this)
  }
}, 0, ["chart", "cartesian"], ["component", "box", "container", "panel",
  "draw", "cartesian", "chart"
], {
  component: true,
  box: true,
  container: true,
  panel: true,
  draw: true,
  cartesian: true,
  chart: true
}, ["widget.cartesian", "widget.chart"], 0, [Ext.chart, "CartesianChart",
  Ext.chart, "Chart"
], 0));
(Ext.cmd.derive("Ext.chart.grid.CircularGrid", Ext.draw.sprite.Circle, {
  inheritableStatics: {
    def: {
      defaults: {
        r: 1,
        strokeStyle: "#DDD"
      }
    }
  }
}, 0, 0, 0, 0, ["grid.circular"], 0, [Ext.chart.grid, "CircularGrid"], 0));
(Ext.cmd.derive("Ext.chart.grid.RadialGrid", Ext.draw.sprite.Path, {
  inheritableStatics: {
    def: {
      processors: {
        startRadius: "number",
        endRadius: "number"
      },
      defaults: {
        startRadius: 0,
        endRadius: 1,
        scalingCenterX: 0,
        scalingCenterY: 0,
        strokeStyle: "#DDD"
      },
      triggers: {
        startRadius: "path,bbox",
        endRadius: "path,bbox"
      }
    }
  },
  render: function() {
    Ext.draw.sprite.Path.prototype.render.apply(this, arguments)
  },
  updatePath: function(d, a) {
    var b = a.startRadius,
      c = a.endRadius;
    d.moveTo(b, 0);
    d.lineTo(c, 0)
  }
}, 0, 0, 0, 0, ["grid.radial"], 0, [Ext.chart.grid, "RadialGrid"], 0));
(Ext.cmd.derive("Ext.chart.PolarChart", Ext.chart.AbstractChart, {
  isPolar: true,
  config: {
    center: [0, 0],
    radius: 0,
    innerPadding: 0
  },
  getDirectionForAxis: function(a) {
    return a === "radial" ? "Y" : "X"
  },
  applyCenter: function(a, b) {
    if (b && a[0] === b[0] && a[1] === b[1]) {
      return
    }
    return [+a[0], +a[1]]
  },
  updateCenter: function(a) {
    var g = this,
      h = g.getAxes(),
      d = g.getSeries(),
      c, f, e, b;
    for (c = 0, f = h.length; c < f; c++) {
      e = h[c];
      e.setCenter(a)
    }
    for (c = 0, f = d.length; c < f; c++) {
      b = d[c];
      b.setCenter(a)
    }
  },
  applyInnerPadding: function(b, a) {
    return Ext.isNumber(b) ? b : a
  },
  doSetSurfaceRect: function(b, c) {
    var a = this.getMainRect();
    b.setRect(c);
    b.matrix.set(1, 0, 0, 1, a[0] - c[0], a[1] - c[1]);
    b.inverseMatrix.set(1, 0, 0, 1, c[0] - a[0], c[1] - a[1])
  },
  applyAxes: function(f, h) {
    var e = this,
      g = Ext.Array.from(e.config.series)[0],
      b, d, c, a;
    if (g.type === "radar" && f && f.length) {
      for (b = 0, d = f.length; b < d; b++) {
        c = f[b];
        if (c.position === "angular") {
          a = true;
          break
        }
      }
      if (!a) {
        f.push({
          type: "category",
          position: "angular",
          fields: g.xField || g.angleField,
          style: {
            estStepSize: 1
          },
          grid: true
        })
      }
    }
    return Ext.chart.AbstractChart.prototype.applyAxes.apply(this,
      arguments)
  },
  performLayout: function() {
    var F = this,
      g = true;
    try {
      F.animationSuspendCount++;
      if (Ext.chart.AbstractChart.prototype.performLayout.call(this) ===
        false) {
        g = false;
        return
      }
      F.suspendThicknessChanged();
      var h = F.getSurface("chart").getRect(),
        v = F.getInsetPadding(),
        G = F.getInnerPadding(),
        l = Ext.apply({}, v),
        d, s = h[2] - v.left - v.right,
        r = h[3] - v.top - v.bottom,
        x = [v.left, v.top, s, r],
        u = F.getSeries(),
        p, t = s - G * 2,
        w = r - G * 2,
        D = [t * 0.5 + G, w * 0.5 + G],
        j = Math.min(t, w) * 0.5,
        A = F.getAxes(),
        f, a, k, m = [],
        o = [],
        E = j - G,
        z, n, b, q, y, c, C;
      F.setMainRect(x);
      F.doSetSurfaceRect(F.getSurface(), x);
      for (z = 0, n = F.surfaceMap.grid && F.surfaceMap.grid.length; z <
        n; z++) {
        F.doSetSurfaceRect(F.surfaceMap.grid[z], h)
      }
      for (z = 0, n = A.length; z < n; z++) {
        f = A[z];
        switch (f.getPosition()) {
          case "angular":
            m.push(f);
            break;
          case "radial":
            o.push(f);
            break
        }
      }
      for (z = 0, n = m.length; z < n; z++) {
        f = m[z];
        q = f.getFloating();
        y = q ? q.value : null;
        F.doSetSurfaceRect(f.getSurface(), h);
        a = f.getThickness();
        for (d in l) {
          l[d] += a
        }
        s = h[2] - l.left - l.right;
        r = h[3] - l.top - l.bottom;
        b = Math.min(s, r) * 0.5;
        if (z === 0) {
          E = b - G
        }
        f.setMinimum(0);
        f.setLength(b);
        f.getSprites();
        k = f.sprites[0].attr.lineWidth * 0.5;
        for (d in l) {
          l[d] += k
        }
      }
      for (z = 0, n = o.length; z < n; z++) {
        f = o[z];
        F.doSetSurfaceRect(f.getSurface(), h);
        f.setMinimum(0);
        f.setLength(E);
        f.getSprites()
      }
      for (z = 0, n = u.length; z < n; z++) {
        p = u[z];
        if (p.type === "gauge" && !c) {
          c = p
        } else {
          p.setRadius(E)
        }
        F.doSetSurfaceRect(p.getSurface(), x)
      }
      F.doSetSurfaceRect(F.getSurface("overlay"), h);
      if (c) {
        c.setRect(x);
        C = c.getRadius() - G;
        F.setRadius(C);
        F.setCenter(c.getCenter());
        c.setRadius(C);
        if (A.length && A[0].getPosition() === "gauge") {
          f = A[0];
          F.doSetSurfaceRect(f.getSurface(), h);
          f.setTotalAngle(c.getTotalAngle());
          f.setLength(C)
        }
      } else {
        F.setRadius(j);
        F.setCenter(D)
      }
      F.redraw()
    } catch (B) {
      throw B
    } finally {
      F.animationSuspendCount--;
      if (g) {
        F.resumeThicknessChanged()
      }
    }
  },
  refloatAxes: function() {
    var j = this,
      g = j.getAxes(),
      h = j.getMainRect(),
      f, k, b, d, a, c, e;
    if (!h) {
      return
    }
    e = 0.5 * Math.min(h[2], h[3]);
    for (d = 0, a = g.length; d < a; d++) {
      c = g[d];
      f = c.getFloating();
      k = f ? f.value : null;
      if (k !== null) {
        b = j.getAxis(f.alongAxis);
        if (c.getPosition() === "angular") {
          if (b) {
            k = b.getLength() * k / b.getRange()[1]
          } else {
            k = 0.01 * k * e
          }
          c.sprites[0].setAttributes({
            length: k
          }, true)
        } else {
          if (b) {
            if (Ext.isString(k)) {
              k = b.getCoordFor(k)
            }
            k = k / (b.getRange()[1] + 1) * Math.PI * 2 - Math.PI * 1.5 +
              c.getRotation()
          } else {
            k = Ext.draw.Draw.rad(k)
          }
          c.sprites[0].setAttributes({
            baseRotation: k
          }, true)
        }
      }
    }
  },
  redraw: function() {
    var f = this,
      g = f.getAxes(),
      d, c = f.getSeries(),
      b, a, e;
    for (a = 0, e = g.length; a < e; a++) {
      d = g[a];
      d.getSprites()
    }
    for (a = 0, e = c.length; a < e; a++) {
      b = c[a];
      b.getSprites()
    }
    f.renderFrame();
    Ext.chart.AbstractChart.prototype.redraw.apply(this, arguments)
  },
  renderFrame: function() {
    this.refloatAxes();
    Ext.chart.AbstractChart.prototype.renderFrame.call(this)
  }
}, 0, ["polar"], ["component", "box", "container", "panel", "draw", "polar"], {
  component: true,
  box: true,
  container: true,
  panel: true,
  draw: true,
  polar: true
}, ["widget.polar"], 0, [Ext.chart, "PolarChart"], 0));
(Ext.cmd.derive("Ext.chart.axis.Category", Ext.chart.axis.Axis, {
  type: "category",
  config: {
    layout: "combineDuplicate",
    segmenter: "names"
  }
}, 0, 0, ["axis"], {
  axis: true
}, ["axis.category"], 0, [Ext.chart.axis, "Category"], 0));
(Ext.cmd.derive("Ext.chart.axis.Numeric", Ext.chart.axis.Axis, {
  type: "numeric",
  config: {
    layout: "continuous",
    segmenter: "numeric",
    aggregator: "double"
  }
}, 0, 0, ["axis"], {
  axis: true
}, ["axis.numeric", "axis.radial"], 0, [Ext.chart.axis, "Numeric"], 0));
(Ext.cmd.derive("Ext.chart.axis.Time", Ext.chart.axis.Numeric, {
  type: "time",
  config: {
    calculateByLabelSize: true,
    dateFormat: null,
    fromDate: null,
    toDate: null,
    step: [Ext.Date.DAY, 1],
    layout: "continuous",
    segmenter: "time",
    aggregator: "time"
  },
  updateDateFormat: function(a) {
    this.setRenderer(function(c, b) {
      return Ext.Date.format(new Date(b), a)
    })
  },
  updateFromDate: function(a) {
    this.setMinimum(+a)
  },
  updateToDate: function(a) {
    this.setMaximum(+a)
  },
  getCoordFor: function(a) {
    if (Ext.isString(a)) {
      a = new Date(a)
    }
    return +a
  }
}, 0, 0, ["axis"], {
  axis: true
}, ["axis.time"], 0, [Ext.chart.axis, "Time"], 0));
(Ext.cmd.derive("Ext.chart.interactions.ItemHighlight", Ext.chart.interactions.Abstract, {
  type: "itemhighlight",
  isItemHighlight: true,
  config: {
    gestures: {
      tap: "onTapGesture",
      mousemove: "onMouseMoveGesture",
      mousedown: "onMouseDownGesture",
      mouseup: "onMouseUpGesture",
      mouseleave: "onMouseUpGesture"
    },
    sticky: false
  },
  stickyHighlightItem: null,
  onMouseMoveGesture: function(g) {
    var d = this,
      h = d.tipItem,
      a = g.pointerType === "mouse",
      c, f, b;
    if (d.getSticky()) {
      return true
    }
    if (d.isDragging) {
      if (h && a) {
        h.series.hideTooltip(h);
        d.tipItem = null
      }
    } else {
      if (!d.stickyHighlightItem) {
        c = d.getItemForEvent(g);
        b = d.getChart();
        if (c !== b.getHighlightItem()) {
          d.highlight(c);
          d.sync()
        }
        if (a) {
          if (h && (!c || h.field !== c.field || h.record !== c.record)) {
            h.series.hideTooltip(h);
            d.tipItem = h = null
          }
          if (c && (f = c.series.getTooltip())) {
            if (f.trackMouse || !h) {
              c.series.showTooltip(c, g.getXY())
            }
            d.tipItem = c
          }
        }
        return false
      }
    }
  },
  highlight: function(a) {
    this.getChart().setHighlightItem(a)
  },
  showTooltip: function(b, a) {
    a.series.showTooltip(a, b.getXY());
    this.tipItem = a
  },
  onMouseDownGesture: function() {
    this.isDragging = true
  },
  onMouseUpGesture: function() {
    this.isDragging = false
  },
  onTapGesture: function(c) {
    var b = this;
    if (c.pointerType === "mouse" && !b.getSticky()) {
      return
    }
    var a = b.getItemForEvent(c);
    if (b.stickyHighlightItem && a && (b.stickyHighlightItem.index === a.index)) {
      a = null
    }
    b.stickyHighlightItem = a;
    b.highlight(a)
  }
}, 0, 0, ["interaction"], {
  interaction: true
}, ["interaction.itemhighlight"], 0, [Ext.chart.interactions,
  "ItemHighlight"
], 0));
(Ext.cmd.derive("Ext.chart.interactions.PanZoom", Ext.chart.interactions.Abstract, {
  type: "panzoom",
  config: {
    axes: {
      top: {},
      right: {},
      bottom: {},
      left: {}
    },
    minZoom: null,
    maxZoom: null,
    showOverflowArrows: true,
    panGesture: "drag",
    zoomGesture: "pinch",
    zoomOnPanGesture: false,
    modeToggleButton: {
      xtype: "segmentedbutton",
      width: 200,
      defaults: {
        ui: "default-toolbar"
      },
      cls: "x-panzoom-toggle",
      items: [{
        text: "Pan"
      }, {
        text: "Zoom"
      }]
    },
    hideLabelInGesture: false
  },
  stopAnimationBeforeSync: true,
  applyAxes: function(b, a) {
    return Ext.merge(a || {}, b)
  },
  applyZoomOnPanGesture: function(a) {
    this.getChart();
    if (this.isMultiTouch()) {
      return false
    }
    return a
  },
  updateZoomOnPanGesture: function(b) {
    var a = this.getModeToggleButton();
    if (!this.isMultiTouch()) {
      a.show();
      a.setValue(b ? 1 : 0)
    } else {
      a.hide()
    }
  },
  toggleMode: function() {
    var a = this;
    if (!a.isMultiTouch()) {
      a.setZoomOnPanGesture(!a.getZoomOnPanGesture())
    }
  },
  applyModeToggleButton: function(c, b) {
    var d = this,
      a = Ext.factory(c, "Ext.button.Segmented", b);
    if (!a && b) {
      b.destroy()
    }
    if (a && !b) {
      a.addListener("toggle", function(e) {
        d.setZoomOnPanGesture(e.getValue() === 1)
      })
    }
    return a
  },
  getGestures: function() {
    var c = this,
      e = {},
      d = c.getPanGesture(),
      b = c.getZoomGesture(),
      a = Ext.supports.Touch;
    e[b] = "onZoomGestureMove";
    e[b + "start"] = "onZoomGestureStart";
    e[b + "end"] = "onZoomGestureEnd";
    e[d] = "onPanGestureMove";
    e[d + "start"] = "onPanGestureStart";
    e[d + "end"] = "onPanGestureEnd";
    e.doubletap = "onDoubleTap";
    return e
  },
  onDoubleTap: function(h) {
    var f = this,
      c = f.getChart(),
      g = c.getAxes(),
      b, a, d;
    for (a = 0, d = g.length; a < d; a++) {
      b = g[a];
      b.setVisibleRange([0, 1])
    }
    c.redraw()
  },
  onPanGestureStart: function(d) {
    if (!d || !d.touches || d.touches.length < 2) {
      var b = this,
        a = b.getChart().getInnerRect(),
        c = b.getChart().element.getXY();
      b.startX = d.getX() - c[0] - a[0];
      b.startY = d.getY() - c[1] - a[1];
      b.oldVisibleRanges = null;
      b.hideLabels();
      b.getChart().suspendThicknessChanged();
      b.lockEvents(b.getPanGesture());
      return false
    }
  },
  onPanGestureMove: function(d) {
    var b = this;
    if (b.getLocks()[b.getPanGesture()] === b) {
      var a = b.getChart().getInnerRect(),
        c = b.getChart().element.getXY();
      if (b.getZoomOnPanGesture()) {
        b.transformAxesBy(b.getZoomableAxes(d), 0, 0, (d.getX() - c[0] -
          a[0]) / b.startX, b.startY / (d.getY() - c[1] - a[1]))
      } else {
        b.transformAxesBy(b.getPannableAxes(d), d.getX() - c[0] - a[0] -
          b.startX, d.getY() - c[1] - a[1] - b.startY, 1, 1)
      }
      b.sync();
      return false
    }
  },
  onPanGestureEnd: function(b) {
    var a = this,
      c = a.getPanGesture();
    if (a.getLocks()[c] === a) {
      a.getChart().resumeThicknessChanged();
      a.showLabels();
      a.sync();
      a.unlockEvents(c);
      return false
    }
  },
  onZoomGestureStart: function(b) {
    if (b.touches && b.touches.length === 2) {
      var c = this,
        i = c.getChart().element.getXY(),
        f = c.getChart().getInnerRect(),
        h = i[0] + f[0],
        d = i[1] + f[1],
        j = [b.touches[0].point.x - h, b.touches[0].point.y - d, b.touches[
          1].point.x - h, b.touches[1].point.y - d],
        g = Math.max(44, Math.abs(j[2] - j[0])),
        a = Math.max(44, Math.abs(j[3] - j[1]));
      c.getChart().suspendThicknessChanged();
      c.lastZoomDistances = [g, a];
      c.lastPoints = j;
      c.oldVisibleRanges = null;
      c.hideLabels();
      c.lockEvents(c.getZoomGesture());
      return false
    }
  },
  onZoomGestureMove: function(d) {
    var f = this;
    if (f.getLocks()[f.getZoomGesture()] === f) {
      var i = f.getChart().getInnerRect(),
        n = f.getChart().element.getXY(),
        k = n[0] + i[0],
        h = n[1] + i[1],
        o = Math.abs,
        c = f.lastPoints,
        m = [d.touches[0].point.x - k, d.touches[0].point.y - h, d.touches[
          1].point.x - k, d.touches[1].point.y - h],
        g = Math.max(44, o(m[2] - m[0])),
        b = Math.max(44, o(m[3] - m[1])),
        a = this.lastZoomDistances || [g, b],
        l = g / a[0],
        j = b / a[1];
      f.transformAxesBy(f.getZoomableAxes(d), i[2] * (l - 1) / 2 + m[2] -
        c[2] * l, i[3] * (j - 1) / 2 + m[3] - c[3] * j, l, j);
      f.sync();
      return false
    }
  },
  onZoomGestureEnd: function(c) {
    var b = this,
      a = b.getZoomGesture();
    if (b.getLocks()[a] === b) {
      b.getChart().resumeThicknessChanged();
      b.showLabels();
      b.sync();
      b.unlockEvents(a);
      return false
    }
  },
  hideLabels: function() {
    if (this.getHideLabelInGesture()) {
      this.eachInteractiveAxes(function(a) {
        a.hideLabels()
      })
    }
  },
  showLabels: function() {
    if (this.getHideLabelInGesture()) {
      this.eachInteractiveAxes(function(a) {
        a.showLabels()
      })
    }
  },
  isEventOnAxis: function(c, a) {
    var b = a.getSurface().getRect();
    return b[0] <= c.getX() && c.getX() <= b[0] + b[2] && b[1] <= c.getY() &&
      c.getY() <= b[1] + b[3]
  },
  getPannableAxes: function(d) {
    var h = this,
      a = h.getAxes(),
      f = h.getChart().getAxes(),
      c, g = f.length,
      k = [],
      j = false,
      b;
    if (d) {
      for (c = 0; c < g; c++) {
        if (this.isEventOnAxis(d, f[c])) {
          j = true;
          break
        }
      }
    }
    for (c = 0; c < g; c++) {
      b = a[f[c].getPosition()];
      if (b && b.allowPan !== false && (!j || this.isEventOnAxis(d, f[c]))) {
        k.push(f[c])
      }
    }
    return k
  },
  getZoomableAxes: function(f) {
    var j = this,
      a = j.getAxes(),
      g = j.getChart().getAxes(),
      l = [],
      d, h = g.length,
      c, k = false,
      b;
    if (f) {
      for (d = 0; d < h; d++) {
        if (this.isEventOnAxis(f, g[d])) {
          k = true;
          break
        }
      }
    }
    for (d = 0; d < h; d++) {
      c = g[d];
      b = a[c.getPosition()];
      if (b && b.allowZoom !== false && (!k || this.isEventOnAxis(f, c))) {
        l.push(c)
      }
    }
    return l
  },
  eachInteractiveAxes: function(c) {
    var d = this,
      b = d.getAxes(),
      e = d.getChart().getAxes();
    for (var a = 0; a < e.length; a++) {
      if (b[e[a].getPosition()]) {
        if (false === c.call(this, e[a])) {
          return
        }
      }
    }
  },
  transformAxesBy: function(d, j, g, h, e) {
    var f = this.getChart().getInnerRect(),
      a = this.getAxes(),
      k, b = this.oldVisibleRanges,
      l = false;
    if (!b) {
      this.oldVisibleRanges = b = {};
      this.eachInteractiveAxes(function(i) {
        b[i.getId()] = i.getVisibleRange()
      })
    }
    if (!f) {
      return
    }
    for (var c = 0; c < d.length; c++) {
      k = a[d[c].getPosition()];
      l = this.transformAxisBy(d[c], b[d[c].getId()], j, g, h, e, this.minZoom ||
        k.minZoom, this.maxZoom || k.maxZoom) || l
    }
    return l
  },
  transformAxisBy: function(c, o, r, q, k, i, h, m) {
    var s = this,
      b = o[1] - o[0],
      l = c.getVisibleRange(),
      g = h || s.getMinZoom() || c.config.minZoom,
      j = m || s.getMaxZoom() || c.config.maxZoom,
      a = s.getChart().getInnerRect(),
      f, p;
    if (!a) {
      return
    }
    var d = c.isSide(),
      e = d ? a[3] : a[2],
      n = d ? -q : r;
    b /= d ? i : k;
    if (b < 0) {
      b = -b
    }
    if (b * g > 1) {
      b = 1
    }
    if (b * j < 1) {
      b = 1 / j
    }
    f = o[0];
    p = o[1];
    l = l[1] - l[0];
    if (b === l && l === 1) {
      return
    }
    c.setVisibleRange([(o[0] + o[1] - b) * 0.5 - n / e * b, (o[0] + o[1] +
      b) * 0.5 - n / e * b]);
    return (Math.abs(f - c.getVisibleRange()[0]) > 1e-10 || Math.abs(p -
      c.getVisibleRange()[1]) > 1e-10)
  },
  destroy: function() {
    this.setModeToggleButton(null);
    Ext.chart.interactions.Abstract.prototype.destroy.call(this)
  }
}, 0, 0, ["interaction"], {
  interaction: true
}, ["interaction.panzoom"], 0, [Ext.chart.interactions, "PanZoom"], 0));
(Ext.cmd.derive("Ext.chart.interactions.Rotate", Ext.chart.interactions.Abstract, {
  type: "rotate",
  config: {
    gesture: "rotate",
    gestures: {
      rotate: "onRotate",
      rotateend: "onRotate",
      dragstart: "onGestureStart",
      drag: "onGesture",
      dragend: "onGestureEnd"
    },
    rotation: 0
  },
  oldRotations: null,
  getAngle: function(f) {
    var c = this,
      b = c.getChart(),
      d = b.getEventXY(f),
      a = b.getCenter();
    return Math.atan2(d[1] - a[1], d[0] - a[0])
  },
  getEventRadius: function(h) {
    var f = this,
      d = f.getChart(),
      g = d.getEventXY(h),
      a = d.getCenter(),
      c = g[0] - a[0],
      b = g[1] - a[1];
    return Math.sqrt(c * c + b * b)
  },
  onGestureStart: function(f) {
    var d = this,
      c = d.getChart(),
      b = c.getRadius(),
      a = d.getEventRadius(f);
    if (b >= a) {
      d.lockEvents("drag");
      d.angle = d.getAngle(f);
      d.oldRotations = {};
      return false
    }
  },
  onGesture: function(b) {
    var a = this,
      c = a.getAngle(b) - a.angle;
    if (a.getLocks().drag === a) {
      a.doRotateTo(c, true);
      return false
    }
  },
  doRotateTo: function(d, a, b) {
    var n = this,
      l = n.getChart(),
      k = l.getAxes(),
      f = l.getSeries(),
      m = n.oldRotations,
      c, j, g, e, h;
    if (!b) {
      l.suspendAnimation()
    }
    for (e = 0, h = k.length; e < h; e++) {
      c = k[e];
      g = m[c.getId()] || (m[c.getId()] = c.getRotation());
      c.setRotation(d + (a ? g : 0))
    }
    for (e = 0, h = f.length; e < h; e++) {
      j = f[e];
      g = m[j.getId()] || (m[j.getId()] = j.getRotation());
      j.setRotation(d + (a ? g : 0))
    }
    n.setRotation(d + (a ? g : 0));
    n.fireEvent("rotate", n, n.getRotation());
    n.sync();
    if (!b) {
      l.resumeAnimation()
    }
  },
  rotateTo: function(c, b, a) {
    this.doRotateTo(c, b, a);
    this.oldRotations = {}
  },
  onGestureEnd: function(b) {
    var a = this;
    if (a.getLocks().drag === a) {
      a.onGesture(b);
      a.unlockEvents("drag");
      a.fireEvent("rotationEnd", a, a.getRotation());
      return false
    }
  },
  onRotate: function(a) {}
}, 0, 0, ["interaction"], {
  interaction: true
}, ["interaction.rotate"], 0, [Ext.chart.interactions, "Rotate"], 0));
(Ext.cmd.derive("Ext.chart.series.Cartesian", Ext.chart.series.Series, {
  config: {
    xField: null,
    yField: null,
    xAxis: null,
    yAxis: null
  },
  directions: ["X", "Y"],
  fieldCategoryX: ["X"],
  fieldCategoryY: ["Y"],
  applyXAxis: function(a, b) {
    return this.getChart().getAxis(a) || b
  },
  applyYAxis: function(a, b) {
    return this.getChart().getAxis(a) || b
  },
  updateXAxis: function(a) {
    a.processData(this)
  },
  updateYAxis: function(a) {
    a.processData(this)
  },
  coordinateX: function() {
    return this.coordinate("X", 0, 2)
  },
  coordinateY: function() {
    return this.coordinate("Y", 1, 2)
  },
  getItemForPoint: function(a, g) {
    if (this.getSprites()) {
      var f = this,
        d = f.getSprites()[0],
        b = f.getStore(),
        e, c;
      if (f.getHidden()) {
        return null
      }
      if (d) {
        c = d.getIndexNearPoint(a, g);
        if (c !== -1) {
          e = {
            series: f,
            category: f.getItemInstancing() ? "items" : "markers",
            index: c,
            record: b.getData().items[c],
            field: f.getYField(),
            sprite: d
          };
          return e
        }
      }
    }
  },
  createSprite: function() {
    var c = this,
      a = Ext.chart.series.Series.prototype.createSprite.call(this),
      b = c.getChart(),
      d = c.getXAxis();
    a.setAttributes({
      flipXY: b.getFlipXY(),
      xAxis: d
    });
    if (a.setAggregator && d && d.getAggregator) {
      if (d.getAggregator) {
        a.setAggregator({
          strategy: d.getAggregator()
        })
      } else {
        a.setAggregator({})
      }
    }
    return a
  },
  getSprites: function() {
    var d = this,
      c = this.getChart(),
      e = d.getAnimation() || c && c.getAnimation(),
      b = d.getItemInstancing(),
      f = d.sprites,
      a;
    if (!c) {
      return []
    }
    if (!f.length) {
      a = d.createSprite()
    } else {
      a = f[0]
    }
    if (e) {
      if (b) {
        a.itemsMarker.getTemplate().fx.setConfig(e)
      }
      a.fx.setConfig(e)
    }
    return f
  },
  provideLegendInfo: function(d) {
    var b = this,
      a = b.getSubStyleWithTheme(),
      c = a.fillStyle;
    if (Ext.isArray(c)) {
      c = c[0]
    }
    d.push({
      name: b.getTitle() || b.getYField() || b.getId(),
      mark: (Ext.isObject(c) ? c.stops && c.stops[0].color : c) || a.strokeStyle ||
        "black",
      disabled: b.getHidden(),
      series: b.getId(),
      index: 0
    })
  },
  getXRange: function() {
    return [this.dataRange[0], this.dataRange[2]]
  },
  getYRange: function() {
    return [this.dataRange[1], this.dataRange[3]]
  }
}, 0, 0, 0, 0, 0, 0, [Ext.chart.series, "Cartesian"], 0));
(Ext.cmd.derive("Ext.chart.series.StackedCartesian", Ext.chart.series.Cartesian, {
  config: {
    stacked: true,
    splitStacks: true,
    fullStack: false,
    fullStackTotal: 100,
    hidden: []
  },
  spriteAnimationCount: 0,
  themeColorCount: function() {
    var b = this,
      a = b.getYField();
    return Ext.isArray(a) ? a.length : 1
  },
  updateStacked: function() {
    this.processData()
  },
  updateSplitStacks: function() {
    this.processData()
  },
  coordinateY: function() {
    return this.coordinateStacked("Y", 1, 2)
  },
  coordinateStacked: function(D, e, m) {
    var F = this,
      f = F.getStore(),
      r = f.getData().items,
      B = r.length,
      c = F["get" + D + "Axis"](),
      x = F.getHidden(),
      a = F.getSplitStacks(),
      z = F.getFullStack(),
      l = F.getFullStackTotal(),
      p = {
        min: 0,
        max: 0
      },
      n = F["fieldCategory" + D],
      C = [],
      o = [],
      E = [],
      h, A = F.getStacked(),
      g = F.getSprites(),
      q = [],
      w, v, u, s, H, y, b, d, G, t;
    if (!g.length) {
      return
    }
    for (w = 0; w < n.length; w++) {
      d = n[w];
      s = F.getFields([d]);
      H = s.length;
      for (v = 0; v < B; v++) {
        C[v] = 0;
        o[v] = 0;
        E[v] = 0
      }
      for (v = 0; v < H; v++) {
        if (!x[v]) {
          q[v] = F.coordinateData(r, s[v], c)
        }
      }
      if (A && z) {
        y = [];
        if (a) {
          b = []
        }
        for (v = 0; v < B; v++) {
          y[v] = 0;
          if (a) {
            b[v] = 0
          }
          for (u = 0; u < H; u++) {
            G = q[u];
            if (!G) {
              continue
            }
            G = G[v];
            if (G >= 0 || !a) {
              y[v] += G
            } else {
              if (G < 0) {
                b[v] += G
              }
            }
          }
        }
      }
      for (v = 0; v < H; v++) {
        t = {};
        if (x[v]) {
          t["dataStart" + d] = C;
          t["data" + d] = C;
          g[v].setAttributes(t);
          continue
        }
        G = q[v];
        if (A) {
          h = [];
          for (u = 0; u < B; u++) {
            if (!G[u]) {
              G[u] = 0
            }
            if (G[u] >= 0 || !a) {
              if (z && y[u]) {
                G[u] *= l / y[u]
              }
              C[u] = o[u];
              o[u] += G[u];
              h[u] = o[u]
            } else {
              if (z && b[u]) {
                G[u] *= l / b[u]
              }
              C[u] = E[u];
              E[u] += G[u];
              h[u] = E[u]
            }
          }
          t["dataStart" + d] = C;
          t["data" + d] = h;
          F.getRangeOfData(C, p);
          F.getRangeOfData(h, p)
        } else {
          t["dataStart" + d] = C;
          t["data" + d] = G;
          F.getRangeOfData(G, p)
        }
        g[v].setAttributes(t)
      }
    }
    F.dataRange[e] = p.min;
    F.dataRange[e + m] = p.max;
    t = {};
    t["dataMin" + D] = p.min;
    t["dataMax" + D] = p.max;
    for (w = 0; w < g.length; w++) {
      g[w].setAttributes(t)
    }
  },
  getFields: function(f) {
    var e = this,
      a = [],
      c, b, d;
    for (b = 0, d = f.length; b < d; b++) {
      c = e["get" + f[b] + "Field"]();
      if (Ext.isArray(c)) {
        a.push.apply(a, c)
      } else {
        a.push(c)
      }
    }
    return a
  },
  updateLabelOverflowPadding: function(a) {
    this.getLabel().setAttributes({
      labelOverflowPadding: a
    })
  },
  getSprites: function() {
    var k = this,
      j = k.getChart(),
      c = k.getAnimation() || j && j.getAnimation(),
      f = k.getFields(k.fieldCategoryY),
      b = k.getItemInstancing(),
      h = k.sprites,
      l, e = k.getHidden(),
      g = false,
      d, a = f.length;
    if (!j) {
      return []
    }
    for (d = 0; d < a; d++) {
      l = h[d];
      if (!l) {
        l = k.createSprite();
        l.setAttributes({
          zIndex: -d
        });
        l.setField(f[d]);
        g = true;
        e.push(false);
        if (b) {
          l.itemsMarker.getTemplate().setAttributes(k.getStyleByIndex(d))
        } else {
          l.setAttributes(k.getStyleByIndex(d))
        }
      }
      if (c) {
        if (b) {
          l.itemsMarker.getTemplate().fx.setConfig(c)
        }
        l.fx.setConfig(c)
      }
    }
    if (g) {
      k.updateHidden(e)
    }
    return h
  },
  getItemForPoint: function(k, j) {
    if (this.getSprites()) {
      var h = this,
        b, g, m, a = h.getItemInstancing(),
        f = h.getSprites(),
        l = h.getStore(),
        c = h.getHidden(),
        n, d, e;
      for (b = 0, g = f.length; b < g; b++) {
        if (!c[b]) {
          m = f[b];
          d = m.getIndexNearPoint(k, j);
          if (d !== -1) {
            e = h.getYField();
            n = {
              series: h,
              index: d,
              category: a ? "items" : "markers",
              record: l.getData().items[d],
              field: typeof e === "string" ? e : e[b],
              sprite: m
            };
            return n
          }
        }
      }
      return null
    }
  },
  provideLegendInfo: function(e) {
    var g = this,
      f = g.getSprites(),
      h = g.getTitle(),
      j = g.getYField(),
      d = g.getHidden(),
      k = f.length === 1,
      b, l, c, a;
    for (c = 0; c < f.length; c++) {
      b = g.getStyleByIndex(c);
      l = b.fillStyle;
      if (h) {
        if (Ext.isArray(h)) {
          a = h[c]
        } else {
          if (k) {
            a = h
          }
        }
      } else {
        if (Ext.isArray(j)) {
          a = j[c]
        } else {
          a = g.getId()
        }
      }
      e.push({
        name: a,
        mark: (Ext.isObject(l) ? l.stops && l.stops[0].color : l) ||
          b.strokeStyle || "black",
        disabled: d[c],
        series: g.getId(),
        index: c
      })
    }
  },
  onSpriteAnimationStart: function(a) {
    this.spriteAnimationCount++;
    if (this.spriteAnimationCount === 1) {
      this.fireEvent("animationstart")
    }
  },
  onSpriteAnimationEnd: function(a) {
    this.spriteAnimationCount--;
    if (this.spriteAnimationCount === 0) {
      this.fireEvent("animationend")
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.chart.series, "StackedCartesian"], 0));
(Ext.cmd.derive("Ext.chart.series.sprite.Series", Ext.draw.sprite.Sprite, {
  inheritableStatics: {
    def: {
      processors: {
        dataMinX: "number",
        dataMaxX: "number",
        dataMinY: "number",
        dataMaxY: "number",
        rangeX: "data",
        rangeY: "data",
        dataX: "data",
        dataY: "data"
      },
      defaults: {
        dataMinX: 0,
        dataMaxX: 1,
        dataMinY: 0,
        dataMaxY: 1,
        rangeX: null,
        rangeY: null,
        dataX: null,
        dataY: null
      },
      triggers: {
        dataX: "bbox",
        dataY: "bbox",
        dataMinX: "bbox",
        dataMaxX: "bbox",
        dataMinY: "bbox",
        dataMaxY: "bbox"
      }
    }
  },
  config: {
    store: null,
    series: null,
    field: null
  }
}, 0, 0, 0, 0, 0, [
  ["markerHolder", Ext.chart.MarkerHolder]
], [Ext.chart.series.sprite, "Series"], 0));
(Ext.cmd.derive("Ext.chart.series.sprite.Cartesian", Ext.chart.series.sprite.Series, {
  inheritableStatics: {
    def: {
      processors: {
        labels: "default",
        labelOverflowPadding: "number",
        selectionTolerance: "number",
        flipXY: "bool",
        renderer: "default",
        visibleMinX: "number",
        visibleMinY: "number",
        visibleMaxX: "number",
        visibleMaxY: "number",
        innerWidth: "number",
        innerHeight: "number"
      },
      defaults: {
        labels: null,
        labelOverflowPadding: 10,
        selectionTolerance: 20,
        flipXY: false,
        renderer: null,
        transformFillStroke: false,
        visibleMinX: 0,
        visibleMinY: 0,
        visibleMaxX: 1,
        visibleMaxY: 1,
        innerWidth: 1,
        innerHeight: 1
      },
      triggers: {
        dataX: "dataX,bbox",
        dataY: "dataY,bbox",
        visibleMinX: "panzoom",
        visibleMinY: "panzoom",
        visibleMaxX: "panzoom",
        visibleMaxY: "panzoom",
        innerWidth: "panzoom",
        innerHeight: "panzoom"
      },
      updaters: {
        dataX: function(a) {
          this.processDataX();
          this.scheduleUpdaters(a, {
            dataY: ["dataY"]
          })
        },
        dataY: function() {
          this.processDataY()
        },
        panzoom: function(c) {
          var e = c.visibleMaxX - c.visibleMinX,
            d = c.visibleMaxY - c.visibleMinY,
            b = c.flipXY ? c.innerHeight : c.innerWidth,
            g = !c.flipXY ? c.innerHeight : c.innerWidth,
            a = this.getSurface(),
            f = a ? a.getInherited().rtl : false;
          if (f && !c.flipXY) {
            c.translationX = b + c.visibleMinX * b / e
          } else {
            c.translationX = -c.visibleMinX * b / e
          }
          c.translationY = -c.visibleMinY * g / d;
          c.scalingX = (f && !c.flipXY ? -1 : 1) * b / e;
          c.scalingY = g / d;
          c.scalingCenterX = 0;
          c.scalingCenterY = 0;
          this.applyTransformations(true)
        }
      }
    }
  },
  processDataY: Ext.emptyFn,
  processDataX: Ext.emptyFn,
  updatePlainBBox: function(b) {
    var a = this.attr;
    b.x = a.dataMinX;
    b.y = a.dataMinY;
    b.width = a.dataMaxX - a.dataMinX;
    b.height = a.dataMaxY - a.dataMinY
  },
  binarySearch: function(d) {
    var b = this.attr.dataX,
      f = 0,
      a = b.length;
    if (d <= b[0]) {
      return f
    }
    if (d >= b[a - 1]) {
      return a - 1
    }
    while (f + 1 < a) {
      var c = (f + a) >> 1,
        e = b[c];
      if (e === d) {
        return c
      } else {
        if (e < d) {
          f = c
        } else {
          a = c
        }
      }
    }
    return f
  },
  render: function(b, c, g) {
    var f = this,
      a = f.attr,
      e = a.inverseMatrix.clone();
    e.appendMatrix(b.inverseMatrix);
    if (a.dataX === null || a.dataX === undefined) {
      return
    }
    if (a.dataY === null || a.dataY === undefined) {
      return
    }
    if (e.getXX() * e.getYX() || e.getXY() * e.getYY()) {
      console.log(
        "Cartesian Series sprite does not support rotation/sheering");
      return
    }
    var d = e.transformList([
      [g[0] - 1, g[3] + 1],
      [g[0] + g[2] + 1, -1]
    ]);
    d = d[0].concat(d[1]);
    f.renderClipped(b, c, d, g)
  },
  renderClipped: Ext.emptyFn,
  getIndexNearPoint: function(f, e) {
    var w = this,
      q = w.attr.matrix,
      h = w.attr.dataX,
      g = w.attr.dataY,
      k = w.attr.selectionTolerance,
      t, r, c = -1,
      j = q.clone().prependMatrix(w.surfaceMatrix).inverse(),
      u = j.transformPoint([f, e]),
      b = j.transformPoint([f - k, e - k]),
      n = j.transformPoint([f + k, e + k]),
      a = Math.min(b[0], n[0]),
      s = Math.max(b[0], n[0]),
      l = Math.min(b[1], n[1]),
      d = Math.max(b[1], n[1]),
      m, v, o, p;
    for (o = 0, p = h.length; o < p; o++) {
      m = h[o];
      v = g[o];
      if (m > a && m < s && v > l && v < d) {
        if (c === -1 || (Math.abs(m - u[0]) < t) && (Math.abs(v - u[1]) <
            r)) {
          t = Math.abs(m - u[0]);
          r = Math.abs(v - u[1]);
          c = o
        }
      }
    }
    return c
  }
}, 0, 0, 0, 0, 0, 0, [Ext.chart.series.sprite, "Cartesian"], 0));
(Ext.cmd.derive("Ext.chart.series.sprite.StackedCartesian", Ext.chart.series.sprite
  .Cartesian, {
    inheritableStatics: {
      def: {
        processors: {
          groupCount: "number",
          groupOffset: "number",
          dataStartY: "data"
        },
        defaults: {
          selectionTolerance: 20,
          groupCount: 1,
          groupOffset: 0,
          dataStartY: null
        },
        triggers: {
          dataStartY: "dataY,bbox"
        }
      }
    },
    getIndexNearPoint: function(e, d) {
      var o = this,
        q = o.attr.matrix,
        h = o.attr.dataX,
        f = o.attr.dataY,
        u = o.attr.dataStartY,
        l = o.attr.selectionTolerance,
        s = 0.5,
        r = Infinity,
        b = -1,
        k = q.clone().prependMatrix(this.surfaceMatrix).inverse(),
        t = k.transformPoint([e, d]),
        a = k.transformPoint([e - l, d - l]),
        n = k.transformPoint([e + l, d + l]),
        m = Math.min(a[1], n[1]),
        c = Math.max(a[1], n[1]),
        j, g;
      for (var p = 0; p < h.length; p++) {
        if (Math.min(u[p], f[p]) <= c && m <= Math.max(u[p], f[p])) {
          j = Math.abs(h[p] - t[0]);
          g = Math.max(-Math.min(f[p] - t[1], t[1] - u[p]), 0);
          if (j < s && g <= r) {
            s = j;
            r = g;
            b = p
          }
        }
      }
      return b
    }
  }, 0, 0, 0, 0, 0, 0, [Ext.chart.series.sprite, "StackedCartesian"], 0));
(Ext.cmd.derive("Ext.chart.series.sprite.Area", Ext.chart.series.sprite.StackedCartesian, {
    inheritableStatics: {
      def: {
        processors: {
          step: "bool"
        },
        defaults: {
          step: false
        }
      }
    },
    renderClipped: function(q, s, A) {
      var B = this,
        p = B.attr,
        l = p.dataX,
        j = p.dataY,
        C = p.dataStartY,
        t = p.matrix,
        h, g, v, f, d, z, w, e = t.elements[0],
        m = t.elements[4],
        o = t.elements[3],
        k = t.elements[5],
        c = B.surfaceMatrix,
        n = {},
        r = Math.min(A[0], A[2]),
        u = Math.max(A[0], A[2]),
        b = Math.max(0, this.binarySearch(r)),
        a = Math.min(l.length - 1, this.binarySearch(u) + 1);
      s.beginPath();
      z = l[b] * e + m;
      w = j[b] * o + k;
      s.moveTo(z, w);
      if (p.step) {
        d = w;
        for (v = b; v <= a; v++) {
          h = l[v] * e + m;
          g = j[v] * o + k;
          s.lineTo(h, d);
          s.lineTo(h, d = g)
        }
      } else {
        for (v = b; v <= a; v++) {
          h = l[v] * e + m;
          g = j[v] * o + k;
          s.lineTo(h, g)
        }
      }
      if (C) {
        if (p.step) {
          f = l[a] * e + m;
          for (v = a; v >= b; v--) {
            h = l[v] * e + m;
            g = C[v] * o + k;
            s.lineTo(f, g);
            s.lineTo(f = h, g)
          }
        } else {
          for (v = a; v >= b; v--) {
            h = l[v] * e + m;
            g = C[v] * o + k;
            s.lineTo(h, g)
          }
        }
      } else {
        s.lineTo(l[a] * e + m, g);
        s.lineTo(l[a] * e + m, k);
        s.lineTo(z, k);
        s.lineTo(z, j[v] * o + k)
      }
      if (p.transformFillStroke) {
        p.matrix.toContext(s)
      }
      s.fill();
      if (p.transformFillStroke) {
        p.inverseMatrix.toContext(s)
      }
      s.beginPath();
      s.moveTo(z, w);
      if (p.step) {
        for (v = b; v <= a; v++) {
          h = l[v] * e + m;
          g = j[v] * o + k;
          s.lineTo(h, d);
          s.lineTo(h, d = g);
          n.translationX = c.x(h, g);
          n.translationY = c.y(h, g);
          B.putMarker("markers", n, v, !p.renderer)
        }
      } else {
        for (v = b; v <= a; v++) {
          h = l[v] * e + m;
          g = j[v] * o + k;
          s.lineTo(h, g);
          n.translationX = c.x(h, g);
          n.translationY = c.y(h, g);
          B.putMarker("markers", n, v, !p.renderer)
        }
      }
      if (p.transformFillStroke) {
        p.matrix.toContext(s)
      }
      s.stroke()
    }
  }, 0, 0, 0, 0, ["sprite.areaSeries"], 0, [Ext.chart.series.sprite, "Area"],
  0));
(Ext.cmd.derive("Ext.chart.series.Area", Ext.chart.series.StackedCartesian, {
  type: "area",
  seriesType: "areaSeries",
  config: {
    splitStacks: false
  }
}, 0, 0, 0, 0, ["series.area"], 0, [Ext.chart.series, "Area"], 0));
(Ext.cmd.derive("Ext.draw.LimitedCache", Ext.Base, {
  config: {
    limit: 40,
    feeder: function() {
      return 0
    },
    scope: null
  },
  cache: null,
  constructor: function(a) {
    this.cache = {};
    this.cache.list = [];
    this.cache.tail = 0;
    this.initConfig(a)
  },
  get: function(e) {
    var c = this.cache,
      b = this.getLimit(),
      a = this.getFeeder(),
      d = this.getScope() || this;
    if (c[e]) {
      return c[e].value
    }
    if (c.list[c.tail]) {
      delete c[c.list[c.tail].cacheId]
    }
    c[e] = c.list[c.tail] = {
      value: a.apply(d, Array.prototype.slice.call(arguments, 1)),
      cacheId: e
    };
    c.tail++;
    if (c.tail === b) {
      c.tail = 0
    }
    return c[e].value
  },
  clear: function() {
    this.cache = {};
    this.cache.list = [];
    this.cache.tail = 0
  }
}, 1, 0, 0, 0, 0, 0, [Ext.draw, "LimitedCache"], 0));
(Ext.cmd.derive("Ext.draw.SegmentTree", Ext.Base, {
  config: {
    strategy: "double"
  },
  time: function(m, l, n, c, E, d, e) {
    var f = 0,
      o, A, s = new Date(n[m.startIdx[0]]),
      x = new Date(n[m.endIdx[l - 1]]),
      D = Ext.Date,
      u = [
        [D.MILLI, 1, "ms1", null],
        [D.MILLI, 2, "ms2", "ms1"],
        [D.MILLI, 5, "ms5", "ms1"],
        [D.MILLI, 10, "ms10", "ms5"],
        [D.MILLI, 50, "ms50", "ms10"],
        [D.MILLI, 100, "ms100", "ms50"],
        [D.MILLI, 500, "ms500", "ms100"],
        [D.SECOND, 1, "s1", "ms500"],
        [D.SECOND, 10, "s10", "s1"],
        [D.SECOND, 30, "s30", "s10"],
        [D.MINUTE, 1, "mi1", "s10"],
        [D.MINUTE, 5, "mi5", "mi1"],
        [D.MINUTE, 10, "mi10", "mi5"],
        [D.MINUTE, 30, "mi30", "mi10"],
        [D.HOUR, 1, "h1", "mi30"],
        [D.HOUR, 6, "h6", "h1"],
        [D.HOUR, 12, "h12", "h6"],
        [D.DAY, 1, "d1", "h12"],
        [D.DAY, 7, "d7", "d1"],
        [D.MONTH, 1, "mo1", "d1"],
        [D.MONTH, 3, "mo3", "mo1"],
        [D.MONTH, 6, "mo6", "mo3"],
        [D.YEAR, 1, "y1", "mo3"],
        [D.YEAR, 5, "y5", "y1"],
        [D.YEAR, 10, "y10", "y5"],
        [D.YEAR, 100, "y100", "y10"]
      ],
      z, b, k = f,
      F = l,
      j = false,
      r = m.startIdx,
      h = m.endIdx,
      w = m.minIdx,
      C = m.maxIdx,
      a = m.open,
      y = m.close,
      g = m.minX,
      q = m.minY,
      p = m.maxX,
      B = m.maxY,
      v, t;
    for (z = 0; l > f + 1 && z < u.length; z++) {
      s = new Date(n[r[0]]);
      b = u[z];
      s = D.align(s, b[0], b[1]);
      if (D.diff(s, x, b[0]) > n.length * 2 * b[1]) {
        continue
      }
      if (b[3] && m.map["time_" + b[3]]) {
        o = m.map["time_" + b[3]][0];
        A = m.map["time_" + b[3]][1]
      } else {
        o = k;
        A = F
      }
      f = l;
      t = s;
      j = true;
      r[l] = r[o];
      h[l] = h[o];
      w[l] = w[o];
      C[l] = C[o];
      a[l] = a[o];
      y[l] = y[o];
      g[l] = g[o];
      q[l] = q[o];
      p[l] = p[o];
      B[l] = B[o];
      t = Ext.Date.add(t, b[0], b[1]);
      for (v = o + 1; v < A; v++) {
        if (n[h[v]] < +t) {
          h[l] = h[v];
          y[l] = y[v];
          if (B[v] > B[l]) {
            B[l] = B[v];
            p[l] = p[v];
            C[l] = C[v]
          }
          if (q[v] < q[l]) {
            q[l] = q[v];
            g[l] = g[v];
            w[l] = w[v]
          }
        } else {
          l++;
          r[l] = r[v];
          h[l] = h[v];
          w[l] = w[v];
          C[l] = C[v];
          a[l] = a[v];
          y[l] = y[v];
          g[l] = g[v];
          q[l] = q[v];
          p[l] = p[v];
          B[l] = B[v];
          t = Ext.Date.add(t, b[0], b[1])
        }
      }
      if (l > f) {
        m.map["time_" + b[2]] = [f, l]
      }
    }
  },
  "double": function(h, u, j, a, t, b, c) {
    var e = 0,
      k, f = 1,
      n, d, v, g, s, l, m, r, q, p, o;
    while (u > e + 1) {
      k = e;
      e = u;
      f += f;
      for (n = k; n < e; n += 2) {
        if (n === e - 1) {
          d = h.startIdx[n];
          v = h.endIdx[n];
          g = h.minIdx[n];
          s = h.maxIdx[n];
          l = h.open[n];
          m = h.close[n];
          r = h.minX[n];
          q = h.minY[n];
          p = h.maxX[n];
          o = h.maxY[n]
        } else {
          d = h.startIdx[n];
          v = h.endIdx[n + 1];
          l = h.open[n];
          m = h.close[n];
          if (h.minY[n] <= h.minY[n + 1]) {
            g = h.minIdx[n];
            r = h.minX[n];
            q = h.minY[n]
          } else {
            g = h.minIdx[n + 1];
            r = h.minX[n + 1];
            q = h.minY[n + 1]
          }
          if (h.maxY[n] >= h.maxY[n + 1]) {
            s = h.maxIdx[n];
            p = h.maxX[n];
            o = h.maxY[n]
          } else {
            s = h.maxIdx[n + 1];
            p = h.maxX[n + 1];
            o = h.maxY[n + 1]
          }
        }
        h.startIdx[u] = d;
        h.endIdx[u] = v;
        h.minIdx[u] = g;
        h.maxIdx[u] = s;
        h.open[u] = l;
        h.close[u] = m;
        h.minX[u] = r;
        h.minY[u] = q;
        h.maxX[u] = p;
        h.maxY[u] = o;
        u++
      }
      h.map["double_" + f] = [e, u]
    }
  },
  none: Ext.emptyFn,
  aggregateData: function(h, a, r, c, d) {
    var b = h.length,
      e = [],
      s = [],
      f = [],
      q = [],
      j = [],
      p = [],
      n = [],
      o = [],
      m = [],
      k = [],
      g = {
        startIdx: e,
        endIdx: s,
        minIdx: f,
        maxIdx: q,
        open: j,
        minX: p,
        minY: n,
        maxX: o,
        maxY: m,
        close: k
      },
      l;
    for (l = 0; l < b; l++) {
      e[l] = l;
      s[l] = l;
      f[l] = l;
      q[l] = l;
      j[l] = a[l];
      p[l] = h[l];
      n[l] = c[l];
      o[l] = h[l];
      m[l] = r[l];
      k[l] = d[l]
    }
    g.map = {
      original: [0, b]
    };
    if (b) {
      this[this.getStrategy()](g, b, h, a, r, c, d)
    }
    return g
  },
  binarySearchMin: function(c, g, a, e) {
    var b = this.dataX;
    if (e <= b[c.startIdx[0]]) {
      return g
    }
    if (e >= b[c.startIdx[a - 1]]) {
      return a - 1
    }
    while (g + 1 < a) {
      var d = (g + a) >> 1,
        f = b[c.startIdx[d]];
      if (f === e) {
        return d
      } else {
        if (f < e) {
          g = d
        } else {
          a = d
        }
      }
    }
    return g
  },
  binarySearchMax: function(c, g, a, e) {
    var b = this.dataX;
    if (e <= b[c.endIdx[0]]) {
      return g
    }
    if (e >= b[c.endIdx[a - 1]]) {
      return a - 1
    }
    while (g + 1 < a) {
      var d = (g + a) >> 1,
        f = b[c.endIdx[d]];
      if (f === e) {
        return d
      } else {
        if (f < e) {
          g = d
        } else {
          a = d
        }
      }
    }
    return a
  },
  constructor: function(a) {
    this.initConfig(a)
  },
  setData: function(d, a, b, c, e) {
    if (!b) {
      e = c = b = a
    }
    this.dataX = d;
    this.dataOpen = a;
    this.dataHigh = b;
    this.dataLow = c;
    this.dataClose = e;
    if (d.length === b.length && d.length === c.length) {
      this.cache = this.aggregateData(d, a, b, c, e)
    }
  },
  getAggregation: function(d, k, i) {
    if (!this.cache) {
      return null
    }
    var c = Infinity,
      g = this.dataX[this.dataX.length - 1] - this.dataX[0],
      l = this.cache.map,
      m = l.original,
      a, e, j, b, f, h;
    for (a in l) {
      e = l[a];
      j = e[1] - e[0] - 1;
      b = g / j;
      if (i <= b && b < c) {
        m = e;
        c = b
      }
    }
    f = Math.max(this.binarySearchMin(this.cache, m[0], m[1], d), m[0]);
    h = Math.min(this.binarySearchMax(this.cache, m[0], m[1], k) + 1, m[1]);
    return {
      data: this.cache,
      start: f,
      end: h
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.draw, "SegmentTree"], 0));
(Ext.cmd.derive("Ext.chart.series.sprite.Aggregative", Ext.chart.series.sprite.Cartesian, {
  inheritableStatics: {
    def: {
      processors: {
        dataHigh: "data",
        dataLow: "data",
        dataClose: "data"
      },
      aliases: {
        dataOpen: "dataY"
      },
      defaults: {
        dataHigh: null,
        dataLow: null,
        dataClose: null
      }
    }
  },
  config: {
    aggregator: {}
  },
  applyAggregator: function(b, a) {
    return Ext.factory(b, Ext.draw.SegmentTree, a)
  },
  constructor: function() {
    Ext.chart.series.sprite.Cartesian.prototype.constructor.apply(this,
      arguments)
  },
  processDataY: function() {
    var d = this,
      b = d.attr,
      e = b.dataHigh,
      a = b.dataLow,
      f = b.dataClose,
      c = b.dataY;
    Ext.chart.series.sprite.Cartesian.prototype.processDataY.apply(this,
      arguments);
    if (b.dataX && c && c.length > 0) {
      if (e) {
        d.getAggregator().setData(b.dataX, b.dataY, e, a, f)
      } else {
        d.getAggregator().setData(b.dataX, b.dataY)
      }
    }
  },
  getGapWidth: function() {
    return 1
  },
  renderClipped: function(b, c, g, f) {
    var e = this,
      d = Math.min(g[0], g[2]),
      a = Math.max(g[0], g[2]),
      h = e.getAggregator() && e.getAggregator().getAggregation(d, a, (a -
        d) / f[2] * e.getGapWidth());
    if (h) {
      e.dataStart = h.data.startIdx[h.start];
      e.dataEnd = h.data.endIdx[h.end - 1];
      e.renderAggregates(h.data, h.start, h.end, b, c, g, f)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.chart.series.sprite, "Aggregative"], 0));
(Ext.cmd.derive("Ext.chart.series.sprite.CandleStick", Ext.chart.series.sprite.Aggregative, {
  inheritableStatics: {
    def: {
      processors: {
        raiseStyle: function(b, a) {
          return Ext.merge({}, a || {}, b)
        },
        dropStyle: function(b, a) {
          return Ext.merge({}, a || {}, b)
        },
        barWidth: "number",
        padding: "number",
        ohlcType: "enums(candlestick,ohlc)"
      },
      defaults: {
        raiseStyle: {
          strokeStyle: "green",
          fillStyle: "green"
        },
        dropStyle: {
          strokeStyle: "red",
          fillStyle: "red"
        },
        planar: false,
        barWidth: 15,
        padding: 3,
        lineJoin: "miter",
        miterLimit: 5,
        ohlcType: "candlestick"
      },
      triggers: {
        raiseStyle: "raiseStyle",
        dropStyle: "dropStyle"
      },
      updaters: {
        raiseStyle: function() {
          this.raiseTemplate && this.raiseTemplate.setAttributes(this.attr
            .raiseStyle)
        },
        dropStyle: function() {
          this.dropTemplate && this.dropTemplate.setAttributes(this.attr.dropStyle)
        }
      }
    }
  },
  candlestick: function(i, c, a, e, h, f, b) {
    var d = Math.min(c, h),
      g = Math.max(c, h);
    i.moveTo(f, e);
    i.lineTo(f, g);
    i.moveTo(f + b, g);
    i.lineTo(f + b, d);
    i.lineTo(f - b, d);
    i.lineTo(f - b, g);
    i.closePath();
    i.moveTo(f, a);
    i.lineTo(f, d)
  },
  ohlc: function(b, d, e, a, f, c, g) {
    b.moveTo(c, e);
    b.lineTo(c, a);
    b.moveTo(c, d);
    b.lineTo(c - g, d);
    b.moveTo(c, f);
    b.lineTo(c + g, f)
  },
  constructor: function() {
    Ext.chart.series.sprite.Aggregative.prototype.constructor.apply(this,
      arguments);
    this.raiseTemplate = new Ext.draw.sprite.Rect({
      parent: this
    });
    this.dropTemplate = new Ext.draw.sprite.Rect({
      parent: this
    })
  },
  getGapWidth: function() {
    var a = this.attr,
      b = a.barWidth,
      c = a.padding;
    return b + c
  },
  renderAggregates: function(d, c, b, t, u, z) {
    var D = this,
      s = this.attr,
      j = s.dataX,
      v = s.matrix,
      e = v.getXX(),
      r = v.getYY(),
      l = v.getDX(),
      h = v.getDY(),
      o = s.barWidth / e,
      C, k = s.ohlcType,
      f = Math.round(o * 0.5 * e),
      a = d.open,
      y = d.close,
      B = d.maxY,
      p = d.minY,
      q = d.startIdx,
      m, g, E, n, A, x, w = s.lineWidth * t.devicePixelRatio / 2;
    w -= Math.floor(w);
    u.save();
    C = this.raiseTemplate;
    C.useAttributes(u, z);
    u.beginPath();
    for (x = c; x < b; x++) {
      if (a[x] <= y[x]) {
        m = Math.round(a[x] * r + h) + w;
        g = Math.round(B[x] * r + h) + w;
        E = Math.round(p[x] * r + h) + w;
        n = Math.round(y[x] * r + h) + w;
        A = Math.round(j[q[x]] * e + l) + w;
        D[k](u, m, g, E, n, A, f)
      }
    }
    u.fillStroke(C.attr);
    u.restore();
    u.save();
    C = this.dropTemplate;
    C.useAttributes(u, z);
    u.beginPath();
    for (x = c; x < b; x++) {
      if (a[x] > y[x]) {
        m = Math.round(a[x] * r + h) + w;
        g = Math.round(B[x] * r + h) + w;
        E = Math.round(p[x] * r + h) + w;
        n = Math.round(y[x] * r + h) + w;
        A = Math.round(j[q[x]] * e + l) + w;
        D[k](u, m, g, E, n, A, f)
      }
    }
    u.fillStroke(C.attr);
    u.restore()
  }
}, 1, 0, 0, 0, ["sprite.candlestickSeries"], 0, [Ext.chart.series.sprite,
  "CandleStick"
], 0));
(Ext.cmd.derive("Ext.chart.series.CandleStick", Ext.chart.series.Cartesian, {
    type: "candlestick",
    seriesType: "candlestickSeries",
    config: {
      openField: null,
      highField: null,
      lowField: null,
      closeField: null
    },
    fieldCategoryY: ["Open", "High", "Low", "Close"],
    themeColorCount: function() {
      return 2
    }
  }, 0, 0, 0, 0, ["series.candlestick"], 0, [Ext.chart.series, "CandleStick"],
  0));
(Ext.cmd.derive("Ext.chart.series.Polar", Ext.chart.series.Series, {
  config: {
    rotation: 0,
    radius: null,
    center: [0, 0],
    offsetX: 0,
    offsetY: 0,
    showInLegend: true,
    xField: null,
    yField: null,
    angleField: null,
    radiusField: null,
    xAxis: null,
    yAxis: null
  },
  directions: ["X", "Y"],
  fieldCategoryX: ["X"],
  fieldCategoryY: ["Y"],
  deprecatedConfigs: {
    field: "angleField",
    lengthField: "radiusField"
  },
  constructor: function(b) {
    var c = this,
      a = c.getConfigurator(),
      e = a.configs,
      d;
    if (b) {
      for (d in c.deprecatedConfigs) {
        if (d in b && !(b in e)) {
          Ext.raise("'" + d +
            "' config has been deprecated. Please use the '" + c.deprecatedConfigs[
              d] + "' config instead.")
        }
      }
    }
    Ext.chart.series.Series.prototype.constructor.call(this, b)
  },
  getXField: function() {
    return this.getAngleField()
  },
  updateXField: function(a) {
    this.setAngleField(a)
  },
  getYField: function() {
    return this.getRadiusField()
  },
  updateYField: function(a) {
    this.setRadiusField(a)
  },
  applyXAxis: function(a, b) {
    return this.getChart().getAxis(a) || b
  },
  applyYAxis: function(a, b) {
    return this.getChart().getAxis(a) || b
  },
  getXRange: function() {
    return [this.dataRange[0], this.dataRange[2]]
  },
  getYRange: function() {
    return [this.dataRange[1], this.dataRange[3]]
  },
  themeColorCount: function() {
    var c = this,
      a = c.getStore(),
      b = a && a.getCount() || 0;
    return b
  },
  getDefaultSpriteConfig: function() {
    return {
      type: this.seriesType,
      renderer: this.getRenderer(),
      centerX: 0,
      centerY: 0,
      rotationCenterX: 0,
      rotationCenterY: 0
    }
  },
  applyRotation: function(a) {
    return Ext.draw.sprite.AttributeParser.angle(a)
  },
  updateRotation: function(a) {
    var b = this.getSprites();
    if (b && b[0]) {
      b[0].setAttributes({
        baseRotation: a
      })
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.chart.series, "Polar"], 0));
(Ext.cmd.derive("Ext.chart.series.sprite.Line", Ext.chart.series.sprite.Aggregative, {
    inheritableStatics: {
      def: {
        processors: {
          smooth: "bool",
          fillArea: "bool",
          step: "bool",
          preciseStroke: "bool",
          xAxis: "default",
          yCap: "default"
        },
        defaults: {
          smooth: false,
          fillArea: false,
          step: false,
          preciseStroke: true,
          xAxis: null,
          yCap: Math.pow(2, 20),
          yJump: 50
        },
        triggers: {
          dataX: "dataX,bbox,smooth",
          dataY: "dataY,bbox,smooth",
          smooth: "smooth"
        },
        updaters: {
          smooth: function(a) {
            var c = a.dataX,
              b = a.dataY;
            if (a.smooth && c && b && c.length > 2 && b.length > 2) {
              this.smoothX = Ext.draw.Draw.spline(c);
              this.smoothY = Ext.draw.Draw.spline(b)
            } else {
              delete this.smoothX;
              delete this.smoothY
            }
          }
        }
      }
    },
    list: null,
    updatePlainBBox: function(d) {
      var b = this.attr,
        c = Math.min(0, b.dataMinY),
        a = Math.max(0, b.dataMaxY);
      d.x = b.dataMinX;
      d.y = c;
      d.width = b.dataMaxX - b.dataMinX;
      d.height = a - c
    },
    drawStrip: function(a, c) {
      a.moveTo(c[0], c[1]);
      for (var b = 2, d = c.length; b < d; b += 2) {
        a.lineTo(c[b], c[b + 1])
      }
    },
    drawStraightStroke: function(p, q, e, d, u, h) {
      var w = this,
        o = w.attr,
        n = o.renderer,
        g = o.step,
        a = true,
        l = {
          type: "line",
          smooth: false,
          step: g
        },
        m = [],
        l, z, v, f, k, j, t, c, s, b, r;
      for (r = 3; r < u.length; r += 3) {
        t = u[r - 3];
        c = u[r - 2];
        k = u[r];
        j = u[r + 1];
        s = u[r + 3];
        b = u[r + 4];
        if (n) {
          l.x = k;
          l.y = j;
          l.x0 = t;
          l.y0 = c;
          v = [w, l, w.rendererData, e + r / 3];
          z = Ext.callback(n, null, v, 0, w.getSeries())
        }
        if (Ext.isNumber(k + j + t + c)) {
          if (a) {
            q.beginPath();
            q.moveTo(t, c);
            m.push(t, c);
            f = t;
            a = false
          }
        } else {
          continue
        }
        if (g) {
          q.lineTo(k, c);
          m.push(k, c)
        }
        q.lineTo(k, j);
        m.push(k, j);
        if (z || !(Ext.isNumber(s + b))) {
          q.save();
          Ext.apply(q, z);
          if (o.fillArea) {
            q.lineTo(k, h);
            q.lineTo(f, h);
            q.closePath();
            q.fill()
          }
          q.beginPath();
          w.drawStrip(q, m);
          m = [];
          q.stroke();
          q.restore();
          q.beginPath();
          a = true
        }
      }
    },
    calculateScale: function(c, a) {
      var b = 0,
        d = c;
      while (d < a && c > 0) {
        b++;
        d += c >> b
      }
      return Math.pow(2, b > 0 ? b - 1 : b)
    },
    drawSmoothStroke: function(u, v, c, b, C, f) {
      var G = this,
        t = G.attr,
        d = t.step,
        z = t.matrix,
        s = t.renderer,
        e = z.getXX(),
        p = z.getYY(),
        m = z.getDX(),
        k = z.getDY(),
        r = G.smoothX,
        q = G.smoothY,
        I = G.calculateScale(t.dataX.length, b),
        o, F, n, E, h, g, B, a, A, w, H, D, l = {
          type: "line",
          smooth: true,
          step: d
        };
      v.beginPath();
      v.moveTo(r[c * 3] * e + m, q[c * 3] * p + k);
      for (A = 0, w = c * 3 + 1; A < C.length - 3; A += 3, w += 3 * I) {
        o = r[w] * e + m;
        F = q[w] * p + k;
        n = r[w + 1] * e + m;
        E = q[w + 1] * p + k;
        h = u.roundPixel(C[A + 3]);
        g = C[A + 4];
        B = u.roundPixel(C[A]);
        a = C[A + 1];
        if (s) {
          l.x0 = B;
          l.y0 = a;
          l.cx1 = o;
          l.cy1 = F;
          l.cx2 = n;
          l.cy2 = E;
          l.x = h;
          l.y = g;
          D = [G, l, G.rendererData, c + A / 3 + 1];
          H = Ext.callback(s, null, D, 0, G.getSeries());
          v.save();
          Ext.apply(v, H)
        }
        if (t.fillArea) {
          v.moveTo(B, a);
          v.bezierCurveTo(o, F, n, E, h, g);
          v.lineTo(h, f);
          v.lineTo(B, f);
          v.lineTo(B, a);
          v.closePath();
          v.fill();
          v.beginPath()
        }
        v.moveTo(B, a);
        v.bezierCurveTo(o, F, n, E, h, g);
        v.stroke();
        v.moveTo(B, a);
        v.closePath();
        if (s) {
          v.restore()
        }
        v.beginPath();
        v.moveTo(h, g)
      }
      v.beginPath()
    },
    drawLabel: function(k, i, h, o, a) {
      var q = this,
        n = q.attr,
        e = q.getMarker("labels"),
        d = e.getTemplate(),
        m = q.labelCfg || (q.labelCfg = {}),
        c = q.surfaceMatrix,
        g, f, j = n.labelOverflowPadding,
        l, b, r, p, s;
      m.x = c.x(i, h);
      m.y = c.y(i, h);
      if (n.flipXY) {
        m.rotationRads = Math.PI * 0.5
      } else {
        m.rotationRads = 0
      }
      m.text = k;
      if (d.attr.renderer) {
        p = [k, e, m, q.rendererData, o];
        r = Ext.callback(d.attr.renderer, null, p, 0, q.getSeries());
        if (typeof r === "string") {
          m.text = r
        } else {
          if (typeof r === "object") {
            if ("text" in r) {
              m.text = r.text
            }
            s = true
          }
        }
      }
      b = q.getMarkerBBox("labels", o, true);
      if (!b) {
        q.putMarker("labels", m, o);
        b = q.getMarkerBBox("labels", o, true)
      }
      l = b.height / 2;
      g = i;
      switch (d.attr.display) {
        case "under":
          f = h - l - j;
          break;
        case "rotate":
          g += j;
          f = h - j;
          m.rotationRads = -Math.PI / 4;
          break;
        default:
          f = h + l + j
      }
      m.x = c.x(g, f);
      m.y = c.y(g, f);
      if (s) {
        Ext.apply(m, r)
      }
      q.putMarker("labels", m, o)
    },
    drawMarker: function(j, h, d) {
      var g = this,
        e = g.attr,
        f = e.renderer,
        c = g.surfaceMatrix,
        b = {},
        i, a;
      if (f && g.getMarker("markers")) {
        b.type = "marker";
        b.x = j;
        b.y = h;
        a = [g, b, g.rendererData, d];
        i = Ext.callback(f, null, a, 0, g.getSeries());
        if (i) {
          Ext.apply(b, i)
        }
      }
      b.translationX = c.x(j, h);
      b.translationY = c.y(j, h);
      delete b.x;
      delete b.y;
      g.putMarker("markers", b, d, !f)
    },
    drawStroke: function(a, c, h, b, f, e) {
      var d = this,
        g = d.attr.smooth && d.smoothX && d.smoothY;
      if (g) {
        d.drawSmoothStroke(a, c, h, b, f, e)
      } else {
        d.drawStraightStroke(a, c, h, b, f, e)
      }
    },
    renderAggregates: function(B, w, l, N, o, I, D) {
      var m = this,
        k = m.attr,
        s = k.dataX,
        r = k.dataY,
        h = k.labels,
        v = k.xAxis,
        a = k.yCap,
        g = k.smooth && m.smoothX && m.smoothY,
        d = h && m.getMarker("labels"),
        t = m.getMarker("markers"),
        E = k.matrix,
        u = N.devicePixelRatio,
        C = E.getXX(),
        f = E.getYY(),
        c = E.getDX(),
        b = E.getDY(),
        q = m.list || (m.list = []),
        F = B.minX,
        e = B.maxX,
        j = B.minY,
        P = B.maxY,
        U = B.startIdx,
        S = true,
        Q, T, L, K, R, G;
      m.rendererData = {
        store: m.getStore()
      };
      q.length = 0;
      for (R = w; R < l; R++) {
        var O = F[R],
          p = e[R],
          M = j[R],
          n = P[R];
        if (O < p) {
          q.push(O * C + c, M * f + b, U[R]);
          q.push(p * C + c, n * f + b, U[R])
        } else {
          if (O > p) {
            q.push(p * C + c, n * f + b, U[R]);
            q.push(O * C + c, M * f + b, U[R])
          } else {
            q.push(p * C + c, n * f + b, U[R])
          }
        }
      }
      if (q.length) {
        for (R = 0; R < q.length; R += 3) {
          L = q[R];
          K = q[R + 1];
          if (Ext.isNumber(L + K)) {
            if (K > a) {
              K = a
            } else {
              if (K < -a) {
                K = -a
              }
            }
            q[R + 1] = K
          } else {
            S = false;
            continue
          }
          G = q[R + 2];
          if (t) {
            m.drawMarker(L, K, G)
          }
          if (d && h[G]) {
            m.drawLabel(h[G], L, K, G, D)
          }
        }
        m.isContinuousLine = S;
        if (g && !S) {
          Ext.raise(
            "Line smoothing in only supported for gapless data, where all data points are finite numbers."
          )
        }
        if (v) {
          T = v.getAlignment() === "vertical";
          if (Ext.isNumber(v.floatingAtCoord)) {
            Q = (T ? D[2] : D[3]) - v.floatingAtCoord
          } else {
            Q = T ? D[0] : D[1]
          }
        } else {
          Q = k.flipXY ? D[0] : D[1]
        }
        if (k.preciseStroke) {
          if (k.fillArea) {
            o.fill()
          }
          if (k.transformFillStroke) {
            k.inverseMatrix.toContext(o)
          }
          m.drawStroke(N, o, w, l, q, Q);
          if (k.transformFillStroke) {
            k.matrix.toContext(o)
          }
          o.stroke()
        } else {
          m.drawStroke(N, o, w, l, q, Q);
          if (S && g && k.fillArea && !k.renderer) {
            var A = s[s.length - 1] * C + c + u,
              z = r[r.length - 1] * f + b,
              J = s[0] * C + c - u,
              H = r[0] * f + b;
            o.lineTo(A, z);
            o.lineTo(A, Q - k.lineWidth);
            o.lineTo(J, Q - k.lineWidth);
            o.lineTo(J, H)
          }
          if (k.transformFillStroke) {
            k.matrix.toContext(o)
          }
          if (k.fillArea) {
            o.fillStroke(k, true)
          } else {
            o.stroke(true)
          }
        }
      }
    }
  }, 0, 0, 0, 0, ["sprite.lineSeries"], 0, [Ext.chart.series.sprite, "Line"],
  0));
(Ext.cmd.derive("Ext.chart.series.Line", Ext.chart.series.Cartesian, {
  type: "line",
  seriesType: "lineSeries",
  config: {
    selectionTolerance: 20,
    smooth: false,
    step: false,
    fill: undefined,
    aggregator: {
      strategy: "double"
    }
  },
  defaultSmoothness: 3,
  overflowBuffer: 1,
  themeMarkerCount: function() {
    return 1
  },
  getDefaultSpriteConfig: function() {
    var d = this,
      e = Ext.chart.series.Cartesian.prototype.getDefaultSpriteConfig.apply(
        this, arguments),
      c = Ext.apply({}, d.getStyle()),
      b, a = false;
    if (typeof d.config.fill != "undefined") {
      if (d.config.fill) {
        a = true;
        if (typeof c.fillStyle == "undefined") {
          if (typeof c.strokeStyle == "undefined") {
            b = d.getStyleWithTheme();
            c.fillStyle = b.fillStyle;
            c.strokeStyle = b.strokeStyle
          } else {
            c.fillStyle = c.strokeStyle
          }
        }
      }
    } else {
      if (c.fillStyle) {
        a = true
      }
    }
    if (!a) {
      delete c.fillStyle
    }
    c = Ext.apply(e || {}, c);
    return Ext.apply(c, {
      fillArea: a,
      step: d.config.step,
      smooth: d.config.smooth,
      selectionTolerance: d.config.selectionTolerance
    })
  },
  updateStep: function(b) {
    var a = this.getSprites()[0];
    if (a && a.attr.step !== b) {
      a.setAttributes({
        step: b
      })
    }
  },
  updateFill: function(b) {
    var a = this.getSprites()[0];
    if (a && a.attr.fillArea !== b) {
      a.setAttributes({
        fillArea: b
      })
    }
  },
  updateSmooth: function(a) {
    var b = this.getSprites()[0];
    if (b && b.attr.smooth !== a) {
      b.setAttributes({
        smooth: a
      })
    }
  }
}, 0, 0, 0, 0, ["series.line"], 0, [Ext.chart.series, "Line"], 0));
(Ext.cmd.derive("Ext.chart.series.sprite.PieSlice", Ext.draw.sprite.Sector, {
  inheritableStatics: {
    def: {
      processors: {
        doCallout: "bool",
        label: "string",
        rotateLabels: "bool",
        labelOverflowPadding: "number",
        renderer: "default"
      },
      defaults: {
        doCallout: true,
        rotateLabels: true,
        label: "",
        labelOverflowPadding: 10,
        renderer: null
      }
    }
  },
  config: {
    rendererData: null,
    rendererIndex: 0,
    series: null
  },
  setGradientBBox: function(q, k) {
    var j = this,
      i = j.attr,
      g = (i.fillStyle && i.fillStyle.isGradient) || (i.strokeStyle && i.strokeStyle
        .isGradient);
    if (g && !i.constrainGradients) {
      var b = j.getMidAngle(),
        d = i.margin,
        e = i.centerX,
        c = i.centerY,
        a = i.endRho,
        l = i.matrix,
        o = l.getScaleX(),
        n = l.getScaleY(),
        m = o * a,
        f = n * a,
        p = {
          width: m + m,
          height: f + f
        };
      if (d) {
        e += d * Math.cos(b);
        c += d * Math.sin(b)
      }
      p.x = l.x(e, c) - m;
      p.y = l.y(e, c) - f;
      q.setGradientBBox(p)
    } else {
      Ext.draw.sprite.Sector.prototype.setGradientBBox.call(this, q, k)
    }
  },
  render: function(b, c, g, f) {
    var e = this,
      a = e.attr,
      h = {},
      d;
    if (a.renderer) {
      h = {
        type: "sector",
        text: a.text,
        centerX: a.centerX,
        centerY: a.centerY,
        margin: a.margin,
        startAngle: Math.min(a.startAngle, a.endAngle),
        endAngle: Math.max(a.startAngle, a.endAngle),
        startRho: Math.min(a.startRho, a.endRho),
        endRho: Math.max(a.startRho, a.endRho)
      };
      d = Ext.callback(a.renderer, null, [e, h, e.rendererData, e.rendererIndex],
        0, e.getSeries());
      e.setAttributes(d);
      e.useAttributes(c, g)
    }
    Ext.draw.sprite.Sector.prototype.render.call(this, b, c, g, f);
    if (a.label && e.getMarker("labels")) {
      e.placeLabel()
    }
  },
  placeLabel: function() {
    var z = this,
      s = z.attr,
      r = s.attributeId,
      t = Math.min(s.startAngle, s.endAngle),
      p = Math.max(s.startAngle, s.endAngle),
      k = (t + p) * 0.5,
      n = s.margin,
      h = s.centerX,
      g = s.centerY,
      f = Math.sin(k),
      c = Math.cos(k),
      v = Math.min(s.startRho, s.endRho) + n,
      m = Math.max(s.startRho, s.endRho) + n,
      l = (v + m) * 0.5,
      b = z.surfaceMatrix,
      o = z.labelCfg || (z.labelCfg = {}),
      e = z.getMarker("labels"),
      d = e.getTemplate(),
      a = d.getCalloutLine(),
      q = a && a.length || 40,
      u, j, i, A, w;
    b.appendMatrix(s.matrix);
    o.text = s.label;
    j = h + c * l;
    i = g + f * l;
    o.x = b.x(j, i);
    o.y = b.y(j, i);
    j = h + c * m;
    i = g + f * m;
    o.calloutStartX = b.x(j, i);
    o.calloutStartY = b.y(j, i);
    j = h + c * (m + q);
    i = g + f * (m + q);
    o.calloutPlaceX = b.x(j, i);
    o.calloutPlaceY = b.y(j, i);
    if (!s.rotateLabels) {
      o.rotationRads = 0
    } else {
      switch (d.attr.orientation) {
        case "horizontal":
          o.rotationRads = k + Math.atan2(b.y(1, 0) - b.y(0, 0), b.x(1, 0) -
            b.x(0, 0)) + Math.PI / 2;
          break;
        case "vertical":
          o.rotationRads = k + Math.atan2(b.y(1, 0) - b.y(0, 0), b.x(1, 0) -
            b.x(0, 0));
          break
      }
    }
    o.calloutColor = (a && a.color) || z.attr.fillStyle;
    if (a) {
      if (a.width) {
        o.calloutWidth = a.width
      }
    } else {
      o.calloutHasLine = false
    }
    o.globalAlpha = s.globalAlpha * s.fillOpacity;
    o.hidden = (s.startAngle == s.endAngle);
    if (d.attr.renderer) {
      w = [z.attr.label, e, o, z.rendererData, z.rendererIndex];
      A = Ext.callback(d.attr.renderer, null, w, 0, z.getSeries());
      if (typeof A === "string") {
        o.text = A
      } else {
        Ext.apply(o, A)
      }
    }
    z.putMarker("labels", o, r);
    u = z.getMarkerBBox("labels", r, true);
    if (u) {
      if (s.doCallout) {
        if (d.attr.display === "outside") {
          z.putMarker("labels", {
            callout: 1
          }, r)
        } else {
          if (d.attr.display === "inside") {
            z.putMarker("labels", {
              callout: 0
            }, r)
          } else {
            z.putMarker("labels", {
              callout: 1 - z.sliceContainsLabel(s, u)
            }, r)
          }
        }
      } else {
        z.putMarker("labels", {
          globalAlpha: z.sliceContainsLabel(s, u)
        }, r)
      }
    }
  },
  sliceContainsLabel: function(d, f) {
    var e = d.labelOverflowPadding,
      h = (d.endRho + d.startRho) / 2,
      g = h + (f.width + e) / 2,
      i = h - (f.width + e) / 2,
      j, c, b, a;
    if (e < 0) {
      return 1
    }
    if (f.width + e * 2 > (d.endRho - d.startRho)) {
      return 0
    }
    c = Math.sqrt(d.endRho * d.endRho - g * g);
    b = Math.sqrt(d.endRho * d.endRho - i * i);
    j = Math.abs(d.endAngle - d.startAngle);
    a = (j > Math.PI / 2 ? i : Math.abs(Math.tan(j / 2)) * i);
    if (f.height + e * 2 > Math.min(c, b, a) * 2) {
      return 0
    }
    return 1
  }
}, 0, 0, 0, 0, ["sprite.pieslice"], [
  ["markerHolder", Ext.chart.MarkerHolder]
], [Ext.chart.series.sprite, "PieSlice"], 0));
(Ext.cmd.derive("Ext.chart.series.Pie", Ext.chart.series.Polar, {
  type: "pie",
  seriesType: "pieslice",
  config: {
    radiusField: false,
    donut: 0,
    rotation: 0,
    clockwise: true,
    totalAngle: 2 * Math.PI,
    hidden: [],
    radiusFactor: 100,
    highlightCfg: {
      margin: 20
    },
    style: {}
  },
  directions: ["X"],
  applyLabel: function(a, b) {
    if (Ext.isObject(a) && !Ext.isString(a.orientation)) {
      Ext.apply(a = Ext.Object.chain(a), {
        orientation: "vertical"
      })
    }
    return Ext.chart.series.Polar.prototype.applyLabel.call(this, a, b)
  },
  updateLabelData: function() {
    var h = this,
      j = h.getStore(),
      g = j.getData().items,
      e = h.getSprites(),
      a = h.getLabel().getTemplate().getField(),
      d = h.getHidden(),
      b, f, c, k;
    if (e.length && a) {
      c = [];
      for (b = 0, f = g.length; b < f; b++) {
        c.push(g[b].get(a))
      }
      for (b = 0, f = e.length; b < f; b++) {
        k = e[b];
        k.setAttributes({
          label: c[b]
        });
        k.putMarker("labels", {
          hidden: d[b]
        }, k.attr.attributeId)
      }
    }
  },
  coordinateX: function() {
    var s = this,
      f = s.getStore(),
      p = f.getData().items,
      c = p.length,
      b = s.getXField(),
      e = s.getYField(),
      l, a = 0,
      m, k, r = 0,
      n = s.getHidden(),
      d = [],
      o, g = 0,
      h = s.getTotalAngle(),
      q = s.getClockwise() ? 1 : -1,
      j = s.getSprites();
    if (!j) {
      return
    }
    for (o = 0; o < c; o++) {
      l = Math.abs(Number(p[o].get(b))) || 0;
      k = e && Math.abs(Number(p[o].get(e))) || 0;
      if (!n[o]) {
        a += l;
        if (k > r) {
          r = k
        }
      }
      d[o] = a;
      if (o >= n.length) {
        n[o] = false
      }
    }
    n.length = c;
    s.maxY = r;
    if (a !== 0) {
      m = h / a
    }
    for (o = 0; o < c; o++) {
      j[o].setAttributes({
        startAngle: g,
        endAngle: g = (m ? q * d[o] * m : 0),
        globalAlpha: 1
      })
    }
    if (c < s.sprites.length) {
      for (o = c; o < s.sprites.length; o++) {
        s.sprites[o].destroy()
      }
      s.sprites.length = c
    }
    for (o = c; o < s.sprites.length; o++) {
      j[o].setAttributes({
        startAngle: h,
        endAngle: h,
        globalAlpha: 0
      })
    }
    s.getChart().refreshLegendStore()
  },
  updateCenter: function(a) {
    this.setStyle({
      translationX: a[0] + this.getOffsetX(),
      translationY: a[1] + this.getOffsetY()
    });
    this.doUpdateStyles()
  },
  updateRadius: function(a) {
    this.setStyle({
      startRho: a * this.getDonut() * 0.01,
      endRho: a * this.getRadiusFactor() * 0.01
    });
    this.doUpdateStyles()
  },
  getStyleByIndex: function(c) {
    var g = this,
      j = g.getStore(),
      k = j.getAt(c),
      f = g.getYField(),
      d = g.getRadius(),
      a = {},
      e, b, h;
    if (k) {
      h = f && Math.abs(Number(k.get(f))) || 0;
      e = d * g.getDonut() * 0.01;
      b = d * g.getRadiusFactor() * 0.01;
      a = Ext.chart.series.Polar.prototype.getStyleByIndex.call(this, c);
      a.startRho = e;
      a.endRho = g.maxY ? (e + (b - e) * h / g.maxY) : b
    }
    return a
  },
  updateDonut: function(b) {
    var a = this.getRadius();
    this.setStyle({
      startRho: a * b * 0.01,
      endRho: a * this.getRadiusFactor() * 0.01
    });
    this.doUpdateStyles()
  },
  rotationOffset: -Math.PI / 2,
  updateRotation: function(a) {
    this.setStyle({
      rotationRads: a + this.rotationOffset
    });
    this.doUpdateStyles()
  },
  updateTotalAngle: function(a) {
    this.processData()
  },
  getSprites: function() {
    var k = this,
      h = k.getChart(),
      n = k.getStore();
    if (!h || !n) {
      return []
    }
    k.getColors();
    k.getSubStyle();
    var j = n.getData().items,
      b = j.length,
      d = k.getAnimation() || h && h.getAnimation(),
      g = k.sprites,
      o, l = 0,
      f, e, c = false,
      m = k.getLabel(),
      a = m.getTemplate();
    f = {
      store: n,
      field: k.getXField(),
      angleField: k.getXField(),
      radiusField: k.getYField(),
      series: k
    };
    for (e = 0; e < b; e++) {
      o = g[e];
      if (!o) {
        o = k.createSprite();
        if (k.getHighlight()) {
          o.config.highlight = k.getHighlight();
          o.addModifier("highlight", true)
        }
        if (a.getField()) {
          a.setAttributes({
            labelOverflowPadding: k.getLabelOverflowPadding()
          });
          a.fx.setCustomDurations({
            callout: 200
          });
          o.bindMarker("labels", m)
        }
        o.setAttributes(k.getStyleByIndex(e));
        o.rendererData = f;
        o.rendererIndex = l++;
        c = true
      }
      o.fx.setConfig(d)
    }
    if (c) {
      k.doUpdateStyles()
    }
    return k.sprites
  },
  betweenAngle: function(d, f, c) {
    var e = Math.PI * 2,
      g = this.rotationOffset;
    if (!this.getClockwise()) {
      d *= -1;
      f *= -1;
      c *= -1;
      f -= g;
      c -= g
    } else {
      f += g;
      c += g
    }
    d -= f;
    c -= f;
    d %= e;
    c %= e;
    d += e;
    c += e;
    d %= e;
    c %= e;
    return d < c || c === 0
  },
  getItemForAngle: function(a) {
    var h = this,
      f = h.getSprites(),
      d;
    a %= Math.PI * 2;
    while (a < 0) {
      a += Math.PI * 2
    }
    if (f) {
      var j = h.getStore(),
        g = j.getData().items,
        c = h.getHidden(),
        b = 0,
        e = j.getCount();
      for (; b < e; b++) {
        if (!c[b]) {
          d = f[b].attr;
          if (d.startAngle <= a && d.endAngle >= a) {
            return {
              series: h,
              sprite: f[b],
              index: b,
              record: g[b],
              field: h.getXField()
            }
          }
        }
      }
    }
    return null
  },
  getItemForPoint: function(f, e) {
    var t = this,
      c = t.getSprites();
    if (c) {
      var s = t.getCenter(),
        q = t.getOffsetX(),
        p = t.getOffsetY(),
        j = f - s[0] + q,
        h = e - s[1] + p,
        b = t.getStore(),
        g = t.getDonut(),
        o = b.getData().items,
        r = Math.atan2(h, j) - t.getRotation(),
        a = Math.sqrt(j * j + h * h),
        l = t.getRadius() * g * 0.01,
        m = t.getHidden(),
        n, d, k;
      for (n = 0, d = o.length; n < d; n++) {
        if (!m[n]) {
          k = c[n].attr;
          if (a >= l + k.margin && a <= k.endRho + k.margin) {
            if (t.betweenAngle(r, k.startAngle, k.endAngle)) {
              return {
                series: t,
                sprite: c[n],
                index: n,
                record: o[n],
                field: t.getXField()
              }
            }
          }
        }
      }
      return null
    }
  },
  provideLegendInfo: function(f) {
    var h = this,
      j = h.getStore();
    if (j) {
      var g = j.getData().items,
        b = h.getLabel().getTemplate().getField(),
        c = h.getXField(),
        e = h.getHidden(),
        d, a, k;
      for (d = 0; d < g.length; d++) {
        a = h.getStyleByIndex(d);
        k = a.fillStyle;
        if (Ext.isObject(k)) {
          k = k.stops && k.stops[0].color
        }
        f.push({
          name: b ? String(g[d].get(b)) : c + " " + d,
          mark: k || a.strokeStyle || "black",
          disabled: e[d],
          series: h.getId(),
          index: d
        })
      }
    }
  }
}, 0, 0, 0, 0, ["series.pie"], 0, [Ext.chart.series, "Pie"], 0));
(Ext.cmd.derive("ExecDashboard.ux.plugin.RowExpander", Ext.grid.plugin.RowExpander, {
  rowBodyTpl: ['<div class="text-wrapper">', '<div class="news-data">',
    '<div class="news-paragraph">{paragraph}</div>',
    '<div class="news-toggle collapse"><span>COLLAPSE</span><img src="resources/icons/collapse-news.png"></div>',
    "</div>", "</div>"
  ],
  addExpander: Ext.emptyFn,
  addCollapsedCls: {
    fn: function(b, a, c) {
      var d = this.rowExpander;
      if (!d.recordsExpanded[a.record.internalId]) {
        a.itemClasses.push(d.rowCollapsedCls)
      } else {
        a.itemClasses.push("x-grid-row-expanded")
      }
      this.nextTpl.applyOut(a, b, c)
    },
    syncRowHeights: function(a, b) {
      this.rowExpander.syncRowHeights(a, b)
    },
    priority: 20000
  }
}, 0, 0, 0, 0, ["plugin.ux-rowexpander"], 0, [ExecDashboard.ux.plugin,
  "RowExpander"
], 0));
(Ext.cmd.derive("ExecDashboard.model.Base", Ext.data.Model, {
  schema: {
    namespace: "ExecDashboard.model"
  }
}, 0, 0, 0, 0, 0, 0, [ExecDashboard.model, "Base"], 0));
(Ext.cmd.derive("ExecDashboard.model.News", ExecDashboard.model.Base, {
  fields: ["type", {
    name: "date",
    type: "date",
    dateFormat: "Y-m-d H:i:s"
  }, "time", "author", "group", "image", "title", "paragraph"]
}, 0, 0, 0, 0, 0, 0, [ExecDashboard.model, "News"], 0));
(Ext.cmd.derive("ExecDashboard.view.companynews.News", Ext.grid.Panel, {
  itemId: "news",
  cls: "company-news-grid",
  config: {
    activeState: null,
    defaultActiveState: "all"
  },
  controller: "news",
  viewModel: {
    type: "news"
  },
  hideHeaders: true,
  bind: "{news}",
  tbar: [{
    text: "All Posts",
    xtype: "cycle",
    reference: "filterButton",
    showText: true,
    width: 150,
    textAlign: "left",
    listeners: {
      change: "onNewsClick"
    },
    menu: {
      id: "news-menu",
      items: [{
        text: "All Posts",
        type: "all",
        itemId: "all",
        checked: true
      }, {
        text: "News",
        type: "news",
        itemId: "news"
      }, {
        text: "Forum",
        type: "forum",
        itemId: "forum"
      }]
    }
  }],
  columns: [{
    dataIndex: "title",
    flex: 1,
    renderer: "renderTitleColumn"
  }],
  viewConfig: {
    listeners: {
      itemclick: "onCompanyClick",
      expandbody: "onCompanyExpandBody",
      collapsebody: "onCompanyCollapseBody"
    }
  },
  plugins: [{
    ptype: "ux-rowexpander",
    pluginId: "rowexpander"
  }],
  titleTpl: '<div class="text-wrapper"><div class="news-icon {type}">&nbsp;</div><div class="news-data"><div class="news-picture"><img src="resources/icons/{image}"></div><div class="news-content"><div class="news-title">{title}</div><div class="news-small">by <span class="news-author">{author}</span><img src="resources/icons/cal-icon.png"/>{date}<img src="resources/icons/clock-icon.png"/>{time}</div><div class="news-paragraph news-paragraph-simple" {expanded}>{paragraph:ellipsis(130, true)}</div><div class="news-toggle expand" {expanded}><span>EXPAND</span><img src="resources/icons/expand-news.png"></div></div></div><div>',
  validStates: {
    all: 1,
    news: 1,
    forum: 1
  },
  isValidState: function(a) {
    return a in this.validStates
  }
}, 0, ["news"], ["component", "box", "container", "panel", "tablepanel",
  "gridpanel", "grid", "news"
], {
  component: true,
  box: true,
  container: true,
  panel: true,
  tablepanel: true,
  gridpanel: true,
  grid: true,
  news: true
}, ["widget.news"], 0, [ExecDashboard.view.companynews, "News"], 0));
(Ext.cmd.derive("ExecDashboard.view.companynews.NewsController", Ext.app.ViewController, {
  init: function(a) {
    a.updateActiveState = this.updateActiveState.bind(this)
  },
  onNewsClick: function(b, c) {
    var a = this.getView();
    a.setActiveState(c.type)
  },
  renderTitleColumn: function(g, c, b) {
    var a = this.getView(),
      e = a.getPlugin("rowexpander"),
      d = a.titleTpl;
    if (!d.isTemplate) {
      a.titleTpl = d = new Ext.XTemplate(d)
    }
    var f = Ext.Object.chain(b.data);
    f.expanded = e.recordsExpanded[b.internalId] ?
      ' style="display: none"' : "";
    return d.apply(f)
  },
  updateActiveState: function(b) {
    var a = this.getViewModel();
    var c = this.lookupReference("filterButton");
    c.setActiveItem(b);
    a.set("category", b);
    this.fireEvent("changeroute", this, "news/" + b)
  },
  onCompanyClick: function(d, a, g, b, h) {
    if (h.getTarget(".news-toggle")) {
      var c = this.getView(),
        f = c.getPlugin("rowexpander");
      f.toggleRow(b, a)
    }
  },
  onCompanyExpandBody: function(a) {
    Ext.fly(a).addCls("x-grid-row-expanded");
    Ext.fly(a).down(".news-paragraph-simple").enableDisplayMode().hide();
    Ext.fly(a).down(".expand").enableDisplayMode().hide()
  },
  onCompanyCollapseBody: function(a) {
    Ext.fly(a).removeCls("x-grid-row-expanded");
    Ext.fly(a).down(".news-paragraph-simple").enableDisplayMode().show();
    Ext.fly(a).down(".expand").enableDisplayMode().show()
  }
}, 0, 0, 0, 0, ["controller.news"], 0, [ExecDashboard.view.companynews,
  "NewsController"
], 0));
(Ext.cmd.derive("ExecDashboard.view.companynews.NewsModel", Ext.app.ViewModel, {
  formulas: {
    typeFilter: function(a) {
      var b = a("category");
      return this.filters[b]
    }
  },
  filters: {
    all: ["news", "forum"],
    news: ["news"],
    forum: ["forum"]
  },
  stores: {
    news: {
      type: "news",
      autoLoad: true,
      sorters: [{
        property: "date",
        direction: "DESC"
      }],
      filters: {
        property: "type",
        operator: "in",
        value: "{typeFilter}"
      }
    }
  }
}, 0, 0, 0, 0, ["viewmodel.news"], 0, [ExecDashboard.view.companynews,
  "NewsModel"
], 0));
(Ext.cmd.derive("ExecDashboard.model.Kpi", ExecDashboard.model.Base, {
  fields: ["category", "name", "data1", "data2", "data3", "data4", "data5"]
}, 0, 0, 0, 0, 0, 0, [ExecDashboard.model, "Kpi"], 0));
(Ext.cmd.derive("ExecDashboard.view.kpi.Kpi", Ext.panel.Panel, {
  itemId: "kpi",
  cls: "kpi-main",
  config: {
    activeState: null,
    defaultActiveState: "clicks"
  },
  controller: "kpi",
  viewModel: {
    type: "kpi"
  },
  layout: {
    type: "vbox",
    align: "stretch"
  },
  scrollable: "y",
  minWidth: 600,
  items: [{
    xtype: "component",
    cls: "kpi-tiles",
    height: 100,
    tpl: ['<div class="kpi-meta">', '<tpl for=".">', "<span>",
      "<div>{statistic}</div> {description}", "</span>", "</tpl>",
      "</div>"
    ],
    data: [{
      description: "Campaigns",
      statistic: 10
    }, {
      description: "Opportunities",
      statistic: "20,560"
    }, {
      description: "Closed Won",
      statistic: "10,000"
    }, {
      description: "Total Sales",
      statistic: "$90,200"
    }, {
      description: "Goals Met",
      statistic: "71%"
    }]
  }, {
    reference: "mainChart",
    xtype: "chart",
    flex: 1,
    interactions: [{
      type: "panzoom",
      zoomOnPanGesture: false,
      axes: {
        left: {
          maxZoom: 1
        }
      }
    }],
    cls: "kpi-main-chart",
    bind: "{kpiMain}",
    minHeight: 290,
    animation: false,
    insetPadding: "40px 40px 20px 30px",
    tbar: {
      cls: "kpi-toolbar",
      defaults: {
        toggleHandler: "onToggleKpi"
      },
      items: [{
        xtype: "container",
        cls: "kpi-chart-title",
        html: "CAMPAIGN PERFORMANCE"
      }, "->", {
        ui: "kpi",
        text: "CLICKS",
        filter: "clicks",
        toggleGroup: "kpi",
        reference: "clicks",
        allowDepress: false,
        dataIndex: 0
      }, {
        ui: "kpi",
        text: "WON",
        filter: "redemption",
        reference: "redemption",
        toggleGroup: "kpi",
        allowDepress: false,
        dataIndex: 1
      }, {
        ui: "kpi",
        text: "SALES",
        filter: "sales",
        reference: "sales",
        toggleGroup: "kpi",
        allowDepress: false,
        dataIndex: 2
      }, {
        ui: "kpi",
        text: "GOALS MET",
        filter: "goalsmet",
        reference: "goalsmet",
        margin: 0,
        toggleGroup: "kpi",
        allowDepress: false,
        dataIndex: 1
      }]
    },
    axes: [{
      type: "numeric",
      position: "left",
      fields: ["data1"],
      fontSize: 12,
      grid: true,
      minimum: 0
    }, {
      type: "category",
      position: "bottom",
      fields: ["name"]
    }],
    series: [{
      type: "area",
      subStyle: {
        stroke: ["rgb(34,198,239)", "rgb(241,73,91)"],
        fill: ["rgba(34,198,239,0.25)", "rgba(241,73,91,0.25)"],
        "stroke-width": 3
      },
      xField: "name",
      yField: ["data1", "data2"]
    }]
  }, {
    height: 230,
    cls: "kpi-meta-charts",
    layout: {
      type: "hbox",
      align: "stretch"
    },
    items: [{
      title: "REDEMPTION",
      margin: "0 10px 0 20px",
      width: 280,
      bodyCls: "redemption-body",
      layout: {
        type: "vbox",
        align: "stretch"
      },
      items: [{
        xtype: "container",
        layout: {
          type: "hbox",
          align: "stretch"
        },
        flex: 1,
        items: [{
          xtype: "polar",
          flex: 1,
          animation: true,
          padding: "10px 0 10px 10px",
          donut: true,
          interactions: ["rotate"],
          colors: ["#2ac8ef", "#ececec"],
          store: {
            fields: ["name", "data1"],
            data: [{
              name: "metric one",
              data1: 25
            }, {
              name: "metric two",
              data1: 75
            }]
          },
          sprites: [{
            type: "text",
            x: 40,
            y: 71,
            text: "25%",
            font: "30px 300 Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif",
            fillStyle: "#69708a"
          }],
          series: [{
            type: "pie",
            xField: "data1",
            colors: ["#2ac8ef", "#ececec"],
            donut: 85
          }]
        }, {
          xtype: "polar",
          flex: 1,
          padding: "10px 10px 10px 0",
          animation: true,
          donut: true,
          interactions: ["rotate"],
          colors: ["#11c897", "#ececec"],
          store: {
            fields: ["name", "data1"],
            data: [{
              name: "metric one",
              data1: 50
            }, {
              name: "metric two",
              data1: 50
            }]
          },
          sprites: [{
            type: "text",
            x: 40,
            y: 71,
            text: "50%",
            font: "30px 300 Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif",
            fillStyle: "#69708a"
          }],
          series: [{
            type: "pie",
            xField: "data1",
            colors: ["#11c897", "#ececec"],
            donut: 85
          }]
        }]
      }, {
        xtype: "label",
        html: "<span>IN STORE</span><span>1,024</span>",
        cls: "kpi-in-store"
      }, {
        xtype: "label",
        html: "<span>ONLINE</span><span>20,678</span>",
        cls: "kpi-online"
      }]
    }, {
      xtype: "panel",
      bodyCls: "statistics-body",
      margin: "0 20px 0 0",
      flex: 1,
      title: "STATISTICS",
      tpl: ['<div class="statistic-header">Current Campaigns</div>',
        '<tpl for=".">',
        '<div class="statistic-tag {status}">{status}</div>',
        '<div class="statistic-description">{description}</div>',
        '<div class="sparkline">',
        '<div class="sparkline-inner sparkline-inner-{status}" style="width: {[values.ratio * 100]}%;"></div>',
        "</div>", "</tpl>"
      ],
      data: [{
        status: "active",
        description: "2 for 1, 30% off for $50",
        ratio: 0.5
      }, {
        status: "paused",
        description: "$100 for new customers",
        ratio: 0.3
      }, {
        status: "ended",
        description: "$25 refferal",
        ratio: 0.1
      }]
    }]
  }],
  validStates: {
    clicks: 1,
    redemption: 1,
    sales: 1,
    goalsmet: 1
  },
  isValidState: function(a) {
    return a in this.validStates
  }
}, 0, ["kpi"], ["component", "box", "container", "panel", "kpi"], {
  component: true,
  box: true,
  container: true,
  panel: true,
  kpi: true
}, ["widget.kpi"], 0, [ExecDashboard.view.kpi, "Kpi"], 0));
(Ext.cmd.derive("ExecDashboard.view.kpi.KpiController", Ext.app.ViewController, {
  init: function(a) {
    a.updateActiveState = this.updateActiveState.bind(this)
  },
  onToggleKpi: function(b) {
    if (b.pressed) {
      var a = this.getView();
      a.setActiveState(b.filter)
    }
  },
  updateActiveState: function(c) {
    var a = this.getReferences();
    var b = this.getViewModel();
    a[c].setPressed(true);
    b.set("kpiCategory", c);
    this.fireEvent("changeroute", this, "kpi/" + c)
  }
}, 0, 0, 0, 0, ["controller.kpi"], 0, [ExecDashboard.view.kpi,
  "KpiController"
], 0));
(Ext.cmd.derive("ExecDashboard.store.Kpi", Ext.data.Store, {
  model: "ExecDashboard.model.Kpi",
  remoteFilter: true,
  proxy: {
    type: "memory",
    reader: "array",
    data: [
      [0, "clicks", "May 2010", 53.34321776, 100.1152082],
      [1, "clicks", "June 2010", 54.69016005, 65.56494967],
      [2, "clicks", "July 2010", 40.01984409, 92.45624175],
      [3, "clicks", "August 2010", 40.48879141, 74.98233893],
      [4, "clicks", "September 2010", 42.51196856, 103.072319],
      [5, "clicks", "October 2010", 50.32381328, 104.1799186],
      [6, "clicks", "November 2010", 34.11898341, 109.5350601],
      [7, "clicks", "December 2010", 32.44976606, 74.50063758],
      [8, "clicks", "January 2011", 17.18056779, 90.10920358],
      [9, "clicks", "February 2011", 52.05881614, 80.56466246],
      [10, "clicks", "March 2011", 33.27167155, 97.60633968],
      [11, "clicks", "April 2011", 38.07067955, 105.371117],
      [12, "clicks", "May 2011", 46.49595093, 84.51678662],
      [13, "clicks", "June 2011", 39.91110551, 77.25970637],
      [14, "clicks", "July 2011", 67.3152342, 91.84850199],
      [15, "clicks", "August 2011", 59.07162381, 54.38332355],
      [16, "clicks", "September 2011", 56.17994668, 69.71565887],
      [17, "clicks", "October 2011", 86.89161062, 92.34486077],
      [18, "clicks", "November 2011", 78.35182808, 51.11323053],
      [19, "clicks", "December 2011", 82.87141076, 66.11631926],
      [20, "clicks", "January 2012", 84.60309841, 80.74901845],
      [21, "clicks", "February 2012", 99.93719758, 83.13372022],
      [22, "clicks", "March 2012", 106.8555931, 56.50678243],
      [23, "clicks", "April 2012", 113.7228817, 42.16283367],
      [24, "clicks", "May 2012", 111.8776603, 49.61530679],
      [25, "clicks", "June 2012", 113.3106602, 34.18390743],
      [26, "clicks", "July 2012", 93.03780957, 70.9560489],
      [27, "clicks", "August 2012", 83.78071344, 65.6660914],
      [28, "clicks", "September 2012", 95.24924696, 41.32918343],
      [29, "clicks", "October 2012", 98.31825149, 64.05028156],
      [30, "clicks", "November 2012", 72.63151964, 30.51735086],
      [31, "clicks", "December 2012", 50.01413835, 29.69314915],
      [32, "clicks", "January 2013", 81.64955519, 42.51919158],
      [33, "clicks", "February 2013", 71.72912679, 49.68210264],
      [34, "clicks", "March 2013", 64.65410192, 13.15671922],
      [35, "clicks", "April 2013", 29.19237586, 42.43020025],
      [36, "clicks", "May 2013", 61.06066066, 37.64644143],
      [37, "clicks", "June 2013", 31.44137843, 30.01199757],
      [38, "clicks", "July 2013", 18.68048338, 10.61947258],
      [39, "clicks", "August 2013", 32.41391034, 57.03027991],
      [40, "clicks", "September 2013", 23.68248581, 32.62967179],
      [41, "clicks", "October 2013", 48.44376178, 32.4745558],
      [42, "clicks", "November 2013", 56.66840028, 29.69863069],
      [43, "clicks", "December 2013", 52.81059068, 32.36336121],
      [44, "clicks", "January 2014", 53.39771093, 40.35770028],
      [45, "clicks", "February 2014", 57.10482161, 19.42807449],
      [46, "clicks", "March 2014", 68.81738952, 25.83296209],
      [47, "clicks", "April 2014", 66.75458934, 60.95396364],
      [48, "clicks", "May 2014", 65.81284993, 56.13067955],
      [49, "clicks", "June 2014", 67.14098525, 29.50360539],
      [50, "redemption", "May 2010", 68.78541952, 73.83796415],
      [51, "redemption", "June 2010", 93.0330805, 50.50989887],
      [52, "redemption", "July 2010", 68.5655515, 40.64627161],
      [53, "redemption", "August 2010", 70.02212232, 77.06353224],
      [54, "redemption", "September 2010", 78.55269212, 54.1042314],
      [55, "redemption", "October 2010", 86.66990821, 44.29521389],
      [56, "redemption", "November 2010", 81.8131907, 62.99555981],
      [57, "redemption", "December 2010", 111.3518215, 82.98311324],
      [58, "redemption", "January 2011", 81.40584334, 61.4311016],
      [59, "redemption", "February 2011", 107.4753853, 67.54600755],
      [60, "redemption", "March 2011", 93.12697373, 73.64983026],
      [61, "redemption", "April 2011", 82.51686506, 87.54406398],
      [62, "redemption", "May 2011", 68.22382804, 55.63187259],
      [63, "redemption", "June 2011", 55.04843989, 74.2730431],
      [64, "redemption", "July 2011", 54.26079274, 88.26477984],
      [65, "redemption", "August 2011", 82.65834077, 73.94778064],
      [66, "redemption", "September 2011", 74.06675502, 106.9787484],
      [67, "redemption", "October 2011", 45.06887458, 105.8754961],
      [68, "redemption", "November 2011", 53.71012185, 74.62697483],
      [69, "redemption", "December 2011", 45.76945567, 93.52929645],
      [70, "redemption", "January 2012", 40.28806254, 84.46406374],
      [71, "redemption", "February 2012", 45.11947706, 59.76149632],
      [72, "redemption", "March 2012", 53.15990555, 76.54852],
      [73, "redemption", "April 2012", 18.47822684, 62.40871735],
      [74, "redemption", "May 2012", 26.88677677, 56.37902614],
      [75, "redemption", "June 2012", 53.07958455, 82.16612394],
      [76, "redemption", "July 2012", 51.12003141, 70.56996924],
      [77, "redemption", "August 2012", 40.37637935, 81.00815834],
      [78, "redemption", "September 2012", 51.25610804, 49.96693153],
      [79, "redemption", "October 2012", 56.33808173, 74.69503745],
      [80, "redemption", "November 2012", 68.82095221, 83.38837354],
      [81, "redemption", "December 2012", 49.80140757, 64.9313425],
      [82, "redemption", "January 2013", 66.95842846, 62.6332992],
      [83, "redemption", "February 2013", 72.33846037, 56.51947925],
      [84, "redemption", "March 2013", 94.35737603, 35.99155828],
      [85, "redemption", "April 2013", 97.71415293, 42.80623324],
      [86, "redemption", "May 2013", 103.9686145, 53.72375476],
      [87, "redemption", "June 2013", 85.34685203, 38.82037102],
      [88, "redemption", "July 2013", 98.73416455, 62.15346433],
      [89, "redemption", "August 2013", 75.32157973, 23.66379738],
      [90, "redemption", "September 2013", 89.72719705, 62.24478753],
      [91, "redemption", "October 2013", 81.8442231, 40.25135437],
      [92, "redemption", "November 2013", 101.3772379, 22.24866309],
      [93, "redemption", "December 2013", 75.63304388, 60.02298886],
      [94, "redemption", "January 2014", 97.43899851, 31.43154371],
      [95, "redemption", "February 2014", 93.51713151, 30.88595132],
      [96, "redemption", "March 2014", 83.14395398, 58.95084719],
      [97, "redemption", "April 2014", 66.7850417, 14.93916416],
      [98, "redemption", "May 2014", 60.9905471, 51.16786536],
      [99, "redemption", "June 2014", 54.65355603, 41.00113419],
      [100, "sales", "May 2010", 39.31109289, 57.59563546],
      [101, "sales", "June 2010", 40.91728573, 42.88747711],
      [102, "sales", "July 2010", 58.94113927, 23.32729559],
      [103, "sales", "August 2010", 52.95083591, 24.33871661],
      [104, "sales", "September 2010", 21.11758313, 29.60587097],
      [105, "sales", "October 2010", 53.53800894, 30.04906835],
      [106, "sales", "November 2010", 42.4397106, 47.04612536],
      [107, "sales", "December 2010", 26.2095974, 62.47743488],
      [108, "sales", "January 2011", 30.58255141, 31.75990875],
      [109, "sales", "February 2011", 36.9349803, 60.36200593],
      [110, "sales", "March 2011", 62.87394313, 36.02085794],
      [111, "sales", "April 2011", 37.30938123, 60.48191826],
      [112, "sales", "May 2011", 40.70512909, 48.20802472],
      [113, "sales", "June 2011", 59.86076756, 47.70589603],
      [114, "sales", "July 2011", 77.09829898, 56.44902327],
      [115, "sales", "August 2011", 73.17741965, 51.96340706],
      [116, "sales", "September 2011", 88.49624711, 85.02357507],
      [117, "sales", "October 2011", 64.96186053, 39.00235783],
      [118, "sales", "November 2011", 83.15030445, 60.93368341],
      [119, "sales", "December 2011", 95.81160565, 62.36677091],
      [120, "sales", "January 2012", 110.5874922, 45.90456046],
      [121, "sales", "February 2012", 98.92823288, 95.60247828],
      [122, "sales", "March 2012", 110.2900286, 73.3366203],
      [123, "sales", "April 2012", 92.55486463, 101.5348455],
      [124, "sales", "May 2012", 92.11265903, 70.25968567],
      [125, "sales", "June 2012", 73.93842828, 56.07893064],
      [126, "sales", "July 2012", 79.13436817, 66.78420555],
      [127, "sales", "August 2012", 72.20594524, 66.36218002],
      [128, "sales", "September 2012", 94.64694384, 69.88200656],
      [129, "sales", "October 2012", 91.37790858, 102.7245038],
      [130, "sales", "November 2012", 79.69172287, 83.01390904],
      [131, "sales", "December 2012", 59.66054702, 81.60650432],
      [132, "sales", "January 2013", 52.23557286, 72.38299569],
      [133, "sales", "February 2013", 36.80411006, 88.2101845],
      [134, "sales", "March 2013", 55.75359373, 88.1473107],
      [135, "sales", "April 2013", 62.30057718, 98.41657376],
      [136, "sales", "May 2013", 39.83018157, 82.65405281],
      [137, "sales", "June 2013", 23.17592912, 69.92175223],
      [138, "sales", "July 2013", 21.52257814, 70.54505329],
      [139, "sales", "August 2013", 36.50127445, 84.81871541],
      [140, "sales", "September 2013", 27.1861296, 74.011619],
      [141, "sales", "October 2013", 26.57600151, 80.70238741],
      [142, "sales", "November 2013", 23.98446771, 49.44929297],
      [143, "sales", "December 2013", 46.86933142, 56.64978486],
      [144, "sales", "January 2014", 39.18567788, 67.38300221],
      [145, "sales", "February 2014", 53.65804691, 44.7934002],
      [146, "sales", "March 2014", 50.69153581, 50.2677763],
      [147, "sales", "April 2014", 61.31902897, 74.90533031],
      [148, "sales", "May 2014", 58.46350145, 59.35572525],
      [149, "sales", "June 2014", 81.42597583, 74.26703681],
      [150, "goalsmet", "May 2010", 95.04829084, 47.23706597],
      [151, "goalsmet", "June 2010", 73.78333039, 45.11085271],
      [152, "goalsmet", "July 2010", 94.3604361, 51.34704992],
      [153, "goalsmet", "August 2010", 105.2655568, 70.96460688],
      [154, "goalsmet", "September 2010", 79.14537763, 43.02033715],
      [155, "goalsmet", "October 2010", 98.37533162, 29.29104543],
      [156, "goalsmet", "November 2010", 104.796126, 62.32855994],
      [157, "goalsmet", "December 2010", 97.51240042, 38.74872847],
      [158, "goalsmet", "January 2011", 102.6453565, 49.64005545],
      [159, "goalsmet", "February 2011", 102.1994732, 30.0025852],
      [160, "goalsmet", "March 2011", 73.39559191, 50.47642849],
      [161, "goalsmet", "April 2011", 61.27119773, 59.07263871],
      [162, "goalsmet", "May 2011", 73.31990505, 47.33338594],
      [163, "goalsmet", "June 2011", 58.29569167, 25.72339495],
      [164, "goalsmet", "July 2011", 55.33111777, 59.6825653],
      [165, "goalsmet", "August 2011", 71.80238112, 19.25548321],
      [166, "goalsmet", "September 2011", 34.97347316, 39.75761826],
      [167, "goalsmet", "October 2011", 52.30827648, 28.2533373],
      [168, "goalsmet", "November 2011", 60.03874429, 31.42127572],
      [169, "goalsmet", "December 2011", 43.95755597, 27.92200989],
      [170, "goalsmet", "January 2012", 24.81828778, 38.29926118],
      [171, "goalsmet", "February 2012", 47.12463933, 43.30320703],
      [172, "goalsmet", "March 2012", 50.98797045, 43.40231933],
      [173, "goalsmet", "April 2012", 37.41880312, 69.2630494],
      [174, "goalsmet", "May 2012", 42.9862138, 54.77940011],
      [175, "goalsmet", "June 2012", 33.04961008, 65.52333076],
      [176, "goalsmet", "July 2012", 24.85540873, 52.80462406],
      [177, "goalsmet", "August 2012", 44.00374943, 66.06202895],
      [178, "goalsmet", "September 2012", 34.78215431, 61.77950311],
      [179, "goalsmet", "October 2012", 56.29075538, 82.71717255],
      [180, "goalsmet", "November 2012", 67.34190039, 52.40606649],
      [181, "goalsmet", "December 2012", 54.10378896, 57.37141322],
      [182, "goalsmet", "January 2013", 64.16040062, 83.59736046],
      [183, "goalsmet", "February 2013", 79.90361832, 86.24452685],
      [184, "goalsmet", "March 2013", 84.00004303, 55.05804615],
      [185, "goalsmet", "April 2013", 106.4863033, 75.97050499],
      [186, "goalsmet", "May 2013", 95.15372223, 75.71648299],
      [187, "goalsmet", "June 2013", 78.62504017, 63.06792229],
      [188, "goalsmet", "July 2013", 83.23920266, 67.80856788],
      [189, "goalsmet", "August 2013", 88.22784647, 85.88663488],
      [190, "goalsmet", "September 2013", 104.6384174, 93.35448609],
      [191, "goalsmet", "October 2013", 107.3812999, 89.49969638],
      [192, "goalsmet", "November 2013", 69.63749081, 99.29657118],
      [193, "goalsmet", "December 2013", 84.60019278, 84.93156692],
      [194, "goalsmet", "January 2014", 86.90236866, 103.9079136],
      [195, "goalsmet", "February 2014", 63.41599588, 100.2525362],
      [196, "goalsmet", "March 2014", 58.48243609, 107.2668902],
      [197, "goalsmet", "April 2014", 71.55836864, 98.57697173],
      [198, "goalsmet", "May 2014", 71.98521015, 82.93367643],
      [199, "goalsmet", "June 2014", 44.21288092, 86.46717701]
    ]
  }
}, 0, 0, 0, 0, ["store.kpi"], 0, [ExecDashboard.store, "Kpi"], 0));
(Ext.cmd.derive("ExecDashboard.view.kpi.KpiModel", Ext.app.ViewModel, {
    data: {},
    stores: {
      kpiMain: {
        type: "kpi",
        autoLoad: true,
        filters: {
          property: "category",
          value: "{kpiCategory}"
        }
      }
    }
  }, 0, 0, 0, 0, ["viewmodel.kpi"], 0, [ExecDashboard.view.kpi, "KpiModel"],
  0));
(Ext.cmd.derive("ExecDashboard.view.main.MainController", Ext.app.ViewController, {
  routes: {
    "!:id": {
      action: "onNavigate",
      before: "beforeNavigate"
    },
    "!:id/:state": {
      action: "onNavigateDeep",
      before: "beforeNavigateDeep"
    }
  },
  listen: {
    controller: {
      "*": {
        changeroute: "changeRoute",
        unmatchedroute: "onUnmatchedRoute"
      }
    }
  },
  destroy: function() {
    Ext.destroyMembers(this, "menu");
    Ext.app.ViewController.prototype.destroy.call(this)
  },
  beforeNavigate: function(d, c) {
    var a = this.getView();
    var b = a.getComponent(d);
    if (b) {
      c.resume()
    } else {
      this.onBadRoute()
    }
  },
  beforeNavigateDeep: function(f, e, d) {
    var a = this.getView();
    var b = a.getComponent(f);
    var c;
    if (b.isValidState) {
      c = b.isValidState(e)
    }
    if (c) {
      d.resume()
    } else {
      this.onBadRoute()
    }
  },
  changeRoute: function(a, b) {
    if (b.substring(0, 1) !== "!") {
      b = "!" + b
    }
    this.redirectTo(b)
  },
  getTabRoute: function(b) {
    var a = b.xtype;
    if (b.getActiveState) {
      a += "/" + (b.getActiveState() || b.getDefaultActiveState())
    }
    return a
  },
  onBadRoute: function() {
    var a = ExecDashboard.app.getApplication();
    this.changeRoute(this, a.getDefaultToken())
  },
  onNavigate: function(d) {
    var b = this.getView();
    var c = b.setActiveTab(d);
    if (c) {
      var a = this.getTabRoute(c);
      if (a && a !== d) {
        this.changeRoute(this, a)
      }
    }
  },
  onNavigateDeep: function(d, c) {
    var a = this.getView();
    var b = a.setActiveTab(d) || a.getActiveTab();
    b.setActiveState(c)
  },
  onTabChange: function(b, c) {
    var a = this.getTabRoute(c);
    this.changeRoute(this, a)
  },
  onMenuClick: function(b, a) {
    this.getView().setActiveTab(b.items.indexOf(a) + 1)
  },
  onSwitchTool: function(a) {
    var b = this.menu;
    if (!b) {
      b = this.getView().assistiveMenu;
      this.menu = b = new Ext.menu.Menu(b)
    }
    b.showAt(a.getXY())
  },
  onUnmatchedRoute: function(a) {
    if (a) {
      this.onBadRoute()
    }
  }
}, 0, 0, 0, 0, ["controller.main"], 0, [ExecDashboard.view.main,
  "MainController"
], 0));
(Ext.cmd.derive("ExecDashboard.view.main.MainModel", Ext.app.ViewModel, {
    data: {
      name: "ExecDashboard"
    }
  }, 0, 0, 0, 0, ["viewmodel.main"], 0, [ExecDashboard.view.main, "MainModel"],
  0));
(Ext.cmd.derive("ExecDashboard.model.FullProfitloss", ExecDashboard.model.Base, {
  fields: ["account", {
    name: "q1_2010",
    type: "int"
  }, {
    name: "q2_2010",
    type: "int"
  }, {
    name: "q3_2010",
    type: "int"
  }, {
    name: "q4_2010",
    type: "int"
  }, {
    name: "q1_2011",
    type: "int"
  }, {
    name: "q2_2011",
    type: "int"
  }, {
    name: "q3_2011",
    type: "int"
  }, {
    name: "q4_2011",
    type: "int"
  }, {
    name: "q1_2012",
    type: "int"
  }, {
    name: "q2_2012",
    type: "int"
  }, "region"]
}, 0, 0, 0, 0, 0, 0, [ExecDashboard.model, "FullProfitloss"], 0));
(Ext.cmd.derive("ExecDashboard.store.ProfitLoss", Ext.data.Store, {
    model: "ExecDashboard.model.FullProfitloss",
    proxy: {
      type: "ajax",
      url: "resources/data/full_data.json",
      reader: "json"
    }
  }, 0, 0, 0, 0, ["store.profitloss"], 0, [ExecDashboard.store, "ProfitLoss"],
  0));
(Ext.cmd.derive("ExecDashboard.model.MetaProfitloss", ExecDashboard.model.Base, {
  fields: ["display", "quarter", "region"]
}, 0, 0, 0, 0, 0, 0, [ExecDashboard.model, "MetaProfitloss"], 0));
(Ext.cmd.derive("ExecDashboard.view.profitloss.ProfitLoss", Ext.grid.Panel, {
    itemId: "profitloss",
    cls: "dynamic-pl-grid",
    controller: "profitloss",
    viewModel: {
      type: "profitloss"
    },
    enableLocking: true,
    store: {
      type: "profitloss",
      sorters: "id",
      groupField: "account"
    },
    features: [{
      ftype: "grouping",
      id: "profitLossGrouper",
      groupHeaderTpl: "<b>{name}</b>",
      startCollapsed: false
    }],
    tbar: [{
      text: "Quarter",
      width: 150,
      textAlign: "left",
      reference: "quartersButton",
      menu: {
        id: "quarter-menu",
        cls: "pl-option-menu",
        items: []
      }
    }, {
      text: "Region",
      width: 150,
      textAlign: "left",
      reference: "regionsButton",
      menu: {
        id: "region-menu",
        cls: "pl-option-menu",
        items: []
      }
    }],
    regionColumn: {
      text: "Region",
      dataIndex: "region",
      menuDisabled: true,
      sortable: false,
      resizable: false,
      hideable: false,
      groupable: false,
      locked: true,
      plugins: "responsive",
      responsiveConfig: {
        "width < 600": {
          width: 150
        },
        "width >= 600": {
          width: 320
        }
      }
    },
    menuItemDefaults: {
      checked: true,
      hideOnClick: false
    },
    quarterColumnDefaults: {
      formatter: "currency",
      flex: 1,
      minWidth: 130,
      align: "right",
      groupable: false,
      menuDisabled: true,
      resizable: false,
      sortable: false,
      summaryType: "sum"
    },
    viewConfig: {
      listeners: {
        refresh: "onViewRefresh"
      }
    }
  }, 0, ["profitloss"], ["component", "box", "container", "panel",
    "tablepanel", "gridpanel", "grid", "profitloss"
  ], {
    component: true,
    box: true,
    container: true,
    panel: true,
    tablepanel: true,
    gridpanel: true,
    grid: true,
    profitloss: true
  }, ["widget.profitloss"], 0, [ExecDashboard.view.profitloss, "ProfitLoss"],
  0));
(Ext.cmd.derive("ExecDashboard.view.profitloss.ProfitLossController", Ext.app.ViewController, {
  onMetaDataLoad: function(b) {
    var e = this,
      d = e.getReferences(),
      a = e.getView(),
      f = {
        quarter: {
          items: [],
          listeners: {
            click: e.onQuarterItemClick,
            scope: e
          }
        },
        region: {
          items: [],
          listeners: {
            click: e.onRegionItemClick,
            scope: e
          }
        }
      },
      c = [a.regionColumn];
    b.each(function(i) {
      var g = i.data.type,
        h = i.data.value;
      f[g].items.push(Ext.apply({
        text: i.data.display,
        value: h,
        type: g,
        listeners: f[g].listeners
      }, a.menuItemDefaults));
      if (g === "quarter") {
        c.push(Ext.apply({
          text: h.substring(0, 2).toUpperCase() + " " + h.substring(
            3),
          dataIndex: h
        }, a.quarterColumnDefaults))
      }
    });
    f.region.items.sort(function(g, h) {
      return (g.text < h.text) ? -1 : ((h.text < g.text) ? 1 : 0)
    });
    Ext.batchLayouts(function() {
      d.quartersButton.menu.add(f.quarter.items);
      d.regionsButton.menu.add(f.region.items);
      a.setColumns(c);
      a.store.load()
    })
  },
  onQuarterItemClick: function(b) {
    var a = this.getView().getColumnManager().getHeaderByDataIndex(b.value);
    a.setVisible(b.checked)
  },
  onRegionItemClick: function() {
    var a = this.getView(),
      c = {
        id: "regionFilter",
        property: "region_filter",
        operator: "in",
        value: []
      },
      b = this.lookupReference("regionsButton").menu;
    b.items.each(function(d) {
      if (d.checked) {
        c.value.push(d.value)
      }
    });
    if (c.value.length === b.items.length) {
      a.store.getFilters().removeByKey(c.id)
    } else {
      a.store.getFilters().add(c)
    }
  },
  onViewRefresh: function(b) {
    if (b.ownerGrid.normalGrid === b.ownerCt) {
      var c = b.scrollManager,
        a;
      if (c) {
        a = c.scroller;
        a.setSize("auto");
        a.refresh()
      }
    }
  }
}, 0, 0, 0, 0, ["controller.profitloss"], 0, [ExecDashboard.view.profitloss,
  "ProfitLossController"
], 0));
(Ext.cmd.derive("ExecDashboard.view.profitloss.ProfitLossModel", Ext.app.ViewModel, {
  stores: {
    metaProfitLoss: {
      model: "ExecDashboard.model.MetaProfitloss",
      autoLoad: true,
      listeners: {
        load: "onMetaDataLoad"
      },
      proxy: {
        type: "ajax",
        url: "resources/data/meta_data.json",
        reader: {
          type: "json"
        }
      }
    }
  }
}, 0, 0, 0, 0, ["viewmodel.profitloss"], 0, [ExecDashboard.view.profitloss,
  "ProfitLossModel"
], 0));
(Ext.cmd.derive("ExecDashboard.model.StockOHLC", ExecDashboard.model.Base, {
  fields: ["company", "time", "open", "high", "low", "close"]
}, 0, 0, 0, 0, 0, 0, [ExecDashboard.model, "StockOHLC"], 0));
(Ext.cmd.derive("ExecDashboard.view.quarterly.Quarterly", Ext.panel.Panel, {
  itemId: "quarterly",
  cls: "quarterly-main",
  config: {
    activeState: null,
    defaultActiveState: "AAPL"
  },
  controller: "quarterly",
  viewModel: {
    type: "quarterly"
  },
  layout: {
    type: "vbox",
    align: "stretch"
  },
  scrollable: "y",
  items: [{
    xtype: "chart",
    cls: "quarterly-chart",
    width: "100%",
    height: 400,
    insetPadding: "10px 20px 20px 40px",
    interactions: [{
      type: "panzoom",
      zoomOnPanGesture: false,
      axes: {
        right: {
          maxZoom: 1
        }
      }
    }],
    animation: false,
    bind: "{stocks}",
    legend: {
      hidden: true
    },
    tbar: {
      defaults: {
        xtype: "displayfield",
        labelAlign: "top"
      },
      items: [{
        xtype: "container",
        cls: "stock-picker-wrapper",
        layout: {
          type: "vbox"
        },
        padding: "0 0 0 15",
        items: [{
          xtype: "cycle",
          cls: "quarterly-cycle",
          showText: true,
          height: 40,
          text: "AAPL",
          bind: {
            text: "{stockMeta.symbol}"
          },
          textAlign: "right",
          width: 135,
          listeners: {
            change: "menuItemClick"
          },
          menu: {
            id: "quarterly-menu",
            items: [{
              text: "AAPL",
              checked: true
            }, {
              text: "GOOG"
            }]
          }
        }, {
          xtype: "displayfield",
          cls: "stock-picker-small",
          textAlign: "right",
          width: 105,
          bind: {
            value: "{stockMeta.label}"
          }
        }]
      }, {
        text: "",
        width: 20
      }, {
        fieldLabel: "CHANGE",
        bind: '{stockMeta.change}<span class="ql-percentage">({stockMeta.changePercentage}%)</span>',
        flex: 1
      }, {
        fieldLabel: "PRICE",
        bind: "{stockMeta.price}",
        flex: 1
      }, {
        fieldLabel: "MAX/MIN",
        bind: "{stockMeta.maxMin}",
        flex: 1
      }, {
        fieldLabel: "VOLUME",
        bind: "{stockMeta.volume}",
        flex: 1
      }]
    },
    axes: [{
      type: "numeric",
      position: "right",
      fields: ["open", "high", "low", "close"],
      grid: {
        lineDash: [2, 2],
        stroke: "#ccc"
      },
      style: {
        axisLine: false,
        majorTickSize: 0
      }
    }, {
      type: "time",
      position: "bottom",
      fields: ["time"],
      dateFormat: "M y",
      segmenter: {
        type: "time",
        step: {
          unit: Ext.Date.MONTH,
          step: 4
        }
      },
      grid: {
        lineDash: [2, 2],
        stroke: "#ccc"
      },
      style: {
        axisLine: false,
        majorTickSize: 0
      }
    }],
    series: [{
      type: "candlestick",
      background: "rgba(220,220,220,0.2)",
      xField: "time",
      openField: "open",
      highField: "high",
      lowField: "low",
      closeField: "close",
      style: {
        barWidth: 5,
        dropStyle: {
          fill: "#22c6ef",
          stroke: "#22c6ef"
        },
        raiseStyle: {
          fill: "#f1495b",
          stroke: "#f1495b"
        }
      }
    }]
  }, {
    xtype: "dataview",
    cls: "quarterly-dataview",
    bind: "{statements}",
    itemSelector: "div.thumb-wrap",
    listeners: {
      itemclick: "onQuarterlyStatementClick"
    },
    tpl: ['<tpl for=".">', '<tpl if="xindex % 4 === 1">',
      '<div class="statement-type">{type}</div>', "</tpl>",
      '<div class="thumb-wrap">',
      '<a class="thumb" href="{url}" target="_blank">',
      '<div class="thumb-icon"></div>',
      '<div class="thumb-title-container">',
      '<div class="thumb-title">{title}</div>',
      '<div class="thumb-title-small">Uploaded: {uploaded}</div>',
      "</div>", '<div class="thumb-download"></div>', "</a>",
      "</div>", "</tpl>"
    ]
  }],
  validStates: {
    AAPL: 1,
    GOOG: 1
  },
  isValidState: function(a) {
    return a in this.validStates
  }
}, 0, ["quarterly"], ["component", "box", "container", "panel", "quarterly"], {
  component: true,
  box: true,
  container: true,
  panel: true,
  quarterly: true
}, ["widget.quarterly"], 0, [ExecDashboard.view.quarterly, "Quarterly"], 0));
(Ext.cmd.derive("ExecDashboard.view.quarterly.QuarterlyController", Ext.app.ViewController, {
  init: function(a) {
    a.updateActiveState = this.updateActiveState.bind(this)
  },
  menuItemClick: function(b, c) {
    var a = this.getView();
    a.setActiveState(c.text)
  },
  onQuarterlyStatementClick: function(d, b, f, a, g, c) {
    window.open(b.get("url"))
  },
  updateActiveState: function(b) {
    var a = this.getViewModel();
    a.set("company", b);
    this.fireEvent("changeroute", this, "quarterly/" + b)
  }
}, 0, 0, 0, 0, ["controller.quarterly"], 0, [ExecDashboard.view.quarterly,
  "QuarterlyController"
], 0));
(Ext.cmd.derive("ExecDashboard.view.quarterly.QuarterlyModel", Ext.app.ViewModel, {
  data: {
    stockRange: "2Y"
  },
  formulas: {
    stockMeta: function(a) {
      return this.companyData[a("company")]
    }
  },
  stores: {
    stocks: {
      type: "stockohlc",
      autoLoad: true,
      filters: {
        property: "company",
        value: "{company}"
      }
    },
    statements: {
      fields: ["name", "thumb", "url", "type"],
      proxy: {
        type: "ajax",
        url: "resources/data/dv_data.json",
        reader: {
          type: "json"
        }
      },
      autoLoad: true
    }
  },
  companyData: {
    AAPL: {
      symbol: "AAPL",
      change: "+0.12",
      changePercentage: "+1.29",
      price: "9.38",
      maxMin: "9.39/9.30",
      volume: "154.4 m",
      label: "APPLE, INC"
    },
    GOOG: {
      symbol: "GOOG",
      change: "+13.25",
      changePercentage: "+2.40",
      price: "565.95",
      maxMin: "566.00/554.35",
      volume: "171.1 m",
      label: "GOOGLE, INC"
    }
  }
}, 0, 0, 0, 0, ["viewmodel.quarterly"], 0, [ExecDashboard.view.quarterly,
  "QuarterlyModel"
], 0));
(Ext.cmd.derive("ExecDashboard.view.main.Main", Ext.tab.Panel, {
  controller: "main",
  viewModel: {
    type: "main"
  },
  ui: "navigation",
  cls: "exec-menu-navigation",
  tabBarHeaderPosition: 1,
  titleRotation: 0,
  tabRotation: 0,
  header: {
    layout: {
      align: "stretchmax"
    },
    iconCls: "exec-header-icon",
    title: {
      text: "MyBiz",
      textAlign: "center",
      flex: 0,
      minWidth: 160
    },
    tools: [{
      type: "gear",
      plugins: "responsive",
      width: 120,
      margin: "0 0 0 0",
      handler: "onSwitchTool",
      responsiveConfig: {
        "width < 768 && tall": {
          visible: true
        },
        "width >= 768": {
          visible: false
        }
      }
    }]
  },
  tabBar: {
    flex: 1,
    layout: {
      align: "stretch",
      overflowHandler: "none"
    }
  },
  responsiveConfig: {
    tall: {
      headerPosition: "top"
    },
    wide: {
      headerPosition: "left"
    }
  },
  listeners: {
    tabchange: "onTabChange"
  },
  defaults: {
    tabConfig: {
      plugins: "responsive",
      responsiveConfig: {
        wide: {
          iconAlign: "left",
          textAlign: "left",
          flex: 0
        },
        tall: {
          iconAlign: "top",
          textAlign: "center",
          flex: 1
        },
        "width < 768 && tall": {
          visible: false
        },
        "width >= 768": {
          visible: true
        }
      }
    }
  },
  items: [{
    xtype: "component",
    tabConfig: {
      hidden: true
    }
  }, {
    xtype: "kpi",
    title: "KPI Overview",
    iconCls: "exec-kpi-icon"
  }, {
    xtype: "quarterly",
    title: "Performance",
    iconCls: "exec-quarterly-icon"
  }, {
    xtype: "profitloss",
    title: "Profit & Loss",
    iconCls: "exec-pl-icon"
  }, {
    xtype: "news",
    title: "Company News",
    iconCls: "exec-news-icon"
  }],
  assistiveMenu: {
    items: [{
      text: "KPI Overview",
      height: 50,
      iconCls: "exec-kpi-icon"
    }, {
      text: "Performance",
      height: 50,
      iconCls: "exec-quarterly-icon"
    }, {
      text: "Profit & Loss",
      height: 50,
      iconCls: "exec-pl-icon"
    }, {
      text: "Company News",
      height: 50,
      iconCls: "exec-news-icon"
    }],
    listeners: {
      click: "onMenuClick"
    }
  }
}, 0, ["app-main"], ["component", "box", "container", "panel", "tabpanel",
  "app-main"
], {
  component: true,
  box: true,
  container: true,
  panel: true,
  tabpanel: true,
  "app-main": true
}, ["widget.app-main"], 0, [ExecDashboard.view.main, "Main"], 0));
(Ext.cmd.derive("ExecDashboard.Application", Ext.app.Application, {
  name: "ExecDashboard",
  defaultToken: "!kpi/clicks",
  views: ["ExecDashboard.view.main.Main"],
  launch: function() {
    if (Ext.browser.is.Gecko && Ext.browser.version.major < 28) {
      Ext.getBody().addCls("x-flex-wrap-broken")
    }
  }
}, 0, 0, 0, 0, 0, 0, [ExecDashboard, "Application"], 0));
(Ext.cmd.derive("ExecDashboard.store.News", Ext.data.Store, {
  model: "ExecDashboard.model.News",
  remoteFilter: true,
  proxy: {
    type: "memory",
    reader: "array",
    data: [
      [1, "news", "1/21/2013", "10:00 PM", "Teresa Hughes",
        "All News Releases", "photo-1.png", "Etiam faucibus cursus urna.",
        "Hey there where ya goin', not exactly knowin', who says you have to call just one place home. He's goin' everywhere, B.J. McKay and his best friend Bear. He just keeps on movin', ladies keep improvin', every day is better than the last. New dreams and better scenes, and best of all I don't pay property tax. Rollin' down to Dallas, who's providin' my palace, off to New Orleans or who knows where. Places new and ladies, too, I'm B.J. McKay and this is my best friend Bear."
      ],
      [2, "news", "12/27/2012", "01:11 PM", "Tina Gordon",
        "All News Releases", "photo-1.png",
        "In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.",
        "Barnaby The Bear's my name, never call me Jack or James, I will sing my way to fame, Barnaby the Bear's my name. Birds taught me to sing, when they took me to their king, first I had to fly, in the sky so high so high, so high so high so high, so - if you want to sing this way, think of what you'd like to say, add a tune and you will see, just how easy it can be. Treacle pudding, fish and chips, fizzy drinks and liquorice, flowers, rivers, sand and sea, snowflakes and the stars are free. La la la la la, la la la la la la la, la la la la la la la, la la la la la la la la la la la la la, so - Barnaby The Bear's my name, never call me Jack or James, I will sing my way to fame, Barnaby the Bear's my name.\n\nUlysses, Ulysses - Soaring through all the galaxies. In search of Earth, flying in to the night. Ulysses, Ulysses - Fighting evil and tyranny, with all his power, and with all of his might. Ulysses - no-one else can do the things you do. Ulysses - like a bolt of thunder from the blue. Ulysses - always fighting all the evil forces bringing peace and justice to all."
      ],
      [3, "news", "1/25/2013", "06:23 AM", "Paula Murray",
        "All News Releases", "photo-2.png",
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.",
        "There's a voice that keeps on calling me. Down the road, that's where I'll always be. Every stop I make, I make a new friend. Can't stay for long, just turn around and I'm gone again. Maybe tomorrow, I'll want to settle down, Until tomorrow, I'll just keep moving on.\n\nBarnaby The Bear's my name, never call me Jack or James, I will sing my way to fame, Barnaby the Bear's my name. Birds taught me to sing, when they took me to their king, first I had to fly, in the sky so high so high, so high so high so high, so - if you want to sing this way, think of what you'd like to say, add a tune and you will see, just how easy it can be. Treacle pudding, fish and chips, fizzy drinks and liquorice, flowers, rivers, sand and sea, snowflakes and the stars are free. La la la la la, la la la la la la la, la la la la la la la, la la la la la la la la la la la la la, so - Barnaby The Bear's my name, never call me Jack or James, I will sing my way to fame, Barnaby the Bear's my name."
      ],
      [4, "news", "11/14/2012", "08:22 AM", "Nicole Hudson",
        "All News Releases", "photo-1.png",
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus.",
        "I never spend much time in school but I taught ladies plenty. It's true I hire my body out for pay, hey hey. I've gotten burned over Cheryl Tiegs, blown up for Raquel Welch. But when I end up in the hay it's only hay, hey hey. I might jump an open drawbridge, or Tarzan from a vine. 'Cause I'm the unknown stuntman that makes Eastwood look so fine.\n\nTen years ago a crack commando unit was sent to prison by a military court for a crime they didn't commit. These men promptly escaped from a maximum security stockade to the Los Angeles underground. Today, still wanted by the government, they survive as soldiers of fortune. If you have a problem and no one else can help, and if you can find them, maybe you can hire the A-team.\n\nTop Cat! The most effectual Top Cat! Who's intellectual close friends get to call him T.C., providing it's with dignity. Top Cat! The indisputable leader of the gang. He's the boss, he's a pip, he's the championship. He's the most tip top, Top Cat."
      ],
      [5, "news", "7/24/2013", "03:11 AM", "James Welch",
        "All News Releases", "photo-3.png",
        "Morbi porttitor lorem id ligula.",
        "This is my boss, Jonathan Hart, a self-made millionaire, he's quite a guy. This is Mrs H., she's gorgeous, she's one lady who knows how to take care of herself. By the way, my name is Max. I take care of both of them, which ain't easy, 'cause when they met it was MURDER!\n\nTen years ago a crack commando unit was sent to prison by a military court for a crime they didn't commit. These men promptly escaped from a maximum security stockade to the Los Angeles underground. Today, still wanted by the government, they survive as soldiers of fortune. If you have a problem and no one else can help, and if you can find them, maybe you can hire the A-team.\n\nMutley, you snickering, floppy eared hound. When courage is needed, you're never around. Those medals you wear on your moth-eaten chest should be there for bungling at which you are best. So, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon. Howwww! Nab him, jab him, tab him, grab him, stop that pigeon now."
      ],
      [6, "forum", "5/30/2013", "10:00 PM", "Denise Lawrence",
        "Community Forum", "photo-2.png",
        "In hac habitasse platea dictumst.",
        "Ulysses, Ulysses - Soaring through all the galaxies. In search of Earth, flying in to the night. Ulysses, Ulysses - Fighting evil and tyranny, with all his power, and with all of his might. Ulysses - no-one else can do the things you do. Ulysses - like a bolt of thunder from the blue. Ulysses - always fighting all the evil forces bringing peace and justice to all.\n\nThere's a voice that keeps on calling me. Down the road, that's where I'll always be. Every stop I make, I make a new friend. Can't stay for long, just turn around and I'm gone again. Maybe tomorrow, I'll want to settle down, Until tomorrow, I'll just keep moving on.\n\n80 days around the world, we'll find a pot of gold just sitting where the rainbow's ending. Time - we'll fight against the time, and we'll fly on the white wings of the wind. 80 days around the world, no we won't say a word before the ship is really back. Round, round, all around the world. Round, all around the world. Round, all around the world. Round, all around the world."
      ],
      [7, "forum", "11/26/2012", "09:09 AM", "Maria Young",
        "Community Forum", "photo-3.png",
        "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
        "Ten years ago a crack commando unit was sent to prison by a military court for a crime they didn't commit. These men promptly escaped from a maximum security stockade to the Los Angeles underground. Today, still wanted by the government, they survive as soldiers of fortune. If you have a problem and no one else can help, and if you can find them, maybe you can hire the A-team.\n\nThere's a voice that keeps on calling me. Down the road, that's where I'll always be. Every stop I make, I make a new friend. Can't stay for long, just turn around and I'm gone again. Maybe tomorrow, I'll want to settle down, Until tomorrow, I'll just keep moving on.\n\nJust the good ol' boys, never meanin' no harm. Beats all you've ever saw, been in trouble with the law since the day they was born. Straight'nin' the curve, flat'nin' the hills. Someday the mountain might get 'em, but the law never will. Makin' their way, the only way they know how, that's just a little bit more than the law will allow. Just good ol' boys, wouldn't change if they could, fightin' the system like a true modern day Robin Hood."
      ],
      [8, "forum", "5/5/2013", "11:23 PM", "Jose Dean", "Community Forum",
        "photo-2.png", "Etiam vel augue.",
        "Thunder, thunder, thundercats, Ho! Thundercats are on the move, Thundercats are loose. Feel the magic, hear the roar, Thundercats are loose. Thunder, thunder, thunder, Thundercats! Thunder, thunder, thunder, Thundercats! Thunder, thunder, thunder, Thundercats! Thunder, thunder, thunder, Thundercats! Thundercats!\n\nTop Cat! The most effectual Top Cat! Who's intellectual close friends get to call him T.C., providing it's with dignity. Top Cat! The indisputable leader of the gang. He's the boss, he's a pip, he's the championship. He's the most tip top, Top Cat.\n\nUlysses, Ulysses - Soaring through all the galaxies. In search of Earth, flying in to the night. Ulysses, Ulysses - Fighting evil and tyranny, with all his power, and with all of his might. Ulysses - no-one else can do the things you do. Ulysses - like a bolt of thunder from the blue. Ulysses - always fighting all the evil forces bringing peace and justice to all."
      ],
      [9, "forum", "9/24/2012", "02:00 AM", "Carl Kennedy",
        "Community Forum", "photo-2.png", "In congue. Etiam justo.",
        "80 days around the world, we'll find a pot of gold just sitting where the rainbow's ending. Time - we'll fight against the time, and we'll fly on the white wings of the wind. 80 days around the world, no we won't say a word before the ship is really back. Round, round, all around the world. Round, all around the world. Round, all around the world. Round, all around the world.\n\nKnight Rider, a shadowy flight into the dangerous world of a man who does not exist. Michael Knight, a young loner on a crusade to champion the cause of the innocent, the helpless in a world of criminals who operate above the law.\n\nBarnaby The Bear's my name, never call me Jack or James, I will sing my way to fame, Barnaby the Bear's my name. Birds taught me to sing, when they took me to their king, first I had to fly, in the sky so high so high, so high so high so high, so - if you want to sing this way, think of what you'd like to say, add a tune and you will see, just how easy it can be. Treacle pudding, fish and chips, fizzy drinks and liquorice, flowers, rivers, sand and sea, snowflakes and the stars are free. La la la la la, la la la la la la la, la la la la la la la, la la la la la la la la la la la la la, so - Barnaby The Bear's my name, never call me Jack or James, I will sing my way to fame, Barnaby the Bear's my name."
      ],
      [10, "forum", "9/10/2013", "05:03 PM", "Louise Carpenter",
        "Community Forum", "photo-1.png",
        "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.",
        "One for all and all for one, Muskehounds are always ready. One for all and all for one, helping everybody. One for all and all for one, it's a pretty story. Sharing everything with fun, that's the way to be. One for all and all for one, Muskehounds are always ready. One for all and all for one, helping everybody. One for all and all for one, can sound pretty corny. If you've got a problem chum, think how it could be.\n\nMutley, you snickering, floppy eared hound. When courage is needed, you're never around. Those medals you wear on your moth-eaten chest should be there for bungling at which you are best. So, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon. Howwww! Nab him, jab him, tab him, grab him, stop that pigeon now.\n\n80 days around the world, we'll find a pot of gold just sitting where the rainbow's ending. Time - we'll fight against the time, and we'll fly on the white wings of the wind. 80 days around the world, no we won't say a word before the ship is really back. Round, round, all around the world. Round, all around the world. Round, all around the world. Round, all around the world."
      ]
    ]
  }
}, 0, 0, 0, 0, ["store.news"], 0, [ExecDashboard.store, "News"], 0));
(Ext.cmd.derive("ExecDashboard.store.StockOHLC", Ext.data.Store, {
    model: "ExecDashboard.model.StockOHLC",
    remoteFilter: true,
    proxy: {
      type: "memory",
      reader: "array",
      data: [
        [0, "AAPL", new Date("Jun 1 2012").getTime(), 600, 614, 578, 590],
        [1, "AAPL", new Date("Jul 1 2012").getTime(), 590, 609, 580, 580],
        [2, "AAPL", new Date("Aug 1 2012").getTime(), 580, 602, 578, 602],
        [3, "AAPL", new Date("Sep 1 2012").getTime(), 602, 614, 586, 586],
        [4, "AAPL", new Date("Oct 1 2012").getTime(), 586, 602, 565, 565],
        [5, "AAPL", new Date("Nov 1 2012").getTime(), 589, 605, 568, 568],
        [6, "AAPL", new Date("Dec 1 2012").getTime(), 586, 602, 565, 565],
        [7, "AAPL", new Date("Jan 1 2013").getTime(), 602, 614, 581, 581],
        [8, "AAPL", new Date("Feb 4 2013").getTime(), 581, 598, 570, 571],
        [9, "AAPL", new Date("Mar 3 2013").getTime(), 586, 602, 565, 565],
        [10, "AAPL", new Date("Apr 1 2013").getTime(), 596, 602, 595, 605],
        [11, "AAPL", new Date("May 1 2013").getTime(), 526, 546, 526, 530],
        [12, "AAPL", new Date("Jun 1 2013").getTime(), 544, 570, 540, 530],
        [13, "AAPL", new Date("Jul 1 2013").getTime(), 516, 612, 535, 575],
        [14, "AAPL", new Date("Aug 1 2013").getTime(), 526, 622, 525, 565],
        [15, "AAPL", new Date("Sep 1 2013").getTime(), 536, 632, 515, 535],
        [16, "AAPL", new Date("Oct 1 2013").getTime(), 546, 642, 565, 545],
        [17, "AAPL", new Date("Nov 1 2013").getTime(), 556, 662, 555, 515],
        [18, "AAPL", new Date("Dec 1 2013").getTime(), 566, 602, 565, 525],
        [19, "AAPL", new Date("Jan 1 2014").getTime(), 602, 614, 596, 516],
        [20, "AAPL", new Date("Feb 1 2014").getTime(), 586, 602, 565, 565],
        [22, "AAPL", new Date("Mar 1 2014").getTime(), 601, 606, 545, 565],
        [24, "AAPL", new Date("Apr 1 2014").getTime(), 586, 602, 565, 565],
        [26, "AAPL", new Date("May 1 2014").getTime(), 586, 604, 565, 565],
        [28, "GOOG", new Date("Jun 1 2012").getTime(), 700, 714, 678, 690],
        [29, "GOOG", new Date("Jul 1 2012").getTime(), 590, 709, 680, 680],
        [30, "GOOG", new Date("Aug 1 2012").getTime(), 680, 702, 678, 702],
        [31, "GOOG", new Date("Sep 1 2012").getTime(), 702, 714, 686, 686],
        [32, "GOOG", new Date("Oct 1 2012").getTime(), 686, 712, 625, 615],
        [33, "GOOG", new Date("Nov 1 2012").getTime(), 686, 722, 635, 655],
        [34, "GOOG", new Date("Dec 1 2012").getTime(), 686, 732, 645, 625],
        [35, "GOOG", new Date("Jan 1 2013").getTime(), 602, 634, 616, 656],
        [36, "GOOG", new Date("Feb 4 2013").getTime(), 616, 712, 665, 615],
        [37, "GOOG", new Date("Mar 3 2013").getTime(), 626, 742, 635, 685],
        [38, "GOOG", new Date("Apr 1 2013").getTime(), 636, 752, 665, 675],
        [39, "GOOG", new Date("May 1 2013").getTime(), 616, 742, 655, 635],
        [40, "GOOG", new Date("Jun 1 2013").getTime(), 656, 722, 665, 615],
        [41, "GOOG", new Date("Jul 1 2013").getTime(), 646, 732, 615, 605],
        [42, "GOOG", new Date("Aug 1 2013").getTime(), 616, 762, 695, 615],
        [43, "GOOG", new Date("Sep 1 2013").getTime(), 636, 772, 665, 635],
        [44, "GOOG", new Date("Oct 1 2013").getTime(), 716, 742, 665, 645],
        [45, "GOOG", new Date("Nov 1 2013").getTime(), 686, 712, 675, 615],
        [46, "GOOG", new Date("Dec 1 2013").getTime(), 656, 732, 660, 605],
        [47, "GOOG", new Date("Jan 1 2014").getTime(), 712, 744, 701, 616],
        [48, "GOOG", new Date("Feb 1 2014").getTime(), 686, 702, 665, 605],
        [50, "GOOG", new Date("Mar 1 2014").getTime(), 626, 732, 615, 660],
        [52, "GOOG", new Date("Apr 1 2014").getTime(), 626, 722, 635, 625],
        [54, "GOOG", new Date("May 1 2014").getTime(), 646, 752, 655, 645]
      ]
    }
  }, 0, 0, 0, 0, ["store.stockohlc"], 0, [ExecDashboard.store, "StockOHLC"],
  0));
Ext.application({
  name: "ExecDashboard",
  extend: ExecDashboard.Application,
  autoCreateViewport: "ExecDashboard.view.main.Main"
});
