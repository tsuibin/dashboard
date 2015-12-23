if (!Ext.window) {
  Ext.window = {}
}(function(e) {
  var b, k = ["constructor", "toString", "valueOf", "toLocaleString"],
    f = {},
    o = {},
    d = 0,
    l, i, q, g, a, m, c, h, p = function() {
      var t, s;
      i = Ext.Base;
      q = Ext.ClassManager;
      for (t = k.length; t-- > 0;) {
        s = (1 << t);
        o[f[s] = k[t]] = s
      }
      for (t in o) {
        d |= o[t]
      }
      d = ~d;
      Function.prototype.$isFunction = 1;
      h = !!(q && q.addAlias);
      g = Ext.Class.getPreprocessor("config").fn;
      a = Ext.Class.getPreprocessor("cachedConfig") && Ext.Class.getPreprocessor(
        "cachedConfig").fn;
      c = Ext.Class.getPreprocessor("privates") && Ext.Class.getPreprocessor(
        "privates").fn;
      m = Ext.ClassManager.postprocessors.deprecated && Ext.ClassManager.postprocessors
        .deprecated.fn;
      b = i.$staticMembers;
      if (!b) {
        b = [];
        for (l in i) {
          if (i.hasOwnProperty(l)) {
            b.push(l)
          }
        }
      }
      e.derive = j;
      return j.apply(this, arguments)
    },
    r = function(A, w, z) {
      var t = z.enumerableMembers,
        x = A.prototype,
        v, y, u, s;
      if (!w) {
        return
      }
      if (h) {
        A.addMembers(w)
      } else {
        for (v in w) {
          s = w[v];
          if (s && s.$isFunction && !s.$isClass && s !== Ext.emptyFn && s !==
            Ext.identityFn) {
            if (v in x) {
              s.$previous = x[v]
            }
            x[v] = y = s;
            y.$owner = A;
            y.$name = v
          } else {
            x[v] = s
          }
        }
        for (u = 1; t; u <<= 1) {
          if (t & u) {
            t &= ~u;
            v = f[u];
            x[v] = y = w[v];
            y.$owner = A;
            y.$name = v
          }
        }
      }
    },
    n = function(w) {
      var s = function v() {
          return w.apply(this, arguments) || null
        },
        u, t;
      s.prototype = Ext.Object.chain(w.prototype);
      for (u = b.length; u-- > 0;) {
        t = b[u];
        s[t] = i[t]
      }
      return s
    },
    j = function(x, A, V, s, z, J, y, S, v, L, E) {
      var t = function D() {
          return this.constructor.apply(this, arguments) || null
        },
        U = t,
        u = {
          enumerableMembers: s & d,
          onCreated: E,
          onBeforeCreated: r,
          aliases: S
        },
        H = V.alternateClassName || [],
        Q = Ext.global,
        M, P, R, G, O, Y, X, w, N, C, T, K, F, W, I = q.alternateToName || q.maps
        .alternateToName,
        B = q.nameToAlternates || q.maps.nameToAlternates;
      for (R = b.length; R-- > 0;) {
        X = b[R];
        t[X] = i[X]
      }
      if (V.$isFunction) {
        V = V(t)
      }
      u.data = V;
      C = V.statics;
      delete V.statics;
      V.$className = x;
      if ("$className" in V) {
        t.$className = V.$className
      }
      t.extend(A);
      N = t.prototype;
      t.xtype = V.xtype = z[0];
      if (z) {
        N.xtypes = z
      }
      N.xtypesChain = J;
      N.xtypesMap = y;
      V.alias = S;
      U.triggerExtended(t, V, u);
      if (V.onClassExtended) {
        t.onExtended(V.onClassExtended, t);
        delete V.onClassExtended
      }
      if (V.privates && c) {
        c.call(Ext.Class, t, V)
      }
      if (C) {
        if (h) {
          t.addStatics(C)
        } else {
          for (T in C) {
            if (C.hasOwnProperty(T)) {
              W = C[T];
              if (W && W.$isFunction && !W.$isClass && W !== Ext.emptyFn && W !==
                Ext.identityFn) {
                t[T] = F = W;
                F.$owner = t;
                F.$name = T
              }
              t[T] = W
            }
          }
        }
      }
      if (V.inheritableStatics) {
        t.addInheritableStatics(V.inheritableStatics);
        delete V.inheritableStatics
      }
      if (N.onClassExtended) {
        U.onExtended(N.onClassExtended, U);
        delete N.onClassExtended
      }
      if (V.config) {
        g.call(Ext.Class, t, V)
      }
      if (V.cachedConfig && a) {
        a.call(Ext.Class, t, V)
      }
      if (V.deprecated && m) {
        m.call(Ext.ClassManager, x, t, V)
      }
      u.onBeforeCreated(t, u.data, u);
      for (R = 0, O = v && v.length; R < O; ++R) {
        t.mixin.apply(t, v[R])
      }
      for (R = 0, O = S.length; R < O; R++) {
        M = S[R];
        q.setAlias ? q.setAlias(t, M) : q.addAlias(t, M)
      }
      if (V.singleton) {
        U = new t()
      }
      if (!(H instanceof Array)) {
        H = [H]
      }
      K = q.getName(U);
      for (R = 0, G = H.length; R < G; R++) {
        P = H[R];
        q.classes[P] = U;
        if (h) {
          q.addAlternate(t, P)
        } else {
          if (K) {
            I[P] = K;
            H = B[K] || (B[K] = []);
            H.push(P)
          }
        }
      }
      for (R = 0, O = L.length; R < O; R += 2) {
        Y = L[R];
        if (!Y) {
          Y = Q
        }
        Y[L[R + 1]] = U
      }
      q.classes[x] = U;
      if (!h) {
        if (K && K !== x) {
          I[x] = K;
          H = B[K] || (B[K] = []);
          H.push(x)
        }
      }
      delete N.alternateClassName;
      if (u.onCreated) {
        u.onCreated.call(U, U)
      }
      if (x) {
        q.triggerCreated(x)
      }
      return U
    };
  e.derive = p
}(Ext.cmd = {}));
var Ext = Ext || {};
Ext._startTime = Date.now ? Date.now() : (+new Date());
(function() {
  var b = this,
    g = Object.prototype,
    c = g.toString,
    m = ["valueOf", "toLocaleString", "toString", "constructor"],
    k = function() {},
    f = function() {},
    h = function(i) {
      return i
    },
    l = function() {
      var i = l.caller.caller;
      return i.$owner.prototype[i.$name].apply(this, arguments)
    },
    a = Ext.manifest || {},
    j, d =
    /\[object\s*(?:Array|Arguments|\w*Collection|\w*List|HTML\s+document\.all\s+class)\]/,
    e = /^\\?\/Date\(([-+])?(\d+)(?:[+-]\d{4})?\)\\?\/$/;
  Ext.global = b;
  k.$nullFn = h.$nullFn = k.$emptyFn = h.$identityFn = f.$nullFn = true;
  f.$privacy = "framework";
  Ext.suspendLayouts = Ext.resumeLayouts = k;
  for (j in {
      toString: 1
    }) {
    m = null
  }
  Ext.enumerables = m;
  Ext.apply = function(q, p, s) {
    if (s) {
      Ext.apply(q, s)
    }
    if (q && p && typeof p === "object") {
      var r, o, n;
      for (r in p) {
        q[r] = p[r]
      }
      if (m) {
        for (o = m.length; o--;) {
          n = m[o];
          if (p.hasOwnProperty(n)) {
            q[n] = p[n]
          }
        }
      }
    }
    return q
  };
  Ext.buildSettings = Ext.apply({
    baseCSSPrefix: "x-"
  }, Ext.buildSettings || {});
  Ext.apply(Ext, {
    idSeed: 0,
    idPrefix: "ext-",
    isSecure: /^https/i.test(window.location.protocol),
    enableGarbageCollector: false,
    enableListenerCollection: true,
    name: Ext.sandboxName || "Ext",
    privateFn: f,
    emptyFn: k,
    identityFn: h,
    frameStartTime: +new Date(),
    manifest: a,
    enableAria: true,
    enableAriaButtons: true,
    enableAriaPanels: true,
    startsWithHashRe: /^#/,
    validIdRe: /^[a-z_][a-z0-9\-_]*$/i,
    BLANK_IMAGE_URL: "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    makeIdSelector: function(i) {
      return "#" + i
    },
    id: function(n, i) {
      if (n && n.id) {
        return n.id
      }
      var p = (i || Ext.idPrefix) + (++Ext.idSeed);
      if (n) {
        n.id = p
      }
      return p
    },
    returnId: function(i) {
      return i.getId()
    },
    returnTrue: function() {
      return true
    },
    emptyString: new String(),
    baseCSSPrefix: Ext.buildSettings.baseCSSPrefix,
    $eventNameMap: {},
    $vendorEventRe: /^(Moz.+|MS.+|webkit.+)/,
    canonicalEventName: function(i) {
      return Ext.$eventNameMap[i] || (Ext.$eventNameMap[i] = (Ext.$vendorEventRe
        .test(i) ? i : i.toLowerCase()))
    },
    applyIf: function(n, i) {
      var o;
      if (n) {
        for (o in i) {
          if (n[o] === undefined) {
            n[o] = i[o]
          }
        }
      }
      return n
    },
    now: (b.performance && b.performance.now) ? function() {
      return performance.now()
    } : (Date.now || (Date.now = function() {
      return +new Date()
    })),
    destroy: function() {
      var p = arguments.length,
        o, n;
      for (o = 0; o < p; o++) {
        n = arguments[o];
        if (n) {
          if (Ext.isArray(n)) {
            this.destroy.apply(this, n)
          } else {
            if (Ext.isFunction(n.destroy)) {
              n.destroy()
            }
          }
        }
      }
      return null
    },
    destroyMembers: function(q) {
      for (var s, p, r = 1, o = arguments, n = o.length; r < n; r++) {
        s = q[p = o[r]];
        if (s != null) {
          q[p] = Ext.destroy(s)
        }
      }
    },
    override: function(p, q) {
      if (p.$isClass) {
        p.override(q)
      } else {
        if (typeof p === "function") {
          Ext.apply(p.prototype, q)
        } else {
          var i = p.self,
            n, o;
          if (i && i.$isClass) {
            for (n in q) {
              if (q.hasOwnProperty(n)) {
                o = q[n];
                if (typeof o === "function") {
                  o.$name = n;
                  o.$owner = i;
                  o.$previous = p.hasOwnProperty(n) ? p[n] : l
                }
                p[n] = o
              }
            }
          } else {
            Ext.apply(p, q)
          }
        }
      }
      return p
    },
    valueFrom: function(o, i, n) {
      return Ext.isEmpty(o, n) ? i : o
    },
    isEmpty: function(i, n) {
      return (i == null) || (!n ? i === "" : false) || (Ext.isArray(i) &&
        i.length === 0)
    },
    isArray: ("isArray" in Array) ? Array.isArray : function(i) {
      return c.call(i) === "[object Array]"
    },
    isDate: function(i) {
      return c.call(i) === "[object Date]"
    },
    isMSDate: function(i) {
      if (!Ext.isString(i)) {
        return false
      }
      return e.test(i)
    },
    isObject: (c.call(null) === "[object Object]") ? function(i) {
      return i !== null && i !== undefined && c.call(i) ===
        "[object Object]" && i.ownerDocument === undefined
    } : function(i) {
      return c.call(i) === "[object Object]"
    },
    isSimpleObject: function(i) {
      return i instanceof Object && i.constructor === Object
    },
    isPrimitive: function(n) {
      var i = typeof n;
      return i === "string" || i === "number" || i === "boolean"
    },
    isFunction: (typeof document !== "undefined" && typeof document.getElementsByTagName(
      "body") === "function") ? function(i) {
      return !!i && c.call(i) === "[object Function]"
    } : function(i) {
      return !!i && typeof i === "function"
    },
    isNumber: function(i) {
      return typeof i === "number" && isFinite(i)
    },
    isNumeric: function(i) {
      return !isNaN(parseFloat(i)) && isFinite(i)
    },
    isString: function(i) {
      return typeof i === "string"
    },
    isBoolean: function(i) {
      return typeof i === "boolean"
    },
    isElement: function(i) {
      return i ? i.nodeType === 1 : false
    },
    isTextNode: function(i) {
      return i ? i.nodeName === "#text" : false
    },
    isDefined: function(i) {
      return typeof i !== "undefined"
    },
    isIterable: function(i) {
      if (!i || typeof i.length !== "number" || typeof i === "string" ||
        Ext.isFunction(i)) {
        return false
      }
      if (!i.propertyIsEnumerable) {
        return !!i.item
      }
      if (i.hasOwnProperty("length") && !i.propertyIsEnumerable(
          "length")) {
        return true
      }
      return d.test(c.call(i))
    },
    isDebugEnabled: k,
    clone: function(s) {
      if (s === null || s === undefined) {
        return s
      }
      if (s.nodeType && s.cloneNode) {
        return s.cloneNode(true)
      }
      var r = c.call(s),
        q, o, n, t, p;
      if (r === "[object Date]") {
        return new Date(s.getTime())
      }
      if (r === "[object Array]") {
        q = s.length;
        t = [];
        while (q--) {
          t[q] = Ext.clone(s[q])
        }
      } else {
        if (r === "[object Object]" && s.constructor === Object) {
          t = {};
          for (p in s) {
            t[p] = Ext.clone(s[p])
          }
          if (m) {
            for (o = m.length; o--;) {
              n = m[o];
              if (s.hasOwnProperty(n)) {
                t[n] = s[n]
              }
            }
          }
        }
      }
      return t || s
    },
    getUniqueGlobalNamespace: function() {
      var o = this.uniqueGlobalNamespace,
        n;
      if (o === undefined) {
        n = 0;
        do {
          o = "ExtBox" + (++n)
        } while (b[o] !== undefined);
        b[o] = Ext;
        this.uniqueGlobalNamespace = o
      }
      return o
    },
    functionFactoryCache: {},
    cacheableFunctionFactory: function() {
      var r = this,
        o = Array.prototype.slice.call(arguments),
        n = r.functionFactoryCache,
        i, p, q;
      if (Ext.isSandboxed) {
        q = o.length;
        if (q > 0) {
          q--;
          o[q] = "var Ext=window." + Ext.name + ";" + o[q]
        }
      }
      i = o.join("");
      p = n[i];
      if (!p) {
        p = Function.prototype.constructor.apply(Function.prototype, o);
        n[i] = p
      }
      return p
    },
    functionFactory: function() {
      var i = Array.prototype.slice.call(arguments),
        n;
      if (Ext.isSandboxed) {
        n = i.length;
        if (n > 0) {
          n--;
          i[n] = "var Ext=window." + Ext.name + ";" + i[n]
        }
      }
      return Function.prototype.constructor.apply(Function.prototype, i)
    },
    Logger: {
      verbose: k,
      log: k,
      info: k,
      warn: k,
      error: function(i) {
        throw new Error(i)
      },
      deprecate: k
    },
    getElementById: function(i) {
      return document.getElementById(i)
    },
    splitAndUnescape: (function() {
      var i = {};
      return function(p, o) {
        if (!p) {
          return []
        } else {
          if (!o) {
            return [p]
          }
        }
        var r = i[o] || (i[o] = new RegExp("\\\\" + o, "g")),
          n = [],
          s, q;
        s = p.split(o);
        while ((q = s.shift()) !== undefined) {
          while (q.charAt(q.length - 1) === "\\" && s.length > 0) {
            q = q + o + s.shift()
          }
          q = q.replace(r, o);
          n.push(q)
        }
        return n
      }
    })()
  });
  Ext.returnTrue.$nullFn = Ext.returnId.$nullFn = true
}());
(function() {
  function a() {
    var c = this,
      b = c.sourceClass,
      e = c.sourceMethod,
      d = c.msg;
    if (e) {
      if (d) {
        e += "(): ";
        e += d
      } else {
        e += "()"
      }
    }
    if (b) {
      e = e ? (b + "." + e) : b
    }
    return e || d || ""
  }
  Ext.Error = function(c) {
    if (Ext.isString(c)) {
      c = {
        msg: c
      }
    }
    var b = new Error();
    Ext.apply(b, c);
    b.message = b.message || b.msg;
    b.toString = a;
    return b
  };
  Ext.apply(Ext.Error, {
    ignore: false,
    raise: function(d) {
      d = d || {};
      if (Ext.isString(d)) {
        d = {
          msg: d
        }
      }
      var c = this,
        f = c.raise.caller,
        e, b;
      if (f === Ext.raise) {
        f = f.caller
      }
      if (f) {
        if (!d.sourceMethod && (b = f.$name)) {
          d.sourceMethod = b
        }
        if (!d.sourceClass && (b = f.$owner) && (b = b.$className)) {
          d.sourceClass = b
        }
      }
      if (c.handle(d) !== true) {
        e = a.call(d);
        throw new Ext.Error(d)
      }
    },
    handle: function() {
      return this.ignore
    }
  })
})();
Ext.deprecated = function(a) {
  return Ext.emptyFn
};
Ext.raise = function() {
  Ext.Error.raise.apply(Ext.Error, arguments)
};
Ext.Array = (function() {
  var c = Array.prototype,
    k = c.slice,
    m = (function() {
      var u = [],
        e, t = 20;
      if (!u.splice) {
        return false
      }
      while (t--) {
        u.push("A")
      }
      u.splice(15, 0, "F", "F", "F", "F", "F", "F", "F", "F", "F", "F",
        "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F");
      e = u.length;
      u.splice(13, 0, "XXX");
      if (e + 1 !== u.length) {
        return false
      }
      return true
    }()),
    l = "indexOf" in c,
    g = true;

  function j(w, t) {
    var e = w.length,
      v = new Array(e),
      u;
    for (u = 0; u < e; u++) {
      v[u] = u
    }
    v.sort(function(y, x) {
      return t(w[y], w[x]) || (y - x)
    });
    for (u = 0; u < e; u++) {
      v[u] = w[v[u]]
    }
    for (u = 0; u < e; u++) {
      w[u] = v[u]
    }
    return w
  }
  try {
    if (typeof document !== "undefined") {
      k.call(document.getElementsByTagName("body"))
    }
  } catch (o) {
    g = false
  }
  var i = function(t, e) {
      return (e < 0) ? Math.max(0, t.length + e) : Math.min(t.length, e)
    },
    s = function(A, z, t, D) {
      var E = D ? D.length : 0,
        v = A.length,
        B = i(A, z);
      if (B === v) {
        if (E) {
          A.push.apply(A, D)
        }
      } else {
        var y = Math.min(t, v - B),
          C = B + y,
          u = C + E - y,
          e = v - C,
          w = v - y,
          x;
        if (u < C) {
          for (x = 0; x < e; ++x) {
            A[u + x] = A[C + x]
          }
        } else {
          if (u > C) {
            for (x = e; x--;) {
              A[u + x] = A[C + x]
            }
          }
        }
        if (E && B === w) {
          A.length = w;
          A.push.apply(A, D)
        } else {
          A.length = w + E;
          for (x = 0; x < E; ++x) {
            A[B + x] = D[x]
          }
        }
      }
      return A
    },
    f = function(v, e, u, t) {
      if (t && t.length) {
        if (e === 0 && !u) {
          v.unshift.apply(v, t)
        } else {
          if (e < v.length) {
            v.splice.apply(v, [e, u].concat(t))
          } else {
            v.push.apply(v, t)
          }
        }
      } else {
        v.splice(e, u)
      }
      return v
    },
    b = function(u, e, t) {
      return s(u, e, t)
    },
    n = function(u, e, t) {
      u.splice(e, t);
      return u
    },
    h = function(w, e, u) {
      var v = i(w, e),
        t = w.slice(e, i(w, v + u));
      if (arguments.length < 4) {
        s(w, v, u)
      } else {
        s(w, v, u, k.call(arguments, 3))
      }
      return t
    },
    d = function(e) {
      return e.splice.apply(e, k.call(arguments, 1))
    },
    r = m ? n : b,
    p = m ? f : s,
    q = m ? d : h,
    a = {
      binarySearch: function(z, w, u, e, y) {
        var v = z.length,
          t, x;
        if (u instanceof Function) {
          y = u;
          u = 0;
          e = v
        } else {
          if (e instanceof Function) {
            y = e;
            e = v
          } else {
            if (u === undefined) {
              u = 0
            }
            if (e === undefined) {
              e = v
            }
            y = y || a.lexicalCompare
          }
        }--e;
        while (u <= e) {
          t = (u + e) >> 1;
          x = y(w, z[t]);
          if (x >= 0) {
            u = t + 1
          } else {
            if (x < 0) {
              e = t - 1
            }
          }
        }
        return u
      },
      defaultCompare: function(e, t) {
        return (e < t) ? -1 : ((e > t) ? 1 : 0)
      },
      lexicalCompare: function(e, t) {
        e = String(e);
        t = String(t);
        return (e < t) ? -1 : ((e > t) ? 1 : 0)
      },
      each: function(x, v, u, e) {
        x = a.from(x);
        var t, w = x.length;
        if (e !== true) {
          for (t = 0; t < w; t++) {
            if (v.call(u || x[t], x[t], t, x) === false) {
              return t
            }
          }
        } else {
          for (t = w - 1; t > -1; t--) {
            if (v.call(u || x[t], x[t], t, x) === false) {
              return t
            }
          }
        }
        return true
      },
      forEach: ("forEach" in c) ? function(u, t, e) {
        return u.forEach(t, e)
      } : function(w, u, t) {
        for (var e = 0, v = w.length; e < v; e++) {
          u.call(t, w[e], e, w)
        }
      },
      indexOf: l ? function(u, e, t) {
        return c.indexOf.call(u, e, t)
      } : function(w, u, v) {
        var e, t = w.length;
        for (e = (v < 0) ? Math.max(0, t + v) : v || 0; e < t; e++) {
          if (w[e] === u) {
            return e
          }
        }
        return -1
      },
      contains: l ? function(t, e) {
        return c.indexOf.call(t, e) !== -1
      } : function(v, u) {
        var e, t;
        for (e = 0, t = v.length; e < t; e++) {
          if (v[e] === u) {
            return true
          }
        }
        return false
      },
      toArray: function(u, w, e) {
        if (!u || !u.length) {
          return []
        }
        if (typeof u === "string") {
          u = u.split("")
        }
        if (g) {
          return k.call(u, w || 0, e || u.length)
        }
        var v = [],
          t;
        w = w || 0;
        e = e ? ((e < 0) ? u.length + e : e) : u.length;
        for (t = w; t < e; t++) {
          v.push(u[t])
        }
        return v
      },
      pluck: function(x, e) {
        var t = [],
          u, w, v;
        for (u = 0, w = x.length; u < w; u++) {
          v = x[u];
          t.push(v[e])
        }
        return t
      },
      map: ("map" in c) ? function(u, t, e) {
        return u.map(t, e)
      } : function(x, w, v) {
        var u = [],
          e = x.length,
          t;
        for (t = 0; t < e; t++) {
          u[t] = w.call(v, x[t], t, x)
        }
        return u
      },
      every: ("every" in c) ? function(u, t, e) {
        return u.every(t, e)
      } : function(w, u, t) {
        var e = 0,
          v = w.length;
        for (; e < v; ++e) {
          if (!u.call(t, w[e], e, w)) {
            return false
          }
        }
        return true
      },
      some: ("some" in c) ? function(u, t, e) {
        return u.some(t, e)
      } : function(w, u, t) {
        var e = 0,
          v = w.length;
        for (; e < v; ++e) {
          if (u.call(t, w[e], e, w)) {
            return true
          }
        }
        return false
      },
      equals: function(w, v) {
        var t = w.length,
          e = v.length,
          u;
        if (w === v) {
          return true
        }
        if (t !== e) {
          return false
        }
        for (u = 0; u < t; ++u) {
          if (w[u] !== v[u]) {
            return false
          }
        }
        return true
      },
      clean: function(w) {
        var t = [],
          e = 0,
          v = w.length,
          u;
        for (; e < v; e++) {
          u = w[e];
          if (!Ext.isEmpty(u)) {
            t.push(u)
          }
        }
        return t
      },
      unique: function(w) {
        var v = [],
          e = 0,
          u = w.length,
          t;
        for (; e < u; e++) {
          t = w[e];
          if (a.indexOf(v, t) === -1) {
            v.push(t)
          }
        }
        return v
      },
      filter: ("filter" in c) ? function(u, t, e) {
        return u.filter(t, e)
      } : function(x, v, u) {
        var t = [],
          e = 0,
          w = x.length;
        for (; e < w; e++) {
          if (v.call(u, x[e], e, x)) {
            t.push(x[e])
          }
        }
        return t
      },
      findBy: function(w, v, u) {
        var t = 0,
          e = w.length;
        for (; t < e; t++) {
          if (v.call(u || w, w[t], t)) {
            return w[t]
          }
        }
        return null
      },
      from: function(u, t) {
        if (u === undefined || u === null) {
          return []
        }
        if (Ext.isArray(u)) {
          return (t) ? k.call(u) : u
        }
        var e = typeof u;
        if (u && u.length !== undefined && e !== "string" && (e !==
            "function" || !u.apply)) {
          return a.toArray(u)
        }
        return [u]
      },
      remove: function(u, t) {
        var e = a.indexOf(u, t);
        if (e !== -1) {
          r(u, e, 1)
        }
        return u
      },
      removeAt: function(v, t, u) {
        var e = v.length;
        if (t >= 0 && t < e) {
          u = u || 1;
          u = Math.min(u, e - t);
          r(v, t, u)
        }
        return v
      },
      include: function(t, e) {
        if (!a.contains(t, e)) {
          t.push(e)
        }
      },
      clone: function(e) {
        return k.call(e)
      },
      merge: function() {
        var e = k.call(arguments),
          v = [],
          t, u;
        for (t = 0, u = e.length; t < u; t++) {
          v = v.concat(e[t])
        }
        return a.unique(v)
      },
      intersect: function() {
        var e = [],
          u = k.call(arguments),
          F, D, z, C, G, v, t, B, E, w, A, y, x;
        if (!u.length) {
          return e
        }
        F = u.length;
        for (A = G = 0; A < F; A++) {
          v = u[A];
          if (!C || v.length < C.length) {
            C = v;
            G = A
          }
        }
        C = a.unique(C);
        r(u, G, 1);
        t = C.length;
        F = u.length;
        for (A = 0; A < t; A++) {
          B = C[A];
          w = 0;
          for (y = 0; y < F; y++) {
            D = u[y];
            z = D.length;
            for (x = 0; x < z; x++) {
              E = D[x];
              if (B === E) {
                w++;
                break
              }
            }
          }
          if (w === F) {
            e.push(B)
          }
        }
        return e
      },
      difference: function(t, e) {
        var y = k.call(t),
          w = y.length,
          v, u, x;
        for (v = 0, x = e.length; v < x; v++) {
          for (u = 0; u < w; u++) {
            if (y[u] === e[v]) {
              r(y, u, 1);
              u--;
              w--
            }
          }
        }
        return y
      },
      reduce: Array.prototype.reduce ? function(u, t, e) {
        if (arguments.length === 3) {
          return Array.prototype.reduce.call(u, t, e)
        }
        return Array.prototype.reduce.call(u, t)
      } : function(x, w, e) {
        x = Object(x);
        var u = 0,
          v = x.length >>> 0,
          t = e;
        if (arguments.length < 3) {
          while (true) {
            if (u in x) {
              t = x[u++];
              break
            }
            if (++u >= v) {
              throw new TypeError(
                "Reduce of empty array with no initial value")
            }
          }
        }
        for (; u < v; ++u) {
          if (u in x) {
            t = w(t, x[u], u, x)
          }
        }
        return t
      },
      slice: ([1, 2].slice(1, undefined).length ? function(u, t, e) {
        return k.call(u, t, e)
      } : function(u, t, e) {
        if (typeof t === "undefined") {
          return k.call(u)
        }
        if (typeof e === "undefined") {
          return k.call(u, t)
        }
        return k.call(u, t, e)
      }),
      sort: function(t, e) {
        return j(t, e || a.lexicalCompare)
      },
      flatten: function(u) {
        var t = [];

        function e(w) {
          var y, z, x;
          for (y = 0, z = w.length; y < z; y++) {
            x = w[y];
            if (Ext.isArray(x)) {
              e(x)
            } else {
              t.push(x)
            }
          }
          return t
        }
        return e(u)
      },
      min: function(x, w) {
        var t = x[0],
          e, v, u;
        for (e = 0, v = x.length; e < v; e++) {
          u = x[e];
          if (w) {
            if (w(t, u) === 1) {
              t = u
            }
          } else {
            if (u < t) {
              t = u
            }
          }
        }
        return t
      },
      max: function(x, w) {
        var e = x[0],
          t, v, u;
        for (t = 0, v = x.length; t < v; t++) {
          u = x[t];
          if (w) {
            if (w(e, u) === -1) {
              e = u
            }
          } else {
            if (u > e) {
              e = u
            }
          }
        }
        return e
      },
      mean: function(e) {
        return e.length > 0 ? a.sum(e) / e.length : undefined
      },
      sum: function(w) {
        var t = 0,
          e, v, u;
        for (e = 0, v = w.length; e < v; e++) {
          u = w[e];
          t += u
        }
        return t
      },
      toMap: function(w, e, u) {
        var v = {},
          t = w.length;
        if (!e) {
          while (t--) {
            v[w[t]] = t + 1
          }
        } else {
          if (typeof e === "string") {
            while (t--) {
              v[w[t][e]] = t + 1
            }
          } else {
            while (t--) {
              v[e.call(u, w[t])] = t + 1
            }
          }
        }
        return v
      },
      toValueMap: function(y, v, D, x) {
        var e = {},
          u = y.length,
          t, w, B, z, C, A;
        if (!v) {
          while (u--) {
            A = y[u];
            e[A] = A
          }
        } else {
          if (!(z = (typeof v !== "string"))) {
            x = D
          }
          w = x === 1;
          t = x === 2;
          while (u--) {
            A = y[u];
            C = z ? v.call(D, A) : A[v];
            if (w) {
              if (C in e) {
                e[C].push(A)
              } else {
                e[C] = [A]
              }
            } else {
              if (t && (C in e)) {
                if ((B = e[C]) instanceof Array) {
                  B.push(A)
                } else {
                  e[C] = [B, A]
                }
              } else {
                e[C] = A
              }
            }
          }
        }
        return e
      },
      erase: r,
      insert: function(u, t, e) {
        return p(u, t, 0, e)
      },
      move: function(x, t, v) {
        if (v === t) {
          return
        }
        var u = x[t],
          w = v > t ? 1 : -1,
          e;
        for (e = t; e != v; e += w) {
          x[e] = x[e + w]
        }
        x[v] = u
      },
      replace: p,
      splice: q,
      push: function(v) {
        var e = arguments.length,
          u = 1,
          t;
        if (v === undefined) {
          v = []
        } else {
          if (!Ext.isArray(v)) {
            v = [v]
          }
        }
        for (; u < e; u++) {
          t = arguments[u];
          Array.prototype.push[Ext.isIterable(t) ? "apply" : "call"](v, t)
        }
        return v
      },
      numericSortFn: function(t, e) {
        return t - e
      }
    };
  Ext.each = a.each;
  a.union = a.merge;
  Ext.min = a.min;
  Ext.max = a.max;
  Ext.sum = a.sum;
  Ext.mean = a.mean;
  Ext.flatten = a.flatten;
  Ext.clean = a.clean;
  Ext.unique = a.unique;
  Ext.pluck = a.pluck;
  Ext.toArray = function() {
    return a.toArray.apply(a, arguments)
  };
  return a
}());
Ext.String = (function() {
  var h =
    /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g,
    l = /('|\\)/g,
    b = /([-.*+?\^${}()|\[\]\/\\])/g,
    n = /^\s+|\s+$/g,
    i = /\s+/,
    k = /(^[^a-z]*|[^\w])/gi,
    e, a, g, d, f = function(p, o) {
      return e[o]
    },
    j = function(p, o) {
      return (o in a) ? a[o] : String.fromCharCode(parseInt(o.substr(2), 10))
    },
    c = function(p, o) {
      if (p === null || p === undefined || o === null || o === undefined) {
        return false
      }
      return o.length <= p.length
    },
    m;
  return m = {
    insert: function(q, r, p) {
      if (!q) {
        return r
      }
      if (!r) {
        return q
      }
      var o = q.length;
      if (!p && p !== 0) {
        p = o
      }
      if (p < 0) {
        p *= -1;
        if (p >= o) {
          p = 0
        } else {
          p = o - p
        }
      }
      if (p === 0) {
        q = r + q
      } else {
        if (p >= q.length) {
          q += r
        } else {
          q = q.substr(0, p) + r + q.substr(p)
        }
      }
      return q
    },
    startsWith: function(q, r, p) {
      var o = c(q, r);
      if (o) {
        if (p) {
          q = q.toLowerCase();
          r = r.toLowerCase()
        }
        o = q.lastIndexOf(r, 0) === 0
      }
      return o
    },
    endsWith: function(r, p, q) {
      var o = c(r, p);
      if (o) {
        if (q) {
          r = r.toLowerCase();
          p = p.toLowerCase()
        }
        o = r.indexOf(p, r.length - p.length) !== -1
      }
      return o
    },
    createVarName: function(o) {
      return o.replace(k, "")
    },
    htmlEncode: function(o) {
      return (!o) ? o : String(o).replace(g, f)
    },
    htmlDecode: function(o) {
      return (!o) ? o : String(o).replace(d, j)
    },
    hasHtmlCharacters: function(o) {
      return g.test(o)
    },
    addCharacterEntities: function(p) {
      var o = [],
        s = [],
        q, r;
      for (q in p) {
        r = p[q];
        a[q] = r;
        e[r] = q;
        o.push(r);
        s.push(q)
      }
      g = new RegExp("(" + o.join("|") + ")", "g");
      d = new RegExp("(" + s.join("|") + "|&#[0-9]{1,5};)", "g")
    },
    resetCharacterEntities: function() {
      e = {};
      a = {};
      this.addCharacterEntities({
        "&amp;": "&",
        "&gt;": ">",
        "&lt;": "<",
        "&quot;": '"',
        "&#39;": "'"
      })
    },
    urlAppend: function(p, o) {
      if (!Ext.isEmpty(o)) {
        return p + (p.indexOf("?") === -1 ? "?" : "&") + o
      }
      return p
    },
    trim: function(o) {
      if (o) {
        o = o.replace(h, "")
      }
      return o || ""
    },
    capitalize: function(o) {
      if (o) {
        o = o.charAt(0).toUpperCase() + o.substr(1)
      }
      return o || ""
    },
    uncapitalize: function(o) {
      if (o) {
        o = o.charAt(0).toLowerCase() + o.substr(1)
      }
      return o || ""
    },
    ellipsis: function(q, p, r) {
      if (q && q.length > p) {
        if (r) {
          var s = q.substr(0, p - 2),
            o = Math.max(s.lastIndexOf(" "), s.lastIndexOf("."), s.lastIndexOf(
              "!"), s.lastIndexOf("?"));
          if (o !== -1 && o >= (p - 15)) {
            return s.substr(0, o) + "..."
          }
        }
        return q.substr(0, p - 3) + "..."
      }
      return q
    },
    escapeRegex: function(o) {
      return o.replace(b, "\\$1")
    },
    createRegex: function(s, r, p, o) {
      var q = s;
      if (s != null && !s.exec) {
        q = m.escapeRegex(String(s));
        if (r !== false) {
          q = "^" + q
        }
        if (p !== false) {
          q += "$"
        }
        q = new RegExp(q, (o !== false) ? "i" : "")
      }
      return q
    },
    escape: function(o) {
      return o.replace(l, "\\$1")
    },
    toggle: function(p, q, o) {
      return p === q ? o : q
    },
    leftPad: function(p, q, r) {
      var o = String(p);
      r = r || " ";
      while (o.length < q) {
        o = r + o
      }
      return o
    },
    repeat: function(s, r, p) {
      if (r < 1) {
        r = 0
      }
      for (var o = [], q = r; q--;) {
        o.push(s)
      }
      return o.join(p || "")
    },
    splitWords: function(o) {
      if (o && typeof o == "string") {
        return o.replace(n, "").split(i)
      }
      return o || []
    }
  }
}());
Ext.String.resetCharacterEntities();
Ext.htmlEncode = Ext.String.htmlEncode;
Ext.htmlDecode = Ext.String.htmlDecode;
Ext.urlAppend = Ext.String.urlAppend;
Ext.Date = (function() {
  var f, e = Date,
    k = /(\\.)/g,
    a = /([gGhHisucUOPZ]|MS)/,
    g = /([djzmnYycU]|MS)/,
    j = /\\/gi,
    c = /\{(\d+)\}/g,
    h = new RegExp("\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/"),
    d = Ext.String.leftPad,
    b = [
      "var me = this, dt, y, m, d, h, i, s, ms, o, O, z, zz, u, v, W, year, jan4, week1monday, daysInMonth, dayMatched,",
      "def = me.defaults,", "from = Ext.Number.from,",
      "results = String(input).match(me.parseRegexes[{0}]);",
      "if(results){", "{1}", "if(u != null){", "v = new Date(u * 1000);",
      "}else{", "dt = me.clearTime(new Date);",
      "y = from(y, from(def.y, dt.getFullYear()));",
      "m = from(m, from(def.m - 1, dt.getMonth()));",
      "dayMatched = d !== undefined;",
      "d = from(d, from(def.d, dt.getDate()));", "if (!dayMatched) {",
      "dt.setDate(1);", "dt.setMonth(m);", "dt.setFullYear(y);",
      "daysInMonth = me.getDaysInMonth(dt);", "if (d > daysInMonth) {",
      "d = daysInMonth;", "}", "}",
      "h  = from(h, from(def.h, dt.getHours()));",
      "i  = from(i, from(def.i, dt.getMinutes()));",
      "s  = from(s, from(def.s, dt.getSeconds()));",
      "ms = from(ms, from(def.ms, dt.getMilliseconds()));",
      "if(z >= 0 && y >= 0){",
      "v = me.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), me.YEAR, y < 100 ? y - 100 : 0);",
      "v = !strict? v : (strict === true && (z <= 364 || (me.isLeapYear(v) && z <= 365))? me.add(v, me.DAY, z) : null);",
      "}else if(strict === true && !me.isValid(y, m + 1, d, h, i, s, ms)){",
      "v = null;", "}else{", "if (W) {",
      "year = y || (new Date()).getFullYear();",
      "jan4 = new Date(year, 0, 4, 0, 0, 0);", "d = jan4.getDay();",
      "week1monday = new Date(jan4.getTime() - ((d === 0 ? 6 : d - 1) * 86400000));",
      "v = Ext.Date.clearTime(new Date(week1monday.getTime() + ((W - 1) * 604800000 + 43200000)));",
      "} else {",
      "v = me.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), me.YEAR, y < 100 ? y - 100 : 0);",
      "}", "}", "}", "}", "if(v){", "if(zz != null){",
      "v = me.add(v, me.SECOND, -v.getTimezoneOffset() * 60 - zz);",
      "}else if(o){",
      "v = me.add(v, me.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));",
      "}", "}", "return (v != null) ? v : null;"
    ].join("\n");
  if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function() {
      var l = this;
      return d(l.getUTCFullYear(), 4, "0") + "-" + d(l.getUTCMonth() + 1,
        2, "0") + "-" + d(l.getUTCDate(), 2, "0") + "T" + d(l.getUTCHours(),
        2, "0") + ":" + d(l.getUTCMinutes(), 2, "0") + ":" + d(l.getUTCSeconds(),
        2, "0") + "." + d(l.getUTCMilliseconds(), 3, "0") + "Z"
    }
  }

  function i(m) {
    var l = Array.prototype.slice.call(arguments, 1);
    return m.replace(c, function(n, o) {
      return l[o]
    })
  }
  return f = {
    now: e.now,
    toString: function(l) {
      if (!l) {
        l = new e()
      }
      return l.getFullYear() + "-" + d(l.getMonth() + 1, 2, "0") + "-" +
        d(l.getDate(), 2, "0") + "T" + d(l.getHours(), 2, "0") + ":" +
        d(l.getMinutes(), 2, "0") + ":" + d(l.getSeconds(), 2, "0")
    },
    getElapsed: function(m, l) {
      return Math.abs(m - (l || f.now()))
    },
    useStrict: false,
    formatCodeToRegex: function(m, l) {
      var n = f.parseCodes[m];
      if (n) {
        n = typeof n === "function" ? n() : n;
        f.parseCodes[m] = n
      }
      return n ? Ext.applyIf({
        c: n.c ? i(n.c, l || "{0}") : n.c
      }, n) : {
        g: 0,
        c: null,
        s: Ext.String.escapeRegex(m)
      }
    },
    parseFunctions: {
      MS: function(m, l) {
        var n = (m || "").match(h);
        return n ? new e(((n[1] || "") + n[2]) * 1) : null
      },
      time: function(m, l) {
        var n = parseInt(m, 10);
        if (n || n === 0) {
          return new e(n)
        }
        return null
      },
      timestamp: function(m, l) {
        var n = parseInt(m, 10);
        if (n || n === 0) {
          return new e(n * 1000)
        }
        return null
      }
    },
    parseRegexes: [],
    formatFunctions: {
      MS: function() {
        return "\\/Date(" + this.getTime() + ")\\/"
      },
      time: function() {
        return this.getTime().toString()
      },
      timestamp: function() {
        return f.format(this, "U")
      }
    },
    y2kYear: 50,
    MILLI: "ms",
    SECOND: "s",
    MINUTE: "mi",
    HOUR: "h",
    DAY: "d",
    MONTH: "mo",
    YEAR: "y",
    defaults: {},
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday"
    ],
    monthNames: ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    monthNumbers: {
      January: 0,
      Jan: 0,
      February: 1,
      Feb: 1,
      March: 2,
      Mar: 2,
      April: 3,
      Apr: 3,
      May: 4,
      June: 5,
      Jun: 5,
      July: 6,
      Jul: 6,
      August: 7,
      Aug: 7,
      September: 8,
      Sep: 8,
      October: 9,
      Oct: 9,
      November: 10,
      Nov: 10,
      December: 11,
      Dec: 11
    },
    defaultFormat: "m/d/Y",
    getShortMonthName: function(l) {
      return f.monthNames[l].substring(0, 3)
    },
    getShortDayName: function(l) {
      return f.dayNames[l].substring(0, 3)
    },
    getMonthNumber: function(l) {
      return f.monthNumbers[l.substring(0, 1).toUpperCase() + l.substring(
        1, 3).toLowerCase()]
    },
    formatContainsHourInfo: function(l) {
      return a.test(l.replace(k, ""))
    },
    formatContainsDateInfo: function(l) {
      return g.test(l.replace(k, ""))
    },
    unescapeFormat: function(l) {
      return l.replace(j, "")
    },
    formatCodes: {
      d: "Ext.String.leftPad(m.getDate(), 2, '0')",
      D: "Ext.Date.getShortDayName(m.getDay())",
      j: "m.getDate()",
      l: "Ext.Date.dayNames[m.getDay()]",
      N: "(m.getDay() ? m.getDay() : 7)",
      S: "Ext.Date.getSuffix(m)",
      w: "m.getDay()",
      z: "Ext.Date.getDayOfYear(m)",
      W: "Ext.String.leftPad(Ext.Date.getWeekOfYear(m), 2, '0')",
      F: "Ext.Date.monthNames[m.getMonth()]",
      m: "Ext.String.leftPad(m.getMonth() + 1, 2, '0')",
      M: "Ext.Date.getShortMonthName(m.getMonth())",
      n: "(m.getMonth() + 1)",
      t: "Ext.Date.getDaysInMonth(m)",
      L: "(Ext.Date.isLeapYear(m) ? 1 : 0)",
      o: "(m.getFullYear() + (Ext.Date.getWeekOfYear(m) == 1 && m.getMonth() > 0 ? +1 : (Ext.Date.getWeekOfYear(m) >= 52 && m.getMonth() < 11 ? -1 : 0)))",
      Y: "Ext.String.leftPad(m.getFullYear(), 4, '0')",
      y: "('' + m.getFullYear()).substring(2, 4)",
      a: "(m.getHours() < 12 ? 'am' : 'pm')",
      A: "(m.getHours() < 12 ? 'AM' : 'PM')",
      g: "((m.getHours() % 12) ? m.getHours() % 12 : 12)",
      G: "m.getHours()",
      h: "Ext.String.leftPad((m.getHours() % 12) ? m.getHours() % 12 : 12, 2, '0')",
      H: "Ext.String.leftPad(m.getHours(), 2, '0')",
      i: "Ext.String.leftPad(m.getMinutes(), 2, '0')",
      s: "Ext.String.leftPad(m.getSeconds(), 2, '0')",
      u: "Ext.String.leftPad(m.getMilliseconds(), 3, '0')",
      O: "Ext.Date.getGMTOffset(m)",
      P: "Ext.Date.getGMTOffset(m, true)",
      T: "Ext.Date.getTimezone(m)",
      Z: "(m.getTimezoneOffset() * -60)",
      c: function() {
        var q = "Y-m-dTH:i:sP",
          o = [],
          n, m = q.length,
          p;
        for (n = 0; n < m; ++n) {
          p = q.charAt(n);
          o.push(p === "T" ? "'T'" : f.getFormatCode(p))
        }
        return o.join(" + ")
      },
      C: function() {
        return "m.toISOString()"
      },
      U: "Math.round(m.getTime() / 1000)"
    },
    isValid: function(u, l, t, q, o, p, n) {
      q = q || 0;
      o = o || 0;
      p = p || 0;
      n = n || 0;
      var r = f.add(new e(u < 100 ? 100 : u, l - 1, t, q, o, p, n), f.YEAR,
        u < 100 ? u - 100 : 0);
      return u === r.getFullYear() && l === r.getMonth() + 1 && t === r
        .getDate() && q === r.getHours() && o === r.getMinutes() && p ===
        r.getSeconds() && n === r.getMilliseconds()
    },
    parse: function(m, o, l) {
      var n = f.parseFunctions;
      if (n[o] == null) {
        f.createParser(o)
      }
      return n[o].call(f, m, Ext.isDefined(l) ? l : f.useStrict)
    },
    parseDate: function(m, n, l) {
      return f.parse(m, n, l)
    },
    getFormatCode: function(m) {
      var l = f.formatCodes[m];
      if (l) {
        l = typeof l === "function" ? l() : l;
        f.formatCodes[m] = l
      }
      return l || ("'" + Ext.String.escape(m) + "'")
    },
    createFormat: function(p) {
      var o = [],
        l = false,
        n = "",
        m;
      for (m = 0; m < p.length; ++m) {
        n = p.charAt(m);
        if (!l && n === "\\") {
          l = true
        } else {
          if (l) {
            l = false;
            o.push("'" + Ext.String.escape(n) + "'")
          } else {
            if (n === "\n") {
              o.push("'\\n'")
            } else {
              o.push(f.getFormatCode(n))
            }
          }
        }
      }
      f.formatFunctions[p] = Ext.functionFactory("var m=this;return " +
        o.join("+"))
    },
    createParser: function(u) {
      var m = f.parseRegexes.length,
        v = 1,
        n = [],
        t = [],
        r = false,
        l = "",
        p = 0,
        q = u.length,
        s = [],
        o;
      for (; p < q; ++p) {
        l = u.charAt(p);
        if (!r && l === "\\") {
          r = true
        } else {
          if (r) {
            r = false;
            t.push(Ext.String.escape(l))
          } else {
            o = f.formatCodeToRegex(l, v);
            v += o.g;
            t.push(o.s);
            if (o.g && o.c) {
              if (o.calcAtEnd) {
                s.push(o.c)
              } else {
                n.push(o.c)
              }
            }
          }
        }
      }
      n = n.concat(s);
      f.parseRegexes[m] = new RegExp("^" + t.join("") + "$", "i");
      f.parseFunctions[u] = Ext.functionFactory("input", "strict", i(b,
        m, n.join("")))
    },
    parseCodes: {
      d: {
        g: 1,
        c: "d = parseInt(results[{0}], 10);\n",
        s: "(3[0-1]|[1-2][0-9]|0[1-9])"
      },
      j: {
        g: 1,
        c: "d = parseInt(results[{0}], 10);\n",
        s: "(3[0-1]|[1-2][0-9]|[1-9])"
      },
      D: function() {
        for (var l = [], m = 0; m < 7; l.push(f.getShortDayName(m)), ++
          m) {}
        return {
          g: 0,
          c: null,
          s: "(?:" + l.join("|") + ")"
        }
      },
      l: function() {
        return {
          g: 0,
          c: null,
          s: "(?:" + f.dayNames.join("|") + ")"
        }
      },
      N: {
        g: 0,
        c: null,
        s: "[1-7]"
      },
      S: {
        g: 0,
        c: null,
        s: "(?:st|nd|rd|th)"
      },
      w: {
        g: 0,
        c: null,
        s: "[0-6]"
      },
      z: {
        g: 1,
        c: "z = parseInt(results[{0}], 10);\n",
        s: "(\\d{1,3})"
      },
      W: {
        g: 1,
        c: "W = parseInt(results[{0}], 10);\n",
        s: "(\\d{2})"
      },
      F: function() {
        return {
          g: 1,
          c: "m = parseInt(me.getMonthNumber(results[{0}]), 10);\n",
          s: "(" + f.monthNames.join("|") + ")"
        }
      },
      M: function() {
        for (var l = [], m = 0; m < 12; l.push(f.getShortMonthName(m)), ++
          m) {}
        return Ext.applyIf({
          s: "(" + l.join("|") + ")"
        }, f.formatCodeToRegex("F"))
      },
      m: {
        g: 1,
        c: "m = parseInt(results[{0}], 10) - 1;\n",
        s: "(1[0-2]|0[1-9])"
      },
      n: {
        g: 1,
        c: "m = parseInt(results[{0}], 10) - 1;\n",
        s: "(1[0-2]|[1-9])"
      },
      t: {
        g: 0,
        c: null,
        s: "(?:\\d{2})"
      },
      L: {
        g: 0,
        c: null,
        s: "(?:1|0)"
      },
      o: {
        g: 1,
        c: "y = parseInt(results[{0}], 10);\n",
        s: "(\\d{4})"
      },
      Y: {
        g: 1,
        c: "y = parseInt(results[{0}], 10);\n",
        s: "(\\d{4})"
      },
      y: {
        g: 1,
        c: "var ty = parseInt(results[{0}], 10);\ny = ty > me.y2kYear ? 1900 + ty : 2000 + ty;\n",
        s: "(\\d{2})"
      },
      a: {
        g: 1,
        c: "if (/(am)/i.test(results[{0}])) {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
        s: "(am|pm|AM|PM)",
        calcAtEnd: true
      },
      A: {
        g: 1,
        c: "if (/(am)/i.test(results[{0}])) {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
        s: "(AM|PM|am|pm)",
        calcAtEnd: true
      },
      g: {
        g: 1,
        c: "h = parseInt(results[{0}], 10);\n",
        s: "(1[0-2]|[0-9])"
      },
      G: {
        g: 1,
        c: "h = parseInt(results[{0}], 10);\n",
        s: "(2[0-3]|1[0-9]|[0-9])"
      },
      h: {
        g: 1,
        c: "h = parseInt(results[{0}], 10);\n",
        s: "(1[0-2]|0[1-9])"
      },
      H: {
        g: 1,
        c: "h = parseInt(results[{0}], 10);\n",
        s: "(2[0-3]|[0-1][0-9])"
      },
      i: {
        g: 1,
        c: "i = parseInt(results[{0}], 10);\n",
        s: "([0-5][0-9])"
      },
      s: {
        g: 1,
        c: "s = parseInt(results[{0}], 10);\n",
        s: "([0-5][0-9])"
      },
      u: {
        g: 1,
        c: "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
        s: "(\\d+)"
      },
      O: {
        g: 1,
        c: ["o = results[{0}];", "var sn = o.substring(0,1),",
          "hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),",
          "mn = o.substring(3,5) % 60;",
          "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n"
        ].join("\n"),
        s: "([+-]\\d{4})"
      },
      P: {
        g: 1,
        c: ["o = results[{0}];", "var sn = o.substring(0,1),",
          "hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),",
          "mn = o.substring(4,6) % 60;",
          "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n"
        ].join("\n"),
        s: "([+-]\\d{2}:\\d{2})"
      },
      T: {
        g: 0,
        c: null,
        s: "[A-Z]{1,5}"
      },
      Z: {
        g: 1,
        c: "zz = results[{0}] * 1;\nzz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
        s: "([+-]?\\d{1,5})"
      },
      c: function() {
        var o = [],
          m = [f.formatCodeToRegex("Y", 1), f.formatCodeToRegex("m", 2),
            f.formatCodeToRegex("d", 3), f.formatCodeToRegex("H", 4), f
            .formatCodeToRegex("i", 5), f.formatCodeToRegex("s", 6), {
              c: "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"
            }, {
              c: ["if(results[8]) {", "if(results[8] == 'Z'){",
                "zz = 0;", "}else if (results[8].indexOf(':') > -1){",
                f.formatCodeToRegex("P", 8).c, "}else{", f.formatCodeToRegex(
                  "O", 8).c, "}", "}"
              ].join("\n")
            }
          ],
          p, n;
        for (p = 0, n = m.length; p < n; ++p) {
          o.push(m[p].c)
        }
        return {
          g: 1,
          c: o.join(""),
          s: [m[0].s, "(?:", "-", m[1].s, "(?:", "-", m[2].s, "(?:",
            "(?:T| )?", m[3].s, ":", m[4].s, "(?::", m[5].s, ")?",
            "(?:(?:\\.|,)(\\d+))?", "(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?",
            ")?", ")?", ")?"
          ].join("")
        }
      },
      U: {
        g: 1,
        c: "u = parseInt(results[{0}], 10);\n",
        s: "(-?\\d+)"
      }
    },
    dateFormat: function(l, m) {
      return f.format(l, m)
    },
    isEqual: function(m, l) {
      if (m && l) {
        return (m.getTime() === l.getTime())
      }
      return !(m || l)
    },
    format: function(m, n) {
      var l = f.formatFunctions;
      if (!Ext.isDate(m)) {
        return ""
      }
      if (l[n] == null) {
        f.createFormat(n)
      }
      return l[n].call(m) + ""
    },
    getTimezone: function(l) {
      return l.toString().replace(
        /^.* (?:\((.*)\)|([A-Z]{1,5})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/,
        "$1$2").replace(/[^A-Z]/g, "")
    },
    getGMTOffset: function(l, m) {
      var n = l.getTimezoneOffset();
      return (n > 0 ? "-" : "+") + Ext.String.leftPad(Math.floor(Math.abs(
        n) / 60), 2, "0") + (m ? ":" : "") + Ext.String.leftPad(Math.abs(
        n % 60), 2, "0")
    },
    getDayOfYear: function(o) {
      var n = 0,
        q = f.clone(o),
        l = o.getMonth(),
        p;
      for (p = 0, q.setDate(1), q.setMonth(0); p < l; q.setMonth(++p)) {
        n += f.getDaysInMonth(q)
      }
      return n + o.getDate() - 1
    },
    getWeekOfYear: (function() {
      var l = 86400000,
        m = 7 * l;
      return function(o) {
        var p = e.UTC(o.getFullYear(), o.getMonth(), o.getDate() +
            3) / l,
          n = Math.floor(p / 7),
          q = new e(n * m).getUTCFullYear();
        return n - Math.floor(e.UTC(q, 0, 7) / m) + 1
      }
    }()),
    isLeapYear: function(l) {
      var m = l.getFullYear();
      return !!((m & 3) === 0 && (m % 100 || (m % 400 === 0 && m)))
    },
    getFirstDayOfMonth: function(m) {
      var l = (m.getDay() - (m.getDate() - 1)) % 7;
      return (l < 0) ? (l + 7) : l
    },
    getLastDayOfMonth: function(l) {
      return f.getLastDateOfMonth(l).getDay()
    },
    getFirstDateOfMonth: function(l) {
      return new e(l.getFullYear(), l.getMonth(), 1)
    },
    getLastDateOfMonth: function(l) {
      return new e(l.getFullYear(), l.getMonth(), f.getDaysInMonth(l))
    },
    getDaysInMonth: (function() {
      var l = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return function(o) {
        var n = o.getMonth();
        return n === 1 && f.isLeapYear(o) ? 29 : l[n]
      }
    }()),
    getSuffix: function(l) {
      switch (l.getDate()) {
        case 1:
        case 21:
        case 31:
          return "st";
        case 2:
        case 22:
          return "nd";
        case 3:
        case 23:
          return "rd";
        default:
          return "th"
      }
    },
    clone: function(l) {
      return new e(l.getTime())
    },
    isDST: function(l) {
      return new e(l.getFullYear(), 0, 1).getTimezoneOffset() !== l.getTimezoneOffset()
    },
    clearTime: function(l, p) {
      if (p) {
        return f.clearTime(f.clone(l))
      }
      var n = l.getDate(),
        m, o;
      l.setHours(0);
      l.setMinutes(0);
      l.setSeconds(0);
      l.setMilliseconds(0);
      if (l.getDate() !== n) {
        for (m = 1, o = f.add(l, f.HOUR, m); o.getDate() !== n; m++, o =
          f.add(l, f.HOUR, m)) {}
        l.setDate(n);
        l.setHours(o.getHours())
      }
      return l
    },
    add: function(n, m, q) {
      var r = f.clone(n),
        l, p, o = 0;
      if (!m || q === 0) {
        return r
      }
      p = q - parseInt(q, 10);
      q = parseInt(q, 10);
      if (q) {
        switch (m.toLowerCase()) {
          case f.MILLI:
            r.setTime(r.getTime() + q);
            break;
          case f.SECOND:
            r.setTime(r.getTime() + q * 1000);
            break;
          case f.MINUTE:
            r.setTime(r.getTime() + q * 60 * 1000);
            break;
          case f.HOUR:
            r.setTime(r.getTime() + q * 60 * 60 * 1000);
            break;
          case f.DAY:
            r.setDate(r.getDate() + q);
            break;
          case f.MONTH:
            l = n.getDate();
            if (l > 28) {
              l = Math.min(l, f.getLastDateOfMonth(f.add(f.getFirstDateOfMonth(
                n), f.MONTH, q)).getDate())
            }
            r.setDate(l);
            r.setMonth(n.getMonth() + q);
            break;
          case f.YEAR:
            l = n.getDate();
            if (l > 28) {
              l = Math.min(l, f.getLastDateOfMonth(f.add(f.getFirstDateOfMonth(
                n), f.YEAR, q)).getDate())
            }
            r.setDate(l);
            r.setFullYear(n.getFullYear() + q);
            break
        }
      }
      if (p) {
        switch (m.toLowerCase()) {
          case f.MILLI:
            o = 1;
            break;
          case f.SECOND:
            o = 1000;
            break;
          case f.MINUTE:
            o = 1000 * 60;
            break;
          case f.HOUR:
            o = 1000 * 60 * 60;
            break;
          case f.DAY:
            o = 1000 * 60 * 60 * 24;
            break;
          case f.MONTH:
            l = f.getDaysInMonth(r);
            o = 1000 * 60 * 60 * 24 * l;
            break;
          case f.YEAR:
            l = (f.isLeapYear(r) ? 366 : 365);
            o = 1000 * 60 * 60 * 24 * l;
            break
        }
        if (o) {
          r.setTime(r.getTime() + o * p)
        }
      }
      return r
    },
    subtract: function(m, l, n) {
      return f.add(m, l, -n)
    },
    between: function(m, o, l) {
      var n = m.getTime();
      return o.getTime() <= n && n <= l.getTime()
    },
    compat: function() {
      var t, u = ["useStrict", "formatCodeToRegex", "parseFunctions",
          "parseRegexes", "formatFunctions", "y2kYear", "MILLI",
          "SECOND", "MINUTE", "HOUR", "DAY", "MONTH", "YEAR",
          "defaults", "dayNames", "monthNames", "monthNumbers",
          "getShortMonthName", "getShortDayName", "getMonthNumber",
          "formatCodes", "isValid", "parseDate", "getFormatCode",
          "createFormat", "createParser", "parseCodes"
        ],
        r = ["dateFormat", "format", "getTimezone", "getGMTOffset",
          "getDayOfYear", "getWeekOfYear", "isLeapYear",
          "getFirstDayOfMonth", "getLastDayOfMonth", "getDaysInMonth",
          "getSuffix", "clone", "isDST", "clearTime", "add", "between"
        ],
        m = u.length,
        l = r.length,
        o, q, n;
      for (n = 0; n < m; n++) {
        o = u[n];
        e[o] = f[o]
      }
      for (t = 0; t < l; t++) {
        q = r[t];
        e.prototype[q] = function() {
          var p = Array.prototype.slice.call(arguments);
          p.unshift(this);
          return f[q].apply(f, p)
        }
      }
    },
    diff: function(m, l, o) {
      var n, p = +l - m;
      switch (o) {
        case f.MILLI:
          return p;
        case f.SECOND:
          return Math.floor(p / 1000);
        case f.MINUTE:
          return Math.floor(p / 60000);
        case f.HOUR:
          return Math.floor(p / 3600000);
        case f.DAY:
          return Math.floor(p / 86400000);
        case "w":
          return Math.floor(p / 604800000);
        case f.MONTH:
          n = (l.getFullYear() * 12 + l.getMonth()) - (m.getFullYear() *
            12 + m.getMonth());
          if (f.add(m, o, n) > l) {
            return n - 1
          }
          return n;
        case f.YEAR:
          n = l.getFullYear() - m.getFullYear();
          if (f.add(m, o, n) > l) {
            return n - 1
          } else {
            return n
          }
      }
    },
    align: function(m, o, n) {
      var l = new e(+m);
      switch (o.toLowerCase()) {
        case f.MILLI:
          return l;
        case f.SECOND:
          l.setUTCSeconds(l.getUTCSeconds() - l.getUTCSeconds() % n);
          l.setUTCMilliseconds(0);
          return l;
        case f.MINUTE:
          l.setUTCMinutes(l.getUTCMinutes() - l.getUTCMinutes() % n);
          l.setUTCSeconds(0);
          l.setUTCMilliseconds(0);
          return l;
        case f.HOUR:
          l.setUTCHours(l.getUTCHours() - l.getUTCHours() % n);
          l.setUTCMinutes(0);
          l.setUTCSeconds(0);
          l.setUTCMilliseconds(0);
          return l;
        case f.DAY:
          if (n === 7 || n === 14) {
            l.setUTCDate(l.getUTCDate() - l.getUTCDay() + 1)
          }
          l.setUTCHours(0);
          l.setUTCMinutes(0);
          l.setUTCSeconds(0);
          l.setUTCMilliseconds(0);
          return l;
        case f.MONTH:
          l.setUTCMonth(l.getUTCMonth() - (l.getUTCMonth() - 1) % n, 1);
          l.setUTCHours(0);
          l.setUTCMinutes(0);
          l.setUTCSeconds(0);
          l.setUTCMilliseconds(0);
          return l;
        case f.YEAR:
          l.setUTCFullYear(l.getUTCFullYear() - l.getUTCFullYear() % n,
            1, 1);
          l.setUTCHours(0);
          l.setUTCMinutes(0);
          l.setUTCSeconds(0);
          l.setUTCMilliseconds(0);
          return m
      }
    }
  }
}());
Ext.Function = (function() {
  var b = 0,
    l, e = [],
    m = [],
    h = 0,
    i = {},
    g = window,
    d = Ext.global,
    f = !!(d.setImmediate && d.clearImmediate),
    k = g.requestAnimationFrame || g.webkitRequestAnimationFrame || g.mozRequestAnimationFrame ||
    g.oRequestAnimationFrame || function(q) {
      var n = Ext.now(),
        o = Math.max(0, 16 - (n - b)),
        p = g.setTimeout(function() {
          q(n + o)
        }, o);
      b = n + o;
      return p
    },
    c = function() {
      var n = e.length,
        q, o, p;
      l = null;
      for (o = 0; o < n; o++) {
        p = e[o];
        q = p[3];
        if (i[q]) {
          p[0].apply(p[1] || d, p[2] || m);
          delete i[q]
        }
      }
      e = e.slice(n)
    },
    a = function() {
      Ext.elevateFunction(c)
    },
    j = {
      flexSetter: function(n) {
        return function(p, r) {
          var o, q;
          if (p !== null) {
            if (typeof p !== "string") {
              for (o in p) {
                if (p.hasOwnProperty(o)) {
                  n.call(this, o, p[o])
                }
              }
              if (Ext.enumerables) {
                for (q = Ext.enumerables.length; q--;) {
                  o = Ext.enumerables[q];
                  if (p.hasOwnProperty(o)) {
                    n.call(this, o, p[o])
                  }
                }
              }
            } else {
              n.call(this, p, r)
            }
          }
          return this
        }
      },
      bind: function(q, p, o, n) {
        if (arguments.length === 2) {
          return function() {
            return q.apply(p, arguments)
          }
        }
        var s = q,
          r = Array.prototype.slice;
        return function() {
          var t = o || arguments;
          if (n === true) {
            t = r.call(arguments, 0);
            t = t.concat(o)
          } else {
            if (typeof n === "number") {
              t = r.call(arguments, 0);
              Ext.Array.insert(t, n, o)
            }
          }
          return s.apply(p || d, t)
        }
      },
      bindCallback: function(r, q, p, o, n) {
        return function() {
          var s = Ext.Array.slice(arguments);
          return Ext.callback(r, q, p ? p.concat(s) : s, o, n)
        }
      },
      pass: function(p, n, o) {
        if (!Ext.isArray(n)) {
          if (Ext.isIterable(n)) {
            n = Ext.Array.clone(n)
          } else {
            n = n !== undefined ? [n] : []
          }
        }
        return function() {
          var q = n.slice();
          q.push.apply(q, arguments);
          return p.apply(o || this, q)
        }
      },
      alias: function(o, n) {
        return function() {
          return o[n].apply(o, arguments)
        }
      },
      clone: function(n) {
        return function() {
          return n.apply(this, arguments)
        }
      },
      createInterceptor: function(q, p, o, n) {
        if (!Ext.isFunction(p)) {
          return q
        } else {
          n = Ext.isDefined(n) ? n : null;
          return function() {
            var s = this,
              r = arguments;
            return (p.apply(o || s || d, r) !== false) ? q.apply(s || d,
              r) : n
          }
        }
      },
      createDelayed: function(r, p, q, o, n) {
        if (q || o) {
          r = Ext.Function.bind(r, q, o, n)
        }
        return function() {
          var t = this,
            s = Array.prototype.slice.call(arguments);
          setTimeout(function() {
            if (Ext.elevateFunction) {
              Ext.elevateFunction(r, t, s)
            } else {
              r.apply(t, s)
            }
          }, p)
        }
      },
      defer: function(r, p, q, o, n) {
        r = Ext.Function.bind(r, q, o, n);
        if (p > 0) {
          return setTimeout(function() {
            if (Ext.elevateFunction) {
              Ext.elevateFunction(r)
            } else {
              r()
            }
          }, p)
        }
        r();
        return 0
      },
      interval: function(r, p, q, o, n) {
        r = Ext.Function.bind(r, q, o, n);
        return setInterval(function() {
          if (Ext.elevateFunction) {
            Ext.elevateFunction(r)
          } else {
            r()
          }
        }, p)
      },
      createSequence: function(o, p, n) {
        if (!p) {
          return o
        } else {
          return function() {
            var q = o.apply(this, arguments);
            p.apply(n || this, arguments);
            return q
          }
        }
      },
      createBuffered: function(r, o, q, p) {
        var n;
        return function() {
          var t = p || Array.prototype.slice.call(arguments, 0),
            s = q || this;
          if (n) {
            clearTimeout(n)
          }
          n = setTimeout(function() {
            if (Ext.elevateFunction) {
              Ext.elevateFunction(r, s, t)
            } else {
              r.apply(s, t)
            }
          }, o)
        }
      },
      createAnimationFrame: function(q, p, o, r) {
        var n;
        r = r || 3;
        return function() {
          var s = o || Array.prototype.slice.call(arguments, 0);
          p = p || this;
          if (r === 3 && n) {
            j.cancelAnimationFrame(n)
          }
          if ((r & 1) || !n) {
            n = j.requestAnimationFrame(function() {
              n = null;
              q.apply(p, s)
            })
          }
        }
      },
      requestAnimationFrame: function(q, p, n) {
        var r = ++h,
          o = Array.prototype.slice.call(arguments, 0);
        o[3] = r;
        i[r] = 1;
        e.push(o);
        if (!l) {
          l = k(Ext.elevateFunction ? a : c)
        }
        return r
      },
      cancelAnimationFrame: function(n) {
        delete i[n]
      },
      createThrottled: function(r, o, q) {
        var s = 0,
          n, p, u, t = function() {
            if (Ext.elevateFunction) {
              Ext.elevateFunction(r, q, p)
            } else {
              r.apply(q, p)
            }
            s = Ext.now();
            u = null
          };
        return function() {
          if (!q) {
            q = this
          }
          n = Ext.now() - s;
          p = arguments;
          if (n >= o) {
            clearTimeout(u);
            t()
          } else {
            if (!u) {
              u = Ext.defer(t, o - n)
            }
          }
        }
      },
      createBarrier: function(p, o, n) {
        return function() {
          if (!--p) {
            o.apply(n, arguments)
          }
        }
      },
      interceptBefore: function(o, n, q, p) {
        var r = o[n] || Ext.emptyFn;
        return (o[n] = function() {
          var s = q.apply(p || this, arguments);
          r.apply(this, arguments);
          return s
        })
      },
      interceptAfter: function(o, n, q, p) {
        var r = o[n] || Ext.emptyFn;
        return (o[n] = function() {
          r.apply(this, arguments);
          return q.apply(p || this, arguments)
        })
      },
      makeCallback: function(o, n) {
        return function() {
          return n[o].apply(n, arguments)
        }
      },
      memoize: function(q, p, n) {
        var o = {},
          r = n && Ext.isFunction(n);
        return function(t) {
          var s = r ? n.apply(p, arguments) : t;
          if (!(s in o)) {
            o[s] = q.apply(p, arguments)
          }
          return o[s]
        }
      }
    };
  Ext.asap = f ? function(o, n, p) {
    if (n != null || p != null) {
      o = j.bind(o, n, p)
    }
    return setImmediate(function() {
      if (Ext.elevateFunction) {
        Ext.elevateFunction(o)
      } else {
        o()
      }
    })
  } : function(o, n, p) {
    if (n != null || p != null) {
      o = j.bind(o, n, p)
    }
    return setTimeout(function() {
      if (Ext.elevateFunction) {
        Ext.elevateFunction(o)
      } else {
        o()
      }
    }, 0, true)
  }, Ext.asapCancel = f ? clearImmediate : clearTimeout;
  Ext.defer = j.defer;
  Ext.interval = j.interval;
  Ext.pass = j.pass;
  Ext.bind = j.bind;
  Ext.deferCallback = j.requestAnimationFrame;
  return j
})();
Ext.Number = (new function() {
  var d = this,
    c = (0.9).toFixed() !== "1",
    b = Math,
    a = {
      count: false,
      inclusive: false,
      wrap: true
    };
  Ext.apply(d, {
    Clip: {
      DEFAULT: a,
      COUNT: Ext.applyIf({
        count: true
      }, a),
      INCLUSIVE: Ext.applyIf({
        inclusive: true
      }, a),
      NOWRAP: Ext.applyIf({
        wrap: false
      }, a)
    },
    clipIndices: function(l, m, g) {
      g = g || a;
      var f = 0,
        k = g.wrap,
        j, e, h;
      m = m || [];
      for (h = 0; h < 2; ++h) {
        j = e;
        e = m[h];
        if (e == null) {
          e = f
        } else {
          if (h && g.count) {
            e += j;
            e = (e > l) ? l : e
          } else {
            if (k) {
              e = (e < 0) ? (l + e) : e
            }
            if (h && g.inclusive) {
              ++e
            }
            e = (e < 0) ? 0 : ((e > l) ? l : e)
          }
        }
        f = l
      }
      m[0] = j;
      m[1] = (e < j) ? j : e;
      return m
    },
    constrain: function(h, g, f) {
      var e = parseFloat(h);
      if (g === null) {
        g = h
      }
      if (f === null) {
        f = h
      }
      return (e < g) ? g : ((e > f) ? f : e)
    },
    snap: function(h, f, g, i) {
      var e;
      if (h === undefined || h < g) {
        return g || 0
      }
      if (f) {
        e = h % f;
        if (e !== 0) {
          h -= e;
          if (e * 2 >= f) {
            h += f
          } else {
            if (e * 2 < -f) {
              h -= f
            }
          }
        }
      }
      return d.constrain(h, g, i)
    },
    snapInRange: function(h, e, g, i) {
      var f;
      g = (g || 0);
      if (h === undefined || h < g) {
        return g
      }
      if (e && (f = ((h - g) % e))) {
        h -= f;
        f *= 2;
        if (f >= e) {
          h += e
        }
      }
      if (i !== undefined) {
        if (h > (i = d.snapInRange(i, e, g))) {
          h = i
        }
      }
      return h
    },
    sign: function(e) {
      e = +e;
      if (e === 0 || isNaN(e)) {
        return e
      }
      return (e > 0) ? 1 : -1
    },
    toFixed: c ? function(g, e) {
      e = e || 0;
      var f = b.pow(10, e);
      return (b.round(g * f) / f).toFixed(e)
    } : function(f, e) {
      return f.toFixed(e)
    },
    from: function(f, e) {
      if (isFinite(f)) {
        f = parseFloat(f)
      }
      return !isNaN(f) ? f : e
    },
    randomInt: function(f, e) {
      return b.floor(b.random() * (e - f + 1) + f)
    },
    correctFloat: function(e) {
      return parseFloat(e.toPrecision(14))
    }
  });
  Ext.num = function() {
    return d.from.apply(this, arguments)
  }
}());
(function() {
  var d = function() {},
    b = /^\?/,
    c = /(\[):?([^\]]*)\]/g,
    a = /^([^\[]+)/,
    f = /\+/g,
    e = Ext.Object = {
      chain: Object.create || function(h) {
        d.prototype = h;
        var g = new d();
        d.prototype = null;
        return g
      },
      clear: function(g) {
        for (var h in g) {
          delete g[h]
        }
        return g
      },
      freeze: Object.freeze ? function(i, g) {
        if (i && typeof i === "object" && !Object.isFrozen(i)) {
          Object.freeze(i);
          if (g) {
            for (var h in i) {
              e.freeze(i[h], g)
            }
          }
        }
        return i
      } : Ext.identityFn,
      toQueryObjects: function(j, n, h) {
        var g = e.toQueryObjects,
          m = [],
          k, l;
        if (Ext.isArray(n)) {
          for (k = 0, l = n.length; k < l; k++) {
            if (h) {
              m = m.concat(g(j + "[" + k + "]", n[k], true))
            } else {
              m.push({
                name: j,
                value: n[k]
              })
            }
          }
        } else {
          if (Ext.isObject(n)) {
            for (k in n) {
              if (n.hasOwnProperty(k)) {
                if (h) {
                  m = m.concat(g(j + "[" + k + "]", n[k], true))
                } else {
                  m.push({
                    name: j,
                    value: n[k]
                  })
                }
              }
            }
          } else {
            m.push({
              name: j,
              value: n
            })
          }
        }
        return m
      },
      toQueryString: function(l, h) {
        var m = [],
          k = [],
          o, n, p, g, q;
        for (o in l) {
          if (l.hasOwnProperty(o)) {
            m = m.concat(e.toQueryObjects(o, l[o], h))
          }
        }
        for (n = 0, p = m.length; n < p; n++) {
          g = m[n];
          q = g.value;
          if (Ext.isEmpty(q)) {
            q = ""
          } else {
            if (Ext.isDate(q)) {
              q = Ext.Date.toString(q)
            }
          }
          k.push(encodeURIComponent(g.name) + "=" + encodeURIComponent(
            String(q)))
        }
        return k.join("&")
      },
      fromQueryString: function(h, u) {
        var p = h.replace(b, "").split("&"),
          x = {},
          v, n, z, q, t, l, r, s, g, m, w, o, y, k;
        for (t = 0, l = p.length; t < l; t++) {
          r = p[t];
          if (r.length > 0) {
            n = r.split("=");
            z = n[0];
            z = z.replace(f, "%20");
            z = decodeURIComponent(z);
            q = n[1];
            if (q !== undefined) {
              q = q.replace(f, "%20");
              q = decodeURIComponent(q)
            } else {
              q = ""
            }
            if (!u) {
              if (x.hasOwnProperty(z)) {
                if (!Ext.isArray(x[z])) {
                  x[z] = [x[z]]
                }
                x[z].push(q)
              } else {
                x[z] = q
              }
            } else {
              m = z.match(c);
              w = z.match(a);
              z = w[0];
              o = [];
              if (m === null) {
                x[z] = q;
                continue
              }
              for (s = 0, g = m.length; s < g; s++) {
                y = m[s];
                y = (y.length === 2) ? "" : y.substring(1, y.length - 1);
                o.push(y)
              }
              o.unshift(z);
              v = x;
              for (s = 0, g = o.length; s < g; s++) {
                y = o[s];
                if (s === g - 1) {
                  if (Ext.isArray(v) && y === "") {
                    v.push(q)
                  } else {
                    v[y] = q
                  }
                } else {
                  if (v[y] === undefined || typeof v[y] === "string") {
                    k = o[s + 1];
                    v[y] = (Ext.isNumeric(k) || k === "") ? [] : {}
                  }
                  v = v[y]
                }
              }
            }
          }
        }
        return x
      },
      each: function(h, l, k) {
        var g = Ext.enumerables,
          j, m;
        if (h) {
          k = k || h;
          for (m in h) {
            if (h.hasOwnProperty(m)) {
              if (l.call(k, m, h[m], h) === false) {
                return
              }
            }
          }
          if (g) {
            for (j = g.length; j--;) {
              if (h.hasOwnProperty(m = g[j])) {
                if (l.call(k, m, h[m], h) === false) {
                  return
                }
              }
            }
          }
        }
      },
      eachValue: function(h, l, k) {
        var g = Ext.enumerables,
          j, m;
        k = k || h;
        for (m in h) {
          if (h.hasOwnProperty(m)) {
            if (l.call(k, h[m]) === false) {
              return
            }
          }
        }
        if (g) {
          for (j = g.length; j--;) {
            if (h.hasOwnProperty(m = g[j])) {
              if (l.call(k, h[m]) === false) {
                return
              }
            }
          }
        }
      },
      merge: function(n) {
        var l = 1,
          m = arguments.length,
          g = e.merge,
          j = Ext.clone,
          k, p, o, h;
        for (; l < m; l++) {
          k = arguments[l];
          for (p in k) {
            o = k[p];
            if (o && o.constructor === Object) {
              h = n[p];
              if (h && h.constructor === Object) {
                g(h, o)
              } else {
                n[p] = j(o)
              }
            } else {
              n[p] = o
            }
          }
        }
        return n
      },
      mergeIf: function(g) {
        var l = 1,
          m = arguments.length,
          j = Ext.clone,
          h, k, n;
        for (; l < m; l++) {
          h = arguments[l];
          for (k in h) {
            if (!(k in g)) {
              n = h[k];
              if (n && n.constructor === Object) {
                g[k] = j(n)
              } else {
                g[k] = n
              }
            }
          }
        }
        return g
      },
      getAllKeys: function(g) {
        var h = [],
          i;
        for (i in g) {
          h.push(i)
        }
        return h
      },
      getKey: function(g, i) {
        for (var h in g) {
          if (g.hasOwnProperty(h) && g[h] === i) {
            return h
          }
        }
        return null
      },
      getValues: function(h) {
        var g = [],
          i;
        for (i in h) {
          if (h.hasOwnProperty(i)) {
            g.push(h[i])
          }
        }
        return g
      },
      getKeys: (typeof Object.keys == "function") ? function(g) {
        if (!g) {
          return []
        }
        return Object.keys(g)
      } : function(g) {
        var h = [],
          i;
        for (i in g) {
          if (g.hasOwnProperty(i)) {
            h.push(i)
          }
        }
        return h
      },
      getSize: function(g) {
        var h = 0,
          i;
        for (i in g) {
          if (g.hasOwnProperty(i)) {
            h++
          }
        }
        return h
      },
      isEmpty: function(g) {
        for (var h in g) {
          if (g.hasOwnProperty(h)) {
            return false
          }
        }
        return true
      },
      equals: (function() {
        var g = function(j, i) {
          var h;
          for (h in j) {
            if (j.hasOwnProperty(h)) {
              if (j[h] !== i[h]) {
                return false
              }
            }
          }
          return true
        };
        return function(i, h) {
          if (i === h) {
            return true
          }
          if (i && h) {
            return g(i, h) && g(h, i)
          } else {
            if (!i && !h) {
              return i === h
            } else {
              return false
            }
          }
        }
      })(),
      fork: function(j) {
        var g, h, i;
        if (j && j.constructor === Object) {
          g = e.chain(j);
          for (h in j) {
            i = j[h];
            if (i) {
              if (i.constructor === Object) {
                g[h] = e.fork(i)
              } else {
                if (i instanceof Array) {
                  g[h] = Ext.Array.clone(i)
                }
              }
            }
          }
        } else {
          g = j
        }
        return g
      },
      defineProperty: ("defineProperty" in Object) ? Object.defineProperty : function(
        h, g, i) {
        if (!Object.prototype.__defineGetter__) {
          return
        }
        if (i.get) {
          h.__defineGetter__(g, i.get)
        }
        if (i.set) {
          h.__defineSetter__(g, i.set)
        }
      },
      classify: function(j) {
        var i = j,
          l = [],
          h = {},
          g = function() {
            var n = 0,
              o = l.length,
              p;
            for (; n < o; n++) {
              p = l[n];
              this[p] = new h[p]()
            }
          },
          k, m;
        for (k in j) {
          if (j.hasOwnProperty(k)) {
            m = j[k];
            if (m && m.constructor === Object) {
              l.push(k);
              h[k] = e.classify(m)
            }
          }
        }
        g.prototype = i;
        return g
      }
    };
  Ext.merge = Ext.Object.merge;
  Ext.mergeIf = Ext.Object.mergeIf
}());
Ext.apply(Ext, {
  _namedScopes: {
    "this": {
      isThis: 1
    },
    controller: {
      isController: 1
    },
    self: {
      isSelf: 1
    },
    "self.controller": {
      isSelf: 1,
      isController: 1
    }
  },
  escapeId: (function() {
    var c = /^[a-zA-Z_][a-zA-Z0-9_\-]*$/i,
      d = /([\W]{1})/g,
      b = /^(\d)/g,
      a = function(g, f) {
        return "\\" + f
      },
      e = function(g, f) {
        return "\\00" + f.charCodeAt(0).toString(16) + " "
      };
    return function(f) {
      return c.test(f) ? f : f.replace(d, a).replace(b, e)
    }
  }()),
  callback: function(h, f, d, c, b, g) {
    if (!h) {
      return
    }
    var e = (f in Ext._namedScopes);
    if (h.charAt) {
      if ((!f || e) && b) {
        f = b.resolveListenerScope(e ? f : g)
      }
      h = f[h]
    } else {
      if (e) {
        f = g || b
      } else {
        if (!f) {
          f = b
        }
      }
    }
    var a;
    if (h && Ext.isFunction(h)) {
      f = f || Ext.global;
      if (c) {
        Ext.defer(h, c, f, d)
      } else {
        if (Ext.elevateFunction) {
          a = Ext.elevateFunction(h, f, d)
        } else {
          if (d) {
            a = h.apply(f, d)
          } else {
            a = h.call(f)
          }
        }
      }
    }
    return a
  },
  coerce: function(e, d) {
    var c = Ext.typeOf(e),
      b = Ext.typeOf(d),
      a = typeof e === "string";
    if (c !== b) {
      switch (b) {
        case "string":
          return String(e);
        case "number":
          return Number(e);
        case "boolean":
          return a && (!e || e === "false") ? false : Boolean(e);
        case "null":
          return a && (!e || e === "null") ? null : e;
        case "undefined":
          return a && (!e || e === "undefined") ? undefined : e;
        case "date":
          return a && isNaN(e) ? Ext.Date.parse(e, Ext.Date.defaultFormat) :
            Date(Number(e))
      }
    }
    return e
  },
  copyTo: function(b, d, f, e) {
    if (typeof f === "string") {
      f = f.split(Ext.propertyNameSplitRe)
    }
    for (var a, c = 0, g = f ? f.length : 0; c < g; c++) {
      a = f[c];
      if (e || d.hasOwnProperty(a)) {
        b[a] = d[a]
      }
    }
    return b
  },
  propertyNameSplitRe: /[,;\s]+/,
  copyToIf: function(a, d, e) {
    if (typeof e === "string") {
      e = e.split(Ext.propertyNameSplitRe)
    }
    for (var b, c = 0, f = e ? e.length : 0; c < f; c++) {
      b = e[c];
      if (a[b] === undefined) {
        a[b] = d[b]
      }
    }
    return a
  },
  extend: (function() {
    var a = Object.prototype.constructor,
      b = function(d) {
        for (var c in d) {
          if (!d.hasOwnProperty(c)) {
            continue
          }
          this[c] = d[c]
        }
      };
    return function(c, h, f) {
      if (Ext.isObject(h)) {
        f = h;
        h = c;
        c = f.constructor !== a ? f.constructor : function() {
          h.apply(this, arguments)
        }
      }
      var e = function() {},
        d, g = h.prototype;
      e.prototype = g;
      d = c.prototype = new e();
      d.constructor = c;
      c.superclass = g;
      if (g.constructor === a) {
        g.constructor = h
      }
      c.override = function(i) {
        Ext.override(c, i)
      };
      d.override = b;
      d.proto = d;
      c.override(f);
      c.extend = function(i) {
        return Ext.extend(c, i)
      };
      return c
    }
  }()),
  iterate: function(a, c, b) {
    if (Ext.isEmpty(a)) {
      return
    }
    if (b === undefined) {
      b = a
    }
    if (Ext.isIterable(a)) {
      Ext.Array.each.call(Ext.Array, a, c, b)
    } else {
      Ext.Object.each.call(Ext.Object, a, c, b)
    }
  },
  urlEncode: function() {
    var a = Ext.Array.from(arguments),
      b = "";
    if (Ext.isString(a[1])) {
      b = a[1] + "&";
      a[1] = false
    }
    return b + Ext.Object.toQueryString.apply(Ext.Object, a)
  },
  urlDecode: function() {
    return Ext.Object.fromQueryString.apply(Ext.Object, arguments)
  },
  getScrollbarSize: function(c) {
    var b = Ext._scrollbarSize;
    if (c || !b) {
      var a = document.body,
        d = document.createElement("div");
      d.style.width = d.style.height = "100px";
      d.style.overflow = "scroll";
      d.style.position = "absolute";
      a.appendChild(d);
      Ext._scrollbarSize = b = {
        width: d.offsetWidth - d.clientWidth,
        height: d.offsetHeight - d.clientHeight
      };
      a.removeChild(d)
    }
    return b
  },
  typeOf: (function() {
    var a = /\S/,
      c = Object.prototype.toString,
      d = {
        number: 1,
        string: 1,
        "boolean": 1,
        "undefined": 1
      },
      b = {
        "[object Array]": "array",
        "[object Date]": "date",
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object RegExp]": "regexp"
      };
    return function(g) {
      if (g === null) {
        return "null"
      }
      var f = typeof g,
        e, h;
      if (d[f]) {
        return f
      }
      e = b[h = c.call(g)];
      if (e) {
        return e
      }
      if (f === "function") {
        return "function"
      }
      if (f === "object") {
        if (g.nodeType !== undefined) {
          if (g.nodeType === 3) {
            return a.test(g.nodeValue) ? "textnode" : "whitespace"
          } else {
            return "element"
          }
        }
        return "object"
      }
      return h
    }
  }()),
  factory: function(b, e, a, f) {
    var d = Ext.ClassManager,
      c;
    if (!b || b.isInstance) {
      if (a && a !== b) {
        a.destroy()
      }
      return b
    }
    if (f) {
      if (typeof b === "string") {
        return d.instantiateByAlias(f + "." + b)
      } else {
        if (Ext.isObject(b) && "type" in b) {
          return d.instantiateByAlias(f + "." + b.type, b)
        }
      }
    }
    if (b === true) {
      return a || Ext.create(e)
    }
    if ("xtype" in b) {
      c = d.instantiateByAlias("widget." + b.xtype, b)
    } else {
      if ("xclass" in b) {
        c = Ext.create(b.xclass, b)
      }
    }
    if (c) {
      if (a) {
        a.destroy()
      }
      return c
    }
    if (a) {
      return a.setConfig(b)
    }
    return Ext.create(e, b)
  },
  log: (function() {
    var a = function() {};
    a.info = a.warn = a.error = Ext.emptyFn;
    return a
  }())
});
(function() {
  var d = [""],
    h = /([^\d\.])/,
    b = /[^\d]/g,
    a = /[\-+]/g,
    g = /\s/g,
    c = /_/g,
    f = {
      classic: 1,
      modern: 1
    },
    e;
  Ext.Version = e = function(r, n) {
    var s = this,
      l = s.padModes,
      j, p, m, o, t, k, q;
    if (r.isVersion) {
      r = r.version
    }
    s.version = q = String(r).toLowerCase().replace(c, ".").replace(a, "");
    j = q.charAt(0);
    if (j in l) {
      q = q.substring(1);
      m = l[j]
    } else {
      m = n ? l[n] : 0
    }
    s.pad = m;
    k = q.search(h);
    s.shortVersion = q;
    if (k !== -1) {
      s.release = t = q.substr(k, r.length);
      s.shortVersion = q.substr(0, k);
      t = e.releaseValueMap[t] || t
    }
    s.releaseValue = t || m;
    s.shortVersion = s.shortVersion.replace(b, "");
    s.parts = o = q.split(".");
    for (p = o.length; p--;) {
      o[p] = parseInt(o[p], 10)
    }
    if (m === Infinity) {
      o.push(m)
    }
    s.major = o[0] || m;
    s.minor = o[1] || m;
    s.patch = o[2] || m;
    s.build = o[3] || m;
    return s
  };
  e.prototype = {
    isVersion: true,
    padModes: {
      "~": NaN,
      "^": Infinity
    },
    release: "",
    compareTo: function(t) {
      var u = this,
        n = u.pad,
        r = u.parts,
        v = r.length,
        m = t.isVersion ? t : new e(t),
        k = m.pad,
        q = m.parts,
        p = q.length,
        j = Math.max(v, p),
        o, l, s;
      for (o = 0; o < j; o++) {
        l = (o < v) ? r[o] : n;
        s = (o < p) ? q[o] : k;
        if (l < s) {
          return -1
        }
        if (l > s) {
          return 1
        }
      }
      l = u.releaseValue;
      s = m.releaseValue;
      if (l < s) {
        return -1
      }
      if (l > s) {
        return 1
      }
      return 0
    },
    toString: function() {
      return this.version
    },
    valueOf: function() {
      return this.version
    },
    getMajor: function() {
      return this.major
    },
    getMinor: function() {
      return this.minor
    },
    getPatch: function() {
      return this.patch
    },
    getBuild: function() {
      return this.build
    },
    getRelease: function() {
      return this.release
    },
    getReleaseValue: function() {
      return this.releaseValue
    },
    isGreaterThan: function(i) {
      return this.compareTo(i) > 0
    },
    isGreaterThanOrEqual: function(i) {
      return this.compareTo(i) >= 0
    },
    isLessThan: function(i) {
      return this.compareTo(i) < 0
    },
    isLessThanOrEqual: function(i) {
      return this.compareTo(i) <= 0
    },
    equals: function(i) {
      return this.compareTo(i) === 0
    },
    match: function(i) {
      i = String(i);
      return this.version.substr(0, i.length) === i
    },
    toArray: function() {
      var i = this;
      return [i.getMajor(), i.getMinor(), i.getPatch(), i.getBuild(), i.getRelease()]
    },
    getShortVersion: function() {
      return this.shortVersion
    },
    gt: function(i) {
      return this.compareTo(i) > 0
    },
    lt: function(i) {
      return this.compareTo(i) < 0
    },
    gtEq: function(i) {
      return this.compareTo(i) >= 0
    },
    ltEq: function(i) {
      return this.compareTo(i) <= 0
    }
  };
  Ext.apply(e, {
    aliases: {
      from: {
        extjs: "ext",
        core: "core",
        touch: "modern"
      },
      to: {
        ext: ["extjs"],
        core: ["core"],
        modern: ["touch"]
      }
    },
    releaseValueMap: {
      dev: -6,
      alpha: -5,
      a: -5,
      beta: -4,
      b: -4,
      rc: -3,
      "#": -2,
      p: -1,
      pl: -1
    },
    getComponentValue: function(i) {
      return !i ? 0 : (isNaN(i) ? this.releaseValueMap[i] || i :
        parseInt(i, 10))
    },
    compare: function(k, j) {
      var i = k.isVersion ? k : new e(k);
      return i.compareTo(j)
    },
    set: function(o, m, l) {
      var k = e.aliases.to[m],
        j = l.isVersion ? l : new e(l),
        n;
      o[m] = j;
      if (k) {
        for (n = k.length; n-- > 0;) {
          o[k[n]] = j
        }
      }
      return j
    }
  });
  Ext.apply(Ext, {
    compatVersions: {},
    versions: {},
    lastRegisteredVersion: null,
    getCompatVersion: function(j) {
      var i = Ext.compatVersions,
        k;
      if (!j) {
        k = i.ext || i.touch || i.core
      } else {
        k = i[e.aliases.from[j] || j]
      }
      return k || Ext.getVersion(j)
    },
    setCompatVersion: function(j, i) {
      e.set(Ext.compatVersions, j, i)
    },
    setVersion: function(j, i) {
      if (j in f) {
        Ext.toolkit = j
      }
      Ext.lastRegisteredVersion = e.set(Ext.versions, j, i);
      return this
    },
    getVersion: function(j) {
      var i = Ext.versions;
      if (!j) {
        return i.ext || i.touch || i.core
      }
      return i[e.aliases.from[j] || j]
    },
    checkVersion: function(p, x) {
      var t = Ext.isArray(p),
        l = e.aliases.from,
        y = t ? p : d,
        k = y.length,
        m = Ext.versions,
        w = m.ext || m.touch,
        q, v, s, n, o, j, z, r, u;
      if (!t) {
        d[0] = p
      }
      for (q = 0; q < k; ++q) {
        if (!Ext.isString(z = y[q])) {
          s = Ext.checkVersion(z.and || z.or, !z.or);
          if (z.not) {
            s = !s
          }
        } else {
          if (z.indexOf(" ") >= 0) {
            z = z.replace(g, "")
          }
          v = z.indexOf("@");
          if (v < 0) {
            r = z;
            u = w
          } else {
            j = z.substring(0, v);
            if (!(u = m[l[j] || j])) {
              if (x) {
                return false
              }
              continue
            }
            r = z.substring(v + 1)
          }
          v = r.indexOf("-");
          if (v < 0) {
            if (r.charAt(v = r.length - 1) === "+") {
              n = r.substring(0, v);
              o = null
            } else {
              n = o = r
            }
          } else {
            if (v > 0) {
              n = r.substring(0, v);
              o = r.substring(v + 1)
            } else {
              n = null;
              o = r.substring(v + 1)
            }
          }
          s = true;
          if (n) {
            n = new e(n, "~");
            s = n.ltEq(u)
          }
          if (s && o) {
            o = new e(o, "~");
            s = o.gtEq(u)
          }
        }
        if (s) {
          if (!x) {
            return true
          }
        } else {
          if (x) {
            return false
          }
        }
      }
      return !!x
    },
    deprecate: function(i, k, l, j) {
      if (e.compare(Ext.getVersion(i), k) < 1) {
        l.call(j)
      }
    }
  })
}());
(function(d) {
  var e = (d && d.packages) || {},
    c = d && d.compatibility,
    b, a;
  for (b in e) {
    a = e[b];
    Ext.setVersion(b, a.version)
  }
  if (c) {
    if (Ext.isString(c)) {
      Ext.setCompatVersion("core", c)
    } else {
      for (b in c) {
        Ext.setCompatVersion(b, c[b])
      }
    }
  }
  if (!e.ext && !e.touch) {
    Ext.setVersion("ext", "6.0.0.640");
    Ext.setVersion("core", "6.0.0.640")
  }
})(Ext.manifest);
Ext.Config = function(b) {
  var c = this,
    a = b.charAt(0).toUpperCase() + b.substr(1);
  c.name = b;
  c.names = {
    internal: "_" + b,
    initializing: "is" + a + "Initializing",
    apply: "apply" + a,
    update: "update" + a,
    get: "get" + a,
    set: "set" + a,
    initGet: "initGet" + a,
    changeEvent: b.toLowerCase() + "change"
  };
  c.root = c
};
Ext.Config.map = {};
Ext.Config.get = function(b) {
  var c = Ext.Config.map,
    a = c[b] || (c[b] = new Ext.Config(b));
  return a
};
Ext.Config.prototype = {
  self: Ext.Config,
  isConfig: true,
  getGetter: function() {
    return this.getter || (this.root.getter = this.makeGetter())
  },
  getInitGetter: function() {
    return this.initGetter || (this.root.initGetter = this.makeInitGetter())
  },
  getSetter: function() {
    return this.setter || (this.root.setter = this.makeSetter())
  },
  getEventedSetter: function() {
    return this.eventedSetter || (this.root.eventedSetter = this.makeEventedSetter())
  },
  getInternalName: function(a) {
    return a.$configPrefixed ? this.names.internal : this.name
  },
  mergeNew: function(f, b, e, d) {
    var a, c;
    if (!b) {
      a = f
    } else {
      if (!f) {
        a = b
      } else {
        a = Ext.Object.chain(b);
        for (c in f) {
          if (!d || !(c in a)) {
            a[c] = f[c]
          }
        }
      }
    }
    return a
  },
  mergeSets: function(e, c, a) {
    var b = c ? Ext.Object.chain(c) : {},
      d, f;
    if (e instanceof Array) {
      for (d = e.length; d--;) {
        f = e[d];
        if (!a || !(f in b)) {
          b[f] = true
        }
      }
    } else {
      if (e) {
        if (e.constructor === Object) {
          for (d in e) {
            f = e[d];
            if (!a || !(d in b)) {
              b[d] = f
            }
          }
        } else {
          if (!a || !(e in b)) {
            b[e] = true
          }
        }
      }
    }
    return b
  },
  makeGetter: function() {
    var a = this.name,
      b = this.names.internal;
    return function() {
      var c = this.$configPrefixed ? b : a;
      return this[c]
    }
  },
  makeInitGetter: function() {
    var a = this.name,
      e = this.names,
      d = e.set,
      b = e.get,
      c = e.initializing;
    return function() {
      var f = this;
      f[c] = true;
      delete f[b];
      f[d](f.config[a]);
      delete f[c];
      return f[b].apply(f, arguments)
    }
  },
  makeSetter: function() {
    var a = this.name,
      e = this.names,
      c = e.internal,
      d = e.get,
      b = e.apply,
      g = e.update,
      f;
    f = function(k) {
      var j = this,
        i = j.$configPrefixed ? c : a,
        h = j[i];
      delete j[d];
      if (!j[b] || (k = j[b](k, h)) !== undefined) {
        if (k !== (h = j[i])) {
          j[i] = k;
          if (j[g]) {
            j[g](k, h)
          }
        }
      }
      return j
    };
    f.$isDefault = true;
    return f
  },
  makeEventedSetter: function() {
    var b = this.name,
      g = this.names,
      i = g.internal,
      a = g.get,
      h = g.apply,
      d = g.update,
      f = g.changeEvent,
      e = function(l, m, j, k) {
        l[k] = m;
        if (l[d]) {
          l[d](m, j)
        }
      },
      c;
    c = function(m) {
      var l = this,
        k = l.$configPrefixed ? i : b,
        j = l[k];
      delete l[a];
      if (!l[h] || (m = l[h](m, j)) !== undefined) {
        if (m !== (j = l[k])) {
          if (l.isConfiguring) {
            l[k] = m;
            if (l[d]) {
              l[d](m, j)
            }
          } else {
            l.fireEventedAction(f, [l, m, j], e, l, [l, m, j, k])
          }
        }
      }
      return l
    };
    c.$isDefault = true;
    return c
  }
};
(function() {
  var b = Ext.Config,
    c = b.map,
    a = Ext.Object;
  Ext.Configurator = function(d) {
    var f = this,
      e = d.prototype,
      g = d.superclass ? d.superclass.self.$config : null;
    f.cls = d;
    f.superCfg = g;
    if (g) {
      f.configs = a.chain(g.configs);
      f.cachedConfigs = a.chain(g.cachedConfigs);
      f.initMap = a.chain(g.initMap);
      f.values = a.chain(g.values);
      f.needsFork = g.needsFork
    } else {
      f.configs = {};
      f.cachedConfigs = {};
      f.initMap = {};
      f.values = {}
    }
    e.config = e.defaultConfig = f.values;
    d.$config = f
  };
  Ext.Configurator.prototype = {
    self: Ext.Configurator,
    needsFork: false,
    initList: null,
    add: function(t, d) {
      var u = this,
        h = u.cls,
        k = u.configs,
        v = u.cachedConfigs,
        m = u.initMap,
        p = h.prototype,
        w = d && d.$config.configs,
        e = u.values,
        j, l, r, f, g, i, x, o, n, q;
      for (x in t) {
        q = t[x];
        j = q && q.constructor === Object;
        l = j && "$value" in q ? q : null;
        if (l) {
          r = !!l.cached;
          q = l.$value;
          j = q && q.constructor === Object
        }
        f = l && l.merge;
        g = k[x];
        if (g) {
          if (d) {
            f = g.merge;
            if (!f) {
              continue
            }
            l = null
          } else {
            f = f || g.merge
          }
          i = e[x];
          if (f) {
            q = f.call(g, q, i, h, d)
          } else {
            if (j) {
              if (i && i.constructor === Object) {
                q = a.merge({}, i, q)
              }
            }
          }
        } else {
          if (w) {
            g = w[x];
            l = null
          } else {
            g = b.get(x)
          }
          k[x] = g;
          if (g.cached || r) {
            v[x] = true
          }
          o = g.names;
          if (!p[n = o.get]) {
            p[n] = g.getter || g.getGetter()
          }
          if (!p[n = o.set]) {
            p[n] = (l && l.evented) ? (g.eventedSetter || g.getEventedSetter()) :
              (g.setter || g.getSetter())
          }
        }
        if (l) {
          if (g.owner !== h) {
            k[x] = g = Ext.Object.chain(g);
            g.owner = h
          }
          Ext.apply(g, l);
          delete g.$value
        }
        if (!u.needsFork && q && (q.constructor === Object || q instanceof Array)) {
          u.needsFork = true
        }
        if (q !== null) {
          m[x] = true
        } else {
          if (p.$configPrefixed) {
            p[k[x].names.internal] = null
          } else {
            p[k[x].name] = null
          }
          if (x in m) {
            m[x] = false
          }
        }
        e[x] = q
      }
    },
    configure: function(w, k) {
      var y = this,
        j = y.configs,
        l = y.initMap,
        n = y.initListMap,
        u = y.initList,
        o = y.cls.prototype,
        d = y.values,
        p = 0,
        r = !u,
        e, f, g, A, t, s, h, m, z, q, x, v;
      d = y.needsFork ? a.fork(d) : a.chain(d);
      if (r) {
        y.initList = u = [];
        y.initListMap = n = {};
        w.isFirstInstance = true;
        for (z in l) {
          A = l[z];
          f = j[z];
          x = f.cached;
          if (A) {
            m = f.names;
            q = d[z];
            if (!o[m.set].$isDefault || o[m.apply] || o[m.update] ||
              typeof q === "object") {
              if (x) {
                (e || (e = [])).push(f)
              } else {
                u.push(f);
                n[z] = true
              }
              w[m.get] = f.initGetter || f.getInitGetter()
            } else {
              o[f.getInternalName(o)] = q
            }
          } else {
            if (x) {
              o[f.getInternalName(o)] = undefined
            }
          }
        }
      }
      h = e && e.length;
      if (h) {
        for (t = 0; t < h; ++t) {
          s = e[t].getInternalName(o);
          w[s] = null
        }
        for (t = 0; t < h; ++t) {
          m = (f = e[t]).names;
          g = m.get;
          if (w.hasOwnProperty(g)) {
            w[m.set](d[f.name]);
            delete w[g]
          }
        }
        for (t = 0; t < h; ++t) {
          s = e[t].getInternalName(o);
          o[s] = w[s];
          delete w[s]
        }
      }
      if (k && k.platformConfig) {
        k = y.resolvePlatformConfig(w, k)
      }
      if (r) {
        if (w.afterCachedConfig && !w.afterCachedConfig.$nullFn) {
          w.afterCachedConfig(k)
        }
      }
      w.isConfiguring = true;
      w.config = d;
      for (t = 0, h = u.length; t < h; ++t) {
        f = u[t];
        w[f.names.get] = f.initGetter || f.getInitGetter()
      }
      if (w.transformInstanceConfig) {
        k = w.transformInstanceConfig(k)
      }
      if (k) {
        for (z in k) {
          q = k[z];
          f = j[z];
          if (!f) {
            w[z] = q
          } else {
            if (!f.lazy) {
              ++p
            }
            if (!n[z]) {
              w[f.names.get] = f.initGetter || f.getInitGetter()
            }
            if (f.merge) {
              q = f.merge(q, d[z], w)
            } else {
              if (q && q.constructor === Object) {
                v = d[z];
                if (v && v.constructor === Object) {
                  q = a.merge(d[z], q)
                } else {
                  q = Ext.clone(q)
                }
              }
            }
          }
          d[z] = q
        }
      }
      if (w.beforeInitConfig && !w.beforeInitConfig.$nullFn) {
        if (w.beforeInitConfig(k) === false) {
          return
        }
      }
      if (k) {
        for (z in k) {
          if (!p) {
            break
          }
          f = j[z];
          if (f && !f.lazy) {
            --p;
            m = f.names;
            g = m.get;
            if (w.hasOwnProperty(g)) {
              w[m.set](d[z]);
              delete w[m.get]
            }
          }
        }
      }
      for (t = 0, h = u.length; t < h; ++t) {
        f = u[t];
        m = f.names;
        g = m.get;
        if (!f.lazy && w.hasOwnProperty(g)) {
          w[m.set](d[f.name]);
          delete w[g]
        }
      }
      delete w.isConfiguring
    },
    getCurrentConfig: function(e) {
      var d = e.defaultConfig,
        g = {},
        f;
      for (f in d) {
        g[f] = e[c[f].names.get]()
      }
      return g
    },
    merge: function(d, i, g) {
      var k = this.configs,
        f, j, h, e;
      for (f in g) {
        j = g[f];
        e = k[f];
        if (e) {
          if (e.merge) {
            j = e.merge(j, i[f], d)
          } else {
            if (j && j.constructor === Object) {
              h = i[f];
              if (h && h.constructor === Object) {
                j = Ext.Object.merge(h, j)
              } else {
                j = Ext.clone(j)
              }
            }
          }
        }
        i[f] = j
      }
      return i
    },
    reconfigure: function(s, n, t) {
      var j = s.config,
        k = [],
        r = s.$configStrict,
        o = this.configs,
        f = t && t.defaults,
        h = t && t.strict === false,
        m, q, g, l, d, p, e;
      for (d in n) {
        if (f && s.hasOwnProperty(d)) {
          continue
        }
        j[d] = n[d];
        m = o[d];
        if (m) {
          s[m.names.get] = m.initGetter || m.getInitGetter()
        } else {
          if (r) {
            continue
          }
        }
        k.push(d)
      }
      for (g = 0, l = k.length; g < l; g++) {
        d = k[g];
        m = o[d];
        if (m) {
          p = m.names;
          q = p.get;
          if (s.hasOwnProperty(q)) {
            s[p.set](n[d]);
            delete s[q]
          }
        } else {
          m = c[d] || Ext.Config.get(d);
          p = m.names;
          if (s[p.set]) {
            s[p.set](n[d])
          } else {
            if (h) {
              s[d] = n[d]
            }
          }
        }
      }
    },
    resolvePlatformConfig: function(d, k) {
      var h = k && k.platformConfig,
        e = k,
        f, g, j;
      if (h) {
        g = Ext.getPlatformConfigKeys(h);
        j = g.length;
        if (j) {
          e = Ext.merge({}, e);
          for (f = 0, j = g.length; f < j; ++f) {
            this.merge(d, e, h[g[f]])
          }
        }
      }
      return e
    }
  }
}());
Ext.Base = (function(c) {
  var b = [],
    i, k = [],
    l = function(p, o) {
      var r = this,
        n, m, q;
      if (p) {
        m = Ext.Config.map[p];
        q = m.names.get;
        if (o && r.hasOwnProperty(q)) {
          n = r.config[p]
        } else {
          n = r[q]()
        }
      } else {
        n = r.getCurrentConfig()
      }
      return n
    },
    f = function(m) {
      return function() {
        return this[m].apply(this, arguments)
      }
    },
    a = Ext.Version,
    h = /^\d/,
    j = {},
    e = {},
    g = function() {},
    d = g.prototype;
  Ext.apply(g, {
    $className: "Ext.Base",
    $isClass: true,
    create: function() {
      return Ext.create.apply(Ext, [this].concat(Array.prototype.slice
        .call(arguments, 0)))
    },
    addDeprecations: function(s) {
      var B = this,
        n = [],
        p = Ext.getCompatVersion(s.name),
        A, w, r, x, C, u, z, t, y, D, v, m, q, o;
      for (w in s) {
        if (h.test(w)) {
          o = new Ext.Version(w);
          o.deprecations = s[w];
          n.push(o)
        }
      }
      n.sort(a.compare);
      for (r = n.length; r--;) {
        A = (o = n[r]).deprecations;
        C = B.prototype;
        q = A.statics;
        u = p && p.lt(o);
        if (!u) {
          break
        }
        while (A) {
          y = A.methods;
          if (y) {
            for (D in y) {
              m = y[D];
              t = null;
              if (!m) {} else {
                if (Ext.isString(m)) {
                  if (u) {
                    t = f(m)
                  }
                } else {
                  x = "";
                  if (m.message || m.fn) {
                    m = m.fn
                  }
                  z = C.hasOwnProperty(D) && C[D];
                  if (u && m) {
                    m.$owner = B;
                    m.$name = D;
                    if (z) {
                      m.$previous = z
                    }
                    t = m
                  }
                }
              }
              if (t) {
                C[D] = t
              }
            }
          }
          A = q;
          q = null;
          C = B
        }
      }
    },
    extend: function(q) {
      var s = this,
        m = q.prototype,
        o, p, r, n, t;
      o = s.prototype = Ext.Object.chain(m);
      o.self = s;
      s.superclass = o.superclass = m;
      if (!q.$isClass) {
        for (p in d) {
          if (p in o) {
            o[p] = d[p]
          }
        }
      }
      t = m.$inheritableStatics;
      if (t) {
        for (p = 0, r = t.length; p < r; p++) {
          n = t[p];
          if (!s.hasOwnProperty(n)) {
            s[n] = q[n]
          }
        }
      }
      if (q.$onExtended) {
        s.$onExtended = q.$onExtended.slice()
      }
      s.getConfigurator()
    },
    $onExtended: [],
    triggerExtended: function() {
      var o = this.$onExtended,
        n = o.length,
        m, p;
      if (n > 0) {
        for (m = 0; m < n; m++) {
          p = o[m];
          p.fn.apply(p.scope || this, arguments)
        }
      }
    },
    onExtended: function(n, m) {
      this.$onExtended.push({
        fn: n,
        scope: m
      });
      return this
    },
    addStatics: function(m) {
      this.addMembers(m, true);
      return this
    },
    addInheritableStatics: function(n) {
      var q, m, p = this.prototype,
        o, r;
      q = p.$inheritableStatics;
      m = p.$hasInheritableStatics;
      if (!q) {
        q = p.$inheritableStatics = [];
        m = p.$hasInheritableStatics = {}
      }
      for (o in n) {
        if (n.hasOwnProperty(o)) {
          r = n[o];
          this[o] = r;
          if (!m[o]) {
            m[o] = true;
            q.push(o)
          }
        }
      }
      return this
    },
    addMembers: function(q, B, n) {
      var z = this,
        u = Ext.Function.clone,
        x = B ? z : z.prototype,
        r = !B && x.defaultConfig,
        A = Ext.enumerables,
        v = q.privates,
        w, t, y, s, m, o, p;
      if (v) {
        delete q.privates;
        if (!B) {
          p = v.statics;
          delete v.statics
        }
        z.addMembers(v, B, o);
        if (p) {
          z.addMembers(p, true, o)
        }
      }
      for (m in q) {
        if (q.hasOwnProperty(m)) {
          s = q[m];
          if (typeof s === "function" && !s.$isClass && !s.$nullFn) {
            if (s.$owner) {
              s = u(s)
            }
            if (x.hasOwnProperty(m)) {
              s.$previous = x[m]
            }
            s.$owner = z;
            s.$name = m
          } else {
            if (r && (m in r) && !x.config.hasOwnProperty(m)) {
              (w || (w = {}))[m] = s;
              continue
            }
          }
          x[m] = s
        }
      }
      if (w) {
        z.addConfig(w)
      }
      if (A) {
        for (t = 0, y = A.length; t < y; ++t) {
          if (q.hasOwnProperty(m = A[t])) {
            s = q[m];
            if (s && !s.$nullFn) {
              if (s.$owner) {
                s = u(s)
              }
              s.$owner = z;
              s.$name = m;
              if (x.hasOwnProperty(m)) {
                s.$previous = x[m]
              }
            }
            x[m] = s
          }
        }
      }
      return this
    },
    addMember: function(m, n) {
      j[m] = n;
      this.addMembers(j);
      delete j[m];
      return this
    },
    borrow: function(s, m) {
      var o = s.prototype,
        q = {},
        p, r, n;
      m = Ext.Array.from(m);
      for (p = 0, r = m.length; p < r; p++) {
        n = m[p];
        q[n] = o[n]
      }
      return this.addMembers(q)
    },
    override: function(n) {
      var p = this,
        s = n.statics,
        r = n.inheritableStatics,
        o = n.config,
        m = n.mixins,
        q = n.cachedConfig;
      if (s || r || o) {
        n = Ext.apply({}, n)
      }
      if (s) {
        p.addMembers(s, true);
        delete n.statics
      }
      if (r) {
        p.addInheritableStatics(r);
        delete n.inheritableStatics
      }
      if (o) {
        p.addConfig(o);
        delete n.config
      }
      if (q) {
        p.addCachedConfig(q);
        delete n.cachedConfig
      }
      delete n.mixins;
      p.addMembers(n);
      if (m) {
        p.mixin(m)
      }
      return p
    },
    callParent: function(m) {
      var n;
      return (n = this.callParent.caller) && (n.$previous || ((n = n.$owner ?
        n : n.caller) && n.$owner.superclass.self[n.$name])).apply(
        this, m || b)
    },
    callSuper: function(m) {
      var n;
      return (n = this.callSuper.caller) && ((n = n.$owner ? n : n.caller) &&
        n.$owner.superclass.self[n.$name]).apply(this, m || b)
    },
    mixin: function(m, n) {
      var s = this,
        y, u, x, t, o, r, w, v, q;
      if (typeof m !== "string") {
        q = m;
        if (q instanceof Array) {
          for (o = 0, r = q.length; o < r; o++) {
            y = q[o];
            s.mixin(y.prototype.mixinId || y.$className, y)
          }
        } else {
          for (var p in q) {
            s.mixin(p, q[p])
          }
        }
        return
      }
      y = n.prototype;
      u = s.prototype;
      if (y.onClassMixedIn) {
        y.onClassMixedIn.call(n, s)
      }
      if (!u.hasOwnProperty("mixins")) {
        if ("mixins" in u) {
          u.mixins = Ext.Object.chain(u.mixins)
        } else {
          u.mixins = {}
        }
      }
      for (x in y) {
        v = y[x];
        if (x === "mixins") {
          Ext.applyIf(u.mixins, v)
        } else {
          if (!(x === "mixinId" || x === "config") && (u[x] ===
              undefined)) {
            u[x] = v
          }
        }
      }
      t = y.$inheritableStatics;
      if (t) {
        for (o = 0, r = t.length; o < r; o++) {
          w = t[o];
          if (!s.hasOwnProperty(w)) {
            s[w] = n[w]
          }
        }
      }
      if ("config" in y) {
        s.addConfig(y.config, n)
      }
      u.mixins[m] = y;
      if (y.afterClassMixedIn) {
        y.afterClassMixedIn.call(n, s)
      }
      return s
    },
    addConfig: function(n, o) {
      var m = this.$config || this.getConfigurator();
      m.add(n, o)
    },
    addCachedConfig: function(m, o) {
      var p = {},
        n;
      for (n in m) {
        p[n] = {
          cached: true,
          $value: m[n]
        }
      }
      this.addConfig(p, o)
    },
    getConfigurator: function() {
      return this.$config || new Ext.Configurator(this)
    },
    getName: function() {
      return Ext.getClassName(this)
    },
    createAlias: c(function(n, m) {
      e[n] = function() {
        return this[m].apply(this, arguments)
      };
      this.override(e);
      delete e[n]
    })
  });
  for (i in g) {
    if (g.hasOwnProperty(i)) {
      k.push(i)
    }
  }
  g.$staticMembers = k;
  g.getConfigurator();
  g.addMembers({
    $className: "Ext.Base",
    isInstance: true,
    $configPrefixed: true,
    $configStrict: true,
    isConfiguring: false,
    isFirstInstance: false,
    destroyed: false,
    statics: function() {
      var n = this.statics.caller,
        m = this.self;
      if (!n) {
        return m
      }
      return n.$owner
    },
    callParent: function(n) {
      var o, m = (o = this.callParent.caller) && (o.$previous || ((o =
        o.$owner ? o : o.caller) && o.$owner.superclass[o.$name]));
      return m.apply(this, n || b)
    },
    callSuper: function(n) {
      var o, m = (o = this.callSuper.caller) && ((o = o.$owner ? o :
        o.caller) && o.$owner.superclass[o.$name]);
      return m.apply(this, n || b)
    },
    self: g,
    constructor: function() {
      return this
    },
    getConfigurator: function() {
      return this.$config || this.self.getConfigurator()
    },
    initConfig: function(o) {
      var n = this,
        m = n.getConfigurator();
      n.initConfig = Ext.emptyFn;
      n.initialConfig = o || {};
      m.configure(n, o);
      return n
    },
    beforeInitConfig: Ext.emptyFn,
    getConfig: l,
    setConfig: function(o, q, n) {
      var p = this,
        m;
      if (o) {
        if (typeof o === "string") {
          m = {};
          m[o] = q
        } else {
          m = o
        }
        p.getConfigurator().reconfigure(p, m, n)
      }
      return p
    },
    getCurrentConfig: function() {
      var m = this.getConfigurator();
      return m.getCurrentConfig(this)
    },
    hasConfig: function(m) {
      return m in this.defaultConfig
    },
    getInitialConfig: function(n) {
      var m = this.config;
      if (!n) {
        return m
      }
      return m[n]
    },
    $links: null,
    link: function(n, p) {
      var o = this,
        m = o.$links || (o.$links = {});
      m[n] = true;
      o[n] = p;
      return p
    },
    unlink: function(r) {
      var p = this,
        m, o, n, q;
      for (m = 0, o = r.length; m < o; m++) {
        n = r[m];
        q = p[n];
        if (q) {
          if (q.isInstance && !q.destroyed) {
            q.destroy()
          } else {
            if (q.parentNode && "nodeType" in q) {
              q.parentNode.removeChild(q)
            }
          }
        }
        p[n] = null
      }
      return p
    },
    destroy: function() {
      var n = this,
        m = n.$links;
      n.initialConfig = n.config = null;
      n.destroy = Ext.emptyFn;
      n.isDestroyed = n.destroyed = true;
      if (m) {
        n.$links = null;
        n.unlink(Ext.Object.getKeys(m))
      }
    }
  });
  d.callOverridden = d.callParent;
  return g
}(Ext.Function.flexSetter));
(function(b, a) {
  (Ext.util || (Ext.util = {})).Cache = b = function(c) {
    var e = this,
      d;
    if (c) {
      Ext.apply(e, c)
    }
    e.head = d = {
      key: null,
      value: null
    };
    e.map = {};
    d.next = d.prev = d
  };
  b.prototype = a = {
    maxSize: 100,
    count: 0,
    clear: function() {
      var e = this,
        c = e.head,
        d = c.next;
      c.next = c.prev = c;
      if (!e.evict.$nullFn) {
        for (; d !== c; d = d.next) {
          e.evict(d.key, d.value)
        }
      }
      e.count = 0
    },
    each: function(e, d) {
      d = d || this;
      for (var c = this.head, f = c.next; f !== c; f = f.next) {
        if (e.call(d, f.key, f.value)) {
          break
        }
      }
    },
    get: function(d) {
      var f = this,
        c = f.head,
        g = f.map,
        e = g[d];
      if (e) {
        if (e.prev !== c) {
          f.unlinkEntry(e);
          f.linkEntry(e)
        }
      } else {
        g[d] = e = {
          key: d,
          value: f.miss.apply(f, arguments)
        };
        f.linkEntry(e);
        ++f.count;
        while (f.count > f.maxSize) {
          f.unlinkEntry(c.prev, true);
          --f.count
        }
      }
      return e.value
    },
    evict: Ext.emptyFn,
    linkEntry: function(d) {
      var c = this.head,
        e = c.next;
      d.next = e;
      d.prev = c;
      c.next = d;
      e.prev = d
    },
    unlinkEntry: function(e, f) {
      var c = e.next,
        d = e.prev;
      d.next = c;
      c.prev = d;
      if (f) {
        this.evict(e.key, e.value)
      }
    }
  };
  a.destroy = a.clear
}());
(function() {
  var d, c = Ext.Base,
    e = c.$staticMembers,
    b = function(g, f) {
      return (g.length - f.length) || ((g < f) ? -1 : ((g > f) ? 1 : 0))
    };

  function a(g) {
    function f() {
      return this.constructor.apply(this, arguments) || null
    }
    return f
  }
  Ext.Class = d = function(g, h, f) {
    if (typeof g != "function") {
      f = h;
      h = g;
      g = null
    }
    if (!h) {
      h = {}
    }
    g = d.create(g, h);
    d.process(g, h, f);
    return g
  };
  Ext.apply(d, {
    makeCtor: a,
    onBeforeCreated: function(g, h, f) {
      g.addMembers(h);
      f.onCreated.call(g, g)
    },
    create: function(f, j) {
      var h = e.length,
        g;
      if (!f) {
        f = a()
      }
      while (h--) {
        g = e[h];
        f[g] = c[g]
      }
      return f
    },
    process: function(f, n, h) {
      var g = n.preprocessors || d.defaultPreprocessors,
        q = this.preprocessors,
        t = {
          onBeforeCreated: this.onBeforeCreated
        },
        s = [],
        u, m, l, r, k, p, o;
      delete n.preprocessors;
      f._classHooks = t;
      for (l = 0, r = g.length; l < r; l++) {
        u = g[l];
        if (typeof u == "string") {
          u = q[u];
          m = u.properties;
          if (m === true) {
            s.push(u.fn)
          } else {
            if (m) {
              for (k = 0, p = m.length; k < p; k++) {
                o = m[k];
                if (n.hasOwnProperty(o)) {
                  s.push(u.fn);
                  break
                }
              }
            }
          }
        } else {
          s.push(u)
        }
      }
      t.onCreated = h ? h : Ext.emptyFn;
      t.preprocessors = s;
      this.doProcess(f, n, t)
    },
    doProcess: function(g, k, f) {
      var j = this,
        l = f.preprocessors,
        h = l.shift(),
        i = j.doProcess;
      for (; h; h = l.shift()) {
        if (h.call(j, g, k, f, i) === false) {
          return
        }
      }
      f.onBeforeCreated.apply(j, arguments)
    },
    preprocessors: {},
    registerPreprocessor: function(g, j, h, f, i) {
      if (!f) {
        f = "last"
      }
      if (!h) {
        h = [g]
      }
      this.preprocessors[g] = {
        name: g,
        properties: h || false,
        fn: j
      };
      this.setDefaultPreprocessorPosition(g, f, i);
      return this
    },
    getPreprocessor: function(f) {
      return this.preprocessors[f]
    },
    getPreprocessors: function() {
      return this.preprocessors
    },
    defaultPreprocessors: [],
    getDefaultPreprocessors: function() {
      return this.defaultPreprocessors
    },
    setDefaultPreprocessors: function(f) {
      this.defaultPreprocessors = Ext.Array.from(f);
      return this
    },
    setDefaultPreprocessorPosition: function(h, j, i) {
      var f = this.defaultPreprocessors,
        g;
      if (typeof j == "string") {
        if (j === "first") {
          f.unshift(h);
          return this
        } else {
          if (j === "last") {
            f.push(h);
            return this
          }
        }
        j = (j === "after") ? 1 : -1
      }
      g = Ext.Array.indexOf(f, i);
      if (g !== -1) {
        Ext.Array.splice(f, Math.max(0, g + j), 0, h)
      }
      return this
    }
  });
  d.registerPreprocessor("extend", function(g, j, o) {
    var k = Ext.Base,
      l = k.prototype,
      m = j.extend,
      f, n, h;
    delete j.extend;
    if (m && m !== Object) {
      f = m
    } else {
      f = k
    }
    n = f.prototype;
    if (!f.$isClass) {
      for (h in l) {
        if (!n[h]) {
          n[h] = l[h]
        }
      }
    }
    g.extend(f);
    g.triggerExtended.apply(g, arguments);
    if (j.onClassExtended) {
      g.onExtended(j.onClassExtended, g);
      delete j.onClassExtended
    }
  }, true);
  d.registerPreprocessor("privates", function(f, i) {
    var h = i.privates,
      j = h.statics,
      g = h.privacy || true;
    delete i.privates;
    delete h.statics;
    f.addMembers(h, false, g);
    if (j) {
      f.addMembers(j, true, g)
    }
  });
  d.registerPreprocessor("statics", function(f, g) {
    f.addStatics(g.statics);
    delete g.statics
  });
  d.registerPreprocessor("inheritableStatics", function(f, g) {
    f.addInheritableStatics(g.inheritableStatics);
    delete g.inheritableStatics
  });
  Ext.createRuleFn = function(f) {
    return new Function("$c", "with($c) { return (" + f + "); }")
  };
  Ext.expressionCache = new Ext.util.Cache({
    miss: Ext.createRuleFn
  });
  Ext.ruleKeySortFn = b;
  Ext.getPlatformConfigKeys = function(h) {
    var g = [],
      f, i;
    for (f in h) {
      i = Ext.expressionCache.get(f);
      if (i(Ext.platformTags)) {
        g.push(f)
      }
    }
    g.sort(b);
    return g
  };
  d.registerPreprocessor("platformConfig", function(h, m, t) {
    var n = m.platformConfig,
      j = m.config,
      r, o, p, k, g, u, f, s, l, q;
    delete m.platformConfig;
    k = h.getConfigurator();
    o = k.configs;
    u = Ext.getPlatformConfigKeys(n);
    for (l = 0, q = u.length; l < q; ++l) {
      p = n[u[l]];
      g = r = null;
      for (f in p) {
        s = p[f];
        if (j && f in j) {
          (r || (r = {}))[f] = s;
          (g || (g = {}))[f] = j[f];
          delete j[f]
        } else {
          if (f in o) {
            (r || (r = {}))[f] = s
          } else {
            m[f] = s
          }
        }
      }
      if (g) {
        k.add(g)
      }
      if (r) {
        k.add(r)
      }
    }
  });
  d.registerPreprocessor("config", function(f, g) {
    if (g.hasOwnProperty("$configPrefixed")) {
      f.prototype.$configPrefixed = g.$configPrefixed
    }
    f.addConfig(g.config);
    delete g.config
  });
  d.registerPreprocessor("cachedConfig", function(f, g) {
    if (g.hasOwnProperty("$configPrefixed")) {
      f.prototype.$configPrefixed = g.$configPrefixed
    }
    f.addCachedConfig(g.cachedConfig);
    delete g.cachedConfig
  });
  d.registerPreprocessor("mixins", function(i, j, f) {
    var h = j.mixins,
      g = f.onCreated;
    delete j.mixins;
    f.onCreated = function() {
      f.onCreated = g;
      i.mixin(h);
      return f.onCreated.apply(this, arguments)
    }
  });
  Ext.extend = function(h, i, g) {
    if (arguments.length === 2 && Ext.isObject(i)) {
      g = i;
      i = h;
      h = null
    }
    var f;
    if (!i) {
      throw new Error(
        "[Ext.extend] Attempting to extend from a class which has not been loaded on the page."
      )
    }
    g.extend = i;
    g.preprocessors = ["extend", "statics", "inheritableStatics", "mixins",
      "platformConfig", "config"
    ];
    if (h) {
      f = new d(h, g);
      f.prototype.constructor = h
    } else {
      f = new d(g)
    }
    f.prototype.override = function(k) {
      for (var j in k) {
        if (k.hasOwnProperty(j)) {
          this[j] = k[j]
        }
      }
    };
    return f
  }
}());
Ext.Inventory = function() {
  var a = this;
  a.names = [];
  a.paths = {};
  a.alternateToName = {};
  a.aliasToName = {};
  a.nameToAliases = {};
  a.nameToAlternates = {}
};
Ext.Inventory.prototype = {
  _array1: [0],
  prefixes: null,
  dotRe: /\./g,
  wildcardRe: /\*/g,
  addAlias: function(b, a) {
    return this.addMapping(b, a, this.aliasToName, this.nameToAliases)
  },
  addAlternate: function(a, b) {
    return this.addMapping(a, b, this.alternateToName, this.nameToAlternates)
  },
  addMapping: function(k, e, f, m) {
    var b = k.$className || k,
      h = b,
      j = this._array1,
      n, d, o, g, c, l;
    if (Ext.isString(b)) {
      h = {};
      h[b] = e
    }
    for (o in h) {
      d = h[o];
      if (Ext.isString(d)) {
        j[0] = d;
        d = j
      }
      c = d.length;
      l = m[o] || (m[o] = []);
      for (g = 0; g < c; ++g) {
        if (!(n = d[g])) {
          continue
        }
        if (f[n] !== o) {
          f[n] = o;
          l.push(n)
        }
      }
    }
  },
  getAliasesByName: function(a) {
    return this.nameToAliases[a] || null
  },
  getAlternatesByName: function(a) {
    return this.nameToAlternates[a] || null
  },
  getNameByAlias: function(a) {
    return this.aliasToName[a] || ""
  },
  getNameByAlternate: function(a) {
    return this.alternateToName[a] || ""
  },
  getNamesByExpression: function(l, a, h) {
    var u = this,
      r = u.aliasToName,
      o = u.alternateToName,
      b = u.nameToAliases,
      d = u.nameToAlternates,
      t = h ? a : {},
      k = [],
      s = Ext.isString(l) ? [l] : l,
      g = s.length,
      e = u.wildcardRe,
      c, p, q, j, m, v, f;
    for (p = 0; p < g; ++p) {
      if ((c = s[p]).indexOf("*") < 0) {
        if (!(v = r[c])) {
          if (!(v = o[c])) {
            v = c
          }
        }
        if (!(v in t) && !(a && (v in a))) {
          t[v] = 1;
          k.push(v)
        }
      } else {
        f = new RegExp("^" + c.replace(e, "(.*?)") + "$");
        for (v in b) {
          if (!(v in t) && !(a && (v in a))) {
            if (!(j = f.test(v))) {
              m = (q = b[v]).length;
              while (!j && m-- > 0) {
                j = f.test(q[m])
              }
              q = d[v];
              if (q && !j) {
                m = q.length;
                while (!j && m-- > 0) {
                  j = f.test(q[m])
                }
              }
            }
            if (j) {
              t[v] = 1;
              k.push(v)
            }
          }
        }
      }
    }
    return k
  },
  getPath: function(b) {
    var c = this,
      e = c.paths,
      a = "",
      d;
    if (b in e) {
      a = e[b]
    } else {
      d = c.getPrefix(b);
      if (d) {
        b = b.substring(d.length + 1);
        a = e[d];
        if (a) {
          a += "/"
        }
      }
      a += b.replace(c.dotRe, "/") + ".js"
    }
    return a
  },
  getPrefix: function(b) {
    if (b in this.paths) {
      return b
    }
    var e = this.getPrefixes(),
      a = e.length,
      c, d;
    while (a-- > 0) {
      c = (d = e[a]).length;
      if (c < b.length && b.charAt(c) === "." && d === b.substring(0, c)) {
        return d
      }
    }
    return ""
  },
  getPrefixes: function() {
    var a = this,
      b = a.prefixes;
    if (!b) {
      a.prefixes = b = a.names.slice(0);
      b.sort(a._compareNames)
    }
    return b
  },
  removeName: function(b) {
    var f = this,
      j = f.aliasToName,
      l = f.alternateToName,
      k = f.nameToAliases,
      e = f.nameToAlternates,
      c = k[b],
      g = e[b],
      d, h;
    delete k[b];
    delete e[b];
    if (c) {
      for (d = c.length; d--;) {
        if (b === (h = c[d])) {
          delete j[h]
        }
      }
    }
    if (g) {
      for (d = g.length; d--;) {
        if (b === (h = g[d])) {
          delete l[h]
        }
      }
    }
  },
  resolveName: function(a) {
    var b = this,
      c;
    if (!(a in b.nameToAliases)) {
      if (!(c = b.aliasToName[a])) {
        c = b.alternateToName[a]
      }
    }
    return c || a
  },
  select: function(e, c) {
    var d = this,
      f = {},
      b = {
        excludes: f,
        exclude: function() {
          d.getNamesByExpression(arguments, f, true);
          return this
        }
      },
      a;
    for (a in e) {
      b[a] = d.selectMethod(f, e[a], c || e)
    }
    return b
  },
  selectMethod: function(d, b, a) {
    var c = this;
    return function(e) {
      var f = Ext.Array.slice(arguments, 1);
      f.unshift(c.getNamesByExpression(e, d));
      return b.apply(a, f)
    }
  },
  setPath: Ext.Function.flexSetter(function(a, c) {
    var b = this;
    b.paths[a] = c;
    b.names.push(a);
    b.prefixes = null;
    return b
  }),
  _compareNames: function(a, c) {
    var b = a.length - c.length;
    if (!b) {
      b = (a < c) ? -1 : 1
    }
    return b
  }
};
Ext.ClassManager = (function(p, k, r, e, n) {
  var b = Ext.Class.makeCtor,
    g = [],
    h = {
      Ext: {
        name: "Ext",
        value: Ext
      }
    },
    c = Ext.apply(new Ext.Inventory(), {
      classes: {},
      classState: {},
      existCache: {},
      instantiators: [],
      isCreated: function(t) {
        if (c.classes[t] || c.existCache[t]) {
          return true
        }
        if (!c.lookupName(t, false)) {
          return false
        }
        c.triggerCreated(t);
        return true
      },
      createdListeners: [],
      nameCreatedListeners: {},
      existsListeners: [],
      nameExistsListeners: {},
      overrideMap: {},
      triggerCreated: function(t, u) {
        c.existCache[t] = u || 1;
        c.classState[t] += 40;
        c.notify(t, c.createdListeners, c.nameCreatedListeners)
      },
      onCreated: function(v, u, t) {
        c.addListener(v, u, t, c.createdListeners, c.nameCreatedListeners)
      },
      notify: function(B, D, v) {
        var w = c.getAlternatesByName(B),
          C = [B],
          y, A, x, z, u, t;
        for (y = 0, A = D.length; y < A; y++) {
          u = D[y];
          u.fn.call(u.scope, B)
        }
        while (C) {
          for (y = 0, A = C.length; y < A; y++) {
            t = C[y];
            D = v[t];
            if (D) {
              for (x = 0, z = D.length; x < z; x++) {
                u = D[x];
                u.fn.call(u.scope, t)
              }
              delete v[t]
            }
          }
          C = w;
          w = null
        }
      },
      addListener: function(y, x, w, v, u) {
        if (Ext.isArray(w)) {
          y = Ext.Function.createBarrier(w.length, y, x);
          for (t = 0; t < w.length; t++) {
            this.addListener(y, null, w[t], v, u)
          }
          return
        }
        var t, z = {
          fn: y,
          scope: x
        };
        if (w) {
          if (this.isCreated(w)) {
            y.call(x, w);
            return
          }
          if (!u[w]) {
            u[w] = []
          }
          u[w].push(z)
        } else {
          v.push(z)
        }
      },
      $namespaceCache: h,
      addRootNamespaces: function(u) {
        for (var t in u) {
          h[t] = {
            name: t,
            value: u[t]
          }
        }
      },
      clearNamespaceCache: function() {
        g.length = 0;
        for (var t in h) {
          if (!h[t].value) {
            delete h[t]
          }
        }
      },
      getNamespaceEntry: function(u) {
        if (typeof u !== "string") {
          return u
        }
        var v = h[u],
          t;
        if (!v) {
          t = u.lastIndexOf(".");
          if (t < 0) {
            v = {
              name: u
            }
          } else {
            v = {
              name: u.substring(t + 1),
              parent: c.getNamespaceEntry(u.substring(0, t))
            }
          }
          h[u] = v
        }
        return v
      },
      lookupName: function(w, y) {
        var x = c.getNamespaceEntry(w),
          v = Ext.global,
          t = 0,
          z, u;
        for (z = x; z; z = z.parent) {
          g[t++] = z
        }
        while (v && t-- > 0) {
          z = g[t];
          u = v;
          v = z.value || v[z.name];
          if (!v && y) {
            u[z.name] = v = {}
          }
        }
        return v
      },
      setNamespace: function(u, w) {
        var v = c.getNamespaceEntry(u),
          t = Ext.global;
        if (v.parent) {
          t = c.lookupName(v.parent, true)
        }
        t[v.name] = w;
        return w
      },
      set: function(t, v) {
        var u = c.getName(v);
        c.classes[t] = c.setNamespace(t, v);
        if (u && u !== t) {
          c.addAlternate(u, t)
        }
        return c
      },
      get: function(t) {
        return c.classes[t] || c.lookupName(t, false)
      },
      addNameAliasMappings: function(t) {
        c.addAlias(t)
      },
      addNameAlternateMappings: function(t) {
        c.addAlternate(t)
      },
      getByAlias: function(t) {
        return c.get(c.getNameByAlias(t))
      },
      getName: function(t) {
        return t && t.$className || ""
      },
      getClass: function(t) {
        return t && t.self || null
      },
      create: function(u, w, t) {
        var v = b(u);
        if (typeof w === "function") {
          w = w(v)
        }
        w.$className = u;
        return new p(v, w, function() {
          var x = w.postprocessors || c.defaultPostprocessors,
            E = c.postprocessors,
            F = [],
            D, z, C, y, B, A, G;
          delete w.postprocessors;
          for (z = 0, C = x.length; z < C; z++) {
            D = x[z];
            if (typeof D === "string") {
              D = E[D];
              A = D.properties;
              if (A === true) {
                F.push(D.fn)
              } else {
                if (A) {
                  for (y = 0, B = A.length; y < B; y++) {
                    G = A[y];
                    if (w.hasOwnProperty(G)) {
                      F.push(D.fn);
                      break
                    }
                  }
                }
              }
            } else {
              F.push(D)
            }
          }
          w.postprocessors = F;
          w.createdFn = t;
          c.processCreate(u, this, w)
        })
      },
      processCreate: function(w, u, y) {
        var x = this,
          t = y.postprocessors.shift(),
          v = y.createdFn;
        if (!t) {
          if (w) {
            x.set(w, u)
          }
          delete u._classHooks;
          if (v) {
            v.call(u, u)
          }
          if (w) {
            x.triggerCreated(w)
          }
          return
        }
        if (t.call(x, w, u, y, x.processCreate) !== false) {
          x.processCreate(w, u, y)
        }
      },
      createOverride: function(z, x, v) {
        var B = this,
          C = x.override,
          E = x.requires,
          w = x.uses,
          y = x.mixins,
          t, D = x.compatibility,
          A, u = function() {
            var F, J, I, H, G;
            if (!A) {
              J = E ? E.slice(0) : [];
              if (y) {
                if (!(t = y instanceof Array)) {
                  for (H in y) {
                    if (Ext.isString(F = y[H])) {
                      J.push(F)
                    }
                  }
                } else {
                  for (I = 0, G = y.length; I < G; ++I) {
                    if (Ext.isString(F = y[I])) {
                      J.push(F)
                    }
                  }
                }
              }
              A = true;
              if (J.length) {
                Ext.require(J, u);
                return
              }
            }
            if (t) {
              for (I = 0, G = y.length; I < G; ++I) {
                if (Ext.isString(F = y[I])) {
                  y[I] = Ext.ClassManager.get(F)
                }
              }
            } else {
              if (y) {
                for (H in y) {
                  if (Ext.isString(F = y[H])) {
                    y[H] = Ext.ClassManager.get(F)
                  }
                }
              }
            }
            F = B.get(C);
            delete x.override;
            delete x.compatibility;
            delete x.requires;
            delete x.uses;
            Ext.override(F, x);
            Ext.Loader.history.push(z);
            if (w) {
              Ext.Loader.addUsedClasses(w)
            }
            if (v) {
              v.call(F, F)
            }
          };
        c.overrideMap[z] = true;
        if (!D || Ext.checkVersion(D)) {
          B.onCreated(u, B, C)
        }
        B.triggerCreated(z, 2);
        return B
      },
      instantiateByAlias: function() {
        var u = arguments[0],
          t = r.call(arguments),
          v = this.getNameByAlias(u);
        t[0] = v;
        return Ext.create.apply(Ext, t)
      },
      instantiate: function() {
        return Ext.create.apply(Ext, arguments)
      },
      dynInstantiate: function(u, t) {
        t = e(t, true);
        t.unshift(u);
        return Ext.create.apply(Ext, t)
      },
      getInstantiator: function(w) {
        var v = this.instantiators,
          x, u, t;
        x = v[w];
        if (!x) {
          u = w;
          t = [];
          for (u = 0; u < w; u++) {
            t.push("a[" + u + "]")
          }
          x = v[w] = new Function("c", "a", "return new c(" + t.join(
            ",") + ")")
        }
        return x
      },
      postprocessors: {},
      defaultPostprocessors: [],
      registerPostprocessor: function(u, x, v, t, w) {
        if (!t) {
          t = "last"
        }
        if (!v) {
          v = [u]
        }
        this.postprocessors[u] = {
          name: u,
          properties: v || false,
          fn: x
        };
        this.setDefaultPostprocessorPosition(u, t, w);
        return this
      },
      setDefaultPostprocessors: function(t) {
        this.defaultPostprocessors = e(t);
        return this
      },
      setDefaultPostprocessorPosition: function(u, x, w) {
        var v = this.defaultPostprocessors,
          t;
        if (typeof x === "string") {
          if (x === "first") {
            v.unshift(u);
            return this
          } else {
            if (x === "last") {
              v.push(u);
              return this
            }
          }
          x = (x === "after") ? 1 : -1
        }
        t = Ext.Array.indexOf(v, w);
        if (t !== -1) {
          Ext.Array.splice(v, Math.max(0, t + x), 0, u)
        }
        return this
      }
    });
  c.registerPostprocessor("alias", function(v, u, y) {
    var t = Ext.Array.from(y.alias),
      w, x;
    for (w = 0, x = t.length; w < x; w++) {
      k = t[w];
      this.addAlias(u, k)
    }
  }, ["xtype", "alias"]);
  c.registerPostprocessor("singleton", function(u, t, w, v) {
    if (w.singleton) {
      v.call(this, u, new t(), w)
    } else {
      return true
    }
    return false
  });
  c.registerPostprocessor("alternateClassName", function(u, t, y) {
    var w = y.alternateClassName,
      v, x, z;
    if (!(w instanceof Array)) {
      w = [w]
    }
    for (v = 0, x = w.length; v < x; v++) {
      z = w[v];
      this.set(z, t)
    }
  });
  c.registerPostprocessor("debugHooks", function(u, t, v) {
    var w = t.isInstance ? t.self : t;
    delete w.prototype.debugHooks
  });
  c.registerPostprocessor("deprecated", function(u, t, v) {
    var w = t.isInstance ? t.self : t;
    w.addDeprecations(v.deprecated);
    delete w.prototype.deprecated
  });
  Ext.apply(Ext, {
    create: function() {
      var v = arguments[0],
        w = typeof v,
        u = r.call(arguments, 1),
        t;
      if (w === "function") {
        t = v
      } else {
        if (w !== "string" && u.length === 0) {
          u = [v];
          if (!(v = v.xclass)) {
            v = u[0].xtype;
            if (v) {
              v = "widget." + v
            }
          }
        }
        v = c.resolveName(v);
        t = c.get(v)
      }
      if (!t) {
        Ext.syncRequire(v);
        t = c.get(v)
      }
      return c.getInstantiator(u.length)(t, u)
    },
    widget: function(v, u) {
      var y = v,
        w, x, t;
      if (typeof y !== "string") {
        u = v;
        y = u.xtype;
        x = u.xclass
      } else {
        u = u || {}
      }
      if (u.isComponent) {
        return u
      }
      if (!x) {
        w = "widget." + y;
        x = c.getNameByAlias(w)
      }
      if (x) {
        t = c.get(x)
      }
      if (!t) {
        return Ext.create(x || w, u)
      }
      return new t(u)
    },
    createByAlias: k(c, "instantiateByAlias"),
    define: function(u, v, t) {
      if (v.override) {
        c.classState[u] = 20;
        return c.createOverride.apply(c, arguments)
      }
      c.classState[u] = 10;
      return c.create.apply(c, arguments)
    },
    undefine: function(y) {
      var u = c.classes,
        v, A, t, w;
      delete u[y];
      delete c.existCache[y];
      delete c.classState[y];
      c.removeName(y);
      var z = c.getNamespaceEntry(y),
        B = z.parent ? c.lookupName(z.parent, false) : Ext.global;
      if (B) {
        try {
          delete B[z.name]
        } catch (x) {
          B[z.name] = undefined
        }
      }
    },
    getClassName: k(c, "getName"),
    getDisplayName: function(t) {
      if (t) {
        if (t.displayName) {
          return t.displayName
        }
        if (t.$name && t.$class) {
          return Ext.getClassName(t.$class) + "#" + t.$name
        }
        if (t.$className) {
          return t.$className
        }
      }
      return "Anonymous"
    },
    getClass: k(c, "getClass"),
    namespace: function() {
      var t = n,
        u;
      for (u = arguments.length; u-- > 0;) {
        t = c.lookupName(arguments[u], true)
      }
      return t
    }
  });
  Ext.addRootNamespaces = c.addRootNamespaces;
  Ext.createWidget = Ext.widget;
  Ext.ns = Ext.namespace;
  p.registerPreprocessor("className", function(t, u) {
    if ("$className" in u) {
      t.$className = u.$className
    }
  }, true, "first");
  p.registerPreprocessor("alias", function(E, y) {
    var C = E.prototype,
      v = e(y.xtype),
      t = e(y.alias),
      F = "widget.",
      D = F.length,
      z = Array.prototype.slice.call(C.xtypesChain || []),
      w = Ext.merge({}, C.xtypesMap || {}),
      x, B, A, u;
    for (x = 0, B = t.length; x < B; x++) {
      A = t[x];
      if (A.substring(0, D) === F) {
        u = A.substring(D);
        Ext.Array.include(v, u)
      }
    }
    E.xtype = y.xtype = v[0];
    y.xtypes = v;
    for (x = 0, B = v.length; x < B; x++) {
      u = v[x];
      if (!w[u]) {
        w[u] = true;
        z.push(u)
      }
    }
    y.xtypesChain = z;
    y.xtypesMap = w;
    Ext.Function.interceptAfter(y, "onClassCreated", function() {
      var G = C.mixins,
        I, H;
      for (I in G) {
        if (G.hasOwnProperty(I)) {
          H = G[I];
          v = H.xtypes;
          if (v) {
            for (x = 0, B = v.length; x < B; x++) {
              u = v[x];
              if (!w[u]) {
                w[u] = true;
                z.push(u)
              }
            }
          }
        }
      }
    });
    for (x = 0, B = v.length; x < B; x++) {
      u = v[x];
      Ext.Array.include(t, F + u)
    }
    y.alias = t
  }, ["xtype", "alias"]);
  if (Ext.manifest) {
    var f = Ext.manifest,
      q = f.classes,
      m = f.paths,
      o = {},
      i = {},
      d, j, s, l, a;
    if (m) {
      if (f.bootRelative) {
        a = Ext.Boot.baseUrl;
        for (l in m) {
          if (m.hasOwnProperty(l)) {
            m[l] = a + m[l]
          }
        }
      }
      c.setPath(m)
    }
    if (q) {
      for (d in q) {
        i[d] = [];
        o[d] = [];
        j = q[d];
        if (j.alias) {
          o[d] = j.alias
        }
        if (j.alternates) {
          i[d] = j.alternates
        }
      }
    }
    c.addAlias(o);
    c.addAlternate(i)
  }
  return c
}(Ext.Class, Ext.Function.alias, Array.prototype.slice, Ext.Array.from, Ext
  .global));
(Ext.env || (Ext.env = {})).Browser = function(t, n) {
  var u = this,
    a = u.browserPrefixes,
    b = u.enginePrefixes,
    q = t.match(new RegExp("((?:" + Ext.Object.getValues(a).join(")|(?:") +
      "))([\\w\\._]+)")),
    g = t.match(new RegExp("((?:" + Ext.Object.getValues(b).join(")|(?:") +
      "))([\\w\\._]+)")),
    c = u.browserNames,
    p = c.other,
    j = u.engineNames,
    s = j.other,
    l = "",
    f = "",
    d = "",
    h = false,
    o, m, k, v, r;
  u.userAgent = t;
  if (q) {
    p = c[Ext.Object.getKey(a, q[1])];
    if (p === "Safari" && /^Opera/.test(t)) {
      p = "Opera"
    }
    l = new Ext.Version(q[2])
  }
  if (g) {
    s = j[Ext.Object.getKey(b, g[1])];
    f = new Ext.Version(g[2])
  }
  if (s === "Trident" && p !== "IE") {
    p = "IE";
    var e = t.match(/.*rv:(\d+.\d+)/);
    if (e && e.length) {
      e = e[1];
      l = new Ext.Version(e)
    }
  }
  if (p && l) {
    Ext.setVersion(p, l)
  }
  if (t.match(/FB/) && p === "Other") {
    p = c.safari;
    s = j.webkit
  }
  if (t.match(/Android.*Chrome/g)) {
    p = "ChromeMobile"
  }
  if (t.match(/OPR/)) {
    p = "Opera";
    q = t.match(/OPR\/(\d+.\d+)/);
    l = new Ext.Version(q[1])
  }
  Ext.apply(this, {
    engineName: s,
    engineVersion: f,
    name: p,
    version: l
  });
  this.setFlag(p, true, n);
  if (l) {
    d = l.getMajor() || "";
    if (u.is.IE) {
      d = parseInt(d, 10);
      k = document.documentMode;
      if (k === 7 || (d === 7 && k !== 8 && k !== 9 && k !== 10)) {
        d = 7
      } else {
        if (k === 8 || (d === 8 && k !== 8 && k !== 9 && k !== 10)) {
          d = 8
        } else {
          if (k === 9 || (d === 9 && k !== 7 && k !== 8 && k !== 10)) {
            d = 9
          } else {
            if (k === 10 || (d === 10 && k !== 7 && k !== 8 && k !== 9)) {
              d = 10
            } else {
              if (k === 11 || (d === 11 && k !== 7 && k !== 8 && k !== 9 && k !==
                  10)) {
                d = 11
              }
            }
          }
        }
      }
      r = Math.max(d, 11);
      for (o = 7; o <= r; ++o) {
        m = "isIE" + o;
        if (d <= o) {
          Ext[m + "m"] = true
        }
        if (d === o) {
          Ext[m] = true
        }
        if (d >= o) {
          Ext[m + "p"] = true
        }
      }
    }
    if (u.is.Opera && parseInt(d, 10) <= 12) {
      Ext.isOpera12m = true
    }
    Ext.chromeVersion = Ext.isChrome ? d : 0;
    Ext.firefoxVersion = Ext.isFirefox ? d : 0;
    Ext.ieVersion = Ext.isIE ? d : 0;
    Ext.operaVersion = Ext.isOpera ? d : 0;
    Ext.safariVersion = Ext.isSafari ? d : 0;
    Ext.webKitVersion = Ext.isWebKit ? d : 0;
    this.setFlag(p + d, true, n);
    this.setFlag(p + l.getShortVersion())
  }
  for (o in c) {
    if (c.hasOwnProperty(o)) {
      v = c[o];
      this.setFlag(v, p === v)
    }
  }
  this.setFlag(v);
  if (f) {
    this.setFlag(s + (f.getMajor() || ""));
    this.setFlag(s + f.getShortVersion())
  }
  for (o in j) {
    if (j.hasOwnProperty(o)) {
      v = j[o];
      this.setFlag(v, s === v, n)
    }
  }
  this.setFlag("Standalone", !!navigator.standalone);
  this.setFlag("Ripple", !!document.getElementById("tinyhippos-injected") &&
    !Ext.isEmpty(window.top.ripple));
  this.setFlag("WebWorks", !!window.blackberry);
  if (window.PhoneGap !== undefined || window.Cordova !== undefined || window
    .cordova !== undefined) {
    h = true;
    this.setFlag("PhoneGap");
    this.setFlag("Cordova")
  } else {
    if (!!window.isNK) {
      h = true;
      this.setFlag("Sencha")
    }
  }
  if (/(Glass)/i.test(t)) {
    this.setFlag("GoogleGlass")
  }
  if (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)(?!.*FBAN)/i.test(t)) {
    h = true
  }
  this.setFlag("WebView", h);
  this.isStrict = Ext.isStrict = document.compatMode === "CSS1Compat";
  this.isSecure = Ext.isSecure;
  this.identity = p + d + (this.isStrict ? "Strict" : "Quirks")
};
Ext.env.Browser.prototype = {
  constructor: Ext.env.Browser,
  browserNames: {
    ie: "IE",
    firefox: "Firefox",
    safari: "Safari",
    chrome: "Chrome",
    opera: "Opera",
    dolfin: "Dolfin",
    webosbrowser: "webOSBrowser",
    chromeMobile: "ChromeMobile",
    chromeiOS: "ChromeiOS",
    silk: "Silk",
    other: "Other"
  },
  engineNames: {
    webkit: "WebKit",
    gecko: "Gecko",
    presto: "Presto",
    trident: "Trident",
    other: "Other"
  },
  enginePrefixes: {
    webkit: "AppleWebKit/",
    gecko: "Gecko/",
    presto: "Presto/",
    trident: "Trident/"
  },
  browserPrefixes: {
    ie: "MSIE ",
    firefox: "Firefox/",
    chrome: "Chrome/",
    safari: "Version/",
    opera: "OPR/",
    dolfin: "Dolfin/",
    webosbrowser: "wOSBrowser/",
    chromeMobile: "CrMo/",
    chromeiOS: "CriOS/",
    silk: "Silk/"
  },
  styleDashPrefixes: {
    WebKit: "-webkit-",
    Gecko: "-moz-",
    Trident: "-ms-",
    Presto: "-o-",
    Other: ""
  },
  stylePrefixes: {
    WebKit: "Webkit",
    Gecko: "Moz",
    Trident: "ms",
    Presto: "O",
    Other: ""
  },
  propertyPrefixes: {
    WebKit: "webkit",
    Gecko: "moz",
    Trident: "ms",
    Presto: "o",
    Other: ""
  },
  is: function(a) {
    return !!this.is[a]
  },
  name: null,
  version: null,
  engineName: null,
  engineVersion: null,
  setFlag: function(a, c, b) {
    if (c === undefined) {
      c = true
    }
    this.is[a] = c;
    this.is[a.toLowerCase()] = c;
    if (b) {
      Ext["is" + a] = c
    }
    return this
  },
  getStyleDashPrefix: function() {
    return this.styleDashPrefixes[this.engineName]
  },
  getStylePrefix: function() {
    return this.stylePrefixes[this.engineName]
  },
  getVendorProperyName: function(a) {
    var b = this.propertyPrefixes[this.engineName];
    if (b.length > 0) {
      return b + Ext.String.capitalize(a)
    }
    return a
  },
  getPreferredTranslationMethod: function(a) {
    if (typeof a === "object" && "translationMethod" in a && a.translationMethod !==
      "auto") {
      return a.translationMethod
    } else {
      return "csstransform"
    }
  }
};
(function(a) {
  Ext.browser = new Ext.env.Browser(a, true);
  Ext.userAgent = a.toLowerCase();
  Ext.SSL_SECURE_URL = Ext.isSecure && Ext.isIE ? "javascript:''" :
    "about:blank"
}(Ext.global.navigator.userAgent));
Ext.env.OS = function(o, b, l) {
  var k = this,
    j = k.names,
    d = k.prefixes,
    a, h = "",
    f = k.is,
    c, g, e, n, m;
  l = l || Ext.browser;
  for (c in d) {
    if (d.hasOwnProperty(c)) {
      g = d[c];
      e = o.match(new RegExp("(?:" + g + ")([^\\s;]+)"));
      if (e) {
        a = j[c];
        m = e[1];
        if (m && m === "HTC_") {
          h = new Ext.Version("2.3")
        } else {
          if (m && m === "Silk/") {
            h = new Ext.Version("2.3")
          } else {
            h = new Ext.Version(e[e.length - 1])
          }
        }
        break
      }
    }
  }
  if (!a) {
    a = j[(o.toLowerCase().match(/mac|win|linux/) || ["other"])[0]];
    h = new Ext.Version("")
  }
  this.name = a;
  this.version = h;
  if (b) {
    this.setFlag(b.replace(/ simulator$/i, ""))
  }
  this.setFlag(a);
  if (h) {
    this.setFlag(a + (h.getMajor() || ""));
    this.setFlag(a + h.getShortVersion())
  }
  for (c in j) {
    if (j.hasOwnProperty(c)) {
      n = j[c];
      if (!f.hasOwnProperty(a)) {
        this.setFlag(n, (a === n))
      }
    }
  }
  if (this.name === "iOS" && window.screen.height === 568) {
    this.setFlag("iPhone5")
  }
  if (l.is.Safari || l.is.Silk) {
    if (this.is.Android2 || this.is.Android3 || l.version.shortVersion ===
      501) {
      l.setFlag("AndroidStock")
    }
    if (this.is.Android4) {
      l.setFlag("AndroidStock");
      l.setFlag("AndroidStock4")
    }
  }
};
Ext.env.OS.prototype = {
  constructor: Ext.env.OS,
  names: {
    ios: "iOS",
    android: "Android",
    windowsPhone: "WindowsPhone",
    webos: "webOS",
    blackberry: "BlackBerry",
    rimTablet: "RIMTablet",
    mac: "MacOS",
    win: "Windows",
    tizen: "Tizen",
    linux: "Linux",
    bada: "Bada",
    chrome: "ChromeOS",
    other: "Other"
  },
  prefixes: {
    tizen: "(Tizen )",
    ios: "i(?:Pad|Phone|Pod)(?:.*)CPU(?: iPhone)? OS ",
    android: "(Android |HTC_|Silk/)",
    windowsPhone: "Windows Phone ",
    blackberry: "(?:BlackBerry|BB)(?:.*)Version/",
    rimTablet: "RIM Tablet OS ",
    webos: "(?:webOS|hpwOS)/",
    bada: "Bada/",
    chrome: "CrOS "
  },
  is: function(a) {
    return !!this[a]
  },
  name: null,
  version: null,
  setFlag: function(a, b) {
    if (b === undefined) {
      b = true
    }
    if (this.flags) {
      this.flags[a] = b
    }
    this.is[a] = b;
    this.is[a.toLowerCase()] = b;
    return this
  }
};
(function() {
  var a = Ext.global.navigator,
    g = a.userAgent,
    f = Ext.env.OS,
    e = (Ext.is || (Ext.is = {})),
    h, d, b;
  f.prototype.flags = e;
  Ext.os = h = new f(g, a.platform);
  d = h.name;
  Ext["is" + d] = true;
  Ext.isMac = e.Mac = e.MacOS;
  var i = window.location.search.match(/deviceType=(Tablet|Phone)/),
    c = window.deviceType;
  if (i && i[1]) {
    b = i[1]
  } else {
    if (c === "iPhone") {
      b = "Phone"
    } else {
      if (c === "iPad") {
        b = "Tablet"
      } else {
        if (!h.is.Android && !h.is.iOS && !h.is.WindowsPhone &&
          /Windows|Linux|MacOS/.test(d)) {
          b = "Desktop";
          Ext.browser.is.WebView = !!Ext.browser.is.Ripple
        } else {
          if (h.is.iPad || h.is.RIMTablet || h.is.Android3 || Ext.browser.is.Silk ||
            (h.is.Android && g.search(/mobile/i) === -1)) {
            b = "Tablet"
          } else {
            b = "Phone"
          }
        }
      }
    }
  }
  h.setFlag(b, true);
  h.deviceType = b;
  delete f.prototype.flags
}());
Ext.feature = {
  has: function(a) {
    return !!this.has[a]
  },
  testElements: {},
  getTestElement: function(a, b) {
    if (a === undefined) {
      a = "div"
    } else {
      if (typeof a !== "string") {
        return a
      }
    }
    if (b) {
      return document.createElement(a)
    }
    if (!this.testElements[a]) {
      this.testElements[a] = document.createElement(a)
    }
    return this.testElements[a]
  },
  isStyleSupported: function(c, b) {
    var d = this.getTestElement(b).style,
      a = Ext.String.capitalize(c);
    if (typeof d[c] !== "undefined" || typeof d[Ext.browser.getStylePrefix(
        c) + a] !== "undefined") {
      return true
    }
    return false
  },
  isStyleSupportedWithoutPrefix: function(b, a) {
    var c = this.getTestElement(a).style;
    if (typeof c[b] !== "undefined") {
      return true
    }
    return false
  },
  isEventSupported: function(c, a) {
    if (a === undefined) {
      a = window
    }
    var e = this.getTestElement(a),
      b = "on" + c.toLowerCase(),
      d = (b in e);
    if (!d) {
      if (e.setAttribute && e.removeAttribute) {
        e.setAttribute(b, "");
        d = typeof e[b] === "function";
        if (typeof e[b] !== "undefined") {
          e[b] = undefined
        }
        e.removeAttribute(b)
      }
    }
    return d
  },
  getStyle: function(c, b) {
    var a = c.ownerDocument.defaultView,
      d = (a ? a.getComputedStyle(c, null) : c.currentStyle);
    return (d || c.style)[b]
  },
  getSupportedPropertyName: function(b, a) {
    var c = Ext.browser.getVendorProperyName(a);
    if (c in b) {
      return c
    } else {
      if (a in b) {
        return a
      }
    }
    return null
  },
  detect: function(i) {
    var j = this,
      l = document,
      f = j.toRun || j.tests,
      e = f.length,
      b = l.createElement("div"),
      c = [],
      o = Ext.supports,
      m = j.has,
      a, h, g, d, k;
    b.innerHTML =
      '<div style="height:30px;width:50px;"><div style="height:20px;width:20px;"></div></div><div style="width: 200px; height: 200px; position: relative; padding: 5px;"><div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div></div><div style="position: absolute; left: 10%; top: 10%;"></div><div style="float:left; background-color:transparent;"></div>';
    if (i) {
      l.body.appendChild(b)
    }
    d = j.preDetected[Ext.browser.identity] || [];
    while (e--) {
      g = f[e];
      k = d[e];
      a = g.name;
      h = g.names;
      if (k === undefined) {
        if (!i && g.ready) {
          c.push(g);
          continue
        }
        k = g.fn.call(j, l, b)
      }
      if (a) {
        o[a] = m[a] = k
      } else {
        if (h) {
          while (h.length) {
            a = h.pop();
            o[a] = m[a] = k
          }
        }
      }
    }
    if (i) {
      l.body.removeChild(b)
    }
    j.toRun = c
  },
  report: function() {
    var b = [],
      a = this.tests.length,
      c;
    for (c = 0; c < a; ++c) {
      b.push(this.has[this.tests[c].name] ? 1 : 0)
    }
    Ext.log(Ext.browser.identity + ": [" + b.join(",") + "]")
  },
  preDetected: {},
  tests: [{
    name: "CloneNodeCopiesExpando",
    fn: function() {
      var a = document.createElement("div");
      a.expandoProp = {};
      return a.cloneNode().expandoProp === a.expandoProp
    }
  }, {
    name: "CSSPointerEvents",
    fn: function(a) {
      return "pointerEvents" in a.documentElement.style
    }
  }, {
    name: "CSS3BoxShadow",
    fn: function(a) {
      return "boxShadow" in a.documentElement.style ||
        "WebkitBoxShadow" in a.documentElement.style || "MozBoxShadow" in
        a.documentElement.style
    }
  }, {
    name: "CSS3NegationSelector",
    fn: function(b) {
      try {
        b.querySelectorAll("foo:not(bar)")
      } catch (a) {
        return false
      }
      return true
    }
  }, {
    name: "ClassList",
    fn: function(a) {
      return !!a.documentElement.classList
    }
  }, {
    name: "Canvas",
    fn: function() {
      var a = this.getTestElement("canvas");
      return !!(a && a.getContext && a.getContext("2d"))
    }
  }, {
    name: "Svg",
    fn: function(a) {
      return !!(a.createElementNS && !!a.createElementNS(
        "http://www.w3.org/2000/svg", "svg").createSVGRect)
    }
  }, {
    name: "Vml",
    fn: function() {
      var b = this.getTestElement(),
        a = false;
      b.innerHTML = "<!--[if vml]><br><![endif]-->";
      a = (b.childNodes.length === 1);
      b.innerHTML = "";
      return a
    }
  }, {
    name: "touchScroll",
    fn: function() {
      var a = Ext.supports,
        b = 0;
      if (navigator.msMaxTouchPoints || (Ext.isWebKit && a.TouchEvents &&
          Ext.os.is.Desktop)) {
        b = 1
      } else {
        if (a.Touch) {
          b = 2
        }
      }
      return b
    }
  }, {
    name: "Touch",
    fn: function() {
      var a = navigator.msMaxTouchPoints || navigator.maxTouchPoints;
      if (Ext.browser.is.Chrome && Ext.browser.version.isLessThanOrEqual(
          39)) {
        return (Ext.supports.TouchEvents && a !== 1) || a > 1
      } else {
        return Ext.supports.TouchEvents || a > 0
      }
    }
  }, {
    name: "TouchEvents",
    fn: function() {
      return this.isEventSupported("touchend")
    }
  }, {
    name: "PointerEvents",
    fn: function() {
      return navigator.pointerEnabled
    }
  }, {
    name: "MSPointerEvents",
    fn: function() {
      return navigator.msPointerEnabled
    }
  }, {
    name: "Orientation",
    fn: function() {
      return ("orientation" in window) && this.isEventSupported(
        "orientationchange")
    }
  }, {
    name: "OrientationChange",
    fn: function() {
      return this.isEventSupported("orientationchange")
    }
  }, {
    name: "DeviceMotion",
    fn: function() {
      return this.isEventSupported("devicemotion")
    }
  }, {
    names: ["Geolocation", "GeoLocation"],
    fn: function() {
      return "geolocation" in window.navigator
    }
  }, {
    name: "SqlDatabase",
    fn: function() {
      return "openDatabase" in window
    }
  }, {
    name: "WebSockets",
    fn: function() {
      return "WebSocket" in window
    }
  }, {
    name: "Range",
    fn: function() {
      return !!document.createRange
    }
  }, {
    name: "CreateContextualFragment",
    fn: function() {
      var a = !!document.createRange ? document.createRange() : false;
      return a && !!a.createContextualFragment
    }
  }, {
    name: "History",
    fn: function() {
      return ("history" in window && "pushState" in window.history)
    }
  }, {
    name: "Css3dTransforms",
    fn: function() {
      return this.has("CssTransforms") && this.isStyleSupported(
        "perspective")
    }
  }, {
    name: "CssTransforms",
    fn: function() {
      return this.isStyleSupported("transform")
    }
  }, {
    name: "CssTransformNoPrefix",
    fn: function() {
      return this.isStyleSupportedWithoutPrefix("transform")
    }
  }, {
    name: "CssAnimations",
    fn: function() {
      return this.isStyleSupported("animationName")
    }
  }, {
    names: ["CssTransitions", "Transitions"],
    fn: function() {
      return this.isStyleSupported("transitionProperty")
    }
  }, {
    names: ["Audio", "AudioTag"],
    fn: function() {
      return !!this.getTestElement("audio").canPlayType
    }
  }, {
    name: "Video",
    fn: function() {
      return !!this.getTestElement("video").canPlayType
    }
  }, {
    name: "LocalStorage",
    fn: function() {
      try {
        if ("localStorage" in window && window.localStorage !== null) {
          localStorage.setItem("sencha-localstorage-test",
            "test success");
          localStorage.removeItem("sencha-localstorage-test");
          return true
        }
      } catch (a) {}
      return false
    }
  }, {
    name: "XHR2",
    fn: function() {
      return window.ProgressEvent && window.FormData && window.XMLHttpRequest &&
        ("withCredentials" in new XMLHttpRequest())
    }
  }, {
    name: "XHRUploadProgress",
    fn: function() {
      if (window.XMLHttpRequest && !Ext.browser.is.AndroidStock) {
        var a = new XMLHttpRequest();
        return a && ("upload" in a) && ("onprogress" in a.upload)
      }
      return false
    }
  }, {
    name: "NumericInputPlaceHolder",
    fn: function() {
      return !(Ext.browser.is.AndroidStock4 && Ext.os.version.getMinor() <
        2)
    }
  }, {
    name: "ProperHBoxStretching",
    ready: true,
    fn: function() {
      var b = document.createElement("div"),
        c = b.appendChild(document.createElement("div")),
        d = c.appendChild(document.createElement("div")),
        a;
      b.setAttribute("style",
        "width: 100px; height: 100px; position: relative;");
      c.setAttribute("style",
        "position: absolute; display: -ms-flexbox; display: -webkit-flex; display: -moz-flexbox; display: flex; -ms-flex-direction: row; -webkit-flex-direction: row; -moz-flex-direction: row; flex-direction: row; min-width: 100%;"
      );
      d.setAttribute("style", "width: 200px; height: 50px;");
      document.body.appendChild(b);
      a = c.offsetWidth;
      document.body.removeChild(b);
      return (a > 100)
    }
  }, {
    name: "matchesSelector",
    fn: function() {
      var b = document.documentElement,
        e = "matches",
        d = "webkitMatchesSelector",
        a = "msMatchesSelector",
        c = "mozMatchesSelector";
      return b[e] ? e : b[d] ? d : b[a] ? a : b[c] ? c : null
    }
  }, {
    name: "RightMargin",
    ready: true,
    fn: function(b, c) {
      var a = b.defaultView;
      return !(a && a.getComputedStyle(c.firstChild.firstChild, null).marginRight !==
        "0px")
    }
  }, {
    name: "DisplayChangeInputSelectionBug",
    fn: function() {
      var a = Ext.webKitVersion;
      return 0 < a && a < 533
    }
  }, {
    name: "DisplayChangeTextAreaSelectionBug",
    fn: function() {
      var a = Ext.webKitVersion;
      return 0 < a && a < 534.24
    }
  }, {
    name: "TransparentColor",
    ready: true,
    fn: function(b, c, a) {
      a = b.defaultView;
      return !(a && a.getComputedStyle(c.lastChild, null).backgroundColor !==
        "transparent")
    }
  }, {
    name: "ComputedStyle",
    ready: true,
    fn: function(b, c, a) {
      a = b.defaultView;
      return a && a.getComputedStyle
    }
  }, {
    name: "Float",
    fn: function(a) {
      return "cssFloat" in a.documentElement.style
    }
  }, {
    name: "CSS3BorderRadius",
    ready: true,
    fn: function(d) {
      var b = ["borderRadius", "BorderRadius", "MozBorderRadius",
          "WebkitBorderRadius", "OBorderRadius", "KhtmlBorderRadius"
        ],
        c = false,
        a;
      for (a = 0; a < b.length; a++) {
        if (d.documentElement.style[b[a]] !== undefined) {
          c = true
        }
      }
      return c && !Ext.isIE9
    }
  }, {
    name: "CSS3LinearGradient",
    fn: function(f, a) {
      var h = "background-image:",
        g =
        "-webkit-gradient(linear, left top, right bottom, from(black), to(white))",
        e = "linear-gradient(left top, black, white)",
        d = "-moz-" + e,
        b = "-ms-" + e,
        c = "-o-" + e,
        i = [h + g, h + e, h + d, h + b, h + c];
      a.style.cssText = i.join(";");
      return (("" + a.style.backgroundImage).indexOf("gradient") !== -1) &&
        !Ext.isIE9
    }
  }, {
    name: "MouseEnterLeave",
    fn: function(a) {
      return ("onmouseenter" in a.documentElement && "onmouseleave" in
        a.documentElement)
    }
  }, {
    name: "MouseWheel",
    fn: function(a) {
      return ("onmousewheel" in a.documentElement)
    }
  }, {
    name: "Opacity",
    fn: function(a, b) {
      if (Ext.isIE8) {
        return false
      }
      b.firstChild.style.cssText = "opacity:0.73";
      return b.firstChild.style.opacity == "0.73"
    }
  }, {
    name: "Placeholder",
    fn: function(a) {
      return "placeholder" in a.createElement("input")
    }
  }, {
    name: "Direct2DBug",
    fn: function(a) {
      return Ext.isString(a.documentElement.style.msTransformOrigin) &&
        Ext.isIE9m
    }
  }, {
    name: "BoundingClientRect",
    fn: function(a) {
      return "getBoundingClientRect" in a.documentElement
    }
  }, {
    name: "RotatedBoundingClientRect",
    ready: true,
    fn: function(e) {
      var a = e.body,
        b = false,
        d = this.getTestElement(),
        c = d.style;
      if (d.getBoundingClientRect) {
        c.WebkitTransform = c.MozTransform = c.msTransform = c.OTransform =
          c.transform = "rotate(90deg)";
        c.width = "100px";
        c.height = "30px";
        a.appendChild(d);
        b = d.getBoundingClientRect().height !== 100;
        a.removeChild(d)
      }
      return b
    }
  }, {
    name: "ChildContentClearedWhenSettingInnerHTML",
    ready: true,
    fn: function() {
      var a = this.getTestElement(),
        b;
      a.innerHTML = "<div>a</div>";
      b = a.firstChild;
      a.innerHTML = "<div>b</div>";
      return b.innerHTML !== "a"
    }
  }, {
    name: "IncludePaddingInWidthCalculation",
    ready: true,
    fn: function(a, b) {
      return b.childNodes[1].firstChild.offsetWidth === 210
    }
  }, {
    name: "IncludePaddingInHeightCalculation",
    ready: true,
    fn: function(a, b) {
      return b.childNodes[1].firstChild.offsetHeight === 210
    }
  }, {
    name: "TextAreaMaxLength",
    fn: function(a) {
      return ("maxlength" in a.createElement("textarea"))
    }
  }, {
    name: "GetPositionPercentage",
    ready: true,
    fn: function(a, b) {
      return Ext.feature.getStyle(b.childNodes[2], "left") === "10%"
    }
  }, {
    name: "PercentageHeightOverflowBug",
    ready: true,
    fn: function(d) {
      var a = false,
        c, b;
      if (Ext.getScrollbarSize().height) {
        b = this.getTestElement();
        c = b.style;
        c.height = "50px";
        c.width = "50px";
        c.overflow = "auto";
        c.position = "absolute";
        b.innerHTML = ['<div style="display:table;height:100%;">',
          '<div style="width:51px;"></div>', "</div>"
        ].join("");
        d.body.appendChild(b);
        if (b.firstChild.offsetHeight === 50) {
          a = true
        }
        d.body.removeChild(b)
      }
      return a
    }
  }, {
    name: "xOriginBug",
    ready: true,
    fn: function(d, e) {
      e.innerHTML =
        '<div id="b1" style="height:100px;width:100px;direction:rtl;position:relative;overflow:scroll"><div id="b2" style="position:relative;width:100%;height:20px;"></div><div id="b3" style="position:absolute;width:20px;height:20px;top:0px;right:0px"></div></div>';
      var c = document.getElementById("b1").getBoundingClientRect(),
        b = document.getElementById("b2").getBoundingClientRect(),
        a = document.getElementById("b3").getBoundingClientRect();
      return (b.left !== c.left && a.right !== c.right)
    }
  }, {
    name: "ScrollWidthInlinePaddingBug",
    ready: true,
    fn: function(d) {
      var a = false,
        c, b;
      b = d.createElement("div");
      c = b.style;
      c.height = "50px";
      c.width = "50px";
      c.padding = "10px";
      c.overflow = "hidden";
      c.position = "absolute";
      b.innerHTML =
        '<span style="display:inline-block;zoom:1;height:60px;width:60px;"></span>';
      d.body.appendChild(b);
      if (b.scrollWidth === 70) {
        a = true
      }
      d.body.removeChild(b);
      return a
    }
  }, {
    name: "rtlVertScrollbarOnRight",
    ready: true,
    fn: function(c, d) {
      d.innerHTML =
        '<div style="height:100px;width:100px;direction:rtl;overflow:scroll"><div style="width:20px;height:200px;"></div></div>';
      var b = d.firstChild,
        a = b.firstChild;
      return (a.offsetLeft + a.offsetWidth !== b.offsetLeft + b.offsetWidth)
    }
  }, {
    name: "rtlVertScrollbarOverflowBug",
    ready: true,
    fn: function(b, c) {
      c.innerHTML =
        '<div style="height:100px;width:100px;direction:rtl;overflow:auto"><div style="width:95px;height:200px;"></div></div>';
      var a = c.firstChild;
      return a.clientHeight === a.offsetHeight
    }
  }, {
    identity: "defineProperty",
    fn: function() {
      if (Ext.isIE8m) {
        Ext.Object.defineProperty = Ext.emptyFn;
        return false
      }
      return true
    }
  }, {
    identify: "nativeXhr",
    fn: function() {
      if (typeof XMLHttpRequest !== "undefined") {
        return true
      }
      XMLHttpRequest = function() {
        try {
          return new ActiveXObject("MSXML2.XMLHTTP.3.0")
        } catch (a) {
          return null
        }
      };
      return false
    }
  }, {
    name: "SpecialKeyDownRepeat",
    fn: function() {
      return Ext.isWebKit ? parseInt(navigator.userAgent.match(
        /AppleWebKit\/(\d+)/)[1], 10) >= 525 : !((Ext.isGecko && !Ext
        .isWindows) || (Ext.isOpera && Ext.operaVersion < 12))
    }
  }, {
    name: "EmulatedMouseOver",
    fn: function() {
      return Ext.os.is.iOS
    }
  }, {
    name: "Hashchange",
    fn: function() {
      var a = document.documentMode;
      return "onhashchange" in window && (a === undefined || a > 7)
    }
  }, {
    name: "FixedTableWidthBug",
    ready: true,
    fn: function() {
      if (Ext.isIE8) {
        return false
      }
      var b = document.createElement("div"),
        a = document.createElement("div"),
        c;
      b.setAttribute("style", "display:table;table-layout:fixed;");
      a.setAttribute("style", "display:table-cell;min-width:50px;");
      b.appendChild(a);
      document.body.appendChild(b);
      b.offsetWidth;
      b.style.width = "25px";
      c = b.offsetWidth;
      document.body.removeChild(b);
      return c === 50
    }
  }, {
    name: "FocusinFocusoutEvents",
    fn: function() {
      return !Ext.isGecko
    }
  }, {
    name: "accessibility",
    ready: true,
    fn: function(g) {
      var a = g.body,
        h, d, e, b, c;

      function f(o) {
        var j = [],
          l = 0,
          n, k;
        if (o.indexOf("rgb(") !== -1) {
          j = o.replace("rgb(", "").replace(")", "").split(", ")
        } else {
          if (o.indexOf("#") !== -1) {
            n = o.length === 7 ? /^#(\S\S)(\S\S)(\S\S)$/ :
              /^#(\S)(\S)(\S)$/;
            k = o.match(n);
            if (k) {
              j = ["0x" + k[1], "0x" + k[2], "0x" + k[3]]
            }
          }
        }
        for (var m = 0; m < j.length; m++) {
          l += parseInt(j[m])
        }
        return l
      }
      h = g.createElement("div");
      d = g.createElement("img");
      e = h.style;
      Ext.apply(e, {
        width: "2px",
        position: "absolute",
        clip: "rect(1px,1px,1px,1px)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderTopTolor: "#f00",
        borderRightColor: "#ff0",
        backgroundColor: "#fff",
        backgroundImage: "url(" + Ext.BLANK_IMAGE_URL + ")"
      });
      d.alt = "";
      d.src = Ext.BLANK_IMAGE_URL;
      h.appendChild(d);
      a.appendChild(h);
      e = h.currentStyle || h.style;
      c = e.backgroundImage;
      b = {
        Images: d.offsetWidth === 1 && d.readyState !==
          "uninitialized",
        BackgroundImages: !(c !== null && (c === "none" || c ===
          "url(invalid-url:)")),
        BorderColors: e.borderTopColor !== e.borderRightColor,
        LightOnDark: f(e.color) - f(e.backgroundColor) > 0
      };
      Ext.supports.HighContrastMode = !b.BackgroundImages;
      a.removeChild(h);
      h = d = null;
      return b
    }
  }, 0]
};
Ext.feature.tests.pop();
Ext.supports = {};
Ext.feature.detect();
Ext.env.Ready = {
  blocks: (location.search || "").indexOf("ext-pauseReadyFire") > 0 ? 1 : 0,
  bound: 0,
  delay: 1,
  firing: false,
  generation: 0,
  listeners: [],
  nextId: 0,
  sortGeneration: 0,
  state: 0,
  timer: null,
  bind: function() {
    var a = Ext.env.Ready,
      b = document;
    if (!a.bound) {
      if (b.readyState === "complete") {
        a.onReadyEvent({
          type: b.readyState || "body"
        })
      } else {
        a.bound = 1;
        if (Ext.browser.is.PhoneGap && !Ext.os.is.Desktop) {
          a.bound = 2;
          b.addEventListener("deviceready", a.onReadyEvent, false)
        }
        b.addEventListener("DOMContentLoaded", a.onReadyEvent, false);
        window.addEventListener("load", a.onReadyEvent, false)
      }
    }
  },
  block: function() {
    ++this.blocks;
    Ext.isReady = false
  },
  fireReady: function() {
    var a = Ext.env.Ready;
    if (!a.state) {
      Ext._readyTime = Ext.now();
      Ext.isDomReady = true;
      a.state = 1;
      Ext.feature.detect(true);
      if (!a.delay) {
        a.handleReady()
      } else {
        if (navigator.standalone) {
          a.timer = Ext.defer(function() {
            a.timer = null;
            a.handleReadySoon()
          }, 1)
        } else {
          a.handleReadySoon()
        }
      }
    }
  },
  handleReady: function() {
    var a = this;
    if (a.state === 1) {
      a.state = 2;
      Ext._beforeReadyTime = Ext.now();
      a.invokeAll();
      Ext._afterReadytime = Ext.now()
    }
  },
  handleReadySoon: function(a) {
    var b = this;
    if (!b.timer) {
      b.timer = Ext.defer(function() {
        b.timer = null;
        b.handleReady()
      }, a || b.delay)
    }
  },
  invoke: function(b) {
    var a = b.delay;
    if (a) {
      Ext.defer(b.fn, a, b.scope)
    } else {
      if (Ext.elevateFunction) {
        Ext.elevateFunction(b.fn, b.scope)
      } else {
        b.fn.call(b.scope)
      }
    }
  },
  invokeAll: function() {
    if (Ext.elevateFunction) {
      Ext.elevateFunction(this.doInvokeAll, this)
    } else {
      this.doInvokeAll()
    }
  },
  doInvokeAll: function() {
    var b = this,
      a = b.listeners,
      c;
    if (!b.blocks) {
      Ext.isReady = true
    }
    b.firing = true;
    while (a.length) {
      if (b.sortGeneration !== b.generation) {
        b.sortGeneration = b.generation;
        a.sort(b.sortFn)
      }
      c = a.pop();
      if (b.blocks && !c.dom) {
        a.push(c);
        break
      }
      b.invoke(c)
    }
    b.firing = false
  },
  makeListener: function(d, c, b) {
    var a = {
      fn: d,
      id: ++this.nextId,
      scope: c,
      dom: false,
      priority: 0
    };
    if (b) {
      Ext.apply(a, b)
    }
    a.phase = a.dom ? 0 : 1;
    return a
  },
  on: function(c, b, a) {
    var d = Ext.env.Ready,
      e = d.makeListener(c, b, a);
    if (d.state === 2 && !d.firing && (e.dom || !d.blocks)) {
      d.invoke(e)
    } else {
      d.listeners.push(e);
      ++d.generation;
      if (!d.bound) {
        d.bind()
      }
    }
  },
  onReadyEvent: function(b) {
    var a = Ext.env.Ready;
    if (Ext.elevateFunction) {
      Ext.elevateFunction(a.doReadyEvent, a, arguments)
    } else {
      a.doReadyEvent(b)
    }
  },
  doReadyEvent: function(b) {
    var a = this;
    if (a.bound > 0) {
      a.unbind();
      a.bound = -1
    }
    if (!a.state) {
      a.fireReady()
    }
  },
  sortFn: function(d, c) {
    return -((d.phase - c.phase) || (c.priority - d.priority) || (d.id - c.id))
  },
  unblock: function() {
    var a = this;
    if (a.blocks) {
      if (!--a.blocks) {
        if (a.state === 2 && !a.firing) {
          a.invokeAll()
        }
      }
    }
  },
  unbind: function() {
    var a = this,
      b = document;
    if (a.bound > 1) {
      b.removeEventListener("deviceready", a.onReadyEvent, false)
    }
    b.removeEventListener("DOMContentLoaded", a.onReadyEvent, false);
    window.removeEventListener("load", a.onReadyEvent, false)
  }
};
(function() {
  var a = Ext.env.Ready;
  if (Ext.isIE9m) {
    Ext.apply(a, {
      scrollTimer: null,
      readyStatesRe: /complete/i,
      pollScroll: function() {
        var b = true;
        try {
          document.documentElement.doScroll("left")
        } catch (c) {
          b = false
        }
        if (b && document.body) {
          a.onReadyEvent({
            type: "doScroll"
          })
        } else {
          a.scrollTimer = Ext.defer(a.pollScroll, 20)
        }
        return b
      },
      bind: function() {
        if (a.bound) {
          return
        }
        var d = document,
          b;
        try {
          b = window.frameElement === undefined
        } catch (c) {}
        if (!b || !d.documentElement.doScroll) {
          a.pollScroll = Ext.emptyFn
        } else {
          if (a.pollScroll()) {
            return
          }
        }
        if (d.readyState === "complete") {
          a.onReadyEvent({
            type: "already " + (d.readyState || "body")
          })
        } else {
          d.attachEvent("onreadystatechange", a.onReadyStateChange);
          window.attachEvent("onload", a.onReadyEvent);
          a.bound = 1
        }
      },
      unbind: function() {
        document.detachEvent("onreadystatechange", a.onReadyStateChange);
        window.detachEvent("onload", a.onReadyEvent);
        if (Ext.isNumber(a.scrollTimer)) {
          clearTimeout(a.scrollTimer);
          a.scrollTimer = null
        }
      },
      onReadyStateChange: function() {
        var b = document.readyState;
        if (a.readyStatesRe.test(b)) {
          a.onReadyEvent({
            type: b
          })
        }
      }
    })
  }
  Ext.onDocumentReady = function(e, d, b) {
    var c = {
      dom: true
    };
    if (b) {
      Ext.apply(c, b)
    }
    a.on(e, d, c)
  };
  Ext.onReady = function(d, c, b) {
    a.on(d, c, b)
  };
  Ext.onInternalReady = function(d, c, b) {
    a.on(d, c, Ext.apply({
      priority: 1000
    }, b))
  };
  a.bind()
}());
Ext.Loader = (new function() {
  var c = this,
    a = Ext.ClassManager,
    g = Ext.Boot,
    d = Ext.Class,
    i = Ext.env.Ready,
    h = Ext.Function.alias,
    f = ["extend", "mixins", "requires"],
    m = {},
    j = [],
    b = [],
    e = [],
    n = {},
    l = {},
    k = {
      enabled: true,
      scriptChainDelay: false,
      disableCaching: true,
      disableCachingParam: "_dc",
      paths: a.paths,
      preserveScripts: true,
      scriptCharset: undefined
    },
    o = {
      disableCaching: true,
      disableCachingParam: true,
      preserveScripts: true,
      scriptChainDelay: "loadDelay"
    };
  Ext.apply(c, {
    isInHistory: m,
    isLoading: false,
    history: j,
    config: k,
    readyListeners: b,
    optionalRequires: e,
    requiresMap: n,
    hasFileLoadError: false,
    scriptsLoading: 0,
    syncModeEnabled: false,
    missingQueue: l,
    init: function() {
      var u = document.getElementsByTagName("script"),
        p = u[u.length - 1].src,
        z = p.substring(0, p.lastIndexOf("/") + 1),
        x = Ext._classPathMetadata,
        y = Ext.Microloader,
        r = Ext.manifest,
        s, v, w, t, q;
      if (!a.getPath("Ext")) {
        a.setPath("Ext", z + "src")
      }
      if (x) {
        Ext._classPathMetadata = null;
        c.addClassPathMappings(x)
      }
      if (r) {
        s = r.loadOrder;
        v = Ext.Boot.baseUrl;
        if (s && r.bootRelative) {
          for (w = s.length, t = 0; t < w; t++) {
            q = s[t];
            q.path = v + q.path
          }
        }
      }
      if (y) {
        i.block();
        y.onMicroloaderReady(function() {
          i.unblock()
        })
      }
    },
    setConfig: Ext.Function.flexSetter(function(p, q) {
      if (p === "paths") {
        c.setPath(q)
      } else {
        k[p] = q;
        var r = o[p];
        if (r) {
          g.setConfig((r === true) ? p : r, q)
        }
      }
      return c
    }),
    getConfig: function(p) {
      return p ? k[p] : k
    },
    setPath: function() {
      a.setPath.apply(a, arguments);
      return c
    },
    addClassPathMappings: function(p) {
      a.setPath(p);
      return c
    },
    addBaseUrlClassPathMappings: function(p) {
      for (var q in p) {
        p[q] = g.baseUrl + p[q]
      }
      Ext.Loader.addClassPathMappings(p)
    },
    getPath: function(p) {
      return a.getPath(p)
    },
    require: function(r, q, p, t) {
      if (t) {
        return c.exclude(t).require(r, q, p)
      }
      var s = a.getNamesByExpression(r);
      return c.load(s, q, p)
    },
    syncRequire: function() {
      var q = c.syncModeEnabled;
      c.syncModeEnabled = true;
      var p = c.require.apply(c, arguments);
      c.syncModeEnabled = q;
      return p
    },
    exclude: function(q) {
      var p = a.select({
        require: function(t, s, r) {
          return c.load(t, s, r)
        },
        syncRequire: function(v, t, s) {
          var u = c.syncModeEnabled;
          c.syncModeEnabled = true;
          var r = c.load(v, t, s);
          c.syncModeEnabled = u;
          return r
        }
      });
      p.exclude(q);
      return p
    },
    load: function(p, x, y) {
      if (x) {
        if (x.length) {
          x = c.makeLoadCallback(p, x)
        }
        x = x.bind(y || Ext.global)
      }
      var s = [],
        r = p.length,
        v, u, t, w = [],
        q = a.classState;
      for (u = 0; u < r; ++u) {
        v = a.resolveName(p[u]);
        if (!a.isCreated(v)) {
          s.push(v);
          l[v] = c.getPath(v);
          if (!q[v]) {
            w.push(l[v])
          }
        }
      }
      t = s.length;
      if (t) {
        c.missingCount += t;
        a.onCreated(function() {
          if (x) {
            Ext.callback(x, y, arguments)
          }
          c.checkReady()
        }, c, s);
        if (!k.enabled) {
          Ext.raise(
            "Ext.Loader is not enabled, so dependencies cannot be resolved dynamically. Missing required class" +
            ((s.length > 1) ? "es" : "") + ": " + s.join(", "))
        }
        if (w.length) {
          c.loadScripts({
            url: w,
            _classNames: s
          })
        } else {
          c.checkReady()
        }
      } else {
        if (x) {
          x.call(y)
        }
        c.checkReady()
      }
      if (c.syncModeEnabled) {
        if (r === 1) {
          return a.get(p[0])
        }
      }
      return c
    },
    makeLoadCallback: function(p, q) {
      return function() {
        var s = [],
          r = p.length;
        while (r-- > 0) {
          s[r] = a.get(p[r])
        }
        return q.apply(this, s)
      }
    },
    onLoadFailure: function() {
      var p = this,
        q = p.onError;
      c.hasFileLoadError = true;
      --c.scriptsLoading;
      if (q) {
        q.call(p.userScope, p)
      }
      c.checkReady()
    },
    onLoadSuccess: function() {
      var p = this,
        q = p.onLoad;
      --c.scriptsLoading;
      if (q) {
        q.call(p.userScope, p)
      }
      c.checkReady()
    },
    onReady: function(r, q, t, p) {
      if (t) {
        i.on(r, q, p)
      } else {
        var s = i.makeListener(r, q, p);
        if (c.isLoading) {
          b.push(s)
        } else {
          i.invoke(s)
        }
      }
    },
    addUsedClasses: function(r) {
      var p, q, s;
      if (r) {
        r = (typeof r === "string") ? [r] : r;
        for (q = 0, s = r.length; q < s; q++) {
          p = r[q];
          if (typeof p === "string" && !Ext.Array.contains(e, p)) {
            e.push(p)
          }
        }
      }
      return c
    },
    triggerReady: function() {
      var p, q = e;
      if (c.isLoading && q.length) {
        e = [];
        c.require(q)
      } else {
        c.isLoading = false;
        b.sort(i.sortFn);
        while (b.length && !c.isLoading) {
          p = b.pop();
          i.invoke(p)
        }
        i.unblock()
      }
    },
    historyPush: function(p) {
      if (p && !m[p] && !a.overrideMap[p]) {
        m[p] = true;
        j.push(p)
      }
      return c
    },
    loadScripts: function(t) {
      var s = Ext.manifest,
        p = s && s.loadOrder,
        q = s && s.loadOrderMap,
        r;
      ++c.scriptsLoading;
      if (p && !q) {
        s.loadOrderMap = q = g.createLoadOrderMap(p)
      }
      c.checkReady();
      r = Ext.apply({
        loadOrder: p,
        loadOrderMap: q,
        charset: k.scriptCharset,
        success: c.onLoadSuccess,
        failure: c.onLoadFailure,
        sync: c.syncModeEnabled,
        _classNames: []
      }, t);
      r.userScope = r.scope;
      r.scope = r;
      g.load(r)
    },
    loadScriptsSync: function(q) {
      var p = c.syncModeEnabled;
      c.syncModeEnabled = true;
      c.loadScripts({
        url: q
      });
      c.syncModeEnabled = p
    },
    loadScriptsSyncBasePrefix: function(q) {
      var p = c.syncModeEnabled;
      c.syncModeEnabled = true;
      c.loadScripts({
        url: q,
        prependBaseUrl: true
      });
      c.syncModeEnabled = p
    },
    loadScript: function(x) {
      var q = typeof x === "string",
        t = x instanceof Array,
        w = !t && !q,
        p = w ? x.url : x,
        s = w && x.onError,
        u = w && x.onLoad,
        v = w && x.scope,
        r = {
          url: p,
          scope: v,
          onLoad: u,
          onError: s,
          _classNames: []
        };
      c.loadScripts(r)
    },
    flushMissingQueue: function() {
      var p, s, r = 0,
        q = 0;
      for (p in l) {
        r++;
        s = l[p];
        if (a.isCreated(p)) {
          delete l[p]
        } else {
          if (a.existCache[p] === 2) {
            delete l[p]
          } else {
            ++q
          }
        }
      }
      this.missingCount = q
    },
    checkReady: function() {
      var q = c.isLoading,
        p;
      c.flushMissingQueue();
      p = c.missingCount + c.scriptsLoading;
      if (p && !q) {
        i.block();
        c.isLoading = !!p
      } else {
        if (!p && q) {
          c.triggerReady()
        }
      }
    }
  });
  Ext.require = h(c, "require");
  Ext.syncRequire = h(c, "syncRequire");
  Ext.exclude = h(c, "exclude");
  d.registerPreprocessor("loader", function(E, t, D, C) {
    var z = this,
      x = [],
      p, y = a.getName(E),
      s, r, w, v, B, u, q, A;
    for (s = 0, w = f.length; s < w; s++) {
      u = f[s];
      if (t.hasOwnProperty(u)) {
        q = t[u];
        if (typeof q === "string") {
          x.push(q)
        } else {
          if (q instanceof Array) {
            for (r = 0, v = q.length; r < v; r++) {
              B = q[r];
              if (typeof B === "string") {
                x.push(B)
              }
            }
          } else {
            if (typeof q !== "function") {
              for (r in q) {
                if (q.hasOwnProperty(r)) {
                  B = q[r];
                  if (typeof B === "string") {
                    x.push(B)
                  }
                }
              }
            }
          }
        }
      }
    }
    if (x.length === 0) {
      return
    }
    if (y) {
      n[y] = x
    }(y ? c.exclude(y) : c).require(x, function() {
      for (s = 0, w = f.length; s < w; s++) {
        u = f[s];
        if (t.hasOwnProperty(u)) {
          q = t[u];
          if (typeof q === "string") {
            t[u] = a.get(q)
          } else {
            if (q instanceof Array) {
              for (r = 0, v = q.length; r < v; r++) {
                B = q[r];
                if (typeof B === "string") {
                  t[u][r] = a.get(B)
                }
              }
            } else {
              if (typeof q !== "function") {
                for (var F in q) {
                  if (q.hasOwnProperty(F)) {
                    B = q[F];
                    if (typeof B === "string") {
                      t[u][F] = a.get(B)
                    }
                  }
                }
              }
            }
          }
        }
      }
      C.call(z, E, t, D)
    });
    return false
  }, true, "after", "className");
  a.registerPostprocessor("uses", function(q, A, v) {
    var p = Ext.manifest,
      r = p && p.loadOrder,
      s = p && p.classes,
      t, x, z, w, u, y;
    if (r) {
      x = s[q];
      if (x && !isNaN(u = x.idx)) {
        z = r[u];
        t = z.uses;
        y = {};
        for (w = t.length, u = 0; u < w; u++) {
          y[t[u]] = true
        }
        t = Ext.Boot.getPathsFromIndexes(y, r, true);
        if (t.length > 0) {
          c.loadScripts({
            url: t,
            sequential: true
          })
        }
      }
    }
    if (v.uses) {
      t = v.uses;
      c.addUsedClasses(t)
    }
  });
  a.onCreated(c.historyPush);
  c.init()
}());
Ext._endTime = new Date().getTime();
if (Ext._beforereadyhandler) {
  Ext._beforereadyhandler()
}(Ext.cmd.derive("Ext.Mixin", Ext.Base, function(a) {
  return {
    statics: {
      addHook: function(h, e, c, d) {
        var g = Ext.isFunction(h),
          f = function() {
            var j = arguments,
              k = g ? h : d[h],
              i = this.callParent(j);
            k.apply(this, j);
            return i
          },
          b = e.hasOwnProperty(c) && e[c];
        if (g) {
          h.$previous = Ext.emptyFn
        }
        f.$name = c;
        f.$owner = e.self;
        if (b) {
          f.$previous = b.$previous;
          b.$previous = f
        } else {
          e[c] = f
        }
      }
    },
    onClassExtended: function(k, d) {
      var f = d.mixinConfig,
        i = d.xhooks,
        h = k.superclass,
        e = d.onClassMixedIn,
        b, g, j, c;
      if (i) {
        delete d.xhooks;
        (f || (d.mixinConfig = f = {})).on = i
      }
      if (f) {
        b = h.mixinConfig;
        if (b) {
          d.mixinConfig = f = Ext.merge({}, b, f)
        }
        d.mixinId = f.id;
        g = f.before;
        j = f.after;
        i = f.on;
        c = f.extended
      }
      if (g || j || i || c) {
        d.onClassMixedIn = function(o) {
          var l = this.prototype,
            n = o.prototype,
            m;
          if (g) {
            Ext.Object.each(g, function(p, q) {
              o.addMember(p, function() {
                if (l[q].apply(this, arguments) !== false) {
                  return this.callParent(arguments)
                }
              })
            })
          }
          if (j) {
            Ext.Object.each(j, function(p, q) {
              o.addMember(p, function() {
                var r = this.callParent(arguments);
                l[q].apply(this, arguments);
                return r
              })
            })
          }
          if (i) {
            for (m in i) {
              a.addHook(i[m], n, m, l)
            }
          }
          if (c) {
            o.onExtended(function() {
              var p = Ext.Array.slice(arguments, 0);
              p.unshift(o);
              return c.apply(this, p)
            }, this)
          }
          if (e) {
            e.apply(this, arguments)
          }
        }
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext, "Mixin"], 0));
Ext.util = Ext.util || {};
Ext.util.DelayedTask = function(e, d, b, h, g) {
  var f = this,
    a, c = function() {
      var i = Ext.GlobalEvents;
      clearInterval(f.id);
      f.id = null;
      e.apply(d, b || []);
      if (g !== false && i.hasListeners.idle) {
        i.fireEvent("idle")
      }
    };
  h = typeof h === "boolean" ? h : true;
  f.id = null;
  f.delay = function(j, l, k, i) {
    if (h) {
      f.cancel()
    }
    if (typeof j === "number") {
      a = j
    }
    e = l || e;
    d = k || d;
    b = i || b;
    if (!f.id) {
      f.id = Ext.interval(c, a)
    }
  };
  f.cancel = function() {
    if (f.id) {
      clearInterval(f.id);
      f.id = null
    }
  }
};
(Ext.cmd.derive("Ext.util.Event", Ext.Base, function() {
  var d = Array.prototype.slice,
    a = Ext.Array.insert,
    c = Ext.Array.toArray,
    b = {};
  return {
    isEvent: true,
    suspended: 0,
    noOptions: {},
    constructor: function(f, e) {
      this.name = e;
      this.observable = f;
      this.listeners = []
    },
    addListener: function(m, e, f, t, p) {
      var w = this,
        k = false,
        o = w.observable,
        j = w.name,
        q, h, v, s, x, r, g, l, u, n;
      if (w.findListener(m, e) === -1) {
        h = w.createListener(m, e, f, t, p);
        if (w.firing) {
          w.listeners = w.listeners.slice(0)
        }
        q = w.listeners;
        l = g = q.length;
        v = f && f.priority;
        x = w._highestNegativePriorityIndex;
        r = x !== undefined;
        if (v) {
          s = (v < 0);
          if (!s || r) {
            for (u = (s ? x : 0); u < g; u++) {
              n = q[u].o ? q[u].o.priority || 0 : 0;
              if (n < v) {
                l = u;
                break
              }
            }
          } else {
            w._highestNegativePriorityIndex = l
          }
        } else {
          if (r) {
            l = x
          }
        }
        if (!s && l <= x) {
          w._highestNegativePriorityIndex++
        }
        if (l === g) {
          q[g] = h
        } else {
          a(q, l, [h])
        }
        if (o.isElement) {
          o._getPublisher(j).subscribe(o, j, f.delegated !== false, f.capture)
        }
        k = true
      }
      return k
    },
    createListener: function(m, p, e, f, h) {
      var k = this,
        l = Ext._namedScopes[p],
        g = {
          fn: m,
          scope: p,
          ev: k,
          caller: f,
          manager: h,
          namedScope: l,
          defaultScope: l ? (p || k.observable) : undefined,
          lateBound: typeof m === "string"
        },
        n = m,
        j = false,
        i;
      if (e) {
        g.o = e;
        if (e.single) {
          n = k.createSingle(n, g, e, p);
          j = true
        }
        if (e.target) {
          n = k.createTargeted(n, g, e, p, j);
          j = true
        }
        if (e.delay) {
          n = k.createDelayed(n, g, e, p, j);
          j = true
        }
        if (e.buffer) {
          n = k.createBuffered(n, g, e, p, j);
          j = true
        }
        if (k.observable.isElement) {
          i = e.type;
          if (i) {
            g.type = i
          }
        }
      }
      g.fireFn = n;
      g.wrapped = j;
      return g
    },
    findListener: function(h, g) {
      var f = this.listeners,
        e = f.length,
        j;
      while (e--) {
        j = f[e];
        if (j) {
          if (j.fn === h && j.scope == g) {
            return e
          }
        }
      }
      return -1
    },
    removeListener: function(q, s, o) {
      var p = this,
        n = false,
        e = p.observable,
        m = p.name,
        g, u, t, j, h, r, f, l;
      o = o || p.findListener(q, s);
      if (o != -1) {
        g = p.listeners[o];
        t = g.o;
        u = p._highestNegativePriorityIndex;
        if (p.firing) {
          p.listeners = p.listeners.slice(0)
        }
        if (g.task) {
          g.task.cancel();
          delete g.task
        }
        j = g.tasks && g.tasks.length;
        if (j) {
          while (j--) {
            g.tasks[j].cancel()
          }
          delete g.tasks
        }
        p.listeners.splice(o, 1);
        h = g.manager;
        if (h) {
          r = h.managedListeners;
          if (r) {
            for (l = r.length; l--;) {
              f = r[l];
              if (f.item === p.observable && f.ename === m && f.fn === q &&
                f.scope === s) {
                r.splice(l, 1)
              }
            }
          }
        }
        if (u) {
          if (o < u) {
            p._highestNegativePriorityIndex--
          } else {
            if (o === u && o === p.listeners.length) {
              delete p._highestNegativePriorityIndex
            }
          }
        }
        if (e.isElement) {
          e._getPublisher(m).unsubscribe(e, m, t.delegated !== false, t.capture)
        }
        n = true
      }
      return n
    },
    clearListeners: function() {
      var f = this.listeners,
        e = f.length,
        g;
      while (e--) {
        g = f[e];
        this.removeListener(g.fn, g.scope)
      }
    },
    suspend: function() {
      ++this.suspended
    },
    resume: function() {
      if (this.suspended) {
        --this.suspended
      }
    },
    isSuspended: function() {
      return this.suspended > 0
    },
    fireDelegated: function(f, e) {
      this.firingObservable = f;
      return this.fire.apply(this, e)
    },
    fire: function() {
      var A = this,
        r = A.listeners,
        l = r.length,
        o = A.observable,
        s = o.isElement,
        z = o.isComponent,
        x = A.firingObservable,
        g, w, p, u, f, j, v, t, B, h, n, k, y, q, m;
      if (!A.suspended && l > 0) {
        A.firing = true;
        f = arguments.length ? d.call(arguments, 0) : [];
        v = f.length;
        if (s) {
          y = f[0]
        }
        for (u = 0; u < l; u++) {
          j = r[u];
          g = j.o;
          if (s) {
            if (B) {
              y.setCurrentTarget(B)
            }
            h = j.type;
            if (h) {
              n = y;
              y = f[0] = n.chain({
                type: h
              })
            }
            Ext.EventObject = y
          }
          k = f;
          if (g) {
            w = g.delegate;
            if (w) {
              if (s) {
                t = y.getTarget("#" + y.currentTarget.id + " " + w);
                if (t) {
                  f[1] = t;
                  B = y.currentTarget;
                  y.setCurrentTarget(t)
                } else {
                  continue
                }
              } else {
                if (z && !x.is("#" + o.id + " " + g.delegate)) {
                  continue
                }
              }
            }
            if (s) {
              if (g.preventDefault) {
                y.preventDefault()
              }
              if (g.stopPropagation) {
                y.stopPropagation()
              }
              if (g.stopEvent) {
                y.stopEvent()
              }
            }
            f[v] = g;
            if (g.args) {
              k = g.args.concat(f)
            }
          }
          p = A.getFireInfo(j);
          q = p.fn;
          m = p.scope;
          p.fn = p.scope = null;
          if (q.apply(m, k) === false) {
            Ext.EventObject = null;
            return (A.firing = false)
          }
          if (n) {
            y = f[0] = n;
            n = null
          }
          Ext.EventObject = null
        }
      }
      A.firing = false;
      return true
    },
    getFireInfo: function(j, i) {
      var k = this.observable,
        e = j.fireFn,
        h = j.scope,
        f = j.namedScope,
        g;
      if (!i && j.wrapped) {
        b.fn = e;
        return b
      }
      g = i ? j.fn : e;
      if (j.lateBound) {
        if (!h || f) {
          h = (j.caller || k).resolveListenerScope(j.defaultScope)
        }
        g = h[g]
      } else {
        if (f && f.isController) {
          h = (j.caller || k).resolveListenerScope(j.defaultScope)
        } else {
          if (!h || f) {
            h = k
          }
        }
      }
      b.fn = g;
      b.scope = h;
      return b
    },
    createTargeted: function(g, h, i, f, e) {
      return function() {
        if (i.target === arguments[0]) {
          var j;
          if (!e) {
            j = h.ev.getFireInfo(h, true);
            g = j.fn;
            f = j.scope;
            j.fn = j.scope = null
          }
          return g.apply(f, arguments)
        }
      }
    },
    createBuffered: function(g, h, i, f, e) {
      h.task = new Ext.util.DelayedTask();
      return function() {
        var j;
        if (!e) {
          j = h.ev.getFireInfo(h, true);
          g = j.fn;
          f = j.scope;
          j.fn = j.scope = null
        }
        h.task.delay(i.buffer, g, f, c(arguments))
      }
    },
    createDelayed: function(g, h, i, f, e) {
      return function() {
        var j = new Ext.util.DelayedTask(),
          k;
        if (!e) {
          k = h.ev.getFireInfo(h, true);
          g = k.fn;
          f = k.scope;
          k.fn = k.scope = null
        }
        if (!h.tasks) {
          h.tasks = []
        }
        h.tasks.push(j);
        j.delay(i.delay || 10, g, f, c(arguments))
      }
    },
    createSingle: function(g, h, i, f, e) {
      return function() {
        var j = h.ev,
          k;
        if (j.removeListener(h.fn, f) && j.observable) {
          j.observable.hasListeners[j.name]--
        }
        if (!e) {
          k = j.getFireInfo(h, true);
          g = k.fn;
          f = k.scope;
          k.fn = k.scope = null
        }
        return g.apply(f, arguments)
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "Event"], 0));
(Ext.cmd.derive("Ext.mixin.Identifiable", Ext.Base, {
  statics: {
    uniqueIds: {}
  },
  isIdentifiable: true,
  mixinId: "identifiable",
  idCleanRegex: /\.|[^\w\-]/g,
  defaultIdPrefix: "ext-",
  defaultIdSeparator: "-",
  getOptimizedId: function() {
    return this.id
  },
  getUniqueId: function() {
    var f = this.id,
      b, d, e, a, c;
    if (!(f || f === 0)) {
      b = this.self.prototype;
      d = this.defaultIdSeparator;
      a = Ext.mixin.Identifiable.uniqueIds;
      if (!b.hasOwnProperty("identifiablePrefix")) {
        e = this.xtype;
        if (e) {
          c = this.defaultIdPrefix + e.replace(this.idCleanRegex, d) + d
        } else {
          if (!(c = b.$className)) {
            c = this.defaultIdPrefix + "anonymous" + d
          } else {
            c = c.replace(this.idCleanRegex, d).toLowerCase() + d
          }
        }
        b.identifiablePrefix = c
      }
      c = this.identifiablePrefix;
      if (!a.hasOwnProperty(c)) {
        a[c] = 0
      }
      f = this.id = this.id = c + (++a[c])
    }
    this.getUniqueId = this.getOptimizedId;
    return f
  },
  setId: function(a) {
    this.id = this.id = a
  },
  getId: function() {
    var a = this.id;
    if (!a) {
      a = this.getUniqueId()
    }
    this.getId = this.getOptimizedId;
    return a
  }
}, 0, 0, 0, 0, 0, 0, [Ext.mixin, "Identifiable"], 0));
(Ext.cmd.derive("Ext.mixin.Observable", Ext.Mixin, function(a) {
  var d = Ext.emptyFn,
    c = [],
    e = Array.prototype,
    f = e.slice,
    b = function(g) {
      if (g instanceof b) {
        return g
      }
      this.observable = g;
      if (arguments[1].isObservable) {
        this.managedListeners = true
      }
      this.args = f.call(arguments, 1)
    };
  b.prototype.destroy = function() {
    this.destroy = Ext.emptyFn;
    var g = this.observable;
    g[this.managedListeners ? "mun" : "un"].apply(g, this.args)
  };
  return {
    mixinConfig: {
      id: "observable",
      after: {
        destroy: "clearListeners"
      }
    },
    statics: {
      releaseCapture: function(g) {
        g.fireEventArgs = this.prototype.fireEventArgs
      },
      capture: function(j, h, g) {
        var i = function(k, l) {
          return h.apply(g, [k].concat(l))
        };
        this.captureArgs(j, i, g)
      },
      captureArgs: function(i, h, g) {
        i.fireEventArgs = Ext.Function.createInterceptor(i.fireEventArgs,
          h, g)
      },
      observe: function(g, h) {
        if (g) {
          if (!g.isObservable) {
            Ext.applyIf(g, new this());
            this.captureArgs(g.prototype, g.fireEventArgs, g)
          }
          if (Ext.isObject(h)) {
            g.on(h)
          }
        }
        return g
      },
      prepareClass: function(k, q, l) {
        var p = k.listeners = [],
          n = l || k.prototype,
          g = n.listeners,
          j = q ? q.listeners : k.superclass.self.listeners,
          h, r, o;
        if (j) {
          p.push(j)
        }
        if (g) {
          r = g.scope;
          if (!r) {
            g.scope = "self"
          } else {
            o = Ext._namedScopes[r];
            if (o && o.isController) {
              g.scope = "self.controller"
            }
          }
          p.push(g);
          n.listeners = null
        }
        if (!k.HasListeners) {
          var m = function() {},
            i = k.superclass.HasListeners || (q && q.HasListeners) || a.HasListeners;
          k.prototype.HasListeners = k.HasListeners = m;
          m.prototype = k.hasListeners = new i()
        }
      }
    },
    isObservable: true,
    eventsSuspended: 0,
    constructor: function(k) {
      var n = this,
        j = n.self,
        h, m, o, g, l;
      if (n.$observableInitialized) {
        return
      }
      n.$observableInitialized = true;
      n.hasListeners = new n.HasListeners();
      n.eventedBeforeEventNames = {};
      n.events = n.events || {};
      h = j.listeners;
      if (h && !n._addDeclaredListeners(h)) {
        j.listeners = null
      }
      m = (k && k.listeners) || n.listeners;
      if (m) {
        if (m instanceof Array) {
          for (l = 0, g = m.length; l < g; ++l) {
            n.addListener(m[l])
          }
        } else {
          n.addListener(m)
        }
      }
      o = (k && k.bubbleEvents) || n.bubbleEvents;
      if (o) {
        n.enableBubble(o)
      }
      if (n.$applyConfigs) {
        if (k) {
          Ext.apply(n, k)
        }
      } else {
        n.initConfig(k)
      }
      if (m) {
        n.listeners = null
      }
    },
    onClassExtended: function(g, h) {
      if (!g.HasListeners) {
        a.prepareClass(g, g.prototype.$observableMixedIn ? undefined : h)
      }
    },
    $eventOptions: {
      scope: 1,
      delay: 1,
      buffer: 1,
      onFrame: 1,
      single: 1,
      args: 1,
      destroyable: 1,
      priority: 1,
      order: 1
    },
    $orderToPriority: {
      before: 100,
      current: 0,
      after: -100
    },
    _addDeclaredListeners: function(g) {
      var h = this;
      if (g instanceof Array) {
        Ext.each(g, h._addDeclaredListeners, h)
      } else {
        h._addedDeclaredListeners = true;
        h.addListener(g)
      }
      return h._addedDeclaredListeners
    },
    addManagedListener: function(n, j, l, o, p, i) {
      var k = this,
        m = k.managedListeners = k.managedListeners || [],
        h, g;
      if (typeof j !== "string") {
        g = arguments.length > 4 ? p : j;
        p = j;
        for (j in p) {
          if (p.hasOwnProperty(j)) {
            h = p[j];
            if (!n.$eventOptions[j]) {
              k.addManagedListener(n, j, h.fn || h, h.scope || p.scope ||
                o, h.fn ? h : g, true)
            }
          }
        }
        if (p && p.destroyable) {
          return new b(k, n, p)
        }
      } else {
        if (l !== d) {
          n.doAddListener(j, l, o, p, null, k, k);
          if (!i && p && p.destroyable) {
            return new b(k, n, j, l, o)
          }
        }
      }
    },
    removeManagedListener: function(o, j, m, p) {
      var l = this,
        q, h, n, g, k;
      if (typeof j !== "string") {
        q = j;
        for (j in q) {
          if (q.hasOwnProperty(j)) {
            h = q[j];
            if (!o.$eventOptions[j]) {
              l.removeManagedListener(o, j, h.fn || h, h.scope || q.scope ||
                p)
            }
          }
        }
      } else {
        n = l.managedListeners ? l.managedListeners.slice() : [];
        j = Ext.canonicalEventName(j);
        for (k = 0, g = n.length; k < g; k++) {
          l.removeManagedListenerItem(false, n[k], o, j, m, p)
        }
      }
    },
    fireEvent: function(g) {
      return this.fireEventArgs(g, f.call(arguments, 1))
    },
    resolveListenerScope: function(h) {
      var g = Ext._namedScopes[h];
      if (g) {
        if (g.isSelf || g.isThis) {
          h = null
        }
      }
      return h || this
    },
    fireEventArgs: function(g, i) {
      g = Ext.canonicalEventName(g);
      var l = this,
        j = l.events,
        k = j && j[g],
        h = true;
      if (l.hasListeners[g]) {
        h = l.doFireEvent(g, i || c, k ? k.bubble : false)
      }
      return h
    },
    fireAction: function(h, j, l, k, i, g) {
      if (typeof l === "string" && !k) {
        l = this[l]
      }
      i = i ? Ext.Object.chain(i) : {};
      i.single = true;
      i.priority = ((g === "after") ? -99.5 : 99.5);
      this.doAddListener(h, l, k, i);
      this.fireEventArgs(h, j)
    },
    $eventedController: {
      _paused: 1,
      pause: function() {
        ++this._paused
      },
      resume: function() {
        var l = this,
          k = l.fn,
          j = l.scope,
          m = l.fnArgs,
          g = l.owner,
          i, h;
        if (!--l._paused) {
          if (k) {
            i = Ext.Array.slice(m || l.args);
            if (m === false) {
              i.shift()
            }
            l.fn = null;
            i.push(l);
            if (Ext.isFunction(k)) {
              h = k.apply(j, i)
            } else {
              if (j && Ext.isString(k) && Ext.isFunction(j[k])) {
                h = j[k].apply(j, i)
              }
            }
            if (h === false) {
              return false
            }
          }
          if (!l._paused) {
            return l.owner.fireEventArgs(l.eventName, l.args)
          }
        }
      }
    },
    fireEventedAction: function(h, j, m, p, l) {
      var k = this,
        o = k.eventedBeforeEventNames,
        i = o[h] || (o[h] = "before" + h),
        g = Ext.apply({
          owner: k,
          eventName: h,
          fn: m,
          scope: p,
          fnArgs: l,
          args: j
        }, k.$eventedController),
        n;
      j.push(g);
      n = k.fireEventArgs(i, j);
      j.pop();
      if (n === false) {
        return false
      }
      return g.resume()
    },
    doFireEvent: function(i, k, h) {
      var m = this,
        g, l, j = true;
      do {
        if (m.eventsSuspended) {
          if ((g = m.eventQueue)) {
            g.push([i, k])
          }
          return j
        } else {
          l = m.events && m.events[i];
          if (l && l !== true) {
            if ((j = l.fire.apply(l, k)) === false) {
              break
            }
          }
        }
      } while (h && (m = m.getBubbleParent()));
      return j
    },
    getBubbleParent: function() {
      var h = this,
        g = h.getBubbleTarget && h.getBubbleTarget();
      if (g && g.isObservable) {
        return g
      }
      return null
    },
    addListener: function(k, q, r, s, i, g) {
      var p = this,
        l = Ext._namedScopes,
        h, o, m, n, j;
      if (typeof k !== "string") {
        s = k;
        r = s.scope;
        o = r && l[r];
        m = o && o.isSelf;
        j = ((p.isComponent || p.isWidget) && s.element) ? p.$elementEventOptions :
          p.$eventOptions;
        for (k in s) {
          h = s[k];
          if (!j[k]) {
            n = h.scope;
            if (n && m) {
              o = l[n];
              if (o && o.isController) {
                n = "self.controller"
              }
            }
            p.doAddListener(k, h.fn || h, n || r, h.fn ? h : s, i, g)
          }
        }
        if (s && s.destroyable) {
          return new b(p, s)
        }
      } else {
        p.doAddListener(k, q, r, s, i, g);
        if (s && s.destroyable) {
          return new b(p, k, q, r, s)
        }
      }
      return p
    },
    removeListener: function(j, l, k, g) {
      var m = this,
        i, h;
      if (typeof j !== "string") {
        h = j;
        g = g || m.$eventOptions;
        for (j in h) {
          if (h.hasOwnProperty(j)) {
            i = h[j];
            if (!m.$eventOptions[j]) {
              m.doRemoveListener(j, i.fn || i, i.scope || h.scope)
            }
          }
        }
      } else {
        m.doRemoveListener(j, l, k)
      }
      return m
    },
    onBefore: function(g, j, i, h) {
      return this.addListener(g, j, i, h, "before")
    },
    onAfter: function(g, j, i, h) {
      return this.addListener(g, j, i, h, "after")
    },
    unBefore: function(g, j, i, h) {
      return this.removeListener(g, j, i, h, "before")
    },
    unAfter: function(g, j, i, h) {
      return this.removeListener(g, j, i, h, "after")
    },
    addBeforeListener: function() {
      return this.onBefore.apply(this, arguments)
    },
    addAfterListener: function() {
      return this.onAfter.apply(this, arguments)
    },
    removeBeforeListener: function() {
      return this.unBefore.apply(this, arguments)
    },
    removeAfterListener: function() {
      return this.unAfter.apply(this, arguments)
    },
    clearListeners: function() {
      var k = this,
        i = k.events,
        g = k.hasListeners,
        j, h;
      if (i) {
        for (h in i) {
          if (i.hasOwnProperty(h)) {
            j = i[h];
            if (j.isEvent) {
              delete g[h];
              j.clearListeners()
            }
          }
        }
        k.events = null
      }
      k.clearManagedListeners()
    },
    clearManagedListeners: function() {
      var k = this,
        h = k.managedListeners ? k.managedListeners.slice() : [],
        j = 0,
        g = h.length;
      for (; j < g; j++) {
        k.removeManagedListenerItem(true, h[j])
      }
      k.managedListeners = []
    },
    removeManagedListenerItem: function(h, g, l, i, k, j) {
      if (h || (g.item === l && g.ename === i && (!k || g.fn === k) && (!
          j || g.scope === j))) {
        g.item.doRemoveListener(g.ename, g.fn, g.scope, g.options);
        if (!h) {
          Ext.Array.remove(this.managedListeners, g)
        }
      }
    },
    hasListener: function(g) {
      g = Ext.canonicalEventName(g);
      return !!this.hasListeners[g]
    },
    isSuspended: function(i) {
      var h = this.eventsSuspended > 0,
        g = this.events;
      if (!h && i && g) {
        i = g[i];
        if (i && i.isEvent) {
          return i.isSuspended()
        }
      }
      return h
    },
    suspendEvents: function(g) {
      ++this.eventsSuspended;
      if (g && !this.eventQueue) {
        this.eventQueue = []
      }
    },
    suspendEvent: function() {
      var m = this,
        k = m.events,
        g = arguments.length,
        j, l, h;
      for (j = 0; j < g; j++) {
        h = arguments[j];
        h = Ext.canonicalEventName(h);
        l = k[h];
        if (!l || !l.isEvent) {
          l = m._initEvent(h)
        }
        l.suspend()
      }
    },
    resumeEvent: function() {
      var j = this.events || 0,
        g = j && arguments.length,
        h, k;
      for (h = 0; h < g; h++) {
        k = j[arguments[h]];
        if (k && k.resume) {
          k.resume()
        }
      }
    },
    resumeEvents: function(g) {
      var h = this,
        k = h.eventQueue,
        j, i;
      if (h.eventsSuspended && !--h.eventsSuspended) {
        delete h.eventQueue;
        if (!g && k) {
          j = k.length;
          for (i = 0; i < j; i++) {
            h.fireEventArgs.apply(h, k[i])
          }
        }
      }
    },
    relayEvents: function(o, p, j) {
      var n = this,
        k = p.length,
        h = 0,
        g, l, m = {};
      if (Ext.isObject(p)) {
        for (h in p) {
          l = p[h];
          m[h] = n.createRelayer(l)
        }
      } else {
        for (; h < k; h++) {
          g = p[h];
          m[g] = n.createRelayer(j ? j + g : g)
        }
      }
      n.mon(o, m, null, null, undefined);
      return new b(n, o, m)
    },
    createRelayer: function(g, h) {
      var i = this;
      return function() {
        return i.fireEventArgs.call(i, g, h ? f.apply(arguments, h) :
          arguments)
      }
    },
    enableBubble: function(o) {
      if (o) {
        var m = this,
          n = (typeof o == "string") ? arguments : o,
          j = m.events,
          l = j && n.length,
          h, k, g;
        for (g = 0; g < l; ++g) {
          h = n[g];
          h = Ext.canonicalEventName(h);
          k = j[h];
          if (!k || !k.isEvent) {
            k = m._initEvent(h)
          }
          m.hasListeners._incr_(h);
          k.bubble = true
        }
      }
    },
    destroy: function() {
      this.clearListeners();
      this.callParent()
    },
    privates: {
      doAddListener: function(j, m, p, q, i, h, k) {
        var l = this,
          g, o, n;
        i = i || (q && q.order);
        if (i) {
          n = (q && q.priority);
          if (!n) {
            q = q ? Ext.Object.chain(q) : {};
            q.priority = l.$orderToPriority[i]
          }
        }
        j = Ext.canonicalEventName(j);
        if (!k && (p && p.isObservable && (p !== l))) {
          k = p
        }
        if (k) {
          o = k.managedListeners = k.managedListeners || [];
          o.push({
            item: l,
            ename: j,
            fn: m,
            scope: p,
            options: q
          })
        }
        g = (l.events || (l.events = {}))[j];
        if (!g || !g.isEvent) {
          g = l._initEvent(j)
        }
        if (m !== d) {
          if (g.addListener(m, p, q, h, k)) {
            l.hasListeners._incr_(j)
          }
        }
      },
      doRemoveListener: function(h, j, i) {
        var l = this,
          g = l.events,
          k;
        h = Ext.canonicalEventName(h);
        k = g && g[h];
        if (k && k.isEvent) {
          if (k.removeListener(j, i)) {
            l.hasListeners._decr_(h)
          }
        }
      },
      _initEvent: function(g) {
        return (this.events[g] = new Ext.util.Event(this, g))
      }
    },
    deprecated: {
      "5.0": {
        methods: {
          addEvents: null
        }
      }
    }
  }
}, 1, 0, 0, 0, 0, [
  [Ext.mixin.Identifiable.prototype.mixinId || Ext.mixin.Identifiable.$className,
    Ext.mixin.Identifiable
  ]
], [Ext.mixin, "Observable"], function() {
  var b = this,
    e = b.prototype,
    c = function() {},
    f = function(g) {
      if (!g.HasListeners) {
        var h = g.prototype;
        h.$observableMixedIn = 1;
        b.prepareClass(g, this);
        g.onExtended(function(i, j) {
          b.prepareClass(i, null, j)
        });
        if (h.onClassMixedIn) {
          Ext.override(g, {
            onClassMixedIn: function(i) {
              f.call(this, i);
              this.callParent(arguments)
            }
          })
        } else {
          h.onClassMixedIn = function(i) {
            f.call(this, i)
          }
        }
      }
      a.call(this, g)
    },
    a = e.onClassMixedIn;
  c.prototype = {
    _decr_: function(h, g) {
      if (g == null) {
        g = 1
      }
      if (!(this[h] -= g)) {
        delete this[h]
      }
    },
    _incr_: function(g) {
      if (this.hasOwnProperty(g)) {
        ++this[g]
      } else {
        this[g] = 1
      }
    }
  };
  e.HasListeners = b.HasListeners = c;
  b.createAlias({
    on: "addListener",
    un: "removeListener",
    mon: "addManagedListener",
    mun: "removeManagedListener",
    setListeners: "addListener"
  });
  b.observeClass = b.observe;

  function d(m) {
    var l = (this.methodEvents = this.methodEvents || {})[m],
      i, h, j, k = this,
      g;
    if (!l) {
      this.methodEvents[m] = l = {};
      l.originalFn = this[m];
      l.methodName = m;
      l.before = [];
      l.after = [];
      g = function(p, o, n) {
        if ((h = p.apply(o || k, n)) !== undefined) {
          if (typeof h == "object") {
            if (h.returnValue !== undefined) {
              i = h.returnValue
            } else {
              i = h
            }
            j = !!h.cancel
          } else {
            if (h === false) {
              j = true
            } else {
              i = h
            }
          }
        }
      };
      this[m] = function() {
        var p = Array.prototype.slice.call(arguments, 0),
          o, q, n;
        i = h = undefined;
        j = false;
        for (q = 0, n = l.before.length; q < n; q++) {
          o = l.before[q];
          g(o.fn, o.scope, p);
          if (j) {
            return i
          }
        }
        if ((h = l.originalFn.apply(k, p)) !== undefined) {
          i = h
        }
        for (q = 0, n = l.after.length; q < n; q++) {
          o = l.after[q];
          g(o.fn, o.scope, p);
          if (j) {
            return i
          }
        }
        return i
      }
    }
    return l
  }
  Ext.apply(e, {
    onClassMixedIn: f,
    beforeMethod: function(i, h, g) {
      d.call(this, i).before.push({
        fn: h,
        scope: g
      })
    },
    afterMethod: function(i, h, g) {
      d.call(this, i).after.push({
        fn: h,
        scope: g
      })
    },
    removeMethodListener: function(m, k, j) {
      var l = this.getMethodEvent(m),
        h, g;
      for (h = 0, g = l.before.length; h < g; h++) {
        if (l.before[h].fn == k && l.before[h].scope == j) {
          Ext.Array.erase(l.before, h, 1);
          return
        }
      }
      for (h = 0, g = l.after.length; h < g; h++) {
        if (l.after[h].fn == k && l.after[h].scope == j) {
          Ext.Array.erase(l.after, h, 1);
          return
        }
      }
    },
    toggleEventLogging: function(g) {
      Ext.util.Observable[g ? "capture" : "releaseCapture"](this,
        function(h) {
          if (Ext.isDefined(Ext.global.console)) {
            Ext.global.console.log(h, arguments)
          }
        })
    }
  })
}));
(Ext.cmd.derive("Ext.util.HashMap", Ext.Base, {
  generation: 0,
  config: {
    keyFn: null
  },
  constructor: function(a) {
    var c = this,
      b;
    c.mixins.observable.constructor.call(c, a);
    c.clear(true);
    b = c.getKeyFn();
    if (b) {
      c.getKey = b
    }
  },
  getCount: function() {
    return this.length
  },
  getData: function(a, b) {
    if (b === undefined) {
      b = a;
      a = this.getKey(b)
    }
    return [a, b]
  },
  getKey: function(a) {
    return a.id
  },
  add: function(a, c) {
    var b = this;
    if (arguments.length === 1) {
      c = a;
      a = b.getKey(c)
    }
    if (b.containsKey(a)) {
      return b.replace(a, c)
    }
    b.map[a] = c;
    ++b.length;
    b.generation++;
    if (b.hasListeners.add) {
      b.fireEvent("add", b, a, c)
    }
    return c
  },
  replace: function(b, d) {
    var c = this,
      e = c.map,
      a;
    if (arguments.length === 1) {
      d = b;
      b = c.getKey(d)
    }
    if (!c.containsKey(b)) {
      c.add(b, d)
    }
    a = e[b];
    e[b] = d;
    c.generation++;
    if (c.hasListeners.replace) {
      c.fireEvent("replace", c, b, d, a)
    }
    return d
  },
  remove: function(b) {
    var a = this.findKey(b);
    if (a !== undefined) {
      return this.removeAtKey(a)
    }
    return false
  },
  removeAtKey: function(a) {
    var b = this,
      c;
    if (b.containsKey(a)) {
      c = b.map[a];
      delete b.map[a];
      --b.length;
      b.generation++;
      if (b.hasListeners.remove) {
        b.fireEvent("remove", b, a, c)
      }
      return true
    }
    return false
  },
  get: function(a) {
    var b = this.map;
    return b.hasOwnProperty(a) ? b[a] : undefined
  },
  clear: function(a) {
    var b = this;
    if (a || b.generation) {
      b.map = {};
      b.length = 0;
      b.generation = a ? 0 : b.generation + 1
    }
    if (a !== true && b.hasListeners.clear) {
      b.fireEvent("clear", b)
    }
    return b
  },
  containsKey: function(a) {
    var b = this.map;
    return b.hasOwnProperty(a) && b[a] !== undefined
  },
  contains: function(a) {
    return this.containsKey(this.findKey(a))
  },
  getKeys: function() {
    return this.getArray(true)
  },
  getValues: function() {
    return this.getArray(false)
  },
  getArray: function(d) {
    var a = [],
      b, c = this.map;
    for (b in c) {
      if (c.hasOwnProperty(b)) {
        a.push(d ? b : c[b])
      }
    }
    return a
  },
  each: function(d, c) {
    var a = Ext.apply({}, this.map),
      b, e = this.length;
    c = c || this;
    for (b in a) {
      if (a.hasOwnProperty(b)) {
        if (d.call(c, b, a[b], e) === false) {
          break
        }
      }
    }
    return this
  },
  clone: function() {
    var c = new this.self(this.initialConfig),
      b = this.map,
      a;
    c.suspendEvents();
    for (a in b) {
      if (b.hasOwnProperty(a)) {
        c.add(a, b[a])
      }
    }
    c.resumeEvents();
    return c
  },
  findKey: function(b) {
    var a, c = this.map;
    for (a in c) {
      if (c.hasOwnProperty(a) && c[a] === b) {
        return a
      }
    }
    return undefined
  },
  destroy: function() {
    this.callParent();
    this.map = null
  }
}, 1, 0, 0, 0, 0, [
  [Ext.mixin.Observable.prototype.mixinId || Ext.mixin.Observable.$className,
    Ext.mixin.Observable
  ]
], [Ext.util, "HashMap"], function(b) {
  var a = b.prototype;
  a.removeByKey = a.removeAtKey
}));
(Ext.cmd.derive("Ext.promise.Consequence", Ext.Base, function(a) {
  return {
    promise: null,
    deferred: null,
    onFulfilled: null,
    onRejected: null,
    onProgress: null,
    constructor: function(e, b, d) {
      var c = this;
      c.onFulfilled = e;
      c.onRejected = b;
      c.onProgress = d;
      c.deferred = new Ext.promise.Deferred();
      c.promise = c.deferred.promise
    },
    trigger: function(e, d) {
      var c = this,
        b = c.deferred;
      switch (e) {
        case "fulfill":
          c.propagate(d, c.onFulfilled, b, b.resolve);
          break;
        case "reject":
          c.propagate(d, c.onRejected, b, b.reject);
          break
      }
    },
    update: function(b) {
      if (Ext.isFunction(this.onProgress)) {
        b = this.onProgress(b)
      }
      this.deferred.update(b)
    },
    propagate: function(d, e, b, c) {
      if (Ext.isFunction(e)) {
        this.schedule(function() {
          try {
            b.resolve(e(d))
          } catch (f) {
            b.reject(f)
          }
        })
      } else {
        c.call(this.deferred, d)
      }
    },
    schedule: function(c) {
      var b = a.queueSize++;
      a.queue[b] = c;
      if (!b) {
        Ext.asap(a.dispatch)
      }
    },
    statics: {
      queue: new Array(10000),
      queueSize: 0,
      dispatch: function() {
        var b = a.queue,
          d, c;
        for (c = 0; c < a.queueSize; ++c) {
          d = b[c];
          b[c] = null;
          d()
        }
        a.queueSize = 0
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.promise, "Consequence"], 0));
(Ext.cmd.derive("Ext.promise.Deferred", Ext.Base, {
  promise: null,
  consequences: [],
  completed: false,
  completionAction: null,
  completionValue: null,
  constructor: function() {
    var a = this;
    a.promise = new Ext.promise.Promise(a);
    a.consequences = [];
    a.completed = false;
    a.completionAction = null;
    a.completionValue = null
  },
  then: function(e, a, d) {
    var c = this,
      b = new Ext.promise.Consequence(e, a, d);
    if (c.completed) {
      b.trigger(c.completionAction, c.completionValue)
    } else {
      c.consequences.push(b)
    }
    return b.promise
  },
  resolve: function(d) {
    var c = this,
      a, b;
    if (c.completed) {
      return
    }
    try {
      if (d === c.promise) {
        throw new TypeError("A Promise cannot be resolved with itself.")
      }
      if ((Ext.isObject(d) || Ext.isFunction(d)) && Ext.isFunction(b = d.then)) {
        a = false;
        try {
          b.call(d, function(e) {
            if (!a) {
              a = true;
              c.resolve(e)
            }
          }, function(e) {
            if (!a) {
              a = true;
              c.reject(e)
            }
          })
        } catch (f) {
          if (!a) {
            c.reject(f)
          }
        }
      } else {
        c.complete("fulfill", d)
      }
    } catch (f) {
      c.reject(f)
    }
  },
  reject: function(a) {
    if (this.completed) {
      return
    }
    this.complete("reject", a)
  },
  update: function(b) {
    var e = this.consequences,
      d, c, a;
    if (this.completed) {
      return
    }
    for (c = 0, a = e.length; c < a; c++) {
      d = e[c];
      d.update(b)
    }
  },
  complete: function(f, e) {
    var d = this,
      g = d.consequences,
      c, b, a;
    d.completionAction = f;
    d.completionValue = e;
    d.completed = true;
    for (b = 0, a = g.length; b < a; b++) {
      c = g[b];
      c.trigger(d.completionAction, d.completionValue)
    }
    d.consequences = null
  }
}, 1, 0, 0, 0, 0, 0, [Ext.promise, "Deferred"], 0));
(Ext.cmd.derive("Ext.promise.Promise", Ext.Base, function(b) {
  var a;
  return {
    statics: {
      CancellationError: Ext.global.CancellationError || Error,
      _ready: function() {
        a = Ext.promise.Deferred
      },
      all: function(c) {
        return b.when(c).then(function(e) {
          var m = new a(),
            h = e.length,
            f = new Array(h),
            k, d, l, g, j;
          if (!h) {
            m.resolve(f)
          } else {
            l = function(n, i) {
              return b.when(n).then(function(o) {
                f[i] = o;
                if (!--h) {
                  m.resolve(f)
                }
                return o
              }, function(o) {
                return m.reject(o)
              })
            };
            for (k = g = 0, j = e.length; g < j; k = ++g) {
              d = e[k];
              if (k in e) {
                l(d, k)
              } else {
                h--
              }
            }
          }
          return m.promise
        })
      },
      is: function(c) {
        return (Ext.isObject(c) || Ext.isFunction(c)) && Ext.isFunction(c
          .then)
      },
      rethrowError: function(c) {
        Ext.asap(function() {
          throw c
        })
      },
      when: function(d) {
        var c = new Ext.promise.Deferred();
        c.resolve(d);
        return c.promise
      }
    },
    owner: null,
    constructor: function(c) {
      this.owner = c
    },
    then: function(g, c, f, d) {
      var e;
      if (arguments.length === 1 && Ext.isObject(arguments[0])) {
        e = arguments[0];
        g = e.success;
        c = e.failure;
        f = e.progress;
        d = e.scope
      }
      if (d) {
        if (g) {
          g = Ext.Function.bind(g, d)
        }
        if (c) {
          c = Ext.Function.bind(c, d)
        }
        if (f) {
          f = Ext.Function.bind(f, d)
        }
      }
      return this.owner.then(g, c, f)
    },
    otherwise: function(c, d) {
      var e;
      if (arguments.length === 1 && Ext.isObject(arguments[0])) {
        e = arguments[0];
        c = e.fn;
        d = e.scope
      }
      if (d != null) {
        c = Ext.Function.bind(c, d)
      }
      return this.owner.then(null, c)
    },
    always: function(c, d) {
      var e;
      if (arguments.length === 1 && Ext.isObject(arguments[0])) {
        e = arguments[0];
        c = e.fn;
        d = e.scope
      }
      if (d != null) {
        c = Ext.Function.bind(c, d)
      }
      return this.owner.then(function(f) {
        try {
          c()
        } catch (g) {
          b.rethrowError(g)
        }
        return f
      }, function(g) {
        try {
          c()
        } catch (f) {
          b.rethrowError(f)
        }
        throw g
      })
    },
    done: function() {
      this.owner.then(null, b.rethrowError)
    },
    cancel: function(c) {
      if (c == null) {
        c = null
      }
      this.owner.reject(new this.self.CancellationError(c))
    },
    log: function(c) {
      if (c == null) {
        c = ""
      }
      return this._owner.then(function(d) {
        Ext.log("" + (c || "Promise") + " resolved with value: " + d);
        return d
      }, function(d) {
        Ext.log("" + (c || "Promise") + " rejected with reason: " + d);
        throw d
      })
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.promise, "Promise"], function(a) {
  a._ready()
}));
(Ext.cmd.derive("Ext.Promise", Ext.Base, function() {
  var a;
  return {
    statics: {
      _ready: function() {
        a = Ext.promise.Promise
      },
      all: function() {
        return a.all.apply(a, arguments)
      },
      race: function() {},
      reject: function(c) {
        var b = new Ext.promise.Deferred();
        b.reject(c);
        return b.promise
      },
      resolve: function(c) {
        var b = new Ext.promise.Deferred();
        b.resolve(c);
        return b.promise
      }
    },
    constructor: function(c) {
      var b = new Ext.promise.Deferred();
      c(b.resolve.bind(b), b.reject.bind(b));
      return b.promise
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext, "Promise"], function(a) {
  var b = Ext.global.Promise;
  if (b && b.resolve) {
    Ext.Promise = b
  } else {
    a._ready()
  }
}));
(Ext.cmd.derive("Ext.Deferred", Ext.promise.Deferred, function(b) {
  var c, a;
  return {
    statics: {
      _ready: function() {
        c = Ext.promise.Promise;
        a = Ext.Promise.resolve
      },
      all: function() {
        return c.all.apply(c, arguments)
      },
      any: function(d) {
        return b.some(d, 1).then(function(e) {
          return e[0]
        }, function(e) {
          if (e instanceof Error && e.message ===
            "Too few Promises were resolved.") {
            Ext.raise("No Promises were resolved.")
          } else {
            throw e
          }
        })
      },
      delay: function(d, f) {
        var e;
        if (arguments.length === 1) {
          f = d;
          d = undefined
        }
        f = Math.max(f, 0);
        e = new b();
        setTimeout(function() {
          e.resolve(d)
        }, f);
        return e.promise
      },
      map: function(d, e) {
        return b.resolved(d).then(function(g) {
          var o, m, f, k, n, h, j, l;
          k = g.length;
          h = new Array(g.length);
          o = new b();
          if (!k) {
            o.resolve(h)
          } else {
            n = function(p, i) {
              return b.resolved(p).then(function(q) {
                return e(q, i, h)
              }).then(function(q) {
                h[i] = q;
                if (!--k) {
                  o.resolve(h)
                }
                return q
              }, function(q) {
                return o.reject(q)
              })
            };
            for (m = j = 0, l = g.length; j < l; m = ++j) {
              f = g[m];
              if (m in g) {
                n(f, m)
              } else {
                k--
              }
            }
          }
          return o.promise
        })
      },
      memoize: function(g, f, d) {
        var e = Ext.Function.memoize(g, f, d);
        return function() {
          return b.all(Ext.Array.slice(arguments)).then(function(h) {
            return e.apply(f, h)
          })
        }
      },
      parallel: function(e, f) {
        if (f == null) {
          f = null
        }
        var d = Ext.Array.slice(arguments, 2);
        return b.map(e, function(g) {
          if (!Ext.isFunction(g)) {
            throw new Error("Invalid parameter: expected a function.")
          }
          return g.apply(f, d)
        })
      },
      pipeline: function(e, d, f) {
        if (f == null) {
          f = null
        }
        return b.reduce(e, function(h, g) {
          if (!Ext.isFunction(g)) {
            throw new Error("Invalid parameter: expected a function.")
          }
          return g.call(f, h)
        }, d)
      },
      reduce: function(e, f, d) {
        var g = arguments.length === 3;
        return b.resolved(e).then(function(i) {
          var h = [i, function(k, l, j) {
            return b.resolved(k).then(function(m) {
              return b.resolved(l).then(function(n) {
                return f(m, n, j, i)
              })
            })
          }];
          if (g) {
            h.push(d)
          }
          return Ext.Array.reduce.apply(Ext.Array, h)
        })
      },
      rejected: function(e) {
        var d = new Ext.Deferred();
        d.reject(e);
        return d.promise
      },
      resolved: function(e) {
        var d = new Ext.Deferred();
        d.resolve(e);
        return d.promise
      },
      sequence: function(e, f) {
        if (f == null) {
          f = null
        }
        var d = Ext.Array.slice(arguments, 2);
        return b.reduce(e, function(g, h) {
          if (!Ext.isFunction(h)) {
            throw new Error("Invalid parameter: expected a function.")
          }
          return b.resolved(h.apply(f, d)).then(function(i) {
            g.push(i);
            return g
          })
        }, [])
      },
      some: function(e, d) {
        return b.resolved(e).then(function(h) {
          var q, m, o, p, g, f, k, n, j, l;
          n = [];
          k = d;
          f = (h.length - k) + 1;
          q = new b();
          if (h.length < d) {
            q.reject(new Error("Too few Promises were resolved."))
          } else {
            p = function(i) {
              if (k > 0) {
                n.push(i)
              }
              k--;
              if (k === 0) {
                q.resolve(n)
              }
              return i
            };
            o = function(i) {
              f--;
              if (f === 0) {
                q.reject(new Error(
                  "Too few Promises were resolved."))
              }
              return i
            };
            for (m = j = 0, l = h.length; j < l; m = ++j) {
              g = h[m];
              if (m in h) {
                b.resolved(g).then(p, o)
              }
            }
          }
          return q.promise
        })
      },
      timeout: function(d, f) {
        var e = new b(),
          g;
        g = setTimeout(function() {
          if (g) {
            e.reject(new Error("Promise timed out."))
          }
        }, f);
        b.resolved(d).then(function(h) {
          clearTimeout(g);
          g = null;
          e.resolve(h)
        }, function(h) {
          clearTimeout(g);
          g = null;
          e.reject(h)
        });
        return e.promise
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext, "Deferred"], function(a) {
  a._ready()
}));
Ext.Factory = function(a) {
  var b = this;
  b.aliasPrefix = a + ".";
  b.cache = {};
  b.name = a.replace(b.fixNameRe, b.fixNameFn);
  b.type = a
};
Ext.Factory.prototype = {
  defaultProperty: "type",
  instanceProp: "isInstance",
  create: function(c, e) {
    var h = this,
      a = Ext.ClassManager,
      b = h.cache,
      d, g, f, i;
    if (c) {
      if (c[h.instanceProp]) {
        return c
      }
      if (typeof c === "string") {
        i = c;
        c = {};
        c[h.defaultProperty] = i
      }
      g = c.xclass;
      i = c.type
    }
    if (g) {
      if (!(f = a.get(g))) {
        return a.instantiate(g, c)
      }
    } else {
      if (!(i = i || e || h.defaultType)) {
        f = h.defaultClass
      }
      if (!f && !(f = b[i])) {
        d = h.aliasPrefix + i;
        g = a.getNameByAlias(d);
        if (!(f = g && a.get(g))) {
          return a.instantiateByAlias(d, c)
        }
        b[i] = f
      }
    }
    return f.isInstance ? f : new f(c)
  },
  fixNameRe: /\.[a-z]/ig,
  fixNameFn: function(a) {
    return a.substring(1).toUpperCase()
  },
  clearCache: function() {
    this.cache = {}
  }
};
Ext.Factory.define = function(f, d) {
  var a = Ext.Factory,
    b, c, e;
  if (f.constructor === Object) {
    Ext.Object.each(f, a.define, a)
  } else {
    c = new Ext.Factory(f);
    if (d) {
      if (d.constructor === Object) {
        Ext.apply(c, d);
        if (typeof(b = c.xclass) === "string") {
          c.defaultClass = Ext.ClassManager.get(b)
        }
      } else {
        c.defaultType = d
      }
    }
    a[c.name] = e = c.create.bind(c);
    e.instance = c
  }
  return e
};
(Ext.cmd.derive("Ext.mixin.Factoryable", Ext.Base, {
  mixinId: "factoryable",
  onClassMixedIn: function(f) {
    var e = f.prototype,
      g = e.factoryConfig,
      d = e.alias,
      c = {},
      b, a;
    d = d && d.length && d[0];
    if (d && (b = d.lastIndexOf(".")) > 0) {
      c.type = d.substring(0, b);
      c.defaultType = d.substring(b + 1)
    }
    if (g) {
      delete e.factoryConfig;
      Ext.apply(c, g)
    }
    a = Ext.Factory.define(c.type, c);
    if (f.create === Ext.Base.create) {
      f.create = a
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.mixin, "Factoryable"], 0));
(Ext.cmd.derive("Ext.data.request.Base", Ext.Base, {
  factoryConfig: {
    type: "request",
    defaultType: "ajax"
  },
  result: null,
  success: null,
  timer: null,
  constructor: function(a) {
    var b = this;
    Ext.apply(b, a.options || {}, a.ownerConfig);
    b.id = ++Ext.data.Connection.requestId;
    b.owner = a.owner;
    b.options = a.options;
    b.requestOptions = a.requestOptions
  },
  start: function() {
    var a = this,
      b = a.getTimeout();
    if (b && a.async) {
      a.timer = Ext.defer(a.onTimeout, b, a)
    }
  },
  abort: function() {
    var a = this;
    a.clearTimer();
    if (!a.timedout) {
      a.aborted = true
    }
    a.abort = Ext.emptyFn
  },
  createDeferred: function() {
    return (this.deferred = new Ext.Deferred())
  },
  getDeferred: function() {
    return this.deferred || this.createDeferred()
  },
  getPromise: function() {
    return this.getDeferred().promise
  },
  then: function() {
    var a = this.getPromise();
    return a.then.apply(a, arguments)
  },
  onComplete: function() {
    var c = this,
      b = c.deferred,
      a = c.result;
    c.clearTimer();
    if (b) {
      if (c.success) {
        b.resolve(a)
      } else {
        b.reject(a)
      }
    }
  },
  onTimeout: function() {
    var a = this;
    a.timedout = true;
    a.timer = null;
    a.abort(true)
  },
  getTimeout: function() {
    return this.timeout
  },
  clearTimer: function() {
    var a = this.timer;
    if (a) {
      clearTimeout(a);
      this.timer = null
    }
  },
  destroy: function() {
    var a = this;
    a.abort();
    a.owner = a.options = a.requestOptions = a.result = null;
    a.callParent()
  },
  privates: {
    createException: function() {
      var b = this,
        a;
      a = {
        request: b,
        requestId: b.id,
        status: b.aborted ? -1 : 0,
        statusText: b.aborted ? "transaction aborted" : "communication failure",
        getResponseHeader: b._getHeader,
        getAllResponseHeaders: b._getHeaders
      };
      if (b.aborted) {
        a.aborted = true
      }
      if (b.timedout) {
        a.timedout = true
      }
      return a
    },
    _getHeader: function(a) {
      var b = this.headers;
      return b && b[a.toLowerCase()]
    },
    _getHeaders: function() {
      return this.headers
    }
  }
}, 1, 0, 0, 0, 0, [
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ]
], [Ext.data.request, "Base"], 0));
(Ext.cmd.derive("Ext.data.flash.BinaryXhr", Ext.Base, {
  statics: {
    flashPluginActivated: function() {
      Ext.data.flash.BinaryXhr.flashPluginActive = true;
      Ext.data.flash.BinaryXhr.flashPlugin = document.getElementById(
        "ext-flash-polyfill");
      Ext.GlobalEvents.fireEvent("flashready")
    },
    flashPluginActive: false,
    flashPluginInjected: false,
    connectionIndex: 1,
    liveConnections: {},
    flashPlugin: null,
    onFlashStateChange: function(d, c, b) {
      var a;
      a = this.liveConnections[Number(d)];
      if (a) {
        a.onFlashStateChange(c, b)
      }
    },
    registerConnection: function(b) {
      var a = this.connectionIndex;
      this.conectionIndex = this.connectionIndex + 1;
      this.liveConnections[a] = b;
      return a
    },
    injectFlashPlugin: function() {
      var b = this,
        a, c;
      b.flashPolyfillEl = Ext.getBody().appendChild({
        id: "ext-flash-polyfill",
        cn: [{
          tag: "p",
          html: "To view this page ensure that Adobe Flash Player version 11.1.0 or greater is installed."
        }, {
          tag: "a",
          href: "http://www.adobe.com/go/getflashplayer",
          cn: [{
            tag: "img",
            src: window.location.protocol +
              "//www.adobe.com/images/shared/download_buttons/get_flash_player.gif",
            alt: "Get Adobe Flash player"
          }]
        }]
      });
      a = [Ext.Loader.getPath("Ext.data.Connection"),
        "../../../plugins/flash/swfobject.js"
      ].join("/");
      c = "/plugins/flash/FlashPlugin.swf";
      if (Ext.flashPluginPath) {
        c = Ext.flashPluginPath
      }
      Ext.Loader.loadScript({
        url: a,
        onLoad: function() {
          var e = "11.4.0";
          var g = "playerProductInstall.swf";
          var d = {};
          var h = {};
          h.quality = "high";
          h.bgcolor = "#ffffff";
          h.allowscriptaccess = "sameDomain";
          h.allowfullscreen = "true";
          var f = {};
          f.id = "ext-flash-polyfill";
          f.name = "polyfill";
          f.align = "middle";
          swfobject.embedSWF(c, "ext-flash-polyfill", "0", "0", e,
            g, d, h, f)
        },
        onError: function() {},
        scope: b
      });
      Ext.data.flash.BinaryXhr.flashPluginInjected = true
    }
  },
  readyState: 0,
  status: 0,
  statusText: "",
  responseBytes: null,
  javascriptId: null,
  constructor: function(a) {
    if (!Ext.data.flash.BinaryXhr.flashPluginInjected) {
      Ext.data.flash.BinaryXhr.injectFlashPlugin()
    }
    var b = this;
    Ext.apply(b, a);
    b.requestHeaders = {}
  },
  abort: function() {
    var a = this;
    if (a.readyState == 4) {
      return
    }
    a.aborted = true;
    if (!Ext.data.flash.BinaryXhr.flashPluginActive) {
      Ext.GlobalEvents.removeListener("flashready", a.onFlashReady, a);
      return
    }
    Ext.data.flash.BinaryXhr.flashPlugin.abortRequest(a.javascriptId);
    delete Ext.data.flash.BinaryXhr.liveConnections[a.javascriptId]
  },
  getAllResponseHeaders: function() {
    var a = [];
    Ext.Object.each(this.responseHeaders, function(b, c) {
      a.push(b + ": " + c)
    });
    return a.join("\r\n")
  },
  getResponseHeader: function(b) {
    var a = this.responseHeaders;
    return (a && a[b]) || null
  },
  open: function(f, c, d, a, b) {
    var e = this;
    e.method = f;
    e.url = c;
    e.async = d !== false;
    e.user = a;
    e.password = b
  },
  overrideMimeType: function(a) {
    this.mimeType = a
  },
  send: function(a) {
    var b = this;
    b.body = a;
    if (!Ext.data.flash.BinaryXhr.flashPluginActive) {
      Ext.GlobalEvents.addListener("flashready", b.onFlashReady, b)
    } else {
      this.onFlashReady()
    }
  },
  onFlashReady: function() {
    var c = this,
      b, a;
    c.javascriptId = Ext.data.flash.BinaryXhr.registerConnection(c);
    b = {
      method: c.method,
      url: c.url,
      user: c.user,
      password: c.password,
      mimeType: c.mimeType,
      requestHeaders: c.requestHeaders,
      body: c.body,
      javascriptId: c.javascriptId
    };
    a = Ext.data.flash.BinaryXhr.flashPlugin.postBinary(b)
  },
  setReadyState: function(b) {
    var a = this;
    if (a.readyState != b) {
      a.readyState = b;
      a.onreadystatechange()
    }
  },
  setRequestHeader: function(b, a) {
    this.requestHeaders[b] = a
  },
  onreadystatechange: Ext.emptyFn,
  parseData: function(b) {
    var a = this;
    this.status = b.status || 0;
    a.responseHeaders = {};
    if (a.mimeType) {
      a.responseHeaders["content-type"] = a.mimeType
    }
    if (b.reason == "complete") {
      this.responseBytes = b.data;
      a.responseHeaders["content-length"] = b.data.length
    } else {
      if (b.reason == "error" || b.reason == "securityError") {
        this.statusText = b.text;
        a.responseHeaders["content-length"] = 0
      }
    }
  },
  onFlashStateChange: function(c, b) {
    var a = this;
    if (c == 4) {
      a.parseData(b);
      delete Ext.data.flash.BinaryXhr.liveConnections[a.javascriptId]
    }
    a.setReadyState(c)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data.flash, "BinaryXhr"], 0));
(Ext.cmd.derive("Ext.data.request.Ajax", Ext.data.request.Base, {
  start: function(e) {
    var c = this,
      b = c.options,
      a = c.requestOptions,
      d = c.isXdr,
      g, f;
    g = c.xhr = c.openRequest(b, a, c.async, c.username, c.password);
    if (!d) {
      f = c.setupHeaders(g, b, a.data, a.params)
    }
    if (c.async) {
      if (!d) {
        g.onreadystatechange = Ext.Function.bind(c.onStateChange, c)
      }
    }
    if (d) {
      c.processXdrRequest(c, g)
    }
    Ext.data.request.Base.prototype.start.call(this, e);
    g.send(e);
    if (!c.async) {
      return c.onComplete()
    }
    return c
  },
  abort: function(b) {
    var a = this,
      d = a.xhr;
    if (b || a.isLoading()) {
      try {
        d.onreadystatechange = null
      } catch (c) {
        d.onreadystatechange = Ext.emptyFn
      }
      d.abort();
      Ext.data.request.Base.prototype.abort.call(this, b);
      a.onComplete();
      a.cleanup()
    }
  },
  cleanup: function() {
    this.xhr = null;
    delete this.xhr
  },
  isLoading: function() {
    var a = this,
      d = a.xhr,
      b = d && d.readyState,
      c = Ext.data.flash && Ext.data.flash.BinaryXhr;
    if (!d || a.aborted || a.timedout) {
      return false
    }
    if (c && d instanceof c) {
      return b !== 4
    }
    return b !== 0 && b !== 4
  },
  openRequest: function(c, a, d, g, b) {
    var e = this,
      f = e.newRequest(c);
    if (g) {
      f.open(a.method, a.url, d, g, b)
    } else {
      if (e.isXdr) {
        f.open(a.method, a.url)
      } else {
        f.open(a.method, a.url, d)
      }
    }
    if (c.binary || e.binary) {
      if (window.Uint8Array) {
        f.responseType = "arraybuffer"
      } else {
        if (f.overrideMimeType) {
          f.overrideMimeType("text/plain; charset=x-user-defined")
        }
      }
    }
    if (c.withCredentials || e.withCredentials) {
      f.withCredentials = true
    }
    return f
  },
  newRequest: function(a) {
    var b = this,
      c;
    if (a.binaryData) {
      if (window.Uint8Array) {
        c = b.getXhrInstance()
      } else {
        c = new Ext.data.flash.BinaryXhr()
      }
    } else {
      if (b.cors && Ext.isIE9m) {
        c = b.getXdrInstance();
        b.isXdr = true
      } else {
        c = b.getXhrInstance();
        b.isXdr = false
      }
    }
    return c
  },
  setupHeaders: function(n, o, f, d) {
    var j = this,
      b = Ext.apply({}, o.headers || {}, j.defaultHeaders),
      m = j.defaultPostHeader,
      k = o.jsonData,
      a = o.xmlData,
      i = "Content-Type",
      c = j.useDefaultXhrHeader,
      l, g;
    if (!b.hasOwnProperty(i) && (f || d)) {
      if (f) {
        if (o.rawData) {
          m = "text/plain"
        } else {
          if (a && Ext.isDefined(a)) {
            m = "text/xml"
          } else {
            if (k && Ext.isDefined(k)) {
              m = "application/json"
            }
          }
        }
      }
      b[i] = m
    }
    if (c && !b["X-Requested-With"]) {
      b["X-Requested-With"] = j.defaultXhrHeader
    }
    if (b[i] === undefined || b[i] === null) {
      delete b[i]
    }
    try {
      for (l in b) {
        if (b.hasOwnProperty(l)) {
          g = b[l];
          n.setRequestHeader(l, g)
        }
      }
    } catch (h) {
      j.owner.fireEvent("exception", l, g)
    }
    return b
  },
  getXdrInstance: function() {
    var a;
    if (Ext.ieVersion >= 8) {
      a = new XDomainRequest()
    } else {
      Ext.raise({
        msg: "Your browser does not support CORS"
      })
    }
    return a
  },
  getXhrInstance: (function() {
    var b = [function() {
        return new XMLHttpRequest()
      }, function() {
        return new ActiveXObject("MSXML2.XMLHTTP.3.0")
      }, function() {
        return new ActiveXObject("MSXML2.XMLHTTP")
      }, function() {
        return new ActiveXObject("Microsoft.XMLHTTP")
      }],
      c = 0,
      a = b.length,
      f;
    for (; c < a; ++c) {
      try {
        f = b[c];
        f();
        break
      } catch (d) {}
    }
    return f
  }()),
  processXdrRequest: function(b, c) {
    var a = this;
    delete b.headers;
    b.contentType = b.options.contentType || a.defaultXdrContentType;
    c.onload = Ext.Function.bind(a.onStateChange, a, [true]);
    c.onerror = c.ontimeout = Ext.Function.bind(a.onStateChange, a, [
      false
    ])
  },
  processXdrResponse: function(a, b) {
    a.getAllResponseHeaders = function() {
      return []
    };
    a.getResponseHeader = function() {
      return ""
    };
    a.contentType = b.contentType || this.defaultXdrContentType
  },
  onStateChange: function(b) {
    var c = this,
      d = c.xhr,
      a = Ext.GlobalEvents;
    if ((d && d.readyState == 4) || c.isXdr) {
      c.clearTimer();
      c.onComplete(b);
      c.cleanup();
      if (a.hasListeners.idle) {
        a.fireEvent("idle")
      }
    }
  },
  onComplete: function(i) {
    var f = this,
      a = f.owner,
      j = f.options,
      h = f.xhr,
      b = {
        success: false,
        isException: false
      },
      k, g, c;
    if (!h || f.destroyed) {
      return f.result = b
    }
    try {
      k = f.parseStatus(h.status);
      if (k.success) {
        k.success = h.readyState === 4
      }
    } catch (d) {
      k = b
    }
    g = f.success = f.isXdr ? i : k.success;
    if (g) {
      c = f.createResponse(h);
      a.fireEvent("requestcomplete", a, c, j);
      Ext.callback(j.success, j.scope, [c, j])
    } else {
      if (k.isException || f.aborted || f.timedout) {
        c = f.createException(h)
      } else {
        c = f.createResponse(h)
      }
      a.fireEvent("requestexception", a, c, j);
      Ext.callback(j.failure, j.scope, [c, j])
    }
    f.result = c;
    Ext.callback(j.callback, j.scope, [j, g, c]);
    a.onRequestComplete(f);
    Ext.data.request.Base.prototype.onComplete.call(this, i);
    return c
  },
  parseStatus: function(a) {
    a = a == 1223 ? 204 : a;
    var c = (a >= 200 && a < 300) || a == 304,
      b = false;
    if (!c) {
      switch (a) {
        case 12002:
        case 12029:
        case 12030:
        case 12031:
        case 12152:
        case 13030:
          b = true;
          break
      }
    }
    return {
      success: c,
      isException: b
    }
  },
  createResponse: function(i) {
    var g = this,
      c = g.isXdr,
      b = {},
      j = c ? [] : i.getAllResponseHeaders().replace(/\r\n/g, "\n").split(
        "\n"),
      e = j.length,
      k, f, h, d, a;
    while (e--) {
      k = j[e];
      f = k.indexOf(":");
      if (f >= 0) {
        h = k.substr(0, f).toLowerCase();
        if (k.charAt(f + 1) == " ") {
          ++f
        }
        b[h] = k.substr(f + 1)
      }
    }
    d = {
      request: g,
      requestId: g.id,
      status: i.status,
      statusText: i.statusText,
      getResponseHeader: g._getHeader,
      getAllResponseHeaders: g._getHeaders
    };
    if (c) {
      g.processXdrResponse(d, i)
    }
    if (g.binary) {
      d.responseBytes = g.getByteArray(i)
    } else {
      d.responseText = i.responseText;
      d.responseXML = i.responseXML
    }
    return d
  },
  destroy: function() {
    this.xhr = null;
    Ext.data.request.Base.prototype.destroy.call(this)
  },
  privates: {
    getByteArray: function(j) {
      var c = j.response,
        b = j.responseBody,
        k = Ext.data.flash && Ext.data.flash.BinaryXhr,
        a, h, f, d;
      if (j instanceof k) {
        a = j.responseBytes
      } else {
        if (window.Uint8Array) {
          a = c ? new Uint8Array(c) : []
        } else {
          if (Ext.isIE9p) {
            try {
              a = new VBArray(b).toArray()
            } catch (g) {
              a = []
            }
          } else {
            if (Ext.isIE) {
              if (!this.self.vbScriptInjected) {
                this.injectVBScript()
              }
              getIEByteArray(j.responseBody, a = [])
            } else {
              a = [];
              h = j.responseText;
              f = h.length;
              for (d = 0; d < f; d++) {
                a.push(h.charCodeAt(d) & 255)
              }
            }
          }
        }
      }
      return a
    },
    injectVBScript: function() {
      var a = document.createElement("script");
      a.type = "text/vbscript";
      a.text = ["Function getIEByteArray(byteArray, out)", "Dim len, i",
        "len = LenB(byteArray)", "For i = 1 to len",
        "out.push(AscB(MidB(byteArray, i, 1)))", "Next", "End Function"
      ].join("\n");
      Ext.getHead().dom.appendChild(a);
      this.self.vbScriptInjected = true
    }
  }
}, 0, 0, 0, 0, ["request.ajax"], 0, [Ext.data.request, "Ajax"], 0));
(Ext.cmd.derive("Ext.data.request.Form", Ext.data.request.Base, {
  start: function(d) {
    var c = this,
      b = c.options,
      a = c.requestOptions;
    Ext.data.request.Base.prototype.start.call(this, d);
    c.form = c.upload(b.form, a.url, a.data, b);
    return c
  },
  abort: function(b) {
    var a = this,
      d;
    if (a.isLoading()) {
      try {
        d = a.frame.dom;
        if (d.stop) {
          d.stop()
        } else {
          d.document.execCommand("Stop")
        }
      } catch (c) {}
    }
    Ext.data.request.Base.prototype.abort.call(this, b);
    a.onComplete();
    a.cleanup()
  },
  cleanup: function() {
    var a = this,
      b = a.frame;
    if (b) {
      b.un("load", a.onComplete, a);
      Ext.removeNode(b)
    }
    a.frame = a.form = null
  },
  isLoading: function() {
    return !!this.frame
  },
  upload: function(b, g, t, f) {
    b = Ext.getDom(b);
    f = f || {};
    var r = document.createElement("iframe"),
      l = Ext.get(r),
      n = l.id,
      c = [],
      d = "multipart/form-data",
      s = {
        target: b.target,
        method: b.method,
        encoding: b.encoding,
        enctype: b.enctype,
        action: b.action
      },
      a = function(h, v) {
        i = document.createElement("input");
        Ext.fly(i).set({
          type: "hidden",
          value: v,
          name: h
        });
        b.appendChild(i);
        c.push(i)
      },
      i, k, p, u, o, j, m, q, e;
    l.set({
      name: n,
      cls: "x-hidden-display",
      src: Ext.SSL_SECURE_URL,
      tabIndex: -1
    });
    document.body.appendChild(r);
    if (document.frames) {
      document.frames[n].name = n
    }
    Ext.fly(b).set({
      target: n,
      method: "POST",
      enctype: d,
      encoding: d,
      action: g || s.action
    });
    if (t) {
      k = Ext.Object.fromQueryString(t) || {};
      for (u in k) {
        if (k.hasOwnProperty(u)) {
          p = k[u];
          if (Ext.isArray(p)) {
            o = p.length;
            for (j = 0; j < o; j++) {
              a(u, p[j])
            }
          } else {
            a(u, p)
          }
        }
      }
    }
    this.frame = l;
    l.on({
      load: this.onComplete,
      scope: this,
      single: !Ext.isOpera
    });
    b.submit();
    Ext.fly(b).set(s);
    for (m = c.length, q = 0; q < m; q++) {
      Ext.removeNode(c[q])
    }
    return b
  },
  getDoc: function() {
    var a = this.frame.dom;
    return (a && (a.contentWindow.document || a.contentDocument)) || (
      window.frames[a.id] || {}).document
  },
  getTimeout: function() {
    return this.options.timeout
  },
  onComplete: function() {
    var g = this,
      b = g.frame,
      a = g.owner,
      k = g.options,
      i, h, j, d, c;
    if (!b) {
      return
    }
    if (g.aborted || g.timedout) {
      g.result = c = g.createException();
      c.responseXML = null;
      c.responseText = '{success:false,message:"' + Ext.String.trim(c.statusText) +
        '"}';
      i = k.failure;
      j = false
    } else {
      try {
        h = g.getDoc();
        g.result = c = {
          responseText: "",
          responseXML: null
        };
        if (h) {
          if (Ext.isOpera && h.location == Ext.SSL_SECURE_URL) {
            return
          }
          if (h.body) {
            if ((d = h.body.firstChild) && /pre/i.test(d.tagName)) {
              c.responseText = d.textContent || d.innerText
            } else {
              if ((d = h.getElementsByTagName("textarea")[0])) {
                c.responseText = d.value
              } else {
                c.responseText = h.body.textContent || h.body.innerText
              }
            }
          }
          c.responseXML = h.XMLDocument || h;
          i = k.success;
          j = true;
          c.status = 200
        } else {
          Ext.raise(
            "Could not acquire a suitable connection for the file upload service."
          )
        }
      } catch (f) {
        g.result = c = g.createException();
        c.status = 400;
        c.statusText = (f.message || f.description) + "";
        c.responseText = '{success:false,message:"' + Ext.String.trim(c.statusText) +
          '"}';
        c.responseXML = null;
        i = k.failure;
        j = false
      }
    }
    g.frame = null;
    g.success = j;
    a.fireEvent(j ? "requestcomplete" : "requestexception", a, c, k);
    Ext.callback(i, k.scope, [c, k]);
    Ext.callback(k.callback, k.scope, [k, j, c]);
    a.onRequestComplete(g);
    Ext.asap(b.destroy, b);
    Ext.data.request.Base.prototype.onComplete.call(this)
  },
  destroy: function() {
    this.cleanup();
    Ext.data.request.Base.prototype.destroy.call(this)
  }
}, 0, 0, 0, 0, ["request.form"], 0, [Ext.data.request, "Form"], 0));
(Ext.cmd.derive("Ext.data.Connection", Ext.Base, {
  statics: {
    requestId: 0
  },
  enctypeRe: /multipart\/form-data/i,
  config: {
    url: null,
    async: true,
    username: "",
    password: "",
    disableCaching: true,
    withCredentials: false,
    binary: false,
    cors: false,
    isXdr: false,
    defaultXdrContentType: "text/plain",
    disableCachingParam: "_dc",
    timeout: 30000,
    extraParams: null,
    autoAbort: false,
    method: null,
    defaultHeaders: null,
    defaultPostHeader: "application/x-www-form-urlencoded; charset=UTF-8",
    useDefaultXhrHeader: true,
    defaultXhrHeader: "XMLHttpRequest"
  },
  constructor: function(a) {
    this.mixins.observable.constructor.call(this, a);
    this.requests = {}
  },
  request: function(b) {
    b = b || {};
    var d = this,
      a, c;
    if (d.fireEvent("beforerequest", d, b) !== false) {
      a = d.setOptions(b, b.scope || Ext.global);
      c = d.createRequest(b, a);
      return c.start(a.data)
    }
    Ext.callback(b.callback, b.scope, [b, undefined, undefined]);
    return Ext.Deferred.rejected([b, undefined, undefined])
  },
  createRequest: function(b, a) {
    var e = this,
      c = b.type || a.type,
      d;
    if (!c) {
      c = e.isFormUpload(b) ? "form" : "ajax"
    }
    if (b.autoAbort || e.getAutoAbort()) {
      e.abort()
    }
    d = Ext.Factory.request({
      type: c,
      owner: e,
      options: b,
      requestOptions: a,
      ownerConfig: e.getConfig()
    });
    e.requests[d.id] = d;
    e.latestId = d.id;
    return d
  },
  isFormUpload: function(a) {
    var b = this.getForm(a);
    if (b) {
      return a.isUpload || this.enctypeRe.test(b.getAttribute("enctype"))
    }
    return false
  },
  getForm: function(a) {
    return Ext.getDom(a.form)
  },
  setOptions: function(l, k) {
    var i = this,
      e = l.params || {},
      h = i.getExtraParams(),
      d = l.urlParams,
      c = l.url || i.getUrl(),
      g = l.cors,
      j = l.jsonData,
      b, a, f;
    if (g !== undefined) {
      i.setCors(g)
    }
    if (Ext.isFunction(e)) {
      e = e.call(k, l)
    }
    if (Ext.isFunction(c)) {
      c = c.call(k, l)
    }
    c = this.setupUrl(l, c);
    f = l.rawData || l.binaryData || l.xmlData || j || null;
    if (j && !Ext.isPrimitive(j)) {
      f = Ext.encode(f)
    }
    if (l.binaryData) {
      if (i.nativeBinaryPostSupport()) {
        f = (new Uint8Array(l.binaryData));
        if ((Ext.isChrome && Ext.chromeVersion < 22) || Ext.isSafari ||
          Ext.isGecko) {
          f = f.buffer
        }
      }
    }
    if (Ext.isObject(e)) {
      e = Ext.Object.toQueryString(e)
    }
    if (Ext.isObject(h)) {
      h = Ext.Object.toQueryString(h)
    }
    e = e + ((h) ? ((e) ? "&" : "") + h : "");
    d = Ext.isObject(d) ? Ext.Object.toQueryString(d) : d;
    e = this.setupParams(l, e);
    b = (l.method || i.getMethod() || ((e || f) ? "POST" : "GET")).toUpperCase();
    this.setupMethod(l, b);
    a = l.disableCaching !== false ? (l.disableCaching || i.getDisableCaching()) :
      false;
    if (b === "GET" && a) {
      c = Ext.urlAppend(c, (l.disableCachingParam || i.getDisableCachingParam()) +
        "=" + (new Date().getTime()))
    }
    if ((b == "GET" || f) && e) {
      c = Ext.urlAppend(c, e);
      e = null
    }
    if (d) {
      c = Ext.urlAppend(c, d)
    }
    return {
      url: c,
      method: b,
      data: f || e || null
    }
  },
  setupUrl: function(b, a) {
    var c = this.getForm(b);
    if (c) {
      a = a || c.action
    }
    return a
  },
  setupParams: function(a, d) {
    var c = this.getForm(a),
      b;
    if (c && !this.isFormUpload(a)) {
      b = Ext.Element.serializeForm(c);
      d = d ? (d + "&" + b) : b
    }
    return d
  },
  setupMethod: function(a, b) {
    if (this.isFormUpload(a)) {
      return "POST"
    }
    return b
  },
  isLoading: function(a) {
    if (!a) {
      a = this.getLatest()
    }
    return a ? a.isLoading() : false
  },
  abort: function(a) {
    if (!a) {
      a = this.getLatest()
    }
    if (a && a.isLoading()) {
      a.abort()
    }
  },
  abortAll: function() {
    var b = this.requests,
      a;
    for (a in b) {
      this.abort(b[a])
    }
  },
  getLatest: function() {
    var b = this.latestId,
      a;
    if (b) {
      a = this.requests[b]
    }
    return a || null
  },
  clearTimeout: function(a) {
    if (!a) {
      a = this.getLatest()
    }
    if (a) {
      a.clearTimer()
    }
  },
  onRequestComplete: function(a) {
    delete this.requests[a.id]
  },
  nativeBinaryPostSupport: function() {
    return Ext.isChrome || (Ext.isSafari && Ext.isDefined(window.Uint8Array)) ||
      (Ext.isGecko && Ext.isDefined(window.Uint8Array))
  }
}, 1, 0, 0, 0, 0, [
  ["observable", Ext.mixin.Observable]
], [Ext.data, "Connection"], 0));
(Ext.cmd.derive("Ext.Ajax", Ext.data.Connection, {
  singleton: true,
  autoAbort: false
}, 0, 0, 0, 0, 0, 0, [Ext, "Ajax"], 0));
(Ext.cmd.derive("Ext.AnimationQueue", Ext.Base, {
  singleton: true,
  constructor: function() {
    var a = this;
    a.queue = [];
    a.taskQueue = [];
    a.runningQueue = [];
    a.idleQueue = [];
    a.isRunning = false;
    a.isIdle = true;
    a.run = Ext.Function.bind(a.run, a);
    if (Ext.os.is.iOS) {
      Ext.interval(a.watch, 500, a)
    }
  },
  start: function(c, b, a) {
    var d = this;
    d.queue.push(arguments);
    if (!d.isRunning) {
      if (d.hasOwnProperty("idleTimer")) {
        clearTimeout(d.idleTimer);
        delete d.idleTimer
      }
      if (d.hasOwnProperty("idleQueueTimer")) {
        clearTimeout(d.idleQueueTimer);
        delete d.idleQueueTimer
      }
      d.isIdle = false;
      d.isRunning = true;
      d.doStart()
    }
  },
  watch: function() {
    if (this.isRunning && Ext.now() - this.lastRunTime >= 500) {
      this.run()
    }
  },
  run: function() {
    var e = this;
    if (!e.isRunning) {
      return
    }
    var a = e.runningQueue,
      b = Ext.now(),
      c, d;
    e.lastRunTime = b;
    e.frameStartTime = b;
    a.push.apply(a, e.queue);
    for (c = 0, d = a.length; c < d; c++) {
      e.invoke(a[c])
    }
    a.length = 0;
    e.doIterate()
  },
  doStart: function() {
    this.animationFrameId = Ext.Function.requestAnimationFrame(this.run);
    this.lastRunTime = Ext.now()
  },
  doIterate: function() {
    this.animationFrameId = Ext.Function.requestAnimationFrame(this.run)
  },
  doStop: function() {
    Ext.Function.cancelAnimationFrame(this.animationFrameId)
  },
  stop: function(e, d, b) {
    var h = this;
    if (!h.isRunning) {
      return
    }
    var a = h.queue,
      g = a.length,
      c, f;
    for (c = 0; c < g; c++) {
      f = a[c];
      if (f[0] === e && f[1] === d && f[2] === b) {
        a.splice(c, 1);
        c--;
        g--
      }
    }
    if (g === 0) {
      h.doStop();
      h.isRunning = false;
      h.idleTimer = Ext.defer(h.whenIdle, 100, h)
    }
  },
  onIdle: function(e, d, a) {
    var c = this.idleQueue,
      b, f, g;
    for (b = 0, f = c.length; b < f; b++) {
      g = c[b];
      if (e === g[0] && d === g[1] && a === g[2]) {
        return
      }
    }
    c.push(arguments);
    if (this.isIdle) {
      this.processIdleQueue()
    }
  },
  unIdle: function(e, d, a) {
    var c = this.idleQueue,
      b, f, g;
    for (b = 0, f = c.length; b < f; b++) {
      g = c[b];
      if (e === g[0] && d === g[1] && a === g[2]) {
        c.splice(b, 1);
        return true
      }
    }
    return false
  },
  queueTask: function(c, b, a) {
    this.taskQueue.push(arguments);
    this.processTaskQueue()
  },
  dequeueTask: function(e, d, a) {
    var c = this.taskQueue,
      b, f, g;
    for (b = 0, f = c.length; b < f; b++) {
      g = c[b];
      if (e === g[0] && d === g[1] && a === g[2]) {
        c.splice(b, 1);
        b--;
        f--
      }
    }
  },
  invoke: function(d) {
    var c = d[0],
      b = d[1],
      a = d[2];
    c = (typeof c == "string" ? b[c] : c);
    if (Ext.isArray(a)) {
      c.apply(b, a)
    } else {
      c.call(b, a)
    }
  },
  whenIdle: function() {
    this.isIdle = true;
    this.processIdleQueue()
  },
  processIdleQueue: function() {
    if (!this.hasOwnProperty("idleQueueTimer")) {
      this.idleQueueTimer = Ext.defer(this.processIdleQueueItem, 1, this)
    }
  },
  processIdleQueueItem: function() {
    delete this.idleQueueTimer;
    if (!this.isIdle) {
      return
    }
    var a = this.idleQueue,
      b;
    if (a.length > 0) {
      b = a.shift();
      this.invoke(b);
      this.processIdleQueue()
    }
  },
  processTaskQueue: function() {
    if (!this.hasOwnProperty("taskQueueTimer")) {
      this.taskQueueTimer = Ext.defer(this.processTaskQueueItem, 15, this)
    }
  },
  processTaskQueueItem: function() {
    delete this.taskQueueTimer;
    var a = this.taskQueue,
      b;
    if (a.length > 0) {
      b = a.shift();
      this.invoke(b);
      this.processTaskQueue()
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext, "AnimationQueue"], 0));
(Ext.cmd.derive("Ext.ComponentManager", Ext.Base, {
    alternateClassName: "Ext.ComponentMgr",
    singleton: true,
    count: 0,
    typeName: "xtype",
    constructor: function(a) {
      var b = this;
      Ext.apply(b, a || {});
      b.all = {};
      b.references = {};
      b.onAvailableCallbacks = {}
    },
    create: function(a, b) {
      if (typeof a === "string") {
        return Ext.widget(a)
      }
      if (a.isComponent) {
        return a
      }
      if ("xclass" in a) {
        return Ext.create(a.xclass, a)
      }
      return Ext.widget(a.xtype || b, a)
    },
    get: function(a) {
      return this.all[a]
    },
    register: function(a) {
      var e = this,
        d = e.all,
        c = a.getId(),
        b = e.onAvailableCallbacks;
      d[c] = a;
      if (a.getReference && a.getReference()) {
        e.references[c] = a
      }++e.count;
      if (!e.hasFocusListener) {
        Ext.on("focus", e.onGlobalFocus, e);
        e.hasFocusListener = true
      }
      b = b && b[c];
      if (b && b.length) {
        e.notifyAvailable(a)
      }
    },
    unregister: function(a) {
      var b = a.getId();
      if (a.getReference && a.getReference()) {
        this.references[b] = null;
        delete this.references[b]
      }
      this.all[b] = null;
      delete this.all[b];
      this.count--
    },
    markReferencesDirty: function() {
      this.referencesDirty = true
    },
    fixReferences: function() {
      var c = this,
        b = c.references,
        a;
      if (c.referencesDirty) {
        for (a in b) {
          if (b.hasOwnProperty(a)) {
            b[a].fixReference()
          }
        }
        c.referencesDirty = false
      }
    },
    onAvailable: function(g, c, b) {
      var f = this,
        e = f.onAvailableCallbacks,
        a = f.all,
        d;
      if (g in a) {
        d = a[g];
        c.call(b || d, d)
      } else {
        if (g) {
          if (!Ext.isArray(e[g])) {
            e[g] = []
          }
          e[g].push(function(h) {
            c.call(b || h, h)
          })
        }
      }
    },
    notifyAvailable: function(b) {
      var a = this.onAvailableCallbacks[b && b.getId()] || [];
      while (a.length) {
        (a.shift())(b)
      }
    },
    each: function(b, a) {
      return Ext.Object.each(this.all, b, a)
    },
    getCount: function() {
      return this.count
    },
    getAll: function() {
      return Ext.Object.getValues(this.all)
    },
    getActiveComponent: function() {
      return Ext.Component.fromElement(Ext.dom.Element.getActiveElement())
    },
    onGlobalFocus: function(f) {
      var h = this,
        d = f.toElement,
        g = f.fromElement,
        c = Ext.Component.fromElement(d),
        i = Ext.Component.fromElement(g),
        j = h.getCommonAncestor(i, c),
        a, b;
      if (i && !(i.destroyed || i.destroying)) {
        if (i.handleBlurEvent) {
          i.handleBlurEvent(f)
        }
        for (b = i; b && b !== j; b = b.getRefOwner()) {
          if (!(b.destroyed || b.destroying)) {
            b.onFocusLeave({
              event: f.event,
              type: "focusleave",
              target: g,
              relatedTarget: d,
              fromComponent: i,
              toComponent: c
            })
          }
        }
      }
      if (c && !c.destroyed) {
        if (c.handleFocusEvent) {
          c.handleFocusEvent(f)
        }
        for (b = c; b && b !== j; b = b.getRefOwner()) {
          b.onFocusEnter({
            event: f.event,
            type: "focusenter",
            relatedTarget: g,
            target: d,
            fromComponent: i,
            toComponent: c
          })
        }
      }
    },
    getCommonAncestor: function(b, a) {
      if (b === a) {
        return b
      }
      while (b && !(b.isAncestor(a) || b === a)) {
        b = b.getRefOwner()
      }
      return b
    },
    privates: {
      clearAll: function() {
        this.all = {};
        this.references = {};
        this.onAvailableCallbacks = {}
      }
    },
    deprecated: {
      5: {
        methods: {
          isRegistered: null,
          registerType: null
        }
      }
    }
  }, 1, 0, 0, 0, 0, 0, [Ext, "ComponentManager", Ext, "ComponentMgr"],
  function() {
    Ext.getCmp = function(a) {
      return Ext.ComponentManager.get(a)
    }
  }));
Ext.ns("Ext.util").Operators = {
  "=": function(b, c) {
    return b == c
  },
  "!=": function(b, c) {
    return b != c
  },
  "^=": function(b, c) {
    return b && b.substr(0, c.length) == c
  },
  "$=": function(b, c) {
    return b && b.substr(b.length - c.length) == c
  },
  "*=": function(b, c) {
    return b && b.indexOf(c) !== -1
  },
  "%=": function(b, c) {
    return (b % c) === 0
  },
  "|=": function(b, c) {
    return b && (b == c || b.substr(0, c.length + 1) == c + "-")
  },
  "~=": function(b, c) {
    return b && (" " + b + " ").indexOf(" " + c + " ") != -1
  }
};
(Ext.cmd.derive("Ext.util.LruCache", Ext.util.HashMap, {
  config: {
    maxSize: null
  },
  add: function(a, e) {
    var d = this,
      c, b;
    d.removeAtKey(a);
    b = d.last;
    c = {
      prev: b,
      next: null,
      key: a,
      value: e
    };
    if (b) {
      b.next = c
    } else {
      d.first = c
    }
    d.last = c;
    Ext.util.HashMap.prototype.add.call(this, a, c);
    d.prune();
    return e
  },
  insertBefore: function(b, f, c) {
    var e = this,
      a, d;
    if (c = this.map[this.findKey(c)]) {
      a = e.findKey(f);
      if (a) {
        e.unlinkEntry(d = e.map[a])
      } else {
        d = {
          prev: c.prev,
          next: c,
          key: b,
          value: f
        }
      }
      if (c.prev) {
        d.prev.next = d
      } else {
        e.first = d
      }
      d.next = c;
      c.prev = d;
      e.prune();
      return f
    } else {
      return e.add(b, f)
    }
  },
  get: function(a) {
    var b = this.map[a];
    if (b) {
      if (b.next) {
        this.moveToEnd(b)
      }
      return b.value
    }
  },
  removeAtKey: function(a) {
    this.unlinkEntry(this.map[a]);
    return Ext.util.HashMap.prototype.removeAtKey.apply(this, arguments)
  },
  clear: function(a) {
    this.first = this.last = null;
    return Ext.util.HashMap.prototype.clear.call(this, a)
  },
  unlinkEntry: function(a) {
    if (a) {
      if (a.next) {
        a.next.prev = a.prev
      } else {
        this.last = a.prev
      }
      if (a.prev) {
        a.prev.next = a.next
      } else {
        this.first = a.next
      }
      a.prev = a.next = null
    }
  },
  moveToEnd: function(a) {
    this.unlinkEntry(a);
    if (a.prev = this.last) {
      this.last.next = a
    } else {
      this.first = a
    }
    this.last = a
  },
  getArray: function(c) {
    var a = [],
      b = this.first;
    while (b) {
      a.push(c ? b.key : b.value);
      b = b.next
    }
    return a
  },
  each: function(c, b, a) {
    var f = this,
      e = a ? f.last : f.first,
      d = f.length;
    b = b || f;
    while (e) {
      if (c.call(b, e.key, e.value, d) === false) {
        break
      }
      e = a ? e.prev : e.next
    }
    return f
  },
  findKey: function(b) {
    var a, c = this.map;
    for (a in c) {
      if (c.hasOwnProperty(a) && c[a].value === b) {
        return a
      }
    }
    return undefined
  },
  clone: function() {
    var a = new this.self(this.initialConfig),
      c = this.map,
      b;
    a.suspendEvents();
    for (b in c) {
      if (c.hasOwnProperty(b)) {
        a.add(b, c[b].value)
      }
    }
    a.resumeEvents();
    return a
  },
  prune: function() {
    var b = this,
      a = b.getMaxSize(),
      c = a ? (b.length - a) : 0;
    if (c > 0) {
      for (; b.first && c; c--) {
        b.removeAtKey(b.first.key)
      }
    }
  },
  destroy: function() {
    this.first = this.last = null;
    Ext.util.HashMap.prototype.destroy.call(this)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util, "LruCache"], 0));
(Ext.cmd.derive("Ext.ComponentQuery", Ext.Base, {
  singleton: true
}, 0, 0, 0, 0, 0, 0, [Ext, "ComponentQuery"], function() {
  var f = this,
    r = Ext.util.Operators,
    j = /(\d*)n\+?(\d*)/,
    e = /\D/,
    l = /^(\s)+/,
    k = /\\(.)/g,
    m = new Ext.util.LruCache({
      maxSize: 100
    }),
    n = ["var r = [],", "i = 0,", "it = items,", "l = it.length,", "c;",
      "for (; i < l; i++) {", "c = it[i];", "if (c.{0}) {", "r.push(c);",
      "}", "}", "return r;"
    ].join(""),
    o = function(t, s) {
      return s.method.apply(this, [t].concat(s.args))
    },
    a = function(u, y) {
      var s = [],
        v = 0,
        x = u.length,
        w, t = y !== ">";
      for (; v < x; v++) {
        w = u[v];
        if (w.getRefItems) {
          s = s.concat(w.getRefItems(t))
        }
      }
      return s
    },
    g = function(t) {
      var s = [],
        u = 0,
        w = t.length,
        v;
      for (; u < w; u++) {
        v = t[u];
        while (!!(v = v.getRefOwner())) {
          s.push(v)
        }
      }
      return s
    },
    d = function(t, y, x) {
      if (y === "*") {
        return t.slice()
      } else {
        var s = [],
          u = 0,
          w = t.length,
          v;
        for (; u < w; u++) {
          v = t[u];
          if (v.isXType(y, x)) {
            s.push(v)
          }
        }
        return s
      }
    },
    b = function(B, C, v, u) {
      var F = [],
        A = 0,
        t = B.length,
        E, x, D, s, z, y, w;
      if (C.charAt(0) === "@") {
        E = true;
        C = C.substr(1)
      }
      if (C.charAt(0) === "?") {
        E = true;
        x = true;
        C = C.substr(1)
      }
      for (; A < t; A++) {
        D = B[A];
        w = D.self.$config.configs[C];
        if (w) {
          s = D[w.names.get]()
        } else {
          if (E && !D.hasOwnProperty(C)) {
            continue
          } else {
            s = D[C]
          }
        }
        if (x) {
          F.push(D)
        } else {
          if (v === "~=") {
            if (s) {
              if (!Ext.isArray(s)) {
                s = s.split(" ")
              }
              for (z = 0, y = s.length; z < y; z++) {
                if (r[v](Ext.coerce(s[z], u), u)) {
                  F.push(D);
                  break
                }
              }
            }
          } else {
            if (v === "/=") {
              if (s != null && u.test(s)) {
                F.push(D)
              }
            } else {
              if (!u ? !!D[C] : r[v](Ext.coerce(s, u), u)) {
                F.push(D)
              }
            }
          }
        }
      }
      return F
    },
    h = function(t, x) {
      var s = [],
        u = 0,
        w = t.length,
        v;
      for (; u < w; u++) {
        v = t[u];
        if (v.getItemId() === x) {
          s.push(v)
        }
      }
      return s
    },
    q = function(s, t, u) {
      return f.pseudos[t](s, u)
    },
    i = /^(\s?([>\^])\s?|\s|$)/,
    p = /^(#)?((?:\\\.|[\w\-])+|\*)(?:\((true|false)\))?/,
    c = [{
      re: /^\.((?:\\\.|[\w\-])+)(?:\((true|false)\))?/,
      method: d,
      argTransform: function(s) {
        if (s[1] !== undefined) {
          s[1] = s[1].replace(k, "$1")
        }
        return s.slice(1)
      }
    }, {
      re: /^(?:\[((?:[@?$])?[\w\-]*)\s*(?:([\^$*~%!\/]?=)\s*(['"])?((?:\\\]|.)*?)\3)?(?!\\)\])/,
      method: b,
      argTransform: function(v) {
        var s = v[0],
          w = v[1],
          t = v[2],
          u = v[4],
          x;
        if (u !== undefined) {
          u = u.replace(k, "$1")
        }
        if (t === "/=") {
          x = m.get(u);
          if (x) {
            u = x
          } else {
            u = m.add(u, new RegExp(u))
          }
        }
        return [w, t, u]
      }
    }, {
      re: /^#((?:\\\.|[\w\-])+)/,
      method: h
    }, {
      re: /^\:([\w\-]+)(?:\(((?:\{[^\}]+\})|(?:(?!\{)[^\s>\/]*?(?!\})))\))?/,
      method: q,
      argTransform: function(s) {
        if (s[2] !== undefined) {
          s[2] = s[2].replace(k, "$1")
        }
        return s.slice(1)
      }
    }, {
      re: /^(?:\{([^\}]+)\})/,
      method: n
    }];
  f.Query = Ext.extend(Object, {
    constructor: function(s) {
      s = s || {};
      Ext.apply(this, s)
    },
    execute: function(u) {
      var v = this.operations,
        t = [],
        x, w, s;
      for (w = 0, s = v.length; w < s; w++) {
        x = v[w];
        t = t.concat(this._execute(u, x))
      }
      return t
    },
    _execute: function(t, v) {
      var w = 0,
        x = v.length,
        u, s;
      if (!t) {
        s = Ext.ComponentManager.getAll()
      } else {
        if (Ext.isIterable(t)) {
          s = t
        } else {
          if (t.isMixedCollection) {
            s = t.items
          }
        }
      }
      for (; w < x; w++) {
        u = v[w];
        if (u.mode === "^") {
          s = g(s || [t])
        } else {
          if (u.mode) {
            s = a(s || [t], u.mode)
          } else {
            s = o(s || a([t]), u)
          }
        }
        if (w === x - 1) {
          return s
        }
      }
      return []
    },
    is: function(v) {
      var u = this.operations,
        t = false,
        s = u.length,
        x, w;
      if (s === 0) {
        return true
      }
      for (w = 0; w < s; w++) {
        x = u[w];
        t = this._is(v, x);
        if (t) {
          return t
        }
      }
      return false
    },
    _is: function(A, s) {
      var y = s.length,
        t = [A],
        u, w, v, x, z, B;
      for (w = y - 1; w >= 0; --w) {
        u = s[w];
        x = u.mode;
        if (x) {
          if (x === "^") {
            t = a(t, " ")
          } else {
            if (x === ">") {
              z = [];
              for (v = 0, y = t.length; v < y; ++v) {
                B = t[v].getRefOwner();
                if (B) {
                  z.push(B)
                }
              }
              t = z
            } else {
              t = g(t)
            }
          }
          if (t.length === 0) {
            return false
          }
        } else {
          t = o(t, u);
          if (t.length === 0) {
            return false
          }
        }
      }
      return true
    },
    getMatches: function(v, t) {
      var s = t.length,
        u;
      for (u = 0; u < s; ++u) {
        v = o(v, t[u]);
        if (v.length === 0) {
          break
        }
      }
      return v
    },
    isMultiMatch: function() {
      return this.operations.length > 1
    }
  });
  Ext.apply(f, {
    cache: new Ext.util.LruCache({
      maxSize: 100
    }),
    pseudos: {
      not: function(y, s) {
        var w = 0,
          x = y.length,
          v = [],
          u = -1,
          t;
        for (; w < x; ++w) {
          t = y[w];
          if (!f.is(t, s)) {
            v[++u] = t
          }
        }
        return v
      },
      first: function(t) {
        var s = [];
        if (t.length > 0) {
          s.push(t[0])
        }
        return s
      },
      last: function(u) {
        var s = u.length,
          t = [];
        if (s > 0) {
          t.push(u[s - 1])
        }
        return t
      },
      focusable: function(t) {
        var s = t.length,
          v = [],
          u = 0,
          w;
        for (; u < s; u++) {
          w = t[u];
          if (w.isFocusable && w.isFocusable()) {
            v.push(w)
          }
        }
        return v
      },
      "nth-child": function(y, z) {
        var A = [],
          t = j.exec(z === "even" && "2n" || z === "odd" && "2n+1" ||
            !e.test(z) && "n+" + z || z),
          w = (t[1] || 1) - 0,
          x = t[2] - 0,
          v, s, u;
        for (v = 0; s = y[v]; v++) {
          u = v + 1;
          if (w === 1) {
            if (x === 0 || u === x) {
              A.push(s)
            }
          } else {
            if ((u + x) % w === 0) {
              A.push(s)
            }
          }
        }
        return A
      },
      scrollable: function(t) {
        var s = t.length,
          v = [],
          u = 0,
          w;
        for (; u < s; u++) {
          w = t[u];
          if (w.scrollable || w._scrollable) {
            v.push(w)
          }
        }
        return v
      }
    },
    query: function(s, z) {
      if (!s) {
        return Ext.ComponentManager.all.getArray()
      }
      var u = [],
        A = [],
        x = {},
        w = f.cache.get(s),
        v, y, t;
      if (!w) {
        w = f.cache.add(s, f.parse(s))
      }
      u = w.execute(z);
      if (w.isMultiMatch()) {
        v = u.length;
        for (t = 0; t < v; t++) {
          y = u[t];
          if (!x[y.id]) {
            A.push(y);
            x[y.id] = true
          }
        }
        u = A
      }
      return u
    },
    visitPreOrder: function(s, u, w, v, t) {
      f._visit(true, s, u, w, v, t)
    },
    visitPostOrder: function(s, u, w, v, t) {
      f._visit(false, s, u, w, v, t)
    },
    _visit: function(C, t, B, A, D, x) {
      var z = f.cache.get(t),
        w = [B],
        s, y = 0,
        v, u;
      if (!z) {
        z = f.cache.add(t, f.parse(t))
      }
      u = z.is(B);
      if (B.getRefItems) {
        s = B.getRefItems();
        y = s.length
      }
      if (x) {
        Ext.Array.push(w, x)
      }
      if (C) {
        if (u) {
          if (A.apply(D || B, w) === false) {
            return false
          }
        }
      }
      for (v = 0; v < y; v++) {
        if (f._visit.call(f, C, t, s[v], A, D, x) === false) {
          return false
        }
      }
      if (!C) {
        if (u) {
          if (A.apply(D || B, w) === false) {
            return false
          }
        }
      }
    },
    is: function(t, s) {
      if (!s) {
        return true
      }
      var u = f.cache.get(s);
      if (!u) {
        u = f.cache.add(s, f.parse(s))
      }
      return u.is(t)
    },
    parse: function(t) {
      var u = [],
        w, x, v, s;
      w = Ext.splitAndUnescape(t, ",");
      for (v = 0, s = w.length; v < s; v++) {
        x = Ext.String.trim(w[v]);
        u.push(f._parse(x))
      }
      return new f.Query({
        operations: u
      })
    },
    _parse: function(y) {
      var t = [],
        w = Ext.String.trim,
        u = c.length,
        D, z, x, E, F, G, v, A, B, s, C;
      while (y && D !== y) {
        D = y;
        z = y.match(p);
        if (z) {
          E = z[1];
          x = w(z[2]).replace(k, "$1");
          if (E === "#") {
            t.push({
              method: h,
              args: [x]
            })
          } else {
            t.push({
              method: d,
              args: [x, Boolean(z[3])]
            })
          }
          y = y.replace(z[0], "").replace(l, "$1")
        }
        while (!(F = y.match(i))) {
          for (A = 0; y && A < u; A++) {
            B = c[A];
            G = y.match(B.re);
            s = B.method;
            v = B.argTransform;
            if (G) {
              if (v) {
                C = v(G)
              } else {
                C = G.slice(1)
              }
              t.push({
                method: Ext.isString(B.method) ? Ext.functionFactory(
                  "items", Ext.String.format.apply(Ext.String, [
                    s
                  ].concat(G.slice(1)))) : B.method,
                args: C
              });
              y = y.replace(G[0], "").replace(l, "$1");
              break
            }
            if (A === (u - 1)) {
              Ext.raise('Invalid ComponentQuery selector: "' +
                arguments[0] + '"')
            }
          }
        }
        if (F[1]) {
          t.push({
            mode: F[2] || F[1]
          });
          y = y.replace(F[0], "").replace(l, "")
        }
      }
      return t
    }
  });
  Ext.all = function() {
    return f.query.apply(f, arguments)
  };
  Ext.first = function() {
    var s = f.query.apply(f, arguments);
    return (s && s[0]) || null
  }
}));
(Ext.cmd.derive("Ext.Evented", Ext.Base, {
  alternateClassName: "Ext.EventedBase",
  initialized: false,
  constructor: function(a) {
    this.mixins.observable.constructor.call(this, a);
    this.initialized = true
  },
  onClassExtended: function(b, e) {
    if (!e.hasOwnProperty("eventedConfig")) {
      return
    }
    var d = e.config,
      f = e.eventedConfig,
      c, a;
    if (d) {
      Ext.applyIf(d, f)
    } else {
      b.addConfig(f)
    }
    for (c in f) {
      if (f.hasOwnProperty(c)) {
        a = Ext.Config.get(c);
        e[a.names.set] = a.eventedSetter || a.getEventedSetter()
      }
    }
  }
}, 1, 0, 0, 0, 0, [
  [Ext.mixin.Observable.prototype.mixinId || Ext.mixin.Observable.$className,
    Ext.mixin.Observable
  ]
], [Ext, "Evented", Ext, "EventedBase"], 0));
(Ext.cmd.derive("Ext.util.Positionable", Ext.Base, {
  mixinId: "positionable",
  _positionTopLeft: ["position", "top", "left"],
  _alignRe: /^([a-z]+)-([a-z]+)(\?)?$/,
  afterSetPosition: Ext.emptyFn,
  adjustForConstraints: function(c, b) {
    var a = this.getConstrainVector(b, c);
    if (a) {
      c[0] += a[0];
      c[1] += a[1]
    }
    return c
  },
  alignTo: function(c, a, f, b) {
    var e = this,
      d = e.el;
    return e.setXY(e.getAlignToXY(c, a, f), d.anim && !!b ? d.anim(b) :
      false)
  },
  calculateAnchorXY: function(f, h, g, d) {
    var i = this,
      c = i.el,
      j = document,
      e = (c.dom === j.body || c.dom === j),
      k = Math.round,
      l, b, a;
    f = (f || "tl").toLowerCase();
    d = d || {};
    b = d.width || (e ? Ext.Element.getViewportWidth() : i.getWidth());
    a = d.height || (e ? Ext.Element.getViewportHeight() : i.getHeight());
    switch (f) {
      case "tl":
        l = [0, 0];
        break;
      case "bl":
        l = [0, a];
        break;
      case "tr":
        l = [b, 0];
        break;
      case "c":
        l = [k(b * 0.5), k(a * 0.5)];
        break;
      case "t":
        l = [k(b * 0.5), 0];
        break;
      case "l":
        l = [0, k(a * 0.5)];
        break;
      case "r":
        l = [b, k(a * 0.5)];
        break;
      case "b":
        l = [k(b * 0.5), a];
        break;
      case "tc":
        l = [k(b * 0.5), 0];
        break;
      case "bc":
        l = [k(b * 0.5), a];
        break;
      case "br":
        l = [b, a]
    }
    return [l[0] + h, l[1] + g]
  },
  convertPositionSpec: Ext.identityFn,
  getAlignToXY: function(i, v, e) {
    var w = this,
      d, u, a, g, q, f, r, s, o, p, t, n, m, b, c, h, k, l, j;
    i = Ext.get(i.el || i);
    if (!i || !i.dom) {}
    e = e || [0, 0];
    v = (!v || v === "?" ? "tl-bl?" : (!(/-/).test(v) && v !== "" ? "tl-" +
      v : v || "tl-bl")).toLowerCase();
    v = w.convertPositionSpec(v);
    a = v.match(w._alignRe);
    n = a[1];
    m = a[2];
    t = !!a[3];
    g = w.getAnchorXY(n, true);
    q = w.getAnchorToXY(i, m, false);
    l = q[0] - g[0] + e[0];
    j = q[1] - g[1] + e[1];
    if (t) {
      d = w.constrainTo || w.container || w.el.parent();
      d = Ext.get(d.el || d);
      u = d.getConstrainRegion();
      u.right = u.left + d.el.dom.clientWidth;
      f = w.getWidth();
      r = w.getHeight();
      s = i.getRegion();
      b = n.charAt(0);
      c = n.charAt(n.length - 1);
      h = m.charAt(0);
      k = m.charAt(m.length - 1);
      o = (l < s.right && l + f >= s.left) && ((b == "t" && h == "b") ||
        (b == "b" && h == "t"));
      p = (j < s.bottom && j + r >= s.top) && ((c == "r" && k == "l") ||
        (c == "l" && k == "r"));
      if (l + f > u.right) {
        if (p) {
          l = s.left - f;
          p = false
        } else {
          l = u.right - f
        }
      }
      if (l < u.left) {
        l = p ? s.right : u.left
      }
      if (j + r > u.bottom) {
        if (o) {
          j = s.top - r;
          o = false
        } else {
          j = u.bottom - r
        }
      }
      if (j < u.top) {
        j = o ? s.bottom : u.top
      }
    }
    return [l, j]
  },
  getAnchorXY: function(d, h, b) {
    var g = this,
      i = g.getXY(),
      a = g.el,
      k = document,
      c = a.dom == k.body || a.dom == k,
      j = a.getScroll(),
      f = c ? j.left : h ? 0 : i[0],
      e = c ? j.top : h ? 0 : i[1];
    return g.calculateAnchorXY(d, f, e, b)
  },
  getBox: function(d, g) {
    var e = this,
      l = g ? e.getLocalXY() : e.getXY(),
      i = l[0],
      f = l[1],
      j = e.getWidth(),
      b = e.getHeight(),
      c, a, k;
    if (d) {
      c = e.getBorderPadding();
      a = c.beforeX;
      k = c.beforeY;
      i += a;
      f += k;
      j -= (a + c.afterX);
      b -= (k + c.afterY)
    }
    return {
      x: i,
      left: i,
      0: i,
      y: f,
      top: f,
      1: f,
      width: j,
      height: b,
      right: i + j,
      bottom: f + b
    }
  },
  calculateConstrainedPosition: function(g, b, k, d) {
    var j = this,
      c, h = j.floatParent,
      e = h ? h.getTargetEl() : null,
      a, f, i, m = false,
      l;
    if (k && h) {
      a = e.getXY();
      f = e.getBorderPadding();
      a[0] += f.beforeX;
      a[1] += f.beforeY;
      if (b) {
        i = [b[0] + a[0], b[1] + a[1]]
      }
    } else {
      i = b
    }
    g = g || j.constrainTo || e || j.container || j.el.parent();
    if (k && i) {
      i = j.reverseTranslateXY(i)
    }
    c = ((j.constrainHeader && j.header.rendered) ? j.header : j).getConstrainVector(
      g, i, d);
    if (c) {
      m = b || j.getPosition(k);
      m[0] += c[0];
      m[1] += c[1]
    }
    return m
  },
  getConstrainRegion: function() {
    var g = this,
      c = g.el,
      a = c.dom.nodeName === "BODY",
      e = c.dom,
      f = c.getBorders(),
      h = c.getXY(),
      d = h[0] + f.beforeX,
      i = h[1] + f.beforeY,
      j, b, k;
    if (a) {
      j = c.getScroll();
      d = j.left;
      i = j.top;
      b = Ext.Element.getViewportWidth();
      k = Ext.Element.getViewportHeight()
    } else {
      b = e.clientWidth;
      k = e.clientHeight
    }
    return new Ext.util.Region(i, d + b, i + k, d)
  },
  getConstrainVector: function(g, c, e) {
    var a = this.getRegion(),
      d = [0, 0],
      b = (this.shadow && this.constrainShadow && !this.shadowDisabled) ?
      this.shadow.getShadowSize() : undefined,
      i = false,
      h, f = this.constraintInsets;
    if (!(g instanceof Ext.util.Region)) {
      g = Ext.get(g.el || g);
      h = g.getViewSize();
      g = g.getConstrainRegion();
      g.right = g.left + h.width;
      g.bottom = g.top + h.height
    }
    if (f) {
      f = Ext.isObject(f) ? f : Ext.Element.parseBox(f);
      g.adjust(f.top, f.right, f.bottom, f.length)
    }
    if (c) {
      a.translateBy(c[0] - a.x, c[1] - a.y)
    }
    if (e) {
      a.right = a.left + e[0];
      a.bottom = a.top + e[1]
    }
    if (b) {
      g.adjust(b[0], -b[1], -b[2], b[3])
    }
    if (a.right > g.right) {
      i = true;
      d[0] = (g.right - a.right)
    }
    if (a.left + d[0] < g.left) {
      i = true;
      d[0] = (g.left - a.left)
    }
    if (a.bottom > g.bottom) {
      i = true;
      d[1] = (g.bottom - a.bottom)
    }
    if (a.top + d[1] < g.top) {
      i = true;
      d[1] = (g.top - a.top)
    }
    return i ? d : false
  },
  getOffsetsTo: function(a) {
    var c = this.getXY(),
      b = Ext.fly(a.el || a).getXY();
    return [c[0] - b[0], c[1] - b[1]]
  },
  getRegion: function() {
    var a = this.getBox();
    return new Ext.util.Region(a.top, a.right, a.bottom, a.left)
  },
  getViewRegion: function() {
    var f = this,
      c = f.el,
      a = c.dom.nodeName === "BODY",
      e, i, g, h, d, b, j;
    if (a) {
      i = c.getScroll();
      d = i.left;
      h = i.top;
      b = Ext.Element.getViewportWidth();
      j = Ext.Element.getViewportHeight()
    } else {
      e = f.getBorderPadding();
      g = f.getXY();
      d = g[0] + e.beforeX;
      h = g[1] + e.beforeY;
      b = f.getWidth(true);
      j = f.getHeight(true)
    }
    return new Ext.util.Region(h, d + b, h + j, d)
  },
  move: function(i, b, c) {
    var f = this,
      l = f.getXY(),
      j = l[0],
      h = l[1],
      d = [j - b, h],
      k = [j + b, h],
      g = [j, h - b],
      a = [j, h + b],
      e = {
        l: d,
        left: d,
        r: k,
        right: k,
        t: g,
        top: g,
        up: g,
        b: a,
        bottom: a,
        down: a
      };
    i = i.toLowerCase();
    f.setXY([e[i][0], e[i][1]], c)
  },
  setBox: function(c) {
    var b = this,
      a, d;
    if (c.isRegion) {
      c = {
        x: c.left,
        y: c.top,
        width: c.right - c.left,
        height: c.bottom - c.top
      }
    }
    b.constrainBox(c);
    a = c.x;
    d = c.y;
    b.setXY([a, d]);
    b.setSize(c.width, c.height);
    b.afterSetPosition(a, d);
    return b
  },
  constrainBox: function(d) {
    var c = this,
      b, a, e;
    if (c.constrain || c.constrainHeader) {
      a = ("x" in d) ? d.x : d.left;
      e = ("y" in d) ? d.y : d.top;
      b = c.calculateConstrainedPosition(null, [a, e], false, [d.width, d
        .height
      ]);
      if (b) {
        d.x = b[0];
        d.y = b[1]
      }
    }
  },
  translatePoints: function(a, c) {
    var b = this.translateXY(a, c);
    return {
      left: b.x,
      top: b.y
    }
  },
  translateXY: function(g, e) {
    var d = this,
      b = d.el,
      h = b.getStyle(d._positionTopLeft),
      a = h.position === "relative",
      c = parseFloat(h.left),
      f = parseFloat(h.top),
      i = d.getXY();
    if (Ext.isArray(g)) {
      e = g[1];
      g = g[0]
    }
    if (isNaN(c)) {
      c = a ? 0 : b.dom.offsetLeft
    }
    if (isNaN(f)) {
      f = a ? 0 : b.dom.offsetTop
    }
    c = (typeof g === "number") ? g - i[0] + c : undefined;
    f = (typeof e === "number") ? e - i[1] + f : undefined;
    return {
      x: c,
      y: f
    }
  },
  reverseTranslateXY: function(j) {
    var h = j,
      c = this.el,
      i = [],
      d = c.dom,
      b = d.offsetParent,
      a, e, g, f;
    if (b) {
      a = c.isStyle("position", "relative"), e = Ext.fly(b).getXY(), g =
        j[0] + e[0] + b.clientLeft;
      f = j[1] + e[1] + b.clientTop;
      if (a) {
        g += c.getPadding("l");
        f += c.getPadding("t")
      }
      h = [g, f]
    }
    return h
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util, "Positionable"], 0));
Ext.define("Ext.overrides.util.Positionable", {
  override: "Ext.util.Positionable",
  anchorTo: function(g, e, b, a, i, j) {
    var f = this,
      h = !Ext.isEmpty(i),
      c = function() {
        f.alignTo(g, e, b, a);
        Ext.callback(j, f)
      },
      d = f.getAnchor();
    f.removeAnchor();
    Ext.apply(d, {
      fn: c,
      scroll: h
    });
    Ext.on("resize", c, null);
    if (h) {
      Ext.getWin().on("scroll", c, null, {
        buffer: !isNaN(i) ? i : 50
      })
    }
    c();
    return f
  },
  getAnchor: function() {
    var b = this.el,
      c, a;
    if (!b.dom) {
      return
    }
    c = b.getData();
    a = c._anchor;
    if (!a) {
      a = c._anchor = {}
    }
    return a
  },
  removeAnchor: function() {
    var a = this.getAnchor();
    if (a && a.fn) {
      Ext.un("resize", a.fn);
      if (a.scroll) {
        Ext.getWin().on("scroll", a.fn)
      }
      delete a.fn
    }
    return this
  },
  setBox: function(c, a) {
    var b = this;
    if (c.isRegion) {
      c = {
        x: c.left,
        y: c.top,
        width: c.right - c.left,
        height: c.bottom - c.top
      }
    }
    if (a) {
      b.constrainBox(c);
      b.animate(Ext.applyIf({
        to: c,
        listeners: {
          afteranimate: Ext.Function.bind(b.afterSetPosition, b, [c
            .x, c.y
          ])
        }
      }, a))
    } else {
      arguments.callee.$previous.call(this, c)
    }
    return b
  }
});
(Ext.cmd.derive("Ext.dom.UnderlayPool", Ext.Base, {
  constructor: function(a) {
    this.elementConfig = a;
    this.cache = []
  },
  checkOut: function() {
    var a = this.cache.shift();
    if (!a) {
      a = Ext.Element.create(this.elementConfig);
      a.setVisibilityMode(2)
    }
    return a
  },
  checkIn: function(a) {
    this.cache.push(a)
  },
  reset: function() {
    var a = this.cache,
      b = a.length;
    while (b--) {
      a[b].destroy()
    }
    this.cache = []
  }
}, 1, 0, 0, 0, 0, 0, [Ext.dom, "UnderlayPool"], 0));
(Ext.cmd.derive("Ext.dom.Underlay", Ext.Base, {
  constructor: function(a) {
    Ext.apply(this, a)
  },
  beforeShow: Ext.emptyFn,
  getInsertionTarget: function() {
    return this.target
  },
  getPool: function() {
    return this.pool || (this.self.prototype.pool = new Ext.dom.UnderlayPool(
      this.elementConfig))
  },
  hide: function() {
    var b = this,
      a = b.el;
    if (a) {
      a.hide();
      b.getPool().checkIn(a);
      b.el = null;
      b.hidden = true
    }
  },
  realign: function(h, g, a, i) {
    var e = this,
      b = e.el,
      d = e.target,
      c = e.offsets,
      f = Math.max;
    if (b) {
      if (h == null) {
        h = d.getX()
      }
      if (g == null) {
        g = d.getY()
      }
      if (a == null) {
        a = d.getWidth()
      }
      if (i == null) {
        i = d.getHeight()
      }
      if (c) {
        h = h + c.x;
        g = g + c.y;
        a = f(a + c.w, 0);
        i = f(i + c.h, 0)
      }
      b.setXY([h, g]);
      b.setSize(a, i)
    }
  },
  setZIndex: function(a) {
    this.zIndex = a;
    if (this.el) {
      this.el.setStyle("z-index", a)
    }
  },
  show: function() {
    var b = this,
      d = b.target,
      f = b.zIndex,
      a = b.el,
      c = b.getInsertionTarget().dom,
      e;
    if (!a) {
      a = b.el = b.getPool().checkOut()
    }
    b.beforeShow();
    if (f == null) {
      f = (parseInt(d.getStyle("z-index"), 10))
    }
    if (f) {
      a.setStyle("z-index", f)
    }
    a.setStyle("position", b.fixed ? "fixed" : "");
    e = a.dom;
    if (e.nextSibling !== c) {
      d.dom.parentNode.insertBefore(e, c)
    }
    a.show();
    b.realign();
    b.hidden = false
  }
}, 1, 0, 0, 0, 0, 0, [Ext.dom, "Underlay"], 0));
(Ext.cmd.derive("Ext.dom.Shadow", Ext.dom.Underlay, {
  alternateClassName: "Ext.Shadow",
  mode: "drop",
  offset: 4,
  cls: "x-" + (!Ext.supports.CSS3BoxShadow ? "ie" : "css") + "-shadow",
  constructor: function(b) {
    var d = this,
      e, c, f, a;
    Ext.dom.Underlay.prototype.constructor.call(this, b);
    d.elementConfig = {
      cls: d.cls,
      role: "presentation"
    };
    f = d.offset;
    a = Math.floor(f / 2);
    d.opacity = 50;
    switch (d.mode.toLowerCase()) {
      case "drop":
        e = {
          x: 0,
          y: 0,
          w: f,
          h: f
        };
        if (Ext.supports.CSS3BoxShadow) {
          c = {
            x: f,
            y: f,
            h: -f,
            w: -f
          }
        } else {
          c = {
            x: -a,
            y: -a,
            h: -a,
            w: -a
          }
        }
        break;
      case "sides":
        e = {
          x: -f,
          y: 0,
          w: f * 2,
          h: f
        };
        if (Ext.supports.CSS3BoxShadow) {
          c = {
            x: 0,
            y: f,
            h: -f,
            w: 0
          }
        } else {
          c = {
            x: 1 + a - 2 * f,
            y: -(1 + a),
            h: -1,
            w: a - 1
          }
        }
        break;
      case "frame":
        e = {
          x: -f,
          y: -f,
          w: f * 2,
          h: f * 2
        };
        if (Ext.supports.CSS3BoxShadow) {
          c = {
            x: 0,
            y: 0,
            h: 0,
            w: 0
          }
        } else {
          c = {
            x: 1 + a - 2 * f,
            y: 1 + a - 2 * f,
            h: f - a - 1,
            w: f - a - 1
          }
        }
        break;
      case "bottom":
        e = {
          x: -f,
          y: 0,
          w: f * 2,
          h: f
        };
        if (Ext.supports.CSS3BoxShadow) {
          c = {
            x: 0,
            y: f,
            h: -f,
            w: 0
          }
        } else {
          c = {
            x: 0,
            y: f,
            h: 0,
            w: 0
          }
        }
        break
    }
    d.offsets = c;
    d.outerOffsets = e
  },
  getShadowSize: function() {
    var b = this,
      d = b.el ? b.offset : 0,
      a = [d, d, d, d],
      c = b.mode.toLowerCase();
    if (b.el && c !== "frame") {
      a[0] = 0;
      if (c == "drop") {
        a[3] = 0
      }
    }
    return a
  },
  boxShadowProperty: (function() {
    var b = "boxShadow",
      a = document.documentElement.style;
    if (!("boxShadow" in a)) {
      if ("WebkitBoxShadow" in a) {
        b = "WebkitBoxShadow"
      } else {
        if ("MozBoxShadow" in a) {
          b = "MozBoxShadow"
        }
      }
    }
    return b
  }()),
  beforeShow: function() {
    var b = this,
      a = b.el.dom.style,
      c = b.shim;
    if (Ext.supports.CSS3BoxShadow) {
      a[b.boxShadowProperty] = "0 0 " + (b.offset + 2) + "px #888"
    } else {
      a.filter = "progid:DXImageTransform.Microsoft.alpha(opacity=" + b.opacity +
        ") progid:DXImageTransform.Microsoft.Blur(pixelradius=" + (b.offset) +
        ")"
    }
    if (c) {
      c.realign()
    }
  },
  setOpacity: function(a) {
    var b = this.el;
    if (b) {
      if (Ext.isIE && !Ext.supports.CSS3BoxShadow) {
        a = Math.floor(a * 100 / 2) / 100
      }
      this.opacity = a;
      b.setOpacity(a)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.dom, "Shadow", Ext, "Shadow"], 0));
(Ext.cmd.derive("Ext.dom.Shim", Ext.dom.Underlay, {
  cls: "x-shim",
  constructor: function(a) {
    Ext.dom.Underlay.prototype.constructor.call(this, a);
    this.elementConfig = {
      tag: "iframe",
      cls: this.cls,
      role: "presentation",
      frameBorder: "0",
      src: Ext.SSL_SECURE_URL,
      tabindex: "-1"
    }
  },
  getInsertionTarget: function() {
    var a = this.shadow;
    return (a && a.el) || this.target
  }
}, 1, 0, 0, 0, 0, 0, [Ext.dom, "Shim"], 0));
(Ext.cmd.derive("Ext.dom.ElementEvent", Ext.util.Event, {
  addListener: function(g, j, k, c, e) {
    var f = this,
      h = false,
      a = f.name,
      b, d, i;
    k = k || {};
    if (k.delegated === false || Ext.event.publisher.Dom.instance.directEvents[
        a]) {
      if (k.capture) {
        i = f.directCaptures || (f.directCaptures = new Ext.util.Event(f.observable,
          a));
        h = i.addListener(g, j, k, c, e)
      } else {
        d = f.directs || (f.directs = new Ext.util.Event(f.observable, a));
        h = d.addListener(g, j, k, c, e)
      }
    } else {
      if (k.capture) {
        b = f.captures || (f.captures = new Ext.util.Event(f.observable,
          a));
        h = b.addListener(g, j, k, c, e)
      } else {
        h = Ext.util.Event.prototype.addListener.call(this, g, j, k, c, e)
      }
    }
    return h
  },
  removeListener: function(e, d) {
    var f = this,
      a = f.captures,
      c = f.directs,
      g = f.directCaptures,
      h = false,
      b = f.findListener(e, d);
    if (b !== -1) {
      h = Ext.util.Event.prototype.removeListener.call(this, e, d, b)
    } else {
      if (c) {
        b = c.findListener(e, d)
      }
      if (b !== -1) {
        h = c.removeListener(e, d, b)
      } else {
        if (a) {
          b = a.findListener(e, d)
        }
        if (b !== -1) {
          h = a.removeListener(e, d, b)
        } else {
          if (g) {
            b = g.findListener(e, d);
            if (b !== -1) {
              h = g.removeListener(e, d, b)
            }
          }
        }
      }
    }
    return h
  },
  clearListeners: function() {
    var c = this,
      d = c.directCaptures,
      b = c.directs,
      a = c.captures;
    if (d) {
      d.clearListeners()
    }
    if (b) {
      b.clearListeners()
    }
    if (a) {
      a.clearListeners()
    }
    Ext.util.Event.prototype.clearListeners.call(this)
  },
  suspend: function() {
    var c = this,
      d = c.directCaptures,
      b = c.directs,
      a = c.captures;
    if (d) {
      d.suspend()
    }
    if (b) {
      b.suspend()
    }
    if (a) {
      a.suspend()
    }
    Ext.util.Event.prototype.suspend.call(this)
  },
  resume: function() {
    var c = this,
      d = c.directCaptures,
      b = c.directs,
      a = c.captures;
    if (d) {
      d.resume()
    }
    if (b) {
      b.resume()
    }
    if (a) {
      a.resume()
    }
    Ext.util.Event.prototype.resume.call(this)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.dom, "ElementEvent"], 0));
(Ext.cmd.derive("Ext.event.publisher.Publisher", Ext.Base, {
  handledEvents: [],
  statics: {
    publishers: {},
    publishersByEvent: {}
  },
  constructor: function() {
    var b = this,
      a = b.type;
    b.handles = {};
    b.registerEvents();
    Ext.event.publisher.Publisher.publishers[a] = b
  },
  registerEvents: function(e) {
    var g = this,
      d = Ext.event.publisher.Publisher.publishersByEvent,
      b = e || g.handledEvents,
      f = b.length,
      a, c;
    for (c = 0; c < f; c++) {
      a = b[c];
      g.handles[a] = 1;
      d[a] = g
    }
  },
  fire: function(c, a, b) {
    var d;
    if (c.hasListeners[a]) {
      d = c.events[a];
      if (d) {
        d.fire.apply(d, b)
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.event.publisher, "Publisher"], 0));
(Ext.cmd.derive("Ext.util.Offset", Ext.Base, {
  statics: {
    fromObject: function(a) {
      return new this(a.x, a.y)
    }
  },
  constructor: function(a, b) {
    this.x = (a != null && !isNaN(a)) ? a : 0;
    this.y = (b != null && !isNaN(b)) ? b : 0;
    return this
  },
  copy: function() {
    return new Ext.util.Offset(this.x, this.y)
  },
  copyFrom: function(a) {
    this.x = a.x;
    this.y = a.y
  },
  toString: function() {
    return "Offset[" + this.x + "," + this.y + "]"
  },
  equals: function(a) {
    return (this.x == a.x && this.y == a.y)
  },
  round: function(b) {
    if (!isNaN(b)) {
      var a = Math.pow(10, b);
      this.x = Math.round(this.x * a) / a;
      this.y = Math.round(this.y * a) / a
    } else {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y)
    }
  },
  isZero: function() {
    return this.x == 0 && this.y == 0
  }
}, 3, 0, 0, 0, 0, 0, [Ext.util, "Offset"], 0));
(Ext.cmd.derive("Ext.util.Region", Ext.Base, {
  isRegion: true,
  statics: {
    getRegion: function(a) {
      return Ext.fly(a).getRegion()
    },
    from: function(a) {
      return new this(a.top, a.right, a.bottom, a.left)
    }
  },
  constructor: function(d, f, a, c) {
    var e = this;
    e.y = e.top = e[1] = d;
    e.right = f;
    e.bottom = a;
    e.x = e.left = e[0] = c
  },
  contains: function(b) {
    var a = this;
    return (b.x >= a.x && b.right <= a.right && b.y >= a.y && b.bottom <=
      a.bottom)
  },
  intersect: function(g) {
    var f = this,
      d = Math.max(f.y, g.y),
      e = Math.min(f.right, g.right),
      a = Math.min(f.bottom, g.bottom),
      c = Math.max(f.x, g.x);
    if (a > d && e > c) {
      return new this.self(d, e, a, c)
    } else {
      return false
    }
  },
  union: function(g) {
    var f = this,
      d = Math.min(f.y, g.y),
      e = Math.max(f.right, g.right),
      a = Math.max(f.bottom, g.bottom),
      c = Math.min(f.x, g.x);
    return new this.self(d, e, a, c)
  },
  constrainTo: function(b) {
    var a = this,
      c = Ext.Number.constrain;
    a.top = a.y = c(a.top, b.y, b.bottom);
    a.bottom = c(a.bottom, b.y, b.bottom);
    a.left = a.x = c(a.left, b.x, b.right);
    a.right = c(a.right, b.x, b.right);
    return a
  },
  adjust: function(d, f, a, c) {
    var e = this;
    e.top = e.y += d;
    e.left = e.x += c;
    e.right += f;
    e.bottom += a;
    return e
  },
  getOutOfBoundOffset: function(a, b) {
    if (!Ext.isObject(a)) {
      if (a == "x") {
        return this.getOutOfBoundOffsetX(b)
      } else {
        return this.getOutOfBoundOffsetY(b)
      }
    } else {
      b = a;
      var c = new Ext.util.Offset();
      c.x = this.getOutOfBoundOffsetX(b.x);
      c.y = this.getOutOfBoundOffsetY(b.y);
      return c
    }
  },
  getOutOfBoundOffsetX: function(a) {
    if (a <= this.x) {
      return this.x - a
    } else {
      if (a >= this.right) {
        return this.right - a
      }
    }
    return 0
  },
  getOutOfBoundOffsetY: function(a) {
    if (a <= this.y) {
      return this.y - a
    } else {
      if (a >= this.bottom) {
        return this.bottom - a
      }
    }
    return 0
  },
  isOutOfBound: function(a, b) {
    if (!Ext.isObject(a)) {
      if (a == "x") {
        return this.isOutOfBoundX(b)
      } else {
        return this.isOutOfBoundY(b)
      }
    } else {
      b = a;
      return (this.isOutOfBoundX(b.x) || this.isOutOfBoundY(b.y))
    }
  },
  isOutOfBoundX: function(a) {
    return (a < this.x || a > this.right)
  },
  isOutOfBoundY: function(a) {
    return (a < this.y || a > this.bottom)
  },
  restrict: function(b, d, a) {
    if (Ext.isObject(b)) {
      var c;
      a = d;
      d = b;
      if (d.copy) {
        c = d.copy()
      } else {
        c = {
          x: d.x,
          y: d.y
        }
      }
      c.x = this.restrictX(d.x, a);
      c.y = this.restrictY(d.y, a);
      return c
    } else {
      if (b == "x") {
        return this.restrictX(d, a)
      } else {
        return this.restrictY(d, a)
      }
    }
  },
  restrictX: function(b, a) {
    if (!a) {
      a = 1
    }
    if (b <= this.x) {
      b -= (b - this.x) * a
    } else {
      if (b >= this.right) {
        b -= (b - this.right) * a
      }
    }
    return b
  },
  restrictY: function(b, a) {
    if (!a) {
      a = 1
    }
    if (b <= this.y) {
      b -= (b - this.y) * a
    } else {
      if (b >= this.bottom) {
        b -= (b - this.bottom) * a
      }
    }
    return b
  },
  getSize: function() {
    return {
      width: this.right - this.x,
      height: this.bottom - this.y
    }
  },
  copy: function() {
    return new this.self(this.y, this.right, this.bottom, this.x)
  },
  copyFrom: function(b) {
    var a = this;
    a.top = a.y = a[1] = b.y;
    a.right = b.right;
    a.bottom = b.bottom;
    a.left = a.x = a[0] = b.x;
    return this
  },
  toString: function() {
    return "Region[" + this.top + "," + this.right + "," + this.bottom +
      "," + this.left + "]"
  },
  translateBy: function(a, c) {
    if (arguments.length == 1) {
      c = a.y;
      a = a.x
    }
    var b = this;
    b.top = b.y += c;
    b.right += a;
    b.bottom += c;
    b.left = b.x += a;
    return b
  },
  round: function() {
    var a = this;
    a.top = a.y = Math.round(a.y);
    a.right = Math.round(a.right);
    a.bottom = Math.round(a.bottom);
    a.left = a.x = Math.round(a.x);
    return a
  },
  equals: function(a) {
    return (this.top === a.top && this.right === a.right && this.bottom ===
      a.bottom && this.left === a.left)
  }
}, 3, 0, 0, 0, 0, 0, [Ext.util, "Region"], 0));
(Ext.cmd.derive("Ext.util.Point", Ext.util.Region, {
  radianToDegreeConstant: 180 / Math.PI,
  origin: {
    x: 0,
    y: 0
  },
  statics: {
    fromEvent: function(b) {
      var a = b.changedTouches,
        c = (a && a.length > 0) ? a[0] : b;
      return this.fromTouch(c)
    },
    fromTouch: function(a) {
      return new this(a.pageX, a.pageY)
    },
    from: function(a) {
      if (!a) {
        return new this(0, 0)
      }
      if (!(a instanceof this)) {
        return new this(a.x, a.y)
      }
      return a
    }
  },
  constructor: function(a, b) {
    if (a == null) {
      a = 0
    }
    if (b == null) {
      b = 0
    }
    Ext.util.Region.prototype.constructor.call(this, b, a, b, a)
  },
  clone: function() {
    return new this.self(this.x, this.y)
  },
  copy: function() {
    return this.clone.apply(this, arguments)
  },
  copyFrom: function(a) {
    this.x = a.x;
    this.y = a.y;
    return this
  },
  toString: function() {
    return "Point[" + this.x + "," + this.y + "]"
  },
  equals: function(a) {
    return (this.x === a.x && this.y === a.y)
  },
  isCloseTo: function(c, b) {
    if (typeof b == "number") {
      return this.getDistanceTo(c) <= b
    }
    var a = c.x,
      f = c.y,
      e = b.x,
      d = b.y;
    return (this.x <= a + e && this.x >= a - e && this.y <= f + d && this
      .y >= f - d)
  },
  isWithin: function() {
    return this.isCloseTo.apply(this, arguments)
  },
  isContainedBy: function(a) {
    if (!(a instanceof Ext.util.Region)) {
      a = Ext.get(a.el || a).getRegion()
    }
    return a.contains(this)
  },
  roundedEquals: function(a) {
    if (!a || typeof a !== "object") {
      a = this.origin
    }
    return (Math.round(this.x) === Math.round(a.x) && Math.round(this.y) ===
      Math.round(a.y))
  },
  getDistanceTo: function(b) {
    if (!b || typeof b !== "object") {
      b = this.origin
    }
    var c = this.x - b.x,
      a = this.y - b.y;
    return Math.sqrt(c * c + a * a)
  },
  getAngleTo: function(b) {
    if (!b || typeof b !== "object") {
      b = this.origin
    }
    var c = this.x - b.x,
      a = this.y - b.y;
    return Math.atan2(a, c) * this.radianToDegreeConstant
  }
}, 3, 0, 0, 0, 0, 0, [Ext.util, "Point"], function() {
  this.prototype.translate = this.prototype.translateBy
}));
(Ext.cmd.derive("Ext.event.Event", Ext.Base, {
  alternateClassName: "Ext.EventObjectImpl",
  isStopped: false,
  defaultPrevented: false,
  isEvent: true,
  statics: {
    resolveTextNode: function(a) {
      return (a && a.nodeType === 3) ? a.parentNode : a
    },
    pointerEvents: {
      pointerdown: 1,
      pointermove: 1,
      pointerup: 1,
      pointercancel: 1,
      pointerover: 1,
      pointerout: 1,
      pointerenter: 1,
      pointerleave: 1,
      MSPointerDown: 1,
      MSPointerMove: 1,
      MSPointerUp: 1,
      MSPointerOver: 1,
      MSPointerOut: 1,
      MSPointerCancel: 1,
      MSPointerEnter: 1,
      MSPointerLeave: 1
    },
    mouseEvents: {
      mousedown: 1,
      mousemove: 1,
      mouseup: 1,
      mouseover: 1,
      mouseout: 1,
      mouseenter: 1,
      mouseleave: 1
    },
    clickEvents: {
      click: 1,
      dblclick: 1
    },
    touchEvents: {
      touchstart: 1,
      touchmove: 1,
      touchend: 1,
      touchcancel: 1
    },
    focusEvents: {
      focus: 1,
      blur: 1,
      focusin: 1,
      focusout: 1,
      focusenter: 1,
      focusleave: 1
    },
    pointerTypes: {
      2: "touch",
      3: "pen",
      4: "mouse",
      touch: "touch",
      pen: "pen",
      mouse: "mouse"
    }
  },
  constructor: function(b) {
    var f = this,
      i = f.self,
      e = f.self.resolveTextNode,
      h = b.changedTouches,
      c = h ? h[0] : b,
      g = b.type,
      a, d;
    f.pageX = c.pageX;
    f.pageY = c.pageY;
    f.target = f.delegatedTarget = e(b.target);
    d = b.relatedTarget;
    if (d) {
      f.relatedTarget = e(d)
    }
    f.browserEvent = f.event = b;
    f.type = g;
    f.button = b.button || 0;
    f.shiftKey = b.shiftKey;
    f.ctrlKey = b.ctrlKey || b.metaKey || false;
    f.altKey = b.altKey;
    f.charCode = b.charCode;
    f.keyCode = b.keyCode;
    f.buttons = b.buttons;
    if (f.button === 0 && f.buttons === 0) {
      f.buttons = 1
    }
    if (i.forwardTab !== undefined && i.focusEvents[g]) {
      f.forwardTab = i.forwardTab
    }
    if (i.mouseEvents[g] || i.clickEvents[g]) {
      a = "mouse"
    } else {
      if (i.pointerEvents[g]) {
        a = i.pointerTypes[b.pointerType]
      } else {
        if (i.touchEvents[g]) {
          a = "touch"
        }
      }
    }
    if (a) {
      f.pointerType = a
    }
    f.timeStamp = f.time = +(b.timeStamp || new Date())
  },
  chain: function(a) {
    var b = Ext.Object.chain(this);
    b.parentEvent = this;
    return Ext.apply(b, a)
  },
  correctWheelDelta: function(c) {
    var b = this.WHEEL_SCALE,
      a = Math.round(c / b);
    if (!a && c) {
      a = (c < 0) ? -1 : 1
    }
    return a
  },
  getCharCode: function() {
    return this.charCode || this.keyCode
  },
  getKey: function() {
    return this.keyCode || this.charCode
  },
  getKeyName: function() {
    return this.keyCodes[this.keyCode]
  },
  getPoint: function() {
    var a = this.getXY();
    return new Ext.util.Point(a[0], a[1])
  },
  getRelatedTarget: function(b, e, a) {
    var c = this.relatedTarget,
      d = null;
    if (c) {
      if (b) {
        d = Ext.fly(c).findParent(b, e, a)
      } else {
        d = a ? Ext.get(c) : c
      }
    }
    return d
  },
  getTarget: function(b, c, a) {
    return b ? Ext.fly(this.target).findParent(b, c, a) : (a ? Ext.get(
      this.target) : this.target)
  },
  getTime: function() {
    return this.time
  },
  getWheelDelta: function() {
    var a = this.getWheelDeltas();
    return a.y
  },
  getWheelDeltas: function() {
    var d = this,
      c = d.browserEvent,
      b = 0,
      a = 0;
    if (Ext.isDefined(c.wheelDeltaX)) {
      b = c.wheelDeltaX;
      a = c.wheelDeltaY
    } else {
      if (c.wheelDelta) {
        a = c.wheelDelta
      } else {
        if (c.detail) {
          a = -c.detail;
          if (a > 100) {
            a = 3
          } else {
            if (a < -100) {
              a = -3
            }
          }
          if (Ext.isDefined(c.axis) && c.axis === c.HORIZONTAL_AXIS) {
            b = a;
            a = 0
          }
        }
      }
    }
    return {
      x: d.correctWheelDelta(b),
      y: d.correctWheelDelta(a)
    }
  },
  getX: function() {
    return this.getXY()[0]
  },
  getXY: function() {
    var c = this,
      e = c.xy;
    if (!e) {
      e = c.xy = [c.pageX, c.pageY];
      var b = e[0],
        g, d, f, a;
      if (!b && b !== 0) {
        g = c.browserEvent;
        d = document;
        f = d.documentElement;
        a = d.body;
        e[0] = g.clientX + (f && f.scrollLeft || a && a.scrollLeft || 0) -
          (f && f.clientLeft || a && a.clientLeft || 0);
        e[1] = g.clientY + (f && f.scrollTop || a && a.scrollTop || 0) -
          (f && f.clientTop || a && a.clientTop || 0)
      }
    }
    return e
  },
  getY: function() {
    return this.getXY()[1]
  },
  hasModifier: function() {
    var a = this;
    return !!(a.ctrlKey || a.altKey || a.shiftKey || a.metaKey)
  },
  isNavKeyPress: function(c) {
    var b = this,
      a = b.keyCode;
    return (b.type !== "keypress" && a >= 33 && a <= 40) || (!c && (a ===
      b.RETURN || a === b.TAB || a === b.ESC))
  },
  isSpecialKey: function() {
    var c = this,
      a = c.keyCode,
      b = c.type === "keypress";
    return (b && c.ctrlKey) || c.isNavKeyPress() || (a === c.BACKSPACE) ||
      (a >= 16 && a <= 20) || (!b && a >= 44 && a <= 46)
  },
  makeUnpreventable: function() {
    this.browserEvent.preventDefault = Ext.emptyFn
  },
  preventDefault: function() {
    var b = this,
      a = b.parentEvent;
    b.defaultPrevented = true;
    if (a) {
      a.defaultPrevented = true
    }
    b.browserEvent.preventDefault();
    return b
  },
  setCurrentTarget: function(a) {
    this.currentTarget = this.delegatedTarget = a
  },
  stopEvent: function() {
    return this.preventDefault().stopPropagation()
  },
  stopPropagation: function() {
    var b = this,
      c = b.browserEvent,
      a = b.parentEvent;
    b.isStopped = true;
    if (a) {
      a.isStopped = true
    }
    if (!c.stopPropagation) {
      c.cancelBubble = true;
      return b
    }
    c.stopPropagation();
    return b
  },
  within: function(c, d, a) {
    var b;
    if (c) {
      b = d ? this.getRelatedTarget() : this.getTarget()
    }
    return b ? Ext.fly(c).contains(b) || !!(a && b === Ext.getDom(c)) :
      false
  },
  deprecated: {
    "4.0": {
      methods: {
        getPageX: "getX",
        getPageY: "getY"
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.event, "Event", Ext, "EventObjectImpl"], function(
  a) {
  var c = a.prototype,
    d = {
      BACKSPACE: 8,
      TAB: 9,
      NUM_CENTER: 12,
      ENTER: 13,
      RETURN: 13,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      PAUSE: 19,
      CAPS_LOCK: 20,
      ESC: 27,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      PRINT_SCREEN: 44,
      INSERT: 45,
      DELETE: 46,
      ZERO: 48,
      ONE: 49,
      TWO: 50,
      THREE: 51,
      FOUR: 52,
      FIVE: 53,
      SIX: 54,
      SEVEN: 55,
      EIGHT: 56,
      NINE: 57,
      A: 65,
      B: 66,
      C: 67,
      D: 68,
      E: 69,
      F: 70,
      G: 71,
      H: 72,
      I: 73,
      J: 74,
      K: 75,
      L: 76,
      M: 77,
      N: 78,
      O: 79,
      P: 80,
      Q: 81,
      R: 82,
      S: 83,
      T: 84,
      U: 85,
      V: 86,
      W: 87,
      X: 88,
      Y: 89,
      Z: 90,
      CONTEXT_MENU: 93,
      NUM_ZERO: 96,
      NUM_ONE: 97,
      NUM_TWO: 98,
      NUM_THREE: 99,
      NUM_FOUR: 100,
      NUM_FIVE: 101,
      NUM_SIX: 102,
      NUM_SEVEN: 103,
      NUM_EIGHT: 104,
      NUM_NINE: 105,
      NUM_MULTIPLY: 106,
      NUM_PLUS: 107,
      NUM_MINUS: 109,
      NUM_PERIOD: 110,
      NUM_DIVISION: 111,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      WHEEL_SCALE: (function() {
        var g;
        if (Ext.isGecko) {
          g = 3
        } else {
          if (Ext.isMac) {
            if (Ext.isSafari && Ext.webKitVersion >= 532) {
              g = 120
            } else {
              g = 12
            }
            g *= 3
          } else {
            g = 120
          }
        }
        return g
      }())
    },
    b = {},
    e, f;
  Ext.apply(a, d);
  Ext.apply(c, d);
  delete d.WHEEL_SCALE;
  delete d.RETURN;
  for (e in d) {
    f = d[e];
    b[f] = e
  }
  c.keyCodes = b;
  c.getTrueXY = c.getXY
}));
Ext.define("Ext.overrides.event.Event", {
  override: "Ext.event.Event",
  mousedownEvents: {
    mousedown: 1,
    pointerdown: 1,
    touchstart: 1
  },
  injectEvent: (function() {
    var d, e = {},
      c;
    if (!Ext.isIE9m && document.createEvent) {
      d = {
        createHtmlEvent: function(j, h, g, f) {
          var i = j.createEvent("HTMLEvents");
          i.initEvent(h, g, f);
          return i
        },
        createMouseEvent: function(t, r, l, k, n, j, h, i, f, q, p, m,
          o) {
          var g = t.createEvent("MouseEvents"),
            s = t.defaultView || window;
          if (g.initMouseEvent) {
            g.initMouseEvent(r, l, k, s, n, j, h, j, h, i, f, q, p,
              m, o)
          } else {
            g = t.createEvent("UIEvents");
            g.initEvent(r, l, k);
            g.view = s;
            g.detail = n;
            g.screenX = j;
            g.screenY = h;
            g.clientX = j;
            g.clientY = h;
            g.ctrlKey = i;
            g.altKey = f;
            g.metaKey = p;
            g.shiftKey = q;
            g.button = m;
            g.relatedTarget = o
          }
          return g
        },
        createUIEvent: function(l, j, h, g, i) {
          var k = l.createEvent("UIEvents"),
            f = l.defaultView || window;
          k.initUIEvent(j, h, g, f, i);
          return k
        },
        fireEvent: function(h, f, g) {
          h.dispatchEvent(g)
        }
      }
    } else {
      if (document.createEventObject) {
        c = {
          0: 1,
          1: 4,
          2: 2
        };
        d = {
          createHtmlEvent: function(j, h, g, f) {
            var i = j.createEventObject();
            i.bubbles = g;
            i.cancelable = f;
            return i
          },
          createMouseEvent: function(s, r, l, k, n, j, h, i, f, q, p,
            m, o) {
            var g = s.createEventObject();
            g.bubbles = l;
            g.cancelable = k;
            g.detail = n;
            g.screenX = j;
            g.screenY = h;
            g.clientX = j;
            g.clientY = h;
            g.ctrlKey = i;
            g.altKey = f;
            g.shiftKey = q;
            g.metaKey = p;
            g.button = c[m] || m;
            g.relatedTarget = o;
            return g
          },
          createUIEvent: function(k, i, g, f, h) {
            var j = k.createEventObject();
            j.bubbles = g;
            j.cancelable = f;
            return j
          },
          fireEvent: function(h, f, g) {
            h.fireEvent("on" + f, g)
          }
        }
      }
    }
    Ext.Object.each({
      load: [false, false],
      unload: [false, false],
      select: [true, false],
      change: [true, false],
      submit: [true, true],
      reset: [true, false],
      resize: [true, false],
      scroll: [true, false]
    }, function(h, i) {
      var g = i[0],
        f = i[1];
      e[h] = function(l, j) {
        var k = d.createHtmlEvent(h, g, f);
        d.fireEvent(l, h, k)
      }
    });

    function b(h, g) {
      var f = (h !== "mousemove");
      return function(l, i) {
        var k = i.getXY(),
          j = d.createMouseEvent(l.ownerDocument, h, true, f, g, k[0],
            k[1], i.ctrlKey, i.altKey, i.shiftKey, i.metaKey, i.button,
            i.relatedTarget);
        d.fireEvent(l, h, j)
      }
    }
    Ext.each(["click", "dblclick", "mousedown", "mouseup", "mouseover",
      "mousemove", "mouseout"
    ], function(f) {
      e[f] = b(f, 1)
    });
    Ext.Object.each({
      focusin: [true, false],
      focusout: [true, false],
      activate: [true, true],
      focus: [false, false],
      blur: [false, false]
    }, function(h, i) {
      var g = i[0],
        f = i[1];
      e[h] = function(l, j) {
        var k = d.createUIEvent(l.ownerDocument, h, g, f, 1);
        d.fireEvent(l, h, k)
      }
    });
    if (!d) {
      e = {};
      d = {}
    }

    function a(g, f) {}
    return function(i) {
      var h = this,
        g = e[h.type] || a,
        f = i ? (i.dom || i) : h.getTarget();
      g(f, h)
    }
  }()),
  preventDefault: function() {
    var d = this,
      c = d.browserEvent,
      b = d.parentEvent,
      a, e;
    if (typeof c.type !== "unknown") {
      d.defaultPrevented = true;
      if (b) {
        b.defaultPrevented = true
      }
      if (c.preventDefault) {
        c.preventDefault()
      } else {
        if (c.type === "mousedown") {
          e = c.target;
          a = e.getAttribute("unselectable");
          if (a !== "on") {
            e.setAttribute("unselectable", "on");
            Ext.defer(function() {
              e.setAttribute("unselectable", a)
            }, 1)
          }
        }
        c.returnValue = false;
        if (c.ctrlKey || c.keyCode > 111 && c.keyCode < 124) {
          c.keyCode = -1
        }
      }
    }
    return d
  },
  stopPropagation: function() {
    var b = this,
      a = b.browserEvent;
    if (typeof a.type !== "unknown") {
      if (b.mousedownEvents[b.type]) {
        Ext.GlobalEvents.fireMouseDown(b)
      }
      arguments.callee.$previous.call(this)
    }
    return b
  },
  deprecated: {
    "5.0": {
      methods: {
        clone: function() {
          return new this.self(this.browserEvent, this)
        }
      }
    }
  }
}, function() {
  var a = this,
    d, c = function(f) {
      if (f.keyCode === 9) {
        a.forwardTab = !f.shiftKey
      }
    },
    b = function(f) {
      if (f.keyCode === 9) {
        delete a.forwardTab
      }
    };
  if (Ext.isIE9m) {
    d = {
      0: 0,
      1: 0,
      4: 1,
      2: 2
    };
    a.override({
      statics: {
        enableIEAsync: function(g) {
          var e, f = {};
          for (e in g) {
            f[e] = g[e]
          }
          return f
        }
      },
      constructor: function(h, i, f, e) {
        var g = this;
        g.callParent([h, i, f, e]);
        g.button = d[h.button];
        if (h.type === "contextmenu") {
          g.button = 2
        }
        g.toElement = h.toElement;
        g.fromElement = h.fromElement
      },
      mouseLeaveRe: /(mouseout|mouseleave)/,
      mouseEnterRe: /(mouseover|mouseenter)/,
      enableIEAsync: function(e) {
        this.browserEvent = this.self.enableIEAsync(e)
      },
      getRelatedTarget: function(f, j, e) {
        var h = this,
          g, i;
        if (!h.relatedTarget) {
          g = h.type;
          if (h.mouseLeaveRe.test(g)) {
            i = h.toElement
          } else {
            if (h.mouseEnterRe.test(g)) {
              i = h.fromElement
            }
          }
          if (i) {
            h.relatedTarget = h.self.resolveTextNode(i)
          }
        }
        return h.callParent([f, j, e])
      }
    });
    document.attachEvent("onkeydown", c);
    document.attachEvent("onkeyup", b);
    window.attachEvent("onunload", function() {
      document.detachEvent("onkeydown", c);
      document.detachEvent("onkeyup", b)
    })
  } else {
    if (document.addEventListener) {
      document.addEventListener("keydown", c, true);
      document.addEventListener("keyup", b, true)
    }
  }
});
(Ext.cmd.derive("Ext.event.publisher.Dom", Ext.event.publisher.Publisher, {
  type: "dom",
  handledDomEvents: [],
  reEnterCount: 0,
  captureEvents: {
    resize: 1,
    focus: 1,
    blur: 1,
    paste: 1,
    input: 1,
    change: 1,
    animationstart: 1,
    animationend: 1,
    scroll: 1
  },
  directEvents: {
    mouseenter: 1,
    mouseleave: 1,
    pointerenter: 1,
    pointerleave: 1,
    MSPointerEnter: 1,
    MSPointerLeave: 1,
    load: 1,
    unload: 1,
    beforeunload: 1,
    error: 1,
    DOMContentLoaded: 1,
    DOMFrameContentLoaded: 1,
    hashchange: 1
  },
  blockedPointerEvents: {
    pointerover: 1,
    pointerout: 1,
    pointerenter: 1,
    pointerleave: 1,
    MSPointerOver: 1,
    MSPointerOut: 1,
    MSPointerEnter: 1,
    MSPointerLeave: 1
  },
  blockedCompatibilityMouseEvents: {
    mouseenter: 1,
    mouseleave: 1
  },
  constructor: function() {
    var a = this;
    a.bubbleSubscribers = {};
    a.captureSubscribers = {};
    a.directSubscribers = {};
    a.directCaptureSubscribers = {};
    a.delegatedListeners = {};
    a.initHandlers();
    Ext.onInternalReady(a.onReady, a);
    Ext.event.publisher.Publisher.prototype.constructor.call(this)
  },
  registerEvents: function() {
    var f = this,
      d = Ext.event.publisher.Publisher.publishersByEvent,
      a = f.handledDomEvents,
      e = a.length,
      c = 0,
      b;
    for (; c < e; c++) {
      b = a[c];
      f.handles[b] = 1;
      d[b] = f
    }
    Ext.event.publisher.Publisher.prototype.registerEvents.call(this)
  },
  onReady: function() {
    var d = this,
      a = d.handledDomEvents,
      c, b;
    if (a) {
      for (b = 0, c = a.length; b < c; b++) {
        d.addDelegatedListener(a[b])
      }
    }
    Ext.getWin().on("unload", d.destroy, d)
  },
  initHandlers: function() {
    var a = this;
    a.onDelegatedEvent = Ext.bind(a.onDelegatedEvent, a);
    a.onDirectEvent = Ext.bind(a.onDirectEvent, a);
    a.onDirectCaptureEvent = Ext.bind(a.onDirectCaptureEvent, a)
  },
  addDelegatedListener: function(a) {
    this.delegatedListeners[a] = 1;
    this.target.addEventListener(a, this.onDelegatedEvent, !!this.captureEvents[
      a])
  },
  removeDelegatedListener: function(a) {
    delete this.delegatedListeners[a];
    this.target.removeEventListener(a, this.onDelegatedEvent, !!this.captureEvents[
      a])
  },
  addDirectListener: function(b, c, a) {
    c.dom.addEventListener(b, a ? this.onDirectCaptureEvent : this.onDirectEvent,
      a)
  },
  removeDirectListener: function(b, c, a) {
    c.dom.removeEventListener(b, a ? this.onDirectCaptureEvent : this.onDirectEvent,
      a)
  },
  subscribe: function(c, b, f, a) {
    var d = this,
      e, g;
    if (f && !d.directEvents[b]) {
      e = a ? d.captureSubscribers : d.bubbleSubscribers;
      if (!d.handles[b] && !d.delegatedListeners[b]) {
        d.addDelegatedListener(b)
      }
      if (e[b]) {
        ++e[b]
      } else {
        e[b] = 1
      }
    } else {
      e = a ? d.directCaptureSubscribers : d.directSubscribers;
      g = c.id;
      e = e[b] || (e[b] = {});
      if (e[g]) {
        ++e[g]
      } else {
        e[g] = 1;
        d.addDirectListener(b, c, a)
      }
    }
  },
  unsubscribe: function(e, f, b, i) {
    var h = this,
      g, d, a, c;
    if (b && !h.directEvents[f]) {
      g = h.captureSubscribers;
      d = h.bubbleSubscribers;
      a = i ? g : d;
      if (a[f]) {
        --a[f]
      }
      if (!h.handles[f] && !d[f] && !g[f]) {
        this.removeDelegatedListener(f)
      }
    } else {
      a = i ? h.directCaptureSubscribers : h.directSubscribers;
      c = e.id;
      a = a[f];
      if (a[c]) {
        --a[c]
      }
      if (!a[c]) {
        delete a[c];
        h.removeDirectListener(f, e, i)
      }
    }
  },
  getPropagatingTargets: function(d) {
    var c = d,
      b = [],
      a;
    while (c) {
      b.push(c);
      a = c.parentNode;
      if (!a) {
        a = c.defaultView
      }
      c = a
    }
    return b
  },
  publish: function(b, j, h) {
    var g = this,
      a, d, c, f;
    if (Ext.isArray(j)) {
      a = j
    } else {
      if (g.captureEvents[b]) {
        d = Ext.cache[j.id];
        a = d ? [d] : []
      } else {
        a = g.getPropagatingTargets(j)
      }
    }
    f = a.length;
    if (g.captureSubscribers[b]) {
      for (c = f; c--;) {
        d = Ext.cache[a[c].id];
        if (d) {
          g.fire(d, b, h, false, true);
          if (h.isStopped) {
            break
          }
        }
      }
    }
    if (!h.isStopped && g.bubbleSubscribers[b]) {
      for (c = 0; c < f; c++) {
        d = Ext.cache[a[c].id];
        if (d) {
          g.fire(d, b, h, false, false);
          if (h.isStopped) {
            break
          }
        }
      }
    }
  },
  fire: function(c, b, f, g, a) {
    var d;
    if (c.hasListeners[b]) {
      d = c.events[b];
      if (d) {
        if (a && g) {
          d = d.directCaptures
        } else {
          if (a) {
            d = d.captures
          } else {
            if (g) {
              d = d.directs
            }
          }
        }
        if (d) {
          f.setCurrentTarget(c.dom);
          d.fire(f, f.target)
        }
      }
    }
  },
  onDelegatedEvent: function(a) {
    if (Ext.elevateFunction) {
      Ext.elevateFunction(this.doDelegatedEvent, this, [a])
    } else {
      this.doDelegatedEvent(a)
    }
  },
  doDelegatedEvent: function(d, c) {
    var b = this,
      a = d.timeStamp;
    d = new Ext.event.Event(d);
    if (b.isEventBlocked(d)) {
      return false
    }
    b.beforeEvent(d);
    Ext.frameStartTime = a;
    b.reEnterCount++;
    b.publish(d.type, d.target, d);
    b.reEnterCount--;
    if (c !== false) {
      b.afterEvent(d)
    }
    return d
  },
  onDirectEvent: function(a) {
    if (Ext.elevateFunction) {
      Ext.elevateFunction(this.doDirectEvent, this, [a, false])
    } else {
      this.doDirectEvent(a, false)
    }
  },
  onDirectCaptureEvent: function(a) {
    if (Ext.elevateFunction) {
      Ext.elevateFunction(this.doDirectEvent, this, [a, true])
    } else {
      this.doDirectEvent(a, true)
    }
  },
  doDirectEvent: function(g, b) {
    var d = this,
      f = g.currentTarget,
      a = g.timeStamp,
      c;
    g = new Ext.event.Event(g);
    if (d.isEventBlocked(g)) {
      return
    }
    d.beforeEvent(g);
    Ext.frameStartTime = a;
    c = Ext.cache[f.id];
    if (c) {
      d.reEnterCount++;
      d.fire(c, g.type, g, true, b);
      d.reEnterCount--
    }
    d.afterEvent(g)
  },
  beforeEvent: function(c) {
    var f = c.browserEvent,
      a = Ext.event.publisher.Dom,
      b, d;
    if (f.type === "touchstart") {
      b = f.touches;
      if (b.length === 1) {
        d = b[0];
        a.lastTouchStartX = d.pageX;
        a.lastTouchStartY = d.pageY
      }
    }
  },
  afterEvent: function(d) {
    var f = d.browserEvent,
      c = f.type,
      b = Ext.event.publisher.Dom,
      a = Ext.GlobalEvents;
    if (d.self.pointerEvents[c] && d.pointerType !== "mouse") {
      b.lastScreenPointerEventTime = Ext.now()
    }
    if (c === "touchend") {
      b.lastTouchEndTime = Ext.now()
    }
    if (!this.reEnterCount && a.hasListeners.idle && !a.idleEventMask[c]) {
      a.fireEvent("idle")
    }
  },
  isEventBlocked: function(f) {
    var d = this,
      c = f.type,
      a = Ext.event.publisher.Dom,
      b = Ext.now();
    if (Ext.isGecko && f.type === "click" && f.button === 2) {
      return false
    }
    return (d.blockedPointerEvents[c] && f.pointerType !== "mouse") || (d
      .blockedCompatibilityMouseEvents[c] && (b - a.lastScreenPointerEventTime <
        1000)) || (Ext.supports.TouchEvents && f.self.mouseEvents[f.type] &&
      Math.abs(f.pageX - a.lastTouchStartX) < 15 && Math.abs(f.pageY -
        a.lastTouchStartY) < 15 && (Ext.now() - a.lastTouchEndTime) <
      1000)
  },
  destroy: function() {
    var a;
    for (a in this.delegatedListeners) {
      this.removeDelegatedListener(a)
    }
    this.callParent()
  },
  reset: function() {
    var a = Ext.event.publisher.Dom;
    a.lastScreenPointerEventTime = a.lastTouchEndTime = a.lastTouchStartX =
      a.lastTouchStartY = undefined
  }
}, 1, 0, 0, 0, 0, 0, [Ext.event.publisher, "Dom"], function(b) {
  var d = document,
    c = d.defaultView,
    a = b.prototype;
  if ((Ext.os.is.iOS && Ext.os.version.getMajor() < 5) || Ext.browser.is.AndroidStock ||
    !(c && c.addEventListener)) {
    a.target = d
  } else {
    a.target = c
  }
  b.instance = new b()
}));
Ext.define("Ext.overrides.event.publisher.Dom", {
  override: "Ext.event.publisher.Dom"
}, function(e) {
  if (Ext.isIE9m) {
    var d = document.body,
      c = e.prototype,
      a, b;
    c.target = document;
    c.directBoundListeners = {};
    a = function(h, g, f) {
      h.target = h.srcElement || window;
      h.currentTarget = this;
      if (f) {
        g.onDirectCaptureEvent(h)
      } else {
        g.onDirectEvent(h)
      }
    };
    b = function(g, f) {
      g.target = g.srcElement || window;
      g.currentTarget = this;
      f.onDirectCaptureEvent(g)
    };
    e.override({
      addDelegatedListener: function(f) {
        this.delegatedListeners[f] = 1;
        this.target.attachEvent("on" + f, this.onDelegatedEvent)
      },
      removeDelegatedListener: function(f) {
        delete this.delegatedListeners[f];
        this.target.detachEvent("on" + f, this.onDelegatedEvent)
      },
      addDirectListener: function(i, j, h) {
        var l = this,
          m = j.dom,
          k = Ext.Function.bind(a, m, [l, h], true),
          f = l.directBoundListeners,
          g = f[i] || (f[i] = {});
        g[m.id] = k;
        if (m.attachEvent) {
          m.attachEvent("on" + i, k)
        } else {
          l.callParent(arguments)
        }
      },
      removeDirectListener: function(f, g) {
        var h = g.dom;
        if (h.detachEvent) {
          h.detachEvent("on" + f, this.directBoundListeners[f][h.id])
        } else {
          this.callParent(arguments)
        }
      },
      doDelegatedEvent: function(g, f) {
        g.target = g.srcElement || window;
        if (g.type === "focusin") {
          g.relatedTarget = g.fromElement === d ? null : g.fromElement
        } else {
          if (g.type === "focusout") {
            g.relatedTarget = g.toElement === d ? null : g.toElement
          }
        }
        return this.callParent([g, f])
      }
    });
    Ext.apply(c.directEvents, c.captureEvents);
    c.captureEvents = {}
  }
});
(Ext.cmd.derive("Ext.event.publisher.Gesture", Ext.event.publisher.Dom, {
  type: "gesture",
  config: {
    async: true
  },
  isCancelEvent: {
    touchcancel: 1,
    pointercancel: 1,
    MSPointerCancel: 1
  },
  handledEvents: [],
  handledDomEvents: [],
  constructor: function(b) {
    var g = this,
      c = g.handledDomEvents,
      l = Ext.supports,
      j = l.TouchEvents,
      k = Ext.Function,
      d = g.onTouchStart,
      a = g.onTouchMove,
      i = g.onTouchEnd,
      f = k.createAnimationFrame(g.onTouchStart, g, null, 1),
      e = k.createAnimationFrame(g.onTouchMove, g),
      h = k.createAnimationFrame(g.onTouchEnd, g, null, 1);
    g._handlers = {
      touchstart: d,
      touchmove: a,
      touchend: i,
      touchcancel: i,
      pointerdown: d,
      pointermove: a,
      pointerup: i,
      pointercancel: i,
      MSPointerDown: d,
      MSPointerMove: a,
      MSPointerUp: i,
      MSPointerCancel: i,
      mousedown: d,
      mousemove: a,
      mouseup: i
    };
    g._asyncHandlers = {
      touchstart: f,
      touchmove: e,
      touchend: h,
      touchcancel: h,
      pointerdown: f,
      pointermove: e,
      pointerup: h,
      pointercancel: h,
      MSPointerDown: f,
      MSPointerMove: e,
      MSPointerUp: h,
      MSPointerCancel: h,
      mousedown: f,
      mousemove: e,
      mouseup: h
    };
    g.activeTouchesMap = {};
    g.activeTouches = [];
    g.changedTouches = [];
    g.recognizers = [];
    if (j) {
      g.onTargetTouchMove = g.onTargetTouchMove.bind(g);
      g.onTargetTouchEnd = g.onTargetTouchEnd.bind(g)
    }
    if (l.PointerEvents) {
      c.push("pointerdown", "pointermove", "pointerup", "pointercancel");
      g.mousePointerType = "mouse"
    } else {
      if (l.MSPointerEvents) {
        c.push("MSPointerDown", "MSPointerMove", "MSPointerUp",
          "MSPointerCancel");
        g.mousePointerType = 4
      } else {
        if (j) {
          c.push("touchstart", "touchmove", "touchend", "touchcancel")
        }
      }
    }
    if (!c.length || (j && Ext.isWebKit && Ext.os.is.Desktop)) {
      c.push("mousedown", "mousemove", "mouseup")
    }
    g.initConfig(b);
    return Ext.event.publisher.Dom.prototype.constructor.call(this)
  },
  onReady: function() {
    Ext.event.publisher.Dom.prototype.onReady.call(this);
    Ext.Array.sort(this.recognizers, function(f, e) {
      var d = f.priority,
        c = e.priority;
      return (d > c) ? 1 : (d < c) ? -1 : 0
    })
  },
  registerRecognizer: function(a) {
    var e = this,
      b = a.handledEvents,
      d = b.length,
      c;
    a.setOnRecognized(e.onRecognized);
    a.setCallbackScope(e);
    for (c = 0; c < d; c++) {
      e.handledEvents.push(b[c])
    }
    e.registerEvents(b);
    e.recognizers.push(a)
  },
  onRecognized: function(d, g, a) {
    var j = this,
      k = g.changedTouches,
      h = k.length,
      l, f, c, b;
    a = a || {};
    a.type = d;
    a.target = k[0].target;
    a.isStopped = false;
    g = g.chain(a);
    if (h > 1) {
      l = [];
      for (c = 0; c < h; c++) {
        b = k[c];
        l.push(b.targets)
      }
      f = j.getCommonTargets(l)
    } else {
      f = k[0].targets
    }
    j.publish(d, f, g)
  },
  getCommonTargets: function(a) {
    var h = a[0],
      f = a.length;
    if (f === 1) {
      return h
    }
    var d = [],
      e = 1,
      g, b, c;
    while (true) {
      g = h[h.length - e];
      if (!g) {
        return d
      }
      for (c = 1; c < f; c++) {
        b = a[c];
        if (b[b.length - e] !== g) {
          return d
        }
      }
      d.unshift(g);
      e++
    }
    return d
  },
  invokeRecognizers: function(c, g) {
    var b = this.recognizers,
      f = b.length,
      d, a;
    if (c === "onStart") {
      for (d = 0; d < f; d++) {
        b[d].isActive = true
      }
    }
    for (d = 0; d < f; d++) {
      a = b[d];
      if (a.isActive && a[c].call(a, g) === false) {
        a.isActive = false
      }
    }
  },
  updateTouches: function(j, b) {
    var n = this,
      r = j.browserEvent,
      f = r.changedTouches || [r],
      a = n.activeTouches,
      k = n.activeTouchesMap,
      p = [],
      m, h, d, g, c, l, q, o;
    for (c = 0, l = f.length; c < l; c++) {
      m = f[c];
      if ("identifier" in m) {
        h = m.identifier
      } else {
        if ("pointerId" in m) {
          h = m.pointerId
        } else {
          h = 1
        }
      }
      d = k[h];
      if (!d) {
        g = Ext.event.Event.resolveTextNode(m.target);
        d = k[h] = {
          identifier: h,
          target: g,
          targets: n.getPropagatingTargets(g)
        };
        a.push(d)
      }
      if (b) {
        delete k[h];
        Ext.Array.remove(a, d)
      }
      q = m.pageX;
      o = m.pageY;
      d.pageX = q;
      d.pageY = o;
      d.point = new Ext.util.Point(q, o);
      p.push(d)
    }
    j.touches = Ext.Array.clone(a);
    j.changedTouches = p
  },
  doDelegatedEvent: function(b) {
    var a = this;
    b = Ext.event.publisher.Dom.prototype.doDelegatedEvent.call(this, b,
      false);
    if (b) {
      if (!b.button || b.button < 1) {
        a.handlers[b.type].call(a, b)
      }
      a.afterEvent(b)
    }
  },
  onTouchStart: function(d) {
    var a = this,
      c = d.target,
      b = d.browserEvent.touches;
    if (d.browserEvent.type === "touchstart") {
      c.addEventListener("touchmove", a.onTargetTouchMove);
      c.addEventListener("touchend", a.onTargetTouchEnd);
      c.addEventListener("touchcancel", a.onTargetTouchEnd)
    }
    if (b && b.length <= a.activeTouches.length) {
      a.removeGhostTouches(b)
    }
    a.updateTouches(d);
    if (!a.isStarted) {
      a.isStarted = true;
      a.invokeRecognizers("onStart", d);
      if (Ext.enableGarbageCollector) {
        Ext.dom.GarbageCollector.pause()
      }
    }
    a.invokeRecognizers("onTouchStart", d)
  },
  onTouchMove: function(c) {
    var b = this,
      a = b.mousePointerType;
    if (b.isStarted) {
      if (a && c.browserEvent.pointerType === a && c.buttons === 0) {
        c.type = Ext.dom.Element.prototype.eventMap.touchend;
        c.button = 0;
        b.onTouchEnd(c);
        return
      }
      b.updateTouches(c);
      if (c.changedTouches.length > 0) {
        b.invokeRecognizers("onTouchMove", c)
      }
    }
  },
  onTouchEnd: function(b) {
    var a = this;
    if (!a.isStarted) {
      return
    }
    a.updateTouches(b, true);
    a.invokeRecognizers(a.isCancelEvent[b.type] ? "onTouchCancel" :
      "onTouchEnd", b);
    if (!a.activeTouches.length) {
      a.isStarted = false;
      a.invokeRecognizers("onEnd", b);
      if (Ext.enableGarbageCollector) {
        Ext.dom.GarbageCollector.resume()
      }
    }
  },
  onTargetTouchMove: function(a) {
    if (Ext.elevateFunction) {
      Ext.elevateFunction(this.doTargetTouchMove, this, [a])
    } else {
      this.doTargetTouchMove(a)
    }
  },
  doTargetTouchMove: function(a) {
    if (!Ext.getBody().contains(a.target)) {
      this.onTouchMove(new Ext.event.Event(a))
    }
  },
  onTargetTouchEnd: function(a) {
    if (Ext.elevateFunction) {
      Ext.elevateFunction(this.doTargetTouchEnd, this, [a])
    } else {
      this.doTargetTouchEnd(a)
    }
  },
  doTargetTouchEnd: function(c) {
    var a = this,
      b = c.target;
    b.removeEventListener("touchmove", a.onTargetTouchMove);
    b.removeEventListener("touchend", a.onTargetTouchEnd);
    b.removeEventListener("touchcancel", a.onTargetTouchEnd);
    if (!Ext.getBody().contains(b)) {
      a.onTouchEnd(new Ext.event.Event(c))
    }
  },
  updateAsync: function(a) {
    this.handlers = a ? this._asyncHandlers : this._handlers
  },
  reset: function() {
    var e = this,
      b = e.recognizers,
      d = b.length,
      c, a;
    e.activeTouchesMap = {};
    e.activeTouches = [];
    e.changedTouches = [];
    e.isStarted = false;
    for (c = 0; c < d; c++) {
      a = b[c];
      a.reset();
      a.isActive = false
    }
    Ext.event.publisher.Dom.prototype.reset.call(this)
  },
  privates: {
    removeGhostTouches: function(e) {
      var c = {},
        a = e.length,
        h = this.activeTouches,
        d = this.activeTouchesMap,
        b, g, f;
      for (b = 0; b < a; ++b) {
        c[e[b].identifier] = true
      }
      b = h.length;
      while (b--) {
        f = h[b];
        g = f.identifier;
        if (!e[g]) {
          Ext.Array.remove(h, f);
          delete d[g]
        }
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.event.publisher, "Gesture"], function(a) {
  a.instance = new a()
}));
Ext.define("Ext.overrides.event.publisher.Gesture", {
  override: "Ext.event.publisher.Gesture"
}, function() {
  if (Ext.isIE9m) {
    this.override({
      updateTouches: function(c, a) {
        var d = c.browserEvent,
          b = c.getXY();
        d.pageX = b[0];
        d.pageY = b[1];
        this.callParent([c, a])
      },
      doDelegatedEvent: function(a) {
        this.callParent([Ext.event.Event.enableIEAsync(a)])
      }
    })
  }
});
(Ext.cmd.derive("Ext.mixin.Templatable", Ext.Mixin, {
  mixinConfig: {
    id: "templatable"
  },
  referenceAttributeName: "reference",
  referenceSelector: "[reference]",
  getElementConfig: function() {
    return {
      reference: "element"
    }
  },
  getElementTemplate: function() {
    var a = document.createDocumentFragment();
    a.appendChild(Ext.Element.create(this.getElementConfig(), true));
    return a
  },
  initElement: function() {
    var a = this.self.prototype;
    a.elementTemplate = this.getElementTemplate();
    a.initElement = a.doInitElement;
    this.initElement.apply(this, arguments)
  },
  linkElement: function(a, b) {
    this.link(a, b)
  },
  doInitElement: function() {
    var g = this.referenceAttributeName,
      c, d, e, f, b, a;
    c = this.elementTemplate.cloneNode(true);
    d = c.querySelectorAll(this.referenceSelector);
    for (e = 0, f = d.length; e < f; e++) {
      b = d[e];
      a = b.getAttribute(g);
      b.removeAttribute(g);
      this.linkElement(a, b)
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.mixin, "Templatable"], 0));
(Ext.cmd.derive("Ext.TaskQueue", Ext.Base, {
  singleton: true,
  pending: false,
  mode: true,
  constructor: function() {
    this.readQueue = [];
    this.writeQueue = [];
    this.run = Ext.Function.bind(this.run, this);
    if (Ext.os.is.iOS) {
      Ext.interval(this.watch, 500, this)
    }
  },
  requestRead: function(c, b, a) {
    this.request(true);
    this.readQueue.push(arguments)
  },
  requestWrite: function(c, b, a) {
    this.request(false);
    this.writeQueue.push(arguments)
  },
  request: function(a) {
    if (!this.pending) {
      this.pendingTime = Date.now();
      this.pending = true;
      this.mode = a;
      if (a) {
        Ext.defer(this.run, 1, this)
      } else {
        Ext.Function.requestAnimationFrame(this.run)
      }
    }
  },
  watch: function() {
    if (this.pending && Date.now() - this.pendingTime >= 500) {
      this.run()
    }
  },
  run: function() {
    this.pending = false;
    var j = this.readQueue,
      e = this.writeQueue,
      c = null,
      f;
    if (this.mode) {
      f = j;
      if (e.length > 0) {
        c = false
      }
    } else {
      f = e;
      if (j.length > 0) {
        c = true
      }
    }
    var b = f.slice(),
      d, g, a, h, k;
    f.length = 0;
    for (d = 0, g = b.length; d < g; d++) {
      a = b[d];
      h = a[0];
      k = a[1];
      if (typeof h === "string") {
        h = k[h]
      }
      if (a.length > 2) {
        h.apply(k, a[2])
      } else {
        h.call(k)
      }
    }
    b.length = 0;
    if (c !== null) {
      this.request(c)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext, "TaskQueue"], 0));
(Ext.cmd.derive("Ext.util.sizemonitor.Abstract", Ext.Base, {
  config: {
    element: null,
    callback: Ext.emptyFn,
    scope: null,
    args: []
  },
  width: 0,
  height: 0,
  contentWidth: 0,
  contentHeight: 0,
  constructor: function(a) {
    this.refresh = Ext.Function.bind(this.refresh, this);
    this.info = {
      width: 0,
      height: 0,
      contentWidth: 0,
      contentHeight: 0,
      flag: 0
    };
    this.initElement();
    this.initConfig(a);
    this.bindListeners(true)
  },
  bindListeners: Ext.emptyFn,
  applyElement: function(a) {
    if (a) {
      return Ext.get(a)
    }
  },
  updateElement: function(a) {
    a.append(this.detectorsContainer);
    a.addCls("x-size-monitored")
  },
  applyArgs: function(a) {
    return a.concat([this.info])
  },
  refreshMonitors: Ext.emptyFn,
  forceRefresh: function() {
    Ext.TaskQueue.requestRead("refresh", this)
  },
  getContentBounds: function() {
    return this.detectorsContainer.getBoundingClientRect()
  },
  getContentWidth: function() {
    return this.detectorsContainer.offsetWidth
  },
  getContentHeight: function() {
    return this.detectorsContainer.offsetHeight
  },
  refreshSize: function() {
    var d = this.getElement();
    if (!d || d.destroyed) {
      return false
    }
    var b = d.getWidth(),
      j = d.getHeight(),
      a = this.getContentWidth(),
      i = this.getContentHeight(),
      h = this.contentWidth,
      f = this.contentHeight,
      c = this.info,
      e = false,
      g;
    this.width = b;
    this.height = j;
    this.contentWidth = a;
    this.contentHeight = i;
    g = ((h !== a ? 1 : 0) + (f !== i ? 2 : 0));
    if (g > 0) {
      c.width = b;
      c.height = j;
      c.contentWidth = a;
      c.contentHeight = i;
      c.flag = g;
      e = true;
      this.getCallback().apply(this.getScope(), this.getArgs())
    }
    return e
  },
  refresh: function(a) {
    if (this.refreshSize() || a) {
      Ext.TaskQueue.requestWrite("refreshMonitors", this)
    }
  },
  destroy: function() {
    var b = this,
      a = b.getElement();
    b.bindListeners(false);
    if (a && !a.destroyed) {
      a.removeCls("x-size-monitored")
    }
    delete b._element;
    b.callParent()
  }
}, 1, 0, 0, 0, 0, [
  [Ext.mixin.Templatable.prototype.mixinId || Ext.mixin.Templatable.$className,
    Ext.mixin.Templatable
  ]
], [Ext.util.sizemonitor, "Abstract"], 0));
(Ext.cmd.derive("Ext.util.sizemonitor.Default", Ext.util.sizemonitor.Abstract, {
  updateElement: function(a) {},
  bindListeners: function(b) {
    var a = this.getElement().dom;
    if (!a) {
      return
    }
    if (b) {
      a.onresize = this.refresh
    } else {
      delete a.onresize
    }
  },
  getContentBounds: function() {
    return this.getElement().dom.getBoundingClientRect()
  },
  getContentWidth: function() {
    return this.getElement().getWidth()
  },
  getContentHeight: function() {
    return this.getElement().getHeight()
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util.sizemonitor, "Default"], 0));
(Ext.cmd.derive("Ext.util.sizemonitor.Scroll", Ext.util.sizemonitor.Abstract, {
  getElementConfig: function() {
    return {
      reference: "detectorsContainer",
      classList: ["x-size-monitors", "scroll"],
      children: [{
        reference: "expandMonitor",
        className: "expand"
      }, {
        reference: "shrinkMonitor",
        className: "shrink"
      }]
    }
  },
  constructor: function(a) {
    this.onScroll = Ext.Function.bind(this.onScroll, this);
    Ext.util.sizemonitor.Abstract.prototype.constructor.apply(this,
      arguments)
  },
  bindListeners: function(b) {
    var a = b ? "addEventListener" : "removeEventListener";
    this.expandMonitor[a]("scroll", this.onScroll, true);
    this.shrinkMonitor[a]("scroll", this.onScroll, true)
  },
  forceRefresh: function() {
    Ext.TaskQueue.requestRead("refresh", this, [true])
  },
  onScroll: function() {
    Ext.TaskQueue.requestRead("refresh", this)
  },
  refreshMonitors: function() {
    var b = this.expandMonitor,
      c = this.shrinkMonitor,
      a = 1000000;
    if (b && !b.destroyed) {
      b.scrollLeft = a;
      b.scrollTop = a
    }
    if (c && !c.destroyed) {
      c.scrollLeft = a;
      c.scrollTop = a
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util.sizemonitor, "Scroll"], 0));
(Ext.cmd.derive("Ext.util.sizemonitor.OverflowChange", Ext.util.sizemonitor.Abstract, {
  constructor: function(a) {
    this.onExpand = Ext.Function.bind(this.onExpand, this);
    this.onShrink = Ext.Function.bind(this.onShrink, this);
    Ext.util.sizemonitor.Abstract.prototype.constructor.apply(this,
      arguments)
  },
  getElementConfig: function() {
    return {
      reference: "detectorsContainer",
      classList: ["x-size-monitors", "overflowchanged"],
      children: [{
        reference: "expandMonitor",
        className: "expand",
        children: [{
          reference: "expandHelper"
        }]
      }, {
        reference: "shrinkMonitor",
        className: "shrink",
        children: [{
          reference: "shrinkHelper"
        }]
      }]
    }
  },
  bindListeners: function(b) {
    var a = b ? "addEventListener" : "removeEventListener";
    this.expandMonitor[a](Ext.browser.is.Firefox ? "underflow" :
      "overflowchanged", this.onExpand, true);
    this.shrinkMonitor[a](Ext.browser.is.Firefox ? "overflow" :
      "overflowchanged", this.onShrink, true)
  },
  onExpand: function(a) {
    if (Ext.browser.is.Webkit && a.horizontalOverflow && a.verticalOverflow) {
      return
    }
    Ext.TaskQueue.requestRead("refresh", this)
  },
  onShrink: function(a) {
    if (Ext.browser.is.Webkit && !a.horizontalOverflow && !a.verticalOverflow) {
      return
    }
    Ext.TaskQueue.requestRead("refresh", this)
  },
  refreshMonitors: function() {
    if (this.destroyed) {
      return
    }
    var f = this.expandHelper,
      e = this.shrinkHelper,
      b = this.getContentBounds(),
      d = b.width,
      a = b.height,
      c;
    if (f && !f.destroyed) {
      c = f.style;
      c.width = (d + 1) + "px";
      c.height = (a + 1) + "px"
    }
    if (e && !e.destroyed) {
      c = e.style;
      c.width = d + "px";
      c.height = a + "px"
    }
    Ext.TaskQueue.requestRead("refresh", this)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util.sizemonitor, "OverflowChange"], 0));
(Ext.cmd.derive("Ext.util.SizeMonitor", Ext.Base, {
  constructor: function(a) {
    var b = Ext.util.sizemonitor;
    if (Ext.browser.is.Firefox) {
      return new b.OverflowChange(a)
    } else {
      if (Ext.browser.is.WebKit || Ext.browser.is.IE11) {
        return new b.Scroll(a)
      } else {
        return new b.Default(a)
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "SizeMonitor"], 0));
(Ext.cmd.derive("Ext.event.publisher.ElementSize", Ext.event.publisher.Publisher, {
  type: "size",
  handledEvents: ["resize"],
  constructor: function() {
    this.monitors = {};
    this.subscribers = {};
    Ext.event.publisher.Publisher.prototype.constructor.apply(this,
      arguments)
  },
  subscribe: function(b) {
    var d = b.id,
      c = this.subscribers,
      a = this.monitors;
    if (c[d]) {
      ++c[d]
    } else {
      c[d] = 1;
      a[d] = new Ext.util.SizeMonitor({
        element: b,
        callback: this.onElementResize,
        scope: this,
        args: [b]
      })
    }
    b.on("painted", "forceRefresh", a[d]);
    return true
  },
  unsubscribe: function(c) {
    var e = c.id,
      d = this.subscribers,
      b = this.monitors,
      a;
    if (d[e] && !--d[e]) {
      delete d[e];
      a = b[e];
      c.un("painted", "forceRefresh", a);
      a.destroy();
      delete b[e]
    }
  },
  onElementResize: function(a, b) {
    Ext.TaskQueue.requestRead("fire", this, [a, "resize", [a, b]])
  }
}, 1, 0, 0, 0, 0, 0, [Ext.event.publisher, "ElementSize"], function(a) {
  a.instance = new a()
}));
(Ext.cmd.derive("Ext.util.paintmonitor.Abstract", Ext.Base, {
  config: {
    element: null,
    callback: Ext.emptyFn,
    scope: null,
    args: []
  },
  eventName: "",
  monitorClass: "",
  constructor: function(a) {
    this.onElementPainted = Ext.Function.bind(this.onElementPainted, this);
    this.initConfig(a)
  },
  bindListeners: function(a) {
    this.monitorElement[a ? "addEventListener" : "removeEventListener"](
      this.eventName, this.onElementPainted, true)
  },
  applyElement: function(a) {
    if (a) {
      return Ext.get(a)
    }
  },
  updateElement: function(a) {
    this.monitorElement = Ext.Element.create({
      classList: ["x-paint-monitor", this.monitorClass]
    }, true);
    a.appendChild(this.monitorElement);
    a.addCls("x-paint-monitored");
    this.bindListeners(true)
  },
  onElementPainted: function() {},
  destroy: function() {
    var d = this,
      b = d.monitorElement,
      a = b.parentNode,
      c = d.getElement();
    d.bindListeners(false);
    delete d.monitorElement;
    if (c && !c.destroyed) {
      c.removeCls("x-paint-monitored");
      delete d._element
    }
    if (a) {
      a.removeChild(b)
    }
    d.callParent()
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util.paintmonitor, "Abstract"], 0));
(Ext.cmd.derive("Ext.util.paintmonitor.CssAnimation", Ext.util.paintmonitor.Abstract, {
  eventName: Ext.browser.is.WebKit ? "webkitAnimationEnd" : "animationend",
  monitorClass: "cssanimation",
  onElementPainted: function(a) {
    if (a.animationName === "x-paint-monitor-helper") {
      this.getCallback().apply(this.getScope(), this.getArgs())
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util.paintmonitor, "CssAnimation"], 0));
(Ext.cmd.derive("Ext.util.PaintMonitor", Ext.Base, {
  constructor: function(a) {
    return new Ext.util.paintmonitor.CssAnimation(a)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "PaintMonitor"], 0));
(Ext.cmd.derive("Ext.event.publisher.ElementPaint", Ext.event.publisher.Publisher, {
  type: "paint",
  handledEvents: ["painted"],
  constructor: function() {
    this.monitors = {};
    this.subscribers = {};
    Ext.event.publisher.Publisher.prototype.constructor.apply(this,
      arguments)
  },
  subscribe: function(a) {
    var c = a.id,
      b = this.subscribers;
    if (b[c]) {
      ++b[c]
    } else {
      b[c] = 1;
      this.monitors[c] = new Ext.util.PaintMonitor({
        element: a,
        callback: this.onElementPainted,
        scope: this,
        args: [a]
      })
    }
  },
  unsubscribe: function(b) {
    var d = b.id,
      c = this.subscribers,
      a = this.monitors;
    if (c[d] && !--c[d]) {
      delete c[d];
      a[d].destroy();
      delete a[d]
    }
  },
  onElementPainted: function(a) {
    Ext.TaskQueue.requestRead("fire", this, [a, "painted", [a]])
  }
}, 1, 0, 0, 0, 0, 0, [Ext.event.publisher, "ElementPaint"], function(a) {
  a.instance = new a()
}));
(Ext.cmd.derive("Ext.dom.Element", Ext.Base, function(p) {
  var u = window,
    S = document,
    ag = "ext-window",
    M = "ext-document",
    i = "width",
    Q = "height",
    ad = "min-width",
    e = "min-height",
    q = "max-width",
    D = "max-height",
    T = "top",
    ah = "right",
    N = "bottom",
    H = "left",
    k = "visibility",
    ae = "hidden",
    d = "display",
    V = "none",
    n = "z-index",
    X = "position",
    s = "relative",
    t = "static",
    z = "-",
    x = /\w/g,
    L = /\s+/,
    af = /[\s]+/,
    b = /^(?:transparent|(?:rgba[(](?:\s*\d+\s*[,]){3}\s*0\s*[)]))$/i,
    J = /table-row|table-.*-group/,
    c = /top/i,
    w = {
      t: "border-top-width",
      r: "border-right-width",
      b: "border-bottom-width",
      l: "border-left-width"
    },
    ac = {
      t: "padding-top",
      r: "padding-right",
      b: "padding-bottom",
      l: "padding-left"
    },
    m = {
      t: "margin-top",
      r: "margin-right",
      b: "margin-bottom",
      l: "margin-left"
    },
    G = [ac.l, ac.r, ac.t, ac.b],
    g = [w.l, w.r, w.t, w.b],
    aa = /\d+$/,
    j = /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
    R = "px",
    P = /(-[a-z])/gi,
    ai = /([a-z0-9\-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi,
    r = /^\d+(?:\.\d*)?px$/i,
    y = {},
    v = "originalDisplay",
    W = function(aj, ak) {
      return ak.charAt(1).toUpperCase()
    },
    K = function(am, ak) {
      var an, al, aj;
      if (am.nodeType === 1) {
        am._extData = null;
        if (ak) {
          an = am.childNodes;
          for (al = 0, aj = an.length; al < aj; ++al) {
            K(an[al], ak)
          }
        }
      }
    },
    E = "x-hidden-visibility",
    C = "x-hidden-display",
    l = "x-hidden-offsets",
    a = "x-hidden-clip",
    B = "x-sized",
    O = "x-unsized",
    I = "x-stretched",
    Z = "x-no-touch-scroll",
    o = {
      style: "style",
      className: "className",
      cls: "cls",
      classList: "classList",
      text: "text",
      hidden: "hidden",
      html: "html",
      children: "children"
    },
    U = 0,
    ab = 0,
    A = false,
    f = false,
    Y, F, h;
  return {
    alternateClassName: ["Ext.Element"],
    observableType: "element",
    isElement: true,
    skipGarbageCollection: true,
    $applyConfigs: true,
    identifiablePrefix: "ext-element-",
    styleHooks: {},
    validIdRe: Ext.validIdRe,
    blockedEvents: Ext.supports.EmulatedMouseOver ? {
      mouseover: 1
    } : {},
    longpressEvents: {
      longpress: 1,
      taphold: 1
    },
    constructor: function(ak) {
      var aj = this,
        al;
      if (typeof ak === "string") {
        ak = S.getElementById(ak)
      }
      if (!ak) {
        return null
      }
      aj.dom = ak;
      al = ak.id;
      if (al) {
        aj.id = al
      } else {
        al = ak.id = aj.getUniqueId()
      }
      aj.el = aj;
      Ext.cache[al] = aj;
      aj.mixins.observable.constructor.call(aj)
    },
    inheritableStatics: {
      cache: Ext.cache = {},
      editableSelector: 'input,textarea,[contenteditable="true"]',
      VISIBILITY: 1,
      DISPLAY: 2,
      OFFSETS: 3,
      CLIP: 4,
      minKeyboardHeight: 100,
      unitRe: j,
      useDelegatedEvents: true,
      validNodeTypes: {
        1: 1,
        9: 1
      },
      addUnits: function(ak, aj) {
        if (typeof ak === "number") {
          return ak + (aj || R)
        }
        if (ak === "" || ak === "auto" || ak == null) {
          return ak || ""
        }
        if (aa.test(ak)) {
          return ak + (aj || R)
        }
        if (!j.test(ak)) {
          return ak || ""
        }
        return ak
      },
      create: function(al, ak) {
        var ar = this,
          ao = o.hidden,
          an, at, av, au, aj, am, aq, ap;
        if (!al) {
          al = {}
        }
        if (al.isElement) {
          return ak ? al.dom : al
        } else {
          if ("nodeType" in al) {
            return ak ? al : Ext.get(al)
          }
        }
        if (typeof al === "string") {
          return S.createTextNode(al)
        }
        av = al.tag;
        if (!av) {
          av = "div"
        }
        if (al.namespace) {
          an = S.createElementNS(al.namespace, av)
        } else {
          an = S.createElement(av)
        }
        at = an.style;
        if (al[ao]) {
          ap = al.className;
          ap = (ap == null) ? "" : ap + " ";
          al.className = ap + C;
          delete al[ao]
        }
        for (aj in al) {
          if (aj !== "tag") {
            au = al[aj];
            switch (aj) {
              case o.style:
                if (typeof au === "string") {
                  an.setAttribute(aj, au)
                } else {
                  for (am in au) {
                    if (au.hasOwnProperty(am)) {
                      at[am] = au[am]
                    }
                  }
                }
                break;
              case o.className:
              case o.cls:
                an.className = au;
                break;
              case o.classList:
                an.className = au.join(" ");
                break;
              case o.text:
                an.textContent = au;
                break;
              case o.html:
                an.innerHTML = au;
                break;
              case o.children:
                for (am = 0, aq = au.length; am < aq; am++) {
                  an.appendChild(ar.create(au[am], true))
                }
                break;
              default:
                if (au != null) {
                  an.setAttribute(aj, au)
                }
            }
          }
        }
        if (ak) {
          return an
        } else {
          return ar.get(an)
        }
      },
      detach: function() {
        var aj = this.dom;
        if (aj && aj.parentNode && aj.tagName !== "BODY") {
          aj.parentNode.removeChild(aj)
        }
        return this
      },
      fly: function(ak, aj) {
        return Ext.fly(ak, aj)
      },
      fromPoint: function(aj, ak) {
        return Ext.get(S.elementFromPoint(aj, ak))
      },
      get: function(al) {
        var ap = this,
          aj = Ext.cache,
          an, am, ak, at, ar, ao, aq;
        if (!al) {
          return null
        }
        if (al.isFly) {
          al = al.dom
        }
        if (typeof al === "string") {
          ak = al;
          if (aj.hasOwnProperty(ak)) {
            at = aj[ak];
            if (at.skipGarbageCollection || !Ext.isGarbage(at.dom)) {
              return at
            } else {
              at.destroy()
            }
          }
          if (ak === ag) {
            return p.get(u)
          } else {
            if (ak === M) {
              return p.get(S)
            }
          }
          am = Ext.getElementById ? Ext.getElementById(ak) : S.getElementById(
            ak);
          if (am) {
            return new p(am)
          }
        }
        an = al.nodeType;
        if (an) {
          ar = (an === 9);
          aq = ap.validNodeTypes[an]
        } else {
          ao = (al.window == al)
        }
        if (aq || ao) {
          ak = al.id;
          if (aj.hasOwnProperty(ak)) {
            at = aj[ak];
            if (at.skipGarbageCollection || al === at.dom || !Ext.isGarbage(
                at.dom)) {
              return at
            } else {
              at.destroy()
            }
          }
          if (al === S) {
            al.id = M
          }
          if (al == u) {
            al.id = ag
          }
          al = new p(al);
          if (ao || ar) {
            al.skipGarbageCollection = true
          }
          return al
        }
        if (al.isElement) {
          return al
        }
        if (al.isComposite) {
          return al
        }
        if (Ext.isIterable(al)) {
          return ap.select(al)
        }
        return null
      },
      getActiveElement: function() {
        var aj = S.activeElement;
        if (!aj || !aj.focus) {
          aj = S.body
        }
        return aj
      },
      getDocumentHeight: function() {
        return Math.max(!Ext.isStrict ? S.body.scrollHeight : S.documentElement
          .scrollHeight, this.getViewportHeight())
      },
      getDocumentWidth: function() {
        return Math.max(!Ext.isStrict ? S.body.scrollWidth : S.documentElement
          .scrollWidth, this.getViewportWidth())
      },
      getOrientation: function() {
        if (Ext.supports.OrientationChange) {
          return (u.orientation == 0) ? "portrait" : "landscape"
        }
        return (u.innerHeight > u.innerWidth) ? "portrait" : "landscape"
      },
      getViewportHeight: function() {
        var aj = p._viewportHeight;
        if (Ext.isIE9m) {
          return S.documentElement.clientHeight
        }
        return (aj != null) ? aj : u.innerHeight
      },
      getViewportWidth: function() {
        var aj = p._viewportWidth;
        if (Ext.isIE9m) {
          return S.documentElement.clientWidth
        }
        return (aj != null) ? aj : u.innerWidth
      },
      getViewSize: function() {
        return {
          width: p.getViewportWidth(),
          height: p.getViewportHeight()
        }
      },
      normalize: function(aj) {
        return y[aj] || (y[aj] = aj.replace(P, W))
      },
      _onWindowFocusChange: function(aj) {
        if (Ext.fly(aj.target).is(p.editableSelector)) {
          U = new Date();
          A = (aj.type === "focusin" || aj.type === "pointerup")
        }
      },
      _onWindowResize: function() {
        var an = window.innerWidth,
          ao = window.innerHeight,
          am = new Date(),
          ak = 1000,
          al, aj;
        al = an - p._windowWidth;
        aj = ao - p._windowHeight;
        p._windowWidth = an;
        p._windowHeight = ao;
        if (((am - U) < ak) || ((am - ab) < ak)) {
          if (al === 0 && (A && (aj <= -p.minKeyboardHeight))) {
            f = true;
            return
          }
        }
        if (f && (al === 0) && (aj >= p.minKeyboardHeight)) {
          f = false;
          ab = new Date()
        }
        if (f) {
          return
        }
        p._viewportWidth = an;
        p._viewportHeight = ao
      },
      parseBox: function(al) {
        al = al || 0;
        var aj = typeof al,
          am, ak;
        if (aj === "number") {
          return {
            top: al,
            right: al,
            bottom: al,
            left: al
          }
        } else {
          if (aj !== "string") {
            return al
          }
        }
        am = al.split(" ");
        ak = am.length;
        if (ak === 1) {
          am[1] = am[2] = am[3] = am[0]
        } else {
          if (ak === 2) {
            am[2] = am[0];
            am[3] = am[1]
          } else {
            if (ak === 3) {
              am[3] = am[1]
            }
          }
        }
        return {
          top: parseFloat(am[0]) || 0,
          right: parseFloat(am[1]) || 0,
          bottom: parseFloat(am[2]) || 0,
          left: parseFloat(am[3]) || 0
        }
      },
      parseStyles: function(ak) {
        var aj = {},
          al;
        if (ak) {
          ai.lastIndex = 0;
          while ((al = ai.exec(ak))) {
            aj[al[1]] = al[2] || ""
          }
        }
        return aj
      },
      select: function(aj, al, ak) {
        return Ext.fly(ak || S).select(aj, al)
      },
      query: function(ak, aj, al) {
        return Ext.fly(al || S).query(ak, aj)
      },
      unitizeBox: function(al, aj) {
        var ak = this;
        al = ak.parseBox(al);
        return ak.addUnits(al.top, aj) + " " + ak.addUnits(al.right, aj) +
          " " + ak.addUnits(al.bottom, aj) + " " + ak.addUnits(al.left,
            aj)
      },
      serializeForm: function(al) {
        var am = al.elements || (S.forms[al] || Ext.getDom(al)).elements,
          aw = false,
          av = encodeURIComponent,
          ap = "",
          ao = am.length,
          aq, aj, au, ay, ax, ar, an, at, ak;
        for (ar = 0; ar < ao; ar++) {
          aq = am[ar];
          aj = aq.name;
          au = aq.type;
          ay = aq.options;
          if (!aq.disabled && aj) {
            if (/select-(one|multiple)/i.test(au)) {
              at = ay.length;
              for (an = 0; an < at; an++) {
                ak = ay[an];
                if (ak.selected) {
                  ax = ak.hasAttribute("value");
                  ap += Ext.String.format("{0}={1}&", av(aj), av(ax ? ak.value :
                    ak.text))
                }
              }
            } else {
              if (!(/file|undefined|reset|button/i.test(au))) {
                if (!(/radio|checkbox/i.test(au) && !aq.checked) && !(au ==
                    "submit" && aw)) {
                  ap += av(aj) + "=" + av(aq.value) + "&";
                  aw = /submit/i.test(au)
                }
              }
            }
          }
        }
        return ap.substr(0, ap.length - 1)
      },
      getCommonAncestor: function(al, ak, aj) {
        h = h || new Ext.dom.Fly();
        h.attach(Ext.getDom(al));
        while (!h.isAncestor(ak)) {
          if (h.dom.parentNode) {
            h.attach(h.dom.parentNode)
          } else {
            h.attach(document.body);
            break
          }
        }
        return aj ? h.dom : Ext.get(h)
      }
    },
    addCls: function(ar, ap, au) {
      var at = this,
        am = at.getData(),
        av, an, ak, al, ao, aq, aj;
      if (!ar) {
        return at
      }
      if (!am.isSynchronized) {
        at.synchronize()
      }
      an = at.dom;
      ak = am.classMap;
      al = am.classList;
      ap = ap ? ap + z : "";
      au = au ? z + au : "";
      if (typeof ar === "string") {
        ar = ar.split(L)
      }
      for (ao = 0, aq = ar.length; ao < aq; ao++) {
        aj = ar[ao];
        if (aj) {
          aj = ap + aj + au;
          if (!ak[aj]) {
            ak[aj] = true;
            al.push(aj);
            av = true
          }
        }
      }
      if (av) {
        an.className = al.join(" ")
      }
      return at
    },
    addStyles: function(aq, ap) {
      var al = 0,
        ao = (aq || "").match(x),
        an, aj = ao.length,
        am, ak = [];
      if (aj === 1) {
        al = Math.abs(parseFloat(this.getStyle(ap[ao[0]])) || 0)
      } else {
        if (aj) {
          for (an = 0; an < aj; an++) {
            am = ao[an];
            ak.push(ap[am])
          }
          ak = this.getStyle(ak);
          for (an = 0; an < aj; an++) {
            am = ao[an];
            al += parseFloat(ak[ap[am]]) || 0
          }
        }
      }
      return al
    },
    addUnits: function(ak, aj) {
      return p.addUnits(ak, aj)
    },
    adjustDirect2DDimension: function(al) {
      var aq = this,
        ak = aq.dom,
        ao = aq.getStyle("display"),
        an = ak.style.display,
        ar = ak.style.position,
        ap = al === i ? 0 : 1,
        aj = ak.currentStyle,
        am;
      if (ao === "inline") {
        ak.style.display = "inline-block"
      }
      ak.style.position = ao.match(J) ? "absolute" : "static";
      am = (parseFloat(aj[al]) || parseFloat(aj.msTransformOrigin.split(
        " ")[ap]) * 2) % 1;
      ak.style.position = ar;
      if (ao === "inline") {
        ak.style.display = an
      }
      return am
    },
    animate: function(aj) {
      aj = new Ext.fx.Animation(aj);
      aj.setElement(this);
      this._activeAnimation = aj;
      aj.on({
        animationend: this._onAnimationEnd
      });
      Ext.Animator.run(aj);
      return aj
    },
    _onAnimationEnd: function() {
      this._activeAnimation = null
    },
    getActiveAnimation: function() {
      return this._activeAnimation
    },
    append: function() {
      this.appendChild.apply(this, arguments)
    },
    appendChild: function(al, ak) {
      var am = this,
        ao, aj, an;
      if (al.nodeType || al.dom || typeof al === "string") {
        al = Ext.getDom(al);
        am.dom.appendChild(al);
        return !ak ? Ext.get(al) : al
      } else {
        if (al.length) {
          ao = Ext.fly(document.createDocumentFragment());
          aj = al.length;
          for (an = 0; an < aj; an++) {
            ao.appendChild(al[an], ak)
          }
          am.dom.appendChild(ao.dom);
          return ak ? ao.dom : ao
        } else {
          return am.createChild(al, null, ak)
        }
      }
    },
    appendTo: function(aj) {
      Ext.getDom(aj).appendChild(this.dom);
      return this
    },
    applyStyles: function(aj) {
      if (aj) {
        if (typeof aj === "function") {
          aj = aj.call()
        }
        if (typeof aj === "string") {
          aj = p.parseStyles(aj)
        }
        if (typeof aj === "object") {
          this.setStyle(aj)
        }
      }
      return this
    },
    blur: function() {
      var aj = this,
        al = aj.dom;
      if (al !== S.body) {
        try {
          al.blur()
        } catch (ak) {}
        return aj
      } else {
        return aj.focus(undefined, al)
      }
    },
    cacheScrollValues: function() {
      var an = this,
        ao = [],
        am = [],
        ap, al, ak, aj;
      F = F || new Ext.dom.Fly();
      ap = an.query("*");
      for (ak = 0, aj = ap.length; ak < aj; ak++) {
        al = ap[ak];
        if (al.scrollTop > 0 || al.scrollLeft !== 0) {
          am.push(al);
          ao.push(F.attach(al).getScroll())
        }
      }
      return function() {
        var ar, at, aq;
        for (at = 0, aq = am.length; at < aq; at++) {
          ar = ao[at];
          F.attach(am[at]);
          F.setScrollLeft(ar.left);
          F.setScrollTop(ar.top)
        }
      }
    },
    center: function(aj) {
      return this.alignTo(aj || S, "c-c")
    },
    child: function(aj, ak) {
      var al = this,
        am = Ext.get(al).id;
      return al.selectNode(Ext.makeIdSelector(am) + " > " + aj, !!ak)
    },
    clone: function(aj, ak) {
      var al = this.dom.cloneNode(aj);
      if (Ext.supports.CloneNodeCopiesExpando) {
        K(al, aj)
      }
      return ak ? al : Ext.get(al)
    },
    constrainScrollLeft: function(aj) {
      var ak = this.dom;
      return Math.max(Math.min(aj, ak.scrollWidth - ak.clientWidth), 0)
    },
    constrainScrollTop: function(aj) {
      var ak = this.dom;
      return Math.max(Math.min(aj, ak.scrollHeight - ak.clientHeight), 0)
    },
    createChild: function(ak, aj, al) {
      ak = ak || {
        tag: "div"
      };
      if (aj) {
        return Ext.DomHelper.insertBefore(aj, ak, al !== true)
      } else {
        return Ext.DomHelper.append(this.dom, ak, al !== true)
      }
    },
    contains: function(aj) {
      if (!aj) {
        return false
      }
      var ak = this,
        al = Ext.getDom(aj);
      return (al === ak.dom) || ak.isAncestor(al)
    },
    destroy: function() {
      var aj = this,
        ak = aj.dom;
      if (ak && ak.parentNode) {
        ak.parentNode.removeChild(ak)
      }
      aj.collect();
      if (!aj.isFly) {
        aj.callParent()
      }
    },
    detach: function() {
      var aj = this.dom;
      if (aj && aj.parentNode && aj.tagName !== "BODY") {
        aj.parentNode.removeChild(aj)
      }
      return this
    },
    disableShadow: function() {
      var aj = this.shadow;
      if (aj) {
        aj.hide();
        aj.disabled = true
      }
    },
    disableShim: function() {
      var aj = this.shim;
      if (aj) {
        aj.hide();
        aj.disabled = true
      }
    },
    disableTouchContextMenu: function() {
      this._contextMenuListenerRemover = this.on({
        MSHoldVisual: function(aj) {
          aj.preventDefault()
        },
        destroyable: true,
        delegated: false
      })
    },
    disableTouchScroll: function() {
      this.addCls(Z);
      this.on({
        touchmove: function(aj) {
          aj.preventDefault()
        },
        translate: false
      })
    },
    doReplaceWith: function(aj) {
      var ak = this.dom;
      ak.parentNode.replaceChild(Ext.getDom(aj), ak)
    },
    doScrollIntoView: function(aj, an, ak, ao, av, ar) {
      F = F || new Ext.dom.Fly();
      var at = this,
        ap = at.dom,
        aw = F.attach(aj)[av](),
        au = aj.scrollTop,
        aq = at.getScrollIntoViewXY(aj, aw, au),
        am = aq.x,
        al = aq.y;
      if (ao) {
        if (ak) {
          ak = Ext.apply({
            listeners: {
              afteranimate: function() {
                F.attach(ap).highlight()
              }
            }
          }, ak)
        } else {
          F.attach(ap).highlight()
        }
      }
      if (al !== au) {
        F.attach(aj).scrollTo("top", al, ak)
      }
      if (an !== false && (am !== aw)) {
        F.attach(aj)[ar]("left", am, ak)
      }
      return at
    },
    down: function(aj, ak) {
      return this.selectNode(aj, !!ak)
    },
    enableShadow: function(ak, aj) {
      var al = this,
        an = al.shadow || (al.shadow = new Ext.dom.Shadow(Ext.apply({
          target: al
        }, ak))),
        am = al.shim;
      if (am) {
        am.offsets = an.outerOffsets;
        am.shadow = an;
        an.shim = am
      }
      if (aj === true || (aj !== false && al.isVisible())) {
        an.show()
      } else {
        an.hide()
      }
      an.disabled = false
    },
    enableShim: function(ak, aj) {
      var al = this,
        an = al.shim || (al.shim = new Ext.dom.Shim(Ext.apply({
          target: al
        }, ak))),
        am = al.shadow;
      if (am) {
        an.offsets = am.outerOffsets;
        an.shadow = am;
        am.shim = an
      }
      if (aj === true || (aj !== false && al.isVisible())) {
        an.show()
      } else {
        an.hide()
      }
      an.disabled = false
    },
    findParent: function(ap, ak, aj) {
      var am = this,
        an = am.dom,
        al = S.documentElement,
        ao = 0;
      if (ak || ak === 0) {
        if (typeof ak !== "number") {
          al = Ext.getDom(ak);
          ak = Number.MAX_VALUE
        }
      } else {
        ak = 50
      }
      while (an && an.nodeType === 1 && ao < ak && an !== al) {
        if (Ext.fly(an).is(ap)) {
          return aj ? Ext.get(an) : an
        }
        ao++;
        an = an.parentNode
      }
      return null
    },
    findParentNode: function(am, ak, aj) {
      var al = Ext.fly(this.dom.parentNode);
      return al ? al.findParent(am, ak, aj) : null
    },
    first: function(aj, ak) {
      return this.matchNode("nextSibling", "firstChild", aj, ak)
    },
    focus: function(am, al) {
      var aj = this;
      al = al || aj.dom;
      try {
        if (Number(am)) {
          Ext.defer(aj.focus, am, aj, [null, al])
        } else {
          Ext.GlobalEvents.fireEvent("beforefocus", al);
          al.focus()
        }
      } catch (ak) {}
      return aj
    },
    collect: function() {
      var aj = this,
        ak = aj.dom,
        am = aj.shadow,
        al = aj.shim;
      if (!aj.isFly) {
        aj.mixins.observable.destroy.call(aj);
        delete Ext.cache[aj.id];
        aj.destroyed = true;
        aj.el = null
      }
      if (ak) {
        ak._extData = aj.dom = null
      }
      if (am) {
        am.hide();
        aj.shadow = null
      }
      if (al) {
        al.hide();
        aj.shim = null
      }
    },
    getAnchorToXY: function(am, aj, al, ak) {
      return am.getAnchorXY(aj, al, ak)
    },
    getAttribute: function(aj, ak) {
      var al = this.dom;
      return ak ? (al.getAttributeNS(ak, aj) || al.getAttribute(ak + ":" +
        aj)) : (al.getAttribute(aj) || al[aj] || null)
    },
    getAttributes: function() {
      var am = this.dom.attributes,
        al = {},
        ak, an, aj;
      for (an = 0, aj = am.length; an < aj; an++) {
        ak = am[an];
        al[ak.name] = ak.value
      }
      return al
    },
    getBottom: function(aj) {
      return (aj ? this.getLocalY() : this.getY()) + this.getHeight()
    },
    getById: function(al, aj) {
      var ak = S.getElementById(al) || this.dom.querySelector(Ext.makeIdSelector(
        al));
      return aj ? ak : (ak ? Ext.get(ak) : null)
    },
    getBorderPadding: function() {
      var aj = this.getStyle(G),
        ak = this.getStyle(g);
      return {
        beforeX: (parseFloat(ak[w.l]) || 0) + (parseFloat(aj[ac.l]) || 0),
        afterX: (parseFloat(ak[w.r]) || 0) + (parseFloat(aj[ac.r]) || 0),
        beforeY: (parseFloat(ak[w.t]) || 0) + (parseFloat(aj[ac.t]) || 0),
        afterY: (parseFloat(ak[w.b]) || 0) + (parseFloat(aj[ac.b]) || 0)
      }
    },
    getBorders: function() {
      var aj = this.getStyle(g);
      return {
        beforeX: (parseFloat(aj[w.l]) || 0),
        afterX: (parseFloat(aj[w.r]) || 0),
        beforeY: (parseFloat(aj[w.t]) || 0),
        afterY: (parseFloat(aj[w.b]) || 0)
      }
    },
    getBorderWidth: function(aj) {
      return this.addStyles(aj, w)
    },
    getData: function(aj) {
      var al = this.dom,
        ak;
      if (al) {
        ak = al._extData;
        if (!ak && !aj) {
          al._extData = ak = {}
        }
      }
      return ak
    },
    getFirstChild: function() {
      return Ext.get(this.dom.firstElementChild)
    },
    getHeight: function(am, ak) {
      var al = this,
        an = al.isStyle("display", "none"),
        aj, ao;
      if (an) {
        return 0
      }
      aj = al.dom.offsetHeight;
      if (Ext.supports.Direct2DBug) {
        ao = al.adjustDirect2DDimension(Q);
        if (ak) {
          aj += ao
        } else {
          if (ao > 0 && ao < 0.5) {
            aj++
          }
        }
      }
      if (am) {
        aj -= al.getBorderWidth("tb") + al.getPadding("tb")
      }
      return (aj < 0) ? 0 : aj
    },
    getHtml: function() {
      return this.dom ? this.dom.innerHTML : ""
    },
    getLeft: function(aj) {
      return aj ? this.getLocalX() : this.getX()
    },
    getLocalX: function() {
      var al = this,
        ak, aj = al.getStyle("left");
      if (!aj || aj === "auto") {
        aj = 0
      } else {
        if (r.test(aj)) {
          aj = parseFloat(aj)
        } else {
          aj = al.getX();
          ak = al.dom.offsetParent;
          if (ak) {
            aj -= Ext.fly(ak).getX()
          }
        }
      }
      return aj
    },
    getLocalXY: function() {
      var am = this,
        al, ak = am.getStyle(["left", "top"]),
        aj = ak.left,
        an = ak.top;
      if (!aj || aj === "auto") {
        aj = 0
      } else {
        if (r.test(aj)) {
          aj = parseFloat(aj)
        } else {
          aj = am.getX();
          al = am.dom.offsetParent;
          if (al) {
            aj -= Ext.fly(al).getX()
          }
        }
      }
      if (!an || an === "auto") {
        an = 0
      } else {
        if (r.test(an)) {
          an = parseFloat(an)
        } else {
          an = am.getY();
          al = am.dom.offsetParent;
          if (al) {
            an -= Ext.fly(al).getY()
          }
        }
      }
      return [aj, an]
    },
    getLocalY: function() {
      var ak = this,
        aj, al = ak.getStyle("top");
      if (!al || al === "auto") {
        al = 0
      } else {
        if (r.test(al)) {
          al = parseFloat(al)
        } else {
          al = ak.getY();
          aj = ak.dom.offsetParent;
          if (aj) {
            al -= Ext.fly(aj).getY()
          }
        }
      }
      return al
    },
    getMargin: (function() {
      var ak = {
          t: "top",
          l: "left",
          r: "right",
          b: "bottom"
        },
        aj = ["margin-top", "margin-left", "margin-right",
          "margin-bottom"
        ];
      return function(am) {
        var ao = this,
          an, al, ap;
        if (!am) {
          an = ao.getStyle(aj);
          ap = {};
          if (an && typeof an === "object") {
            ap = {};
            for (al in m) {
              ap[al] = ap[ak[al]] = parseFloat(an[m[al]]) || 0
            }
          }
        } else {
          ap = ao.addStyles(am, m)
        }
        return ap
      }
    })(),
    getPadding: function(aj) {
      return this.addStyles(aj, ac)
    },
    getParent: function() {
      return Ext.get(this.dom.parentNode)
    },
    getRight: function(aj) {
      return (aj ? this.getLocalX() : this.getX()) + this.getWidth()
    },
    getScroll: function() {
      var al = this,
        ao = al.dom,
        ak = S.documentElement,
        an, am, aj = document.body;
      if (ao === S || ao === aj) {
        an = ak.scrollLeft || (aj ? aj.scrollLeft : 0);
        am = ak.scrollTop || (aj ? aj.scrollTop : 0)
      } else {
        an = ao.scrollLeft;
        am = ao.scrollTop
      }
      return {
        left: an,
        top: am
      }
    },
    getScrollIntoViewXY: function(ao, aw, av) {
      var ay = this.dom,
        ak = Ext.getDom(ao),
        al = this.getOffsetsTo(ak),
        au = ay.offsetWidth,
        aq = ay.offsetHeight,
        aj = al[0] + aw,
        ap = al[1] + av,
        an = ap + aq,
        aA = aj + au,
        ar = ak.clientHeight,
        ax = ak.clientWidth,
        az = aw,
        at = av,
        am = at + ar,
        aB = az + ax;
      if (aq > ar || ap < at) {
        av = ap
      } else {
        if (an > am) {
          av = an - ar
        }
      }
      if (au > ax || aj < az) {
        aw = aj
      } else {
        if (aA > aB) {
          aw = aA - ax
        }
      }
      return {
        x: aw,
        y: av
      }
    },
    getScrollLeft: function() {
      var aj = this.dom;
      if (aj === S || aj === document.body) {
        return this.getScroll().left
      } else {
        return aj.scrollLeft
      }
    },
    getScrollTop: function() {
      var aj = this.dom;
      if (aj === S || aj === document.body) {
        return this.getScroll().top
      } else {
        return aj.scrollTop
      }
    },
    getSize: function(aj) {
      return {
        width: this.getWidth(aj),
        height: this.getHeight(aj)
      }
    },
    getStyle: function(aw, aq) {
      var ar = this,
        am = ar.dom,
        az = typeof aw !== "string",
        ax = ar.styleHooks,
        ak = aw,
        at = ak,
        ap = 1,
        ao, ay, av, au, al, aj, an;
      if (az) {
        av = {};
        ak = at[0];
        an = 0;
        if (!(ap = at.length)) {
          return av
        }
      }
      if (!am || am.documentElement) {
        return av || ""
      }
      ao = am.style;
      if (aq) {
        aj = ao
      } else {
        aj = am.ownerDocument.defaultView.getComputedStyle(am, null);
        if (!aj) {
          aq = true;
          aj = ao
        }
      }
      do {
        au = ax[ak];
        if (!au) {
          ax[ak] = au = {
            name: p.normalize(ak)
          }
        }
        if (au.get) {
          al = au.get(am, ar, aq, aj)
        } else {
          ay = au.name;
          al = aj[ay]
        }
        if (!az) {
          return al
        }
        av[ak] = al;
        ak = at[++an]
      } while (an < ap);
      return av
    },
    getStyleValue: function(aj) {
      return this.dom.style.getPropertyValue(aj)
    },
    getTop: function(aj) {
      return aj ? this.getLocalY() : this.getY()
    },
    getValue: function(ak) {
      var aj = this.dom.value;
      return ak ? parseInt(aj, 10) : aj
    },
    getViewSize: function() {
      var aj = this.dom;
      if (aj === S || aj === S.body) {
        return {
          width: p.getViewportWidth(),
          height: p.getViewportHeight()
        }
      } else {
        return {
          width: aj.clientWidth,
          height: aj.clientHeight
        }
      }
    },
    getVisibilityMode: function() {
      var aj = this,
        ak = aj.getData(),
        al = ak.visibilityMode;
      if (al === undefined) {
        ak.visibilityMode = al = p.DISPLAY
      }
      return al
    },
    getWidth: function(aj, ao) {
      var am = this,
        ap = am.dom,
        an = am.isStyle("display", "none"),
        al, ak, aq;
      if (an) {
        return 0
      }
      if (Ext.supports.BoundingClientRect) {
        al = ap.getBoundingClientRect();
        ak = (am.vertical && !Ext.supports.RotatedBoundingClientRect) ? (
          al.bottom - al.top) : (al.right - al.left);
        ak = ao ? ak : Math.ceil(ak)
      } else {
        ak = ap.offsetWidth
      }
      if (Ext.supports.Direct2DBug && !am.vertical) {
        aq = am.adjustDirect2DDimension(i);
        if (ao) {
          ak += aq
        } else {
          if (aq > 0 && aq < 0.5) {
            ak++
          }
        }
      }
      if (aj) {
        ak -= am.getBorderWidth("lr") + am.getPadding("lr")
      }
      return (ak < 0) ? 0 : ak
    },
    getX: function() {
      return this.getXY()[0]
    },
    getXY: function() {
      var al = Math.round,
        ao = this.dom,
        ak = 0,
        ap = 0,
        an, aj;
      if (ao !== S && ao !== S.body) {
        try {
          an = ao.getBoundingClientRect()
        } catch (am) {
          an = {
            left: 0,
            top: 0
          }
        }
        ak = al(an.left);
        ap = al(an.top);
        aj = Ext.getDoc().getScroll();
        ak += aj.left;
        ap += aj.top
      }
      return [ak, ap]
    },
    getY: function() {
      return this.getXY()[1]
    },
    getZIndex: function() {
      return parseInt(this.getStyle("z-index"), 10)
    },
    hasCls: function(aj) {
      var ak = this.getData();
      if (!ak.isSynchronized) {
        this.synchronize()
      }
      return ak.classMap.hasOwnProperty(aj)
    },
    hide: function() {
      this.setVisible(false);
      return this
    },
    insertAfter: function(aj) {
      aj = Ext.getDom(aj);
      aj.parentNode.insertBefore(this.dom, aj.nextSibling);
      return this
    },
    insertBefore: function(aj) {
      aj = Ext.getDom(aj);
      aj.parentNode.insertBefore(this.dom, aj);
      return this
    },
    insertFirst: function(ak, aj) {
      ak = ak || {};
      if (ak.nodeType || ak.dom || typeof ak === "string") {
        ak = Ext.getDom(ak);
        this.dom.insertBefore(ak, this.dom.firstChild);
        return !aj ? Ext.get(ak) : ak
      } else {
        return this.createChild(ak, this.dom.firstChild, aj)
      }
    },
    insertHtml: function(ak, al, aj) {
      var am = Ext.DomHelper.insertHtml(ak, this.dom, al);
      return aj ? Ext.get(am) : am
    },
    insertSibling: function(ak, an, aq) {
      var ap = this,
        ar = Ext.DomHelper,
        at = (an || "before").toLowerCase() === "after",
        am, aj, al, ao;
      if (Ext.isIterable(ak)) {
        al = ak.length;
        aj = Ext.fly(document.createDocumentFragment());
        if (Ext.isArray(ak)) {
          for (ao = 0; ao < al; ao++) {
            am = aj.appendChild(ak[ao], aq)
          }
        } else {
          for (ao = 0; ao < al; ao++) {
            aj.dom.appendChild(am = ak[0])
          }
          if (aq === false) {
            am = Ext.get(am)
          }
        }
        ap.dom.parentNode.insertBefore(aj.dom, at ? ap.dom.nextSibling :
          ap.dom);
        return am
      }
      ak = ak || {};
      if (ak.nodeType || ak.dom) {
        am = ap.dom.parentNode.insertBefore(Ext.getDom(ak), at ? ap.dom.nextSibling :
          ap.dom);
        if (!aq) {
          am = Ext.get(am)
        }
      } else {
        if (at && !ap.dom.nextSibling) {
          am = ar.append(ap.dom.parentNode, ak, !aq)
        } else {
          am = ar[at ? "insertAfter" : "insertBefore"](ap.dom, ak, !aq)
        }
      }
      return am
    },
    is: function(aj) {
      var al = this.dom,
        ak;
      if (!aj) {
        ak = true
      } else {
        if (!al.tagName) {
          ak = false
        } else {
          if (Ext.isFunction(aj)) {
            ak = aj(al)
          } else {
            ak = al[Ext.supports.matchesSelector](aj)
          }
        }
      }
      return ak
    },
    isAncestor: function(ak) {
      var aj = false,
        al = this.dom,
        am = Ext.getDom(ak);
      if (al && am) {
        if (al.contains) {
          return al.contains(am)
        } else {
          if (al.compareDocumentPosition) {
            return !!(al.compareDocumentPosition(am) & 16)
          } else {
            while ((am = am.parentNode)) {
              aj = am === al || aj
            }
          }
        }
      }
      return aj
    },
    isPainted: (function() {
      return !Ext.browser.is.IE ? function() {
        var aj = this.dom;
        return Boolean(aj && aj.offsetParent)
      } : function() {
        var aj = this.dom;
        return Boolean(aj && (aj.offsetHeight !== 0 && aj.offsetWidth !==
          0))
      }
    })(),
    isScrollable: function() {
      var aj = this.dom;
      return aj.scrollHeight > aj.clientHeight || aj.scrollWidth > aj.clientWidth
    },
    isStyle: function(aj, ak) {
      return this.getStyle(aj) === ak
    },
    isVisible: function(ak) {
      var al = this.dom,
        aj;
      if (!al) {
        return false
      }
      if (!Y) {
        Y = new Ext.dom.Fly()
      }
      for (aj = al.ownerDocument.documentElement; al !== aj; al = al.parentNode) {
        if (!al || al.nodeType === 11 || (Y.attach(al)).isStyle(k, ae) ||
          Y.isStyle(d, V)) {
          return false
        }
        if (!ak) {
          break
        }
      }
      return true
    },
    last: function(aj, ak) {
      return this.matchNode("previousSibling", "lastChild", aj, ak)
    },
    matchNode: function(ak, ao, aj, al) {
      var am = this.dom,
        an;
      if (!am) {
        return null
      }
      an = am[ao];
      while (an) {
        if (an.nodeType === 1 && (!aj || Ext.fly(an, "_matchNode").is(aj))) {
          return !al ? Ext.get(an) : an
        }
        an = an[ak]
      }
      return null
    },
    next: function(aj, ak) {
      return this.matchNode("nextSibling", "nextSibling", aj, ak)
    },
    parent: function(aj, ak) {
      return this.matchNode("parentNode", "parentNode", aj, ak)
    },
    position: function(an, am, aj, al) {
      var ak = this;
      if (ak.dom.tagName !== "BODY") {
        if (!an && ak.isStyle(X, t)) {
          ak.setStyle(X, s)
        } else {
          if (an) {
            ak.setStyle(X, an)
          }
        }
        if (am) {
          ak.setStyle(n, am)
        }
        if (aj || al) {
          ak.setXY([aj || false, al || false])
        }
      }
    },
    prev: function(aj, ak) {
      return this.matchNode("previousSibling", "previousSibling", aj, ak)
    },
    query: function(al, au, ar) {
      var an = this.dom,
        ap, aq, at, ak, aj, ao, am;
      if (!an) {
        return null
      }
      au = (au !== false);
      al = al.split(",");
      if (!ar) {
        ap = []
      }
      for (ao = 0, aq = al.length; ao < aq; ao++) {
        if (typeof al[ao] === "string") {
          if (ar) {
            ak = an.querySelector(al[ao]);
            return au ? ak : Ext.get(ak)
          }
          aj = an.querySelectorAll(al[ao]);
          for (am = 0, at = aj.length; am < at; am++) {
            ap.push(au ? aj[am] : Ext.get(aj[am]))
          }
        }
      }
      return ap
    },
    radioCls: function(am) {
      var an = this.dom.parentNode.childNodes,
        ak;
      am = Ext.isArray(am) ? am : [am];
      for (var al = 0, aj = an.length; al < aj; al++) {
        ak = an[al];
        if (ak && ak.nodeType === 1) {
          Ext.fly(ak).removeCls(am)
        }
      }
      return this.addCls(am)
    },
    redraw: function() {
      var ak = this.dom,
        aj = ak.style;
      aj.display = "none";
      ak.offsetHeight;
      aj.display = ""
    },
    remove: function() {
      this.destroy()
    },
    removeChild: function(aj) {
      this.dom.removeChild(Ext.getDom(aj));
      return this
    },
    removeCls: function(ar, ap, au) {
      var at = this,
        am = at.getData(),
        av, an, ak, al, ao, aq, aj;
      if (!ar) {
        return at
      }
      if (!am.isSynchronized) {
        at.synchronize()
      }
      an = at.dom;
      ak = am.classMap;
      al = am.classList;
      ap = ap ? ap + z : "";
      au = au ? z + au : "";
      if (typeof ar === "string") {
        ar = ar.split(L)
      }
      for (ao = 0, aq = ar.length; ao < aq; ao++) {
        aj = ar[ao];
        if (aj) {
          aj = ap + aj + au;
          if (ak[aj]) {
            delete ak[aj];
            Ext.Array.remove(al, aj);
            av = true
          }
        }
      }
      if (av) {
        an.className = al.join(" ")
      }
      return at
    },
    repaint: function() {
      var aj = this;
      aj.addCls("x-repaint");
      Ext.defer(function() {
        if (aj.dom) {
          Ext.fly(aj.dom).removeCls("x-repaint")
        }
      }, 1);
      return aj
    },
    replace: function(al, ak) {
      al = Ext.getDom(al);
      var aj = al.parentNode,
        an = al.id,
        am = this.dom;
      if (ak !== false && an && Ext.cache[an]) {
        aj.insertBefore(am, al);
        Ext.get(al).destroy()
      } else {
        aj.replaceChild(am, al)
      }
      return this
    },
    replaceCls: function(al, at, aq, av) {
      var au = this,
        ao, ak, am, ap, ar, aj, an = au.getData();
      if (!al && !at) {
        return au
      }
      al = al || [];
      at = at || [];
      if (!an.isSynchronized) {
        au.synchronize()
      }
      if (!av) {
        av = ""
      }
      ao = au.dom;
      ak = an.classMap;
      am = an.classList;
      aq = aq ? aq + z : "";
      av = av ? z + av : "";
      if (typeof al === "string") {
        al = al.split(L)
      }
      if (typeof at === "string") {
        at = at.split(L)
      }
      for (ap = 0, ar = al.length; ap < ar; ap++) {
        aj = aq + al[ap] + av;
        if (ak[aj]) {
          delete ak[aj];
          Ext.Array.remove(am, aj)
        }
      }
      for (ap = 0, ar = at.length; ap < ar; ap++) {
        aj = aq + at[ap] + av;
        if (!ak[aj]) {
          ak[aj] = true;
          am.push(aj)
        }
      }
      ao.className = am.join(" ");
      return au
    },
    replaceWith: function(am) {
      var an = this,
        ao = an.dom,
        al = ao.parentNode,
        aj = Ext.cache,
        ak;
      an.clearListeners();
      if (am.nodeType || am.dom || typeof am === "string") {
        am = Ext.get(am);
        ak = al.insertBefore(am.dom, ao)
      } else {
        ak = Ext.DomHelper.insertBefore(ao, am)
      }
      al.removeChild(ao);
      an.dom = ak;
      if (!an.isFly) {
        delete aj[an.id];
        aj[an.id = Ext.id(ak)] = an
      }
      return an
    },
    resolveListenerScope: function(ak) {
      var aj = this.component;
      return aj ? aj.resolveListenerScope(ak) : this
    },
    scroll: function(ar, aj, al) {
      if (!this.isScrollable()) {
        return false
      }
      ar = ar.charAt(0);
      var aq = this,
        an = aq.dom,
        ap = ar === "r" || ar === "l" ? "left" : "top",
        ak = false,
        am, ao;
      if (ar === "l" || ar === "t" || ar === "u") {
        aj = -aj
      }
      if (ap === "left") {
        am = an.scrollLeft;
        ao = aq.constrainScrollLeft(am + aj)
      } else {
        am = an.scrollTop;
        ao = aq.constrainScrollTop(am + aj)
      }
      if (ao !== am) {
        this.scrollTo(ap, ao, al);
        ak = true
      }
      return ak
    },
    scrollBy: function(ak, aj, al) {
      var am = this,
        an = am.dom;
      if (ak.length) {
        al = aj;
        aj = ak[1];
        ak = ak[0]
      } else {
        if (typeof ak != "number") {
          al = aj;
          aj = ak.y;
          ak = ak.x
        }
      }
      if (ak) {
        am.scrollTo("left", am.constrainScrollLeft(an.scrollLeft + ak),
          al)
      }
      if (aj) {
        am.scrollTo("top", am.constrainScrollTop(an.scrollTop + aj), al)
      }
      return am
    },
    scrollChildIntoView: function(ak, aj) {
      Ext.fly(ak).scrollIntoView(this, aj)
    },
    scrollIntoView: function(aj, am, al, ak) {
      aj = Ext.getDom(aj) || Ext.getBody().dom;
      return this.doScrollIntoView(aj, am, al, ak, "getScrollLeft",
        "scrollTo")
    },
    scrollTo: function(al, an, aj) {
      var ao = c.test(al),
        am = this,
        aq = ao ? "scrollTop" : "scrollLeft",
        ap = am.dom,
        ak;
      if (!aj || !am.anim) {
        ap[aq] = an;
        ap[aq] = an
      } else {
        ak = {
          to: {}
        };
        ak.to[aq] = an;
        if (Ext.isObject(aj)) {
          Ext.applyIf(ak, aj)
        }
        am.animate(ak)
      }
      return am
    },
    select: function(ak, am) {
      var aj, al;
      if (typeof ak === "string") {
        al = this.query(ak, !am)
      } else {
        al = ak;
        aj = true
      }
      return am ? new Ext.CompositeElement(al, !aj) : new Ext.CompositeElementLite(
        al, true)
    },
    selectNode: function(ak, aj) {
      return this.query(ak, aj, true)
    },
    set: function(aj, ak) {
      var am = this,
        ao = am.dom,
        al, an;
      for (al in aj) {
        if (aj.hasOwnProperty(al)) {
          an = aj[al];
          if (al === "style") {
            am.applyStyles(an)
          } else {
            if (al === "cls") {
              ao.className = an
            } else {
              if (ak !== false) {
                if (an === undefined) {
                  ao.removeAttribute(al)
                } else {
                  ao.setAttribute(al, an)
                }
              } else {
                ao[al] = an
              }
            }
          }
        }
      }
      return am
    },
    setBottom: function(aj) {
      this.dom.style[N] = p.addUnits(aj);
      return this
    },
    setCls: function(am) {
      var ao = this,
        al = ao.getData(),
        ak, an, aj, ap;
      if (!al.isSynchronized) {
        ao.synchronize()
      }
      ap = al.classMap;
      if (typeof am === "string") {
        am = am.split(L)
      }
      for (ak = 0, an = am.length; ak < an; ak++) {
        aj = am[ak];
        if (!ap[aj]) {
          ap[aj] = true
        }
      }
      al.classList = am.slice();
      ao.dom.className = am.join(" ")
    },
    setDisplayed: function(ak) {
      var aj = this;
      if (typeof ak === "boolean") {
        ak = ak ? aj._getDisplay() : V
      }
      aj.setStyle(d, ak);
      if (aj.shadow || aj.shim) {
        aj.setUnderlaysVisible(ak !== V)
      }
      return aj
    },
    setHeight: function(aj) {
      var ak = this;
      ak.dom.style[Q] = p.addUnits(aj);
      if (ak.shadow || ak.shim) {
        ak.syncUnderlays()
      }
      return ak
    },
    setHtml: function(aj) {
      if (this.dom) {
        this.dom.innerHTML = aj
      }
      return this
    },
    setId: function(am) {
      var al = this,
        aj = al.id,
        ak = Ext.cache;
      if (aj) {
        delete ak[aj]
      }
      al.dom.id = am;
      al.id = am;
      ak[am] = al;
      return al
    },
    setLeft: function(ak) {
      var aj = this;
      aj.dom.style[H] = p.addUnits(ak);
      if (aj.shadow || aj.shim) {
        aj.syncUnderlays()
      }
      return aj
    },
    setLocalX: function(aj) {
      var al = this,
        ak = al.dom.style;
      ak.right = "auto";
      ak.left = (aj === null) ? "auto" : aj + "px";
      if (al.shadow || al.shim) {
        al.syncUnderlays()
      }
      return al
    },
    setLocalXY: function(aj, am) {
      var al = this,
        ak = al.dom.style;
      ak.right = "auto";
      if (aj && aj.length) {
        am = aj[1];
        aj = aj[0]
      }
      if (aj === null) {
        ak.left = "auto"
      } else {
        if (aj !== undefined) {
          ak.left = aj + "px"
        }
      }
      if (am === null) {
        ak.top = "auto"
      } else {
        if (am !== undefined) {
          ak.top = am + "px"
        }
      }
      if (al.shadow || al.shim) {
        al.syncUnderlays()
      }
      return al
    },
    setLocalY: function(ak) {
      var aj = this;
      aj.dom.style.top = (ak === null) ? "auto" : ak + "px";
      if (aj.shadow || aj.shim) {
        aj.syncUnderlays()
      }
      return aj
    },
    setMargin: function(al) {
      var ak = this,
        aj = ak.dom.style;
      if (al || al === 0) {
        al = ak.self.unitizeBox((al === true) ? 5 : al);
        aj.setProperty("margin", al, "important")
      } else {
        aj.removeProperty("margin-top");
        aj.removeProperty("margin-right");
        aj.removeProperty("margin-bottom");
        aj.removeProperty("margin-left")
      }
    },
    setMaxHeight: function(aj) {
      this.dom.style[D] = p.addUnits(aj);
      return this
    },
    setMaxWidth: function(aj) {
      this.dom.style[q] = p.addUnits(aj);
      return this
    },
    setMinHeight: function(aj) {
      this.dom.style[e] = p.addUnits(aj);
      return this
    },
    setMinWidth: function(aj) {
      this.dom.style[ad] = p.addUnits(aj);
      return this
    },
    setOpacity: function(aj) {
      var ak = this;
      if (ak.dom) {
        ak.setStyle("opacity", aj)
      }
      return ak
    },
    setPadding: function(al) {
      var ak = this,
        aj = ak.dom.style;
      if (al || al === 0) {
        al = ak.self.unitizeBox((al === true) ? 5 : al);
        aj.setProperty("padding", al, "important")
      } else {
        aj.removeProperty("padding-top");
        aj.removeProperty("padding-right");
        aj.removeProperty("padding-bottom");
        aj.removeProperty("padding-left")
      }
    },
    setRight: function(aj) {
      this.dom.style[ah] = p.addUnits(aj);
      return this
    },
    setScrollLeft: function(aj) {
      this.dom.scrollLeft = aj;
      return this
    },
    setScrollTop: function(aj) {
      this.dom.scrollTop = aj;
      return this
    },
    setSize: function(al, aj) {
      var am = this,
        ak = am.dom.style;
      if (Ext.isObject(al)) {
        aj = al.height;
        al = al.width
      }
      ak.width = p.addUnits(al);
      ak.height = p.addUnits(aj);
      if (am.shadow || am.shim) {
        am.syncUnderlays()
      }
      return am
    },
    setSizeState: function(al) {
      var ak = this,
        am, aj;
      if (al === true) {
        am = B;
        aj = [O, I]
      } else {
        if (al === false) {
          am = O;
          aj = [B, I]
        } else {
          if (al === null) {
            am = I;
            aj = [B, O]
          } else {
            aj = [B, O, I]
          }
        }
      }
      if (am) {
        ak.addCls(am)
      }
      ak.removeCls(aj);
      return ak
    },
    setStyle: function(aq, ao) {
      var am = this,
        ap = am.dom,
        aj = am.styleHooks,
        al = ap.style,
        ak = aq,
        an;
      if (typeof ak === "string") {
        an = aj[ak];
        if (!an) {
          aj[ak] = an = {
            name: p.normalize(ak)
          }
        }
        ao = (ao == null) ? "" : ao;
        if (an.set) {
          an.set(ap, ao, am)
        } else {
          al[an.name] = ao
        }
        if (an.afterSet) {
          an.afterSet(ap, ao, am)
        }
      } else {
        for (ak in aq) {
          if (aq.hasOwnProperty(ak)) {
            an = aj[ak];
            if (!an) {
              aj[ak] = an = {
                name: p.normalize(ak)
              }
            }
            ao = aq[ak];
            ao = (ao == null) ? "" : ao;
            if (an.set) {
              an.set(ap, ao, am)
            } else {
              al[an.name] = ao
            }
            if (an.afterSet) {
              an.afterSet(ap, ao, am)
            }
          }
        }
      }
      return am
    },
    setText: function(aj) {
      this.dom.textContent = aj
    },
    setTop: function(ak) {
      var aj = this;
      aj.dom.style[T] = p.addUnits(ak);
      if (aj.shadow || aj.shim) {
        aj.syncUnderlays()
      }
      return aj
    },
    setUnderlaysVisible: function(aj) {
      var al = this.shadow,
        ak = this.shim;
      if (al && !al.disabled) {
        if (aj) {
          al.show()
        } else {
          al.hide()
        }
      }
      if (ak && !ak.disabled) {
        if (aj) {
          ak.show()
        } else {
          ak.hide()
        }
      }
    },
    setVisibility: function(aj) {
      var ak = this.dom.style;
      if (aj) {
        ak.removeProperty("visibility")
      } else {
        ak.setProperty("visibility", "hidden", "important")
      }
    },
    setVisibilityMode: function(aj) {
      this.getData().visibilityMode = aj;
      return this
    },
    setVisible: function(al) {
      var aj = this,
        ak = aj.getVisibilityMode(),
        am = al ? "removeCls" : "addCls";
      switch (ak) {
        case p.DISPLAY:
          aj.removeCls([E, l, a]);
          aj[am](C);
          break;
        case p.VISIBILITY:
          aj.removeCls([C, l, a]);
          aj[am](E);
          break;
        case p.OFFSETS:
          aj.removeCls([E, C, a]);
          aj[am](l);
          break;
        case p.CLIP:
          aj.removeCls([E, C, l]);
          aj[am](a);
          break
      }
      if (aj.shadow || aj.shim) {
        aj.setUnderlaysVisible(al)
      }
      return aj
    },
    setWidth: function(aj) {
      var ak = this;
      ak.dom.style[i] = p.addUnits(aj);
      if (ak.shadow || ak.shim) {
        ak.syncUnderlays()
      }
      return ak
    },
    setX: function(aj) {
      return this.setXY([aj, false])
    },
    setXY: function(al) {
      var ak = this,
        am = ak.translatePoints(al),
        aj = ak.dom.style,
        an;
      ak.position();
      aj.right = "auto";
      for (an in am) {
        if (!isNaN(am[an])) {
          aj[an] = am[an] + "px"
        }
      }
      if (ak.shadow || ak.shim) {
        ak.syncUnderlays()
      }
      return ak
    },
    setY: function(aj) {
      return this.setXY([false, aj])
    },
    setZIndex: function(aj) {
      var ak = this;
      if (ak.shadow) {
        ak.shadow.setZIndex(aj)
      }
      if (ak.shim) {
        ak.shim.setZIndex(aj)
      }
      return ak.setStyle("z-index", aj)
    },
    show: function() {
      this.setVisible(true);
      return this
    },
    swapCls: function(ak, ap, aj, an) {
      if (aj === undefined) {
        aj = true
      }
      var am = this,
        ao = aj ? ak : ap,
        al = aj ? ap : ak;
      if (al) {
        am.removeCls(an ? an + "-" + al : al)
      }
      if (ao) {
        am.addCls(an ? an + "-" + ao : ao)
      }
      return am
    },
    synchronize: function() {
      var aq = this,
        am = aq.dom,
        ar = {},
        ap = am.className,
        ak, an, ao, aj, al = aq.getData();
      if (ap && ap.length > 0) {
        ak = am.className.split(af);
        for (an = 0, ao = ak.length; an < ao; an++) {
          aj = ak[an];
          ar[aj] = true
        }
      } else {
        ak = []
      }
      al.classList = ak;
      al.classMap = ar;
      al.isSynchronized = true;
      return aq
    },
    syncUnderlays: function() {
      var am = this,
        aq = am.shadow,
        aj = am.shim,
        ak = am.dom,
        ar, ao, an, ap, al;
      if (am.isVisible()) {
        ar = am.getXY();
        ao = ar[0];
        an = ar[1];
        ap = ak.offsetWidth;
        al = ak.offsetHeight;
        if (aq && !aq.hidden) {
          aq.realign(ao, an, ap, al)
        }
        if (aj && !aj.hidden) {
          aj.realign(ao, an, ap, al)
        }
      }
    },
    toggleCls: function(aj, ak) {
      if (typeof ak !== "boolean") {
        ak = !this.hasCls(aj)
      }
      return ak ? this.addCls(aj) : this.removeCls(aj)
    },
    toggle: function() {
      this.setVisible(!this.isVisible());
      return this
    },
    translate: function() {
      var aj = "webkitTransform" in S.createElement("div").style ?
        "webkitTransform" : "transform";
      return function(ak, am, al) {
        this.dom.style[aj] = "translate3d(" + (ak || 0) + "px, " + (am ||
          0) + "px, " + (al || 0) + "px)"
      }
    }(),
    unwrap: function() {
      var ao = this.dom,
        aj = ao.parentNode,
        al, an = Ext.fly(Ext.Element.getActiveElement()),
        am, ak;
      am = Ext.cache[an.id];
      if (am) {
        an = am
      }
      if (this.contains(an)) {
        if (am) {
          an.suspendEvent("focus", "blur")
        }
        Ext.suspendFocus();
        ak = true
      }
      if (aj) {
        al = aj.parentNode;
        al.insertBefore(ao, aj);
        al.removeChild(aj)
      } else {
        al = document.createDocumentFragment();
        al.appendChild(ao)
      }
      if (ak) {
        if (am) {
          an.focus();
          an.resumeEvent("focus", "blur")
        } else {
          Ext.fly(an).focus()
        }
        Ext.resumeFocus()
      }
      return this
    },
    up: function(al, aj, ak) {
      return this.findParentNode(al, aj, !ak)
    },
    update: function(aj) {
      return this.setHtml(aj)
    },
    wrap: function(al, at, ao) {
      var ar = this,
        ap = ar.dom,
        an = Ext.DomHelper.insertBefore(ap, al || {
          tag: "div"
        }, !at),
        aq = an,
        ak = Ext.Element.getActiveElement(),
        am, aj;
      am = Ext.cache[ak.id];
      if (am) {
        ak = am
      }
      if (ao) {
        aq = an.selectNode(ao, at)
      }
      if (ar.contains(ak)) {
        Ext.suspendFocus();
        if (am) {
          ak.suspendEvent("focus", "blur")
        }
        aj = true
      }
      aq.appendChild(ap);
      if (aj) {
        if (am) {
          ak.focus();
          ak.resumeEvent("focus", "blur")
        } else {
          Ext.fly(ak).focus()
        }
        Ext.resumeFocus()
      }
      return an
    },
    privates: {
      doAddListener: function(ao, ar, at, au, ak, aj, al) {
        var aq = this,
          am, an, ap;
        ao = Ext.canonicalEventName(ao);
        if (!aq.blockedEvents[ao]) {
          am = aq.mixins.observable.doAddListener;
          au = au || {};
          if (aq.longpressEvents[ao]) {
            aq.disableTouchContextMenu()
          }
          if (p.useDelegatedEvents === false) {
            au.delegated = au.delegated || false
          }
          if (au.translate !== false) {
            an = aq.additiveEvents[ao];
            if (an) {
              au.type = ao;
              ao = an;
              am.call(aq, ao, ar, at, au, ak, aj, al)
            }
            ap = aq.eventMap[ao];
            if (ap) {
              au.type = au.type || ao;
              ao = ap
            }
          }
          am.call(aq, ao, ar, at, au, ak, aj, al);
          delete au.type
        }
      },
      doRemoveListener: function(aj, an, am) {
        var ao = this,
          al, aq, ap, ak;
        if (!ao.blockedEvents[aj]) {
          al = ao.mixins.observable.doRemoveListener;
          if (ao.longpressEvents[aj]) {
            ak = this._contextMenuListenerRemover;
            if (ak) {
              ak.destroy()
            }
          }
          ap = ao.additiveEvents[aj];
          if (ap) {
            aj = ap;
            al.call(ao, aj, an, am)
          }
          aq = ao.eventMap[aj];
          if (aq) {
            al.call(ao, aq, an, am)
          }
          al.call(ao, aj, an, am)
        }
      },
      _initEvent: function(aj) {
        return (this.events[aj] = new Ext.dom.ElementEvent(this, aj))
      },
      _getDisplay: function() {
        var aj = this.getData(),
          ak = aj[v];
        if (ak === undefined) {
          aj[v] = ak = ""
        }
        return ak
      },
      _getPublisher: function(aj) {
        var al = Ext.event.publisher.Publisher,
          ak = al.publishersByEvent[aj];
        if (!ak || (this.dom === window && aj === "resize")) {
          ak = al.publishers.dom
        }
        return ak
      }
    },
    deprecated: {
      "5.0": {
        methods: {
          cssTranslate: null,
          getHTML: "getHtml",
          getOuterHeight: null,
          getOuterWidth: null,
          getPageBox: function(al) {
            var ao = this,
              am = ao.dom,
              aq = am.nodeName === "BODY",
              ar = aq ? p.getViewportWidth() : am.offsetWidth,
              an = aq ? p.getViewportHeight() : am.offsetHeight,
              au = ao.getXY(),
              at = au[1],
              aj = au[0] + ar,
              ap = au[1] + an,
              ak = au[0];
            if (al) {
              return new Ext.util.Region(at, aj, ap, ak)
            } else {
              return {
                left: ak,
                top: at,
                width: ar,
                height: an,
                right: aj,
                bottom: ap
              }
            }
          },
          getScrollParent: null,
          isDescendent: null,
          isTransparent: function(ak) {
            var aj = this.getStyle(ak);
            return aj ? b.test(aj) : false
          },
          purgeAllListeners: "clearListeners",
          removeAllListeners: "clearListeners",
          setHTML: "setHtml",
          setTopLeft: null
        }
      }
    }
  }
}, 1, 0, 0, 0, 0, [
  [Ext.util.Positionable.prototype.mixinId || Ext.util.Positionable.$className,
    Ext.util.Positionable
  ],
  [Ext.mixin.Observable.prototype.mixinId || Ext.mixin.Observable.$className,
    Ext.mixin.Observable
  ]
], [Ext.dom, "Element", Ext, "Element"], function(p) {
  var b = document,
    l = p.prototype,
    w = Ext.supports,
    D = "pointerdown",
    e = "pointermove",
    c = "pointerup",
    d = "pointercancel",
    h = "MSPointerDown",
    m = "MSPointerMove",
    z = "MSPointerUp",
    a = "MSPointerCancel",
    s = "mousedown",
    y = "mousemove",
    t = "mouseup",
    E = "mouseover",
    C = "mouseout",
    o = "mouseenter",
    f = "mouseleave",
    v = "touchstart",
    k = "touchmove",
    A = "touchend",
    g = "touchcancel",
    q = "click",
    i = "dblclick",
    u = "tap",
    B = "doubletap",
    j = l.eventMap = {},
    r = l.additiveEvents = {},
    n = Ext.id,
    x;
  Ext.id = function(H, G) {
    var F = Ext.getDom(H, true),
      I, J;
    if (!F) {
      J = n(H, G)
    } else {
      if (!(J = F.id)) {
        J = n(null, G || p.prototype.identifiablePrefix);
        if (Ext.isSandboxed) {
          I = Ext.sandboxPrefix || (Ext.sandboxPrefix = Ext.sandboxName.toLowerCase() +
            "-");
          J = I + J
        }
        F.id = J
      }
    }
    return J
  };
  if (w.PointerEvents) {
    j[s] = D;
    j[y] = e;
    j[t] = c;
    j[v] = D;
    j[k] = e;
    j[A] = c;
    j[g] = d;
    j[q] = u;
    j[i] = B;
    j[E] = "pointerover";
    j[C] = "pointerout";
    j[o] = "pointerenter";
    j[f] = "pointerleave"
  } else {
    if (w.MSPointerEvents) {
      j[D] = h;
      j[e] = m;
      j[c] = z;
      j[d] = a;
      j[s] = h;
      j[y] = m;
      j[t] = z;
      j[v] = h;
      j[k] = m;
      j[A] = z;
      j[g] = a;
      j[q] = u;
      j[i] = B;
      j[E] = "MSPointerOver";
      j[C] = "MSPointerOut"
    } else {
      if (w.TouchEvents) {
        j[D] = v;
        j[e] = k;
        j[c] = A;
        j[d] = g;
        j[s] = v;
        j[y] = k;
        j[t] = A;
        j[q] = u;
        j[i] = B;
        if (Ext.isWebKit && Ext.os.is.Desktop) {
          j[v] = s;
          j[k] = y;
          j[A] = t;
          j[g] = t;
          r[s] = s;
          r[y] = y;
          r[t] = t;
          r[v] = v;
          r[k] = k;
          r[A] = A;
          r[g] = g;
          r[D] = s;
          r[e] = y;
          r[c] = t;
          r[d] = t
        }
      } else {
        j[D] = s;
        j[e] = y;
        j[c] = t;
        j[d] = t;
        j[v] = s;
        j[k] = y;
        j[A] = t;
        j[g] = t
      }
    }
  }
  if (Ext.isWebKit) {
    j.transitionend = Ext.browser.getVendorProperyName("transitionEnd");
    j.animationstart = Ext.browser.getVendorProperyName("animationStart");
    j.animationend = Ext.browser.getVendorProperyName("animationEnd")
  }
  if (!Ext.supports.MouseWheel && !Ext.isOpera) {
    j.mousewheel = "DOMMouseScroll"
  }
  x = l.$eventOptions = Ext.Object.chain(l.$eventOptions);
  x.translate = x.capture = x.delegate = x.delegated = x.stopEvent = x.preventDefault =
    x.stopPropagation = x.element = 1;
  l.styleHooks.opacity = {
    name: "opacity",
    afterSet: function(H, G, F) {
      var I = F.shadow;
      if (I) {
        I.setOpacity(G)
      }
    }
  };
  l.getTrueXY = l.getXY;
  Ext.select = p.select;
  Ext.query = p.query;
  Ext.apply(Ext, {
    get: function(F) {
      return p.get(F)
    },
    getDom: function(F) {
      if (!F || !b) {
        return null
      }
      return F.dom || (typeof F === "string" ? Ext.getElementById(F) :
        F)
    },
    getBody: function() {
      if (!Ext._bodyEl) {
        if (!b.body) {
          throw new Error(
            "[Ext.getBody] document.body does not yet exist")
        }
        Ext._bodyEl = Ext.get(b.body)
      }
      return Ext._bodyEl
    },
    getHead: function() {
      if (!Ext._headEl) {
        Ext._headEl = Ext.get(b.head || b.getElementsByTagName("head")[
          0])
      }
      return Ext._headEl
    },
    getDoc: function() {
      if (!Ext._docEl) {
        Ext._docEl = Ext.get(b)
      }
      return Ext._docEl
    },
    getWin: function() {
      if (!Ext._winEl) {
        Ext._winEl = Ext.get(window)
      }
      return Ext._winEl
    },
    removeNode: function(H) {
      H = H.dom || H;
      var I = H && H.id,
        G = Ext.cache[I],
        F;
      if (G) {
        G.destroy()
      } else {
        if (H && (H.nodeType === 3 || H.tagName.toUpperCase() !==
            "BODY")) {
          F = H.parentNode;
          if (F) {
            F.removeChild(H)
          }
        }
      }
    }
  });
