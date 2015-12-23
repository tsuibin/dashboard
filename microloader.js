var Ext = Ext || {};
Ext.manifest = Ext.manifest || "app.json";
Ext = Ext || {};
Ext.Boot = Ext.Boot || function (j)
{
    function l(a)
    {
        if (a.$isRequest) return a;
        a = a.url ? a : {
            url: a
        };
        var b = a.url; s(a, {
            urls: b.charAt ? [b] : b, charset: a.charset || f.config.charset
        });
        s(this, a)
    }
    function u(a) {
        if (a.$isEntry) return a; var b = a.charset || f.config.charset, c = Ext.manifest, c = c && c.loader, d = void 0 !== a.cache ? a.cache : c && c.cache, e;
        f.config.disableCaching && (void 0 === d && (d = !f.config.disableCaching), !1 === d ? e = +new Date : !0 !== d && (e = d), e && (c = c && c.cacheParam || f.config.disableCachingParam, e = c + "\x3d" + e));
        s(a,
            {
                charset: b, buster: e,
                requests: []
            });
        s(this, a)
    }
    var k = document, q = [], p =
        {
            disableCaching: /[?&](?:cache|disableCacheBuster)\b/i.test(location.search) || !/http[s]?\:/i.test(location.href) || /(^|[ ;])ext-cache=1/.test(k.cookie) ? !1 : !0, disableCachingParam: "_dc", loadDelay: !1, preserveScripts: !0, charset: void 0
        },
        x = /\.css(?:\?|$)/i,
        n = k.createElement("a"),
        t = "undefined" !== typeof window, w = {
            browser: t, node: !t && "function" === typeof require,
            phantom: window && (window._phantom || window.callPhantom) || /PhantomJS/.test(window.navigator.userAgent)
        }, r =
    Ext.platformTags = {}, s = function (a, b, c) {
        c && s(a, c); if (a && b && "object" === typeof b) for (var d in b) a[d] = b[d];
        return a
    }, f = {
        loading: 0,
        loaded: 0,
        apply: s,
        env: w,
        config: p,
        scripts: {},
        currentFile: null,
        suspendedQueue: [],
        currentRequest: null,
        syncMode: !1,
        useElements: !0,
        listeners: [],
        Request: l,
        Entry: u,
        detectPlatformTags: function () {
            var a = navigator.userAgent, b = r.isMobile = /Mobile(\/|\s)/.test(a), c, d, e, h; c = document.createElement("div"); d = "iPhone;iPod;Android;Silk;Android 2;BlackBerry;BB;iPad;RIM Tablet OS;MSIE 10;Trident;Chrome;Tizen;Firefox;Safari;Windows Phone".split(";");
            var g = {};
            e = d.length;
            var m;
            for (m = 0; m < e; m++)
                h = d[m], g[h] = RegExp(h).test(a);
            b = g.iPhone || g.iPod || !g.Silk && g.Android && (g["Android 2"] || b) || (g.BlackBerry || g.BB) && g.isMobile || g["Windows Phone"]; a = !r.isPhone && (g.iPad || g.Android || g.Silk || g["RIM Tablet OS"] || g["MSIE 10"] && /; Touch/.test(a)); d = "ontouchend" in c; !d && (c.setAttribute && c.removeAttribute) && (c.setAttribute("ontouchend", ""), d = "function" === typeof c.ontouchend, "undefined" !== typeof c.ontouchend && (c.ontouchend = void 0), c.removeAttribute("ontouchend")); d =
            d || navigator.maxTouchPoints || navigator.msMaxTouchPoints;
            c = !b && !a; e = g["MSIE 10"];
            h = g.Blackberry || g.BB; s(r, f.loadPlatformsParam(),
                {
                    phone: b, tablet: a, desktop: c, touch: d, ios: g.iPad || g.iPhone || g.iPod, android: g.Android || g.Silk, blackberry: h, safari: g.Safari && !h, chrome: g.Chrome, ie10: e, windows: e || g.Trident, tizen: g.Tizen, firefox: g.Firefox
                })
        },
        loadPlatformsParam: function () {
            var a = window.location.search.substr(1).split("\x26"),
                b = {},
                c,
                d = {},
                e,
                h,
                g;
            for (c = 0; c < a.length; c++)
                e = a[c].split("\x3d"),
                    b[e[0]] = e[1];
            if (b.platformTags) {
                e = b.platformTags.split(",");
                a = e.length;
                for (c = 0; c < a; c++) {
                    b = e[c].split(":");
                    h = b[0];
                    g = !0;
                    if (1 < b.length && (g = b[1], "false" === g || "0" === g))
                        g = !1;
                    d[h] = g
                }
            }
            return d
        },
        filterPlatform: function (a, b) {
            a = q.concat(a || q);
            b = q.concat(b || q);
            var c = a.length, d = b.length, e = !c && d, h;
            for (h = 0; h < c && !e; h++)
                e = a[h], e = !!r[e];
            for (h = 0; h < d && e; h++)
                e = b[h], e = !r[e];
            return e
        },
        init: function () {
            var a = k.getElementsByTagName("script"), b = a.length, c = /\/ext(\-[a-z\-]+)?\.js$/, d, e, h, g, m, v; for (v = 0; v < b; v++) if (e = (d = a[v]).src) h = d.readyState || null, !g && c.test(e) &&
            (f.hasReadyState = "readyState" in d,
                f.hasAsync = "async" in d || !f.hasReadyState, g = e),
                f.scripts[m = f.canonicalUrl(e)] || new u(
                {
                    key: m,
                    url: e,
                    done: null === h || "loaded" === h || "complete" === h,
                    el: d,
                    prop: "src"
                }
                );

            g || (d = a[a.length - 1],
            g = d.src,
            f.hasReadyState = "readyState" in d,
            f.hasAsync = "async" in d || !f.hasReadyState);
            f.baseUrl = g.substring(0, g.lastIndexOf("/") + 1);
            f.origin = window.location.origin || window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
            f.detectPlatformTags();
            Ext.filterPlatform = f.filterPlatform
        },
        canonicalUrl: function (a) {
            n.href = a; a = n.href;
            var b = p.disableCachingParam, b = b ? a.indexOf(b + "\x3d") : -1, c, d; if (0 < b && ("?" === (c = a.charAt(b - 1)) || "\x26" === c)) { d = a.indexOf("\x26", b); if ((d = 0 > d ? "" : a.substring(d)) && "?" === c)++b, d = d.substring(1); a = a.substring(0, b - 1) + d } return a
        },
        getConfig: function (a) { return a ? f.config[a] : f.config }, setConfig: function (a, b) { if ("string" === typeof a) f.config[a] = b; else for (var c in a) f.setConfig(c, a[c]); return f }, getHead: function () {
            return f.docHead ||
            (f.docHead = k.head || k.getElementsByTagName("head")[0])
        }, create: function (a, b, c) { c = c || {}; c.url = a; c.key = b; return f.scripts[b] = new u(c) }, getEntry: function (a, b) { var c = f.canonicalUrl(a), d = f.scripts[c]; d || (d = f.create(a, c, b)); return d }, registerContent: function (a, b, c) { return f.getEntry(a, { content: c, loaded: !0, css: "css" === b }) }, processRequest: function (a, b) { a.loadEntries(b) }, load: function (a) {
            a = new l(a); if (a.sync || f.syncMode) return f.loadSync(a); f.currentRequest ? (a.getEntries(), f.suspendedQueue.push(a)) : (f.currentRequest =
            a, f.processRequest(a, !1)); return f
        }, loadSync: function (a) { a = new l(a); f.syncMode++; f.processRequest(a, !0); f.syncMode--; return f }, loadBasePrefix: function (a) { a = new l(a); a.prependBaseUrl = !0; return f.load(a) }, loadSyncBasePrefix: function (a) { a = new l(a); a.prependBaseUrl = !0; return f.loadSync(a) }, requestComplete: function (a) { if (f.currentRequest === a) for (f.currentRequest = null; 0 < f.suspendedQueue.length;) if (a = f.suspendedQueue.shift(), !a.done) { f.load(a); break } !f.currentRequest && 0 == f.suspendedQueue.length && f.fireListeners() },
        isLoading: function () { return !f.currentRequest && 0 == f.suspendedQueue.length }, fireListeners: function () { for (var a; f.isLoading() && (a = f.listeners.shift()) ;) a() }, onBootReady: function (a) { f.isLoading() ? f.listeners.push(a) : a() }, getPathsFromIndexes: function (a, b) { return l.prototype.getPathsFromIndexes(a, b) }, createLoadOrderMap: function (a) { return l.prototype.createLoadOrderMap(a) }, fetch: function (a, b, c, d) {
            d = void 0 === d ? !!b : d; var e = new XMLHttpRequest, h, g, f, v = !1, j = function () {
                e && 4 == e.readyState && (g = 1223 === e.status ? 204 :
                0 === e.status && ("file:" === (self.location || {}).protocol || "ionp:" === (self.location || {}).protocol) ? 200 : e.status, f = e.responseText, h = { content: f, status: g, exception: v }, b && b.call(c, h), e = null)
            }; d && (e.onreadystatechange = j); try { e.open("GET", a, d), e.send(null) } catch (l) { return v = l, j(), h } d || j(); return h
        }, notifyAll: function (a) { a.notifyRequests() }
    }; l.prototype =
        {
            $isRequest: !0, createLoadOrderMap: function (a) { var b = a.length, c = {}, d, e; for (d = 0; d < b; d++) e = a[d], c[e.path] = e; return c }, getLoadIndexes: function (a, b, c, d, e) {
                var h =
                c[a], g, m, j, l, k; if (b[a]) return b; b[a] = !0;
                for (a = !1; !a;) { j = !1; for (l in b) if (b.hasOwnProperty(l) && (h = c[l])) if (m = this.prepareUrl(h.path), m = f.getEntry(m), !e || !m || !m.done) { m = h.requires; d && h.uses && (m = m.concat(h.uses)); h = m.length; for (g = 0; g < h; g++) k = m[g], b[k] || (j = b[k] = !0) } j || (a = !0) } return b
            },
            getPathsFromIndexes: function (a, b) { var c = [], d = [], e, h; for (e in a) a.hasOwnProperty(e) && a[e] && c.push(e); c.sort(function (a, b) { return a - b }); e = c.length; for (h = 0; h < e; h++) d.push(b[c[h]].path); return d }, expandUrl: function (a, b, c, d) {
                "string" ==
                typeof a && (a = [a]);
                var e = this.loadOrder, h = this.loadOrderMap; if (e) { this.loadOrderMap = h = h || this.createLoadOrderMap(e); b = b || {}; var g = a.length, f = [], j, l; for (j = 0; j < g; j++) (l = h[a[j]]) ? this.getLoadIndexes(l.idx, b, e, c, d) : f.push(a[j]); return this.getPathsFromIndexes(b, e).concat(f) } return a
            },
            expandUrls: function (a, b) {
                "string" == typeof a && (a = [a]);
                var c = [], d = {}, e, h = a.length, f, j, l, k; for (f = 0; f < h; f++) { e = this.expandUrl(a[f], {}, b, !0); j = 0; for (l = e.length; j < l; j++) k = e[j], d[k] || (d[k] = !0, c.push(k)) } 0 == c.length && (c = a); return c
            },
            expandLoadOrder: function () {
                var a = this.urls, b; this.expanded ? b = a : (b = this.expandUrls(a, !0), this.expanded = !0); this.urls = b; a.length != b.length && (this.sequential = !0); return this
            },
            getUrls: function () {
                this.expandLoadOrder(); return this.urls
            }
            ,
            prepareUrl: function (a) {
                return this.prependBaseUrl ? f.baseUrl + a : a
            },
            getEntries: function () {
                var a = this.entries, b, c, d;
                if (!a) {
                    a = []; d = this.getUrls();
                    for (b = 0; b < d.length; b++)
                        c = this.prepareUrl(d[b]), c = f.getEntry(c,
                            {
                                buster: this.buster,
                                charset: this.charset
                            }
                            ),
                            c.requests.push(this), a.push(c);
                    this.entries = a
                } return a
            }, loadEntries: function (a)
            { var b = this, c = b.getEntries(), d = c.length, e = b.loadStart || 0, f, g; void 0 !== a && (b.sync = a); b.loaded = b.loaded || 0; b.loading = b.loading || d; for (g = e; g < d; g++) if (f = c[g], e = f.loaded ? !0 : c[g].load(b.sync), !e) { b.loadStart = g; f.onDone(function () { b.loadEntries(a) }); break } b.processLoadedEntries() }, processLoadedEntries: function () {
                var a = this.getEntries(), b = a.length, c = this.startIndex || 0, d; if (!this.done) {
                    for (; c < b; c++) {
                        d = a[c]; if (!d.loaded) { this.startIndex = c; return } d.evaluated ||
                        d.evaluate(); d.error && (this.error = !0)
                    } this.notify()
                }
            }, notify: function () { var a = this; if (!a.done) { var b = a.error, c = a[b ? "failure" : "success"], b = "delay" in a ? a.delay : b ? 1 : f.config.chainDelay, d = a.scope || a; a.done = !0; c && (0 === b || 0 < b ? setTimeout(function () { c.call(d, a) }, b) : c.call(d, a)); a.fireListeners(); f.requestComplete(a) } }, onDone: function (a) { var b = this.listeners || (this.listeners = []); this.done ? a(this) : b.push(a) }, fireListeners: function () { var a = this.listeners, b; if (a) for (; b = a.shift() ;) b(this) }
        }; u.prototype = {
            $isEntry: !0,
            done: !1, evaluated: !1, loaded: !1, isCrossDomain: function () { void 0 === this.crossDomain && (this.crossDomain = 0 !== this.getLoadUrl().indexOf(f.origin)); return this.crossDomain }, isCss: function () { void 0 === this.css && (this.css = this.url && x.test(this.url)); return this.css }, getElement: function (a) {
                var b = this.el; b || (this.isCss() ? (a = a || "link", b = k.createElement(a), "link" == a ? (b.rel = "stylesheet", this.prop = "href") : this.prop = "textContent", b.type = "text/css") : (b = k.createElement(a || "script"), b.type = "text/javascript", this.prop =
                "src", f.hasAsync && (b.async = !1)), this.el = b); return b
            }, getLoadUrl: function () { var a = f.canonicalUrl(this.url); this.loadUrl || (this.loadUrl = this.buster ? a + (-1 === a.indexOf("?") ? "?" : "\x26") + this.buster : a); return this.loadUrl }, fetch: function (a) { var b = this.getLoadUrl(); f.fetch(b, a.complete, this, !!a.async) }, onContentLoaded: function (a) {
                var b = a.status, c = a.content; a = a.exception; this.getLoadUrl(); this.loaded = !0; (a || 0 === b) && !w.phantom ? this.evaluated = this.error = !0 : 200 <= b && 300 > b || 304 === b || w.phantom || 0 === b && 0 < c.length ?
                this.content = c : this.evaluated = this.error = !0
            }, createLoadElement: function (a)
            { var b = this, c = b.getElement(); b.preserve = !0; c.onerror = function () { b.error = !0; a && a() }; f.hasReadyState ? c.onreadystatechange = function () { ("loaded" === this.readyState || "complete" === this.readyState) && a && a() } : c.onload = a; c[b.prop] = b.getLoadUrl() }, onLoadElementReady: function () { f.getHead().appendChild(this.getElement()); this.evaluated = !0 }, inject: function (a) {
                var b = f.getHead(), c = this.url, d = this.key, e, h; this.isCss() ? (this.preserve = !0, h = d.substring(0,
                d.lastIndexOf("/") + 1), e = k.createElement("base"), e.href = h, b.firstChild ? b.insertBefore(e, b.firstChild) : b.appendChild(e), e.href = e.href, c && (a += "\n/*# sourceURL\x3d" + d + " */"), c = this.getElement("style"), d = "styleSheet" in c, b.appendChild(e), d ? (b.appendChild(c), c.styleSheet.cssText = a) : (c.textContent = a, b.appendChild(c)), b.removeChild(e)) : (c && (a += "\n//# sourceURL\x3d" + d), Ext.globalEval(a)); return this
            }, loadCrossDomain: function () {
                var a = this, b = function ()
                { a.loaded = a.evaluated = a.done = !0; a.notifyRequests() }; if (a.isCss()) a.createLoadElement(),
                a.evaluateLoadElement(), b(); else return a.createLoadElement(function () { b() }), a.evaluateLoadElement(), !1; return !0
            }, loadElement: function ()
            { var a = this; if (a.isCss()) return a.loadCrossDomain(); a.createLoadElement(function () { a.loaded = a.evaluated = a.done = !0; a.notifyRequests() }); a.evaluateLoadElement(); return !0 }, loadSync: function () { var a = this; a.fetch({ async: !1, complete: function (b) { a.onContentLoaded(b) } }); a.evaluate(); a.notifyRequests() }, load: function (a) {
                var b = this; if (!b.loaded) {
                    if (b.loading) return !1; b.loading =
                    !0; if (a) b.loadSync(); else { if (b.isCrossDomain()) return b.loadCrossDomain(); if (!b.isCss() && f.hasReadyState) b.createLoadElement(function () { b.loaded = !0; b.notifyRequests() }); else { if (f.useElements) return b.loadElement(); b.fetch({ async: !a, complete: function (a) { b.onContentLoaded(a); b.notifyRequests() } }) } }
                } return !0
            }, evaluateContent: function () {
                this.inject(this.content); this.content = null
            }, evaluateLoadElement: function () { f.getHead().appendChild(this.getElement()) }, evaluate: function () {
                !this.evaluated && !this.evaluating &&
                (this.evaluating = !0, void 0 !== this.content ? this.evaluateContent() : this.error || this.evaluateLoadElement(), this.evaluated = this.done = !0, this.cleanup())
            }, cleanup: function () {
                var a = this.el, b; if (a) { if (!this.preserve) for (b in this.el = null, a.parentNode.removeChild(a), a) try { b !== this.prop && (a[b] = null), delete a[b] } catch (c) { } a.onload = a.onerror = a.onreadystatechange = j }
            }, notifyRequests: function () { var a = this.requests, b = a.length, c, d; for (c = 0; c < b; c++) d = a[c], d.processLoadedEntries(); this.done && this.fireListeners() }, onDone: function (a) {
                var b =
                this.listeners || (this.listeners = []);
                this.done ? a(this) : b.push(a)
            }, fireListeners: function () {
                var a = this.listeners, b; if (a && 0 < a.length) for (; b = a.shift() ;) b(this)
            }
        };
        Ext.disableCacheBuster = function (a, b) {
            var c = new Date;
            c.setTime(c.getTime() + 864E5 * (a ? 3650 : -1));
            c = c.toGMTString();
            k.cookie = "ext-cache\x3d1; expires\x3d" + c + "; path\x3d" + (b || "/")
        };
        f.init();
        return f
}(function () { });
Ext.globalEval = Ext.globalEval || (this.execScript ? function (j) {
    execScript(j)
} : function (j) {
    eval.call(window, j)
});
Function.prototype.bind || function () {
    var j = Array.prototype.slice, l = function (l) {
        var k = j.call(arguments, 1), q = this;
        if (k.length) return function () {
            var p = arguments; return q.apply(l, p.length ? k.concat(j.call(p)) : k)
        }; k = null; return function () { return q.apply(l, arguments) }
    }; Function.prototype.bind = l; l.$extjs = !0
}(); Ext = Ext || window.Ext || {};
Ext.Microloader = Ext.Microloader || function () {
    var j = Ext.Boot, l = function (a) {
        console.log("[WARN] " + a)
    }, u = "_ext:" + location.pathname, k = function (b, c) {
        return u + b + "-" + (c ? c + "-" : "") + a.appId
    }, q, p; try {
        p = window.localStorage
    } catch (x) { } var n = window.applicationCache, t = {
        clearAllPrivate: function (b) {
            if (p) { p.removeItem(b.key); var c, d = [], e = b.profile + "-" + a.appId, f = p.length; for (b = 0; b < f; b++) c = p.key(b), 0 === c.indexOf(u) && -1 !== c.indexOf(e) && d.push(c); for (b in d) p.removeItem(d[b]) }
        }, retrieveAsset: function (a) {
            try {
                return p.getItem(a)
            } catch (c) {
                return null
            }
        },
        setAsset: function (a, c) {
            try {
                null === c || "" == c ? p.removeItem(a) : p.setItem(a, c)
            } catch (d) { }
        }
    }, w = function (a) { this.assetConfig = "string" === typeof a.assetConfig ? { path: a.assetConfig } : a.assetConfig; this.type = a.type; this.key = k(this.assetConfig.path, a.manifest.profile); a.loadFromCache && this.loadFromCache() }; w.prototype = {
        shouldCache: function () {
            return p && this.assetConfig.update && this.assetConfig.hash && !this.assetConfig.remote
        }, is: function (a) {
            return !!a && this.assetConfig && a.assetConfig && this.assetConfig.hash === a.assetConfig.hash
        },
        cache: function (a) {
            this.shouldCache() && t.setAsset(this.key, a || this.content)
        }, uncache: function () {
            t.setAsset(this.key, null)
        }, updateContent: function (a) {
            this.content = a
        }, getSize: function () {
            return this.content ? this.content.length : 0
        },
        loadFromCache: function () {
            this.shouldCache() && (this.content = t.retrieveAsset(this.key))
        }
    }; var r = function (a) {

        this.content = "string" === typeof a.content ? JSON.parse(a.content) : a.content; this.assetMap = {};
        this.url = a.url; this.fromCache = !!a.cached;
        this.assetCache = !1 !== a.assetCache;
        this.key = k(this.url);
        this.profile = this.content.profile;
        this.hash = this.content.hash;
        this.loadOrder = this.content.loadOrder;
        this.deltas = this.content.cache ? this.content.cache.deltas : null;
        this.cacheEnabled = this.content.cache ? this.content.cache.enable : !1;
        this.loadOrderMap = this.loadOrder ? j.createLoadOrderMap(this.loadOrder) : null;
        a = this.content.tags; var c = Ext.platformTags; if (a) {
            if (a instanceof Array)
                for (var d = 0; d < a.length; d++) c[a[d]] = !0;
            else j.apply(c, a); j.apply(c, j.loadPlatformsParam())
        }
        this.js = this.processAssets(this.content.js,
        "js"); this.css = this.processAssets(this.content.css, "css")
    }; r.prototype = {
        processAsset: function (a, c) {
            var d = new w({ manifest: this, assetConfig: a, type: c, loadFromCache: this.assetCache }); return this.assetMap[a.path] = d
        }, processAssets: function (a, c) { var d = [], e = a.length, f, g; for (f = 0; f < e; f++) g = a[f], d.push(this.processAsset(g, c)); return d }, useAppCache: function () { return !0 }, getAssets: function () { return this.css.concat(this.js) }, getAsset: function (a) { return this.assetMap[a] }, shouldCache: function () {
            return this.hash &&
            this.cacheEnabled
        }, cache: function (a) {
            this.shouldCache() && t.setAsset(this.key, JSON.stringify(a || this.content))
        },
        is: function (a) {
            return this.hash === a.hash
        }, uncache: function () {
            t.setAsset(this.key, null)
        }, exportContent: function () {
            return j.apply({
                loadOrderMap: this.loadOrderMap
            }, this.content)
        }
    }; var s = [], f = !1, a = {
        init: function () {
            Ext.microloaded = !0; var b = document.getElementById("microloader"); a.appId = b ? b.getAttribute("data-app") : ""; Ext.beforeLoad && (q = Ext.beforeLoad(Ext.platformTags)); var c = Ext._beforereadyhandler;
            Ext._beforereadyhandler = function () {
                Ext.Boot !== j && (Ext.apply(Ext.Boot, j), Ext.Boot = j);
                c && c()
            }
        }, run: function () {
            a.init();
            var b = Ext.manifest;
            if ("string" === typeof b) {
                var c = b.indexOf(".json") === b.length - 5 ? b : b + ".json", d = k(c); (d = t.retrieveAsset(d)) ? (b = new r({ url: c, content: d, cached: !0 }), q && q(b), a.load(b)) : j.fetch(c, function (d) { b = new r({ url: c, content: d.content }); b.cache(); q && q(b); a.load(b) })
            } else b = new r({ content: b }), a.load(b)
        }, load: function (b) {
            a.urls = []; a.manifest = b; Ext.manifest = a.manifest.exportContent();
            var c = b.getAssets(), d = [], e, f, g, m; g = c.length; for (f = 0; f < g; f++) if (e = c[f], m = a.filterAsset(e)) b.shouldCache() && e.shouldCache() && (e.content ? (m = j.registerContent(e.assetConfig.path, e.type, e.content), m.evaluated && l("Asset: " + e.assetConfig.path + " was evaluated prior to local storage being consulted.")) : d.push(e)), a.urls.push(e.assetConfig.path); if (0 < d.length) for (a.remainingCachedAssets = d.length; 0 < d.length;) e = d.pop(), j.fetch(e.assetConfig.path, function (b) { return function (c) { a.onCachedAssetLoaded(b, c) } }(e));
            else a.onCachedAssetsReady()
        }, onCachedAssetLoaded: function (b, c) {
            var d; c = a.parseResult(c); a.remainingCachedAssets--; c.error ? (l("There was an error pre-loading the asset '" + b.assetConfig.path + "'. This asset will be uncached for future loading"), b.uncache()) : (d = a.checksum(c.content, b.assetConfig.hash), d || (l("Cached Asset '" + b.assetConfig.path + "' has failed checksum. This asset will be uncached for future loading"), b.uncache()), j.registerContent(b.assetConfig.path, b.type, c.content), b.updateContent(c.content),
            b.cache()); if (0 === a.remainingCachedAssets) a.onCachedAssetsReady()
        }, onCachedAssetsReady: function () { j.load({ url: a.urls, loadOrder: a.manifest.loadOrder, loadOrderMap: a.manifest.loadOrderMap, sequential: !0, success: a.onAllAssetsReady, failure: a.onAllAssetsReady }) }, onAllAssetsReady: function () { f = !0; a.notify(); !1 !== navigator.onLine ? a.checkAllUpdates() : window.addEventListener && window.addEventListener("online", a.checkAllUpdates, !1) }, onMicroloaderReady: function (a) { f ? a() : s.push(a) }, notify: function () {
            for (var a; a =
            s.shift() ;) a()
        }, patch: function (a, c) { var d = [], e, f, g; if (0 === c.length) return a; f = 0; for (g = c.length; f < g; f++) e = c[f], "number" === typeof e ? d.push(a.substring(e, e + c[++f])) : d.push(e); return d.join("") }, checkAllUpdates: function () { window.removeEventListener && window.removeEventListener("online", a.checkAllUpdates, !1); n && a.checkForAppCacheUpdate(); a.manifest.fromCache && a.checkForUpdates() }, checkForAppCacheUpdate: function () {
            n.status === n.UPDATEREADY || n.status === n.OBSOLETE ? a.appCacheState = "updated" : n.status !== n.IDLE &&
            n.status !== n.UNCACHED ? (a.appCacheState = "checking", n.addEventListener("error", a.onAppCacheError), n.addEventListener("noupdate", a.onAppCacheNotUpdated), n.addEventListener("cached", a.onAppCacheNotUpdated), n.addEventListener("updateready", a.onAppCacheReady), n.addEventListener("obsolete", a.onAppCacheObsolete)) : a.appCacheState = "current"
        }, checkForUpdates: function () {
            j.fetch(a.manifest.url, a.onUpdatedManifestLoaded)
        },
        onAppCacheError: function (b) {

            l(b.message);
            a.appCacheState = "error"; a.notifyUpdateReady()
        }, onAppCacheReady: function () {
            n.swapCache();
            a.appCacheUpdated()
        },
        onAppCacheObsolete: function () {
            a.appCacheUpdated()
        },
        appCacheUpdated: function () {
            a.appCacheState = "updated"; a.notifyUpdateReady()
        },
        onAppCacheNotUpdated: function () { a.appCacheState = "current"; a.notifyUpdateReady() }, filterAsset: function (a) { a = a && a.assetConfig || {}; return a.platform || a.exclude ? j.filterPlatform(a.platform, a.exclude) : !0 }, onUpdatedManifestLoaded: function (b) {
            b = a.parseResult(b); if (b.error) l("Error loading manifest file to check for updates"), a.onAllUpdatedAssetsReady(); else {
                var c,
                d, e, f, g, m = [], k = new r(
                    { url: a.manifest.url, content: b.content, assetCache: !1 });
                a.remainingUpdatingAssets = 0; a.updatedAssets = [];
                a.removedAssets = [];
                a.updatedManifest = null; a.updatedAssetsReady = !1;
                if (k.shouldCache()) if (a.manifest.is(k)) a.onAllUpdatedAssetsReady();
                else {
                    a.updatedManifest = k;
                    c = a.manifest.getAssets();
                    d = k.getAssets();
                    for (f in d) b = d[f], e = a.manifest.getAsset(b.assetConfig.path),
                        (g = a.filterAsset(b)) && (!e || b.shouldCache() && !e.is(b)) && m.push({ _new: b, _current: e }); for (f in c) e = c[f], b = k.getAsset(e.assetConfig.path),
                    g = !a.filterAsset(b), (!g || !b || e.shouldCache() && !b.shouldCache()) && a.removedAssets.push(e);
                    if (0 < m.length) for (a.remainingUpdatingAssets = m.length; 0 < m.length;) e = m.pop(), b = e._new, e = e._current, "full" === b.assetConfig.update || !e ? j.fetch(b.assetConfig.path, function (b) { return function (c) { a.onFullAssetUpdateLoaded(b, c) } }(b)) : "delta" === b.assetConfig.update && (f = k.deltas, f = f + "/" + b.assetConfig.path + "/" + e.assetConfig.hash + ".json", j.fetch(f, function (b, c) { return function (d) { a.onDeltaAssetUpdateLoaded(b, c, d) } }(b, e)));
                    else a.onAllUpdatedAssetsReady()
                } else a.updatedManifest = k, t.clearAllPrivate(k), a.onAllUpdatedAssetsReady()
            }
        },
        onFullAssetUpdateLoaded: function (b, c) {
            var d; c = a.parseResult(c);
            a.remainingUpdatingAssets--; c.error ? b.uncache() : (d = a.checksum(c.content, b.assetConfig.hash)) ? (b.updateContent(c.content), a.updatedAssets.push(b)) : b.uncache(); if (0 === a.remainingUpdatingAssets) a.onAllUpdatedAssetsReady()
        },
        onDeltaAssetUpdateLoaded: function (b, c, d) {
            var e, f, g; d = a.parseResult(d); a.remainingUpdatingAssets--;
            if (d.error) l("Error loading delta patch for " +
            b.assetConfig.path + " with hash " + c.assetConfig.hash + " . This asset will be uncached for future loading"), b.uncache(); else try { e = JSON.parse(d.content), g = a.patch(c.content, e), (f = a.checksum(g, b.assetConfig.hash)) ? (b.updateContent(g), a.updatedAssets.push(b)) : b.uncache() } catch (j) { l("Error parsing delta patch for " + b.assetConfig.path + " with hash " + c.assetConfig.hash + " . This asset will be uncached for future loading"), b.uncache() } if (0 === a.remainingUpdatingAssets) a.onAllUpdatedAssetsReady()
        },
        onAllUpdatedAssetsReady: function () {
            var b;
            a.updatedAssetsReady = !0;
            if (a.updatedManifest) {
                for (; 0 < a.removedAssets.length;)
                    b = a.removedAssets.pop(), b.uncache();
                for (a.updatedManifest && a.updatedManifest.cache() ;
                    0 < a.updatedAssets.length;) b = a.updatedAssets.pop(), b.cache()
            }
            a.notifyUpdateReady()
        },
        notifyUpdateReady: function () { if ("checking" !== a.appCacheState && a.updatedAssetsReady && ("updated" === a.appCacheState || a.updatedManifest)) a.appUpdate = { updated: !0, app: "updated" === a.appCacheState, manifest: a.updatedManifest && a.updatedManifest.exportContent() }, a.fireAppUpdate() },
        fireAppUpdate: function () {
            Ext.GlobalEvents && Ext.defer(function () {
                Ext.GlobalEvents.fireEvent("appupdate", a.appUpdate)
            }, 100)
        }, checksum: function (a, c) { if (!a || !c) return !1; var d = !0, e = c.length, f = a.substring(0, 1); "/" == f ? a.substring(2, e + 2) !== c && (d = !1) : "f" == f ? a.substring(10, e + 10) !== c && (d = !1) : "." == f && a.substring(1, e + 1) !== c && (d = !1); return d }, parseResult: function (a) {
            var c = {}; (a.exception || 0 === a.status) && !j.env.phantom ? c.error = !0 : 200 <= a.status && 300 > a.status || 304 === a.status || j.env.phantom || 0 === a.status && 0 < a.content.length ?
            c.content = a.content : c.error = !0;
            return c
        }
    }; return a
}();
Ext.manifest = Ext.manifest || "bootstrap";
Ext.Microloader.run();