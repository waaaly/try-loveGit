Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.rules = [ "1、每位用户每天至多可以领取5个红包。", "2、使用红包时的下单手机号需为抢红包时使用的手机号。", "3、若用户使用领取的红包下单，订单取消后，红包将会失效。", "4、若分享用户取消订单，则由该订单分享出的红包将会失效。", "5、发放至手机号的红包需在 App 用手机号注册，或将手机号绑定至饿了么账户后才可使用。", "6、发放至饿了么账户的红包登录后即可使用。", "7、红包仅限在线支付时使用，每张订单仅限使用一张红包，红包不找零。", "8、饿了么保留法律范围内允许的对活动的解释权。" ], 
exports.failText = {
    1: "来迟了，红包已被抢完",
    5: "每天最多领5个哦！",
    6: "红包已被取消",
    11: "分享已过期",
    12: "分享已过期"
}, exports.hongbao = {
    amount: 3,
    integer: 3,
    decimal: 5,
    expire_date: "2019-01-08",
    hongbao_variety: [ "全品类" ],
    is_new_user: !1,
    name: "品质联盟专享红包",
    phone: "15195031911",
    source: "weixin_share_hongbao",
    sum_condition: 30,
    validity_periods: "2019-01-08到期"
}, exports.records = [ {
    amount: 3,
    created_at: 1546834434,
    is_doubling_issued: !1,
    is_lucky: !1,
    sns_avatar: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIa4HPEdavDKYZszaUlwZanBlvic9620J0NQxibKH15ouMVVlPNo9EXQTM595iannq0t7c4iaFHnRCWoA/132",
    sns_username: "V"
}, {
    amount: 3,
    created_at: 1546834434,
    is_doubling_issued: !1,
    is_lucky: !0,
    sns_avatar: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIa4HPEdavDKYZszaUlwZanBlvic9620J0NQxibKH15ouMVVlPNo9EXQTM595iannq0t7c4iaFHnRCWoA/132",
    sns_username: "V1"
} ];