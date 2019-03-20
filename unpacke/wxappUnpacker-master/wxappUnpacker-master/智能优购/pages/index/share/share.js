var t = getApp();

Page({
    data: {
        dataset: [],
        mainpic: "",
        bimg: "",
        index: 0,
        loadpic: !0,
        loadlayer: !0
    },
    bindSwitchImgtap: function(t) {
        var a = t.currentTarget.dataset.index;
        a != this.data.index && (this.setData({
            loadpic: !0,
            index: a
        }), this.setData({
            mainpic: this.data.dataset[a].mainpic
        }), console.log(a));
    },
    bindOpenImg: function() {
        var t = this.data.dataset[this.data.index].mainpic;
        console.log(t), wx.previewImage({
            urls: [ t ]
        });
    },
    bindimgloadded: function() {
        this.setData({
            loadpic: !1,
            bimg: this.data.mainpic
        });
    },
    saveImgToPhotosAlbumTap: function() {
        var t = this;
        wx.downloadFile({
            url: IMG_URL,
            success: function(a) {
                console.log(a), wx.saveImageToPhotosAlbum({
                    filePath: a.tempFilePath,
                    success: function(a) {
                        t.wetoast.toast({
                            title: "保存成功",
                            duration: 2e3
                        });
                    },
                    fail: function(a) {
                        t.wetoast.toast({
                            title: "保存失败",
                            duration: 2e3
                        });
                    }
                });
            },
            fail: function() {
                t.wetoast.toast({
                    title: "保存失败",
                    duration: 2e3
                });
            }
        });
    },
    onLoad: function() {
        new t.WeToast();
        var a = this;
        t.getHttpData(t.domain + "/partner/posterlist", null, "GET", function(t) {
            wx.stopPullDownRefresh(), console.log(t), a.setData({
                dataset: t,
                mainpic: t[0].mainpic
            }), a.setData({
                loadlayer: !1
            });
        });
    },
    onShow: function() {
        setTimeout(function() {
            wx.hideShareMenu();
        }, 3e3);
    }
});