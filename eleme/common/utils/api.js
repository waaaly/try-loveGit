var e = require("../services/hosts"), r = e.crayfish4weapp, t = e.crayfishlite, o = require("../../dave/dave.js"), n = o.User, i = o.ApiCreater, a = require("../../common/services/hosts"), u = a.apiHost, s = a.apiNewRetailHost, d = "", c = function(e) {
    var r = e.data["set-cookie"];
    return Array.isArray(r) && (r = r.join(" ")), r;
}, l = function(e) {
    var r = JSON.parse(e.data.body), t = (c(e).match(/eleme__ele_me=([^;]+)/) || [])[1] || "";
    return t && (d = t), e.data = r, e;
}, h = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return i(e, r).then(function(e) {
        var r = e.data, t = e.statusCode;
        return t >= 400 || t < 200 ? (console.error(r), null) : r;
    });
}, m = function() {
    return parseInt(wx.getStorageSync("CURRENT_RESTAURANT_ID"));
}, f = {
    getDisclaimer: function() {
        return i({
            url: r + "/disclaimer"
        });
    },
    getFrontpage: function(e) {
        return i({
            url: "/pizza/v1/frontpage",
            data: e
        });
    },
    getEntriesV2: function(e) {
        return i({
            url: "/shopping/v2/entries?templates[]=main_template",
            data: e
        });
    },
    getEntries: function(e) {
        return i({
            url: "/pizza/v1/entries",
            data: e
        });
    },
    getWhether: function(e) {
        return i({
            url: "/pizza/v1/weather",
            data: e
        });
    },
    loginByWechat: function(e) {
        return i({
            url: "/pizza/v1/wechat/" + e,
            method: "POST"
        });
    },
    loginByPhone: function(e) {
        return i({
            url: "/pizza/v1/login/mobile",
            method: "POST",
            data: e
        });
    },
    sendSMSCode: function(e) {
        return i({
            url: "/v4/mobile/verify_code/send",
            method: "POST",
            data: e
        });
    },
    sendCartVoiceCode: function(e, r) {
        return i({
            url: "/booking/v1/carts/" + e + "/verify_code",
            method: "POST",
            data: {
                sig: r,
                veri_type: "voice"
            }
        }, {
            shopId: m()
        });
    },
    getProfile: function(e) {
        return i({
            url: "/eus/v1/users/" + e,
            header: {
                cookie: "SID=" + n.SID
            }
        });
    },
    getGeohashPosition: function(e) {
        var r = e.latitude, t = e.longitude;
        return i({
            url: "/bgs/poi/reverse_geo_coding?latitude=" + r + "&longitude=" + t
        });
    },
    getNearbyAddress: function(e) {
        return i({
            url: "/v2/pois?type=nearby&limit=3&geohash=" + e
        });
    },
    searchAddress: function(e) {
        return i({
            url: "/bgs/poi/search_poi_nearby",
            data: e
        });
    },
    getOrderDetail: function(e) {
        return i({
            url: "/pizza/v1/user/orders/" + e,
            header: {
                cookie: "SID=" + n.SID
            }
        }, {
            orderId: e
        });
    },
    getOrderOntime: function(e) {
        return i({
            url: "/bos/v2/users/" + n.id + "/orders/" + e + "/ontime",
            header: {
                cookie: "SID=" + n.SID
            }
        }, {
            orderId: e
        });
    },
    getUserOrders: function(e) {
        return i({
            url: "/bos/v2/users/" + n.id + "/orders",
            header: {
                cookie: "SID=" + n.SID
            },
            data: e
        });
    },
    orderRebuy: function(e) {
        return i({
            url: "/booking/v1/users/" + n.id + "/orders/" + e + "/rebuy?geohash=" + wx.getStorageSync("PLACE").geohash,
            header: {
                cookie: "SID=" + n.SID
            }
        }, {
            orderId: e
        });
    },
    orderConfirm: function(e) {
        return i({
            url: "/bos/v1/users/" + n.id + "/orders/" + e + "/confirmation",
            header: {
                cookie: "SID=" + n.SID
            },
            method: "POST"
        }, {
            orderId: e
        });
    },
    orderCancel: function(e) {
        return i({
            url: "/bos/v1/users/" + n.id + "/orders/" + e + "/cancellation",
            header: {
                cookie: "SID=" + n.SID
            },
            data: {
                refund_intention: 0
            },
            method: "POST"
        }, {
            orderId: e
        });
    },
    orderReminding: function(e) {
        return i({
            url: "/bos/v1/users/" + n.id + "/orders/" + e + "/reminding",
            header: {
                cookie: "SID=" + n.SID
            },
            method: "POST"
        }, {
            orderId: e
        });
    },
    getShops: function(e, r) {
        var t = e.isNewRetail, o = {};
        return t || (e.terminal = "weapp", n.id && (o = {
            Cookie: "SID=" + n.SID + "; USERID=" + n.id
        }, e.user_id = n.id)), t ? i({
            url: s + "/newretail/main/shoplist",
            data: e
        }).then(function(e) {
            return {
                data: e.data.result.shop_list.map(function(e) {
                    return e.id = e.ele_id, e;
                })
            };
        }) : i({
            url: r || "/pizza/v1/restaurants",
            header: o,
            data: e
        });
    },
    getShopAmount: function(e) {
        return i({
            url: "/pizza/v1/restaurant_amount",
            data: e
        });
    },
    getShopDetail: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", r = arguments[1], t = r.latitude, o = r.longitude;
        return r.isNewRetail ? h({
            url: s + "/newretail/shop/getshopinfo",
            data: {
                shop_id: e,
                lat: t,
                lng: o
            }
        }).then(function(r) {
            var n = r.result, i = {};
            i.info = {}, i.info.id = e, i.info.ele_id = n.ele_id, i.info.activities = Array.isArray(n.activities) ? n.activities.map(function(e) {
                var r = {};
                return r.description = e.description, r.icon_name = e.icon_name, r.icon_color = e.icon_color, 
                r.tips = e.tips || e.description, r.name = e.name, r;
            }) : [], n.takeout_invoice && i.info.activities.push({
                icon_name: "票",
                icon_color: "999",
                description: "0" === n.takeout_invoice_min_price ? "该商家支持开发票，请在下单时填写好发票开头" : "该商家支持开发票，开票订单金额￥" + n.takeout_invoice_min_price + "元起，请在下单时填写好发票开头"
            }), i.info.address = n.address, i.info.name = n.name, i.info.piecewise_agent_fee = {
                description: "配送费¥" + n.takeout_cost,
                tips: "配送费¥" + n.takeout_cost,
                rules: [ {
                    price: n.takeout_price
                } ]
            }, i.info.status = n.business_status, i.info.rating = n.shop_score, i.info.recent_order_num = n.recent_order_num, 
            i.info.float_minimum_order_amount = n.takeout_price;
            var a = JSON.parse(n.takeout_open_time);
            return a = a.map(function(e) {
                return e.start + "-" + e.end;
            }), i.info.opening_hours = a.join("、"), i.info.order_lead_time = n.order_lead_time, 
            i.info.distance = n.distance, i.info.promotion_info = n.promotion_info, i.info.delivery_mode = n.delivery_mode, 
            i.info.image_path = n.image_path, i.info.is_premium = !!n.brand_id || !!n.brand, 
            i.ratings = {}, f.getShopDetail(n.ele_id, {
                longitude: o,
                latitude: t,
                isNewRetail: !1
            }).then(function(e) {
                return i.ratings = e.ratings, i.info.rating = e.info.rating, i;
            });
        }) : h({
            url: u + "/pizza/v1/restaurants/" + e,
            data: {
                extras: [ "activities" ],
                latitude: t,
                longitude: o,
                terminal: "weapp"
            }
        }, {
            shopId: e
        });
    },
    getScore: function(e) {
        return h({
            url: u + "/ugc/v3/restaurants/" + e + "/ratings/scores"
        });
    },
    getTags: function(e) {
        return h({
            url: u + "/ugc/v2/restaurants/" + e + "/ratings/tags"
        });
    },
    getShopMenu: function(e) {
        return i({
            url: "/pizza/v1/restaurants/" + e + "/menu"
        }, {
            shopId: e
        });
    },
    getShopRatings: function(e, r) {
        return i({
            url: "/ugc/v3/restaurants/" + e + "/ratings",
            data: r
        }, {
            shopId: e
        });
    },
    getOneShopRatings: function(e) {
        return i({
            url: "/pizza/v1/restaurants/" + e + "/ratings?offset=0&limit=1"
        }, {
            shopId: e
        });
    },
    getShopCategories: function(e) {
        return i({
            url: "/pizza/v1/restaurants/categories",
            data: e
        });
    },
    getShopFilters: function(e) {
        return i({
            url: "/shopping/v1/restaurants/filter-bar/attributes",
            data: e
        });
    },
    getBatchFilters: function(e) {
        return i({
            url: "/pizza/shopping/restaurants/batch_filter",
            data: e
        });
    },
    getAddressList: function() {
        return i({
            url: "/member/v1/users/" + n.id + "/addresses",
            header: {
                Cookie: "SID=" + n.SID
            }
        });
    },
    getAddressesForCart: function(e, r) {
        return i({
            url: "/booking/v1/users/" + n.id + "/carts/" + e + "/addresses",
            header: {
                Cookie: "SID=" + n.SID
            },
            data: r
        }, {
            shopId: m()
        });
    },
    createAddress: function(e) {
        return i({
            url: "/member/v1/users/" + n.id + "/addresses",
            header: {
                Cookie: "SID=" + n.SID
            },
            method: "POST",
            data: e
        });
    },
    deleteAddress: function(e) {
        return i({
            url: "/member/v1/users/" + n.id + "/addresses/" + e,
            header: {
                Cookie: "SID=" + n.SID
            },
            method: "DELETE"
        });
    },
    updateAddress: function(e) {
        return i({
            url: "/member/v1/users/" + n.id + "/addresses/" + e.id,
            header: {
                Cookie: "SID=" + n.SID
            },
            method: "PUT",
            data: e
        });
    },
    getRemarks: function(e, r) {
        return i({
            url: "/v1/carts/" + e + "/remarks",
            data: {
                sig: r
            }
        }, {
            shopId: m()
        });
    },
    getWeixinSesstion: function(e) {
        return i({
            url: "/pizza/v1/waltz/session",
            method: "POST",
            data: e
        });
    },
    getWexinPaymentParameters: function(e, r) {
        return i({
            url: "/pizza/v1/user/orders/" + e + "/pay",
            method: "POST",
            header: {
                Cookie: "SID=" + n.SID
            },
            data: r
        }, {
            orderId: e
        });
    },
    getInvoiceList: function() {
        return i({
            url: "/member/v2/users/" + n.id + "/invoices",
            header: {
                Cookie: "SID=" + n.SID
            }
        }, {
            shopId: m()
        });
    },
    createInvoice: function(e) {
        return i({
            url: "/member/v2/users/" + n.id + "/invoices",
            method: "POST",
            header: {
                Cookie: "SID=" + n.SID
            },
            data: e
        }, {
            shopId: m()
        });
    },
    deleteInvoice: function(e) {
        return i({
            url: "/member/v2/users/" + n.id + "/invoices/" + e,
            method: "DELETE",
            header: {
                Cookie: "SID=" + n.SID
            }
        }, {
            shopId: m()
        });
    },
    updateInvoice: function(e, r) {
        return i({
            url: "/member/v2/users/" + n.id + "/invoices/" + e,
            method: "PUT",
            header: {
                Cookie: "SID=" + n.SID
            },
            data: r
        }, {
            shopId: m()
        });
    },
    getHongbaos: function() {
        return i({
            url: "/promotion/v3/users/" + n.id + "/hongbaos",
            header: {
                Cookie: "SID=" + n.SID
            }
        });
    },
    getCoupons: function() {
        return i({
            url: "/promotion/v1/users/" + n.id + "/coupons",
            header: {
                Cookie: "SID=" + n.SID
            }
        });
    },
    getNearestShop: function(e, r, t) {
        return i({
            url: "/promotion/v2/users/" + n.id + "/coupons/" + e + "/nearest_restaurant_id?latitude=" + r + "&longitude=" + t,
            header: {
                Cookie: "SID=" + n.SID
            }
        });
    },
    getHongbaosForCart: function(e, r) {
        return i({
            url: "/promotion/v1/carts/" + e + "/promotion_items",
            header: {
                Cookie: "SID=" + n.SID
            },
            data: r
        }, {
            shopId: m()
        });
    },
    checkout: function(e) {
        return i({
            url: "/pizza/v2/carts/checkout",
            method: "POST",
            header: {
                Cookie: "SID=" + n.SID
            },
            data: e
        }, {
            shopId: m()
        });
    },
    spellCheckout: function(e, r) {
        return i({
            url: "/booking/v1/carts/" + r + "/checkout",
            method: "POST",
            header: {
                Cookie: "SID=" + n.SID
            },
            data: e
        }, {
            shopId: m()
        });
    },
    makeOrder: function(e) {
        return i({
            url: "/pizza/booking/v1/users/" + e.user_id + "/carts/" + e.cart_id + "/orders",
            method: "POST",
            header: {
                Cookie: "SID=" + n.SID
            },
            data: e
        }, {
            shopId: m()
        });
    },
    sendVerifyCode: function(e) {
        return i({
            url: "/pizza/v4/mobile/verify_code/send",
            method: "POST",
            header: {
                Cookie: "eleme__ele_me=" + d
            },
            data: e
        }).then(function(e) {
            return l(e);
        }).catch(function(e) {
            return Promise.reject(l(e));
        });
    },
    login: function(e) {
        return i({
            url: "/pizza/v1/login/app_mobile",
            method: "POST",
            header: {
                Cookie: "eleme__ele_me=" + d
            },
            data: e
        }).then(function(e) {
            var r = JSON.parse(e.data.body);
            return r.SID = (c(e).match(/SID=([^;]+)/) || [])[1] || "", e.data = r, e;
        }).catch(function(e) {
            return e.data = JSON.parse(e.data.body), Promise.reject(e);
        });
    },
    getCaptchaCode: function(e) {
        return i({
            url: "/v1/captchas",
            method: "POST",
            header: {
                Cookie: "eleme__ele_me=" + d
            },
            data: e
        });
    },
    queryInitSalesMenus: function(e) {
        return i({
            url: "/shopping/v3/flash/init",
            data: e
        });
    },
    queryMoreSalesMenus: function(e) {
        return i({
            url: "/shopping/v3/flash/foods",
            data: e
        });
    },
    isNewUser: function(e) {
        return i({
            url: "/eus/v1/users/" + e + "/new_user_check",
            header: {
                Cookie: "SID=" + n.SID
            }
        });
    },
    getNewUserGift: function(e) {
        return i({
            url: "/marketing/v3/users/" + n.id + "/new_user_gifts?geohash=" + e,
            header: {
                Cookie: "SID=" + n.SID
            }
        });
    },
    getNewUserRestaurants: function(e) {
        var r = e.latitude, t = e.longitude, o = e.offset, n = e.limit;
        return i({
            url: "/shopping/newuser/restaurants/recommend" + ("?latitude=" + r + "&longitude=" + t + "&extras[]=activities&limit=" + n + "&offset=" + o),
            header: {
                Cookie: "eleme__ele_me=" + d
            }
        });
    },
    getCategoryEntries: function(e) {
        var r = e.latitude, t = e.longitude;
        return i({
            url: "/shopping/v2/entries?latitude=" + r + "&longitude=" + t + "&templates[]=main_template"
        });
    },
    getHongbaoTheme: function(e, r) {
        return i({
            url: "/marketing/themes/" + e + "/group_sns/" + r
        }, {
            orderId: parseInt(r, 16)
        });
    },
    getHongbaoLink: function(e) {
        var r = e.user_id, t = e.order_id;
        return i({
            url: "/marketing/v1/users/" + r + "/orders/" + t + "/share_hongbao",
            header: {
                Cookie: "SID=" + n.SID
            }
        });
    },
    riskLogin: function(e) {
        return i({
            url: "/eus/v1/weixin_light_app_authorize",
            method: "POST",
            data: e
        });
    },
    getHbConfig: function() {
        return i({
            url: r + "/hongbao"
        });
    },
    getOutlink: function() {
        return i({
            url: t + "/outlink"
        });
    },
    getGiftCardConfig: function() {
        return i({
            url: t + "/giftcard"
        });
    },
    getUserLocation: function(e, r) {
        return i({
            url: "/member/v2/users/" + n.id + "/location?longitude=" + r + "&latitude=" + e,
            header: {
                cookie: "SID=" + n.SID
            }
        });
    },
    unbind: function() {
        return i({
            url: "/eus/v2/users/" + n.id + "/sns",
            method: "delete",
            header: {
                cookie: "SID=" + n.SID
            },
            data: {
                sns_type: 3
            }
        });
    },
    postPushCode: function(e) {
        return i({
            url: "https://waltz.ele.me/weixin/program/form_id/box",
            method: "post",
            data: e
        });
    },
    formSubmit: function(e, r) {
        var t = this;
        new Promise(function(e, r) {
            wx.login({
                success: e,
                fail: r
            });
        }).then(function(o) {
            return t.postPushCode({
                code: o.code,
                tag: r,
                form_id: e
            });
        }).catch(function() {});
    },
    getLuckyHongbao: function(e) {
        return i({
            url: "/marketing/v2/promotion/weixin/" + e.weixin_uid,
            method: "post",
            header: {
                cookie: "SID=" + n.SID
            },
            data: e
        });
    },
    getRecommendSwipeData: function() {
        return i({
            url: "https://shadow.elemecdn.com/crayfish/h5.ele.me/commend"
        });
    },
    getNewRefer: function() {
        return i({
            url: "/marketing/users/" + n.id + "/new_refer",
            header: {
                Cookie: "SID=" + n.SID
            }
        });
    },
    getShareReferCode: function() {
        return i({
            url: "/marketing/v1/users/" + n.id + "/share_refer/code",
            header: {
                Cookie: "SID=" + n.SID
            }
        });
    },
    getShareReferProgressMenus: function() {
        return i({
            url: "/marketing/v3/users/" + n.id + "/share_refer/progress/menus",
            header: {
                Cookie: "SID=" + n.SID
            }
        });
    },
    getShareReferPrize: function() {
        return i({
            url: "/marketing/v1/users/" + n.id + "/share_refer/prize",
            header: {
                Cookie: "SID=" + n.SID
            }
        });
    },
    getRedirectToAlipay: function() {
        return i({
            url: "/marketing/v2/users/" + n.id + "/redirect_to_alipay?come_from=recommend",
            header: {
                Cookie: "SID=" + n.SID
            }
        });
    },
    getCommendHongbao: function(e) {
        return i({
            url: "/marketing/promotion/refer/" + n.id,
            method: "POST",
            data: e,
            header: {
                Cookie: "SID=" + n.SID
            }
        });
    }
};

module.exports = f;