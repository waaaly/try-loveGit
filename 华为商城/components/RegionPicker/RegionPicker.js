var e = getApp(), t = e.globalData.mp, i = e.globalData.config;

Component({
    options: {
        multipleSlots: !1
    },
    properties: {
        isShow: {
            type: Boolean,
            value: !1,
            observer: function(e) {
                if (e) {
                    var t = this;
                    t.setData({
                        scrollId: t.data.scrollId
                    });
                }
            }
        },
        region: {
            type: Object,
            value: {
                province: "",
                provinceName: "请选择",
                city: "",
                cityName: "",
                district: "",
                districtName: "",
                street: "",
                streetName: ""
            },
            observer: function(e) {
                var i = this, n = i._regionFilter(e), a = i._regionFilter(i.data.newRegion);
                a === n || t.isObjectEqual(n, a) || i._watchRegion(n, a);
            }
        }
    },
    data: {
        newRegion: {
            province: "",
            provinceName: "请选择",
            city: "",
            cityName: "",
            district: "",
            districtName: "",
            street: "",
            streetName: ""
        },
        originRegion: {},
        defaultRegion: {
            province: "",
            provinceName: "请选择",
            city: "",
            cityName: "",
            district: "",
            districtName: "",
            street: "",
            streetName: ""
        },
        currentLevel: 0,
        levelSequence: [ "province", "city", "district", "street" ],
        regionList: [],
        selectedRegionIndex: -1,
        scrollId: "",
        needL4Addr: !0
    },
    attached: function() {
        var e = this;
        t.setWatcher(e, {
            regionList: function(t, i) {
                e._watchRegionList(t, i);
            }
        });
    },
    ready: function() {
        var e = this;
        e.refreshStopClick(), t.isObjectEqual(e.data.newRegion, e.data.defaultRegion) && e.getRegionValues();
    },
    detached: function() {
        this.refreshStopClick();
    },
    methods: {
        toCloseRegion: function() {
            var e = this;
            if (t.isObjectEqual(e.data.originRegion, e.data.newRegion)) return e.hide(), e.getRegionValues(), 
            !1;
            wx.showModal({
                title: "",
                content: "确定要放弃此次编辑吗？",
                confirmText: "返回修改",
                cancelText: "放弃",
                success: function(t) {
                    t.cancel && (e.hide(), e.setData({
                        newRegion: e._regionFilter(e.data.originRegion)
                    }), e.getRegionValues());
                }
            });
        },
        hide: function() {
            this.setData({
                isShow: !1
            });
        },
        getRegionValues: function() {
            var e = this, n = e.data.newRegion;
            t.mpGet(i.service.addressDomain + "/data/region/tree/" + (n.street || n.district || n.city || n.province || "0") + ".json", {}, {
                successFunc: function(t) {
                    var i = t.data.data, a = t.data.values || [];
                    if (!i || 0 == i.length) return !1;
                    n.province = a[0] || "", n.city = a[1] || "", n.district = a[2] || "", n.street = a[3] || "", 
                    n.provinceName = n.province ? i[0].find(function(e) {
                        return e.id == n.province;
                    }).name : "请选择", n.cityName = n.city && i[1].find(function(e) {
                        return e.id == n.city;
                    }).name, n.districtName = n.district && i[2].find(function(e) {
                        return e.id == n.district;
                    }).name, n.streetName = n.street && i[3].find(function(e) {
                        return e.id == n.street;
                    }).name;
                    var r = a.length - 1, o = r + 1;
                    return e.setData({
                        newRegion: e._regionFilter(n),
                        originRegion: e._regionFilter(n)
                    }), r < 0 ? (e.setData({
                        needL4Addr: !0,
                        currentLevel: 0,
                        regionList: i[0] || []
                    }), e._triggerChange(), !1) : r >= 3 ? (e.setData({
                        needL4Addr: !1,
                        currentLevel: 3,
                        regionList: i[3] || []
                    }), e._triggerChange(), !1) : void e.getRegionList(o).then(function(t) {
                        var i = e.data.levelSequence[o];
                        n[i + "Name"] = "请选择", e.setData({
                            needL4Addr: !0,
                            currentLevel: o,
                            regionList: t,
                            newRegion: e._regionFilter(n),
                            originRegion: e._regionFilter(n)
                        }), e._triggerChange();
                    }).catch(function() {
                        e.setData({
                            needL4Addr: !1,
                            currentLevel: r,
                            regionList: i[i.length - 1]
                        }), e._triggerChange();
                    });
                }
            });
        },
        getRegionList: function(e) {
            var n = this, a = e - 1, r = n.data.levelSequence[a], o = n.data.newRegion[r], c = a < 0 ? i.service.addressDomain + "/data/region/tree/0.json" : i.service.addressDomain + "/data/region/children/" + o + ".json";
            return new Promise(function(e, i) {
                t.mpGet(c, {}, {
                    successFunc: function(t) {
                        if (200 != t.statusCode || !t.data || !t.data.data || !t.data.data.length) return i(), 
                        !1;
                        var n = a < 0 ? t.data.data[0] : t.data.data;
                        e(n);
                    },
                    failFunc: function() {
                        i();
                    }
                });
            });
        },
        toChooseRegion: function(e) {
            var t = this, i = t.data.newRegion, n = e.currentTarget.dataset.index, a = t.data.currentLevel, r = t.data.levelSequence[a];
            if (t.canStopClick()) return !1;
            if (i[r] = t.data.regionList[n].id, i[r + "Name"] = t.data.regionList[n].name, a < 3) {
                switch (t.data.currentLevel) {
                  case 0:
                    i.city = "", i.cityName = "请选择", i.district = "", i.districtName = "", i.street = "", 
                    i.streetName = "";
                    break;

                  case 1:
                    i.district = "", i.districtName = "请选择", i.street = "", i.streetName = "";
                    break;

                  case 2:
                    i.street = "", i.streetName = "请选择";
                }
                t.getRegionList(a + 1).then(function(e) {
                    t.setData({
                        needL4Addr: !0,
                        currentLevel: a + 1,
                        regionList: e,
                        newRegion: i
                    }), t._triggerChange();
                }).catch(function() {
                    t.hide();
                    var e = t.data.levelSequence[a + 1];
                    i[e + "Name"] = "", t.setData({
                        needL4Addr: !1,
                        selectedRegionIndex: n,
                        newRegion: t._regionFilter(i),
                        originRegion: t._regionFilter(i),
                        scrollId: "scroll" + i[r]
                    }), t._triggerChange();
                });
            } else t.hide(), t.setData({
                needL4Addr: !1,
                selectedRegionIndex: n,
                newRegion: t._regionFilter(i),
                originRegion: t._regionFilter(i),
                scrollId: "scroll" + i[r]
            }), t._triggerChange();
        },
        toChangeRegion: function(e) {
            var t = this, i = e.target.dataset.index;
            if (i == t.data.currentLevel) return !1;
            t.getRegionList(i).then(function(e) {
                t.setData({
                    currentLevel: i,
                    regionList: e
                });
            }).catch(function() {});
        },
        _triggerChange: function() {
            var e = this;
            e.refreshStopClick(), e.triggerEvent("change", {
                region: e.data.newRegion,
                needL4Addr: e.data.needL4Addr
            });
        },
        _watchRegion: function(e) {
            var t = this;
            t.setData({
                newRegion: t._regionFilter(e),
                originRegion: t._regionFilter(e)
            }), t.getRegionValues();
        },
        _watchRegionList: function(e) {
            var t = this, i = -1, n = t.data.newRegion[t.data.levelSequence[t.data.currentLevel]];
            e.forEach(function(e, t) {
                e.id == n && (i = t);
            }), t.setData({
                selectedRegionIndex: i
            }, function() {
                t.setData({
                    scrollId: "scroll" + (n || e[0].id)
                });
            });
        },
        _regionFilter: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                province: e.province && String(e.province) || "",
                provinceName: e.provinceName || "请选择",
                city: e.city && String(e.city) || "",
                cityName: e.cityName || "",
                district: e.district && String(e.district) || "",
                districtName: e.districtName || "",
                street: e.street && String(e.street) || "",
                streetName: e.streetName || ""
            };
        },
        canStopClick: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "fnFlag", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3e3, i = this;
            return i.data.isStopClickedObj = i.data.isStopClickedObj || {}, i.data.timerObj = i.data.timerObj || {}, 
            !!i.data.isStopClickedObj[e] || (i.data.isStopClickedObj[e] = !0, i.data.timerObj[e] = setTimeout(function() {
                i.data.isStopClickedObj[e] = !1;
            }, t), !1);
        },
        refreshStopClick: function(e) {
            var i = this;
            return !t.mpIsEmpty(i.data.timerObj) && (e && !t.mpIsEmpty(i.data.timerObj[e]) ? (clearTimeout(i.data.timerObj[e]), 
            delete i.data.timerObj[e], delete i.data.isStopClickedObj[e], !1) : (Object.keys(i.data.timerObj).forEach(function(e) {
                clearTimeout(i.data.timerObj[e]);
            }), i.data.isStopClickedObj = {}, void (i.data.timerObj = {})));
        }
    }
});