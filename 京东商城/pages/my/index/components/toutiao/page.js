function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./store")), n = e(require("../../../../../common/wxcontext")), i = {
    props: {
        delayRender: {
            type: Boolean,
            default: !0
        },
        bgImg: {
            type: String,
            default: ""
        }
    },
    data: {
        isXCX: n.default.isXCX,
        scrollNum: 3,
        filterAllArray: !0,
        ppmsGiftConfig: [],
        previewMsgId: [],
        previewMsgIdPps: [],
        currentMsgPtag: "",
        currentStrChannelMsgId: "",
        isJumping: !1,
        isInit: !1
    },
    store: t.default,
    attached: function() {
        1 == this.delayRender && this.initPage();
    },
    watch: {
        delayRender: function(e, t) {
            e != t && 1 == e && this.initPage();
        }
    },
    methods: {
        initPage: function() {
            this.needShowEntrance && this.showEntrance();
        },
        jumpTouTiao: function() {
            var e = this;
            if (!e.isJumping) {
                e.isJumping = !0, setTimeout(function() {
                    e.isJumping = !1;
                }, 5e3);
                var t = encodeURIComponent(e.currentStrChannelMsgId), n = encodeURIComponent(e.previewMsgId.join("|")), i = encodeURIComponent(e.previewMsgIdPps.join("|"));
                setTimeout(function() {
                    e.redNum = 0, e.$xgoto([ "//wqs.jd.com/my/toutiao.shtml" ], {
                        ptag: e.currentMsgPtag,
                        hitChannelMsgId: t,
                        previewMsgId: n,
                        previewMsgIdPps: i,
                        iswxappEnv: e.isXCX ? 1 : 0
                    });
                }, 100);
            }
        }
    }
};

exports.default = i;