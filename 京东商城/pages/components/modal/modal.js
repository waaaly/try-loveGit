new (require("../../../bases/component").JDComponent)({
    properties: {
        modal: Object
    },
    data: {
        icon: {
            success: "https://img11.360buyimg.com/jdphoto/s100x100_jfs/t20308/79/1026851902/1113/e2afdddf/5b1e3574Nd50a697f.png",
            fail: "https://img11.360buyimg.com/jdphoto/s100x100_jfs/t21943/164/1028651586/1075/51aeedaa/5b1e3597N13a98774.png"
        }
    },
    methods: {
        confirm: function(t) {
            var e = t.currentTarget.dataset.action;
            this.triggerEvent("confirm", {
                action: e
            });
        },
        cancel: function(t) {
            var e = t.currentTarget.dataset.action;
            this.triggerEvent("cancel", {
                action: e
            });
        },
        close: function(t) {
            this.triggerEvent("close");
        }
    }
});