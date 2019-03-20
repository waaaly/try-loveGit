getApp();

Page({
    data: {
        searchHistoryList: [],
        text: ""
    },
    gotoPrev: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    inputVal: function(t) {
        var s = t.detail.value;
        this.setData({
            text: s
        });
    },
    search: function() {
        var t = this.data.text, s = this.data.searchHistoryList;
        t ? (-1 == s.indexOf(t) && s.unshift(t), this.setData({
            searchHistoryList: s
        }), wx.setStorageSync("searchHistory", JSON.stringify(s)), wx.navigateTo({
            url: "/pages/shop/searchList/searchList?keyword=" + t
        })) : wx.showToast({
            title: "请输入关键词",
            duration: 2e3,
            image: "/images/error.png"
        });
    },
    onLoad: function(t) {
        this.getSearchHistory();
    },
    getSearchHistory: function() {
        var t = wx.getStorageSync("searchHistory");
        if (!t) return !1;
        t = JSON.parse(t), this.setData({
            searchHistoryList: t
        });
    },
    search_his: function(t) {
        console.log(t);
        var s = this.data.searchHistoryList[t.currentTarget.dataset.index];
        this.setData({
            text: s
        }), this.search();
    },
    clearSearchHistory: function() {
        var t = this;
        wx.showModal({
            title: "",
            content: "确定清空历史搜索记录吗？",
            success: function(s) {
                s.confirm && (wx.clearStorageSync("searchHistory"), t.setData({
                    searchHistoryList: []
                }));
            }
        });
    }
});