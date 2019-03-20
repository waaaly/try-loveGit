function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}

var e = function() {
    function t(t, e) {
        var i = [], a = !0, n = !1, r = void 0;
        try {
            for (var o, l = t[Symbol.iterator](); !(a = (o = l.next()).done) && (i.push(o.value), 
            !e || i.length !== e); a = !0) ;
        } catch (t) {
            n = !0, r = t;
        } finally {
            try {
                !a && l.return && l.return();
            } finally {
                if (n) throw r;
            }
        }
        return i;
    }
    return function(e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), i = t(require("../../api/Ptag/Ptag_constants.js")), a = require("../../api/Ptag/Ptag_utils.js"), n = require("../../bases/component"), r = t(require("../../common/cookie-v2/cookie.js")), o = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../libs/promise.min.js")), l = require("./constant.js"), s = new (require("../../common/logger.js").Logger)("拼购商详分享"), h = "https://img10.360buyimg.com/jdphoto/s26x26_jfs/t18565/303/2499380355/407/3ae7cd7f/5af8f737Nb8b5c33f.png", c = "https://img10.360buyimg.com/jdphoto/s58x28_jfs/t9451/359/415622649/15318/b0943e5d/59a78495N3bd2a9f8.png", d = function(t, e) {
    t = t.split("."), e = e.split(".");
    for (var i = Math.max(t.length, e.length); t.length < i; ) t.push("0");
    for (;e.length < i; ) e.push("0");
    for (var a = 0; a < i; a++) {
        var n = parseInt(t[a]), r = parseInt(e[a]);
        if (n > r) return 1;
        if (n < r) return -1;
    }
    return 0;
}(getApp().systemInfo.SDKVersion, "1.9.90") >= 0;

new n.JDComponent({
    properties: {
        shareOptions: {
            type: Object
        },
        showShareLayerFlag: {
            type: Boolean,
            value: !0
        },
        showShareDetailFlag: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        previewImgUrl: "",
        isFirstTimeSave: !0,
        iconPlusUrl: c,
        iconCheckUrl: h,
        firstFlagUrl: "",
        ctx: "",
        isPingouApp: 2 == r.getCookie("wxapp_type")
    },
    ready: function() {
        this.data.ctx = wx.createCanvasContext("preview-canvas", this);
    },
    methods: {
        closeShareLayer: function() {
            this.closeShareDetail(), this.triggerEvent("closeShareLayer");
        },
        showShareDetail: function() {
            a.PtagUtils.addPtag("7583.1.8"), this.setData({
                showShareDetailFlag: !0
            }), this.data.previewImgUrl || this.initPreviewImage();
        },
        closeShareDetail: function() {
            this.setData({
                showShareDetailFlag: !1
            });
        },
        initPreviewImage: function() {
            var t = this, n = this.data.shareOptions, l = n.sku, d = n.cover, f = /\/\/(\w+).360buyimg/;
            d.replace(f, function(t, e, i, a) {
                return d = a.replace(e, "img10").replace(/^(https?:)?\/\//i, "https://"), a.replace(e, "img10");
            }), l && (l = ("" + l).trim()), wx.showLoading({
                title: "图片生成中...",
                mask: !0
            });
            var u = this.data.isPingouApp ? "https://img11.360buyimg.com/jdphoto/s750x1334_jfs/t20173/7/708042769/13884/b824176f/5b1633a7Nde3d7be7.png" : "https://img11.360buyimg.com/jdphoto/s750x1334_jfs/t19843/342/1156962245/13448/cc3ab0af/5b1633a6Nd77c1082.png", g = r.getCookie("wxAvatarUrl");
            g = g || r.getCookie("avatarUrl") || "https://img10.360buyimg.com/jdphoto/s100x100_jfs/t1951/176/1222496278/15607/bbb3b2eb/568cdbf0N4d33c2a4.png";
            var x = [ this.loadWXACode(l), this.loadImageByUrl(u.replace("//img11", "//img10")), this.loadImageByUrl(d), this.loadImageByUrl(h), this.loadImageByUrl(c), this.loadImageByUrl(g.replace("//img11", "//img10")) ];
            o.default.all(x).then(function(n) {
                var r = e(n, 6), o = r[0], l = r[1], h = r[2], c = r[3], d = r[4], f = r[5];
                s.log("wxacodeUrl:" + o), s.log("bgImgUrl:" + l), s.log("coverUrl:" + h), s.log("iconCheckUrl:" + c), 
                s.log("iconPlusUrl:" + d), s.log("avatarUrl:" + f), o && l && h && c && d && f ? (t.setData({
                    iconCheckUrl: c,
                    iconPlusUrl: d
                }), t.renderPreviewImage(l, o, h, f, function() {
                    wx.hideLoading(), a.PtagUtils.addPtag(i.DETAIL_SHARE_PIC_SUCCESS);
                })) : (wx.hideLoading(), wx.showToast({
                    title: "图片生成失败",
                    icon: "none"
                }), t.closeShareLayer(), a.PtagUtils.addPtag(i.DETAIL_SHARE_PIC_FAIL));
            });
        },
        loadImageByUrl: function(t) {
            return new o.default(function(e, i) {
                wx.downloadFile({
                    url: t,
                    success: function(t) {
                        e(200 === t.statusCode ? t.tempFilePath : "");
                    },
                    fail: function(t) {
                        e("");
                    }
                });
            });
        },
        loadWXACode: function(t) {
            var e = "https://wq.jd.com/bases/wxapi/getwxacode?scene=" + encodeURIComponent("sku=" + t + "&share=1") + "&page=pages/item/pingou/pingou&width=280&apptype=" + (this.data.isPingouApp ? 2 : 1);
            return new o.default(function(t, i) {
                wx.downloadFile({
                    url: e,
                    success: function(e) {
                        t(200 === e.statusCode ? e.tempFilePath : "");
                    },
                    fail: function(e) {
                        t("");
                    }
                });
            });
        },
        renderPreviewImage: function(t, e, i, a, n) {
            var o = this.data.ctx, l = this.data.shareOptions, s = l.name, h = l.price, c = l.kaiTuanNum, d = l.tuanMember, f = l.serviceInfo.map(function(t) {
                return t.tips;
            });
            if (f.length && f.length > 3) {
                var u = [], g = [];
                f.forEach(function(t) {
                    -1 != t.indexOf("七天退货") || -1 != t.indexOf("99元免基础运费") || -1 != t.indexOf("发货&") ? g.push(t) : u.push(t);
                }), g.length < 3 && (g = g.concat(u.slice(0, 3 - g.length))), f = g;
            }
            var x = {
                headImg: a,
                productImg: i,
                title: s && s.substring(0, 21) + "…",
                priceInt: h,
                tuanNum: c,
                tuanMember: d,
                serviceInfo: f,
                nickName: r.getCookie("wxNickName") || r.getCookie("nickName") || "京东用户"
            };
            o.drawImage(t, 0, 0, 750, 1334), this.drawDialogBox(), this.drawHeadImg(this.Point(60, 60), 30, x.headImg), 
            this.drawNick(x.nickName, 110, 70), this.drawComment("发现一个好物，推荐给你呀", 30, 140), this.drawProductInfo(this.Point(60, 210), 630, 630, x), 
            this.drawServiceInfo(this.Point(70, 945), f), this.renderWXACode(e), o.draw(!1, function() {
                this.printCanvas(n);
            }.bind(this));
        },
        printCanvas: function(t) {
            wx.canvasToTempFilePath({
                canvasId: "preview-canvas",
                complete: function(e) {
                    t && t(), this.setData({
                        previewImgUrl: e.tempFilePath
                    });
                }.bind(this)
            }, this);
        },
        doPreviewImage: function() {
            var t = this.data.previewImgUrl;
            t && wx.previewImage({
                urls: [ t ]
            });
        },
        doSaveImage: function() {
            var t = this.data.previewImgUrl;
            t && (a.PtagUtils.addPtag(i.DETAIL_SHARE_BTN_SAVE), wx.saveImageToPhotosAlbum({
                filePath: t,
                success: function() {
                    wx.showToast({
                        title: "已保存到相册",
                        icon: "none"
                    }), this.closeShareLayer(), a.PtagUtils.addPtag(i.DEATIL_SHARE_SAVE_SUCCESS);
                }.bind(this),
                fail: function() {
                    if (this.data.isFirstTimeSave) return wx.showToast({
                        title: "图片保存失败",
                        icon: "none"
                    }), void this.setData({
                        isFirstTimeSave: !1
                    });
                    wx.openSetting({
                        success: function(t) {
                            t.authSetting["scope.writePhotosAlbum"] || wx.showToast({
                                title: "请点击保存图片并开启保存到相册权限",
                                icon: "none",
                                duration: 3e3
                            });
                        },
                        fail: function() {
                            wx.showToast({
                                title: "图片保存失败",
                                icon: "none"
                            });
                        }
                    });
                }.bind(this)
            }));
        },
        renderSKUFlags: function(t, e) {
            var i = this.data.ctx, a = e;
            if (t && t.length) {
                var n = l.TITLE_ICONS[t[0]];
                i.drawImage(this.data.firstFlagUrl, a, 95, n.width, n.height), a += n.width;
            }
            return a;
        },
        renderSKUName: function(t, e, i) {
            var a = this.data.ctx, n = Math.floor(i / 32), r = "", o = 0;
            if (a.setFillStyle("#333333"), a.setFontSize(32), a.setTextAlign("left"), a.setTextBaseline("middle"), 
            d) {
                if (a.measureText(t).width > i) {
                    for (;o <= i - 64; ) r = t.slice(0, n), o = a.measureText(r).width, n++;
                    t = r + "...";
                }
            } else t = (r = t.slice(0, n - 1)) + "...";
            a.fillText(t, e, 110);
        },
        renderPrice: function(t) {
            var e = this.data.ctx, i = 30, a = t[0], n = t[1] || {}, r = t[0].split(".");
            e.setFillStyle("#E93B3D"), e.setFontSize(32), e.setTextAlign("left"), e.setTextBaseline("normal"), 
            e.fillText("¥", i, 180, 32), i += 32, d ? (e.setFontSize(44), e.fillText(r[0], i, 180), 
            i += e.measureText(r[0]).width, i += 2, r[1] && (e.setFontSize(32), e.fillText("." + r[1], i, 180), 
            i += e.measureText("." + r[1]).width, i += 10), "plus" === n.type && (e.setFontSize(32), 
            e.setFillStyle("#333333"), e.fillText("¥" + n.price, i, 180), i += e.measureText("¥" + n.price).width, 
            i += 8, e.drawImage(this.data.iconPlusUrl, i, 156, 58, 28))) : (e.setFontSize(44), 
            e.fillText(a, i, 180));
        },
        renderPromiseItems: function() {
            var t = this.data.ctx, e = 0, i = [];
            if (this.data.shareOptions.service.forEach(function(t) {
                t.iconState && i.push(t.name);
            }), (i = i.slice(0, 3)).length) {
                t.setFillStyle("#999999"), t.setFontSize(20), t.setTextAlign("left"), t.setTextBaseline("top");
                for (var a = 0; a < i.length; a++) {
                    var n = e + 24, r = n + 10 + 26, o = r + t.measureText(i[a]).width;
                    o <= 720 && (t.drawImage(this.data.iconCheckUrl, n, 210, 26, 26), t.fillText(i[a], r, 210), 
                    e = o);
                }
            }
        },
        renderWXACode: function(t) {
            this.data.ctx.drawImage(t, 90, 1024, 220, 220);
        },
        Rect: function(t, e, i, a) {
            return {
                x: t,
                y: e,
                width: i,
                height: a
            };
        },
        Point: function(t, e) {
            return {
                x: t,
                y: e
            };
        },
        drawHeadImg: function(t, e, i) {
            var a = this.data.ctx;
            a.beginPath(), a.drawImage(i, t.x - e, t.y - e, 2 * e, 2 * e), a.fillStyle = "transparent", 
            a.arc(t.x, t.y, e + 10, 0, 2 * Math.PI), a.fill(), a.lineWidth = 20, a.strokeStyle = "white", 
            a.stroke(), a.closePath();
        },
        drawNick: function(t, e, i) {
            var a = this.data.ctx;
            a.beginPath(), a.font = "28px Verdana", a.fillStyle = "#999999", a.fillText(t, e, i);
        },
        drawComment: function(t, e, i) {
            var a = this.data.ctx;
            a.beginPath(), a.font = "32px Verdana", a.fillStyle = "#333333", a.fillText(t, e, i);
        },
        drawProductInfo: function(t, e, i, a) {
            var n = this.data.ctx;
            n.beginPath(), n.drawImage(a.productImg, t.x, t.y, e, i), n.rect(t.x, t.y + 560, e, 70), 
            n.globalAlpha = .6, n.fillStyle = "#F7F7F7", n.fill(), a.title && (n.font = "28px Verdana", 
            n.fillStyle = "#000000", n.fillText(a.title, t.x + 20, t.y + 600), n.closePath()), 
            a.tuanMember && (n.globalAlpha = 1, n.font = "24px Verdana", n.fillStyle = "#E93B3D", 
            n.fillText(a.tuanMember + "人拼", t.x, t.y + 690)), a.priceInt && (n.font = "24px Verdana", 
            n.fillStyle = "#E93B3D", n.fillText("￥", t.x + 85, t.y + 690), n.font = "32px Verdana", 
            n.fillStyle = "#E93B3D", n.fillText(a.priceInt, t.x + 100, t.y + 690)), a.priceFloat && (n.font = "24px Verdana", 
            n.fillStyle = "#E93B3D", n.fillText(a.priceFloat, t.x + 180, t.y + 690)), a.tuanNum && (n.font = "24px Verdana", 
            n.fillStyle = "#999999", n.fillText("已拼" + (a.tuanNum || 2) + "件", t.x + 460, t.y + 690), 
            n.closePath());
        },
        drawRoundedRect: function(t, e, i) {
            var a = this.data.ctx, n = this.Point(t.x + e, t.y), r = this.Point(t.x + t.width, t.y), o = this.Point(t.x + t.width, t.y + t.height), l = this.Point(t.x, t.y + t.height), s = this.Point(t.x, t.y);
            a.beginPath(), a.moveTo(n.x, n.y), a.arcTo(r.x, r.y, o.x, o.y, e), a.arcTo(o.x, o.y, l.x, l.y, e), 
            a.arcTo(l.x, l.y, s.x, s.y, e), a.arcTo(s.x, s.y, n.x, n.y, e), a.strokeStyle = i, 
            a.stroke(), a.closePath();
        },
        drawDialogAngle: function(t, e) {
            var i = this.data.ctx;
            i.beginPath(), i.moveTo(t.x, t.y), i.lineTo(t.x + 10, t.y - 10), i.lineTo(t.x + 20, t.y), 
            i.strokeStyle = e, i.stroke(), i.closePath(), i.beginPath(), i.moveTo(t.x + 2, t.y), 
            i.lineTo(t.x + 19, t.y), i.lineWidth = 2, i.strokeStyle = "white", i.stroke(), i.closePath();
        },
        drawDialogBox: function() {
            var t = this.Rect(30, 180, 690, 810);
            this.drawRoundedRect(t, 10, "#FE976C"), this.drawDialogAngle(this.Point(60, 180));
        },
        drawServiceInfo: function(t, e) {
            var i = this.data.ctx;
            i.beginPath(), e && e.length > 4 && (e = e.slice(0, 4));
            var a = 0;
            if (e.length > 0) for (var n = 0; n < e.length; n++) i.beginPath(), i.arc(t.x + a, t.y, 10, 0, 2 * Math.PI), 
            i.lineWidth = 1, i.strokeStyle = "#f97c54", i.stroke(), i.closePath(), i.beginPath(), 
            i.moveTo(t.x + a - 5, t.y, 10, 0, 2 * Math.PI), i.lineTo(t.x + a, t.y + 5, 10, 0, 2 * Math.PI), 
            i.lineTo(t.x + a + 6, t.y - 4, 10, 0, 2 * Math.PI), i.stroke(), i.closePath(), i.beginPath(), 
            i.font = "20px Verdana", i.fillStyle = "#999999", i.fillText(e[n], t.x + a + 20, t.y + 8), 
            i.closePath(), a += e[n].length >= 5 ? 200 : e[n].length >= 4 ? 140 : 130;
        }
    }
});