var t = getApp().services.ApiCreater;

module.exports = {
    kashops: function(e, a, i) {
        return t({
            url: "/pizza/v1/kashops",
            data: {
                latitude: a,
                longitude: i,
                brand_id: e,
                extras: [ "activities" ]
            }
        });
    }
};