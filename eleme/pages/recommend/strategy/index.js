var s = getApp().services, e = (s.API, s.Host), t = s.User;

Page({
    data: {
        url: "https://h5.ele.me/commend/strategy/#/"
    },
    onLoad: function(s) {
        var h = "";
        h = "strategy" === s.hash ? e.h5Host + "/commend/" + s.hash + "/#/??ssi=" + t.SID + "&uid=" + t.id + "&come_from=mp&wx" : -1 !== s.hash.indexOf("fire") ? e.h5Host + "/" + s.hash : e.h5Host + "/commend/#/" + s.hash + "??ssi=" + t.SID + "&uid=" + t.id + "&come_from=mp&wx", 
        this.setData({
            url: h
        });
    },
    onShow: function() {}
});