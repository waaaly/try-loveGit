Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = getApp().services.HashToUrl, t = [ "1.每邀请一个好友参与即有机会开奖，邀请越多，中奖机会越大", "2.获得开奖机会后，需要打开支付宝，即可进行抽奖。查看路径：支付宝饿了么首页或外卖节首页-20元红包浮层（邀好友赢免单）", "3.拥有同⼀⼿机号用户视为同⼀用户，同一用户重复邀请⽆效", "4.饿了么保留在法律范围内的解释权" ], a = {
    headerBg: e("ba60d102d37a404c248eb9bf1fd57e98png", 750, 1206),
    shareBg: e("1b95de0f6a36b01c40646e63c0f9b183png", 680, 544),
    closeBg: e("2b760e26506fc209ca6bacfb772480edpng", 160, 160),
    coverBg: e("172d7101cf19f9ad4135cf4213632053png", 560, 266)
}, r = {
    EMPTY: {
        header: "未中奖",
        text: "送你一个么么哒😘",
        btnText: "继续抽奖"
    },
    EMPTY_INVITE: {
        header: "未中奖",
        text: "送你一个么么哒😘",
        btnText: "继续邀请好友"
    },
    FREE: {
        header: "恭喜你获得",
        text: "可直接下单使用",
        btnText: "立即使用"
    },
    SMALL: {
        header: "与「免单红包」擦肩而过",
        text: "继续开奖，抽免单红包",
        btnText: "继续抽奖"
    },
    INVITE: {
        header: "与「免单红包」擦肩而过",
        text: "继续邀请好友，获得更多开奖钥匙",
        btnText: "邀请好友"
    }
};

exports.defaultRules = t, exports.alipayCode = "UWrfsH51HF", exports.alidayCode = "ZlmpFP349b", 
exports.imagesUrl = a, exports.lotteryMap = r;