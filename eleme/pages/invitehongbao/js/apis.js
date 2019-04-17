var e = require("../../../dave/dave.js").ApiCreater, r = {
    getHongbao: function(r, t) {
        return e({
            url: "/marketing/v2/new_refer/" + r,
            data: t,
            method: "POST"
        });
    },
    getVerifyCode: function(r) {
        return e({
            url: "/marketing/new_refer/" + r + "/verify",
            data: {
                verify_type: 0
            },
            method: "POST"
        });
    }
};

module.exports = r;