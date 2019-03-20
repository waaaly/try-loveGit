Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.storeFn = void 0;

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./model"));

exports.storeFn = function() {
    return {
        state: {
            isShowCurtain: !1,
            shareGuideText: "",
            domDataStr: "",
            btnStyleRes: "color:#fff !important;\n    background:#F6574D !important;\n    box-shadow: 0 0 20px 0 rgba(255,0,0,0.29);\n    border-radius: 100rpx;\n    height:100rpx;\n    line-height:100rpx;\n    font-size:36rpx;\n    letter-spacing:1rpx;\n    border:none;"
        },
        actions: {
            setFormId: function(r) {
                e.default.setFormId(r);
            },
            sharereport: function(r) {
                e.default.sharereport(r);
            }
        }
    };
};