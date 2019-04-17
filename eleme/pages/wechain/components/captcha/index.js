var e = require("../auth/behavior");

Component({
    behaviors: [ e ],
    properties: {
        image: {
            type: String
        }
    },
    methods: {
        close: function() {
            this.triggerEvent("close");
        }
    }
});