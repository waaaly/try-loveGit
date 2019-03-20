var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./behavior"));

new (require("../../../bases/component").JDComponent)({
    behaviors: [ e.default ],
    properties: {
        size: {
            type: String,
            value: "large",
            observer: function(e, t) {
                this.initClassName({
                    size: e
                });
            }
        },
        type: {
            type: String,
            value: "primary",
            observer: function(e, t) {
                console.info("type", e, t), this.initClassName({
                    type: e
                });
            }
        },
        text: {
            type: String,
            value: ""
        },
        disable: {
            type: Boolean,
            value: !1,
            observer: function(e, t) {
                this.initClassName({
                    disable: e
                });
            }
        },
        full: {
            type: Boolean,
            value: !1,
            observer: function(e, t) {
                this.initClassName({
                    full: e
                });
            }
        }
    },
    data: {
        _className: "",
        hoverClassName: "",
        buttonWidth: ""
    },
    attached: function() {
        this.initClassName();
    },
    methods: {
        initClassName: function(e) {
            var t = "box", a = "", s = Object.assign({}, this.data, e), i = s.size, l = s.type, o = s.disable, n = s.full;
            t += " " + i + "-box", t += " " + l, "small" === i && n && (t += " full"), o ? (t += " " + l + "-disable", 
            t += " opacity-30") : (a = "default" === l ? i + "-" + l + "-hover" : l + "-hover", 
            a += " opacity-60"), "primary" !== l && (t += " " + i + "-box_border", "small" === i && (t += " opacity-70")), 
            this.setData({
                _className: t,
                hoverClassName: a
            });
        }
    }
});