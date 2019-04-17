var e = require("../../services/scenes").scenes, t = getApp().services.Ubt;

module.exports = {
    filterScenes: function(t) {
        return t.map(function(t) {
            var s = e[t.type];
            if (2 === t.type) {
                var r = new Date().getHours();
                r >= 10 && r < 14 && (s.text = "午餐"), r >= 14 && r < 21 && (s.text = "晚餐");
            }
            return s;
        });
    },
    switchScenes: function(e) {
        var s = e.currentTarget.dataset, r = s.index, n = s.sceneTitle;
        t.sendEvent({
            id: "101939",
            params: {
                title: n
            }
        }), this.setData({
            activatedTab: r
        });
    }
};