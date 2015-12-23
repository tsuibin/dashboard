  
(Ext.cmd.derive("Ext.grid.plugin.RowExpander", Ext.plugin.Abstract, {
    lockableScope: "normal",
    columnWidth: 24,
    rowBodyTpl: null,
    lockedTpl: null,
    expandOnDblClick: true,
    selectRowOnExpand: false,
    headerWidth: 24,
    bodyBefore: false,
    rowBodyTrSelector: ".x-grid-rowbody-tr",
    rowBodyHiddenCls: "x-grid-row-body-hidden",
    rowCollapsedCls: "x-grid-row-collapsed",
    addCollapsedCls: {
      fn: function(b, a, c) {
        var d = this.rowExpander;
        if (!d.recordsExpanded[a.record.internalId]) {
          a.itemClasses.push(d.rowCollapsedCls)
        }
        this.nextTpl.applyOut(a, b, c)
      },
      syncRowHeights: function(a, b) {
        this.rowExpander.syncRowHeights(a, b)
      },
      priority: 20000
    },
    setCmp: function(a) {
      var c = this,
        b;
      Ext.plugin.Abstract.prototype.setCmp.apply(this, arguments);
      c.recordsExpanded = {};
      c.rowBodyTpl = Ext.XTemplate.getTpl(c, "rowBodyTpl");
      b = c.getFeatureConfig(a);
      if (a.features) {
        a.features = Ext.Array.push(b, a.features)
      } else {
        a.features = b
      }
    },
    getFeatureConfig: function(a) {
      var c = this,
        b = [],
        d = {
          ftype: "rowbody",
          rowExpander: c,
          bodyBefore: c.bodyBefore,
          recordsExpanded: c.recordsExpanded,
          rowBodyHiddenCls: c.rowBodyHiddenCls,
          rowCollapsedCls: c.rowCollapsedCls,
          setupRowData: c.getRowBodyFeatureData,
          setup: c.setup
        };
      b.push(Ext.apply({
        lockableScope: "normal",
        getRowBodyContents: c.getRowBodyContentsFn(c.rowBodyTpl)
      }, d));
      if (a.enableLocking) {
        b.push(Ext.apply({
          lockableScope: "locked",
          getRowBodyContents: c.lockedTpl ? c.getRowBodyContentsFn(c.lockedTpl) : function() {
            return ""
          }
        }, d))
      }
      return b
    },
    getRowBodyContentsFn: function(a) {
      var b = this;
      return function(c) {
        a.owner = b;
        return a.applyTemplate(c.record.getData())
      }
    },
    init: function(b) {
      if (b.lockable) {
        b = b.normalGrid
      }
      var d = this,
        e = b.ownerLockable,
        a, c;
      Ext.plugin.Abstract.prototype.init.apply(this, arguments);
      d.grid = b;
      a = d.view = b.getView();
      d.bindView(a);
      a.addRowTpl(d.addCollapsedCls).rowExpander = d;
      if (e) {
        d.addExpander(e.lockedGrid.headerCt.items.getCount() ? e.lockedGrid :
          b);
        c = e.lockedGrid.getView();
        d.bindView(c);
        c.addRowTpl(d.addCollapsedCls).rowExpander = d;
        e.syncRowHeight = true;
        e.mon(e, {
          processcolumns: d.onLockableProcessColumns,
          lockcolumn: d.onColumnLock,
          unlockcolumn: d.onColumnUnlock,
          scope: d
        });
        d.viewListeners = a.on({
          itemadd: Ext.Function.createAnimationFrame(e.syncRowHeights,
            e)
        })
      } else {
        d.addExpander(b);
        b.on("beforereconfigure", d.beforeReconfigure, d)
      }
    },
    beforeReconfigure: function(d, a, c, f, b) {
      var e = this;
      if (e.viewListeners) {
        e.viewListeners.destroy()
      }
      if (c) {
        e.expanderColumn = new Ext.grid.Column(e.getHeaderConfig());
        c.unshift(e.expanderColumn)
      }
    },
    onLockableProcessColumns: function(c, b, a) {
      this.addExpander(b.length ? c.lockedGrid : c.normalGrid)
    },
    addExpander: function(b) {
      var a = this;
      a.grid = b;
      a.expanderColumn = b.headerCt.insert(0, a.getHeaderConfig());
      b.getSelectionModel().injectCheckbox = 1
    },
    getRowBodyFeatureData: function(b, a, d) {
      var c = this;
      c.self.prototype.setupRowData.apply(c, arguments);
      d.rowBody = c.getRowBodyContents(d);
      d.rowBodyCls = c.recordsExpanded[b.internalId] ? "" : c.rowBodyHiddenCls
    },
    setup: function(c, d) {
      var b = this,
        a = b.grid.ownerLockable;
      b.self.prototype.setup.apply(b, arguments);
      if (a && Ext.Array.indexOf(b.grid.columnManager.getColumns(), b.rowExpander
          .expanderColumn) !== -1) {
        d.rowBodyColspan -= 1
      }
    },
    bindView: function(a) {
      a.on("itemkeydown", this.onKeyDown, this);
      if (this.expandOnDblClick) {
        a.on("itemdblclick", this.onDblClick, this)
      }
    },
    onKeyDown: function(h, c, j, a, d) {
      var f = this,
        i = d.getKey(),
        g = h.getNavigationModel().getPosition(),
        b;
      if (g) {
        j = Ext.fly(j);
        b = j.hasCls(f.rowCollapsedCls);
        if (((i === 107 || (i === 187 && d.shiftKey)) && b) || ((i === 109 ||
            i === 189) && !b)) {
          f.toggleRow(a, c)
        }
      }
    },
    onDblClick: function(b, a, f, c, d) {
      this.toggleRow(c, a)
    },
    toggleRow: function(b, f) {
      var k = this,
        l = k.view,
        n = l.bufferedRenderer,
        g = l.getScrollable(),
        o = l,
        c = l.getNode(b),
        e = Ext.fly(c),
        d, h = e.down(k.rowBodyTrSelector, true),
        p = e.hasCls(k.rowCollapsedCls),
        m = p ? "removeCls" : "addCls",
        j = p ? 2 : 1,
        a = k.grid.ownerLockable,
        i;
      e[m](k.rowCollapsedCls);
      Ext.fly(h)[m](k.rowBodyHiddenCls);
      k.recordsExpanded[f.internalId] = p;
      if (k.grid.ownerLockable) {
        o = a.getView();
        if (a.lockedGrid.isVisible()) {
          l = a.view.lockedGrid.view;
          d = Ext.fly(l.getNode(b));
          if (d) {
            d[m](k.rowCollapsedCls);
            h = d.down(k.rowBodyTrSelector, true);
            Ext.fly(h)[m](k.rowBodyHiddenCls)
          }
        }
      }
      if (k.expanderColumn) {
        i = Ext.fly(l.getRow(b)).down(k.expanderColumn.getCellSelector(),
          true);
        if (i) {
          i.rowSpan = j
        }
      }
      o.fireEvent(p ? "expandbody" : "collapsebody", c, f, h);
      if (l.getSizeModel().height.shrinkWrap || a) {
        l.refreshSize(true)
      }
      if (g) {
        if (n) {
          n.refreshSize()
        } else {
          g.refresh(true)
        }
      }
    },
    syncRowHeights: function(a, g) {
      var d = this,
        c = Ext.fly(a).down(d.rowBodyTrSelector),
        b = Ext.fly(g).down(d.rowBodyTrSelector),
        f, e;
      if (b.isVisible()) {
        if ((f = c.getHeight()) !== (e = b.getHeight())) {
          if (f > e) {
            b.setHeight(f)
          } else {
            c.setHeight(e)
          }
        }
      } else {
        c.dom.style.height = b.dom.style.height = ""
      }
    },
    onColumnUnlock: function(c, a) {
      var b = this,
        d;
      c = b.grid.ownerLockable;
      d = c.lockedGrid.visibleColumnManager.getColumns();
      if (d.length === 1) {
        if (d[0] === b.expanderColumn) {
          c.unlock(b.expanderColumn);
          b.grid = c.normalGrid
        } else {
          c.lock(b.expanderColumn, 0)
        }
      }
    },
    onColumnLock: function(c, a) {
      var b = this,
        e, d;
      c = b.grid.ownerLockable;
      e = c.lockedGrid.visibleColumnManager.getColumns();
      if (e.length === 1) {
        b.grid = d = c.lockedGrid;
        d.headerCt.insert(0, b.expanderColumn)
      }
    },
    getHeaderConfig: function() {
      var b = this,
        a = b.grid.ownerLockable;
      return {
        width: b.headerWidth,
        ignoreExport: true,
        lockable: false,
        autoLock: true,
        sortable: false,
        resizable: false,
        draggable: false,
        hideable: false,
        menuDisabled: true,
        tdCls: "x-grid-cell-special",
        innerCls: "x-grid-cell-inner-row-expander",
        renderer: function() {
          return '<div class="x-grid-row-expander" role="presentation" tabIndex="0"></div>'
        },
        processEvent: function(h, f, c, j, g, i, d) {
          if ((h === "click" && i.getTarget(".x-grid-row-expander")) || (
              h === "keydown" && i.getKey() === i.SPACE)) {
            b.toggleRow(j, d);
            return b.selectRowOnExpand
          }
        },
        isLocked: function() {
          return a && (a.lockedGrid.isVisible() || this.locked)
        },
        editRenderer: function() {
          return "&#160;"
        }
      }
    }
  }, 0, 0, 0, 0, ["plugin.rowexpander"], 0, [Ext.grid.plugin, "RowExpander"],
  0));
Ext.define("Ext.theme.touchsizing.grid.plugin.RowExpander", {
  override: "Ext.grid.plugin.RowExpander",
  headerWidth: 32
});
(Ext.cmd.derive("Ext.util.Queue", Ext.Base, {
  constructor: function() {
    this.clear()
  },
  add: function(c) {
    var b = this,
      a = b.getKey(c);
    if (!b.map[a]) {
      ++b.length;
      b.items.push(c);
      b.map[a] = c
    }
    return c
  },
  clear: function() {
    var b = this,
      a = b.items;
    b.items = [];
    b.map = {};
    b.length = 0;
    return a
  },
  contains: function(b) {
    var a = this.getKey(b);
    return this.map.hasOwnProperty(a)
  },
  getCount: function() {
    return this.length
  },
  getKey: function(a) {
    return a.id
  },
  remove: function(e) {
    var d = this,
      c = d.getKey(e),
      a = d.items,
      b;
    if (d.map[c]) {
      b = Ext.Array.indexOf(a, e);
      Ext.Array.erase(a, b, 1);
      delete d.map[c];
      --d.length
    }
    return e
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "Queue"], 0));
(Ext.cmd.derive("Ext.layout.ContextItem", Ext.Base, {
  heightModel: null,
  widthModel: null,
  sizeModel: null,
  optOut: false,
  ownerSizePolicy: null,
  boxChildren: null,
  boxParent: null,
  children: [],
  dirty: null,
  dirtyCount: 0,
  hasRawContent: true,
  isContextItem: true,
  isTopLevel: false,
  consumersContentHeight: 0,
  consumersContentWidth: 0,
  consumersContainerHeight: 0,
  consumersContainerWidth: 0,
  consumersHeight: 0,
  consumersWidth: 0,
  ownerCtContext: null,
  remainingChildDimensions: 0,
  props: null,
  state: null,
  wrapsComponent: false,
  constructor: function(q) {
    var r = this,
      o = Ext.layout.SizeModel.sizeModels,
      j = o.configured,
      i = o.shrinkWrap,
      b, p, m, l, f, d, s, e, n, k, c, h, g, a;
    Ext.apply(r, q);
    s = r.target;
    b = r.el;
    r.id = s.id;
    r.flushedProps = {};
    r.props = f = {};
    r.styles = {};
    if (!s.isComponent) {
      p = b.lastBox
    } else {
      r.wrapsComponent = true;
      r.framing = s.frameSize || null;
      r.isComponentChild = s.ownerLayout && s.ownerLayout.isComponentLayout;
      p = s.lastBox;
      m = s.ownerCt;
      if (m && (l = m.el && r.context.items[m.el.id])) {
        r.ownerCtContext = l
      }
      r.sizeModel = d = s.getSizeModel(l && l.widthModel.pairsByHeightOrdinal[
        l.heightModel.ordinal]);
      r.widthModel = h = d.width;
      r.heightModel = g = d.height;
      if (p && p.invalid === false) {
        k = (s.width === (e = p.width));
        c = (s.height === (n = p.height));
        if (h === i && g === i) {
          a = true
        } else {
          if (h === j && k) {
            a = g === i || (g === j && c)
          }
        }
        if (a) {
          r.optOut = true;
          f.width = e;
          f.height = n
        }
      }
    }
    r.lastBox = p
  },
  init: function(h, c) {
    var s = this,
      a = s.props,
      d = s.dirty,
      k = s.ownerCtContext,
      o = s.target.ownerLayout,
      g = !s.state,
      t = h || g,
      e, m, l, p, b, u, v = s.heightModel,
      f = s.widthModel,
      j, q, r = 0;
    s.dirty = s.invalid = false;
    s.props = {};
    s.remainingChildDimensions = 0;
    if (s.boxChildren) {
      s.boxChildren.length = 0
    }
    if (!g) {
      s.clearAllBlocks("blocks");
      s.clearAllBlocks("domBlocks")
    }
    if (!s.wrapsComponent) {
      return t
    }
    u = s.target;
    s.state = {};
    if (g) {
      if (u.beforeLayout && u.beforeLayout !== Ext.emptyFn) {
        u.beforeLayout()
      }
      if (!k && (p = u.ownerCt)) {
        k = s.context.items[p.el.id]
      }
      if (k) {
        s.ownerCtContext = k;
        s.isBoxParent = o && o.isItemBoxParent(s)
      } else {
        s.isTopLevel = true
      }
      s.frameBodyContext = s.getEl("frameBody")
    } else {
      k = s.ownerCtContext;
      s.isTopLevel = !k;
      e = s.children;
      for (m = 0, l = e.length; m < l; ++m) {
        e[m].init(true)
      }
    }
    s.hasRawContent = !(u.isContainer && u.items.items.length > 0);
    if (h) {
      s.widthModel = s.heightModel = null;
      b = u.getSizeModel(k && k.widthModel.pairsByHeightOrdinal[k.heightModel
        .ordinal]);
      if (g) {
        s.sizeModel = b
      }
      s.widthModel = b.width;
      s.heightModel = b.height;
      if (k && !s.isComponentChild) {
        if (o.needsItemSize || !u.liquidLayout) {
          k.remainingChildDimensions += 2
        } else {
          if (s.widthModel.calculated) {
            ++k.remainingChildDimensions
          }
          if (s.heightModel.calculated) {
            ++k.remainingChildDimensions
          }
        }
      }
    } else {
      if (a) {
        s.recoverProp("x", a, d);
        s.recoverProp("y", a, d);
        if (s.widthModel.calculated) {
          s.recoverProp("width", a, d)
        } else {
          if ("width" in a) {
            ++r
          }
        }
        if (s.heightModel.calculated) {
          s.recoverProp("height", a, d)
        } else {
          if ("height" in a) {
            ++r
          }
        }
        if (k && !s.isComponentChild) {
          k.remainingChildDimensions += r
        }
      }
    }
    if (a && o && o.manageMargins) {
      s.recoverProp("margin-top", a, d);
      s.recoverProp("margin-right", a, d);
      s.recoverProp("margin-bottom", a, d);
      s.recoverProp("margin-left", a, d)
    }
    if (c) {
      j = c.heightModel;
      q = c.widthModel;
      if (q && j && f && v) {
        if (f.shrinkWrap && v.shrinkWrap) {
          if (q.constrainedMax && j.constrainedMin) {
            j = null
          }
        }
      }
      if (q) {
        s.widthModel = q
      }
      if (j) {
        s.heightModel = j
      }
      if (c.state) {
        Ext.apply(s.state, c.state)
      }
    }
    return t
  },
  initContinue: function(e) {
    var g = this,
      d = g.ownerCtContext,
      a = g.target,
      c = g.widthModel,
      f = a.getInherited(),
      b;
    if (c.fixed) {
      f.inShrinkWrapTable = false
    } else {
      delete f.inShrinkWrapTable
    }
    if (e) {
      if (d && c.shrinkWrap) {
        b = d.isBoxParent ? d : d.boxParent;
        if (b) {
          b.addBoxChild(g)
        }
      } else {
        if (c.natural) {
          g.boxParent = d
        }
      }
    }
    return e
  },
  initDone: function(d) {
    var b = this,
      a = b.props,
      c = b.state;
    if (b.remainingChildDimensions === 0) {
      a.containerChildrenSizeDone = true
    }
    if (d) {
      a.containerLayoutDone = true
    }
    if (b.boxChildren && b.boxChildren.length && b.widthModel.shrinkWrap) {
      b.el.setWidth(10000);
      c.blocks = (c.blocks || 0) + 1
    }
  },
  initAnimation: function() {
    var b = this,
      c = b.target,
      a = b.ownerCtContext;
    if (a && a.isTopLevel) {
      b.animatePolicy = c.ownerLayout.getAnimatePolicy(b)
    } else {
      if (!a && c.isCollapsingOrExpanding && c.animCollapse) {
        b.animatePolicy = c.componentLayout.getAnimatePolicy(b)
      }
    }
    if (b.animatePolicy) {
      b.context.queueAnimation(b)
    }
  },
  addBlock: function(b, d, e) {
    var c = this,
      f = c[b] || (c[b] = {}),
      a = f[e] || (f[e] = {});
    if (!a[d.id]) {
      a[d.id] = d;
      ++d.blockCount;
      ++c.context.blockCount
    }
  },
  addBoxChild: function(d) {
    var c = this,
      b, a = d.widthModel;
    d.boxParent = this;
    d.measuresBox = a.shrinkWrap ? d.hasRawContent : a.natural;
    if (d.measuresBox) {
      b = c.boxChildren;
      if (b) {
        b.push(d)
      } else {
        c.boxChildren = [d]
      }
    }
  },
  addPositionStyles: function(d, b) {
    var a = b.x,
      e = b.y,
      c = 0;
    if (a !== undefined) {
      d.left = a + "px";
      ++c
    }
    if (e !== undefined) {
      d.top = e + "px";
      ++c
    }
    return c
  },
  addTrigger: function(f, g) {
    var e = this,
      a = g ? "domTriggers" : "triggers",
      h = e[a] || (e[a] = {}),
      b = e.context,
      d = b.currentLayout,
      c = h[f] || (h[f] = {});
    if (!c[d.id]) {
      c[d.id] = d;
      ++d.triggerCount;
      c = b.triggers[g ? "dom" : "data"];
      (c[d.id] || (c[d.id] = [])).push({
        item: this,
        prop: f
      });
      if (e.props[f] !== undefined) {
        if (!g || !(e.dirty && (f in e.dirty))) {
          ++d.firedTriggers
        }
      }
    }
  },
  boxChildMeasured: function() {
    var b = this,
      c = b.state,
      a = (c.boxesMeasured = (c.boxesMeasured || 0) + 1);
    if (a === b.boxChildren.length) {
      c.clearBoxWidth = 1;
      ++b.context.progressCount;
      b.markDirty()
    }
  },
  borderNames: ["border-top-width", "border-right-width",
    "border-bottom-width", "border-left-width"
  ],
  marginNames: ["margin-top", "margin-right", "margin-bottom",
    "margin-left"
  ],
  paddingNames: ["padding-top", "padding-right", "padding-bottom",
    "padding-left"
  ],
  trblNames: ["top", "right", "bottom", "left"],
  cacheMissHandlers: {
    borderInfo: function(a) {
      var b = a.getStyles(a.borderNames, a.trblNames);
      b.width = b.left + b.right;
      b.height = b.top + b.bottom;
      return b
    },
    marginInfo: function(a) {
      var b = a.getStyles(a.marginNames, a.trblNames);
      b.width = b.left + b.right;
      b.height = b.top + b.bottom;
      return b
    },
    paddingInfo: function(b) {
      var a = b.frameBodyContext || b,
        c = a.getStyles(b.paddingNames, b.trblNames);
      c.width = c.left + c.right;
      c.height = c.top + c.bottom;
      return c
    }
  },
  checkCache: function(a) {
    return this.cacheMissHandlers[a](this)
  },
  clearAllBlocks: function(a) {
    var c = this[a],
      b;
    if (c) {
      for (b in c) {
        this.clearBlocks(a, b)
      }
    }
  },
  clearBlocks: function(c, f) {
    var g = this[c],
      b = g && g[f],
      d, e, a;
    if (b) {
      delete g[f];
      d = this.context;
      for (a in b) {
        e = b[a];
        --d.blockCount;
        if (!--e.blockCount && !e.pending && !e.done) {
          d.queueLayout(e)
        }
      }
    }
  },
  block: function(a, b) {
    this.addBlock("blocks", a, b)
  },
  domBlock: function(a, b) {
    this.addBlock("domBlocks", a, b)
  },
  fireTriggers: function(b, f) {
    var g = this[b],
      d = g && g[f],
      c = this.context,
      e, a;
    if (d) {
      for (a in d) {
        e = d[a];
        ++e.firedTriggers;
        if (!e.done && !e.blockCount && !e.pending) {
          c.queueLayout(e)
        }
      }
    }
  },
  flush: function() {
    var b = this,
      a = b.dirty,
      c = b.state,
      d = b.el;
    b.dirtyCount = 0;
    if ("attributes" in b) {
      d.set(b.attributes);
      delete b.attributes
    }
    if ("innerHTML" in b) {
      d.innerHTML = b.innerHTML;
      delete b.innerHTML
    }
    if (c && c.clearBoxWidth) {
      c.clearBoxWidth = 0;
      b.el.setStyle("width", null);
      if (!--c.blocks) {
        b.context.queueItemLayouts(b)
      }
    }
    if (a) {
      delete b.dirty;
      b.writeProps(a, true)
    }
  },
  flushAnimations: function() {
    var n = this,
      c = n.previousSize,
      k, m, e, g, f, d, h, l, i, a, b;
    if (c) {
      k = n.target;
      m = k.getAnimationProps();
      e = m.duration;
      g = Ext.Object.getKeys(n.animatePolicy);
      f = Ext.apply({}, {
        from: {},
        to: {},
        duration: e || Ext.fx.Anim.prototype.duration
      }, m);
      for (d = 0, h = 0, l = g.length; h < l; h++) {
        i = g[h];
        a = c[i];
        b = n.peek(i);
        if (a !== b) {
          i = n.translateProps[i] || i;
          f.from[i] = a;
          f.to[i] = b;
          ++d
        }
      }
      if (d) {
        if (n.isCollapsingOrExpanding === 1) {
          k.componentLayout.undoLayout(n)
        } else {
          n.writeProps(f.from)
        }
        n.el.animate(f);
        f = Ext.fx.Manager.getFxQueue(n.el.id)[0];
        k.$layoutAnim = f;
        f.on({
          afteranimate: function() {
            delete k.$layoutAnim;
            if (k.destroying || k.destroyed) {
              return
            }
            if (n.isCollapsingOrExpanding === 1) {
              k.componentLayout.redoLayout(n);
              k.afterCollapse(true)
            } else {
              if (n.isCollapsingOrExpanding === 2) {
                k.afterExpand(true)
              }
            }
            if (k.hasListeners.afterlayoutanimation) {
              k.fireEvent("afterlayoutanimation", k)
            }
          }
        })
      }
    }
  },
  getBorderInfo: function() {
    var a = this,
      b = a.borderInfo;
    if (!b) {
      a.borderInfo = b = a.checkCache("borderInfo")
    }
    return b
  },
  getEl: function(c, a) {
    var e = this,
      f, d, b;
    if (c) {
      if (c.dom) {
        d = c
      } else {
        f = e.target;
        if (a) {
          f = a
        }
        d = f[c];
        if (typeof d === "function") {
          d = d.call(f);
          if (d === e.el) {
            return this
          }
        }
      }
      if (d) {
        b = e.context.getEl(e, d)
      }
    }
    return b || null
  },
  getFrameInfo: function() {
    var c = this,
      d = c.frameInfo,
      b, a;
    if (!d) {
      b = c.framing;
      a = c.getBorderInfo();
      c.frameInfo = d = b ? {
        top: b.top + a.top,
        right: b.right + a.right,
        bottom: b.bottom + a.bottom,
        left: b.left + a.left,
        width: b.width + a.width,
        height: b.height + a.height
      } : a
    }
    return d
  },
  getMarginInfo: function() {
    var d = this,
      f = d.marginInfo,
      b, a, e, c;
    if (!f) {
      if (!d.wrapsComponent) {
        f = d.checkCache("marginInfo")
      } else {
        b = d.target;
        e = b.ownerLayout;
        c = e ? e.id : null;
        a = e && e.manageMargins;
        f = b.margin$;
        if (f && f.ownerId !== c) {
          f = null
        }
        if (!f) {
          f = d.parseMargins(b, b.margin) || d.checkCache("marginInfo");
          if (a) {
            d.setProp("margin-top", 0);
            d.setProp("margin-right", 0);
            d.setProp("margin-bottom", 0);
            d.setProp("margin-left", 0)
          }
          f.ownerId = c;
          b.margin$ = f
        }
        f.width = f.left + f.right;
        f.height = f.top + f.bottom
      }
      d.marginInfo = f
    }
    return f
  },
  clearMarginCache: function() {
    delete this.marginInfo;
    delete this.target.margin$
  },
  getPaddingInfo: function() {
    var a = this,
      b = a.paddingInfo;
    if (!b) {
      a.paddingInfo = b = a.checkCache("paddingInfo")
    }
    return b
  },
  getProp: function(c) {
    var b = this,
      a = b.props[c];
    b.addTrigger(c);
    return a
  },
  getDomProp: function(c) {
    var b = this,
      a = (b.dirty && (c in b.dirty)) ? undefined : b.props[c];
    b.addTrigger(c, true);
    return a
  },
  getStyle: function(a) {
    var c = this,
      b = c.styles,
      e, d;
    if (a in b) {
      d = b[a]
    } else {
      e = c.styleInfo[a];
      d = c.el.getStyle(a);
      if (e && e.parseInt) {
        d = parseInt(d, 10) || 0
      }
      b[a] = d
    }
    return d
  },
  getStyles: function(o, b) {
    var l = this,
      e = l.styles,
      p = {},
      f = 0,
      d = o.length,
      j, h, k, a, c, g, q, m;
    b = b || o;
    for (j = 0; j < d; ++j) {
      a = o[j];
      if (a in e) {
        p[b[j]] = e[a];
        ++f;
        if (j && f === 1) {
          h = o.slice(0, j);
          k = b.slice(0, j)
        }
      } else {
        if (f) {
          (h || (h = [])).push(a);
          (k || (k = [])).push(b[j])
        }
      }
    }
    if (f < d) {
      h = h || o;
      k = k || b;
      g = l.styleInfo;
      q = l.el.getStyle(h);
      for (j = h.length; j--;) {
        a = h[j];
        c = g[a];
        m = q[a];
        if (c && c.parseInt) {
          m = parseInt(m, 10) || 0
        }
        p[k[j]] = m;
        e[a] = m
      }
    }
    return p
  },
  hasProp: function(a) {
    return this.getProp(a) != null
  },
  hasDomProp: function(a) {
    return this.getDomProp(a) != null
  },
  invalidate: function(a) {
    this.context.queueInvalidate(this, a)
  },
  markDirty: function() {
    if (++this.dirtyCount === 1) {
      this.context.queueFlush(this)
    }
  },
  onBoxMeasured: function() {
    var a = this.boxParent,
      b = this.state;
    if (a && a.widthModel.shrinkWrap && !b.boxMeasured && this.measuresBox) {
      b.boxMeasured = 1;
      a.boxChildMeasured()
    }
  },
  parseMargins: function(a, d) {
    if (d === true) {
      d = 5
    }
    var c = typeof d,
      b;
    if (c === "string" || c === "number") {
      b = a.parseBox(d)
    } else {
      if (d) {
        b = {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
        if (d) {
          d = Ext.apply(b, a.parseBox(d))
        }
      }
    }
    return b
  },
  peek: function(a) {
    return this.props[a]
  },
  recalculateSizeModel: function() {
    var e = this,
      f = e.target,
      c = f.componentLayout,
      b = e.ownerCtContext,
      a = c.ownerContext,
      d;
    c.ownerContext = null;
    e.sizeModel = d = f.getSizeModel(b && b.widthModel.pairsByHeightOrdinal[
      b.heightModel.ordinal]);
    e.widthModel = d.width;
    e.heightModel = d.height;
    if (a) {
      c.ownerContext = e
    }
  },
  recoverProp: function(f, b, a) {
    var e = this,
      d = e.props,
      c;
    if (f in b) {
      d[f] = b[f];
      if (a && f in a) {
        c = e.dirty || (e.dirty = {});
        c[f] = a[f]
      }
    }
  },
  redo: function(b) {
    var e = this,
      c, a, d;
    e.revertProps(e.props);
    if (b && e.wrapsComponent) {
      if (e.childItems) {
        for (d = 0, c = e.childItems, a = c.length; d < a; d++) {
          c[d].redo(b)
        }
      }
      for (d = 0, c = e.children, a = c.length; d < a; d++) {
        c[d].redo()
      }
    }
  },
  removeEl: function(b, a) {
    var d = this,
      e, c;
    if (b) {
      if (b.dom) {
        c = b
      } else {
        e = d.target;
        if (a) {
          e = a
        }
        c = e[b];
        if (typeof c === "function") {
          c = c.call(e);
          if (c === d.el) {
            return this
          }
        }
      }
      if (c) {
        d.context.removeEl(c, d)
      }
    }
  },
  revertProps: function(d) {
    var a, b = this.flushedProps,
      c = {};
    for (a in d) {
      if (b.hasOwnProperty(a)) {
        c[a] = d[a]
      }
    }
    this.writeProps(c)
  },
  setAttribute: function(a, c) {
    var b = this;
    if (!b.attributes) {
      b.attributes = {}
    }
    b.attributes[a] = c;
    b.markDirty()
  },
  setBox: function(b) {
    var a = this;
    if ("left" in b) {
      a.setProp("x", b.left)
    }
    if ("top" in b) {
      a.setProp("y", b.top)
    }
    a.setSize(b.width, b.height)
  },
  setContentHeight: function(a, b) {
    if (!b && this.hasRawContent) {
      return 1
    }
    return this.setProp("contentHeight", a)
  },
  setContentWidth: function(b, a) {
    if (!a && this.hasRawContent) {
      return 1
    }
    return this.setProp("contentWidth", b)
  },
  setContentSize: function(c, a, b) {
    return this.setContentWidth(c, b) + this.setContentHeight(a, b) === 2
  },
  setProp: function(d, c, a) {
    var b = this,
      f = typeof c,
      e;
    if (f === "undefined" || (f === "number" && isNaN(c))) {
      return 0
    }
    if (b.props[d] === c) {
      return 1
    }
    b.props[d] = c;
    ++b.context.progressCount;
    if (a === false) {
      b.fireTriggers("domTriggers", d);
      b.clearBlocks("domBlocks", d)
    } else {
      e = b.styleInfo[d];
      if (e) {
        if (!b.dirty) {
          b.dirty = {}
        }
        b.dirty[d] = c;
        b.markDirty()
      }
    }
    b.fireTriggers("triggers", d);
    b.clearBlocks("blocks", d);
    return 1
  },
  setHeight: function(j, a) {
    var f = this,
      d = f.target,
      c = f.ownerCtContext,
      g, e, b, i, h;
    if (j < 0) {
      j = 0
    }
    if (!f.wrapsComponent) {
      if (!f.setProp("height", j, a)) {
        return NaN
      }
    } else {
      b = f.collapsedVert ? 0 : (d.minHeight || 0);
      j = Ext.Number.constrain(j, b, d.maxHeight);
      i = f.props.height;
      if (!f.setProp("height", j, a)) {
        return NaN
      }
      if (c && !f.isComponentChild && isNaN(i)) {
        h = --c.remainingChildDimensions;
        if (!h) {
          c.setProp("containerChildrenSizeDone", true)
        }
      }
      g = f.frameBodyContext;
      if (g) {
        e = f.getFrameInfo();
        g[f.el.vertical ? "setWidth" : "setHeight"](j - e.height, a)
      }
    }
    return j
  },
  setWidth: function(b, a) {
    var h = this,
      f = h.target,
      e = h.ownerCtContext,
      i, g, d, c, j;
    if (b < 0) {
      b = 0
    }
    if (!h.wrapsComponent) {
      if (!h.setProp("width", b, a)) {
        return NaN
      }
    } else {
      d = h.collapsedHorz ? 0 : (f.minWidth || 0);
      b = Ext.Number.constrain(b, d, f.maxWidth);
      c = h.props.width;
      if (!h.setProp("width", b, a)) {
        return NaN
      }
      if (e && !h.isComponentChild && isNaN(c)) {
        j = --e.remainingChildDimensions;
        if (!j) {
          e.setProp("containerChildrenSizeDone", true)
        }
      }
      i = h.frameBodyContext;
      if (i) {
        g = h.getFrameInfo();
        i.setWidth(b - g.width, a)
      }
    }
    return b
  },
  setSize: function(c, a, b) {
    this.setWidth(c, b);
    this.setHeight(a, b)
  },
  translateProps: {
    x: "left",
    y: "top"
  },
  undo: function(b) {
    var e = this,
      c, a, d;
    e.revertProps(e.lastBox);
    if (b && e.wrapsComponent) {
      if (e.childItems) {
        for (d = 0, c = e.childItems, a = c.length; d < a; d++) {
          c[d].undo(b)
        }
      }
      for (d = 0, c = e.children, a = c.length; d < a; d++) {
        c[d].undo()
      }
    }
  },
  unsetProp: function(b) {
    var a = this.dirty;
    delete this.props[b];
    if (a) {
      delete a[b]
    }
  },
  writeProps: function(e, d) {
    if (!(e && typeof e === "object")) {
      return
    }
    var r = this,
      c = r.el,
      h = {},
      f = 0,
      b = r.styleInfo,
      q, i, l, n = e.width,
      j = e.height,
      s = r.target,
      g, a, m, o, p, k;
    if ("displayed" in e) {
      c.setDisplayed(e.displayed)
    }
    for (i in e) {
      if (d) {
        r.fireTriggers("domTriggers", i);
        r.clearBlocks("domBlocks", i);
        r.flushedProps[i] = 1
      }
      q = b[i];
      if (q && q.dom) {
        if (q.suffix && (l = parseInt(e[i], 10))) {
          h[i] = l + q.suffix
        } else {
          h[i] = e[i]
        }++f
      }
    }
    if ("x" in e || "y" in e) {
      if (s.isComponent) {
        s.setPosition(e.x, e.y)
      } else {
        f += r.addPositionStyles(h, e)
      }
    }
    if (r.wrapsComponent && Ext.isIE9) {
      if ((g = n !== undefined && r.hasOverflowY) || (a = j !== undefined &&
          r.hasOverflowX)) {
        m = r.isAbsolute;
        if (m === undefined) {
          m = false;
          k = r.target.getTargetEl();
          p = k.getStyle("position");
          r.isAbsolute = m = (p === "absolute")
        }
        if (m) {
          o = Ext.getScrollbarSize();
          if (g) {
            n = parseInt(n, 10) + o.width;
            h.width = n + "px";
            ++f
          }
          if (a) {
            j = parseInt(j, 10) + o.height;
            h.height = j + "px";
            ++f
          }
        }
      }
    }
    if (f) {
      c.setStyle(h)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.layout, "ContextItem"], function() {
  var c = {
      dom: true,
      parseInt: true,
      suffix: "px"
    },
    b = {
      dom: true
    },
    a = {
      dom: false
    };
  this.prototype.styleInfo = {
    containerChildrenSizeDone: a,
    containerLayoutDone: a,
    displayed: a,
    done: a,
    x: a,
    y: a,
    columnsChanged: a,
    rowHeights: a,
    viewOverflowY: a,
    left: c,
    top: c,
    right: c,
    bottom: c,
    width: c,
    height: c,
    "border-top-width": c,
    "border-right-width": c,
    "border-bottom-width": c,
    "border-left-width": c,
    "margin-top": c,
    "margin-right": c,
    "margin-bottom": c,
    "margin-left": c,
    "padding-top": c,
    "padding-right": c,
    "padding-bottom": c,
    "padding-left": c,
    "line-height": b,
    display: b,
    clear: b
  }
}));
(Ext.cmd.derive("Ext.layout.Context", Ext.Base, {
  remainingLayouts: 0,
  state: 0,
  cycleWatchDog: 200,
  constructor: function(a) {
    var b = this;
    Ext.apply(b, a);
    b.items = {};
    b.layouts = {};
    b.blockCount = 0;
    b.cycleCount = 0;
    b.flushCount = 0;
    b.calcCount = 0;
    b.animateQueue = b.newQueue();
    b.completionQueue = b.newQueue();
    b.finalizeQueue = b.newQueue();
    b.finishQueue = b.newQueue();
    b.flushQueue = b.newQueue();
    b.invalidateData = {};
    b.layoutQueue = b.newQueue();
    b.invalidQueue = [];
    b.triggers = {
      data: {},
      dom: {}
    }
  },
  callLayout: function(b, a) {
    this.currentLayout = b;
    b[a](this.getCmp(b.owner))
  },
  cancelComponent: function(h, a, l) {
    var o = this,
      g = h,
      j = !h.isComponent,
      b = j ? g.length : 1,
      d, c, n, m, f, r, p, q, s, e;
    for (d = 0; d < b; ++d) {
      if (j) {
        h = g[d]
      }
      if (l) {
        if (h.ownerCt) {
          e = this.items[h.ownerCt.el.id];
          if (e) {
            Ext.Array.remove(e.childItems, o.getCmp(h))
          }
        } else {
          if (h.rendered) {
            o.removeEl(h.el)
          }
        }
      }
      if (!a) {
        p = o.invalidQueue;
        n = p.length;
        if (n) {
          o.invalidQueue = r = [];
          for (c = 0; c < n; ++c) {
            q = p[c];
            s = q.item.target;
            if (s !== h && !s.up(h)) {
              r.push(q)
            }
          }
        }
      }
      f = h.componentLayout;
      o.cancelLayout(f);
      if (f.getLayoutItems) {
        m = f.getLayoutItems();
        if (m.length) {
          o.cancelComponent(m, true)
        }
      }
      if (h.isContainer && !h.collapsed) {
        f = h.layout;
        o.cancelLayout(f);
        m = f.getVisibleItems();
        if (m.length) {
          o.cancelComponent(m, true)
        }
      }
    }
  },
  cancelLayout: function(b) {
    var a = this;
    a.completionQueue.remove(b);
    a.finalizeQueue.remove(b);
    a.finishQueue.remove(b);
    a.layoutQueue.remove(b);
    if (b.running) {
      a.layoutDone(b)
    }
    b.ownerContext = null
  },
  clearTriggers: function(f, g) {
    var a = f.id,
      e = this.triggers[g ? "dom" : "data"],
      h = e && e[a],
      b = (h && h.length) || 0,
      d, j, c;
    for (d = 0; d < b; ++d) {
      c = h[d];
      j = c.item;
      e = g ? j.domTriggers : j.triggers;
      delete e[c.prop][a]
    }
  },
  flush: function() {
    var d = this,
      a = d.flushQueue.clear(),
      c = a.length,
      b;
    if (c) {
      ++d.flushCount;
      for (b = 0; b < c; ++b) {
        a[b].flush()
      }
    }
  },
  flushAnimations: function() {
    var d = this,
      b = d.animateQueue.clear(),
      a = b.length,
      c;
    if (a) {
      for (c = 0; c < a; c++) {
        if (b[c].target.animate !== false) {
          b[c].flushAnimations()
        }
      }
      Ext.fx.Manager.runner()
    }
  },
  flushInvalidates: function() {
    var g = this,
      a = g.invalidQueue,
      f = a && a.length,
      b, e, d, c;
    g.invalidQueue = [];
    if (f) {
      e = [];
      for (c = 0; c < f; ++c) {
        b = (d = a[c]).item.target;
        if (!b.container.isDetachedBody) {
          e.push(b);
          if (d.options) {
            g.invalidateData[b.id] = d.options
          }
        }
      }
      g.invalidate(e, null)
    }
  },
  flushLayouts: function(g, a, c) {
    var f = this,
      h = c ? f[g].items : f[g].clear(),
      e = h.length,
      b, d;
    if (e) {
      for (b = 0; b < e; ++b) {
        d = h[b];
        if (!d.running) {
          f.callLayout(d, a)
        }
      }
      f.currentLayout = null
    }
  },
  getCmp: function(a) {
    return this.getItem(a, a.el)
  },
  getEl: function(b, a) {
    var c = this.getItem(a, a);
    if (!c.parent) {
      c.parent = b;
      if (b.children.length) {
        b.children.push(c)
      } else {
        b.children = [c]
      }
    }
    return c
  },
  getItem: function(d, b) {
    var e = b.id,
      a = this.items,
      c = a[e] || (a[e] = new Ext.layout.ContextItem({
        context: this,
        target: d,
        el: b
      }));
    return c
  },
  handleFailure: function() {
    var c = this.layouts,
      b, a;
    Ext.failedLayouts = (Ext.failedLayouts || 0) + 1;
    for (a in c) {
      b = c[a];
      if (c.hasOwnProperty(a)) {
        b.running = false;
        b.ownerContext = null
      }
    }
  },
  invalidate: function(k, m) {
    var o = this,
      l = !k.isComponent,
      c, p, a, f, j, q, n, b, g, h, e, d, r;
    for (f = 0, b = l ? k.length : 1; f < b; ++f) {
      j = l ? k[f] : k;
      if (j.rendered && !j.hidden) {
        p = j.ownerLayout;
        g = j.componentLayout;
        r = false;
        if ((!p || !p.needsItemSize) && j.liquidLayout) {
          r = true
        }
        if (!r || (p && p.setsItemSize)) {
          q = o.getCmp(j);
          a = !q.state;
          h = (j.isContainer && !j.collapsed) ? j.layout : null;
          e = o.invalidateData[q.id];
          delete o.invalidateData[q.id];
          d = q.init(m, e)
        }
        if (r) {
          continue
        }
        if (e) {
          o.processInvalidate(e, q, "before")
        }
        if (g.beforeLayoutCycle) {
          g.beforeLayoutCycle(q)
        }
        if (h && h.beforeLayoutCycle) {
          h.beforeLayoutCycle(q)
        }
        d = q.initContinue(d);
        c = true;
        if (g.getLayoutItems) {
          g.renderChildren();
          n = g.getLayoutItems();
          if (n.length) {
            o.invalidate(n, true)
          }
        }
        if (h) {
          c = false;
          h.renderChildren();
          if (h.needsItemSize || h.activeItemCount) {
            n = h.getVisibleItems();
            if (n.length) {
              o.invalidate(n, true)
            }
          }
        }
        q.initDone(c);
        o.resetLayout(g, q, a);
        if (h) {
          o.resetLayout(h, q, a)
        }
        q.initAnimation();
        if (e) {
          o.processInvalidate(e, q, "after")
        }
      }
    }
    o.currentLayout = null
  },
  isDescendant: function(a, b) {
    if (a.isContainer) {
      for (var d = b.ownerCt; d; d = d.ownerCt) {
        if (d === a) {
          return true
        }
      }
    }
    return false
  },
  layoutDone: function(a) {
    var b = a.ownerContext;
    a.running = false;
    if (a.isComponentLayout) {
      if (b.measuresBox) {
        b.onBoxMeasured()
      }
      b.setProp("done", true)
    } else {
      b.setProp("containerLayoutDone", true)
    }--this.remainingLayouts;
    ++this.progressCount
  },
  newQueue: function() {
    return new Ext.util.Queue()
  },
  processInvalidate: function(b, e, a) {
    if (b[a]) {
      var d = this,
        c = d.currentLayout;
      d.currentLayout = b.layout || null;
      b[a](e, b);
      d.currentLayout = c
    }
  },
  queueAnimation: function(a) {
    this.animateQueue.add(a)
  },
  queueCompletion: function(a) {
    this.completionQueue.add(a)
  },
  queueFinalize: function(a) {
    this.finalizeQueue.add(a)
  },
  queueFlush: function(a) {
    this.flushQueue.add(a)
  },
  chainFns: function(a, h, f) {
    var d = this,
      c = a.layout,
      e = h.layout,
      b = a[f],
      g = h[f];
    return function(i) {
      var j = d.currentLayout;
      if (b) {
        d.currentLayout = c;
        b.call(a.scope || a, i, a)
      }
      d.currentLayout = e;
      g.call(h.scope || h, i, h);
      d.currentLayout = j
    }
  },
  purgeInvalidates: function() {
    var g = this,
      j = [],
      h = g.invalidQueue,
      e = h.length,
      i, k, d, c, b, f, a;
    for (i = 0; i < e; ++i) {
      b = h[i];
      f = b.item.target;
      a = true;
      for (k = j.length; k--;) {
        d = j[k];
        c = d.item.target;
        if (f.isLayoutChild(c)) {
          a = false;
          break
        }
        if (c.isLayoutChild(f)) {
          Ext.Array.erase(j, k, 1)
        }
      }
      if (a) {
        j.push(b)
      }
    }
    g.invalidQueue = j
  },
  queueInvalidate: function(j, k) {
    var g = this,
      i = [],
      h = g.invalidQueue,
      f = h.length,
      d, b, e, a, c;
    if (j.isComponent) {
      d = j;
      j = g.items[d.el.id];
      if (j) {
        j.recalculateSizeModel()
      } else {
        j = g.getCmp(d)
      }
    } else {
      d = j.target
    }
    j.invalid = true;
    while (f--) {
      b = h[f];
      e = b.item.target;
      if (!d.isFloating && d.up(e)) {
        return
      }
      if (e === d) {
        if (!(a = b.options)) {
          b.options = k
        } else {
          if (k) {
            if (k.widthModel) {
              a.widthModel = k.widthModel
            }
            if (k.heightModel) {
              a.heightModel = k.heightModel
            }
            if (!(c = a.state)) {
              a.state = k.state
            } else {
              if (k.state) {
                Ext.apply(c, k.state)
              }
            }
            if (k.before) {
              a.before = g.chainFns(a, k, "before")
            }
            if (k.after) {
              a.after = g.chainFns(a, k, "after")
            }
          }
        }
        return
      }
      if (!e.isLayoutChild(d)) {
        i.push(b)
      }
    }
    i.push({
      item: j,
      options: k
    });
    g.invalidQueue = i
  },
  queueItemLayouts: function(c) {
    var a = c.isComponent ? c : c.target,
      b = a.componentLayout;
    if (!b.pending && !b.invalid && !b.done) {
      this.queueLayout(b)
    }
    b = a.layout;
    if (b && !b.pending && !b.invalid && !b.done && !a.collapsed) {
      this.queueLayout(b)
    }
  },
  queueLayout: function(a) {
    this.layoutQueue.add(a);
    a.pending = true
  },
  removeEl: function(d, c) {
    var e = d.id,
      b = c ? c.children : null,
      a = this.items;
    if (b) {
      Ext.Array.remove(b, a[e])
    }
    delete a[e]
  },
  resetLayout: function(b, c, d) {
    var a = this;
    a.currentLayout = b;
    b.done = false;
    b.pending = true;
    b.firedTriggers = 0;
    a.layoutQueue.add(b);
    if (d) {
      a.layouts[b.id] = b;
      b.running = true;
      if (b.finishedLayout) {
        a.finishQueue.add(b)
      }++a.remainingLayouts;
      ++b.layoutCount;
      b.ownerContext = c;
      b.beginCount = 0;
      b.blockCount = 0;
      b.calcCount = 0;
      b.triggerCount = 0;
      if (!b.initialized) {
        b.initLayout()
      }
      b.beginLayout(c)
    } else {
      ++b.beginCount;
      if (!b.running) {
        ++a.remainingLayouts;
        b.running = true;
        b.ownerContext = c;
        if (b.isComponentLayout) {
          c.unsetProp("done")
        }
        a.completionQueue.remove(b);
        a.finalizeQueue.remove(b)
      }
    }
    b.beginLayoutCycle(c, d)
  },
  run: function() {
    var c = this,
      b = false,
      a = c.cycleWatchDog;
    c.purgeInvalidates();
    c.flushInvalidates();
    c.state = 1;
    c.totalCount = c.layoutQueue.getCount();
    c.flush();
    while ((c.remainingLayouts || c.invalidQueue.length) && a--) {
      if (c.invalidQueue.length) {
        c.flushInvalidates()
      }
      if (c.runCycle()) {
        b = false
      } else {
        if (!b) {
          c.flush();
          b = true;
          c.flushLayouts("completionQueue", "completeLayout")
        } else {
          if (!c.invalidQueue.length) {
            c.state = 2;
            break
          }
        }
      }
      if (!(c.remainingLayouts || c.invalidQueue.length)) {
        c.flush();
        c.flushLayouts("completionQueue", "completeLayout");
        c.flushLayouts("finalizeQueue", "finalizeLayout")
      }
    }
    return c.runComplete()
  },
  runComplete: function() {
    var a = this;
    a.state = 2;
    if (a.remainingLayouts) {
      a.handleFailure();
      return false
    }
    a.flush();
    a.flushLayouts("finishQueue", "finishedLayout", true);
    a.flushLayouts("finishQueue", "notifyOwner");
    a.flush();
    a.flushAnimations();
    return true
  },
  runCycle: function() {
    var c = this,
      d = c.layoutQueue.clear(),
      b = d.length,
      a;
    ++c.cycleCount;
    c.progressCount = 0;
    for (a = 0; a < b; ++a) {
      c.runLayout(c.currentLayout = d[a])
    }
    c.currentLayout = null;
    return c.progressCount > 0
  },
  runLayout: function(b) {
    var a = this,
      c = a.getCmp(b.owner);
    b.pending = false;
    if (c.state.blocks) {
      return
    }
    b.done = true;
    ++b.calcCount;
    ++a.calcCount;
    b.calculate(c);
    if (b.done) {
      a.layoutDone(b);
      if (b.completeLayout) {
        a.queueCompletion(b)
      }
      if (b.finalizeLayout) {
        a.queueFinalize(b)
      }
    } else {
      if (!b.pending && !b.invalid && !(b.blockCount + b.triggerCount - b
          .firedTriggers)) {
        a.queueLayout(b)
      }
    }
  },
  setItemSize: function(g, f, b) {
    var d = g,
      a = 1,
      c, e;
    if (g.isComposite) {
      d = g.elements;
      a = d.length;
      g = d[0]
    } else {
      if (!g.dom && !g.el) {
        a = d.length;
        g = d[0]
      }
    }
    for (e = 0; e < a;) {
      c = this.get(g);
      c.setSize(f, b);
      g = d[++e]
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.layout, "Context"], 0));
(Ext.cmd.derive("Ext.layout.component.Body", Ext.layout.component.Auto, {
  type: "body",
  beginLayout: function(a) {
    Ext.layout.component.Auto.prototype.beginLayout.apply(this, arguments);
    a.bodyContext = a.getEl("body")
  },
  beginLayoutCycle: function(d, b) {
    var c = this,
      f = c.lastWidthModel,
      e = c.lastHeightModel,
      a = c.owner.body;
    Ext.layout.component.Auto.prototype.beginLayoutCycle.apply(this,
      arguments);
    if (f && f.fixed && d.widthModel.shrinkWrap) {
      a.setWidth(null)
    }
    if (e && e.fixed && d.heightModel.shrinkWrap) {
      a.setHeight(null)
    }
  },
  calculateOwnerHeightFromContentHeight: function(c, b) {
    var a = Ext.layout.component.Auto.prototype.calculateOwnerHeightFromContentHeight
      .apply(this, arguments);
    if (c.targetContext !== c) {
      a += c.getPaddingInfo().height
    }
    return a
  },
  calculateOwnerWidthFromContentWidth: function(c, a) {
    var b = Ext.layout.component.Auto.prototype.calculateOwnerWidthFromContentWidth
      .apply(this, arguments);
    if (c.targetContext !== c) {
      b += c.getPaddingInfo().width
    }
    return b
  },
  measureContentWidth: function(a) {
    return a.bodyContext.setWidth(a.bodyContext.el.dom.offsetWidth, false)
  },
  measureContentHeight: function(a) {
    return a.bodyContext.setHeight(a.bodyContext.el.dom.offsetHeight,
      false)
  },
  publishInnerHeight: function(c, a) {
    var d = a - c.getFrameInfo().height,
      b = c.targetContext;
    if (b !== c) {
      d -= c.getPaddingInfo().height
    }
    return c.bodyContext.setHeight(d, !c.heightModel.natural)
  },
  publishInnerWidth: function(d, c) {
    var a = c - d.getFrameInfo().width,
      b = d.targetContext;
    if (b !== d) {
      a -= d.getPaddingInfo().width
    }
    d.bodyContext.setWidth(a, !d.widthModel.natural)
  }
}, 0, 0, 0, 0, ["layout.body"], 0, [Ext.layout.component, "Body"], 0));
(Ext.cmd.derive("Ext.layout.container.Card", Ext.layout.container.Fit, {
  alternateClassName: "Ext.layout.CardLayout",
  type: "card",
  hideInactive: true,
  deferredRender: false,
  getRenderTree: function() {
    var a = this,
      b = a.getActiveItem();
    if (b) {
      if (b.hasListeners.beforeactivate && b.fireEvent("beforeactivate",
          b) === false) {
        b = a.activeItem = a.owner.activeItem = null
      } else {
        if (b.hasListeners.activate) {
          b.on({
            boxready: function() {
              b.fireEvent("activate", b)
            },
            single: true
          })
        }
      }
      if (a.deferredRender) {
        if (b) {
          return a.getItemsRenderTree([b])
        }
      } else {
        return Ext.layout.container.Fit.prototype.getRenderTree.apply(
          this, arguments)
      }
    }
  },
  renderChildren: function() {
    var a = this,
      b = a.getActiveItem();
    if (!a.deferredRender) {
      Ext.layout.container.Fit.prototype.renderChildren.call(this)
    } else {
      if (b) {
        a.renderItems([b], a.getRenderTarget())
      }
    }
  },
  isValidParent: function(c, d, a) {
    var b = c.el ? c.el.dom : Ext.getDom(c);
    return (b && b.parentNode === (d.dom || d)) || false
  },
  getActiveItem: function() {
    var c = this,
      b = c.activeItem === undefined ? (c.owner && c.owner.activeItem) :
      c.activeItem,
      a = c.parseActiveItem(b);
    if (a && c.owner.items.indexOf(a) !== -1) {
      c.activeItem = a
    }
    return a == null ? null : (c.activeItem || c.owner.activeItem)
  },
  parseActiveItem: function(a) {
    var b;
    if (a && a.isComponent) {
      b = a
    } else {
      if (typeof a === "number" || a === undefined) {
        b = this.getLayoutItems()[a || 0]
      } else {
        if (a === null) {
          b = null
        } else {
          b = this.owner.getComponent(a)
        }
      }
    }
    return b
  },
  configureItem: function(a) {
    a.setHiddenState(a !== this.getActiveItem());
    Ext.layout.container.Fit.prototype.configureItem.apply(this,
      arguments)
  },
  onAdd: function(a, b) {
    Ext.layout.container.Fit.prototype.onAdd.call(this, a, b);
    this.setItemHideMode(a)
  },
  onRemove: function(a) {
    var b = this;
    Ext.layout.container.Fit.prototype.onRemove.call(this, a);
    b.resetItemHideMode(a);
    if (a === b.activeItem) {
      b.activeItem = undefined
    }
  },
  getAnimation: function(b, a) {
    var c = (b || {}).cardSwitchAnimation;
    if (c === false) {
      return false
    }
    return c || a.cardSwitchAnimation
  },
  getNext: function() {
    var c = arguments[0],
      a = this.getLayoutItems(),
      b = Ext.Array.indexOf(a, this.activeItem);
    return a[b + 1] || (c ? a[0] : false)
  },
  next: function() {
    var b = arguments[0],
      a = arguments[1];
    return this.setActiveItem(this.getNext(a), b)
  },
  getPrev: function() {
    var c = arguments[0],
      a = this.getLayoutItems(),
      b = Ext.Array.indexOf(a, this.activeItem);
    return a[b - 1] || (c ? a[a.length - 1] : false)
  },
  prev: function() {
    var b = arguments[0],
      a = arguments[1];
    return this.setActiveItem(this.getPrev(a), b)
  },
  setActiveItem: function(b) {
    var e = this,
      a = e.owner,
      d = e.activeItem,
      g = a.rendered,
      c, f;
    b = e.parseActiveItem(b);
    c = a.items.indexOf(b);
    if (c === -1) {
      c = a.items.items.length;
      Ext.suspendLayouts();
      b = a.add(b);
      Ext.resumeLayouts()
    }
    if (b && d !== b) {
      if (b.fireEvent("beforeactivate", b, d) === false) {
        return false
      }
      if (d && d.fireEvent("beforedeactivate", d, b) === false) {
        return false
      }
      if (g) {
        Ext.suspendLayouts();
        if (!b.rendered) {
          e.renderItem(b, e.getRenderTarget(), a.items.length)
        }
        if (d) {
          if (e.hideInactive) {
            f = d.el.contains(Ext.Element.getActiveElement());
            d.hide();
            if (d.hidden) {
              d.hiddenByLayout = true;
              d.fireEvent("deactivate", d, b)
            } else {
              return false
            }
          }
        }
        if (b.hidden) {
          b.show()
        }
        if (b.hidden) {
          e.activeItem = b = null
        } else {
          e.activeItem = b;
          if (f) {
            if (!b.defaultFocus) {
              b.defaultFocus = ":focusable"
            }
            b.focus()
          }
        }
        Ext.resumeLayouts(true)
      } else {
        e.activeItem = b
      }
      b.fireEvent("activate", b, d);
      return e.activeItem
    }
    return false
  },
  resetItemHideMode: function(a) {
    a.hideMode = a.originalHideMode;
    delete a.originalHideMode
  },
  setItemHideMode: function(a) {
    a.originalHideMode = a.hideMode;
    a.hideMode = "offsets"
  }
}, 0, 0, 0, 0, ["layout.card"], 0, [Ext.layout.container, "Card", Ext.layout,
  "CardLayout"
], 0));
(Ext.cmd.derive("Ext.plugin.Manager", Ext.Base, {
  alternateClassName: ["Ext.PluginManager", "Ext.PluginMgr"],
  singleton: true,
  typeName: "ptype",
  create: function(b, e, d) {
    var a, c;
    if (b.init) {
      a = b
    } else {
      if (d) {
        b = Ext.apply({}, b);
        b.cmp = d
      } else {
        d = b.cmp
      }
      if (b.xclass) {
        a = Ext.create(b)
      } else {
        c = "plugin." + (b.ptype || e);
        a = Ext.ClassManager.instantiateByAlias(c, b)
      }
    }
    if (a && d && a.setCmp && !a.setCmpCalled) {
      a.setCmp(d);
      a.setCmpCalled = true
    }
    return a
  }
}, 0, 0, 0, 0, 0, 0, [Ext.plugin, "Manager", Ext, "PluginManager", Ext,
  "PluginMgr"
], 0));
(Ext.cmd.derive("Ext.resizer.ResizeTracker", Ext.dd.DragTracker, {
  dynamic: true,
  preserveRatio: false,
  constrainTo: null,
  proxyCls: "x-resizable-proxy",
  constructor: function(b) {
    var d = this,
      c, a, e;
    if (!b.el) {
      if (b.target.isComponent) {
        d.el = b.target.getEl()
      } else {
        d.el = b.target
      }
    }
    Ext.dd.DragTracker.prototype.constructor.apply(this, arguments);
    if (d.preserveRatio && d.minWidth && d.minHeight) {
      c = d.minWidth / d.el.getWidth();
      a = d.minHeight / d.el.getHeight();
      if (a > c) {
        d.minWidth = d.el.getWidth() * a
      } else {
        d.minHeight = d.el.getHeight() * c
      }
    }
    if (d.throttle) {
      e = Ext.Function.createThrottled(function() {
        Ext.resizer.ResizeTracker.prototype.resize.apply(d, arguments)
      }, d.throttle);
      d.resize = function(g, h, f) {
        if (f) {
          Ext.resizer.ResizeTracker.prototype.resize.apply(d, arguments)
        } else {
          e.apply(null, arguments)
        }
      }
    }
  },
  onBeforeStart: function(a) {
    this.startBox = this.target.getBox()
  },
  getProxy: function() {
    var a = this;
    if (!a.dynamic && !a.proxy) {
      a.proxy = a.createProxy(a.target || a.el);
      a.hideProxy = true
    }
    if (a.proxy) {
      a.proxy.show();
      return a.proxy
    }
  },
  createProxy: function(c) {
    var b, a = this.proxyCls;
    if (c.isComponent) {
      b = c.getProxy().addCls(a)
    } else {
      b = c.createProxy({
        tag: "div",
        role: "presentation",
        cls: a,
        id: c.id + "-rzproxy"
      }, Ext.getBody())
    }
    b.removeCls("x-proxy-el");
    return b
  },
  onStart: function(a) {
    this.activeResizeHandle = Ext.get(this.getDragTarget().id);
    if (!this.dynamic) {
      this.resize(this.startBox)
    }
  },
  onDrag: function(a) {
    if (this.dynamic || this.proxy) {
      this.updateDimensions(a)
    }
  },
  updateDimensions: function(p, l) {
    var q = this,
      c = q.activeResizeHandle.region,
      f = q.getOffset(q.constrainTo ? "dragTarget" : null),
      j = q.startBox,
      g, n = 0,
      r = 0,
      i, o, a = 0,
      t = 0,
      s, h, b, d, m, k;
    c = q.convertRegionName(c);
    switch (c) {
      case "south":
        r = f[1];
        b = 2;
        break;
      case "north":
        r = -f[1];
        t = -r;
        b = 2;
        break;
      case "east":
        n = f[0];
        b = 1;
        break;
      case "west":
        n = -f[0];
        a = -n;
        b = 1;
        break;
      case "northeast":
        r = -f[1];
        t = -r;
        n = f[0];
        h = [j.x, j.y + j.height];
        b = 3;
        break;
      case "southeast":
        r = f[1];
        n = f[0];
        h = [j.x, j.y];
        b = 3;
        break;
      case "southwest":
        n = -f[0];
        a = -n;
        r = f[1];
        h = [j.x + j.width, j.y];
        b = 3;
        break;
      case "northwest":
        r = -f[1];
        t = -r;
        n = -f[0];
        a = -n;
        h = [j.x + j.width, j.y + j.height];
        b = 3;
        break
    }
    d = {
      width: j.width + n,
      height: j.height + r,
      x: j.x + a,
      y: j.y + t
    };
    i = Ext.Number.snap(d.width, q.widthIncrement);
    o = Ext.Number.snap(d.height, q.heightIncrement);
    if (i !== d.width || o !== d.height) {
      switch (c) {
        case "northeast":
          d.y -= o - d.height;
          break;
        case "north":
          d.y -= o - d.height;
          break;
        case "southwest":
          d.x -= i - d.width;
          break;
        case "west":
          d.x -= i - d.width;
          break;
        case "northwest":
          d.x -= i - d.width;
          d.y -= o - d.height
      }
      d.width = i;
      d.height = o
    }
    if (d.width < q.minWidth || d.width > q.maxWidth) {
      d.width = Ext.Number.constrain(d.width, q.minWidth, q.maxWidth);
      if (a) {
        d.x = j.x + (j.width - d.width)
      }
    } else {
      q.lastX = d.x
    }
    if (d.height < q.minHeight || d.height > q.maxHeight) {
      d.height = Ext.Number.constrain(d.height, q.minHeight, q.maxHeight);
      if (t) {
        d.y = j.y + (j.height - d.height)
      }
    } else {
      q.lastY = d.y
    }
    if (q.preserveRatio || p.shiftKey) {
      g = q.startBox.width / q.startBox.height;
      m = Math.min(Math.max(q.minHeight, d.width / g), q.maxHeight);
      k = Math.min(Math.max(q.minWidth, d.height * g), q.maxWidth);
      if (b === 1) {
        d.height = m
      } else {
        if (b === 2) {
          d.width = k
        } else {
          s = Math.abs(h[0] - this.lastXY[0]) / Math.abs(h[1] - this.lastXY[
            1]);
          if (s > g) {
            d.height = m
          } else {
            d.width = k
          }
          if (c === "northeast") {
            d.y = j.y - (d.height - j.height)
          } else {
            if (c === "northwest") {
              d.y = j.y - (d.height - j.height);
              d.x = j.x - (d.width - j.width)
            } else {
              if (c === "southwest") {
                d.x = j.x - (d.width - j.width)
              }
            }
          }
        }
      }
    }
    q.setPosition = d.x !== q.startBox.x || d.y !== q.startBox.y;
    q.resize(d, l)
  },
  resize: function(d, a) {
    var c = this,
      e, b = c.setPosition;
    if (c.dynamic || (!c.dynamic && a)) {
      if (b) {
        c.target.setBox(d)
      } else {
        c.target.setSize(d.width, d.height)
      }
    }
    if (!a) {
      e = c.getProxy();
      if (e && e !== c.target) {
        if (b || c.hideProxy) {
          e.setBox(d)
        } else {
          e.setSize(d.width, d.height)
        }
      }
    }
  },
  onEnd: function(a) {
    this.updateDimensions(a, true);
    if (this.proxy && this.hideProxy) {
      this.proxy.hide()
    }
  },
  convertRegionName: function(a) {
    return a
  }
}, 1, 0, 0, 0, 0, 0, [Ext.resizer, "ResizeTracker"], 0));
(Ext.cmd.derive("Ext.resizer.Resizer", Ext.Base, {
  alternateClassName: "Ext.Resizable",
  handleCls: "x-resizable-handle",
  overCls: "x-resizable-handle-over",
  pinnedCls: "x-resizable-pinned",
  wrapCls: "x-resizable-wrap",
  wrappedCls: "x-resizable-wrapped",
  delimiterRe: /(?:\s*[,;]\s*)|\s+/,
  dynamic: true,
  handles: "s e se",
  height: null,
  width: null,
  heightIncrement: 0,
  widthIncrement: 0,
  minHeight: 20,
  minWidth: 20,
  maxHeight: 10000,
  maxWidth: 10000,
  pinned: false,
  preserveRatio: false,
  transparent: false,
  possiblePositions: {
    n: "north",
    s: "south",
    e: "east",
    w: "west",
    se: "southeast",
    sw: "southwest",
    nw: "northwest",
    ne: "northeast"
  },
  ariaRole: "presentation",
  constructor: function(b) {
    var k = this,
      p = k.handles,
      j = Ext.dom.Element.unselectableCls,
      n = [],
      o, c, m, r, g, e, l, a, f, d, q, h;
    if (Ext.isString(b) || Ext.isElement(b) || b.dom) {
      o = b;
      b = arguments[1] || {};
      b.target = o
    }
    k.mixins.observable.constructor.call(k, b);
    o = k.target;
    if (o) {
      if (o.isComponent) {
        o.addClsWithUI("resizable");
        if (o.minWidth) {
          k.minWidth = o.minWidth
        }
        if (o.minHeight) {
          k.minHeight = o.minHeight
        }
        if (o.maxWidth) {
          k.maxWidth = o.maxWidth
        }
        if (o.maxHeight) {
          k.maxHeight = o.maxHeight
        }
        if (o.floating) {
          if (!k.hasOwnProperty("handles")) {
            k.handles = "n ne e se s sw w nw"
          }
        }
        k.el = o.getEl()
      } else {
        o = k.el = k.target = Ext.get(o)
      }
    } else {
      o = k.target = k.el = Ext.get(k.el)
    }
    k.el.addCls(Ext.Component.prototype.borderBoxCls);
    if (Ext.isNumber(k.width)) {
      k.width = Ext.Number.constrain(k.width, k.minWidth, k.maxWidth)
    }
    if (Ext.isNumber(k.height)) {
      k.height = Ext.Number.constrain(k.height, k.minHeight, k.maxHeight)
    }
    if (k.width !== null || k.height !== null) {
      k.target.setSize(k.width, k.height)
    }
    r = k.el.dom.tagName.toUpperCase();
    if (r === "TEXTAREA" || r === "IMG" || r === "TABLE") {
      k.originalTarget = k.target;
      d = o.isComponent ? o.getEl() : o;
      k.el.addCls(k.wrappedCls);
      k.target = k.el = k.el.wrap({
        role: "presentation",
        cls: k.wrapCls,
        id: k.el.id + "-rzwrap",
        style: d.getStyle(["margin-top", "margin-bottom"])
      });
      q = d.getPositioning();
      k.el.setPositioning(q);
      d.clearPositioning();
      f = d.getBox();
      if (q.position !== "absolute") {
        f.x = 0;
        f.y = 0
      }
      k.el.setBox(f);
      d.setStyle("position", "absolute");
      k.isTargetWrapped = true
    }
    k.el.position();
    if (k.pinned) {
      k.el.addCls(k.pinnedCls)
    }
    k.resizeTracker = new Ext.resizer.ResizeTracker({
      disabled: k.disabled,
      target: o,
      el: k.el,
      constrainTo: k.constrainTo,
      handleCls: k.handleCls,
      overCls: k.overCls,
      throttle: k.throttle,
      proxy: k.originalTarget ? k.el : null,
      dynamic: k.originalTarget ? true : k.dynamic,
      originalTarget: k.originalTarget,
      delegate: "." + k.handleCls,
      preserveRatio: k.preserveRatio,
      heightIncrement: k.heightIncrement,
      widthIncrement: k.widthIncrement,
      minHeight: k.minHeight,
      maxHeight: k.maxHeight,
      minWidth: k.minWidth,
      maxWidth: k.maxWidth
    });
    k.resizeTracker.on({
      mousedown: k.onBeforeResize,
      drag: k.onResize,
      dragend: k.onResizeEnd,
      scope: k
    });
    if (k.handles === "all") {
      k.handles = "n s e w ne nw se sw"
    }
    p = k.handles = k.handles.split(k.delimiterRe);
    m = k.possiblePositions;
    g = p.length;
    c = k.handleCls + " " + k.handleCls + "-{0}";
    if (k.target.isComponent) {
      h = k.target.baseCls;
      c += " " + h + "-handle " + h + "-handle-{0}";
      if (Ext.supports.CSS3BorderRadius) {
        c += " " + h + "-handle-{0}-br"
      }
    }
    for (e = 0; e < g; e++) {
      if (p[e] && m[p[e]]) {
        l = m[p[e]];
        n.push('<div id="', k.el.id, "-", l, '-handle" class="', Ext.String
          .format(c, l), " ", j,
          '" unselectable="on" role="presentation"', "></div>")
      }
    }
    Ext.DomHelper.append(k.el, n.join(""));
    n.length = 0;
    for (e = 0; e < g; e++) {
      if (p[e] && m[p[e]]) {
        l = m[p[e]];
        a = k[l] = k.el.getById(k.el.id + "-" + l + "-handle");
        n.push(a);
        a.region = l;
        if (k.transparent) {
          a.setOpacity(0)
        }
      }
    }
    k.resizeTracker.handleEls = n
  },
  disable: function() {
    this.resizeTracker.disable()
  },
  enable: function() {
    this.resizeTracker.enable()
  },
  onBeforeResize: function(a, b) {
    return this.fireResizeEvent("beforeresize", a, b)
  },
  onResize: function(a, b) {
    return this.fireResizeEvent("resizedrag", a, b)
  },
  onResizeEnd: function(a, b) {
    return this.fireResizeEvent("resize", a, b)
  },
  fireResizeEvent: function(a, d, f) {
    var c = this,
      b;
    if (c.hasListeners[a]) {
      b = c.el.getBox();
      return c.fireEvent(a, c, b.width, b.height, f)
    }
  },
  resizeTo: function(b, a) {
    var c = this;
    c.target.setSize(b, a);
    c.fireEvent("resize", c, b, a, null)
  },
  getEl: function() {
    return this.el
  },
  getTarget: function() {
    return this.target
  },
  destroy: function() {
    var e = this,
      d, c = e.handles,
      a = c.length,
      b = e.possiblePositions,
      f;
    e.resizeTracker.destroy();
    if (e.isTargetWrapped) {
      e.target.destroy()
    }
    for (d = 0; d < a; d++) {
      if ((f = e[b[c[d]]])) {
        f.destroy()
      }
    }
    e.callParent()
  }
}, 1, 0, 0, 0, 0, [
  ["observable", Ext.util.Observable]
], [Ext.resizer, "Resizer", Ext, "Resizable"], 0));
(Ext.cmd.derive("Ext.selection.CellModel", Ext.selection.DataViewModel, {
  isCellModel: true,
  deselectOnContainerClick: false,
  enableKeyNav: true,
  preventWrap: false,
  bindComponent: function(a) {
    var c = this,
      b;
    if (c.view && c.gridListeners) {
      c.gridListeners.destroy()
    }
    Ext.selection.DataViewModel.prototype.bindComponent.call(this, a);
    if (a) {
      b = a.grid || a.ownerCt;
      if (b.optimizedColumnMove !== false) {
        c.gridListeners = b.on({
          columnmove: c.onColumnMove,
          scope: c,
          destroyable: true
        })
      }
    }
  },
  getViewListeners: function() {
    var a = Ext.selection.DataViewModel.prototype.getViewListeners.call(
      this);
    a.refresh = this.onViewRefresh;
    return a
  },
  getHeaderCt: function() {
    var b = this.navigationModel.getPosition(),
      a = b ? b.view : this.primaryView;
    return a.headerCt
  },
  onNavigate: function(a) {
    if (!a.record || a.keyEvent.stopSelection) {
      return
    }
    this.setPosition(a.position)
  },
  selectWithEvent: function(a, b) {
    this.select(a)
  },
  select: function(g, e, b) {
    var d = this,
      f, c = d.getPosition(),
      a = d.view.store;
    if (g || g === 0) {
      if (g.isModel) {
        f = a.indexOf(g);
        if (f !== -1) {
          g = {
            row: f,
            column: c ? c.column : 0
          }
        } else {
          g = null
        }
      } else {
        if (typeof g === "number") {
          g = {
            row: g,
            column: 0
          }
        }
      }
    }
    if (g) {
      d.selectByPosition(g, b)
    } else {
      d.deselect()
    }
  },
  getCurrentPosition: function() {
    var a = this.selecting ? this.nextSelection : this.selection;
    return a ? {
      view: a.view,
      record: a.record,
      row: a.rowIdx,
      columnHeader: a.column,
      column: a.view.getColumnManager().indexOf(a.column)
    } : a
  },
  getPosition: function() {
    return (this.selecting ? this.nextSelection : this.selection) || null
  },
  setCurrentPosition: function(c, a, b) {
    if (c && !c.isCellContext) {
      c = new Ext.grid.CellContext(this.view).setPosition({
        row: c.row,
        column: typeof c.column === "number" ? this.view.getColumnManager()
          .getColumns()[c.column] : c.column
      })
    }
    return this.setPosition(c, a, b)
  },
  setPosition: function(e, a, d) {
    var c = this,
      b = c.selection;
    if (e) {
      e = e.isCellContext ? e.clone() : new Ext.grid.CellContext(c.view).setPosition(
        e)
    }
    if (!d && b) {
      if (e && (e.record === b.record && e.column === b.column && e.view ===
          b.view)) {
        e = null
      } else {
        c.onCellDeselect(c.selection, a)
      }
    }
    if (e) {
      c.nextSelection = e;
      c.selecting = true;
      c.onCellSelect(c.nextSelection, a);
      c.selecting = false;
      return (c.selection = e)
    }
  },
  isCellSelected: function(a, e, c) {
    var d = this,
      b, f = d.getPosition();
    if (f && f.view === a) {
      b = new Ext.grid.CellContext(a).setPosition({
        row: e,
        column: typeof c === "number" ? a.getColumnManager().getColumns()[
          c] : c
      });
      return (b.record === f.record) && (b.column === f.column)
    }
  },
  onStoreRemove: function(b, a, d) {
    var c = this,
      e = c.getPosition();
    Ext.selection.DataViewModel.prototype.onStoreRemove.apply(this,
      arguments);
    if (e && b.isMoving(e.record)) {
      return
    }
    if (e && b.getCount() && b.indexOf(e.record) !== -1) {
      e.setRow(e.record)
    } else {
      c.selection = null
    }
  },
  onStoreClear: function() {
    Ext.selection.DataViewModel.prototype.onStoreClear.apply(this,
      arguments);
    this.selection = null
  },
  onStoreAdd: function() {
    var a = this,
      b = a.getPosition();
    Ext.selection.DataViewModel.prototype.onStoreAdd.apply(this,
      arguments);
    if (b) {
      b.setRow(b.record)
    } else {
      a.selection = null
    }
  },
  onCellClick: function(c, a, f, b, h, d, g) {
    if (d !== -1) {
      this.setPosition(g.position)
    }
  },
  onCellSelect: function(a, b) {
    if (a && a.rowIdx !== undefined && a.rowIdx > -1) {
      this.doSelect(a.record, false, b)
    }
  },
  onCellDeselect: function(a, b) {
    if (a && a.rowIdx !== undefined) {
      this.doDeselect(a.record, b)
    }
  },
  onSelectChange: function(b, e, d, g) {
    var f = this,
      h, c, a;
    if (e) {
      h = f.nextSelection;
      c = "select"
    } else {
      h = f.selection;
      c = "deselect"
    }
    a = h.view || f.primaryView;
    if ((d || f.fireEvent("before" + c, f, b, h.rowIdx, h.colIdx)) !==
      false && g() !== false) {
      if (e) {
        a.onCellSelect(h)
      } else {
        a.onCellDeselect(h);
        delete f.selection
      }
      if (!d) {
        f.fireEvent(c, f, b, h.rowIdx, h.colIdx)
      }
    }
  },
  refresh: function() {
    var b = this.getPosition(),
      a;
    if (b && (a = this.store.indexOf(this.selected.last())) !== -1) {
      b.rowIdx = a
    }
  },
  onColumnMove: function(d, e, b, c) {
    var a = d.up("tablepanel");
    if (a) {
      this.onViewRefresh(a.view)
    }
  },
  onUpdate: function(a) {
    var b = this,
      c;
    if (b.isSelected(a)) {
      c = b.selecting ? b.nextSelection : b.selection;
      b.view.onCellSelect(c)
    }
  },
  onViewRefresh: function(b) {
    var e = this,
      g = e.getPosition(),
      c, f = b.headerCt,
      a, d;
    if (g && g.view === b) {
      a = g.record;
      d = g.column;
      if (!d.isDescendantOf(f)) {
        d = f.queryById(d.id) || f.down('[text="' + d.text + '"]') || f.down(
          '[dataIndex="' + d.dataIndex + '"]')
      }
      if (g.record) {
        if (d && (b.store.indexOfId(a.getId()) !== -1)) {
          c = new Ext.grid.CellContext(b).setPosition({
            row: a,
            column: d
          });
          e.setPosition(c)
        }
      } else {
        e.selection = null
      }
    }
  },
  selectByPosition: function(a, b) {
    this.setPosition(a, b)
  }
}, 0, 0, 0, 0, ["selection.cellmodel"], 0, [Ext.selection, "CellModel"], 0));
(Ext.cmd.derive("Ext.selection.RowModel", Ext.selection.DataViewModel, {
  enableKeyNav: true,
  isRowModel: true,
  deselectOnContainerClick: false,
  onUpdate: function(b) {
    var d = this,
      a = d.view,
      c;
    if (a && d.isSelected(b)) {
      c = a.indexOf(b);
      a.onRowSelect(c);
      if (b === d.lastFocused) {
        a.onRowFocus(c, true)
      }
    }
  },
  onSelectChange: function(f, b, k, a) {
    var h = this,
      l = h.views || [h.view],
      c = l.length,
      d = h.store.indexOf(f),
      g = b ? "select" : "deselect",
      e, j;
    if ((k || h.fireEvent("before" + g, h, f, d)) !== false && a() !==
      false) {
      for (e = 0; e < c; e++) {
        j = l[e];
        d = j.indexOf(f);
        if (j.indexOf(f) !== -1) {
          if (b) {
            j.onRowSelect(d, k)
          } else {
            j.onRowDeselect(d, k)
          }
        }
      }
      if (!k) {
        h.fireEvent(g, h, f, d)
      }
    }
  },
  getCurrentPosition: function() {
    var a = this.selected.getAt(0);
    if (a) {
      return new Ext.grid.CellContext(this.view).setPosition(this.store.indexOf(
        a), 0)
    }
  },
  selectByPosition: function(a, b) {
    if (!a.isCellContext) {
      a = new Ext.grid.CellContext(this.view).setPosition(a.row, a.column)
    }
    this.select(a.record, b)
  },
  selectNext: function(g, c) {
    var f = this,
      b = f.store,
      e = f.getSelection(),
      a = e[e.length - 1],
      d = f.view.indexOf(a) + 1,
      h;
    if (d === b.getCount() || d === 0) {
      h = false
    } else {
      f.doSelect(d, g, c);
      h = true
    }
    return h
  },
  selectPrevious: function(f, b) {
    var e = this,
      d = e.getSelection(),
      a = d[0],
      c = e.view.indexOf(a) - 1,
      g;
    if (c < 0) {
      g = false
    } else {
      e.doSelect(c, f, b);
      g = true
    }
    return g
  },
  isRowSelected: function(a) {
    return this.isSelected(a)
  },
  isCellSelected: function(b, a, c) {
    return this.isSelected(a)
  },
  vetoSelection: function(c) {
    var b = this.view.getNavigationModel(),
      a = c.getKey(),
      d = a === c.RIGHT || a === c.LEFT;
    return (d && b.previousRecord === b.record) || Ext.selection.DataViewModel
      .prototype.vetoSelection.call(this, c)
  }
}, 0, 0, 0, 0, ["selection.rowmodel"], 0, [Ext.selection, "RowModel"], 0));
(Ext.cmd.derive("Ext.selection.CheckboxModel", Ext.selection.RowModel, {
  mode: "MULTI",
  injectCheckbox: 0,
  checkOnly: false,
  showHeaderCheckbox: undefined,
  checkSelector: ".x-grid-row-checker",
  allowDeselect: true,
  headerWidth: 24,
  checkerOnCls: "x-grid-hd-checker-on",
  tdCls: "x-grid-cell-special x-grid-cell-row-checker",
  constructor: function() {
    var a = this;
    Ext.selection.RowModel.prototype.constructor.apply(this, arguments);
    if (a.mode === "SINGLE") {
      a.showHeaderCheckbox = false
    }
  },
  beforeViewRender: function(b) {
    var c = this,
      a;
    Ext.selection.RowModel.prototype.beforeViewRender.apply(this,
      arguments);
    if (!c.hasLockedHeader() || b.headerCt.lockedCt) {
      c.addCheckbox(b, true);
      a = b.ownerCt;
      if (b.headerCt.lockedCt) {
        a = a.ownerCt
      }
      c.mon(a, "reconfigure", c.onReconfigure, c)
    }
  },
  bindComponent: function(a) {
    this.sortable = false;
    Ext.selection.RowModel.prototype.bindComponent.apply(this, arguments)
  },
  hasLockedHeader: function() {
    var a = this.views,
      c = a.length,
      b;
    for (b = 0; b < c; b++) {
      if (a[b].headerCt.lockedCt) {
        return true
      }
    }
    return false
  },
  addCheckbox: function(a, b) {
    var c = this,
      d = c.injectCheckbox,
      e = a.headerCt;
    if (d !== false) {
      if (d === "first") {
        d = 0
      } else {
        if (d === "last") {
          d = e.getColumnCount()
        }
      }
      Ext.suspendLayouts();
      if (a.getStore().isBufferedStore) {
        c.showHeaderCheckbox = false
      }
      c.column = e.add(d, c.getHeaderConfig());
      Ext.resumeLayouts()
    }
    if (b !== true) {
      a.refresh()
    }
  },
  onReconfigure: function(c, a, b) {
    if (b) {
      this.addCheckbox(this.views[0])
    }
  },
  toggleUiHeader: function(e) {
    var b = this.views[0],
      d = b.headerCt,
      c = d.child("gridcolumn[isCheckerHd]"),
      a = this.checkerOnCls;
    if (c) {
      if (e) {
        c.addCls(a)
      } else {
        c.removeCls(a)
      }
    }
  },
  onHeaderClick: function(c, f, b) {
    var a = this,
      d;
    if (f === a.column && a.mode !== "SINGLE") {
      b.stopEvent();
      d = f.el.hasCls("x-grid-hd-checker-on");
      if (d) {
        a.deselectAll()
      } else {
        a.selectAll()
      }
    }
  },
  getHeaderConfig: function() {
    var a = this,
      b = a.showHeaderCheckbox !== false;
    return {
      xtype: "gridcolumn",
      ignoreExport: true,
      isCheckerHd: b,
      text: "&#160;",
      clickTargetName: "el",
      width: a.headerWidth,
      sortable: false,
      draggable: false,
      resizable: false,
      hideable: false,
      menuDisabled: true,
      dataIndex: "",
      tdCls: a.tdCls,
      cls: b ? "x-column-header-checkbox " : "",
      defaultRenderer: a.renderer.bind(a),
      editRenderer: a.editRenderer || a.renderEmpty,
      locked: a.hasLockedHeader(),
      processEvent: a.processColumnEvent
    }
  },
  processColumnEvent: function(f, h, i, b, g, d, c, j) {
    var a = h.getNavigationModel();
    if (d.type === "keydown" && h.actionableMode && d.getKey() === d.SPACE) {
      a.fireEvent("navigate", {
        view: h,
        navigationModel: a,
        keyEvent: d,
        position: d.position,
        recordIndex: b,
        record: c,
        item: d.item,
        cell: d.position.cellElement,
        columnIndex: d.position.colIdx,
        column: d.position.column
      })
    }
  },
  renderEmpty: function() {
    return "&#160;"
  },
  refresh: function() {
    Ext.selection.RowModel.prototype.refresh.apply(this, arguments);
    this.updateHeaderState()
  },
  renderer: function(f, c, b, g, e, d, a) {
    return '<div class="x-grid-row-checker" role="button" tabIndex="0">&#160;</div>'
  },
  selectByPosition: function(a, b) {
    if (!a.isCellContext) {
      a = new Ext.grid.CellContext(this.view).setPosition(a.row, a.column)
    }
    if (!this.checkOnly || a.column !== this.column) {
      Ext.selection.RowModel.prototype.selectByPosition.call(this, a, b)
    }
  },
  onSelectChange: function() {
    Ext.selection.RowModel.prototype.onSelectChange.apply(this, arguments);
    if (!this.suspendChange) {
      this.updateHeaderState()
    }
  },
  onStoreLoad: function() {
    Ext.selection.RowModel.prototype.onStoreLoad.apply(this, arguments);
    this.updateHeaderState()
  },
  onStoreAdd: function() {
    Ext.selection.RowModel.prototype.onStoreAdd.apply(this, arguments);
    this.updateHeaderState()
  },
  onStoreRemove: function() {
    Ext.selection.RowModel.prototype.onStoreRemove.apply(this, arguments);
    this.updateHeaderState()
  },
  onStoreRefresh: function() {
    Ext.selection.RowModel.prototype.onStoreRefresh.apply(this, arguments);
    this.updateHeaderState()
  },
  maybeFireSelectionChange: function(a) {
    if (a && !this.suspendChange) {
      this.updateHeaderState()
    }
    Ext.selection.RowModel.prototype.maybeFireSelectionChange.apply(this,
      arguments)
  },
  resumeChanges: function() {
    Ext.selection.RowModel.prototype.resumeChanges.call(this);
    if (!this.suspendChange) {
      this.updateHeaderState()
    }
  },
  updateHeaderState: function() {
    var f = this,
      g = f.store,
      e = g.getCount(),
      h = f.views,
      j = false,
      a = 0,
      b, d, c;
    if (!g.isBufferedStore && e > 0) {
      b = f.selected;
      j = true;
      for (c = 0, d = b.getCount(); c < d; ++c) {
        if (g.indexOfId(b.getAt(c).id) === -1) {
          break
        }++a
      }
      j = e === a
    }
    if (h && h.length) {
      f.toggleUiHeader(j)
    }
  },
  vetoSelection: function(f) {
    var c = this,
      b = c.column,
      a, d, g;
    if (c.checkOnly) {
      d = f.type === "click" && f.getTarget(c.checkSelector);
      g = f.getKey() === f.SPACE && f.position.column === b;
      a = !(d || g)
    }
    return a || Ext.selection.RowModel.prototype.vetoSelection.call(this,
      f)
  },
  destroy: function() {
    this.column = null;
    Ext.selection.RowModel.prototype.destroy.call(this)
  },
  privates: {
    onBeforeNavigate: function(a) {
      var b = a.keyEvent;
      if (this.selectionMode !== "SINGLE") {
        a.ctrlKey = a.ctrlKey || b.ctrlKey || (b.type === "click" && !b.shiftKey) ||
          b.getKey() === b.SPACE
      }
    },
    selectWithEventMulti: function(a, d, b) {
      var c = this;
      if (!d.shiftKey && !d.ctrlKey && d.getTarget(c.checkSelector)) {
        if (b) {
          c.doDeselect(a)
        } else {
          c.doSelect(a, true)
        }
      } else {
        Ext.selection.RowModel.prototype.selectWithEventMulti.call(this,
          a, d, b)
      }
    }
  }
}, 1, 0, 0, 0, ["selection.checkboxmodel"], 0, [Ext.selection,
  "CheckboxModel"
], 0));
Ext.define("Ext.theme.touchsizing.selection.CheckboxModel", {
  override: "Ext.selection.CheckboxModel",
  headerWidth: 32
});
(Ext.cmd.derive("Ext.tab.Tab", Ext.button.Button, {
  isTab: true,
  baseCls: "x-tab",
  closeElOverCls: "x-tab-close-btn-over",
  closeElPressedCls: "x-tab-close-btn-pressed",
  config: {
    rotation: "default",
    tabPosition: "top"
  },
  closable: true,
  closeText: "Close Tab",
  active: false,
  childEls: ["closeEl"],
  scale: false,
  ariaRole: "tab",
  tabIndex: -1,
  keyHandlers: {
    DELETE: "onDeleteKey"
  },
  _btnWrapCls: "x-tab-wrap",
  _btnCls: "x-tab-button",
  _baseIconCls: "x-tab-icon-el",
  _glyphCls: "x-tab-glyph",
  _innerCls: "x-tab-inner",
  _textCls: "x-tab-text",
  _noTextCls: "x-tab-no-text",
  _hasIconCls: "x-tab-icon",
  _activeCls: "x-tab-active",
  _closableCls: "x-tab-closable",
  overCls: "x-tab-over",
  _pressedCls: "x-tab-pressed",
  _disabledCls: "x-tab-disabled",
  _rotateClasses: {
    1: "x-tab-rotate-right",
    2: "x-tab-rotate-left"
  },
  _positions: {
    top: {
      "default": "top",
      0: "top",
      1: "left",
      2: "right"
    },
    right: {
      "default": "top",
      0: "right",
      1: "top",
      2: "bottom"
    },
    bottom: {
      "default": "bottom",
      0: "bottom",
      1: "right",
      2: "left"
    },
    left: {
      "default": "top",
      0: "left",
      1: "bottom",
      2: "top"
    }
  },
  _defaultRotations: {
    top: 0,
    right: 1,
    bottom: 0,
    left: 2
  },
  initComponent: function() {
    var a = this;
    if (a.card) {
      a.setCard(a.card)
    }
    Ext.button.Button.prototype.initComponent.apply(this, arguments)
  },
  getActualRotation: function() {
    var a = this.getRotation();
    return (a !== "default") ? a : this._defaultRotations[this.getTabPosition()]
  },
  updateRotation: function() {
    this.syncRotationAndPosition()
  },
  updateTabPosition: function() {
    this.syncRotationAndPosition()
  },
  syncRotationAndPosition: function() {
    var g = this,
      c = g._rotateClasses,
      b = g.getTabPosition(),
      f = g.getActualRotation(),
      e = g._rotateCls,
      h = g._rotateCls = c[f],
      d = g._positionCls,
      a = g._positionCls = g._positions[b][f];
    if (e !== h) {
      if (e) {
        g.removeCls(e)
      }
      if (h) {
        g.addCls(h)
      }
    }
    if (d !== a) {
      if (d) {
        g.removeClsWithUI(d)
      }
      if (a) {
        g.addClsWithUI(a)
      }
      if (g.rendered) {
        g.updateFrame()
      }
    }
    if (g.rendered) {
      g.setElOrientation()
    }
  },
  onAdded: function(b, c, a) {
    Ext.button.Button.prototype.onAdded.call(this, b, c, a);
    this.syncRotationAndPosition()
  },
  getTemplateArgs: function() {
    var b = this,
      a = Ext.button.Button.prototype.getTemplateArgs.call(this);
    a.closable = b.closable;
    a.closeText = b.closeText;
    return a
  },
  beforeRender: function() {
    var b = this,
      a = b.up("tabbar"),
      c = b.up("tabpanel");
    Ext.button.Button.prototype.beforeRender.call(this);
    b.ariaRenderAttributes = b.ariaRenderAttributes || {};
    if (b.active) {
      b.ariaRenderAttributes["aria-selected"] = true;
      b.addCls(b._activeCls)
    } else {
      b.ariaRenderAttributes["aria-selected"] = false
    }
    b.syncClosableCls();
    if (!b.minWidth) {
      b.minWidth = (a) ? a.minTabWidth : b.minWidth;
      if (!b.minWidth && c) {
        b.minWidth = c.minTabWidth
      }
      if (b.minWidth && b.iconCls) {
        b.minWidth += 25
      }
    }
    if (!b.maxWidth) {
      b.maxWidth = (a) ? a.maxTabWidth : b.maxWidth;
      if (!b.maxWidth && c) {
        b.maxWidth = c.maxTabWidth
      }
    }
  },
  onRender: function() {
    var a = this;
    a.setElOrientation();
    Ext.button.Button.prototype.onRender.apply(this, arguments);
    if (a.closable) {
      a.closeEl.addClsOnOver(a.closeElOverCls);
      a.closeEl.addClsOnClick(a.closeElPressedCls)
    }
  },
  setElOrientation: function() {
    var c = this,
      a = c.getActualRotation(),
      b = c.el;
    if (a) {
      b.setVertical(a === 1 ? 90 : 270)
    } else {
      b.setHorizontal()
    }
  },
  enable: function(a) {
    var b = this;
    Ext.button.Button.prototype.enable.apply(this, arguments);
    b.removeCls(b._disabledCls);
    return b
  },
  disable: function(a) {
    var b = this;
    Ext.button.Button.prototype.disable.apply(this, arguments);
    b.addCls(b._disabledCls);
    return b
  },
  setClosable: function(a) {
    var b = this;
    a = (!arguments.length || !!a);
    if (b.closable !== a) {
      b.closable = a;
      if (b.card) {
        b.card.closable = a
      }
      b.syncClosableCls();
      if (b.rendered) {
        b.syncClosableElements();
        b.updateLayout()
      }
    }
  },
  syncClosableElements: function() {
    var a = this,
      b = a.closeEl;
    if (a.closable) {
      if (!b) {
        b = a.closeEl = a.btnWrap.insertSibling({
          tag: "span",
          id: a.id + "-closeEl",
          cls: a.baseCls + "-close-btn",
          html: a.closeText
        }, "after")
      }
      b.addClsOnOver(a.closeElOverCls);
      b.addClsOnClick(a.closeElPressedCls)
    } else {
      if (b) {
        b.destroy();
        delete a.closeEl
      }
    }
  },
  syncClosableCls: function() {
    var b = this,
      a = b._closableCls;
    if (b.closable) {
      b.addCls(a)
    } else {
      b.removeCls(a)
    }
  },
  setCard: function(a) {
    var b = this;
    b.card = a;
    if (a.iconAlign) {
      b.setIconAlign(a.iconAlign)
    }
    if (a.textAlign) {
      b.setTextAlign(a.textAlign)
    }
    b.setText(b.title || a.title);
    b.setIconCls(b.iconCls || a.iconCls);
    b.setIcon(b.icon || a.icon);
    b.setGlyph(b.glyph || a.glyph)
  },
  onCloseClick: function() {
    var a = this;
    if (a.fireEvent("beforeclose", a) !== false) {
      if (a.tabBar) {
        if (a.tabBar.closeTab(a) === false) {
          return
        }
      } else {
        a.fireClose()
      }
    }
  },
  fireClose: function() {
    this.fireEvent("close", this)
  },
  onEnterKey: function(b) {
    var a = this;
    if (a.tabBar) {
      a.tabBar.onClick(b, a.el);
      b.stopEvent();
      return false
    }
  },
  onDeleteKey: function(a) {
    if (this.closable) {
      this.onCloseClick();
      a.stopEvent();
      return false
    }
  },
  beforeClick: function(a) {
    if (!a) {
      this.focus()
    }
  },
  activate: function(d) {
    var c = this,
      b = c.card,
      a = c.ariaEl.dom;
    c.active = true;
    c.addCls(c._activeCls);
    if (a) {
      a.setAttribute("aria-selected", true)
    } else {
      c.ariaRenderAttributes = c.ariaRenderAttributes || {};
      c.ariaRenderAttributes["aria-selected"] = true
    }
    if (b) {
      if (b.ariaEl.dom) {
        b.ariaEl.dom.setAttribute("aria-expanded", true)
      } else {
        b.ariaRenderAttributes = b.ariaRenderAttributes || {};
        b.ariaRenderAttributes["aria-expanded"] = true
      }
    }
    if (d !== true) {
      c.fireEvent("activate", c)
    }
  },
  deactivate: function(d) {
    var c = this,
      b = c.card,
      a = c.ariaEl.dom;
    c.active = false;
    c.removeCls(c._activeCls);
    if (a) {
      a.setAttribute("aria-selected", false)
    } else {
      c.ariaRenderAttributes = c.ariaRenderAttributes || {};
      c.ariaRenderAttributes["aria-selected"] = false
    }
    if (b) {
      if (b.ariaEl.dom) {
        b.ariaEl.dom.setAttribute("aria-expanded", false)
      } else {
        b.ariaRenderAttributes = b.ariaRenderAttributes || {};
        b.ariaRenderAttributes["aria-expanded"] = false
      }
    }
    if (d !== true) {
      c.fireEvent("deactivate", c)
    }
  },
  privates: {
    getFramingInfoCls: function() {
      return this.baseCls + "-" + this.ui + "-" + this._positionCls
    },
    wrapPrimaryEl: function(a) {
      Ext.Button.superclass.wrapPrimaryEl.call(this, a)
    }
  }
}, 0, ["tab"], ["component", "box", "button", "tab"], {
  component: true,
  box: true,
  button: true,
  tab: true
}, ["widget.tab"], 0, [Ext.tab, "Tab"], 0));
(Ext.cmd.derive("Ext.tab.Bar", Ext.panel.Bar, {
  baseCls: "x-tab-bar",
  componentLayout: "body",
  isTabBar: true,
  config: {
    tabRotation: "default",
    tabStretchMax: true,
    activateOnFocus: true
  },
  defaultType: "tab",
  plain: false,
  ensureActiveVisibleOnChange: true,
  ariaRole: "tablist",
  childEls: ["body", "strip"],
  _stripCls: "x-tab-bar-strip",
  _baseBodyCls: "x-tab-bar-body",
  renderTpl: '<div id="{id}-body" data-ref="body" role="presentation" class="{baseBodyCls} {baseBodyCls}-{ui} {bodyCls} {bodyTargetCls}{childElCls}"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>{%this.renderContainer(out,values)%}</div><div id="{id}-strip" data-ref="strip" role="presentation" class="{stripCls} {stripCls}-{ui}{childElCls}"></div>',
  _reverseDockNames: {
    left: "right",
    right: "left"
  },
  _layoutAlign: {
    top: "end",
    right: "begin",
    bottom: "begin",
    left: "end"
  },
  initComponent: function() {
    var d = this,
      a = d.initialConfig.layout,
      c = a && a.align,
      b = a && a.overflowHandler;
    if (d.plain) {
      d.addCls(d.baseCls + "-plain")
    }
    Ext.panel.Bar.prototype.initComponent.call(this);
    d.setLayout({
      align: c || (d.getTabStretchMax() ? "stretchmax" : d._layoutAlign[
        d.dock]),
      overflowHandler: b || "scroller"
    });
    d.on({
      click: d.onClick,
      element: "el",
      scope: d
    })
  },
  ensureTabVisible: function(b) {
    var c = this,
      d = c.tabPanel,
      a = c.layout.overflowHandler;
    if (c.rendered && a && c.tooNarrow && a.scrollToItem) {
      if (b || b === 0) {
        if (!b.isTab) {
          if (Ext.isNumber(b)) {
            b = this.items.getAt(b)
          } else {
            if (b.isComponent && d && d.items.contains(b)) {
              b = b.tab
            }
          }
        }
      }
      if (!b) {
        b = c.activeTab
      }
      if (b) {
        a.scrollToItem(b)
      }
    }
  },
  initRenderData: function() {
    var a = this;
    return Ext.apply(Ext.panel.Bar.prototype.initRenderData.call(this), {
      bodyCls: a.bodyCls,
      baseBodyCls: a._baseBodyCls,
      bodyTargetCls: a.bodyTargetCls,
      stripCls: a._stripCls,
      dock: a.dock
    })
  },
  setDock: function(g) {
    var f = this,
      a = f.items,
      c = f.ownerCt,
      e, b, d;
    a = a && a.items;
    if (a) {
      for (b = 0, d = a.length; b < d; b++) {
        e = a[b];
        if (e.isTab) {
          e.setTabPosition(g)
        }
      }
    }
    if (f.rendered) {
      f.resetItemMargins();
      if (c && c.isHeader) {
        c.resetItemMargins()
      }
      f.needsScroll = true
    }
    Ext.panel.Bar.prototype.setDock.call(this, g)
  },
  updateTabRotation: function(f) {
    var e = this,
      a = e.items,
      b, d, c;
    a = a && a.items;
    if (a) {
      for (b = 0, d = a.length; b < d; b++) {
        c = a[b];
        if (c.isTab) {
          c.setRotation(f)
        }
      }
    }
    if (e.rendered) {
      e.resetItemMargins();
      e.needsScroll = true;
      e.updateLayout()
    }
  },
  onRender: function() {
    var a = this;
    Ext.panel.Bar.prototype.onRender.call(this);
    if (Ext.isIE8 && a.vertical) {
      a.el.on({
        mousemove: a.onMouseMove,
        scope: a
      })
    }
  },
  afterLayout: function() {
    this.adjustTabPositions();
    Ext.panel.Bar.prototype.afterLayout.apply(this, arguments)
  },
  onAdd: function(b, c) {
    var a = this.onTabContentChange;
    if (this.ensureActiveVisibleOnChange) {
      b.barListeners = b.on({
        scope: this,
        destroyable: true,
        glyphchange: a,
        iconchange: a,
        textchange: a
      })
    }
    Ext.panel.Bar.prototype.onAdd.call(this, b, c)
  },
  onAdded: function(b, c, a) {
    if (b.isHeader) {
      this.addCls(b.baseCls + "-" + b.ui + "-tab-bar")
    }
    Ext.panel.Bar.prototype.onAdded.call(this, b, c, a)
  },
  onRemove: function(a, c) {
    var b = this;
    if (b.ensureActiveVisibleOnChange) {
      if (!c) {
        a.barListeners.destroy()
      }
      a.barListeners = null
    }
    if (a === b.previousTab) {
      b.previousTab = null
    }
    Ext.panel.Bar.prototype.onRemove.call(this, a, c)
  },
  onRemoved: function(b) {
    var a = this.ownerCt;
    if (a.isHeader) {
      this.removeCls(a.baseCls + "-" + a.ui + "-tab-bar")
    }
    Ext.panel.Bar.prototype.onRemoved.call(this, b)
  },
  onTabContentChange: function(a) {
    if (a === this.activeTab) {
      this.ensureTabVisible(a)
    }
  },
  afterComponentLayout: function(c) {
    var d = this,
      b = d.needsScroll,
      a = d.layout.overflowHandler;
    Ext.panel.Bar.prototype.afterComponentLayout.apply(this, arguments);
    if (a && b && d.tooNarrow && a.scrollToItem) {
      a.scrollToItem(d.activeTab)
    }
    delete d.needsScroll
  },
  onMouseMove: function(f) {
    var d = this,
      b = d._overTab,
      a, c;
    if (f.getTarget(".x-box-scroller")) {
      return
    }
    a = d.getTabInfoFromPoint(f.getXY());
    c = a.tab;
    if (c !== b) {
      if (b && b.rendered) {
        b.onMouseLeave(f);
        d._overTab = null
      }
      if (c) {
        c.onMouseEnter(f);
        d._overTab = c;
        if (!c.disabled) {
          d.el.setStyle("cursor", "pointer")
        }
      } else {
        d.el.setStyle("cursor", "default")
      }
    }
  },
  onMouseLeave: function(b) {
    var a = this._overTab;
    if (a && a.rendered) {
      a.onMouseLeave(b)
    }
  },
  getTabInfoFromPoint: function(f) {
    var z = this,
      v = z.items.items,
      e = v.length,
      n = z.layout.innerCt,
      t = n.getXY(),
      s = new Ext.util.Point(f[0], f[1]),
      u = 0,
      w, b, a, o, x, h, g, d, q, k, j, m, l, r, p, y, c;
    for (; u < e; u++) {
      c = v[u];
      w = c.lastBox;
      if (!w || !c.isTab) {
        continue
      }
      k = t[0] + w.x;
      j = t[1] - n.dom.scrollTop + w.y;
      m = w.width;
      l = w.height;
      b = new Ext.util.Region(j, k + m, j + l, k);
      if (b.contains(s)) {
        a = c.closeEl;
        if (a) {
          if (z._isTabReversed === undefined) {
            z._isTabReversed = p = (c.btnWrap.dom.currentStyle.filter.indexOf(
              "rotation=2") !== -1)
          }
          y = p ? this._reverseDockNames[z.dock] : z.dock;
          d = a.getWidth();
          q = a.getHeight();
          x = z.getCloseXY(a, k, j, m, l, d, q, y);
          h = x[0];
          g = x[1];
          r = new Ext.util.Region(g, h + d, g + q, h);
          o = r.contains(s)
        }
        break
      }
    }
    return {
      tab: c,
      close: o
    }
  },
  getCloseXY: function(c, j, h, f, k, i, d, g) {
    var e = c.getXY(),
      b, a;
    if (g === "right") {
      b = j + f - ((e[1] - h) + d);
      a = h + (e[0] - j)
    } else {
      b = j + (e[1] - h);
      a = h + j + k - e[0] - i
    }
    return [b, a]
  },
  closeTab: function(c) {
    var d = this,
      b = c.card,
      e = d.tabPanel,
      a;
    if (b && b.fireEvent("beforeclose", b) === false) {
      return false
    }
    a = d.findNextActivatable(c);
    Ext.suspendLayouts();
    if (e && b) {
      delete c.ownerCt;
      b.fireEvent("close", b);
      e.remove(b);
      if (!e.getComponent(b)) {
        c.fireClose();
        d.remove(c)
      } else {
        c.ownerCt = d;
        Ext.resumeLayouts(true);
        return false
      }
    }
    if (a) {
      if (e) {
        e.setActiveTab(a.card)
      } else {
        d.setActiveTab(a)
      }
      a.focus()
    }
    Ext.resumeLayouts(true)
  },
  findNextActivatable: function(b) {
    var c = this,
      d = c.previousTab,
      a;
    if (b.active && c.items.getCount() > 1) {
      if (d && d !== b && !d.disabled) {
        a = d
      } else {
        a = b.next("tab[disabled=false]") || b.prev("tab[disabled=false]")
      }
    }
    return a || c.activeTab
  },
  setActiveTab: function(b, a) {
    var c = this;
    if (!b.disabled && b !== c.activeTab) {
      if (c.activeTab) {
        if (c.activeTab.destroyed) {
          c.previousTab = null
        } else {
          c.previousTab = c.activeTab;
          c.activeTab.deactivate();
          c.deactivateFocusable(c.activeTab)
        }
      }
      b.activate();
      c.activateFocusable(b);
      c.activeTab = b;
      c.needsScroll = true;
      if (!a) {
        c.fireEvent("change", c, b, b.card);
        c.updateLayout()
      }
    }
  },
  privates: {
    adjustTabPositions: function() {
      var g = this,
        a = g.items.items,
        d = a.length,
        f, b, e, c, h;
      if (!Ext.isIE8) {
        h = g._getTabAdjustProp();
        while (d--) {
          f = a[d];
          e = f.el;
          b = f.lastBox;
          c = f.isTab ? f.getActualRotation() : 0;
          if (c === 1 && f.isVisible()) {
            e.setStyle(h, (b.x + b.width) + "px")
          } else {
            if (c === 2 && f.isVisible()) {
              e.setStyle(h, (b.x - b.height) + "px")
            }
          }
        }
      }
    },
    applyTargetCls: function(a) {
      this.bodyTargetCls = a
    },
    _getTabAdjustProp: function() {
      return "left"
    },
    getTargetEl: function() {
      return this.body || this.frameBody || this.el
    },
    onClick: function(g, f) {
      var d = this,
        h, c, b, a;
      if (g.getTarget(".x-box-scroller")) {
        return
      }
      if (Ext.isIE8 && d.vertical) {
        a = d.getTabInfoFromPoint(g.getXY());
        c = a.tab;
        b = a.close
      } else {
        h = g.getTarget("." + Ext.tab.Tab.prototype.baseCls);
        c = h && Ext.getCmp(h.id);
        b = c && c.closeEl && (f === c.closeEl.dom)
      }
      if (b) {
        g.preventDefault()
      }
      if (c && c.isDisabled && !c.isDisabled()) {
        c.beforeClick(b);
        if (c.closable && b) {
          c.onCloseClick()
        } else {
          d.doActivateTab(c)
        }
      }
    },
    doActivateTab: function(a) {
      var b = this.tabPanel;
      if (b) {
        if (!a.disabled) {
          b.setActiveTab(a.card)
        }
      } else {
        this.setActiveTab(a)
      }
    },
    onFocusableContainerFocus: function(c) {
      var b = this,
        a = b.mixins.focusablecontainer,
        d;
      d = a.onFocusableContainerFocus.call(b, c);
      if (d && d.isTab) {
        b.doActivateTab(d)
      }
    },
    onFocusableContainerFocusEnter: function(c) {
      var b = this,
        a = b.mixins.focusablecontainer,
        d;
      d = a.onFocusableContainerFocusEnter.call(b, c);
      if (d && d.isTab) {
        b.doActivateTab(d)
      }
    },
    focusChild: function(e, b) {
      var c = this,
        a = c.mixins.focusablecontainer,
        d;
      d = a.focusChild.call(c, e, b);
      if (c.activateOnFocus && d && d.isTab) {
        c.doActivateTab(d)
      }
    }
  }
}, 0, ["tabbar"], ["component", "box", "container", "tabbar"], {
  component: true,
  box: true,
  container: true,
  tabbar: true
}, ["widget.tabbar"], [
  [Ext.util.FocusableContainer.prototype.mixinId || Ext.util.FocusableContainer
    .$className, Ext.util.FocusableContainer
  ]
], [Ext.tab, "Bar"], 0));
(Ext.cmd.derive("Ext.tab.Panel", Ext.panel.Panel, {
  alternateClassName: ["Ext.TabPanel"],
  config: {
    tabBar: undefined,
    tabPosition: "top",
    tabRotation: "default",
    tabStretchMax: true
  },
  removePanelHeader: true,
  plain: false,
  itemCls: "x-tabpanel-child",
  minTabWidth: undefined,
  maxTabWidth: undefined,
  deferredRender: true,
  _defaultTabRotation: {
    top: 0,
    right: 1,
    bottom: 0,
    left: 2
  },
  initComponent: function() {
    var f = this,
      c = f.activeTab !== null ? (f.activeTab || 0) : null,
      e = f.dockedItems,
      g = f.header,
      d = f.tabBarHeaderPosition,
      b = f.getTabBar(),
      a;
    f.layout = new Ext.layout.container.Card(Ext.apply({
      owner: f,
      deferredRender: f.deferredRender,
      itemCls: f.itemCls,
      activeItem: c
    }, f.layout));
    if (d != null) {
      g = f.header = Ext.apply({}, g);
      a = g.items = (g.items ? g.items.slice() : []);
      g.itemPosition = d;
      a.push(b);
      g.hasTabBar = true
    } else {
      e = [].concat(f.dockedItems || []);
      e.push(b);
      f.dockedItems = e
    }
    Ext.panel.Panel.prototype.initComponent.apply(this, arguments);
    c = f.activeTab = f.getComponent(c);
    if (c) {
      b.setActiveTab(c.tab, true)
    }
  },
  onRender: function() {
    var b = this.items.items,
      a = b.length,
      c;
    Ext.panel.Panel.prototype.onRender.apply(this, arguments);
    for (c = 0; c < a; ++c) {
      b[c].getBind()
    }
  },
  setActiveTab: function(a) {
    var c = this,
      b;
    if (!Ext.isObject(a) || a.isComponent) {
      a = c.getComponent(a)
    }
    b = c.getActiveTab();
    if (a) {
      Ext.suspendLayouts();
      if (!a.isComponent) {
        a = c.add(a)
      }
      if (b === a || c.fireEvent("beforetabchange", c, a, b) === false) {
        Ext.resumeLayouts(true);
        return b
      }
      c.activeTab = a;
      c.layout.setActiveItem(a);
      a = c.activeTab = c.layout.getActiveItem();
      if (a && a !== b) {
        c.tabBar.setActiveTab(a.tab);
        Ext.resumeLayouts(true);
        if (b !== a) {
          c.fireEvent("tabchange", c, a, b)
        }
      } else {
        Ext.resumeLayouts(true)
      }
      return a
    }
    return b
  },
  setActiveItem: function(a) {
    return this.setActiveTab(a)
  },
  getActiveTab: function() {
    var b = this,
      a = b.getComponent(b.activeTab);
    if (a && b.items.indexOf(a) !== -1) {
      b.activeTab = a
    } else {
      b.activeTab = undefined
    }
    return b.activeTab
  },
  applyTabBar: function(a) {
    var c = this,
      b = (c.tabBarHeaderPosition != null) ? c.getHeaderPosition() : c.getTabPosition();
    return new Ext.tab.Bar(Ext.apply({
      ui: c.ui,
      dock: b,
      tabRotation: c.getTabRotation(),
      vertical: (b === "left" || b === "right"),
      plain: c.plain,
      tabStretchMax: c.getTabStretchMax(),
      tabPanel: c
    }, a))
  },
  updateHeaderPosition: function(c, b) {
    var a = this.getTabBar();
    if (a && (this.tabBarHeaderPosition != null)) {
      a.setDock(c)
    }
    Ext.panel.Panel.prototype.updateHeaderPosition.call(this, c, b)
  },
  updateTabPosition: function(b) {
    var a = this.getTabBar();
    if (a && (this.tabBarHeaderPosition == null)) {
      a.setDock(b)
    }
  },
  updateTabRotation: function(b) {
    var a = this.getTabBar();
    if (a) {
      a.setTabRotation(b)
    }
  },
  onAdd: function(f, d) {
    var e = this,
      c = Ext.apply({}, f.tabConfig),
      b = e.getTabBar(),
      a = {
        xtype: "tab",
        title: f.title,
        icon: f.icon,
        iconCls: f.iconCls,
        glyph: f.glyph,
        ui: b.ui,
        card: f,
        disabled: f.disabled,
        closable: f.closable,
        hidden: f.hidden && !f.hiddenByLayout,
        tooltip: f.tooltip,
        tabBar: b,
        tabPosition: b.dock,
        rotation: b.getTabRotation()
      };
    if (f.closeText !== undefined) {
      a.closeText = f.closeText
    }
    c = Ext.applyIf(c, a);
    f.tab = e.tabBar.insert(d, c);
    f.ariaRole = "tabpanel";
    f.ariaRenderAttributes = f.ariaRenderAttributes || {};
    f.ariaRenderAttributes["aria-labelledby"] = f.tab.id;
    f.on({
      scope: e,
      enable: e.onItemEnable,
      disable: e.onItemDisable,
      beforeshow: e.onItemBeforeShow,
      iconchange: e.onItemIconChange,
      iconclschange: e.onItemIconClsChange,
      glyphchange: e.onItemGlyphChange,
      titlechange: e.onItemTitleChange
    });
    if (f.isPanel) {
      if (e.removePanelHeader) {
        if (f.rendered) {
          if (f.header) {
            f.header.hide()
          }
        } else {
          f.header = false
        }
      }
      if (f.isPanel && e.border) {
        f.setBorder(false)
      }
    }
    if (e.rendered) {
      f.getBind()
    }
    if (e.rendered && e.loader && e.activeTab === undefined && e.layout.activeItem !==
      null) {
      e.setActiveTab(0)
    }
  },
  onMove: function(c, b, d) {
    var a = this.getTabBar();
    Ext.panel.Panel.prototype.onMove.call(this, c, b, d);
    if (a.items.indexOf(c.tab) !== d) {
      a.move(c.tab, d)
    }
  },
  onItemEnable: function(a) {
    a.tab.enable()
  },
  onItemDisable: function(a) {
    a.tab.disable()
  },
  onItemBeforeShow: function(a) {
    if (a !== this.activeTab) {
      this.setActiveTab(a);
      return false
    }
  },
  onItemGlyphChange: function(a, b) {
    a.tab.setGlyph(b)
  },
  onItemIconChange: function(b, a) {
    b.tab.setIcon(a)
  },
  onItemIconClsChange: function(b, a) {
    b.tab.setIconCls(a)
  },
  onItemTitleChange: function(a, b) {
    a.tab.setText(b)
  },
  onRemove: function(b, c) {
    var a = this;
    b.un({
      scope: a,
      enable: a.onItemEnable,
      disable: a.onItemDisable,
      beforeshow: a.onItemBeforeShow,
      iconchange: a.onItemIconChange,
      iconclschange: a.onItemIconClsChange,
      glyphchange: a.onItemGlyphChange,
      titlechange: a.onItemTitleChange
    });
    if (b.tab && !a.destroying && b.tab.ownerCt === a.tabBar) {
      a.tabBar.remove(b.tab)
    }
  },
  privates: {
    doRemove: function(d, b) {
      var c = this,
        a;
      if (c.removingAll || c.destroying || c.items.getCount() === 1) {
        c.activeTab = null
      } else {
        if (d.tab && (a = c.tabBar.items.indexOf(c.tabBar.findNextActivatable(
            d.tab))) !== -1) {
          c.setActiveTab(a)
        }
      }
      Ext.panel.Panel.prototype.doRemove.apply(this, arguments);
      if (d.tab) {
        delete d.tab.card;
        delete d.tab
      }
    }
  }
}, 0, ["tabpanel"], ["component", "box", "container", "panel", "tabpanel"], {
  component: true,
  box: true,
  container: true,
  panel: true,
  tabpanel: true
}, ["widget.tabpanel"], 0, [Ext.tab, "Panel", Ext, "TabPanel"], 0));
(Ext.cmd.derive("Ext.toolbar.Fill", Ext.Component, {
  alternateClassName: "Ext.Toolbar.Fill",
  ariaRole: "presentation",
  isFill: true,
  flex: 1
}, 0, ["tbfill"], ["component", "box", "tbfill"], {
  component: true,
  box: true,
  tbfill: true
}, ["widget.tbfill"], 0, [Ext.toolbar, "Fill", Ext.Toolbar, "Fill"], 0));
(Ext.cmd.derive("Ext.draw.ContainerBase", Ext.panel.Panel, {
  layout: "container",
  addElementListener: function() {
    var b = this,
      a = arguments;
    if (b.rendered) {
      b.el.on.apply(b.el, a)
    } else {
      b.on("render", function() {
        b.el.on.apply(b.el, a)
      })
    }
  },
  removeElementListener: function() {
    var b = this,
      a = arguments;
    if (b.rendered) {
      b.el.un.apply(b.el, a)
    }
  },
  afterRender: function() {
    Ext.panel.Panel.prototype.afterRender.apply(this, arguments);
    this.initAnimator()
  },
  getItems: function() {
    var b = this,
      a = b.items;
    if (!a || !a.isMixedCollection) {
      b.initItems()
    }
    return b.items
  },
  onRender: function() {
    Ext.panel.Panel.prototype.onRender.apply(this, arguments);
    this.element = this.el;
    this.innerElement = this.body
  },
  setItems: function(a) {
    this.items = a;
    return a
  },
  setSurfaceSize: function(b, a) {
    this.resizeHandler({
      width: b,
      height: a
    });
    this.renderFrame()
  },
  onResize: function(c, a, b, e) {
    var d = this;
    Ext.panel.Panel.prototype.onResize.call(this, c, a, b, e);
    d.setBodySize({
      width: c,
      height: a
    })
  },
  preview: function() {
    var a = this.getImage();
    new Ext.window.Window({
      title: "Chart Preview",
      closeable: true,
      renderTo: Ext.getBody(),
      autoShow: true,
      maximizeable: true,
      maximized: true,
      border: true,
      layout: {
        type: "hbox",
        pack: "center",
        align: "middle"
      },
      items: {
        xtype: "container",
        items: {
          xtype: "image",
          mode: "img",
          cls: "x-chart-image",
          src: a.data,
          listeners: {
            afterrender: function() {
              var e = this,
                b = e.imgEl.dom,
                d = a.type === "svg" ? 1 : (window.devicePixelRatio ||
                  1),
                c;
              if (!b.naturalWidth || !b.naturalHeight) {
                b.onload = function() {
                  var g = b.naturalWidth,
                    f = b.naturalHeight;
                  e.setWidth(Math.floor(g / d));
                  e.setHeight(Math.floor(f / d))
                }
              } else {
                c = e.getSize();
                e.setWidth(Math.floor(c.width / d));
                e.setHeight(Math.floor(c.height / d))
              }
            }
          }
        }
      }
    })
  },
  privates: {
    getTargetEl: function() {
      return this.innerElement
    },
    reattachToBody: function() {
      var a = this;
      if (a.pendingDetachSize) {
        a.onBodyResize()
      }
      a.pendingDetachSize = false;
      Ext.panel.Panel.prototype.reattachToBody.call(this)
    }
  }
}, 0, 0, ["component", "box", "container", "panel"], {
  component: true,
  box: true,
  container: true,
  panel: true
}, 0, 0, [Ext.draw, "ContainerBase"], 0));
(Ext.cmd.derive("Ext.draw.SurfaceBase", Ext.Widget, {
  getOwnerBody: function() {
    return this.ownerCt.body
  },
  destroy: function() {
    var a = this;
    if (a.hasListeners.destroy) {
      a.fireEvent("destroy", a)
    }
    Ext.Widget.prototype.destroy.call(this)
  }
}, 0, 0, ["widget"], {
  widget: true
}, 0, 0, [Ext.draw, "SurfaceBase"], 0));
(Ext.cmd.derive("Ext.draw.Color", Ext.Base, {
  statics: {
    colorToHexRe: /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
    rgbToHexRe: /\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
    rgbaToHexRe: /\s*rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\.\d]+)\)/,
    hexRe: /\s*#([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)\s*/,
    NONE: "none",
    RGBA_NONE: "rgba(0, 0, 0, 0)"
  },
  isColor: true,
  lightnessFactor: 0.2,
  constructor: function(d, b, a, c) {
    this.setRGB(d, b, a, c)
  },
  setRGB: function(e, c, a, d) {
    var b = this;
    b.r = Math.min(255, Math.max(0, e));
    b.g = Math.min(255, Math.max(0, c));
    b.b = Math.min(255, Math.max(0, a));
    if (d === undefined) {
      b.a = 1
    } else {
      b.a = Math.min(1, Math.max(0, d))
    }
  },
  getGrayscale: function() {
    return this.r * 0.3 + this.g * 0.59 + this.b * 0.11
  },
  getHSL: function() {
    var i = this,
      a = i.r / 255,
      f = i.g / 255,
      j = i.b / 255,
      k = Math.max(a, f, j),
      d = Math.min(a, f, j),
      m = k - d,
      e, n = 0,
      c = 0.5 * (k + d);
    if (d !== k) {
      n = (c <= 0.5) ? m / (k + d) : m / (2 - k - d);
      if (a === k) {
        e = 60 * (f - j) / m
      } else {
        if (f === k) {
          e = 120 + 60 * (j - a) / m
        } else {
          e = 240 + 60 * (a - f) / m
        }
      }
      if (e < 0) {
        e += 360
      }
      if (e >= 360) {
        e -= 360
      }
    }
    return [e, n, c]
  },
  getHSV: function() {
    var i = this,
      a = i.r / 255,
      f = i.g / 255,
      j = i.b / 255,
      k = Math.max(a, f, j),
      d = Math.min(a, f, j),
      c = k - d,
      e, m = 0,
      l = k;
    if (d != k) {
      m = l ? c / l : 0;
      if (a === k) {
        e = 60 * (f - j) / c
      } else {
        if (f === k) {
          e = 60 * (j - a) / c + 120
        } else {
          e = 60 * (a - f) / c + 240
        }
      }
      if (e < 0) {
        e += 360
      }
      if (e >= 360) {
        e -= 360
      }
    }
    return [e, m, l]
  },
  setHSL: function(g, f, e) {
    var i = this,
      d = Math.abs,
      j, b, a;
    g = (g % 360 + 360) % 360;
    f = f > 1 ? 1 : f < 0 ? 0 : f;
    e = e > 1 ? 1 : e < 0 ? 0 : e;
    if (f === 0 || g === null) {
      e *= 255;
      i.setRGB(e, e, e)
    } else {
      g /= 60;
      j = f * (1 - d(2 * e - 1));
      b = j * (1 - d(g % 2 - 1));
      a = e - j / 2;
      a *= 255;
      j *= 255;
      b *= 255;
      switch (Math.floor(g)) {
        case 0:
          i.setRGB(j + a, b + a, a);
          break;
        case 1:
          i.setRGB(b + a, j + a, a);
          break;
        case 2:
          i.setRGB(a, j + a, b + a);
          break;
        case 3:
          i.setRGB(a, b + a, j + a);
          break;
        case 4:
          i.setRGB(b + a, a, j + a);
          break;
        case 5:
          i.setRGB(j + a, a, b + a);
          break
      }
    }
    return i
  },
  setHSV: function(f, e, d) {
    var g = this,
      i, b, a;
    f = (f % 360 + 360) % 360;
    e = e > 1 ? 1 : e < 0 ? 0 : e;
    d = d > 1 ? 1 : d < 0 ? 0 : d;
    if (e === 0 || f === null) {
      d *= 255;
      g.setRGB(d, d, d)
    } else {
      f /= 60;
      i = d * e;
      b = i * (1 - Math.abs(f % 2 - 1));
      a = d - i;
      a *= 255;
      i *= 255;
      b *= 255;
      switch (Math.floor(f)) {
        case 0:
          g.setRGB(i + a, b + a, a);
          break;
        case 1:
          g.setRGB(b + a, i + a, a);
          break;
        case 2:
          g.setRGB(a, i + a, b + a);
          break;
        case 3:
          g.setRGB(a, b + a, i + a);
          break;
        case 4:
          g.setRGB(b + a, a, i + a);
          break;
        case 5:
          g.setRGB(i + a, a, b + a);
          break
      }
    }
    return g
  },
  createLighter: function(b) {
    if (!b && b !== 0) {
      b = this.lightnessFactor
    }
    var a = this.getHSL();
    a[2] = Ext.Number.constrain(a[2] + b, 0, 1);
    return Ext.draw.Color.fromHSL(a[0], a[1], a[2])
  },
  createDarker: function(a) {
    if (!a && a !== 0) {
      a = this.lightnessFactor
    }
    return this.createLighter(-a)
  },
  toString: function() {
    var f = this,
      c = Math.round;
    if (f.a === 1) {
      var e = c(f.r).toString(16),
        d = c(f.g).toString(16),
        a = c(f.b).toString(16);
      e = (e.length === 1) ? "0" + e : e;
      d = (d.length === 1) ? "0" + d : d;
      a = (a.length === 1) ? "0" + a : a;
      return ["#", e, d, a].join("")
    } else {
      return "rgba(" + [c(f.r), c(f.g), c(f.b), f.a === 0 ? 0 : f.a.toFixed(
        15)].join(", ") + ")"
    }
  },
  toHex: function(b) {
    if (Ext.isArray(b)) {
      b = b[0]
    }
    if (!Ext.isString(b)) {
      return ""
    }
    if (b.substr(0, 1) === "#") {
      return b
    }
    var e = Ext.draw.Color.colorToHexRe.exec(b);
    if (Ext.isArray(e)) {
      var f = parseInt(e[2], 10),
        d = parseInt(e[3], 10),
        a = parseInt(e[4], 10),
        c = a | (d << 8) | (f << 16);
      return e[1] + "#" + ("000000" + c.toString(16)).slice(-6)
    } else {
      return ""
    }
  },
  setFromString: function(j) {
    var e, h, f, c, d = 1,
      i = parseInt;
    if (j === Ext.draw.Color.NONE) {
      this.r = this.g = this.b = this.a = 0;
      return this
    }
    if ((j.length === 4 || j.length === 7) && j.substr(0, 1) === "#") {
      e = j.match(Ext.draw.Color.hexRe);
      if (e) {
        h = i(e[1], 16) >> 0;
        f = i(e[2], 16) >> 0;
        c = i(e[3], 16) >> 0;
        if (j.length === 4) {
          h += (h * 16);
          f += (f * 16);
          c += (c * 16)
        }
      }
    } else {
      if ((e = j.match(Ext.draw.Color.rgbToHexRe))) {
        h = +e[1];
        f = +e[2];
        c = +e[3]
      } else {
        if ((e = j.match(Ext.draw.Color.rgbaToHexRe))) {
          h = +e[1];
          f = +e[2];
          c = +e[3];
          d = +e[4]
        } else {
          if (Ext.draw.Color.ColorList.hasOwnProperty(j.toLowerCase())) {
            return this.setFromString(Ext.draw.Color.ColorList[j.toLowerCase()])
          }
        }
      }
    }
    if (typeof h === "undefined") {
      return this
    }
    this.r = h;
    this.g = f;
    this.b = c;
    this.a = d;
    return this
  }
}, 3, 0, 0, 0, 0, 0, [Ext.draw, "Color"], function() {
  var a = new this();
  this.addStatics({
    fly: function(f, e, c, d) {
      switch (arguments.length) {
        case 1:
          a.setFromString(f);
          break;
        case 3:
        case 4:
          a.setRGB(f, e, c, d);
          break;
        default:
          return null
      }
      return a
    },
    ColorList: {
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedalmond: "#ffebcd",
      blue: "#0000ff",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      gold: "#ffd700",
      goldenrod: "#daa520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#adff2f",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      indianred: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      lavender: "#e6e6fa",
      lavenderblush: "#fff0f5",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrodyellow: "#fafad2",
      lightgray: "#d3d3d3",
      lightgrey: "#d3d3d3",
      lightgreen: "#90ee90",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370d8",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      navy: "#000080",
      oldlace: "#fdf5e6",
      olive: "#808000",
      olivedrab: "#6b8e23",
      orange: "#ffa500",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#d87093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      purple: "#800080",
      red: "#ff0000",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whitesmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowgreen: "#9acd32"
    },
    fromHSL: function(d, c, b) {
      return (new this(0, 0, 0, 0)).setHSL(d, c, b)
    },
    fromHSV: function(d, c, b) {
      return (new this(0, 0, 0, 0)).setHSL(d, c, b)
    },
    fromString: function(b) {
      return (new this(0, 0, 0, 0)).setFromString(b)
    },
    create: function(b) {
      if (b instanceof this) {
        return b
      } else {
        if (Ext.isArray(b)) {
          return new Ext.draw.Color(b[0], b[1], b[2], b[3])
        } else {
          if (Ext.isString(b)) {
            return Ext.draw.Color.fromString(b)
          } else {
            if (arguments.length > 2) {
              return new Ext.draw.Color(arguments[0], arguments[1],
                arguments[2], arguments[3])
            } else {
              return new Ext.draw.Color(0, 0, 0, 0)
            }
          }
        }
      }
    }
  })
}));
(Ext.cmd.derive("Ext.draw.sprite.AnimationParser", Ext.Base, function() {
  function a(d, c, b) {
    return d + (c - d) * b
  }
  return {
    singleton: true,
    attributeRe: /^url\(#([a-zA-Z\-]+)\)$/,
    color: {
      parseInitial: function(c, b) {
        if (Ext.isString(c)) {
          c = Ext.draw.Color.create(c)
        }
        if (Ext.isString(b)) {
          b = Ext.draw.Color.create(b)
        }
        if ((c instanceof Ext.draw.Color) && (b instanceof Ext.draw.Color)) {
          return [
            [c.r, c.g, c.b, c.a],
            [b.r, b.g, b.b, b.a]
          ]
        } else {
          return [c || b, b || c]
        }
      },
      compute: function(d, c, b) {
        if (!Ext.isArray(d) || !Ext.isArray(c)) {
          return c || d
        } else {
          return [a(d[0], c[0], b), a(d[1], c[1], b), a(d[2], c[2], b), a(
            d[3], c[3], b)]
        }
      },
      serve: function(c) {
        var b = Ext.draw.Color.fly(c[0], c[1], c[2], c[3]);
        return b.toString()
      }
    },
    number: {
      parse: function(b) {
        return b === null ? null : +b
      },
      compute: function(d, c, b) {
        if (!Ext.isNumber(d) || !Ext.isNumber(c)) {
          return c || d
        } else {
          return a(d, c, b)
        }
      }
    },
    angle: {
      parseInitial: function(c, b) {
        if (b - c > Math.PI) {
          b -= Math.PI * 2
        } else {
          if (b - c < -Math.PI) {
            b += Math.PI * 2
          }
        }
        return [c, b]
      },
      compute: function(d, c, b) {
        if (!Ext.isNumber(d) || !Ext.isNumber(c)) {
          return c || d
        } else {
          return a(d, c, b)
        }
      }
    },
    path: {
      parseInitial: function(m, n) {
        var c = m.toStripes(),
          o = n.toStripes(),
          e, d, k = c.length,
          p = o.length,
          h, f, b, g = o[p - 1],
          l = [g[g.length - 2], g[g.length - 1]];
        for (e = k; e < p; e++) {
          c.push(c[k - 1].slice(0))
        }
        for (e = p; e < k; e++) {
          o.push(l.slice(0))
        }
        b = c.length;
        o.path = n;
        o.temp = new Ext.draw.Path();
        for (e = 0; e < b; e++) {
          h = c[e];
          f = o[e];
          k = h.length;
          p = f.length;
          o.temp.commands.push("M");
          for (d = p; d < k; d += 6) {
            f.push(l[0], l[1], l[0], l[1], l[0], l[1])
          }
          g = o[o.length - 1];
          l = [g[g.length - 2], g[g.length - 1]];
          for (d = k; d < p; d += 6) {
            h.push(l[0], l[1], l[0], l[1], l[0], l[1])
          }
          for (e = 0; e < f.length; e++) {
            f[e] -= h[e]
          }
          for (e = 2; e < f.length; e += 6) {
            o.temp.commands.push("C")
          }
        }
        return [c, o]
      },
      compute: function(c, l, m) {
        if (m >= 1) {
          return l.path
        }
        var e = 0,
          f = c.length,
          d = 0,
          b, k, h, n = l.temp.params,
          g = 0;
        for (; e < f; e++) {
          k = c[e];
          h = l[e];
          b = k.length;
          for (d = 0; d < b; d++) {
            n[g++] = h[d] * m + k[d]
          }
        }
        return l.temp
      }
    },
    data: {
      compute: function(h, j, k, g) {
        var m = h.length - 1,
          b = j.length - 1,
          e = Math.max(m, b),
          d, l, c;
        if (!g || g === h) {
          g = []
        }
        g.length = e + 1;
        for (c = 0; c <= e; c++) {
          d = h[Math.min(c, m)];
          l = j[Math.min(c, b)];
          if (Ext.isNumber(d)) {
            if (!Ext.isNumber(l)) {
              l = 0
            }
            g[c] = (l - d) * k + d
          } else {
            g[c] = l
          }
        }
        return g
      }
    },
    text: {
      compute: function(d, c, b) {
        return d.substr(0, Math.round(d.length * (1 - b))) + c.substr(
          Math.round(c.length * (1 - b)))
      }
    },
    limited: "number",
    limited01: "number"
  }
}, 0, 0, 0, 0, 0, 0, [Ext.draw.sprite, "AnimationParser"], 0));
(function() {
  if (!Ext.global.Float32Array) {
    var a = function(d) {
      if (typeof d === "number") {
        this.length = d
      } else {
        if ("length" in d) {
          this.length = d.length;
          for (var c = 0, b = d.length; c < b; c++) {
            this[c] = +d[c]
          }
        }
      }
    };
    a.prototype = [];
    Ext.global.Float32Array = a
  }
})();
(Ext.cmd.derive("Ext.draw.Draw", Ext.Base, {
  singleton: true,
  radian: Math.PI / 180,
  pi2: Math.PI * 2,
  reflectFn: function(b) {
    return b
  },
  rad: function(a) {
    return (a % 360) * this.radian
  },
  degrees: function(a) {
    return (a / this.radian) % 360
  },
  isBBoxIntersect: function(b, a, c) {
    c = c || 0;
    return (Math.max(b.x, a.x) - c > Math.min(b.x + b.width, a.x + a.width)) ||
      (Math.max(b.y, a.y) - c > Math.min(b.y + b.height, a.y + a.height))
  },
  isPointInBBox: function(a, c, b) {
    return !!b && a >= b.x && a <= (b.x + b.width) && c >= b.y && c <= (b
      .y + b.height)
  },
  spline: function(m) {
    var e, c, k = m.length,
      b, h, l, f, a = 0,
      g = new Float32Array(m.length),
      n = new Float32Array(m.length * 3 - 2);
    g[0] = 0;
    g[k - 1] = 0;
    for (e = 1; e < k - 1; e++) {
      g[e] = (m[e + 1] + m[e - 1] - 2 * m[e]) - g[e - 1];
      a = 1 / (4 - a);
      g[e] *= a
    }
    for (e = k - 2; e > 0; e--) {
      a = 3.732050807568877 + 48.248711305964385 / (-13.928203230275537 +
        Math.pow(0.07179676972449123, e));
      g[e] -= g[e + 1] * a
    }
    f = m[0];
    b = f - g[0];
    for (e = 0, c = 0; e < k - 1; c += 3) {
      l = f;
      h = b;
      e++;
      f = m[e];
      b = f - g[e];
      n[c] = l;
      n[c + 1] = (b + 2 * h) / 3;
      n[c + 2] = (b * 2 + h) / 3
    }
    n[c] = f;
    return n
  },
  getAnchors: function(e, d, i, h, t, s, o) {
    o = o || 4;
    var n = Math.PI,
      p = n / 2,
      k = Math.abs,
      a = Math.sin,
      b = Math.cos,
      f = Math.atan,
      r, q, g, j, m, l, v, u, c;
    r = (i - e) / o;
    q = (t - i) / o;
    if ((h >= d && h >= s) || (h <= d && h <= s)) {
      g = j = p
    } else {
      g = f((i - e) / k(h - d));
      if (d < h) {
        g = n - g
      }
      j = f((t - i) / k(h - s));
      if (s < h) {
        j = n - j
      }
    }
    c = p - ((g + j) % (n * 2)) / 2;
    if (c > p) {
      c -= n
    }
    g += c;
    j += c;
    m = i - r * a(g);
    l = h + r * b(g);
    v = i + q * a(j);
    u = h + q * b(j);
    if ((h > d && l < d) || (h < d && l > d)) {
      m += k(d - l) * (m - i) / (l - h);
      l = d
    }
    if ((h > s && u < s) || (h < s && u > s)) {
      v -= k(s - u) * (v - i) / (u - h);
      u = s
    }
    return {
      x1: m,
      y1: l,
      x2: v,
      y2: u
    }
  },
  smooth: function(l, j, o) {
    var k = l.length,
      h, g, c, b, q, p, n, m, f = [],
      e = [],
      d, a;
    for (d = 0; d < k - 1; d++) {
      h = l[d];
      g = j[d];
      if (d === 0) {
        n = h;
        m = g;
        f.push(n);
        e.push(m);
        if (k === 1) {
          break
        }
      }
      c = l[d + 1];
      b = j[d + 1];
      q = l[d + 2];
      p = j[d + 2];
      if (!Ext.isNumber(q + p)) {
        f.push(n, c, c);
        e.push(m, b, b);
        break
      }
      a = this.getAnchors(h, g, c, b, q, p, o);
      f.push(n, a.x1, c);
      e.push(m, a.y1, b);
      n = a.x2;
      m = a.y2
    }
    return {
      smoothX: f,
      smoothY: e
    }
  },
  beginUpdateIOS: Ext.os.is.iOS ? function() {
    this.iosUpdateEl = Ext.getBody().createChild({
      style: "position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; background: rgba(0,0,0,0.001); z-index: 100000"
    })
  } : Ext.emptyFn,
  endUpdateIOS: function() {
    this.iosUpdateEl = Ext.destroy(this.iosUpdateEl)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.draw, "Draw"], 0));
(Ext.cmd.derive("Ext.draw.gradient.Gradient", Ext.Base, {
  isGradient: true,
  config: {
    stops: []
  },
  applyStops: function(f) {
    var e = [],
      d = f.length,
      c, b, a;
    for (c = 0; c < d; c++) {
      b = f[c];
      a = b.color;
      if (!(a && a.isColor)) {
        a = Ext.draw.Color.fly(a || Ext.draw.Color.NONE)
      }
      e.push({
        offset: Math.min(1, Math.max(0, "offset" in b ? b.offset : b.position ||
          0)),
        color: a.toString()
      })
    }
    e.sort(function(h, g) {
      return h.offset - g.offset
    });
    return e
  },
  onClassExtended: function(a, b) {
    if (!b.alias && b.type) {
      b.alias = "gradient." + b.type
    }
  },
  constructor: function(a) {
    this.initConfig(a)
  },
  generateGradient: Ext.emptyFn
}, 1, 0, 0, 0, 0, 0, [Ext.draw.gradient, "Gradient"], 0));
(Ext.cmd.derive("Ext.draw.gradient.GradientDefinition", Ext.Base, {
  singleton: true,
  urlStringRe: /^url\(#([\w\-]+)\)$/,
  gradients: {},
  add: function(a) {
    var b = this.gradients,
      c, e, d;
    for (c = 0, e = a.length; c < e; c++) {
      d = a[c];
      if (Ext.isString(d.id)) {
        b[d.id] = d
      }
    }
  },
  get: function(d) {
    var a = this.gradients,
      b = d.match(this.urlStringRe),
      c;
    if (b && b[1] && (c = a[b[1]])) {
      return c || d
    }
    return d
  }
}, 0, 0, 0, 0, 0, 0, [Ext.draw.gradient, "GradientDefinition"], 0));
(Ext.cmd.derive("Ext.draw.sprite.AttributeParser", Ext.Base, {
  singleton: true,
  attributeRe: /^url\(#([a-zA-Z\-]+)\)$/,
  "default": Ext.identityFn,
  string: function(a) {
    return String(a)
  },
  number: function(a) {
    if (Ext.isNumber(+a)) {
      return a
    }
  },
  angle: function(a) {
    if (Ext.isNumber(a)) {
      a %= Math.PI * 2;
      if (a < -Math.PI) {
        a += Math.PI * 2
      } else {
        if (a >= Math.PI) {
          a -= Math.PI * 2
        }
      }
      return a
    }
  },
  data: function(a) {
    if (Ext.isArray(a)) {
      return a.slice()
    } else {
      if (a instanceof Float32Array) {
        return new Float32Array(a)
      }
    }
  },
  bool: function(a) {
    return !!a
  },
  color: function(a) {
    if (a instanceof Ext.draw.Color) {
      return a.toString()
    } else {
      if (a instanceof Ext.draw.gradient.Gradient) {
        return a
      } else {
        if (!a) {
          return Ext.draw.Color.NONE
        } else {
          if (Ext.isString(a)) {
            if (a.substr(0, 3) === "url") {
              a = Ext.draw.gradient.GradientDefinition.get(a);
              if (Ext.isString(a)) {
                return a
              }
            } else {
              return Ext.draw.Color.fly(a).toString()
            }
          }
        }
      }
    }
    if (a.type === "linear") {
      return Ext.create("Ext.draw.gradient.Linear", a)
    } else {
      if (a.type === "radial") {
        return Ext.create("Ext.draw.gradient.Radial", a)
      } else {
        if (a.type === "pattern") {
          return Ext.create("Ext.draw.gradient.Pattern", a)
        } else {
          return Ext.draw.Color.NONE
        }
      }
    }
  },
  limited: function(a, b) {
    return function(c) {
      c = +c;
      return Ext.isNumber(c) ? Math.min(Math.max(c, a), b) : undefined
    }
  },
  limited01: function(a) {
    a = +a;
    return Ext.isNumber(a) ? Math.min(Math.max(a, 0), 1) : undefined
  },
  enums: function() {
    var d = {},
      a = Array.prototype.slice.call(arguments, 0),
      b, c;
    for (b = 0, c = a.length; b < c; b++) {
      d[a[b]] = true
    }
    return function(e) {
      return e in d ? e : undefined
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.draw.sprite, "AttributeParser"], 0));
(Ext.cmd.derive("Ext.draw.sprite.AttributeDefinition", Ext.Base, {
  config: {
    defaults: {},
    aliases: {},
    animationProcessors: {},
    processors: {},
    dirtyTriggers: {},
    triggers: {},
    updaters: {}
  },
  inheritableStatics: {
    processorFactoryRe: /^(\w+)\(([\w\-,]*)\)$/
  },
  constructor: function(a) {
    var b = this;
    b.initConfig(a)
  },
  applyDefaults: function(b, a) {
    a = Ext.apply(a || {}, this.normalize(b));
    return a
  },
  applyAliases: function(b, a) {
    return Ext.apply(a || {}, b)
  },
  applyProcessors: function(e, i) {
    this.getAnimationProcessors();
    var j = i || {},
      h = Ext.draw.sprite.AttributeParser,
      a = this.self.processorFactoryRe,
      g = {},
      d, b, c, f;
    for (b in e) {
      f = e[b];
      if (!Ext.isFunction(f)) {
        if (Ext.isString(f)) {
          c = f.match(a);
          if (c) {
            f = h[c[1]].apply(h, c[2].split(","))
          } else {
            g[b] = f;
            d = true;
            f = h[f]
          }
        } else {
          continue
        }
      }
      j[b] = f
    }
    if (d) {
      this.setAnimationProcessors(g)
    }
    return j
  },
  applyAnimationProcessors: function(c, a) {
    var e = Ext.draw.sprite.AnimationParser,
      b, d;
    if (!a) {
      a = {}
    }
    for (b in c) {
      d = c[b];
      if (d === "none") {
        a[b] = null
      } else {
        if (Ext.isString(d) && !(b in a)) {
          if (d in e) {
            while (Ext.isString(e[d])) {
              d = e[d]
            }
            a[b] = e[d]
          }
        } else {
          if (Ext.isObject(d)) {
            a[b] = d
          }
        }
      }
    }
    return a
  },
  updateDirtyTriggers: function(a) {
    this.setTriggers(a)
  },
  applyTriggers: function(b, c) {
    if (!c) {
      c = {}
    }
    for (var a in b) {
      c[a] = b[a].split(",")
    }
    return c
  },
  applyUpdaters: function(b, a) {
    return Ext.apply(a || {}, b)
  },
  batchedNormalize: function(f, o) {
    if (!f) {
      return {}
    }
    var g = this,
      k = g.getProcessors(),
      d = g.getAliases(),
      a = f.translation || f.translate,
      p = {},
      h, j, b, e, q, c, n, m, l;
    if ("rotation" in f) {
      q = f.rotation
    } else {
      q = ("rotate" in f) ? f.rotate : undefined
    }
    if ("scaling" in f) {
      c = f.scaling
    } else {
      c = ("scale" in f) ? f.scale : undefined
    }
    if (typeof c !== "undefined") {
      if (Ext.isNumber(c)) {
        p.scalingX = c;
        p.scalingY = c
      } else {
        if ("x" in c) {
          p.scalingX = c.x
        }
        if ("y" in c) {
          p.scalingY = c.y
        }
        if ("centerX" in c) {
          p.scalingCenterX = c.centerX
        }
        if ("centerY" in c) {
          p.scalingCenterY = c.centerY
        }
      }
    }
    if (typeof q !== "undefined") {
      if (Ext.isNumber(q)) {
        q = Ext.draw.Draw.rad(q);
        p.rotationRads = q
      } else {
        if ("rads" in q) {
          p.rotationRads = q.rads
        } else {
          if ("degrees" in q) {
            if (Ext.isArray(q.degrees)) {
              p.rotationRads = Ext.Array.map(q.degrees, function(i) {
                return Ext.draw.Draw.rad(i)
              })
            } else {
              p.rotationRads = Ext.draw.Draw.rad(q.degrees)
            }
          }
        }
        if ("centerX" in q) {
          p.rotationCenterX = q.centerX
        }
        if ("centerY" in q) {
          p.rotationCenterY = q.centerY
        }
      }
    }
    if (typeof a !== "undefined") {
      if ("x" in a) {
        p.translationX = a.x
      }
      if ("y" in a) {
        p.translationY = a.y
      }
    }
    if ("matrix" in f) {
      n = Ext.draw.Matrix.create(f.matrix);
      l = n.split();
      p.matrix = n;
      p.rotationRads = l.rotation;
      p.rotationCenterX = 0;
      p.rotationCenterY = 0;
      p.scalingX = l.scaleX;
      p.scalingY = l.scaleY;
      p.scalingCenterX = 0;
      p.scalingCenterY = 0;
      p.translationX = l.translateX;
      p.translationY = l.translateY
    }
    for (b in f) {
      e = f[b];
      if (typeof e === "undefined") {
        continue
      } else {
        if (Ext.isArray(e)) {
          if (b in d) {
            b = d[b]
          }
          if (b in k) {
            p[b] = [];
            for (h = 0, j = e.length; h < j; h++) {
              m = k[b].call(this, e[h]);
              if (typeof m !== "undefined") {
                p[b][h] = m
              }
            }
          } else {
            if (o) {
              p[b] = e
            }
          }
        } else {
          if (b in d) {
            b = d[b]
          }
          if (b in k) {
            e = k[b].call(this, e);
            if (typeof e !== "undefined") {
              p[b] = e
            }
          } else {
            if (o) {
              p[b] = e
            }
          }
        }
      }
    }
    return p
  },
  normalize: function(j, k) {
    if (!j) {
      return {}
    }
    var f = this,
      g = f.getProcessors(),
      d = f.getAliases(),
      a = j.translation || j.translate,
      l = {},
      b, e, m, c, i, h;
    if ("rotation" in j) {
      m = j.rotation
    } else {
      m = ("rotate" in j) ? j.rotate : undefined
    }
    if ("scaling" in j) {
      c = j.scaling
    } else {
      c = ("scale" in j) ? j.scale : undefined
    }
    if (a) {
      if ("x" in a) {
        l.translationX = a.x
      }
      if ("y" in a) {
        l.translationY = a.y
      }
    }
    if (typeof c !== "undefined") {
      if (Ext.isNumber(c)) {
        l.scalingX = c;
        l.scalingY = c
      } else {
        if ("x" in c) {
          l.scalingX = c.x
        }
        if ("y" in c) {
          l.scalingY = c.y
        }
        if ("centerX" in c) {
          l.scalingCenterX = c.centerX
        }
        if ("centerY" in c) {
          l.scalingCenterY = c.centerY
        }
      }
    }
    if (typeof m !== "undefined") {
      if (Ext.isNumber(m)) {
        m = Ext.draw.Draw.rad(m);
        l.rotationRads = m
      } else {
        if ("rads" in m) {
          l.rotationRads = m.rads
        } else {
          if ("degrees" in m) {
            l.rotationRads = Ext.draw.Draw.rad(m.degrees)
          }
        }
        if ("centerX" in m) {
          l.rotationCenterX = m.centerX
        }
        if ("centerY" in m) {
          l.rotationCenterY = m.centerY
        }
      }
    }
    if ("matrix" in j) {
      i = Ext.draw.Matrix.create(j.matrix);
      h = i.split();
      l.matrix = i;
      l.rotationRads = h.rotation;
      l.rotationCenterX = 0;
      l.rotationCenterY = 0;
      l.scalingX = h.scaleX;
      l.scalingY = h.scaleY;
      l.scalingCenterX = 0;
      l.scalingCenterY = 0;
      l.translationX = h.translateX;
      l.translationY = h.translateY
    }
    for (b in j) {
      e = j[b];
      if (typeof e === "undefined") {
        continue
      }
      if (b in d) {
        b = d[b]
      }
      if (b in g) {
        e = g[b].call(this, e);
        if (typeof e !== "undefined") {
          l[b] = e
        }
      } else {
        if (k) {
          l[b] = e
        }
      }
    }
    return l
  },
  setBypassingNormalization: function(a, c, b) {
    return c.pushDown(a, b)
  },
  set: function(a, c, b) {
    b = this.normalize(b);
    return this.setBypassingNormalization(a, c, b)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.draw.sprite, "AttributeDefinition"], 0));
(Ext.cmd.derive("Ext.draw.Matrix", Ext.Base, {
  isMatrix: true,
  statics: {
    createAffineMatrixFromTwoPair: function(h, t, g, s, k, o, i, j) {
      var v = g - h,
        u = s - t,
        e = i - k,
        q = j - o,
        d = 1 / (v * v + u * u),
        p = v * e + u * q,
        n = e * u - v * q,
        m = -p * h - n * t,
        l = n * h - p * t;
      return new this(p * d, -n * d, n * d, p * d, m * d + k, l * d + o)
    },
    createPanZoomFromTwoPair: function(q, e, p, c, h, s, n, g) {
      if (arguments.length === 2) {
        return this.createPanZoomFromTwoPair.apply(this, q.concat(e))
      }
      var k = p - q,
        j = c - e,
        d = (q + p) * 0.5,
        b = (e + c) * 0.5,
        o = n - h,
        a = g - s,
        f = (h + n) * 0.5,
        l = (s + g) * 0.5,
        m = k * k + j * j,
        i = o * o + a * a,
        t = Math.sqrt(i / m);
      return new this(t, 0, 0, t, f - t * d, l - t * b)
    },
    fly: (function() {
      var a = null,
        b = function(c) {
          a.elements = c;
          return a
        };
      return function(c) {
        if (!a) {
          a = new Ext.draw.Matrix()
        }
        a.elements = c;
        Ext.draw.Matrix.fly = b;
        return a
      }
    })(),
    create: function(a) {
      if (a instanceof this) {
        return a
      }
      return new this(a)
    }
  },
  constructor: function(e, d, a, f, c, b) {
    if (e && e.length === 6) {
      this.elements = e.slice()
    } else {
      if (e !== undefined) {
        this.elements = [e, d, a, f, c, b]
      } else {
        this.elements = [1, 0, 0, 1, 0, 0]
      }
    }
  },
  prepend: function(a, l, h, g, m, k) {
    var b = this.elements,
      d = b[0],
      j = b[1],
      e = b[2],
      c = b[3],
      i = b[4],
      f = b[5];
    b[0] = a * d + h * j;
    b[1] = l * d + g * j;
    b[2] = a * e + h * c;
    b[3] = l * e + g * c;
    b[4] = a * i + h * f + m;
    b[5] = l * i + g * f + k;
    return this
  },
  prependMatrix: function(a) {
    return this.prepend.apply(this, a.elements)
  },
  append: function(a, l, h, g, m, k) {
    var b = this.elements,
      d = b[0],
      j = b[1],
      e = b[2],
      c = b[3],
      i = b[4],
      f = b[5];
    b[0] = a * d + l * e;
    b[1] = a * j + l * c;
    b[2] = h * d + g * e;
    b[3] = h * j + g * c;
    b[4] = m * d + k * e + i;
    b[5] = m * j + k * c + f;
    return this
  },
  appendMatrix: function(a) {
    return this.append.apply(this, a.elements)
  },
  set: function(f, e, a, g, c, b) {
    var d = this.elements;
    d[0] = f;
    d[1] = e;
    d[2] = a;
    d[3] = g;
    d[4] = c;
    d[5] = b;
    return this
  },
  inverse: function(i) {
    var g = this.elements,
      o = g[0],
      m = g[1],
      l = g[2],
      k = g[3],
      j = g[4],
      h = g[5],
      n = 1 / (o * k - m * l);
    o *= n;
    m *= n;
    l *= n;
    k *= n;
    if (i) {
      i.set(k, -m, -l, o, l * h - k * j, m * j - o * h);
      return i
    } else {
      return new Ext.draw.Matrix(k, -m, -l, o, l * h - k * j, m * j - o *
        h)
    }
  },
  translate: function(a, c, b) {
    if (b) {
      return this.prepend(1, 0, 0, 1, a, c)
    } else {
      return this.append(1, 0, 0, 1, a, c)
    }
  },
  scale: function(f, e, c, a, b) {
    var d = this;
    if (e == null) {
      e = f
    }
    if (c === undefined) {
      c = 0
    }
    if (a === undefined) {
      a = 0
    }
    if (b) {
      return d.prepend(f, 0, 0, e, c - c * f, a - a * e)
    } else {
      return d.append(f, 0, 0, e, c - c * f, a - a * e)
    }
  },
  rotate: function(g, e, c, b) {
    var d = this,
      f = Math.cos(g),
      a = Math.sin(g);
    e = e || 0;
    c = c || 0;
    if (b) {
      return d.prepend(f, a, -a, f, e - f * e + c * a, c - f * c - e * a)
    } else {
      return d.append(f, a, -a, f, e - f * e + c * a, c - f * c - e * a)
    }
  },
  rotateFromVector: function(a, h, c) {
    var e = this,
      g = Math.sqrt(a * a + h * h),
      f = a / g,
      b = h / g;
    if (c) {
      return e.prepend(f, b, -b, f, 0, 0)
    } else {
      return e.append(f, b, -b, f, 0, 0)
    }
  },
  clone: function() {
    return new Ext.draw.Matrix(this.elements)
  },
  flipX: function() {
    return this.append(-1, 0, 0, 1, 0, 0)
  },
  flipY: function() {
    return this.append(1, 0, 0, -1, 0, 0)
  },
  skewX: function(a) {
    return this.append(1, Math.tan(a), 0, -1, 0, 0)
  },
  skewY: function(a) {
    return this.append(1, 0, Math.tan(a), -1, 0, 0)
  },
  reset: function() {
    return this.set(1, 0, 0, 1, 0, 0)
  },
  precisionCompensate: function(j, g) {
    var c = this.elements,
      f = c[0],
      e = c[1],
      i = c[2],
      h = c[3],
      d = c[4],
      b = c[5],
      a = e * i - f * h;
    g.b = j * e / f;
    g.c = j * i / h;
    g.d = j;
    g.xx = f / j;
    g.yy = h / j;
    g.dx = (b * f * i - d * f * h) / a / j;
    g.dy = (d * e * h - b * f * h) / a / j
  },
  precisionCompensateRect: function(j, g) {
    var b = this.elements,
      f = b[0],
      e = b[1],
      i = b[2],
      h = b[3],
      c = b[4],
      a = b[5],
      d = i / f;
    g.b = j * e / f;
    g.c = j * d;
    g.d = j * h / f;
    g.xx = f / j;
    g.yy = f / j;
    g.dx = (a * i - c * h) / (e * d - h) / j;
    g.dy = -(a * f - c * e) / (e * d - h) / j
  },
  x: function(a, c) {
    var b = this.elements;
    return a * b[0] + c * b[2] + b[4]
  },
  y: function(a, c) {
    var b = this.elements;
    return a * b[1] + c * b[3] + b[5]
  },
  get: function(b, a) {
    return +this.elements[b + a * 2].toFixed(4)
  },
  transformPoint: function(b) {
    var c = this.elements,
      a, d;
    if (b.isPoint) {
      a = b.x;
      d = b.y
    } else {
      a = b[0];
      d = b[1]
    }
    return [a * c[0] + d * c[2] + c[4], a * c[1] + d * c[3] + c[5]]
  },
  transformBBox: function(q, i, j) {
    var b = this.elements,
      d = q.x,
      r = q.y,
      g = q.width * 0.5,
      o = q.height * 0.5,
      a = b[0],
      s = b[1],
      n = b[2],
      k = b[3],
      e = d + g,
      c = r + o,
      p, f, m;
    if (i) {
      g -= i;
      o -= i;
      m = [Math.sqrt(b[0] * b[0] + b[2] * b[2]), Math.sqrt(b[1] * b[1] +
        b[3] * b[3])];
      p = Math.abs(g * a) + Math.abs(o * n) + Math.abs(m[0] * i);
      f = Math.abs(g * s) + Math.abs(o * k) + Math.abs(m[1] * i)
    } else {
      p = Math.abs(g * a) + Math.abs(o * n);
      f = Math.abs(g * s) + Math.abs(o * k)
    }
    if (!j) {
      j = {}
    }
    j.x = e * a + c * n + b[4] - p;
    j.y = e * s + c * k + b[5] - f;
    j.width = p + p;
    j.height = f + f;
    return j
  },
  transformList: function(e) {
    var b = this.elements,
      a = b[0],
      h = b[2],
      l = b[4],
      k = b[1],
      g = b[3],
      j = b[5],
      f = e.length,
      c, d;
    for (d = 0; d < f; d++) {
      c = e[d];
      e[d] = [c[0] * a + c[1] * h + l, c[0] * k + c[1] * g + j]
    }
    return e
  },
  isIdentity: function() {
    var a = this.elements;
    return a[0] === 1 && a[1] === 0 && a[2] === 0 && a[3] === 1 && a[4] ===
      0 && a[5] === 0
  },
  equals: function(a) {
    var c = this.elements,
      b = a.elements;
    return c[0] === b[0] && c[1] === b[1] && c[2] === b[2] && c[3] === b[
      3] && c[4] === b[4] && c[5] === b[5]
  },
  toArray: function() {
    var a = this.elements;
    return [a[0], a[2], a[4], a[1], a[3], a[5]]
  },
  toVerticalArray: function() {
    return this.elements.slice()
  },
  toString: function() {
    var a = this;
    return [a.get(0, 0), a.get(0, 1), a.get(1, 0), a.get(1, 1), a.get(2,
      0), a.get(2, 1)].join(",")
  },
  toContext: function(a) {
    a.transform.apply(a, this.elements);
    return this
  },
  toSvg: function() {
    var a = this.elements;
    return "matrix(" + a[0].toFixed(9) + "," + a[1].toFixed(9) + "," + a[
        2].toFixed(9) + "," + a[3].toFixed(9) + "," + a[4].toFixed(9) +
      "," + a[5].toFixed(9) + ")"
  },
  getScaleX: function() {
    var a = this.elements;
    return Math.sqrt(a[0] * a[0] + a[2] * a[2])
  },
  getScaleY: function() {
    var a = this.elements;
    return Math.sqrt(a[1] * a[1] + a[3] * a[3])
  },
  getXX: function() {
    return this.elements[0]
  },
  getXY: function() {
    return this.elements[1]
  },
  getYX: function() {
    return this.elements[2]
  },
  getYY: function() {
    return this.elements[3]
  },
  getDX: function() {
    return this.elements[4]
  },
  getDY: function() {
    return this.elements[5]
  },
  split: function() {
    var c = this.elements,
      e = c[0],
      d = c[1],
      a = c[2],
      f = c[3],
      b = {
        translateX: c[4],
        translateY: c[5]
      };
    b.scaleX = Ext.Number.sign(e) * Math.sqrt(e * e + a * a);
    b.scaleY = Ext.Number.sign(f) * Math.sqrt(d * d + f * f);
    b.rotation = Math.atan2(d, f);
    return b
  }
}, 3, 0, 0, 0, 0, 0, [Ext.draw, "Matrix"], function() {
  function b(e, c, d) {
    e[c] = {
      get: function() {
        return this.elements[d]
      },
      set: function(f) {
        this.elements[d] = f
      }
    }
  }
  if (Object.defineProperties) {
    var a = {};
    b(a, "a", 0);
    b(a, "b", 1);
    b(a, "c", 2);
    b(a, "d", 3);
    b(a, "e", 4);
    b(a, "f", 5);
    Object.defineProperties(this.prototype, a)
  }
  this.prototype.multiply = this.prototype.appendMatrix
}));
(Ext.cmd.derive("Ext.draw.modifier.Modifier", Ext.Base, {
  config: {
    previous: null,
    next: null,
    sprite: null
  },
  constructor: function(a) {
    this.mixins.observable.constructor.call(this, a)
  },
  updateNext: function(a) {
    if (a) {
      a.setPrevious(this)
    }
  },
  updatePrevious: function(a) {
    if (a) {
      a.setNext(this)
    }
  },
  prepareAttributes: function(a) {
    if (this._previous) {
      this._previous.prepareAttributes(a)
    }
  },
  popUp: function(a, b) {
    if (this._next) {
      this._next.popUp(a, b)
    } else {
      Ext.apply(a, b)
    }
  },
  pushDown: function(a, c) {
    if (this._previous) {
      return this._previous.pushDown(a, c)
    } else {
      for (var b in c) {
        if (c[b] === a[b]) {
          delete c[b]
        }
      }
      return c
    }
  }
}, 1, 0, 0, 0, 0, [
  ["observable", Ext.mixin.Observable]
], [Ext.draw.modifier, "Modifier"], 0));
(Ext.cmd.derive("Ext.draw.modifier.Target", Ext.draw.modifier.Modifier, {
  statics: {
    uniqueId: 0
  },
  prepareAttributes: function(a) {
    var b = this.getPrevious();
    if (b) {
      b.prepareAttributes(a)
    }
    a.attributeId = "attribute-" + Ext.draw.modifier.Target.uniqueId++;
    if (!a.hasOwnProperty("canvasAttributes")) {
      a.bbox = {
        plain: {
          dirty: true
        },
        transform: {
          dirty: true
        }
      };
      a.dirty = true;
      a.pendingUpdaters = {};
      a.canvasAttributes = {};
      a.matrix = new Ext.draw.Matrix();
      a.inverseMatrix = new Ext.draw.Matrix()
    }
  },
  applyChanges: function(f, k) {
    Ext.apply(f, k);
    var l = this.getSprite(),
      o = f.pendingUpdaters,
      h = l.self.def.getTriggers(),
      p, a, m, b, e, n, d, c, g;
    for (b in k) {
      e = true;
      if ((p = h[b])) {
        l.scheduleUpdaters(f, p, [b])
      }
      if (f.template && k.removeFromInstance && k.removeFromInstance[b]) {
        delete f[b]
      }
    }
    if (!e) {
      return
    }
    if (o.canvas) {
      n = o.canvas;
      delete o.canvas;
      for (d = 0, g = n.length; d < g; d++) {
        b = n[d];
        f.canvasAttributes[b] = f[b]
      }
    }
    if (f.hasOwnProperty("children")) {
      a = f.children;
      for (d = 0, g = a.length; d < g; d++) {
        m = a[d];
        Ext.apply(m.pendingUpdaters, o);
        if (n) {
          for (c = 0; c < n.length; c++) {
            b = n[c];
            m.canvasAttributes[b] = m[b]
          }
        }
        l.callUpdaters(m)
      }
    }
    l.setDirty(true);
    l.callUpdaters(f)
  },
  popUp: function(a, b) {
    this.applyChanges(a, b)
  },
  pushDown: function(a, b) {
    var c = this.getPrevious();
    if (c) {
      b = c.pushDown(a, b)
    }
    this.applyChanges(a, b);
    return b
  }
}, 0, 0, 0, 0, ["modifier.target"], 0, [Ext.draw.modifier, "Target"], 0));
(Ext.cmd.derive("Ext.draw.TimingFunctions", Ext.Base, function() {
  var g = Math.pow,
    j = Math.sin,
    m = Math.cos,
    l = Math.sqrt,
    e = Math.PI,
    b = ["quad", "cube", "quart", "quint"],
    c = {
      pow: function(o, i) {
        return g(o, i || 6)
      },
      expo: function(i) {
        return g(2, 8 * (i - 1))
      },
      circ: function(i) {
        return 1 - l(1 - i * i)
      },
      sine: function(i) {
        return 1 - j((1 - i) * e / 2)
      },
      back: function(i, o) {
        o = o || 1.616;
        return i * i * ((o + 1) * i - o)
      },
      bounce: function(q) {
        for (var o = 0, i = 1; 1; o += i, i /= 2) {
          if (q >= (7 - 4 * o) / 11) {
            return i * i - g((11 - 6 * o - 11 * q) / 4, 2)
          }
        }
      },
      elastic: function(o, i) {
        return g(2, 10 * --o) * m(20 * o * e * (i || 1) / 3)
      }
    },
    k = {},
    a, f, d;

  function h(i) {
    return function(o) {
      return g(o, i)
    }
  }

  function n(i, o) {
    k[i + "In"] = function(p) {
      return o(p)
    };
    k[i + "Out"] = function(p) {
      return 1 - o(1 - p)
    };
    k[i + "InOut"] = function(p) {
      return (p <= 0.5) ? o(2 * p) / 2 : (2 - o(2 * (1 - p))) / 2
    }
  }
  for (d = 0, f = b.length; d < f; ++d) {
    c[b[d]] = h(d + 2)
  }
  for (a in c) {
    n(a, c[a])
  }
  k.linear = Ext.identityFn;
  k.easeIn = k.quadIn;
  k.easeOut = k.quadOut;
  k.easeInOut = k.quadInOut;
  return {
    singleton: true,
    easingMap: k
  }
}, 0, 0, 0, 0, 0, 0, [Ext.draw, "TimingFunctions"], function(a) {
  Ext.apply(a, a.easingMap)
}));
(Ext.cmd.derive("Ext.draw.Animator", Ext.Base, {
  singleton: true,
  frameCallbacks: {},
  frameCallbackId: 0,
  scheduled: 0,
  frameStartTimeOffset: Ext.now(),
  animations: [],
  running: false,
  animationTime: function() {
    return Ext.AnimationQueue.frameStartTime - this.frameStartTimeOffset
  },
  add: function(b) {
    var a = this;
    if (!a.contains(b)) {
      a.animations.push(b);
      a.ignite();
      if ("fireEvent" in b) {
        b.fireEvent("animationstart", b)
      }
    }
  },
  remove: function(d) {
    var c = this,
      e = c.animations,
      b = 0,
      a = e.length;
    for (; b < a; ++b) {
      if (e[b] === d) {
        e.splice(b, 1);
        if ("fireEvent" in d) {
          d.fireEvent("animationend", d)
        }
        return
      }
    }
  },
  contains: function(a) {
    return Ext.Array.indexOf(this.animations, a) > -1
  },
  empty: function() {
    return this.animations.length === 0
  },
  step: function(d) {
    var c = this,
      f = c.animations,
      e, a = 0,
      b = f.length;
    for (; a < b; a++) {
      e = f[a];
      e.step(d);
      if (!e.animating) {
        f.splice(a, 1);
        a--;
        b--;
        if (e.fireEvent) {
          e.fireEvent("animationend", e)
        }
      }
    }
  },
  schedule: function(c, a) {
    a = a || this;
    var b = "frameCallback" + (this.frameCallbackId++);
    if (Ext.isString(c)) {
      c = a[c]
    }
    Ext.draw.Animator.frameCallbacks[b] = {
      fn: c,
      scope: a,
      once: true
    };
    this.scheduled++;
    Ext.draw.Animator.ignite();
    return b
  },
  scheduleIf: function(e, b) {
    b = b || this;
    var c = Ext.draw.Animator.frameCallbacks,
      a, d;
    if (Ext.isString(e)) {
      e = b[e]
    }
    for (d in c) {
      a = c[d];
      if (a.once && a.fn === e && a.scope === b) {
        return null
      }
    }
    return this.schedule(e, b)
  },
  cancel: function(a) {
    if (Ext.draw.Animator.frameCallbacks[a] && Ext.draw.Animator.frameCallbacks[
        a].once) {
      this.scheduled--;
      delete Ext.draw.Animator.frameCallbacks[a]
    }
  },
  addFrameCallback: function(c, a) {
    a = a || this;
    if (Ext.isString(c)) {
      c = a[c]
    }
    var b = "frameCallback" + (this.frameCallbackId++);
    Ext.draw.Animator.frameCallbacks[b] = {
      fn: c,
      scope: a
    };
    return b
  },
  removeFrameCallback: function(a) {
    delete Ext.draw.Animator.frameCallbacks[a]
  },
  fireFrameCallbacks: function() {
    var c = this.frameCallbacks,
      d, b, a;
    for (d in c) {
      a = c[d];
      b = a.fn;
      if (Ext.isString(b)) {
        b = a.scope[b]
      }
      b.call(a.scope);
      if (c[d] && a.once) {
        this.scheduled--;
        delete c[d]
      }
    }
  },
  handleFrame: function() {
    this.step(this.animationTime());
    this.fireFrameCallbacks();
    if (!this.scheduled && this.empty()) {
      Ext.AnimationQueue.stop(this.handleFrame, this);
      this.running = false;
      Ext.draw.Draw.endUpdateIOS()
    }
  },
  ignite: function() {
    if (!this.running) {
      this.running = true;
      Ext.AnimationQueue.start(this.handleFrame, this);
      Ext.draw.Draw.beginUpdateIOS()
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.draw, "Animator"], 0));
(Ext.cmd.derive("Ext.draw.modifier.Animation", Ext.draw.modifier.Modifier, {
    config: {
      easing: Ext.identityFn,
      duration: 0,
      customEasings: {},
      customDurations: {},
      customDuration: null
    },
    constructor: function(a) {
      var b = this;
      b.anyAnimation = b.anySpecialAnimations = false;
      b.animating = 0;
      b.animatingPool = [];
      Ext.draw.modifier.Modifier.prototype.constructor.call(this, a)
    },
    prepareAttributes: function(a) {
      if (!a.hasOwnProperty("timers")) {
        a.animating = false;
        a.timers = {};
        a.animationOriginal = Ext.Object.chain(a);
        a.animationOriginal.prototype = a
      }
      if (this._previous) {
        this._previous.prepareAttributes(a.animationOriginal)
      }
    },
    updateSprite: function(a) {
      this.setConfig(a.config.fx)
    },
    updateDuration: function(a) {
      this.anyAnimation = a > 0
    },
    applyEasing: function(a) {
      if (typeof a === "string") {
        a = Ext.draw.TimingFunctions.easingMap[a]
      }
      return a
    },
    applyCustomEasings: function(a, e) {
      e = e || {};
      var g, d, b, h, c, f;
      for (d in a) {
        g = true;
        h = a[d];
        b = d.split(",");
        if (typeof h === "string") {
          h = Ext.draw.TimingFunctions.easingMap[h]
        }
        for (c = 0, f = b.length; c < f; c++) {
          e[b[c]] = h
        }
      }
      if (g) {
        this.anySpecialAnimations = g
      }
      return e
    },
    setEasingOn: function(a, e) {
      a = Ext.Array.from(a).slice();
      var c = {},
        d = a.length,
        b = 0;
      for (; b < d; b++) {
        c[a[b]] = e
      }
      this.setCustomEasings(c)
    },
    clearEasingOn: function(a) {
      a = Ext.Array.from(a, true);
      var b = 0,
        c = a.length;
      for (; b < c; b++) {
        delete this._customEasings[a[b]]
      }
    },
    applyCustomDurations: function(g, h) {
      h = h || {};
      var e, c, f, a, b, d;
      for (c in g) {
        e = true;
        f = g[c];
        a = c.split(",");
        for (b = 0, d = a.length; b < d; b++) {
          h[a[b]] = f
        }
      }
      if (e) {
        this.anySpecialAnimations = e
      }
      return h
    },
    applyCustomDuration: function(a, b) {
      if (a) {
        this.getCustomDurations();
        this.setCustomDurations(a)
      }
    },
    setDurationOn: function(b, e) {
      b = Ext.Array.from(b).slice();
      var a = {},
        c = 0,
        d = b.length;
      for (; c < d; c++) {
        a[b[c]] = e
      }
      this.setCustomDurations(a)
    },
    clearDurationOn: function(a) {
      a = Ext.Array.from(a, true);
      var b = 0,
        c = a.length;
      for (; b < c; b++) {
        delete this._customDurations[a[b]]
      }
    },
    setAnimating: function(a, b) {
      var e = this,
        d = e.animatingPool;
      if (a.animating !== b) {
        a.animating = b;
        if (b) {
          d.push(a);
          if (e.animating === 0) {
            Ext.draw.Animator.add(e)
          }
          e.animating++
        } else {
          for (var c = d.length; c--;) {
            if (d[c] === a) {
              d.splice(c, 1)
            }
          }
          e.animating = d.length
        }
      }
    },
    setAttrs: function(r, t) {
      var s = this,
        m = r.timers,
        h = s._sprite.self.def._animationProcessors,
        f = s._easing,
        e = s._duration,
        j = s._customDurations,
        i = s._customEasings,
        g = s.anySpecialAnimations,
        n = s.anyAnimation || g,
        o = r.animationOriginal,
        d = false,
        k, u, l, p, c, q, a;
      if (!n) {
        for (u in t) {
          if (r[u] === t[u]) {
            delete t[u]
          } else {
            r[u] = t[u]
          }
          delete o[u];
          delete m[u]
        }
        return t
      } else {
        for (u in t) {
          l = t[u];
          p = r[u];
          if (l !== p && p !== undefined && p !== null && (c = h[u])) {
            q = f;
            a = e;
            if (g) {
              if (u in i) {
                q = i[u]
              }
              if (u in j) {
                a = j[u]
              }
            }
            if (p && p.isGradient || l && l.isGradient) {
              a = 0
            }
            if (a) {
              if (!m[u]) {
                m[u] = {}
              }
              k = m[u];
              k.start = 0;
              k.easing = q;
              k.duration = a;
              k.compute = c.compute;
              k.serve = c.serve || Ext.identityFn;
              k.remove = t.removeFromInstance && t.removeFromInstance[u];
              if (c.parseInitial) {
                var b = c.parseInitial(p, l);
                k.source = b[0];
                k.target = b[1]
              } else {
                if (c.parse) {
                  k.source = c.parse(p);
                  k.target = c.parse(l)
                } else {
                  k.source = p;
                  k.target = l
                }
              }
              o[u] = l;
              delete t[u];
              d = true;
              continue
            } else {
              delete o[u]
            }
          } else {
            delete o[u]
          }
          delete m[u]
        }
      }
      if (d && !r.animating) {
        s.setAnimating(r, true)
      }
      return t
    },
    updateAttributes: function(g) {
      if (!g.animating) {
        return {}
      }
      var h = {},
        e = false,
        d = g.timers,
        f = g.animationOriginal,
        c = Ext.draw.Animator.animationTime(),
        a, b, i;
      if (g.lastUpdate === c) {
        return {}
      }
      for (a in d) {
        b = d[a];
        if (!b.start) {
          b.start = c;
          i = 0
        } else {
          i = (c - b.start) / b.duration
        }
        if (i >= 1) {
          h[a] = f[a];
          delete f[a];
          if (d[a].remove) {
            h.removeFromInstance = h.removeFromInstance || {};
            h.removeFromInstance[a] = true
          }
          delete d[a]
        } else {
          h[a] = b.serve(b.compute(b.source, b.target, b.easing(i), g[a]));
          e = true
        }
      }
      g.lastUpdate = c;
      this.setAnimating(g, e);
      return h
    },
    pushDown: function(a, b) {
      b = Ext.draw.modifier.Modifier.prototype.pushDown.call(this, a.animationOriginal,
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
    },
    step: function(h) {
      var g = this,
        d = g.animatingPool.slice(),
        a, c, f;
      for (c = 0, f = d.length; c < f; c++) {
        a = d[c];
        var e = this.updateAttributes(a),
          b;
        for (b in e) {
          if (this._next) {
            this._next.popUp(a, e)
          }
          break
        }
      }
    },
    stop: function() {
      this.step();
      var d = this,
        b = d.animatingPool,
        a, c;
      for (a = 0, c = b.length; a < c; a++) {
        b[a].animating = false
      }
      d.animatingPool.length = 0;
      d.animating = 0;
      Ext.draw.Animator.remove(d)
    },
    destroy: function() {
      this.animatingPool.length = 0;
      this.animating = 0;
      Ext.draw.modifier.Modifier.prototype.destroy.call(this)
    }
  }, 1, 0, 0, 0, ["modifier.animation"], 0, [Ext.draw.modifier, "Animation"],
  0));
(Ext.cmd.derive("Ext.draw.modifier.Highlight", Ext.draw.modifier.Modifier, {
    config: {
      enabled: false,
      highlightStyle: null
    },
    preFx: true,
    applyHighlightStyle: function(b, a) {
      a = a || {};
      if (this.getSprite()) {
        Ext.apply(a, this.getSprite().self.def.normalize(b))
      } else {
        Ext.apply(a, b)
      }
      return a
    },
    prepareAttributes: function(a) {
      if (!a.hasOwnProperty("highlightOriginal")) {
        a.highlighted = false;
        a.highlightOriginal = Ext.Object.chain(a);
        a.highlightOriginal.prototype = a;
        a.highlightOriginal.removeFromInstance = {}
      }
      if (this._previous) {
        this._previous.prepareAttributes(a.highlightOriginal)
      }
    },
    updateSprite: function(b, a) {
      if (b) {
        if (this.getHighlightStyle()) {
          this._highlightStyle = b.self.def.normalize(this.getHighlightStyle())
        }
        this.setHighlightStyle(b.config.highlight)
      }
      b.self.def.setConfig({
        defaults: {
          highlighted: false
        },
        processors: {
          highlighted: "bool"
        }
      });
      this.setSprite(b)
    },
    filterChanges: function(a, d) {
      var e = this,
        f = a.highlightOriginal,
        c = e.getHighlightStyle(),
        b;
      if (a.highlighted) {
        for (b in d) {
          if (c.hasOwnProperty(b)) {
            f[b] = d[b];
            delete d[b]
          }
        }
      }
      for (b in d) {
        if (b !== "highlighted" && f[b] === d[b]) {
          delete d[b]
        }
      }
      return d
    },
    pushDown: function(e, g) {
      var f = this.getHighlightStyle(),
        c = e.highlightOriginal,
        i = c.removeFromInstance,
        d, a, h, b;
      if (g.hasOwnProperty("highlighted")) {
        d = g.highlighted;
        delete g.highlighted;
        if (this._previous) {
          g = this._previous.pushDown(c, g)
        }
        g = this.filterChanges(e, g);
        if (d !== e.highlighted) {
          if (d) {
            for (a in f) {
              if (a in g) {
                c[a] = g[a]
              } else {
                h = e.template && e.template.ownAttr;
                if (h && !e.prototype.hasOwnProperty(a)) {
                  i[a] = true;
                  c[a] = h.animationOriginal[a]
                } else {
                  b = c.timers[a];
                  if (b && b.remove) {
                    i[a] = true
                  }
                  c[a] = e[a]
                }
              }
              if (c[a] !== f[a]) {
                g[a] = f[a]
              }
            }
          } else {
            for (a in f) {
              if (!(a in g)) {
                g[a] = c[a]
              }
              delete c[a]
            }
            g.removeFromInstance = g.removeFromInstance || {};
            Ext.apply(g.removeFromInstance, i);
            c.removeFromInstance = {}
          }
          g.highlighted = d
        }
      } else {
        if (this._previous) {
          g = this._previous.pushDown(c, g)
        }
        g = this.filterChanges(e, g)
      }
      return g
    },
    popUp: function(a, b) {
      b = this.filterChanges(a, b);
      Ext.draw.modifier.Modifier.prototype.popUp.call(this, a, b)
    }
  }, 0, 0, 0, 0, ["modifier.highlight"], 0, [Ext.draw.modifier, "Highlight"],
  0));
(Ext.cmd.derive("Ext.draw.sprite.Sprite", Ext.Base, {
  isSprite: true,
  statics: {
    defaultHitTestOptions: {
      fill: true,
      stroke: true
    }
  },
  inheritableStatics: {
    def: {
      processors: {
        strokeStyle: "color",
        fillStyle: "color",
        strokeOpacity: "limited01",
        fillOpacity: "limited01",
        lineWidth: "number",
        lineCap: "enums(butt,round,square)",
        lineJoin: "enums(round,bevel,miter)",
        lineDash: "data",
        lineDashOffset: "number",
        miterLimit: "number",
        shadowColor: "color",
        shadowOffsetX: "number",
        shadowOffsetY: "number",
        shadowBlur: "number",
        globalAlpha: "limited01",
        globalCompositeOperation: "enums(source-over,destination-over,source-in,destination-in,source-out,destination-out,source-atop,destination-atop,lighter,xor,copy)",
        hidden: "bool",
        transformFillStroke: "bool",
        zIndex: "number",
        translationX: "number",
        translationY: "number",
        rotationRads: "number",
        rotationCenterX: "number",
        rotationCenterY: "number",
        scalingX: "number",
        scalingY: "number",
        scalingCenterX: "number",
        scalingCenterY: "number",
        constrainGradients: "bool"
      },
      aliases: {
        stroke: "strokeStyle",
        fill: "fillStyle",
        color: "fillStyle",
        "stroke-width": "lineWidth",
        "stroke-linecap": "lineCap",
        "stroke-linejoin": "lineJoin",
        "stroke-miterlimit": "miterLimit",
        "text-anchor": "textAlign",
        opacity: "globalAlpha",
        translateX: "translationX",
        translateY: "translationY",
        rotateRads: "rotationRads",
        rotateCenterX: "rotationCenterX",
        rotateCenterY: "rotationCenterY",
        scaleX: "scalingX",
        scaleY: "scalingY",
        scaleCenterX: "scalingCenterX",
        scaleCenterY: "scalingCenterY"
      },
      defaults: {
        hidden: false,
        zIndex: 0,
        strokeStyle: "none",
        fillStyle: "none",
        lineWidth: 1,
        lineDash: [],
        lineDashOffset: 0,
        lineCap: "butt",
        lineJoin: "miter",
        miterLimit: 10,
        shadowColor: "none",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        globalAlpha: 1,
        strokeOpacity: 1,
        fillOpacity: 1,
        transformFillStroke: false,
        translationX: 0,
        translationY: 0,
        rotationRads: 0,
        rotationCenterX: null,
        rotationCenterY: null,
        scalingX: 1,
        scalingY: 1,
        scalingCenterX: null,
        scalingCenterY: null,
        constrainGradients: false
      },
      triggers: {
        hidden: "canvas",
        zIndex: "zIndex",
        globalAlpha: "canvas",
        globalCompositeOperation: "canvas",
        transformFillStroke: "canvas",
        strokeStyle: "canvas",
        fillStyle: "canvas",
        strokeOpacity: "canvas",
        fillOpacity: "canvas",
        lineWidth: "canvas",
        lineCap: "canvas",
        lineJoin: "canvas",
        lineDash: "canvas",
        lineDashOffset: "canvas",
        miterLimit: "canvas",
        shadowColor: "canvas",
        shadowOffsetX: "canvas",
        shadowOffsetY: "canvas",
        shadowBlur: "canvas",
        translationX: "transform",
        translationY: "transform",
        rotationRads: "transform",
        rotationCenterX: "transform",
        rotationCenterY: "transform",
        scalingX: "transform",
        scalingY: "transform",
        scalingCenterX: "transform",
        scalingCenterY: "transform",
        constrainGradients: "canvas"
      },
      updaters: {
        bbox: function(b) {
          var c = b.rotationRads !== 0,
            a = b.scalingX !== 1 || b.scalingY !== 1,
            d = b.rotationCenterX === null || b.rotationCenterY === null,
            e = b.scalingCenterX === null || b.scalingCenterY === null;
          b.bbox.plain.dirty = true;
          b.bbox.transform.dirty = true;
          if (c && d || a && e) {
            this.scheduleUpdaters(b, {
              transform: []
            })
          }
        },
        zIndex: function(a) {
          a.dirtyZIndex = true
        },
        transform: function(a) {
          a.dirtyTransform = true;
          a.bbox.transform.dirty = true
        }
      }
    }
  },
  config: {
    parent: null,
    surface: null
  },
  onClassExtended: function(d, c) {
    var b = d.superclass.self.def.initialConfig,
      a;
    if (c.inheritableStatics && c.inheritableStatics.def) {
      a = Ext.merge({}, b, c.inheritableStatics.def);
      d.def = Ext.create("Ext.draw.sprite.AttributeDefinition", a);
      delete c.inheritableStatics.def
    } else {
      d.def = Ext.create("Ext.draw.sprite.AttributeDefinition", b)
    }
  },
  constructor: function(b) {
    var c = this,
      a;
    b = Ext.isObject(b) ? b : {};
    c.id = b.id || Ext.id(null, "ext-sprite-");
    c.attr = {};
    c.mixins.observable.constructor.apply(c, arguments);
    a = Ext.Array.from(b.modifiers, true);
    c.prepareModifiers(a);
    c.initializeAttributes();
    c.setAttributes(c.self.def.getDefaults(), true);
    c.setAttributes(b)
  },
  getDirty: function() {
    return this.attr.dirty
  },
  setDirty: function(a) {
    if ((this.attr.dirty = a)) {
      if (this._parent) {
        this._parent.setDirty(true)
      }
    }
  },
  addModifier: function(a, b) {
    var c = this;
    if (!(a instanceof Ext.draw.modifier.Modifier)) {
      a = Ext.factory(a, null, null, "modifier")
    }
    a.setSprite(c);
    if (a.preFx || a.config && a.config.preFx) {
      if (c.fx.getPrevious()) {
        c.fx.getPrevious().setNext(a)
      }
      a.setNext(c.fx)
    } else {
      c.topModifier.getPrevious().setNext(a);
      a.setNext(c.topModifier)
    }
    if (b) {
      c.initializeAttributes()
    }
    return a
  },
  prepareModifiers: function(d) {
    var c = this,
      a, b;
    c.topModifier = new Ext.draw.modifier.Target({
      sprite: c
    });
    c.fx = new Ext.draw.modifier.Animation({
      sprite: c
    });
    c.fx.setNext(c.topModifier);
    for (a = 0, b = d.length; a < b; a++) {
      c.addModifier(d[a], false)
    }
  },
  initializeAttributes: function() {
    this.topModifier.prepareAttributes(this.attr)
  },
  callUpdaters: function(d) {
    var e = this,
      h = d.pendingUpdaters,
      i = e.self.def.getUpdaters(),
      c = false,
      a = false,
      b, g, f;
    e.callUpdaters = Ext.emptyFn;
    do {
      c = false;
      for (g in h) {
        c = true;
        b = h[g];
        delete h[g];
        f = i[g];
        if (typeof f === "string") {
          f = e[f]
        }
        if (f) {
          f.call(e, d, b)
        }
      }
      a = a || c
    } while (c);
    delete e.callUpdaters;
    if (a) {
      e.setDirty(true)
    }
  },
  scheduleUpdaters: function(a, e, c) {
    var h = a.pendingUpdaters,
      g;

    function f() {
      if (g in h) {
        if (c.length) {
          h[g] = Ext.Array.merge(h[g], c)
        }
      } else {
        h[g] = c
      }
    }
    if (c) {
      for (var b = 0, d = e.length; b < d; b++) {
        g = e[b];
        f()
      }
    } else {
      for (g in e) {
        c = e[g];
        f()
      }
    }
  },
  setAttributes: function(c, d, b) {
    var a = this.attr;
    if (d) {
      if (b) {
        this.topModifier.pushDown(a, c)
      } else {
        this.topModifier.pushDown(a, Ext.apply({}, c))
      }
    } else {
      this.topModifier.pushDown(a, this.self.def.normalize(c))
    }
  },
  setAttributesBypassingNormalization: function(b, a) {
    return this.setAttributes(b, true, a)
  },
  getBBox: function(d) {
    var e = this,
      a = e.attr,
      f = a.bbox,
      c = f.plain,
      b = f.transform;
    if (c.dirty) {
      e.updatePlainBBox(c);
      c.dirty = false
    }
    if (!d) {
      e.applyTransformations();
      if (b.dirty) {
        e.updateTransformedBBox(b, c);
        b.dirty = false
      }
      return b
    }
    return c
  },
  updatePlainBBox: Ext.emptyFn,
  updateTransformedBBox: function(a, b) {
    this.attr.matrix.transformBBox(b, 0, a)
  },
  getBBoxCenter: function(a) {
    var b = this.getBBox(a);
    if (b) {
      return [b.x + b.width * 0.5, b.y + b.height * 0.5]
    } else {
      return [0, 0]
    }
  },
  hide: function() {
    this.attr.hidden = true;
    this.setDirty(true);
    return this
  },
  show: function() {
    this.attr.hidden = false;
    this.setDirty(true);
    return this
  },
  useAttributes: function(i, f) {
    this.applyTransformations();
    var d = this.attr,
      h = d.canvasAttributes,
      e = h.strokeStyle,
      g = h.fillStyle,
      b = h.lineDash,
      c = h.lineDashOffset,
      a;
    if (e) {
      if (e.isGradient) {
        i.strokeStyle = "black";
        i.strokeGradient = e
      } else {
        i.strokeGradient = false
      }
    }
    if (g) {
      if (g.isGradient) {
        i.fillStyle = "black";
        i.fillGradient = g
      } else {
        i.fillGradient = false
      }
    }
    if (b) {
      i.setLineDash(b)
    }
    if (Ext.isNumber(c + i.lineDashOffset)) {
      i.lineDashOffset = c
    }
    for (a in h) {
      if (h[a] !== undefined && h[a] !== i[a]) {
        i[a] = h[a]
      }
    }
    this.setGradientBBox(i, f)
  },
  setGradientBBox: function(b, c) {
    var a = this.attr;
    if (a.constrainGradients) {
      b.setGradientBBox({
        x: c[0],
        y: c[1],
        width: c[2],
        height: c[3]
      })
    } else {
      b.setGradientBBox(this.getBBox(a.transformFillStroke))
    }
  },
  applyTransformations: function(d) {
    if (!d && !this.attr.dirtyTransform) {
      return
    }
    var l = this,
      i = l.attr,
      a = l.getBBoxCenter(true),
      h = a[0],
      g = a[1],
      p = i.translationX,
      n = i.translationY,
      o = i.scalingX,
      m = i.scalingY === null ? i.scalingX : i.scalingY,
      f = i.scalingCenterX === null ? h : i.scalingCenterX,
      e = i.scalingCenterY === null ? g : i.scalingCenterY,
      k = i.rotationRads,
      c = i.rotationCenterX === null ? h : i.rotationCenterX,
      b = i.rotationCenterY === null ? g : i.rotationCenterY,
      q = Math.cos(k),
      j = Math.sin(k);
    if (o === 1 && m === 1) {
      f = 0;
      e = 0
    }
    if (k === 0) {
      c = 0;
      b = 0
    }
    i.matrix.elements = [q * o, j * m, -j * o, q * m, f + (c - q * c - f +
      b * j) * o + p, e + (b - q * b - e + c * -j) * m + n];
    i.matrix.inverse(i.inverseMatrix);
    i.dirtyTransform = false;
    i.bbox.transform.dirty = true
  },
  preRender: Ext.emptyFn,
  render: Ext.emptyFn,
  hitTest: function(b, c) {
    var a = b[0],
      f = b[1],
      e = this.getBBox(),
      d = e && a >= e.x && a <= (e.x + e.width) && f >= e.y && f <= (e.y +
        e.height);
    if (d) {
      return {
        sprite: this
      }
    }
    return null
  },
  repaint: function() {
    var a = this.getSurface();
    if (a) {
      a.renderFrame()
    }
  },
  remove: function() {
    var a = this.getSurface();
    if (a && a.isSurface) {
      return a.remove(this)
    }
    return null
  },
  destroy: function() {
    var b = this,
      a = b.topModifier,
      c;
    while (a) {
      c = a;
      a = a.getPrevious();
      c.destroy()
    }
    delete b.attr;
    b.remove();
    if (b.fireEvent("beforedestroy", b) !== false) {
      b.fireEvent("destroy", b)
    }
    b.callParent()
  }
}, 1, 0, 0, 0, ["sprite.sprite"], [
  ["observable", Ext.mixin.Observable]
], [Ext.draw.sprite, "Sprite"], function() {
  this.def = Ext.create("Ext.draw.sprite.AttributeDefinition", this.def)
}));
(Ext.cmd.derive("Ext.draw.Path", Ext.Base, {
  statics: {
    pathRe: /,?([achlmqrstvxz]),?/gi,
    pathRe2: /-/gi,
    pathSplitRe: /\s|,/g
  },
  svgString: "",
  constructor: function(a) {
    var b = this;
    b.commands = [];
    b.params = [];
    b.cursor = null;
    b.startX = 0;
    b.startY = 0;
    if (a) {
      b.fromSvgString(a)
    }
  },
  clear: function() {
    var a = this;
    a.params.length = 0;
    a.commands.length = 0;
    a.cursor = null;
    a.startX = 0;
    a.startY = 0;
    a.dirt()
  },
  dirt: function() {
    this.svgString = ""
  },
  moveTo: function(a, c) {
    var b = this;
    if (!b.cursor) {
      b.cursor = [a, c]
    }
    b.params.push(a, c);
    b.commands.push("M");
    b.startX = a;
    b.startY = c;
    b.cursor[0] = a;
    b.cursor[1] = c;
    b.dirt()
  },
  lineTo: function(a, c) {
    var b = this;
    if (!b.cursor) {
      b.cursor = [a, c];
      b.params.push(a, c);
      b.commands.push("M")
    } else {
      b.params.push(a, c);
      b.commands.push("L")
    }
    b.cursor[0] = a;
    b.cursor[1] = c;
    b.dirt()
  },
  bezierCurveTo: function(c, e, b, d, a, g) {
    var f = this;
    if (!f.cursor) {
      f.moveTo(c, e)
    }
    f.params.push(c, e, b, d, a, g);
    f.commands.push("C");
    f.cursor[0] = a;
    f.cursor[1] = g;
    f.dirt()
  },
  quadraticCurveTo: function(b, e, a, d) {
    var c = this;
    if (!c.cursor) {
      c.moveTo(b, e)
    }
    c.bezierCurveTo((2 * b + c.cursor[0]) / 3, (2 * e + c.cursor[1]) / 3, (
      2 * b + a) / 3, (2 * e + d) / 3, a, d)
  },
  closePath: function() {
    var a = this;
    if (a.cursor) {
      a.cursor = null;
      a.commands.push("Z");
      a.dirt()
    }
  },
  arcTo: function(A, f, z, d, j, i, v) {
    var E = this;
    if (i === undefined) {
      i = j
    }
    if (v === undefined) {
      v = 0
    }
    if (!E.cursor) {
      E.moveTo(A, f);
      return
    }
    if (j === 0 || i === 0) {
      E.lineTo(A, f);
      return
    }
    z -= A;
    d -= f;
    var B = E.cursor[0] - A,
      g = E.cursor[1] - f,
      C = z * g - d * B,
      b, a, l, r, k, q, x = Math.sqrt(B * B + g * g),
      u = Math.sqrt(z * z + d * d),
      t, e, c;
    if (C === 0) {
      E.lineTo(A, f);
      return
    }
    if (i !== j) {
      b = Math.cos(v);
      a = Math.sin(v);
      l = b / j;
      r = a / i;
      k = -a / j;
      q = b / i;
      var D = l * B + r * g;
      g = k * B + q * g;
      B = D;
      D = l * z + r * d;
      d = k * z + q * d;
      z = D
    } else {
      B /= j;
      g /= i;
      z /= j;
      d /= i
    }
    e = B * u + z * x;
    c = g * u + d * x;
    t = 1 / (Math.sin(Math.asin(Math.abs(C) / (x * u)) * 0.5) * Math.sqrt(
      e * e + c * c));
    e *= t;
    c *= t;
    var o = (e * B + c * g) / (B * B + g * g),
      m = (e * z + c * d) / (z * z + d * d);
    var n = B * o - e,
      p = g * o - c,
      h = z * m - e,
      y = d * m - c,
      w = Math.atan2(p, n),
      s = Math.atan2(y, h);
    if (C > 0) {
      if (s < w) {
        s += Math.PI * 2
      }
    } else {
      if (w < s) {
        w += Math.PI * 2
      }
    }
    if (i !== j) {
      e = b * e * j - a * c * i + A;
      c = a * c * i + b * c * i + f;
      E.lineTo(b * j * n - a * i * p + e, a * j * n + b * i * p + c);
      E.ellipse(e, c, j, i, v, w, s, C < 0)
    } else {
      e = e * j + A;
      c = c * i + f;
      E.lineTo(j * n + e, i * p + c);
      E.ellipse(e, c, j, i, v, w, s, C < 0)
    }
  },
  ellipse: function(h, f, c, a, q, n, d, e) {
    var o = this,
      g = o.params,
      b = g.length,
      m, l, k;
    if (d - n >= Math.PI * 2) {
      o.ellipse(h, f, c, a, q, n, n + Math.PI, e);
      o.ellipse(h, f, c, a, q, n + Math.PI, d, e);
      return
    }
    if (!e) {
      if (d < n) {
        d += Math.PI * 2
      }
      m = o.approximateArc(g, h, f, c, a, q, n, d)
    } else {
      if (n < d) {
        n += Math.PI * 2
      }
      m = o.approximateArc(g, h, f, c, a, q, d, n);
      for (l = b, k = g.length - 2; l < k; l += 2, k -= 2) {
        var p = g[l];
        g[l] = g[k];
        g[k] = p;
        p = g[l + 1];
        g[l + 1] = g[k + 1];
        g[k + 1] = p
      }
    }
    if (!o.cursor) {
      o.cursor = [g[g.length - 2], g[g.length - 1]];
      o.commands.push("M")
    } else {
      o.cursor[0] = g[g.length - 2];
      o.cursor[1] = g[g.length - 1];
      o.commands.push("L")
    }
    for (l = 2; l < m; l += 6) {
      o.commands.push("C")
    }
    o.dirt()
  },
  arc: function(b, f, a, d, c, e) {
    this.ellipse(b, f, a, a, 0, d, c, e)
  },
  rect: function(b, e, c, a) {
    if (c == 0 || a == 0) {
      return
    }
    var d = this;
    d.moveTo(b, e);
    d.lineTo(b + c, e);
    d.lineTo(b + c, e + a);
    d.lineTo(b, e + a);
    d.closePath()
  },
  approximateArc: function(s, i, f, o, n, d, x, v) {
    var e = Math.cos(d),
      z = Math.sin(d),
      k = Math.cos(x),
      l = Math.sin(x),
      q = e * k * o - z * l * n,
      y = -e * l * o - z * k * n,
      p = z * k * o + e * l * n,
      w = -z * l * o + e * k * n,
      m = Math.PI / 2,
      r = 2,
      j = q,
      u = y,
      h = p,
      t = w,
      b = 0.547443256150549,
      C, g, A, a, B, c;
    v -= x;
    if (v < 0) {
      v += Math.PI * 2
    }
    s.push(q + i, p + f);
    while (v >= m) {
      s.push(j + u * b + i, h + t * b + f, j * b + u + i, h * b + t + f,
        u + i, t + f);
      r += 6;
      v -= m;
      C = j;
      j = u;
      u = -C;
      C = h;
      h = t;
      t = -C
    }
    if (v) {
      g = (0.3294738052815987 + 0.012120855841304373 * v) * v;
      A = Math.cos(v);
      a = Math.sin(v);
      B = A + g * a;
      c = a - g * A;
      s.push(j + u * g + i, h + t * g + f, j * B + u * c + i, h * B + t *
        c + f, j * A + u * a + i, h * A + t * a + f);
      r += 6
    }
    return r
  },
  arcSvg: function(j, h, r, m, w, t, c) {
    if (j < 0) {
      j = -j
    }
    if (h < 0) {
      h = -h
    }
    var x = this,
      u = x.cursor[0],
      f = x.cursor[1],
      a = (u - t) / 2,
      y = (f - c) / 2,
      d = Math.cos(r),
      s = Math.sin(r),
      o = a * d + y * s,
      v = -a * s + y * d,
      i = o / j,
      g = v / h,
      p = i * i + g * g,
      e = (u + t) * 0.5,
      b = (f + c) * 0.5,
      l = 0,
      k = 0;
    if (p >= 1) {
      p = Math.sqrt(p);
      j *= p;
      h *= p
    } else {
      p = Math.sqrt(1 / p - 1);
      if (m === w) {
        p = -p
      }
      l = p * j * g;
      k = -p * h * i;
      e += d * l - s * k;
      b += s * l + d * k
    }
    var q = Math.atan2((v - k) / h, (o - l) / j),
      n = Math.atan2((-v - k) / h, (-o - l) / j) - q;
    if (w) {
      if (n <= 0) {
        n += Math.PI * 2
      }
    } else {
      if (n >= 0) {
        n -= Math.PI * 2
      }
    }
    x.ellipse(e, b, j, h, r, q, q + n, 1 - w)
  },
  fromSvgString: function(e) {
    if (!e) {
      return
    }
    var m = this,
      h, l = {
        a: 7,
        c: 6,
        h: 1,
        l: 2,
        m: 2,
        q: 4,
        s: 4,
        t: 2,
        v: 1,
        z: 0,
        A: 7,
        C: 6,
        H: 1,
        L: 2,
        M: 2,
        Q: 4,
        S: 4,
        T: 2,
        V: 1,
        Z: 0
      },
      k = "",
      g, f, c = 0,
      b = 0,
      d = false,
      j, n, a;
    if (Ext.isString(e)) {
      h = e.replace(Ext.draw.Path.pathRe, " $1 ").replace(Ext.draw.Path.pathRe2,
        " -").split(Ext.draw.Path.pathSplitRe)
    } else {
      if (Ext.isArray(e)) {
        h = e.join(",").split(Ext.draw.Path.pathSplitRe)
      }
    }
    for (j = 0, n = 0; j < h.length; j++) {
      if (h[j] !== "") {
        h[n++] = h[j]
      }
    }
    h.length = n;
    m.clear();
    for (j = 0; j < h.length;) {
      k = d;
      d = h[j];
      a = (d.toUpperCase() !== d);
      j++;
      switch (d) {
        case "M":
          m.moveTo(c = +h[j], b = +h[j + 1]);
          j += 2;
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.lineTo(c = +h[j], b = +h[j + 1]);
            j += 2
          }
          break;
        case "L":
          m.lineTo(c = +h[j], b = +h[j + 1]);
          j += 2;
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.lineTo(c = +h[j], b = +h[j + 1]);
            j += 2
          }
          break;
        case "A":
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.arcSvg(+h[j], +h[j + 1], +h[j + 2] * Math.PI / 180, +h[j +
              3], +h[j + 4], c = +h[j + 5], b = +h[j + 6]);
            j += 7
          }
          break;
        case "C":
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.bezierCurveTo(+h[j], +h[j + 1], g = +h[j + 2], f = +h[j + 3],
              c = +h[j + 4], b = +h[j + 5]);
            j += 6
          }
          break;
        case "Z":
          m.closePath();
          break;
        case "m":
          m.moveTo(c += +h[j], b += +h[j + 1]);
          j += 2;
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.lineTo(c += +h[j], b += +h[j + 1]);
            j += 2
          }
          break;
        case "l":
          m.lineTo(c += +h[j], b += +h[j + 1]);
          j += 2;
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.lineTo(c += +h[j], b += +h[j + 1]);
            j += 2
          }
          break;
        case "a":
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.arcSvg(+h[j], +h[j + 1], +h[j + 2] * Math.PI / 180, +h[j +
              3], +h[j + 4], c += +h[j + 5], b += +h[j + 6]);
            j += 7
          }
          break;
        case "c":
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.bezierCurveTo(c + (+h[j]), b + (+h[j + 1]), g = c + (+h[j +
              2]), f = b + (+h[j + 3]), c += +h[j + 4], b += +h[j + 5]);
            j += 6
          }
          break;
        case "z":
          m.closePath();
          break;
        case "s":
          if (!(k === "c" || k === "C" || k === "s" || k === "S")) {
            g = c;
            f = b
          }
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.bezierCurveTo(c + c - g, b + b - f, g = c + (+h[j]), f = b +
              (+h[j + 1]), c += +h[j + 2], b += +h[j + 3]);
            j += 4
          }
          break;
        case "S":
          if (!(k === "c" || k === "C" || k === "s" || k === "S")) {
            g = c;
            f = b
          }
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.bezierCurveTo(c + c - g, b + b - f, g = +h[j], f = +h[j + 1],
              c = (+h[j + 2]), b = (+h[j + 3]));
            j += 4
          }
          break;
        case "q":
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.quadraticCurveTo(g = c + (+h[j]), f = b + (+h[j + 1]), c +=
              +h[j + 2], b += +h[j + 3]);
            j += 4
          }
          break;
        case "Q":
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.quadraticCurveTo(g = +h[j], f = +h[j + 1], c = +h[j + 2], b = +
              h[j + 3]);
            j += 4
          }
          break;
        case "t":
          if (!(k === "q" || k === "Q" || k === "t" || k === "T")) {
            g = c;
            f = b
          }
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.quadraticCurveTo(g = c + c - g, f = b + b - f, c += +h[j +
              1], b += +h[j + 2]);
            j += 2
          }
          break;
        case "T":
          if (!(k === "q" || k === "Q" || k === "t" || k === "T")) {
            g = c;
            f = b
          }
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.quadraticCurveTo(g = c + c - g, f = b + b - f, c = (+h[j +
              1]), b = (+h[j + 2]));
            j += 2
          }
          break;
        case "h":
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.lineTo(c += +h[j], b);
            j++
          }
          break;
        case "H":
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.lineTo(c = +h[j], b);
            j++
          }
          break;
        case "v":
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.lineTo(c, b += +h[j]);
            j++
          }
          break;
        case "V":
          while (j < n && !l.hasOwnProperty(h[j])) {
            m.lineTo(c, b = +h[j]);
            j++
          }
          break
      }
    }
  },
  clone: function() {
    var a = this,
      b = new Ext.draw.Path();
    b.params = a.params.slice(0);
    b.commands = a.commands.slice(0);
    b.cursor = a.cursor ? a.cursor.slice(0) : null;
    b.startX = a.startX;
    b.startY = a.startY;
    b.svgString = a.svgString;
    return b
  },
  transform: function(j) {
    if (j.isIdentity()) {
      return
    }
    var a = j.getXX(),
      f = j.getYX(),
      m = j.getDX(),
      l = j.getXY(),
      e = j.getYY(),
      k = j.getDY(),
      b = this.params,
      c = 0,
      d = b.length,
      h, g;
    for (; c < d; c += 2) {
      h = b[c];
      g = b[c + 1];
      b[c] = h * a + g * f + m;
      b[c + 1] = h * l + g * e + k
    }
    this.dirt()
  },
  getDimension: function(f) {
    if (!f) {
      f = {}
    }
    if (!this.commands || !this.commands.length) {
      f.x = 0;
      f.y = 0;
      f.width = 0;
      f.height = 0;
      return f
    }
    f.left = Infinity;
    f.top = Infinity;
    f.right = -Infinity;
    f.bottom = -Infinity;
    var d = 0,
      c = 0,
      b = this.commands,
      g = this.params,
      e = b.length,
      a, h;
    for (; d < e; d++) {
      switch (b[d]) {
        case "M":
        case "L":
          a = g[c];
          h = g[c + 1];
          f.left = Math.min(a, f.left);
          f.top = Math.min(h, f.top);
          f.right = Math.max(a, f.right);
          f.bottom = Math.max(h, f.bottom);
          c += 2;
          break;
        case "C":
          this.expandDimension(f, a, h, g[c], g[c + 1], g[c + 2], g[c + 3],
            a = g[c + 4], h = g[c + 5]);
          c += 6;
          break
      }
    }
    f.x = f.left;
    f.y = f.top;
    f.width = f.right - f.left;
    f.height = f.bottom - f.top;
    return f
  },
  getDimensionWithTransform: function(n, f) {
    if (!this.commands || !this.commands.length) {
      if (!f) {
        f = {}
      }
      f.x = 0;
      f.y = 0;
      f.width = 0;
      f.height = 0;
      return f
    }
    f.left = Infinity;
    f.top = Infinity;
    f.right = -Infinity;
    f.bottom = -Infinity;
    var a = n.getXX(),
      k = n.getYX(),
      q = n.getDX(),
      p = n.getXY(),
      h = n.getYY(),
      o = n.getDY(),
      e = 0,
      d = 0,
      b = this.commands,
      c = this.params,
      g = b.length,
      m, l;
    for (; e < g; e++) {
      switch (b[e]) {
        case "M":
        case "L":
          m = c[d] * a + c[d + 1] * k + q;
          l = c[d] * p + c[d + 1] * h + o;
          f.left = Math.min(m, f.left);
          f.top = Math.min(l, f.top);
          f.right = Math.max(m, f.right);
          f.bottom = Math.max(l, f.bottom);
          d += 2;
          break;
        case "C":
          this.expandDimension(f, m, l, c[d] * a + c[d + 1] * k + q, c[d] *
            p + c[d + 1] * h + o, c[d + 2] * a + c[d + 3] * k + q, c[d +
              2] * p + c[d + 3] * h + o, m = c[d + 4] * a + c[d + 5] *
            k + q, l = c[d + 4] * p + c[d + 5] * h + o);
          d += 6;
          break
      }
    }
    if (!f) {
      f = {}
    }
    f.x = f.left;
    f.y = f.top;
    f.width = f.right - f.left;
    f.height = f.bottom - f.top;
    return f
  },
  expandDimension: function(i, d, p, k, g, j, e, c, o) {
    var m = this,
      f = i.left,
      a = i.right,
      q = i.top,
      n = i.bottom,
      h = m.dim || (m.dim = []);
    m.curveDimension(d, k, j, c, h);
    f = Math.min(f, h[0]);
    a = Math.max(a, h[1]);
    m.curveDimension(p, g, e, o, h);
    q = Math.min(q, h[0]);
    n = Math.max(n, h[1]);
    i.left = f;
    i.right = a;
    i.top = q;
    i.bottom = n
  },
  curveDimension: function(p, n, k, j, h) {
    var i = 3 * (-p + 3 * (n - k) + j),
      g = 6 * (p - 2 * n + k),
      f = -3 * (p - n),
      o, m, e = Math.min(p, j),
      l = Math.max(p, j),
      q;
    if (i === 0) {
      if (g === 0) {
        h[0] = e;
        h[1] = l;
        return
      } else {
        o = -f / g;
        if (0 < o && o < 1) {
          m = this.interpolate(p, n, k, j, o);
          e = Math.min(e, m);
          l = Math.max(l, m)
        }
      }
    } else {
      q = g * g - 4 * i * f;
      if (q >= 0) {
        q = Math.sqrt(q);
        o = (q - g) / 2 / i;
        if (0 < o && o < 1) {
          m = this.interpolate(p, n, k, j, o);
          e = Math.min(e, m);
          l = Math.max(l, m)
        }
        if (q > 0) {
          o -= q / i;
          if (0 < o && o < 1) {
            m = this.interpolate(p, n, k, j, o);
            e = Math.min(e, m);
            l = Math.max(l, m)
          }
        }
      }
    }
    h[0] = e;
    h[1] = l
  },
  interpolate: function(f, e, j, i, g) {
    if (g === 0) {
      return f
    }
    if (g === 1) {
      return i
    }
    var h = (1 - g) / g;
    return g * g * g * (i + h * (3 * j + h * (3 * e + h * f)))
  },
  fromStripes: function(g) {
    var e = this,
      c = 0,
      d = g.length,
      b, a, f;
    e.clear();
    for (; c < d; c++) {
      f = g[c];
      e.params.push.apply(e.params, f);
      e.commands.push("M");
      for (b = 2, a = f.length; b < a; b += 6) {
        e.commands.push("C")
      }
    }
    if (!e.cursor) {
      e.cursor = []
    }
    e.cursor[0] = e.params[e.params.length - 2];
    e.cursor[1] = e.params[e.params.length - 1];
    e.dirt()
  },
  toStripes: function(k) {
    var o = k || [],
      p, n, m, b, a, h, g, f, e, c = this.commands,
      d = this.params,
      l = c.length;
    for (f = 0, e = 0; f < l; f++) {
      switch (c[f]) {
        case "M":
          p = [h = b = d[e++], g = a = d[e++]];
          o.push(p);
          break;
        case "L":
          n = d[e++];
          m = d[e++];
          p.push((b + b + n) / 3, (a + a + m) / 3, (b + n + n) / 3, (a +
            m + m) / 3, b = n, a = m);
          break;
        case "C":
          p.push(d[e++], d[e++], d[e++], d[e++], b = d[e++], a = d[e++]);
          break;
        case "Z":
          n = h;
          m = g;
          p.push((b + b + n) / 3, (a + a + m) / 3, (b + n + n) / 3, (a +
            m + m) / 3, b = n, a = m);
          break
      }
    }
    return o
  },
  updateSvgString: function() {
    var b = [],
      a = this.commands,
      f = this.params,
      e = a.length,
      d = 0,
      c = 0;
    for (; d < e; d++) {
      switch (a[d]) {
        case "M":
          b.push("M" + f[c] + "," + f[c + 1]);
          c += 2;
          break;
        case "L":
          b.push("L" + f[c] + "," + f[c + 1]);
          c += 2;
          break;
        case "C":
          b.push("C" + f[c] + "," + f[c + 1] + " " + f[c + 2] + "," + f[c +
            3] + " " + f[c + 4] + "," + f[c + 5]);
          c += 6;
          break;
        case "Z":
          b.push("Z");
          break
      }
    }
    this.svgString = b.join("")
  },
  toString: function() {
    if (!this.svgString) {
      this.updateSvgString()
    }
    return this.svgString
  }
}, 3, 0, 0, 0, 0, 0, [Ext.draw, "Path"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Path", Ext.draw.sprite.Sprite, {
  type: "path",
  isPath: true,
  inheritableStatics: {
    def: {
      processors: {
        path: function(b, a) {
          if (!(b instanceof Ext.draw.Path)) {
            b = new Ext.draw.Path(b)
          }
          return b
        }
      },
      aliases: {
        d: "path"
      },
      triggers: {
        path: "bbox"
      },
      updaters: {
        path: function(a) {
          var b = a.path;
          if (!b || b.bindAttr !== a) {
            b = new Ext.draw.Path();
            b.bindAttr = a;
            a.path = b
          }
          b.clear();
          this.updatePath(b, a);
          this.scheduleUpdaters(a, {
            bbox: ["path"]
          })
        }
      }
    }
  },
  updatePlainBBox: function(a) {
    if (this.attr.path) {
      this.attr.path.getDimension(a)
    }
  },
  updateTransformedBBox: function(a) {
    if (this.attr.path) {
      this.attr.path.getDimensionWithTransform(this.attr.matrix, a)
    }
  },
  render: function(b, c) {
    var d = this.attr.matrix,
      a = this.attr;
    if (!a.path || a.path.params.length === 0) {
      return
    }
    d.toContext(c);
    c.appendPath(a.path);
    c.fillStroke(a)
  },
  updatePath: function(b, a) {}
}, 0, 0, 0, 0, ["Ext.draw.Sprite", "sprite.path"], 0, [Ext.draw.sprite,
  "Path"
], 0));
(Ext.cmd.derive("Ext.draw.sprite.Circle", Ext.draw.sprite.Path, {
  type: "circle",
  inheritableStatics: {
    def: {
      processors: {
        cx: "number",
        cy: "number",
        r: "number"
      },
      aliases: {
        radius: "r",
        x: "cx",
        y: "cy",
        centerX: "cx",
        centerY: "cy"
      },
      defaults: {
        cx: 0,
        cy: 0,
        r: 4
      },
      triggers: {
        cx: "path",
        cy: "path",
        r: "path"
      }
    }
  },
  updatePlainBBox: function(c) {
    var b = this.attr,
      a = b.cx,
      e = b.cy,
      d = b.r;
    c.x = a - d;
    c.y = e - d;
    c.width = d + d;
    c.height = d + d
  },
  updateTransformedBBox: function(b) {
    var f = this.attr,
      d = f.cx,
      c = f.cy,
      a = f.r,
      g = f.matrix,
      k = g.getScaleX(),
      j = g.getScaleY(),
      i, e;
    i = k * a;
    e = j * a;
    b.x = g.x(d, c) - i;
    b.y = g.y(d, c) - e;
    b.width = i + i;
    b.height = e + e
  },
  updatePath: function(b, a) {
    b.arc(a.cx, a.cy, a.r, 0, Math.PI * 2, false)
  }
}, 0, 0, 0, 0, ["sprite.circle"], 0, [Ext.draw.sprite, "Circle"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Arc", Ext.draw.sprite.Circle, {
  type: "arc",
  inheritableStatics: {
    def: {
      processors: {
        startAngle: "number",
        endAngle: "number",
        anticlockwise: "bool"
      },
      aliases: {
        from: "startAngle",
        to: "endAngle",
        start: "startAngle",
        end: "endAngle"
      },
      defaults: {
        startAngle: 0,
        endAngle: Math.PI * 2,
        anticlockwise: false
      },
      triggers: {
        startAngle: "path",
        endAngle: "path",
        anticlockwise: "path"
      }
    }
  },
  updatePath: function(b, a) {
    b.arc(a.cx, a.cy, a.r, a.startAngle, a.endAngle, a.anticlockwise)
  }
}, 0, 0, 0, 0, ["sprite.arc"], 0, [Ext.draw.sprite, "Arc"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Arrow", Ext.draw.sprite.Path, {
  inheritableStatics: {
    def: {
      processors: {
        x: "number",
        y: "number",
        size: "number"
      },
      defaults: {
        x: 0,
        y: 0,
        size: 4
      },
      triggers: {
        x: "path",
        y: "path",
        size: "path"
      }
    }
  },
  updatePath: function(d, b) {
    var c = b.size * 1.5,
      a = b.x - b.lineWidth / 2,
      e = b.y;
    d.fromSvgString("M".concat(a - c * 0.7, ",", e - c * 0.4, "l", [c *
      0.6, 0, 0, -c * 0.4, c, c * 0.8, -c, c * 0.8, 0, -c * 0.4, -c *
      0.6, 0
    ], "z"))
  }
}, 0, 0, 0, 0, ["sprite.arrow"], 0, [Ext.draw.sprite, "Arrow"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Composite", Ext.draw.sprite.Sprite, {
  type: "composite",
  isComposite: true,
  config: {
    sprites: []
  },
  constructor: function() {
    this.sprites = [];
    this.sprites.map = {};
    Ext.draw.sprite.Sprite.prototype.constructor.apply(this, arguments)
  },
  add: function(c) {
    if (!c) {
      return null
    }
    if (!c.isSprite) {
      c = Ext.create("sprite." + c.type, c);
      c.setParent(this);
      c.setSurface(this.getSurface())
    }
    var d = this,
      a = d.attr,
      b = c.applyTransformations;
    c.applyTransformations = function() {
      if (c.attr.dirtyTransform) {
        a.dirtyTransform = true;
        a.bbox.plain.dirty = true;
        a.bbox.transform.dirty = true
      }
      b.call(c)
    };
    d.sprites.push(c);
    d.sprites.map[c.id] = c.getId();
    a.bbox.plain.dirty = true;
    a.bbox.transform.dirty = true;
    return c
  },
  updateSurface: function(a) {
    for (var b = 0, c = this.sprites.length; b < c; b++) {
      this.sprites[b].setSurface(a)
    }
  },
  addAll: function(b) {
    if (b.isSprite || b.type) {
      this.add(b)
    } else {
      if (Ext.isArray(b)) {
        var a = 0;
        while (a < b.length) {
          this.add(b[a++])
        }
      }
    }
  },
  updatePlainBBox: function(g) {
    var e = this,
      b = Infinity,
      h = -Infinity,
      f = Infinity,
      a = -Infinity,
      j, k, c, d;
    for (c = 0, d = e.sprites.length; c < d; c++) {
      j = e.sprites[c];
      j.applyTransformations();
      k = j.getBBox();
      if (b > k.x) {
        b = k.x
      }
      if (h < k.x + k.width) {
        h = k.x + k.width
      }
      if (f > k.y) {
        f = k.y
      }
      if (a < k.y + k.height) {
        a = k.y + k.height
      }
    }
    g.x = b;
    g.y = f;
    g.width = h - b;
    g.height = a - f
  },
  render: function(a, b, f) {
    var d = this.attr.matrix,
      c, e;
    d.toContext(b);
    for (c = 0, e = this.sprites.length; c < e; c++) {
      a.renderSprite(this.sprites[c], f)
    }
  },
  destroy: function() {
    var c = this,
      d = c.sprites,
      b = d.length,
      a;
    Ext.draw.sprite.Sprite.prototype.destroy.call(this);
    for (a = 0; a < b; a++) {
      d[a].destroy()
    }
    d.length = 0
  }
}, 1, 0, 0, 0, ["sprite.composite"], 0, [Ext.draw.sprite, "Composite"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Cross", Ext.draw.sprite.Path, {
  inheritableStatics: {
    def: {
      processors: {
        x: "number",
        y: "number",
        size: "number"
      },
      defaults: {
        x: 0,
        y: 0,
        size: 4
      },
      triggers: {
        x: "path",
        y: "path",
        size: "path"
      }
    }
  },
  updatePath: function(d, b) {
    var c = b.size / 1.7,
      a = b.x - b.lineWidth / 2,
      e = b.y;
    d.fromSvgString("M".concat(a - c, ",", e, "l", [-c, -c, c, -c, c, c,
      c, -c, c, c, -c, c, c, c, -c, c, -c, -c, -c, c, -c, -c, "z"
    ]))
  }
}, 0, 0, 0, 0, ["sprite.cross"], 0, [Ext.draw.sprite, "Cross"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Diamond", Ext.draw.sprite.Path, {
  inheritableStatics: {
    def: {
      processors: {
        x: "number",
        y: "number",
        size: "number"
      },
      defaults: {
        x: 0,
        y: 0,
        size: 4
      },
      triggers: {
        x: "path",
        y: "path",
        size: "path"
      }
    }
  },
  updatePath: function(d, b) {
    var c = b.size * 1.25,
      a = b.x - b.lineWidth / 2,
      e = b.y;
    d.fromSvgString(["M", a, e - c, "l", c, c, -c, c, -c, -c, c, -c, "z"])
  }
}, 0, 0, 0, 0, ["sprite.diamond"], 0, [Ext.draw.sprite, "Diamond"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Ellipse", Ext.draw.sprite.Path, {
  type: "ellipse",
  inheritableStatics: {
    def: {
      processors: {
        cx: "number",
        cy: "number",
        rx: "number",
        ry: "number",
        axisRotation: "number"
      },
      aliases: {
        radius: "r",
        x: "cx",
        y: "cy",
        centerX: "cx",
        centerY: "cy",
        radiusX: "rx",
        radiusY: "ry"
      },
      defaults: {
        cx: 0,
        cy: 0,
        rx: 1,
        ry: 1,
        axisRotation: 0
      },
      triggers: {
        cx: "path",
        cy: "path",
        rx: "path",
        ry: "path",
        axisRotation: "path"
      }
    }
  },
  updatePlainBBox: function(c) {
    var b = this.attr,
      a = b.cx,
      f = b.cy,
      e = b.rx,
      d = b.ry;
    c.x = a - e;
    c.y = f - d;
    c.width = e + e;
    c.height = d + d
  },
  updateTransformedBBox: function(d) {
    var i = this.attr,
      f = i.cx,
      e = i.cy,
      c = i.rx,
      b = i.ry,
      l = b / c,
      m = i.matrix.clone(),
      a, q, k, j, p, o, n, g;
    m.append(1, 0, 0, l, 0, e * (1 - l));
    a = m.getXX();
    k = m.getYX();
    p = m.getDX();
    q = m.getXY();
    j = m.getYY();
    o = m.getDY();
    n = Math.sqrt(a * a + k * k) * c;
    g = Math.sqrt(q * q + j * j) * c;
    d.x = f * a + e * k + p - n;
    d.y = f * q + e * j + o - g;
    d.width = n + n;
    d.height = g + g
  },
  updatePath: function(b, a) {
    b.ellipse(a.cx, a.cy, a.rx, a.ry, a.axisRotation, 0, Math.PI * 2,
      false)
  }
}, 0, 0, 0, 0, ["sprite.ellipse"], 0, [Ext.draw.sprite, "Ellipse"], 0));
(Ext.cmd.derive("Ext.draw.sprite.EllipticalArc", Ext.draw.sprite.Ellipse, {
  type: "ellipticalArc",
  inheritableStatics: {
    def: {
      processors: {
        startAngle: "number",
        endAngle: "number",
        anticlockwise: "bool"
      },
      aliases: {
        from: "startAngle",
        to: "endAngle",
        start: "startAngle",
        end: "endAngle"
      },
      defaults: {
        startAngle: 0,
        endAngle: Math.PI * 2,
        anticlockwise: false
      },
      triggers: {
        startAngle: "path",
        endAngle: "path",
        anticlockwise: "path"
      }
    }
  },
  updatePath: function(b, a) {
    b.ellipse(a.cx, a.cy, a.rx, a.ry, a.axisRotation, a.startAngle, a.endAngle,
      a.anticlockwise)
  }
}, 0, 0, 0, 0, ["sprite.ellipticalArc"], 0, [Ext.draw.sprite,
  "EllipticalArc"
], 0));
(Ext.cmd.derive("Ext.draw.sprite.Rect", Ext.draw.sprite.Path, {
  type: "rect",
  inheritableStatics: {
    def: {
      processors: {
        x: "number",
        y: "number",
        width: "number",
        height: "number",
        radius: "number"
      },
      aliases: {},
      triggers: {
        x: "path",
        y: "path",
        width: "path",
        height: "path",
        radius: "path"
      },
      defaults: {
        x: 0,
        y: 0,
        width: 8,
        height: 8,
        radius: 0
      }
    }
  },
  updatePlainBBox: function(b) {
    var a = this.attr;
    b.x = a.x;
    b.y = a.y;
    b.width = a.width;
    b.height = a.height
  },
  updateTransformedBBox: function(a, b) {
    this.attr.matrix.transformBBox(b, this.attr.radius, a)
  },
  updatePath: function(f, d) {
    var c = d.x,
      g = d.y,
      e = d.width,
      b = d.height,
      a = Math.min(d.radius, Math.abs(d.height) * 0.5, Math.abs(d.width) *
        0.5);
    if (a === 0) {
      f.rect(c, g, e, b)
    } else {
      f.moveTo(c + a, g);
      f.arcTo(c + e, g, c + e, g + b, a);
      f.arcTo(c + e, g + b, c, g + b, a);
      f.arcTo(c, g + b, c, g, a);
      f.arcTo(c, g, c + a, g, a)
    }
  }
}, 0, 0, 0, 0, ["sprite.rect"], 0, [Ext.draw.sprite, "Rect"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Image", Ext.draw.sprite.Rect, {
  type: "image",
  statics: {
    imageLoaders: {}
  },
  inheritableStatics: {
    def: {
      processors: {
        src: "string"
      },
      defaults: {
        src: "",
        width: null,
        height: null
      }
    }
  },
  render: function(c, o) {
    var j = this,
      h = j.attr,
      n = h.matrix,
      a = h.src,
      l = h.x,
      k = h.y,
      b = h.width,
      m = h.height,
      g = Ext.draw.sprite.Image.imageLoaders[a],
      f, d, e;
    if (g && g.done) {
      n.toContext(o);
      d = g.image;
      o.drawImage(d, l, k, b || (d.naturalWidth || d.width) / c.devicePixelRatio,
        m || (d.naturalHeight || d.height) / c.devicePixelRatio)
    } else {
      if (!g) {
        f = new Image();
        g = Ext.draw.sprite.Image.imageLoaders[a] = {
          image: f,
          done: false,
          pendingSprites: [j],
          pendingSurfaces: [c]
        };
        f.width = b;
        f.height = m;
        f.onload = function() {
          if (!g.done) {
            g.done = true;
            for (e = 0; e < g.pendingSprites.length; e++) {
              g.pendingSprites[e].setDirty(true)
            }
            for (e in g.pendingSurfaces) {
              g.pendingSurfaces[e].renderFrame()
            }
          }
        };
        f.src = a
      } else {
        Ext.Array.include(g.pendingSprites, j);
        Ext.Array.include(g.pendingSurfaces, c)
      }
    }
  }
}, 0, 0, 0, 0, ["sprite.image"], 0, [Ext.draw.sprite, "Image"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Instancing", Ext.draw.sprite.Sprite, {
  type: "instancing",
  isInstancing: true,
  config: {
    template: null
  },
  instances: null,
  applyTemplate: function(a) {
    if (!a.isSprite) {
      if (!a.xclass && !a.type) {
        a.type = "circle"
      }
      a = Ext.create(a.xclass || "sprite." + a.type, a)
    }
    a.setParent(this);
    return a
  },
  updateTemplate: function(a, b) {
    if (b) {
      delete b.ownAttr
    }
    a.setSurface(this.getSurface());
    a.ownAttr = a.attr;
    this.clearAll()
  },
  updateSurface: function(a) {
    var b = this.getTemplate();
    if (b) {
      b.setSurface(a)
    }
  },
  get: function(a) {
    return this.instances[a]
  },
  getCount: function() {
    return this.instances.length
  },
  clearAll: function() {
    var a = this.getTemplate();
    a.attr.children = this.instances = [];
    this.position = 0
  },
  createInstance: function(d, f, c) {
    var e = this.getTemplate(),
      b = e.attr,
      a = Ext.Object.chain(b);
    e.topModifier.prepareAttributes(a);
    e.attr = a;
    e.setAttributes(d, f, c);
    a.template = e;
    this.instances.push(a);
    e.attr = b;
    this.position++;
    return a
  },
  getBBox: function() {
    return null
  },
  getBBoxFor: function(b, d) {
    var c = this.getTemplate(),
      a = c.attr,
      e;
    c.attr = this.instances[b];
    e = c.getBBox(d);
    c.attr = a;
    return e
  },
  render: function(b, l, d, h) {
    var g = this,
      j = g.getTemplate(),
      k = g.attr.matrix,
      c = j.attr,
      a = g.instances,
      e, f = g.position;
    k.toContext(l);
    j.preRender(b, l, d, h);
    j.useAttributes(l, h);
    for (e = 0; e < f; e++) {
      if (a[e].dirtyZIndex) {
        break
      }
    }
    for (e = 0; e < f; e++) {
      if (a[e].hidden) {
        continue
      }
      l.save();
      j.attr = a[e];
      j.useAttributes(l, h);
      j.render(b, l, d, h);
      l.restore()
    }
    j.attr = c
  },
  setAttributesFor: function(c, e, f) {
    var d = this.getTemplate(),
      b = d.attr,
      a = this.instances[c];
    if (!a) {
      return
    }
    d.attr = a;
    if (f) {
      e = Ext.apply({}, e)
    } else {
      e = d.self.def.normalize(e)
    }
    d.topModifier.pushDown(a, e);
    d.attr = b
  },
  destroy: function() {
    var b = this,
      a = b.getTemplate();
    Ext.draw.sprite.Sprite.prototype.destroy.call(this);
    b.instances = null;
    if (a) {
      a.destroy()
    }
  }
}, 0, 0, 0, 0, ["sprite.instancing"], 0, [Ext.draw.sprite, "Instancing"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Line", Ext.draw.sprite.Sprite, {
  type: "line",
  inheritableStatics: {
    def: {
      processors: {
        fromX: "number",
        fromY: "number",
        toX: "number",
        toY: "number"
      },
      defaults: {
        fromX: 0,
        fromY: 0,
        toX: 1,
        toY: 1,
        strokeStyle: "black"
      },
      aliases: {
        x1: "fromX",
        y1: "fromY",
        x2: "toX",
        y2: "toY"
      }
    }
  },
  updatePlainBBox: function(b) {
    var a = this.attr,
      f = Math.min(a.fromX, a.toX),
      d = Math.min(a.fromY, a.toY),
      e = Math.max(a.fromX, a.toX),
      c = Math.max(a.fromY, a.toY);
    b.x = f;
    b.y = d;
    b.width = e - f;
    b.height = c - d
  },
  render: function(b, c) {
    var a = this.attr,
      d = this.attr.matrix;
    d.toContext(c);
    c.beginPath();
    c.moveTo(a.fromX, a.fromY);
    c.lineTo(a.toX, a.toY);
    c.stroke()
  }
}, 0, 0, 0, 0, ["sprite.line"], 0, [Ext.draw.sprite, "Line"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Plus", Ext.draw.sprite.Path, {
  inheritableStatics: {
    def: {
      processors: {
        x: "number",
        y: "number",
        size: "number"
      },
      defaults: {
        x: 0,
        y: 0,
        size: 4
      },
      triggers: {
        x: "path",
        y: "path",
        size: "path"
      }
    }
  },
  updatePath: function(d, b) {
    var c = b.size / 1.3,
      a = b.x - b.lineWidth / 2,
      e = b.y;
    d.fromSvgString("M".concat(a - c / 2, ",", e - c / 2, "l", [0, -c, c,
      0, 0, c, c, 0, 0, c, -c, 0, 0, c, -c, 0, 0, -c, -c, 0, 0, -c,
      "z"
    ]))
  }
}, 0, 0, 0, 0, ["sprite.plus"], 0, [Ext.draw.sprite, "Plus"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Sector", Ext.draw.sprite.Path, {
  type: "sector",
  inheritableStatics: {
    def: {
      processors: {
        centerX: "number",
        centerY: "number",
        startAngle: "number",
        endAngle: "number",
        startRho: "number",
        endRho: "number",
        margin: "number"
      },
      aliases: {
        rho: "endRho"
      },
      triggers: {
        centerX: "path,bbox",
        centerY: "path,bbox",
        startAngle: "path,bbox",
        endAngle: "path,bbox",
        startRho: "path,bbox",
        endRho: "path,bbox",
        margin: "path,bbox"
      },
      defaults: {
        centerX: 0,
        centerY: 0,
        startAngle: 0,
        endAngle: 0,
        startRho: 0,
        endRho: 150,
        margin: 0,
        path: "M 0,0"
      }
    }
  },
  getMidAngle: function() {
    return this.midAngle || 0
  },
  updatePath: function(j, h) {
    var g = Math.min(h.startAngle, h.endAngle),
      c = Math.max(h.startAngle, h.endAngle),
      b = this.midAngle = (g + c) * 0.5,
      d = h.margin,
      f = h.centerX,
      e = h.centerY,
      i = Math.min(h.startRho, h.endRho),
      a = Math.max(h.startRho, h.endRho);
    if (d) {
      f += d * Math.cos(b);
      e += d * Math.sin(b)
    }
    j.moveTo(f + i * Math.cos(g), e + i * Math.sin(g));
    j.lineTo(f + a * Math.cos(g), e + a * Math.sin(g));
    j.arc(f, e, a, g, c, false);
    j.lineTo(f + i * Math.cos(c), e + i * Math.sin(c));
    j.arc(f, e, i, c, g, true)
  }
}, 0, 0, 0, 0, ["sprite.sector"], 0, [Ext.draw.sprite, "Sector"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Square", Ext.draw.sprite.Rect, {
  inheritableStatics: {
    def: {
      processors: {
        size: "number"
      },
      defaults: {
        size: 4
      },
      triggers: {
        size: "size"
      },
      updaters: {
        size: function(a) {
          var c = a.size,
            b = a.lineWidth / 2;
          this.setAttributes({
            x: a.x - c - b,
            y: a.y - c,
            height: 2 * c,
            width: 2 * c
          })
        }
      }
    }
  }
}, 0, 0, 0, 0, ["sprite.square"], 0, [Ext.draw.sprite, "Square"], 0));
(Ext.cmd.derive("Ext.draw.TextMeasurer", Ext.Base, {
  singleton: true,
  measureDiv: null,
  measureCache: {},
  precise: Ext.isIE8,
  measureDivTpl: {
    tag: "div",
    style: {
      overflow: "hidden",
      position: "relative",
      "float": "left",
      width: 0,
      height: 0
    },
    children: {
      tag: "div",
      style: {
        display: "block",
        position: "absolute",
        x: -100000,
        y: -100000,
        padding: 0,
        margin: 0,
        "z-index": -100000,
        "white-space": "nowrap"
      }
    }
  },
  actualMeasureText: function(g, b) {
    var e = Ext.draw.TextMeasurer,
      f = e.measureDiv,
      a = 100000,
      c;
    if (!f) {
      var d = Ext.Element.create({
        style: {
          overflow: "hidden",
          position: "relative",
          "float": "left",
          width: 0,
          height: 0
        }
      });
      e.measureDiv = f = Ext.Element.create({
        style: {
          position: "absolute",
          x: a,
          y: a,
          "z-index": -a,
          "white-space": "nowrap",
          display: "block",
          padding: 0,
          margin: 0
        }
      });
      Ext.getBody().appendChild(d);
      d.appendChild(f)
    }
    if (b) {
      f.setStyle({
        font: b,
        lineHeight: "normal"
      })
    }
    f.setText("(" + g + ")");
    c = f.getSize();
    f.setText("()");
    c.width -= f.getSize().width;
    return c
  },
  measureTextSingleLine: function(h, d) {
    if (this.precise) {
      return this.preciseMeasureTextSingleLine(h, d)
    }
    h = h.toString();
    var a = this.measureCache,
      g = h.split(""),
      c = 0,
      j = 0,
      l, b, e, f, k;
    if (!a[d]) {
      a[d] = {}
    }
    a = a[d];
    if (a[h]) {
      return a[h]
    }
    for (e = 0, f = g.length; e < f; e++) {
      b = g[e];
      if (!(l = a[b])) {
        k = this.actualMeasureText(b, d);
        l = a[b] = k
      }
      c += l.width;
      j = Math.max(j, l.height)
    }
    return a[h] = {
      width: c,
      height: j
    }
  },
  preciseMeasureTextSingleLine: function(c, a) {
    c = c.toString();
    var b = this.measureDiv || (this.measureDiv = Ext.getBody().createChild(
      this.measureDivTpl).down("div"));
    b.setStyle({
      font: a || ""
    });
    return Ext.util.TextMetrics.measure(b, c)
  },
  measureText: function(e, b) {
    var h = e.split("\n"),
      d = h.length,
      f = 0,
      a = 0,
      j, c, g;
    if (d === 1) {
      return this.measureTextSingleLine(e, b)
    }
    g = [];
    for (c = 0; c < d; c++) {
      j = this.measureTextSingleLine(h[c], b);
      g.push(j);
      f += j.height;
      a = Math.max(a, j.width)
    }
    return {
      width: a,
      height: f,
      sizes: g
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.draw, "TextMeasurer"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Text", Ext.draw.sprite.Sprite, {
  type: "text",
  lineBreakRe: /\r?\n/g,
  inheritableStatics: {
    def: {
      animationProcessors: {
        text: "text"
      },
      processors: {
        x: "number",
        y: "number",
        text: "string",
        fontSize: (function(a) {
          return function(b) {
            if (Ext.isNumber(+b)) {
              return b + "px"
            } else {
              if (b.match(Ext.dom.Element.unitRe)) {
                return b
              } else {
                if (b in a) {
                  return b
                }
              }
            }
          }
        })({
          "xx-small": "fontSize",
          "x-small": "fontSize",
          small: "fontSize",
          medium: "fontSize",
          large: "fontSize",
          "x-large": "fontSize",
          "xx-large": "fontSize"
        }),
        fontStyle: "enums(,italic,oblique)",
        fontVariant: "enums(,small-caps)",
        fontWeight: (function(a) {
          return function(b) {
            if (b in a) {
              return String(b)
            } else {
              return ""
            }
          }
        })({
          normal: true,
          bold: true,
          bolder: true,
          lighter: true,
          100: true,
          200: true,
          300: true,
          400: true,
          500: true,
          600: true,
          700: true,
          800: true,
          900: true
        }),
        fontFamily: "string",
        textAlign: (function(a) {
          return function(b) {
            return a[b] || "center"
          }
        })({
          start: "start",
          left: "start",
          center: "center",
          middle: "center",
          end: "end",
          right: "end"
        }),
        textBaseline: (function(a) {
          return function(b) {
            return a[b] || "alphabetic"
          }
        })({
          top: "top",
          hanging: "hanging",
          middle: "middle",
          center: "middle",
          alphabetic: "alphabetic",
          ideographic: "ideographic",
          bottom: "bottom"
        }),
        font: "string"
      },
      aliases: {
        "font-size": "fontSize",
        "font-family": "fontFamily",
        "font-weight": "fontWeight",
        "font-variant": "fontVariant",
        "text-anchor": "textAlign"
      },
      defaults: {
        fontStyle: "",
        fontVariant: "",
        fontWeight: "",
        fontSize: "10px",
        fontFamily: "sans-serif",
        font: "10px sans-serif",
        textBaseline: "alphabetic",
        textAlign: "start",
        strokeStyle: "rgba(0, 0, 0, 0)",
        fillStyle: "#000",
        x: 0,
        y: 0,
        text: ""
      },
      triggers: {
        fontStyle: "fontX,bbox",
        fontVariant: "fontX,bbox",
        fontWeight: "fontX,bbox",
        fontSize: "fontX,bbox",
        fontFamily: "fontX,bbox",
        font: "font,bbox,canvas",
        textBaseline: "bbox",
        textAlign: "bbox",
        x: "bbox",
        y: "bbox",
        text: "bbox"
      },
      updaters: {
        fontX: "makeFontShorthand",
        font: "parseFontShorthand"
      }
    }
  },
  constructor: function(a) {
    if (a && a.font) {
      a = Ext.clone(a);
      for (var b in a) {
        if (b !== "font" && b.indexOf("font") === 0) {
          delete a[b]
        }
      }
    }
    Ext.draw.sprite.Sprite.prototype.constructor.call(this, a)
  },
  fontValuesMap: {
    italic: "fontStyle",
    oblique: "fontStyle",
    "small-caps": "fontVariant",
    bold: "fontWeight",
    bolder: "fontWeight",
    lighter: "fontWeight",
    "100": "fontWeight",
    "200": "fontWeight",
    "300": "fontWeight",
    "400": "fontWeight",
    "500": "fontWeight",
    "600": "fontWeight",
    "700": "fontWeight",
    "800": "fontWeight",
    "900": "fontWeight",
    "xx-small": "fontSize",
    "x-small": "fontSize",
    small: "fontSize",
    medium: "fontSize",
    large: "fontSize",
    "x-large": "fontSize",
    "xx-large": "fontSize"
  },
  makeFontShorthand: function(a) {
    var b = [];
    if (a.fontStyle) {
      b.push(a.fontStyle)
    }
    if (a.fontVariant) {
      b.push(a.fontVariant)
    }
    if (a.fontWeight) {
      b.push(a.fontWeight)
    }
    if (a.fontSize) {
      b.push(a.fontSize)
    }
    if (a.fontFamily) {
      b.push(a.fontFamily)
    }
    this.setAttributes({
      font: b.join(" ")
    }, true)
  },
  parseFontShorthand: function(f) {
    var i = f.font,
      g = i.length,
      h = {},
      j = this.fontValuesMap,
      a = 0,
      e, c, b, d;
    while (a < g && e !== -1) {
      e = i.indexOf(" ", a);
      if (e < 0) {
        b = i.substr(a)
      } else {
        if (e > a) {
          b = i.substr(a, e - a)
        } else {
          continue
        }
      }
      c = b.indexOf("/");
      if (c > 0) {
        b = b.substr(0, c)
      } else {
        if (c === 0) {
          continue
        }
      }
      if (b !== "normal" && b !== "inherit") {
        d = j[b];
        if (d) {
          h[d] = b
        } else {
          if (b.match(Ext.dom.Element.unitRe)) {
            h.fontSize = b
          } else {
            h.fontFamily = i.substr(a);
            break
          }
        }
      }
      a = e + 1
    }
    if (!h.fontStyle) {
      h.fontStyle = ""
    }
    if (!h.fontVariant) {
      h.fontVariant = ""
    }
    if (!h.fontWeight) {
      h.fontWeight = ""
    }
    this.setAttributes(h, true)
  },
  fontProperties: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    fontFamily: true
  },
  setAttributes: function(c, e, a) {
    var b, d;
    if (c && c.font) {
      d = {};
      for (b in c) {
        if (!(b in this.fontProperties)) {
          d[b] = c[b]
        }
      }
      c = d
    }
    Ext.draw.sprite.Sprite.prototype.setAttributes.call(this, c, e, a)
  },
  getBBox: function(c) {
    var d = this,
      b = d.attr.bbox.plain,
      a = d.getSurface();
    if (b.dirty) {
      d.updatePlainBBox(b);
      b.dirty = false
    }
    if (a.getInherited().rtl && a.getFlipRtlText()) {
      d.updatePlainBBox(b, true)
    }
    return Ext.draw.sprite.Sprite.prototype.getBBox.call(this, c)
  },
  rtlAlignments: {
    start: "end",
    center: "center",
    end: "start"
  },
  updatePlainBBox: function(f, v) {
    var w = this,
      s = w.attr,
      k = s.x,
      j = s.y,
      m = [],
      p = s.font,
      n = s.text,
      o = s.textBaseline,
      g = s.textAlign,
      q = (v && w.oldSize) ? w.oldSize : (w.oldSize = Ext.draw.TextMeasurer
        .measureText(n, p)),
      t = w.getSurface(),
      l = t.getInherited().rtl,
      r = l && t.getFlipRtlText(),
      d = t.getRect(),
      b = q.sizes,
      c = q.height,
      e = q.width,
      h = b ? b.length : 0,
      a, u = 0;
    switch (o) {
      case "hanging":
      case "top":
        break;
      case "ideographic":
      case "bottom":
        j -= c;
        break;
      case "alphabetic":
        j -= c * 0.8;
        break;
      case "middle":
        j -= c * 0.5;
        break
    }
    if (r) {
      k = d[2] - d[0] - k;
      g = w.rtlAlignments[g]
    }
    switch (g) {
      case "start":
        if (l) {
          for (; u < h; u++) {
            a = b[u].width;
            m.push(-(e - a))
          }
        }
        break;
      case "end":
        k -= e;
        if (l) {
          break
        }
        for (; u < h; u++) {
          a = b[u].width;
          m.push(e - a)
        }
        break;
      case "center":
        k -= e * 0.5;
        for (; u < h; u++) {
          a = b[u].width;
          m.push((l ? -1 : 1) * (e - a) * 0.5)
        }
        break
    }
    s.textAlignOffsets = m;
    f.x = k;
    f.y = j;
    f.width = e;
    f.height = c
  },
  setText: function(a) {
    this.setAttributes({
      text: a
    }, true)
  },
  render: function(a, m, f) {
    var d = this,
      c = d.attr,
      l = Ext.draw.Matrix.fly(c.matrix.elements.slice(0)),
      k = d.getBBox(true),
      o = c.textAlignOffsets,
      h = Ext.draw.Color.RGBA_NONE,
      g, e, b, n, j;
    if (c.text.length === 0) {
      return
    }
    n = c.text.split(d.lineBreakRe);
    j = k.height / n.length;
    g = c.bbox.plain.x;
    e = c.bbox.plain.y + j * 0.78;
    l.toContext(m);
    if (a.getInherited().rtl) {
      g += c.bbox.plain.width
    }
    for (b = 0; b < n.length; b++) {
      if (m.fillStyle !== h) {
        m.fillText(n[b], g + (o[b] || 0), e + j * b)
      }
      if (m.strokeStyle !== h) {
        m.strokeText(n[b], g + (o[b] || 0), e + j * b)
      }
    }
  }
}, 1, 0, 0, 0, ["sprite.text"], 0, [Ext.draw.sprite, "Text"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Tick", Ext.draw.sprite.Line, {
  inheritableStatics: {
    def: {
      processors: {
        x: "number",
        y: "number",
        size: "number"
      },
      defaults: {
        x: 0,
        y: 0,
        size: 4
      },
      triggers: {
        x: "tick",
        y: "tick",
        size: "tick"
      },
      updaters: {
        tick: function(b) {
          var d = b.size * 1.5,
            c = b.lineWidth / 2,
            a = b.x,
            e = b.y;
          this.setAttributes({
            fromX: a - c,
            fromY: e - d,
            toX: a - c,
            toY: e + d
          })
        }
      }
    }
  }
}, 0, 0, 0, 0, ["sprite.tick"], 0, [Ext.draw.sprite, "Tick"], 0));
(Ext.cmd.derive("Ext.draw.sprite.Triangle", Ext.draw.sprite.Path, {
  inheritableStatics: {
    def: {
      processors: {
        x: "number",
        y: "number",
        size: "number"
      },
      defaults: {
        x: 0,
        y: 0,
        size: 4
      },
      triggers: {
        x: "path",
        y: "path",
        size: "path"
      }
    }
  },
  updatePath: function(d, b) {
    var c = b.size * 2.2,
      a = b.x,
      e = b.y;
    d.fromSvgString("M".concat(a, ",", e, "m0-", c * 0.58, "l", c * 0.5,
      ",", c * 0.87, "-", c, ",0z"))
  }
}, 0, 0, 0, 0, ["sprite.triangle"], 0, [Ext.draw.sprite, "Triangle"], 0));
(Ext.cmd.derive("Ext.draw.gradient.Linear", Ext.draw.gradient.Gradient, {
  type: "linear",
  config: {
    degrees: 0,
    radians: 0
  },
  applyRadians: function(b, a) {
    if (Ext.isNumber(b)) {
      return b
    }
    return a
  },
  applyDegrees: function(b, a) {
    if (Ext.isNumber(b)) {
      return b
    }
    return a
  },
  updateRadians: function(a) {
    this.setDegrees(Ext.draw.Draw.degrees(a))
  },
  updateDegrees: function(a) {
    this.setRadians(Ext.draw.Draw.rad(a))
  },
  generateGradient: function(q, o) {
    var c = this.getRadians(),
      p = Math.cos(c),
      j = Math.sin(c),
      m = o.width,
      f = o.height,
      d = o.x + m * 0.5,
      b = o.y + f * 0.5,
      n = this.getStops(),
      g = n.length,
      k, a, e;
    if (Ext.isNumber(d + b) && f > 0 && m > 0) {
      a = (Math.sqrt(f * f + m * m) * Math.abs(Math.cos(c - Math.atan(f /
        m)))) / 2;
      k = q.createLinearGradient(d + p * a, b + j * a, d - p * a, b - j *
        a);
      for (e = 0; e < g; e++) {
        k.addColorStop(n[e].offset, n[e].color)
      }
      return k
    }
    return Ext.draw.Color.NONE
  }
}, 0, 0, 0, 0, 0, 0, [Ext.draw.gradient, "Linear"], 0));
(Ext.cmd.derive("Ext.draw.gradient.Radial", Ext.draw.gradient.Gradient, {
  type: "radial",
  config: {
    start: {
      x: 0,
      y: 0,
      r: 0
    },
    end: {
      x: 0,
      y: 0,
      r: 1
    }
  },
  applyStart: function(a, b) {
    if (!b) {
      return a
    }
    var c = {
      x: b.x,
      y: b.y,
      r: b.r
    };
    if ("x" in a) {
      c.x = a.x
    } else {
      if ("centerX" in a) {
        c.x = a.centerX
      }
    }
    if ("y" in a) {
      c.y = a.y
    } else {
      if ("centerY" in a) {
        c.y = a.centerY
      }
    }
    if ("r" in a) {
      c.r = a.r
    } else {
      if ("radius" in a) {
        c.r = a.radius
      }
    }
    return c
  },
  applyEnd: function(b, a) {
    if (!a) {
      return b
    }
    var c = {
      x: a.x,
      y: a.y,
      r: a.r
    };
    if ("x" in b) {
      c.x = b.x
    } else {
      if ("centerX" in b) {
        c.x = b.centerX
      }
    }
    if ("y" in b) {
      c.y = b.y
    } else {
      if ("centerY" in b) {
        c.y = b.centerY
      }
    }
    if ("r" in b) {
      c.r = b.r
    } else {
      if ("radius" in b) {
        c.r = b.radius
      }
    }
    return c
  },
  generateGradient: function(n, m) {
    var a = this.getStart(),
      b = this.getEnd(),
      k = m.width * 0.5,
      d = m.height * 0.5,
      j = m.x + k,
      f = m.y + d,
      g = n.createRadialGradient(j + a.x * k, f + a.y * d, a.r * Math.max(
        k, d), j + b.x * k, f + b.y * d, b.r * Math.max(k, d)),
      l = this.getStops(),
      e = l.length,
      c;
    for (c = 0; c < e; c++) {
      g.addColorStop(l[c].offset, l[c].color)
    }
    return g
  }
}, 0, 0, 0, 0, 0, 0, [Ext.draw.gradient, "Radial"], 0));
(Ext.cmd.derive("Ext.draw.Surface", Ext.draw.SurfaceBase, {
  devicePixelRatio: window.devicePixelRatio || 1,
  deprecated: {
    "5.1.0": {
      statics: {
        methods: {
          stableSort: function(a) {
            return Ext.Array.sort(a, function(d, c) {
              return d.attr.zIndex - c.attr.zIndex
            })
          }
        }
      }
    }
  },
  config: {
    cls: "x-surface",
    rect: null,
    background: null,
    items: [],
    dirty: false,
    flipRtlText: false
  },
  isSurface: true,
  dirtyPredecessor: 0,
  constructor: function(a) {
    var b = this;
    b.predecessors = [];
    b.successors = [];
    b.pendingRenderFrame = false;
    b.map = {};
    Ext.draw.SurfaceBase.prototype.constructor.call(this, a);
    b.matrix = new Ext.draw.Matrix();
    b.inverseMatrix = b.matrix.inverse(b.inverseMatrix);
    b.resetTransform()
  },
  roundPixel: function(a) {
    return Math.round(this.devicePixelRatio * a) / this.devicePixelRatio
  },
  waitFor: function(a) {
    var b = this,
      c = b.predecessors;
    if (!Ext.Array.contains(c, a)) {
      c.push(a);
      a.successors.push(b);
      if (a._dirty) {
        b.dirtyPredecessor++
      }
    }
  },
  setDirty: function(d) {
    if (this._dirty !== d) {
      var c = this.successors,
        a, b, e = c.length;
      for (b = 0; b < e; b++) {
        a = c[b];
        if (d) {
          a.dirtyPredecessor++;
          a.setDirty(true)
        } else {
          a.dirtyPredecessor--;
          if (a.dirtyPredecessor === 0 && a.pendingRenderFrame) {
            a.renderFrame()
          }
        }
      }
      this._dirty = d
    }
  },
  applyElement: function(b, a) {
    if (a) {
      a.set(b)
    } else {
      a = Ext.Element.create(b)
    }
    this.setDirty(true);
    return a
  },
  applyBackground: function(a, b) {
    this.setDirty(true);
    if (Ext.isString(a)) {
      a = {
        fillStyle: a
      }
    }
    return Ext.factory(a, Ext.draw.sprite.Rect, b)
  },
  applyRect: function(a, b) {
    if (b && a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] ===
      b[3]) {
      return
    }
    if (Ext.isArray(a)) {
      return [a[0], a[1], a[2], a[3]]
    } else {
      if (Ext.isObject(a)) {
        return [a.x || a.left, a.y || a.top, a.width || (a.right - a.left),
          a.height || (a.bottom - a.top)
        ]
      }
    }
  },
  updateRect: function(i) {
    var h = this,
      c = i[0],
      f = i[1],
      g = c + i[2],
      a = f + i[3],
      e = h.getBackground(),
      d = h.element;
    d.setLocalXY(Math.floor(c), Math.floor(f));
    d.setSize(Math.ceil(g - Math.floor(c)), Math.ceil(a - Math.floor(f)));
    if (e) {
      e.setAttributes({
        x: 0,
        y: 0,
        width: Math.ceil(g - Math.floor(c)),
        height: Math.ceil(a - Math.floor(f))
      })
    }
    h.setDirty(true)
  },
  resetTransform: function() {
    this.matrix.set(1, 0, 0, 1, 0, 0);
    this.inverseMatrix.set(1, 0, 0, 1, 0, 0);
    this.setDirty(true)
  },
  get: function(a) {
    return this.map[a] || this.getItems()[a]
  },
  add: function() {
    var g = this,
      e = Array.prototype.slice.call(arguments),
      j = Ext.isArray(e[0]),
      a = g.map,
      c = [],
      f, k, h, b, d;
    f = Ext.Array.clean(j ? e[0] : e);
    if (!f.length) {
      return c
    }
    for (b = 0, d = f.length; b < d; b++) {
      k = f[b];
      h = null;
      if (k.isSprite && !a[k.getId()]) {
        h = k
      } else {
        if (!a[k.id]) {
          h = this.createItem(k)
        }
      }
      if (h) {
        a[h.getId()] = h;
        c.push(h);
        h.setParent(g);
        h.setSurface(g);
        g.onAdd(h)
      }
    }
    f = g.getItems();
    if (f) {
      f.push.apply(f, c)
    }
    g.dirtyZIndex = true;
    g.setDirty(true);
    if (!j && c.length === 1) {
      return c[0]
    } else {
      return c
    }
  },
  onAdd: Ext.emptyFn,
  remove: function(a, c) {
    var b = this,
      e, d;
    if (a) {
      if (a.charAt) {
        a = b.map[a]
      }
      if (!a || !a.isSprite) {
        return null
      }
      if (a.isDestroyed || a.isDestroying) {
        return a
      }
      e = a.getId();
      d = b.map[e];
      delete b.map[e];
      if (c) {
        a.destroy()
      }
      if (!d) {
        return a
      }
      a.setParent(null);
      a.setSurface(null);
      Ext.Array.remove(b.getItems(), a);
      b.dirtyZIndex = true;
      b.setDirty(true)
    }
    return a || null
  },
  removeAll: function(d) {
    var a = this.getItems(),
      b = a.length - 1,
      c;
    if (d) {
      for (; b >= 0; b--) {
        a[b].destroy()
      }
    } else {
      for (; b >= 0; b--) {
        c = a[b];
        c.setParent(null);
        c.setSurface(null)
      }
    }
    a.length = 0;
    this.map = {};
    this.dirtyZIndex = true
  },
  applyItems: function(a) {
    if (this.getItems()) {
      this.removeAll(true)
    }
    return Ext.Array.from(this.add(a))
  },
  createItem: function(a) {
    return Ext.create(a.xclass || "sprite." + a.type, a)
  },
  getBBox: function(f, b) {
    var f = Ext.Array.from(f),
      c = Infinity,
      h = -Infinity,
      g = Infinity,
      a = -Infinity,
      j, k, d, e;
    for (d = 0, e = f.length; d < e; d++) {
      j = f[d];
      k = j.getBBox(b);
      if (c > k.x) {
        c = k.x
      }
      if (h < k.x + k.width) {
        h = k.x + k.width
      }
      if (g > k.y) {
        g = k.y
      }
      if (a < k.y + k.height) {
        a = k.y + k.height
      }
    }
    return {
      x: c,
      y: g,
      width: h - c,
      height: a - g
    }
  },
  emptyRect: [0, 0, 0, 0],
  getEventXY: function(d) {
    var g = this,
      f = g.getInherited().rtl,
      c = d.getXY(),
      a = g.getOwnerBody(),
      i = a.getXY(),
      h = g.getRect() || g.emptyRect,
      j = [],
      b;
    if (f) {
      b = a.getWidth();
      j[0] = i[0] - c[0] - h[0] + b
    } else {
      j[0] = c[0] - i[0] - h[0]
    }
    j[1] = c[1] - i[1] - h[1];
    return j
  },
  clear: Ext.emptyFn,
  orderByZIndex: function() {
    var d = this,
      a = d.getItems(),
      e = false,
      b, c;
    if (d.getDirty()) {
      for (b = 0, c = a.length; b < c; b++) {
        if (a[b].attr.dirtyZIndex) {
          e = true;
          break
        }
      }
      if (e) {
        Ext.Array.sort(a, function(g, f) {
          return g.attr.zIndex - f.attr.zIndex
        });
        this.setDirty(true)
      }
      for (b = 0, c = a.length; b < c; b++) {
        a[b].attr.dirtyZIndex = false
      }
    }
  },
  repaint: function() {
    var a = this;
    a.repaint = Ext.emptyFn;
    Ext.defer(function() {
      delete a.repaint;
      a.element.repaint()
    }, 1)
  },
  renderFrame: function() {
    var g = this;
    if (!g.element) {
      return
    }
    if (g.dirtyPredecessor > 0) {
      g.pendingRenderFrame = true;
      return
    }
    var f = g.getRect(),
      c = g.getBackground(),
      a = g.getItems(),
      e, b, d;
    if (!f) {
      return
    }
    g.orderByZIndex();
    if (g.getDirty()) {
      g.clear();
      g.clearTransform();
      if (c) {
        g.renderSprite(c)
      }
      for (b = 0, d = a.length; b < d; b++) {
        e = a[b];
        if (g.renderSprite(e) === false) {
          return
        }
        e.attr.textPositionCount = g.textPosition
      }
      g.setDirty(false)
    }
  },
  renderSprite: Ext.emptyFn,
  clearTransform: Ext.emptyFn,
  getDirty: function() {
    return this._dirty
  },
  destroy: function() {
    var a = this;
    a.removeAll(true);
    a.setBackground(null);
    a.predecessors = null;
    a.successors = null;
    Ext.draw.SurfaceBase.prototype.destroy.call(this)
  }
}, 1, ["surface"], ["widget", "surface"], {
  widget: true,
  surface: true
}, ["widget.surface"], 0, [Ext.draw, "Surface"], 0));
(Ext.cmd.derive("Ext.draw.engine.SvgContext", Ext.Base, {
  toSave: ["strokeOpacity", "strokeStyle", "fillOpacity", "fillStyle",
    "globalAlpha", "lineWidth", "lineCap", "lineJoin", "lineDash",
    "lineDashOffset", "miterLimit", "shadowOffsetX", "shadowOffsetY",
    "shadowBlur", "shadowColor", "globalCompositeOperation", "position",
    "fillGradient", "strokeGradient"
  ],
  strokeOpacity: 1,
  strokeStyle: "none",
  fillOpacity: 1,
  fillStyle: "none",
  lineDash: [],
  lineDashOffset: 0,
  globalAlpha: 1,
  lineWidth: 1,
  lineCap: "butt",
  lineJoin: "miter",
  miterLimit: 10,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowBlur: 0,
  shadowColor: "none",
  globalCompositeOperation: "src",
  urlStringRe: /^url\(#([\w\-]+)\)$/,
  constructor: function(a) {
    this.surface = a;
    this.state = [];
    this.matrix = new Ext.draw.Matrix();
    this.path = null;
    this.clear()
  },
  clear: function() {
    this.group = this.surface.mainGroup;
    this.position = 0;
    this.path = null
  },
  getElement: function(a) {
    return this.surface.getSvgElement(this.group, a, this.position++)
  },
  removeElement: function(d) {
    var d = Ext.fly(d),
      h, g, b, f, a, e, c;
    if (!d) {
      return
    }
    if (d.dom.tagName === "g") {
      a = d.dom.gradients;
      for (c in a) {
        a[c].destroy()
      }
    } else {
      h = d.getAttribute("fill");
      g = d.getAttribute("stroke");
      b = h && h.match(this.urlStringRe);
      f = g && g.match(this.urlStringRe);
      if (b && b[1]) {
        e = Ext.fly(b[1]);
        if (e) {
          e.destroy()
        }
      }
      if (f && f[1]) {
        e = Ext.fly(f[1]);
        if (e) {
          e.destroy()
        }
      }
    }
    d.destroy()
  },
  save: function() {
    var c = this.toSave,
      e = {},
      d = this.getElement("g"),
      b, a;
    for (a = 0; a < c.length; a++) {
      b = c[a];
      if (b in this) {
        e[b] = this[b]
      }
    }
    this.position = 0;
    e.matrix = this.matrix.clone();
    this.state.push(e);
    this.group = d;
    return d
  },
  restore: function() {
    var d = this.toSave,
      e = this.state.pop(),
      c = this.group.dom.childNodes,
      b, a;
    while (c.length > this.position) {
      this.removeElement(c[c.length - 1])
    }
    for (a = 0; a < d.length; a++) {
      b = d[a];
      if (b in e) {
        this[b] = e[b]
      } else {
        delete this[b]
      }
    }
    this.setTransform.apply(this, e.matrix.elements);
    this.group = this.group.getParent()
  },
  transform: function(f, b, e, g, d, c) {
    if (this.path) {
      var a = Ext.draw.Matrix.fly([f, b, e, g, d, c]).inverse();
      this.path.transform(a)
    }
    this.matrix.append(f, b, e, g, d, c)
  },
  setTransform: function(e, a, d, f, c, b) {
    if (this.path) {
      this.path.transform(this.matrix)
    }
    this.matrix.reset();
    this.transform(e, a, d, f, c, b)
  },
  scale: function(a, b) {
    this.transform(a, 0, 0, b, 0, 0)
  },
  rotate: function(d) {
    var c = Math.cos(d),
      a = Math.sin(d),
      b = -Math.sin(d),
      e = Math.cos(d);
    this.transform(c, a, b, e, 0, 0)
  },
  translate: function(a, b) {
    this.transform(1, 0, 0, 1, a, b)
  },
  setGradientBBox: function(a) {
    this.bbox = a
  },
  beginPath: function() {
    this.path = new Ext.draw.Path()
  },
  moveTo: function(a, b) {
    if (!this.path) {
      this.beginPath()
    }
    this.path.moveTo(a, b);
    this.path.element = null
  },
  lineTo: function(a, b) {
    if (!this.path) {
      this.beginPath()
    }
    this.path.lineTo(a, b);
    this.path.element = null
  },
  rect: function(b, d, c, a) {
    this.moveTo(b, d);
    this.lineTo(b + c, d);
    this.lineTo(b + c, d + a);
    this.lineTo(b, d + a);
    this.closePath()
  },
  strokeRect: function(b, d, c, a) {
    this.beginPath();
    this.rect(b, d, c, a);
    this.stroke()
  },
  fillRect: function(b, d, c, a) {
    this.beginPath();
    this.rect(b, d, c, a);
    this.fill()
  },
  closePath: function() {
    if (!this.path) {
      this.beginPath()
    }
    this.path.closePath();
    this.path.element = null
  },
  arcSvg: function(d, a, f, g, c, b, e) {
    if (!this.path) {
      this.beginPath()
    }
    this.path.arcSvg(d, a, f, g, c, b, e);
    this.path.element = null
  },
  arc: function(b, f, a, d, c, e) {
    if (!this.path) {
      this.beginPath()
    }
    this.path.arc(b, f, a, d, c, e);
    this.path.element = null
  },
  ellipse: function(a, h, g, f, d, c, b, e) {
    if (!this.path) {
      this.beginPath()
    }
    this.path.ellipse(a, h, g, f, d, c, b, e);
    this.path.element = null
  },
  arcTo: function(b, e, a, d, g, f, c) {
    if (!this.path) {
      this.beginPath()
    }
    this.path.arcTo(b, e, a, d, g, f, c);
    this.path.element = null
  },
  bezierCurveTo: function(d, f, b, e, a, c) {
    if (!this.path) {
      this.beginPath()
    }
    this.path.bezierCurveTo(d, f, b, e, a, c);
    this.path.element = null
  },
  strokeText: function(d, a, e) {
    d = String(d);
    if (this.strokeStyle) {
      var b = this.getElement("text"),
        c = this.surface.getSvgElement(b, "tspan", 0);
      this.surface.setElementAttributes(b, {
        x: a,
        y: e,
        transform: this.matrix.toSvg(),
        stroke: this.strokeStyle,
        fill: "none",
        opacity: this.globalAlpha,
        "stroke-opacity": this.strokeOpacity,
        style: "font: " + this.font,
        "stroke-dasharray": this.lineDash.join(","),
        "stroke-dashoffset": this.lineDashOffset
      });
      if (this.lineDash.length) {
        this.surface.setElementAttributes(b, {
          "stroke-dasharray": this.lineDash.join(","),
          "stroke-dashoffset": this.lineDashOffset
        })
      }
      if (c.dom.firstChild) {
        c.dom.removeChild(c.dom.firstChild)
      }
      this.surface.setElementAttributes(c, {
        "alignment-baseline": "alphabetic"
      });
      c.dom.appendChild(document.createTextNode(Ext.String.htmlDecode(d)))
    }
  },
  fillText: function(d, a, e) {
    d = String(d);
    if (this.fillStyle) {
      var b = this.getElement("text"),
        c = this.surface.getSvgElement(b, "tspan", 0);
      this.surface.setElementAttributes(b, {
        x: a,
        y: e,
        transform: this.matrix.toSvg(),
        fill: this.fillStyle,
        opacity: this.globalAlpha,
        "fill-opacity": this.fillOpacity,
        style: "font: " + this.font
      });
      if (c.dom.firstChild) {
        c.dom.removeChild(c.dom.firstChild)
      }
      this.surface.setElementAttributes(c, {
        "alignment-baseline": "alphabetic"
      });
      c.dom.appendChild(document.createTextNode(Ext.String.htmlDecode(d)))
    }
  },
  drawImage: function(c, k, i, l, e, p, n, a, g) {
    var f = this,
      d = f.getElement("image"),
      j = k,
      h = i,
      b = typeof l === "undefined" ? c.width : l,
      m = typeof e === "undefined" ? c.height : e,
      o = null;
    if (typeof g !== "undefined") {
      o = k + " " + i + " " + l + " " + e;
      j = p;
      h = n;
      b = a;
      m = g
    }
    d.dom.setAttributeNS("http://www.w3.org/1999/xlink", "href", c.src);
    f.surface.setElementAttributes(d, {
      viewBox: o,
      x: j,
      y: h,
      width: b,
      height: m,
      opacity: f.globalAlpha,
      transform: f.matrix.toSvg()
    })
  },
  fill: function() {
    if (!this.path) {
      return
    }
    if (this.fillStyle) {
      var c, a = this.fillGradient,
        d = this.bbox,
        b = this.path.element;
      if (!b) {
        c = this.path.toString();
        b = this.path.element = this.getElement("path");
        this.surface.setElementAttributes(b, {
          d: c,
          transform: this.matrix.toSvg()
        })
      }
      this.surface.setElementAttributes(b, {
        fill: a && d ? a.generateGradient(this, d) : this.fillStyle,
        "fill-opacity": this.fillOpacity * this.globalAlpha
      })
    }
  },
  stroke: function() {
    if (!this.path) {
      return
    }
    if (this.strokeStyle) {
      var c, b = this.strokeGradient,
        d = this.bbox,
        a = this.path.element;
      if (!a || !this.path.svgString) {
        c = this.path.toString();
        if (!c) {
          return
        }
        a = this.path.element = this.getElement("path");
        this.surface.setElementAttributes(a, {
          fill: "none",
          d: c,
          transform: this.matrix.toSvg()
        })
      }
      this.surface.setElementAttributes(a, {
        stroke: b && d ? b.generateGradient(this, d) : this.strokeStyle,
        "stroke-linecap": this.lineCap,
        "stroke-linejoin": this.lineJoin,
        "stroke-width": this.lineWidth,
        "stroke-opacity": this.strokeOpacity * this.globalAlpha,
        "stroke-dasharray": this.lineDash.join(","),
        "stroke-dashoffset": this.lineDashOffset
      });
      if (this.lineDash.length) {
        this.surface.setElementAttributes(a, {
          "stroke-dasharray": this.lineDash.join(","),
          "stroke-dashoffset": this.lineDashOffset
        })
      }
    }
  },
  fillStroke: function(a, e) {
    var b = this,
      d = b.fillStyle,
      g = b.strokeStyle,
      c = b.fillOpacity,
      f = b.strokeOpacity;
    if (e === undefined) {
      e = a.transformFillStroke
    }
    if (!e) {
      a.inverseMatrix.toContext(b)
    }
    if (d && c !== 0) {
      b.fill()
    }
    if (g && f !== 0) {
      b.stroke()
    }
  },
  appendPath: function(a) {
    this.path = a.clone()
  },
  setLineDash: function(a) {
    this.lineDash = a
  },
  getLineDash: function() {
    return this.lineDash
  },
  createLinearGradient: function(d, g, b, e) {
    var f = this,
      c = f.surface.getNextDef("linearGradient"),
      a = f.group.dom.gradients || (f.group.dom.gradients = {}),
      h;
    f.surface.setElementAttributes(c, {
      x1: d,
      y1: g,
      x2: b,
      y2: e,
      gradientUnits: "userSpaceOnUse"
    });
    h = new Ext.draw.engine.SvgContext.Gradient(f, f.surface, c);
    a[c.dom.id] = h;
    return h
  },
  createRadialGradient: function(b, j, d, a, i, c) {
    var g = this,
      e = g.surface.getNextDef("radialGradient"),
      f = g.group.dom.gradients || (g.group.dom.gradients = {}),
      h;
    g.surface.setElementAttributes(e, {
      fx: b,
      fy: j,
      cx: a,
      cy: i,
      r: c,
      gradientUnits: "userSpaceOnUse"
    });
    h = new Ext.draw.engine.SvgContext.Gradient(g, g.surface, e, d / c);
    f[e.dom.id] = h;
    return h
  }
}, 1, 0, 0, 0, 0, 0, [Ext.draw.engine, "SvgContext"], 0));
(Ext.cmd.derive("Ext.draw.engine.SvgContext.Gradient", Ext.Base, {
  statics: {
    map: {}
  },
  constructor: function(c, a, d, b) {
    var f = this.statics().map,
      e;
    e = f[d.dom.id];
    if (e) {
      e.element = null
    }
    f[d.dom.id] = this;
    this.ctx = c;
    this.surface = a;
    this.element = d;
    this.position = 0;
    this.compression = b || 0
  },
  addColorStop: function(d, b) {
    var c = this.surface.getSvgElement(this.element, "stop", this.position++),
      a = this.compression;
    this.surface.setElementAttributes(c, {
      offset: (((1 - a) * d + a) * 100).toFixed(2) + "%",
      "stop-color": b,
      "stop-opacity": Ext.draw.Color.fly(b).a.toFixed(15)
    })
  },
  toString: function() {
    var a = this.element.dom.childNodes;
    while (a.length > this.position) {
      Ext.fly(a[a.length - 1]).destroy()
    }
    return "url(#" + this.element.getId() + ")"
  },
  destroy: function() {
    var b = this.statics().map,
      a = this.element;
    if (a && a.dom) {
      delete b[a.dom.id];
      a.destroy()
    }
    this.callParent()
  }
}, 3, 0, 0, 0, 0, 0, [Ext.draw.engine.SvgContext, "Gradient"], 0));
(Ext.cmd.derive("Ext.draw.engine.Svg", Ext.draw.Surface, {
  statics: {
    BBoxTextCache: {}
  },
  config: {
    highPrecision: false
  },
  getElementConfig: function() {
    return {
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
        },
        children: [{
          tag: "svg",
          reference: "svgElement",
          namespace: "http://www.w3.org/2000/svg",
          width: "100%",
          height: "100%",
          version: 1.1
        }]
      }]
    }
  },
  constructor: function(a) {
    var b = this;
    Ext.draw.Surface.prototype.constructor.call(this, a);
    b.mainGroup = b.createSvgNode("g");
    b.defElement = b.createSvgNode("defs");
    b.svgElement.appendChild(b.mainGroup);
    b.svgElement.appendChild(b.defElement);
    b.ctx = new Ext.draw.engine.SvgContext(b)
  },
  createSvgNode: function(a) {
    var b = document.createElementNS("http://www.w3.org/2000/svg", a);
    return Ext.get(b)
  },
  getSvgElement: function(d, b, a) {
    var c;
    if (d.dom.childNodes.length > a) {
      c = d.dom.childNodes[a];
      if (c.tagName === b) {
        return Ext.get(c)
      } else {
        Ext.destroy(c)
      }
    }
    c = Ext.get(this.createSvgNode(b));
    if (a === 0) {
      d.insertFirst(c)
    } else {
      c.insertAfter(Ext.fly(d.dom.childNodes[a - 1]))
    }
    c.cache = {};
    return c
  },
  setElementAttributes: function(d, b) {
    var f = d.dom,
      a = d.cache,
      c, e;
    for (c in b) {
      e = b[c];
      if (a[c] !== e) {
        a[c] = e;
        f.setAttribute(c, e)
      }
    }
  },
  getNextDef: function(a) {
    return this.getSvgElement(this.defElement, a, this.defPosition++)
  },
  clearTransform: function() {
    var a = this;
    a.mainGroup.set({
      transform: a.matrix.toSvg()
    })
  },
  clear: function() {
    this.ctx.clear();
    this.defPosition = 0
  },
  renderSprite: function(b) {
    var d = this,
      c = d.getRect(),
      a = d.ctx;
    if (b.attr.hidden || b.attr.opacity === 0) {
      a.save();
      a.restore();
      return
    }
    b.element = a.save();
    b.preRender(this);
    b.useAttributes(a, c);
    if (false === b.render(this, a, [0, 0, c[2], c[3]])) {
      return false
    }
    b.setDirty(false);
    a.restore()
  },
  flatten: function(e, b) {
    var c = '<?xml version="1.0" standalone="yes"?>',
      f = Ext.getClassName(this),
      a, g, d;
    c +=
      '<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" width="' +
      e.width + '" height="' + e.height + '">';
    for (d = 0; d < b.length; d++) {
      a = b[d];
      if (Ext.getClassName(a) !== f) {
        continue
      }
      g = a.getRect();
      c += '<g transform="translate(' + g[0] + "," + g[1] + ')">';
      c += this.serializeNode(a.svgElement.dom);
      c += "</g>"
    }
    c += "</svg>";
    return {
      data: "data:image/svg+xml;utf8," + encodeURIComponent(c),
      type: "svg"
    }
  },
  serializeNode: function(d) {
    var b = "",
      c, f, a, e;
    if (d.nodeType === document.TEXT_NODE) {
      return d.nodeValue
    }
    b += "<" + d.nodeName;
    if (d.attributes.length) {
      for (c = 0, f = d.attributes.length; c < f; c++) {
        a = d.attributes[c];
        b += " " + a.name + '="' + a.value + '"'
      }
    }
    b += ">";
    if (d.childNodes && d.childNodes.length) {
      for (c = 0, f = d.childNodes.length; c < f; c++) {
        e = d.childNodes[c];
        b += this.serializeNode(e)
      }
    }
    b += "</" + d.nodeName + ">";
    return b
  },
  destroy: function() {
    var a = this;
    a.ctx.destroy();
    a.mainGroup.destroy();
    delete a.mainGroup;
    delete a.ctx;
    Ext.draw.Surface.prototype.destroy.call(this)
  },
  remove: function(a, b) {
    if (a && a.element) {
      if (this.ctx) {
        this.ctx.removeElement(a.element)
      } else {
        a.element.destroy()
      }
      a.element = null
    }
    Ext.draw.Surface.prototype.remove.apply(this, arguments)
  }
}, 1, 0, ["widget", "surface"], {
  widget: true,
  surface: true
}, 0, 0, [Ext.draw.engine, "Svg"], 0));
Ext.draw || (Ext.draw = {});
Ext.draw.engine || (Ext.draw.engine = {});
Ext.draw.engine.excanvas = true;