function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}(require("../../../common/js/utils")), i = t(require("./model")), n = t(require("../../../../../common/wxcontext")), r = t(require("../../../../../api/Ptag/report_manager_wqvue")), a = 0, o = {
    template: "#my-activity-msg",
    mounted: function() {
        this.toMsgPage = e.throttle(this.toMsgPage, 1e3), this.toActivityPage = e.throttle(this.toActivityPage, 1e3), 
        this.initPage();
    },
    data: {
        list: [],
        isCountDownStop: !1,
        currentSwiper: 0,
        isXCX: n.default.isXCX
    },
    destroyed: function() {
        this.isCountDownStop = !0;
    },
    methods: {
        swiperTap: function(t) {
            var e = this.currentSwiper, i = this.list[e].url;
            this.toActivityPage({
                currentTarget: {
                    dataset: {
                        url: i
                    }
                }
            });
        },
        swiperChange: function(t) {
            this.currentSwiper = t.detail.current;
        },
        toMsgPage: function() {
            r.default.addPtag("7155.1.199"), this.$xgoto([ "/pages/my_pages/actmsgs/index", "//wqs.jd.com/wqmy/actmsgs/actmsgs/index.html" ]);
        },
        addPtagExposure: function() {
            r.default.addPtagExposure("7155.1.198");
        },
        toActivityPage: function(t) {
            var e = (t.xcxEvent || t).currentTarget.dataset.url;
            r.default.addPtag("7155.1.197"), e.indexOf("//") >= 0 ? this.$xgoto([ e ]) : this.$goto(e);
        },
        initPage: function() {
            var t = this;
            i.default.queryUserActMsgs().then(function(e) {
                var i = e && e.data && e.data.msgs || [], n = t.filterBadItem(i).slice(0, 5);
                n.length < 5 ? t.getPpmsConfig(n) : (t.addPtagExposure(), t.list = t.setPingouItem(n), 
                a = t.list.length, t.timeStart());
            }).catch(function(e) {
                t.getPpmsConfig([]);
            });
        },
        getPpmsConfig: function(t) {
            var r = this;
            i.default.getActMsgConfig().then(function(i) {
                var a = i && i[0] && i[0].msgs || [];
                a = a.reduce(function(t, i) {
                    if (i.channel.split(";").indexOf(e.getEnv().toString()) > -1) {
                        i.iconImg = n.default.JD.performance.getScaleImg(i.iconImg);
                        var r = i.img;
                        i.img = [], r.forEach(function(t) {
                            i.img.push(n.default.JD.performance.getScaleImg(t.img));
                        }), t.push(i);
                    }
                    return t;
                }, []), a = r.filterBadItem(a), r.list = r.setPingouItem(e.unique(t.concat(a), "msgType").slice(0, 5));
            }).catch(function(e) {
                r.list = r.setPingouItem(t);
            }).finally(function() {
                r.timeStart(), r.list.length && r.addPtagExposure(), a > r.list.length && (r.currentSwiper = 0), 
                a = r.list.length;
            });
        },
        filterBadItem: function(t) {
            return t.filter(function(t) {
                if (!(t.title && e.isValidUrl(t.url) && t.msgName && t.img)) return !1;
                switch (t.modelType.toString()) {
                  case "1":
                    if (t.img = t.img.length > 1 ? t.img.splice(0, 1) : t.img, !t.subTitle || !t.img.length) return !1;
                    break;

                  case "2":
                    if (!t.subTitle) return !1;
                    break;

                  case "3":
                    if (t.img = t.img.length > 3 ? t.img.splice(0, 3) : t.img, !t.img.length) return !1;
                    break;

                  case "4":
                    if (t.img = t.img.length > 1 ? t.img.splice(0, 1) : t.img, !(t.img.length && t.profilePic && t.profilePic.length)) return !1;
                    t.lefttime = "", t.isCountDownStop = !1;
                }
                return !0;
            });
        },
        setPingouItem: function(t) {
            if (t[0] && 4 == t[0].modelType && t.length > 1) {
                var e = t[1];
                t[1] = t[0], t[0] = e;
            }
            return t;
        },
        timeStart: function() {
            var t = this, e = setInterval(function() {
                var i = t.list.filter(function(t) {
                    return 4 == t.modelType && !t.isCountDownStop;
                });
                !t.isCountDownStop && i.length ? i.map(function(e) {
                    t.timeDown(e);
                }) : clearInterval(e);
            }, 1e3);
        },
        timeDown: function(t) {
            var i = 1e3 * t.endTime, n = e.getServerTime(), r = n ? new Date(n).getTime() : new Date().getTime(), a = parseInt((i - r) / 1e3), o = {
                h: this.addZero(parseInt(a / 3600 % 24)),
                m: this.addZero(parseInt(a / 60 % 60)),
                s: this.addZero(parseInt(a % 60))
            };
            a <= 0 ? t.isCountDownStop = !0 : t.lefttime = "剩余 " + o.h + "时" + o.m + "分" + o.s + "秒";
        },
        addZero: function(t) {
            return t >= 10 ? t + "" : "0" + t;
        }
    }
};

exports.default = o;