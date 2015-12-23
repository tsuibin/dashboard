var ExecDashboard = ExecDashboard || {};
if (!ExecDashboard.model) {
  ExecDashboard.model = {}
}
if (!ExecDashboard.store) {
  ExecDashboard.store = {}
}
if (!ExecDashboard.ux) {
  ExecDashboard.ux = {}
}
if (!ExecDashboard.ux.plugin) {
  ExecDashboard.ux.plugin = {}
}
if (!ExecDashboard.view) {
  ExecDashboard.view = {}
}
if (!ExecDashboard.view.companynews) {
  ExecDashboard.view.companynews = {}
}
if (!ExecDashboard.view.kpi) {
  ExecDashboard.view.kpi = {}
}
if (!ExecDashboard.view.main) {
  ExecDashboard.view.main = {}
}
if (!ExecDashboard.view.profitloss) {
  ExecDashboard.view.profitloss = {}
}
if (!ExecDashboard.view.quarterly) {
  ExecDashboard.view.quarterly = {}
}
var Ext = Ext || {};
if (!Ext.Toolbar) {
  Ext.Toolbar = {}
}
if (!Ext.app) {
  Ext.app = {}
}
if (!Ext.app.bind) {
  Ext.app.bind = {}
}
if (!Ext.app.domain) {
  Ext.app.domain = {}
}
if (!Ext.app.route) {
  Ext.app.route = {}
}
if (!Ext.button) {
  Ext.button = {}
}
if (!Ext.chart) {
  Ext.chart = {}
}
if (!Ext.chart.axis) {
  Ext.chart.axis = {}
}
if (!Ext.chart.axis.layout) {
  Ext.chart.axis.layout = {}
}
if (!Ext.chart.axis.segmenter) {
  Ext.chart.axis.segmenter = {}
}
if (!Ext.chart.axis.sprite) {
  Ext.chart.axis.sprite = {}
}
if (!Ext.chart.grid) {
  Ext.chart.grid = {}
}
if (!Ext.chart.interactions) {
  Ext.chart.interactions = {}
}
if (!Ext.chart.label) {
  Ext.chart.label = {}
}
if (!Ext.chart.overrides) {
  Ext.chart.overrides = {}
}
if (!Ext.chart.series) {
  Ext.chart.series = {}
}
if (!Ext.chart.series.sprite) {
  Ext.chart.series.sprite = {}
}
if (!Ext.chart.theme) {
  Ext.chart.theme = {}
}
if (!Ext.container) {
  Ext.container = {}
}
if (!Ext.core) {
  Ext.core = {}
}
if (!Ext.data) {
  Ext.data = {}
}
if (!Ext.data.field) {
  Ext.data.field = {}
}
if (!Ext.data.flash) {
  Ext.data.flash = {}
}
if (!Ext.data.identifier) {
  Ext.data.identifier = {}
}
if (!Ext.data.matrix) {
  Ext.data.matrix = {}
}
if (!Ext.data.operation) {
  Ext.data.operation = {}
}
if (!Ext.data.proxy) {
  Ext.data.proxy = {}
}
if (!Ext.data.reader) {
  Ext.data.reader = {}
}
if (!Ext.data.request) {
  Ext.data.request = {}
}
if (!Ext.data.schema) {
  Ext.data.schema = {}
}
if (!Ext.data.session) {
  Ext.data.session = {}
}
if (!Ext.data.validator) {
  Ext.data.validator = {}
}
if (!Ext.data.writer) {
  Ext.data.writer = {}
}
if (!Ext.dd) {
  Ext.dd = {}
}
if (!Ext.dom) {
  Ext.dom = {}
}
if (!Ext.dom.Element) {
  Ext.dom.Element = {}
}
if (!Ext.draw) {
  Ext.draw = {}
}
if (!Ext.draw.engine) {
  Ext.draw.engine = {}
}
if (!Ext.draw.engine.SvgContext) {
  Ext.draw.engine.SvgContext = {}
}
if (!Ext.draw.gradient) {
  Ext.draw.gradient = {}
}
if (!Ext.draw.modifier) {
  Ext.draw.modifier = {}
}
if (!Ext.draw.sprite) {
  Ext.draw.sprite = {}
}
if (!Ext.event) {
  Ext.event = {}
}
if (!Ext.event.gesture) {
  Ext.event.gesture = {}
}
if (!Ext.event.publisher) {
  Ext.event.publisher = {}
}
if (!Ext.form) {
  Ext.form = {}
}
if (!Ext.form.field) {
  Ext.form.field = {}
}
if (!Ext.fx) {
  Ext.fx = {}
}
if (!Ext.fx.animation) {
  Ext.fx.animation = {}
}
if (!Ext.fx.easing) {
  Ext.fx.easing = {}
}
if (!Ext.fx.runner) {
  Ext.fx.runner = {}
}
if (!Ext.fx.target) {
  Ext.fx.target = {}
}
if (!Ext.grid) {
  Ext.grid = {}
}
if (!Ext.grid.column) {
  Ext.grid.column = {}
}
if (!Ext.grid.feature) {
  Ext.grid.feature = {}
}
if (!Ext.grid.header) {
  Ext.grid.header = {}
}
if (!Ext.grid.locking) {
  Ext.grid.locking = {}
}
if (!Ext.grid.plugin) {
  Ext.grid.plugin = {}
}
if (!Ext.layout) {
  Ext.layout = {}
}
if (!Ext.layout.boxOverflow) {
  Ext.layout.boxOverflow = {}
}
if (!Ext.layout.component) {
  Ext.layout.component = {}
}
if (!Ext.layout.container) {
  Ext.layout.container = {}
}
if (!Ext.layout.container.boxOverflow) {
  Ext.layout.container.boxOverflow = {}
}
if (!Ext.list) {
  Ext.list = {}
}
if (!Ext.menu) {
  Ext.menu = {}
}
if (!Ext.mixin) {
  Ext.mixin = {}
}
if (!Ext.overrides) {
  Ext.overrides = {}
}
if (!Ext.overrides.app) {
  Ext.overrides.app = {}
}
if (!Ext.overrides.app.domain) {
  Ext.overrides.app.domain = {}
}
if (!Ext.overrides.dom) {
  Ext.overrides.dom = {}
}
if (!Ext.overrides.event) {
  Ext.overrides.event = {}
}
if (!Ext.overrides.event.publisher) {
  Ext.overrides.event.publisher = {}
}
if (!Ext.overrides.plugin) {
  Ext.overrides.plugin = {}
}
if (!Ext.overrides.util) {
  Ext.overrides.util = {}
}
if (!Ext.panel) {
  Ext.panel = {}
}
if (!Ext.perf) {
  Ext.perf = {}
}
if (!Ext.plugin) {
  Ext.plugin = {}
}
if (!Ext.promise) {
  Ext.promise = {}
}
if (!Ext.resizer) {
  Ext.resizer = {}
}
if (!Ext.scroll) {
  Ext.scroll = {}
}
if (!Ext.selection) {
  Ext.selection = {}
}
if (!Ext.state) {
  Ext.state = {}
}
if (!Ext.tab) {
  Ext.tab = {}
}
if (!Ext.theme) {
  Ext.theme = {}
}
if (!Ext.theme.crisp) {
  Ext.theme.crisp = {}
}
if (!Ext.theme.crisp.view) {
  Ext.theme.crisp.view = {}
}
if (!Ext.theme.crisptouch) {
  Ext.theme.crisptouch = {}
}
if (!Ext.theme.neptune) {
  Ext.theme.neptune = {}
}
if (!Ext.theme.neptune.layout) {
  Ext.theme.neptune.layout = {}
}
if (!Ext.theme.neptune.layout.component) {
  Ext.theme.neptune.layout.component = {}
}
if (!Ext.theme.neptune.menu) {
  Ext.theme.neptune.menu = {}
}
if (!Ext.theme.neptune.panel) {
  Ext.theme.neptune.panel = {}
}
if (!Ext.theme.neptune.resizer) {
  Ext.theme.neptune.resizer = {}
}
if (!Ext.theme.neptune.toolbar) {
  Ext.theme.neptune.toolbar = {}
}
if (!Ext.theme.touchsizing) {
  Ext.theme.touchsizing = {}
}
if (!Ext.theme.touchsizing.grid) {
  Ext.theme.touchsizing.grid = {}
}
if (!Ext.theme.touchsizing.grid.plugin) {
  Ext.theme.touchsizing.grid.plugin = {}
}
if (!Ext.theme.touchsizing.resizer) {
  Ext.theme.touchsizing.resizer = {}
}
if (!Ext.theme.touchsizing.selection) {
  Ext.theme.touchsizing.selection = {}
}
if (!Ext.tip) {
  Ext.tip = {}
}
if (!Ext.toolbar) {
  Ext.toolbar = {}
}
if (!Ext.util) {
  Ext.util = {}
}
if (!Ext.util.paintmonitor) {
  Ext.util.paintmonitor = {}
}
if (!Ext.util.sizemonitor) {
  Ext.util.sizemonitor = {}
}
if (!Ext.util.translatable) {
  Ext.util.translatable = {}
}
if (!Ext.view) {
  Ext.view = {}
}
