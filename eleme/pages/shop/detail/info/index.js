module.exports = {
    doPreviewImage: function(e) {
        var s = e.target.id, i = this.data.shop.license, c = {
            businessLicense: {
                src: i.business_license_image
            },
            serviceLicense: {
                src: i.catering_service_license_image
            }
        };
        this.setData({
            currentImage: c[s]
        });
    }
};