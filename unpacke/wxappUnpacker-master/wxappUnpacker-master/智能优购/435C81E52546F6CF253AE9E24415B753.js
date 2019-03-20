module.exports = {
    GetCache: function(e) {
        return wx.downloadFile({
            url: "https://example.com/audio/123",
            success: function(e) {
                200 === e.statusCode && wx.playVoice({
                    filePath: e.tempFilePath
                });
            }
        }), "";
    }
};