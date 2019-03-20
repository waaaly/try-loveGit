function e() {}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = require("report_manager"), t = require("Ptag_utils"), r = {
    setCurrentPageAndAddPv: function() {
        a.ReportManager.setCurrentPageAndAddPv.apply(a.ReportManager, arguments);
    },
    addPtag: function() {
        t.PtagUtils.addPtag.apply(t.PtagUtils, arguments);
    },
    addSearchPageExposure: function() {
        a.ReportManager.addSearchPageExposure.apply(a.ReportManager, arguments);
    },
    addPtagExposure: function() {
        a.ReportManager.addPtagExposure.apply(a.ReportManager, arguments);
    },
    guessyouLike: function() {
        a.ReportManager.guessyouLikeReport.apply(a.ReportManager, arguments);
    },
    addSearchPagePv: function() {
        a.ReportManager.addSearchPagePv.apply(a.ReportManager, arguments);
    },
    addDetailPagePv: function() {
        a.ReportManager.addDetailPagePv.apply(a.ReportManager, arguments);
    },
    addOfflinePagePv: function() {
        a.ReportManager.addOfflinePagePv.apply(a.ReportManager, arguments);
    },
    addSearchPageRelatedKWDPtag: function() {
        t.PtagUtils.addSearchPageRelatedKWDPtag.apply(t.PtagUtils, arguments);
    },
    isWxapp: !0,
    getSource: function(e) {
        return [ a.ReportManager, t.PtagUtils ][e];
    }
};

[ "tencentPv", "tencentClick", "shopSearch", "biRank", "eventClick", "userShare", "shDeviceId" ].forEach(function(a) {
    r[a] = e;
}), exports.default = r;