Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = Behavior({
    properties: {
        hidden: {
            type: Boolean,
            value: !1,
            observer: "_toogleVisiable"
        }
    },
    methods: {
        _toogleVisiable: function(e, t) {
            this.setData({
                hidden: !!e
            });
        },
        _showLoading: function() {
            wx.showLoading({
                title: "",
                mask: !0
            });
        },
        _hideLoading: function() {
            wx.hideLoading();
        },
        _getPageId: function() {
            var e = getCurrentPages(), t = e[e.length - 1];
            return t ? t._pageId : "";
        }
    }
});