function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./ApiCreater")), r = {
    sendCode: function(e) {
        return (0, n.default)({
            url: "/eus/v1/weixin_light_app_login_code",
            method: "POST",
            data: e
        });
    },
    captchas: function() {
        return (0, n.default)({
            url: "/eus/v1/users/{user_id}/captchas"
        });
    },
    login: function(e) {
        return (0, n.default)({
            url: "/eus/v1/weixin_light_app_login",
            method: "POST",
            data: e
        });
    }
};

wx.getStorageSync("NEW_USER") || (wx.removeStorageSync("USER"), wx.setStorageSync("NEW_USER", !0)), 
exports.default = new (function() {
    function n() {
        e(this, n), this.data = {}, this.loadSync();
    }
    return t(n, [ {
        key: "login",
        value: function(e) {
            var t = this;
            return r.login(e).then(function(e) {
                var n = e.data, r = n.union_id, a = n.open_id, i = n.sid, o = n.user;
                return t.data.union_id = r, t.data.open_id = a, e.data.SID = i, t.data.user = o, 
                t.data.SID = i, wx.setStorageSync("USER", e.data), o ? Promise.resolve(e.data) : Promise.reject({
                    name: "WECHAT_NOT_BIND_USER",
                    message: "这个微信号没有绑定过饿了么账户",
                    data: {
                        union_id: r,
                        open_id: a
                    }
                });
            }).catch(function(e) {
                return Promise.reject(e);
            });
        }
    }, {
        key: "save",
        value: function(e) {
            this.data = e;
        }
    }, {
        key: "loadSync",
        value: function() {
            var e = wx.getStorageSync("USER");
            e && (this.data = e);
        }
    }, {
        key: "removeSync",
        value: function() {
            try {
                wx.removeStorageSync("USER"), this.data = {};
            } catch (e) {
                console.log("error", e);
            }
        }
    }, {
        key: "union_id",
        get: function() {
            return this.data.union_id;
        }
    }, {
        key: "open_id",
        get: function() {
            return this.data.open_id;
        }
    }, {
        key: "SID",
        get: function() {
            return this.data.SID;
        }
    }, {
        key: "info",
        get: function() {
            return this.data.user || {};
        }
    }, {
        key: "id",
        get: function() {
            return this.info.user_id;
        }
    }, {
        key: "user_id",
        get: function() {
            return this.info.user_id;
        }
    } ]), n;
}())();