Component({
    properties: {
        cash: {
            type: Number
        }
    },
    methods: {
        close: function() {
            this.triggerEvent("close");
        }
    }
});