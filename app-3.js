
(Ext.cmd.derive("Ext.dom.ButtonElement", Ext.dom.Element, {
  setSize: function(d, a, b) {
    var e = this,
      c = e.component;
    Ext.dom.Element.prototype.setSize.call(this, d, a, b);
    c.btnWrap.setStyle("table-layout", (!d || d === "auto") ? "" :
      "fixed");
    c.btnEl.setStyle("height", (!a || a === "auto") ? "" : "auto");
    return e
  },
  setStyle: function(f, e) {
    var d = this,
      b = d.component,
      c, a;
    Ext.dom.Element.prototype.setStyle.call(this, f, e);
    if (f) {
      if (f === "width" || (typeof f !== "string" && "width" in f)) {
        c = e || f.width;
        b.btnWrap.setStyle("table-layout", (!c || c === "auto") ? "" :
          "fixed")
      }
      if (f === "height" || (typeof f !== "string" && "height" in f)) {
        a = e || f.height;
        b.btnEl.setStyle("height", (!a || a === "auto") ? "" : "auto")
      }
    }
    return d
  },
  setHeight: function(a, b) {
    Ext.dom.Element.prototype.setHeight.call(this, a, b);
    this.component.btnEl.setStyle("height", (!a || a === "auto") ? "" :
      "auto");
    return this
  },
  setWidth: function(b, a) {
    Ext.dom.Element.prototype.setWidth.call(this, b, a);
    this.component.btnWrap.setStyle("table-layout", (!b || b === "auto") ?
      "" : "fixed");
    return this
  }
}, 0, 0, 0, 0, 0, 0, [Ext.dom, "ButtonElement"], 0));
(Ext.cmd.derive("Ext.button.Manager", Ext.Base, {
  singleton: true,
  alternateClassName: "Ext.ButtonToggleManager",
  groups: {},
  pressedButton: null,
  init: function() {
    var a = this;
    if (!a.initialized) {
      Ext.getDoc().on({
        mouseup: a.onDocumentMouseUp,
        scope: a
      });
      a.initialized = true
    }
  },
  onButtonMousedown: function(a, c) {
    var b = this.pressedButton;
    if (b) {
      b.onMouseUp(c)
    }
    this.pressedButton = a
  },
  onDocumentMouseUp: function(b) {
    var a = this.pressedButton;
    if (a) {
      a.onMouseUp(b);
      this.pressedButton = null
    }
  },
  toggleGroup: function(b, e) {
    if (e) {
      var d = this.groups[b.toggleGroup],
        c = d.length,
        a;
      for (a = 0; a < c; a++) {
        if (d[a] !== b) {
          d[a].toggle(false)
        }
      }
    }
  },
  register: function(b) {
    var c = this,
      a = this.groups,
      d = a[b.toggleGroup];
    c.init();
    if (!b.toggleGroup) {
      return
    }
    if (!d) {
      d = a[b.toggleGroup] = []
    }
    d.push(b);
    b.on("toggle", c.toggleGroup, c)
  },
  unregister: function(a) {
    if (!a.toggleGroup) {
      return
    }
    var b = this,
      c = b.groups[a.toggleGroup];
    if (c) {
      Ext.Array.remove(c, a);
      a.un("toggle", b.toggleGroup, b)
    }
  },
  getPressed: function(d) {
    var c = this.groups[d],
      b = 0,
      a;
    if (c) {
      for (a = c.length; b < a; b++) {
        if (c[b].pressed === true) {
          return c[b]
        }
      }
    }
    return null
  }
}, 0, 0, 0, 0, 0, 0, [Ext.button, "Manager", Ext, "ButtonToggleManager"], 0));
(Ext.cmd.derive("Ext.menu.Manager", Ext.Base, {
  singleton: true,
  alternateClassName: "Ext.menu.MenuMgr",
  groups: {},
  visible: [],
  constructor: function() {
    var a = this;
    a.onShow = function() {
      delete a.onShow;
      Ext.on("mousedown", a.checkActiveMenus, a);
      return a.onShow.apply(a, arguments)
    }
  },
  checkActiveMenus: function(d) {
    var g = this.visible,
      a = g.length,
      b, f, c = Ext.Component.fromElement(d.target);
    if (a) {
      g = g.slice();
      for (b = 0; b < a; ++b) {
        f = g[b];
        if (!(f.owns(d) || (c && c.isMenuCheckItem && c.menu === f))) {
          f.hide()
        }
      }
    }
  },
  onShow: function(a) {
    if (a.floating) {
      Ext.Array.include(this.visible, a)
    }
  },
  onHide: function(a) {
    if (a.floating) {
      Ext.Array.remove(this.visible, a)
    }
  },
  hideAll: function() {
    var d = this.visible,
      b = d.length,
      a = false,
      c;
    if (b) {
      d = d.slice();
      for (c = 0; c < b; c++) {
        d[c].hide();
        a = true
      }
    }
    return a
  },
  get: function(c, b) {
    var a;
    if (typeof c === "string") {
      a = Ext.getCmp(c);
      if (a instanceof Ext.menu.Menu) {
        c = a
      }
    } else {
      if (Ext.isArray(c)) {
        b = Ext.apply({
          items: c
        }, b);
        c = new Ext.menu.Menu(b)
      } else {
        if (!c.isComponent) {
          b = Ext.apply({}, c, b);
          c = Ext.ComponentManager.create(b, "menu")
        }
      }
    }
    return c
  },
  registerCheckable: function(c) {
    var a = this.groups,
      b = c.group;
    if (b) {
      if (!a[b]) {
        a[b] = []
      }
      a[b].push(c)
    }
  },
  unregisterCheckable: function(c) {
    var a = this.groups,
      b = c.group;
    if (b) {
      Ext.Array.remove(a[b], c)
    }
  },
  onCheckChange: function(d, f) {
    var a = this.groups,
      c = d.group,
      b = 0,
      h, e, g;
    if (c && f) {
      h = a[c];
      e = h.length;
      for (; b < e; b++) {
        g = h[b];
        if (g !== d) {
          g.setChecked(false)
        }
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.menu, "Manager", Ext.menu, "MenuMgr"], 0));
(Ext.cmd.derive("Ext.util.ClickRepeater", Ext.util.Observable, {
  constructor: function(b, a) {
    var c = this;
    c.el = Ext.get(b);
    c.el.unselectable();
    Ext.apply(c, a);
    Ext.util.Observable.prototype.constructor.call(this);
    if (!c.disabled) {
      c.disabled = true;
      c.enable()
    }
    if (c.handler) {
      c.on("click", c.handler, c.scope || c)
    }
  },
  interval: 20,
  delay: 250,
  preventDefault: true,
  stopDefault: false,
  timer: 0,
  enable: function() {
    if (this.disabled) {
      this.el.on("mousedown", this.handleMouseDown, this);
      if (Ext.isIE8) {
        this.el.on("dblclick", this.handleDblClick, this)
      }
      if (this.preventDefault || this.stopDefault) {
        this.el.on("click", this.eventOptions, this)
      }
    }
    this.disabled = false
  },
  disable: function(a) {
    if (a || !this.disabled) {
      clearTimeout(this.timer);
      if (this.pressedCls) {
        this.el.removeCls(this.pressedCls)
      }
      Ext.getDoc().un("mouseup", this.handleMouseUp, this);
      this.el.clearListeners()
    }
    this.disabled = true
  },
  setDisabled: function(a) {
    this[a ? "disable" : "enable"]()
  },
  eventOptions: function(a) {
    if (this.preventDefault) {
      a.preventDefault()
    }
    if (this.stopDefault) {
      a.stopEvent()
    }
  },
  destroy: function() {
    this.disable(true);
    Ext.util.Observable.prototype.destroy.call(this)
  },
  handleDblClick: function(a) {
    clearTimeout(this.timer);
    this.fireEvent("mousedown", this, a);
    this.fireEvent("click", this, a)
  },
  handleMouseDown: function(a) {
    clearTimeout(this.timer);
    if (this.pressedCls) {
      this.el.addCls(this.pressedCls)
    }
    this.mousedownTime = new Date();
    Ext.getDoc().on("mouseup", this.handleMouseUp, this);
    this.el.on("mouseout", this.handleMouseOut, this);
    this.fireEvent("mousedown", this, a);
    this.fireEvent("click", this, a);
    if (this.accelerate) {
      this.delay = 400
    }
    this.timer = Ext.defer(this.click, this.delay || this.interval, this, [
      a
    ])
  },
  click: function(a) {
    this.fireEvent("click", this, a);
    this.timer = Ext.defer(this.click, this.accelerate ? this.easeOutExpo(
        Ext.Date.getElapsed(this.mousedownTime), 400, -390, 12000) :
      this.interval, this, [a])
  },
  easeOutExpo: function(e, a, g, f) {
    return (e === f) ? a + g : g * (-Math.pow(2, -10 * e / f) + 1) + a
  },
  handleMouseOut: function() {
    clearTimeout(this.timer);
    if (this.pressedCls) {
      this.el.removeCls(this.pressedCls)
    }
    this.el.on("mouseover", this.handleMouseReturn, this)
  },
  handleMouseReturn: function(a) {
    this.el.un("mouseover", this.handleMouseReturn, this);
    if (this.pressedCls) {
      this.el.addCls(this.pressedCls)
    }
    this.click(a)
  },
  handleMouseUp: function(a) {
    clearTimeout(this.timer);
    this.el.un("mouseover", this.handleMouseReturn, this);
    this.el.un("mouseout", this.handleMouseOut, this);
    Ext.getDoc().un("mouseup", this.handleMouseUp, this);
    if (this.pressedCls) {
      this.el.removeCls(this.pressedCls)
    }
    this.fireEvent("mouseup", this, a)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "ClickRepeater"], 0));
(Ext.cmd.derive("Ext.button.Button", Ext.Component, {
  alternateClassName: "Ext.Button",
  config: {
    iconAlign: "left",
    text: null,
    textAlign: "center",
    arrowVisible: true
  },
  isButton: true,
  _syncFrameHeight: true,
  liquidLayout: true,
  hidden: false,
  disabled: false,
  pressed: false,
  tabIndex: 0,
  enableToggle: false,
  menuAlign: "tl-bl?",
  showEmptyMenu: false,
  clickEvent: "click",
  preventDefault: true,
  handleMouseEvents: true,
  tooltipType: "qtip",
  baseCls: "x-btn",
  hrefTarget: "_blank",
  destroyMenu: true,
  focusable: true,
  ariaRole: "button",
  keyHandlers: {
    SPACE: "onEnterKey",
    ENTER: "onEnterKey",
    DOWN: "onDownKey"
  },
  defaultBindProperty: "text",
  childEls: ["btnEl", "btnWrap", "btnInnerEl", "btnIconEl", "arrowEl"],
  publishes: {
    pressed: 1
  },
  _btnWrapCls: "x-btn-wrap",
  _btnCls: "x-btn-button",
  _baseIconCls: "x-btn-icon-el",
  _glyphCls: "x-btn-glyph",
  _innerCls: "x-btn-inner",
  _textCls: "x-btn-text",
  _noTextCls: "x-btn-no-text",
  _hasIconCls: "x-btn-icon",
  _pressedCls: "x-btn-pressed",
  overCls: "x-btn-over",
  _disabledCls: "x-btn-disabled",
  _menuActiveCls: "x-btn-menu-active",
  _arrowElCls: "x-btn-arrow-el",
  _focusCls: "x-btn-focus",
  _arrowFocusCls: "x-arrow-focus",
  renderTpl: '<span id="{id}-btnWrap" data-ref="btnWrap" role="presentation" unselectable="on" style="{btnWrapStyle}" class="{btnWrapCls} {btnWrapCls}-{ui} {splitCls}{childElCls}"><span id="{id}-btnEl" data-ref="btnEl" role="presentation" unselectable="on" style="{btnElStyle}" class="{btnCls} {btnCls}-{ui} {textCls} {noTextCls} {hasIconCls} {iconAlignCls} {textAlignCls} {btnElAutoHeightCls}{childElCls}"><tpl if="iconBeforeText">{[values.$comp.renderIcon(values)]}</tpl><span id="{id}-btnInnerEl" data-ref="btnInnerEl" unselectable="on" class="{innerCls} {innerCls}-{ui}{childElCls}">{text}</span><tpl if="!iconBeforeText">{[values.$comp.renderIcon(values)]}</tpl></span></span>{[values.$comp.getAfterMarkup ? values.$comp.getAfterMarkup(values) : ""]}<tpl if="closable"><span id="{id}-closeEl" data-ref="closeEl" class="{baseCls}-close-btn"><tpl if="closeText"> {closeText}</tpl></span></tpl><tpl if="split"><span id="{id}-arrowEl" class="{arrowElCls}" data-ref="arrowEl" role="button" hidefocus="on" unselectable="on"<tpl if="tabIndex != null"> tabindex="{tabIndex}"</tpl><tpl foreach="arrowElAttributes"> {$}="{.}"</tpl>>{arrowElText}</span></tpl>',
  iconTpl: '<span id="{id}-btnIconEl" data-ref="btnIconEl" role="presentation" unselectable="on" class="{baseIconCls} {baseIconCls}-{ui} {iconCls} {glyphCls}{childElCls}" style="<tpl if="iconUrl">background-image:url({iconUrl});</tpl><tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>"><tpl if="glyph">&#{glyph};</tpl></span>',
  scale: "small",
  allowedScales: ["small", "medium", "large"],
  arrowAlign: "right",
  arrowCls: "arrow",
  maskOnDisable: false,
  shrinkWrap: 3,
  frame: true,
  autoEl: {
    tag: "a",
    hidefocus: "on",
    unselectable: "on"
  },
  hasFrameTable: function() {
    return this.href && this.frameTable
  },
  frameTableListener: function() {
    if (!this.disabled) {
      this.doNavigate()
    }
  },
  doNavigate: function() {
    if (this.hrefTarget === "_blank") {
      window.open(this.getHref(), this.hrefTarget)
    } else {
      location.href = this.getHref()
    }
  },
  _triggerRegion: {},
  initComponent: function() {
    var a = this;
    a.addCls("x-unselectable");
    Ext.Component.prototype.initComponent.call(this);
    if (a.menu) {
      a.split = true;
      a.setMenu(a.menu, false, true)
    }
    if (a.url) {
      a.href = a.url
    }
    a.configuredWithPreventDefault = a.hasOwnProperty("preventDefault");
    if (a.href && !a.configuredWithPreventDefault) {
      a.preventDefault = false
    }
    if (Ext.isString(a.toggleGroup) && a.toggleGroup !== "") {
      a.enableToggle = true
    }
    if (a.html && !a.text) {
      a.text = a.html;
      delete a.html
    }
  },
  getElConfig: function() {
    var c = this,
      b = Ext.Component.prototype.getElConfig.call(this),
      a = c.getHref(),
      d = c.hrefTarget;
    if (b.tag === "a") {
      if (!c.disabled) {
        b.tabIndex = c.tabIndex
      }
      if (a) {
        if (!c.disabled) {
          b.href = a;
          if (d) {
            b.target = d
          }
        }
      }
    }
    if (!c.ariaStaticRoles[c.ariaRole]) {
      if (c.menu && !c.isSplitButton) {
        b["aria-haspopup"] = true
      }
      if (c.enableToggle) {
        b["aria-pressed"] = !!c.pressed
      }
    }
    return b
  },
  beforeRender: function() {
    Ext.Component.prototype.beforeRender.call(this);
    if (this.pressed) {
      this.addCls(this._pressedCls)
    }
  },
  initRenderData: function() {
    return Ext.apply(Ext.Component.prototype.initRenderData.call(this),
      this.getTemplateArgs())
  },
  getMenu: function() {
    return this.menu || null
  },
  setMenu: function(h, g, e) {
    var f = this,
      b = f.menu,
      a = f.isSplitButton ? f.arrowEl && f.arrowEl.dom : f.ariaEl.dom,
      c, d;
    if (b && !e) {
      if (g !== false && f.destroyMenu) {
        b.destroy()
      }
      b.ownerCmp = null
    }
    if (h) {
      c = h.isMenu;
      h = Ext.menu.Manager.get(h, {
        ownerCmp: f
      });
      h.setOwnerCmp(f, c);
      h.menuClickBuffer = 250;
      f.mon(h, {
        scope: f,
        show: f.onMenuShow,
        hide: f.onMenuHide
      });
      if (!b && f.getArrowVisible()) {
        f.split = true;
        if (f.rendered) {
          f._addSplitCls();
          f.updateLayout()
        }
      }
      f.menu = h;
      if (a) {
        a.setAttribute("aria-haspopup", true);
        a.setAttribute("aria-owns", h.id)
      } else {
        d = f.isSplitButton ? (f.ariaArrowElAttributes || (f.ariaArrowElAttributes = {})) :
          (f.ariaRenderAttributes || (f.ariaRenderAttributes = {}));
        d["aria-haspopup"] = true;
        d["aria-owns"] = h.id
      }
    } else {
      if (f.rendered) {
        a.removeAttribute("aria-haspopup");
        a.removeAttribute("aria-owns");
        f._removeSplitCls();
        f.updateLayout()
      } else {
        d = f.isSplitButton ? f.ariaArrowElAttributes : f.ariaRenderAttributes;
        if (d) {
          delete d["aria-haspopup"];
          delete d["aria-owns"]
        }
      }
      f.split = false;
      f.menu = null
    }
  },
  onRender: function() {
    var c = this,
      d, a, b;
    Ext.Component.prototype.onRender.apply(this, arguments);
    a = c.el;
    if (c.tooltip) {
      c.setTooltip(c.tooltip, true)
    }
    if (c.handleMouseEvents) {
      b = {
        scope: c,
        mouseover: c.onMouseOver,
        mouseout: c.onMouseOut,
        mousedown: c.onMouseDown
      };
      if (c.split) {
        b.mousemove = c.onMouseMove
      }
    } else {
      b = {
        scope: c
      }
    }
    if (Ext.supports.Touch) {
      b.touchstart = c.onTouchStart
    }
    if (c.repeat) {
      c.mon(new Ext.util.ClickRepeater(a, Ext.isObject(c.repeat) ? c.repeat : {}),
        "click", c.onRepeatClick, c)
    } else {
      if (b[c.clickEvent]) {
        d = true
      } else {
        b[c.clickEvent] = c.onClick
      }
    }
    c.mon(a, b);
    if (c.hasFrameTable()) {
      c.mon(c.frameTable, "click", c.frameTableListener, c)
    }
    if (d) {
      c.mon(a, c.clickEvent, c.onClick, c)
    }
    Ext.button.Manager.register(c)
  },
  onFocusLeave: function(a) {
    Ext.Component.prototype.onFocusLeave.call(this, a);
    if (this.menu) {
      this.menu.hide()
    }
  },
  getTemplateArgs: function() {
    var h = this,
      c = h._btnCls,
      e = h._baseIconCls,
      a = h.getIconAlign(),
      i = h.glyph,
      g = Ext._glyphFontFamily,
      j = h.text,
      d = h._hasIcon(),
      f = h._hasIconCls,
      b;
    if (typeof i === "string") {
      b = i.split("@");
      i = b[0];
      g = b[1]
    }
    return {
      split: h.isSplitButton,
      innerCls: h._innerCls,
      splitCls: h.getArrowVisible() ? h.getSplitCls() : "",
      iconUrl: h.icon,
      iconCls: h.iconCls,
      glyph: i,
      glyphCls: i ? h._glyphCls : "",
      glyphFontFamily: g,
      text: j || "&#160;",
      closeText: h.closeText,
      textCls: j ? h._textCls : "",
      noTextCls: j ? "" : h._noTextCls,
      hasIconCls: d ? f : "",
      btnWrapCls: h._btnWrapCls,
      btnWrapStyle: h.width ? "table-layout:fixed;" : "",
      btnElStyle: h.height ? "height:auto;" : "",
      btnCls: c,
      baseIconCls: e,
      iconBeforeText: a === "left" || a === "top",
      iconAlignCls: d ? (f + "-" + a) : "",
      textAlignCls: c + "-" + h.getTextAlign(),
      arrowElCls: h._arrowElCls,
      tabIndex: h.tabIndex
    }
  },
  renderIcon: function(a) {
    return this.getTpl("iconTpl").apply(a)
  },
  setHref: function(a) {
    var b = this,
      d = b.hrefTarget,
      c;
    b.href = a;
    if (!b.configuredWithPreventDefault) {
      b.preventDefault = !a
    }
    if (b.rendered) {
      c = b.el.dom;
      if (!a || b.disabled) {
        c.removeAttribute("href");
        c.removeAttribute("hrefTarget")
      } else {
        c.href = b.getHref();
        if (d) {
          c.target = d
        }
      }
    }
  },
  getHref: function() {
    var b = this,
      a = b.href;
    return a ? Ext.urlAppend(a, Ext.Object.toQueryString(Ext.apply({}, b.params,
      b.baseParams))) : false
  },
  setParams: function(c) {
    var a = this,
      b;
    a.params = c;
    if (a.rendered) {
      b = a.el.dom;
      if (a.disabled) {
        b.removeAttribute("href")
      } else {
        b.href = a.getHref() || ""
      }
    }
  },
  getSplitCls: function() {
    var a = this;
    return a.split ? (a.baseCls + "-" + a.arrowCls) + " " + (a.baseCls +
      "-" + a.arrowCls + "-" + a.arrowAlign) : ""
  },
  setIcon: function(b) {
    b = b || "";
    var c = this,
      a = c.btnIconEl,
      d = c.icon || "";
    c.icon = b;
    if (b !== d) {
      if (a) {
        a.setStyle("background-image", b ? "url(" + b + ")" : "");
        c._syncHasIconCls();
        if (c.didIconStateChange(d, b)) {
          c.updateLayout()
        }
      }
      c.fireEvent("iconchange", c, d, b)
    }
    return c
  },
  setIconCls: function(b) {
    b = b || "";
    var d = this,
      a = d.btnIconEl,
      c = d.iconCls || "";
    d.iconCls = b;
    if (c !== b) {
      if (a) {
        a.removeCls(c);
        a.addCls(b);
        d._syncHasIconCls();
        if (d.didIconStateChange(c, b)) {
          d.updateLayout()
        }
      }
      d.fireEvent("iconchange", d, c, b)
    }
    return d
  },
  setGlyph: function(f) {
    f = f || 0;
    var e = this,
      b = e.btnIconEl,
      c = e.glyph,
      g = e._glyphCls,
      a, d;
    e.glyph = f;
    if (b) {
      if (typeof f === "string") {
        d = f.split("@");
        f = d[0];
        a = d[1] || Ext._glyphFontFamily
      }
      if (!f) {
        b.dom.innerHTML = "";
        b.removeCls(g)
      } else {
        if (c !== f) {
          b.dom.innerHTML = "&#" + f + ";";
          b.addCls(g)
        }
      }
      if (a) {
        b.setStyle("font-family", a)
      }
      e._syncHasIconCls();
      if (e.didIconStateChange(c, f)) {
        e.updateLayout()
      }
    }
    e.fireEvent("glyphchange", e, e.glyph, c);
    return e
  },
  setTooltip: function(c, a) {
    var b = this;
    if (b.rendered) {
      if (!a || !c) {
        b.clearTip()
      }
      if (c) {
        if (Ext.quickTipsActive && Ext.isObject(c)) {
          Ext.tip.QuickTipManager.register(Ext.apply({
            target: b.el.id
          }, c));
          b.tooltip = c
        } else {
          b.el.dom.setAttribute(b.getTipAttr(), c)
        }
      }
    } else {
      b.tooltip = c
    }
    return b
  },
  updateIconAlign: function(f, d) {
    var c = this,
      b, a, e;
    if (c.rendered) {
      b = c.btnEl;
      a = c.btnIconEl;
      e = c._hasIconCls;
      if (d) {
        b.removeCls(e + "-" + d)
      }
      b.addCls(e + "-" + f);
      if (f === "top" || f === "left") {
        b.insertFirst(a)
      } else {
        b.appendChild(a)
      }
      c.updateLayout()
    }
  },
  updateTextAlign: function(e, d) {
    var c = this,
      b = c.btnEl,
      a = c._btnCls;
    if (c.rendered) {
      b.removeCls(a + "-" + d);
      b.addCls(a + "-" + e)
    }
  },
  getTipAttr: function() {
    return this.tooltipType === "qtip" ? "data-qtip" : "title"
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
  clearTip: function() {
    var b = this,
      a = b.el;
    if (Ext.quickTipsActive && Ext.isObject(b.tooltip)) {
      Ext.tip.QuickTipManager.unregister(a)
    } else {
      a.dom.removeAttribute(b.getTipAttr())
    }
  },
  beforeDestroy: function() {
    var a = this;
    if (a.rendered) {
      a.clearTip()
    }
    Ext.destroy(a.repeater);
    Ext.Component.prototype.beforeDestroy.call(this)
  },
  onDestroy: function() {
    var a = this,
      b = a.menu;
    if (a.rendered) {
      Ext.destroy(a.keyMap);
      delete a.keyMap
    }
    if (b && a.destroyMenu) {
      a.menu = Ext.destroy(b)
    }
    Ext.button.Manager.unregister(a);
    Ext.Component.prototype.onDestroy.call(this)
  },
  setHandler: function(b, a) {
    this.handler = b;
    if (arguments.length > 1) {
      this.scope = a
    }
    return this
  },
  updateText: function(d, a) {
    d = d == null ? "" : String(d);
    a = a || "";
    var c = this,
      e = c.btnInnerEl,
      b = c.btnEl;
    if (c.rendered) {
      e.setHtml(d || "&#160;");
      b[d ? "addCls" : "removeCls"](c._textCls);
      b[d ? "removeCls" : "addCls"](c._noTextCls);
      c.updateLayout()
    }
    c.fireEvent("textchange", c, a, d)
  },
  didIconStateChange: function(a, c) {
    var b = Ext.isEmpty(c);
    return Ext.isEmpty(a) ? !b : b
  },
  click: function(a) {
    return this.onClick(a)
  },
  setPressed: function(a) {
    return this.toggle(a !== false)
  },
  toggle: function(d, b) {
    var c = this,
      a = c.ariaEl.dom;
    d = d === undefined ? !c.pressed : !!d;
    if (c.fireEvent("beforetoggle", c, d) !== false) {
      if (d !== c.pressed) {
        c[d ? "addCls" : "removeCls"](c._pressedCls);
        c.pressed = d;
        if (a) {
          a.setAttribute("aria-pressed", d)
        }
        if (!b) {
          c.fireEvent("toggle", c, d);
          Ext.callback(c.toggleHandler, c.scope, [c, d], 0, c);
          if (c.reference && c.publishState) {
            c.publishState("pressed", d)
          }
        }
      }
    }
    return c
  },
  maybeShowMenu: function(a) {
    if (this.menu) {
      this.showMenu(a)
    }
  },
  showMenu: function(a) {
    var c = this,
      d = c.menu,
      b = !a || a.pointerType;
    if (d && c.rendered) {
      if (c.tooltip && Ext.quickTipsActive && c.getTipAttr() !== "title") {
        Ext.tip.QuickTipManager.getQuickTip().cancelShow(c.el)
      }
      if (d.isVisible()) {
        if (b) {
          d.hide()
        } else {
          d.focus()
        }
      } else {
        if (!a || c.showEmptyMenu || d.items.getCount() > 0) {
          d.autoFocus = !b;
          d.showBy(c.el, c.menuAlign)
        }
      }
    }
    return c
  },
  hideMenu: function() {
    if (this.hasVisibleMenu()) {
      this.menu.hide()
    }
    return this
  },
  hasVisibleMenu: function() {
    var a = this.menu;
    return a && a.rendered && a.isVisible()
  },
  onRepeatClick: function(a, b) {
    this.onClick(b)
  },
  onTouchStart: function(a) {
    this.doPreventDefault(a)
  },
  onEnterKey: function(a) {
    this.onClick(a);
    a.stopEvent();
    return false
  },
  onClick: function(b) {
    var a = this;
    a.doPreventDefault(b);
    if (b.type !== "keydown" && b.button) {
      return
    }
    if (!a.disabled) {
      a.doToggle();
      a.maybeShowMenu(b);
      a.fireHandler(b)
    }
  },
  doPreventDefault: function(a) {
    if (a && (this.preventDefault || (this.disabled && this.getHref()))) {
      a.preventDefault()
    }
  },
  fireHandler: function(b) {
    var a = this;
    if (a.fireEvent("click", a, b) !== false && !a.destroyed) {
      Ext.callback(a.handler, a.scope, [a, b], 0, a)
    }
  },
  doToggle: function() {
    var a = this;
    if (a.enableToggle && (a.allowDepress !== false || !a.pressed)) {
      a.toggle()
    }
  },
  onMouseOver: function(b) {
    var a = this;
    if (!a.disabled && !b.within(a.el, true, true)) {
      a.onMouseEnter(b)
    }
  },
  onMouseOut: function(b) {
    var a = this;
    if (!b.within(a.el, true, true)) {
      if (a.overMenuTrigger) {
        a.onMenuTriggerOut(b)
      }
      a.onMouseLeave(b)
    }
  },
  onMouseMove: function(c) {
    var a = this,
      b = a.overMenuTrigger;
    if (a.split) {
      if (a.isWithinTrigger(c)) {
        if (!b) {
          a.onMenuTriggerOver(c)
        }
      } else {
        if (b) {
          a.onMenuTriggerOut(c)
        }
      }
    }
  },
  isWithinTrigger: function(d) {
    var c = this,
      b = c.el,
      f, a;
    f = (c.arrowAlign === "right") ? d.getX() - c.getX() : d.getY() - b.getY();
    a = c.getTriggerRegion();
    return f > a.begin && f < a.end
  },
  getTriggerRegion: function() {
    var d = this,
      e = d._triggerRegion,
      c = d.arrowAlign === "right",
      b = c ? "getRight" : "getBottom",
      a = c ? d.getWidth() : d.getHeight();
    e.begin = a - (d.el[b]() - d.btnEl[b]());
    e.end = a;
    return e
  },
  onMouseEnter: function(a) {
    this.fireEvent("mouseover", this, a)
  },
  onMouseLeave: function(a) {
    this.fireEvent("mouseout", this, a)
  },
  onMenuTriggerOver: function(c) {
    var b = this,
      a = b.arrowTooltip;
    b.overMenuTrigger = true;
    if (b.split && a) {
      b.btnWrap.dom.setAttribute(b.getTipAttr(), a)
    }
    b.fireEvent("menutriggerover", b, b.menu, c)
  },
  onMenuTriggerOut: function(b) {
    var a = this;
    delete a.overMenuTrigger;
    if (a.split && a.arrowTooltip) {
      a.btnWrap.dom.setAttribute(a.getTipAttr(), "")
    }
    a.fireEvent("menutriggerout", a, a.menu, b)
  },
  onEnable: function() {
    var b = this,
      a = b.href,
      d = b.hrefTarget,
      c = b.el.dom;
    Ext.Component.prototype.onEnable.call(this);
    b.removeCls(b._disabledCls);
    c.setAttribute("tabIndex", b.tabIndex);
    if (a) {
      c.href = a
    }
    if (d) {
      c.target = d
    }
  },
  onDisable: function() {
    var a = this,
      b = a.el.dom;
    Ext.Component.prototype.onDisable.call(this);
    a.addCls(a._disabledCls);
    a.removeCls(a.overCls);
    b.removeAttribute("tabIndex");
    if (a.href) {
      b.removeAttribute("href")
    }
    if (a.hrefTarget) {
      b.removeAttribute("target")
    }
  },
  setScale: function(c) {
    var a = this,
      b = a.ui.replace("-" + a.scale, "");
    if (!Ext.Array.contains(a.allowedScales, c)) {
      throw ("#setScale: scale must be an allowed scale (" + a.allowedScales
        .join(", ") + ")")
    }
    a.scale = c;
    a.setUI(b)
  },
  setUI: function(b) {
    var a = this;
    if (a.scale && !b.match(a.scale)) {
      b = b + "-" + a.scale
    }
    Ext.Component.prototype.setUI.call(this, b)
  },
  onMouseDown: function(b) {
    var a = this;
    if (Ext.isIE || b.pointerType === "touch") {
      Ext.defer(function() {
        var c = a.getFocusEl();
        if (c && !b.defaultPrevented) {
          c.focus()
        }
      }, 1)
    }
    if (!a.disabled && b.button === 0) {
      Ext.button.Manager.onButtonMousedown(a, b);
      a.addCls(a._pressedCls)
    }
  },
  onMouseUp: function(b) {
    var a = this;
    if (!a.destroyed && b.button === 0) {
      if (!a.pressed) {
        a.removeCls(a._pressedCls)
      }
    }
  },
  onMenuShow: function() {
    var a = this;
    a.addCls(a._menuActiveCls);
    a.fireEvent("menushow", a, a.menu)
  },
  onMenuHide: function(b) {
    var a = this;
    a.removeCls(a._menuActiveCls);
    a.fireEvent("menuhide", a, a.menu)
  },
  onDownKey: function(b) {
    var a = this;
    if (a.menu && !a.disabled) {
      a.showMenu(b);
      b.stopEvent();
      return false
    }
  },
  updateArrowVisible: function(b) {
    var a = this;
    if (a.rendered) {
      if (b) {
        if (a.menu || a.isSplitButton) {
          a.split = true;
          a._addSplitCls()
        }
      } else {
        a._removeSplitCls();
        a.split = false
      }
    }
    return b
  },
  privates: {
    addOverCls: function() {
      if (!this.disabled) {
        this.addCls(this.overCls)
      }
    },
    _addSplitCls: function() {
      var a = this;
      a.btnWrap.addCls(a.getSplitCls())
    },
    getTdCls: function() {
      return "x-button-" + this.ui + "-" + this.scale + "-cell"
    },
    removeOverCls: function() {
      this.removeCls(this.overCls)
    },
    _removeSplitCls: function() {
      var a = this;
      a.btnWrap.removeCls(a.getSplitCls())
    },
    _syncHasIconCls: function() {
      var b = this,
        a = b.btnEl,
        c = b._hasIconCls;
      if (a) {
        a[b._hasIcon() ? "addCls" : "removeCls"]([c, c + "-" + b.iconAlign])
      }
    },
    _hasIcon: function() {
      return !!(this.icon || this.iconCls || this.glyph)
    },
    wrapPrimaryEl: function(a) {
      this.el = new Ext.dom.ButtonElement(a);
      Ext.Component.prototype.wrapPrimaryEl.call(this, a)
    }
  }
}, 0, ["button"], ["component", "box", "button"], {
  component: true,
  box: true,
  button: true
}, ["widget.button"], [
  [Ext.mixin.Queryable.prototype.mixinId || Ext.mixin.Queryable.$className,
    Ext.mixin.Queryable
  ],
  [Ext.util.KeyboardInteractive.prototype.mixinId || Ext.util.KeyboardInteractive
    .$className, Ext.util.KeyboardInteractive
  ]
], [Ext.button, "Button", Ext, "Button"], 0));
(Ext.cmd.derive("Ext.button.Split", Ext.button.Button, {
  alternateClassName: "Ext.SplitButton",
  isSplitButton: true,
  arrowCls: "split",
  split: true,
  getTemplateArgs: function() {
    var b = this,
      a, c;
    c = Ext.button.Button.prototype.getTemplateArgs.call(this);
    if (b.disabled) {
      c.tabIndex = null
    }
    a = b.ariaArrowElAttributes || {};
    a["aria-hidden"] = !!b.hidden;
    a["aria-disabled"] = !!b.disabled;
    if (b.arrowTooltip) {
      a["aria-label"] = b.arrowTooltip
    } else {
      a["aria-labelledby"] = b.id
    }
    c.arrowElAttributes = a;
    return c
  },
  onRender: function() {
    var b = this,
      a;
    Ext.button.Button.prototype.onRender.call(this);
    a = b.getFocusEl();
    if (a) {
      a.on({
        scope: b,
        focus: b.onMainElFocus,
        blur: b.onMainElBlur
      })
    }
    a = b.arrowEl;
    if (a) {
      a.dom.setAttribute(Ext.Component.componentIdAttribute, b.id);
      a.setVisibilityMode(Ext.dom.Element.DISPLAY);
      a.on({
        scope: b,
        focus: b.onArrowElFocus,
        blur: b.onArrowElBlur
      })
    }
  },
  setArrowHandler: function(b, a) {
    this.arrowHandler = b;
    this.scope = a
  },
  onClick: function(c) {
    var b = this,
      a = c.type === "keydown" && c.target === b.arrowEl.dom;
    b.doPreventDefault(c);
    if (!b.disabled) {
      if (a || b.isWithinTrigger(c)) {
        c.preventDefault();
        b.maybeShowMenu(c);
        b.fireEvent("arrowclick", b, c);
        if (b.arrowHandler) {
          b.arrowHandler.call(b.scope || b, b, c)
        }
      } else {
        b.doToggle();
        b.fireHandler(c)
      }
    }
  },
  enable: function(b) {
    var c = this,
      a = c.arrowEl;
    Ext.button.Button.prototype.enable.call(this, b);
    if (a) {
      a.dom.setAttribute("tabIndex", c.tabIndex);
      a.dom.setAttribute("aria-disabled", "false")
    }
  },
  disable: function(b) {
    var c = this,
      a = c.arrowEl;
    Ext.button.Button.prototype.disable.call(this, b);
    if (a) {
      a.dom.removeAttribute("tabIndex");
      a.dom.setAttribute("aria-disabled", "true")
    }
  },
  afterHide: function(a, b) {
    Ext.button.Button.prototype.afterHide.call(this, a, b);
    this.arrowEl.dom.setAttribute("aria-hidden", "true")
  },
  afterShow: function(c, a, b) {
    Ext.button.Button.prototype.afterShow.call(this, c, a, b);
    this.arrowEl.dom.setAttribute("aria-hidden", "false")
  },
  privates: {
    isFocusing: function(d) {
      var c = this,
        g = d.fromElement,
        f = d.toElement,
        b = c.focusEl && c.focusEl.dom,
        a = c.arrowEl && c.arrowEl.dom;
      if (c.focusable) {
        if (f === b) {
          return g === a ? false : true
        } else {
          if (f === a) {
            return g === b ? false : true
          }
        }
        return true
      }
      return false
    },
    isBlurring: function(d) {
      var c = this,
        g = d.fromElement,
        f = d.toElement,
        b = c.focusEl && c.focusEl.dom,
        a = c.arrowEl && c.arrowEl.dom;
      if (c.focusable) {
        if (g === b) {
          return f === a ? false : true
        } else {
          if (g === a) {
            return f === b ? false : true
          }
        }
        return true
      }
      return false
    },
    getFocusClsEl: Ext.privateFn,
    onMainElFocus: function(a) {
      this.el.addCls(this._focusCls)
    },
    onMainElBlur: function(a) {
      this.el.removeCls(this._focusCls)
    },
    onArrowElFocus: function(a) {
      this.el.addCls(this._arrowFocusCls)
    },
    onArrowElBlur: function() {
      this.el.removeCls(this._arrowFocusCls)
    },
    setTabIndex: function(a) {
      Ext.button.Button.prototype.setTabIndex.call(this, a);
      if (this.arrowEl) {
        this.arrowEl.set({
          tabIndex: a
        })
      }
    },
    _addSplitCls: function() {
      var a = this.arrowEl;
      Ext.button.Button.prototype._addSplitCls.call(this);
      a.dom.setAttribute("tabIndex", this.tabIndex);
      a.setVisible(true)
    },
    _removeSplitCls: function() {
      var a = this.arrowEl;
      Ext.button.Button.prototype._removeSplitCls.call(this);
      a.dom.removeAttribute("tabIndex");
      a.setVisible(false)
    }
  }
}, 0, ["splitbutton"], ["component", "box", "button", "splitbutton"], {
  component: true,
  box: true,
  button: true,
  splitbutton: true
}, ["widget.splitbutton"], 0, [Ext.button, "Split", Ext, "SplitButton"], 0));
(Ext.cmd.derive("Ext.button.Cycle", Ext.button.Split, {
  alternateClassName: "Ext.CycleButton",
  getButtonText: function(b) {
    var a = this,
      c = "";
    if (b && a.showText === true) {
      if (a.prependText) {
        c += a.prependText
      }
      c += b.text;
      return c
    }
    return a.text
  },
  setActiveItem: function(f, a) {
    var e = this,
      b = e.changeHandler,
      d = e.forceIcon,
      c = e.forceGlyph;
    e.settingActive = true;
    if (!Ext.isObject(f)) {
      f = e.menu.getComponent(f)
    }
    if (f) {
      e.setText(e.getButtonText(f));
      e.setIconCls(d ? d : f.iconCls);
      e.setGlyph(c ? c : f.glyph);
      e.activeItem = f;
      if (!f.checked) {
        f.setChecked(true, false)
      }
      if (!a) {
        if (b) {
          Ext.callback(b, e.scope, [e, f], 0, e)
        }
        e.fireEvent("change", e, f)
      }
    }
    e.settingActive = false
  },
  getActiveItem: function() {
    return this.activeItem
  },
  initComponent: function() {
    var f = this,
      e = 0,
      b, c, a, d;
    b = (f.menu.items || []).concat(f.items || []);
    f.menu = Ext.applyIf({
      cls: "x-cycle-menu",
      items: []
    }, f.menu);
    a = b.length;
    for (c = 0; c < a; c++) {
      d = b[c];
      d = Ext.applyIf({
        group: f.id,
        itemIndex: c,
        checkHandler: f.checkHandler,
        scope: f,
        checked: d.checked || false
      }, d);
      f.menu.items.push(d);
      if (d.checked) {
        e = c
      }
    }
    f.itemCount = f.menu.items.length;
    Ext.button.Split.prototype.initComponent.apply(this, arguments);
    f.on("click", f.toggleSelected, f);
    f.setActiveItem(e, true)
  },
  checkHandler: function(a, b) {
    if (b && !this.settingActive) {
      this.setActiveItem(a)
    }
  },
  toggleSelected: function() {
    var c = this,
      a = c.menu,
      b;
    b = c.activeItem.next(":not([disabled])") || a.items.getAt(0);
    b.setChecked(true)
  }
}, 0, ["cycle"], ["component", "box", "button", "splitbutton", "cycle"], {
  component: true,
  box: true,
  button: true,
  splitbutton: true,
  cycle: true
}, ["widget.cycle"], 0, [Ext.button, "Cycle", Ext, "CycleButton"], 0));
(Ext.cmd.derive("Ext.layout.container.SegmentedButton", Ext.layout.container.Container, {
  needsItemSize: false,
  setsItemSize: false,
  _btnRowCls: "x-segmented-button-row",
  getRenderTree: function() {
    var d = this,
      a = Ext.layout.container.Container.prototype.getRenderTree.call(
        this),
      b, c;
    if (d.owner.getVertical()) {
      for (b = 0, c = a.length; b < c; b++) {
        a[b] = {
          cls: d._btnRowCls,
          cn: a[b]
        }
      }
    }
    return a
  },
  getItemLayoutEl: function(a) {
    var b = a.el.dom;
    return this.owner.getVertical() ? b.parentNode : b
  },
  onDestroy: function() {
    if (this.rendered) {
      var b = this.getRenderTarget(),
        a;
      while ((a = b.last())) {
        a.destroy()
      }
    }
  }
}, 0, 0, 0, 0, ["layout.segmentedbutton"], 0, [Ext.layout.container,
  "SegmentedButton"
], 0));
(Ext.cmd.derive("Ext.button.Segmented", Ext.container.Container, {
  config: {
    allowDepress: false,
    allowMultiple: false,
    forceSelection: false,
    allowToggle: true,
    vertical: false,
    defaultUI: "default"
  },
  beforeRenderConfig: {
    value: undefined
  },
  defaultBindProperty: "value",
  publishes: ["value"],
  twoWayBindable: ["value"],
  layout: "segmentedbutton",
  defaultType: "button",
  maskOnDisable: false,
  isSegmentedButton: true,
  baseCls: "x-segmented-button",
  itemCls: "x-segmented-button-item",
  _firstCls: "x-segmented-button-first",
  _lastCls: "x-segmented-button-last",
  _middleCls: "x-segmented-button-middle",
  applyValue: function(j, a) {
    var h = this,
      m = h.getAllowMultiple(),
      d, e, k, l, g, c, f, b;
    k = (j instanceof Array) ? j : (j == null) ? [] : [j];
    l = (a instanceof Array) ? a : (a == null) ? [] : [a];
    h._isApplyingValue = true;
    if (!h.rendered) {
      g = h.items.items;
      for (c = g.length - 1; c >= 0; c--) {
        e = g[c];
        if (h.forceSelection && !c && !b) {
          e.pressed = true
        }
        if (e.pressed) {
          b = true;
          d = e.value;
          if (d == null) {
            d = h.items.indexOf(e)
          }
          if (!Ext.Array.contains(k, d)) {
            k.unshift(d)
          }
        }
      }
    }
    f = k.length;
    for (c = 0; c < f; c++) {
      j = k[c];
      e = h._lookupButtonByValue(j);
      if (e) {
        d = e.value;
        if ((d != null) && d !== j) {
          k[c] = d
        }
        if (!e.pressed) {
          e.setPressed(true)
        }
      }
    }
    j = m ? k : f ? k[0] : null;
    for (c = 0, f = l.length; c < f; c++) {
      a = l[c];
      if (!Ext.Array.contains(k, a)) {
        h._lookupButtonByValue(a).setPressed(false)
      }
    }
    h._isApplyingValue = false;
    if (h.hasListeners.change && !Ext.Array.equals(k, l)) {
      h.fireEvent("change", h, k, l)
    }
    return j
  },
  beforeRender: function() {
    var a = this;
    a.addCls(a.baseCls + a._getClsSuffix());
    a._syncItemClasses(true);
    Ext.container.Container.prototype.beforeRender.call(this)
  },
  onAdd: function(c) {
    var b = this,
      a = "_syncItemClasses";
    b.mon(c, {
      hide: a,
      show: a,
      beforetoggle: "_onBeforeItemToggle",
      toggle: "_onItemToggle",
      scope: b
    });
    if (b.getAllowToggle()) {
      c.enableToggle = true;
      if (!b.getAllowMultiple()) {
        c.toggleGroup = b.getId();
        c.allowDepress = b.getAllowDepress()
      }
    }
    c.addCls(b.itemCls + b._getClsSuffix());
    b._syncItemClasses();
    Ext.container.Container.prototype.onAdd.call(this, c)
  },
  onRemove: function(b) {
    var a = this;
    b.removeCls(a.itemCls + a._getClsSuffix());
    a._syncItemClasses();
    Ext.container.Container.prototype.onRemove.call(this, b)
  },
  beforeLayout: function() {
    if (Ext.isChrome) {
      this.el.dom.offsetWidth
    }
    Ext.container.Container.prototype.beforeLayout.call(this)
  },
  updateDefaultUI: function(e) {
    var a = this.items,
      d, b, c;
    if (this.rendered) {
      Ext.raise(
        "Changing the ui config of a segmented button after render is not supported."
      )
    } else {
      if (a) {
        if (a.items) {
          a = a.items
        }
        for (b = 0, c = a.length; b < c; b++) {
          d = a[b];
          if (d.ui === "default" && e !== "default" && !d.hasOwnProperty(
              "ui")) {
            a[b].ui = e
          }
        }
      }
    }
  },
  privates: {
    _getClsSuffix: function() {
      return this.getVertical() ? "-vertical" : "-horizontal"
    },
    _getFirstCls: function() {
      return this._firstCls
    },
    _getLastCls: function() {
      return this._lastCls
    },
    _lookupButtonByValue: function(g) {
      var b = this.items.items,
        f = b.length,
        e = 0,
        d = null,
        a, c;
      for (; e < f; e++) {
        c = b[e];
        a = c.value;
        if ((a != null) && a === g) {
          d = c;
          break
        }
      }
      if (!d && typeof g === "number") {
        d = b[g]
      }
      return d
    },
    _onBeforeItemToggle: function(a, b) {
      if (this.allowMultiple && this.forceSelection && !b && this.getValue()
        .length === 1) {
        return false
      }
    },
    _onItemToggle: function(c, g) {
      if (this._isApplyingValue) {
        return
      }
      var e = this,
        d = Ext.Array,
        b = e.allowMultiple,
        a = (c.value != null) ? c.value : e.items.indexOf(c),
        f = e.getValue(),
        h;
      if (b) {
        h = d.indexOf(f, a)
      }
      if (g) {
        if (b) {
          if (h === -1) {
            f = d.slice(f);
            f.push(a)
          }
        } else {
          f = a
        }
      } else {
        if (b) {
          if (h > -1) {
            f = d.slice(f);
            f.splice(h, 1)
          }
        } else {
          if (f === a) {
            f = null
          }
        }
      }
      e.setValue(f);
      e.fireEvent("toggle", e, c, g)
    },
    _syncItemClasses: function(a) {
      var g = this,
        b, d, j, f, e, k, h, c;
      if (!a && !g.rendered) {
        return
      }
      b = g._getFirstCls();
      d = g._middleCls;
      j = g._getLastCls();
      f = g.items.items;
      e = f.length;
      k = [];
      for (c = 0; c < e; c++) {
        h = f[c];
        if (!h.hidden) {
          k.push(h)
        }
      }
      e = k.length;
      for (c = 0; c < e; c++) {
        k[c].removeCls([b, d, j])
      }
      if (e > 1) {
        k[0].addCls(b);
        for (c = 1; c < e - 1; c++) {
          k[c].addCls(d)
        }
        k[e - 1].addCls(j)
      }
    }
  }
}, 0, ["segmentedbutton"], ["component", "box", "container",
  "segmentedbutton"
], {
  component: true,
  box: true,
  container: true,
  segmentedbutton: true
}, ["widget.segmentedbutton"], 0, [Ext.button, "Segmented"], 0));
(Ext.cmd.derive("Ext.panel.Bar", Ext.container.Container, {
  vertical: false,
  _verticalSides: {
    left: 1,
    right: 1
  },
  initComponent: function() {
    var b = this,
      a = b.vertical;
    b.dock = b.dock || (a ? "left" : "top");
    b.layout = Ext.apply(a ? {
      type: "vbox",
      align: "middle",
      alignRoundingMethod: "ceil"
    } : {
      type: "hbox",
      align: "middle",
      alignRoundingMethod: "floor"
    }, b.layout);
    Ext.container.Container.prototype.initComponent.call(this)
  },
  onAdded: function(b, c, a) {
    this.initOrientation();
    Ext.container.Container.prototype.onAdded.call(this, b, c, a)
  },
  onRemoved: function(a) {
    this.removeClsWithUI(this.uiCls);
    Ext.container.Container.prototype.onRemoved.call(this, a)
  },
  beforeRender: function() {
    var a = this;
    if (a.forceOrientation || !a.ownerCt) {
      a.initOrientation()
    }
    Ext.container.Container.prototype.beforeRender.call(this)
  },
  setDock: function(d) {
    var c = this,
      b, a;
    if (d !== c.dock) {
      Ext.suspendLayouts();
      c.clearOrientation();
      Ext.container.Container.prototype.setDock.call(this, d);
      c.initOrientation();
      a = c.vertical;
      b = c.layout;
      b.setVertical(a);
      b.setAlignRoundingMethod(a ? "ceil" : "floor");
      Ext.resumeLayouts(true)
    }
  },
  privates: {
    clearOrientation: function() {
      this.removeClsWithUI([this.vertical ? "vertical" : "horizontal",
        this.getDockName()
      ])
    },
    getDockName: function() {
      return this.dock
    },
    initOrientation: function() {
      var c = this,
        b = c.dock,
        a = (c.vertical = (b ? b in c._verticalSides : c.vertical));
      c.addClsWithUI([a ? "vertical" : "horizontal", c.getDockName()])
    }
  }
}, 0, 0, ["component", "box", "container"], {
  component: true,
  box: true,
  container: true
}, 0, 0, [Ext.panel, "Bar"], 0));
(Ext.cmd.derive("Ext.panel.Title", Ext.Component, {
  isTitle: true,
  noWrap: true,
  textAlign: "left",
  iconAlign: "left",
  rotation: 0,
  text: "&#160;",
  beforeRenderConfig: {
    textAlign: null,
    text: null,
    glyph: null,
    icon: null,
    iconAlign: null,
    iconCls: null,
    rotation: null
  },
  autoEl: {
    role: "presentation",
    unselectable: "on"
  },
  textElRole: "presentation",
  tabIndex: 0,
  childEls: ["textEl", "iconEl", "iconWrapEl"],
  renderTpl: '<tpl if="iconMarkup && iconBeforeTitle">{iconMarkup}</tpl><div id="{id}-textEl" data-ref="textEl" class="{textCls} {textCls}-{ui} {itemCls}{childElCls}" unselectable="on"<tpl if="textElRole"> role="{textElRole}"</tpl>>{text}</div><tpl if="iconMarkup && !iconBeforeTitle">{iconMarkup}</tpl>',
  iconTpl: '<div id="{id}-iconWrapEl" data-ref="iconWrapEl" role="presentation" class="{iconWrapCls} {iconWrapCls}-{ui} {iconAlignCls} {itemCls}{childElCls}"<tpl if="iconWrapStyle"> style="{iconWrapStyle}"</tpl>><div id="{id}-iconEl" data-ref="iconEl" role="presentation" unselectable="on" class="{baseIconCls} {baseIconCls}-{ui} {iconCls} {glyphCls}" style="<tpl if="iconUrl">background-image:url({iconUrl});</tpl><tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>"><tpl if="glyph">&#{glyph};</tpl></div></div>',
  _textAlignClasses: {
    left: "x-title-align-left",
    center: "x-title-align-center",
    right: "x-title-align-right"
  },
  _iconAlignClasses: {
    top: "x-title-icon-top",
    right: "x-title-icon-right",
    bottom: "x-title-icon-bottom",
    left: "x-title-icon-left"
  },
  _rotationClasses: {
    0: "x-title-rotate-none",
    1: "x-title-rotate-right",
    2: "x-title-rotate-left"
  },
  _rotationAngles: {
    1: 90,
    2: 270
  },
  baseCls: "x-title",
  _titleSuffix: "-title",
  _glyphCls: "x-title-glyph",
  _iconWrapCls: "x-title-icon-wrap",
  _baseIconCls: "x-title-icon",
  _itemCls: "x-title-item",
  _textCls: "x-title-text",
  afterComponentLayout: function() {
    var d = this,
      b = d.getRotation(),
      a, e, c;
    if (b && !Ext.isIE8) {
      c = d.el;
      a = d.lastBox;
      e = a.x;
      c.setStyle(d._getVerticalAdjustDirection(), (e + ((b === 1) ? a.width :
        -a.height)) + "px")
    }
    Ext.Component.prototype.afterComponentLayout.call(this)
  },
  onRender: function() {
    var c = this,
      a = c.getRotation(),
      b = c.el;
    Ext.Component.prototype.onRender.call(this);
    if (a) {
      b.setVertical(c._rotationAngles[a])
    }
    if (Ext.supports.FixedTableWidthBug) {
      b._needsTableWidthFix = true
    }
  },
  applyText: function(a) {
    if (!a) {
      a = "&#160;"
    }
    return a
  },
  beforeRender: function() {
    var a = this;
    Ext.Component.prototype.beforeRender.call(this);
    a.addCls(a._rotationClasses[a.getRotation()]);
    a.addCls(a._textAlignClasses[a.getTextAlign()])
  },
  getIconMarkup: function() {
    return this.getTpl("iconTpl").apply(this.getIconRenderData())
  },
  getIconRenderData: function() {
    var f = this,
      c = f.getIcon(),
      b = f.getIconCls(),
      e = f.getGlyph(),
      g = Ext._glyphFontFamily,
      a = f.getIconAlign(),
      d;
    if (typeof e === "string") {
      d = e.split("@");
      e = d[0];
      g = d[1]
    }
    return {
      id: f.id,
      ui: f.ui,
      itemCls: f._itemCls,
      iconUrl: c,
      iconCls: b,
      iconWrapCls: f._iconWrapCls,
      baseIconCls: f._baseIconCls,
      iconAlignCls: f._iconAlignClasses[a],
      glyph: e,
      glyphCls: e ? f._glyphCls : "",
      glyphFontFamily: g
    }
  },
  initRenderData: function() {
    var b = this,
      a, c;
    c = Ext.apply({
      text: b.getText(),
      textElRole: b.textElRole,
      id: b.id,
      ui: b.ui,
      itemCls: b._itemCls,
      textCls: b._textCls,
      iconMarkup: null,
      iconBeforeTitle: null
    }, Ext.Component.prototype.initRenderData.call(this));
    if (b._hasIcon()) {
      a = b.getIconAlign();
      c.iconMarkup = b.getIconMarkup();
      c.iconBeforeTitle = (a === "top" || a === "left")
    }
    return c
  },
  onAdded: function(b, f, a) {
    var d = this,
      e = d._titleSuffix,
      c = b.baseCls;
    d.addCls([c + e, c + e + "-" + b.ui]);
    Ext.Component.prototype.onAdded.call(this, b, f, a)
  },
  updateGlyph: function(f, c) {
    f = f || 0;
    var e = this,
      g = e._glyphCls,
      b, a, d;
    e.glyph = f;
    if (e.rendered) {
      e._syncIconVisibility();
      b = e.iconEl;
      if (typeof f === "string") {
        d = f.split("@");
        f = d[0];
        a = d[1] || Ext._glyphFontFamily
      }
      if (!f) {
        b.dom.innerHTML = "";
        b.removeCls(g)
      } else {
        if (c !== f) {
          b.dom.innerHTML = "&#" + f + ";";
          b.addCls(g)
        }
      }
      if (a) {
        b.setStyle("font-family", a)
      }
      if (e._didIconStateChange(c, f)) {
        e.updateLayout()
      }
    }
  },
  updateIcon: function(b, d) {
    b = b || "";
    var c = this,
      a;
    if (c.rendered && b !== d) {
      c._syncIconVisibility();
      a = c.iconEl;
      a.setStyle("background-image", b ? "url(" + b + ")" : "");
      if (c._didIconStateChange(d, b)) {
        c.updateLayout()
      }
    }
  },
  updateIconAlign: function(f, c) {
    var b = this,
      e = b.iconWrapEl,
      a, d;
    if (b.iconWrapEl) {
      a = b.el;
      d = b._iconAlignClasses;
      if (c) {
        e.removeCls(d[c])
      }
      e.addCls(d[f]);
      if (f === "top" || f === "left") {
        a.insertFirst(e)
      } else {
        a.appendChild(e)
      }
      b.updateLayout()
    }
  },
  updateIconCls: function(b, c) {
    b = b || "";
    var d = this,
      a;
    if (d.rendered && c !== b) {
      d._syncIconVisibility();
      a = d.iconEl;
      if (c) {
        a.removeCls(c)
      }
      a.addCls(b);
      if (d._didIconStateChange(c, b)) {
        d.updateLayout()
      }
    }
  },
  updateRotation: function(b, a) {
    var d = this,
      c, e;
    if (d.rendered) {
      c = d.el;
      e = d._rotationClasses;
      d.removeCls(e[a]);
      d.addCls(e[b]);
      c.setHorizontal();
      if (b) {
        c.setVertical(d._rotationAngles[b])
      }
      c.setStyle({
        right: "",
        left: "",
        top: "",
        height: "",
        width: ""
      });
      d.lastBox = null;
      d.updateLayout()
    }
  },
  updateText: function(a) {
    if (this.rendered) {
      this.textEl.setHtml(a);
      this.updateLayout()
    }
  },
  updateTextAlign: function(d, b) {
    var a = this,
      c = a._textAlignClasses;
    if (a.rendered) {
      if (b) {
        a.removeCls(c[b])
      }
      a.addCls(c[d]);
      a.updateLayout()
    }
  },
  privates: {
    _getVerticalAdjustDirection: function() {
      return "left"
    },
    _didIconStateChange: function(a, c) {
      var b = Ext.isEmpty(c);
      return Ext.isEmpty(a) ? !b : b
    },
    _hasIcon: function() {
      return !!(this.getIcon() || this.getIconCls() || this.getGlyph())
    },
    _syncIconVisibility: function() {
      var e = this,
        d = e.el,
        a = e._hasIcon(),
        f = e.iconWrapEl,
        c, b;
      if (a && !f) {
        b = e.iconAlign;
        c = (b === "left" || b === "top");
        d.dom.insertAdjacentHTML(c ? "afterbegin" : "beforeend", e.getIconMarkup());
        f = e.iconWrapEl = d[c ? "first" : "last"]();
        e.iconEl = f.first()
      }
      if (f) {
        f.setDisplayed(a)
      }
    }
  }
}, 0, ["title"], ["component", "box", "title"], {
  component: true,
  box: true,
  title: true
}, ["widget.title"], 0, [Ext.panel, "Title"], 0));
(Ext.cmd.derive("Ext.panel.Tool", Ext.Component, {
  isTool: true,
  baseCls: "x-tool",
  disabledCls: "x-tool-disabled",
  toolPressedCls: "x-tool-pressed",
  toolOverCls: "x-tool-over",
  childEls: ["toolEl"],
  renderTpl: [
    '<div id="{id}-toolEl" data-ref="toolEl" class="{baseCls}-img {baseCls}-{type}{childElCls}" role="presentation"></div>'
  ],
  toolOwner: null,
  tooltipType: "qtip",
  stopEvent: true,
  ariaRole: "button",
  focusable: true,
  tabIndex: 0,
  keyHandlers: {
    SPACE: "onClick",
    ENTER: "onClick"
  },
  cacheHeight: true,
  cacheWidth: true,
  initComponent: function() {
    var a = this;
    a.type = a.type || a.id;
    Ext.applyIf(a.renderData, {
      baseCls: a.baseCls,
      type: a.type
    });
    a.tooltip = a.tooltip || a.qtip;
    Ext.Component.prototype.initComponent.call(this)
  },
  afterRender: function() {
    var a = this,
      b;
    Ext.Component.prototype.afterRender.apply(this, arguments);
    a.el.on({
      click: a.onClick,
      mousedown: a.onMouseDown,
      mouseover: a.onMouseOver,
      mouseout: a.onMouseOut,
      scope: a
    });
    b = a.tooltip;
    if (b) {
      a.setTooltip(b)
    }
  },
  tipAttrs: {
    qtip: "data-qtip"
  },
  setTooltip: function(g, d) {
    var e = this,
      b = e.tooltip,
      f = e.tooltipType,
      h = e.id,
      c = e.el,
      a;
    if (b && Ext.quickTipsActive && Ext.isObject(b)) {
      Ext.tip.QuickTipManager.unregister(h)
    }
    e.tooltip = g;
    if (d) {
      e.tooltipType = d
    }
    if (g) {
      if (Ext.quickTipsActive && Ext.isObject(g)) {
        Ext.tip.QuickTipManager.register(Ext.apply({
          target: h
        }, g))
      } else {
        if (c) {
          if (d && f && d !== f) {
            a = e.tipAttrs[f] || "title";
            c.dom.removeAttribute(a)
          }
          a = e.tipAttrs[d || f] || "title";
          c.dom.setAttribute(a, g)
        }
      }
      if (a !== "title" && e.ariaRole && e.ariaRole !== "presentation") {
        if (c) {
          c.dom.setAttribute("aria-label", g)
        } else {
          e.ariaRenderAttributes = e.ariaRenderAttributes || {};
          e.ariaRenderAttributes["aria-label"] = g
        }
      }
    }
  },
  setType: function(a) {
    var b = this,
      c = b.type;
    b.type = a;
    if (b.rendered) {
      if (c) {
        b.toolEl.removeCls(b.baseCls + "-" + c)
      }
      b.toolEl.addCls(b.baseCls + "-" + a)
    } else {
      b.renderData.type = a
    }
    return b
  },
  onDestroy: function() {
    var a = this,
      b = a.keyMap;
    a.setTooltip(null);
    delete a.toolOwner;
    Ext.Component.prototype.onDestroy.call(this)
  },
  privates: {
    onClick: function(c, b) {
      var a = this;
      if (a.disabled) {
        return false
      }
      if (c.type !== "keydown") {
        a.el.removeCls(a.toolPressedCls + " " + a.toolOverCls)
      }
      if (a.stopEvent !== false) {
        c.stopEvent()
      }
      if (a.handler) {
        Ext.callback(a.handler, a.scope, [c, b, a.ownerCt, a], 0, a)
      } else {
        if (a.callback) {
          Ext.callback(a.callback, a.scope, [a.toolOwner || a.ownerCt, a,
            c
          ], 0, a)
        }
      }
      a.fireEvent("click", a, c, a.toolOwner || a.ownerCt);
      return true
    },
    onMouseDown: function(a) {
      a.preventDefault();
      if (this.disabled) {
        return false
      }
      this.el.addCls(this.toolPressedCls)
    },
    onMouseOver: function() {
      if (this.disabled) {
        return false
      }
      this.el.addCls(this.toolOverCls)
    },
    onMouseOut: function() {
      this.el.removeCls(this.toolOverCls)
    }
  }
}, 0, ["tool"], ["component", "box", "tool"], {
  component: true,
  box: true,
  tool: true
}, ["widget.tool"], 0, [Ext.panel, "Tool"], 0));
(Ext.cmd.derive("Ext.util.KeyMap", Ext.Base, {
  alternateClassName: "Ext.KeyMap",
  eventName: "keydown",
  constructor: function(a) {
    var b = this;
    if ((arguments.length !== 1) || (typeof a === "string") || a.dom || a
      .tagName || a === document || a.isComponent) {
      b.legacyConstructor.apply(b, arguments);
      return
    }
    Ext.apply(b, a);
    b.bindings = [];
    if (!b.target.isComponent) {
      b.target = Ext.get(b.target)
    }
    if (b.binding) {
      b.addBinding(b.binding)
    } else {
      if (a.key) {
        b.addBinding(a)
      }
    }
    b.enable()
  },
  legacyConstructor: function(b, d, a) {
    var c = this;
    Ext.apply(c, {
      target: Ext.get(b),
      eventName: a || c.eventName,
      bindings: []
    });
    if (d) {
      c.addBinding(d)
    }
    c.enable()
  },
  addBinding: function(e) {
    var c = this,
      d = e.key,
      b, a;
    if (c.processing) {
      c.bindings = c.bindings.slice(0)
    }
    if (Ext.isArray(e)) {
      for (b = 0, a = e.length; b < a; b++) {
        c.addBinding(e[b])
      }
      return
    }
    c.bindings.push(Ext.apply({
      keyCode: c.processKeys(d)
    }, e))
  },
  removeBinding: function(f) {
    var e = this,
      g = e.bindings,
      a = g.length,
      b, d, c;
    if (e.processing) {
      e.bindings = g.slice(0)
    }
    c = e.processKeys(f.key);
    for (b = 0; b < a; ++b) {
      d = g[b];
      if ((d.fn || d.handler) === (f.fn || f.handler) && d.scope === f.scope) {
        if (f.alt === d.alt && f.crtl === d.crtl && f.shift === d.shift) {
          if (Ext.Array.equals(d.keyCode, c)) {
            Ext.Array.erase(e.bindings, b, 1);
            return
          }
        }
      }
    }
  },
  processKeys: function(f) {
    var g = false,
      d, e, b, a, c;
    if (f.test) {
      return f
    }
    if (Ext.isString(f)) {
      e = [];
      b = f.toUpperCase();
      for (c = 0, a = b.length; c < a; ++c) {
        e.push(b.charCodeAt(c))
      }
      f = e;
      g = true
    }
    if (!Ext.isArray(f)) {
      f = [f]
    }
    if (!g) {
      for (c = 0, a = f.length; c < a; ++c) {
        d = f[c];
        if (Ext.isString(d)) {
          f[c] = d.toUpperCase().charCodeAt(0)
        }
      }
    }
    return f
  },
  handleTargetEvent: function(e) {
    var d = this,
      f, c, b, a;
    if (d.enabled) {
      f = d.bindings;
      c = 0;
      b = f.length;
      e = d.processEvent.apply(d.processEventScope || d, arguments);
      if (e) {
        d.lastKeyEvent = e;
        if (d.ignoreInputFields && Ext.fly(e.target).isInputField()) {
          return
        }
        if (!e.getKey) {
          return e
        }
        d.processing = true;
        for (; c < b; ++c) {
          a = d.processBinding(f[c], e);
          if (a === false) {
            d.processing = false;
            return a
          }
        }
        d.processing = false
      }
    }
  },
  processEvent: Ext.identityFn,
  processBinding: function(e, a) {
    if (this.checkModifiers(e, a)) {
      var f = a.getKey(),
        h = e.fn || e.handler,
        j = e.scope || this,
        g = e.keyCode,
        b = e.defaultEventAction,
        c, d, k;
      if (g.test) {
        if (g.test(String.fromCharCode(a.getCharCode()))) {
          k = h.call(j, f, a);
          if (k !== true && b) {
            a[b]()
          }
          if (k === false) {
            return k
          }
        }
      } else {
        if (g.length) {
          for (c = 0, d = g.length; c < d; ++c) {
            if (f === g[c]) {
              k = h.call(j, f, a);
              if (k !== true && b) {
                a[b]()
              }
              if (k === false) {
                return k
              }
              break
            }
          }
        }
      }
    }
  },
  checkModifiers: function(g, e) {
    var d = ["shift", "ctrl", "alt"],
      c = 0,
      a = d.length,
      f, b;
    for (; c < a; ++c) {
      b = d[c];
      f = g[b];
      if (!(f === undefined || (f === e[b + "Key"]))) {
        return false
      }
    }
    return true
  },
  on: function(b, d, c) {
    var g, a, e, f;
    if (Ext.isObject(b) && !Ext.isArray(b)) {
      g = b.key;
      a = b.shift;
      e = b.ctrl;
      f = b.alt
    } else {
      g = b
    }
    this.addBinding({
      key: g,
      shift: a,
      ctrl: e,
      alt: f,
      fn: d,
      scope: c
    })
  },
  un: function(b, d, c) {
    var g, a, e, f;
    if (Ext.isObject(b) && !Ext.isArray(b)) {
      g = b.key;
      a = b.shift;
      e = b.ctrl;
      f = b.alt
    } else {
      g = b
    }
    this.removeBinding({
      key: g,
      shift: a,
      ctrl: e,
      alt: f,
      fn: d,
      scope: c
    })
  },
  isEnabled: function() {
    return this.enabled
  },
  enable: function() {
    var a = this;
    if (!a.enabled) {
      a.target.on(a.eventName, a.handleTargetEvent, a, {
        capture: a.capture,
        priority: a.priority
      });
      a.enabled = true
    }
  },
  disable: function() {
    var a = this;
    if (a.enabled) {
      a.target.removeListener(a.eventName, a.handleTargetEvent, a);
      a.enabled = false
    }
  },
  setDisabled: function(a) {
    if (a) {
      this.disable()
    } else {
      this.enable()
    }
  },
  destroy: function(c) {
    var a = this,
      b = a.target;
    a.bindings = [];
    a.disable();
    if (c) {
      b.destroy()
    }
    delete a.target;
    a.callParent()
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "KeyMap", Ext, "KeyMap"], 0));
(Ext.cmd.derive("Ext.util.KeyNav", Ext.Base, {
  alternateClassName: "Ext.KeyNav",
  disabled: false,
  defaultEventAction: false,
  forceKeyDown: false,
  eventName: "keypress",
  statics: {
    keyOptions: {
      left: 37,
      right: 39,
      up: 38,
      down: 40,
      space: 32,
      pageUp: 33,
      pageDown: 34,
      del: 46,
      backspace: 8,
      home: 36,
      end: 35,
      enter: 13,
      esc: 27,
      tab: 9
    }
  },
  constructor: function(a) {
    var b = this;
    if (arguments.length === 2) {
      b.legacyConstructor.apply(b, arguments);
      return
    }
    b.doConstruction(a)
  },
  legacyConstructor: function(b, a) {
    this.doConstruction(Ext.apply({
      target: b
    }, a))
  },
  doConstruction: function(a) {
    var c = this,
      b = {
        target: a.target,
        ignoreInputFields: a.ignoreInputFields,
        eventName: c.getKeyEvent("forceKeyDown" in a ? a.forceKeyDown : c
          .forceKeyDown, a.eventName),
        capture: a.capture
      },
      d;
    if (c.map) {
      c.map.destroy()
    }
    c.initConfig(a);
    if (a.processEvent) {
      b.processEvent = a.processEvent;
      b.processEventScope = a.processEventScope || c
    }
    if (a.priority) {
      b.priority = a.priority
    }
    if (a.keyMap) {
      d = c.map = a.keyMap
    } else {
      d = c.map = new Ext.util.KeyMap(b);
      c.destroyKeyMap = true
    }
    this.addBindings(a);
    d.disable();
    if (!a.disabled) {
      d.enable()
    }
  },
  addBindings: function(h) {
    var c = this,
      b, f, e = c.map,
      a = Ext.util.KeyNav.keyOptions,
      d, g = h.scope || c;
    for (b in h) {
      f = h[b];
      d = a[b];
      if (d != null) {
        b = d
      }
      if (f && (b.length === 1 || !isNaN(b = parseInt(b, 10)))) {
        if (typeof f === "function") {
          f = {
            handler: f,
            defaultEventAction: (h.defaultEventAction !== undefined) ?
              h.defaultEventAction : c.defaultEventAction
          }
        }
        e.addBinding({
          key: b,
          ctrl: f.ctrl,
          shift: f.shift,
          alt: f.alt,
          handler: Ext.Function.bind(c.handleEvent, f.scope || g, [f.handler ||
            f.fn, c
          ], true),
          defaultEventAction: (f.defaultEventAction !== undefined) ?
            f.defaultEventAction : c.defaultEventAction
        })
      }
    }
  },
  handleEvent: function(d, c, b, a) {
    a.lastKeyEvent = c;
    return b.call(this, c)
  },
  destroy: function(b) {
    var a = this;
    if (a.destroyKeyMap) {
      a.map.destroy(b)
    }
    delete a.map;
    a.callParent()
  },
  enable: function() {
    if (this.map) {
      this.map.enable();
      this.disabled = false
    }
  },
  disable: function() {
    if (this.map) {
      this.map.disable()
    }
    this.disabled = true
  },
  setDisabled: function(a) {
    this.map.setDisabled(a);
    this.disabled = a
  },
  getKeyEvent: function(b, a) {
    if (b || (Ext.supports.SpecialKeyDownRepeat && !a)) {
      return "keydown"
    } else {
      return a || this.eventName
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "KeyNav", Ext, "KeyNav"], 0));
(Ext.cmd.derive("Ext.util.FocusableContainer", Ext.Mixin, {
  mixinConfig: {
    id: "focusablecontainer",
    before: {
      onAdd: "onFocusableChildAdd",
      onRemove: "onFocusableChildRemove",
      destroy: "destroyFocusableContainer",
      onFocusEnter: "onFocusEnter"
    },
    after: {
      afterRender: "initFocusableContainer",
      onFocusLeave: "onFocusLeave",
      afterShow: "activateFocusableContainerEl"
    }
  },
  isFocusableContainer: true,
  enableFocusableContainer: true,
  activeChildTabIndex: 0,
  inactiveChildTabIndex: -1,
  privates: {
    initFocusableContainer: function(c) {
      var b, d, a;
      if (this.enableFocusableContainer) {
        c = c != null ? c : true;
        this.doInitFocusableContainer(c)
      } else {
        b = this.getFocusables();
        for (d = 0, a = b.length; d < a; d++) {
          b[d].focusableContainer = null
        }
      }
    },
    doInitFocusableContainer: function(a) {
      var c = this,
        b;
      b = c.getFocusableContainerEl();
      c.activateFocusableContainerEl(b);
      if (a) {
        c.clearFocusables()
      }
      c.focusableContainerMouseListener = c.mon(b, "mousedown", c.onFocusableContainerMousedown,
        c);
      c.focusableKeyNav = c.createFocusableContainerKeyNav(b)
    },
    createFocusableContainerKeyNav: function(a) {
      var b = this;
      return new Ext.util.KeyNav(a, {
        eventName: "keydown",
        ignoreInputFields: true,
        scope: b,
        tab: b.onFocusableContainerTabKey,
        enter: b.onFocusableContainerEnterKey,
        space: b.onFocusableContainerSpaceKey,
        up: b.onFocusableContainerUpKey,
        down: b.onFocusableContainerDownKey,
        left: b.onFocusableContainerLeftKey,
        right: b.onFocusableContainerRightKey
      })
    },
    destroyFocusableContainer: function() {
      if (this.enableFocusableContainer) {
        this.doDestroyFocusableContainer()
      }
    },
    doDestroyFocusableContainer: function() {
      var a = this;
      if (a.keyNav) {
        a.keyNav.destroy()
      }
      if (a.focusableContainerMouseListener) {
        a.focusableContainerMouseListener.destroy()
      }
      a.focusableKeyNav = a.focusableContainerMouseListener = null
    },
    getFocusables: function() {
      return this.items.items
    },
    initDefaultFocusable: function(j) {
      var f = this,
        h = f.activeChildTabIndex,
        c = false,
        e, g, b, d, a;
      e = f.getFocusables();
      d = e.length;
      if (!d) {
        return
      }
      for (b = 0; b < d; b++) {
        g = e[b];
        if (g.focusable) {
          c = true;
          a = g.getTabIndex();
          if (a != null && a >= h) {
            return g
          }
        }
      }
      if (!c) {
        return
      }
      g = f.findNextFocusableChild(null, true, e, j);
      if (g) {
        f.activateFocusable(g)
      }
      return g
    },
    clearFocusables: function() {
      var e = this,
        b = e.getFocusables(),
        a = b.length,
        d, c;
      for (c = 0; c < a; c++) {
        d = b[c];
        if (d.focusable) {
          e.deactivateFocusable(d)
        }
      }
    },
    activateFocusable: function(c, b) {
      var a = b != null ? b : this.activeChildTabIndex;
      c.setTabIndex(a)
    },
    deactivateFocusable: function(c, b) {
      var a = b != null ? b : this.inactiveChildTabIndex;
      c.setTabIndex(a)
    },
    onFocusableContainerTabKey: function() {
      return true
    },
    onFocusableContainerEnterKey: function() {
      return true
    },
    onFocusableContainerSpaceKey: function() {
      return true
    },
    onFocusableContainerUpKey: function(a) {
      return this.moveChildFocus(a, false)
    },
    onFocusableContainerLeftKey: function(a) {
      return this.moveChildFocus(a, false)
    },
    onFocusableContainerRightKey: function(a) {
      return this.moveChildFocus(a, true)
    },
    onFocusableContainerDownKey: function(a) {
      return this.moveChildFocus(a, true)
    },
    getFocusableFromEvent: function(a) {
      var b = Ext.Component.fromElement(a.getTarget());
      return b
    },
    moveChildFocus: function(b, a) {
      var c = this.getFocusableFromEvent(b);
      return this.focusChild(c, a, b)
    },
    focusChild: function(c, a) {
      var b = this.findNextFocusableChild(c, a);
      if (b) {
        b.focus()
      }
      return b
    },
    findNextFocusableChild: function(h, g, c, e) {
      var f, b, d, a;
      c = c || this.getFocusables();
      b = Ext.Array.indexOf(c, h);
      g = g === true ? 1 : g === false ? -1 : g;
      a = c.length;
      d = g > 0 ? (b < a ? b + g : 0) : (b > 0 ? b + g : a - 1);
      for (;; d += g) {
        if (b < 0 && (d >= a || d < 0)) {
          return null
        } else {
          if (d >= a) {
            d = -1;
            continue
          } else {
            if (d < 0) {
              d = a;
              continue
            } else {
              if (d === b) {
                return null
              }
            }
          }
        }
        f = c[d];
        if (!f || !f.focusable) {
          continue
        }
        if (e || (f.isFocusable && f.isFocusable())) {
          return f
        }
      }
      return null
    },
    getFocusableContainerEl: function() {
      return this.el
    },
    onFocusableChildAdd: function(a) {
      if (this.enableFocusableContainer) {
        return this.doFocusableChildAdd(a)
      }
    },
    activateFocusableContainerEl: function(a) {
      a = a || this.getFocusableContainerEl();
      a.set({
        tabIndex: this.activeChildTabIndex
      })
    },
    deactivateFocusableContainerEl: function(a) {
      a = a || this.getFocusableContainerEl();
      a.set({
        tabIndex: this.inactiveChildTabIndex
      })
    },
    doFocusableChildAdd: function(a) {
      if (a.focusable) {
        a.focusableContainer = this
      }
    },
    onFocusableChildRemove: function(a) {
      if (this.enableFocusableContainer) {
        return this.doFocusableChildRemove(a)
      }
      a.focusableContainer = null
    },
    doFocusableChildRemove: function(a) {
      if (a === this.lastFocusedChild) {
        this.lastFocusedChild = null;
        this.activateFocusableContainerEl()
      }
    },
    onFocusableContainerMousedown: function(c, b) {
      var a = Ext.Component.fromElement(b);
      this.mousedownTimestamp = a === this ? Ext.Date.now() : 0;
      if (a === this) {
        c.preventDefault()
      }
    },
    onFocusEnter: function(c) {
      var a = this,
        b = c.toComponent,
        d = a.mousedownTimestamp,
        g = 50,
        f;
      if (!a.enableFocusableContainer) {
        return null
      }
      a.mousedownTimestamp = 0;
      if (b === a) {
        if (!d || Ext.Date.now() - d > g) {
          f = a.initDefaultFocusable();
          if (f) {
            a.deactivateFocusableContainerEl();
            f.focus()
          }
        }
      } else {
        a.deactivateFocusableContainerEl()
      }
      return b
    },
    onFocusLeave: function(c) {
      var b = this,
        a = b.lastFocusedChild;
      if (!b.enableFocusableContainer) {
        return
      }
      if (!b.destroyed && !b.destroying) {
        b.clearFocusables();
        if (a) {
          b.activateFocusable(a)
        } else {
          b.activateFocusableContainerEl()
        }
      }
    },
    beforeFocusableChildBlur: Ext.privateFn,
    afterFocusableChildBlur: Ext.privateFn,
    beforeFocusableChildFocus: function(b) {
      var a = this;
      if (!a.enableFocusableContainer) {
        return
      }
      a.clearFocusables();
      a.activateFocusable(b);
      if (b.needArrowKeys) {
        a.guardFocusableChild(b)
      }
    },
    guardFocusableChild: function(d) {
      var c = this,
        a = c.activeChildTabIndex,
        b;
      b = c.findNextFocusableChild(d, -1);
      if (b) {
        b.setTabIndex(a)
      }
      b = c.findNextFocusableChild(d, 1);
      if (b) {
        b.setTabIndex(a)
      }
    },
    afterFocusableChildFocus: function(a) {
      if (!this.enableFocusableContainer) {
        return
      }
      this.lastFocusedChild = a
    },
    onFocusableChildShow: Ext.privateFn,
    onFocusableChildHide: Ext.privateFn,
    onFocusableChildEnable: Ext.privateFn,
    onFocusableChildDisable: Ext.privateFn,
    onFocusableChildMasked: Ext.privateFn,
    onFocusableChildDestroy: Ext.privateFn,
    onFocusableChildUpdate: Ext.privateFn
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util, "FocusableContainer"], 0));
(Ext.cmd.derive("Ext.panel.Header", Ext.panel.Bar, {
  isHeader: true,
  defaultType: "tool",
  indicateDrag: false,
  weight: -1,
  shrinkWrap: 3,
  iconAlign: "left",
  titleAlign: "left",
  titlePosition: 0,
  titleRotation: "default",
  autoEl: {
    role: "presentation"
  },
  beforeRenderConfig: {
    glyph: null,
    icon: null,
    iconCls: null,
    iconAlign: null,
    title: {
      $value: {
        xtype: "title",
        flex: 1
      },
      merge: function(b, a) {
        if (typeof b !== "object") {
          b = {
            text: b
          }
        }
        return Ext.merge(a ? Ext.Object.chain(a) : {}, b)
      }
    },
    titleAlign: null,
    titlePosition: null,
    titleRotation: null
  },
  headerCls: "x-header",
  initComponent: function() {
    var d = this,
      c = d.items,
      b = d.itemPosition,
      a = [d.headerCls];
    d.tools = d.tools || [];
    d.items = c = (c ? c.slice() : []);
    if (b !== undefined) {
      d._userItems = c.slice();
      d.items = c = []
    }
    d.indicateDragCls = d.headerCls + "-draggable";
    if (d.indicateDrag) {
      a.push(d.indicateDragCls)
    }
    d.addCls(a);
    d.syncNoBorderCls();
    d.enableFocusableContainer = !d.isAccordionHeader && d.tools.length >
      0;
    if (d.enableFocusableContainer) {
      d.ariaRole = "toolbar"
    }
    Ext.Array.push(c, d.tools);
    d.tools.length = 0;
    Ext.panel.Bar.prototype.initComponent.call(this);
    d.on({
      dblclick: d.onDblClick,
      click: d.onClick,
      element: "el",
      scope: d
    })
  },
  addTool: function(a) {
    var b = this;
    b.add(Ext.ComponentManager.create(a, "tool"));
    if (!b.isAccordionHeader && b.tools.length > 0 && !b.enableFocusableContainer) {
      b.enableFocusableContainer = true;
      b.ariaRole = "toolbar";
      if (b.rendered) {
        b.ariaEl.dom.setAttribute("role", "toolbar");
        b.initFocusableContainer(true)
      }
    }
  },
  afterLayout: function() {
    var b = this,
      e, a, c, d;
    if (b.vertical) {
      a = b.frameTR;
      if (a) {
        e = b.frameBR;
        c = b.frameTL;
        d = (b.getWidth() - a.getPadding("r") - ((c) ? c.getPadding("l") :
          b.el.getBorderWidth("l"))) + "px";
        e.setStyle("background-position-x", d);
        a.setStyle("background-position-x", d)
      }
    }
    Ext.panel.Bar.prototype.afterLayout.call(this)
  },
  applyTitle: function(e, c) {
    var d = this,
      a, b;
    e = e || "";
    a = typeof e === "string";
    if (a) {
      e = {
        text: e
      }
    }
    if (c) {
      Ext.suspendLayouts();
      c.setConfig(e);
      Ext.resumeLayouts(true);
      e = c
    } else {
      if (a) {
        e.xtype = "title"
      }
      e.ui = d.ui;
      b = ("rotation" in e);
      e.id = d.id + "-title";
      if (d.isAccordionHeader) {
        e.ariaRole = "tab";
        e.textElRole = null;
        e.focusable = true
      }
      e = Ext.create(e);
      if (!b && d.vertical && d.titleRotation === "default") {
        e.rotation = 1
      }
    }
    return e
  },
  applyTitlePosition: function(b) {
    var a = this.items.getCount();
    if (this._titleInItems) {
      --a
    }
    return Math.max(Math.min(b, a), 0)
  },
  beforeLayout: function() {
    Ext.panel.Bar.prototype.beforeLayout.call(this);
    this.syncBeforeAfterTitleClasses()
  },
  beforeRender: function() {
    var b = this,
      a = b.itemPosition;
    b.protoEl.unselectable();
    Ext.panel.Bar.prototype.beforeRender.call(this);
    if (a !== undefined) {
      b.insert(a, b._userItems)
    }
  },
  getTools: function() {
    return this.tools.slice()
  },
  onAdd: function(b, a) {
    var c = this.tools;
    Ext.panel.Bar.prototype.onAdd.call(this, b, a);
    if (b.isTool) {
      c.push(b);
      c[b.type] = b
    }
  },
  onAdded: function(b, c, a) {
    this.syncNoBorderCls();
    Ext.panel.Bar.prototype.onAdded.call(this, b, c, a)
  },
  onRemoved: function(b, c, a) {
    this.syncNoBorderCls();
    Ext.panel.Bar.prototype.onRemoved.call(this, b, c, a)
  },
  setDock: function(c) {
    var b = this,
      e = b.getTitle(),
      a = b.getTitleRotation(),
      d = e.getRotation();
    Ext.suspendLayouts();
    Ext.panel.Bar.prototype.setDock.call(this, c);
    if (a === "default") {
      a = (b.vertical ? 1 : 0);
      if (a !== d) {
        e.setRotation(a)
      }
      if (b.rendered) {
        b.resetItemMargins()
      }
    }
    Ext.resumeLayouts(true)
  },
  updateGlyph: function(a) {
    this.getTitle().setGlyph(a)
  },
  updateIcon: function(a) {
    this.getTitle().setIcon(a)
  },
  updateIconAlign: function(b, a) {
    this.getTitle().setIconAlign(b)
  },
  updateIconCls: function(a) {
    this.getTitle().setIconCls(a)
  },
  updateTitle: function(b, a) {
    if (!a) {
      this.insert(this.getTitlePosition(), b);
      this._titleInItems = true
    }
    this.titleCmp = b
  },
  updateTitleAlign: function(b, a) {
    this.getTitle().setTextAlign(b)
  },
  updateTitlePosition: function(a) {
    this.insert(a, this.getTitle())
  },
  updateTitleRotation: function(a) {
    if (a === "default") {
      a = (this.vertical ? 1 : 0)
    }
    this.getTitle().setRotation(a)
  },
  privates: {
    fireClickEvent: function(a, c) {
      var b = "." + Ext.panel.Tool.prototype.baseCls;
      if (!c.getTarget(b)) {
        this.fireEvent(a, this, c)
      }
    },
    getFramingInfoCls: function() {
      var c = this,
        b = Ext.panel.Bar.prototype.getFramingInfoCls.call(this),
        a = c.ownerCt;
      if (!c.expanding && a && (a.collapsed || c.isCollapsedExpander)) {
        b += "-" + a.collapsedCls
      }
      return b + "-" + c.dock
    },
    onClick: function(a) {
      this.fireClickEvent("click", a)
    },
    onDblClick: function(a) {
      this.fireClickEvent("dblclick", a)
    },
    onFocusableContainerMousedown: function(c, b) {
      var a = Ext.Component.fromElement(b);
      if (a === this) {
        c.preventDefault()
      } else {
        this.mixins.focusablecontainer.onFocusableContainerMousedown.apply(
          this, arguments)
      }
    },
    syncBeforeAfterTitleClasses: function(c) {
      var j = this,
        h = j.items,
        f = h.items,
        b = j.getTitlePosition(),
        a = f.length,
        g = h.generation,
        k = j.syncBeforeAfterGen,
        m, e, d, l;
      if (!c && (k === g)) {
        return
      }
      j.syncBeforeAfterGen = g;
      for (d = 0; d < a; ++d) {
        l = f[d];
        m = l.afterTitleCls || (l.afterTitleCls = l.baseCls +
          "-after-title");
        e = l.beforeTitleCls || (l.beforeTitleCls = l.baseCls +
          "-before-title");
        if (!j.title || d < b) {
          if (k) {
            l.removeCls(m)
          }
          l.addCls(e)
        } else {
          if (d > b) {
            if (k) {
              l.removeCls(e)
            }
            l.addCls(m)
          }
        }
      }
    },
    syncNoBorderCls: function() {
      var b = this,
        a = this.ownerCt,
        c = b.headerCls + "-noborder";
      if (a ? (a.border === false && !a.frame) : b.border === false) {
        b.addCls(c)
      } else {
        b.removeCls(c)
      }
    }
  }
}, 0, ["header"], ["component", "box", "container", "header"], {
  component: true,
  box: true,
  container: true,
  header: true
}, ["widget.header"], [
  [Ext.util.FocusableContainer.prototype.mixinId || Ext.util.FocusableContainer
    .$className, Ext.util.FocusableContainer
  ]
], [Ext.panel, "Header"], 0));
(Ext.cmd.derive("Ext.layout.container.boxOverflow.None", Ext.Base, {
  alternateClassName: "Ext.layout.boxOverflow.None",
  factoryConfig: {
    defaultType: "none"
  },
  isBoxOverflowHandler: true,
  $configPrefixed: false,
  $configStrict: false,
  constructor: function(a) {
    this.initConfig(a)
  },
  handleOverflow: Ext.emptyFn,
  clearOverflow: Ext.emptyFn,
  beginLayout: Ext.emptyFn,
  beginLayoutCycle: Ext.emptyFn,
  calculate: function(b) {
    var a = this,
      c = b.state.boxPlan,
      d;
    if (c && c.tooNarrow) {
      d = a.handleOverflow(b);
      if (d) {
        if (d.reservedSpace) {
          a.layout.publishInnerCtSize(b, d.reservedSpace)
        }
      }
    } else {
      a.clearOverflow()
    }
  },
  completeLayout: Ext.emptyFn,
  finishedLayout: function(d) {
    var c = this,
      a = c.layout.owner,
      b, e;
    if (a.hasListeners.overflowchange) {
      b = a.query(">[hidden]");
      e = b.length;
      if (e !== c.lastHiddenCount) {
        a.fireEvent("overflowchange", c.lastHiddenCount, e, b);
        c.lastHiddenCount = e
      }
    }
  },
  onRemove: Ext.emptyFn,
  getItem: function(a) {
    return this.layout.owner.getComponent(a)
  },
  getOwnerType: function(a) {
    var b;
    if (a.isToolbar) {
      b = "toolbar"
    } else {
      if (a.isTabBar) {
        b = "tab-bar"
      } else {
        if (a.isMenu) {
          b = "menu"
        } else {
          if (a.isBreadcrumb) {
            b = "breadcrumb"
          } else {
            b = a.getXType()
          }
        }
      }
    }
    return b
  },
  getPrefixConfig: Ext.emptyFn,
  getSuffixConfig: Ext.emptyFn,
  getOverflowCls: function() {
    return ""
  },
  setVertical: function() {
    var b = this,
      a = b.layout,
      c = a.innerCt;
    c.removeCls(b.getOverflowCls(a.oppositeDirection));
    c.addCls(b.getOverflowCls(a.direction))
  }
}, 1, 0, 0, 0, ["box.overflow.None", "box.overflow.none"], [
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ]
], [Ext.layout.container.boxOverflow, "None", Ext.layout.boxOverflow,
  "None"
], 0));
(Ext.cmd.derive("Ext.layout.container.boxOverflow.Scroller", Ext.layout.container
  .boxOverflow.None, {
    alternateClassName: "Ext.layout.boxOverflow.Scroller",
    animateScroll: false,
    scrollIncrement: 20,
    wheelIncrement: 10,
    scrollRepeatInterval: 60,
    scrollDuration: 400,
    scrollerCls: "x-box-scroller",
    beforeSuffix: "-before-scroller",
    afterSuffix: "-after-scroller",
    constructor: function(a) {
      var b = this;
      b.mixins.observable.constructor.call(b, a);
      b.scrollPosition = 0;
      b.scrollSize = 0
    },
    getPrefixConfig: function() {
      return {
        role: "presentation",
        id: this.layout.owner.id + this.beforeSuffix,
        cls: this.createScrollerCls("beforeX"),
        style: "display:none"
      }
    },
    getSuffixConfig: function() {
      return {
        role: "presentation",
        id: this.layout.owner.id + this.afterSuffix,
        cls: this.createScrollerCls("afterX"),
        style: "display:none"
      }
    },
    createScrollerCls: function(e) {
      var g = this,
        f = g.layout,
        b = f.owner,
        d = g.getOwnerType(b),
        a = g.scrollerCls,
        c = a + " " + a + "-" + f.names[e] + " " + a + "-" + d + " " + a +
        "-" + d + "-" + b.ui;
      if (b.plain) {
        c += " " + a + "-plain"
      }
      return c
    },
    getOverflowCls: function(a) {
      return this.scrollerCls + "-body-" + a
    },
    beginLayout: function(a) {
      a.innerCtScrollPos = this.getScrollPosition();
      Ext.layout.container.boxOverflow.None.prototype.beginLayout.apply(
        this, arguments)
    },
    finishedLayout: function(d) {
      var c = this,
        f = d.state.boxPlan,
        b = c.layout,
        e = b.names,
        g = Math.min(c.getMaxScrollPosition(), d.innerCtScrollPos),
        a;
      if (f && f.tooNarrow) {
        a = d.childItems[d.childItems.length - 1].props;
        c.scrollSize = a[e.x] + a[e.width];
        c.updateScrollButtons()
      }
      b.innerCt[e.setScrollLeft](g);
      Ext.layout.container.boxOverflow.None.prototype.finishedLayout.call(
        this, d)
    },
    handleOverflow: function(b) {
      var g = this,
        f = g.layout.names,
        h = f.getWidth,
        i = f.parallelMargins,
        c, e, d, a;
      g.showScrollers();
      d = g.getBeforeScroller();
      a = g.getAfterScroller();
      c = d[h]() + a[h]() + d.getMargin(i) + a.getMargin(i);
      e = b.targetContext.getPaddingInfo()[f.width];
      return {
        reservedSpace: Math.max(c - e, 0)
      }
    },
    getBeforeScroller: function() {
      var a = this;
      return a._beforeScroller || (a._beforeScroller = a.createScroller(a.beforeSuffix,
        "beforeRepeater", "scrollLeft"))
    },
    getAfterScroller: function() {
      var a = this;
      return a._afterScroller || (a._afterScroller = a.createScroller(a.afterSuffix,
        "afterRepeater", "scrollRight"))
    },
    createScroller: function(f, d, g) {
      var e = this,
        c = e.layout.owner,
        b = e.scrollerCls,
        a;
      a = c.el.getById(c.id + f);
      a.addClsOnOver(b + "-hover");
      a.addClsOnClick(b + "-pressed");
      a.setVisibilityMode(Ext.Element.DISPLAY);
      e[d] = new Ext.util.ClickRepeater(a, {
        interval: e.scrollRepeatInterval,
        handler: g,
        scope: e
      });
      return a
    },
    createWheelListener: function() {
      var a = this;
      a.wheelListener = a.layout.innerCt.on("mousewheel", a.onMouseWheel, a, {
        destroyable: true
      })
    },
    onMouseWheel: function(a) {
      a.stopEvent();
      this.scrollBy(this.getWheelDelta(a) * this.wheelIncrement * -1, false)
    },
    getWheelDelta: function(a) {
      return a.getWheelDelta()
    },
    clearOverflow: function() {
      this.hideScrollers()
    },
    showScrollers: function() {
      var a = this;
      if (!a.wheelListener) {
        a.createWheelListener()
      }
      a.getBeforeScroller().show();
      a.getAfterScroller().show();
      a.layout.owner.addClsWithUI(a.layout.direction === "vertical" ?
        "vertical-scroller" : "scroller")
    },
    hideScrollers: function() {
      var b = this,
        c = b.getBeforeScroller(),
        a = b.getAfterScroller();
      if (c) {
        c.hide();
        a.hide();
        b.layout.owner.removeClsWithUI(b.layout.direction === "vertical" ?
          "vertical-scroller" : "scroller")
      }
    },
    destroy: function() {
      Ext.destroyMembers(this, "beforeRepeater", "afterRepeater",
        "_beforeScroller", "_afterScroller", "wheelListener");
      this.callParent()
    },
    scrollBy: function(b, a) {
      this.scrollTo(this.getScrollPosition() + b, a)
    },
    getScrollAnim: function() {
      return {
        duration: this.scrollDuration,
        callback: this.updateScrollButtons,
        scope: this
      }
    },
    updateScrollButtons: function() {
      var b = this,
        d = b.getBeforeScroller(),
        a = b.getAfterScroller(),
        c;
      if (!d || !a) {
        return
      }
      c = b.scrollerCls + "-disabled";
      d[b.atExtremeBefore() ? "addCls" : "removeCls"](c);
      a[b.atExtremeAfter() ? "addCls" : "removeCls"](c);
      b.scrolling = false
    },
    scrollLeft: function() {
      this.scrollBy(-this.scrollIncrement, false)
    },
    scrollRight: function() {
      this.scrollBy(this.scrollIncrement, false)
    },
    getScrollPosition: function() {
      var c = this,
        b = c.layout,
        a;
      if (isNaN(c.scrollPosition)) {
        a = b.innerCt[b.names.getScrollLeft]()
      } else {
        a = c.scrollPosition
      }
      return a
    },
    getMaxScrollPosition: function() {
      var b = this,
        a = b.layout,
        c = b.scrollSize - a.innerCt[a.names.getWidth]();
      return (c < 0) ? 0 : c
    },
    atExtremeBefore: function() {
      return !this.getScrollPosition()
    },
    atExtremeAfter: function() {
      return this.getScrollPosition() >= this.getMaxScrollPosition()
    },
    setVertical: function() {
      var c = this,
        d = c.getBeforeScroller(),
        b = c.getAfterScroller(),
        e = c.layout.names,
        a = c.scrollerCls;
      d.removeCls(a + "-" + e.beforeY);
      b.removeCls(a + "-" + e.afterY);
      d.addCls(a + "-" + e.beforeX);
      b.addCls(a + "-" + e.afterX);
      Ext.layout.container.boxOverflow.None.prototype.setVertical.call(this)
    },
    scrollTo: function(a, b) {
      var f = this,
        e = f.layout,
        g = e.names,
        d = f.getScrollPosition(),
        c = Ext.Number.constrain(a, 0, f.getMaxScrollPosition());
      if (c !== d && !f.scrolling) {
        f.scrollPosition = NaN;
        if (b === undefined) {
          b = f.animateScroll
        }
        e.innerCt[g.scrollTo](g.beforeScrollX, c, b ? f.getScrollAnim() :
          false);
        if (b) {
          f.scrolling = true
        } else {
          f.updateScrollButtons()
        }
        f.fireEvent("scroll", f, c, b ? f.getScrollAnim() : false)
      }
    },
    scrollToItem: function(j, c) {
      var i = this,
        f = i.layout,
        d = f.owner,
        h = f.names,
        b = f.innerCt,
        a, e, g;
      j = i.getItem(j);
      if (j !== undefined) {
        if (j === d.items.first()) {
          g = 0
        } else {
          if (j === d.items.last()) {
            g = i.getMaxScrollPosition()
          } else {
            a = i.getItemVisibility(j);
            if (!a.fullyVisible) {
              e = j.getBox(false, true);
              g = e[h.x];
              if (a.hiddenEnd) {
                g -= (b[h.getWidth]() - e[h.width])
              }
            }
          }
        }
        if (g !== undefined) {
          i.scrollTo(g, c)
        }
      }
    },
    getItemVisibility: function(i) {
      var g = this,
        b = g.getItem(i).getBox(true, true),
        c = g.layout,
        f = c.names,
        e = b[f.x],
        d = e + b[f.width],
        a = g.getScrollPosition(),
        h = a + c.innerCt[f.getWidth]();
      return {
        hiddenStart: e < a,
        hiddenEnd: d > h,
        fullyVisible: e >= a && d <= h
      }
    }
  }, 1, 0, 0, 0, ["box.overflow.Scroller", "box.overflow.scroller"], [
    ["observable", Ext.mixin.Observable]
  ], [Ext.layout.container.boxOverflow, "Scroller", Ext.layout.boxOverflow,
    "Scroller"
  ], 0));
(Ext.cmd.derive("Ext.dd.DragDropManager", Ext.Base, {
  singleton: true,
  alternateClassName: ["Ext.dd.DragDropMgr", "Ext.dd.DDM"],
  ids: {},
  handleIds: {},
  dragCurrent: null,
  dragOvers: {},
  deltaX: 0,
  deltaY: 0,
  preventDefault: true,
  stopPropagation: true,
  initialized: false,
  locked: false,
  init: function() {
    this.initialized = true
  },
  POINT: 0,
  INTERSECT: 1,
  mode: 0,
  notifyOccluded: false,
  dragCls: "x-dd-drag-current",
  _execOnAll: function(c, b) {
    var e = this.ids,
      d, a, g, f;
    for (d in e) {
      if (e.hasOwnProperty(d)) {
        f = e[d];
        for (a in f) {
          if (f.hasOwnProperty(a)) {
            g = f[a];
            if (!this.isTypeOfDD(g)) {
              continue
            }
            g[c].apply(g, b)
          }
        }
      }
    }
  },
  addListeners: function() {
    var a = this;
    a.init();
    Ext.getDoc().on({
      mouseup: a.handleMouseUp,
      mousemove: {
        fn: a.handleMouseMove,
        capture: false
      },
      dragstart: a.preventDrag,
      drag: a.preventDrag,
      dragend: a.preventDrag,
      capture: true,
      scope: a
    });
    Ext.getWin().on({
      unload: a._onUnload,
      resize: a._onResize,
      scope: a
    })
  },
  preventDrag: function(a) {
    if (this.isMouseDown) {
      a.stopPropagation()
    }
  },
  _onResize: function(a) {
    this._execOnAll("resetConstraints", [])
  },
  lock: function() {
    this.locked = true
  },
  unlock: function() {
    this.locked = false
  },
  isLocked: function() {
    return this.locked
  },
  locationCache: {},
  useCache: true,
  clickPixelThresh: 8,
  dragThreshMet: false,
  clickTimeout: null,
  startX: 0,
  startY: 0,
  regDragDrop: function(b, a) {
    if (!this.initialized) {
      this.init()
    }
    if (!this.ids[a]) {
      this.ids[a] = {}
    }
    this.ids[a][b.id] = b
  },
  removeDDFromGroup: function(c, a) {
    if (!this.ids[a]) {
      this.ids[a] = {}
    }
    var b = this.ids[a];
    if (b && b[c.id]) {
      delete b[c.id]
    }
  },
  _remove: function(f, b) {
    var e = this,
      c = e.ids,
      a = f.groups,
      d;
    if (e.clearingAll) {
      return
    }
    if (e.dragCurrent === f) {
      e.dragCurrent = null
    }
    for (d in a) {
      if (a.hasOwnProperty(d)) {
        if (b) {
          delete c[d]
        } else {
          if (c[d]) {
            delete c[d][f.id]
          }
        }
      }
    }
    delete e.handleIds[f.id];
    delete e.locationCache[f.id]
  },
  regHandle: function(b, a) {
    if (!this.handleIds[b]) {
      this.handleIds[b] = {}
    }
    this.handleIds[b][a] = a
  },
  isDragDrop: function(a) {
    return (this.getDDById(a)) ? true : false
  },
  getRelated: function(f, b) {
    var e = [],
      d, c, a;
    for (d in f.groups) {
      for (c in this.ids[d]) {
        a = this.ids[d][c];
        if (!this.isTypeOfDD(a)) {
          continue
        }
        if (!b || a.isTarget) {
          e[e.length] = a
        }
      }
    }
    return e
  },
  isLegalTarget: function(e, d) {
    var b = this.getRelated(e, true),
      c, a;
    for (c = 0, a = b.length; c < a; ++c) {
      if (b[c].id === d.id) {
        return true
      }
    }
    return false
  },
  isTypeOfDD: function(a) {
    return (a && a.__ygDragDrop)
  },
  isHandle: function(b, a) {
    return (this.handleIds[b] && this.handleIds[b][a])
  },
  getDDById: function(d, c) {
    var b, a;
    for (b in this.ids) {
      a = this.ids[b][d];
      if (a instanceof Ext.dd.DDTarget || c) {
        return a
      }
    }
    return null
  },
  handleMouseDown: function(f, d) {
    var b = this,
      c, a;
    b.isMouseDown = true;
    if (Ext.quickTipsActive) {
      Ext.tip.QuickTipManager.ddDisable()
    }
    b.currentPoint = f.getPoint();
    if (b.dragCurrent) {
      b.handleMouseUp(f)
    }
    b.mousedownEvent = f;
    b.currentTarget = f.getTarget();
    b.dragCurrent = d;
    a = d.getEl();
    Ext.fly(a).setCapture();
    c = f.getXY();
    b.startX = c[0];
    b.startY = c[1];
    b.offsetX = b.offsetY = 0;
    b.deltaX = b.startX - a.offsetLeft;
    b.deltaY = b.startY - a.offsetTop;
    b.dragThreshMet = false
  },
  startDrag: function(b, e) {
    var c = this,
      d = c.dragCurrent,
      a;
    clearTimeout(c.clickTimeout);
    if (d) {
      d.b4StartDrag(b, e);
      d.startDrag(b, e);
      a = d.getDragEl();
      if (a) {
        Ext.fly(a).addCls(c.dragCls)
      }
    }
    c.dragThreshMet = true
  },
  handleMouseUp: function(b) {
    var a = this;
    a.isMouseDown = false;
    if (Ext.quickTipsActive) {
      Ext.tip.QuickTipManager.ddEnable()
    }
    if (!a.dragCurrent) {
      return
    }
    if (Ext.isIE && document.releaseCapture) {
      document.releaseCapture()
    }
    clearTimeout(a.clickTimeout);
    if (a.dragThreshMet) {
      a.fireEvents(b, true)
    }
    a.stopDrag(b);
    a.stopEvent(b);
    a.mousedownEvent = a.currentTarget = null
  },
  stopEvent: function(a) {
    if (this.stopPropagation) {
      a.stopPropagation()
    }
    if (this.preventDefault) {
      a.preventDefault()
    }
  },
  stopDrag: function(d) {
    var b = this,
      c = b.dragCurrent,
      a;
    if (c) {
      if (b.dragThreshMet) {
        a = c.getDragEl();
        if (a) {
          Ext.fly(a).removeCls(b.dragCls)
        }
        c.b4EndDrag(d);
        c.endDrag(d)
      }
      b.dragCurrent.onMouseUp(d)
    }
    b.dragCurrent = null;
    b.dragOvers = {}
  },
  handleMouseMove: function(i) {
    var g = this,
      h = g.dragCurrent,
      a = g.currentPoint = i.getPoint(),
      d = a.x,
      b = a.y,
      f, c;
    g.offsetX = d - g.startX;
    g.offsetY = b - g.startY;
    if (!h) {
      return true
    }
    if (!g.dragThreshMet) {
      f = Math.abs(g.offsetX);
      c = Math.abs(g.offsetY);
      if (f > g.clickPixelThresh || c > g.clickPixelThresh) {
        g.startDrag(g.startX, g.startY)
      }
    }
    if (g.dragThreshMet) {
      h.b4Drag(i);
      h.onDrag(i);
      if (!h.moveOnly) {
        g.fireEvents(i, false)
      }
    }
    g.stopEvent(i);
    return true
  },
  fireEvents: function(w, m) {
    var y = this,
      n = Ext.supports.Touch,
      g = y.dragCurrent,
      u = y.currentPoint,
      q = u.x,
      p = u.y,
      o = [],
      h = [],
      k = [],
      b = [],
      x = [],
      v = [],
      a = n ? document.documentElement.clientWidth / window.innerWidth :
      1,
      d, f, l, c, s, t, r, j;
    if (!g || g.isLocked()) {
      return
    }
    j = !(g.deltaX < 0 || g.deltaY < 0);
    if (n || (!y.notifyOccluded && (!Ext.supports.CSSPointerEvents || Ext
        .isIE10m || Ext.isOpera) && j)) {
      d = g.getDragEl();
      if (j) {
        d.style.visibility = "hidden"
      }
      w.target = document.elementFromPoint(q / a, p / a);
      if (j) {
        d.style.visibility = "visible"
      }
    }
    for (s in y.dragOvers) {
      f = y.dragOvers[s];
      delete y.dragOvers[s];
      if (!y.isTypeOfDD(f) || f.destroyed) {
        continue
      }
      if (y.notifyOccluded) {
        if (!this.isOverTarget(u, f, y.mode)) {
          k.push(f)
        }
      } else {
        if (!w.within(f.getEl())) {
          k.push(f)
        }
      }
      h[s] = true
    }
    for (r in g.groups) {
      if ("string" !== typeof r) {
        continue
      }
      for (s in y.ids[r]) {
        f = y.ids[r][s];
        if (y.isTypeOfDD(f) && (l = f.getEl()) && (f.isTarget) && (!f.isLocked()) &&
          (Ext.fly(l).isVisible(true)) && ((f !== g) || (g.ignoreSelf ===
            false))) {
          if (y.notifyOccluded) {
            if ((f.zIndex = y.getZIndex(l)) !== -1) {
              c = true
            }
            o.push(f)
          } else {
            if (w.within(f.getEl())) {
              o.push(f);
              break
            }
          }
        }
      }
    }
    if (c) {
      Ext.Array.sort(o, y.byZIndex)
    }
    for (s = 0, t = o.length; s < t; s++) {
      f = o[s];
      if (y.isOverTarget(u, f, y.mode)) {
        if (m) {
          x.push(f)
        } else {
          if (!h[f.id]) {
            v.push(f)
          } else {
            b.push(f)
          }
          y.dragOvers[f.id] = f
        }
        if (!y.notifyOccluded) {
          break
        }
      }
    }
    if (y.mode) {
      if (k.length) {
        g.b4DragOut(w, k);
        g.onDragOut(w, k)
      }
      if (v.length) {
        g.onDragEnter(w, v)
      }
      if (b.length) {
        g.b4DragOver(w, b);
        g.onDragOver(w, b)
      }
      if (x.length) {
        g.b4DragDrop(w, x);
        g.onDragDrop(w, x)
      }
    } else {
      for (s = 0, t = k.length; s < t; ++s) {
        g.b4DragOut(w, k[s].id);
        g.onDragOut(w, k[s].id)
      }
      for (s = 0, t = v.length; s < t; ++s) {
        g.onDragEnter(w, v[s].id)
      }
      for (s = 0, t = b.length; s < t; ++s) {
        g.b4DragOver(w, b[s].id);
        g.onDragOver(w, b[s].id)
      }
      for (s = 0, t = x.length; s < t; ++s) {
        g.b4DragDrop(w, x[s].id);
        g.onDragDrop(w, x[s].id)
      }
    }
    if (m && !x.length) {
      g.onInvalidDrop(w)
    }
  },
  getZIndex: function(b) {
    var a = document.body,
      c, d = -1;
    b = Ext.getDom(b);
    while (b !== a) {
      if (!isNaN(c = Number(Ext.fly(b).getStyle("zIndex")))) {
        d = c
      }
      b = b.parentNode
    }
    return d
  },
  byZIndex: function(b, a) {
    return b.zIndex < a.zIndex
  },
  getBestMatch: function(c) {
    var e = null,
      b = c.length,
      d, a;
    if (b === 1) {
      e = c[0]
    } else {
      for (d = 0; d < b; ++d) {
        a = c[d];
        if (a.cursorIsOver) {
          e = a;
          break
        } else {
          if (!e || e.overlap.getArea() < a.overlap.getArea()) {
            e = a
          }
        }
      }
    }
    return e
  },
  refreshCache: function(b) {
    var a, c, d, e;
    for (a in b) {
      if ("string" !== typeof a) {
        continue
      }
      for (c in this.ids[a]) {
        d = this.ids[a][c];
        if (this.isTypeOfDD(d)) {
          e = this.getLocation(d);
          if (e) {
            this.locationCache[d.id] = e
          } else {
            delete this.locationCache[d.id]
          }
        }
      }
    }
  },
  verifyEl: function(b) {
    if (b) {
      var a;
      if (Ext.isIE) {
        try {
          a = b.offsetParent
        } catch (c) {}
      } else {
        a = b.offsetParent
      }
      if (a) {
        return true
      }
    }
    return false
  },
  getLocation: function(h) {
    if (!this.isTypeOfDD(h)) {
      return null
    }
    if (h.getRegion) {
      return h.getRegion()
    }
    var f = h.getEl(),
      k, d, c, n, m, o, a, j, g;
    try {
      k = Ext.fly(f).getXY()
    } catch (i) {}
    if (!k) {
      return null
    }
    d = k[0];
    c = d + f.offsetWidth;
    n = k[1];
    m = n + f.offsetHeight;
    o = n - h.padding[0];
    a = c + h.padding[1];
    j = m + h.padding[2];
    g = d - h.padding[3];
    return new Ext.util.Region(o, a, j, g)
  },
  isOverTarget: function(i, a, c) {
    var e = this.locationCache[a.id],
      h, f, b, d, g;
    if (!e || !this.useCache) {
      e = this.getLocation(a);
      this.locationCache[a.id] = e
    }
    if (!e) {
      return false
    }
    a.cursorIsOver = e.contains(i);
    h = this.dragCurrent;
    if (!h || !h.getTargetCoord || (!c && !h.constrainX && !h.constrainY)) {
      return a.cursorIsOver
    }
    a.overlap = null;
    f = h.getTargetCoord(i.x, i.y);
    b = h.getDragEl();
    d = new Ext.util.Region(f.y, f.x + b.offsetWidth, f.y + b.offsetHeight,
      f.x);
    g = d.intersect(e);
    if (g) {
      a.overlap = g;
      return (c) ? true : a.cursorIsOver
    } else {
      return false
    }
  },
  _onUnload: function(b, a) {
    Ext.dd.DragDropManager.unregAll()
  },
  unregAll: function() {
    var c = this,
      a = c.elementCache,
      b;
    if (c.dragCurrent) {
      c.stopDrag();
      c.dragCurrent = null
    }
    c.clearingAll = true;
    c._execOnAll("unreg", []);
    delete c.clearingAll;
    for (b in a) {
      delete a[b]
    }
    c.elementCache = {};
    c.ids = {};
    c.handleIds = {}
  },
  elementCache: {},
  getElWrapper: function(b) {
    var a = this.elementCache[b];
    if (!a || !a.el) {
      a = this.elementCache[b] = new this.ElementWrapper(Ext.getDom(b))
    }
    return a
  },
  getElement: function(a) {
    return Ext.getDom(a)
  },
  getCss: function(b) {
    var a = Ext.getDom(b);
    return (a) ? a.style : null
  },
  ElementWrapper: function(a) {
    this.el = a || null;
    this.id = this.el && a.id;
    this.css = this.el && a.style
  },
  getPosX: function(a) {
    return Ext.fly(a).getX()
  },
  getPosY: function(a) {
    return Ext.fly(a).getY()
  },
  swapNode: function(c, a) {
    if (c.swapNode) {
      c.swapNode(a)
    } else {
      var d = a.parentNode,
        b = a.nextSibling;
      if (b === c) {
        d.insertBefore(c, a)
      } else {
        if (a === c.nextSibling) {
          d.insertBefore(a, c)
        } else {
          c.parentNode.replaceChild(a, c);
          d.insertBefore(c, b)
        }
      }
    }
  },
  getScroll: function() {
    var d = window.document,
      e = d.documentElement,
      a = d.body,
      c = 0,
      b = 0;
    if (e && (e.scrollTop || e.scrollLeft)) {
      c = e.scrollTop;
      b = e.scrollLeft
    } else {
      if (a) {
        c = a.scrollTop;
        b = a.scrollLeft
      }
    }
    return {
      top: c,
      left: b
    }
  },
  getStyle: function(b, a) {
    return Ext.fly(b).getStyle(a)
  },
  getScrollTop: function() {
    return this.getScroll().top
  },
  getScrollLeft: function() {
    return this.getScroll().left
  },
  moveToEl: function(a, c) {
    var b = Ext.fly(c).getXY();
    Ext.fly(a).setXY(b)
  },
  numericSort: function(d, c) {
    return (d - c)
  },
  handleWasClicked: function(a, c) {
    if (this.isHandle(c, a.id)) {
      return true
    } else {
      var b = a.parentNode;
      while (b) {
        if (this.isHandle(c, b.id)) {
          return true
        } else {
          b = b.parentNode
        }
      }
    }
    return false
  }
}, 0, 0, 0, 0, 0, 0, [Ext.dd, "DragDropManager", Ext.dd, "DragDropMgr", Ext
  .dd, "DDM"
], function(a) {
  Ext.onInternalReady(function() {
    a.addListeners()
  })
}));
(Ext.cmd.derive("Ext.resizer.Splitter", Ext.Component, {
  childEls: ["collapseEl"],
  renderTpl: ['<tpl if="collapsible===true">',
    '<div id="{id}-collapseEl" data-ref="collapseEl" role="presentation" class="',
    "x-", "collapse-el ", "x-",
    'layout-split-{collapseDir}{childElCls}">', "</div>", "</tpl>"
  ],
  isSplitter: true,
  baseCls: "x-splitter",
  collapsedClsInternal: "x-splitter-collapsed",
  canResize: true,
  collapsible: null,
  collapseOnDblClick: true,
  defaultSplitMin: 40,
  defaultSplitMax: 1000,
  collapseTarget: "next",
  horizontal: false,
  vertical: false,
  size: 5,
  tracker: null,
  ariaRole: "separator",
  focusable: true,
  tabIndex: 0,
  getTrackerConfig: function() {
    return Ext.apply({
      xclass: "Ext.resizer.SplitterTracker",
      el: this.el,
      splitter: this
    }, this.tracker)
  },
  beforeRender: function() {
    var c = this,
      d = c.getCollapseTarget(),
      b = c.collapsible,
      a;
    Ext.Component.prototype.beforeRender.call(this);
    if (d.collapsed) {
      c.addCls(c.collapsedClsInternal)
    }
    if (!c.canResize) {
      c.addCls(c.baseCls + "-noresize")
    }
    Ext.applyIf(c.renderData, {
      collapseDir: c.getCollapseDirection(),
      collapsible: (b !== null) ? b : d.collapsible
    });
    c.ariaRenderAttributes = c.ariaRenderAttributes || {};
    c.ariaRenderAttributes["aria-orientation"] = c.orientation;
    c.protoEl.unselectable()
  },
  onRender: function() {
    var b = this,
      a;
    Ext.Component.prototype.onRender.apply(this, arguments);
    if (b.performCollapse !== false) {
      if (b.renderData.collapsible) {
        b.mon(b.collapseEl, "click", b.toggleTargetCmp, b)
      }
      if (b.collapseOnDblClick) {
        b.mon(b.el, "dblclick", b.toggleTargetCmp, b)
      }
    }
    b.getCollapseTarget().on({
      collapse: b.onTargetCollapse,
      expand: b.onTargetExpand,
      beforeexpand: b.onBeforeTargetExpand,
      beforecollapse: b.onBeforeTargetCollapse,
      scope: b
    });
    if (b.canResize) {
      b.tracker = Ext.create(b.getTrackerConfig());
      b.relayEvents(b.tracker, ["beforedragstart", "dragstart", "dragend"])
    }
    a = b.collapseEl;
    if (a) {
      a.lastCollapseDirCls = b.collapseDirProps[b.collapseDirection].cls
    }
  },
  getCollapseDirection: function() {
    var f = this,
      c = f.collapseDirection,
      e, a, b, d;
    if (!c) {
      e = f.collapseTarget;
      if (e.isComponent) {
        c = e.collapseDirection
      }
      if (!c) {
        d = f.ownerCt.layout.type;
        if (e.isComponent) {
          b = f.ownerCt.items;
          a = Number(b.indexOf(e) === b.indexOf(f) - 1) << 1 | Number(d ===
            "hbox")
        } else {
          a = Number(f.collapseTarget === "prev") << 1 | Number(d ===
            "hbox")
        }
        c = ["bottom", "right", "top", "left"][a]
      }
      f.collapseDirection = c
    }
    f.setOrientation((c === "top" || c === "bottom") ? "horizontal" :
      "vertical");
    return c
  },
  getCollapseTarget: function() {
    var a = this;
    return a.collapseTarget.isComponent ? a.collapseTarget : a.collapseTarget ===
      "prev" ? a.previousSibling() : a.nextSibling()
  },
  setCollapseEl: function(b) {
    var a = this.collapseEl;
    if (a) {
      a.setDisplayed(b)
    }
  },
  onBeforeTargetExpand: function(a) {
    this.setCollapseEl("none")
  },
  onBeforeTargetCollapse: function() {
    this.setCollapseEl("none")
  },
  onTargetCollapse: function(b) {
    var a = this;
    if (b === a.getCollapseTarget() && b[a.orientation === "vertical" ?
        "collapsedHorizontal" : "collapsedVertical"]()) {
      a.el.addCls(a.collapsedClsInternal + " " + (a.collapsedCls || ""))
    }
    a.setCollapseEl("")
  },
  onTargetExpand: function(b) {
    var a = this;
    a.el.removeCls(a.collapsedClsInternal + " " + (a.collapsedCls || ""));
    a.setCollapseEl("")
  },
  collapseDirProps: {
    top: {
      cls: "x-layout-split-top"
    },
    right: {
      cls: "x-layout-split-right"
    },
    bottom: {
      cls: "x-layout-split-bottom"
    },
    left: {
      cls: "x-layout-split-left"
    }
  },
  orientationProps: {
    horizontal: {
      opposite: "vertical",
      fixedAxis: "height",
      stretchedAxis: "width"
    },
    vertical: {
      opposite: "horizontal",
      fixedAxis: "width",
      stretchedAxis: "height"
    }
  },
  applyCollapseDirection: function() {
    var c = this,
      b = c.collapseEl,
      d = c.collapseDirProps[c.collapseDirection],
      a;
    if (b) {
      a = b.lastCollapseDirCls;
      if (a) {
        b.removeCls(a)
      }
      b.addCls(b.lastCollapseDirCls = d.cls)
    }
  },
  applyOrientation: function() {
    var e = this,
      c = e.orientation,
      d = e.orientationProps[c],
      f = e.size,
      b = d.fixedAxis,
      g = d.stretchedAxis,
      a = e.baseCls + "-";
    e[c] = true;
    e[d.opposite] = false;
    if (!e.hasOwnProperty(b) || e[b] === "100%") {
      e[b] = f
    }
    if (!e.hasOwnProperty(g) || e[g] === f) {
      e[g] = "100%"
    }
    e.removeCls(a + d.opposite);
    e.addCls(a + c)
  },
  setOrientation: function(a) {
    var b = this;
    if (b.orientation !== a) {
      b.orientation = a;
      b.applyOrientation()
    }
  },
  updateOrientation: function() {
    delete this.collapseDirection;
    this.getCollapseDirection();
    this.applyCollapseDirection()
  },
  toggleTargetCmp: function(d, b) {
    var c = this.getCollapseTarget(),
      f = c.placeholder,
      a;
    if (Ext.isFunction(c.expand) && Ext.isFunction(c.collapse)) {
      if (f && !f.hidden) {
        a = true
      } else {
        a = !c.hidden
      }
      if (a) {
        if (c.collapsed) {
          c.expand()
        } else {
          if (c.collapseDirection) {
            c.collapse()
          } else {
            c.collapse(this.renderData.collapseDir)
          }
        }
      }
    }
  },
  setSize: function() {
    var a = this;
    Ext.Component.prototype.setSize.apply(this, arguments);
    if (Ext.isIE && a.el) {
      a.el.repaint()
    }
  },
  beforeDestroy: function() {
    Ext.destroy(this.tracker);
    Ext.Component.prototype.beforeDestroy.call(this)
  }
}, 0, ["splitter"], ["component", "box", "splitter"], {
  component: true,
  box: true,
  splitter: true
}, ["widget.splitter"], 0, [Ext.resizer, "Splitter"], 0));
Ext.define("Ext.theme.neptune.resizer.Splitter", {
  override: "Ext.resizer.Splitter",
  size: 8
});
Ext.define("Ext.theme.touchsizing.resizer.Splitter", {
  override: "Ext.resizer.Splitter",
  size: 16
});
(Ext.cmd.derive("Ext.layout.container.Box", Ext.layout.container.Container, {
  alternateClassName: "Ext.layout.BoxLayout",
  type: "box",
  config: {
    align: "begin",
    constrainAlign: false,
    enableSplitters: true,
    overflowHandler: {
      $value: null,
      merge: function(b, a) {
        if (typeof b === "string") {
          b = {
            type: b
          }
        }
        return Ext.merge(a ? Ext.Object.chain(a) : {}, b)
      }
    },
    padding: 0,
    pack: "start",
    stretchMaxPartner: undefined,
    vertical: false,
    alignRoundingMethod: "round"
  },
  itemCls: "x-box-item",
  targetCls: "x-box-layout-ct",
  targetElCls: "x-box-target",
  innerCls: "x-box-inner",
  manageMargins: true,
  createsInnerCt: true,
  childEls: ["innerCt", "targetEl"],
  renderTpl: [
    '{%var oc,l=values.$comp.layout,oh=l.overflowHandler;if (oh && oh.getPrefixConfig!==Ext.emptyFn) {if(oc=oh.getPrefixConfig())dh.generateMarkup(oc, out)}%}<div id="{ownerId}-innerCt" data-ref="innerCt" role="presentation" class="{[l.innerCls]}{[oh ? (" " + oh.getOverflowCls(l.direction)) : ""]}"><div id="{ownerId}-targetEl" data-ref="targetEl" class="{targetElCls}" role="presentation">{%this.renderBody(out, values)%}</div></div>{%if (oh && oh.getSuffixConfig!==Ext.emptyFn) {if(oc=oh.getSuffixConfig())dh.generateMarkup(oc, out)}%}', {
      disableFormats: true,
      definitions: "var dh=Ext.DomHelper;"
    }
  ],
  constructor: function(a) {
    var c = this,
      b;
    Ext.layout.container.Container.prototype.constructor.apply(this,
      arguments);
    c.setVertical(c.vertical);
    c.flexSortFn = c.flexSort.bind(c);
    b = typeof c.padding;
    if (b === "string" || b === "number") {
      c.padding = Ext.util.Format.parseBox(c.padding);
      c.padding.height = c.padding.top + c.padding.bottom;
      c.padding.width = c.padding.left + c.padding.right
    }
  },
  _beginRe: /^(?:begin|left|top)$/,
  _centerRe: /^(?:center|middle)$/,
  _endRe: /^(?:end|right|bottom)$/,
  _percentageRe: /^\s*(\d+(?:\.\d*)?)\s*[%]\s*$/,
  getItemSizePolicy: function(p, q) {
    var k = this,
      i = k.sizePolicy,
      g = k.align,
      f = p.flex,
      n = g,
      j = k.names,
      h = j.height,
      m = j.width,
      b = p[m],
      o = p[h],
      d = k._percentageRe,
      c = d.test(b),
      e = (g === "stretch"),
      a = (g === "stretchmax"),
      l = k.constrainAlign;
    if (!q && (e || f || c || (l && !a))) {
      q = k.owner.getSizeModel()
    }
    if (e) {
      if (!d.test(o) && q[h].shrinkWrap) {
        n = "stretchmax"
      }
    } else {
      if (!a) {
        if (d.test(o)) {
          n = "stretch"
        } else {
          if (l && !q[h].shrinkWrap) {
            n = "stretchmax"
          } else {
            n = ""
          }
        }
      }
    }
    if (f || c) {
      if (!q[m].shrinkWrap) {
        i = i.flex
      }
    }
    return i[n]
  },
  flexSort: function(n, m) {
    var k = this.names.maxWidth,
      e = this.names.minWidth,
      l = Infinity,
      j = n.target,
      q = m.target,
      h = j.flex,
      g = q.flex,
      r = 0,
      c, o, i, d, p, f;
    i = j[k] || l;
    d = q[k] || l;
    c = j[e] || 0;
    o = q[e] || 0;
    p = isFinite(c) || isFinite(o);
    f = isFinite(i) || isFinite(d);
    if (p || f) {
      if (f) {
        r = i - d
      }
      if (r === 0 && p) {
        r = o - c
      }
      if (r === 0) {
        if (f) {
          r = g - h
        } else {
          r = h - g
        }
      }
    }
    return r
  },
  isItemBoxParent: function(a) {
    return true
  },
  isItemShrinkWrap: function(a) {
    return true
  },
  roundFlex: function(a) {
    return Math.floor(a)
  },
  beginCollapse: function(b) {
    var a = this;
    if (a.direction === "vertical" && b.collapsedVertical()) {
      b.collapseMemento.capture(["flex"]);
      delete b.flex
    } else {
      if (a.direction === "horizontal" && b.collapsedHorizontal()) {
        b.collapseMemento.capture(["flex"]);
        delete b.flex
      }
    }
  },
  beginExpand: function(a) {
    a.collapseMemento.restore(["flex"])
  },
  beginLayout: function(e) {
    var h = this,
      b = h.owner,
      d = b.stretchMaxPartner,
      a = h.innerCt.dom.style,
      g = h.names,
      f = h.overflowHandler,
      i = b.getScrollable(),
      c;
    e.boxNames = g;
    if (f) {
      f.beginLayout(e)
    }
    if (typeof d === "string") {
      d = Ext.getCmp(d) || b.query(d)[0]
    }
    e.stretchMaxPartner = d && e.context.getCmp(d);
    Ext.layout.container.Container.prototype.beginLayout.apply(this,
      arguments);
    e.innerCtContext = e.getEl("innerCt", h);
    e.targetElContext = e.getEl("targetEl", h);
    e.ownerScrollable = i = b.getScrollable();
    if (i) {
      e.scrollRestore = i.getPosition()
    }
    a.width = "";
    a.height = ""
  },
  beginLayoutCycle: function(d, m) {
    var j = this,
      a = d.state,
      k = d.ownerScrollable,
      h = j.align,
      i = d.boxNames,
      l = j.pack,
      c = j._centerRe,
      e = j.overflowHandler,
      b = d.state.canScroll,
      g, f;
    if (e) {
      e.beginLayoutCycle(d, m)
    }
    Ext.layout.container.Container.prototype.beginLayoutCycle.apply(this,
      arguments);
    d.parallelSizeModel = g = d[i.widthModel];
    d.perpendicularSizeModel = f = d[i.heightModel];
    d.boxOptions = {
      align: h = {
        stretch: h === "stretch",
        stretchmax: h === "stretchmax",
        center: c.test(h),
        bottom: j._endRe.test(h)
      },
      pack: l = {
        center: c.test(l),
        end: l === "end"
      }
    };
    if (k) {
      if (!b) {
        a.canScroll = {
          parallel: !g.shrinkWrap && k[i.getX](),
          perpendicular: !f.shrinkWrap && k[i.getY]()
        }
      }
      if (!a.actualScroll) {
        a.actualScroll = {
          parallel: false,
          perpendicular: false
        }
      }
    }
    if (h.stretch && f.shrinkWrap) {
      h.stretchmax = true;
      h.stretch = false
    }
    h.nostretch = !(h.stretch || h.stretchmax);
    if (g.shrinkWrap) {
      l.center = l.end = false
    }
    j.cacheFlexes(d);
    j.targetEl.setWidth(20000)
  },
  cacheFlexes: function(l) {
    var A = this,
      m = l.boxNames,
      a = m.widthModel,
      g = m.heightModel,
      c = l.boxOptions.align.nostretch,
      s = 0,
      b = l.childItems,
      u = b.length,
      y = [],
      n = 0,
      v = 0,
      r = 0,
      k = m.minWidth,
      x = m.minHeight,
      h = A._percentageRe,
      w = 0,
      z = 0,
      f, p, t, j, d, e, q, o;
    while (u--) {
      p = b[u];
      f = p.target;
      e = p[a];
      if (e.calculated) {
        p.flex = t = f.flex;
        if (t) {
          s += t;
          y.push(p);
          n += f[k] || 0
        } else {
          j = h.exec(f[m.width]);
          p.percentageParallel = parseFloat(j[1]) / 100;
          ++w
        }
      }
      if (e.configured) {
        q = f[m.width]
      } else {
        q = f[k] || 0
      }
      r += q;
      d = p[g];
      if (c && d.calculated) {
        j = h.exec(f[m.height]);
        p.percentagePerpendicular = parseFloat(j[1]) / 100;
        ++z
      }
      if (d.configured) {
        o = f[m.height]
      } else {
        o = f[x] || 0
      }
      if (o > v) {
        v = o
      }
    }
    l.flexedItems = y;
    l.flexedMinWidth = n;
    l.smallestWidth = r;
    l.smallestHeight = v;
    l.totalFlex = s;
    l.percentageWidths = w;
    l.percentageHeights = z;
    Ext.Array.sort(y, A.flexSortFn)
  },
  calculate: function(c) {
    var g = this,
      f = c.boxNames,
      a = c.state,
      e = a.actualScroll,
      i = a.needsScroll,
      b = a.canScroll,
      h = a.boxPlan || (a.boxPlan = {}),
      d = g.overflowHandler;
    h.targetSize = g.getContainerSize(c);
    if (b && !i) {
      a.needsScroll = i = {
        parallel: b.parallel && h.targetSize[f.width] < c.smallestWidth,
        perpendicular: b.perpendicular && h.targetSize[f.height] < c.smallestHeight
      }
    }
    if (!a.parallelDone) {
      a.parallelDone = g.calculateParallel(c, f, h)
    }
    if (!a.perpendicularDone) {
      a.perpendicularDone = g.calculatePerpendicular(c, f, h)
    }
    if (a.parallelDone && a.perpendicularDone) {
      if (b && !a.scrollPass) {
        if (i.parallel !== e.parallel || i.perpendicular !== e.perpendicular) {
          c.invalidate({
            state: {
              scrollPass: true,
              canScroll: b,
              needsScroll: e
            }
          });
          g.done = false;
          return
        }
      }
      g.publishInnerCtSize(c);
      if (g.done && c.boxOptions.align.stretchmax && !a.stretchMaxDone) {
        g.calculateStretchMax(c, f, h);
        a.stretchMaxDone = true
      }
      if (d) {
        d.calculate(c)
      }
    } else {
      g.done = false
    }
  },
  calculateParallel: function(w, K, B) {
    var q = this,
      n = w.parallelSizeModel.shrinkWrap,
      C = K.width,
      g = w.childItems,
      s = K.beforeX,
      G = K.afterX,
      k = K.setWidth,
      z = g.length,
      v = w.flexedItems,
      F = v.length,
      p = w.boxOptions.pack,
      H = q.padding,
      b = B.targetSize,
      o = b[C],
      L = w.state,
      y = L.needsScroll,
      r = L.canScroll,
      A = 0,
      h = H[s],
      E = h + H[G],
      t = Ext.getScrollbarSize(),
      e = t[K.width],
      a = t[K.height],
      I, x, f, l, m, j, c, J, D, u, d;
    if (!n && !b[K.gotWidth]) {
      return false
    }
    for (I = 0; I < z; ++I) {
      m = g[I];
      x = m.marginInfo || m.getMarginInfo();
      A += x[C];
      if (!m[K.widthModel].calculated) {
        D = m.getProp(C);
        E += D;
        if (isNaN(E)) {
          return false
        }
      }
    }
    E += A;
    if (w.percentageWidths) {
      u = o - A;
      if (isNaN(u)) {
        return false
      }
      for (I = 0; I < z; ++I) {
        m = g[I];
        if (m.percentageParallel) {
          D = Math.ceil(u * m.percentageParallel);
          D = m.setWidth(D);
          E += D
        }
      }
    }
    if (n) {
      d = 0;
      B.tooNarrow = false
    } else {
      d = o - E;
      if (y && y.perpendicular) {
        d -= a
      }
      B.tooNarrow = d < w.flexedMinWidth;
      if (B.tooNarrow && r && r.parallel) {
        L.actualScroll.parallel = true
      }
    }
    J = E;
    f = d;
    l = w.totalFlex;
    for (I = 0; I < F; I++) {
      m = v[I];
      j = m.flex;
      c = q.roundFlex((j / l) * f);
      c = m[k](c);
      J += c;
      f = Math.max(0, f - c);
      l -= j
    }
    if (p.center) {
      h += f / 2;
      if (h < 0) {
        h = 0
      }
    } else {
      if (p.end) {
        h += f
      }
    }
    for (I = 0; I < z; ++I) {
      m = g[I];
      x = m.marginInfo;
      h += x[s];
      m.setProp(K.x, h);
      h += x[G] + m.props[C]
    }
    J += w.targetContext.getPaddingInfo()[C];
    w.state.contentWidth = J;
    if (y && y.perpendicular) {
      if (n) {
        J += e
      }
      w[K.hasOverflowY] = true;
      w.target.componentLayout[K.setWidthInDom] = true;
      w[K.invalidateScrollY] = Ext.isIE8
    }
    w[K.setContentWidth](J);
    return true
  },
  calculatePerpendicular: function(u, L, A) {
    var s = this,
      P = u.state,
      w = P.needsScroll,
      t = P.canScroll,
      d = u.perpendicularSizeModel.shrinkWrap,
      b = A.targetSize,
      h = u.childItems,
      z = h.length,
      l = Math.max,
      k = L.height,
      m = L.setHeight,
      g = L.beforeY,
      r = L.y,
      I = s.padding,
      j = I[g],
      n = b[k] - j - I[L.afterY],
      F = u.boxOptions.align,
      o = F.stretch,
      p = F.stretchmax,
      O = F.center,
      N = F.bottom,
      H = s.constrainAlign,
      G = 0,
      C = 0,
      E = s.onBeforeConstrainInvalidateChild,
      B = s.onAfterConstrainInvalidateChild,
      a = Ext.getScrollbarSize().height,
      y, J, D, v, x, c, q, e, M, K, f;
    if (!d && !b[L.gotHeight]) {
      return false
    }
    if (o || ((O || N) && !d)) {
      if (isNaN(n)) {
        return false
      }
    }
    if (w && w.parallel) {
      if (d) {
        K = true
      } else {
        n -= a;
        A.targetSize[k] -= a
      }
    }
    if (o) {
      c = n;
      G = l(c, u.smallestHeight)
    } else {
      for (J = 0; J < z; J++) {
        q = h[J];
        v = (q.marginInfo || q.getMarginInfo())[k];
        if (!(f = q.percentagePerpendicular)) {
          D = q.getProp(k)
        } else {
          ++C;
          if (d) {
            continue
          } else {
            D = f * n - v;
            D = q[L.setHeight](D)
          }
        }
        if (!d && H && q[L.heightModel].shrinkWrap && D > n) {
          q.invalidate({
            before: E,
            after: B,
            layout: s,
            childHeight: n,
            names: L
          });
          u.state.parallelDone = false
        }
        if (isNaN(G = l(G, D + v, q.target[L.minHeight] || 0))) {
          return false
        }
      }
    }
    if (K) {
      G += a;
      u[L.hasOverflowX] = true;
      u.target.componentLayout[L.setHeightInDom] = true;
      u[L.invalidateScrollX] = Ext.isIE8
    }
    e = u.stretchMaxPartner;
    if (e) {
      u.setProp("maxChildHeight", G);
      M = e.childItems;
      if (M && M.length) {
        G = l(G, e.getProp("maxChildHeight"));
        if (isNaN(G)) {
          return false
        }
      }
    }
    u[L.setContentHeight](G + s.padding[k] + u.targetContext.getPaddingInfo()[
      k]);
    if (K) {
      G -= a
    }
    if (G > b[k] && t && t.perpendicular) {
      P.actualScroll.perpendicular = true
    }
    A.maxSize = G;
    if (p) {
      c = G
    } else {
      if (O || N || C) {
        if (H) {
          c = d ? G : n
        } else {
          c = d ? G : l(n, G)
        }
        c -= u.innerCtContext.getBorderInfo()[k]
      }
    }
    for (J = 0; J < z; J++) {
      q = h[J];
      v = q.marginInfo || q.getMarginInfo();
      y = j + v[g];
      if (o) {
        q[m](c - v[k])
      } else {
        f = q.percentagePerpendicular;
        if (d && f) {
          v = q.marginInfo || q.getMarginInfo();
          D = f * c - v[k];
          D = q.setHeight(D)
        }
        if (O) {
          x = c - q.props[k];
          if (x > 0) {
            y = j + Math[s.alignRoundingMethod](x / 2)
          }
        } else {
          if (N) {
            y = l(0, c - y - q.props[k])
          }
        }
      }
      q.setProp(r, y)
    }
    return true
  },
  onBeforeConstrainInvalidateChild: function(b, a) {
    var c = a.names.heightModel;
    if (!b[c].constrainedMin) {
      b[c] = Ext.layout.SizeModel.calculated
    }
  },
  onAfterConstrainInvalidateChild: function(b, a) {
    var c = a.names;
    b.setProp(c.beforeY, 0);
    if (b[c.heightModel].calculated) {
      b[c.setHeight](a.childHeight)
    }
  },
  calculateStretchMax: function(c, j, l) {
    var k = this,
      g = j.height,
      m = j.width,
      f = c.childItems,
      a = f.length,
      o = l.maxSize,
      n = k.onBeforeStretchMaxInvalidateChild,
      e = k.onAfterStretchMaxInvalidateChild,
      p, h, d, b;
    for (d = 0; d < a; ++d) {
      p = f[d];
      h = p.props;
      b = o - p.getMarginInfo()[g];
      if (b !== h[g] || p[j.heightModel].constrained) {
        p.invalidate({
          before: n,
          after: e,
          layout: k,
          childWidth: h[m],
          childHeight: b,
          childX: h.x,
          childY: h.y,
          names: j
        })
      }
    }
  },
  onBeforeStretchMaxInvalidateChild: function(b, a) {
    var c = a.names.heightModel;
    if (!b[c].constrainedMax) {
      b[c] = Ext.layout.SizeModel.calculated
    }
  },
  onAfterStretchMaxInvalidateChild: function(d, c) {
    var e = c.names,
      a = c.childHeight,
      b = c.childWidth;
    d.setProp("x", c.childX);
    d.setProp("y", c.childY);
    if (d[e.heightModel].calculated) {
      d[e.setHeight](a)
    }
    if (d[e.widthModel].calculated) {
      d[e.setWidth](b)
    }
  },
  completeLayout: function(b) {
    var j = this,
      i = b.boxNames,
      h = b.invalidateScrollX,
      g = b.invalidateScrollY,
      c = j.overflowHandler,
      m = b.scrollRestore,
      e, a, f, d, n, l, k;
    if (c) {
      c.completeLayout(b)
    }
    if (h || g) {
      a = j.getTarget();
      e = a.dom;
      n = e.style;
      if (h) {
        f = a.getStyle("overflowX");
        if (f === "auto") {
          f = n.overflowX;
          n.overflowX = "scroll"
        } else {
          h = false
        }
      }
      if (g) {
        d = a.getStyle("overflowY");
        if (d === "auto") {
          d = n.overflowY;
          n.overflowY = "scroll"
        } else {
          g = false
        }
      }
      if (h || g) {
        e.scrollWidth;
        if (h) {
          n.overflowX = f
        }
        if (g) {
          n.overflowY = d
        }
      }
    }
    if (m) {
      b.ownerScrollable.scrollTo(m.x, m.y)
    }
  },
  finishedLayout: function(b) {
    var a = this.overflowHandler;
    if (a) {
      a.finishedLayout(b)
    }
    Ext.layout.container.Container.prototype.finishedLayout.apply(this,
      arguments)
  },
  getLayoutItems: function() {
    var h = Ext.layout.container.Container.prototype.getLayoutItems.call(
        this),
      b = h.length,
      e, d, c, j, g, f, a;
    for (c = 0; c < b; ++c) {
      if ((j = h[c]).isSplitter) {
        continue
      }
      a = j.splitter;
      if (j.hidden) {
        if (a) {
          if (!a.hidden) {
            a.hidden = true;
            if (a.el) {
              a.el.hide()
            }
          }
        }
        continue
      }
      if (a) {
        f = a.collapseTarget === "next"
      } else {
        f = false
      }
      d = null;
      if (e && g) {
        if (g.hidden) {
          g.hidden = false;
          if (g.el) {
            g.el.show()
          }
        }
        if (f) {
          d = true
        }
      } else {
        if (f) {
          d = !e
        }
      }
      if (d !== null && a.hidden !== d) {
        a.hidden = d;
        if (a.el) {
          a.el.setVisible(!d)
        }
      }
      g = !f && a;
      e = j
    }
    if (e && g && !g.hidden) {
      g.hidden = true;
      if (g.el) {
        g.el.hide()
      }
    }
    return h
  },
  getScrollerEl: function() {
    return this.innerCt
  },
  insertSplitter: function(d, c, f, b) {
    var e = {
        xtype: "splitter",
        id: d.id + "-splitter",
        hidden: f,
        splitterFor: d,
        synthetic: true
      },
      a = c + ((b.collapseTarget === "prev") ? 1 : 0);
    e[this.names.height] = "100%";
    if (b) {
      Ext.apply(e, b)
    }
    d.splitter = this.owner.add(a, e)
  },
  publishInnerCtSize: function(b, d) {
    d = d || 0;
    var i = this,
      a = b.state,
      h = b.boxNames,
      g = h.height,
      k = h.width,
      f = b.boxOptions.align,
      m = i.padding,
      j = a.boxPlan,
      e = j.targetSize,
      o = j.maxSize,
      l = a.needsScroll,
      p = b.innerCtContext,
      c, n;
    if (b.parallelSizeModel.shrinkWrap || (j.tooNarrow && a.canScroll)) {
      c = a.contentWidth - b.targetContext.getPaddingInfo()[k]
    } else {
      c = e[k];
      if (l && l.perpendicular) {
        c -= Ext.getScrollbarSize()[k]
      }
    }
    c -= d;
    i.owner.tooNarrow = j.tooNarrow;
    if (f.stretch) {
      n = o
    } else {
      n = j.maxSize + m[h.beforeY] + m[h.afterY] + p.getBorderInfo()[g];
      if (!b.perpendicularSizeModel.shrinkWrap && (f.center || f.bottom)) {
        n = Math.max(e[g], n)
      }
    }
    p[h.setWidth](c);
    p[h.setHeight](n);
    b.targetElContext.setWidth(b.innerCtContext.props.width - (i.vertical ?
      0 : (d || 0)));
    if (isNaN(c + n)) {
      i.done = false
    }
  },
  onAdd: function(d, a) {
    var c = this,
      b = c.enableSplitters && d.split && !d.isButton;
    Ext.layout.container.Container.prototype.onAdd.apply(this, arguments);
    if (b) {
      if (b === true) {
        b = {
          collapseTarget: "next"
        }
      } else {
        if (Ext.isString(b)) {
          b = {
            collapseTarget: b === "before" ? "next" : "prev"
          }
        } else {
          b = Ext.apply({
            collapseTarget: b.side === "before" ? "next" : "prev"
          }, b)
        }
      }
      c.insertSplitter(d, a, !!d.hidden, b)
    }
  },
  onRemove: function(b, e) {
    var f = this,
      h = f.names,
      a = f.owner,
      g = b.splitter,
      c = f.overflowHandler,
      d;
    Ext.layout.container.Container.prototype.onRemove.apply(this,
      arguments);
    if (g && a.contains(g)) {
      a.doRemove(g, true);
      b.splitter = null
    }
    if (c) {
      c.onRemove(b)
    }
    if (b.layoutMarginCap === f.id) {
      delete b.layoutMarginCap
    }
    if (!a.destroying && !e && b.rendered) {
      d = b.getEl();
      if (d) {
        d.setStyle(h.beforeY, "");
        d.setStyle(h.beforeX, "");
        d.setStyle("margin", "")
      }
    }
  },
  applyOverflowHandler: function(b, a) {
    var c;
    if (typeof b === "string") {
      b = {
        type: b
      }
    }
    c = b.type;
    if (a && a.type === b.type) {
      delete b.type;
      a.setConfig(b);
      return a
    }
    b.layout = this;
    return Ext.Factory.boxOverflow(b)
  },
  getRenderTarget: function() {
    return this.targetEl
  },
  getElementTarget: function() {
    return this.innerCt
  },
  destroy: function() {
    var a = this;
    Ext.destroy(a.innerCt, a.overflowHandler);
    a.flexSortFn = a.innerCt = null;
    Ext.layout.container.Container.prototype.destroy.call(this)
  },
  getRenderData: function() {
    var a = Ext.layout.container.Container.prototype.getRenderData.call(
      this);
    a.targetElCls = this.targetElCls;
    return a
  },
  updateVertical: function(b) {
    var e = this,
      c = e.overflowHandler,
      a = e.owner,
      d = e._props;
    Ext.apply(e, b ? d.vbox : d.hbox);
    if (c && a && a.rendered) {
      c.setVertical(b)
    }
  },
  _props: {
    hbox: {
      direction: "horizontal",
      oppositeDirection: "vertical",
      horizontal: true,
      vertical: false,
      names: {
        beforeX: "left",
        beforeScrollX: "left",
        leftCap: "Left",
        afterX: "right",
        width: "width",
        contentWidth: "contentWidth",
        minWidth: "minWidth",
        maxWidth: "maxWidth",
        widthCap: "Width",
        widthModel: "widthModel",
        widthIndex: 0,
        x: "x",
        getX: "getX",
        setX: "setX",
        scrollLeft: "scrollLeft",
        overflowX: "overflowX",
        hasOverflowX: "hasOverflowX",
        invalidateScrollX: "invalidateScrollX",
        parallelMargins: "lr",
        center: "middle",
        beforeY: "top",
        afterY: "bottom",
        height: "height",
        contentHeight: "contentHeight",
        minHeight: "minHeight",
        maxHeight: "maxHeight",
        heightCap: "Height",
        heightModel: "heightModel",
        heightIndex: 1,
        y: "y",
        getY: "getY",
        setY: "setY",
        overflowY: "overflowY",
        hasOverflowY: "hasOverflowY",
        invalidateScrollY: "invalidateScrollY",
        perpendicularMargins: "tb",
        getWidth: "getWidth",
        getHeight: "getHeight",
        setWidth: "setWidth",
        setHeight: "setHeight",
        gotWidth: "gotWidth",
        gotHeight: "gotHeight",
        setContentWidth: "setContentWidth",
        setContentHeight: "setContentHeight",
        setWidthInDom: "setWidthInDom",
        setHeightInDom: "setHeightInDom",
        getScrollLeft: "getScrollLeft",
        setScrollLeft: "setScrollLeft",
        scrollTo: "scrollTo"
      },
      sizePolicy: {
        flex: {
          "": {
            readsWidth: 0,
            readsHeight: 1,
            setsWidth: 1,
            setsHeight: 0
          },
          stretch: {
            readsWidth: 0,
            readsHeight: 0,
            setsWidth: 1,
            setsHeight: 1
          },
          stretchmax: {
            readsWidth: 0,
            readsHeight: 1,
            setsWidth: 1,
            setsHeight: 1
          }
        },
        "": {
          readsWidth: 1,
          readsHeight: 1,
          setsWidth: 0,
          setsHeight: 0
        },
        stretch: {
          readsWidth: 1,
          readsHeight: 0,
          setsWidth: 0,
          setsHeight: 1
        },
        stretchmax: {
          readsWidth: 1,
          readsHeight: 1,
          setsWidth: 0,
          setsHeight: 1
        }
      }
    },
    vbox: {
      direction: "vertical",
      oppositeDirection: "horizontal",
      horizontal: false,
      vertical: true,
      names: {
        beforeX: "top",
        beforeScrollX: "top",
        leftCap: "Top",
        afterX: "bottom",
        width: "height",
        contentWidth: "contentHeight",
        minWidth: "minHeight",
        maxWidth: "maxHeight",
        widthCap: "Height",
        widthModel: "heightModel",
        widthIndex: 1,
        x: "y",
        getX: "getY",
        setX: "setY",
        scrollLeft: "scrollTop",
        overflowX: "overflowY",
        hasOverflowX: "hasOverflowY",
        invalidateScrollX: "invalidateScrollY",
        parallelMargins: "tb",
        center: "center",
        beforeY: "left",
        afterY: "right",
        height: "width",
        contentHeight: "contentWidth",
        minHeight: "minWidth",
        maxHeight: "maxWidth",
        heightCap: "Width",
        heightModel: "widthModel",
        heightIndex: 0,
        y: "x",
        getY: "getX",
        setY: "setX",
        overflowY: "overflowX",
        hasOverflowY: "hasOverflowX",
        invalidateScrollY: "invalidateScrollX",
        perpendicularMargins: "lr",
        getWidth: "getHeight",
        getHeight: "getWidth",
        setWidth: "setHeight",
        setHeight: "setWidth",
        gotWidth: "gotHeight",
        gotHeight: "gotWidth",
        setContentWidth: "setContentHeight",
        setContentHeight: "setContentWidth",
        setWidthInDom: "setHeightInDom",
        setHeightInDom: "setWidthInDom",
        getScrollLeft: "getScrollTop",
        setScrollLeft: "setScrollTop",
        scrollTo: "scrollTo"
      },
      sizePolicy: {
        flex: {
          "": {
            readsWidth: 1,
            readsHeight: 0,
            setsWidth: 0,
            setsHeight: 1
          },
          stretch: {
            readsWidth: 0,
            readsHeight: 0,
            setsWidth: 1,
            setsHeight: 1
          },
          stretchmax: {
            readsWidth: 1,
            readsHeight: 0,
            setsWidth: 1,
            setsHeight: 1
          }
        },
        "": {
          readsWidth: 1,
          readsHeight: 1,
          setsWidth: 0,
          setsHeight: 0
        },
        stretch: {
          readsWidth: 0,
          readsHeight: 1,
          setsWidth: 1,
          setsHeight: 0
        },
        stretchmax: {
          readsWidth: 1,
          readsHeight: 1,
          setsWidth: 1,
          setsHeight: 0
        }
      }
    }
  }
}, 1, 0, 0, 0, ["layout.box"], 0, [Ext.layout.container, "Box", Ext.layout,
  "BoxLayout"
], 0));
(Ext.cmd.derive("Ext.layout.container.HBox", Ext.layout.container.Box, {
  alternateClassName: "Ext.layout.HBoxLayout",
  type: "hbox",
  vertical: false
}, 0, 0, 0, 0, ["layout.hbox"], 0, [Ext.layout.container, "HBox", Ext.layout,
  "HBoxLayout"
], 0));
(Ext.cmd.derive("Ext.layout.container.VBox", Ext.layout.container.Box, {
  alternateClassName: "Ext.layout.VBoxLayout",
  type: "vbox",
  vertical: true
}, 0, 0, 0, 0, ["layout.vbox"], 0, [Ext.layout.container, "VBox", Ext.layout,
  "VBoxLayout"
], 0));
(Ext.cmd.derive("Ext.toolbar.Toolbar", Ext.container.Container, {
  alternateClassName: "Ext.Toolbar",
  isToolbar: true,
  baseCls: "x-toolbar",
  ariaRole: "toolbar",
  defaultType: "button",
  layout: undefined,
  vertical: undefined,
  enableOverflow: false,
  overflowHandler: null,
  defaultButtonUI: "default-toolbar",
  defaultFieldUI: "default",
  defaultFooterButtonUI: "default",
  defaultFooterFieldUI: "default",
  trackMenus: true,
  itemCls: "x-toolbar-item",
  statics: {
    shortcuts: {
      "-": "tbseparator",
      " ": "tbspacer"
    },
    shortcutsHV: {
      0: {
        "->": {
          xtype: "tbfill",
          height: 0
        }
      },
      1: {
        "->": {
          xtype: "tbfill",
          width: 0
        }
      }
    }
  },
  initComponent: function() {
    var c = this,
      b = c.layout,
      a = c.vertical;
    if (a === undefined) {
      c.vertical = a = c.dock === "right" || c.dock === "left"
    }
    c.layout = b = Ext.applyIf(Ext.isString(b) ? {
      type: b
    } : b || {}, {
      type: a ? "vbox" : "hbox",
      align: a ? "stretchmax" : "middle"
    });
    if (c.overflowHandler) {
      b.overflowHandler = c.overflowHandler
    } else {
      if (c.enableOverflow) {
        b.overflowHandler = "menu"
      }
    }
    if (a) {
      c.addClsWithUI("vertical")
    }
    if (c.ui === "footer") {
      c.ignoreBorderManagement = true
    }
    Ext.container.Container.prototype.initComponent.call(this)
  },
  getRefItems: function(a) {
    var e = this,
      b = Ext.container.Container.prototype.getRefItems.apply(this,
        arguments),
      d = e.layout,
      c;
    if (a && (e.enableOverflow || (e.overflowHandler === "menu"))) {
      c = d.overflowHandler;
      if (c && c.menu) {
        b = b.concat(c.menu.getRefItems(a))
      }
    }
    return b
  },
  lookupComponent: function(e) {
    var d = arguments,
      a, b;
    if (typeof e === "string") {
      b = Ext.toolbar.Toolbar;
      a = b.shortcutsHV[this.vertical ? 1 : 0][e] || b.shortcuts[e];
      if (typeof a === "string") {
        e = {
          xtype: a
        }
      } else {
        if (a) {
          e = Ext.apply({}, a)
        } else {
          e = {
            xtype: "tbtext",
            text: e
          }
        }
      }
      this.applyDefaults(e);
      d = [e]
    }
    return Ext.container.Container.prototype.lookupComponent.apply(this,
      d)
  },
  onBeforeAdd: function(b) {
    var c = this,
      d = c.ui === "footer",
      a = d ? c.defaultFooterButtonUI : c.defaultButtonUI;
    if (b.isSegmentedButton) {
      if (b.getDefaultUI() === "default" && !b.config.hasOwnProperty(
          "defaultUI")) {
        b.setDefaultUI(a)
      }
    } else {
      if (b.ui === "default" && !b.hasOwnProperty("ui")) {
        if (b.isButton) {
          b.ui = a
        } else {
          if (b.isFormField) {
            b.ui = d ? c.defaultFooterFieldUI : c.defaultFieldUI
          }
        }
      }
    }
    if (b instanceof Ext.toolbar.Separator) {
      b.setUI(c.vertical ? "vertical" : "horizontal")
    }
    Ext.container.Container.prototype.onBeforeAdd.apply(this, arguments)
  },
  onAdd: function(a) {
    if (a.needArrowKeys && this.enableFocusableContainer) {
      this.enableFocusableContainer = false
    }
    Ext.container.Container.prototype.onAdd.apply(this, arguments);
    this.trackMenu(a)
  },
  onRemove: function(a) {
    Ext.container.Container.prototype.onRemove.apply(this, arguments);
    this.trackMenu(a, true)
  },
  privates: {
    applyDefaults: function(a) {
      if (!Ext.isString(a)) {
        a = Ext.container.Container.prototype.applyDefaults.apply(this,
          arguments)
      }
      return a
    },
    trackMenu: function(c, a) {
      var b = this;
      if (b.trackMenus && c.menu) {
        c[a ? "un" : "on"]({
          mouseover: b.onButtonOver,
          menushow: b.onButtonMenuShow,
          menuhide: b.onButtonMenuHide,
          scope: b
        })
      }
    },
    getChildItemsToDisable: function() {
      return this.items.getRange()
    },
    onButtonOver: function(b, c) {
      var a = this.activeMenuBtn;
      if (a && a !== b) {
        a.hideMenu();
        b.focus();
        b.showMenu(c);
        this.activeMenuBtn = b
      }
    },
    onButtonMenuShow: function(a) {
      this.activeMenuBtn = a
    },
    onButtonMenuHide: function(a) {
      this.activeMenuBtn = null
    }
  }
}, 0, ["toolbar"], ["component", "box", "container", "toolbar"], {
  component: true,
  box: true,
  container: true,
  toolbar: true
}, ["widget.toolbar"], [
  [Ext.util.FocusableContainer.prototype.mixinId || Ext.util.FocusableContainer
    .$className, Ext.util.FocusableContainer
  ]
], [Ext.toolbar, "Toolbar", Ext, "Toolbar"], 0));
Ext.define("Ext.theme.neptune.toolbar.Toolbar", {
  override: "Ext.toolbar.Toolbar",
  usePlainButtons: false,
  border: false
});
(Ext.cmd.derive("Ext.dd.DragDrop", Ext.Base, {
  constructor: function(c, a, b) {
    if (c) {
      this.init(c, a, b)
    }
  },
  id: null,
  config: null,
  dragElId: null,
  handleElId: null,
  invalidHandleTypes: null,
  invalidHandleIds: null,
  invalidHandleClasses: null,
  startPageX: 0,
  startPageY: 0,
  groups: null,
  locked: false,
  lock: function() {
    this.locked = true
  },
  moveOnly: false,
  unlock: function() {
    this.locked = false
  },
  isTarget: true,
  padding: null,
  _domRef: null,
  __ygDragDrop: true,
  constrainX: false,
  constrainY: false,
  minX: 0,
  maxX: 0,
  minY: 0,
  maxY: 0,
  maintainOffset: false,
  xTicks: null,
  yTicks: null,
  primaryButtonOnly: true,
  available: false,
  hasOuterHandles: false,
  triggerEvent: "mousedown",
  b4StartDrag: function(a, b) {},
  startDrag: function(a, b) {},
  b4Drag: function(a) {},
  onDrag: function(a) {},
  onDragEnter: function(a, b) {},
  b4DragOver: function(a) {},
  onDragOver: function(a, b) {},
  b4DragOut: function(a) {},
  onDragOut: function(a, b) {},
  b4DragDrop: function(a) {},
  onDragDrop: function(a, b) {},
  onInvalidDrop: function(a) {},
  b4EndDrag: function(a) {},
  endDrag: function(a) {},
  b4MouseDown: function(a) {},
  onMouseDown: function(a) {},
  onMouseUp: function(a) {},
  onAvailable: function() {},
  defaultPadding: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  constrainTo: function(e, b, k) {
    if (Ext.isNumber(b)) {
      b = {
        left: b,
        right: b,
        top: b,
        bottom: b
      }
    }
    b = b || this.defaultPadding;
    var g = Ext.get(this.getEl()).getBox(),
      l = Ext.get(e),
      j = l.getScroll(),
      f, h = l.dom,
      i, d, a;
    if (h === document.body) {
      f = {
        x: j.left,
        y: j.top,
        width: Ext.Element.getViewportWidth(),
        height: Ext.Element.getViewportHeight()
      }
    } else {
      i = l.getXY();
      f = {
        x: i[0],
        y: i[1],
        width: h.clientWidth,
        height: h.clientHeight
      }
    }
    d = g.y - f.y;
    a = g.x - f.x;
    this.resetConstraints();
    this.setXConstraint(a - (b.left || 0), f.width - a - g.width - (b.right ||
      0), this.xTickSize);
    this.setYConstraint(d - (b.top || 0), f.height - d - g.height - (b.bottom ||
      0), this.yTickSize)
  },
  getEl: function() {
    if (!this._domRef) {
      this._domRef = Ext.getDom(this.id)
    }
    return this._domRef
  },
  getDragEl: function() {
    return Ext.getDom(this.dragElId)
  },
  init: function(d, a, b) {
    var c = this;
    c.el = c.el || Ext.get(d);
    c.initTarget(d, a, b);
    Ext.get(c.id).on(c.triggerEvent, c.handleMouseDown, c)
  },
  initTarget: function(c, a, b) {
    this.config = b || {};
    this.DDMInstance = Ext.dd.DragDropManager;
    this.groups = {};
    if (typeof c !== "string") {
      c = Ext.id(c)
    }
    this.id = c;
    this.addToGroup((a) ? a : "default");
    this.handleElId = c;
    this.setDragElId(c);
    this.invalidHandleTypes = {
      A: "A"
    };
    this.invalidHandleIds = {};
    this.invalidHandleClasses = [];
    this.applyConfig();
    this.handleOnAvailable()
  },
  applyConfig: function() {
    this.padding = this.config.padding || [0, 0, 0, 0];
    this.isTarget = (this.config.isTarget !== false);
    this.maintainOffset = (this.config.maintainOffset);
    this.primaryButtonOnly = (this.config.primaryButtonOnly !== false)
  },
  handleOnAvailable: function() {
    this.available = true;
    this.resetConstraints();
    this.onAvailable()
  },
  setPadding: function(c, a, d, b) {
    if (!a && 0 !== a) {
      this.padding = [c, c, c, c]
    } else {
      if (!d && 0 !== d) {
        this.padding = [c, a, c, a]
      } else {
        this.padding = [c, a, d, b]
      }
    }
  },
  setInitPosition: function(d, c) {
    var e = this.getEl(),
      b, a, f;
    if (!this.DDMInstance.verifyEl(e)) {
      return
    }
    b = d || 0;
    a = c || 0;
    f = Ext.fly(e).getXY();
    this.initPageX = f[0] - b;
    this.initPageY = f[1] - a;
    this.lastPageX = f[0];
    this.lastPageY = f[1];
    this.setStartPosition(f)
  },
  setStartPosition: function(b) {
    var a = b || Ext.fly(this.getEl()).getXY();
    this.deltaSetXY = null;
    this.startPageX = a[0];
    this.startPageY = a[1]
  },
  addToGroup: function(a) {
    this.groups[a] = true;
    this.DDMInstance.regDragDrop(this, a)
  },
  removeFromGroup: function(a) {
    if (this.groups[a]) {
      delete this.groups[a]
    }
    this.DDMInstance.removeDDFromGroup(this, a)
  },
  setDragElId: function(a) {
    this.dragElId = a
  },
  setHandleElId: function(a) {
    if (typeof a !== "string") {
      a = Ext.id(a)
    }
    this.handleElId = a;
    this.DDMInstance.regHandle(this.id, a)
  },
  setOuterHandleElId: function(a) {
    if (typeof a !== "string") {
      a = Ext.id(a)
    }
    Ext.get(a).on(this.triggerEvent, this.handleMouseDown, this);
    this.setHandleElId(a);
    this.hasOuterHandles = true
  },
  unreg: function() {
    var b = this,
      a;
    if (b._domRef) {
      a = Ext.fly(b.id);
      if (a) {
        a.un(b.triggerEvent, b.handleMouseDown, b)
      }
    }
    b._domRef = null;
    b.DDMInstance._remove(b, b.autoGroup)
  },
  destroy: function() {
    this.unreg();
    this.callParent()
  },
  isLocked: function() {
    return (this.DDMInstance.isLocked() || this.locked)
  },
  handleMouseDown: function(c, b) {
    var a = this;
    if ((a.primaryButtonOnly && c.button) || a.isLocked()) {
      return
    }
    a.DDMInstance.refreshCache(a.groups);
    if (a.hasOuterHandles || a.DDMInstance.isOverTarget(c.getPoint(), a)) {
      if (a.clickValidator(c)) {
        a.setStartPosition();
        a.b4MouseDown(c);
        a.onMouseDown(c);
        a.DDMInstance.handleMouseDown(c, a);
        a.DDMInstance.stopEvent(c)
      }
    }
  },
  clickValidator: function(b) {
    var a = b.getTarget();
    return (this.isValidHandleChild(a) && (this.id === this.handleElId ||
      this.DDMInstance.handleWasClicked(a, this.id)))
  },
  addInvalidHandleType: function(a) {
    var b = a.toUpperCase();
    this.invalidHandleTypes[b] = b
  },
  addInvalidHandleId: function(a) {
    if (typeof a !== "string") {
      a = Ext.id(a)
    }
    this.invalidHandleIds[a] = a
  },
  addInvalidHandleClass: function(a) {
    this.invalidHandleClasses.push(a)
  },
  removeInvalidHandleType: function(a) {
    var b = a.toUpperCase();
    delete this.invalidHandleTypes[b]
  },
  removeInvalidHandleId: function(a) {
    if (typeof a !== "string") {
      a = Ext.id(a)
    }
    delete this.invalidHandleIds[a]
  },
  removeInvalidHandleClass: function(b) {
    var d = this.invalidHandleClasses,
      a = d.length,
      c;
    for (c = 0; c < a; ++c) {
      if (d[c] === b) {
        delete d[c]
      }
    }
  },
  isValidHandleChild: function(d) {
    var c = true,
      g, b, a;
    try {
      g = d.nodeName.toUpperCase()
    } catch (f) {
      g = d.nodeName
    }
    c = c && !this.invalidHandleTypes[g];
    c = c && !this.invalidHandleIds[d.id];
    for (b = 0, a = this.invalidHandleClasses.length; c && b < a; ++b) {
      c = !Ext.fly(d).hasCls(this.invalidHandleClasses[b])
    }
    return c
  },
  setXTicks: function(d, a) {
    this.xTicks = [];
    this.xTickSize = a;
    var c = {},
      b;
    for (b = this.initPageX; b >= this.minX; b = b - a) {
      if (!c[b]) {
        this.xTicks[this.xTicks.length] = b;
        c[b] = true
      }
    }
    for (b = this.initPageX; b <= this.maxX; b = b + a) {
      if (!c[b]) {
        this.xTicks[this.xTicks.length] = b;
        c[b] = true
      }
    }
    Ext.Array.sort(this.xTicks, this.DDMInstance.numericSort)
  },
  setYTicks: function(d, a) {
    this.yTicks = [];
    this.yTickSize = a;
    var c = {},
      b;
    for (b = this.initPageY; b >= this.minY; b = b - a) {
      if (!c[b]) {
        this.yTicks[this.yTicks.length] = b;
        c[b] = true
      }
    }
    for (b = this.initPageY; b <= this.maxY; b = b + a) {
      if (!c[b]) {
        this.yTicks[this.yTicks.length] = b;
        c[b] = true
      }
    }
    Ext.Array.sort(this.yTicks, this.DDMInstance.numericSort)
  },
  setXConstraint: function(c, b, a) {
    this.leftConstraint = c;
    this.rightConstraint = b;
    this.minX = this.initPageX - c;
    this.maxX = this.initPageX + b;
    if (a) {
      this.setXTicks(this.initPageX, a)
    }
    this.constrainX = true
  },
  clearConstraints: function() {
    this.constrainX = false;
    this.constrainY = false;
    this.clearTicks()
  },
  clearTicks: function() {
    this.xTicks = null;
    this.yTicks = null;
    this.xTickSize = 0;
    this.yTickSize = 0
  },
  setYConstraint: function(a, c, b) {
    this.topConstraint = a;
    this.bottomConstraint = c;
    this.minY = this.initPageY - a;
    this.maxY = this.initPageY + c;
    if (b) {
      this.setYTicks(this.initPageY, b)
    }
    this.constrainY = true
  },
  resetConstraints: function() {
    if (this.initPageX || this.initPageX === 0) {
      var b = (this.maintainOffset) ? this.lastPageX - this.initPageX : 0,
        a = (this.maintainOffset) ? this.lastPageY - this.initPageY : 0;
      this.setInitPosition(b, a)
    } else {
      this.setInitPosition()
    }
    if (this.constrainX) {
      this.setXConstraint(this.leftConstraint, this.rightConstraint, this
        .xTickSize)
    }
    if (this.constrainY) {
      this.setYConstraint(this.topConstraint, this.bottomConstraint, this
        .yTickSize)
    }
  },
  getTick: function(g, d) {
    if (!d) {
      return g
    } else {
      if (d[0] >= g) {
        return d[0]
      } else {
        var b, a, c, f, e;
        for (b = 0, a = d.length; b < a; ++b) {
          c = b + 1;
          if (d[c] && d[c] >= g) {
            f = g - d[b];
            e = d[c] - g;
            return (e > f) ? d[b] : d[c]
          }
        }
        return d[d.length - 1]
      }
    }
  },
  toString: function() {
    return ("DragDrop " + this.id)
  }
}, 3, 0, 0, 0, 0, 0, [Ext.dd, "DragDrop"], 0));
(Ext.cmd.derive("Ext.dd.DD", Ext.dd.DragDrop, {
  constructor: function(c, a, b) {
    if (c) {
      this.init(c, a, b)
    }
  },
  scroll: true,
  autoOffset: function(c, b) {
    var a = c - this.startPageX,
      d = b - this.startPageY;
    this.setDelta(a, d)
  },
  setDelta: function(b, a) {
    this.deltaX = b;
    this.deltaY = a
  },
  setDragElPos: function(c, b) {
    var a = this.getDragEl();
    this.alignElWithMouse(a, c, b)
  },
  alignElWithMouse: function(b, e, c) {
    var f = this.getTargetCoord(e, c),
      d = b.dom ? b : Ext.fly(b, "_dd"),
      k = d.getSize(),
      h = Ext.Element,
      i, a, j, g;
    if (!this.deltaSetXY) {
      i = this.cachedViewportSize = {
        width: h.getDocumentWidth(),
        height: h.getDocumentHeight()
      };
      a = [Math.max(0, Math.min(f.x, i.width - k.width)), Math.max(0,
        Math.min(f.y, i.height - k.height))];
      d.setXY(a);
      j = this.getLocalX(d);
      g = d.getLocalY();
      this.deltaSetXY = [j - f.x, g - f.y]
    } else {
      i = this.cachedViewportSize;
      this.setLocalXY(d, Math.max(0, Math.min(f.x + this.deltaSetXY[0], i
        .width - k.width)), Math.max(0, Math.min(f.y + this.deltaSetXY[
        1], i.height - k.height)))
    }
    this.cachePosition(f.x, f.y);
    this.autoScroll(f.x, f.y, b.offsetHeight, b.offsetWidth);
    return f
  },
  cachePosition: function(b, a) {
    if (b) {
      this.lastPageX = b;
      this.lastPageY = a
    } else {
      var c = Ext.fly(this.getEl()).getXY();
      this.lastPageX = c[0];
      this.lastPageY = c[1]
    }
  },
  autoScroll: function(k, j, e, l) {
    if (this.scroll) {
      var m = Ext.Element.getViewportHeight(),
        b = Ext.Element.getViewportWidth(),
        o = this.DDMInstance.getScrollTop(),
        d = this.DDMInstance.getScrollLeft(),
        i = e + j,
        n = l + k,
        g = (m + o - j - this.deltaY),
        f = (b + d - k - this.deltaX),
        c = 40,
        a = (document.all) ? 80 : 30;
      if (i > m && g < c) {
        window.scrollTo(d, o + a)
      }
      if (j < o && o > 0 && j - o < c) {
        window.scrollTo(d, o - a)
      }
      if (n > b && f < c) {
        window.scrollTo(d + a, o)
      }
      if (k < d && d > 0 && k - d < c) {
        window.scrollTo(d - a, o)
      }
    }
  },
  getTargetCoord: function(c, b) {
    var a = c - this.deltaX,
      d = b - this.deltaY;
    if (this.constrainX) {
      if (a < this.minX) {
        a = this.minX
      }
      if (a > this.maxX) {
        a = this.maxX
      }
    }
    if (this.constrainY) {
      if (d < this.minY) {
        d = this.minY
      }
      if (d > this.maxY) {
        d = this.maxY
      }
    }
    a = this.getTick(a, this.xTicks);
    d = this.getTick(d, this.yTicks);
    return {
      x: a,
      y: d
    }
  },
  applyConfig: function() {
    Ext.dd.DragDrop.prototype.applyConfig.call(this);
    this.scroll = (this.config.scroll !== false)
  },
  b4MouseDown: function(b) {
    var a = b.getXY();
    this.autoOffset(a[0], a[1])
  },
  b4Drag: function(b) {
    var a = b.getXY();
    this.setDragElPos(a[0], a[1])
  },
  toString: function() {
    return ("DD " + this.id)
  },
  getLocalX: function(a) {
    return a.getLocalX()
  },
  setLocalXY: function(b, a, c) {
    b.setLocalXY(a, c)
  }
}, 3, 0, 0, 0, 0, 0, [Ext.dd, "DD"], 0));
(Ext.cmd.derive("Ext.dd.DDProxy", Ext.dd.DD, {
  statics: {
    dragElId: "ygddfdiv"
  },
  constructor: function(c, a, b) {
    if (c) {
      this.init(c, a, b);
      this.initFrame()
    }
  },
  resizeFrame: true,
  centerFrame: false,
  createFrame: function() {
    var b = this,
      a = document.body,
      d, c;
    if (!a || !a.firstChild) {
      Ext.defer(function() {
        b.createFrame()
      }, 50);
      return
    }
    d = this.getDragEl();
    if (!d) {
      d = document.createElement("div");
      d.id = this.dragElId;
      d.setAttribute("role", "presentation");
      c = d.style;
      c.position = "absolute";
      c.visibility = "hidden";
      c.cursor = "move";
      c.border = "2px solid #aaa";
      c.zIndex = 999;
      a.insertBefore(d, a.firstChild)
    }
  },
  initFrame: function() {
    this.createFrame()
  },
  applyConfig: function() {
    Ext.dd.DD.prototype.applyConfig.call(this);
    this.resizeFrame = (this.config.resizeFrame !== false);
    this.centerFrame = (this.config.centerFrame);
    this.setDragElId(this.config.dragElId || Ext.dd.DDProxy.dragElId)
  },
  showFrame: function(e, d) {
    var c = this,
      a = c.getDragEl(),
      b = a.style;
    c._resizeProxy();
    if (c.centerFrame) {
      c.setDelta(Math.round(parseInt(b.width, 10) / 2), Math.round(
        parseInt(b.height, 10) / 2))
    }
    c.setDragElPos(e, d);
    Ext.fly(a).show()
  },
  _resizeProxy: function() {
    if (this.resizeFrame) {
      var a = this.getEl();
      Ext.fly(this.getDragEl()).setSize(a.offsetWidth, a.offsetHeight)
    }
  },
  b4MouseDown: function(c) {
    var b = c.getXY(),
      a = b[0],
      d = b[1];
    this.autoOffset(a, d);
    this.setDragElPos(a, d)
  },
  b4StartDrag: function(a, b) {
    this.showFrame(a, b)
  },
  b4EndDrag: function(a) {
    Ext.fly(this.getDragEl()).hide()
  },
  endDrag: function(c) {
    var b = this.getEl(),
      a = this.getDragEl();
    a.style.visibility = "";
    this.beforeMove();
    b.style.visibility = "hidden";
    Ext.dd.DDM.moveToEl(b, a);
    a.style.visibility = "hidden";
    b.style.visibility = "";
    this.afterDrag()
  },
  beforeMove: function() {},
  afterDrag: function() {},
  toString: function() {
    return ("DDProxy " + this.id)
  }
}, 3, 0, 0, 0, 0, 0, [Ext.dd, "DDProxy"], 0));
(Ext.cmd.derive("Ext.dd.StatusProxy", Ext.Component, {
  animRepair: false,
  childEls: ["ghost"],
  renderTpl: [
    '<div class="x-dd-drop-icon" role="presentation"></div><div id="{id}-ghost" data-ref="ghost" class="x-dd-drag-ghost" role="presentation"></div>'
  ],
  repairCls: "x-dd-drag-repair",
  ariaRole: "presentation",
  skipLayout: true,
  constructor: function(a) {
    var b = this;
    a = a || {};
    Ext.apply(b, {
      hideMode: "visibility",
      hidden: true,
      floating: true,
      id: b.id || Ext.id(),
      cls: "x-dd-drag-proxy " + this.dropNotAllowed,
      shadow: a.shadow || false,
      renderTo: Ext.getDetachedBody()
    });
    Ext.Component.prototype.constructor.apply(this, arguments);
    this.dropStatus = this.dropNotAllowed
  },
  dropAllowed: "x-dd-drop-ok",
  dropNotAllowed: "x-dd-drop-nodrop",
  setStatus: function(a) {
    a = a || this.dropNotAllowed;
    if (this.dropStatus !== a) {
      this.el.replaceCls(this.dropStatus, a);
      this.dropStatus = a
    }
  },
  reset: function(b) {
    var c = this,
      a = "x-dd-drag-proxy ";
    c.el.replaceCls(a + c.dropAllowed, a + c.dropNotAllowed);
    c.dropStatus = c.dropNotAllowed;
    if (b) {
      c.ghost.setHtml("")
    }
  },
  update: function(a) {
    if (typeof a === "string") {
      this.ghost.setHtml(a)
    } else {
      this.ghost.setHtml("");
      a.style.margin = "0";
      this.ghost.dom.appendChild(a)
    }
    var b = this.ghost.dom.firstChild;
    if (b) {
      Ext.fly(b).setStyle("float", "none")
    }
  },
  getGhost: function() {
    return this.ghost
  },
  hide: function(a) {
    Ext.Component.prototype.hide.call(this);
    if (a) {
      this.reset(true)
    }
  },
  stop: function() {
    if (this.anim && this.anim.isAnimated && this.anim.isAnimated()) {
      this.anim.stop()
    }
  },
  sync: function() {
    this.el.syncUnderlays()
  },
  repair: function(c, d, a) {
    var b = this;
    b.callback = d;
    b.scope = a;
    if (c && b.animRepair !== false) {
      b.el.addCls(b.repairCls);
      b.el.setUnderlaysVisible(false);
      b.anim = b.el.animate({
        duration: b.repairDuration || 500,
        easing: "ease-out",
        to: {
          x: c[0],
          y: c[1]
        },
        stopAnimation: true,
        callback: b.afterRepair,
        scope: b
      })
    } else {
      b.afterRepair()
    }
  },
  afterRepair: function() {
    var a = this;
    a.hide(true);
    a.el.removeCls(a.repairCls);
    if (typeof a.callback === "function") {
      a.callback.call(a.scope || a)
    }
    delete a.callback;
    delete a.scope
  }
}, 1, 0, ["component", "box"], {
  component: true,
  box: true
}, 0, 0, [Ext.dd, "StatusProxy"], 0));
(Ext.cmd.derive("Ext.dd.DragSource", Ext.dd.DDProxy, {
  dropAllowed: "x-dd-drop-ok",
  dropNotAllowed: "x-dd-drop-nodrop",
  animRepair: true,
  repairHighlightColor: "c3daf9",
  constructor: function(b, a) {
    this.el = Ext.get(b);
    if (!this.dragData) {
      this.dragData = {}
    }
    Ext.apply(this, a);
    if (!this.proxy) {
      this.proxy = new Ext.dd.StatusProxy({
        id: this.el.id + "-drag-status-proxy",
        animRepair: this.animRepair
      })
    }
    Ext.dd.DDProxy.prototype.constructor.call(this, this.el.dom, this.ddGroup ||
      this.group, {
        dragElId: this.proxy.id,
        resizeFrame: false,
        isTarget: false,
        scroll: this.scroll === true
      });
    this.dragging = false
  },
  getDragData: function(a) {
    return this.dragData
  },
  onDragEnter: function(c, d) {
    var b = Ext.dd.DragDropManager.getDDById(d),
      a;
    this.cachedTarget = b;
    if (this.beforeDragEnter(b, c, d) !== false) {
      if (b.isNotifyTarget) {
        a = b.notifyEnter(this, c, this.dragData);
        this.proxy.setStatus(a)
      } else {
        this.proxy.setStatus(this.dropAllowed)
      }
      if (this.afterDragEnter) {
        this.afterDragEnter(b, c, d)
      }
    }
  },
  beforeDragEnter: function(b, a, c) {
    return true
  },
  onDragOver: function(c, d) {
    var b = this.cachedTarget || Ext.dd.DragDropManager.getDDById(d),
      a;
    if (this.beforeDragOver(b, c, d) !== false) {
      if (b.isNotifyTarget) {
        a = b.notifyOver(this, c, this.dragData);
        this.proxy.setStatus(a)
      }
      if (this.afterDragOver) {
        this.afterDragOver(b, c, d)
      }
    }
  },
  beforeDragOver: function(b, a, c) {
    return true
  },
  onDragOut: function(b, c) {
    var a = this.cachedTarget || Ext.dd.DragDropManager.getDDById(c);
    if (this.beforeDragOut(a, b, c) !== false) {
      if (a.isNotifyTarget) {
        a.notifyOut(this, b, this.dragData)
      }
      this.proxy.reset();
      if (this.afterDragOut) {
        this.afterDragOut(a, b, c)
      }
    }
    this.cachedTarget = null
  },
  beforeDragOut: function(b, a, c) {
    return true
  },
  onDragDrop: function(b, c) {
    var a = this.cachedTarget || Ext.dd.DragDropManager.getDDById(c);
    if (this.beforeDragDrop(a, b, c) !== false) {
      if (a.isNotifyTarget) {
        if (a.notifyDrop(this, b, this.dragData) !== false) {
          this.onValidDrop(a, b, c)
        } else {
          this.onInvalidDrop(a, b, c)
        }
      } else {
        this.onValidDrop(a, b, c)
      }
      if (this.afterDragDrop) {
        this.afterDragDrop(a, b, c)
      }
    }
    delete this.cachedTarget
  },
  beforeDragDrop: function(b, a, c) {
    return true
  },
  onValidDrop: function(b, a, c) {
    this.hideProxy();
    if (this.afterValidDrop) {
      this.afterValidDrop(b, a, c)
    }
  },
  getRepairXY: function(b, a) {
    return this.el.getXY()
  },
  onInvalidDrop: function(c, b, d) {
    var a = this;
    if (!b) {
      b = c;
      c = null;
      d = b.getTarget().id
    }
    if (a.beforeInvalidDrop(c, b, d) !== false) {
      if (a.cachedTarget) {
        if (a.cachedTarget.isNotifyTarget) {
          a.cachedTarget.notifyOut(a, b, a.dragData)
        }
        a.cacheTarget = null
      }
      a.proxy.repair(a.getRepairXY(b, a.dragData), a.afterRepair, a);
      if (a.afterInvalidDrop) {
        a.afterInvalidDrop(b, d)
      }
    }
  },
  afterRepair: function() {
    var a = this;
    if (Ext.enableFx) {
      a.el.highlight(a.repairHighlightColor)
    }
    a.dragging = false
  },
  beforeInvalidDrop: function(b, a, c) {
    return true
  },
  handleMouseDown: function(b) {
    if (this.dragging) {
      return
    }
    var a = this.getDragData(b);
    if (a && this.onBeforeDrag(a, b) !== false) {
      this.dragData = a;
      this.proxy.stop();
      Ext.dd.DDProxy.prototype.handleMouseDown.apply(this, arguments)
    }
  },
  onBeforeDrag: function(a, b) {
    return true
  },
  onStartDrag: Ext.emptyFn,
  alignElWithMouse: function() {
    this.proxy.ensureAttachedToBody(true);
    return Ext.dd.DDProxy.prototype.alignElWithMouse.apply(this,
      arguments)
  },
  startDrag: function(a, b) {
    this.proxy.reset();
    this.proxy.hidden = false;
    this.dragging = true;
    this.proxy.update("");
    this.onInitDrag(a, b);
    this.proxy.show()
  },
  onInitDrag: function(a, c) {
    var b = this.el.dom.cloneNode(true);
    b.id = Ext.id();
    this.proxy.update(b);
    this.onStartDrag(a, c);
    return true
  },
  getProxy: function() {
    return this.proxy
  },
  hideProxy: function() {
    this.proxy.hide();
    this.proxy.reset(true);
    this.dragging = false
  },
  triggerCacheRefresh: function() {
    Ext.dd.DDM.refreshCache(this.groups)
  },
  b4EndDrag: function(a) {},
  endDrag: function(a) {
    this.onEndDrag(this.dragData, a)
  },
  onEndDrag: function(a, b) {},
  autoOffset: function(a, b) {
    this.setDelta(-12, -20)
  },
  destroy: function() {
    Ext.dd.DDProxy.prototype.destroy.call(this);
    Ext.destroy(this.proxy)
  }
}, 1, 0, 0, 0, 0, 0, [Ext.dd, "DragSource"], 0));
(Ext.cmd.derive("Ext.panel.Proxy", Ext.Base, {
  alternateClassName: "Ext.dd.PanelProxy",
  moveOnDrag: true,
  constructor: function(a, b) {
    var c = this;
    c.panel = a;
    c.id = c.panel.id + "-ddproxy";
    Ext.apply(c, b)
  },
  insertProxy: true,
  setStatus: Ext.emptyFn,
  reset: Ext.emptyFn,
  update: Ext.emptyFn,
  stop: Ext.emptyFn,
  sync: Ext.emptyFn,
  getEl: function() {
    return this.ghost.el
  },
  getGhost: function() {
    return this.ghost
  },
  getProxy: function() {
    return this.proxy
  },
  hide: function() {
    var a = this;
    if (a.ghost) {
      if (a.proxy) {
        a.proxy.destroy();
        delete a.proxy
      }
      a.panel.unghost(null, a.moveOnDrag);
      delete a.ghost
    }
  },
  show: function() {
    var b = this,
      a;
    if (!b.ghost) {
      a = b.panel.getSize();
      b.panel.el.setVisibilityMode(Ext.Element.DISPLAY);
      b.ghost = b.panel.ghost();
      if (b.insertProxy) {
        b.proxy = b.panel.el.insertSibling({
          role: "presentation",
          cls: "x-panel-dd-spacer"
        });
        b.proxy.setSize(a)
      }
    }
  },
  repair: function(b, c, a) {
    this.hide();
    Ext.callback(c, a || this)
  },
  moveProxy: function(a, b) {
    if (this.proxy) {
      a.insertBefore(this.proxy.dom, b)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.panel, "Proxy", Ext.dd, "PanelProxy"], 0));
(Ext.cmd.derive("Ext.panel.DD", Ext.dd.DragSource, {
  constructor: function(b, a) {
    var c = this;
    c.panel = b;
    c.dragData = {
      panel: b
    };
    c.panelProxy = new Ext.panel.Proxy(b, a);
    c.proxy = c.panelProxy.proxy;
    Ext.dd.DragSource.prototype.constructor.call(this, b.el, a);
    c.setupEl(b)
  },
  setupEl: function(a) {
    var c = this,
      d = a.header,
      b = a.body;
    if (d) {
      c.setHandleElId(d.id);
      b = d.el
    }
    if (b) {
      b.setStyle("cursor", "move");
      c.scroll = false
    } else {
      a.on("boxready", c.setupEl, c, {
        single: true
      })
    }
  },
  showFrame: Ext.emptyFn,
  startDrag: Ext.emptyFn,
  b4StartDrag: function(a, b) {
    this.panelProxy.show()
  },
  b4MouseDown: function(c) {
    var b = c.getXY(),
      a = b[0],
      d = b[1];
    this.autoOffset(a, d)
  },
  onInitDrag: function(a, b) {
    this.onStartDrag(a, b);
    return true
  },
  createFrame: Ext.emptyFn,
  getDragEl: function(b) {
    var a = this.panelProxy.ghost;
    if (a) {
      return a.el.dom
    }
  },
  endDrag: function(a) {
    this.panelProxy.hide();
    this.panel.saveState()
  },
  autoOffset: function(a, b) {
    a -= this.startPageX;
    b -= this.startPageY;
    this.setDelta(a, b)
  },
  onInvalidDrop: function(c, b, d) {
    var a = this;
    if (a.beforeInvalidDrop(c, b, d) !== false) {
      if (a.cachedTarget) {
        if (a.cachedTarget.isNotifyTarget) {
          a.cachedTarget.notifyOut(a, b, a.dragData)
        }
        a.cacheTarget = null
      }
      if (a.afterInvalidDrop) {
        a.afterInvalidDrop(b, d)
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.panel, "DD"], 0));
(Ext.cmd.derive("Ext.layout.component.Dock", Ext.layout.component.Component, {
  alternateClassName: "Ext.layout.component.AbstractDock",
  type: "dock",
  horzAxisProps: {
    name: "horz",
    oppositeName: "vert",
    dockBegin: "left",
    dockEnd: "right",
    horizontal: true,
    marginBegin: "margin-left",
    maxSize: "maxWidth",
    minSize: "minWidth",
    pos: "x",
    setSize: "setWidth",
    shrinkWrapDock: "shrinkWrapDockWidth",
    size: "width",
    sizeModel: "widthModel"
  },
  vertAxisProps: {
    name: "vert",
    oppositeName: "horz",
    dockBegin: "top",
    dockEnd: "bottom",
    horizontal: false,
    marginBegin: "margin-top",
    maxSize: "maxHeight",
    minSize: "minHeight",
    pos: "y",
    setSize: "setHeight",
    shrinkWrapDock: "shrinkWrapDockHeight",
    size: "height",
    sizeModel: "heightModel"
  },
  initializedBorders: -1,
  horizontalCollapsePolicy: {
    width: true,
    x: true
  },
  verticalCollapsePolicy: {
    height: true,
    y: true
  },
  finishRender: function() {
    var b = this,
      c, a;
    Ext.layout.component.Component.prototype.finishRender.call(this);
    c = b.getRenderTarget();
    a = b.getDockedItems();
    b.finishRenderItems(c, a)
  },
  isItemBoxParent: function(a) {
    return true
  },
  isItemShrinkWrap: function(a) {
    return true
  },
  noBorderClasses: ["x-docked-noborder-top", "x-docked-noborder-right",
    "x-docked-noborder-bottom", "x-docked-noborder-left"
  ],
  noBorderClassesSides: {
    top: "x-docked-noborder-top",
    right: "x-docked-noborder-right",
    bottom: "x-docked-noborder-bottom",
    left: "x-docked-noborder-left"
  },
  borderWidthProps: {
    top: "border-top-width",
    right: "border-right-width",
    bottom: "border-bottom-width",
    left: "border-left-width"
  },
  _itemCls: "x-docked",
  handleItemBorders: function() {
    var l = this,
      a = l.owner,
      k, p, g = l.lastDockedItems,
      f = l.borders,
      b = a.dockedItems.generation,
      c = l.noBorderClassesSides,
      m = l.borderWidthProps,
      e, j, o, n, h, d = l.collapsed;
    if (l.initializedBorders === b || (a.border && !a.manageBodyBorders) ||
      (a.collapsed && a.collapseMode === "mini")) {
      return
    }
    l.initializedBorders = b;
    l.collapsed = false;
    l.lastDockedItems = p = l.getLayoutItems();
    l.collapsed = d;
    k = {
      top: [],
      right: [],
      bottom: [],
      left: []
    };
    for (e = 0, j = p.length; e < j; e++) {
      o = p[e];
      n = o.dock;
      if (o.ignoreBorderManagement) {
        continue
      }
      if (!k[n].satisfied) {
        k[n].push(o);
        k[n].satisfied = true
      }
      if (!k.top.satisfied && n !== "bottom") {
        k.top.push(o)
      }
      if (!k.right.satisfied && n !== "left") {
        k.right.push(o)
      }
      if (!k.bottom.satisfied && n !== "top") {
        k.bottom.push(o)
      }
      if (!k.left.satisfied && n !== "right") {
        k.left.push(o)
      }
    }
    if (g) {
      for (e = 0, j = g.length; e < j; e++) {
        o = g[e];
        if (!o.destroyed && !o.ignoreBorderManagement && !a.manageBodyBorders) {
          o.removeCls(l.noBorderClasses)
        }
      }
    }
    if (f) {
      for (h in f) {
        if (a.manageBodyBorders && f[h].satisfied) {
          a.setBodyStyle(m[h], "")
        }
      }
    }
    for (h in k) {
      j = k[h].length;
      if (!a.manageBodyBorders) {
        for (e = 0; e < j; e++) {
          k[h][e].addCls(c[h])
        }
        if ((!k[h].satisfied && !a.bodyBorder) || a.bodyBorder === false) {
          a.addBodyCls(c[h])
        } else {
          a.removeBodyCls(c[h])
        }
      } else {
        if (k[h].satisfied) {
          a.setBodyStyle(m[h], "1px")
        }
      }
    }
    l.borders = k
  },
  beforeLayoutCycle: function(f) {
    var c = this,
      b = c.owner,
      g = c.sizeModels.shrinkWrap,
      e = b.shrinkWrapDock,
      d, a;
    if (b.collapsed) {
      if (b.collapsedVertical()) {
        a = true;
        f.measureDimensions = 1
      } else {
        d = true;
        f.measureDimensions = 2
      }
    }
    f.collapsedVert = a;
    f.collapsedHorz = d;
    if (a) {
      f.heightModel = g
    } else {
      if (d) {
        f.widthModel = g
      }
    }
    e = e === true ? 3 : (e || 0);
    f.shrinkWrapDockHeight = (e & 1) && f.heightModel.shrinkWrap;
    f.shrinkWrapDockWidth = (e & 2) && f.widthModel.shrinkWrap
  },
  beginLayout: function(d) {
    var k = this,
      c = k.owner,
      o = k.getLayoutItems(),
      b = d.context,
      f = o.length,
      j = k.lastCollapsedState,
      l, h, n, a, e, g, m;
    Ext.layout.component.Component.prototype.beginLayout.apply(this,
      arguments);
    g = c.getCollapsed();
    if (g !== j && j !== undefined) {
      if (k.owner.collapsed) {
        d.isCollapsingOrExpanding = 1;
        c.addClsWithUI(c.collapsedCls)
      } else {
        d.isCollapsingOrExpanding = 2;
        c.removeClsWithUI(c.collapsedCls);
        d.lastCollapsedState = k.lastCollapsedState
      }
    }
    k.lastCollapsedState = g;
    d.dockedItems = l = [];
    for (h = 0; h < f; h++) {
      n = o[h];
      if (n.rendered) {
        m = n.dock;
        a = b.getCmp(n);
        a.dockedAt = {
          x: 0,
          y: 0
        };
        a.offsets = e = Ext.Element.parseBox(n.offsets || 0);
        a.horizontal = m === "top" || m === "bottom";
        e.width = e.left + e.right;
        e.height = e.top + e.bottom;
        l.push(a)
      }
    }
    d.bodyContext = d.getEl("body")
  },
  beginLayoutCycle: function(b) {
    var e = this,
      k = b.dockedItems,
      d = k.length,
      a = e.owner,
      f = a.frameBody,
      j = e.lastHeightModel,
      c, h, g;
    Ext.layout.component.Component.prototype.beginLayoutCycle.apply(this,
      arguments);
    if (e.owner.manageHeight) {
      if (e.lastBodyDisplay) {
        a.body.dom.style.display = e.lastBodyDisplay = ""
      }
    } else {
      if (e.lastBodyDisplay !== "inline-block") {
        a.body.dom.style.display = e.lastBodyDisplay = "inline-block"
      }
      if (j && j.shrinkWrap && !b.heightModel.shrinkWrap) {
        a.body.dom.style.marginBottom = ""
      }
    }
    if (b.widthModel.auto) {
      if (b.widthModel.shrinkWrap) {
        a.el.setWidth(null)
      }
      a.body.setWidth(null);
      if (f) {
        f.setWidth(null)
      }
    }
    if (b.heightModel.auto) {
      a.body.setHeight(null);
      if (f) {
        f.setHeight(null)
      }
    }
    if (b.collapsedVert) {
      b.setContentHeight(0)
    } else {
      if (b.collapsedHorz) {
        b.setContentWidth(0)
      }
    }
    for (c = 0; c < d; c++) {
      h = k[c].target;
      g = h.dock;
      if (g === "right") {
        h.setLocalX(0)
      } else {
        if (g !== "left") {
          continue
        }
      }
    }
  },
  calculate: function(d) {
    var k = this,
      c = k.measureAutoDimensions(d, d.measureDimensions),
      b = d.state,
      j = b.horzDone,
      e = b.vertDone,
      f = d.bodyContext,
      i, a, h, g, l;
    d.borderInfo || d.getBorderInfo();
    d.paddingInfo || d.getPaddingInfo();
    d.frameInfo || d.getFrameInfo();
    f.borderInfo || f.getBorderInfo();
    f.paddingInfo || f.getPaddingInfo();
    if (!d.frameBorder) {
      if (!(i = d.framing)) {
        d.frameBorder = d.borderInfo;
        d.framePadding = d.paddingInfo
      } else {
        d.frameBorder = i.border;
        d.framePadding = i.padding
      }
    }
    a = !j && k.createAxis(d, c.contentWidth, d.widthModel, k.horzAxisProps,
      d.collapsedHorz);
    h = !e && k.createAxis(d, c.contentHeight, d.heightModel, k.vertAxisProps,
      d.collapsedVert);
    for (g = 0, l = d.dockedItems.length; l--; ++g) {
      if (a) {
        k.dockChild(d, a, l, g)
      }
      if (h) {
        k.dockChild(d, h, l, g)
      }
    }
    if (a && k.finishAxis(d, a)) {
      b.horzDone = j = a
    }
    if (h && k.finishAxis(d, h)) {
      b.vertDone = e = h
    }
    if (j && e && k.finishConstraints(d, j, e)) {
      k.finishPositions(d, j, e)
    } else {
      k.done = false
    }
  },
  createAxis: function(o, i, e, l, d) {
    var t = this,
      s = 0,
      b = t.owner,
      f = b[l.maxSize],
      c = b[l.minSize] || 0,
      m = l.dockBegin,
      h = l.dockEnd,
      q = l.pos,
      k = l.size,
      j = f != null,
      n = e.shrinkWrap,
      a, r, p, g;
    if (n) {
      if (d) {
        g = 0
      } else {
        a = o.bodyContext;
        g = i + a.borderInfo[k]
      }
    } else {
      r = o.frameBorder;
      p = o.framePadding;
      s = r[m] + p[m];
      g = o.getProp(k) - (r[h] + p[h])
    }
    return {
      shrinkWrap: e.shrinkWrap,
      sizeModel: e,
      initialBegin: s,
      begin: s,
      end: g,
      collapsed: d,
      horizontal: l.horizontal,
      ignoreFrameBegin: null,
      ignoreFrameEnd: null,
      initialSize: g - s,
      maxChildSize: 0,
      hasMinMaxConstraints: (c || j) && e.shrinkWrap,
      minSize: c,
      maxSize: j ? f : 1000000000,
      bodyPosProp: t.owner.manageHeight ? q : l.marginBegin,
      dockBegin: m,
      dockEnd: h,
      posProp: q,
      sizeProp: k,
      setSize: l.setSize,
      shrinkWrapDock: o[l.shrinkWrapDock],
      sizeModelName: l.sizeModel,
      dockedPixelsEnd: 0
    }
  },
  dockChild: function(b, c, k, e) {
    var f = this,
      a = b.dockedItems[c.shrinkWrap ? k : e],
      h = a.target,
      i = h.dock,
      d = c.sizeProp,
      g, j;
    if (h.ignoreParentFrame && b.isCollapsingOrExpanding) {
      a.clearMarginCache()
    }
    if (!a.marginInfo) {
      a.getMarginInfo()
    }
    if (i === c.dockBegin) {
      if (c.shrinkWrap) {
        g = f.dockOutwardBegin(b, a, h, c)
      } else {
        g = f.dockInwardBegin(b, a, h, c)
      }
    } else {
      if (i === c.dockEnd) {
        if (c.shrinkWrap) {
          g = f.dockOutwardEnd(b, a, h, c)
        } else {
          g = f.dockInwardEnd(b, a, h, c)
        }
      } else {
        if (c.shrinkWrapDock) {
          j = a.getProp(d) + a.marginInfo[d];
          c.maxChildSize = Math.max(c.maxChildSize, j);
          g = 0
        } else {
          g = f.dockStretch(b, a, h, c)
        }
      }
    }
    a.dockedAt[c.posProp] = g
  },
  dockInwardBegin: function(b, a, i, d) {
    var f = d.begin,
      e = d.sizeProp,
      c = i.ignoreParentFrame,
      g, j, h;
    if (c) {
      d.ignoreFrameBegin = a;
      h = i.dock;
      g = b.frameBorder[h];
      f -= g + b.framePadding[h]
    }
    if (!i.overlay) {
      j = a.getProp(e) + a.marginInfo[e];
      d.begin += j;
      if (c) {
        d.begin -= g
      }
    }
    return f
  },
  dockInwardEnd: function(e, d, c, b) {
    var h = b.sizeProp,
      a = d.getProp(h) + d.marginInfo[h],
      g = b.end - a,
      f;
    if (!c.overlay) {
      b.end = g
    }
    if (c.ignoreParentFrame) {
      b.ignoreFrameEnd = d;
      f = e.frameBorder[c.dock];
      g += f + e.framePadding[c.dock];
      b.end += f
    }
    return g
  },
  dockOutwardBegin: function(e, d, c, b) {
    var g = b.begin,
      f = b.sizeProp,
      a;
    if (b.collapsed) {
      b.ignoreFrameBegin = b.ignoreFrameEnd = d
    } else {
      if (c.ignoreParentFrame) {
        b.ignoreFrameBegin = d
      }
    }
    if (!c.overlay) {
      a = d.getProp(f) + d.marginInfo[f];
      g -= a;
      b.begin = g
    }
    return g
  },
  dockOutwardEnd: function(e, d, c, b) {
    var g = b.end,
      f = b.sizeProp,
      a;
    a = d.getProp(f) + d.marginInfo[f];
    if (b.collapsed) {
      b.ignoreFrameBegin = b.ignoreFrameEnd = d
    } else {
      if (c.ignoreParentFrame) {
        b.ignoreFrameEnd = d
      }
    }
    if (!c.overlay) {
      b.end = g + a;
      b.dockedPixelsEnd += a
    }
    return g
  },
  dockStretch: function(c, b, l, d) {
    var m = l.dock,
      i = d.sizeProp,
      a = m === "top" || m === "bottom",
      h = c.frameBorder,
      e = b.offsets,
      k = c.framePadding,
      g = a ? "right" : "bottom",
      o = a ? "left" : "top",
      j = d.begin + e[o],
      f, n;
    if (l.stretch !== false) {
      n = d.end - j - e[g];
      if (l.ignoreParentFrame) {
        j -= k[o] + h[o];
        n += k[i] + h[i]
      }
      f = b.marginInfo;
      n -= f[i];
      b[d.setSize](n)
    }
    return j
  },
  finishAxis: function(l, e) {
    if (isNaN(e.maxChildSize)) {
      return false
    }
    var d = e.begin,
      o = e.end - d,
      g = e.collapsed,
      v = e.setSize,
      j = e.dockBegin,
      t = e.dockEnd,
      n = l.framePadding,
      q = l.frameBorder,
      f = q[j],
      r = l.framing,
      m = r && r[j],
      b = g ? 0 : n[j],
      i = e.sizeProp,
      s = e.ignoreFrameBegin,
      p = e.ignoreFrameEnd,
      a = l.bodyContext,
      k = Math.max(f + b - m, 0),
      c, w, u, h;
    if (e.shrinkWrap) {
      w = e.initialSize;
      if (r) {
        u = -d + f + b;
        c = u - m - k
      } else {
        c = -d;
        u = c + b
      }
      if (!g) {
        o += n[i]
      }
      if (s) {
        u -= f;
        c -= f;
        s.dockedAt[e.posProp] -= b
      } else {
        o += f
      }
      if (g) {} else {
        if (p) {
          p.dockedAt[e.posProp] += n[t]
        } else {
          o += q[t]
        }
      }
      e.size = o;
      if (!e.horizontal && !this.owner.manageHeight) {
        h = false
      }
    } else {
      if (r) {
        u = 0;
        c = d - m - k
      } else {
        u = -f;
        c = d - b - f
      }
      w = o
    }
    e.delta = u;
    a[v](w, h);
    a.setProp(e.bodyPosProp, c);
    return !isNaN(o)
  },
  beforeInvalidateShrinkWrapDock: function(c, b) {
    var a = b.axis.sizeModelName;
    if (!c[a].constrainedMin) {
      c[a] = Ext.layout.SizeModel.calculated
    }
  },
  afterInvalidateShrinkWrapDock: function(d, a) {
    var b = a.axis,
      c = a.layout,
      e;
    if (d[b.sizeModelName].calculated) {
      e = c.dockStretch(a.ownerContext, d, d.target, b);
      d.setProp(b.posProp, b.delta + e)
    }
  },
  finishConstraints: function(j, c, o) {
    var r = this,
      q = r.sizeModels,
      n = c.shrinkWrap,
      p = o.shrinkWrap,
      a = r.owner,
      h, l, m, f, g, k, b, d, e, i;
    if (n) {
      k = c.size;
      b = c.collapsed ? 0 : c.minSize;
      d = c.maxSize;
      e = c.maxChildSize;
      i = Math.max(k, e);
      if (i > d) {
        g = q.constrainedMax;
        m = d
      } else {
        if (i < b) {
          g = q.constrainedMin;
          m = b
        } else {
          if (k < e) {
            g = q.constrainedDock;
            a.dockConstrainedWidth = m = e
          } else {
            m = k
          }
        }
      }
    }
    if (p) {
      k = o.size;
      b = o.collapsed ? 0 : o.minSize;
      d = o.maxSize;
      e = o.maxChildSize;
      i = Math.max(k, e + k - o.initialSize);
      if (i > d) {
        f = q.constrainedMax;
        l = d
      } else {
        if (i < b) {
          f = q.constrainedMin;
          l = b
        } else {
          if (k < e) {
            f = q.constrainedDock;
            a.dockConstrainedHeight = l = e
          } else {
            if (!j.collapsedVert && !a.manageHeight) {
              h = false;
              j.bodyContext.setProp("margin-bottom", o.dockedPixelsEnd)
            }
            l = k
          }
        }
      }
    }
    if (g || f) {
      if (g && f && g.constrainedMax && f.constrainedByMin) {
        j.invalidate({
          widthModel: g
        });
        return false
      }
      if (!j.widthModel.calculatedFromShrinkWrap && !j.heightModel.calculatedFromShrinkWrap) {
        j.invalidate({
          widthModel: g,
          heightModel: f
        });
        return false
      }
    } else {
      r.invalidateAxes(j, c, o)
    }
    if (n) {
      j.setWidth(m);
      if (g) {
        j.widthModel = g
      }
    }
    if (p) {
      j.setHeight(l, h);
      if (f) {
        j.heightModel = f
      }
    }
    return true
  },
  invalidateAxes: function(f, a, k) {
    var o = this.beforeInvalidateShrinkWrapDock,
      b = this.afterInvalidateShrinkWrapDock,
      e = a.end - a.begin,
      r = k.initialSize,
      c = a.shrinkWrapDock && a.maxChildSize <= e,
      l = k.shrinkWrapDock && k.maxChildSize <= r,
      p, m, j, d, q, n, g, h;
    if (c || l) {
      if (l) {
        k.begin = k.initialBegin;
        k.end = k.begin + k.initialSize
      }
      p = f.dockedItems;
      for (j = 0, m = p.length; j < m; ++j) {
        d = p[j];
        n = d.horizontal;
        g = null;
        if (c && n) {
          h = a.sizeProp;
          q = e;
          g = a
        } else {
          if (l && !n) {
            h = k.sizeProp;
            q = r;
            g = k
          }
        }
        if (g) {
          q -= d.getMarginInfo()[h];
          if (q !== d.props[h]) {
            d.invalidate({
              before: o,
              after: b,
              axis: g,
              ownerContext: f,
              layout: this
            })
          }
        }
      }
    }
  },
  finishPositions: function(d, a, g) {
    var i = d.dockedItems,
      c = i.length,
      f = a.delta,
      e = g.delta,
      h, b;
    for (h = 0; h < c; ++h) {
      b = i[h];
      b.setProp("x", f + b.dockedAt.x);
      b.setProp("y", e + b.dockedAt.y)
    }
  },
  finishedLayout: function(b) {
    var a = this,
      c = b.target;
    Ext.layout.component.Component.prototype.finishedLayout.apply(this,
      arguments);
    if (!b.animatePolicy) {
      if (b.isCollapsingOrExpanding === 1) {
        c.afterCollapse(false)
      } else {
        if (b.isCollapsingOrExpanding === 2) {
          c.afterExpand(false)
        }
      }
    }
  },
  getAnimatePolicy: function(c) {
    var b = this,
      a, d;
    if (c.isCollapsingOrExpanding === 1) {
      a = b.lastCollapsedState
    } else {
      if (c.isCollapsingOrExpanding === 2) {
        a = c.lastCollapsedState
      }
    }
    if (a === "left" || a === "right") {
      d = b.horizontalCollapsePolicy
    } else {
      if (a === "top" || a === "bottom") {
        d = b.verticalCollapsePolicy
      }
    }
    return d
  },
  getDockedItems: function(c, m) {
    var h = this,
      e = (c === "visual"),
      j = e ? Ext.ComponentQuery.query("[rendered]", h.owner.dockedItems.items) :
      h.owner.dockedItems.items,
      g = j && j.length && c !== false,
      b, l, k, f, d, a;
    if (m == null) {
      k = g && !e ? j.slice() : j
    } else {
      k = [];
      for (f = 0, a = j.length; f < a; ++f) {
        l = j[f].dock;
        d = (l === "top" || l === "left");
        if (m ? d : !d) {
          k.push(j[f])
        }
      }
      g = g && k.length
    }
    if (g) {
      b = (c = c || "render") === "render";
      Ext.Array.sort(k, function(n, i) {
        var o, p;
        if (b && ((o = h.owner.dockOrder[n.dock]) !== (p = h.owner.dockOrder[
            i.dock]))) {
          if (!(o + p)) {
            return o - p
          }
        }
        o = h.getItemWeight(n, c);
        p = h.getItemWeight(i, c);
        if ((o !== undefined) && (p !== undefined)) {
          return o - p
        }
        return 0
      })
    }
    return k || []
  },
  getItemWeight: function(b, a) {
    var c = b.weight || this.owner.defaultDockWeights[b.dock];
    return c[a] || c
  },
  getLayoutItems: function() {
    var e = this,
      b, f, d, c, a;
    if (e.owner.collapsed) {
      a = e.owner.getCollapsedDockedItems()
    } else {
      b = e.getDockedItems("visual");
      f = b.length;
      a = [];
      for (c = 0; c < f; c++) {
        d = b[c];
        if (!d.hidden) {
          a.push(d)
        }
      }
    }
    return a
  },
  measureContentWidth: function(a) {
    var b = a.bodyContext;
    return b.el.getWidth() - b.getBorderInfo().width
  },
  measureContentHeight: function(a) {
    var b = a.bodyContext;
    return b.el.getHeight() - b.getBorderInfo().height
  },
  redoLayout: function(c) {
    var b = this,
      a = b.owner;
    if (c.isCollapsingOrExpanding === 1) {
      if (a.reExpander) {
        a.reExpander.el.show()
      }
      a.addClsWithUI(a.collapsedCls);
      c.redo(true)
    } else {
      if (c.isCollapsingOrExpanding === 2) {
        a.removeClsWithUI(a.collapsedCls);
        c.bodyContext.redo()
      }
    }
  },
  renderChildren: function() {
    var b = this,
      a = b.getDockedItems(),
      c = b.getRenderTarget();
    b.handleItemBorders();
    b.renderItems(a, c)
  },
  renderItems: function(h, g) {
    var j = this,
      a = j.owner,
      m = a.dockedItems,
      b = h.length,
      p = a.body,
      l, n, f, c, k, d, o, e;
    if (b) {
      n = j.getRenderTarget().dom.childNodes;
      f = n.length;
      m = m.map;
      k = 0;
      for (d = 0; d < f; ++d) {
        c = n[d];
        if (c === p.dom) {
          l = d;
          break
        }
        if (m[c.id]) {
          ++k
        }
      }
      l -= k;
      for (d = 0; d < b; ++d) {
        o = h[d];
        e = l + d;
        if (o.dock === "right" || o.dock === "bottom") {
          ++e
        }
        if (!o.rendered) {
          j.renderItem(o, g, e)
        } else {
          if (!j.isValidParent(o, g, e)) {
            j.moveItem(o, g, e)
          }
        }
      }
    }
  },
  undoLayout: function(c) {
    var b = this,
      a = b.owner;
    if (c.isCollapsingOrExpanding === 1) {
      if (a.reExpander) {
        a.reExpander.el.hide()
      }
      a.removeClsWithUI(a.collapsedCls);
      c.undo(true)
    } else {
      if (c.isCollapsingOrExpanding === 2) {
        a.addClsWithUI(a.collapsedCls);
        c.bodyContext.undo()
      }
    }
  },
  sizePolicy: {
    nostretch: {
      setsWidth: 0,
      setsHeight: 0
    },
    horz: {
      shrinkWrap: {
        setsWidth: 1,
        setsHeight: 0,
        readsWidth: 1
      },
      stretch: {
        setsWidth: 1,
        setsHeight: 0
      }
    },
    vert: {
      shrinkWrap: {
        setsWidth: 0,
        setsHeight: 1,
        readsHeight: 1
      },
      stretch: {
        setsWidth: 0,
        setsHeight: 1
      }
    },
    stretchV: {
      setsWidth: 0,
      setsHeight: 1
    },
    autoStretchH: {
      readsWidth: 1,
      setsWidth: 1,
      setsHeight: 0
    },
    autoStretchV: {
      readsHeight: 1,
      setsWidth: 0,
      setsHeight: 1
    }
  },
  getItemSizePolicy: function(d, f) {
    var c = this,
      g = c.sizePolicy,
      e = c.owner.shrinkWrapDock,
      b, a;
    if (d.stretch === false) {
      return g.nostretch
    }
    b = d.dock;
    a = (b === "left" || b === "right");
    e = e === true ? 3 : (e || 0);
    if (a) {
      g = g.vert;
      e = e & 1
    } else {
      g = g.horz;
      e = e & 2
    }
    if (e) {
      if (!f) {
        f = c.owner.getSizeModel()
      }
      if (f[a ? "height" : "width"].shrinkWrap) {
        return g.shrinkWrap
      }
    }
    return g.stretch
  },
  configureItem: function(a, b) {
    Ext.layout.component.Component.prototype.configureItem.apply(this,
      arguments);
    a.addCls(this._itemCls);
    if (!a.ignoreBorderManagement) {
      a.addClsWithUI(this.getDockCls(a.dock))
    }
  },
  getDockCls: function(a) {
    return "docked-" + a
  },
  afterRemove: function(a) {
    var b;
    Ext.layout.component.Component.prototype.afterRemove.apply(this,
      arguments);
    a.removeCls(this._itemCls);
    if (!a.ignoreBorderManagement) {
      a.removeClsWithUI(this.getDockCls(a.dock))
    }
    b = a.el.dom;
    if (!a.destroying && b) {
      b.parentNode.removeChild(b)
    }
    this.childrenChanged = true
  },
  borderCollapseMap: {},
  getBorderCollapseTable: function() {
    var d = this,
      f = d.borderCollapseMap,
      a = d.owner,
      b = a.baseCls,
      e = a.ui,
      c;
    f = f[b] || (f[b] = {});
    c = f[e];
    if (!c) {
      b += "-" + e + "-outer-border-";
      f[e] = c = [0, b + "l", b + "b", b + "bl", b + "r", b + "rl", b +
        "rb", b + "rbl", b + "t", b + "tl", b + "tb", b + "tbl", b +
        "tr", b + "trl", b + "trb", b + "trbl"
      ]
    }
    return c
  }
}, 0, 0, 0, 0, ["layout.dock"], 0, [Ext.layout.component, "Dock", Ext.layout
  .component, "AbstractDock"
], 0));
Ext.define("Ext.theme.neptune.layout.component.Dock", {
  override: "Ext.layout.component.Dock",
  noBorderClassTable: [0, "x-noborder-l", "x-noborder-b", "x-noborder-bl",
    "x-noborder-r", "x-noborder-rl", "x-noborder-rb", "x-noborder-rbl",
    "x-noborder-t", "x-noborder-tl", "x-noborder-tb", "x-noborder-tbl",
    "x-noborder-tr", "x-noborder-trl", "x-noborder-trb",
    "x-noborder-trbl"
  ],
  edgeMasks: {
    top: 8,
    right: 4,
    bottom: 2,
    left: 1
  },
  handleItemBorders: function() {
    var y = this,
      f = 0,
      z = 8,
      A = 4,
      l = 2,
      e = 1,
      a = y.owner,
      s = a.bodyBorder,
      n = a.border,
      j = y.collapsed,
      p = y.edgeMasks,
      k = y.noBorderClassTable,
      x = a.dockedItems.generation,
      w, d, v, h, r, m, u, o, g, q, t, c;
    if (y.initializedBorders === x) {
      return
    }
    t = [];
    c = [];
    d = y.getBorderCollapseTable();
    k = y.getBorderClassTable ? y.getBorderClassTable() : k;
    y.initializedBorders = x;
    y.collapsed = false;
    v = y.getDockedItems("visual");
    y.collapsed = j;
    for (r = 0, m = v.length; r < m; r++) {
      u = v[r];
      if (u.ignoreBorderManagement) {
        continue
      }
      o = u.dock;
      q = h = 0;
      t.length = 0;
      c.length = 0;
      if (o !== "bottom") {
        if (f & z) {
          w = u.border
        } else {
          w = n;
          if (w !== false) {
            h += z
          }
        }
        if (w === false) {
          q += z
        }
      }
      if (o !== "left") {
        if (f & A) {
          w = u.border
        } else {
          w = n;
          if (w !== false) {
            h += A
          }
        }
        if (w === false) {
          q += A
        }
      }
      if (o !== "top") {
        if (f & l) {
          w = u.border
        } else {
          w = n;
          if (w !== false) {
            h += l
          }
        }
        if (w === false) {
          q += l
        }
      }
      if (o !== "right") {
        if (f & e) {
          w = u.border
        } else {
          w = n;
          if (w !== false) {
            h += e
          }
        }
        if (w === false) {
          q += e
        }
      }
      if ((g = u.lastBorderMask) !== q) {
        u.lastBorderMask = q;
        if (g) {
          c[0] = k[g]
        }
        if (q) {
          t[0] = k[q]
        }
      }
      if ((g = u.lastBorderCollapse) !== h) {
        u.lastBorderCollapse = h;
        if (g) {
          c[c.length] = d[g]
        }
        if (h) {
          t[t.length] = d[h]
        }
      }
      if (c.length) {
        u.removeCls(c)
      }
      if (t.length) {
        u.addCls(t)
      }
      f |= p[o]
    }
    q = h = 0;
    t.length = 0;
    c.length = 0;
    if (f & z) {
      w = s
    } else {
      w = n;
      if (w !== false) {
        h += z
      }
    }
    if (w === false) {
      q += z
    }
    if (f & A) {
      w = s
    } else {
      w = n;
      if (w !== false) {
        h += A
      }
    }
    if (w === false) {
      q += A
    }
    if (f & l) {
      w = s
    } else {
      w = n;
      if (w !== false) {
        h += l
      }
    }
    if (w === false) {
      q += l
    }
    if (f & e) {
      w = s
    } else {
      w = n;
      if (w !== false) {
        h += e
      }
    }
    if (w === false) {
      q += e
    }
    if ((g = y.lastBodyBorderMask) !== q) {
      y.lastBodyBorderMask = q;
      if (g) {
        c[0] = k[g]
      }
      if (q) {
        t[0] = k[q]
      }
    }
    if ((g = y.lastBodyBorderCollapse) !== h) {
      y.lastBodyBorderCollapse = h;
      if (g) {
        c[c.length] = d[g]
      }
      if (h) {
        t[t.length] = d[h]
      }
    }
    if (c.length) {
      a.removeBodyCls(c)
    }
    if (t.length) {
      a.addBodyCls(t)
    }
  },
  onRemove: function(d) {
    var c = this,
      b = d.lastBorderMask,
      a = d.lastBorderCollapse;
    if (!d.destroyed && !d.ignoreBorderManagement) {
      if (b) {
        d.lastBorderMask = 0;
        d.removeCls(c.noBorderClassTable[b])
      }
      if (a) {
        d.lastBorderCollapse = 0;
        d.removeCls(c.getBorderCollapseTable()[a])
      }
    }(arguments.callee.$previous || Ext.layout.component.Component.prototype
      .onRemove).call(this, d)
  }
});
(Ext.cmd.derive("Ext.util.Memento", Ext.Base, (function() {
  function d(h, g, i, f) {
    h[f ? f + i : i] = g[i]
  }

  function c(g, f, h) {
    delete g[h]
  }

  function e(j, i, k, h) {
    var f = h ? h + k : k,
      g = j[f];
    if (g || j.hasOwnProperty(f)) {
      a(i, k, g)
    }
  }

  function a(g, h, f) {
    if (Ext.isDefined(f)) {
      g[h] = f
    } else {
      delete g[h]
    }
  }

  function b(g, l, k, h, i) {
    if (l) {
      if (Ext.isArray(h)) {
        var j, f = h.length;
        for (j = 0; j < f; j++) {
          g(l, k, h[j], i)
        }
      } else {
        g(l, k, h, i)
      }
    }
  }
  return {
    data: null,
    target: null,
    constructor: function(g, f) {
      this.data = {};
      if (g) {
        this.target = g;
        if (f) {
          this.capture(f)
        }
      }
    },
    capture: function(f, i, h) {
      var g = this;
      b(d, g.data || (g.data = {}), i || g.target, f, h)
    },
    remove: function(f) {
      b(c, this.data, null, f)
    },
    restore: function(g, f, i, h) {
      b(e, this.data, i || this.target, g, h);
      if (f !== false) {
        this.remove(g)
      }
    },
    restoreAll: function(f, j) {
      var h = this,
        g = j || this.target,
        i = h.data,
        k;
      f = f !== false;
      for (k in i) {
        if (i.hasOwnProperty(k)) {
          a(g, k, i[k]);
          if (f) {
            delete i[k]
          }
        }
      }
    }
  }
}()), 1, 0, 0, 0, 0, 0, [Ext.util, "Memento"], 0));
(Ext.cmd.derive("Ext.container.DockingContainer", Ext.Base, {
  isDockingContainer: true,
  defaultDockWeights: {
    top: {
      render: 1,
      visual: 1
    },
    left: {
      render: 3,
      visual: 5
    },
    right: {
      render: 5,
      visual: 7
    },
    bottom: {
      render: 7,
      visual: 3
    }
  },
  dockOrder: {
    top: -1,
    left: -1,
    right: 1,
    bottom: 1
  },
  horizontalDocks: 0,
  tabGuard: false,
  tabGuardTpl: '<div id="{id}-{tabGuardEl}" data-ref="{tabGuardEl}" tabIndex="0" class="x-tab-guard x-tab-guard-{tabGuard}" ></div>',
  addDocked: function(f, j) {
    var h = this,
      b = h.rendered,
      c = 0,
      k = h.dockedItems,
      d = k.getCount(),
      e, g, l, a;
    f = h.prepareItems(f);
    a = f.length;
    if (b) {
      Ext.suspendLayouts()
    }
    if (j === undefined) {
      j = d
    } else {
      j = Math.min(j, d)
    }
    for (; c < a; c++) {
      l = f[c];
      l.dock = l.dock || "top";
      if (l.dock === "left" || l.dock === "right") {
        h.horizontalDocks++
      }
      e = j + c;
      k.insert(e, l);
      g = !!l.instancedCmp;
      delete l.instancedCmp;
      l.onAdded(h, e, g);
      delete l.$initParent;
      if (h.onDockedAdd !== Ext.emptyFn) {
        h.onDockedAdd(l)
      }
      if (h.hasListeners.dockedadd) {
        h.fireEvent("dockedadd", h, l, e)
      }
    }
    if (h.rendered) {
      h.updateLayout();
      Ext.resumeLayouts(true)
    }
    return f
  },
  destroyDockedItems: function() {
    var a = this.dockedItems,
      b;
    if (a) {
      while ((b = a.first())) {
        this.removeDocked(b, true)
      }
    }
  },
  doRenderDockedItems: function(d, g, h) {
    var f = g.$comp,
      e = f.componentLayout,
      c = f.tabGuard && f.getTpl("tabGuardTpl"),
      b, a;
    if (e.getDockedItems && !g.$skipDockedItems) {
      if (c && !h) {
        g.tabGuard = "before";
        f.addChildEl(g.tabGuardEl = "tabGuardBeforeEl");
        c.applyOut(g, d)
      }
      b = e.getDockedItems("render", !h);
      a = b && e.getItemsRenderTree(b);
      if (a) {
        Ext.DomHelper.generateMarkup(a, d)
      }
      if (c && h) {
        g.tabGuard = "after";
        f.addChildEl(g.tabGuardEl = "tabGuardAfterEl");
        c.applyOut(g, d)
      }
    }
  },
  getDockedComponent: function(a) {
    if (Ext.isObject(a)) {
      a = a.getItemId()
    }
    return this.dockedItems.get(a)
  },
  getDockedItems: function(a, c) {
    var b = this.getComponentLayout().getDockedItems("render", c);
    if (a && b.length) {
      b = Ext.ComponentQuery.query(a, b)
    }
    return b
  },
  getDockingRefItems: function(b, e) {
    var a = b && "*,* *",
      d = this.getDockedItems(a, true),
      c;
    d.push.apply(d, e);
    c = this.getDockedItems(a, false);
    d.push.apply(d, c);
    return d
  },
  initDockingItems: function() {
    var b = this,
      a = b.dockedItems;
    if (!a || !a.isMixedCollection) {
      b.dockedItems = new Ext.util.ItemCollection();
      if (a) {
        b.addDocked(a)
      }
    }
  },
  insertDocked: function(b, a) {
    this.addDocked(a, b)
  },
  onDockedAdd: Ext.emptyFn,
  onDockedRemove: Ext.emptyFn,
  removeDocked: function(e, b) {
    var d = this,
      c, a;
    b = b === true || (b !== false && d.autoDestroy);
    if (!d.dockedItems.contains(e)) {
      return e
    }
    if (e.dock === "left" || e.dock === "right") {
      d.horizontalDocks--
    }
    c = d.componentLayout;
    a = c && d.rendered;
    if (a) {
      c.onRemove(e)
    }
    d.dockedItems.remove(e);
    e.onRemoved(e.destroying || b);
    d.onDockedRemove(e);
    if (b) {
      e.destroy()
    } else {
      if (a) {
        c.afterRemove(e)
      }
    }
    if (d.hasListeners.dockedremove) {
      d.fireEvent("dockedremove", d, e)
    }
    if (!d.destroying) {
      d.updateLayout()
    }
    return e
  },
  moveDocked: function(c, a) {
    var b = this;
    if (b.rendered) {
      Ext.suspendLayouts()
    }
    b.removeDocked(c, false);
    c.dock = a;
    b.addDocked(c);
    if (b.rendered) {
      if (c.frame) {
        Ext.getDetachedBody().appendChild(c.el);
        c.updateFrame()
      }
      Ext.resumeLayouts(true)
    }
  },
  setupDockingRenderTpl: function(a) {
    a.renderDockedItems = this.doRenderDockedItems
  }
}, 0, 0, 0, 0, 0, 0, [Ext.container, "DockingContainer"], 0));
(Ext.cmd.derive("Ext.panel.Panel", Ext.container.Container, {
  alternateClassName: "Ext.Panel",
  childEls: ["body"],
  renderTpl: ['<tpl if="headingText">',
    '<div id="{id}-headingEl" data-ref="headingEl" role="heading"',
    ' class="', "x-", 'hidden-clip" style="height:0">', "{headingText}",
    "</div>", "</tpl>", "{% this.renderDockedItems(out,values,0); %}",
    '<div id="{id}-body" data-ref="body" class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl>',
    ' {baseCls}-body-{ui}<tpl if="uiCls">',
    '<tpl for="uiCls"> {parent.baseCls}-body-{parent.ui}-{.}</tpl>',
    '</tpl>{childElCls}"', '<tpl if="bodyAriaAttributes">',
    '<tpl foreach="bodyAriaAttributes"> {$}="{.}"</tpl>', "<tpl else>",
    ' role="presentation"', "</tpl>",
    '<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
    "{%this.renderContainer(out,values);%}", "</div>",
    "{% this.renderDockedItems(out,values,1); %}"
  ],
  headerPosition: "top",
  iconAlign: "left",
  titleAlign: "left",
  titleRotation: "default",
  beforeRenderConfig: {
    glyph: null,
    headerPosition: null,
    icon: null,
    iconAlign: null,
    iconCls: null,
    title: null,
    titleAlign: null,
    titleRotation: null
  },
  animCollapse: Ext.enableFx,
  border: true,
  closable: false,
  closeAction: "destroy",
  closeToolText: "Close panel",
  collapsed: false,
  collapsedCls: "collapsed",
  collapseFirst: true,
  collapsible: undefined,
  collapseToolText: "Collapse panel",
  expandToolText: "Expand panel",
  constrain: false,
  constrainHeader: false,
  dockedItems: null,
  tbar: null,
  bbar: null,
  fbar: null,
  lbar: null,
  rbar: null,
  buttons: null,
  floatable: true,
  frame: false,
  frameHeader: true,
  hideCollapseTool: false,
  manageHeight: true,
  maskElement: "el",
  minButtonWidth: 75,
  preventHeader: false,
  shrinkWrapDock: false,
  titleCollapse: undefined,
  baseCls: "x-panel",
  bodyPosProps: {
    x: "x",
    y: "y"
  },
  componentLayout: "dock",
  contentPaddingProperty: "bodyPadding",
  emptyArray: [],
  isPanel: true,
  defaultBindProperty: "title",
  addBodyCls: function(b) {
    var c = this,
      a = c.rendered ? c.body : c.getProtoBody();
    a.addCls(b);
    return c
  },
  addTool: function(e) {
    if (!Ext.isArray(e)) {
      e = [e]
    }
    var d = this,
      g = d.header,
      a = e.length,
      f = d.tools,
      c, b;
    if (!g || !g.isHeader) {
      g = null;
      if (!f) {
        d.tools = f = []
      }
    }
    for (c = 0; c < a; c++) {
      b = e[c];
      b.toolOwner = d;
      if (g) {
        g.addTool(b)
      } else {
        f.push(b)
      }
    }
    d.updateHeader()
  },
  addTools: Ext.emptyFn,
  setCollapsible: function(c) {
    var b = this,
      d = b.collapsible,
      a = b.collapseTool;
    b.collapsible = c;
    if (c && !d) {
      b.updateCollapseTool();
      a = b.collapseTool;
      if (a) {
        a.show()
      }
    } else {
      if (!c && d) {
        if (a) {
          a.hide()
        }
      }
    }
  },
  addUIClsToElement: function(b) {
    var c = this,
      a = Ext.container.Container.prototype.addUIClsToElement.apply(this,
        arguments);
    c.addBodyCls(["x-" + b, c.baseCls + "-body-" + b, c.baseCls +
      "-body-" + c.ui + "-" + b
    ]);
    return a
  },
  afterCollapse: function(c) {
    var b = this,
      a = b.ariaEl.dom,
      d = b.ownerLayout;
    b.isCollapsingOrExpanding = 0;
    b.updateCollapseTool();
    if (c) {
      b.removeCls("x-animating-size")
    }
    if (d) {
      d.afterCollapse(b, c)
    }
    if (a) {
      a.setAttribute("aria-expanded", false)
    }
    if (b.isAccordionPanel) {
      b.body.dom.setAttribute("aria-hidden", true)
    }
    b.setHiddenDocked();
    b.fireEvent("collapse", b)
  },
  afterExpand: function(c) {
    var b = this,
      a = b.ariaEl.dom,
      d = b.ownerLayout;
    b.isCollapsingOrExpanding = 0;
    b.updateCollapseTool();
    if (c) {
      b.removeCls("x-animating-size")
    }
    if (d) {
      d.afterExpand(b, c)
    }
    if (a) {
      a.setAttribute("aria-expanded", true)
    }
    if (b.isAccordionPanel) {
      b.body.dom.setAttribute("aria-hidden", false)
    }
    b.fireEvent("expand", b);
    b.fireHierarchyEvent("expand")
  },
  beforeDestroy: function() {
    var a = this;
    Ext.destroy(a.placeholder, a.ghostPanel, a.dd, a.accordionKeyNav, a.defaultButtonKeyNav);
    a.destroyDockedItems();
    Ext.container.Container.prototype.beforeDestroy.call(this)
  },
  destroy: function() {
    Ext.container.Container.prototype.destroy.call(this);
    this.dockedItems = null
  },
  beforeRender: function() {
    var b = this,
      a;
    Ext.container.Container.prototype.beforeRender.call(this);
    b.initTools();
    if (!(b.preventHeader || (b.header === false)) || b.isViewportBorderChild) {
      b.updateHeader()
    }
    b.afterHeaderInit = true;
    if (b.collapsed) {
      if (b.isPlaceHolderCollapse()) {
        if (!b.hidden) {
          b.setHiddenState(true);
          b.preventCollapseFire = true;
          b.placeholderCollapse();
          delete b.preventCollapseFire;
          a = b.collapsed;
          b.collapsed = false
        }
      } else {
        b.beginCollapse();
        b.addClsWithUI(b.collapsedCls)
      }
    }
    if (a) {
      b.collapsed = a
    }
  },
  getMemento: function(a) {
    var b = this;
    if (a && typeof a === "string") {
      a += "Memento";
      return b[a] || (b[a] = new Ext.util.Memento(b))
    }
  },
  beginCollapse: function() {
    var e = this,
      c = e.lastBox,
      g = e.rendered,
      b = e.getMemento("collapse"),
      d = e.getSizeModel(),
      f = e.header,
      a;
    b.capture(["height", "minHeight", "width", "minWidth"]);
    if (c) {
      b.capture(e.restoreDimension(), c, "last.")
    }
    if (e.collapsedVertical()) {
      if (d.width.shrinkWrap) {
        e.width = g ? e.getWidth() : e.width || e.minWidth || 100
      }
      delete e.height;
      e.minHeight = 0
    } else {
      if (e.collapsedHorizontal()) {
        if (d.height.shrinkWrap) {
          e.height = g ? e.getHeight() : e.height || e.minHeight || 100
        }
        delete e.width;
        e.minWidth = 0
      }
    }
    if (e.ownerCt) {
      e.ownerCt.getLayout().beginCollapse(e)
    }
    if (!e.isPlaceHolderCollapse() && f !== false) {
      if (f === (a = e.getReExpander())) {
        f.collapseImmune = true;
        f.getInherited().collapseImmune = true;
        f.addClsWithUI(e.getHeaderCollapsedClasses(f));
        if (f.rendered) {
          f.updateFrame()
        }
      } else {
        if (a.el) {
          a.el.show();
          a.hidden = false
        }
      }
    }
    if (e.resizer) {
      e.resizer.disable()
    }
  },
  beginDrag: function() {
    if (this.floatingDescendants) {
      this.floatingDescendants.hide()
    }
  },
  beginExpand: function() {
    var e = this,
      d = e.lastBox,
      c = e.getMemento("collapse"),
      a = e.restoreDimension(),
      f = e.header,
      b;
    if (c) {
      c.restore(["minHeight", "minWidth", a]);
      if (d) {
        c.restore(a, true, d, "last.")
      }
    }
    if (e.ownerCt) {
      e.ownerCt.getLayout().beginExpand(e)
    }
    if (!e.isPlaceHolderCollapse() && f !== false) {
      if (f === (b = e.getReExpander())) {
        delete f.collapseImmune;
        delete f.getInherited().collapseImmune;
        f.removeClsWithUI(e.getHeaderCollapsedClasses(f));
        if (f.rendered) {
          f.expanding = true;
          f.updateFrame();
          delete f.expanding
        }
      } else {
        b.hidden = true;
        b.el.hide()
      }
    }
    if (e.resizer) {
      e.resizer.enable()
    }
  },
  bridgeToolbars: function() {
    var a = this,
      f = [],
      e = a.minButtonWidth,
      c, b;

    function d(g, i, h) {
      if (Ext.isArray(g)) {
        g = {
          xtype: "toolbar",
          items: g
        }
      } else {
        if (!g.xtype) {
          g.xtype = "toolbar"
        }
      }
      g.dock = i;
      if (h) {
        g.layout = Ext.applyIf(g.layout || {}, {
          pack: {
            left: "start",
            center: "center"
          }[a.buttonAlign] || "end"
        })
      }
      return g
    }
    if (a.tbar) {
      f.push(d(a.tbar, "top"));
      a.tbar = null
    }
    if (a.bbar) {
      f.push(d(a.bbar, "bottom"));
      a.bbar = null
    }
    if (a.buttons) {
      a.fbar = a.buttons;
      a.buttons = null
    }
    if (a.fbar) {
      c = d(a.fbar, "bottom", true);
      c.ui = "footer";
      if (e) {
        b = c.defaults;
        c.defaults = function(i) {
          var j = b || {},
            h = !i.xtype || i.isButton,
            g;
          if (!h) {
            g = Ext.ClassManager.getByAlias("widget." + i.xtype);
            if (g) {
              h = g.prototype.isButton
            }
          }
          if (h && !("minWidth" in j)) {
            j = Ext.apply({
              minWidth: e
            }, j)
          }
          return j
        }
      }
      f.push(c);
      a.fbar = null
    }
    if (a.lbar) {
      f.push(d(a.lbar, "left"));
      a.lbar = null
    }
    if (a.rbar) {
      f.push(d(a.rbar, "right"));
      a.rbar = null
    }
    if (a.dockedItems) {
      if (a.dockedItems.isMixedCollection) {
        a.addDocked(f)
      } else {
        if (!Ext.isArray(a.dockedItems)) {
          a.dockedItems = [a.dockedItems]
        }
        a.dockedItems = a.dockedItems.concat(f)
      }
    } else {
      a.dockedItems = f
    }
  },
  close: function() {
    if (this.fireEvent("beforeclose", this) !== false) {
      this.doClose()
    }
  },
  collapse: function(e, a) {
    var d = this,
      f = e || d.collapseDirection,
      b = d.ownerCt,
      c = d.ownerLayout,
      g = d.rendered;
    if (d.isCollapsingOrExpanding) {
      return d
    }
    if (arguments.length < 2) {
      a = d.animCollapse
    }
    if (d.collapsed || d.fireEvent("beforecollapse", d, e, a) === false) {
      return d
    }
    if (c && c.onBeforeComponentCollapse) {
      if (c.onBeforeComponentCollapse(d) === false) {
        return d
      }
    }
    if (g && b && d.isPlaceHolderCollapse()) {
      return d.placeholderCollapse(e, a)
    }
    d.collapsed = f;
    if (g) {
      d.beginCollapse()
    }
    d.getInherited().collapsed = true;
    d.fireHierarchyEvent("collapse");
    if (g) {
      d.doCollapseExpand(1, a)
    }
    return d
  },
  collapsedHorizontal: function() {
    var a = this.getCollapsed();
    return a === "left" || a === "right"
  },
  collapsedVertical: function() {
    var a = this.getCollapsed();
    return a === "top" || a === "bottom"
  },
  convertCollapseDir: function(a) {
    return a.substr(0, 1)
  },
  createGhost: function(a) {
    var b = this,
      d = b.header,
      c = b.frame && !b.alwaysFramed;
    return {
      xtype: "panel",
      hidden: false,
      header: d ? {
        titleAlign: d.getTitleAlign()
      } : null,
      ui: c ? b.ui.replace(/-framed$/, "") : b.ui,
      id: b.id + "-ghost",
      renderTo: Ext.getBody(),
      resizable: false,
      draggable: false,
      closable: false,
      focusable: false,
      floating: true,
      shadow: false,
      frame: c,
      shim: b.shim,
      alwaysFramed: b.alwaysFramed,
      overlapHeader: b.overlapHeader,
      headerPosition: b.getHeaderPosition(),
      titleRotation: b.getTitleRotation(),
      baseCls: b.baseCls,
      getRefOwner: function() {
        return b.getRefOwner()
      },
      cls: b.baseCls + "-ghost " + (a || "")
    }
  },
  createReExpander: function(f, e) {
    var d = this,
      h = f === "left",
      c = f === "right",
      g = h || c,
      b = d.ownerCt,
      a = Ext.apply({
        hideMode: "offsets",
        title: d.getTitle(),
        titleAlign: d.getTitleAlign(),
        vertical: g,
        textCls: d.headerTextCls,
        icon: d.getIcon(),
        iconCls: d.getIconCls(),
        iconAlign: d.getIconAlign(),
        glyph: d.getGlyph(),
        baseCls: d.self.prototype.baseCls + "-header",
        ui: d.ui,
        frame: d.frame && d.frameHeader,
        ignoreParentFrame: d.frame || d.overlapHeader,
        ignoreBorderManagement: d.frame || d.ignoreHeaderBorderManagement,
        indicateDrag: d.draggable,
        collapseImmune: true,
        ariaRole: d.ariaRole,
        preventRefocus: true,
        ownerCt: (b && d.collapseMode === "placeholder") ? b : d,
        ownerLayout: d.componentLayout,
        forceOrientation: true,
        margin: d.margin
      }, e);
    if (d.collapseMode === "mini") {
      if (g) {
        a.width = 1
      } else {
        a.height = 1
      }
    }
    if (!d.hideCollapseTool) {
      if (h || (c && d.isPlaceHolderCollapse())) {
        a.titlePosition = 1
      }
      a.tools = [{
        xtype: "tool",
        type: "expand-" + d.getOppositeDirection(f),
        isDefaultExpandTool: true,
        uiCls: ["top"],
        handler: d.toggleCollapse,
        scope: d,
        tooltip: d.expandToolText
      }]
    }
    a = new Ext.panel.Header(a);
    a.addClsWithUI(d.getHeaderCollapsedClasses(a));
    a.expandTool = a.down("tool[isDefaultExpandTool=true]");
    return a
  },
  doClose: function() {
    this.fireEvent("close", this);
    this[this.closeAction]()
  },
  doCollapseExpand: function(a, b) {
    var d = this,
      c = d.animCollapse,
      e = d.ownerLayout;
    d.animCollapse = b;
    d.isCollapsingOrExpanding = a;
    if (b) {
      d.addCls("x-animating-size")
    }
    if (e && !b) {
      e.onContentChange(d)
    } else {
      d.updateLayout({
        isRoot: true
      })
    }
    d.animCollapse = c;
    return d
  },
  endDrag: function() {
    if (this.floatingDescendants) {
      this.floatingDescendants.show()
    }
  },
  expand: function(a) {
    var c = this,
      b = c.ownerLayout,
      d = c.rendered;
    if (c.isCollapsingOrExpanding) {
      return c
    }
    if (!arguments.length) {
      a = c.animCollapse
    }
    if (!c.collapsed && !c.floatedFromCollapse) {
      return c
    }
    if (c.fireEvent("beforeexpand", c, a) === false) {
      return c
    }
    if (b && b.onBeforeComponentExpand) {
      if (b.onBeforeComponentExpand(c) === false) {
        return c
      }
    }
    delete c.getInherited().collapsed;
    if (d && c.isPlaceHolderCollapse()) {
      return c.placeholderExpand(a)
    }
    c.restoreHiddenDocked();
    if (d) {
      c.beginExpand()
    }
    c.collapsed = false;
    if (c.rendered) {
      c.doCollapseExpand(2, a)
    }
    return c
  },
  findReExpander: function(g) {
    var f = this,
      h = Ext.Component,
      e = f.dockedItems.items,
      a = e.length,
      b, d;
    if (f.collapseMode === "mini") {
      return
    }
    switch (g) {
      case h.DIRECTION_TOP:
      case h.DIRECTION_BOTTOM:
        for (d = 0; d < a; d++) {
          b = e[d];
          if (!b.hidden) {
            if (b.isHeader && (!b.dock || b.dock === "top" || b.dock ===
                "bottom")) {
              return b
            }
          }
        }
        break;
      case h.DIRECTION_LEFT:
      case h.DIRECTION_RIGHT:
        for (d = 0; d < a; d++) {
          b = e[d];
          if (!b.hidden) {
            if (b.isHeader && (b.dock === "left" || b.dock === "right")) {
              return b
            }
          }
        }
        break;
      default:
        throw (
          "Panel#findReExpander must be passed a valid collapseDirection"
        )
    }
  },
  floatCollapsedPanel: function() {
    var g = this,
      h = g.placeholder,
      a = h.getSize(),
      f = Ext.panel.Panel.floatCls,
      d = g.collapsed,
      i = g.ownerCt || g,
      b, c, e;
    if (g.isSliding) {
      return
    }
    if (g.el.hasCls(f)) {
      g.slideOutFloatedPanel();
      return
    }
    g.isSliding = true;
    h.el.hide();
    h.hidden = true;
    g.el.show();
    g.setHiddenState(false);
    g.collapsed = false;
    i.updateLayout();
    h.el.show();
    h.hidden = false;
    g.el.hide();
    g.setHiddenState(true);
    g.collapsed = d;
    i.updateLayout();
    e = g.getBox(false, true);
    g.slideOutTask = g.slideOutTask || new Ext.util.DelayedTask(g.slideOutFloatedPanel,
      g);
    if (Ext.supports.Touch) {
      Ext.on("mousedown", c = function(j) {
        if (!j.within(g.el)) {
          Ext.un("mousedown", c);
          g.slideOutFloatedPanel()
        }
      })
    }
    if (!g.placeholderListener) {
      g.placeholderListener = h.on({
        resize: g.onPlaceholderResize,
        scope: g,
        destroyable: true
      })
    }
    h.el.on("mouseleave", g.onMouseLeaveFloated, g);
    g.el.on("mouseleave", g.onMouseLeaveFloated, g);
    h.el.on("mouseenter", g.onMouseEnterFloated, g);
    g.el.on("mouseenter", g.onMouseEnterFloated, g);
    g.el.addCls(f);
    g.floated = d;
    if (g.collapseTool) {
      g.collapseTool.el.hide()
    }
    switch (g.collapsed) {
      case "top":
        g.width = a.width;
        g.setLocalXY(e.x, e.y + a.height);
        break;
      case "right":
        g.height = a.height;
        g.setLocalXY(e.x - a.width, e.y);
        break;
      case "bottom":
        g.width = a.width;
        g.setLocalXY(e.x, e.y - a.height);
        break;
      case "left":
        g.height = a.height;
        g.setLocalXY(e.x + a.width, e.y);
        break
    }
    b = g.convertCollapseDir(g.collapsed);
    g.floatedFromCollapse = g.collapsed;
    g.collapsed = false;
    g.setHiddenState(false);
    g.el.slideIn(b, {
      preserveScroll: true,
      duration: Ext.Number.from(g.animCollapse, Ext.fx.Anim.prototype
        .duration),
      listeners: {
        afteranimate: function() {
          g.isSliding = false;
          g.fireEvent("float", g)
        }
      }
    })
  },
  onPlaceholderResize: function(e, c, a) {
    var b = this,
      d = b.getBox(false, true),
      f = e.getBox(false, true);
    switch (b.floated) {
      case "top":
        b.width = c;
        b.setLocalY(f.y + f.height);
        break;
      case "right":
        b.height = a;
        b.setLocalX(f.x - d.width);
        break;
      case "bottom":
        b.width = c;
        b.setLocalY(f.y - d.height);
        break;
      case "left":
        b.height = a;
        b.setLocalX(f.x + f.width);
        break
    }
    b.updateLayout({
      isRoot: true
    })
  },
  getAnimationProps: function() {
    var b = this,
      c = b.animCollapse,
      a;
    a = Ext.container.Container.prototype.getAnimationProps.call(this);
    if (typeof c === "number") {
      a.duration = c
    }
    return a
  },
  getCollapsed: function() {
    var a = this;
    if (a.collapsed === true) {
      return a.collapseDirection
    }
    return a.collapsed
  },
  getCollapsedDockedItems: function() {
    var a = this;
    return a.header === false || a.collapseMode === "placeholder" ? a.emptyArray : [
      a.getReExpander()
    ]
  },
  getComponent: function(a) {
    var b = Ext.container.Container.prototype.getComponent.apply(this,
      arguments);
    if (b === undefined && !Ext.isNumber(a)) {
      b = this.getDockedComponent(a)
    }
    return b
  },
  getHeader: function() {
    return this.header
  },
  getHeaderCollapsedClasses: function(d) {
    var b = this,
      c = b.collapsedCls,
      a;
    a = [c, c + "-" + d.getDockName()];
    if (b.border && (!b.frame || (b.frame && Ext.supports.CSS3BorderRadius))) {
      a.push(c + "-border-" + d.getDockName())
    }
    return a
  },
  getKeyMap: function() {
    return this.keyMap || (this.keyMap = new Ext.util.KeyMap(Ext.apply({
      target: this.el
    }, this.keys)))
  },
  getOppositeDirection: function(a) {
    var b = Ext.Component;
    switch (a) {
      case b.DIRECTION_TOP:
        return b.DIRECTION_BOTTOM;
      case b.DIRECTION_RIGHT:
        return b.DIRECTION_LEFT;
      case b.DIRECTION_BOTTOM:
        return b.DIRECTION_TOP;
      case b.DIRECTION_LEFT:
        return b.DIRECTION_RIGHT
    }
  },
  getPlaceholder: function(e) {
    var d = this,
      g = e || d.collapseDirection,
      c = null,
      f = d.placeholder,
      b = d.floatable,
      a = d.titleCollapse;
    if (!f) {
      if (b || (d.collapsible && a)) {
        c = {
          click: {
            fn: (!a && b) ? d.floatCollapsedPanel : d.toggleCollapse,
            element: "el",
            scope: d
          }
        }
      }
      d.placeholder = f = Ext.widget(d.createReExpander(g, {
        id: d.id + "-placeholder",
        listeners: c
      }))
    }
    if (!f.placeholderFor) {
      if (!f.isComponent) {
        d.placeholder = f = d.lookupComponent(f)
      }
      Ext.applyIf(f, {
        margin: d.margin,
        placeholderFor: d,
        synthetic: true
      });
      f.addCls(["x-region-collapsed-placeholder", "x-region-collapsed-" +
        g + "-placeholder", d.collapsedCls
      ])
    }
    return f
  },
  getProtoBody: function() {
    var b = this,
      a = b.protoBody;
    if (!a) {
      b.protoBody = a = new Ext.util.ProtoElement({
        cls: b.bodyCls,
        style: b.bodyStyle,
        clsProp: "bodyCls",
        styleProp: "bodyStyle",
        styleIsText: true
      })
    }
    return a
  },
  getReExpander: function(c) {
    var b = this,
      d = c || b.collapseDirection,
      a = b.reExpander || b.findReExpander(d);
    b.expandDirection = b.getOppositeDirection(d);
    if (!a) {
      b.reExpander = a = b.createReExpander(d, {
        dock: d,
        cls: "x-docked " + b.baseCls + "-" + b.ui + "-collapsed",
        isCollapsedExpander: true
      });
      b.dockedItems.insert(0, a)
    }
    return a
  },
  getRefItems: function(a) {
    var b = Ext.container.Container.prototype.getRefItems.apply(this,
      arguments);
    return this.getDockingRefItems(a, b)
  },
  getState: function() {
    var a = this,
      c = Ext.container.Container.prototype.getState.call(this) || {},
      e = a.collapsed,
      b = a.floated,
      d;
    if (b) {
      a.collapsed = b
    }
    c = a.addPropertyToState(c, "collapsed");
    if (b) {
      a.collapsed = e
    }
    if (a.getCollapsed()) {
      d = a.getMemento("collapse").data;
      c = a.addPropertyToState(c, "collapsed", d);
      if (a.collapsedVertical()) {
        delete c.height;
        if (d) {
          c = a.addPropertyToState(c, "height", d.height)
        }
      } else {
        delete c.width;
        if (d) {
          c = a.addPropertyToState(c, "width", d.width)
        }
      }
    }
    return c
  },
  applyState: function(c) {
    var b = this,
      a = {},
      d;
    if (c) {
      d = c.collapsed;
      if (d) {
        a = b.getMemento("collapse");
        Ext.Object.merge(a.data, d);
        c.collapsed = true
      }
      Ext.container.Container.prototype.applyState.apply(this, arguments)
    }
  },
  ghost: function(l) {
    var g = this,
      a = g.ghostPanel,
      d = g.getBox(),
      c = g.header,
      j, e, h, k, f, b;
    if (!a) {
      g.ghostPanel = a = Ext.widget(g.createGhost(l));
      a.el.dom.removeAttribute("tabIndex")
    } else {
      a.el.show()
    }
    a.setHiddenState(false);
    a.floatParent = g.floatParent;
    a.toFront();
    if (c && !g.preventHeader) {
      j = a.header;
      j.suspendLayouts();
      e = j.query("tool");
      for (b = e.length; b--;) {
        j.remove(e[b])
      }
      j.setTitlePosition(0);
      a.addTool(g.ghostTools());
      a.setTitle(g.getTitle());
      j.setTitlePosition(c.titlePosition);
      k = g.getIconCls();
      if (k) {
        a.setIconCls(k)
      } else {
        h = g.getIcon();
        if (h) {
          a.setIcon(h)
        } else {
          f = g.getGlyph();
          if (f) {
            a.setGlyph(f)
          }
        }
      }
      j.addCls("x-header-ghost");
      j.resumeLayouts()
    }
    a.setPagePosition(d.x, d.y);
    a.setSize(d.width, d.height);
    g.el.hide();
    return a
  },
  ghostTools: function() {
    var e = [],
      f = this.header,
      d = f ? f.query("tool[hidden=false]") : [],
      c, a, b;
    if (d.length) {
      c = 0;
      a = d.length;
      for (; c < a; c++) {
        b = d[c];
        e.push({
          type: b.type,
          tooltip: b.tooltip
        })
      }
    } else {
      e = [{
        type: "placeholder"
      }]
    }
    return e
  },
  initBodyBorder: function() {
    var a = this;
    if (a.frame && a.bodyBorder) {
      if (!Ext.isNumber(a.bodyBorder)) {
        a.bodyBorder = 1
      }
      a.getProtoBody().setStyle("border-width", this.unitizeBox(a.bodyBorder))
    }
  },
  initBodyStyles: function() {
    var b = this,
      a = b.getProtoBody();
    if (b.bodyPadding !== undefined) {
      if (b.layout.managePadding) {
        a.setStyle("padding", 0)
      } else {
        a.setStyle("padding", this.unitizeBox((b.bodyPadding === true) ?
          5 : b.bodyPadding))
      }
    }
    b.initBodyBorder()
  },
  initBorderProps: function() {
    var a = this;
    if (a.frame && a.border && a.bodyBorder === undefined) {
      a.bodyBorder = false
    }
    if (a.frame && a.border && (a.bodyBorder === false || a.bodyBorder ===
        0)) {
      a.manageBodyBorders = true
    }
  },
  initComponent: function() {
    var a = this;
    if (a.collapsible) {
      a.addStateEvents(["expand", "collapse"])
    }
    if (a.unstyled) {
      a.setUI("plain")
    }
    if (a.frame) {
      a.setUI(a.ui + "-framed")
    }
    a.bridgeToolbars();
    a.initBorderProps();
    Ext.container.Container.prototype.initComponent.call(this);
    a.collapseDirection = a.collapseDirection || a.getHeaderPosition() ||
      Ext.Component.DIRECTION_TOP;
    a.hiddenOnCollapse = new Ext.dom.CompositeElement()
  },
  initItems: function() {
    Ext.container.Container.prototype.initItems.call(this);
    this.initDockingItems()
  },
  initRenderData: function() {
    var a = this,
      b = Ext.container.Container.prototype.initRenderData.call(this);
    a.initBodyStyles();
    a.protoBody.writeTo(b);
    delete a.protoBody;
    if (a.headingText) {
      b.headingText = a.headingText;
      a.addChildEl("headingEl")
    }
    if (a.bodyAriaRole) {
      b.bodyAriaAttributes = {
        role: a.bodyAriaRole
      };
      if (!a.ariaStaticRoles[a.bodyAriaRole] && a.bodyAriaRenderAttributes) {
        Ext.apply(b.bodyAriaAttributes, a.bodyAriaRenderAttributes)
      }
    }
    return b
  },
  calculateConstrainedPosition: function(f, b, e, a) {
    var g = this,
      h = g.header,
      d, c;
    if (g.constrainHeader) {
      d = h.lastBox;
      if (a) {
        if (!h.vertical) {
          a = [a[0], d ? d.height : a[1]]
        } else {
          a = [d ? d.width : a[0], a[1]]
        }
      } else {
        if (d) {
          a = [d.width, d.height]
        }
      }
      c = g.floatParent;
      f = f || g.constrainTo || (c ? c.getTargetEl() : null) || g.container ||
        g.el.parent()
    }
    return Ext.container.Container.prototype.calculateConstrainedPosition
      .call(this, f, b, e, a)
  },
  initTools: function() {
    var c = this,
      e = c.tools,
      b, d, a;
    c.tools = [];
    for (b = e && e.length; b;) {
      --b;
      c.tools[b] = a = e[b];
      a.toolOwner = c
    }
    if (c.collapsible && !(c.hideCollapseTool || c.header === false || c.preventHeader)) {
      c.updateCollapseTool();
      if (c.collapseFirst) {
        c.tools.unshift(c.collapseTool)
      }
    }
    c.addTools();
    if (c.pinnable) {
      c.initPinnable()
    }
    if (c.closable) {
      c.addClsWithUI("closable");
      d = {
        xtype: "tool",
        type: "close",
        scope: c,
        handler: c.close,
        tooltip: c.closeToolText
      };
      if (c.isAccordionPanel) {
        d.focusable = false;
        d.ariaRole = "presentation"
      }
      c.addTool(d)
    }
    if (c.collapseTool && !c.collapseFirst) {
      c.addTool(c.collapseTool)
    }
  },
  isLayoutRoot: function() {
    if (this.floatedFromCollapse) {
      return true
    }
    return Ext.container.Container.prototype.isLayoutRoot.call(this)
  },
  isPlaceHolderCollapse: function() {
    return this.collapseMode === "placeholder"
  },
  isVisible: function(a) {
    var b = this;
    if (b.collapsed && b.placeholder) {
      return b.placeholder.isVisible(a)
    }
    return Ext.container.Container.prototype.isVisible.apply(this,
      arguments)
  },
  onBoxReady: function() {
    var a = this,
      b;
    Ext.container.Container.prototype.onBoxReady.apply(this, arguments);
    if (a.collapsed) {
      a.setHiddenDocked()
    }
    if (a.isAccordionPanel) {
      a.ariaEl = a.header.titleCmp.el;
      a.ariaEl.dom.setAttribute("aria-expanded", !a.collapsed);
      a.body.dom.setAttribute("aria-labelledby", a.header.titleCmp.id);
      a.body.dom.setAttribute("aria-hidden", !!a.collapsed);
      a.accordionKeyNav = new Ext.util.KeyNav({
        target: a.header.titleCmp.el,
        scope: a,
        left: a.navigateAccordion,
        right: a.navigateAccordion,
        left: a.navigateAccordion,
        up: a.navigateAccordion,
        down: a.navigateAccordion,
        home: a.navigateAccordion,
        end: a.navigateAccordion,
        space: a.toggleCollapse,
        enter: a.toggleCollapse,
        del: {
          alt: true,
          fn: a.maybeClose
        }
      })
    }
    if (a.defaultButton) {
      b = a.defaultButtonTarget ? a[a.defaultButtonTarget] : a.body;
      a.defaultButtonKeyNav = new Ext.util.KeyNav({
        target: b,
        scope: a,
        defaultEventAction: "stopEvent",
        enter: a.fireDefaultButton
      })
    }
  },
  onHide: function(e, b, c) {
    var d = this,
      a = d.dd;
    if (d.floatedFromCollapse) {
      d.slideOutFloatedPanel(true)
    }
    if (d.draggable && a) {
      a.endDrag()
    }
    if (d.collapsed && d.placeholder) {
      if (d.splitter) {
        Ext.suspendLayouts();
        d.splitter.hide();
        Ext.resumeLayouts()
      }
      d.placeholder.hide()
    } else {
      Ext.container.Container.prototype.onHide.call(this, e, b, c)
    }
  },
  onMouseEnterFloated: function(a) {
    this.slideOutTask.cancel()
  },
  onMouseLeaveFloated: function(a) {
    this.slideOutTask.delay(500)
  },
  onRemoved: function(b) {
    var a = this;
    if (a.placeholder && !b) {
      a.ownerCt.remove(a.placeholder, false)
    }
    Ext.container.Container.prototype.onRemoved.apply(this, arguments)
  },
  onShow: function() {
    var a = this;
    if (a.collapsed && a.isPlaceHolderCollapse()) {
      if (a.splitter) {
        Ext.suspendLayouts();
        a.splitter.show();
        Ext.resumeLayouts()
      }
      a.setHiddenState(true);
      a.placeholderCollapse()
    } else {
      Ext.container.Container.prototype.onShow.apply(this, arguments)
    }
  },
  placeholderCollapse: function(f, a) {
    var e = this,
      b = e.ownerCt,
      i = f || e.collapseDirection,
      d = Ext.panel.Panel.floatCls,
      c = e.collapseTool,
      g = e.getPlaceholder(i),
      h;
    e.isCollapsingOrExpanding = 1;
    e.setHiddenState(true);
    e.collapsed = i;
    if (g.rendered) {
      if (g.el.dom.parentNode !== e.el.dom.parentNode) {
        e.el.dom.parentNode.insertBefore(g.el.dom, e.el.dom)
      }
      g.hidden = false;
      g.setHiddenState(false);
      g.el.show();
      b.updateLayout()
    } else {
      b.insert(b.items.indexOf(e), g)
    }
    if (e.rendered) {
      if (c && Ext.ComponentManager.getActiveComponent() === c) {
        e.focusPlaceholderExpandTool = true
      }
      e.el.setVisibilityMode(e.placeholderCollapseHideMode);
      if (a) {
        e.el.addCls(d);
        g.el.hide();
        h = e.convertCollapseDir(i);
        e.el.slideOut(h, {
          preserveScroll: true,
          duration: Ext.Number.from(a, Ext.fx.Anim.prototype.duration),
          listeners: {
            scope: e,
            afteranimate: function() {
              var j = this;
              j.el.removeCls(d);
              j.placeholder.el.show().setStyle("display", "none").slideIn(
                h, {
                  easing: "linear",
                  duration: 100,
                  listeners: {
                    afteranimate: j.doPlaceholderCollapse,
                    scope: j
                  }
                })
            }
          }
        })
      } else {
        e.el.hide();
        e.doPlaceholderCollapse()
      }
    } else {
      e.isCollapsingOrExpanding = 0;
      if (!e.preventCollapseFire) {
        e.fireEvent("collapse", e)
      }
    }
    return e
  },
  doPlaceholderCollapse: function() {
    var a = this,
      b = a.placeholder,
      c = b.expandTool;
    if (a.focusPlaceholderExpandTool && c) {
      c.focus()
    } else {
      b.focus()
    }
    a.focusPlaceholderExpandTool = false;
    b.setHiddenState(false);
    b.ariaEl.dom.setAttribute("aria-hidden", false);
    b.ariaEl.dom.setAttribute("aria-expanded", false);
    a.ariaEl.dom.setAttribute("aria-hidden", true);
    a.ariaEl.dom.setAttribute("aria-expanded", false);
    a.isCollapsingOrExpanding = 0;
    a.fireEvent("collapse", a)
  },
  placeholderExpand: function(c) {
    var e = this,
      g = e.collapsed,
      h = e.placeholder.expandTool,
      d = Ext.panel.Panel.floatCls,
      b = e.ownerLayout ? e.ownerLayout.centerRegion : null,
      f, a;
    if (Ext.Component.layoutSuspendCount) {
      c = false
    }
    if (e.floatedFromCollapse) {
      a = e.getPosition(true);
      e.slideOutFloatedPanelBegin();
      e.slideOutFloatedPanelEnd();
      e.floated = false
    }
    if (h && Ext.ComponentManager.getActiveComponent() === h) {
      e.focusHeaderCollapseTool = true;
      h._ariaRole = h.ariaEl.dom.getAttribute("role");
      h._ariaLabel = h.ariaEl.dom.getAttribute("aria-label");
      h.ariaEl.dom.setAttribute("role", "presentation");
      h.ariaEl.dom.removeAttribute("aria-label")
    }
    if (c) {
      Ext.suspendLayouts();
      e.placeholder.hide();
      e.el.show();
      e.collapsed = false;
      e.setHiddenState(false);
      if (b && !a) {
        b.hidden = true
      }
      Ext.resumeLayouts(true);
      b.hidden = false;
      e.el.addCls(d);
      e.isCollapsingOrExpanding = 2;
      if (a) {
        f = e.getXY();
        e.setLocalXY(a[0], a[1]);
        e.setXY([f[0], f[1]], {
          duration: Ext.Number.from(c, Ext.fx.Anim.prototype.duration),
          listeners: {
            scope: e,
            afteranimate: function() {
              var i = this;
              i.el.removeCls(d);
              i.isCollapsingOrExpanding = 0;
              i.fireEvent("expand", i)
            }
          }
        })
      } else {
        e.el.hide();
        e.placeholder.el.show();
        e.placeholder.hidden = false;
        e.setHiddenState(false);
        e.el.slideIn(e.convertCollapseDir(g), {
          preserveScroll: true,
          duration: Ext.Number.from(c, Ext.fx.Anim.prototype.duration),
          listeners: {
            afteranimate: e.doPlaceholderExpand,
            scope: e
          }
        })
      }
    } else {
      e.floated = e.collapsed = false;
      e.doPlaceholderExpand(true)
    }
    return e
  },
  doPlaceholderExpand: function(b) {
    var c = this,
      d = c.placeholder,
      a = c.collapseTool,
      e = d.expandTool;
    if (b) {
      Ext.suspendLayouts();
      c.show()
    }
    c.el.removeCls(Ext.panel.Panel.floatCls);
    d.hide();
    if (b) {
      Ext.resumeLayouts(true)
    } else {
      c.updateLayout()
    }
    if (c.focusHeaderCollapseTool && a) {
      a.focus()
    }
    c.focusHeaderCollapseTool = false;
    d.ariaEl.dom.setAttribute("aria-expanded", true);
    c.ariaEl.dom.setAttribute("aria-expanded", true);
    if (e && e._ariaRole) {
      e.ariaEl.dom.setAttribute("role", e._ariaRole);
      e.ariaEl.dom.setAttribute("aria-label", e._ariaLabel);
      e._ariaRole = e._ariaLabel = null
    }
    c.isCollapsingOrExpanding = 0;
    c.fireEvent("expand", c)
  },
  remove: function(b, a) {
    var c = this.dockedItems;
    if (c && c.contains(b)) {
      this.removeDocked(b, a)
    } else {
      Ext.container.Container.prototype.remove.call(this, b, a)
    }
    return b
  },
  removeBodyCls: function(b) {
    var c = this,
      a = c.rendered ? c.body : c.getProtoBody();
    a.removeCls(b);
    return c
  },
  removeUIClsFromElement: function(b) {
    var c = this,
      a = Ext.container.Container.prototype.removeUIClsFromElement.apply(
        this, arguments);
    c.removeBodyCls(["x-" + b, c.baseCls + "-body-" + b, c.baseCls +
      "-body-" + c.ui + "-" + b
    ]);
    return a
  },
  restoreDimension: function() {
    var a = this.collapseDirection;
    return (a === "top" || a === "bottom") ? "height" : "width"
  },
  restoreHiddenDocked: function() {
    var a = this.hiddenOnCollapse;
    a.setStyle("visibility", "");
    a.clear()
  },
  setBodyStyle: function(b, d) {
    var c = this,
      a = c.rendered ? c.body : c.getProtoBody();
    if (Ext.isFunction(b)) {
      b = b()
    }
    if (arguments.length === 1) {
      if (Ext.isString(b)) {
        b = Ext.Element.parseStyles(b)
      }
      a.setStyle(b)
    } else {
      a.setStyle(b, d)
    }
    return c
  },
  setBorder: function(a, c) {
    if (c) {
      return
    }
    var b = this,
      d = b.header;
    if (!a) {
      a = 0
    } else {
      if (a === true) {
        a = "1px"
      } else {
        a = b.unitizeBox(a)
      }
    }
    if (d) {
      if (d.isHeader) {
        d.setBorder(a)
      } else {
        d.border = a
      }
    }
    if (b.rendered && b.bodyBorder !== false) {
      b.body.setStyle("border-width", a)
    }
    b.updateLayout();
    b.border = a
  },
  setCollapsed: function(a) {
    this[a ? "collapse" : "expand"]()
  },
  setGlyph: function(c) {
    var b = this,
      a = b.glyph,
      e = b.header,
      d = b.placeholder;
    if (c !== a) {
      b.glyph = c;
      if (e) {
        if (e.isHeader) {
          e.setGlyph(c)
        } else {
          e.glyph = c
        }
      } else {
        if (b.rendered || b.afterHeaderInit) {
          b.updateHeader()
        }
      }
      if (d && d.setGlyph) {
        d.setGlyph(c)
      }
      b.fireEvent("glyphchange", b, c, a)
    }
  },
  setIcon: function(a) {
    var b = this,
      c = b.icon,
      e = b.header,
      d = b.placeholder;
    if (a !== c) {
      b.icon = a;
      if (e) {
        if (e.isHeader) {
          e.setIcon(a)
        } else {
          e.icon = a
        }
      } else {
        if (b.rendered || b.afterHeaderInit) {
          b.updateHeader()
        }
      }
      if (d && d.setIcon) {
        d.setIcon(a)
      }
      b.fireEvent("iconchange", b, a, c)
    }
  },
  setIconCls: function(b) {
    var c = this,
      a = c.iconCls,
      e = c.header,
      d = c.placeholder;
    if (b !== a) {
      c.iconCls = b;
      if (e) {
        if (e.isHeader) {
          e.setIconCls(b)
        } else {
          e.iconCls = b
        }
      } else {
        if (c.rendered || c.afterHeaderInit) {
          c.updateHeader()
        }
      }
      if (d && d.setIconCls) {
        d.setIconCls(b)
      }
      c.fireEvent("iconclschange", c, b, a)
    }
  },
  setTitle: function(e) {
    var c = this,
      b = c.title,
      f = c.header,
      a = c.reExpander,
      d = c.placeholder;
    if (e !== b) {
      c.title = e;
      if (f) {
        if (f.isHeader) {
          f.setTitle(e)
        }
      } else {
        if (c.rendered || c.afterHeaderInit) {
          c.updateHeader()
        }
      }
      if (c.headingEl) {
        c.headingEl.setHtml(e)
      }
      if (a) {
        a.setTitle(e)
      }
      if (d && d.setTitle) {
        d.setTitle(e)
      }
      c.fireEvent("titlechange", c, e, b)
    }
  },
  setHiddenDocked: function() {
    var g = this,
      d = g.hiddenOnCollapse,
      c = g.getDockedItems(),
      a = c.length,
      e = 0,
      f, b;
    if (g.header !== false) {
      b = g.getReExpander()
    }
    d.add(g.body);
    for (; e < a; e++) {
      f = c[e];
      if (f && f !== b && f.el) {
        d.add(f.el)
      }
    }
    d.setStyle("visibility", "hidden")
  },
  setUI: function(b) {
    var a = this;
    Ext.container.Container.prototype.setUI.apply(this, arguments);
    if (a.header && a.header.rendered) {
      a.header.setUI(b)
    }
  },
  toggleCollapse: function() {
    return (this.collapsed || this.floatedFromCollapse) ? this.expand() :
      this.collapse()
  },
  updateCollapseTool: function() {
    var b = this,
      a = b.collapseTool,
      c;
    if (!a && b.collapsible) {
      b.collapseDirection = b.collapseDirection || b.getHeaderPosition() ||
        "top";
      c = {
        xtype: "tool",
        handler: b.toggleCollapse,
        scope: b
      };
      if (b.isAccordionPanel) {
        c.focusable = false;
        c.ariaRole = "presentation"
      }
      b.collapseTool = b.expandTool = a = Ext.widget(c)
    }
    if (a) {
      if (b.collapsed && !b.isPlaceHolderCollapse()) {
        a.setType("expand-" + b.getOppositeDirection(b.collapseDirection));
        a.setTooltip(b.expandToolText)
      } else {
        a.setType("collapse-" + b.collapseDirection);
        a.setTooltip(b.collapseToolText)
      }
    }
  },
  navigateAccordion: function(h) {
    var f = this,
      b = f.accordionWrapOver,
      a = "[isAccordionPanel]",
      i = a + ":first",
      g = a + ":last",
      c, d;
    c = h.getKey();
    switch (c) {
      case h.UP:
      case h.LEFT:
        d = f.prev(a);
        if (!d && b) {
          d = f.ownerCt.child(g)
        }
        break;
      case h.DOWN:
      case h.RIGHT:
        d = f.next(a);
        if (!d && b) {
          d = f.ownerCt.child(i)
        }
        break;
      case h.HOME:
        d = f.ownerCt.child(i);
        break;
      case h.END:
        d = f.ownerCt.child(g);
        break;
      case h.DELETE:
        d = f.prev(a) || f.next(a);
        if (!d) {
          h.doNotClose = true
        }
        break
    }
    if (d && d !== f) {
      d.header.titleCmp.focus()
    }
  },
  fireDefaultButton: function(c) {
    var b = this,
      d, a;
    d = b.lookupReferenceHolder() || b;
    a = d.lookupReference(b.defaultButton);
    if (a && a.click) {
      a.click(c);
      c.stopEvent();
      return false
    }
  },
  maybeClose: function(b) {
    var a = this;
    if (a.closable) {
      a.navigateAccordion(b);
      if (!b.doNotClose) {
        a.close()
      }
    }
  },
  onFocusEnter: function(c) {
    var b = this,
      a = b.ariaEl.dom;
    Ext.container.Container.prototype.onFocusEnter.call(this, c);
    if (b.isAccordionPanel && a) {
      a.setAttribute("aria-selected", true)
    }
  },
  onFocusLeave: function(c) {
    var b = this,
      a = b.ariaEl.dom;
    Ext.container.Container.prototype.onFocusLeave.call(this, c);
    if (b.isAccordionPanel && a) {
      a.removeAttribute("aria-selected")
    }
  },
  updateHeaderPosition: function(a) {
    var b = this.header;
    if (b && b.isHeader) {
      b.setDock(a)
    }
  },
  updateIconAlign: function(b) {
    var a = this.header;
    if (a && a.isHeader) {
      a.setIconAlign(b)
    }
  },
  updateTitleAlign: function(b) {
    var a = this.header;
    if (a && a.isHeader) {
      a.setTitleAlign(b)
    }
  },
  updateTitleRotation: function(a) {
    var b = this.header;
    if (b && b.isHeader) {
      b.setTitleRotation(a)
    }
  },
  unghost: function(c, a, b) {
    var e = this,
      d = e.ghostPanel;
    if (!d) {
      return
    }
    if (c !== false) {
      e.el.show();
      if (a !== false) {
        e.setPagePosition(d.getXY());
        if (e.hideMode === "offsets") {
          delete e.el.hideModeStyles
        }
      }
      if (b) {
        e.focus(false, 10)
      }
    }
    d.el.hide();
    d.setHiddenState(true)
  },
  updateHeader: function(a) {
    var i = this,
      e = i.header,
      l = i.getTitle(),
      g = i.tools,
      k = i.getIcon(),
      j = i.getGlyph(),
      n = i.getIconCls(),
      d = j || k || n,
      h = i.ariaEl.dom,
      f = i.getHeaderPosition(),
      c = f === "left" || f === "right",
      m, b;
    if (Ext.isObject(e) || (e !== false && (a || (l || d) || (g && g.length) ||
        (i.collapsible && !i.titleCollapse)))) {
      if (e && e.isHeader) {
        e.show()
      } else {
        e = i.header = Ext.widget(Ext.merge({
          xtype: "header",
          title: l,
          titleAlign: i.getTitleAlign(),
          vertical: c,
          dock: i.getHeaderPosition() || "top",
          titleRotation: i.getTitleRotation(),
          textCls: i.headerTextCls,
          iconCls: n,
          iconAlign: i.getIconAlign(),
          icon: k,
          glyph: j,
          baseCls: i.baseCls + "-header",
          tools: g,
          ui: i.ui,
          id: i.id + "_header",
          overCls: i.headerOverCls,
          indicateDrag: i.draggable,
          frame: (i.frame || i.alwaysFramed) && i.frameHeader,
          ignoreParentFrame: i.frame || i.overlapHeader,
          ignoreBorderManagement: i.frame || i.ignoreHeaderBorderManagement,
          isAccordionHeader: i.isAccordionPanel,
          ownerCt: i,
          synthetic: true,
          listeners: i.collapsible && i.titleCollapse ? {
            click: i.toggleCollapse,
            scope: i
          } : null
        }, i.header));
        i.addDocked(e, 0)
      }
      if (i.isAccordionPanel) {
        if (h) {
          h.setAttribute("aria-labelledby", e.id + "-title");
          h.removeAttribute("aria-label")
        } else {
          b = i.ariaRenderAttributes || (i.ariaRenderAttributes = {});
          b["aria-labelledby"] = e.id + "-title";
          delete b["aria-label"]
        }
      } else {
        if (l) {
          if (i.ariaRole !== "tabpanel") {
            if (h) {
              h.setAttribute("aria-labelledby", e.id + "-title-textEl");
              h.removeAttribute("aria-label")
            } else {
              b = i.ariaRenderAttributes || (i.ariaRenderAttributes = {});
              b["aria-labelledby"] = e.id + "-title-textEl";
              delete b["aria-label"]
            }
          }
        } else {
          if (i.ariaRenderAttributes) {
            delete i.ariaRenderAttributes["aria-labelledby"];
            delete i.ariaRenderAttributes["aria-label"]
          }
        }
      }
    } else {
      if (e) {
        e.hide()
      }
      if (h) {
        h.removeAttribute("aria-labelledby");
        if (l) {
          h.setAttribute("aria-label", l)
        } else {
          h.removeAttribute("aria-label")
        }
      } else {
        b = i.ariaRenderAttributes || (i.ariaRenderAttributes = {});
        delete b["aria-labelledby"];
        if (l) {
          b["aria-label"] = l
        } else {
          delete b["aria-label"]
        }
      }
    }
    if (i.isViewportBorderChild && !i.hasOwnProperty("ariaRole")) {
      i.ariaRole = "region"
    }
    if (l && i.ariaRole === "region") {
      m = i.headingEl;
      if (m) {
        m.setHtml(l)
      } else {
        if (i.rendered) {
          i.headingEl = Ext.dom.Helper.insertFirst(i.el, {
            tag: "div",
            id: i.id + "-headingEl",
            role: "heading",
            "class": "x-hidden-clip",
            style: "height:0",
            html: l
          }, true);
          h.removeAttribute("aria-label");
          h.setAttribute("aria-labelledby", i.id + "-headingEl")
        } else {
          i.headingText = i.title;
          b = i.ariaRenderAttributes || (i.ariaRenderAttributes = {});
          b["aria-labelledby"] = i.id + "-headingEl";
          delete b["aria-label"]
        }
      }
    } else {
      if (i.headingEl) {
        i.headingEl.destroy();
        i.headingEl = null
      }
    }
  },
  statics: {
    floatCls: "x-border-region-slide-in"
  },
  privates: {
    addUIToElement: function() {
      var a = this;
      Ext.container.Container.prototype.addUIToElement.apply(this,
        arguments);
      a.addBodyCls(a.baseCls + "-body-" + a.ui)
    },
    applyTargetCls: function(a) {
      this.getProtoBody().addCls(a)
    },
    getDefaultContentTarget: function() {
      return this.body
    },
    getTargetEl: function() {
      var a = this;
      return a.body || a.protoBody || a.frameBody || a.el
    },
    initDraggable: function() {
      var a = this;
      if (a.simpleDrag) {
        a.initSimpleDraggable()
      } else {
        a.dd = new Ext.panel.DD(a, Ext.isBoolean(a.draggable) ? null : a.draggable)
      }
    },
    initResizable: function() {
      Ext.container.Container.prototype.initResizable.apply(this,
        arguments);
      if (this.collapsed) {
        this.resizer.disable()
      }
    },
    initSimpleDraggable: function() {
      var c = this,
        b, a;
      if (!c.header) {
        c.updateHeader(true)
      }
      if (c.header) {
        b = Ext.applyIf({
          el: c.el,
          delegate: "#" + c.header.id
        }, c.draggable);
        if (c.constrain || c.constrainHeader) {
          b.constrain = c.constrain;
          b.constrainDelegate = c.constrainHeader;
          b.constrainTo = c.constrainTo || c.container
        }
        a = c.dd = new Ext.util.ComponentDragger(c, b);
        c.relayEvents(a, ["dragstart", "drag", "dragend"]);
        if (c.maximized) {
          a.disable()
        }
      }
    },
    removeUIFromElement: function() {
      var a = this;
      Ext.container.Container.prototype.removeUIFromElement.apply(this,
        arguments);
      a.removeBodyCls(a.baseCls + "-body-" + a.ui)
    },
    setupRenderTpl: function(a) {
      Ext.container.Container.prototype.setupRenderTpl.apply(this,
        arguments);
      this.setupDockingRenderTpl(a)
    },
    slideOutFloatedPanel: function(a) {
      var c = this,
        e = c.el,
        d, b = function() {
          c.slideOutFloatedPanelEnd();
          c.el.removeCls("x-border-region-slide-in")
        };
      if (c.isSliding || c.destroyed) {
        return
      }
      c.isSliding = true;
      c.floated = false;
      c.slideOutFloatedPanelBegin();
      if (a) {
        e.hide();
        return b()
      }
      if (typeof c.collapsed === "string") {
        d = c.convertCollapseDir(c.collapsed)
      }
      e.slideOut(d, {
        preserveScroll: true,
        duration: Ext.Number.from(c.animCollapse, Ext.fx.Anim.prototype
          .duration),
        listeners: {
          afteranimate: b
        }
      })
    },
    slideOutFloatedPanelBegin: function() {
      var b = this,
        c = b.placeholder.el,
        a = b.el;
      b.collapsed = b.floatedFromCollapse;
      b.setHiddenState(true);
      b.floatedFromCollapse = null;
      c.un("mouseleave", b.onMouseLeaveFloated, b);
      a.un("mouseleave", b.onMouseLeaveFloated, b);
      c.un("mouseenter", b.onMouseEnterFloated, b);
      a.un("mouseenter", b.onMouseEnterFloated, b)
    },
    slideOutFloatedPanelEnd: function(a) {
      var b = this;
      if (b.collapseTool) {
        b.collapseTool.el.show()
      }
      b.slideOutTask.cancel();
      b.isSliding = false;
      if (!a) {
        b.fireEvent("unfloat", b)
      }
    }
  }
}, 0, ["panel"], ["component", "box", "container", "panel"], {
  component: true,
  box: true,
  container: true,
  panel: true
}, ["widget.panel"], [
  ["docking", Ext.container.DockingContainer]
], [Ext.panel, "Panel", Ext, "Panel"], function() {
  var a = this.prototype;
  a.animCollapse = Ext.enableFx;
  a.placeholderCollapseHideMode = Ext.Element.VISIBILITY
}));
Ext.define("Ext.theme.neptune.panel.Panel", {
  override: "Ext.panel.Panel",
  border: false,
  bodyBorder: false,
  initBorderProps: Ext.emptyFn,
  initBodyBorder: function() {
    if (this.bodyBorder !== true) {
      arguments.callee.$previous.call(this)
    }
  }
});
(Ext.cmd.derive("Ext.plugin.Responsive", Ext.mixin.Responsive, {
  pluginId: "responsive",
  isPlugin: true,
  constructor: function(a) {
    var d = this,
      b = a.cmp,
      e = Ext.apply({
        responsiveConfig: b.responsiveConfig,
        responsiveFormulas: b.responsiveFormulas
      }, a);
    delete e.cmp;
    d.cmp = b;
    d.initConfig(e);
    if (d.transformed) {
      b.setConfig(d.transformed);
      d.transformed = null
    }
  },
  init: Ext.emptyFn,
  privates: {
    transformInstanceConfig: function(c) {
      var b = Ext.mixin.Responsive.prototype.transformInstanceConfig.call(
        this, c);
      if (b.ptype) {
        b = Ext.apply({}, b);
        delete b.ptype
      }
      this.transformed = b;
      var a = Ext.apply({}, c);
      delete a.ptype;
      delete a.responsiveConfig;
      delete a.responsiveFormulas;
      return a
    },
    updateResponsiveState: function() {
      var a = this.getResponsiveState();
      this.cmp.setConfig(a)
    }
  }
}, 1, 0, 0, 0, ["plugin.responsive"], 0, [Ext.plugin, "Responsive"], 0));
(Ext.cmd.derive("Ext.plugin.Viewport", Ext.plugin.Responsive, {
  setCmp: function(a) {
    this.cmp = a;
    if (a && !a.isViewport) {
      this.decorate(a);
      if (a.renderConfigs) {
        a.flushRenderConfigs()
      }
      a.setupViewport()
    }
  },
  statics: {
    decorate: function(a) {
      Ext.applyIf(a.prototype || a, {
        ariaRole: "application",
        viewportCls: "x-viewport"
      });
      Ext.override(a, {
        isViewport: true,
        preserveElOnDestroy: true,
        initComponent: function() {
          this.callParent();
          this.setupViewport()
        },
        getSizeModel: function() {
          var b = Ext.layout.SizeModel.configured;
          return b.pairsByHeightOrdinal[b.ordinal]
        },
        handleViewportResize: function() {
          var e = this,
            c = Ext.dom.Element,
            d = c.getViewportWidth(),
            b = c.getViewportHeight();
          if (d !== e.width || b !== e.height) {
            e.setSize(d, b)
          }
        },
        setupViewport: function() {
          var c = this,
            b = document.body;
          if (!b.id) {
            b.id = c.id
          }
          b.setAttribute(Ext.Component.componentIdAttribute, c.id);
          if (!c.ariaStaticRoles[c.ariaRole]) {
            b.setAttribute("role", c.ariaRole)
          }
          b = c.el = Ext.getBody();
          Ext.fly(document.documentElement).addCls(c.viewportCls);
          b.setHeight = b.setWidth = Ext.emptyFn;
          b.dom.scroll = "no";
          c.allowDomMove = false;
          c.renderTo = b;
          if (Ext.supports.Touch) {
            c.addMeta("apple-mobile-web-app-capable", "yes")
          }
          Ext.getScrollbarSize();
          c.width = c.height = undefined;
          c.initialViewportHeight = Ext.Element.getViewportHeight();
          c.initialViewportWidth = Ext.Element.getViewportWidth()
        },
        afterLayout: function(b) {
          if (Ext.supports.Touch) {
            document.body.scrollTop = 0
          }
          this.callParent([b])
        },
        onRender: function() {
          var b = this;
          b.callParent(arguments);
          b.width = b.initialViewportWidth;
          b.height = b.initialViewportHeight;
          b.initialViewportWidth = b.initialViewportHeight = null;
          if (Ext.supports.TouchEvents) {
            b.mon(Ext.getDoc(), {
              touchmove: function(c) {
                c.preventDefault()
              },
              translate: false,
              delegated: false
            })
          }
        },
        initInheritedState: function(d, c) {
          var e = this,
            b = Ext.rootInheritedState;
          if (d !== b) {
            e.initInheritedState(e.inheritedState = b, e.inheritedStateInner =
              Ext.Object.chain(b))
          } else {
            e.callParent([d, c])
          }
        },
        beforeDestroy: function() {
          var d = this,
            b = Ext.rootInheritedState,
            c;
          for (c in b) {
            if (c !== "rtl") {
              delete b[c]
            }
          }
          d.removeUIFromElement();
          d.el.removeCls(d.baseCls);
          Ext.fly(document.body.parentNode).removeCls(d.viewportCls);
          d.callParent()
        },
        addMeta: function(b, c) {
          var d = document.createElement("meta");
          d.setAttribute("name", b);
          d.setAttribute("content", c);
          Ext.getHead().appendChild(d)
        },
        privates: {
          applyTargetCls: function(b) {
            this.el.addCls(b)
          },
          disableTabbing: function() {
            var b = this.el;
            if (b) {
              b.saveTabbableState({
                skipSelf: true
              })
            }
          },
          enableTabbing: function() {
            var b = this.el;
            if (b) {
              b.restoreTabbableState(true)
            }
          },
          getOverflowEl: function() {
            return Ext.get(document.documentElement)
          }
        }
      })
    }
  },
  privates: {
    updateResponsiveState: function() {
      this.cmp.handleViewportResize();
      Ext.plugin.Responsive.prototype.updateResponsiveState.call(this)
    }
  }
}, 0, 0, 0, 0, ["plugin.viewport"], 0, [Ext.plugin, "Viewport"], function(a) {
  a.prototype.decorate = a.decorate
}));
(Ext.cmd.derive("Ext.dd.DragTracker", Ext.Base, {
  active: false,
  trackOver: false,
  tolerance: 5,
  autoStart: false,
  constructor: function(a) {
    var b = this;
    Ext.apply(b, a);
    b.dragRegion = new Ext.util.Region(0, 0, 0, 0);
    if (b.el) {
      b.initEl(b.el)
    }
    b.mixins.observable.constructor.call(b);
    if (b.disabled) {
      b.disable()
    }
  },
  initEl: function(b) {
    var c = this,
      a = c.delegate;
    c.el = b = Ext.get(b);
    if (a && a.isElement) {
      c.handle = a
    }
    c.delegate = c.handle ? undefined : c.delegate;
    if (!c.handle) {
      c.handle = b
    }
    c.handleListeners = {
      scope: c,
      delegate: c.delegate,
      mousedown: c.onMouseDown,
      dragstart: c.onDragStart
    };
    if (!Ext.supports.TouchEvents && (c.trackOver || c.overCls)) {
      Ext.apply(c.handleListeners, {
        mouseover: c.onMouseOver,
        mouseout: c.onMouseOut
      })
    }
    c.mon(c.handle, c.handleListeners);
    c.keyNav = new Ext.util.KeyNav({
      target: b,
      up: c.onResizeKeyDown,
      left: c.onResizeKeyDown,
      right: c.onResizeKeyDown,
      down: c.onResizeKeyDown,
      scope: c
    })
  },
  disable: function() {
    this.disabled = true
  },
  enable: function() {
    this.disabled = false
  },
  destroy: function() {
    var a = this;
    a.endDrag({});
    a.el = a.handle = a.onBeforeStart = a.onStart = a.onDrag = a.onEnd =
      null;
    a.callParent()
  },
  onMouseOver: function(j, h) {
    var f = this,
      g, d, c, a, b;
    if (!f.disabled) {
      if (j.within(j.target, true, true) || f.delegate) {
        g = f.handleCls;
        f.mouseIsOut = false;
        if (g) {
          for (c = 0, a = f.handleEls.length; c < a; c++) {
            d = f.handleEls[c];
            b = d.delegateCls;
            if (!b) {
              b = d.delegateCls = [g, "-", d.region, "-over"].join("")
            }
            d.addCls([b, f.overCls])
          }
        }
        f.fireEvent("mouseover", f, j, f.delegate ? j.getTarget(f.delegate,
          h) : f.handle)
      }
    }
  },
  onMouseOut: function(f) {
    var d = this,
      c, b, a;
    if (d.mouseIsDown) {
      d.mouseIsOut = true
    } else {
      if (d.handleCls) {
        for (b = 0, a = d.handleEls.length; b < a; b++) {
          c = d.handleEls[b];
          c.removeCls([c.delegateCls, d.overCls])
        }
      }
      d.fireEvent("mouseout", d, f)
    }
  },
  onMouseDown: function(c, b) {
    var a = this;
    if (a.disabled || c.dragTracked) {
      return
    }
    a.dragTarget = a.delegate ? b : a.handle.dom;
    a.startXY = a.lastXY = c.getXY();
    a.startRegion = Ext.fly(a.dragTarget).getRegion();
    if (a.fireEvent("mousedown", a, c) === false || a.fireEvent(
        "beforedragstart", a, c) === false || a.onBeforeStart(c) ===
      false) {
      return
    }
    a.mouseIsDown = true;
    c.dragTracked = true;
    a.el.setCapture();
    c.stopPropagation();
    if (a.preventDefault !== false) {
      c.preventDefault()
    }
    Ext.getDoc().on({
      scope: a,
      capture: true,
      mouseup: a.onMouseUp,
      mousemove: a.onMouseMove,
      selectstart: a.stopSelect
    });
    a.dragEnded = false;
    if (!a.tolerance) {
      a.triggerStart()
    } else {
      if (a.autoStart) {
        a.timer = Ext.defer(a.triggerStart, a.autoStart === true ? 1000 :
          a.autoStart, a, [c])
      }
    }
  },
  onMouseMove: function(f, d) {
    var b = this,
      c = f.getXY(),
      a = b.startXY;
    f.stopPropagation();
    if (b.preventDefault !== false) {
      f.preventDefault()
    }
    if (b.dragEnded) {
      return
    }
    b.lastXY = c;
    if (!b.active) {
      if (Math.max(Math.abs(a[0] - c[0]), Math.abs(a[1] - c[1])) > b.tolerance) {
        b.triggerStart(f)
      } else {
        return
      }
    }
    if (b.fireEvent("mousemove", b, f) === false) {
      b.onMouseUp(f)
    } else {
      b.onDrag(f);
      b.fireEvent("drag", b, f)
    }
  },
  onMouseUp: function(b) {
    var a = this;
    a.mouseIsDown = false;
    if (a.mouseIsOut) {
      a.mouseIsOut = false;
      a.onMouseOut(b)
    }
    if (a.preventDefault !== false) {
      b.preventDefault()
    }
    if (Ext.isIE && document.releaseCapture) {
      document.releaseCapture()
    }
    a.fireEvent("mouseup", a, b);
    a.endDrag(b)
  },
  endDrag: function(c) {
    var b = this,
      a = b.active;
    Ext.getDoc().un({
      mousemove: b.onMouseMove,
      mouseup: b.onMouseUp,
      selectstart: b.stopSelect,
      capture: true,
      scope: b
    });
    b.clearStart();
    b.active = false;
    if (a) {
      b.dragEnded = true;
      b.onEnd(c);
      b.fireEvent("dragend", b, c)
    }
    b._constrainRegion = null
  },
  triggerStart: function(b) {
    var a = this;
    a.clearStart();
    a.active = true;
    a.onStart(b);
    a.fireEvent("dragstart", a, b)
  },
  clearStart: function() {
    var a = this.timer;
    if (a) {
      clearTimeout(a);
      this.timer = null
    }
  },
  stopSelect: function(a) {
    a.stopEvent();
    return false
  },
  onBeforeStart: function(a) {},
  onStart: function(a) {},
  onDrag: function(a) {},
  onEnd: function(a) {},
  getDragTarget: function() {
    return this.dragTarget
  },
  getDragCt: function() {
    return this.el
  },
  getConstrainRegion: function() {
    var a = this;
    if (a.constrainTo) {
      if (a.constrainTo instanceof Ext.util.Region) {
        return a.constrainTo
      }
      if (!a._constrainRegion) {
        a._constrainRegion = Ext.fly(a.constrainTo).getViewRegion()
      }
    } else {
      if (!a._constrainRegion) {
        a._constrainRegion = a.getDragCt().getViewRegion()
      }
    }
    return a._constrainRegion
  },
  getXY: function(a) {
    return a ? this.constrainModes[a](this, this.lastXY) : this.lastXY
  },
  getOffset: function(c) {
    var b = this.getXY(c),
      a = this.startXY;
    return [b[0] - a[0], b[1] - a[1]]
  },
  onDragStart: function(a) {
    a.stopPropagation()
  },
  constrainModes: {
    point: function(b, d) {
      var c = b.dragRegion,
        a = b.getConstrainRegion();
      if (!a) {
        return d
      }
      c.x = c.left = c[0] = c.right = d[0];
      c.y = c.top = c[1] = c.bottom = d[1];
      c.constrainTo(a);
      return [c.left, c.top]
    },
    dragTarget: function(c, f) {
      var b = c.startXY,
        e = c.startRegion.copy(),
        a = c.getConstrainRegion(),
        d;
      if (!a) {
        return f
      }
      e.translateBy(f[0] - b[0], f[1] - b[1]);
      if (e.right > a.right) {
        f[0] += d = (a.right - e.right);
        e.left += d
      }
      if (e.left < a.left) {
        f[0] += (a.left - e.left)
      }
      if (e.bottom > a.bottom) {
        f[1] += d = (a.bottom - e.bottom);
        e.top += d
      }
      if (e.top < a.top) {
        f[1] += (a.top - e.top)
      }
      return f
    }
  }
}, 1, 0, 0, 0, 0, [
  ["observable", Ext.util.Observable]
], [Ext.dd, "DragTracker"], 0));
(Ext.cmd.derive("Ext.resizer.SplitterTracker", Ext.dd.DragTracker, {
  enabled: true,
  overlayCls: "x-resizable-overlay",
  createDragOverlay: function() {
    var a, b = Ext.dom.Element;
    a = this.overlay = Ext.getBody().createChild({
      role: "presentation",
      cls: this.overlayCls,
      html: "&#160;"
    });
    a.unselectable();
    a.setSize(b.getDocumentWidth(), b.getDocumentHeight());
    a.show()
  },
  getPrevCmp: function() {
    var a = this.getSplitter();
    return a.previousSibling(":not([hidden])")
  },
  getNextCmp: function() {
    var a = this.getSplitter();
    return a.nextSibling(":not([hidden])")
  },
  onBeforeStart: function(h) {
    var d = this,
      f = d.getPrevCmp(),
      a = d.getNextCmp(),
      c = d.getSplitter().collapseEl,
      g = h.getTarget(),
      b;
    if (!f || !a) {
      return false
    }
    if (c && g === c.dom) {
      return false
    }
    if (a.collapsed || f.collapsed) {
      return false
    }
    d.prevBox = f.getEl().getBox();
    d.nextBox = a.getEl().getBox();
    d.constrainTo = b = d.calculateConstrainRegion();
    if (!b) {
      return false
    }
    return b
  },
  onStart: function(b) {
    var a = this.getSplitter();
    this.createDragOverlay();
    a.addCls(a.baseCls + "-active")
  },
  onResizeKeyDown: function(f) {
    var b = this,
      d = b.getSplitter(),
      a = f.getKey(),
      c = d.orientation === "vertical" ? 0 : 1,
      h = a === f.UP || a === f.LEFT ? -1 : 1,
      g;
    if (!b.active && b.onBeforeStart(f)) {
      Ext.fly(f.target).on("keyup", b.onResizeKeyUp, b);
      b.triggerStart(f);
      b.onMouseDown(f);
      b.startXY = d.getXY();
      b.lastKeyDownXY = Ext.Array.slice(b.startXY);
      g = b.easing = new Ext.fx.easing.Linear();
      g.setStartTime(Ext.Date.now());
      g.setStartValue(1);
      g.setEndValue(4);
      g.setDuration(2000)
    }
    if (b.active) {
      b.lastKeyDownXY[c] = Math.round(b.lastKeyDownXY[c] + (h * b.easing.getValue()));
      b.lastXY = b.lastKeyDownXY;
      d.setXY(b.getXY("dragTarget"))
    }
  },
  onResizeKeyUp: function(a) {
    this.onMouseUp(a)
  },
  calculateConstrainRegion: function() {
    var g = this,
      a = g.getSplitter(),
      h = a.getWidth(),
      i = a.defaultSplitMin,
      b = a.orientation,
      e = g.prevBox,
      j = g.getPrevCmp(),
      c = g.nextBox,
      f = g.getNextCmp(),
      l, k, d;
    if (b === "vertical") {
      d = {
        prevCmp: j,
        nextCmp: f,
        prevBox: e,
        nextBox: c,
        defaultMin: i,
        splitWidth: h
      };
      l = new Ext.util.Region(e.y, g.getVertPrevConstrainRight(d), e.bottom,
        g.getVertPrevConstrainLeft(d));
      k = new Ext.util.Region(c.y, g.getVertNextConstrainRight(d), c.bottom,
        g.getVertNextConstrainLeft(d))
    } else {
      l = new Ext.util.Region(e.y + (j.minHeight || i), e.right, (j.maxHeight ?
        e.y + j.maxHeight : c.bottom - (f.minHeight || i)) + h, e.x);
      k = new Ext.util.Region((f.maxHeight ? c.bottom - f.maxHeight : e.y +
        (j.minHeight || i)) - h, c.right, c.bottom - (f.minHeight ||
        i), c.x)
    }
    return l.intersect(k)
  },
  performResize: function(m, g) {
    var o = this,
      a = o.getSplitter(),
      h = a.orientation,
      p = o.getPrevCmp(),
      n = o.getNextCmp(),
      b = a.ownerCt,
      k = b.query(">[flex]"),
      l = k.length,
      c = h === "vertical",
      j = 0,
      f = c ? "width" : "height",
      d = 0,
      q, r;
    for (; j < l; j++) {
      q = k[j];
      r = c ? q.getWidth() : q.getHeight();
      d += r;
      q.flex = r
    }
    g = c ? g[0] : g[1];
    if (p) {
      r = o.prevBox[f] + g;
      if (p.flex) {
        p.flex = r
      } else {
        p[f] = r
      }
    }
    if (n) {
      r = o.nextBox[f] - g;
      if (n.flex) {
        n.flex = r
      } else {
        n[f] = r
      }
    }
    b.updateLayout()
  },
  endDrag: function() {
    var a = this;
    if (a.overlay) {
      a.overlay.destroy();
      delete a.overlay
    }
    Ext.dd.DragTracker.prototype.endDrag.apply(this, arguments)
  },
  onEnd: function(c) {
    var a = this,
      b = a.getSplitter();
    b.removeCls(b.baseCls + "-active");
    a.performResize(c, a.getResizeOffset())
  },
  onDrag: function(f) {
    var c = this,
      g = c.getOffset("dragTarget"),
      d = c.getSplitter(),
      b = d.getEl(),
      a = d.orientation;
    if (a === "vertical") {
      b.setX(c.startRegion.left + g[0])
    } else {
      b.setY(c.startRegion.top + g[1])
    }
  },
  getSplitter: function() {
    return this.splitter
  },
  getVertPrevConstrainRight: function(a) {
    return (a.prevCmp.maxWidth ? a.prevBox.x + a.prevCmp.maxWidth : a.nextBox
      .right - (a.nextCmp.minWidth || a.defaultMin)) + a.splitWidth
  },
  getVertPrevConstrainLeft: function(a) {
    return a.prevBox.x + (a.prevCmp.minWidth || a.defaultMin)
  },
  getVertNextConstrainRight: function(a) {
    return a.nextBox.right - (a.nextCmp.minWidth || a.defaultMin)
  },
  getVertNextConstrainLeft: function(a) {
    return (a.nextCmp.maxWidth ? a.nextBox.right - a.nextCmp.maxWidth : a
      .prevBox.x + (a.prevBox.minWidth || a.defaultMin)) - a.splitWidth
  },
  getResizeOffset: function() {
    return this.getOffset("dragTarget")
  }
}, 0, 0, 0, 0, 0, 0, [Ext.resizer, "SplitterTracker"], 0));
(Ext.cmd.derive("Ext.dd.DDTarget", Ext.dd.DragDrop, {
  constructor: function(c, a, b) {
    if (c) {
      this.initTarget(c, a, b)
    }
  },
  getDragEl: Ext.emptyFn,
  isValidHandleChild: Ext.emptyFn,
  startDrag: Ext.emptyFn,
  endDrag: Ext.emptyFn,
  onDrag: Ext.emptyFn,
  onDragDrop: Ext.emptyFn,
  onDragEnter: Ext.emptyFn,
  onDragOut: Ext.emptyFn,
  onDragOver: Ext.emptyFn,
  onInvalidDrop: Ext.emptyFn,
  onMouseDown: Ext.emptyFn,
  onMouseUp: Ext.emptyFn,
  setXConstraint: Ext.emptyFn,
  setYConstraint: Ext.emptyFn,
  resetConstraints: Ext.emptyFn,
  clearConstraints: Ext.emptyFn,
  clearTicks: Ext.emptyFn,
  setInitPosition: Ext.emptyFn,
  setDragElId: Ext.emptyFn,
  setHandleElId: Ext.emptyFn,
  setOuterHandleElId: Ext.emptyFn,
  addInvalidHandleClass: Ext.emptyFn,
  addInvalidHandleId: Ext.emptyFn,
  addInvalidHandleType: Ext.emptyFn,
  removeInvalidHandleClass: Ext.emptyFn,
  removeInvalidHandleId: Ext.emptyFn,
  removeInvalidHandleType: Ext.emptyFn,
  toString: function() {
    return ("DDTarget " + this.id)
  }
}, 3, 0, 0, 0, 0, 0, [Ext.dd, "DDTarget"], 0));
(Ext.cmd.derive("Ext.dd.ScrollManager", Ext.Base, {
  singleton: true,
  dirTrans: {
    up: -1,
    left: -1,
    down: 1,
    right: 1
  },
  constructor: function() {
    var a = Ext.dd.DragDropManager;
    a.fireEvents = Ext.Function.createSequence(a.fireEvents, this.onFire,
      this);
    a.stopDrag = Ext.Function.createSequence(a.stopDrag, this.onStop,
      this);
    this.doScroll = this.doScroll.bind(this);
    this.ddmInstance = a;
    this.els = {};
    this.dragEl = null;
    this.proc = {}
  },
  onStop: function(a) {
    var b = Ext.dd.ScrollManager;
    b.dragEl = null;
    b.clearProc()
  },
  triggerRefresh: function() {
    if (this.ddmInstance.dragCurrent) {
      this.ddmInstance.refreshCache(this.ddmInstance.dragCurrent.groups)
    }
  },
  doScroll: function() {
    var f = this;
    if (f.ddmInstance.dragCurrent) {
      var a = f.proc,
        e = a.el,
        c = a.component,
        g = a.el.ddScrollConfig,
        h = g && g.increment ? g.increment : f.increment,
        b = g && "animate" in g ? g.animate : f.animate,
        d = function() {
          f.triggerRefresh()
        };
      if (b) {
        if (b === true) {
          b = {
            callback: d
          }
        } else {
          b.callback = b.callback ? Ext.Function.createSequence(b.callback,
            d) : d
        }
      }
      if (c) {
        h = h * f.dirTrans[a.dir];
        if (a.dir === "up" || a.dir === "down") {
          c.scrollBy(0, h, b)
        } else {
          c.scrollBy(h, 0, b)
        }
      } else {
        e.scroll(a.dir, h, b)
      }
      if (!b) {
        d()
      }
    }
  },
  clearProc: function() {
    var a = this.proc;
    if (a.id) {
      clearInterval(a.id)
    }
    a.id = 0;
    a.el = null;
    a.dir = ""
  },
  startProc: function(c, b) {
    var d = this,
      a = d.proc,
      f, e;
    d.clearProc();
    a.el = c;
    a.dir = b;
    f = c.ddScrollConfig ? c.ddScrollConfig.ddGroup : undefined;
    e = (c.ddScrollConfig && c.ddScrollConfig.frequency) ? c.ddScrollConfig
      .frequency : d.frequency;
    if (f === undefined || d.ddmInstance.dragCurrent.ddGroup === f) {
      a.id = Ext.interval(d.doScroll, e)
    }
  },
  onFire: function(g, j) {
    var i = this,
      k, h, d, a, b, f, c;
    if (j || !i.ddmInstance.dragCurrent) {
      return
    }
    if (!i.dragEl || i.dragEl !== i.ddmInstance.dragCurrent) {
      i.dragEl = i.ddmInstance.dragCurrent;
      i.refreshCache()
    }
    k = g.getPoint();
    h = i.proc;
    d = i.els;
    for (a in d) {
      b = d[a];
      f = b._region;
      c = b.ddScrollConfig || i;
      if (f && f.contains(k) && b.isScrollable()) {
        if (f.bottom - k.y <= c.vthresh) {
          if (h.el !== b) {
            i.startProc(b, "down")
          }
          return
        } else {
          if (f.right - k.x <= c.hthresh) {
            if (h.el !== b) {
              i.startProc(b, "right")
            }
            return
          } else {
            if (k.y - f.top <= c.vthresh) {
              if (h.el !== b) {
                i.startProc(b, "up")
              }
              return
            } else {
              if (k.x - f.left <= c.hthresh) {
                if (h.el !== b) {
                  i.startProc(b, "left")
                }
                return
              }
            }
          }
        }
      }
    }
    i.clearProc()
  },
  register: function(c) {
    if (Ext.isArray(c)) {
      for (var b = 0, a = c.length; b < a; b++) {
        this.register(c[b])
      }
    } else {
      c = Ext.get(c);
      this.els[c.id] = c
    }
  },
  unregister: function(c) {
    if (Ext.isArray(c)) {
      for (var b = 0, a = c.length; b < a; b++) {
        this.unregister(c[b])
      }
    } else {
      c = Ext.get(c);
      delete this.els[c.id]
    }
  },
  vthresh: 25 * (window.devicePixelRatio || 1),
  hthresh: 25 * (window.devicePixelRatio || 1),
  increment: 100,
  frequency: 500,
  animate: true,
  animDuration: 0.4,
  ddGroup: undefined,
  refreshCache: function() {
    var a = this.els,
      b;
    for (b in a) {
      if (typeof a[b] === "object") {
        a[b]._region = a[b].getRegion()
      }
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.dd, "ScrollManager"], 0));
(Ext.cmd.derive("Ext.dd.DropTarget", Ext.dd.DDTarget, {
  constructor: function(b, a) {
    this.el = Ext.get(b);
    Ext.apply(this, a);
    if (this.containerScroll) {
      Ext.dd.ScrollManager.register(this.el)
    }
    Ext.dd.DDTarget.prototype.constructor.call(this, this.el.dom, this.ddGroup ||
      this.group, {
        isTarget: true
      })
  },
  containerScroll: false,
  dropAllowed: "x-dd-drop-ok",
  dropNotAllowed: "x-dd-drop-nodrop",
  isTarget: true,
  isNotifyTarget: true,
  notifyEnter: function(a, c, b) {
    if (this.overClass) {
      this.el.addCls(this.overClass)
    }
    return this.dropAllowed
  },
  notifyOver: function(a, c, b) {
    return this.dropAllowed
  },
  notifyOut: function(a, c, b) {
    if (this.overClass) {
      this.el.removeCls(this.overClass)
    }
  },
  notifyDrop: function(a, c, b) {
    if (this.overClass) {
      this.el.removeCls(this.overClass)
    }
    return false
  },
  destroy: function() {
    Ext.dd.DDTarget.prototype.destroy.call(this);
    if (this.containerScroll) {
      Ext.dd.ScrollManager.unregister(this.el)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.dd, "DropTarget"], 0));
(Ext.cmd.derive("Ext.dd.DragZone", Ext.dd.DragSource, {
  constructor: function(c, b) {
    var d = this,
      a = d.containerScroll;
    Ext.dd.DragSource.prototype.constructor.call(this, c, b);
    if (a) {
      c = d.scrollEl || c;
      c = Ext.get(c);
      if (Ext.isObject(a)) {
        c.ddScrollConfig = a
      }
      Ext.dd.ScrollManager.register(c)
    }
  },
  getDragData: function(a) {
    return Ext.dd.Registry.getHandleFromEvent(a)
  },
  onInitDrag: function(a, b) {
    this.proxy.update(this.dragData.ddel.cloneNode(true));
    this.onStartDrag(a, b);
    return true
  },
  getRepairXY: function(a) {
    return Ext.fly(this.dragData.ddel).getXY()
  },
  destroy: function() {
    Ext.dd.DragSource.prototype.destroy.call(this);
    if (this.containerScroll) {
      Ext.dd.ScrollManager.unregister(this.scrollEl || this.el)
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.dd, "DragZone"], 0));
(Ext.cmd.derive("Ext.dd.Registry", Ext.Base, {
  singleton: true,
  constructor: function() {
    this.elements = {};
    this.handles = {};
    this.autoIdSeed = 0
  },
  getId: function(b, a) {
    if (typeof b === "string") {
      return b
    }
    var c = b.id;
    if (!c && a !== false) {
      c = "extdd-" + (++this.autoIdSeed);
      b.id = c
    }
    return c
  },
  register: function(d, e) {
    e = e || {};
    if (typeof d === "string") {
      d = document.getElementById(d)
    }
    e.ddel = d;
    this.elements[this.getId(d)] = e;
    if (e.isHandle !== false) {
      this.handles[e.ddel.id] = e
    }
    if (e.handles) {
      var c = e.handles,
        b, a;
      for (b = 0, a = c.length; b < a; b++) {
        this.handles[this.getId(c[b])] = e
      }
    }
  },
  unregister: function(d) {
    var f = this.getId(d, false),
      e = this.elements[f],
      c, b, a;
    if (e) {
      delete this.elements[f];
      if (e.handles) {
        c = e.handles;
        for (b = 0, a = c.length; b < a; b++) {
          delete this.handles[this.getId(c[b], false)]
        }
      }
    }
  },
  getHandle: function(a) {
    if (typeof a !== "string") {
      a = a.id
    }
    return this.handles[a]
  },
  getHandleFromEvent: function(b) {
    var a = b.getTarget();
    return a ? this.handles[a.id] : null
  },
  getTarget: function(a) {
    if (typeof a !== "string") {
      a = a.id
    }
    return this.elements[a]
  },
  getTargetFromEvent: function(b) {
    var a = b.getTarget();
    return a ? this.elements[a.id] || this.handles[a.id] : null
  }
}, 1, 0, 0, 0, 0, 0, [Ext.dd, "Registry"], 0));
(Ext.cmd.derive("Ext.dd.DropZone", Ext.dd.DropTarget, {
  getTargetFromEvent: function(a) {
    return Ext.dd.Registry.getTargetFromEvent(a)
  },
  onNodeEnter: function(d, a, c, b) {},
  onNodeOver: function(d, a, c, b) {
    return this.dropAllowed
  },
  onNodeOut: function(d, a, c, b) {},
  onNodeDrop: function(d, a, c, b) {
    return false
  },
  onContainerOver: function(a, c, b) {
    return this.dropNotAllowed
  },
  onContainerDrop: function(a, c, b) {
    return false
  },
  notifyEnter: function(a, c, b) {
    return this.dropNotAllowed
  },
  notifyOver: function(a, d, c) {
    var b = this,
      f = b.getTargetFromEvent(d);
    if (!f) {
      if (b.lastOverNode) {
        b.onNodeOut(b.lastOverNode, a, d, c);
        b.lastOverNode = null
      }
      return b.onContainerOver(a, d, c)
    }
    if (b.lastOverNode !== f) {
      if (b.lastOverNode) {
        b.onNodeOut(b.lastOverNode, a, d, c)
      }
      b.onNodeEnter(f, a, d, c);
      b.lastOverNode = f
    }
    return b.onNodeOver(f, a, d, c)
  },
  notifyOut: function(a, c, b) {
    if (this.lastOverNode) {
      this.onNodeOut(this.lastOverNode, a, c, b);
      this.lastOverNode = null
    }
  },
  notifyDrop: function(b, f, d) {
    var c = this,
      g = c.getTargetFromEvent(f),
      a = g ? c.onNodeDrop(g, b, f, d) : c.onContainerDrop(b, f, d);
    if (c.lastOverNode) {
      c.onNodeOut(c.lastOverNode, b, f, d);
      c.lastOverNode = null
    }
    return a
  },
  triggerCacheRefresh: function() {
    Ext.dd.DDM.refreshCache(this.groups)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.dd, "DropZone"], 0));
(Ext.cmd.derive("Ext.event.publisher.MouseEnterLeave", Ext.event.publisher.Dom, {
  type: "mouseEnterLeave"
}, 0, 0, 0, 0, 0, 0, [Ext.event.publisher, "MouseEnterLeave"], function(a) {
  var b = {
    mouseover: "mouseenter",
    mouseout: "mouseleave"
  };
  if (!Ext.supports.MouseEnterLeave) {
    a.override({
      handledDomEvents: ["mouseover", "mouseout"],
      handledEvents: ["mouseenter", "mouseleave"],
      doDelegatedEvent: function(i) {
        var h, c, j, f, d, g;
        i = this.callParent([i]);
        h = i.getTarget();
        c = i.getRelatedTarget();
        if (c && Ext.fly(h).contains(c)) {
          return
        }
        j = h.id;
        if (j) {
          f = Ext.cache[j];
          if (f) {
            d = b[i.type];
            i = i.chain({
              type: d
            });
            if (f.hasListeners[d]) {
              g = f.events[d];
              if (g) {
                g = g.directs;
                if (g) {
                  i.setCurrentTarget(f.dom);
                  g.fire(i, i.target)
                }
              }
            }
          }
        }
      }
    })
  }
  a.instance = new a()
}));
(Ext.cmd.derive("Ext.util.ComponentDragger", Ext.dd.DragTracker, {
  autoStart: 500,
  constructor: function(a, b) {
    this.comp = a;
    this.initialConstrainTo = b.constrainTo;
    Ext.dd.DragTracker.prototype.constructor.call(this, b)
  },
  onStart: function(c) {
    var b = this,
      a = b.comp;
    b.startPosition = a.getXY();
    if (a.ghost && !a.liveDrag) {
      b.proxy = a.ghost();
      b.dragTarget = b.proxy.header.el
    }
    if (b.constrain || b.constrainDelegate) {
      b.constrainTo = b.calculateConstrainRegion()
    }
    if (a.beginDrag) {
      a.beginDrag()
    }
  },
  calculateConstrainRegion: function() {
    var h = this,
      f = h.comp,
      g = h.initialConstrainTo,
      e = f.constraintInsets,
      j, b, d, c = h.proxy ? h.proxy.el : f.el,
      i = c.shadow,
      a = (i && !h.constrainDelegate && f.constrainShadow && !i.disabled) ?
      i.getShadowSize() : 0;
    if (!(g instanceof Ext.util.Region)) {
      j = Ext.fly(g);
      g = j.getConstrainRegion()
    } else {
      g = g.copy()
    }
    if (e) {
      e = Ext.isObject(e) ? e : Ext.Element.parseBox(e);
      g.adjust(e.top, e.right, e.bottom, e.length)
    }
    if (a) {
      g.adjust(a[0], -a[1], -a[2], a[3])
    }
    if (!h.constrainDelegate) {
      b = Ext.fly(h.dragTarget).getRegion();
      d = c.getRegion();
      g.adjust(b.top - d.top, b.right - d.right, b.bottom - d.bottom, b.left -
        d.left)
    }
    return g
  },
  onDrag: function(c) {
    var b = this,
      a = (b.proxy && !b.comp.liveDrag) ? b.proxy : b.comp,
      d = b.getOffset(b.constrain || b.constrainDelegate ? "dragTarget" :
        null);
    a.setPagePosition(b.startPosition[0] + d[0], b.startPosition[1] + d[1])
  },
  onEnd: function(b) {
    var a = this.comp;
    if (a.destroyed || a.destroying) {
      return
    }
    if (this.proxy && !a.liveDrag) {
      a.unghost()
    }
    if (a.endDrag) {
      a.endDrag()
    }
  }
}, 1, 0, 0, 0, 0, 0, [Ext.util, "ComponentDragger"], 0));
(Ext.cmd.derive("Ext.util.FocusTrap", Ext.Mixin, {
  mixinConfig: {
    id: "focustrap",
    after: {
      afterRender: "initTabGuards",
      addTool: "initTabGuards",
      add: "initTabGuards",
      remove: "initTabGuards",
      addDocked: "initTabGuards",
      removeDocked: "initTabGuards",
      onShow: "initTabGuards",
      afterHide: "initTabGuards"
    }
  },
  config: {
    tabGuard: true,
    tabGuardTpl: '<div id="{id}-{tabGuardEl}" data-ref="{tabGuardEl}" role="button" data-tabguardposition="{tabGuard}" aria-busy="true" style="height:0"class="x-hidden-clip"></div>',
    tabGuardIndex: 0
  },
  tabGuardPositionAttribute: "data-tabguardposition",
  privates: {
    initTabGuards: function() {
      var e = this,
        c = e.tabGuardPositionAttribute,
        d = e.tabGuardBeforeEl,
        f = e.tabGuardAfterEl,
        a = e.tabGuardIndex,
        b;
      if (!e.rendered || !e.tabGuard) {
        return
      }
      b = e.el.findTabbableElements({
        skipSelf: true
      });
      if (b[0] && b[0].hasAttribute(c)) {
        b.shift()
      }
      if (b.length && b[b.length - 1].hasAttribute(c)) {
        b.pop()
      }
      if (b.length) {
        d.dom.setAttribute("tabIndex", a);
        d.on("focusenter", e.onTabGuardFocusEnter, e);
        f.dom.setAttribute("tabIndex", a);
        f.on("focusenter", e.onTabGuardFocusEnter, e)
      } else {
        d.dom.removeAttribute("tabIndex");
        d.un("focusenter", e.onTabGuardFocusEnter, e);
        f.dom.removeAttribute("tabIndex");
        f.un("focusenter", e.onTabGuardFocusEnter, e)
      }
    },
    onTabGuardFocusEnter: function(f, g) {
      var h = this,
        b = h.el,
        i = h.tabGuardPositionAttribute,
        d = g.getAttribute(i),
        j = f.relatedTarget,
        a, c, k;
      if (!j.hasAttribute(i) && j !== b.dom && b.contains(j)) {
        c = d === "before" ? false : true
      } else {
        c = d === "before" ? true : false
      }
      a = b.findTabbableElements({
        skipSelf: true
      });
      a.shift();
      a.pop();
      k = c ? a[0] : a[a.length - 1];
      if (k) {
        k.focus()
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.util, "FocusTrap"], 0));
(Ext.cmd.derive("Ext.window.Window", Ext.panel.Panel, {
  alternateClassName: "Ext.Window",
  baseCls: "x-window",
  resizable: true,
  draggable: true,
  constrain: false,
  constrainHeader: false,
  plain: false,
  minimizable: false,
  maximizable: false,
  minHeight: 50,
  minWidth: 50,
  expandOnShow: true,
  collapsible: false,
  closable: true,
  hidden: true,
  autoRender: true,
  hideMode: "offsets",
  floating: true,
  itemCls: "x-window-item",
  overlapHeader: true,
  ignoreHeaderBorderManagement: true,
  alwaysFramed: true,
  isRootCfg: {
    isRoot: true
  },
  isWindow: true,
  ariaRole: "dialog",
  initComponent: function() {
    var a = this;
    a.frame = false;
    Ext.panel.Panel.prototype.initComponent.call(this);
    if (a.plain) {
      a.addClsWithUI("plain")
    }
    a.addStateEvents(["maximize", "restore", "resize", "dragend"])
  },
  getElConfig: function() {
    var b = this,
      a;
    a = Ext.panel.Panel.prototype.getElConfig.call(this);
    a.tabIndex = -1;
    return a
  },
  getFocusEl: function() {
    return this.getDefaultFocus() || this.el
  },
  getState: function() {
    var b = this,
      d = Ext.panel.Panel.prototype.getState.call(this) || {},
      a = !!b.maximized,
      c = b.ghostBox,
      e;
    d.maximized = a;
    if (a) {
      e = b.restorePos
    } else {
      if (c) {
        e = [c.x, c.y]
      } else {
        e = b.getPosition()
      }
    }
    Ext.apply(d, {
      size: a ? b.restoreSize : b.getSize(),
      pos: e
    });
    return d
  },
  applyState: function(b) {
    var a = this;
    if (b) {
      a.maximized = b.maximized;
      if (a.maximized) {
        a.hasSavedRestore = true;
        a.restoreSize = b.size;
        a.restorePos = b.pos
      } else {
        Ext.apply(a, {
          width: b.size.width,
          height: b.size.height,
          x: b.pos[0],
          y: b.pos[1]
        })
      }
    }
  },
  onRender: function(b, a) {
    var c = this;
    Ext.panel.Panel.prototype.onRender.apply(this, arguments);
    if (c.header) {
      c.header.on({
        scope: c,
        click: c.onHeaderClick
      })
    }
    if (c.maximizable) {
      c.header.on({
        scope: c,
        dblclick: c.toggleMaximize
      })
    }
  },
  afterRender: function() {
    var a = this,
      c = a.header,
      b;
    if (a.maximized) {
      a.maximized = false;
      a.maximize();
      if (c) {
        c.removeCls(c.indicateDragCls)
      }
    }
    Ext.panel.Panel.prototype.afterRender.call(this);
    if (a.closable) {
      b = a.getKeyMap();
      b.on(27, a.onEsc, a)
    } else {
      b = a.keyMap
    }
    if (b && a.hidden) {
      b.disable()
    }
  },
  onEsc: function(a, b) {
    b.stopEvent();
    this.close()
  },
  beforeDestroy: function() {
    var a = this;
    if (a.rendered) {
      Ext.un("resize", a.onWindowResize, a);
      delete a.animateTarget;
      a.hide();
      Ext.destroy(a.keyMap)
    }
    Ext.panel.Panel.prototype.beforeDestroy.call(this)
  },
  addTools: function() {
    var a = this,
      b = [];
    Ext.panel.Panel.prototype.addTools.call(this);
    if (a.minimizable) {
      b.push({
        type: "minimize",
        handler: "minimize",
        scope: a
      })
    }
    if (a.maximizable) {
      b.push({
        type: a.maximized ? "restore" : "maximize",
        handler: "toggleMaximize",
        scope: a
      })
    }
    if (b.length) {
      a.addTool(b)
    }
  },
  onShow: function() {
    var a = this;
    Ext.panel.Panel.prototype.onShow.apply(this, arguments);
    if (a.expandOnShow) {
      a.expand(false)
    }
    a.syncMonitorWindowResize();
    if (a.keyMap) {
      a.keyMap.enable()
    }
  },
  doClose: function() {
    var a = this;
    if (a.hidden) {
      a.fireEvent("close", a);
      if (a.closeAction === "destroy") {
        a.destroy()
      }
    } else {
      a.hide(a.animateTarget, a.doClose, a)
    }
  },
  afterHide: function() {
    var a = this;
    a.syncMonitorWindowResize();
    if (a.keyMap) {
      a.keyMap.disable()
    }
    Ext.panel.Panel.prototype.afterHide.apply(this, arguments)
  },
  onWindowResize: function() {
    var b = this,
      a;
    if (!b.destroyed) {
      if (b.maximized) {
        b.fitContainer()
      } else {
        a = b.getSizeModel();
        if (a.width.natural || a.height.natural) {
          b.updateLayout()
        }
        b.doConstrain()
      }
    }
  },
  minimize: function() {
    this.fireEvent("minimize", this);
    return this
  },
  resumeHeaderLayout: function(a) {
    this.header.resumeLayouts(a ? this.isRootCfg : null)
  },
  afterCollapse: function() {
    var a = this,
      c = a.header,
      b = a.tools;
    if (c && a.maximizable) {
      c.suspendLayouts();
      b.maximize.hide();
      this.resumeHeaderLayout(true)
    }
    if (a.resizer) {
      a.resizer.disable()
    }
    Ext.panel.Panel.prototype.afterCollapse.apply(this, arguments)
  },
  afterExpand: function() {
    var a = this,
      d = a.header,
      b = a.tools,
      c;
    if (d) {
      d.suspendLayouts();
      if (a.maximizable) {
        b.maximize.show();
        c = true
      }
      this.resumeHeaderLayout(c)
    }
    if (a.resizer) {
      a.resizer.enable()
    }
    Ext.panel.Panel.prototype.afterExpand.apply(this, arguments)
  },
  maximize: function(b) {
    var e = this,
      h = e.header,
      f = e.tools,
      d = e.width,
      a = e.height,
      c, g;
    if (!e.maximized) {
      e.expand(false);
      if (!e.hasSavedRestore) {
        c = e.restoreSize = {
          width: d ? d : null,
          height: a ? a : null
        };
        e.restorePos = e.getPosition()
      }
      if (h) {
        h.suspendLayouts();
        if (f.maximize) {
          f.maximize.setType("restore")
        }
        if (e.collapseTool) {
          e.collapseTool.hide();
          g = true
        }
        e.resumeHeaderLayout(g)
      }
      e.el.disableShadow();
      if (e.dd) {
        e.dd.disable();
        if (h) {
          h.removeCls(h.indicateDragCls)
        }
      }
      if (e.resizer) {
        e.resizer.disable()
      }
      e.el.addCls("x-window-maximized");
      e.container.addCls("x-window-maximized-ct");
      e.syncMonitorWindowResize();
      e.fitContainer(b = (b || !!e.animateTarget) ? {
        callback: function() {
          e.maximized = true;
          e.fireEvent("maximize", e)
        }
      } : null);
      if (!b) {
        e.maximized = true;
        e.fireEvent("maximize", e)
      }
    }
    return e
  },
  restore: function(b) {
    var c = this,
      d = c.tools,
      f = c.header,
      a = c.restoreSize,
      e;
    if (c.maximized) {
      c.hasSavedRestore = null;
      c.removeCls("x-window-maximized");
      if (f) {
        f.suspendLayouts();
        if (d.maximize) {
          d.maximize.setType("maximize")
        }
        if (c.collapseTool) {
          c.collapseTool.show();
          e = true
        }
        c.resumeHeaderLayout(e)
      }
      a.x = c.restorePos[0];
      a.y = c.restorePos[1];
      c.setBox(a, b = (b || !!c.animateTarget) ? {
        callback: function() {
          c.el.enableShadow(null, true);
          c.maximized = false;
          c.fireEvent("restore", c)
        }
      } : null);
      c.restorePos = c.restoreSize = null;
      if (c.dd) {
        c.dd.enable();
        if (f) {
          f.addCls(f.indicateDragCls)
        }
      }
      if (c.resizer) {
        c.resizer.enable()
      }
      c.container.removeCls("x-window-maximized-ct");
      c.syncMonitorWindowResize();
      if (!b) {
        c.el.enableShadow(null, true);
        c.maximized = false;
        c.fireEvent("restore", c)
      }
    }
    return c
  },
  syncMonitorWindowResize: function() {
    var b = this,
      c = b._monitoringResize,
      d = b.monitorResize || b.constrain || b.constrainHeader || b.maximized,
      a = b.hidden || b.destroying || b.destroyed;
    if (d && !a) {
      if (!c) {
        Ext.on("resize", b.onWindowResize, b, {
          buffer: 1
        });
        b._monitoringResize = true
      }
    } else {
      if (c) {
        Ext.un("resize", b.onWindowResize, b);
        b._monitoringResize = false
      }
    }
  },
  toggleMaximize: function() {
    return this[this.maximized ? "restore" : "maximize"]()
  },
  createGhost: function() {
    var a = Ext.panel.Panel.prototype.createGhost.apply(this, arguments);
    a.xtype = "window";
    a.focusOnToFront = false;
    return a
  },
  getDefaultFocus: function() {
    var c = this,
      b, d = c.defaultFocus,
      a;
    if (d !== undefined) {
      if (Ext.isNumber(d)) {
        b = c.query("button")[d]
      } else {
        if (Ext.isString(d)) {
          a = d;
          if (Ext.validIdRe.test(a)) {
            b = c.down(Ext.makeIdSelector(a))
          }
          if (!b) {
            b = c.down(a)
          }
        } else {
          if (d.focus) {
            b = d
          }
        }
      }
    }
    return b
  },
  privates: {
    initDraggable: function() {
      this.initSimpleDraggable()
    },
    onHeaderClick: function(c, b) {
      var a;
      if (c.el.contains(b.getTarget())) {
        a = this.getDefaultFocus();
        if (a) {
          a.focus()
        }
      }
    },
    initResizable: function() {
      Ext.panel.Panel.prototype.initResizable.apply(this, arguments);
      if (this.maximized) {
        this.resizer.disable()
      }
    }
  }
}, 0, ["window"], ["component", "box", "container", "panel", "window"], {
  component: true,
  box: true,
  container: true,
  panel: true,
  window: true
}, ["widget.window"], [
  [Ext.util.FocusTrap.prototype.mixinId || Ext.util.FocusTrap.$className,
    Ext.util.FocusTrap
  ]
], [Ext.window, "Window", Ext, "Window"], 0));
(Ext.cmd.derive("Ext.form.Labelable", Ext.Mixin, {
  isLabelable: true,
  mixinConfig: {
    id: "labelable",
    on: {
      beforeRender: "beforeLabelRender",
      onRender: "onLabelRender"
    }
  },
  config: {
    childEls: ["labelEl", "bodyEl", "errorEl", "errorWrapEl", "ariaErrorEl"]
  },
  labelableRenderTpl: ["{beforeLabelTpl}",
    '<label id="{id}-labelEl" data-ref="labelEl" class="{labelCls} {labelCls}-{ui} {labelClsExtra} ',
    '{unselectableCls}" style="{labelStyle}"<tpl if="inputId">',
    ' for="{inputId}"</tpl> {labelAttrTpl}>',
    '<span class="{labelInnerCls} {labelInnerCls}-{ui}" style="{labelInnerStyle}">',
    "{beforeLabelTextTpl}", '<tpl if="fieldLabel">{fieldLabel}',
    '<tpl if="labelSeparator">{labelSeparator}</tpl>', "</tpl>",
    "{afterLabelTextTpl}", "</span>", "</label>", "{afterLabelTpl}",
    '<div id="{id}-bodyEl" data-ref="bodyEl" role="presentation"',
    ' class="{baseBodyCls} {baseBodyCls}-{ui}<tpl if="fieldBodyCls">',
    ' {fieldBodyCls} {fieldBodyCls}-{ui}</tpl> {growCls} {extraFieldBodyCls}"',
    '<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>', "{beforeBodyEl}",
    "{beforeSubTpl}", "{[values.$comp.getSubTplMarkup(values)]}",
    "{afterSubTpl}", "{afterBodyEl}",
    '<div id="{id}-ariaErrorEl" data-ref="ariaErrorEl" role="alert" aria-live="polite"',
    ' class="x-hidden-clip">', "</div>", "</div>",
    '<tpl if="renderError">',
    '<div id="{id}-errorWrapEl" data-ref="errorWrapEl" class="{errorWrapCls} {errorWrapCls}-{ui}',
    ' {errorWrapExtraCls}" style="{errorWrapStyle}">',
    '<div role="presentation" id="{id}-errorEl" data-ref="errorEl" ',
    'class="{errorMsgCls} {invalidMsgCls} {invalidMsgCls}-{ui}" ',
    'data-anchorTarget="{tipAnchorTarget}">', "</div>", "</div>",
    "</tpl>", {
      disableFormats: true
    }
  ],
  activeErrorsTpl: undefined,
  htmlActiveErrorsTpl: ['<tpl if="errors && errors.length">',
    '<ul class="{listCls}">', '<tpl for="errors"><li>{.}</li></tpl>',
    "</ul>", "</tpl>"
  ],
  plaintextActiveErrorsTpl: ['<tpl if="errors && errors.length">',
    '<tpl for="errors"><tpl if="xindex &gt; 1">\n</tpl>{.}</tpl>',
    "</tpl>"
  ],
  isFieldLabelable: true,
  formItemCls: "x-form-item",
  labelCls: "x-form-item-label",
  topLabelCls: "x-form-item-label-top",
  rightLabelCls: "x-form-item-label-right",
  labelInnerCls: "x-form-item-label-inner",
  topLabelSideErrorCls: "x-form-item-label-top-side-error",
  errorMsgCls: "x-form-error-msg",
  errorWrapCls: "x-form-error-wrap",
  errorWrapSideCls: "x-form-error-wrap-side",
  errorWrapUnderCls: "x-form-error-wrap-under",
  errorWrapUnderSideLabelCls: "x-form-error-wrap-under-side-label",
  baseBodyCls: "x-form-item-body",
  invalidIconCls: "x-form-invalid-icon",
  invalidUnderCls: "x-form-invalid-under",
  noLabelCls: "x-form-item-no-label",
  fieldBodyCls: "",
  invalidCls: "x-form-invalid",
  fieldLabel: undefined,
  labelAlign: "left",
  labelWidth: 100,
  labelPad: 5,
  labelSeparator: ":",
  hideLabel: false,
  hideEmptyLabel: true,
  preventMark: false,
  autoFitErrors: true,
  msgTarget: "qtip",
  msgTargets: {
    qtip: 1,
    title: 1,
    under: 1,
    side: 1,
    none: 1
  },
  noWrap: true,
  labelableInsertions: ["beforeBodyEl", "afterBodyEl", "beforeLabelTpl",
    "afterLabelTpl", "beforeSubTpl", "afterSubTpl", "beforeLabelTextTpl",
    "afterLabelTextTpl", "labelAttrTpl"
  ],
  statics: {
    initTip: function() {
      var b = this.tip,
        a, c;
      if (b) {
        return
      }
      a = {
        id: "ext-form-error-tip",
        ui: "form-invalid"
      };
      if (Ext.supports.Touch) {
        a.dismissDelay = 0;
        a.anchor = "top";
        a.showDelay = 0;
        a.listeners = {
          beforeshow: function() {
            this.minWidth = Ext.fly(this.anchorTarget).getWidth()
          }
        }
      }
      b = this.tip = Ext.create("Ext.tip.QuickTip", a);
      c = Ext.apply({}, b.tagConfig);
      c.attribute = "errorqtip";
      b.setTagConfig(c)
    },
    destroyTip: function() {
      this.tip = Ext.destroy(this.tip)
    }
  },
  initLabelable: function() {
    var a = this,
      b = a.padding;
    if (b) {
      a.padding = undefined;
      a.extraMargins = Ext.Element.parseBox(b)
    }
    if (Ext.isIE8) {
      a.restoreDisplay = Ext.Function.createDelayed(a.doRestoreDisplay, 0,
        a)
    }
    if (!a.activeErrorsTpl) {
      if (a.msgTarget === "title") {
        a.activeErrorsTpl = a.plaintextActiveErrorsTpl
      } else {
        a.activeErrorsTpl = a.htmlActiveErrorsTpl
      }
    }
    a.addCls([a.formItemCls, a.formItemCls + "-" + a.ui]);
    a.lastActiveError = "";
    a.enableBubble("errorchange")
  },
  trimLabelSeparator: function() {
    var c = this,
      d = c.labelSeparator,
      a = c.fieldLabel || "",
      b = a.substr(a.length - 1);
    return b === d ? a.slice(0, -1) : a
  },
  getFieldLabel: function() {
    return this.trimLabelSeparator()
  },
  setFieldLabel: function(d) {
    d = d || "";
    var e = this,
      f = e.labelSeparator,
      c = e.labelEl,
      b = e.errorWrapEl,
      h = (e.labelAlign !== "top"),
      a = e.noLabelCls,
      g = e.errorWrapUnderSideLabelCls;
    e.fieldLabel = d;
    if (e.rendered) {
      if (Ext.isEmpty(d) && e.hideEmptyLabel) {
        e.addCls(a);
        if (h && b) {
          b.removeCls(g)
        }
      } else {
        if (f) {
          d = e.trimLabelSeparator() + f
        }
        c.dom.firstChild.innerHTML = d;
        e.removeCls(a);
        if (h && b) {
          b.addCls(g)
        }
      }
      e.updateLayout()
    }
  },
  setHideLabel: function(a) {
    var b = this;
    if (a !== b.hideLabel) {
      b.hideLabel = a;
      if (b.rendered) {
        b[a ? "addCls" : "removeCls"](b.noLabelCls);
        b.updateLayout()
      }
    }
  },
  setHideEmptyLabel: function(a) {
    var c = this,
      b;
    if (a !== c.hideEmptyLabel) {
      c.hideEmptyLabel = a;
      if (c.rendered && !c.hideLabel) {
        b = a && !c.getFieldLabel();
        c[b ? "addCls" : "removeCls"](c.noLabelCls);
        c.updateLayout()
      }
    }
  },
  getInsertionRenderData: function(d, e) {
    var b = e.length,
      a, c;
    while (b--) {
      a = e[b];
      c = this[a];
      if (c) {
        if (typeof c !== "string") {
          if (!c.isTemplate) {
            c = Ext.XTemplate.getTpl(this, a)
          }
          c = c.apply(d)
        }
      }
      d[a] = c || ""
    }
    return d
  },
  getLabelableRenderData: function() {
    var o = this,
      r = o.labelAlign,
      e = (r === "top"),
      l = (r === "right"),
      i = (o.msgTarget === "side"),
      f = (o.msgTarget === "under"),
      q = o.errorMsgCls,
      g = o.labelPad,
      n = o.labelWidth,
      b = o.labelClsExtra || "",
      h = i ? o.errorWrapSideCls : o.errorWrapUnderCls,
      a = "",
      k = "",
      d = o.hasVisibleLabel(),
      m = o.autoFitErrors,
      j = o.defaultBodyWidth,
      c, p;
    if (e) {
      b += " " + o.topLabelCls;
      if (g) {
        k = "padding-bottom:" + g + "px;"
      }
      if (i && !m) {
        b += " " + o.topLabelSideErrorCls
      }
    } else {
      if (l) {
        b += " " + o.rightLabelCls
      }
      if (g) {
        a += o.getHorizontalPaddingStyle() + g + "px;"
      }
      a += "width:" + (n + (g ? g : 0)) + "px;";
      k = "width:" + n + "px"
    }
    if (d) {
      if (!e && f) {
        h += " " + o.errorWrapUnderSideLabelCls
      }
    }
    if (j) {
      c = "min-width:" + j + "px;max-width:" + j + "px;"
    }
    p = {
      id: o.id,
      inputId: o.getInputId(),
      labelCls: o.labelCls,
      labelClsExtra: b,
      labelStyle: a + (o.labelStyle || ""),
      labelInnerStyle: k,
      labelInnerCls: o.labelInnerCls,
      unselectableCls: Ext.Element.unselectableCls,
      bodyStyle: c,
      baseBodyCls: o.baseBodyCls,
      fieldBodyCls: o.fieldBodyCls,
      extraFieldBodyCls: o.extraFieldBodyCls,
      errorWrapCls: o.errorWrapCls,
      errorWrapExtraCls: h,
      renderError: i || f,
      invalidMsgCls: i ? o.invalidIconCls : f ? o.invalidUnderCls : "",
      errorMsgCls: q,
      growCls: o.grow ? o.growCls : "",
      tipAnchorTarget: o.id + "-inputEl",
      errorWrapStyle: (i && !m) ? "visibility:hidden" : "display:none",
      fieldLabel: o.getFieldLabel(),
      labelSeparator: o.labelSeparator
    };
    o.getInsertionRenderData(p, o.labelableInsertions);
    return p
  },
  getHorizontalPaddingStyle: function() {
    return "padding-right:"
  },
  beforeLabelRender: function() {
    var a = this;
    a.setFieldDefaults(a.getInherited().fieldDefaults);
    if (a.ownerLayout) {
      a.addCls("x-" + a.ownerLayout.type + "-form-item")
    }
    if (!a.hasVisibleLabel()) {
      a.addCls(a.noLabelCls)
    }
  },
  onLabelRender: function() {
    var d = this,
      c = {},
      f = Ext.Element,
      a = d.errorWrapEl,
      e, b;
    if (a) {
      a.setVisibilityMode((d.msgTarget === "side" && !d.autoFitErrors) ?
        f.VISIBILITY : f.DISPLAY)
    }
    if (d.extraMargins) {
      e = d.el.getMargin();
      for (b in e) {
        if (e.hasOwnProperty(b)) {
          c["margin-" + b] = (e[b] + d.extraMargins[b]) + "px"
        }
      }
      d.el.setStyle(c)
    }
  },
  hasVisibleLabel: function() {
    if (this.hideLabel) {
      return false
    }
    return !(this.hideEmptyLabel && !this.getFieldLabel())
  },
  getSubTplMarkup: function() {
    return ""
  },
  getInputId: function() {
    return ""
  },
  getActiveError: function() {
    return this.activeError || ""
  },
  hasActiveError: function() {
    return !!this.getActiveError()
  },
  setActiveError: function(a) {
    this.setActiveErrors(a)
  },
  getActiveErrors: function() {
    return this.activeErrors || []
  },
  setActiveErrors: function(h) {
    var f = this,
      g = f.errorWrapEl,
      d = f.msgTarget,
      c = d === "side",
      j = d === "qtip",
      a, b, e, i;
    h = Ext.Array.from(h);
    e = f.getTpl("activeErrorsTpl");
    f.activeErrors = h;
    b = f.activeError = e.apply({
      fieldLabel: f.fieldLabel,
      errors: h,
      listCls: "x-list-plain"
    });
    f.renderActiveError();
    if (f.rendered) {
      a = f.getActionEl();
      if (c) {
        f.errorEl.dom.setAttribute("data-errorqtip", b)
      } else {
        if (j) {
          a.dom.setAttribute("data-errorqtip", b)
        } else {
          if (d === "title") {
            a.dom.setAttribute("title", b)
          }
        }
      }
      if (d !== "title") {
        f.ariaErrorEl.dom.innerHTML = h.join(". ");
        a.dom.setAttribute("aria-describedby", f.ariaErrorEl.id)
      }
      if (c || j) {
        Ext.form.Labelable.initTip()
      }
      if (!f.msgTargets[d]) {
        i = Ext.get(d);
        if (i) {
          i.dom.innerHTML = b
        }
      }
    }
    if (g) {
      g.setVisible(h.length > 0);
      if (c && f.autoFitErrors) {
        f.labelEl.addCls(f.topLabelSideErrorCls)
      }
      f.updateLayout()
    }
  },
  unsetActiveError: function() {
    var e = this,
      b = e.errorWrapEl,
      c = e.msgTarget,
      a = e.restoreDisplay,
      d, f;
    if (e.hasActiveError()) {
      delete e.activeError;
      delete e.activeErrors;
      e.renderActiveError();
      if (e.rendered) {
        d = e.getActionEl();
        if (c === "qtip") {
          d.dom.removeAttribute("data-errorqtip")
        } else {
          if (c === "title") {
            d.dom.removeAttribute("title")
          }
        }
        if (c !== "title") {
          e.ariaErrorEl.dom.innerHTML = "";
          d.dom.removeAttribute("aria-describedby")
        }
        if (!e.msgTargets[c]) {
          f = Ext.get(c);
          if (f) {
            f.dom.innerHTML = ""
          }
        }
        if (b) {
          b.hide();
          if (c === "side" && e.autoFitErrors) {
            e.labelEl.removeCls(e.topLabelSideErrorCls)
          }
          e.updateLayout();
          if (a) {
            e.el.dom.style.display = "block";
            e.restoreDisplay()
          }
        }
      }
    }
  },
  doRestoreDisplay: function() {
    var a = this.el;
    if (a && a.dom) {
      a.dom.style.display = ""
    }
  },
  renderActiveError: function() {
    var c = this,
      b = c.getActiveError(),
      a = !!b;
    if (b !== c.lastActiveError) {
      c.lastActiveError = b;
      c.fireEvent("errorchange", c, b)
    }
    if (c.rendered && !c.destroyed && !c.preventMark) {
      c.toggleInvalidCls(a);
      if (c.errorEl) {
        c.errorEl.dom.innerHTML = b
      }
    }
  },
  toggleInvalidCls: function(a) {
    this.el[a ? "addCls" : "removeCls"](this.invalidCls)
  },
  setFieldDefaults: function(b) {
    var a;
    for (a in b) {
      if (!this.hasOwnProperty(a)) {
        this[a] = b[a]
      }
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.form, "Labelable"], function() {
  if (Ext.supports.Touch) {
    this.prototype.msgTarget = "side"
  }
}));
(Ext.cmd.derive("Ext.form.field.Field", Ext.Base, {
  mixinId: "field",
  isFormField: true,
  config: {
    validation: null,
    validationField: null
  },
  disabled: false,
  submitValue: true,
  validateOnChange: true,
  valuePublishEvent: "change",
  suspendCheckChange: 0,
  dirty: false,
  initField: function() {
    var d = this,
      c = d.valuePublishEvent,
      a, b;
    d.initValue();
    if (Ext.isString(c)) {
      d.on(c, d.publishValue, d)
    } else {
      for (b = 0, a = c.length; b < a; ++b) {
        d.on(c[b], d.publishValue, d)
      }
    }
  },
  initValue: function() {
    var a = this;
    if ("value" in a) {
      a.suspendCheckChange++;
      a.setValue(a.value);
      a.suspendCheckChange--
    }
    a.initialValue = a.originalValue = a.lastValue = a.getValue()
  },
  getFieldIdentifier: function() {
    return this.isEditorComponent ? this.dataIndex : this.name
  },
  getName: function() {
    return this.name
  },
  getValue: function() {
    return this.value
  },
  setValue: function(b) {
    var a = this;
    a.value = b;
    a.checkChange();
    return a
  },
  isEqual: function(b, a) {
    return String(b) === String(a)
  },
  isEqualAsString: function(b, a) {
    return String(Ext.valueFrom(b, "")) === String(Ext.valueFrom(a, ""))
  },
  getSubmitData: function() {
    var a = this,
      b = null;
    if (!a.disabled && a.submitValue) {
      b = {};
      b[a.getName()] = "" + a.getValue()
    }
    return b
  },
  getModelData: function(a, b) {
    var c = this,
      d = null;
    if (!c.disabled && (c.submitValue || !b)) {
      d = {};
      d[c.getFieldIdentifier()] = c.getValue()
    }
    return d
  },
  reset: function() {
    var a = this;
    a.beforeReset();
    a.setValue(a.originalValue);
    a.clearInvalid();
    delete a.wasValid
  },
  beforeReset: Ext.emptyFn,
  resetOriginalValue: function() {
    this.originalValue = this.getValue();
    this.checkDirty()
  },
  checkChange: function() {
    var c = this,
      b, a;
    if (!c.suspendCheckChange) {
      b = c.getValue();
      a = c.lastValue;
      if (!c.destroyed && c.didValueChange(b, a)) {
        c.lastValue = b;
        c.fireEvent("change", c, b, a);
        c.onChange(b, a)
      }
    }
  },
  didValueChange: function(b, a) {
    return !this.isEqual(b, a)
  },
  onChange: function(a) {
    var b = this;
    if (b.validateOnChange) {
      b.validate()
    }
    b.checkDirty()
  },
  publishValue: function() {
    var a = this;
    if (a.rendered && !a.getErrors().length) {
      a.publishState("value", a.getValue())
    }
  },
  isDirty: function() {
    var a = this;
    return !a.disabled && !a.isEqual(a.getValue(), a.originalValue)
  },
  checkDirty: function() {
    var a = this,
      b = a.isDirty();
    if (b !== a.wasDirty) {
      a.dirty = b;
      a.fireEvent("dirtychange", a, b);
      a.onDirtyChange(b);
      a.wasDirty = b
    }
  },
  onDirtyChange: Ext.emptyFn,
  getErrors: function(d) {
    var e = [],
      c = this.getValidationField(),
      b = this.getValidation(),
      a;
    if (c) {
      a = c.validate(d);
      if (a !== true) {
        e.push(a)
      }
    }
    if (b && b !== true) {
      e.push(b)
    }
    return e
  },
  isValid: function() {
    var a = this;
    return a.disabled || Ext.isEmpty(a.getErrors())
  },
  validate: function() {
    return this.checkValidityChange(this.isValid())
  },
  checkValidityChange: function(b) {
    var a = this;
    if (b !== a.wasValid) {
      a.wasValid = b;
      a.fireEvent("validitychange", a, b)
    }
    return b
  },
  batchChanges: function(a) {
    try {
      this.suspendCheckChange++;
      a()
    } catch (b) {
      throw b
    } finally {
      this.suspendCheckChange--
    }
    this.checkChange()
  },
  isFileUpload: function() {
    return false
  },
  extractFileInput: function() {
    return null
  },
  markInvalid: Ext.emptyFn,
  clearInvalid: Ext.emptyFn,
  updateValidation: function(a, b) {
    if (b) {
      this.validate()
    }
  },
  privates: {
    resetToInitialValue: function() {
      var b = this,
        a = b.originalValue;
      b.originalValue = b.initialValue;
      b.reset();
      b.originalValue = a
    }
  }
}, 0, 0, 0, 0, 0, 0, [Ext.form.field, "Field"], 0));
(Ext.cmd.derive("Ext.form.field.Base", Ext.Component, {
  alternateClassName: ["Ext.form.Field", "Ext.form.BaseField"],
  focusable: true,
  shrinkWrap: true,
  fieldSubTpl: [
    '<input id="{id}" data-ref="inputEl" type="{type}" {inputAttrTpl}',
    ' size="1"', '<tpl if="name"> name="{name}"</tpl>',
    '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
    '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>',
    '{%if (values.maxLength !== undefined){%} maxlength="{maxLength}"{%}%}',
    '<tpl if="readOnly"> readonly="readonly"</tpl>',
    '<tpl if="disabled"> disabled="disabled"</tpl>',
    '<tpl if="tabIdx != null"> tabindex="{tabIdx}"</tpl>',
    '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
    '<tpl foreach="inputElAriaAttributes"> {$}="{.}"</tpl>',
    ' class="{fieldCls} {typeCls} {typeCls}-{ui} {editableCls} {inputCls}" autocomplete="off"/>', {
      disableFormats: true
    }
  ],
  defaultBindProperty: "value",
  autoEl: {
    role: "presentation"
  },
  subTplInsertions: ["inputAttrTpl"],
  childEls: ["inputEl"],
  inputType: "text",
  isTextInput: true,
  invalidText: "The value in this field is invalid",
  fieldCls: "x-form-field",
  focusCls: "form-focus",
  dirtyCls: "x-form-dirty",
  checkChangeEvents: Ext.isIE && (!document.documentMode || document.documentMode <=
    9) ? ["change", "propertychange", "keyup"] : ["change", "input",
    "textInput", "keyup", "dragdrop"
  ],
  ignoreChangeRe: /data\-errorqtip|style\.|className/,
  checkChangeBuffer: 50,
  liquidLayout: true,
  readOnly: false,
  readOnlyCls: "x-form-readonly",
  validateOnBlur: true,
  hasFocus: false,
  baseCls: "x-field",
  fieldBodyCls: "x-field-body",
  maskOnDisable: false,
  stretchInputElFixed: true,
  ariaEl: "inputEl",
  initComponent: function() {
    var a = this;
    Ext.Component.prototype.initComponent.call(this);
    a.subTplData = a.subTplData || {};
    a.initLabelable();
    a.initField();
    a.initDefaultName();
    if (a.readOnly) {
      a.addCls(a.readOnlyCls)
    }
    a.addCls("x-form-type-" + a.inputType)
  },
  initDefaultName: function() {
    var a = this;
    if (!a.name) {
      a.name = a.getInputId()
    }
  },
  getInputId: function() {
    return this.inputId || (this.inputId = this.id + "-inputEl")
  },
  getSubTplData: function(c) {
    var e = this,
      d = e.inputType,
      a = e.getInputId(),
      f, b;
    f = Ext.apply({
      ui: e.ui,
      id: a,
      cmpId: e.id,
      name: e.name || a,
      disabled: e.disabled,
      readOnly: e.readOnly,
      value: e.getRawValue(),
      type: d,
      fieldCls: e.fieldCls,
      fieldStyle: e.getFieldStyle(),
      childElCls: c.childElCls,
      tabIdx: e.tabIndex,
      inputCls: e.inputCls,
      typeCls: "x-form-" + (e.isTextInput ? "text" : d)
    }, e.subTplData);
    if (e.ariaRole) {
      b = {
        role: e.ariaRole,
        "aria-hidden": !!e.hidden,
        "aria-disabled": !!e.disabled,
        "aria-readonly": !!e.readOnly,
        "aria-invalid": false
      };
      if (e.ariaLabel) {
        b["aria-label"] = e.ariaLabel
      }
      if (e.format && e.formatText && !f.title) {
        b.title = Ext.String.formatEncode(e.formatText, e.format)
      }
      f.inputElAriaAttributes = Ext.apply(b, e.getAriaAttributes())
    }
    e.getInsertionRenderData(f, e.subTplInsertions);
    return f
  },
  getSubTplMarkup: function(b) {
    var c = this,
      d = c.getSubTplData(b),
      e = c.getTpl("preSubTpl"),
      f = c.getTpl("postSubTpl"),
      a = "";
    if (e) {
      a += e.apply(d)
    }
    a += c.getTpl("fieldSubTpl").apply(d);
    if (f) {
      a += f.apply(d)
    }
    return a
  },
  initRenderData: function() {
    return Ext.applyIf(Ext.Component.prototype.initRenderData.call(this),
      this.getLabelableRenderData())
  },
  setFieldStyle: function(a) {
    var b = this,
      c = b.inputEl;
    if (c) {
      c.applyStyles(a)
    }
    b.fieldStyle = a
  },
  getFieldStyle: function() {
    var a = this.fieldStyle;
    return Ext.isObject(a) ? Ext.DomHelper.generateStyles(a, null, true) :
      a || ""
  },
  onRender: function() {
    this.callParent(arguments);
    this.mixins.labelable.self.initTip();
    this.renderActiveError()
  },
  onFocusLeave: function(a) {
    Ext.Component.prototype.onFocusLeave.call(this, a);
    this.completeEdit()
  },
  completeEdit: Ext.emptyFn,
  isFileUpload: function() {
    return this.inputType === "file"
  },
  getSubmitData: function() {
    var a = this,
      b = null,
      c;
    if (!a.disabled && a.submitValue) {
      c = a.getSubmitValue();
      if (c !== null) {
        b = {};
        b[a.getName()] = c
      }
    }
    return b
  },
  getSubmitValue: function() {
    return this.processRawValue(this.getRawValue())
  },
  getRawValue: function() {
    var b = this,
      a = (b.inputEl ? b.inputEl.getValue() : Ext.valueFrom(b.rawValue,
        ""));
    b.rawValue = a;
    return a
  },
  setRawValue: function(c) {
    var a = this,
      b = a.rawValue;
    if (!a.transformRawValue.$nullFn) {
      c = a.transformRawValue(c)
    }
    c = Ext.valueFrom(c, "");
    if (b === undefined || b !== c || a.valueContainsPlaceholder) {
      a.rawValue = c;
      if (a.inputEl) {
        a.bindChangeEvents(false);
        a.inputEl.dom.value = c;
        a.bindChangeEvents(true)
      }
      if (a.rendered && a.reference) {
        a.publishState("rawValue", c)
      }
    }
    return c
  },
  transformRawValue: Ext.identityFn,
  valueToRaw: function(a) {
    return "" + Ext.valueFrom(a, "")
  },
  rawToValue: Ext.identityFn,
  processRawValue: Ext.identityFn,
  getValue: function() {
    var a = this,
      b = a.rawToValue(a.processRawValue(a.getRawValue()));
    a.value = b;
    return b
  },
  setValue: function(b) {
    var a = this;
    a.setRawValue(a.valueToRaw(b));
    return a.mixins.field.setValue.call(a, b)
  },
  onBoxReady: function() {
    var a = this;
    Ext.Component.prototype.onBoxReady.apply(this, arguments);
    if (a.setReadOnlyOnBoxReady) {
      a.setReadOnly(a.readOnly)
    }
  },
  onDisable: function() {
    var a = this,
      b = a.inputEl;
    Ext.Component.prototype.onDisable.call(this);
    if (b) {
      b.dom.disabled = true;
      if (a.hasActiveError()) {
        a.clearInvalid();
        a.hadErrorOnDisable = true
      }
    }
    if (a.wasValid === false) {
      a.checkValidityChange(true)
    }
  },
  onEnable: function() {
    var b = this,
      c = b.inputEl,
      d = b.preventMark,
      a;
    Ext.Component.prototype.onEnable.call(this);
    if (c) {
      c.dom.disabled = false
    }
    if (b.wasValid !== undefined) {
      b.forceValidation = true;
      b.preventMark = !b.hadErrorOnDisable;
      a = b.isValid();
      b.forceValidation = false;
      b.preventMark = d;
      b.checkValidityChange(a)
    }
    delete b.hadErrorOnDisable
  },
  setReadOnly: function(d) {
    var b = this,
      c = b.inputEl,
      a = b.readOnly;
    d = !!d;
    b[d ? "addCls" : "removeCls"](b.readOnlyCls);
    b.readOnly = d;
    if (c) {
      c.dom.readOnly = d;
      b.ariaEl.dom.setAttribute("aria-readonly", d)
    } else {
      if (b.rendering) {
        b.setReadOnlyOnBoxReady = true
      }
    }
    if (d !== a) {
      b.fireEvent("writeablechange", b, d)
    }
  },
  fireKey: function(a) {
    if (a.isSpecialKey()) {
      this.fireEvent("specialkey", this, a)
    }
  },
  initEvents: function() {
    var e = this,
      g = e.inputEl,
      f = e.onFieldMutation,
      c = e.checkChangeEvents,
      a = c.length,
      b, d;
    if (g) {
      e.mon(g, Ext.supports.SpecialKeyDownRepeat ? "keydown" : "keypress",
        e.fireKey, e);
      for (b = 0; b < a; ++b) {
        d = c[b];
        if (d === "propertychange") {
          e.usesPropertychange = true
        }
        if (d === "textInput") {
          e.usesTextInput = true
        }
        e.mon(g, d, f, e)
      }
    }
    Ext.Component.prototype.initEvents.call(this)
  },
  onFieldMutation: function(c) {
    var b = this,
      a = b.checkChangeTask;
    if (!b.readOnly && !(c.type === "propertychange" && b.ignoreChangeRe.test(
        c.browserEvent.propertyName))) {
      if (!a) {
        b.checkChangeTask = a = new Ext.util.DelayedTask(b.doCheckChangeTask,
          b)
      }
      if (!b.bindNotifyListener) {
        b.bindNotifyListener = Ext.on("beforebindnotify", b.onBeforeNotify,
          b, {
            destroyable: true
          })
      }
      a.delay(b.checkChangeBuffer)
    }
  },
  doCheckChangeTask: function() {
    var a = this.bindNotifyListener;
    if (a) {
      a.destroy();
      this.bindNotifyListener = null
    }
    this.checkChange()
  },
  publishValue: function() {
    var a = this;
    if (a.rendered && !a.getErrors().length) {
      a.publishState("value", a.getValue())
    }
  },
  onDirtyChange: function(b) {
    var a = this;
    a[b ? "addCls" : "removeCls"](a.dirtyCls);
    if (a.rendered && a.reference) {
      a.publishState("dirty", b)
    }
  },
  isValid: function() {
    var b = this,
      a = b.disabled,
      c = b.forceValidation || !a;
    return c ? b.validateValue(b.processRawValue(b.getRawValue())) : a
  },
  validateValue: function(b) {
    var a = this,
      d = a.getErrors(b),
      c = Ext.isEmpty(d);
    if (!a.preventMark) {
      if (c) {
        a.clearInvalid()
      } else {
        a.markInvalid(d)
      }
    }
    return c
  },
  markInvalid: function(e) {
    var c = this,
      a = c.ariaEl.dom,
      b = c.getActiveError(),
      d;
    c.setActiveErrors(Ext.Array.from(e));
    d = c.getActiveError();
    if (b !== d) {
      c.setError(d);
      if (!c.ariaStaticRoles[c.ariaRole] && a) {
        a.setAttribute("aria-invalid", true)
      }
    }
  },
  clearInvalid: function() {
    var c = this,
      a = c.ariaEl.dom,
      b = c.hasActiveError();
    delete c.hadErrorOnDisable;
    c.unsetActiveError();
    if (b) {
      c.setError("");
      if (!c.ariaStaticRoles[c.ariaRole] && a) {
        a.setAttribute("aria-invalid", false)
      }
    }
  },
  setError: function(a) {
    var c = this,
      b = c.msgTarget,
      d;
    if (c.rendered) {
      if (b === "title" || b === "qtip") {
        d = b === "qtip" ? "data-errorqtip" : "title";
        c.getActionEl().dom.setAttribute(d, a || "")
      } else {
        c.updateLayout()
      }
    }
  },
  renderActiveError: function() {
    var c = this,
      b = c.hasActiveError(),
      a = c.invalidCls + "-field";
    if (c.inputEl) {
      c.inputEl[b ? "addCls" : "removeCls"]([a, a + "-" + c.ui])
    }
    c.mixins.labelable.renderActiveError.call(c)
  },
  beforeDestroy: function() {
    var b = this,
      a = b.checkChangeTask;
    if (a) {
      a.cancel()
    }
    b.checkChangeTask = b.bindNotifyListener = Ext.destroy(b.bindNotifyListener);
    Ext.Component.prototype.beforeDestroy.call(this)
  },
  privates: {
    applyBind: function(f, c) {
      var b = this,
        a = c && c.value,
        e, d;
      e = Ext.Component.prototype.applyBind.call(this, f, c);
      if (e) {
        d = e.value;
        b.hasBindingValue = !!d;
        if (d !== a && b.getInherited().modelValidation) {
          b.updateValueBinding(e)
        }
      }
      return e
    },
    applyRenderSelectors: function() {
      var a = this;
      Ext.Component.prototype.applyRenderSelectors.call(this);
      if (!a.inputEl) {
        a.inputEl = a.el.getById(a.getInputId())
      }
    },
    bindChangeEvents: function(b) {
      var c = b ? "resumeEvent" : "suspendEvent",
        a = this.inputEl;
      if (this.usesPropertychange) {
        a[c]("propertychange")
      }
      if (this.usesTextInput) {
        a[c]("textInput")
      }
    },
    getActionEl: function() {
      return this.inputEl || this.el
    },
    getFocusEl: function() {
      return this.inputEl
    },
    initRenderTpl: function() {
      var a = this;
      if (!a.hasOwnProperty("renderTpl")) {
        a.renderTpl = a.getTpl("labelableRenderTpl")
      }
      return Ext.Component.prototype.initRenderTpl.call(this)
    },
    onBeforeNotify: function() {
      this.checkChangeTask.cancel();
      this.checkChange()
    },
    updateValueBinding: function(d) {
      var c = this,
        b = d.value,
        a = d.$fieldBinding;
      if (a) {
        a.destroy();
        d.$fieldBinding = null
      }
      if (b && b.bindValidationField) {
        c.fieldBinding = b.bindValidationField("setValidationField", c)
      }
    }
  },
  deprecated: {
    "5": {
      methods: {
        doComponentLayout: function() {
          this.bindChangeEvents(false);
          this.callParent(arguments);
          this.bindChangeEvents(true)
        }
      }
    }
  }
}, 0, ["field"], ["component", "box", "field"], {
  component: true,
  box: true,
  field: true
}, ["widget.field"], [
  [Ext.form.Labelable.prototype.mixinId || Ext.form.Labelable.$className,
    Ext.form.Labelable
  ],
  [Ext.form.field.Field.prototype.mixinId || Ext.form.field.Field.$className,
    Ext.form.field.Field
  ]
], [Ext.form.field, "Base", Ext.form, "Field", Ext.form, "BaseField"], 0));
(Ext.cmd.derive("Ext.form.Label", Ext.Component, {
  autoEl: "label",
  maskOnDisable: false,
  getElConfig: function() {
    var a = this;
    a.html = a.text ? Ext.util.Format.htmlEncode(a.text) : (a.html || "");
    return Ext.apply(Ext.Component.prototype.getElConfig.call(this), {
      htmlFor: a.forId || ""
    })
  },
  setText: function(c, b) {
    var a = this;
    b = b !== false;
    if (b) {
      a.text = c;
      delete a.html
    } else {
      a.html = c;
      delete a.text
    }
    if (a.rendered) {
      a.el.dom.innerHTML = b !== false ? Ext.util.Format.htmlEncode(c) :
        c;
      a.updateLayout()
    }
    return a
  }
}, 0, ["label"], ["component", "box", "label"], {
  component: true,
  box: true,
  label: true
}, ["widget.label"], 0, [Ext.form, "Label"], 0));
(Ext.cmd.derive("Ext.selection.Model", Ext.mixin.Observable, {
  alternateClassName: "Ext.AbstractSelectionModel",
  factoryConfig: {
    defaultType: "dataviewmodel"
  },
  $configPrefixed: false,
  $configStrict: false,
  config: {
    store: null,
    selected: {}
  },
  isSelectionModel: true,
  allowDeselect: undefined,
  toggleOnClick: true,
  selected: null,
  pruneRemoved: true,
  suspendChange: 0,
  ignoreRightMouseSelection: false,
  constructor: function(a) {
    var b = this;
    b.modes = {
      SINGLE: true,
      SIMPLE: true,
      MULTI: true
    };
    Ext.mixin.Observable.prototype.constructor.call(this, a);
    b.setSelectionMode(b.mode);
    if (b.selectionMode !== "SINGLE") {
      b.allowDeselect = true
    }
  },
  updateStore: function(a, b) {
    this.bindStore(a, !b)
  },
  applySelected: function(a) {
    if (!a.isCollection) {
      a = new Ext.util.Collection(Ext.apply({
        rootProperty: "data"
      }, a))
    }
    return a
  },
  onBindStore: function(a, b) {
    var c = this;
    c.mixins.storeholder.onBindStore.call(c, [a, b]);
    if (a && !c.preventRefresh) {
      c.refresh()
    }
  },
  getStoreListeners: function() {
    var a = this;
    return {
      add: a.onStoreAdd,
      clear: a.onStoreClear,
      remove: a.onStoreRemove,
      update: a.onStoreUpdate,
      idchanged: a.onIdChanged,
      load: a.onStoreLoad,
      refresh: a.onStoreRefresh,
      pageadd: a.onPageAdd,
      pageremove: a.onPageRemove
    }
  },
  suspendChanges: function() {
    ++this.suspendChange
  },
  resumeChanges: function() {
    if (this.suspendChange) {
      --this.suspendChange
    }
  },
  selectAll: function(a) {
    var c = this,
      b = c.store.getRange(),
      d = c.getSelection().length;
    c.suspendChanges();
    c.doSelect(b, true, a);
    c.resumeChanges();
    if (!a && !c.destroyed) {
      c.maybeFireSelectionChange(c.getSelection().length !== d)
    }
  },
  deselectAll: function(j) {
    var f = this,
      b = f.getSelection(),
      g = {},
      h = f.store,
      a = b.length,
      e, c, d;
    for (e = 0, c = b.length; e < c; e++) {
      d = b[e];
      g[d.id] = h.indexOf(d)
    }
    b = Ext.Array.sort(b, function(l, i) {
      var m = g[l.id],
        k = g[i.id];
      return m < k ? -1 : 1
    });
    f.suspendChanges();
    f.doDeselect(b, j);
    f.resumeChanges();
    if (!j && !f.destroyed) {
      f.maybeFireSelectionChange(f.getSelection().length !== a)
    }
  },
  getSelectionStart: function() {
    return this.selectionStart
  },
  setSelectionStart: function(a) {
    this.selectionStart = a
  },
  selectWithEvent: function(b, f) {
    var d = this,
      c = d.isSelected(b),
      a = f.shiftKey;
    switch (d.selectionMode) {
      case "MULTI":
        d.selectWithEventMulti(b, f, c);
        break;
      case "SIMPLE":
        d.selectWithEventSimple(b, f, c);
        break;
      case "SINGLE":
        d.selectWithEventSingle(b, f, c);
        break
    }
    if (!a) {
      if (d.isSelected(b)) {
        d.selectionStart = b
      } else {
        d.selectionStart = null
      }
    }
  },
  vetoSelection: function(a) {
    if (a.stopSelection) {
      return true
    } else {
      if (a.type !== "keydown" && a.button !== 0) {
        if (this.ignoreRightMouseSelection || this.isSelected(a.record)) {
          return true
        }
      } else {
        return a.type === "mousedown"
      }
    }
  },
  onNavigate: function(g) {
    if (!g.record || this.vetoSelection(g.keyEvent)) {
      return
    }
    this.onBeforeNavigate(g);
    var i = this,
      h = g.keyEvent,
      b = h.ctrlKey || g.ctrlKey,
      d = g.recordIndex,
      f = g.record,
      m = g.previousRecord,
      c = i.isSelected(f),
      k = (i.selectionStart && i.isSelected(g.previousRecord)) ? i.selectionStart :
      (i.selectionStart = g.previousRecord),
      a = g.previousRecordIndex,
      l = h.getCharCode(),
      n = l === h.SPACE,
      j = l === h.UP || l === h.PAGE_UP ? "up" : (l === h.DOWN || l === h
        .DOWN ? "down" : null);
    switch (i.selectionMode) {
      case "MULTI":
        i.setSelectionStart(g.selectionStart);
        if (l === h.A && b) {
          i.selected.beginUpdate();
          i.selectRange(0, i.store.getCount() - 1);
          i.selected.endUpdate()
        } else {
          if (n) {
            if (h.shiftKey) {
              i.selectRange(k, f, b)
            } else {
              if (c) {
                if (i.allowDeselect) {
                  i.doDeselect(f)
                }
              } else {
                i.doSelect(f, b)
              }
            }
          } else {
            if (h.shiftKey && k) {
              if (j === "up" && a <= d) {
                i.deselectRange(m, d + 1)
              } else {
                if (j === "down" && a >= d) {
                  i.deselectRange(m, d - 1)
                } else {
                  if (k !== f) {
                    i.selectRange(k, f, b)
                  }
                }
              }
              i.lastSelected = f
            } else {
              if (l) {
                if (!b) {
                  i.doSelect(f, false)
                }
              } else {
                i.selectWithEvent(f, h)
              }
            }
          }
        }
        break;
      case "SIMPLE":
        if (l === h.A && b) {
          i.selected.beginUpdate();
          i.selectRange(0, i.store.getCount() - 1);
          i.selected.endUpdate()
        } else {
          if (c) {
            i.doDeselect(f)
          } else {
            i.doSelect(f, true)
          }
        }
        break;
      case "SINGLE":
        if (j) {
          if (!b) {
            i.doSelect(f, false)
          }
        } else {
          if (c) {
            if (i.allowDeselect) {
              i.doDeselect(f)
            }
          } else {
            i.doSelect(f)
          }
        }
    }
    if (!h.shiftKey && !i.destroyed && i.isSelected(f)) {
      i.selectionStart = f;
      i.selectionStartIdx = d
    }
  },
  selectRange: function(l, d, m) {
    var h = this,
      k = h.store,
      c = h.selected.items,
      n, f, g, e, a, j, b;
    if (h.isLocked()) {
      return
    }
    n = h.normalizeRowRange(l, d);
    l = n[0];
    d = n[1];
    e = [];
    for (f = l; f <= d; f++) {
      if (!h.isSelected(k.getAt(f))) {
        e.push(k.getAt(f))
      }
    }
    if (!m) {
      a = [];
      h.suspendChanges();
      for (f = 0, g = c.length; f < g; ++f) {
        b = c[f];
        j = k.indexOf(b);
        if (j < l || j > d) {
          a.push(b)
        }
      }
      for (f = 0, g = a.length; f < g; ++f) {
        h.doDeselect(a[f])
      }
      h.resumeChanges()
    }
    if (!h.destroyed) {
      if (e.length) {
        h.doMultiSelect(e, true)
      } else {
        if (a) {
          h.maybeFireSelectionChange(a.length > 0)
        }
      }
    }
  },
  deselectRange: function(e, d) {
    var h = this,
      c = h.store,
      a, g, f, b;
    if (h.isLocked()) {
      return
    }
    a = h.normalizeRowRange(e, d);
    e = a[0];
    d = a[1];
    f = [];
    for (g = e; g <= d; g++) {
      b = c.getAt(g);
      if (h.isSelected(b)) {
        f.push(b)
      }
    }
    if (f.length) {
      h.doDeselect(f)
    }
  },
  normalizeRowRange: function(c, b) {
    var a = this.store,
      d;
    if (!Ext.isNumber(c)) {
      c = a.indexOf(c)
    }
    c = Math.max(0, c);
    if (!Ext.isNumber(b)) {
      b = a.indexOf(b)
    }
    b = Math.min(b, a.getCount() - 1);
    if (c > b) {
      d = b;
      b = c;
      c = d
    }
    return [c, b]
  },
  select: function(b, c, a) {
    if (Ext.isDefined(b) && !(Ext.isArray(b) && !b.length)) {
      this.doSelect(b, c, a)
    }
  },
  deselect: function(b, a) {
    this.doDeselect(b, a)
  },
  doSelect: function(c, e, b) {
    var d = this,
      a;
    if (d.locked || c == null) {
      return
    }
    if (typeof c === "number") {
      a = d.store.getAt(c);
      if (!a) {
        return
      }
      c = [a]
    }
    if (d.selectionMode === "SINGLE") {
      if (c.isModel) {
        c = [c]
      }
      if (c.length) {
        d.doSingleSelect(c[0], b)
      }
    } else {
      d.doMultiSelect(c, e, b)
    }
  },
  doMultiSelect: function(a, k, j) {
    var g = this,
      b = g.selected,
      h = false,
      l, d, f, e, c;
    if (g.locked) {
      return
    }
    a = !Ext.isArray(a) ? [a] : a;
    f = a.length;
    if (!k && b.getCount() > 0) {
      l = g.deselectDuringSelect(a, j);
      if (g.destroyed) {
        return
      }
      if (l[0]) {
        g.maybeFireSelectionChange(l[1] > 0 && !j);
        return
      } else {
        h = l[1] > 0
      }
    }
    c = function() {
      if (!b.getCount()) {
        g.selectionStart = e
      }
      b.add(e);
      h = true
    };
    for (d = 0; d < f; d++) {
      e = a[d];
      if (g.isSelected(e)) {
        continue
      }
      g.onSelectChange(e, true, j, c);
      if (g.destroyed) {
        return
      }
    }
    g.lastSelected = e;
    g.maybeFireSelectionChange(h && !j)
  },
  deselectDuringSelect: function(d, h) {
    var g = this,
      a = g.selected.getRange(),
      f = a.length,
      c = 0,
      e = false,
      j, b;
    g.suspendChanges();
    g.deselectingDuringSelect = true;
    for (b = 0; b < f; ++b) {
      j = a[b];
      if (!Ext.Array.contains(d, j)) {
        if (g.doDeselect(j, h)) {
          ++c
        } else {
          e = true
        }
      }
      if (g.destroyed) {
        e = true;
        c = 0;
        break
      }
    }
    g.deselectingDuringSelect = false;
    g.resumeChanges();
    return [e, c]
  },
  doDeselect: function(a, j) {
    var h = this,
      b = h.selected,
      d = 0,
      g, e, k = 0,
      f = 0,
      c;
    if (h.locked || !h.store) {
      return false
    }
    if (typeof a === "number") {
      e = h.store.getAt(a);
      if (!e) {
        return false
      }
      a = [e]
    } else {
      if (!Ext.isArray(a)) {
        a = [a]
      }
    }
    c = function() {
      ++f;
      b.remove(e);
      if (e === h.selectionStart) {
        h.selectionStart = null
      }
    };
    g = a.length;
    h.suspendChanges();
    for (; d < g; d++) {
      e = a[d];
      if (h.isSelected(e)) {
        if (h.lastSelected === e) {
          h.lastSelected = b.last()
        }++k;
        h.onSelectChange(e, false, j, c);
        if (h.destroyed) {
          return false
        }
      }
    }
    h.resumeChanges();
    h.maybeFireSelectionChange(f > 0 && !j);
    return f === k
  },
  doSingleSelect: function(a, b) {
    var d = this,
      f = false,
      c = d.selected,
      e;
    if (d.locked) {
      return
    }
    if (d.isSelected(a)) {
      return
    }
    e = function() {
      if (c.getCount()) {
        d.suspendChanges();
        var g = d.deselectDuringSelect([a], b);
        if (d.destroyed) {
          return
        }
        d.resumeChanges();
        if (g[0]) {
          return false
        }
      }
      d.lastSelected = a;
      if (!c.getCount()) {
        d.selectionStart = a
      }
      c.add(a);
      f = true
    };
    d.onSelectChange(a, true, b, e);
    if (f && !d.destroyed) {
      d.maybeFireSelectionChange(!b)
    }
  },
  maybeFireSelectionChange: function(a) {
    var b = this;
    if (a && !b.suspendChange) {
      b.fireEvent("selectionchange", b, b.getSelection())
    }
  },
  getLastSelected: function() {
    return this.lastSelected
  },
  getSelection: function() {
    return this.selected.getRange()
  },
  getSelectionMode: function() {
    return this.selectionMode
  },
  setSelectionMode: function(a) {
    a = a ? a.toUpperCase() : "SINGLE";
    this.selectionMode = this.modes[a] ? a : "SINGLE"
  },
  isLocked: function() {
    return this.locked
  },
  setLocked: function(a) {
    this.locked = !!a
  },
  isRangeSelected: function(d, c) {
    var f = this,
      b = f.store,
      e, a;
    a = f.normalizeRowRange(d, c);
    d = a[0];
    c = a[1];
    for (e = d; e <= c; e++) {
      if (!f.isSelected(b.getAt(e))) {
        return false
      }
    }
    return true
  },
  isSelected: function(a) {
    a = Ext.isNumber(a) ? this.store.getAt(a) : a;
    return this.selected.contains(a)
  },
  hasSelection: function() {
    var a = this.getSelected();
    return !!(a && a.getCount())
  },
  refresh: function() {
    var l = this,
      o = l.store,
      g = [],
      k = [],
      f = l.getSelection(),
      h = f.length,
      c = l.getSelected(),
      m, j, a, n, b, e;
    if (!o || !(c.isCollection || c.isRows) || !c.getCount()) {
      return
    }
    a = o.getData();
    if (a.getSource) {
      j = a.getSource();
      if (j) {
        a = j
      }
    }
    l.refreshing = true;
    c.beginUpdate();
    l.suspendChanges();
    for (e = 0; e < h; e++) {
      n = f[e];
      b = a.get(n.getId());
      if (b) {
        g.push(b)
      } else {
        if (!l.pruneRemoved) {
          k.push(n)
        }
      }
      if (l.mode === "SINGLE" && k.length) {
        break
      }
    }
    if (c.getCount() !== (g.length + k.length)) {
      m = true
    }
    l.clearSelections();
    if (g.length) {
      l.doSelect(g, false, true)
    }
    if (k.length) {
      c.add(k);
      if (!l.lastSelected) {
        l.lastSelected = k[k.length - 1]
      }
    }
    l.resumeChanges();
    if (m) {
      c.endUpdate()
    } else {
      c.updating--
    }
    l.refreshing = false;
    l.maybeFireSelectionChange(m)
  },
  clearSelections: function() {
    var a = this.getSelected();
    if (a) {
      a.clear()
    }
    this.lastSelected = null
  },
  onStoreAdd: Ext.emptyFn,
  onStoreClear: function() {
    if (!this.store.isLoading() && this.hasSelection()) {
      this.clearSelections();
      this.maybeFireSelectionChange(true)
    }
  },
  onStoreRemove: function(j, b, e, k) {
    var h = this,
      a = b,
      d, f, c, g;
    if (h.selectionStart && Ext.Array.contains(b, h.selectionStart)) {
      h.selectionStart = null
    }
    if (k || h.locked || !h.pruneRemoved) {
      return
    }
    g = j.isMoving(null, true);
    if (g) {
      a = null;
      for (d = 0, f = b.length; d < f; ++d) {
        c = b[d];
        if (!g[c.id]) {
          (a || (a = [])).push(c)
        }
      }
    }
    if (a) {
      h.deselect(a)
    }
  },
  onPageRemove: function(b, a, c) {
    this.onStoreRemove(this.store, c)
  },
  onPageAdd: function(d, c, e) {
    var a = e.length,
      f, b;
    for (f = 0; f < a; f++) {
      b = e[f];
      if (this.selected.get(b.id)) {
        this.selected.replace(b)
      }
    }
  },
  getCount: function() {
    return this.selected.getCount()
  },
  onUpdate: Ext.emptyFn,
  destroy: function() {
    var a = this;
    a.clearSelections();
    a.bindStore(null);
    a.selected = Ext.destroy(a.selected);
    Ext.mixin.Observable.prototype.destroy.call(this)
  },
  onStoreUpdate: Ext.emptyFn,
  onIdChanged: function(a, d, c, b) {
    this.selected.updateKey(d, c)
  },
  onStoreRefresh: function() {
    this.updateSelectedInstances(this.selected)
  },
  updateSelectedInstances: function(e) {
    var j = this,
      l = j.getStore(),
      k = j.lastSelected,
      a = 0,
      c = j.pruneRemovedOnRefresh(),
      h, b, f, m, d, g;
    if (l.isBufferedStore) {
      return
    }
    h = e.getRange();
    b = h.length;
    if (k) {
      j.lastSelected = l.getById(k.id);
      g = j.lastSelected !== k
    }
    j.refreshing = true;
    for (f = 0; f < b; ++f) {
      m = h[f];
      d = l.getById(m.id);
      if (d) {
        if (d !== m) {
          e.replace(d)
        }
      } else {
        if (c) {
          e.remove(m);
          ++a
        }
      }
    }
    j.refreshing = false;
    j.maybeFireSelectionChange(a > 0);
    if (g) {
      j.fireEvent("lastselectedchanged", j, j.getSelection(), j.lastSelected)
    }
  },
  pruneRemovedOnRefresh: function() {
    return this.pruneRemoved
  },
  onStoreLoad: Ext.emptyFn,
  onSelectChange: function(a, d, c, f) {
    var e = this,
      b = d ? "select" : "deselect";
    if ((c || e.fireEvent("before" + b, e, a)) !== false && f() !== false) {
      if (!c) {
        e.fireEvent(b, e, a)
      }
    }
  },
  onEditorKey: Ext.emptyFn,
  beforeViewRender: function(a) {
    Ext.Array.include(this.views || (this.views = []), a)
  },
  onHeaderClick: Ext.emptyFn,
  resolveListenerScope: function(c) {
    var a = this.view,
      b;
    if (a) {
      b = a.resolveSatelliteListenerScope(this, c)
    }
    return b || Ext.mixin.Observable.prototype.resolveListenerScope.call(
      this, c)
  },
  bindComponent: Ext.emptyFn,
  privates: {
    onBeforeNavigate: Ext.privateFn,
    selectWithEventMulti: function(j, l, d) {
      var m = this,
        f = l.shiftKey,
        a = l.ctrlKey,
        c = f ? (m.getSelectionStart()) : null,
        g = m.getSelection(),
        k = g.length,
        b, h, n;
      if (f && c) {
        m.selectRange(c, j, a)
      } else {
        if (a && d) {
          if (m.allowDeselect) {
            m.doDeselect(j, false)
          }
        } else {
          if (a) {
            m.doSelect(j, true, false)
          } else {
            if (d && !f && !a && k > 1) {
              if (m.allowDeselect) {
                b = [];
                for (h = 0; h < k; ++h) {
                  n = g[h];
                  if (n !== j) {
                    b.push(n)
                  }
                }
                m.doDeselect(b)
              }
            } else {
              if (!d) {
                m.doSelect(j, false)
              }
            }
          }
        }
      }
    },
    selectWithEventSimple: function(a, c, b) {
      if (b) {
        this.doDeselect(a)
      } else {
        this.doSelect(a, true)
      }
    },
    selectWithEventSingle: function(b, f, c) {
      var d = this,
        a = d.allowDeselect;
      if (a && !f.ctrlKey) {
        a = d.toggleOnClick
      }
      if (a && c) {
        d.doDeselect(b)
      } else {
        d.doSelect(b, false)
      }
    }
  }
}, 1, 0, 0, 0, ["selection.abstract"], [
  [Ext.util.StoreHolder.prototype.mixinId || Ext.util.StoreHolder.$className,
    Ext.util.StoreHolder
  ],
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ]
], [Ext.selection, "Model", Ext, "AbstractSelectionModel"], 0));
(Ext.cmd.derive("Ext.selection.DataViewModel", Ext.selection.Model, {
  deselectOnContainerClick: true,
  bindComponent: function(a) {
    var c = this,
      b;
    if (c.view !== a) {
      if (c.view) {
        c.navigationModel = null;
        Ext.destroy(c.viewListeners, c.navigationListeners)
      }
      c.view = a;
      if (a) {
        b = c.getViewListeners();
        b.scope = c;
        b.destroyable = true;
        c.navigationModel = a.getNavigationModel();
        c.viewListeners = a.on(b);
        c.navigationListeners = c.navigationModel.on({
          navigate: c.onNavigate,
          scope: c,
          destroyable: true
        })
      }
    }
  },
  getViewListeners: function() {
    var a = this,
      b = {};
    b[a.view.triggerCtEvent] = a.onContainerClick;
    return b
  },
  onUpdate: function(b) {
    var a = this.view;
    if (a && this.isSelected(b)) {
      a.onItemSelect(b)
    }
  },
  onContainerClick: function() {
    if (this.deselectOnContainerClick) {
      this.deselectAll()
    }
  },
  onSelectChange: function(b, f, e, h) {
    var g = this,
      a = g.view,
      d = f ? "select" : "deselect",
      c = g.store.indexOf(b);
    if ((e || g.fireEvent("before" + d, g, b, c)) !== false && h() !==
      false) {
      if (a) {
        if (f) {
          a.onItemSelect(b)
        } else {
          a.onItemDeselect(b)
        }
      }
      if (!e) {
        g.fireEvent(d, g, b, c)
      }
    }
  },
  destroy: function() {
    this.bindComponent();
    Ext.destroy(this.keyNav);
    Ext.selection.Model.prototype.destroy.call(this)
  }
}, 0, 0, 0, 0, ["selection.dataviewmodel"], 0, [Ext.selection,
  "DataViewModel"
], 0));
(Ext.cmd.derive("Ext.view.NavigationModel", Ext.Base, {
  config: {
    store: null
  },
  focusCls: "x-view-item-focused",
  constructor: function() {
    this.mixins.observable.constructor.call(this)
  },
  bindComponent: function(a) {
    if (this.view !== a) {
      this.view = a;
      this.bindView(a)
    }
  },
  bindView: function(a) {
    var c = this,
      d = a.dataSource,
      b;
    c.initKeyNav(a);
    if (!d.isEmptyStore) {
      c.setStore(d)
    }
    b = c.getViewListeners();
    b.destroyable = true;
    c.viewListeners = c.viewListeners || [];
    c.viewListeners.push(a.on(b))
  },
  updateStore: function(a) {
    this.mixins.storeholder.bindStore.apply(this, [a])
  },
  getStoreListeners: function() {
    var a = this;
    return {
      remove: {
        fn: a.onStoreRemove,
        priority: 1000
      },
      scope: a
    }
  },
  getViewListeners: function() {
    var a = this;
    return {
      containermousedown: a.onContainerMouseDown,
      itemmousedown: a.onItemMouseDown,
      itemclick: a.onItemClick,
      itemcontextmenu: a.onItemMouseDown,
      scope: a
    }
  },
  initKeyNav: function(a) {
    var b = this;
    b.keyNav = new Ext.util.KeyNav({
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
      A: {
        ctrl: true,
        handler: b.onSelectAllKeyPress
      },
      scope: b
    })
  },
  processViewEvent: function(b, a, e, c, d) {
    return d
  },
  addKeyBindings: function(a) {
    this.keyNav.addBindings(a)
  },
  enable: function() {
    this.keyNav.enable();
    this.disabled = false
  },
  disable: function() {
    this.keyNav.disable();
    this.disabled = true
  },
  onContainerMouseDown: function(a, b) {
    if (this.view.containsFocus) {
      b.preventDefault()
    }
  },
  onItemMouseDown: function(b, a, f, d, c) {
    var e = c.parentEvent;
    if (!e || e.type !== "touchstart") {
      this.setPosition(d)
    }
  },
  onItemClick: function(c, b, e, d, a) {
    if (this.record === b) {
      this.fireNavigateEvent(a)
    } else {
      this.setPosition(d, a)
    }
  },
  beforeViewRefresh: function() {
    this.focusRestorePosition = this.view.dataSource.isBufferedStore ?
      this.recordIndex : this.record
  },
  onViewRefresh: function() {
    if (this.focusRestorePosition != null) {
      this.setPosition(this.focusRestorePosition);
      this.focusRestorePosition = null
    }
  },
  onStoreRemove: function(a) {
    var b = this;
    if (b.record && b.view.el.contains(Ext.Element.getActiveElement())) {
      b.view.refreshing = true;
      Ext.on({
        idle: b.afterStoreRemove,
        scope: b,
        single: true,
        args: [b.record, b.recordIndex, a]
      })
    }
  },
  afterStoreRemove: function(e, d, b) {
    var c = this,
      a = c.view;
    a.refreshing = false;
    if (!b.getCount()) {
      c.setPosition();
      a.revertFocus()
    }
    if (!a.el.contains(Ext.Element.getActiveElement())) {
      c.setPosition(b.contains(e) ? e : d, null, null, true)
    }
  },
  setPosition: function(c, g, j, d) {
    var h = this,
      i = h.view,
      e = i.getSelectionModel(),
      a = i.dataSource,
      f, b;
    if (c == null || !i.all.getCount()) {
      h.record = h.recordIndex = null
    } else {
      if (typeof c === "number") {
        b = Math.max(Math.min(c, a.getCount() - 1), 0);
        f = a.getAt(c)
      } else {
        if (c.isEntity) {
          f = a.getById(c.id);
          b = a.indexOf(f);
          if (b === -1) {
            f = a.getAt(0);
            b = 0
          }
        } else {
          if (c.tagName) {
            f = i.getRecord(c);
            b = a.indexOf(f)
          } else {
            f = b = null
          }
        }
      }
    }
    if (f === h.record) {
      h.recordIndex = b;
      return h.focusPosition(b)
    }
    if (h.item) {
      h.item.removeCls(h.focusCls)
    }
    h.previousRecordIndex = h.recordIndex;
    h.previousRecord = h.record;
    h.previousItem = h.item;
    h.recordIndex = b;
    h.record = f;
    d = d || h.record === h.lastFocused;
    if (f) {
      h.focusPosition(h.recordIndex)
    } else {
      h.item = null
    }
    if (!j) {
      e.fireEvent("focuschange", e, h.previousRecord, h.record)
    }
    if (!d && g) {
      h.fireNavigateEvent(g)
    }
  },
  focusPosition: function(a) {
    var b = this;
    if (a != null && a !== -1) {
      if (a.isEntity) {
        a = b.view.dataSource.indexOf(a)
      }
      b.item = b.view.all.item(a);
      if (b.item) {
        b.lastFocused = b.record;
        b.lastFocusedIndex = b.recordIndex;
        b.focusItem(b.item)
      } else {
        b.record = null
      }
    } else {
      b.item = null
    }
  },
  focusItem: function(a) {
    a.addCls(this.focusCls);
    a.focus()
  },
  getPosition: function() {
    return this.record ? this.recordIndex : null
  },
  getRecordIndex: function() {
    return this.recordIndex
  },
  getItem: function() {
    return this.item
  },
  getRecord: function() {
    return this.record
  },
  getLastFocused: function() {
    if (this.view.dataSource.indexOf(this.lastFocused) === -1) {
      return null
    }
    return this.lastFocused
  },
  onKeyUp: function(b) {
    var a = this.recordIndex - 1;
    if (a < 0) {
      a = this.view.all.getCount() - 1
    }
    this.setPosition(a, b)
  },
  onKeyDown: function(b) {
    var a = this.recordIndex + 1;
    if (a > this.view.all.getCount() - 1) {
      a = 0
    }
    this.setPosition(a, b)
  },
  onKeyRight: function(b) {
    var a = this.recordIndex + 1;
    if (a > this.view.all.getCount() - 1) {
      a = 0
    }
    this.setPosition(a, b)
  },
  onKeyLeft: function(b) {
    var a = this.recordIndex - 1;
    if (a < 0) {
      a = this.view.all.getCount() - 1
    }
    this.setPosition(a, b)
  },
  onKeyPageDown: Ext.emptyFn,
  onKeyPageUp: Ext.emptyFn,
  onKeyHome: function(a) {
    this.setPosition(0, a)
  },
  onKeyEnd: function(a) {
    this.setPosition(this.view.all.getCount() - 1, a)
  },
  onKeySpace: function(a) {
    this.fireNavigateEvent(a)
  },
  onKeyEnter: function(a) {
    a.stopEvent();
    a.view.fireEvent("itemclick", a.view, a.record, a.item, a.recordIndex,
      a)
  },
  onSelectAllKeyPress: function(a) {
    this.fireNavigateEvent(a)
  },
  fireNavigateEvent: function(b) {
    var a = this;
    a.fireEvent("navigate", {
      navigationModel: a,
      keyEvent: b,
      previousRecordIndex: a.previousRecordIndex,
      previousRecord: a.previousRecord,
      previousItem: a.previousItem,
      recordIndex: a.recordIndex,
      record: a.record,
      item: a.item
    })
  },
  destroy: function() {
    var a = this;
    a.setStore(null);
    Ext.destroy(a.viewListeners, a.keyNav);
    a.keyNav = a.viewListeners = a.dataSource = a.lastFocused = null;
    a.callParent()
  }
}, 1, 0, 0, 0, ["view.navigation.default"], [
  [Ext.util.Observable.prototype.mixinId || Ext.util.Observable.$className,
    Ext.util.Observable
  ],
  [Ext.mixin.Factoryable.prototype.mixinId || Ext.mixin.Factoryable.$className,
    Ext.mixin.Factoryable
  ],
  [Ext.util.StoreHolder.prototype.mixinId || Ext.util.StoreHolder.$className,
    Ext.util.StoreHolder
  ]
], [Ext.view, "NavigationModel"], 0));
(Ext.cmd.derive("Ext.view.AbstractView", Ext.Component, {
  inheritableStatics: {
    getRecord: function(a) {
      return this.getBoundView(a).getRecord(a)
    },
    getBoundView: function(a) {
      return Ext.getCmp(a.getAttribute("data-boundView"))
    }
  },
  defaultBindProperty: "store",
  renderBuffer: document.createElement("div"),
  statics: {
    updateDelay: 200,
    queueRecordChange: function(m, o, g, b, c) {
      var l = this,
        a = l.changeQueue || (l.changeQueue = {}),
        h = g.internalId,
        k, f, j, d, p, n, e;
      k = a[h] || (a[h] = {
        operation: b,
        record: g,
        data: {},
        views: []
      });
      f = k.data;
      Ext.Array.include(k.views, m);
      if (c && (j = c.length)) {
        for (d = 0; d < j; d++) {
          p = c[d];
          n = g.data[p];
          if (f.hasOwnProperty(p)) {
            if (g.isEqual(f[p], n)) {
              delete f[p];
              e = true
            }
          } else {
            f[p] = n
          }
        }
        if (e && !Ext.Object.getKeys(f).length) {
          delete a[h]
        }
      } else {
        Ext.apply(f, g.data)
      }
      if (!l.flushQueueTask) {
        l.flushQueueTask = Ext.util.TaskManager.newTask({
          run: Ext.global.requestAnimationFrame ? Ext.Function.createAnimationFrame(
            l.onFlushTick, l) : Ext.Function.bind(l.onFlushTick, l),
          interval: Ext.view.AbstractView.updateDelay,
          repeat: 1
        })
      }
      l.flushQueueTask.start()
    },
    onFlushTick: function() {
      Ext.AnimationQueue.start(this.flushChangeQueue, this)
    },
    flushChangeQueue: function() {
      var e = this,
        f, a, h, d, g, c, b;
      if (Ext.isScrolling) {
        e.flushQueueTask.start();
        return
      }
      h = e.changeQueue;
      this.changeQueue = {};
      for (g in h) {
        d = h[g];
        f = d.views;
        a = f.length;
        for (c = 0; c < a; c++) {
          b = f[c];
          if (!b.destroyed) {
            b.handleUpdate(b.dataSource, d.record, d.operation, Ext.Object
              .getKeys(d.data))
          }
        }
      }
      Ext.AnimationQueue.stop(e.flushChangeQueue, e)
    }
  },
  config: {
    selection: null,
    store: "ext-empty-store",
    navigationModel: {
      type: "default"
    },
    selectionModel: {
      type: "dataviewmodel"
    }
  },
  publishes: ["selection"],
  twoWayBindable: ["selection"],
  throttledUpdate: false,
  deferInitialRefresh: false,
  itemCls: "x-dataview-item",
  loadingText: "Loading...",
  loadMask: true,
  loadingUseMsg: true,
  selectedItemCls: "x-item-selected",
  emptyText: "",
  deferEmptyText: true,
  trackOver: false,
  blockRefresh: false,
  preserveScrollOnRefresh: false,
  preserveScrollOnReload: false,
  ariaRole: "listbox",
  itemAriaRole: "option",
  last: false,
  focusable: true,
  tabIndex: 0,
  triggerEvent: "itemclick",
  triggerCtEvent: "containerclick",
  refreshNeeded: true,
  updateSuspendCounter: 0,
  addCmpEvents: Ext.emptyFn,
  constructor: function(a) {
    if (a && a.selModel) {
      a.selectionModel = a.selModel
    }
    Ext.Component.prototype.constructor.call(this, a)
  },
  initComponent: function() {
    var c = this,
      a = Ext.isDefined,
      d = c.itemTpl,
      b = {};
    if (d) {
      if (Ext.isArray(d)) {
        d = d.join("")
      } else {
        if (Ext.isObject(d)) {
          b = Ext.apply(b, d.initialConfig);
          d = d.html
        }
      }
      if (!c.itemSelector) {
        c.itemSelector = "." + c.itemCls
      }
      d = Ext.String.format(
        '<tpl for="."><div class="{0}" role="{2}">{1}</div></tpl>', c.itemCls,
        d, c.itemAriaRole);
      c.tpl = new Ext.XTemplate(d, b)
    }
    Ext.Component.prototype.initComponent.call(this);
    c.tpl = c.getTpl("tpl");
    if (c.overItemCls) {
      c.trackOver = true
    }
    c.addCmpEvents();
    c.store = Ext.data.StoreManager.lookup(c.store || "ext-empty-store");
    if (!c.dataSource) {
      c.dataSource = c.store
    }
    c.getNavigationModel().bindComponent(this);
    c.bindStore(c.dataSource, true, "dataSource");
    if (!c.all) {
      c.all = new Ext.CompositeElementLite()
    }
    c.scrollState = {
      top: 0,
      left: 0
    };
    c.savedTabIndexAttribute = "data-savedtabindex-" + c.id
  },
  getElConfig: function() {
    var a = this.mixins.renderable.getElConfig.call(this);
    if (this.focusable) {
      a.tabIndex = 0
    }
    return a
  },
  onRender: function() {
    var a = this.loadMask;
    Ext.Component.prototype.onRender.apply(this, arguments);
    if (a) {
      this.createMask(a)
    }
  },
  beforeLayout: function() {
    var a = this;
    Ext.Component.prototype.beforeLayout.apply(this, arguments);
    if (a.refreshNeeded && !a.pendingRefresh) {
      if (a.refreshCounter) {
        a.refresh()
      } else {
        a.doFirstRefresh(a.dataSource)
      }
    }
  },
  onMaskBeforeShow: function() {
    var b = this,
      a = b.loadingHeight;
    if (a && a > b.getHeight()) {
      b.hasLoadingHeight = true;
      b.oldMinHeight = b.minHeight;
      b.minHeight = a;
      b.updateLayout()
    }
  },
  onMaskHide: function() {
    var a = this;
    if (!a.destroying && a.hasLoadingHeight) {
      a.minHeight = a.oldMinHeight;
      a.updateLayout();
      delete a.hasLoadingHeight
    }
  },
  beforeRender: function() {
    Ext.Component.prototype.beforeRender.apply(this, arguments);
    this.getSelectionModel().beforeViewRender(this)
  },
  afterRender: function() {
    Ext.Component.prototype.afterRender.apply(this, arguments);
    if (this.focusable) {
      this.focusEl = this.el
    }
  },
  getRefItems: function() {
    var b = this.loadMask,
      a = [];
    if (b && b.isComponent) {
      a.push(b)
    }
    return a
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
  applySelectionModel: function(b, f) {
    var e = this,
      d = e.grid,
      g, c, a;
    if (f) {
      f.un({
        scope: e,
        selectionchange: e.updateBindSelection,
        lastselectedchanged: e.updateBindSelection,
        select: e.ariaSelect,
        deselect: e.ariaDeselect
      });
      Ext.destroy(e.selModelRelayer);
      b = Ext.Factory.selection(b)
    } else {
      if (b && b.isSelectionModel) {
        b.locked = e.disableSelection
      } else {
        if (e.simpleSelect) {
          g = "SIMPLE"
        } else {
          if (e.multiSelect) {
            g = "MULTI"
          } else {
            g = "SINGLE"
          }
        }
        if (typeof b === "string") {
          b = {
            type: b
          }
        }
        b = Ext.Factory.selection(Ext.apply({
          allowDeselect: e.allowDeselect || e.multiSelect,
          mode: g,
          locked: e.disableSelection
        }, b))
      }
    }
    if (b.mode !== "SINGLE") {
      a = (d || e).ariaEl.dom;
      if (a) {
        a.setAttribute("aria-multiselectable", true)
      } else {
        if (!d) {
          c = e.ariaRenderAttributes || (e.ariaRenderAttributes = {});
          c["aria-multiselectable"] = true
        }
      }
    }
    e.selModelRelayer = e.relayEvents(b, ["selectionchange",
      "beforeselect", "beforedeselect", "select", "deselect",
      "focuschange"
    ]);
    b.on({
      scope: e,
      lastselectedchanged: e.updateBindSelection,
      selectionchange: e.updateBindSelection,
      select: e.ariaSelect,
      deselect: e.ariaDeselect
    });
    return b
  },
  updateSelectionModel: function(a) {
    this.selModel = a
  },
  applyNavigationModel: function(a) {
    return Ext.Factory.viewNavigation(a)
  },
  onFocusEnter: function(d) {
    var c = this,
      b = c.getNavigationModel(),
      a;
    c.toggleChildrenTabbability(false);
    if (!c.itemFocused && c.all.getCount()) {
      a = b.getLastFocused();
      b.setPosition(a || 0, d.event, null, !a);
      c.itemFocused = b.getPosition() != null
    }
    if (c.itemFocused) {
      this.el.dom.setAttribute("tabIndex", "-1")
    }
    Ext.Component.prototype.onFocusEnter.call(this, d)
  },
  onFocusLeave: function(b) {
    var a = this;
    if (a.itemFocused && !a.refreshing) {
      a.getNavigationModel().setPosition(null, b.event, null, true);
      a.itemFocused = false;
      a.el.dom.setAttribute("tabIndex", 0)
    }
    Ext.Component.prototype.onFocusLeave.call(this, b)
  },
  ariaSelect: function(b, a) {
    var c = this.getNode(a);
    if (c) {
      c.setAttribute("aria-selected", true)
    }
  },
  ariaDeselect: function(b, a) {
    var c = this.getNode(a);
    if (c) {
      c.removeAttribute("aria-selected")
    }
  },
  onRemoved: function(a) {
    Ext.Component.prototype.onRemoved.call(this, a);
    if (!a) {
      this.onFocusLeave({})
    }
  },
  refresh: function() {
    var i = this,
      h = i.all,
      k = h.getCount(),
      g = i.refreshCounter,
      j, d, c, f = i.getSelectionModel(),
      b = i.getNavigationModel(),
      e = g && h.getCount() && i.preserveScrollOnRefresh && i.getScrollable(),
      a;
    if (!i.rendered || i.destroyed || i.preventRefresh) {
      return
    }
    if (!i.hasListeners.beforerefresh || i.fireEvent("beforerefresh", i) !==
      false) {
      i.refreshing = true;
      b.beforeViewRefresh(i);
      j = i.getTargetEl();
      c = i.getViewRange();
      d = j.dom;
      if (e) {
        a = e.getPosition()
      }
      if (g) {
        i.clearViewEl();
        i.refreshCounter++
      } else {
        i.refreshCounter = 1
      }
      i.tpl.append(j, i.collectData(c, h.startIndex || 0));
      if (c.length < 1) {
        i.addEmptyText();
        h.clear()
      } else {
        i.collectNodes(j.dom);
        i.updateIndexes(0)
      }
      b.onViewRefresh();
      if (i.refreshSelmodelOnRefresh !== false) {
        f.refresh()
      }
      i.refreshNeeded = false;
      i.refreshSize(h.getCount() !== k);
      i.fireEvent("refresh", i, c);
      if (e) {
        e.scrollTo(a)
      }
      if (!i.viewReady) {
        i.viewReady = true;
        i.fireEvent("viewready", i)
      }
      i.refreshing = false;
      i.refreshScroll();
      i.cleanupData()
    }
  },
  addEmptyText: function() {
    var b = this,
      a = b.getStore();
    if (b.emptyText && !a.isLoading() && (!b.deferEmptyText || b.refreshCounter >
        1 || a.isLoaded())) {
      b.emptyEl = Ext.core.DomHelper.insertHtml("beforeEnd", b.getTargetEl()
        .dom, b.emptyText)
    }
  },
  getViewRange: function() {
    return this.dataSource.getRange()
  },
  refreshSize: function(d) {
    var c = this,
      b = c.getSizeModel(),
      a = c.getScrollable();
    if (b.height.shrinkWrap || b.width.shrinkWrap || d) {
      c.updateLayout()
    } else {
      if (c.touchScroll && !c.bufferedRenderer) {
        if (a) {
          a.refresh()
        } else {
          c.on({
            boxready: c.refreshScroll,
            scope: c,
            single: true
          })
        }
      }
    }
  },
  onResize: function() {
    var b = this,
      a = b.getScrollable();
    if (a && !b._hasScrollListener) {
      a.on({
        scroll: b.onViewScroll,
        scrollend: b.onViewScrollEnd,
        scope: b,
        onFrame: !!Ext.global.requestAnimationFrame
      });
      b._hasScrollListener = true
    }
    Ext.Component.prototype.onResize.apply(this, arguments)
  },
  clearViewEl: function() {
    var b = this,
      c = b.getTargetEl(),
      a = b.getNodeContainer() === c;
    b.clearEmptyEl();
    b.all.clear(!a);
    if (a) {
      c.dom.innerHTML = ""
    }
  },
  clearEmptyEl: function() {
    var a = this.emptyEl;
    if (a) {
      Ext.removeNode(a)
    }
    this.emptyEl = null
  },
  onViewScroll: function(b, a, c) {
    this.fireEvent("scroll", this, a, c)
  },
  onViewScrollEnd: function(b, a, c) {
    this.fireEvent("scrollend", this, a, c)
  },
  saveScrollState: function() {
    var a = this,
      b = a.scrollState;
    if (a.rendered) {
      b.left = a.getScrollX();
      b.top = a.getScrollY()
    }
  },
  restoreScrollState: function() {
    var a = this,
      b = a.scrollState;
    if (a.rendered) {
      a.setScrollX(b.left);
      a.setScrollY(b.top)
    }
  },
  prepareData: function(e, d, c) {
    var b, a, f;
    if (c) {
      b = c.getAssociatedData();
      for (a in b) {
        if (b.hasOwnProperty(a)) {
          if (!f) {
            e = Ext.Object.chain(e);
            f = true
          }
          e[a] = b[a]
        }
      }
    }
    return e
  },
  collectData: function(c, f) {
    var e = [],
      d = 0,
      a = c.length,
      b;
    for (; d < a; d++) {
      b = c[d];
      e[d] = this.prepareData(b.data, f + d, b)
    }
    return e
  },
  cleanupData: Ext.emptyFn,
  bufferRender: function(d, e) {
    var g = this,
      h = g.renderBuffer,
      b = document.createDocumentFragment(),
      c, a, f;
    g.tpl.overwrite(h, g.collectData(d, e));
    c = Ext.fly(h).query(g.getItemSelector());
    for (f = 0, a = c.length; f < a; f++) {
      b.appendChild(c[f])
    }
    return {
      fragment: b,
      children: c
    }
  },
  nodeContainerSelector: null,
  getNodeContainer: function() {
    var b = this.getTargetEl(),
      a = this.nodeContainerSelector;
    return a ? b.down(a, true) : b
  },
  getNodeContainerSelector: function() {
    return this.nodeContainerSelector
  },
  onUpdate: function(d, b, c, g, e) {
    var f = this,
      a = e && e.filtered;
    if (!a && f.getNode(b)) {
      if (f.throttledUpdate) {
        f.statics().queueRecordChange(f, d, b, c, g)
      } else {
        f.handleUpdate.apply(f, arguments)
      }
    }
  },
  handleUpdate: function(c, a) {
    var f = this,
      d, e, b = f.getSelectionModel();
    if (f.viewReady) {
      d = f.dataSource.indexOf(a);
      if (d > -1) {
        if (f.getNode(a)) {
          e = f.bufferRender([a], d).children[0];
          f.all.replaceElement(d, e, true);
          f.updateIndexes(d, d);
          b.onUpdate(a);
          f.refreshSizePending = true;
          if (b.isSelected(a)) {
            f.onItemSelect(a)
          }
          if (f.hasListeners.itemupdate) {
            f.fireEvent("itemupdate", a, d, e)
          }
          return e
        }
      }
    }
  },
  onReplace: function(i, k, b, c) {
    var g = this,
      h = g.all,
      e = g.getSelectionModel(),
      l = k,
      n, m, f, a, j, d;
    if (g.rendered) {
      n = g.bufferRender(c, k, true);
      f = n.fragment;
      a = n.children;
      m = h.item(k);
      if (m) {
        h.item(k).insertSibling(f, "before", true)
      } else {
        g.appendNodes(f)
      }
      h.insert(k, a);
      k += c.length;
      d = k + b.length - 1;
      j = h.removeRange(k, d, true);
      if (g.refreshSelmodelOnRefresh !== false) {
        e.refresh()
      }
      g.updateIndexes(k);
      if (g.hasListeners.itemremove) {
        g.fireEvent("itemremove", b, l, j, g)
      }
      if (g.hasListeners.itemadd) {
        g.fireEvent("itemadd", c, l, a)
      }
      g.refreshSize()
    }
  },
  onAdd: function(d, c, e) {
    var f = this,
      b, a = f.getSelectionModel();
    if (f.rendered) {
      if (f.all.getCount() === 0) {
        f.refresh();
        b = f.all.slice()
      } else {
        b = f.doAdd(c, e);
        if (f.refreshSelmodelOnRefresh !== false) {
          a.refresh()
        }
        f.updateIndexes(e);
        f.refreshSizePending = true
      }
      if (f.hasListeners.itemadd) {
        f.fireEvent("itemadd", c, e, b)
      }
    }
  },
  appendNodes: function(a) {
    var b = this.all,
      c = b.getCount();
    if (this.nodeContainerSelector) {
      this.getNodeContainer().appendChild(a)
    } else {
      b.item(c - 1).insertSibling(a, "after")
    }
  },
  doAdd: function(c, e) {
    var g = this,
      j = g.bufferRender(c, e, true),
      f = j.fragment,
      b = j.children,
      h = g.all,
      d = h.getCount(),
      i = h.startIndex || 0,
      a = h.endIndex || d - 1;
    if (d === 0 || e > a) {
      g.appendNodes(f)
    } else {
      if (e <= i) {
        h.item(i).insertSibling(f, "before", true)
      } else {
        h.item(e).insertSibling(b, "before", true)
      }
    }
    h.insert(e, b);
    return b
  },
  onRemove: function(b, e, h) {
    var j = this,
      l = j.all,
      c = j.hasListeners.itemremove,
      k, f, g, a, d;
    if (l.getCount()) {
      if (j.dataSource.getCount() === 0) {
        if (c) {
          j.fireEvent("itemremove", e, h, j.getNodes(h, h + e.length - 1))
        }
        j.refresh()
      } else {
        if (c) {
          a = []
        }
        for (f = e.length - 1; f >= 0; --f) {
          g = e[f];
          k = h + f;
          if (a) {
            d = l.item(k);
            a[f] = d ? d.dom : undefined
          }
          if (l.item(k)) {
            j.doRemove(g, k)
          }
        }
        if (c) {
          j.fireEvent("itemremove", e, h, a, j)
        }
        j.updateIndexes(h)
      }
      j.refreshSizePending = true
    }
  },
  doRemove: function(a, b) {
    this.all.removeElement(b, true)
  },
  refreshNode: function(a) {
    if (Ext.isNumber(a)) {
      a = this.store.getAt(a)
    }
    this.onUpdate(this.dataSource, a)
  },
  updateIndexes: function(g, f) {
    var b = this.all.elements,
      e, a = this.getViewRange(),
      d, c = this.id;
    g = g || 0;
    f = f || ((f === 0) ? 0 : (b.length - 1));
    for (d = g; d <= f; d++) {
      e = b[d];
      e.setAttribute("data-recordIndex", d);
      e.setAttribute("data-recordId", a[d].internalId);
      e.setAttribute("data-boundView", c)
    }
  },
  bindStore: function(b, c, f) {
    var e = this,
      a = e.getSelectionModel(),
      d = e.getNavigationModel();
    a.preventRefresh = true;
    a.bindStore(b);
    a.bindComponent(b ? e : null);
    a.preventRefresh = false;
    d.setStore(b);
    e.mixins.storeholder.bindStore.apply(e, arguments);
    if (b && e.componentLayoutCounter && !e.preventRefresh) {
      e.doFirstRefresh(b, !c)
    }
  },
  doFirstRefresh: function(a, c) {
    var b = this;
    if (b.deferInitialRefresh && !c) {
      Ext.defer(b.doFirstRefresh, 1, b, [a, true])
    } else {
      if (a && !a.isLoading()) {
        b.refresh()
      }
    }
  },
  onUnbindStore: function(b, c, a) {
    if (a === "store") {
      this.setMaskBind(null);
      this.getSelectionModel().bindStore(null)
    }
  },
  onBindStore: function(a, b, d, e) {
    var c = this;
    if (c.store.isBufferedStore) {
      c.store.preserveScrollOnReload = c.preserveScrollOnReload
    }
    if (e && e.isBufferedStore) {
      delete e.preserveScrollOnReload
    }
    c.setMaskBind(a);
    if (!b && d === "store") {
      c.preventRefresh = true;
      c.store = a;
      c.bindStore(a, false, "dataSource");
      c.preventRefresh = false
    }
  },
  setMaskBind: function(b) {
    var a = this.loadMask;
    if (this.rendered && a && b && !a.bindStore) {
      a = this.createMask()
    }
    if (a && a.bindStore) {
      a.bindStore(b)
    }
  },
  getStoreListeners: function() {
    var a = this;
    return {
      refresh: a.onDataRefresh,
      replace: a.onReplace,
      add: a.onAdd,
      remove: a.onRemove,
      update: a.onUpdate,
      clear: a.onDataRefresh,
      beginupdate: a.onBeginUpdate,
      endupdate: a.onEndUpdate
    }
  },
  onBeginUpdate: function() {
    ++this.updateSuspendCounter;
    Ext.suspendLayouts()
  },
  onEndUpdate: function() {
    var a = this;
    if (a.updateSuspendCounter) {
      --a.updateSuspendCounter
    }
    Ext.resumeLayouts(true);
    if (a.refreshSizePending) {
      a.refreshSize(true);
      a.refreshSizePending = false
    }
  },
  onDataRefresh: function(a) {
    var c = this,
      b = c.preserveScrollOnRefresh;
    if (a.loadCount > c.lastRefreshLoadCount) {
      c.preserveScrollOnRefresh = c.preserveScrollOnReLoad
    }
    c.refreshView();
    c.preserveScrollOnRefresh = b;
    c.lastRefreshLoadCount = a.loadCount
  },
  refreshView: function() {
    var b = this,
      a = b.blockRefresh || !b.rendered || b.up(
        "[collapsed],[isCollapsingOrExpanding],[hidden]");
    if (a) {
      b.refreshNeeded = true
    } else {
      if (b.bufferedRenderer) {
        b.bufferedRenderer.refreshView()
      } else {
        b.refresh()
      }
    }
  },
  findItemByChild: function(a) {
    return Ext.fly(a).findParent(this.getItemSelector(), this.getTargetEl())
  },
  findTargetByEvent: function(a) {
    return a.getTarget(this.getItemSelector(), this.getTargetEl())
  },
  getSelectedNodes: function() {
    var b = [],
      a = this.getSelectionModel().getSelection(),
      d = a.length,
      c = 0;
    for (; c < d; c++) {
      b.push(this.getNode(a[c]))
    }
    return b
  },
  getRecords: function(c) {
    var b = [],
      d = 0,
      a = c.length,
      e = this.dataSource.data;
    for (; d < a; d++) {
      b[b.length] = e.getByKey(c[d].getAttribute("data-recordId"))
    }
    return b
  },
  getRecord: function(a) {
    return this.dataSource.getByInternalId(Ext.getDom(a).getAttribute(
      "data-recordId"))
  },
  isSelected: function(b) {
    var a = this.getRecord(b);
    return this.getSelectionModel().isSelected(a)
  },
  select: function(b, c, a) {
    this.getSelectionModel().select(b, c, a)
  },
  deselect: function(b, a) {
    this.getSelectionModel().deselect(b, a)
  },
  getNode: function(b) {
    var c = this,
      a;
    if (c.rendered && (b || b === 0)) {
      if (Ext.isString(b)) {
        a = document.getElementById(b)
      } else {
        if (b.isModel) {
          a = c.getNodeByRecord(b)
        } else {
          if (Ext.isNumber(b)) {
            a = c.all.elements[b]
          } else {
            if (b.target && b.target.nodeType) {
              b = b.target
            }
            a = Ext.fly(b).findParent(c.itemSelector, c.getTargetEl())
          }
        }
      }
    }
    return a || null
  },
  getNodeByRecord: function(a) {
    var b = this.store.indexOf(a);
    return this.all.elements[b] || null
  },
  getNodes: function(c, a) {
    var b = this.all;
    if (a !== undefined) {
      a++
    }
    return b.slice(c, a)
  },
  indexOf: function(a) {
    a = this.getNode(a);
    if (!a && a !== 0) {
      return -1
    }
    if (a.getAttribute("data-recordIndex")) {
      return Number(a.getAttribute("data-recordIndex"))
    }
    return this.all.indexOf(a)
  },
  onDestroy: function() {
    var b = this,
      a = b.updateSuspendCounter;
    b.all.clear();
    b.emptyEl = null;
    Ext.Component.prototype.onDestroy.call(this);
    b.bindStore(null);
    b.store = b.dataSource = b.storeListeners = null;
    if (b.selModelRelayer) {
      b.selModelRelayer.destroy();
      b.selModelRelayer = null
    }
    Ext.destroy(b.navigationModel, b.selectionModel);
    b.navigationModel = b.selectionModel = b.selModel = null;
    b.loadMask = null;
    while (a--) {
      Ext.resumeLayouts(true)
    }
  },
  onItemSelect: function(a) {
    var b = this.getNode(a);
    if (b) {
      Ext.fly(b).addCls(this.selectedItemCls)
    }
  },
  onItemDeselect: function(a) {
    var b = this.getNode(a);
    if (b) {
      Ext.fly(b).removeCls(this.selectedItemCls)
    }
  },
  getItemSelector: function() {
    return this.itemSelector
  },
  addItemCls: function(b, a) {
    var c = this.getNode(b);
    if (c) {
      Ext.fly(c).addCls(a)
    }
  },
  removeItemCls: function(b, a) {
    var c = this.getNode(b);
    if (c) {
      Ext.fly(c).removeCls(a)
    }
  },
  updateStore: function(a) {
    if (!this.isConfiguring) {
      delete this.store;
      this.bindStore(a)
    }
  },
  privates: {
    toggleChildrenTabbability: function(b) {
      var a = this.getTargetEl();
      if (b) {
        a.restoreTabbableState(true)
      } else {
        a.saveTabbableState({
          skipSelf: true,
          includeSaved: false
        })
      }
    },
    collectNodes: function(c) {
      var b = this.all,
        a = {
          role: this.itemAriaRole
        };
      b.fill(Ext.fly(c).query(this.getItemSelector()), b.startIndex || 0);
      if (this.focusable) {
        a.tabindex = "-1"
      }
      b.set(a)
    },
    createMask: function(b) {
      var d = this,
        c = d.getStore(),
        a;
      if (c && !c.isEmptyStore && !c.loadsSynchronously()) {
        a = {
          target: d,
          msg: d.loadingText,
          useMsg: d.loadingUseMsg,
          store: c
        };
        if (d.loadingCls) {
          a.msgCls = d.loadingCls
        }
        if (Ext.isObject(b)) {
          a = Ext.apply(a, b)
        }
        d.loadMask = new Ext.LoadMask(a);
        d.loadMask.on({
          scope: d,
          beforeshow: d.onMaskBeforeShow,
          hide: d.onMaskHide
        })
      }
      return d.loadMask
    },
    getOverflowEl: function() {
      return Ext.Component.prototype.getTargetEl.call(this)
    },
    getTargetEl: function() {
      return this.touchScroll ? this.getScrollerEl() : Ext.Component.prototype
        .getTargetEl.call(this)
    }
  }
}, 1, 0, ["component", "box"], {
  component: true,
  box: true
}, 0, [
  [Ext.util.StoreHolder.prototype.mixinId || Ext.util.StoreHolder.$className,
    Ext.util.StoreHolder
  ]
], [Ext.view, "AbstractView"], function() {
  Ext.deprecate("extjs", "4.0", function() {
    Ext.view.AbstractView.override({
      getSelectionCount: function() {
        if (Ext.global.console) {
          Ext.global.console.warn(
            "DataView: getSelectionCount will be removed, please interact with the Ext.selection.DataViewModel"
          )
        }
        return this.selModel.getSelection().length
      },
      getSelectedRecords: function() {
        if (Ext.global.console) {
          Ext.global.console.warn(
            "DataView: getSelectedRecords will be removed, please interact with the Ext.selection.DataViewModel"
          )
        }
        return this.selModel.getSelection()
      },
      select: function(a, b, d) {
        if (Ext.global.console) {
          Ext.global.console.warn(
            "DataView: select will be removed, please access select through a DataView's SelectionModel, ie: view.getSelectionModel().select()"
          )
        }
        var c = this.getSelectionModel();
        return c.select.apply(c, arguments)
      },
      clearSelections: function() {
        if (Ext.global.console) {
          Ext.global.console.warn(
            "DataView: clearSelections will be removed, please access deselectAll through DataView's SelectionModel, ie: view.getSelectionModel().deselectAll()"
          )
        }
        var a = this.getSelectionModel();
        return a.deselectAll()
      }
    })
  })
}));
(Ext.cmd.derive("Ext.view.View", Ext.view.AbstractView, {
  alternateClassName: "Ext.DataView",
  inputTagRe: /^textarea$|^input$/i,
  keyEventRe: /^key/,
  inheritableStatics: {
    EventMap: {
      longpress: "LongPress",
      mousedown: "MouseDown",
      mouseup: "MouseUp",
      click: "Click",
      dblclick: "DblClick",
      contextmenu: "ContextMenu",
      mouseover: "MouseOver",
      mouseout: "MouseOut",
      mouseenter: "MouseEnter",
      mouseleave: "MouseLeave",
      keydown: "KeyDown",
      keyup: "KeyUp",
      keypress: "KeyPress",
      focus: "Focus"
    },
    TouchEventMap: {
      touchstart: "mousedown",
      touchend: "mouseup",
      tap: "click",
      doubletap: "dblclick"
    }
  },
  afterRender: function() {
    var a = this;
    Ext.view.AbstractView.prototype.afterRender.call(this);
    a.mon(a.el, {
      scope: a,
      click: a.handleEvent,
      longpress: a.handleEvent,
      mousedown: a.handleEvent,
      mouseup: a.handleEvent,
      dblclick: a.handleEvent,
      contextmenu: a.handleEvent,
      keydown: a.handleEvent,
      keyup: a.handleEvent,
      keypress: a.handleEvent,
      mouseover: a.handleMouseOver,
      mouseout: a.handleMouseOut
    })
  },
  getTargetSelector: function() {
    return this.dataRowSelector || this.itemSelector
  },
  handleMouseOver: function(d) {
    var c = this,
      a = c.getTargetSelector(),
      b = d.getTarget(a);
    if (!c.destroyed) {
      if (b) {
        if (c.mouseOverItem !== b && c.el.contains(b)) {
          c.mouseOverItem = d.item = b;
          d.newType = "mouseenter";
          c.handleEvent(d)
        }
      } else {
        c.handleEvent(d)
      }
    }
  },
  handleMouseOut: function(g) {
    var d = this,
      b = d.getTargetSelector(),
      c = g.getTarget(b),
      f = g.getRelatedTarget(b),
      a;
    if ((c === f) && !(c === null && f === null)) {
      return
    }
    if (!d.destroyed) {
      if (c && (a = d.self.getBoundView(c))) {
        g.item = c;
        g.newType = "mouseleave";
        a.handleEvent(g);
        a.mouseOverItem = null
      } else {
        d.handleEvent(g)
      }
    }
  },
  handleEvent: function(c) {
    var b = this,
      a = b.keyEventRe.test(c.type);
    c.view = b;
    c.item = c.getTarget(b.itemSelector);
    if (c.item) {
      c.record = b.getRecord(c.item)
    }
    if (b.processUIEvent(c) !== false) {
      b.processSpecialEvent(c)
    }
    if (a && !Ext.fly(c.target).isInputField()) {
      if (c.getKey() === c.SPACE || c.isNavKeyPress(true)) {
        c.preventDefault()
      }
    }
    c.view = null
  },
  processItemEvent: Ext.emptyFn,
  processContainerEvent: Ext.emptyFn,
  processSpecialEvent: Ext.emptyFn,
  processUIEvent: function(f) {
    if (!Ext.getBody().isAncestor(f.target)) {
      return
    }
    var i = this,
      j = f.item,
      k = i.self,
      a = k.EventMap,
      g = k.TouchEventMap,
      d, c = f.record,
      h = f.type,
      b = h;
    if (f.newType) {
      b = f.newType
    }
    if (j) {
      b = g[b] || b;
      d = f.recordIndex = i.indexInStore ? i.indexInStore(c) : i.indexOf(
        j);
      if (!c || i.processItemEvent(c, j, d, f) === false) {
        return false
      }
      if ((i["onBeforeItem" + a[b]](c, j, d, f) === false) || (i.fireEvent(
          "beforeitem" + b, i, c, j, d, f) === false) || (i["onItem" + a[
          b]](c, j, d, f) === false)) {
        return false
      }
      i.fireEvent("item" + b, i, c, j, d, f)
    } else {
      h = g[h] || h;
      if ((i.processContainerEvent(f) === false) || (i[
          "onBeforeContainer" + a[h]](f) === false) || (i.fireEvent(
          "beforecontainer" + h, i, f) === false) || (i["onContainer" + a[
          h]](f) === false)) {
        return false
      }
      i.fireEvent("container" + h, i, f)
    }
    return true
  },
  onItemMouseEnter: function(a, c, b, d) {
    if (this.trackOver) {
      this.highlightItem(c)
    }
  },
  onItemMouseLeave: function(a, c, b, d) {
    if (this.trackOver) {
      this.clearHighlight()
    }
  },
  onItemMouseDown: Ext.emptyFn,
  onItemLongPress: Ext.emptyFn,
  onItemMouseUp: Ext.emptyFn,
  onItemFocus: Ext.emptyFn,
  onItemClick: Ext.emptyFn,
  onItemDblClick: Ext.emptyFn,
  onItemContextMenu: Ext.emptyFn,
  onItemKeyDown: Ext.emptyFn,
  onItemKeyUp: Ext.emptyFn,
  onItemKeyPress: Ext.emptyFn,
  onBeforeItemLongPress: Ext.emptyFn,
  onBeforeItemMouseDown: Ext.emptyFn,
  onBeforeItemMouseUp: Ext.emptyFn,
  onBeforeItemFocus: Ext.emptyFn,
  onBeforeItemMouseEnter: Ext.emptyFn,
  onBeforeItemMouseLeave: Ext.emptyFn,
  onBeforeItemClick: Ext.emptyFn,
  onBeforeItemDblClick: Ext.emptyFn,
  onBeforeItemContextMenu: Ext.emptyFn,
  onBeforeItemKeyDown: Ext.emptyFn,
  onBeforeItemKeyUp: Ext.emptyFn,
  onBeforeItemKeyPress: Ext.emptyFn,
  onContainerMouseDown: Ext.emptyFn,
  onContainerLongPress: Ext.emptyFn,
  onContainerMouseUp: Ext.emptyFn,
  onContainerMouseOver: Ext.emptyFn,
  onContainerMouseOut: Ext.emptyFn,
  onContainerClick: Ext.emptyFn,
  onContainerDblClick: Ext.emptyFn,
  onContainerContextMenu: Ext.emptyFn,
  onContainerKeyDown: Ext.emptyFn,
  onContainerKeyUp: Ext.emptyFn,
  onContainerKeyPress: Ext.emptyFn,
  onBeforeContainerMouseDown: Ext.emptyFn,
  onBeforeContainerLongPress: Ext.emptyFn,
  onBeforeContainerMouseUp: Ext.emptyFn,
  onBeforeContainerMouseOver: Ext.emptyFn,
  onBeforeContainerMouseOut: Ext.emptyFn,
  onBeforeContainerClick: Ext.emptyFn,
  onBeforeContainerDblClick: Ext.emptyFn,
  onBeforeContainerContextMenu: Ext.emptyFn,
  onBeforeContainerKeyDown: Ext.emptyFn,
  onBeforeContainerKeyUp: Ext.emptyFn,
  onBeforeContainerKeyPress: Ext.emptyFn,
  setHighlightedItem: function(c) {
    var b = this,
      a = b.highlightedItem,
      d = b.overItemCls;
    if (a !== c) {
      if (a) {
        Ext.fly(a).removeCls(d);
        if (Ext.isIE8) {
          b.repaintBorder(a);
          b.repaintBorder(a.nextSibling)
        }
        if (b.hasListeners.unhighlightitem) {
          b.fireEvent("unhighlightitem", b, a)
        }
      }
      b.highlightedItem = c;
      if (c) {
        Ext.fly(c).addCls(b.overItemCls);
        if (Ext.isIE8) {
          b.repaintBorder(c.nextSibling)
        }
        if (b.hasListeners.highlightitem) {
          b.fireEvent("highlightitem", b, c)
        }
      }
    }
  },
  highlightItem: function(a) {
    this.setHighlightedItem(a)
  },
  clearHighlight: function() {
    this.setHighlightedItem(undefined)
  },
  handleUpdate: function(b, a) {
    var f = this,
      e, c, d;
    if (f.viewReady) {
      e = f.getNode(a);
      c = Ext.view.AbstractView.prototype.handleUpdate.apply(this,
        arguments);
      d = f.highlightedItem;
      if (d && d === e) {
        delete f.highlightedItem;
        if (c) {
          f.highlightItem(c)
        }
      }
    }
  },
  refresh: function() {
    this.clearHighlight();
    Ext.view.AbstractView.prototype.refresh.apply(this, arguments)
  },
  focusNode: function(h) {
    var f = this,
      e = f.getNode(h),
      d = f.el,
      a = 0,
      b = 0,
      g = d.getRegion(),
      c;
    g.bottom = g.top + d.dom.clientHeight;
    g.right = g.left + d.dom.clientWidth;
    if (e) {
      c = Ext.fly(e).getRegion();
      if (c.top < g.top) {
        a = c.top - g.top
      } else {
        if (c.bottom > g.bottom) {
          a = c.bottom - g.bottom
        }
      }
      if (c.left < g.left) {
        b = c.left - g.left
      } else {
        if (c.right > g.right) {
          b = c.right - g.right
        }
      }
      if (b || a) {
        f.scrollBy(b, a, false)
      }
      Ext.fly(e).set({
        tabIndex: -1
      });
      e.focus()
    }
  },
  bindStore: function(c, d, b) {
    var e = this,
      f = e[b],
      a = e.getSelectionModel();
    if (f && f.isFeatureStore && e.rendered) {
      a.bindStore(f.store);
      a.bindComponent(e);
      if (c.isFeatureStore) {
        e.bindStoreListeners(c);
        f.bindStore(f.store)
      } else {
        f.bindStore(c)
      }
    } else {
      Ext.view.AbstractView.prototype.bindStore.call(this, c, d, b)
    }
  },
  privates: {
    repaintBorder: function(b) {
      var a = this.getNode(b);
      if (a) {
        a.className = a.className
      }
    }
  }
}, 0, ["dataview"], ["component", "box", "dataview"], {
  component: true,
  box: true,
  dataview: true
}, ["widget.dataview"], 0, [Ext.view, "View", Ext, "DataView"], 0));
(Ext.cmd.derive("Ext.toolbar.Item", Ext.Component, {
  alternateClassName: "Ext.Toolbar.Item",
  enable: Ext.emptyFn,
  disable: Ext.emptyFn,
  focus: Ext.emptyFn
}, 0, ["tbitem"], ["component", "box", "tbitem"], {
  component: true,
  box: true,
  tbitem: true
}, ["widget.tbitem"], 0, [Ext.toolbar, "Item", Ext.Toolbar, "Item"], 0));
(Ext.cmd.derive("Ext.toolbar.TextItem", Ext.toolbar.Item, {
    alternateClassName: "Ext.Toolbar.TextItem",
    text: "",
    baseCls: "x-toolbar-text",
    ariaRole: null,
    beforeRender: function() {
      var a = this.text;
      Ext.toolbar.Item.prototype.beforeRender.call(this);
      if (a) {
        this.html = a
      }
    },
    setText: function(a) {
      this.update(a)
    }
  }, 0, ["tbtext"], ["component", "box", "tbitem", "tbtext"], {
    component: true,
    box: true,
    tbitem: true,
    tbtext: true
  }, ["widget.tbtext"], 0, [Ext.toolbar, "TextItem", Ext.Toolbar, "TextItem"],
  0));
(Ext.cmd.derive("Ext.form.field.Display", Ext.form.field.Base, {
  alternateClassName: ["Ext.form.DisplayField", "Ext.form.Display"],
  fieldSubTpl: [
    '<div id="{id}" data-ref="inputEl" tabindex="-1" role="textbox" aria-readonly="true"',
    ' aria-labelledby="{cmpId}-labelEl" {inputAttrTpl}',
    '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
    ' class="{fieldCls} {fieldCls}-{ui}">{value}</div>', {
      compiled: true,
      disableFormats: true
    }
  ],
  ariaRole: undefined,
  focusable: false,
  readOnly: true,
  fieldCls: "x-form-display-field",
  fieldBodyCls: "x-form-display-field-body",
  htmlEncode: false,
  noWrap: false,
  validateOnChange: false,
  initEvents: Ext.emptyFn,
  submitValue: false,
  getValue: function() {
    return this.value
  },
  valueToRaw: function(a) {
    if (a || a === 0 || a === false) {
      return a
    } else {
      return ""
    }
  },
  isDirty: function() {
    return false
  },
  isValid: Ext.returnTrue,
  validate: Ext.returnTrue,
  getRawValue: function() {
    return this.rawValue
  },
  setRawValue: function(b) {
    var a = this;
    b = Ext.valueFrom(b, "");
    a.rawValue = b;
    if (a.rendered) {
      a.inputEl.dom.innerHTML = a.getDisplayValue();
      a.updateLayout()
    }
    return b
  },
  getDisplayValue: function() {
    var a = this,
      b = this.getRawValue(),
      c;
    if (a.renderer) {
      c = a.renderer.call(a.scope || a, b, a)
    } else {
      c = a.htmlEncode ? Ext.util.Format.htmlEncode(b) : b
    }
    return c
  },
  getSubTplData: function(b) {
    var a = Ext.form.field.Base.prototype.getSubTplData.apply(this,
      arguments);
    a.value = this.getDisplayValue();
    return a
  }
}, 0, ["displayfield"], ["component", "box", "field", "displayfield"], {
  component: true,
  box: true,
  field: true,
  displayfield: true
}, ["widget.displayfield"], 0, [Ext.form.field, "Display", Ext.form,
  "DisplayField", Ext.form, "Display"
], 0));
(Ext.cmd.derive("Ext.tip.Tip", Ext.panel.Panel, {
  alternateClassName: "Ext.Tip",
  minWidth: 40,
  maxWidth: 500,
  shadow: "sides",
  defaultAlign: "tl-bl?",
  constrainPosition: true,
  autoRender: true,
  hidden: true,
  baseCls: "x-tip",
  focusOnToFront: false,
  maskOnDisable: false,
  closeAction: "hide",
  alwaysFramed: true,
  frameHeader: false,
  initComponent: function() {
    var a = this;
    a.floating = Ext.apply({}, {
      shadow: a.shadow,
      constrain: a.constrainPosition
    }, a.self.prototype.floating);
    Ext.panel.Panel.prototype.initComponent.apply(this, arguments);
    a.constrain = a.constrain || a.constrainPosition
  },
  showAt: function(b) {
    var a = this;
    Ext.panel.Panel.prototype.showAt.apply(this, arguments);
    if (a.isVisible()) {
      a.setPagePosition(b[0], b[1]);
      if (a.constrainPosition || a.constrain) {
        a.doConstrain()
      }
      a.toFront(true)
    }
  },
  privates: {
    initDraggable: function() {
      var a = this;
      a.draggable = {
        el: a.getDragEl(),
        delegate: a.header.el,
        constrain: a,
        constrainTo: a.el.dom.parentNode
      };
      Ext.Component.prototype.initDraggable.call(a)
    }
  },
  ghost: undefined,
  unghost: undefined
}, 0, ["tip"], ["component", "box", "container", "panel", "tip"], {
  component: true,
  box: true,
  container: true,
  panel: true,
  tip: true
}, ["widget.tip"], 0, [Ext.tip, "Tip", Ext, "Tip"], 0));
(Ext.cmd.derive("Ext.tip.ToolTip", Ext.tip.Tip, {
  alternateClassName: "Ext.ToolTip",
  autoHide: true,
  showDelay: 500,
  hideDelay: 200,
  dismissDelay: 5000,
  trackMouse: false,
  anchorToTarget: true,
  anchorOffset: 0,
  targetCounter: 0,
  quickShowInterval: 250,
  hideAction: "hide",
  fadeOutDuration: 1000,
  ariaRole: "tooltip",
  initComponent: function() {
    var a = this;
    Ext.tip.Tip.prototype.initComponent.apply(this, arguments);
    a.lastActive = new Date();
    a.setTarget(a.target);
    a.origAnchor = a.anchor
  },
  onRender: function(b, a) {
    var c = this;
    Ext.tip.Tip.prototype.onRender.apply(this, arguments);
    c.anchorCls = "x-tip-anchor-" + c.getAnchorPosition();
    c.anchorEl = c.el.createChild({
      role: "presentation",
      cls: "x-tip-anchor " + c.anchorCls
    })
  },
  setTarget: function(d) {
    var b = this,
      a = Ext.get(d),
      c;
    if (b.target) {
      c = Ext.get(b.target);
      if (Ext.supports.Touch) {
        b.mun(c, "tap", b.onTargetOver, b)
      } else {
        b.mun(c, {
          mouseover: b.onTargetOver,
          mouseout: b.onTargetOut,
          mousemove: b.onMouseMove,
          scope: b
        })
      }
    }
    b.target = a;
    if (a) {
      if (Ext.supports.Touch) {
        b.mon(a, {
          tap: b.onTargetOver,
          scope: b
        })
      } else {
        b.mon(a, {
          mouseover: b.onTargetOver,
          mouseout: b.onTargetOut,
          mousemove: b.onMouseMove,
          scope: b
        })
      }
    }
    if (b.anchor) {
      b.anchorTarget = b.target
    }
  },
  onMouseMove: function(d) {
    var b = this,
      a, c;
    if (!b.target || b.target.contains(d.target)) {
      a = b.delegate ? d.getTarget(b.delegate) : (b.triggerElement = true);
      if (a) {
        b.targetXY = d.getXY();
        if (a === b.triggerElement) {
          if (!b.hidden && b.trackMouse) {
            c = b.getTargetXY();
            if (b.constrainPosition) {
              c = b.el.adjustForConstraints(c, b.el.parent())
            }
            b.setPagePosition(c)
          }
        } else {
          b.hide();
          b.lastActive = new Date(0);
          b.onTargetOver(d)
        }
      } else {
        if ((!b.closable && b.isVisible()) && b.autoHide !== false) {
          b.delayHide()
        }
      }
    }
  },
  getTargetXY: function() {
    var i = this,
      d, c, m, a, h, k, e, l, j, b, g, f;
    if (i.delegate) {
      i.anchorTarget = i.triggerElement
    }
    if (i.anchor) {
      i.targetCounter++;
      c = i.getOffsets();
      m = (i.anchorToTarget && !i.trackMouse) ? i.getAlignToXY(i.anchorTarget,
        i.getAnchorAlign()) : i.targetXY;
      a = Ext.Element.getViewportWidth() - 5;
      h = Ext.Element.getViewportHeight() - 5;
      k = document.documentElement;
      e = document.body;
      l = (k.scrollLeft || e.scrollLeft || 0) + 5;
      j = (k.scrollTop || e.scrollTop || 0) + 5;
      b = [m[0] + c[0], m[1] + c[1]];
      g = i.getSize();
      f = i.constrainPosition;
      i.anchorEl.removeCls(i.anchorCls);
      if (i.targetCounter < 2 && f) {
        if (b[0] < l) {
          if (i.anchorToTarget) {
            i.defaultAlign = "l-r";
            if (i.mouseOffset) {
              i.mouseOffset[0] *= -1
            }
          }
          i.anchor = "left";
          return i.getTargetXY()
        }
        if (b[0] + g.width > a) {
          if (i.anchorToTarget) {
            i.defaultAlign = "r-l";
            if (i.mouseOffset) {
              i.mouseOffset[0] *= -1
            }
          }
          i.anchor = "right";
          return i.getTargetXY()
        }
        if (b[1] < j) {
          if (i.anchorToTarget) {
            i.defaultAlign = "t-b";
            if (i.mouseOffset) {
              i.mouseOffset[1] *= -1
            }
          }
          i.anchor = "top";
          return i.getTargetXY()
        }
        if (b[1] + g.height > h) {
          if (i.anchorToTarget) {
            i.defaultAlign = "b-t";
            if (i.mouseOffset) {
              i.mouseOffset[1] *= -1
            }
          }
          i.anchor = "bottom";
          return i.getTargetXY()
        }
      }
      i.anchorCls = "x-tip-anchor-" + i.getAnchorPosition();
      i.anchorEl.addCls(i.anchorCls);
      i.targetCounter = 0;
      return b
    } else {
      d = i.getMouseOffset();
      return (i.targetXY) ? [i.targetXY[0] + d[0], i.targetXY[1] + d[1]] :
        d
    }
  },
  calculateConstrainedPosition: function(b) {
    var c = this,
      e, a, d;
    if (!b && c.isContainedFloater()) {
      e = c.isVisible();
      if (!e) {
        c.el.show()
      }
      a = c.getTargetXY();
      if (!e) {
        c.el.hide()
      }
      d = c.floatParent.getTargetEl().getViewRegion();
      a[0] -= d.left;
      a[1] -= d.top
    } else {
      a = c.callOverridden(arguments)
    }
    return a
  },
  getMouseOffset: function() {
    var a = this,
      b = a.anchor ? [0, 0] : [15, 18];
    if (a.mouseOffset) {
      b[0] += a.mouseOffset[0];
      b[1] += a.mouseOffset[1]
    }
    return b
  },
  fadeOut: function() {
    var a = this;
    a.el.fadeOut({
      duration: a.fadeOutDuration,
      callback: function() {
        a.hide();
        a.el.setOpacity("")
      }
    })
  },
  getAnchorPosition: function() {
    var b = this,
      a;
    if (b.anchor) {
      b.tipAnchor = b.anchor.charAt(0)
    } else {
      a = b.defaultAlign.match(/^([a-z]+)-([a-z]+)(\?)?$/);
      b.tipAnchor = a[1].charAt(0)
    }
    switch (b.tipAnchor) {
      case "t":
        return "top";
      case "b":
        return "bottom";
      case "r":
        return "right"
    }
    return "left"
  },
  getAnchorAlign: function() {
    switch (this.anchor) {
      case "top":
        return "tl-bl";
      case "left":
        return "tl-tr";
      case "right":
        return "tr-tl";
      default:
        return "bl-tl"
    }
  },
  getOffsets: function() {
    var c = this,
      d, b, a = c.getAnchorPosition().charAt(0);
    if (c.anchorToTarget && !c.trackMouse) {
      switch (a) {
        case "t":
          b = [0, 9];
          break;
        case "b":
          b = [0, -13];
          break;
        case "r":
          b = [-13, 0];
          break;
        default:
          b = [9, 0];
          break
      }
    } else {
      switch (a) {
        case "t":
          b = [-15 - c.anchorOffset, 30];
          break;
        case "b":
          b = [-19 - c.anchorOffset, -13 - c.el.dom.offsetHeight];
          break;
        case "r":
          b = [-15 - c.el.dom.offsetWidth, -13 - c.anchorOffset];
          break;
        default:
          b = [25, -13 - c.anchorOffset];
          break
      }
    }
    d = c.getMouseOffset();
    b[0] += d[0];
    b[1] += d[1];
    return b
  },
  onTargetOver: function(d) {
    var c = this,
      b = c.delegate,
      a;
    if (c.disabled || d.within(c.target.dom, true)) {
      return
    }
    a = b ? d.getTarget(b) : true;
    if (a) {
      c.triggerElement = a;
      c.triggerEvent = d;
      c.clearTimer("hide");
      c.targetXY = d.getXY();
      c.delayShow()
    }
  },
  delayShow: function(c) {
    var a = this,
      b = a.el && (c === false || !a.trackMouse) && a.getTargetXY();
    if (a.hidden && !a.showTimer) {
      if (Ext.Date.getElapsed(a.lastActive) < a.quickShowInterval) {
        a.show()
      } else {
        a.showTimer = Ext.defer(a.showFromDelay, a.showDelay, a, [b])
      }
    } else {
      if (!a.hidden && a.autoHide !== false) {
        a.show(b)
      }
    }
  },
  showFromDelay: function(b) {
    var a = this;
    if (a.disabled) {
      return
    }
    a.fromDelayShow = true;
    a.show(b);
    delete a.fromDelayShow
  },
  onShowVeto: function() {
    Ext.tip.Tip.prototype.onShowVeto.call(this);
    delete this.triggerElement;
    this.clearTimer("show")
  },
  onTargetOut: function(d) {
    var b = this,
      a = b.triggerElement,
      c = a === true ? b.target : a;
    if (b.disabled || !a || d.within(c, true)) {
      return
    }
    if (b.showTimer) {
      b.clearTimer("show");
      b.triggerElement = null
    }
    if (b.autoHide !== false) {
      b.delayHide()
    }
  },
  delayHide: function() {
    var a = this;
    if (!a.hidden && !a.hideTimer) {
      a.hideTimer = Ext.defer(a[a.hideAction], a.hideDelay, a)
    }
  },
  hide: function() {
    var a = this;
    a.clearTimer("dismiss");
    a.lastActive = new Date();
    if (a.anchorEl) {
      a.anchorEl.hide()
    }
    Ext.tip.Tip.prototype.hide.apply(this, arguments);
    delete a.triggerElement
  },
  show: function(b) {
    var a = this;
    Ext.tip.Tip.prototype.show.call(this);
    if (this.hidden === false) {
      if (a.anchor) {
        a.anchor = a.origAnchor
      }
      if (!a.calledFromShowAt) {
        a.showAt(b || a.getTargetXY())
      }
    }
  },
  showAt: function(b) {
    var a = this;
    a.lastActive = new Date();
    a.clearTimers();
    a.calledFromShowAt = true;
    if (!a.isVisible()) {
      Ext.tip.Tip.prototype.showAt.apply(this, arguments)
    }
    if (a.isVisible()) {
      a.setPagePosition(b[0], b[1]);
      if (a.constrainPosition || a.constrain) {
        a.doConstrain()
      }
      a.toFront(true);
      a.el.syncUnderlays();
      if (a.dismissDelay && a.autoHide !== false) {
        a.dismissTimer = Ext.defer(a.hide, a.dismissDelay, a)
      }
    }
    delete a.calledFromShowAt
  },
  syncAnchor: function() {
    var c = this,
      a, b, d;
    switch (c.tipAnchor.charAt(0)) {
      case "t":
        a = "b";
        b = "tl";
        d = [20 + c.anchorOffset, 1];
        break;
      case "r":
        a = "l";
        b = "tr";
        d = [-1, 12 + c.anchorOffset];
        break;
      case "b":
        a = "t";
        b = "bl";
        d = [20 + c.anchorOffset, -1];
        break;
      default:
        a = "r";
        b = "tl";
        d = [1, 12 + c.anchorOffset];
        break
    }
    c.anchorEl.alignTo(c.el, a + "-" + b, d);
    c.anchorEl.setStyle("z-index", parseInt(c.el.getZIndex(), 10) || 0 +
      1).setVisibilityMode(Ext.Element.DISPLAY)
  },
  afterSetPosition: function(a, c) {
    var b = this;
    Ext.tip.Tip.prototype.afterSetPosition.apply(this, arguments);
    if (b.anchor) {
      b.syncAnchor();
      if (!b.anchorEl.isVisible()) {
        b.anchorEl.show()
      }
    } else {
      b.anchorEl.hide()
    }
  },
  _timerNames: {},
  clearTimer: function(a) {
    var b = this,
      d = b._timerNames,
      c = d[a] || (d[a] = a + "Timer"),
      e = b[c];
    if (e) {
      clearTimeout(e);
      b[c] = null
    }
  },
  clearTimers: function() {
    var a = this;
    a.clearTimer("show");
    a.clearTimer("dismiss");
    a.clearTimer("hide")
  },
  onShow: function() {
    var a = this;
    Ext.tip.Tip.prototype.onShow.call(this);
    a.mon(Ext.getDoc(), "mousedown", a.onDocMouseDown, a)
  },
  onHide: function() {
    var a = this;
    Ext.tip.Tip.prototype.onHide.call(this);
    a.mun(Ext.getDoc(), "mousedown", a.onDocMouseDown, a)
  },
  onDocMouseDown: function(b) {
    var a = this;
    if (!a.closable && !b.within(a.el.dom)) {
      a.disable();
      Ext.defer(a.doEnable, 100, a)
    }
  },
  doEnable: function() {
    if (!this.destroyed) {
      this.enable()
    }
  },
  onDisable: function() {
    Ext.tip.Tip.prototype.onDisable.call(this);
    this.clearTimers();
    this.hide()
  },
  beforeDestroy: function() {
    var a = this;
    a.clearTimers();
    Ext.destroy(a.anchorEl);
    delete a.anchorEl;
    delete a.target;
    delete a.anchorTarget;
    delete a.triggerElement;
    Ext.tip.Tip.prototype.beforeDestroy.call(this)
  },
  onDestroy: function() {
    Ext.getDoc().un("mousedown", this.onDocMouseDown, this);
    Ext.tip.Tip.prototype.onDestroy.call(this)
  }
}, 0, ["tooltip"], ["component", "box", "container", "panel", "tip",
  "tooltip"
], {
  component: true,
  box: true,
  container: true,
  panel: true,
  tip: true,
  tooltip: true
}, ["widget.tooltip"], 0, [Ext.tip, "ToolTip", Ext, "ToolTip"], 0));
(Ext.cmd.derive("Ext.tip.QuickTip", Ext.tip.ToolTip, {
  alternateClassName: "Ext.QuickTip",
  interceptTitles: false,
  title: "&#160;",
  tagConfig: {
    namespace: "data-",
    attribute: "qtip",
    width: "qwidth",
    target: "target",
    title: "qtitle",
    hide: "hide",
    cls: "qclass",
    align: "qalign",
    anchor: "anchor",
    showDelay: "qshowDelay",
    hideAction: "hideAction",
    anchorTarget: "anchorTarget"
  },
  isQuickTip: true,
  shrinkWrapDock: true,
  initComponent: function() {
    var a = this;
    a.target = a.target || Ext.getDoc();
    a.targets = a.targets || {};
    Ext.tip.ToolTip.prototype.initComponent.call(this)
  },
  setTagConfig: function(a) {
    this.tagConfig = Ext.apply({}, a);
    delete this.tagConfig.attr
  },
  text: null,
  register: function(c) {
    var g = Ext.isArray(c) ? c : arguments,
      d = 0,
      a = g.length,
      f, b, e;
    for (; d < a; d++) {
      c = g[d];
      f = c.target;
      if (f) {
        if (Ext.isArray(f)) {
          for (b = 0, e = f.length; b < e; b++) {
            this.targets[Ext.id(f[b])] = c
          }
        } else {
          this.targets[Ext.id(f)] = c
        }
      }
    }
  },
  unregister: function(a) {
    delete this.targets[Ext.id(a)]
  },
  cancelShow: function(a) {
    var b = this,
      c = b.activeTarget;
    a = Ext.get(a).dom;
    if (b.isVisible()) {
      if (c && c.el === a) {
        b.hide()
      }
    } else {
      if (c && c.el === a) {
        b.clearTimer("show")
      }
    }
  },
  getTipCfg: function(e, d) {
    var c = e.title,
      b = this.tagConfig,
      a = b.attr || (b.attr = b.namespace + b.attribute),
      f;
    if (this.interceptTitles && c && Ext.isString(c)) {
      e.setAttribute(a, c);
      e.removeAttribute("title");
      return {
        text: c
      }
    } else {
      e = Ext.fly(e).findParent(function(g) {
        return (f = g.getAttribute(a))
      });
      if (e) {
        return {
          target: e,
          text: f
        }
      }
    }
  },
  onTargetOver: function(a) {
    this.doTargetOver(a.getTarget(this.delegate), null, a)
  },
  doTargetOver: function(i, p, b) {
    var j = this,
      a, e, f, c, h, k, d, m, g, o, l, n;
    if (j.disabled) {
      return
    }
    if (typeof i === "string") {
      i = Ext.getDom(i)
    }
    j.targetXY = p || (b ? b.getXY() : Ext.fly(i).getXY());
    if (!i || i.nodeType !== 1 || i === document.documentElement || i ===
      document.body) {
      return
    }
    if (j.activeTarget && ((i === j.activeTarget.el) || Ext.fly(j.activeTarget
        .el).contains(i))) {
      if (j.targetTextEmpty()) {
        j.onShowVeto();
        delete j.activeTarget
      } else {
        j.clearTimer("hide");
        j.show()
      }
      return
    }
    if (i) {
      g = j.targets;
      for (n in g) {
        if (g.hasOwnProperty(n)) {
          l = g[n];
          o = Ext.fly(l.target);
          if (o && (o.dom === i || o.contains(i))) {
            c = o.dom;
            break
          }
        }
      }
      if (c) {
        j.activeTarget = j.targets[c.id];
        j.activeTarget.el = i;
        j.anchor = j.activeTarget.anchor;
        if (j.anchor) {
          j.anchorTarget = i
        }
        a = parseInt(j.activeTarget.showDelay, 10);
        if (a) {
          f = j.showDelay;
          j.showDelay = a
        }
        j.delayShow();
        if (a) {
          j.showDelay = f
        }
        if (!(e = j.activeTarget.hideAction)) {
          delete j.hideAction
        } else {
          j.hideAction = e
        }
        return
      }
    }
    c = Ext.fly(i, "_quicktip-target");
    h = j.tagConfig;
    k = h.namespace;
    d = j.getTipCfg(i, b);
    if (d) {
      if (d.target) {
        i = d.target;
        c = Ext.fly(i, "_quicktip-target")
      }
      m = c.getAttribute(k + h.hide);
      j.activeTarget = {
        el: i,
        text: d.text,
        width: +c.getAttribute(k + h.width) || null,
        autoHide: m !== "user" && m !== "false",
        title: c.getAttribute(k + h.title),
        cls: c.getAttribute(k + h.cls),
        align: c.getAttribute(k + h.align),
        showDelay: parseInt(c.getAttribute(k + h.showDelay) || 0, 10),
        hideAction: c.getAttribute(k + h.hideAction),
        anchorTarget: c.getAttribute(k + h.anchorTarget)
      };
      if (!j.initialConfig.hasOwnProperty("anchor")) {
        j.anchor = c.getAttribute(k + h.anchor)
      }
      if (j.anchor && !j.initialConfig.hasOwnProperty("anchorTarget")) {
        j.anchorTarget = j.activeTarget.anchorTarget || i
      }
      a = parseInt(j.activeTarget.showDelay, 10);
      if (a) {
        f = j.showDelay;
        j.showDelay = a
      }
      j.delayShow();
      if (a) {
        j.showDelay = f
      }
    }
  },
  onTargetOut: function(f) {
    var c = this,
      d = c.activeTarget,
      a, b;
    if (d && f.within(c.activeTarget.el) && !c.getTipCfg(f.getTarget(), f)) {
      return
    }
    c.clearTimer("show");
    delete c.activeTarget;
    if (c.autoHide !== false) {
      a = d && parseInt(d.hideDelay, 10);
      if (a) {
        b = c.hideDelay;
        c.hideDelay = a
      }
      c.delayHide();
      if (a) {
        c.hideDelay = b
      }
    }
  },
  targetTextEmpty: function() {
    var c = this,
      d = c.activeTarget,
      a = c.tagConfig,
      b, e;
    if (d) {
      b = d.el;
      if (b) {
        e = b.getAttribute(a.namespace + a.attribute);
        if (!e && !c.targets[Ext.id(d.target)]) {
          return true
        }
      }
    }
    return false
  },
  show: function() {
    var b = this,
      a = b.fromDelayShow;
    if (a && b.targetTextEmpty()) {
      b.onShowVeto();
      delete b.activeTarget;
      return
    }
    Ext.tip.ToolTip.prototype.show.apply(this, arguments)
  },
  showAt: function(e) {
    var c = this,
      d = c.activeTarget,
      f = c.header,
      b, a;
    if (d) {
      if (!c.rendered) {
        c.render(Ext.getBody());
        c.activeTarget = d
      }
      c.suspendLayouts();
      if (d.title) {
        c.setTitle(d.title);
        f.show()
      } else {
        if (f) {
          f.hide()
        }
      }
      c.update(d.text);
      c.autoHide = d.autoHide;
      b = d.dismissDelay;
      c.dismissDelay = Ext.isNumber(b) ? b : c.dismissDelay;
      if (d.mouseOffset) {
        e[0] += d.mouseOffset[0];
        e[1] += d.mouseOffset[1]
      }
      a = c.lastCls;
      if (a) {
        c.removeCls(a);
        delete c.lastCls
      }
      a = d.cls;
      if (a) {
        c.addCls(a);
        c.lastCls = a
      }
      c.setWidth(d.width);
      if (c.anchor) {
        c.constrainPosition = false
      } else {
        if (d.align) {
          e = c.getAlignToXY(d.el, d.align);
          c.constrainPosition = false
        } else {
          c.constrainPosition = true
        }
      }
      c.resumeLayouts(true)
    }
    Ext.tip.ToolTip.prototype.showAt.call(this, e)
  },
  showByTarget: function(f) {
    var c = this,
      e, b, d, a, g;
    e = c.targets[f.id];
    if (e) {
      c.activeTarget = e;
      c.activeTarget.el = Ext.get(f).dom;
      c.anchor = c.activeTarget.anchor;
      b = f.getSize();
      d = f.getXY();
      c.showAt([d[0], d[1] + b.height])
    }
  },
  hide: function() {
    delete this.activeTarget;
    Ext.tip.ToolTip.prototype.hide.call(this)
  }
}, 0, ["quicktip"], ["component", "box", "container", "panel", "tip",
  "tooltip", "quicktip"
], {
  component: true,
  box: true,
  container: true,
  panel: true,
  tip: true,
  tooltip: true,
  quicktip: true
}, ["widget.quicktip"], 0, [Ext.tip, "QuickTip", Ext, "QuickTip"], 0));
(Ext.cmd.derive("Ext.tip.QuickTipManager", Ext.Base, {
  singleton: true,
  alternateClassName: "Ext.QuickTips",
  disabled: false,
  init: function(e, b) {
    var d = this;
    if (!d.tip) {
      if (!Ext.isReady) {
        Ext.onInternalReady(function() {
          Ext.tip.QuickTipManager.init(e, b)
        });
        return false
      }
      var a = Ext.apply({
          disabled: d.disabled,
          id: "ext-quicktips-tip"
        }, b),
        c = a.className,
        f = a.xtype;
      if (c) {
        delete a.className
      } else {
        if (f) {
          c = "widget." + f;
          delete a.xtype
        }
      }
      if (e !== false) {
        a.renderTo = document.body
      }
      d.tip = Ext.create(c || "Ext.tip.QuickTip", a);
      Ext.quickTipsActive = true
    }
  },
  destroy: function() {
    Ext.destroy(this.tip);
    this.tip = undefined
  },
  ddDisable: function() {
    var a = this,
      b = a.tip;
    if (b && !a.disabled) {
      b.disable()
    }
  },
  ddEnable: function() {
    var a = this,
      b = a.tip;
    if (b && !a.disabled) {
      b.enable()
    }
  },
  enable: function() {
    var a = this,
      b = a.tip;
    if (b) {
      b.enable()
    }
    a.disabled = false
  },
  disable: function() {
    var a = this,
      b = a.tip;
    if (b) {
      b.disable()
    }
    a.disabled = true
  },
  isEnabled: function() {
    var a = this.tip;
    return a !== undefined && !a.disabled
  },
  getQuickTip: function() {
    return this.tip
  },
  register: function() {
    var a = this.tip;
    a.register.apply(a, arguments)
  },
  unregister: function() {
    var a = this.tip;
    a.unregister.apply(a, arguments)
  },
  tips: function() {
    var a = this.tip;
    a.register.apply(a, arguments)
  }
}, 0, 0, 0, 0, 0, 0, [Ext.tip, "QuickTipManager", Ext, "QuickTips"], 0));
(Ext.cmd.derive("Ext.toolbar.Separator", Ext.toolbar.Item, {
  alternateClassName: "Ext.Toolbar.Separator",
  baseCls: "x-toolbar-separator",
  ariaRole: "separator"
}, 0, ["tbseparator"], ["component", "box", "tbitem", "tbseparator"], {
  component: true,
  box: true,
  tbitem: true,
  tbseparator: true
}, ["widget.tbseparator"], 0, [Ext.toolbar, "Separator", Ext.Toolbar,
  "Separator"
], 0));
(Ext.cmd.derive("Ext.layout.container.boxOverflow.Menu", Ext.layout.container.boxOverflow
  .None, {
    alternateClassName: "Ext.layout.boxOverflow.Menu",
    noItemsMenuText: '<div class="x-toolbar-no-items" role="menuitem">(None)</div>',
    menuCls: "x-box-menu",
    constructor: function(a) {
      var b = this;
      Ext.layout.container.boxOverflow.None.prototype.constructor.call(this,
        a);
      b.menuItems = []
    },
    beginLayout: function(a) {
      Ext.layout.container.boxOverflow.None.prototype.beginLayout.call(this,
        a);
      this.clearOverflow(a)
    },
    beginLayoutCycle: function(b, a) {
      Ext.layout.container.boxOverflow.None.prototype.beginLayoutCycle.call(
        this, b, a);
      if (!a) {
        this.clearOverflow(b);
        this.layout.cacheChildItems(b)
      }
    },
    onRemove: function(a) {
      Ext.Array.remove(this.menuItems, a)
    },
    clearItem: function(a) {
      var b = a.menu;
      if (a.isButton && b) {
        a.setMenu(b, false)
      }
    },
    getSuffixConfig: function() {
      var d = this,
        c = d.layout,
        a = c.owner,
        b = a.id;
      d.menu = new Ext.menu.Menu({
        listeners: {
          scope: d,
          beforeshow: d.beforeMenuShow
        }
      });
      d.menuTrigger = new Ext.button.Button({
        id: b + "-menu-trigger",
        cls: d.menuCls + "-after x-toolbar-item",
        plain: a.usePlainButtons,
        ownerCt: a,
        ownerLayout: c,
        iconCls: "x-" + d.getOwnerType(a) + "-more-icon",
        ui: a.defaultButtonUI || "default",
        menu: d.menu,
        showEmptyMenu: true,
        getSplitCls: function() {
          return ""
        }
      });
      return d.menuTrigger.getRenderTree()
    },
    getOverflowCls: function(a) {
      return this.menuCls + "-body-" + a
    },
    handleOverflow: function(c) {
      var b = this,
        a = b.layout;
      b.showTrigger(c);
      if (a.direction !== "vertical") {
        b.menuTrigger.setLocalY((c.state.boxPlan.maxSize - b.menuTrigger[a.names
          .getHeight]()) / 2)
      }
      return {
        reservedSpace: b.triggerTotalWidth
      }
    },
    captureChildElements: function() {
      var a = this,
        c = a.menuTrigger,
        b = a.layout.names;
      if (c.rendering) {
        c.finishRender();
        a.triggerTotalWidth = c[b.getWidth]() + c.el.getMargin(b.parallelMargins)
      }
    },
    clearOverflow: function(g) {
      var f = this,
        b = f.menuItems,
        e = b.length,
        a = f.layout.owner,
        h = a._asLayoutRoot,
        d, c;
      a.suspendLayouts();
      f.captureChildElements();
      f.hideTrigger();
      a.resumeLayouts();
      for (c = 0; c < e; c++) {
        d = b[c];
        d.suspendLayouts();
        d.show();
        f.clearItem(d);
        d.resumeLayouts(h)
      }
      b.length = 0
    },
    showTrigger: function(d) {
      var o = this,
        k = o.layout,
        b = k.owner,
        n = k.names,
        r = n.x,
        f = n.width,
        p = d.state.boxPlan,
        c = p.targetSize[f],
        h = d.childItems,
        g = o.menuTrigger,
        a = o.menuItems,
        q, j, e, m, l;
      g.suspendLayouts();
      g.show();
      g.resumeLayouts(o._asLayoutRoot);
      c -= o.triggerTotalWidth;
      b.suspendLayouts();
      for (e = 0, l = a.length; e < l; ++e) {
        o.clearItem(a[e])
      }
      a.length = 0;
      for (e = 0, l = h.length; e < l; e++) {
        q = h[e];
        m = q.props;
        if (m[r] + m[f] > c) {
          j = q.target;
          o.menuItems.push(j);
          j.hide()
        }
      }
      b.resumeLayouts()
    },
    hideTrigger: function() {
      var a = this.menuTrigger;
      if (a) {
        a.hide()
      }
    },
    beforeMenuShow: function(h) {
      var g = this,
        b = g.menuItems,
        d = 0,
        a = b.length,
        f, e, c = function(j, i) {
          return j.isXType("buttongroup") && !(i instanceof Ext.toolbar.Separator)
        };
      h.suspendLayouts();
      h.removeAll(false);
      for (; d < a; d++) {
        f = b[d];
        if (!d && (f instanceof Ext.toolbar.Separator)) {
          continue
        }
        if (e && (c(f, e) || c(e, f))) {
          h.add("-")
        }
        g.addComponentToMenu(h, f);
        e = f
      }
      if (h.items.length < 1) {
        h.add(g.noItemsMenuText)
      }
      h.resumeLayouts()
    },
    createMenuConfig: function(c, a) {
      var b = Ext.apply({}, c.initialConfig),
        d = c.toggleGroup;
      Ext.copyTo(b, c, ["iconCls", "icon", "itemId", "disabled", "handler",
        "scope", "menu", "tabIndex"
      ]);
      Ext.applyIf(b, {
        text: c.overflowText || c.text,
        hideOnClick: a,
        destroyMenu: false,
        listeners: null
      });
      b.masterComponent = c;
      if (c.isFormField) {
        b.value = c.getValue();
        b.listeners = {
          change: function(g, f, e) {
            g.masterComponent.setValue(f)
          }
        };
        c.on("change", function(g, f, e) {
          g.overflowClone.setValue(f)
        })
      } else {
        if (d || c.enableToggle) {
          Ext.apply(b, {
            hideOnClick: false,
            group: d,
            checked: c.pressed,
            handler: function(f, g) {
              f.masterComponent.onClick(g)
            }
          })
        }
      }
      if (c.isButton && !c.changeListenersAdded) {
        c.on({
          textchange: this.onButtonAttrChange,
          iconchange: this.onButtonAttrChange,
          toggle: this.onButtonToggle
        });
        c.changeListenersAdded = true
      }
      delete b.margin;
      delete b.ownerCt;
      delete b.xtype;
      delete b.id;
      delete b.itemId;
      return b
    },
    onButtonAttrChange: function(a) {
      var b = a.overflowClone;
      b.suspendLayouts();
      b.setText(a.text);
      b.setIcon(a.icon);
      b.setIconCls(a.iconCls);
      b.resumeLayouts(true)
    },
    onButtonToggle: function(a, b) {
      if (a.overflowClone.checked !== b) {
        a.overflowClone.setChecked(b)
      }
    },
    addComponentToMenu: function(f, c) {
      var e = this,
        d, b, a;
      if (c instanceof Ext.toolbar.Fill) {
        return
      } else {
        if (c instanceof Ext.toolbar.Separator) {
          f.add("-")
        } else {
          if (c.overflowClone) {
            f.add(c.overflowClone)
          } else {
            if (c.isComponent) {
              if (c.isXType("splitbutton")) {
                c.overflowClone = f.add(e.createMenuConfig(c, true))
              } else {
                if (c.isXType("button")) {
                  c.overflowClone = f.add(e.createMenuConfig(c, !c.menu))
                } else {
                  if (c.isXType("buttongroup")) {
                    b = c.items.items;
                    a = b.length;
                    for (d = 0; d < a; d++) {
                      e.addComponentToMenu(f, b[d])
                    }
                  } else {
                    c.overflowClone = f.add(Ext.create(Ext.getClassName(c),
                      e.createMenuConfig(c)))
                  }
                }
              }
            }
          }
        }
      }
    },
    destroy: function() {
      var b = this,
        a = b.menuTrigger;
      if (a && !b.layout.owner.items.contains(a)) {
        delete a.ownerCt
      }
      b.menu = b.menuTrigger = Ext.destroy(b.menu, a);
      b.callParent()
    }
  }, 1, 0, 0, 0, ["box.overflow.Menu", "box.overflow.menu"], 0, [Ext.layout.container
    .boxOverflow, "Menu", Ext.layout.boxOverflow, "Menu"
  ], 0));