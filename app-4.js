
(Ext.cmd.derive("Ext.grid.CellContext", Ext.Base, {
  isCellContext: true,
  constructor: function(a) {
    this.view = a
  },
  setPosition: function(c, a) {
    var b = this;
    if (arguments.length === 1) {
      if (c.length) {
        a = c[0];
        c = c[1]
      } else {
        if (c.isCellContext) {
          return b.setAll(c.view, c.rowIdx, c.colIdx, c.record, c.columnHeader)
        } else {
          if (c.view) {
            b.view = c.view
          }
          a = c.column;
          c = c.row
        }
      }
    }
    b.setRow(c);
    b.setColumn(a);
    return b
  },
  setAll: function(b, c, d, a, f) {
    var e = this;
    e.view = b;
    e.rowIdx = c;
    e.colIdx = d;
    e.record = a;
    e.column = f;
    return e
  },
  setRow: function(c) {
    var a = this,
      b = a.view.dataSource;
    if (c !== undefined) {
      if (typeof c === "number") {
        a.rowIdx = Math.max(Math.min(c, b.getCount() - 1), 0);
        a.record = b.getAt(c)
      } else {
        if (c.isModel) {
          a.record = c;
          a.rowIdx = b.indexOf(c)
        } else {
          if (c.tagName || c.isElement) {
            a.record = a.view.getRecord(c);
            a.rowIdx = b.indexOf(a.record)
          }
        }
      }
    }
    return a
  },
  setColumn: function(a) {
    var c = this,
      b = c.view.getVisibleColumnManager();
    if (a !== undefined) {
      if (typeof a === "number") {
        c.colIdx = a;
        c.column = b.getHeaderAtIndex(a)
      } else {
        if (a.isHeader) {
          c.column = a;
          c.colIdx = b.indexOf(a)
        }
      }
    }
    return c
  },
  getCell: function(a) {
    return this.view.getCellByPosition(this, a)
  },
  getRow: function(b) {
    var a = this.view.getRow(this.record);
    return b ? a : Ext.get(a)
  },
  getNode: function(b) {
    var a = this.view.getNode(this.record);
    return b ? a : Ext.get(a)
  },
  isEqual: function(a) {
    return (a && a.isCellContext && a.record === this.record && a.column ===
      this.column)
  },
  clone: function() {
    var b = this,
      a = new b.self(b.view);
    a.rowIdx = b.rowIdx;
    a.colIdx = b.colIdx;
    a.record = b.record;
    a.column = b.column;
    return a
  },
  privates: {
    isFirstColumn: function() {
      var a = this.getCell(true);
      if (a) {
        return !a.previousSibling
      }
    },
    isLastColumn: function() {
      var a = this.getCell(true);
      if (a) {
        return !a.nextSibling
      }
    },
    getLastColumnIndex: function() {
      var a = this.getRow(true);
      if (a) {
        return a.lastChild.cellIndex
      }
      return -1
    },
    navigate: function(c) {
      var b = this,
        a = b.view.getVisibleColumnManager().getColumns();
      switch (c) {
        case -1:
          do {
            if (!b.colIdx) {
              b.colIdx = a.length - 1
            } else {
              b.colIdx--
            }
            b.setColumn(b.colIdx)
          } while (!b.getCell(true));
          break;
        case 1:
          do {
            if (b.colIdx >= a.length) {
              b.colIdx = 0
            } else {
              b.colIdx++
            }
            b.setColumn(b.colIdx)
          } while (!b.getCell(true));
          break
      }
    }
  },
  statics: {
    compare: function(b, a) {
      return b.rowIdx - a.rowIdx || b.colIdx - a.colIdx
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.grid, "CellContext"], 0));
(Ext.cmd.derive("Ext.grid.ColumnComponentLayout", Ext.layout.component.Auto, {
  type: "columncomponent",
  setWidthInDom: true,
  _paddingReset: {
    paddingTop: "",
    paddingBottom: ""
  },
  columnAutoCls: "x-column-header-text-container-auto",
  beginLayout: function(a) {
    Ext.layout.component.Auto.prototype.beginLayout.apply(this, arguments);
    a.titleContext = a.getEl("titleEl")
  },
  beginLayoutCycle: function(c) {
    var b = this,
      a = b.owner,
      d = c.widthModel.shrinkWrap;
    Ext.layout.component.Auto.prototype.beginLayoutCycle.apply(this,
      arguments);
    if (d) {
      a.el.setWidth("")
    }
    a.textContainerEl[d ? "addCls" : "removeCls"](b.columnAutoCls);
    a.titleEl.setStyle(b._paddingReset)
  },
  publishInnerHeight: function(d, c) {
    var b = this,
      a = b.owner,
      e;
    if (a.getRootHeaderCt().hiddenHeaders) {
      d.setProp("innerHeight", 0);
      return
    }
    if (!d.hasRawContent) {
      if (a.headerWrap && !d.hasDomProp("width")) {
        b.done = false;
        return
      }
      e = c - d.getBorderInfo().height;
      d.setProp("innerHeight", e - a.titleEl.getHeight(), false)
    }
  },
  measureContentHeight: function(a) {
    return a.el.dom.offsetHeight
  },
  publishInnerWidth: function(a, b) {
    if (!a.hasRawContent) {
      a.setProp("innerWidth", b - a.getBorderInfo().width, false)
    }
  },
  calculateOwnerHeightFromContentHeight: function(d, c) {
    var b = Ext.layout.component.Auto.prototype.calculateOwnerHeightFromContentHeight
      .apply(this, arguments),
      a = this.owner;
    if (!d.hasRawContent) {
      if (!a.headerWrap || d.hasDomProp("width")) {
        return c + a.titleEl.getHeight() + d.getBorderInfo().height
      }
      return null
    }
    return b
  },
  calculateOwnerWidthFromContentWidth: function(f, b) {
    var a = this.owner,
      e = f.getPaddingInfo().width,
      d = this.getTriggerOffset(a, f),
      c;
    if (a.isGroupHeader) {
      c = b
    } else {
      c = Math.max(b, a.textEl.getWidth() + f.titleContext.getPaddingInfo()
        .width)
    }
    return c + e + d
  },
  getTriggerOffset: function(a, c) {
    var b = 0;
    if (c.widthModel.shrinkWrap && !a.menuDisabled) {
      if (a.query(">:not([hidden])").length === 0) {
        b = a.getTriggerElWidth()
      }
    }
    return b
  }
}, 0, 0, 0, 0, ["layout.columncomponent"], 0, [Ext.grid,
  "ColumnComponentLayout"
], 0));
(Ext.cmd.derive("Ext.layout.container.Fit", Ext.layout.container.Container, {
  alternateClassName: "Ext.layout.FitLayout",
  itemCls: "x-fit-item",
  type: "fit",
  manageMargins: true,
  sizePolicies: {
    0: {
      readsWidth: 1,
      readsHeight: 1,
      setsWidth: 0,
      setsHeight: 0
    },
    1: {
      readsWidth: 0,
      readsHeight: 1,
      setsWidth: 1,
      setsHeight: 0
    },
    2: {
      readsWidth: 1,
      readsHeight: 0,
      setsWidth: 0,
      setsHeight: 1
    },
    3: {
      readsWidth: 0,
      readsHeight: 0,
      setsWidth: 1,
      setsHeight: 1
    }
  },
  getItemSizePolicy: function(b, c) {
    var a = c || this.owner.getSizeModel(),
      d = (a.width.shrinkWrap ? 0 : 1) | (a.height.shrinkWrap ? 0 : 2);
    return this.sizePolicies[d]
  },
  beginLayoutCycle: function(j, f) {
    var s = this,
      t = s.lastHeightModel && s.lastHeightModel.calculated,
      g = s.lastWidthModel && s.lastWidthModel.calculated,
      n = g || t,
      k = 0,
      l = 0,
      r, b, o, q, e, a, h, m, p, d;
    Ext.layout.container.Container.prototype.beginLayoutCycle.apply(this,
      arguments);
    if (n && j.targetContext.el.dom.tagName.toUpperCase() !== "TD") {
      n = g = t = false
    }
    b = j.childItems;
    e = b.length;
    for (o = 0; o < e; ++o) {
      q = b[o];
      if (f) {
        r = q.target;
        h = r.minHeight;
        m = r.minWidth;
        if (m || h) {
          a = q.marginInfo || q.getMarginInfo();
          h += a.height;
          m += a.height;
          if (k < h) {
            k = h
          }
          if (l < m) {
            l = m
          }
        }
      }
      if (n) {
        p = q.el.dom.style;
        if (t) {
          p.height = ""
        }
        if (g) {
          p.width = ""
        }
      }
    }
    if (f) {
      j.maxChildMinHeight = k;
      j.maxChildMinWidth = l
    }
    r = j.target;
    j.overflowX = (!j.widthModel.shrinkWrap && j.maxChildMinWidth && r.scrollFlags
      .x) || d;
    j.overflowY = (!j.heightModel.shrinkWrap && j.maxChildMinHeight && r.scrollFlags
      .y) || d
  },
  calculate: function(f) {
    var n = this,
      k = f.childItems,
      d = k.length,
      c = n.getContainerSize(f),
      e = {
        length: d,
        ownerContext: f,
        targetSize: c
      },
      q = f.widthModel.shrinkWrap,
      l = f.heightModel.shrinkWrap,
      j = f.overflowX,
      g = f.overflowY,
      m, b, o, h, a, p;
    f.state.info = e;
    if (j || g) {
      m = n.getScrollbarsNeeded(j && c.width, g && c.height, f.maxChildMinWidth,
        f.maxChildMinHeight);
      if (m) {
        b = Ext.getScrollbarSize();
        if (m & 1) {
          c.height -= b.height
        }
        if (m & 2) {
          c.width -= b.width
        }
      }
    }
    if (d > 0) {
      for (h = 0; h < d; ++h) {
        e.index = h;
        n.fitItem(k[h], e)
      }
    } else {
      e.contentWidth = e.contentHeight = 0
    }
    if (l || q) {
      o = f.targetContext.getPaddingInfo();
      if (q) {
        if (g && !c.gotHeight) {
          n.done = false
        } else {
          a = e.contentWidth + o.width;
          if (m & 2) {
            a += b.width
          }
          if (!f.setContentWidth(a)) {
            n.done = false
          }
        }
      }
      if (l) {
        if (j && !c.gotWidth) {
          n.done = false
        } else {
          p = e.contentHeight + o.height;
          if (m & 1) {
            p += b.height
          }
          if (!f.setContentHeight(p)) {
            n.done = false
          }
        }
      }
    }
  },
  fitItem: function(b, c) {
    var a = this;
    if (b.invalid) {
      a.done = false;
      return
    }
    c.margins = b.getMarginInfo();
    c.needed = c.got = 0;
    a.fitItemWidth(b, c);
    a.fitItemHeight(b, c);
    if (c.got !== c.needed) {
      a.done = false
    }
  },
  fitItemWidth: function(c, d) {
    var a, b;
    if (d.ownerContext.widthModel.shrinkWrap) {
      b = c.getProp("width") + d.margins.width;
      a = d.contentWidth;
      if (a === undefined) {
        d.contentWidth = b
      } else {
        d.contentWidth = Math.max(a, b)
      }
    } else {
      if (c.widthModel.calculated) {
        ++d.needed;
        if (d.targetSize.gotWidth) {
          ++d.got;
          this.setItemWidth(c, d)
        } else {
          return
        }
      }
    }
    this.positionItemX(c, d)
  },
  fitItemHeight: function(c, d) {
    var b, a;
    if (d.ownerContext.heightModel.shrinkWrap) {
      a = c.getProp("height") + d.margins.height;
      b = d.contentHeight;
      if (b === undefined) {
        d.contentHeight = a
      } else {
        d.contentHeight = Math.max(b, a)
      }
    } else {
      if (c.heightModel.calculated) {
        ++d.needed;
        if (d.targetSize.gotHeight) {
          ++d.got;
          this.setItemHeight(c, d)
        } else {
          return
        }
      }
    }
    this.positionItemY(c, d)
  },
  positionItemX: function(a, c) {
    var b = c.margins;
    if (c.index || b.left) {
      a.setProp("x", b.left)
    }
    if (b.width) {
      a.setProp("margin-right", b.width)
    }
  },
  positionItemY: function(a, c) {
    var b = c.margins;
    if (c.index || b.top) {
      a.setProp("y", b.top)
    }
    if (b.height) {
      a.setProp("margin-bottom", b.height)
    }
  },
  setItemHeight: function(a, b) {
    a.setHeight(b.targetSize.height - b.margins.height)
  },
  setItemWidth: function(a, b) {
    a.setWidth(b.targetSize.width - b.margins.width)
  }
}, 0, 0, 0, 0, ["layout.fit"], 0, [Ext.layout.container, "Fit", Ext.layout,
  "FitLayout"
], 0));
(Ext.cmd.derive("Ext.panel.Table", Ext.panel.Panel, {
  extraBaseCls: "x-grid",
  extraBodyCls: "x-grid-body",
  actionableModeCls: "x-grid-actionable",
  noHeaderBordersCls: "x-no-header-borders",
  defaultBindProperty: "store",
  layout: "fit",
  ariaRole: "grid",
  config: {
    selection: null,
    headerBorders: true
  },
  publishes: ["selection"],
  twoWayBindable: ["selection"],
  autoLoad: false,
  variableRowHeight: false,
  numFromEdge: 2,
  trailingBufferZone: 10,
  leadingBufferZone: 20,
  hasView: false,
  viewType: null,
  deferRowRender: false,
  sortableColumns: true,
  multiColumnSort: false,
  enableLocking: false,
  scrollerOwner: true,
  enableColumnMove: true,
  sealedColumns: false,
  enableColumnResize: true,
  rowLines: true,
  bufferedRenderer: true,
  ownerGrid: null,
  colLinesCls: "x-grid-with-col-lines",
  rowLinesCls: "x-grid-with-row-lines",
  noRowLinesCls: "x-grid-no-row-lines",
  hiddenHeaderCtCls: "x-grid-header-ct-hidden",
  hiddenHeaderCls: "x-grid-header-hidden",
  resizeMarkerCls: "x-grid-resize-marker",
  emptyCls: "x-grid-empty",
  focusable: true,
  constructor: function(c) {
    var d = this,
      a = c && c.ownerGrid,
      b;
    d.ownerGrid = a || d;
    d.actionables = a ? a.actionables : [];
    Ext.panel.Panel.prototype.constructor.call(this, c);
    b = d.store;
    b.trackStateChanges = true;
    if (d.autoLoad) {
      b.unblockLoad();
      if (!b.isEmptyStore) {
        b.load()
      }
    }
  },
  registerActionable: function(a) {
    Ext.Array.include(this.actionables, a)
  },
  initComponent: function() {
    var g = this,
      e = g.columns || g.colModel || [],
      j, h, d, f, k, c, b, a;
    j = g.store = Ext.data.StoreManager.lookup(g.store ||
      "ext-empty-store");
    g.enableLocking = g.enableLocking || g.hasLockedColumns(e);
    if (g.autoLoad) {
      g.store.blockLoad()
    }
    if (g.plugins) {
      g.plugins = g.constructPlugins()
    }
    if (g.columnLines) {
      g.addBodyCls(g.colLinesCls)
    }
    g.addBodyCls(g.rowLines ? g.rowLinesCls : g.noRowLinesCls);
    g.addBodyCls(g.extraBodyCls);
    if (g.enableLocking) {
      g.self.mixin("lockable", Ext.grid.locking.Lockable);
      g.injectLockable();
      a = g.headerCt
    } else {
      if (e.isRootHeader) {
        if (g.hideHeaders) {
          e.setHeight(0);
          e.hiddenHeaders = true
        }
        g.headerCt = a = e;
        a.grid = g;
        a.forceFit = !!g.forceFit;
        a.$initParent = g;
        g.columnManager = e.columnManager;
        g.visibleColumnManager = e.visibleColumnManager
      } else {
        if (Ext.isArray(e)) {
          e = {
            items: e
          }
        }
        Ext.apply(e, {
          grid: g,
          $initParent: g,
          forceFit: g.forceFit,
          sortable: g.sortableColumns,
          enableColumnMove: g.enableColumnMove,
          enableColumnResize: g.enableColumnResize,
          columnLines: g.columnLines,
          sealed: g.sealedColumns
        });
        if (g.hideHeaders) {
          e.height = 0;
          e.hiddenHeaders = true
        }
        if (Ext.isDefined(g.enableColumnHide)) {
          e.enableColumnHide = g.enableColumnHide
        }
        g.headerCt = a = new Ext.grid.header.Container(e)
      }
      a.setScrollable({
        x: false,
        y: false
      })
    }
    g.columns = c = a.getGridColumns();
    g.scrollTask = new Ext.util.DelayedTask(g.syncHorizontalScroll, g);
    g.cls = (g.cls || "") + (" " + g.extraBaseCls);
    delete g.autoScroll;
    k = g.plugins && Ext.Array.findBy(g.plugins, function(i) {
      return i.isBufferedRenderer
    });
    if (k) {
      g.bufferedRenderer = k
    }
    if (!g.hasView) {
      if (j.isBufferedStore && !j.getRemoteSort()) {
        for (d = 0, f = c.length; d < f; d++) {
          c[d].sortable = false
        }
      }
      if (g.hideHeaders) {
        g.headerCt.addCls(g.hiddenHeaderCtCls);
        g.addCls(g.hiddenHeaderCls)
      }
      g.relayHeaderCtEvents(a);
      g.features = g.features || [];
      if (!Ext.isArray(g.features)) {
        g.features = [g.features]
      }
      g.dockedItems = [].concat(g.dockedItems || []);
      g.dockedItems.unshift(a);
      g.viewConfig = g.viewConfig || {};
      h = g.getView();
      g.items = [h];
      g.hasView = true;
      if (!g.hideHeaders) {
        b = h.getScrollable();
        if (b) {
          a.getScrollable().addPartner(b, "x")
        }
      }
      g.bindStore(j, true);
      g.mon(h, {
        viewready: g.onViewReady,
        refresh: g.onRestoreHorzScroll,
        scope: g
      })
    }
    g.selModel = g.view.getSelectionModel();
    if (g.selModel.isRowModel) {
      g.selModel.on({
        scope: g,
        lastselectedchanged: g.updateBindSelection,
        selectionchange: g.updateBindSelection
      })
    }
    g.relayEvents(g.view, ["beforeitemmousedown", "beforeitemmouseup",
      "beforeitemmouseenter", "beforeitemmouseleave",
      "beforeitemclick", "beforeitemdblclick",
      "beforeitemcontextmenu", "itemmousedown", "itemmouseup",
      "itemmouseenter", "itemmouseleave", "itemclick", "itemdblclick",
      "itemcontextmenu", "beforecellclick", "cellclick",
      "beforecelldblclick", "celldblclick", "beforecellcontextmenu",
      "cellcontextmenu", "beforecellmousedown", "cellmousedown",
      "beforecellmouseup", "cellmouseup", "beforecellkeydown",
      "cellkeydown", "rowclick", "rowdblclick", "rowcontextmenu",
      "rowmousedown", "rowmouseup", "rowkeydown", "beforeitemkeydown",
      "itemkeydown", "beforeitemkeyup", "itemkeyup",
      "beforeitemkeypress", "itemkeypress",
      "beforecontainermousedown", "beforecontainermouseup",
      "beforecontainermouseover", "beforecontainermouseout",
      "beforecontainerclick", "beforecontainerdblclick",
      "beforecontainercontextmenu", "beforecontainerkeydown",
      "beforecontainerkeyup", "beforecontainerkeypress",
      "containermouseup", "containermousedown", "containermouseover",
      "containermouseout", "containerclick", "containerdblclick",
      "containercontextmenu", "containerkeydown", "containerkeyup",
      "containerkeypress", "selectionchange", "beforeselect",
      "select", "beforedeselect", "deselect"
    ]);
    Ext.panel.Panel.prototype.initComponent.call(this);
    if (g.enableLocking) {
      g.afterInjectLockable()
    } else {
      delete a.$initParent
    }
    g.addStateEvents(["columnresize", "columnmove", "columnhide",
      "columnshow", "sortchange", "filterchange", "groupchange"
    ])
  },
  beforeRender: function() {
    var b = this,
      c = b.bufferedRenderer,
      a;
    if (b.lockable) {
      b.getProtoBody().addCls(b.lockingBodyCls)
    } else {
      if (c && b.getSizeModel().height.auto) {
        b.bufferedRenderer = c = false
      }
      if (c && !c.isBufferedRenderer) {
        c = {
          xclass: "Ext.grid.plugin.BufferedRenderer"
        };
        Ext.copyTo(c, b,
          "variableRowHeight,numFromEdge,trailingBufferZone,leadingBufferZone,scrollToLoadBuffer"
        );
        b.bufferedRenderer = b.addPlugin(c)
      }
      a = b.ariaRenderAttributes || (b.ariaRenderAttributes = {});
      a["aria-readonly"] = !b.isEditable;
      a["aria-multiselectable"] = b.selModel.selectionMode !== "SINGLE"
    }
    Ext.panel.Panel.prototype.beforeRender.apply(this, arguments)
  },
  onRender: function() {
    var b = this,
      a, c;
    if (b.isLocked && b.getSizeModel().width.shrinkWrap) {
      b.shrinkWrapColumns = true;
      c = b.headerCt.getTableWidth();
      a = b.gridPanelBorderWidth || (b.gridPanelBorderWidth = b.el.getBorderWidth(
        "lr"));
      b.width = c + a
    }
    Ext.panel.Panel.prototype.onRender.call(this)
  },
  getHeaderContainer: function() {
    return this.getView().getHeaderCt()
  },
  getColumns: function() {
    return this.getColumnManager().getColumns()
  },
  getVisibleColumns: function() {
    return this.getVisibleColumnManager().getColumns()
  },
  focus: function() {
    this.getView().focus()
  },
  disableColumnHeaders: function() {
    this.headerCt.disable()
  },
  enableColumnHeaders: function() {
    this.headerCt.enable()
  },
  hasLockedColumns: function(c) {
    var b, a, d;
    if (c.isRootHeader) {
      c = c.items.items
    } else {
      if (Ext.isObject(c)) {
        c = c.items
      }
    }
    for (b = 0, a = c.length; b < a; b++) {
      d = c[b];
      if (!d.processed && d.locked) {
        return true
      }
    }
  },
  relayHeaderCtEvents: function(a) {
    this.relayEvents(a, ["columnresize", "columnmove", "columnhide",
      "columnshow", "columnschanged", "sortchange", "headerclick",
      "headercontextmenu", "headertriggerclick"
    ])
  },
  getState: function() {
    var b = this,
      c = Ext.panel.Panel.prototype.getState.call(this),
      a = b.store.getState();
    c = b.addPropertyToState(c, "columns", b.headerCt.getColumnsState());
    if (a) {
      c.storeState = a
    }
    return c
  },
  applyState: function(e) {
    var d = this,
      f = e.sort,
      a = e.storeState,
      b = d.store,
      c = e.columns;
    delete e.columns;
    Ext.panel.Panel.prototype.applyState.apply(this, arguments);
    if (c) {
      d.headerCt.applyColumnsState(c)
    }
    if (f) {
      if (b.getRemoteSort()) {
        b.sort({
          property: f.property,
          direction: f.direction,
          root: f.root
        }, null, false)
      } else {
        b.sort(f.property, f.direction)
      }
    } else {
      if (a) {
        b.applyState(a)
      }
    }
  },
  getStore: function() {
    return this.store
  },
  getView: function() {
    var c = this,
      a, d, b;
    if (!c.view) {
      b = c.viewConfig;
      a = b.scroll || c.scroll;
      d = c.scrollable;
      if (d == null && b.scrollable == null && a !== null) {
        if (a === true || a === "both") {
          d = true
        } else {
          if (a === false || a === "none") {
            d = false
          } else {
            if (a === "vertical") {
              d = {
                x: false,
                y: true
              }
            } else {
              if (a === "horizontal") {
                d = {
                  x: true,
                  y: false
                }
              }
            }
          }
        }
      }
      b = Ext.apply({
        grid: c,
        ownerGrid: c.ownerGrid,
        deferInitialRefresh: c.deferRowRender,
        variableRowHeight: c.variableRowHeight,
        preserveScrollOnRefresh: true,
        trackOver: c.trackMouseOver !== false,
        throttledUpdate: c.throttledUpdate === true,
        xtype: c.viewType,
        store: c.store,
        headerCt: c.headerCt,
        columnLines: c.columnLines,
        rowLines: c.rowLines,
        navigationModel: "grid",
        features: c.features,
        panel: c,
        emptyText: c.emptyText || ""
      }, c.viewConfig);
      if (d != null) {
        b.scrollable = d;
        c.scrollable = null
      }
      Ext.create(b);
      if (c.view.emptyText) {
        c.view.emptyText = '<div class="' + c.emptyCls + '">' + c.view.emptyText +
          "</div>"
      }
      c.view.getComponentLayout().headerCt = c.headerCt;
      c.mon(c.view, {
        uievent: c.processEvent,
        scope: c
      });
      c.headerCt.view = c.view;
      if (c.hasListeners.viewcreated) {
        c.fireEvent("viewcreated", c, c.view)
      }
    }
    return c.view
  },
  getColumnManager: function() {
    return this.columnManager
  },
  getVisibleColumnManager: function() {
    return this.visibleColumnManager
  },
  getTopLevelColumnManager: function() {
    return this.ownerGrid.getColumnManager()
  },
  getTopLevelVisibleColumnManager: function() {
    return this.ownerGrid.getVisibleColumnManager()
  },
  setAutoScroll: Ext.emptyFn,
  applyScrollable: function(a) {
    if (this.view) {
      this.view.setScrollable(a)
    }
    return a
  },
  getScrollable: function() {
    return null
  },
  processEvent: function(f, h, i, a, g, d, c, j) {
    var b = d.position.column;
    if (b) {
      return b.processEvent.apply(b, arguments)
    }
  },
  ensureVisible: function(a, b) {
    this.doEnsureVisible(a, b)
  },
  scrollByDeltaY: function(b, a) {
    this.getView().scrollBy(0, b, a)
  },
  scrollByDeltaX: function(b, a) {
    this.getView().scrollBy(b, 0, a)
  },
  afterCollapse: function() {
    this.saveScrollPos();
    Ext.panel.Panel.prototype.afterCollapse.apply(this, arguments)
  },
  afterExpand: function() {
    Ext.panel.Panel.prototype.afterExpand.apply(this, arguments);
    this.restoreScrollPos()
  },
  saveScrollPos: Ext.emptyFn,
  restoreScrollPos: Ext.emptyFn,
  onHeaderResize: function() {
    var a = this.view.getScrollable(),
      b;
    if (a && a.isTouchScroller) {
      b = a.getSize();
      if (b) {
        a.setSize({
          x: this.headerCt.getTableWidth(),
          y: b.y
        })
      }
    }
  },
  onHeaderMove: function(e, f, a, b, d) {
    var c = this;
    if (c.optimizedColumnMove === false) {
      c.view.refreshView()
    } else {
      c.view.moveColumn(b, d, a)
    }
    c.delayScroll()
  },
  onHeaderHide: function(b, c) {
    var a = this.view;
    if (!b.childHideCount && a.refreshCounter) {
      a.refreshView()
    }
  },
  onHeaderShow: function(b, c) {
    var a = this.view;
    if (a.refreshCounter) {
      a.refreshView()
    }
  },
  onHeadersChanged: function(b, c) {
    var a = this;
    if (a.rendered && !a.reconfiguring) {
      a.view.refreshView();
      a.delayScroll()
    }
  },
  delayScroll: function() {
    var a = this.view;
    if (a) {
      this.scrollTask.delay(10, null, null, [a])
    }
  },
  onViewReady: function() {
    this.fireEvent("viewready", this)
  },
  onRestoreHorzScroll: function() {
    var b = this,
      a = b.scrollXPos;
    if (a) {
      b.syncHorizontalScroll(b, true)
    }
  },
  getScrollerOwner: function() {
    var a = this;
    if (!this.scrollerOwner) {
      a = this.up("[scrollerOwner]")
    }
    return a
  },
  getLhsMarker: function() {
    var a = this;
    return a.lhsMarker || (a.lhsMarker = Ext.DomHelper.append(a.el, {
      role: "presentation",
      cls: a.resizeMarkerCls
    }, true))
  },
  getRhsMarker: function() {
    var a = this;
    return a.rhsMarker || (a.rhsMarker = Ext.DomHelper.append(a.el, {
      role: "presentation",
      cls: a.resizeMarkerCls
    }, true))
  },
  getSelection: function() {
    return this.getSelectionModel().getSelection()
  },
  updateSelection: function(a) {
    var b = this,
      c;
    if (!b.ignoreNextSelection) {
      b.ignoreNextSelection = true;
      c = b.getSelectionModel();
      if (a) {
        c.select(a)
      } else {
        c.deselectAll()
      }
      b.ignoreNextSelection = false
    }
  },
  updateBindSelection: function(a, c) {
    var d = this,
      b = null;
    if (!d.ignoreNextSelection) {
      d.ignoreNextSelection = true;
      if (c.length) {
        b = a.getLastSelected();
        d.hasHadSelection = true
      }
      if (d.hasHadSelection) {
        d.setSelection(b)
      }
      d.ignoreNextSelection = false
    }
  },
  updateHeaderBorders: function(a) {
    this[a ? "removeCls" : "addCls"](this.noHeaderBordersCls)
  },
  getNavigationModel: function() {
    return this.getView().getNavigationModel()
  },
  getSelectionModel: function() {
    return this.getView().getSelectionModel()
  },
  getScrollTarget: function() {
    var a = this.getScrollerOwner().query("tableview");
    return a[a.length - 1]
  },
  syncHorizontalScroll: function(e, c) {
    var d = this,
      a = d.view.getScrollX(),
      b;
    c = c === true;
    if (d.rendered && (c || a !== d.scrollXPos)) {
      if (c) {
        b = d.getScrollTarget();
        b.setScrollX(a)
      }
      d.headerCt.setScrollX(a);
      d.scrollXPos = a
    }
  },
  onStoreLoad: Ext.emptyFn,
  getEditorParent: function() {
    return this.body
  },
  bindStore: function(b, c) {
    var d = this,
      a = d.getView();
    if (b) {
      d.store = b;
      if (a.store !== b) {
        a.bindStore(b, false)
      }
      d.mon(b, {
        load: d.onStoreLoad,
        scope: d
      });
      d.storeRelayers = d.relayEvents(b, ["filterchange", "groupchange"])
    } else {
      d.unbindStore()
    }
  },
  unbindStore: function() {
    var c = this,
      b = c.store,
      a;
    if (b) {
      c.store = null;
      c.mun(b, {
        load: c.onStoreLoad,
        scope: c
      });
      Ext.destroy(c.storeRelayers);
      a = c.view;
      if (a.store) {
        a.bindStore(null)
      }
    }
  },
  setColumns: function(a) {
    if (a.length || this.getColumnManager().getColumns().length) {
      this.reconfigure(undefined, a)
    }
  },
  setStore: function(a) {
    this.reconfigure(a);
    if (this.autoLoad && !(a.loading || a.isLoaded())) {
      a.load()
    }
  },
  reconfigure: function(j, c) {
    var g = this,
      a = g.store,
      b = g.headerCt,
      i = g.lockable,
      e = b ? b.items.getRange() : g.columns,
      h = g.getView(),
      d, f;
    if (arguments.length === 1 && Ext.isArray(j)) {
      c = j;
      j = null
    }
    if (c) {
      c = Ext.Array.slice(c)
    }
    g.reconfiguring = true;
    if (j) {
      j = Ext.StoreManager.lookup(j)
    }
    g.fireEvent("beforereconfigure", g, j, c, a, e);
    Ext.suspendLayouts();
    if (i) {
      g.reconfigureLockable(j, c)
    } else {
      d = h.blockRefresh;
      h.blockRefresh = true;
      if (j && j !== a) {
        g.unbindStore();
        g.bindStore(j)
      }
      if (c) {
        delete g.scrollXPos;
        b.removeAll();
        b.add(c)
      }
      h.blockRefresh = d;
      f = h.refreshCounter
    }
    Ext.resumeLayouts(true);
    if (i) {
      g.afterReconfigureLockable()
    } else {
      if (h.refreshCounter === f) {
        h.refreshView()
      }
    }
    g.fireEvent("reconfigure", g, j, c, a, e);
    delete g.reconfiguring
  },
  beforeDestroy: function() {
    var b = this,
      a = b.scrollTask;
    if (a) {
      a.cancel();
      b.scrollTask = null
    }
    Ext.destroy(b.focusEnterLeaveListeners);
    Ext.panel.Panel.prototype.beforeDestroy.call(this)
  },
  onDestroy: function() {
    var a = this;
    if (a.lockable) {
      a.destroyLockable()
    }
    a.unbindStore();
    Ext.panel.Panel.prototype.onDestroy.call(this);
    a.columns = a.storeRelayers = a.columnManager = a.visibleColumnManager =
      null
  },
  destroy: function() {
    var a = this;
    Ext.panel.Panel.prototype.destroy.call(this);
    if (a.destroyed) {
      a.view = a.selModel = a.headerCt = null
    }
  },
  privates: {
    initFocusableElement: function() {},
    doEnsureVisible: function(d, l) {
      if (this.lockable) {
        return this.ensureLockedVisible(d, l)
      }
      if (typeof d !== "number" && !d.isEntity) {
        d = this.store.getById(d)
      }
      var e = this,
        g = e.getView(),
        c = g.getNode(d),
        i, j, a, b, h, k, f;
      if (l) {
        i = l.callback;
        j = l.scope;
        a = l.animate;
        b = l.highlight;
        h = l.select;
        k = l.focus
      }
      if (e.deferredEnsureVisible) {
        e.deferredEnsureVisible.destroy()
      }
      if (!g.viewReady) {
        e.deferredEnsureVisible = g.on({
          boxready: e.doEnsureVisible,
          args: Ext.Array.slice(arguments),
          scope: e,
          single: true,
          destroyable: true
        });
        return
      }
      if (c) {
        f = g.getScrollable();
        if (f) {
          f.scrollIntoView(c, null, a, b)
        }
        if (!d.isEntity) {
          d = g.getRecord(c)
        }
        if (h) {
          g.getSelectionModel().select(d)
        }
        if (k) {
          g.getNavigationModel().setPosition(d, 0)
        }
        Ext.callback(i, j || e, [true, d, c])
      } else {
        if (g.bufferedRenderer) {
          g.bufferedRenderer.scrollTo(d, {
            animate: a,
            highlight: b,
            select: h,
            focus: k,
            callback: function(o, m, n) {
              Ext.callback(i, j || e, [true, m, n])
            }
          })
        } else {
          Ext.callback(i, j || e, [false, null])
        }
      }
    },
    getFocusEl: function() {
      return this.getView().getFocusEl()
    },
    setActionableMode: function(b, a) {
      var c = this.ownerGrid;
      if (!c.destroying && c.view.setActionableMode(b, a) !== false) {
        c.fireEvent("actionablemodechange", b);
        c[b ? "addCls" : "removeCls"](c.actionableModeCls);
        return true
      }
    }
  }
}, 1, ["tablepanel"], ["component", "box", "container", "panel",
  "tablepanel"
], {
  component: true,
  box: true,
  container: true,
  panel: true,
  tablepanel: true
}, ["widget.tablepanel"], 0, [Ext.panel, "Table"], 0));
Ext.define("Ext.theme.neptune.panel.Table", {
  override: "Ext.panel.Table",
  lockableBodyBorder: true,
  initComponent: function() {
    var a = this;
    (arguments.callee.$previous || Ext.panel.Panel.prototype.initComponent)
    .call(this);
    if (!a.hasOwnProperty("bodyBorder") && !a.hideHeaders && (a.lockableBodyBorder ||
        !a.lockable)) {
      a.bodyBorder = true
    }
  }
});
(Ext.cmd.derive("Ext.grid.ColumnLayout", Ext.layout.container.HBox, {
  type: "gridcolumn",
  firstHeaderCls: "x-column-header-first",
  lastHeaderCls: "x-column-header-last",
  initLayout: function() {
    Ext.layout.container.HBox.prototype.initLayout.call(this);
    if (this.scrollbarWidth === undefined) {
      this.self.prototype.scrollbarWidth = Ext.getScrollbarSize().width
    }
  },
  beginLayout: function(c) {
    var h = this,
      a = h.owner,
      j = a.grid ? a.grid.getView() : null,
      d = h.firstHeaderCls,
      l = h.lastHeaderCls,
      b = [d, l],
      g = h.getVisibleItems(),
      f = g.length,
      e, k;
    if (j && j.scrollFlags.x) {
      h.viewScrollX = j.getScrollX();
      a.suspendEvent("scroll");
      j.suspendEvent("scroll")
    }
    Ext.layout.container.HBox.prototype.beginLayout.call(this, c);
    for (e = 0; e < f; e++) {
      k = g[e];
      if (f === 1) {
        k.addCls(b)
      } else {
        if (e === 0) {
          k.addCls(d);
          k.removeCls(l)
        } else {
          if (e === f - 1) {
            k.removeCls(d);
            k.addCls(l)
          } else {
            k.removeCls(b)
          }
        }
      }
    }
    h.scrollbarWidth = 0;
    if (a.isRootHeader) {
      h.determineScrollbarWidth(c)
    }
    if (!h.scrollbarWidth) {
      c.manageScrollbar = false
    }
  },
  moveItemBefore: function(b, c) {
    var a = b.ownerCt;
    if (b !== c && a) {
      a.remove(b, false)
    }
    return Ext.layout.container.HBox.prototype.moveItemBefore.call(this,
      b, c)
  },
  determineScrollbarWidth: function(g) {
    var f = this,
      a = f.owner,
      e = a.grid,
      c = a.reserveScrollbar === false,
      b = e.reserveScrollbar && !c,
      d = !b && !c && e.view.scrollFlags.y;
    g.manageScrollbar = d;
    if (!e.ownerGrid.collapsed && (b || d)) {
      delete f.scrollbarWidth
    }
  },
  calculate: function(d) {
    var o = this,
      a = o.owner.grid,
      k = d.viewContext,
      b = d.state,
      c = d.context,
      j, p, l, g, n, m, f, h, e;
    Ext.layout.container.HBox.prototype.calculate.call(this, d);
    if (a && b.parallelDone) {
      j = k.lockingPartnerContext;
      p = a.ownerGrid;
      if (p.forceFit && !b.reflexed) {
        if (o.convertWidthsToFlexes(d)) {
          o.cacheFlexes(d);
          o.done = false;
          d.invalidate({
            state: {
              reflexed: true,
              scrollbarAdjustment: o.getScrollbarAdjustment(d)
            }
          });
          return
        }
      }
      if ((l = b.columnsChanged) === undefined) {
        g = d.target.getVisibleGridColumns();
        l = false;
        for (m = 0, n = g.length; m < n; m++) {
          f = c.getCmp(g[m]);
          if (!f.lastBox || f.props.width !== f.lastBox.width) {
            (l || (l = []))[m] = f
          }
        }
        b.columnsChanged = l;
        d.setProp("columnsChanged", l)
      }
      if (d.manageScrollbar) {
        h = o.getScrollbarAdjustment(d);
        if (h) {
          e = k.getProp("viewOverflowY");
          if (e === undefined) {
            o.done = false;
            return
          }
          if (!e) {
            if (j) {
              j.invalidate();
              j.headerContext.invalidate()
            }
            k.invalidate();
            d.invalidate({
              state: {
                scrollbarAdjustment: 0
              }
            })
          }
        }
      }
    }
  },
  finishedLayout: function(d) {
    var c = this,
      a = c.owner,
      b = a.grid ? a.grid.getView() : null,
      e = c.viewScrollX;
    Ext.layout.container.HBox.prototype.finishedLayout.call(this, d);
    if (b && b.scrollFlags.x) {
      if (e !== undefined && a.tooNarrow && a.componentLayoutCounter) {
        a.setScrollX(e)
      }
      b.resumeEvent("scroll");
      a.resumeEvent("scroll")
    }
    if (a.ariaRole === "rowgroup") {
      c.innerCt.dom.setAttribute("role", "row")
    }
  },
  convertWidthsToFlexes: function(a) {
    var f = this,
      d = 0,
      g = f.sizeModels.calculated,
      c, e, b, j, h;
    c = a.childItems;
    e = c.length;
    for (b = 0; b < e; b++) {
      j = c[b];
      h = j.target;
      d += j.props.width;
      if (!(h.fixed || h.resizable === false)) {
        h.flex = a.childItems[b].flex = j.props.width;
        h.width = null;
        j.widthModel = g
      }
    }
    return d !== a.props.width
  },
  getScrollbarAdjustment: function(d) {
    var b = this,
      c = d.state,
      a = b.owner.grid,
      e = c.scrollbarAdjustment;
    if (e === undefined) {
      e = 0;
      if (a.reserveScrollbar || (d.manageScrollbar && !a.ownerGrid.layout
          .ownerContext.heightModel.shrinkWrap)) {
        e = b.scrollbarWidth
      }
      c.scrollbarAdjustment = e
    }
    return e
  },
  getContainerSize: function(b) {
    var e = this,
      f, h, g, c, d, a, i, j;
    if (e.owner.isRootHeader) {
      j = Ext.layout.container.HBox.prototype.getContainerSize.call(this,
        b);
      if (j.gotWidth) {
        j.width -= e.getScrollbarAdjustment(b)
      }
    } else {
      g = b.paddingContext.getPaddingInfo();
      f = h = 0;
      if (!b.widthModel.shrinkWrap) {
        ++h;
        a = b.getProp("innerWidth");
        c = (typeof a === "number");
        if (c) {
          ++f;
          a -= g.width;
          if (a < 0) {
            a = 0
          }
        }
      }
      if (!b.heightModel.shrinkWrap) {
        ++h;
        i = b.getProp("innerHeight");
        d = (typeof i === "number");
        if (d) {
          ++f;
          i -= g.height;
          if (i < 0) {
            i = 0
          }
        }
      }
      return {
        width: a,
        height: i,
        needed: h,
        got: f,
        gotAll: f === h,
        gotWidth: c,
        gotHeight: d
      }
    }
    return j
  },
  publishInnerCtSize: function(e) {
    var d = this,
      a = d.owner,
      b = e.peek("contentWidth"),
      c = 0;
    if (b != null && a.isRootHeader) {
      c = -e.state.scrollbarAdjustment
    }
    return Ext.layout.container.HBox.prototype.publishInnerCtSize.call(
      this, e, c)
  }
}, 0, 0, 0, 0, ["layout.gridcolumn"], 0, [Ext.grid, "ColumnLayout"], 0));
(Ext.cmd.derive("Ext.grid.ColumnManager", Ext.Base, {
    alternateClassName: ["Ext.grid.ColumnModel"],
    columns: null,
    constructor: function(b, c, a) {
      this.headerCt = c;
      if (a) {
        this.secondHeaderCt = a
      }
      this.visibleOnly = !!b
    },
    getColumns: function() {
      if (!this.columns) {
        this.cacheColumns()
      }
      return this.columns
    },
    hasVariableRowHeight: function() {
      var d = this,
        c = d.getColumns(),
        a = c.length,
        b;
      if (d.variableRowHeight == null) {
        d.variableRowHeight = false;
        for (b = 0; !d.variableRowHeight && b < a; b++) {
          d.variableRowHeight = !!c[b].variableRowHeight
        }
      }
      return d.variableRowHeight
    },
    getHeaderIndex: function(a) {
      if (a.isGroupHeader) {
        a = this.getHeaderColumns(a)[0]
      }
      return Ext.Array.indexOf(this.getColumns(), a)
    },
    getHeaderAtIndex: function(b) {
      var c = this.getColumns(),
        a = c[b];
      return a || null
    },
    getPreviousSibling: function(c) {
      var b = this.getHeaderIndex(c),
        a = null;
      if (b > 0) {
        a = this.getColumns()[b - 1]
      }
      return a
    },
    getNextSibling: function(c) {
      var b = this.getHeaderIndex(c),
        a;
      if (b !== -1) {
        a = this.getColumns()[b + 1]
      }
      return a || null
    },
    getFirst: function() {
      var a = this.getColumns();
      return a.length > 0 ? a[0] : null
    },
    getLast: function() {
      var b = this.getColumns(),
        a = b.length;
      return a > 0 ? b[a - 1] : null
    },
    getHeaderByDataIndex: function(d) {
      var c = this.getColumns(),
        a = c.length,
        b, e;
      for (b = 0; b < a; ++b) {
        e = c[b];
        if (e.dataIndex === d) {
          return e
        }
      }
      return null
    },
    getHeaderById: function(e) {
      var c = this.getColumns(),
        a = c.length,
        b, d;
      for (b = 0; b < a; ++b) {
        d = c[b];
        if (d.getItemId() === e) {
          return d
        }
      }
      return null
    },
    getVisibleHeaderClosestToIndex: function(b) {
      var a = this.getHeaderAtIndex(b);
      if (a && a.hidden) {
        a = a.next(":not([hidden])") || a.prev(":not([hidden])")
      }
      return a
    },
    cacheColumns: function() {
      var b = this.getHeaderColumns(this.headerCt),
        a = this.secondHeaderCt;
      if (a) {
        b = b.concat(this.getHeaderColumns(a))
      }
      this.columns = b
    },
    getHeaderColumns: function(b) {
      var a = this.visibleOnly ? b.getVisibleGridColumns() : b.getGridColumns();
      return Ext.Array.clone(a)
    },
    invalidate: function() {
      var a = this.rootColumns;
      this.columns = this.variableRowHeight = null;
      if (a) {
        a.invalidate()
      }
    },
    destroy: function() {
      this.columns = this.rootColumns = null;
      this.callParent()
    }
  }, 1, 0, 0, 0, 0, 0, [Ext.grid, "ColumnManager", Ext.grid, "ColumnModel"],
  function() {
    this.createAlias("indexOf", "getHeaderIndex")
  }));
(Ext.cmd.derive("Ext.grid.NavigationModel", Ext.view.NavigationModel, {
    focusCls: "x-grid-item-focused",
    getViewListeners: function() {
      var a = this;
      return {
        focusmove: {
          element: "el",
          fn: a.onFocusMove
        },
        containermousedown: a.onContainerMouseDown,
        cellmousedown: a.onCellMouseDown,
        cellclick: a.onCellClick,
        itemmousedown: a.onItemMouseDown,
        itemclick: a.onItemClick,
        itemcontextmenu: a.onItemClick,
        scope: a
      }
    },
    initKeyNav: function(a) {
      var b = this;
      if (!b.keyNav) {
        b.keyNav = [];
        b.position = new Ext.grid.CellContext(a)
      }
      b.keyNav.push(new Ext.util.KeyNav({
        target: a,
        ignoreInputFields: true,
        eventName: "itemkeydown",
        defaultEventAction: "stopEvent",
        processEvent: b.processViewEvent,
        up: b.onKeyUp,
        down: b.onKeyDown,
        right: b.onKeyRight,
        left: b.onKeyLeft,
        pageDown: b.onKeyPageDown,
        pageUp: b.onKeyPageUp,
        home: b.onKeyHome,
        end: b.onKeyEnd,
        space: b.onKeySpace,
        enter: b.onKeyEnter,
        esc: b.onKeyEsc,
        113: b.onKeyF2,
        tab: b.onKeyTab,
        A: {
          ctrl: true,
          handler: b.onSelectAllKeyPress
        },
        scope: b
      }))
    },
    addKeyBindings: function(c) {
      var a = this.keyNav.length,
        b;
      for (b = 0; b < a; b++) {
        this.keyNav[b].addBindings(c)
      }
    },
    enable: function() {
      var a = this.keyNav.length,
        b;
      for (b = 0; b < a; b++) {
        this.keyNav[b].enable()
      }
      this.disabled = false
    },
    disable: function() {
      var a = this.keyNav.length,
        b;
      for (b = 0; b < a; b++) {
        this.keyNav[b].disable()
      }
      this.disabled = true
    },
    processViewEvent: function(b, a, f, c, e) {
      var d = e.getKey();
      if (b.actionableMode) {
        this.map.ignoreInputFields = false;
        if (d === e.TAB || d === e.ESC || d === e.F2) {
          return e
        }
      } else {
        this.map.ignoreInputFields = true;
        return d === e.TAB ? null : e
      }
    },
    onCellMouseDown: function(f, h, e, d, j, c, b) {
      var g = b.parentEvent,
        a = Ext.Component.fromElement(b.target, h),
        i;
      if (f.actionableMode && (b.getTarget(null, null, true).isTabbable() ||
          ((i = Ext.ComponentManager.getActiveComponent()) && i.owns(b)))) {
        return
      }
      if ((!g || g.type !== "touchstart")) {
        this.setPosition(b.position, null, b)
      }
      if (a && a.isFocusable && a.isFocusable()) {
        f.setActionableMode(true, b.position);
        a.focus()
      }
    },
    onCellClick: function(f, g, e, c, j, b, h) {
      var d = this,
        a = Ext.Component.fromElement(h.target, g),
        i = a && a.isFocusable && a.isFocusable();
      if (f.actionableMode) {
        d.fireEvent("navigate", {
          view: f,
          navigationModel: d,
          keyEvent: h,
          previousPosition: d.previousPosition,
          previousRecordIndex: d.previousRecordIndex,
          previousRecord: d.previousRecord,
          previousItem: d.previousItem,
          previousCell: d.previousCell,
          previousColumnIndex: d.previousColumnIndex,
          previousColumn: d.previousColumn,
          position: h.position,
          recordIndex: h.position.rowIdx,
          record: h.position.record,
          item: h.item,
          cell: h.position.cellElement,
          columnIndex: h.position.colIdx,
          column: h.position.column
        })
      } else {
        if (this.position.isEqual(h.position) || i) {
          this.fireNavigateEvent(h)
        } else {
          this.setPosition(h.position, null, h)
        }
      }
    },
    onFocusMove: function(g) {
      var a = g.target,
        c = Ext.Component.fromElement(g.delegatedTarget, null, "tableview"),
        a = g.target,
        b, f, d;
      if (c && Ext.fly(a).is(c.cellSelector)) {
        if (c.actionableModeTabbing) {
          return
        }
        c.ownerGrid.setActionableMode(false);
        b = c.getRecord(a);
        f = c.getHeaderByCell(a);
        if (b && f) {
          d = new Ext.grid.CellContext(c).setPosition(b, f);
          if (!d.isEqual(this.position)) {
            this.setPosition(d)
          }
        }
      }
    },
    onItemMouseDown: function(b, a, g, d, c) {
      var f = this,
        e = c.parentEvent;
      if (!c.position.cellElement && (!e || e.type !== "touchstart")) {
        f.getClosestCell(c);
        f.setPosition(c.position, null, c)
      }
    },
    onItemClick: function(c, b, e, d, a) {
      if (!a.position.cellElement) {
        this.getClosestCell(a);
        this.fireNavigateEvent(a)
      }
    },
    getClosestCell: function(a) {
      var g = a.position,
        c = g.cellElement,
        k, e, h, f, d, j;
      if (!c) {
        k = a.getX();
        e = g.view.getVisibleColumnManager().getColumns();
        h = e.length;
        for (f = 0; f < h; f++) {
          d = e[f];
          j = e[f].getBox();
          if (k >= j.left && k < j.right) {
            g.setColumn(e[f]);
            g.rowElement = g.getRow(true);
            g.cellElement = g.getCell(true);
            return
          }
        }
      }
    },
    beforeViewRefresh: function(b) {
      var a = this.getPosition();
      if (a && a.view === b) {
        this.focusRestorePosition = a.clone()
      } else {
        this.focusRestorePosition = null
      }
    },
    onStoreRemove: function(a) {
      var b = this,
        c = b.view.ownerGrid.actionableMode,
        d = c ? b.actionPosition : b.getPosition();
      if (d && d.view.el.contains(Ext.Element.getActiveElement())) {
        d.view.refreshing = true;
        Ext.on({
          idle: b.afterStoreRemove,
          scope: b,
          single: true,
          args: [c, d.clone(), a]
        })
      }
    },
    afterStoreRemove: function(e, f, b) {
      var d = this,
        a = f.view,
        c = a.ownerGrid;
      a.refreshing = false;
      if (!b.getCount()) {
        if (e) {
          c.setActionableMode(false)
        } else {
          d.setPosition(null, null, null, null, true)
        }
        f.column.focus();
        return
      }
      if (!f.view.el.contains(Ext.Element.getActiveElement())) {
        f = new Ext.grid.CellContext(a).setPosition(b.contains(f.record) ?
          f.record : Math.min(f.rowIdx, a.dataSource.getCount() - 1), f.colIdx
        );
        if (e) {
          c.setActionableMode(false);
          if (!c.setActionableMode(true, f)) {
            d.setPosition(f, null, null, null, true)
          }
        } else {
          d.setPosition(f, null, null, null, true)
        }
      }
    },
    deferSetPosition: function(c, b, d, f, a, g) {
      var e = this.view.getFocusTask();
      e.delay(c, this.setPosition, this, [b, d, f, a, g]);
      return e
    },
    setPosition: function(f, l, m, q, h) {
      var n = this,
        p, j, i, a, c, b, d, k, g, o = f == null && l == null,
        e = n.record == null && n.recordIndex == null && n.item == null;
      if (f && f.isCellContext) {
        p = f.view
      } else {
        if (m && m.view) {
          p = m.view
        } else {
          if (n.lastFocused) {
            p = n.lastFocused.view
          } else {
            p = n.view
          }
        }
      }
      p.getFocusTask().cancel();
      if (p.destroyed || !p.refreshCounter || !p.ownerCt || o && e || !p.all
        .getCount()) {
        return
      }
      i = p.getSelectionModel();
      a = p.dataSource;
      c = p.getVisibleColumnManager();
      if (f && f.isCellContext) {
        k = f.record;
        b = f.rowIdx;
        d = f.colIdx;
        g = f.column;
        if (a.indexOf(k) === -1) {
          j = p.getScrollable();
          n.recordIndex = -1;
          if (j.getPosition().y >= j.getMaxPosition().y - p.all.last(true).offsetHeight) {
            f.rowIdx--
          }
          b = Math.min(f.rowIdx, a.getCount() - 1);
          d = Math.min(d, c.getColumns().length);
          k = a.getAt(b);
          g = c.getColumns()[d]
        }
      } else {
        if (o) {
          k = b = null
        } else {
          if (l == null) {
            l = n.lastFocused ? n.lastFocused.column : 0
          }
          if (typeof f === "number") {
            b = Math.max(Math.min(f, a.getCount() - 1), 0);
            k = a.getAt(f)
          } else {
            if (f.isEntity) {
              k = f;
              b = a.indexOf(k)
            } else {
              if (f.tagName) {
                k = p.getRecord(f);
                b = a.indexOf(k);
                if (b === -1) {
                  k = null
                }
              } else {
                if (e) {
                  return
                }
                o = true;
                k = b = null
              }
            }
          }
        }
        if (k) {
          if (b === -1) {
            n.recordIndex = -1;
            k = a.getAt(0);
            b = 0;
            l = null
          }
          if (l == null) {
            if (!(g = n.column)) {
              d = 0;
              g = c.getColumns()[0]
            }
          } else {
            if (typeof l === "number") {
              g = c.getColumns()[l];
              d = l
            } else {
              g = l;
              d = c.indexOf(l)
            }
          }
        } else {
          o = true;
          g = d = null
        }
      }
      if (b === n.recordIndex && d === n.columnIndex && p === n.position.view) {
        return n.focusPosition(n.position)
      }
      if (n.cell) {
        n.cell.removeCls(n.focusCls)
      }
      n.previousRecordIndex = n.recordIndex;
      n.previousRecord = n.record;
      n.previousItem = n.item;
      n.previousCell = n.cell;
      n.previousColumn = n.column;
      n.previousColumnIndex = n.columnIndex;
      n.previousPosition = n.position.clone();
      n.selectionStart = i.selectionStart;
      n.position.setAll(p, n.recordIndex = b, n.columnIndex = d, n.record =
        k, n.column = g);
      if (o) {
        n.item = n.cell = null
      } else {
        n.focusPosition(n.position, h)
      }
      if (!q) {
        i.fireEvent("focuschange", i, n.previousRecord, n.record);
        p.fireEvent("rowfocus", n.record, n.item, n.recordIndex);
        p.fireEvent("cellfocus", n.record, n.cell, n.position)
      }
      if (m && !h && n.cell !== n.previousCell) {
        n.fireNavigateEvent(m)
      }
    },
    focusPosition: function(a) {
      var c = this,
        b, d;
      c.item = c.cell = null;
      if (a && a.record && a.column) {
        b = a.view;
        if (a.rowElement) {
          d = c.item = a.rowElement
        } else {
          d = b.getRowByRecord(a.record)
        }
        if (d) {
          c.cell = a.cellElement || Ext.fly(d).down(a.column.getCellSelector(),
            true);
          if (c.cell) {
            c.cell = new Ext.dom.Fly(c.cell);
            b.lastFocused = c.lastFocused = c.position.clone();
            c.focusItem(c.cell);
            b.focusEl = c.cell
          } else {
            c.position.setAll();
            c.record = c.column = c.recordIndex = c.columnIndex = null
          }
        } else {
          d = b.dataSource.indexOf(a.record);
          c.position.setAll();
          c.record = c.column = c.recordIndex = c.columnIndex = null;
          if (d !== -1 && b.bufferedRenderer) {
            c.lastKeyEvent = null;
            b.bufferedRenderer.scrollTo(d, false, c.afterBufferedScrollTo,
              c)
          }
        }
      }
    },
    focusItem: function(a) {
      a.addCls(this.focusCls);
      a.focus()
    },
    getCell: function() {
      return this.cell
    },
    getPosition: function() {
      var d = this,
        a = d.position,
        c, b, e;
      if (a.record && a.column) {
        b = a.view;
        e = b.dataSource;
        c = e.indexOf(a.record);
        if (c === -1) {
          c = a.rowIdx;
          if (!(a.record = e.getAt(c))) {
            c = -1
          }
        }
        if (c === -1 || b.getVisibleColumnManager().indexOf(a.column) === -
          1) {
          a.setAll();
          d.record = d.column = d.recordIndex = d.columnIndex = null
        } else {
          return a
        }
      }
      return null
    },
    getLastFocused: function() {
      var c = this,
        a, b = c.lastFocused;
      if (b && b.record && b.column) {
        a = b.view;
        if (a.dataSource.indexOf(b.record) !== -1 && a.getVisibleColumnManager()
          .indexOf(b.column) !== -1) {
          return b
        }
      }
    },
    onKeyTab: function(e) {
      var b = !e.shiftKey,
        c = e.position.clone(),
        f = c.view,
        k = e.position.cellElement,
        g = Ext.fly(k).findTabbableElements(),
        h, j = f.ownerGrid.actionables,
        d = j.length,
        a;
      e.preventDefault();
      h = g[Ext.Array.indexOf(g, e.target) + (b ? 1 : -1)];
      while (!h && (k = k[b ? "nextSibling" : "previousSibling"])) {
        c.setColumn(f.getHeaderByCell(k));
        for (a = 0; a < d; a++) {
          j[a].activateCell(c)
        }
        if ((g = Ext.fly(k).findTabbableElements()).length) {
          h = g[b ? 0 : g.length - 1]
        }
      }
      if (h) {
        this.actionPosition = c.view.actionPosition = c;
        h.focus();
        return
      }
      if (Ext.isIE) {
        f.el.focus()
      }
      f.onRowExit(e.item, e.item[b ? "nextSibling" : "previousSibling"], b)
    },
    onKeyUp: function(b) {
      var a = b.view.walkRecs(b.record, -1),
        c = this.getPosition();
      if (a) {
        c.setRow(a);
        if (!c.getCell(true)) {
          c.navigate(-1)
        }
        this.setPosition(c, null, b)
      }
    },
    onKeyDown: function(b) {
      var a = b.record.isExpandingOrCollapsing ? null : b.view.walkRecs(b.record,
          1),
        c = this.getPosition();
      if (a) {
        c.setRow(a);
        if (!c.getCell(true)) {
          c.navigate(-1)
        }
        this.setPosition(c, null, b)
      }
    },
    onKeyRight: function(b) {
      var a = this.move("right", b);
      if (a) {
        this.setPosition(a, null, b)
      }
    },
    onKeyLeft: function(b) {
      var a = this.move("left", b);
      if (a) {
        this.setPosition(a, null, b)
      }
    },
    onKeyEnter: function(b) {
      var a = ["cellclick", b.view, b.position.cellElement, b.position.colIdx,
          b.record, b.position.rowElement, b.recordIndex, b
        ],
        c = b.position.getCell();
      if (c) {
        if (!c.query('[tabIndex="-1"]').length) {
          b.stopEvent();
          b.view.fireEvent.apply(b.view, a);
          a[0] = "celldblclick";
          b.view.fireEvent.apply(b.view, a)
        }
        if (!this.view.actionableMode) {
          this.view.ownerGrid.setActionableMode(true, this.getPosition())
        }
      }
    },
    onKeyF2: function(b) {
      var a = this.view.ownerGrid,
        c = a.actionableMode;
      a.setActionableMode(!c, c ? null : this.getPosition())
    },
    onKeyEsc: function(a) {
      this.view.ownerGrid.setActionableMode(false)
    },
    move: function(b, d) {
      var c = this,
        a = c.getPosition();
      if (a && a.record) {
        return a.view.walkCells(a, b, d.shiftKey && (b === "right" || b ===
          "left") ? c.vetoRowChange : null, c)
      }
    },
    vetoRowChange: function(a) {
      return this.getPosition().record === a.record
    },
    onKeyPageDown: function(e) {
      var d = this,
        a = e.view,
        f = d.getRowsVisible(),
        c, b;
      if (f) {
        if (a.bufferedRenderer) {
          c = Math.min(e.recordIndex + f, a.dataSource.getCount() - 1);
          d.lastKeyEvent = e;
          a.bufferedRenderer.scrollTo(c, false, d.afterBufferedScrollTo, d)
        } else {
          b = a.walkRecs(e.record, f);
          d.setPosition(b, null, e)
        }
      }
    },
    onKeyPageUp: function(e) {
      var d = this,
        a = e.view,
        f = d.getRowsVisible(),
        c, b;
      if (f) {
        if (a.bufferedRenderer) {
          c = Math.max(e.recordIndex - f, 0);
          d.lastKeyEvent = e;
          a.bufferedRenderer.scrollTo(c, false, d.afterBufferedScrollTo, d)
        } else {
          b = a.walkRecs(e.record, -f);
          d.setPosition(b, null, e)
        }
      }
    },
    onKeyHome: function(c) {
      var b = this,
        a = c.view;
      if (c.altKey) {
        if (a.bufferedRenderer) {
          b.lastKeyEvent = c;
          a.bufferedRenderer.scrollTo(0, false, b.afterBufferedScrollTo, b)
        } else {
          b.setPosition(a.walkRecs(c.record, -a.dataSource.indexOf(c.record)),
            null, c)
        }
      } else {
        b.setPosition(c.record, 0, c)
      }
    },
    afterBufferedScrollTo: function(b, a) {
      this.setPosition(a, null, this.lastKeyEvent, null, !this.lastKeyEvent)
    },
    onKeyEnd: function(c) {
      var b = this,
        a = c.view;
      if (c.altKey) {
        if (a.bufferedRenderer) {
          b.lastKeyEvent = c;
          a.bufferedRenderer.scrollTo(a.store.getCount() - 1, false, b.afterBufferedScrollTo,
            b)
        } else {
          b.setPosition(a.walkRecs(c.record, a.dataSource.getCount() - 1 -
            a.dataSource.indexOf(c.record)), null, c)
        }
      } else {
        b.setPosition(c.record, c.view.getVisibleColumnManager().getColumns()
          .length - 1, c)
      }
    },
    getRowsVisible: function() {
      var e = false,
        a = this.view,
        d = a.all.first(),
        b, c;
      if (d) {
        b = d.getHeight();
        c = a.el.getHeight();
        e = Math.floor(c / b)
      }
      return e
    },
    fireNavigateEvent: function(b) {
      var a = this;
      a.fireEvent("navigate", {
        view: a.position.view,
        navigationModel: a,
        keyEvent: b || new Ext.event.Event({}),
        previousPosition: a.previousPosition,
        previousRecordIndex: a.previousRecordIndex,
        previousRecord: a.previousRecord,
        previousItem: a.previousItem,
        previousCell: a.previousCell,
        previousColumnIndex: a.previousColumnIndex,
        previousColumn: a.previousColumn,
        position: a.position,
        recordIndex: a.recordIndex,
        record: a.record,
        selectionStart: a.selectionStart,
        item: a.item,
        cell: a.cell,
        columnIndex: a.columnIndex,
        column: a.column
      })
    }
  }, 0, 0, 0, 0, ["view.navigation.grid"], 0, [Ext.grid, "NavigationModel"],
  0));
(Ext.cmd.derive("Ext.view.TableLayout", Ext.layout.component.Auto, {
  type: "tableview",
  beginLayout: function(d) {
    var c = this,
      b = c.owner.lockingPartner,
      a = d.context;
    if (!c.columnFlusherId) {
      c.columnFlusherId = c.id + "-columns";
      c.rowHeightFlusherId = c.id + "-rows"
    }
    Ext.layout.component.Auto.prototype.beginLayout.call(this, d);
    if (b && b.grid.isVisible()) {
      if (!d.lockingPartnerContext) {
        (d.lockingPartnerContext = a.getCmp(b)).lockingPartnerContext = d
      }
      d.rowHeightSynchronizer = c.owner.syncRowHeightBegin()
    }(d.headerContext = a.getCmp(c.headerCt)).viewContext = d
  },
  beginLayoutCycle: function(b, a) {
    Ext.layout.component.Auto.prototype.beginLayoutCycle.call(this, b, a);
    if (b.syncRowHeights) {
      b.target.syncRowHeightClear(b.rowHeightSynchronizer);
      b.syncRowHeights = false
    }
  },
  calculate: function(e) {
    var m = this,
      b = e.context,
      g = e.lockingPartnerContext,
      d = e.headerContext,
      j = e.ownerCtContext,
      c = m.owner,
      i = d.getProp("columnsChanged"),
      a = e.state,
      n, f, p, o, k = c.body.dom,
      q, l, h;
    if (!c.all.getCount() && (!k || !c.body.child("table"))) {
      e.setProp("viewOverflowY", false);
      Ext.layout.component.Auto.prototype.calculate.call(this, e);
      return
    }
    if (i === undefined) {
      m.done = false;
      return
    }
    if (i) {
      if (!(n = a.columnFlusher)) {
        b.queueFlush(a.columnFlusher = n = {
          ownerContext: e,
          columnsChanged: i,
          layout: m,
          id: m.columnFlusherId,
          flush: m.flushColumnWidths
        })
      }
      if (!n.flushed) {
        m.done = false;
        return
      }
    }
    if (g) {
      if (!(o = a.rowHeightFlusher)) {
        if (!(p = a.rowHeights)) {
          a.rowHeights = p = e.rowHeightSynchronizer;
          m.owner.syncRowHeightMeasure(p);
          e.setProp("rowHeights", p)
        }
        if (!(f = g.getProp("rowHeights"))) {
          m.done = false;
          return
        }
        b.queueFlush(a.rowHeightFlusher = o = {
          ownerContext: e,
          synchronizer: p,
          otherSynchronizer: f,
          layout: m,
          id: m.rowHeightFlusherId,
          flush: m.flushRowHeights
        })
      }
      if (!o.flushed) {
        m.done = false;
        return
      }
    }
    Ext.layout.component.Auto.prototype.calculate.call(this, e);
    if (!e.heightModel.shrinkWrap) {
      h = false;
      if (!j.heightModel.shrinkWrap) {
        l = j.target.layout.getContainerSize(j);
        if (!l.gotHeight) {
          m.done = false;
          return
        }
        q = k.offsetHeight;
        h = q > l.height
      }
      e.setProp("viewOverflowY", h)
    }
  },
  measureContentHeight: function(d) {
    var a = this.owner,
      c = a.body.dom,
      b = a.emptyEl,
      e = 0;
    if (b) {
      e += b.offsetHeight
    }
    if (c) {
      e += c.offsetHeight
    }
    if (d.headerContext.state.boxPlan.tooNarrow) {
      e += Ext.getScrollbarSize().height
    }
    return e
  },
  flushColumnWidths: function() {
    var k = this,
      j = k.layout,
      b = k.ownerContext,
      d = k.columnsChanged,
      a = b.target,
      h = d.length,
      c, f, e, g;
    if (b.state.columnFlusher !== k) {
      return
    }
    for (f = 0; f < h; f++) {
      if (!(c = d[f])) {
        continue
      }
      e = c.props.width;
      a.body.select(a.getColumnSizerSelector(c.target)).setWidth(e);
      g = c.lastBox;
      if (g) {
        g.width = e
      }
    }
    k.flushed = true;
    if (!j.pending) {
      b.context.queueLayout(j)
    }
  },
  flushRowHeights: function() {
    var a = this,
      b = a.layout,
      c = a.ownerContext;
    if (c.state.rowHeightFlusher !== a) {
      return
    }
    c.target.syncRowHeightFinish(a.synchronizer, a.otherSynchronizer);
    a.flushed = true;
    c.syncRowHeights = true;
    if (!b.pending) {
      c.context.queueLayout(b)
    }
  },
  finishedLayout: function(a) {
    var b = Ext.fly(this.owner.getNodeContainer());
    Ext.layout.component.Auto.prototype.finishedLayout.call(this, a);
    if (b) {
      b.setWidth(a.headerContext.props.contentWidth)
    }
  }
}, 0, 0, 0, 0, ["layout.tableview"], 0, [Ext.view, "TableLayout"], 0));
(Ext.cmd.derive("Ext.grid.locking.RowSynchronizer", Ext.Base, {
  constructor: function(a, b) {
    var c = this,
      d;
    c.view = a;
    c.rowEl = b;
    c.els = {};
    c.add("data", a.rowSelector);
    for (d = a.rowTpl; d; d = d.nextTpl) {
      if (d.beginRowSync) {
        d.beginRowSync(c)
      }
    }
  },
  add: function(b, a) {
    var c = Ext.fly(this.rowEl).down(a, true);
    if (c) {
      this.els[b] = {
        el: c
      }
    }
  },
  finish: function(f) {
    var g = this,
      c = g.els,
      i = f.els,
      e, h = 0,
      b = 0,
      j, a, d;
    for (a in c) {
      e = i[a];
      d = e ? e.height : 0;
      j = d - c[a].height;
      if (j > 0) {
        h += j;
        Ext.fly(c[a].el).setHeight(d)
      } else {
        b -= j
      }
    }
    d = f.rowHeight + b;
    if (g.rowHeight + h < d) {
      Ext.fly(g.rowEl).setHeight(d)
    }
  },
  measure: function() {
    var c = this,
      b = c.els,
      a;
    c.rowHeight = c.rowEl.offsetHeight;
    for (a in b) {
      b[a].height = b[a].el.offsetHeight
    }
  },
  reset: function() {
    var b = this.els,
      a;
    this.rowEl.style.height = "";
    for (a in b) {
      b[a].el.style.height = ""
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.grid.locking, "RowSynchronizer"], 0));
(Ext.cmd.derive("Ext.view.NodeCache", Ext.Base, {
  statics: {
    range: document.createRange && document.createRange()
  },
  constructor: function(a) {
    this.view = a;
    this.clear();
    this.el = new Ext.dom.Fly()
  },
  destroy: function() {
    var a = this;
    if (!a.destroyed) {
      a.el.destroy();
      a.el = a.view = null;
      a.destroyed = true
    }
    a.callParent()
  },
  clear: function(e) {
    var c = this,
      d = c.elements,
      a = c.statics().range,
      b;
    if (c.count && e) {
      if (a) {
        a.setStartBefore(d[c.startIndex]);
        a.setEndAfter(d[c.endIndex]);
        a.deleteContents()
      } else {
        for (b in d) {
          Ext.removeNode(d[b])
        }
      }
    }
    c.elements = {};
    c.count = c.startIndex = 0;
    c.endIndex = -1
  },
  fill: function(b, g, f) {
    f = f || 0;
    var d = this,
      e = d.elements = {},
      c, a = b.length - f;
    if (!g) {
      g = 0
    }
    for (c = 0; c < a; c++) {
      e[g + c] = b[c + f]
    }
    d.startIndex = g;
    d.endIndex = g + a - 1;
    d.count = a;
    return this
  },
  insert: function(f, b) {
    var d = this,
      e = d.elements,
      c, a = b.length;
    if (d.count) {
      if (f < d.count) {
        for (c = d.endIndex + a; c >= f + a; c--) {
          e[c] = e[c - a];
          e[c].setAttribute("data-recordIndex", c)
        }
      }
      d.endIndex = d.endIndex + a
    } else {
      d.startIndex = f;
      d.endIndex = f + a - 1
    }
    for (c = 0; c < a; c++, f++) {
      e[f] = b[c];
      e[f].setAttribute("data-recordIndex", f)
    }
    d.count += a
  },
  invoke: function(d, a) {
    var e = this,
      c, b;
    d = Ext.dom.Element.prototype[d];
    for (b = e.startIndex; b <= e.endIndex; b++) {
      c = e.item(b);
      if (c) {
        d.apply(c, a)
      }
    }
    return e
  },
  item: function(c, b) {
    var d = this.elements[c],
      a = null;
    if (d) {
      a = b ? this.elements[c] : this.el.attach(this.elements[c])
    }
    return a
  },
  first: function(a) {
    return this.item(this.startIndex, a)
  },
  last: function(a) {
    return this.item(this.endIndex, a)
  },
  moveBlock: function(a) {
    var f = this,
      g = f.elements,
      e, b, d, c;
    if (!a) {
      return
    }
    if (a < 0) {
      c = f.startIndex - 1;
      b = f.endIndex;
      d = 1
    } else {
      c = f.endIndex + 1;
      b = f.startIndex;
      d = -1
    }
    f.startIndex += a;
    f.endIndex += a;
    do {
      c += d;
      e = g[c + a] = g[c];
      e.setAttribute("data-recordIndex", c + a);
      if (c < f.startIndex || c > f.endIndex) {
        delete g[c]
      }
    } while (c !== b);
    delete g[c]
  },
  getCount: function() {
    return this.count
  },
  slice: function(e, b) {
    var d = this.elements,
      a = [],
      c;
    if (!b) {
      b = this.endIndex
    } else {
      b = Math.min(this.endIndex, b - 1)
    }
    for (c = e || this.startIndex; c <= b; c++) {
      a.push(d[c])
    }
    return a
  },
  replaceElement: function(d, c, a) {
    var e = this.elements,
      b = (typeof d === "number") ? d : this.indexOf(d);
    if (b > -1) {
      c = Ext.getDom(c);
      if (a) {
        d = e[b];
        d.parentNode.insertBefore(c, d);
        Ext.removeNode(d);
        c.setAttribute("data-recordIndex", b)
      }
      this.elements[b] = c
    }
    return this
  },
  indexOf: function(b) {
    var c = this.elements,
      a;
    b = Ext.getDom(b);
    for (a = this.startIndex; a <= this.endIndex; a++) {
      if (c[a] === b) {
        return a
      }
    }
    return -1
  },
  removeRange: function(c, f, d) {
    var j = this,
      a = j.elements,
      h = [],
      e, g, b, k;
    if (f == null) {
      f = j.endIndex + 1
    } else {
      f = Math.min(j.endIndex + 1, f + 1)
    }
    if (c == null) {
      c = j.startIndex
    }
    b = f - c;
    for (g = c, k = f; g <= j.endIndex; g++, k++) {
      e = a[g];
      if (g < f) {
        h.push(e);
        if (d) {
          Ext.removeNode(e)
        }
      }
      if (k <= j.endIndex) {
        e = a[g] = a[k];
        e.setAttribute("data-recordIndex", g)
      } else {
        delete a[g]
      }
    }
    j.count -= b;
    j.endIndex -= b;
    return h
  },
  removeElement: function(k, c) {
    var g = this,
      j, i, a = g.elements,
      d, e, b = 0,
      f, h;
    if (Ext.isArray(k)) {
      j = k;
      k = [];
      e = j.length;
      for (b = 0; b < e; b++) {
        i = j[b];
        if (typeof i !== "number") {
          i = g.indexOf(i)
        }
        if (i >= g.startIndex && i <= g.endIndex) {
          k[k.length] = i
        }
      }
      Ext.Array.sort(k);
      e = k.length
    } else {
      if (k < g.startIndex || k > g.endIndex) {
        return
      }
      e = 1;
      k = [k]
    }
    for (f = h = k[0], b = 0; f <= g.endIndex; f++, h++) {
      if (b < e && f === k[b]) {
        h++;
        b++;
        if (c) {
          Ext.removeNode(a[f])
        }
      }
      if (h <= g.endIndex && h >= g.startIndex) {
        d = a[f] = a[h];
        d.setAttribute("data-recordIndex", f)
      } else {
        delete a[f]
      }
    }
    g.endIndex -= e;
    g.count -= e
  },
  scroll: function(r, s, h) {
    var t = this,
      k = t.view,
      f = k.store,
      l = t.elements,
      a = r.length,
      o = k.getNodeContainer(),
      g = k.hasListeners.itemremove,
      q = k.hasListeners.itemadd,
      m = t.statics().range,
      p, b, c, d, j, e, n, u;
    if (!r.length) {
      return
    }
    if (s === -1) {
      if (h) {
        if (g) {
          n = [];
          u = []
        }
        e = (t.endIndex - h) + 1;
        if (m) {
          m.setStartBefore(l[e]);
          m.setEndAfter(l[t.endIndex]);
          m.deleteContents();
          for (p = e; p <= t.endIndex; p++) {
            b = l[p];
            delete l[p];
            if (g) {
              n.push(f.getByInternalId(b.getAttribute("data-recordId")));
              u.push(b)
            }
          }
        } else {
          for (p = e; p <= t.endIndex; p++) {
            b = l[p];
            delete l[p];
            Ext.removeNode(b);
            if (g) {
              n.push(f.getByInternalId(b.getAttribute("data-recordId")));
              u.push(b)
            }
          }
        }
        k.fireEvent("itemremove", n, e, u, k);
        t.endIndex -= h
      }
      if (r.length) {
        j = k.bufferRender(r, t.startIndex -= a);
        d = j.children;
        for (p = 0; p < a; p++) {
          l[t.startIndex + p] = d[p]
        }
        o.insertBefore(j.fragment, o.firstChild);
        if (q) {
          k.fireEvent("itemadd", r, t.startIndex, d)
        }
      }
    } else {
      if (h) {
        if (g) {
          n = [];
          u = []
        }
        c = t.startIndex + h;
        if (m) {
          m.setStartBefore(l[t.startIndex]);
          m.setEndAfter(l[c - 1]);
          m.deleteContents();
          for (p = t.startIndex; p < c; p++) {
            b = l[p];
            delete l[p];
            if (g) {
              n.push(f.getByInternalId(b.getAttribute("data-recordId")));
              u.push(b)
            }
          }
        } else {
          for (p = t.startIndex; p < c; p++) {
            b = l[p];
            delete l[p];
            Ext.removeNode(b);
            if (g) {
              n.push(f.getByInternalId(b.getAttribute("data-recordId")));
              u.push(b)
            }
          }
        }
        k.fireEvent("itemremove", n, t.startIndex, u, k);
        t.startIndex = c
      }
      j = k.bufferRender(r, t.endIndex + 1);
      d = j.children;
      for (p = 0; p < a; p++) {
        l[t.endIndex += 1] = d[p]
      }
      o.appendChild(j.fragment);
      if (q) {
        k.fireEvent("itemadd", r, t.endIndex + 1, d)
      }
    }
    t.count = t.endIndex - t.startIndex + 1;
    return d
  },
  sumHeights: function() {
    var a = 0,
      c = this.elements,
      b;
    for (b = this.startIndex; b <= this.endIndex; b++) {
      a += c[b].offsetHeight
    }
    return a
  }
}, 1, 0, 0, 0, 0, 0, [Ext.view, "NodeCache"], function() {
  Ext.dom.CompositeElementLite.importElementMethods.call(this)
}));
(Ext.cmd.derive("Ext.view.Table", Ext.view.View, {
  alternateClassName: "Ext.grid.View",
  isTableView: true,
  config: {
    selectionModel: {
      type: "rowmodel"
    }
  },
  inheritableStatics: {
    normalSideEvents: ["deselect", "select", "beforedeselect",
      "beforeselect", "selectionchange"
    ],
    events: ["blur", "focus", "move", "resize", "destroy", "beforedestroy",
      "boxready", "afterrender", "render", "beforerender", "removed",
      "hide", "beforehide", "show", "beforeshow", "enable", "disable",
      "added", "deactivate", "beforedeactivate", "activate",
      "beforeactivate", "cellkeydown", "beforecellkeydown", "cellmouseup",
      "beforecellmouseup", "cellmousedown", "beforecellmousedown",
      "cellcontextmenu", "beforecellcontextmenu", "celldblclick",
      "beforecelldblclick", "cellclick", "beforecellclick", "refresh",
      "itemremove", "itemadd", "itemupdate", "viewready", "beforerefresh",
      "unhighlightitem", "highlightitem", "focuschange",
      "containerkeydown", "containercontextmenu", "containerdblclick",
      "containerclick", "containermouseout", "containermouseover",
      "containermouseup", "containermousedown", "beforecontainerkeydown",
      "beforecontainercontextmenu", "beforecontainerdblclick",
      "beforecontainerclick", "beforecontainermouseout",
      "beforecontainermouseover", "beforecontainermouseup",
      "beforecontainermousedown", "itemkeydown", "itemcontextmenu",
      "itemdblclick", "itemclick", "itemmouseleave", "itemmouseenter",
      "itemmouseup", "itemmousedown", "rowclick", "rowcontextmenu",
      "rowdblclick", "rowkeydown", "rowmouseup", "rowmousedown",
      "rowkeydown", "beforeitemkeydown", "beforeitemcontextmenu",
      "beforeitemdblclick", "beforeitemclick", "beforeitemmouseleave",
      "beforeitemmouseenter", "beforeitemmouseup", "beforeitemmousedown",
      "statesave", "beforestatesave", "staterestore",
      "beforestaterestore", "uievent", "groupcollapse", "groupexpand",
      "scroll"
    ]
  },
  scrollable: true,
  componentLayout: "tableview",
  baseCls: "x-grid-view",
  unselectableCls: "x-unselectable",
  firstCls: "x-grid-cell-first",
  lastCls: "x-grid-cell-last",
  itemCls: "x-grid-item",
  selectedItemCls: "x-grid-item-selected",
  selectedCellCls: "x-grid-cell-selected",
  focusedItemCls: "x-grid-item-focused",
  overItemCls: "x-grid-item-over",
  altRowCls: "x-grid-item-alt",
  dirtyCls: "x-grid-dirty-cell",
  rowClsRe: new RegExp("(?:^|\\s*)x-grid-item-alt(?:\\s+|$)", "g"),
  cellRe: new RegExp("x-grid-cell-([^\\s]+)(?:\\s|$)", ""),
  positionBody: true,
  positionCells: false,
  stripeOnUpdate: null,
  actionableMode: false,
  trackOver: true,
  getRowClass: null,
  stripeRows: true,
  markDirty: true,
  ariaRole: "rowgroup",
  rowAriaRole: "row",
  cellAriaRole: "gridcell",
  tpl: ["{%", "view = values.view;", "if (!(columns = values.columns)) {",
    "columns = values.columns = view.ownerCt.getVisibleColumnManager().getColumns();",
    "}", "values.fullWidth = 0;",
    "for (i = 0, len = columns.length; i < len; i++) {",
    "column = columns[i];",
    "values.fullWidth += (column.cellWidth = column.lastBox ? column.lastBox.width : column.width || column.minWidth);",
    "}", "tableCls=values.tableCls=[];", "%}",
    '<div class="x-grid-item-container" role="presentation" style="width:{fullWidth}px">',
    "{[view.renderTHead(values, out, parent)]}", "{%",
    "view.renderRows(values.rows, values.columns, values.viewStartIndex, out);",
    "%}", "{[view.renderTFoot(values, out, parent)]}", "</div>", "{% ",
    "view = columns = column = null;", "%}", {
      definitions: "var view, tableCls, columns, i, len, column;",
      priority: 0
    }
  ],
  outerRowTpl: ['<table id="{rowId}" role="presentation" ',
    'data-boundView="{view.id}" ', 'data-recordId="{record.internalId}" ',
    'data-recordIndex="{recordIndex}" ',
    'class="{[values.itemClasses.join(" ")]}" cellpadding="0" cellspacing="0" style="{itemStyle};width:0">',
    "{%", "this.nextTpl.applyOut(values, out, parent)", "%}", "</table>", {
      priority: 9999
    }
  ],
  rowTpl: ["{%",
    'var dataRowCls = values.recordIndex === -1 ? "" : " x-grid-row";',
    "%}", '<tr class="{[values.rowClasses.join(" ")]} {[dataRowCls]}"',
    ' role="{rowRole}" {rowAttr:attributes}>', '<tpl for="columns">{%',
    "parent.view.renderCell(values, parent.record, parent.recordIndex, parent.rowIndex, xindex - 1, out, parent)",
    "%}", "</tpl>", "</tr>", {
      priority: 0
    }
  ],
  cellTpl: [
    '<td class="{tdCls}" role="{cellRole}" {tdAttr} {cellAttr:attributes}',
    ' style="width:{column.cellWidth}px;<tpl if="tdStyle">{tdStyle}</tpl>"',
    ' tabindex="-1" data-columnid="{[values.column.getItemId()]}">',
    '<div {unselectableAttr} class="x-grid-cell-inner {innerCls}" ',
    'style="text-align:{align};<tpl if="style">{style}</tpl>" ',
    "{cellInnerAttr:attributes}>{value}</div>", "</td>", {
      priority: 0
    }
  ],
  refreshSelmodelOnRefresh: false,
  tableValues: {},
  rowValues: {
    itemClasses: [],
    rowClasses: []
  },
  cellValues: {
    classes: ["x-grid-cell x-grid-td"]
  },
  constructor: function(a) {
    if (a.grid.isTree) {
      a.baseCls = "x-tree-view"
    }
    Ext.view.View.prototype.constructor.call(this, a)
  },
  hasVariableRowHeight: function(a) {
    var b = this;
    return b.variableRowHeight || b.store.isGrouped() || b.getVisibleColumnManager()
      .hasVariableRowHeight() || (!a && b.lockingPartner && b.lockingPartner
        .hasVariableRowHeight(true))
  },
  initComponent: function() {
    var a = this;
    if (a.columnLines) {
      a.addCls(a.grid.colLinesCls)
    }
    if (a.rowLines) {
      a.addCls(a.grid.rowLinesCls)
    }
    a.body = new Ext.dom.Fly();
    a.body.id = a.id + "gridBody";
    if (!a.trackOver) {
      a.overItemCls = null
    }
    a.headerCt.view = a;
    a.grid.view = a;
    a.initFeatures(a.grid);
    a.itemSelector = a.getItemSelector();
    a.all = new Ext.view.NodeCache(a);
    Ext.view.View.prototype.initComponent.call(this)
  },
  applySelectionModel: function(b, e) {
    var d = this,
      c = d.ownerGrid,
      f = b.type,
      a = d.disableSelection || c.disableSelection;
    if (!e) {
      if (!(b && b.isSelectionModel)) {
        b = c.selModel || b
      }
    }
    if (b) {
      if (b.isSelectionModel) {
        b.allowDeselect = c.allowDeselect || b.selectionMode !== "SINGLE";
        b.locked = a
      } else {
        if (typeof b === "string") {
          b = {
            type: b
          }
        } else {
          b.type = c.selType || b.selType || b.type || f
        }
        if (!b.mode) {
          if (c.simpleSelect) {
            b.mode = "SIMPLE"
          } else {
            if (c.multiSelect) {
              b.mode = "MULTI"
            }
          }
        }
        b = Ext.Factory.selection(Ext.apply({
          allowDeselect: c.allowDeselect,
          locked: a
        }, b))
      }
    }
    return b
  },
  updateSelectionModel: function(a, c) {
    var b = this;
    if (c) {
      c.un({
        scope: b,
        lastselectedchanged: b.updateBindSelection,
        selectionchange: b.updateBindSelection
      });
      Ext.destroy(b.selModelRelayer)
    }
    b.selModelRelayer = b.relayEvents(a, ["selectionchange",
      "beforeselect", "beforedeselect", "select", "deselect",
      "focuschange"
    ]);
    a.on({
      scope: b,
      lastselectedchanged: b.updateBindSelection,
      selectionchange: b.updateBindSelection
    });
    b.selModel = a
  },
  getVisibleColumnManager: function() {
    return this.ownerCt.getVisibleColumnManager()
  },
  getColumnManager: function() {
    return this.ownerCt.getColumnManager()
  },
  getTopLevelVisibleColumnManager: function() {
    return this.ownerGrid.getVisibleColumnManager()
  },
  moveColumn: function(a, t, h) {
    var s = this,
      q = h > 1,
      l = q && document.createRange ? document.createRange() : null,
      b = q && !l ? document.createDocumentFragment() : null,
      k = t,
      m = s.getGridColumns().length,
      r = m - 1,
      e = (s.firstCls || s.lastCls) && (t === 0 || t === m || a === 0 ||
        a === r),
      o, n, g, p, c, d, f;
    if (s.rendered && t !== a) {
      g = s.el.query(s.rowSelector);
      if (t > a && b) {
        k -= 1
      }
      for (o = 0, p = g.length; o < p; o++) {
        c = g[o];
        d = c.childNodes;
        if (e) {
          if (d.length === 1) {
            Ext.fly(d[0]).addCls(s.firstCls);
            Ext.fly(d[0]).addCls(s.lastCls);
            continue
          }
          if (a === 0) {
            Ext.fly(d[0]).removeCls(s.firstCls);
            Ext.fly(d[1]).addCls(s.firstCls)
          } else {
            if (a === r) {
              Ext.fly(d[r]).removeCls(s.lastCls);
              Ext.fly(d[r - 1]).addCls(s.lastCls)
            }
          }
          if (t === 0) {
            Ext.fly(d[0]).removeCls(s.firstCls);
            Ext.fly(d[a]).addCls(s.firstCls)
          } else {
            if (t === m) {
              Ext.fly(d[r]).removeCls(s.lastCls);
              Ext.fly(d[a]).addCls(s.lastCls)
            }
          }
        }
        if (q) {
          if (l) {
            l.setStartBefore(d[a]);
            l.setEndAfter(d[a + h - 1]);
            b = l.extractContents()
          } else {
            for (n = 0; n < h; n++) {
              b.appendChild(d[a])
            }
          }
          c.insertBefore(b, d[k] || null)
        } else {
          c.insertBefore(d[a], d[k] || null)
        }
      }
      f = s.el.query("colgroup");
      for (o = 0, p = f.length; o < p; o++) {
        c = f[o];
        if (q) {
          if (l) {
            l.setStartBefore(c.childNodes[a]);
            l.setEndAfter(c.childNodes[a + h - 1]);
            b = l.extractContents()
          } else {
            for (n = 0; n < h; n++) {
              b.appendChild(c.childNodes[a])
            }
          }
          c.insertBefore(b, c.childNodes[k] || null)
        } else {
          c.insertBefore(c.childNodes[a], c.childNodes[k] || null)
        }
      }
    }
  },
  scrollToTop: Ext.emptyFn,
  addElListener: function(a, c, b) {
    this.mon(this, a, c, b, {
      element: "el"
    })
  },
  getGridColumns: function() {
    return this.ownerCt.getVisibleColumnManager().getColumns()
  },
  getHeaderAtIndex: function(a) {
    return this.ownerCt.getVisibleColumnManager().getHeaderAtIndex(a)
  },
  getCell: function(a, b) {
    var c = this.getRow(a);
    return Ext.fly(c).down(b.getCellSelector())
  },
  getFeature: function(b) {
    var a = this.featuresMC;
    if (a) {
      return a.get(b)
    }
  },
  findFeature: function(a) {
    if (this.features) {
      return Ext.Array.findBy(this.features, function(b) {
        if (b.ftype === a) {
          return true
        }
      })
    }
  },
  initFeatures: function(d) {
    var f = this,
      c, e, b, a;
    f.tpl = Ext.XTemplate.getTpl(this, "tpl");
    f.rowTpl = Ext.XTemplate.getTpl(this, "rowTpl");
    f.addRowTpl(Ext.XTemplate.getTpl(this, "outerRowTpl"));
    f.cellTpl = Ext.XTemplate.getTpl(this, "cellTpl");
    f.featuresMC = new Ext.util.MixedCollection();
    e = f.features = f.constructFeatures();
    a = e ? e.length : 0;
    for (c = 0; c < a; c++) {
      b = e[c];
      b.view = f;
      b.grid = d;
      f.featuresMC.add(b);
      b.init(d)
    }
  },
  renderTHead: function(b, c, e) {
    var f = b.view.headerFns,
      a, d;
    if (f) {
      for (d = 0, a = f.length; d < a; ++d) {
        f[d].call(this, b, c, e)
      }
    }
  },
  addHeaderFn: function(a) {
    var b = this.headerFns;
    if (!b) {
      b = this.headerFns = []
    }
    b.push(a)
  },
  renderTFoot: function(b, c, e) {
    var f = b.view.footerFns,
      a, d;
    if (f) {
      for (d = 0, a = f.length; d < a; ++d) {
        f[d].call(this, b, c, e)
      }
    }
  },
  addFooterFn: function(a) {
    var b = this.footerFns;
    if (!b) {
      b = this.footerFns = []
    }
    b.push(a)
  },
  addTpl: function(a) {
    return this.insertTpl("tpl", a)
  },
  addRowTpl: function(a) {
    return this.insertTpl("rowTpl", a)
  },
  addCellTpl: function(a) {
    return this.insertTpl("cellTpl", a)
  },
  insertTpl: function(e, d) {
    var c = this,
      a, b;
    if (d.isTemplate) {
      d = Ext.Object.chain(d)
    } else {
      d = new Ext.XTemplate(
        "{%this.nextTpl.applyOut(values, out, parent);%}", d)
    }
    for (a = c[e]; d.priority < a.priority; a = a.nextTpl) {
      b = a
    }
    if (b) {
      b.nextTpl = d
    } else {
      c[e] = d
    }
    d.nextTpl = a;
    return d
  },
  tplApplyOut: function(a, b, c) {
    if (this.before) {
      if (this.before(a, b, c) === false) {
        return
      }
    }
    this.nextTpl.applyOut(a, b, c);
    if (this.after) {
      this.after(a, b, c)
    }
  },
  constructFeatures: function() {
    var f = this,
      e = f.features,
      d, b, c = 0,
      a;
    if (e) {
      b = [];
      a = e.length;
      for (; c < a; c++) {
        d = e[c];
        if (!d.isFeature) {
          d = Ext.create("feature." + d.ftype, d)
        }
        b[c] = d
      }
    }
    return b
  },
  beforeRender: function() {
    Ext.view.View.prototype.beforeRender.call(this);
    if (!this.enableTextSelection) {
      this.protoEl.unselectable()
    }
  },
  getElConfig: function() {
    var a = Ext.view.View.prototype.getElConfig.call(this);
    delete a["aria-hidden"];
    delete a["aria-disabled"];
    return a
  },
  onBindStore: function(a) {
    var b = this,
      c = b.bufferedRenderer;
    if (c && c.store !== a) {
      c.bindStore(a)
    }
    if (b.all && b.all.getCount()) {
      if (c) {
        c.setBodyTop(0)
      }
      b.clearViewEl()
    }
    Ext.view.View.prototype.onBindStore.apply(this, arguments)
  },
  getStoreListeners: function() {
    var a = Ext.view.View.prototype.getStoreListeners.call(this);
    if (this.bufferedRenderer) {
      delete a.clear
    }
    a.beforepageremove = this.beforePageRemove;
    return a
  },
  beforePageRemove: function(c, b) {
    var d = this.all,
      a = c.getPageSize();
    if (d.startIndex >= (b - 1) * a && d.endIndex <= (b * a - 1)) {
      c.get(b);
      return false
    }
  },
  onViewScroll: function(b, a, c) {
    if (!this.ignoreScroll) {
      Ext.view.View.prototype.onViewScroll.call(this, b, a, c)
    }
  },
  createRowElement: function(b, c, d) {
    var e = this,
      f = e.renderBuffer,
      a = e.collectData([b], c);
    a.columns = d;
    e.tpl.overwrite(f, a);
    e.cleanupData();
    return Ext.fly(f).down(e.getNodeContainerSelector(), true).firstChild
  },
  bufferRender: function(c, d) {
    var e = this,
      f = e.renderBuffer,
      a, b = document.createRange ? document.createRange() : null;
    e.tpl.overwrite(f, e.collectData(c, d));
    e.cleanupData();
    Ext.fly(f).saveTabbableState({
      skipSelf: true,
      includeHidden: true
    });
    f = Ext.fly(f).down(e.getNodeContainerSelector(), true);
    if (b) {
      b.selectNodeContents(f);
      a = b.extractContents()
    } else {
      a = document.createDocumentFragment();
      while (f.firstChild) {
        a.appendChild(f.firstChild)
      }
    }
    return {
      fragment: a,
      children: Ext.Array.toArray(a.childNodes)
    }
  },
  collectData: function(a, c) {
    var b = this;
    b.rowValues.view = b;
    b.tableValues.view = b;
    b.tableValues.rows = a;
    b.tableValues.columns = null;
    b.tableValues.viewStartIndex = c;
    b.tableValues.touchScroll = b.touchScroll;
    b.tableValues.tableStyle = "width:" + b.headerCt.getTableWidth() +
      "px";
    return b.tableValues
  },
  cleanupData: function() {
    var a = this.tableValues;
    a.view = a.columns = a.rows = this.rowValues.view = null
  },
  refreshSize: function(c) {
    var b = this,
      a = b.getBodySelector();
    if (a) {
      b.body.attach(b.el.down(a, true))
    }
    if (!b.hasLoadingHeight) {
      Ext.suspendLayouts();
      Ext.view.View.prototype.refreshSize.apply(this, arguments);
      if (c || (b.hasVariableRowHeight() && b.dataSource.getCount())) {
        b.grid.updateLayout()
      }
      Ext.resumeLayouts(true)
    }
  },
  clearViewEl: function(h) {
    var e = this,
      c = e.all,
      a = e.getStore(),
      b, d, f, g;
    if (e.hasListeners.itemremove) {
      for (b = c.startIndex; b <= c.endIndex; b++) {
        d = c.item(b, true);
        e.fireEvent("itemremove", a.getByInternalId(d.getAttribute(
          "data-recordId")), b, d, e)
      }
    }
    Ext.view.View.prototype.clearViewEl.call(this);
    f = Ext.fly(e.getNodeContainer());
    if (f && !h) {
      g = e.getTargetEl();
      if (g.dom !== f.dom) {
        f.destroy()
      }
    }
  },
  getMaskTarget: function() {
    return this.ownerCt.body
  },
  statics: {
    getBoundView: function(a) {
      return Ext.getCmp(a.getAttribute("data-boundView"))
    }
  },
  getRecord: function(c) {
    var b = this,
      a;
    if (b.store.destroyed) {
      return
    }
    if (c.isModel) {
      return c
    }
    c = b.getNode(c);
    if (c) {
      if (!b.hasActiveFeature()) {
        a = c.getAttribute("data-recordIndex");
        if (a) {
          a = parseInt(a, 10);
          if (a > -1) {
            return b.store.data.getAt(a)
          }
        }
      }
      return b.dataSource.getByInternalId(c.getAttribute("data-recordId"))
    }
  },
  indexOf: function(a) {
    a = this.getNode(a);
    if (!a && a !== 0) {
      return -1
    }
    return this.all.indexOf(a)
  },
  indexInStore: function(a) {
    return a ? this.dataSource.indexOf(this.getRecord(a)) : -1
  },
  indexOfRow: function(b) {
    var c = this.dataSource,
      a;
    if (b.isCollapsedPlaceholder) {
      a = c.indexOfPlaceholder(b)
    } else {
      a = c.indexOf(b)
    }
    return a
  },
  renderRows: function(g, e, d, b) {
    var f = this,
      h = f.rowValues,
      a = g.length,
      c;
    h.view = f;
    h.columns = e;
    h.rowRole = f.rowAriaRole;
    f.cellValues.cellRole = f.cellAriaRole;
    for (c = 0; c < a; c++, d++) {
      h.itemClasses.length = h.rowClasses.length = 0;
      f.renderRow(g[c], d, b)
    }
    h.view = h.columns = h.record = null
  },
  renderColumnSizer: function(b, c) {
    var e = b.columns || this.getGridColumns(),
      a = e.length,
      d, g, f;
    c.push('<colgroup role="presentation">');
    for (d = 0; d < a; d++) {
      g = e[d];
      f = g.cellWidth ? g.cellWidth : Ext.grid.header.Container.prototype
        .defaultWidth;
      c.push('<col role="presentation" class="', "x-", "grid-cell-", e[d]
        .getItemId(), '" style="width:' + f + 'px">')
    }
    c.push("</colgroup>")
  },
  renderRow: function(g, a, f) {
    var i = this,
      e = a === -1,
      h = i.selectionModel,
      l = i.rowValues,
      d = l.itemClasses,
      c = l.rowClasses,
      b = i.itemCls,
      k, j = i.rowTpl;
    l.rowAttr = {};
    l.record = g;
    l.recordId = g.internalId;
    l.recordIndex = i.store.indexOf(g);
    l.rowIndex = a;
    l.rowId = i.getRowId(g);
    l.itemCls = l.rowCls = "";
    if (!l.columns) {
      l.columns = i.ownerCt.getVisibleColumnManager().getColumns()
    }
    d.length = c.length = 0;
    if (!e) {
      d[0] = b;
      if (!i.ownerCt.disableSelection && h.isRowSelected) {
        if (h.isRowSelected(g)) {
          d.push(i.selectedItemCls)
        }
      }
      if (i.stripeRows && a % 2 !== 0) {
        d.push(i.altRowCls)
      }
      if (i.getRowClass) {
        k = i.getRowClass(g, a, null, i.dataSource);
        if (k) {
          c.push(k)
        }
      }
    }
    if (f) {
      j.applyOut(l, f, i.tableValues)
    } else {
      return j.apply(l, i.tableValues)
    }
  },
  renderCell: function(d, g, f, m, i, e) {
    var k = this,
      b, h = k.selectionModel,
      j = k.cellValues,
      c = j.classes,
      a = g.data[d.dataIndex],
      n = k.cellTpl,
      o, l, p = k.navigationModel.getPosition();
    j.record = g;
    j.column = d;
    j.recordIndex = f;
    j.rowIndex = m;
    j.columnIndex = j.cellIndex = i;
    j.align = d.align;
    j.innerCls = d.innerCls;
    j.tdCls = j.tdStyle = j.tdAttr = j.style = "";
    j.unselectableAttr = k.enableTextSelection ? "" : 'unselectable="on"';
    c[1] = d.getCellId();
    l = 2;
    if (d.renderer && d.renderer.call) {
      b = k.ownerCt.columnManager.getHeaderIndex(d);
      o = d.renderer.call(d.usingDefaultRenderer ? d : d.scope || k.ownerCt,
        a, j, g, f, b, k.dataSource, k);
      if (j.css) {
        g.cssWarning = true;
        j.tdCls += " " + j.css;
        j.css = null
      }
      if (j.tdCls) {
        c[l++] = j.tdCls
      }
    } else {
      o = a
    }
    j.value = (o == null || o === "") ? d.emptyCellText : o;
    if (d.tdCls) {
      c[l++] = d.tdCls
    }
    if (k.markDirty && g.dirty && g.isModified(d.dataIndex)) {
      c[l++] = k.dirtyCls
    }
    if (d.isFirstVisible) {
      c[l++] = k.firstCls
    }
    if (d.isLastVisible) {
      c[l++] = k.lastCls
    }
    if (!k.enableTextSelection) {
      c[l++] = k.unselectableCls
    }
    if (h && (h.isCellModel || h.isSpreadsheetModel) && h.isCellSelected(
        k, f, d)) {
      c[l++] = k.selectedCellCls
    }
    if (p && p.record.id === g.id && p.column === d) {
      c[l++] = k.focusedItemCls
    }
    c.length = l;
    j.tdCls = c.join(" ");
    n.applyOut(j, e);
    j.column = j.record = null
  },
  getRow: function(a) {
    var b;
    if ((!a && a !== 0) || !this.rendered) {
      return null
    }
    if (a.target) {
      a = a.target
    }
    if (Ext.isString(a)) {
      return Ext.fly(a).down(this.rowSelector, true)
    }
    if (Ext.isNumber(a)) {
      b = this.all.item(a);
      return b && b.down(this.rowSelector, true)
    }
    if (a.isModel) {
      return this.getRowByRecord(a)
    }
    b = Ext.fly(a);
    if (b.is(this.itemSelector)) {
      return this.getRowFromItem(b)
    }
    return b.findParent(this.rowSelector, this.getTargetEl())
  },
  getRowId: function(a) {
    return this.id + "-record-" + a.internalId
  },
  constructRowId: function(a) {
    return this.id + "-record-" + a
  },
  getNodeById: function(a) {
    a = this.constructRowId(a);
    return this.retrieveNode(a, false)
  },
  getRowById: function(a) {
    a = this.constructRowId(a);
    return this.retrieveNode(a, true)
  },
  getNodeByRecord: function(a) {
    return this.retrieveNode(this.getRowId(a), false)
  },
  getRowByRecord: function(a) {
    return this.retrieveNode(this.getRowId(a), true)
  },
  getRowFromItem: function(c) {
    var d = Ext.getDom(c).tBodies[0].childNodes,
      a = d.length,
      b;
    for (b = 0; b < a; b++) {
      if (Ext.fly(d[b]).is(this.rowSelector)) {
        return d[b]
      }
    }
  },
  retrieveNode: function(c, b) {
    var a = this.el.getById(c, true);
    if (b && a) {
      return Ext.fly(a).down(this.rowSelector, true)
    }
    return a
  },
  updateIndexes: Ext.emptyFn,
  bodySelector: "div.x-grid-item-container",
  nodeContainerSelector: "div.x-grid-item-container",
  itemSelector: "table.x-grid-item",
  rowSelector: "tr.x-grid-row",
  cellSelector: "td.x-grid-cell",
  sizerSelector: ".x-grid-cell",
  innerSelector: "div.x-grid-cell-inner",
  getBodySelector: function() {
    return this.bodySelector
  },
  getColumnSizerSelector: function(b) {
    var a = this.sizerSelector + "-" + b.getItemId();
    return "td" + a + ",col" + a
  },
  getItemSelector: function() {
    return this.itemSelector
  },
  getCellSelector: function(a) {
    return a ? a.getCellSelector() : this.cellSelector
  },
  getCellInnerSelector: function(a) {
    return this.getCellSelector(a) + " " + this.innerSelector
  },
  addRowCls: function(b, a) {
    var c = this.getRow(b);
    if (c) {
      Ext.fly(c).addCls(a)
    }
  },
  removeRowCls: function(b, a) {
    var c = this.getRow(b);
    if (c) {
      Ext.fly(c).removeCls(a)
    }
  },
  onRowSelect: function(c) {
    var b = this,
      a;
    b.addItemCls(c, b.selectedItemCls);
    a = b.getRow(c);
    if (a) {
      a.setAttribute("aria-selected", true)
    }
    if (Ext.isIE8) {
      b.repaintBorder(c + 1)
    }
  },
  onRowDeselect: function(c) {
    var b = this,
      a;
    b.removeItemCls(c, b.selectedItemCls);
    a = b.getRow(c);
    if (a) {
      a.removeAttribute("aria-selected")
    }
    if (Ext.isIE8) {
      b.repaintBorder(c + 1)
    }
  },
  onCellSelect: function(b) {
    var a = this.getCellByPosition(b);
    if (a) {
      a.addCls(this.selectedCellCls);
      a.dom.setAttribute("aria-selected", true)
    }
  },
  onCellDeselect: function(b) {
    var a = this.getCellByPosition(b, true);
    if (a) {
      Ext.fly(a).removeCls(this.selectedCellCls);
      a.removeAttribute("aria-selected")
    }
  },
  getCellInclusive: function(a, b) {
    if (a) {
      var c = this.getRow(a.row),
        d = this.ownerCt.getColumnManager().getHeaderAtIndex(a.column);
      if (d && c) {
        return Ext.fly(c).down(this.getCellSelector(d), b)
      }
    }
    return false
  },
  getCellByPosition: function(a, c) {
    if (a) {
      var b = a.view || this,
        d = b.getRow(a.record || a.row),
        e = a.column.isColumn ? a.column : b.getVisibleColumnManager().getHeaderAtIndex(
          a.column);
      if (e && d) {
        return Ext.fly(d).down(b.getCellSelector(e), c)
      }
    }
    return false
  },
  onFocusEnter: function(d) {
    var f = this,
      h = d.fromComponent,
      j = f.getNavigationModel(),
      b, k = f.bufferedRenderer,
      g, a, i, c;
    if (f.actionableMode) {
      return
    }
    d = d.event;
    if (!f.cellFocused && f.all.getCount() && f.dataSource.getCount()) {
      i = d.getTarget();
      if (Ext.fly(i).is(f.getCellSelector())) {
        b = new Ext.grid.CellContext(f).setPosition(f.getRecord(i), f.getHeaderByCell(
          i))
      } else {
        if (i && f.el.contains(i) && i !== f.el.dom) {
          f.ownerGrid.setActionableMode(true, new Ext.grid.CellContext(f)
            .setPosition(f.getRecord(i), f.getHeaderByCell(Ext.fly(i).up(
              f.getCellSelector()))));
          i.focus()
        } else {
          b = f.lastFocused;
          if (b) {
            c = f.getScrollable();
            if (!c || c.isInView(b.getRow()).y) {
              g = b.record
            }
          } else {
            b = new Ext.grid.CellContext((f.isNormalView && f.lockingPartner
              .grid.isVisible()) ? f.lockingPartner : f).setColumn(0)
          }
          if (h && h.isColumn && h.getView() === f) {
            b.view = f;
            b.setColumn(h)
          }
          if (!g) {
            a = k ? k.getFirstVisibleRowIndex() : 0;
            g = f.dataSource.getAt(a);
            while (g && g.isNonData) {
              a++;
              g = f.dataSource.getAt(a)
            }
            if (g) {
              b.setRow(g)
            } else {
              b = null
            }
          }
          if (!b) {
            d.stopEvent();
            f.el.dom.focus();
            return
          }
        }
      }
    }
    if (b) {
      j.setPosition(b, null, d, null, true);
      f.cellFocused = !!j.getPosition();
      if (f.cellFocused) {
        f.el.dom.setAttribute("tabIndex", "-1");
        f.toggleChildrenTabbability(false)
      }
    }
    Ext.Component.prototype.onFocusEnter.call(f, d)
  },
  onFocusLeave: function(c) {
    var b = this,
      a = !b.lockingPartner || !c.toComponent || (c.toComponent !== b.lockingPartner &&
        !b.lockingPartner.isAncestor(c.toComponent));
    if (!b.refreshing) {
      if (b.cellFocused) {
        if (a) {
          b.getNavigationModel().setPosition(null, null, c.event, null,
            true)
        }
        b.cellFocused = false;
        b.focusEl = b.el;
        b.focusEl.dom.setAttribute("tabIndex", 0)
      }
      if (a) {
        if (b.ownerGrid.actionableMode) {
          b.ownerGrid.setActionableMode(false)
        }
      }
      Ext.Component.prototype.onFocusLeave.call(b, c)
    }
  },
  onRowFocus: function(d, b, a) {
    var c = this;
    if (b) {
      c.addItemCls(d, c.focusedItemCls);
      if (!a) {
        c.focusRow(d)
      }
    } else {
      c.removeItemCls(d, c.focusedItemCls)
    }
    if (Ext.isIE8) {
      c.repaintBorder(d + 1)
    }
  },
  focusRow: function(d, a) {
    var c = this,
      b = c.getFocusTask();
    if (a) {
      b.delay(Ext.isNumber(a) ? a : 10, c.focusRow, c, [d, false]);
      return
    }
    b.cancel();
    if (c.isVisible(true)) {
      c.getNavigationModel().setPosition(c.getRecord(d))
    }
  },
  focusNode: function(b, a) {
    this.focusRow(b, a)
  },
  scrollRowIntoView: function(b, a) {
    b = this.getRow(b);
    if (b) {
      this.scrollElIntoView(b, false, a)
    }
  },
  focusCell: function(b, c) {
    var e = this,
      a, d = e.getFocusTask();
    if (c) {
      d.delay(Ext.isNumber(c) ? c : 10, e.focusCell, e, [b, false]);
      return
    }
    d.cancel();
    if (e.isVisible(true) && (a = e.getCellByPosition(b))) {
      e.getNavigationModel().setPosition(b)
    }
  },
  getLastFocused: function() {
    var b = this,
      a = b.lastFocused;
    if (a && a.record && a.column) {
      if (b.dataSource.indexOf(a.record) !== -1 && b.getVisibleColumnManager()
        .indexOf(a.column) !== -1 && b.getNode(a.record)) {
        return a
      }
    }
  },
  scrollCellIntoView: function(a, b) {
    if (a.isCellContext) {
      a = this.getCellByPosition(a)
    }
    if (a) {
      this.scrollElIntoView(a, null, b)
    }
  },
  scrollElIntoView: function(c, d, b) {
    var a = this.getScrollable();
    if (a) {
      a.scrollIntoView(c, d, b)
    }
  },
  syncRowHeightBegin: function() {
    var f = this,
      h = f.all,
      e = h.count,
      c = [],
      g = Ext.grid.locking.RowSynchronizer,
      b, a, d;
    for (b = 0, a = h.startIndex; b < e; b++, a++) {
      c[b] = d = new g(f, h.elements[a]);
      d.reset()
    }
    return c
  },
  syncRowHeightClear: function(b) {
    var d = this,
      e = d.all,
      c = e.count,
      a;
    for (a = 0; a < c; a++) {
      b[a].reset()
    }
  },
  syncRowHeightMeasure: function(b) {
    var c = b.length,
      a;
    for (a = 0; a < c; a++) {
      b[a].measure()
    }
  },
  syncRowHeightFinish: function(b, d) {
    var c = b.length,
      e = this.bufferedRenderer,
      a;
    for (a = 0; a < c; a++) {
      b[a].finish(d[a])
    }
    if (e) {
      e.syncRowHeightsFinish()
    }
  },
  handleUpdate: function(o, g, r, B) {
    r = r || Ext.data.Model.EDIT;
    var J = this,
      h = J.store.indexOf(g),
      u = J.rowTpl,
      m = J.markDirty,
      y = J.dirtyCls,
      C = r !== Ext.data.Model.EDIT,
      x = [],
      z = J.variableRowHeight,
      v = 0,
      G = J.ownerCt,
      d = J.cellFly || (J.self.prototype.cellFly = new Ext.dom.Fly()),
      s, p, j, q, E, H, l, w, c, f, F, D, n, b, e, A, I, a, k, t;
    if (J.viewReady) {
      s = J.getNodeByRecord(g);
      if (s) {
        w = J.overItemCls;
        c = J.ownerCt.getVisibleColumnManager().getColumns();
        for (D = 0, F = c.length; D < F; D++) {
          f = c[D];
          if (f.preventUpdate) {
            b = Ext.fly(s).down(f.getCellSelector(), true);
            if (!C && m) {
              d.attach(b);
              if (g.isModified(f.dataIndex)) {
                d.addCls(y)
              } else {
                d.removeCls(y)
              }
            }
          } else {
            n = J.shouldUpdateCell(g, f, B);
            if (n) {
              v = v | n;
              x[x.length] = f;
              z = z || f.variableRowHeight
            }
          }
        }
        J.fireEvent("beforeitemupdate", g, h, s, x);
        if (J.getRowClass || !J.getRowFromItem(s) || (v & 1) || (s.tBodies[
            0].childNodes.length > 1)) {
          k = s._extData;
          j = J.createRowElement(g, J.indexOfRow(g), x);
          if (Ext.fly(s, "_internal").hasCls(w)) {
            Ext.fly(j).addCls(w)
          }
          if (Ext.isIE9m && s.mergeAttributes) {
            s.mergeAttributes(j, true)
          } else {
            q = j.attributes;
            E = q.length;
            for (l = 0; l < E; l++) {
              H = q[l].name;
              if (H !== "id") {
                s.setAttribute(H, q[l].value)
              }
            }
          }
          if (k) {
            k.isSynchronized = false
          }
          if (c.length && (p = J.getRow(s))) {
            J.updateColumns(p, Ext.fly(j).down(J.rowSelector, true), x)
          }
          while (u) {
            if (u.syncContent) {
              if (u.syncContent(s, j, B ? x : null) === false) {
                break
              }
            }
            u = u.nextTpl
          }
        } else {
          for (D = 0, F = x.length; D < F; D++) {
            f = x[D];
            e = f.dataIndex;
            A = g.get(e);
            b = Ext.fly(s).down(f.getCellSelector(), true);
            d.attach(b);
            if (!C && m) {
              if (g.isModified(f.dataIndex)) {
                d.addCls(y)
              } else {
                d.removeCls(y)
              }
            }
            I = f.usingDefaultRenderer;
            a = I ? f : f.scope;
            if (f.updater) {
              Ext.callback(f.updater, a, [b, A, g, J, J.dataSource], 0, f,
                G)
            } else {
              if (f.renderer) {
                A = Ext.callback(f.renderer, a, [A, null, g, 0, 0, J.dataSource,
                  J
                ], 0, f, G)
              }
              t = A == null || A === "";
              A = t ? f.emptyCellText : A;
              if (f.producesHTML || t) {
                d.down(J.innerSelector, true).innerHTML = A
              } else {
                d.down(J.innerSelector, true).childNodes[0].data = A
              }
            }
            if (J.highlightClass) {
              Ext.fly(b).addCls(J.highlightClass);
              if (!J.changedCells) {
                J.self.prototype.changedCells = [];
                J.prototype.clearChangedTask = new Ext.util.DelayedTask(J
                  .clearChangedCells, J.prototype);
                J.clearChangedTask.delay(J.unhighlightDelay)
              }
              J.changedCells.push({
                cell: b,
                cls: J.highlightClass,
                expires: Ext.Date.now() + 1000
              })
            }
          }
        }
        if (C && m && !g.dirty) {
          Ext.fly(s, "_internal").select("." + y).removeCls(y)
        }
        if (z) {
          Ext.suspendLayouts()
        }
        J.fireEvent("itemupdate", g, h, s);
        if (z) {
          if (J.bufferedRenderer) {
            J.bufferedRenderer.refreshSize();
            J.ownerGrid.updateLayout()
          } else {
            J.refreshSize()
          }
          Ext.resumeLayouts(true)
        }
      }
    }
  },
  clearChangedCells: function() {
    var d = this,
      b = Ext.Date.now(),
      e;
    for (var c = 0, a = d.changedCells.length; c < a;) {
      e = d.changedCells[c];
      if (e.expires <= b) {
        Ext.fly(e.cell).removeCls(e.highlightClass);
        Ext.Array.erase(d.changedCells, c, 1);
        a--
      } else {
        break
      }
    }
    if (a) {
      d.clearChangedTask.delay(d.unhighlightDelay)
    }
  },
  updateColumns: function(i, j, k) {
    var h = this,
      b, a, g, c, m = k.length,
      l, d, n, f, e = h.getCellSelector();
    if (i.mergeAttributes) {
      i.mergeAttributes(j, true)
    } else {
      b = j.attributes;
      a = b.length;
      for (c = 0; c < a; c++) {
        g = b[c].name;
        if (g !== "id") {
          i.setAttribute(g, b[c].value)
        }
      }
    }
    for (l = 0; l < m; l++) {
      d = k[l];
      e = h.getCellSelector(d);
      n = Ext.fly(i).selectNode(e);
      f = Ext.fly(j).selectNode(e);
      Ext.fly(n).syncContent(f)
    }
  },
  shouldUpdateCell: function(b, e, d) {
    if (!e.preventUpdate) {
      if (e.hasCustomRenderer) {
        return 1
      }
      if (d) {
        var a = d.length,
          c, f;
        for (c = 0; c < a; ++c) {
          f = d[c];
          if (f === e.dataIndex || f === b.idProperty) {
            return 2
          }
        }
      } else {
        return 2
      }
    }
    return 0
  },
  refresh: function() {
    var b = this,
      a;
    if (b.destroying) {
      return
    }
    Ext.view.View.prototype.refresh.apply(this, arguments);
    b.headerCt.setSortState();
    if (b.touchScroll && b.el && !b.all.getCount() && b.headerCt && b.headerCt
      .tooNarrow) {
      a = b.getScrollable();
      if (a && a.isTouchScroller) {
        a.setSize({
          x: b.headerCt.getTableWidth(),
          y: a.getSize().y
        })
      }
    }
  },
  processContainerEvent: function(b) {
    var a = Ext.Component.fromElement(b.target.parentNode);
    if (a && a.up(this.ownerCt)) {
      return false
    }
  },
  processItemEvent: function(b, q, k, p) {
    var t = this,
      m = t.self,
      s = m.EventMap,
      d = p.type,
      g = t.features,
      o = g.length,
      n, j, l, f, c, r = p.position = t.eventPosition || (t.eventPosition =
        new Ext.grid.CellContext()),
      h, a;
    if (Ext.isIE && d === "mouseup" && !p.within(t.el)) {
      return false
    }
    if (t.indexInStore(q) !== -1) {
      h = r.rowElement = Ext.fly(q).down(t.rowSelector, true);
      a = p.getTarget(t.getCellSelector(), h);
      d = m.TouchEventMap[d] || d;
      if (a) {
        if (!a.parentNode) {
          return false
        }
        c = t.getHeaderByCell(a);
        j = t.ownerCt.getColumnManager().getHeaderIndex(c)
      } else {
        j = -1
      }
      r.setAll(t, k, c ? t.getVisibleColumnManager().getHeaderIndex(c) :
        -1, b, c);
      r.cellElement = a;
      l = t.fireEvent("uievent", d, t, a, k, j, p, b, h);
      if ((l === false || Ext.view.View.prototype.processItemEvent.apply(
          this, arguments) === false)) {
        return false
      }
      for (n = 0; n < o; ++n) {
        f = g[n];
        if (f.wrapsItem) {
          if (f.vetoEvent(b, h, k, p) === false) {
            t.processSpecialEvent(p);
            return false
          }
        }
      }
      if (a && d !== "mouseover" && d !== "mouseout") {
        l = !((t["onBeforeCell" + s[d]](a, j, b, h, k, p) === false) || (
            t.fireEvent("beforecell" + d, t, a, j, b, h, k, p) ===
            false) || (t["onCell" + s[d]](a, j, b, h, k, p) === false) ||
          (t.fireEvent("cell" + d, t, a, j, b, h, k, p) === false))
      }
      if (l !== false) {
        l = t.fireEvent("row" + d, t, b, h, k, p)
      }
      return l
    } else {
      this.processSpecialEvent(p);
      p.preventDefault();
      return false
    }
  },
  processSpecialEvent: function(h) {
    var l = this,
      c = l.features,
      k = c.length,
      m = h.type,
      d, n, f, g, b, j, a = l.ownerCt;
    Ext.view.View.prototype.processSpecialEvent.apply(this, arguments);
    if (m === "mouseover" || m === "mouseout") {
      return
    }
    m = l.self.TouchEventMap[m] || m;
    for (d = 0; d < k; d++) {
      n = c[d];
      if (n.hasFeatureEvent) {
        g = h.getTarget(n.eventSelector, l.getTargetEl());
        if (g) {
          f = n.eventPrefix;
          b = n.getFireEventArgs("before" + f + m, l, g, h);
          j = n.getFireEventArgs(f + m, l, g, h);
          if ((l.fireEvent.apply(l, b) === false) || (a.fireEvent.apply(a,
              b) === false) || (l.fireEvent.apply(l, j) === false) || (a.fireEvent
              .apply(a, j) === false)) {
            return false
          }
        }
      }
    }
    return true
  },
  onCellMouseDown: Ext.emptyFn,
  onCellLongPress: Ext.emptyFn,
  onCellMouseUp: Ext.emptyFn,
  onCellClick: Ext.emptyFn,
  onCellDblClick: Ext.emptyFn,
  onCellContextMenu: Ext.emptyFn,
  onCellKeyDown: Ext.emptyFn,
  onCellKeyUp: Ext.emptyFn,
  onCellKeyPress: Ext.emptyFn,
  onBeforeCellMouseDown: Ext.emptyFn,
  onBeforeCellLongPress: Ext.emptyFn,
  onBeforeCellMouseUp: Ext.emptyFn,
  onBeforeCellClick: Ext.emptyFn,
  onBeforeCellDblClick: Ext.emptyFn,
  onBeforeCellContextMenu: Ext.emptyFn,
  onBeforeCellKeyDown: Ext.emptyFn,
  onBeforeCellKeyUp: Ext.emptyFn,
  onBeforeCellKeyPress: Ext.emptyFn,
  expandToFit: function(a) {
    this.autoSizeColumn(a)
  },
  autoSizeColumn: function(a) {
    if (Ext.isNumber(a)) {
      a = this.getGridColumns()[a]
    }
    if (a) {
      if (a.isGroupHeader) {
        a.autoSize();
        return
      }
      delete a.flex;
      a.setWidth(this.getMaxContentWidth(a))
    }
  },
  getMaxContentWidth: function(d) {
    var f = this,
      k = f.el.query(d.getCellInnerSelector()),
      b = d.getWidth(),
      c = 0,
      e = k.length,
      a = f.body.select(f.getColumnSizerSelector(d)),
      h = Math.max,
      g = 0,
      j;
    if (e > 0) {
      if (Ext.supports.ScrollWidthInlinePaddingBug) {
        g += f.getCellPaddingAfter(k[0])
      }
      if (f.columnLines) {
        g += Ext.fly(k[0].parentNode).getBorderWidth("lr")
      }
    }
    a.setWidth(1);
    d.textEl.setStyle({
      "text-overflow": "clip",
      display: "table-cell"
    });
    j = d.textEl.dom.offsetWidth + d.titleEl.getPadding("lr");
    d.textEl.setStyle({
      "text-overflow": "",
      display: ""
    });
    for (; c < e; c++) {
      j = h(j, k[c].scrollWidth)
    }
    j += g;
    j = h(j + 1, 40);
    a.setWidth(b);
    return j
  },
  getPositionByEvent: function(f) {
    var d = this,
      b = f.getTarget(d.cellSelector),
      c = f.getTarget(d.itemSelector),
      a = d.getRecord(c),
      g = d.getHeaderByCell(b);
    return d.getPosition(a, g)
  },
  getHeaderByCell: function(a) {
    if (a) {
      return this.ownerCt.getVisibleColumnManager().getHeaderById(Ext.getDom(
        a).getAttribute("data-columnId"))
    }
    return false
  },
  walkCells: function(g, h, c, i) {
    var f = this,
      j = g.clone(),
      e = f.lockingPartner && f.lockingPartner.grid.isVisible() ? f.lockingPartner :
      null,
      b = g.rowIdx,
      a = f.dataSource.getCount() - 1,
      d = f.ownerCt.getVisibleColumnManager().getColumns();
    switch (h.toLowerCase()) {
      case "right":
        if (g.isLastColumn()) {
          b = e && f.isLockedView ? b : b + 1;
          if (b > a) {
            return false
          }
          if (e) {
            j.view = e
          }
          j.setPosition(b, 0)
        } else {
          j.navigate(+1)
        }
        break;
      case "left":
        if (g.isFirstColumn()) {
          b = e && f.isNormalView ? b : b - 1;
          if (b < 0) {
            return false
          }
          if (e) {
            j.view = e;
            d = e.getVisibleColumnManager().getColumns()
          }
          j.setPosition(b, d[d.length - 1])
        } else {
          j.navigate(-1)
        }
        break;
      case "up":
        if (b === 0) {
          return false
        } else {
          j.setRow(b - 1)
        }
        break;
      case "down":
        if (b === a) {
          return false
        } else {
          j.setRow(b + 1)
        }
        break
    }
    if (c && c.call(i || f, j) !== true) {
      return false
    }
    return j
  },
  walkRows: function(h, a) {
    var d = this,
      g = d.dataSource,
      e = 0,
      j = h,
      b, c = (a < 0) ? 0 : g.getCount() - 1,
      f = c ? 1 : -1,
      i = h;
    do {
      if (c ? i >= c : i <= c) {
        return j || c
      }
      i += f;
      if ((b = Ext.fly(d.getRow(i))) && b.isVisible(true)) {
        e += f;
        j = i
      }
    } while (e !== a);
    return i
  },
  walkRecs: function(b, a) {
    var g = this,
      j = g.dataSource,
      h = 0,
      k = b,
      c, e = (a < 0) ? 0 : (j.isBufferedStore ? j.getTotalCount() : j.getCount()) -
      1,
      i = e ? 1 : -1,
      f = j.indexOf(b),
      d;
    do {
      if (e ? f >= e : f <= e) {
        return k
      }
      f += i;
      d = j.getAt(f);
      if (!d.isCollapsedPlaceholder && (c = Ext.fly(g.getNodeByRecord(d))) &&
        c.isVisible(true)) {
        h += i;
        k = d
      }
    } while (h !== a);
    return k
  },
  getFirstVisibleRowIndex: function() {
    var c = this,
      b = (c.dataSource.isBufferedStore ? c.dataSource.getTotalCount() :
        c.dataSource.getCount()),
      a = c.indexOf(c.all.first()) - 1;
    do {
      a += 1;
      if (a === b) {
        return
      }
    } while (!Ext.fly(c.getRow(a)).isVisible(true));
    return a
  },
  getLastVisibleRowIndex: function() {
    var b = this,
      a = b.indexOf(b.all.last());
    do {
      a -= 1;
      if (a === -1) {
        return
      }
    } while (!Ext.fly(b.getRow(a)).isVisible(true));
    return a
  },
  getHeaderCt: function() {
    return this.headerCt
  },
  getPosition: function(a, b) {
    return new Ext.grid.CellContext(this).setPosition(a, b)
  },
  onDestroy: function() {
    var d = this,
      c = d.featuresMC,
      a, b;
    if (c) {
      for (b = 0, a = c.getCount(); b < a; ++b) {
        c.getAt(b).destroy()
      }
    }
    d.cellFly = d.featuresMC = null;
    Ext.view.View.prototype.onDestroy.apply(this, arguments);
    d.all.destroy();
    d.body.destroy();
    d.all = d.body = d.body.el = null;
    d.grid = d.ownerGrid = d.headerCt = d.panel = null;
    d.selection = d.actionPosition = d.eventPosition = d.lastFocused =
      null;
    d.actionRow = d.cellTpl = d.rowTpl = d.bufferedRenderer = null
  },
  onReplace: function(b, e, a, d) {
    var c = this,
      f = c.bufferedRenderer;
    if (c.rendered && f) {
      f.onReplace(b, e, a, d)
    } else {
      Ext.view.View.prototype.onReplace.apply(this, arguments)
    }
    c.setPendingStripe(e)
  },
  onAdd: function(b, a, c) {
    var d = this,
      e = d.bufferedRenderer;
    if (d.rendered && e && (e.bodyTop || d.dataSource.getCount() + a.length >=
        e.viewSize)) {
      e.onReplace(b, c, [], a)
    } else {
      Ext.view.View.prototype.onAdd.apply(this, arguments)
    }
    d.setPendingStripe(c)
  },
  onRemove: function(b, a, c) {
    var d = this,
      e = d.bufferedRenderer;
    if (d.rendered && e) {
      e.onReplace(b, c, a, [])
    } else {
      Ext.view.View.prototype.onRemove.apply(this, arguments)
    }
    d.setPendingStripe(c)
  },
  onDataRefresh: function(b) {
    var c = this,
      a = c.ownerCt;
    if (a && a.isCollapsingOrExpanding === 2) {
      a.on("expand", c.onDataRefresh, c, {
        single: true
      });
      return
    }
    Ext.view.View.prototype.onDataRefresh.call(this, b)
  },
  getViewRange: function() {
    var a = this;
    if (a.bufferedRenderer) {
      return a.bufferedRenderer.getViewRange()
    }
    return Ext.view.View.prototype.getViewRange.call(this)
  },
  setPendingStripe: function(a) {
    var b = this.stripeOnUpdate;
    if (b === null) {
      b = a
    } else {
      b = Math.min(b, a)
    }
    this.stripeOnUpdate = b
  },
  onEndUpdate: function() {
    var a = this,
      c = a.stripeOnUpdate,
      b = a.all.startIndex;
    if (a.rendered && (c || c === 0)) {
      if (c < b) {
        c = b
      }
      a.doStripeRows(c);
      a.stripeOnUpdate = null
    }
    Ext.view.View.prototype.onEndUpdate.apply(this, arguments)
  },
  doStripeRows: function(b, a) {
    var d = this,
      e, g, c, f;
    if (d.rendered && d.stripeRows) {
      e = d.getNodes(b, a);
      for (c = 0, g = e.length; c < g; c++) {
        f = e[c];
        f.className = f.className.replace(d.rowClsRe, " ");
        b++;
        if (b % 2 === 0) {
          f.className += (" " + d.altRowCls)
        }
      }
    }
  },
  hasActiveFeature: function() {
    return (this.isGrouping && this.store.isGrouped()) || this.isRowWrapped
  },
  getCellPaddingAfter: function(a) {
    return Ext.fly(a).getPadding("r")
  },
  privates: {
    refreshScroll: function() {
      var a = this,
        b = a.bufferedRenderer;
      if (b) {
        b.refreshSize()
      } else {
        Ext.view.View.prototype.refreshScroll.call(this)
      }
    },
    collectNodes: function(a) {
      this.all.fill(this.getNodeContainer().childNodes, this.all.startIndex)
    },
    setActionableMode: function(h, f) {
      var k = this,
        a = k.getNavigationModel(),
        b, o, l, c, m = k.grid.actionables,
        g = m.length,
        d, e, n, j, p;
      if (k.actionableMode === h) {
        if (h && f.isEqual(k.actionPosition)) {
          return false
        }
        p = false
      }
      if (h) {
        if (f && (f.view === k || (f.view === (j = k.lockingPartner) && j
            .actionableMode))) {
          f = f.clone();
          e = f.record;
          b = k.all.item(f.rowIdx);
          if (!j) {
            o = Ext.fly(b).down(f.column.getCellSelector());
            for (d = 0; d < g; d++) {
              n = n || m[d].activateCell(f)
            }
          }
          if (j || o.restoreTabbableState(true).length || n) {
            for (d = 0; d < g; d++) {
              if (m[d].activateRow) {
                m[d].activateRow(b)
              }
            }
            if (j || (l = o.findTabbableElements()).length) {
              b.restoreTabbableState(true);
              if (j) {
                k.actionableMode = true;
                return p
              }
              if (l) {
                k.actionRow = b;
                k.actionableMode = k.ownerGrid.actionableMode = true;
                a.setPosition();
                a.actionPosition = k.actionPosition = f;
                l[0].focus();
                return p
              }
            }
          }
        }
        return false
      } else {
        c = Ext.fly(Ext.Element.getActiveElement());
        for (d = 0; d < g; d++) {
          if (m[d].deactivate) {
            m[d].deactivate()
          }
        }
        if (k.actionRow) {
          k.actionRow.saveTabbableState({
            skipSelf: true,
            includeSaved: false
          })
        }
        if (k.el.contains(c)) {
          a.setPosition(new Ext.grid.CellContext(k).setPosition(k.getRecord(
              c) || 0, k.getHeaderByCell(c.findParent(k.getCellSelector())) ||
            0))
        }
        k.actionableMode = k.ownerGrid.actionableMode = false;
        k.actionPosition = a.actionPosition = k.actionRow = null
      }
    },
    onRowExit: function(c, l, e) {
      var h = this,
        j = e ? "nextSibling" : "previousSibling",
        g = h.lockingPartner,
        k = h.grid.actionables,
        f = k.length,
        d, b, a;
      h.refreshing = h.actionableModeTabbing = true;
      for (d = 0; d < f; d++) {
        if (k[d].deactivate) {
          k[d].deactivate()
        }
      }
      if (g && g.grid.isVisible()) {
        b = h.all.indexOf(c);
        if (e) {
          a = 0;
          if (h.isNormalView) {
            b++
          }
        } else {
          a = g.getVisibleColumnManager().getColumns().length - 1;
          if (h.isLockedView) {
            b--
          }
        }
        h = g;
        l = h.all.item(b, true)
      }
      h.findFirstActionableElement(l, j, e);
      h.refreshing = h.actionableModeTabbing = false;
      Ext.fly(c).saveTabbableState({
        skipSelf: true,
        includeSaved: false
      })
    },
    findFirstActionableElement: function(a, l, g) {
      var k = this,
        c = k.getVisibleColumnManager().getColumns(),
        h = c.length,
        r, o, p = k.grid.actionables,
        n = p.length,
        e, d, b, f = new Ext.grid.CellContext(k),
        q, m;
      if (a) {
        f.setRow(a);
        for (e = 0; e < n; e++) {
          if (p[e].activateRow) {
            p[e].activateRow(a)
          }
        }
        for (e = (g ? 0 : h - 1);
          (g ? e < h : e > -1) && !o; e = e + (g ? 1 : -1)) {
          b = c[e];
          f.setColumn(b);
          r = Ext.fly(a).down(f.column.getCellSelector());
          for (d = 0; d < n; d++) {
            q = q || p[d].activateCell(f)
          }
          if (r.restoreTabbableState(true).length || q) {
            m = r.findTabbableElements();
            k.actionRow = Ext.get(a);
            k.actionRow.restoreTabbableState(true);
            o = m[g ? 0 : m.length - 1]
          }
        }
        if (o) {
          k.actionPosition = k.getNavigationModel().actionPosition = f;
          o.focus();
          if (Ext.isIE8) {
            setTimeout(function() {
              o.focus()
            }, 0)
          }
        } else {
          k.onRowExit(a, k.all.item(f.rowIdx + (g ? 1 : -1)), g)
        }
      } else {
        k.grid.ensureVisible(g ? 0 : k.dataSource.getCount() - 1, {
          callback: function(s, i, j) {
            if (s) {
              k.findFirstActionableElement(j, l, g)
            } else {
              k.ownerGrid.setActionableMode(false)
            }
          }
        })
      }
    }
  }
}, 1, ["tableview", "gridview"], ["component", "box", "dataview",
  "tableview", "gridview"
], {
  component: true,
  box: true,
  dataview: true,
  tableview: true,
  gridview: true
}, ["widget.gridview", "widget.tableview"], 0, [Ext.view, "Table", Ext.grid,
  "View"
], 0));
Ext.define("Ext.theme.crisp.view.Table", {
  override: "Ext.view.Table",
  stripeRows: false
});
(Ext.cmd.derive("Ext.grid.Panel", Ext.panel.Table, {
  alternateClassName: ["Ext.list.ListView", "Ext.ListView",
    "Ext.grid.GridPanel"
  ],
  viewType: "tableview",
  lockable: false,
  rowLines: true
}, 0, ["grid", "gridpanel"], ["component", "box", "container", "panel",
  "tablepanel", "gridpanel", "grid"
], {
  component: true,
  box: true,
  container: true,
  panel: true,
  tablepanel: true,
  gridpanel: true,
  grid: true
}, ["widget.grid", "widget.gridpanel"], 0, [Ext.grid, "Panel", Ext.list,
  "ListView", Ext, "ListView", Ext.grid, "GridPanel"
], 0));
(Ext.cmd.derive("Ext.grid.plugin.HeaderResizer", Ext.plugin.Abstract, {
  disabled: false,
  config: {
    dynamic: false
  },
  colHeaderCls: "x-column-header",
  minColWidth: 40,
  maxColWidth: 1000,
  eResizeCursor: "col-resize",
  init: function(b) {
    var a = this;
    a.headerCt = b;
    b.on("render", a.afterHeaderRender, a, {
      single: a
    });
    if (!a.minColWidth) {
      a.self.prototype.minColWidth = Ext.grid.column.Column.prototype.minWidth
    }
  },
  destroy: function() {
    var b = this,
      a = b.tracker;
    if (a) {
      a.destroy();
      b.tracker = null
    }
    b.headerCt.un("render", b.afterHeaderRender, b);
    b.headerCt = null;
    Ext.plugin.Abstract.prototype.destroy.call(this)
  },
  afterHeaderRender: function() {
    var b = this,
      c = b.headerCt,
      a = c.el;
    c.mon(a, "mousemove", b.onHeaderCtMouseMove, b);
    b.markerOwner = b.ownerGrid = b.headerCt.up("tablepanel").ownerGrid;
    b.tracker = new Ext.dd.DragTracker({
      disabled: b.disabled,
      onBeforeStart: b.onBeforeStart.bind(b),
      onStart: b.onStart.bind(b),
      onDrag: b.onDrag.bind(b),
      onEnd: b.onEnd.bind(b),
      tolerance: 3,
      autoStart: 300,
      el: a
    })
  },
  onHeaderCtMouseMove: function(b) {
    var a = this;
    if (a.headerCt.dragging || a.disabled) {
      if (a.activeHd) {
        a.activeHd.el.dom.style.cursor = "";
        delete a.activeHd
      }
    } else {
      if (b.pointerType !== "touch") {
        a.findActiveHeader(b)
      }
    }
  },
  findActiveHeader: function(d) {
    var f = this,
      h = d.getTarget("." + f.colHeaderCls, 3, true),
      i = f.ownerGrid,
      a = i.ownerLockable,
      j, g, b, c;
    f.activeHd = null;
    if (h) {
      j = Ext.getCmp(h.id);
      if (j.isAtEndEdge(d)) {
        if (f.headerCt.visibleColumnManager.getColumns().length === 1 &&
          f.headerCt.forceFit) {
          return
        }
        g = j
      } else {
        if (j.isAtStartEdge(d)) {
          b = f.headerCt.visibleColumnManager.getColumns();
          c = j.isGroupHeader ? j.getGridColumns()[0] : j;
          g = b[Ext.Array.indexOf(b, c) - 1];
          if (!g && a && !i.isLocked) {
            b = a.lockedGrid.headerCt.visibleColumnManager.getColumns();
            g = b[b.length - 1]
          }
        }
      }
      if (g) {
        if (g.isGroupHeader) {
          b = g.getGridColumns();
          g = b[b.length - 1]
        }
        if (g && !(g.fixed || (g.resizable === false))) {
          f.activeHd = g;
          j.el.dom.style.cursor = f.eResizeCursor;
          if (j.triggerEl) {
            j.triggerEl.dom.style.cursor = f.eResizeCursor
          }
        }
      } else {
        j.el.dom.style.cursor = "";
        if (j.triggerEl) {
          j.triggerEl.dom.style.cursor = ""
        }
      }
    }
    return f.activeHd
  },
  onBeforeStart: function(b) {
    var a = this;
    a.dragHd = a.activeHd || b.pointerType === "touch" && a.findActiveHeader(
      b);
    if (a.dragHd && !a.headerCt.dragging) {
      a.xDelta = a.dragHd.getX() + a.dragHd.getWidth() - a.tracker.getXY()[
        0];
      a.tracker.constrainTo = a.getConstrainRegion();
      return true
    } else {
      a.headerCt.dragging = false;
      return false
    }
  },
  getConstrainRegion: function() {
    var f = this,
      b = f.dragHd.el,
      e, g = f.ownerGrid,
      d = g.getSizeModel().width,
      c = d.shrinkWrap ? f.headerCt.getWidth() - f.headerCt.visibleColumnManager
      .getColumns().length * f.minColWidth : f.maxColWidth,
      a;
    if (f.headerCt.forceFit) {
      e = f.dragHd.nextNode(
        "gridcolumn:not([hidden]):not([isGroupHeader])");
      if (e && f.headerInSameGrid(e)) {
        c = b.getWidth() + (e.getWidth() - f.minColWidth)
      }
    } else {
      if (g.isLocked && d.shrinkWrap) {
        c = f.dragHd.up("[scrollerOwner]").getTargetEl().getWidth(true) -
          g.getWidth() - (g.ownerLockable.normalGrid.visibleColumnManager
            .getColumns().length * f.minColWidth + Ext.getScrollbarSize()
            .width)
      }
    }
    a = f.adjustConstrainRegion(b.getRegion(), 0, 0, 0, f.minColWidth);
    a.right = b.getX() + c;
    return a
  },
  onStart: function(g) {
    var h = this,
      f = h.dragHd,
      b = f.el.getWidth(),
      d = f.getRootHeaderCt(),
      k, j, c, a, i, l;
    h.headerCt.dragging = true;
    h.origWidth = b;
    if (!h.dynamic) {
      c = h.markerOwner;
      if (c.frame && c.resizable) {
        h.gridOverflowSetting = c.el.dom.style.overflow;
        c.el.dom.style.overflow = "hidden"
      }
      k = h.getLeftMarkerX(c);
      a = c.getLhsMarker();
      i = c.getRhsMarker();
      l = h.ownerGrid.body.getHeight() + d.getHeight();
      j = d.getOffsetsTo(c)[1] - c.el.getBorderWidth("t");
      a.setLocalY(j);
      i.setLocalY(j);
      a.setHeight(l);
      i.setHeight(l);
      h.setMarkerX(a, k);
      h.setMarkerX(i, k + b)
    }
  },
  onDrag: function(b) {
    var a = this;
    if (a.dynamic) {
      a.doResize()
    } else {
      a.setMarkerX(a.getMovingMarker(a.markerOwner), a.calculateDragX(a.markerOwner))
    }
  },
  getMovingMarker: function(a) {
    return a.getRhsMarker()
  },
  onEnd: function(b) {
    var a = this,
      c = a.markerOwner;
    a.headerCt.dragging = false;
    if (a.dragHd) {
      if (!a.dynamic) {
        if ("gridOverflowSetting" in a) {
          c.el.dom.style.overflow = a.gridOverflowSetting
        }
        a.setMarkerX(c.getLhsMarker(), -9999);
        a.setMarkerX(c.getRhsMarker(), -9999)
      }
      a.doResize();
      a.dragHd = a.activeHd = null
    }
    if (b.pointerType !== "touch") {
      a.onHeaderCtMouseMove(b)
    }
    a.headerCt.blockNextEvent()
  },
  doResize: function() {
    var c = this,
      b = c.dragHd,
      a, d = c.tracker.getOffset("point");
    if (b && d[0]) {
      if (b.flex) {
        delete b.flex
      }
      Ext.suspendLayouts();
      c.adjustColumnWidth(d[0] - c.xDelta);
      if (c.headerCt.forceFit) {
        a = b.nextNode("gridcolumn:not([hidden]):not([isGroupHeader])");
        if (a && !c.headerInSameGrid(a)) {
          a = null
        }
        if (a) {
          delete a.flex;
          a.setWidth(a.getWidth() - d[0])
        }
      }
      Ext.resumeLayouts(true)
    }
  },
  headerInSameGrid: function(b) {
    var a = this.dragHd.up("tablepanel");
    return !!b.up(a)
  },
  disable: function() {
    var a = this.tracker;
    this.disabled = true;
    if (a) {
      a.disable()
    }
  },
  enable: function() {
    var a = this.tracker;
    this.disabled = false;
    if (a) {
      a.enable()
    }
  },
  calculateDragX: function(a) {
    return this.tracker.getXY("point")[0] + this.xDelta - a.getX() - a.el
      .getBorderWidth("l")
  },
  getLeftMarkerX: function(a) {
    return this.dragHd.getX() - a.getX() - a.el.getBorderWidth("l") - 1
  },
  setMarkerX: function(b, a) {
    b.setLocalX(a)
  },
  adjustConstrainRegion: function(f, d, e, a, c) {
    return f.adjust(d, e, a, c)
  },
  adjustColumnWidth: function(a) {
    this.dragHd.setWidth(this.origWidth + a)
  }
}, 0, 0, 0, 0, ["plugin.gridheaderresizer"], 0, [Ext.grid.plugin,
  "HeaderResizer"
], 0));
(Ext.cmd.derive("Ext.grid.header.DragZone", Ext.dd.DragZone, {
  colHeaderSelector: ".x-column-header",
  colInnerSelector: ".x-column-header-inner",
  maxProxyWidth: 120,
  constructor: function(b) {
    var a = this;
    a.headerCt = b;
    a.ddGroup = a.getDDGroup();
    a.autoGroup = true;
    Ext.dd.DragZone.prototype.constructor.call(this, b.el);
    a.proxy.el.addCls("x-grid-col-dd")
  },
  getDDGroup: function() {
    return "header-dd-zone-" + this.headerCt.up("[scrollerOwner]").id
  },
  getDragData: function(b) {
    if (b.getTarget(this.colInnerSelector)) {
      var d = b.getTarget(this.colHeaderSelector),
        a, c;
      if (d) {
        a = Ext.getCmp(d.id);
        if (!this.headerCt.dragging && a.draggable && !(a.isAtStartEdge(b) ||
            a.isAtEndEdge(b))) {
          c = document.createElement("div");
          c.role = "presentation";
          c.innerHTML = a.text;
          return {
            ddel: c,
            header: a
          }
        }
      }
    }
    return false
  },
  onBeforeDrag: function() {
    return !(this.headerCt.dragging || this.disabled)
  },
  onInitDrag: function() {
    this.headerCt.dragging = true;
    this.headerCt.hideMenu();
    Ext.dd.DragZone.prototype.onInitDrag.apply(this, arguments)
  },
  onDragDrop: function() {
    this.headerCt.dragging = false;
    Ext.dd.DragZone.prototype.onDragDrop.apply(this, arguments)
  },
  afterRepair: function() {
    Ext.dd.DragZone.prototype.afterRepair.call(this);
    this.headerCt.dragging = false
  },
  getRepairXY: function() {
    return this.dragData.header.el.getXY()
  },
  disable: function() {
    this.disabled = true
  },
  enable: function() {
    this.disabled = false
  }
}, 1, 0, 0, 0, 0, 0, [Ext.grid.header, "DragZone"], 0));
(Ext.cmd.derive("Ext.grid.header.DropZone", Ext.dd.DropZone, {
  colHeaderCls: "x-column-header",
  proxyOffsets: [-4, -9],
  constructor: function(b) {
    var a = this;
    a.headerCt = b;
    a.ddGroup = a.getDDGroup();
    a.autoGroup = true;
    Ext.dd.DropZone.prototype.constructor.call(this, b.el)
  },
  destroy: function() {
    Ext.dd.DropZone.prototype.destroy.call(this);
    Ext.destroy(this.topIndicator, this.bottomIndicator)
  },
  getDDGroup: function() {
    return "header-dd-zone-" + this.headerCt.up("[scrollerOwner]").id
  },
  getTargetFromEvent: function(a) {
    return a.getTarget("." + this.colHeaderCls)
  },
  getTopIndicator: function() {
    if (!this.topIndicator) {
      this.topIndicator = Ext.getBody().createChild({
        role: "presentation",
        cls: "x-col-move-top",
        html: "&#160;"
      });
      this.indicatorXOffset = Math.floor((this.topIndicator.dom.offsetWidth +
        1) / 2)
    }
    return this.topIndicator
  },
  getBottomIndicator: function() {
    if (!this.bottomIndicator) {
      this.bottomIndicator = Ext.getBody().createChild({
        role: "presentation",
        cls: "x-col-move-bottom",
        html: "&#160;"
      })
    }
    return this.bottomIndicator
  },
  getLocation: function(d, b) {
    var a = d.getXY()[0],
      c = Ext.fly(b).getRegion(),
      f;
    if ((c.right - a) <= (c.right - c.left) / 2) {
      f = "after"
    } else {
      f = "before"
    }
    return {
      pos: f,
      header: Ext.getCmp(b.id),
      node: b
    }
  },
  positionIndicator: function(y, o, u) {
    var x = this,
      p = y.header,
      f = x.getLocation(u, o),
      j = f.header,
      d = f.pos,
      c, t, l, r, s, a, b, k, m, w, v, n, h, q, g;
    if (j === x.lastTargetHeader && d === x.lastDropPos) {
      return
    }
    c = p.nextSibling("gridcolumn:not([hidden])");
    t = p.previousSibling("gridcolumn:not([hidden])");
    x.lastTargetHeader = j;
    x.lastDropPos = d;
    if (!j.draggable && d === "before" && j.getIndex() === 0) {
      return false
    }
    y.dropLocation = f;
    if ((p !== j) && ((d === "before" && c !== j) || (d === "after" && t !==
        j)) && !j.isDescendantOf(p)) {
      n = Ext.dd.DragDropManager.getRelated(x);
      h = n.length;
      q = 0;
      for (; q < h; q++) {
        g = n[q];
        if (g !== x && g.invalidateDrop) {
          g.invalidateDrop()
        }
      }
      x.valid = true;
      l = x.getTopIndicator();
      r = x.getBottomIndicator();
      if (d === "before") {
        s = "bc-tl";
        a = "tc-bl"
      } else {
        s = "bc-tr";
        a = "tc-br"
      }
      b = l.getAlignToXY(j.el, s);
      k = r.getAlignToXY(j.el, a);
      m = x.headerCt.el;
      w = m.getX() - x.indicatorXOffset;
      v = m.getX() + m.getWidth();
      b[0] = Ext.Number.constrain(b[0], w, v);
      k[0] = Ext.Number.constrain(k[0], w, v);
      l.setXY(b);
      r.setXY(k);
      l.show();
      r.show()
    } else {
      x.invalidateDrop()
    }
  },
  invalidateDrop: function() {
    this.valid = false;
    this.hideIndicators()
  },
  onNodeOver: function(c, g, f, d) {
    var h = this,
      j = d.header,
      a, k, b, i;
    if (d.header.el.dom === c) {
      a = false
    } else {
      d.isLock = d.isUnlock = d.crossPanel = false;
      k = h.getLocation(f, c).header;
      a = (j.ownerCt === k.ownerCt);
      if (!a && (!j.ownerCt.sealed && !k.ownerCt.sealed)) {
        a = true;
        b = j.up("tablepanel");
        i = k.up("tablepanel");
        if (b !== i) {
          d.crossPanel = true;
          d.isLock = i.isLocked && !b.isLocked;
          d.isUnlock = !i.isLocked && b.isLocked;
          if ((d.isUnlock && j.lockable === false) || (d.isLock && !j.isLockable())) {
            a = false
          }
        }
      }
    }
    if (a) {
      h.positionIndicator(d, c, f)
    } else {
      h.valid = false
    }
    return h.valid ? h.dropAllowed : h.dropNotAllowed
  },
  hideIndicators: function() {
    var a = this;
    a.getTopIndicator().hide();
    a.getBottomIndicator().hide();
    a.lastTargetHeader = a.lastDropPos = null
  },
  onNodeOut: function() {
    this.hideIndicators()
  },
  getNestedHeader: function(d, b) {
    var a = d.items,
      c;
    if (d.isGroupHeader && a.length) {
      c = !b ? "first" : "last";
      d = this.getNestedHeader(a[c](), b)
    }
    return d
  },
  onNodeDrop: function(l, c, p, t) {
    this.headerCt.blockNextEvent();
    if (!this.valid) {
      return
    }
    var q = this,
      m = t.header,
      h = t.dropLocation,
      o = h.pos,
      i = h.header,
      s = m.ownerCt,
      k = s.getRootHeaderCt(),
      a = i.ownerCt,
      d = q.headerCt.visibleColumnManager,
      n = d.getHeaderIndex(m),
      b, j, r, g, f;
    if (t.isLock || t.isUnlock) {
      g = s.up("[scrollerOwner]");
      b = a.items.indexOf(i);
      if (o === "after") {
        b++
      }
      if (t.isLock) {
        g.lock(m, b, a)
      } else {
        g.unlock(m, b, a)
      }
    } else {
      b = o === "after" ? d.getHeaderIndex(q.getNestedHeader(i, 1)) + 1 :
        d.getHeaderIndex(q.getNestedHeader(i, 0));
      q.invalidateDrop();
      f = m.getWidth();
      Ext.suspendLayouts();
      s.isDDMoveInGrid = a.isDDMoveInGrid = !t.crossPanel;
      if (m.isGroupHeader && i.isGroupHeader) {
        m.setNestedParent(i)
      }
      if (o === "before") {
        i.insertNestedHeader(m)
      } else {
        r = "move" + o.charAt(0).toUpperCase() + o.substr(1);
        a[r](m, i)
      }
      if (b >= 0 && !(i.isGroupHeader && (!i.items || !i.items.length)) &&
        n !== b) {
        j = m.isGroupHeader ? m.query(
          ":not([hidden]):not([isGroupHeader])").length : 1;
        if ((n <= b) && j > 1) {
          b -= j
        }
        a.getRootHeaderCt().grid.view.moveColumn(n, b, j)
      }
      k.fireEvent("columnmove", s, m, n, b);
      s.isDDMoveInGrid = a.isDDMoveInGrid = false;
      if (a.isGroupHeader && !s.isGroupHeader) {
        if (s !== a) {
          m.savedFlex = m.flex;
          delete m.flex;
          m.width = f
        }
      } else {
        if (!s.isGroupHeader) {
          if (m.savedFlex) {
            m.flex = m.savedFlex;
            delete m.width
          }
        }
      }
      Ext.resumeLayouts(true)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.grid.header, "DropZone"], 0));
(Ext.cmd.derive("Ext.grid.plugin.HeaderReorderer", Ext.plugin.Abstract, {
  init: function(a) {
    this.headerCt = a;
    a.on({
      boxready: this.onHeaderCtRender,
      single: true,
      scope: this
    })
  },
  destroy: function() {
    var a = this;
    a.headerCt.un("boxready", a.onHeaderCtRender, a);
    Ext.destroy(a.dragZone, a.dropZone);
    a.headerCt = a.dragZone = a.dropZone = null;
    Ext.plugin.Abstract.prototype.destroy.call(this)
  },
  onHeaderCtRender: function() {
    var a = this;
    a.dragZone = new Ext.grid.header.DragZone(a.headerCt);
    a.dropZone = new Ext.grid.header.DropZone(a.headerCt);
    if (a.disabled) {
      a.dragZone.disable()
    }
  },
  enable: function() {
    this.disabled = false;
    if (this.dragZone) {
      this.dragZone.enable()
    }
  },
  disable: function() {
    this.disabled = true;
    if (this.dragZone) {
      this.dragZone.disable()
    }
  }
}, 0, 0, 0, 0, ["plugin.gridheaderreorderer"], 0, [Ext.grid.plugin,
  "HeaderReorderer"
], 0));
(Ext.cmd.derive("Ext.grid.header.Container", Ext.container.Container, {
  border: true,
  baseCls: "x-grid-header-ct",
  dock: "top",
  weight: 100,
  defaultType: "gridcolumn",
  detachOnRemove: false,
  defaultWidth: 100,
  sortAscText: "Sort Ascending",
  sortDescText: "Sort Descending",
  sortClearText: "Clear Sort",
  columnsText: "Columns",
  headerOpenCls: "x-column-header-open",
  menuSortAscCls: "x-hmenu-sort-asc",
  menuSortDescCls: "x-hmenu-sort-desc",
  menuColsIcon: "x-cols-icon",
  blockEvents: false,
  dragging: false,
  sortOnClick: true,
  enableFocusableContainer: false,
  childHideCount: 0,
  sortable: true,
  enableColumnHide: true,
  initComponent: function() {
    var a = this;
    a.headerCounter = 0;
    a.plugins = a.plugins || [];
    a.defaults = a.defaults || {};
    if (!a.isColumn) {
      if (a.enableColumnResize) {
        a.resizer = new Ext.grid.plugin.HeaderResizer();
        a.plugins.push(a.resizer)
      }
      if (a.enableColumnMove) {
        a.reorderer = new Ext.grid.plugin.HeaderReorderer();
        a.plugins.push(a.reorderer)
      }
    }
    if (a.isColumn && !a.isGroupHeader) {
      if (!a.items || a.items.length === 0) {
        a.isContainer = a.isFocusableContainer = false;
        a.focusable = true;
        a.layout = {
          type: "container",
          calculate: Ext.emptyFn
        }
      }
    } else {
      a.layout = Ext.apply({
        type: "gridcolumn",
        align: "stretch"
      }, a.initialConfig.layout);
      a.defaults.columnLines = a.columnLines;
      if (!a.isGroupHeader) {
        a.isRootHeader = true;
        if (!a.hiddenHeaders) {
          a.enableFocusableContainer = true;
          a.ariaRole = "rowgroup"
        }
        a.columnManager = new Ext.grid.ColumnManager(false, a);
        a.visibleColumnManager = new Ext.grid.ColumnManager(true, a);
        if (a.grid) {
          a.grid.columnManager = a.columnManager;
          a.grid.visibleColumnManager = a.visibleColumnManager
        }
      } else {
        a.visibleColumnManager = new Ext.grid.ColumnManager(true, a);
        a.columnManager = new Ext.grid.ColumnManager(false, a)
      }
    }
    a.menuTask = new Ext.util.DelayedTask(a.updateMenuDisabledState, a);
    Ext.container.Container.prototype.initComponent.call(this)
  },
  insertNestedHeader: function(f) {
    var b = this,
      e = f.ownerCt,
      a = b.ownerCt,
      d = a.layout.owner,
      c;
    if (e) {
      if (b.isGroupHeader && !a.isNestedParent) {
        c = d.items.indexOf(b)
      }
      e.remove(f, false)
    }
    if (c === undefined) {
      c = d.items.indexOf(b)
    }
    d.insert(c, f)
  },
  isNested: function() {
    return !!this.getRootHeaderCt().down("[isNestedParent]")
  },
  isNestedGroupHeader: function() {
    var b = this,
      a = b.getRefOwner().query(">:not([hidden])");
    return (a.length === 1 && a[0] === b)
  },
  maybeShowNestedGroupHeader: function() {
    var a = this.items,
      b;
    if (a && a.length === 1 && (b = a.getAt(0)) && b.hidden) {
      b.show()
    }
  },
  setNestedParent: function(a) {
    a.isNestedParent = false;
    a.ownerCt.isNestedParent = !!(this.ownerCt.items.length === 1 && a.ownerCt
      .items.length === 1)
  },
  initEvents: function() {
    var c = this,
      a, b;
    Ext.container.Container.prototype.initEvents.call(this);
    if (!c.isColumn && !c.isGroupHeader) {
      a = c.onHeaderCtEvent;
      b = {
        click: a,
        dblclick: a,
        contextmenu: a,
        mouseover: c.onHeaderCtMouseOver,
        mouseout: c.onHeaderCtMouseOut,
        scope: c
      };
      if (Ext.supports.Touch) {
        b.longpress = c.onHeaderCtLongPress
      }
      c.mon(c.el, b)
    }
  },
  onHeaderCtEvent: function(d, b) {
    var c = this,
      h = c.getHeaderElByEvent(d),
      g, f, a;
    if (c.longPressFired) {
      c.longPressFired = false;
      return
    }
    if (h && !c.blockEvents) {
      g = Ext.getCmp(h.id);
      if (g) {
        f = g[g.clickTargetName];
        if ((!g.isGroupHeader && !g.isContainer) || d.within(f)) {
          if (d.type === "click" || d.type === "tap") {
            a = g.onTitleElClick(d, f, c.sortOnClick);
            if (a) {
              c.onHeaderTriggerClick(a, d, d.pointerType === "touch" ? a.el :
                a.triggerEl)
            } else {
              c.onHeaderClick(g, d, b)
            }
          } else {
            if (d.type === "contextmenu") {
              c.onHeaderContextMenu(g, d, b)
            } else {
              if (d.type === "dblclick" && g.resizable) {
                g.onTitleElDblClick(d, f.dom)
              }
            }
          }
        }
      }
    }
  },
  blockNextEvent: function() {
    this.blockEvents = true;
    Ext.asap(this.unblockEvents, this)
  },
  unblockEvents: function() {
    this.blockEvents = false
  },
  onHeaderCtMouseOver: function(b, a) {
    var f, d, c;
    if (!b.within(this.el, true)) {
      f = b.getTarget("." + Ext.grid.column.Column.prototype.baseCls);
      d = f && Ext.getCmp(f.id);
      if (d) {
        c = d[d.clickTargetName];
        if (b.within(c)) {
          d.onTitleMouseOver(b, c.dom)
        }
      }
    }
  },
  onHeaderCtMouseOut: function(f, c) {
    var d = "." + Ext.grid.column.Column.prototype.baseCls,
      b = f.getTarget(d),
      a = f.getRelatedTarget(d),
      h, g;
    if (b !== a) {
      if (b) {
        h = Ext.getCmp(b.id);
        if (h) {
          g = h[h.clickTargetName];
          h.onTitleMouseOut(f, g.dom)
        }
      }
      if (a) {
        h = Ext.getCmp(a.id);
        if (h) {
          g = h[h.clickTargetName];
          h.onTitleMouseOver(f, g.dom)
        }
      }
    }
  },
  onHeaderCtLongPress: function(b) {
    var a = this,
      d = a.getHeaderElByEvent(b),
      c = Ext.getCmp(d.id);
    if (!c.menuDisabled) {
      a.longPressFired = true;
      a.showMenuBy(b, d, c)
    }
  },
  getHeaderElByEvent: function(a) {
    return a.getTarget("." + Ext.grid.column.Column.prototype.baseCls)
  },
  isLayoutRoot: function() {
    if (this.hiddenHeaders) {
      return false
    }
    return Ext.container.Container.prototype.isLayoutRoot.call(this)
  },
  getRootHeaderCt: function() {
    var a = this;
    return a.isRootHeader ? a : a.up("[isRootHeader]")
  },
  onDestroy: function() {
    var a = this;
    if (a.menu) {
      a.menu.un("hide", a.onMenuHide, a)
    }
    a.menuTask.cancel();
    Ext.container.Container.prototype.onDestroy.call(this);
    Ext.destroy(a.visibleColumnManager, a.columnManager, a.menu);
    a.columnManager = a.visibleColumnManager = null
  },
  applyColumnsState: function(g) {
    if (!g || !g.length) {
      return
    }
    var o = this,
      m = o.items.items,
      l = m.length,
      h = 0,
      b = g.length,
      n, d, a, k, p = false,
      j = [],
      e = {},
      f = [];
    for (n = 0; n < b; n++) {
      a = g[n];
      a.index = n;
      e[a.id] = a
    }
    for (h = 0; h < l; h++) {
      d = m[h];
      a = e[d.getStateId()];
      if (a) {
        k = a.index;
        j[k] = d;
        if (h !== k) {
          p = true
        }
        if (d.applyColumnState) {
          d.applyColumnState(a)
        }
      } else {
        f.push({
          index: h,
          column: d
        })
      }
    }
    j = Ext.Array.clean(j);
    b = f.length;
    if (b) {
      for (h = 0; h < b; h++) {
        a = f[h];
        k = a.index;
        if (k < j.length) {
          p = true;
          Ext.Array.splice(j, k, 0, a.column)
        } else {
          j.push(a.column)
        }
      }
    }
    if (p) {
      o.removeAll(false);
      o.add(j);
      o.purgeCache()
    }
  },
  getColumnsState: function() {
    var b = this,
      a = [],
      c;
    b.items.each(function(d) {
      c = d.getColumnState && d.getColumnState();
      if (c) {
        a.push(c)
      }
    });
    return a
  },
  onAdd: function(b) {
    var a = this;
    if (!b.headerId) {
      b.headerId = b.initialConfig.id || Ext.id(null, "header-")
    }
    if (b.sortable === undefined) {
      b.sortable = a.sortable
    }
    if (!b.getStateId()) {
      b.stateId = b.initialConfig.id || ("h" + (++a.headerCounter))
    }
    Ext.container.Container.prototype.onAdd.apply(this, arguments);
    a.onHeadersChanged(b, a.isDDMoveInGrid)
  },
  move: function(c, e) {
    var d = this,
      b = d.items,
      a;
    if (c.isComponent) {
      a = c;
      c = b.indexOf(a)
    } else {
      a = b.getAt(c)
    }
    a.visibleFromIdx = d.getRootHeaderCt().visibleColumnManager.indexOf(a);
    Ext.container.Container.prototype.move.apply(this, arguments)
  },
  onMove: function(a, d, g) {
    var f = this,
      e = f.getRootHeaderCt(),
      b = e.visibleColumnManager,
      h = 1,
      c;
    f.onHeadersChanged(a, true);
    c = b.indexOf(a);
    if (c >= a.visibleFromIdx) {
      c++
    }
    Ext.container.Container.prototype.onMove.apply(this, arguments);
    if (a.isGroupHeader) {
      h = a.visibleColumnManager.getColumns().length
    }
    e.onHeaderMoved(a, h, a.visibleFromIdx, c)
  },
  onRemove: function(e, b) {
    var d = this,
      a = d.ownerCt;
    Ext.container.Container.prototype.onRemove.call(this, e, b);
    if (!d.destroying) {
      if (!d.isDDMoveInGrid) {
        d.onHeadersChanged(e, false)
      }
      if (d.isGroupHeader && !d.isNestedParent && a && !d.items.getCount()) {
        if (e.rendered) {
          d.detachComponent(e)
        }
        Ext.suspendLayouts();
        a.remove(d);
        Ext.resumeLayouts(true)
      }
    }
  },
  onHeadersChanged: function(e, a) {
    var b, d = this.getRootHeaderCt();
    this.purgeHeaderCtCache(this);
    if (d) {
      d.onColumnsChanged();
      if (!e.isGroupHeader) {
        b = d.ownerCt;
        if (b && !a) {
          b.onHeadersChanged(d, e)
        }
      }
    }
  },
  onHeaderMoved: function(f, a, c, e) {
    var d = this,
      b = d.ownerCt;
    if (d.rendered) {
      if (b && b.onHeaderMove) {
        b.onHeaderMove(d, f, a, c, e)
      }
      d.fireEvent("columnmove", d, f, c, e)
    }
  },
  onColumnsChanged: function() {
    var c = this,
      d = c.menu,
      a, b;
    if (c.rendered) {
      c.fireEvent("columnschanged", c);
      if (d && (a = d.child("#columnItemSeparator"))) {
        b = d.child("#columnItem");
        a.destroy();
        b.destroy()
      }
    }
  },
  lookupComponent: function(b) {
    var a = Ext.container.Container.prototype.lookupComponent.apply(this,
      arguments);
    if (!a.isGroupHeader && a.width === undefined && !a.flex) {
      a.width = this.defaultWidth
    }
    return a
  },
  setSortState: function() {
    var b = this.up("[store]").store,
      d = this.visibleColumnManager.getColumns(),
      a = d.length,
      c, f, e;
    for (c = 0; c < a; c++) {
      f = d[c];
      e = b.getSorters().get(f.getSortParam());
      f.setSortState(e)
    }
  },
  getHeaderMenu: function() {
    var b = this.getMenu(),
      a;
    if (b) {
      a = b.child("#columnItem");
      if (a) {
        return a.menu
      }
    }
    return null
  },
  onHeaderVisibilityChange: function(e, d) {
    var b = this,
      c = b.getHeaderMenu(),
      a;
    b.purgeHeaderCtCache(e.ownerCt);
    if (c) {
      a = b.getMenuItemForHeader(c, e);
      if (a) {
        a.setChecked(d, true)
      }
      if (c.isVisible()) {
        b.menuTask.delay(50)
      }
    }
  },
  updateMenuDisabledState: function(g) {
    var f = this,
      d = f.query(":not([hidden])"),
      c, a = d.length,
      e, b, h;
    if (!g) {
      g = f.getMenu()
    }
    for (c = 0; c < a; ++c) {
      e = d[c];
      b = f.getMenuItemForHeader(g, e);
      if (b) {
        h = e.isHideable() ? "enable" : "disable";
        if (b.menu) {
          h += "CheckChange"
        }
        b[h]()
      }
    }
  },
  getMenuItemForHeader: function(a, b) {
    return b ? a.down("menucheckitem[headerId=" + b.id + "]") : null
  },
  onHeaderShow: function(c) {
    var b = this,
      a = b.ownerCt;
    if (!a) {
      return
    }
    if (b.forceFit) {
      delete b.flex
    }
    b.onHeaderVisibilityChange(c, true);
    a.onHeaderShow(b, c);
    b.fireEvent("columnshow", b, c);
    b.fireEvent("columnschanged", this)
  },
  onHeaderHide: function(c) {
    var b = this,
      a = b.ownerCt;
    if (!a) {
      return
    }
    b.onHeaderVisibilityChange(c, false);
    a.onHeaderHide(b, c);
    b.fireEvent("columnhide", b, c);
    b.fireEvent("columnschanged", this)
  },
  onHeaderResize: function(d, a) {
    var c = this,
      b = c.ownerCt;
    if (b) {
      b.onHeaderResize(c, d, a)
    }
    c.fireEvent("columnresize", c, d, a)
  },
  onHeaderClick: function(f, d, b) {
    var c = this,
      a = f.getView().getSelectionModel();
    f.fireEvent("headerclick", c, f, d, b);
    if (c.fireEvent("headerclick", c, f, d, b) !== false) {
      if (a.onHeaderClick) {
        a.onHeaderClick(c, f, d)
      }
    }
  },
  onHeaderContextMenu: function(c, b, a) {
    c.fireEvent("headercontextmenu", this, c, b, a);
    this.fireEvent("headercontextmenu", this, c, b, a)
  },
  onHeaderTriggerClick: function(d, c, a) {
    var b = this;
    if (d.fireEvent("headertriggerclick", b, d, c, a) !== false && b.fireEvent(
        "headertriggerclick", b, d, c, a) !== false) {
      if (d.activeMenu) {
        if (c.pointerType) {
          d.activeMenu.hide()
        } else {
          d.activeMenu.focus()
        }
      } else {
        b.showMenuBy(c, a, d)
      }
    }
  },
  showMenuBy: function(a, c, g) {
    var e = this.getMenu(),
      f = e.down("#ascItem"),
      d = e.down("#descItem"),
      b;
    e.activeHeader = e.ownerCmp = g;
    g.setMenuActive(e);
    b = g.sortable ? "enable" : "disable";
    if (f) {
      f[b]()
    }
    if (d) {
      d[b]()
    }
    e.autoFocus = !a || !a.pointerType;
    e.showBy(c, "tl-bl?");
    if (!e.isVisible()) {
      this.onMenuHide(e)
    }
  },
  hideMenu: function() {
    if (this.menu) {
      this.menu.hide()
    }
  },
  onMenuHide: function(a) {
    a.activeHeader.setMenuActive(false)
  },
  purgeHeaderCtCache: function(a) {
    while (a) {
      a.purgeCache();
      if (a.isRootHeader) {
        return
      }
      a = a.ownerCt
    }
  },
  purgeCache: function() {
    var c = this,
      b = c.visibleColumnManager,
      a = c.columnManager;
    c.gridVisibleColumns = c.gridDataColumns = c.hideableColumns = null;
    if (b) {
      b.invalidate();
      a.invalidate()
    }
  },
  getMenu: function() {
    var b = this,
      a = b.view && b.view.ownerGrid;
    if (!b.menu) {
      b.menu = new Ext.menu.Menu({
        hideOnParentHide: false,
        items: b.getMenuItems(),
        listeners: {
          beforeshow: b.beforeMenuShow,
          hide: b.onMenuHide,
          scope: b
        }
      });
      b.fireEvent("menucreate", b, b.menu);
      if (a) {
        a.fireEvent("headermenucreate", a, b.menu, b)
      }
    }
    return b.menu
  },
  beforeMenuShow: function(e) {
    var c = this,
      b = e.child("#columnItem"),
      a, d;
    if (!b) {
      a = c.enableColumnHide ? c.getColumnMenu(c) : null;
      d = c.sortable ? 2 : 0;
      if (a && a.length) {
        e.insert(d, [{
          itemId: "columnItemSeparator",
          xtype: "menuseparator"
        }, {
          itemId: "columnItem",
          text: c.columnsText,
          iconCls: c.menuColsIcon,
          menu: {
            items: a
          },
          hideOnClick: false
        }])
      }
    }
    c.updateMenuDisabledState(c.menu)
  },
  getMenuItems: function() {
    var c = this,
      b = [],
      a = c.enableColumnHide ? c.getColumnMenu(c) : null;
    if (c.sortable) {
      b = [{
        itemId: "ascItem",
        text: c.sortAscText,
        iconCls: c.menuSortAscCls,
        handler: c.onSortAscClick,
        scope: c
      }, {
        itemId: "descItem",
        text: c.sortDescText,
        iconCls: c.menuSortDescCls,
        handler: c.onSortDescClick,
        scope: c
      }]
    }
    if (a && a.length) {
      if (c.sortable) {
        b.push({
          itemId: "columnItemSeparator",
          xtype: "menuseparator"
        })
      }
      b.push({
        itemId: "columnItem",
        text: c.columnsText,
        iconCls: c.menuColsIcon,
        menu: a,
        hideOnClick: false
      })
    }
    return b
  },
  onSortAscClick: function() {
    var b = this.getMenu(),
      a = b.activeHeader;
    a.sort("ASC")
  },
  onSortDescClick: function() {
    var b = this.getMenu(),
      a = b.activeHeader;
    a.sort("DESC")
  },
  getColumnMenu: function(f) {
    var c = [],
      b = 0,
      e, a = f.query(">gridcolumn[hideable]"),
      g = a.length,
      d;
    for (; b < g; b++) {
      e = a[b];
      d = new Ext.menu.CheckItem({
        text: e.menuText || e.text,
        checked: !e.hidden,
        hideOnClick: false,
        headerId: e.id,
        menu: e.isGroupHeader ? this.getColumnMenu(e) : undefined,
        checkHandler: this.onColumnCheckChange,
        scope: this
      });
      c.push(d)
    }
    return c.length ? c : null
  },
  onColumnCheckChange: function(a, c) {
    var d = Ext.getCmp(a.headerId),
      b;
    if (d.rendered) {
      d[c ? "show" : "hide"]();
      b = d.lastCheckedHeaderId;
      if (c && b) {
        d.getRootHeaderCt().getMenu().down("[headerId=" + b + "]").setChecked(
          true);
        d.lastCheckedHeaderId = null
      }
    } else {
      d.hidden = !c
    }
  },
  getColumnCount: function() {
    return this.getGridColumns().length
  },
  getTableWidth: function() {
    var c = 0,
      b = this.getVisibleGridColumns(),
      d = b.length,
      a;
    for (a = 0; a < d; a++) {
      c += b[a].getCellWidth() || 0
    }
    return c
  },
  getVisibleGridColumns: function() {
    var g = this,
      c, e, b, a, d, f;
    if (g.gridVisibleColumns) {
      return g.gridVisibleColumns
    }
    c = g.getGridColumns();
    e = g.getRootHeaderCt();
    b = [];
    a = c.length;
    for (d = 0; d < a; d++) {
      f = c[d];
      if (!f.hidden && !f.isColumnHidden(e)) {
        b[b.length] = f
      }
    }
    g.gridVisibleColumns = b;
    return b
  },
  isColumnHidden: function(b) {
    var a = this.getRefOwner();
    while (a && a !== b) {
      if (a.hidden) {
        return true
      }
      a = a.getRefOwner()
    }
    return false
  },
  getGridColumns: function(g, a) {
    if (!g && this.gridDataColumns) {
      return this.gridDataColumns
    }
    var f = this,
      j = g || [],
      e, b, d, h, c;
    a = a || f.hidden;
    if (f.items) {
      e = f.items.items;
      if (e) {
        for (b = 0, d = e.length; b < d; b++) {
          h = e[b];
          if (h.isGroupHeader) {
            h.visibleIndex = j.length;
            h.getGridColumns(j, a)
          } else {
            h.hiddenAncestor = a;
            j.push(h)
          }
        }
      }
    }
    if (!g) {
      f.gridDataColumns = j
    }
    if (!g && d) {
      for (b = 0, d = j.length; b < d; b++) {
        h = j[b];
        h.fullColumnIndex = b;
        h.isFirstVisible = h.isLastVisible = false;
        if (!(h.hidden || h.hiddenAncestor)) {
          if (!c) {
            h.isFirstVisible = true
          }
          c = h
        }
      }
      if (c) {
        c.isLastVisible = true
      }
    }
    return j
  },
  getHideableColumns: function() {
    var b = this,
      a = b.hideableColumns;
    if (!a) {
      a = b.hideableColumns = b.query("[hideable]")
    }
    return a
  },
  getHeaderIndex: function(a) {
    if (!this.columnManager) {
      this.columnManager = this.getRootHeaderCt().columnManager
    }
    return this.columnManager.getHeaderIndex(a)
  },
  getHeaderAtIndex: function(a) {
    if (!this.columnManager) {
      this.columnManager = this.getRootHeaderCt().columnManager
    }
    return this.columnManager.getHeaderAtIndex(a)
  },
  getVisibleHeaderClosestToIndex: function(a) {
    if (!this.visibleColumnManager) {
      this.visibleColumnManager = this.getRootHeaderCt().visibleColumnManager
    }
    return this.visibleColumnManager.getVisibleHeaderClosestToIndex(a)
  },
  applyForceFit: function(g) {
    var m = this,
      n = m.view,
      b = Ext.grid.plugin.HeaderResizer.prototype.minColWidth,
      d = false,
      r = Ext.grid.header.Container.prototype.defaultWidth,
      a = m.el.dom.clientWidth - (n.el.dom.scrollHeight > n.el.dom.clientHeight ?
        Ext.getScrollbarSize().width : 0),
      e = 0,
      l = m.getVisibleGridColumns(),
      h = g.hidden,
      k, f, q, j, c;

    function o() {
      for (f = 0, k = l.length; f < k; f++) {
        q = l[f];
        if (q === g) {
          continue
        }
        q.flex = q.flex || q.width || q.getWidth();
        e += q.flex;
        q.width = null
      }
    }

    function p() {
      var i;
      for (f = 0, k = l.length; f < k; f++) {
        q = l[f];
        i = (q === g);
        if (d && !i) {
          q.flex = b;
          q.width = null
        } else {
          if (!i) {
            c = q.flex || r;
            q.flex = Math.max(Math.ceil((c / e) * a), b);
            q.width = null
          }
        }
        q.setWidth(q.width || q.flex)
      }
    }
    Ext.suspendLayouts();
    j = (a - ((l.length + 1) * b));
    g.flex = null;
    if (h) {
      c = g.width || g.savedWidth;
      g.savedWidth = null
    } else {
      c = n.getMaxContentWidth(g)
    }
    if (c > j) {
      g.width = j;
      d = true
    } else {
      g.width = c;
      a -= c + r;
      o()
    }
    p();
    Ext.resumeLayouts(true)
  },
  autoSizeColumn: function(b) {
    var a = this.view;
    if (a) {
      a.autoSizeColumn(b);
      if (this.forceFit) {
        this.applyForceFit(b)
      }
    }
  },
  privates: {
    beginChildHide: function() {
      ++this.childHideCount
    },
    endChildHide: function() {
      --this.childHideCount
    },
    getFocusables: function() {
      return this.isRootHeader ? this.getVisibleGridColumns() : this.items
        .items
    },
    createFocusableContainerKeyNav: function(a) {
      var b = this;
      return new Ext.util.KeyNav(a, {
        scope: b,
        down: b.showHeaderMenu,
        left: b.onFocusableContainerLeftKey,
        right: b.onFocusableContainerRightKey,
        home: b.onHomeKey,
        end: b.onEndKey,
        space: b.onHeaderActivate,
        enter: b.onHeaderActivate
      })
    },
    onHomeKey: function(a) {
      return this.focusChild(null, true, a)
    },
    onEndKey: function(a) {
      return this.focusChild(null, false, a)
    },
    showHeaderMenu: function(b) {
      var a = this.getFocusableFromEvent(b);
      if (a && a.isColumn && a.triggerEl) {
        this.onHeaderTriggerClick(a, b, a.triggerEl)
      }
    },
    onHeaderActivate: function(d) {
      var c = this.getFocusableFromEvent(d),
        a, b;
      if (c && c.isColumn) {
        a = c.getView();
        if (c.sortable && this.sortOnClick) {
          b = a.getNavigationModel().getLastFocused();
          c.toggleSortState();
          if (b) {
            a.ownerCt.ensureVisible(b.record)
          }
        }
        this.onHeaderClick(c, d, c.el)
      }
    },
    onFocusableContainerMousedown: function(c, b) {
      var a = Ext.Component.fromElement(b);
      if (a === this) {
        c.preventDefault()
      } else {
        a.focus()
      }
    }
  }
}, 0, ["headercontainer"], ["component", "box", "container",
  "headercontainer"
], {
  component: true,
  box: true,
  container: true,
  headercontainer: true
}, ["widget.headercontainer"], [
  [Ext.util.FocusableContainer.prototype.mixinId || Ext.util.FocusableContainer
    .$className, Ext.util.FocusableContainer
  ]
], [Ext.grid.header, "Container"], 0));
(Ext.cmd.derive("Ext.grid.column.Column", Ext.grid.header.Container, {
    alternateClassName: "Ext.grid.Column",
    config: {
      triggerVisible: false
    },
    baseCls: "x-column-header",
    hoverCls: "x-column-header-over",
    handleWidth: Ext.supports.Touch ? 10 : 4,
    ariaRole: "columnheader",
    enableFocusableContainer: false,
    sortState: null,
    possibleSortStates: ["ASC", "DESC"],
    ariaSortStates: {
      ASC: "ascending",
      DESC: "descending"
    },
    childEls: ["titleEl", "triggerEl", "textEl", "textContainerEl"],
    headerWrap: false,
    renderTpl: [
      '<div id="{id}-titleEl" data-ref="titleEl" role="presentation"',
      '{tipMarkup}class="', "x-",
      'column-header-inner<tpl if="!$comp.isContainer"> ', "x-",
      "leaf-column-header</tpl>", '<tpl if="empty"> ', "x-",
      'column-header-inner-empty</tpl>">',
      '<div id="{id}-textContainerEl" data-ref="textContainerEl" role="presentation" class="',
      "x-", 'column-header-text-container">',
      '<div role="presentation" class="', "x-",
      'column-header-text-wrapper">',
      '<div id="{id}-textEl" data-ref="textEl" role="presentation" class="',
      "x-", "column-header-text", '{childElCls}">',
      '<span role="presentation" class="', "x-",
      'column-header-text-inner">{text}</span>', "</div>", "</div>",
      "</div>", '<tpl if="!menuDisabled">',
      '<div id="{id}-triggerEl" data-ref="triggerEl" role="presentation" class="',
      "x-", "column-header-trigger",
      '{childElCls}" style="{triggerStyle}"></div>', "</tpl>", "</div>",
      "{%this.renderContainer(out,values)%}"
    ],
    dataIndex: null,
    text: "&#160;",
    menuText: null,
    emptyCellText: "&#160;",
    sortable: true,
    resizable: true,
    hideable: true,
    menuDisabled: false,
    renderer: false,
    align: "left",
    draggable: true,
    tooltipType: "qtip",
    initDraggable: Ext.emptyFn,
    tdCls: "",
    producesHTML: true,
    ignoreExport: false,
    isHeader: true,
    isColumn: true,
    tabIndex: -1,
    ascSortCls: "x-column-header-sort-ASC",
    descSortCls: "x-column-header-sort-DESC",
    componentLayout: "columncomponent",
    groupSubHeaderCls: "x-group-sub-header",
    groupHeaderCls: "x-group-header",
    clickTargetName: "titleEl",
    detachOnRemove: true,
    initResizable: Ext.emptyFn,
    rendererNames: {
      column: "renderer",
      edit: "editRenderer",
      summary: "summaryRenderer"
    },
    formatterNames: {
      column: "formatter",
      edit: "editFormatter",
      summary: "summaryFormatter"
    },
    initComponent: function() {
      var a = this;
      if (!a.rendererScope) {
        a.rendererScope = a.scope
      }
      if (a.header != null) {
        a.text = a.header;
        a.header = null
      }
      if (a.cellWrap) {
        a.tdCls = (a.tdCls || "") + " x-wrap-cell"
      }
      if (a.columns != null) {
        a.isGroupHeader = true;
        a.ariaRole = "presentation";
        a.items = a.columns;
        a.columns = a.flex = a.width = null;
        a.cls = (a.cls || "") + " " + a.groupHeaderCls;
        a.sortable = a.resizable = false;
        a.align = "center"
      } else {
        if (a.flex) {
          a.minWidth = a.minWidth || Ext.grid.plugin.HeaderResizer.prototype
            .minColWidth
        }
      }
      a.addCls("x-column-header-align-" + a.align);
      a.setupRenderer();
      a.setupRenderer("edit");
      a.setupRenderer("summary");
      Ext.grid.header.Container.prototype.initComponent.apply(this,
        arguments)
    },
    bindFormatter: function(b) {
      var a = this;
      return function(c) {
        return b.format(c, b.scope || a.rendererScope || a.resolveListenerScope())
      }
    },
    bindRenderer: function(b) {
      var a = this;
      a.hasCustomRenderer = true;
      return function() {
        return Ext.callback(b, a.rendererScope, arguments, 0, a)
      }
    },
    setupRenderer: function(b) {
      b = b || "column";
      var c = this,
        e = c[c.formatterNames[b]],
        d = c[c.rendererNames[b]],
        a = b === "column",
        f;
      if (!e) {
        if (d) {
          if (typeof d === "string") {
            d = c[c.rendererNames[b]] = c.bindRenderer(d)
          }
          if (a) {
            c.hasCustomRenderer = d.length > 1
          }
        } else {
          if (a && c.defaultRenderer) {
            c.renderer = c.defaultRenderer;
            c.usingDefaultRenderer = true
          }
        }
      } else {
        f = e.indexOf("this.") === 0;
        if (f) {
          e = e.substring(5)
        }
        e = Ext.app.bind.Template.prototype.parseFormat(e);
        c[c.formatterNames[b]] = null;
        if (f) {
          e.scope = null
        }
        c[c.rendererNames[b]] = c.bindFormatter(e)
      }
    },
    getView: function() {
      var a = this.getRootHeaderCt();
      if (a) {
        return a.view
      }
    },
    onResize: function(d, a, c, g) {
      var e = this,
        b, f;
      Ext.grid.header.Container.prototype.onResize.apply(this, arguments);
      if (c && e.cellWrap) {
        b = e.getView();
        if (b) {
          f = b.bufferedRenderer;
          if (f) {
            f.onWrappedColumnWidthChange(c, d)
          }
        }
      }
    },
    onFocusLeave: function(a) {
      Ext.grid.header.Container.prototype.onFocusLeave.call(this, a);
      if (this.activeMenu) {
        this.activeMenu.hide()
      }
    },
    initItems: function() {
      var a = this;
      Ext.grid.header.Container.prototype.initItems.apply(this, arguments);
      if (a.isGroupHeader) {
        if (a.config.hidden || !a.hasVisibleChildColumns()) {
          a.hide()
        }
      }
    },
    hasVisibleChildColumns: function() {
      var b = this.items.items,
        a = b.length,
        c, d;
      for (c = 0; c < a; ++c) {
        d = b[c];
        if (d.isColumn && !d.hidden) {
          return true
        }
      }
      return false
    },
    onAdd: function(b) {
      var a = this;
      if (b.isColumn) {
        b.isSubHeader = true;
        b.addCls(a.groupSubHeaderCls)
      }
      if (a.isGroupHeader && a.hidden && a.hasVisibleChildColumns()) {
        a.show()
      }
      Ext.grid.header.Container.prototype.onAdd.call(this, b)
    },
    onRemove: function(c, a) {
      var b = this;
      if (c.isSubHeader) {
        c.isSubHeader = false;
        c.removeCls(b.groupSubHeaderCls)
      }
      Ext.grid.header.Container.prototype.onRemove.call(this, c, a);
      if (!(b.destroyed || b.destroying) && !b.hasVisibleChildColumns() &&
        !b.ownerCt.isNested()) {
        b.hide()
      }
    },
    initRenderData: function() {
      var b = this,
        e = "",
        c = b.tooltip,
        d = b.text,
        a = b.tooltipType === "qtip" ? "data-qtip" : "title";
      if (!Ext.isEmpty(c)) {
        e = a + '="' + c + '" '
      }
      return Ext.applyIf(Ext.grid.header.Container.prototype.initRenderData
        .apply(this, arguments), {
          text: d,
          empty: d === "&#160;" || d === " " || d === "",
          menuDisabled: b.menuDisabled,
          tipMarkup: e,
          triggerStyle: this.getTriggerVisible() ? "display:block" : ""
        })
    },
    applyColumnState: function(b) {
      var a = this;
      a.applyColumnsState(b.columns);
      if (b.hidden != null) {
        a.hidden = b.hidden
      }
      if (b.locked != null) {
        a.locked = b.locked
      }
      if (b.sortable != null) {
        a.sortable = b.sortable
      }
      if (b.width != null) {
        a.flex = null;
        a.width = b.width
      } else {
        if (b.flex != null) {
          a.width = null;
          a.flex = b.flex
        }
      }
    },
    getColumnState: function() {
      var e = this,
        b = e.items.items,
        a = b ? b.length : 0,
        d, c = [],
        f = {
          id: e.stateId || e.getStateId()
        };
      e.savePropsToState(["hidden", "sortable", "locked", "flex", "width"],
        f);
      if (e.isGroupHeader) {
        for (d = 0; d < a; d++) {
          c.push(b[d].getColumnState())
        }
        if (c.length) {
          f.columns = c
        }
      }
      if ("width" in f) {
        delete f.flex
      }
      return f
    },
    getStateId: function() {
      return (this.stateId = this.stateId || this.headerId)
    },
    setText: function(a) {
      this.text = a;
      if (this.rendered) {
        this.textEl.setHtml(a)
      }
    },
    getIndex: function() {
      return this.isGroupColumn ? false : this.getRootHeaderCt().getHeaderIndex(
        this)
    },
    getVisibleIndex: function() {
      return this.visibleIndex != null ? this.visibleIndex : this.isGroupColumn ?
        false : Ext.Array.indexOf(this.getRootHeaderCt().getVisibleGridColumns(),
          this)
    },
    getLabelChain: function() {
      var c = this,
        b = [],
        a;
      while (a = c.up("headercontainer")) {
        if (a.text) {
          b.unshift(Ext.util.Format.stripTags(a.text))
        }
        c = a
      }
      return b
    },
    beforeRender: function() {
      var c = this,
        a = c.getRootHeaderCt(),
        d = c.isSortable(),
        e = [],
        b;
      Ext.grid.header.Container.prototype.beforeRender.call(this);
      if (!d && !c.groupable && !c.lockable && (a.grid.enableColumnHide ===
          false || !a.getHideableColumns().length)) {
        c.menuDisabled = true
      }
      if (c.cellWrap) {
        c.variableRowHeight = true
      }
      b = c.ariaRenderAttributes || (c.ariaRenderAttributes = {});
      b["aria-readonly"] = true;
      if (d) {
        b["aria-sort"] = c.ariaSortStates[c.sortState]
      }
      if (c.isSubHeader) {
        e = c.getLabelChain();
        if (c.text) {
          e.push(Ext.util.Format.stripTags(c.text))
        }
        if (e.length) {
          b["aria-label"] = e.join(" ")
        }
      }
      c.protoEl.unselectable()
    },
    getTriggerElWidth: function() {
      var c = this,
        b = c.triggerEl,
        a = c.self.triggerElWidth;
      if (b && a === undefined) {
        b.setStyle("display", "block");
        a = c.self.triggerElWidth = b.getWidth();
        b.setStyle("display", "")
      }
      return a
    },
    afterComponentLayout: function(d, a, b, f) {
      var e = this,
        c = e.getRootHeaderCt();
      Ext.grid.header.Container.prototype.afterComponentLayout.apply(this,
        arguments);
      if (c && (b != null || e.flex) && d !== b) {
        c.onHeaderResize(e, d)
      }
    },
    onDestroy: function() {
      var a = this;
      Ext.destroy(a.field);
      a.field = null;
      Ext.grid.header.Container.prototype.onDestroy.apply(this, arguments)
    },
    onTitleMouseOver: function() {
      this.titleEl.addCls(this.hoverCls)
    },
    onTitleMouseOut: function() {
      this.titleEl.removeCls(this.hoverCls)
    },
    onDownKey: function(a) {
      if (this.triggerEl) {
        this.onTitleElClick(a, this.triggerEl.dom || this.el.dom)
      }
    },
    onEnterKey: function(a) {
      this.onTitleElClick(a, this.el.dom)
    },
    onTitleElDblClick: function(d) {
      var b = this,
        a, c, f;
      if (b.isAtStartEdge(d)) {
        a = b.previousNode("gridcolumn:not([hidden]):not([isGroupHeader])");
        if (a && a.getRootHeaderCt() === b.getRootHeaderCt()) {
          a.autoSize()
        }
      } else {
        if (b.isAtEndEdge(d)) {
          if (b.isGroupHeader && d.getPoint().isContainedBy(b.layout.innerCt)) {
            c = b.query("gridcolumn:not([hidden]):not([isGroupHeader])");
            b.getRootHeaderCt().autoSizeColumn(c[c.length - 1]);
            return
          } else {
            f = b.getRootHeaderCt();
            if (f.visibleColumnManager.getColumns().length === 1 && f.forceFit) {
              return
            }
          }
          b.autoSize()
        }
      }
    },
    autoSize: function() {
      var b = this,
        c, e, a, d;
      if (b.isGroupHeader) {
        c = b.query("gridcolumn:not([hidden]):not([isGroupHeader])");
        e = c.length;
        d = b.getRootHeaderCt();
        Ext.suspendLayouts();
        for (a = 0; a < e; a++) {
          d.autoSizeColumn(c[a])
        }
        Ext.resumeLayouts(true);
        return
      }
      b.getRootHeaderCt().autoSizeColumn(b)
    },
    onTitleElClick: function(g, c, d) {
      var f = this,
        a, b;
      if (g.pointerType === "touch") {
        b = f.previousSibling(":not([hidden])");
        if (!f.menuDisabled && f.isAtEndEdge(g, parseInt(f.triggerEl.getStyle(
            "width"), 10))) {
          if (!f.menuDisabled) {
            a = f
          }
        } else {
          if (b && !b.menuDisabled && f.isAtStartEdge(g)) {
            a = b
          }
        }
      } else {
        a = f.triggerEl && (g.target === f.triggerEl.dom || c === f.triggerEl ||
          g.within(f.triggerEl)) ? f : null
      }
      if (d !== false && (!a && !f.isAtStartEdge(g) && !f.isAtEndEdge(g) ||
          g.getKey())) {
        f.toggleSortState()
      }
      return a
    },
    processEvent: function(f, b, a, c, d, g) {
      return this.fireEvent.apply(this, arguments)
    },
    isSortable: function() {
      var b = this.getRootHeaderCt(),
        a = b ? b.grid : null,
        c = this.sortable;
      if (a && a.sortableColumns === false) {
        c = false
      }
      return c
    },
    toggleSortState: function() {
      if (this.isSortable()) {
        this.sort()
      }
    },
    sort: function(d) {
      var c = this,
        b = c.up("tablepanel"),
        a = b.store;
      Ext.suspendLayouts();
      c.sorting = true;
      a.sort(c.getSortParam(), d, b.multiColumnSort ? "multi" : "replace");
      delete c.sorting;
      Ext.resumeLayouts(true)
    },
    getSortParam: function() {
      return this.dataIndex
    },
    setSortState: function(h) {
      var d = this,
        e = h && h.getDirection(),
        g = d.ascSortCls,
        b = d.descSortCls,
        c = d.getRootHeaderCt(),
        a = d.ariaEl.dom,
        f;
      switch (e) {
        case "DESC":
          if (!d.hasCls(b)) {
            d.addCls(b);
            d.sortState = "DESC";
            f = true
          }
          d.removeCls(g);
          break;
        case "ASC":
          if (!d.hasCls(g)) {
            d.addCls(g);
            d.sortState = "ASC";
            f = true
          }
          d.removeCls(b);
          break;
        default:
          d.removeCls([g, b]);
          d.sortState = null;
          break
      }
      if (a) {
        if (d.sortState) {
          a.setAttribute("aria-sort", d.ariaSortStates[d.sortState])
        } else {
          a.removeAttribute("aria-sort")
        }
      }
      if (f) {
        c.fireEvent("sortchange", c, d, e)
      }
    },
    isHideable: function() {
      var a = {
        hideCandidate: this,
        result: this.hideable
      };
      if (a.result) {
        this.ownerCt.bubble(this.hasOtherMenuEnabledChildren, null, [a])
      }
      return a.result
    },
    hasOtherMenuEnabledChildren: function(a) {
      var b, c;
      if (!this.isXType("headercontainer")) {
        a.result = false;
        return false
      }
      b = this.query(">:not([hidden]):not([menuDisabled])");
      c = b.length;
      if (Ext.Array.contains(b, a.hideCandidate)) {
        c--
      }
      if (c) {
        return false
      }
      a.hideCandidate = this
    },
    isLockable: function() {
      var a = {
        result: this.lockable !== false
      };
      if (a.result) {
        this.ownerCt.bubble(this.hasMultipleVisibleChildren, null, [a])
      }
      return a.result
    },
    isLocked: function() {
      return this.locked || !!this.up("[isColumn][locked]",
        "[isRootHeader]")
    },
    hasMultipleVisibleChildren: function(a) {
      if (!this.isXType("headercontainer")) {
        a.result = false;
        return false
      }
      if (this.query(">:not([hidden])").length > 1) {
        return false
      }
    },
    hide: function() {
      var c = this,
        b = c.getRootHeaderCt(),
        a = c.getRefOwner();
      if (a.constructing) {
        Ext.grid.header.Container.prototype.hide.call(this);
        return c
      }
      if (c.rendered && !c.isVisible()) {
        return c
      }
      if (b.forceFit) {
        c.visibleSiblingCount = b.getVisibleGridColumns().length - 1;
        if (c.flex) {
          c.savedWidth = c.getWidth();
          c.flex = null
        }
      }
      b.beginChildHide();
      Ext.suspendLayouts();
      if (a.isGroupHeader) {
        if (c.isNestedGroupHeader()) {
          a.hide()
        }
        if (c.isSubHeader && !c.isGroupHeader && a.query(">:not([hidden])")
          .length === 1) {
          a.lastCheckedHeaderId = c.id
        }
      }
      Ext.grid.header.Container.prototype.hide.call(this);
      b.endChildHide();
      b.onHeaderHide(c);
      Ext.resumeLayouts(true);
      return c
    },
    show: function() {
      var c = this,
        a = c.getRootHeaderCt(),
        b = c.ownerCt;
      if (c.isVisible()) {
        return c
      }
      if (c.rendered) {
        if (a.forceFit) {
          a.applyForceFit(c)
        }
      }
      Ext.suspendLayouts();
      if (c.isSubHeader && b.hidden) {
        b.show(false, true)
      }
      Ext.grid.header.Container.prototype.show.apply(this, arguments);
      if (c.isGroupHeader) {
        c.maybeShowNestedGroupHeader()
      }
      b = c.getRootHeaderCt();
      if (b) {
        b.onHeaderShow(c)
      }
      Ext.resumeLayouts(true);
      return c
    },
    getCellWidth: function() {
      var b = this,
        a;
      if (b.rendered && b.componentLayout && b.componentLayout.lastComponentSize) {
        a = b.componentLayout.lastComponentSize.width
      } else {
        if (b.width) {
          a = b.width
        } else {
          if (!b.isColumn) {
            a = b.getTableWidth()
          }
        }
      }
      return a
    },
    getCellId: function() {
      return "x-grid-cell-" + this.getItemId()
    },
    getCellSelector: function() {
      var a = this.getView();
      return (a ? a.getCellSelector() : "") + "." + this.getCellId()
    },
    getCellInnerSelector: function() {
      return this.getCellSelector() + " .x-grid-cell-inner"
    },
    isAtStartEdge: function(a) {
      return (a.getXY()[0] - this.getX() < this.handleWidth)
    },
    isAtEndEdge: function(b, a) {
      return (this.getX() + this.getWidth() - b.getXY()[0] <= (a || this.handleWidth))
    },
    setMenuActive: function(a) {
      this.activeMenu = a;
      this.titleEl[a ? "addCls" : "removeCls"](this.headerOpenCls)
    },
    deprecated: {
      5: {
        methods: {
          bindRenderer: function(a) {
            return function(b) {
              return Ext.util.Format[a](b)
            }
          }
        }
      }
    }
  }, 0, ["gridcolumn"], ["component", "box", "container", "headercontainer",
    "gridcolumn"
  ], {
    component: true,
    box: true,
    container: true,
    headercontainer: true,
    gridcolumn: true
  }, ["widget.gridcolumn"], 0, [Ext.grid.column, "Column", Ext.grid, "Column"],
  0));
(Ext.cmd.derive("Ext.grid.feature.Feature", Ext.util.Observable, {
  wrapsItem: false,
  isFeature: true,
  disabled: false,
  hasFeatureEvent: true,
  eventPrefix: null,
  eventSelector: null,
  view: null,
  grid: null,
  constructor: function(a) {
    this.initialConfig = a;
    Ext.util.Observable.prototype.constructor.apply(this, arguments)
  },
  clone: function() {
    return new this.self(this.initialConfig)
  },
  init: Ext.emptyFn,
  getFireEventArgs: function(b, a, c, d) {
    return [b, a, c, d]
  },
  vetoEvent: Ext.emptyFn,
  enable: function() {
    this.disabled = false
  },
  disable: function() {
    this.disabled = true
  }
}, 1, 0, 0, 0, ["feature.feature"], 0, [Ext.grid.feature, "Feature"], 0));
(Ext.cmd.derive("Ext.grid.feature.AbstractSummary", Ext.grid.feature.Feature, {
  summaryRowCls: "x-grid-row-summary",
  readDataOptions: {
    recordCreator: Ext.identityFn
  },
  summaryRowTpl: {
    fn: function(b, a, c) {
      if (a.record.isSummary && this.summaryFeature.showSummaryRow) {
        this.summaryFeature.outputSummaryRecord(a.record, a, b, c)
      } else {
        this.nextTpl.applyOut(a, b, c)
      }
    },
    priority: 1000
  },
  showSummaryRow: true,
  init: function() {
    var a = this;
    a.view.summaryFeature = a;
    a.rowTpl = a.view.self.prototype.rowTpl;
    a.view.addRowTpl(a.summaryRowTpl).summaryFeature = a;
    a.summaryData = {};
    a.groupInfo = {};
    if (!a.summaryTableCls) {
      a.summaryTableCls = "x-grid-item"
    }
    a.summaryRowSelector = "." + a.summaryRowCls
  },
  bindStore: function(b, a) {
    var c = this;
    Ext.destroy(c.readerListeners);
    if (c.remoteRoot) {
      c.readerListeners = a.getProxy().getReader().on({
        scope: c,
        destroyable: true,
        rawdata: c.onReaderRawData
      })
    }
  },
  onReaderRawData: function(a) {
    this.summaryRows = null;
    this.readerRawData = a
  },
  toggleSummaryRow: function(e, a) {
    var d = this,
      c = d.showSummaryRow,
      b;
    e = e != null ? !!e : !d.showSummaryRow;
    d.showSummaryRow = e;
    if (e && e !== c) {
      d.updateNext = true
    }
    if (d.lockingPartner) {
      if (!a) {
        d.lockingPartner.toggleSummaryRow(e, true);
        b = true
      }
    } else {
      b = true
    }
    if (b) {
      d.grid.ownerGrid.getView().refresh()
    }
  },
  createRenderer: function(e, b) {
    var f = this,
      c = b.ownerGroup,
      a = c ? f.summaryData[c] : f.summaryData,
      d = e.dataIndex || e.getItemId();
    return function(h, g) {
      return e.summaryRenderer ? e.summaryRenderer(b.data[d], a, d, g) :
        b.data[d]
    }
  },
  outputSummaryRecord: function(f, k, d) {
    var g = k.view,
      a = g.rowValues,
      c = k.columns || g.headerCt.getVisibleGridColumns(),
      j = c.length,
      e, b, h = {
        view: g,
        record: f,
        rowStyle: "",
        rowClasses: [this.summaryRowCls],
        itemClasses: [],
        recordIndex: -1,
        rowId: g.getRowId(f),
        columns: c
      };
    for (e = 0; e < j; e++) {
      b = c[e];
      b.savedRenderer = b.renderer;
      if (b.summaryType || b.summaryRenderer) {
        b.renderer = this.createRenderer(b, f)
      } else {
        b.renderer = Ext.emptyFn
      }
    }
    g.rowValues = h;
    g.self.prototype.rowTpl.applyOut(h, d, parent);
    g.rowValues = a;
    for (e = 0; e < j; e++) {
      b = c[e];
      b.renderer = b.savedRenderer;
      b.savedRenderer = null
    }
  },
  getSummary: function(a, b, f, e) {
    var d = !!e,
      c = d ? e : a;
    if (b) {
      if (Ext.isFunction(b)) {
        if (d) {
          return c.aggregate(f, b)
        } else {
          return c.aggregate(b, null, false, [f])
        }
      }
      switch (b) {
        case "count":
          return c.count(f);
        case "min":
          return c.min(f);
        case "max":
          return c.max(f);
        case "sum":
          return c.sum(f);
        case "average":
          return c.average(f);
        default:
          return ""
      }
    }
  },
  getRawData: function() {
    var a = this.readerRawData;
    if (a) {
      return a
    }
    return this.view.getStore().getProxy().getReader().rawData
  },
  generateSummaryData: function(b) {
    var f = this,
      m = f.summaryRows,
      j = {},
      h = {},
      g, d, a, c, e, m, l, k;
    if (!m) {
      a = f.getRawData();
      if (!a) {
        return
      }
      g = f.view.store.getProxy().getReader();
      d = Ext.create("reader." + g.type, g.getConfig());
      d.setRootProperty(f.remoteRoot);
      m = d.getRoot(a);
      if (m) {
        l = [];
        if (!Ext.isArray(m)) {
          m = [m]
        }
        e = m.length;
        for (c = 0; c < e; ++c) {
          k = d.extractRecordData(m[c], f.readDataOptions);
          l.push(k)
        }
        f.summaryRows = m = l
      }
      d.destroy();
      f.readerRawData = null
    }
    if (m) {
      for (c = 0, e = m.length; c < e; c++) {
        j = m[c];
        if (b) {
          h[j[b]] = j
        }
      }
    }
    return b ? h : j
  },
  setSummaryData: function(c, d, b, e) {
    var a = this.summaryData;
    if (e) {
      if (!a[e]) {
        a[e] = {}
      }
      a[e][d] = b
    } else {
      a[d] = b
    }
  },
  destroy: function() {
    Ext.destroy(this.readerListeners);
    this.readerRawData = this.summaryRows = null;
    Ext.grid.feature.Feature.prototype.destroy.call(this)
  }
}, 0, 0, 0, 0, ["feature.abstractsummary"], 0, [Ext.grid.feature,
  "AbstractSummary"
], 0));
(Ext.cmd.derive("Ext.grid.feature.GroupStore", Ext.util.Observable, {
  isStore: true,
  defaultViewSize: 100,
  isFeatureStore: true,
  badGrouperKey: "[object Object]",
  constructor: function(b, a) {
    Ext.util.Observable.prototype.constructor.call(this);
    this.groupingFeature = b;
    this.bindStore(a)
  },
  bindStore: function(a) {
    var b = this;
    if (!a || b.store !== a) {
      Ext.destroy(b.storeListeners);
      b.store = null
    }
    if (a) {
      b.storeListeners = a.on({
        groupchange: b.onGroupChange,
        remove: b.onRemove,
        add: b.onAdd,
        idchanged: b.onIdChanged,
        update: b.onUpdate,
        refresh: b.onRefresh,
        clear: b.onClear,
        scope: b,
        destroyable: true
      });
      b.store = a;
      b.processStore(a)
    }
  },
  processStore: function(f) {
    var w = this,
      n = w.groupingFeature,
      r = n.startCollapsed,
      y = w.data,
      a = Ext.Array,
      d = a.indexOf,
      x = a.splice,
      t = f.getGroups(),
      e = t ? t.length : 0,
      v = f.getGroupField(),
      j = t && a.unique(Ext.Object.getValues(t.itemGroupKeys)),
      c = false,
      u = n.getCache(),
      s, b, p, q, h, g, l, o, z, m, k;
    n.invalidateCache();
    b = n.getCache();
    if (y) {
      y.clear()
    } else {
      y = w.data = new Ext.util.Collection({
        rootProperty: "data",
        extraKeys: {
          byInternalId: {
            property: "internalId",
            rootProperty: ""
          }
        }
      })
    }
    if (f.getCount()) {
      n.startCollapsed = false;
      if (e > 0) {
        k = f.getModel();
        for (p = 0; p < e; p++) {
          g = t.getAt(p);
          z = g.getGroupKey();
          if (w.badGrouperKey === z && (h = n.getGrouper(v))) {
            n.startCollapsed = r;
            f.group(h);
            return
          }
          s = b[z] = u[z] || n.getMetaGroup(z);
          x(j, d(j, z), 1);
          c = s.isCollapsed = r || s.isCollapsed;
          if (c) {
            m = {};
            m[v] = z;
            s.placeholder = o = new k(m);
            o.isNonData = o.isCollapsedPlaceholder = true;
            o.group = g;
            y.add(o)
          } else {
            y.insert(w.data.length, g.items)
          }
        }
        if (j.length) {
          for (p = 0, q = j.length; p < q; p++) {
            l = j[p];
            b[l] = u[l]
          }
        }
        u = null
      } else {
        y.add(f.getRange())
      }
    }
  },
  isCollapsed: function(a) {
    return this.groupingFeature.getCache()[a].isCollapsed
  },
  isLoading: function() {
    return false
  },
  getData: function() {
    return this.data
  },
  getCount: function() {
    return this.data.getCount()
  },
  getTotalCount: function() {
    return this.data.getCount()
  },
  rangeCached: function(b, a) {
    return a < this.getCount()
  },
  getRange: function(d, b, c) {
    var a = this.data.getRange(d, Ext.isNumber(b) ? b + 1 : b);
    if (c && c.callback) {
      c.callback.call(c.scope || this, a, d, b, c)
    }
    return a
  },
  getAt: function(a) {
    return this.data.getAt(a)
  },
  getById: function(a) {
    return this.store.getById(a)
  },
  getByInternalId: function(a) {
    return this.store.getByInternalId(a) || this.data.byInternalId.get(a)
  },
  expandGroup: function(f) {
    var d = this,
      e = d.groupingFeature,
      b, g, c, a;
    if (typeof f === "string") {
      f = e.getGroup(f)
    }
    if (f) {
      a = f.items;
      b = e.getMetaGroup(f);
      g = b.placeholder
    }
    if (a.length && (c = d.data.indexOf(g)) !== -1) {
      b.isCollapsed = false;
      d.isExpandingOrCollapsing = 1;
      d.data.removeAt(c);
      d.data.insert(c, f.items);
      d.fireEvent("replace", d, c, [g], f.items);
      d.fireEvent("groupexpand", d, f);
      d.isExpandingOrCollapsing = 0
    }
  },
  collapseGroup: function(f) {
    var d = this,
      e = d.groupingFeature,
      c, g, a, b;
    if (typeof f === "string") {
      f = e.getGroup(f)
    }
    if (f) {
      b = f.items
    }
    if (b && (a = b.length) && (c = d.data.indexOf(b[0])) !== -1) {
      e.getMetaGroup(f).isCollapsed = true;
      d.isExpandingOrCollapsing = 2;
      d.data.removeAt(c, a);
      d.data.insert(c, g = d.getGroupPlaceholder(f));
      d.fireEvent("replace", d, c, b, [g]);
      d.fireEvent("groupcollapse", d, f);
      d.isExpandingOrCollapsing = 0
    }
  },
  getGroupPlaceholder: function(e) {
    var b = this.groupingFeature.getMetaGroup(e);
    if (!b.placeholder) {
      var a = this.store,
        g = a.getModel(),
        d = {},
        c = e.getGroupKey(),
        f;
      d[a.getGroupField()] = c;
      f = b.placeholder = new g(d);
      f.isNonData = f.isCollapsedPlaceholder = true;
      f.group = e
    }
    return b.placeholder
  },
  indexOf: function(a) {
    var b = -1;
    if (!a.isCollapsedPlaceholder) {
      b = this.data.indexOf(a)
    }
    return b
  },
  indexOfPlaceholder: function(a) {
    return this.data.indexOf(a)
  },
  indexOfId: function(a) {
    return this.data.indexOfKey(a)
  },
  indexOfTotal: function(a) {
    return this.store.indexOf(a)
  },
  onRefresh: function(a) {
    this.processStore(this.store);
    this.fireEvent("refresh", this)
  },
  onRemove: function(c, b, d, a) {
    var e = this;
    if (c.isMoving()) {
      return
    }
    e.processStore(e.store);
    e.fireEvent("refresh", e)
  },
  onClear: function(b, a, d) {
    var c = this;
    c.processStore(c.store);
    c.fireEvent("clear", c)
  },
  onAdd: function(b, a, d) {
    var c = this;
    c.processStore(c.store);
    c.fireEvent("replace", c, c.indexOf(a[0]), [], a)
  },
  onIdChanged: function(a, d, c, b) {
    this.data.updateKey(d, c)
  },
  onUpdate: function(j, f, c, e) {
    var i = this,
      a = i.groupingFeature,
      k, d, h, b, g;
    if (j.isGrouped()) {
      k = f.group = a.getGroup(f);
      if (k) {
        d = a.getMetaGroup(f);
        if (e && Ext.Array.contains(e, a.getGroupField())) {
          return i.onRefresh(i.store)
        }
        if (d.isCollapsed) {
          i.fireEvent("update", i, d.placeholder)
        } else {
          Ext.suspendLayouts();
          i.fireEvent("update", i, f, c, e);
          g = k.items;
          h = g[0];
          b = g[g.length - 1];
          if (h !== f) {
            h.group = k;
            i.fireEvent("update", i, h, "edit", e);
            delete h.group
          }
          if (b !== f && b !== h && a.showSummaryRow) {
            b.group = k;
            i.fireEvent("update", i, b, "edit", e);
            delete b.group
          }
          Ext.resumeLayouts(true)
        }
      }
      delete f.group
    } else {
      i.fireEvent("update", i, f, c, e)
    }
  },
  onGroupChange: function(b, a) {
    if (!a) {
      this.processStore(b)
    }
    this.fireEvent("groupchange", b, a)
  },
  destroy: function() {
    var a = this;
    a.bindStore(null);
    Ext.destroyMembers(a, "data", "groupingFeature");
    Ext.util.Observable.prototype.destroy.call(this)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.grid.feature, "GroupStore"], 0));
(Ext.cmd.derive("Ext.grid.feature.Grouping", Ext.grid.feature.Feature, {
  eventPrefix: "group",
  eventSelector: ".x-grid-group-hd",
  refreshData: {},
  wrapsItem: true,
  groupHeaderTpl: "{columnName}: {name}",
  depthToIndent: 17,
  collapsedCls: "x-grid-group-collapsed",
  hdCollapsedCls: "x-grid-group-hd-collapsed",
  hdNotCollapsibleCls: "x-grid-group-hd-not-collapsible",
  collapsibleCls: "x-grid-group-hd-collapsible",
  ctCls: "x-group-hd-container",
  groupByText: "Group by this field",
  showGroupsText: "Show in groups",
  hideGroupedHeader: false,
  startCollapsed: false,
  enableGroupingMenu: true,
  enableNoGroups: true,
  collapsible: true,
  groupers: null,
  expandTip: "Click to expand. CTRL key collapses all others",
  collapseTip: "Click to collapse. CTRL/click collapses all others",
  showSummaryRow: false,
  outerTpl: ["{%",
    "if (!(this.groupingFeature.disabled || values.rows.length === 1 && values.rows[0].isSummary)) {",
    "this.groupingFeature.setup(values.rows, values.view.rowValues);",
    "}", "this.nextTpl.applyOut(values, out, parent);",
    "if (!(this.groupingFeature.disabled || values.rows.length === 1 && values.rows[0].isSummary)) {",
    "this.groupingFeature.cleanup(values.rows, values.view.rowValues);",
    "}", "%}", {
      priority: 200
    }
  ],
  groupRowTpl: ["{%", "var me = this.groupingFeature,",
    'colspan = "colspan=" + values.columns.length;',
    "if (me.disabled || parent.rows.length === 1 && parent.rows[0].isSummary) {",
    "values.needsWrap = false;", "} else {",
    "me.setupRowData(values.record, values.rowIndex, values);", "}", "%}",
    '<tpl if="needsWrap">', '<tpl if="isFirstRow">',
    "{% values.view.renderColumnSizer(values, out); %}",
    '<tr data-boundView="{view.id}" data-recordId="{record.internalId:htmlEncode}" data-recordIndex="{[values.isCollapsedGroup ? -1 : values.recordIndex]}" class="{groupHeaderCls}">',
    '<td class="{[me.ctCls]}" {[colspan]}>', "{%",
    'var groupTitleStyle = (!values.view.lockingPartner || (values.view.ownerCt === values.view.ownerCt.ownerLockable.lockedGrid) || (values.view.lockingPartner.headerCt.getVisibleGridColumns().length === 0)) ? "" : "visibility:hidden";',
    "%}", '<div data-groupname="{groupName:htmlEncode}" class="', "x-",
    'grid-group-hd {collapsibleCls}" nottabindex="0" hidefocus="on" {ariaCellInnerAttr}>',
    '<div class="', "x-",
    'grid-group-title" style="{[groupTitleStyle]}" {ariaGroupTitleAttr}>',
    '{[values.groupHeaderTpl.apply(values.metaGroupCache, parent) || "&#160;"]}',
    "</div>", "</div>", "</td>", "</tr>", "</tpl>",
    '<tpl if="!isCollapsedGroup">', "{%",
    "values.itemClasses.length = 0;",
    "this.nextTpl.applyOut(values, out, parent);", "%}", "</tpl>",
    '<tpl if="summaryRecord">',
    "{%me.outputSummaryRecord(values.summaryRecord, values, out, parent);%}",
    "</tpl>", "<tpl else>",
    "{%this.nextTpl.applyOut(values, out, parent);%}", "</tpl>", {
      priority: 200,
      beginRowSync: function(a) {
        var b = this.groupingFeature;
        a.add("header", b.eventSelector);
        a.add("summary", b.summaryRowSelector)
      },
      syncContent: function(b, h, a) {
        b = Ext.fly(b, "syncDest");
        h = Ext.fly(h, "syncSrc");
        var e = this.groupingFeature,
          d = b.down(e.eventSelector, true),
          c = h.down(e.eventSelector, true),
          g = b.down(e.summaryRowSelector, true),
          f = h.down(e.summaryRowSelector, true);
        if (d && c) {
          Ext.fly(d).syncContent(c)
        }
        if (g && f) {
          if (a) {
            this.groupingFeature.view.updateColumns(g, f, a)
          } else {
            Ext.fly(g).syncContent(f)
          }
        }
      }
    }
  ],
  init: function(c) {
    var e = this,
      a = e.view,
      b = e.getGridStore(),
      d, f;
    a.isGrouping = b.isGrouped();
    e.mixins.summary.init.call(e);
    Ext.grid.feature.Feature.prototype.init.call(this, c);
    a.headerCt.on({
      columnhide: e.onColumnHideShow,
      columnshow: e.onColumnHideShow,
      columnmove: e.onColumnMove,
      scope: e
    });
    a.addTpl(Ext.XTemplate.getTpl(e, "outerTpl")).groupingFeature = e;
    a.addRowTpl(Ext.XTemplate.getTpl(e, "groupRowTpl")).groupingFeature =
      e;
    a.preserveScrollOnRefresh = true;
    if (b.isBufferedStore) {
      e.collapsible = false
    } else {
      d = e.lockingPartner;
      if (d && d.dataSource) {
        e.dataSource = a.dataSource = f = d.dataSource
      } else {
        e.dataSource = a.dataSource = f = new Ext.grid.feature.GroupStore(
          e, b)
      }
    }
    c = c.ownerLockable || c;
    c.on("beforereconfigure", e.beforeReconfigure, e);
    a.on({
      afterrender: e.afterViewRender,
      scope: e,
      single: true
    });
    if (f) {
      f.on("groupchange", e.onGroupChange, e)
    } else {
      e.setupStoreListeners(b)
    }
    e.mixins.summary.bindStore.call(e, c, c.getStore())
  },
  getGridStore: function() {
    return this.view.getStore()
  },
  indexOf: function(a) {
    return this.dataSource.indexOf(a)
  },
  indexOfPlaceholder: function(a) {
    return this.dataSource.indexOfPlaceholder(a)
  },
  isInCollapsedGroup: function(b) {
    var e = this,
      d = e.getGridStore(),
      a = false,
      c;
    if (d.isGrouped() && (c = e.getMetaGroup(b))) {
      a = !!(c && c.isCollapsed)
    }
    return a
  },
  createCache: function() {
    var a = this.metaGroupCache = {},
      b = this.lockingPartner;
    if (b) {
      b.metaGroupCache = a
    }
    return a
  },
  getCache: function() {
    return this.metaGroupCache || this.createCache()
  },
  invalidateCache: function() {
    var a = this.lockingPartner;
    this.metaGroupCache = null;
    if (a) {
      a.metaGroupCache = null
    }
  },
  vetoEvent: function(a, c, d, b) {
    if (b.type !== "mouseover" && b.type !== "mouseout" && b.type !==
      "mouseenter" && b.type !== "mouseleave" && b.getTarget(this.eventSelector)
    ) {
      return false
    }
  },
  enable: function() {
    var c = this,
      a = c.view,
      b = c.getGridStore(),
      e = c.hideGroupedHeader && c.getGroupedHeader(),
      d;
    a.isGrouping = true;
    if (a.lockingPartner) {
      a.lockingPartner.isGrouping = true
    }
    Ext.grid.feature.Feature.prototype.enable.call(this);
    if (c.lastGrouper) {
      b.group(c.lastGrouper);
      c.lastGrouper = null
    }
    if (e) {
      e.hide()
    }
    d = c.view.headerCt.getMenu().down("#groupToggleMenuItem");
    if (d) {
      d.setChecked(true, true)
    }
  },
  disable: function() {
    var c = this,
      a = c.view,
      b = c.getGridStore(),
      f = c.hideGroupedHeader && c.getGroupedHeader(),
      e = b.getGrouper(),
      d;
    a.isGrouping = false;
    if (a.lockingPartner) {
      a.lockingPartner.isGrouping = false
    }
    Ext.grid.feature.Feature.prototype.disable.call(this);
    if (e) {
      c.lastGrouper = e;
      b.clearGrouping()
    }
    if (f) {
      f.show()
    }
    d = c.view.headerCt.getMenu().down("#groupToggleMenuItem");
    if (d) {
      d.setChecked(false, true);
      d.disable()
    }
  },
  afterViewRender: function() {
    var b = this,
      a = b.view;
    a.on({
      scope: b,
      groupclick: b.onGroupClick
    });
    if (b.enableGroupingMenu) {
      b.injectGroupingMenu()
    }
    b.pruneGroupedHeader();
    b.lastGrouper = b.getGridStore().getGrouper();
    if (b.disabled) {
      b.disable()
    }
  },
  injectGroupingMenu: function() {
    var a = this,
      b = a.view.headerCt;
    b.showMenuBy = a.showMenuBy;
    b.getMenuItems = a.getMenuItems()
  },
  onColumnHideShow: function(d, g) {
    var k = this,
      l = k.view,
      b = l.headerCt,
      a = b.getMenu(),
      c = a.activeHeader,
      m = a.down("#groupMenuItem"),
      f, n = k.grid.getVisibleColumnManager().getColumns().length,
      j, h, e;
    if (c && m) {
      f = c.groupable === false || !c.dataIndex || k.view.headerCt.getVisibleGridColumns()
        .length < 2 ? "disable" : "enable";
      m[f]()
    }
    if (l.rendered && n) {
      j = l.el.query("." + k.ctCls);
      for (e = 0, h = j.length; e < h; ++e) {
        j[e].colSpan = n
      }
    }
  },
  onColumnMove: function() {
    var e = this,
      b = e.view,
      h, a, f, g, d, c;
    if (b.getStore().isGrouped()) {
      a = e.getCache().map;
      Ext.suspendLayouts();
      for (h in a) {
        f = e.getGroup(h);
        g = f.first();
        d = f.last();
        c = e.getMetaGroup(h);
        if (c.isCollapsed) {
          g = d = e.dataSource.getGroupPlaceholder(h)
        }
        b.refreshNode(g);
        if (e.showSummaryRow && d !== g) {
          b.refreshNode(d)
        }
      }
      Ext.resumeLayouts(true)
    }
  },
  showMenuBy: function(h, i, c) {
    var e = this,
      a = e.getMenu(),
      f = a.down("#groupMenuItem"),
      d = c.groupable === false || !c.dataIndex || e.view.headerCt.getVisibleGridColumns()
      .length < 2 ? "disable" : "enable",
      b = a.down("#groupToggleMenuItem"),
      g = e.grid.getStore().isGrouped();
    f[d]();
    if (b) {
      b.setChecked(g, true);
      b[g ? "enable" : "disable"]()
    }
    Ext.grid.header.Container.prototype.showMenuBy.apply(e, arguments)
  },
  getMenuItems: function() {
    var f = this,
      c = f.groupByText,
      e = f.disabled || !f.getGroupField(),
      a = f.showGroupsText,
      d = f.enableNoGroups,
      b = f.view.headerCt.getMenuItems;
    return function() {
      var g = b.call(this);
      g.push("-", {
        iconCls: "x-group-by-icon",
        itemId: "groupMenuItem",
        text: c,
        handler: f.onGroupMenuItemClick,
        scope: f
      });
      if (d) {
        g.push({
          itemId: "groupToggleMenuItem",
          text: a,
          checked: !e,
          checkHandler: f.onGroupToggleMenuItemClick,
          scope: f
        })
      }
      return g
    }
  },
  onGroupMenuItemClick: function(c, f) {
    var d = this,
      g = c.parentMenu,
      h = g.activeHeader,
      a = d.view,
      b = d.getGridStore();
    if (d.disabled) {
      d.lastGrouper = null;
      d.block();
      d.enable();
      d.unblock()
    }
    a.isGrouping = true;
    b.group(d.getGrouper(h.dataIndex) || h.dataIndex);
    d.pruneGroupedHeader()
  },
  block: function(a) {
    var b = this;
    b.blockRefresh = b.view.blockRefresh = true;
    if (b.lockingPartner && !a) {
      b.lockingPartner.block(true)
    }
  },
  unblock: function(a) {
    var b = this;
    b.blockRefresh = b.view.blockRefresh = false;
    if (b.lockingPartner && !a) {
      b.lockingPartner.unblock(true)
    }
  },
  onGroupToggleMenuItemClick: function(a, b) {
    this[b ? "enable" : "disable"]()
  },
  pruneGroupedHeader: function() {
    var a = this,
      b = a.getGroupedHeader();
    if (a.hideGroupedHeader && b) {
      Ext.suspendLayouts();
      if (a.prunedHeader && a.prunedHeader !== b) {
        a.prunedHeader.show()
      }
      a.prunedHeader = b;
      if (b.rendered) {
        b.hide()
      }
      Ext.resumeLayouts(true)
    }
  },
  getHeaderNode: function(f) {
    var d = this.view.getEl(),
      b, c, a, e;
    if (d) {
      f = Ext.htmlEncode(f);
      b = d.query(this.eventSelector);
      for (c = 0, a = b.length; c < a; ++c) {
        e = b[c];
        if (e.getAttribute("data-groupName") === f) {
          return e
        }
      }
    }
  },
  getGroup: function(b) {
    var a = this.getGridStore(),
      c = b,
      d;
    if (a.isGrouped()) {
      if (b.isModel) {
        b = b.get(a.getGroupField())
      }
      if (typeof b !== "string") {
        b = a.getGrouper().getGroupString(c)
      }
      d = a.getGroups().getByKey(b)
    }
    return d
  },
  getGrouper: function(a) {
    var b = this.groupers;
    if (!b) {
      return null
    }
    return Ext.Array.findBy(b, function(c) {
      return c.property === a
    })
  },
  getGroupField: function() {
    return this.getGridStore().getGroupField()
  },
  getMetaGroup: function(d) {
    var a = this.metaGroupCache || this.createCache(),
      c, b;
    if (d.isModel) {
      d = this.getGroup(d)
    }
    if (d != null) {
      c = (typeof d === "string") ? d : d.getGroupKey();
      b = a[c];
      if (!b) {
        b = a[c] = {
          isCollapsed: false,
          lastGroup: null,
          lastGroupGeneration: null,
          lastFilterGeneration: null,
          aggregateRecord: new Ext.data.Model()
        };
        if (!a.map) {
          a.map = {}
        }
        a.map[c] = true
      }
    }
    return b
  },
  isExpanded: function(a) {
    return !this.getMetaGroup(a).isCollapsed
  },
  expand: function(b, a) {
    this.doCollapseExpand(false, b, a)
  },
  expandAll: function() {
    var c = this,
      a = c.getCache(),
      b = c.lockingPartner,
      d;
    for (d in a) {
      if (a.hasOwnProperty(d)) {
        a[d].isCollapsed = false
      }
    }
    Ext.suspendLayouts();
    c.dataSource.onRefresh();
    Ext.resumeLayouts(true);
    for (d in a) {
      if (a.hasOwnProperty(d)) {
        c.afterCollapseExpand(false, d);
        if (b) {
          b.afterCollapseExpand(false, d)
        }
      }
    }
  },
  collapse: function(b, a) {
    this.doCollapseExpand(true, b, a)
  },
  isAllCollapsed: function() {
    var b = this,
      a = b.getCache(),
      c;
    for (c in a) {
      if (a.hasOwnProperty(c)) {
        if (!a[c].isCollapsed) {
          return false
        }
      }
    }
    return true
  },
  isAllExpanded: function() {
    var b = this,
      a = b.getCache(),
      c;
    for (c in a) {
      if (a.hasOwnProperty(c)) {
        if (a[c].isCollapsed) {
          return false
        }
      }
    }
    return true
  },
  collapseAll: function() {
    var c = this,
      a = c.getCache(),
      d, b = c.lockingPartner;
    for (d in a) {
      if (a.hasOwnProperty(d)) {
        a[d].isCollapsed = true
      }
    }
    Ext.suspendLayouts();
    c.dataSource.onRefresh();
    if (b && !b.isAllCollapsed()) {
      b.collapseAll()
    }
    Ext.resumeLayouts(true);
    for (d in a) {
      if (a.hasOwnProperty(d)) {
        c.afterCollapseExpand(true, d);
        if (b) {
          b.afterCollapseExpand(true, d)
        }
      }
    }
  },
  doCollapseExpand: function(e, f, a) {
    var c = this,
      b = c.lockingPartner,
      d = c.getGroup(f);
    if (c.getMetaGroup(d).isCollapsed !== e) {
      c.isExpandingOrCollapsing = true;
      Ext.suspendLayouts();
      if (e) {
        c.dataSource.collapseGroup(d)
      } else {
        c.dataSource.expandGroup(d)
      }
      Ext.resumeLayouts(true);
      c.afterCollapseExpand(e, f, a);
      if (b) {
        b.afterCollapseExpand(e, f, false)
      }
      c.isExpandingOrCollapsing = false
    }
  },
  afterCollapseExpand: function(d, g, b) {
    var c = this,
      a = c.view,
      f = a.bufferedRenderer,
      e;
    e = c.getHeaderNode(g);
    a.fireEvent(d ? "groupcollapse" : "groupexpand", a, e, g);
    if (b) {
      if (e) {
        a.scrollElIntoView(Ext.fly(e).up(a.getItemSelector()), false,
          true)
      } else {
        if (f) {
          f.scrollTo(c.getGroup(g).getAt(0))
        }
      }
    }
  },
  onGroupChange: function(b, a) {
    if (!a) {
      this.view.ownerGrid.getView().refresh()
    } else {
      this.lastGrouper = a
    }
  },
  getMenuItem: function(b) {
    var a = this.view,
      d = a.headerCt.down("gridcolumn[dataIndex=" + b + "]"),
      c = a.headerCt.getMenu();
    return d ? c.down("menuitem[headerId=" + d.id + "]") : null
  },
  onGroupKey: function(c, b) {
    var a = this,
      d = a.getGroupName(b.target);
    if (d) {
      a.onGroupClick(a.view, b.target, d, b)
    }
  },
  onGroupClick: function(h, a, j, d) {
    var f = this,
      i = f.getCache(),
      k = i.map,
      c = !f.isExpanded(j),
      b;
    if (f.collapsible) {
      if (d.ctrlKey) {
        Ext.suspendLayouts();
        for (b in k) {
          if (b === j) {
            if (c) {
              f.expand(j)
            }
          } else {
            if (!i[b].isCollapsed) {
              f.doCollapseExpand(true, b, false)
            }
          }
        }
        Ext.resumeLayouts(true);
        return
      }
      if (c) {
        f.expand(j)
      } else {
        f.collapse(j)
      }
    }
  },
  setupRowData: function(b, i, l) {
    var s = this,
      c = l.recordIndex,
      t = s.refreshData,
      a = s.getCache(),
      p = t.header,
      r = t.groupField,
      f = s.getGridStore(),
      q = s.view.dataSource,
      o = q.isBufferedStore,
      g = b.group,
      d = s.grid.columnManager.getHeaderByDataIndex(r),
      e = !!(d && d.renderer),
      n, h, k, m, j;
    l.isCollapsedGroup = false;
    l.summaryRecord = l.groupHeaderCls = null;
    if (t.doGrouping) {
      n = f.getGrouper();
      if (b.isCollapsedPlaceholder) {
        h = g.getGroupKey();
        j = g.items;
        l.isFirstRow = l.isLastRow = true;
        l.groupHeaderCls = s.hdCollapsedCls;
        l.isCollapsedGroup = l.needsWrap = true;
        l.groupName = h;
        l.metaGroupCache = a;
        a.groupField = r;
        a.name = a.renderedGroupValue = e ? d.renderer(g.getAt(0).get(r), {},
          b) : h;
        a.groupValue = j[0].get(r);
        a.columnName = p ? p.text : r;
        l.collapsibleCls = s.collapsible ? s.collapsibleCls : s.hdNotCollapsibleCls;
        a.rows = a.children = j;
        if (s.showSummaryRow) {
          l.summaryRecord = t.summaryData[h]
        }
        return
      }
      h = n.getGroupString(b);
      if (g) {
        j = g.items;
        l.isFirstRow = b === j[0];
        l.isLastRow = b === j[j.length - 1]
      } else {
        l.isFirstRow = c === 0;
        if (!l.isFirstRow) {
          k = f.getAt(c - 1);
          if (k) {
            l.isFirstRow = !k.isEqual(n.getGroupString(k), h)
          }
        }
        l.isLastRow = c === (o ? f.getTotalCount() : f.getCount()) - 1;
        if (!l.isLastRow) {
          m = f.getAt(c + 1);
          if (m) {
            l.isLastRow = !m.isEqual(n.getGroupString(m), h)
          }
        }
      }
      if (l.isFirstRow) {
        a.groupField = r;
        a.name = a.renderedGroupValue = e ? d.renderer(b.get(r), {}, b) :
          h;
        a.groupValue = b.get(r);
        a.columnName = p ? p.text : r;
        l.collapsibleCls = s.collapsible ? s.collapsibleCls : s.hdNotCollapsibleCls;
        l.groupName = h;
        if (!s.isExpanded(h)) {
          l.itemClasses.push(s.hdCollapsedCls);
          l.isCollapsedGroup = true
        }
        if (o) {
          a.rows = a.children = []
        } else {
          a.rows = a.children = s.getRecordGroup(b).items
        }
        l.metaGroupCache = a
      }
      if (l.isLastRow) {
        if (s.showSummaryRow) {
          l.summaryRecord = t.summaryData[h];
          l.itemClasses.push("x-grid-group-last")
        }
      }
      l.needsWrap = (l.isFirstRow || l.summaryRecord)
    }
  },
  setup: function(e, f) {
    var c = this,
      d = c.refreshData,
      a = f.view,
      b = a.isGrouping = !c.disabled && c.getGridStore().isGrouped(),
      g = a.bufferedRenderer;
    c.skippedRows = 0;
    if (g) {
      g.variableRowHeight = a.bufferedRenderer.variableRowHeight || b
    }
    d.groupField = c.getGroupField();
    d.header = c.getGroupedHeader(d.groupField);
    d.doGrouping = b;
    f.groupHeaderTpl = Ext.XTemplate.getTpl(c, "groupHeaderTpl");
    if (b && c.showSummaryRow) {
      d.summaryData = c.generateSummaryData()
    }
  },
  cleanup: function(b, c) {
    var a = this.refreshData;
    c.metaGroupCache = c.groupHeaderTpl = c.isFirstRow = null;
    a.groupField = a.header = a.summaryData = null
  },
  getAggregateRecord: function(a, b) {
    var c;
    if (b === true || !a.aggregateRecord) {
      c = new Ext.data.Model();
      a.aggregateRecord = c;
      c.isNonData = c.isSummary = true
    }
    return a.aggregateRecord
  },
  generateSummaryData: function() {
    var n = this,
      q = n.getGridStore(),
      c = q.getFilters(),
      d = q.getGroups().items,
      k = q.getProxy().getReader(),
      a = n.getGroupField(),
      m = n.lockingPartner,
      o = n.updateNext,
      h = {},
      e = n.view.ownerCt,
      g, l, r, f, j, b, p;
    if (n.remoteRoot) {
      p = n.mixins.summary.generateSummaryData.call(n, a);
      b = !!p
    }
    for (g = 0, l = d.length; g < l; ++g) {
      r = d[g];
      f = n.getMetaGroup(r);
      if (o || b || q.updating || n.didGroupChange(r, f, c)) {
        j = n.populateRecord(r, f, p);
        if (!m || (e === e.ownerLockable.normalGrid)) {
          f.lastGroup = r;
          f.lastGroupGeneration = r.generation;
          f.lastFilterGeneration = c.generation
        }
      } else {
        j = n.getAggregateRecord(f)
      }
      h[r.getGroupKey()] = j
    }
    n.updateNext = false;
    return h
  },
  getGroupName: function(b) {
    var d = this,
      a = d.view,
      c = d.eventSelector,
      f, e;
    f = Ext.fly(b).findParent(c);
    if (!f) {
      e = Ext.fly(b).findParent(a.itemSelector);
      if (e) {
        f = e.down(c, true)
      }
    }
    if (f) {
      return Ext.htmlDecode(f.getAttribute("data-groupname"))
    }
  },
  getRecordGroup: function(a) {
    var c = this.getGridStore(),
      b = c.getGrouper();
    if (b) {
      return c.getGroups().getByKey(b.getGroupString(a))
    }
  },
  getGroupedHeader: function(b) {
    var d = this,
      e = d.view.headerCt,
      c = d.lockingPartner,
      a, f;
    b = b || d.getGroupField();
    if (b) {
      a = "[dataIndex=" + b + "]";
      f = e.down(a);
      if (!f && c) {
        f = c.view.headerCt.down(a)
      }
    }
    return f || null
  },
  getFireEventArgs: function(b, a, d, c) {
    return [b, a, d, this.getGroupName(d), c]
  },
  destroy: function() {
    var a = this,
      b = a.dataSource;
    a.storeListeners = Ext.destroy(a.storeListeners);
    a.view = a.prunedHeader = a.grid = a.dataSource = a.groupers = null;
    a.invalidateCache();
    Ext.grid.feature.Feature.prototype.destroy.call(this);
    if (b) {
      b.bindStore(null);
      Ext.destroy(b)
    }
  },
  beforeReconfigure: function(c, i, d, a, e) {
    var g = this,
      h = g.view,
      b = g.dataSource,
      f;
    if (i && i !== a) {
      f = i.isBufferedStore;
      if (!b) {
        Ext.destroy(g.storeListeners);
        g.setupStoreListeners(i)
      }
      if (f !== a.isBufferedStore) {
        Ext.raise(
          "Cannot reconfigure grouping switching between buffered and non-buffered stores"
        )
      }
      h.isGrouping = !!i.getGrouper();
      b.bindStore(i)
    }
  },
  populateRecord: function(o, e, m) {
    var j = this,
      k = j.grid.ownerLockable ? j.grid.ownerLockable.view : j.view,
      n = j.getGridStore(),
      g = j.getAggregateRecord(e),
      d = k.headerCt.getGridColumns(),
      h = d.length,
      q = o.getGroupKey(),
      c, l, f, b, p, a;
    g.beginEdit();
    if (m) {
      c = m[q];
      for (l in c) {
        if (c.hasOwnProperty(l)) {
          if (l !== g.idProperty) {
            g.set(l, c[l])
          }
        }
      }
    }
    for (f = 0; f < h; ++f) {
      b = d[f];
      p = b.dataIndex || b.getItemId();
      if (!m) {
        a = j.getSummary(n, b.summaryType, p, o);
        g.set(p, a)
      } else {
        a = g.get(b.dataIndex)
      }
      j.setSummaryData(g, b.getItemId(), a, q)
    }
    g.ownerGroup = q;
    g.endEdit(true);
    g.commit();
    return g
  },
  privates: {
    didGroupChange: function(d, a, c) {
      var b = true;
      if (d === a.lastGroup) {
        b = a.lastGroupGeneration !== d.generation || a.lastFilterGeneration !==
          c.generation
      }
      return b
    },
    setupStoreListeners: function(a) {
      var b = this;
      b.storeListeners = a.on({
        groupchange: b.onGroupChange,
        scope: b,
        destroyable: true
      })
    }
  }
}, 0, 0, 0, 0, ["feature.grouping"], [
  ["summary", Ext.grid.feature.AbstractSummary]
], [Ext.grid.feature, "Grouping"], 0));
(Ext.cmd.derive("Ext.grid.feature.RowBody", Ext.grid.feature.Feature, {
  rowBodyCls: "x-grid-row-body",
  rowBodyHiddenCls: "x-grid-row-body-hidden",
  rowBodyTdSelector: "td.x-grid-cell-rowbody",
  eventPrefix: "rowbody",
  eventSelector: "tr.x-grid-rowbody-tr",
  colSpanDecrement: 0,
  bodyBefore: false,
  outerTpl: {
    fn: function(c, b, d) {
      var a = b.view,
        e = a.rowValues;
      this.rowBody.setup(b.rows, e);
      this.nextTpl.applyOut(b, c, d);
      this.rowBody.cleanup(b.rows, e)
    },
    priority: 100
  },
  extraRowTpl: ["{%", "if(this.rowBody.bodyBefore) {",
    "values.view.renderColumnSizer(values, out);", "} else {",
    "this.nextTpl.applyOut(values, out, parent);", "}",
    "values.view.rowBodyFeature.setupRowData(values.record, values.recordIndex, values);",
    "%}", '<tr class="x-grid-rowbody-tr {rowBodyCls}" {ariaRowAttr}>',
    '<td class="x-grid-td x-grid-cell-rowbody" colspan="{rowBodyColspan}" {ariaCellAttr}>',
    '<div class="x-grid-rowbody {rowBodyDivCls}" {ariaCellInnerAttr}>{rowBody}</div>',
    "</td>", "</tr>", "{%", "if(this.rowBody.bodyBefore) {",
    "this.nextTpl.applyOut(values, out, parent);", "}", "%}", {
      priority: 100,
      beginRowSync: function(a) {
        a.add("rowBody", this.owner.eventSelector)
      },
      syncContent: function(c, f, b) {
        var a = this.owner,
          d = Ext.fly(c).down(a.eventSelector, true),
          e;
        if (d && (e = Ext.fly(f).down(a.eventSelector, true))) {
          Ext.fly(d).syncContent(e)
        }
      }
    }
  ],
  init: function(b) {
    var c = this,
      a = c.view = b.getView();
    b.variableRowHeight = a.variableRowHeight = true;
    a.rowBodyFeature = c;
    b.mon(a, {
      element: "el",
      click: c.onClick,
      scope: c
    });
    a.headerCt.on({
      columnschanged: c.onColumnsChanged,
      scope: c
    });
    a.addTpl(c.outerTpl).rowBody = c;
    a.addRowTpl(Ext.XTemplate.getTpl(this, "extraRowTpl")).rowBody = c;
    Ext.grid.feature.Feature.prototype.init.apply(this, arguments)
  },
  onClick: function(c) {
    var b = this,
      a = c.getTarget(b.eventSelector);
    if (a && Ext.fly(a = (a.previousSibling || a.nextSibling)).is(b.view.rowSelector)) {
      c.target = a;
      b.view.handleEvent(c)
    }
  },
  getSelectedRow: function(a, c) {
    var b = a.getNode(c);
    if (b) {
      return Ext.fly(b).down(this.eventSelector)
    }
    return null
  },
  onColumnsChanged: function(d) {
    var b = this.view.el.query(this.rowBodyTdSelector),
      e = d.getVisibleGridColumns().length,
      a = b.length,
      c;
    for (c = 0; c < a; ++c) {
      b[c].setAttribute("colSpan", e)
    }
  },
  setupRowData: function(a, c, b) {
    if (this.getAdditionalData) {
      Ext.apply(b, this.getAdditionalData(a.data, c, a, b))
    }
  },
  setup: function(a, b) {
    b.rowBodyCls = this.rowBodyCls;
    b.rowBodyColspan = this.view.headerCt.visibleColumnManager.getColumns()
      .length - this.colSpanDecrement
  },
  cleanup: function(a, b) {
    b.rowBodyCls = b.rowBodyColspan = b.rowBody = null
  }
}, 0, 0, 0, 0, ["feature.rowbody"], 0, [Ext.grid.feature, "RowBody"], 0));
(Ext.cmd.derive("Ext.menu.Item", Ext.Component, {
  alternateClassName: "Ext.menu.TextItem",
  isMenuItem: true,
  activated: false,
  activeCls: "x-menu-item-active",
  clickHideDelay: 0,
  destroyMenu: true,
  disabledCls: "x-menu-item-disabled",
  hideOnClick: true,
  menuAlign: "tl-tr?",
  menuExpandDelay: 200,
  menuHideDelay: 200,
  tooltipType: "qtip",
  focusable: true,
  ariaRole: "menuitem",
  ariaEl: "itemEl",
  baseCls: "x-menu-item",
  arrowCls: "x-menu-item-arrow",
  baseIconCls: "x-menu-item-icon",
  textCls: "x-menu-item-text",
  indentCls: "x-menu-item-indent",
  indentNoSeparatorCls: "x-menu-item-indent-no-separator",
  indentRightIconCls: "x-menu-item-indent-right-icon",
  indentRightArrowCls: "x-menu-item-indent-right-arrow",
  linkCls: "x-menu-item-link",
  linkHrefCls: "x-menu-item-link-href",
  childEls: ["itemEl", "iconEl", "textEl", "arrowEl"],
  renderTpl: '<tpl if="plain">{text}<tpl else><a id="{id}-itemEl" data-ref="itemEl" class="{linkCls}<tpl if="hasHref"> {linkHrefCls}</tpl>{childElCls}" href="{href}" <tpl if="hrefTarget"> target="{hrefTarget}"</tpl> hidefocus="true" unselectable="on"<tpl if="tabIndex != null"> tabindex="{tabIndex}"</tpl><tpl foreach="ariaAttributes"> {$}="{.}"</tpl>><span id="{id}-textEl" data-ref="textEl" class="{textCls} {textCls}-{ui} {indentCls}{childElCls}" unselectable="on">{text}</span><tpl if="hasIcon"><div role="presentation" id="{id}-iconEl" data-ref="iconEl" class="{baseIconCls}-{ui} {baseIconCls}{[values.rightIcon ? "-right" : ""]} {iconCls}{childElCls} {glyphCls}" style="<tpl if="icon">background-image:url({icon});</tpl><tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>"><tpl if="glyph">&#{glyph};</tpl></div></tpl><tpl if="showCheckbox"><div role="presentation" id="{id}-checkEl" data-ref="checkEl" class="{baseIconCls}-{ui} {baseIconCls}{[(values.hasIcon && !values.rightIcon) ? "-right" : ""]} {groupCls} {checkboxCls}{childElCls}"></div></tpl><tpl if="hasMenu"><div role="presentation" id="{id}-arrowEl" data-ref="arrowEl" class="{arrowCls} {arrowCls}-{ui}{childElCls}"></div></tpl></a></tpl>',
  maskOnDisable: false,
  iconAlign: "left",
  initComponent: function() {
    var b = this,
      a = b.cls ? [b.cls] : [],
      c;
    if (b.hasOwnProperty("canActivate")) {
      b.focusable = b.canActivate
    }
    if (b.plain) {
      a.push("x-menu-item-plain")
    }
    if (a.length) {
      b.cls = a.join(" ")
    }
    if (b.menu) {
      c = b.menu;
      b.menu = null;
      b.setMenu(c)
    }
    Ext.Component.prototype.initComponent.apply(this, arguments)
  },
  canFocus: function() {
    var a = this;
    return a.focusable && a.rendered && a.canActivate !== false && !a.destroying &&
      !a.destroyed && a.isVisible(true)
  },
  onFocus: function(b) {
    var a = this;
    Ext.Component.prototype.onFocus.call(this, b);
    if (!a.disabled) {
      if (!a.plain) {
        a.addCls(a.activeCls)
      }
      a.activated = true;
      if (a.hasListeners.activate) {
        a.fireEvent("activate", a)
      }
    }
  },
  onFocusLeave: function(b) {
    var a = this;
    Ext.Component.prototype.onFocusLeave.call(this, b);
    if (a.activated) {
      if (!a.plain) {
        a.removeCls(a.activeCls)
      }
      a.doHideMenu();
      a.activated = false;
      if (a.hasListeners.deactivate) {
        a.fireEvent("deactivate", a)
      }
    }
  },
  doHideMenu: function() {
    var a = this.menu;
    this.cancelDeferExpand();
    if (a && a.isVisible()) {
      a.hide()
    }
  },
  deferHideParentMenus: function() {
    var a = this.getRefOwner();
    if (a.floating) {
      a.bubble(function(b) {
        if (!b.floating && !b.isMenuItem) {
          return false
        }
        if (b.isMenu) {
          a = b
        }
      });
      a.hide()
    }
  },
  expandMenu: function(c, a) {
    var b = this;
    if (b.activated && b.menu) {
      b.hideOnClick = false;
      b.cancelDeferHide();
      a = a == null ? b.menuExpandDelay : a;
      if (a === 0) {
        b.doExpandMenu(c)
      } else {
        b.cancelDeferExpand();
        b.expandMenuTimer = Ext.defer(b.doExpandMenu, a, b, [c])
      }
    }
  },
  doExpandMenu: function(a) {
    var b = this,
      c = b.menu;
    if (!c.isVisible()) {
      b.parentMenu.activeChild = c;
      c.ownerCmp = b;
      c.parentMenu = b.parentMenu;
      c.constrainTo = document.body;
      c.autoFocus = !a || !a.pointerType;
      c.showBy(b, b.menuAlign)
    }
  },
  getRefItems: function(a) {
    var c = this.menu,
      b;
    if (c) {
      b = c.getRefItems(a);
      b.unshift(c)
    }
    return b || []
  },
  getValue: function() {
    return this.value
  },
  hideMenu: function(a) {
    var b = this;
    if (b.menu) {
      b.cancelDeferExpand();
      b.hideMenuTimer = Ext.defer(b.doHideMenu, Ext.isNumber(a) ? a : b.menuHideDelay,
        b)
    }
  },
  onClick: function(f) {
    var d = this,
      c = d.clickHideDelay,
      g = f.browserEvent,
      b, a;
    if (!d.href || d.disabled) {
      f.stopEvent();
      if (d.disabled) {
        return false
      }
    }
    if (d.disabled || d.handlingClick) {
      return
    }
    if (d.hideOnClick) {
      if (!c) {
        d.deferHideParentMenus()
      } else {
        d.deferHideParentMenusTimer = Ext.defer(d.deferHideParentMenus, c,
          d)
      }
    }
    b = d.fireEvent("click", d, f);
    if (d.destroyed) {
      return
    }
    if (b !== false && d.handler) {
      Ext.callback(d.handler, d.scope, [d, f], 0, d)
    }
    if (Ext.isIE9m) {
      a = g.returnValue === false ? true : false
    } else {
      a = !!g.defaultPrevented
    }
    if (d.href && f.type !== "click" && !a) {
      d.handlingClick = true;
      d.itemEl.dom.click();
      d.handlingClick = false
    }
    if (!d.hideOnClick) {
      d.focus()
    }
    return b
  },
  onRemoved: function() {
    var a = this;
    if (a.activated && a.parentMenu.activeItem === a) {
      a.parentMenu.deactivateActiveItem()
    }
    Ext.Component.prototype.onRemoved.apply(this, arguments);
    a.parentMenu = a.ownerCmp = null
  },
  beforeDestroy: function() {
    var a = this;
    if (a.rendered) {
      a.clearTip()
    }
    Ext.Component.prototype.beforeDestroy.call(this)
  },
  onDestroy: function() {
    var a = this;
    a.cancelDeferExpand();
    a.cancelDeferHide();
    clearTimeout(a.deferHideParentMenusTimer);
    a.setMenu(null);
    Ext.Component.prototype.onDestroy.apply(this, arguments)
  },
  beforeRender: function() {
    var i = this,
      j = i.glyph,
      h = Ext._glyphFontFamily,
      e = !!(i.icon || i.iconCls || j),
      k = !!i.menu,
      f = ((i.iconAlign === "right") && !k),
      c = i.isMenuCheckItem,
      a = [],
      d = i.ownerCt,
      g = d.plain,
      b;
    if (i.plain) {
      i.ariaEl = "el"
    }
    Ext.Component.prototype.beforeRender.call(this);
    if (e) {
      if (k && i.showCheckbox) {
        e = false
      }
    }
    if (typeof j === "string") {
      b = j.split("@");
      j = b[0];
      h = b[1]
    }
    if (!g || (e && !f) || c) {
      if (d.showSeparator && !g) {
        a.push(i.indentCls)
      } else {
        a.push(i.indentNoSeparatorCls)
      }
    }
    if (k) {
      a.push(i.indentRightArrowCls)
    } else {
      if (e && (f || c)) {
        a.push(i.indentRightIconCls)
      }
    }
    Ext.applyIf(i.renderData, {
      hasHref: !!i.href,
      href: i.href || "#",
      hrefTarget: i.hrefTarget,
      icon: i.icon,
      iconCls: i.iconCls,
      glyph: j,
      glyphCls: j ? "x-menu-item-glyph" : undefined,
      glyphFontFamily: h,
      hasIcon: e,
      hasMenu: k,
      indent: !g || e || c,
      isCheckItem: c,
      rightIcon: f,
      plain: i.plain,
      text: i.text,
      arrowCls: i.arrowCls,
      baseIconCls: i.baseIconCls,
      textCls: i.textCls,
      indentCls: a.join(" "),
      linkCls: i.linkCls,
      linkHrefCls: i.linkHrefCls,
      groupCls: i.group ? i.groupCls : "",
      tabIndex: i.tabIndex
    })
  },
  onRender: function() {
    var a = this;
    Ext.Component.prototype.onRender.apply(this, arguments);
    if (a.tooltip) {
      a.setTooltip(a.tooltip, true)
    }
  },
  getMenu: function() {
    return this.menu || null
  },
  setMenu: function(h, g) {
    var f = this,
      c = f.menu,
      b = f.arrowEl,
      a = f.ariaEl.dom,
      e, d;
    if (c) {
      c.ownerCmp = c.parentMenu = null;
      if (g === true || (g !== false && f.destroyMenu)) {
        Ext.destroy(c)
      }
      if (a) {
        a.removeAttribute("aria-haspopup");
        a.removeAttribute("aria-owns")
      } else {
        e = (f.ariaRenderAttributes || (f.ariaRenderAttributes = {}));
        delete e["aria-haspopup"];
        delete e["aria-owns"]
      }
    }
    if (h) {
      d = h.isMenu;
      h = f.menu = Ext.menu.Manager.get(h, {
        ownerCmp: f,
        focusOnToFront: false
      });
      h.setOwnerCmp(f, d);
      if (a) {
        a.setAttribute("aria-haspopup", true);
        a.setAttribute("aria-owns", h.id)
      } else {
        e = (f.ariaRenderAttributes || (f.ariaRenderAttributes = {}));
        e["aria-haspopup"] = true;
        e["aria-owns"] = h.id
      }
    } else {
      h = f.menu = null
    }
    if (h && f.rendered && !f.destroying && b) {
      b[h ? "addCls" : "removeCls"](f.arrowCls)
    }
  },
  setHandler: function(b, a) {
    this.handler = b || null;
    this.scope = a
  },
  setIcon: function(b) {
    var a = this.iconEl,
      c = this.icon;
    if (a) {
      a.src = b || Ext.BLANK_IMAGE_URL
    }
    this.icon = b;
    this.fireEvent("iconchange", this, c, b)
  },
  setIconCls: function(b) {
    var d = this,
      a = d.iconEl,
      c = d.iconCls;
    if (a) {
      if (d.iconCls) {
        a.removeCls(d.iconCls)
      }
      if (b) {
        a.addCls(b)
      }
    }
    d.iconCls = b;
    d.fireEvent("iconchange", d, c, b)
  },
  setText: function(d) {
    var c = this,
      b = c.textEl || c.el,
      a = c.text;
    c.text = d;
    if (c.rendered) {
      b.setHtml(d || "");
      c.updateLayout()
    }
    c.fireEvent("textchange", c, a, d)
  },
  getTipAttr: function() {
    return this.tooltipType === "qtip" ? "data-qtip" : "title"
  },
  clearTip: function() {
    if (Ext.quickTipsActive && Ext.isObject(this.tooltip)) {
      Ext.tip.QuickTipManager.unregister(this.itemEl)
    }
  },
  setTooltip: function(c, a) {
    var b = this;
    if (b.rendered) {
      if (!a) {
        b.clearTip()
      }
      if (Ext.quickTipsActive && Ext.isObject(c)) {
        Ext.tip.QuickTipManager.register(Ext.apply({
          target: b.itemEl.id
        }, c));
        b.tooltip = c
      } else {
        b.itemEl.dom.setAttribute(b.getTipAttr(), c)
      }
    } else {
      b.tooltip = c
    }
    return b
  },
  privates: {
    cancelDeferExpand: function() {
      window.clearTimeout(this.expandMenuTimer)
    },
    cancelDeferHide: function() {
      window.clearTimeout(this.hideMenuTimer)
    },
    getFocusEl: function() {
      return this.plain ? this.el : this.itemEl
    }
  }
}, 0, ["menuitem"], ["component", "box", "menuitem"], {
  component: true,
  box: true,
  menuitem: true
}, ["widget.menuitem"], [
  [Ext.mixin.Queryable.prototype.mixinId || Ext.mixin.Queryable.$className,
    Ext.mixin.Queryable
  ]
], [Ext.menu, "Item", Ext.menu, "TextItem"], 0));
(Ext.cmd.derive("Ext.menu.CheckItem", Ext.menu.Item, {
  checkedCls: "x-menu-item-checked",
  uncheckedCls: "x-menu-item-unchecked",
  groupCls: "x-menu-group-icon",
  hideOnClick: false,
  checkChangeDisabled: false,
  submenuText: "{0} submenu",
  ariaRole: "menuitemcheckbox",
  childEls: ["checkEl"],
  showCheckbox: true,
  isMenuCheckItem: true,
  checkboxCls: "x-menu-item-checkbox",
  initComponent: function() {
    var a = this;
    a.checked = !!a.checked;
    Ext.menu.Item.prototype.initComponent.apply(this, arguments);
    if (a.group) {
      Ext.menu.Manager.registerCheckable(a);
      if (a.initialConfig.hideOnClick !== false) {
        a.hideOnClick = true
      }
    }
  },
  beforeRender: function() {
    var b = this,
      a;
    Ext.menu.Item.prototype.beforeRender.call(this);
    Ext.apply(b.renderData, {
      checkboxCls: b.checkboxCls,
      showCheckbox: b.showCheckbox
    });
    a = (b.ariaRenderAttributes || (b.ariaRenderAttributes = {}));
    a["aria-checked"] = b.menu ? "mixed" : b.checked;
    if (b.menu) {
      a["aria-label"] = Ext.String.formatEncode(b.submenuText, b.text)
    }
  },
  afterRender: function() {
    var a = this;
    Ext.menu.Item.prototype.afterRender.call(this);
    a.checked = !a.checked;
    a.setChecked(!a.checked, true);
    if (a.checkChangeDisabled) {
      a.disableCheckChange()
    }
  },
  disableCheckChange: function() {
    var b = this,
      a = b.checkEl;
    if (a) {
      a.addCls(b.disabledCls)
    }
    if (Ext.isIE8 && b.rendered) {
      b.el.repaint()
    }
    b.checkChangeDisabled = true
  },
  enableCheckChange: function() {
    var b = this,
      a = b.checkEl;
    if (a) {
      a.removeCls(b.disabledCls)
    }
    b.checkChangeDisabled = false
  },
  onClick: function(b) {
    var a = this;
    if (!a.disabled && !a.checkChangeDisabled && !(a.checked && a.group)) {
      a.setChecked(!a.checked);
      if (b.type === "keydown" && a.menu) {
        return false
      }
    }
    Ext.menu.Item.prototype.onClick.call(this, b)
  },
  onDestroy: function() {
    Ext.menu.Manager.unregisterCheckable(this);
    Ext.menu.Item.prototype.onDestroy.apply(this, arguments)
  },
  setText: function(c) {
    var b = this,
      a = b.ariaEl.dom;
    Ext.menu.Item.prototype.setText.call(this, c);
    if (a && b.menu) {
      a.setAttribute("aria-label", Ext.String.formatEncode(b.submenuText,
        c))
    }
  },
  setChecked: function(e, c) {
    var d = this,
      f = d.checkedCls,
      g = d.uncheckedCls,
      b = d.el,
      a = d.ariaEl.dom;
    if (d.checked !== e && (c || d.fireEvent("beforecheckchange", d, e) !==
        false)) {
      if (b) {
        if (e) {
          b.addCls(f);
          b.removeCls(g)
        } else {
          b.addCls(g);
          b.removeCls(f)
        }
      }
      if (a) {
        a.setAttribute("aria-checked", d.menu ? "mixed" : !!e)
      }
      d.checked = e;
      Ext.menu.Manager.onCheckChange(d, e);
      if (!c) {
        Ext.callback(d.checkHandler, d.scope, [d, e], 0, d);
        d.fireEvent("checkchange", d, e)
      }
    }
  }
}, 0, ["menucheckitem"], ["component", "box", "menuitem", "menucheckitem"], {
  component: true,
  box: true,
  menuitem: true,
  menucheckitem: true
}, ["widget.menucheckitem"], 0, [Ext.menu, "CheckItem"], 0));
(Ext.cmd.derive("Ext.menu.Separator", Ext.menu.Item, {
  focusable: false,
  canActivate: false,
  hideOnClick: false,
  plain: true,
  separatorCls: "x-menu-item-separator",
  text: "&#160;",
  ariaRole: "separator",
  beforeRender: function(a, c) {
    var b = this;
    Ext.menu.Item.prototype.beforeRender.call(this);
    b.addCls(b.separatorCls)
  }
}, 0, ["menuseparator"], ["component", "box", "menuitem", "menuseparator"], {
  component: true,
  box: true,
  menuitem: true,
  menuseparator: true
}, ["widget.menuseparator"], 0, [Ext.menu, "Separator"], 0));
Ext.define("Ext.theme.neptune.menu.Separator", {
  override: "Ext.menu.Separator",
  border: true
});
(Ext.cmd.derive("Ext.menu.Menu", Ext.panel.Panel, {
  enableKeyNav: true,
  allowOtherMenus: false,
  ariaRole: "menu",
  floating: true,
  constrain: true,
  hidden: true,
  hideMode: "visibility",
  ignoreParentClicks: false,
  isMenu: true,
  showSeparator: true,
  minWidth: undefined,
  defaultMinWidth: 120,
  defaultAlign: "tl-bl?",
  focusOnToFront: false,
  bringParentToFront: false,
  defaultFocus: ":focusable",
  menuClickBuffer: 0,
  baseCls: "x-menu",
  _iconSeparatorCls: "x-menu-icon-separator",
  _itemCmpCls: "x-menu-item-cmp",
  layout: {
    type: "vbox",
    align: "stretchmax",
    overflowHandler: "Scroller"
  },
  initComponent: function() {
    var c = this,
      a = ["x-menu"],
      d = c.bodyCls ? [c.bodyCls] : [],
      e = c.floating !== false,
      b = {
        element: "el",
        click: c.onClick,
        mouseover: c.onMouseOver,
        scope: c
      };
    if (Ext.supports.Touch) {
      b.pointerdown = c.onMouseOver
    }
    c.on(b);
    c.on({
      beforeshow: c.onBeforeShow,
      scope: c
    });
    if (c.plain) {
      a.push("x-menu-plain")
    }
    c.cls = a.join(" ");
    d.push("x-menu-body", Ext.dom.Element.unselectableCls);
    c.bodyCls = d.join(" ");
    if (e) {
      if (c.minWidth === undefined) {
        c.minWidth = c.defaultMinWidth
      }
    } else {
      c.hidden = !!c.initialConfig.hidden;
      c.constrain = false
    }
    Ext.panel.Panel.prototype.initComponent.apply(this, arguments);
    Ext.override(c.getLayout(), {
      configureItem: c.configureItem
    })
  },
  initFloatConstrain: Ext.emptyFn,
  getInherited: function() {
    var a = Ext.panel.Panel.prototype.getInherited.call(this);
    a.hidden = this.hidden;
    return a
  },
  beforeRender: function() {
    var a = this;
    Ext.panel.Panel.prototype.beforeRender.apply(this, arguments);
    if (!a.getSizeModel().width.shrinkWrap) {
      a.layout.align = "stretch"
    }
    if (a.floating) {
      a.ariaRenderAttributes = a.ariaRenderAttributes || {};
      a.ariaRenderAttributes["aria-expanded"] = !!a.autoShow
    }
  },
  onBoxReady: function() {
    var a = this,
      b = a._iconSeparatorCls;
    a.focusableKeyNav.map.processEvent = function(c) {
      if (c.keyCode === c.ESC) {
        c.target = a.el.dom
      }
      return c
    };
    a.focusableKeyNav.map.addBinding([{
      key: 27,
      handler: a.onEscapeKey,
      scope: a
    }, {
      key: /[\w]/,
      handler: a.onShortcutKey,
      scope: a,
      shift: false,
      ctrl: false,
      alt: false
    }]);
    Ext.panel.Panel.prototype.onBoxReady.apply(this, arguments);
    if (a.showSeparator) {
      a.iconSepEl = a.body.insertFirst({
        role: "presentation",
        cls: b + " " + b + "-" + a.ui,
        html: "&#160;"
      })
    }
    if (Ext.supports.MSPointerEvents || Ext.supports.PointerEvents) {
      a.el.on({
        scope: a,
        click: a.preventClick,
        translate: false
      })
    }
    a.mouseMonitor = a.el.monitorMouseLeave(100, a.onMouseLeave, a)
  },
  onFocusLeave: function(b) {
    var a = this;
    Ext.panel.Panel.prototype.onFocusLeave.call(this, b);
    a.mixins.focusablecontainer.onFocusLeave.call(a, b);
    if (a.floating) {
      a.hide()
    }
  },
  canActivateItem: function(a) {
    return a && a.isFocusable()
  },
  deactivateActiveItem: function() {
    var a = this,
      b = a.lastFocusedChild;
    if (b) {
      b.blur()
    }
  },
  getItemFromEvent: function(d) {
    var a = this,
      c = a.layout.getRenderTarget().dom,
      b = d.getTarget();
    while (b.parentNode !== c) {
      b = b.parentNode;
      if (!b) {
        return
      }
    }
    return Ext.getCmp(b.id)
  },
  lookupComponent: function(b) {
    var a = this;
    if (typeof b === "string") {
      b = a.lookupItemFromString(b)
    } else {
      if (Ext.isObject(b)) {
        b = a.lookupItemFromObject(b)
      }
    }
    if (!b.dock) {
      b.minWidth = b.minWidth || a.minWidth
    }
    return b
  },
  lookupItemFromObject: function(b) {
    var a = this;
    if (!b.isComponent) {
      if (!b.xtype) {
        b = Ext.create("Ext.menu." + (Ext.isBoolean(b.checked) ? "Check" :
          "") + "Item", b)
      } else {
        b = Ext.ComponentManager.create(b, b.xtype)
      }
    }
    if (b.isMenuItem) {
      b.parentMenu = a
    }
    return b
  },
  lookupItemFromString: function(a) {
    return (a === "separator" || a === "-") ? new Ext.menu.Separator() :
      new Ext.menu.Item({
        canActivate: false,
        hideOnClick: false,
        plain: true,
        text: a
      })
  },
  configureItem: function(c) {
    var b = this.owner,
      e = "x-",
      d = b.ui,
      a, f;
    if (c.isMenuItem) {
      c.setUI(d)
    } else {
      if (b.items.getCount() > 1 && !c.rendered && !c.dock) {
        f = b._itemCmpCls;
        a = [f + " " + f + "-" + d];
        if (!b.plain && (c.indent !== false || c.iconCls === "no-icon")) {
          a.push(e + "menu-item-indent-" + d)
        }
        if (c.rendered) {
          c.el.addCls(a)
        } else {
          c.cls = (c.cls || "") + " " + a.join(" ")
        }
        c.$extraMenuCls = a
      }
    }
    this.callParent(arguments)
  },
  onRemove: function(a) {
    Ext.panel.Panel.prototype.onRemove.call(this, a);
    if (!a.destroyed && a.$extraMenuCls) {
      a.el.removeCls(a.$extraMenuCls)
    }
  },
  onClick: function(g) {
    var f = this,
      c = g.type,
      d, b, a = c === "keydown";
    if (f.disabled) {
      g.stopEvent();
      return
    }
    d = f.getItemFromEvent(g);
    if (d && d.isMenuItem) {
      if (!d.menu || !f.ignoreParentClicks) {
        b = d.onClick(g)
      } else {
        g.stopEvent()
      }
      if (d.menu && b !== false && a) {
        d.expandMenu(g, 0)
      }
    }
    if (!d || d.disabled) {
      d = undefined
    }
    f.fireEvent("click", f, d, g)
  },
  onDestroy: function() {
    var a = this;
    a.parentMenu = a.ownerCmp = null;
    if (a.rendered) {
      a.el.un(a.mouseMonitor);
      Ext.destroy(a.iconSepEl)
    }
    Ext.menu.Manager.onHide(a);
    Ext.panel.Panel.prototype.onDestroy.apply(this, arguments)
  },
  onMouseLeave: function(a) {
    if (this.disabled) {
      return
    }
    this.fireEvent("mouseleave", this, a)
  },
  onMouseOver: function(g) {
    var f = this,
      h = g.getRelatedTarget(),
      b = !f.el.contains(h),
      d = f.getItemFromEvent(g),
      c = f.parentMenu,
      a = f.ownerCmp;
    if (b && c) {
      c.setActiveItem(a);
      a.cancelDeferHide();
      c.mouseMonitor.mouseenter()
    }
    if (f.disabled) {
      return
    }
    if (d) {
      if (!d.containsFocus) {
        d.focus()
      }
      if (d.expandMenu) {
        d.expandMenu(g)
      }
    }
    if (b) {
      f.fireEvent("mouseenter", f, g)
    }
    f.fireEvent("mouseover", f, d, g)
  },
  setActiveItem: function(b) {
    var a = this;
    if (b && (b !== a.lastFocusedChild)) {
      a.focusChild(b, 1)
    }
  },
  onEscapeKey: function() {
    if (this.floating) {
      this.hide()
    }
  },
  onShortcutKey: function(h, g) {
    var b = String.fromCharCode(g.getCharCode()),
      c = this.query(">[text]"),
      a = c.length,
      f = this.lastFocusedChild,
      j = Ext.Array.indexOf(c, f),
      d = j;
    for (;;) {
      if (++d === a) {
        d = 0
      }
      f = c[d];
      if (d === j) {
        return
      }
      if (f.text && f.text[0].toUpperCase() === b) {
        f.focus();
        return
      }
    }
  },
  onFocusableContainerTabKey: function(a) {
    if (this.floating) {
      this.hide()
    }
  },
  onFocusableContainerEnterKey: function(a) {
    this.onClick(a)
  },
  onFocusableContainerSpaceKey: function(a) {
    this.onClick(a)
  },
  onFocusableContainerLeftKey: function(a) {
    if (this.parentMenu) {
      this.ownerCmp.focus();
      this.hide()
    }
  },
  onFocusableContainerRightKey: function(b) {
    var a = this,
      c = a.lastFocusedChild;
    if (c && c.expandMenu) {
      c.expandMenu(b, 0)
    }
  },
  onBeforeShow: function() {
    if (Ext.Date.getElapsed(this.lastHide) < this.menuClickBuffer) {
      return false
    }
  },
  beforeShow: function() {
    var b = this,
      c, a;
    if (b.floating) {
      if (!b.hasFloatMenuParent() && !b.allowOtherMenus) {
        Ext.menu.Manager.hideAll()
      }
      c = Ext.Element.getActiveElement();
      b.focusAnchor = c === document.body ? null : c;
      b.savedMaxHeight = b.maxHeight;
      a = b.container.getViewSize().height;
      b.maxHeight = Math.min(b.maxHeight || a, a)
    }
    Ext.panel.Panel.prototype.beforeShow.apply(this, arguments)
  },
  afterShow: function() {
    var b = this,
      a = b.ariaEl.dom;
    Ext.panel.Panel.prototype.afterShow.apply(this, arguments);
    Ext.menu.Manager.onShow(b);
    if (b.floating && a) {
      a.setAttribute("aria-expanded", true)
    }
    if (b.floating && b.autoFocus) {
      b.maxHeight = b.savedMaxHeight;
      b.focus()
    }
  },
  onHide: function(f, c, d) {
    var e = this,
      b = e.ariaEl.dom,
      a;
    if (e.el.contains(Ext.Element.getActiveElement())) {
      a = e.focusAnchor || e.ownerCmp || e.up(":focusable");
      if (a) {
        e.previousFocus = a
      }
    }
    Ext.panel.Panel.prototype.onHide.call(this, f, c, d);
    e.lastHide = Ext.Date.now();
    Ext.menu.Manager.onHide(e);
    if (e.floating && b) {
      b.setAttribute("aria-expanded", false)
    }
  },
  preventClick: function(b) {
    var a = this.getItemFromEvent(b);
    if (a && a.isMenuItem && !a.href) {
      b.preventDefault()
    }
  },
  privates: {
    hasFloatMenuParent: function() {
      return this.parentMenu || this.up("menu[floating=true]")
    },
    setOwnerCmp: function(b, a) {
      var c = this;
      c.parentMenu = b.isMenuItem ? b : null;
      c.ownerCmp = b;
      c.registerWithOwnerCt();
      delete c.hierarchicallyHidden;
      c.onInheritedAdd(b, a);
      c.containerOnAdded(b, a)
    }
  }
}, 0, ["menu"], ["component", "box", "container", "panel", "menu"], {
  component: true,
  box: true,
  container: true,
  panel: true,
  menu: true
}, ["widget.menu"], [
  [Ext.util.FocusableContainer.prototype.mixinId || Ext.util.FocusableContainer
    .$className, Ext.util.FocusableContainer
  ]
], [Ext.menu, "Menu"], 0));
Ext.define("Ext.theme.neptune.menu.Menu", {
  override: "Ext.menu.Menu",
  showSeparator: false
});
(Ext.cmd.derive("Ext.grid.locking.HeaderContainer", Ext.grid.header.Container, {
  headerCtRelayEvents: ["blur", "focus", "move", "resize", "destroy",
    "beforedestroy", "boxready", "afterrender", "render", "beforerender",
    "removed", "hide", "beforehide", "show", "beforeshow", "enable",
    "disable", "added", "deactivate", "beforedeactivate", "activate",
    "beforeactivate", "remove", "add", "beforeremove", "beforeadd",
    "afterlayout", "menucreate", "sortchange", "columnschanged",
    "columnshow", "columnhide", "columnmove", "headertriggerclick",
    "headercontextmenu", "headerclick", "columnresize", "statesave",
    "beforestatesave", "staterestore", "beforestaterestore"
  ],
  constructor: function(b) {
    var a = this,
      d = b.lockedGrid,
      c = b.normalGrid;
    a.lockable = b;
    Ext.grid.header.Container.prototype.constructor.call(this);
    d.visibleColumnManager.rootColumns = c.visibleColumnManager.rootColumns =
      b.visibleColumnManager = a.visibleColumnManager = new Ext.grid.ColumnManager(
        true, d.headerCt, c.headerCt);
    d.columnManager.rootColumns = c.columnManager.rootColumns = b.columnManager =
      a.columnManager = new Ext.grid.ColumnManager(false, d.headerCt, c.headerCt);
    a.lockedEventRelayers = a.relayEvents(d.headerCt, a.headerCtRelayEvents);
    a.normalEventRelayers = a.relayEvents(c.headerCt, a.headerCtRelayEvents)
  },
  destroy: function() {
    var a = this;
    Ext.destroy(a.lockedEventRelayers, a.normalEventRelayers);
    a.lockedEventRelayers = a.normalEventRelayers = null;
    Ext.grid.header.Container.prototype.destroy.call(this)
  },
  getRefItems: function() {
    return this.lockable.lockedGrid.headerCt.getRefItems().concat(this.lockable
      .normalGrid.headerCt.getRefItems())
  },
  getGridColumns: function() {
    return this.lockable.lockedGrid.headerCt.getGridColumns().concat(this
      .lockable.normalGrid.headerCt.getGridColumns())
  },
  getColumnsState: function() {
    var b = this,
      a = b.lockable.lockedGrid.headerCt.getColumnsState(),
      c = b.lockable.normalGrid.headerCt.getColumnsState();
    return a.concat(c)
  },
  applyColumnsState: function(g) {
    var o = this,
      e = o.lockable.lockedGrid,
      f = e.headerCt,
      m = o.lockable.normalGrid.headerCt,
      p = Ext.Array.toValueMap(f.items.items, "stateId"),
      h = Ext.Array.toValueMap(m.items.items, "stateId"),
      l = [],
      n = [],
      k = 1,
      b = g.length,
      j, a, d, c;
    for (j = 0; j < b; j++) {
      c = g[j];
      d = p[c.id];
      a = d || h[c.id];
      if (a) {
        if (a.applyColumnState) {
          a.applyColumnState(c)
        }
        if (a.locked === undefined) {
          a.locked = !!d
        }
        if (a.locked) {
          l.push(a);
          if (!a.hidden && typeof a.width === "number") {
            k += a.width
          }
        } else {
          n.push(a)
        }
      }
    }
    if (l.length + n.length === f.items.getCount() + m.items.getCount()) {
      f.removeAll(false);
      m.removeAll(false);
      f.add(l);
      m.add(n);
      e.setWidth(k)
    }
  },
  disable: function() {
    var a = this.lockable;
    a.lockedGrid.headerCt.disable();
    a.normalGrid.headerCt.disable()
  },
  enable: function() {
    var a = this.lockable;
    a.lockedGrid.headerCt.enable();
    a.normalGrid.headerCt.enable()
  }
}, 1, 0, ["component", "box", "container", "headercontainer"], {
  component: true,
  box: true,
  container: true,
  headercontainer: true
}, 0, 0, [Ext.grid.locking, "HeaderContainer"], 0));
(Ext.cmd.derive("Ext.grid.locking.View", Ext.Base, {
  alternateClassName: "Ext.grid.LockingView",
  isLockingView: true,
  loadMask: true,
  eventRelayRe: /^(beforeitem|beforecontainer|item|container|cell|refresh)/,
  constructor: function(a) {
    var c = Ext,
      e = this,
      d, b;
    e.ownerGrid = a.ownerGrid;
    e.ownerGrid.view = e;
    e.navigationModel = a.locked.xtype === "treepanel" ? new c.tree.NavigationModel(
      e) : new c.grid.NavigationModel(e);
    a.locked.viewConfig.bindStore = c.emptyFn;
    a.normal.viewConfig.bindStore = e.subViewBindStore;
    a.normal.viewConfig.isNormalView = a.locked.viewConfig.isLockedView =
      true;
    a.locked.viewConfig.beforeLayout = a.normal.viewConfig.beforeLayout =
      e.beforeLayout;
    a.locked.viewConfig.navigationModel = a.normal.viewConfig.navigationModel =
      e.navigationModel;
    e.lockedGrid = e.ownerGrid.lockedGrid = c.ComponentManager.create(a.locked);
    e.lockedView = d = e.lockedGrid.getView();
    e.selModel = a.normal.viewConfig.selModel = d.getSelectionModel();
    if (e.lockedGrid.isTree) {
      e.lockedView.animate = false;
      a.normal.store = d.store;
      a.normal.viewConfig.stripeRows = e.lockedView.stripeRows;
      a.normal.rowLines = e.lockedGrid.rowLines
    }
    e.normalGrid = e.ownerGrid.normalGrid = c.ComponentManager.create(a.normal);
    d.lockingPartner = b = e.normalView = e.normalGrid.getView();
    b.lockingPartner = d;
    e.loadMask = (a.loadMask !== undefined) ? a.loadMask : e.loadMask;
    e.mixins.observable.constructor.call(e);
    e.lockedViewEventRelayers = e.relayEvents(d, c.view.Table.events);
    e.normalViewEventRelayers = e.relayEvents(b, c.view.Table.events.concat(
      c.view.Table.normalSideEvents));
    b.on({
      scope: e,
      itemmouseleave: e.onItemMouseLeave,
      itemmouseenter: e.onItemMouseEnter
    });
    d.on({
      scope: e,
      itemmouseleave: e.onItemMouseLeave,
      itemmouseenter: e.onItemMouseEnter
    });
    e.ownerGrid.on({
      render: e.onPanelRender,
      scope: e
    });
    e.loadingText = b.loadingText;
    e.loadingCls = b.loadingCls;
    e.loadingUseMsg = b.loadingUseMsg;
    e.itemSelector = e.getItemSelector();
    e.all = b.all;
    e.bindStore(b.dataSource, true, "dataSource")
  },
  subViewBindStore: function(c) {
    var b = this,
      a;
    if (b.destroying || b.destroyed) {
      return
    }
    a = b.getSelectionModel();
    if (c !== null && !b.ownerGrid.reconfiguring) {
      c = b.store
    }
    a.bindStore(c);
    a.bindComponent(b)
  },
  beforeLayout: function() {
    var c = this.ownerCt.ownerLockable.view,
      b = c.lockedGrid.view,
      a = c.normalGrid.view;
    if (!c.relayingOperation) {
      if (c.lockedGrid.isVisible()) {
        if (b.refreshNeeded) {
          b.doFirstRefresh(b.dataSource)
        }
      }
      if (a.refreshNeeded) {
        a.doFirstRefresh(a.dataSource)
      }
    }
  },
  onPanelRender: function() {
    var c = this,
      b = c.loadMask,
      a = {
        target: c.ownerGrid,
        msg: c.loadingText,
        msgCls: c.loadingCls,
        useMsg: c.loadingUseMsg,
        store: c.ownerGrid.store
      };
    c.el = c.ownerGrid.getTargetEl();
    c.rendered = true;
    c.initFocusableEvents();
    c.fireEvent("render", c);
    if (b) {
      if (Ext.isObject(b)) {
        a = Ext.apply(a, b)
      }
      c.loadMask = new Ext.LoadMask(a)
    }
  },
  getRefOwner: function() {
    return this.ownerGrid
  },
  getVisibleColumnManager: function() {
    return this.ownerGrid.getVisibleColumnManager()
  },
  getTopLevelVisibleColumnManager: function() {
    return this.ownerGrid.getVisibleColumnManager()
  },
  getGridColumns: function() {
    return this.getVisibleColumnManager().getColumns()
  },
  getEl: function(a) {
    return this.getViewForColumn(a).getEl()
  },
  getCellSelector: function() {
    return this.normalView.getCellSelector()
  },
  getItemSelector: function() {
    return this.normalView.getItemSelector()
  },
  getViewForColumn: function(b) {
    var a = this.lockedView,
      c;
    a.headerCt.cascade(function(d) {
      if (d === b) {
        c = true;
        return false
      }
    });
    return c ? a : this.normalView
  },
  onItemMouseEnter: function(c, b) {
    var f = this,
      d = f.lockedView,
      a = f.normalView,
      e;
    if (c.trackOver) {
      if (c !== d) {
        a = d
      }
      e = a.getNode(b);
      a.highlightItem(e)
    }
  },
  onItemMouseLeave: function(c, b) {
    var e = this,
      d = e.lockedView,
      a = e.normalView;
    if (c.trackOver) {
      if (c !== d) {
        a = d
      }
      a.clearHighlight()
    }
  },
  relayFn: function(c, b) {
    b = b || [];
    var d = this,
      a = d.lockedView;
    d.relayingOperation = true;
    a[c].apply(a, b);
    a = d.normalView;
    a[c].apply(a, b);
    d.relayingOperation = false
  },
  getSelectionModel: function() {
    return this.normalView.getSelectionModel()
  },
  getNavigationModel: function() {
    return this.navigationModel
  },
  getStore: function() {
    return this.ownerGrid.store
  },
  onBindStore: function(a, b, f) {
    var e = this,
      d = e.lockedView,
      c = e.normalView;
    if (c.componentLayoutCounter && !(d.blockRefresh && c.blockRefresh)) {
      Ext.suspendLayouts();
      d.doFirstRefresh(a);
      c.doFirstRefresh(a);
      Ext.resumeLayouts(true)
    }
  },
  getStoreListeners: function() {
    var a = this;
    return {
      priority: 1000,
      refresh: a.onDataRefresh,
      replace: a.onReplace,
      add: a.onAdd,
      remove: a.onRemove,
      update: a.onUpdate,
      clear: a.refresh,
      beginupdate: a.onBeginUpdate,
      endupdate: a.onEndUpdate
    }
  },
  onBeginUpdate: function() {
    Ext.suspendLayouts();
    this.relayFn("onBeginUpdate", arguments);
    Ext.resumeLayouts(true)
  },
  onEndUpdate: function() {
    Ext.suspendLayouts();
    this.relayFn("onEndUpdate", arguments);
    Ext.resumeLayouts(true)
  },
  onDataRefresh: function() {
    Ext.suspendLayouts();
    this.relayFn("onDataRefresh", arguments);
    Ext.resumeLayouts(true)
  },
  onReplace: function() {
    Ext.suspendLayouts();
    this.relayFn("onReplace", arguments);
    Ext.resumeLayouts(true)
  },
  onAdd: function() {
    Ext.suspendLayouts();
    this.relayFn("onAdd", arguments);
    Ext.resumeLayouts(true)
  },
  onRemove: function() {
    Ext.suspendLayouts();
    this.relayFn("onRemove", arguments);
    Ext.resumeLayouts(true)
  },
  setActionableMode: function(d, b) {
    var a, c;
    if (d) {
      if (!b) {
        b = this.getNavigationModel().getPosition()
      }
      if (b) {
        b = b.clone();
        b.view = c = b.column.getView();
        a = c.setActionableMode(d, b);
        if (a !== false && c.lockingPartner.grid.isVisible()) {
          c.lockingPartner.setActionableMode(d, b);
          if (!c.lockingPartner.actionableMode) {
            c.setActionableMode(false);
            a = false
          }
        }
        return a
      } else {
        return false
      }
    } else {
      this.relayFn("setActionableMode", [false])
    }
  },
  onUpdate: function() {
    var a = this.normalGrid.view;
    Ext.suspendLayouts();
    this.relayFn("onUpdate", arguments);
    if (a.hasVariableRowHeight() && a.bufferedRenderer) {
      Ext.on({
        afterlayout: a.bufferedRenderer.refreshSize,
        scope: a.bufferedRenderer,
        single: true
      })
    }
    Ext.resumeLayouts(true)
  },
  refresh: function() {
    Ext.suspendLayouts();
    this.relayFn("refresh", arguments);
    Ext.resumeLayouts(true)
  },
  getNode: function(a) {
    return this.normalView.getNode(a)
  },
  getRow: function(a) {
    return this.normalView.getRow(a)
  },
  getCell: function(b, c) {
    var a = this.getViewForColumn(c),
      d = a.getRow(b);
    return Ext.fly(d).down(c.getCellSelector())
  },
  indexOf: function(b) {
    var a = this.lockedView.indexOf(b);
    if (!a) {
      a = this.normalView.indexOf(b)
    }
    return a
  },
  focus: function() {
    var a = this.ownerGrid.down(">tablepanel:not(hidden)>tableview");
    if (a) {
      a.focus()
    }
  },
  focusRow: function(c) {
    var a, b = this.getNavigationModel().lastFocused;
    a = b ? b.view : this.normalView;
    a.focusRow(c)
  },
  focusCell: function(a) {
    a.view.focusCell(a)
  },
  onRowFocus: function() {
    this.relayFn("onRowFocus", arguments)
  },
  isVisible: function(a) {
    return this.ownerGrid.isVisible(a)
  },
  getFocusEl: function() {
    var a, b = this.getNavigationModel().lastFocused;
    a = b ? b.view : this.normalView;
    return a.getFocusEl()
  },
  getCellInclusive: function(d, b) {
    var a = d.column,
      c = this.lockedGrid.getColumnManager().getColumns().length;
    if (a >= c) {
      d = Ext.apply({}, d);
      d.column -= c;
      return this.normalView.getCellInclusive(d, b)
    } else {
      return this.lockedView.getCellInclusive(d, b)
    }
  },
  getHeaderByCell: function(a) {
    if (a) {
      return this.getVisibleColumnManager().getHeaderById(a.getAttribute(
        "data-columnId"))
    }
    return false
  },
  onRowSelect: function() {
    this.relayFn("onRowSelect", arguments)
  },
  onRowDeselect: function() {
    this.relayFn("onRowDeselect", arguments)
  },
  onCellSelect: function(a) {
    a.column.getView().onCellSelect({
      record: a.record,
      column: a.column
    })
  },
  onCellDeselect: function(a) {
    a.column.getView().onCellDeselect({
      record: a.record,
      column: a.column
    })
  },
  getCellByPosition: function(e, c) {
    var d = this,
      a = e.view,
      b = e.column;
    if (a === d) {
      e = new Ext.grid.CellContext(b.getView()).setPosition(e.record, e.column)
    }
    return a.getCellByPosition(e, c)
  },
  getRecord: function(b) {
    var a = this.lockedView.getRecord(b);
    if (!a) {
      a = this.normalView.getRecord(b)
    }
    return a
  },
  scrollBy: function() {
    var a = this.normalView;
    a.scrollBy.apply(a, arguments)
  },
  ensureVisible: function() {
    var a = this.normalView;
    a.ensureVisible.apply(a, arguments)
  },
  disable: function() {
    this.relayFn("disable", arguments)
  },
  enable: function() {
    this.relayFn("enable", arguments)
  },
  addElListener: function() {
    this.relayFn("addElListener", arguments)
  },
  refreshNode: function() {
    this.relayFn("refreshNode", arguments)
  },
  addRowCls: function() {
    this.relayFn("addRowCls", arguments)
  },
  removeRowCls: function() {
    this.relayFn("removeRowCls", arguments)
  },
  destroy: function() {
    var a = this;
    a.rendered = false;
    a.bindStore(null, false, "dataSource");
    Ext.destroy(a.lockedViewEventRelayers, a.normalViewEventRelayers);
    a.lockedViewEventRelayers = a.normalViewEventRelayers = null;
    a.callParent();
    Ext.destroy(a.loadMask, a.navigationModel, a.selModel);
    a.lockedView.lockingPartner = a.normalView.lockingPartner = null;
    a.lockedGrid = a.lockedView = a.normalGrid = a.normalView = null;
    a.loadMask = a.navigationModel = a.selModel = a.headerCt = null;
    a.ownerGrid = a.storeListeners = null
  }
}, 1, 0, 0, 0, 0, [
  [Ext.util.Observable.prototype.mixinId || Ext.util.Observable.$className,
    Ext.util.Observable
  ],
  [Ext.util.StoreHolder.prototype.mixinId || Ext.util.StoreHolder.$className,
    Ext.util.StoreHolder
  ],
  [Ext.util.Focusable.prototype.mixinId || Ext.util.Focusable.$className,
    Ext.util.Focusable
  ]
], [Ext.grid.locking, "View", Ext.grid, "LockingView"], function() {
  this.borrow(Ext.Component, ["up"]);
  this.borrow(Ext.view.AbstractView, ["doFirstRefresh", "applyFirstRefresh"]);
  this.borrow(Ext.view.Table, ["cellSelector", "selectedCellCls",
    "selectedItemCls"
  ])
}));
(Ext.cmd.derive("Ext.grid.locking.Lockable", Ext.Base, {
    alternateClassName: "Ext.grid.Lockable",
    syncRowHeight: true,
    headerCounter: 0,
    scrollDelta: 40,
    lockedGridCls: "x-grid-inner-locked",
    normalGridCls: "x-grid-inner-normal",
    lockingBodyCls: "x-grid-locking-body",
    unlockText: "Unlock",
    lockText: "Lock",
    bothCfgCopy: ["invalidateScrollerOnRefresh", "hideHeaders",
      "enableColumnHide", "enableColumnMove", "enableColumnResize",
      "sortableColumns", "multiColumnSort", "columnLines", "rowLines",
      "variableRowHeight", "numFromEdge", "trailingBufferZone",
      "leadingBufferZone", "scrollToLoadBuffer"
    ],
    normalCfgCopy: ["verticalScroller", "verticalScrollDock",
      "verticalScrollerType", "scroll"
    ],
    lockedCfgCopy: [],
    determineXTypeToCreate: function(e) {
      var c = this,
        g, d, b, f, a;
      if (c.subGridXType) {
        g = c.subGridXType
      } else {
        if (!e) {
          return "gridpanel"
        }
        d = this.getXTypes().split("/");
        b = d.length;
        f = d[b - 1];
        a = d[b - 2];
        if (a !== "tablepanel") {
          g = a
        } else {
          g = f
        }
      }
      return g
    },
    injectLockable: function() {
      this.focusable = false;
      this.lockable = true;
      this.hasView = true;
      var u = this,
        j = Ext.getScrollbarSize(),
        n = j.width,
        d = u.store = Ext.StoreManager.lookup(u.store),
        c = u.lockedViewConfig,
        t = u.normalViewConfig,
        l = Ext.Object,
        g, h, r, f, k, b, e, q, s = u.viewConfig,
        a = s && s.loadMask,
        m = (a !== undefined) ? a : u.loadMask,
        o = u.bufferedRenderer,
        p = n > 0 && Ext.supports.touchScroll !== 2;
      g = u.constructLockableFeatures();
      u.features = null;
      h = u.constructLockablePlugins();
      u.plugins = h.topPlugins;
      r = {
        id: u.id + "-locked",
        $initParent: u,
        isLocked: true,
        bufferedRenderer: o,
        ownerGrid: u,
        ownerLockable: u,
        xtype: u.determineXTypeToCreate(true),
        store: d,
        reserveScrollbar: p,
        scrollable: {
          indicators: {
            x: true,
            y: false
          }
        },
        scrollerOwner: false,
        animate: false,
        border: false,
        cls: u.lockedGridCls,
        isLayoutRoot: function() {
          return this.floatedFromCollapse || u.normalGrid.floatedFromCollapse
        },
        features: g.lockedFeatures,
        plugins: h.lockedPlugins
      };
      f = {
        id: u.id + "-normal",
        $initParent: u,
        isLocked: false,
        bufferedRenderer: o,
        ownerGrid: u,
        ownerLockable: u,
        xtype: u.determineXTypeToCreate(),
        store: d,
        reserveScrollbar: u.reserveScrollbar,
        scrollerOwner: false,
        border: false,
        cls: u.normalGridCls,
        isLayoutRoot: function() {
          return this.floatedFromCollapse || u.lockedGrid.floatedFromCollapse
        },
        features: g.normalFeatures,
        plugins: h.normalPlugins
      };
      u.addCls("x-grid-locked");
      Ext.copyTo(f, u, u.bothCfgCopy, true);
      Ext.copyTo(r, u, u.bothCfgCopy, true);
      Ext.copyTo(f, u, u.normalCfgCopy, true);
      Ext.copyTo(r, u, u.lockedCfgCopy, true);
      Ext.apply(f, u.normalGridConfig);
      Ext.apply(r, u.lockedGridConfig);
      for (k = 0; k < u.normalCfgCopy.length; k++) {
        delete u[u.normalCfgCopy[k]]
      }
      for (k = 0; k < u.lockedCfgCopy.length; k++) {
        delete u[u.lockedCfgCopy[k]]
      }
      u.addStateEvents(["lockcolumn", "unlockcolumn"]);
      b = u.processColumns(u.columns || [], r);
      r.columns = b.locked;
      if (!r.columns.items.length) {
        r.hidden = true
      }
      f.columns = b.normal;
      if (!f.columns.items.length) {
        f.hidden = true
      }
      f.flex = 1;
      r.viewConfig = c = (c ? l.chain(c) : {});
      f.viewConfig = t = (t ? l.chain(t) : {});
      c.loadingUseMsg = false;
      c.loadMask = false;
      if (p) {
        c.margin = "0 -" + n + " 0 0"
      }
      t.loadMask = false;
      Ext.applyIf(c, s);
      Ext.applyIf(t, s);
      if (!u.initialConfig.layout) {
        u.layout = {
          type: "hbox",
          align: "stretch"
        }
      }
      u.getLayout();
      if (u.layout.type === "border") {
        if (u.split) {
          r.split = true
        }
        if (!r.region) {
          r.region = "west"
        }
        if (!f.region) {
          f.region = "center"
        }
        u.addCls("x-grid-locked-split")
      }
      if (!(u.layout instanceof Ext.layout.container.Box)) {
        u.split = false
      }
      u.view = new Ext.grid.locking.View({
        loadMask: m,
        locked: r,
        normal: f,
        ownerGrid: u
      });
      r = u.lockedGrid;
      f = u.normalGrid;
      f.getView().getScrollable().addPartner(r.getView().getScrollable(),
        "y");
      if (j.height && Ext.supports.touchScroll !== 2) {
        r.on({
          afterlayout: u.afterLockedViewLayout,
          scope: u
        });
        r.getView().getOverflowStyle()
      }
      e = r.headerCt;
      q = f.headerCt;
      if (p) {
        e.reserveScrollbar = false
      }
      u.headerCt = u.view.headerCt = new Ext.grid.locking.HeaderContainer(u);
      e.lockedCt = true;
      e.lockableInjected = true;
      q.lockableInjected = true;
      e.on({
        add: u.delaySyncLockedWidth,
        remove: u.delaySyncLockedWidth,
        columnshow: u.delaySyncLockedWidth,
        columnhide: u.delaySyncLockedWidth,
        sortchange: u.onLockedHeaderSortChange,
        columnresize: u.delaySyncLockedWidth,
        scope: u
      });
      q.on({
        add: u.delaySyncLockedWidth,
        remove: u.delaySyncLockedWidth,
        columnshow: u.delaySyncLockedWidth,
        columnhide: u.delaySyncLockedWidth,
        sortchange: u.onNormalHeaderSortChange,
        scope: u
      });
      u.modifyHeaderCt();
      u.items = [r];
      if (u.split) {
        u.addCls("x-grid-locked-split");
        u.items[1] = {
          xtype: "splitter"
        }
      }
      u.items.push(f);
      u.relayHeaderCtEvents(e);
      u.relayHeaderCtEvents(q);
      u.storeRelayers = u.relayEvents(d, ["filterchange", "groupchange"]);
      u.gridRelayers = u.relayEvents(f, ["viewready"])
    },
    afterInjectLockable: function() {
      delete this.lockedGrid.$initParent;
      delete this.normalGrid.$initParent
    },
    getLockingViewConfig: function() {
      return {
        xclass: "Ext.grid.locking.View",
        locked: this.lockedGrid,
        normal: this.normalGrid,
        panel: this
      }
    },
    processColumns: function(f, d) {
      var m = this,
        g, j, e, l = new Ext.grid.header.Container({
          "$initParent": m
        }),
        k = [],
        c = [],
        b = {
          itemId: "lockedHeaderCt",
          stretchMaxPartner: "^^>>#normalHeaderCt",
          items: k
        },
        h = {
          itemId: "normalHeaderCt",
          stretchMaxPartner: "^^>>#lockedHeaderCt",
          items: c
        },
        n = {
          locked: b,
          normal: h
        },
        a;
      if (Ext.isObject(f)) {
        Ext.applyIf(b, f);
        Ext.applyIf(h, f);
        a = Ext.apply({}, f);
        delete a.items;
        Ext.apply(l, a);
        f = f.items
      }
      l.constructing = true;
      for (g = 0, j = f.length; g < j; ++g) {
        e = f[g];
        if (!e.isComponent) {
          e = l.applyDefaults(e);
          e.$initParent = l;
          e = l.lookupComponent(e);
          delete e.$initParent
        }
        e.processed = true;
        if (e.locked || e.autoLock) {
          k.push(e)
        } else {
          c.push(e)
        }
        if (!e.headerId) {
          e.headerId = (e.initialConfig || e).id || ("h" + (++m.headerCounter))
        }
      }
      m.fireEvent("processcolumns", m, k, c);
      l.destroy();
      return n
    },
    afterLockedViewLayout: function() {
      var d = this,
        a = d.lockedGrid,
        c = d.normalGrid,
        i = a.getView(),
        b = c.getView(),
        h = i.scrollFlags.x && a.headerCt.tooNarrow,
        g = b.scrollFlags.x && c.headerCt.tooNarrow,
        e = b.getScrollable(),
        f = i.getScrollable();
      if (h !== g) {
        if (h) {
          e.setX("scroll");
          f.setX(true)
        } else {
          f.setX("scroll");
          e.setX(true)
        }
      } else {
        f.setX(g ? "scroll" : true);
        e.setX(true)
      }
    },
    ensureLockedVisible: function() {
      this.lockedGrid.ensureVisible.apply(this.lockedGrid, arguments);
      this.normalGrid.ensureVisible.apply(this.normalGrid, arguments)
    },
    onLockedViewMouseWheel: function(i) {
      var d = this,
        a = -d.scrollDelta * i.getWheelDeltas().y,
        c = d.lockedGrid.getView(),
        f = c.el.dom,
        h, b, g;
      if (!d.ignoreMousewheel) {
        if (f) {
          h = c.getScrollY();
          b = h !== f.scrollHeight - f.clientHeight;
          g = h !== 0
        }
        if ((a < 0 && g) || (a > 0 && b)) {
          i.stopEvent();
          h += a;
          c.setScrollY(h);
          d.normalGrid.getView().setScrollY(h);
          d.onNormalViewScroll()
        }
      }
    },
    onLockedViewScroll: function() {
      var f = this,
        e = f.lockedGrid.getView(),
        d = f.normalGrid.getView(),
        c = e.getScrollY(),
        g = d.getScrollY(),
        a, b;
      if (g !== c) {
        d.setScrollY(c);
        if (d.bufferedRenderer) {
          b = e.body.dom;
          a = d.body.dom;
          a.style.position = "absolute";
          a.style.top = b.style.top
        }
      }
    },
    onNormalViewScroll: function() {
      var d = this,
        c = d.lockedGrid.getView(),
        b = d.normalGrid.getView(),
        a = c.getScrollY(),
        f = b.getScrollY(),
        e;
      if (f !== a) {
        c.setScrollY(f);
        if (b.bufferedRenderer) {
          e = c.body;
          if (e.dom) {
            e.dom.style.position = "absolute";
            e.translate(null, b.bufferedRenderer.bodyTop)
          }
        }
      }
    },
    syncRowHeights: function() {
      if (!this.destroyed) {
        var d = this,
          b = d.normalGrid.getView(),
          c = d.lockedGrid.getView(),
          f = b.syncRowHeightBegin(),
          a = c.syncRowHeightBegin(),
          e;
        b.syncRowHeightMeasure(f);
        c.syncRowHeightMeasure(a);
        b.syncRowHeightFinish(f, a);
        c.syncRowHeightFinish(a, f);
        e = b.getScrollY();
        c.setScrollY(e)
      }
    },
    modifyHeaderCt: function() {
      var a = this;
      a.lockedGrid.headerCt.getMenuItems = a.getMenuItems(a.lockedGrid.headerCt
        .getMenuItems, true);
      a.normalGrid.headerCt.getMenuItems = a.getMenuItems(a.normalGrid.headerCt
        .getMenuItems, false);
      a.lockedGrid.headerCt.showMenuBy = Ext.Function.createInterceptor(a.lockedGrid
        .headerCt.showMenuBy, a.showMenuBy);
      a.normalGrid.headerCt.showMenuBy = Ext.Function.createInterceptor(a.normalGrid
        .headerCt.showMenuBy, a.showMenuBy)
    },
    onUnlockMenuClick: function() {
      this.unlock()
    },
    onLockMenuClick: function() {
      this.lock()
    },
    showMenuBy: function(a, c, g) {
      var f = this.getMenu(),
        d = f.down("#unlockItem"),
        e = f.down("#lockItem"),
        b = d.prev();
      if (g.lockable === false) {
        b.hide();
        d.hide();
        e.hide()
      } else {
        b.show();
        d.show();
        e.show();
        if (!d.initialConfig.disabled) {
          d.setDisabled(g.lockable === false)
        }
        if (!e.initialConfig.disabled) {
          e.setDisabled(!g.isLockable())
        }
      }
    },
    getMenuItems: function(f, c) {
      var g = this,
        h = g.unlockText,
        a = g.lockText,
        i = "x-hmenu-unlock",
        b = "x-hmenu-lock",
        e = g.onUnlockMenuClick.bind(g),
        d = g.onLockMenuClick.bind(g);
      return function() {
        var j = f.call(this);
        j.push("-", {
          itemId: "unlockItem",
          iconCls: i,
          text: h,
          handler: e,
          disabled: !c
        });
        j.push({
          itemId: "lockItem",
          iconCls: b,
          text: a,
          handler: d,
          disabled: c
        });
        return j
      }
    },
    delaySyncLockedWidth: function() {
      var b = this,
        a = b.syncLockedWidthTask;
      if (!a) {
        a = b.syncLockedWidthTask = new Ext.util.DelayedTask(b.syncLockedWidth,
          b)
      }
      a.delay(1)
    },
    syncLockedWidth: function() {
      var e = this,
        h = e.rendered,
        c = e.lockedGrid,
        d = c.view,
        g = e.normalGrid,
        f = c.getVisibleColumnManager().getColumns().length,
        a = g.getVisibleColumnManager().getColumns().length,
        b = e.syncLockedWidthTask;
      if (b) {
        b.cancel()
      }
      Ext.suspendLayouts();
      if (a) {
        g.show();
        if (f) {
          if (h && c.shrinkWrapColumns && !c.headerCt.forceFit) {
            delete c.flex;
            c.setWidth(c.headerCt.getTableWidth() + c.gridPanelBorderWidth)
          }
          c.addCls(e.lockedGridCls);
          c.show();
          if (c.split) {
            e.child("splitter").show();
            e.addCls("x-grid-locked-split")
          }
        } else {
          if (h) {
            c.getView().clearViewEl(true)
          }
          c.hide();
          if (c.split) {
            e.child("splitter").hide();
            e.removeCls("x-grid-locked-split")
          }
        }
        if (Ext.supports.touchScroll !== 2 && Ext.Component.pendingLayouts) {
          d.getScrollable().setX(true)
        }
        if (h) {
          e.ignoreMousewheel = d.scrollFlags.y
        }
      } else {
        g.hide();
        c.flex = 1;
        delete c.width;
        c.removeCls(e.lockedGridCls);
        c.show();
        e.ignoreMousewheel = true
      }
      Ext.resumeLayouts(true);
      return [f, a]
    },
    onLockedHeaderSortChange: Ext.emptyFn,
    onNormalHeaderSortChange: Ext.emptyFn,
    lock: function(f, k, e) {
      var h = this,
        g = h.normalGrid,
        c = h.lockedGrid,
        d = g.view,
        l = c.view,
        j = g.headerCt,
        i, a, b;
      f = f || j.getMenu().activeHeader;
      b = f.hasFocus;
      e = e || c.headerCt;
      a = f.ownerCt;
      if (!f.isLockable()) {
        return
      }
      if (f.flex && c.shrinkWrapColumns) {
        f.width = f.getWidth();
        f.flex = null
      }
      Ext.suspendLayouts();
      if (c.hidden) {
        c.show()
      }
      d.blockRefresh = l.blockRefresh = true;
      f.ownerCmp = f.ownerCt;
      a.remove(f, false);
      f.locked = true;
      if (Ext.isDefined(k)) {
        e.insert(k, f)
      } else {
        e.add(f)
      }
      d.blockRefresh = l.blockRefresh = false;
      f.ownerCmp = null;
      i = h.syncLockedWidth();
      if (i[0]) {
        c.getView().refreshView()
      }
      if (i[1]) {
        g.getView().refreshView()
      }
      h.fireEvent("lockcolumn", h, f);
      Ext.resumeLayouts(true);
      if (b) {
        f.focus()
      }
    },
    unlock: function(e, j, d) {
      var g = this,
        f = g.normalGrid,
        b = g.lockedGrid,
        c = f.view,
        k = b.view,
        i = b.headerCt,
        h, a;
      if (!Ext.isDefined(j)) {
        j = 0
      }
      e = e || i.getMenu().activeHeader;
      a = e.hasFocus;
      d = d || f.headerCt;
      Ext.suspendLayouts();
      c.blockRefresh = k.blockRefresh = true;
      e.ownerCmp = e.ownerCt;
      e.ownerCt.remove(e, false);
      e.locked = false;
      d.insert(j, e);
      c.blockRefresh = k.blockRefresh = false;
      e.ownerCmp = null;
      h = g.syncLockedWidth();
      if (h[0]) {
        b.getView().refreshView()
      }
      if (h[1]) {
        f.getView().refreshView()
      }
      g.fireEvent("unlockcolumn", g, e);
      Ext.resumeLayouts(true);
      if (a) {
        e.focus()
      }
    },
    reconfigureLockable: function(b, c) {
      var d = this,
        g = d.store,
        f = d.lockedGrid,
        e = d.normalGrid,
        a;
      if (b && b !== g) {
        b = Ext.data.StoreManager.lookup(b);
        d.store = b;
        f.view.blockRefresh = e.view.blockRefresh = true;
        f.bindStore(b);
        a = f.view;
        a.store = b;
        if (!a.dataSource.isFeatureStore) {
          a.dataSource = b
        }
        if (a.bufferedRenderer) {
          a.bufferedRenderer.bindStore(b)
        }
        e.bindStore(b);
        a = e.view;
        a.store = b;
        if (!a.dataSource.isFeatureStore) {
          a.dataSource = b
        }
        if (a.bufferedRenderer) {
          a.bufferedRenderer.bindStore(b)
        }
        d.view.store = b;
        d.view.bindStore(e.view.dataSource, false, "dataSource");
        f.view.blockRefresh = e.view.blockRefresh = false
      }
      if (c) {
        f.reconfiguring = e.reconfiguring = true;
        f.headerCt.removeAll();
        e.headerCt.removeAll();
        c = d.processColumns(c, f);
        f.headerCt.add(c.locked.items);
        e.headerCt.add(c.normal.items);
        f.reconfiguring = e.reconfiguring = false;
        d.syncLockedWidth()
      }
      d.refreshCounter = f.view.refreshCounter
    },
    afterReconfigureLockable: function() {
      var a = this.lockedGrid.getView();
      if (this.refreshCounter === a.refreshCounter) {
        this.view.refresh()
      }
    },
    constructLockableFeatures: function() {
      var e = this.features,
        c, d, f, g, b = 0,
        a;
      if (e) {
        if (!Ext.isArray(e)) {
          e = [e]
        }
        f = [];
        g = [];
        a = e.length;
        for (; b < a; b++) {
          c = e[b];
          if (!c.isFeature) {
            c = Ext.create("feature." + c.ftype, c)
          }
          switch (c.lockableScope) {
            case "locked":
              f.push(c);
              break;
            case "normal":
              g.push(c);
              break;
            default:
              c.lockableScope = "both";
              f.push(c);
              g.push(d = c.clone());
              d.lockingPartner = c;
              c.lockingPartner = d
          }
        }
      }
      return {
        normalFeatures: g,
        lockedFeatures: f
      }
    },
    constructLockablePlugins: function() {
      var c = this.plugins,
        g, b, a, j, k, e, f = 0,
        h, l, d;
      if (c) {
        if (!Ext.isArray(c)) {
          c = [c]
        }
        j = [];
        k = [];
        e = [];
        h = c.length;
        for (; f < h; f++) {
          g = c[f];
          if (g.init) {
            l = g.lockableScope
          } else {
            d = g.ptype ? Ext.ClassManager.getByAlias(("plugin." + g.ptype)) :
              Ext.ClassManager.get(g.xclass);
            l = d.prototype.lockableScope
          }
          switch (l) {
            case "both":
              k.push(a = g.clonePlugin());
              e.push(b = g.clonePlugin());
              a.lockingPartner = b;
              b.lockingPartner = a;
              Ext.destroy(g);
              break;
            case "locked":
              k.push(g);
              break;
            case "normal":
              e.push(g);
              break;
            default:
              j.push(g)
          }
        }
      }
      return {
        topPlugins: j,
        normalPlugins: e,
        lockedPlugins: k
      }
    },
    destroyLockable: function() {
      var b = this,
        a = b.syncLockedWidthTask;
      if (a) {
        a.cancel();
        b.syncLockedWidthTask = null
      }
      if (b.lockedGrid && b.lockedGrid.headerCt) {
        b.lockedGrid.headerCt.showMenuBy = null
      }
      if (b.normalGrid && b.normalGrid.headerCt) {
        b.normalGrid.headerCt.showMenuBy = null
      }
      Ext.destroy(b.view, b.headerCt)
    }
  }, 0, 0, 0, 0, 0, 0, [Ext.grid.locking, "Lockable", Ext.grid, "Lockable"],
  function() {
    this.borrow(Ext.Component, ["constructPlugin"])
  }));
(Ext.cmd.derive("Ext.grid.plugin.BufferedRenderer", Ext.AbstractPlugin, {
  isBufferedRenderer: true,
  lockableScope: "both",
  numFromEdge: 2,
  trailingBufferZone: 10,
  leadingBufferZone: 20,
  synchronousRender: true,
  scrollToLoadBuffer: 200,
  viewSize: 100,
  rowHeight: 21,
  position: 0,
  lastScrollDirection: 1,
  bodyTop: 0,
  scrollHeight: 0,
  loadId: 0,
  init: function(c) {
    var d = this,
      a = c.view,
      b = {
        scroll: d.onViewScroll,
        scrollend: d.onViewScrollEnd,
        resize: d.onViewResize,
        refresh: d.onViewRefresh,
        columnschanged: d.checkVariableRowHeight,
        boxready: d.onViewBoxReady,
        scope: d,
        destroyable: true
      },
      e = a.initialConfig;
    if (c.isTree || (c.ownerLockable && c.ownerLockable.isTree)) {
      a.blockRefresh = false;
      if (e && e.loadMask === undefined) {
        a.loadMask = true
      }
    }
    if (a.positionBody) {
      b.refresh = d.onViewRefresh
    }
    d.grid = c;
    d.view = a;
    d.isRTL = a.getInherited().rtl;
    a.bufferedRenderer = d;
    a.preserveScrollOnRefresh = true;
    a.animate = false;
    d.bindStore(a.dataSource);
    if (a.hasOwnProperty("rowHeight")) {
      d.rowHeight = a.rowHeight
    }
    d.position = 0;
    d.gridListeners = c.on({
      reconfigure: "onReconfigure",
      scope: d,
      destroyable: true
    });
    d.viewListeners = a.on(b)
  },
  checkVariableRowHeight: function() {
    var b = this,
      a = b.grid;
    b.variableRowHeight = b.view.hasVariableRowHeight();
    if (a.ownerLockable) {
      a.ownerLockable.syncRowHeight = b.variableRowHeight
    }
  },
  bindStore: function(c) {
    var d = this,
      b = d.view,
      e = b.dataSource,
      a = e && e.isFeatureStore;
    if (a === c.isFeatureStore) {
      if (d.store) {
        d.unbindStore()
      }
      d.storeListeners = c.on({
        scope: d,
        groupchange: d.onStoreGroupChange,
        clear: d.onStoreClear,
        beforeload: d.onBeforeStoreLoad,
        load: d.onStoreLoad,
        destroyable: true
      });
      d.store = c
    }
    if (d.view.componentLayout.layoutCount) {
      delete d.viewSize;
      if (c.isBufferedStore) {
        c.setViewSize(d.viewSize)
      }
      d.onViewResize(d.view, 0, d.view.getHeight())
    }
  },
  onReconfigure: function(b, a) {
    if (a && a !== this.store) {
      this.bindStore(a)
    }
  },
  unbindStore: function() {
    this.storeListeners.destroy();
    this.storeListeners = this.store = null
  },
  onBeforeStoreLoad: function(b) {
    var c = this,
      a = c.view;
    if (a && a.refreshCounter) {
      if (b.isTreeStore || a.preserveScrollOnReload) {
        c.nextRefreshStartIndex = a.all.startIndex
      } else {
        if (c.scrollTop !== 0) {
          c.setBodyTop(c.bodyTop = c.scrollTop = c.position = c.scrollHeight =
            c.nextRefreshStartIndex = 0);
          a.setScrollY(0)
        }
      }
      c.lastScrollDirection = c.scrollOffset = null;
      if (!a.hasOwnProperty("rowHeight")) {
        delete c.rowHeight
      }
    }
    c.disable()
  },
  onStoreLoad: function() {
    this.enable()
  },
  onStoreClear: function() {
    var b = this,
      a = b.view;
    if (a.rendered && !b.store.destroyed) {
      if (b.scrollTop !== 0) {
        b.bodyTop = b.scrollTop = b.position = b.scrollHeight = 0;
        b.nextRefreshStartIndex = null;
        a.setScrollY(0)
      }
      a.refresh();
      b.lastScrollDirection = b.scrollOffset = null;
      if (!a.hasOwnProperty("rowHeight")) {
        delete b.rowHeight
      }
    }
  },
  onStoreGroupChange: function(a) {
    this.refreshSize()
  },
  onViewBoxReady: function(a) {
    this.refreshScroller(a, this.scrollHeight)
  },
  onViewRefresh: function(b, c) {
    var d = this,
      e = b.all,
      a;
    d.checkVariableRowHeight();
    if (!b.componentLayoutCounter && (b.headerCt.down("{flex}") || d.variableRowHeight)) {
      b.on({
        boxready: Ext.Function.pass(d.onViewRefresh, [b, c], d),
        single: true
      });
      d.skipNextRefreshSize = true;
      return
    }
    d.skipNextRefreshSize = false;
    if (!b.hasOwnProperty("rowHeight") && e.getCount()) {
      delete d.rowHeight
    }
    d.refreshSize();
    if (d.refreshing) {
      return
    }
    if (d.scrollTop !== b.getScrollY()) {
      d.onViewScroll();
      d.onViewScrollEnd()
    } else {
      if (!d.hasOwnProperty("bodyTop")) {
        d.bodyTop = e.startIndex * d.rowHeight;
        b.setScrollY(d.bodyTop)
      }
      d.setBodyTop(d.bodyTop);
      a = b.getHeight();
      if (e.getCount() && a > 0) {
        d.onViewResize(b, null, a);
        if (c && (e.getCount() !== c.length)) {
          c.length = 0;
          c.push.apply(c, d.store.getRange(e.startIndex, e.endIndex))
        }
      }
    }
  },
  refreshSize: function() {
    var b = this,
      a = b.view,
      c = b.skipNextRefreshSize;
    b.skipNextRefreshSize = false;
    if (c) {
      return
    }
    b.scrollHeight = b.getScrollHeight();
    b.stretchView(a, b.scrollHeight)
  },
  onViewResize: function(c, e, a, b, g) {
    var f = this,
      d;
    if (!g || a !== g) {
      d = Math.ceil(a / f.rowHeight) + f.trailingBufferZone + f.leadingBufferZone;
      f.viewSize = f.setViewSize(d);
      f.viewClientHeight = c.el.dom.clientHeight
    }
  },
  onWrappedColumnWidthChange: function(b, d) {
    var c = this,
      a = c.view;
    if (c.store.getCount() && c.bodyTop) {
      c.refreshSize();
      c.setViewSize(Math.ceil(a.getHeight() / c.rowHeight) + c.trailingBufferZone +
        c.leadingBufferZone);
      if (c.viewSize >= c.store.getCount()) {
        c.setBodyTop(0)
      } else {
        if (d > b && c.bodyTop + a.body.dom.offsetHeight - 1 > c.scrollHeight) {
          c.setBodyTop(Math.max(0, c.scrollHeight - a.body.dom.offsetHeight))
        } else {
          if (c.bodyTop > c.scrollTop || c.bodyTop + a.body.dom.offsetHeight <
            c.scrollTop + a.getHeight(true)) {
            c.setBodyTop(c.scrollTop - c.trailingBufferZone * c.rowHeight)
          }
        }
      }
    }
  },
  stretchView: function(b, a) {
    var e = this,
      d = e.store.getCount(),
      c, f;
    if (e.scrollTop > a) {
      e.position = e.scrollTop = Math.max(a - b.body.dom.offsetHeight, 0);
      b.setScrollY(e.scrollTop)
    }
    if (e.bodyTop > a) {
      b.body.translate(null, e.bodyTop = e.position)
    }
    if (b.touchScroll) {
      if (b.getScrollable()) {
        e.refreshScroller(b, a)
      } else {
        if (!e.pendingScrollerRefresh) {
          b.on({
            boxready: function() {
              e.refreshScroller(b, a);
              e.pendingScrollerRefresh = false
            },
            single: true
          });
          e.pendingScrollerRefresh = true
        }
      }
    }
    if (!Ext.supports.touchScroll || Ext.supports.touchScroll === 1) {
      if (!e.stretcher) {
        c = b.getTargetEl();
        if (b.refreshCounter) {
          b.fixedNodes++
        }
        f = {
          role: "presentation",
          style: {
            width: "1px",
            height: "1px",
            marginTop: (a - 1) + "px",
            position: "absolute"
          }
        };
        f.style[e.isRTL ? "right" : "left"] = 0;
        e.stretcher = c.createChild(f, c.dom.firstChild)
      }
      if (e.hasOwnProperty("viewSize") && d <= e.viewSize) {
        e.stretcher.dom.style.display = "none"
      } else {
        e.stretcher.dom.style.marginTop = (a - 1) + "px";
        e.stretcher.dom.style.display = ""
      }
    }
  },
  refreshScroller: function(c, b) {
    var a = c.getScrollable();
    if (c.touchScroll === 2 && a) {
      a.setElementSize();
      a.setSize({
        x: c.headerCt.getTableWidth(),
        y: b
      });
      if (c.touchScroll === 2) {
        a.setRefreshOnIdle(false)
      }
    }
  },
  setViewSize: function(o, c) {
    var n = this,
      r = n.store,
      p = n.view,
      s = p.all,
      f = s.getCount(),
      b, e, l = n.view.lockingPartner && n.view.lockingPartner.bufferedRenderer,
      q = f - o,
      h, g, d, a, k, m;
    if (l && !c && l.view.componentLayoutCounter) {
      if (l.viewSize > o) {
        o = l.viewSize
      } else {
        l.setViewSize(o, true)
      }
    }
    q = f - o;
    if (q) {
      n.scrollTop = p.getScrollY();
      n.viewSize = o;
      if (r.isBufferedStore) {
        r.setViewSize(o)
      }
      if (f) {
        m = r.getCount();
        b = s.startIndex;
        e = Math.min(b + o - 1, m - 1);
        if (b === s.startIndex && e === s.endIndex) {
          if (q < 0) {
            n.handleViewScroll(-1)
          }
        } else {
          if (l) {
            l.disable()
          }
          if (q < 0) {
            if (m > f) {
              r.getRange(s.endIndex + 1, e, {
                callback: function(i, j) {
                  k = p.doAdd(i, j);
                  p.fireEvent("itemadd", i, j, k)
                }
              })
            } else {
              n.refreshView(0)
            }
          } else {
            b = s.endIndex - (q - 1);
            e = s.endIndex;
            a = s.slice(b, e + 1);
            s.removeRange(b, e, true);
            if (p.hasListeners.itemremove) {
              d = r.getRange(b, e);
              for (h = e, g = d.length - 1; g >= 0; --h, --g) {
                p.fireEvent("itemremove", d[g], h, a[g])
              }
            }
          }
          if (l) {
            l.enable()
          }
        }
      }
    }
    return o
  },
  getViewRange: function() {
    var b = this,
      c = b.view.all,
      a = b.store,
      d = 0;
    if (c.getCount()) {
      d = c.startIndex
    } else {
      if (a.isBufferedStore) {
        if (!a.currentPage) {
          a.currentPage = 1
        }
        d = c.startIndex = (a.currentPage - 1) * (a.pageSize || 1);
        a.currentPage = 1
      }
    }
    if (a.data.getCount()) {
      return a.getRange(d, d + (b.viewSize || a.defaultViewSize) - 1)
    } else {
      return []
    }
  },
  onReplace: function(i, j, e, f) {
    var g = this,
      h = g.view,
      l = h.all,
      a, d = l.getCount(),
      c = j + e.length - 1,
      k = f.length - e.length,
      b = k * g.rowHeight;
    if (j >= l.startIndex + g.viewSize) {
      g.refreshSize();
      return
    }
    if (d && c < l.startIndex && l.getCount() >= g.viewSize) {
      l.moveBlock(k);
      g.refreshSize();
      a = l.startIndex;
      if (k > 0) {
        g.doNotMirror = true;
        g.handleViewScroll(-1);
        g.doNotMirror = false
      }
      if (l.startIndex === a) {
        if (l.startIndex) {
          g.setBodyTop(g.bodyTop += b);
          h.suspendEvent("scroll");
          h.scrollBy(0, b);
          h.resumeEvent("scroll");
          g.position = g.scrollTop = h.getScrollY()
        }
      } else {
        h.suspendEvent("scroll");
        h.scrollBy(0, (a - l.startIndex) * g.rowHeight);
        h.resumeEvent("scroll")
      }
      h.refreshSize(l.getCount() !== d);
      return
    }
    if (d && j > l.endIndex) {
      g.refreshSize();
      if (k > 0) {
        g.onRangeFetched(null, l.startIndex, Math.min(i.getCount(), l.startIndex +
          g.viewSize) - 1, null, true)
      }
      h.refreshSize(l.getCount() !== d);
      return
    }
    if (j < l.startIndex && c <= l.endIndex) {
      g.refreshView(l.startIndex - e.length + f.length);
      return
    }
    if (j < l.startIndex && c <= l.endIndex && b) {
      h.suspendEvent("scroll");
      h.setScrollY(g.position = g.scrollTop += b);
      h.resumeEvent("scroll")
    }
    g.refreshView()
  },
  scrollTo: function(q, d) {
    var b = arguments,
      v = this,
      n = v.view,
      m = n.lockingPartner && n.lockingPartner.grid.isVisible() && n.lockingPartner
      .bufferedRenderer,
      s = n.el.dom,
      l = v.store,
      x = l.getCount(),
      k, w, f, e, p, t, c, u, j = 0,
      r, o, i, g, h, a;
    if (d && typeof d === "object") {
      r = d.select;
      o = d.focus;
      g = d.highlight;
      i = d.animate;
      h = d.callback;
      a = d.scope
    } else {
      r = b[1];
      h = b[2];
      a = b[3]
    }
    if ((p = n.dataSource.groupingFeature) && (p.collapsible)) {
      if (q.isEntity) {
        c = q
      } else {
        c = n.store.getAt(Math.min(Math.max(q, 0), n.store.getCount() - 1))
      }
      t = p.getMetaGroup(c);
      if (t && t.isCollapsed) {
        if (!p.isExpandingOrCollapsing) {
          p.expand(p.getGroup(c).getGroupKey());
          x = l.getCount();
          q = p.indexOf(c)
        } else {
          c = t.placeholder;
          q = p.indexOfPlaceholder(c)
        }
      } else {
        q = p.indexOf(c)
      }
    } else {
      if (q.isEntity) {
        c = q;
        q = l.indexOf(c);
        if (q === -1) {
          return
        }
      } else {
        q = Math.min(Math.max(q, 0), x - 1);
        c = l.getAt(q)
      }
    }
    if (c && (f = n.getNode(c))) {
      n.getScrollable().scrollIntoView(f, null, i, g);
      v.onViewScroll();
      v.onViewScrollEnd();
      if (r) {
        n.selModel.select(c)
      }
      if (o) {
        n.getNavigationModel().setPosition(c, 0)
      }
      if (h) {
        h.call(a || v, q, c, f)
      }
      return
    }
    if (q < n.all.startIndex) {
      u = -1;
      k = Math.max(Math.min(q - (Math.floor((v.leadingBufferZone + v.trailingBufferZone) /
        2)), x - v.viewSize + 1), 0);
      w = Math.min(k + v.viewSize - 1, x - 1)
    } else {
      u = 1;
      w = Math.min(q + (Math.floor((v.leadingBufferZone + v.trailingBufferZone) /
        2)), x - 1);
      k = Math.max(w - (v.viewSize - 1), 0)
    }
    e = Math.max(k * v.rowHeight, 0);
    l.getRange(k, w, {
      callback: function(A, B, z) {
        var y = n.getScrollable();
        v.renderRange(B, z, true, true);
        c = l.data.getRange(q, q + 1)[0];
        f = n.getNode(c);
        n.body.translate(null, v.bodyTop = e);
        if (u === 1) {
          v.refreshSize()
        }
        if (m) {
          m.renderRange(B, z, true, true);
          v.syncRowHeights();
          m.view.body.translate(null, m.bodyTop = e);
          if (u === 1) {
            m.refreshSize()
          }
        }
        if (!f) {
          return
        }
        if (u === 1) {
          j = s.clientHeight - f.offsetHeight
        }
        v.position = v.scrollTop = Math.min(Math.max(0, e - n.body.getOffsetsTo(
          f)[1]) - j, y.getSize().y - s.clientHeight);
        if (m) {
          m.position = m.scrollTop = v.scrollTop
        }
        y.scrollIntoView(f, null, i, g);
        if (r) {
          n.selModel.select(c)
        }
        if (o) {
          n.getNavigationModel().setPosition(c, 0)
        }
        if (h) {
          h.call(a || v, q, c, f)
        }
      }
    })
  },
  onViewScroll: function() {
    var d = this,
      b = d.store,
      a = (b.getCount()),
      c, f, e = d.scrollTop = d.view.getScrollY();
    d.view.body.dom.style.pointerEvents = "none";
    if (!(d.disabled || a < d.viewSize)) {
      c = e - d.position;
      f = c > 0 ? 1 : -1;
      if (Math.abs(c) >= 20 || (f !== d.lastScrollDirection)) {
        d.lastScrollDirection = f;
        d.handleViewScroll(d.lastScrollDirection)
      }
    }
  },
  onViewScrollEnd: function() {
    this.view.body.dom.style.pointerEvents = ""
  },
  handleViewScroll: function(g) {
    var e = this,
      f = e.view.all,
      a = e.store,
      h = e.viewSize,
      c = (a.getCount()) - 1,
      d, b;
    if (g === -1) {
      if (f.startIndex) {
        if (e.topOfViewCloseToEdge()) {
          d = Math.max(0, e.getLastVisibleRowIndex() + e.trailingBufferZone -
            h)
        }
      }
    } else {
      if (f.endIndex < c) {
        if (e.bottomOfViewCloseToEdge()) {
          d = Math.max(0, e.getFirstVisibleRowIndex() - e.trailingBufferZone)
        }
      }
    }
    if (d == null) {
      e.loadId++
    } else {
      b = Math.min(d + h - 1, c);
      if (e.variableRowHeight && b === f.endIndex && b < c) {
        b++;
        e.viewSize = h++;
        if (a.isBufferedStore) {
          a.setViewSize(e.viewSize)
        }
      }
      if (d !== f.startIndex || b !== f.endIndex) {
        e.renderRange(d, b);
        return true
      }
    }
  },
  bottomOfViewCloseToEdge: function() {
    var a = this;
    if (a.variableRowHeight) {
      return a.bodyTop + a.view.body.dom.offsetHeight < a.scrollTop + a.view
        .lastBox.height + (a.numFromEdge * a.rowHeight)
    } else {
      return (a.view.all.endIndex - a.getLastVisibleRowIndex()) < a.numFromEdge
    }
  },
  topOfViewCloseToEdge: function() {
    var a = this;
    if (a.variableRowHeight) {
      return a.bodyTop > a.scrollTop - (a.numFromEdge * a.rowHeight)
    } else {
      return (a.getFirstVisibleRowIndex() - a.view.all.startIndex) < a.numFromEdge
    }
  },
  refreshView: function(f) {
    var c = this,
      h = c.viewSize,
      e = c.view.all,
      a = c.store,
      g = a.getCount(),
      b = Math.max(0, g - 1),
      d;
    if (!g) {
      return c.doRefreshView([], 0, 0)
    } else {
      if (g < h) {
        f = 0;
        d = b
      } else {
        if (f == null) {
          if (c.nextRefreshStartIndex != null) {
            f = c.nextRefreshStartIndex;
            c.nextRefreshStartIndex = null
          } else {
            f = e.startIndex
          }
        }
        f = Math.max(0, Math.min(f, b - (h - c.leadingBufferZone) + 1));
        d = Math.min(f + h - 1, b);
        if (d - f + 1 > h) {
          f = d - h + 1
        }
      }
    }
    if (f === 0 && d === 0 && g === 0) {
      c.doRefreshView([], 0, 0)
    } else {
      a.getRange(f, d, {
        callback: c.doRefreshView,
        scope: c
      })
    }
  },
  doRefreshView: function(m, g, c, e) {
    var r = this,
      l = r.view,
      d = l.getNavigationModel(),
      q = d.getPosition(),
      j = l.all,
      p = j.startIndex,
      f = j.endIndex,
      h, a, b = j.getCount(),
      k, i = g !== j.startIndex,
      o, n;
    if (l.refreshCounter) {
      if (l.hasListeners.beforerefresh && l.fireEvent("beforerefresh", l) ===
        false) {
        return
      }
      l.refreshing = r.refreshing = true;
      if (q && q.view === l) {
        if (q.rowIdx < g || q.rowIdx > c) {
          q = null
        } else {
          q = q.clone()
        }
        d.setPosition()
      } else {
        q = null
      }
      l.clearViewEl(true);
      l.refreshCounter++;
      if (m.length) {
        k = l.doAdd(m, g);
        if (i) {
          h = j.item(p, true);
          a = j.item(f, true);
          if (h) {
            n = -h.offsetTop
          } else {
            if (a) {
              n = j.last(true).offsetTop - a.offsetTop
            }
          }
          if (n) {
            r.bodyTop = Math.max(r.bodyTop + n, 0);
            r.scrollTop = r.bodyTop ? r.scrollTop + n : 0
          } else {
            r.bodyTop = o = g * r.rowHeight;
            r.scrollTop = Math.max(o - r.rowHeight * (o < r.bodyTop ? r.leadingBufferZone :
              r.trailingBufferZone, 0))
          }
        }
      } else {
        if (r.scrollTop) {
          r.bodyTop = r.scrollTop = 0
        }
        l.addEmptyText()
      }
      if (i) {
        r.setBodyTop(r.bodyTop);
        l.suspendEvent("scroll");
        l.setScrollY(r.position = r.scrollTop);
        l.resumeEvent("scroll")
      }
      r.refreshSize();
      l.refreshSize(j.getCount() !== b);
      l.fireEvent("refresh", l, m);
      if (q) {
        l.cellFocused = true;
        d.setPosition(q, null, null, null, true)
      }
      l.headerCt.setSortState();
      l.refreshNeeded = l.refreshing = r.refreshing = false
    } else {
      l.refresh()
    }
  },
  renderRange: function(g, a, f, c) {
    var d = this,
      e = d.view.all,
      b = d.store;
    if (!(g === e.startIndex && a === e.endIndex)) {
      if (b.rangeCached(g, a)) {
        d.cancelLoad();
        if (d.synchronousRender || f) {
          d.onRangeFetched(null, g, a, null, c)
        } else {
          if (!d.renderTask) {
            d.renderTask = new Ext.util.DelayedTask(d.onRangeFetched, d,
              null, false)
          }
          d.renderTask.delay(1, null, null, [null, g, a, null, c])
        }
      } else {
        d.attemptLoad(g, a)
      }
    }
  },
  onRangeFetched: function(p, g, e, d, r) {
    var y = this,
      o = y.view,
      k = o.el,
      c, n = o.all,
      j, x = 0,
      u, l, m = (o.lockingPartner && !r && !y.doNotMirror) && o.lockingPartner
      .bufferedRenderer,
      v, b, w, a, t, s = y.variableRowHeight,
      f, q, h;
    if (o.destroyed) {
      return
    }
    if (p) {
      y.scrollTop = y.view.getScrollY()
    } else {
      p = y.store.getRange(g, e);
      if (!p) {
        return
      }
    }
    f = Ext.Element.getActiveElement();
    q = k.contains(f);
    u = g * y.rowHeight;
    if (g < n.startIndex && e > n.endIndex) {
      w = n.startIndex - g;
      o.clearViewEl(true);
      v = o.doAdd(p, g);
      o.fireEvent("itemadd", p, g, v);
      for (t = 0; t < w; t++) {
        x -= v[t].offsetHeight
      }
      l = y.bodyTop + x
    } else {
      if (y.teleported || g > n.endIndex || e < n.startIndex) {
        l = u;
        if (s) {
          a = y.scrollTop < y.position ? y.leadingBufferZone : y.trailingBufferZone;
          if (g > a) {
            l = y.scrollTop - y.rowHeight * a
          }
        }
        o.clearViewEl(true);
        y.teleported = false
      }
      if (!n.getCount()) {
        v = o.doAdd(p, g);
        o.fireEvent("itemadd", p, g, v)
      } else {
        if (e > n.endIndex) {
          j = Math.max(g - n.startIndex, 0);
          if (s) {
            x = n.item(n.startIndex + j, true).offsetTop
          }
          v = n.scroll(Ext.Array.slice(p, n.endIndex + 1 - g), 1, j);
          if (s) {
            l = y.bodyTop + x
          } else {
            l = u
          }
        } else {
          j = Math.max(n.endIndex - e, 0);
          c = n.startIndex;
          v = n.scroll(Ext.Array.slice(p, 0, n.startIndex - g), -1, j);
          if (s) {
            l = y.bodyTop - n.item(c, true).offsetTop;
            if (!n.startIndex) {
              if (l) {
                o.setScrollY(y.position = (y.scrollTop -= l));
                l = 0
              }
            } else {
              if (l < 0) {
                x = n.startIndex * y.rowHeight;
                o.setScrollY(y.position = (y.scrollTop += x));
                l = y.bodyTop + x
              }
            }
          } else {
            l = u
          }
        }
      }
      y.position = y.scrollTop
    }
    if (q && !k.contains(f)) {
      h = o.actionableMode ? o.actionPosition : o.lastFocused;
      if (h && h.column) {
        o.onFocusLeave({});
        h.column.focus()
      }
    }
    l = Math.max(Math.floor(l), 0);
    if (o.positionBody) {
      y.setBodyTop(l)
    }
    if (v && m && !m.disabled) {
      m.scrollTop = m.position = y.scrollTop;
      b = m.onRangeFetched(null, g, e, d, true);
      if (m.bodyTop !== l) {
        m.setBodyTop(l)
      }
      m.view.setScrollY(y.scrollTop);
      if (s && o.ownerGrid.syncRowHeights) {
        y.syncRowHeights(v, b)
      }
    }
    return v
  },
  syncRowHeights: function(f, a) {
    var h = this,
      g = 0,
      k = 1,
      j = [],
      b = [],
      d = Ext.grid.locking.RowSynchronizer,
      c, e;
    if (f && a) {
      g = f.length;
      k = a.length
    }
    if (g !== k) {
      f = h.view.all.slice();
      a = h.view.lockingPartner.all.slice();
      g = k = f.length
    }
    for (c = 0; c < g; c++) {
      j[c] = e = new d(h.view, f[c]);
      e.measure()
    }
    for (c = 0; c < k; c++) {
      b[c] = e = new d(h.view.lockingPartner, a[c]);
      e.measure()
    }
    for (c = 0; c < g; c++) {
      j[c].finish(b[c]);
      b[c].finish(j[c])
    }
    h.syncRowHeightsFinish()
  },
  syncRowHeightsFinish: function() {
    var c = this,
      a = c.view,
      b = a.lockingPartner.bufferedRenderer;
    delete c.rowHeight;
    c.refreshSize();
    if (b.rowHeight !== c.rowHeight) {
      delete b.rowHeight;
      b.refreshSize()
    }
  },
  setBodyTop: function(d) {
    var e = this,
      b = e.view,
      c = e.store,
      a = b.body;
    if (!a.dom) {
      return
    }
    e.translateBody(a, d);
    if (e.variableRowHeight) {
      if (b.all.endIndex === (c.getCount()) - 1) {
        e.stretchView(b, e.scrollHeight = e.bodyTop + a.dom.offsetHeight -
          1)
      } else {
        if (e.bodyTop + a.dom.offsetHeight - 1 > e.scrollHeight) {
          e.stretchView(b, e.scrollHeight += ((c.getCount()) - b.all.endIndex) *
            e.rowHeight)
        }
      }
    }
  },
  translateBody: function(a, b) {
    a.translate(null, this.bodyTop = b)
  },
  getFirstVisibleRowIndex: function(j, c, b, f) {
    var g = this,
      h = g.view,
      l = h.all,
      a = l.elements,
      d = g.viewClientHeight,
      e, k, i = g.bodyTop;
    if (l.getCount() && g.variableRowHeight) {
      if (!arguments.length) {
        j = l.startIndex;
        c = l.endIndex;
        b = g.scrollTop;
        f = b + d;
        if (i > f || i + h.body.dom.offsetHeight < b) {
          g.teleported = true;
          return Math.floor(g.scrollTop / g.rowHeight)
        }
        e = j + Math.min(g.numFromEdge + ((g.lastScrollDirection === -1) ?
          g.leadingBufferZone : g.trailingBufferZone), Math.floor((c -
          j) / 2))
      } else {
        e = j + Math.floor((c - j) / 2)
      }
      k = i + a[e].offsetTop;
      if (k + a[e].offsetHeight <= b) {
        return g.getFirstVisibleRowIndex(e + 1, c, b, f)
      }
      if (k <= b) {
        return e
      } else {
        if (e !== j) {
          return g.getFirstVisibleRowIndex(j, e - 1, b, f)
        }
      }
    }
    return Math.floor(g.scrollTop / g.rowHeight)
  },
  getLastVisibleRowIndex: function(k, c, b, f) {
    var h = this,
      i = h.view,
      m = i.all,
      a = m.elements,
      d = h.viewClientHeight,
      e, l, g, j = h.bodyTop;
    if (m.getCount() && h.variableRowHeight) {
      if (!arguments.length) {
        k = m.startIndex;
        c = m.endIndex;
        b = h.scrollTop;
        f = b + d;
        if (j > f || j + i.body.dom.offsetHeight < b) {
          h.teleported = true;
          return Math.floor(h.scrollTop / h.rowHeight) + Math.ceil(d / h.rowHeight)
        }
        e = c - Math.min(h.numFromEdge + ((h.lastScrollDirection === 1) ?
          h.leadingBufferZone : h.trailingBufferZone), Math.floor((c -
          k) / 2))
      } else {
        e = k + Math.floor((c - k) / 2)
      }
      l = j + a[e].offsetTop;
      if (l > f) {
        return h.getLastVisibleRowIndex(k, e - 1, b, f)
      }
      g = l + a[e].offsetHeight;
      if (g >= f) {
        return e
      } else {
        if (e !== c) {
          return h.getLastVisibleRowIndex(e + 1, c, b, f)
        }
      }
    }
    return h.getFirstVisibleRowIndex() + Math.ceil(d / h.rowHeight)
  },
  getScrollHeight: function() {
    var f = this,
      a = f.view,
      g = a.all,
      c = f.store,
      d = c.getCount(),
      b, e;
    if (!d) {
      return 0
    }
    if (!f.hasOwnProperty("rowHeight")) {
      b = g.getCount();
      if (b) {
        f.rowHeight = f.variableRowHeight ? Math.floor(a.body.dom.clientHeight /
          b) : g.first(true).offsetHeight
      }
    }
    e = Math.floor(d * f.rowHeight);
    if (e && (g.endIndex === d - 1)) {
      e = Math.max(e, f.bodyTop + a.body.dom.offsetHeight)
    }
    return (f.scrollHeight = e)
  },
  attemptLoad: function(c, a) {
    var b = this;
    if (b.scrollToLoadBuffer) {
      if (!b.loadTask) {
        b.loadTask = new Ext.util.DelayedTask(b.doAttemptLoad, b, [])
      }
      b.loadTask.delay(b.scrollToLoadBuffer, b.doAttemptLoad, b, [c, a])
    } else {
      b.doAttemptLoad(c, a)
    }
  },
  cancelLoad: function() {
    if (this.loadTask) {
      this.loadTask.cancel()
    }
  },
  doAttemptLoad: function(c, a) {
    var b = this;
    if (!b.destroyed) {
      b.store.getRange(c, a, {
        loadId: ++b.loadId,
        callback: function(e, g, d, f) {
          if (f.loadId === b.loadId) {
            b.onRangeFetched(e, g, d, f)
          }
        },
        fireEvent: false
      })
    }
  },
  destroy: function() {
    var b = this,
      a = b.view;
    b.cancelLoad();
    if (a && a.el) {
      a.un("scroll", b.onViewScroll, b)
    }
    if (b.store) {
      b.unbindStore()
    }
    Ext.destroy(b.viewListeners, b.gridListeners, b.stretcher);
    b.viewListeners = b.gridListeners = b.stretcher = null;
    b.view = b.grid = null;
    Ext.plugin.Abstract.prototype.destroy.call(this)
  }
}, 0, 0, 0, 0, ["plugin.bufferedrenderer"], 0, [Ext.grid.plugin,
  "BufferedRenderer"
], function(a) {
  if (Ext.supports.Touch) {
    a.prototype.leadingBufferZone = a.prototype.trailingBufferZone = 2;
    a.prototype.numFromEdge = 1
  }
}));