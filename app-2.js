Ext.isGarbage = function(F) {
    return F && F.nodeType === 1 && F.tagName !== "BODY" && F.tagName !==
      "HTML" && (!F.parentNode || (!F.offsetParent && ((Ext.isIE8 ? b.all[
        F.id] : b.getElementById(F.id)) !== F) && !(Ext.detachedBodyEl &&
        Ext.detachedBodyEl.isAncestor(F))))
  };
  if (Ext.os.is.Android || (Ext.os.is.Windows && Ext.supports.Touch)) {
    Ext.onReady(function() {
      var F = Ext.getWin();
      p._windowWidth = p._viewportWidth = window.innerWidth;
      p._windowHeight = p._viewportHeight = window.innerHeight;
      F.on({
        focusin: "_onWindowFocusChange",
        focusout: "_onWindowFocusChange",
        pointerup: "_onWindowFocusChange",
        capture: true,
        delegated: false,
        delay: 1,
        scope: p
      });
      F.on({
        resize: "_onWindowResize",
        priority: 2000,
        scope: p
      })
    })
  }
}));
(Ext.cmd.derive("Ext.util.Filter", Ext.Base, {
  isFilter: true,
  config: {
    property: null,
    value: null,
    filterFn: null,
    id: null,
    anyMatch: false,
    exactMatch: false,
    caseSensitive: false,
    disabled: false,
    disableOnEmpty: false,
    operator: null,
    root: null,
    serializer: null,
    convert: null
  },
  scope: null,
  $configStrict: false,
  statics: {
    createFilterFn: function(a) {
      if (!a) {
        return Ext.returnTrue
      }
      return function(f) {
        var b = a.isCollection ? a.items : a,
          g = b.length,
          c = true,
          d, e;
        for (d = 0; c && d < g; d++) {
          e = b[d];
          if (!e.getDisabled()) {
            c = e.filter(f)
          }
        }
        return c
      }
    },
    isInvalid: function(a) {
      if (!a.filterFn) {
        if (!a.property) {
          return "A Filter requires either a property or a filterFn to be set"
        }
        if (!a.hasOwnProperty("value") && !a.operator) {
          return "A Filter requires either a property and value, or a filterFn to be set"
        }
      }
      return false
    }
  },
  constructor: function(a) {
    this.initConfig(a)
  },
  preventConvert: {
    "in": 1
  },
  filter: function(b) {
    var a = this,
      e = a._filterFn || a.getFilterFn(),
      d = a.getConvert(),
      c = a._value;
    a._filterValue = c;
    a.isDateValue = Ext.isDate(c);
    if (a.isDateValue) {
      a.dateValue = c.getTime()
    }
    if (d && !a.preventConvert[a.getOperator()]) {
      a._filterValue = d.call(a.scope || a, c)
    }
    return e.call(a.scope || a, b)
  },
  getId: function() {
    var a = this._id;
    if (!a) {
      a = this.getProperty();
      if (!a) {
        a = Ext.id(null, "ext-filter-")
      }
      this._id = a
    }
    return a
  },
  getFilterFn: function() {
    var b = this,
      c = b._filterFn,
      a;
    if (!c) {
      a = b.getOperator();
      if (a) {
        c = b.operatorFns[a]
      } else {
        c = b.createRegexFilter()
      }
      b._filterFn = c
    }
    return c
  },
  createRegexFilter: function() {
    var b = this,
      e = !!b.getAnyMatch(),
      a = !!b.getExactMatch(),
      c = b.getValue(),
      d = Ext.String.createRegex(c, !e, !e && a, !b.getCaseSensitive());
    return function(f) {
      var g = b.getPropertyValue(f);
      return d ? d.test(g) : (g == null)
    }
  },
  getPropertyValue: function(b) {
    var a = this._root,
      c = (a == null) ? b : b[a];
    return c[this._property]
  },
  getState: function() {
    var c = this.getInitialConfig(),
      a = {},
      b;
    for (b in c) {
      if (c.hasOwnProperty(b)) {
        a[b] = c[b]
      }
    }
    delete a.root;
    a.value = this.getValue();
    return a
  },
  getScope: function() {
    return this.scope
  },
  serialize: function() {
    var a = this.getState(),
      b = this.getSerializer();
    delete a.id;
    delete a.serializer;
    if (b) {
      b.call(this, a)
    }
    return a
  },
  updateOperator: function() {
    this._filterFn = null
  },
  updateValue: function(a) {
    this._filterFn = null;
    if (this.getDisableOnEmpty()) {
      this.setDisabled(Ext.isEmpty(a))
    }
  },
  updateDisableOnEmpty: function(a) {
    var b = false;
    if (a) {
      b = Ext.isEmpty(this.getValue())
    }
    this.setDisabled(b)
  },
  privates: {
    getCandidateValue: function(c, b, e) {
      var d = this,
        f = d._convert,
        a = d.getPropertyValue(c);
      if (f) {
        a = f.call(d.scope || d, a)
      } else {
        if (!e) {
          a = Ext.coerce(a, b)
        }
      }
      return a
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "Filter"], function() {
  var a = this.prototype,
    b = (a.operatorFns = {
      "<": function(d) {
        var c = this._filterValue;
        return this.getCandidateValue(d, c) < c
      },
      "<=": function(d) {
        var c = this._filterValue;
        return this.getCandidateValue(d, c) <= c
      },
      "=": function(d) {
        var e = this,
          c = e._filterValue;
        d = e.getCandidateValue(d, c);
        if (e.isDateValue && d instanceof Date) {
          d = d.getTime();
          c = e.dateValue
        }
        return d == c
      },
      "===": function(d) {
        var e = this,
          c = e._filterValue;
        d = e.getCandidateValue(d, c, true);
        if (e.isDateValue && d instanceof Date) {
          d = d.getTime();
          c = e.dateValue
        }
        return d === c
      },
      ">=": function(d) {
        var c = this._filterValue;
        return this.getCandidateValue(d, c) >= c
      },
      ">": function(d) {
        var c = this._filterValue;
        return this.getCandidateValue(d, c) > c
      },
      "!=": function(d) {
        var e = this,
          c = e._filterValue;
        d = e.getCandidateValue(d, c);
        if (e.isDateValue && d instanceof Date) {
          d = d.getTime();
          c = e.dateValue
        }
        return d != c
      },
      "!==": function(d) {
        var e = this,
          c = e._filterValue;
        d = e.getCandidateValue(d, c, true);
        if (e.isDateValue && d instanceof Date) {
          d = d.getTime();
          c = e.dateValue
        }
        return d !== c
      },
      "in": function(d) {
        var c = this._filterValue;
        return Ext.Array.contains(c, this.getCandidateValue(d, c))
      },
      like: function(d) {
        var c = this._filterValue;
        return c && this.getCandidateValue(d, c).toLowerCase().indexOf(
          c.toLowerCase()) > -1
      }
    });
  b["=="] = b["="];
  b.gt = b[">"];
  b.ge = b[">="];
  b.lt = b["<"];
  b.le = b["<="];
  b.eq = b["="];
  b.ne = b["!="]
}));
(Ext.cmd.derive("Ext.util.Observable", Ext.mixin.Observable, {
  $applyConfigs: true
}, 0, 0, 0, 0, 0, 0, [Ext.util, "Observable"], function(a) {
  var b = Ext.mixin.Observable;
  a.releaseCapture = b.releaseCapture;
  a.capture = b.capture;
  a.captureArgs = b.captureArgs;
  a.observe = a.observeClass = b.observe
}));
(Ext.cmd.derive("Ext.util.AbstractMixedCollection", Ext.Base, {
  isMixedCollection: true,
  generation: 0,
  indexGeneration: 0,
  constructor: function(b, a) {
    var c = this;
    if (arguments.length === 1 && Ext.isObject(b)) {
      c.initialConfig = b;
      Ext.apply(c, b)
    } else {
      c.allowFunctions = b === true;
      if (a) {
        c.getKey = a
      }
      c.initialConfig = {
        allowFunctions: c.allowFunctions,
        getKey: c.getKey
      }
    }
    c.items = [];
    c.map = {};
    c.keys = [];
    c.indexMap = {};
    c.length = 0;
    c.mixins.observable.constructor.call(c)
  },
  destroy: function() {
    var a = this;
    a.items = a.map = a.keys = a.indexMap = null;
    a.callParent()
  },
  allowFunctions: false,
  add: function(c, d) {
    var a = this.length,
      b;
    if (arguments.length === 1) {
      b = this.insert(a, c)
    } else {
      b = this.insert(a, c, d)
    }
    return b
  },
  getKey: function(a) {
    return a.id
  },
  replace: function(c, e) {
    var d = this,
      a, b;
    if (arguments.length == 1) {
      e = arguments[0];
      c = d.getKey(e)
    }
    a = d.map[c];
    if (typeof c == "undefined" || c === null || typeof a == "undefined") {
      return d.add(c, e)
    }
    d.generation++;
    b = d.indexOfKey(c);
    d.items[b] = e;
    d.map[c] = e;
    if (d.hasListeners.replace) {
      d.fireEvent("replace", c, a, e)
    }
    return e
  },
  updateKey: function(f, g) {
    var d = this,
      e = d.map,
      a = d.indexOfKey(f),
      c = d.indexMap,
      b;
    if (a > -1) {
      b = e[f];
      delete e[f];
      delete c[f];
      e[g] = b;
      c[g] = a;
      d.keys[a] = g;
      d.indexGeneration = ++d.generation
    }
  },
  addAll: function(c) {
    var b = this,
      a;
    if (arguments.length > 1 || Ext.isArray(c)) {
      b.insert(b.length, arguments.length > 1 ? arguments : c)
    } else {
      for (a in c) {
        if (c.hasOwnProperty(a)) {
          if (b.allowFunctions || typeof c[a] != "function") {
            b.add(a, c[a])
          }
        }
      }
    }
  },
  each: function(e, d) {
    var b = Ext.Array.push([], this.items),
      c = 0,
      a = b.length,
      f;
    for (; c < a; c++) {
      f = b[c];
      if (e.call(d || f, f, c, a) === false) {
        break
      }
    }
  },
  eachKey: function(e, d) {
    var f = this.keys,
      b = this.items,
      c = 0,
      a = f.length;
    for (; c < a; c++) {
      e.call(d || window, f[c], b[c], c, a)
    }
  },
  findBy: function(e, d) {
    var f = this.keys,
      b = this.items,
      c = 0,
      a = b.length;
    for (; c < a; c++) {
      if (e.call(d || window, b[c], f[c])) {
        return b[c]
      }
    }
    return null
  },
  insert: function(b, c, d) {
    var a;
    if (Ext.isIterable(c)) {
      a = this.doInsert(b, c, d)
    } else {
      if (arguments.length > 2) {
        a = this.doInsert(b, [c], [d])
      } else {
        a = this.doInsert(b, [c])
      }
      a = a[0]
    }
    return a
  },
  doInsert: function(h, n, m) {
    var k = this,
      b, c, f, j = n.length,
      a = j,
      e = k.hasListeners.add,
      d, g = {},
      l, p, o;
    if (m != null) {
      k.useLinearSearch = true
    } else {
      m = n;
      n = new Array(j);
      for (f = 0; f < j; f++) {
        n[f] = this.getKey(m[f])
      }
    }
    k.suspendEvents();
    for (f = 0; f < j; f++) {
      b = n[f];
      c = k.indexOfKey(b);
      if (c !== -1) {
        if (c < h) {
          h--
        }
        k.removeAt(c)
      }
      if (b != null) {
        if (g[b] != null) {
          l = true;
          a--
        }
        g[b] = f
      }
    }
    k.resumeEvents();
    if (l) {
      p = n;
      o = m;
      n = new Array(a);
      m = new Array(a);
      f = 0;
      for (b in g) {
        n[f] = p[g[b]];
        m[f] = o[g[b]];
        f++
      }
      j = a
    }
    d = h === k.length && k.indexGeneration === k.generation;
    Ext.Array.insert(k.items, h, m);
    Ext.Array.insert(k.keys, h, n);
    k.length += j;
    k.generation++;
    if (d) {
      k.indexGeneration = k.generation
    }
    for (f = 0; f < j; f++, h++) {
      b = n[f];
      if (b != null) {
        k.map[b] = m[f];
        if (d) {
          k.indexMap[b] = h
        }
      }
      if (e) {
        k.fireEvent("add", h, m[f], b)
      }
    }
    return m
  },
  remove: function(d) {
    var c = this,
      b, a;
    if (!c.useLinearSearch && (b = c.getKey(d))) {
      a = c.indexOfKey(b)
    } else {
      a = Ext.Array.indexOf(c.items, d)
    }
    return (a === -1) ? false : c.removeAt(a)
  },
  removeAll: function(a) {
    var c = this,
      b;
    if (a || c.hasListeners.remove) {
      if (a) {
        for (b = a.length - 1; b >= 0; --b) {
          c.remove(a[b])
        }
      } else {
        while (c.length) {
          c.removeAt(0)
        }
      }
    } else {
      c.length = c.items.length = c.keys.length = 0;
      c.map = {};
      c.indexMap = {};
      c.generation++;
      c.indexGeneration = c.generation
    }
  },
  removeAt: function(a) {
    var c = this,
      d, b;
    if (a < c.length && a >= 0) {
      c.length--;
      d = c.items[a];
      Ext.Array.erase(c.items, a, 1);
      b = c.keys[a];
      if (typeof b != "undefined") {
        delete c.map[b]
      }
      Ext.Array.erase(c.keys, a, 1);
      if (c.hasListeners.remove) {
        c.fireEvent("remove", d, b)
      }
      c.generation++;
      return d
    }
    return false
  },
  removeRange: function(g, a) {
    var h = this,
      b, j, f, e, c, d;
    if (g < h.length && g >= 0) {
      if (!a) {
        a = 1
      }
      e = Math.min(g + a, h.length);
      a = e - g;
      d = e === h.length;
      c = d && h.indexGeneration === h.generation;
      for (f = g; f < e; f++) {
        j = h.keys[f];
        if (j != null) {
          delete h.map[j];
          if (c) {
            delete h.indexMap[j]
          }
        }
      }
      b = h.items[f - 1];
      h.length -= a;
      h.generation++;
      if (c) {
        h.indexGeneration = h.generation
      }
      if (d) {
        h.items.length = h.keys.length = h.length
      } else {
        h.items.splice(g, a);
        h.keys.splice(g, a)
      }
      return b
    }
    return false
  },
  removeAtKey: function(b) {
    var d = this,
      c = d.keys,
      a;
    if (b == null) {
      for (a = c.length - 1; a >= 0; a--) {
        if (c[a] == null) {
          d.removeAt(a)
        }
      }
    } else {
      return d.removeAt(d.indexOfKey(b))
    }
  },
  getCount: function() {
    return this.length
  },
  indexOf: function(c) {
    var b = this,
      a;
    if (c != null) {
      if (!b.useLinearSearch && (a = b.getKey(c))) {
        return this.indexOfKey(a)
      }
      return Ext.Array.indexOf(b.items, c)
    }
    return -1
  },
  indexOfKey: function(a) {
    if (!this.map.hasOwnProperty(a)) {
      return -1
    }
    if (this.indexGeneration !== this.generation) {
      this.rebuildIndexMap()
    }
    return this.indexMap[a]
  },
  rebuildIndexMap: function() {
    var e = this,
      d = e.indexMap = {},
      c = e.keys,
      a = c.length,
      b;
    for (b = 0; b < a; b++) {
      d[c[b]] = b
    }
    e.indexGeneration = e.generation
  },
  get: function(b) {
    var d = this,
      a = d.map[b],
      c = a !== undefined ? a : (typeof b == "number") ? d.items[b] :
      undefined;
    return typeof c != "function" || d.allowFunctions ? c : null
  },
  getAt: function(a) {
    return this.items[a]
  },
  getByKey: function(a) {
    return this.map[a]
  },
  contains: function(c) {
    var b = this,
      a;
    if (c != null) {
      if (!b.useLinearSearch && (a = b.getKey(c))) {
        return this.map[a] != null
      }
      return Ext.Array.indexOf(this.items, c) !== -1
    }
    return false
  },
  containsKey: function(a) {
    return this.map.hasOwnProperty(a)
  },
  clear: function() {
    var a = this;
    if (a.generation) {
      a.length = 0;
      a.items = [];
      a.keys = [];
      a.map = {};
      a.indexMap = {};
      a.generation++;
      a.indexGeneration = a.generation
    }
    if (a.hasListeners.clear) {
      a.fireEvent("clear")
    }
  },
  first: function() {
    return this.items[0]
  },
  last: function() {
    return this.items[this.length - 1]
  },
  sum: function(g, b, h, a) {
    var c = this.extractValues(g, b),
      f = c.length,
      e = 0,
      d;
    h = h || 0;
    a = (a || a === 0) ? a : f - 1;
    for (d = h; d <= a; d++) {
      e += c[d]
    }
    return e
  },
  collect: function(j, e, g) {
    var k = this.extractValues(j, e),
      a = k.length,
      b = {},
      c = [],
      h, f, d;
    for (d = 0; d < a; d++) {
      h = k[d];
      f = String(h);
      if ((g || !Ext.isEmpty(h)) && !b[f]) {
        b[f] = true;
        c.push(h)
      }
    }
    return c
  },
  extractValues: function(c, a) {
    var b = this.items;
    if (a) {
      b = Ext.Array.pluck(b, a)
    }
    return Ext.Array.pluck(b, c)
  },
  hasRange: function(b, a) {
    return (a < this.length)
  },
  getRange: function(h, b) {
    var g = this,
      d = g.items,
      c = [],
      a = d.length,
      f, e;
    if (a < 1) {
      return c
    }
    if (h > b) {
      e = true;
      f = h;
      h = b;
      b = f
    }
    if (h < 0) {
      h = 0
    }
    if (b == null || b >= a) {
      b = a - 1
    }
    c = d.slice(h, b + 1);
    if (e && c.length) {
      c.reverse()
    }
    return c
  },
  filter: function(d, c, e, a) {
    var b = [];
    if (Ext.isString(d)) {
      b.push(new Ext.util.Filter({
        property: d,
        value: c,
        anyMatch: e,
        caseSensitive: a
      }))
    } else {
      if (Ext.isArray(d) || d instanceof Ext.util.Filter) {
        b = b.concat(d)
      }
    }
    return this.filterBy(Ext.util.Filter.createFilterFn(b))
  },
  filterBy: function(e, d) {
    var h = this,
      a = new h.self(h.initialConfig),
      g = h.keys,
      b = h.items,
      f = b.length,
      c;
    a.getKey = h.getKey;
    for (c = 0; c < f; c++) {
      if (e.call(d || h, b[c], g[c])) {
        a.add(g[c], b[c])
      }
    }
    a.useLinearSearch = h.useLinearSearch;
    return a
  },
  findIndex: function(c, b, e, d, a) {
    if (Ext.isEmpty(b, false)) {
      return -1
    }
    b = this.createValueMatcher(b, d, a);
    return this.findIndexBy(function(f) {
      return f && b.test(f[c])
    }, null, e)
  },
  findIndexBy: function(e, d, h) {
    var g = this,
      f = g.keys,
      b = g.items,
      c = h || 0,
      a = b.length;
    for (; c < a; c++) {
      if (e.call(d || g, b[c], f[c])) {
        return c
      }
    }
    return -1
  },
  createValueMatcher: function(c, e, a, b) {
    if (!c.exec) {
      var d = Ext.String.escapeRegex;
      c = String(c);
      if (e === true) {
        c = d(c)
      } else {
        c = "^" + d(c);
        if (b === true) {
          c += "$"
        }
      }
      c = new RegExp(c, a ? "" : "i")
    }
    return c
  },
  clone: function() {
    var a = this,
      b = new a.self(a.initialConfig);
    b.add(a.keys, a.items);
    b.useLinearSearch = a.useLinearSearch;
    return b
  }
}, 1, 0, 0, 0, 0, [
  ["observable", Ext.util.Observable]
], [Ext.util, "AbstractMixedCollection"], 0));
(Ext.cmd.derive("Ext.util.Sorter", Ext.Base, {
  isSorter: true,
  config: {
    property: null,
    sorterFn: null,
    root: null,
    transform: null,
    direction: "ASC",
    id: undefined
  },
  statics: {
    createComparator: function(b, a) {
      a = a || 0;
      return function(c, h) {
        var e = b.isCollection ? b.items : b,
          g = e.length,
          d, f;
        for (f = 0; f < g; ++f) {
          d = e[f].sort(c, h);
          if (d) {
            return d
          }
        }
        return a && a(c, h)
      }
    }
  },
  multiplier: 1,
  constructor: function(a) {
    this.initConfig(a)
  },
  getId: function() {
    var a = this._id;
    if (!a) {
      a = this.getProperty();
      if (!a) {
        a = Ext.id(null, "ext-sorter-")
      }
      this._id = a
    }
    return a
  },
  sort: function(a, b) {
    return this.multiplier * this.sortFn(a, b)
  },
  sortFn: function(d, c) {
    var f = this,
      e = f._transform,
      b = f._root,
      g = f._property,
      a, h;
    if (b) {
      d = d[b];
      c = c[b]
    }
    a = d[g];
    h = c[g];
    if (e) {
      a = e(a);
      h = e(h)
    }
    return (a > h) ? 1 : (a < h ? -1 : 0)
  },
  applyDirection: function(a) {
    return a ? a : "ASC"
  },
  updateDirection: function(a) {
    this.multiplier = (a.toUpperCase() === "DESC") ? -1 : 1
  },
  updateProperty: function(a) {
    if (a) {
      delete this.sortFn
    }
  },
  updateSorterFn: function(a) {
    this.sortFn = a
  },
  toggle: function() {
    this.setDirection(Ext.String.toggle(this.getDirection(), "ASC",
      "DESC"))
  },
  getState: function() {
    return {
      root: this.getRoot(),
      property: this.getProperty(),
      direction: this.getDirection()
    }
  },
  serialize: function() {
    return {
      property: this.getProperty(),
      direction: this.getDirection()
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "Sorter"], 0));
(Ext.cmd.derive("Ext.util.Sortable", Ext.Base, {
  isSortable: true,
  $configPrefixed: false,
  $configStrict: false,
  config: {
    sorters: null
  },
  defaultSortDirection: "ASC",
  multiSortLimit: 3,
  statics: {
    createComparator: function(a) {
      return a && a.length ? function(d, c) {
        var b = a[0].sort(d, c),
          f = a.length,
          e = 1;
        for (; !b && e < f; e++) {
          b = a[e].sort.call(this, d, c)
        }
        return b
      } : function() {
        return 0
      }
    }
  },
  applySorters: function(c) {
    var b = this,
      a = b.getSorters() || new Ext.util.MixedCollection(false, Ext.returnId);
    if (c) {
      a.addAll(b.decodeSorters(c))
    }
    return a
  },
  sort: function(g, f, a, e) {
    var b = this,
      h, d, c = b.getSorters();
    if (!c) {
      b.setSorters(null);
      c = b.getSorters()
    }
    if (Ext.isArray(g)) {
      e = a;
      a = f
    } else {
      if (Ext.isObject(g)) {
        g = [g];
        e = a;
        a = f
      } else {
        if (Ext.isString(g)) {
          h = c.get(g);
          if (!h) {
            h = {
              property: g,
              direction: f
            }
          } else {
            if (f == null) {
              h.toggle()
            } else {
              h.setDirection(f)
            }
          }
          g = [h]
        }
      }
    }
    if (g && g.length) {
      g = b.decodeSorters(g);
      switch (a) {
        case "multi":
          c.insert(0, g[0]);
          d = c.getCount() - b.multiSortLimit;
          if (d > 0) {
            c.removeRange(b.multiSortLimit, d)
          }
          break;
        case "prepend":
          c.insert(0, g);
          break;
        case "append":
          c.addAll(g);
          break;
        case undefined:
        case null:
        case "replace":
          c.clear();
          c.addAll(g);
          break;
        default:
      }
    }
    if (e !== false) {
      b.fireEvent("beforesort", b, g);
      b.onBeforeSort(g);
      if (b.getSorterCount()) {
        b.doSort(b.generateComparator())
      }
    }
    return g
  },
  getSorterCount: function() {
    return this.getSorters().items.length
  },
  generateComparator: function() {
    var a = this.getSorters().getRange();
    return a.length ? this.createComparator(a) : this.emptyComparator
  },
  emptyComparator: function() {
    return 0
  },
  onBeforeSort: Ext.emptyFn,
  decodeSorters: function(f) {
    if (!Ext.isArray(f)) {
      if (f === undefined) {
        f = []
      } else {
        f = [f]
      }
    }
    var d = f.length,
      g = Ext.util.Sorter,
      b = this.getModel ? this.getModel() : this.model,
      e, a, c;
    for (c = 0; c < d; c++) {
      a = f[c];
      if (!(a instanceof g)) {
        if (Ext.isString(a)) {
          a = {
            property: a
          }
        }
        Ext.applyIf(a, {
          root: this.sortRoot,
          direction: "ASC"
        });
        if (a.fn) {
          a.sorterFn = a.fn
        }
        if (typeof a == "function") {
          a = {
            sorterFn: a
          }
        }
        if (b && !a.transform) {
          e = b.getField(a.property);
          a.transform = e && e.sortType !== Ext.identityFn ? e.sortType :
            undefined
        }
        f[c] = new Ext.util.Sorter(a)
      }
    }
    return f
  },
  getFirstSorter: function() {
    var c = this.getSorters().items,
      a = c.length,
      b = 0,
      d;
    for (; b < a; ++b) {
      d = c[b];
      if (!d.isGrouper) {
        return d
      }
    }
    return null
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util, "Sortable"], function() {
  this.prototype.createComparator = this.createComparator
}));
(Ext.cmd.derive("Ext.util.MixedCollection", Ext.util.AbstractMixedCollection, {
  constructor: function() {
    this.initConfig();
    Ext.util.AbstractMixedCollection.prototype.constructor.apply(this,
      arguments)
  },
  doSort: function(a) {
    this.sortBy(a)
  },
  _sort: function(l, b, k) {
    var j = this,
      e, f, d = String(b).toUpperCase() == "DESC" ? -1 : 1,
      h = [],
      m = j.keys,
      g = j.items,
      a;
    k = k || function(i, c) {
      return i - c
    };
    for (e = 0, f = g.length; e < f; e++) {
      h[h.length] = {
        key: m[e],
        value: g[e],
        index: e
      }
    }
    Ext.Array.sort(h, function(i, c) {
      return k(i[l], c[l]) * d || (i.index < c.index ? -1 : 1)
    });
    for (e = 0, f = h.length; e < f; e++) {
      a = h[e];
      g[e] = a.value;
      m[e] = a.key;
      j.indexMap[a.key] = e
    }
    j.generation++;
    j.indexGeneration = j.generation;
    j.fireEvent("sort", j)
  },
  sortBy: function(b) {
    var h = this,
      a = h.items,
      g, f = h.keys,
      d, e = a.length,
      c;
    for (c = 0; c < e; c++) {
      a[c].$extCollectionIndex = c
    }
    Ext.Array.sort(a, function(j, i) {
      return b(j, i) || (j.$extCollectionIndex < i.$extCollectionIndex ?
        -1 : 1)
    });
    for (c = 0; c < e; c++) {
      g = a[c];
      d = h.getKey(g);
      f[c] = d;
      h.indexMap[d] = c;
      delete a.$extCollectionIndex
    }
    h.generation++;
    h.indexGeneration = h.generation;
    h.fireEvent("sort", h, a, f)
  },
  findInsertionIndex: function(e, d) {
    var f = this,
      b = f.items,
      h = 0,
      a = b.length - 1,
      c, g;
    if (!d) {
      d = f.generateComparator()
    }
    while (h <= a) {
      c = (h + a) >> 1;
      g = d(e, b[c]);
      if (g >= 0) {
        h = c + 1
      } else {
        if (g < 0) {
          a = c - 1
        }
      }
    }
    return h
  },
  reorder: function(d) {
    var g = this,
      b = g.items,
      c = 0,
      f = b.length,
      a = [],
      e = [],
      h;
    g.suspendEvents();
    for (h in d) {
      a[d[h]] = b[h]
    }
    for (c = 0; c < f; c++) {
      if (d[c] == undefined) {
        e.push(b[c])
      }
    }
    for (c = 0; c < f; c++) {
      if (a[c] == undefined) {
        a[c] = e.shift()
      }
    }
    g.clear();
    g.addAll(a);
    g.resumeEvents();
    g.fireEvent("sort", g)
  },
  sortByKey: function(a, b) {
    this._sort("key", a, b || function(d, c) {
      var f = String(d).toUpperCase(),
        e = String(c).toUpperCase();
      return f > e ? 1 : (f < e ? -1 : 0)
    })
  }
}, 1, 0, 0, 0, 0, [
  ["sortable", Ext.util.Sortable]
], [Ext.util, "MixedCollection"], 0));
(Ext.cmd.derive("Ext.util.TaskRunner", Ext.Base, {
  interval: 10,
  timerId: null,
  constructor: function(a) {
    var b = this;
    if (typeof a == "number") {
      b.interval = a
    } else {
      if (a) {
        Ext.apply(b, a)
      }
    }
    b.tasks = [];
    b.timerFn = Ext.Function.bind(b.onTick, b)
  },
  newTask: function(b) {
    var a = new Ext.util.TaskRunner.Task(b);
    a.manager = this;
    return a
  },
  start: function(a) {
    var c = this,
      b = Ext.Date.now();
    if (!a.pending) {
      c.tasks.push(a);
      a.pending = true
    }
    a.stopped = false;
    a.taskStartTime = b;
    a.taskRunTime = a.fireOnStart !== false ? 0 : a.taskStartTime;
    a.taskRunCount = 0;
    if (!c.firing) {
      if (a.fireOnStart !== false) {
        c.startTimer(0, b)
      } else {
        c.startTimer(a.interval, b)
      }
    }
    return a
  },
  stop: function(a) {
    if (!a.stopped) {
      a.stopped = true;
      if (a.onStop) {
        a.onStop.call(a.scope || a, a)
      }
    }
    return a
  },
  stopAll: function() {
    Ext.each(this.tasks, this.stop, this)
  },
  firing: false,
  nextExpires: 1e+99,
  onTick: function() {
    var m = this,
      f = m.tasks,
      a = Ext.Date.now(),
      n = 1e+99,
      k = f.length,
      d = Ext.GlobalEvents,
      c, o, h, b, e, g, p;
    m.timerId = null;
    m.firing = true;
    for (h = 0; h < k || h < (k = f.length); ++h) {
      b = f[h];
      if (!(g = b.stopped)) {
        c = b.taskRunTime + b.interval;
        if (c <= a) {
          e = 1;
          if (b.hasOwnProperty("fireIdleEvent")) {
            p = b.fireIdleEvent
          } else {
            p = m.fireIdleEvent
          }
          try {
            e = b.run.apply(b.scope || b, b.args || [++b.taskRunCount])
          } catch (j) {
            try {
              if (b.onError) {
                e = b.onError.call(b.scope || b, b, j)
              }
            } catch (l) {}
          }
          b.taskRunTime = a;
          if (e === false || b.taskRunCount === b.repeat) {
            m.stop(b);
            g = true
          } else {
            g = b.stopped;
            c = a + b.interval
          }
        }
        if (!g && b.duration && b.duration <= (a - b.taskStartTime)) {
          m.stop(b);
          g = true
        }
      }
      if (g) {
        b.pending = false;
        if (!o) {
          o = f.slice(0, h)
        }
      } else {
        if (o) {
          o.push(b)
        }
        if (n > c) {
          n = c
        }
      }
    }
    if (o) {
      m.tasks = o
    }
    m.firing = false;
    if (m.tasks.length) {
      m.startTimer(n - a, Ext.Date.now())
    }
    if (p !== false && d.hasListeners.idle) {
      d.fireEvent("idle")
    }
  },
  startTimer: function(e, c) {
    var d = this,
      b = c + e,
      a = d.timerId;
    if (a && d.nextExpires - b > d.interval) {
      clearTimeout(a);
      a = null
    }
    if (!a) {
      if (e < d.interval) {
        e = d.interval
      }
      d.timerId = Ext.defer(d.timerFn, e);
      d.nextExpires = b
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "TaskRunner"], function() {
  var b = this,
    a = b.prototype;
  a.destroy = a.stopAll;
  b.Task = new Ext.Class({
    isTask: true,
    stopped: true,
    fireOnStart: false,
    constructor: function(c) {
      Ext.apply(this, c)
    },
    restart: function(c) {
      if (c !== undefined) {
        this.interval = c
      }
      this.manager.start(this)
    },
    start: function(c) {
      if (this.stopped) {
        this.restart(c)
      }
    },
    stop: function() {
      this.manager.stop(this)
    }
  });
  a = b.Task.prototype;
  a.destroy = a.stop
}));
(Ext.cmd.derive("Ext.fx.target.Target", Ext.Base, {
  isAnimTarget: true,
  constructor: function(a) {
    this.target = a;
    this.id = this.getId()
  },
  getId: function() {
    return this.target.id
  },
  remove: function() {
    Ext.destroy(this.target)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.fx.target, "Target"], 0));
(Ext.cmd.derive("Ext.fx.target.Element", Ext.fx.target.Target, {
  type: "element",
  getElVal: function(b, a, c) {
    if (c === undefined) {
      if (a === "x") {
        c = b.getX()
      } else {
        if (a === "y") {
          c = b.getY()
        } else {
          if (a === "scrollTop") {
            c = b.getScroll().top
          } else {
            if (a === "scrollLeft") {
              c = b.getScroll().left
            } else {
              if (a === "height") {
                c = b.getHeight()
              } else {
                if (a === "width") {
                  c = b.getWidth()
                } else {
                  c = b.getStyle(a)
                }
              }
            }
          }
        }
      }
    }
    return c
  },
  getAttr: function(a, c) {
    var b = this.target;
    return [
      [b, this.getElVal(b, a, c)]
    ]
  },
  setAttr: function(h) {
    var f = h.length,
      d, a, g, e, c, b;
    for (e = 0; e < f; e++) {
      d = h[e].attrs;
      for (a in d) {
        if (d.hasOwnProperty(a)) {
          b = d[a].length;
          for (c = 0; c < b; c++) {
            g = d[a][c];
            this.setElVal(g[0], a, g[1])
          }
        }
      }
    }
  },
  setElVal: function(b, a, c) {
    if (a === "x") {
      b.setX(c)
    } else {
      if (a === "y") {
        b.setY(c)
      } else {
        if (a === "scrollTop") {
          b.scrollTo("top", c)
        } else {
          if (a === "scrollLeft") {
            b.scrollTo("left", c)
          } else {
            if (a === "width") {
              b.setWidth(c)
            } else {
              if (a === "height") {
                b.setHeight(c)
              } else {
                b.setStyle(a, c)
              }
            }
          }
        }
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.fx.target, "Element"], 0));
(Ext.cmd.derive("Ext.fx.target.ElementCSS", Ext.fx.target.Element, {
  setAttr: function(n, e) {
    var r = {
        attrs: [],
        duration: [],
        easing: []
      },
      l = n.length,
      m = function() {
        this.setStyle(Ext.supports.CSS3Prefix + "TransitionProperty",
          null);
        this.setStyle(Ext.supports.CSS3Prefix + "TransitionDuration",
          null);
        this.setStyle(Ext.supports.CSS3Prefix +
          "TransitionTimingFunction", null)
      },
      p = {
        single: true
      },
      f, q, h, k, c, b, g, d, a;
    for (g = 0; g < l; g++) {
      q = n[g];
      c = q.duration;
      k = q.easing;
      q = q.attrs;
      for (h in q) {
        if (Ext.Array.indexOf(r.attrs, h) == -1) {
          r.attrs.push(h.replace(/[A-Z]/g, function(i) {
            return "-" + i.toLowerCase()
          }));
          r.duration.push(c + "ms");
          r.easing.push(k)
        }
      }
    }
    f = r.attrs.join(",");
    c = r.duration.join(",");
    k = r.easing.join(", ");
    for (g = 0; g < l; g++) {
      q = n[g].attrs;
      for (h in q) {
        a = q[h].length;
        for (d = 0; d < a; d++) {
          b = q[h][d];
          b[0].setStyle(Ext.supports.CSS3Prefix + "TransitionProperty", e ?
            "" : f);
          b[0].setStyle(Ext.supports.CSS3Prefix + "TransitionDuration", e ?
            "" : c);
          b[0].setStyle(Ext.supports.CSS3Prefix +
            "TransitionTimingFunction", e ? "" : k);
          b[0].setStyle(h, b[1]);
          if (e) {
            b = b[0].dom.offsetWidth
          } else {
            b[0].on(Ext.supports.CSS3TransitionEnd, m, b[0], p)
          }
        }
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.fx.target, "ElementCSS"], 0));
(Ext.cmd.derive("Ext.fx.target.CompositeElement", Ext.fx.target.Element, {
  isComposite: true,
  constructor: function(a) {
    a.id = a.id || Ext.id(null, "ext-composite-");
    Ext.fx.target.Element.prototype.constructor.call(this, a)
  },
  getAttr: function(a, h) {
    var b = [],
      g = this.target,
      f = g.elements,
      e = f.length,
      c, d;
    for (c = 0; c < e; c++) {
      d = f[c];
      if (d) {
        d = g.getElement(d);
        b.push([d, this.getElVal(d, a, h)])
      }
    }
    return b
  },
  setAttr: function(m) {
    var h = this.target,
      l = m.length,
      b = h.elements,
      p = b.length,
      n, d, o, g, c, f, e, a;
    for (f = 0; f < l; f++) {
      o = m[f].attrs;
      for (g in o) {
        if (o.hasOwnProperty(g)) {
          a = o[g].length;
          for (e = 0; e < a; e++) {
            n = o[g][e][1];
            for (d = 0; d < p; ++d) {
              c = b[d];
              if (c) {
                c = h.getElement(c);
                this.setElVal(c, g, n)
              }
            }
          }
        }
      }
    }
  },
  remove: function() {
    this.target.destroy()
  }
}, 1, 0, 0, 0, 0, 0, [Ext.fx.target, "CompositeElement"], 0));
(Ext.cmd.derive("Ext.fx.target.CompositeElementCSS", Ext.fx.target.CompositeElement, {
  setAttr: function() {
    return Ext.fx.target.ElementCSS.prototype.setAttr.apply(this,
      arguments)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.fx.target, "CompositeElementCSS"], 0));
(Ext.cmd.derive("Ext.fx.target.Sprite", Ext.fx.target.Target, {
  type: "draw",
  getFromPrim: function(b, a) {
    var c;
    switch (a) {
      case "rotate":
      case "rotation":
        c = b.attr.rotation;
        return {
          x: c.x || 0,
          y: c.y || 0,
          degrees: c.degrees || 0
        };
      case "scale":
      case "scaling":
        c = b.attr.scaling;
        return {
          x: c.x || 1,
          y: c.y || 1,
          cx: c.cx || 0,
          cy: c.cy || 0
        };
      case "translate":
      case "translation":
        c = b.attr.translation;
        return {
          x: c.x || 0,
          y: c.y || 0
        };
      default:
        return b.attr[a]
    }
  },
  getAttr: function(a, b) {
    return [
      [this.target, b !== undefined ? b : this.getFromPrim(this.target,
        a)]
    ]
  },
  setAttr: function(l) {
    var f = l.length,
      h = [],
      b, e, o, q, p, n, m, d, c, k, g, a;
    for (d = 0; d < f; d++) {
      b = l[d].attrs;
      for (e in b) {
        o = b[e];
        a = o.length;
        for (c = 0; c < a; c++) {
          p = o[c][0];
          q = o[c][1];
          if (e === "translate" || e === "translation") {
            m = {
              x: q.x,
              y: q.y
            }
          } else {
            if (e === "rotate" || e === "rotation") {
              k = q.x;
              if (isNaN(k)) {
                k = null
              }
              g = q.y;
              if (isNaN(g)) {
                g = null
              }
              m = {
                degrees: q.degrees,
                x: k,
                y: g
              }
            } else {
              if (e === "scale" || e === "scaling") {
                k = q.x;
                if (isNaN(k)) {
                  k = null
                }
                g = q.y;
                if (isNaN(g)) {
                  g = null
                }
                m = {
                  x: k,
                  y: g,
                  cx: q.cx,
                  cy: q.cy
                }
              } else {
                if (e === "width" || e === "height" || e === "x" || e ===
                  "y") {
                  m = parseFloat(q)
                } else {
                  m = q
                }
              }
            }
          }
          n = Ext.Array.indexOf(h, p);
          if (n === -1) {
            h.push([p, {}]);
            n = h.length - 1
          }
          h[n][1][e] = m
        }
      }
    }
    f = h.length;
    for (d = 0; d < f; d++) {
      h[d][0].setAttributes(h[d][1])
    }
    this.target.redraw()
  }
}, 0, 0, 0, 0, 0, 0, [Ext.fx.target, "Sprite"], 0));
(Ext.cmd.derive("Ext.fx.target.CompositeSprite", Ext.fx.target.Sprite, {
  getAttr: function(a, g) {
    var b = [],
      f = [].concat(this.target.items),
      e = f.length,
      d, c;
    for (d = 0; d < e; d++) {
      c = f[d];
      b.push([c, g !== undefined ? g : this.getFromPrim(c, a)])
    }
    return b
  }
}, 0, 0, 0, 0, 0, 0, [Ext.fx.target, "CompositeSprite"], 0));
(Ext.cmd.derive("Ext.fx.target.Component", Ext.fx.target.Target, {
  type: "component",
  getPropMethod: {
    top: function() {
      return this.getPosition(true)[1]
    },
    left: function() {
      return this.getPosition(true)[0]
    },
    x: function() {
      return this.getPosition()[0]
    },
    y: function() {
      return this.getPosition()[1]
    },
    height: function() {
      return this.getHeight()
    },
    width: function() {
      return this.getWidth()
    },
    opacity: function() {
      return this.el.getStyle("opacity")
    }
  },
  setMethods: {
    top: "setPosition",
    left: "setPosition",
    x: "setPagePosition",
    y: "setPagePosition",
    height: "setSize",
    width: "setSize",
    opacity: "setOpacity"
  },
  getAttr: function(a, b) {
    return [
      [this.target, b !== undefined ? b : this.getPropMethod[a].call(
        this.target)]
    ]
  },
  setAttr: function(r, f, b) {
    var p = this,
      n = r.length,
      u, m, c, g, e, l, d, q, t, k, a = {},
      s;
    for (g = 0; g < n; g++) {
      u = r[g].attrs;
      for (m in u) {
        l = u[m].length;
        for (e = 0; e < l; e++) {
          c = u[m][e];
          s = a[p.setMethods[m]] || (a[p.setMethods[m]] = {});
          s.target = c[0];
          s[m] = c[1]
        }
      }
      if (a.setPosition) {
        c = a.setPosition;
        d = (c.left === undefined) ? undefined : parseFloat(c.left);
        q = (c.top === undefined) ? undefined : parseFloat(c.top);
        c.target.setPosition(d, q)
      }
      if (a.setPagePosition) {
        c = a.setPagePosition;
        c.target.setPagePosition(c.x, c.y)
      }
      if (a.setSize) {
        c = a.setSize;
        t = (c.width === undefined) ? c.target.getWidth() : parseFloat(c.width);
        k = (c.height === undefined) ? c.target.getHeight() : parseFloat(
          c.height);
        c.target.el.setSize(t, k);
        if (b || p.dynamic) {
          Ext.GlobalEvents.on({
            idle: Ext.Function.bind(c.target.setSize, c.target, [t, k]),
            single: true
          })
        }
      }
      if (a.setOpacity) {
        c = a.setOpacity;
        c.target.el.setStyle("opacity", c.opacity)
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.fx.target, "Component"], 0));
(Ext.cmd.derive("Ext.fx.Queue", Ext.Base, {
  constructor: function() {
    this.targets = new Ext.util.HashMap();
    this.fxQueue = {}
  },
  getFxDefaults: function(a) {
    var b = this.targets.get(a);
    if (b) {
      return b.fxDefaults
    }
    return {}
  },
  setFxDefaults: function(a, c) {
    var b = this.targets.get(a);
    if (b) {
      b.fxDefaults = Ext.apply(b.fxDefaults || {}, c)
    }
  },
  stopAnimation: function(b) {
    var e = this,
      a = e.getFxQueue(b),
      d = a.length,
      c;
    while (d) {
      c = a[d - 1];
      if (c) {
        c.end()
      }
      d--
    }
  },
  getActiveAnimation: function(b) {
    var a = this.getFxQueue(b);
    return (a && !!a.length) ? a[0] : false
  },
  hasFxBlock: function(b) {
    var a = this.getFxQueue(b);
    return a && a[0] && a[0].block
  },
  getFxQueue: function(b) {
    if (!b) {
      return false
    }
    var c = this,
      a = c.fxQueue[b],
      d = c.targets.get(b);
    if (!d) {
      return false
    }
    if (!a) {
      c.fxQueue[b] = [];
      if (d.type !== "element") {
        d.target.on("destroy", function() {
          c.fxQueue[b] = []
        })
      }
    }
    return c.fxQueue[b]
  },
  queueFx: function(d) {
    var c = this,
      e = d.target,
      a, b;
    if (!e) {
      return
    }
    a = c.getFxQueue(e.getId());
    b = a.length;
    if (b) {
      if (d.concurrent) {
        d.paused = false
      } else {
        a[b - 1].on("afteranimate", function() {
          d.paused = false
        })
      }
    } else {
      d.paused = false
    }
    d.on("afteranimate", function() {
      Ext.Array.remove(a, d);
      if (a.length === 0) {
        c.targets.remove(d.target)
      }
      if (d.remove) {
        if (e.type === "element") {
          var f = Ext.get(e.id);
          if (f) {
            f.destroy()
          }
        }
      }
    }, c, {
      single: true
    });
    a.push(d)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.fx, "Queue"], 0));
(Ext.cmd.derive("Ext.fx.Manager", Ext.Base, {
  singleton: true,
  constructor: function() {
    var a = this;
    a.items = new Ext.util.MixedCollection();
    a.targetArr = {};
    a.mixins.queue.constructor.call(a);
    a.taskRunner = new Ext.util.TaskRunner()
  },
  interval: 16,
  forceJS: true,
  createTarget: function(d) {
    var b = this,
      c = !b.forceJS && Ext.supports.Transitions,
      a;
    b.useCSS3 = c;
    if (d) {
      if (d.tagName || Ext.isString(d) || d.isFly) {
        d = Ext.get(d);
        a = new Ext.fx.target["Element" + (c ? "CSS" : "")](d)
      } else {
        if (d.dom) {
          a = new Ext.fx.target["Element" + (c ? "CSS" : "")](d)
        } else {
          if (d.isComposite) {
            a = new Ext.fx.target["CompositeElement" + (c ? "CSS" : "")](
              d)
          } else {
            if (d.isSprite) {
              a = new Ext.fx.target.Sprite(d)
            } else {
              if (d.isCompositeSprite) {
                a = new Ext.fx.target.CompositeSprite(d)
              } else {
                if (d.isComponent) {
                  a = new Ext.fx.target.Component(d)
                } else {
                  if (d.isAnimTarget) {
                    return d
                  } else {
                    return null
                  }
                }
              }
            }
          }
        }
      }
      b.targets.add(a);
      return a
    } else {
      return null
    }
  },
  addAnim: function(d) {
    var c = this,
      b = c.items,
      a = c.task;
    b.add(d.id, d);
    if (!a && b.length) {
      a = c.task = {
        run: c.runner,
        interval: c.interval,
        scope: c
      };
      c.taskRunner.start(a)
    }
  },
  removeAnim: function(d) {
    var c = this,
      b = c.items,
      a = c.task;
    b.removeAtKey(d.id);
    if (a && !b.length) {
      c.taskRunner.stop(a);
      delete c.task
    }
  },
  runner: function() {
    var d = this,
      b = d.items.getRange(),
      c = 0,
      a = b.length,
      e;
    d.targetArr = {};
    d.timestamp = new Date();
    for (; c < a; c++) {
      e = b[c];
      if (e.isReady()) {
        d.startAnim(e)
      }
    }
    for (c = 0; c < a; c++) {
      e = b[c];
      if (e.isRunning()) {
        d.runAnim(e)
      }
    }
    d.applyPendingAttrs();
    d.targetArr = null
  },
  startAnim: function(a) {
    a.start(this.timestamp)
  },
  runAnim: function(e, a) {
    if (!e) {
      return
    }
    var d = this,
      g = d.useCSS3 && e.target.type === "element",
      b = d.timestamp - e.startTime,
      c = (b >= e.duration),
      f, h;
    if (a) {
      b = e.duration;
      c = true
    }
    f = this.collectTargetData(e, b, g, c);
    if (g) {
      e.target.setAttr(f.anims[e.id].attributes, true);
      d.collectTargetData(e, e.duration, g, c);
      e.paused = true;
      f = e.target.target;
      if (e.target.isComposite) {
        f = e.target.target.last()
      }
      h = {};
      h[Ext.supports.CSS3TransitionEnd] = e.lastFrame;
      h.scope = e;
      h.single = true;
      f.on(h)
    }
    return f
  },
  jumpToEnd: function(c) {
    var b = this,
      d, a;
    if (!b.targetArr) {
      b.targetArr = {};
      a = true
    }
    d = b.runAnim(c, true);
    b.applyAnimAttrs(d, d.anims[c.id]);
    if (a) {
      b.targetArr = null
    }
  },
  collectTargetData: function(c, a, e, f) {
    var b = c.target.getId(),
      d = this.targetArr[b];
    if (!d) {
      d = this.targetArr[b] = {
        id: b,
        el: c.target,
        anims: {}
      }
    }
    d.anims[c.id] = {
      id: c.id,
      anim: c,
      elapsed: a,
      isLastFrame: f,
      attributes: [{
        duration: c.duration,
        easing: (e && c.reverse) ? c.easingFn.reverse().toCSS3() : c
          .easing,
        attrs: c.runAnim(a)
      }]
    };
    return d
  },
  applyAnimAttrs: function(c, a) {
    var b = a.anim;
    if (a.attributes && b.isRunning()) {
      c.el.setAttr(a.attributes, false, a.isLastFrame);
      if (a.isLastFrame) {
        b.lastFrame()
      }
    }
  },
  applyPendingAttrs: function() {
    var e = this.targetArr,
      f, c, b, d, a;
    for (c in e) {
      if (e.hasOwnProperty(c)) {
        f = e[c];
        for (a in f.anims) {
          if (f.anims.hasOwnProperty(a)) {
            b = f.anims[a];
            d = b.anim;
            if (b.attributes && d.isRunning()) {
              f.el.setAttr(b.attributes, false, b.isLastFrame);
              if (b.isLastFrame) {
                d.lastFrame()
              }
            }
          }
        }
      }
    }
  }
}, 1, 0, 0, 0, 0, [
  ["queue", Ext.fx.Queue]
], [Ext.fx, "Manager"], 0));
(Ext.cmd.derive("Ext.fx.Animator", Ext.Base, {
  isAnimator: true,
  duration: 250,
  delay: 0,
  delayStart: 0,
  dynamic: false,
  easing: "ease",
  running: false,
  paused: false,
  damper: 1,
  iterations: 1,
  currentIteration: 0,
  keyframeStep: 0,
  animKeyFramesRE: /^(from|to|\d+%?)$/,
  constructor: function(a) {
    var b = this;
    a = Ext.apply(b, a || {});
    b.config = a;
    b.id = Ext.id(null, "ext-animator-");
    b.mixins.observable.constructor.call(b, a);
    b.timeline = [];
    b.createTimeline(b.keyframes);
    if (b.target) {
      b.applyAnimator(b.target);
      Ext.fx.Manager.addAnim(b)
    }
  },
  sorter: function(d, c) {
    return d.pct - c.pct
  },
  createTimeline: function(d) {
    var g = this,
      k = [],
      h = g.to || {},
      b = g.duration,
      l, a, c, f, j, e;
    for (j in d) {
      if (d.hasOwnProperty(j) && g.animKeyFramesRE.test(j)) {
        e = {
          attrs: Ext.apply(d[j], h)
        };
        if (j === "from") {
          j = 0
        } else {
          if (j === "to") {
            j = 100
          }
        }
        e.pct = parseInt(j, 10);
        k.push(e)
      }
    }
    Ext.Array.sort(k, g.sorter);
    f = k.length;
    for (c = 0; c < f; c++) {
      l = (k[c - 1]) ? b * (k[c - 1].pct / 100) : 0;
      a = b * (k[c].pct / 100);
      g.timeline.push({
        duration: a - l,
        attrs: k[c].attrs
      })
    }
  },
  applyAnimator: function(d) {
    var g = this,
      h = [],
      k = g.timeline,
      f = k.length,
      b, e, a, j, c;
    if (g.fireEvent("beforeanimate", g) !== false) {
      for (c = 0; c < f; c++) {
        b = k[c];
        j = b.attrs;
        e = j.easing || g.easing;
        a = j.damper || g.damper;
        delete j.easing;
        delete j.damper;
        b = new Ext.fx.Anim({
          target: d,
          easing: e,
          damper: a,
          duration: b.duration,
          paused: true,
          to: j
        });
        h.push(b)
      }
      g.animations = h;
      g.target = b.target;
      for (c = 0; c < f - 1; c++) {
        b = h[c];
        b.nextAnim = h[c + 1];
        b.on("afteranimate", function() {
          this.nextAnim.paused = false
        });
        b.on("afteranimate", function() {
          this.fireEvent("keyframe", this, ++this.keyframeStep)
        }, g)
      }
      h[f - 1].on("afteranimate", function() {
        this.lastFrame()
      }, g)
    }
  },
  start: function(d) {
    var e = this,
      c = e.delay,
      b = e.delayStart,
      a;
    if (c) {
      if (!b) {
        e.delayStart = d;
        return
      } else {
        a = d - b;
        if (a < c) {
          return
        } else {
          d = new Date(b.getTime() + c)
        }
      }
    }
    if (e.fireEvent("beforeanimate", e) !== false) {
      e.startTime = d;
      e.running = true;
      e.animations[e.keyframeStep].paused = false
    }
  },
  lastFrame: function() {
    var c = this,
      a = c.iterations,
      b = c.currentIteration;
    b++;
    if (b < a) {
      c.startTime = new Date();
      c.currentIteration = b;
      c.keyframeStep = 0;
      c.applyAnimator(c.target);
      c.animations[c.keyframeStep].paused = false
    } else {
      c.currentIteration = 0;
      c.end()
    }
  },
  end: function() {
    var a = this;
    a.fireEvent("afteranimate", a, a.startTime, new Date() - a.startTime)
  },
  isReady: function() {
    return this.paused === false && this.running === false && this.iterations >
      0
  },
  isRunning: function() {
    return false
  }
}, 1, 0, 0, 0, 0, [
  ["observable", Ext.util.Observable]
], [Ext.fx, "Animator"], 0));
(Ext.cmd.derive("Ext.fx.CubicBezier", Ext.Base, {
  singleton: true,
  cubicBezierAtTime: function(n, d, b, m, l, h) {
    var i = 3 * d,
      k = 3 * (m - d) - i,
      a = 1 - i - k,
      g = 3 * b,
      j = 3 * (l - b) - g,
      o = 1 - g - j;

    function f(p) {
      return ((a * p + k) * p + i) * p
    }

    function c(p, r) {
      var q = e(p, r);
      return ((o * q + j) * q + g) * q
    }

    function e(p, w) {
      var v, u, s, q, t, r;
      for (s = p, r = 0; r < 8; r++) {
        q = f(s) - p;
        if (Math.abs(q) < w) {
          return s
        }
        t = (3 * a * s + 2 * k) * s + i;
        if (Math.abs(t) < 0.000001) {
          break
        }
        s = s - q / t
      }
      v = 0;
      u = 1;
      s = p;
      if (s < v) {
        return v
      }
      if (s > u) {
        return u
      }
      while (v < u) {
        q = f(s);
        if (Math.abs(q - p) < w) {
          return s
        }
        if (p > q) {
          v = s
        } else {
          u = s
        }
        s = (u - v) / 2 + v
      }
      return s
    }
    return c(n, 1 / (200 * h))
  },
  cubicBezier: function(b, e, a, c) {
    var d = function(f) {
      return Ext.fx.CubicBezier.cubicBezierAtTime(f, b, e, a, c, 1)
    };
    d.toCSS3 = function() {
      return "cubic-bezier(" + [b, e, a, c].join(",") + ")"
    };
    d.reverse = function() {
      return Ext.fx.CubicBezier.cubicBezier(1 - a, 1 - c, 1 - b, 1 - e)
    };
    return d
  }
}, 0, 0, 0, 0, 0, 0, [Ext.fx, "CubicBezier"], 0));
(Ext.cmd.derive("Ext.fx.Easing", Ext.Base, function() {
  var e = Math,
    g = e.PI,
    d = e.pow,
    b = e.sin,
    f = e.sqrt,
    a = e.abs,
    c = 1.70158;
  return {
    singleton: true,
    linear: Ext.identityFn,
    ease: function(p) {
      var k = 0.07813 - p / 2,
        j = f(0.0066 + k * k),
        h = j - k,
        o = d(a(h), 1 / 3) * (h < 0 ? -1 : 1),
        m = -j - k,
        l = d(a(m), 1 / 3) * (m < 0 ? -1 : 1),
        i = o + l + 0.25;
      return d(1 - i, 2) * 3 * i * 0.1 + (1 - i) * 3 * i * i + i * i * i
    },
    easeIn: function(h) {
      return d(h, 1.7)
    },
    easeOut: function(h) {
      return d(h, 0.48)
    },
    easeInOut: function(p) {
      var k = 0.48 - p / 1.04,
        j = f(0.1734 + k * k),
        h = j - k,
        o = d(a(h), 1 / 3) * (h < 0 ? -1 : 1),
        m = -j - k,
        l = d(a(m), 1 / 3) * (m < 0 ? -1 : 1),
        i = o + l + 0.5;
      return (1 - i) * 3 * i * i + i * i * i
    },
    backIn: function(h) {
      return h * h * ((c + 1) * h - c)
    },
    backOut: function(h) {
      h = h - 1;
      return h * h * ((c + 1) * h + c) + 1
    },
    elasticIn: function(j) {
      if (j === 0 || j === 1) {
        return j
      }
      var i = 0.3,
        h = i / 4;
      return d(2, -10 * j) * b((j - h) * (2 * g) / i) + 1
    },
    elasticOut: function(h) {
      return 1 - Ext.fx.Easing.elasticIn(1 - h)
    },
    bounceIn: function(h) {
      return 1 - Ext.fx.Easing.bounceOut(1 - h)
    },
    bounceOut: function(k) {
      var i = 7.5625,
        j = 2.75,
        h;
      if (k < (1 / j)) {
        h = i * k * k
      } else {
        if (k < (2 / j)) {
          k -= (1.5 / j);
          h = i * k * k + 0.75
        } else {
          if (k < (2.5 / j)) {
            k -= (2.25 / j);
            h = i * k * k + 0.9375
          } else {
            k -= (2.625 / j);
            h = i * k * k + 0.984375
          }
        }
      }
      return h
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.fx, "Easing"], function(b) {
  var c = b.self,
    a = c.prototype;
  c.addMembers({
    "back-in": a.backIn,
    "back-out": a.backOut,
    "ease-in": a.easeIn,
    "ease-out": a.easeOut,
    "elastic-in": a.elasticIn,
    "elastic-out": a.elasticOut,
    "bounce-in": a.bounceIn,
    "bounce-out": a.bounceOut,
    "ease-in-out": a.easeInOut
  })
}));
(Ext.cmd.derive("Ext.fx.DrawPath", Ext.Base, {
  singleton: true,
  pathToStringRE: /,?([achlmqrstvxz]),?/gi,
  pathCommandRE: /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,
  pathValuesRE: /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,
  stopsRE: /^(\d+%?)$/,
  radian: Math.PI / 180,
  is: function(b, a) {
    a = String(a).toLowerCase();
    return (a == "object" && b === Object(b)) || (a == "undefined" &&
      typeof b == a) || (a == "null" && b === null) || (a == "array" &&
      Array.isArray && Array.isArray(b)) || (Object.prototype.toString.call(
      b).toLowerCase().slice(8, -1)) == a
  },
  path2string: function() {
    return this.join(",").replace(Ext.fx.DrawPath.pathToStringRE, "$1")
  },
  pathToString: function(a) {
    return a.join(",").replace(Ext.fx.DrawPath.pathToStringRE, "$1")
  },
  parsePathString: function(a) {
    if (!a) {
      return null
    }
    var d = {
        a: 7,
        c: 6,
        h: 1,
        l: 2,
        m: 2,
        q: 4,
        s: 4,
        t: 2,
        v: 1,
        z: 0
      },
      c = [],
      b = this;
    if (b.is(a, "array") && b.is(a[0], "array")) {
      c = b.pathClone(a)
    }
    if (!c.length) {
      String(a).replace(b.pathCommandRE, function(f, e, i) {
        var h = [],
          g = e.toLowerCase();
        i.replace(b.pathValuesRE, function(k, j) {
          if (j) {
            h.push(+j)
          }
        });
        if (g == "m" && h.length > 2) {
          c.push([e].concat(Ext.Array.splice(h, 0, 2)));
          g = "l";
          e = (e == "m") ? "l" : "L"
        }
        while (h.length >= d[g]) {
          c.push([e].concat(Ext.Array.splice(h, 0, d[g])));
          if (!d[g]) {
            break
          }
        }
      })
    }
    c.toString = b.path2string;
    return c
  },
  pathClone: function(f) {
    var c = [],
      a, e, b, d;
    if (!this.is(f, "array") || !this.is(f && f[0], "array")) {
      f = this.parsePathString(f)
    }
    for (b = 0, d = f.length; b < d; b++) {
      c[b] = [];
      for (a = 0, e = f[b].length; a < e; a++) {
        c[b][a] = f[b][a]
      }
    }
    c.toString = this.path2string;
    return c
  },
  pathToAbsolute: function(c) {
    if (!this.is(c, "array") || !this.is(c && c[0], "array")) {
      c = this.parsePathString(c)
    }
    var h = [],
      l = 0,
      k = 0,
      n = 0,
      m = 0,
      f = 0,
      g = c.length,
      b, d, e, a;
    if (g && c[0][0] == "M") {
      l = +c[0][1];
      k = +c[0][2];
      n = l;
      m = k;
      f++;
      h[0] = ["M", l, k]
    }
    for (; f < g; f++) {
      b = h[f] = [];
      d = c[f];
      if (d[0] != d[0].toUpperCase()) {
        b[0] = d[0].toUpperCase();
        switch (b[0]) {
          case "A":
            b[1] = d[1];
            b[2] = d[2];
            b[3] = d[3];
            b[4] = d[4];
            b[5] = d[5];
            b[6] = +(d[6] + l);
            b[7] = +(d[7] + k);
            break;
          case "V":
            b[1] = +d[1] + k;
            break;
          case "H":
            b[1] = +d[1] + l;
            break;
          case "M":
            n = +d[1] + l;
            m = +d[2] + k;
          default:
            e = 1;
            a = d.length;
            for (; e < a; e++) {
              b[e] = +d[e] + ((e % 2) ? l : k)
            }
        }
      } else {
        e = 0;
        a = d.length;
        for (; e < a; e++) {
          h[f][e] = d[e]
        }
      }
      switch (b[0]) {
        case "Z":
          l = n;
          k = m;
          break;
        case "H":
          l = b[1];
          break;
        case "V":
          k = b[1];
          break;
        case "M":
          d = h[f];
          a = d.length;
          n = d[a - 2];
          m = d[a - 1];
        default:
          d = h[f];
          a = d.length;
          l = d[a - 2];
          k = d[a - 1]
      }
    }
    h.toString = this.path2string;
    return h
  },
  interpolatePaths: function(q, k) {
    var h = this,
      d = h.pathToAbsolute(q),
      l = h.pathToAbsolute(k),
      m = {
        x: 0,
        y: 0,
        bx: 0,
        by: 0,
        X: 0,
        Y: 0,
        qx: null,
        qy: null
      },
      a = {
        x: 0,
        y: 0,
        bx: 0,
        by: 0,
        X: 0,
        Y: 0,
        qx: null,
        qy: null
      },
      b = function(p, r) {
        if (p[r].length > 7) {
          p[r].shift();
          var s = p[r];
          while (s.length) {
            Ext.Array.splice(p, r++, 0, ["C"].concat(Ext.Array.splice(s,
              0, 6)))
          }
          Ext.Array.erase(p, r, 1);
          n = Math.max(d.length, l.length || 0)
        }
      },
      c = function(u, t, r, p, s) {
        if (u && t && u[s][0] == "M" && t[s][0] != "M") {
          Ext.Array.splice(t, s, 0, ["M", p.x, p.y]);
          r.bx = 0;
          r.by = 0;
          r.x = u[s][1];
          r.y = u[s][2];
          n = Math.max(d.length, l.length || 0)
        }
      },
      g, n, f, o, e, j;
    for (g = 0, n = Math.max(d.length, l.length || 0); g < n; g++) {
      d[g] = h.command2curve(d[g], m);
      b(d, g);
      (l[g] = h.command2curve(l[g], a));
      b(l, g);
      c(d, l, m, a, g);
      c(l, d, a, m, g);
      f = d[g];
      o = l[g];
      e = f.length;
      j = o.length;
      m.x = f[e - 2];
      m.y = f[e - 1];
      m.bx = parseFloat(f[e - 4]) || m.x;
      m.by = parseFloat(f[e - 3]) || m.y;
      a.bx = (parseFloat(o[j - 4]) || a.x);
      a.by = (parseFloat(o[j - 3]) || a.y);
      a.x = o[j - 2];
      a.y = o[j - 1]
    }
    return [d, l]
  },
  command2curve: function(c, b) {
    var a = this;
    if (!c) {
      return ["C", b.x, b.y, b.x, b.y, b.x, b.y]
    }
    if (c[0] != "T" && c[0] != "Q") {
      b.qx = b.qy = null
    }
    switch (c[0]) {
      case "M":
        b.X = c[1];
        b.Y = c[2];
        break;
      case "A":
        c = ["C"].concat(a.arc2curve.apply(a, [b.x, b.y].concat(c.slice(1))));
        break;
      case "S":
        c = ["C", b.x + (b.x - (b.bx || b.x)), b.y + (b.y - (b.by || b.y))]
          .concat(c.slice(1));
        break;
      case "T":
        b.qx = b.x + (b.x - (b.qx || b.x));
        b.qy = b.y + (b.y - (b.qy || b.y));
        c = ["C"].concat(a.quadratic2curve(b.x, b.y, b.qx, b.qy, c[1], c[
          2]));
        break;
      case "Q":
        b.qx = c[1];
        b.qy = c[2];
        c = ["C"].concat(a.quadratic2curve(b.x, b.y, c[1], c[2], c[3], c[
          4]));
        break;
      case "L":
        c = ["C"].concat(b.x, b.y, c[1], c[2], c[1], c[2]);
        break;
      case "H":
        c = ["C"].concat(b.x, b.y, c[1], b.y, c[1], b.y);
        break;
      case "V":
        c = ["C"].concat(b.x, b.y, b.x, c[1], b.x, c[1]);
        break;
      case "Z":
        c = ["C"].concat(b.x, b.y, b.X, b.Y, b.X, b.Y);
        break
    }
    return c
  },
  quadratic2curve: function(b, d, g, e, a, c) {
    var f = 1 / 3,
      h = 2 / 3;
    return [f * b + h * g, f * d + h * e, f * a + h * g, f * c + h * e, a,
      c
    ]
  },
  rotate: function(b, g, a) {
    var d = Math.cos(a),
      c = Math.sin(a),
      f = b * d - g * c,
      e = b * c + g * d;
    return {
      x: f,
      y: e
    }
  },
  arc2curve: function(r, ae, G, E, w, m, f, q, ad, z) {
    var u = this,
      d = Math.PI,
      v = u.radian,
      D = d * 120 / 180,
      b = v * (+w || 0),
      L = [],
      I = Math,
      S = I.cos,
      a = I.sin,
      U = I.sqrt,
      s = I.abs,
      n = I.asin,
      H, N, M, Z, c, Q, T, B, A, l, j, p, g, ac, e, ab, O, R, P, aa, Y, X,
      V, K, W, J, C, F, o;
    if (!z) {
      H = u.rotate(r, ae, -b);
      r = H.x;
      ae = H.y;
      H = u.rotate(q, ad, -b);
      q = H.x;
      ad = H.y;
      N = (r - q) / 2;
      M = (ae - ad) / 2;
      Z = (N * N) / (G * G) + (M * M) / (E * E);
      if (Z > 1) {
        Z = U(Z);
        G = Z * G;
        E = Z * E
      }
      c = G * G;
      Q = E * E;
      T = (m == f ? -1 : 1) * U(s((c * Q - c * M * M - Q * N * N) / (c *
        M * M + Q * N * N)));
      B = T * G * M / E + (r + q) / 2;
      A = T * -E * N / G + (ae + ad) / 2;
      l = n(((ae - A) / E).toFixed(7));
      j = n(((ad - A) / E).toFixed(7));
      l = r < B ? d - l : l;
      j = q < B ? d - j : j;
      if (l < 0) {
        l = d * 2 + l
      }
      if (j < 0) {
        j = d * 2 + j
      }
      if (f && l > j) {
        l = l - d * 2
      }
      if (!f && j > l) {
        j = j - d * 2
      }
    } else {
      l = z[0];
      j = z[1];
      B = z[2];
      A = z[3]
    }
    p = j - l;
    if (s(p) > D) {
      C = j;
      F = q;
      o = ad;
      j = l + D * (f && j > l ? 1 : -1);
      q = B + G * S(j);
      ad = A + E * a(j);
      L = u.arc2curve(q, ad, G, E, w, 0, f, F, o, [j, C, B, A])
    }
    p = j - l;
    g = S(l);
    ac = a(l);
    e = S(j);
    ab = a(j);
    O = I.tan(p / 4);
    R = 4 / 3 * G * O;
    P = 4 / 3 * E * O;
    aa = [r, ae];
    Y = [r + R * ac, ae - P * g];
    X = [q + R * ab, ad - P * e];
    V = [q, ad];
    Y[0] = 2 * aa[0] - Y[0];
    Y[1] = 2 * aa[1] - Y[1];
    if (z) {
      return [Y, X, V].concat(L)
    } else {
      L = [Y, X, V].concat(L).join().split(",");
      K = [];
      J = L.length;
      for (W = 0; W < J; W++) {
        K[W] = W % 2 ? u.rotate(L[W - 1], L[W], b).y : u.rotate(L[W], L[W +
          1], b).x
      }
      return K
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.fx, "DrawPath"], 0));
(Ext.cmd.derive("Ext.fx.PropertyHandler", Ext.Base, {
  statics: {
    defaultHandler: {
      pixelDefaultsRE: /width|height|top$|bottom$|left$|right$/i,
      unitRE: /^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/,
      scrollRE: /^scroll/i,
      computeDelta: function(i, c, a, f, h) {
        a = (typeof a == "number") ? a : 1;
        var g = this.unitRE,
          d = g.exec(i),
          b, e;
        if (d) {
          i = d[1];
          e = d[2];
          if (!this.scrollRE.test(h) && !e && this.pixelDefaultsRE.test(h)) {
            e = "px"
          }
        }
        i = +i || 0;
        d = g.exec(c);
        if (d) {
          c = d[1];
          e = d[2] || e
        }
        c = +c || 0;
        b = (f != null) ? f : i;
        return {
          from: i,
          delta: (c - b) * a,
          units: e
        }
      },
      get: function(n, b, a, m, h) {
        var l = n.length,
          d = [],
          e, g, k, c, f;
        for (e = 0; e < l; e++) {
          if (m) {
            g = m[e][1].from
          }
          if (Ext.isArray(n[e][1]) && Ext.isArray(b)) {
            k = [];
            c = 0;
            f = n[e][1].length;
            for (; c < f; c++) {
              k.push(this.computeDelta(n[e][1][c], b[c], a, g, h))
            }
            d.push([n[e][0], k])
          } else {
            d.push([n[e][0], this.computeDelta(n[e][1], b, a, g, h)])
          }
        }
        return d
      },
      set: function(k, f) {
        var g = k.length,
          c = [],
          d, a, h, e, b;
        for (d = 0; d < g; d++) {
          a = k[d][1];
          if (Ext.isArray(a)) {
            h = [];
            b = 0;
            e = a.length;
            for (; b < e; b++) {
              h.push(a[b].from + a[b].delta * f + (a[b].units || 0))
            }
            c.push([k[d][0], h])
          } else {
            c.push([k[d][0], a.from + a.delta * f + (a.units || 0)])
          }
        }
        return c
      }
    },
    stringHandler: {
      computeDelta: function(e, b, d, c, a) {
        return {
          from: e,
          delta: b
        }
      },
      get: function(j, b, a, h, f) {
        var g = j.length,
          c = [],
          d, e;
        for (d = 0; d < g; d++) {
          c.push([j[d][0], this.computeDelta(j[d][1], b, a, e, f)])
        }
        return c
      },
      set: function(a, f) {
        var d = a.length,
          b = [],
          c, e;
        for (c = 0; c < d; c++) {
          e = a[c][1];
          b.push([a[c][0], e.delta])
        }
        return b
      }
    },
    color: {
      rgbRE: /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
      hexRE: /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
      hex3RE: /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i,
      parseColor: function(e, a) {
        a = (typeof a == "number") ? a : 1;
        var f = false,
          c = [this.hexRE, this.rgbRE, this.hex3RE],
          d = c.length,
          h, b, j, g;
        for (g = 0; g < d; g++) {
          j = c[g];
          b = (g % 2 === 0) ? 16 : 10;
          h = j.exec(e);
          if (h && h.length === 4) {
            if (g === 2) {
              h[1] += h[1];
              h[2] += h[2];
              h[3] += h[3]
            }
            f = {
              red: parseInt(h[1], b),
              green: parseInt(h[2], b),
              blue: parseInt(h[3], b)
            };
            break
          }
        }
        return f || e
      },
      computeDelta: function(g, a, e, c) {
        g = this.parseColor(g);
        a = this.parseColor(a, e);
        var f = c ? c : g,
          b = typeof f,
          d = typeof a;
        if (b === "string" || b === "undefined" || d === "string" || d ===
          "undefined") {
          return a || f
        }
        return {
          from: g,
          delta: {
            red: Math.round((a.red - f.red) * e),
            green: Math.round((a.green - f.green) * e),
            blue: Math.round((a.blue - f.blue) * e)
          }
        }
      },
      get: function(h, a, f, d) {
        var g = h.length,
          c = [],
          e, b;
        for (e = 0; e < g; e++) {
          if (d) {
            b = d[e][1].from
          }
          c.push([h[e][0], this.computeDelta(h[e][1], a, f, b)])
        }
        return c
      },
      set: function(j, e) {
        var f = j.length,
          c = [],
          d, b, a, g, h;
        for (d = 0; d < f; d++) {
          b = j[d][1];
          if (b) {
            g = b.from;
            h = b.delta;
            b = (typeof b === "object" && "red" in b) ? "rgb(" + b.red +
              ", " + b.green + ", " + b.blue + ")" : b;
            b = (typeof b === "object" && b.length) ? b[0] : b;
            if (typeof b === "undefined") {
              return []
            }
            a = typeof b === "string" ? b : "rgb(" + [(g.red + Math.round(
                h.red * e)) % 256, (g.green + Math.round(h.green * e)) %
              256, (g.blue + Math.round(h.blue * e)) % 256
            ].join(",") + ")";
            c.push([j[d][0], a])
          }
        }
        return c
      }
    },
    object: {
      interpolate: function(d, b) {
        b = (typeof b === "number") ? b : 1;
        var a = {},
          c;
        for (c in d) {
          a[c] = parseFloat(d[c]) * b
        }
        return a
      },
      computeDelta: function(g, a, c, b) {
        g = this.interpolate(g);
        a = this.interpolate(a, c);
        var f = b ? b : g,
          e = {},
          d;
        for (d in a) {
          e[d] = a[d] - f[d]
        }
        return {
          from: g,
          delta: e
        }
      },
      get: function(h, a, f, d) {
        var g = h.length,
          c = [],
          e, b;
        for (e = 0; e < g; e++) {
          if (d) {
            b = d[e][1].from
          }
          c.push([h[e][0], this.computeDelta(h[e][1], a, f, b)])
        }
        return c
      },
      set: function(k, f) {
        var g = k.length,
          c = [],
          e = {},
          d, h, j, b, a;
        for (d = 0; d < g; d++) {
          b = k[d][1];
          h = b.from;
          j = b.delta;
          for (a in h) {
            e[a] = h[a] + j[a] * f
          }
          c.push([k[d][0], e])
        }
        return c
      }
    },
    path: {
      computeDelta: function(e, a, c, b) {
        c = (typeof c === "number") ? c : 1;
        var d;
        e = +e || 0;
        a = +a || 0;
        d = (b != null) ? b : e;
        return {
          from: e,
          delta: (a - d) * c
        }
      },
      forcePath: function(a) {
        if (!Ext.isArray(a) && !Ext.isArray(a[0])) {
          a = Ext.fx.DrawPath.parsePathString(a)
        }
        return a
      },
      get: function(b, h, a, p) {
        var c = this.forcePath(h),
          m = [],
          r = b.length,
          d, g, n, f, o, l, e, s, q;
        for (n = 0; n < r; n++) {
          q = this.forcePath(b[n][1]);
          f = Ext.fx.DrawPath.interpolatePaths(q, c);
          q = f[0];
          c = f[1];
          d = q.length;
          s = [];
          for (l = 0; l < d; l++) {
            f = [q[l][0]];
            g = q[l].length;
            for (e = 1; e < g; e++) {
              o = p && p[0][1][l][e].from;
              f.push(this.computeDelta(q[l][e], c[l][e], a, o))
            }
            s.push(f)
          }
          m.push([b[n][0], s])
        }
        return m
      },
      set: function(o, m) {
        var n = o.length,
          e = [],
          g, f, d, h, l, c, a, b;
        for (g = 0; g < n; g++) {
          c = o[g][1];
          h = [];
          a = c.length;
          for (f = 0; f < a; f++) {
            l = [c[f][0]];
            b = c[f].length;
            for (d = 1; d < b; d++) {
              l.push(c[f][d].from + c[f][d].delta * m)
            }
            h.push(l.join(","))
          }
          e.push([o[g][0], h.join(",")])
        }
        return e
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.fx, "PropertyHandler"], function() {
  var b = ["outlineColor", "backgroundColor", "borderColor",
      "borderTopColor", "borderRightColor", "borderBottomColor",
      "borderLeftColor", "fill", "stroke"
    ],
    c = b.length,
    a = 0,
    d;
  for (; a < c; a++) {
    d = b[a];
    this[d] = this.color
  }
  b = ["cursor"];
  c = b.length;
  a = 0;
  for (; a < c; a++) {
    d = b[a];
    this[d] = this.stringHandler
  }
}));
(Ext.cmd.derive("Ext.fx.Anim", Ext.Base, {
  isAnimation: true,
  duration: 250,
  delay: 0,
  delayStart: 0,
  dynamic: false,
  easing: "ease",
  damper: 1,
  bezierRE: /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
  reverse: false,
  running: false,
  paused: false,
  iterations: 1,
  autoEnd: false,
  alternate: false,
  currentIteration: 0,
  startTime: 0,
  frameCount: 0,
  constructor: function(a) {
    var b = this,
      c;
    a = a || {};
    if (a.keyframes) {
      return new Ext.fx.Animator(a)
    }
    Ext.apply(b, a);
    if (b.from === undefined) {
      b.from = {}
    }
    b.propHandlers = {};
    b.config = a;
    b.target = Ext.fx.Manager.createTarget(b.target);
    b.easingFn = Ext.fx.Easing[b.easing];
    b.target.dynamic = b.dynamic;
    if (!b.easingFn) {
      b.easingFn = String(b.easing).match(b.bezierRE);
      if (b.easingFn && b.easingFn.length === 5) {
        c = b.easingFn;
        b.easingFn = Ext.fx.CubicBezier.cubicBezier(+c[1], +c[2], +c[3], +
          c[4])
      }
    }
    b.id = Ext.id(null, "ext-anim-");
    b.mixins.observable.constructor.call(b);
    Ext.fx.Manager.addAnim(b);
    if (a.autoEnd) {
      b.running = true;
      b.jumpToEnd()
    }
  },
  setAttr: function(a, b) {
    return Ext.fx.Manager.items.get(this.id).setAttr(this.target, a, b)
  },
  initAttrs: function() {
    var e = this,
      g = e.from,
      h = e.to,
      f = e.initialFrom || {},
      c = {},
      a, b, i, d;
    for (d in h) {
      if (h.hasOwnProperty(d)) {
        a = e.target.getAttr(d, g[d]);
        b = h[d];
        if (!Ext.fx.PropertyHandler[d]) {
          if (Ext.isObject(b)) {
            i = e.propHandlers[d] = Ext.fx.PropertyHandler.object
          } else {
            i = e.propHandlers[d] = Ext.fx.PropertyHandler.defaultHandler
          }
        } else {
          i = e.propHandlers[d] = Ext.fx.PropertyHandler[d]
        }
        c[d] = i.get(a, b, e.damper, f[d], d)
      }
    }
    e.currentAttrs = c
  },
  start: function(d) {
    var e = this,
      c = e.delay,
      b = e.delayStart,
      a;
    if (c) {
      if (!b) {
        e.delayStart = d;
        return
      } else {
        a = d - b;
        if (a < c) {
          return
        } else {
          d = new Date(b.getTime() + c)
        }
      }
    }
    if (e.fireEvent("beforeanimate", e) !== false) {
      e.startTime = d;
      if (!e.paused && !e.currentAttrs) {
        e.initAttrs()
      }
      e.running = true;
      e.frameCount = 0
    }
  },
  jumpToEnd: function() {
    var a = this;
    if (!a.endWasCalled) {
      if (!a.currentAttrs) {
        a.initAttrs()
      }
      Ext.fx.Manager.jumpToEnd(a);
      a.end()
    }
  },
  runAnim: function(k) {
    var h = this,
      j = h.currentAttrs,
      d = h.duration,
      c = h.easingFn,
      b = h.propHandlers,
      f = {},
      g, i, e, a;
    if (k >= d) {
      k = d;
      a = true
    }
    if (h.reverse) {
      k = d - k
    }
    for (e in j) {
      if (j.hasOwnProperty(e)) {
        i = j[e];
        g = a ? 1 : c(k / d);
        f[e] = b[e].set(i, g)
      }
    }
    h.frameCount++;
    return f
  },
  lastFrame: function() {
    var c = this,
      a = c.iterations,
      b = c.currentIteration;
    b++;
    if (b < a) {
      if (c.alternate) {
        c.reverse = !c.reverse
      }
      c.startTime = new Date();
      c.currentIteration = b;
      c.paused = false
    } else {
      c.currentIteration = 0;
      c.end();
      c.fireEvent("lastframe", c, c.startTime)
    }
  },
  endWasCalled: 0,
  end: function() {
    var a = this;
    if (a.endWasCalled++) {
      return
    }
    a.startTime = 0;
    a.paused = false;
    a.running = false;
    Ext.fx.Manager.removeAnim(a);
    a.fireEvent("afteranimate", a, a.startTime);
    Ext.callback(a.callback, a.scope, [a, a.startTime]);
    if (a.remove) {
      a.target.destroy()
    }
  },
  isReady: function() {
    return this.paused === false && this.running === false && this.iterations >
      0
  },
  isRunning: function() {
    return this.paused === false && this.running === true && this.isAnimator !==
      true
  }
}, 1, 0, 0, 0, 0, [
  ["observable", Ext.util.Observable]
], [Ext.fx, "Anim"], 0));
Ext.enableFx = true;
(Ext.cmd.derive("Ext.util.Animate", Ext.Base, {
  mixinId: "animate",
  isAnimate: true,
  animate: function(a) {
    var b = this;
    if (Ext.fx.Manager.hasFxBlock(b.id)) {
      return b
    }
    Ext.fx.Manager.queueFx(new Ext.fx.Anim(b.anim(a)));
    return this
  },
  anim: function(a) {
    if (!Ext.isObject(a)) {
      return (a) ? {} : false
    }
    var b = this;
    if (a.stopAnimation) {
      b.stopAnimation()
    }
    Ext.applyIf(a, Ext.fx.Manager.getFxDefaults(b.id));
    return Ext.apply({
      target: b,
      paused: true
    }, a)
  },
  getAnimationProps: function() {
    var b = this,
      a = b.layout;
    return a && a.animate ? a.animate : {}
  },
  stopFx: Ext.Function.alias(Ext.util.Animate, "stopAnimation"),
  stopAnimation: function() {
    Ext.fx.Manager.stopAnimation(this.id);
    return this
  },
  syncFx: function() {
    Ext.fx.Manager.setFxDefaults(this.id, {
      concurrent: true
    });
    return this
  },
  sequenceFx: function() {
    Ext.fx.Manager.setFxDefaults(this.id, {
      concurrent: false
    });
    return this
  },
  hasActiveFx: Ext.Function.alias(Ext.util.Animate, "getActiveAnimation"),
  getActiveAnimation: function() {
    return Ext.fx.Manager.getActiveAnimation(this.id)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util, "Animate"], 0));
(Ext.cmd.derive("Ext.dom.Fly", Ext.dom.Element, {
  alternateClassName: "Ext.dom.Element.Fly",
  validNodeTypes: {
    1: 1,
    9: 1,
    11: 1
  },
  isFly: true,
  constructor: function(a) {
    this.dom = a;
    this.el = this
  },
  attach: function(b) {
    var a = this;
    if (!b) {
      return a.detach()
    }
    a.dom = b;
    if (!Ext.cache[b.id]) {
      a.getData().isSynchronized = false
    }
    return a
  },
  detach: function() {
    this.dom = null
  },
  addListener: null,
  removeListener: null
}, 1, 0, 0, 0, 0, 0, [Ext.dom, "Fly", Ext.dom.Element, "Fly"], function(a) {
  var b = {};
  a.cache = b;
  Ext.fly = function(h, d) {
    var f = null,
      e = Ext.fly,
      c, g;
    d = d || (e.caller && e.caller.$name) || "_global";
    h = Ext.getDom(h);
    if (h) {
      c = h.nodeType;
      if (a.prototype.validNodeTypes[c] || (!c && (h.window == h))) {
        f = Ext.cache[h.id];
        if (!f || f.dom !== h) {
          f = b[d] || (b[d] = new a());
          f.dom = h;
          g = f.getData(true);
          if (g) {
            g.isSynchronized = false
          }
        }
      }
    }
    return f
  }
}));
(Ext.cmd.derive("Ext.dom.CompositeElementLite", Ext.Base, {
  alternateClassName: ["Ext.CompositeElementLite"],
  isComposite: true,
  isLite: true,
  statics: {
    importElementMethods: function() {
      var a = Ext.dom.Element,
        b = this.prototype;
      Ext.Object.each(a.prototype, function(c, d) {
        if (typeof d === "function" && !b[c]) {
          b[c] = function() {
            return this.invoke(c, arguments)
          }
        }
      })
    }
  },
  constructor: function(b, a) {
    if (a) {
      this.elements = b || []
    } else {
      this.elements = [];
      this.add(b)
    }
  },
  getElement: function(b) {
    var a = this._fly || (this._fly = new Ext.dom.Fly());
    return a.attach(b)
  },
  transformElement: function(a) {
    return Ext.getDom(a)
  },
  getCount: function() {
    return this.elements.length
  },
  add: function(c, a) {
    var e = this.elements,
      b, d;
    if (!c) {
      return this
    }
    if (typeof c == "string") {
      c = Ext.fly(a || document).query(c)
    } else {
      if (c.isComposite) {
        c = c.elements
      } else {
        if (!Ext.isIterable(c)) {
          c = [c]
        }
      }
    }
    for (b = 0, d = c.length; b < d; ++b) {
      e.push(this.transformElement(c[b]))
    }
    return this
  },
  invoke: function(e, b) {
    var g = this,
      h = g.elements,
      f = h.length,
      a, d, c;
    if (c !== 0) {
      a = (g.isLite ? Ext.dom.Fly : Ext.dom.Element).prototype;
      for (c = 0; c < f; c++) {
        d = h[c];
        if (d) {
          a[e].apply(g.getElement(d), b)
        }
      }
    }
    return g
  },
  item: function(b) {
    var c = this.elements[b],
      a = null;
    if (c) {
      a = this.getElement(c)
    }
    return a
  },
  slice: function(b, a) {
    return Ext.Array.slice(this.elements, b, a)
  },
  each: function(f, d) {
    var g = this,
      c = g.elements,
      a = c.length,
      b, h;
    for (b = 0; b < a; b++) {
      h = c[b];
      if (h) {
        h = this.getElement(h);
        if (f.call(d || h, h, g, b) === false) {
          break
        }
      }
    }
    return g
  },
  fill: function(a) {
    var b = this;
    b.elements = [];
    b.add(a);
    return b
  },
  insert: function(b, a) {
    Ext.Array.insert(this.elements, b, a)
  },
  filter: function(b) {
    var g = this,
      c = g.elements,
      f = c.length,
      d = [],
      e = 0,
      h = typeof b == "function",
      j, a;
    for (; e < f; e++) {
      a = c[e];
      j = false;
      if (a) {
        a = g.getElement(a);
        if (h) {
          j = b.call(a, a, g, e) !== false
        } else {
          j = a.is(b)
        }
        if (j) {
          d.push(g.transformElement(a))
        }
      }
    }
    g.elements = d;
    return g
  },
  indexOf: function(a) {
    return Ext.Array.indexOf(this.elements, this.transformElement(a))
  },
  replaceElement: function(e, c, a) {
    var b = !isNaN(e) ? e : this.indexOf(e),
      f;
    if (b > -1) {
      c = Ext.getDom(c);
      if (a) {
        f = this.elements[b];
        f.parentNode.insertBefore(c, f);
        Ext.removeNode(f)
      }
      Ext.Array.splice(this.elements, b, 1, c)
    }
    return this
  },
  clear: function(d) {
    var c = this,
      b = c.elements,
      a = b.length - 1;
    if (d) {
      for (; a >= 0; a--) {
        Ext.removeNode(b[a])
      }
    }
    this.elements = []
  },
  addElements: function(d, b) {
    if (!d) {
      return this
    }
    if (typeof d === "string") {
      d = Ext.dom.Element.selectorFunction(d, b)
    }
    var c = this.elements,
      a = d.length,
      f;
    for (f = 0; f < a; f++) {
      c.push(Ext.get(d[f]))
    }
    return this
  },
  first: function() {
    return this.item(0)
  },
  last: function() {
    return this.item(this.getCount() - 1)
  },
  contains: function(a) {
    return this.indexOf(a) != -1
  },
  removeElement: function(e, h) {
    e = [].concat(e);
    var d = this,
      f = d.elements,
      c = e.length,
      g, b, a;
    for (a = 0; a < c; a++) {
      g = e[a];
      if ((b = (f[g] || f[g = d.indexOf(g)]))) {
        if (h) {
          if (b.dom) {
            b.destroy()
          } else {
            Ext.removeNode(b)
          }
        }
        Ext.Array.erase(f, g, 1)
      }
    }
    return d
  },
  destroy: function() {
    return this.invoke("destroy", arguments);
    this.callParent()
  }
}, 1, 0, 0, 0, 0, 0, [Ext.dom, "CompositeElementLite", Ext,
  "CompositeElementLite"
], function(b) {
  var a = b.prototype;
  b.importElementMethods();
  a.on = a.addListener
}));
Ext.define("Ext.overrides.dom.Element", (function() {
  var Element, WIN = window,
    DOC = document,
    HIDDEN = "hidden",
    ISCLIPPED = "isClipped",
    OVERFLOW = "overflow",
    OVERFLOWX = "overflow-x",
    OVERFLOWY = "overflow-y",
    ORIGINALCLIP = "originalClip",
    HEIGHT = "height",
    WIDTH = "width",
    VISIBILITY = "visibility",
    DISPLAY = "display",
    NONE = "none",
    OFFSETS = "offsets",
    CLIP = "clip",
    ORIGINALDISPLAY = "originalDisplay",
    VISMODE = "visibilityMode",
    ISVISIBLE = "isVisible",
    OFFSETCLASS = "x-hidden-offsets",
    CLIPCLASS = "x-hidden-clip",
    boxMarkup = ['<div class="{0}-tl" role="presentation">',
      '<div class="{0}-tr" role="presentation">',
      '<div class="{0}-tc" role="presentation"></div>', "</div>",
      "</div>", '<div class="{0}-ml" role="presentation">',
      '<div class="{0}-mr" role="presentation">',
      '<div class="{0}-mc" role="presentation"></div>', "</div>",
      "</div>", '<div class="{0}-bl" role="presentation">',
      '<div class="{0}-br" role="presentation">',
      '<div class="{0}-bc" role="presentation"></div>', "</div>",
      "</div>"
    ].join(""),
    scriptTagRe = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig,
    replaceScriptTagRe = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
    srcRe = /\ssrc=([\'\"])(.*?)\1/i,
    nonSpaceRe = /\S/,
    typeRe = /\stype=([\'\"])(.*?)\1/i,
    msRe = /^-ms-/,
    camelRe = /(-[a-z])/gi,
    camelReplaceFn = function(m, a) {
      return a.charAt(1).toUpperCase()
    },
    XMASKED = "x-masked",
    XMASKEDRELATIVE = "x-masked-relative",
    EXTELMASKMSG = "x-mask-msg",
    bodyRe = /^body/i,
    propertyCache = {},
    getVisMode = function(el) {
      var data = el.getData(),
        visMode = data[VISMODE];
      if (visMode === undefined) {
        data[VISMODE] = visMode = Element.VISIBILITY
      }
      return visMode
    },
    emptyRange = DOC.createRange ? DOC.createRange() : null,
    inputTags = {
      INPUT: true,
      TEXTAREA: true
    };
  if (Ext.isIE8) {
    var removeNode = Ext.removeNode,
      garbageBin = DOC.createElement("div"),
      destroyQueue = [],
      clearGarbage = Ext.Function.createBuffered(function() {
        var len = destroyQueue.length,
          i;
        for (i = 0; i < len; i++) {
          garbageBin.appendChild(destroyQueue[i])
        }
        garbageBin.innerHTML = "";
        destroyQueue.length = 0
      }, 10);
    Ext.removeNode = function(node) {
      node = node.dom || node;
      removeNode(node);
      destroyQueue[destroyQueue.length] = node;
      clearGarbage()
    }
  }
  return {
    override: "Ext.dom.Element",
    mixins: [Ext.util.Animate],
    skipGarbageCollection: false,
    _init: function(E) {
      Element = E;
      E.tabbableSelector += ",[" + E.tabbableSavedCounterAttribute +
        "]"
    },
    statics: {
      selectableCls: "x-selectable",
      unselectableCls: "x-unselectable",
      tabbableSelector: Ext.supports.CSS3NegationSelector ?
        'a[href],button,iframe,input,select,textarea,[tabindex]:not([tabindex="-1"]),[contenteditable="true"]' : 'a[href],button,iframe,input,select,textarea,[tabindex],[contenteditable="true"]',
      naturallyFocusableTags: {
        BUTTON: true,
        IFRAME: true,
        EMBED: true,
        INPUT: true,
        OBJECT: true,
        SELECT: true,
        TEXTAREA: true,
        HTML: Ext.isIE ? true : false
      },
      naturallyTabbableTags: {
        BUTTON: true,
        IFRAME: true,
        INPUT: true,
        SELECT: true,
        TEXTAREA: true,
        OBJECT: Ext.isIE8m ? true : false
      },
      tabbableSavedCounterAttribute: "data-tabindex-counter",
      tabbableSavedValueAttribute: "data-tabindex-value",
      normalize: function(prop) {
        if (prop === "float") {
          prop = Ext.supports.Float ? "cssFloat" : "styleFloat"
        }
        return propertyCache[prop] || (propertyCache[prop] = prop.replace(
          msRe, "ms-").replace(camelRe, camelReplaceFn))
      }
    },
    addClsOnClick: function(className, testFn, scope) {
      var me = this,
        dom = me.dom,
        hasTest = Ext.isFunction(testFn);
      me.on("mousedown", function() {
        if (hasTest && testFn.call(scope || me, me) === false) {
          return false
        }
        Ext.fly(dom).addCls(className);
        var d = Ext.getDoc(),
          fn = function() {
            Ext.fly(dom).removeCls(className);
            d.removeListener("mouseup", fn)
          };
        d.on("mouseup", fn)
      });
      return me
    },
    addClsOnFocus: function(className, testFn, scope) {
      var me = this,
        dom = me.dom,
        hasTest = Ext.isFunction(testFn);
      me.on("focus", function() {
        if (hasTest && testFn.call(scope || me, me) === false) {
          return false
        }
        Ext.fly(dom).addCls(className)
      });
      me.on("blur", function() {
        Ext.fly(dom).removeCls(className)
      });
      return me
    },
    addClsOnOver: function(className, testFn, scope) {
      var me = this,
        dom = me.dom,
        hasTest = Ext.isFunction(testFn);
      me.hover(function() {
        if (hasTest && testFn.call(scope || me, me) === false) {
          return
        }
        Ext.fly(dom).addCls(className)
      }, function() {
        Ext.fly(dom).removeCls(className)
      });
      return me
    },
    addKeyListener: function(key, fn, scope) {
      var config;
      if (typeof key !== "object" || Ext.isArray(key)) {
        config = {
          target: this,
          key: key,
          fn: fn,
          scope: scope
        }
      } else {
        config = {
          target: this,
          key: key.key,
          shift: key.shift,
          ctrl: key.ctrl,
          alt: key.alt,
          fn: fn,
          scope: scope
        }
      }
      return new Ext.util.KeyMap(config)
    },
    addKeyMap: function(config) {
      return new Ext.util.KeyMap(Ext.apply({
        target: this
      }, config))
    },
    afterAnimate: function() {
      var shadow = this.shadow;
      if (shadow && !shadow.disabled && !shadow.animate) {
        shadow.show()
      }
    },
    anchorAnimX: function(anchor) {
      var xName = (anchor === "l") ? "right" : "left";
      this.dom.style[xName] = "0px"
    },
    anim: function(config) {
      if (!Ext.isObject(config)) {
        return (config) ? {} : false
      }
      var me = this,
        duration = config.duration || Ext.fx.Anim.prototype.duration,
        easing = config.easing || "ease",
        animConfig;
      if (config.stopAnimation) {
        me.stopAnimation()
      }
      Ext.applyIf(config, Ext.fx.Manager.getFxDefaults(me.id));
      Ext.fx.Manager.setFxDefaults(me.id, {
        delay: 0
      });
      animConfig = {
        target: me.dom,
        remove: config.remove,
        alternate: config.alternate || false,
        duration: duration,
        easing: easing,
        callback: config.callback,
        listeners: config.listeners,
        iterations: config.iterations || 1,
        scope: config.scope,
        block: config.block,
        concurrent: config.concurrent,
        delay: config.delay || 0,
        paused: true,
        keyframes: config.keyframes,
        from: config.from || {},
        to: Ext.apply({}, config),
        userConfig: config
      };
      Ext.apply(animConfig.to, config.to);
      delete animConfig.to.to;
      delete animConfig.to.from;
      delete animConfig.to.remove;
      delete animConfig.to.alternate;
      delete animConfig.to.keyframes;
      delete animConfig.to.iterations;
      delete animConfig.to.listeners;
      delete animConfig.to.target;
      delete animConfig.to.paused;
      delete animConfig.to.callback;
      delete animConfig.to.scope;
      delete animConfig.to.duration;
      delete animConfig.to.easing;
      delete animConfig.to.concurrent;
      delete animConfig.to.block;
      delete animConfig.to.stopAnimation;
      delete animConfig.to.delay;
      return animConfig
    },
    animate: function(config) {
      this.addAnimation(config);
      return this
    },
    addAnimation: function(config) {
      var me = this,
        animId = me.dom.id || Ext.id(me.dom),
        listeners, anim, end;
      if (!Ext.fx.Manager.hasFxBlock(animId)) {
        if (config.listeners) {
          listeners = config.listeners;
          delete config.listeners
        }
        if (config.internalListeners) {
          config.listeners = config.internalListeners;
          delete config.internalListeners
        }
        end = config.autoEnd;
        delete config.autoEnd;
        anim = new Ext.fx.Anim(me.anim(config));
        anim.on({
          afteranimate: "afterAnimate",
          beforeanimate: "beforeAnimate",
          scope: me,
          single: true
        });
        if (listeners) {
          anim.on(listeners)
        }
        Ext.fx.Manager.queueFx(anim);
        if (end) {
          anim.jumpToEnd()
        }
      }
      return anim
    },
    beforeAnimate: function() {
      var shadow = this.shadow;
      if (shadow && !shadow.disabled && !shadow.animate) {
        shadow.hide()
      }
    },
    boxWrap: function(cls) {
      cls = cls || "x-box";
      var el = Ext.get(this.insertHtml("beforeBegin", "<div class='" +
        cls + "' role='presentation'>" + Ext.String.format(
          boxMarkup, cls) + "</div>"));
      el.selectNode("." + cls + "-mc").appendChild(this.dom);
      return el
    },
    clean: function(forceReclean) {
      var me = this,
        dom = me.dom,
        data = me.getData(),
        n = dom.firstChild,
        ni = -1,
        nx;
      if (data.isCleaned && forceReclean !== true) {
        return me
      }
      while (n) {
        nx = n.nextSibling;
        if (n.nodeType === 3) {
          if (!(nonSpaceRe.test(n.nodeValue))) {
            dom.removeChild(n)
          } else {
            if (nx && nx.nodeType === 3) {
              n.appendData(Ext.String.trim(nx.data));
              dom.removeChild(nx);
              nx = n.nextSibling;
              n.nodeIndex = ++ni
            }
          }
        } else {
          Ext.fly(n, "_clean").clean();
          n.nodeIndex = ++ni
        }
        n = nx
      }
      data.isCleaned = true;
      return me
    },
    empty: emptyRange ? function() {
      var dom = this.dom;
      if (dom.firstChild) {
        emptyRange.setStartBefore(dom.firstChild);
        emptyRange.setEndAfter(dom.lastChild);
        emptyRange.deleteContents()
      }
    } : function() {
      var dom = this.dom;
      while (dom.lastChild) {
        dom.removeChild(dom.lastChild)
      }
    },
    clearListeners: function() {
      this.removeAnchor();
      arguments.callee.$previous.call(this)
    },
    clearPositioning: function(value) {
      value = value || "";
      return this.setStyle({
        left: value,
        right: value,
        top: value,
        bottom: value,
        "z-index": "",
        position: "static"
      })
    },
    createProxy: function(config, renderTo, matchBox) {
      config = (typeof config === "object") ? config : {
        tag: "div",
        role: "presentation",
        cls: config
      };
      var me = this,
        proxy = renderTo ? Ext.DomHelper.append(renderTo, config, true) :
        Ext.DomHelper.insertBefore(me.dom, config, true);
      proxy.setVisibilityMode(Element.DISPLAY);
      proxy.hide();
      if (matchBox && me.setBox && me.getBox) {
        proxy.setBox(me.getBox())
      }
      return proxy
    },
    clearOpacity: function() {
      return this.setOpacity("")
    },
    clip: function() {
      var me = this,
        data = me.getData(),
        style;
      if (!data[ISCLIPPED]) {
        data[ISCLIPPED] = true;
        style = me.getStyle([OVERFLOW, OVERFLOWX, OVERFLOWY]);
        data[ORIGINALCLIP] = {
          o: style[OVERFLOW],
          x: style[OVERFLOWX],
          y: style[OVERFLOWY]
        };
        me.setStyle(OVERFLOW, HIDDEN);
        me.setStyle(OVERFLOWX, HIDDEN);
        me.setStyle(OVERFLOWY, HIDDEN)
      }
      return me
    },
    destroy: function() {
      var me = this,
        dom = me.dom,
        data = me.getData(),
        maskEl, maskMsg;
      if (dom && me.isAnimate) {
        me.stopAnimation()
      }
      arguments.callee.$previous.call(this);
      if (dom && Ext.isIE8 && (dom.window != dom) && (dom.nodeType !==
          9) && (dom.tagName !== "BODY") && (dom.tagName !== "HTML")) {
        destroyQueue[destroyQueue.length] = dom;
        clearGarbage()
      }
      if (data) {
        maskEl = data.maskEl;
        maskMsg = data.maskMsg;
        if (maskEl) {
          maskEl.destroy()
        }
        if (maskMsg) {
          maskMsg.destroy()
        }
      }
    },
    enableDisplayMode: function(display) {
      var me = this;
      me.setVisibilityMode(Element.DISPLAY);
      if (display !== undefined) {
        me.getData()[ORIGINALDISPLAY] = display
      }
      return me
    },
    fadeIn: function(o) {
      var me = this,
        dom = me.dom;
      me.animate(Ext.apply({}, o, {
        opacity: 1,
        internalListeners: {
          beforeanimate: function(anim) {
            var el = Ext.fly(dom, "_anim");
            if (el.isStyle("display", "none")) {
              el.setDisplayed("")
            } else {
              el.show()
            }
          }
        }
      }));
      return this
    },
    fadeOut: function(o) {
      var me = this,
        dom = me.dom;
      o = Ext.apply({
        opacity: 0,
        internalListeners: {
          afteranimate: function(anim) {
            if (dom && anim.to.opacity === 0) {
              var el = Ext.fly(dom, "_anim");
              if (o.useDisplay) {
                el.setDisplayed(false)
              } else {
                el.hide()
              }
            }
          }
        }
      }, o);
      me.animate(o);
      return me
    },
    fixDisplay: function() {
      var me = this;
      if (me.isStyle(DISPLAY, NONE)) {
        me.setStyle(VISIBILITY, HIDDEN);
        me.setStyle(DISPLAY, me._getDisplay());
        if (me.isStyle(DISPLAY, NONE)) {
          me.setStyle(DISPLAY, "block")
        }
      }
    },
    frame: function(color, count, obj) {
      var me = this,
        dom = me.dom,
        beforeAnim;
      color = color || "#C3DAF9";
      count = count || 1;
      obj = obj || {};
      beforeAnim = function() {
        var el = Ext.fly(dom, "_anim"),
          animScope = this,
          box, proxy, proxyAnim;
        el.show();
        box = el.getBox();
        proxy = Ext.getBody().createChild({
          role: "presentation",
          id: el.dom.id + "-anim-proxy",
          style: {
            position: "absolute",
            "pointer-events": "none",
            "z-index": 35000,
            border: "0px solid " + color
          }
        });
        proxyAnim = new Ext.fx.Anim({
          target: proxy,
          duration: obj.duration || 1000,
          iterations: count,
          from: {
            top: box.y,
            left: box.x,
            borderWidth: 0,
            opacity: 1,
            height: box.height,
            width: box.width
          },
          to: {
            top: box.y - 20,
            left: box.x - 20,
            borderWidth: 10,
            opacity: 0,
            height: box.height + 40,
            width: box.width + 40
          }
        });
        proxyAnim.on("afteranimate", function() {
          proxy.destroy();
          animScope.end()
        })
      };
      me.animate({
        duration: (Math.max(obj.duration, 500) * 2) || 2000,
        listeners: {
          beforeanimate: {
            fn: beforeAnim
          }
        },
        callback: obj.callback,
        scope: obj.scope
      });
      return me
    },
    getColor: function(attr, defaultValue, prefix) {
      var v = this.getStyle(attr),
        color = prefix || prefix === "" ? prefix : "#",
        h, len, i = 0;
      if (!v || (/transparent|inherit/.test(v))) {
        return defaultValue
      }
      if (/^r/.test(v)) {
        v = v.slice(4, v.length - 1).split(",");
        len = v.length;
        for (; i < len; i++) {
          h = parseInt(v[i], 10);
          color += (h < 16 ? "0" : "") + h.toString(16)
        }
      } else {
        v = v.replace("#", "");
        color += v.length === 3 ? v.replace(/^(\w)(\w)(\w)$/,
          "$1$1$2$2$3$3") : v
      }
      return (color.length > 5 ? color.toLowerCase() : defaultValue)
    },
    getLoader: function() {
      var me = this,
        data = me.getData(),
        loader = data.loader;
      if (!loader) {
        data.loader = loader = new Ext.ElementLoader({
          target: me
        })
      }
      return loader
    },
    getPositioning: function(autoPx) {
      var styles = this.getStyle(["left", "top", "position", "z-index"]),
        dom = this.dom;
      if (autoPx) {
        if (styles.left === "auto") {
          styles.left = dom.offsetLeft + "px"
        }
        if (styles.top === "auto") {
          styles.top = dom.offsetTop + "px"
        }
      }
      return styles
    },
    ghost: function(anchor, obj) {
      var me = this,
        dom = me.dom,
        beforeAnim;
      anchor = anchor || "b";
      beforeAnim = function() {
        var el = Ext.fly(dom, "_anim"),
          width = el.getWidth(),
          height = el.getHeight(),
          xy = el.getXY(),
          position = el.getPositioning(),
          to = {
            opacity: 0
          };
        switch (anchor) {
          case "t":
            to.y = xy[1] - height;
            break;
          case "l":
            to.x = xy[0] - width;
            break;
          case "r":
            to.x = xy[0] + width;
            break;
          case "b":
            to.y = xy[1] + height;
            break;
          case "tl":
            to.x = xy[0] - width;
            to.y = xy[1] - height;
            break;
          case "bl":
            to.x = xy[0] - width;
            to.y = xy[1] + height;
            break;
          case "br":
            to.x = xy[0] + width;
            to.y = xy[1] + height;
            break;
          case "tr":
            to.x = xy[0] + width;
            to.y = xy[1] - height;
            break
        }
        this.to = to;
        this.on("afteranimate", function() {
          var el = Ext.fly(dom, "_anim");
          if (el) {
            el.hide();
            el.clearOpacity();
            el.setPositioning(position)
          }
        })
      };
      me.animate(Ext.applyIf(obj || {}, {
        duration: 500,
        easing: "ease-out",
        listeners: {
          beforeanimate: beforeAnim
        }
      }));
      return me
    },
    hide: function(animate) {
      if (typeof animate === "string") {
        this.setVisible(false, animate);
        return this
      }
      this.setVisible(false, this.anim(animate));
      return this
    },
    highlight: function(color, o) {
      var me = this,
        dom = me.dom,
        from = {},
        restore, to, attr, lns, event, fn;
      o = o || {};
      lns = o.listeners || {};
      attr = o.attr || "backgroundColor";
      from[attr] = color || "ffff9c";
      if (!o.to) {
        to = {};
        to[attr] = o.endColor || me.getColor(attr, "ffffff", "")
      } else {
        to = o.to
      }
      o.listeners = Ext.apply(Ext.apply({}, lns), {
        beforeanimate: function() {
          restore = dom.style[attr];
          var el = Ext.fly(dom, "_anim");
          el.clearOpacity();
          el.show();
          event = lns.beforeanimate;
          if (event) {
            fn = event.fn || event;
            return fn.apply(event.scope || lns.scope || WIN,
              arguments)
          }
        },
        afteranimate: function() {
          if (dom) {
            dom.style[attr] = restore
          }
          event = lns.afteranimate;
          if (event) {
            fn = event.fn || event;
            fn.apply(event.scope || lns.scope || WIN, arguments)
          }
        }
      });
      me.animate(Ext.apply({}, o, {
        duration: 1000,
        easing: "ease-in",
        from: from,
        to: to
      }));
      return me
    },
    hover: function(overFn, outFn, scope, options) {
      var me = this;
      me.on("mouseenter", overFn, scope || me.dom, options);
      me.on("mouseleave", outFn, scope || me.dom, options);
      return me
    },
    initDD: function(group, config, overrides) {
      var dd = new Ext.dd.DD(Ext.id(this.dom), group, config);
      return Ext.apply(dd, overrides)
    },
    initDDProxy: function(group, config, overrides) {
      var dd = new Ext.dd.DDProxy(Ext.id(this.dom), group, config);
      return Ext.apply(dd, overrides)
    },
    initDDTarget: function(group, config, overrides) {
      var dd = new Ext.dd.DDTarget(Ext.id(this.dom), group, config);
      return Ext.apply(dd, overrides)
    },
    isFocusable: function() {
      var dom = this.dom,
        focusable = false,
        nodeName;
      if (dom && !dom.disabled) {
        nodeName = dom.nodeName;
        focusable = !!Ext.Element.naturallyFocusableTags[nodeName] || (
            (nodeName === "A" || nodeName === "LINK") && !!dom.href) ||
          dom.getAttribute("tabIndex") != null || dom.contentEditable ===
          "true";
        if (Ext.isIE8 && nodeName === "INPUT" && dom.type === "hidden") {
          focusable = false
        }
        focusable = focusable && this.isVisible(true)
      }
      return focusable
    },
    isInputField: function() {
      var dom = this.dom,
        contentEditable = dom.contentEditable;
      if ((inputTags[dom.tagName] && dom.type !== "button") || (
          contentEditable === "" || contentEditable === "true")) {
        return true
      }
      return false
    },
    isTabbable: function(includeHidden) {
      var dom = this.dom,
        tabbable = false,
        nodeName, hasIndex, tabIndex;
      if (dom && !dom.disabled) {
        nodeName = dom.nodeName;
        tabIndex = dom.getAttribute("tabIndex");
        hasIndex = tabIndex != null;
        tabIndex -= 0;
        if (nodeName === "A" || nodeName === "LINK") {
          if (dom.href) {
            tabbable = hasIndex && tabIndex < 0 ? false : true
          } else {
            if (dom.contentEditable === "true") {
              tabbable = !hasIndex || (hasIndex && tabIndex >= 0) ?
                true : false
            } else {
              tabbable = hasIndex && tabIndex >= 0 ? true : false
            }
          }
        } else {
          if (dom.contentEditable === "true" || Ext.Element.naturallyTabbableTags[
              nodeName]) {
            tabbable = hasIndex && tabIndex < 0 ? false : true
          } else {
            if (hasIndex && tabIndex >= 0) {
              tabbable = true
            }
          }
        }
        if (Ext.isIE8 && nodeName === "INPUT" && dom.type === "hidden") {
          tabbable = false
        }
        tabbable = tabbable && (includeHidden || ((!this.component ||
          this.component.isVisible(true)) && this.isVisible(true)))
      }
      return tabbable
    },
    isMasked: function(deep) {
      var me = this,
        data = me.getData(),
        maskEl = data.maskEl,
        maskMsg = data.maskMsg,
        hasMask = false,
        parent;
      if (maskEl && maskEl.isVisible()) {
        if (maskMsg) {
          maskMsg.center(me)
        }
        hasMask = true
      } else {
        if (deep) {
          parent = me.findParentNode();
          if (parent) {
            return Ext.fly(parent).isMasked(deep)
          }
        }
      }
      return hasMask
    },
    load: function(options) {
      this.getLoader().load(options);
      return this
    },
    mask: function(msg, msgCls, elHeight) {
      var me = this,
        dom = me.dom,
        data = me.getData(),
        maskEl = data.maskEl,
        maskMsg;
      if (!(bodyRe.test(dom.tagName) && me.getStyle("position") ===
          "static")) {
        me.addCls(XMASKEDRELATIVE)
      }
      if (maskEl) {
        maskEl.destroy()
      }
      maskEl = Ext.DomHelper.append(dom, {
        role: "presentation",
        cls: "x-mask x-border-box",
        children: {
          role: "presentation",
          cls: msgCls ? EXTELMASKMSG + " " + msgCls : EXTELMASKMSG,
          cn: {
            tag: "div",
            role: "presentation",
            cls: "x-mask-msg-inner",
            cn: {
              tag: "div",
              role: "presentation",
              cls: "x-mask-msg-text",
              html: msg || ""
            }
          }
        }
      }, true);
      maskMsg = Ext.get(maskEl.dom.firstChild);
      data.maskEl = maskEl;
      me.addCls(XMASKED);
      maskEl.setDisplayed(true);
      if (typeof msg === "string") {
        maskMsg.setDisplayed(true);
        maskMsg.center(me)
      } else {
        maskMsg.setDisplayed(false)
      }
      if (dom === DOC.body) {
        maskEl.addCls("x-mask-fixed")
      }
      me.saveTabbableState({
        skipSelf: dom === DOC.body
      });
      if (Ext.isIE9m && dom !== DOC.body && me.isStyle("height", "auto")) {
        maskEl.setSize(undefined, elHeight || me.getHeight())
      }
      return maskEl
    },
    monitorMouseLeave: function(delay, handler, scope) {
      var me = this,
        timer, listeners = {
          mouseleave: function(e) {
            if (Ext.isIE9m) {
              e.enableIEAsync()
            }
            timer = Ext.defer(handler, delay, scope || me, [e])
          },
          mouseenter: function() {
            clearTimeout(timer)
          }
        };
      me.on(listeners);
      return listeners
    },
    puff: function(obj) {
      var me = this,
        dom = me.dom,
        beforeAnim, box = me.getBox(),
        originalStyles = me.getStyle(["width", "height", "left",
          "right", "top", "bottom", "position", "z-index",
          "font-size", "opacity"
        ], true);
      obj = Ext.applyIf(obj || {}, {
        easing: "ease-out",
        duration: 500,
        useDisplay: false
      });
      beforeAnim = function() {
        var el = Ext.fly(dom, "_anim");
        el.clearOpacity();
        el.show();
        this.to = {
          width: box.width * 2,
          height: box.height * 2,
          x: box.x - (box.width / 2),
          y: box.y - (box.height / 2),
          opacity: 0,
          fontSize: "200%"
        };
        this.on("afteranimate", function() {
          var el = Ext.fly(dom, "_anim");
          if (el) {
            if (obj.useDisplay) {
              el.setDisplayed(false)
            } else {
              el.hide()
            }
            el.setStyle(originalStyles);
            Ext.callback(obj.callback, obj.scope)
          }
        })
      };
      me.animate({
        duration: obj.duration,
        easing: obj.easing,
        listeners: {
          beforeanimate: {
            fn: beforeAnim
          }
        }
      });
      return me
    },
    selectable: function() {
      var me = this;
      me.dom.unselectable = "";
      me.removeCls(Element.unselectableCls);
      me.addCls(Element.selectableCls);
      return me
    },
    setCapture: function() {
      var dom = this.dom;
      if (Ext.isIE9m && dom.setCapture) {
        dom.setCapture()
      }
    },
    setHeight: function(height, animate) {
      var me = this;
      if (!animate || !me.anim) {
        arguments.callee.$previous.apply(this, arguments)
      } else {
        if (!Ext.isObject(animate)) {
          animate = {}
        }
        me.animate(Ext.applyIf({
          to: {
            height: height
          }
        }, animate))
      }
      return me
    },
    setHorizontal: function() {
      var me = this,
        cls = me.verticalCls;
      delete me.vertical;
      if (cls) {
        delete me.verticalCls;
        me.removeCls(cls)
      }
      delete me.setWidth;
      delete me.setHeight;
      if (!Ext.isIE8) {
        delete me.getWidth;
        delete me.getHeight
      }
      delete me.styleHooks
    },
    updateText: function(text) {
      var me = this,
        dom, textNode;
      if (dom) {
        textNode = dom.firstChild;
        if (!textNode || (textNode.nodeType !== 3 || textNode.nextSibling)) {
          textNode = DOC.createTextNode();
          me.empty();
          dom.appendChild(textNode)
        }
        if (text) {
          textNode.data = text
        }
      }
    },
    setHtml: function(html, loadScripts, callback) {
      var me = this,
        id, dom, interval;
      if (!me.dom) {
        return me
      }
      html = html || "";
      dom = me.dom;
      if (loadScripts !== true) {
        dom.innerHTML = html;
        Ext.callback(callback, me);
        return me
      }
      id = Ext.id();
      html += '<span id="' + id + '" role="presentation"></span>';
      interval = Ext.interval(function() {
        var hd, match, attrs, srcMatch, typeMatch, el, s;
        if (!(el = DOC.getElementById(id))) {
          return false
        }
        clearInterval(interval);
        Ext.removeNode(el);
        hd = Ext.getHead().dom;
        while ((match = scriptTagRe.exec(html))) {
          attrs = match[1];
          srcMatch = attrs ? attrs.match(srcRe) : false;
          if (srcMatch && srcMatch[2]) {
            s = DOC.createElement("script");
            s.src = srcMatch[2];
            typeMatch = attrs.match(typeRe);
            if (typeMatch && typeMatch[2]) {
              s.type = typeMatch[2]
            }
            hd.appendChild(s)
          } else {
            if (match[2] && match[2].length > 0) {
              (WIN.execScript || WIN.eval)(match[2])
            }
          }
        }
        Ext.callback(callback, me)
      }, 20);
      dom.innerHTML = html.replace(replaceScriptTagRe, "");
      return me
    },
    setOpacity: function(opacity, animate) {
      var me = this;
      if (!me.dom) {
        return me
      }
      if (!animate || !me.anim) {
        me.setStyle("opacity", opacity)
      } else {
        if (typeof animate != "object") {
          animate = {
            duration: 350,
            easing: "ease-in"
          }
        }
        me.animate(Ext.applyIf({
          to: {
            opacity: opacity
          }
        }, animate))
      }
      return me
    },
    setPositioning: function(pc) {
      return this.setStyle(pc)
    },
    setVertical: function(angle, cls) {
      var me = this,
        proto = Element.prototype;
      me.vertical = true;
      if (cls) {
        me.addCls(me.verticalCls = cls)
      }
      me.setWidth = proto.setHeight;
      me.setHeight = proto.setWidth;
      if (!Ext.isIE8) {
        me.getWidth = proto.getHeight;
        me.getHeight = proto.getWidth
      }
      me.styleHooks = (angle === 270) ? proto.verticalStyleHooks270 :
        proto.verticalStyleHooks90
    },
    setSize: function(width, height, animate) {
      var me = this;
      if (Ext.isObject(width)) {
        animate = height;
        height = width.height;
        width = width.width
      }
      if (!animate || !me.anim) {
        me.dom.style.width = Element.addUnits(width);
        me.dom.style.height = Element.addUnits(height);
        if (me.shadow || me.shim) {
          me.syncUnderlays()
        }
      } else {
        if (animate === true) {
          animate = {}
        }
        me.animate(Ext.applyIf({
          to: {
            width: width,
            height: height
          }
        }, animate))
      }
      return me
    },
    setVisible: function(visible, animate) {
      var me = this,
        dom = me.dom,
        visMode = getVisMode(me);
      if (typeof animate === "string") {
        switch (animate) {
          case DISPLAY:
            visMode = Element.DISPLAY;
            break;
          case VISIBILITY:
            visMode = Element.VISIBILITY;
            break;
          case OFFSETS:
            visMode = Element.OFFSETS;
            break;
          case CLIP:
            visMode = Element.CLIP;
            break
        }
        me.setVisibilityMode(visMode);
        animate = false
      }
      if (!animate || !me.anim) {
        if (visMode === Element.DISPLAY) {
          return me.setDisplayed(visible)
        } else {
          if (visMode === Element.OFFSETS) {
            me[visible ? "removeCls" : "addCls"](OFFSETCLASS)
          } else {
            if (visMode === Element.CLIP) {
              me[visible ? "removeCls" : "addCls"](CLIPCLASS)
            } else {
              if (visMode === Element.VISIBILITY) {
                me.fixDisplay();
                dom.style.visibility = visible ? "" : HIDDEN
              }
            }
          }
        }
      } else {
        if (visible) {
          me.setOpacity(0.01);
          me.setVisible(true)
        }
        if (!Ext.isObject(animate)) {
          animate = {
            duration: 350,
            easing: "ease-in"
          }
        }
        me.animate(Ext.applyIf({
          callback: function() {
            if (!visible) {
              Ext.fly(dom).setVisible(false).setOpacity(1)
            }
          },
          to: {
            opacity: (visible) ? 1 : 0
          }
        }, animate))
      }
      me.getData()[ISVISIBLE] = visible;
      if (me.shadow || me.shim) {
        me.setUnderlaysVisible(visible)
      }
      return me
    },
    setWidth: function(width, animate) {
      var me = this;
      if (!animate || !me.anim) {
        arguments.callee.$previous.apply(this, arguments)
      } else {
        if (!Ext.isObject(animate)) {
          animate = {}
        }
        me.animate(Ext.applyIf({
          to: {
            width: width
          }
        }, animate))
      }
      return me
    },
    setX: function(x, animate) {
      return this.setXY([x, this.getY()], animate)
    },
    setXY: function(xy, animate) {
      var me = this;
      if (!animate || !me.anim) {
        arguments.callee.$previous.call(this, xy)
      } else {
        if (!Ext.isObject(animate)) {
          animate = {}
        }
        me.animate(Ext.applyIf({
          to: {
            x: xy[0],
            y: xy[1]
          }
        }, animate))
      }
      return this
    },
    setY: function(y, animate) {
      return this.setXY([this.getX(), y], animate)
    },
    show: function(animate) {
      if (typeof animate === "string") {
        this.setVisible(true, animate);
        return this
      }
      this.setVisible(true, this.anim(animate));
      return this
    },
    slideIn: function(anchor, obj, slideOut) {
      var me = this,
        dom = me.dom,
        elStyle = dom.style,
        beforeAnim, wrapAnim, restoreScroll, wrapDomParentNode;
      anchor = anchor || "t";
      obj = obj || {};
      beforeAnim = function() {
        var animScope = this,
          listeners = obj.listeners,
          el = Ext.fly(dom, "_anim"),
          box, originalStyles, anim, wrap;
        if (!slideOut) {
          el.fixDisplay()
        }
        box = el.getBox();
        if ((anchor == "t" || anchor == "b") && box.height === 0) {
          box.height = dom.scrollHeight
        } else {
          if ((anchor == "l" || anchor == "r") && box.width === 0) {
            box.width = dom.scrollWidth
          }
        }
        originalStyles = el.getStyle(["width", "height", "left",
          "right", "top", "bottom", "position", "z-index"
        ], true);
        el.setSize(box.width, box.height);
        if (obj.preserveScroll) {
          restoreScroll = el.cacheScrollValues()
        }
        wrap = el.wrap({
          role: "presentation",
          id: Ext.id() + "-anim-wrap-for-" + el.dom.id,
          style: {
            visibility: slideOut ? "visible" : "hidden"
          }
        });
        wrapDomParentNode = wrap.dom.parentNode;
        wrap.setPositioning(el.getPositioning());
        if (wrap.isStyle("position", "static")) {
          wrap.position("relative")
        }
        el.clearPositioning("auto");
        wrap.clip();
        if (restoreScroll) {
          restoreScroll()
        }
        el.setStyle({
          visibility: "",
          position: "absolute"
        });
        if (slideOut) {
          wrap.setSize(box.width, box.height)
        }
        switch (anchor) {
          case "t":
            anim = {
              from: {
                width: box.width + "px",
                height: "0px"
              },
              to: {
                width: box.width + "px",
                height: box.height + "px"
              }
            };
            elStyle.bottom = "0px";
            break;
          case "l":
            anim = {
              from: {
                width: "0px",
                height: box.height + "px"
              },
              to: {
                width: box.width + "px",
                height: box.height + "px"
              }
            };
            me.anchorAnimX(anchor);
            break;
          case "r":
            anim = {
              from: {
                x: box.x + box.width,
                width: "0px",
                height: box.height + "px"
              },
              to: {
                x: box.x,
                width: box.width + "px",
                height: box.height + "px"
              }
            };
            me.anchorAnimX(anchor);
            break;
          case "b":
            anim = {
              from: {
                y: box.y + box.height,
                width: box.width + "px",
                height: "0px"
              },
              to: {
                y: box.y,
                width: box.width + "px",
                height: box.height + "px"
              }
            };
            break;
          case "tl":
            anim = {
              from: {
                x: box.x,
                y: box.y,
                width: "0px",
                height: "0px"
              },
              to: {
                width: box.width + "px",
                height: box.height + "px"
              }
            };
            elStyle.bottom = "0px";
            me.anchorAnimX("l");
            break;
          case "bl":
            anim = {
              from: {
                y: box.y + box.height,
                width: "0px",
                height: "0px"
              },
              to: {
                y: box.y,
                width: box.width + "px",
                height: box.height + "px"
              }
            };
            me.anchorAnimX("l");
            break;
          case "br":
            anim = {
              from: {
                x: box.x + box.width,
                y: box.y + box.height,
                width: "0px",
                height: "0px"
              },
              to: {
                x: box.x,
                y: box.y,
                width: box.width + "px",
                height: box.height + "px"
              }
            };
            me.anchorAnimX("r");
            break;
          case "tr":
            anim = {
              from: {
                x: box.x + box.width,
                width: "0px",
                height: "0px"
              },
              to: {
                x: box.x,
                width: box.width + "px",
                height: box.height + "px"
              }
            };
            elStyle.bottom = "0px";
            me.anchorAnimX("r");
            break
        }
        wrap.show();
        wrapAnim = Ext.apply({}, obj);
        delete wrapAnim.listeners;
        wrapAnim = new Ext.fx.Anim(Ext.applyIf(wrapAnim, {
          target: wrap,
          duration: 500,
          easing: "ease-out",
          from: slideOut ? anim.to : anim.from,
          to: slideOut ? anim.from : anim.to
        }));
        wrapAnim.on("afteranimate", function() {
          var el = Ext.fly(dom, "_anim");
          el.setStyle(originalStyles);
          if (slideOut) {
            if (obj.useDisplay) {
              el.setDisplayed(false)
            } else {
              el.hide()
            }
          }
          if (wrap.dom) {
            if (wrap.dom.parentNode) {
              wrap.dom.parentNode.insertBefore(el.dom, wrap.dom)
            } else {
              wrapDomParentNode.appendChild(el.dom)
            }
            wrap.destroy()
          }
          if (restoreScroll) {
            restoreScroll()
          }
          animScope.end()
        });
        if (listeners) {
          wrapAnim.on(listeners)
        }
      };
      me.animate({
        duration: obj.duration ? Math.max(obj.duration, 500) * 2 : 1000,
        listeners: {
          beforeanimate: beforeAnim
        }
      });
      return me
    },
    slideOut: function(anchor, o) {
      return this.slideIn(anchor, o, true)
    },
    swallowEvent: function(eventName, preventDefault) {
      var me = this,
        e, eLen, fn = function(e) {
          e.stopPropagation();
          if (preventDefault) {
            e.preventDefault()
          }
        };
      if (Ext.isArray(eventName)) {
        eLen = eventName.length;
        for (e = 0; e < eLen; e++) {
          me.on(eventName[e], fn)
        }
        return me
      }
      me.on(eventName, fn);
      return me
    },
    switchOff: function(obj) {
      var me = this,
        dom = me.dom,
        beforeAnim;
      obj = Ext.applyIf(obj || {}, {
        easing: "ease-in",
        duration: 500,
        remove: false,
        useDisplay: false
      });
      beforeAnim = function() {
        var el = Ext.fly(dom, "_anim"),
          animScope = this,
          size = el.getSize(),
          xy = el.getXY(),
          keyframe, position;
        el.clearOpacity();
        el.clip();
        position = el.getPositioning();
        keyframe = new Ext.fx.Animator({
          target: dom,
          duration: obj.duration,
          easing: obj.easing,
          keyframes: {
            33: {
              opacity: 0.3
            },
            66: {
              height: 1,
              y: xy[1] + size.height / 2
            },
            100: {
              width: 1,
              x: xy[0] + size.width / 2
            }
          }
        });
        keyframe.on("afteranimate", function() {
          var el = Ext.fly(dom, "_anim");
          if (obj.useDisplay) {
            el.setDisplayed(false)
          } else {
            el.hide()
          }
          el.clearOpacity();
          el.setPositioning(position);
          el.setSize(size);
          animScope.end()
        })
      };
      me.animate({
        duration: (Math.max(obj.duration, 500) * 2),
        listeners: {
          beforeanimate: {
            fn: beforeAnim
          }
        },
        callback: obj.callback,
        scope: obj.scope
      });
      return me
    },
    syncContent: function(source) {
      source = Ext.getDom(source);
      var sourceNodes = source.childNodes,
        sourceLen = sourceNodes.length,
        dest = this.dom,
        destNodes = dest.childNodes,
        destLen = destNodes.length,
        i, destNode, sourceNode, nodeType, newAttrs, attLen, attName,
        elData = dest._extData;
      if (Ext.isIE9m && dest.mergeAttributes) {
        dest.mergeAttributes(source, true);
        dest.src = source.src
      } else {
        newAttrs = source.attributes;
        attLen = newAttrs.length;
        for (i = 0; i < attLen; i++) {
          attName = newAttrs[i].name;
          if (attName !== "id") {
            dest.setAttribute(attName, newAttrs[i].value)
          }
        }
      }
      if (elData) {
        elData.isSynchronized = false
      }
      if (sourceLen !== destLen) {
        dest.innerHTML = source.innerHTML;
        return
      }
      for (i = 0; i < sourceLen; i++) {
        sourceNode = sourceNodes[i];
        destNode = destNodes[i];
        nodeType = sourceNode.nodeType;
        if (nodeType !== destNode.nodeType || (nodeType === 1 &&
            sourceNode.tagName !== destNode.tagName)) {
          dest.innerHTML = source.innerHTML;
          return
        }
        if (nodeType === 3) {
          destNode.data = sourceNode.data
        } else {
          if (sourceNode.id && destNode.id !== sourceNode.id) {
            destNode.id = sourceNode.id
          }
          destNode.style.cssText = sourceNode.style.cssText;
          destNode.className = sourceNode.className;
          Ext.fly(destNode, "_syncContent").syncContent(sourceNode)
        }
      }
    },
    toggle: function(animate) {
      var me = this;
      me.setVisible(!me.isVisible(), me.anim(animate));
      return me
    },
    unmask: function() {
      var me = this,
        data = me.getData(),
        maskEl = data.maskEl,
        style;
      if (maskEl) {
        style = maskEl.dom.style;
        if (style.clearExpression) {
          style.clearExpression("width");
          style.clearExpression("height")
        }
        if (maskEl) {
          maskEl.destroy();
          delete data.maskEl
        }
        me.removeCls([XMASKED, XMASKEDRELATIVE])
      }
      me.restoreTabbableState(me.dom === DOC.body)
    },
    unclip: function() {
      var me = this,
        data = me.getData(),
        clip;
      if (data[ISCLIPPED]) {
        data[ISCLIPPED] = false;
        clip = data[ORIGINALCLIP];
        if (clip.o) {
          me.setStyle(OVERFLOW, clip.o)
        }
        if (clip.x) {
          me.setStyle(OVERFLOWX, clip.x)
        }
        if (clip.y) {
          me.setStyle(OVERFLOWY, clip.y)
        }
      }
      return me
    },
    translate: function(x, y, z) {
      if (Ext.supports.CssTransforms && !Ext.isIE9m) {
        arguments.callee.$previous.apply(this, arguments)
      } else {
        if (x != null) {
          this.dom.style.left = x + "px"
        }
        if (y != null) {
          this.dom.style.top = y + "px"
        }
      }
    },
    unselectable: function() {
      var me = this;
      if (Ext.isOpera) {
        me.dom.unselectable = "on"
      }
      me.removeCls(Element.selectableCls);
      me.addCls(Element.unselectableCls);
      return me
    },
    privates: {
      findTabbableElements: function(options) {
        var skipSelf, skipChildren, excludeRoot, includeSaved,
          includeHidden, dom = this.dom,
          cAttr = Ext.Element.tabbableSavedCounterAttribute,
          selection = [],
          idx = 0,
          nodes, node, fly, i, len, tabIndex;
        if (!dom) {
          return selection
        }
        if (options) {
          skipSelf = options.skipSelf;
          skipChildren = options.skipChildren;
          excludeRoot = options.excludeRoot;
          includeSaved = options.includeSaved;
          includeHidden = options.includeHidden
        }
        excludeRoot = excludeRoot && Ext.getDom(excludeRoot);
        if (excludeRoot && excludeRoot.contains(dom)) {
          return selection
        }
        if (!skipSelf && ((includeSaved && dom.hasAttribute(cAttr)) ||
            this.isTabbable(includeHidden))) {
          selection[idx++] = dom
        }
        if (skipChildren) {
          return selection
        }
        nodes = dom.querySelectorAll(Ext.Element.tabbableSelector);
        len = nodes.length;
        if (!len) {
          return selection
        }
        fly = new Ext.dom.Fly();
        for (i = 0; i < len; i++) {
          node = nodes[i];
          tabIndex = +node.getAttribute("tabIndex");
          if (((includeSaved && node.hasAttribute(cAttr)) || (!(
              tabIndex < 0) && fly.attach(node).isTabbable(
              includeHidden))) && !(excludeRoot && (excludeRoot ===
              node || excludeRoot.contains(node)))) {
            selection[idx++] = node
          }
        }
        return selection
      },
      saveTabbableState: function(options) {
        var counterAttr = Ext.Element.tabbableSavedCounterAttribute,
          savedAttr = Ext.Element.tabbableSavedValueAttribute,
          counter, nodes, node, i, len;
        if (!options || options.includeSaved == null) {
          options = Ext.Object.chain(options || null);
          options.includeSaved = true
        }
        nodes = this.findTabbableElements(options);
        for (i = 0, len = nodes.length; i < len; i++) {
          node = nodes[i];
          counter = +node.getAttribute(counterAttr);
          if (counter > 0) {
            node.setAttribute(counterAttr, ++counter)
          } else {
            if (node.hasAttribute("tabIndex")) {
              node.setAttribute(savedAttr, node.getAttribute("tabIndex"))
            } else {
              node.setAttribute(savedAttr, "none")
            }
            node.setAttribute("tabIndex", "-1");
            node.setAttribute(counterAttr, "1")
          }
        }
        return nodes
      },
      restoreTabbableState: function(skipSelf, skipChildren) {
        var dom = this.dom,
          counterAttr = Ext.Element.tabbableSavedCounterAttribute,
          savedAttr = Ext.Element.tabbableSavedValueAttribute,
          nodes = [],
          idx, counter, nodes, node, i, len;
        if (!dom) {
          return this
        }
        if (!skipChildren) {
          nodes = Ext.Array.from(dom.querySelectorAll("[" + counterAttr +
            "]"))
        }
        if (!skipSelf) {
          nodes.unshift(dom)
        }
        for (i = 0, len = nodes.length; i < len; i++) {
          node = nodes[i];
          if (!node.hasAttribute(counterAttr) || !node.hasAttribute(
              savedAttr)) {
            continue
          }
          counter = +node.getAttribute(counterAttr);
          if (counter > 1) {
            node.setAttribute(counterAttr, --counter);
            continue
          }
          idx = node.getAttribute(savedAttr);
          if (idx === "none") {
            node.removeAttribute("tabIndex")
          } else {
            node.setAttribute("tabIndex", idx)
          }
          node.removeAttribute(savedAttr);
          node.removeAttribute(counterAttr)
        }
        return nodes
      }
    },
    deprecated: {
      "4.0": {
        methods: {
          pause: function(ms) {
            var me = this;
            Ext.fx.Manager.setFxDefaults(me.id, {
              delay: ms
            });
            return me
          },
          scale: function(w, h, o) {
            this.animate(Ext.apply({}, o, {
              width: w,
              height: h
            }));
            return this
          },
          shift: function(config) {
            this.animate(config);
            return this
          }
        }
      },
      "4.2": {
        methods: {
          moveTo: function(x, y, animate) {
            return this.setXY([x, y], animate)
          },
          setBounds: function(x, y, width, height, animate) {
            return this.setBox({
              x: x,
              y: y,
              width: width,
              height: height
            }, animate)
          },
          setLeftTop: function(left, top) {
            var me = this,
              style = me.dom.style;
            style.left = Element.addUnits(left);
            style.top = Element.addUnits(top);
            if (me.shadow || me.shim) {
              me.syncUnderlays()
            }
            return me
          },
          setLocation: function(x, y, animate) {
            return this.setXY([x, y], animate)
          }
        }
      },
      "5.0": {
        methods: {
          getAttributeNS: function(namespace, name) {
            return this.getAttribute(name, namespace)
          },
          getCenterXY: function() {
            return this.getAlignToXY(DOC, "c-c")
          },
          getComputedHeight: function() {
            return Math.max(this.dom.offsetHeight, this.dom.clientHeight) ||
              parseFloat(this.getStyle(HEIGHT)) || 0
          },
          getComputedWidth: function() {
            return Math.max(this.dom.offsetWidth, this.dom.clientWidth) ||
              parseFloat(this.getStyle(WIDTH)) || 0
          },
          getStyleSize: function() {
            var me = this,
              d = this.dom,
              isDoc = (d === DOC || d === DOC.body),
              s, w, h;
            if (isDoc) {
              return {
                width: Element.getViewportWidth(),
                height: Element.getViewportHeight()
              }
            }
            s = me.getStyle(["height", "width"], true);
            if (s.width && s.width !== "auto") {
              w = parseFloat(s.width)
            }
            if (s.height && s.height !== "auto") {
              h = parseFloat(s.height)
            }
            return {
              width: w || me.getWidth(true),
              height: h || me.getHeight(true)
            }
          },
          isBorderBox: function() {
            return true
          },
          isDisplayed: function() {
            return !this.isStyle("display", "none")
          },
          focusable: "isFocusable"
        }
      }
    }
  }
})(), function() {
  var p = Ext.dom.Element,
    o = p.prototype,
    v = !Ext.isIE8,
    b = document,
    l = b.defaultView,
    u = /alpha\(opacity=(.*)\)/i,
    g = /^\s+|\s+$/g,
    w = o.styleHooks,
    s = Ext.supports,
    e, n, d, r, f, x, c;
  o._init(p);
  delete o._init;
  Ext.plainTableCls = "x-table-plain";
  Ext.plainListCls = "x-list-plain";
  if (Ext.CompositeElementLite) {
    Ext.CompositeElementLite.importElementMethods()
  }
  if (!s.Opacity && Ext.isIE) {
    Ext.apply(w.opacity, {
      get: function(A) {
        var z = A.style.filter,
          y, k;
        if (z.match) {
          y = z.match(u);
          if (y) {
            k = parseFloat(y[1]);
            if (!isNaN(k)) {
              return k ? k / 100 : 0
            }
          }
        }
        return 1
      },
      set: function(A, y) {
        var k = A.style,
          z = k.filter.replace(u, "").replace(g, "");
        k.zoom = 1;
        if (typeof(y) === "number" && y >= 0 && y < 1) {
          y *= 100;
          k.filter = z + (z.length ? " " : "") + "alpha(opacity=" + y +
            ")"
        } else {
          k.filter = z
        }
      }
    })
  }
  if (!s.matchesSelector) {
    var i = /^([a-z]+|\*)?(?:\.([a-z][a-z\-_0-9]*))?$/i,
      j = /\-/g,
      a, t = function(k, y) {
        var z = new RegExp("(?:^|\\s+)" + y.replace(j, "\\-") +
          "(?:\\s+|$)");
        if (k && k !== "*") {
          k = k.toUpperCase();
          return function(A) {
            return A.tagName === k && z.test(A.className)
          }
        }
        return function(A) {
          return z.test(A.className)
        }
      },
      q = function(k) {
        k = k.toUpperCase();
        return function(y) {
          return y.tagName === k
        }
      },
      m = {};
    o.matcherCache = m;
    o.is = function(k) {
      if (!k) {
        return true
      }
      var y = this.dom,
        E, A, D, C, B, z, F;
      if (y.nodeType !== 1) {
        return false
      }
      if (!(D = Ext.isFunction(k) ? k : m[k])) {
        if (!(A = k.match(i))) {
          C = y.parentNode;
          if (!C) {
            B = true;
            C = a || (a = b.createDocumentFragment());
            a.appendChild(y)
          }
          z = Ext.Array.indexOf(Ext.fly(C, "_is").query(k), y) !== -1;
          if (B) {
            a.removeChild(y)
          }
          return z
        }
        F = A[1];
        E = A[2];
        m[k] = D = E ? t(F, E) : q(F)
      }
      return D(y)
    }
  }
  if (!l || !l.getComputedStyle) {
    o.getStyle = function(L, G) {
      var H = this,
        C = H.dom,
        N = typeof L !== "string",
        z = L,
        I = z,
        F = 1,
        A = G,
        y = H.styleHooks,
        M, E, K, J, B, k, D;
      if (N) {
        K = {};
        z = I[0];
        D = 0;
        if (!(F = I.length)) {
          return K
        }
      }
      if (!C || C.documentElement) {
        return K || ""
      }
      E = C.style;
      if (G) {
        k = E
      } else {
        k = C.currentStyle;
        if (!k) {
          A = true;
          k = E
        }
      }
      do {
        J = y[z];
        if (!J) {
          y[z] = J = {
            name: p.normalize(z)
          }
        }
        if (J.get) {
          B = J.get(C, H, A, k)
        } else {
          M = J.name;
          B = k[M]
        }
        if (!N) {
          return B
        }
        K[z] = B;
        z = I[++D]
      } while (D < F);
      return K
    }
  }
  if (Ext.isIE8) {
    c = function(A, y, z, k) {
      if (k[this.styleName] === "none") {
        return "0px"
      }
      return k[this.name]
    };
    d = ["Top", "Right", "Bottom", "Left"];
    r = d.length;
    while (r--) {
      f = d[r];
      x = "border" + f + "Width";
      w["border-" + f.toLowerCase() + "-width"] = w[x] = {
        name: x,
        styleName: "border" + f + "Style",
        get: c
      }
    }
    var h = "x-sync-repaint";
    o.syncRepaint = function() {
      this.addCls(h);
      this.getWidth();
      this.removeCls(h)
    }
  }
  Ext.apply(Ext, {
    enableGarbageCollector: true,
    isBorderBox: true,
    useShims: false,
    getDetachedBody: function() {
      var k = Ext.detachedBodyEl;
      if (!k) {
        k = b.createElement("div");
        Ext.detachedBodyEl = k = new Ext.dom.Fly(k);
        k.isDetachedBody = true
      }
      return k
    },
    getElementById: function(z) {
      var y = b.getElementById(z),
        k;
      if (!y && (k = Ext.detachedBodyEl)) {
        y = k.dom.querySelector(Ext.makeIdSelector(z))
      }
      return y
    },
    addBehaviors: function(B) {
      if (!Ext.isReady) {
        Ext.onInternalReady(function() {
          Ext.addBehaviors(B)
        })
      } else {
        var y = {},
          A, k, z;
        for (k in B) {
          if ((A = k.split("@"))[1]) {
            z = A[0];
            if (!y[z]) {
              y[z] = Ext.fly(document).select(z, true)
            }
            y[z].on(A[1], B[k])
          }
        }
        y = null
      }
    }
  });
  if (Ext.isIE9m) {
    Ext.getElementById = function(z) {
      var y = b.getElementById(z),
        k;
      if (!y && (k = Ext.detachedBodyEl)) {
        y = k.dom.all[z]
      }
      return y
    };
    o.getById = function(C, k) {
      var B = this.dom,
        y = null,
        A, z;
      if (B) {
        z = (v && b.getElementById(C)) || B.all[C];
        if (z) {
          if (k) {
            y = z
          } else {
            A = Ext.cache[C];
            if (A) {
              if (A.skipGarbageCollection || !Ext.isGarbage(A.dom)) {
                y = A
              } else {
                A.destroy()
              }
            }
            y = y || new Ext.Element(z)
          }
        }
      }
      return y
    }
  } else {
    if (!b.querySelector) {
      Ext.getDetachedBody = Ext.getBody;
      Ext.getElementById = function(k) {
        return b.getElementById(k)
      };
      o.getById = function(z, k) {
        var y = b.getElementById(z);
        return k ? y : (y ? Ext.get(y) : null)
      }
    }
  }
  if (Ext.isIE && !(Ext.isIE9p && b.documentMode >= 9)) {
    o.getAttribute = function(k, z) {
      var A = this.dom,
        y;
      if (z) {
        y = typeof A[z + ":" + k];
        if (y !== "undefined" && y !== "unknown") {
          return A[z + ":" + k] || null
        }
        return null
      }
      if (k === "for") {
        k = "htmlFor"
      }
      return A[k] || null
    }
  }
  Ext.onInternalReady(function() {
    var A =
      /^(?:transparent|(?:rgba[(](?:\s*\d+\s*[,]){3}\s*0\s*[)]))$/i,
      y = [],
      F = o.setWidth,
      G = o.setHeight,
      K = o.setSize,
      L = /^\d+(?:\.\d*)?px$/i,
      E, C, k, J;
    if (s.FixedTableWidthBug) {
      w.width = {
        name: "width",
        set: function(R, Q, O) {
          var N = R.style,
            M = O._needsTableWidthFix,
            P = N.display;
          if (M) {
            N.display = "none"
          }
          N.width = Q;
          if (M) {
            R.scrollWidth;
            N.display = P
          }
        }
      };
      o.setWidth = function(P, N) {
        var R = this,
          S = R.dom,
          O = S.style,
          M = R._needsTableWidthFix,
          Q = O.display;
        if (M && !N) {
          O.display = "none"
        }
        F.call(R, P, N);
        if (M && !N) {
          S.scrollWidth;
          O.display = Q
        }
        return R
      };
      o.setSize = function(Q, N, O) {
        var S = this,
          T = S.dom,
          P = T.style,
          M = S._needsTableWidthFix,
          R = P.display;
        if (M && !O) {
          P.display = "none"
        }
        K.call(S, Q, N, O);
        if (M && !O) {
          T.scrollWidth;
          P.display = R
        }
        return S
      }
    }
    if (Ext.isIE8) {
      w.height = {
        name: "height",
        set: function(R, Q, O) {
          var N = O.component,
            P, M;
          if (N && N._syncFrameHeight && O === N.el) {
            M = N.frameBody.dom.style;
            if (L.test(Q)) {
              P = N.getFrameInfo();
              if (P) {
                M.height = (parseInt(Q, 10) - P.height) + "px"
              }
            } else {
              if (!Q || Q === "auto") {
                M.height = ""
              }
            }
          }
          R.style.height = Q
        }
      };
      o.setHeight = function(M, O) {
        var P = this.component,
          Q, N;
        if (P && P._syncFrameHeight && this === P.el) {
          N = P.frameBody.dom.style;
          if (!M || M === "auto") {
            N.height = ""
          } else {
            Q = P.getFrameInfo();
            if (Q) {
              N.height = (M - Q.height) + "px"
            }
          }
        }
        return G.call(this, M, O)
      };
      o.setSize = function(Q, M, O) {
        var P = this.component,
          R, N;
        if (P && P._syncFrameHeight && this === P.el) {
          N = P.frameBody.dom.style;
          if (!M || M === "auto") {
            N.height = ""
          } else {
            R = P.getFrameInfo();
            if (R) {
              N.height = (M - R.height) + "px"
            }
          }
        }
        return K.call(this, Q, M, O)
      }
    }
    Ext.getDoc().on("selectstart", function(Q, R) {
      var P = p.selectableCls,
        O = p.unselectableCls,
        M = R && R.tagName;
      M = M && M.toLowerCase();
      if (M === "input" || M === "textarea") {
        return
      }
      while (R && R.nodeType === 1 && R !== b.documentElement) {
        var N = Ext.fly(R);
        if (N.hasCls(P)) {
          return
        }
        if (N.hasCls(O)) {
          Q.stopEvent();
          return
        }
        R = R.parentNode
      }
    });

    function D(Q, N, P, M) {
      var O = M[this.name] || "";
      return A.test(O) ? "transparent" : O
    }

    function I(N, O, M) {
      return function() {
        N.selectionStart = O;
        N.selectionEnd = M
      }
    }

    function H(Q) {
      var O = s.DisplayChangeInputSelectionBug,
        P = s.DisplayChangeTextAreaSelectionBug,
        R, M, S, N;
      if (O || P) {
        R = p.getActiveElement();
        M = R && R.tagName;
        if ((P && M === "TEXTAREA") || (O && M === "INPUT" && R.type ===
            "text")) {
          if (Ext.fly(Q).isAncestor(R)) {
            S = R.selectionStart;
            N = R.selectionEnd;
            if (Ext.isNumber(S) && Ext.isNumber(N)) {
              return I(R, S, N)
            }
          }
        }
      }
      return Ext.emptyFn
    }

    function B(S, P, R, O) {
      var M = O.marginRight,
        N, Q;
      if (M !== "0px") {
        N = S.style;
        Q = N.display;
        N.display = "inline-block";
        M = (R ? O : S.ownerDocument.defaultView.getComputedStyle(S,
          null)).marginRight;
        N.display = Q
      }
      return M
    }

    function z(T, Q, S, P) {
      var M = P.marginRight,
        O, N, R;
      if (M !== "0px") {
        O = T.style;
        N = H(T);
        R = O.display;
        O.display = "inline-block";
        M = (S ? P : T.ownerDocument.defaultView.getComputedStyle(T, ""))
          .marginRight;
        O.display = R;
        N()
      }
      return M
    }
    if (!s.RightMargin) {
      w.marginRight = w["margin-right"] = {
        name: "marginRight",
        get: (s.DisplayChangeInputSelectionBug || s.DisplayChangeTextAreaSelectionBug) ?
          z : B
      }
    }
    if (!s.TransparentColor) {
      E = ["background-color", "border-color", "color", "outline-color"];
      for (C = E.length; C--;) {
        k = E[C];
        J = p.normalize(k);
        w[k] = w[J] = {
          name: J,
          get: D
        }
      }
    }
    o.verticalStyleHooks90 = e = Ext.Object.chain(w);
    o.verticalStyleHooks270 = n = Ext.Object.chain(w);
    e.width = w.height || {
      name: "height"
    };
    e.height = w.width || {
      name: "width"
    };
    e["margin-top"] = {
      name: "marginLeft"
    };
    e["margin-right"] = {
      name: "marginTop"
    };
    e["margin-bottom"] = {
      name: "marginRight"
    };
    e["margin-left"] = {
      name: "marginBottom"
    };
    e["padding-top"] = {
      name: "paddingLeft"
    };
    e["padding-right"] = {
      name: "paddingTop"
    };
    e["padding-bottom"] = {
      name: "paddingRight"
    };
    e["padding-left"] = {
      name: "paddingBottom"
    };
    e["border-top"] = {
      name: "borderLeft"
    };
    e["border-right"] = {
      name: "borderTop"
    };
    e["border-bottom"] = {
      name: "borderRight"
    };
    e["border-left"] = {
      name: "borderBottom"
    };
    n.width = w.height || {
      name: "height"
    };
    n.height = w.width || {
      name: "width"
    };
    n["margin-top"] = {
      name: "marginRight"
    };
    n["margin-right"] = {
      name: "marginBottom"
    };
    n["margin-bottom"] = {
      name: "marginLeft"
    };
    n["margin-left"] = {
      name: "marginTop"
    };
    n["padding-top"] = {
      name: "paddingRight"
    };
    n["padding-right"] = {
      name: "paddingBottom"
    };
    n["padding-bottom"] = {
      name: "paddingLeft"
    };
    n["padding-left"] = {
      name: "paddingTop"
    };
    n["border-top"] = {
      name: "borderRight"
    };
    n["border-right"] = {
      name: "borderBottom"
    };
    n["border-bottom"] = {
      name: "borderLeft"
    };
    n["border-left"] = {
      name: "borderTop"
    };
    if (!Ext.scopeCss) {
      y.push("x-body")
    }
    if (s.Touch) {
      y.push("x-touch")
    }
    if (Ext.isIE && Ext.isIE9m) {
      y.push("x-ie", "x-ie9m");
      y.push("x-ie8p");
      if (Ext.isIE8) {
        y.push("x-ie8")
      } else {
        y.push("x-ie9", "x-ie9p")
      }
      if (Ext.isIE8m) {
        y.push("x-ie8m")
      }
    }
    if (Ext.isIE10) {
      y.push("x-ie10")
    }
    if (Ext.isIE10p) {
      y.push("x-ie10p")
    }
    if (Ext.isIE11) {
      y.push("x-ie11")
    }
    if (Ext.isGecko) {
      y.push("x-gecko")
    }
    if (Ext.isOpera) {
      y.push("x-opera")
    }
    if (Ext.isOpera12m) {
      y.push("x-opera12m")
    }
    if (Ext.isWebKit) {
      y.push("x-webkit")
    }
    if (Ext.isSafari) {
      y.push("x-safari")
    }
    if (Ext.isChrome) {
      y.push("x-chrome")
    }
    if (Ext.isMac) {
      y.push("x-mac")
    }
    if (Ext.isLinux) {
      y.push("x-linux")
    }
    if (!s.CSS3BorderRadius) {
      y.push("x-nbr")
    }
    if (!s.CSS3LinearGradient) {
      y.push("x-nlg")
    }
    if (s.Touch) {
      y.push("x-touch")
    }
    Ext.getBody().addCls(y)
  }, null, {
    priority: 1500
  })
});
(Ext.cmd.derive("Ext.GlobalEvents", Ext.mixin.Observable, {
  alternateClassName: "Ext.globalEvents",
  observableType: "global",
  singleton: true,
  resizeBuffer: 100,
  idleEventMask: {
    mousemove: 1,
    touchmove: 1,
    pointermove: 1,
    MSPointerMove: 1,
    unload: 1
  },
  constructor: function() {
    var a = this;
    a.callParent();
    Ext.onInternalReady(function() {
      a.attachListeners()
    })
  },
  attachListeners: function() {
    Ext.get(window).on("resize", this.fireResize, this, {
      buffer: this.resizeBuffer
    });
    Ext.getDoc().on("mousedown", this.fireMouseDown, this)
  },
  fireMouseDown: function(a) {
    this.fireEvent("mousedown", a)
  },
  fireResize: function() {
    var d = this,
      b = Ext.Element,
      a = b.getViewportWidth(),
      c = b.getViewportHeight();
    if (d.curHeight !== c || d.curWidth !== a) {
      d.curHeight = c;
      d.curWidth = a;
      d.fireEvent("resize", a, c)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext, "GlobalEvents", Ext, "globalEvents"], function(a) {
  Ext.on = function() {
    return a.addListener.apply(a, arguments)
  };
  Ext.un = function() {
    return a.removeListener.apply(a, arguments)
  }
}));
Ext.define("Ext.overrides.GlobalEvents", {
  override: "Ext.GlobalEvents",
  deprecated: {
    5: {
      methods: {
        addListener: function(d, g, h, i, c, b, e) {
          var a, f;
          if (d === "ready") {
            f = g
          } else {
            if (typeof d !== "string") {
              for (a in d) {
                if (a === "ready") {
                  f = d[a]
                }
              }
            }
          }
          if (f) {
            Ext.onReady(f)
          }
          this.callParent([d, g, h, i, c, b, e])
        }
      }
    }
  }
});
Ext.USE_NATIVE_JSON = false;
Ext.JSON = (new(function() {
  var me = this,
    hasNative = window.JSON && JSON.toString() === "[object JSON]",
    useHasOwn = !!{}.hasOwnProperty,
    pad = function(n) {
      return n < 10 ? "0" + n : n
    },
    doDecode = function(json) {
      return eval("(" + json + ")")
    },
    doEncode = function(o, newline) {
      if (o === null || o === undefined) {
        return "null"
      } else {
        if (Ext.isDate(o)) {
          return me.encodeDate(o)
        } else {
          if (Ext.isString(o)) {
            if (Ext.isMSDate(o)) {
              return me.encodeMSDate(o)
            } else {
              return me.encodeString(o)
            }
          } else {
            if (typeof o === "number") {
              return isFinite(o) ? String(o) : "null"
            } else {
              if (Ext.isBoolean(o)) {
                return String(o)
              } else {
                if (o.toJSON) {
                  return o.toJSON()
                } else {
                  if (Ext.isArray(o)) {
                    return encodeArray(o, newline)
                  } else {
                    if (Ext.isObject(o)) {
                      return encodeObject(o, newline)
                    } else {
                      if (typeof o === "function") {
                        return "null"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return "undefined"
    },
    m = {
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\",
      "\v": "\\u000b"
    },
    charToReplace = /[\\\"\x00-\x1f\x7f-\uffff]/g,
    encodeString = function(s) {
      return '"' + s.replace(charToReplace, function(a) {
        var c = m[a];
        return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(
          0).toString(16)).slice(-4)
      }) + '"'
    },
    encodeMSDate = function(o) {
      return '"' + o + '"'
    },
    encodeArrayPretty = function(o, newline) {
      var len = o.length,
        cnewline = newline + "   ",
        sep = "," + cnewline,
        a = ["[", cnewline],
        i;
      for (i = 0; i < len; i += 1) {
        a.push(me.encodeValue(o[i], cnewline), sep)
      }
      a[a.length - 1] = newline + "]";
      return a.join("")
    },
    encodeObjectPretty = function(o, newline) {
      var cnewline = newline + "   ",
        sep = "," + cnewline,
        a = ["{", cnewline],
        i, val;
      for (i in o) {
        val = o[i];
        if (!useHasOwn || o.hasOwnProperty(i)) {
          if (typeof val === "function" || val === undefined) {
            continue
          }
          a.push(me.encodeValue(i) + ": " + me.encodeValue(val, cnewline),
            sep)
        }
      }
      a[a.length - 1] = newline + "}";
      return a.join("")
    },
    encodeArray = function(o, newline) {
      if (newline) {
        return encodeArrayPretty(o, newline)
      }
      var a = ["[", ""],
        len = o.length,
        i;
      for (i = 0; i < len; i += 1) {
        a.push(me.encodeValue(o[i]), ",")
      }
      a[a.length - 1] = "]";
      return a.join("")
    },
    encodeObject = function(o, newline) {
      if (newline) {
        return encodeObjectPretty(o, newline)
      }
      var a = ["{", ""],
        i, val;
      for (i in o) {
        val = o[i];
        if (!useHasOwn || o.hasOwnProperty(i)) {
          if (typeof val === "function" || val === undefined) {
            continue
          }
          a.push(me.encodeValue(i), ":", me.encodeValue(val), ",")
        }
      }
      a[a.length - 1] = "}";
      return a.join("")
    };
  me.encodeString = encodeString;
  me.encodeValue = doEncode;
  me.encodeDate = function(o) {
    return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-" +
      pad(o.getDate()) + "T" + pad(o.getHours()) + ":" + pad(o.getMinutes()) +
      ":" + pad(o.getSeconds()) + '"'
  };
  me.encode = function(o) {
    if (hasNative && Ext.USE_NATIVE_JSON) {
      return JSON.stringify(o)
    }
    return me.encodeValue(o)
  };
  me.decode = function(json, safe) {
    try {
      if (hasNative && Ext.USE_NATIVE_JSON) {
        return JSON.parse(json)
      }
      return doDecode(json)
    } catch (e) {
      if (safe) {
        return null
      }
      Ext.raise({
        sourceClass: "Ext.JSON",
        sourceMethod: "decode",
        msg: "You're trying to decode an invalid JSON String: " +
          json
      })
    }
  };
  me.encodeMSDate = encodeMSDate;
  if (!Ext.util) {
    Ext.util = {}
  }
  Ext.util.JSON = me;
  Ext.encode = me.encode;
  Ext.decode = me.decode
})());
(Ext.cmd.derive("Ext.util.Format", Ext.Base, function() {
  var a;
  return {
    singleton: true,
    defaultDateFormat: "m/d/Y",
    thousandSeparator: ",",
    decimalSeparator: ".",
    currencyPrecision: 2,
    currencySign: "$",
    percentSign: "%",
    currencyAtEnd: false,
    stripTagsRe: /<\/?[^>]+>/gi,
    stripScriptsRe: /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
    nl2brRe: /\r?\n/g,
    hashRe: /#+$/,
    allHashes: /^#+$/,
    formatPattern: /[\d,\.#]+/,
    formatCleanRe: /[^\d\.#]/g,
    I18NFormatCleanRe: null,
    formatFns: {},
    constructor: function() {
      a = this
    },
    undef: function(b) {
      return b !== undefined ? b : ""
    },
    defaultValue: function(c, b) {
      return c !== undefined && c !== "" ? c : b
    },
    substr: "ab".substr(-1) != "b" ? function(c, e, b) {
      var d = String(c);
      return (e < 0) ? d.substr(Math.max(d.length + e, 0), b) : d.substr(
        e, b)
    } : function(c, d, b) {
      return String(c).substr(d, b)
    },
    lowercase: function(b) {
      return String(b).toLowerCase()
    },
    uppercase: function(b) {
      return String(b).toUpperCase()
    },
    usMoney: function(b) {
      return a.currency(b, "$", 2)
    },
    currency: function(d, f, c, b) {
      var h = "",
        g = ",0",
        e = 0;
      d = d - 0;
      if (d < 0) {
        d = -d;
        h = "-"
      }
      c = Ext.isDefined(c) ? c : a.currencyPrecision;
      g += (c > 0 ? "." : "");
      for (; e < c; e++) {
        g += "0"
      }
      d = a.number(d, g);
      if ((b || a.currencyAtEnd) === true) {
        return Ext.String.format("{0}{1}{2}", h, d, f || a.currencySign)
      } else {
        return Ext.String.format("{0}{1}{2}", h, f || a.currencySign, d)
      }
    },
    date: function(b, c) {
      if (!b) {
        return ""
      }
      if (!Ext.isDate(b)) {
        b = new Date(Date.parse(b))
      }
      return Ext.Date.dateFormat(b, c || Ext.Date.defaultFormat)
    },
    dateRenderer: function(b) {
      return function(c) {
        return a.date(c, b)
      }
    },
    hex: function(d, c) {
      var b = parseInt(d || 0, 10).toString(16);
      if (c) {
        if (c < 0) {
          c = -c;
          if (b.length > c) {
            b = b.substring(b.length - c)
          }
        }
        while (b.length < c) {
          b = "0" + b
        }
      }
      return b
    },
    or: function(c, b) {
      return c || b
    },
    pick: function(d, c, e) {
      if (Ext.isNumber(d)) {
        var b = arguments[d + 1];
        if (b) {
          return b
        }
      }
      return d ? e : c
    },
    stripTags: function(b) {
      return !b ? b : String(b).replace(a.stripTagsRe, "")
    },
    stripScripts: function(b) {
      return !b ? b : String(b).replace(a.stripScriptsRe, "")
    },
    fileSize: (function() {
      var b = 1024,
        c = 1048576,
        d = 1073741824;
      return function(f) {
        var e;
        if (f < b) {
          if (f === 1) {
            e = "1 byte"
          } else {
            e = f + " bytes"
          }
        } else {
          if (f < c) {
            e = (Math.round(((f * 10) / b)) / 10) + " KB"
          } else {
            if (f < d) {
              e = (Math.round(((f * 10) / c)) / 10) + " MB"
            } else {
              e = (Math.round(((f * 10) / d)) / 10) + " GB"
            }
          }
        }
        return e
      }
    })(),
    math: (function() {
      var b = {};
      return function(d, c) {
        if (!b[c]) {
          b[c] = Ext.functionFactory("v", "return v " + c + ";")
        }
        return b[c](d)
      }
    }()),
    round: function(d, c) {
      var b = Number(d);
      if (typeof c === "number") {
        c = Math.pow(10, c);
        b = Math.round(d * c) / c
      } else {
        if (c === undefined) {
          b = Math.round(b)
        }
      }
      return b
    },
    number: function(l, f) {
      if (!f) {
        return l
      }
      if (isNaN(l)) {
        return ""
      }
      var e = a.formatFns[f];
      if (!e) {
        var i = f,
          o = a.thousandSeparator,
          m = a.decimalSeparator,
          g = 0,
          d = "",
          c, j, k, n, b, h;
        if (f.substr(f.length - 2) === "/i") {
          if (!a.I18NFormatCleanRe || a.lastDecimalSeparator !== m) {
            a.I18NFormatCleanRe = new RegExp("[^\\d\\" + m + "#]", "g");
            a.lastDecimalSeparator = m
          }
          f = f.substr(0, f.length - 2);
          c = f.indexOf(o) !== -1;
          j = f.replace(a.I18NFormatCleanRe, "").split(m)
        } else {
          c = f.indexOf(",") !== -1;
          j = f.replace(a.formatCleanRe, "").split(".")
        }
        k = f.replace(a.formatPattern, "");
        if (j.length > 2) {} else {
          if (j.length === 2) {
            g = j[1].length;
            n = j[1].match(a.hashRe);
            if (n) {
              h = n[0].length;
              d =
                'trailingZeroes=new RegExp(Ext.String.escapeRegex(utilFormat.decimalSeparator) + "*0{0,' +
                h + '}$")'
            }
          }
        }
        b = [
          "var utilFormat=Ext.util.Format,extNumber=Ext.Number,neg,absVal,fnum,parts" +
          (c ? ",thousandSeparator,thousands=[],j,n,i" : "") + (k ?
            ',formatString="' + f + '",formatPattern=/[\\d,\\.#]+/' :
            "") +
          ',trailingZeroes;return function(v){if(typeof v!=="number"&&isNaN(v=extNumber.from(v,NaN)))return"";neg=v<0;',
          "absVal=Math.abs(v);", "fnum=Ext.Number.toFixed(absVal, " + g +
          ");", d, ";"
        ];
        if (c) {
          if (g) {
            b[b.length] = 'parts=fnum.split(".");';
            b[b.length] = "fnum=parts[0];"
          }
          b[b.length] = "if(absVal>=1000) {";
          b[b.length] =
            "thousandSeparator=utilFormat.thousandSeparator;thousands.length=0;j=fnum.length;n=fnum.length%3||3;for(i=0;i<j;i+=n){if(i!==0){n=3;}thousands[thousands.length]=fnum.substr(i,n);}fnum=thousands.join(thousandSeparator);}";
          if (g) {
            b[b.length] = "fnum += utilFormat.decimalSeparator+parts[1];"
          }
        } else {
          if (g) {
            b[b.length] =
              'if(utilFormat.decimalSeparator!=="."){parts=fnum.split(".");fnum=parts[0]+utilFormat.decimalSeparator+parts[1];}'
          }
        }
        b[b.length] = 'if(neg&&fnum!=="' + (g ? "0." + Ext.String.repeat(
          "0", g) : "0") + '") { fnum="-"+fnum; }';
        if (n) {
          b[b.length] = 'fnum=fnum.replace(trailingZeroes,"");'
        }
        b[b.length] = "return ";
        if (k) {
          b[b.length] = "formatString.replace(formatPattern, fnum);"
        } else {
          b[b.length] = "fnum;"
        }
        b[b.length] = "};";
        e = a.formatFns[i] = Ext.functionFactory("Ext", b.join(""))(Ext)
      }
      return e(l)
    },
    numberRenderer: function(b) {
      return function(c) {
        return a.number(c, b)
      }
    },
    percent: function(c, b) {
      return a.number(c * 100, b || "0") + a.percentSign
    },
    attributes: function(c) {
      if (typeof c === "object") {
        var b = [],
          d;
        for (d in c) {
          if (c.hasOwnProperty(d)) {
            b.push(d, '="', d === "style" ? Ext.DomHelper.generateStyles(
              c[d], null, true) : Ext.htmlEncode(c[d]), '" ')
          }
        }
        c = b.join("")
      }
      return c || ""
    },
    plural: function(b, c, d) {
      return b + " " + (b === 1 ? c : (d ? d : c + "s"))
    },
    nl2br: function(b) {
      return Ext.isEmpty(b) ? "" : b.replace(a.nl2brRe, "<br/>")
    },
    capitalize: Ext.String.capitalize,
    uncapitalize: Ext.String.uncapitalize,
    ellipsis: Ext.String.ellipsis,
    escape: Ext.String.escape,
    escapeRegex: Ext.String.escapeRegex,
    htmlDecode: Ext.String.htmlDecode,
    htmlEncode: Ext.String.htmlEncode,
    leftPad: Ext.String.leftPad,
    toggle: Ext.String.toggle,
    trim: Ext.String.trim,
    parseBox: function(c) {
      c = c || 0;
      if (typeof c === "number") {
        return {
          top: c,
          right: c,
          bottom: c,
          left: c
        }
      }
      var d = c.split(" "),
        b = d.length;
      if (b === 1) {
        d[1] = d[2] = d[3] = d[0]
      } else {
        if (b === 2) {
          d[2] = d[0];
          d[3] = d[1]
        } else {
          if (b === 3) {
            d[3] = d[1]
          }
        }
      }
      return {
        top: parseInt(d[0], 10) || 0,
        right: parseInt(d[1], 10) || 0,
        bottom: parseInt(d[2], 10) || 0,
        left: parseInt(d[3], 10) || 0
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "Format"], 0));
(Ext.cmd.derive("Ext.Template", Ext.Base, {
  inheritableStatics: {
    from: function(b, a) {
      b = Ext.getDom(b);
      return new this(b.value || b.innerHTML, a || "")
    }
  },
  useEval: Ext.isGecko,
  constructor: function(d) {
    var f = this,
      b = arguments,
      a = [],
      c, e = b.length,
      g;
    f.initialConfig = {};
    if (e === 1 && Ext.isArray(d)) {
      b = d;
      e = b.length
    }
    if (e > 1) {
      for (c = 0; c < e; c++) {
        g = b[c];
        if (typeof g === "object") {
          Ext.apply(f.initialConfig, g);
          Ext.apply(f, g)
        } else {
          a.push(g)
        }
      }
    } else {
      a.push(d)
    }
    f.html = a.join("")
  },
  isTemplate: true,
  disableFormats: false,
  tokenRe: /\{(?:(?:(\d+)|([a-z_][\w\-]*))(?::([a-z_\.]+)(?:\(([^\)]*?)?\))?)?)\}/gi,
  apply: function(a) {
    var b = this;
    if (b.compiled) {
      if (!b.fn) {
        b.compile()
      }
      return b.fn(a).join("")
    }
    return b.evaluate(a)
  },
  evaluate: function(a) {
    var f = this,
      c = !f.disableFormats,
      e = Ext.util.Format,
      b = f;

    function d(j, i, h, k, g) {
      if (h == null || h === "") {
        h = i
      }
      if (k && c) {
        if (g) {
          g = [a[h]].concat(Ext.functionFactory("return [" + g + "];")())
        } else {
          g = [a[h]]
        }
        if (k.substr(0, 5) === "this.") {
          return b[k.substr(5)].apply(b, g)
        } else {
          if (e[k]) {
            return e[k].apply(e, g)
          } else {
            return j
          }
        }
      } else {
        return a[h] !== undefined ? a[h] : ""
      }
    }
    return f.html.replace(f.tokenRe, d)
  },
  applyOut: function(a, b) {
    var c = this;
    if (c.compiled) {
      if (!c.fn) {
        c.compile()
      }
      b.push.apply(b, c.fn(a))
    } else {
      b.push(c.apply(a))
    }
    return b
  },
  applyTemplate: function() {
    return this.apply.apply(this, arguments)
  },
  set: function(a, c) {
    var b = this;
    b.html = a;
    b.compiled = !!c;
    b.fn = null;
    return b
  },
  compileARe: /\\/g,
  compileBRe: /(\r\n|\n)/g,
  compileCRe: /'/g,
  compile: function() {
    var b = this,
      a;
    a = b.html.replace(b.compileARe, "\\\\").replace(b.compileBRe, "\\n")
      .replace(b.compileCRe, "\\'").replace(b.tokenRe, b.regexReplaceFn.bind(
        b));
    a = (this.disableFormats !== true ? "var fm=Ext.util.Format;" : "") +
      (b.useEval ? "$=" : "return") + " function(v){return ['" + a +
      "'];};";
    b.fn = b.useEval ? b.evalCompiled(a) : (new Function("Ext", a))(Ext);
    b.compiled = true;
    return b
  },
  evalCompiled: function($) {
    eval($);
    return $
  },
  regexReplaceFn: function(d, c, b, e, a) {
    if (c == null || c === "") {
      c = '"' + b + '"'
    } else {
      if (this.stringFormat) {
        c = parseInt(c) + 1
      }
    }
    if (e && this.disableFormats !== true) {
      a = a ? "," + a : "";
      if (e.substr(0, 5) === "this.") {
        e = e + "("
      } else {
        if (Ext.util.Format[e]) {
          e = "fm." + e + "("
        } else {
          return d
        }
      }
      return "'," + e + "v[" + c + "]" + a + "),'"
    } else {
      return "',v[" + c + "] == undefined ? '' : v[" + c + "],'"
    }
  },
  insertFirst: function(b, a, c) {
    return this.doInsert("afterBegin", b, a, c)
  },
  insertBefore: function(b, a, c) {
    return this.doInsert("beforeBegin", b, a, c)
  },
  insertAfter: function(b, a, c) {
    return this.doInsert("afterEnd", b, a, c)
  },
  append: function(b, a, c) {
    return this.doInsert("beforeEnd", b, a, c)
  },
  doInsert: function(b, d, a, e) {
    var c = Ext.DomHelper.insertHtml(b, Ext.getDom(d), this.apply(a));
    return e ? Ext.get(c) : c
  },
  overwrite: function(c, a, d) {
    var b = Ext.DomHelper.overwrite(Ext.getDom(c), this.apply(a));
    return d ? Ext.get(b) : b
  }
}, 1, 0, 0, 0, 0, 0, [Ext, "Template"], function(d) {
  var c = /\{\d+\}/,
    a = function(f) {
      if (c.test(f)) {
        f = new d(f, b);
        return function() {
          return f.apply(arguments)
        }
      } else {
        return function() {
          return f
        }
      }
    },
    b = {
      useFormat: false,
      compiled: true,
      stringFormat: true
    },
    e = {};
  Ext.String.format = Ext.util.Format.format = function(g) {
    var f = e[g] || (e[g] = a(g));
    return f.apply(this, arguments)
  };
  Ext.String.formatEncode = function() {
    return Ext.String.htmlEncode(Ext.String.format.apply(this, arguments))
  }
}));
(Ext.cmd.derive("Ext.mixin.Inheritable", Ext.Mixin, {
  mixinConfig: {
    id: "inheritable"
  },
  getInherited: function(i) {
    var e = this,
      g = (i && e.inheritedStateInner) || e.inheritedState,
      b = e.getRefOwner(),
      a = e.isContainer,
      h, c, d, f;
    if (!g || g.invalid) {
      h = e.getRefOwner();
      f = e.ownerLayout;
      if (b) {
        d = f ? f === b.layout : true
      }
      e.inheritedState = g = Ext.Object.chain(h ? h.getInherited(d) : Ext
        .rootInheritedState);
      if (a) {
        e.inheritedStateInner = c = Ext.Object.chain(g)
      }
      e.initInheritedState(g, c);
      g = (a && i) ? e.inheritedStateInner : e.inheritedState
    }
    return g
  },
  getInheritedConfig: function(e, a) {
    var d = this.inheritedState,
      b, c;
    if (!d || d.invalid) {
      d = this.getInherited()
    }
    c = d[e];
    if (a && d.hasOwnProperty(e)) {
      b = c;
      delete d[e];
      c = d[e];
      d[e] = b
    }
    return c
  },
  resolveListenerScope: function(f, a) {
    var d = this,
      e = (typeof a === "boolean"),
      c = Ext._namedScopes[f],
      b;
    if (!c) {
      b = d.getInheritedConfig("defaultListenerScope", e ? a : true) || f ||
        d
    } else {
      if (c.isController) {
        b = d.getInheritedConfig("controller", e ? a : !c.isSelf)
      } else {
        if (c.isSelf) {
          b = d.getInheritedConfig("defaultListenerScope", e && a) || d
        } else {
          if (c.isThis) {
            b = d
          }
        }
      }
    }
    return b || null
  },
  resolveSatelliteListenerScope: function(c, e) {
    var d = this,
      b = Ext._namedScopes[e],
      a;
    if (!b) {
      a = d.getInheritedConfig("defaultListenerScope") || e || d
    } else {
      if (b.isController) {
        a = d.getInheritedConfig("controller")
      } else {
        if (b.isSelf) {
          a = d.getInheritedConfig("defaultListenerScope") || c
        } else {
          if (b.isThis) {
            a = c
          }
        }
      }
    }
    return a || null
  },
  lookupReferenceHolder: function(a) {
    return this.getInheritedConfig("referenceHolder", a !== false) ||
      null
  },
  getRefOwner: function() {
    var a = this;
    return a.ownerCt || a.parent || a.$initParent || a.ownerCmp || a.floatParent
  },
  invalidateInheritedState: function() {
    var a = this.inheritedState;
    if (a) {
      a.invalid = true;
      delete this.inheritedState
    }
  },
  privates: {
    fixReference: function() {
      var a = this,
        b;
      if (a.getReference()) {
        b = a.lookupReferenceHolder();
        if (b) {
          b.attachReference(a)
        }
      }
    },
    onInheritedAdd: function(b, a) {
      var c = this;
      if (c.inheritedState && a) {
        c.invalidateInheritedState()
      }
      if (c.getReference()) {
        Ext.ComponentManager.markReferencesDirty()
      }
    },
    onInheritedRemove: function(b) {
      var a = this,
        c;
      if (a.getReference()) {
        c = a.lookupReferenceHolder();
        if (c) {
          c.clearReference(a)
        }
      }
      if (a.inheritedState && !b) {
        a.invalidateInheritedState()
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.mixin, "Inheritable"], function() {
  Ext.rootInheritedState = {}
}));
(Ext.cmd.derive("Ext.mixin.Bindable", Ext.Base, {
  mixinId: "bindable",
  config: {
    bind: {
      $value: null,
      lazy: true
    },
    controller: null,
    defaultListenerScope: false,
    publishes: {
      $value: null,
      lazy: true,
      merge: function(b, a) {
        return this.mergeSets(b, a)
      }
    },
    reference: null,
    session: {
      $value: null,
      lazy: true
    },
    twoWayBindable: {
      $value: null,
      lazy: true,
      merge: function(b, a) {
        return this.mergeSets(b, a)
      }
    },
    viewModel: {
      $value: null,
      lazy: true
    }
  },
  defaultBindProperty: null,
  validRefRe: /^[a-z_][a-z0-9_]*$/i,
  initInheritedState: function(d) {
    var e = this,
      a = e.getReference(),
      b = e.getController(),
      c = e.getConfig("viewModel", true),
      g = e.getConfig("session", true),
      f = e.getDefaultListenerScope();
    if (b) {
      d.controller = b
    }
    if (f) {
      d.defaultListenerScope = e
    } else {
      if (b) {
        d.defaultListenerScope = b
      }
    }
    if (c) {
      if (!c.isViewModel) {
        c = e
      }
      d.viewModel = c
    }
    if (g) {
      if (!g.isSession) {
        g = e
      }
      d.session = g
    }
    if (a) {
      e.referenceKey = (d.referencePath || "") + a;
      e.viewModelKey = (d.viewModelPath || "") + a
    }
  },
  lookupController: function(a) {
    return this.getInheritedConfig("controller", a) || null
  },
  lookupSession: function(a) {
    var b = a ? null : this.getSession();
    if (!b) {
      b = this.getInheritedConfig("session", a);
      if (b && !b.isSession) {
        b = b.getInherited().session = b.getSession()
      }
    }
    return b || null
  },
  lookupViewModel: function(a) {
    var b = a ? null : this.getViewModel();
    if (!b) {
      b = this.getInheritedConfig("viewModel", a);
      if (b && !b.isViewModel) {
        b = b.getInherited().viewModel = b.getViewModel()
      }
    }
    return b || null
  },
  publishState: function(j, i) {
    var h = this,
      b = h.publishedState,
      e = h.getBind(),
      g = e && j && e[j],
      f = 0,
      c, a, d, k;
    if (g && !g.syncing && !g.isReadOnly()) {
      if (!(g.calls === 0 && (i == null || i === h.getInitialConfig()[j]))) {
        g.setValue(i)
      }
    }
    if (!(a = h.getPublishes())) {
      return
    }
    if (!(d = h.lookupViewModel())) {
      return
    }
    if (!(k = h.viewModelKey)) {
      return
    }
    if (j && b) {
      if (!a[j]) {
        return
      }
      if (!(i && i.constructor === Object) && !(i instanceof Array)) {
        if (b[j] === i) {
          return
        }
      }
      k += ".";
      k += j
    } else {
      b = b || (h.publishedState = {});
      for (c in a) {
        ++f;
        if (c === j) {
          b[c] = i
        } else {
          b[c] = h[c]
        }
      }
      if (!f) {
        return
      }
      i = b
    }
    d.set(k, i)
  },
  privates: {
    addBindableUpdater: function(c) {
      var b = this,
        d = b.self.$config.configs,
        a = d[c],
        e;
      if (a && !b.hasOwnProperty(e = a.names.update)) {
        b[e] = a.bindableUpdater || (a.root.bindableUpdater = b.makeBindableUpdater(
          a))
      }
    },
    applyBind: function(d, j) {
      if (!d) {
        return d
      }
      var f = this,
        h = f.lookupViewModel(),
        e = f.getTwoWayBindable(),
        a = f._getBindTemplateScope,
        g, i, c;
      if (!j || typeof j === "string") {
        j = {}
      }
      if (Ext.isString(d)) {
        g = d;
        d = {};
        d[f.defaultBindProperty] = g
      }
      for (i in d) {
        c = d[i];
        g = j[i];
        if (g && typeof g !== "string") {
          g.destroy();
          g = null
        }
        if (c) {
          g = h.bind(c, f.onBindNotify, f);
          g._config = Ext.Config.get(i);
          g.getTemplateScope = a
        }
        j[i] = g;
        if (e && e[i] && !g.isReadOnly()) {
          f.addBindableUpdater(i)
        }
      }
      return j
    },
    applyController: function(a) {
      if (a) {
        a = Ext.Factory.controller(a);
        a.setView(this)
      }
      return a
    },
    applyPublishes: function(a) {
      if (this.lookupViewModel()) {
        for (var b in a) {
          this.addBindableUpdater(b)
        }
      }
      return a
    },
    applySession: function(c) {
      if (!c) {
        return null
      }
      if (!c.isSession) {
        var b = this.lookupSession(true),
          a = (c === true) ? {} : c;
        if (b) {
          c = b.spawn(a)
        } else {
          c = new Ext.data.Session(a)
        }
      }
      return c
    },
    applyViewModel: function(b) {
      var c = this,
        a, d;
      if (!b) {
        return null
      }
      if (!b.isViewModel) {
        a = {
          parent: c.lookupViewModel(true)
        };
        a.session = c.getSession();
        if (!d && !a.parent) {
          a.session = c.lookupSession()
        }
        if (b) {
          if (b.constructor === Object) {
            Ext.apply(a, b)
          } else {
            if (typeof b === "string") {
              a.type = b
            }
          }
        }
        b = Ext.Factory.viewModel(a)
      }
      return b
    },
    _getBindTemplateScope: function() {
      return this.scope.resolveListenerScope()
    },
    destroyBindable: function() {
      var c = this,
        b = c.getConfig("viewModel", true),
        d = c.getConfig("session", true),
        a = c.getController();
      if (b && b.isViewModel) {
        b.destroy();
        c.setViewModel(null)
      }
      if (d && d.isSession) {
        if (d.getAutoDestroy()) {
          d.destroy()
        }
        c.setSession(null)
      }
      if (a) {
        c.setController(null);
        a.destroy()
      }
    },
    initBindable: function() {
      this.initBindable = Ext.emptyFn;
      this.getBind();
      this.getPublishes()
    },
    makeBindableUpdater: function(a) {
      var b = a.names.update;
      return function(e, c) {
        var d = this,
          f = d.self.prototype[b];
        if (f) {
          f.call(d, e, c)
        }
        d.publishState(a.name, e)
      }
    },
    isSyncing: function(b) {
      var d = this.getBind(),
        a = false,
        c;
      if (d) {
        c = d[b];
        if (c) {
          a = c.syncing > 0
        }
      }
      return a
    },
    onBindNotify: function(b, a, c) {
      c.syncing = (c.syncing + 1) || 1;
      this[c._config.names.set](b);
      --c.syncing
    },
    removeBindings: function() {
      var b = this,
        d, a, c;
      if (!b.destroying) {
        d = b.getBind();
        if (d && typeof d !== "string") {
          for (a in d) {
            c = d[a];
            c.destroy();
            c._config = c.getTemplateScope = null
          }
        }
      }
      b.setBind(null)
    },
    updateSession: function(b) {
      var a = this.getInherited();
      if (b) {
        a.session = b
      } else {
        delete a.session
      }
    },
    updateViewModel: function(b) {
      var c = this.getInherited(),
        a = this.getController();
      if (b) {
        c.viewModel = b;
        b.setView(this);
        if (a) {
          a.initViewModel(b)
        }
      } else {
        delete c.viewModel
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.mixin, "Bindable"], 0));
(Ext.cmd.derive("Ext.mixin.ComponentDelegation", Ext.Mixin, {
  mixinConfig: {
    id: "componentDelegation"
  },
  privates: {
    addDelegatedListener: function(f, h, j, k, d, c, e) {
      var g = this,
        b, a, i;
      d = d || k.order;
      if (d) {
        i = (k && k.priority);
        if (!i) {
          k = k ? Ext.Object.chain(k) : {};
          k.priority = g.$orderToPriority[d]
        }
      }
      b = g.$delegatedEvents || (g.$delegatedEvents = {});
      a = b[f] || (b[f] = new Ext.util.Event(g, f));
      if (a.addListener(h, j, k, c, e)) {
        g.$hasDelegatedListeners._incr_(f)
      }
    },
    clearDelegatedListeners: function() {
      var d = this,
        b = d.$delegatedEvents,
        a, c, e;
      if (b) {
        for (a in b) {
          c = b[a];
          e = c.listeners.length;
          c.clearListeners();
          d.$hasDelegatedListeners._decr_(a, e);
          delete b[a]
        }
      }
    },
    doFireDelegatedEvent: function(b, d) {
      var g = this,
        c = true,
        a, e, f;
      if (g.$hasDelegatedListeners[b]) {
        a = g.getRefOwner();
        while (a) {
          e = a.$delegatedEvents;
          if (e) {
            f = e[b];
            if (f) {
              c = f.fireDelegated(g, d);
              if (c === false) {
                break
              }
            }
          }
          a = a.getRefOwner()
        }
      }
      return c
    },
    removeDelegatedListener: function(a, d, c) {
      var f = this,
        b = f.$delegatedEvents,
        e;
      if (b) {
        e = b[a];
        if (e && e.removeListener(d, c)) {
          f.$hasDelegatedListeners._decr_(a);
          if (e.listeners.length === 0) {
            delete b[a]
          }
        }
      }
    }
  },
  onClassMixedIn: function(a) {
    function b() {}
    a.prototype.HasListeners = a.HasListeners = b;
    b.prototype = a.hasListeners = new Ext.mixin.ComponentDelegation.HasDelegatedListeners()
  }
}, 0, 0, 0, 0, 0, 0, [Ext.mixin, "ComponentDelegation"], function(b) {
  function a() {}
  b.HasDelegatedListeners = a;
  a.prototype = b.prototype.$hasDelegatedListeners = new Ext.mixin.Observable
    .HasListeners()
}));
(Ext.cmd.derive("Ext.Widget", Ext.Evented, {
  isWidget: true,
  element: {
    reference: "element"
  },
  observableType: "component",
  cachedConfig: {
    style: null
  },
  eventedConfig: {
    width: null,
    height: null
  },
  template: [],
  constructor: function(b) {
    var c = this,
      a;
    c.initId(b);
    c.initElement();
    c.mixins.observable.constructor.call(c, b);
    Ext.ComponentManager.register(c);
    a = c.getController();
    if (a) {
      a.init(c)
    }
  },
  afterCachedConfig: function() {
    var h = this,
      j = h.self.prototype,
      k = h.referenceList,
      c = h.renderElement,
      f, d, e, g, b, a;
    j.renderTemplate = f = document.createDocumentFragment();
    f.appendChild(c.clone(true, true));
    a = f.querySelectorAll("[id]");
    for (e = 0, g = a.length; e < g; e++) {
      d = a[e];
      d.removeAttribute("id")
    }
    for (e = 0, g = k.length; e < g; e++) {
      b = k[e];
      h[b].dom.removeAttribute("reference")
    }
  },
  addCls: function(a) {
    this.el.addCls(a)
  },
  applyWidth: function(a) {
    return this.filterLengthValue(a)
  },
  applyHeight: function(a) {
    return this.filterLengthValue(a)
  },
  clearListeners: function() {
    var a = this;
    a.mixins.observable.clearListeners.call(a);
    a.mixins.componentDelegation.clearDelegatedListeners.call(a)
  },
  destroy: function() {
    var e = this,
      b = e.referenceList,
      c, d, a;
    for (c = 0, d = b.length; c < d; c++) {
      a = b[c];
      if (e.hasOwnProperty(a)) {
        e[a].destroy();
        e[a] = null
      }
    }
    e.destroyBindable();
    Ext.Evented.prototype.destroy.call(this);
    Ext.ComponentManager.unregister(e)
  },
  doFireEvent: function(b, d, a) {
    var e = this,
      c = e.mixins.observable.doFireEvent.call(e, b, d, a);
    if (c !== false) {
      c = e.mixins.componentDelegation.doFireDelegatedEvent.call(e, b, d)
    }
    return c
  },
  getElementConfig: function() {
    var b = this,
      a = b.element;
    if (!("children" in a)) {
      a = Ext.apply({
        children: b.getTemplate()
      }, a)
    }
    return a
  },
  getSize: function() {
    return {
      width: this.getWidth(),
      height: this.getHeight()
    }
  },
  getTemplate: function() {
    return this.template
  },
  initElement: function() {
    var l = this,
      m = l.self.prototype,
      a = l.getId(),
      n = l.referenceList = l.referenceList = [],
      c = true,
      h, e, g, b, f, k, j, d;
    if (m.hasOwnProperty("renderTemplate")) {
      h = l.renderTemplate.cloneNode(true);
      e = h.firstChild
    } else {
      c = false;
      h = document.createDocumentFragment();
      e = Ext.Element.create(l.processElementConfig.call(m), true);
      h.appendChild(e)
    }
    b = h.querySelectorAll("[reference]");
    for (f = 0, k = b.length; f < k; f++) {
      j = b[f];
      d = j.getAttribute("reference");
      if (c) {
        j.removeAttribute("reference")
      }
      if (d === "element") {
        j.id = a;
        g = l.el = l.addElementReference(d, j)
      } else {
        l.addElementReferenceOnDemand(d, j)
      }
      n.push(d)
    }
    if (e === g.dom) {
      l.renderElement = g
    } else {
      l.addElementReferenceOnDemand("renderElement", e)
    }
  },
  is: function(a) {
    return Ext.ComponentQuery.is(this, a)
  },
  isXType: function(b, a) {
    return a ? (Ext.Array.indexOf(this.xtypes, b) !== -1) : !!this.xtypesMap[
      b]
  },
  removeCls: function(a) {
    this.el.removeCls(a)
  },
  toggleCls: function(a, b) {
    this.element.toggleCls(a, b)
  },
  resolveListenerScope: function(b, a) {
    return this.mixins.inheritable.resolveListenerScope.call(this, b, a)
  },
  setSize: function(b, a) {
    if (b !== undefined) {
      this.setWidth(b)
    }
    if (a !== undefined) {
      this.setHeight(a)
    }
  },
  applyStyle: function(b, a) {
    if (a && b === a && Ext.isObject(a)) {
      b = Ext.apply({}, b)
    }
    return b
  },
  updateStyle: function(a) {
    this.element.applyStyles(a)
  },
  updateWidth: function(a) {
    this.element.setWidth(a)
  },
  updateHeight: function(a) {
    this.element.setHeight(a)
  },
  onFocusEnter: Ext.emptyFn,
  onFocusLeave: Ext.emptyFn,
  isAncestor: function() {
    return false
  },
  privates: {
    addElementReferenceOnDemand: function(a, b) {
      if (this._elementListeners[a]) {
        this.addElementReference(a, b)
      } else {
        Ext.Object.defineProperty(this, a, {
          get: function() {
            delete this[a];
            return this.addElementReference(a, b)
          },
          configurable: true
        })
      }
    },
    addElementReference: function(c, e) {
      var f = this,
        b = f[c] = Ext.get(e),
        d = f._elementListeners[c],
        a, g;
      b.skipGarbageCollection = true;
      b.component = f;
      if (d) {
        d = Ext.clone(d);
        d.scope = f;
        for (a in d) {
          g = d[a];
          if (typeof g === "object") {
            g.scope = f
          }
        }
        b.on(d)
      }
      return b
    },
    detachFromBody: function() {
      Ext.getDetachedBody().appendChild(this.element);
      this.isDetached = true
    },
    doAddListener: function(a, g, h, i, c, b, d) {
      var f = this,
        e;
      if (i && "element" in i) {
        f[i.element].doAddListener(a, g, h || f, i, c)
      }
      if (i) {
        e = i.delegate;
        if (e) {
          f.mixins.componentDelegation.addDelegatedListener.call(f, a, g,
            h, i, c, b, d);
          return
        }
      }
      Ext.Evented.prototype.doAddListener.call(this, a, g, h, i, c, b, d)
    },
    doRemoveListener: function(a, c, b) {
      var d = this;
      d.mixins.observable.doRemoveListener.call(d, a, c, b);
      d.mixins.componentDelegation.removeDelegatedListener.call(d, a, c,
        b)
    },
    filterLengthValue: function(a) {
      if (a === "auto" || (!a && a !== 0)) {
        return null
      }
      return a
    },
    getFocusEl: function() {
      return this.element
    },
    initElementListeners: function(l) {
      var k = this,
        d = k.self.superclass,
        c = d._elementListeners,
        e = l.reference,
        a = l.children,
        g, j, b, h, f;
      if (k.hasOwnProperty("_elementListeners")) {
        g = k._elementListeners
      } else {
        g = k._elementListeners = (c ? Ext.Object.chain(c) : {})
      }
      if (e) {
        j = l.listeners;
        if (j) {
          if (c) {
            b = c[e];
            if (b) {
              j = Ext.Object.chain(b);
              Ext.apply(j, l.listeners)
            }
          }
          g[e] = j;
          l.listeners = null
        }
      }
      if (a) {
        for (f = 0, h = a.length; f < h; f++) {
          k.initElementListeners(a[f])
        }
      }
    },
    initId: function(b) {
      var c = this,
        a = c.config,
        d = (b && b.id) || (a && a.id);
      if (d) {
        c.setId(d);
        c.id = d
      } else {
        c.getId()
      }
    },
    processElementConfig: function() {
      var a = this,
        c = a.self.superclass,
        b;
      if (a.hasOwnProperty("_elementConfig")) {
        b = a._elementConfig
      } else {
        b = a._elementConfig = a.getElementConfig();
        if (c.isWidget) {
          a.processElementConfig.call(c)
        }
        a.initElementListeners(b)
      }
      return b
    },
    reattachToBody: function() {
      this.isDetached = false
    }
  }
}, 1, ["widget"], ["widget"], {
  widget: true
}, ["widget.widget"], [
  [Ext.mixin.Inheritable.prototype.mixinId || Ext.mixin.Inheritable.$className,
    Ext.mixin.Inheritable
  ],
  [Ext.mixin.Bindable.prototype.mixinId || Ext.mixin.Bindable.$className,
    Ext.mixin.Bindable
  ],
  [Ext.mixin.ComponentDelegation.prototype.mixinId || Ext.mixin.ComponentDelegation
    .$className, Ext.mixin.ComponentDelegation
  ]
], [Ext, "Widget"], function(b) {
  var a = b.prototype;
  (a.$elementEventOptions = Ext.Object.chain(Ext.Element.prototype.$eventOptions))
  .element = 1;
  (a.$eventOptions = Ext.Object.chain(a.$eventOptions)).delegate = 1
}));
Ext.define("Ext.overrides.Widget", {
  override: "Ext.Widget",
  $configStrict: false,
  isComponent: true,
  liquidLayout: true,
  rendered: true,
  rendering: true,
  config: {
    renderTo: null
  },
  cachedConfig: {
    baseCls: "x-widget"
  },
  constructor: function(a) {
    var b = this,
      c;
    (arguments.callee.$previous || Ext.Evented.prototype.constructor).call
      (this, a);
    b.getComponentLayout();
    c = b.getRenderTo();
    if (c) {
      b.render(c)
    }
  },
  addClsWithUI: function(a) {
    this.el.addCls(a)
  },
  afterComponentLayout: Ext.emptyFn,
  updateLayout: function() {
    var a = this.getRefOwner();
    if (a) {
      a.updateLayout()
    }
  },
  destroy: function() {
    var b = this,
      a = b.ownerCt;
    if (a && a.remove) {
      a.remove(b, false)
    }(arguments.callee.$previous || Ext.Evented.prototype.destroy).call(
      this)
  },
  finishRender: function() {
    this.rendering = false;
    this.initBindable()
  },
  getAnimationProps: function() {
    return {}
  },
  getComponentLayout: function() {
    var b = this,
      a = b.componentLayout;
    if (!a) {
      a = b.componentLayout = new Ext.layout.component.Auto();
      a.setOwner(b)
    }
    return a
  },
  getEl: function() {
    return this.element
  },
  getTdCls: function() {
    return "x-" + this.getTdType() + "-" + (this.ui || "default") +
      "-cell"
  },
  getTdType: function() {
    return this.xtype
  },
  getItemId: function() {
    return this.itemId || this.id
  },
  getSizeModel: function() {
    return Ext.Component.prototype.getSizeModel.apply(this, arguments)
  },
  onAdded: function(b, e, a) {
    var d = this,
      c = d.inheritedState;
    d.ownerCt = b;
    d.onInheritedAdd(d, a)
  },
  onRemoved: function(b) {
    var a = this;
    if (!b) {
      a.removeBindings()
    }
    a.onInheritedRemove(b);
    a.ownerCt = a.ownerLayout = null
  },
  parseBox: function(a) {
    return Ext.Element.parseBox(a)
  },
  removeClsWithUI: function(a) {
    this.el.removeCls(a)
  },
  render: function(b, a) {
    var e = this,
      c = e.element,
      d = Ext.Component.prototype,
      f;
    if (!e.ownerCt || e.floating) {
      if (Ext.scopeCss) {
        c.addCls(d.rootCls)
      }
      c.addCls(d.borderBoxCls)
    }
    if (a) {
      f = b.childNodes[a];
      if (f) {
        Ext.fly(b).insertBefore(c, f);
        return
      }
    }
    Ext.fly(b).appendChild(c)
  },
  setPosition: function(a, b) {
    this.el.setLocalXY(a, b)
  },
  up: function() {
    return Ext.Component.prototype.up.apply(this, arguments)
  },
  isAncestor: function() {
    return Ext.Component.prototype.isAncestor.apply(this, arguments)
  },
  onFocusEnter: function() {
    return Ext.Component.prototype.onFocusEnter.apply(this, arguments)
  },
  onFocusLeave: function() {
    return Ext.Component.prototype.onFocusLeave.apply(this, arguments)
  },
  isLayoutChild: function(b) {
    var a = this.ownerCt;
    return a ? (a === b || a.isLayoutChild(b)) : false
  }
}, function(b) {
  var a = b.prototype;
  if (Ext.isIE9m) {
    a.addElementReferenceOnDemand = a.addElementReference
  }
});
(Ext.cmd.derive("Ext.util.XTemplateParser", Ext.Base, {
  constructor: function(a) {
    Ext.apply(this, a)
  },
  doTpl: Ext.emptyFn,
  parse: function(l) {
    var v = this,
      p = l.length,
      o = {
        elseif: "elif"
      },
      q = v.topRe,
      c = v.actionsRe,
      e, d, i, n, g, j, h, u, r, b, f, a, k;
    v.level = 0;
    v.stack = d = [];
    for (e = 0; e < p; e = b) {
      q.lastIndex = e;
      n = q.exec(l);
      if (!n) {
        v.doText(l.substring(e, p));
        break
      }
      r = n.index;
      b = q.lastIndex;
      if (e < r) {
        i = l.substring(e, r);
        if (!(k && Ext.String.trim(i) === "")) {
          v.doText(i)
        }
      }
      k = false;
      if (n[1]) {
        b = l.indexOf("%}", r + 2);
        v.doEval(l.substring(r + 2, b));
        b += 2
      } else {
        if (n[2]) {
          b = l.indexOf("]}", r + 2);
          v.doExpr(l.substring(r + 2, b));
          b += 2
        } else {
          if (n[3]) {
            v.doTag(n[3])
          } else {
            if (n[4]) {
              f = null;
              while ((u = c.exec(n[4])) !== null) {
                i = u[2] || u[3];
                if (i) {
                  i = Ext.String.htmlDecode(i);
                  g = u[1];
                  g = o[g] || g;
                  f = f || {};
                  j = f[g];
                  if (typeof j == "string") {
                    f[g] = [j, i]
                  } else {
                    if (j) {
                      f[g].push(i)
                    } else {
                      f[g] = i
                    }
                  }
                }
              }
              if (!f) {
                if (v.elseRe.test(n[4])) {
                  v.doElse()
                } else {
                  if (v.defaultRe.test(n[4])) {
                    v.doDefault()
                  } else {
                    v.doTpl();
                    d.push({
                      type: "tpl"
                    })
                  }
                }
              } else {
                if (f["if"]) {
                  v.doIf(f["if"], f);
                  d.push({
                    type: "if"
                  })
                } else {
                  if (f["switch"]) {
                    v.doSwitch(f["switch"], f);
                    d.push({
                      type: "switch"
                    });
                    k = true
                  } else {
                    if (f["case"]) {
                      v.doCase(f["case"], f)
                    } else {
                      if (f.elif) {
                        v.doElseIf(f.elif, f)
                      } else {
                        if (f["for"]) {
                          ++v.level;
                          if (a = v.propRe.exec(n[4])) {
                            f.propName = a[1] || a[2]
                          }
                          v.doFor(f["for"], f);
                          d.push({
                            type: "for",
                            actions: f
                          })
                        } else {
                          if (f.foreach) {
                            ++v.level;
                            if (a = v.propRe.exec(n[4])) {
                              f.propName = a[1] || a[2]
                            }
                            v.doForEach(f.foreach, f);
                            d.push({
                              type: "foreach",
                              actions: f
                            })
                          } else {
                            if (f.exec) {
                              v.doExec(f.exec, f);
                              d.push({
                                type: "exec",
                                actions: f
                              })
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else {
              if (n[0].length === 5) {
                d.push({
                  type: "tpl"
                })
              } else {
                h = d.pop();
                v.doEnd(h.type, h.actions);
                if (h.type == "for" || h.type == "foreach") {
                  --v.level
                }
              }
            }
          }
        }
      }
    }
  },
  topRe: /(?:(\{\%)|(\{\[)|\{([^{}]+)\})|(?:<tpl([^>]*)\>)|(?:<\/tpl>)/g,
  actionsRe: /\s*(elif|elseif|if|for|foreach|exec|switch|case|eval|between)\s*\=\s*(?:(?:"([^"]*)")|(?:'([^']*)'))\s*/g,
  propRe: /prop=(?:(?:"([^"]*)")|(?:'([^']*)'))/,
  defaultRe: /^\s*default\s*$/,
  elseRe: /^\s*else\s*$/
}, 1, 0, 0, 0, 0, 0, [Ext.util, "XTemplateParser"], 0));
(Ext.cmd.derive("Ext.util.XTemplateCompiler", Ext.util.XTemplateParser, {
  useEval: Ext.isGecko,
  useIndex: Ext.isIE8m,
  useFormat: true,
  propNameRe: /^[\w\d\$]*$/,
  compile: function(a) {
    var c = this,
      b = c.generate(a);
    return c.useEval ? c.evalTpl(b) : (new Function("Ext", b))(Ext)
  },
  generate: function(a) {
    var d = this,
      b = "var fm=Ext.util.Format,ts=Object.prototype.toString;",
      c;
    d.maxLevel = 0;
    d.body = ["var c0=values, a0=" + d.createArrayTest(0) +
      ", p0=parent, n0=xcount, i0=xindex, k0, v;\n"
    ];
    if (d.definitions) {
      if (typeof d.definitions === "string") {
        d.definitions = [d.definitions, b]
      } else {
        d.definitions.push(b)
      }
    } else {
      d.definitions = [b]
    }
    d.switches = [];
    d.parse(a);
    d.definitions.push((d.useEval ? "$=" : "return") + " function (" + d.fnArgs +
      ") {", d.body.join(""), "}");
    c = d.definitions.join("\n");
    d.definitions.length = d.body.length = d.switches.length = 0;
    delete d.definitions;
    delete d.body;
    delete d.switches;
    return c
  },
  doText: function(c) {
    var b = this,
      a = b.body;
    c = c.replace(b.aposRe, "\\'").replace(b.newLineRe, "\\n");
    if (b.useIndex) {
      a.push("out[out.length]='", c, "'\n")
    } else {
      a.push("out.push('", c, "')\n")
    }
  },
  doExpr: function(b) {
    var a = this.body;
    a.push("if ((v=" + b + ") != null) out");
    if (this.useIndex) {
      a.push("[out.length]=v+''\n")
    } else {
      a.push(".push(v+'')\n")
    }
  },
  doTag: function(a) {
    var b = this.parseTag(a);
    if (b) {
      this.doExpr(b)
    } else {
      this.doText("{" + a + "}")
    }
  },
  doElse: function() {
    this.body.push("} else {\n")
  },
  doEval: function(a) {
    this.body.push(a, "\n")
  },
  doIf: function(b, c) {
    var a = this;
    if (b === ".") {
      a.body.push("if (values) {\n")
    } else {
      if (a.propNameRe.test(b)) {
        a.body.push("if (", a.parseTag(b), ") {\n")
      } else {
        a.body.push("if (", a.addFn(b), a.callFn, ") {\n")
      }
    }
    if (c.exec) {
      a.doExec(c.exec)
    }
  },
  doElseIf: function(b, c) {
    var a = this;
    if (b === ".") {
      a.body.push("else if (values) {\n")
    } else {
      if (a.propNameRe.test(b)) {
        a.body.push("} else if (", a.parseTag(b), ") {\n")
      } else {
        a.body.push("} else if (", a.addFn(b), a.callFn, ") {\n")
      }
    }
    if (c.exec) {
      a.doExec(c.exec)
    }
  },
  doSwitch: function(c) {
    var b = this,
      a;
    if (c === "." || c === "#") {
      a = c === "." ? "values" : "xindex";
      b.body.push("switch (", a, ") {\n")
    } else {
      if (b.propNameRe.test(c)) {
        b.body.push("switch (", b.parseTag(c), ") {\n")
      } else {
        b.body.push("switch (", b.addFn(c), b.callFn, ") {\n")
      }
    }
    b.switches.push(0)
  },
  doCase: function(e) {
    var d = this,
      c = Ext.isArray(e) ? e : [e],
      f = d.switches.length - 1,
      a, b;
    if (d.switches[f]) {
      d.body.push("break;\n")
    } else {
      d.switches[f]++
    }
    for (b = 0, f = c.length; b < f; ++b) {
      a = d.intRe.exec(c[b]);
      c[b] = a ? a[1] : ("'" + c[b].replace(d.aposRe, "\\'") + "'")
    }
    d.body.push("case ", c.join(": case "), ":\n")
  },
  doDefault: function() {
    var a = this,
      b = a.switches.length - 1;
    if (a.switches[b]) {
      a.body.push("break;\n")
    } else {
      a.switches[b]++
    }
    a.body.push("default:\n")
  },
  doEnd: function(b, d) {
    var c = this,
      a = c.level - 1;
    if (b == "for" || b == "foreach") {
      if (d.exec) {
        c.doExec(d.exec)
      }
      c.body.push("}\n");
      c.body.push("parent=p", a, ";values=r", a + 1, ";xcount=n" + a +
        ";xindex=i", a, "+1;xkey=k", a, ";\n")
    } else {
      if (b == "if" || b == "switch") {
        c.body.push("}\n")
      }
    }
  },
  doFor: function(e, g) {
    var d = this,
      c, b = d.level,
      a = b - 1,
      f;
    if (e === ".") {
      c = "values"
    } else {
      if (d.propNameRe.test(e)) {
        c = d.parseTag(e)
      } else {
        c = d.addFn(e) + d.callFn
      }
    }
    if (d.maxLevel < b) {
      d.maxLevel = b;
      d.body.push("var ")
    }
    if (e == ".") {
      f = "c" + b
    } else {
      f = "a" + a + "?c" + a + "[i" + a + "]:c" + a
    }
    d.body.push("i", b, "=0,n", b, "=0,c", b, "=", c, ",a", b, "=", d.createArrayTest(
        b), ",r", b, "=values,p", b, ",k", b, ";\n", "p", b, "=parent=",
      f, "\n", "if (c", b, "){if(a", b, "){n", b, "=c", b,
      ".length;}else if (c", b, ".isMixedCollection){c", b, "=c", b,
      ".items;n", b, "=c", b, ".length;}else if(c", b, ".isStore){c", b,
      "=c", b, ".data.items;n", b, "=c", b, ".length;}else{c", b, "=[c",
      b, "];n", b, "=1;}}\n", "for (xcount=n", b, ";i", b, "<n" + b +
      ";++i", b, "){\n", "values=c", b, "[i", b, "]");
    if (g.propName) {
      d.body.push(".", g.propName)
    }
    d.body.push("\n", "xindex=i", b, "+1\n");
    if (g.between) {
      d.body.push('if(xindex>1){ out.push("', g.between, '"); } \n')
    }
  },
  doForEach: function(e, g) {
    var d = this,
      c, b = d.level,
      a = b - 1,
      f;
    if (e === ".") {
      c = "values"
    } else {
      if (d.propNameRe.test(e)) {
        c = d.parseTag(e)
      } else {
        c = d.addFn(e) + d.callFn
      }
    }
    if (d.maxLevel < b) {
      d.maxLevel = b;
      d.body.push("var ")
    }
    if (e == ".") {
      f = "c" + b
    } else {
      f = "a" + a + "?c" + a + "[i" + a + "]:c" + a
    }
    d.body.push("i", b, "=-1,n", b, "=0,c", b, "=", c, ",a", b, "=", d.createArrayTest(
        b), ",r", b, "=values,p", b, ",k", b, ";\n", "p", b, "=parent=",
      f, "\n", "for(k", b, " in c", b, "){\n", "xindex=++i", b, "+1;\n",
      "xkey=k", b, ";\n", "values=c", b, "[k", b, "];");
    if (g.propName) {
      d.body.push(".", g.propName)
    }
    if (g.between) {
      d.body.push('if(xindex>1){ out.push("', g.between, '"); } \n')
    }
  },
  createArrayTest: ("isArray" in Array) ? function(a) {
    return "Array.isArray(c" + a + ")"
  } : function(a) {
    return "ts.call(c" + a + ')==="[object Array]"'
  },
  doExec: function(d, e) {
    var c = this,
      a = "f" + c.definitions.length,
      b = c.guards[c.strict ? 0 : 1];
    c.definitions.push("function " + a + "(" + c.fnArgs + ") {", b.doTry,
      " var $v = values; with($v) {", "  " + d, " }", b.doCatch, "}");
    c.body.push(a + c.callFn + "\n")
  },
  guards: [{
    doTry: "",
    doCatch: ""
  }, {
    doTry: "try { ",
    doCatch: " } catch(e) {\n}"
  }],
  addFn: function(a) {
    var d = this,
      b = "f" + d.definitions.length,
      c = d.guards[d.strict ? 0 : 1];
    if (a === ".") {
      d.definitions.push("function " + b + "(" + d.fnArgs + ") {",
        " return values", "}")
    } else {
      if (a === "..") {
        d.definitions.push("function " + b + "(" + d.fnArgs + ") {",
          " return parent", "}")
      } else {
        d.definitions.push("function " + b + "(" + d.fnArgs + ") {", c.doTry,
          " var $v = values; with($v) {", "  return(" + a + ")", " }",
          c.doCatch, "}")
      }
    }
    return b
  },
  parseTag: function(b) {
    var g = this,
      a = g.tagRe.exec(b),
      e, h, d, f, c;
    if (!a) {
      return null
    }
    e = a[1];
    h = a[2];
    d = a[3];
    f = a[4];
    if (e == ".") {
      if (!g.validTypes) {
        g.definitions.push(
          "var validTypes={string:1,number:1,boolean:1};");
        g.validTypes = true
      }
      c =
        'validTypes[typeof values] || ts.call(values) === "[object Date]" ? values : ""'
    } else {
      if (e == "#") {
        c = "xindex"
      } else {
        if (e == "$") {
          c = "xkey"
        } else {
          if (e.substr(0, 7) == "parent.") {
            c = e
          } else {
            if (isNaN(e) && e.indexOf("-") == -1 && e.indexOf(".") != -1) {
              c = "values." + e
            } else {
              c = "values['" + e + "']"
            }
          }
        }
      }
    }
    if (f) {
      c = "(" + c + f + ")"
    }
    if (h && g.useFormat) {
      d = d ? "," + d : "";
      if (h.substr(0, 5) != "this.") {
        h = "fm." + h + "("
      } else {
        h += "("
      }
    } else {
      return c
    }
    return h + c + d + ")"
  },
  evalTpl: function($) {
    eval($);
    return $
  },
  newLineRe: /\r\n|\r|\n/g,
  aposRe: /[']/g,
  intRe: /^\s*(\d+)\s*$/,
  tagRe: /^([\w-\.\#\$]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\/]\s?[\d\.\+\-\*\/\(\)]+)?$/
}, 0, 0, 0, 0, 0, 0, [Ext.util, "XTemplateCompiler"], function() {
  var a = this.prototype;
  a.fnArgs = "out,values,parent,xindex,xcount,xkey";
  a.callFn = ".call(this," + a.fnArgs + ")"
}));
(Ext.cmd.derive("Ext.XTemplate", Ext.Template, {
  isXTemplate: true,
  emptyObj: {},
  fn: null,
  strict: false,
  apply: function(a, b) {
    return this.applyOut(a, [], b).join("")
  },
  applyOut: function(a, b, d) {
    var f = this,
      c;
    if (!f.fn) {
      c = new Ext.util.XTemplateCompiler({
        useFormat: f.disableFormats !== true,
        definitions: f.definitions,
        strict: f.strict
      });
      f.fn = c.compile(f.html)
    }
    if (f.strict) {
      f.fn(b, a, d || f.emptyObj, 1, 1)
    } else {
      try {
        f.fn(b, a, d || f.emptyObj, 1, 1)
      } catch (g) {}
    }
    return b
  },
  compile: function() {
    return this
  },
  statics: {
    getTpl: function(b, d) {
      var c = b[d],
        a;
      if (c && !c.isTemplate) {
        c = Ext.ClassManager.dynInstantiate("Ext.XTemplate", c);
        if (b.hasOwnProperty(d)) {
          a = b
        } else {
          for (a = b.self.prototype; a && !a.hasOwnProperty(d); a = a.superclass) {}
        }
        a[d] = c;
        c.owner = a
      }
      return c || null
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext, "XTemplate"], 0));
(Ext.cmd.derive("Ext.app.EventDomain", Ext.Base, {
  statics: {
    instances: {}
  },
  isEventDomain: true,
  isInstance: false,
  constructor: function() {
    var a = this;
    if (!a.isInstance) {
      Ext.app.EventDomain.instances[a.type] = a
    }
    a.bus = {};
    a.monitoredClasses = []
  },
  dispatch: function(h, m, k) {
    m = Ext.canonicalEventName(m);
    var l = this,
      j = l.bus,
      n = j[m],
      e, c, b, d, o, g, f, a;
    if (!n) {
      return true
    }
    for (e in n) {
      if (n.hasOwnProperty(e) && l.match(h, e, l.controller)) {
        c = n[e];
        for (b in c) {
          if (c.hasOwnProperty(b)) {
            d = c[b];
            if (d.controller.isActive()) {
              o = d.list;
              g = o.length;
              for (f = 0; f < g; f++) {
                a = o[f];
                if (a.fire.apply(a, k) === false) {
                  return false
                }
              }
            }
          }
        }
      }
    }
    return true
  },
  listen: function(d, m) {
    var v = this,
      l = v.bus,
      g = v.idProperty,
      h = v.monitoredClasses,
      e = h.length,
      k = m.getId(),
      u = (v.type === "component"),
      p = u ? m.getRefMap() : null,
      r, j, s, q, b, c, a, o, n, t, f;
    for (q in d) {
      n = d[q];
      if (u) {
        q = p[q] || q
      }
      if (n) {
        if (g) {
          q = q === "*" ? q : q.substring(1)
        }
        for (t in n) {
          b = null;
          c = n[t];
          a = m;
          t = Ext.canonicalEventName(t);
          o = new Ext.util.Event(m, t);
          if (Ext.isObject(c)) {
            b = c;
            c = b.fn;
            a = b.scope || m;
            delete b.fn;
            delete b.scope
          }
          if (typeof c === "string") {
            c = a[c]
          }
          o.addListener(c, a, b);
          for (r = 0; r < e; ++r) {
            f = h[r].hasListeners;
            if (f) {
              f._incr_(t)
            }
          }
          j = l[t] || (l[t] = {});
          j = j[q] || (j[q] = {});
          s = j[k] || (j[k] = {
            controller: m,
            list: []
          });
          s.list.push(o)
        }
      }
    }
  },
  match: function(c, a) {
    var b = this.idProperty;
    if (b) {
      return a === "*" || c[b] === a
    }
    return false
  },
  monitor: function(c) {
    var b = this,
      a = c.isInstance ? c : c.prototype,
      d = a.doFireEvent;
    b.monitoredClasses.push(c);
    a.doFireEvent = function(g, f) {
      var e = d.apply(this, arguments);
      if (e !== false && !this.isSuspended(g)) {
        e = b.dispatch(this, g, f)
      }
      return e
    }
  },
  unlisten: function(d) {
    var m = this.bus,
      a = d,
      q = this.monitoredClasses,
      k = q.length,
      b, n, r, l, p, e, o, h, g, c, f;
    if (d.isController) {
      a = d.getId()
    }
    for (n in m) {
      n = Ext.canonicalEventName(n);
      if (m.hasOwnProperty(n) && (o = m[n])) {
        for (e in o) {
          b = o[e];
          c = b[a];
          if (c) {
            r = c.list;
            if (r) {
              for (h = 0, l = r.length; h < l; ++h) {
                p = r[h];
                p.clearListeners();
                for (g = 0; g < k; ++g) {
                  f = q[g].hasListeners;
                  if (f) {
                    f._decr_(p.name)
                  }
                }
              }
              delete b[a]
            }
          }
        }
      }
    }
  },
  destroy: function() {
    this.monitoredClasses = this.bus = null;
    this.callParent()
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app, "EventDomain"], 0));
(Ext.cmd.derive("Ext.app.domain.Component", Ext.app.EventDomain, {
  singleton: true,
  type: "component",
  constructor: function() {
    this.callParent();
    this.monitor(Ext.Widget)
  },
  dispatch: function(f, d, c) {
    var b = f.lookupController(false),
      e, a;
    while (b) {
      e = b.compDomain;
      if (e) {
        if (e.dispatch(f, d, c) === false) {
          return false
        }
      }
      a = b.getView();
      b = a ? a.lookupController(true) : null
    }
    return this.callParent(arguments)
  },
  match: function(b, a) {
    return b.is(a)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.domain, "Component"], 0));
(Ext.cmd.derive("Ext.util.ProtoElement", Ext.Base, function() {
  var b = Ext.String.splitWords,
    a = Ext.Array.toMap;
  return {
    isProtoEl: true,
    clsProp: "cls",
    styleProp: "style",
    removedProp: "removed",
    styleIsText: false,
    constructor: function(d) {
      var f = this,
        c, e;
      if (d) {
        Ext.apply(f, d);
        c = f.cls;
        e = f.style;
        delete f.cls
      }
      f.classList = c ? b(c) : [];
      f.classMap = c ? a(f.classList) : {};
      if (e) {
        if (typeof e === "string") {
          f.style = Ext.Element.parseStyles(e)
        } else {
          if (Ext.isFunction(e)) {
            f.styleFn = e;
            delete f.style
          } else {
            f.style = Ext.apply({}, e)
          }
        }
      }
    },
    flush: function() {
      this.flushClassList = [];
      this.removedClasses = {};
      delete this.style;
      delete this.unselectableAttr
    },
    addCls: function(m) {
      if (!m) {
        return this
      }
      var k = this,
        l = (typeof m === "string") ? b(m) : m,
        e = l.length,
        h = k.classList,
        d = k.classMap,
        f = k.flushClassList,
        g = 0,
        j;
      for (; g < e; ++g) {
        j = l[g];
        if (!d[j]) {
          d[j] = true;
          h.push(j);
          if (f) {
            f.push(j);
            delete k.removedClasses[j]
          }
        }
      }
      return k
    },
    hasCls: function(c) {
      return c in this.classMap
    },
    removeCls: function(n) {
      var m = this,
        k = m.classList,
        f = (m.classList = []),
        h = a(b(n)),
        e = k.length,
        d = m.classMap,
        j = m.removedClasses,
        g, l;
      for (g = 0; g < e; ++g) {
        l = k[g];
        if (h[l]) {
          if (j) {
            if (d[l]) {
              j[l] = true;
              Ext.Array.remove(m.flushClassList, l)
            }
          }
          delete d[l]
        } else {
          f.push(l)
        }
      }
      return m
    },
    setStyle: function(f, e) {
      var d = this,
        c = d.style || (d.style = {});
      if (typeof f === "string") {
        if (arguments.length === 1) {
          d.setStyle(Ext.Element.parseStyles(f))
        } else {
          c[f] = e
        }
      } else {
        Ext.apply(c, f)
      }
      return d
    },
    unselectable: function() {
      this.addCls(Ext.dom.Element.unselectableCls);
      if (Ext.isOpera) {
        this.unselectableAttr = true
      }
    },
    writeTo: function(g) {
      var e = this,
        f = e.flushClassList || e.classList,
        d = e.removedClasses,
        c;
      if (e.styleFn) {
        c = Ext.apply({}, e.styleFn());
        Ext.apply(c, e.style)
      } else {
        c = e.style
      }
      g[e.clsProp] = f.join(" ");
      if (c) {
        g[e.styleProp] = e.styleIsText ? Ext.DomHelper.generateStyles(c,
          null, true) : c
      }
      if (d) {
        d = Ext.Object.getKeys(d);
        if (d.length) {
          g[e.removedProp] = d.join(" ")
        }
      }
      if (e.unselectableAttr) {
        g.unselectable = "on"
      }
      return g
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "ProtoElement"], 0));
(Ext.cmd.derive("Ext.dom.CompositeElement", Ext.dom.CompositeElementLite, {
    alternateClassName: "Ext.CompositeElement",
    isLite: false,
    getElement: function(a) {
      return a
    },
    transformElement: function(a) {
      return Ext.get(a)
    }
  }, 0, 0, 0, 0, 0, 0, [Ext.dom, "CompositeElement", Ext, "CompositeElement"],
  0));
(Ext.cmd.derive("Ext.scroll.Scroller", Ext.Evented, {
  factoryConfig: {
    defaultType: "dom"
  },
  isScroller: true,
  config: {
    direction: undefined,
    directionLock: false,
    disabled: null,
    element: undefined,
    indicators: null,
    maxPosition: null,
    maxUserPosition: null,
    minPosition: {
      x: 0,
      y: 0
    },
    minUserPosition: {
      x: 0,
      y: 0
    },
    momentumEasing: null,
    size: null,
    slotSnapSize: {
      x: 0,
      y: 0
    },
    x: true,
    y: true
  },
  statics: {
    create: function(a) {
      return Ext.Factory.scroller(a, Ext.supports.Touch ? "touch" : "dom")
    }
  },
  constructor: function(a) {
    var b = this;
    Ext.Evented.prototype.constructor.call(this, a);
    b.onDomScrollEnd = Ext.Function.createBuffered(b.onDomScrollEnd, 100,
      b)
  },
  destroy: function() {
    this.setElement(null);
    this.onDomScrollEnd = this._partners = this.component = null;
    Ext.Evented.prototype.destroy.call(this)
  },
  addPartner: function(d, b) {
    var c = this,
      e = c._partners || (c._partners = {}),
      a = d._partners || (d._partners = {});
    e[d.getId()] = {
      scroller: d,
      axis: b
    };
    a[c.getId()] = {
      scroller: c,
      axis: b
    }
  },
  applyElement: function(a) {
    var b;
    if (a) {
      if (a.isElement) {
        b = a
      } else {
        b = Ext.get(a)
      }
    }
    return b
  },
  getClientSize: function() {
    var a = this.getElement().dom;
    return {
      x: a.clientWidth,
      y: a.clientHeight
    }
  },
  updateDirectionLock: Ext.emptyFn,
  updateDisabled: Ext.emptyFn,
  updateIndicators: Ext.emptyFn,
  updateMaxPosition: Ext.emptyFn,
  updateMaxUserPosition: Ext.emptyFn,
  updateMinPosition: Ext.emptyFn,
  updateMinUserPosition: Ext.emptyFn,
  updateMomenumEasing: Ext.emptyFn,
  updateSize: Ext.emptyFn,
  updateX: Ext.emptyFn,
  updateY: Ext.emptyFn,
  updateElement: function(a) {
    a.on("scroll", "onDomScroll", this)
  },
  refresh: function() {
    this.fireEvent("refresh", this);
    return this
  },
  removePartner: function(b) {
    var c = this._partners,
      a = b._partners;
    if (c) {
      delete c[b.getId()]
    }
    if (a) {
      delete(a[this.getId()])
    }
  },
  scrollBy: function(c, b, d) {
    var a = this.getPosition();
    if (c) {
      if (c.length) {
        d = b;
        b = c[1];
        c = c[0]
      } else {
        if (typeof c !== "number") {
          d = b;
          b = c.y;
          c = c.x
        }
      }
    }
    c = (typeof c === "number") ? c + a.x : null;
    b = (typeof b === "number") ? b + a.y : null;
    return this.doScrollTo(c, b, d)
  },
  scrollIntoView: function(d, e, b, g) {
    var i = this,
      h = i.getPosition(),
      f, a, j, c = i.getElement();
    if (d) {
      f = Ext.fly(d).getScrollIntoViewXY(c, h.x, h.y);
      a = (e === false) ? h.x : f.x;
      j = f.y;
      if (g) {
        i.on({
          scrollend: "doHighlight",
          scope: i,
          single: true,
          args: [d, g]
        })
      }
      i.doScrollTo(a, j, b)
    }
  },
  isInView: function(c) {
    var d = this,
      a = {
        x: false,
        y: false
      },
      e, f = d.getElement(),
      b;
    if (c && f.contains(c)) {
      b = f.getRegion();
      e = Ext.fly(c).getRegion();
      a.x = e.right > b.left && e.left < b.right;
      a.y = e.bottom > b.top && e.top < b.bottom
    }
    return a
  },
  scrollTo: function(a, d, b) {
    var c;
    if (a) {
      if (a.length) {
        b = d;
        d = a[1];
        a = a[0]
      } else {
        if (typeof a !== "number") {
          b = d;
          d = a.y;
          a = a.x
        }
      }
    }
    if (a < 0 || d < 0) {
      c = this.getMaxPosition();
      if (a < 0) {
        a += c.x
      }
      if (d < 0) {
        d += c.y
      }
    }
    this.doScrollTo(a, d, b)
  },
  updateDirection: function(c) {
    var b = this,
      a, d;
    if (!c) {
      a = b.getX();
      d = b.getY();
      if (a && d) {
        c = (d === "scroll" && a === "scroll") ? "both" : "auto"
      } else {
        if (d) {
          c = "vertical"
        } else {
          if (a) {
            c = "horizontal"
          }
        }
      }
      b._direction = c
    } else {
      if (c === "auto") {
        a = true;
        d = true
      } else {
        if (c === "vertical") {
          a = false;
          d = true
        } else {
          if (c === "horizontal") {
            a = true;
            d = false
          } else {
            if (c === "both") {
              a = "scroll";
              d = "scroll"
            }
          }
        }
      }
      b.setX(a);
      b.setY(d)
    }
  },
  deprecated: {
    "5": {
      methods: {
        getScroller: function() {
          return this
        }
      }
    },
    "5.1.0": {
      methods: {
        scrollToTop: function(a) {
          return this.scrollTo(0, 0, a)
        },
        scrollToEnd: function(a) {
          return this.scrollTo(Infinity, Infinity, a)
        }
      }
    }
  },
  privates: {
    convertX: function(a) {
      return a
    },
    doHighlight: function(b, a) {
      if (a !== true) {
        Ext.fly(b).highlight(a)
      } else {
        Ext.fly(b).highlight()
      }
    },
    fireScrollStart: function(a, d) {
      var c = this,
        b = c.component;
      c.invokePartners("onPartnerScrollStart", a, d);
      if (c.hasListeners.scrollstart) {
        c.fireEvent("scrollstart", c, a, d)
      }
      if (b && b.onScrollStart) {
        b.onScrollStart(a, d)
      }
      Ext.GlobalEvents.fireEvent("scrollstart", c, a, d)
    },
    fireScroll: function(a, d) {
      var c = this,
        b = c.component;
      c.invokePartners("onPartnerScroll", a, d);
      if (c.hasListeners.scroll) {
        c.fireEvent("scroll", c, a, d)
      }
      if (b && b.onScrollMove) {
        b.onScrollMove(a, d)
      }
      Ext.GlobalEvents.fireEvent("scroll", c, a, d)
    },
    fireScrollEnd: function(a, d) {
      var c = this,
        b = c.component;
      c.invokePartners("onPartnerScrollEnd", a, d);
      if (c.hasListeners.scrollend) {
        c.fireEvent("scrollend", c, a, d)
      }
      if (b && b.onScrollEnd) {
        b.onScrollEnd(a, d)
      }
      Ext.GlobalEvents.fireEvent("scrollend", c, a, d)
    },
    initXStyle: function() {
      var b = this.getElement(),
        a = this.getX();
      if (!a) {
        a = "hidden"
      } else {
        if (a === true) {
          a = "auto"
        }
      }
      if (b) {
        b.setStyle("overflow-x", a)
      }
    },
    initYStyle: function() {
      var a = this.getElement(),
        b = this.getY();
      if (!b) {
        b = "hidden"
      } else {
        if (b === true) {
          b = "auto"
        }
      }
      if (a) {
        a.setStyle("overflow-y", b)
      }
    },
    invokePartners: function(f, a, e) {
      var c = this._partners,
        b, d;
      if (!this.suspendSync) {
        for (d in c) {
          b = c[d].scroller;
          b[f](this, a, e)
        }
      }
    },
    suspendPartnerSync: function() {
      this.suspendSync = (this.suspendSync || 0) + 1
    },
    resumePartnerSync: function() {
      if (this.suspendSync) {
        this.suspendSync--
      }
    },
    onDomScroll: function() {
      var c = this,
        b = c.getPosition(),
        a = b.x,
        d = b.y;
      if (!c.isScrolling) {
        c.isScrolling = true;
        c.fireScrollStart(a, d)
      }
      c.fireScroll(a, d);
      c.onDomScrollEnd()
    },
    onDomScrollEnd: function() {
      var c = this,
        b = c.getPosition(),
        a = b.x,
        d = b.y;
      c.isScrolling = false;
      c.trackingScrollLeft = a;
      c.trackingScrollTop = d;
      c.fireScrollEnd(a, d)
    },
    onPartnerScroll: function(c, a, d) {
      var b = c._partners[this.getId()].axis;
      if (b) {
        if (b === "x") {
          d = null
        } else {
          if (b === "y") {
            a = null
          }
        }
      }
      this.doScrollTo(a, d)
    },
    restoreState: function() {
      var b = this,
        a = b.getElement(),
        c;
      if (a) {
        c = a.dom;
        if (b.trackingScrollTop !== undefined) {
          c.scrollTop = b.trackingScrollTop;
          c.scrollLeft = b.trackingScrollLeft
        }
      }
    },
    onPartnerScrollStart: function() {
      this.suspendPartnerSync()
    },
    onPartnerScrollEnd: function() {
      this.resumePartnerSync()
    }
  }
}, 1, 0, 0, 0, ["scroller.scroller"], [
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ]
], [Ext.scroll, "Scroller"], 0));
(Ext.cmd.derive("Ext.fx.easing.Abstract", Ext.Base, {
  config: {
    startTime: 0,
    startValue: 0
  },
  isEasing: true,
  isEnded: false,
  constructor: function(a) {
    this.initConfig(a);
    return this
  },
  applyStartTime: function(a) {
    if (!a) {
      a = Ext.Date.now()
    }
    return a
  },
  updateStartTime: function(a) {
    this.reset()
  },
  reset: function() {
    this.isEnded = false
  },
  getValue: Ext.emptyFn
}, 1, 0, 0, 0, 0, 0, [Ext.fx.easing, "Abstract"], 0));
(Ext.cmd.derive("Ext.fx.easing.Momentum", Ext.fx.easing.Abstract, {
  config: {
    acceleration: 30,
    friction: 0,
    startVelocity: 0
  },
  alpha: 0,
  updateFriction: function(b) {
    var a = Math.log(1 - (b / 10));
    this.theta = a;
    this.alpha = a / this.getAcceleration()
  },
  updateStartVelocity: function(a) {
    this.velocity = a * this.getAcceleration()
  },
  updateAcceleration: function(a) {
    this.velocity = this.getStartVelocity() * a;
    this.alpha = this.theta / a
  },
  getValue: function() {
    return this.getStartValue() - this.velocity * (1 - this.getFrictionFactor()) /
      this.theta
  },
  getFrictionFactor: function() {
    var a = Ext.Date.now() - this.getStartTime();
    return Math.exp(a * this.alpha)
  },
  getVelocity: function() {
    return this.getFrictionFactor() * this.velocity
  }
}, 0, 0, 0, 0, 0, 0, [Ext.fx.easing, "Momentum"], 0));
(Ext.cmd.derive("Ext.fx.easing.Bounce", Ext.fx.easing.Abstract, {
  config: {
    springTension: 0.3,
    acceleration: 30,
    startVelocity: 0
  },
  getValue: function() {
    var b = Ext.Date.now() - this.getStartTime(),
      c = (b / this.getAcceleration()),
      a = c * Math.pow(Math.E, -this.getSpringTension() * c);
    return this.getStartValue() + (this.getStartVelocity() * a)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.fx.easing, "Bounce"], 0));
(Ext.cmd.derive("Ext.fx.easing.BoundMomentum", Ext.fx.easing.Abstract, {
  config: {
    momentum: null,
    bounce: null,
    minMomentumValue: 0,
    maxMomentumValue: 0,
    minVelocity: 0.01,
    startVelocity: 0
  },
  applyMomentum: function(a, b) {
    return Ext.factory(a, Ext.fx.easing.Momentum, b)
  },
  applyBounce: function(a, b) {
    return Ext.factory(a, Ext.fx.easing.Bounce, b)
  },
  updateStartTime: function(a) {
    this.getMomentum().setStartTime(a);
    Ext.fx.easing.Abstract.prototype.updateStartTime.apply(this,
      arguments)
  },
  updateStartVelocity: function(a) {
    this.getMomentum().setStartVelocity(a)
  },
  updateStartValue: function(a) {
    this.getMomentum().setStartValue(a)
  },
  reset: function() {
    this.lastValue = null;
    this.isBouncingBack = false;
    this.isOutOfBound = false;
    return Ext.fx.easing.Abstract.prototype.reset.apply(this, arguments)
  },
  getValue: function() {
    var a = this.getMomentum(),
      j = this.getBounce(),
      e = a.getStartVelocity(),
      f = e > 0 ? 1 : -1,
      g = this.getMinMomentumValue(),
      d = this.getMaxMomentumValue(),
      c = (f == 1) ? d : g,
      h = this.lastValue,
      i, b;
    if (e === 0) {
      return this.getStartValue()
    }
    if (!this.isOutOfBound) {
      i = a.getValue();
      b = a.getVelocity();
      if (Math.abs(b) < this.getMinVelocity()) {
        this.isEnded = true
      }
      if (i >= g && i <= d) {
        return i
      }
      this.isOutOfBound = true;
      j.setStartTime(Ext.Date.now()).setStartVelocity(b).setStartValue(c)
    }
    i = j.getValue();
    if (!this.isEnded) {
      if (!this.isBouncingBack) {
        if (h !== null) {
          if ((f == 1 && i < h) || (f == -1 && i > h)) {
            this.isBouncingBack = true
          }
        }
      } else {
        if (Math.round(i) == c) {
          this.isEnded = true
        }
      }
    }
    this.lastValue = i;
    return i
  }
}, 0, 0, 0, 0, 0, 0, [Ext.fx.easing, "BoundMomentum"], 0));
(Ext.cmd.derive("Ext.fx.easing.Linear", Ext.fx.easing.Abstract, {
  config: {
    duration: 0,
    endValue: 0
  },
  updateStartValue: function(a) {
    this.distance = this.getEndValue() - a
  },
  updateEndValue: function(a) {
    this.distance = a - this.getStartValue()
  },
  getValue: function() {
    var a = Ext.Date.now() - this.getStartTime(),
      b = this.getDuration();
    if (a > b) {
      this.isEnded = true;
      return this.getEndValue()
    } else {
      return this.getStartValue() + ((a / b) * this.distance)
    }
  }
}, 0, 0, 0, 0, ["easing.linear"], 0, [Ext.fx.easing, "Linear"], 0));
(Ext.cmd.derive("Ext.fx.easing.EaseOut", Ext.fx.easing.Linear, {
  config: {
    exponent: 4,
    duration: 1500
  },
  getValue: function() {
    var f = Ext.Date.now() - this.getStartTime(),
      d = this.getDuration(),
      b = this.getStartValue(),
      h = this.getEndValue(),
      a = this.distance,
      c = f / d,
      g = 1 - c,
      e = 1 - Math.pow(g, this.getExponent()),
      i = b + (e * a);
    if (f >= d) {
      this.isEnded = true;
      return h
    }
    return i
  }
}, 0, 0, 0, 0, ["easing.ease-out"], 0, [Ext.fx.easing, "EaseOut"], 0));
(Ext.cmd.derive("Ext.util.translatable.Abstract", Ext.Evented, {
  config: {
    useWrapper: null,
    easing: null,
    easingX: null,
    easingY: null
  },
  x: 0,
  y: 0,
  activeEasingX: null,
  activeEasingY: null,
  isAnimating: false,
  isTranslatable: true,
  constructor: function(a) {
    this.mixins.observable.constructor.call(this, a);
    this.position = {
      x: 0,
      y: 0
    }
  },
  factoryEasing: function(a) {
    return Ext.factory(a, Ext.fx.easing.Linear, null, "easing")
  },
  applyEasing: function(a) {
    if (!this.getEasingX()) {
      this.setEasingX(this.factoryEasing(a))
    }
    if (!this.getEasingY()) {
      this.setEasingY(this.factoryEasing(a))
    }
  },
  applyEasingX: function(a) {
    return this.factoryEasing(a)
  },
  applyEasingY: function(a) {
    return this.factoryEasing(a)
  },
  doTranslate: Ext.emptyFn,
  translate: function(a, c, b) {
    if (b) {
      return this.translateAnimated(a, c, b)
    }
    if (this.isAnimating) {
      this.stopAnimation()
    }
    if (!isNaN(a) && typeof a == "number") {
      this.x = a
    }
    if (!isNaN(c) && typeof c == "number") {
      this.y = c
    }
    this.doTranslate(a, c)
  },
  translateAxis: function(b, d, c) {
    var a, e;
    if (b == "x") {
      a = d
    } else {
      e = d
    }
    return this.translate(a, e, c)
  },
  getPosition: function() {
    var b = this,
      a = b.position;
    a.x = -b.x;
    a.y = -b.y;
    return a
  },
  animate: function(b, a) {
    this.activeEasingX = b;
    this.activeEasingY = a;
    this.isAnimating = true;
    this.lastX = null;
    this.lastY = null;
    Ext.AnimationQueue.start(this.doAnimationFrame, this);
    this.fireEvent("animationstart", this, this.x, this.y);
    return this
  },
  translateAnimated: function(b, h, f) {
    var e = this;
    if (!Ext.isObject(f)) {
      f = {}
    }
    if (e.isAnimating) {
      e.stopAnimation()
    }
    e.callback = f.callback;
    e.callbackScope = f.scope;
    var d = Ext.Date.now(),
      g = f.easing,
      c = (typeof b == "number") ? (f.easingX || g || e.getEasingX() ||
        true) : null,
      a = (typeof h == "number") ? (f.easingY || g || e.getEasingY() ||
        true) : null;
    if (c) {
      c = e.factoryEasing(c);
      c.setStartTime(d);
      c.setStartValue(e.x);
      c.setEndValue(b);
      if ("duration" in f) {
        c.setDuration(f.duration)
      }
    }
    if (a) {
      a = e.factoryEasing(a);
      a.setStartTime(d);
      a.setStartValue(e.y);
      a.setEndValue(h);
      if ("duration" in f) {
        a.setDuration(f.duration)
      }
    }
    return e.animate(c, a)
  },
  doAnimationFrame: function() {
    var e = this,
      c = e.activeEasingX,
      b = e.activeEasingY,
      d = Date.now(),
      a, f;
    if (!e.isAnimating) {
      return
    }
    e.lastRun = d;
    if (c === null && b === null) {
      e.stopAnimation();
      return
    }
    if (c !== null) {
      e.x = a = Math.round(c.getValue());
      if (c.isEnded) {
        e.activeEasingX = null;
        e.fireEvent("axisanimationend", e, "x", a)
      }
    } else {
      a = e.x
    }
    if (b !== null) {
      e.y = f = Math.round(b.getValue());
      if (b.isEnded) {
        e.activeEasingY = null;
        e.fireEvent("axisanimationend", e, "y", f)
      }
    } else {
      f = e.y
    }
    if (e.lastX !== a || e.lastY !== f) {
      e.doTranslate(a, f);
      e.lastX = a;
      e.lastY = f
    }
    e.fireEvent("animationframe", e, a, f)
  },
  stopAnimation: function() {
    var a = this;
    if (!a.isAnimating) {
      return
    }
    a.activeEasingX = null;
    a.activeEasingY = null;
    a.isAnimating = false;
    Ext.AnimationQueue.stop(a.doAnimationFrame, a);
    a.fireEvent("animationend", a, a.x, a.y);
    if (a.callback) {
      a.callback.call(a.callbackScope);
      a.callback = null
    }
  },
  refresh: function() {
    this.translate(this.x, this.y)
  },
  destroy: function() {
    if (this.isAnimating) {
      this.stopAnimation()
    }
    Ext.Evented.prototype.destroy.call(this)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util.translatable, "Abstract"], 0));
(Ext.cmd.derive("Ext.util.translatable.Dom", Ext.util.translatable.Abstract, {
  config: {
    element: null
  },
  applyElement: function(a) {
    if (!a) {
      return
    }
    return Ext.get(a)
  },
  updateElement: function() {
    this.refresh()
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util.translatable, "Dom"], 0));
(Ext.cmd.derive("Ext.util.translatable.CssTransform", Ext.util.translatable.Dom, {
  doTranslate: function(a, c) {
    var b = this.getElement();
    if (!this.destroyed && !b.destroyed) {
      b.translate(a, c)
    }
  },
  destroy: function() {
    var a = this.getElement();
    if (a && !a.destroyed) {
      a.dom.style.webkitTransform = null
    }
    Ext.util.translatable.Dom.prototype.destroy.call(this)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util.translatable, "CssTransform"], 0));
(Ext.cmd.derive("Ext.util.translatable.ScrollPosition", Ext.util.translatable.Dom, {
  type: "scrollposition",
  config: {
    useWrapper: true
  },
  getWrapper: function() {
    var c = this.wrapper,
      b = this.getElement(),
      a;
    if (!c) {
      a = b.getParent();
      if (!a) {
        return null
      }
      if (a.hasCls("x-translatable-hboxfix")) {
        a = a.getParent()
      }
      if (this.getUseWrapper()) {
        c = b.wrap()
      } else {
        c = a
      }
      b.addCls("x-translatable");
      c.addCls("x-translatable-container");
      this.wrapper = c;
      c.on("painted", function() {
        if (!this.isAnimating) {
          this.refresh()
        }
      }, this);
      this.refresh()
    }
    return c
  },
  doTranslate: function(a, d) {
    var c = this.getWrapper(),
      b;
    if (c) {
      b = c.dom;
      if (typeof a == "number") {
        b.scrollLeft = 500000 - a
      }
      if (typeof d == "number") {
        b.scrollTop = 500000 - d
      }
    }
  },
  destroy: function() {
    var b = this,
      a = b.getElement(),
      c = b.wrapper;
    if (c) {
      if (!a.destroyed) {
        if (b.getUseWrapper()) {
          c.doReplaceWith(a)
        }
        a.removeCls("x-translatable")
      }
      if (!c.destroyed) {
        c.removeCls("x-translatable-container");
        c.un("painted", "refresh", b)
      }
      delete b.wrapper;
      delete b._element
    }
    Ext.util.translatable.Dom.prototype.destroy.call(this)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util.translatable, "ScrollPosition"], 0));
(Ext.cmd.derive("Ext.util.translatable.ScrollParent", Ext.util.translatable.Dom, {
  isScrollParent: true,
  applyElement: function(a) {
    var b = Ext.get(a);
    if (b) {
      this.parent = b.parent()
    }
    return b
  },
  doTranslate: function(a, c) {
    var b = this.parent;
    b.setScrollLeft(Math.round(-a));
    b.setScrollTop(Math.round(-c))
  },
  getPosition: function() {
    var c = this,
      a = c.position,
      b = c.parent;
    a.x = b.getScrollLeft();
    a.y = b.getScrollTop();
    return a
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util.translatable, "ScrollParent"], 0));
(Ext.cmd.derive("Ext.util.translatable.CssPosition", Ext.util.translatable.Dom, {
  doTranslate: function(a, c) {
    var b = this.getElement().dom.style;
    if (typeof a == "number") {
      b.left = a + "px"
    }
    if (typeof c == "number") {
      b.top = c + "px"
    }
  },
  destroy: function() {
    var a = this.getElement().dom.style;
    a.left = null;
    a.top = null;
    Ext.util.translatable.Dom.prototype.destroy.call(this)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util.translatable, "CssPosition"], 0));
(Ext.cmd.derive("Ext.util.Translatable", Ext.Base, {
  constructor: function(a) {
    var b = Ext.util.translatable;
    switch (Ext.browser.getPreferredTranslationMethod(a)) {
      case "scrollposition":
        return new b.ScrollPosition(a);
      case "scrollparent":
        return new b.ScrollParent(a);
      case "csstransform":
        return new b.CssTransform(a);
      case "cssposition":
        return new b.CssPosition(a)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "Translatable"], 0));
(Ext.cmd.derive("Ext.scroll.Indicator", Ext.Widget, {
  config: {
    axis: null,
    hideAnimation: true,
    hideDelay: 0,
    scroller: null,
    minLength: 24
  },
  defaultHideAnimation: {
    to: {
      opacity: 0
    },
    duration: 300
  },
  names: {
    x: {
      side: "l",
      getSize: "getHeight",
      setLength: "setWidth",
      translate: "translateX"
    },
    y: {
      side: "t",
      getSize: "getWidth",
      setLength: "setHeight",
      translate: "translateY"
    }
  },
  oppositeAxis: {
    x: "y",
    y: "x"
  },
  cls: "x-scroll-indicator",
  applyHideAnimation: function(a) {
    if (a) {
      a = Ext.mergeIf({
        onEnd: this.onHideAnimationEnd,
        scope: this
      }, this.defaultHideAnimation, a)
    }
    return a
  },
  constructor: function(a) {
    var c = this,
      b;
    Ext.Widget.prototype.constructor.call(this, a);
    b = c.getAxis();
    c.names = c.names[b];
    c.element.addCls(c.cls + " " + c.cls + "-" + b)
  },
  hide: function() {
    var b = this,
      a = b.getHideDelay();
    if (a) {
      b._hideTimer = Ext.defer(b.doHide, a, b)
    } else {
      b.doHide()
    }
  },
  setValue: function(m) {
    var k = this,
      c = k.element,
      j = k.names,
      d = k.getAxis(),
      h = k.getScroller(),
      g = h.getMaxUserPosition()[d],
      n = h.getElementSize()[d],
      i = k.length,
      b = k.getMinLength(),
      a = i,
      f = n - i - k.sizeAdjust,
      o = Math.round,
      l = Math.max,
      e;
    if (m < 0) {
      a = o(l(i + (i * m / n), b));
      e = 0
    } else {
      if (m > g) {
        a = o(l(i - (i * (m - g) / n), b));
        e = f + i - a
      } else {
        e = o(m / g * f)
      }
    }
    k[j.translate](e);
    c[j.setLength](a)
  },
  show: function() {
    var b = this,
      a = b.element,
      c = a.getActiveAnimation();
    if (c) {
      c.end()
    }
    if (!b._inDom) {
      b.getScroller().getElement().appendChild(a);
      b._inDom = true;
      if (!b.size) {
        b.cacheStyles()
      }
    }
    b.refreshLength();
    clearTimeout(b._hideTimer);
    a.setStyle("opacity", "")
  },
  privates: {
    cacheStyles: function() {
      var b = this,
        a = b.element,
        c = b.names;
      b.size = a[c.getSize]();
      b.margin = a.getMargin(c.side)
    },
    doHide: function() {
      var b = this.getHideAnimation(),
        a = this.element;
      if (b) {
        a.animate(b)
      } else {
        a.setStyle("opacity", 0)
      }
    },
    hasOpposite: function() {
      return this.getScroller().isAxisEnabled(this.oppositeAxis[this.getAxis()])
    },
    onHideAnimationEnd: function() {
      this.element.setStyle("opacity", "0")
    },
    refreshLength: function() {
      var i = this,
        h = i.names,
        d = i.getAxis(),
        f = i.getScroller(),
        a = f.getSize()[d],
        j = f.getElementSize()[d],
        g = j / a,
        c = i.margin * 2,
        e = i.hasOpposite() ? (c + i.size) : c,
        b = Math.max(Math.round((j - e) * g), i.getMinLength());
      i.sizeAdjust = e;
      i.length = b;
      i.element[h.setLength](b)
    },
    translateX: function(a) {
      this.element.translate(a)
    },
    translateY: function(a) {
      this.element.translate(0, a)
    }
  }
}, 1, ["scrollindicator"], ["widget", "scrollindicator"], {
  widget: true,
  scrollindicator: true
}, ["widget.scrollindicator"], 0, [Ext.scroll, "Indicator"], 0));
(Ext.cmd.derive("Ext.scroll.TouchScroller", Ext.scroll.Scroller, {
  isTouchScroller: true,
  config: {
    autoRefresh: true,
    bounceEasing: {
      duration: 400
    },
    elementSize: undefined,
    indicators: true,
    fps: "auto",
    maxAbsoluteVelocity: 6,
    momentumEasing: {
      momentum: {
        acceleration: 30,
        friction: 0.5
      },
      bounce: {
        acceleration: 30,
        springTension: 0.3
      },
      minVelocity: 1
    },
    outOfBoundRestrictFactor: 0.5,
    innerElement: null,
    size: undefined,
    slotSnapEasing: {
      duration: 150
    },
    slotSnapOffset: {
      x: 0,
      y: 0
    },
    startMomentumResetTime: 300,
    translatable: {
      translationMethod: "auto",
      useWrapper: false
    },
    refreshOnIdle: true
  },
  cls: "x-scroll-container",
  scrollerCls: "x-scroll-scroller",
  dragStartTime: 0,
  dragEndTime: 0,
  isDragging: false,
  isAnimating: false,
  isMouseEvent: {
    mousedown: 1,
    mousemove: 1,
    mouseup: 1
  },
  listenerMap: {
    touchstart: "onTouchStart",
    touchmove: "onTouchMove",
    dragstart: "onDragStart",
    drag: "onDrag",
    dragend: "onDragEnd"
  },
  refreshCounter: 0,
  constructor: function(a) {
    var b = this,
      c = "onEvent";
    b.elementListeners = {
      touchstart: c,
      touchmove: c,
      dragstart: c,
      drag: c,
      dragend: c,
      scope: b
    };
    b.minPosition = {
      x: 0,
      y: 0
    };
    b.startPosition = {
      x: 0,
      y: 0
    };
    b.position = {
      x: 0,
      y: 0
    };
    b.velocity = {
      x: 0,
      y: 0
    };
    b.isAxisEnabledFlags = {
      x: false,
      y: false
    };
    b.flickStartPosition = {
      x: 0,
      y: 0
    };
    b.flickStartTime = {
      x: 0,
      y: 0
    };
    b.lastDragPosition = {
      x: 0,
      y: 0
    };
    b.dragDirection = {
      x: 0,
      y: 0
    };
    Ext.scroll.Scroller.prototype.constructor.call(this, a);
    b.refreshAxes()
  },
  applyRefreshOnIdle: function(b, a) {
    var c = this;
    if (b) {
      Ext.GlobalEvents.on("idle", c.onIdle, c)
    } else {
      if (a) {
        Ext.GlobalEvents.un("idle", c.onIdle, c)
      }
    }
    return b
  },
  applyBounceEasing: function(b) {
    var a = Ext.fx.easing.EaseOut;
    return {
      x: Ext.factory(b, a),
      y: Ext.factory(b, a)
    }
  },
  applyElementSize: function(b) {
    var c = this.getElement(),
      d, a, e;
    if (!c) {
      return null
    }
    d = c.dom;
    if (!d) {
      return
    }
    if (b == null) {
      a = d.clientWidth;
      e = d.clientHeight
    } else {
      a = b.x;
      e = b.y
    }
    return {
      x: a,
      y: e
    }
  },
  applyIndicators: function(f, c) {
    var e = this,
      b, d, a, g;
    if (f) {
      if (f === true) {
        b = d = {}
      } else {
        a = f.x;
        g = f.y;
        if (a || g) {
          b = (a == null || a === true) ? {} : a;
          d = (a == null || g === true) ? {} : g
        } else {
          b = d = f
        }
      }
      if (c) {
        if (b) {
          c.x.setConfig(b)
        } else {
          c.x.destroy();
          c.x = null
        }
        if (d) {
          c.y.setConfig(d)
        } else {
          c.y.destroy();
          c.y = null
        }
        f = c
      } else {
        f = {
          x: null,
          y: null
        };
        if (b) {
          f.x = new Ext.scroll.Indicator(Ext.applyIf({
            axis: "x",
            scroller: e
          }, b))
        }
        if (d) {
          f.y = new Ext.scroll.Indicator(Ext.applyIf({
            axis: "y",
            scroller: e
          }, d))
        }
      }
    } else {
      if (c) {
        if (c.x) {
          c.x.destroy()
        }
        if (c.y) {
          c.y.destroy()
        }
        c.x = c.y = null
      }
    }
    return f
  },
  applyMomentumEasing: function(b) {
    var a = Ext.fx.easing.BoundMomentum;
    return {
      x: Ext.factory(b, a),
      y: Ext.factory(b, a)
    }
  },
  applyInnerElement: function(a) {
    if (a && !a.isElement) {
      a = Ext.get(a)
    }
    return a
  },
  applySize: function(b) {
    var c = this.getElement(),
      e, d, a, f;
    if (typeof b === "number") {
      a = b;
      f = b
    } else {
      if (b) {
        a = b.x;
        f = b.y
      }
    }
    if (c && (a == null || f == null)) {
      e = c.dom;
      d = this.getInnerElement().dom;
      if (a == null) {
        a = Math.max(d.scrollWidth, e.clientWidth)
      }
      if (f == null) {
        f = Math.max(d.scrollHeight, e.clientHeight)
      }
    }
    return {
      x: a,
      y: f
    }
  },
  applySlotSnapOffset: function(a) {
    if (typeof a === "number") {
      a = {
        x: a,
        y: a
      }
    }
    return a
  },
  applySlotSnapSize: function(a) {
    if (typeof a === "number") {
      a = {
        x: a,
        y: a
      }
    }
    return a
  },
  applySlotSnapEasing: function(b) {
    var a = Ext.fx.easing.EaseOut;
    return {
      x: Ext.factory(b, a),
      y: Ext.factory(b, a)
    }
  },
  applyTranslatable: function(b, a) {
    return Ext.factory(b, Ext.util.Translatable, a)
  },
  destroy: function() {
    var c = this,
      b = c.getElement(),
      d = c.getInnerElement(),
      a = c.sizeMonitors;
    if (a) {
      a.element.destroy();
      a.container.destroy()
    }
    if (b && !b.destroyed) {
      b.removeCls(c.cls)
    }
    if (d && !d.destroyed) {
      d.removeCls(c.scrollerCls)
    }
    if (c._isWrapped) {
      if (!b.destroyed) {
        c.unwrapContent()
      }
      d.destroy();
      if (c.FixedHBoxStretching) {
        d.parent().destroy()
      }
    }
    c.setElement(null);
    c.setInnerElement(null);
    c.setIndicators(null);
    Ext.GlobalEvents.un("idle", c.onIdle, c);
    Ext.destroy(c.getTranslatable());
    Ext.scroll.Scroller.prototype.destroy.call(this)
  },
  getPosition: function() {
    return this.position
  },
  refresh: function(a, b) {
    ++this.refreshCounter;
    if (a) {
      this.doRefresh(b)
    }
  },
  updateAutoRefresh: function(a) {
    this.toggleResizeListeners(a)
  },
  updateBounceEasing: function(a) {
    this.getTranslatable().setEasingX(a.x).setEasingY(a.y)
  },
  updateElementSize: function() {
    if (!this.isConfiguring) {
      this.refreshAxes()
    }
  },
  updateDisabled: function(a) {
    if (!this.isConfiguring) {
      if (a) {
        this.detachListeners()
      } else {
        this.attachListeners()
      }
    }
  },
  updateElement: function(b, a) {
    var d = this,
      e = d.getInnerElement(),
      f = this.FixedHBoxStretching,
      c;
    if (!e) {
      e = b.dom.firstChild;
      if (f && e) {
        e = e.dom.firstChild
      }
      if (!e || e.nodeType !== 1 || !Ext.fly(e).hasCls(d.scrollerCls)) {
        e = d.wrapContent(b)
      }
      d.setInnerElement(e)
    }
    if (!f) {
      b.addCls(d.cls)
    }
    if (d.isConfiguring) {
      if (!d.getTranslatable().isScrollParent) {
        c = d.elementListeners;
        c.mousewheel = "onMouseWheel";
        c.scroll = {
          fn: "onElementScroll",
          delegated: false,
          scope: d
        }
      }
    }
    if (!d.getDisabled()) {
      d.attachListeners()
    }
    if (!d.isConfiguring) {
      if (d.getAutoRefresh()) {
        d.toggleResizeListeners(true)
      }
      d.setSize(null);
      d.setElementSize(null)
    }
    Ext.scroll.Scroller.prototype.updateElement.call(this, b, a)
  },
  updateFps: function(a) {
    if (a !== "auto") {
      this.getTranslatable().setFps(a)
    }
  },
  updateMaxUserPosition: function() {
    this.snapToBoundary()
  },
  updateMinUserPosition: function() {
    this.snapToBoundary()
  },
  updateInnerElement: function(a) {
    if (a) {
      a.addCls(this.scrollerCls)
    }
    this.getTranslatable().setElement(a)
  },
  updateSize: function() {
    if (!this.isConfiguring) {
      this.refreshAxes()
    }
  },
  updateTranslatable: function(a) {
    a.setElement(this.getInnerElement());
    a.on({
      animationframe: "onAnimationFrame",
      animationend: "onAnimationEnd",
      scope: this
    })
  },
  updateX: function() {
    if (!this.isConfiguring) {
      this.refreshAxes()
    }
  },
  updateY: function() {
    if (!this.isConfiguring) {
      this.refreshAxes()
    }
  },
  privates: {
    attachListeners: function() {
      this.getElement().on(this.elementListeners)
    },
    constrainX: function(a) {
      return Math.min(this.getMaxPosition().x, Math.max(a, 0))
    },
    constrainY: function(a) {
      return Math.min(this.getMaxPosition().y, Math.max(a, 0))
    },
    convertEasingConfig: function(a) {
      return a
    },
    detachListeners: function() {
      this.getElement().un(this.elementListeners)
    },
    doRefresh: function(b) {
      var d = this,
        c, a;
      if (d.refreshCounter && d.getElement()) {
        d.stopAnimation();
        d.getTranslatable().refresh();
        if (b) {
          c = b.size;
          a = b.elementSize;
          if (c) {
            d.setSize(c)
          }
          if (a) {
            d.setElementSize(a)
          }
        } else {
          d.setSize(null);
          d.setElementSize(null)
        }
        d.fireEvent("refresh", d);
        d.refreshCounter = 0
      }
    },
    doScrollTo: function(j, i, b, f) {
      var h = this,
        g = h.isDragging,
        a;
      if (h.destroyed || !h.getElement()) {
        return h
      }
      f = f || h.isDragging;
      var k = h.getTranslatable(),
        c = h.position,
        l = false,
        e, d;
      if (!g || h.isAxisEnabled("x")) {
        if (isNaN(j) || typeof j !== "number") {
          j = c.x
        } else {
          if (!f) {
            j = h.constrainX(j)
          }
          if (c.x !== j) {
            c.x = j;
            l = true
          }
        }
        e = h.convertX(-j)
      }
      if (!g || h.isAxisEnabled("y")) {
        if (isNaN(i) || typeof i !== "number") {
          i = c.y
        } else {
          if (!f) {
            i = h.constrainY(i)
          }
          if (c.y !== i) {
            c.y = i;
            l = true
          }
        }
        d = -i
      }
      if (l) {
        if (b) {
          a = function() {
            h.onScroll()
          };
          if (b === true) {
            b = {
              callback: a
            }
          } else {
            if (b.callback) {
              b.callback = Ext.Function.createSequence(b.callback, a)
            } else {
              b.callback = a
            }
          }
          k.translateAnimated(e, d, b)
        } else {
          k.translate(e, d);
          h.onScroll()
        }
      } else {
        if (b && b.callback) {
          b.callback()
        }
      }
      return h
    },
    getAnimationEasing: function(h, k) {
      if (!this.isAxisEnabled(h)) {
        return null
      }
      var m = this,
        g = m.position[h],
        d = m.getMinUserPosition()[h],
        j = m.getMaxUserPosition()[h],
        b = m.getMaxAbsoluteVelocity(),
        f = null,
        c = m.dragEndTime,
        i = k.flick.velocity[h],
        n = h === "x",
        a, l;
      if (g < d) {
        f = d
      } else {
        if (g > j) {
          f = j
        }
      }
      if (n) {
        g = m.convertX(g);
        f = m.convertX(f)
      }
      if (f !== null) {
        l = m.getBounceEasing()[h];
        l.setConfig({
          startTime: c,
          startValue: -g,
          endValue: -f
        });
        return l
      }
      if (i === 0) {
        return null
      }
      if (i < -b) {
        i = -b
      } else {
        if (i > b) {
          i = b
        }
      }
      if (Ext.browser.is.IE) {
        i *= 2
      }
      l = m.getMomentumEasing()[h];
      a = {
        startTime: c,
        startValue: -g,
        startVelocity: i * 1.5,
        minMomentumValue: -j,
        maxMomentumValue: 0
      };
      if (n) {
        m.convertEasingConfig(a)
      }
      l.setConfig(a);
      return l
    },
    getSnapPosition: function(c) {
      var d = this,
        h = d.getSlotSnapSize()[c],
        e = null,
        a, g, f, b;
      if (h !== 0 && d.isAxisEnabled(c)) {
        a = d.position[c];
        g = d.getSlotSnapOffset()[c];
        f = d.getMaxUserPosition()[c];
        b = Math.floor((a - g) % h);
        if (b !== 0) {
          if (a !== f) {
            if (Math.abs(b) > h / 2) {
              e = Math.min(f, a + ((b > 0) ? h - b : b - h))
            } else {
              e = a - b
            }
          } else {
            e = a - b
          }
        }
      }
      return e
    },
    hideIndicators: function() {
      var c = this,
        d = c.getIndicators(),
        a, b;
      if (d) {
        if (c.isAxisEnabled("x")) {
          a = d.x;
          if (a) {
            a.hide()
          }
        }
        if (c.isAxisEnabled("y")) {
          b = d.y;
          if (b) {
            b.hide()
          }
        }
      }
    },
    isAxisEnabled: function(a) {
      this.getX();
      this.getY();
      return this.isAxisEnabledFlags[a]
    },
    onAnimationEnd: function() {
      this.snapToBoundary();
      this.onScrollEnd()
    },
    onAnimationFrame: function(c, b, d) {
      var a = this.position;
      a.x = this.convertX(-b);
      a.y = -d;
      this.onScroll()
    },
    onAxisDrag: function(d, p) {
      if (!this.isAxisEnabled(d)) {
        return
      }
      var q = this,
        k = q.flickStartPosition,
        r = q.flickStartTime,
        i = q.lastDragPosition,
        m = q.dragDirection,
        a = q.position[d],
        n = q.getMinUserPosition()[d],
        o = q.getMaxUserPosition()[d],
        g = q.startPosition[d],
        j = i[d],
        l = g - p,
        h = m[d],
        f = q.getOutOfBoundRestrictFactor(),
        b = q.getStartMomentumResetTime(),
        c = Ext.Date.now(),
        e;
      if (l < n) {
        l *= f
      } else {
        if (l > o) {
          e = l - o;
          l = o + e * f
        }
      }
      if (l > j) {
        m[d] = 1
      } else {
        if (l < j) {
          m[d] = -1
        }
      }
      if ((h !== 0 && (m[d] !== h)) || (c - r[d]) > b) {
        k[d] = a;
        r[d] = c
      }
      i[d] = l
    },
    onDomScroll: function() {
      var b = this,
        c, a;
      if (b.getTranslatable().isScrollParent) {
        c = b.getElement().dom;
        a = b.position;
        a.x = c.scrollLeft;
        a.y = c.scrollTop
      }
      Ext.scroll.Scroller.prototype.onDomScroll.call(this)
    },
    onDrag: function(c) {
      var a = this,
        b = a.lastDragPosition;
      if (!a.isDragging) {
        return
      }
      a.onAxisDrag("x", a.convertX(c.deltaX));
      a.onAxisDrag("y", c.deltaY);
      a.doScrollTo(b.x, b.y)
    },
    onDragEnd: function(d) {
      var c = this,
        b, a;
      if (!c.isDragging) {
        return
      }
      c.dragEndTime = Ext.Date.now();
      c.onDrag(d);
      c.isDragging = false;
      b = c.getAnimationEasing("x", d);
      a = c.getAnimationEasing("y", d);
      if (b || a) {
        c.getTranslatable().animate(b, a)
      } else {
        c.onScrollEnd()
      }
    },
    onDragStart: function(l) {
      var m = this,
        p = m.getDirection(),
        g = l.absDeltaX,
        f = l.absDeltaY,
        k = m.getDirectionLock(),
        i = m.startPosition,
        d = m.flickStartPosition,
        j = m.flickStartTime,
        h = m.lastDragPosition,
        c = m.position,
        b = m.dragDirection,
        o = c.x,
        n = c.y,
        a = Ext.Date.now();
      m.isDragging = true;
      if (k && p !== "both") {
        if ((p === "horizontal" && g > f) || (p === "vertical" && f > g)) {
          l.stopPropagation()
        } else {
          m.isDragging = false;
          return
        }
      }
      h.x = o;
      h.y = n;
      d.x = o;
      d.y = n;
      i.x = o;
      i.y = n;
      j.x = a;
      j.y = a;
      b.x = 0;
      b.y = 0;
      m.dragStartTime = a;
      m.isDragging = true;
      m.onScrollStart()
    },
    onElementResize: function(a, b) {
      this.refresh(true, {
        elementSize: {
          x: b.width,
          y: b.height
        }
      })
    },
    onElementScroll: function(a, b) {
      b.scrollTop = b.scrollLeft = 0
    },
    onEvent: function(b) {
      var a = this,
        c = b.browserEvent;
      if ((!a.self.isTouching || a.isTouching) && ((!a.getTranslatable().isScrollParent) ||
          (!a.isMouseEvent[c.type] && c.pointerType !== "mouse")) && (a.getY() ||
          a.getX())) {
        a[a.listenerMap[b.type]](b)
      }
    },
    onIdle: function() {
      this.doRefresh()
    },
    onInnerElementResize: function(a, b) {
      this.refresh(true, {
        size: {
          x: b.width,
          y: b.height
        }
      })
    },
    onMouseWheel: function(j) {
      var k = this,
        m = j.getWheelDeltas(),
        d = -m.x,
        b = -m.y,
        g = k.position,
        f = k.getMaxUserPosition(),
        a = k.getMinUserPosition(),
        l = Math.max,
        c = Math.min,
        i = l(c(g.x + d, f.x), a.x),
        h = l(c(g.y + b, f.y), a.y);
      d = i - g.x;
      b = h - g.y;
      if (!d && !b) {
        return
      }
      j.stopEvent();
      k.onScrollStart();
      k.scrollBy(d, b);
      k.onScroll();
      k.onScrollEnd()
    },
    onPartnerScrollEnd: function() {
      this.hideIndicators()
    },
    onPartnerScrollStart: function() {
      this.showIndicators()
    },
    onScroll: function() {
      var e = this,
        c = e.position,
        b = c.x,
        g = c.y,
        f = e.getIndicators(),
        a, d;
      if (f) {
        if (e.isAxisEnabled("x")) {
          a = f.x;
          if (a) {
            a.setValue(b)
          }
        }
        if (e.isAxisEnabled("y")) {
          d = f.y;
          if (d) {
            d.setValue(g)
          }
        }
      }
      e.fireScroll(b, g)
    },
    onScrollEnd: function() {
      var b = this,
        a = b.position;
      if (!b.isTouching && !b.snapToSlot()) {
        b.hideIndicators();
        Ext.isScrolling = false;
        b.fireScrollEnd(a.x, a.y)
      }
    },
    onScrollStart: function() {
      var b = this,
        a = b.position;
      b.showIndicators();
      Ext.isScrolling = true;
      b.fireScrollStart(a.x, a.y)
    },
    onTouchEnd: function() {
      var a = this;
      a.isTouching = a.self.isTouching = false;
      if (!a.isDragging && a.snapToSlot()) {
        a.onScrollStart()
      }
    },
    onTouchMove: function(a) {
      a.preventDefault()
    },
    onTouchStart: function() {
      var a = this;
      a.isTouching = a.self.isTouching = true;
      Ext.getDoc().on({
        touchend: "onTouchEnd",
        scope: a,
        single: true
      });
      a.stopAnimation()
    },
    refreshAxes: function() {
      var e = this,
        c = e.isAxisEnabledFlags,
        k = e.getSize(),
        j = e.getElementSize(),
        i = e.getIndicators(),
        b, a, h, g, d, f;
      if (!k || !j) {
        return
      }
      b = Math.max(0, k.x - j.x);
      a = Math.max(0, k.y - j.y);
      h = e.getX();
      g = e.getY();
      e.setMaxPosition({
        x: b,
        y: a
      });
      if (h === true || h === "auto") {
        c.x = !!b
      } else {
        if (h === false) {
          c.x = false;
          d = i && i.x;
          if (d) {
            d.hide()
          }
        } else {
          if (h === "scroll") {
            c.x = true
          }
        }
      }
      if (g === true || g === "auto") {
        c.y = !!a
      } else {
        if (g === false) {
          c.y = false;
          f = i && i.y;
          if (f) {
            f.hide()
          }
        } else {
          if (g === "scroll") {
            c.y = true
          }
        }
      }
      e.setMaxUserPosition({
        x: c.x ? b : 0,
        y: c.y ? a : 0
      });
      if (Ext.supports.touchScroll === 1) {
        e.initXStyle();
        e.initYStyle()
      }
    },
    showIndicators: function() {
      var c = this,
        d = c.getIndicators(),
        a, b;
      if (d) {
        if (c.isAxisEnabled("x")) {
          a = d.x;
          if (a) {
            a.show()
          }
        }
        if (c.isAxisEnabled("y")) {
          b = d.y;
          if (b) {
            b.show()
          }
        }
      }
    },
    snapToBoundary: function() {
      if (this.isConfiguring) {
        return
      }
      var h = this,
        g = h.position,
        c = h.getMinUserPosition(),
        f = h.getMaxUserPosition(),
        e = c.x,
        d = c.y,
        b = f.x,
        a = f.y,
        j = Math.round(g.x),
        i = Math.round(g.y);
      if (j < e) {
        j = e
      } else {
        if (j > b) {
          j = b
        }
      }
      if (i < d) {
        i = d
      } else {
        if (i > a) {
          i = a
        }
      }
      h.doScrollTo(j, i)
    },
    snapToSlot: function() {
      var a = this,
        c = a.getSnapPosition("x"),
        b = a.getSnapPosition("y"),
        d = a.getSlotSnapEasing();
      if (c !== null || b !== null) {
        a.doScrollTo(c, b, {
          easingX: d.x,
          easingY: d.y
        });
        return true
      }
      return false
    },
    stopAnimation: function() {
      this.getTranslatable().stopAnimation()
    },
    toggleResizeListeners: function(a) {
      var c = this,
        b = c.getElement(),
        d = a ? "on" : "un";
      if (b) {
        b[d]("resize", "onElementResize", c);
        c.getInnerElement()[d]("resize", "onInnerElementResize", c)
      }
    },
    unwrapContent: function() {
      var a = this.getInnerElement().dom,
        b = this.getElement().dom,
        c;
      while ((c = a.firstChild)) {
        b.insertBefore(c, a)
      }
    },
    wrapContent: function(a) {
      var b = document.createElement("div"),
        c = a.dom,
        d;
      while (d = c.lastChild) {
        b.insertBefore(d, b.firstChild)
      }
      c.appendChild(b);
      this.setInnerElement(b);
      this._isWrapped = true;
      return this.getInnerElement()
    }
  }
}, 1, 0, 0, 0, ["scroller.touch"], 0, [Ext.scroll, "TouchScroller"], 0));
(Ext.cmd.derive("Ext.scroll.DomScroller", Ext.scroll.Scroller, {
  isDomScroller: true,
  _spacerCls: "x-domscroller-spacer",
  getMaxPosition: function() {
    var b = this.getElement(),
      a = 0,
      d = 0,
      c;
    if (b && !b.destroyed) {
      c = b.dom;
      a = c.scrollWidth - c.clientWidth;
      d = c.scrollHeight - c.clientHeight
    }
    return {
      x: a,
      y: d
    }
  },
  getMaxUserPosition: function() {
    var c = this,
      b = c.getElement(),
      a = 0,
      e = 0,
      d;
    if (b && !b.destroyed) {
      d = b.dom;
      if (c.getX()) {
        a = d.scrollWidth - d.clientWidth
      }
      if (c.getY()) {
        e = d.scrollHeight - d.clientHeight
      }
    }
    return {
      x: a,
      y: e
    }
  },
  getPosition: function() {
    var c = this.getElement(),
      b = 0,
      d = 0,
      a;
    if (c && !c.destroyed) {
      a = this.getElementScroll(c);
      b = a.left;
      d = a.top
    }
    return {
      x: b,
      y: d
    }
  },
  getSize: function() {
    var b = this.getElement(),
      a, c;
    if (b && !b.destroyed) {
      c = b.dom;
      a = {
        x: c.scrollWidth,
        y: c.scrollHeight
      }
    } else {
      a = {
        x: 0,
        y: 0
      }
    }
    return a
  },
  setSize: function(d) {
    var e = this,
      c = e.getElement(),
      b, a, f;
    if (c) {
      b = e.getSpacer();
      if (d == null) {
        b.hide()
      } else {
        if (typeof d === "number") {
          a = d;
          f = d
        } else {
          a = d.x || 0;
          f = d.y || 0
        }
        if (a > 0) {
          a -= 1
        }
        if (f > 0) {
          f -= 1
        }
        e.setSpacerXY(b, a, f);
        b.show()
      }
    }
  },
  updateElement: function(b, a) {
    this.initXStyle();
    this.initYStyle();
    Ext.scroll.Scroller.prototype.updateElement.call(this, b, a)
  },
  updateX: function(a) {
    this.initXStyle()
  },
  updateY: function(a) {
    this.initYStyle()
  },
  privates: {
    doScrollTo: function(h, g, a) {
      var f = this,
        c = f.getElement(),
        d, b, i, j, e;
      if (c && !c.destroyed) {
        b = this.getElement().dom;
        j = (h === Infinity);
        e = (g === Infinity);
        if (j || e) {
          d = f.getMaxPosition();
          if (j) {
            h = d.x
          }
          if (e) {
            g = d.y
          }
        }
        h = f.convertX(h);
        if (a) {
          i = {};
          if (g != null) {
            i.scrollTop = g
          }
          if (h != null) {
            i.scrollLeft = h
          }
          c.animate(Ext.mergeIf({
            to: {
              scrollTop: g,
              scrollLeft: h
            }
          }, a))
        } else {
          if (g != null) {
            b.scrollTop = g
          }
          if (h != null) {
            b.scrollLeft = h
          }
        }
      }
    },
    getElementScroll: function(a) {
      return a.getScroll()
    },
    getSpacer: function() {
      var c = this,
        a = c._spacer,
        b;
      if (!a) {
        b = c.getElement();
        a = c._spacer = b.createChild({
          cls: c._spacerCls
        });
        a.setVisibilityMode(2);
        b.position()
      }
      return a
    },
    setSpacerXY: function(b, a, c) {
      b.setLocalXY(a, c)
    },
    stopAnimation: function() {
      var a = this.getElement().getActiveAnimation();
      if (a) {
        a.end()
      }
    }
  }
}, 0, 0, 0, 0, ["scroller.dom"], 0, [Ext.scroll, "DomScroller"], 0));
(Ext.cmd.derive("Ext.util.Floating", Ext.Base, {
  mixinId: "floating",
  focusOnToFront: true,
  shadow: "sides",
  animateShadow: false,
  constrain: false,
  config: {
    activeCounter: 0,
    alwaysOnTop: false
  },
  preventDefaultAlign: false,
  _visModeMap: {
    visibility: 1,
    display: 2,
    offsets: 3
  },
  constructor: function() {
    var d = this,
      c = d.el,
      e = d.shadow,
      a, b;
    if (e) {
      b = {
        mode: (e === true) ? "sides" : e
      };
      a = d.shadowOffset;
      if (a) {
        b.offset = a
      }
      b.animate = d.animateShadow;
      b.fixed = d.fixed;
      c.enableShadow(b, false)
    }
    if (d.shim || Ext.useShims) {
      c.enableShim({
        fixed: d.fixed
      }, false)
    }
    c.setVisibilityMode(d._visModeMap[d.hideMode]);
    d.el.on({
      mousedown: d.onMouseDown,
      scope: d,
      capture: true
    });
    d.registerWithOwnerCt();
    d.initHierarchyEvents()
  },
  alignTo: function(c, a, e, b) {
    var d = this;
    if (!d._lastAlignToEl) {
      Ext.on("scroll", d.onAlignToScroll, d)
    }
    d._lastAlignToEl = c;
    d._lastAlignToPos = a;
    d.mixins.positionable.alignTo.call(d, c, a, e, b)
  },
  initFloatConstrain: function() {
    var a = this,
      b = a.floatParent;
    if ((a.constrain || a.constrainHeader) && !a.constrainTo) {
      a.constrainTo = b ? b.getTargetEl() : a.container
    }
  },
  initHierarchyEvents: function() {
    var b = this,
      a = this.syncHidden;
    if (!b.hasHierarchyEventListeners) {
      b.mon(Ext.GlobalEvents, {
        hide: a,
        collapse: a,
        show: a,
        expand: a,
        added: a,
        scope: b
      });
      b.hasHierarchyEventListeners = true
    }
  },
  registerWithOwnerCt: function() {
    var c = this,
      b = c.ownerCt,
      a = c.zIndexParent;
    if (a) {
      a.unregisterFloatingItem(c)
    }
    a = c.zIndexParent = c.up("[floating]");
    c.floatParent = b || a;
    c.initFloatConstrain();
    delete c.ownerCt;
    if (a) {
      a.registerFloatingItem(c)
    } else {
      Ext.WindowManager.register(c)
    }
  },
  onMouseDown: function(g) {
    var c = this,
      a = c.focusTask,
      b = g.parentEvent,
      d = b && b.type === "touchstart",
      f, h, i;
    if (c.floating && (!a || !a.id)) {
      f = g.target;
      h = c.el.dom;
      while (!d && f && f !== h) {
        if (Ext.fly(f).isFocusable()) {
          d = true
        }
        f = f.parentNode
      }
      i = Ext.WindowManager.getActive() === c && (f === h || d);
      if (!i) {
        c.toFront(d)
      }
    }
  },
  onBeforeFloatLayout: function() {
    this.el.preventSync = true
  },
  onAfterFloatLayout: function() {
    var a = this.el;
    if (a.shadow || a.shim) {
      a.setUnderlaysVisible(true);
      a.syncUnderlays()
    }
  },
  syncHidden: function() {
    var c = this,
      d = c.hidden || !c.rendered,
      a = c.hierarchicallyHidden = c.isHierarchicallyHidden(),
      b = c.pendingShow;
    if (d !== a) {
      if (a) {
        c.hide();
        c.pendingShow = true
      } else {
        if (b) {
          delete c.pendingShow;
          if (b.length) {
            c.show.apply(c, b)
          } else {
            c.show()
          }
        }
      }
    }
  },
  setZIndex: function(a) {
    var b = this;
    b.el.setZIndex(a);
    a += 10;
    if (b.floatingDescendants) {
      a = Math.floor(b.floatingDescendants.setBase(a) / 100) * 100 +
        10000
    }
    return a
  },
  doConstrain: function(a) {
    var b = this,
      c = b.calculateConstrainedPosition(a, null, true);
    if (c) {
      b.setPosition(c)
    }
  },
  updateActiveCounter: function(a) {
    var b = this.zIndexParent;
    if (b && this.bringParentToFront !== false) {
      b.setActiveCounter(++Ext.ZIndexManager.activeCounter)
    }
    b = this.zIndexManager;
    if (b) {
      b.onComponentUpdate(this)
    }
  },
  updateAlwaysOnTop: function(a) {
    var b = this.zIndexManager;
    if (b) {
      b.onComponentUpdate(this)
    }
  },
  toFront: function(b) {
    var a = this;
    if (a.zIndexManager.bringToFront(a, b || !a.focusOnToFront)) {
      if (a.hasListeners.tofront) {
        a.fireEvent("tofront", a, a.el.getZIndex())
      }
    }
    return a
  },
  setActive: function(d, b) {
    var c = this,
      a;
    if (d) {
      if (c.el.shadow && !c.maximized) {
        c.el.enableShadow(null, true)
      }
      if (b) {
        a = Ext.ComponentManager.getActiveComponent();
        if (!a || !a.up(c)) {
          c.focus()
        }
      }
      c.fireEvent("activate", c)
    } else {
      c.fireEvent("deactivate", c)
    }
  },
  toBack: function() {
    this.zIndexManager.sendToBack(this);
    return this
  },
  center: function() {
    var a = this,
      b;
    if (a.isVisible()) {
      b = a.getAlignToXY(a.container, "c-c");
      a.setPagePosition(b)
    } else {
      a.needsCenter = true
    }
    return a
  },
  onFloatShow: function() {
    if (this.needsCenter) {
      this.center()
    }
    delete this.needsCenter;
    if (this.toFrontOnShow) {
      this.toFront()
    }
  },
  fitContainer: function(c) {
    var f = this,
      e = f.floatParent,
      b = e ? e.getTargetEl() : f.container,
      a = b.getViewSize(),
      d = e || (b.dom !== document.body) ? [0, 0] : b.getXY();
    a.x = d[0];
    a.y = d[1];
    f.setBox(a, c)
  },
  privates: {
    onFloatDestroy: function() {
      this.clearAlignEl()
    },
    clearAlignEl: function() {
      var a = this;
      if (a._lastAlignToEl) {
        Ext.un("scroll", a.onAlignToScroll, a);
        a._lastAlignPos = a._lastAlignToEl = null
      }
    },
    onAlignToScroll: function(a) {
      var c = this,
        b = c._lastAlignToEl,
        d;
      if (b && !a.getElement().contains(c.el)) {
        d = b.isElement ? b.dom : b;
        if (d && !Ext.isGarbage(d)) {
          c.alignTo(b, c._lastAlignToPos)
        } else {
          c.clearAlignEl()
        }
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "Floating"], 0));
(Ext.cmd.derive("Ext.util.ElementContainer", Ext.Base, {
  mixinId: "elementCt",
  config: {
    childEls: {
      $value: {},
      cached: true,
      lazy: true,
      merge: function(f, a, e, d) {
        var c = a ? Ext.Object.chain(a) : {},
          b, g;
        if (f instanceof Array) {
          for (b = f.length; b--;) {
            g = f[b];
            if (!d || !(g in c)) {
              if (typeof g === "string") {
                c[g] = {
                  name: g,
                  itemId: g
                }
              } else {
                c[g.name] = g
              }
            }
          }
        } else {
          if (f) {
            if (f.constructor === Object) {
              for (b in f) {
                if (!d || !(b in c)) {
                  g = f[b];
                  if (g === true) {
                    c[b] = {
                      itemId: b
                    }
                  } else {
                    if (typeof g === "string") {
                      c[b] = {
                        itemId: g
                      }
                    } else {
                      c[b] = g;
                      if (!("itemId" in g)) {
                        g.itemId = b
                      }
                    }
                  }
                  c[b].name = b
                }
              }
            } else {
              if (!d || !(f in c)) {
                c[f] = {
                  name: f,
                  itemId: f
                }
              }
            }
          }
        }
        return c
      }
    }
  },
  destroy: function() {
    var c = this,
      b = c.getChildEls(),
      d, a;
    for (a in b) {
      d = c[a];
      if (d) {
        if (d.destroy) {
          d.component = null;
          d.destroy()
        }
        c[a] = null
      }
    }
  },
  privates: {
    addChildEl: function(a) {
      var c = this,
        b = c.getChildEls();
      if (!c.hasOwnProperty("childEls")) {
        c.childEls = b = Ext.Object.chain(b)
      }
      if (typeof a === "string") {
        a = {
          name: a,
          itemId: a
        }
      }
      b[a.name] = a
    },
    afterClassMixedIn: function(c) {
      var b = c.prototype,
        a = b.childEls;
      if (a) {
        delete b.childEls;
        c.getConfigurator().add({
          childEls: a
        })
      }
    },
    attachChildEls: function(d, c) {
      var h = this,
        i = h.getChildEls(),
        g = c || h,
        n = g.id + "-",
        m = !g.frame,
        o, a, l, f, e, j, b;
      for (o in i) {
        l = i[o];
        if (m && l.frame) {
          continue
        }
        e = l.select;
        if (e) {
          j = d.select(e, true)
        } else {
          if (!(e = l.selectNode)) {
            if (!(b = l.id)) {
              b = n + l.itemId;
              j = Ext.cache[b]
            } else {
              j = Ext.cache[b] || d.getById(b)
            }
          } else {
            j = d.selectNode(e, false)
          }
        }
        if (j) {
          if (j.isElement) {
            j.component = g
          } else {
            if (j.isComposite && !j.isLite) {
              a = j.elements;
              for (f = a.length; f--;) {
                a[f].component = g
              }
            }
          }
        }
        h[o] = j || null
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util, "ElementContainer"], 0));
(Ext.cmd.derive("Ext.util.Renderable", Ext.Base, {
  mixinId: "renderable",
  frameCls: "x-frame",
  frameIdRegex: /[\-]frame\d+[TMB][LCR]$/,
  frameElNames: ["TL", "TC", "TR", "ML", "MC", "MR", "BL", "BC", "BR",
    "Table"
  ],
  frameTpl: ["{%this.renderDockedItems(out,values,0);%}", '<tpl if="top">',
    '<tpl if="left"><div id="{fgid}TL" data-ref="frameTL" class="{frameCls}-tl {baseCls}-tl {baseCls}-{ui}-tl<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tl</tpl>{frameElCls}" role="presentation"></tpl>',
    '<tpl if="right"><div id="{fgid}TR" data-ref="frameTR" class="{frameCls}-tr {baseCls}-tr {baseCls}-{ui}-tr<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tr</tpl>{frameElCls}" role="presentation"></tpl>',
    '<div id="{fgid}TC" data-ref="frameTC" class="{frameCls}-tc {baseCls}-tc {baseCls}-{ui}-tc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tc</tpl>{frameElCls}" role="presentation"></div>',
    '<tpl if="right"></div></tpl>', '<tpl if="left"></div></tpl>',
    "</tpl>",
    '<tpl if="left"><div id="{fgid}ML" data-ref="frameML" class="{frameCls}-ml {baseCls}-ml {baseCls}-{ui}-ml<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-ml</tpl>{frameElCls}" role="presentation"></tpl>',
    '<tpl if="right"><div id="{fgid}MR" data-ref="frameMR" class="{frameCls}-mr {baseCls}-mr {baseCls}-{ui}-mr<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-mr</tpl>{frameElCls}" role="presentation"></tpl>',
    '<div id="{fgid}Body" data-ref="frameBody" class="{frameBodyCls} {frameCls}-mc {baseCls}-mc {baseCls}-{ui}-mc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-mc</tpl>{frameElCls}" role="presentation">',
    "{%this.applyRenderTpl(out, values)%}", "</div>",
    '<tpl if="right"></div></tpl>', '<tpl if="left"></div></tpl>',
    '<tpl if="bottom">',
    '<tpl if="left"><div id="{fgid}BL" data-ref="frameBL" class="{frameCls}-bl {baseCls}-bl {baseCls}-{ui}-bl<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-bl</tpl>{frameElCls}" role="presentation"></tpl>',
    '<tpl if="right"><div id="{fgid}BR" data-ref="frameBR" class="{frameCls}-br {baseCls}-br {baseCls}-{ui}-br<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-br</tpl>{frameElCls}" role="presentation"></tpl>',
    '<div id="{fgid}BC" data-ref="frameBC" class="{frameCls}-bc {baseCls}-bc {baseCls}-{ui}-bc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-bc</tpl>{frameElCls}" role="presentation"></div>',
    '<tpl if="right"></div></tpl>', '<tpl if="left"></div></tpl>',
    "</tpl>", "{%this.renderDockedItems(out,values,1);%}"
  ],
  frameTableTpl: ["{%this.renderDockedItems(out,values,0);%}",
    '<table id="{fgid}Table" data-ref="frameTable" class="{frameCls} ',
    'x-table-plain" cellpadding="0" role="presentation">',
    '<tpl if="top">', '<tr role="presentation">',
    '<tpl if="left"><td id="{fgid}TL" data-ref="frameTL" class="{frameCls}-tl {baseCls}-tl {baseCls}-{ui}-tl<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tl</tpl>{frameElCls}" role="presentation"></td></tpl>',
    '<td id="{fgid}TC" data-ref="frameTC" class="{frameCls}-tc {baseCls}-tc {baseCls}-{ui}-tc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tc</tpl>{frameElCls}" role="presentation"></td>',
    '<tpl if="right"><td id="{fgid}TR" data-ref="frameTR" class="{frameCls}-tr {baseCls}-tr {baseCls}-{ui}-tr<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tr</tpl>{frameElCls}" role="presentation"></td></tpl>',
    "</tr>", "</tpl>", '<tr role="presentation">',
    '<tpl if="left"><td id="{fgid}ML" data-ref="frameML" class="{frameCls}-ml {baseCls}-ml {baseCls}-{ui}-ml<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-ml</tpl>{frameElCls}" role="presentation"></td></tpl>',
    '<td id="{fgid}Body" data-ref="frameBody" class="{frameBodyCls} {frameCls}-mc {baseCls}-mc {baseCls}-{ui}-mc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-mc</tpl>{frameElCls}" style="{mcStyle}" role="presentation">',
    "{%this.applyRenderTpl(out, values)%}", "</td>",
    '<tpl if="right"><td id="{fgid}MR" data-ref="frameMR" class="{frameCls}-mr {baseCls}-mr {baseCls}-{ui}-mr<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-mr</tpl>{frameElCls}" role="presentation"></td></tpl>',
    "</tr>", '<tpl if="bottom">', '<tr role="presentation">',
    '<tpl if="left"><td id="{fgid}BL" data-ref="frameBL" class="{frameCls}-bl {baseCls}-bl {baseCls}-{ui}-bl<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-bl</tpl>{frameElCls}" role="presentation"></td></tpl>',
    '<td id="{fgid}BC" data-ref="frameBC" class="{frameCls}-bc {baseCls}-bc {baseCls}-{ui}-bc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-bc</tpl>{frameElCls}" role="presentation"></td>',
    '<tpl if="right"><td id="{fgid}BR" data-ref="frameBR" class="{frameCls}-br {baseCls}-br {baseCls}-{ui}-br<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-br</tpl>{frameElCls}" role="presentation"></td></tpl>',
    "</tr>", "</tpl>", "</table>",
    "{%this.renderDockedItems(out,values,1);%}"
  ],
  _renderState: 0,
  ariaEl: "el",
  _layerCls: "x-layer",
  _fixedLayerCls: "x-fixed-layer",
  ariaStaticRoles: {
    presentation: true,
    article: true,
    definition: true,
    directory: true,
    document: true,
    img: true,
    heading: true,
    math: true,
    note: true,
    banner: true,
    complementary: true,
    contentinfo: true,
    navigation: true,
    search: true,
    "undefined": true,
    "null": true
  },
  statics: {
    makeRenderSetter: function(a, c) {
      var b = a.name;
      return function(e) {
        var d = this,
          g = (d.renderConfigs || (d.renderConfigs = {})),
          f = g[c];
        if (d._renderState >= c) {
          (a.setter || a.getSetter()).call(d, e)
        } else {
          if (!f) {
            g[c] = f = {}
          }
          if (!(b in f)) {
            f[b] = d[b]
          }
          d[b] = e
        }
        return d
      }
    },
    processRenderConfig: function(a, k, c) {
      var g = this.prototype,
        e = this.getConfigurator(),
        l = Ext.util.Renderable,
        j = l.makeRenderSetter,
        d = a[k],
        h, i, b, f;
      for (b in d) {
        i = Ext.Config.get(b);
        if (!g[f = i.names.set]) {
          h = (i.renderSetter || (i.renderSetter = {}));
          g[f] = h[c] || (h[c] = j(i, c))
        }
      }
      delete a[k];
      e.add(d)
    }
  },
  onClassMixedIn: function(c) {
    var a = c.override,
      e = this.processRenderConfig,
      d = function(f) {
        if (f.beforeRenderConfig) {
          this.processRenderConfig(f, "beforeRenderConfig", 1)
        }
        if (f.renderConfig) {
          this.processRenderConfig(f, "renderConfig", 3)
        }
        a.call(this, f)
      },
      b = function(g, f) {
        g.override = d;
        g.processRenderConfig = e;
        if (f.beforeRenderConfig) {
          g.processRenderConfig(f, "beforeRenderConfig", 1)
        }
        if (f.renderConfig) {
          g.processRenderConfig(f, "renderConfig", 3)
        }
      };
    b(c, c.prototype);
    c.onExtended(b)
  },
  afterRender: function() {
    var h = this,
      d = {},
      b = h.protoEl,
      g = h.el,
      e, i, c, f, a;
    h.finishRenderChildren();
    h._renderState = 4;
    if (h.contentEl) {
      c = "x-";
      f = c + "hidden-";
      a = h.contentEl = Ext.get(h.contentEl);
      a.component = h;
      a.removeCls([c + "hidden", f + "display", f + "offsets"]);
      h.getContentTarget().appendChild(a.dom)
    }
    b.writeTo(d);
    i = d.removed;
    if (i) {
      g.removeCls(i)
    }
    i = d.cls;
    if (i.length) {
      g.addCls(i)
    }
    i = d.style;
    if (d.style) {
      g.setStyle(i)
    }
    h.protoEl = null;
    if (!h.ownerCt && !h.skipLayout) {
      h.updateLayout()
    }
    if (!(h.x && h.y) && (h.pageX || h.pageY)) {
      h.setPagePosition(h.pageX, h.pageY)
    }
    if (h.disableOnRender) {
      h.onDisable()
    }
    e = h.controller;
    if (e && e.afterRender) {
      e.afterRender(h)
    }
  },
  afterFirstLayout: function(d, k) {
    var f = this,
      j = f.x,
      h = f.y,
      i = f.defaultAlign,
      b = f.alignOffset,
      e, c, a, g, l;
    if (!f.ownerLayout) {
      c = j !== undefined;
      a = h !== undefined
    }
    if (f.floating && !f.preventDefaultAlign && (!c || !a)) {
      if (f.floatParent) {
        g = f.floatParent.getTargetEl().getViewRegion();
        l = f.el.getAlignToXY(f.alignTarget || f.floatParent.getTargetEl(),
          i, b);
        g.x = l[0] - g.x;
        g.y = l[1] - g.y
      } else {
        l = f.el.getAlignToXY(f.alignTarget || f.container, i, b);
        g = f.el.translateXY(l[0], l[1])
      }
      j = c ? j : g.x;
      h = a ? h : g.y;
      c = a = true
    }
    if (c || a) {
      f.setPosition(j, h)
    }
    f.onBoxReady(d, k);
    e = f.controller;
    if (e && e.boxReady) {
      e.boxReady(f)
    }
  },
  beforeRender: function() {
    var d = this,
      e = d.floating,
      c = d.getComponentLayout(),
      b, a;
    d._renderState = 1;
    d.ariaUsesMainElement = d.ariaEl === "el";
    a = d.controller;
    if (a && a.beforeRender) {
      a.beforeRender(d)
    }
    d.initBindable();
    if (d.renderConfigs) {
      d.flushRenderConfigs()
    }
    if (d.reference) {
      d.publishState()
    }
    if (e) {
      d.addCls(d.fixed ? d._fixedLayerCls : d._layerCls);
      b = e.cls;
      if (b) {
        d.addCls(b)
      }
    }
    d.frame = d.frame || d.alwaysFramed;
    if (!c.initialized) {
      c.initLayout()
    }
    d.initOverflow();
    d.setUI(d.ui)
  },
  doApplyRenderTpl: function(c, a) {
    var d = a.$comp,
      b;
    if (!d.rendered) {
      b = d.initRenderTpl();
      b.applyOut(a.renderData, c)
    }
  },
  getElConfig: function() {
    var e = this,
      g = e.autoEl,
      d = e.getFrameInfo(),
      b = {
        tag: "div",
        tpl: d ? e.initFramingTpl(d.table) : e.initRenderTpl()
      },
      h = e.layoutTargetCls,
      f = e.protoEl,
      a = e.ariaRole,
      c;
    e.initStyles(f);
    if (h && !d) {
      f.addCls(h)
    }
    f.writeTo(b);
    f.flush();
    if (g) {
      if (Ext.isString(g)) {
        b.tag = g
      } else {
        Ext.apply(b, g)
      }
    }
    if (a && e.ariaUsesMainElement) {
      b.role = a;
      if (!e.ariaStaticRoles[a]) {
        b["aria-hidden"] = !!e.hidden;
        b["aria-disabled"] = !!e.disabled;
        if (e.ariaLabel && !e.ariaLabelledBy) {
          b["aria-label"] = e.ariaLabel
        }
        if (e.collapsible) {
          b["aria-expanded"] = !e.collapsed
        }
        if (e.ariaRenderAttributes) {
          Ext.apply(b, e.ariaRenderAttributes)
        }
        if (e.config.ariaAttributes) {
          Ext.apply(b, e.getAriaAttributes())
        }
      }
    }
    b.id = e.id;
    if (b.tpl) {
      if (d) {
        b.tplData = c = e.getFrameRenderData();
        c.renderData = e.initRenderData()
      } else {
        b.tplData = e.initRenderData()
      }
    }
    e.ariaRenderAttributes = null;
    return b
  },
  getInsertPosition: function(a) {
    if (a !== undefined) {
      if (Ext.isNumber(a)) {
        a = this.container.dom.childNodes[a]
      } else {
        a = Ext.getDom(a)
      }
    }
    return a
  },
  getRenderTree: function() {
    var b = this,
      a = null;
    if (!b.hasListeners.beforerender || b.fireEvent("beforerender", b) !==
      false) {
      b._renderState = 1;
      b.beforeRender();
      b.rendering = true;
      b._renderState = 2;
      a = b.getElConfig();
      if (b.el) {
        a.id = b.$pid = Ext.id(null, b.el.identifiablePrefix)
      }
    }
    return a
  },
  initRenderData: function() {
    var c = this,
      a = c.ariaRole,
      d, b;
    d = Ext.apply({
      $comp: c,
      id: c.id,
      ui: c.ui,
      uiCls: c.uiCls,
      baseCls: c.baseCls,
      componentCls: c.componentCls,
      frame: c.frame,
      renderScroller: c.touchScroll,
      scrollerCls: c.scrollerCls,
      childElCls: ""
    }, c.renderData);
    if (a && !c.ariaUsesMainElement) {
      b = {
        role: a
      };
      if (!c.ariaStaticRoles[a]) {
        b["aria-hidden"] = !!c.hidden;
        b["aria-disabled"] = !!c.disabled;
        if (c.ariaLabel && !c.ariaLabelledBy) {
          b["aria-label"] = c.ariaLabel
        }
        if (c.collapsible) {
          b["aria-expanded"] = !c.collapsed
        }
        if (c.ariaRenderAttributes) {
          Ext.apply(b, c.ariaRenderAttributes)
        }
        if (c.config.ariaAttributes) {
          Ext.apply(b, c.getAriaAttributes())
        }
      }
      d.ariaAttributes = b
    }
    return d
  },
  onRender: function(d, e) {
    var f = this,
      h = f.x,
      g = f.y,
      c = null,
      b = f.el,
      a, i;
    f.applyRenderSelectors();
    f.rendering = null;
    f.rendered = true;
    f._renderState = 3;
    if (f.renderConfigs) {
      f.flushRenderConfigs()
    }
    if (h != null) {
      c = {
        x: h
      }
    }
    if (g != null) {
      (c = c || {}).y = g
    }
    if (!f.getFrameInfo()) {
      a = f.width;
      i = f.height;
      if (typeof a === "number") {
        c = c || {};
        c.width = a
      }
      if (typeof i === "number") {
        c = c || {};
        c.height = i
      }
    }
    if (f.touchScroll === 1) {
      f.getOverflowEl().disableTouchScroll()
    }
    f.lastBox = b.lastBox = c
  },
  render: function(c, b) {
    var e = this,
      d = e.el,
      h = e.ownerLayout,
      g, a, f;
    if (d && !d.isElement) {
      e.wrapPrimaryEl(d);
      d = e.el
    }
    if (!e.skipLayout) {
      Ext.suspendLayouts()
    }
    c = e.initContainer(c);
    f = e.getInsertPosition(b);
    if (!d) {
      a = e.getRenderTree();
      if (h && h.transformItemRenderTree) {
        a = h.transformItemRenderTree(a)
      }
      if (a) {
        if (f) {
          d = Ext.DomHelper.insertBefore(f, a)
        } else {
          d = Ext.DomHelper.append(c, a)
        }
        e.wrapPrimaryEl(d);
        e.cacheRefEls(d)
      }
    } else {
      if (!e.hasListeners.beforerender || e.fireEvent("beforerender", e) !==
        false) {
        e.beforeRender();
        e.needsRenderTpl = e.rendering = true;
        e._renderState = 2;
        e.initStyles(d);
        if (e.allowDomMove !== false) {
          if (f) {
            c.dom.insertBefore(d.dom, f)
          } else {
            c.dom.appendChild(d.dom)
          }
        }
      } else {
        g = true
      }
    }
    if (d && !g) {
      e.finishRender(b)
    }
    if (!e.skipLayout) {
      Ext.resumeLayouts(!e.hidden && !c.isDetachedBody)
    }
  },
  ensureAttachedToBody: function(c) {
    var b = this,
      a;
    while (b.ownerCt) {
      b = b.ownerCt
    }
    if (b.container.isDetachedBody) {
      b.container = a = Ext.getBody();
      a.appendChild(b.el.dom);
      if (c) {
        b.updateLayout()
      }
      if (typeof b.x === "number" || typeof b.y === "number") {
        b.setPosition(b.x, b.y)
      }
    }
  },
  privates: {
    applyRenderSelectors: function() {
      var d = this,
        b = d.renderSelectors,
        c = d.el,
        e, a;
      d.attachChildEls(c);
      d.ariaEl = d[d.ariaEl] || d.el;
      if (b) {
        for (a in b) {
          e = b[a];
          if (e) {
            d[a] = c.selectNode(e, false)
          }
        }
      }
    },
    cacheRefEls: function(e) {
      e = e || this.el;
      var c = Ext.cache,
        g = Ext.dom.Element,
        h = e.isElement ? e.dom : e,
        b = h.querySelectorAll("[data-ref]"),
        a = b.length,
        f, d;
      for (d = 0; d < a; d++) {
        f = b[d];
        if (!c[f.id]) {
          new g(f)
        }
      }
    },
    doAutoRender: function() {
      var a = this;
      if (!a.rendered) {
        if (a.floating) {
          a.render(a.renderTo || document.body)
        } else {
          a.render(Ext.isBoolean(a.autoRender) ? Ext.getBody() : a.autoRender)
        }
      }
    },
    doRenderContent: function(a, d) {
      var b = d.$comp,
        c = b.data;
      if (b.html) {
        Ext.DomHelper.generateMarkup(b.html, a);
        delete b.html
      }
      if (b.tpl) {
        if (!b.tpl.isTemplate) {
          b.tpl = new Ext.XTemplate(b.tpl)
        }
        if (c) {
          b.data = c = c.isEntity ? c.getData(true) : c;
          b.tpl.applyOut(c, a)
        }
      }
    },
    doRenderFramingDockedItems: function(a, c, d) {
      var b = c.$comp;
      if (!b.rendered && b.doRenderDockedItems) {
        c.renderData.$skipDockedItems = true;
        b.doRenderDockedItems.call(this, a, c, d)
      }
    },
    flushRenderConfigs: function() {
      var d = this,
        g = d.renderConfigs,
        f = d._renderState,
        h, c, b, a, e;
      if (g) {
        for (c = 0; c <= f; ++c) {
          h = g[c];
          if (h) {
            g[c] = null;
            for (b in h) {
              e = h[b];
              (a || (a = {}))[b] = d[b];
              d[b] = e
            }
          }
        }
        if (a) {
          d.setConfig(a)
        }
      }
    },
    finishRender: function(g) {
      var j = this,
        a = Ext.cache,
        i, f, b, h, e, d, c;
      if (!j.el || j.$pid) {
        if (j.container) {
          c = a[j.id];
          d = c ? c.dom : j.container.getById(j.id, true)
        } else {
          b = j.$pid || j.id;
          c = a[b];
          d = c ? c.dom : Ext.getDom(b)
        }
        if (!j.el) {
          j.wrapPrimaryEl(d)
        } else {
          delete j.$pid;
          if (!j.el.dom) {
            j.wrapPrimaryEl(j.el)
          }
          d.parentNode.insertBefore(j.el.dom, d);
          i = d;
          d = j.el.dom;
          f = d.firstChild;
          while (i.firstChild) {
            d.insertBefore(i.firstChild, f)
          }
          j.el.addCls(i.className);
          Ext.removeNode(i)
        }
      } else {
        if (j.needsRenderTpl) {
          h = j.initRenderTpl();
          if (h) {
            e = j.initRenderData();
            h.insertFirst(j.getTargetEl(), e)
          }
          j.cacheRefEls()
        }
      }
      j.el.component = j;
      if (!j.container) {
        j.container = Ext.get(j.el.dom.parentNode)
      }
      if (j.ctCls) {
        j.container.addCls(j.ctCls)
      }
      j.onRender(j.container, g);
      if (!j.overflowInited) {
        j.initOverflow()
      }
      j.el.setVisibilityMode(Ext.Element[j.hideMode.toUpperCase()]);
      if (j.overCls) {
        j.el.hover(j.addOverCls, j.removeOverCls, j)
      }
      if (j.hasListeners.render) {
        j.fireEvent("render", j)
      }
      j.afterRender();
      if (j.hasListeners.afterrender) {
        j.fireEvent("afterrender", j)
      }
      j.initEvents();
      if (j.hidden) {
        j.el.hide()
      }
    },
    finishRenderChildren: function() {
      var a = this.getComponentLayout();
      a.finishRender()
    },
    getFrameRenderData: function() {
      var c = this,
        b = c.frameSize,
        a = "";
      if (c._syncFrameHeight && c.height) {
        a = "height:" + (c.height - b.height) + "px"
      }
      return {
        $comp: c,
        id: c.id,
        fgid: c.id + "-frame",
        ui: c.ui,
        uiCls: c.uiCls,
        frameCls: c.frameCls,
        frameBodyCls: c.layoutTargetCls || "",
        baseCls: c.baseCls,
        top: !!b.top,
        left: !!b.left,
        right: !!b.right,
        bottom: !!b.bottom,
        mcStyle: a,
        frameElCls: ""
      }
    },
    getFrameInfo: function() {
      if (Ext.supports.CSS3BorderRadius || !this.frame) {
        return false
      }
      var o = this,
        i = o.frameInfoCache,
        c = o.getFramingInfoCls() + "-frameInfo",
        p = i[c],
        h, k, g, q, d, e, j, r, n, b, l, a, f, m;
      if (p == null) {
        h = Ext.fly(o.getStyleProxy(c), "frame-style-el");
        k = h.getStyle("font-family");
        if (k) {
          k = k.split("-");
          g = parseInt(k[1], 10);
          q = parseInt(k[2], 10);
          d = parseInt(k[3], 10);
          e = parseInt(k[4], 10);
          j = parseInt(k[5], 10);
          r = parseInt(k[6], 10);
          n = parseInt(k[7], 10);
          b = parseInt(k[8], 10);
          l = parseInt(k[9], 10);
          a = parseInt(k[10], 10);
          f = parseInt(k[11], 10);
          m = parseInt(k[12], 10);
          p = {
            table: k[0].charAt(0) === "t",
            vertical: k[0].charAt(1) === "v",
            top: g,
            right: q,
            bottom: d,
            left: e,
            width: e + q,
            height: g + d,
            border: {
              top: j,
              right: r,
              bottom: n,
              left: b,
              width: b + r,
              height: j + n
            },
            padding: {
              top: l,
              right: a,
              bottom: f,
              left: m,
              width: m + a,
              height: l + f
            }
          }
        } else {
          p = false
        }
        i[c] = p
      }
      o.frame = !!p;
      o.frameSize = p;
      return p
    },
    getFramingInfoCls: function() {
      return this.baseCls + "-" + this.ui
    },
    getStyleProxy: function(b) {
      var a = this.styleProxyEl || (Ext.Component.prototype.styleProxyEl =
        Ext.getBody().createChild({
          role: "presentation",
          style: {
            position: "absolute",
            top: "-10000px"
          }
        }, null, true));
      a.className = b;
      return a
    },
    getFrameTpl: function(a) {
      return this.getTpl(a ? "frameTableTpl" : "frameTpl")
    },
    initContainer: function(a) {
      var b = this;
      if (!a && b.el) {
        a = b.el.dom.parentNode;
        b.allowDomMove = false
      }
      b.container = a.dom ? a : Ext.get(a);
      return b.container
    },
    initOverflow: function() {
      var d = this,
        a = d.getOverflowStyle(),
        f = d.scrollFlags,
        e = d.getOverflowEl(),
        c = (f.y || f.x),
        b = d.touchScroll = (c && Ext.supports.touchScroll);
      if (!c || !e || !e.isElement) {
        return
      }
      d.overflowInited = true;
      if (b === 2) {
        e.setStyle("overflow", "hidden")
      } else {
        e.setStyle(a)
      }
    },
    doRenderPadding: function(a, c) {
      var b = c.$comp;
      if (b.touchScroll) {
        a.push("padding:", b.unitizeBox(b.padding))
      }
    },
    initFramingTpl: function(b) {
      var a = this.getFrameTpl(b);
      if (a && !a.applyRenderTpl) {
        this.setupFramingTpl(a)
      }
      return a
    },
    initRenderTpl: function() {
      var a = this.getTpl("renderTpl");
      if (a && !a.renderContent) {
        this.setupRenderTpl(a)
      }
      return a
    },
    setupFramingTpl: function(a) {
      a.applyRenderTpl = this.doApplyRenderTpl;
      a.renderDockedItems = this.doRenderFramingDockedItems
    },
    setupRenderTpl: function(a) {
      a.renderBody = a.renderContent = this.doRenderContent;
      a.renderPadding = this.doRenderPadding
    },
    updateFrame: function() {
      if (Ext.supports.CSS3BorderRadius || !this.frame) {
        return
      }
      var m = this,
        g = m.el.dom,
        l = m.frameTable,
        c = m.frameBody,
        o = c.dom,
        k = m.getFrameInfo(),
        p, f, b, e, j, q, r, d, h, a, n;
      b = document.createElement("div");
      q = m.getFrameRenderData();
      d = m.getFrameTpl(k.table);
      d.insertFirst(b, q);
      n = b.querySelectorAll("[data-ref]");
      a = b.querySelector('[data-ref="frameBody"]');
      for (j = o; j.parentNode !== g;) {
        j = j.parentNode
      }
      while (b.firstChild) {
        g.insertBefore(b.firstChild, j)
      }
      a.parentNode.replaceChild(o, a);
      o.className = a.className;
      c.setSize();
      p = m.getChildEls();
      if (l) {
        l.destroy();
        m.frameTable = null
      }
      for (f in p) {
        if (p[f].frame) {
          e = m[f];
          if (e && e !== c) {
            e.destroy();
            m[f] = null
          }
        }
      }
      for (h = n.length; h--;) {
        f = (r = n[h]).getAttribute("data-ref");
        if (f !== "frameBody") {
          m[f] = new Ext.dom.Element(r)
        }
      }
    },
    frameInfoCache: {}
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util, "Renderable"], 0));
(Ext.cmd.derive("Ext.state.Provider", Ext.Base, {
  prefix: "ext-",
  constructor: function(a) {
    var b = this;
    Ext.apply(b, a);
    b.state = {};
    b.mixins.observable.constructor.call(b)
  },
  get: function(c, a) {
    var b = this.state[c];
    return b === undefined ? a : b
  },
  clear: function(a) {
    var b = this;
    delete b.state[a];
    b.fireEvent("statechange", b, a, null)
  },
  set: function(a, c) {
    var b = this;
    b.state[a] = c;
    b.fireEvent("statechange", b, a, c)
  },
  decodeValue: function(f) {
    var c = this,
      j = /^(a|n|d|b|s|o|e)\:(.*)$/,
      b = j.exec(unescape(f)),
      g, d, a, i, e, h;
    if (!b || !b[1]) {
      return
    }
    d = b[1];
    f = b[2];
    switch (d) {
      case "e":
        return null;
      case "n":
        return parseFloat(f);
      case "d":
        return new Date(Date.parse(f));
      case "b":
        return (f === "1");
      case "a":
        g = [];
        if (f) {
          i = f.split("^");
          e = i.length;
          for (h = 0; h < e; h++) {
            f = i[h];
            g.push(c.decodeValue(f))
          }
        }
        return g;
      case "o":
        g = {};
        if (f) {
          i = f.split("^");
          e = i.length;
          for (h = 0; h < e; h++) {
            f = i[h];
            a = f.split("=");
            g[a[0]] = c.decodeValue(a[1])
          }
        }
        return g;
      default:
        return f
    }
  },
  encodeValue: function(e) {
    var f = "",
      d = 0,
      b, a, c;
    if (e == null) {
      return "e:1"
    } else {
      if (typeof e === "number") {
        b = "n:" + e
      } else {
        if (typeof e === "boolean") {
          b = "b:" + (e ? "1" : "0")
        } else {
          if (Ext.isDate(e)) {
            b = "d:" + e.toUTCString()
          } else {
            if (Ext.isArray(e)) {
              for (a = e.length; d < a; d++) {
                f += this.encodeValue(e[d]);
                if (d !== a - 1) {
                  f += "^"
                }
              }
              b = "a:" + f
            } else {
              if (typeof e === "object") {
                for (c in e) {
                  if (typeof e[c] !== "function" && e[c] !== undefined) {
                    f += c + "=" + this.encodeValue(e[c]) + "^"
                  }
                }
                b = "o:" + f.substring(0, f.length - 1)
              } else {
                b = "s:" + e
              }
            }
          }
        }
      }
    }
    return escape(b)
  }
}, 1, 0, 0, 0, 0, [
  ["observable", Ext.util.Observable]
], [Ext.state, "Provider"], 0));
(Ext.cmd.derive("Ext.state.Manager", Ext.Base, {
  singleton: true,
  constructor: function() {
    this.provider = new Ext.state.Provider()
  },
  setProvider: function(a) {
    this.provider = a
  },
  get: function(b, a) {
    return this.provider.get(b, a)
  },
  set: function(a, b) {
    this.provider.set(a, b)
  },
  clear: function(a) {
    this.provider.clear(a)
  },
  getProvider: function() {
    return this.provider
  }
}, 1, 0, 0, 0, 0, 0, [Ext.state, "Manager"], 0));
(Ext.cmd.derive("Ext.state.Stateful", Ext.Base, {
  mixinId: "state",
  stateful: false,
  saveDelay: 100,
  constructor: function() {
    var a = this;
    if (!a.stateEvents) {
      a.stateEvents = []
    }
    if (a.stateful !== false) {
      a.addStateEvents(a.stateEvents);
      a.initState()
    }
  },
  addStateEvents: function(d) {
    var f = this,
      c, e, b, a;
    if (f.stateful && f.getStateId()) {
      a = (typeof d === "string") ? arguments : d;
      b = f.stateEventsByName || (f.stateEventsByName = {});
      for (c = a.length; c--;) {
        e = a[c];
        if (e && !b[e]) {
          b[e] = 1;
          f.on(e, f.onStateChange, f)
        }
      }
    }
  },
  onStateChange: function() {
    var c = this,
      a = c.saveDelay,
      d, b;
    if (!c.stateful) {
      return
    }
    if (a) {
      if (!c.stateTask) {
        d = Ext.state.Stateful;
        b = d.runner || (d.runner = new Ext.util.TaskRunner());
        c.stateTask = b.newTask({
          run: c.saveState,
          scope: c,
          interval: a,
          repeat: 1,
          fireIdleEvent: false
        })
      }
      c.stateTask.start()
    } else {
      c.saveState()
    }
  },
  saveState: function() {
    var h = this,
      b = h.stateful && h.getStateId(),
      g = h.hasListeners,
      c, e, d, f, a, j;
    if (b) {
      a = h.getState() || {};
      c = h.getPlugins() || [];
      for (d = 0, f = c.length; d < f; d++) {
        e = c[d];
        if (e && e.getState) {
          j = e.getState(a);
          if (j && !a[e.ptype]) {
            a[e.ptype] = j
          }
        }
      }
      if (!g.beforestatesave || h.fireEvent("beforestatesave", h, a) !==
        false) {
        Ext.state.Manager.set(b, a);
        if (g.statesave) {
          h.fireEvent("statesave", h, a)
        }
      }
    }
  },
  getState: function() {
    return null
  },
  applyState: function(a) {
    if (a) {
      Ext.apply(this, a)
    }
  },
  getStateId: function() {
    var a = this;
    return a.stateId || (a.autoGenId ? null : a.id)
  },
  initState: function() {
    var j = this,
      b = j.stateful && j.getStateId(),
      h = j.hasListeners,
      a, k, e, g, d, f, c;
    if (b) {
      k = Ext.state.Manager.get(b);
      if (k) {
        a = Ext.apply({}, k);
        if (!h.beforestaterestore || j.fireEvent("beforestaterestore", j,
            k) !== false) {
          d = j.getPlugins() || [];
          for (e = 0, g = d.length; e < g; e++) {
            f = d[e];
            if (f) {
              c = f.ptype;
              if (f.applyState) {
                f.applyState(a[c], k)
              }
              delete a[c]
            }
          }
          j.applyState(a);
          if (h.staterestore) {
            j.fireEvent("staterestore", j, k)
          }
        }
      }
    }
  },
  savePropToState: function(f, e, d) {
    var b = this,
      c = b[f],
      a = b.initialConfig;
    if (b.hasOwnProperty(f)) {
      if (!a || a[f] !== c) {
        if (e) {
          e[d || f] = c
        }
        return true
      }
    }
    return false
  },
  savePropsToState: function(e, c) {
    var b = this,
      a, d;
    if (typeof e === "string") {
      b.savePropToState(e, c)
    } else {
      for (a = 0, d = e.length; a < d; ++a) {
        b.savePropToState(e[a], c)
      }
    }
    return c
  },
  destroy: function() {
    var b = this,
      a = b.stateTask;
    if (a) {
      a.destroy();
      b.stateTask = null
    }
    b.clearListeners()
  }
}, 1, 0, 0, 0, 0, 0, [Ext.state, "Stateful"], 0));
(Ext.cmd.derive("Ext.util.Focusable", Ext.Base, {
  mixinId: "focusable",
  hasFocus: false,
  focusable: false,
  focusCls: "focus",
  initFocusable: Ext.emptyFn,
  initFocusableEvents: function() {
    this.initFocusableElement()
  },
  getFocusClsEl: function() {
    return this.getFocusEl()
  },
  getFocusEl: function() {
    return this.element || this.el
  },
  destroyFocusable: function() {
    var a = this;
    Ext.destroy(a.focusListeners);
    a.focusListeners = a.focusEnterEvent = a.focusTask = null;
    a.focusEl = a.ariaEl = null
  },
  enableFocusable: Ext.emptyFn,
  disableFocusable: function() {
    var d = this,
      b, c = d.focusCls,
      a;
    if (d.hasFocus) {
      b = d.findFocusTarget();
      if (b) {
        b.focus()
      }
    }
    a = d.getFocusClsEl();
    if (c && a) {
      a.removeCls(d.removeClsWithUI(c, true))
    }
  },
  isFocusable: function(a) {
    var c = this,
      b;
    if (!c.focusable && (!c.isContainer || !a)) {
      return false
    }
    b = c.getFocusEl();
    if (b && c.canFocus()) {
      return b.isFocusable(a)
    }
    return false
  },
  canFocus: function(a) {
    var b = this;
    return (b.isContainer || b.focusable) && b.rendered && !b.destroying &&
      !b.destroyed && !b.disabled && (a || b.isVisible(true))
  },
  focus: function(f, c, h, d) {
    var e = this,
      a, g, b;
    if ((!e.focusable && !e.isContainer) || e.destroyed || e.destroying) {
      return
    }
    if (c) {
      e.getFocusTask().delay(Ext.isNumber(c) ? c : 10, e.focus, e, [f,
        false, h, d
      ]);
      return e
    }
    e.cancelFocus();
    if (e.canFocus()) {
      if (a = e.getFocusEl()) {
        if (a.isComponent) {
          return a.focus(f, c, h, d)
        }
        g = a.dom;
        if (g) {
          if (e.floating) {
            b = e.container.dom.scrollTop
          }
          a.focus();
          if (f) {
            if (Ext.isArray(f)) {
              if (e.selectText) {
                e.selectText.apply(e, f)
              }
            } else {
              if (g.select) {
                g.select()
              } else {
                if (e.selectText) {
                  e.selectText()
                }
              }
            }
          }
          Ext.callback(h, d)
        }
        if (e.floating) {
          if (b !== undefined) {
            e.container.dom.scrollTop = b
          }
        }
      }
    } else {
      a = e.findFocusTarget();
      if (a) {
        return a.focus(f, c, h, d)
      }
    }
    return e
  },
  cancelFocus: function() {
    var a = this.getFocusTask();
    if (a) {
      a.cancel()
    }
  },
  beforeBlur: Ext.emptyFn,
  onBlur: function(f) {
    var d = this,
      b = d.focusableContainer,
      c = d.focusCls,
      a;
    if (!d.focusable || d.destroying) {
      return
    }
    d.beforeBlur(f);
    if (b) {
      b.beforeFocusableChildBlur(d, f)
    }
    a = d.getFocusClsEl();
    if (c && a) {
      a.removeCls(d.removeClsWithUI(c, true))
    }
    if (d.validateOnBlur) {
      d.validate()
    }
    d.hasFocus = false;
    d.fireEvent("blur", d, f);
    d.postBlur(f);
    if (b) {
      b.afterFocusableChildBlur(d, f)
    }
  },
  postBlur: Ext.emptyFn,
  beforeFocus: Ext.emptyFn,
  onFocus: function(f) {
    var d = this,
      b = d.focusableContainer,
      c = d.focusCls,
      a;
    if (!d.focusable) {
      return
    }
    if (d.canFocus()) {
      d.beforeFocus(f);
      if (b) {
        b.beforeFocusableChildFocus(d, f)
      }
      a = d.getFocusClsEl();
      if (c && a) {
        a.addCls(d.addClsWithUI(c, true))
      }
      if (!d.hasFocus) {
        d.hasFocus = true;
        d.fireEvent("focus", d, f)
      }
      d.postFocus(f);
      if (b) {
        b.afterFocusableChildFocus(d, f)
      }
    }
  },
  postFocus: Ext.emptyFn,
  getTabIndex: function() {
    var c = this,
      b, a;
    if (!c.focusable) {
      return
    }
    b = c.rendered && c.getFocusEl();
    if (b) {
      if (b.isComponent) {
        a = b.getTabIndex()
      } else {
        if (b.isElement) {
          a = b.getAttribute("tabIndex")
        } else {
          return
        }
      }
      c.tabIndex = a
    } else {
      a = c.tabIndex
    }
    return a - 0
  },
  setTabIndex: function(d, a) {
    var c = this,
      b;
    if (!c.focusable) {
      return
    }
    c.tabIndex = d;
    if (!c.rendered) {
      return
    }
    b = a || c.getFocusEl();
    if (b) {
      if (b.isComponent) {
        b.setTabIndex(d)
      } else {
        if (b.isElement) {
          b.set({
            tabIndex: d
          })
        }
      }
    }
  },
  onFocusEnter: function(b) {
    var a = this;
    if (a.floating && a !== a.zIndexManager.getActive()) {
      a.toFront(true)
    }
    a.focusEnterEvent = b;
    a.containsFocus = true;
    a.fireEvent("focusenter", a, b)
  },
  onFocusLeave: function(b) {
    var a = this;
    a.focusEnterEvent = null;
    a.containsFocus = false;
    a.fireEvent("focusleave", a, b)
  },
  privates: {
    revertFocus: function() {
      var c = this,
        b = c.focusEnterEvent,
        a, d;
      c.previousFocus = null;
      c.containsFocus = false;
      d = c.el.contains(Ext.Element.getActiveElement());
      if (!c.preventRefocus && b && d) {
        a = b.fromComponent;
        if (a && a.canFocus && !a.canFocus()) {
          a.focus()
        } else {
          a = Ext.fly(b.relatedTarget);
          if (Ext.isIE8 || (a.isFocusable && a.isFocusable())) {
            a.focus()
          }
        }
      }
    },
    findFocusTarget: function() {
      var b = this,
        a, c;
      for (a = b.up(":not([disabled])"); a; a = a.up(":not([disabled])")) {
        c = Ext.ComponentQuery.query(":focusable:not([hasFocus])", a);
        if (c.length) {
          return c[0]
        }
        if (a.isFocusable && a.isFocusable()) {
          return a
        }
      }
    },
    initFocusableElement: function() {
      var c = this,
        a = c.tabIndex,
        b = c.getFocusEl();
      if (b && !b.isComponent) {
        c.focusEl = b;
        if (a != null && c.canFocus(true)) {
          c.setTabIndex(a, b)
        }
        b.dom.setAttribute(Ext.Component.componentIdAttribute, c.id);
        if (c.config.keyHandlers) {
          c.initKeyHandlers(b)
        }
      }
    },
    getFocusTask: function() {
      if (!this.focusTask) {
        this.focusTask = Ext.focusTask
      }
      return this.focusTask
    },
    handleFocusEvent: function(b) {
      var a;
      if (this.isFocusing(b)) {
        a = new Ext.event.Event(b.event);
        a.type = "focus";
        a.relatedTarget = b.fromElement;
        a.target = b.toElement;
        this.onFocus(a)
      }
    },
    handleBlurEvent: function(b) {
      var a;
      if (this.isBlurring(b)) {
        a = new Ext.event.Event(b.event);
        a.type = "blur";
        a.target = b.fromElement;
        a.relatedTarget = b.toElement;
        this.onBlur(a)
      }
    },
    isFocusing: function(b) {
      var d = b.fromElement,
        c = b.toElement,
        a;
      if (this.focusable) {
        a = this.getFocusEl();
        if (a) {
          if (a.isComponent) {
            return a.isFocusing(d, c)
          } else {
            return c === a.dom && d !== c
          }
        }
      }
      return false
    },
    isBlurring: function(b) {
      var d = b.fromElement,
        c = b.toElement,
        a;
      if (this.focusable) {
        a = this.getFocusEl();
        if (a) {
          if (a.isComponent) {
            return a.isBlurring(d, c)
          } else {
            return d === a.dom && d !== c
          }
        }
      }
      return false
    },
    blur: function() {
      var b = this,
        a;
      if (!b.focusable || !b.canFocus()) {
        return
      }
      a = b.getFocusEl();
      if (a) {
        b.blurring = true;
        a.blur();
        delete b.blurring
      }
      return b
    },
    disableTabbing: function() {
      var c = this,
        b = c.el,
        a;
      if (b) {
        b.saveTabbableState()
      }
      a = c.getFocusEl();
      if (a) {
        if (a.isComponent) {
          a.disableTabbing()
        } else {
          if (a.isElement && b && !b.contains(a)) {
            a.saveTabbableState()
          }
        }
      }
    },
    enableTabbing: function() {
      var c = this,
        b = c.el,
        a;
      a = c.getFocusEl();
      if (a) {
        if (a.isComponent) {
          a.enableTabbing()
        } else {
          if (a.isElement && b && !b.contains(a)) {
            a.restoreTabbableState()
          }
        }
      }
      if (b) {
        b.restoreTabbableState()
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util, "Focusable"], function() {
  if (!Ext.focusTask) {
    Ext.focusTask = new Ext.util.DelayedTask()
  }
}));
(Ext.cmd.derive("Ext.mixin.Accessible", Ext.Mixin, {
  mixinConfig: {
    id: "accessible"
  },
  config: {
    ariaAttributes: {
      $value: null,
      lazy: true
    }
  },
  privates: {
    getAriaLabelEl: function(c) {
      var e = [],
        g, d, b, f, a;
      if (c) {
        if (Ext.isFunction(c)) {
          return c.call(this)
        } else {
          if (!Ext.isArray(c)) {
            c = [c]
          }
          g = this.lookupReferenceHolder();
          if (g) {
            for (d = 0, b = c.length; d < b; d++) {
              f = g.lookupReference(c[d]);
              if (f) {
                e.push(f.ariaEl.id)
              }
            }
          }
        }
      }
      return e.length ? e.join(" ") : null
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.mixin, "Accessible"], 0));
(Ext.cmd.derive("Ext.util.KeyboardInteractive", Ext.Mixin, {
  mixinConfig: {
    id: "keyboardinteractive"
  },
  config: {
    keyHandlers: {
      $value: null,
      lazy: true
    }
  },
  initKeyHandlers: function(b) {
    var d = this,
      a = d.getKeyHandlers(),
      c;
    for (c in a) {
      b.on("keydown", d.handleKeydown, d);
      d.keydownListenerAttached = true;
      break
    }
  },
  applyKeyHandlers: function(e) {
    var g = this,
      c = {},
      b, f, h, d, a;
    if (e) {
      for (f in e) {
        d = e[f];
        if (typeof d === "function") {
          c[f] = d
        } else {
          c[f] = g[d]
        }
      }
      if (g.focusable && g.rendered && !g.destroyed && !g.destroying) {
        b = g.getFocusEl();
        if (b && !g.keydownListenerAttached) {
          b.on("keydown", g.handleKeydown, g);
          g.keydownListenerAttached = true
        }
      }
    }
    return c
  },
  handleKeydown: function(d) {
    var c = this,
      b, a;
    b = d.getKeyName();
    if (b) {
      a = c.getKeyHandlers()[b];
      if (a) {
        a.call(c, d)
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util, "KeyboardInteractive"], 0));
(Ext.cmd.derive("Ext.Component", Ext.Base, {
  alternateClassName: "Ext.AbstractComponent",
  statics: {
    AUTO_ID: 1000,
    pendingLayouts: null,
    layoutSuspendCount: 0,
    DIRECTION_TOP: "top",
    DIRECTION_RIGHT: "right",
    DIRECTION_BOTTOM: "bottom",
    DIRECTION_LEFT: "left",
    VERTICAL_DIRECTION_Re: /^(?:top|bottom)$/,
    INVALID_ID_CHARS_Re: /[\.,\s]/g,
    componentIdAttribute: "data-componentid",
    ariaHighContrastModeCls: "x-aria-highcontrast",
    cancelLayout: function(a, c) {
      var b = this.runningLayoutContext || this.pendingLayouts;
      if (b) {
        b.cancelComponent(a, false, c)
      }
    },
    fromElement: function(b, d, c) {
      var h = this.componentIdAttribute,
        g = Ext.getDom(b),
        a = Ext.ComponentManager.all,
        e = 0,
        j, f, i;
      if (typeof d !== "number") {
        j = Ext.getDom(d);
        d = Number.MAX_VALUE
      }
      while (g && g.nodeType === 1 && e < d && g !== j) {
        f = g.getAttribute(h) || g.id;
        if (f) {
          i = a[f];
          if (i && (!c || Ext.ComponentQuery.is(i, c))) {
            return i
          }
          e++
        }
        g = g.parentNode
      }
      return null
    },
    flushLayouts: function() {
      var b = this,
        a = b.pendingLayouts;
      if (a && a.invalidQueue.length) {
        b.pendingLayouts = null;
        b.runningLayoutContext = a;
        Ext.override(a, {
          runComplete: function() {
            b.runningLayoutContext = null;
            var c = this.callParent();
            if (Ext.GlobalEvents.hasListeners.afterlayout) {
              Ext.GlobalEvents.fireEvent("afterlayout")
            }
            return c
          }
        });
        a.run()
      }
    },
    resumeLayouts: function(a) {
      if (this.layoutSuspendCount && !--this.layoutSuspendCount) {
        if (a) {
          this.flushLayouts()
        }
        if (Ext.GlobalEvents.hasListeners.resumelayouts) {
          Ext.GlobalEvents.fireEvent("resumelayouts")
        }
      }
    },
    suspendLayouts: function() {
      ++this.layoutSuspendCount
    },
    updateLayout: function(b, e) {
      var c = this,
        a = c.runningLayoutContext,
        d;
      if (a) {
        a.queueInvalidate(b)
      } else {
        d = c.pendingLayouts || (c.pendingLayouts = new Ext.layout.Context());
        d.queueInvalidate(b);
        if (!e && !c.layoutSuspendCount && !b.isLayoutSuspended()) {
          c.flushLayouts()
        }
      }
    }
  },
  $configPrefixed: false,
  $configStrict: false,
  config: {
    data: null,
    maxHeight: null,
    maxWidth: null,
    minHeight: null,
    minWidth: null,
    scrollable: null
  },
  defaultBindProperty: "html",
  alignTarget: null,
  autoRender: false,
  autoShow: false,
  baseCls: "x-component",
  childEls: {
    frameTable: {
      frame: true
    },
    frameTL: {
      frame: "tl"
    },
    frameTC: {
      frame: "tc"
    },
    frameTR: {
      frame: "tr"
    },
    frameML: {
      frame: "ml"
    },
    frameBody: {
      frame: "mc"
    },
    frameMR: {
      frame: "mr"
    },
    frameBL: {
      frame: "bl"
    },
    frameBC: {
      frame: "bc"
    },
    frameBR: {
      frame: "br"
    }
  },
  componentLayout: "autocomponent",
  defaultAlign: "c-c",
  disabled: false,
  disabledRe: /^(?:button|input|select|textarea|optgroup|option|fieldset)$/i,
  nonMaskableRe: (function() {
    var a = ["input", "select", "textarea", "optgroup", "option",
      "table"
    ];
    if (Ext.isIE9m && !(Ext.isIE9 && !Ext.isIEQuirks)) {
      a.push("p")
    }
    return new RegExp("^(?:" + a.join("|") + ")$", "i")
  }()),
  disabledCls: "x-item-disabled",
  draggable: false,
  floating: false,
  hidden: false,
  hideMode: "display",
  maskElement: null,
  renderTpl: ['<tpl if="renderScroller">',
    '<div class="{scrollerCls}" style="{%this.renderPadding(out, values)%}">',
    "</tpl>", "{%this.renderContent(out,values)%}",
    '<tpl if="renderScroller"></div></tpl>'
  ],
  resizeHandles: "all",
  shrinkWrap: 2,
  toFrontOnShow: true,
  synthetic: false,
  tplWriteMode: "overwrite",
  ui: "default",
  uiCls: [],
  weight: null,
  allowDomMove: true,
  autoGenId: false,
  borderBoxCls: "x-border-box",
  componentLayoutCounter: 0,
  contentPaddingProperty: "padding",
  deferLayouts: false,
  frameSize: null,
  horizontalPosProp: "left",
  isComponent: true,
  _isLayoutRoot: false,
  layoutSuspendCount: 0,
  liquidLayout: false,
  maskOnDisable: true,
  offsetsCls: "x-hidden-offsets",
  rendered: false,
  rootCls: "x-body",
  scrollerCls: "x-scroll-scroller",
  scrollerSelector: ".x-scroll-scroller",
  _scrollFlags: {
    auto: {
      auto: {
        overflowX: "auto",
        overflowY: "auto",
        x: true,
        y: true,
        both: true
      },
      "false": {
        overflowX: "auto",
        overflowY: "hidden",
        x: true,
        y: false,
        both: false
      },
      scroll: {
        overflowX: "auto",
        overflowY: "scroll",
        x: true,
        y: true,
        both: true
      }
    },
    "false": {
      auto: {
        overflowX: "hidden",
        overflowY: "auto",
        x: false,
        y: true,
        both: false
      },
      "false": {
        overflowX: "hidden",
        overflowY: "hidden",
        x: false,
        y: false,
        both: false
      },
      scroll: {
        overflowX: "hidden",
        overflowY: "scroll",
        x: false,
        y: true,
        both: false
      }
    },
    scroll: {
      auto: {
        overflowX: "scroll",
        overflowY: "auto",
        x: true,
        y: true,
        both: true
      },
      "false": {
        overflowX: "scroll",
        overflowY: "hidden",
        x: true,
        y: false,
        both: false
      },
      scroll: {
        overflowX: "scroll",
        overflowY: "scroll",
        x: true,
        y: true,
        both: true
      }
    },
    none: {
      overflowX: "",
      overflowY: "",
      x: false,
      y: false,
      both: false
    }
  },
  _scrollableCfg: {
    x: {
      x: true,
      y: false
    },
    y: {
      x: false,
      y: true
    },
    horizontal: {
      x: true,
      y: false
    },
    vertical: {
      x: false,
      y: true
    },
    both: {
      x: true,
      y: true
    },
    "true": {
      x: true,
      y: true
    }
  },
  validIdRe: Ext.validIdRe,
  constructor: function(a) {
    var g = this,
      c, f, h, e, k, d, b, j;
    a = a || {};
    if (a.initialConfig) {
      if (a.isAction) {
        g.baseAction = a
      }
      a = a.initialConfig
    } else {
      if (a.tagName || a.dom || Ext.isString(a)) {
        a = {
          applyTo: a,
          id: a.id || a
        }
      }
    }
    g.initialConfig = a;
    g.getId();
    g.protoEl = new Ext.util.ProtoElement();
    g.initConfig(a);
    if (g.scrollable == null) {
      k = g.autoScroll;
      if (k) {
        j = !!k
      } else {
        d = g.overflowX;
        b = g.overflowY;
        if (d || b) {
          j = {
            x: (d && d !== "hidden") ? d : false,
            y: (b && b !== "hidden") ? b : false
          }
        }
      }
      if (j) {
        g.setScrollable(j)
      }
    }
    h = g.xhooks;
    if (h) {
      delete g.xhooks;
      Ext.override(g, h)
    }
    g.mixins.elementCt.constructor.call(g);
    g.setupProtoEl();
    if (g.cls) {
      g.initialCls = g.cls;
      g.protoEl.addCls(g.cls)
    }
    if (g.style) {
      g.initialStyle = g.style;
      g.protoEl.setStyle(g.style)
    }
    g.renderData = g.renderData || {};
    g.initComponent();
    if (!g.preventRegister) {
      Ext.ComponentManager.register(g)
    }
    g.mixins.state.constructor.call(g);
    g.addStateEvents("resize");
    e = g.getController();
    if (e) {
      e.init(g)
    }
    if (g.plugins) {
      for (c = 0, f = g.plugins.length; c < f; c++) {
        g.plugins[c] = g.initPlugin(g.plugins[c])
      }
    }
    g.loader = g.getLoader();
    if (g.disabled) {
      g.disabled = false;
      g.disable(true)
    }
    if (g.renderTo) {
      g.render(g.renderTo)
    }
    if (g.autoShow && !g.$initParent) {
      g.show()
    }
    if (g.baseAction) {
      g.baseAction.addComponent(g)
    }
  },
  beforeInitConfig: function() {
    this.mixins.observable.constructor.call(this)
  },
  addCls: function(a) {
    var c = this,
      b = c.rendered ? c.el : c.protoEl;
    b.addCls.apply(b, arguments);
    return c
  },
  addClsWithUI: function(c, h) {
    var g = this,
      f = [],
      e = 0,
      d = g.uiCls = Ext.Array.clone(g.uiCls),
      b = g.activeUI,
      a, j;
    if (typeof c === "string") {
      c = (c.indexOf(" ") < 0) ? [c] : Ext.String.splitWords(c)
    }
    a = c.length;
    for (; e < a; e++) {
      j = c[e];
      if (j && !g.hasUICls(j)) {
        d.push(j);
        if (b) {
          f = f.concat(g.addUIClsToElement(j))
        }
      }
    }
    if (h !== true && b) {
      g.addCls(f)
    }
    return f
  },
  afterComponentLayout: function(c, a, b, e) {
    var d = this;
    if (++d.componentLayoutCounter === 1) {
      d.afterFirstLayout(c, a)
    }
    if (c !== b || a !== e) {
      d.onResize(c, a, b, e)
    }
    if (d.floating) {
      d.onAfterFloatLayout()
    }
  },
  addPlugin: function(b) {
    var a = this;
    b = a.constructPlugin(b);
    if (a.plugins) {
      a.plugins.push(b)
    } else {
      a.plugins = [b]
    }
    if (a.pluginsInitialized) {
      a.initPlugin(b)
    }
    return b
  },
  addPropertyToState: function(e, d, c) {
    var b = this,
      a = arguments.length;
    if (a === 3 || b.hasOwnProperty(d)) {
      if (a < 3) {
        c = b[d]
      }
      if (c !== b.initialConfig[d]) {
        (e || (e = {}))[d] = c
      }
    }
    return e
  },
  addUIClsToElement: function(h) {
    var e = this,
      b = e.baseCls + "-" + e.ui + "-" + h,
      a = ["x-" + h, e.baseCls + "-" + h, b],
      d, g, c, f;
    if (e.rendered && e.frame && !Ext.supports.CSS3BorderRadius) {
      b += "-";
      d = e.getChildEls();
      for (g in d) {
        f = d[g].frame;
        if (f && f !== true) {
          c = e[g];
          if (c) {
            c.addCls(b + f)
          }
        }
      }
    }
    return a
  },
  removeUIClsFromElement: function(h) {
    var e = this,
      b = e.baseCls + "-" + e.ui + "-" + h,
      a = ["x-" + h, e.baseCls + "-" + h, b],
      d, g, c, f;
    if (e.rendered && e.frame && !Ext.supports.CSS3BorderRadius) {
      b += "-";
      d = e.getChildEls();
      for (g in d) {
        f = d[g].frame;
        if (f && f !== true) {
          c = e[g];
          if (c) {
            c.removeCls(b + f)
          }
        }
      }
    }
    return a
  },
  adjustPosition: function(a, d) {
    var b = this,
      c;
    if (b.isContainedFloater()) {
      c = b.floatParent.getTargetEl().getViewRegion();
      a += c.left;
      d += c.top
    }
    return {
      x: a,
      y: d
    }
  },
  afterHide: function(a, c) {
    var d = this,
      b = d.focusableContainer;
    d.hiddenByLayout = null;
    if (this.ownerLayout) {
      this.updateLayout({
        isRoot: false
      })
    }
    Ext.callback(a, c || d);
    d.fireHierarchyEvent("hide");
    d.fireEvent("hide", d);
    if (b) {
      b.onFocusableChildHide(d)
    }
  },
  afterSetPosition: function(a, c) {
    var b = this;
    b.onPosition(a, c);
    if (b.hasListeners.move) {
      b.fireEvent("move", b, a, c)
    }
  },
  afterShow: function(g, b, e) {
    var f = this,
      h = f.el,
      a, c, d;
    g = f.getAnimateTarget(g);
    if (!f.ghost) {
      g = null
    }
    if (g) {
      c = {
        x: h.getX(),
        y: h.getY(),
        width: h.dom.offsetWidth,
        height: h.dom.offsetHeight
      };
      a = {
        x: g.getX(),
        y: g.getY(),
        width: g.dom.offsetWidth,
        height: g.dom.offsetHeight
      };
      h.addCls(f.offsetsCls);
      d = f.ghost();
      d.el.stopAnimation();
      d.setX(-10000);
      f.ghostBox = c;
      d.el.animate({
        from: a,
        to: c,
        listeners: {
          afteranimate: function() {
            delete d.componentLayout.lastComponentSize;
            f.unghost();
            delete f.ghostBox;
            h.removeCls(f.offsetsCls);
            f.onShowComplete(b, e)
          }
        }
      })
    } else {
      f.onShowComplete(b, e)
    }
    f.fireHierarchyEvent("show")
  },
  animate: function(c) {
    var s = this,
      f, k, j, a, d, b, r, o, l, e, p, m, g, n, q, i;
    c = c || {};
    d = c.to || {};
    if (Ext.fx.Manager.hasFxBlock(s.id)) {
      return s
    }
    f = Ext.isDefined(d.width);
    if (f) {
      a = Ext.Number.constrain(d.width, s.minWidth, s.maxWidth)
    }
    k = Ext.isDefined(d.height);
    if (k) {
      j = Ext.Number.constrain(d.height, s.minHeight, s.maxHeight)
    }
    if (!c.dynamic && (f || k)) {
      o = (c.from ? c.from.width : undefined) || s.getWidth();
      l = o;
      e = (c.from ? c.from.height : undefined) || s.getHeight();
      p = e;
      m = false;
      if (k && j > e) {
        p = j;
        m = true
      }
      if (f && a > o) {
        l = a;
        m = true
      }
      if (k || f) {
        i = s.el.getStyle("overflow");
        if (i !== "hidden") {
          s.el.setStyle("overflow", "hidden")
        }
      }
      if (m) {
        b = !Ext.isNumber(s.width);
        r = !Ext.isNumber(s.height);
        s.setSize(l, p);
        s.el.setSize(o, e);
        if (b) {
          delete s.width
        }
        if (r) {
          delete s.height
        }
      }
      if (f) {
        d.width = a
      }
      if (k) {
        d.height = j
      }
    }
    g = s.constrain;
    n = s.constrainHeader;
    if (g || n) {
      s.constrain = s.constrainHeader = false;
      q = c.callback;
      c.callback = function() {
        s.constrain = g;
        s.constrainHeader = n;
        if (q) {
          q.call(c.scope || s, arguments)
        }
        if (i !== "hidden") {
          s.el.setStyle("overflow", i)
        }
      }
    }
    return s.mixins.animate.animate.apply(s, arguments)
  },
  applyScrollable: function(b, d) {
    var a = this,
      f = a.rendered,
      e, c;
    if (b) {
      if (b === true || typeof b === "string") {
        e = a._scrollableCfg[b];
        b = e
      }
      if (d) {
        d.setConfig(b);
        b = d
      } else {
        b = Ext.Object.chain(b);
        if (f) {
          b.element = a.getOverflowEl();
          c = a.getScrollerEl();
          if (c) {
            b.innerElement = c
          }
        }
        b.autoRefresh = false;
        if (Ext.supports.touchScroll === 1) {
          b.translatable = {
            translationMethod: "scrollparent"
          };
          b.indicators = false
        }
        b = Ext.scroll.Scroller.create(b);
        b.component = a
      }
    } else {
      if (d) {
        d.setConfig({
          x: false,
          y: false
        });
        d.destroy()
      }
    }
    if (a.rendered && !a.destroying && !a.destroyed) {
      a.getOverflowStyle();
      a.updateLayout()
    }
    return b
  },
  beforeComponentLayout: function() {
    return true
  },
  beforeDestroy: Ext.emptyFn,
  beforeLayout: function() {
    if (this.floating) {
      this.onBeforeFloatLayout()
    }
  },
  beforeSetPosition: function(i, g, b) {
    var f = this,
      h = null,
      d, c, a, e;
    if (i) {
      if (Ext.isNumber(d = i[0])) {
        b = g;
        g = i[1];
        i = d
      } else {
        if ((d = i.x) !== undefined) {
          b = g;
          g = i.y;
          i = d
        }
      }
    }
    if (f.constrain || f.constrainHeader) {
      h = f.calculateConstrainedPosition(null, [i, g], true);
      if (h) {
        i = h[0];
        g = h[1]
      }
    }
    c = (i !== undefined);
    a = (g !== undefined);
    if (c || a) {
      f.x = i;
      f.y = g;
      e = f.adjustPosition(i, g);
      h = {
        x: e.x,
        y: e.y,
        anim: b,
        hasX: c,
        hasY: a
      }
    }
    return h
  },
  beforeShow: Ext.emptyFn,
  bubble: function(c, b, a) {
    var d = this;
    while (d) {
      if (c.apply(b || d, a || [d]) === false) {
        break
      }
      d = d.getBubbleTarget()
    }
    return this
  },
  clearListeners: function() {
    var a = this;
    a.mixins.observable.clearListeners.call(a);
    a.mixins.componentDelegation.clearDelegatedListeners.call(a)
  },
  cloneConfig: function(c) {
    c = c || {};
    var d = c.id || Ext.id(),
      a = Ext.applyIf(c, this.initialConfig),
      b;
    a.id = d;
    b = Ext.getClass(this);
    return new b(a)
  },
  destroy: function() {
    var f = this,
      c = f.renderSelectors,
      b = f.getConfig("viewModel", true),
      g = f.getConfig("session", true),
      a, e, d;
    if (!f.hasListeners.beforedestroy || f.fireEvent("beforedestroy", f) !==
      false) {
      f.isDestroying = f.destroying = true;
      e = f.floatParent || f.ownerCt;
      if (f.floating) {
        delete f.floatParent;
        if (f.zIndexManager) {
          f.zIndexManager.unregister(f);
          f.zIndexManager = null
        }
      }
      f.removeBindings();
      f.beforeDestroy();
      f.destroyBindable();
      if (e && e.remove) {
        e.remove(f, false)
      }
      f.stopAnimation();
      f.onDestroy();
      Ext.destroy(f.plugins);
      if (f.rendered) {
        Ext.Component.cancelLayout(f, true)
      }
      f.componentLayout = null;
      if (f.hasListeners.destroy) {
        f.fireEvent("destroy", f)
      }
      if (!f.preventRegister) {
        Ext.ComponentManager.unregister(f)
      }
      f.mixins.state.destroy.call(f);
      if (f.floating) {
        f.onFloatDestroy()
      }
      f.clearListeners();
      if (f.rendered) {
        if (!f.preserveElOnDestroy) {
          f.el.destroy()
        }
        f.el.component = null;
        f.mixins.elementCt.destroy.call(f);
        if (c) {
          for (a in c) {
            if (c.hasOwnProperty(a)) {
              d = f[a];
              if (d) {
                delete f[a];
                d.destroy()
              }
            }
          }
        }
        f.data = f.el = f.frameBody = f.rendered = f.afterRenderEvents =
          null;
        f.tpl = f.renderTpl = f.renderData = null;
        f.focusableContainer = f.container = f.scrollable = null
      }
      f.isDestroying = f.destroying = false;
      f.callParent()
    }
  },
  disable: function(c, e) {
    var d = this,
      b = d.focusableContainer,
      a = d.getInherited();
    if (!e) {
      a.disabled = true;
      d.savedDisabled = true
    }
    if (d.maskOnDisable) {
      a.disableMask = true
    }
    if (!d.disabled) {
      d.addCls(d.disabledCls);
      if (d.rendered) {
        d.onDisable()
      } else {
        d.disableOnRender = true
      }
      d.disabled = true;
      if (c !== true) {
        d.fireEvent("disable", d)
      }
      if (b) {
        b.onFocusableChildDisable(d)
      }
    }
    return d
  },
  doFireEvent: function(b, d, a) {
    var e = this,
      c = e.mixins.observable.doFireEvent.call(e, b, d, a);
    if (c !== false) {
      c = e.mixins.componentDelegation.doFireDelegatedEvent.call(e, b, d)
    }
    return c
  },
  enable: function(c, e) {
    var d = this,
      b = d.focusableContainer,
      a = d.getInherited();
    if (!e) {
      delete d.getInherited().disabled;
      d.savedDisabled = false
    }
    if (d.maskOnDisable) {
      delete a.disableMask
    }
    if (d.disabled) {
      if (!(e && a.hasOwnProperty("disabled"))) {
        d.disableOnRender = false;
        d.removeCls(d.disabledCls);
        if (d.rendered) {
          d.onEnable()
        }
        d.disabled = false;
        if (c !== true) {
          d.fireEvent("enable", d)
        }
        if (b) {
          b.onFocusableChildEnable(d)
        }
      }
    }
    return d
  },
  findParentBy: function(a) {
    var b;
    for (b = this.getRefOwner(); b && !a(b, this); b = b.getRefOwner()) {}
    return b || null
  },
  findParentByType: function(a) {
    return Ext.isFunction(a) ? this.findParentBy(function(b) {
      return b.constructor === a
    }) : this.up(a)
  },
  findPlugin: function(d) {
    var b, a = this.plugins,
      c = a && a.length;
    for (b = 0; b < c; b++) {
      if (a[b].ptype === d) {
        return a[b]
      }
    }
  },
  getAnimateTarget: function(a) {
    a = a || this.animateTarget;
    if (a) {
      a = a.isComponent ? a.getEl() : Ext.get(a)
    }
    return a || null
  },
  getBubbleTarget: function() {
    return this.getRefOwner()
  },
  getComponentLayout: function() {
    var a = this;
    if (!a.componentLayout || !a.componentLayout.isLayout) {
      a.setComponentLayout(Ext.layout.Layout.create(a.componentLayout,
        "autocomponent"))
    }
    return a.componentLayout
  },
  getEl: function() {
    return this.el
  },
  getHeight: function() {
    return this.el.getHeight()
  },
  initInheritedState: function(a) {
    var c = this,
      b = c.componentLayout;
    if (c.hidden) {
      a.hidden = true
    }
    if (c.collapseImmune) {
      a.collapseImmune = true
    }
    if (c.modelValidation !== undefined) {
      a.modelValidation = c.modelValidation
    }
    if (c.savedDisabled) {
      a.disabled = true
    }
    c.mixins.bindable.initInheritedState.call(c, a);
    if (b && b.initInheritedState) {
      b.initInheritedState(a)
    }
  },
  getId: function() {
    var a = this,
      b;
    if (!(a.id || (a.id = a.initialConfig.id))) {
      b = a.getXType();
      if (b) {
        b = b.replace(Ext.Component.INVALID_ID_CHARS_Re, "-")
      } else {
        b = Ext.name.toLowerCase() + "-comp"
      }
      a.id = b + "-" + a.getAutoId()
    }
    return a.id
  },
  getItemId: function() {
    return this.itemId || this.id
  },
  getLoader: function() {
    var b = this,
      a = b.loader;
    if (a) {
      if (!a.isLoader) {
        b.loader = new Ext.ComponentLoader(Ext.apply({
          target: b
        }, a))
      } else {
        a.setTarget(b)
      }
      return b.loader
    }
    return null
  },
  getMaskTarget: function() {
    return this.maskElement ? this[this.maskElement] : null
  },
  getPlugin: function(b) {
    var c, a = this.plugins,
      d = a && a.length;
    for (c = 0; c < d; c++) {
      if (a[c].pluginId === b) {
        return a[c]
      }
    }
    return null
  },
  getPosition: function(a) {
    var b = this,
      d, c = b.isContainedFloater(),
      e;
    if ((a === true) && !c) {
      return [b.getLocalX(), b.getLocalY()]
    }
    d = b.getXY();
    if ((a === true) && c) {
      e = b.floatParent.getTargetEl().getViewRegion();
      d[0] -= e.left;
      d[1] -= e.top
    }
    return d
  },
  getScrollX: function() {
    var a = this.getScrollable();
    return a ? a.getPosition().x : 0
  },
  getScrollY: function() {
    var a = this.getScrollable();
    return a ? a.getPosition().y : 0
  },
  getSize: function(a) {
    return this.el.getSize(a)
  },
  getSizeModel: function(j) {
    var n = this,
      a = Ext.layout.SizeModel,
      d = n.componentLayout.ownerContext,
      b = n.width,
      p = n.height,
      q, c, g, f, h, o, l, m, k, i, e = n.floating || n.floated;
    if (d) {
      i = d.widthModel;
      h = d.heightModel
    }
    if (!i || !h) {
      g = ((q = typeof b) === "number");
      f = ((c = typeof p) === "number");
      k = e || !(o = n.ownerLayout);
      if (k) {
        l = Ext.layout.Layout.prototype.autoSizePolicy;
        m = e ? 3 : n.shrinkWrap;
        if (g) {
          i = a.configured
        }
        if (f) {
          h = a.configured
        }
      } else {
        l = o.getItemSizePolicy(n, j);
        m = o.isItemShrinkWrap(n)
      }
      if (d) {
        d.ownerSizePolicy = l
      }
      m = (m === true) ? 3 : (m || 0);
      if (k && m) {
        if (b && q === "string") {
          m &= 2
        }
        if (p && c === "string") {
          m &= 1
        }
      }
      if (m !== 3) {
        if (!j) {
          j = n.ownerCt && n.ownerCt.getSizeModel()
        }
        if (j) {
          m |= (j.width.shrinkWrap ? 1 : 0) | (j.height.shrinkWrap ? 2 :
            0)
        }
      }
      if (!i) {
        if (!l.setsWidth) {
          if (g) {
            i = a.configured
          } else {
            i = (m & 1) ? a.shrinkWrap : a.natural
          }
        } else {
          if (l.readsWidth) {
            if (g) {
              i = a.calculatedFromConfigured
            } else {
              i = (m & 1) ? a.calculatedFromShrinkWrap : a.calculatedFromNatural
            }
          } else {
            i = a.calculated
          }
        }
      }
      if (!h) {
        if (!l.setsHeight) {
          if (f) {
            h = a.configured
          } else {
            h = (m & 2) ? a.shrinkWrap : a.natural
          }
        } else {
          if (l.readsHeight) {
            if (f) {
              h = a.calculatedFromConfigured
            } else {
              h = (m & 2) ? a.calculatedFromShrinkWrap : a.calculatedFromNatural
            }
          } else {
            h = a.calculated
          }
        }
      }
    }
    return i.pairsByHeightOrdinal[h.ordinal]
  },
  getState: function() {
    var b = this,
      c = null,
      a = b.getSizeModel();
    if (a.width.configured) {
      c = b.addPropertyToState(c, "width")
    }
    if (a.height.configured) {
      c = b.addPropertyToState(c, "height")
    }
    return c
  },
  getWidth: function() {
    return this.el.getWidth()
  },
  getXType: function() {
    return this.self.xtype
  },
  getXTypes: function() {
    var c = this.self,
      d, b, a;
    if (!c.xtypes) {
      d = [];
      b = this;
      while (b) {
        a = b.xtypes;
        if (a !== undefined) {
          d.unshift.apply(d, a)
        }
        b = b.superclass
      }
      c.xtypeChain = d;
      c.xtypes = d.join("/")
    }
    return c.xtypes
  },
  hasCls: function(a) {
    var b = this.rendered ? this.el : this.protoEl;
    return b.hasCls.apply(b, arguments)
  },
  hasUICls: function(a) {
    var b = this,
      c = b.uiCls || [];
    return Ext.Array.contains(c, a)
  },
  hide: function(d, a, b) {
    var c = this;
    if (c.pendingShow) {
      c.pendingShow = false
    }
    if (!(c.rendered && !c.isVisible())) {
      if (!c.hasListeners.beforehide || c.fireEvent("beforehide", c) !==
        false || c.hierarchicallyHidden) {
        c.getInherited().hidden = c.hidden = true;
        c.fireHierarchyEvent("beforehide");
        if (c.rendered) {
          c.onHide.apply(c, arguments)
        }
      }
    }
    return c
  },
  initComponent: function() {
    var c = this,
      b = c.width,
      a = c.height;
    if (c.plugins && !c.plugins.processed) {
      c.plugins = c.constructPlugins()
    }
    c.pluginsInitialized = true;
    if (b != null || a != null) {
      c.setSize(b, a)
    }
    if (c.listeners) {
      c.on(c.listeners);
      c.listeners = null
    }
    if (c.focusable) {
      c.initFocusable()
    }
  },
  initEvents: function() {
    var e = this,
      g = e.afterRenderEvents,
      b, d, f, c, a;
    if (g) {
      for (f in g) {
        d = e[f];
        if (d && d.on) {
          b = g[f];
          for (c = 0, a = b.length; c < a; ++c) {
            e.mon(d, b[c])
          }
        }
      }
    }
    if (e.focusable) {
      e.initFocusableEvents()
    }
  },
  is: function(a) {
    return Ext.ComponentQuery.is(this, a)
  },
  isDescendantOf: function(a) {
    var b;
    for (b = this.getRefOwner(); b && b !== a; b = b.getRefOwner()) {}
    return b || null
  },
  isAncestor: function(a) {
    while (a) {
      if (a.getRefOwner() === this) {
        return true
      }
      a = a.getRefOwner()
    }
  },
  isDisabled: function() {
    return this.disabled
  },
  isDraggable: function() {
    return !!this.draggable
  },
  isDroppable: function() {
    return !!this.droppable
  },
  isFloating: function() {
    return this.floating
  },
  isHidden: function() {
    return this.hidden
  },
  isHierarchicallyHidden: function() {
    var d = this,
      c = false,
      a, b;
    for (;
      (a = d.ownerCt || d.floatParent); d = a) {
      b = a.getInherited();
      if (b.hidden) {
        c = true;
        break
      }
      if (d.getInherited().collapseImmune) {
        if (a.collapsed && !d.collapseImmune) {
          c = true;
          break
        }
      } else {
        c = !!b.collapsed;
        break
      }
    }
    return c
  },
  isLayoutChild: function(a) {
    return !this.floating && !!this.up(a)
  },
  isLayoutRoot: function() {
    var a = this,
      b = a.ownerLayout;
    if (!b || a._isLayoutRoot || a.floating) {
      return true
    }
    return b.isItemLayoutRoot(a)
  },
  isLayoutSuspended: function() {
    var a = this,
      b;
    while (a) {
      if (a.layoutSuspendCount || a.suspendLayout) {
        return true
      }
      b = a.ownerLayout;
      if (!b) {
        break
      }
      a = b.owner
    }
    return false
  },
  isVisible: function(a) {
    var b = this,
      c;
    if (b.hidden || !b.rendered || b.destroyed) {
      c = true
    } else {
      if (a) {
        c = b.isHierarchicallyHidden()
      }
    }
    return !c
  },
  isXType: function(b, a) {
    return a ? (Ext.Array.indexOf(this.xtypes, b) !== -1) : !!this.xtypesMap[
      b]
  },
  isMasked: function(a) {
    var b = this;
    return !!(b.masked || (b.loadMask && b.loadMask.isVisible()) || (a &&
      b.getInherited().masked))
  },
  setMasked: function(c) {
    var b = this,
      a = b.focusableContainer;
    if (c) {
      b.masked = true;
      b.getInherited().masked = c
    } else {
      b.masked = false;
      delete b.getInherited().masked
    }
    if (a) {
      a.onFocusableChildMasked(b, c)
    }
    return b
  },
  mask: function(e, c, a) {
    var b = this.lastBox,
      d = this.getMaskTarget() || this.el;
    if (b) {
      a = b.height
    }
    d.mask(e, c, a);
    this.setMasked(true)
  },
  nextNode: function(d, h) {
    var b = this,
      c = b.ownerCt,
      j, e, g, f, a;
    if (h && b.is(d)) {
      return b
    }
    if (c) {
      for (e = c.items.items, f = Ext.Array.indexOf(e, b) + 1, g = e.length; f <
        g; f++) {
        a = e[f];
        if (a.is(d)) {
          return a
        }
        if (a.down) {
          j = a.down(d);
          if (j) {
            return j
          }
        }
      }
      return c.nextNode(d)
    }
    return null
  },
  nextSibling: function(b) {
    var f = this.ownerCt,
      d, e, a, g;
    if (f) {
      d = f.items;
      a = d.indexOf(this) + 1;
      if (a) {
        if (b) {
          for (e = d.getCount(); a < e; a++) {
            if ((g = d.getAt(a)).is(b)) {
              return g
            }
          }
        } else {
          if (a < d.getCount()) {
            return d.getAt(a)
          }
        }
      }
    }
    return null
  },
  onAdded: function(b, d, a) {
    var c = this;
    c.ownerCt = b;
    c.onInheritedAdd(c, a);
    if (c.hasListeners && c.hasListeners.added) {
      c.fireEvent("added", c, b, d)
    }
    if (Ext.GlobalEvents.hasListeners.added) {
      c.fireHierarchyEvent("added")
    }
  },
  onRemoved: function(b) {
    var a = this,
      c;
    if (Ext.GlobalEvents.hasListeners.removed) {
      a.fireHierarchyEvent("removed")
    }
    if (a.hasListeners.removed) {
      a.fireEvent("removed", a, a.ownerCt)
    }
    if (!b) {
      a.removeBindings()
    }
    a.onInheritedRemove(b);
    a.ownerCt = a.ownerLayout = null
  },
  onBoxReady: function(d, b) {
    var e = this,
      a = e.scrollable,
      c;
    if (e.ariaLabelledBy || e.ariaDescribedBy) {
      if (e.ariaLabelledBy) {
        c = e.getAriaLabelEl(e.ariaLabelledBy);
        if (c) {
          e.ariaEl.dom.setAttribute("aria-labelledby", c)
        }
      }
      if (e.ariaDescribedBy) {
        c = e.getAriaLabelEl(e.ariaDescribedBy);
        if (c) {
          e.ariaEl.dom.setAttribute("aria-describedby", c)
        }
      }
    }
    if (e.resizable) {
      e.initResizable(e.resizable)
    }
    if (e.draggable) {
      e.initDraggable()
    }
    if (a) {
      if (e.touchScroll && a.isTouchScroller) {
        a.setInnerElement(e.getScrollerEl())
      }
      a.setElement(e.getOverflowEl());
      if (Ext.isIE) {
        Ext.on("show", e.onGlobalShow, e)
      }
    }
    if (e.hasListeners.boxready) {
      e.fireEvent("boxready", e, d, b)
    }
  },
  onDestroy: function() {
    var b = this,
      a = b.focusableContainer;
    if (b.rendered) {
      Ext.destroy(b.dd, b.resizer, b.proxy, b.proxyWrap, b.resizerComponent,
        b.scrollable, b.contentEl)
    }
    if (a) {
      a.onFocusableChildDestroy(b)
    }
    if (b.focusable) {
      b.destroyFocusable()
    }
    Ext.destroy(b.componentLayout, b.loadMask, b.floatingDescendants)
  },
  onDisable: function() {
    var a = this,
      b, c;
    if (a.focusable) {
      a.disableFocusable()
    }
    if (!a.ariaStaticRoles[a.ariaRole]) {
      a.ariaEl.dom.setAttribute("aria-disabled", true)
    }
    if (a.maskOnDisable && !a.getInheritedConfig("disableMask", true)) {
      b = a.el.dom;
      c = b.nodeName;
      if (a.disabledRe.test(c)) {
        b.disabled = true
      }
      if (!a.nonMaskableRe.test(c)) {
        a.mask()
      }
    }
  },
  onEnable: function() {
    var a = this,
      b, c;
    if (a.focusable) {
      a.enableFocusable()
    }
    if (!a.ariaStaticRoles[a.ariaRole]) {
      a.ariaEl.dom.setAttribute("aria-disabled", false)
    }
    if (a.maskOnDisable && a.getInherited().hasOwnProperty("masked")) {
      b = a.el.dom;
      c = b.nodeName;
      if (a.disabledRe.test(c)) {
        b.disabled = false
      }
      if (!a.nonMaskableRe.test(c)) {
        a.unmask()
      }
    }
  },
  onGlobalShow: function(a) {
    if (this.up(a)) {
      this.getScrollable().restoreState()
    }
  },
  onHide: function(g, a, e) {
    var f = this,
      c, d, b;
    if (!f.ariaStaticRoles[f.ariaRole]) {
      f.ariaEl.dom.setAttribute("aria-hidden", true)
    }
    f.revertFocus();
    g = f.getAnimateTarget(g);
    if (!f.ghost) {
      g = null
    }
    if (g) {
      b = {
        x: g.getX(),
        y: g.getY(),
        width: g.dom.offsetWidth,
        height: g.dom.offsetHeight
      };
      c = f.ghost();
      c.el.stopAnimation();
      d = f.getSize();
      c.el.animate({
        to: b,
        listeners: {
          afteranimate: function() {
            delete c.componentLayout.lastComponentSize;
            c.el.hide();
            c.setHiddenState(true);
            c.el.setSize(d);
            f.afterHide(a, e)
          }
        }
      })
    }
    f.el.hide();
    if (!g) {
      f.afterHide(a, e)
    }
  },
  onPosition: Ext.emptyFn,
  onResize: function(c, a, b, e) {
    var d = this;
    if (d.floating && d.constrain) {
      d.doConstrain()
    }
    if (b) {
      d.refreshScroll()
    }
    if (d.hasListeners.resize) {
      d.fireEvent("resize", d, c, a, b, e)
    }
  },
  onShow: function() {
    var a = this;
    if (!a.ariaStaticRoles[a.ariaRole]) {
      a.ariaEl.dom.setAttribute("aria-hidden", false)
    }
    a.el.show();
    a.updateLayout({
      isRoot: false
    });
    if (a.floating) {
      if (a.maximized) {
        a.fitContainer()
      } else {
        if (a.constrain) {
          a.doConstrain()
        }
      }
    }
  },
  onShowComplete: function(a, c) {
    var d = this,
      b = d.focusableContainer;
    if (d.floating) {
      d.onFloatShow()
    }
    Ext.callback(a, c || d);
    d.fireEvent("show", d);
    if (b) {
      b.onFocusableChildShow(d)
    }
    delete d.hiddenByLayout
  },
  onShowVeto: Ext.emptyFn,
  previousNode: function(b, d) {
    var h = this,
      g = h.ownerCt,
      a, f, e, c;
    if (d && h.is(b)) {
      return h
    }
    if (g) {
      for (f = g.items.items, e = Ext.Array.indexOf(f, h) - 1; e > -1; e--) {
        c = f[e];
        if (c.query) {
          a = c.query(b);
          a = a[a.length - 1];
          if (a) {
            return a
          }
        }
        if (c.is(b)) {
          return c
        }
      }
      return g.previousNode(b, true)
    }
    return null
  },
  previousSibling: function(b) {
    var e = this.ownerCt,
      d, a, f;
    if (e) {
      d = e.items;
      a = d.indexOf(this);
      if (a !== -1) {
        if (b) {
          for (--a; a >= 0; a--) {
            if ((f = d.getAt(a)).is(b)) {
              return f
            }
          }
        } else {
          if (a) {
            return d.getAt(--a)
          }
        }
      }
    }
    return null
  },
  registerFloatingItem: function(b) {
    var a = this;
    if (!a.floatingDescendants) {
      a.floatingDescendants = new Ext.ZIndexManager(a)
    }
    a.floatingDescendants.register(b)
  },
  removeCls: function(a) {
    var c = this,
      b = c.rendered ? c.el : c.protoEl;
    b.removeCls.apply(b, arguments);
    return c
  },
  removeClsWithUI: function(d, k) {
    var j = this,
      h = [],
      f = 0,
      a = Ext.Array,
      g = a.remove,
      e = j.uiCls = a.clone(j.uiCls),
      c = j.activeUI,
      b, l;
    if (typeof d === "string") {
      d = (d.indexOf(" ") < 0) ? [d] : Ext.String.splitWords(d)
    }
    b = d.length;
    for (f = 0; f < b; f++) {
      l = d[f];
      if (l && j.hasUICls(l)) {
        g(e, l);
        if (c) {
          h = h.concat(j.removeUIClsFromElement(l))
        }
      }
    }
    if (k !== true && c) {
      j.removeCls(h)
    }
    return h
  },
  resumeLayouts: function(b) {
    var a = this;
    if (!a.rendered) {
      return
    }
    if (a.layoutSuspendCount && !--a.layoutSuspendCount) {
      a.suspendLayout = false;
      if (b && !a.isLayoutSuspended()) {
        a.updateLayout(b)
      }
    }
  },
  scrollBy: function(c, b, d) {
    var a = this.getScrollable();
    if (a) {
      a.scrollBy(c, b, d)
    }
  },
  scrollTo: function(b, d, c) {
    var a = this.getScrollable();
    if (a) {
      a.scrollTo(b, d, c)
    }
  },
  setAutoScroll: function(a) {
    this.setScrollable(!!a);
    return this
  },
  setBorder: function(b, d) {
    var c = this,
      a = !!d;
    if (c.rendered || a) {
      if (!a) {
        d = c.el
      }
      if (!b) {
        b = 0
      } else {
        if (b === true) {
          b = "1px"
        } else {
          b = this.unitizeBox(b)
        }
      }
      d.setStyle("border-width", b);
      if (!a) {
        c.updateLayout()
      }
    }
    c.border = b
  },
  setDock: function(c) {
    var b = this,
      a = b.ownerCt;
    if (c !== b.dock) {
      if (a && a.moveDocked) {
        a.moveDocked(b, c)
      } else {
        b.dock = c
      }
    }
    return b
  },
  setDisabled: function(a) {
    return this[a ? "disable" : "enable"]()
  },
  setFlex: function(a) {
    this.flex = a
  },
  setHeight: function(a) {
    return this.setSize(undefined, a)
  },
  setLoading: function(c, d) {
    var b = this,
      a = {
        target: b
      };
    if (b.rendered) {
      if (c !== false) {
        if (Ext.isString(c)) {
          a.msg = c
        } else {
          Ext.apply(a, c)
        }
        if (!b.loadMask || !b.loadMask.isLoadMask) {
          if (d && a.useTargetEl == null) {
            a.useTargetEl = true
          }
          b.loadMask = new Ext.LoadMask(a)
        } else {
          Ext.apply(b.loadMask, a)
        }
        if (b.loadMask.isVisible()) {
          b.loadMask.syncMaskState()
        } else {
          b.loadMask.show()
        }
      } else {
        if (b.loadMask && b.loadMask.isLoadMask) {
          b.loadMask.hide()
        }
      }
    }
    return b.loadMask
  },
  setMargin: function(c, b) {
    var a = this;
    if (a.rendered) {
      if (!c && c !== 0) {
        c = ""
      } else {
        if (c === true) {
          c = 5
        }
        c = this.unitizeBox(c)
      }
      a.margin = c;
      a.margin$ = null;
      a.getEl().setStyle("margin", c);
      if (!b) {
        a.updateLayout(a._notAsLayoutRoot)
      }
    } else {
      a.margin = c
    }
  },
  setOverflowXY: function(b, a) {
    this.setScrollable({
      x: (b && b !== "hidden") ? b : false,
      y: (a && a !== "hidden") ? a : false
    });
    return this
  },
  setPagePosition: function(a, f, b) {
    var c = this,
      d, e;
    if (Ext.isArray(a)) {
      f = a[1];
      a = a[0]
    }
    c.pageX = a;
    c.pageY = f;
    if (c.floating) {
      if (c.isContainedFloater()) {
        e = c.floatParent.getTargetEl().getViewRegion();
        if (Ext.isNumber(a) && Ext.isNumber(e.left)) {
          a -= e.left
        }
        if (Ext.isNumber(f) && Ext.isNumber(e.top)) {
          f -= e.top
        }
      } else {
        d = c.el.translateXY(a, f);
        a = d.x;
        f = d.y
      }
      c.setPosition(a, f, b)
    } else {
      d = c.el.translateXY(a, f);
      c.setPosition(d.x, d.y, b)
    }
    return c
  },
  setPosition: function(a, e, b) {
    var c = this,
      d = c.beforeSetPosition.apply(c, arguments);
    if (d && c.rendered) {
      a = d.x;
      e = d.y;
      if (b) {
        if (a !== c.getLocalX() || e !== c.getLocalY()) {
          c.stopAnimation();
          c.animate(Ext.apply({
            duration: 1000,
            listeners: {
              afteranimate: Ext.Function.bind(c.afterSetPosition, c, [
                a, e
              ])
            },
            to: {
              left: a,
              top: e
            }
          }, b))
        }
      } else {
        c.setLocalXY(a, e);
        c.afterSetPosition(a, e)
      }
    }
    return c
  },
  setScrollX: function(b, c) {
    var a = this.getScrollable();
    if (a) {
      a.scrollTo(b, null, c)
    }
  },
  setScrollY: function(c, b) {
    var a = this.getScrollable();
    if (a) {
      a.scrollTo(null, c, b)
    }
  },
  setSize: function(d, a) {
    var e = this,
      b = e.width,
      g = e.height,
      f, c;
    if (d && typeof d === "object") {
      a = d.height;
      d = d.width
    }
    if (typeof d === "number") {
      e.width = Ext.Number.constrain(d, e.minWidth, e.maxWidth)
    } else {
      if (d === null) {
        delete e.width
      } else {
        if (typeof d === "string") {
          f = true;
          e.width = d
        }
      }
    }
    if (typeof a === "number") {
      e.height = Ext.Number.constrain(a, e.minHeight, e.maxHeight)
    } else {
      if (a === null) {
        delete e.height
      } else {
        if (typeof a === "string") {
          c = true;
          e.height = a
        }
      }
    }
    if (e.rendered && e.isVisible()) {
      if (b !== e.width || g !== e.height) {
        if (e.liquidLayout || f || c) {
          e.el.setSize(e.width, e.height)
        }
        e.updateLayout(e._notAsLayoutRoot)
      }
    }
    return e
  },
  setStyle: function(c, b) {
    var a = this.el || this.protoEl;
    a.setStyle(c, b);
    return this
  },
  setUI: function(c) {
    var b = this,
      e = b.uiCls,
      d = b.activeUI,
      a;
    if (c === d) {
      return
    }
    if (d) {
      a = b.removeClsWithUI(e, true);
      if (a.length) {
        b.removeCls(a)
      }
      b.removeUIFromElement()
    } else {
      b.uiCls = []
    }
    b.ui = c;
    b.activeUI = c;
    b.addUIToElement();
    a = b.addClsWithUI(e, true);
    if (a.length) {
      b.addCls(a)
    }
    if (b.rendered) {
      b.updateLayout()
    }
  },
  setVisible: function(a) {
    return this[a ? "show" : "hide"]()
  },
  setHidden: function(a) {
    return this.setVisible(!a)
  },
  setWidth: function(a) {
    return this.setSize(a)
  },
  show: function(d, a, b) {
    var c = this,
      e = c.rendered;
    if (c.hierarchicallyHidden || (c.floating && !e && c.isHierarchicallyHidden())) {
      if (!e) {
        c.initHierarchyEvents()
      }
      if (arguments.length > 1) {
        arguments[0] = null;
        c.pendingShow = arguments
      } else {
        c.pendingShow = true
      }
    } else {
      if (e && c.isVisible()) {
        if (c.floating) {
          c.onFloatShow()
        }
      } else {
        if (c.fireEvent("beforeshow", c) !== false) {
          c.hidden = false;
          delete this.getInherited().hidden;
          Ext.suspendLayouts();
          if (!e && (c.autoRender || c.floating)) {
            c.doAutoRender();
            e = c.rendered
          }
          if (e) {
            c.beforeShow();
            Ext.resumeLayouts();
            c.onShow.apply(c, arguments);
            c.afterShow.apply(c, arguments)
          } else {
            Ext.resumeLayouts(true)
          }
        } else {
          c.onShowVeto()
        }
      }
    }
    return c
  },
  showAt: function(a, d, b) {
    var c = this;
    if (!c.rendered && (c.autoRender || c.floating)) {
      c.x = a;
      c.y = d;
      return c.show()
    }
    if (c.floating) {
      c.setPosition(a, d, b)
    } else {
      c.setPagePosition(a, d, b)
    }
    c.show()
  },
  showBy: function(b, d, c) {
    var a = this;
    if (a.floating && b) {
      a.alignTarget = b;
      if (d) {
        a.defaultAlign = d
      }
      if (c) {
        a.alignOffset = c
      }
      a.show();
      if (!a.hidden) {
        a.alignTo(b, d || a.defaultAlign, c || a.alignOffset)
      }
    }
    return a
  },
  suspendLayouts: function() {
    var a = this;
    if (!a.rendered) {
      return
    }
    if (++a.layoutSuspendCount === 1) {
      a.suspendLayout = true
    }
  },
  unitizeBox: function(a) {
    return Ext.Element.unitizeBox(a)
  },
  unmask: function() {
    (this.getMaskTarget() || this.el).unmask();
    this.setMasked(false)
  },
  unregisterFloatingItem: function(b) {
    var a = this;
    if (a.floatingDescendants) {
      a.floatingDescendants.unregister(b)
    }
  },
  up: function(d, e) {
    var c = this.getRefOwner(),
      b = typeof e === "string",
      g = typeof e === "number",
      a = e && e.isComponent,
      f = 0;
    if (d) {
      for (; c; c = c.getRefOwner()) {
        f++;
        if (d.isComponent) {
          if (c === d) {
            return c
          }
        } else {
          if (Ext.ComponentQuery.is(c, d)) {
            return c
          }
        }
        if (b && c.is(e)) {
          return
        }
        if (g && f === e) {
          return
        }
        if (a && c === e) {
          return
        }
      }
    }
    return c
  },
  update: function(c, f, i) {
    var h = this,
      j = (h.tpl && !Ext.isString(c)),
      g = h.getScrollable(),
      b = h.focusableContainer,
      e, a, d;
    if (j) {
      h.data = (c && c.isEntity) ? c.getData(true) : c
    } else {
      h.html = Ext.isObject(c) ? Ext.DomHelper.markup(c) : c
    }
    if (h.rendered) {
      e = h.getSizeModel();
      a = e.width.shrinkWrap || e.height.shrinkWrap;
      if (h.isContainer) {
        d = h.layout.getRenderTarget();
        a = a || h.items.items.length > 0
      } else {
        d = h.touchScroll ? h.getScrollerEl() : h.getTargetEl()
      }
      if (j) {
        h.tpl[h.tplWriteMode](d, h.data || {})
      } else {
        d.setHtml(h.html, f, i)
      }
      if (a) {
        h.updateLayout()
      }
      if (g) {
        g.refresh(true)
      }
      if (b) {
        b.onFocusableChildUpdate(h)
      }
    }
  },
  setHtml: function(a) {
    this.update(a)
  },
  applyData: function(a) {
    this.update(a)
  },
  updateBox: function(a) {
    this.setSize(a.width, a.height);
    this.setPagePosition(a.x, a.y);
    return this
  },
  _asLayoutRoot: {
    isRoot: true
  },
  _notAsLayoutRoot: {
    isRoot: false
  },
  updateLayout: function(c) {
    var d = this,
      e, b = d.lastBox,
      a = c && c.isRoot;
    if (b) {
      b.invalid = true
    }
    if (!d.rendered || d.layoutSuspendCount || d.suspendLayout) {
      return
    }
    if (d.hidden) {
      Ext.Component.cancelLayout(d)
    } else {
      if (typeof a !== "boolean") {
        a = d.isLayoutRoot()
      }
    }
    if (a || !d.ownerLayout || !d.ownerLayout.onContentChange(d)) {
      if (!d.isLayoutSuspended()) {
        e = (c && c.hasOwnProperty("defer")) ? c.defer : d.deferLayouts;
        Ext.Component.updateLayout(d, e)
      }
    }
  },
  updateMaxHeight: function(b, a) {
    this.changeConstraint(b, a, "min", "max-height", "height")
  },
  updateMaxWidth: function(b, a) {
    this.changeConstraint(b, a, "min", "max-width", "width")
  },
  updateMinHeight: function(b, a) {
    this.changeConstraint(b, a, "max", "min-height", "height")
  },
  updateMinWidth: function(a, b) {
    this.changeConstraint(a, b, "max", "min-width", "width")
  },
  getAnchorToXY: function(d, a, c, b) {
    return d.getAnchorXY(a, c, b)
  },
  getBorderPadding: function() {
    return this.el.getBorderPadding()
  },
  getLocalX: function() {
    return this.el.getLocalX()
  },
  getLocalXY: function() {
    return this.el.getLocalXY()
  },
  getLocalY: function() {
    return this.el.getLocalY()
  },
  getX: function() {
    return this.el.getX()
  },
  getXY: function() {
    return this.el.getXY()
  },
  getY: function() {
    return this.el.getY()
  },
  setLocalX: function(a) {
    this.el.setLocalX(a)
  },
  setLocalXY: function(a, b) {
    this.el.setLocalXY(a, b)
  },
  setLocalY: function(a) {
    this.el.setLocalY(a)
  },
  setX: function(a, b) {
    this.el.setX(a, b)
  },
  setXY: function(b, a) {
    this.el.setXY(b, a)
  },
  setY: function(b, a) {
    this.el.setY(b, a)
  },
  privates: {
    addOverCls: function() {
      var a = this;
      if (!a.disabled) {
        a.el.addCls(a.overCls)
      }
    },
    addUIToElement: function() {
      var d = this,
        a = d.baseCls + "-" + d.ui,
        c, f, b, e;
      d.addCls(a);
      if (d.rendered && d.frame && !Ext.supports.CSS3BorderRadius) {
        a += "-";
        c = d.getChildEls();
        for (f in c) {
          e = c[f].frame;
          if (e && e !== true) {
            b = d[f];
            if (b) {
              b.addCls(a + e)
            }
          }
        }
      }
    },
    changeConstraint: function(g, c, a, e, b) {
      var f = this,
        d = f[b];
      if (g != null && typeof d === "number") {
        f[b] = Math[a](d, g)
      }
      if (f.liquidLayout) {
        if (g != null) {
          f.setStyle(e, g + "px")
        } else {
          if (c) {
            f.setStyle(e, "")
          }
        }
      }
      if (f.rendered) {
        f.updateLayout()
      }
    },
    constructPlugin: function(b) {
      var a = this;
      if (typeof b === "string") {
        b = Ext.PluginManager.create({}, b, a)
      } else {
        b = Ext.PluginManager.create(b, null, a)
      }
      return b
    },
    constructPlugins: function() {
      var e = this,
        c = e.plugins,
        b, d, a;
      if (c) {
        b = [];
        b.processed = true;
        if (!Ext.isArray(c)) {
          c = [c]
        }
        for (d = 0, a = c.length; d < a; d++) {
          b[d] = e.constructPlugin(c[d])
        }
      }
      e.pluginsInitialized = true;
      return b
    },
    detachFromBody: function() {
      Ext.getDetachedBody().appendChild(this.el);
      Ext.Component.cancelLayout(this);
      this.isDetached = true
    },
    doAddListener: function(d, k, l, n, b, a, e) {
      var j = this,
        i, g, c, m, f, h;
      if (Ext.isObject(k) || (n && n.element)) {
        if (n.element) {
          m = n.element;
          i = {};
          i[d] = k;
          if (l) {
            i.scope = l
          }
          c = j.$elementEventOptions;
          for (g in n) {
            if (c[g]) {
              i[g] = n[g]
            }
          }
        } else {
          i = k;
          m = d
        }
        f = j[m];
        if (f && f.isObservable) {
          j.mon(f, i)
        } else {
          j.afterRenderEvents = j.afterRenderEvents || {};
          if (!j.afterRenderEvents[m]) {
            j.afterRenderEvents[m] = []
          }
          j.afterRenderEvents[m].push(i)
        }
        return
      }
      if (n) {
        h = n.delegate;
        if (h) {
          j.mixins.componentDelegation.addDelegatedListener.call(j, d, k,
            l, n, b, a, e);
          return
        }
      }
      j.mixins.observable.doAddListener.call(j, d, k, l, n, b, a, e)
    },
    doRemoveListener: function(a, c, b) {
      var d = this;
      d.mixins.observable.doRemoveListener.call(d, a, c, b);
      d.mixins.componentDelegation.removeDelegatedListener.call(d, a, c,
        b)
    },
    fireHierarchyEvent: function(b) {
      var a = Ext.GlobalEvents;
      if (a.hasListeners[b]) {
        a.fireEvent(b, this)
      }
    },
    getActionEl: function() {
      return this.el
    },
    getAutoId: function() {
      this.autoGenId = true;
      return ++Ext.Component.AUTO_ID
    },
    getContentTarget: function() {
      return this.el
    },
    getDragEl: function() {
      return this.el
    },
    getOverflowEl: function() {
      return this.getTargetEl()
    },
    getOverflowStyle: function() {
      var d = this,
        b = d.getScrollable(),
        c = d._scrollFlags,
        a, f, e;
      if (b) {
        a = b.getX();
        if (a === true) {
          a = "auto"
        }
        f = b.getY();
        if (f === true) {
          f = "auto"
        }
        e = c[a][f]
      } else {
        e = c.none
      }
      d.scrollFlags = e;
      return {
        overflowX: e.overflowX,
        overflowY: e.overflowY
      }
    },
    getPlugins: function() {
      var a = this.plugins;
      a = (a && a.processed) ? a : this.constructPlugins();
      return a || null
    },
    getProxy: function() {
      var a = this,
        b;
      if (!a.proxy) {
        b = Ext.getBody();
        a.proxy = a.el.createProxy("x-proxy-el", b, true)
      }
      return a.proxy
    },
    getScrollerEl: function() {
      var a = this;
      return a.scrollerEl || (a.scrollerEl = a.componentLayout.getScrollerEl() ||
        a.getOverflowEl().child(a.scrollerSelector))
    },
    getTargetEl: function() {
      return this.frameBody || this.el
    },
    getTdCls: function() {
      return "x-" + this.getTdType() + "-" + this.ui + "-cell"
    },
    getTdType: function() {
      return this.xtype
    },
    getTpl: function(a) {
      return Ext.XTemplate.getTpl(this, a)
    },
    initCls: function() {
      var b = this,
        a = [b.baseCls],
        c = b.getComponentLayout().targetCls;
      if (c) {
        a.push(c)
      }
      if (b.componentCls) {
        a.push(b.componentCls)
      } else {
        b.componentCls = b.baseCls
      }
      return a
    },
    initDraggable: function() {
      var c = this,
        a = (c.resizer && c.resizer.el !== c.el) ? c.resizerComponent =
        new Ext.Component({
          el: c.resizer.el,
          rendered: true,
          container: c.container
        }) : c,
        b = Ext.applyIf({
          el: a.getDragEl(),
          constrainTo: (c.constrain || c.draggable.constrain) ? (c.constrainTo ||
            (c.floatParent ? c.floatParent.getTargetEl() : c.container)
          ) : undefined
        }, c.draggable);
      if (c.constrain || c.constrainDelegate) {
        b.constrain = c.constrain;
        b.constrainDelegate = c.constrainDelegate
      }
      c.dd = new Ext.util.ComponentDragger(a, b)
    },
    initPadding: function(c) {
      var a = this,
        b = a.padding;
      if (b != null) {
        if (a.touchScroll || (a.layout && a.layout.managePadding && a.contentPaddingProperty ===
            "padding")) {
          c.setStyle("padding", 0)
        } else {
          c.setStyle("padding", this.unitizeBox((b === true) ? 5 : b))
        }
      }
    },
    initPlugin: function(a) {
      a.init(this);
      return a
    },
    initResizable: function(a) {
      var b = this;
      a = Ext.apply({
        target: b,
        dynamic: false,
        constrainTo: (b.constrain || (a && a.constrain)) ? (b.constrainTo ||
          (b.floatParent ? b.floatParent.getTargetEl() : b.container)
        ) : undefined,
        handles: b.resizeHandles
      }, a);
      a.target = b;
      b.resizer = new Ext.resizer.Resizer(a)
    },
    initStyles: function(j) {
      var f = this,
        d = f.margin,
        e = f.border,
        k = f.cls,
        a = f.style,
        h = f.x,
        g = f.y,
        c = f.liquidLayout,
        b, i;
      f.initPadding(j);
      if (d != null) {
        j.setStyle("margin", this.unitizeBox((d === true) ? 5 : d))
      }
      if (e != null) {
        f.setBorder(e, j)
      }
      if (k && k !== f.initialCls) {
        j.addCls(k);
        f.cls = f.initialCls = null
      }
      if (a && a !== f.initialStyle) {
        j.setStyle(a);
        f.style = f.initialStyle = null
      }
      if (h != null) {
        j.setStyle(f.horizontalPosProp, (typeof h === "number") ? (h +
          "px") : h)
      }
      if (g != null) {
        j.setStyle("top", (typeof g === "number") ? (g + "px") : g)
      }
      if (!f.ownerCt || f.floating) {
        if (Ext.scopeCss) {
          j.addCls(f.rootCls)
        }
        j.addCls(f.borderBoxCls)
      }
      if (c || !f.getFrameInfo()) {
        b = f.width;
        i = f.height;
        if (b != null) {
          if (typeof b === "number") {
            j.setStyle("width", b + "px")
          } else {
            j.setStyle("width", b)
          }
        }
        if (i != null) {
          if (typeof i === "number") {
            j.setStyle("height", i + "px")
          } else {
            j.setStyle("height", i)
          }
        }
      }
    },
    isContainedFloater: function() {
      return (this.floating && this.floatParent)
    },
    isDescendant: function(a) {
      if (a.isContainer) {
        for (var b = this.ownerCt; b; b = b.ownerCt) {
          if (b === a) {
            return true
          }
        }
      }
      return false
    },
    owns: function(b) {
      var a = false,
        c;
      if (b.isEvent) {
        b = b.target
      } else {
        if (b.isElement) {
          b = b.dom
        }
      }
      c = Ext.Component.fromElement(b);
      if (c) {
        a = (c === this) || (!!c.up(this))
      }
      return a
    },
    parseBox: function(a) {
      return Ext.Element.parseBox(a)
    },
    reattachToBody: function() {
      this.isDetached = false
    },
    refreshScroll: function() {
      var a = this.getScrollable();
      if (a) {
        a.refresh()
      }
    },
    removeManagedListenerItem: function(b, a, h, d, f, e) {
      var g = this,
        c = a.options ? a.options.element : null;
      if (c) {
        c = g[c];
        if (c && c.un) {
          if (b || (a.item === h && a.ename === d && (!f || a.fn === f) &&
              (!e || a.scope === e))) {
            c.un(a.ename, a.fn, a.scope);
            if (!b) {
              Ext.Array.remove(g.managedListeners, a)
            }
          }
        }
      } else {
        return g.mixins.observable.removeManagedListenerItem.apply(g,
          arguments)
      }
    },
    removeOverCls: function() {
      this.el.removeCls(this.overCls)
    },
    removePlugin: function(a) {
      Ext.Array.remove(this.plugins, a);
      a.destroy()
    },
    removeUIFromElement: function() {
      var d = this,
        a = d.baseCls + "-" + d.ui,
        c, f, b, e;
      d.removeCls(a);
      if (d.rendered && d.frame && !Ext.supports.CSS3BorderRadius) {
        a += "-";
        c = d.getChildEls();
        for (f in c) {
          e = c[f].frame;
          if (e && e !== true) {
            b = d[f];
            if (b) {
              b.removeCls(a + e)
            }
          }
        }
      }
    },
    setComponentLayout: function(b) {
      var a = this.componentLayout;
      if (a && a.isLayout && a !== b) {
        a.setOwner(null)
      }
      this.componentLayout = b;
      b.setOwner(this)
    },
    setHiddenState: function(d) {
      var c = this,
        b = c.getInherited(),
        a = c.zIndexManager;
      c.hidden = d;
      if (d) {
        b.hidden = true
      } else {
        delete b.hidden
      }
      if (a) {
        a.onComponentShowHide(c)
      }
    },
    setupProtoEl: function() {
      var a = this.initCls();
      this.protoEl.addCls(a)
    },
    wrapPrimaryEl: function(c) {
      var b = this,
        a = b.el;
      if (!a || !a.isElement) {
        b.el = Ext.get(c)
      }
      if (b.floating) {
        this.mixins.floating.constructor.call(this)
      }
    }
  },
  deprecated: {
    5: {
      methods: {
        addClass: "addCls",
        doComponentLayout: function() {
          this.updateLayout();
          return this
        },
        removeClass: "removeCls",
        forceComponentLayout: "updateLayout",
        setDocked: "setDock"
      }
    }
  }
}, 1, ["component", "box"], ["component", "box"], {
  component: true,
  box: true
}, ["widget.box", "widget.component"], [
  [Ext.mixin.Inheritable.prototype.mixinId || Ext.mixin.Inheritable.$className,
    Ext.mixin.Inheritable
  ],
  [Ext.util.Floating.prototype.mixinId || Ext.util.Floating.$className, Ext
    .util.Floating
  ],
  [Ext.util.Positionable.prototype.mixinId || Ext.util.Positionable.$className,
    Ext.util.Positionable
  ],
  [Ext.util.Observable.prototype.mixinId || Ext.util.Observable.$className,
    Ext.util.Observable
  ],
  [Ext.mixin.ComponentDelegation.prototype.mixinId || Ext.mixin.ComponentDelegation
    .$className, Ext.mixin.ComponentDelegation
  ],
  [Ext.mixin.Bindable.prototype.mixinId || Ext.mixin.Bindable.$className,
    Ext.mixin.Bindable
  ],
  [Ext.util.Animate.prototype.mixinId || Ext.util.Animate.$className, Ext.util
    .Animate
  ],
  [Ext.util.ElementContainer.prototype.mixinId || Ext.util.ElementContainer
    .$className, Ext.util.ElementContainer
  ],
  [Ext.util.Renderable.prototype.mixinId || Ext.util.Renderable.$className,
    Ext.util.Renderable
  ],
  [Ext.state.Stateful.prototype.mixinId || Ext.state.Stateful.$className,
    Ext.state.Stateful
  ],
  [Ext.util.Focusable.prototype.mixinId || Ext.util.Focusable.$className,
    Ext.util.Focusable
  ],
  [Ext.mixin.Accessible.prototype.mixinId || Ext.mixin.Accessible.$className,
    Ext.mixin.Accessible
  ],
  [Ext.util.KeyboardInteractive.prototype.mixinId || Ext.util.KeyboardInteractive
    .$className, Ext.util.KeyboardInteractive
  ]
], [Ext, "Component", Ext, "AbstractComponent"], function(b) {
  var a = b.prototype;
  (a.$elementEventOptions = Ext.Object.chain(Ext.Element.prototype.$eventOptions))
  .element = 1;
  (a.$eventOptions = Ext.Object.chain(a.$eventOptions)).delegate = 1;
  b.createAlias({
    on: "addListener",
    prev: "previousSibling",
    next: "nextSibling"
  });
  Ext.resumeLayouts = function(c) {
    b.resumeLayouts(c)
  };
  Ext.suspendLayouts = function() {
    b.suspendLayouts()
  };
  Ext.batchLayouts = function(d, c) {
    b.suspendLayouts();
    d.call(c);
    b.resumeLayouts(true)
  };
  Ext.setGlyphFontFamily = function(c) {
    Ext._glyphFontFamily = c
  };
  b.hierarchyEventSource = a.hierarchyEventSource = Ext.GlobalEvents;
  Ext.onReady(function() {
    if (Ext.supports.HighContrastMode) {
      Ext.getBody().addCls(b.ariaHighContrastModeCls)
    }
  })
}));
Ext.define("Ext.theme.neptune.Component", {
  override: "Ext.Component",
  initComponent: function() {
    arguments.callee.$previous.call(this);
    if (this.dock && this.border === undefined) {
      this.border = false
    }
  },
  privates: {
    initStyles: function() {
      var c = this,
        b = c.hasOwnProperty("border"),
        a = c.border;
      if (c.dock) {
        c.border = null
      }
      arguments.callee.$previous.apply(this, arguments);
      if (b) {
        c.border = a
      } else {
        delete c.border
      }
    }
  }
}, function() {
  Ext.namespace("Ext.theme.is").Neptune = true;
  Ext.theme.name = "Neptune"
});
Ext.define("Ext.theme.crisp.Component", {
  override: "Ext.Component"
}, function() {
  Ext.namespace("Ext.theme.is").Crisp = true;
  Ext.theme.name = "Crisp"
});
Ext.define("Ext.theme.crisptouch.Component", {
  override: "Ext.Component"
}, function() {
  Ext.namespace("Ext.theme.is").CrispTouch = true;
  Ext.theme.name = "CrispTouch"
});
Ext.define("Ext.overrides.app.domain.Component", {
  override: "Ext.app.domain.Component"
}, function(a) {
  a.monitor(Ext.Component)
});
(Ext.cmd.derive("Ext.app.EventBus", Ext.Base, {
  singleton: true,
  constructor: function() {
    var b = this,
      a = Ext.app.EventDomain.instances;
    b.callParent();
    b.domains = a;
    b.bus = a.component.bus
  },
  control: function(b, a) {
    return this.domains.component.listen(b, a)
  },
  listen: function(d, b) {
    var a = this.domains,
      c;
    for (c in d) {
      if (d.hasOwnProperty(c)) {
        a[c].listen(d[c], b)
      }
    }
  },
  unlisten: function(c) {
    var a = Ext.app.EventDomain.instances,
      b;
    for (b in a) {
      a[b].unlisten(c)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app, "EventBus"], 0));
(Ext.cmd.derive("Ext.app.domain.Global", Ext.app.EventDomain, {
  singleton: true,
  type: "global",
  constructor: function() {
    var a = this;
    a.callParent();
    a.monitor(Ext.GlobalEvents)
  },
  listen: function(b, a) {
    this.callParent([{
      global: b
    }, a])
  },
  match: Ext.returnTrue
}, 1, 0, 0, 0, 0, 0, [Ext.app.domain, "Global"], 0));
(Ext.cmd.derive("Ext.app.BaseController", Ext.Base, {
  isController: true,
  config: {
    id: null,
    control: null,
    listen: null,
    routes: null,
    before: null
  },
  constructor: function(a) {
    var b = this;
    Ext.apply(b, a);
    delete b.control;
    delete b.listen;
    b.eventbus = Ext.app.EventBus;
    b.mixins.observable.constructor.call(b, a);
    b.ensureId()
  },
  applyListen: function(a) {
    if (Ext.isObject(a)) {
      a = Ext.clone(a)
    }
    return a
  },
  applyControl: function(a) {
    if (Ext.isObject(a)) {
      a = Ext.clone(a)
    }
    return a
  },
  updateControl: function(a) {
    this.ensureId();
    if (a) {
      this.control(a)
    }
  },
  updateListen: function(a) {
    this.ensureId();
    if (a) {
      this.listen(a)
    }
  },
  updateRoutes: function(b) {
    if (b) {
      var e = this,
        f = e.getBefore() || {},
        a = Ext.app.route.Router,
        d, c, g;
      for (d in b) {
        c = b[d];
        if (Ext.isString(c)) {
          c = {
            action: c
          }
        }
        g = c.action;
        if (!c.before) {
          c.before = f[g]
        }
        a.connect(d, c, e)
      }
    }
  },
  isActive: function() {
    return true
  },
  control: function(b, c, a) {
    var d = this,
      e = a,
      f;
    if (Ext.isString(b)) {
      f = {};
      f[b] = c
    } else {
      f = b;
      e = c
    }
    d.eventbus.control(f, e || d)
  },
  listen: function(b, a) {
    this.eventbus.listen(b, a || this)
  },
  destroy: function() {
    var b = this,
      a = b.eventbus;
    Ext.app.route.Router.disconnectAll(b);
    if (a) {
      a.unlisten(b);
      b.eventbus = null
    }
    b.callParent()
  },
  redirectTo: function(b, c) {
    if (b.isModel) {
      b = b.toUrl()
    }
    if (!c) {
      var a = Ext.util.History.getToken();
      if (a === b) {
        return false
      }
    } else {
      Ext.app.route.Router.onStateChange(b)
    }
    Ext.util.History.add(b);
    return true
  }
}, 1, 0, 0, 0, 0, [
  [Ext.mixin.Observable.prototype.mixinId || Ext.mixin.Observable.$className,
    Ext.mixin.Observable
  ]
], [Ext.app, "BaseController"], 0));
(Ext.cmd.derive("Ext.app.Util", Ext.Base, {}, 0, 0, 0, 0, 0, 0, [Ext.app,
  "Util"
], function() {
  Ext.apply(Ext.app, {
    namespaces: {
      Ext: {}
    },
    addNamespaces: function(c) {
      var d = Ext.app.namespaces,
        b, a;
      if (!Ext.isArray(c)) {
        c = [c]
      }
      for (b = 0, a = c.length; b < a; b++) {
        d[c[b]] = true
      }
    },
    clearNamespaces: function() {
      Ext.app.namespaces = {}
    },
    getNamespace: function(b) {
      var d = Ext.apply({}, Ext.ClassManager.paths, Ext.app.namespaces),
        a = "",
        c;
      for (c in d) {
        if (d.hasOwnProperty(c) && c.length > a.length && (c + "." ===
            b.substring(0, c.length + 1))) {
          a = c
        }
      }
      return a === "" ? undefined : a
    },
    setupPaths: function(a, b, e) {
      var d = Ext.manifest,
        c;
      if (a && b !== null) {
        d = d && d.paths;
        if (!d || b !== undefined) {
          Ext.Loader.setPath(a, (b === undefined) ? "app" : b)
        }
      }
      if (e) {
        for (c in e) {
          if (e.hasOwnProperty(c)) {
            Ext.Loader.setPath(c, e[c])
          }
        }
      }
    }
  });
  Ext.getNamespace = Ext.app.getNamespace
}));
(Ext.cmd.derive("Ext.util.CollectionKey", Ext.Base, {
  isCollectionKey: true,
  observerPriority: -200,
  config: {
    collection: null,
    keyFn: null,
    property: null,
    rootProperty: null,
    unique: true
  },
  generation: 0,
  map: null,
  mapRebuilds: 0,
  constructor: function(a) {
    this.initConfig(a)
  },
  get: function(a) {
    var b = this.map || this.getMap();
    return b[a] || null
  },
  clear: function() {
    this.map = null
  },
  getRootProperty: function() {
    var b = this,
      a = (arguments.callee.$previous || Ext.Base.prototype.getRootProperty)
      .call(this);
    return a !== null ? a : b.getCollection().getRootProperty()
  },
  indexOf: function(j, e) {
    var a = this.map || this.getMap(),
      k = a[j],
      f = this.getCollection(),
      b = f.length,
      d, g, h, c;
    if (!k) {
      return -1
    }
    if (e === undefined) {
      e = -1
    }
    if (k instanceof Array) {
      h = k;
      g = b;
      for (c = h.length; c-- > 0;) {
        d = f.indexOf(h[c]);
        if (d < g && d > e) {
          g = d
        }
      }
      if (g === b) {
        return -1
      }
    } else {
      g = f.indexOf(k)
    }
    return (g > e) ? g : -1
  },
  updateKey: function(c, e) {
    var b = this,
      d = b.map,
      f, a;
    if (d) {
      f = d[e];
      if (f instanceof Array) {
        a = Ext.Array.indexOf(f, c);
        if (a >= 0) {
          if (f.length > 2) {
            f.splice(a, 1)
          } else {
            d[e] = f[1 - a]
          }
        }
      } else {
        if (f) {
          delete d[e]
        }
      }
      b.add([c])
    }
  },
  onCollectionAdd: function(b, a) {
    if (this.map) {
      this.add(a.items)
    }
  },
  onCollectionItemChange: function(b, a) {
    this.map = null
  },
  onCollectionRefresh: function() {
    this.map = null
  },
  onCollectionRemove: function(e, d) {
    var g = this,
      a = g.map,
      f = d.items,
      b = f.length,
      c, j, h;
    if (a) {
      if (g.getUnique() && b < e.length / 2) {
        for (c = 0; c < b; ++c) {
          h = g.getKey(j = f[c]);
          delete a[h]
        }
      } else {
        g.map = null
      }
    }
  },
  add: function(f) {
    var g = this,
      a = g.map,
      b, e, j, h, c, d;
    c = f.length;
    d = g.getUnique();
    for (e = 0; e < c; ++e) {
      h = g.getKey(j = f[e]);
      if (d || !(h in a)) {
        a[h] = j
      } else {
        if (!((b = a[h]) instanceof Array)) {
          a[h] = b = [b]
        }
        b.push(j)
      }
    }
  },
  applyKeyFn: function(a) {
    if (Ext.isString(a)) {
      this.getKey = function(b) {
        return b[a]()
      }
    } else {
      this.getKey = a
    }
  },
  updateProperty: function(b) {
    var a = this.getRootProperty();
    this.getKey = function(c) {
      return (a ? c[a] : c)[b]
    }
  },
  getMap: function() {
    var a = this,
      b = a.map;
    if (!b) {
      a.map = b = {};
      a.keysByItemKey = {};
      ++a.mapRebuilds;
      a.add(a.getCollection().items)
    }
    return b
  },
  updateCollection: function(a) {
    a.addObserver(this)
  },
  clone: function() {
    return new Ext.util.CollectionKey(this.getCurrentConfig())
  }
}, 1, 0, 0, 0, 0, [
  [Ext.mixin.Identifiable.prototype.mixinId || Ext.mixin.Identifiable.$className,
    Ext.mixin.Identifiable
  ]
], [Ext.util, "CollectionKey"], 0));
(Ext.cmd.derive("Ext.util.Grouper", Ext.util.Sorter, {
  isGrouper: true,
  config: {
    groupFn: null,
    sortProperty: null
  },
  constructor: function(a) {
    Ext.util.Sorter.prototype.constructor.apply(this, arguments)
  },
  getGroupString: function(a) {
    var b = this._groupFn(a);
    return (b != null) ? String(b) : ""
  },
  sortFn: function(d, c) {
    var f = this,
      b = f._groupFn(d),
      e = f._groupFn(c),
      i = f._sortProperty,
      h = f._root,
      g = f._sorterFn,
      a = f._transform;
    if (b === e) {
      return 0
    }
    if (i || g) {
      if (g) {
        return g.call(this, d, c)
      }
      if (h) {
        d = d[h];
        c = c[h]
      }
      b = d[i];
      e = c[i];
      if (a) {
        b = a(b);
        e = a(e)
      }
    }
    return (b > e) ? 1 : (b < e ? -1 : 0)
  },
  standardGroupFn: function(b) {
    var a = this._root;
    return (a ? b[a] : b)[this._property]
  },
  updateSorterFn: function() {},
  updateProperty: function() {
    if (!this.getGroupFn()) {
      this.setGroupFn(this.standardGroupFn)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "Grouper"], 0));
(Ext.cmd.derive("Ext.util.Collection", Ext.Base, {
  isCollection: true,
  config: {
    autoFilter: true,
    autoSort: true,
    autoGroup: true,
    decoder: null,
    extraKeys: null,
    filters: null,
    grouper: null,
    groups: null,
    rootProperty: null,
    sorters: null,
    multiSortLimit: 3,
    defaultSortDirection: "ASC",
    source: null,
    trackGroups: true
  },
  generation: 0,
  indices: null,
  indexRebuilds: 0,
  updating: 0,
  grouped: false,
  sorted: false,
  filtered: false,
  $endUpdatePriority: 1001,
  constructor: function(a) {
    var b = this;
    b.items = [];
    b.map = {};
    b.length = 0;
    if (a && a.keyFn) {
      b.getKey = a.keyFn
    }
    b.mixins.observable.constructor.call(b, a)
  },
  destroy: function() {
    var c = this,
      b = c._filters,
      d = c._sorters,
      a = c._groups;
    if (b) {
      b.destroy();
      c._filters = null
    }
    if (d) {
      d.destroy();
      c._sorters = null
    }
    if (a) {
      a.destroy();
      c._groups = null
    }
    c.setSource(null);
    c.observers = c.items = c.map = null;
    c.callParent()
  },
  add: function(d) {
    var c = this,
      a = c.decodeItems(arguments, 0),
      b = a;
    if (a.length) {
      c.requestedIndex = c.length;
      c.splice(c.length, 0, a);
      delete c.requestedIndex;
      b = (a.length === 1) ? a[0] : a
    }
    return b
  },
  replaceAll: function() {
    var c = this,
      b, a;
    a = c.decodeItems(arguments, 0);
    b = a;
    if (a.length) {
      c.splice(0, c.length, a);
      b = (a.length === 1) ? a[0] : a
    } else {
      c.removeAll()
    }
    return b
  },
  aggregate: function(g, b, e, a, d) {
    var f = this,
      c = Ext.Array.slice(arguments);
    c.unshift(f.items);
    return f.aggregateItems.apply(f, c)
  },
  aggregateByGroup: function(d, b, c) {
    var a = this.getGroups();
    return this.aggregateGroups(a, d, b, c)
  },
  aggregateItems: function(k, q, d, a, e, r) {
    var l = this,
      h = Ext.Number.clipIndices(k.length, [a, e]),
      b = (a !== 0 && e !== k.length),
      g, f, c, m, o, p, n;
    a = h[0];
    e = h[1];
    if (!Ext.isFunction(d)) {
      d = l._aggregators[d];
      return d.call(l, k, a, e, q, l.getRootProperty())
    }
    m = l.getRootProperty();
    p = new Array(c);
    n = b ? new Array(c) : k;
    for (g = a, f = 0; g < e; ++g, f++) {
      if (b) {
        n[f] = o = k[g]
      }
      p[f] = (m ? o[m] : o)[q]
    }
    return d.call(r || l, k, p, 0)
  },
  aggregateGroups: function(a, j, c, k) {
    var g = a.items,
      f = g.length,
      b = !Ext.isFunction(c),
      d = {},
      e, h, l;
    for (e = 0; e < f; ++e) {
      h = g[e];
      if (!b) {
        l = this.aggregateItems(h.items, j, c, null, null, k)
      } else {
        l = h[c](j)
      }
      d[h.getGroupKey()] = l
    }
    return d
  },
  beginUpdate: function() {
    if (!this.updating++) {
      this.notify("beginupdate")
    }
  },
  clear: function() {
    var c = this,
      d = c.generation,
      a = d ? c.items : [],
      b, e;
    if (d) {
      c.items = [];
      c.length = 0;
      c.map = {};
      c.indices = {};
      c.generation++;
      b = c.getExtraKeys();
      if (b) {
        for (e in b) {
          b[e].clear()
        }
      }
    }
    return a
  },
  clone: function() {
    var a = this,
      b = new a.self(a.initialConfig);
    b.add(a.items);
    return b
  },
  collect: function(k, f, h) {
    var e = this.items,
      b = e.length,
      a = {},
      d = [],
      c, g, j;
    for (c = 0; c < b; ++c) {
      j = e[c];
      j = (f ? j[f] : j)[k];
      g = String(j);
      if ((h || !Ext.isEmpty(j)) && !a[g]) {
        a[g] = 1;
        d.push(j)
      }
    }
    return d
  },
  contains: function(c) {
    var a = false,
      b;
    if (c != null) {
      b = this.getKey(c);
      a = this.map[b] === c
    }
    return a
  },
  containsKey: function(a) {
    return a in this.map
  },
  createFiltered: function(n, m, e, j, d) {
    var h = this,
      f = new h.self(h.initialConfig),
      l = h.getRootProperty(),
      g = h.items,
      b, c, a, k, o;
    if (Ext.isFunction(n)) {
      k = n;
      o = m
    } else {
      if (Ext.isString(n)) {
        a = [new Ext.util.Filter({
          property: n,
          value: m,
          root: l,
          anyMatch: e,
          caseSensitive: j,
          exactMatch: d
        })]
      } else {
        if (n instanceof Ext.util.Filter) {
          a = [n];
          n.setRoot(l)
        } else {
          if (Ext.isArray(n)) {
            a = n.slice(0);
            for (c = 0, b = a.length; c < b; ++c) {
              a[c].setRoot(l)
            }
          }
        }
      }
      k = Ext.util.Filter.createFilterFn(a)
    }
    o = o || h;
    for (c = 0, b = g.length; c < b; c++) {
      if (k.call(o, g[c])) {
        f.add(g[c])
      }
    }
    return f
  },
  filterBy: function(b, a) {
    return this.createFiltered(b, a)
  },
  each: function(f, e) {
    var b = this.items,
      a = b.length,
      d, c;
    if (a) {
      e = e || this;
      b = b.slice(0);
      for (d = 0; d < a; d++) {
        c = f.call(e, b[d], d, a);
        if (c === false) {
          break
        }
      }
    }
    return c
  },
  eachKey: function(f, j) {
    var e = this,
      d = e.items,
      b = d.length,
      a, h, g, c;
    if (b) {
      j = j || e;
      d = d.slice(0);
      for (a = 0; a < b; a++) {
        g = e.getKey(h = d[a]);
        c = f.call(j, g, h, a, b);
        if (c === false) {
          break
        }
      }
    }
    return c
  },
  endUpdate: function() {
    if (!--this.updating) {
      this.notify("endupdate")
    }
  },
  find: function(g, f, h, d, c, b) {
    if (Ext.isEmpty(f, false)) {
      return null
    }
    var e = Ext.String.createRegex(f, d, c, b),
      a = this.getRootProperty();
    return this.findBy(function(i) {
      return i && e.test((a ? i[a] : i)[g])
    }, null, h)
  },
  findBy: function(f, j, a) {
    var e = this,
      d = e.items,
      c = d.length,
      b, h, g;
    j = j || e;
    for (b = a || 0; b < c; b++) {
      g = e.getKey(h = d[b]);
      if (f.call(j, h, g)) {
        return d[b]
      }
    }
    return null
  },
  findIndex: function(f, e, g, c, b, a) {
    var d = this.find(f, e, g, c, b, a);
    return d ? this.indexOf(d) : -1
  },
  findIndexBy: function(b, a, d) {
    var c = this.findBy(b, a, d);
    return c ? this.indexOf(c) : -1
  },
  first: function(b) {
    var a = b ? this.getGroups() : undefined;
    return a ? this.aggregateGroups(a, null, "first") : this.items[0]
  },
  last: function(b) {
    var a = b ? this.getGroups() : undefined;
    return a ? this.aggregateGroups(a, null, "last") : this.items[this.length -
      1]
  },
  get: function(a) {
    return this.map[a]
  },
  getAt: function(a) {
    return this.items[a]
  },
  getByKey: function(a) {
    return this.map[a]
  },
  getCount: function() {
    return this.length
  },
  getKey: function(a) {
    var b = a.id;
    return (b === 0 || b) ? b : ((b = a._id) === 0 || b) ? b : a.getId()
  },
  getRange: function(d, a) {
    var c = this.items,
      e = c.length,
      b;
    if (!e) {
      b = []
    } else {
      b = Ext.Number.clipIndices(e, [d, a]);
      b = c.slice(b[0], b[1])
    }
    return b
  },
  getValues: function(j, g, a, b) {
    var f = this.items,
      d = Ext.Number.clipIndices(f.length, [a, b]),
      e = [],
      c, h;
    for (c = d[0], b = d[1]; c < b; ++c) {
      h = f[c];
      h = (g ? h[g] : h)[j];
      e.push(h)
    }
    return e
  },
  indexOf: function(b) {
    if (!b) {
      return -1
    }
    var a = this.getKey(b);
    return this.indexOfKey(a)
  },
  indexOfKey: function(a) {
    var b = this,
      c = b.indices;
    if (a in b.map) {
      if (!c) {
        c = b.getIndices()
      }
      return c[a]
    }
    return -1
  },
  insert: function(c, e) {
    var d = this,
      a = d.decodeItems(arguments, 1),
      b = a;
    if (a.length) {
      d.requestedIndex = c;
      d.splice(c, 0, a);
      delete d.requestedIndex;
      b = (a.length === 1) ? a[0] : a
    }
    return b
  },
  itemChanged: function(t, h, l, m) {
    var u = this,
      c = l === 0 || !!l,
      i = u.filtered && u.getAutoFilter(),
      e = false,
      d = 0,
      o = u.items,
      k = u.length - 1,
      a = u.sorted && k > 0 && u.getAutoSort(),
      q = u.getSource(),
      p = 0,
      j = false,
      n = false,
      s, r, f, v, g, b;
    if (q && !q.updating) {
      q.itemChanged(t, h, l, m)
    } else {
      r = u.getKey(t);
      if (i) {
        g = u.indexOfKey(c ? l : r);
        n = (g < 0);
        j = u.isItemFiltered(t);
        e = (n !== j)
      }
      if (e) {
        if (j) {
          p = [t];
          b = -1
        } else {
          v = [t];
          b = u.length
        }
      } else {
        if (a && !j) {
          if (!i) {
            g = u.indexOfKey(c ? l : r)
          }
          f = u.getSortFn();
          if (g !== -1) {
            if (g && f(o[g - 1], o[g]) > 0) {
              d = -1;
              b = Ext.Array.binarySearch(o, t, 0, g, f)
            } else {
              if (g < k && f(o[g], o[g + 1]) > 0) {
                d = 1;
                b = Ext.Array.binarySearch(o, t, g + 1, f)
              }
            }
            if (d) {
              v = [t]
            }
          }
        }
      }
      s = {
        item: t,
        key: r,
        index: b,
        filterChanged: e,
        keyChanged: c,
        indexChanged: !!d,
        filtered: j,
        oldIndex: g,
        newIndex: b,
        wasFiltered: n,
        meta: m
      };
      if (c) {
        s.oldKey = l
      }
      if (h) {
        s.modified = h
      }
      u.beginUpdate();
      u.notify("beforeitemchange", [s]);
      if (c) {
        u.updateKey(t, l)
      }
      if (v || p) {
        u.splice(b, p, v)
      }
      if (d > 0) {
        s.newIndex--
      } else {
        if (d < 0) {
          s.oldIndex++
        }
      }
      u.notify(j ? "filtereditemchange" : "itemchange", [s]);
      u.endUpdate()
    }
  },
  remove: function(d) {
    var c = this,
      a = c.decodeRemoveItems(arguments, 0),
      b = c.length;
    c.splice(0, a);
    return b - c.length
  },
  removeAll: function() {
    var b = this,
      a = b.length;
    if (b.generation && a) {
      b.splice(0, a)
    }
    return b
  },
  removeAt: function(h, g) {
    var i = this,
      b = i.length,
      e = Ext.Number,
      d = e.clipIndices(b, [h, (g === undefined) ? 1 : g], e.Clip.COUNT),
      c = d[0],
      a = d[1] - c,
      j = (a === 1) && i.getAt(c),
      f;
    i.splice(c, a);
    f = i.length - b;
    return (j && f) ? j : f
  },
  removeByKey: function(a) {
    var b = this.getByKey(a);
    if (!b || !this.remove(b)) {
      return false
    }
    return b
  },
  replace: function(b) {
    var a = this.indexOf(b);
    if (a === -1) {
      this.add(b)
    } else {
      this.insert(a, b)
    }
  },
  splice: function(D, m, B) {
    var l = this,
      d = l.sorted && l.getAutoSort(),
      z = l.map,
      r = l.items,
      p = l.length,
      v = (m instanceof Array) ? l.decodeRemoveItems(m) : null,
      w = !v,
      E = Ext.Number,
      e = E.clipIndices(p, [D, w ? m : 0], E.Clip.COUNT),
      g = e[0],
      j = e[1],
      K = j - g,
      t = l.decodeItems(arguments, 2),
      J = t ? t.length : 0,
      C, x, u, c = g,
      b = l.indices || ((J || v) ? l.getIndices() : null),
      q = null,
      h = K ? [g] : null,
      f = null,
      s = l.getSource(),
      a, G, H, M, A, F, L, o, y, I, O, N, j;
    if (s && !s.updating) {
      if (w) {
        v = [];
        for (M = 0; M < K; ++M) {
          v.push(r[g + M])
        }
      }
      if (g < p) {
        M = s.indexOf(r[g])
      } else {
        M = s.length
      }
      s.splice(M, v, t);
      return l
    }
    if (J) {
      C = t;
      f = [];
      x = {};
      if (d) {
        N = l.getSorters();
        if (J > 1) {
          if (!C.$cloned) {
            t = C = C.slice(0)
          }
          l.sortData(C)
        }
      }
      for (M = 0; M < J; ++M) {
        o = l.getKey(A = t[M]);
        if ((L = x[o]) !== undefined) {
          (O || (O = {}))[L] = 1
        } else {
          F = b[o];
          if (F < g || j <= F) {
            (h || (h = [])).push(F)
          }
        }
        x[o] = M;
        f.push(o)
      }
      if (O) {
        y = f;
        C = [];
        f = [];
        C.$cloned = true;
        for (M = 0; M < J; ++M) {
          if (!O[M]) {
            A = t[M];
            C.push(A);
            f.push(y[M])
          }
        }
        J = C.length
      }
      q = {
        items: C,
        keys: f
      }
    }
    for (M = v ? v.length : 0; M-- > 0;) {
      o = l.getKey(v[M]);
      if ((F = b[o]) !== undefined) {
        (h || (h = [])).push(F)
      }
    }
    if (!q && !h) {
      return l
    }
    l.beginUpdate();
    if (h) {
      a = null;
      H = [];
      u = {};
      if (h.length > 1) {
        h.sort(Ext.Array.numericSortFn)
      }
      for (M = 0, I = h.length; M < I; ++M) {
        o = l.getKey(A = r[F = h[M]]);
        if (!(o in z)) {
          continue
        }
        delete z[o];
        if (!a || F > (a.at + G.length)) {
          H.push(a = {
            at: F,
            items: (G = []),
            keys: (y = []),
            map: u,
            next: a,
            replacement: q
          });
          if (q) {
            q.replaced = a
          }
        }
        G.push(u[o] = A);
        y.push(o);
        if (F < c) {
          --c
        }
        if (K > 1 && F === g) {
          --K;
          h[M--] = ++g
        }
      }
      if (q) {
        q.at = c
      }
      for (L = H.length; L-- > 0;) {
        a = H[L];
        M = a.at;
        I = a.items.length;
        if (M + I < p) {
          l.indices = b = null
        }
        l.length = p -= I;
        r.splice(M, I);
        if (b) {
          y = a.keys;
          for (M = 0; M < I; ++M) {
            delete b[y[M]]
          }
        }++l.generation;
        l.notify("remove", [a])
      }
    }
    if (q) {
      if (d && J > 1 && p) {
        l.spliceMerge(C, f)
      } else {
        if (d) {
          if (J > 1) {
            c = 0;
            l.indices = b = null
          } else {
            c = N.findInsertionIndex(q.items[0], r, l.getSortFn())
          }
        }
        if (c === p) {
          j = c;
          for (M = C.length - 1; M >= 0; --M) {
            r[j + M] = C[M]
          }
          b = l.indices;
          if (b) {
            for (M = 0; M < J; ++M) {
              b[f[M]] = c + M
            }
          }
        } else {
          l.indices = null;
          Ext.Array.insert(r, c, C)
        }
        for (M = 0; M < J; ++M) {
          z[f[M]] = C[M]
        }
        l.length += J;
        q.at = c;
        q.atItem = c === 0 ? null : r[c - 1];
        ++l.generation;
        l.notify("add", [q])
      }
    }
    l.endUpdate();
    return l
  },
  update: function(b, a) {
    var c = this;
    c.beginUpdate();
    try {
      return b.call(a || c, c)
    } catch (d) {
      throw d
    } finally {
      c.endUpdate()
    }
  },
  updateKey: function(b, e) {
    var a = this,
      d = a.map,
      g = a.indices,
      c = a.getSource(),
      f;
    if (c && !c.updating) {
      c.updateKey(b, e)
    } else {
      if ((f = a.getKey(b)) !== e) {
        if (d[e] === b && !(f in d)) {
          delete d[e];
          a.updating++;
          a.generation++;
          d[f] = b;
          if (g) {
            g[f] = g[e];
            delete g[e]
          }
          a.notify("updatekey", [{
            item: b,
            newKey: f,
            oldKey: e
          }]);
          a.updating--
        }
      }
    }
  },
  findInsertIndex: function(d) {
    var e = this.getSource(),
      f = e.items,
      b = e.indexOf(d) - 1,
      c, a;
    while (b > -1) {
      c = f[b];
      a = this.indexOf(c);
      if (a > -1) {
        return a + 1
      }--b
    }
    return 0
  },
  onCollectionAdd: function(a, b) {
    var k = this,
      m = b.atItem,
      j = b.items,
      f = k.requestedIndex,
      h, g, c, e, l, d;
    if (!k.sorted) {
      if (f !== undefined) {
        g = f
      } else {
        if (m) {
          g = k.indexOf(m);
          if (g === -1) {
            g = k.findInsertIndex(j[0])
          } else {
            ++g
          }
        } else {
          g = 0
        }
      }
    }
    if (k.getAutoFilter() && k.filtered) {
      for (e = 0, d = j.length; e < d; ++e) {
        l = j[e];
        if (k.isItemFiltered(l)) {
          if (!c) {
            c = j.slice(0, e)
          }
          if (!h) {
            h = []
          }
          h.push(l)
        } else {
          if (c) {
            c.push(l)
          }
        }
      }
    }
    k.splice((g < 0) ? k.length : g, 0, c || j);
    if (h) {
      k.notify("filteradd", [h])
    }
  },
  onCollectionBeforeItemChange: function(b, a) {
    this.onCollectionUpdateKey = null
  },
  onCollectionBeginUpdate: function() {
    this.beginUpdate()
  },
  onCollectionEndUpdate: function() {
    this.endUpdate()
  },
  onCollectionItemChange: function(b, a) {
    delete this.onCollectionUpdateKey;
    this.itemChanged(a.item, a.modified, a.oldKey, a.meta)
  },
  onCollectionFilteredItemChange: null,
  onCollectionRefresh: function(a) {
    var f = this,
      b = {},
      h = {},
      d, j, e, g, c;
    e = a.items;
    e = f.filtered && f.getAutoFilter() ? Ext.Array.filter(e, f.getFilterFn()) :
      e.slice(0);
    if (f.sorted) {
      f.sortData(e)
    }
    f.items = e;
    f.length = c = e.length;
    f.map = b;
    f.indices = h;
    for (d = 0; d < c; ++d) {
      g = f.getKey(j = e[d]);
      b[g] = j;
      h[g] = d
    }
    f.notify("refresh")
  },
  onCollectionRemove: function(b, a) {
    this.splice(0, a.items)
  },
  onCollectionUpdateKey: function(b, a) {
    this.updateKey(a.item, a.oldKey)
  },
  _aggregators: {
    average: function(c, d, b, e, a) {
      var f = b - d;
      return f && this._aggregators.sum.call(this, c, d, b, e, a) / f
    },
    bounds: function(e, a, b, j, f) {
      for (var h, g, c, d = a; d < b; ++d) {
        h = e[d];
        h = (f ? h[f] : h)[j];
        if (!(h < g)) {
          g = h
        }
        if (!(h > c)) {
          c = h
        }
      }
      return [c, g]
    },
    count: function(a) {
      return a.length
    },
    extremes: function(f, a, c, l, j) {
      var g = null,
        b = null,
        e, m, h, d, k;
      for (e = a; e < c; ++e) {
        m = f[e];
        k = (j ? m[j] : m)[l];
        if (!(k < h)) {
          h = k;
          g = m
        }
        if (!(k > d)) {
          d = k;
          b = m
        }
      }
      return [b, g]
    },
    max: function(e, f, d, g, c) {
      var a = this._aggregators.bounds.call(this, e, f, d, g, c);
      return a[1]
    },
    maxItem: function(e, f, d, g, c) {
      var a = this._aggregators.extremes.call(this, e, f, d, g, c);
      return a[1]
    },
    min: function(e, f, d, g, c) {
      var a = this._aggregators.bounds.call(this, e, f, d, g, c);
      return a[0]
    },
    minItem: function(e, f, d, g, c) {
      var a = this._aggregators.extremes.call(this, e, f, d, g, c);
      return a[0]
    },
    sum: function(c, f, b, h, a) {
      for (var g, e = 0, d = f; d < b; ++d) {
        g = c[d];
        g = (a ? g[a] : g)[h];
        e += g
      }
      return e
    }
  },
  _eventToMethodMap: {
    add: "onCollectionAdd",
    beforeitemchange: "onCollectionBeforeItemChange",
    beginupdate: "onCollectionBeginUpdate",
    endupdate: "onCollectionEndUpdate",
    itemchange: "onCollectionItemChange",
    filtereditemchange: "onCollectionFilteredItemChange",
    refresh: "onCollectionRefresh",
    remove: "onCollectionRemove",
    beforesort: "beforeCollectionSort",
    sort: "onCollectionSort",
    filter: "onCollectionFilter",
    filteradd: "onCollectionFilterAdd",
    updatekey: "onCollectionUpdateKey"
  },
  addObserver: function(a) {
    var b = this,
      c = b.observers;
    if (!c) {
      b.observers = c = []
    }
    c.push(a);
    if (c.length > 1) {
      Ext.Array.sort(c, b.prioritySortFn)
    }
  },
  prioritySortFn: function(f, e) {
    var d = f.observerPriority || 0,
      c = e.observerPriority || 0;
    return d - c
  },
  applyExtraKeys: function(e, a) {
    var f = this,
      d = a || {},
      c, b, g;
    for (b in e) {
      g = e[b];
      if (!g.isCollectionKey) {
        c = {
          collection: f
        };
        if (Ext.isString(g)) {
          c.property = g
        } else {
          c = Ext.apply(c, g)
        }
        g = new Ext.util.CollectionKey(c)
      } else {
        g.setCollection(f)
      }
      d[b] = f[b] = g;
      g.name = b
    }
    return d
  },
  applyGrouper: function(a) {
    if (a) {
      a = this.getSorters().decodeSorter(a, "Ext.util.Grouper")
    }
    return a
  },
  decodeItems: function(d, c) {
    var f = this,
      b = (c === undefined) ? d : d[c],
      a, g, e;
    if (!b || !b.$cloned) {
      a = d.length > c + 1 || !Ext.isIterable(b);
      if (a) {
        b = Ext.Array.slice(d, c);
        if (b.length === 1 && b[0] === undefined) {
          b.length = 0
        }
      }
      g = f.getDecoder();
      if (g) {
        if (!a) {
          b = b.slice(0);
          a = true
        }
        for (e = b.length; e-- > 0;) {
          if ((b[e] = g.call(f, b[e])) === false) {
            b.splice(e, 1)
          }
        }
      }
      if (a) {
        b.$cloned = true
      }
    }
    return b
  },
  getIndices: function() {
    var d = this,
      e = d.indices,
      a = d.items,
      f = a.length,
      c, b;
    if (!e) {
      d.indices = e = {};
      ++d.indexRebuilds;
      for (c = 0; c < f; ++c) {
        b = d.getKey(a[c]);
        e[b] = c
      }
    }
    return e
  },
  notify: function(d, g) {
    var h = this,
      c = h.observers,
      j = h._eventToMethodMap[d],
      i = 0,
      e, b, a, f;
    g = g || [];
    if (c && j) {
      for (e = 0, b = c.length; e < b; ++e) {
        a = (f = c[e])[j];
        if (a) {
          if (!i++) {
            g.unshift(h)
          }
          a.apply(f, g)
        }
      }
    }
    if (!h.hasListeners) {
      return
    }
    if (h.hasListeners[d]) {
      if (!i) {
        g.unshift(h)
      }
      h.fireEventArgs(d, g)
    }
  },
  getFilterFn: function() {
    return this.getFilters().getFilterFn()
  },
  getFilters: function(b) {
    var a = this._filters;
    if (!a && b !== false) {
      a = new Ext.util.FilterCollection();
      this.setFilters(a)
    }
    return a
  },
  isItemFiltered: function(a) {
    return !this.getFilters().filterFn(a)
  },
  onFilterChange: function(e) {
    var d = this,
      f = d.getSource(),
      c, b, a;
    if (!f) {
      c = d.getExtraKeys();
      if (c) {
        b = {};
        for (a in c) {
          b[a] = c[a].clone(d)
        }
      }
      f = new Ext.util.Collection({
        keyFn: d.getKey,
        extraKeys: b,
        rootProperty: d.getRootProperty()
      });
      if (d.length) {
        f.add(d.items)
      }
      d.setSource(f);
      d.autoSource = f
    } else {
      if (f.length || d.length) {
        d.onCollectionRefresh(f)
      }
    }
    d.notify("filter")
  },
  applyFilters: function(a, b) {
    if (a == null || (a && a.isFilterCollection)) {
      return a
    }
    if (a) {
      if (!b) {
        b = this.getFilters()
      }
      b.splice(0, b.length, a)
    }
    return b
  },
  updateFilters: function(a, b) {
    var c = this;
    if (b) {
      b.un("endupdate", "onEndUpdateFilters", c)
    }
    if (a) {
      a.on({
        endupdate: "onEndUpdateFilters",
        scope: c,
        priority: c.$endUpdatePriority
      });
      a.$filterable = c
    }
    c.onEndUpdateFilters(a)
  },
  onEndUpdateFilters: function(c) {
    var b = this,
      d = b.filtered,
      a = !!c && (c.length > 0);
    if (d || a) {
      b.filtered = a;
      b.onFilterChange(c)
    }
  },
  getSortFn: function() {
    return this._sortFn || this.createSortFn()
  },
  getSorters: function(b) {
    var a = this._sorters;
    if (!a && b !== false) {
      a = new Ext.util.SorterCollection();
      this.setSorters(a)
    }
    return a
  },
  onSortChange: function() {
    if (this.sorted) {
      this.sortItems()
    }
  },
  sort: function(a, c, d) {
    var b = this.getSorters();
    b.addSort.apply(b, arguments);
    return this
  },
  sortData: function(a) {
    Ext.Array.sort(a, this.getSortFn());
    return a
  },
  sortItems: function(b) {
    var a = this;
    if (a.sorted) {
      b = a.getSortFn()
    }
    a.indices = null;
    a.notify("beforesort", [a.getSorters(false)]);
    if (a.length) {
      Ext.Array.sort(a.items, b)
    }
    a.notify("sort")
  },
  sortBy: function(a) {
    return this.sortItems(a)
  },
  findInsertionIndex: function(c, a, b) {
    if (!a) {
      a = this.items
    }
    if (!b) {
      b = this.getSortFn()
    }
    return Ext.Array.binarySearch(a, c, b)
  },
  applySorters: function(a, b) {
    if (a == null || (a && a.isSorterCollection)) {
      return a
    }
    if (a) {
      if (!b) {
        b = this.getSorters()
      }
      b.splice(0, b.length, a)
    }
    return b
  },
  createSortFn: function() {
    var c = this,
      a = c.getGrouper(),
      d = c.getSorters(false),
      b = d ? d.getSortFn() : null;
    if (!a) {
      return b
    }
    return function(e, g) {
      var f = a.sort(e, g);
      if (!f && b) {
        f = b(e, g)
      }
      return f
    }
  },
  updateGrouper: function(b) {
    var c = this,
      a = c.getGroups(),
      e = c.getSorters(),
      d;
    c.onSorterChange();
    c.grouped = !!b;
    if (b) {
      if (c.getTrackGroups()) {
        if (!a) {
          a = new Ext.util.GroupCollection({
            itemRoot: c.getRootProperty()
          });
          a.$groupable = c;
          c.setGroups(a)
        }
        a.setGrouper(b);
        d = true
      }
    } else {
      if (a) {
        c.removeObserver(a);
        a.destroy()
      }
      c.setGroups(null)
    }
    if (!e.updating) {
      c.onEndUpdateSorters(e)
    }
    if (d) {
      a.onCollectionRefresh(c)
    }
  },
  updateSorters: function(a, b) {
    var c = this;
    if (b) {
      b.un("endupdate", "onEndUpdateSorters", c)
    }
    if (a) {
      a.on({
        endupdate: "onEndUpdateSorters",
        scope: c,
        priority: c.$endUpdatePriority
      });
      a.$sortable = c
    }
    c.onSorterChange();
    c.onEndUpdateSorters(a)
  },
  onSorterChange: function() {
    this._sortFn = null
  },
  onEndUpdateSorters: function(c) {
    var b = this,
      d = b.sorted,
      a = (b.grouped && b.getAutoGroup()) || (c && c.length > 0);
    if (d || a) {
      b.sorted = !!a;
      b.onSortChange(c)
    }
  },
  removeObserver: function(a) {
    var b = this.observers;
    if (b) {
      Ext.Array.remove(b, a)
    }
  },
  spliceMerge: function(j, r) {
    var q = this,
      p = q.map,
      f = j.length,
      c = 0,
      k = q.items,
      s = k.length,
      h = [],
      g = 0,
      m = [],
      d = q.getSortFn(),
      l, b, n, e, o, a;
    q.items = m;
    for (a = 0; a < f; a = b) {
      e = j[a];
      for (; c < s; ++c) {
        if (d(e, o = k[c]) < 0) {
          break
        }
        m.push(o)
      }
      if (c === s) {
        h[g++] = {
          at: m.length,
          itemAt: m[m.length - 1],
          items: (l = [])
        };
        if (g > 1) {
          h[g - 2].next = h[g - 1]
        }
        for (; a < f; ++a) {
          l.push(e = j[a]);
          m.push(e)
        }
        break
      }
      h[g++] = {
        at: m.length,
        itemAt: m[m.length - 1],
        items: (l = [e])
      };
      if (g > 1) {
        h[g - 2].next = h[g - 1]
      }
      m.push(e);
      for (b = a + 1; b < f; ++b) {
        if (d(e = j[b], o) >= 0) {
          break
        }
        m.push(e);
        l.push(e)
      }
    }
    for (; c < s; ++c) {
      m.push(k[c])
    }
    for (n = 0; n < f; ++n) {
      p[r[n]] = j[n]
    }
    q.length = m.length;
    ++q.generation;
    q.indices = null;
    for (n = 0; n < g; ++n) {
      q.notify("add", [h[n]])
    }
  },
  getGroups: function() {
    return (arguments.callee.$previous || Ext.Base.prototype.getGroups).call(
      this) || null
  },
  updateAutoGroup: function(b) {
    var a = this.getGroups();
    if (a) {
      a.setAutoGroup(b)
    }
    this.onEndUpdateSorters(this._sorters)
  },
  updateGroups: function(a, b) {
    if (b) {
      this.removeObserver(b)
    }
    if (a) {
      this.addObserver(a)
    }
  },
  updateSource: function(b, a) {
    var c = this.autoSource;
    if (a) {
      a.removeObserver(this);
      if (a === c) {
        c.destroy();
        this.autoSource = null
      }
    }
    if (b) {
      b.addObserver(this);
      if (b.length || this.length) {
        this.onCollectionRefresh(b)
      }
    }
  }
}, 1, 0, 0, 0, 0, [
  [Ext.mixin.Observable.prototype.mixinId || Ext.mixin.Observable.$className,
    Ext.mixin.Observable
  ]
], [Ext.util, "Collection"], function() {
  var a = this.prototype;
  a.removeAtKey = a.removeByKey;
  a.decodeRemoveItems = a.decodeItems;
  Ext.Object.each(a._aggregators, function(b) {
    a[b] = function(e, d, c) {
      return this.aggregate(e, b, d, c)
    };
    a[b + "ByGroup"] = function(c) {
      return this.aggregateByGroup(c, b)
    }
  })
}));
(Ext.cmd.derive("Ext.util.ObjectTemplate", Ext.Base, {
  isObjectTemplate: true,
  excludeProperties: {},
  valueRe: /^[{][a-z\.]+[}]$/i,
  statics: {
    create: function(b, a) {
      return b.isObjectTemplate ? b : new Ext.util.ObjectTemplate(b, a)
    }
  },
  constructor: function(b, a) {
    Ext.apply(this, a);
    this.template = b
  },
  apply: function(a) {
    var b = this;
    delete b.apply;
    b.apply = b.compile(b.template);
    return b.apply(a)
  },
  privates: {
    compile: function(e) {
      var f = this,
        b = f.excludeProperties,
        g, c, a, d;
      if (Ext.isString(e)) {
        if (e.indexOf("{") < 0) {
          d = function() {
            return e
          }
        } else {
          if (f.valueRe.test(e)) {
            e = e.substring(1, e.length - 1).split(".");
            d = function(k) {
              for (var h = k, j = 0; h && j < e.length; ++j) {
                h = h[e[j]]
              }
              return h
            }
          } else {
            e = new Ext.XTemplate(e);
            d = function(h) {
              return e.apply(h)
            }
          }
        }
      } else {
        if (!e || Ext.isPrimitive(e) || Ext.isFunction(e)) {
          d = function() {
            return e
          }
        } else {
          if (e instanceof Array) {
            g = [];
            for (c = 0, a = e.length; c < a; ++c) {
              g[c] = f.compile(e[c])
            }
            d = function(k) {
              var h = [],
                j;
              for (j = 0; j < a; ++j) {
                h[j] = g[j](k)
              }
              return h
            }
          } else {
            g = {};
            for (c in e) {
              if (!b[c]) {
                g[c] = f.compile(e[c])
              }
            }
            d = function(l) {
              var j = {},
                k, h;
              for (k in e) {
                h = b[k] ? e[k] : g[k](l);
                if (h !== undefined) {
                  j[k] = h
                }
              }
              return j
            }
          }
        }
      }
      return d
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "ObjectTemplate"], 0));
(Ext.cmd.derive("Ext.data.schema.Role", Ext.Base, {
  isRole: true,
  left: true,
  owner: false,
  side: "left",
  isMany: false,
  defaultReaderType: "json",
  _internalReadOptions: {
    recordsOnly: true,
    asRoot: true
  },
  constructor: function(b, c) {
    var d = this,
      a = c.extra;
    Ext.apply(d, c);
    if (a) {
      delete a.type;
      Ext.apply(d, a);
      delete d.extra
    }
    d.association = b;
    if (b.owner === d.side) {
      b.owner = d;
      d.owner = true
    }
  },
  processUpdate: function() {
    Ext.raise('Only the "many" for an association may be processed. "' +
      this.role + '" is not valid.')
  },
  processLoad: function(b, c, a, d) {
    return a
  },
  checkMembership: Ext.emptyFn,
  adoptAssociated: function(b, c) {
    var a = this.getAssociatedItem(b);
    if (a) {
      c.adopt(a)
    }
  },
  createAssociationStore: function(f, k, e, l) {
    var h = this,
      d = h.association,
      g = d.getFieldName(),
      i = d.isManyToMany,
      b = h.storeConfig,
      a = k.getId(),
      c = {
        model: h.cls,
        role: h,
        session: f,
        associatedEntity: k,
        disableMetaChangeEvent: true,
        pageSize: null,
        remoteFilter: true,
        trackRemoved: !f
      },
      j;
    if (i) {
      c.filters = [{
        property: h.inverse.field,
        value: a,
        exactMatch: true
      }]
    } else {
      if (g) {
        c.filters = [{
          property: g,
          value: a,
          exactMatch: true
        }];
        c.foreignKeyName = g
      }
    }
    if (b) {
      Ext.apply(c, b)
    }
    j = Ext.Factory.store(c);
    h.onStoreCreate(j, f, a);
    if (g || (i && f)) {
      j.on({
        scope: h,
        add: "onAddToMany",
        remove: "onRemoveFromMany",
        clear: "onRemoveFromMany"
      })
    }
    if (e) {
      j.loadData(e);
      j.complete = !!l
    }
    return j
  },
  onStoreCreate: Ext.emptyFn,
  getAssociatedStore: function(f, r, q, b, p) {
    var j = this,
      k = j.getStoreName(),
      m = f[k],
      o = r && r.reload,
      a = f.$source,
      h = f.session,
      g, d, e, n, c, l;
    if (!m) {
      if (!b && a) {
        a = a[k];
        if (a && !a.isLoading()) {
          l = a;
          b = [];
          n = a.getData().items;
          for (d = 0, e = n.length; d < e; ++d) {
            c = n[d];
            b.push(h.getRecord(c.self, c.id))
          }
          p = true
        }
      }
      m = j.createAssociationStore(h, f, b, p);
      m.$source = l;
      if (!b && (j.autoLoad || r)) {
        o = true
      }
      f[k] = m
    }
    if (r) {
      if (o || m.isLoading()) {
        m.on("load", function(t, s, u, i) {
          g = [t, i];
          q = q || r.scope || f;
          if (u) {
            Ext.callback(r.success, q, g)
          } else {
            Ext.callback(r.failure, q, g)
          }
          g.push(u);
          Ext.callback(r, q, g);
          Ext.callback(r.callback, q, g)
        }, null, {
          single: true
        })
      } else {
        g = [m, null];
        q = q || r.scope || f;
        Ext.callback(r.success, q, g);
        g.push(true);
        Ext.callback(r, q, g);
        Ext.callback(r.callback, q, g)
      }
    }
    if (o && !m.isLoading()) {
      m.load()
    }
    return m
  },
  getAssociatedItem: function(b) {
    var a = this.isMany ? this.getStoreName() : this.getInstanceName();
    return b[a] || null
  },
  onDrop: Ext.emptyFn,
  getReaderRoot: function() {
    var a = this;
    return a.associationKey || (a.associationKey = a.association.schema.getNamer()
      .readerRoot(a.role))
  },
  getReader: function() {
    var c = this,
      a = c.reader,
      d = c.cls,
      e = !c.associationKey,
      b = this.getReaderRoot();
    if (a && !a.isReader) {
      if (Ext.isString(a)) {
        a = {
          type: a
        }
      }
      Ext.applyIf(a, {
        model: d,
        rootProperty: b,
        useSimpleAccessors: e,
        type: c.defaultReaderType
      });
      a = c.reader = Ext.createByAlias("reader." + a.type, a)
    }
    return a
  },
  getInstanceName: function() {
    var a = this;
    return a.instanceName || (a.instanceName = a.association.schema.getNamer()
      .instanceName(a.role))
  },
  getOldInstanceName: function() {
    return this.oldInstanceName || (this.oldInstanceName = "$old" + this.getInstanceName())
  },
  getStoreName: function() {
    var a = this;
    return a.storeName || (a.storeName = a.association.schema.getNamer().storeName(
      a.role))
  },
  constructReader: function(e) {
    var f = this,
      a = f.getReader(),
      g = f.cls,
      h = !f.associationKey,
      b = f.getReaderRoot(),
      c, d;
    if (!a) {
      d = g.getProxy();
      if (d) {
        c = d.getReader();
        a = new c.self();
        a.copyFrom(c);
        a.setRootProperty(b)
      } else {
        a = new e.self({
          model: g,
          useSimpleAccessors: h,
          rootProperty: b
        })
      }
      f.reader = a
    }
    return a
  },
  read: function(c, f, d, e) {
    var a = this.constructReader(d),
      b = a.getRoot(f);
    if (b) {
      return a.readRecords(b, e, this._internalReadOptions)
    }
  },
  getCallbackOptions: function(a, b, c) {
    if (typeof a === "function") {
      a = {
        callback: a,
        scope: b || c
      }
    } else {
      if (a) {
        a = Ext.apply({}, a);
        a.scope = b || a.scope || c
      }
    }
    return a
  },
  doGetFK: function(b, m, k) {
    var h = this,
      l = h.cls,
      e = h.association.getFieldName(),
      j = h.getInstanceName(),
      i = b[j],
      a = m && m.reload,
      d = i !== undefined && !a,
      g = b.session,
      c, f;
    if (!d) {
      if (g) {
        c = b.get(e);
        if (c || c === 0) {
          d = g.peekRecord(l, c, true) && !a;
          i = g.getRecord(l, c, false)
        } else {
          d = true;
          b[j] = i = null
        }
      } else {
        if (e) {
          c = b.get(e);
          if (!c && c !== 0) {
            d = true;
            b[j] = i = null
          } else {
            if (!i) {
              i = l.createWithId(c)
            }
          }
        } else {
          d = true
        }
      }
    } else {
      if (i) {
        d = !i.isLoading()
      }
    }
    if (d) {
      if (m) {
        f = [i, null];
        k = k || m.scope || b;
        Ext.callback(m.success, k, f);
        f.push(true);
        Ext.callback(m, k, f);
        Ext.callback(m.callback, k, f)
      }
    } else {
      b[j] = i;
      m = h.getCallbackOptions(m, k, b);
      i.load(m)
    }
    return i
  },
  doSetFK: function(a, i, m, l) {
    var h = this,
      f = h.association.getFieldName(),
      j = h.getInstanceName(),
      e = a[j],
      c = h.inverse,
      d = c.setterName,
      g = a.session,
      k, b;
    if (i && i.isEntity) {
      if (e !== i) {
        b = h.getOldInstanceName();
        a[b] = e;
        a[j] = i;
        if (e && e.isEntity) {
          e[c.getInstanceName()] = undefined
        }
        if (f) {
          a.set(f, i.getId())
        }
        delete a[b];
        if (d) {
          i[d](a)
        }
      }
    } else {
      k = (a.changingKey && !c.isMany) || a.set(f, i);
      if (k && e && e.isEntity && !e.isEqual(e.getId(), i)) {
        a[j] = undefined;
        if (!c.isMany) {
          e[c.getInstanceName()] = undefined
        }
      }
    }
    if (m) {
      if (Ext.isFunction(m)) {
        m = {
          callback: m,
          scope: l || a
        }
      }
      return a.save(m)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data.schema, "Role"], 0));
(Ext.cmd.derive("Ext.data.schema.Association", Ext.Base, {
  isOneToOne: false,
  isManyToOne: false,
  isManyToMany: false,
  owner: null,
  field: null,
  constructor: function(a) {
    var c = this,
      d, b;
    Ext.apply(c, a);
    c.left = d = new c.Left(c, c.left);
    c.right = b = new c.Right(c, c.right);
    d.inverse = b;
    b.inverse = d
  },
  hasField: function() {
    return !!this.field
  },
  getFieldName: function() {
    var a = this.field;
    return a ? a.name : ""
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data.schema, "Association"], 0));
(Ext.cmd.derive("Ext.data.schema.OneToOne", Ext.data.schema.Association, {
  isOneToOne: true,
  isToOne: true,
  kind: "one-to-one",
  Left: Ext.define(null, {
    extend: "Ext.data.schema.Role",
    onDrop: function(a, b) {
      var c = this.getAssociatedItem(a);
      a[this.getInstanceName()] = null;
      if (c) {
        c[this.inverse.getInstanceName()] = null
      }
    },
    createGetter: function() {
      var a = this;
      return function() {
        return a.doGet(this)
      }
    },
    createSetter: function() {
      var a = this;
      return function(b) {
        return a.doSet(this, b)
      }
    },
    doGet: function(a) {
      var b = this.getInstanceName(),
        c = a[b],
        d = a.session;
      if (!c && d) {}
      return c || null
    },
    doSet: function(a, e) {
      var b = this.getInstanceName(),
        d = a[b],
        c = this.inverse.setterName;
      if (d !== e) {
        a[b] = e;
        if (c) {
          e[c](a)
        }
      }
      return d
    },
    read: function(a, d, b, e) {
      var c = this,
        f = c.callParent([a, d, b, e]),
        g;
      if (f) {
        g = f[0];
        if (g) {
          g[c.inverse.getInstanceName()] = a;
          a[c.getInstanceName()] = g;
          delete a.data[c.role]
        }
      }
    }
  }),
  Right: Ext.define(null, {
    extend: "Ext.data.schema.Role",
    left: false,
    side: "right",
    createGetter: function() {
      var a = this;
      return function(b, c) {
        return a.doGetFK(this, b, c)
      }
    },
    createSetter: function() {
      var a = this;
      return function(d, b, c) {
        return a.doSetFK(this, d, b, c)
      }
    },
    onDrop: function(f, d) {
      var b = this,
        c = b.association.field,
        a = b.getAssociatedItem(f),
        e;
      if (b.inverse.owner) {
        if (d) {
          e = f.get(c.name);
          if (e || e === 0) {
            a = d.getEntry(b.cls, e).record;
            if (a) {
              a.drop()
            }
          }
        } else {
          if (a) {
            a.drop()
          }
        }
      }
      if (c) {
        f.set(c.name, null)
      }
      f[b.getInstanceName()] = null;
      if (a) {
        a[b.inverse.getInstanceName()] = null
      }
    },
    onValueChange: function(h, g, f) {
      var e = this,
        a = h[e.getOldInstanceName()] || e.getAssociatedItem(h),
        d = f || f === 0,
        c = e.getInstanceName(),
        b = e.cls;
      h.changingKey = true;
      e.doSetFK(h, f);
      if (!d) {
        h[c] = null
      } else {
        if (g && b) {
          h[c] = g.peekRecord(b, f) || undefined
        }
      }
      if (e.inverse.owner && a) {
        e.association.schema.queueKeyCheck(a, e)
      }
      h.changingKey = false
    },
    checkKeyForDrop: function(a) {
      var b = this.inverse.getAssociatedItem(a);
      if (!b) {
        a.drop()
      }
    },
    read: function(d, e, o, f) {
      var i = this,
        m = i.callParent([d, e, o, f]),
        j, l, n, h, k, b, c, a, g;
      if (m) {
        j = m[0];
        l = i.association.field;
        if (l) {
          n = l.name
        }
        h = d.session;
        g = d.data;
        if (j) {
          if (h) {
            k = h.getRefs(j, this.inverse, true);
            a = (k && k[d.id]) || (g[n] === undefined)
          } else {
            a = true
          }
          if (a) {
            if (l) {
              c = g[n];
              b = j.id;
              if (c !== b) {
                g[n] = b;
                if (h) {
                  h.updateReference(d, l, b, c)
                }
              }
            }
            j[i.inverse.getInstanceName()] = d;
            d[i.getInstanceName()] = j
          }
          delete g[i.role]
        }
      }
    }
  })
}, 0, 0, 0, 0, 0, 0, [Ext.data.schema, "OneToOne"], 0));
(Ext.cmd.derive("Ext.data.schema.ManyToOne", Ext.data.schema.Association, {
  isManyToOne: true,
  isToOne: true,
  kind: "many-to-one",
  Left: Ext.define(null, {
    extend: "Ext.data.schema.Role",
    isMany: true,
    onDrop: function(g, e) {
      var f = this,
        j = f.getAssociatedItem(g),
        b, d, c, h, a;
      if (j) {
        b = j.removeAll();
        if (b && f.inverse.owner) {
          for (c = 0, d = b.length; c < d; ++c) {
            b[c].drop()
          }
        }
        j.destroy();
        g[f.getStoreName()] = null
      } else {
        if (e) {
          b = e.getRefs(g, f);
          if (b) {
            for (a in b) {
              b[a].drop()
            }
          }
        }
      }
    },
    processUpdate: function(f, b) {
      var g = this,
        d = g.inverse.cls,
        e = b.R,
        a, h, i, c;
      if (e) {
        for (a in e) {
          h = f.peekRecord(d, a);
          if (h) {
            c = f.getEntityList(g.cls, e[a]);
            i = g.getAssociatedItem(h);
            if (i) {
              i.loadData(c);
              i.complete = true
            } else {
              h[g.getterName](null, null, c)
            }
          } else {
            f.onInvalidAssociationEntity(d, a)
          }
        }
      }
    },
    findRecords: function(h, j, d, n) {
      var g = d,
        k = h.getRefs(j, this, true),
        l = this.association.field,
        m = l.name,
        c, b, e, f, a;
      if (!j.phantom) {
        g = [];
        if (k || n) {
          if (d) {
            a = {};
            for (e = 0, f = d.length; e < f; ++e) {
              c = d[e];
              b = c.id;
              if (k && k[b]) {
                g.push(c)
              } else {
                if (n && c.data[m] === undefined) {
                  g.push(c);
                  c.data[m] = j.id;
                  h.updateReference(c, l, j.id, undefined)
                }
              }
              a[b] = true
            }
          }
          if (k) {
            for (b in k) {
              if (!a || !a[b]) {
                g.push(k[b])
              }
            }
          }
        }
      }
      return g
    },
    processLoad: function(b, a, e, d) {
      var c = e;
      if (d) {
        c = this.findRecords(d, a, e)
      }
      this.onLoadMany(a, c, d);
      return c
    },
    adoptAssociated: function(b, f) {
      var c = this.getAssociatedItem(b),
        e, d, a;
      if (c) {
        c.setSession(f);
        e = c.getData().items;
        for (d = 0, a = e.length; d < a; ++d) {
          f.adopt(e[d])
        }
      }
    },
    createGetter: function() {
      var a = this;
      return function(c, d, f) {
        var e = this.session,
          b = !!f;
        if (e) {
          f = a.findRecords(e, this, f, true);
          if (!b && (!f || !f.length)) {
            f = null
          }
        }
        return a.getAssociatedStore(this, c, d, f, b)
      }
    },
    createSetter: null,
    onAddToMany: function(a, b) {
      this.syncFK(b, a.getAssociatedEntity(), false)
    },
    onLoadMany: function(k, e, j) {
      var m = this.inverse.getInstanceName(),
        b = k.getId(),
        l = this.association.field,
        g, h, d, c, f, a;
      if (l) {
        for (g = 0, h = e.length; g < h; ++g) {
          d = e[g];
          d[m] = k;
          if (l) {
            a = l.name;
            f = d.data;
            c = f[a];
            if (c !== b) {
              f[a] = b;
              if (j) {
                j.updateReference(d, l, b, c)
              }
            }
          }
        }
      }
    },
    onRemoveFromMany: function(a, b) {
      this.syncFK(b, a.getAssociatedEntity(), true)
    },
    read: function(g, a, k, c) {
      var f = this,
        j = f.inverse.getInstanceName(),
        b = f.callParent([g, a, k, c]),
        h, e, d;
      if (b) {
        h = g[f.getterName](null, null, b);
        delete g.data[f.role];
        b = h.getData().items;
        for (d = 0, e = b.length; d < e; ++d) {
          b[d][j] = g
        }
      }
    },
    syncFK: function(e, k, l) {
      var j = this.association.getFieldName(),
        g = this.inverse,
        f = g.setterName,
        m = g.getInstanceName(),
        h = e.length,
        b = k.getId(),
        a, d, c;
      while (h-- > 0) {
        d = e[h];
        a = !d.isEqual(b, d.get(j));
        c = l ? null : k;
        if (a !== l) {
          d.changingKey = true;
          d[f](c);
          d.changingKey = false
        } else {
          d[m] = c
        }
      }
    }
  }),
  Right: Ext.define(null, {
    extend: "Ext.data.schema.Role",
    left: false,
    side: "right",
    onDrop: function(c, b) {
      var a = this.association.field;
      if (a) {
        c.set(a.name, null)
      }
      c[this.getInstanceName()] = null
    },
    createGetter: function() {
      var a = this;
      return function(b, c) {
        return a.doGetFK(this, b, c)
      }
    },
    createSetter: function() {
      var a = this;
      return function(b, c, d) {
        return a.doSetFK(this, b, c, d)
      }
    },
    checkMembership: function(c, d) {
      var b = this.association.field,
        a;
      a = this.getSessionStore(c, d.get(b.name));
      if (a && !a.contains(d)) {
        a.add(d)
      }
    },
    onValueChange: function(d, h, b, a) {
      var j = this,
        m = j.getInstanceName(),
        o = j.cls,
        c, n, l, e, f, k, g;
      if (!d.changingKey) {
        c = b || b === 0;
        if (!c) {
          d[m] = null
        }
        if (h) {
          l = j.getSessionStore(h, a);
          if (l) {
            l.remove(d)
          }
          if (c) {
            l = j.getSessionStore(h, b);
            if (l && !l.isLoading()) {
              l.add(d)
            }
            if (o) {
              g = h.peekRecord(o, b)
            }
            d[m] = g || undefined
          }
        } else {
          n = d.joined;
          if (n) {
            for (e = 0, f = n.length; e < f; ++e) {
              l = n[e];
              if (l.isStore) {
                k = l.getAssociatedEntity();
                if (k && k.self === j.cls && k.getId() === a) {
                  l.remove(d)
                }
              }
            }
          }
        }
      }
      if (j.owner && b === null) {
        j.association.schema.queueKeyCheck(d, j)
      }
    },
    checkKeyForDrop: function(b) {
      var a = this.association.field;
      if (b.get(a.name) === null) {
        b.drop()
      }
    },
    getSessionStore: function(c, b) {
      var a = this.cls,
        d;
      if (a) {
        d = c.peekRecord(a, b);
        if (d) {
          return this.inverse.getAssociatedItem(d)
        }
      }
    },
    read: function(f, c, b, e) {
      var d = this.callParent([f, c, b, e]),
        a;
      if (d) {
        a = d[0];
        if (a) {
          f[this.getInstanceName()] = a;
          delete f.data[this.role]
        }
      }
    }
  })
}, 0, 0, 0, 0, 0, 0, [Ext.data.schema, "ManyToOne"], 0));
(Ext.cmd.derive("Ext.data.schema.ManyToMany", Ext.data.schema.Association, {
  isManyToMany: true,
  isToMany: true,
  kind: "many-to-many",
  Left: Ext.define(null, {
    extend: "Ext.data.schema.Role",
    isMany: true,
    digitRe: /^\d+$/,
    findRecords: function(k, l, d) {
      var m = k.getMatrixSlice(this.inverse, l.id),
        e = m.members,
        j = [],
        n = this.cls,
        a, g, h, b, f, c;
      if (d) {
        a = {};
        for (g = 0, h = d.length; g < h; ++g) {
          c = d[g];
          b = c.id;
          f = e[b];
          if (!(f && f[2] === -1)) {
            j.push(c)
          }
          a[b] = true
        }
      }
      for (b in e) {
        f = e[b];
        if (!a || !a[b] && (f && f[2] !== -1)) {
          c = k.peekRecord(n, b);
          if (c) {
            j.push(c)
          }
        }
      }
      return j
    },
    processLoad: function(b, a, e, d) {
      var c = e;
      if (d) {
        c = this.findRecords(d, a, e);
        this.onAddToMany(b, c, true)
      }
      return c
    },
    processUpdate: function(f, b) {
      var g = this,
        d = g.inverse.cls,
        e = b.R,
        a, h, i, c;
      if (e) {
        for (a in e) {
          h = f.peekRecord(d, a);
          if (h) {
            c = f.getEntityList(g.cls, e[a]);
            i = g.getAssociatedItem(h);
            if (i) {
              i.loadData(c);
              i.complete = true
            } else {
              h[g.getterName](null, null, c)
            }
          } else {
            f.onInvalidAssociationEntity(d, a)
          }
        }
      }
      g.processMatrixBlock(f, b.C, 1);
      g.processMatrixBlock(f, b.D, -1)
    },
    checkMembership: function(h, i) {
      var j = h.getMatrix(this.association, true),
        g, d, e, l, m, a, c, f, b, k;
      if (!j) {
        return
      }
      g = this.left ? j.right : j.left;
      d = g.inverse.role.cls;
      e = this.inverse;
      m = g.slices;
      if (m) {
        l = m[i.id];
        if (l) {
          c = l.members;
          for (a in c) {
            f = c[a];
            if (f[2] !== -1) {
              b = h.peekRecord(d, a);
              if (b) {
                k = e.getAssociatedItem(b);
                if (k) {
                  k.matrixUpdate = 1;
                  k.add(i);
                  k.matrixUpdate = 0
                }
              }
            }
          }
        }
      }
    },
    onStoreCreate: function(b, d, e) {
      var c = this,
        a;
      if (d) {
        a = d.getMatrixSlice(c.inverse, e);
        a.attach(b);
        a.notify = c.onMatrixUpdate;
        a.scope = c
      }
    },
    processMatrixBlock: function(e, d, c) {
      var a = this.inverse,
        b = this.digitRe,
        f, g;
      if (d) {
        for (g in d) {
          if (b.test(g)) {
            g = parseInt(g, 10)
          }
          f = e.getMatrixSlice(a, g);
          f.update(d[g], c)
        }
      }
    },
    createGetter: function() {
      var a = this;
      return function(c, d, f) {
        var e = this.session,
          b;
        if (e) {
          b = !!f;
          f = a.findRecords(e, this, f);
          if (!b && !f.length) {
            f = null
          }
        }
        return a.getAssociatedStore(this, c, d, f, b)
      }
    },
    onAddToMany: function(a, c, b) {
      if (!a.matrixUpdate) {
        a.matrixUpdate = 1;
        a.matrix.update(c, b === true ? 0 : 1);
        a.matrixUpdate = 0
      }
    },
    onRemoveFromMany: function(b, a) {
      if (!b.matrixUpdate) {
        b.matrixUpdate = 1;
        b.matrix.update(a, -1);
        b.matrixUpdate = 0
      }
    },
    read: function(a, d, b, e) {
      var c = this,
        f = c.callParent([a, d, b, e]);
      if (f) {
        a[c.getterName](null, null, f);
        delete a.data[c.role]
      }
    },
    onMatrixUpdate: function(e, g, d) {
      var a = e.store,
        b, f, c;
      if (a && !a.loading && !a.matrixUpdate) {
        a.matrixUpdate = 1;
        b = a.indexOfId(g);
        if (d < 0) {
          if (b >= 0) {
            a.remove([b])
          }
        } else {
          if (b < 0) {
            c = a.getSession().getEntry(this.type, g);
            f = c && c.record;
            if (f) {
              a.add(f)
            }
          }
        }
        a.matrixUpdate = 0
      }
    },
    adoptAssociated: function(b, f) {
      var d = this.getAssociatedItem(b),
        c, e, a;
      if (d) {
        d.setSession(f);
        this.onStoreCreate(d, f, b.getId());
        c = d.getData().items;
        for (e = 0, a = c.length; e < a; ++e) {
          f.adopt(c[e])
        }
      }
    }
  }, function() {
    var a = this;
    Ext.ClassManager.onCreated(function() {
      Ext.data.schema.ManyToMany.prototype.Right = Ext.define(null, {
        extend: a,
        left: false,
        side: "right"
      })
    }, null, "Ext.data.schema.ManyToMany")
  })
}, 0, 0, 0, 0, 0, 0, [Ext.data.schema, "ManyToMany"], 0));
(Ext.cmd.derive("Ext.util.Inflector", Ext.Base, {
  singleton: true,
  plurals: [
    [(/(quiz)$/i), "$1zes"],
    [(/^(ox)$/i), "$1en"],
    [(/([m|l])ouse$/i), "$1ice"],
    [(/(matr|vert|ind)ix|ex$/i), "$1ices"],
    [(/(x|ch|ss|sh)$/i), "$1es"],
    [(/([^aeiouy]|qu)y$/i), "$1ies"],
    [(/(hive)$/i), "$1s"],
    [(/(?:([^f])fe|([lr])f)$/i), "$1$2ves"],
    [(/sis$/i), "ses"],
    [(/([ti])um$/i), "$1a"],
    [(/(buffal|tomat|potat)o$/i), "$1oes"],
    [(/(bu)s$/i), "$1ses"],
    [(/(alias|status|sex)$/i), "$1es"],
    [(/(octop|vir)us$/i), "$1i"],
    [(/(ax|test)is$/i), "$1es"],
    [(/^(p)erson$/i), "$1eople"],
    [(/^(m)an$/i), "$1en"],
    [(/(.*)(child)(ren)?$/i), "$1$2ren"],
    [(/s$/i), "s"],
    [(/$/), "s"]
  ],
  singulars: [
    [(/(address)$/i), "$1"],
    [(/(quiz)zes$/i), "$1"],
    [(/(matr)ices$/i), "$1ix"],
    [(/(vert|ind)ices$/i), "$1ex"],
    [(/^(ox)en/i), "$1"],
    [(/(alias|status)es$/i), "$1"],
    [(/(octop|vir)i$/i), "$1us"],
    [(/(cris|ax|test)es$/i), "$1is"],
    [(/(shoe)s$/i), "$1"],
    [(/(o)es$/i), "$1"],
    [(/(bus)es$/i), "$1"],
    [(/([m|l])ice$/i), "$1ouse"],
    [(/(x|ch|ss|sh)es$/i), "$1"],
    [(/(m)ovies$/i), "$1ovie"],
    [(/(s)eries$/i), "$1eries"],
    [(/([^aeiouy]|qu)ies$/i), "$1y"],
    [(/([lr])ves$/i), "$1f"],
    [(/(tive)s$/i), "$1"],
    [(/(hive)s$/i), "$1"],
    [(/([^f])ves$/i), "$1fe"],
    [(/(^analy)ses$/i), "$1sis"],
    [(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i),
      "$1$2sis"
    ],
    [(/([ti])a$/i), "$1um"],
    [(/(n)ews$/i), "$1ews"],
    [(/(p)eople$/i), "$1erson"],
    [(/s$/i), ""]
  ],
  uncountable: ["sheep", "fish", "series", "species", "money", "rice",
    "information", "equipment", "grass", "mud", "offspring", "deer",
    "means"
  ],
  singular: function(b, a) {
    this.singulars.unshift([b, a])
  },
  plural: function(b, a) {
    this.plurals.unshift([b, a])
  },
  clearSingulars: function() {
    this.singulars = []
  },
  clearPlurals: function() {
    this.plurals = []
  },
  isTransnumeral: function(a) {
    return Ext.Array.indexOf(this.uncountable, a) != -1
  },
  pluralize: function(f) {
    if (this.isTransnumeral(f)) {
      return f
    }
    var e = this.plurals,
      d = e.length,
      a, c, b;
    for (b = 0; b < d; b++) {
      a = e[b];
      c = a[0];
      if (c == f || (c.test && c.test(f))) {
        return f.replace(c, a[1])
      }
    }
    return f
  },
  singularize: function(f) {
    if (this.isTransnumeral(f)) {
      return f
    }
    var e = this.singulars,
      d = e.length,
      a, c, b;
    for (b = 0; b < d; b++) {
      a = e[b];
      c = a[0];
      if (c == f || (c.test && c.test(f))) {
        return f.replace(c, a[1])
      }
    }
    return f
  },
  classify: function(a) {
    return Ext.String.capitalize(this.singularize(a))
  },
  ordinalize: function(d) {
    var b = parseInt(d, 10),
      c = b % 10,
      a = b % 100;
    if (11 <= a && a <= 13) {
      return d + "th"
    } else {
      switch (c) {
        case 1:
          return d + "st";
        case 2:
          return d + "nd";
        case 3:
          return d + "rd";
        default:
          return d + "th"
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util, "Inflector"], function() {
  var b = {
      alumnus: "alumni",
      cactus: "cacti",
      focus: "foci",
      nucleus: "nuclei",
      radius: "radii",
      stimulus: "stimuli",
      ellipsis: "ellipses",
      paralysis: "paralyses",
      oasis: "oases",
      appendix: "appendices",
      index: "indexes",
      beau: "beaux",
      bureau: "bureaux",
      tableau: "tableaux",
      woman: "women",
      child: "children",
      man: "men",
      corpus: "corpora",
      criterion: "criteria",
      curriculum: "curricula",
      genus: "genera",
      memorandum: "memoranda",
      phenomenon: "phenomena",
      foot: "feet",
      goose: "geese",
      tooth: "teeth",
      antenna: "antennae",
      formula: "formulae",
      nebula: "nebulae",
      vertebra: "vertebrae",
      vita: "vitae"
    },
    a;
  for (a in b) {
    if (b.hasOwnProperty(a)) {
      this.plural(a, b[a]);
      this.singular(b[a], a)
    }
  }
}));
(Ext.cmd.derive("Ext.data.schema.Namer", Ext.Base, {
  isNamer: true,
  capitalize: function(a) {
    return Ext.String.capitalize(a)
  },
  fieldRole: function(b) {
    var a = b.match(this.endsWithIdRe, "");
    if (a) {
      b = b.substr(0, b.length - (a[1] || a[2]).length)
    }
    return this.apply("uncapitalize", b)
  },
  idField: function(a) {
    return this.apply("uncapitalize,singularize", a) + "Id"
  },
  instanceName: function(a) {
    return this.apply("underscore", a)
  },
  multiRole: function(a) {
    return this.apply("undotted,uncapitalize,pluralize", a)
  },
  pluralize: function(a) {
    return Ext.util.Inflector.pluralize(a)
  },
  readerRoot: function(a) {
    return this.apply("uncapitalize", a)
  },
  singularize: function(a) {
    return Ext.util.Inflector.singularize(a)
  },
  storeName: function(a) {
    return this.apply("underscore", a)
  },
  uncapitalize: function(a) {
    return Ext.String.uncapitalize(a)
  },
  underscore: function(a) {
    return "_" + a
  },
  uniRole: function(a) {
    return this.apply("undotted,uncapitalize,singularize", a)
  },
  undotted: function(b) {
    if (b.indexOf(".") < 0) {
      return b
    }
    var c = b.split("."),
      a = c.length;
    while (a-- > 1) {
      c[a] = this.apply("capitalize", c[a])
    }
    return c.join("")
  },
  getterName: function(b) {
    var a = b.role;
    if (b && b.isMany) {
      return a
    }
    return "get" + this.apply("capitalize", a)
  },
  inverseFieldRole: function(g, h, e, b) {
    var f = this,
      a = f.apply(h ? "uniRole" : "multiRole", g),
      d = f.apply("pluralize", e),
      c = f.apply("undotted,pluralize", b);
    if (d.toLowerCase() !== c.toLowerCase()) {
      a = e + f.apply("capitalize", a)
    }
    return a
  },
  manyToMany: function(e, d, a) {
    var c = this,
      b = c.apply("undotted,capitalize,singularize", d) + c.apply(
        "undotted,capitalize,pluralize", a);
    if (e) {
      b = c.apply("capitalize", e + b)
    }
    return b
  },
  manyToOne: function(d, b, a, c) {
    return this.apply("capitalize,singularize", a) + this.apply(
      "capitalize", b)
  },
  matrixRole: function(c, b) {
    var a = this.apply(c ? "multiRole,capitalize" : "multiRole", b);
    return c ? c + a : a
  },
  oneToOne: function(d, b, a, c) {
    return this.apply("undotted,capitalize,singularize", a) + this.apply(
      "capitalize", b)
  },
  setterName: function(a) {
    return "set" + this.apply("capitalize", a.role)
  },
  endsWithIdRe: /(?:(_id)|[^A-Z](Id))$/,
  cache: {},
  apply: function(e, c) {
    var h = this,
      b = h.cache,
      j = b[c] || (b[c] = {}),
      g = j[e],
      f, d, a;
    if (!g) {
      if (e.indexOf(",") < 0) {
        g = h[e](c)
      } else {
        d = (a = e.split(",")).length;
        g = c;
        for (f = 0; f < d; ++f) {
          g = h.apply(a[f], g)
        }
      }
      j[e] = g
    }
    return g
  }
}, 0, 0, 0, 0, ["namer.default"], [
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ]
], [Ext.data.schema, "Namer"], 0));
(Ext.cmd.derive("Ext.data.schema.Schema", Ext.Base, {
  aliasPrefix: "schema.",
  isSchema: true,
  type: "default",
  statics: {
    instances: {},
    get: function(d) {
      var f = this,
        c = f.instances,
        g = "default",
        b = d && Ext.isString(d),
        a, e;
      if (d) {
        if (d.isSchema) {
          return d
        }
        g = b ? d : (d.id || g)
      }
      if (!(a = c[g])) {
        c[g] = a = f.create(d);
        a.id = g
      } else {
        if (d && !b) {
          e = Ext.merge({}, a.config);
          Ext.merge(e, d);
          a.setConfig(e);
          a.config = e
        }
      }
      return a
    },
    lookupEntity: function(a) {
      var d = null,
        f = this.instances,
        c, b, e;
      if (a) {
        if (a.isEntity) {
          d = a.self
        } else {
          if (Ext.isFunction(a)) {
            d = a
          } else {
            if (Ext.isString(a)) {
              d = Ext.ClassManager.get(a);
              if (d && (!d.prototype || !d.prototype.isEntity)) {
                d = null
              }
              if (!d) {
                for (b in f) {
                  e = f[b];
                  c = e.getEntity(a);
                  if (c) {
                    if (d) {
                      Ext.raise('Ambiguous entity name "' + a +
                        '". Defined by schema "' + d.schema.type +
                        '" and "' + b + '"')
                    }
                    d = c
                  }
                }
              }
              if (!d) {
                Ext.raise('No such Entity "' + a + '".')
              }
            }
          }
        }
      }
      return d
    }
  },
  assocCount: 0,
  entityCount: 0,
  config: {
    defaultIdentifier: null,
    keyCheckDelay: 10,
    namer: "default",
    namespace: null,
    proxy: {
      type: "ajax",
      url: "{prefix}/{entityName}"
    },
    urlPrefix: ""
  },
  onClassExtended: function(a, c) {
    var b = c.alias;
    if (b && !c.type) {
      if (!Ext.isString(b)) {
        b = b[0]
      }
      a.prototype.type = b.substring(this.prototype.aliasPrefix.length)
    }
  },
  constructor: function(a) {
    this.initConfig(a);
    this.clear()
  },
  applyDefaultIdentifier: function(a) {
    return a && Ext.Factory.dataIdentifier(a)
  },
  applyNamer: function(b) {
    var a = Ext.data.schema.Namer.create(b);
    a.schema = this;
    return a
  },
  applyNamespace: function(b) {
    if (b) {
      var a = b.length - 1;
      if (b.charAt(a) !== ".") {
        b += "."
      }
    }
    return b
  },
  applyProxy: function(a) {
    return Ext.util.ObjectTemplate.create(a)
  },
  eachAssociation: function(d, c) {
    var b = this.associations,
      a;
    for (a in b) {
      if (b.hasOwnProperty(a)) {
        if (d.call(c, a, b[a]) === false) {
          break
        }
      }
    }
  },
  eachEntity: function(c, b) {
    var d = this.entities,
      a;
    for (a in d) {
      if (d.hasOwnProperty(a)) {
        if (c.call(b, a, d[a].cls) === false) {
          break
        }
      }
    }
  },
  getAssociation: function(a) {
    var b = this.associations[a];
    return b || null
  },
  getEntity: function(a) {
    var b = this.entityClasses[a] || this.entities[a];
    return (b && b.cls) || null
  },
  getEntityName: function(a) {
    var d = this.getNamespace(),
      c, b;
    if (typeof a === "string") {
      b = a
    } else {
      b = a.$className || null
    }
    if (b) {
      if (d) {
        c = d.length;
        if (b.substring(0, c) !== d) {
          return b
        }
      }
      if (c) {
        b = b.substring(c)
      }
    }
    return b
  },
  hasAssociations: function(a) {
    a = a.entityName || a;
    return !!this.associationEntityMap[a]
  },
  hasEntity: function(a) {
    var b = this.getEntityName(a);
    return !!(this.entities[b] || this.entityClasses[b])
  },
  addMatrix: function(m, g, d, c, q) {
    var r = this,
      k = r.getNamer(),
      o = r.associations,
      a = r.entities,
      f = c.type,
      p = q.type,
      e = c.field || k.apply("idField", f),
      i = q.field || k.apply("idField", p),
      b = c.role || k.matrixRole(d, f),
      l = q.role || k.matrixRole(d, p),
      n, h, j;
    h = a[f] || (a[f] = {
      cls: null,
      name: f,
      associations: {}
    });
    j = a[p] || (a[p] = {
      cls: null,
      name: p,
      associations: {}
    });
    ++r.assocCount;
    o[g] = n = new Ext.data.schema.ManyToMany({
      name: g,
      schema: r,
      definedBy: m,
      left: {
        cls: h.cls,
        type: f,
        role: b,
        field: e,
        associationKey: c.associationKey
      },
      right: {
        cls: j.cls,
        type: p,
        role: l,
        field: i,
        associationKey: q.associationKey
      }
    });
    h.associations[n.right.role] = n.right;
    j.associations[n.left.role] = n.left;
    if (h.cls) {
      r.associationEntityMap[h.cls.entityName] = true
    }
    if (j.cls) {
      r.associationEntityMap[j.cls.entityName] = true
    }
    r.decorateModel(n)
  },
  addReference: function(q, a, o, b) {
    var t = this,
      m = t.getNamer(),
      d = t.entities,
      r = t.associations,
      l = q.entityName,
      e = o.association,
      p = !!o.legacy,
      i = o.child,
      k = o.parent,
      n = o.role,
      s = o.type || k || i,
      j = o.inverse,
      h = Ext.isString(j) ? {
        role: j
      } : j,
      g = h && h.role,
      c, f;
    if (!n) {
      if (p) {
        n = m.apply("uncapitalize", s)
      } else {
        n = m.apply("fieldRole", a.name)
      }
    }
    if (!g) {
      g = m.inverseFieldRole(l, b, n, s)
    }
    if (!e) {
      if (b) {
        e = m.oneToOne(q, g, s, n)
      } else {
        e = m.manyToOne(q, g, s, n)
      }
    }
    c = d[s] || (d[s] = {
      cls: null,
      name: s,
      associations: {}
    });
    f = b ? Ext.data.schema.OneToOne : Ext.data.schema.ManyToOne;
    e = new f({
      name: e,
      owner: i ? "left" : (k ? "right" : null),
      definedBy: q,
      schema: t,
      field: a,
      nullable: a ? !!a.allowBlank : true,
      legacy: o.legacy,
      left: {
        cls: q,
        type: l,
        role: g,
        extra: h
      },
      right: {
        cls: c.cls,
        type: s,
        role: n,
        extra: o
      }
    });
    q.associations[n] = e.right;
    c.associations[g] = e.left;
    if (a) {
      a.reference = e.right;
      q.references.push(a)
    }++t.assocCount;
    t.associationEntityMap[l] = true;
    if (c.cls) {
      t.associationEntityMap[c.cls.entityName] = true
    }
    r[e.name] = e;
    if (e.right.cls) {
      t.decorateModel(e)
    }
  },
  privates: {
    addEntity: function(d) {
      var h = this,
        g = h.entities,
        k = d.entityName,
        l = g[k],
        f = d.fields,
        c, j, e, b, a;
      if (!l) {
        g[k] = l = {
          name: k,
          associations: {}
        }
      } else {
        c = l.associations;
        for (a in c) {
          c[a].inverse.cls = d;
          h.associationEntityMap[k] = true;
          h.decorateModel(c[a].association)
        }
      }
      l.cls = d;
      d.prototype.associations = d.associations = l.associations;
      h.entityClasses[d.$className] = l;
      ++h.entityCount;
      for (e = 0, b = f.length; e < b; ++e) {
        j = f[e];
        if (j.reference) {
          h.addReferenceDescr(d, j)
        }
      }
    },
    addMatrices: function(f, a) {
      var e = this,
        b, d, c;
      if (Ext.isString(a)) {
        e.addMatrixDescr(f, null, a)
      } else {
        if (a[0]) {
          for (b = 0, d = a.length; b < d; ++b) {
            e.addMatrixDescr(f, null, a[b])
          }
        } else {
          for (c in a) {
            e.addMatrixDescr(f, c, a[c])
          }
        }
      }
    },
    addMatrixDescr: function(e, a, f) {
      var g = this,
        i = e.entityName,
        d = g.associations,
        h = g.getNamer(),
        c = f.left,
        k = f.right,
        j, b;
      if (Ext.isString(f)) {
        if (f.charAt(0) === "#") {
          c = {
            type: i
          };
          k = {
            type: f.substring(1)
          }
        } else {
          if (f.charAt(j = f.length - 1) === "#") {
            c = {
              type: f.substring(0, j)
            };
            k = {
              type: i
            }
          } else {
            if (h.apply("multiRole", i) < h.apply("multiRole", f)) {
              c = {
                type: i
              };
              k = {
                type: f
              }
            } else {
              c = {
                type: f
              };
              k = {
                type: i
              }
            }
          }
        }
      } else {
        b = f.relation;
        if (c || (!k && h.apply("multiRole", i) < h.apply("multiRole", f.type))) {
          if (!c || c === true) {
            c = {
              type: i
            }
          } else {
            c = Ext.apply({
              type: i
            }, c)
          }
          k = f
        } else {
          if (!k || k === true) {
            k = {
              type: i
            }
          } else {
            k = Ext.apply({
              type: i
            }, k)
          }
          c = f
        }
      }
      if (!a) {
        a = h.manyToMany(b, c.type, k.type)
      }
      if (!(a in d)) {
        g.addMatrix(e, a, b, c, k)
      }
    },
    addReferenceDescr: function(b, d) {
      var a = this,
        c = d.$reference;
      if (Ext.isString(c)) {
        c = {
          type: c
        }
      } else {
        c = Ext.apply({}, c)
      }
      if (c.legacy) {
        if (c.single) {
          a.addLegacySingle(b, c)
        } else {
          a.addLegacyHasMany(b, c)
        }
      } else {
        a.addReference(b, d, c, d.unique)
      }
    },
    addPending: function(a, c, e, b) {
      var d = this.pending;
      if (!d[a]) {
        d[a] = []
      }
      d[a].push([c, e, b])
    },
    addLegacyBelongsTo: function(a, b) {
      this.addLegacySingle(a, b)
    },
    addLegacyHasOne: function(a, b) {
      this.addLegacySingle(a, b)
    },
    addLegacySingle: function(c, e) {
      var b, a, d;
      e = this.constructLegacyAssociation(c, e);
      e.single = true;
      a = e.type;
      b = e.foreignKey || (a.toLowerCase() + "_id");
      d = c.getField(b);
      if (d) {
        d.$reference = e
      }
      this.addReference(c, d, e, true)
    },
    addLegacyHasMany: function(d, i) {
      var j = this,
        f = j.entities,
        c = j.pending,
        a = i.associationKey,
        l, b, k, h, g, e;
      i = this.constructLegacyAssociation(d, i);
      b = i.type;
      h = f[b];
      if (h && h.cls) {
        i.type = d.entityName;
        g = i.foreignKey || (i.type.toLowerCase() + "_id");
        l = h.cls;
        k = l.getField(g);
        i.inverse = i || {};
        e = i.name;
        if (e || a) {
          if (e) {
            i.inverse.role = e
          }
          if (a) {
            i.inverse.associationKey = a
          }
        }
        if (k) {
          k.$reference = i
        }
        j.addReference(l, k, i, false)
      } else {
        if (!c[b]) {
          c[b] = []
        }
        c[b].push([d, i])
      }
    },
    constructLegacyAssociation: function(b, c) {
      if (Ext.isString(c)) {
        c = {
          model: c
        }
      }
      c.legacy = true;
      c.type = this.getEntityName(c.model);
      var a = c.associatedName || c.name;
      if (a) {
        c.role = a
      }
      return c
    },
    afterLegacyAssociations: function(b) {
      var f = this.pending,
        c = b.entityName,
        e = f[c],
        d, a;
      if (e) {
        for (d = 0, a = e.length; d < a; ++d) {
          this.addLegacyHasMany.apply(this, e[d])
        }
        delete f[c]
      }
    },
    clear: function(b) {
      var a = this,
        c = a.timer;
      delete a.setConfig;
      if (c) {
        window.clearTimeout(c);
        a.timer = null
      }
      a.associations = {};
      a.associationEntityMap = {};
      a.entities = {};
      a.entityClasses = {};
      a.pending = {};
      a.assocCount = a.entityCount = 0;
      if (b) {
        a.setNamespace(null)
      }
    },
    constructProxy: function(d) {
      var b = this,
        c = Ext.Object.chain(d),
        a = b.getProxy();
      c.schema = b;
      c.prefix = b.getUrlPrefix();
      return a.apply(c)
    },
    applyDecoration: function(g) {
      var e = this,
        a = g.inverse.cls,
        f = e.getNamer(),
        c, b, d;
      if (a && !g.decorated) {
        g.decorated = true;
        d = a.prototype;
        if (!(c = g.getterName)) {
          g.getterName = c = f.getterName(g)
        }
        d[c] = g.createGetter();
        if (g.createSetter) {
          if (!(b = g.setterName)) {
            g.setterName = b = f.setterName(g)
          }
          d[b] = g.createSetter()
        }
      }
    },
    decorateModel: function(a) {
      this.applyDecoration(a.left);
      this.applyDecoration(a.right)
    },
    processKeyChecks: function(d) {
      var f = this,
        b = f.keyCheckQueue,
        g = f.timer,
        a, c, e;
      if (g) {
        window.clearTimeout(g);
        f.timer = null
      }
      if (!b) {
        return
      }
      do {
        b = f.keyCheckQueue;
        f.keyCheckQueue = [];
        for (c = 0, a = b.length; c < a; ++c) {
          e = b[c];
          e.role.checkKeyForDrop(e.record)
        }
      } while (d && f.keyCheckQueue.length)
    },
    queueKeyCheck: function(a, e) {
      var c = this,
        b = c.keyCheckQueue,
        d = c.timer;
      if (!b) {
        c.keyCheckQueue = b = []
      }
      b.push({
        record: a,
        role: e
      });
      if (!d) {
        c.timer = d = Ext.Function.defer(c.processKeyChecks, c.getKeyCheckDelay(),
          c)
      }
    },
    rankEntities: function() {
      var e = this,
        f = e.entities,
        a = Ext.Object.getKeys(f),
        d = a.length,
        c, b;
      e.nextRank = 1;
      a.sort();
      for (b = 0; b < d; ++b) {
        c = f[a[b]].cls;
        if (!c.rank) {
          e.rankEntity(c)
        }
      }
    },
    rankEntity: function(c) {
      var b = c.associations,
        e, d, a;
      for (a in b) {
        d = b[a];
        if (!d.left && d.association.field) {
          e = d.cls;
          if (!e.rank) {
            this.rankEntity(e)
          }
        }
      }
      c.rank = this.nextRank++
    }
  }
}, 1, 0, 0, 0, ["schema.default"], [
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ]
], [Ext.data.schema, "Schema"], 0));
(Ext.cmd.derive("Ext.data.AbstractStore", Ext.Base, {
  factoryConfig: {
    defaultType: "store",
    type: "store"
  },
  $configPrefixed: false,
  $configStrict: false,
  config: {
    filters: null,
    autoDestroy: undefined,
    storeId: null,
    statefulFilters: false,
    sorters: null,
    remoteSort: {
      lazy: true,
      $value: false
    },
    remoteFilter: {
      lazy: true,
      $value: false
    },
    groupField: undefined,
    groupDir: "ASC",
    grouper: null,
    pageSize: 25
  },
  currentPage: 1,
  loading: false,
  isStore: true,
  updating: 0,
  constructor: function(b) {
    var c = this,
      a;
    c.isInitializing = true;
    c.mixins.observable.constructor.call(c, b);
    c.isInitializing = false;
    a = c.getStoreId();
    if (!a && (b && b.id)) {
      c.setStoreId(a = b.id)
    }
    if (a) {
      Ext.data.StoreManager.register(c)
    }
  },
  getCount: function() {
    return this.getData().getCount()
  },
  rangeCached: function(b, a) {
    return this.getData().getCount() >= Math.max(b, a)
  },
  find: function(f, e, g, h, a, d) {
    var c = !h,
      b = !!(c && d);
    return this.getData().findIndex(f, e, g, c, b, !a)
  },
  findRecord: function() {
    var b = this,
      a = b.find.apply(b, arguments);
    return a !== -1 ? b.getAt(a) : null
  },
  findExact: function(b, a, c) {
    return this.getData().findIndexBy(function(d) {
      return d.isEqual(d.get(b), a)
    }, this, c)
  },
  findBy: function(b, a, c) {
    return this.getData().findIndexBy(b, a, c)
  },
  getAt: function(a) {
    return this.getData().getAt(a) || null
  },
  getRange: function(d, b, c) {
    var a = this.getData().getRange(d, Ext.isNumber(b) ? b + 1 : b);
    if (c && c.callback) {
      c.callback.call(c.scope || this, a, d, b, c)
    }
    return a
  },
  getFilters: function(b) {
    var a = (arguments.callee.$previous || Ext.Base.prototype.getFilters)
      .call(this);
    if (!a && b !== false) {
      this.setFilters([]);
      a = (arguments.callee.$previous || Ext.Base.prototype.getFilters).call(
        this)
    }
    return a
  },
  applyFilters: function(b, a) {
    var c;
    if (!a) {
      a = this.createFiltersCollection();
      c = true
    }
    a.add(b);
    if (c) {
      this.onRemoteFilterSet(a, this.getRemoteFilter())
    }
    return a
  },
  getSorters: function(b) {
    var a = (arguments.callee.$previous || Ext.Base.prototype.getSorters)
      .call(this);
    if (!a && b !== false) {
      this.setSorters([]);
      a = (arguments.callee.$previous || Ext.Base.prototype.getSorters).call(
        this)
    }
    return a
  },
  applySorters: function(b, a) {
    var c;
    if (!a) {
      a = this.createSortersCollection();
      c = true
    }
    a.add(b);
    if (c) {
      this.onRemoteSortSet(a, this.getRemoteSort())
    }
    return a
  },
  filter: function(b, c, a) {
    if (Ext.isString(b)) {
      b = {
        property: b,
        value: c
      }
    }
    this.suppressNextFilter = !!a;
    this.getFilters().add(b);
    this.suppressNextFilter = false
  },
  removeFilter: function(a, d) {
    var c = this,
      b = c.getFilters();
    c.suppressNextFilter = !!d;
    if (a instanceof Ext.util.Filter) {
      b.remove(a)
    } else {
      b.removeByKey(a)
    }
    c.suppressNextFilter = false
  },
  updateRemoteSort: function(a) {
    this.onRemoteSortSet(this.getSorters(false), a)
  },
  updateRemoteFilter: function(a) {
    this.onRemoteFilterSet(this.getFilters(false), a)
  },
  addFilter: function(b, a) {
    this.suppressNextFilter = !!a;
    this.getFilters().add(b);
    this.suppressNextFilter = false
  },
  filterBy: function(b, a) {
    this.getFilters().add({
      filterFn: b,
      scope: a || this
    })
  },
  clearFilter: function(c) {
    var b = this,
      a = b.getFilters(false);
    if (!a || a.getCount() === 0) {
      return
    }
    b.suppressNextFilter = !!c;
    a.removeAll();
    b.suppressNextFilter = false
  },
  isFiltered: function() {
    return this.getFilters().getCount() > 0
  },
  isSorted: function() {
    var a = this.getSorters(false);
    return !!(a && a.length > 0) || this.isGrouped()
  },
  addFieldTransform: function(e) {
    if (e.getTransform()) {
      return
    }
    var d = e.getProperty(),
      c = this.getModel(),
      a, b;
    if (c) {
      a = c.getField(d);
      b = a ? a.getSortType() : null
    }
    if (b && b !== Ext.identityFn) {
      e.setTransform(b)
    }
  },
  beginUpdate: function() {
    if (!this.updating++) {
      this.fireEvent("beginupdate")
    }
  },
  endUpdate: function() {
    if (this.updating && !--this.updating) {
      this.fireEvent("endupdate");
      this.onEndUpdate()
    }
  },
  getState: function() {
    var e = this,
      f = [],
      d = e.getFilters(),
      b = e.getGrouper(),
      g, c, a;
    e.getSorters().each(function(h) {
      f[f.length] = h.getState();
      c = true
    });
    if (e.statefulFilters && e.saveStatefulFilters) {
      c = true;
      g = [];
      d.each(function(h) {
        g[g.length] = h.getState()
      })
    }
    if (b) {
      c = true
    }
    if (c) {
      a = {};
      if (f.length) {
        a.sorters = f
      }
      if (g) {
        a.filters = g
      }
      if (b) {
        a.grouper = b.getState()
      }
    }
    return a
  },
  applyState: function(e) {
    var c = this,
      b = e.sorters,
      a = e.filters,
      d = e.grouper;
    if (b) {
      c.getSorters().replaceAll(b)
    }
    if (a) {
      c.saveStatefulFilters = true;
      c.getFilters().replaceAll(a)
    }
    if (d) {
      c.setGrouper(d)
    }
  },
  hasPendingLoad: Ext.emptyFn,
  isLoaded: Ext.emptyFn,
  isLoading: Ext.emptyFn,
  destroy: function() {
    var a = this;
    if (a.getStoreId()) {
      Ext.data.StoreManager.unregister(a)
    }
    a.callParent();
    a.onDestroy()
  },
  sort: function(c, b, d) {
    var a = this;
    if (arguments.length === 0) {
      if (a.getRemoteSort()) {
        a.attemptLoad()
      } else {
        a.forceLocalSort()
      }
    } else {
      a.getSorters().addSort(c, b, d)
    }
  },
  onBeforeCollectionSort: function(a, b) {
    if (b) {
      this.fireEvent("beforesort", this, b.getRange())
    }
  },
  onSorterEndUpdate: function() {
    var a = this,
      b;
    b = a.getSorters(false);
    if (a.settingGroups || !b) {
      return
    }
    b = b.getRange();
    if (b.length) {
      if (a.getRemoteSort()) {
        a.attemptLoad({
          callback: function() {
            a.fireEvent("sort", a, b)
          }
        })
      } else {
        a.fireEvent("datachanged", a);
        a.fireEvent("refresh", a);
        a.fireEvent("sort", a, b)
      }
    } else {
      a.fireEvent("sort", a, b)
    }
  },
  onFilterEndUpdate: function() {
    var b = this,
      a = b.suppressNextFilter;
    if (b.getRemoteFilter()) {
      b.currentPage = 1;
      if (!a) {
        b.attemptLoad()
      }
    } else {
      if (!a) {
        b.fireEvent("datachanged", b);
        b.fireEvent("refresh", b)
      }
    }
    if (b.trackStateChanges) {
      b.saveStatefulFilters = true
    }
    b.fireEvent("filterchange", b, b.getFilters().getRange())
  },
  updateGroupField: function(a) {
    if (a) {
      this.setGrouper({
        property: a,
        direction: this.getGroupDir()
      })
    } else {
      this.setGrouper(null)
    }
  },
  getGrouper: function() {
    return this.getData().getGrouper()
  },
  group: function(a, d) {
    var b = this,
      c = b.getSorters(false),
      e = a || (c && c.length);
    if (a && typeof a === "string") {
      a = {
        property: a,
        direction: d || b.getGroupDir()
      }
    }
    b.settingGroups = true;
    b.getData().setGrouper(a);
    delete b.settingGroups;
    if (e) {
      if (b.getRemoteSort()) {
        b.attemptLoad({
          scope: b,
          callback: b.fireGroupChange
        })
      } else {
        b.fireEvent("datachanged", b);
        b.fireEvent("refresh", b);
        b.fireGroupChange()
      }
    } else {
      b.fireGroupChange()
    }
  },
  fireGroupChange: function() {
    if (!this.destroyed) {
      this.fireEvent("groupchange", this, this.getGrouper())
    }
  },
  clearGrouping: function() {
    this.group(null)
  },
  getGroupField: function() {
    var a = this.getGrouper(),
      b = "";
    if (a) {
      b = a.getProperty()
    }
    return b
  },
  isGrouped: function() {
    return !!this.getGrouper()
  },
  applyGrouper: function(a) {
    this.group(a);
    return this.getData().getGrouper()
  },
  getGroups: function() {
    return this.getData().getGroups()
  },
  onEndUpdate: Ext.emptyFn,
  privates: {
    loadsSynchronously: Ext.privateFn,
    onRemoteFilterSet: function(a, b) {
      if (a) {
        a[b ? "on" : "un"]("endupdate", this.onFilterEndUpdate, this)
      }
    },
    onRemoteSortSet: function(b, c) {
      var a = this;
      if (b) {
        b[c ? "on" : "un"]("endupdate", a.onSorterEndUpdate, a);
        a.getData()[c ? "un" : "on"]("beforesort", a.onBeforeCollectionSort,
          a)
      }
    }
  },
  deprecated: {
    5: {
      methods: {
        destroyStore: function() {
          this.destroy()
        }
      }
    }
  }
}, 1, 0, 0, 0, 0, [
  [Ext.mixin.Observable.prototype.mixinId || Ext.mixin.Observable.$className,
    Ext.mixin.Observable
  ],
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ]
], [Ext.data, "AbstractStore"], 0));
(Ext.cmd.derive("Ext.data.Error", Ext.Base, {
  isError: true,
  $configPrefixed: false,
  config: {
    field: null,
    message: ""
  },
  constructor: function(a) {
    this.initConfig(a);
    this.msg = this.message
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data, "Error"], 0));
(Ext.cmd.derive("Ext.data.ErrorCollection", Ext.util.MixedCollection, {
  alternateClassName: "Ext.data.Errors",
  init: function(f) {
    var j = this,
      g = f.fields,
      d = f.data,
      l, k, m, e, h, c, b, a;
    for (e = 0, h = g.length; e < h; ++e) {
      k = g[e];
      a = k.name;
      b = d[a];
      if (k.validate && !k.validate.$nullFn) {
        l = j.length;
        c = k.validate(b, null, j);
        if (l === j.length && c !== true) {
          j.add(a, c)
        }
      }
    }
    return j
  },
  add: function(b, d) {
    var c = this,
      a = Ext.data.field.Field.defaultInvalidMessage,
      f = b,
      e;
    if (Ext.isString(b)) {
      f = new Ext.data.Error({
        field: b,
        message: d || a
      })
    } else {
      if (!(f.isError)) {
        f = new Ext.data.Error({
          field: f.field || f.name,
          message: f.error || f.message || f.msg || a
        })
      }
      b = f.field
    }
    e = c.get(b);
    if (e) {
      if (Ext.isArray(e)) {
        e.push(f);
        return e
      }
      c.removeAtKey(b);
      f = [e, f];
      f.field = b;
      f = [f]
    }
    return Ext.util.MixedCollection.prototype.add.call(this, f)
  },
  getKey: function(a) {
    return a.field
  },
  isValid: function() {
    return this.length === 0
  },
  getByField: function(b) {
    var a = this.get(b);
    if (a && !Ext.isArray(a)) {
      a = [a]
    }
    return a || []
  }
}, 0, 0, 0, 0, 0, 0, [Ext.data, "ErrorCollection", Ext.data, "Errors"], 0));
(Ext.cmd.derive("Ext.data.operation.Operation", Ext.Base, {
  alternateClassName: "Ext.data.Operation",
  isOperation: true,
  config: {
    synchronous: false,
    url: "",
    params: undefined,
    callback: undefined,
    scope: undefined,
    resultSet: null,
    response: null,
    request: null,
    records: null,
    id: undefined,
    proxy: null,
    batch: null,
    recordCreator: null,
    internalCallback: null,
    internalScope: null
  },
  order: 0,
  foreignKeyDirection: 1,
  started: false,
  running: false,
  complete: false,
  success: undefined,
  exception: false,
  error: undefined,
  idPrefix: "ext-operation-",
  constructor: function(a) {
    var b = a && a.scope;
    this.initConfig(a);
    if (a) {
      a.scope = b
    }
    if (b) {
      this.setScope(b);
      this.initialConfig.scope = b
    }
    this._internalId = Ext.id(this, this.idPrefix)
  },
  getAction: function() {
    return this.action
  },
  execute: function() {
    var b = this,
      a;
    delete b.error;
    delete b.success;
    b.complete = b.exception = false;
    b.setStarted();
    b.request = a = b.doExecute();
    if (a) {
      a.setOperation(b)
    }
    return a
  },
  doExecute: Ext.emptyFn,
  abort: function() {
    var b = this,
      a = b.request;
    if (b.running && a) {
      b.getProxy().abort(a);
      b.request = null
    }
  },
  process: function(b, d, a, e) {
    var c = this;
    e = e !== false;
    c.setResponse(a);
    c.setResultSet(b);
    if (b.getSuccess()) {
      c.doProcess(b, d, a);
      c.setSuccessful(e)
    } else {
      if (e) {
        c.setException(b.getMessage())
      }
    }
  },
  _commitSetOptions: {
    convert: true,
    commit: true
  },
  doProcess: function(m, f, e) {
    var k = this,
      d = k._commitSetOptions,
      a = k.getRecords(),
      c = a.length,
      n = a[0].clientIdProperty,
      o = m.getRecords(),
      j = o ? o.length : 0,
      l, h, b, g;
    if (j && n) {
      l = Ext.Array.toValueMap(a, "id");
      for (g = 0; g < j; ++g) {
        h = o[g];
        b = l[h[n]];
        if (b) {
          delete l[b.id];
          delete h[n];
          b.set(h, d)
        }
      }
      for (g in l) {
        l[g].commit()
      }
    } else {
      for (g = 0; g < c; ++g) {
        b = a[g];
        if (j === 0 || !(h = o[g])) {
          b.commit()
        } else {
          b.set(h, d)
        }
      }
    }
  },
  setStarted: function() {
    this.started = this.running = true
  },
  setCompleted: function() {
    var b = this,
      a = b.getProxy();
    b.complete = true;
    b.running = false;
    b.triggerCallbacks();
    if (a) {
      a.completeOperation(b)
    }
  },
  setSuccessful: function(a) {
    this.success = true;
    if (a) {
      this.setCompleted()
    }
  },
  setException: function(a) {
    var b = this;
    b.exception = true;
    b.success = b.running = false;
    b.error = a;
    b.setCompleted()
  },
  triggerCallbacks: function() {
    var a = this,
      b = a.getInternalCallback();
    if (b) {
      b.call(a.getInternalScope() || a, a);
      a.setInternalCallback(null);
      a.setInternalScope(null)
    }
    if (b = a.getCallback()) {
      b.call(a.getScope() || a, a.getRecords(), a, a.wasSuccessful());
      a.setCallback(null);
      a.setScope(null)
    }
  },
  hasException: function() {
    return this.exception
  },
  getError: function() {
    return this.error
  },
  getRecords: function() {
    var a;
    return this._records || ((a = this.getResultSet()) ? a.getRecords() :
      null)
  },
  isStarted: function() {
    return this.started
  },
  isRunning: function() {
    return this.running
  },
  isComplete: function() {
    return this.complete
  },
  wasSuccessful: function() {
    return this.isComplete() && this.success === true
  },
  allowWrite: function() {
    return true
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data.operation, "Operation", Ext.data,
  "Operation"
], 0));
(Ext.cmd.derive("Ext.data.operation.Create", Ext.data.operation.Operation, {
    action: "create",
    isCreateOperation: true,
    order: 10,
    config: {
      recordCreator: Ext.identityFn
    },
    doExecute: function() {
      return this.getProxy().create(this)
    }
  }, 0, 0, 0, 0, ["data.operation.create"], 0, [Ext.data.operation, "Create"],
  0));
(Ext.cmd.derive("Ext.data.operation.Destroy", Ext.data.operation.Operation, {
  action: "destroy",
  isDestroyOperation: true,
  order: 30,
  foreignKeyDirection: -1,
  doProcess: function() {
    var c = this.getRecords(),
      a = c.length,
      b;
    for (b = 0; b < a; ++b) {
      c[b].setErased()
    }
  },
  doExecute: function() {
    return this.getProxy().erase(this)
  },
  getRecordData: function(a, c) {
    var e = {},
      d = a.idField,
      b = this.getNameProperty() || "name";
    e[d[b]] = a.id;
    return e
  }
}, 0, 0, 0, 0, ["data.operation.destroy"], 0, [Ext.data.operation,
  "Destroy"
], 0));
(Ext.cmd.derive("Ext.data.operation.Read", Ext.data.operation.Operation, {
  action: "read",
  isReadOperation: true,
  config: {
    filters: undefined,
    sorters: undefined,
    grouper: undefined,
    start: undefined,
    limit: undefined,
    page: undefined,
    addRecords: false
  },
  doExecute: function() {
    return this.getProxy().read(this)
  },
  doProcess: Ext.emptyFn,
  allowWrite: function() {
    return false
  }
}, 0, 0, 0, 0, ["data.operation.read"], 0, [Ext.data.operation, "Read"], 0));
(Ext.cmd.derive("Ext.data.operation.Update", Ext.data.operation.Operation, {
    action: "update",
    isUpdateOperation: true,
    order: 20,
    config: {
      recordCreator: Ext.identityFn
    },
    doExecute: function() {
      return this.getProxy().update(this)
    }
  }, 0, 0, 0, 0, ["data.operation.update"], 0, [Ext.data.operation, "Update"],
  0));
(Ext.cmd.derive("Ext.data.SortTypes", Ext.Base, {
  singleton: true,
  none: Ext.identityFn,
  stripCommasRe: /,/g,
  stripTagsRE: /<\/?[^>]+>/gi,
  asText: function(a) {
    return (a != null) ? String(a).replace(this.stripTagsRe, "") : "\x00"
  },
  asUCText: function(a) {
    return (a != null) ? String(a).toUpperCase().replace(this.stripTagsRe,
      "") : "\x00"
  },
  asUCString: function(a) {
    return (a != null) ? String(a).toUpperCase() : "\x00"
  },
  asDate: function(a) {
    if (!a) {
      return 0
    }
    if (Ext.isDate(a)) {
      return a.getTime()
    }
    return Date.parse(String(a))
  },
  asFloat: function(a) {
    var b = parseFloat(String(a).replace(this.stripCommasRe, ""));
    return isNaN(b) ? 0 : b
  },
  asInt: function(a) {
    var b = parseInt(String(a).replace(this.stripCommasRe, ""), 10);
    return isNaN(b) ? 0 : b
  }
}, 0, 0, 0, 0, 0, 0, [Ext.data, "SortTypes"], 0));
(Ext.cmd.derive("Ext.data.validator.Validator", Ext.Base, {
  isValidator: true,
  type: "base",
  statics: {
    all: {},
    register: function(b, a) {
      var c = this.all;
      c[b.toUpperCase()] = c[b.toLowerCase()] = c[b] = a.prototype
    }
  },
  onClassExtended: function(a, b) {
    if (b.type) {
      Ext.data.validator.Validator.register(b.type, a)
    }
  },
  constructor: function(a) {
    if (typeof a === "function") {
      this.fnOnly = true;
      this.validate = a
    } else {
      this.initConfig(a)
    }
  },
  validate: function() {
    return true
  },
  clone: function() {
    var a = this;
    if (a.fnOnly) {
      return new Ext.data.validator.Validator(a.validate)
    }
    return new a.self(a.getCurrentConfig())
  }
}, 1, 0, 0, 0, ["data.validator.base"], [
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ]
], [Ext.data.validator, "Validator"], function() {
  this.register(this.prototype.type, this)
}));
(Ext.cmd.derive("Ext.data.field.Field", Ext.Base, {
  alternateClassName: "Ext.data.Field",
  aliasPrefix: "data.field.",
  type: "auto",
  factoryConfig: {
    defaultProperty: "name"
  },
  isDataField: true,
  isField: true,
  allowBlank: true,
  allowNull: false,
  critical: false,
  defaultInvalidMessage: "This field is invalid",
  defaultValue: undefined,
  definedBy: null,
  depends: null,
  dependents: null,
  mapping: null,
  name: null,
  ordinal: undefined,
  persist: null,
  reference: null,
  unique: false,
  rank: null,
  stripRe: /[\$,%]/g,
  calculated: false,
  evil: false,
  identifier: false,
  onClassExtended: function(c, e) {
    var f = e.sortType,
      d = c.prototype,
      a = d.validators,
      b = e.validators;
    if (f && Ext.isString(f)) {
      d.sortType = Ext.data.SortTypes[f]
    }
    if (b) {
      if (!Ext.isArray(b)) {
        b = [b]
      }
      delete e.validators;
      if (a) {
        b = a.concat(b)
      }
      d.validators = b
    }
  },
  argumentNamesRe: /^function\s+\(\s*([^,\)\s]+)/,
  calculateRe: /[^\.a-z0-9_]([a-z_][a-z_0-9]*)\.([a-z_][a-z_0-9]*)/gi,
  constructor: function(d) {
    var k = this,
      m = k.calculateRe,
      g, n, l, h, c, a, i, b, j, e, f;
    if (d) {
      if (Ext.isString(d)) {
        k.name = d
      } else {
        f = d.validators;
        if (f) {
          delete d.validators;
          k.instanceValidators = f
        }
        Ext.apply(k, d)
      }
    }
    if (!k.allowNull) {
      k.allowNull = !!k.reference
    }
    g = k.calculate;
    c = k.depends;
    if (g) {
      k.convert = k.doCalculate;
      if (!c) {
        if (!(c = g.$depends)) {
          a = {};
          j = g.toString();
          g.$depends = c = [];
          i = k.argumentNamesRe.exec(j);
          b = i ? i[1] : "data";
          while ((i = m.exec(j))) {
            if (b === i[1] && !a[e = i[2]]) {
              a[e] = 1;
              c.push(e)
            }
          }
        }
        k.depends = c
      }
    }
    l = k.defaultValue;
    if (k.convert) {
      k.calculated = n = k.convert.length > 1;
      k.evil = n && !c
    }
    if (k.persist === null) {
      k.persist = !g
    }
    h = k.sortType;
    if (!k.sortType) {
      k.sortType = Ext.data.SortTypes.none
    } else {
      if (Ext.isString(h)) {
        k.sortType = Ext.data.SortTypes[h]
      }
    }
    if (c && typeof c === "string") {
      k.depends = [c]
    }
    k.cloneDefaultValue = l !== undefined && (Ext.isDate(l) || Ext.isArray(
      l) || Ext.isObject(l))
  },
  setModelValidators: function(a) {
    this._validators = null;
    this.modelValidators = a
  },
  compileValidators: function() {
    var a = this;
    a._validators = [];
    a.constructValidators(a.validators);
    a.constructValidators(a.modelValidators);
    a.constructValidators(a.instanceValidators)
  },
  constructValidators: function(a) {
    if (a) {
      if (!(a instanceof Array)) {
        a = [a]
      }
      var e = a.length,
        c = this._validators,
        b, d;
      for (b = 0; b < e; ++b) {
        d = a[b];
        if (d.fn) {
          d = d.fn
        }
        c.push(Ext.Factory.dataValidator(d))
      }
    }
  },
  collate: function(c, b) {
    var d = this,
      a = c,
      e = b;
    if (d.sortType) {
      a = d.sortType(a);
      e = d.sortType(e)
    }
    return (a === e) ? 0 : ((a < e) ? -1 : 1)
  },
  compare: function(b, a) {
    return (b === a) ? 0 : ((b < a) ? -1 : 1)
  },
  isEqual: function(b, a) {
    return this.compare(b, a) === 0
  },
  convert: null,
  serialize: null,
  validate: function(j, e, h) {
    var g = this,
      f = "",
      k, a, c, b, d;
    if (!g._validators) {
      g.compileValidators()
    }
    c = g._validators;
    for (d = 0, b = c.length; d < b; ++d) {
      a = c[d];
      k = a.validate(j);
      if (k !== true) {
        k = k || g.defaultInvalidMessage;
        if (h) {
          h.add(g.name, k);
          f = f || k
        } else {
          if (e) {
            if (f) {
              f += e
            }
            f += k
          } else {
            f = k;
            break
          }
        }
      }
    }
    return f || true
  },
  doCalculate: function(a, b) {
    return b ? this.calculate(b.data) : a
  },
  getName: function() {
    return this.name
  },
  getAllowBlank: function() {
    return this.allowBlank
  },
  getAllowNull: function() {
    return this.allowNull
  },
  getConvert: function() {
    return this.convert
  },
  getDefaultValue: function() {
    return this.defaultValue
  },
  getDepends: function() {
    return this.depends
  },
  getMapping: function() {
    return this.mapping
  },
  hasMapping: function() {
    var a = this.mapping;
    return !!(a || a === 0)
  },
  getPersist: function() {
    return this.persist
  },
  getSortType: function() {
    return this.sortType
  },
  getType: function() {
    return "auto"
  },
  deprecated: {
    5.1: {
      methods: {
        getSortDir: function() {
          return this.sortDir
        }
      }
    }
  }
}, 1, 0, 0, 0, ["data.field.auto"], [
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ]
], [Ext.data.field, "Field", Ext.data, "Field"], 0));
(Ext.cmd.derive("Ext.data.field.Boolean", Ext.data.field.Field, {
  isBooleanField: true,
  trueRe: /^\s*(?:true|yes|on|1)\s*$/i,
  convert: function(a) {
    if (typeof a === "boolean") {
      return a
    }
    if (this.allowNull && (a === undefined || a === null || a === "")) {
      return null
    }
    return this.trueRe.test(String(a))
  },
  getType: function() {
    return "bool"
  }
}, 0, 0, 0, 0, ["data.field.bool", "data.field.boolean"], 0, [Ext.data.field,
  "Boolean"
], 0));
(Ext.cmd.derive("Ext.data.field.Date", Ext.data.field.Field, {
  sortType: "asDate",
  isDateField: true,
  dateFormat: null,
  dateReadFormat: null,
  dateWriteFormat: null,
  compare: function(b, e) {
    var d = b instanceof Date,
      c = e instanceof Date,
      a;
    if (c && d) {
      a = b.getTime() - e.getTime();
      if (a === 0) {
        a = 0
      } else {
        a = a < 0 ? -1 : 1
      }
    } else {
      if (d === c) {
        a = 0
      } else {
        a = d ? 1 : -1
      }
    }
    return a
  },
  convert: function(c) {
    if (!c) {
      return null
    }
    if (c instanceof Date) {
      return c
    }
    var a = this.dateReadFormat || this.dateFormat,
      b;
    if (a) {
      return Ext.Date.parse(c, a)
    }
    b = Date.parse(c);
    return b ? new Date(b) : null
  },
  serialize: function(b) {
    var a = null,
      c;
    if (Ext.isDate(b)) {
      c = this.getDateWriteFormat();
      a = c ? Ext.Date.format(b, c) : b
    }
    return a
  },
  getDateFormat: function() {
    return this.dateFormat
  },
  getDateReadFormat: function() {
    return this.dateReadFormat
  },
  getDateWriteFormat: function() {
    var a = this;
    if (a.hasOwnProperty("dateWriteFormat")) {
      return a.dateWriteFormat
    }
    if (a.hasOwnProperty("dateFormat")) {
      return a.dateFormat
    }
    return a.dateWriteFormat || a.dateFormat || "timestamp"
  },
  getType: function() {
    return "date"
  }
}, 0, 0, 0, 0, ["data.field.date"], 0, [Ext.data.field, "Date"], 0));
(Ext.cmd.derive("Ext.data.field.Integer", Ext.data.field.Field, {
  isNumeric: true,
  isIntegerField: true,
  numericType: "int",
  convert: function(b) {
    if (typeof b === "number") {
      return this.getNumber(b)
    }
    var d = b === undefined || b === null || b === "",
      a = this.allowNull,
      c;
    if (d) {
      c = a ? null : 0
    } else {
      c = this.parse(b);
      if (a && isNaN(c)) {
        c = null
      }
    }
    return c
  },
  getNumber: function(a) {
    return parseInt(a, 10)
  },
  getType: function() {
    return this.numericType
  },
  parse: function(a) {
    return parseInt(String(a).replace(this.stripRe, ""), 10)
  },
  sortType: function(a) {
    if (a == null) {
      a = Infinity
    }
    return a
  }
}, 0, 0, 0, 0, ["data.field.int", "data.field.integer"], 0, [Ext.data.field,
  "Integer"
], 0));
(Ext.cmd.derive("Ext.data.field.Number", Ext.data.field.Integer, {
  isIntegerField: false,
  isNumberField: true,
  numericType: "float",
  getNumber: Ext.identityFn,
  parse: function(a) {
    return parseFloat(String(a).replace(this.stripRe, ""))
  }
}, 0, 0, 0, 0, ["data.field.float", "data.field.number"], 0, [Ext.data.field,
  "Number"
], 0));
(Ext.cmd.derive("Ext.data.field.String", Ext.data.field.Field, {
  sortType: "asUCString",
  isStringField: true,
  convert: function(b) {
    var a = this.allowNull ? null : "";
    return (b === undefined || b === null) ? a : String(b)
  },
  getType: function() {
    return "string"
  }
}, 0, 0, 0, 0, ["data.field.string"], 0, [Ext.data.field, "String"], 0));
(Ext.cmd.derive("Ext.data.identifier.Generator", Ext.Base, {
  "abstract": true,
  factoryConfig: {
    defaultType: "sequential"
  },
  isGenerator: true,
  config: {
    id: null
  },
  constructor: function(b) {
    var c = this,
      a, d;
    c.initConfig(b);
    d = c.getId();
    if (d) {
      a = (b && b.cache) || Ext.data.identifier.Generator.all;
      a[d] = c
    }
  },
  privates: {
    clone: function(b) {
      var a = this.getInitialConfig();
      a = b ? Ext.apply({}, b, a) : a;
      return new this.self(a)
    },
    statics: {
      all: {}
    }
  }
}, 1, 0, 0, 0, ["data.identifier.default"], [
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ]
], [Ext.data.identifier, "Generator"], function() {
  var c = this,
    a = Ext.Factory,
    b = a.dataIdentifier;
  a.dataIdentifier = function(d) {
    var f = Ext.isString(d) ? d : (d && d.id),
      e = f && ((d && d.cache) || c.all)[f];
    return e || b(d)
  }
}));
(Ext.cmd.derive("Ext.data.identifier.Sequential", Ext.data.identifier.Generator, {
  config: {
    increment: 1,
    prefix: null,
    seed: 1
  },
  generate: function() {
    var b = this,
      a = b._seed,
      c = b._prefix;
    b._seed += b._increment;
    return (c !== null) ? c + a : a
  }
}, 0, 0, 0, 0, ["data.identifier.sequential"], 0, [Ext.data.identifier,
  "Sequential"
], 0));
(Ext.cmd.derive("Ext.data.Model", Ext.Base, {
  alternateClassName: "Ext.data.Record",
  isEntity: true,
  isModel: true,
  validIdRe: null,
  erasing: false,
  observableType: "record",
  constructor: function(e, l) {
    var m = this,
      p = m.self,
      k = p.identifier,
      c = Ext.data.Model,
      n = c.identifier,
      o = m.idField.name,
      j, a, b, h, g, d, f;
    m.data = m.data = e || (e = {});
    m.session = l || null;
    m.internalId = h = n.generate();
    if ((j = e) instanceof Array) {
      m.data = e = {};
      f = m.getFields();
      g = Math.min(f.length, j.length);
      for (d = 0; d < g; ++d) {
        e[f[d].name] = j[d]
      }
    }
    if (!(b = p.initializeFn)) {
      p.initializeFn = b = c.makeInitializeFn(p)
    }
    if (!b.$nullFn) {
      p.initializeFn(m)
    }
    if (!(m.id = a = e[o]) && a !== 0) {
      if (l) {
        k = l.getIdentifier(p);
        a = k.generate()
      } else {
        if (n === k) {
          a = h
        } else {
          a = k.generate()
        }
      }
      e[o] = m.id = a;
      m.phantom = true
    }
    if (l) {
      l.add(m)
    }
    if (m.init && Ext.isFunction(m.init)) {
      m.init()
    }
  },
  editing: false,
  dirty: false,
  session: null,
  dropped: false,
  erased: false,
  clientIdProperty: null,
  evented: false,
  phantom: false,
  idProperty: "id",
  manyToMany: null,
  identifier: null,
  previousValues: undefined,
  proxy: undefined,
  schema: "default",
  versionProperty: null,
  generation: 1,
  validationSeparator: null,
  convertOnSet: true,
  beginEdit: function() {
    var c = this,
      b = c.modified,
      a = c.previousValues;
    if (!c.editing) {
      c.editing = true;
      c.editMemento = {
        dirty: c.dirty,
        data: Ext.apply({}, c.data),
        generation: c.generation,
        modified: b && Ext.apply({}, b),
        previousValues: a && Ext.apply({}, a)
      }
    }
  },
  cancelEdit: function() {
    var b = this,
      a = b.editMemento;
    if (a) {
      b.editing = false;
      Ext.apply(b, a);
      b.editMemento = null
    }
  },
  endEdit: function(b, d) {
    var c = this,
      a = c.editMemento;
    if (a) {
      c.editing = false;
      c.editMemento = null;
      c.previousValues = a.previousValues;
      if (!b) {
        if (!d) {
          d = c.getModifiedFieldNames(a.data)
        }
        if (c.dirty || (d && d.length)) {
          c.callJoined("afterEdit", [d])
        }
      }
    }
  },
  getField: function(a) {
    return this.self.getField(a)
  },
  getFields: function() {
    return this.self.getFields()
  },
  getFieldsMap: function() {
    return this.fieldsMap
  },
  getIdProperty: function() {
    return this.idProperty
  },
  getId: function() {
    return this.id
  },
  getObservableId: function() {
    return this.internalId
  },
  setId: function(a) {
    this.set(this.idProperty, a)
  },
  getPrevious: function(b) {
    var a = this.previousValues;
    return a && a[b]
  },
  isModified: function(b) {
    var a = this.modified;
    return !!(a && a.hasOwnProperty(b))
  },
  getModified: function(b) {
    var a;
    if (this.isModified(b)) {
      a = this.modified[b]
    }
    return a
  },
  get: function(a) {
    return this.data[a]
  },
  _singleProp: {},
  _rejectOptions: {
    convert: false,
    silent: true
  },
  set: function(f, u, g) {
    var G = this,
      d = G.self,
      H = G.data,
      n = G.modified,
      v = G.previousValues,
      a = G.session,
      F = Ext.isString(f),
      b = (F ? g : u),
      q = b ? b.convert !== false : G.convertOnSet,
      j = G.fieldsMap,
      D = b && b.silent,
      r = b && b.commit,
      p = !(b && b.refs === false) && a,
      o = !(b && b.dirty === false && !r),
      A = null,
      s, c, C, J, I, x, h, m, w, B, y = 0,
      E, t, l, k, z, e;
    if (F) {
      e = G._singleProp;
      e[f] = u
    } else {
      e = f
    }
    if (!(l = d.rankedFields)) {
      l = d.rankFields()
    }
    E = l.length;
    do {
      for (I in e) {
        z = e[I];
        s = H[I];
        h = G;
        c = j[I];
        if (c) {
          if (q && c.convert) {
            z = c.convert(z, G)
          }
          h = c;
          k = c.reference
        } else {
          k = null
        }
        if (h.isEqual(s, z)) {
          continue
        }
        H[I] = z;
        (A || (A = [])).push(I);
        (v || (G.previousValues = v = {}))[I] = s;
        if (k && k.cls) {
          if (p) {
            a.updateReference(G, c, z, s)
          }
          k.onValueChange(G, a, z, s)
        }
        B = (w = c && c.dependents) && w.length;
        while (B-- > 0) {
          (m = w[B]).dirty = true;
          y = y ? Math.min(y, m.rank) : m.rank
        }
        if (!c || c.persist) {
          if (n && n.hasOwnProperty(I)) {
            if (!o || h.isEqual(n[I], z)) {
              delete n[I];
              G.dirty = -1
            }
          } else {
            if (o) {
              if (!n) {
                G.modified = n = {}
              }
              G.dirty = true;
              n[I] = s
            }
          }
        }
        if (I === G.idField.name) {
          C = true;
          x = s;
          t = z
        }
      }
      if (!y) {
        break
      }
      c = l[y - 1];
      c.dirty = false;
      if (F) {
        delete e[f]
      } else {
        e = G._singleProp;
        F = true
      }
      f = c.name;
      e[f] = H[f];
      q = true;
      for (; y < E; ++y) {
        if (l[y].dirty) {
          break
        }
      }
      if (y < E) {
        ++y
      } else {
        y = 0
      }
    } while (1);
    if (G.dirty < 0) {
      G.dirty = false;
      for (J in n) {
        if (n.hasOwnProperty(J)) {
          G.dirty = true;
          break
        }
      }
    }
    if (F) {
      delete e[f]
    }++G.generation;
    if (C) {
      G.id = t;
      G.callJoined("onIdChanged", [x, t])
    }
    if (r) {
      G.commit(D, A)
    } else {
      if (!D && !G.editing && A) {
        G.callJoined("afterEdit", [A])
      }
    }
    return A
  },
  reject: function(a) {
    var c = this,
      b = c.modified;
    if (b) {
      c.set(b, c._rejectOptions)
    }
    c.dropped = false;
    c.clearState();
    if (!a) {
      c.callJoined("afterReject")
    }
  },
  commit: function(b, d) {
    var c = this,
      f = c.versionProperty,
      e = c.data,
      a;
    c.clearState();
    if (f && !c.phantom && !isNaN(e[f])) {
      ++e[f]
    }
    c.phantom = false;
    if (c.dropped) {
      c.erased = a = true
    }
    if (!b) {
      if (a) {
        c.callJoined("afterErase")
      } else {
        c.callJoined("afterCommit", [d])
      }
    }
  },
  clearState: function() {
    var a = this;
    a.dirty = a.editing = false;
    a.editMemento = a.modified = null
  },
  drop: function(b) {
    var d = this,
      c = d.associations,
      e = d.session,
      a;
    if (d.erased || d.dropped) {
      return
    }
    d.dropped = true;
    if (c && b !== false) {
      for (a in c) {
        c[a].onDrop(d, e)
      }
    }
    d.callJoined("afterDrop");
    if (d.phantom) {
      d.setErased()
    }
  },
  join: function(b) {
    var a = this,
      c = a.joined;
    if (!c) {
      c = a.joined = [b]
    } else {
      if (!c.length) {
        c[0] = b
      } else {
        Ext.Array.include(c, b)
      }
    }
    if (b.isStore && !a.store) {
      a.store = b
    }
  },
  unjoin: function(e) {
    var d = this,
      f = d.joined,
      a = f && f.length,
      b = d.store,
      c;
    if (a === 1 && f[0] === e) {
      f.length = 0
    } else {
      if (a) {
        Ext.Array.remove(f, e)
      }
    }
    if (b === e) {
      b = null;
      if (f) {
        for (c = 0, a = f.length; c < a; ++c) {
          e = f[c];
          if (e.isStore) {
            b = e;
            break
          }
        }
      }
      d.store = b
    }
  },
  clone: function(d) {
    var c = this,
      b = c.modified,
      a = c.copy(c.id, d);
    if (b) {
      a.modified = Ext.apply({}, b)
    }
    a.dirty = c.dirty;
    a.dropped = c.dropped;
    a.phantom = c.phantom;
    return a
  },
  copy: function(c, f) {
    var d = this,
      e = Ext.apply({}, d.data),
      b = d.idProperty,
      a = d.self;
    if (c || c === 0) {
      e[b] = c
    } else {
      if (c === null) {
        delete e[b]
      }
    }
    return new a(e, f)
  },
  getProxy: function() {
    return this.self.getProxy()
  },
  getValidation: function(b) {
    var c = this,
      a = c.validation;
    if (!a) {
      c.validation = a = new Ext.data.Validation();
      a.attach(c)
    }
    if (b === true || (b !== false && a.syncGeneration !== c.generation)) {
      a.refresh(b)
    }
    return a
  },
  validate: function() {
    return new Ext.data.ErrorCollection().init(this)
  },
  isValid: function() {
    return this.getValidation().isValid()
  },
  toUrl: function() {
    var b = this.$className.split("."),
      a = b[b.length - 1].toLowerCase();
    return a + "/" + this.getId()
  },
  erase: function(a) {
    var b = this;
    b.erasing = true;
    b.drop();
    b.erasing = false;
    return b.save(a)
  },
  setErased: function() {
    this.erased = true;
    this.callJoined("afterErase")
  },
  getChanges: function() {
    return this.getData(this._getChangesOptions)
  },
  getCriticalFields: function() {
    var a = this.self,
      b = a.criticalFields;
    if (!b) {
      a.rankFields();
      b = a.criticalFields
    }
    return b
  },
  getAssociatedData: function(q, p) {
    var l = this,
      c = l.associations,
      n, g, o, k, d, b, j, f, e, a, h, m;
    q = q || {};
    l.$gathering = 1;
    if (p) {
      p = Ext.Object.chain(p)
    }
    for (e in c) {
      f = c[e];
      o = f.getAssociatedItem(l);
      if (!o || o.$gathering) {
        continue
      }
      if (o.isStore) {
        o.$gathering = 1;
        k = o.getData().items;
        b = k.length;
        d = [];
        for (g = 0; g < b; ++g) {
          j = k[g];
          n = !j.$gathering;
          j.$gathering = 1;
          if (p) {
            m = p.associated;
            if (m === undefined) {
              p.associated = n;
              h = true
            } else {
              if (!n) {
                p.associated = false;
                h = true
              }
            }
            a = p
          } else {
            a = n ? l._getAssociatedOptions : l._getNotAssociatedOptions
          }
          d.push(j.getData(a));
          if (h) {
            p.associated = m;
            h = false
          }
          delete j.$gathering
        }
        delete o.$gathering
      } else {
        a = p || l._getAssociatedOptions;
        if (p && p.associated === undefined) {
          a.associated = true
        }
        d = o.getData(a)
      }
      q[e] = d
    }
    delete l.$gathering;
    return q
  },
  getData: function(r) {
    var j = this,
      i = {},
      a = (r === true) ? j._getAssociatedOptions : (r || i),
      e = j.data,
      k = a.associated,
      o = a.changes,
      m = o && a.critical,
      h = o ? j.modified : e,
      g = j.fieldsMap,
      f = a.persist,
      q = a.serialize,
      c, l, d, b, p;
    if (h) {
      for (b in h) {
        p = e[b];
        l = g[b];
        if (l) {
          if (f && !l.persist) {
            continue
          }
          if (q && l.serialize) {
            p = l.serialize(p, j)
          }
        }
        i[b] = p
      }
    }
    if (m) {
      c = j.self.criticalFields || j.getCriticalFields();
      for (d = c.length; d-- > 0;) {
        b = (l = c[d]).name;
        if (!(b in i)) {
          p = e[b];
          if (q && l.serialize) {
            p = l.serialize(p, j)
          }
          i[b] = p
        }
      }
    }
    if (k) {
      j.getAssociatedData(i, a)
    }
    return i
  },
  getTransientFields: function() {
    var a = this.self,
      b = a.transientFields;
    if (!b) {
      a.rankFields();
      b = a.transientFields
    }
    return b
  },
  isLoading: function() {
    return !!this.loadOperation
  },
  abort: function() {
    var a = this.loadOperation;
    if (a) {
      a.abort()
    }
  },
  load: function(b) {
    b = Ext.apply({}, b);
    var f = this,
      e = b.scope || f,
      c = f.getProxy(),
      h = b.callback,
      a = f.loadOperation,
      g = f.getId(),
      d;
    if (a) {
      d = a.extraCalls;
      if (!d) {
        d = a.extraCalls = []
      }
      d.push(b);
      return a
    }
    b.id = g;
    b.recordCreator = function(k, i, j) {
      var l = f.session;
      if (j) {
        j.recordCreator = l ? l.recordCreator : null
      }
      f.set(k, f._commitOptions);
      return f
    };
    b.internalCallback = function(l) {
      var p = l.wasSuccessful() && l.getRecords().length > 0,
        q = f.loadOperation,
        n = q.extraCalls,
        k = [f, l],
        o = [f, l, p],
        m, j;
      f.loadOperation = null;
      if (p) {
        Ext.callback(b.success, e, k)
      } else {
        Ext.callback(b.failure, e, k)
      }
      Ext.callback(h, e, o);
      if (n) {
        for (m = 0, j = n.length; m < j; ++m) {
          b = n[m];
          if (p) {
            Ext.callback(b.success, e, k)
          } else {
            Ext.callback(b.failure, e, k)
          }
          Ext.callback(b.callback, e, o)
        }
      }
      f.callJoined("afterLoad")
    };
    delete b.callback;
    f.loadOperation = a = c.createOperation("read", b);
    a.execute();
    return a
  },
  save: function(i) {
    i = Ext.apply({}, i);
    var f = this,
      d = f.phantom,
      a = f.dropped,
      c = a ? "destroy" : (d ? "create" : "update"),
      h = i.scope || f,
      g = i.callback,
      e = f.getProxy(),
      b;
    i.records = [f];
    i.internalCallback = function(j) {
      var k = [f, j],
        l = j.wasSuccessful();
      if (l) {
        Ext.callback(i.success, h, k)
      } else {
        Ext.callback(i.failure, h, k)
      }
      k.push(l);
      Ext.callback(g, h, k)
    };
    delete i.callback;
    b = e.createOperation(c, i);
    if (a && d) {
      b.setResultSet(Ext.data.reader.Reader.prototype.nullResultSet);
      f.setErased();
      b.setSuccessful(true)
    } else {
      b.execute()
    }
    return b
  },
  inheritableStatics: {
    addFields: function(a) {
      this.replaceFields(a)
    },
    replaceFields: function(m, j) {
      var n = this,
        e = n.prototype,
        h = Ext.data.field.Field,
        f = n.fields,
        l = n.fieldsMap,
        c = n.fieldOrdinals,
        o, d, b, g, a, k;
      if (j === true) {
        f.length = 0;
        n.fieldsMap = l = {};
        n.fieldOrdinals = c = {}
      } else {
        if (j) {
          for (d = j.length; d-- > 0;) {
            a = j[d];
            if (a in c) {
              delete c[a];
              delete l[a]
            }
          }
          for (d = 0, g = f.length; d < g; ++d) {
            a = (o = f[d]).name;
            if (a in c) {
              c[a] = d
            } else {
              f.splice(d, 1);
              --d;
              --g
            }
          }
        }
      }
      for (d = 0, g = m ? m.length : 0; d < g; d++) {
        a = (o = m[d]).name;
        if (!(a in c)) {
          c[a] = k = f.length;
          f.push(o = h.create(o));
          l[a] = o;
          o.ordinal = k;
          o.definedBy = o.owner = this
        }
      }
      n.idField = e.idField = b = l[e.idProperty];
      b.allowNull = b.critical = b.identifier = true;
      b.defaultValue = null;
      n.initializeFn = n.rankedFields = n.transientFields = n.criticalFields =
        null
    },
    removeFields: function(a) {
      this.replaceFields(null, a)
    },
    getIdFromData: function(c) {
      var b = this,
        a = b.idField,
        d = a.calculated ? (new b(c)).id : c[a.name];
      return d
    },
    createWithId: function(f, b, c) {
      var e = b,
        a = this;
      if (f || f === 0) {
        e = {};
        if (b) {
          Ext.apply(e, b)
        }
        e[a.idField.name] = f
      }
      return new a(e, c)
    },
    getFields: function() {
      return this.fields
    },
    getFieldsMap: function() {
      return this.fieldsMap
    },
    getField: function(a) {
      return this.fieldsMap[a] || null
    },
    getProxy: function() {
      var b = this,
        a = b.proxy,
        d = b.defaultProxy,
        c;
      if (!a) {
        a = b.proxyConfig;
        if (!a && d) {
          a = d
        }
        if (!a || !a.isProxy) {
          if (typeof a === "string") {
            a = {
              type: a
            }
          }
          c = b.schema.constructProxy(b);
          a = a ? Ext.merge(c, a) : c
        }
        a = b.setProxy(a)
      }
      return a
    },
    setProxy: function(b) {
      var c = this,
        a;
      if (b) {
        if (!b.isProxy) {
          b = Ext.Factory.proxy(b)
        } else {
          a = b.getModel();
          if (a && a !== c) {
            b = b.clone()
          }
        }
        b.setModel(c)
      }
      return (c.prototype.proxy = c.proxy = b)
    },
    load: function(e, a, c) {
      var b = {},
        d;
      b[this.prototype.idProperty] = e;
      d = new this(b, c);
      d.load(a);
      return d
    }
  },
  deprecated: {
    5: {
      methods: {
        hasId: null,
        markDirty: null,
        setDirty: null,
        eachStore: function(f, d) {
          var e = this,
            b = e.stores,
            a = b.length,
            c;
          for (c = 0; c < a; ++c) {
            f.call(d, b[c])
          }
        },
        join: function(c) {
          var b = this,
            a = b.stores,
            d = b.joined;
          if (!d) {
            d = b.joined = [c]
          } else {
            d.push(c)
          }
          if (c.isStore) {
            b.store = b.store || c;
            if (!a) {
              a = b.stores = []
            }
            a.push(c)
          }
        },
        unjoin: function(c) {
          var b = this,
            a = b.stores,
            d = b.joined;
          if (d.length === 1) {
            d.length = 0
          } else {
            Ext.Array.remove(d, c)
          }
          if (c.isStore) {
            Ext.Array.remove(a, c);
            b.store = a[0] || null
          }
        }
      },
      properties: {
        persistenceProperty: null
      },
      inheritableStatics: {
        methods: {
          setFields: null
        }
      }
    }
  },
  privates: {
    _commitOptions: {
      commit: true
    },
    _getChangesOptions: {
      changes: true
    },
    _getAssociatedOptions: {
      associated: true
    },
    _getNotAssociatedOptions: {
      associated: false
    },
    copyFrom: function(h) {
      var g = this,
        e = g.fields,
        l = e.length,
        b = [],
        j, c = 0,
        f, d, m = g.idProperty,
        a, k;
      if (h) {
        f = g.data;
        d = h.data;
        for (; c < l; c++) {
          j = e[c];
          a = j.name;
          if (a !== m) {
            k = d[a];
            if (k !== undefined && !g.isEqual(f[a], k)) {
              f[a] = k;
              b.push(a)
            }
          }
        }
        if (g.phantom && !h.phantom) {
          g.beginEdit();
          g.setId(h.getId());
          g.endEdit(true);
          g.commit(true)
        }
      }
      return b
    },
    callJoined: function(d, c) {
      var f = this,
        h = f.joined,
        e = f.session,
        a, b, g, j;
      if (!h && !e) {
        return
      }
      if (c) {
        c.unshift(f)
      } else {
        c = [f]
      }
      if (h) {
        for (a = 0, b = h.length; a < b; ++a) {
          j = h[a];
          if (j && (g = j[d])) {
            g.apply(j, c)
          }
        }
      }
      g = e && e[d];
      if (g) {
        g.apply(e, c)
      }
    },
    setSession: function(a) {
      this.session = a;
      if (a) {
        a.add(this)
      }
    },
    getModifiedFieldNames: function(a) {
      var d = this,
        e = d.data,
        b = [],
        f = a || d.editMemento.data,
        c;
      for (c in e) {
        if (e.hasOwnProperty(c)) {
          if (!d.isEqual(e[c], f[c], c)) {
            b.push(c)
          }
        }
      }
      return b
    },
    isEqual: function(a, d, c) {
      var b;
      if (c) {
        b = c.isField ? c : this.fieldsMap[c];
        if (b) {
          return b.compare(a, d) === 0
        }
      }
      if (a instanceof Date && d instanceof Date) {
        return a.getTime() === d.getTime()
      }
      return a === d
    },
    statics: {
      EDIT: "edit",
      REJECT: "reject",
      COMMIT: "commit",
      defaultProxy: "memory",
      rankFields: function() {
        var j = this,
          h = j.prototype,
          d = j.fields,
          b = d.length,
          f = [],
          a = [],
          e = [],
          k, g, c;
        j.rankedFields = h.rankedFields = f;
        j.criticalFields = h.criticalFields = a;
        j.transientFields = h.transientFields = e;
        for (c = 0; c < b; ++c) {
          g = d[c];
          if (g.critical) {
            a.push(g)
          }
          if (!g.persist) {
            e.push(g)
          }
          if (g.evil) {
            (k || (k = [])).push(g)
          } else {
            if (!g.depends) {
              f.push(g);
              g.rank = f.length
            }
          }
        }
        for (c = 0; c < b; ++c) {
          if (!(g = d[c]).rank && !g.evil) {
            j.topoAdd(g)
          }
        }
        if (k) {
          for (c = 0, b = k.length; c < b; ++c) {
            f.push(g = k[c]);
            g.rank = f.length
          }
        }
        return f
      },
      topoAdd: function(g) {
        var b = this,
          f = g.depends,
          a = f ? f.length : 0,
          d = b.rankedFields,
          c, e;
        for (c = 0; c < a; ++c) {
          e = b.fieldsMap[f[c]];
          (e.dependents || (e.dependents = [])).push(g);
          if (!e.rank) {
            b.topoAdd(e)
          }
        }
        d.push(g);
        g.rank = d.length
      },
      initFields: function(v, b, o) {
        var j = Ext.data.field.Field,
          d = v.fields,
          p = [],
          k = {},
          f = {},
          a = [],
          u = o.fields,
          l = v.versionProperty || o.versionProperty,
          m = b.idProperty,
          g, c, s, e, w, r, h, t, q, n;
        b.fields = o.fields = p;
        b.fieldOrdinals = o.fieldOrdinals = k;
        b.fieldsMap = o.fieldsMap = f;
        b.references = o.references = a;
        if (u) {
          for (s = 0, e = u.length; s < e; ++s) {
            p[s] = c = Ext.Object.chain(u[s]);
            c.dependents = null;
            c.owner = b;
            k[w = c.name] = s;
            f[w] = c;
            c.rank = null;
            if (c.generated) {
              t = c;
              q = c.name
            }
          }
        }
        if (d) {
          delete v.fields;
          for (s = 0, e = d.length; s < e; ++s) {
            c = d[s];
            h = c.reference;
            if (h && typeof h !== "string") {
              h = Ext.merge({}, h)
            }
            c.$reference = h;
            c = j.create(d[s]);
            w = c.name;
            r = k[w];
            if (r === undefined) {
              k[w] = r = p.length
            }
            f[w] = c;
            p[r] = c;
            c.definedBy = c.owner = b;
            c.ordinal = r;
            if (w === m) {
              n = c
            }
          }
        }
        g = f[m];
        if (!g) {
          if (t && t.generated) {
            r = t.ordinal
          } else {
            r = p.length
          }
          delete f[q];
          delete k[q];
          g = new j(m);
          p[r] = g;
          k[m] = r;
          f[m] = g;
          g.definedBy = b;
          g.ordinal = r;
          g.generated = true
        } else {
          if (n && t && t.generated) {
            Ext.Array.remove(p, t);
            delete f[q];
            delete k[q];
            f[m] = n;
            for (s = 0, e = p.length; s < e; ++s) {
              c = p[s];
              p.ordinal = s;
              k[c.name] = s
            }
          }
        }
        g.allowNull = g.critical = g.identifier = true;
        g.defaultValue = null;
        b.idField = o.idField = g;
        if (l) {
          c = f[l];
          if (!c) {
            r = p.length;
            c = new j({
              name: l,
              type: "int"
            });
            p[r] = c;
            k[l] = r;
            f[l] = c;
            c.definedBy = b;
            c.ordinal = r;
            c.generated = true
          }
          c.defaultValue = 1;
          c.critical = true
        }
      },
      initValidators: function(g, o, j) {
        var m = j.validators,
          e, l, c, k, f, d, h, b, a, n;
        if (m) {
          e = {};
          for (l in m) {
            e[l] = Ext.Array.clone(m[l])
          }
        }
        k = g.validators || g.validations;
        if (k) {
          delete g.validators;
          e = e || {};
          if (Ext.isArray(k)) {
            c = {};
            for (f = 0, d = k.length; f < d; ++f) {
              n = k[f];
              b = n.field;
              if (!c[b]) {
                c[b] = []
              }
              n = n.fn || n;
              c[b].push(n)
            }
            k = c
          }
          for (b in k) {
            h = k[b];
            if (!Ext.isArray(h)) {
              h = [h]
            }
            a = e[b];
            if (e[b]) {
              Ext.Array.push(a, h)
            } else {
              e[b] = h
            }
          }
        }
        if (e) {
          for (b in e) {
            l = o.getField(b);
            if (l) {
              l.setModelValidators(e[b])
            }
          }
        }
        o.validators = j.validators = e
      },
      initAssociations: function(c, f, k) {
        var b = f.associations,
          d = f.belongsTo,
          h = f.hasMany,
          l = f.hasOne,
          j = f.manyToMany,
          e, a, g;
        delete f.manyToMany;
        if (j) {
          c.addMatrices(k, j)
        }
        delete f.associations;
        delete f.belongsTo;
        delete f.hasMany;
        delete f.hasOne;
        if (b) {
          b = Ext.isArray(b) ? b : [b];
          for (e = 0, a = b.length; e < a; ++e) {
            g = b[e];
            switch (g.type) {
              case "belongsTo":
                c.addLegacyBelongsTo(k, g);
                break;
              case "hasMany":
                c.addLegacyHasMany(k, g);
                break;
              case "hasOne":
                c.addLegacyHasOne(k, g);
                break
            }
          }
        }
        if (d) {
          d = Ext.isArray(d) ? d : [d];
          for (e = 0, a = d.length; e < a; ++e) {
            c.addLegacyBelongsTo(k, d[e])
          }
        }
        if (h) {
          h = Ext.isArray(h) ? h : [h];
          for (e = 0, a = h.length; e < a; ++e) {
            c.addLegacyHasMany(k, h[e])
          }
        }
        if (l) {
          l = Ext.isArray(l) ? l : [l];
          for (e = 0, a = l.length; e < a; ++e) {
            c.addLegacyHasOne(k, l[e])
          }
        }
        c.afterLegacyAssociations(k)
      },
      initIdentifier: function(f, a, e) {
        var b = f.identifier || f.idgen,
          d = e.identifier || a.schema._defaultIdentifier,
          c;
        if (b) {
          delete f.identifier;
          delete f.idgen;
          b = Ext.Factory.dataIdentifier(b)
        } else {
          if (d) {
            if (d.clone && !d.getId()) {
              b = d.clone()
            } else {
              if (d.isGenerator) {
                b = d
              } else {
                b = Ext.Factory.dataIdentifier(d)
              }
            }
          }
        }
        a.identifier = e.identifier = b;
        if (!b) {
          c = a.entityName;
          if (!c) {
            c = Ext.id(null, "extModel")
          }
          a.identifier = Ext.Factory.dataIdentifier({
            type: "sequential",
            prefix: c + "-"
          })
        }
      },
      findValidator: function(c, d, b) {
        var f = b.type || b,
          h = c[d],
          a, e, g;
        if (h) {
          for (e = 0, a = h.length; e < a; ++e) {
            g = h[e];
            if (g.type === f) {
              return g
            }
          }
        }
        return null
      },
      makeInitializeFn: function(q) {
        var a = ["var "],
          h = ["\nreturn function (e) {\n    var data = e.data, v;\n"],
          e = [],
          n = 0,
          k, j, l, p, d, m, g, f, o, c, b;
        if (!(g = q.rankedFields)) {
          g = q.rankFields()
        }
        for (c = 0, b = g.length; c < b; ++c) {
          m = g[c];
          e[c] = f = "f" + c;
          l = m.convert;
          if (c) {
            a.push(",  \n    ")
          }
          a.push(f, " = $fields[" + c + "]");
          if ((o = (m.defaultValue !== undefined)) || l) {
            p = 'data["' + m.name + '"]';
            ++n;
            k = j = "";
            if (m.cloneDefaultValue) {
              k = "Ext.clone(";
              j = ")"
            }
            h.push("\n");
            if (l && o) {
              h.push("    v = ", p,
                ";\n    if (v !== undefined) {\n        v = ", f,
                ".convert(v, e);\n    }\n    if (v === undefined) {\n        v = ",
                k, f, ".defaultValue", j, ";\n    }\n    ", p, " = v;")
            } else {
              if (l) {
                h.push("    v = ", f, ".convert(", p,
                  ",e);\n    if (v !== undefined) {\n        ", p,
                  " = v;\n    }\n")
              } else {
                if (o) {
                  h.push("    if (", p, " === undefined) {\n        ", p,
                    " = ", k, f, ".defaultValue", j, ";\n    }\n")
                }
              }
            }
          }
        }
        if (!n) {
          return Ext.emptyFn
        }
        a.push(";\n");
        a.push.apply(a, h);
        a.push("}");
        a = a.join("");
        d = new Function("$fields", "Ext", a);
        return d(g, Ext)
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data, "Model", Ext.data, "Record"], function() {
  var d = this,
    c = d.prototype,
    b = Ext.data.schema.Schema,
    a;
  d.proxyConfig = c.proxy;
  delete c.proxy;
  d.fields = [];
  d.fieldsMap = c.fieldsMap = {};
  d.schema = c.schema = b.get(c.schema);
  c.idField = new Ext.data.field.Field(c.idProperty);
  d.identifier = new Ext.data.identifier.Sequential();
  d.onExtended(function(e, j) {
    var i = e.prototype,
      l = j.schema,
      k = i.superclass.self,
      h, g, f;
    e.idProperty = j.idProperty || i.idProperty;
    if (l) {
      delete j.schema;
      h = b.get(l)
    } else {
      if (!(h = i.schema)) {
        h = a || (a = b.get("default"))
      }
    }
    e.rankFields = d.rankFields;
    e.topoAdd = d.topoAdd;
    i.schema = e.schema = h;
    if (!(g = j.entityName)) {
      i.entityName = g = h.getEntityName(e)
    }
    e.entityName = g;
    e.fieldExtractors = {};
    d.initIdentifier(j, e, i);
    d.initFields(j, e, i);
    d.initValidators(j, e, i);
    e.fields.items = e.fields;
    if (g) {
      h.addEntity(e);
      d.initAssociations(h, j, e)
    }
    f = j.proxy;
    if (f) {
      delete j.proxy
    } else {
      if (k !== d) {
        f = k.proxyConfig || k.proxy
      }
    }
    e.proxyConfig = f
  })
}));
(Ext.cmd.derive("Ext.data.ResultSet", Ext.Base, {
  isResultSet: true,
  $configPrefixed: false,
  config: {
    loaded: true,
    count: null,
    total: null,
    success: false,
    records: null,
    message: null
  },
  constructor: function(a) {
    this.initConfig(a)
  },
  getCount: function() {
    var b = (arguments.callee.$previous || Ext.Base.prototype.getCount).call(
        this),
      a;
    if (!b) {
      a = this.getRecords();
      if (a) {
        b = a.length
      }
    }
    return b
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data, "ResultSet"], 0));
(Ext.cmd.derive("Ext.data.reader.Reader", Ext.Base, {
    alternateClassName: ["Ext.data.Reader", "Ext.data.DataReader"],
    factoryConfig: {
      defaultType: null
    },
    config: {
      totalProperty: "total",
      successProperty: "success",
      rootProperty: "",
      messageProperty: "",
      typeProperty: "",
      implicitIncludes: true,
      readRecordsOnFailure: true,
      model: null,
      proxy: null,
      transform: null,
      keepRawData: null
    },
    isReader: true,
    constructor: function(a) {
      if (a && a.hasOwnProperty("root")) {
        a = Ext.apply({}, a);
        a.rootProperty = a.root;
        delete a.root
      }
      var b = this;
      b.duringInit = 1;
      b.mixins.observable.constructor.call(b, a);
      --b.duringInit;
      b.buildExtractors()
    },
    applyModel: function(a) {
      return Ext.data.schema.Schema.lookupEntity(a)
    },
    applyTransform: function(a) {
      if (a) {
        if (Ext.isFunction(a)) {
          a = {
            fn: a
          }
        }
        return a.fn.bind(a.scope || this)
      }
      return a
    },
    forceBuildExtractors: function() {
      if (!this.duringInit) {
        this.buildExtractors(true)
      }
    },
    updateTotalProperty: function() {
      this.forceBuildExtractors()
    },
    updateMessageProperty: function() {
      this.forceBuildExtractors()
    },
    updateSuccessProperty: function() {
      this.forceBuildExtractors()
    },
    read: function(b, d) {
      var c, a;
      if (b) {
        if (b.responseText) {
          a = this.getResponseData(b);
          if (a && a.__$isError) {
            return new Ext.data.ResultSet({
              total: 0,
              count: 0,
              records: [],
              success: false,
              message: a.msg
            })
          } else {
            c = this.readRecords(a, d)
          }
        } else {
          c = this.readRecords(b, d)
        }
      }
      return c || this.nullResultSet
    },
    getNullResultSet: function() {
      return this.nullResultSet
    },
    createReadError: function(a) {
      return {
        __$isError: true,
        msg: a
      }
    },
    readRecords: function(e, c, g) {
      var h = this,
        f = g && g.recordsOnly,
        l = g && g.asRoot,
        m, d, b, j, i, k, n, a;
      a = this.getTransform();
      if (a) {
        e = a(e)
      }
      h.buildExtractors();
      if (h.getKeepRawData()) {
        h.rawData = e
      }
      if (h.hasListeners.rawdata) {
        h.fireEventArgs("rawdata", [e])
      }
      e = h.getData(e);
      m = true;
      d = 0;
      b = [];
      if (h.getSuccessProperty()) {
        k = h.getSuccess(e);
        if (k === false || k === "false") {
          m = false
        }
      }
      if (h.getMessageProperty()) {
        n = h.getMessage(e)
      }
      if (m || h.getReadRecordsOnFailure()) {
        j = (l || Ext.isArray(e)) ? e : h.getRoot(e);
        if (j) {
          i = j.length
        }
        if (h.getTotalProperty()) {
          k = parseInt(h.getTotal(e), 10);
          if (!isNaN(k)) {
            i = k
          }
        }
        if (j) {
          b = h.extractData(j, c);
          d = b.length
        }
      }
      return f ? b : new Ext.data.ResultSet({
        total: i || d,
        count: d,
        records: b,
        success: m,
        message: n
      })
    },
    extractData: function(o, f) {
      var m = this,
        g = f && f.model ? Ext.data.schema.Schema.lookupEntity(f.model) : m
        .getModel(),
        d = g.schema,
        p = d.hasAssociations(g) && m.getImplicitIncludes(),
        n = m.getFieldExtractorInfo(g.fieldExtractors),
        a = o.length,
        c = new Array(a),
        k = m.getTypeProperty(),
        l, b, e, j, h;
      if (!a && Ext.isObject(o)) {
        o = [o];
        a = 1
      }
      for (h = 0; h < a; h++) {
        j = o[h];
        if (!j.isModel) {
          b = j;
          if (k && (e = m.getChildType(d, b, k))) {
            l = e.getProxy().getReader();
            j = l.extractRecord(b, f, e, d.hasAssociations(e) && l.getImplicitIncludes(),
              l.getFieldExtractorInfo(e.fieldExtractors))
          } else {
            j = m.extractRecord(b, f, g, p, n)
          }
          if (j.isModel && j.isNode) {
            j.raw = b
          }
        }
        if (j.onLoad) {
          j.onLoad()
        }
        c[h] = j
      }
      return c
    },
    getChildType: function(b, c, d) {
      var a;
      switch (typeof d) {
        case "string":
          return b.getEntity(c[d]);
        case "object":
          a = d.namespace;
          return b.getEntity((a ? a + "." : "") + c[d.name]);
        case "function":
          return b.getEntity(d(c))
      }
    },
    extractRecordData: function(c, d) {
      var b = d && d.model ? Ext.data.schema.Schema.lookupEntity(d.model) :
        this.getModel(),
        a = this.getFieldExtractorInfo(b.fieldExtractors);
      return this.extractRecord(c, d, b, false, a)
    },
    extractRecord: function(a, b, c, i, g) {
      var f = this,
        e = (b && b.recordCreator) || f.defaultRecordCreator,
        h, d;
      h = f.extractModelData(a, g);
      d = e.call(f, h, c || f.getModel(), b);
      if (i && d.isModel) {
        f.readAssociated(d, a, b)
      }
      return d
    },
    getFieldExtractorInfo: function(c) {
      if (!c) {
        return
      }
      var a = this.$className,
        b = c[a];
      if (b === undefined) {
        c[a] = b = this.buildFieldExtractors()
      }
      return b
    },
    buildFieldExtractors: function() {
      var g = this.getFields(),
        h = g.length,
        e = [],
        k = [],
        d = null,
        b = 0,
        j, a, f, c;
      for (f = 0; f < h; ++f) {
        j = g[f];
        c = this.createFieldAccessor(j);
        if (c) {
          a = j.name;
          e.push("val = extractors[" + b +
            "](raw); if (val !== undefined) { data['" + a + "'] = val; }"
          );
          k.push(c);
          ++b
        }
      }
      if (e.length) {
        d = {
          extractors: k,
          fn: new Function("raw", "data", "extractors", "var val;" + e.join(
            ""))
        }
      }
      return d
    },
    defaultRecordCreator: function(b, c) {
      var a = new c(b);
      a.phantom = false;
      return a
    },
    getModelData: function(a) {
      return {}
    },
    extractModelData: function(b, a) {
      var d = this.getModelData(b),
        c;
      if (a) {
        c = a.fn;
        c(b, d, a.extractors)
      }
      return d
    },
    readAssociated: function(a, e, d) {
      var c = a.associations,
        b, f;
      for (b in c) {
        if (c.hasOwnProperty(b)) {
          f = c[b];
          if (f.cls) {
            f.read(a, e, this, d)
          }
        }
      }
    },
    getFields: function() {
      return this.getModel().fields
    },
    getData: Ext.identityFn,
    getRoot: Ext.identityFn,
    getResponseData: function(a) {},
    onMetaChange: function(g) {
      var f = this,
        b = g.fields,
        c, e, a, d;
      f.metaData = g;
      if (g.root) {
        f.setRootProperty(g.root)
      }
      if (g.totalProperty) {
        f.setTotalProperty(g.totalProperty)
      }
      if (g.successProperty) {
        f.setSuccessProperty(g.successProperty)
      }
      if (g.messageProperty) {
        f.setMessageProperty(g.messageProperty)
      }
      a = g.clientIdProperty;
      if (b) {
        e = Ext.define(null, {
          extend: "Ext.data.Model",
          fields: b,
          clientIdProperty: a
        });
        f.setModel(e);
        d = f.getProxy();
        if (d) {
          d.setModel(e)
        }
      } else {
        if (a) {
          c = f.getModel();
          if (c) {
            c.self.prototype.clientIdProperty = a
          }
        }
      }
    },
    buildExtractors: function(d) {
      var b = this,
        c, a, e;
      if (d || !b.hasExtractors) {
        c = b.getTotalProperty();
        a = b.getSuccessProperty();
        e = b.getMessageProperty();
        if (c) {
          b.getTotal = b.getAccessor(c)
        }
        if (a) {
          b.getSuccess = b.getAccessor(a)
        }
        if (e) {
          b.getMessage = b.getAccessor(e)
        }
        b.hasExtractors = true;
        return true
      }
    },
    getAccessor: function(e) {
      var d = this,
        a = d.extractorCache,
        b, c;
      if (typeof e === "string") {
        c = d.getAccessorKey(e);
        b = a.get(c);
        if (!b) {
          b = d.createAccessor(e);
          a.add(c, b)
        }
      } else {
        b = d.createAccessor(e)
      }
      return b
    },
    getAccessorKey: function(a) {
      return this.$className + a
    },
    createAccessor: Ext.emptyFn,
    createFieldAccessor: Ext.emptyFn,
    destroy: function() {
      var a = this;
      a.model = a.getTotal = a.getSuccess = a.getMessage = a.rawData = null;
      a.onMetaChange = null;
      a.transform = null;
      a.callParent()
    },
    privates: {
      copyFrom: function(a) {
        var b = this;
        a.buildExtractors();
        b.getTotal = a.getTotal;
        b.getSuccess = a.getSuccess;
        b.getMessage = a.getMessage;
        ++b.duringInit;
        b.setConfig(a.getConfig());
        --b.duringInit;
        b.hasExtractors = true
      }
    }
  }, 1, 0, 0, 0, ["reader.base"], [
    [Ext.mixin.Observable.prototype.mixinId || Ext.mixin.Observable.$className,
      Ext.mixin.Observable
    ],
    [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
      Ext.mixin.Factoryable
    ]
  ], [Ext.data.reader, "Reader", Ext.data, "Reader", Ext.data, "DataReader"],
  function(b) {
    var a = b.prototype;
    Ext.apply(a, {
      nullResultSet: new Ext.data.ResultSet({
        total: 0,
        count: 0,
        records: [],
        success: true,
        message: ""
      })
    });
    a.extractorCache = new Ext.util.LruCache()
  }));
(Ext.cmd.derive("Ext.data.writer.Writer", Ext.Base, {
    factoryConfig: {
      defaultType: null
    },
    alternateClassName: ["Ext.data.DataWriter", "Ext.data.Writer"],
    config: {
      clientIdProperty: null,
      allDataOptions: {
        persist: true
      },
      partialDataOptions: {
        changes: true,
        critical: true
      },
      writeAllFields: false,
      dateFormat: null,
      nameProperty: "name",
      writeRecordId: true,
      transform: null
    },
    isWriter: true,
    constructor: function(a) {
      this.initConfig(a)
    },
    applyTransform: function(a) {
      if (a) {
        if (Ext.isFunction(a)) {
          a = {
            fn: a
          }
        }
        return a.fn.bind(a.scope || this)
      }
      return a
    },
    write: function(e) {
      var c = e.getOperation(),
        b = c.getRecords() || [],
        a = b.length,
        f = [],
        d;
      for (d = 0; d < a; d++) {
        f.push(this.getRecordData(b[d], c))
      }
      return this.writeRecords(e, f)
    },
    writeRecords: Ext.emptyFn,
    getRecordData: function(i, g) {
      var l = this,
        e = l.getNameProperty(),
        a = e !== "name",
        c = i.self.idField,
        p = c[e] || c.name,
        o = i.id,
        d = l.getWriteAllFields(),
        k, b, f, q, n, j, h, m;
      if (c.serialize) {
        o = c.serialize(o)
      }
      if (!d && g && g.isDestroyOperation) {
        k = {};
        k[p] = o
      } else {
        b = l.getDateFormat();
        f = i.phantom;
        q = (f || d) ? l.getAllDataOptions() : l.getPartialDataOptions();
        n = f && l.getClientIdProperty();
        j = i.getFieldsMap();
        q.serialize = false;
        h = i.getData(q);
        k = a ? {} : h;
        if (n) {
          k[n] = o;
          delete h[p]
        } else {
          if (!l.getWriteRecordId()) {
            delete h[p]
          }
        }
        for (p in h) {
          o = h[p];
          if (!(m = j[p])) {
            if (a) {
              k[p] = o
            }
          } else {
            if (m.isDateField && b && Ext.isDate(o)) {
              o = Ext.Date.format(o, b)
            } else {
              if (m.serialize) {
                o = m.serialize(o, i)
              }
            }
            if (a) {
              p = m[e] || p
            }
            k[p] = o
          }
        }
      }
      return k
    }
  }, 1, 0, 0, 0, ["writer.base"], [
    [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
      Ext.mixin.Factoryable
    ]
  ], [Ext.data.writer, "Writer", Ext.data, "DataWriter", Ext.data, "Writer"],
  0));
(Ext.cmd.derive("Ext.data.proxy.Proxy", Ext.Base, {
  $configPrefixed: false,
  alternateClassName: ["Ext.data.DataProxy", "Ext.data.Proxy"],
  config: {
    batchOrder: "create,update,destroy",
    batchActions: true,
    model: undefined,
    reader: {
      type: "json"
    },
    writer: {
      type: "json"
    }
  },
  isProxy: true,
  isSynchronous: false,
  constructor: function(a) {
    this.mixins.observable.constructor.call(this, a);
    this.pendingOperations = {}
  },
  applyModel: function(a) {
    return Ext.data.schema.Schema.lookupEntity(a)
  },
  updateModel: function(b) {
    if (b) {
      var a = this.getReader();
      if (a && !a.getModel()) {
        a.setModel(b)
      }
    }
  },
  applyReader: function(a) {
    if (this.isSynchronous) {
      a = a || {};
      a.keepRawData = true
    }
    return Ext.Factory.reader(a)
  },
  updateReader: function(a) {
    if (a) {
      var c = this,
        b = c.getModel();
      if (!b) {
        b = a.getModel();
        if (b) {
          c.setModel(b)
        }
      } else {
        a.setModel(b)
      }
      if (a.onMetaChange) {
        a.onMetaChange = Ext.Function.createSequence(a.onMetaChange, c.onMetaChange,
          c)
      }
    }
  },
  applyWriter: function(b) {
    var a = this.getReader();
    b = Ext.Factory.writer(b);
    if (b.getRecord && !b.getRecord() && a && a.getRecord) {
      a = a.getRecord();
      if (a) {
        b.setRecord(a)
      }
    }
    return b
  },
  abort: Ext.emptyFn,
  onMetaChange: function(a) {
    this.fireEvent("metachange", this, a)
  },
  create: Ext.emptyFn,
  read: Ext.emptyFn,
  update: Ext.emptyFn,
  erase: Ext.emptyFn,
  batch: function(n, k) {
    var j = this,
      i = j.getBatchActions(),
      g, c, f, d, e, l, b, m, h;
    if (n.operations === undefined) {
      n = {
        operations: n,
        listeners: k
      }
    }
    if (n.batch) {
      if (Ext.isDefined(n.batch.runOperation)) {
        g = Ext.applyIf(n.batch, {
          proxy: j,
          listeners: {}
        })
      }
    } else {
      n.batch = {
        proxy: j,
        listeners: n.listeners || {}
      }
    }
    if (!g) {
      g = new Ext.data.Batch(n.batch)
    }
    g.on("complete", Ext.bind(j.onBatchComplete, j, [n], 0));
    f = j.getBatchOrder().split(",");
    d = f.length;
    for (l = 0; l < d; l++) {
      e = f[l];
      c = n.operations[e];
      if (c) {
        if (i) {
          g.add(j.createOperation(e, {
            records: c,
            params: n.params
          }))
        } else {
          m = c.length;
          for (b = 0; b < m; b++) {
            h = c[b];
            g.add(j.createOperation(e, {
              records: [h],
              params: n.params
            }))
          }
        }
      }
    }
    g.start();
    return g
  },
  onBatchComplete: function(a, b) {
    var c = a.scope || this;
    if (b.hasException()) {
      if (Ext.isFunction(a.failure)) {
        Ext.callback(a.failure, c, [b, a])
      }
    } else {
      if (Ext.isFunction(a.success)) {
        Ext.callback(a.success, c, [b, a])
      }
    }
    if (Ext.isFunction(a.callback)) {
      Ext.callback(a.callback, c, [b, a])
    }
  },
  createOperation: function(c, b) {
    var a = Ext.createByAlias("data.operation." + c, b);
    a.setProxy(this);
    this.pendingOperations[a._internalId] = a;
    return a
  },
  completeOperation: function(a) {
    delete this.pendingOperations[a._internalId]
  },
  clone: function() {
    return new this.self(this.getInitialConfig())
  },
  destroy: function() {
    var b = this.pendingOperations,
      a, c;
    for (a in b) {
      c = b[a];
      if (c && c.isRunning()) {
        c.abort()
      }
    }
    this.pendingOperations = null
  }
}, 1, 0, 0, 0, ["proxy.proxy"], [
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ],
  [Ext.mixin.Observable.prototype.mixinId || Ext.mixin.Observable.$className,
    Ext.mixin.Observable
  ]
], [Ext.data.proxy, "Proxy", Ext.data, "DataProxy", Ext.data, "Proxy"], 0));
(Ext.cmd.derive("Ext.data.proxy.Client", Ext.data.proxy.Proxy, {
  alternateClassName: "Ext.data.ClientProxy",
  isSynchronous: true,
  clear: function() {}
}, 0, 0, 0, 0, 0, 0, [Ext.data.proxy, "Client", Ext.data, "ClientProxy"], 0));
(Ext.cmd.derive("Ext.data.proxy.Memory", Ext.data.proxy.Client, {
  alternateClassName: "Ext.data.MemoryProxy",
  isMemoryProxy: true,
  config: {
    enablePaging: false,
    data: {
      $value: null,
      merge: function(d, a, c, b) {
        if (Ext.isArray(d)) {
          return Ext.Array.clone(d)
        } else {
          return Ext.clone(d)
        }
      }
    }
  },
  finishOperation: function(b) {
    var c = 0,
      d = b.getRecords(),
      a = d.length;
    for (c; c < a; c++) {
      d[c].commit()
    }
    b.setSuccessful(true)
  },
  create: function(a) {
    this.finishOperation(a)
  },
  update: function(a) {
    this.finishOperation(a)
  },
  erase: function(a) {
    this.finishOperation(a)
  },
  read: function(f) {
    var h = this,
      i = h.getReader().read(h.getData()),
      d = i.getRecords(),
      g = f.getSorters(),
      a = f.getGrouper(),
      c = f.getFilters(),
      b = f.getStart(),
      e = f.getLimit();
    if (f.process(i, null, null, false) !== false) {
      if (c && c.length) {
        i.setRecords(d = Ext.Array.filter(d, Ext.util.Filter.createFilterFn(
          c)));
        i.setTotal(d.length)
      }
      if (a) {
        g = g ? g.concat(a) : g
      }
      if (g && g.length) {
        i.setRecords(d = Ext.Array.sort(d, Ext.util.Sortable.createComparator(
          g)))
      }
      if (h.getEnablePaging() && b !== undefined && e !== undefined) {
        if (b >= i.getTotal()) {
          i.setConfig({
            success: false,
            records: [],
            total: 0
          })
        } else {
          i.setRecords(Ext.Array.slice(d, b, b + e))
        }
      }
      f.setCompleted()
    }
  },
  clear: Ext.emptyFn
}, 0, 0, 0, 0, ["proxy.memory"], 0, [Ext.data.proxy, "Memory", Ext.data,
  "MemoryProxy"
], 0));
(Ext.cmd.derive("Ext.data.ProxyStore", Ext.data.AbstractStore, {
  config: {
    model: undefined,
    fields: null,
    proxy: undefined,
    autoLoad: undefined,
    autoSync: false,
    batchUpdateMode: "operation",
    sortOnLoad: true,
    trackRemoved: true,
    autoLoadDelay: 1
  },
  onClassExtended: function(b, d, a) {
    var c = d.model,
      e;
    if (typeof c === "string") {
      e = a.onBeforeCreated;
      a.onBeforeCreated = function() {
        var g = this,
          f = arguments;
        Ext.require(c, function() {
          e.apply(g, f)
        })
      }
    }
  },
  implicitModel: "Ext.data.Model",
  blockLoadCounter: 0,
  loadsWhileBlocked: 0,
  autoSyncSuspended: 0,
  constructor: function(a) {
    var b = this;
    b.removed = [];
    b.blockLoad();
    Ext.data.AbstractStore.prototype.constructor.apply(this, arguments);
    b.unblockLoad()
  },
  updateAutoLoad: function(b) {
    var c = this,
      a;
    c.getData();
    if (b) {
      a = c.loadTask || (c.loadTask = new Ext.util.DelayedTask(null, null,
        null, null, false));
      a.delay(c.autoLoadDelay, c.attemptLoad, c, Ext.isObject(b) ? [b] :
        undefined)
    }
  },
  getTotalCount: function() {
    return this.totalCount || 0
  },
  applyFields: function(a) {
    if (a) {
      this.createImplicitModel(a)
    }
  },
  applyModel: function(a) {
    if (a) {
      a = Ext.data.schema.Schema.lookupEntity(a)
    } else {
      this.getFields();
      a = this.getModel() || this.createImplicitModel()
    }
    return a
  },
  applyProxy: function(b) {
    var a = this.getModel();
    if (b !== null) {
      if (b) {
        if (b.isProxy) {
          b.setModel(a)
        } else {
          if (Ext.isString(b)) {
            b = {
              type: b,
              model: a
            }
          } else {
            if (!b.model) {
              b = Ext.apply({
                model: a
              }, b)
            }
          }
          b = Ext.createByAlias("proxy." + b.type, b);
          b.autoCreated = true
        }
      } else {
        if (a) {
          b = a.getProxy()
        }
      }
      if (!b) {
        b = Ext.createByAlias("proxy.memory");
        b.autoCreated = true
      }
    }
    return b
  },
  applyState: function(c) {
    var b = this,
      a = b.getAutoLoad() || b.isLoaded();
    b.blockLoad();
    Ext.data.AbstractStore.prototype.applyState.call(this, c);
    b.unblockLoad(a)
  },
  updateProxy: function(b, a) {
    this.proxyListeners = Ext.destroy(this.proxyListeners)
  },
  updateTrackRemoved: function(a) {
    this.cleanRemoved();
    this.removed = a ? [] : null
  },
  onMetaChange: function(a, b) {
    this.fireEvent("metachange", this, b)
  },
  create: function(e, c) {
    var d = this,
      f = d.getModel(),
      a = new f(e),
      b;
    c = Ext.apply({}, c);
    if (!c.records) {
      c.records = [a]
    }
    c.internalScope = d;
    c.internalCallback = d.onProxyWrite;
    b = d.createOperation("create", c);
    return b.execute()
  },
  read: function() {
    return this.load.apply(this, arguments)
  },
  update: function(b) {
    var c = this,
      a;
    b = Ext.apply({}, b);
    if (!b.records) {
      b.records = c.getUpdatedRecords()
    }
    b.internalScope = c;
    b.internalCallback = c.onProxyWrite;
    a = c.createOperation("update", b);
    return a.execute()
  },
  onProxyWrite: function(b) {
    var c = this,
      d = b.wasSuccessful(),
      a = b.getRecords();
    switch (b.getAction()) {
      case "create":
        c.onCreateRecords(a, b, d);
        break;
      case "update":
        c.onUpdateRecords(a, b, d);
        break;
      case "destroy":
        c.onDestroyRecords(a, b, d);
        break
    }
    if (d) {
      c.fireEvent("write", c, b);
      c.fireEvent("datachanged", c)
    }
  },
  onCreateRecords: Ext.emptyFn,
  onUpdateRecords: Ext.emptyFn,
  onDestroyRecords: function(b, a, c) {
    if (c) {
      this.cleanRemoved()
    }
  },
  erase: function(b) {
    var c = this,
      a;
    b = Ext.apply({}, b);
    if (!b.records) {
      b.records = c.getRemovedRecords()
    }
    b.internalScope = c;
    b.internalCallback = c.onProxyWrite;
    a = c.createOperation("destroy", b);
    return a.execute()
  },
  onBatchOperationComplete: function(b, a) {
    return this.onProxyWrite(a)
  },
  onBatchComplete: function(c, a) {
    var f = this,
      b = c.operations,
      e = b.length,
      d;
    if (f.batchUpdateMode !== "operation") {
      f.suspendEvents();
      for (d = 0; d < e; d++) {
        f.onProxyWrite(b[d])
      }
      f.resumeEvents()
    }
    f.isSyncing = false;
    f.fireEvent("datachanged", f)
  },
  onBatchException: function(b, a) {},
  filterNew: function(a) {
    return a.phantom === true && a.isValid()
  },
  getNewRecords: function() {
    return []
  },
  getUpdatedRecords: function() {
    return []
  },
  getModifiedRecords: function() {
    return [].concat(this.getNewRecords(), this.getUpdatedRecords())
  },
  filterUpdated: function(a) {
    return a.dirty === true && a.phantom !== true && a.isValid()
  },
  getRemovedRecords: function() {
    var a = this.removed;
    return a ? Ext.Array.clone(a) : a
  },
  sync: function(c) {
    var e = this,
      b = {},
      f = e.getNewRecords(),
      d = e.getUpdatedRecords(),
      a = e.getRemovedRecords(),
      g = false;
    e.needsSync = false;
    if (f.length > 0) {
      b.create = f;
      g = true
    }
    if (d.length > 0) {
      b.update = d;
      g = true
    }
    if (a.length > 0) {
      b.destroy = a;
      g = true
    }
    if (g && e.fireEvent("beforesync", b) !== false) {
      e.isSyncing = true;
      c = c || {};
      e.proxy.batch(Ext.apply(c, {
        operations: b,
        listeners: e.getBatchListeners()
      }))
    }
    return e
  },
  getBatchListeners: function() {
    var b = this,
      a = {
        scope: b,
        exception: b.onBatchException,
        complete: b.onBatchComplete
      };
    if (b.batchUpdateMode === "operation") {
      a.operationcomplete = b.onBatchOperationComplete
    }
    return a
  },
  save: function() {
    return this.sync.apply(this, arguments)
  },
  load: function(b) {
    if (this.isLoadBlocked()) {
      return
    }
    var c = this,
      a;
    c.setLoadOptions(b);
    if (c.getRemoteSort() && b.sorters) {
      c.fireEvent("beforesort", c, b.sorters)
    }
    a = Ext.apply({
      internalScope: c,
      internalCallback: c.onProxyLoad,
      scope: c
    }, b);
    c.lastOptions = a;
    a = c.createOperation("read", a);
    if (c.fireEvent("beforeload", c, a) !== false) {
      c.onBeforeLoad(a);
      c.loading = true;
      c.clearLoadTask();
      a.execute()
    }
    return c
  },
  reload: function(a) {
    var b = Ext.apply({}, a, this.lastOptions);
    return this.load(b)
  },
  onEndUpdate: function() {
    var a = this;
    if (a.needsSync && a.autoSync && !a.autoSyncSuspended) {
      a.sync()
    }
  },
  afterReject: function(a) {
    var b = this;
    if (b.contains(a)) {
      b.onUpdate(a, Ext.data.Model.REJECT, null);
      b.fireEvent("update", b, a, Ext.data.Model.REJECT, null)
    }
  },
  afterCommit: function(a, c) {
    var b = this;
    if (!c) {
      c = null
    }
    if (b.contains(a)) {
      b.onUpdate(a, Ext.data.Model.COMMIT, c);
      b.fireEvent("update", b, a, Ext.data.Model.COMMIT, c)
    }
  },
  afterErase: function(a) {
    this.onErase(a)
  },
  onErase: Ext.emptyFn,
  onUpdate: Ext.emptyFn,
  onDestroy: function() {
    var b = this,
      a = b.getProxy();
    b.blockLoad();
    b.getData().destroy();
    b.data = null;
    b.setProxy(null);
    if (a.autoCreated) {
      a.destroy()
    }
    b.setModel(null)
  },
  hasPendingLoad: function() {
    return !!this.loadTask || this.isLoading()
  },
  isLoading: function() {
    return !!this.loading
  },
  isLoaded: function() {
    return this.loadCount > 0
  },
  suspendAutoSync: function() {
    ++this.autoSyncSuspended
  },
  resumeAutoSync: function(b) {
    var a = this;
    if (a.autoSyncSuspended && !--a.autoSyncSuspended) {
      if (b) {
        a.sync()
      }
    }
  },
  removeAll: Ext.emptyFn,
  clearData: Ext.emptyFn,
  privates: {
    onExtraParamsChanged: function() {},
    attemptLoad: function(a) {
      if (this.isLoadBlocked()) {
        ++this.loadsWhileBlocked;
        return
      }
      this.load(a)
    },
    blockLoad: function(a) {
      ++this.blockLoadCounter
    },
    clearLoadTask: function() {
      var a = this.loadTask;
      if (a) {
        a.cancel();
        this.loadTask = null
      }
    },
    cleanRemoved: function() {
      var c = this.removed,
        a, b;
      if (c) {
        for (b = 0, a = c.length; b < a; ++b) {
          c[b].unjoin(this)
        }
        c.length = 0
      }
    },
    createOperation: function(d, a) {
      var e = this,
        b = e.getProxy(),
        c;
      if (!e.proxyListeners) {
        c = {
          scope: e,
          destroyable: true,
          beginprocessresponse: e.beginUpdate,
          endprocessresponse: e.endUpdate
        };
        if (!e.disableMetaChangeEvent) {
          c.metachange = e.onMetaChange
        }
        e.proxyListeners = b.on(c)
      }
      return b.createOperation(d, a)
    },
    createImplicitModel: function(a) {
      var e = this,
        b = {
          extend: e.implicitModel,
          statics: {
            defaultProxy: "memory"
          }
        },
        d, c;
      if (a) {
        b.fields = a
      }
      c = Ext.define(null, b);
      e.setModel(c);
      d = e.getProxy();
      if (d) {
        c.setProxy(d)
      } else {
        e.setProxy(c.getProxy())
      }
    },
    isLoadBlocked: function() {
      return !!this.blockLoadCounter
    },
    loadsSynchronously: function() {
      return this.getProxy().isSynchronous
    },
    onBeforeLoad: Ext.privateFn,
    removeFromRemoved: function(a) {
      var b = this.removed;
      if (b) {
        Ext.Array.remove(b, a);
        a.unjoin(this)
      }
    },
    setLoadOptions: function(a) {
      var c = this,
        b, d;
      if (c.getRemoteFilter()) {
        b = c.getFilters(false);
        if (b && b.getCount()) {
          a.filters = b.getRange()
        }
      }
      if (c.getRemoteSort()) {
        d = c.getSorters(false);
        if (d && d.getCount()) {
          a.sorters = d.getRange()
        }
      }
    },
    unblockLoad: function(a) {
      var c = this,
        b = c.loadsWhileBlocked;
      --c.blockLoadCounter;
      if (!c.blockLoadCounter) {
        c.loadsWhileBlocked = 0;
        if (a && b) {
          c.load()
        }
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data, "ProxyStore"], 0));
(Ext.cmd.derive("Ext.data.LocalStore", Ext.Mixin, {
  mixinConfig: {
    id: "localstore"
  },
  config: {
    extraKeys: null
  },
  applyExtraKeys: function(a) {
    var c, b = this.getData();
    b.setExtraKeys(a);
    a = b.getExtraKeys();
    for (c in a) {
      this[c] = a[c]
    }
  },
  add: function(a) {
    return this.insert(this.getCount(), arguments.length === 1 ? a :
      arguments)
  },
  constructDataCollection: function() {
    return new Ext.util.Collection({
      rootProperty: "data"
    })
  },
  createModel: function(a) {
    var b = this.getSession(),
      c;
    if (!a.isModel) {
      c = this.getModel();
      a = new c(a, b)
    }
    return a
  },
  createFiltersCollection: function() {
    return this.getData().getFilters()
  },
  createSortersCollection: function() {
    var a = this.getData().getSorters();
    a.setSorterConfigure(this.addFieldTransform, this);
    return a
  },
  onCollectionSort: function() {
    this.onSorterEndUpdate()
  },
  onCollectionFilter: function() {
    this.onFilterEndUpdate()
  },
  notifySorterChange: function() {
    this.getData().onSorterChange()
  },
  forceLocalSort: function() {
    this.getData().onSortChange()
  },
  contains: function(a) {
    return this.indexOf(a) > -1
  },
  each: function(e, d) {
    var f = this.data.items,
      a = f.length,
      b, c;
    for (c = 0; c < a; ++c) {
      b = f[c];
      if (e.call(d || b, b, c, a) === false) {
        break
      }
    }
  },
  collect: function(b, a, c) {
    var d = this,
      e = d.getData();
    if (c === true && e.filtered) {
      e = e.getSource()
    }
    return e.collect(b, "data", a)
  },
  getById: function(b) {
    var a = this.getData();
    if (a.filtered) {
      a = a.getSource()
    }
    return a.get(b) || null
  },
  getByInternalId: function(a) {
    var c = this.getData(),
      b;
    if (c.filtered) {
      if (!c.$hasExtraKeys) {
        b = this.makeInternalKeyCfg();
        c.setExtraKeys(b);
        c.$hasExtraKeys = true
      }
      c = c.getSource()
    }
    if (!c.$hasExtraKeys) {
      c.setExtraKeys(b || this.makeInternalKeyCfg());
      c.$hasExtraKeys = true
    }
    return c.byInternalId.get(a) || null
  },
  getDataSource: function() {
    var a = this.getData();
    return a.getSource() || a
  },
  indexOf: function(a) {
    return this.getData().indexOf(a)
  },
  indexOfId: function(a) {
    return this.indexOf(this.getById(a))
  },
  insert: function(c, b) {
    var e = this,
      a, d;
    if (b) {
      if (!Ext.isIterable(b)) {
        b = [b]
      } else {
        b = Ext.Array.clone(b)
      }
      a = b.length
    }
    if (!a) {
      return []
    }
    for (d = 0; d < a; ++d) {
      b[d] = e.createModel(b[d])
    }
    e.getData().insert(c, b);
    return b
  },
  queryBy: function(b, a) {
    var c = this.getData();
    return (c.getSource() || c).createFiltered(b, a)
  },
  query: function(e, d, f, a, b) {
    var c = this.getData();
    return (c.getSource() || c).createFiltered(e, d, f, a, b)
  },
  first: function(a) {
    return this.getData().first(a) || null
  },
  last: function(a) {
    return this.getData().last(a) || null
  },
  sum: function(c, a) {
    var b = this.getData();
    return (a && this.isGrouped()) ? b.sumByGroup(c) : b.sum(c)
  },
  count: function(a) {
    var b = this.getData();
    return (a && this.isGrouped()) ? b.countByGroup() : b.count()
  },
  min: function(c, a) {
    var b = this.getData();
    return (a && this.isGrouped()) ? b.minByGroup(c) : b.min(c)
  },
  max: function(c, a) {
    var b = this.getData();
    return (a && this.isGrouped()) ? b.maxByGroup(c) : b.max(c)
  },
  average: function(c, a) {
    var b = this.getData();
    return (a && this.isGrouped()) ? b.averageByGroup(c) : b.average(c)
  },
  aggregate: function(g, k, e, h) {
    var f = this,
      a, d, b, j, c;
    if (e && f.isGrouped()) {
      a = f.getGroups().items;
      d = a.length;
      b = {};
      for (c = 0; c < d; ++c) {
        j = a[c];
        b[j.getGroupKey()] = f.getAggregate(g, k || f, j.items, h)
      }
      return b
    } else {
      return f.getAggregate(g, k, f.getData().items, h)
    }
  },
  getAggregate: function(f, e, c, g) {
    var b = [],
      a = c.length,
      d;
    for (d = 0; d < a; ++d) {
      b[d] = c[d].get(g)
    }
    return f.call(e || this, c, b)
  },
  addObserver: function(a) {
    var b = this.observers;
    if (!b) {
      this.observers = b = new Ext.util.Collection()
    }
    b.add(a)
  },
  removeObserver: function(a) {
    var b = this.observers;
    if (b) {
      b.remove(a)
    }
  },
  callObservers: function(g, d) {
    var h = this.observers,
      a, c, e, b, f;
    if (h) {
      c = h.items;
      if (d) {
        d.unshift(this)
      } else {
        d = [this]
      }
      for (e = 0, a = c.length; e < a; ++e) {
        f = c[e];
        b = "onSource" + g;
        if (f[b]) {
          f[b].apply(f, d)
        }
      }
    }
  },
  queryRecordsBy: function(e, d) {
    var g = this.getData(),
      f = [],
      a, c, b;
    g = (g.getSource() || g).items;
    d = d || this;
    for (c = 0, a = g.length; c < a; ++c) {
      b = g[c];
      if (e.call(d, b) === true) {
        f.push(b)
      }
    }
    return f
  },
  queryRecords: function(g, f) {
    var e = this.getData(),
      d = [],
      a, c, b;
    e = (e.getSource() || e).items;
    for (c = 0, a = e.length; c < a; ++c) {
      b = e[c];
      if (b.get(g) === f) {
        d.push(b)
      }
    }
    return d
  },
  privates: {
    isLast: function(a) {
      return a === this.last()
    },
    makeInternalKeyCfg: function() {
      return {
        byInternalId: {
          property: "internalId",
          rootProperty: ""
        }
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.data, "LocalStore"], 0));
(Ext.cmd.derive("Ext.data.proxy.Server", Ext.data.proxy.Proxy, {
  alternateClassName: "Ext.data.ServerProxy",
  isRemote: true,
  config: {
    url: "",
    pageParam: "page",
    startParam: "start",
    limitParam: "limit",
    groupParam: "group",
    groupDirectionParam: "groupDir",
    sortParam: "sort",
    filterParam: "filter",
    directionParam: "dir",
    idParam: "id",
    simpleSortMode: false,
    simpleGroupMode: false,
    noCache: true,
    cacheString: "_dc",
    timeout: 30000,
    api: {
      create: undefined,
      read: undefined,
      update: undefined,
      destroy: undefined
    },
    extraParams: {}
  },
  create: function() {
    return this.doRequest.apply(this, arguments)
  },
  read: function() {
    return this.doRequest.apply(this, arguments)
  },
  update: function() {
    return this.doRequest.apply(this, arguments)
  },
  erase: function() {
    return this.doRequest.apply(this, arguments)
  },
  setExtraParam: function(a, b) {
    var c = this.getExtraParams();
    c[a] = b;
    this.fireEvent("extraparamschanged", c)
  },
  updateExtraParams: function(b, a) {
    this.fireEvent("extraparamschanged", b)
  },
  buildRequest: function(a) {
    var f = this,
      b = Ext.apply({}, a.getParams()),
      g = Ext.applyIf(b, f.getExtraParams() || {}),
      e, d, c;
    Ext.applyIf(g, f.getParams(a));
    d = a.getId();
    c = f.getIdParam();
    if (d !== undefined && g[c] === undefined) {
      g[c] = d
    }
    e = new Ext.data.Request({
      params: g,
      action: a.getAction(),
      records: a.getRecords(),
      url: a.getUrl(),
      operation: a,
      proxy: f
    });
    e.setUrl(f.buildUrl(e));
    a.setRequest(e);
    return e
  },
  processResponse: function(h, c, g, b) {
    var f = this,
      d, a, e;
    f.fireEvent("beginprocessresponse", f, b, c);
    if (h === true) {
      a = f.getReader();
      if (b.status === 204) {
        e = a.getNullResultSet()
      } else {
        e = a.read(f.extractResponseData(b), {
          recordCreator: c.getRecordCreator()
        })
      }
      c.process(e, g, b);
      d = !c.wasSuccessful()
    } else {
      f.setException(c, b);
      d = true
    }
    if (d) {
      f.fireEvent("exception", f, b, c)
    }
    f.afterRequest(g, h);
    f.fireEvent("endprocessresponse", f, b, c)
  },
  setException: function(b, a) {
    b.setException({
      status: a.status,
      statusText: a.statusText,
      response: a
    })
  },
  extractResponseData: Ext.identityFn,
  applyEncoding: function(a) {
    return Ext.encode(a)
  },
  encodeSorters: function(e, c) {
    var a = [],
      d = e.length,
      b;
    for (b = 0; b < d; b++) {
      a[b] = e[b].serialize()
    }
    return this.applyEncoding(c ? a[0] : a)
  },
  encodeFilters: function(d) {
    var a = [],
      c = d.length,
      b, e;
    for (b = 0; b < c; b++) {
      a[b] = d[b].serialize()
    }
    return this.applyEncoding(a)
  },
  getParams: function(o) {
    if (!o.isReadOperation) {
      return {}
    }
    var u = this,
      t = {},
      r = o.getGrouper(),
      a = o.getSorters(),
      m = o.getFilters(),
      h = o.getPage(),
      g = o.getStart(),
      s = o.getLimit(),
      k = u.getSimpleSortMode(),
      d = u.getSimpleGroupMode(),
      q = u.getPageParam(),
      e = u.getStartParam(),
      b = u.getLimitParam(),
      c = u.getGroupParam(),
      l = u.getGroupDirectionParam(),
      f = u.getSortParam(),
      p = u.getFilterParam(),
      n = u.getDirectionParam(),
      j, i;
    if (q && h) {
      t[q] = h
    }
    if (e && (g || g === 0)) {
      t[e] = g
    }
    if (b && s) {
      t[b] = s
    }
    j = c && r;
    if (j) {
      if (d) {
        t[c] = r.getProperty();
        t[l] = r.getDirection()
      } else {
        t[c] = u.encodeSorters([r], true)
      }
    }
    if (f && a && a.length > 0) {
      if (k) {
        i = 0;
        if (a.length > 1 && j) {
          i = 1
        }
        t[f] = a[i].getProperty();
        t[n] = a[i].getDirection()
      } else {
        t[f] = u.encodeSorters(a)
      }
    }
    if (p && m && m.length > 0) {
      t[p] = u.encodeFilters(m)
    }
    return t
  },
  buildUrl: function(c) {
    var b = this,
      a = b.getUrl(c);
    if (b.getNoCache()) {
      a = Ext.urlAppend(a, Ext.String.format("{0}={1}", b.getCacheString(),
        Ext.Date.now()))
    }
    return a
  },
  getUrl: function(b) {
    var a;
    if (b) {
      a = b.getUrl() || this.getApi()[b.getAction()]
    }
    return a ? a : (arguments.callee.$previous || Ext.data.proxy.Proxy.prototype
      .getUrl).call(this)
  },
  doRequest: function(a) {},
  afterRequest: Ext.emptyFn,
  destroy: function() {
    Ext.data.proxy.Proxy.prototype.destroy.call(this);
    Ext.destroy(this.getReader(), this.getWriter());
    this.reader = this.writer = null
  }
}, 0, 0, 0, 0, ["proxy.server"], 0, [Ext.data.proxy, "Server", Ext.data,
  "ServerProxy"
], 0));
(Ext.cmd.derive("Ext.data.proxy.Ajax", Ext.data.proxy.Server, {
  alternateClassName: ["Ext.data.HttpProxy", "Ext.data.AjaxProxy"],
  isAjaxProxy: true,
  defaultActionMethods: {
    create: "POST",
    read: "GET",
    update: "POST",
    destroy: "POST"
  },
  config: {
    binary: false,
    headers: undefined,
    paramsAsJson: false,
    withCredentials: false,
    useDefaultXhrHeader: true,
    username: null,
    password: null,
    actionMethods: {
      create: "POST",
      read: "GET",
      update: "POST",
      destroy: "POST"
    }
  },
  doRequest: function(a) {
    var d = this,
      e = d.getWriter(),
      c = d.buildRequest(a),
      g = d.getMethod(c),
      b, f;
    if (e && a.allowWrite()) {
      c = e.write(c)
    }
    c.setConfig({
      binary: d.getBinary(),
      headers: d.getHeaders(),
      timeout: d.getTimeout(),
      scope: d,
      callback: d.createRequestCallback(c, a),
      method: g,
      useDefaultXhrHeader: d.getUseDefaultXhrHeader(),
      disableCaching: false
    });
    if (g.toUpperCase() !== "GET" && d.getParamsAsJson()) {
      f = c.getParams();
      if (f) {
        b = c.getJsonData();
        if (b) {
          b = Ext.Object.merge({}, b, f)
        } else {
          b = f
        }
        c.setJsonData(b);
        c.setParams(undefined)
      }
    }
    if (d.getWithCredentials()) {
      c.setWithCredentials(true);
      c.setUsername(d.getUsername());
      c.setPassword(d.getPassword())
    }
    return d.sendRequest(c)
  },
  sendRequest: function(a) {
    a.setRawRequest(Ext.Ajax.request(a.getCurrentConfig()));
    this.lastRequest = a;
    return a
  },
  abort: function(a) {
    a = a || this.lastRequest;
    if (a) {
      Ext.Ajax.abort(a.getRawRequest())
    }
  },
  getMethod: function(a) {
    var c = this.getActionMethods(),
      b = a.getAction(),
      d;
    if (c) {
      d = c[b]
    }
    return d || this.defaultActionMethods[b]
  },
  createRequestCallback: function(c, a) {
    var b = this;
    return function(e, f, d) {
      if (c === b.lastRequest) {
        b.lastRequest = null
      }
      b.processResponse(f, a, c, d)
    }
  },
  destroy: function() {
    this.lastRequest = null;
    Ext.data.proxy.Server.prototype.destroy.call(this)
  }
}, 0, 0, 0, 0, ["proxy.ajax"], 0, [Ext.data.proxy, "Ajax", Ext.data,
  "HttpProxy", Ext.data, "AjaxProxy"
], 0));
(Ext.cmd.derive("Ext.data.reader.Json", Ext.data.reader.Reader, {
  alternateClassName: "Ext.data.JsonReader",
  config: {
    record: null,
    metaProperty: "metaData",
    useSimpleAccessors: false,
    preserveRawData: false
  },
  updateRootProperty: function() {
    this.forceBuildExtractors()
  },
  updateMetaProperty: function() {
    this.forceBuildExtractors()
  },
  readRecords: function(d, c, a) {
    var b = this,
      e;
    if (b.getMeta) {
      e = b.getMeta(d);
      if (e) {
        b.onMetaChange(e)
      }
    } else {
      if (d.metaData) {
        b.onMetaChange(d.metaData)
      }
    }
    return Ext.data.reader.Reader.prototype.readRecords.call(this, d, c,
      a)
  },
  getResponseData: function(a) {
    try {
      return Ext.decode(a.responseText)
    } catch (b) {
      Ext.Logger.warn("Unable to parse the JSON returned by the server");
      return this.createReadError(b.message)
    }
  },
  buildExtractors: function() {
    var c = this,
      a, b;
    if (Ext.data.reader.Reader.prototype.buildExtractors.apply(this,
        arguments)) {
      a = c.getMetaProperty();
      b = c.getRootProperty();
      if (b) {
        c.getRoot = c.getAccessor(b)
      } else {
        c.getRoot = Ext.identityFn
      }
      if (a) {
        c.getMeta = c.getAccessor(a)
      }
    }
  },
  extractData: function(a, e) {
    var f = this.getRecord(),
      d = [],
      c, b;
    if (f) {
      c = a.length;
      if (!c && Ext.isObject(a)) {
        c = 1;
        a = [a]
      }
      for (b = 0; b < c; b++) {
        d[b] = a[b][f]
      }
    } else {
      d = a
    }
    return Ext.data.reader.Reader.prototype.extractData.call(this, d, e)
  },
  getModelData: function(a) {
    return this.getPreserveRawData() ? Ext.apply({}, a) : a
  },
  createAccessor: (function() {
    var a = /[\[\.]/;
    return function(q) {
      var m = this,
        b = m.getUseSimpleAccessors(),
        e, t, j, f, d, p, s, o, n, k, l, g, r, h;
      if (!(q || q === 0)) {
        return
      }
      if (typeof q === "function") {
        return q
      }
      if (!b) {
        e = String(q).search(a)
      }
      if (b === true || e < 0) {
        t = function(c) {
          return c[q]
        }
      } else {
        j = "raw";
        f = [];
        d = "";
        p = 0;
        h = q.length;
        for (g = 0; g <= h; ++g) {
          l = q[g];
          s = l === ".";
          o = l === "[";
          n = l === "]";
          k = s || o || n || !l;
          if (!k || p > 1 || (p && !n)) {
            d += l
          } else {
            if (k) {
              r = false;
              if (o) {
                ++p
              } else {
                if (n) {
                  --p;
                  r = true
                }
              }
              if (d) {
                if (r) {
                  d = "[" + d + "]"
                } else {
                  d = "." + d
                }
                j += d;
                f.push("" + j);
                d = ""
              }
            }
          }
        }
        t = f.join(" && ");
        t = Ext.functionFactory("raw", "return " + t)
      }
      return t
    }
  }()),
  createFieldAccessor: function(e) {
    var b = this,
      a = e.mapping,
      c = a || a === 0,
      d = c ? a : e.name;
    if (c) {
      if (typeof d === "function") {
        return function(f) {
          return e.mapping(f, b)
        }
      } else {
        return b.createAccessor(d)
      }
    }
  },
  getAccessorKey: function(b) {
    var a = this.getUseSimpleAccessors() ? "simple" : "";
    return this.$className + a + b
  },
  privates: {
    copyFrom: function(a) {
      Ext.data.reader.Reader.prototype.copyFrom.call(this, a);
      this.getRoot = a.getRoot
    }
  }
}, 0, 0, 0, 0, ["reader.json"], 0, [Ext.data.reader, "Json", Ext.data,
  "JsonReader"
], 0));
(Ext.cmd.derive("Ext.data.writer.Json", Ext.data.writer.Writer, {
  alternateClassName: "Ext.data.JsonWriter",
  config: {
    rootProperty: undefined,
    encode: false,
    allowSingle: true,
    expandData: false
  },
  getExpandedData: function(d) {
    var b = d.length,
      e = 0,
      h, a, f, c, g, k = function(i, j) {
        var l = {};
        l[i] = j;
        return l
      };
    for (; e < b; e++) {
      h = d[e];
      for (a in h) {
        if (h.hasOwnProperty(a)) {
          f = a.split(".");
          c = f.length - 1;
          if (c > 0) {
            g = h[a];
            for (; c > 0; c--) {
              g = k(f[c], g)
            }
            h[f[0]] = h[f[0]] || {};
            Ext.Object.merge(h[f[0]], g);
            delete h[a]
          }
        }
      }
    }
    return d
  },
  writeRecords: function(e, f) {
    var d = this,
      a = d.getRootProperty(),
      c, g, b;
    if (d.getExpandData()) {
      f = d.getExpandedData(f)
    }
    if (d.getAllowSingle() && f.length === 1) {
      f = f[0];
      g = true
    }
    b = this.getTransform();
    if (b) {
      f = b(f, e)
    }
    if (d.getEncode()) {
      if (a) {
        e.setParam(a, Ext.encode(f))
      } else {}
    } else {
      if (g || (f && f.length)) {
        c = e.getJsonData() || {};
        if (a) {
          c[a] = f
        } else {
          c = f
        }
        e.setJsonData(c)
      }
    }
    return e
  }
}, 0, 0, 0, 0, ["writer.json"], 0, [Ext.data.writer, "Json", Ext.data,
  "JsonWriter"
], 0));
(Ext.cmd.derive("Ext.util.Group", Ext.util.Collection, {
  config: {
    groupKey: null
  },
  $endUpdatePriority: 2001
}, 0, 0, 0, 0, 0, 0, [Ext.util, "Group"], 0));
(Ext.cmd.derive("Ext.util.SorterCollection", Ext.util.Collection, {
  isSorterCollection: true,
  $sortable: null,
  sortFn: null,
  config: {
    sorterOptionsFn: null,
    sorterOptionsScope: null
  },
  constructor: function(a) {
    var b = this;
    b.sortFn = Ext.util.Sorter.createComparator(b);
    Ext.util.Collection.prototype.constructor.call(this, a);
    b.setDecoder(b.decodeSorter)
  },
  addSort: function(i, h, c) {
    var g = this,
      d, e, b, k, a, j, f;
    if (!i) {
      g.beginUpdate();
      g.endUpdate()
    } else {
      k = g.getOptions();
      if (i instanceof Array) {
        f = i;
        c = h;
        h = null
      } else {
        if (Ext.isString(i)) {
          if (!(j = g.get(i))) {
            f = [{
              property: i,
              direction: h || k.getDefaultSortDirection()
            }]
          } else {
            f = [j]
          }
        } else {
          if (Ext.isFunction(i)) {
            f = [{
              sorterFn: i,
              direction: h || k.getDefaultSortDirection()
            }]
          } else {
            f = [i];
            c = h;
            h = null
          }
        }
      }
      c = g._sortModes[c || "replace"];
      a = g.getAt(0);
      d = g.length;
      e = c.append ? d : 0;
      g.beginUpdate();
      g.splice(e, c.replace ? d : 0, f);
      if (c.multi) {
        d = g.length;
        b = k.getMultiSortLimit();
        if (d > b) {
          g.removeAt(b, d)
        }
      }
      if (j && h) {
        j.setDirection(h)
      } else {
        if (e === 0 && a && a === g.getAt(0)) {
          a.toggle()
        }
      }
      g.endUpdate()
    }
  },
  clear: function() {
    this.beginUpdate();
    Ext.util.Collection.prototype.clear.call(this);
    this.endUpdate(this.items)
  },
  getSortFn: function() {
    return this.sortFn
  },
  getByProperty: function(e) {
    var b = this.items,
      a = b.length,
      c, d;
    for (c = 0; c < a; ++c) {
      d = b[c];
      if (d.getProperty() === e) {
        return d
      }
    }
    return null
  },
  _sortModes: {
    append: {
      append: 1
    },
    multi: {
      multi: 1
    },
    prepend: {
      prepend: 1
    },
    replace: {
      replace: 1
    }
  },
  decodeSorter: function(h, a) {
    var f = this,
      i = f.getOptions(),
      g = i.getRootProperty(),
      b = f.getSorterOptionsFn(),
      c, e, d;
    if (h.isSorter) {
      if (!h.getRoot()) {
        h.setRoot(g)
      }
    } else {
      e = {
        direction: i.getDefaultSortDirection(),
        root: g
      };
      d = typeof h;
      if (d === "string") {
        c = f.get(h);
        if (c) {
          return c
        }
        e.property = h
      } else {
        if (d === "function") {
          e.sorterFn = h
        } else {
          e = Ext.apply(e, h);
          if (e.fn) {
            e.sorterFn = e.fn;
            delete e.fn
          }
        }
      }
      h = Ext.create(a || "Ext.util.Sorter", e)
    }
    if (b) {
      b.call(f.getSorterOptionsScope() || f, h)
    }
    return h
  },
  setSorterConfigure: function(b, a) {
    this.setSorterOptionsFn(b);
    this.setSorterOptionsScope(a)
  },
  decodeRemoveItems: function(g, d) {
    var j = this,
      e = (d === undefined) ? g : g[d];
    if (!e || !e.$cloned) {
      if (g.length > d + 1 || !Ext.isIterable(e)) {
        e = Ext.Array.slice(g, d)
      }
      var k = j.items,
        f = e.length,
        c = [],
        b, l, a, m, h;
      for (b = 0; b < f; b++) {
        m = e[b];
        if (m && m.isSorter) {
          c.push(m)
        } else {
          h = typeof m;
          if (h === "string") {
            m = j.get(m);
            if (m) {
              c.push(m)
            }
          } else {
            if (h === "function") {
              for (a = k.length; a-- > 0;) {
                l = k[a];
                if (l.getSorterFn() === m) {
                  c.push(l)
                }
              }
            }
          }
        }
      }
      e = c;
      e.$cloned = true
    }
    return e
  },
  getOptions: function() {
    return this.$sortable || this
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "SorterCollection"], 0));
(Ext.cmd.derive("Ext.util.FilterCollection", Ext.util.Collection, {
  isFilterCollection: true,
  $filterable: null,
  filterFn: null,
  constructor: function(a) {
    var b = this;
    b.filterFn = Ext.util.Filter.createFilterFn(b);
    Ext.util.Collection.prototype.constructor.call(this, a);
    b.setDecoder(b.decodeFilter)
  },
  filterData: function(a) {
    return this.filtered ? Ext.Array.filter(a, this.filterFn) : a
  },
  getFilterFn: function() {
    return this.filterFn
  },
  isItemFiltered: function(a) {
    return !this.filterFn(a)
  },
  decodeFilter: function(c) {
    var b = this.getOptions(),
      a = b.getRootProperty(),
      d;
    if (c.isFilter) {
      if (!c.getRoot()) {
        c.setRoot(a)
      }
    } else {
      d = {
        root: a
      };
      if (Ext.isFunction(c)) {
        d.filterFn = c
      } else {
        d = Ext.apply(d, c);
        if (d.fn) {
          d.filterFn = d.fn;
          delete d.fn
        }
        if (Ext.util.Filter.isInvalid(d)) {
          return false
        }
      }
      c = new Ext.util.Filter(d)
    }
    return c
  },
  decodeRemoveItems: function(o, j) {
    var q = this,
      k = (j === undefined) ? o : o[j];
    if (!k.$cloned) {
      if (o.length > j + 1 || !Ext.isIterable(k)) {
        k = Ext.Array.slice(o, j)
      }
      var e = q.items,
        m = k.length,
        g = [],
        b, f, c, l, a, r, h, d, p;
      for (f = 0; f < m; f++) {
        b = k[f];
        if (b && b.isFilter) {
          g.push(b)
        } else {
          p = typeof b;
          c = p === "function";
          l = b.property !== undefined && b.value !== undefined;
          a = p === "string";
          for (d = e.length; d-- > 0;) {
            r = e[d];
            h = false;
            if (a) {
              h = r.getProperty() === b
            } else {
              if (c) {
                h = r.getFilterFn() === b
              } else {
                if (l) {
                  h = r.getProperty() === b.property && r.getValue() ===
                    b.value
                }
              }
            }
            if (h) {
              g.push(r)
            }
          }
        }
      }
      k = g;
      k.$cloned = true
    }
    return k
  },
  getOptions: function() {
    return this.$filterable || this
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "FilterCollection"], 0));
(Ext.cmd.derive("Ext.util.GroupCollection", Ext.util.Collection, {
  isGroupCollection: true,
  config: {
    grouper: null,
    itemRoot: null
  },
  observerPriority: -100,
  onCollectionAdd: function(b, a) {
    this.addItemsToGroups(b, a.items)
  },
  onCollectionBeforeItemChange: function(b, a) {
    this.changeDetails = a
  },
  onCollectionBeginUpdate: function() {
    this.beginUpdate()
  },
  onCollectionEndUpdate: function() {
    this.endUpdate()
  },
  onCollectionItemChange: function(c, a) {
    var b = a.item;
    if (!a.indexChanged) {
      this.syncItemGrouping(c, b, c.getKey(b), a.oldKey, a.oldIndex)
    }
    this.changeDetails = null
  },
  onCollectionRefresh: function(a) {
    this.removeAll();
    this.addItemsToGroups(a, a.items)
  },
  onCollectionRemove: function(a, b) {
    var g = this,
      k = g.changeDetails,
      f, h, j, e, c, d, l;
    if (k) {
      l = k.item;
      j = g.findGroupForItem(l);
      f = [];
      if (j) {
        f.push({
          group: j,
          items: [l]
        })
      }
    } else {
      f = g.groupItems(a, b.items, false)
    }
    for (e = 0, c = f.length; e < c; ++e) {
      j = (h = f[e]).group;
      if (j) {
        j.remove(h.items);
        if (!j.length) {
          (d || (d = [])).push(j)
        }
      }
    }
    if (d) {
      g.remove(d)
    }
  },
  onCollectionSort: function(e) {
    var d = this,
      g = e.getSorters(false),
      a, c, b, f;
    if (g) {
      a = d.items;
      c = d.length;
      for (b = 0; b < c; ++b) {
        f = a[b];
        if (f.getSorters() !== g) {
          f.setSorters(g)
        }
      }
    }
  },
  onCollectionUpdateKey: function(d, b) {
    var a = b.index,
      c = b.item;
    if (!b.indexChanged) {
      a = d.indexOf(c);
      this.syncItemGrouping(d, c, b.newKey, b.oldKey, a)
    }
  },
  addItemsToGroups: function(b, a) {
    this.groupItems(b, a, true)
  },
  groupItems: function(b, k, d) {
    var l = this,
      a = {},
      h = [],
      c = b.getGrouper(),
      n = l.itemGroupKeys,
      m, o, q, g, p, e, j, f;
    for (g = 0, j = k.length; g < j; ++g) {
      q = c.getGroupString(p = k[g]);
      e = b.getKey(p);
      if (d) {
        (n || (l.itemGroupKeys = n = {}))[e] = q
      } else {
        if (n) {
          delete n[e]
        }
      }
      if (!(m = a[q])) {
        if (!(o = l.getByKey(q)) && d) {
          (f || (f = [])).push(o = l.createGroup(b, q))
        }
        h.push(a[q] = m = {
          group: o,
          items: []
        })
      }
      m.items.push(p)
    }
    for (g = 0, j = h.length; g < j; ++g) {
      m = h[g];
      m.group.add(m.items)
    }
    if (f) {
      l.add(f)
    }
    return h
  },
  syncItemGrouping: function(a, o, f, i, b) {
    var m = this,
      j = m.itemGroupKeys || (m.itemGroupKeys = {}),
      c = a.getGrouper(),
      p = c.getGroupString(o),
      g = 0,
      l = -1,
      k, n, e, h, d;
    if (i) {
      h = j[i];
      delete j[i]
    } else {
      h = j[f]
    }
    j[f] = p;
    if (!(n = m.get(p))) {
      n = m.createGroup(a, p);
      k = [n]
    }
    if (n.get(f) !== o) {
      if (n.getCount() > 0 && a.getSorters().getCount() === 0) {
        d = a.indexOf(n.items[0]);
        if (b < d) {
          l = 0
        } else {
          l = b - d
        }
      }
      if (l === -1) {
        n.add(o)
      } else {
        n.insert(l, o)
      }
    } else {
      n.itemChanged(o)
    }
    if (p !== h && (h === 0 || h)) {
      e = m.get(h);
      if (e) {
        e.remove(o);
        if (!e.length) {
          g = [e]
        }
      }
    }
    if (k) {
      m.splice(0, g, k)
    } else {
      if (g) {
        m.splice(0, g)
      }
    }
  },
  createGroup: function(b, a) {
    var c = new Ext.util.Group({
      groupKey: a,
      rootProperty: this.getItemRoot(),
      sorters: b.getSorters()
    });
    return c
  },
  getKey: function(a) {
    return a.getGroupKey()
  },
  createSortFn: function() {
    var c = this,
      a = c.getGrouper(),
      b = c.getSorters().getSortFn();
    if (!a) {
      return b
    }
    return function(d, e) {
      return a.sort(d.items[0], e.items[0]) || b(d, e)
    }
  },
  updateGrouper: function(a) {
    var b = this;
    b.grouped = !!(a && b.$groupable.getAutoGroup());
    b.onSorterChange();
    b.onEndUpdateSorters(b.getSorters())
  },
  destroy: function() {
    this.$groupable = null;
    Ext.util.Collection.prototype.destroy.call(this)
  },
  privates: {
    findGroupForItem: function(d) {
      var b = this.items,
        a = b.length,
        c, e;
      for (c = 0; c < a; ++c) {
        e = b[c];
        if (e.contains(d)) {
          return e
        }
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util, "GroupCollection"], 0));
(Ext.cmd.derive("Ext.data.Store", Ext.data.ProxyStore, {
  config: {
    data: 0,
    clearRemovedOnLoad: true,
    clearOnPageLoad: true,
    associatedEntity: null,
    role: null,
    session: null
  },
  addRecordsOptions: {
    addRecords: true
  },
  loadCount: 0,
  complete: false,
  moveMapCount: 0,
  constructor: function(a) {
    var b = this,
      c;
    if (a) {
      if (a.buffered) {
        return new Ext.data.BufferedStore(a)
      }
    }
    Ext.data.ProxyStore.prototype.constructor.call(this, a);
    b.getData().addObserver(b);
    c = b.inlineData;
    if (c) {
      delete b.inlineData;
      b.loadInlineData(c)
    }
  },
  onCollectionBeginUpdate: function() {
    this.beginUpdate()
  },
  onCollectionEndUpdate: function() {
    this.endUpdate()
  },
  applyData: function(c, a) {
    var b = this;
    b.getFields();
    b.getModel();
    if (c && c.isCollection) {
      a = c
    } else {
      if (!a) {
        a = b.constructDataCollection()
      }
      if (c) {
        if (b.isInitializing) {
          b.inlineData = c
        } else {
          b.loadData(c)
        }
      }
    }
    return a
  },
  loadInlineData: function(d) {
    var c = this,
      b = c.getProxy(),
      a;
    if (b && b.isMemoryProxy) {
      b.setData(d);
      a = c.blockLoadCounter;
      c.blockLoadCounter = 0;
      c.suspendEvents();
      c.read();
      c.resumeEvents();
      c.blockLoadCounter = a
    } else {
      c.removeAll(true);
      c.suspendEvents();
      c.loadData(d);
      c.resumeEvents()
    }
  },
  onCollectionAdd: function(b, a) {
    this.onCollectionAddItems(b, a.items, a)
  },
  onCollectionFilterAdd: function(b, a) {
    this.onCollectionAddItems(b, a)
  },
  onCollectionAddItems: function(f, b, a) {
    var k = this,
      h = b.length,
      m = a ? !a.next : false,
      g = k.removed,
      e = k.ignoreCollectionAdd,
      j = k.getSession(),
      o = a && a.replaced,
      c, l, d, n;
    for (c = 0; c < h; ++c) {
      d = b[c];
      if (j) {
        j.adopt(d)
      }
      if (!e) {
        d.join(k);
        if (g && g.length) {
          Ext.Array.remove(g, d)
        }
        l = l || d.phantom || d.dirty
      }
    }
    if (e) {
      return
    }
    if (o) {
      n = [];
      do {
        Ext.Array.push(n, o.items);
        o = o.next
      } while (o);
      k.setMoving(n, true)
    }
    if (a) {
      k.fireEvent("add", k, b, a.at);
      if (m) {
        k.fireEvent("datachanged", k)
      }
    }
    if (n) {
      k.setMoving(n, false)
    }
    k.needsSync = k.needsSync || l
  },
  onCollectionFilteredItemChange: function() {
    this.onCollectionItemChange.apply(this, arguments)
  },
  onCollectionItemChange: function(f, e) {
    var d = this,
      a = e.item,
      c = e.modified || null,
      b = e.meta;
    if (d.fireChangeEvent(a)) {
      d.onUpdate(a, b, c, e);
      d.fireEvent("update", d, a, b, c, e)
    }
  },
  fireChangeEvent: function(a) {
    return this.getDataSource().contains(a)
  },
  afterChange: function(a, c, b) {
    this.getData().itemChanged(a, c || null, undefined, b)
  },
  afterCommit: function(a, b) {
    this.afterChange(a, b, Ext.data.Model.COMMIT)
  },
  afterEdit: function(a, b) {
    this.needsSync = this.needsSync || a.dirty;
    this.afterChange(a, b, Ext.data.Model.EDIT)
  },
  afterReject: function(a) {
    this.afterChange(a, null, Ext.data.Model.REJECT)
  },
  afterDrop: function(a) {
    this.getData().remove(a)
  },
  afterErase: function(a) {
    this.removeFromRemoved(a)
  },
  addSorted: function(a) {
    var c = this,
      e = c.getRemoteSort(),
      d = c.getData(),
      b;
    if (e) {
      d.setSorters(c.getSorters())
    }
    b = d.findInsertionIndex(a);
    if (e) {
      d.setSorters(null)
    }
    return c.insert(b, a)
  },
  remove: function(b, j, g) {
    var h = this,
      c = h.getDataSource(),
      f, d, a, e;
    if (b) {
      if (b.isModel) {
        if (c.indexOf(b) > -1) {
          a = [b];
          f = 1
        } else {
          f = 0
        }
      } else {
        a = [];
        for (d = 0, f = b.length; d < f; ++d) {
          e = b[d];
          if (e && e.isEntity) {
            if (!c.contains(e)) {
              continue
            }
          } else {
            if (!(e = c.getAt(e))) {
              continue
            }
          }
          a.push(e)
        }
        f = a.length
      }
    }
    if (!f) {
      return []
    }
    h.removeIsMove = j === true;
    h.removeIsSilent = g;
    c.remove(a);
    h.removeIsSilent = false;
    return a
  },
  onCollectionRemove: function(g, b) {
    var m = this,
      h = m.removed,
      c = b.items,
      k = c.length,
      j = b.at,
      o = m.removeIsMove,
      l = m.removeIsSilent,
      n = !b.next,
      a = b.replacement,
      e = m.getDataSource(),
      d, f;
    if (m.ignoreCollectionRemove) {
      return
    }
    if (a) {
      m.setMoving(a.items, true)
    }
    for (d = 0; d < k; ++d) {
      f = c[d];
      if (!e.contains(f)) {
        if (h && !o && !f.phantom && !f.erasing) {
          f.removedFrom = j + d;
          h.push(f);
          m.needsSync = true
        } else {
          f.unjoin(m)
        }
      }
    }
    if (!l) {
      m.fireEvent("remove", m, c, j, o);
      if (n) {
        m.fireEvent("datachanged", m)
      }
    }
    if (a) {
      m.setMoving(a.items, false)
    }
  },
  onFilterEndUpdate: function() {
    Ext.data.ProxyStore.prototype.onFilterEndUpdate.apply(this, arguments);
    this.callObservers("Filter")
  },
  removeAt: function(a, b) {
    var c = this.getData();
    a = Math.max(a, 0);
    if (a < c.length) {
      if (arguments.length === 1) {
        b = 1
      } else {
        if (!b) {
          return
        }
      }
      c.removeAt(a, b)
    }
  },
  removeAll: function(b) {
    var c = this,
      d = c.getData(),
      e = c.hasListeners.clear,
      a = d.getRange();
    if (d.length) {
      c.removeIsSilent = true;
      c.callObservers("BeforeRemoveAll");
      d.removeAll();
      c.removeIsSilent = false;
      if (!b) {
        c.fireEvent("clear", c, a);
        c.fireEvent("datachanged", c)
      }
      c.callObservers("AfterRemoveAll", [!!b])
    }
    return a
  },
  setRecords: function(a) {
    var b = this.getCount();
    ++this.loadCount;
    if (b) {
      this.getData().splice(0, b, a)
    } else {
      this.add(a)
    }
  },
  splice: function(a, c, b) {
    return this.getData().splice(a, c, b)
  },
  load: function(a) {
    var b = this;
    if (typeof a === "function") {
      a = {
        callback: a
      }
    } else {
      a = Ext.apply({}, a)
    }
    b.setLoadOptions(a);
    return Ext.data.ProxyStore.prototype.load.call(this, a)
  },
  onProxyLoad: function(b) {
    var d = this,
      c = b.getResultSet(),
      a = b.getRecords(),
      e = b.wasSuccessful();
    if (d.destroyed) {
      return
    }
    if (c) {
      d.totalCount = c.getTotal()
    }
    if (e) {
      a = d.processAssociation(a);
      d.loadRecords(a, b.getAddRecords() ? {
        addRecords: true
      } : undefined)
    } else {
      d.loading = false
    }
    if (d.hasListeners.load) {
      d.fireEvent("load", d, a, e, b)
    }
    d.callObservers("AfterLoad", [a, e, b])
  },
  filterDataSource: function(e) {
    var f = this.getDataSource(),
      b = f.items,
      a = b.length,
      c = [],
      d;
    for (d = 0; d < a; d++) {
      if (e.call(f, b[d])) {
        c.push(b[d])
      }
    }
    return c
  },
  getNewRecords: function() {
    return this.filterDataSource(this.filterNew)
  },
  getRejectRecords: function() {
    return this.filterDataSource(this.filterRejects)
  },
  getUpdatedRecords: function() {
    return this.filterDataSource(this.filterUpdated)
  },
  loadData: function(f, a) {
    var e = this,
      d = f.length,
      c = [],
      b;
    for (b = 0; b < d; b++) {
      c.push(e.createModel(f[b]))
    }
    c = e.processAssociation(c);
    e.loadRecords(c, a ? e.addRecordsOptions : undefined)
  },
  loadRawData: function(e, b) {
    var d = this,
      f = d.getSession(),
      a = d.getProxy().getReader().read(e, f ? {
        recordCreator: f.recordCreator
      } : undefined),
      c = a.getRecords(),
      g = a.getSuccess();
    if (g) {
      d.totalCount = a.getTotal();
      d.loadRecords(c, b ? d.addRecordsOptions : undefined)
    }
    return g
  },
  loadRecords: function(a, c) {
    var g = this,
      f = a.length,
      h = g.getData(),
      e, d, b;
    if (c) {
      e = c.addRecords
    }
    if (!g.getRemoteSort() && !g.getSortOnLoad()) {
      b = true;
      h.setAutoSort(false)
    }
    if (!e) {
      g.clearData(true)
    }
    g.loading = false;
    g.ignoreCollectionAdd = true;
    g.callObservers("BeforePopulate");
    h.add(a);
    g.ignoreCollectionAdd = false;
    if (b) {
      h.setAutoSort(true)
    }
    for (d = 0; d < f; d++) {
      a[d].join(g)
    }++g.loadCount;
    g.complete = true;
    g.fireEvent("datachanged", g);
    g.fireEvent("refresh", g);
    g.callObservers("AfterPopulate")
  },
  loadPage: function(d, a) {
    var c = this,
      b = c.getPageSize();
    c.currentPage = d;
    a = Ext.apply({
      page: d,
      start: (d - 1) * b,
      limit: b,
      addRecords: !c.getClearOnPageLoad()
    }, a);
    c.read(a)
  },
  nextPage: function(a) {
    this.loadPage(this.currentPage + 1, a)
  },
  previousPage: function(a) {
    this.loadPage(this.currentPage - 1, a)
  },
  clearData: function(c) {
    var j = this,
      g = j.removed,
      d = j.getDataSource(),
      h = j.getClearRemovedOnLoad(),
      k = g && c && !h,
      a, e, b, f;
    if (d) {
      a = d.items;
      for (b = 0, f = a.length; b < f; ++b) {
        e = a[b];
        if (k && Ext.Array.contains(g, e)) {
          continue
        }
        e.unjoin(j)
      }
      j.ignoreCollectionRemove = true;
      j.callObservers("BeforeClear");
      d.removeAll();
      j.ignoreCollectionRemove = false;
      j.callObservers("AfterClear")
    }
    if (g && (!c || h)) {
      g.length = 0
    }
  },
  onIdChanged: function(c, b, a) {
    this.getData().updateKey(c, b);
    this.fireEvent("idchanged", this, c, b, a)
  },
  commitChanges: function() {
    var c = this,
      d = c.getModifiedRecords(),
      a = d.length,
      b = 0;
    Ext.suspendLayouts();
    c.beginUpdate();
    for (; b < a; b++) {
      d[b].commit()
    }
    c.cleanRemoved();
    c.endUpdate();
    Ext.resumeLayouts(true)
  },
  filterNewOnly: function(a) {
    return a.phantom === true
  },
  filterRejects: function(a) {
    return a.phantom || a.dirty
  },
  rejectChanges: function() {
    var h = this,
      j = h.getRejectRecords(),
      f = j.length,
      d, b, a, g, c, e;
    Ext.suspendLayouts();
    h.beginUpdate();
    for (d = 0; d < f; d++) {
      b = j[d];
      if (b.phantom) {
        a = a || [];
        a.push(b)
      } else {
        b.reject()
      }
    }
    if (a) {
      h.remove(a);
      for (d = 0, f = a.length; d < f; ++d) {
        a[d].reject()
      }
    }
    j = h.removed;
    if (j) {
      f = j.length;
      g = !h.getRemoteSort() && h.isSorted();
      if (g) {
        c = h.getData();
        e = c.getAutoSort();
        c.setAutoSort(false)
      }
      for (d = f - 1; d >= 0; d--) {
        b = j[d];
        b.reject();
        if (!g) {
          h.insert(b.removedFrom || 0, b)
        }
      }
      if (g) {
        c.setAutoSort(e);
        h.add(j)
      }
      j.length = 0
    }
    h.endUpdate();
    Ext.resumeLayouts(true)
  },
  onDestroy: function() {
    var b = this,
      a = b.loadTask,
      d = b.getData(),
      c = d.getSource();
    b.clearData();
    Ext.data.ProxyStore.prototype.onDestroy.call(this);
    b.setSession(null);
    b.observers = null;
    if (a) {
      a.cancel();
      b.loadTask = null
    }
    if (c) {
      c.destroy()
    }
  },
  privates: {
    fetch: function(b) {
      b = Ext.apply({}, b);
      this.setLoadOptions(b);
      var a = this.createOperation("read", b);
      a.execute()
    },
    onBeforeLoad: function(a) {
      this.callObservers("BeforeLoad", [a])
    },
    onRemoteFilterSet: function(a, b) {
      if (a) {
        this.getData().setFilters(b ? null : a)
      }
      Ext.data.ProxyStore.prototype.onRemoteFilterSet.call(this, a, b)
    },
    onRemoteSortSet: function(b, c) {
      var a = this.getData();
      if (b) {
        a.setSorters(c ? null : b)
      }
      a.setAutoGroup(!c);
      Ext.data.ProxyStore.prototype.onRemoteSortSet.call(this, b, c)
    },
    isMoving: function(c, e) {
      var f = this.moveMap,
        b = 0,
        a, d;
      if (f) {
        if (c) {
          if (Ext.isArray(c)) {
            for (d = 0, a = c.length; d < a; ++d) {
              b += f[c[d].id] ? 1 : 0
            }
          } else {
            if (f[c.id]) {
              ++b
            }
          }
        } else {
          b = e ? f : this.moveMapCount
        }
      }
      return b
    },
    setLoadOptions: function(c) {
      var d = this,
        a = d.getPageSize(),
        e, b;
      if (d.getRemoteSort() && !c.grouper) {
        b = d.getGrouper();
        if (b) {
          c.grouper = b
        }
      }
      if (a || "start" in c || "limit" in c || "page" in c) {
        c.page = c.page != null ? c.page : d.currentPage;
        c.start = (c.start !== undefined) ? c.start : (c.page - 1) * a;
        c.limit = c.limit != null ? c.limit : a;
        d.currentPage = c.page
      }
      c.addRecords = c.addRecords || false;
      if (!c.recordCreator) {
        e = d.getSession();
        if (e) {
          c.recordCreator = e.recordCreator
        }
      }
      Ext.data.ProxyStore.prototype.setLoadOptions.call(this, c)
    },
    setMoving: function(b, f) {
      var d = this,
        e = d.moveMap || (d.moveMap = {}),
        a = b.length,
        c, g;
      for (c = 0; c < a; ++c) {
        g = b[c].id;
        if (f) {
          if (e[g]) {
            ++e[g]
          } else {
            e[g] = 1;
            ++d.moveMapCount
          }
        } else {
          if (--e[g] === 0) {
            delete e[g];
            --d.moveMapCount
          }
        }
      }
      if (d.moveMapCount === 0) {
        d.moveMap = null
      }
    },
    processAssociation: function(a) {
      var c = this,
        b = c.getAssociatedEntity();
      if (b) {
        a = c.getRole().processLoad(c, b, a, c.getSession())
      }
      return a
    }
  }
}, 1, 0, 0, 0, ["store.store"], [
  [Ext.data.LocalStore.prototype.mixinId || Ext.data.LocalStore.$className,
    Ext.data.LocalStore
  ]
], [Ext.data, "Store"], 0));
(Ext.cmd.derive("Ext.data.reader.Array", Ext.data.reader.Json, {
  alternateClassName: "Ext.data.ArrayReader",
  config: {
    totalProperty: undefined,
    successProperty: undefined
  },
  createFieldAccessor: function(d) {
    var b = d.mapping,
      c = d.hasMapping() ? b : d.ordinal,
      a;
    d.mapping = c;
    a = Ext.data.reader.Json.prototype.createFieldAccessor.apply(this,
      arguments);
    d.mapping = b;
    return a
  },
  getModelData: function(a) {
    return {}
  }
}, 0, 0, 0, 0, ["reader.array"], 0, [Ext.data.reader, "Array", Ext.data,
  "ArrayReader"
], 0));
(Ext.cmd.derive("Ext.data.ArrayStore", Ext.data.Store, {
  alternateClassName: ["Ext.data.SimpleStore"],
  config: {
    proxy: {
      type: "memory",
      reader: "array"
    }
  },
  loadData: function(e, a) {
    if (this.expandData) {
      var d = [],
        b = 0,
        c = e.length;
      for (; b < c; b++) {
        d[d.length] = [e[b]]
      }
      e = d
    }
    Ext.data.Store.prototype.loadData.call(this, e, a)
  }
}, 0, 0, 0, 0, ["store.array"], 0, [Ext.data, "ArrayStore", Ext.data,
  "SimpleStore"
], 0));
(Ext.cmd.derive("Ext.data.StoreManager", Ext.util.MixedCollection, {
  alternateClassName: ["Ext.StoreMgr", "Ext.data.StoreMgr",
    "Ext.StoreManager"
  ],
  singleton: true,
  register: function() {
    for (var a = 0, b;
      (b = arguments[a]); a++) {
      this.add(b)
    }
  },
  unregister: function() {
    for (var a = 0, b;
      (b = arguments[a]); a++) {
      this.remove(this.lookup(b))
    }
  },
  lookup: function(c, g) {
    if (Ext.isArray(c)) {
      var b = ["field1"],
        e = !Ext.isArray(c[0]),
        f = c,
        d, a;
      if (e) {
        f = [];
        for (d = 0, a = c.length; d < a; ++d) {
          f.push([c[d]])
        }
      } else {
        for (d = 2, a = c[0].length; d <= a; ++d) {
          b.push("field" + d)
        }
      }
      return new Ext.data.ArrayStore({
        data: f,
        fields: b,
        autoDestroy: true,
        autoCreated: true,
        expanded: e
      })
    }
    if (Ext.isString(c)) {
      return this.get(c)
    } else {
      return Ext.Factory.store(c, g)
    }
  },
  getKey: function(a) {
    return a.storeId
  }
}, 0, 0, 0, 0, 0, 0, [Ext.data, "StoreManager", Ext, "StoreMgr", Ext.data,
  "StoreMgr", Ext, "StoreManager"
], function() {
  Ext.regStore = function(d, c) {
    var b;
    if (Ext.isObject(d)) {
      c = d
    } else {
      if (Ext.data.StoreManager.containsKey(d)) {
        return Ext.data.StoreManager.lookup(d)
      }
      c.storeId = d
    }
    if (c instanceof Ext.data.Store) {
      b = c
    } else {
      b = new Ext.data.Store(c)
    }
    Ext.data.StoreManager.register(b);
    return b
  };
  Ext.getStore = function(b) {
    return Ext.data.StoreManager.lookup(b)
  };
  var a = Ext.regStore("ext-empty-store", {
    proxy: "memory",
    useModelWarning: false
  });
  a.isEmptyStore = true
}));
(Ext.cmd.derive("Ext.app.domain.Store", Ext.app.EventDomain, {
  singleton: true,
  type: "store",
  prefix: "store.",
  idMatchRe: /^\#/,
  constructor: function() {
    var a = this;
    a.callParent();
    a.monitor(Ext.data.AbstractStore)
  },
  match: function(d, b) {
    var a = false,
      c = d.alias;
    if (b === "*") {
      a = true
    } else {
      if (this.idMatchRe.test(b)) {
        a = d.getStoreId() === b.substring(1)
      } else {
        if (c) {
          a = Ext.Array.indexOf(c, this.prefix + b) > -1
        }
      }
    }
    return a
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.domain, "Store"], 0));
(Ext.cmd.derive("Ext.app.route.Queue", Ext.Base, {
  queue: null,
  token: null,
  constructor: function(a) {
    Ext.apply(this, a);
    this.queue = new Ext.util.MixedCollection()
  },
  queueAction: function(a, b) {
    this.queue.add({
      route: a,
      args: b
    })
  },
  clearQueue: function() {
    this.queue.removeAll()
  },
  runQueue: function() {
    var a = this.queue,
      c = a.removeAt(0),
      b;
    if (c) {
      b = c && c.route;
      b.execute(this.token, c.args, this.onActionExecute, this)
    }
  },
  onActionExecute: function(a) {
    if (a) {
      this.clearQueue()
    } else {
      this.runQueue()
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.route, "Queue"], 0));
(Ext.cmd.derive("Ext.app.route.Route", Ext.Base, {
  action: null,
  conditions: null,
  controller: null,
  allowInactive: false,
  url: null,
  before: null,
  caseInsensitive: false,
  matcherRegex: null,
  paramMatchingRegex: null,
  paramsInMatchString: null,
  constructor: function(b) {
    var c = this,
      a;
    Ext.apply(c, b, {
      conditions: {}
    });
    a = c.url;
    c.paramMatchingRegex = new RegExp(/:([0-9A-Za-z\_]*)/g);
    c.paramsInMatchString = a.match(c.paramMatchingRegex) || [];
    c.matcherRegex = c.createMatcherRegex(a)
  },
  recognize: function(c) {
    var d = this,
      a = d.controller,
      e, b;
    if ((d.allowInactive || a.isActive()) && d.recognizes(c)) {
      e = d.matchesFor(c);
      b = c.match(d.matcherRegex);
      b.shift();
      return Ext.applyIf(e, {
        controller: a,
        action: d.action,
        historyUrl: c,
        args: b
      })
    }
    return false
  },
  recognizes: function(a) {
    return this.matcherRegex.test(a)
  },
  execute: function(c, g, h, d) {
    var b = g.args || [],
      f = this.before,
      a = this.controller,
      e = this.createCallback(g, h, d);
    if (f) {
      b.push(e);
      if (Ext.isString(f)) {
        f = this.before = a[f]
      }
      if (f) {
        f.apply(a, b)
      }
    } else {
      e.resume()
    }
  },
  matchesFor: function(c) {
    var f = {},
      e = this.paramsInMatchString,
      b = c.match(this.matcherRegex),
      d = 0,
      a = e.length;
    b.shift();
    for (; d < a; d++) {
      f[e[d].replace(":", "")] = b[d]
    }
    return f
  },
  createMatcherRegex: function(a) {
    var c = this.paramsInMatchString,
      h = this.conditions,
      d = 0,
      f = c.length,
      j = Ext.util.Format.format,
      k = this.caseInsensitive ? "i" : "",
      b, g, e;
    for (; d < f; d++) {
      b = c[d];
      g = h[b];
      e = j("{0}", g || "([%a-zA-Z0-9\\-\\_\\s,]+)");
      a = a.replace(new RegExp(b), e)
    }
    return new RegExp("^" + a + "$", k)
  },
  createCallback: function(a, d, b) {
    var c = this;
    b = b || c;
    return {
      resume: function() {
        var e = c.controller,
          g = c.action,
          f;
        if (Ext.isString(g)) {
          g = e[g]
        }
        a = a && a.args ? a.args : [];
        f = a.pop();
        if (f && !Ext.isObject(f)) {
          a.push(f)
        }
        if (g) {
          c.action = g;
          g.apply(e, a)
        }
        if (d) {
          d.call(b)
        }
      },
      stop: function(e) {
        if (d) {
          d.call(b, e)
        }
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.route, "Route"], 0));
(Ext.cmd.derive("Ext.util.History", Ext.Base, {
  singleton: true,
  alternateClassName: "Ext.History",
  useTopWindow: false,
  constructor: function() {
    var a = this;
    a.hiddenField = null;
    a.ready = false;
    a.currentToken = null;
    a.mixins.observable.constructor.call(a)
  },
  getHash: function() {
    return this.win.location.hash.substr(1)
  },
  setHash: function(b) {
    try {
      this.win.location.hash = b;
      this.currentToken = b
    } catch (a) {}
  },
  handleStateChange: function(a) {
    this.currentToken = a;
    this.fireEvent("change", a)
  },
  startUp: function() {
    var a = this;
    a.currentToken = a.getHash();
    if (Ext.supports.Hashchange) {
      Ext.get(a.win).on("hashchange", a.onHashChange, a)
    } else {
      Ext.TaskManager.start({
        fireIdleEvent: false,
        run: a.onHashChange,
        interval: 50,
        scope: a
      })
    }
    a.ready = true;
    a.fireEvent("ready", a)
  },
  onHashChange: function() {
    var b = this,
      a = b.getHash();
    if (a !== b.hash) {
      b.hash = a;
      b.handleStateChange(a)
    }
  },
  init: function(c, a) {
    var b = this;
    if (b.ready) {
      Ext.callback(c, a, [b]);
      return
    }
    if (!Ext.isReady) {
      Ext.onInternalReady(function() {
        b.init(c, a)
      });
      return
    }
    b.win = b.useTopWindow ? window.top : window;
    b.hash = b.getHash();
    if (c) {
      b.on("ready", c, a, {
        single: true
      })
    }
    b.startUp()
  },
  add: function(a, b) {
    var c = this,
      d = false;
    if (b === false || c.getToken() !== a) {
      c.setHash(a);
      d = true
    }
    return d
  },
  back: function() {
    var a = this.useTopWindow ? window.top : window;
    a.history.go(-1)
  },
  forward: function() {
    var a = this.useTopWindow ? window.top : window;
    a.history.go(1)
  },
  getToken: function() {
    return this.ready ? this.currentToken : this.getHash()
  }
}, 1, 0, 0, 0, 0, [
  ["observable", Ext.util.Observable]
], [Ext.util, "History", Ext, "History"], 0));
(Ext.cmd.derive("Ext.app.route.Router", Ext.Base, {
  singleton: true,
  multipleToken: "|",
  queueRoutes: true,
  constructor: function() {
    var a = Ext.util.History;
    if (!a.ready) {
      a.init()
    }
    a.on("change", this.onStateChange, this);
    this.clear()
  },
  onStateChange: function(d) {
    var k = this,
      c = k.application,
      m = k.routes,
      g = m.length,
      o = k.queueRoutes,
      j = d.split(k.multipleToken),
      n = 0,
      b = j.length,
      e, f, l, h, a;
    for (; n < b; n++) {
      d = j[n];
      a = false;
      if (o) {
        f = new Ext.app.route.Queue({
          token: d
        })
      }
      for (e = 0; e < g; e++) {
        l = m[e];
        h = l.recognize(d);
        if (h) {
          a = true;
          if (o) {
            f.queueAction(l, h)
          } else {
            l.execute(d, h)
          }
        }
      }
      if (o) {
        f.runQueue()
      }
      if (!a && c) {
        c.fireEvent("unmatchedroute", d)
      }
    }
  },
  connect: function(c, d, a) {
    var b = {
      url: c,
      action: d,
      controller: a
    };
    if (Ext.isObject(d)) {
      Ext.merge(b, d)
    }
    this.routes.push(new Ext.app.route.Route(b))
  },
  disconnectAll: function(c) {
    var b = this.routes,
      a = b.length,
      e = [],
      f, d;
    for (f = 0; f < a; ++f) {
      d = b[f];
      if (d.controller !== c) {
        e.push(d)
      }
    }
    this.routes = e
  },
  recognize: function(e) {
    var b = this.routes || [],
      f = 0,
      a = b.length,
      c, d;
    for (; f < a; f++) {
      c = b[f];
      d = c.recognize(e);
      if (d) {
        return {
          route: c,
          args: d
        }
      }
    }
    return false
  },
  draw: function(a) {
    a.call(this, this)
  },
  clear: function() {
    this.routes = []
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.route, "Router"], 0));
(Ext.cmd.derive("Ext.app.Controller", Ext.app.BaseController, {
  statics: {
    strings: {
      model: {
        getter: "getModel",
        upper: "Model"
      },
      view: {
        getter: "getView",
        upper: "View"
      },
      controller: {
        getter: "getController",
        upper: "Controller"
      },
      store: {
        getter: "getStore",
        upper: "Store"
      },
      profile: {
        getter: "getProfile",
        upper: "Profiles"
      }
    },
    controllerRegex: /^(.*)\.controller\./,
    profileRegex: /^(.*)\.profile\./,
    createGetter: function(a, b) {
      return function() {
        return this[a](b)
      }
    },
    getGetterName: function(c, a) {
      var d = "get",
        e = c.split("."),
        f = e.length,
        b;
      for (b = 0; b < f; b++) {
        d += Ext.String.capitalize(e[b])
      }
      d += a;
      return d
    },
    resolveNamespace: function(a, f) {
      var g = Ext.app.Controller,
        e = a.prototype.isProfile ? g.profileRegex : g.controllerRegex,
        d, c, b;
      d = Ext.getClassName(a);
      c = f.$namespace || f.namespace || Ext.app.getNamespace(d) || ((b =
        e.exec(d)) && b[1]);
      return c
    },
    processDependencies: function(p, q, c, d, h) {
      if (!h || !h.length) {
        return
      }
      var i = this,
        n = i.strings[d],
        b, m, l, a, e, f, k, g;
      if (!Ext.isArray(h)) {
        h = [h]
      }
      for (e = 0, f = h.length; e < f; e++) {
        a = h[e];
        b = i.getFullName(a, d, c);
        m = b.absoluteName;
        l = b.shortName;
        q.push(m);
        k = i.getGetterName(l, n.upper);
        if (!p[k]) {
          p[k] = g = i.createGetter(n.getter, a)
        }
        if (g && d !== "controller") {
          g["Ext.app.getter"] = true
        }
      }
    },
    getFullName: function(c, e, d) {
      var a = c,
        b, f;
      if ((b = c.indexOf("@")) > 0) {
        a = c.substring(0, b);
        f = c.substring(b + 1) + "." + a
      } else {
        if (c.indexOf(".") > 0 && (Ext.ClassManager.isCreated(c) || this.hasRegisteredPrefix(
            c))) {
          f = c
        } else {
          if (d) {
            f = d + "." + e + "." + c;
            a = c
          } else {
            f = c
          }
        }
      }
      return {
        absoluteName: f,
        shortName: a
      }
    },
    hasRegisteredPrefix: function(a) {
      var c = Ext.ClassManager,
        b = c.getPrefix(a);
      return b && b !== a
    }
  },
  models: null,
  views: null,
  stores: null,
  controllers: null,
  config: {
    application: null,
    refs: null,
    active: true,
    moduleClassName: null
  },
  onClassExtended: function(b, c, a) {
    var d = a.onBeforeCreated;
    a.onBeforeCreated = function(e, i) {
      var j = Ext.app.Controller,
        g = [],
        f, h;
      h = e.prototype;
      f = j.resolveNamespace(e, i);
      if (f) {
        h.$namespace = f
      }
      j.processDependencies(h, g, f, "model", i.models);
      j.processDependencies(h, g, f, "view", i.views);
      j.processDependencies(h, g, f, "store", i.stores);
      j.processDependencies(h, g, f, "controller", i.controllers);
      Ext.require(g, Ext.Function.pass(d, arguments, this))
    }
  },
  constructor: function(a) {
    this.initAutoGetters();
    Ext.app.BaseController.prototype.constructor.apply(this, arguments)
  },
  normalizeRefs: function(b) {
    var c = this,
      a = [];
    if (b) {
      if (Ext.isObject(b)) {
        Ext.Object.each(b, function(d, e) {
          if (Ext.isString(e)) {
            e = {
              selector: e
            }
          }
          e.ref = d;
          a.push(e)
        })
      } else {
        if (Ext.isArray(b)) {
          a = Ext.Array.merge(a, b)
        }
      }
    }
    b = c.refs;
    if (b) {
      c.refs = null;
      b = c.normalizeRefs(b);
      if (b) {
        a = Ext.Array.merge(a, b)
      }
    }
    return a
  },
  getRefMap: function() {
    var f = this,
      c = f._refMap,
      a, e, d, b;
    if (!c) {
      a = f.getRefs();
      c = f._refMap = {};
      if (a) {
        for (b = 0, d = a.length; b < d; b++) {
          e = a[b];
          c[e.ref] = e.selector
        }
      }
    }
    return c
  },
  applyRefs: function(a) {
    return this.normalizeRefs(Ext.clone(a))
  },
  updateRefs: function(a) {
    if (a) {
      this.ref(a)
    }
  },
  initAutoGetters: function() {
    var b = this.self.prototype,
      c, a;
    for (c in b) {
      a = b[c];
      if (a && a["Ext.app.getter"]) {
        a.call(this)
      }
    }
  },
  doInit: function(b) {
    var a = this;
    if (!a._initialized) {
      a.init(b);
      a._initialized = true
    }
  },
  finishInit: function(f) {
    var d = this,
      e = d.controllers,
      b, c, a;
    if (d._initialized && e && e.length) {
      for (c = 0, a = e.length; c < a; c++) {
        b = d.getController(e[c]);
        b.finishInit(f)
      }
    }
  },
  init: Ext.emptyFn,
  onLaunch: Ext.emptyFn,
  activate: function() {
    this.setActive(true)
  },
  deactivate: function() {
    this.setActive(false)
  },
  isActive: function() {
    return this.getActive()
  },
  ref: function(a) {
    var f = this,
      b = 0,
      e = a.length,
      g, d, c;
    a = Ext.Array.from(a);
    f.references = f.references || [];
    for (; b < e; b++) {
      g = a[b];
      d = g.ref;
      c = "get" + Ext.String.capitalize(d);
      if (!f[c]) {
        f[c] = Ext.Function.pass(f.getRef, [d, g], f)
      }
      f.references.push(d.toLowerCase())
    }
  },
  addRef: function(a) {
    this.ref(a)
  },
  getRef: function(d, f, a) {
    var c = this,
      e = c.refCache || (c.refCache = {}),
      b = e[d];
    f = f || {};
    a = a || {};
    Ext.apply(f, a);
    if (f.forceCreate) {
      return Ext.ComponentManager.create(f, "component")
    }
    if (!b) {
      if (f.selector) {
        e[d] = b = Ext.ComponentQuery.query(f.selector)[0]
      }
      if (!b && f.autoCreate) {
        e[d] = b = Ext.ComponentManager.create(f, "component")
      }
      if (b) {
        b.on("beforedestroy", function() {
          e[d] = null
        })
      }
    }
    return b
  },
  hasRef: function(b) {
    var a = this.references;
    return a && Ext.Array.indexOf(a, b.toLowerCase()) !== -1
  },
  getController: function(b) {
    var a = this.getApplication();
    if (b === this.getId()) {
      return this
    }
    return a && a.getController(b)
  },
  getStore: function(c) {
    var a, b;
    a = (c.indexOf("@") === -1) ? c : c.split("@")[0];
    b = Ext.StoreManager.get(a);
    if (!b) {
      c = Ext.app.Controller.getFullName(c, "store", this.$namespace);
      if (c) {
        b = Ext.create(c.absoluteName, {
          id: a
        })
      }
    }
    return b
  },
  getModel: function(c) {
    var b = Ext.app.Controller.getFullName(c, "model", this.$namespace),
      a = Ext.ClassManager.get(b.absoluteName);
    if (!a) {
      a = Ext.data.schema.Schema.lookupEntity(c)
    }
    return a
  },
  getProfile: function(a) {
    a = Ext.app.Controller.getFullName(a, "profile", this.$namespace);
    return a
  },
  getView: function(a) {
    var b = Ext.app.Controller.getFullName(a, "view", this.$namespace);
    return b && Ext.ClassManager.get(b.absoluteName)
  },
  ensureId: function() {
    var a = this.getId();
    if (!a) {
      this.setId(this.getModuleClassName(this.$className, "controller"))
    }
  },
  destroy: function(a, b) {
    var d = this,
      f = d.application,
      e, c;
    if (!b && f) {
      f.unregister(d)
    }
    d.application = null;
    if (a) {
      e = d.refCache;
      for (c in e) {
        if (e.hasOwnProperty(c)) {
          Ext.destroy(e[c])
        }
      }
    }
    Ext.app.BaseController.prototype.destroy.call(this)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app, "Controller"], 0));
(Ext.cmd.derive("Ext.app.Application", Ext.app.Controller, {
  isApplication: true,
  scope: undefined,
  namespaces: [],
  paths: null,
  config: {
    name: "",
    appProperty: "app",
    profiles: [],
    currentProfile: null,
    mainView: {
      $value: null,
      lazy: true
    },
    defaultToken: null,
    glyphFontFamily: null
  },
  onClassExtended: function(h, c, g) {
    var b = Ext.app.Controller,
      d = h.prototype,
      j = [],
      e, i, a, f;
    a = c.name || h.superclass.name;
    if (a) {
      c.$namespace = a;
      Ext.app.addNamespaces(a)
    }
    if (c.namespaces) {
      Ext.app.addNamespaces(c.namespaces)
    }
    if (c["paths processed"]) {
      delete c["paths processed"]
    } else {
      Ext.app.setupPaths(a, ("appFolder" in c) ? c.appFolder : h.superclass
        .appFolder, c.paths)
    }
    b.processDependencies(d, j, a, "profile", c.profiles);
    d.getDependencies(h, c, j);
    if (j.length) {
      e = g.onBeforeCreated;
      g.onBeforeCreated = function(k, m) {
        var l = Ext.Array.clone(arguments);
        Ext.require(j, function() {
          return e.apply(this, l)
        })
      }
    }
  },
  getDependencies: Ext.emptyFn,
  constructor: function(b) {
    var c = this;
    Ext.app.route.Router.application = c;
    Ext.app.Controller.prototype.constructor.apply(this, arguments);
    c.doInit(c);
    c.initNamespace();
    Ext.on("appupdate", c.onAppUpdate, c, {
      single: true
    });
    var a = this.getProfiles();
    if (a && a.length) {
      Ext.require(a, this.onProfilesLoaded, this)
    } else {
      this.onProfilesReady()
    }
  },
  onAppUpdate: Ext.emptyFn,
  onProfilesReady: function() {
    var a = this;
    a.initControllers();
    a.onBeforeLaunch();
    a.finishInitControllers()
  },
  initNamespace: function() {
    var c = this,
      a = c.getAppProperty(),
      b;
    b = Ext.namespace(c.getName());
    if (b) {
      b.getApplication = function() {
        return c
      };
      if (a) {
        if (!b[a]) {
          b[a] = c
        }
      }
    }
  },
  initControllers: function() {
    var c = this,
      d = Ext.Array.from(c.controllers);
    c.controllers = new Ext.util.MixedCollection();
    for (var a = 0, b = d.length; a < b; a++) {
      c.getController(d[a])
    }
  },
  finishInitControllers: function() {
    var c = this,
      d, b, a;
    d = c.controllers.getRange();
    for (b = 0, a = d.length; b < a; b++) {
      d[b].finishInit(c)
    }
  },
  launch: Ext.emptyFn,
  onBeforeLaunch: function() {
    var i = this,
      e = Ext.util.History,
      a = i.getDefaultToken(),
      g = i.getCurrentProfile(),
      b, h, j, f, d;
    i.initMainView();
    if (g) {
      g.launch()
    }
    i.launch.call(i.scope || i);
    i.launched = true;
    i.fireEvent("launch", i);
    b = i.controllers.items;
    j = b.length;
    for (h = 0; h < j; h++) {
      f = b[h];
      f.onLaunch(i)
    }
    if (!e.ready) {
      e.init()
    }
    d = e.getToken();
    if (d || d === a) {
      Ext.app.route.Router.onStateChange(d)
    } else {
      if (a) {
        e.add(a)
      }
    }
    if (Ext.Microloader && Ext.Microloader.appUpdate && Ext.Microloader.appUpdate
      .updated) {
      Ext.Microloader.fireAppUpdate()
    }
    Ext.defer(Ext.ClassManager.clearNamespaceCache, 2000, Ext.ClassManager)
  },
  getModuleClassName: function(a, b) {
    return Ext.app.Controller.getFullName(a, b, this.getName()).absoluteName
  },
  initMainView: function() {
    var c = this,
      b = c.getCurrentProfile(),
      a;
    if (b) {
      a = b.getMainView()
    }
    if (a) {
      c.setMainView(a)
    } else {
      c.getMainView()
    }
  },
  applyMainView: function(b) {
    var a;
    a = this.getView(b);
    return a.create()
  },
  createController: function(a) {
    return this.getController(a)
  },
  destroyController: function(a) {
    if (typeof a === "string") {
      a = this.getController(a, true)
    }
    Ext.destroy(a)
  },
  getController: function(b, a) {
    var k = this,
      d = k.controllers,
      h, f, g, e, j, l;
    f = d.get(b);
    if (!f) {
      l = d.items;
      for (e = 0, g = l.length; e < g; ++e) {
        j = l[e];
        h = j.getModuleClassName();
        if (h && h === b) {
          f = j;
          break
        }
      }
    }
    if (!f && !a) {
      h = k.getModuleClassName(b, "controller");
      f = Ext.create(h, {
        application: k,
        moduleClassName: b
      });
      d.add(f);
      if (k._initialized) {
        f.doInit(k)
      }
    }
    return f
  },
  unregister: function(a) {
    this.controllers.remove(a)
  },
  getApplication: function() {
    return this
  },
  destroy: function(a) {
    var c = this,
      e = c.controllers,
      b = Ext.namespace(c.getName()),
      d = c.getAppProperty();
    Ext.destroy(c.viewport);
    if (e) {
      e.each(function(f) {
        f.destroy(a, true)
      })
    }
    c.controllers = null;
    Ext.app.Controller.prototype.destroy.call(this, a, true);
    if (b && b[d] === c) {
      delete b[d]
    }
  },
  updateGlyphFontFamily: function(a) {
    Ext.setGlyphFontFamily(a)
  },
  applyProfiles: function(a) {
    var b = this;
    return Ext.Array.map(a, function(c) {
      return b.getModuleClassName(c, "profile")
    })
  },
  onProfilesLoaded: function() {
    var k = this,
      m = k.getProfiles(),
      d = m.length,
      a = [],
      j, h, o, q, c, p, n, g, l, e, b, f;
    for (h = 0; h < d; h++) {
      a[h] = Ext.create(m[h], {
        application: k
      });
      if (a[h].isActive() && !j) {
        j = a[h];
        o = j.getDependencies();
        q = o.all;
        k.setCurrentProfile(j);
        p = o.controller;
        if (p.length) {
          c = k.controllers = (k.controllers || []);
          c.push.apply(c, p)
        }
        g = o.view;
        if (g.length) {
          n = k.views = (k.views || []);
          n.push.apply(n, g)
        }
        e = o.store;
        if (e.length) {
          l = k.stores = (k.stores || []);
          l.push.apply(l, e)
        }
        f = o.model;
        if (f.length) {
          b = k.models = (k.models || []);
          b.push.apply(b, f)
        }
      }
    }
    if (q) {
      Ext.require(q, k.onProfilesReady, k)
    } else {
      k.onProfilesReady()
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app, "Application"], 0));
Ext.application = function(a) {
  var b = function(c) {
    Ext.onReady(function() {
      var d = Ext.viewport;
      d = d && d.Viewport;
      if (d && d.setup) {
        d.setup(c.prototype.config.viewport)
      }
      Ext.app.Application.instance = new c()
    })
  };
  if (typeof a === "string") {
    Ext.require(a, function() {
      b(Ext.ClassManager.get(a))
    })
  } else {
    a = Ext.apply({
      extend: "Ext.app.Application"
    }, a);
    Ext.app.setupPaths(a.name, a.appFolder, a.paths);
    a["paths processed"] = true;
    Ext.define(a.name + ".$application", a, function() {
      b(this)
    })
  }
};
Ext.define("Ext.overrides.app.Application", {
  override: "Ext.app.Application",
  autoCreateViewport: false,
  config: {
    enableQuickTips: true
  },
  applyMainView: function(e) {
    var b = this.getView(e),
      d = b.prototype,
      c, a;
    if (!d.isViewport) {
      a = d.plugins;
      a = ["viewport"].concat(a ? Ext.Array.from(a, true) : []);
      c = {
        plugins: a
      }
    }
    return b.create(c)
  },
  getDependencies: function(a, f, d) {
    var g = Ext.app.Controller,
      e = a.prototype,
      c = f.$namespace,
      b = f.autoCreateViewport;
    if (b) {
      if (b === true) {
        b = "Viewport"
      } else {
        d.push("Ext.plugin.Viewport")
      }
      g.processDependencies(e, d, c, "view", b)
    }
  },
  onBeforeLaunch: function() {
    var b = this,
      a = b.autoCreateViewport;
    if (b.getEnableQuickTips()) {
      b.initQuickTips()
    }
    if (a) {
      b.initViewport()
    }
    arguments.callee.$previous.apply(this, arguments)
  },
  getViewportName: function() {
    var a = null,
      b = this.autoCreateViewport;
    if (b) {
      a = (b === true) ? "Viewport" : b
    }
    return a
  },
  initViewport: function() {
    this.setMainView(this.getViewportName())
  },
  initQuickTips: function() {
    Ext.tip.QuickTipManager.init()
  }
});
(Ext.cmd.derive("Ext.app.domain.View", Ext.app.EventDomain, {
  isInstance: true,
  constructor: function(a) {
    Ext.app.EventDomain.prototype.constructor.apply(this, arguments);
    this.controller = a;
    this.monitoredClasses = [Ext.Component]
  },
  match: function(d, a, b) {
    var c = false;
    if (a === "#") {
      c = b === d.getController()
    } else {
      c = d.is(a)
    }
    return c
  },
  destroy: function() {
    this.controller = null;
    Ext.app.EventDomain.prototype.destroy.call(this)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.domain, "View"], 0));
(Ext.cmd.derive("Ext.app.ViewController", Ext.app.BaseController, {
  isViewController: true,
  factoryConfig: {
    type: "controller"
  },
  config: {
    closeViewAction: "destroy"
  },
  constructor: function() {
    this.compDomain = new Ext.app.domain.View(this);
    Ext.app.BaseController.prototype.constructor.apply(this, arguments)
  },
  beforeInit: Ext.emptyFn,
  init: Ext.emptyFn,
  initViewModel: Ext.emptyFn,
  destroy: function() {
    var a = this,
      b = a.compDomain;
    if (b) {
      b.unlisten(a);
      b.destroy()
    }
    a.compDomain = a.view = null;
    Ext.app.BaseController.prototype.destroy.call(this)
  },
  closeView: function() {
    var a = this.getView(),
      b;
    if (a) {
      b = this.getCloseViewAction();
      a[b]()
    }
  },
  control: function(a, b) {
    var c = a;
    if (Ext.isString(a)) {
      c = {};
      c[a] = b
    }
    this.compDomain.listen(c, this)
  },
  listen: function(c, a) {
    var b = c.component;
    if (b) {
      c = Ext.apply({}, c);
      delete c.component;
      this.control(b)
    }
    this.callParent([c, a])
  },
  getReferences: function() {
    return this.view.getReferences()
  },
  getView: function() {
    return this.view
  },
  lookupReference: function(b) {
    var a = this.view;
    return a && a.lookupReference(b)
  },
  getSession: function() {
    var a = this.view;
    return a && a.lookupSession()
  },
  getViewModel: function() {
    var a = this.view;
    return a && a.lookupViewModel()
  },
  getStore: function(b) {
    var a = this.getViewModel();
    return a ? a.getStore(b) : null
  },
  fireViewEvent: function(d, b) {
    var c = this.view,
      a = false,
      e = arguments;
    if (c) {
      if (c !== b) {
        e = Ext.Array.slice(e);
        e.splice(1, 0, c)
      }
      a = c.fireEvent.apply(c, e)
    }
    return a
  },
  privates: {
    view: null,
    ensureId: function() {
      var a = this.getId();
      if (!a) {
        this.setId(Ext.id(null, "controller-"))
      }
    },
    attachReference: function(b) {
      var a = this.view;
      if (a) {
        a.attachReference(b)
      }
    },
    clearReference: function(b) {
      var a = this.view;
      if (a) {
        a.clearReference(b)
      }
    },
    clearReferences: function() {
      var a = this.view;
      if (a) {
        a.clearReferences()
      }
    },
    setView: function(a) {
      this.view = a;
      if (!this.beforeInit.$nullFn) {
        this.beforeInit(a)
      }
    }
  }
}, 1, 0, 0, 0, 0, [
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ]
], [Ext.app, "ViewController"], 0));
(Ext.cmd.derive("Ext.util.Bag", Ext.Base, {
  isBag: true,
  constructor: function() {
    this.items = [];
    this.map = {}
  },
  generation: 0,
  length: 0,
  add: function(e) {
    var d = this,
      g = d.getKey(e),
      f = d.map,
      c = d.items,
      a = f[g],
      b;
    if (a === undefined) {
      c.push(e);
      f[g] = d.length++;
      b = e
    } else {
      b = c[a];
      c[a] = e
    }++d.generation;
    return b
  },
  clear: function() {
    var c = this,
      b = c.generation || c.length,
      a = b ? c.items : [];
    if (b) {
      c.items = [];
      c.length = 0;
      c.map = {};
      ++c.generation
    }
    return a
  },
  clone: function() {
    var c = this,
      b = new c.self(),
      a = c.length;
    if (a) {
      Ext.apply(b.map, c.map);
      b.items = c.items.slice();
      b.length = c.length
    }
    return b
  },
  contains: function(c) {
    var a = false,
      d = this.map,
      b;
    if (c != null) {
      b = this.getKey(c);
      if (b in d) {
        a = this.items[d[b]] === c
      }
    }
    return a
  },
  containsKey: function(a) {
    return a in this.map
  },
  destroy: function() {
    this.items = this.map = null;
    this.callParent()
  },
  getAt: function(b) {
    var a = null;
    if (b < this.length) {
      a = this.items[b]
    }
    return a
  },
  getByKey: function(b) {
    var c = this.map,
      a = null;
    if (b in c) {
      a = this.items[c[b]]
    }
    return a
  },
  getCount: function() {
    return this.length
  },
  getKey: function(a) {
    return a.id || a.getId()
  },
  remove: function(f) {
    var e = this,
      g = e.map,
      c = e.items,
      b = null,
      a, h, d;
    if (e.length) {
      a = g[h = e.getKey(f)];
      if (a !== undefined) {
        delete g[h];
        b = c[a];
        d = c.pop();
        if (a < --e.length) {
          c[a] = d;
          g[e.getKey(d)] = a
        }++e.generation
      }
    }
    return b
  },
  removeByKey: function(a) {
    var b = this.getByKey(a);
    if (b) {
      this.remove(b)
    }
    return b || null
  },
  sort: function(b) {
    var d = this,
      a = d.items,
      e = a.length,
      c;
    if (e) {
      Ext.Array.sort(a, b);
      d.map = {};
      while (e-- > 0) {
        c = a[e];
        d.map[d.getKey(c)] = e
      }++d.generation
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "Bag"], 0));
(Ext.cmd.derive("Ext.util.Scheduler", Ext.Base, {
  busyCounter: 0,
  lastBusyCounter: 0,
  destroyed: false,
  firing: null,
  notifyIndex: -1,
  nextId: 0,
  orderedItems: null,
  passes: 0,
  scheduledCount: 0,
  validIdRe: null,
  config: {
    cycleLimit: 5,
    preSort: null,
    tickDelay: 5
  },
  suspendOnNotify: true,
  constructor: function(a) {
    this.mixins.observable.constructor.call(this, a);
    this.items = new Ext.util.Bag()
  },
  destroy: function() {
    var a = this,
      b = a.timer;
    if (b) {
      window.clearTimeout(b);
      a.timer = null
    }
    a.items.destroy();
    a.items = a.orderedItems = null;
    a.callParent()
  },
  add: function(c) {
    var b = this,
      a = b.items;
    if (a === b.firing) {
      b.items = a = a.clone()
    }
    c.id = c.id || ++b.nextId;
    c.scheduler = b;
    a.add(c);
    if (!b.sortMap) {
      b.orderedItems = null
    }
  },
  remove: function(c) {
    var b = this,
      a = b.items;
    if (b.destroyed) {
      return
    }
    if (a === b.firing) {
      b.items = a = a.clone()
    }
    if (c.scheduled) {
      b.unscheduleItem(c);
      c.scheduled = false
    }
    a.remove(c);
    b.orderedItems = null
  },
  sort: function() {
    var d = this,
      a = d.items,
      e = {},
      f = d.getPreSort(),
      b, c;
    d.orderedItems = [];
    d.sortMap = e;
    if (f) {
      a.sort(f)
    }
    a = a.items;
    for (b = 0; b < a.length; ++b) {
      c = a[b];
      if (!e[c.id]) {
        d.sortItem(c)
      }
    }
    d.sortMap = null
  },
  sortItem: function(c) {
    var b = this,
      d = b.sortMap,
      a = b.orderedItems,
      e;
    if (!c.scheduler) {
      b.add(c)
    }
    e = c.id;
    if (!(e in d)) {
      d[e] = 0;
      if (!c.sort.$nullFn) {
        c.sort()
      }
      d[e] = 1;
      c.order = b.orderedItems.length;
      a.push(c)
    }
    return b
  },
  sortItems: function(a) {
    var b = this,
      c = b.sortItem;
    if (a) {
      if (a instanceof Array) {
        Ext.each(a, c, b)
      } else {
        Ext.Object.eachValue(a, c, b)
      }
    }
    return b
  },
  applyPreSort: function(g) {
    if (typeof g === "function") {
      return g
    }
    var f = g.split(","),
      e = [],
      d = f.length,
      h, a, b;
    for (a = 0; a < d; ++a) {
      e[a] = 1;
      b = f[a];
      if ((h = b.charAt(0)) === "-") {
        e[a] = -1
      } else {
        if (h !== "+") {
          h = 0
        }
      }
      if (h) {
        f[a] = b.substring(1)
      }
    }
    return function(c, o) {
      var j = 0,
        k, n, m, l;
      for (k = 0; !j && k < d; ++k) {
        n = f[k];
        m = c[n];
        l = o[n];
        j = e[k] * ((m < l) ? -1 : ((l < m) ? 1 : 0))
      }
      return j
    }
  },
  notify: function() {
    var j = this,
      b = j.timer,
      d = j.getCycleLimit(),
      c = Ext.GlobalEvents,
      g = j.suspendOnNotify,
      l, e, k, h, f, a;
    if (b) {
      window.clearTimeout(b);
      j.timer = null
    }
    if (g) {
      Ext.suspendLayouts()
    }
    while (j.scheduledCount) {
      if (d) {
        --d
      } else {
        j.firing = null;
        break
      }
      if (!a) {
        a = true;
        if (c.hasListeners.beforebindnotify) {
          c.fireEvent("beforebindnotify", j)
        }
      }++j.passes;
      if (!(f = j.orderedItems)) {
        j.sort();
        f = j.orderedItems
      }
      h = f.length;
      if (h) {
        j.firing = j.items;
        for (e = 0; e < h; ++e) {
          k = f[e];
          if (k.scheduled) {
            k.scheduled = false;
            --j.scheduledCount;
            j.notifyIndex = e;
            k.react();
            if (!j.scheduledCount) {
              break
            }
          }
        }
      }
    }
    j.firing = null;
    j.notifyIndex = -1;
    if (g) {
      Ext.resumeLayouts(true)
    }
    if ((l = j.busyCounter) !== j.lastBusyCounter) {
      if (!(j.lastBusyCounter = l)) {
        j.fireEvent("idle", j)
      }
    }
  },
  onTick: function() {
    this.timer = null;
    this.notify()
  },
  scheduleItem: function(b) {
    var a = this;
    ++a.scheduledCount;
    if (!a.timer && !a.firing) {
      a.scheduleTick()
    }
  },
  scheduleTick: function() {
    var a = this;
    if (!a.destroyed && !a.timer) {
      a.timer = Ext.Function.defer(a.onTick, a.getTickDelay(), a)
    }
  },
  unscheduleItem: function(a) {
    if (this.scheduledCount) {
      --this.scheduledCount
    }
  },
  adjustBusy: function(a) {
    var b = this,
      c = b.busyCounter + a;
    b.busyCounter = c;
    if (c) {
      if (!b.lastBusyCounter) {
        b.lastBusyCounter = c;
        b.fireEvent("busy", b)
      }
    } else {
      if (b.lastBusyCounter && !b.timer) {
        b.scheduleTick()
      }
    }
  },
  isBusy: function() {
    return !this.isIdle()
  },
  isIdle: function() {
    return !(this.busyCounter + this.lastBusyCounter)
  }
}, 1, 0, 0, 0, 0, [
  [Ext.mixin.Observable.prototype.mixinId || Ext.mixin.Observable.$className,
    Ext.mixin.Observable
  ]
], [Ext.util, "Scheduler"], 0));
(Ext.cmd.derive("Ext.data.Batch", Ext.Base, {
  config: {
    pauseOnException: false
  },
  current: -1,
  total: 0,
  running: false,
  complete: false,
  exception: false,
  constructor: function(a) {
    var b = this;
    b.mixins.observable.constructor.call(b, a);
    b.operations = [];
    b.exceptions = []
  },
  add: function(b) {
    var d = this,
      c, a;
    if (Ext.isArray(b)) {
      for (c = 0, a = b.length; c < a; ++c) {
        d.add(b[c])
      }
    } else {
      d.total++;
      b.setBatch(d);
      d.operations.push(b)
    }
    return d
  },
  sort: function() {
    this.operations.sort(this.sortFn)
  },
  sortFn: function(c, a) {
    var b = c.order - a.order;
    if (b) {
      return b
    }
    var f = c.entityType,
      d = a.entityType,
      e;
    if (!f || !d) {
      return 0
    }
    if (!(e = f.rank)) {
      f.schema.rankEntities();
      e = f.rank
    }
    return (e - d.rank) * c.foreignKeyDirection
  },
  start: function(a) {
    var b = this;
    if (!b.operations.length || b.running) {
      return b
    }
    b.exceptions.length = 0;
    b.exception = false;
    b.running = true;
    return b.runOperation(Ext.isDefined(a) ? a : b.current + 1)
  },
  retry: function() {
    return this.start(this.current)
  },
  runNextOperation: function() {
    var a = this;
    if (a.running) {
      a.runOperation(a.current + 1)
    }
    return a
  },
  pause: function() {
    this.running = false;
    return this
  },
  getOperations: function() {
    return this.operations
  },
  getExceptions: function() {
    return this.exceptions
  },
  getCurrent: function() {
    var a = null,
      b = this.current;
    if (!(b === -1 || this.complete)) {
      a = this.operations[b]
    }
    return a
  },
  getTotal: function() {
    return this.total
  },
  isRunning: function() {
    return this.running
  },
  isComplete: function() {
    return this.complete
  },
  hasException: function() {
    return this.exception
  },
  runOperation: function(c) {
    var d = this,
      b = d.operations,
      a = b[c];
    if (a === undefined) {
      d.running = false;
      d.complete = true;
      d.fireEvent("complete", d, b[b.length - 1])
    } else {
      d.current = c;
      a.setInternalCallback(d.onOperationComplete);
      a.setInternalScope(d);
      a.execute()
    }
    return d
  },
  onOperationComplete: function(a) {
    var c = this,
      b = a.hasException();
    if (b) {
      c.exception = true;
      c.exceptions.push(a);
      c.fireEvent("exception", c, a)
    }
    if (b && c.getPauseOnException()) {
      c.pause()
    } else {
      c.fireEvent("operationcomplete", c, a);
      c.runNextOperation()
    }
  }
}, 1, 0, 0, 0, 0, [
  ["observable", Ext.mixin.Observable]
], [Ext.data, "Batch"], 0));
(Ext.cmd.derive("Ext.data.matrix.Slice", Ext.Base, {
  stub: null,
  constructor: function(a, b) {
    this.id = b;
    this.side = a;
    this.members = {}
  },
  attach: function(a) {
    var b = this;
    b.store = a;
    a.matrix = b;
    a.on("load", b.onStoreLoad, b, {
      single: true
    })
  },
  changeId: function(b) {
    var i = this,
      a = i.id,
      h = i.side,
      l = h.slices,
      k = l[a],
      c = k.members,
      f = h.index,
      d = h.inverse.slices,
      g, e, j;
    i.id = b;
    l[b] = k;
    delete l[a];
    for (e in c) {
      g = c[e];
      g[f] = b;
      j = d[e].members;
      j[b] = j[a];
      delete j[a]
    }
  },
  onStoreLoad: function(a) {
    this.update(a.getData().items, 0)
  },
  update: function(m, f) {
    var s = this,
      h = Ext.data.matrix.Slice,
      c = s.side,
      j = c.index,
      e = m.length,
      l = s.id,
      r = s.members,
      b = c.inverse,
      q = b.slices,
      g, o, n, p, a, k, d;
    for (n = 0; n < e; ++n) {
      o = d = null;
      p = m[n];
      a = p.isEntity ? (d = p).id : p;
      g = r[a];
      if (f < 0 && g && g[2] === 1) {
        delete r[a];
        k = q[a];
        if (k) {
          delete k.members[l]
        }
        o = 1
      } else {
        if (!g) {
          g = [a, a, f];
          g[j] = l;
          r[a] = g;
          k = q[a];
          if (!k) {
            q[a] = k = new h(b, a)
          }
          k.members[l] = g;
          o = 1
        } else {
          if (f !== g[2] && f !== 0) {
            g[2] = f;
            k = q[a];
            o = 1
          }
        }
      }
      if (o) {
        if (s.notify) {
          s.notify.call(s.scope, s, a, f)
        }
        if (k && k.notify) {
          k.notify.call(k.scope, k, l, f)
        }
      }
    }
  },
  destroy: function() {
    var b = this,
      a = b.store;
    if (a) {
      a.matrix = null;
      a.un("load", b.onStoreLoad, b)
    }
    b.notify = b.scope = b.store = b.side = b.members = null;
    b.callParent()
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data.matrix, "Slice"], 0));
(Ext.cmd.derive("Ext.data.matrix.Side", Ext.Base, {
  constructor: function(a, b, d) {
    var c = this;
    c.matrix = a;
    c.index = b;
    c.role = d;
    c.slices = {}
  },
  get: function(b, a) {
    var c = this,
      e = c.slices,
      d = e[b] || (e[b] = new Ext.data.matrix.Slice(c, b));
    return (a || a === 0) ? d.members[a] : d
  },
  update: function(b, a, c) {
    var d = this.get(b);
    return d.update(a, c)
  },
  destroy: function() {
    var a = this,
      b = a.slices,
      c;
    for (c in b) {
      b[c].destroy()
    }
    a.inverse = a.matrix = a.role = a.slices = null;
    a.callParent()
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data.matrix, "Side"], 0));
(Ext.cmd.derive("Ext.data.matrix.Matrix", Ext.Base, {
  constructor: function(g, c) {
    var e = this,
      b = c.isManyToMany ? c : g.getSchema().getAssociation(c),
      a = Ext.data.matrix.Side,
      f = new a(e, 0, b.left),
      d = new a(e, 1, b.right);
    e.association = b;
    e.session = g;
    e.left = f;
    e.right = d;
    f.inverse = d;
    d.inverse = f
  },
  update: function(b, a, c) {
    return this.left.update(b, a, c)
  },
  destroy: function() {
    var a = this;
    a.left.destroy();
    a.right.destroy();
    a.association = a.session = a.left = a.right = null;
    a.callParent()
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data.matrix, "Matrix"], 0));
(Ext.cmd.derive("Ext.data.session.ChangesVisitor", Ext.Base, {
  constructor: function(c) {
    var a = this,
      b;
    a.session = c;
    b = c.getCrudProperties();
    a.result = null;
    a.writerOptions = {};
    a.createKey = b.create;
    a.readKey = b.read;
    a.updateKey = b.update;
    a.dropKey = b.drop
  },
  onDirtyRecord: function(f) {
    var i = this,
      l = i.crud,
      e = f.phantom,
      c = f.dropped,
      g = !e && !c,
      j = f.$className,
      b = (e || c) ? "allDataOptions" : "partialDataOptions",
      h = i.writerOptions,
      a = f.entityName,
      n, d, k, m;
    if (e && c) {
      return false
    }
    l = e ? i.createKey : (c ? i.dropKey : i.updateKey);
    h = h[j] || (h[j] = {});
    if (c) {
      if (!(n = h.drop)) {
        h.drop = n = {
          all: f.getProxy().getWriter().getWriteAllFields()
        }
      }
      if (!n.all) {
        k = f.id
      }
    }
    if (!k) {
      if (!(n = h[b])) {
        n = f.getProxy().getWriter().getConfig(b);
        h[b] = n = Ext.Object.chain(n);
        i.setupOptions(n)
      }
      k = f.getData(n)
    }
    m = i.result || (i.result = {});
    d = m[a] || (m[a] = {});
    d = d[l] || (d[l] = []);
    d.push(k)
  },
  setupOptions: function(a) {
    a.serialize = true
  },
  onMatrixChange: function(d, i, h, a) {
    var g = this,
      b = d.left.type,
      f = d.right.role,
      e = a < 0 ? g.dropKey : g.createKey,
      c, j;
    j = g.result || (g.result = {});
    c = j[b] || (j[b] = {});
    c = c[f] || (c[f] = {});
    c = c[e] || (c[e] = {});
    c = c[i] || (c[i] = []);
    c.push(h)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data.session, "ChangesVisitor"], 0));
(Ext.cmd.derive("Ext.data.session.ChildChangesVisitor", Ext.data.session.ChangesVisitor, {
  constructor: function() {
    this.seen = {};
    Ext.data.session.ChangesVisitor.prototype.constructor.apply(this,
      arguments)
  },
  setupOptions: function(a) {
    Ext.data.session.ChangesVisitor.prototype.setupOptions.call(this, a);
    a.serialize = false
  },
  onDirtyRecord: function(a) {
    if (Ext.data.session.ChangesVisitor.prototype.onDirtyRecord.apply(
        this, arguments) !== false) {
      if (!a.$source && (a.dropped || !a.phantom)) {
        this.readEntity(a)
      }
    }
  },
  readEntity: function(f) {
    var g = this,
      e = g.readKey,
      b = f.entityName,
      c = f.id,
      a = g.seen,
      h = b + c,
      i, d;
    if (a[h]) {
      return
    }
    a[h] = true;
    i = g.result || (g.result = {});
    d = i[b] || (i[b] = {});
    d = d[e] || (d[e] = []);
    d.push(Ext.apply({}, f.modified, f.data))
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data.session, "ChildChangesVisitor"], 0));
(Ext.cmd.derive("Ext.data.session.BatchVisitor", Ext.Base, {
  map: null,
  constructor: function(a) {
    this.batch = a
  },
  getBatch: function(f) {
    var g = this.map,
      d = this.batch,
      h, b, c, a, e;
    if (g) {
      if (!d) {
        d = new Ext.data.Batch()
      }
      for (c in g) {
        h = g[c];
        b = h.entity;
        e = b.getProxy();
        delete h.entity;
        for (a in h) {
          a = e.createOperation(a, {
            records: h[a]
          });
          a.entityType = b;
          d.add(a)
        }
      }
    }
    if (d && f !== false) {
      d.sort()
    }
    return d
  },
  onDirtyRecord: function(a) {
    var d = this,
      b = a.phantom ? "create" : (a.dropped ? "destroy" : "update"),
      c = a.$className,
      e = (d.map || (d.map = {})),
      f = (e[c] || (e[c] = {
        entity: a.self
      }));
    f = f[b] || (f[b] = []);
    f.push(a)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data.session, "BatchVisitor"], 0));
(Ext.cmd.derive("Ext.data.Session", Ext.Base, {
  isSession: true,
  config: {
    schema: "default",
    parent: null,
    autoDestroy: true,
    crudProperties: {
      create: "C",
      read: "R",
      update: "U",
      drop: "D"
    }
  },
  destroyed: false,
  crudOperations: [{
    type: "R",
    entityMethod: "readEntities"
  }, {
    type: "C",
    entityMethod: "createEntities"
  }, {
    type: "U",
    entityMethod: "updateEntities"
  }, {
    type: "D",
    entityMethod: "dropEntities"
  }],
  crudKeys: {
    C: 1,
    R: 1,
    U: 1,
    D: 1
  },
  constructor: function(a) {
    var b = this;
    b.data = {};
    b.matrices = {};
    b.identifierCache = {};
    b.recordCreator = b.recordCreator.bind(b);
    b.initConfig(a)
  },
  destroy: function() {
    var d = this,
      b = d.matrices,
      e = d.data,
      c, f, a, g;
    for (g in b) {
      b[g].destroy()
    }
    for (c in e) {
      f = e[c];
      for (g in f) {
        a = f[g].record;
        if (a) {
          a.$source = a.session = null
        }
      }
    }
    d.recordCreator = d.matrices = d.data = null;
    d.setSchema(null);
    d.callParent()
  },
  adopt: function(b) {
    var d = this,
      c = b.associations,
      a;
    if (b.session !== d) {
      b.session = d;
      d.add(b);
      if (c) {
        for (a in c) {
          c[a].adoptAssociated(b, d)
        }
      }
    }
  },
  commit: function() {
    var c = this.data,
      b, d, e, a;
    for (b in c) {
      d = c[b];
      for (e in d) {
        a = d[e].record;
        if (a) {
          a.commit()
        }
      }
    }
  },
  createRecord: function(b, c) {
    var d = b.$isClass ? b : this.getSchema().getEntity(b),
      a = this.getParent(),
      e;
    if (c && a) {
      e = d.getIdFromData(c);
      if (a.peekRecord(d, e)) {
        Ext.raise("A parent session already contains an entry for " + d.entityName +
          ": " + e)
      }
    }
    return new d(c, this)
  },
  getChanges: function() {
    var a = new Ext.data.session.ChangesVisitor(this);
    this.visitData(a);
    return a.result
  },
  getChangesForParent: function() {
    var a = new Ext.data.session.ChildChangesVisitor(this);
    this.visitData(a);
    return a.result
  },
  getRecord: function(d, h, b) {
    var e = this,
      a = e.peekRecord(d, h),
      g, c, f;
    if (!a) {
      g = d.$isClass ? d : e.getSchema().getEntity(d);
      c = e.getParent();
      if (c) {
        f = c.peekRecord(g, h)
      }
      if (f && !f.isLoading()) {
        a = f.copy(undefined, e);
        a.$source = f
      } else {
        a = g.createWithId(h, null, e);
        if (b !== false) {
          a.load(Ext.isObject(b) ? b : undefined)
        }
      }
    }
    return a
  },
  getSaveBatch: function(a) {
    var b = new Ext.data.session.BatchVisitor();
    this.visitData(b);
    return b.getBatch(a)
  },
  onInvalidAssociationEntity: function(a, b) {
    Ext.raise("Unable to read association entity: " + this.getModelIdentifier(
      a, b))
  },
  onInvalidEntityCreate: function(a, b) {
    Ext.raise("Cannot create, record already not exists: " + this.getModelIdentifier(
      a, b))
  },
  onInvalidEntityDrop: function(a, b) {
    Ext.raise("Cannot drop, record does not exist: " + this.getModelIdentifier(
      a, b))
  },
  onInvalidEntityRead: function(a, b) {
    Ext.raise("Cannot read, record already not exists: " + this.getModelIdentifier(
      a, b))
  },
  onInvalidEntityUpdate: function(a, c, b) {
    if (b) {
      Ext.raise("Cannot update, record dropped: " + this.getModelIdentifier(
        a, c))
    } else {
      Ext.raise("Cannot update, record does not exist: " + this.getModelIdentifier(
        a, c))
    }
  },
  peekRecord: function(e, h, a) {
    var g = e.$isClass ? e : this.getSchema().getEntity(e),
      c = g.entityName,
      f = this.data[c],
      b, d;
    f = f && f[h];
    b = f && f.record;
    if (!b && a) {
      d = this.getParent();
      b = d && d.peekRecord(e, h, a)
    }
    return b || null
  },
  save: function() {
    var a = new Ext.data.session.ChildChangesVisitor(this);
    this.visitData(a);
    this.getParent().update(a.result)
  },
  spawn: function() {
    return new this.self({
      schema: this.getSchema(),
      parent: this
    })
  },
  update: function(j) {
    var l = this,
      e = l.getSchema(),
      a = l.crudOperations,
      k = a.length,
      m = l.crudKeys,
      n, f, p, h, d, q, c, o, g, b;
    l.getSchema().processKeyChecks(true);
    for (n in j) {
      f = e.getEntity(n);
      p = j[n];
      for (h = 0; h < k; ++h) {
        d = a[h];
        q = p[d.type];
        if (q) {
          l[d.entityMethod](f, q)
        }
      }
    }
    for (n in j) {
      f = e.getEntity(n);
      c = f.associations;
      p = j[n];
      for (o in p) {
        if (m[o]) {
          continue
        }
        g = c[o];
        b = p[g.role];
        g.processUpdate(l, b)
      }
    }
  },
  privates: {
    add: function(b) {
      var e = this,
        f = b.id,
        d = e.getEntry(b.self, f),
        c, a;
      d.record = b;
      e.registerReferences(b);
      c = b.associations;
      for (a in c) {
        c[a].checkMembership(e, b)
      }
    },
    afterErase: function(a) {
      this.evict(a)
    },
    applySchema: function(a) {
      return Ext.data.schema.Schema.get(a)
    },
    createEntities: function(d, b) {
      var a = b.length,
        c, e, f, g;
      for (c = 0; c < a; ++c) {
        e = b[c];
        g = d.getIdFromData(e);
        f = this.peekRecord(d, g);
        if (!f) {
          f = this.createRecord(d, e)
        } else {
          this.onInvalidEntityCreate(d, g)
        }
        f.phantom = true
      }
    },
    dropEntities: function(e, d) {
      var b = d.length,
        c, f, g, a;
      if (b) {
        a = Ext.isObject(d[0])
      }
      for (c = 0; c < b; ++c) {
        g = d[c];
        if (a) {
          g = e.getIdFromData(g)
        }
        f = this.peekRecord(e, g);
        if (f) {
          f.drop()
        } else {
          this.onInvalidEntityDrop(e, g)
        }
      }
    },
    evict: function(a) {
      var b = a.entityName,
        d = this.data[b],
        e = a.id,
        c;
      if (d) {
        delete d[e]
      }
    },
    getEntityList: function(d, c) {
      var a = c.length,
        b, g, f, e;
      for (b = 0; b < a; ++b) {
        g = c[b];
        f = this.peekRecord(d, g);
        if (f) {
          c[b] = f
        } else {
          e = true;
          c[b] = null;
          this.onInvalidAssociationEntity(d, g)
        }
      }
      if (e) {
        c = Ext.Array.clean(c)
      }
      return c
    },
    getEntry: function(b, f) {
      if (b.isModel) {
        f = b.getId();
        b = b.self
      }
      var d = b.$isClass ? b : this.getSchema().getEntity(b),
        a = d.entityName,
        e = this.data,
        c;
      c = e[a] || (e[a] = {});
      c = c[f] || (c[f] = {});
      return c
    },
    getRefs: function(d, c, h) {
      var f = this.getEntry(d),
        e = f && f.refs && f.refs[c.role],
        g = h && this.getParent(),
        i, a, b;
      if (g) {
        i = g.getRefs(d, c);
        if (i) {
          for (a in i) {
            b = i[a];
            if ((!e || !e[a])) {
              this.getRecord(b.self, b.id)
            }
          }
          e = f && f.refs && f.refs[c.role]
        }
      }
      return e || null
    },
    getIdentifier: function(f) {
      var e = this.getParent(),
        a, c, d, b;
      if (e) {
        b = e.getIdentifier(f)
      } else {
        a = this.identifierCache;
        c = f.identifier;
        d = c.id || f.entityName;
        b = a[d];
        if (!b) {
          if (c.clone) {
            b = c.clone({
              cache: a
            })
          } else {
            b = c
          }
          a[d] = b
        }
      }
      return b
    },
    getMatrix: function(a, e) {
      var d = a.isManyToMany ? a.name : a,
        c = this.matrices,
        b;
      b = c[d];
      if (!b && !e) {
        b = c[d] = new Ext.data.matrix.Matrix(this, a)
      }
      return b || null
    },
    getMatrixSlice: function(d, c) {
      var a = this.getMatrix(d.association),
        b = a[d.side];
      return b.get(c)
    },
    getModelIdentifier: function(a, b) {
      return b + "@" + a.entityName
    },
    onIdChanged: function(e, l, h) {
      var q = this,
        i = e.entityName,
        m = e.id,
        s = q.data[i],
        b = s[l],
        p = e.associations,
        c = b.refs,
        a = q._setNoRefs,
        f, d, o, j, r, k, n, g;
      delete s[l];
      s[h] = b;
      for (k in p) {
        r = p[k];
        if (r.isMany) {
          g = r.getAssociatedItem(e);
          if (g) {
            o = g.matrix;
            if (o) {
              o.changeId(h)
            }
          }
        }
      }
      if (c) {
        for (k in c) {
          n = c[k];
          r = p[k];
          f = r.association;
          if (f.isManyToMany) {} else {
            d = f.field.name;
            for (j in n) {
              n[j].set(d, m, a)
            }
          }
        }
      }
      q.registerReferences(e, l)
    },
    processManyBlock: function(d, e, g, b) {
      var h = this,
        a, f, c, i;
      if (g) {
        for (a in g) {
          f = h.peekRecord(d, a);
          if (f) {
            c = h.getEntityList(e.cls, g[a]);
            i = e.getAssociatedItem(f);
            h[b](e, i, f, c)
          } else {
            h.onInvalidAssociationEntity(d, a)
          }
        }
      }
    },
    processManyCreate: function(d, c, a, b) {
      if (c) {
        c.add(b)
      } else {
        a[d.getterName](null, null, b)
      }
    },
    processManyDrop: function(d, c, a, b) {
      if (c) {
        c.remove(b)
      }
    },
    processManyRead: function(d, c, a, b) {
      if (c) {
        c.setRecords(b)
      } else {
        a[d.getterName](null, null, b)
      }
    },
    readEntities: function(d, b) {
      var a = b.length,
        c, e, f, g;
      for (c = 0; c < a; ++c) {
        e = b[c];
        g = d.getIdFromData(e);
        f = this.peekRecord(d, g);
        if (!f) {
          f = this.createRecord(d, e)
        } else {
          this.onInvalidEntityRead(d, g)
        }
        f.phantom = false
      }
    },
    recordCreator: function(c, d) {
      var b = this,
        e = d.getIdFromData(c),
        a = b.peekRecord(d, e, true);
      if (!a) {
        a = new d(c, b)
      } else {
        a = b.getRecord(d, e)
      }
      return a
    },
    registerReferences: function(h, c) {
      var l = h.entityName,
        b = h.id,
        a = h.data,
        g = c || c === 0,
        m, f, o, j, d, n, k, e;
      j = (n = h.references).length;
      for (f = 0; f < j; ++f) {
        d = n[f];
        o = a[d.name];
        if (o || o === 0) {
          d = d.reference;
          l = d.type;
          e = d.inverse.role;
          m = this.getEntry(d.cls, o);
          k = m.refs || (m.refs = {});
          k = k[e] || (k[e] = {});
          k[b] = h;
          if (g) {
            delete k[c]
          }
        }
      }
    },
    updateEntities: function(e, b) {
      var a = b.length,
        d, f, g, h, c;
      if (Ext.isArray(b)) {
        for (d = 0; d < a; ++d) {
          f = b[d];
          h = e.getIdFromData(f);
          g = this.peekRecord(e, h);
          if (g) {
            g.set(f)
          } else {
            this.onInvalidEntityUpdate(e, h)
          }
        }
      } else {
        for (h in b) {
          f = b[h];
          g = this.peekRecord(e, h);
          if (g && !g.dropped) {
            c = g.set(f)
          } else {
            this.onInvalidEntityUpdate(e, h, !!g)
          }
        }
      }
    },
    updateReference: function(f, h, c, a) {
      var d = h.reference,
        i = d.type,
        e = d.inverse.role,
        b = f.id,
        j, g;
      if (a || a === 0) {
        g = this.getEntry(i, a).refs[e];
        delete g[b]
      }
      if (c || c === 0) {
        j = this.getEntry(i, c);
        g = j.refs || (j.refs = {});
        g = g[e] || (g[e] = {});
        g[b] = f
      }
    },
    visitData: function(g) {
      var i = this,
        e = i.data,
        m = i.matrices,
        l, h, c, o, j, d, b, f, k, n, a;
      i.getSchema().processKeyChecks(true);
      for (b in e) {
        l = e[b];
        for (c in l) {
          f = l[c].record;
          if (f) {
            if (f.phantom || f.dirty || f.dropped) {
              if (g.onDirtyRecord) {
                g.onDirtyRecord(f)
              }
            } else {
              if (g.onCleanRecord) {
                g.onCleanRecord(f)
              }
            }
          }
        }
      }
      if (g.onMatrixChange) {
        for (b in m) {
          j = m[b].left;
          n = j.slices;
          h = j.role.association;
          for (c in n) {
            k = n[c];
            d = k.members;
            for (o in d) {
              a = (f = d[o])[2];
              if (a) {
                g.onMatrixChange(h, f[0], f[1], a)
              }
            }
          }
        }
      }
      return g
    },
    _setNoRefs: {
      refs: false
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data, "Session"], 0));
(Ext.cmd.derive("Ext.util.Schedulable", Ext.Base, {
  "abstract": true,
  isSchedulable: true,
  scheduled: false,
  constructor: function() {
    this.getScheduler().add(this)
  },
  destroy: function() {
    var b = this,
      a = b.getScheduler();
    if (a) {
      a.remove(b)
    }
    b.scheduler = null;
    b.schedule = b.react = Ext.emptyFn;
    b.callParent()
  },
  getFullName: function() {
    return this.name || this.id
  },
  privates: {
    getScheduler: function() {
      return this.scheduler
    },
    schedule: function() {
      var b = this,
        a;
      if (!b.scheduled) {
        a = b.getScheduler();
        if (a) {
          b.scheduled = true;
          if (b.onSchedule) {
            b.onSchedule()
          }
          a.scheduleItem(b)
        }
      }
    },
    unschedule: function() {
      var b = this,
        a;
      if (b.scheduled) {
        a = b.getScheduler();
        if (a) {
          a.unscheduleItem(b)
        }
        b.scheduled = false
      }
    },
    sort: function() {}
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "Schedulable"], 0));
(Ext.cmd.derive("Ext.app.bind.BaseBinding", Ext.util.Schedulable, {
  calls: 0,
  kind: 20,
  defaultOptions: {},
  lastValue: undefined,
  constructor: function(a, e, c, b) {
    var d = this;
    d.options = b;
    d.owner = a;
    d.scope = c;
    d.callback = e;
    d.lateBound = Ext.isString(e);
    if (b && b.deep) {
      d.deep = true
    }
    Ext.util.Schedulable.prototype.constructor.call(this)
  },
  destroy: function() {
    var b = this,
      a = b.owner;
    Ext.util.Schedulable.prototype.destroy.call(this);
    if (a) {
      a.onBindDestroy(b)
    }
    b.scope = b.callback = b.owner = null
  },
  isReadOnly: function() {
    return true
  },
  privates: {
    getScheduler: function() {
      var a = this.owner;
      return a && a.getScheduler()
    },
    getSession: function() {
      var a = this.owner;
      return a.isSession ? a : a.getSession()
    },
    notify: function(d) {
      var c = this,
        a = c.options || c.defaultOptions,
        b = c.lastValue;
      if (!c.calls || c.deep || b !== d || Ext.isArray(d)) {
        ++c.calls;
        c.lastValue = d;
        if (c.lateBound) {
          c.scope[c.callback](d, b, c)
        } else {
          c.callback.call(c.scope, d, b, c)
        }
        if (a.single) {
          c.destroy()
        }
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.bind, "BaseBinding"], 0));
(Ext.cmd.derive("Ext.app.bind.Binding", Ext.app.bind.BaseBinding, {
  constructor: function(d, e, b, a) {
    var c = this;
    Ext.app.bind.BaseBinding.prototype.constructor.call(this, d.owner, e,
      b, a);
    c.stub = d;
    c.depth = d.depth;
    if (!d.isLoading() && !d.scheduled) {
      c.schedule()
    }
  },
  destroy: function(c) {
    var a = this,
      b = a.stub;
    if (b && !c) {
      b.unbind(a);
      a.stub = null
    }
    Ext.app.bind.BaseBinding.prototype.destroy.call(this)
  },
  bindValidation: function(c, a) {
    var b = this.stub;
    return b && b.bindValidation(c, a)
  },
  bindValidationField: function(c, a) {
    var b = this.stub;
    return b && b.bindValidationField(c, a)
  },
  getFullName: function() {
    return this.fullName || (this.fullName = "@(" + this.stub.getFullName() +
      ")")
  },
  getValue: function() {
    var b = this,
      c = b.stub,
      a = c && c.getValue();
    if (b.transform) {
      a = b.transform(a)
    }
    return a
  },
  isLoading: function() {
    var a = this.stub;
    return a && a.isLoading()
  },
  isReadOnly: function() {
    var b = this.stub,
      a = this.options;
    if (!(a && a.twoWay === false)) {
      if (b) {
        return b.isReadOnly()
      }
    }
    return true
  },
  refresh: function() {},
  setValue: function(a) {
    this.stub.set(a)
  },
  privates: {
    getDataObject: function() {
      var a = this.stub;
      return a && a.getDataObject()
    },
    getRawValue: function() {
      var b = this,
        c = b.stub,
        a = c && c.getRawValue();
      if (b.transform) {
        a = b.transform(a)
      }
      return a
    },
    isDescendantOf: function(a) {
      var b = this.stub;
      return b ? (a === b) || b.isDescendantOf(a) : false
    },
    react: function() {
      this.notify(this.getValue())
    },
    schedule: function() {
      if (!this.stub.scheduled) {
        Ext.app.bind.BaseBinding.prototype.schedule.call(this)
      }
    },
    sort: function() {
      var a = this.stub;
      a.scheduler.sortItem(a)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.bind, "Binding"], 0));
(Ext.cmd.derive("Ext.app.bind.AbstractStub", Ext.util.Schedulable, {
  children: null,
  depth: 0,
  generation: 1,
  kind: 10,
  parent: null,
  constructor: function(a, b) {
    var c = this;
    c.owner = a;
    c.name = b;
    Ext.util.Schedulable.prototype.constructor.call(this)
  },
  destroy: function() {
    var e = this,
      d = e.children,
      f = e.bindings,
      a, c, b;
    if (f) {
      for (c = 0, a = f.length; c < a; ++c) {
        f[c].destroy(true)
      }
    }
    for (b in d) {
      d[b].destroy()
    }
    Ext.util.Schedulable.prototype.destroy.call(this);
    e.bindings = e.children = e.owner = null
  },
  add: function(b) {
    var a = this;
    (a.children || (a.children = {}))[b.name] = b;
    b.depth = a.depth + 1;
    b.parent = a
  },
  getChild: function(b) {
    var a = Ext.isString(b) ? b.split(".") : b;
    if (a && a.length) {
      return this.descend(a, 0)
    }
    return this
  },
  getFullName: function() {
    var d = this,
      a = d.fullName,
      c = d.parent,
      b;
    if (!a) {
      a = d.name || d.id;
      if (c && (b = c.getFullName())) {
        a = ((b.charAt(b.length - 1) !== ":") ? b + "." : b) + a
      }
      d.fullName = a
    }
    return a
  },
  getSession: function() {
    var a = this.owner;
    return a.isSession ? a : a.getSession()
  },
  bind: function(f, b, a) {
    var c = this,
      d = new Ext.app.bind.Binding(c, f, b, a),
      e = (c.bindings || (c.bindings = []));
    d.depth = c.depth;
    e.push(d);
    return d
  },
  getValue: function() {
    return this.isLoading() ? null : this.getRawValue()
  },
  graft: function(c) {
    var d = this,
      e = d.bindings,
      a = d.name,
      b;
    d.parent = d.bindings = null;
    d.destroy();
    c.depth = d.depth;
    c.bindings = e;
    c.generation = d.generation + 1;
    c.name = a;
    c.id = d.id;
    c.path = d.path;
    if (e) {
      for (b = e.length; b-- > 0;) {
        e[b].stub = c
      }
    }
    return c
  },
  isDescendantOf: function(b) {
    for (var a = this; a = a.parent;) {
      if (a === b) {
        return true
      }
    }
    return false
  },
  onSchedule: function() {
    for (var b, a, d, e, c = this.parent; c; c = c.parent) {
      e = c.bindings;
      if (e) {
        for (b = 0, a = e.length; b < a; ++b) {
          d = e[b];
          if (d.deep && !d.scheduled) {
            d.schedule()
          }
        }
      }
    }
  },
  react: function() {
    var d = this.bindings,
      c, b, a;
    if (d) {
      for (b = 0, a = d.length; b < a; ++b) {
        c = d[b];
        if (!c.scheduled) {
          c.schedule()
        }
      }
    }
  },
  unbind: function(a) {
    var b = this.bindings;
    if (b && b.length) {
      Ext.Array.remove(b, a)
    }
  },
  privates: {
    collect: function() {
      var c = this.children,
        f = this.bindings,
        a = 0,
        d = 0,
        e, b;
      if (c) {
        for (b in c) {
          e = c[b];
          d = e.collect();
          if (d === 0) {
            e.destroy();
            delete c[b]
          }
          a += d
        }
      }
      if (f) {
        a += f.length
      }
      return a
    },
    getScheduler: function() {
      var a = this.owner;
      return a && a.getScheduler()
    },
    sort: function() {
      var a = this.parent;
      if (a) {
        this.scheduler.sortItem(a)
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.bind, "AbstractStub"], 0));
(Ext.cmd.derive("Ext.app.bind.Stub", Ext.app.bind.AbstractStub, {
  isStub: true,
  dirty: true,
  formula: null,
  validationKey: "validation",
  statics: {
    trackHadValue: function(e, a, g, f) {
      var c = f && f.children,
        h, b, d;
      d = e !== undefined;
      if (!a.hadValue[g]) {
        a.hadValue[g] = d
      }
      if (f) {
        f.hadValue = d
      }
      if (e && (e.constructor === Object || e.isModel)) {
        if (e.isModel) {
          e = e.data
        }
        for (b in e) {
          Ext.app.bind.Stub.trackHadValue(e[b], a, g + "." + b, c && c[b])
        }
      }
    }
  },
  constructor: function(a, b, c) {
    var d = this,
      e = b;
    Ext.app.bind.AbstractStub.prototype.constructor.call(this, a, b);
    d.boundValue = null;
    if (c) {
      c.add(d);
      if (!c.isRootStub) {
        e = c.path + "." + b
      }
    }
    d.hadValue = a.hadValue[e];
    d.path = e
  },
  destroy: function() {
    var c = this,
      d = c.formula,
      a = c.parent,
      b = c.storeBinding;
    if (d) {
      d.destroy()
    }
    if (b) {
      b.destroy()
    }
    c.detachBound();
    c.parentValue = c.formula = c.storeBinding = null;
    Ext.app.bind.AbstractStub.prototype.destroy.call(this)
  },
  bindValidation: function(c, b) {
    var a = this.parent;
    return a && a.descend([this.validationKey, this.name]).bind(c, b)
  },
  bindValidationField: function(f, d) {
    var c = this.parent,
      b = this.name,
      e = typeof f === "string",
      a;
    if (c) {
      a = c.bind(function(g) {
        var h = null;
        if (g && g.isModel) {
          h = g.getField(b)
        }
        if (e) {
          d[f](h, null, this)
        } else {
          f.call(d, h, null, this)
        }
      })
    }
    return a || null
  },
  descend: function(f, c) {
    var e = this,
      d = e.children || (e.children = {}),
      g = c || 0,
      b = f[g++],
      a;
    if (!(a = d[b])) {
      a = new Ext.app.bind.Stub(e.owner, b, e)
    }
    if (g < f.length) {
      a = a.descend(f, g)
    }
    return a
  },
  getChildValue: function(a) {
    var d = this,
      c = d.name,
      b;
    if (!a && !Ext.isString(a)) {
      b = d.hadValue ? null : undefined
    } else {
      b = d.inspectValue(a);
      if (!b) {
        if (a.isEntity) {
          b = a.data[c]
        } else {
          b = a[c]
        }
      }
    }
    return b
  },
  getDataObject: function() {
    var f = this,
      b = f.parent.getDataObject(),
      d = f.name,
      c = b ? b[d] : null,
      e, a;
    if (!c && b && b.isEntity) {
      e = b.associations;
      if (e && d in e) {
        c = b[e[d].getterName]()
      }
    }
    if (!c || !(c.$className || Ext.isObject(c))) {
      b[d] = c = {};
      f.hadValue = f.owner.hadValue[f.path] = true;
      f.invalidate(true, true)
    }
    return c
  },
  getRawValue: function() {
    return this.getChildValue(this.getParentValue())
  },
  graft: function(e) {
    var f = this,
      d = f.parent,
      c = f.children,
      a = f.name,
      b;
    e.parent = d;
    e.children = c;
    if (d) {
      d.children[a] = e
    }
    if (c) {
      for (b in c) {
        c[b].parent = e
      }
    }
    f.children = null;
    return Ext.app.bind.AbstractStub.prototype.graft.call(this, e)
  },
  isLoading: function() {
    var d = this,
      c = d.parent,
      g = false,
      b, f, e, a;
    if (c && !(g = c.isLoading())) {
      f = d.getParentValue();
      e = d.inspectValue(f);
      if (e) {
        g = e.isLoading()
      } else {
        if (f && f.isModel) {
          b = f.associations;
          if (!(b && d.name in b)) {
            g = false;
            a = true
          }
        }
        if (!a) {
          g = !d.hadValue && d.getRawValue() === undefined
        }
      }
    }
    return g
  },
  invalidate: function(b, a) {
    var e = this,
      d = e.children,
      c;
    e.dirty = true;
    if (!a && !e.isLoading()) {
      if (!e.scheduled) {
        e.schedule()
      }
    }
    if (b && d) {
      for (c in d) {
        d[c].invalidate(b, a)
      }
    }
  },
  isReadOnly: function() {
    var a = this.formula;
    return !!(a && !a.set)
  },
  set: function(h) {
    var g = this,
      i = g.parent,
      a = g.name,
      e = g.formula,
      f, c, b, d;
    if (e && !e.settingValue && e.set) {
      e.setValue(h);
      return
    } else {
      if (g.isLinkStub) {
        d = g.getLinkFormulaStub();
        e = d ? d.formula : null;
        if (e) {
          e.setValue(h);
          return
        }
      }
    }
    f = i.getDataObject();
    if (f.isEntity) {
      c = f.associations;
      if (c && (a in c)) {
        b = c[a];
        f[b.setterName](h);
        g.invalidate(true)
      } else {
        f.set(a, h)
      }
    } else {
      if ((h && h.constructor === Object) || h !== f[a]) {
        if (!g.setByLink(h)) {
          if (h === undefined) {
            delete f[a]
          } else {
            f[a] = h;
            Ext.app.bind.Stub.trackHadValue(h, g.owner, g.path, g)
          }
          g.inspectValue(f);
          g.invalidate(true)
        }
      }
    }
  },
  onStoreLoad: function() {
    this.invalidate(true)
  },
  afterLoad: function(a) {
    this.invalidate(true)
  },
  afterCommit: function(a) {
    this.afterEdit(a, null)
  },
  afterEdit: function(g, e) {
    var c = this.children,
      h = e && e.length,
      d = g.associations,
      j, f, b, a;
    if (c) {
      if (h) {
        for (f = 0; f < h; ++f) {
          b = c[e[f]];
          if (b) {
            b.invalidate()
          }
        }
      } else {
        for (j in c) {
          if (!(d && j in d)) {
            c[j].invalidate()
          }
        }
      }
    }
    this.invalidate()
  },
  afterReject: function(a) {
    this.afterEdit(a, null)
  },
  setByLink: function(d) {
    var c = this,
      g = 0,
      a, b, f, e;
    for (e = c; e; e = e.parent) {
      if (e.isLinkStub) {
        b = e;
        if (g) {
          for (f = [], a = 0, e = c; e !== b; e = e.parent) {
            ++a;
            f[g - a] = e.name
          }
        }
        break
      }++g
    }
    if (!b || !(e = b.getTargetStub())) {
      return false
    }
    if (f) {
      e = e.descend(f)
    }
    e.set(d);
    return true
  },
  setFormula: function(c) {
    var a = this,
      b = a.formula;
    if (b) {
      b.destroy()
    }
    a.formula = new Ext.app.bind.Formula(a, c)
  },
  react: function() {
    var c = this,
      b = this.boundValue,
      a = c.children,
      d;
    if (b) {
      if (b.isValidation) {
        b.refresh();
        d = b.generation;
        if (c.lastValidationGeneration === d) {
          return
        }
        c.lastValidationGeneration = d
      } else {
        if (b.isModel) {
          if (a && a[c.validationKey]) {
            b.isValid()
          }
        } else {
          if (b.isStore) {
            if (b.isLoading() && !b.loadCount) {
              return
            }
          }
        }
      }
    }
    Ext.app.bind.AbstractStub.prototype.react.call(this)
  },
  privates: {
    collect: function() {
      var c = this,
        a = Ext.app.bind.AbstractStub.prototype.collect.call(this),
        b = c.storeBinding ? 1 : 0,
        d = c.formula ? 1 : 0;
      return a + b + d
    },
    getLinkFormulaStub: function() {
      var a = this;
      while (a.isLinkStub) {
        a = a.binding.stub
      }
      return a.formula ? a : null
    },
    getParentValue: function() {
      var a = this;
      if (a.dirty) {
        a.parentValue = a.parent.getValue();
        a.dirty = false
      }
      return a.parentValue
    },
    setStore: function(a) {
      this.storeBinding = a
    },
    inspectValue: function(g) {
      var h = this,
        a = h.name,
        e = h.boundValue,
        b = null,
        c, i, d, f;
      if (g && g.isEntity) {
        c = g.associations;
        if (c && (a in c)) {
          b = g[c[a].getterName]();
          if (b && b.isStore) {
            b.$associatedStore = true
          }
        } else {
          if (a === h.validationKey) {
            b = g.getValidation();
            h.lastValidationGeneration = null
          }
        }
      } else {
        if (g) {
          i = g[a];
          if (i && (i.isModel || i.isStore)) {
            b = i
          }
        }
      }
      d = e !== b;
      if (d) {
        if (e) {
          h.detachBound()
        }
        if (b) {
          if (b.isModel) {
            b.join(h)
          } else {
            f = b.associatedEntity;
            if (f && !f.phantom && !b.complete && !b.hasPendingLoad()) {
              b.load()
            }
            b.on("load", h.onStoreLoad, h, {
              single: true
            })
          }
        }
        h.boundValue = b
      }
      return b
    },
    detachBound: function() {
      var a = this,
        b = a.boundValue;
      if (b) {
        if (b.isModel) {
          b.unjoin(a)
        } else {
          b.un("load", a.onStoreLoad, a)
        }
      }
    },
    sort: function() {
      var c = this,
        d = c.formula,
        a = c.scheduler,
        b = c.storeBinding;
      Ext.app.bind.AbstractStub.prototype.sort.call(this);
      if (b) {
        a.sortItem(b)
      }
      if (d) {
        a.sortItem(d)
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.bind, "Stub"], 0));
(Ext.cmd.derive("Ext.app.bind.LinkStub", Ext.app.bind.Stub, {
  isLinkStub: true,
  binding: null,
  destroy: function() {
    var b = this,
      c = b.binding,
      a = b.owner;
    if (c) {
      b.binding = null;
      c.destroy();
      if (a) {
        delete a.linkData[b.name]
      }
    }
    b.target = null;
    Ext.app.bind.Stub.prototype.destroy.call(this)
  },
  getFullName: function() {
    var a = this;
    return a.fullName || (a.fullName = "(" + Ext.app.bind.Stub.prototype.getFullName
      .call(this) + " -> " + a.binding.getFullName() + ")")
  },
  getDataObject: function() {
    var a = this.binding;
    return a && a.getDataObject()
  },
  getRawValue: function() {
    var a = this.binding;
    return a && a.getRawValue()
  },
  getValue: function() {
    var a = this.binding;
    return a && a.getValue()
  },
  getTargetStub: function() {
    var a = this.binding;
    return a && a.stub
  },
  isLoading: function() {
    var a = this.binding;
    return a ? a.isLoading() : false
  },
  link: function(d, b) {
    var a = this,
      c = a.binding;
    if (c) {
      c.destroy()
    }
    b = a.target = b || a.owner;
    a.linkDescriptor = d;
    a.binding = b.bind(d, a.onChange, a);
    a.binding.deep = true
  },
  onChange: function() {
    this.invalidate(true)
  },
  react: function() {
    var b = this,
      a = b.owner.linkData;
    a[b.name] = b.getValue();
    Ext.app.bind.Stub.prototype.react.call(this)
  },
  privates: {
    collect: function() {
      var b = this,
        a = Ext.app.bind.Stub.prototype.collect.call(this),
        c = b.binding ? 1 : 0;
      return a + c
    },
    sort: function() {
      var a = this.binding;
      if (a) {
        this.scheduler.sortItem(a)
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.app.bind, "LinkStub"], 0));
(Ext.cmd.derive("Ext.app.bind.RootStub", Ext.app.bind.AbstractStub, {
  isRootStub: true,
  depth: 0,
  createRootChild: function(a, e) {
    var i = this,
      b = i.owner,
      f = b.getData(),
      c = i.children,
      h = c && c[a],
      g = h ? null : i,
      j, d;
    if (e || f.hasOwnProperty(a) || !(j = b.getParent())) {
      d = new Ext.app.bind.Stub(b, a, g)
    } else {
      d = new Ext.app.bind.LinkStub(b, a, h ? null : g);
      d.link("{" + a + "}", j)
    }
    if (h) {
      h.graft(d)
    }
    return d
  },
  createStubChild: function(a) {
    return this.createRootChild(a, true)
  },
  descend: function(f, c) {
    var e = this,
      d = e.children,
      g = c || 0,
      b = f[g++],
      a = (d && d[b]) || e.createRootChild(b);
    if (g < f.length) {
      a = a.descend(f, g)
    }
    return a
  },
  getFullName: function() {
    return this.fullName || (this.fullName = this.owner.id + ":")
  },
  getDataObject: function() {
    return this.owner.data
  },
  getRawValue: function() {
    return this.owner.data
  },
  getValue: function() {
    return this.owner.data
  },
  isDescendantOf: function() {
    return false
  },
  isLoading: function() {
    return false
  },
  set: function(g) {
    var f = this,
      b = f.children || (f.children = {}),
      a = f.owner,
      d = a.data,
      j = a.getParent(),
      e, c, i, h;
    for (h in g) {
      if ((i = g[h]) !== undefined) {
        if (!(c = b[h])) {
          c = new Ext.app.bind.Stub(a, h, f)
        } else {
          if (c.isLinkStub) {
            if (!c.getLinkFormulaStub()) {
              e = c;
              c = new Ext.app.bind.Stub(a, h);
              e.graft(c)
            }
          }
        }
        c.set(i)
      } else {
        if (d.hasOwnProperty(h)) {
          delete d[h];
          c = b[h];
          if (c && !c.isLinkStub && j) {
            c = f.createRootChild(h)
          }
          c.invalidate(true)
        }
      }
    }
  },
  schedule: Ext.emptyFn,
  unschedule: Ext.emptyFn
}, 0, 0, 0, 0, 0, 0, [Ext.app.bind, "RootStub"], 0));
(Ext.cmd.derive("Ext.app.bind.Multi", Ext.app.bind.BaseBinding, {
  isMultiBinding: true,
  missing: 1,
  deep: true,
  constructor: function(e, a, g, c, b) {
    var d = this,
      f = b && b.trackStatics;
    Ext.app.bind.BaseBinding.prototype.constructor.call(this, a, g, c, b);
    d.bindings = [];
    d.literal = e.$literal;
    if (e.constructor === Object) {
      if (f) {
        d.staticKeys = []
      }
      d.addObject(e, d.lastValue = {}, d.staticKeys)
    } else {
      d.addArray(e, d.lastValue = [])
    }
    if (!--d.missing && !d.scheduled) {
      d.schedule()
    }
  },
  destroy: function() {
    var a = this;
    a.bindings = Ext.destroy(a.bindings);
    Ext.app.bind.BaseBinding.prototype.destroy.call(this)
  },
  add: function(b, f, i) {
    var h = this,
      d = h.owner,
      c = h.bindings,
      a = h.literal ? (b.reference ? "bindEntity" : "bindExpression") :
      "bind",
      g, e;
    ++h.missing;
    g = d[a](b, function(j) {
      f[i] = j;
      if (g.calls === 1) {
        --h.missing
      }
      if (!h.missing && !h.scheduled) {
        h.schedule()
      }
    }, h, null);
    e = g.depth;
    if (!c.length || e < h.depth) {
      h.depth = e
    }
    c.push(g);
    return !this.isBindingStatic(g)
  },
  addArray: function(c, j) {
    var f = this,
      h = c.length,
      d = false,
      g, a, e;
    for (e = 0; e < h; ++e) {
      a = c[e];
      if (a && (a.reference || Ext.isString(a))) {
        g = f.add(a, j, e)
      } else {
        if (Ext.isArray(a)) {
          g = f.addArray(a, j[e] = [])
        } else {
          if (a && a.constructor === Object) {
            g = f.addObject(a, j[e] = {})
          } else {
            j[e] = a;
            g = false
          }
        }
      }
      d = d || g
    }
    return d
  },
  addObject: function(c, f, h) {
    var g = this,
      e = false,
      i, a, d;
    for (d in c) {
      a = c[d];
      if (a && (a.reference || Ext.isString(a))) {
        i = g.add(a, f, d)
      } else {
        if (Ext.isArray(a)) {
          i = g.addArray(a, f[d] = [])
        } else {
          if (a && a.constructor === Object) {
            i = g.addObject(a, f[d] = {})
          } else {
            f[d] = a;
            i = false
          }
        }
      }
      if (h && !i) {
        h.push(d)
      }
      e = e || i
    }
    return e
  },
  getFullName: function() {
    var c = this,
      d = c.fullName,
      e = c.bindings,
      b = e.length,
      a;
    if (!d) {
      d = "@[";
      for (a = 0; a < b; ++a) {
        if (a) {
          d += ","
        }
        d += e[a].getFullName()
      }
      d += "]";
      c.fullName = d
    }
    return d
  },
  getRawValue: function() {
    return this.lastValue
  },
  isDescendantOf: function() {
    return false
  },
  isLoading: function() {
    for (var b = this.bindings, a = b.length; a-- > 0;) {
      if (b[a].isLoading()) {
        return true
      }
    }
    return false
  },
  isBindingStatic: function(a) {
    return a.isTemplateBinding && a.isStatic
  },
  isStatic: function() {
    var d = this.bindings,
      a = d.length,
      b, c;
    for (b = 0; b < a; ++b) {
      c = d[b];
      if (!this.isBindingStatic(c)) {
        return false
      }
    }
    return true
  },
  pruneStaticKeys: function() {
    var d = Ext.apply({}, this.lastValue),
      c = this.staticKeys,
      a = c.length,
      b;
    for (b = 0; b < a; ++b) {
      delete d[c[b]]
    }
    return d
  },
  react: function() {
    this.notify(this.lastValue)
  },
  refresh: function() {},
  privates: {
    sort: function() {
      this.scheduler.sortItems(this.bindings)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.bind, "Multi"], 0));
(Ext.cmd.derive("Ext.app.bind.Formula", Ext.util.Schedulable, {
  statics: {
    getFormulaParser: function(b) {
      var a = this.formulaCache,
        d, c;
      if (!a) {
        a = this.formulaCache = new Ext.util.LruCache({
          maxSize: 20
        })
      }
      d = a.get(b);
      if (!d) {
        c = "[^\\.a-z0-9_]" + b + "\\(\\s*(['\"])(.*?)\\1\\s*\\)";
        d = new RegExp(c, "gi");
        a.add(b, d)
      }
      return d
    }
  },
  isFormula: true,
  calculation: null,
  explicit: false,
  set: null,
  single: false,
  argumentNamesRe: /^function\s*\(\s*([^,\)\s]+)/,
  constructor: function(g, h) {
    var f = this,
      b = g.owner,
      d, e, a, c;
    f.owner = b;
    f.stub = g;
    Ext.util.Schedulable.prototype.constructor.call(this);
    if (h instanceof Function) {
      f.get = a = h
    } else {
      f.get = a = h.get;
      f.set = h.set;
      e = h.bind;
      if (h.single) {
        f.single = h.single
      }
      if (e) {
        d = e.bindTo;
        if (d) {
          c = Ext.apply({}, e);
          delete c.bindTo;
          e = d
        }
      }
    }
    if (e) {
      f.explicit = true
    } else {
      e = a.$expressions || f.parseFormula(a)
    }
    f.binding = b.bind(e, f.onChange, f, c)
  },
  destroy: function() {
    var a = this,
      c = a.binding,
      b = a.stub;
    if (c) {
      c.destroy();
      a.binding = null
    }
    if (b) {
      b.formula = null
    }
    Ext.util.Schedulable.prototype.destroy.call(this);
    a.getterFn = a.owner = null
  },
  getFullName: function() {
    return this.fullName || (this.fullName = this.stub.getFullName() +
      "=" + Ext.util.Schedulable.prototype.getFullName.call(this) + ")"
    )
  },
  getRawValue: function() {
    return this.calculation
  },
  onChange: function() {
    if (!this.scheduled) {
      this.schedule()
    }
  },
  parseFormula: function(g) {
    var f = g.toString(),
      d = {
        $literal: true
      },
      c, b, a, e;
    c = this.argumentNamesRe.exec(f);
    b = c ? c[1] : "get";
    a = Ext.app.bind.Formula.getFormulaParser(b);
    while ((c = a.exec(f))) {
      e = c[2];
      d[e] = e
    }
    d.$literal = true;
    g.$expressions = d;
    return d
  },
  react: function() {
    var c = this,
      b = c.owner,
      d = c.binding.lastValue,
      e = c.getterFn,
      a;
    if (c.explicit) {
      a = d
    } else {
      a = b.getFormulaFn(d)
    }
    c.settingValue = true;
    c.stub.set(c.calculation = c.get.call(b, a));
    c.settingValue = false;
    if (c.single) {
      c.destroy()
    }
  },
  setValue: function(a) {
    this.set.call(this.stub.owner, a)
  },
  privates: {
    getScheduler: function() {
      var a = this.owner;
      return a && a.getScheduler()
    },
    sort: function() {
      var a = this,
        b = a.binding;
      if (!b.destroyed) {
        a.scheduler.sortItem(b)
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.bind, "Formula"], 0));
(Ext.cmd.derive("Ext.app.bind.Template", Ext.Base, {
  numberRe: /^(?:\d+(?:\.\d*)?)$/,
  stringRe: /^(?:["][^"]*["])$/,
  tokenRe: /\{[!]?(?:(?:(\d+)|([a-z_][\w\-\.]*))(?::([a-z_\.]+)(?:\(([^\)]*?)?\))?)?)\}/gi,
  formatRe: /^([a-z_]+)(?:\(([^\)]*?)?\))?$/i,
  buffer: null,
  slots: null,
  tokens: null,
  constructor: function(d) {
    var c = this,
      b = c._initters,
      a;
    c.text = d;
    for (a in b) {
      c[a] = b[a]
    }
  },
  _initters: {
    apply: function(a, b) {
      return this.parse().apply(a, b)
    },
    getTokens: function() {
      return this.parse().getTokens()
    }
  },
  apply: function(h, j) {
    var e = this,
      d = e.slots,
      b = e.buffer,
      a = d.length,
      c, g, f;
    for (c = 0; c < a; ++c) {
      g = d[c];
      if (g) {
        if ((f = h[g.pos]) == null) {
          f = ""
        }
        if (g.not) {
          f = !f
        }
        if (g.format) {
          f = g.format(f, j)
        }
        b[c] = f
      }
    }
    return b.join("")
  },
  getTokens: function() {
    return this.tokens
  },
  parse: function() {
    var k = this,
      p = k.text,
      e = [],
      h = [],
      j = [],
      o = {},
      n = 0,
      d = k.tokenRe,
      l = 0,
      b, f, a, g, q, m, c;
    for (f in k._initters) {
      delete k[f]
    }
    k.buffer = e;
    k.slots = h;
    k.tokens = j;
    while ((g = d.exec(p))) {
      a = g.index - n;
      if (a) {
        e[l++] = p.substring(n, n + a);
        n += a
      }
      n += (q = g[0]).length;
      m = {
        fmt: (b = g[3] || null),
        index: g[1] ? parseInt(g[1], 10) : null,
        not: q.charAt(1) === "!",
        token: g[2] || null
      };
      c = m.token || String(m.index);
      if (c in o) {
        m.pos = o[c]
      } else {
        o[c] = m.pos = j.length;
        j.push(c)
      }
      if (b) {
        if (b.substring(0, 5) === "this.") {
          m.fmt = b.substring(5)
        } else {
          m.scope = Ext.util.Format
        }
        k.parseArgs(g[4], m)
      }
      h[l++] = m
    }
    if (n < p.length) {
      e[l++] = p.substring(n)
    }
    return k
  },
  parseArgs: function(f, g) {
    var e = this,
      b = e.numberRe,
      h = e.stringRe,
      j, d, c, a;
    if (!f) {
      d = []
    } else {
      if (f.indexOf(",") < 0) {
        d = [f]
      } else {
        d = f.split(",")
      }
    }
    g = g || {};
    a = d.length;
    g.args = d;
    for (c = 0; c < a; ++c) {
      j = d[c];
      if (j === "true") {
        d[c] = true
      } else {
        if (j === "false") {
          d[c] = false
        } else {
          if (j === "null") {
            d[c] = null
          } else {
            if (b.test(j)) {
              d[c] = parseFloat(j)
            } else {
              if (h.test(j)) {
                d[c] = j.substring(1, j.length - 1)
              } else {
                g.fn = Ext.functionFactory("return [" + f + "];");
                g.format = e._formatEval;
                break
              }
            }
          }
        }
      }
    }
    if (!g.format) {
      d.unshift(0);
      g.format = e._formatArgs
    }
    return g
  },
  parseFormat: function(a) {
    var d = this,
      c = d.formatRe.exec(a),
      e = {
        fmt: a,
        scope: Ext.util.Format
      },
      b;
    b = c[2];
    if (b) {
      e.fmt = c[1];
      d.parseArgs(b, e)
    } else {
      e.args = [0];
      e.format = d._formatArgs
    }
    return e
  },
  _formatArgs: function(b, a) {
    a = this.scope || a;
    this.args[0] = b;
    return a[this.fmt].apply(a, this.args)
  },
  _formatEval: function(c, b) {
    var a = this.fn();
    a.unshift(c);
    b = this.scope || b;
    return b[this.fmt].apply(b, a)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.bind, "Template"], 0));
(Ext.cmd.derive("Ext.app.bind.TemplateBinding", Ext.app.bind.BaseBinding, {
  isTemplateBinding: true,
  lastValue: undefined,
  value: undefined,
  constructor: function(e, a, h, d, c) {
    var f = this,
      b = new Ext.app.bind.Template(e),
      g = b.getTokens();
    Ext.app.bind.BaseBinding.prototype.constructor.call(this, a, h, d, c);
    f.tpl = b;
    f.tokens = g;
    g.$literal = true;
    if (g.length) {
      f.multiBinding = new Ext.app.bind.Multi(g, a, f.onBindData, f)
    } else {
      f.isStatic = true;
      f.onData(b.text)
    }
  },
  destroy: function() {
    var a = this;
    Ext.destroy(a.multiBinding);
    a.tpl = a.multiBinding = null;
    Ext.app.bind.BaseBinding.prototype.destroy.call(this)
  },
  getFullName: function() {
    var a = this.multiBinding;
    return this.fullName || (this.fullName = "$" + (a ? a.getFullName() :
      Ext.app.bind.BaseBinding.prototype.getFullName.call(this)))
  },
  getRawValue: function() {
    return this.value
  },
  getTemplateScope: function() {
    return null
  },
  isDescendantOf: function() {
    return false
  },
  isLoading: function() {
    var a = this.multiBinding;
    return a ? a.isLoading() : false
  },
  onBindData: function(a) {
    this.onData(this.tpl.apply(a, this.getTemplateScope()))
  },
  onData: function(c) {
    var b = this,
      a = b.value;
    if (a !== (b.value = c)) {
      b.lastValue = a;
      b.schedule()
    }
  },
  react: function() {
    this.notify(this.value)
  },
  refresh: function() {
    var a = this.multiBinding;
    if (a) {
      a.refresh()
    }
  },
  privates: {
    sort: function() {
      var a = this.multiBinding;
      if (a) {
        this.scheduler.sortItem(a)
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.bind, "TemplateBinding"], 0));
(Ext.cmd.derive("Ext.data.ChainedStore", Ext.data.AbstractStore, {
  config: {
    source: null,
    remoteFilter: false,
    remoteSort: false
  },
  constructor: function() {
    Ext.data.AbstractStore.prototype.constructor.apply(this, arguments);
    this.getData().addObserver(this)
  },
  blockLoad: Ext.emptyFn,
  unblockLoad: Ext.emptyFn,
  remove: function() {
    var a = this.getSource();
    return a.remove.apply(a, arguments)
  },
  removeAll: function() {
    var a = this.getSource();
    return a.removeAll()
  },
  getData: function() {
    var a = this,
      b = a.data;
    if (!b) {
      a.data = b = a.constructDataCollection()
    }
    return b
  },
  getSession: function() {
    return this.getSource().getSession()
  },
  applySource: function(a) {
    if (a) {
      a = Ext.data.StoreManager.lookup(a)
    }
    return a
  },
  updateSource: function(d, b) {
    var a = this,
      c;
    if (b) {
      b.removeObserver(a)
    }
    if (d) {
      c = a.getData();
      c.setSource(d.getData());
      if (!a.isInitializing) {
        a.fireEvent("refresh", a);
        a.fireEvent("datachanged", a)
      }
      d.addObserver(a)
    }
  },
  getModel: function() {
    return this.getSource().getModel()
  },
  getProxy: function() {
    return null
  },
  onCollectionAdd: function(d, c) {
    var b = this,
      a = c.items,
      e = !c.next;
    if (b.ignoreCollectionAdd) {
      return
    }
    b.fireEvent("add", b, a, c.at);
    if (e) {
      b.fireEvent("datachanged", b)
    }
  },
  onCollectionItemChange: function(f, e) {
    var d = this,
      a = e.item,
      c = e.modified || null,
      b = e.meta;
    d.onUpdate(a, b, c, e);
    d.fireEvent("update", d, a, b, c, e)
  },
  onUpdate: Ext.emptyFn,
  onCollectionRemove: function(d, c) {
    var b = this,
      a = c.items,
      e = !c.next;
    if (b.ignoreCollectionRemove) {
      return
    }
    b.fireEvent("remove", b, a, c.at, false);
    if (e) {
      b.fireEvent("datachanged", b)
    }
  },
  onSourceBeforeLoad: function(b, a) {
    this.fireEvent("beforeload", this, a)
  },
  onSourceAfterLoad: function(c, b, d, a) {
    this.fireEvent("load", this, b, d, a)
  },
  onFilterEndUpdate: function() {
    Ext.data.AbstractStore.prototype.onFilterEndUpdate.apply(this,
      arguments);
    this.callObservers("Filter")
  },
  onSourceBeforePopulate: function() {
    this.ignoreCollectionAdd = true;
    this.callObservers("BeforePopulate")
  },
  onSourceAfterPopulate: function() {
    var a = this;
    a.ignoreCollectionAdd = false;
    a.fireEvent("datachanged", a);
    a.fireEvent("refresh", a);
    this.callObservers("AfterPopulate")
  },
  onSourceBeforeClear: function() {
    this.ignoreCollectionRemove = true;
    this.callObservers("BeforeClear")
  },
  onSourceAfterClear: function() {
    this.ignoreCollectionRemove = false;
    this.callObservers("AfterClear")
  },
  onSourceBeforeRemoveAll: function() {
    this.ignoreCollectionRemove = true;
    this.callObservers("BeforeRemoveAll")
  },
  onSourceAfterRemoveAll: function(c, a) {
    var b = this;
    b.ignoreCollectionRemove = false;
    if (!a) {
      b.fireEvent("clear", b);
      b.fireEvent("datachanged", b)
    }
    this.callObservers("AfterRemoveAll", [a])
  },
  onSourceFilter: function() {
    var a = this;
    a.fireEvent("refresh", a);
    a.fireEvent("datachanged", a)
  },
  hasPendingLoad: function() {
    return this.getSource().hasPendingLoad()
  },
  isLoaded: function() {
    return this.getSource().isLoaded()
  },
  isLoading: function() {
    return this.getSource().isLoading()
  },
  onDestroy: function() {
    var a = this;
    a.observers = null;
    a.setSource(null);
    a.getData().destroy(true);
    a.data = null
  },
  privates: {
    isMoving: function() {
      var a = this.getSource();
      return a.isMoving ? a.isMoving.apply(a, arguments) : false
    },
    loadsSynchronously: function() {
      return this.getSource().loadsSynchronously()
    }
  }
}, 1, 0, 0, 0, ["store.chained"], [
  [Ext.data.LocalStore.prototype.mixinId || Ext.data.LocalStore.$className,
    Ext.data.LocalStore
  ]
], [Ext.data, "ChainedStore"], 0));
(Ext.cmd.derive("Ext.app.ViewModel", Ext.Base, {
  isViewModel: true,
  factoryConfig: {
    name: "viewModel"
  },
  collectTimeout: 100,
  expressionRe: /^(?:\{[!]?(?:(\d+)|([a-z_][\w\-\.]*))\})$/i,
  $configStrict: false,
  config: {
    data: true,
    formulas: {
      $value: null,
      merge: function(d, a, c, b) {
        return this.mergeNew(d, a, c, b)
      }
    },
    links: null,
    parent: null,
    root: true,
    scheduler: null,
    schema: "default",
    session: null,
    stores: null,
    view: null
  },
  constructor: function(a) {
    this.hadValue = {};
    this.bindings = {};
    this.initConfig(a)
  },
  destroy: function() {
    var f = this,
      d = f._scheduler,
      j = f.storeInfo,
      h = f.getParent(),
      c = f.collectTask,
      b = f.children,
      a = f.bindings,
      i, g, e;
    f.destroying = true;
    if (c) {
      c.cancel();
      f.collectTask = null
    }
    if (b) {
      for (i in b) {
        b[i].destroy()
      }
    }
    if (j) {
      for (i in j) {
        g = j[i];
        e = g.autoDestroy;
        if (e || (!g.$wasInstance && e !== false)) {
          g.destroy()
        }
        Ext.destroy(g.$binding)
      }
    }
    if (h) {
      h.unregisterChild(f)
    }
    f.getRoot().destroy();
    for (i in a) {
      a[i].destroy()
    }
    if (d && d.$owner === f) {
      d.$owner = null;
      d.destroy()
    }
    f.hadValue = f.children = f.storeInfo = f._session = f._view = f._scheduler =
      f.bindings = f._root = f._parent = f.formulaFn = f.$formulaData =
      null;
    f.destroying = false;
    f.callParent()
  },
  bind: function(e, g, c, b) {
    var d = this,
      f, a;
    c = c || d;
    if (!b && e.bindTo !== undefined && !Ext.isString(e)) {
      b = e;
      e = b.bindTo
    }
    if (!Ext.isString(e)) {
      f = new Ext.app.bind.Multi(e, d, g, c, b);
      a = true
    } else {
      if (d.expressionRe.test(e)) {
        e = e.substring(1, e.length - 1);
        f = d.bindExpression(e, g, c, b)
      } else {
        f = new Ext.app.bind.TemplateBinding(e, d, g, c, b);
        a = true
      }
    }
    if (a) {
      d.bindings[f.id] = f
    }
    return f
  },
  getSession: function() {
    var b = this,
      c = b._session,
      a;
    if (!c && (a = b.getParent())) {
      b.setSession(c = a.getSession())
    }
    return c || null
  },
  getStore: function(b) {
    var c = this.storeInfo,
      a;
    if (c) {
      a = c[b]
    }
    return a || null
  },
  linkTo: function(i, d) {
    var h = this,
      c = h.getStub(i),
      f, a, b, g, e;
    if (d.isModel) {
      d = {
        type: d.entityName,
        id: d.id
      }
    }
    b = d.type || d.reference;
    f = d.create;
    if (b) {
      a = d.id;
      if (f) {
        a = undefined
      }
      e = h.getRecord(b, a);
      if (Ext.isObject(f)) {
        e.set(f);
        e.commit();
        e.phantom = true
      }
      c.set(e)
    } else {
      if (!c.isLinkStub) {
        g = new Ext.app.bind.LinkStub(h, c.name);
        c.graft(g);
        c = g
      }
      c.link(d)
    }
  },
  notify: function() {
    this.getScheduler().notify()
  },
  get: function(a) {
    return this.getStub(a).getValue()
  },
  set: function(e, b) {
    var a = this,
      d, c;
    a.getData();
    if (b === undefined && e && e.constructor === Object) {
      c = a.getRoot();
      b = e
    } else {
      if (e && e.indexOf(".") < 0) {
        d = {};
        d[e] = b;
        b = d;
        c = a.getRoot()
      } else {
        c = a.getStub(e)
      }
    }
    c.set(b)
  },
  privates: {
    registerChild: function(b) {
      var a = this.children;
      if (!a) {
        this.children = a = {}
      }
      a[b.getId()] = b
    },
    unregisterChild: function(b) {
      var a = this.children;
      if (!this.destroying && a) {
        delete a[b.getId()]
      }
    },
    getRecord: function(b, f) {
      var d = this.getSession(),
        e = b,
        c = f !== undefined,
        a;
      if (d) {
        if (c) {
          a = d.getRecord(b, f)
        } else {
          a = d.createRecord(b)
        }
      } else {
        if (!e.$isClass) {
          e = this.getSchema().getEntity(e)
        }
        if (c) {
          a = e.createWithId(f);
          a.load()
        } else {
          a = new e()
        }
      }
      return a
    },
    notFn: function(a) {
      return !a
    },
    bindExpression: function(b, f, g, i) {
      var a = b.charAt(0),
        d = (a === "!"),
        h = d ? b.substring(1) : b,
        c = this.getStub(h),
        e;
      e = c.bind(f, g, i);
      if (d) {
        e.transform = this.notFn
      }
      return e
    },
    applyScheduler: function(a) {
      if (a && !a.isInstance) {
        a = new Ext.util.Scheduler(a);
        a.$owner = this
      }
      return a
    },
    getScheduler: function() {
      var c = this,
        a = c._scheduler,
        b, d;
      if (!a) {
        if (!(b = c.getParent())) {
          a = new Ext.util.Scheduler({
            preSort: "kind,-depth"
          });
          a.$owner = c
        } else {
          a = b.getScheduler()
        }
        c.setScheduler(a)
      }
      return a
    },
    getStub: function(b) {
      var a = this.getRoot();
      return b ? a.getChild(b) : a
    },
    collect: function() {
      var c = this,
        b = c.getParent(),
        a = c.collectTask;
      if (b) {
        b.collect();
        return
      }
      if (!a) {
        a = c.collectTask = new Ext.util.DelayedTask(c.doCollect, c)
      }
      if (c.collectTimeout === 0) {
        c.doCollect()
      } else {
        a.delay(c.collectTimeout)
      }
    },
    doCollect: function() {
      var b = this.children,
        a;
      if (b) {
        for (a in b) {
          b[a].doCollect()
        }
      }
      this.getRoot().collect()
    },
    onBindDestroy: function(d, a) {
      var c = this,
        b;
      if (c.destroying) {
        return
      }
      if (!a) {
        delete c.bindings[d.id]
      }
      b = c.getParent();
      if (b) {
        b.onBindDestroy(d, true)
      } else {
        c.collect()
      }
    },
    applyData: function(c, e) {
      var d = this,
        a, b;
      d.getSession();
      if (!e) {
        b = d.getParent();
        d.linkData = a = b ? Ext.Object.chain(b.getData()) : {};
        d.data = d._data = Ext.Object.chain(a)
      }
      if (c && c.constructor === Object) {
        d.getRoot().set(c)
      }
    },
    applyParent: function(a) {
      if (a) {
        a.registerChild(this)
      }
      return a
    },
    applyStores: function(i) {
      var d = this,
        f = d.getRoot(),
        h, c, a, b, e, g;
      d.storeInfo = {};
      d.listenerScopeFn = function() {
        return d.getView().getInheritedConfig("defaultListenerScope")
      };
      for (h in i) {
        c = i[h];
        if (c.isStore) {
          c.$wasInstance = true;
          d.setupStore(c, h);
          continue
        } else {
          if (Ext.isString(c)) {
            c = {
              source: c
            }
          } else {
            c = Ext.apply({}, c)
          }
        }
        e = c.listeners;
        delete c.listeners;
        a = d.bind(c, d.onStoreBind, d, {
          trackStatics: true
        });
        if (a.isStatic()) {
          a.destroy();
          d.createStore(h, c, e)
        } else {
          a.$storeKey = h;
          a.$listeners = e;
          b = f.createStubChild(h);
          b.setStore(a)
        }
      }
    },
    onStoreBind: function(a, c, g) {
      var f = this.storeInfo,
        e = g.$storeKey,
        b = f[e],
        d;
      if (!b) {
        this.createStore(e, a, g.$listeners, g)
      } else {
        a = Ext.merge({}, g.pruneStaticKeys());
        d = a.proxy;
        delete a.type;
        delete a.model;
        delete a.fields;
        delete a.proxy;
        delete a.listeners;
        if (d) {
          delete d.reader;
          delete d.writer;
          b.getProxy().setConfig(d)
        }
        b.blockLoad();
        b.setConfig(a);
        b.unblockLoad(true)
      }
    },
    createStore: function(c, a, d, f) {
      var e = this.getSession(),
        b;
      a = Ext.apply({}, a);
      if (a.session) {
        a.session = e
      }
      if (a.source) {
        a.type = a.type || "chained"
      }
      a.listeners = d;
      b = Ext.Factory.store(a);
      b.$binding = f;
      this.setupStore(b, c)
    },
    setupStore: function(a, b) {
      a.resolveListenerScope = this.listenerScopeFn;
      this.storeInfo[b] = a;
      this.set(b, a)
    },
    applyFormulas: function(c) {
      var d = this,
        a = d.getRoot(),
        b, e;
      d.getData();
      for (b in c) {
        a.createStubChild(b);
        e = d.getStub(b);
        e.setFormula(c[b])
      }
      return c
    },
    applyLinks: function(a) {
      for (var b in a) {
        this.linkTo(b, a[b])
      }
    },
    applySchema: function(a) {
      return Ext.data.schema.Schema.get(a)
    },
    applyRoot: function() {
      var a = new Ext.app.bind.RootStub(this),
        b = this.getParent();
      if (b) {
        a.depth = b.getRoot().depth - 1000
      }
      return a
    },
    getFormulaFn: function(c) {
      var b = this,
        a = b.formulaFn;
      if (!a) {
        a = b.formulaFn = function(d) {
          return b.$formulaData[d]
        }
      }
      b.$formulaData = c;
      return a
    }
  }
}, 1, 0, 0, 0, ["viewmodel.default"], [
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ],
  [Ext.mixin.Identifiable.prototype.mixinId || Ext.mixin.Identifiable.$className,
    Ext.mixin.Identifiable
  ]
], [Ext.app, "ViewModel"], 0));
(Ext.cmd.derive("Ext.app.domain.Controller", Ext.app.EventDomain, {
  singleton: true,
  type: "controller",
  prefix: "controller.",
  idMatchRe: /^\#/,
  constructor: function() {
    var a = this;
    a.callParent();
    a.monitor(Ext.app.BaseController)
  },
  match: function(d, b) {
    var a = false,
      c = d.alias;
    if (b === "*") {
      a = true
    } else {
      if (b === "#") {
        a = !!d.isApplication
      } else {
        if (this.idMatchRe.test(b)) {
          a = d.getId() === b.substring(1)
        } else {
          if (c) {
            a = Ext.Array.indexOf(c, this.prefix + b) > -1
          }
        }
      }
    }
    return a
  }
}, 1, 0, 0, 0, 0, 0, [Ext.app.domain, "Controller"], 0));
(Ext.cmd.derive("Ext.data.PageMap", Ext.util.LruCache, {
  config: {
    store: null,
    pageSize: 0,
    rootProperty: ""
  },
  clear: function(a) {
    var b = this;
    b.pageMapGeneration = (b.pageMapGeneration || 0) + 1;
    b.indexMap = {};
    Ext.util.LruCache.prototype.clear.call(this, a)
  },
  forEach: function(k, m) {
    var g = this,
      d = Ext.Object.getKeys(g.map),
      a = d.length,
      h = g.getPageSize(),
      c, b, l, f, e;
    for (c = 0; c < a; c++) {
      d[c] = +d[c]
    }
    Ext.Array.sort(d, Ext.Array.numericSortFn);
    m = m || g;
    for (c = 0; c < a; c++) {
      l = d[c];
      f = g.getPage(l);
      e = f.length;
      for (b = 0; b < e; b++) {
        if (k.call(m, f[b], (l - 1) * h + b) === false) {
          return
        }
      }
    }
  },
  findBy: function(c, b) {
    var d = this,
      a = null;
    b = b || d;
    d.forEach(function(f, e) {
      if (c.call(b, f, e)) {
        a = f;
        return false
      }
    });
    return a
  },
  findIndexBy: function(c, b) {
    var d = this,
      a = -1;
    b = b || d;
    d.forEach(function(f, e) {
      if (c.call(b, f)) {
        a = e;
        return false
      }
    });
    return a
  },
  find: function(g, f, h, d, c, b) {
    if (Ext.isEmpty(f, false)) {
      return null
    }
    var e = Ext.String.createRegex(f, d, c, b),
      a = this.getRootProperty();
    return this.findBy(function(i) {
      return i && e.test((a ? i[a] : i)[g])
    }, null, h)
  },
  findIndex: function(g, f, h, d, c, b) {
    if (Ext.isEmpty(f, false)) {
      return null
    }
    var e = Ext.String.createRegex(f, d, c, b),
      a = this.getRootProperty();
    return this.findIndexBy(function(i) {
      return i && e.test((a ? i[a] : i)[g])
    }, null, h)
  },
  getPageFromRecordIndex: function(a) {
    return Math.floor(a / this.getPageSize()) + 1
  },
  addAll: function(a) {
    this.addPage(1, a)
  },
  addPage: function(l, a) {
    var j = this,
      k = j.getPageSize(),
      c = l + Math.floor((a.length - 1) / k),
      h = (l - 1) * k,
      f = j.indexMap,
      e, b, d, g;
    for (g = 0; l <= c; l++, g += k) {
      e = Ext.Array.slice(a, g, g + k);
      for (b = 0, d = e.length; b < d; b++) {
        f[e[b].internalId] = h++
      }
      j.add(l, e);
      j.fireEvent("pageadd", j, l, e)
    }
  },
  getCount: function() {
    var a = Ext.util.LruCache.prototype.getCount.call(this);
    if (a) {
      a = (a - 1) * this.getPageSize() + this.last.value.length
    }
    return a
  },
  getByInternalId: function(a) {
    var b = this.indexMap[a];
    if (b !== -1) {
      return this.getAt(b)
    }
  },
  indexOf: function(b) {
    var a = -1;
    if (b) {
      a = this.indexMap[b.internalId];
      if (a == null) {
        a = -1
      }
    }
    return a
  },
  insert: function() {},
  remove: function() {},
  removeAt: function() {},
  removeAtKey: function(f) {
    var e = this,
      c = e.getPage(f),
      b, d, a;
    if (c) {
      if (e.fireEvent("beforepageremove", e, f, c) !== false) {
        b = c.length;
        for (d = 0; d < b; d++) {
          delete e.indexMap[c[d].internalId]
        }
        a = Ext.util.LruCache.prototype.removeAtKey.apply(this, arguments);
        e.fireEvent("pageremove", e, f, c);
        c.length = 0
      }
    }
    return a
  },
  getPage: function(a) {
    return this.get(a)
  },
  hasRange: function(e, b) {
    var c = this,
      a = c.getPageFromRecordIndex(e),
      d = c.getPageFromRecordIndex(b);
    for (; a <= d; a++) {
      if (!c.hasPage(a)) {
        return false
      }
    }
    return (d - 1) * c._pageSize + c.getPage(d).length > b
  },
  hasPage: function(a) {
    return !!this.get(a)
  },
  peekPage: function(a) {
    return this.map[a]
  },
  getAt: function(a) {
    return this.getRange(a, a + 1)[0]
  },
  getRange: function(a, b) {
    b--;
    if (!this.hasRange(a, b)) {
      Ext.raise("PageMap asked for range which it does not have")
    }
    var g = this,
      d = Ext.Array,
      h = g.getPageSize(),
      k = g.getPageFromRecordIndex(a),
      e = g.getPageFromRecordIndex(b),
      c = (k - 1) * h,
      m = (e * h) - 1,
      i = k,
      n = [],
      l, f, j;
    for (; i <= e; i++) {
      if (i === k) {
        l = a - c;
        j = l > 0
      } else {
        l = 0;
        j = false
      }
      if (i === e) {
        f = h - (m - b);
        j = j || f < h
      }
      if (j) {
        d.push(n, d.slice(g.getPage(i), l, f))
      } else {
        d.push(n, g.getPage(i))
      }
    }
    return n
  },
  destroy: function() {
    Ext.util.LruCache.prototype.destroy.call(this);
    this.indexMap = {}
  }
}, 0, 0, 0, 0, 0, 0, [Ext.data, "PageMap"], 0));
(Ext.cmd.derive("Ext.data.BufferedStore", Ext.data.ProxyStore, {
  isBufferedStore: true,
  buffered: true,
  config: {
    data: 0,
    pageSize: 25,
    remoteSort: true,
    remoteFilter: true,
    sortOnLoad: false,
    purgePageCount: 5,
    trailingBufferZone: 25,
    leadingBufferZone: 200,
    defaultViewSize: 100,
    viewSize: 0,
    trackRemoved: false
  },
  applyData: function(b) {
    var a = this.data || (this.data = this.createDataCollection());
    return a
  },
  applyProxy: function(a) {
    a = Ext.data.ProxyStore.prototype.applyProxy.call(this, a);
    if (a && a.setEnablePaging) {
      a.setEnablePaging(true)
    }
    return a
  },
  createFiltersCollection: function() {
    return new Ext.util.FilterCollection()
  },
  createSortersCollection: function() {
    return new Ext.util.SorterCollection()
  },
  updateGroupField: function(b) {
    var a = this;
    if (a.isInitializing) {
      a.blockLoad()
    }
    a.group(b);
    if (a.isInitializing) {
      a.unblockLoad()
    }
  },
  getGrouper: function() {
    return this.grouper
  },
  isGrouped: function() {
    return !!this.grouper
  },
  createDataCollection: function() {
    var b = this,
      a = new Ext.data.PageMap({
        store: b,
        rootProperty: "data",
        pageSize: b.getPageSize(),
        maxSize: b.getPurgePageCount(),
        listeners: {
          clear: b.onPageMapClear,
          scope: b
        }
      });
    b.relayEvents(a, ["beforepageremove", "pageadd", "pageremove"]);
    b.pageRequests = {};
    return a
  },
  removeAll: function(a) {
    var b = this,
      c = b.getData();
    if (c) {
      if (a) {
        b.suspendEvent("clear")
      }
      c.clear();
      if (a) {
        b.resumeEvent("clear")
      }
    }
  },
  load: function(a) {
    var b = this;
    if (b.loading) {
      return
    }
    a = a || {};
    b.getData().clear();
    a.page = 1;
    a.start = 0;
    a.limit = b.getViewSize() || b.getDefaultViewSize();
    a.loadCallback = a.callback;
    delete a.callback;
    return b.loadToPrefetch(a)
  },
  reload: function(m) {
    var g = this,
      e = g.getData(),
      j = Number.MAX_VALUE,
      h, b, f, l, d, a, k, c;
    if (!m) {
      m = {}
    }
    if (g.loading || g.fireEvent("beforeload", g, m) === false) {
      return
    }
    a = function() {
      var n = g.totalCount,
        i = b - h;
      if (b >= n) {
        b = n - 1;
        h = Math.max(b - i, 0)
      }
      if (g.rangeCached(h, Math.min(b, g.totalCount))) {
        g.loading = false;
        e.un("pageadd", a);
        c = e.getRange(h, b + 1);
        g.fireEvent("load", g, c, true);
        g.fireEvent("refresh", g)
      }
    };
    k = Math.ceil((g.getLeadingBufferZone() + g.getTrailingBufferZone()) /
      2);
    if (g.lastRequestStart && g.preserveScrollOnReload) {
      h = g.lastRequestStart;
      b = g.lastRequestEnd;
      j = g.getTotalCount()
    } else {
      h = m.start || 0;
      b = h + (m.count || g.getPageSize()) - 1
    }
    e.clear(true);
    delete g.totalCount;
    h = Math.max(h - k, 0);
    b = Math.min(b + k, j);
    f = g.getPageFromRecordIndex(h);
    l = g.getPageFromRecordIndex(b);
    g.loading = true;
    m.waitForReload = a;
    e.on("pageadd", a);
    for (d = f; d <= l; d++) {
      g.prefetchPage(d, m)
    }
  },
  filter: function() {
    Ext.data.ProxyStore.prototype.filter.apply(this, arguments)
  },
  filterBy: function(b, a) {},
  loadData: function(b, a) {},
  loadPage: function(c, a) {
    var b = this;
    a = a || {};
    a.page = b.currentPage = c;
    a.start = (c - 1) * b.getPageSize();
    a.limit = b.getViewSize() || b.getDefaultViewSize();
    a.loadCallback = a.callback;
    delete a.callback;
    return b.loadToPrefetch(a)
  },
  clearData: function(c) {
    var a = this,
      b = a.getData();
    if (b) {
      b.clear()
    }
  },
  getCount: function() {
    return this.totalCount || 0
  },
  getRange: function(d, g, l) {
    var k = this,
      e = k.totalCount - 1,
      f = k.lastRequestStart,
      m = [],
      h = k.getData(),
      c, j, b, a, i;
    l = Ext.apply({
      prefetchStart: d,
      prefetchEnd: g
    }, l);
    g = (g >= k.totalCount) ? e : g;
    j = d === 0 ? 0 : d - 1;
    b = g === e ? g : g + 1;
    k.lastRequestStart = d;
    k.lastRequestEnd = g;
    if (k.rangeCached(j, b)) {
      k.onRangeAvailable(l);
      m = h.getRange(d, g + 1)
    } else {
      k.fireEvent("cachemiss", k, d, g);
      a = k.getPageFromRecordIndex(j);
      i = k.getPageFromRecordIndex(b);
      c = function(n, p, o) {
        if (p >= a && p <= i && k.rangeCached(j, b)) {
          k.fireEvent("cachefilled", k, d, g);
          h.un("pageadd", c);
          k.onRangeAvailable(l)
        }
      };
      h.on("pageadd", c);
      k.prefetchRange(d, g)
    }
    k.primeCache(d, g, d < f ? -1 : 1);
    return m
  },
  getById: function(b) {
    var a = this.data.findBy(function(c) {
      return c.getId() === b
    });
    return a
  },
  getAt: function(a) {
    var b = this.getData();
    if (b.hasRange(a, a)) {
      return b.getAt(a)
    }
  },
  getByInternalId: function(a) {
    return this.data.getByInternalId(a)
  },
  indexOf: function(a) {
    return this.getData().indexOf(a)
  },
  indexOfId: function(a) {
    return this.indexOf(this.getById(a))
  },
  group: function(b, d) {
    var c = this,
      a;
    if (b && typeof b === "string") {
      a = c.grouper;
      if (!a) {
        c.grouper = new Ext.util.Grouper({
          property: b,
          direction: d || "ASC",
          root: "data"
        })
      } else {
        if (d === undefined) {
          a.toggle()
        } else {
          a.setDirection(d)
        }
      }
    } else {
      c.grouper = b ? c.getSorters().decodeSorter(b, "Ext.util.Grouper") :
        null
    }
    if (c.isLoadBlocked()) {
      return
    }
    c.getData().clear();
    c.loadPage(1, {
      callback: function() {
        c.fireEvent("groupchange", c, c.getGrouper())
      }
    })
  },
  getPageFromRecordIndex: function(a) {
    return Math.floor(a / this.getPageSize()) + 1
  },
  calculatePageCacheSize: function(a) {
    var c = this,
      b = c.getPurgePageCount();
    return b ? Math.max(c.getData().getMaxSize() || 0, Math.ceil((a + c.getTrailingBufferZone() +
      c.getLeadingBufferZone()) / c.getPageSize()) * 2 + b) : 0
  },
  loadToPrefetch: function(r) {
    var l = this,
      c = r,
      g, b, n, m = r.start,
      a = r.start + r.limit - 1,
      q = (l.getViewSize() || r.limit),
      h = Math.min(a, r.start + q - 1),
      j = l.getPageFromRecordIndex(Math.max(m - l.getTrailingBufferZone(),
        0)),
      p = l.getPageFromRecordIndex(a + l.getLeadingBufferZone()),
      f = l.getData(),
      k = function() {
        b = b || [];
        if (r.loadCallback) {
          r.loadCallback.call(r.scope || l, b, e, true)
        }
        if (r.callback) {
          r.callback.call(r.scope || l, b, m || 0, a || 0, r)
        }
      },
      o = function() {
        l.fireEvent("datachanged", l);
        l.fireEvent("refresh", l);
        l.fireEvent("load", l, b, true)
      },
      d = function() {
        if (l.rangeCached(m, h)) {
          l.loading = false;
          b = f.getRange(m, h + 1);
          f.un("pageadd", d);
          if (l.hasListeners.guaranteedrange) {
            l.guaranteeRange(m, h, r.callback, r.scope)
          }
          k();
          o()
        }
      },
      e;
    f.setMaxSize(l.calculatePageCacheSize(q));
    if (l.fireEvent("beforeload", l, r) !== false) {
      delete l.totalCount;
      l.loading = true;
      if (r.callback) {
        c = Ext.apply({}, r);
        delete c.callback
      }
      l.on("prefetch", function(s, i, u, t) {
        e = t;
        if (u) {
          if ((n = l.getTotalCount())) {
            f.on("pageadd", d);
            h = Math.min(h, n - 1);
            p = l.getPageFromRecordIndex(Math.min(h + l.getLeadingBufferZone(),
              n - 1));
            for (g = j + 1; g <= p; ++g) {
              l.prefetchPage(g, c)
            }
          } else {
            k();
            o()
          }
        } else {
          l.loading = false;
          k();
          l.fireEvent("load", l, i, false)
        }
      }, null, {
        single: true
      });
      l.prefetchPage(j, c)
    }
  },
  prefetch: function(d) {
    var e = this,
      b = e.getPageSize(),
      f = e.getData(),
      c, a;
    if (b) {
      if (e.lastPageSize && b != e.lastPageSize) {
        Ext.raise("pageSize cannot be dynamically altered")
      }
      if (!f.getPageSize()) {
        f.setPageSize(b)
      }
    } else {
      e.pageSize = f.setPageSize(b = d.limit)
    }
    e.lastPageSize = b;
    if (!d.page) {
      d.page = e.getPageFromRecordIndex(d.start);
      d.start = (d.page - 1) * b;
      d.limit = Math.ceil(d.limit / b) * b
    }
    a = e.pageRequests[d.page];
    if (!a || a.getOperation().pageMapGeneration !== f.pageMapGeneration) {
      d = Ext.apply({
        action: "read",
        filters: e.getFilters().items,
        sorters: e.getSorters().items,
        grouper: e.getGrouper(),
        internalCallback: e.onProxyPrefetch,
        internalScope: e
      }, d);
      c = e.createOperation("read", d);
      c.pageMapGeneration = f.pageMapGeneration;
      if (e.fireEvent("beforeprefetch", e, c) !== false) {
        e.pageRequests[d.page] = c.execute();
        if (e.getProxy().isSynchronous) {
          delete e.pageRequests[d.page]
        }
      }
    }
    return e
  },
  onPageMapClear: function() {
    var c = this,
      b = c.wasLoading,
      a = c.pageRequests,
      e = c.getData(),
      d;
    e.clearListeners();
    e.on("clear", c.onPageMapClear, c);
    c.relayEvents(e, ["beforepageremove", "pageadd", "pageremove"]);
    c.loading = true;
    c.totalCount = 0;
    for (d in a) {
      if (a.hasOwnProperty(d)) {
        a[d].getOperation().abort()
      }
    }
    c.fireEvent("clear", c);
    c.loading = b
  },
  prefetchPage: function(e, b) {
    var d = this,
      a = d.getPageSize(),
      f = (e - 1) * a,
      c = d.totalCount;
    if (c !== undefined && d.data.getCount() === c) {
      return
    }
    d.prefetch(Ext.applyIf({
      page: e,
      start: f,
      limit: a
    }, b))
  },
  onProxyPrefetch: function(d) {
    if (this.destroyed) {
      return
    }
    var h = this,
      i = d.getResultSet(),
      c = d.getRecords(),
      f = d.wasSuccessful(),
      g = d.getPage(),
      b = d.waitForReload,
      k = h.totalCount,
      a = h.pageRequests,
      j, e;
    if (d.pageMapGeneration === h.getData().pageMapGeneration) {
      if (i) {
        h.totalCount = i.getTotal();
        if (h.totalCount !== k) {
          h.fireEvent("totalcountchange", h.totalCount)
        }
      }
      if (g !== undefined) {
        delete h.pageRequests[g]
      }
      h.loading = false;
      h.fireEvent("prefetch", h, c, f, d);
      if (f) {
        if (h.totalCount === 0) {
          if (b) {
            for (j in a) {
              e = a[j].getOperation();
              if (e.waitForReload === b) {
                delete e.waitForReload
              }
            }
            h.getData().un("pageadd", b);
            h.fireEvent("load", h, [], true);
            h.fireEvent("refresh", h)
          }
        } else {
          h.cachePage(c, d.getPage())
        }
      }
      Ext.callback(d.getCallback(), d.getScope() || h, [c, d, f])
    }
  },
  cachePage: function(b, e) {
    var d = this,
      a = b.length,
      c;
    if (!Ext.isDefined(d.totalCount)) {
      d.totalCount = b.length;
      d.fireEvent("totalcountchange", d.totalCount)
    }
    for (c = 0; c < a; c++) {
      b[c].join(d)
    }
    d.getData().addPage(e, b)
  },
  rangeCached: function(b, a) {
    return this.getData().hasRange(b, a)
  },
  pageCached: function(a) {
    return this.getData().hasPage(a)
  },
  pagePending: function(a) {
    return !!this.pageRequests[a]
  },
  rangeSatisfied: function(b, a) {
    return this.rangeCached(b, a)
  },
  onRangeAvailable: function(d) {
    var e = this,
      b = e.getTotalCount(),
      f = d.prefetchStart,
      a = (d.prefetchEnd > b - 1) ? b - 1 : d.prefetchEnd,
      c;
    a = Math.max(0, a);
    c = e.getData().getRange(f, a + 1);
    if (d.fireEvent !== false) {
      e.fireEvent("guaranteedrange", c, f, a, d)
    }
    if (d.callback) {
      d.callback.call(d.scope || e, c, f, a, d)
    }
  },
  guaranteeRange: function(e, a, d, c, b) {
    b = Ext.apply({
      callback: d,
      scope: c
    }, b);
    this.getRange(e, a + 1, b)
  },
  prefetchRange: function(g, b) {
    var d = this,
      c, a, f, e = d.getData();
    if (!d.rangeCached(g, b)) {
      c = d.getPageFromRecordIndex(g);
      a = d.getPageFromRecordIndex(b);
      e.setMaxSize(d.calculatePageCacheSize(b - g + 1));
      for (f = c; f <= a; f++) {
        if (!d.pageCached(f)) {
          d.prefetchPage(f)
        }
      }
    }
  },
  primeCache: function(h, c, g) {
    var f = this,
      e = f.getLeadingBufferZone(),
      d = f.getTrailingBufferZone(),
      b = f.getPageSize(),
      a = f.totalCount;
    if (g === -1) {
      h = Math.max(h - e, 0);
      c = Math.min(c + d, a - 1)
    } else {
      if (g === 1) {
        h = Math.max(Math.min(h - d, a - b), 0);
        c = Math.min(c + e, a - 1)
      } else {
        h = Math.min(Math.max(Math.floor(h - ((e + d) / 2)), 0), a - f.pageSize);
        c = Math.min(Math.max(Math.ceil(c + ((e + d) / 2)), 0), a - 1)
      }
    }
    f.prefetchRange(h, c)
  },
  sort: function(b, a, c) {
    if (arguments.length === 0) {
      this.clearAndLoad()
    } else {
      this.getSorters().addSort(b, a, c)
    }
  },
  onSorterEndUpdate: function() {
    var a = this,
      b = a.getSorters().getRange();
    if (b.length) {
      a.clearAndLoad({
        callback: function() {
          a.fireEvent("sort", a, b)
        }
      })
    } else {
      a.fireEvent("sort", a, b)
    }
  },
  clearAndLoad: function(a) {
    if (this.isLoadBlocked()) {
      return
    }
    this.getData().clear();
    this.loadPage(1, a)
  },
  privates: {
    isLast: function(a) {
      return this.indexOf(a) === this.getTotalCount() - 1
    },
    isMoving: function() {
      return false
    }
  }
}, 0, 0, 0, 0, ["store.buffered"], 0, [Ext.data, "BufferedStore"], 0));
(Ext.cmd.derive("Ext.mixin.Queryable", Ext.Base, {
  mixinId: "queryable",
  isQueryable: true,
  query: function(a) {
    a = a || "*";
    return Ext.ComponentQuery.query(a, this.getQueryRoot())
  },
  queryBy: function(f, e) {
    var c = [],
      b = this.getQueryRoot().getRefItems(true),
      d = 0,
      a = b.length,
      g;
    for (; d < a; ++d) {
      g = b[d];
      if (f.call(e || g, g) !== false) {
        c.push(g)
      }
    }
    return c
  },
  queryById: function(a) {
    return this.down(Ext.makeIdSelector(a))
  },
  child: function(a) {
    var b = this.getQueryRoot().getRefItems();
    if (a && a.isComponent) {
      return this.matchById(b, a.getItemId())
    }
    if (a) {
      b = Ext.ComponentQuery.query(a, b)
    }
    if (b.length) {
      return b[0]
    }
    return null
  },
  down: function(a) {
    if (a && a.isComponent) {
      return this.matchById(this.getRefItems(true), a.getItemId())
    }
    a = a || "";
    return this.query(a)[0] || null
  },
  visitPreOrder: function(a, d, c, b) {
    Ext.ComponentQuery._visit(true, a, this.getQueryRoot(), d, c, b)
  },
  visitPostOrder: function(a, d, c, b) {
    Ext.ComponentQuery._visit(false, a, this.getQueryRoot(), d, c, b)
  },
  getRefItems: function() {
    return []
  },
  getQueryRoot: function() {
    return this
  },
  privates: {
    matchById: function(b, e) {
      var a = b.length,
        c, d;
      for (c = 0; c < a; ++c) {
        d = b[c];
        if (d.getItemId() === e) {
          return d
        }
      }
      return null
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.mixin, "Queryable"], 0));
(Ext.cmd.derive("Ext.data.Request", Ext.Base, {
  config: {
    action: undefined,
    params: undefined,
    method: "GET",
    url: null,
    operation: null,
    proxy: null,
    disableCaching: false,
    headers: {},
    callbackKey: null,
    rawRequest: null,
    jsonData: undefined,
    xmlData: undefined,
    withCredentials: false,
    username: null,
    password: null,
    binary: false,
    callback: null,
    scope: null,
    timeout: 30000,
    records: null,
    directFn: null,
    args: null,
    useDefaultXhrHeader: null
  },
  constructor: function(a) {
    this.initConfig(a)
  },
  getParam: function(a) {
    var c = this.getParams(),
      b;
    if (c) {
      return c[a]
    }
    return b
  },
  setParam: function(a, b) {
    var c = this.getParams() || {};
    c[a] = b;
    this.setParams(c)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.data, "Request"], 0));
(Ext.cmd.derive("Ext.data.Validation", Ext.data.Model, {
  isValidation: true,
  syncGeneration: 0,
  attach: function(a) {
    this.record = a;
    delete this.data.id
  },
  getValidation: function() {
    return null
  },
  isValid: function() {
    var a = this;
    if (a.syncGeneration !== a.record.generation) {
      a.refresh()
    }
    return !a.dirty
  },
  refresh: function(b) {
    var t = this,
      u = t.data,
      d = t.record,
      k = d.fields,
      n = d.generation,
      s = d.data,
      h = d.validationSeparator,
      c = null,
      e, g, l, a, q, o, m, r, p, f, w, v;
    if (b || t.syncGeneration !== n) {
      t.syncGeneration = n;
      for (o = 0, p = k.length; o < p; ++o) {
        a = k[o];
        v = a.name;
        w = s[v];
        e = a.defaultInvalidMessage;
        l = 0;
        if (!(v in u)) {
          u[v] = g = true
        } else {
          g = u[v]
        }
        if (a.validate !== Ext.emptyFn) {
          f = a.validate(w, h);
          if (f !== true) {
            l = f || e
          }
        }
        if (!l) {
          l = true
        }
        if (l !== g) {
          (c || (c = {}))[v] = l
        }
      }
      if (c) {
        t.set(c)
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.data, "Validation"], 0));
(Ext.cmd.derive("Ext.dom.Helper", Ext.Base, function() {
  var a = "afterbegin",
    f = "afterend",
    g = "beforebegin",
    d = "beforeend",
    h = ["BeforeBegin", "previousSibling"],
    e = ["AfterEnd", "nextSibling"],
    c = {
      beforebegin: h,
      afterend: e
    },
    b = {
      beforebegin: h,
      afterend: e,
      afterbegin: ["AfterBegin", "firstChild"],
      beforeend: ["BeforeEnd", "lastChild"]
    };
  return {
    singleton: true,
    alternateClassName: ["Ext.DomHelper", "Ext.core.DomHelper"],
    emptyTags: /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
    confRe: /^(?:tag|children|cn|html|tpl|tplData)$/i,
    endRe: /end/i,
    attributeTransform: {
      cls: "class",
      htmlFor: "for"
    },
    closeTags: {},
    detachedDiv: document.createElement("div"),
    decamelizeName: function() {
      var k = /([a-z])([A-Z])/g,
        j = {};

      function i(l, n, m) {
        return n + "-" + m.toLowerCase()
      }
      return function(l) {
        return j[l] || (j[l] = l.replace(k, i))
      }
    }(),
    generateMarkup: function(q, k) {
      var p = this,
        o = typeof q,
        n, j, r, m, l;
      if (o === "string" || o === "number") {
        k.push(q)
      } else {
        if (Ext.isArray(q)) {
          for (m = 0; m < q.length; m++) {
            if (q[m]) {
              p.generateMarkup(q[m], k)
            }
          }
        } else {
          r = q.tag || "div";
          k.push("<", r);
          for (n in q) {
            if (q.hasOwnProperty(n)) {
              j = q[n];
              if (j !== undefined && !p.confRe.test(n)) {
                if (typeof j === "object") {
                  k.push(" ", n, '="');
                  p.generateStyles(j, k, true).push('"')
                } else {
                  k.push(" ", p.attributeTransform[n] || n, '="', j, '"')
                }
              }
            }
          }
          if (p.emptyTags.test(r)) {
            k.push("/>")
          } else {
            k.push(">");
            if ((j = q.tpl)) {
              j.applyOut(q.tplData, k)
            }
            if ((j = q.html)) {
              k.push(j)
            }
            if ((j = q.cn || q.children)) {
              p.generateMarkup(j, k)
            }
            l = p.closeTags;
            k.push(l[r] || (l[r] = "</" + r + ">"))
          }
        }
      }
      return k
    },
    generateStyles: function(m, j, l) {
      var i = j || [],
        k, n;
      for (k in m) {
        if (m.hasOwnProperty(k)) {
          n = m[k];
          k = this.decamelizeName(k);
          if (l && Ext.String.hasHtmlCharacters(n)) {
            n = Ext.String.htmlEncode(n)
          }
          i.push(k, ":", n, ";")
        }
      }
      return j || i.join("")
    },
    markup: function(i) {
      if (typeof i === "string") {
        return i
      }
      var j = this.generateMarkup(i, []);
      return j.join("")
    },
    applyStyles: function(i, j) {
      Ext.fly(i).applyStyles(j)
    },
    createContextualFragment: function(j) {
      var m = this.detachedDiv,
        i = document.createDocumentFragment(),
        k, l;
      m.innerHTML = j;
      l = m.childNodes;
      k = l.length;
      while (k--) {
        i.appendChild(l[0])
      }
      return i
    },
    createDom: function(l, i) {
      var k = this,
        j = k.markup(l),
        n = k.detachedDiv,
        m;
      n.innerHTML = j;
      m = n.firstChild;
      return Ext.supports.ChildContentClearedWhenSettingInnerHTML ? m.cloneNode(
        true) : m
    },
    insertHtml: function(l, i, m) {
      var q = this,
        j, n, k, p, r;
      l = l.toLowerCase();
      if (i.insertAdjacentHTML) {
        if (q.ieInsertHtml) {
          r = q.ieInsertHtml(l, i, m);
          if (r) {
            return r
          }
        }
        j = b[l];
        if (j) {
          i.insertAdjacentHTML(j[0], m);
          return i[j[1]]
        }
      } else {
        if (i.nodeType === 3) {
          l = l === a ? g : l;
          l = l === d ? f : l
        }
        n = Ext.supports.CreateContextualFragment ? i.ownerDocument.createRange() :
          undefined;
        p = "setStart" + (this.endRe.test(l) ? "After" : "Before");
        if (c[l]) {
          if (n) {
            n[p](i);
            r = n.createContextualFragment(m)
          } else {
            r = this.createContextualFragment(m)
          }
          i.parentNode.insertBefore(r, l === g ? i : i.nextSibling);
          return i[(l === g ? "previous" : "next") + "Sibling"]
        } else {
          k = (l === a ? "first" : "last") + "Child";
          if (i.firstChild) {
            if (n) {
              try {
                n[p](i[k]);
                r = n.createContextualFragment(m)
              } catch (o) {
                r = this.createContextualFragment(m)
              }
            } else {
              r = this.createContextualFragment(m)
            }
            if (l === a) {
              i.insertBefore(r, i.firstChild)
            } else {
              i.appendChild(r)
            }
          } else {
            i.innerHTML = m
          }
          return i[k]
        }
      }
    },
    insertBefore: function(i, k, j) {
      return this.doInsert(i, k, j, g)
    },
    insertAfter: function(i, k, j) {
      return this.doInsert(i, k, j, f)
    },
    insertFirst: function(i, k, j) {
      return this.doInsert(i, k, j, a)
    },
    append: function(i, k, j) {
      return this.doInsert(i, k, j, d)
    },
    overwrite: function(k, j, m) {
      var l = this,
        i;
      k = Ext.getDom(k);
      j = l.markup(j);
      if (l.ieOverwrite) {
        i = l.ieOverwrite(k, j)
      }
      if (!i) {
        k.innerHTML = j;
        i = k.firstChild
      }
      return m ? Ext.get(i) : i
    },
    doInsert: function(k, n, m, i) {
      var l = this,
        j;
      k = k.dom || Ext.getDom(k);
      if ("innerHTML" in k) {
        j = l.insertHtml(i, k, l.markup(n))
      } else {
        j = l.createDom(n, null);
        if (k.nodeType === 3) {
          i = i === a ? g : i;
          i = i === d ? f : i
        }
        if (c[i]) {
          k.parentNode.insertBefore(j, i === g ? k : k.nextSibling)
        } else {
          if (k.firstChild && i === a) {
            k.insertBefore(j, k.firstChild)
          } else {
            k.appendChild(j)
          }
        }
      }
      return m ? Ext.get(j) : j
    },
    createTemplate: function(j) {
      var i = this.markup(j);
      return new Ext.Template(i)
    },
    createHtml: function(i) {
      return this.markup(i)
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.dom, "Helper", Ext, "DomHelper", Ext.core,
  "DomHelper"
], 0));
Ext.define("Ext.overrides.dom.Helper", (function() {
  var c = /^(?:table|thead|tbody|tr|td)$/i,
    g = /td|tr|tbody|thead/i,
    f = "<table>",
    h = "</table>",
    b = f + "<tbody>",
    e = "</tbody>" + h,
    a = b + "<tr>",
    d = "</tr>" + e;
  return {
    override: "Ext.dom.Helper",
    ieInsertHtml: function(i, k, j) {
      var l = null;
      if (Ext.isIE9m && c.test(k.tagName)) {
        l = this.insertIntoTable(k.tagName.toLowerCase(), i, k, j)
      }
      return l
    },
    ieOverwrite: function(j, i) {
      if (Ext.isIE9m && c.test(j.tagName)) {
        while (j.firstChild) {
          j.removeChild(j.firstChild)
        }
        if (i) {
          return this.insertHtml("afterbegin", j, i)
        }
      }
    },
    ieTable: function(p, k, q, o) {
      var l = -1,
        n = this.detachedDiv,
        m, j;
      n.innerHTML = [k, q, o].join("");
      while (++l < p) {
        n = n.firstChild
      }
      m = n.nextSibling;
      if (m) {
        m = n;
        n = document.createDocumentFragment();
        while (m) {
          j = m.nextSibling;
          n.appendChild(m);
          m = j
        }
      }
      return n
    },
    insertIntoTable: function(r, k, j, l) {
      var i, o, n = k === "beforebegin",
        q = k === "afterbegin",
        m = k === "beforeend",
        p = k === "afterend";
      if (r === "td" && (q || m) || !g.test(r) && (n || p)) {
        return null
      }
      o = n ? j : p ? j.nextSibling : q ? j.firstChild : null;
      if (n || p) {
        j = j.parentNode
      }
      if (r === "td" || (r === "tr" && (m || q))) {
        i = this.ieTable(4, a, l, d)
      } else {
        if (((r === "tbody" || r === "thead") && (m || q)) || (r ===
            "tr" && (n || p))) {
          i = this.ieTable(3, b, l, e)
        } else {
          i = this.ieTable(2, f, l, h)
        }
      }
      j.insertBefore(i, o);
      return i
    }
  }
})());
(Ext.cmd.derive("Ext.dom.GarbageCollector", Ext.Base, {
  singleton: true,
  interval: 30000,
  constructor: function() {
    var a = this;
    a.collect = Ext.Function.bind(a.collect, a);
    a.lastTime = Ext.now();
    a.resume()
  },
  collect: function() {
    var i = this,
      a = Ext.cache,
      b, f, c, j, g, d;
    for (b in a) {
      if (!a.hasOwnProperty(b)) {
        continue
      }
      c = a[b];
      if (c.skipGarbageCollection) {
        continue
      }
      f = c.dom;
      try {
        g = Ext.isGarbage(f)
      } catch (h) {
        delete a[b];
        continue
      }
      if (g) {
        if (c && c.dom) {
          c.collect()
        }
      }
    }
    if (Ext.isIE9m) {
      j = {};
      for (b in a) {
        if (a.hasOwnProperty(b)) {
          j[b] = a[b]
        }
      }
      Ext.cache = Ext.dom.Element.cache = j
    }
    i.lastTime = Ext.now()
  },
  pause: function() {
    clearTimeout(this.timerId)
  },
  resume: function() {
    var a = this,
      b = a.lastTime;
    if (Ext.enableGarbageCollector && (Ext.now() - b > a.interval)) {
      a.collect()
    }
    a.timerId = Ext.interval(a.collect, a.interval)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.dom, "GarbageCollector"], 0));
(Ext.cmd.derive("Ext.event.gesture.Recognizer", Ext.Base, {
  priority: 0,
  handledEvents: [],
  config: {
    onRecognized: Ext.emptyFn,
    callbackScope: null
  },
  constructor: function(a) {
    this.initConfig(a);
    Ext.event.publisher.Gesture.instance.registerRecognizer(this)
  },
  onStart: Ext.emptyFn,
  onEnd: Ext.emptyFn,
  onTouchStart: Ext.emptyFn,
  onTouchMove: Ext.emptyFn,
  onTouchEnd: Ext.emptyFn,
  onTouchCancel: Ext.emptyFn,
  fail: function() {
    return false
  },
  fire: function() {
    this.getOnRecognized().apply(this.getCallbackScope(), arguments)
  },
  reset: Ext.emptyFn
}, 1, 0, 0, 0, 0, [
  [Ext.mixin.Identifiable.prototype.mixinId || Ext.mixin.Identifiable.$className,
    Ext.mixin.Identifiable
  ]
], [Ext.event.gesture, "Recognizer"], 0));
(Ext.cmd.derive("Ext.event.gesture.SingleTouch", Ext.event.gesture.Recognizer, {
  inheritableStatics: {
    NOT_SINGLE_TOUCH: "Not Single Touch",
    TOUCH_MOVED: "Touch Moved",
    EVENT_CANCELED: "Event Canceled"
  },
  onTouchStart: function(a) {
    if (a.touches.length > 1) {
      return this.fail(this.self.NOT_SINGLE_TOUCH)
    }
  },
  onTouchCancel: function() {
    return false
  }
}, 0, 0, 0, 0, 0, 0, [Ext.event.gesture, "SingleTouch"], 0));
(Ext.cmd.derive("Ext.event.gesture.DoubleTap", Ext.event.gesture.SingleTouch, {
  priority: 300,
  inheritableStatics: {
    DIFFERENT_TARGET: "Different Target"
  },
  config: {
    moveDistance: 8,
    tapDistance: 24,
    maxDuration: 300
  },
  handledEvents: ["singletap", "doubletap"],
  singleTapTimer: null,
  startTime: 0,
  lastTapTime: 0,
  onTouchStart: function(c) {
    var b = this,
      a;
    if (Ext.event.gesture.SingleTouch.prototype.onTouchStart.apply(this,
        arguments) === false) {
      return false
    }
    a = b.lastStartPoint = c.changedTouches[0].point;
    b.startPoint = b.startPoint || a;
    b.startTime = c.time;
    clearTimeout(b.singleTapTimer)
  },
  onTouchMove: function(c) {
    var b = this,
      a = c.changedTouches[0].point;
    if (Math.abs(a.getDistanceTo(b.lastStartPoint)) >= b.getMoveDistance()) {
      b.startPoint = null;
      return b.fail(b.self.TOUCH_MOVED)
    }
  },
  onTouchEnd: function(f) {
    var h = this,
      d = h.getMaxDuration(),
      a = f.time,
      g = f.target,
      i = h.lastTapTime,
      b = h.lastTarget,
      j = f.changedTouches[0].point,
      c;
    h.lastTapTime = a;
    h.lastTarget = g;
    if (i) {
      c = a - i;
      if (c <= d && Math.abs(j.getDistanceTo(h.startPoint)) <= h.getTapDistance()) {
        if (g !== b) {
          return h.fail(h.self.DIFFERENT_TARGET)
        }
        h.lastTarget = null;
        h.lastTapTime = 0;
        h.fire("doubletap", f, {
          touch: f.changedTouches[0],
          duration: c
        });
        h.startPoint = null;
        return
      }
    }
    if (a - h.startTime > d) {
      h.fireSingleTap(f)
    } else {
      h.setSingleTapTimer(f)
    }
  },
  setSingleTapTimer: function(b) {
    var a = this;
    a.singleTapTimer = Ext.defer(function() {
      a.fireSingleTap(b)
    }, a.getMaxDuration())
  },
  fireSingleTap: function(a, b) {
    this.fire("singletap", a, {
      touch: b
    });
    this.startPoint = null
  },
  reset: function() {
    var a = this;
    a.startTime = a.lastTapTime = 0;
    a.lastStartPoint = a.startPoint = a.singleTapTimer = null
  }
}, 0, 0, 0, 0, 0, 0, [Ext.event.gesture, "DoubleTap"], function(a) {
  var b = Ext.manifest.gestures;
  a.instance = new a(b && b.doubleTap)
}));
(Ext.cmd.derive("Ext.event.gesture.Drag", Ext.event.gesture.SingleTouch, {
  priority: 100,
  isStarted: false,
  startPoint: null,
  previousPoint: null,
  lastPoint: null,
  handledEvents: ["dragstart", "drag", "dragend", "dragcancel"],
  config: {
    minDistance: 8
  },
  constructor: function() {
    Ext.event.gesture.SingleTouch.prototype.constructor.apply(this,
      arguments);
    this.initInfo()
  },
  initInfo: function() {
    this.info = {
      touch: null,
      previous: {
        x: 0,
        y: 0
      },
      x: 0,
      y: 0,
      delta: {
        x: 0,
        y: 0
      },
      absDelta: {
        x: 0,
        y: 0
      },
      flick: {
        velocity: {
          x: 0,
          y: 0
        }
      },
      direction: {
        x: 0,
        y: 0
      },
      time: 0,
      previousTime: {
        x: 0,
        y: 0
      }
    }
  },
  onTouchStart: function(a) {
    if (Ext.event.gesture.SingleTouch.prototype.onTouchStart.apply(this,
        arguments) === false) {
      if (this.isStarted && this.lastMoveEvent !== null) {
        this.lastMoveEvent.isStopped = false;
        this.onTouchEnd(this.lastMoveEvent)
      }
      return false
    }
    this.startTime = a.time;
    this.startPoint = a.changedTouches[0].point
  },
  tryDragStart: function(d) {
    var b = this.startPoint,
      g = d.changedTouches[0],
      a = g.point,
      f = this.getMinDistance(),
      c = this.info;
    if (Math.abs(a.getDistanceTo(b)) >= f) {
      this.isStarted = true;
      this.previousPoint = this.lastPoint = a;
      this.resetInfo("x", d, g);
      this.resetInfo("y", d, g);
      c.time = d.time;
      this.fire("dragstart", d, c)
    }
  },
  onTouchMove: function(b) {
    if (!this.isStarted) {
      this.tryDragStart(b)
    }
    if (!this.isStarted) {
      return
    }
    var c = b.changedTouches[0],
      a = c.point;
    if (this.lastPoint) {
      this.previousPoint = this.lastPoint
    }
    this.lastPoint = a;
    this.lastMoveEvent = b;
    this.updateInfo("x", b, c);
    this.updateInfo("y", b, c);
    this.info.time = b.time;
    this.fire("drag", b, this.info)
  },
  onAxisDragEnd: function(a, c) {
    var b = c.time - c.previousTime[a];
    if (b > 0) {
      c.flick.velocity[a] = (c[a] - c.previous[a]) / b
    }
  },
  resetInfo: function(c, g, i) {
    var d = this.lastPoint[c],
      b = this.startPoint[c],
      h = d - b,
      a = c.toUpperCase(),
      f = this.info;
    f.touch = i;
    f.delta[c] = h;
    f.absDelta[c] = Math.abs(h);
    f.previousTime[c] = this.startTime;
    f.previous[c] = b;
    f[c] = d;
    f.direction[c] = 0;
    f["start" + a] = this.startPoint[c];
    f["previous" + a] = f.previous[c];
    f["page" + a] = f[c];
    f["delta" + a] = f.delta[c];
    f["absDelta" + a] = f.absDelta[c];
    f["previousDelta" + a] = 0;
    f.startTime = this.startTime
  },
  updateInfo: function(d, i, h) {
    var j = this,
      l = j.lastPoint[d],
      f = j.previousPoint[d],
      a = j.startPoint[d],
      m = l - a,
      c = j.info,
      k = c.direction,
      g = d.toUpperCase(),
      b = c.previous[d];
    c.touch = h;
    c.delta[d] = m;
    c.absDelta[d] = Math.abs(m);
    if (l !== b && l !== c[d]) {
      c.previous[d] = c[d];
      c.previousTime[d] = c.time
    }
    c[d] = l;
    if (l > f) {
      k[d] = 1
    } else {
      if (l < f) {
        k[d] = -1
      }
    }
    c["start" + g] = a;
    c["previous" + g] = c.previous[d];
    c["page" + g] = c[d];
    c["delta" + g] = c.delta[d];
    c["absDelta" + g] = c.absDelta[d];
    c["previousDelta" + g] = c.previous[d] - a;
    c.startTime = j.startTime
  },
  onTouchEnd: function(a) {
    this.doEnd(a)
  },
  onTouchCancel: function(a) {
    this.doEnd(a, true);
    return false
  },
  doEnd: function(d, b) {
    if (!this.isStarted) {
      this.tryDragStart(d)
    }
    if (this.isStarted) {
      var f = d.changedTouches[0],
        a = f.point,
        c = this.info;
      this.isStarted = false;
      this.lastPoint = a;
      this.updateInfo("x", d, f);
      this.updateInfo("y", d, f);
      c.time = d.time;
      this.onAxisDragEnd("x", c);
      this.onAxisDragEnd("y", c);
      this.fire(b ? "dragcancel" : "dragend", d, c);
      this.startPoint = null;
      this.previousPoint = null;
      this.lastPoint = null;
      this.lastMoveEvent = null
    }
  },
  reset: function() {
    var a = this;
    a.isStarted = a.lastPoint = a.startPoint = a.previousPoint = a.lastPoint =
      a.lastMoveEvent = null;
    a.initInfo()
  }
}, 1, 0, 0, 0, 0, 0, [Ext.event.gesture, "Drag"], function(a) {
  var b = Ext.manifest.gestures;
  a.instance = new a(b && b.drag)
}));
(Ext.cmd.derive("Ext.event.gesture.Swipe", Ext.event.gesture.SingleTouch, {
  priority: 500,
  handledEvents: ["swipestart", "swipe", "swipecancel"],
  inheritableStatics: {
    MAX_OFFSET_EXCEEDED: "Max Offset Exceeded",
    MAX_DURATION_EXCEEDED: "Max Duration Exceeded",
    DISTANCE_NOT_ENOUGH: "Distance Not Enough"
  },
  config: {
    minDistance: 80,
    maxOffset: 35,
    maxDuration: 1000
  },
  onTouchStart: function(a) {
    if (Ext.event.gesture.SingleTouch.prototype.onTouchStart.apply(this,
        arguments) === false) {
      return false
    }
    var b = a.changedTouches[0];
    this.startTime = a.time;
    this.isHorizontal = true;
    this.isVertical = true;
    this.startX = b.pageX;
    this.startY = b.pageY
  },
  onTouchMove: function(j) {
    var i = j.changedTouches[0],
      m = i.pageX,
      k = i.pageY,
      h = m - this.startX,
      g = k - this.startY,
      d = Math.abs(m - this.startX),
      c = Math.abs(k - this.startY),
      f = j.time - this.startTime,
      n = this.getMinDistance(),
      b = j.time,
      l, a;
    if (b - this.startTime > this.getMaxDuration()) {
      return this.fail(this.self.MAX_DURATION_EXCEEDED)
    }
    if (this.isHorizontal && c > this.getMaxOffset()) {
      this.isHorizontal = false
    }
    if (this.isVertical && d > this.getMaxOffset()) {
      this.isVertical = false
    }
    if (!this.isVertical || !this.isHorizontal) {
      if (this.isHorizontal && d < n) {
        l = (h < 0) ? "left" : "right";
        a = d
      } else {
        if (this.isVertical && c < n) {
          l = (g < 0) ? "up" : "down";
          a = c
        }
      }
    }
    if (l && !this.started) {
      this.started = true;
      this.fire("swipestart", j, {
        touch: i,
        direction: l,
        distance: a,
        duration: f
      })
    }
    if (!this.isHorizontal && !this.isVertical) {
      return this.fail(this.self.MAX_OFFSET_EXCEEDED)
    }
  },
  onTouchEnd: function(i) {
    if (this.onTouchMove(i) === false) {
      return false
    }
    var h = i.changedTouches[0],
      l = h.pageX,
      j = h.pageY,
      g = l - this.startX,
      f = j - this.startY,
      c = Math.abs(g),
      b = Math.abs(f),
      m = this.getMinDistance(),
      d = i.time - this.startTime,
      k, a;
    if (this.isVertical && b < m) {
      this.isVertical = false
    }
    if (this.isHorizontal && c < m) {
      this.isHorizontal = false
    }
    if (this.isHorizontal) {
      k = (g < 0) ? "left" : "right";
      a = c
    } else {
      if (this.isVertical) {
        k = (f < 0) ? "up" : "down";
        a = b
      } else {
        return this.fail(this.self.DISTANCE_NOT_ENOUGH)
      }
    }
    this.started = false;
    this.fire("swipe", i, {
      touch: h,
      direction: k,
      distance: a,
      duration: d
    })
  },
  onTouchCancel: function(a) {
    this.fire("swipecancel", a);
    return false
  },
  reset: function() {
    var a = this;
    a.startTime = a.isHorizontal = a.isVertical = a.startX = a.startY =
      null
  }
}, 0, 0, 0, 0, 0, 0, [Ext.event.gesture, "Swipe"], function(a) {
  var b = Ext.manifest.gestures;
  a.instance = new a(b && b.swipe)
}));
(Ext.cmd.derive("Ext.event.gesture.EdgeSwipe", Ext.event.gesture.Swipe, {
  priority: 800,
  handledEvents: ["edgeswipe", "edgeswipestart", "edgeswipeend",
    "edgeswipecancel"
  ],
  inheritableStatics: {
    NOT_NEAR_EDGE: "Not Near Edge"
  },
  config: {
    minDistance: 60
  },
  onTouchStart: function(a) {
    if (Ext.event.gesture.Swipe.prototype.onTouchStart.apply(this,
        arguments) === false) {
      return false
    }
    var b = a.changedTouches[0];
    this.started = false;
    this.direction = null;
    this.isHorizontal = true;
    this.isVertical = true;
    this.startX = b.pageX;
    this.startY = b.pageY
  },
  onTouchMove: function(k) {
    var i = k.changedTouches[0],
      o = i.pageX,
      l = i.pageY,
      h = o - this.startX,
      g = l - this.startY,
      b = Math.abs(l - this.startY),
      c = Math.abs(o - this.startX),
      p = this.getMinDistance(),
      f = this.getMaxOffset(),
      d = k.time - this.startTime,
      n = Ext.Viewport && Ext.Element.getViewportWidth(),
      j = Ext.Viewport && Ext.Element.getViewportHeight(),
      m, a;
    if (this.isVertical && c > f) {
      this.isVertical = false
    }
    if (this.isHorizontal && b > f) {
      this.isHorizontal = false
    }
    if (this.isVertical && this.isHorizontal) {
      if (b > c) {
        this.isHorizontal = false
      } else {
        this.isVertical = false
      }
    }
    if (this.isHorizontal) {
      m = (h < 0) ? "left" : "right";
      a = h
    } else {
      if (this.isVertical) {
        m = (g < 0) ? "up" : "down";
        a = g
      }
    }
    m = this.direction || (this.direction = m);
    if (m === "up") {
      a = g * -1
    } else {
      if (m === "left") {
        a = h * -1
      }
    }
    this.distance = a;
    if (!a) {
      return this.fail(this.self.DISTANCE_NOT_ENOUGH)
    }
    if (!this.started) {
      if (m === "right" && this.startX > p) {
        return this.fail(this.self.NOT_NEAR_EDGE)
      } else {
        if (m === "down" && this.startY > p) {
          return this.fail(this.self.NOT_NEAR_EDGE)
        } else {
          if (m === "left" && (n - this.startX) > p) {
            return this.fail(this.self.NOT_NEAR_EDGE)
          } else {
            if (m === "up" && (j - this.startY) > p) {
              return this.fail(this.self.NOT_NEAR_EDGE)
            }
          }
        }
      }
      this.started = true;
      this.startTime = k.time;
      this.fire("edgeswipestart", k, {
        touch: i,
        direction: m,
        distance: a,
        duration: d
      })
    } else {
      this.fire("edgeswipe", k, {
        touch: i,
        direction: m,
        distance: a,
        duration: d
      })
    }
  },
  onTouchEnd: function(b) {
    var a;
    if (this.onTouchMove(b) !== false) {
      a = b.time - this.startTime;
      this.fire("edgeswipeend", b, {
        touch: b.changedTouches[0],
        direction: this.direction,
        distance: this.distance,
        duration: a
      })
    }
  },
  onTouchCancel: function(a) {
    this.fire("edgeswipecancel", a, {
      touch: a.changedTouches[0]
    });
    return false
  },
  reset: function() {
    var a = this;
    a.started = a.direction = a.isHorizontal = a.isVertical = a.startX =
      a.startY = a.startTime = a.distance = null
  }
}, 0, 0, 0, 0, 0, 0, [Ext.event.gesture, "EdgeSwipe"], function(a) {
  var b = Ext.manifest.gestures;
  a.instance = new a(b && b.edgeSwipe)
}));
(Ext.cmd.derive("Ext.event.gesture.LongPress", Ext.event.gesture.SingleTouch, {
  priority: 400,
  inheritableStatics: {
    DURATION_NOT_ENOUGH: "Duration Not Enough"
  },
  config: {
    moveDistance: 8,
    minDuration: 1000
  },
  handledEvents: ["longpress", "taphold"],
  fireLongPress: function(a) {
    this.fire("longpress", a, {
      touch: a.changedTouches[0],
      duration: this.getMinDuration()
    });
    this.isLongPress = true
  },
  onTouchStart: function(a) {
    if (Ext.event.gesture.SingleTouch.prototype.onTouchStart.apply(this,
        arguments) === false) {
      return false
    }
    this.startPoint = a.changedTouches[0].point;
    this.isLongPress = false;
    this.setLongPressTimer(a)
  },
  setLongPressTimer: function(b) {
    var a = this;
    a.timer = Ext.defer(function() {
      a.fireLongPress(b)
    }, a.getMinDuration())
  },
  onTouchMove: function(b) {
    var a = b.changedTouches[0].point;
    if (Math.abs(a.getDistanceTo(this.startPoint)) >= this.getMoveDistance()) {
      return this.fail(this.self.TOUCH_MOVED)
    }
  },
  onTouchEnd: function() {
    if (!this.isLongPress) {
      return this.fail(this.self.DURATION_NOT_ENOUGH)
    }
  },
  fail: function() {
    clearTimeout(this.timer);
    return Ext.event.gesture.SingleTouch.prototype.fail.apply(this,
      arguments)
  },
  reset: function() {
    this.isLongPress = this.startPoint = null
  },
  fire: function(a) {
    if (a === "longpress") {
      var b = Array.prototype.slice.call(arguments);
      b[0] = "taphold";
      this.fire.apply(this, b)
    }
    return Ext.event.gesture.SingleTouch.prototype.fire.apply(this,
      arguments)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.event.gesture, "LongPress"], function(a) {
  var b = Ext.manifest.gestures;
  a.instance = new a(b && b.longPress)
}));
(Ext.cmd.derive("Ext.event.gesture.MultiTouch", Ext.event.gesture.Recognizer, {
  requiredTouchesCount: 2,
  isTracking: false,
  isStarted: false,
  onTouchStart: function(d) {
    var a = this.requiredTouchesCount,
      c = d.touches,
      b = c.length;
    if (b === a) {
      this.start(d)
    } else {
      if (b > a) {
        this.end(d)
      }
    }
  },
  onTouchEnd: function(a) {
    this.end(a)
  },
  onTouchCancel: function(a) {
    this.end(a, true);
    return false
  },
  start: function() {
    if (!this.isTracking) {
      this.isTracking = true;
      this.isStarted = false
    }
  },
  end: function(b, a) {
    if (this.isTracking) {
      this.isTracking = false;
      if (this.isStarted) {
        this.isStarted = false;
        this[a ? "fireCancel" : "fireEnd"](b)
      }
    }
  },
  reset: function() {
    this.isTracking = this.isStarted = false
  }
}, 0, 0, 0, 0, 0, 0, [Ext.event.gesture, "MultiTouch"], 0));
(Ext.cmd.derive("Ext.event.gesture.Pinch", Ext.event.gesture.MultiTouch, {
  priority: 600,
  handledEvents: ["pinchstart", "pinch", "pinchend", "pinchcancel"],
  startDistance: 0,
  lastTouches: null,
  onTouchMove: function(c) {
    if (!this.isTracking) {
      return
    }
    var b = c.touches,
      d, a, f;
    d = b[0].point;
    a = b[1].point;
    f = d.getDistanceTo(a);
    if (f === 0) {
      return
    }
    if (!this.isStarted) {
      this.isStarted = true;
      this.startDistance = f;
      this.fire("pinchstart", c, {
        touches: b,
        distance: f,
        scale: 1
      })
    } else {
      this.fire("pinch", c, {
        touches: b,
        distance: f,
        scale: f / this.startDistance
      })
    }
  },
  fireEnd: function(a) {
    this.fire("pinchend", a)
  },
  fireCancel: function(a) {
    this.fire("pinchcancel", a)
  },
  fail: function() {
    return Ext.event.gesture.MultiTouch.prototype.fail.apply(this,
      arguments)
  },
  reset: function() {
    this.lastTouches = null;
    this.startDistance = 0;
    Ext.event.gesture.MultiTouch.prototype.reset.call(this)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.event.gesture, "Pinch"], function(a) {
  var b = Ext.manifest.gestures;
  a.instance = new a(b && b.pinch)
}));
(Ext.cmd.derive("Ext.event.gesture.Rotate", Ext.event.gesture.MultiTouch, {
  priority: 700,
  handledEvents: ["rotatestart", "rotate", "rotateend", "rotatecancel"],
  startAngle: 0,
  lastTouches: null,
  lastAngle: null,
  onTouchMove: function(h) {
    if (!this.isTracking) {
      return
    }
    var g = h.touches,
      b = this.lastAngle,
      d, f, c, a, i, j;
    d = g[0].point;
    f = g[1].point;
    c = d.getAngleTo(f);
    if (b !== null) {
      j = Math.abs(b - c);
      a = c + 360;
      i = c - 360;
      if (Math.abs(a - b) < j) {
        c = a
      } else {
        if (Math.abs(i - b) < j) {
          c = i
        }
      }
    }
    this.lastAngle = c;
    if (!this.isStarted) {
      this.isStarted = true;
      this.startAngle = c;
      this.fire("rotatestart", h, {
        touches: g,
        angle: c,
        rotation: 0
      })
    } else {
      this.fire("rotate", h, {
        touches: g,
        angle: c,
        rotation: c - this.startAngle
      })
    }
    this.lastTouches = Ext.Array.clone(g)
  },
  fireEnd: function(a) {
    this.lastAngle = null;
    this.fire("rotateend", a)
  },
  fireCancel: function(a) {
    this.lastAngle = null;
    this.fire("rotatecancel", a)
  },
  reset: function() {
    var a = this;
    a.lastTouches = a.lastAngle = a.startAngle = null;
    Ext.event.gesture.MultiTouch.prototype.reset.call(this)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.event.gesture, "Rotate"], function(a) {
  var b = Ext.manifest.gestures;
  a.instance = new a(b && b.rotate)
}));
(Ext.cmd.derive("Ext.event.gesture.Tap", Ext.event.gesture.SingleTouch, {
  priority: 200,
  handledEvents: ["tap", "tapcancel"],
  config: {
    moveDistance: 8
  },
  onTouchStart: function(a) {
    if (Ext.event.gesture.SingleTouch.prototype.onTouchStart.call(this, a) ===
      false) {
      return false
    }
    this.startPoint = a.changedTouches[0].point
  },
  onTouchMove: function(b) {
    var c = b.changedTouches[0],
      a = c.point;
    if (Math.abs(a.getDistanceTo(this.startPoint)) >= this.getMoveDistance()) {
      this.fire("tapcancel", b, {
        touch: c
      });
      return this.fail(this.self.TOUCH_MOVED)
    }
  },
  onTouchEnd: function(a) {
    this.fire("tap", a, {
      touch: a.changedTouches[0]
    })
  },
  onTouchCancel: function(a) {
    this.fire("tapcancel", a, {
      touch: a.changedTouches[0]
    });
    return false
  },
  reset: function() {
    this.startPoint = null
  }
}, 0, 0, 0, 0, 0, 0, [Ext.event.gesture, "Tap"], function(b) {
  var a = Ext.manifest.gestures;
  b.instance = new b(a && a.tap)
}));
(Ext.cmd.derive("Ext.event.publisher.Focus", Ext.event.publisher.Dom, {
  type: "focus",
  handledEvents: ["focusenter", "focusleave", "focusmove"],
  handledDomEvents: ["focusin", "focusout"],
  doDelegatedEvent: function(d, c) {
    var b = this,
      a;
    d = Ext.event.publisher.Dom.prototype.doDelegatedEvent.call(this, d,
      false);
    if (d) {
      if (d.type === "focusout") {
        if (d.relatedTarget == null) {
          b.processFocusIn(d, d.target, document.body, c)
        }
      } else {
        a = d.relatedTarget;
        b.processFocusIn(d, (a == null || !a.tagName) ? document.body : a,
          d.target, c)
      }
    }
  },
  processFocusIn: function(g, h, c, j) {
    var i = this,
      k, b, f = [],
      a, d;
    if (this.suspendCount) {
      return
    }
    for (b = h, k = Ext.dom.Element.getCommonAncestor(c, h, true); b && b !==
      k; b = b.parentNode) {
      f.push(b)
    }
    if (f.length) {
      a = i.createSyntheticEvent("focusleave", g, h, c);
      i.publish("focusleave", f, a);
      if (a.isStopped) {
        return
      }
    }
    f.length = 0;
    for (b = c; b !== k; b = b.parentNode) {
      f.push(b)
    }
    d = i.createSyntheticEvent("focusenter", g, c, h);
    if (f.length) {
      i.publish("focusenter", f, d);
      if (d.isStopped) {
        return
      }
    }
    f = i.getPropagatingTargets(k);
    if (f.length) {
      a = i.createSyntheticEvent("focusmove", g, c, h);
      i.publish("focusmove", f, a);
      if (a.isStopped) {
        return
      }
    }
    if (j) {
      i.afterEvent(g)
    }
    Ext.GlobalEvents.fireEvent("focus", {
      event: d,
      toElement: c,
      fromElement: h
    })
  },
  createSyntheticEvent: function(b, e, d, a) {
    var c = new Ext.event.Event(e);
    c.type = b;
    c.relatedTarget = a;
    c.target = d;
    return c
  }
}, 0, 0, 0, 0, 0, 0, [Ext.event.publisher, "Focus"], function(c) {
  var a = c.instance = new c(),
    b;
  Ext.suspendFocus = c.suspendFocus = function() {
    a.suspendCount = (a.suspendCount || 0) + 1
  };
  Ext.resumeFocus = c.resumeFocus = function() {
    if (a.suspendCount) {
      a.suspendCount -= 1
    }
  };
  if (!Ext.supports.FocusinFocusoutEvents) {
    this.override({
      handledDomEvents: ["focus", "blur"],
      doDelegatedEvent: function(h, g) {
        var f = this;
        h = f.callSuper([h, false]);
        if (h) {
          clearTimeout(b);
          b = 0;
          if (h.type === "blur") {
            var d = h.target === window ? document.body : h.target;
            b = setTimeout(function() {
              b = 0;
              f.processFocusIn(h, d, document.body, g);
              c.previousActiveElement = null
            }, 0);
            if (h.target === window || h.target === document) {
              c.previousActiveElement = null
            } else {
              c.previousActiveElement = h.target
            }
          } else {
            f.processFocusIn(h, c.previousActiveElement || document.body,
              h.target === window ? document.body : h.target, g)
          }
        }
      }
    })
  }
}));
(Ext.cmd.derive("Ext.fx.State", Ext.Base, {
  isAnimatable: {
    "background-color": true,
    "background-image": true,
    "background-position": true,
    "border-bottom-color": true,
    "border-bottom-width": true,
    "border-color": true,
    "border-left-color": true,
    "border-left-width": true,
    "border-right-color": true,
    "border-right-width": true,
    "border-spacing": true,
    "border-top-color": true,
    "border-top-width": true,
    "border-width": true,
    bottom: true,
    color: true,
    crop: true,
    "font-size": true,
    "font-weight": true,
    height: true,
    left: true,
    "letter-spacing": true,
    "line-height": true,
    "margin-bottom": true,
    "margin-left": true,
    "margin-right": true,
    "margin-top": true,
    "max-height": true,
    "max-width": true,
    "min-height": true,
    "min-width": true,
    opacity: true,
    "outline-color": true,
    "outline-offset": true,
    "outline-width": true,
    "padding-bottom": true,
    "padding-left": true,
    "padding-right": true,
    "padding-top": true,
    right: true,
    "text-indent": true,
    "text-shadow": true,
    top: true,
    "vertical-align": true,
    visibility: true,
    width: true,
    "word-spacing": true,
    "z-index": true,
    zoom: true,
    transform: true
  },
  constructor: function(a) {
    this.data = {};
    this.set(a)
  },
  setConfig: function(a) {
    this.set(a);
    return this
  },
  setRaw: function(a) {
    this.data = a;
    return this
  },
  clear: function() {
    return this.setRaw({})
  },
  setTransform: function(c, g) {
    var f = this.data,
      a = Ext.isArray(g),
      b = f.transform,
      e, d;
    if (!b) {
      b = f.transform = {
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotate: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        skewX: 0,
        skewY: 0
      }
    }
    if (typeof c == "string") {
      switch (c) {
        case "translate":
          if (a) {
            e = g.length;
            if (e == 0) {
              break
            }
            b.translateX = g[0];
            if (e == 1) {
              break
            }
            b.translateY = g[1];
            if (e == 2) {
              break
            }
            b.translateZ = g[2]
          } else {
            b.translateX = g
          }
          break;
        case "rotate":
          if (a) {
            e = g.length;
            if (e == 0) {
              break
            }
            b.rotateX = g[0];
            if (e == 1) {
              break
            }
            b.rotateY = g[1];
            if (e == 2) {
              break
            }
            b.rotateZ = g[2]
          } else {
            b.rotate = g
          }
          break;
        case "scale":
          if (a) {
            e = g.length;
            if (e == 0) {
              break
            }
            b.scaleX = g[0];
            if (e == 1) {
              break
            }
            b.scaleY = g[1];
            if (e == 2) {
              break
            }
            b.scaleZ = g[2]
          } else {
            b.scaleX = g;
            b.scaleY = g
          }
          break;
        case "skew":
          if (a) {
            e = g.length;
            if (e == 0) {
              break
            }
            b.skewX = g[0];
            if (e == 1) {
              break
            }
            b.skewY = g[1]
          } else {
            b.skewX = g
          }
          break;
        default:
          b[c] = g
      }
    } else {
      for (d in c) {
        if (c.hasOwnProperty(d)) {
          g = c[d];
          this.setTransform(d, g)
        }
      }
    }
  },
  set: function(a, d) {
    var c = this.data,
      b;
    if (typeof a != "string") {
      for (b in a) {
        d = a[b];
        if (b === "transform") {
          this.setTransform(d)
        } else {
          c[b] = d
        }
      }
    } else {
      if (a === "transform") {
        this.setTransform(d)
      } else {
        c[a] = d
      }
    }
    return this
  },
  unset: function(a) {
    var b = this.data;
    if (b.hasOwnProperty(a)) {
      delete b[a]
    }
    return this
  },
  getData: function() {
    return this.data
  }
}, 1, 0, 0, 0, 0, 0, [Ext.fx, "State"], 0));
(Ext.cmd.derive("Ext.fx.animation.Abstract", Ext.Evented, {
  isAnimation: true,
  config: {
    name: "",
    element: null,
    before: null,
    from: {},
    to: {},
    after: null,
    states: {},
    duration: 300,
    easing: "linear",
    iteration: 1,
    direction: "normal",
    delay: 0,
    onBeforeStart: null,
    callback: null,
    onEnd: null,
    onBeforeEnd: null,
    scope: null,
    reverse: null,
    preserveEndState: false,
    replacePrevious: true
  },
  STATE_FROM: "0%",
  STATE_TO: "100%",
  DIRECTION_UP: "up",
  DIRECTION_DOWN: "down",
  DIRECTION_LEFT: "left",
  DIRECTION_RIGHT: "right",
  stateNameRegex: /^(?:[\d\.]+)%$/,
  constructor: function() {
    this.states = {};
    Ext.Evented.prototype.constructor.apply(this, arguments);
    return this
  },
  applyElement: function(a) {
    return Ext.get(a)
  },
  applyBefore: function(a, b) {
    if (a) {
      return Ext.factory(a, Ext.fx.State, b)
    }
  },
  applyAfter: function(b, a) {
    if (b) {
      return Ext.factory(b, Ext.fx.State, a)
    }
  },
  setFrom: function(a) {
    return this.setState(this.STATE_FROM, a)
  },
  setTo: function(a) {
    return this.setState(this.STATE_TO, a)
  },
  getFrom: function() {
    return this.getState(this.STATE_FROM)
  },
  getTo: function() {
    return this.getState(this.STATE_TO)
  },
  setStates: function(a) {
    var c = this.stateNameRegex,
      b;
    for (b in a) {
      if (c.test(b)) {
        this.setState(b, a[b])
      }
    }
    return this
  },
  getStates: function() {
    return this.states
  },
  updateCallback: function(a) {
    if (a) {
      this.setOnEnd(a)
    }
  },
  end: function() {
    this.stop()
  },
  stop: function() {
    this.fireEvent("stop", this)
  },
  destroy: function() {
    this.stop();
    Ext.Evented.prototype.destroy.call(this)
  },
  setState: function(b, d) {
    var a = this.getStates(),
      c;
    c = Ext.factory(d, Ext.fx.State, a[b]);
    if (c) {
      a[b] = c
    }
    return this
  },
  getState: function(a) {
    return this.getStates()[a]
  },
  getData: function() {
    var g = this,
      l = g.getStates(),
      e = {},
      h = g.getBefore(),
      c = g.getAfter(),
      i = l[g.STATE_FROM],
      j = l[g.STATE_TO],
      k = i.getData(),
      f = j.getData(),
      d, b, a;
    for (b in l) {
      if (l.hasOwnProperty(b)) {
        a = l[b];
        d = a.getData();
        e[b] = d
      }
    }
    return {
      before: h ? h.getData() : {},
      after: c ? c.getData() : {},
      states: e,
      from: k,
      to: f,
      duration: g.getDuration(),
      iteration: g.getIteration(),
      direction: g.getDirection(),
      easing: g.getEasing(),
      delay: g.getDelay(),
      onEnd: g.getOnEnd(),
      onBeforeEnd: g.getOnBeforeEnd(),
      onBeforeStart: g.getOnBeforeStart(),
      scope: g.getScope(),
      preserveEndState: g.getPreserveEndState(),
      replacePrevious: g.getReplacePrevious()
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.fx.animation, "Abstract"], 0));
(Ext.cmd.derive("Ext.fx.animation.Slide", Ext.fx.animation.Abstract, {
  alternateClassName: "Ext.fx.animation.SlideIn",
  config: {
    direction: "left",
    out: false,
    offset: 0,
    easing: "auto",
    containerBox: "auto",
    elementBox: "auto",
    isElementBoxFit: true,
    useCssTransform: true
  },
  reverseDirectionMap: {
    up: "down",
    down: "up",
    left: "right",
    right: "left"
  },
  applyEasing: function(a) {
    if (a === "auto") {
      return "ease-" + ((this.getOut()) ? "in" : "out")
    }
    return a
  },
  getContainerBox: function() {
    var a = this._containerBox;
    if (a === "auto") {
      a = this.getElement().getParent().getBox()
    }
    return a
  },
  getElementBox: function() {
    var a = this._elementBox;
    if (this.getIsElementBoxFit()) {
      return this.getContainerBox()
    }
    if (a === "auto") {
      a = this.getElement().getBox()
    }
    return a
  },
  getData: function() {
    var p = this.getElementBox(),
      c = this.getContainerBox(),
      g = p ? p : c,
      n = this.getFrom(),
      o = this.getTo(),
      f = this.getOut(),
      e = this.getOffset(),
      m = this.getDirection(),
      b = this.getUseCssTransform(),
      h = this.getReverse(),
      d = 0,
      a = 0,
      l, j, k, i;
    if (h) {
      m = this.reverseDirectionMap[m]
    }
    switch (m) {
      case this.DIRECTION_UP:
        if (f) {
          a = c.top - g.top - g.height - e
        } else {
          a = c.bottom - g.bottom + g.height + e
        }
        break;
      case this.DIRECTION_DOWN:
        if (f) {
          a = c.bottom - g.bottom + g.height + e
        } else {
          a = c.top - g.height - g.top - e
        }
        break;
      case this.DIRECTION_RIGHT:
        if (f) {
          d = c.right - g.right + g.width + e
        } else {
          d = c.left - g.left - g.width - e
        }
        break;
      case this.DIRECTION_LEFT:
        if (f) {
          d = c.left - g.left - g.width - e
        } else {
          d = c.right - g.right + g.width + e
        }
        break
    }
    l = (f) ? 0 : d;
    j = (f) ? 0 : a;
    if (b) {
      n.setTransform({
        translateX: l,
        translateY: j
      })
    } else {
      n.set("left", l);
      n.set("top", j)
    }
    k = (f) ? d : 0;
    i = (f) ? a : 0;
    if (b) {
      o.setTransform({
        translateX: k,
        translateY: i
      })
    } else {
      o.set("left", k);
      o.set("top", i)
    }
    return Ext.fx.animation.Abstract.prototype.getData.apply(this,
      arguments)
  }
}, 0, 0, 0, 0, ["animation.slide", "animation.slideIn"], 0, [Ext.fx.animation,
  "Slide", Ext.fx.animation, "SlideIn"
], 0));
(Ext.cmd.derive("Ext.fx.animation.SlideOut", Ext.fx.animation.Slide, {
  config: {
    out: true
  }
}, 0, 0, 0, 0, ["animation.slideOut"], 0, [Ext.fx.animation, "SlideOut"], 0));
(Ext.cmd.derive("Ext.fx.animation.Fade", Ext.fx.animation.Abstract, {
  alternateClassName: "Ext.fx.animation.FadeIn",
  config: {
    out: false,
    before: {
      display: null,
      opacity: 0
    },
    after: {
      opacity: null
    },
    reverse: null
  },
  updateOut: function(a) {
    var c = this.getTo(),
      b = this.getFrom();
    if (a) {
      b.set("opacity", 1);
      c.set("opacity", 0)
    } else {
      b.set("opacity", 0);
      c.set("opacity", 1)
    }
  }
}, 0, 0, 0, 0, ["animation.fade", "animation.fadeIn"], 0, [Ext.fx.animation,
  "Fade", Ext.fx.animation, "FadeIn"
], 0));
(Ext.cmd.derive("Ext.fx.animation.FadeOut", Ext.fx.animation.Fade, {
  config: {
    out: true,
    before: {}
  }
}, 0, 0, 0, 0, ["animation.fadeOut"], 0, [Ext.fx.animation, "FadeOut"], 0));
(Ext.cmd.derive("Ext.fx.animation.Flip", Ext.fx.animation.Abstract, {
  config: {
    easing: "ease-in",
    direction: "right",
    half: false,
    out: null
  },
  getData: function() {
    var g = this,
      i = g.getFrom(),
      j = g.getTo(),
      h = g.getDirection(),
      b = g.getOut(),
      m = g.getHalf(),
      c = m ? 90 : 180,
      e = 1,
      a = 1,
      l = 0,
      k = 0,
      f = 0,
      d = 0;
    if (b) {
      a = 0.8
    } else {
      e = 0.8
    }
    switch (h) {
      case this.DIRECTION_UP:
        if (b) {
          f = c
        } else {
          l = -c
        }
        break;
      case this.DIRECTION_DOWN:
        if (b) {
          f = -c
        } else {
          l = c
        }
        break;
      case this.DIRECTION_RIGHT:
        if (b) {
          d = c
        } else {
          k = -c
        }
        break;
      case this.DIRECTION_LEFT:
        if (b) {
          d = -c
        } else {
          k = c
        }
        break
    }
    i.setTransform({
      rotateX: l,
      rotateY: k,
      scale: e
    });
    j.setTransform({
      rotateX: f,
      rotateY: d,
      scale: a
    });
    return Ext.fx.animation.Abstract.prototype.getData.call(this)
  }
}, 0, 0, 0, 0, ["animation.flip"], 0, [Ext.fx.animation, "Flip"], 0));
(Ext.cmd.derive("Ext.fx.animation.Pop", Ext.fx.animation.Abstract, {
  alternateClassName: "Ext.fx.animation.PopIn",
  config: {
    out: false,
    before: {
      display: null,
      opacity: 0
    },
    after: {
      opacity: null
    }
  },
  getData: function() {
    var c = this.getTo(),
      b = this.getFrom(),
      a = this.getOut();
    if (a) {
      b.set("opacity", 1);
      b.setTransform({
        scale: 1
      });
      c.set("opacity", 0);
      c.setTransform({
        scale: 0
      })
    } else {
      b.set("opacity", 0);
      b.setTransform({
        scale: 0
      });
      c.set("opacity", 1);
      c.setTransform({
        scale: 1
      })
    }
    return Ext.fx.animation.Abstract.prototype.getData.apply(this,
      arguments)
  }
}, 0, 0, 0, 0, ["animation.pop", "animation.popIn"], 0, [Ext.fx.animation,
  "Pop", Ext.fx.animation, "PopIn"
], 0));
(Ext.cmd.derive("Ext.fx.animation.PopOut", Ext.fx.animation.Pop, {
  config: {
    out: true,
    before: {}
  }
}, 0, 0, 0, 0, ["animation.popOut"], 0, [Ext.fx.animation, "PopOut"], 0));
(Ext.cmd.derive("Ext.fx.Animation", Ext.Base, {
  constructor: function(b) {
    var a = Ext.fx.animation.Abstract,
      c;
    if (typeof b == "string") {
      c = b;
      b = {}
    } else {
      if (b && b.type) {
        c = b.type
      }
    }
    if (c) {
      a = Ext.ClassManager.getByAlias("animation." + c)
    }
    return Ext.factory(b, a)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.fx, "Animation"], 0));
(Ext.cmd.derive("Ext.fx.runner.Css", Ext.Evented, {
  prefixedProperties: {
    transform: true,
    "transform-origin": true,
    perspective: true,
    "transform-style": true,
    transition: true,
    "transition-property": true,
    "transition-duration": true,
    "transition-timing-function": true,
    "transition-delay": true,
    animation: true,
    "animation-name": true,
    "animation-duration": true,
    "animation-iteration-count": true,
    "animation-direction": true,
    "animation-timing-function": true,
    "animation-delay": true
  },
  lengthProperties: {
    top: true,
    right: true,
    bottom: true,
    left: true,
    width: true,
    height: true,
    "max-height": true,
    "max-width": true,
    "min-height": true,
    "min-width": true,
    "margin-bottom": true,
    "margin-left": true,
    "margin-right": true,
    "margin-top": true,
    "padding-bottom": true,
    "padding-left": true,
    "padding-right": true,
    "padding-top": true,
    "border-bottom-width": true,
    "border-left-width": true,
    "border-right-width": true,
    "border-spacing": true,
    "border-top-width": true,
    "border-width": true,
    "outline-width": true,
    "letter-spacing": true,
    "line-height": true,
    "text-indent": true,
    "word-spacing": true,
    "font-size": true,
    translate: true,
    translateX: true,
    translateY: true,
    translateZ: true,
    translate3d: true
  },
  durationProperties: {
    "transition-duration": true,
    "transition-delay": true,
    "animation-duration": true,
    "animation-delay": true
  },
  angleProperties: {
    rotate: true,
    rotateX: true,
    rotateY: true,
    rotateZ: true,
    skew: true,
    skewX: true,
    skewY: true
  },
  lengthUnitRegex: /([a-z%]*)$/,
  DEFAULT_UNIT_LENGTH: "px",
  DEFAULT_UNIT_ANGLE: "deg",
  DEFAULT_UNIT_DURATION: "ms",
  formattedNameCache: {},
  transformMethods3d: ["translateX", "translateY", "translateZ", "rotate",
    "rotateX", "rotateY", "rotateZ", "skewX", "skewY", "scaleX", "scaleY",
    "scaleZ"
  ],
  transformMethodsNo3d: ["translateX", "translateY", "rotate", "skewX",
    "skewY", "scaleX", "scaleY"
  ],
  constructor: function() {
    var a = this;
    a.transformMethods = Ext.feature.has.Css3dTransforms ? a.transformMethods3d :
      a.transformMethodsNo3d;
    a.vendorPrefix = Ext.browser.getStyleDashPrefix();
    a.ruleStylesCache = {};
    Ext.Evented.prototype.constructor.call(this)
  },
  getStyleSheet: function() {
    var c = this.styleSheet,
      a, b;
    if (!c) {
      a = document.createElement("style");
      a.type = "text/css";
      (document.head || document.getElementsByTagName("head")[0]).appendChild
        (a);
      b = document.styleSheets;
      this.styleSheet = c = b[b.length - 1]
    }
    return c
  },
  applyRules: function(i) {
    var g = this.getStyleSheet(),
      k = this.ruleStylesCache,
      j = g.cssRules,
      c, e, h, b, d, a, f;
    for (c in i) {
      e = i[c];
      h = k[c];
      if (h === undefined) {
        d = j.length;
        g.insertRule(c + "{}", d);
        h = k[c] = j.item(d).style
      }
      b = h.$cache;
      if (!b) {
        b = h.$cache = {}
      }
      for (a in e) {
        f = this.formatValue(e[a], a);
        a = this.formatName(a);
        if (b[a] !== f) {
          b[a] = f;
          if (f === null) {
            h.removeProperty(a)
          } else {
            h.setProperty(a, f, "important")
          }
        }
      }
    }
    return this
  },
  applyStyles: function(d) {
    var g, c, f, b, a, e;
    for (g in d) {
      if (d.hasOwnProperty(g)) {
        c = document.getElementById(g);
        if (!c) {
          continue
        }
        f = c.style;
        b = d[g];
        for (a in b) {
          if (b.hasOwnProperty(a)) {
            e = this.formatValue(b[a], a);
            a = this.formatName(a);
            if (e === null) {
              f.removeProperty(a)
            } else {
              f.setProperty(a, e, "important")
            }
          }
        }
      }
    }
    return this
  },
  formatName: function(b) {
    var a = this.formattedNameCache,
      c = a[b];
    if (!c) {
      if ((Ext.os.is.Tizen || !Ext.feature.has.CssTransformNoPrefix) &&
        this.prefixedProperties[b]) {
        c = this.vendorPrefix + b
      } else {
        c = b
      }
      a[b] = c
    }
    return c
  },
  formatValue: function(j, b) {
    var g = typeof j,
      l = this.DEFAULT_UNIT_LENGTH,
      e, a, d, f, c, k, h;
    if (j === null) {
      return ""
    }
    if (g == "string") {
      if (this.lengthProperties[b]) {
        h = j.match(this.lengthUnitRegex)[1];
        if (h.length > 0) {} else {
          return j + l
        }
      }
      return j
    } else {
      if (g == "number") {
        if (j == 0) {
          return "0"
        }
        if (this.lengthProperties[b]) {
          return j + l
        }
        if (this.angleProperties[b]) {
          return j + this.DEFAULT_UNIT_ANGLE
        }
        if (this.durationProperties[b]) {
          return j + this.DEFAULT_UNIT_DURATION
        }
      } else {
        if (b === "transform") {
          e = this.transformMethods;
          c = [];
          for (d = 0, f = e.length; d < f; d++) {
            a = e[d];
            c.push(a + "(" + this.formatValue(j[a], a) + ")")
          }
          return c.join(" ")
        } else {
          if (Ext.isArray(j)) {
            k = [];
            for (d = 0, f = j.length; d < f; d++) {
              k.push(this.formatValue(j[d], b))
            }
            return (k.length > 0) ? k.join(", ") : "none"
          }
        }
      }
    }
    return j
  }
}, 1, 0, 0, 0, 0, 0, [Ext.fx.runner, "Css"], 0));
(Ext.cmd.derive("Ext.fx.runner.CssTransition", Ext.fx.runner.Css, {
  alternateClassName: "Ext.Animator",
  singleton: true,
  listenersAttached: false,
  constructor: function() {
    this.runningAnimationsData = {};
    return this.callParent(arguments)
  },
  attachListeners: function() {
    this.listenersAttached = true;
    Ext.getWin().on("transitionend", "onTransitionEnd", this)
  },
  onTransitionEnd: function(b) {
    var a = b.target,
      c = a.id;
    if (c && this.runningAnimationsData.hasOwnProperty(c)) {
      this.refreshRunningAnimationsData(Ext.get(a), [b.browserEvent.propertyName])
    }
  },
  onAnimationEnd: function(g, f, d, j, n) {
    var c = g.getId(),
      k = this.runningAnimationsData[c],
      o = {},
      m = {},
      b, h, e, l, a;
    d.un("stop", "onAnimationStop", this);
    if (k) {
      b = k.nameMap
    }
    o[c] = m;
    if (f.onBeforeEnd) {
      f.onBeforeEnd.call(f.scope || this, g, j)
    }
    d.fireEvent("animationbeforeend", d, g, j);
    this.fireEvent("animationbeforeend", this, d, g, j);
    if (n || (!j && !f.preserveEndState)) {
      h = f.toPropertyNames;
      for (e = 0, l = h.length; e < l; e++) {
        a = h[e];
        if (b && !b.hasOwnProperty(a)) {
          m[a] = null
        }
      }
    }
    if (f.after) {
      Ext.merge(m, f.after)
    }
    this.applyStyles(o);
    if (f.onEnd) {
      f.onEnd.call(f.scope || this, g, j)
    }
    d.fireEvent("animationend", d, g, j);
    this.fireEvent("animationend", this, d, g, j);
    Ext.AnimationQueue.stop(Ext.emptyFn, d)
  },
  onAllAnimationsEnd: function(b) {
    var c = b.getId(),
      a = {};
    delete this.runningAnimationsData[c];
    a[c] = {
      "transition-property": null,
      "transition-duration": null,
      "transition-timing-function": null,
      "transition-delay": null
    };
    this.applyStyles(a);
    this.fireEvent("animationallend", this, b)
  },
  hasRunningAnimations: function(a) {
    var c = a.getId(),
      b = this.runningAnimationsData;
    return b.hasOwnProperty(c) && b[c].sessions.length > 0
  },
  refreshRunningAnimationsData: function(d, k, t, p) {
    var g = d.getId(),
      q = this.runningAnimationsData,
      a = q[g];
    if (!a) {
      return
    }
    var m = a.nameMap,
      s = a.nameList,
      b = a.sessions,
      f, h, e, u, l, c, r, o, n = false;
    t = Boolean(t);
    p = Boolean(p);
    if (!b) {
      return this
    }
    f = b.length;
    if (f === 0) {
      return this
    }
    if (p) {
      a.nameMap = {};
      s.length = 0;
      for (l = 0; l < f; l++) {
        c = b[l];
        this.onAnimationEnd(d, c.data, c.animation, t, p)
      }
      b.length = 0
    } else {
      for (l = 0; l < f; l++) {
        c = b[l];
        r = c.map;
        o = c.list;
        for (h = 0, e = k.length; h < e; h++) {
          u = k[h];
          if (r[u]) {
            delete r[u];
            Ext.Array.remove(o, u);
            c.length--;
            if (--m[u] == 0) {
              delete m[u];
              Ext.Array.remove(s, u)
            }
          }
        }
        if (c.length == 0) {
          b.splice(l, 1);
          l--;
          f--;
          n = true;
          this.onAnimationEnd(d, c.data, c.animation, t)
        }
      }
    }
    if (!p && !t && b.length == 0 && n) {
      this.onAllAnimationsEnd(d)
    }
  },
  getRunningData: function(b) {
    var a = this.runningAnimationsData;
    if (!a.hasOwnProperty(b)) {
      a[b] = {
        nameMap: {},
        nameList: [],
        sessions: []
      }
    }
    return a[b]
  },
  getTestElement: function() {
    var c = this.testElement,
      b, d, a;
    if (!c) {
      b = document.createElement("iframe");
      b.setAttribute("tabIndex", -1);
      a = b.style;
      a.setProperty("visibility", "hidden", "important");
      a.setProperty("width", "0px", "important");
      a.setProperty("height", "0px", "important");
      a.setProperty("position", "absolute", "important");
      a.setProperty("border", "0px", "important");
      a.setProperty("zIndex", "-1000", "important");
      document.body.appendChild(b);
      d = b.contentDocument;
      d.open();
      d.writeln("</body>");
      d.close();
      this.testElement = c = d.createElement("div");
      c.style.setProperty("position", "absolute", "important");
      d.body.appendChild(c);
      this.testElementComputedStyle = window.getComputedStyle(c)
    }
    return c
  },
  getCssStyleValue: function(b, e) {
    var d = this.getTestElement(),
      a = this.testElementComputedStyle,
      c = d.style;
    c.setProperty(b, e);
    if (Ext.browser.is.Firefox) {
      d.offsetHeight
    }
    e = a.getPropertyValue(b);
    c.removeProperty(b);
    return e
  },
  run: function(q) {
    var G = this,
      h = G.lengthProperties,
      y = {},
      F = {},
      H = {},
      d, t, z, e, v, J, w, r, s, a, n, B, A, p, C, l, u, g, D, I, k, f, x,
      o, c, E, b, m;
    if (!G.listenersAttached) {
      G.attachListeners()
    }
    q = Ext.Array.from(q);
    for (B = 0, p = q.length; B < p; B++) {
      C = q[B];
      C = Ext.factory(C, Ext.fx.Animation);
      d = C.getElement();
      Ext.AnimationQueue.start(Ext.emptyFn, C);
      g = window.getComputedStyle(d.dom);
      t = d.getId();
      H = Ext.merge({}, C.getData());
      if (C.onBeforeStart) {
        C.onBeforeStart.call(C.scope || G, d)
      }
      C.fireEvent("animationstart", C);
      G.fireEvent("animationstart", G, C);
      H[t] = H;
      v = H.before;
      z = H.from;
      e = H.to;
      H.fromPropertyNames = J = [];
      H.toPropertyNames = w = [];
      for (I in e) {
        if (e.hasOwnProperty(I)) {
          e[I] = k = G.formatValue(e[I], I);
          D = G.formatName(I);
          o = h.hasOwnProperty(I);
          if (!o) {
            k = G.getCssStyleValue(D, k)
          }
          if (z.hasOwnProperty(I)) {
            z[I] = x = G.formatValue(z[I], I);
            if (!o) {
              x = G.getCssStyleValue(D, x)
            }
            if (k !== x) {
              J.push(D);
              w.push(D)
            }
          } else {
            f = g.getPropertyValue(D);
            if (k !== f) {
              w.push(D)
            }
          }
        }
      }
      l = w.length;
      if (l === 0) {
        G.onAnimationEnd(d, H, C);
        continue
      }
      a = G.getRunningData(t);
      b = a.sessions;
      if (b.length > 0) {
        G.refreshRunningAnimationsData(d, Ext.Array.merge(J, w), true, H.replacePrevious)
      }
      c = a.nameMap;
      E = a.nameList;
      u = {};
      for (A = 0; A < l; A++) {
        I = w[A];
        u[I] = true;
        if (!c.hasOwnProperty(I)) {
          c[I] = 1;
          E.push(I)
        } else {
          c[I]++
        }
      }
      m = {
        element: d,
        map: u,
        list: w.slice(),
        length: l,
        data: H,
        animation: C
      };
      b.push(m);
      C.on("stop", "onAnimationStop", G);
      n = Ext.apply({}, v);
      Ext.apply(n, z);
      if (E.length > 0) {
        J = Ext.Array.difference(E, J);
        w = Ext.Array.merge(J, w);
        n["transition-property"] = J
      }
      y[t] = n;
      F[t] = Ext.apply({}, e);
      F[t]["transition-property"] = w;
      F[t]["transition-duration"] = H.duration;
      F[t]["transition-timing-function"] = H.easing;
      F[t]["transition-delay"] = H.delay;
      C.startTime = Date.now()
    }
    s = G.$className;
    G.applyStyles(y);
    r = function(i) {
      if (i.data === s && i.source === window) {
        window.removeEventListener("message", r, false);
        G.applyStyles(F)
      }
    };
    if (Ext.browser.is.IE) {
      Ext.Function.requestAnimationFrame(function() {
        window.addEventListener("message", r, false);
        window.postMessage(s, "*")
      })
    } else {
      window.addEventListener("message", r, false);
      window.postMessage(s, "*")
    }
  },
  onAnimationStop: function(d) {
    var f = this.runningAnimationsData,
      h, a, g, b, c, e;
    for (h in f) {
      if (f.hasOwnProperty(h)) {
        a = f[h];
        g = a.sessions;
        for (b = 0, c = g.length; b < c; b++) {
          e = g[b];
          if (e.animation === d) {
            this.refreshRunningAnimationsData(e.element, e.list.slice(),
              false)
          }
        }
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.fx.runner, "CssTransition", Ext, "Animator"], 0));
(Ext.cmd.derive("Ext.mixin.Container", Ext.Mixin, {
  mixinConfig: {
    id: "container"
  },
  isContainer: true,
  config: {
    referenceHolder: false
  },
  getReferences: function() {
    Ext.ComponentManager.fixReferences();
    return this.refs || null
  },
  lookupReference: function(b) {
    var a = this.getReferences();
    return (a && a[b]) || null
  },
  privates: {
    attachReference: function(b) {
      var d = this,
        c, a;
      if (d.destroying || d.destroyed) {
        return
      }
      a = d.refs || (d.refs = {});
      c = b.referenceKey;
      a[c] = b
    },
    clearReference: function(b) {
      var a = this.refs,
        c = b.referenceKey;
      if (a && c) {
        b.viewModelKey = b.referenceKey = a[c] = null
      }
    },
    containerOnAdded: function(b, a) {
      if (a) {
        Ext.ComponentManager.markReferencesDirty()
      }
    },
    containerOnRemoved: function(a) {
      var b;
      if (!a) {
        b = this.lookupReferenceHolder();
        if (b) {
          Ext.ComponentManager.markReferencesDirty();
          b.clearReferences()
        }
      }
    },
    clearReferences: function() {
      this.refs = null
    },
    initContainerInheritedState: function(e, c) {
      var g = this,
        b = g.getController(),
        h = g.getSession(),
        d = g.getConfig("viewModel", true),
        a = g.getReference(),
        f = g.getReferenceHolder();
      if (b) {
        e.referenceHolder = b;
        f = true
      } else {
        if (f) {
          e.referenceHolder = g
        }
      }
      if (f) {
        e.referencePath = ""
      } else {
        if (a && g.isParentReference) {
          e.referencePath = g.referenceKey + "."
        }
      }
      if (h) {
        e.session = h
      }
      if (d) {
        e.viewModelPath = ""
      } else {
        if (a && g.isParentReference) {
          e.viewModelPath = g.viewModelKey + "."
        }
      }
    },
    setupReference: function(b) {
      var a;
      if (b && b.charAt(a = b.length - 1) === ">") {
        this.isParentReference = true;
        b = b.substring(0, a)
      }
      return b
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.mixin, "Container"], 0));
(Ext.cmd.derive("Ext.mixin.Responsive", Ext.Mixin, function(a) {
  return {
    mixinConfig: {
      id: "responsive",
      after: {
        destroy: "destroy"
      }
    },
    config: {
      responsiveConfig: {
        $value: undefined,
        merge: function(g, c, f, e) {
          if (!g) {
            return c
          }
          var b = c ? Ext.Object.chain(c) : {},
            d;
          for (d in g) {
            if (!e || !(d in b)) {
              b[d] = {
                fn: null,
                config: g[d]
              }
            }
          }
          return b
        }
      },
      responsiveFormulas: {
        $value: 0,
        merge: function(e, b, d, c) {
          return this.mergeNew(e, b, d, c)
        }
      }
    },
    destroy: function() {
      a.unregister(this);
      this.callParent()
    },
    privates: {
      statics: {
        active: false,
        all: {},
        context: Ext.Object.chain(Ext.platformTags),
        count: 0,
        nextId: 0,
        activate: function() {
          a.active = true;
          a.updateContext();
          Ext.on("resize", a.onResize, a)
        },
        deactivate: function() {
          a.active = false;
          Ext.un("resize", a.onResize, a)
        },
        notify: function() {
          var d = a.all,
            c = a.context,
            b = Ext.GlobalEvents,
            f = a.timer,
            e;
          if (f) {
            a.timer = null;
            Ext.Function.cancelAnimationFrame(f)
          }
          a.updateContext();
          Ext.suspendLayouts();
          b.fireEvent("beforeresponsiveupdate", c);
          for (e in d) {
            d[e].setupResponsiveContext()
          }
          b.fireEvent("beginresponsiveupdate", c);
          for (e in d) {
            d[e].updateResponsiveState()
          }
          b.fireEvent("responsiveupdate", c);
          Ext.resumeLayouts(true)
        },
        onResize: function() {
          if (!a.timer) {
            a.timer = Ext.Function.requestAnimationFrame(a.onTimer)
          }
        },
        onTimer: function() {
          a.timer = null;
          a.notify()
        },
        processConfig: function(b, h, f) {
          var g = h && h[f],
            e = b.config,
            c, d;
          if (g) {
            d = b.getConfigurator();
            c = d.configs[f];
            e[f] = c.merge(g, e[f], b)
          }
        },
        register: function(b) {
          var c = b.$responsiveId;
          if (!c) {
            b.$responsiveId = c = ++a.nextId;
            a.all[c] = b;
            if (++a.count === 1) {
              a.activate()
            }
          }
        },
        unregister: function(b) {
          var c = b.$responsiveId;
          if (c in a.all) {
            b.$responsiveId = null;
            delete a.all[c];
            if (--a.count === 0) {
              a.deactivate()
            }
          }
        },
        updateContext: function() {
          var e = Ext.Element,
            d = e.getViewportWidth(),
            b = e.getViewportHeight(),
            c = a.context;
          c.width = d;
          c.height = b;
          c.tall = d < b;
          c.wide = !c.tall;
          c.landscape = c.portrait = false;
          if (!c.platform) {
            c.platform = Ext.platformTags
          }
          c[Ext.dom.Element.getOrientation()] = true
        }
      },
      afterClassMixedIn: function(f) {
        var e = f.prototype,
          b = e.responsiveConfig,
          d = e.responsiveFormulas,
          c;
        if (b || d) {
          c = {};
          if (b) {
            delete e.responsiveConfig;
            c.responsiveConfig = b
          }
          if (d) {
            delete e.responsiveFormulas;
            c.responsiveFormulas = d
          }
          f.getConfigurator().add(c)
        }
      },
      applyResponsiveConfig: function(c) {
        for (var b in c) {
          c[b].fn = Ext.createRuleFn(b)
        }
        return c
      },
      applyResponsiveFormulas: function(d) {
        var c = {},
          e, b;
        if (d) {
          for (b in d) {
            if (Ext.isString(e = d[b])) {
              e = Ext.createRuleFn(e)
            }
            c[b] = e
          }
        }
        return c
      },
      getResponsiveState: function() {
        var c = a.context,
          f = this.getResponsiveConfig(),
          b = {},
          d, e;
        if (f) {
          for (e in f) {
            d = f[e];
            if (d.fn.call(this, c)) {
              Ext.merge(b, d.config)
            }
          }
        }
        return b
      },
      setupResponsiveContext: function() {
        var c = this.getResponsiveFormulas(),
          d = a.context,
          b;
        if (c) {
          for (b in c) {
            d[b] = c[b].call(this, d)
          }
        }
      },
      transformInstanceConfig: function(d) {
        var c = this,
          b;
        a.register(c);
        if (d) {
          a.processConfig(c, d, "responsiveConfig");
          a.processConfig(c, d, "responsiveFormulas")
        }
        c.setupResponsiveContext();
        b = c.getResponsiveState();
        if (d) {
          b = Ext.merge({}, d, b);
          delete b.responsiveConfig;
          delete b.responsiveFormulas
        }
        return b
      },
      updateResponsiveState: function() {
        var b = this.getResponsiveState();
        this.setConfig(b)
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.mixin, "Responsive"], 0));
(Ext.cmd.derive("Ext.perf.Accumulator", Ext.Base, function() {
  var c = null,
    g = Ext.global.chrome,
    d, b = function() {
      b = Ext.now;
      var j, k;
      if (Ext.isChrome && g && g.Interval) {
        j = new g.Interval();
        j.start();
        b = function() {
          return j.microseconds() / 1000
        }
      } else {
        if (window.ActiveXObject) {
          try {
            k = new ActiveXObject("SenchaToolbox.Toolbox");
            Ext.senchaToolbox = k;
            b = function() {
              return k.milliseconds
            }
          } catch (l) {}
        }
      }
      Ext.perf.getTimestamp = Ext.perf.Accumulator.getTimestamp = b;
      return b()
    };

  function h(k, j) {
    k.sum += j;
    k.min = Math.min(k.min, j);
    k.max = Math.max(k.max, j)
  }

  function e(m) {
    var k = m ? m : (b() - this.time),
      l = this,
      j = l.accum;
    ++j.count;
    if (!--j.depth) {
      h(j.total, k)
    }
    h(j.pure, k - l.childTime);
    c = l.parent;
    if (c) {
      ++c.accum.childCount;
      c.childTime += k
    }
  }

  function a() {
    return {
      min: Number.MAX_VALUE,
      max: 0,
      sum: 0
    }
  }

  function i(k, j) {
    return function() {
      var m = k.enter(),
        l = j.apply(this, arguments);
      m.leave();
      return l
    }
  }

  function f(l, k, j, n) {
    var m = {
      avg: 0,
      min: n.min,
      max: n.max,
      sum: 0
    };
    if (l) {
      j = j || 0;
      m.sum = n.sum - k * j;
      m.avg = m.sum / l
    }
    return m
  }
  return {
    constructor: function(j) {
      var k = this;
      k.count = k.childCount = k.depth = k.maxDepth = 0;
      k.pure = a();
      k.total = a();
      k.name = j
    },
    statics: {
      getTimestamp: b
    },
    format: function(j) {
      if (!d) {
        d = new Ext.XTemplate(["{name} - {count} call(s)",
          '<tpl if="count">', '<tpl if="childCount">',
          " ({childCount} children)", "</tpl>",
          '<tpl if="depth - 1">', " ({depth} deep)", "</tpl>",
          '<tpl for="times">',
          ", {type}: {[this.time(values.sum)]} msec (",
          "avg={[this.time(values.sum / parent.count)]}", ")",
          "</tpl>", "</tpl>"
        ].join(""), {
          time: function(l) {
            return Math.round(l * 100) / 100
          }
        })
      }
      var k = this.getData(j);
      k.name = this.name;
      k.pure.type = "Pure";
      k.total.type = "Total";
      k.times = [k.pure, k.total];
      return d.apply(k)
    },
    getData: function(j) {
      var k = this;
      return {
        count: k.count,
        childCount: k.childCount,
        depth: k.maxDepth,
        pure: f(k.count, k.childCount, j, k.pure),
        total: f(k.count, k.childCount, j, k.total)
      }
    },
    enter: function() {
      var j = this,
        k = {
          accum: j,
          leave: e,
          childTime: 0,
          parent: c
        };
      ++j.depth;
      if (j.maxDepth < j.depth) {
        j.maxDepth = j.depth
      }
      c = k;
      k.time = b();
      return k
    },
    monitor: function(l, k, j) {
      var m = this.enter();
      if (j) {
        l.apply(k, j)
      } else {
        l.call(k)
      }
      m.leave()
    },
    report: function() {
      Ext.log(this.format())
    },
    tap: function(r, t) {
      var s = this,
        m = typeof t === "string" ? [t] : t,
        q, u, o, n, l, k, j, p;
      p = function() {
        if (typeof r === "string") {
          q = Ext.global;
          n = r.split(".");
          for (o = 0, l = n.length; o < l; ++o) {
            q = q[n[o]]
          }
        } else {
          q = r
        }
        for (o = 0, l = m.length; o < l; ++o) {
          k = m[o];
          u = k.charAt(0) === "!";
          if (u) {
            k = k.substring(1)
          } else {
            u = !(k in q.prototype)
          }
          j = u ? q : q.prototype;
          j[k] = i(s, j[k])
        }
      };
      Ext.ClassManager.onCreated(p, s, r);
      return s
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.perf, "Accumulator"], function() {
  Ext.perf.getTimestamp = this.getTimestamp
}));
(Ext.cmd.derive("Ext.perf.Monitor", Ext.Base, {
  singleton: true,
  alternateClassName: "Ext.Perf",
  constructor: function() {
    this.accumulators = [];
    this.accumulatorsByName = {}
  },
  calibrate: function() {
    var b = new Ext.perf.Accumulator("$"),
      f = b.total,
      c = Ext.perf.Accumulator.getTimestamp,
      e = 0,
      g, a, d;
    d = c();
    do {
      g = b.enter();
      g.leave();
      ++e
    } while (f.sum < 100);
    a = c();
    return (a - d) / e
  },
  get: function(b) {
    var c = this,
      a = c.accumulatorsByName[b];
    if (!a) {
      c.accumulatorsByName[b] = a = new Ext.perf.Accumulator(b);
      c.accumulators.push(a)
    }
    return a
  },
  enter: function(a) {
    return this.get(a).enter()
  },
  monitor: function(a, c, b) {
    this.get(a).monitor(c, b)
  },
  report: function() {
    var c = this,
      b = c.accumulators,
      a = c.calibrate();
    b.sort(function(e, d) {
      return (e.name < d.name) ? -1 : ((d.name < e.name) ? 1 : 0)
    });
    c.updateGC();
    Ext.log("Calibration: " + Math.round(a * 100) / 100 + " msec/sample");
    Ext.each(b, function(d) {
      Ext.log(d.format(a))
    })
  },
  getData: function(c) {
    var b = {},
      a = this.accumulators;
    Ext.each(a, function(d) {
      if (c || d.count) {
        b[d.name] = d.getData()
      }
    });
    return b
  },
  reset: function() {
    Ext.each(this.accumulators, function(a) {
      var b = a;
      b.count = b.childCount = b.depth = b.maxDepth = 0;
      b.pure = {
        min: Number.MAX_VALUE,
        max: 0,
        sum: 0
      };
      b.total = {
        min: Number.MAX_VALUE,
        max: 0,
        sum: 0
      }
    })
  },
  updateGC: function() {
    var a = this.accumulatorsByName.GC,
      b = Ext.senchaToolbox,
      c;
    if (a) {
      a.count = b.garbageCollectionCounter || 0;
      if (a.count) {
        c = a.pure;
        a.total.sum = c.sum = b.garbageCollectionMilliseconds;
        c.min = c.max = c.sum / a.count;
        c = a.total;
        c.min = c.max = c.sum / a.count
      }
    }
  },
  watchGC: function() {
    Ext.perf.getTimestamp();
    var a = Ext.senchaToolbox;
    if (a) {
      this.get("GC");
      a.watchGarbageCollector(false)
    }
  },
  setup: function(c) {
    if (!c) {
      c = {
        render: {
          "Ext.Component": "render"
        },
        layout: {
          "Ext.layout.Context": "run"
        }
      }
    }
    this.currentConfig = c;
    var d, f, b, e, a;
    for (d in c) {
      if (c.hasOwnProperty(d)) {
        f = c[d];
        b = Ext.Perf.get(d);
        for (e in f) {
          if (f.hasOwnProperty(e)) {
            a = f[e];
            b.tap(e, a)
          }
        }
      }
    }
    this.watchGC()
  }
}, 1, 0, 0, 0, 0, 0, [Ext.perf, "Monitor", Ext, "Perf"], 0));
(Ext.cmd.derive("Ext.plugin.Abstract", Ext.Base, {
  alternateClassName: "Ext.AbstractPlugin",
  isPlugin: true,
  constructor: function(a) {
    if (a) {
      this.pluginConfig = a;
      this.initConfig(a)
    }
  },
  clonePlugin: function(a) {
    return new this.self(Ext.apply({}, a, this.pluginConfig))
  },
  setCmp: function(a) {
    this.cmp = a
  },
  getCmp: function() {
    return this.cmp
  },
  init: Ext.emptyFn,
  destroy: function() {
    this.cmp = this.pluginConfig = null;
    this.callParent()
  },
  onClassExtended: function(b, d, a) {
    var c = d.alias;
    if (c && !d.ptype) {
      if (Ext.isArray(c)) {
        c = c[0]
      }
      b.prototype.ptype = c.split("plugin.")[1]
    }
  },
  resolveListenerScope: function(d) {
    var c = this,
      b = c.getCmp(),
      a;
    if (b) {
      a = b.resolveSatelliteListenerScope(c, d)
    }
    return a || c.mixins.observable.resolveListenerScope.call(c, d)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.plugin, "Abstract", Ext, "AbstractPlugin"], 0));
Ext.define("Ext.overrides.plugin.Abstract", {
  override: "Ext.plugin.Abstract",
  $configStrict: false,
  $configPrefixed: false,
  disabled: false,
  getState: null,
  applyState: null,
  enable: function() {
    this.disabled = false
  },
  disable: function() {
    this.disabled = true
  }
});
(Ext.cmd.derive("Ext.util.ItemCollection", Ext.util.MixedCollection, {
  alternateClassName: "Ext.ItemCollection",
  getKey: function(a) {
    return a.getItemId && a.getItemId()
  },
  has: function(a) {
    return this.map.hasOwnProperty(a.getId())
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util, "ItemCollection", Ext, "ItemCollection"], 0));
(Ext.cmd.derive("Ext.util.TaskManager", Ext.util.TaskRunner, {
  alternateClassName: ["Ext.TaskManager"],
  singleton: true
}, 0, 0, 0, 0, 0, 0, [Ext.util, "TaskManager", Ext, "TaskManager"], 0));
(Ext.cmd.derive("Ext.util.TextMetrics", Ext.Base, {
  statics: {
    shared: null,
    measure: function(a, d, e) {
      var b = this,
        c = b.shared;
      if (!c) {
        c = b.shared = new b(a, e)
      }
      c.bind(a);
      c.setFixedWidth(e || "auto");
      return c.getSize(d)
    },
    destroy: function() {
      var a = this;
      Ext.destroy(a.shared);
      a.shared = null
    }
  },
  constructor: function(a, d) {
    var c = this,
      b = Ext.getBody().createChild({
        role: "presentation",
        cls: "x-textmetrics"
      });
    b.setVisibilityMode(1);
    c.measure = b;
    if (a) {
      c.bind(a)
    }
    b.position("absolute");
    b.setLocalXY(-1000, -1000);
    b.hide();
    if (d) {
      b.setWidth(d)
    }
  },
  getSize: function(c) {
    var b = this.measure,
      a;
    b.setHtml(c);
    a = b.getSize();
    b.setHtml("");
    return a
  },
  bind: function(a) {
    var b = this;
    b.el = Ext.get(a);
    b.measure.setStyle(b.el.getStyle(["font-size", "font-style",
      "font-weight", "font-family", "line-height", "text-transform",
      "letter-spacing", "word-break"
    ]))
  },
  setFixedWidth: function(a) {
    this.measure.setWidth(a)
  },
  getWidth: function(a) {
    this.measure.dom.style.width = "auto";
    return this.getSize(a).width
  },
  getHeight: function(a) {
    return this.getSize(a).height
  },
  destroy: function() {
    var a = this;
    a.el = a.measure = Ext.destroy(a.measure);
    a.callParent()
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "TextMetrics"], function() {
  Ext.Element.override({
    getTextWidth: function(c, b, a) {
      return Ext.Number.constrain(Ext.util.TextMetrics.measure(this.dom,
          Ext.valueFrom(c, this.dom.innerHTML, true)).width, b || 0,
        a || 1000000)
    }
  })
}));
(Ext.cmd.derive("Ext.ElementLoader", Ext.Base, {
  statics: {
    Renderer: {
      Html: function(a, b, c) {
        a.getTarget().setHtml(b.responseText, c.scripts === true);
        return true
      }
    }
  },
  url: null,
  params: null,
  baseParams: null,
  autoLoad: false,
  target: null,
  loadMask: false,
  ajaxOptions: null,
  scripts: false,
  isLoader: true,
  constructor: function(b) {
    var c = this,
      a;
    c.mixins.observable.constructor.call(c, b);
    c.setTarget(c.target);
    if (c.autoLoad) {
      a = c.autoLoad;
      if (a === true) {
        a = null
      }
      c.load(a)
    }
  },
  setTarget: function(b) {
    var a = this;
    b = Ext.get(b);
    if (a.target && a.target !== b) {
      a.abort()
    }
    a.target = b
  },
  getTarget: function() {
    return this.target || null
  },
  abort: function() {
    var a = this.active;
    if (a !== undefined) {
      Ext.Ajax.abort(a.request);
      if (a.mask) {
        this.removeMask()
      }
      delete this.active
    }
  },
  removeMask: function() {
    this.target.unmask()
  },
  addMask: function(a) {
    this.target.mask(a === true ? null : a)
  },
  load: function(c) {
    c = Ext.apply({}, c);
    var e = this,
      a = Ext.isDefined(c.loadMask) ? c.loadMask : e.loadMask,
      f = Ext.apply({}, c.params),
      b = Ext.apply({}, c.ajaxOptions),
      h = c.callback || e.callback,
      d = c.scope || e.scope || e,
      g = c.rendererScope || e.rendererScope || e;
    Ext.applyIf(b, e.ajaxOptions);
    Ext.applyIf(c, b);
    Ext.applyIf(f, e.params);
    Ext.apply(f, e.baseParams);
    Ext.applyIf(c, {
      url: e.url
    });
    Ext.apply(c, {
      scope: e,
      params: f,
      callback: e.onComplete
    });
    if (e.fireEvent("beforeload", e, c) === false) {
      return
    }
    if (a) {
      e.addMask(a)
    }
    e.active = {
      options: c,
      mask: a,
      scope: d,
      rendererScope: g,
      callback: h,
      success: c.success || e.success,
      failure: c.failure || e.failure,
      renderer: c.renderer || e.renderer,
      scripts: Ext.isDefined(c.scripts) ? c.scripts : e.scripts
    };
    e.active.request = Ext.Ajax.request(c);
    e.setOptions(e.active, c)
  },
  setOptions: Ext.emptyFn,
  onComplete: function(b, f, a) {
    var d = this,
      e = d.active,
      g, c;
    if (e) {
      c = e.scope;
      g = e.rendererScope;
      if (f) {
        f = d.getRenderer(e.renderer).call(g, d, a, e) !== false
      }
      if (f) {
        Ext.callback(e.success, c, [d, a, b]);
        d.fireEvent("load", d, a, b)
      } else {
        Ext.callback(e.failure, c, [d, a, b]);
        d.fireEvent("exception", d, a, b)
      }
      Ext.callback(e.callback, c, [d, f, a, b]);
      if (e.mask) {
        d.removeMask()
      }
    }
    delete d.active
  },
  getRenderer: function(a) {
    if (Ext.isFunction(a)) {
      return a
    }
    return this.statics().Renderer.Html
  },
  startAutoRefresh: function(a, b) {
    var c = this;
    c.stopAutoRefresh();
    c.autoRefresh = Ext.interval(function() {
      c.load(b)
    }, a)
  },
  stopAutoRefresh: function() {
    clearInterval(this.autoRefresh);
    delete this.autoRefresh
  },
  isAutoRefreshing: function() {
    return Ext.isDefined(this.autoRefresh)
  },
  destroy: function() {
    var a = this;
    a.stopAutoRefresh();
    delete a.target;
    a.abort();
    a.callParent()
  }
}, 1, 0, 0, 0, 0, [
  [Ext.util.Observable.prototype.mixinId || Ext.util.Observable.$className,
    Ext.util.Observable
  ]
], [Ext, "ElementLoader"], 0));
(Ext.cmd.derive("Ext.ComponentLoader", Ext.ElementLoader, {
  statics: {
    Renderer: {
      Data: function(a, b, d) {
        var f = true;
        try {
          a.getTarget().update(Ext.decode(b.responseText))
        } catch (c) {
          f = false
        }
        return f
      },
      Component: function(a, c, g) {
        var h = true,
          f = a.getTarget(),
          b = [];
        try {
          b = Ext.decode(c.responseText)
        } catch (d) {
          h = false
        }
        if (h) {
          f.suspendLayouts();
          if (g.removeAll) {
            f.removeAll()
          }
          f.add(b);
          f.resumeLayouts(true)
        }
        return h
      }
    }
  },
  target: null,
  loadOnRender: false,
  loadMask: false,
  renderer: "html",
  setTarget: function(b) {
    var a = this;
    if (Ext.isString(b)) {
      b = Ext.getCmp(b)
    }
    if (a.target && a.target !== b) {
      a.abort()
    }
    a.target = b;
    if (b && a.loadOnRender) {
      if (b.rendered) {
        a.doLoadOnRender()
      } else {
        a.mon(b, "render", a.doLoadOnRender, a)
      }
    }
  },
  doLoadOnRender: function() {
    var a = this.loadOnRender;
    this.load(Ext.isObject(a) ? a : null)
  },
  removeMask: function() {
    this.target.setLoading(false)
  },
  addMask: function(a) {
    this.target.setLoading(a)
  },
  setOptions: function(b, a) {
    b.removeAll = Ext.isDefined(a.removeAll) ? a.removeAll : this.removeAll
  },
  getRenderer: function(b) {
    if (Ext.isFunction(b)) {
      return b
    }
    var a = this.statics().Renderer;
    switch (b) {
      case "component":
        return a.Component;
      case "data":
        return a.Data;
      default:
        return Ext.ElementLoader.Renderer.Html
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext, "ComponentLoader"], 0));
(Ext.cmd.derive("Ext.layout.SizeModel", Ext.Base, {
  constructor: function(c) {
    var e = this,
      d = e.self,
      a = d.sizeModelsArray,
      b;
    Ext.apply(e, c);
    e[b = e.name] = true;
    e.fixed = !(e.auto = e.natural || e.shrinkWrap);
    a[e.ordinal = a.length] = d[b] = d.sizeModels[b] = e
  },
  statics: {
    sizeModelsArray: [],
    sizeModels: {}
  },
  calculated: false,
  configured: false,
  constrainedMax: false,
  constrainedMin: false,
  natural: false,
  shrinkWrap: false,
  calculatedFromConfigured: false,
  calculatedFromNatural: false,
  calculatedFromShrinkWrap: false,
  names: null
}, 1, 0, 0, 0, 0, 0, [Ext.layout, "SizeModel"], function() {
  var e = this,
    a = e.sizeModelsArray,
    c, b, g, f, d;
  new e({
    name: "calculated"
  });
  new e({
    name: "configured",
    names: {
      width: "width",
      height: "height"
    }
  });
  new e({
    name: "natural"
  });
  new e({
    name: "shrinkWrap"
  });
  new e({
    name: "calculatedFromConfigured",
    configured: true,
    calculatedFrom: true,
    names: {
      width: "width",
      height: "height"
    }
  });
  new e({
    name: "calculatedFromNatural",
    natural: true,
    calculatedFrom: true
  });
  new e({
    name: "calculatedFromShrinkWrap",
    shrinkWrap: true,
    calculatedFrom: true
  });
  new e({
    name: "constrainedMax",
    configured: true,
    constrained: true,
    names: {
      width: "maxWidth",
      height: "maxHeight"
    }
  });
  new e({
    name: "constrainedMin",
    configured: true,
    constrained: true,
    names: {
      width: "minWidth",
      height: "minHeight"
    }
  });
  new e({
    name: "constrainedDock",
    configured: true,
    constrained: true,
    constrainedByMin: true,
    names: {
      width: "dockConstrainedWidth",
      height: "dockConstrainedHeight"
    }
  });
  for (c = 0, g = a.length; c < g; ++c) {
    d = a[c];
    d.pairsByHeightOrdinal = f = [];
    for (b = 0; b < g; ++b) {
      f.push({
        width: d,
        height: a[b]
      })
    }
  }
}));
(Ext.cmd.derive("Ext.layout.Layout", Ext.Base, {
  factoryConfig: {
    type: "layout"
  },
  isLayout: true,
  initialized: false,
  running: false,
  needsItemSize: true,
  setsItemSize: true,
  autoSizePolicy: {
    readsWidth: 1,
    readsHeight: 1,
    setsWidth: 0,
    setsHeight: 0
  },
  $configPrefixed: false,
  $configStrict: false,
  constructor: function(a) {
    var b = this;
    b.id = Ext.id(null, b.type + "-");
    b.initConfig(a);
    delete b.type;
    b.layoutCount = 0
  },
  beginLayout: Ext.emptyFn,
  beginLayoutCycle: function(c) {
    var b = this,
      a = b.context,
      d;
    if (b.lastWidthModel !== c.widthModel) {
      if (b.lastWidthModel) {
        d = true
      }
      b.lastWidthModel = c.widthModel
    }
    if (b.lastHeightModel !== c.heightModel) {
      if (b.lastWidthModel) {
        d = true
      }
      b.lastHeightModel = c.heightModel
    }
    if (d) {
      (a = c.context).clearTriggers(b, false);
      a.clearTriggers(b, true);
      b.triggerCount = 0
    }
  },
  finishedLayout: function(a) {
    this.lastWidthModel = a.widthModel;
    this.lastHeightModel = a.heightModel;
    this.ownerContext = null
  },
  redoLayout: Ext.emptyFn,
  undoLayout: Ext.emptyFn,
  getAnimatePolicy: function() {
    return this.animatePolicy
  },
  getItemSizePolicy: function(a) {
    return this.autoSizePolicy
  },
  getScrollerEl: Ext.emptyFn,
  isItemBoxParent: function(a) {
    return false
  },
  isItemLayoutRoot: function(d) {
    var c = d.getSizeModel(),
      b = c.width,
      a = c.height;
    if (!d.componentLayout.lastComponentSize && (b.calculated || a.calculated)) {
      return false
    }
    return !b.shrinkWrap && !a.shrinkWrap
  },
  isItemShrinkWrap: function(a) {
    return a.shrinkWrap
  },
  isRunning: function() {
    return !!this.ownerContext
  },
  getItemsRenderTree: function(d, b) {
    var g = d.length,
      e, f, c, a;
    if (g) {
      a = [];
      for (e = 0; e < g; ++e) {
        f = d[e];
        if (!f.rendered) {
          if (b && (b[f.id] !== undefined)) {
            c = b[f.id]
          } else {
            this.configureItem(f);
            c = f.getRenderTree();
            if (b) {
              b[f.id] = c
            }
          }
          if (c) {
            a.push(c)
          }
        }
      }
    }
    return a
  },
  finishRender: Ext.emptyFn,
  finishRenderItems: function(e, a) {
    var d = a.length,
      b, c;
    for (b = 0; b < d; b++) {
      c = a[b];
      if (c.rendering) {
        c.finishRender(b)
      }
    }
  },
  renderChildren: function() {
    var b = this,
      a = b.getLayoutItems(),
      c = b.getRenderTarget();
    b.renderItems(a, c)
  },
  renderItems: function(a, f) {
    var e = this,
      d = a.length,
      b = 0,
      c;
    if (d) {
      Ext.suspendLayouts();
      for (; b < d; b++) {
        c = a[b];
        if (c && !c.rendered) {
          e.renderItem(c, f, b)
        } else {
          if (!e.isValidParent(c, f, b)) {
            e.moveItem(c, f, b)
          } else {
            e.configureItem(c)
          }
        }
      }
      Ext.resumeLayouts(true)
    }
  },
  isValidParent: function(d, e, a) {
    var c = (e && e.dom) || e,
      b = this.getItemLayoutEl(d);
    if (b && c) {
      if (typeof a === "number") {
        a = this.getPositionOffset(a);
        return b === c.childNodes[a]
      }
      return b.parentNode === c
    }
    return false
  },
  getItemLayoutEl: function(c) {
    var d = c.el ? c.el.dom : Ext.getDom(c),
      a = d.parentNode,
      b;
    if (a) {
      b = a.className;
      if (b && b.indexOf("x-resizable-wrap") !== -1) {
        d = d.parentNode
      }
    }
    return d
  },
  getPositionOffset: function(a) {
    return a
  },
  configureItem: function(a) {
    a.ownerLayout = this
  },
  renderItem: function(c, d, a) {
    var b = this;
    if (!c.rendered) {
      b.configureItem(c);
      c.render(d, a)
    }
  },
  moveItem: function(b, c, a) {
    c = c.dom || c;
    if (typeof a === "number") {
      a = c.childNodes[a]
    }
    c.insertBefore(b.el.dom, a || null);
    b.container = Ext.get(c);
    this.configureItem(b)
  },
  onContentChange: function() {
    this.owner.updateLayout();
    return true
  },
  initLayout: function() {
    this.initialized = true
  },
  setOwner: function(a) {
    this.owner = a
  },
  getLayoutItems: function() {
    return []
  },
  onAdd: function(a) {
    a.ownerLayout = this
  },
  onRemove: Ext.emptyFn,
  onDestroy: Ext.emptyFn,
  afterRemove: function(e) {
    var d = this,
      c = e.el,
      b = d.owner,
      a;
    if (e.rendered) {
      a = [].concat(d.itemCls || []);
      if (b.itemCls) {
        a = Ext.Array.push(a, b.itemCls)
      }
      if (a.length) {
        c.removeCls(a)
      }
    }
    delete e.ownerLayout
  },
  afterCollapse: function(a, b) {
    if (b) {
      this.onContentChange(a)
    }
  },
  afterExpand: function(a, b) {
    if (b) {
      this.onContentChange(a)
    }
  },
  destroy: function() {
    var a = this,
      b;
    if (a.targetCls) {
      b = a.getTarget();
      if (b) {
        b.removeCls(a.targetCls)
      }
    }
    a.onDestroy();
    a.callParent()
  },
  sortWeightedItems: function(a, d) {
    for (var b = 0, c = a.length; b < c; ++b) {
      a[b].$i = b
    }
    Ext.Array.sort(a, function(f, e) {
      var g = e.weight - f.weight;
      if (!g) {
        g = f.$i - e.$i;
        if (f[d]) {
          g = -g
        }
      }
      return g
    });
    for (b = 0; b < c; ++b) {
      delete a[b].$i
    }
  }
}, 1, 0, 0, 0, 0, [
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ]
], [Ext.layout, "Layout"], function() {
  var a = this;
  a.prototype.sizeModels = a.sizeModels = Ext.layout.SizeModel.sizeModels
}));

(Ext.cmd.derive("Ext.layout.container.Container", Ext.layout.Layout, {
  alternateClassName: "Ext.layout.ContainerLayout",
  type: "container",
  beginCollapse: Ext.emptyFn,
  beginExpand: Ext.emptyFn,
  animatePolicy: null,
  activeItemCount: 0,
  renderTpl: ["{%this.renderBody(out,values)%}"],
  usesContainerHeight: true,
  usesContainerWidth: true,
  usesHeight: true,
  usesWidth: true,
  constructor: function() {
    Ext.layout.Layout.prototype.constructor.apply(this, arguments);
    this.mixins.elementCt.constructor.call(this)
  },
  destroy: function() {
    Ext.layout.Layout.prototype.destroy.call(this);
    this.mixins.elementCt.destroy.call(this)
  },
  beginLayout: function(a) {
    Ext.layout.Layout.prototype.beginLayout.apply(this, arguments);
    a.targetContext = a.paddingContext = a.getEl("getTarget", this);
    this.cacheChildItems(a)
  },
  beginLayoutCycle: function(c, a) {
    var b = this;
    Ext.layout.Layout.prototype.beginLayoutCycle.apply(this, arguments);
    if (a) {
      if (b.usesContainerHeight) {
        ++c.consumersContainerHeight
      }
      if (b.usesContainerWidth) {
        ++c.consumersContainerWidth
      }
    }
  },
  cacheChildItems: function(f) {
    var e = this,
      c, g, a, d, b;
    if (e.needsItemSize || e.setsItemSize) {
      c = f.context;
      g = f.childItems = [];
      a = f.visibleItems = e.getVisibleItems();
      d = a.length;
      for (b = 0; b < d; ++b) {
        g.push(c.getCmp(a[b]))
      }
    }
  },
  cacheElements: function() {
    var a = this.owner;
    this.attachChildEls(a.el, a)
  },
  calculate: function(c) {
    var b = c.props,
      a = c.el;
    if (c.widthModel.shrinkWrap && isNaN(b.width)) {
      c.setContentWidth(a.getWidth())
    }
    if (c.heightModel.shrinkWrap && isNaN(b.height)) {
      c.setContentHeight(a.getHeight())
    }
  },
  configureItem: function(d) {
    var c = this,
      e = c.itemCls,
      b = c.owner.itemCls,
      a, f;
    d.ownerLayout = c;
    if (e) {
      if (typeof e === "string") {
        f = [e]
      } else {
        f = e;
        a = !!f
      }
    }
    if (b) {
      if (a) {
        f = Ext.Array.clone(f)
      }
      f = Ext.Array.push(f || [], b)
    }
    if (f) {
      d.addCls(f)
    }
  },
  doRenderBody: function(a, b) {
    this.renderItems(a, b);
    this.renderContent(a, b)
  },
  doRenderContainer: function(b, e) {
    var c = e.$comp.layout,
      a = c.getRenderTpl(),
      d = c.getRenderData();
    a.applyOut(d, b)
  },
  doRenderItems: function(b, d) {
    var c = d.$layout,
      a = c.getRenderTree();
    if (a) {
      Ext.DomHelper.generateMarkup(a, b)
    }
  },
  finishRender: function() {
    var b = this,
      c, a;
    Ext.layout.Layout.prototype.finishRender.call(this);
    b.cacheElements();
    c = b.getRenderTarget();
    a = b.getLayoutItems();
    b.finishRenderItems(c, a)
  },
  notifyOwner: function() {
    this.owner.afterLayout(this)
  },
  getContainerSize: function(b, f) {
    var c = b.targetContext,
      e = c.getFrameInfo(),
      i = b.paddingContext.getPaddingInfo(),
      h = 0,
      j = 0,
      d, g, a, k;
    if (!b.widthModel.shrinkWrap) {
      ++j;
      a = f ? c.getDomProp("width") : c.getProp("width");
      d = (typeof a === "number");
      if (d) {
        ++h;
        a -= e.width + i.width;
        if (a < 0) {
          a = 0
        }
      }
    }
    if (!b.heightModel.shrinkWrap) {
      ++j;
      k = f ? c.getDomProp("height") : c.getProp("height");
      g = (typeof k === "number");
      if (g) {
        ++h;
        k -= e.height + i.height;
        if (k < 0) {
          k = 0
        }
      }
    }
    return {
      width: a,
      height: k,
      needed: j,
      got: h,
      gotAll: h === j,
      gotWidth: d,
      gotHeight: g
    }
  },
  getPositionOffset: function(a) {
    if (!this.createsInnerCt) {
      var b = this.owner.itemNodeOffset;
      if (b) {
        a += b
      }
    }
    return a
  },
  getLayoutItems: function() {
    var a = this.owner,
      b = a && a.items;
    return (b && b.items) || []
  },
  getRenderData: function() {
    var a = this.owner;
    return {
      $comp: a,
      $layout: this,
      ownerId: a.id
    }
  },
  getRenderedItems: function() {
    var e = this,
      g = e.getRenderTarget(),
      a = e.getLayoutItems(),
      d = a.length,
      f = [],
      b, c;
    for (b = 0; b < d; b++) {
      c = a[b];
      if (c.rendered && e.isValidParent(c, g, b)) {
        f.push(c)
      }
    }
    return f
  },
  getRenderTarget: function() {
    return this.owner.getTargetEl()
  },
  getElementTarget: function() {
    return this.getRenderTarget()
  },
  getRenderTpl: function() {
    var a = this,
      b = Ext.XTemplate.getTpl(this, "renderTpl");
    if (!b.renderContent) {
      a.owner.setupRenderTpl(b)
    }
    return b
  },
  getRenderTree: function() {
    var a, c = this.owner.items,
      d, b = {};
    do {
      d = c.generation;
      a = this.getItemsRenderTree(this.getLayoutItems(), b)
    } while (c.generation !== d);
    return a
  },
  renderChildren: function() {
    var b = this,
      c = b.owner.items,
      e = b.getRenderTarget(),
      d, a;
    do {
      d = c.generation;
      a = b.getLayoutItems();
      b.renderItems(a, e)
    } while (c.generation !== d)
  },
  getScrollbarsNeeded: function(c, h, b, g) {
    var a = Ext.getScrollbarSize(),
      e = typeof c === "number",
      i = typeof h === "number",
      f = 0,
      d = 0;
    if (!a.width) {
      return 0
    }
    if (i && h < g) {
      d = 2;
      c -= a.width
    }
    if (e && c < b) {
      f = 1;
      if (!d && i) {
        h -= a.height;
        if (h < g) {
          d = 2
        }
      }
    }
    return d + f
  },
  getTarget: function() {
    return this.owner.getTargetEl()
  },
  getVisibleItems: function() {
    var f = this.getRenderTarget(),
      b = this.getLayoutItems(),
      e = b.length,
      a = [],
      c, d;
    for (c = 0; c < e; c++) {
      d = b[c];
      if (d.rendered && this.isValidParent(d, f, c) && d.hidden !== true &&
        !d.floated) {
        a.push(d)
      }
    }
    return a
  },
  getMoveAfterIndex: function(a) {
    return this.owner.items.indexOf(a) + 1
  },
  moveItemBefore: function(d, e) {
    var a = this.owner,
      b = a.items,
      c = b.indexOf(d),
      f;
    if (d === e) {
      return d
    }
    if (e) {
      f = b.indexOf(e);
      if (c > -1 && c < f) {
        --f
      }
    } else {
      f = b.length
    }
    return a.insert(f, d)
  },
  setupRenderTpl: function(a) {
    a.renderBody = this.doRenderBody;
    a.renderContainer = this.doRenderContainer;
    a.renderItems = this.doRenderItems
  },
  getContentTarget: function() {
    return this.owner.getDefaultContentTarget()
  },
  onAdd: function(a) {
    if (!a.liquidLayout) {
      ++this.activeItemCount
    }
    Ext.layout.Layout.prototype.onAdd.call(this, a)
  },
  onRemove: function(b, a) {
    if (!b.liquidLayout) {
      --this.activeItemCount
    }
    Ext.layout.Layout.prototype.onRemove.call(this, b, a)
  }
}, 1, 0, 0, 0, ["layout.container"], [
  [Ext.util.ElementContainer.prototype.mixinId || Ext.util.ElementContainer
    .$className, Ext.util.ElementContainer
  ]
], [Ext.layout.container, "Container", Ext.layout, "ContainerLayout"], 0));
(Ext.cmd.derive("Ext.layout.container.Auto", Ext.layout.container.Container, {
  type: "autocontainer",
  childEls: ["outerCt", "innerCt"],
  reserveScrollbar: false,
  managePadding: true,
  manageOverflow: false,
  needsItemSize: false,
  setsItemSize: false,
  lastOverflowAdjust: {
    width: 0,
    height: 0
  },
  outerCtCls: "x-autocontainer-outerCt",
  innerCtCls: "x-autocontainer-innerCt",
  renderTpl: [
    '<div id="{ownerId}-outerCt" data-ref="outerCt" class="{outerCtCls}" role="presentation">',
    '<div id="{ownerId}-innerCt" data-ref="innerCt" style="{%this.renderPadding(out, values)%}" ',
    '<tpl if="!$comp.html">role="presentation"</tpl>',
    'class="{innerCtCls}">', "{%this.renderBody(out,values)%}", "</div>",
    "</div>"
  ],
  beginLayout: function(a) {
    Ext.layout.container.Container.prototype.beginLayout.apply(this,
      arguments);
    this.initContextItems(a)
  },
  beforeLayoutCycle: function(d) {
    var b = this.owner,
      c = b.inheritedState,
      a = b.inheritedStateInner;
    if (!c || c.invalid) {
      c = b.getInherited();
      a = b.inheritedStateInner
    }
    if (d.widthModel.shrinkWrap) {
      a.inShrinkWrapTable = true
    } else {
      delete a.inShrinkWrapTable
    }
  },
  beginLayoutCycle: function(d) {
    var i = this,
      b = i.outerCt,
      g = i.lastOuterCtWidth || "",
      f = i.lastOuterCtHeight || "",
      j = i.lastOuterCtTableLayout || "",
      a = d.state,
      k, e, l, c, h;
    Ext.layout.container.Container.prototype.beginLayoutCycle.apply(this,
      arguments);
    e = l = c = "";
    if (!d.widthModel.shrinkWrap) {
      e = "100%";
      h = i.owner.inheritedStateInner;
      k = i.getOverflowXStyle(d);
      c = (h.inShrinkWrapTable || k === "auto" || k === "scroll") ? "" :
        "fixed"
    }
    if (!d.heightModel.shrinkWrap && !Ext.supports.PercentageHeightOverflowBug) {
      l = "100%"
    }
    if ((e !== g) || i.hasOuterCtPxWidth) {
      b.setStyle("width", e);
      i.lastOuterCtWidth = e;
      i.hasOuterCtPxWidth = false
    }
    if (c !== j) {
      b.setStyle("table-layout", c);
      i.lastOuterCtTableLayout = c
    }
    if ((l !== f) || i.hasOuterCtPxHeight) {
      b.setStyle("height", l);
      i.lastOuterCtHeight = l;
      i.hasOuterCtPxHeight = false
    }
    if (i.hasInnerCtPxHeight) {
      i.innerCt.setStyle("height", "");
      i.hasInnerCtPxHeight = false
    }
    a.overflowAdjust = a.overflowAdjust || i.lastOverflowAdjust
  },
  calculate: function(c) {
    var a = this,
      b = c.state,
      e = a.getContainerSize(c, true),
      d = b.calculatedItems || (b.calculatedItems = a.calculateItems ? a.calculateItems(
        c, e) : true);
    a.setCtSizeIfNeeded(c, e);
    if (d && c.hasDomProp("containerChildrenSizeDone")) {
      a.calculateContentSize(c);
      if (e.gotAll) {
        if (a.manageOverflow && !c.state.secondPass && !a.reserveScrollbar) {
          a.calculateOverflow(c, e)
        }
        return
      }
    }
    a.done = false
  },
  calculateContentSize: function(f) {
    var e = this,
      a = ((f.widthModel.shrinkWrap ? 1 : 0) | (f.heightModel.shrinkWrap ?
        2 : 0)),
      c = (a & 1) || undefined,
      g = (a & 2) || undefined,
      d = 0,
      b = f.props;
    if (c) {
      if (isNaN(b.contentWidth)) {
        ++d
      } else {
        c = undefined
      }
    }
    if (g) {
      if (isNaN(b.contentHeight)) {
        ++d
      } else {
        g = undefined
      }
    }
    if (d) {
      if (c && !f.setContentWidth(e.measureContentWidth(f))) {
        e.done = false
      }
      if (g && !f.setContentHeight(e.measureContentHeight(f))) {
        e.done = false
      }
    }
  },
  calculateOverflow: function(c) {
    var g = this,
      b, i, a, f, e, d, h;
    e = (g.getOverflowXStyle(c) === "auto");
    d = (g.getOverflowYStyle(c) === "auto");
    if (e || d) {
      a = Ext.getScrollbarSize();
      h = c.overflowContext.el.dom;
      f = 0;
      if (h.scrollWidth > h.clientWidth) {
        f |= 1
      }
      if (h.scrollHeight > h.clientHeight) {
        f |= 2
      }
      b = (d && (f & 2)) ? a.width : 0;
      i = (e && (f & 1)) ? a.height : 0;
      if (b !== g.lastOverflowAdjust.width || i !== g.lastOverflowAdjust.height) {
        g.done = false;
        c.invalidate({
          state: {
            overflowAdjust: {
              width: b,
              height: i
            },
            overflowState: f,
            secondPass: true
          }
        })
      }
    }
  },
  completeLayout: function(a) {
    this.lastOverflowAdjust = a.state.overflowAdjust
  },
  doRenderBody: function(c, e) {
    var d = e.$layout,
      a = Ext.XTemplate,
      f = d.beforeBodyTpl,
      b = d.afterBodyTpl;
    if (f) {
      a.getTpl(d, "beforeBodyTpl").applyOut(e, c)
    }
    this.renderItems(c, e);
    this.renderContent(c, e);
    if (b) {
      a.getTpl(d, "afterBodyTpl").applyOut(e, c)
    }
  },
  doRenderPadding: function(b, d) {
    var c = d.$layout,
      a = d.$layout.owner,
      e = a[a.contentPaddingProperty];
    if (c.managePadding && e) {
      b.push("padding:", a.unitizeBox(e))
    }
  },
  finishedLayout: function(b) {
    var a = this.innerCt;
    Ext.layout.container.Container.prototype.finishedLayout.apply(this,
      arguments);
    if (Ext.isIE8) {
      a.repaint()
    }
    if (Ext.isOpera) {
      a.setStyle("position", "relative");
      a.dom.scrollWidth;
      a.setStyle("position", "")
    }
  },
  getContainerSize: function(b, c) {
    var a = Ext.layout.container.Container.prototype.getContainerSize.apply(
        this, arguments),
      d = b.state.overflowAdjust;
    if (d) {
      a.width -= d.width;
      a.height -= d.height
    }
    return a
  },
  getRenderData: function() {
    var a = this,
      b = Ext.layout.container.Container.prototype.getRenderData.call(
        this);
    b.innerCtCls = a.innerCtCls;
    b.outerCtCls = a.outerCtCls;
    return b
  },
  getRenderTarget: function() {
    return this.innerCt
  },
  getElementTarget: function() {
    return this.innerCt
  },
  getOverflowXStyle: function(a) {
    return a.overflowXStyle || (a.overflowXStyle = this.owner.scrollFlags
      .overflowX || a.overflowContext.getStyle("overflow-x"))
  },
  getOverflowYStyle: function(a) {
    return a.overflowYStyle || (a.overflowYStyle = this.owner.scrollFlags
      .overflowY || a.overflowContext.getStyle("overflow-y"))
  },
  initContextItems: function(b) {
    var a = this,
      d = b.target,
      c = a.owner.getOverflowEl();
    b.outerCtContext = b.getEl("outerCt", a);
    b.innerCtContext = b.getEl("innerCt", a);
    b.overflowContext = (c === b.el) ? b : b.getEl(c);
    if (d[d.contentPaddingProperty] !== undefined) {
      b.paddingContext = b.innerCtContext
    }
  },
  initLayout: function() {
    var c = this,
      b = Ext.getScrollbarSize().width,
      a = c.owner;
    Ext.layout.container.Container.prototype.initLayout.call(this);
    if (b && c.manageOverflow && !c.hasOwnProperty("lastOverflowAdjust")) {
      if (a.scrollable || c.reserveScrollbar) {
        c.lastOverflowAdjust = {
          width: b,
          height: 0
        }
      }
    }
  },
  measureContentHeight: function(b) {
    var a = this.outerCt.getHeight(),
      c = b.target;
    if (this.managePadding && (c[c.contentPaddingProperty] === undefined)) {
      a += b.targetContext.getPaddingInfo().height
    }
    return a
  },
  measureContentWidth: function(d) {
    var f, c, b, a, e;
    if (this.chromeCellMeasureBug) {
      f = this.innerCt.dom;
      c = f.style;
      b = c.display;
      if (b === "table-cell") {
        c.display = "";
        f.offsetWidth;
        c.display = b
      }
    }
    if (Ext.isSafari) {
      f = this.outerCt.dom;
      c = f.style;
      c.display = "table-cell";
      f.offsetWidth;
      f.style.display = ""
    }
    a = this.outerCt.getWidth();
    e = d.target;
    if (this.managePadding && (e[e.contentPaddingProperty] === undefined)) {
      a += d.targetContext.getPaddingInfo().width
    }
    return a
  },
  setCtSizeIfNeeded: function(d, b) {
    var e = this,
      k = b.height,
      g = d.paddingContext.getPaddingInfo(),
      i = e.getTarget(),
      j = e.getOverflowXStyle(d),
      c = (j === "auto" || j === "scroll"),
      a = Ext.getScrollbarSize(),
      f, h;
    if (k && !d.heightModel.shrinkWrap) {
      if (Ext.supports.PercentageHeightOverflowBug) {
        f = true
      }
      if (Ext.isIE8) {
        h = true
      }
      if ((f || h) && c && (i.dom.scrollWidth > i.dom.clientWidth)) {
        k = Math.max(k - a.height, 0)
      }
      if (f) {
        d.outerCtContext.setProp("height", k + g.height);
        e.hasOuterCtPxHeight = true
      }
      if (h) {
        d.innerCtContext.setProp("height", k);
        e.hasInnerCtPxHeight = true
      }
    }
  },
  setupRenderTpl: function(a) {
    Ext.layout.container.Container.prototype.setupRenderTpl.apply(this,
      arguments);
    a.renderPadding = this.doRenderPadding
  },
  getContentTarget: function() {
    return this.innerCt
  },
  getScrollerEl: function() {
    return this.outerCt
  }
}, 0, 0, 0, 0, ["layout.auto", "layout.autocontainer"], 0, [Ext.layout.container,
  "Auto"
], function() {
  this.prototype.chromeCellMeasureBug = Ext.isChrome && Ext.chromeVersion >=
    26
}));
(Ext.cmd.derive("Ext.ZIndexManager", Ext.Base, {
  alternateClassName: "Ext.WindowGroup",
  statics: {
    zBase: 9000,
    activeCounter: 0
  },
  constructor: function(a) {
    var b = this;
    b.id = Ext.id(null, "zindex-mgr-");
    b.zIndexStack = new Ext.util.Collection({
      sorters: {
        sorterFn: function(e, d) {
          var c = (e.alwaysOnTop || 0) - (d.alwaysOnTop || 0);
          if (!c) {
            c = e.getActiveCounter() - d.getActiveCounter()
          }
          return c
        }
      },
      filters: {
        filterFn: function(c) {
          return c.isVisible()
        }
      }
    });
    b.zIndexStack.addObserver(b);
    b.front = null;
    b.globalListeners = Ext.GlobalEvents.on({
      beforehide: b.onComponentShowHide,
      show: b.onComponentShowHide,
      scope: b,
      destroyable: true
    });
    if (a) {
      if (a.isContainer) {
        a.on("resize", b.onContainerResize, b);
        b.zseed = Ext.Number.from(b.rendered ? a.getEl().getStyle(
          "zIndex") : undefined, b.getNextZSeed());
        b.targetEl = a.getTargetEl();
        b.container = a
      } else {
        Ext.on("resize", b.onContainerResize, b);
        b.zseed = b.getNextZSeed();
        b.targetEl = Ext.get(a)
      }
    } else {
      b.zseed = b.getNextZSeed();
      Ext.onInternalReady(function() {
        Ext.on("resize", b.onContainerResize, b);
        b.targetEl = Ext.getBody()
      })
    }
  },
  getId: function() {
    return this.id
  },
  getNextZSeed: function() {
    return (Ext.ZIndexManager.zBase += 10000)
  },
  setBase: function(a) {
    this.zseed = a;
    return this.onCollectionSort()
  },
  onCollectionSort: function() {
    var j = this,
      e = j.front,
      h = e && e.containsFocus,
      k = j.zseed,
      l = j.zIndexStack.getRange(),
      g = l.length,
      d, f, c, b, m = false;
    for (d = 0; d < g; d++) {
      f = l[d];
      k = f.setZIndex(k);
      if (!f.hidden) {
        b = f;
        if (f.modal) {
          c = f
        }
      }
    }
    if (b !== e) {
      if (e && !e.destroying) {
        e.setActive(false)
      }
      if (b) {
        m = b.isFocusable(true) && (b.modal || (b.focusOnToFront && !b.preventFocusOnActivate));
        b.setActive(true, m)
      }
    }
    j.front = b;
    if (c) {
      j.showModalMask(c)
    } else {
      j.hideModalMask()
    }
    return k
  },
  onComponentUpdate: function(a) {
    if (this.zIndexStack.contains(a)) {
      this.zIndexStack.sort()
    }
  },
  onComponentRender: function(a) {
    this.zIndexStack.itemChanged(a, "hidden")
  },
  onComponentShowHide: function(a) {
    var b = this.zIndexStack;
    if (a.isFloating() && !this.hidingAll && (b.getSource() || b).contains(
        a)) {
      b.itemChanged(a, "hidden");
      b.sort()
    }
  },
  register: function(a) {
    var b = this;
    if (a.zIndexManager) {
      a.zIndexManager.unregister(a)
    }
    a.zIndexManager = b;
    if (!a.rendered) {
      a.on("render", b.onComponentRender, b, {
        single: true
      })
    }
    b.zIndexStack.add(a)
  },
  unregister: function(a) {
    var b = this;
    delete a.zIndexManager;
    a.un("render", b.onComponentRender, b);
    b.zIndexStack.remove(a);
    b.onCollectionSort()
  },
  get: function(a) {
    return a.isComponent ? a : this.zIndexStack.get(a)
  },
  bringToFront: function(b, e) {
    var c = this,
      g = c.zIndexStack,
      a = g.last(),
      d, f;
    b = c.get(b);
    if (!b || g.find("alwaysOnTop", true)) {
      return false
    }
    f = b.preventFocusOnActivate;
    b.preventFocusOnActivate = e;
    b.setActiveCounter(++Ext.ZIndexManager.activeCounter);
    b.preventFocusOnActivate = f;
    d = g.last();
    return (d === b && d !== a)
  },
  sendToBack: function(a) {
    a = this.get(a);
    if (a) {
      a.setActiveCounter(0)
    }
    return a || null
  },
  hideAll: function() {
    var c = this.zIndexStack.getRange(),
      a = c.length,
      b;
    this.hidingAll = true;
    for (b = 0; b < a; b++) {
      c[b].hide()
    }
    this.hidingAll = false
  },
  hide: function() {
    var f = this,
      e = Ext.Element.getActiveElement(),
      d = f.tempHidden = f.zIndexStack.getRange(),
      a = d.length,
      c, b;
    f.focusRestoreElement = null;
    for (c = 0; c < a; c++) {
      b = d[c];
      if (b.el.contains(e)) {
        f.focusRestoreElement = e
      }
      b.el.hide();
      b.hidden = true
    }
  },
  show: function() {
    var d = this,
      c, e = d.tempHidden,
      a = e ? e.length : 0,
      b;
    for (c = 0; c < a; c++) {
      b = e[c];
      b.el.show();
      b.hidden = false;
      b.setPosition(b.x, b.y)
    }
    d.tempHidden = null;
    if (d.focusRestoreElement) {
      d.focusRestoreElement.focus()
    }
  },
  getActive: function() {
    return this.zIndexStack.last()
  },
  getBy: function(b, a) {
    return this.zIndexStack.filterBy(b, a).getRange()
  },
  each: function(b, a) {
    this.zIndexStack.each(b, a)
  },
  eachBottomUp: function(f, e) {
    var b = this.zIndexStack.getRange(),
      d, a = b.length,
      c;
    for (d = 0; d < a; d++) {
      c = b[d];
      if (c.isComponent && f.call(e || c, c) === false) {
        return
      }
    }
  },
  eachTopDown: function(e, d) {
    var a = this.zIndexStack.getRange(),
      c, b;
    for (c = a.length; c-- > 0;) {
      b = a[c];
      if (b.isComponent && e.call(d || b, b) === false) {
        return
      }
    }
  },
  destroy: function() {
    var d = this,
      b = d.zIndexStack.getRange(),
      a = b.length,
      c;
    for (c = 0; c < a; c++) {
      Ext.destroy(b[c])
    }
    if (d.container) {
      d.container.un("resize", d.onContainerResize, d)
    } else {
      if (d.targetEl) {
        Ext.un("resize", d.onContainerResize, d)
      }
    }
    Ext.destroy(d.mask, d.maskShim, d.zIndexStack, d.globalListeners);
    d.zIndexStack = d.container = d.targetEl = d.globalListeners = null;
    d.callParent()
  },
  privates: {
    getMaskBox: function() {
      var a = this.mask.maskTarget;
      if (a.dom === document.body) {
        return {
          height: Math.max(document.body.scrollHeight, Ext.dom.Element.getDocumentHeight()),
          width: Math.max(document.body.scrollWidth, document.documentElement
            .clientWidth),
          x: 0,
          y: 0
        }
      } else {
        return a.getBox()
      }
    },
    onContainerResize: function() {
      var c = this,
        b = c.mask,
        a = c.maskShim,
        d;
      if (b && b.isVisible()) {
        b.hide();
        if (a) {
          a.hide()
        }
        d = c.getMaskBox();
        if (a) {
          a.setSize(d);
          a.show()
        }
        b.setSize(d);
        b.show()
      }
    },
    onMaskClick: function() {
      if (this.front) {
        this.front.focus()
      }
    },
    showModalMask: function(b) {
      var d = this,
        h = b.el,
        g = h.getStyle("zIndex") - 4,
        c = b.floatParent ? b.floatParent.getTargetEl() : b.container,
        a = d.mask,
        f = d.maskShim,
        e;
      if (!a) {
        d.mask = a = Ext.getBody().createChild({
          role: "presentation",
          cls: "x-mask x-border-box",
          style: "height:0;width:0"
        });
        a.setVisibilityMode(Ext.Element.DISPLAY);
        a.on("click", d.onMaskClick, d)
      } else {
        d.hideModalMask()
      }
      a.maskTarget = c;
      e = d.getMaskBox();
      if (f) {
        f.setStyle("zIndex", g);
        f.show();
        f.setBox(e)
      }
      a.setStyle("zIndex", g);
      c.saveTabbableState({
        excludeRoot: h
      });
      a.show();
      a.setBox(e)
    },
    hideModalMask: function() {
      var b = this.mask,
        a = this.maskShim;
      if (b && b.isVisible()) {
        b.maskTarget.restoreTabbableState();
        b.maskTarget = undefined;
        b.hide();
        if (a) {
          a.hide()
        }
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext, "ZIndexManager", Ext, "WindowGroup"], function() {
  Ext.WindowManager = Ext.WindowMgr = new this()
}));
(Ext.cmd.derive("Ext.container.Container", Ext.Component, {
    alternateClassName: ["Ext.Container", "Ext.AbstractContainer"],
    renderTpl: "{%this.renderContainer(out,values)%}",
    autoDestroy: true,
    defaultType: "panel",
    detachOnRemove: true,
    items: undefined,
    layout: "auto",
    suspendLayout: false,
    _applyDefaultsOptions: {
      defaults: true,
      strict: false
    },
    ariaRole: "presentation",
    baseCls: "x-container",
    layoutCounter: 0,
    add: function() {
      var k = this,
        g = Ext.Array.slice(arguments),
        e = (typeof g[0] === "number") ? g.shift() : -1,
        c = k.getLayout(),
        d = false,
        m, h, b, a, n, l, f, j;
      if (g.length === 1 && Ext.isArray(g[0])) {
        h = g[0];
        m = true
      } else {
        h = g
      }
      if (k.rendered) {
        Ext.suspendLayouts()
      }
      f = h = k.prepareItems(h, true);
      a = h.length;
      if (!m && a === 1) {
        f = h[0]
      }
      for (b = 0; b < a; b++) {
        n = h[b];
        l = (e < 0) ? k.items.length : (e + b);
        j = !!n.instancedCmp;
        delete n.instancedCmp;
        if (n.floating) {
          k.floatingItems.add(n);
          n.onAdded(k, l, j);
          delete n.$initParent;
          if (k.hasListeners.add) {
            k.fireEvent("add", k, n, l)
          }
        } else {
          if ((!k.hasListeners.beforeadd || k.fireEvent("beforeadd", k, n,
              l) !== false) && k.onBeforeAdd(n) !== false) {
            k.items.insert(l, n);
            n.onAdded(k, l, j);
            delete n.$initParent;
            k.onAdd(n, l);
            c.onAdd(n, l);
            d = true;
            if (k.hasListeners.add) {
              k.fireEvent("add", k, n, l)
            }
          }
        }
      }
      if (d) {
        k.updateLayout()
      }
      if (k.rendered) {
        Ext.resumeLayouts(true)
      }
      return f
    },
    onAdded: function(b, c, a) {
      Ext.Component.prototype.onAdded.call(this, b, c, a);
      this.containerOnAdded(b, a)
    },
    onRemoved: function(a) {
      this.containerOnRemoved(a);
      Ext.Component.prototype.onRemoved.apply(this, arguments)
    },
    afterComponentLayout: function() {
      var b = this.floatingItems.items,
        a = b.length,
        d, c;
      Ext.Component.prototype.afterComponentLayout.apply(this, arguments);
      for (d = 0; d < a; d++) {
        c = b[d];
        if (!c.rendered && c.autoShow) {
          c.show()
        }
      }
    },
    afterLayout: function(c) {
      var b = this,
        a = b.getScrollable();
      ++b.layoutCounter;
      if (a && b.layoutCounter > 1) {
        a.refresh()
      }
      if (b.hasListeners.afterlayout) {
        b.fireEvent("afterlayout", b, c)
      }
    },
    beforeDestroy: function() {
      var b = this,
        a = b.items,
        d = b.floatingItems,
        e;
      if (a) {
        while ((e = a.first())) {
          b.doRemove(e, true)
        }
      }
      if (d) {
        while ((e = d.first())) {
          b.doRemove(e, true)
        }
      }
      Ext.destroy(b.layout);
      Ext.Component.prototype.beforeDestroy.call(this)
    },
    destroy: function() {
      var a = this;
      Ext.Component.prototype.destroy.call(this);
      if (a.items) {
        a.items.destroy()
      }
      if (a.floatingItems) {
        a.floatingItems.destroy()
      }
      a.refs = a.items = a.floatingItems = a.layout = null
    },
    beforeRender: function() {
      var b = this,
        a = b.getLayout(),
        c;
      b.preventChildDisable = true;
      Ext.Component.prototype.beforeRender.call(this);
      b.preventChildDisable = false;
      if (!a.initialized) {
        a.initLayout()
      }
      c = a.targetCls;
      if (c) {
        b.applyTargetCls(c)
      }
    },
    cascade: function(k, l, a) {
      var j = this,
        e = j.items ? j.items.items : [],
        f = e.length,
        d = 0,
        h, g = a ? a.concat(j) : [j],
        b = g.length - 1;
      if (k.apply(l || j, g) !== false) {
        for (; d < f; d++) {
          h = e[d];
          if (h.cascade) {
            h.cascade(k, l, a)
          } else {
            g[b] = h;
            k.apply(l || h, g)
          }
        }
      }
      return this
    },
    contains: function(c, b) {
      var a = false;
      if (b) {
        this.cascade(function(d) {
          if (d.contains && d.contains(c)) {
            a = true;
            return false
          }
        });
        return a
      } else {
        return this.items.contains(c) || this.floatingItems.contains(c)
      }
    },
    disable: function(b, g) {
      var e = this,
        d = e.disabled,
        f, a, c;
      Ext.Component.prototype.disable.call(this, b, g);
      if (!g && !e.preventChildDisable && !d) {
        f = e.getChildItemsToDisable();
        a = f.length;
        for (c = 0; c < a; c++) {
          f[c].disable(b, true)
        }
      }
      return e
    },
    enable: function(b, g) {
      var e = this,
        d = e.disabled,
        f, a, c;
      Ext.Component.prototype.enable.call(this, b, g);
      if (d) {
        f = e.getChildItemsToDisable();
        a = f.length;
        for (c = 0; c < a; c++) {
          f[c].enable(b, true)
        }
      }
      return e
    },
    getChildByElement: function(e, a) {
      var g, c, b = 0,
        d = this.getRefItems(),
        f = d.length;
      e = Ext.getDom(e);
      for (; b < f; b++) {
        g = d[b];
        c = g.getEl();
        if (c && ((c.dom === e) || c.contains(e))) {
          return (a && g.getChildByElement) ? g.getChildByElement(e, a) : g
        }
      }
      return null
    },
    getComponent: function(a) {
      if (Ext.isObject(a)) {
        a = a.getItemId()
      }
      var b = this.items.get(a);
      if (!b && typeof a !== "number") {
        b = this.floatingItems.get(a)
      }
      return b
    },
    getFocusEl: function() {
      var a = this.getDefaultFocus();
      if (a) {
        return a
      } else {
        if (this.focusable) {
          return this.getTargetEl()
        }
      }
      return undefined
    },
    getLayout: function() {
      var b = this,
        a = b.layout;
      if (!a || !a.isLayout) {
        b.setLayout(a)
      }
      return b.layout
    },
    getRefItems: function(c) {
      var g = this,
        d = g.items.items,
        b = d.length,
        e = 0,
        f, a = [];
      for (; e < b; e++) {
        f = d[e];
        a[a.length] = f;
        if (c && f.getRefItems) {
          a.push.apply(a, f.getRefItems(true))
        }
      }
      d = g.floatingItems.items;
      b = d.length;
      for (e = 0; e < b; e++) {
        f = d[e];
        a[a.length] = f;
        if (c && f.getRefItems) {
          a.push.apply(a, f.getRefItems(true))
        }
      }
      return a
    },
    getDefaultFocus: function() {
      var b = this.defaultFocus,
        a;
      if (b) {
        a = this.down(b)
      }
      return a
    },
    initComponent: function() {
      var a = this;
      Ext.Component.prototype.initComponent.call(this);
      a.getLayout();
      a.constructing = true;
      a.initItems();
      if (a.disabled) {
        a.disabled = false;
        a.disable(true)
      }
      delete a.constructing
    },
    initItems: function() {
      var b = this,
        a = b.items;
      if (!a || !a.isMixedCollection) {
        b.items = new Ext.util.ItemCollection();
        b.floatingItems = new Ext.util.ItemCollection();
        if (a) {
          if (!Ext.isArray(a)) {
            a = [a]
          }
          b.add(a)
        }
      }
    },
    initInheritedState: function(h, c) {
      var g = this,
        d = g.controller,
        e = g.layout,
        f = g.session,
        i = g.viewModel,
        b = g.reference,
        a = g.referenceHolder;
      Ext.Component.prototype.initInheritedState.call(this, h, c);
      if (g.collapsed) {
        h.collapsed = true
      }
      g.initContainerInheritedState(h, c);
      if (e && e.initInheritedState) {
        e.initInheritedState(h, c)
      }
    },
    insert: function(c, b) {
      var a;
      if (b && b.isComponent) {
        a = this.items.indexOf(b);
        if (a !== -1) {
          return this.move(a, c)
        }
      }
      return this.add(c, b)
    },
    lookupComponent: function(a) {
      if (!a.isComponent) {
        if (typeof a === "string") {
          a = Ext.ComponentManager.get(a)
        } else {
          a = Ext.ComponentManager.create(a, this.defaultType)
        }
      }
      return a
    },
    move: function(b, e) {
      var d = this,
        a = d.items,
        c;
      if (b.isComponent) {
        b = a.indexOf(b)
      }
      c = a.getAt(b);
      if (b !== e) {
        c = a.removeAt(b);
        if (c === false) {
          return false
        }
        e = Math.min(e, a.getCount());
        a.insert(e, c);
        d.onMove(c, b, e);
        if (d.hasListeners.childmove) {
          d.fireEvent("childmove", d, c, b, e)
        }
        d.updateLayout()
      }
      return c
    },
    moveBefore: function(a, b) {
      if (a !== b) {
        a = this.layout.moveItemBefore(a, b)
      }
      return a
    },
    moveAfter: function(c, d) {
      var b = this.layout,
        a;
      if (c !== d) {
        a = d ? b.getMoveAfterIndex(d) : 0;
        c = b.moveItemBefore(c, this.items.getAt(a))
      }
      return c
    },
    nextChild: function(h, c) {
      var f = this,
        d = f.items,
        g = d.indexOf(h),
        e = 0,
        b = d.length,
        a;
      if (g !== -1) {
        if (c) {
          for (; e < b; e++) {
            a = d.getAt(g + e);
            if (!a || Ext.ComponentQuery.is(a, c)) {
              break
            }
          }
        } else {
          a = d.getAt(g + 1)
        }
        if (!a && f.ownerCt) {
          a = f.ownerCt.nextChild(f, c)
        }
      }
      return a
    },
    onAdd: Ext.emptyFn,
    onBeforeAdd: function(b) {
      var a = b.ownerCt;
      if (a && a !== this) {
        a.remove(b, false)
      }
    },
    onMove: Ext.emptyFn,
    onRemove: Ext.emptyFn,
    onPosition: function() {
      Ext.Component.prototype.onPosition.apply(this, arguments);
      this.repositionFloatingItems()
    },
    onResize: function() {
      Ext.Component.prototype.onResize.apply(this, arguments);
      this.repositionFloatingItems()
    },
    prevChild: function(h, c) {
      var f = this,
        d = f.items,
        g = d.indexOf(h),
        e = 0,
        b = d.length,
        a;
      if (g !== -1) {
        if (c) {
          for (; e < b; e++) {
            a = d.getAt(g - e);
            if (!a || Ext.ComponentQuery.is(a, c)) {
              break
            }
          }
        } else {
          a = d.getAt(g - 1)
        }
        if (!a && f.ownerCt) {
          a = f.ownerCt.nextChild(f, c)
        }
      }
      return a
    },
    remove: function(b, a) {
      var d = this,
        e;
      if (d.destroyed || d.destroying) {
        return
      }
      e = d.getComponent(b);
      if (e && (!d.hasListeners.beforeremove || d.fireEvent("beforeremove",
          d, e) !== false)) {
        d.doRemove(e, a);
        if (d.hasListeners.remove) {
          d.fireEvent("remove", d, e)
        }
        if (!d.destroying && !e.floating) {
          d.updateLayout()
        }
      }
      return e
    },
    removeAll: function(c) {
      var g = this,
        e = g.items.items.slice().concat(g.floatingItems.items),
        b = [],
        d = 0,
        a = e.length,
        f;
      Ext.suspendLayouts();
      g.removingAll = true;
      for (; d < a; d++) {
        f = e[d];
        g.remove(f, c);
        if (f.ownerCt !== g) {
          b.push(f)
        }
      }
      g.removingAll = false;
      Ext.resumeLayouts(!!a);
      return b
    },
    setLayout: function(e) {
      var d = this,
        b = d.layout,
        f = b && b.isLayout,
        a, c;
      if (typeof e === "string") {
        e = {
          type: e
        }
      }
      c = e.type;
      if (f && (!c || (c === b.type))) {
        delete e.type;
        b.setConfig(e)
      } else {
        if (f) {
          b.setOwner(null)
        }
        a = d.self.prototype.layout;
        if (typeof a === "string") {
          e.type = c || a
        } else {
          Ext.merge(Ext.merge({}, a), e)
        }
        e = this.layout = Ext.Factory.layout(e);
        e.setOwner(this)
      }
      if (d.rendered) {
        d.updateLayout()
      }
    },
    setActiveItem: function(a) {
      return this.getLayout().setActiveItem(a)
    },
    privates: {
      applyDefaults: function(a) {
        var b = this,
          c = b.defaults;
        if (c) {
          if (Ext.isFunction(c)) {
            c = c.call(b, a)
          }
          if (Ext.isString(a)) {
            a = Ext.ComponentManager.get(a)
          }
          if (a.isComponent) {
            a.setConfig(c, null, b._applyDefaultsOptions)
          } else {
            a = b.getConfigurator().merge(b, Ext.Object.fork(c), a)
          }
        }
        return a
      },
      applyReference: function(a) {
        return this.setupReference(a)
      },
      applyTargetCls: function(a) {
        this.layoutTargetCls = a
      },
      detachComponent: function(a) {
        Ext.getDetachedBody().appendChild(a.getEl())
      },
      doRemove: function(c, b) {
        b = b === true || (b !== false && this.autoDestroy);
        var f = this,
          e = f.layout,
          a = e && f.rendered,
          d = c.destroying || b,
          g = c.floating;
        if (g) {
          f.floatingItems.remove(c)
        } else {
          f.items.remove(c)
        }
        if (a && !g) {
          if (e.running) {
            Ext.Component.cancelLayout(c, d)
          }
          e.onRemove(c, d)
        }
        c.onRemoved(d);
        f.onRemove(c, d);
        if (b) {
          c.destroy()
        } else {
          if (a && !g) {
            e.afterRemove(c)
          }
          if (f.detachOnRemove && c.rendered) {
            f.detachComponent(c)
          }
        }
      },
      finishRenderChildren: function() {
        Ext.Component.prototype.finishRenderChildren.call(this);
        var a = this.getLayout();
        if (a) {
          a.finishRender()
        }
      },
      getChildItemsToDisable: function() {
        return this.query("[isFormField],[isFocusableContainer],button")
      },
      getContentTarget: function() {
        return this.getLayout().getContentTarget()
      },
      getDefaultContentTarget: function() {
        return this.el
      },
      getScrollerEl: function() {
        return this.layout.getScrollerEl() || Ext.Component.prototype.getScrollerEl
          .call(this)
      },
      prepareItems: function(b, d) {
        if (Ext.isArray(b)) {
          b = b.slice()
        } else {
          b = [b]
        }
        var f = this,
          c = 0,
          a = b.length,
          e;
        for (; c < a; c++) {
          e = b[c];
          if (e == null) {
            Ext.Array.erase(b, c, 1);
            --c;
            --a
          } else {
            if (d) {
              e = this.applyDefaults(e)
            }
            e.$initParent = f;
            if (e.isComponent) {
              e.instancedCmp = true
            }
            b[c] = f.lookupComponent(e);
            delete e.$initParent
          }
        }
        return b
      },
      repositionFloatingItems: function() {
        var b = this.floatingItems.items,
          a = b.length,
          d, c;
        for (d = 0; d < a; d++) {
          c = b[d];
          if (c.el && !c.hidden) {
            c.setPosition(c.x, c.y)
          }
        }
      },
      _noMargin: {
        "margin-top": "",
        "margin-right": "",
        "margin-bottom": "",
        "margin-left": ""
      },
      resetItemMargins: function() {
        var a = this.items.items,
          c = a.length,
          b = this._noMargin,
          d;
        while (c--) {
          d = a[c];
          d.margin$ = null;
          d.el.setStyle(b)
        }
      },
      setupRenderTpl: function(a) {
        Ext.Component.prototype.setupRenderTpl.apply(this, arguments);
        this.getLayout().setupRenderTpl(a)
      }
    }
  }, 0, ["container"], ["component", "box", "container"], {
    component: true,
    box: true,
    container: true
  }, ["widget.container"], [
    [Ext.mixin.Queryable.prototype.mixinId || Ext.mixin.Queryable.$className,
      Ext.mixin.Queryable
    ],
    [Ext.mixin.Container.prototype.mixinId || Ext.mixin.Container.$className,
      Ext.mixin.Container
    ]
  ], [Ext.container, "Container", Ext, "Container", Ext, "AbstractContainer"],
  0));
(Ext.cmd.derive("Ext.Img", Ext.Component, {
  autoEl: "img",
  baseCls: "x-img",
  src: "",
  alt: "",
  title: "",
  imgCls: "",
  maskOnDisable: false,
  initComponent: function() {
    if (this.glyph) {
      this.autoEl = "div"
    }
    Ext.Component.prototype.initComponent.call(this)
  },
  getElConfig: function() {
    var e = this,
      g = e.autoEl,
      b = Ext.Component.prototype.getElConfig.call(this),
      f = Ext._glyphFontFamily,
      d = e.glyph,
      a, c;
    if (g === "img" || (Ext.isObject(g) && g.tag === "img")) {
      a = b
    } else {
      if (e.glyph) {
        if (typeof d === "string") {
          c = d.split("@");
          d = c[0];
          f = c[1] || f
        }
        b.html = "&#" + d + ";";
        if (f) {
          b.style = b.style || {};
          b.style.fontFamily = f
        }
        b.role = "img"
      } else {
        b.cn = [a = {
          tag: "img",
          id: e.id + "-img"
        }]
      }
    }
    if (a) {
      if (e.imgCls) {
        a.cls = (a.cls ? a.cls + " " : "") + e.imgCls
      }
      a.src = e.src || Ext.BLANK_IMAGE_URL
    }
    if (e.alt) {
      (a || b).alt = e.alt
    } else {
      (a || b).alt = ""
    }
    if (e.title) {
      (a || b).title = e.title
    }
    return b
  },
  onRender: function() {
    var b = this,
      c = b.autoEl,
      a;
    Ext.Component.prototype.onRender.apply(this, arguments);
    a = b.el;
    if (c === "img" || (Ext.isObject(c) && c.tag === "img")) {
      b.imgEl = a
    } else {
      b.imgEl = a.getById(b.id + "-img")
    }
  },
  onDestroy: function() {
    var a = this,
      b = a.imgEl;
    if (b && a.el !== b) {
      b.destroy()
    }
    this.imgEl = null;
    Ext.Component.prototype.onDestroy.call(this)
  },
  setSrc: function(c) {
    var a = this,
      b = a.imgEl;
    a.src = c;
    if (b) {
      b.dom.src = c || Ext.BLANK_IMAGE_URL
    }
  },
  setGlyph: function(e) {
    var d = this,
      f = Ext._glyphFontFamily,
      a = d.glyph,
      b = d.el,
      c;
    d.glyph = e;
    if (d.rendered && e !== a) {
      if (typeof e === "string") {
        c = e.split("@");
        e = c[0];
        f = c[1] || f
      }
      b.dom.innerHTML = "&#" + e + ";";
      if (f) {
        b.setStyle("font-family", f)
      }
    }
  }
}, 0, ["image", "imagecomponent"], ["component", "box", "image",
  "imagecomponent"
], {
  component: true,
  box: true,
  image: true,
  imagecomponent: true
}, ["widget.image", "widget.imagecomponent"], 0, [Ext, "Img"], 0));
(Ext.cmd.derive("Ext.util.StoreHolder", Ext.Base, {
  mixinId: "storeholder",
  bindStore: function(b, c, a) {
    a = a || "store";
    var d = this,
      e = c ? null : d[a];
    if (b !== e) {
      if (e) {
        d.onUnbindStore(e, c, a);
        if (d.isComponent && a === "store" && e.autoDestroy) {
          e.destroy()
        } else {
          d.unbindStoreListeners(e)
        }
      }
      if (b) {
        d[a] = b = Ext.data.StoreManager.lookup(b);
        d.bindStoreListeners(b);
        d.onBindStore(b, c, a, e)
      } else {
        d[a] = null
      }
    }
    return d
  },
  getStore: function() {
    return this.store
  },
  setStore: function(a) {
    this.bindStore(a)
  },
  unbindStoreListeners: function(a) {
    var b = this.storeListeners;
    if (b) {
      a.un(b)
    }
  },
  bindStoreListeners: function(a) {
    var b = this.getStoreListeners(a);
    if (b) {
      b = Ext.apply({}, b);
      if (!b.scope) {
        b.scope = this
      }
      this.storeListeners = b;
      a.on(b)
    }
  },
  getStoreListeners: Ext.emptyFn,
  onUnbindStore: Ext.emptyFn,
  onBindStore: Ext.emptyFn
}, 0, 0, 0, 0, 0, 0, [Ext.util, "StoreHolder"], 0));
(Ext.cmd.derive("Ext.LoadMask", Ext.Component, {
  isLoadMask: true,
  msg: "Loading...",
  msgCls: "x-mask-loading",
  msgWrapCls: "x-mask-msg",
  useMsg: true,
  useTargetEl: false,
  cls: "x-mask",
  componentCls: "x-border-box",
  ariaRole: "status",
  focusable: true,
  tabIndex: 0,
  autoEl: {
    tag: "div",
    role: "status"
  },
  childEls: ["msgWrapEl", "msgEl", "msgTextEl"],
  renderTpl: [
    '<div id="{id}-msgWrapEl" data-ref="msgWrapEl" class="{[values.$comp.msgWrapCls]}">',
    '<div id="{id}-msgEl" data-ref="msgEl" class="{[values.$comp.msgCls]} ',
    "x-", 'mask-msg-inner {childElCls}">',
    '<div id="{id}-msgTextEl" data-ref="msgTextEl" class="', "x-",
    "mask-msg-text", '{childElCls}">{msg}</div>', "</div>", "</div>"
  ],
  skipLayout: true,
  constructor: function(b) {
    var c = this,
      a;
    if (arguments.length === 2) {
      a = c.target = b;
      b = arguments[1]
    } else {
      a = b.target
    }
    Ext.Component.prototype.constructor.call(this, b);
    if (a.isComponent) {
      c.ownerCt = a;
      c.hidden = true;
      c.renderTo = c.getMaskTarget();
      c.external = c.renderTo === Ext.getBody();
      c.bindComponent(a)
    } else {
      a = Ext.get(a);
      c.isElement = true;
      c.renderTo = c.target
    }
    c.render(c.renderTo);
    if (c.store) {
      c.bindStore(c.store, true)
    }
  },
  initRenderData: function() {
    var a = Ext.Component.prototype.initRenderData.apply(this, arguments);
    a.msg = this.msg || "";
    return a
  },
  onRender: function() {
    Ext.Component.prototype.onRender.apply(this, arguments);
    this.maskEl = this.el
  },
  bindComponent: function(a) {
    var c = this,
      b = {
        scope: this,
        resize: c.sizeMask
      };
    if (c.external) {
      b.added = c.onComponentAdded;
      b.removed = c.onComponentRemoved;
      if (a.floating) {
        b.move = c.sizeMask;
        c.activeOwner = a
      } else {
        if (a.ownerCt) {
          c.onComponentAdded(a.ownerCt)
        }
      }
    }
    c.mon(a, b);
    if (c.external) {
      c.mon(Ext.GlobalEvents, {
        show: c.onContainerShow,
        hide: c.onContainerHide,
        expand: c.onContainerExpand,
        collapse: c.onContainerCollapse,
        scope: c
      })
    }
  },
  onComponentAdded: function(a) {
    var b = this;
    delete b.activeOwner;
    b.floatParent = a;
    if (!a.floating) {
      a = a.up("[floating]")
    }
    if (a) {
      b.activeOwner = a;
      b.mon(a, "move", b.sizeMask, b);
      b.mon(a, "tofront", b.onOwnerToFront, b)
    } else {
      b.preventBringToFront = true
    }
    a = b.floatParent.ownerCt;
    if (b.rendered && b.isVisible() && a) {
      b.floatOwner = a;
      b.mon(a, "afterlayout", b.sizeMask, b, {
        single: true
      })
    }
  },
  onComponentRemoved: function(a) {
    var c = this,
      d = c.activeOwner,
      b = c.floatOwner;
    if (d) {
      c.mun(d, "move", c.sizeMask, c);
      c.mun(d, "tofront", c.onOwnerToFront, c)
    }
    if (b) {
      c.mun(b, "afterlayout", c.sizeMask, c)
    }
    delete c.activeOwner;
    delete c.floatOwner
  },
  afterRender: function() {
    var a = this;
    Ext.Component.prototype.afterRender.apply(this, arguments);
    if (Ext.isIE) {
      a.el.on("mousedown", a.onMouseDown, a)
    }
    this.el.skipGarbageCollection = true
  },
  onMouseDown: function(b) {
    var a = this.el;
    if (b.within(a)) {
      b.preventDefault();
      a.focus()
    }
  },
  onOwnerToFront: function(a, b) {
    this.el.setStyle("zIndex", b + 1)
  },
  onContainerShow: function(a) {
    if (!this.isHierarchicallyHidden()) {
      this.onComponentShow()
    }
  },
  onContainerHide: function(a) {
    if (this.isHierarchicallyHidden()) {
      this.onComponentHide()
    }
  },
  onContainerExpand: function(a) {
    if (!this.isHierarchicallyHidden()) {
      this.onComponentShow()
    }
  },
  onContainerCollapse: function(a) {
    if (this.isHierarchicallyHidden()) {
      this.onComponentHide()
    }
  },
  onComponentHide: function() {
    var a = this;
    if (a.rendered && a.isVisible()) {
      a.hide();
      a.showNext = true
    }
  },
  onComponentShow: function() {
    if (this.showNext) {
      this.show()
    }
    delete this.showNext
  },
  sizeMask: function() {
    var b = this,
      c = b.activeOwner || b.target,
      a = b.external ? b.getOwner().el : b.getMaskTarget();
    if (b.rendered && b.isVisible()) {
      if (b.external) {
        if (!b.isElement && c.floating) {
          b.onOwnerToFront(c, c.el.getZIndex())
        }
        b.el.setSize(a.getSize()).alignTo(a, "tl-tl")
      }
      b.msgWrapEl.center(b.el)
    }
  },
  bindStore: function(a, b) {
    var c = this;
    Ext.destroy(c.proxyListeners);
    c.mixins.storeholder.bindStore.apply(c, arguments);
    a = c.store;
    if (a) {
      while (a.getSource) {
        a = a.getSource()
      }
      if (!a.loadsSynchronously()) {
        c.proxyListeners = a.getProxy().on({
          exception: c.onLoad,
          scope: c,
          destroyable: true
        })
      }
      if (a.isLoading()) {
        c.onBeforeLoad()
      }
    }
  },
  getStoreListeners: function(b) {
    var d = this.onLoad,
      c = this.onBeforeLoad,
      a = {
        cachemiss: c,
        cachefilled: {
          fn: d,
          buffer: 100
        }
      };
    if (!b.loadsSynchronously()) {
      a.beforeload = c;
      a.load = d
    }
    return a
  },
  onDisable: function() {
    Ext.Component.prototype.onDisable.apply(this, arguments);
    if (this.loading) {
      this.onLoad()
    }
  },
  getOwner: function() {
    return this.ownerCt || this.ownerCmp || this.floatParent
  },
  getMaskTarget: function() {
    var a = this.getOwner();
    if (this.isElement) {
      return this.target
    }
    return this.useTargetEl ? a.getTargetEl() : (a.getMaskTarget() || Ext
      .getBody())
  },
  onBeforeLoad: function() {
    var c = this,
      a = c.getOwner(),
      b;
    if (!c.disabled) {
      c.loading = true;
      if (a.componentLayoutCounter) {
        c.maybeShow()
      } else {
        b = a.afterComponentLayout;
        a.afterComponentLayout = function() {
          a.afterComponentLayout = b;
          b.apply(a, arguments);
          c.maybeShow()
        }
      }
    }
  },
  maybeShow: function() {
    var b = this,
      a = b.getOwner();
    if (!a.isVisible(true)) {
      b.showNext = true
    } else {
      if (b.loading && a.rendered) {
        b.show()
      }
    }
  },
  hide: function() {
    var b = this,
      a = b.ownerCt;
    if (b.isElement) {
      a.unmask();
      b.fireEvent("hide", this);
      return
    }
    if (a) {
      a.enableTabbing();
      a.setMasked(false)
    }
    delete b.showNext;
    return Ext.Component.prototype.hide.apply(this, arguments)
  },
  show: function() {
    var a = this;
    if (a.isElement) {
      a.ownerCt.mask(this.useMsg ? this.msg : "", this.msgCls);
      a.fireEvent("show", this);
      return
    }
    return Ext.Component.prototype.show.apply(this, arguments)
  },
  afterShow: function() {
    var b = this,
      a = b.ownerCt;
    b.loading = true;
    Ext.Component.prototype.afterShow.apply(this, arguments);
    a.disableTabbing();
    a.setMasked(true);
    b.el.restoreTabbableState();
    b.syncMaskState()
  },
  syncMaskState: function() {
    var c = this,
      b = c.ownerCt,
      a = c.el;
    if (c.isVisible()) {
      if (c.hasOwnProperty("msgWrapCls")) {
        a.dom.className = c.msgWrapCls
      }
      if (c.useMsg) {
        c.msgTextEl.setHtml(c.msg)
      } else {
        c.msgEl.hide()
      }
      if (c.shim || Ext.useShims) {
        a.enableShim(null, true)
      } else {
        a.disableShim()
      }
      if (b.containsFocus) {
        c.focus()
      }
      c.sizeMask()
    }
  },
  onLoad: function() {
    this.loading = false;
    this.hide()
  },
  beforeDestroy: function() {
    this.ownerCt = null;
    this.bindStore(null);
    Ext.Component.prototype.beforeDestroy.call(this)
  },
  onDestroy: function() {
    var a = this;
    if (a.isElement) {
      a.ownerCt.unmask()
    }
    Ext.Component.prototype.onDestroy.call(this)
  }
}, 1, ["loadmask"], ["component", "box", "loadmask"], {
  component: true,
  box: true,
  loadmask: true
}, ["widget.loadmask"], [
  [Ext.util.StoreHolder.prototype.mixinId || Ext.util.StoreHolder.$className,
    Ext.util.StoreHolder
  ]
], [Ext, "LoadMask"], 0));
(Ext.cmd.derive("Ext.layout.component.Component", Ext.layout.Layout, {
  type: "component",
  isComponentLayout: true,
  nullBox: {},
  usesContentHeight: true,
  usesContentWidth: true,
  usesHeight: true,
  usesWidth: true,
  widthCache: {},
  heightCache: {},
  beginLayoutCycle: function(d, p) {
    var k = this,
      c = k.owner,
      g = d.ownerCtContext,
      h = d.heightModel,
      i = d.widthModel,
      j = c.el.dom === document.body,
      f = c.lastBox || k.nullBox,
      m = c.el.lastBox || k.nullBox,
      a = !j,
      e = d.isTopLevel,
      l, n, b, o;
    Ext.layout.Layout.prototype.beginLayoutCycle.call(this, d, p);
    if (p) {
      if (k.usesContentWidth) {
        ++d.consumersContentWidth
      }
      if (k.usesContentHeight) {
        ++d.consumersContentHeight
      }
      if (k.usesWidth) {
        ++d.consumersWidth
      }
      if (k.usesHeight) {
        ++d.consumersHeight
      }
      if (g && !g.hasRawContent) {
        l = c.ownerLayout;
        if (l) {
          if (l.usesWidth) {
            ++d.consumersWidth
          }
          if (l.usesHeight) {
            ++d.consumersHeight
          }
        }
      }
    }
    if (i.configured) {
      b = c[i.names.width];
      if (e && i.calculatedFrom) {
        b = f.width
      }
      if (!j) {
        a = k.setWidthInDom || (p ? b !== m.width : i.constrained)
      }
      d.setWidth(b, a)
    } else {
      if (e) {
        if (i.calculated) {
          n = f.width;
          d.setWidth(n, n !== m.width)
        }
        n = f.x;
        d.setProp("x", n, n !== m.x)
      }
    }
    if (h.configured) {
      o = c[h.names.height];
      if (e && h.calculatedFrom) {
        o = f.height
      }
      if (!j) {
        a = p ? o !== m.height : h.constrained
      }
      d.setHeight(o, a)
    } else {
      if (e) {
        if (h.calculated) {
          n = f.height;
          d.setHeight(n, n !== m.height)
        }
        n = f.y;
        d.setProp("y", n, n !== m.y)
      }
    }
  },
  finishedLayout: function(b) {
    var g = this,
      j = b.children,
      a = g.owner,
      e, c, h, d, f;
    if (j) {
      e = j.length;
      for (c = 0; c < e; c++) {
        h = j[c];
        h.el.lastBox = h.props
      }
    }
    b.previousSize = g.lastComponentSize;
    g.lastComponentSize = a.el.lastBox = f = b.props;
    d = a.lastBox || (a.lastBox = {});
    d.x = f.x;
    d.y = f.y;
    d.width = f.width;
    d.height = f.height;
    d.invalid = false;
    Ext.layout.Layout.prototype.finishedLayout.call(this, b)
  },
  notifyOwner: function(c) {
    var b = this,
      a = b.lastComponentSize,
      d = c.previousSize;
    b.owner.afterComponentLayout(a.width, a.height, d ? d.width :
      undefined, d ? d.height : undefined)
  },
  getTarget: function() {
    return this.owner.el
  },
  getRenderTarget: function() {
    return this.owner.el
  },
  cacheTargetInfo: function(b) {
    var a = this,
      d = a.targetInfo,
      c;
    if (!d) {
      c = b.getEl("getTarget", a);
      a.targetInfo = d = {
        padding: c.getPaddingInfo(),
        border: c.getBorderInfo()
      }
    }
    return d
  },
  measureAutoDimensions: function(l, h) {
    var t = this,
      a = t.owner,
      q = a.layout,
      d = l.heightModel,
      g = l.widthModel,
      c = l.boxParent,
      n = l.isBoxParent,
      u = l.target,
      b = l.props,
      i, v = {
        gotWidth: false,
        gotHeight: false,
        isContainer: (i = !l.hasRawContent)
      },
      s = h || 3,
      p, e, j = 0,
      f = 0,
      k, o, r, w, m;
    if (g.shrinkWrap && l.consumersContentWidth) {
      ++j;
      p = !(s & 1);
      if (i) {
        if (p) {
          v.contentWidth = 0;
          v.gotWidth = true;
          ++f
        } else {
          if ((v.contentWidth = l.getProp("contentWidth")) !== undefined) {
            v.gotWidth = true;
            ++f
          }
        }
      } else {
        o = b.contentWidth;
        if (typeof o === "number") {
          v.contentWidth = o;
          v.gotWidth = true;
          ++f
        } else {
          if (p) {
            k = true
          } else {
            if (!l.hasDomProp("containerChildrenSizeDone")) {
              k = false
            } else {
              if (n || !c || c.widthModel.shrinkWrap) {
                k = true
              } else {
                k = c.hasDomProp("width")
              }
            }
          }
          if (k) {
            if (p) {
              r = 0
            } else {
              if (q && q.measureContentWidth) {
                r = q.measureContentWidth(l)
              } else {
                if (u.cacheWidth) {
                  w = u.xtype + "-" + u.ui;
                  m = t.widthCache;
                  r = m[w] || (m[w] = t.measureContentWidth(l))
                } else {
                  r = t.measureContentWidth(l)
                }
              }
            }
            if (!isNaN(v.contentWidth = r)) {
              l.setContentWidth(r, true);
              v.gotWidth = true;
              ++f
            }
          }
        }
      }
    } else {
      if (g.natural && l.consumersWidth) {
        ++j;
        o = b.width;
        if (typeof o === "number") {
          v.width = o;
          v.gotWidth = true;
          ++f
        } else {
          if (n || !c) {
            k = true
          } else {
            k = c.hasDomProp("width")
          }
          if (k) {
            if (!isNaN(v.width = t.measureOwnerWidth(l))) {
              l.setWidth(v.width, false);
              v.gotWidth = true;
              ++f
            }
          }
        }
      }
    }
    if (d.shrinkWrap && l.consumersContentHeight) {
      ++j;
      e = !(s & 2);
      if (i) {
        if (e) {
          v.contentHeight = 0;
          v.gotHeight = true;
          ++f
        } else {
          if ((v.contentHeight = l.getProp("contentHeight")) !==
            undefined) {
            v.gotHeight = true;
            ++f
          }
        }
      } else {
        o = b.contentHeight;
        if (typeof o === "number") {
          v.contentHeight = o;
          v.gotHeight = true;
          ++f
        } else {
          if (e) {
            k = true
          } else {
            if (!l.hasDomProp("containerChildrenSizeDone")) {
              k = false
            } else {
              if (a.noWrap) {
                k = true
              } else {
                if (!g.shrinkWrap) {
                  k = (l.bodyContext || l).hasDomProp("width")
                } else {
                  if (n || !c || c.widthModel.shrinkWrap) {
                    k = true
                  } else {
                    k = c.hasDomProp("width")
                  }
                }
              }
            }
          }
          if (k) {
            if (e) {
              r = 0
            } else {
              if (q && q.measureContentHeight) {
                r = q.measureContentHeight(l)
              } else {
                if (u.cacheHeight) {
                  w = u.xtype + "-" + u.ui;
                  m = t.heightCache;
                  r = m[w] || (m[w] = t.measureContentHeight(l))
                } else {
                  r = t.measureContentHeight(l)
                }
              }
            }
            if (!isNaN(v.contentHeight = r)) {
              l.setContentHeight(r, true);
              v.gotHeight = true;
              ++f
            }
          }
        }
      }
    } else {
      if (d.natural && l.consumersHeight) {
        ++j;
        o = b.height;
        if (typeof o === "number") {
          v.height = o;
          v.gotHeight = true;
          ++f
        } else {
          if (n || !c) {
            k = true
          } else {
            k = c.hasDomProp("width")
          }
          if (k) {
            if (!isNaN(v.height = t.measureOwnerHeight(l))) {
              l.setHeight(v.height, false);
              v.gotHeight = true;
              ++f
            }
          }
        }
      }
    }
    if (c) {
      l.onBoxMeasured()
    }
    v.gotAll = f === j;
    return v
  },
  measureContentWidth: function(a) {
    return a.el.getWidth() - a.getFrameInfo().width
  },
  measureContentHeight: function(a) {
    return a.el.getHeight() - a.getFrameInfo().height
  },
  measureOwnerHeight: function(a) {
    return a.el.getHeight()
  },
  measureOwnerWidth: function(a) {
    return a.el.getWidth()
  }
}, 0, 0, 0, 0, 0, 0, [Ext.layout.component, "Component"], 0));
(Ext.cmd.derive("Ext.layout.component.Auto", Ext.layout.component.Component, {
    type: "autocomponent",
    setHeightInDom: false,
    setWidthInDom: false,
    waitForOuterHeightInDom: false,
    waitForOuterWidthInDom: false,
    beginLayoutCycle: function(d, a) {
      var c = this,
        f = c.lastWidthModel,
        e = c.lastHeightModel,
        b = c.owner.el;
      Ext.layout.component.Component.prototype.beginLayoutCycle.apply(this,
        arguments);
      if (f && f.fixed && d.widthModel.shrinkWrap) {
        b.setWidth(null)
      }
      if (e && e.fixed && d.heightModel.shrinkWrap) {
        b.setHeight(null)
      }
    },
    calculate: function(g) {
      var f = this,
        e = f.measureAutoDimensions(g),
        b = g.heightModel,
        c = g.widthModel,
        d, a;
      if (e.gotWidth) {
        if (c.shrinkWrap) {
          f.publishOwnerWidth(g, e.contentWidth)
        } else {
          if (f.publishInnerWidth) {
            f.publishInnerWidth(g, e.width)
          }
        }
      } else {
        if (!c.auto && f.publishInnerWidth) {
          d = f.waitForOuterWidthInDom ? g.getDomProp("width") : g.getProp(
            "width");
          if (d === undefined) {
            f.done = false
          } else {
            f.publishInnerWidth(g, d)
          }
        }
      }
      if (e.gotHeight) {
        if (b.shrinkWrap) {
          f.publishOwnerHeight(g, e.contentHeight)
        } else {
          if (f.publishInnerHeight) {
            f.publishInnerHeight(g, e.height)
          }
        }
      } else {
        if (!b.auto && f.publishInnerHeight) {
          a = f.waitForOuterHeightInDom ? g.getDomProp("height") : g.getProp(
            "height");
          if (a === undefined) {
            f.done = false
          } else {
            f.publishInnerHeight(g, a)
          }
        }
      }
      if (!e.gotAll) {
        f.done = false
      }
    },
    calculateOwnerHeightFromContentHeight: function(b, a) {
      return a + b.getFrameInfo().height
    },
    calculateOwnerWidthFromContentWidth: function(b, a) {
      return a + b.getFrameInfo().width
    },
    publishOwnerHeight: function(h, f) {
      var e = this,
        b = e.owner,
        a = e.calculateOwnerHeightFromContentHeight(h, f),
        g, d, c;
      if (isNaN(a)) {
        e.done = false
      } else {
        g = Ext.Number.constrain(a, b.minHeight, b.maxHeight);
        if (g === a) {
          d = e.setHeightInDom
        } else {
          c = e.sizeModels[(g < a) ? "constrainedMax" : "constrainedMin"];
          a = g;
          if (h.heightModel.calculatedFromShrinkWrap) {
            h.heightModel = c
          } else {
            h.invalidate({
              heightModel: c
            })
          }
        }
        h.setHeight(a, d)
      }
    },
    publishOwnerWidth: function(g, b) {
      var f = this,
        a = f.owner,
        e = f.calculateOwnerWidthFromContentWidth(g, b),
        h, d, c;
      if (isNaN(e)) {
        f.done = false
      } else {
        h = Ext.Number.constrain(e, a.minWidth, a.maxWidth);
        if (h === e) {
          d = f.setWidthInDom
        } else {
          c = f.sizeModels[(h < e) ? "constrainedMax" : "constrainedMin"];
          e = h;
          if (g.widthModel.calculatedFromShrinkWrap) {
            g.widthModel = c
          } else {
            g.invalidate({
              widthModel: c
            })
          }
        }
        g.setWidth(e, d)
      }
    }
  }, 0, 0, 0, 0, ["layout.autocomponent"], 0, [Ext.layout.component, "Auto"],
  0));