var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/api")), e = {
    useGiftCard: function(e) {
        wx.showModal({
            title: "提示",
            content: "使用后将兑换成红包，心意卡将不可再赠送，确定要兑换吗？",
            success: function(i) {
                i.confirm && (wx.showLoading(), t.default.useGiftCard(e).then(function() {
                    wx.hideLoading(), wx.switchTab({
                        url: "/pages/index/index"
                    });
                }).catch(function() {
                    wx.hideLoading(), wx.showToast({
                        title: "网络异常请重试",
                        icon: "none"
                    });
                }));
            }
        });
    }
};

module.exports = e;