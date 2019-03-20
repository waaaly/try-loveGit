Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = Behavior({
    properties: {
        refreshTime: {
            type: Number,
            observer: function() {
                this.refresh();
            }
        }
    },
    methods: {
        refresh: function() {}
    }
});