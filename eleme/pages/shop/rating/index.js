var e = getApp(), a = e.services, i = a.Ubt, t = {
    data: {
        imageHash: a.imageHash
    },
    onLoad: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = e.id, i = e.tagName, t = e.isNewRetail;
        this.onRatingViewLoad({
            id: a,
            tagName: i,
            isNewRetail: parseInt(t)
        });
    },
    onShow: function() {
        i.sendPv();
    }
};

Page(e.extend([ {}, t, require("../components/rating-view/index") ]));