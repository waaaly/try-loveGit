new (require("../../../../bases/component.js").JDComponent)({
    data: {},
    methods: {
        onRecommendLoadError: function(e) {
            0 == e.detail.config.currentPageNum && this.triggerEvent("hideModule");
        }
    }
});