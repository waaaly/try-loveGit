function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./store")), o = e(require("../../../../../common/wxcontext")), i = {
    props: {
        bgImg: {
            type: String,
            default: ""
        }
    },
    data: {
        isXCX: o.default.isXCX,
        isJumping: !1
    },
    store: t.default,
    created: function() {
        this.showShopToutiao();
    },
    watch: {},
    methods: {
        jumpShopTouTiao: function() {
            var e = this;
            e.isJumping || (e.isJumping = !0, setTimeout(function() {
                e.isJumping = !1;
            }, 5e3), e.redNum = 0, e.$xgoto([ "//wqs.jd.com/my/myMessageList.shtml" ], {
                ptag: "7575.1.18"
            }));
        }
    }
};

exports.default = i;