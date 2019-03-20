Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = function(o) {
    if (o && o.__esModule) return o;
    var t = {};
    if (null != o) for (var c in o) Object.prototype.hasOwnProperty.call(o, c) && (t[c] = o[c]);
    return t.default = o, t;
}(require("../../../models/account_data")), t = new (require("../../../../../common/logger.js").Logger)("my/indexv2");

exports.default = function() {
    return {
        state: {
            isShowQR: !1,
            isShowGwqQR: !1,
            isNotFollowAcc: !1,
            isNotFollowGwqAcc: !1
        },
        actions: {
            getIsFollowAcc: function() {
                var c = this;
                o.getIsFollowAcc().then(function(o) {
                    1 != o.isfans && (c.isNotFollowAcc = !0);
                }).catch(function(o) {
                    t.error(o);
                });
            },
            getIsQQFollowAcc: function() {
                var c = this;
                o.getIsQQFollowAcc().then(function(o) {
                    0 == o.subscribe && (c.isNotFollowAcc = !0);
                }).catch(function(o) {
                    t.error(o);
                });
            },
            getIsFollowGwqAcc: function() {
                var c = this;
                o.getIsFollowGwqAcc().then(function(o) {
                    1 != o.isfans && (c.isNotFollowGwqAcc = !0);
                }).catch(function(o) {
                    t.error(o);
                });
            }
        }
    };
};