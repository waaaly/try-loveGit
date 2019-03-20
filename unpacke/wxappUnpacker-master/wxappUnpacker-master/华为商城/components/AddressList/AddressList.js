var t = getApp(), e = t.globalData.mp;

t.globalData.config;

Component({
    properties: {
        addressList: {
            type: Array,
            value: []
        },
        selectedIndex: {
            type: Number,
            value: -1
        },
        theme: {
            type: String,
            value: "old"
        }
    },
    data: {
        toastOptions: {
            title: ""
        }
    },
    attached: function() {
        this.refreshStopClick();
    },
    detached: function() {
        this.refreshStopClick();
    },
    methods: {
        toAdd: function() {
            var t = this;
            if (t.canStopClick()) return !1;
            t.triggerEvent("add");
        },
        toModify: function(t) {
            var e = this, a = t.currentTarget.dataset.address;
            if (e.canStopClick("toModify" + a.id)) return !1;
            e.triggerEvent("modify", {
                address: t.currentTarget.dataset.address
            });
        },
        selectAddress: function(t) {
            var e = this, a = t.currentTarget.dataset.idx, i = e.data.addressList;
            if (i[a] && i[a].needL4Addr) return e.setData({
                "toastOptions.title": "您的地址信息不全，完善街道地址后才能使用哦"
            }), !1;
            this.setData({
                selectedIndex: a
            }), wx.setStorageSync("shoppingConfigId", i[a].id), e.triggerEvent("select", {
                selectedAddress: i[a],
                selectedIdx: a
            });
        },
        canStopClick: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "fnFlag", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3e3, a = this;
            return a.data.isStopClickedObj = a.data.isStopClickedObj || {}, a.data.timerObj = a.data.timerObj || {}, 
            !!a.data.isStopClickedObj[t] || (a.data.isStopClickedObj[t] = !0, a.data.timerObj[t] = setTimeout(function() {
                a.data.isStopClickedObj[t] = !1;
            }, e), !1);
        },
        refreshStopClick: function(t) {
            var a = this;
            return !e.mpIsEmpty(a.data.timerObj) && (t && !e.mpIsEmpty(a.data.timerObj[t]) ? (clearTimeout(a.data.timerObj[t]), 
            delete a.data.timerObj[t], delete a.data.isStopClickedObj[t], !1) : (Object.keys(a.data.timerObj).forEach(function(t) {
                clearTimeout(a.data.timerObj[t]);
            }), a.data.isStopClickedObj = {}, void (a.data.timerObj = {})));
        }
    }
});