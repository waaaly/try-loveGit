Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.gUserData = exports.getUserPublicInfo = exports.getWXAuth = exports.getUserInfo = exports.getPlusUserInfo = exports.getUserAddressDes = exports.getUserAddressID = exports.updateAddress = exports.getAddress = exports.getUserData = exports.updateUserData = void 0;

var e = function(e) {
    if (e && e.__esModule) return e;
    var s = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (s[r] = e[r]);
    return s.default = e, s;
}(require("./user_info"));

exports.updateUserData = e.updateUserData, exports.getUserData = e.gUserData, exports.getAddress = e.getAddress, 
exports.updateAddress = e.updateAddress, exports.getUserAddressID = e.getUserAddressID, 
exports.getUserAddressDes = e.getUserAddressDes, exports.getPlusUserInfo = e.getPlusUserInfo, 
exports.getUserInfo = e.getUserInfo, exports.getWXAuth = e.getWXAuth, exports.getUserPublicInfo = e.getUserPublicInfo, 
exports.gUserData = e.gUserData;