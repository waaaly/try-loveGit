var e = getApp(), t = e.globalData.mp, i = e.globalData.config;

Component({
    properties: {
        skuPriceInfo: {
            type: Object,
            value: {}
        },
        comeFrom: {
            type: String,
            value: ""
        }
    },
    data: {
        width: "",
        height: "",
        shareImg: "",
        rpx: "",
        canIUseOpenSetting: !1,
        isDoubleClick: !1,
        timer: null,
        skuPriceInfo: {},
        comeFrom: "",
        renderType: {},
        hiddenPoster: !1
    },
    detached: function() {
        var e = this;
        clearTimeout(e.data.timer), wx.hideLoading();
    },
    ready: function() {
        var e = this, r = JSON.parse(JSON.stringify(e.properties.skuPriceInfo)), n = {}, o = "", a = e.properties.comeFrom, s = "2", d = e.getSysInfo(1, 9, 91);
        if (wx.showLoading({
            title: "加载中...",
            mask: !0
        }), d) return wx.showModal({
            title: "提示",
            content: "请升级微信版本体验功能",
            showCancel: !1
        }), e.triggerEvent("cannotUseCtx", {}), !1;
        e.setData({
            skuPriceInfo: r,
            canIUseOpenSetting: e.getSysInfo(2, 0, 7),
            comeFrom: a
        });
        var c = wx.getSystemInfoSync().windowWidth / 750;
        e.setData({
            rpx: c,
            width: 542,
            height: 892
        }), n.isShowPrice = !0, n.shareContent = "长按图片识别小程序，立即购买", n.sbomAbbr = r.skuPriceInfo.sbomAbbr || r.skuPriceInfo.sbomName || r.skuPriceInfo.name, 
        r.teamBuyInfo ? (n.type = "teamGoods", n.teamBuyPrice = r.teamBuyInfo.teamBuyPrice, 
        r.teamBuyInfo.teamBuyPrice != r.skuPriceInfo.orderPrice && r.teamBuyInfo.teamBuyPrice != r.skuPriceInfo.price || (n.type = "samePriceTeam", 
        n.unitPrice = r.teamBuyInfo.teamBuyPrice), n.teamBuyNumber = r.teamBuyInfo.teamBuyNumber, 
        n.shareContent = "长按图片识别小程序，立即拼团", n.sbomAbbr = r.skuPriceInfo.sbomAbbr || r.skuPriceInfo.name || r.skuPriceInfo.sbomName) : r.skuRushBuyInfo ? (n.type = "normalGoods", 
        n.unitPrice = r.skuPriceInfo.orderPrice || "") : r.depositPrice ? (n.type = "previewGoods", 
        n.unitPrice = r.depositPrice || "") : r.limtTimeGoods ? (n.type = "limtTimeGoods", 
        n.unitPrice = r.skuPriceInfo.unitPrice || "") : (n.type = "normalGoods", n.unitPrice = r.skuPriceInfo.unitPrice || ""), 
        n.orderPrice = r.skuPriceInfo.orderPrice || "", n.imageUrl = i.service.cdnPath + r.skuPriceInfo.photoPath + "428_428_" + r.skuPriceInfo.photoName, 
        "teamBuy" == a ? (n.orderPrice = r.skuPriceInfo.price || "", o = JSON.stringify({
            teamCode: r.teamBuyInfo.teamCode.toString()
        }), s = "1") : (o = JSON.stringify({
            prdId: r.productId.toString(),
            skuCode: r.skuPriceInfo.sbomCode.toString()
        }), (2 == r.skuPriceInfo.priceMode && "previewGoods" != n.type || !r.skuPriceInfo.orderPrice && "previewGoods" != n.type) && (n.isShowPrice = !1)), 
        e.setData({
            renderType: n
        });
        var u = t.uuid(), h = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "https://m.vmall.com", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "text";
            return new Promise(function(n, o) {
                i["content-type"] = "application/json", i.Cookie = "euid=" + u + ";uid=;__ukmc=;userName=hwsc", 
                i.userId = i.userId ? i.userId : wx.getStorageSync("userId"), i.UA = i.UA ? i.UA : "VMall-MP 1.1.1.0", 
                t.portal = t.portal ? t.portal : "4", t.lang = t.lang ? t.lang : "zh-CN", t.country = t.country ? t.country : "CN", 
                wx.request({
                    url: e,
                    data: t,
                    header: i,
                    responseType: r,
                    success: function(e) {
                        n(e);
                    },
                    fail: function(e) {
                        o(e);
                    }
                });
            });
        };
        !function(e, t) {
            h(getApp().globalData.config.service.openApiDomain + "/csrftoken.js", {}).then(function(i) {
                if (!i.data || 200 != i.statusCode) return t && t(), !1;
                var r = i.data.replace(/^[\s\S]*csrftoken\s=\s"([a-zA-Z0-9-]+)";[\s\S]*$/g, "$1");
                "" != r && e && e(r);
            }, function() {
                t && t();
            });
        }(function(t) {
            h(i.service.openApiDomain + "/mcp/share/queryShareQRCode", {
                type: s,
                scene: o
            }, {
                CsrfToken: t
            }, "arraybuffer").then(function(t) {
                var i = wx.getFileSystemManager(), r = wx.env.USER_DATA_PATH + "/share_img.jpg";
                t.data.byteLength > 150 ? i.writeFile({
                    filePath: r,
                    data: t.data,
                    encoding: "binary",
                    success: function() {
                        e.setData({
                            fileName: r
                        }), e.getImagePath(n.imageUrl);
                    },
                    fail: function() {
                        e.setData({
                            fileName: "./imgs/vmall_index.jpg"
                        }), e.getImagePath(n.imageUrl);
                    }
                }) : (e.setData({
                    fileName: "./imgs/vmall_index.jpg"
                }), e.getImagePath(n.imageUrl));
            }).catch(function() {
                e.setData({
                    fileName: "./imgs/vmall_index.jpg"
                }), e.getImagePath(n.imageUrl), wx.hideLoading();
            });
        });
    },
    methods: {
        handlePoster: function(e) {
            var t = this;
            wx.getSetting({
                success: function(e) {
                    e.authSetting["scope.writePhotosAlbum"] ? wx.saveImageToPhotosAlbum({
                        filePath: t.data.filePath,
                        success: function() {
                            t.triggerEvent("closePoster", {});
                        },
                        fail: function(e) {
                            wx.showModal({
                                title: "未允许使用相册权限",
                                content: "请在系统设置-微信里打开允许微信使用微信相册的开关",
                                showCancel: !1
                            });
                        }
                    }) : wx.authorize({
                        scope: "scope.writePhotosAlbum",
                        success: function(e) {
                            wx.saveImageToPhotosAlbum({
                                filePath: t.data.filePath,
                                success: function() {
                                    t.triggerEvent("closePoster", {});
                                },
                                fail: function(e) {
                                    wx.showModal({
                                        title: "未允许使用相册权限",
                                        content: "请在系统设置-微信里打开允许微信使用微信相册的开关",
                                        showCancel: !1
                                    });
                                }
                            });
                        },
                        fail: function(e) {
                            t.setData({
                                hiddenPoster: !0,
                                showSetModel: !0
                            }), t.triggerEvent("hiddenAll", {});
                        }
                    });
                },
                fail: function(e) {
                    wx.showToast({
                        title: "图片保存失败",
                        icon: "none",
                        mask: !0
                    });
                }
            });
        },
        savePoster: function() {
            var e = this;
            if (e.stopDoubleClick()) return !1;
            wx.canvasToTempFilePath({
                canvasId: "myCanvas",
                success: function(t) {
                    e.setData({
                        filePath: t.tempFilePath
                    }), e.handlePoster();
                },
                fail: function(e) {
                    wx.showToast({
                        title: "图片保存失败",
                        icon: "none",
                        mask: !0
                    });
                }
            }, this);
        },
        renderPoster: function() {
            var e = wx.createCanvasContext("myCanvas", this), t = this, i = this.data.renderType, r = this.data.rpx, n = i.teamBuyPrice ? "¥" + i.teamBuyPrice.toString() : "", o = i.teamBuyNumber ? i.teamBuyNumber + "人团" : "", a = i.orderPrice ? "¥" + i.orderPrice.toString() : "", s = i.unitPrice ? "¥" + i.unitPrice.toString() : "";
            this.fixRender(e, r), this.dynamicRender(e, r, n, o, a, s), e.draw(), t.triggerEvent("showAllPoster", {}), 
            wx.hideLoading();
        },
        fixRender: function(e, t) {
            e.clearRect(0, 0, 0, 0);
            var i = 542 * t, r = 892 * t;
            e.drawImage("./imgs/post_bg.png", 0, 0, i, r), e.drawImage(this.data.fileName, 54 * t, 733 * t, 117 * t, 117 * t), 
            e.drawImage(this.data.bannerImg, (542 * t - 375 * t) / 2, 125 * t, 375 * t, 375 * t), 
            this.textRect(e, this.data.renderType.shareContent, 192 * t, 758 * t, "normal normal " + Math.round(21 * t) + "px  Arial", "#333"), 
            this.textRect(e, "分享自 华为商城", 192 * t, 798 * t, "normal normal " + Math.round(21 * t) + "px  Arial", "#999"), 
            this.wordWrap(e, this.data.renderType.sbomAbbr, 271 * t, 573 * t, 375 * t, 33 * t, "" + Math.round(23 * t), "center");
        },
        dynamicRender: function(e, t, i, r, n, o) {
            if (e.save(), !this.data.renderType.isShowPrice) {
                var a = this.redTextRender(e, t, 25, "价格还未公开，敬请期待"), s = a;
                return this.redTextRender(e, t, 25, "价格还未公开，敬请期待", a, -Math.round(10 * t), s, "bold"), 
                !1;
            }
            if ("normalGoods" == this.data.renderType.type || "limtTimeGoods" == this.data.renderType.type) {
                if (n == o) {
                    var d = this.redTextRender(e, t, 31, o);
                    this.redTextRender(e, t, 31, o, d, -Math.round(10 * t), d);
                } else {
                    var c = this.redTextRender(e, t, 31, o), u = this.redBottomText(e, t, "限时特惠") + Math.round(20 * t), h = this.delPrice(e, t, n), l = c + u + h + 2 * Math.round(10 * t);
                    this.redTextRender(e, t, 31, o, c, u, l), this.delLine(e, t, c, u, h, l), this.delPrice(e, t, n, c, u, l), 
                    this.redRectangle(e, t, u, l), this.redBottomText(e, t, "限时特惠", u, l);
                }
                return !1;
            }
            if ("previewGoods" == this.data.renderType.type || "samePriceTeam" == this.data.renderType.type) {
                var m = this.redTextRender(e, t, 31, o), f = void 0, g = m + (f = "samePriceTeam" == this.data.renderType.type ? this.redBottomText(e, t, r) + Math.round(20 * t) : this.redBottomText(e, t, "订金") + Math.round(20 * t)) + Math.round(10 * t);
                return this.redTextRender(e, t, 31, o, m, f, g), this.redRectangle(e, t, f, g), 
                "samePriceTeam" == this.data.renderType.type ? this.redBottomText(e, t, r, f, g) : this.redBottomText(e, t, "订金", f, g), 
                !1;
            }
            var p = this.redTextRender(e, t, 31, i), P = this.redBottomText(e, t, r) + Math.round(20 * t), y = this.delPrice(e, t, n), x = p + P + y + 2 * Math.round(10 * t);
            this.redTextRender(e, t, 31, i, p, P, x), this.delLine(e, t, p, P, y, x), this.delPrice(e, t, n, p, P, x), 
            this.redRectangle(e, t, P, x), this.redBottomText(e, t, r, P, x);
        },
        redTextRender: function(e, t, i, r) {
            var n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0, o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0, a = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0, s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "bold", d = "#ca141d";
            return n || (d = "transparent"), this.textRect(e, r, 271 * t - a / 2 + o + Math.round(10 * t), 542 * t, "normal " + s + " " + Math.round(t * i) + "px Arial", d, "middle", "left"), 
            e.measureText(r).width;
        },
        redBottomText: function(e, t, i, r, n) {
            var o = "White";
            return r || (o = "transparent"), this.textRect(e, i, 271 * t - n / 2 + Math.round(10 * t), 542 * t, Math.floor(21 * t) + "px Arial", o, "middle", "left"), 
            e.measureText(i).width;
        },
        redRectangle: function(e, t, i, r) {
            this.roundRect(e, 271 * t - r / 2, 525 * t, i, 33 * t, 33 * t / 2, "#ca141d");
        },
        delPrice: function(e, t, i) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0, o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0, a = "#999";
            return r || (a = "transparent"), this.textRect(e, i, 271 * t - o / 2 + r + n + Math.round(20 * t), 542 * t, Math.round(23 * t) + "px Arial", a, "middle", "left"), 
            e.measureText(i).width;
        },
        delLine: function(e, t, i, r, n, o) {
            e.setStrokeStyle("#999"), e.moveTo(271 * t - o / 2 + i + r + Math.round(20 * t), 542 * t), 
            e.lineTo(271 * t - o / 2 + i + r + n + Math.round(20 * t), 542 * t), e.stroke();
        },
        roundRect: function(e, t, i, r, n, o, a) {
            e.beginPath(), e.setFillStyle(a), e.arc(t + o, i + o, o, Math.PI, 1.5 * Math.PI), 
            e.moveTo(t + o, i), e.lineTo(t + r - o, i), e.lineTo(t + r, i + o), e.arc(t + r - o, i + o, o, 1.5 * Math.PI, 2 * Math.PI), 
            e.lineTo(t + r, i + n - o), e.lineTo(t + r - o, i + n), e.arc(t + r - o, i + n - o, o, 0, .5 * Math.PI), 
            e.lineTo(t + o, i + n), e.lineTo(t, i + n - o), e.arc(t + o, i + n - o, o, .5 * Math.PI, Math.PI), 
            e.lineTo(t, i + o), e.lineTo(t + o, i), e.fill(), e.closePath(), e.clip();
        },
        textRect: function(e, t, i, r, n, o, a, s) {
            e.beginPath(), e.font = n, e.setTextBaseline(a || "top"), e.setTextAlign(s || "left"), 
            e.setFillStyle(o), e.fillText(t, i, r), e.closePath();
        },
        wordWrap: function(e, t, i, r, n, o, a, s) {
            var d = t.split(""), c = "", u = [];
            e.setFontSize(a), e.setFillStyle("#000");
            for (g = 0; g < d.length; g++) e.measureText(c).width < n ? c += d[g] : (g--, u.push(c), 
            c = "");
            if (u.push(c), u.length > 2) {
                for (var h = u.slice(0, 2), l = h[1], m = "", f = [], g = 0; g < l.length && e.measureText(m).width < n - a; g++) m += l[g];
                f.push(m);
                var p = f[0] + "...";
                h.splice(1, 1, p), u = h;
            }
            for (var P = 0; P < u.length; P++) e.setTextAlign(s), e.fillText(u[P], i, r + P * o);
        },
        getImagePath: function(e) {
            var t = this;
            "string" == typeof e && wx.getImageInfo({
                src: e,
                success: function(e) {
                    t.setData({
                        bannerImg: e.path
                    }), t.renderPoster();
                },
                fail: function(e) {
                    t.setData({
                        bannerImg: "./imgs/post_err.png"
                    }), t.renderPoster();
                }
            });
        },
        getAuthority: function() {
            var e = this;
            e.triggerEvent("showButton", {}), e.data.canIUseOpenSetting && wx.openSetting && wx.openSetting({
                success: function(t) {
                    e.setData({
                        showSetModel: !1,
                        hiddenPoster: !1
                    });
                }
            }), wx.openSetting || wx.showModal({
                title: "提示",
                content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
            });
        },
        closeSetModel: function() {
            this.triggerEvent("showButton", {}), this.setData({
                hiddenPoster: !1,
                showSetModel: !1
            });
        },
        getSysInfo: function(e, t, i) {
            var r = "";
            wx.getSystemInfo({
                success: function(e) {
                    r = e.SDKVersion;
                }
            });
            var n = r.split(".");
            return !!Number(n[0] < e) || Number(n[0]) == e && Number(n[1]) == t && Number(n[2]) < i;
        },
        stopDoubleClick: function() {
            var e = this;
            return !!e.data.isDoubleClick || (e.setData({
                isDoubleClick: !0
            }), e.data.timer = setTimeout(function() {
                e.setData({
                    isDoubleClick: !1
                });
            }, 2e3), !1);
        },
        setModelHidden: function() {
            var e = this;
            e.triggerEvent("showButton", {}), e.setData({
                showSetModel: !1,
                hiddenPoster: !1
            });
        }
    }
});