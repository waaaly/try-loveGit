var e = require("../../../dave/dave.js"), r = e.ApiCreater, t = e.User, i = {
    getReferDetail: function() {
        return r({
            url: "/marketing/v3/users/" + t.id + "/new_refer/detail",
            header: {
                Cookie: "SID=" + t.SID
            }
        });
    },
    getReferRecords: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20;
        return r({
            url: "/marketing/v2/users/" + t.id + "/new_refer/refer_records",
            header: {
                Cookie: "SID=" + t.SID
            },
            data: {
                last_record_id: e,
                limit: i
            }
        });
    }
};

module.exports = i;