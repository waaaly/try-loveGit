var t = require("../behavior"), e = require("../api");

Component({
    behaviors: [ t ],
    methods: {
        submitNewPhone: function() {
            var t = this;
            this.validateInput() && (this.loginHandle = function(e) {
                e.detail.then(function() {
                    t.toast("修改成功"), t.triggerEvent("success");
                }).catch(function(e) {
                    t.toast(e.message || "服务器错误，请重试");
                });
            }, e.unbind().catch(function() {}).then(function() {
                t.setData({
                    showAuth: !0
                });
            }));
        },
        close: function() {
            this.triggerEvent("close");
        }
    }
});