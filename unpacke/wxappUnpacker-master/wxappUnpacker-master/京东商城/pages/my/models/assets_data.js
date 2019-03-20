function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}

function o() {
    P.info("transferDetail");
    var e = k.default.JD.cookie.get("wid"), t = k.default.JD.cookie.get("wq_skey");
    return new L.default(function(r, n) {
        R.request.get({
            url: "https://wq.jd.com/pinbind/transferDetail",
            data: {
                wq_uin: e,
                wq_skey: t
            },
            ump: {
                bizId: "562",
                opId: "3",
                errBizId: "562",
                errOpId: "4",
                reportHook: function(e) {
                    return [ 0, 13 ].indexOf(e.retcode) >= 0 ? {
                        code: 0
                    } : {
                        code: e.retcode,
                        message: e.errmsg
                    };
                }
            },
            dataType: k.default.isXCX ? "" : "jsonp"
        }).then(function(e) {
            var t = e.body;
            e.header;
            13 != t.retcode ? 0 == t.retcode ? r(t) : n({}) : O.doLogin().then(function() {
                r(o());
            }).catch(function(e) {
                n({});
            });
        }).catch(function(e) {
            e.code, e.message;
            n({});
        });
    });
}

function r(e) {
    var t = e.fromPin, o = e.toPin, n = e.bean, c = e.coupon;
    P.info("assetsTransfer");
    var d = {
        33: "您登录的京东账号已经从其他微信账号转入过资产，资产转移失败。如需使用原微信登录账号内的资产，请退出当前账号并登录其他京东账号进行资产转移。",
        32: "正式账号绑定了多个微信账号，请先解绑。",
        31: "您的微信账号同时绑定了多个京东账号，请先解绑所有账号后，再重新登录一个京东账号进行资产转移。",
        30: "您的默认账号已无可转移资产。",
        53: "资产转移失败，请稍后再试。",
        60: "您当前有未完成订单，请待订单完成后转移资产。",
        61: "您当前账号有未提现余额，请咨询客服提现后再转移资产。",
        62: "您当前账号有未使用的提货卡，请使用后再次转移。",
        63: "您的微信账号中还有未使用的京券，请使用后再进行转移。",
        34: "您的资产正在转移中。"
    };
    return new L.default(function(e, a) {
        R.request.get({
            url: "https://wq.jd.com/pinbind/assetsTransfer",
            data: {
                fromtype: "x",
                fromPin: t,
                toPin: o,
                bean: n,
                coupon: c
            },
            ump: {
                bizId: "562",
                opId: "1",
                errBizId: "562",
                errOpId: "5",
                reportHook: function(e) {
                    return [ 0, 13 ].indexOf(e.retcode) >= 0 || d[e.retcode] ? {
                        code: 0
                    } : {
                        code: e.retcode,
                        message: e.errmsg
                    };
                }
            },
            dataType: k.default.isXCX ? "" : "jsonp"
        }).then(function(i) {
            var s = i.body;
            i.header;
            {
                if (13 != s.retcode) return 0 != s.retcode ? d[s.retcode] ? (s.codeMsg = d[s.retcode], 
                void e(s)) : (s.codeMsg = "资产转移失败，请稍后再试！", void e(s)) : void (0 == s.retcode && e(s));
                O.doLogin().then(function() {
                    e(r({
                        fromPin: t,
                        toPin: o,
                        bean: n,
                        coupon: c
                    }));
                }).catch(function(e) {
                    a({});
                });
            }
        }).catch(function(e) {
            e.code, e.message;
            a({});
        });
    });
}

function n() {
    return new L.default(function(e, t) {
        R.request.get({
            url: "https://wq.jd.com/user/info/QueryWalletBalance",
            data: {},
            ump: {
                bizId: "563",
                opId: "3",
                errBizId: "563",
                errOpId: "32",
                reportHook: function(e) {
                    return [ 0, 13 ].indexOf(e.retcode) >= 0 ? {
                        code: 0
                    } : {
                        code: e.retcode,
                        message: e.msg
                    };
                }
            }
        }).then(function(o) {
            var r = o.body;
            o.header;
            13 == r.retcode ? O.doLogin().then(function() {
                e(n());
            }).catch(function(e) {
                t({});
            }) : 0 == r.retcode ? e(r) : t({
                code: r.retcode
            });
        }).catch(function(e) {
            e.code, e.message;
            t({});
        });
    });
}

function c() {
    return new L.default(function(e, t) {
        var o = {};
        O.getLoginPromise().then(function(r) {
            R.request.get({
                url: "https://wq.jd.com/bases/wuliudetail/notify",
                data: o,
                ump: {
                    bizId: "563",
                    opId: "24",
                    errBizId: "563",
                    errOpId: "33",
                    reportHook: function(e) {
                        return [ 0, 13 ].indexOf(e.errCode) >= 0 ? {
                            code: 0
                        } : {
                            code: e.errCode,
                            message: e.errMsg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(o) {
                var r = o.body;
                o.header;
                13 == r.errCode ? O.doLogin().then(function() {
                    e(c());
                }).catch(function(e) {
                    t(e);
                }) : 0 == r.errCode ? e(r) : t();
            }).catch(function(e) {
                var o = e.code, r = e.message;
                t({
                    code: o,
                    message: r
                });
            });
        }).catch(function(e) {
            t({}), P.error(e);
        });
    });
}

function d(e) {
    return new L.default(function(t, o) {
        var r = {
            callersource: k.default.isXCX ? "wxprogram" : "mainorder"
        };
        O.getLoginPromise().then(function(n) {
            R.request.get({
                url: "https://wq.jd.com/bases/orderlist/GetOrderSiteCount",
                data: r,
                ump: {
                    bizId: "563",
                    opId: "4",
                    errBizId: "563",
                    errOpId: "34",
                    reportHook: function(e) {
                        return 0 == e.ret_code || 13 == e.ret_code ? {
                            code: 0
                        } : {
                            code: e.ret_code,
                            message: e.err_msg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(r) {
                var n = r.body;
                r.header;
                13 == n.ret_code ? O.doLogin().then(function() {
                    t(d(e));
                }).catch(function(e) {
                    o(e);
                }) : 0 == n.ret_code ? t(n) : e ? t({}) : o();
            }).catch(function(r) {
                var n = r.code, c = r.message;
                e ? t({
                    code: n,
                    message: c
                }) : o({
                    code: n,
                    message: c
                });
            });
        }).catch(function(e) {
            o({}), P.error(e);
        });
    });
}

function a(e) {
    return new L.default(function(t, o) {
        var r = {
            cp: 1,
            pageSize: 1,
            bgetInfo: 1
        };
        O.getLoginPromise().then(function(n) {
            R.request.get({
                url: "https://wq.jd.com/fav/comm/FavCommQuery",
                data: r,
                ump: {
                    bizId: "563",
                    opId: "5",
                    errBizId: "563",
                    errOpId: "35",
                    reportHook: function(e) {
                        return [ 0, 9999 ].indexOf(e.iRet) >= 0 ? {
                            code: 0
                        } : {
                            code: e.iRet,
                            message: e.errMsg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(r) {
                var n = r.body;
                r.header;
                0 == n.iRet ? t(n) : 9999 == n.iRet ? O.doLogin().then(function() {
                    t(a(e));
                }).catch(function(e) {
                    o(e);
                }) : e ? t({}) : o();
            }).catch(function(r) {
                var n = r.code, c = r.message;
                e ? t({
                    code: n,
                    message: c
                }) : o({
                    code: n,
                    message: c
                });
            });
        }).catch(function(e) {
            o({}), P.error(e);
        });
    });
}

function i(e) {
    return new L.default(function(t, o) {
        var r = {
            cp: 1,
            pageSize: 1,
            callback: "loadShopListCbk",
            _: Math.round(2147483647 * Math.random())
        };
        O.getLoginPromise().then(function(n) {
            R.request.get({
                url: "https://wq.jd.com/fav/shop/QueryShopFavList",
                data: r,
                ump: {
                    bizId: "563",
                    opId: "7",
                    errBizId: "563",
                    errOpId: "36",
                    reportHook: function(e) {
                        return 0 == e.iRet || 9999 == e.iRet ? {
                            code: 0
                        } : {
                            code: e.iRet,
                            message: e.errMsg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp",
                jsonpCallback: "loadShopListCbk"
            }).then(function(r) {
                var n = r.body;
                r.header;
                9999 == n.iRet ? O.doLogin().then(function() {
                    t(i(e));
                }).catch(function(e) {
                    o(e);
                }) : 0 == n.iRet ? t(n) : e ? t({}) : o();
            }).catch(function(r) {
                var n = r.code, c = r.message;
                e ? t({
                    code: n,
                    message: c
                }) : o({
                    code: n,
                    message: c
                });
            });
        }).catch(function(e) {
            o({}), P.error(e);
        });
    });
}

function s(e) {
    return new L.default(function(t, o) {
        var r = {};
        O.getLoginPromise().then(function(n) {
            R.request.get({
                url: "https://wq.jd.com/bases/favorite/dpfavnum",
                data: r,
                ump: {
                    bizId: "563",
                    opId: "8",
                    errBizId: "563",
                    errOpId: "37",
                    reportHook: function(e) {
                        return 0 == e.errCode || 13 == e.errCode ? {
                            code: 0
                        } : {
                            code: e.errCode,
                            message: e.msg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(r) {
                var n = r.body;
                r.header;
                0 == n.errCode ? t(n) : 13 == n.errCode ? O.doLogin().then(function() {
                    t(s(e));
                }).catch(function(e) {
                    o(e);
                }) : e ? t({}) : o();
            }).catch(function(r) {
                var n = r.code, c = r.message;
                e ? t({
                    code: n,
                    message: c
                }) : o({
                    code: n,
                    message: c
                });
            });
        }).catch(function(e) {
            o({}), P.error(e);
        });
    });
}

function u(e) {
    return new L.default(function(t, o) {
        var r = {};
        O.getLoginPromise().then(function(n) {
            R.request.get({
                url: "https://wq.jd.com/bases/footprints/getcount",
                data: r,
                ump: {
                    bizId: "563",
                    opId: "9",
                    errBizId: "563",
                    errOpId: "38",
                    reportHook: function(e) {
                        return 0 == e.errcode || 13 == e.errcode ? {
                            code: 0
                        } : {
                            code: e.errcode,
                            message: e.msg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp",
                jsonpCallback: "CallbackGetnum"
            }).then(function(r) {
                var n = r.body;
                r.header;
                0 == n.errcode ? t(n) : 13 == n.errcode ? O.doLogin().then(function() {
                    t(u(e));
                }).catch(function(e) {
                    o(e);
                }) : e ? t({}) : o();
            }).catch(function(r) {
                var n = r.code, c = r.message;
                e ? t({
                    code: n,
                    message: c
                }) : o({
                    code: n,
                    message: c
                });
            });
        }).catch(function(e) {
            o({}), P.error(e);
        });
    });
}

function f() {
    return new L.default(function(e, t) {
        var o = {
            pagesize: 1,
            pagenum: 1,
            gettype: 1
        };
        O.getLoginPromise().then(function(r) {
            R.request.get({
                url: "https://wq.jd.com/activeapi/getjdgiftcards",
                data: o,
                ump: {
                    bizId: "563",
                    opId: "15",
                    errBizId: "563",
                    errOpId: "39",
                    reportHook: function(e) {
                        return [ 0, 2 ].indexOf(e.ret) >= 0 ? {
                            code: 0
                        } : {
                            code: e.ret,
                            message: e.retmsg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(o) {
                var r = o.body;
                o.header;
                0 == r.ret ? e(r) : 2 == r.ret ? O.doLogin().then(function() {
                    e(f());
                }).catch(function(e) {
                    t(e);
                }) : t();
            }).catch(function(e) {
                var o = e.code, r = e.message;
                t({
                    code: o,
                    message: r
                });
            });
        }).catch(function(e) {
            t({}), P.error(e);
        });
    });
}

function p(e, t, o) {
    return new L.default(function(r, n) {
        var c = {
            pageNum: e,
            pageSize: t,
            validType: o,
            _t: Math.random()
        };
        O.getLoginPromise().then(function(d) {
            R.request.get({
                url: "https://wq.jd.com/user/info/GetGiftCardInfo",
                data: c,
                ump: {
                    bizId: "563",
                    opId: "22",
                    errBizId: "563",
                    errOpId: "40",
                    reportHook: function(e) {
                        return [ 0, 102, 13 ].indexOf(e.errCode) >= 0 ? {
                            code: 0
                        } : {
                            code: e.errCode,
                            message: e.errMsg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(c) {
                var d = c.body;
                c.header;
                (0 == d.errCode || 102 == d.errCode) && d.sumCount >= 0 ? r(d) : 13 == d.errCode ? O.doLogin().then(function() {
                    r(p(e, t, o));
                }).catch(function(e) {
                    n(e);
                }) : n(d.errCode);
            }).catch(function(e) {
                var t = e.code, o = e.message;
                n({
                    code: t,
                    message: o
                });
            });
        }).catch(function(e) {
            n({}), P.error(e);
        });
    });
}

function m(e) {
    return new L.default(function(t, o) {
        var r = {};
        O.getLoginPromise().then(function(n) {
            R.request.get({
                url: "https://wq.jd.com/bases/orderlist/GetCommentNum",
                data: r,
                ump: {
                    bizId: "563",
                    opId: "10",
                    errBizId: "563",
                    errOpId: "41",
                    reportHook: function(e) {
                        return 0 == e.ret_code || 13 == e.ret_code ? {
                            code: 0
                        } : {
                            code: e.ret_code,
                            message: e.err_msg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(r) {
                var n = r.body;
                r.header;
                13 == n.ret_code ? O.doLogin().then(function() {
                    t(m(e));
                }).catch(function(e) {
                    o(e);
                }) : 0 == n.ret_code ? t(n) : e ? t({}) : o();
            }).catch(function(r) {
                var n = r.code, c = r.message;
                e ? t({
                    code: n,
                    message: c
                }) : o({
                    code: n,
                    message: c
                });
            });
        }).catch(function(e) {
            o({}), P.error(e);
        });
    });
}

function g() {
    return new L.default(function(e, t) {
        var o = {
            flag: 1
        };
        O.getLoginPromise().then(function(r) {
            R.request.get({
                url: "https://wq.jd.com/mjgj/column/GetUserShopBrowseRSize",
                data: o,
                ump: {
                    bizId: "563",
                    opId: "20",
                    errBizId: "563",
                    errOpId: "45",
                    reportHook: function(e) {
                        return [ 0, 13 ].indexOf(e.retcode) >= 0 ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.errmsg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(o) {
                var r = o.body;
                o.header;
                13 == r.retcode ? O.doLogin().then(function() {
                    e(g());
                }).catch(function(e) {
                    t(e);
                }) : 0 == r.retcode ? e(r) : t();
            }).catch(function(e) {
                var o = e.code, r = e.message;
                t({
                    code: o,
                    message: r
                });
            });
        }).catch(function(e) {
            t({}), P.error(e);
        });
    });
}

function h() {
    return new L.default(function(e, t) {
        var o = {};
        O.getLoginPromise().then(function(r) {
            R.request.get({
                url: "https://wq.jd.com/mjgj/column/ClickBrowse",
                data: o,
                ump: {
                    bizId: "563",
                    opId: "19",
                    errBizId: "563",
                    errOpId: "46",
                    reportHook: function(e) {
                        return [ 0, 13 ].indexOf(e.retcode) >= 0 ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.errmsg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(o) {
                var r = o.body;
                o.header;
                13 == r.retcode ? O.doLogin().then(function() {
                    e(h());
                }).catch(function(e) {
                    t(e);
                }) : 0 == r.retcode ? (k.default.JD.report.umpBiz({
                    bizid: "563",
                    operation: 19,
                    result: 0,
                    message: "ret:suc"
                }), e(r)) : (t(), k.default.JD.report.umpBiz({
                    bizid: "563",
                    operation: 19,
                    result: r.retcode,
                    message: r.errmsg
                }));
            }).catch(function(e) {
                var o = e.code, r = e.message;
                t({
                    code: o,
                    message: r
                }), k.default.JD.report.umpBiz({
                    bizid: "563",
                    operation: 19,
                    result: 999,
                    message: "ret:fail" + r
                });
            });
        }).catch(function(e) {
            t({}), P.error(e);
        });
    });
}

function l() {
    return new L.default(function(e, t) {
        var o = {};
        O.getLoginPromise().then(function(r) {
            R.request.get({
                url: "https://wq.jd.com/vipplus/VerifyAuthUser",
                data: o,
                ump: {
                    bizId: "903",
                    opId: "31",
                    errBizId: "903",
                    errOpId: "32",
                    reportHook: function(e) {
                        return 0 == e.retcode || 13 == e.retcode ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.msg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(o) {
                var r = o.body;
                o.header;
                13 == r.retcode ? O.doLogin().then(function() {
                    e(l());
                }).catch(function(e) {
                    t(e);
                }) : 0 == r.retcode ? e(r) : t();
            }).catch(function(e) {
                var o = e.code, r = e.message;
                t({
                    code: o,
                    message: r
                });
            });
        }).catch(function(e) {
            t({}), P.error(e);
        });
    });
}

function v() {
    return new L.default(function(e, t) {
        var o = [ "weixin", "weixin", "qq", "m" ], r = {
            bussinessType: "535",
            rurl: 0 == D ? "/pages/my/index/index" : location.href
        };
        3 == D && (r.sceneval = 2), r.scene = o[D], O.getLoginPromise().then(function(o) {
            R.request.get({
                url: "https://wq.jd.com/vipplus/LoginBrigdeAuthName",
                data: r,
                ump: {
                    bizId: "563",
                    opId: "18",
                    errBizId: "563",
                    errOpId: "47",
                    reportHook: function(e) {
                        return [ 0, 13 ].indexOf(e.retcode) >= 0 ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.msg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(o) {
                var r = o.body;
                o.header;
                13 == r.retcode ? O.doLogin().then(function() {
                    e(v());
                }).catch(function(e) {
                    t(e);
                }) : 0 == r.retcode ? e(r) : t({
                    code: r.retcode
                });
            }).catch(function(e) {
                var o = e.code, r = e.message;
                t({
                    code: o,
                    message: r
                });
            });
        }).catch(function(e) {
            t({}), P.error(e);
        });
    });
}

function I() {
    return new L.default(function(e, t) {
        var o = {};
        O.getLoginPromise().then(function(r) {
            R.request.get({
                url: "https://wq.jd.com/user/info/QueryJDUserOtherPinAssets",
                data: o,
                ump: {
                    bizId: "563",
                    opId: "48",
                    errBizId: "563",
                    errOpId: "49",
                    reportHook: function(e) {
                        return [ 0, 13 ].indexOf(e.errcode) >= 0 ? {
                            code: 0
                        } : {
                            code: e.errcode,
                            message: e.msg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(o) {
                var r = o.body;
                o.header;
                13 == r.errcode ? O.doLogin().then(function() {
                    e(I());
                }).catch(function(e) {
                    t(e);
                }) : 0 == r.errcode ? e(r) : t({
                    code: r.errcode
                });
            }).catch(function(e) {
                var o = e.code, r = e.message;
                t({
                    code: o,
                    message: r
                });
            });
        }).catch(function(e) {
            t({}), P.error(e);
        });
    });
}

function y(e, t, o) {
    var r = {
        ext: "hj:x",
        active: e,
        level: t,
        t: new Date().getTime()
    };
    O.getLoginPromise().then(function(n) {
        R.request.get({
            url: "https://wq.jd.com/active/active_draw",
            data: r,
            ump: {
                bizId: "601",
                opId: "11",
                errBizId: "601",
                errOpId: "26",
                reportHook: function(e) {
                    return [ 0, 5, 2, 147, 164, 16, 179, 185 ].indexOf(e.ret) >= 0 ? {
                        code: 0
                    } : {
                        code: e.ret,
                        message: e.retmsg
                    };
                }
            },
            dataType: k.default.isXCX ? "" : "jsonp"
        }).then(function(r) {
            var n = r.body;
            r.header;
            0 == n.ret ? o(n) : 2 == n.ret ? O.doLogin().then(function() {
                y(e, t, o);
            }).catch(function(e) {
                o(n);
            }) : o(n);
        }).catch(function(e) {
            var t = e.code, r = e.message;
            o && o(t, r);
        });
    }).catch(function(e) {
        P.error(e);
    });
}

function w(e) {
    return new L.default(function(t, o) {
        var r = {
            pin: e,
            off: 1
        };
        O.getLoginPromise().then(function(n) {
            R.request.get({
                url: "https://wq.jd.com/activet2/oppo/queryexemption",
                data: r,
                ump: {
                    bizId: "563",
                    opId: "26",
                    errBizId: "563",
                    errOpId: "50",
                    reportHook: function(e) {
                        return [ 0, 2 ].indexOf(e.errcode) >= 0 ? {
                            code: 0
                        } : {
                            code: e.errcode,
                            message: e.msg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(r) {
                var n = r.body;
                r.header;
                2 == n.errcode ? O.doLogin().then(function() {
                    t(w(e));
                }).catch(function(e) {
                    o(e);
                }) : 0 == n.errcode ? t(n) : o({
                    code: n.errcode
                });
            }).catch(function(e) {
                var t = e.code, r = e.message;
                o({
                    code: t,
                    message: r
                });
            });
        }).catch(function(e) {
            o({}), P.error(e);
        });
    });
}

function b() {
    return new L.default(function(e, t) {
        var o = {};
        3 == D && (o.sceneval = 2), O.getLoginPromise().then(function(r) {
            R.request.get({
                url: "https://wq.jd.com/fav/comm/FavQueryGoodsTotalAndRedPoint",
                data: o,
                ump: {
                    bizId: "563",
                    opId: "28",
                    errBizId: "563",
                    errOpId: "51",
                    reportHook: function(e) {
                        return 0 == e.iRet || 9999 == e.iRet ? {
                            code: 0
                        } : {
                            code: e.iRet,
                            message: e.errMsg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(o) {
                var r = o.body;
                o.header;
                9999 == r.iRet ? O.doLogin().then(function() {
                    e(b());
                }).catch(function(e) {
                    t(e);
                }) : 0 == r.iRet ? e(r) : t("iRet = " + r.iRet);
            }).catch(function(e) {
                var o = e.code, r = e.message;
                t({
                    code: o,
                    message: r
                });
            });
        }).catch(function(e) {
            t("login failed:" + e);
        });
    });
}

function x() {
    return new L.default(function(e, t) {
        O.getLoginPromise().then(function(o) {
            R.request.get({
                url: "https://wq.jd.com/user/msgcenter/QueryShopRedPoint",
                dataType: k.default.isXCX ? "" : "jsonp",
                ump: {
                    bizId: "563",
                    opId: "29",
                    errBizId: "563",
                    errOpId: "52",
                    reportHook: function(e) {
                        return [ 0, 9999 ].indexOf(e.iRet) >= 0 ? {
                            code: 0
                        } : {
                            code: e.iRet,
                            message: e.msg
                        };
                    }
                }
            }).then(function(o) {
                var r = o.body;
                o.header;
                9999 == r.iRet ? O.doLogin().then(function() {
                    e(x());
                }).catch(function(e) {
                    t(e);
                }) : 0 == r.iRet ? e(r) : t("iRet = " + r.iRet);
            }).catch(function(e) {
                var o = e.code, r = e.message;
                t({
                    code: o,
                    message: r
                });
            });
        }).catch(function(e) {
            t("login failed:" + e);
        });
    });
}

function j() {
    return new L.default(function(e, t) {
        var o = setTimeout(function() {
            t("clearGoodFavRedDotTime > 1000ms"), k.default.JD.report.umpBiz({
                bizid: "563",
                operation: 31,
                result: 1100,
                message: "clearGoodFavRedDotTime > 1000ms"
            });
        }, 1e3), r = {};
        3 == D && (r.sceneval = 2), O.getLoginPromise().then(function(n) {
            R.request.get({
                url: "https://wq.jd.com/fav/comm/clearFavGoodsRedPoint",
                data: r,
                ump: {
                    bizId: "563",
                    opId: "30",
                    errBizId: "563",
                    errOpId: "53",
                    reportHook: function(e) {
                        return [ 0, 9999 ].indexOf(e.iRet) >= 0 ? {
                            code: 0
                        } : {
                            code: e.iRet,
                            message: e.msg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(r) {
                var n = r.body;
                r.header;
                9999 == n.iRet ? O.doLogin().then(function() {
                    e(j());
                }).catch(function(e) {
                    t(e);
                }) : 0 == n.iRet ? (e(n), clearTimeout(o)) : (t("iRet = " + n.iRet), clearTimeout(o));
            }).catch(function(e) {
                var r = e.code, n = e.message;
                t({
                    code: r,
                    message: n
                }), clearTimeout(o);
            });
        }).catch(function(e) {
            t("login failed:" + e);
        });
    });
}

function q() {
    return new L.default(function(e, t) {
        var o = setTimeout(function() {
            t("clearShopFavRedDotTime > 1000ms"), k.default.JD.report.umpBiz({
                bizid: "563",
                operation: 31,
                result: 1100,
                message: "clearShopFavRedDotTime > 1000ms"
            });
        }, 1e3);
        O.getLoginPromise().then(function(r) {
            R.request.get({
                url: "https://wq.jd.com/user/msgcenter/ClearShopRedPoint",
                dataType: k.default.isXCX ? "" : "jsonp",
                ump: {
                    bizId: "563",
                    opId: "31",
                    errBizId: "563",
                    errOpId: "54",
                    reportHook: function(e) {
                        return [ 0, 9999 ].indexOf(e.iRet) >= 0 ? {
                            code: 0
                        } : {
                            code: e.iRet,
                            message: e.msg
                        };
                    }
                }
            }).then(function(r) {
                var n = r.body;
                r.header;
                9999 == n.iRet ? O.doLogin().then(function() {
                    e(q());
                }).catch(function(e) {
                    t(e);
                }) : 0 == n.iRet ? (e(n), clearTimeout(o)) : (t("iRet = " + n.iRet), clearTimeout(o));
            }).catch(function(e) {
                var r = e.code, n = e.message;
                t({
                    code: r,
                    message: n
                }), clearTimeout(o);
            });
        }).catch(function(e) {
            t("login failed:" + e);
        });
    });
}

function C() {
    var e = [ "weixin", "weixin", "qq" ], t = {
        type: 2
    };
    return 3 == D ? (t.sceneval = 2, t.scene = "weixin") : t.scene = e[D], new L.default(function(e, o) {
        R.request.get({
            url: "https://wq.jd.com/vipplus/GetPlusVerifyStatusInfo",
            data: t,
            ump: {
                bizId: "903",
                opId: "13",
                errBizId: "903",
                errOpId: "14",
                reportHook: function(e) {
                    return [ 0, 2, 4, 13, 42 ].indexOf(e.retcode) >= 0 ? {
                        code: 0
                    } : {
                        code: e.retcode,
                        message: e.msg
                    };
                }
            },
            dataType: k.default.isXCX ? "" : "jsonp",
            jsonpCallback: "jsonpCBKL"
        }).then(function(t) {
            var r = t.body;
            13 != r.retcode ? 0 == r.retcode ? e(r.data) : o() : O.doLogin().then(function() {
                e(C());
            });
        }).catch(function(e) {
            o();
        });
    });
}

function z() {
    return new L.default(function(e, t) {
        R.request.get({
            url: "https://wq.jd.com/user/info/QueryXBCreditScore",
            data: {
                sceneval: 3 == D ? 2 : ""
            },
            ump: {
                key: "wq.webmonitor.mjgj.my.QueryXBCreditScore",
                bizId: "47",
                opId: "65",
                errBizId: "47",
                errOpId: "66",
                reportHook: function(e) {
                    return 0 == e.retcode || 915 == e.retcode || 916 == e.retcode || 917 == e.retcode ? {
                        code: 0
                    } : {
                        code: e.retcode,
                        message: e.msg
                    };
                }
            },
            dataType: k.default.isXCX ? "" : "jsonp"
        }).then(function(o) {
            var r = o.body;
            13 != r.retcode ? 0 == r.retcode && r.data && r.data.length ? e(r) : t(r.retcode) : O.doLogin(3 == D ? {
                env: ""
            } : {}).then(function() {
                e(z());
            });
        }).catch(function(e) {
            t(e);
        });
    });
}

function X(e) {
    return new L.default(function(t, o) {
        R.request.get({
            url: "https://wq.jd.com/user/info/SetUserBirthday",
            data: {
                nick: e,
                sceneval: 3 == D ? 2 : ""
            },
            ump: {
                key: "wq.webmonitor.mjgj.my.SetUserBirthday",
                bizId: "47",
                opId: "48",
                errBizId: "47",
                errOpId: "48",
                reportHook: function(e) {
                    return 0 == e.retcode || 13 == e.retcode || 103 == e.retcode ? {
                        code: 0
                    } : {
                        code: e.retcode,
                        message: e.msg
                    };
                }
            },
            dataType: k.default.isXCX ? "" : "jsonp"
        }).then(function(o) {
            var r = o.body;
            13 != r.retcode ? t(r) : O.doLogin(3 == D ? {
                env: ""
            } : {}).then(function() {
                t(X(e));
            });
        }).catch(function(e) {
            o(e);
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.fetchBaiTiaoData = exports.changeNickName = exports.queryXBCreditScore = exports.getPlusPpmsConfig = exports.isPlus = exports.clearShopFavRedDot = exports.clearGoodFavRedDot = exports.getShopFavRed = exports.getGoodsFavRed = exports.getPlusTips = exports.getFreeTaskNum = exports.getJDGiftCards = exports.queryOtherPinAssets = exports.getUserShopBrowseRSize = exports.removeFootDot = exports.getVerifyAuthUrl = exports.showJDECard = exports.removeRedIcon = exports.getRedIcon = exports.drawCoupon = exports.getMyNewBindConfig = exports.verifyAuthUser = exports.getMyActivityConfig = exports.showCommentNum = exports.showRecentNum = exports.showDpFavNum = exports.getShopFavNum = exports.getGoodsFavNum = exports.getLogisticsInfo = exports.getOrderNum = exports.loadBalance = exports.assetsTransfer = exports.transferDetail = void 0;

var R = require("../../../common/request/request.js"), O = t(require("../../../common/login/loginv1.js")), L = e(require("../../../libs/promise.min.js")), T = require("../../../common/logger.js"), k = e(require("../../../common/wxcontext")), B = t(require("../common/js/utils")), P = new T.Logger("assetsinfo"), D = B.getEnv();

exports.transferDetail = o, exports.assetsTransfer = r, exports.loadBalance = n, 
exports.getOrderNum = d, exports.getLogisticsInfo = c, exports.getGoodsFavNum = a, 
exports.getShopFavNum = i, exports.showDpFavNum = s, exports.showRecentNum = u, 
exports.showCommentNum = m, exports.getMyActivityConfig = function() {
    return new L.default(function(e, t) {
        R.request.get({
            url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev35174.jsonp",
            ump: {
                bizId: "903",
                opId: "11",
                errBizId: "903",
                errOpId: "12",
                reportHook: function(e) {
                    return e && e.data && e.data[0] ? {
                        code: 0
                    } : {
                        code: 1,
                        message: "ppms config 配置不全"
                    };
                }
            },
            dataType: k.default.isXCX ? "" : "jsonp",
            jsonpCallback: "showPageData35174"
        }).then(function(t) {
            var o = t.body, r = (t.header, o.data || []);
            e(r);
        }).catch(function(e) {
            e.code, e.message, t();
        });
    });
}, exports.verifyAuthUser = l, exports.getMyNewBindConfig = function() {
    return new L.default(function(e, t) {
        R.request.get({
            url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev34862.jsonp",
            ump: {
                bizId: "903",
                opId: "9",
                errBizId: "903",
                errOpId: "10",
                reportHook: function(e) {
                    return e && e.data && e.data[0] ? {
                        code: 0
                    } : {
                        code: 1,
                        message: "ppms config 配置不全"
                    };
                }
            },
            dataType: k.default.isXCX ? "" : "jsonp",
            jsonpCallback: "showPageData34862"
        }).then(function(t) {
            var o = t.body, r = (t.header, o.data || []);
            e(r);
        }).catch(function(e) {
            e.code, e.message, t();
        });
    });
}, exports.drawCoupon = y, exports.getRedIcon = function(e, t) {
    return new L.default(function(o, r) {
        var n = {
            type: e
        };
        3 == D && (n.sceneid = 2), O.getLoginPromise().then(function(e) {
            R.request.get({
                url: "https://wq.jd.com/user_redpoint/QueryUserRedPoint",
                data: n,
                ump: {
                    bizId: "563",
                    opId: "13",
                    errBizId: "563",
                    errOpId: "42",
                    reportHook: function(e) {
                        return [ 0 ].indexOf(e.iRet) >= 0 ? {
                            code: 0
                        } : {
                            code: e.iRet,
                            message: e.msg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(e) {
                var n = e.body;
                e.header, 0 == n.iRet ? o(n) : t ? o({}) : r();
            }).catch(function(e) {
                var n = e.code, c = e.message;
                t ? o({
                    code: n,
                    message: c
                }) : r({
                    code: n,
                    message: c
                });
            });
        }).catch(function(e) {
            r({}), P.error(e);
        });
    });
}, exports.removeRedIcon = function(e) {
    return new L.default(function(t, o) {
        var r = {
            type: e
        };
        3 == D && (r.sceneid = 2), O.getLoginPromise().then(function(e) {
            R.request.get({
                url: "https://wq.jd.com/user_redpoint/ClearUserRedPoint",
                data: r,
                ump: {
                    bizId: "563",
                    opId: "14",
                    errBizId: "563",
                    errOpId: "43",
                    reportHook: function(e) {
                        return [ 0 ].indexOf(e.iRet) >= 0 ? {
                            code: 0
                        } : {
                            code: e.iRet,
                            message: e.msg
                        };
                    }
                },
                dataType: k.default.isXCX ? "" : "jsonp"
            }).then(function(e) {
                var r = e.body;
                e.header, 0 == r.iRet ? t(r) : o();
            }).catch(function(e) {
                var t = e.code, r = e.message;
                o({
                    code: t,
                    message: r
                });
            });
        }).catch(function(e) {
            o({}), P.error(e);
        });
    });
}, exports.showJDECard = f, exports.getVerifyAuthUrl = v, exports.removeFootDot = h, 
exports.getUserShopBrowseRSize = g, exports.queryOtherPinAssets = I, exports.getJDGiftCards = p, 
exports.getFreeTaskNum = w, exports.getPlusTips = function() {
    return new L.default(function(e, t) {
        R.request.get({
            url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33258.jsonp",
            ump: {
                bizId: "903",
                opId: "7",
                errBizId: "903",
                errOpId: "8",
                reportHook: function(e) {
                    return e && e.data && e.data[0] ? {
                        code: 0
                    } : {
                        code: 1,
                        message: "ppms config 配置不全"
                    };
                }
            },
            dataType: k.default.isXCX ? "" : "jsonp",
            jsonpCallback: "showPageData33258"
        }).then(function(t) {
            var o = t.body, r = (t.header, o.data || []);
            e(r);
        }).catch(function(e) {
            e.code;
            var o = e.message;
            t(o);
        });
    });
}, exports.getGoodsFavRed = b, exports.getShopFavRed = x, exports.clearGoodFavRedDot = j, 
exports.clearShopFavRedDot = q, exports.isPlus = C, exports.getPlusPpmsConfig = function() {
    return new L.default(function(e, t) {
        R.request.get({
            url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev34966.jsonp",
            ump: {
                bizId: "903",
                opId: "5",
                errBizId: "903",
                errOpId: "6",
                reportHook: function(e) {
                    return e && e.data && e.data[0] ? {
                        code: 0
                    } : {
                        code: 1,
                        message: "ppms config 配置不全"
                    };
                }
            },
            dataType: k.default.isXCX ? "" : "jsonp",
            jsonpCallback: "showPageData34966"
        }).then(function(t) {
            var o = t.body, r = (t.header, o.data || []);
            e(r);
        }).catch(function(t) {
            t.code, t.message, e([]);
        });
    });
}, exports.queryXBCreditScore = z, exports.changeNickName = X, exports.fetchBaiTiaoData = function() {
    return new L.default(function(e, t) {
        R.request.get({
            url: "https://wq.jd.com/user/smsmsg/QueryIOUsLimit",
            data: {},
            ump: {
                key: "wq.webmonitor.mjgj.my.QueryIOUsLimit",
                bizId: "47",
                opId: "8",
                errBizId: "47",
                errOpId: "16",
                reportHook: function(e) {
                    return 0 == e.ret || 1 == e.ret ? {
                        code: 0
                    } : {
                        code: e.ret,
                        message: e.msg
                    };
                }
            },
            dataType: k.default.isXCX ? "" : "jsonp"
        }).then(function(t) {
            var o = t.body;
            e(o);
        }).catch(function(e) {
            t(e);
        });
    });
};