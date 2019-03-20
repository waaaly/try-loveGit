function e(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
    return r.default = e, r;
}

function r(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var o = r(require("./global.js")), t = r(require("./common/checkForUpdate.js")), n = e(require("./common/localStorage.js")), s = require("./common/report/device.js"), i = require("./api/Ptag/v.js"), a = r(require("./libs/emitter")), u = require("./common/http_access"), c = r(require("./common/recovery/init.js")), l = e(require("./common/cookie-v2/cookie.js")), p = e(require("./common/user_info.js")), d = e(require("./common/login/login.js")), f = e(require("./common/request/plugins/dispatcher")), m = e(require("./common/utils.js")), h = require("./common/buildVersion"), g = require("./common/tabbar_api/tabbar_utils.js"), q = require("./common/request/request.js"), w = r(require("./common/report/memory.js")), y = require("./common/global_config.js"), v = e(require("./api/Ptag/hermes"));

wx.$ = o.default, wx.isXCX = !0, require("./common/report/report.js"), require("./common/polyfill.js"), 
wx.$request = q.request, App({
    systemInfo: {},
    networkType: "wifi",
    webpSupport: !1,
    firstOnShow: !0,
    userInfo: {},
    scene: "",
    referrerInfo: {},
    wxacode: {},
    indexTips: {
        path: "",
        text: ""
    },
    wxAppName: "jd",
    isWXSearchScene: !1,
    version: "v5.8.42",
    appId: "wx91d27dbf599dff74",
    debug: require("./common/debug.js").debug,
    onLaunch: function() {
        var e = this, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        console.log("App onLaunch"), m.handleQueryScene(r.query), l.setCookie({
            data: {
                buildtime: h.VERSION_BUILD_TIME,
                wxapp_type: 1,
                wxapp_version: this.version
            },
            defaultExpires: !0
        }), n.checkAndClearAllIfNeeded(), (0, y.globalConfigInit)(), r.query && /^(http|httpDirect|ws)$/.test(r.query.debugChannel) && f.setDebugChannel(r.query.debugChannel), 
        d.getLoginPromise().then(function() {
            e.userInfo = p.gUserData();
        }), p.initUserData(), (0, i.initAppReport)(), (0, s.reportDevice)(), (0, w.default)(), 
        wx.getNetworkType({
            success: function(r) {
                e.networkType = r.networkType;
            }
        }), wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(r) {
            e.networkType = r.networkType;
        }), wx.getSystemInfo({
            success: function(r) {
                var o = r.platform, t = r.SDKVersion;
                e.webpSupport = "android" == o || "devtools" == o, e.bRenderCb = t >= "1.5.0", e.systemInfo = r, 
                e.systemInfo.isQB && (l.setCookie({
                    data: {
                        wxapp_type: 5
                    },
                    defaultExpires: !0
                }), f.setDebugChannel("http"));
            }
        }), this.scene = r.scene || "", v.visitKeyPromise();
    },
    onShow: function() {
        var e = this, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        console.log("============App onShow"), console.log("App onShow 参数: ", r), m.handleQueryScene(r.query), 
        (0, c.default)(), 1036 == r.scene ? (console.log("app分享参数:"), console.log(r), "pages/item/detail/detail" === r.path && r.query.sku && (this.isAppShare = {
            status: !0,
            sku: r.query.sku
        })) : (console.log("===============非app分享场景"), this.isAppShare = {
            status: !1
        }), this.referrerInfo = r.referrerInfo || {}, this.scene = r.scene || this.scene || "", 
        this.EA_PTAG = r.query ? r.query.EA_PTAG || r.query.ea_ptag || "" : "";
        var o = [ "1000", "1005", "1042", "1053", "1055" ];
        if (this.scene && o.indexOf("" + this.scene) >= 0 ? this.isWXSearchScene = !0 : this.isWXSearchScene = !1, 
        (0, t.default)(), this.firstOnShow) return setTimeout(function() {
            e.firstOnShow = !1, (0, g.setCartTabBadge)();
        }, 2e3), !0;
        (0, y.globalConfigUpdate)(), (0, g.setCartTabBadge)(), -1 != [ 1038, 1037 ].indexOf(r.scene) && p.getUserInfo(function(e, r) {
            0 == e ? console.log("frontend update account success") : console.warn("frontend update account fail");
        }), p.initUserData(), this.event.emit("cartrefresh");
    },
    onHide: function() {
        console.log("App onHide"), n.checkAndClearExpired();
    },
    onError: function(e) {
        console.log("app内错误信息上报", e.replace(/(\r\n|\r|\n)+/g, " "));
        for (var r = [ "getStorage:fail", "getStorageSync:fail", "Callback was already called" ], o = 0, t = r.length; o < t; o++) {
            var n = r[o];
            if (-1 != e.indexOf(n)) return;
        }
        var s = this.systemInfo, i = s.SDKVersion, a = void 0 === i ? "" : i, c = s.version, l = void 0 === c ? "" : c, p = s.platform, d = void 0 === p ? "" : p, f = [ this.version + "(" + this.wxAppName + ")", "sdk=" + a, "wx=" + l, "platform=" + d ].join("_");
        wx.$request({
            url: u.errorLog.url,
            method: "POST",
            data: u.errorLog.getData({
                url: "APP",
                errCode: "-1",
                errMsg: e.replace(/(\r\n|\r|\n)+/g, " "),
                responseTime: "-1",
                page: "pages/index/index",
                env: f
            }),
            priority: "REPORT"
        });
    },
    event: new a.default(void 0)
}), wx.JD = require("./common/JD.js").default;