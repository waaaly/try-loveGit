Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = getApp().services.HashToUrl;

exports.default = {
    "-3": {
        title: "已过期",
        bgUrl: e("f3ac7d4a918e2ce0ef5047f274d45132png", 90, 90),
        detailUrl: e("f3ac7d4a918e2ce0ef5047f274d45132png", 180, 180),
        className: "disabled",
        shareTitle: ""
    },
    "-2": {
        title: "已超时",
        bgUrl: "",
        opacity: "",
        shareTitle: "对方未领取"
    },
    0: {
        title: "未支付",
        bgUrl: "",
        shareTitle: ""
    },
    1: {
        title: "已支付",
        bgUrl: "",
        shareTitle: ""
    },
    2: {
        title: "已处理",
        bgUrl: "",
        shareTitle: ""
    },
    3: {
        title: "赠送中",
        bgUrl: e("b7eded2e38e366cbed817387a18a697fpng", 90, 90),
        shareTitle: "等待对方领取"
    },
    4: {
        title: "已送出",
        bgUrl: e("dbd7300954639cabe544482d136ee4b4png", 90, 90),
        className: "disabled",
        shareTitle: "对方已领取"
    },
    5: {
        title: "已使用",
        bgUrl: e("f5566f928af6e9b9d36e9010448d0c4fpng", 90, 90),
        detailUrl: e("f5566f928af6e9b9d36e9010448d0c4fpng", 180, 180),
        className: "disabled",
        shareTitle: ""
    }
};