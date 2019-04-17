var a = getApp(), t = a.services.Cart, e = t.remark;

Page({
    mergeData: function() {
        var t = e.loadSync();
        this.setData(a.extend([ t, this.data ]));
    },
    onLoad: function() {
        var a = this;
        t.loadRemarks().then(function() {
            a.mergeData();
        });
    },
    toggleFlattenRemark: function(a) {
        var t = a.currentTarget;
        e.toggleRemark(e.loadSync().flattenRemarks[+t.dataset.index]), e.save(this.data.remark), 
        this.mergeData();
    },
    remarkChanged: function(a) {
        var t = a.detail;
        this.data.remark = t.value;
    },
    confirm: function() {
        e.save(this.data.remark), wx.navigateBack();
    }
});