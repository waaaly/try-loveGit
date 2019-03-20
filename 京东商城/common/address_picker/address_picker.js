Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.init = void 0;

var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}(require("../address_api/address_api.js")), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/promise.min.js")), a = function() {
    return {
        _addrData: {
            align: "",
            showHwAddr: !0,
            entries: [ {
                idList: [],
                range: [],
                selected: -1,
                pickerVal: 0,
                name: ""
            }, {
                idList: [],
                range: [],
                areaCodeList: [],
                nameCodeList: [],
                selected: -1,
                pickerVal: 0,
                name: ""
            }, {
                idList: [],
                range: [],
                selected: -1,
                pickerVal: 0,
                name: ""
            }, {
                idList: [],
                range: [],
                selected: -1,
                pickerVal: 0,
                name: ""
            } ]
        },
        onLoad: function(e) {
            var t = this;
            this._resetPicker(0, function() {
                t._realOnLoad && t._realOnLoad(e);
            });
        },
        getAddrData: function() {
            var e = {
                idList: [],
                nameList: [],
                complete: !0
            };
            return this._addrData.entries.forEach(function(t, a) {
                -1 != t.selected && (e.idList.push(t.idList[t.selected]), e.nameList.push(t.range[t.selected]), 
                1 == a && (e.areaCode = t.areaCodeList[t.selected] || "", e.nameCode = t.nameCodeList[t.selected] || "")), 
                -1 == t.selected && t.range.length > 0 && (e.complete = !1);
            }), e;
        },
        setAddrData: function(e) {
            var t = this, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            this._addrData.showHwAddr = void 0 === a.showHwAddr || a.showHwAddr;
            var i = function(a, i) {
                var d = t._addrData.entries[a], r = ~~e[a];
                return d.idList = i.idList, d.range = i.nameList, 1 == a && (d.areaCodeList = i.areaCodeList || [], 
                d.nameCodeList = i.nameCodeList || []), r ? (d.selected = i.idList.indexOf(r), d.pickerVal = d.selected, 
                d.name = i.nameList[d.selected]) : (d.selected = -1, d.pickerVal = 0, d.name = "-- 请选择 --"), 
                t._syncUI(), !!r;
            };
            this._getData(0).then(function(e) {
                if (e && i(0, e)) return t._getData(1);
            }).then(function(e) {
                if (e && i(1, e)) return t._getData(2);
            }).then(function(e) {
                if (e && i(2, e)) return t._getData(3);
            }).then(function(e) {
                e && i(3, e), t.onAddrChange(t.getAddrData(), "setData");
            });
        },
        resetAddrData: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this._addrData.showHwAddr = void 0 === e.showHwAddr || e.showHwAddr, this._resetPicker(0);
        },
        onAddrChange: function(e, t) {
            console.log("###### 地址选择器-onAddrChange（方法未覆盖！）", e, t);
        },
        _getData: function(a) {
            for (var i = [ "getProvinceList", "getCityList", "getDistrictList", "getTownList" ], d = [], r = 0; r < a; r++) {
                var n = this._addrData.entries[r];
                d.push(n.idList[n.selected]);
            }
            return e.setDisplayHwAddr(this._addrData.showHwAddr), new t.default(function(t, r) {
                d.push(function(e, d) {
                    console.log("###### 地址选择器-", i[a], e, d), e ? r(e) : t(d);
                }), e[i[a]].apply(e, d);
            });
        },
        _resetPicker: function(e, t) {
            var a = this;
            this._getData(e).then(function(i) {
                var d = a._addrData.entries[e];
                d.idList = i.idList, d.range = i.nameList, 1 == e && (d.areaCodeList = i.areaCodeList || [], 
                d.nameCodeList = i.nameCodeList || []), d.selected = -1, d.pickerVal = 0, d.name = "-- 请选择 --";
                for (var r = e + 1; r < a._addrData.entries.length; r++) {
                    var n = a._addrData.entries[r];
                    n.idList = [], n.range = [], 1 == r && (n.areaCodeList = [], n.nameCodeList = []), 
                    n.selected = -1, n.pickerVal = 0, n.name = "";
                }
                t && t(), a._syncUI(), a.onAddrChange(a.getAddrData(), "picker");
            }, function(e) {
                t && t(e);
            });
        },
        _syncUI: function() {
            this.setData({
                addrPicker: this._addrData
            });
        },
        _pickerDidChange: function(e) {
            var t = +e.target.dataset.level, a = this._addrData.entries[t], i = e.detail.value;
            (i = "null" == i ? a.pickerVal : +i) != a.selected && (a.selected = i, a.pickerVal = i, 
            a.name = a.range[i], this._syncUI(), t + 1 < this._addrData.entries.length ? this._resetPicker(t + 1) : this.onAddrChange(this.getAddrData(), "picker"));
        }
    };
};

exports.init = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = a();
    t.align && (i._addrData.align = t.align), e.data = e.data || {}, e.data.addrPicker = i._addrData, 
    e._addrData = i._addrData, e._realOnLoad = e.onLoad, Object.keys(i).forEach(function(t) {
        "function" != typeof i[t] || "onAddrChange" == t && e[t] || (e[t] = i[t]);
    });
};