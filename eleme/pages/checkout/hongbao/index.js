var a = getApp(), t = a.services, e = t.User, n = t.Cart, o = t.imageHash, s = n.hongbao;

Page({
    data: {
        imageHash: o
    },
    onShow: function() {
        this.mergeData();
    },
    mergeData: function() {
        var t = this;
        n.loadHongbao(e.SID).then(function(e) {
            t.setData(a.extend([ e, t.data ]));
        });
    },
    notUseHongbao: function() {
        s.select(null), wx.navigateBack();
    },
    selectHongbao: function(a) {
        var t = +a.currentTarget.dataset.index, e = this.data.hongbaos[t];
        e.isValid && (s.select(e), wx.navigateBack());
    }
});