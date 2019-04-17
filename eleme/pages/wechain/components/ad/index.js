var t = require("../../lib/store");

Component({
    properties: {
        couponPage: {
            type: Boolean
        }
    },
    data: {
        fakeAds: [],
        animationData: {}
    },
    attached: function() {
        console.log(t.crayfish.ads), this.setData({
            fakeAds: (t.crayfish.ads || []).sort(function() {
                return Math.random() - .5;
            })
        }), this._animationList();
    },
    methods: {
        _animationList: function() {
            var t = this, a = wx.createAnimation({
                duration: 1e3,
                timingFunction: "ease"
            }), n = 1;
            setInterval(function() {
                a.translate(0, -23 * n).step(), ++n === t.data.fakeAds.length && (n = 0), t.setData({
                    animationData: a.export()
                });
            }, 3e3);
        }
    }
});