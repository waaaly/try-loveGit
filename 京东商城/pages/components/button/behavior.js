Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../../../common/util/method"));

exports.default = Behavior({
    properties: {
        css: {
            type: Object,
            value: {}
        },
        className: {
            type: String,
            value: ""
        }
    },
    data: {
        _style: ""
    },
    attached: function() {
        this._createStyle();
    },
    methods: {
        _createStyle: function() {
            var t = this.data.css;
            this.setData({
                _style: e.createStyle(t)
            });
        }
    }
});