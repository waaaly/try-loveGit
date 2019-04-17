var e = "https://mdc-httpizza.ele.me/base.openservice", r = getApp().services, t = r.ApiCreater, a = r.User, o = (r.HashToUrl, 
r.paramsToString), n = function(e) {
    return 200 === e.statusCode ? e.data : Promise.reject(e.statusCode);
}, c = function(e) {
    var r = e.data;
    throw wx.showToast({
        title: r.message,
        icon: "none"
    }), new Error(r);
}, d = {
    makeOrder: function(r) {
        return t({
            url: e + "/card/order",
            data: r,
            method: "POST",
            header: {
                cookie: "SID=" + a.SID
            }
        });
    },
    getBanners: function() {
        return t({
            url: e + "/card/home/banner"
        });
    },
    getMenus: function() {
        return t({
            url: e + "/card/home/menu"
        });
    },
    getCardDetail: function(r) {
        return t({
            url: e + "/card/theme/detail?id=" + r
        });
    },
    pay: function(r) {
        return t({
            url: e + "/card/order/payment",
            data: r,
            method: "POST",
            header: {
                cookie: "SID=" + a.SID
            }
        });
    },
    getGiftCardLists: function(r, o) {
        return t({
            url: e + "/card/cards?page=" + r + "&page_size=" + o,
            header: {
                cookie: "SID=" + a.SID
            }
        }).then(n).catch(c);
    },
    getGiftCardDetail: function(r) {
        return t({
            url: e + "/card/card/detail?" + o(r),
            header: {
                cookie: "SID=" + a.SID
            }
        }).then(n).catch(c);
    },
    giveGiftCard: function(r) {
        return t({
            url: e + "/card/operate/give",
            method: "PUT",
            header: {
                cookie: "SID=" + a.SID
            },
            data: r
        }).then(n).catch(c);
    },
    receiveGiftCard: function(r) {
        return t({
            url: e + "/card/operate/accept",
            method: "PUT",
            header: {
                cookie: "SID=" + a.SID
            },
            data: r
        }).then(n).catch(c);
    },
    useGiftCard: function(r) {
        return console.log(r), t({
            url: e + "/card/operate/use",
            method: "PUT",
            header: {
                cookie: "SID=" + a.SID
            },
            data: r
        }).then(n);
    }
};

module.exports = d;