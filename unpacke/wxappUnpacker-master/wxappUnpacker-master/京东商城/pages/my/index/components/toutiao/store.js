function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./model")), i = e(require("../../../../../libs/promise.min.js")), r = require("../../../../../common/logger.js"), s = e(require("../../../../../api/Ptag/report_manager_wqvue")), l = e(require("../../../../../common/wxcontext")), n = new r.Logger("my/index");

exports.default = function() {
    return {
        state: {
            redNum: 0,
            scrollMsg: [],
            inlineStyle: "",
            showToutiaoEnter: !1,
            showShopToutiao: !1,
            needShowEntrance: -1 != [ "wxapp", "weixin", "qq" ].indexOf(l.default.JD.device.scene) || l.default.JD.url.getUrlParam("showToutiao"),
            initTimes: 0
        },
        actions: {
            showEntrance: function() {
                var e = this;
                e.isShowToutiao() && e.showToutiao(), !e.isXCX && !e.isShowToutiao() && (e.showShopToutiao = !0), 
                !e.isXCX && l.default.JD.url.getUrlParam("showShopToutiao") && (e.showShopToutiao = !0);
            },
            showToutiao: function() {
                var e = this;
                e.showToutiaoEnter = !0;
                var r = t.default.getToutiaoScrollNumbe(), s = t.default.getPpmsGiftConfig(), l = t.default.querytopmsgs();
                i.default.all([ r, s, l ]).then(function(t) {
                    t[0].msgNum && (e.scrollNum = parseInt(t[0].msgNum)), e.ppmsGiftConfig = t[1], e.redNum = e.getRedNum(t[2]), 
                    e.scrollMsg = e.getScrollMsg(t[2]), e.getPreviewMsgIdAndPreviewMsgIdPps(e.scrollMsg, t[2].data), 
                    e.scrollMsg[0] && e.scrollMsg.push(e.scrollMsg[0]), e.toutiaoScrollInit(e.scrollMsg.length);
                }).catch(function(t) {
                    n.error(t), !e.isXCX && console.error(t);
                });
            },
            isShowToutiao: function() {
                if (this.isXCX) return !0;
                var e = {
                    pinWhiteList: "1159333627_m|欣玲0305|chenjingman|jd_6eac9a31e86a2|看你的小样|jd_66481ba5fa025|jd_5dbf017ee2102|jd_70e427c97f17f|wdKrAvnSRKrxLT|小胖314|79487414-20285440|jd_754cdc9304d40|wdYGZQKDXbfwbe|158056316-788187|dilemma2012|s1845754433990530|wdBhDdzQeBpPER|jd_6444385be578b|pang6759jiao|许愿银行|jd_5b7f7a78a6501|288341462-341112|wy940515|nathenever|2688026-601573|doris1017|jd_50d62d8969b73|alwaysau|liusiqin0716|jd_4fd5bfa077841|allen616li|yyyyyk|wdpYiSWSfRcguK|中文注册aaa|威大大392",
                    widWhiteList: "1159333627|877856931|3931356965|21566961311",
                    widTail: "2|3|4"
                };
                if (e) {
                    var t = e.pinWhiteList.split("|"), i = e.widWhiteList.split("|"), r = e.widTail.split("|"), s = l.default.JD.cookie.get("pin"), n = l.default.JD.cookie.get("wq_uin"), o = void 0;
                    if (n && (o = String(n).slice(-1)), -1 != t.indexOf(s) || -1 != i.indexOf(n) || -1 != r.indexOf(o)) return !0;
                }
                return !1;
            },
            getRedNum: function(e) {
                var t = this;
                return t.filterAllArray = !0, t.scrollMsg = e.data.filter(function(e) {
                    return t.filterArray(e);
                }), t.scrollMsg.length;
            },
            getScrollMsg: function(e) {
                var t = this;
                if (t.scrollNum < 0) t.scrollMsg = t.scrollMsg.slice(0, t.scrollNum); else if (t.scrollNum > 0) {
                    t.filterAllArray = !1;
                    var i = e.history.filter(function(e) {
                        return t.filterArray(e);
                    });
                    t.scrollMsg = t.scrollMsg.concat(i);
                }
                return t.scrollMsg;
            },
            filterArray: function(e) {
                var t = this;
                if (0 == t.scrollNum && !t.filterAllArray) return !1;
                if (e.uTimeStart && e.uTimeEnd && (parseInt(new Date().getTime() / 1e3) < parseInt(e.uTimeStart) || parseInt(new Date().getTime() / 1e3) > parseInt(e.uTimeEnd))) return !1;
                if (e.uType && (e.ptag = t.getToutiaoPtag(e.uType), e.exposurePtag = t.getToutiaoPtagExposure(e.uType), 
                e.type = t.getTypeName(e.uType)), !e.type) return !1;
                var i = e.content.msgInfo && e.content.msgInfo[0] ? e.content.msgInfo : [ {} ], r = e.content.shopInfo && e.content.shopInfo ? e.content.shopInfo : {};
                if (i[0].mainPicUrl) {
                    var s = i[0].mainPicUrl.split(",")[0];
                    /^jfs/.test(s) && (s = "//img1" + parseInt(5 * Math.random()) + ".360buyimg.com/evalpic/s120x120_" + s), 
                    e.mainPicUrl = s.replace(/^.*?\/\//, "https://");
                }
                if (i[0].title && (e.title = i[0].title), (201 == e.uType || 202 == e.uType) && e.mainPicUrl && e.title) return t.scrollNum--, 
                !0;
                if (203 == e.uType && e.mainPicUrl) {
                    var l = "";
                    return r.shopName && (l = r.shopName), e.title = l + "秒杀活动进行中，赶紧抢购", t.scrollNum--, 
                    !0;
                }
                return 204 != e.uType && 205 != e.uType && 206 != e.uType && 207 != e.uType || !e.mainPicUrl ? -1 != [ 208, 209, 210, 211, 212, 213, 215, 216, 217 ].indexOf(parseInt(e.uType)) && e.mainPicUrl && e.title ? (t.scrollNum--, 
                !0) : 214 == e.uType && e.mainPicUrl && i[0].friendNickName && i[0].desc ? (e.title = i[0].friendNickName + i[0].desc, 
                t.scrollNum--, !0) : 218 == e.uType && i[0].businessType && i[0].activeUrl && (e.businessType = i[0].businessType, 
                t.ppmsGiftConfig.forEach(function(t) {
                    t.businesstype == e.businessType && t.cornor && t.desc && t.imgUrl && (e.title = t.desc.replace(/<span>.+<\/span>/g, ""), 
                    e.mainPicUrl = t.imgUrl.replace(/^.*?\/\//, "https://"));
                }), e.title && e.mainPicUrl) ? (t.scrollNum--, !0) : 219 == e.uType && e.mainPicUrl && e.title ? (t.scrollNum--, 
                !0) : 220 == e.uType && i[0].skus && i[0].skus[0] && i[0].skus[0].mainPicUrl && e.title && r.venderId && r.shopName ? (e.mainPicUrl = i[0].skus[0].mainPicUrl.split(",")[0].replace(/^.*?\/\//, "https://"), 
                t.scrollNum--, !0) : 221 == e.uType && e.mainPicUrl && e.title && r.venderId && r.shopName ? (t.scrollNum--, 
                !0) : 222 == e.uType && e.mainPicUrl && e.title && i[0].id && r.venderId && r.shopName ? (t.scrollNum--, 
                !0) : (223 == e.uType || 224 == e.uType || 225 == e.uType) && e.mainPicUrl && e.title && r.venderId && r.shopName ? (t.data.scrollNum--, 
                !0) : 226 == e.uType && e.mainPicUrl && e.title && i[0].activeUrl && r.venderId && r.shopName ? (t.data.scrollNum--, 
                !0) : 227 == e.uType && t.isXCX && e.mainPicUrl && e.title && i[0].activeUrl ? (t.data.scrollNum--, 
                !0) : 228 == e.uType && e.mainPicUrl && e.title ? (t.data.scrollNum--, !0) : !(229 != e.uType || !e.mainPicUrl || !e.title || (t.data.scrollNum--, 
                0)) : (e.title = 207 == e.uType ? "专属特价，为你而降" : "好物走心推荐，只因更懂你", t.scrollNum--, !0);
            },
            getPreviewMsgIdAndPreviewMsgIdPps: function(e, t) {
                var i = this;
                i.previewMsgId = [], i.previewMsgIdPps = [], e.forEach(function(e) {
                    e.ulMsgId && e.strPpsReport && t.some(function(t) {
                        if (t.ulMsgId == e.ulMsgId) return i.previewMsgId.push(e.ulMsgId), i.previewMsgIdPps.push(e.strPpsReport), 
                        !0;
                    });
                });
            },
            toutiaoScrollInit: function(e) {
                function t() {
                    if (r !== i.initTimes || i.scrollMsg.length <= 2) return i.inlineStyle = "-webkit-transform: translate3d(0,0,0);", 
                    clearTimeout(a), !1;
                    var e = o % l, u = void 0, c = void 0;
                    o == l ? (o = 0, c = 1, u = "-webkit-transform: translate3d(0,0,0);") : (c = n, 
                    u = "-webkit-transition: transform 0.5s ease-in-out;-webkit-transform: translate3d(0,-" + 60 * e + "px,0);", 
                    0 == o && (u = "-webkit-transform: translate3d(0,0,0);")), i.inlineStyle = u, o++;
                    var p = i.scrollMsg[o - 1];
                    i.currentMsgPtag = p.ptag || "", i.currentStrChannelMsgId = p.strChannelMsgId || "", 
                    !p.isExposured && p.exposurePtag && (s.default.addPtag(p.exposurePtag), p.isExposured = 1), 
                    clearTimeout(a), a = setTimeout(t, 1e3 * c);
                }
                var i = this;
                i.initTimes += 1;
                var r = i.initTimes, l = e, n = 3, o = 0, a = "";
                t();
            },
            getToutiaoPtag: function(e) {
                return {
                    201: "137946.1.5",
                    202: "137946.1.4",
                    203: "137946.1.1",
                    204: "137946.1.2",
                    205: "137946.1.2",
                    206: "137946.1.2",
                    207: "137946.1.3",
                    208: "137946.1.6",
                    209: "137946.1.7",
                    210: "137946.1.8",
                    211: "137946.1.15",
                    212: "137946.1.16",
                    213: "137946.1.10",
                    214: "137946.1.11",
                    215: "137946.1.13",
                    216: "137946.1.14",
                    217: "137946.1.12",
                    218: "137946.1.9",
                    219: "137946.1.17",
                    220: "137946.1.18",
                    221: "137946.1.19",
                    222: "137946.1.20",
                    223: "137946.1.22",
                    224: "137946.1.23",
                    225: "137946.1.24",
                    226: "137946.1.25",
                    227: "137946.1.26",
                    228: "137946.1.27",
                    229: "137946.1.28"
                }[e] || "";
            },
            getToutiaoPtagExposure: function(e) {
                return {
                    201: "7575.1.5",
                    202: "7575.1.4",
                    203: "7575.1.1",
                    204: "7575.1.2",
                    205: "7575.1.2",
                    206: "7575.1.2",
                    207: "7575.1.3",
                    208: "7575.1.6",
                    209: "7575.1.7",
                    210: "7575.1.8",
                    211: "7575.1.16",
                    212: "7575.1.9",
                    213: "7575.1.11",
                    214: "7575.1.12",
                    215: "7575.1.14",
                    216: "7575.1.15",
                    217: "7575.1.13",
                    218: "7575.1.10",
                    219: "7575.1.19",
                    220: "7575.1.20",
                    221: "7575.1.21",
                    222: "7575.1.22",
                    223: "7575.1.23",
                    224: "7575.1.24",
                    225: "7575.1.25",
                    226: "7575.1.26",
                    227: "7575.1.27",
                    228: "7575.1.28",
                    229: "7575.1.29"
                }[e] || "";
            },
            getTypeName: function(e) {
                return {
                    201: "穿搭",
                    202: "家居",
                    203: "秒杀",
                    204: "推荐",
                    205: "推荐",
                    206: "推荐",
                    207: "专属价",
                    208: "资讯",
                    209: "资讯",
                    210: "清单",
                    211: "晒单",
                    212: "晒单",
                    213: "活动",
                    214: "礼包",
                    215: "资讯",
                    216: "清单",
                    217: "晒单",
                    218: "礼包",
                    219: "拼购",
                    220: "上新",
                    221: "买家秀",
                    222: "搭配",
                    223: "礼包",
                    224: "签到",
                    225: "抽奖",
                    226: "活动",
                    227: "充值福利",
                    228: "清单",
                    229: "视频"
                }[e] || "";
            }
        }
    };
};