module.exports = {
    toggleActivity: function() {
        this.setData({
            isActivityFolded: !this.data.isActivityFolded
        });
    }
};