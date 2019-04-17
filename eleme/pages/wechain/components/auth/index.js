var a = require("./behavior");

Component({
    behaviors: [ a ],
    methods: {
        closeCaptcha: function() {
            this.setData({
                captchaUrl: "",
                captchaCode: "",
                captchaHash: ""
            });
        }
    }
});