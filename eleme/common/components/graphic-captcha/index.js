Component({
    data: {
        graphicCaptcha: ""
    },
    properties: {
        imageUrl: {
            type: String,
            value: ""
        }
    },
    methods: {
        bindGraphicCaptchaInput: function(t) {
            this.setData({
                graphicCaptcha: t.detail.value
            });
        },
        cancel: function() {
            this.triggerEvent("cancel");
        },
        confirm: function() {
            this.triggerEvent("confirm", {
                captcha: this.data.graphicCaptcha
            });
        },
        change: function() {
            this.triggerEvent("change");
        }
    }
});