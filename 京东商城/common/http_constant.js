Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    ENCODE_GBK: "GBK",
    ENCODE_UTF8: "UTF-8",
    SUCCESS: 1,
    FAIL: 0,
    RETRY: 2,
    NORMAL_PRIORITY: 20,
    HIGH_PRIORITY: 10,
    LOW_PRIORITY: 30,
    CHANNEL_HTTP: 1,
    CHANNEL_WS: 2,
    DEFAULT_HTTP_CONCURRENCY: 5,
    DEFAULT_WS_CONCURRENCY: 30,
    WS_REQUEST_TIMEOUT: 6e3,
    RET_HTTP_RESPONSE_ERROR: -30,
    RET_HTTP_NETWORK_ERROR: -40,
    RET_WS_CONNECT_ERROR: -20,
    RET_WS_REQUEST_TIMEOUT: -10,
    Text_RET_HTTP_RESPONSE_ERROR: "系统有点问题，请稍后再试！",
    Text_RET_HTTP_NETWORK_ERROR: "请检查你的网络是否正常！",
    Text_RET_WS_CONNECT_ERROR: "请检查你的网络是否正常！",
    Text_RET_WS_REQUEST_TIMEOUT: "你的网络有点慢，请重试一遍！"
};