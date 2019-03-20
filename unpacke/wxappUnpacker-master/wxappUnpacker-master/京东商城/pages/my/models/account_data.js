function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}

function n(e) {
    return _.info("accountChange："), new x.default(function(t, o) {
        j.request.get({
            url: "https://wq.jd.com/pinbind/switchAccount",
            data: {
                fromtype: B,
                expectPin: w.base64encode(encodeURIComponent(e)),
                rurl: T,
                atk: 9,
                flogin: 1,
                flogin_chn: M,
                flogin_appid: L
            },
            ump: {
                bizId: "558",
                opId: "4",
                errBizId: "558",
                errOpId: "17",
                reportHook: function(e) {
                    return 0 == e.retcode || 13 == e.retcode ? {
                        code: 0
                    } : {
                        code: e.retcode,
                        message: e.errmsg
                    };
                }
            },
            dataType: C.default.isXCX ? "" : "jsonp"
        }).then(function(r) {
            var i = r.body;
            r.header;
            13 != i.retcode ? 0 == i.retcode ? 0 == i.retcode && (C.default.isXCX ? (h(i), q.getUserInfo(function(e, n) {
                0 == e ? (i.wq_skey && C.default.isXCX && q.updateUserData({
                    pin: i.flogin_pin,
                    wq_skey: i.wq_skey,
                    pinId: i.flogin_pinId,
                    pinsign: i.flogin_pinsign
                }), t(i)) : t(i);
            })) : t(i)) : o({}) : y.doLogin().then(function() {
                t(n(e));
            }).catch(function(e) {
                o({});
            });
        }).catch(function(e) {
            e.code, e.message;
            o({});
        });
    });
}

function o(e) {
    _.info("judge:begin");
    var t = {
        phonenum: w.base64encode(e),
        _t: Math.round(2147483647 * Math.random())
    };
    return y.getLoginPromise().then(function(n) {
        return new x.default(function(n, r) {
            j.request.get({
                url: "https://wq.jd.com/user/smsmsg/GetPinByMobile",
                data: t,
                ump: {
                    bizId: "601",
                    opId: "3",
                    errBizId: "601",
                    errOpId: "16",
                    reportHook: function(e) {
                        return 0 == e.ret ? {
                            code: 0
                        } : {
                            code: e.ret,
                            message: e.msg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(t) {
                var i = t.body, d = (t.header, i);
                if (_.info("judge:success" + JSON.stringify(d)), 1 == d.data.noLogin) return y.doLogin().then(function() {
                    n(o(e));
                }).catch(function(e, t) {
                    r({});
                }), !1;
                0 == d.ret ? (1 == d.result ? 1 == d.data.BindType || 3 == d.data.BindType ? d.type = 1 : d.type = 2 : d.type = 3, 
                n(d)) : r({});
            }).catch(function(e) {
                e.code, e.message;
                _.info("judge:error"), r({});
            });
        });
    });
}

function r(e) {
    _.info("register:begin");
    var t = {
        fromtype: B,
        _t: Math.round(2147483647 * Math.random()),
        flogin: 1,
        flogin_chn: M,
        flogin_appid: L
    };
    return Object.assign(t, e), y.getLoginPromise().then(function(n) {
        return new x.default(function(n, o) {
            j.request.get({
                url: "https://wq.jd.com/pinbind/regBind",
                data: t,
                ump: {
                    bizId: "601",
                    opId: "4",
                    errBizId: "601",
                    errOpId: "17",
                    reportHook: function(e) {
                        return 0 == e.retcode || 13 == e.retcode || v[e.retcode] ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.errmsg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(t) {
                var i = t.body, d = (t.header, i);
                if (_.info("register:success" + JSON.stringify(d)), 13 == d.retcode) return y.doLogin().then(function() {
                    n(r(e));
                }).catch(function(e, t) {
                    o({});
                }), !1;
                0 == d.retcode ? (d.tips = "注册成功了~", h(d), d.wq_skey && C.default.isXCX && q.updateUserData({
                    pin: d.flogin_pin,
                    wq_skey: d.wq_skey,
                    pinId: d.flogin_pinId,
                    pinsign: d.flogin_pinsign
                })) : d.tips = v[d.retcode] || "注册失败", n(d);
            }).catch(function(e) {
                e.code, e.message;
                _.info("register:error"), o({});
            });
        });
    });
}

function i(e) {
    _.info("complete:begin");
    var t = {
        fromtype: B,
        _t: Math.round(2147483647 * Math.random())
    };
    return Object.assign(t, e), y.getLoginPromise().then(function(n) {
        return new x.default(function(n, o) {
            j.request.get({
                url: "https://wq.jd.com/pinbind/bindMobile",
                data: t,
                ump: {
                    bizId: "601",
                    opId: "4",
                    errBizId: "601",
                    errOpId: "18",
                    reportHook: function(e) {
                        return 0 == e.retcode || 13 == e.retcode || v[e.retcode] ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.errmsg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(t) {
                var r = t.body, d = (t.header, r);
                if (_.info("complete:success" + JSON.stringify(d)), 13 == d.retcode) return y.doLogin().then(function() {
                    n(i(e));
                }).catch(function(e, t) {
                    o({});
                }), !1;
                0 == d.retcode ? d.tips = "注册成功了~" : d.tips = v[d.retcode] || "注册失败", n(d);
            }).catch(function(e) {
                e.code, e.message;
                _.info("complete:error"), o({});
            });
        });
    });
}

function d(e) {
    _.info("unbindtelandbind:begin");
    var t = {
        fromtype: B,
        _t: Math.round(2147483647 * Math.random()),
        flogin: 1,
        flogin_chn: M,
        flogin_appid: L
    };
    return Object.assign(t, e), y.getLoginPromise().then(function(n) {
        return new x.default(function(n, o) {
            j.request.get({
                url: "https://wq.jd.com/pinbind/UnbindMobileAndReg",
                data: t,
                ump: {
                    bizId: "601",
                    opId: "19",
                    errBizId: "601",
                    errOpId: "20",
                    reportHook: function(e) {
                        return 0 == e.ret || 13 == e.ret || v[e.ret] ? {
                            code: 0
                        } : {
                            code: e.ret,
                            message: e.errmsg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(t) {
                var r = t.body, i = (t.header, r);
                if (_.info("unbindtelandbind:success" + JSON.stringify(i)), 13 == i.ret) return y.doLogin().then(function() {
                    n(d(e));
                }).catch(function(e, t) {
                    o({});
                }), !1;
                0 == i.ret ? (i.tips = "解绑并重新关联成功了~", h(i), i.wq_skey && C.default.isXCX && q.updateUserData({
                    pin: i.flogin_pin,
                    wq_skey: i.wq_skey,
                    pinId: i.flogin_pinId,
                    pinsign: i.flogin_pinsign
                }), n(i)) : (i.tips = v[i.ret] || "解绑并重新关联失败，请稍后再试", o(i));
            }).catch(function(e) {
                e.code, e.message;
                _.info("unbindtelandbind:error"), o({});
            });
        });
    });
}

function c(e) {
    _.info("login:begin");
    var t = {
        fromtype: B,
        _t: Math.round(2147483647 * Math.random()),
        flogin: 1,
        flogin_chn: M,
        flogin_appid: L
    };
    return Object.assign(t, e), y.getLoginPromise().then(function(n) {
        return new x.default(function(n, o) {
            j.request.get({
                url: "https://wq.jd.com/pinbind/loginBind",
                data: t,
                ump: {
                    bizId: "601",
                    opId: "6",
                    errBizId: "601",
                    errOpId: "21",
                    reportHook: function(e) {
                        return 0 == e.retcode || 13 == e.retcode || v[e.retcode] ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.errmsg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(t) {
                var r = t.body, i = (t.header, r);
                if (_.info("login:success" + JSON.stringify(i)), 13 == i.retcode) return y.doLogin().then(function() {
                    n(c(e));
                }).catch(function(e, t) {
                    o({});
                }), !1;
                0 == i.retcode ? (h(i), i.wq_skey && C.default.isXCX && q.updateUserData({
                    pin: i.flogin_pin,
                    wq_skey: i.wq_skey,
                    pinId: i.flogin_pinId,
                    pinsign: i.flogin_pinsign
                })) : (i.tips = v[i.retcode] || "登录失败", i.isUpdateCode = v[i.retcode] ? 1 : 0), 
                n(i);
            }).catch(function(e) {
                e.code, e.message;
                _.info("login:error"), o({});
            });
        });
    });
}

function s(e, t) {
    _.info("getMsgCode:begin");
    var n = {
        mobile: w.base64encode(encodeURIComponent(e)),
        sceneid: 11110,
        _t: Math.random(),
        msgType: t
    };
    return y.getLoginPromise().then(function(o) {
        return new x.default(function(o, r) {
            j.request.get({
                url: "https://wq.jd.com/user/smsmsg/SendMobileMsg",
                data: n,
                ump: {
                    bizId: "601",
                    opId: "8",
                    errBizId: "601",
                    errOpId: "23",
                    reportHook: function(e) {
                        return 0 == e.retcode || 13 == e.retcode ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.msg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(n) {
                var i = n.body;
                n.header;
                if (_.info("getMsgCode:success" + JSON.stringify(i)), 13 == i.retcode) return y.doLogin().then(function() {
                    o(s(e, t));
                }).catch(function(e, t) {
                    r({});
                }), !1;
                0 == i.retcode ? (i.tips = "获取验证码成功了~", o(i)) : r({});
            }).catch(function(e) {
                e.code, e.message;
                _.info("getMsgCode:error"), r({});
            });
        });
    });
}

function u() {
    var e = {
        _t: Math.random()
    };
    return y.getLoginPromise().then(function(t) {
        return new x.default(function(t, n) {
            j.request.get({
                url: "https://wq.jd.com/pinbind/GetPinState",
                data: e,
                ump: {
                    bizId: "601",
                    opId: "9",
                    errBizId: "601",
                    errOpId: "24",
                    reportHook: function(e) {
                        return 0 == e.ret || 13 == e.ret ? {
                            code: 0
                        } : {
                            code: e.ret,
                            message: e.msg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(e) {
                var o = e.body;
                e.header;
                if (_.info("getPinstatus:success" + JSON.stringify(o)), 13 == o.ret) return y.doLogin().then(function() {
                    t(u());
                }).catch(function(e, t) {
                    n({});
                }), !1;
                0 == o.ret ? (o.type = 0 == o.state || 3 == o.state ? 1 : 0, t(o)) : n({});
            }).catch(function(e) {
                _.info("getPinstatus:error"), n({
                    ret: 41 == e ? 41 : -1,
                    msg: "获取失败，请稍候再试"
                });
            });
        });
    });
}

function a() {
    var e = {
        source: 5
    };
    return y.getLoginPromise().then(function(t) {
        return new x.default(function(t, n) {
            j.request.get({
                url: "https://wq.jd.com/user/info/PwdIsActive",
                data: e,
                ump: {
                    bizId: "903",
                    opId: "29",
                    errBizId: "903",
                    errOpId: "30",
                    reportHook: function(e) {
                        return 0 == e.retcode || 13 == e.retcode ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.msg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(e) {
                var o = e.body;
                e.header;
                0 == o.retcode ? t(o) : 13 == o.retcode ? y.doLogin().then(function() {
                    t(a());
                }).catch(function(e) {
                    n({});
                }) : t(o);
            }).catch(function(e) {
                e.code, e.message;
                n({});
            });
        });
    });
}

function f() {
    var e = {};
    return y.getLoginPromise().then(function(t) {
        return new x.default(function(t, n) {
            j.request.get({
                url: "https://wq.jd.com/vipplus/VerifyAuthUser",
                data: e,
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
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(e) {
                var o = e.body;
                e.header;
                0 == o.retcode ? t(o) : 13 == o.retcode ? y.doLogin().then(function() {
                    t(f());
                }).catch(function(e) {
                    n({});
                }) : t(o);
            }).catch(function(e) {
                e.code, e.message;
                n({});
            });
        });
    });
}

function p(e, t) {
    var n = {
        scene: "weixin",
        rurl: e || "/pages/my/index/index",
        bussinessType: t || 538
    };
    return y.getLoginPromise().then(function(o) {
        return new x.default(function(o, r) {
            j.request.get({
                url: "https://wq.jd.com/vipplus/LoginBrigdeAuthName",
                data: n,
                ump: {
                    bizId: "903",
                    opId: "33",
                    errBizId: "903",
                    errOpId: "34",
                    reportHook: function(e) {
                        return 0 == e.retcode || 13 == e.retcode ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.msg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(n) {
                var i = n.body;
                n.header;
                0 == i.retcode ? o(i) : 13 == i.retcode ? y.doLogin().then(function() {
                    o(p(e, t));
                }).catch(function(e) {
                    r({});
                }) : o(i);
            }).catch(function(e) {
                e.code, e.message;
                r({});
            });
        });
    });
}

function g(e) {
    _.info("unbind:begin");
    var t = {
        fromtype: B,
        _t: Math.round(2147483647 * Math.random()),
        flogin: 1,
        flogin_chn: M,
        flogin_appid: L
    }, n = {
        0: "解除关联成功",
        2: "操作过于频繁，请稍后再试",
        40: "密码错误",
        52: "密码过于简单，请重置密码",
        100: "解除关联，请稍后再试",
        71: "为了您的账号安全，30天内不可解除账号关联，如有疑问请致电京东客服（400-606-5500转7）。"
    };
    return Object.assign(t, e), y.getLoginPromise().then(function(o) {
        return new x.default(function(o, r) {
            j.request.get({
                url: "https://wq.jd.com/pinbind/unbind",
                data: t,
                ump: {
                    bizId: "903",
                    opId: "35",
                    errBizId: "903",
                    errOpId: "36",
                    reportHook: function(e) {
                        return 0 == e.retcode || 13 == e.retcode || v[e.retcode] ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.errmsg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(t) {
                var i = t.body, d = (t.header, i);
                if (_.info("unbind:success" + JSON.stringify(d)), 13 == d.retcode) return y.doLogin().then(function() {
                    o(g(e));
                }).catch(function(e, t) {
                    r({});
                }), !1;
                0 == d.retcode ? (d.tips = "解绑成功了~", h(d), d.wq_skey && C.default.isXCX && q.updateUserData({
                    pin: d.flogin_pin,
                    wq_skey: d.wq_skey,
                    pinId: d.flogin_pinId,
                    pinsign: d.flogin_pinsign
                }), o(d)) : (d.tips = n[d.retcode] || "解绑失败了~", o(d));
            }).catch(function(e) {
                e.code, e.message;
                _.info("unbind:error"), r({});
            });
        });
    });
}

function m(e) {
    var t = {
        sceneid: e.sceneid || 11110,
        _t: Math.round(2147483647 * Math.random())
    };
    return new x.default(function(n, o) {
        y.getLoginPromise().then(function(r) {
            j.request.get({
                url: "https://wq.jd.com/user/info/QueryJDUserInfo",
                data: t,
                ump: {
                    key: "wq.webmonitor.mjgj.QueryJDUserInfo",
                    bizId: "601",
                    opId: "12",
                    errBizId: "601",
                    errOpId: "25",
                    reportHook: function(e) {
                        return 0 == e.retcode || 13 == e.retcode ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.msg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(t) {
                var r = t.body, i = (t.header, r);
                if (_.info("getCurPinInfo:success" + JSON.stringify(i)), 13 == i.retcode) return y.doLogin().then(function() {
                    n(m(e));
                }).catch(function(e, t) {
                    o(e);
                }), !1;
                0 == i.retcode ? (C.default.isXCX && (C.default.JD.cookie.set("pin", i.base.curPin, 525600, "/", "jd.com"), 
                C.default.JD.cookie.set("jdpin", i.base.curPin, 525600, "/", "jd.com")), i.curpinType = 0 == i.definePin ? 1 : 1 == i.definePin ? 2 : 3, 
                2 == i.base.accountType && 2 == i.definePin && (i.accountType = k.newNoPin), 2 == i.base.accountType && 1 == i.definePin && (i.accountType = k.defaultNoAssets), 
                1 == i.base.accountType && 1 == i.definePin && (i.accountType = k.defaultHasAssets), 
                3 == i.base.accountType && 1 == i.definePin && (i.accountType = k.morePinWithDefault), 
                3 == i.base.accountType && 0 == i.definePin && (i.accountType = k.morePinWithFormal), 
                0 == i.base.accountType && 0 == i.definePin && (i.accountType = k.formalPin), n(i)) : (i.tips = "获取信息失败了，请稍后再试~", 
                o(i));
            }).catch(function(e) {
                var t = e.code;
                e.message;
                _.info("getCurPinInfo:error"), o(t);
            });
        }).catch(function(e) {
            _.error(e), _.info("getCurPinInfo:catch"), o(e);
        }), _.info("getCurPinInfo:end");
    });
}

function l(e) {
    _.info("getPhoneNum:begin");
    var t = {
        appid: "wx91d27dbf599dff74",
        _t: Math.round(2147483647 * Math.random())
    };
    return Object.assign(t, e), y.getLoginPromise().then(function(n) {
        return new x.default(function(n, o) {
            j.request.get({
                url: "https://wq.jd.com/mlogin/wxapp/GetPhoneNum",
                data: t,
                ump: {
                    bizId: "903",
                    opId: "39",
                    errBizId: "903",
                    errOpId: "40",
                    reportHook: function(e) {
                        return [ 0, 13 ].indexOf(e.retCode) >= 0 ? {
                            code: 0
                        } : {
                            code: e.retCode,
                            message: e.retMsg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(t) {
                var r = t.body, i = (t.header, r);
                if (_.info("getPhoneNum:success" + JSON.stringify(i)), 13 == i.retCode) return y.doLogin().then(function() {
                    n(l(e));
                }).catch(function(e, t) {
                    o({});
                }), !1;
                0 == i.retCode ? n(i) : o({});
            }).catch(function(e) {
                e.code, e.message;
                _.info("getPhoneNum:error"), o({});
            });
        });
    });
}

function h(e) {
    e.wq_skey && (e.pin = e.flogin_pin, e.pinsign = e.flogin_pinsign, e.pinId = e.flogin_pinId, 
    C.default.JD.cookie.set("data", e, 30, "/", "jd.com"));
}

function I() {
    return new x.default(function(e, t) {
        y.getLoginPromise().then(function(n) {
            j.request.get({
                url: "https://wq.jd.com/user/qquserinfo/CheckQQFans",
                ump: {
                    bizId: "903",
                    opId: "45",
                    errBizId: "903",
                    errOpId: "46",
                    reportHook: function(e) {
                        return [ 0, 9 ].indexOf(e.errcode) >= 0 ? {
                            code: 0
                        } : {
                            code: e.errcode,
                            message: e.errmsg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(n) {
                var o = n.body;
                n.header;
                0 == o.errcode ? e(o) : 9 == o.errcode ? e(I()) : t();
            }).catch(function(e) {
                var n = e.code, o = e.message;
                t({
                    code: n,
                    message: o
                });
            });
        }).catch(function(e) {
            _.error(e), t(e);
        });
    });
}

function b() {
    return new x.default(function(e, t) {
        y.getLoginPromise().then(function(n) {
            j.request.get({
                url: "https://wq.jd.com/wqfans/checkjdfans",
                data: {
                    appid: "wxbb46510af80cea38"
                },
                ump: {
                    bizId: "903",
                    opId: "43",
                    errBizId: "903",
                    errOpId: "44",
                    reportHook: function(e) {
                        return [ 0, 13 ].indexOf(e.retcode) >= 0 ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.msg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(n) {
                var o = n.body;
                n.header;
                0 == o.retcode ? e(o) : 13 == o.retcode ? e(b()) : t();
            }).catch(function(e) {
                var n = e.code, o = e.message;
                t({
                    code: n,
                    message: o
                });
            });
        }).catch(function(e) {
            _.error(e), t(e);
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getIsKaipule = exports.getIsFollowGwqAcc = exports.getIsQQFollowAcc = exports.getIsFollowAcc = exports.getAdConfig = exports.getAtmosImgConfig = exports.getBindGrayConfig = exports.reportMsg = exports.getPhoneNum = exports.QueryIsNewUser = exports.getCurPinInfo = exports.unbind = exports.authBrigde = exports.judgePayPsw = exports.judgeAuth = exports.unbindtelandbind = exports.changeAccount = exports.judgeIsCalled = exports.GetRsaKeyModulus = exports.getImgDetail = exports.complete = exports.getPinStatus = exports.getMsgCode = exports.getImgCode = exports.login = exports.bind = exports.register = exports.judge = void 0;

var y = t(require("../../../common/login/loginv1.js")), w = t(require("../../../common/base64/base64.js")), j = require("../../../common/request/request"), q = t(require("../../../common/userinfo_wqvue")), x = e(require("../../../libs/promise.min.js")), C = e(require("../../../common/wxcontext")), P = t(require("../common/js/utils")), _ = new (require("../../../common/logger.js").Logger)("accountData"), X = P.getEnv(), v = {
    2: "您的操作过于频繁，请稍后再试",
    21: "验证码不正确或已过期",
    32: "您的京东账号绑定了其他微信账号，请解除关联后再与当前账号关联",
    100: "关联失败，请稍后再试",
    20: "验证码错误，请重新输入",
    40: "您输入的账号或密码错误，请重新输入",
    41: "该京东账号已在其他微信账号上登录，请退出后重新登录。",
    42: "您设置的手机已绑定其他京东帐号,请使用已有京东账号直接登录，或更换设置手机号码",
    43: "您的微信账号已关联其他京东账号，请解除关联后，再绑定当前京东账号",
    44: "企业账户、商家账户及特殊类型账户暂不支持绑定微信或手Q",
    50: "密码不符合规则，请重新设置，建议为6-20位字母和数字组合",
    51: "此手机无效，请重新输入",
    52: "您设置的密码过于简单，建议为6-20位字母和数字组合",
    53: "您的京东账号存在风险行为，请联系客服处理（400-606-5500转7)",
    70: "您的操作过于频繁，请五分钟后再试",
    90: "关联失败，请稍后再试",
    71: "30天内只可做一次解绑操作",
    2001: "您的账号因安全原因被暂时封锁，请将账号和联系方式发至shensu@jd.com，等候处理。"
}, k = {
    newNoPin: 1,
    defaultNoAssets: 2,
    defaultHasAssets: 3,
    morePinWithDefault: 4,
    morePinWithFormal: 5,
    formalPin: 6
}, z = "weixin" == C.default.JD.device.scene ? "wx" : "sq", O = "weixin" == C.default.JD.device.scene ? "wxae3e8056daea8727" : "100273020", T = "", M = "", L = "", B = "";

if (C.default.isXCX) {
    var N = "function" == typeof getCurrentPages ? getCurrentPages() : [];
    T = N.length ? N[N.length - 1].route || N[N.length - 1].__route__ : "pages/index/index", 
    M = "wxapp", L = getApp().appId, B = "x";
} else T = location.href, M = z, L = O, B = z;

exports.judge = o, exports.register = r, exports.bind = c, exports.login = y, exports.getImgCode = function() {
    _.info("getImgCode:begin");
    var e = {
        _t: Math.round(2147483647 * Math.random())
    };
    return y.getLoginPromise().then(function(t) {
        return new x.default(function(t, n) {
            j.request.get({
                url: "https://wq.jd.com/user/smsmsg/GetPicCodeUrl",
                data: e,
                ump: {
                    bizId: "601",
                    opId: "7",
                    errBizId: "601",
                    errOpId: "22",
                    reportHook: function(e) {
                        return 0 == e.retcode || 13 == e.retcode ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.msg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(e) {
                var o = e.body;
                e.header, _.info("getImgCode:success" + JSON.stringify(o)), 0 == o.retcode ? t(o) : n({});
            }).catch(function(e) {
                e.code, e.message, _.info("getImgCode:error"), n({});
            });
        });
    });
}, exports.getMsgCode = s, exports.getPinStatus = u, exports.complete = i, exports.getImgDetail = function(e) {
    return e = "https:" + e, new x.default(function(t, n) {
        wx.downloadFile({
            url: e,
            success: function(e) {
                t(e), C.default.JD.report.umpBiz({
                    bizid: "601",
                    operation: 10,
                    result: 0,
                    message: "ret:suc"
                });
            },
            fail: function(e) {
                n({}), C.default.JD.report.umpBiz({
                    bizid: "601",
                    operation: 10,
                    result: 999,
                    message: "ret:fail" + e.errMsg || ""
                });
            }
        });
    });
}, exports.GetRsaKeyModulus = function() {
    return new x.default(function(e, t) {
        j.request.get({
            url: "https://wq.jd.com/pinbind/GetRsaKeyModulus",
            ump: {
                bizId: "601",
                opId: "1",
                errBizId: "601",
                errOpId: "14",
                reportHook: function(e) {
                    return 0 == e.retcode ? {
                        code: 0
                    } : {
                        code: e.retcode,
                        message: e.msg
                    };
                }
            },
            dataType: C.default.isXCX ? "" : "jsonp"
        }).then(function(n) {
            var o = n.body;
            n.header, 0 == o.retcode ? e(o) : t();
        }).catch(function(e) {
            e.code, e.message, t();
        });
    });
}, exports.judgeIsCalled = function(e, t) {
    return new x.default(function(n, o) {
        j.request.get({
            url: "https://wq.jd.com/pinbind/pinRegCheckType",
            dataType: C.default.isXCX ? "" : "jsonp",
            data: {
                mobile: e,
                index: t
            },
            ump: {
                bizId: "601",
                opId: "2",
                errBizId: "601",
                errOpId: "15",
                reportHook: function(e) {
                    return 0 == e.retcode ? {
                        code: 0
                    } : {
                        code: e.retcode,
                        message: e.msg
                    };
                }
            }
        }).then(function(e) {
            var t = e.body;
            e.header, 0 == t.retcode ? n(t) : o();
        }).catch(function(e) {
            e.code, e.message, o();
        });
    });
}, exports.changeAccount = n, exports.unbindtelandbind = d, exports.judgeAuth = f, 
exports.judgePayPsw = a, exports.authBrigde = p, exports.unbind = g, exports.getCurPinInfo = m, 
exports.QueryIsNewUser = function() {
    var e = {};
    return 0 != X && 3 != X || (e.sceneid = 0 == X ? 3 : 2), new x.default(function(t, n) {
        y.getLoginPromise().then(function(o) {
            j.request.get({
                url: "https://wq.jd.com/userattribute/QueryIsNewUser",
                data: e,
                ump: {
                    bizId: "903",
                    opId: "37",
                    errBizId: "903",
                    errOpId: "38",
                    reportHook: function(e) {
                        return [ 0 ].indexOf(e.retcode) >= 0 ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.msg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp",
                jsonpCallback: "QueryIsNewUser"
            }).then(function(e) {
                var o = e.body;
                e.header, 0 == o.retcode ? t(o) : n({
                    code: o.retcode
                });
            }).catch(function(e) {
                var t = e.code, o = e.message;
                n({
                    code: t,
                    message: o
                });
            });
        }).catch(function(e) {
            _.error(e), n(e);
        });
    });
}, exports.getPhoneNum = l, exports.reportMsg = function(e) {
    _.info("reportMsg:begin");
    var t = {
        _t: Math.round(2147483647 * Math.random())
    };
    Object.assign(t, e), y.getLoginPromise().then(function(e) {
        j.request.get({
            url: "https://wq.jd.com/ubanalysis",
            data: t,
            dataType: C.default.isXCX ? "" : "jsonp"
        }).then(function(e) {
            var t = e.body;
            e.header, _.info("getPhoneNum:success" + JSON.stringify(t));
        }).catch(function(e) {
            e.code, e.message, _.info("getPhoneNum:error");
        });
    }).catch(function(e) {
        _.error(e), _.info("getPhoneNum:catch");
    }), _.info("unbind:end");
}, exports.getBindGrayConfig = function() {
    return new x.default(function(e, t) {
        j.request.get({
            url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev34840.jsonp",
            ump: {
                bizId: "903",
                opId: "19",
                errBizId: "903",
                errOpId: "20",
                reportHook: function(e) {
                    return e && e.data && e.data[0] ? {
                        code: 0
                    } : {
                        code: 1,
                        message: "ppms config 配置不全"
                    };
                }
            },
            dataType: C.default.isXCX ? "" : "jsonp",
            jsonpCallback: "showPageData34840"
        }).then(function(t) {
            var n = t.body, o = (t.header, n.data || []);
            e(o);
        }).catch(function(e) {
            e.code, e.message, t();
        });
    });
}, exports.getAtmosImgConfig = function() {
    return new x.default(function(e, t) {
        j.request.get({
            url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev34982.jsonp",
            ump: {
                bizId: "903",
                opId: "17",
                errBizId: "903",
                errOpId: "18",
                reportHook: function(e) {
                    return e && e.data && e.data[0] ? {
                        code: 0
                    } : {
                        code: 1,
                        message: "ppms config 配置不全"
                    };
                }
            },
            dataType: C.default.isXCX ? "" : "jsonp",
            jsonpCallback: "showPageData34982"
        }).then(function(t) {
            var n = t.body, o = (t.header, n.data || []);
            e(o);
        }).catch(function(e) {
            var n = e.code, o = e.message;
            t({
                code: n,
                message: o
            });
        });
    });
}, exports.getAdConfig = function() {
    return new x.default(function(e, t) {
        j.request.get({
            url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev35020.jsonp",
            ump: {
                bizId: "903",
                opId: "15",
                errBizId: "903",
                errOpId: "16",
                reportHook: function(e) {
                    return e && e.data && e.data[0] ? {
                        code: 0
                    } : {
                        code: 1,
                        message: "ppms config 配置不全"
                    };
                }
            },
            dataType: C.default.isXCX ? "" : "jsonp",
            jsonpCallback: "showPageData35020"
        }).then(function(t) {
            var n = t.body, o = (t.header, n.data || []);
            e(o);
        }).catch(function(e) {
            var n = e.code, o = e.message;
            t({
                code: n,
                message: o
            });
        });
    });
}, exports.getIsFollowAcc = function() {
    return new x.default(function(e, t) {
        y.getLoginPromise().then(function(n) {
            j.request.get({
                url: "https://wq.jd.com/wqfans/CheckJDAccountFans",
                data: {
                    pin: C.default.JD.cookie.get("jdpin"),
                    openid: C.default.JD.cookie.get("open_id")
                },
                ump: {
                    bizId: "903",
                    opId: "41",
                    errBizId: "903",
                    errOpId: "42",
                    reportHook: function(e) {
                        return [ 0 ].indexOf(e.retcode) >= 0 ? {
                            code: 0
                        } : {
                            code: e.retcode,
                            message: e.msg
                        };
                    }
                },
                dataType: C.default.isXCX ? "" : "jsonp"
            }).then(function(n) {
                var o = n.body;
                n.header, 0 == o.retcode ? e(o) : t();
            }).catch(function(e) {
                var n = e.code, o = e.message;
                t({
                    code: n,
                    message: o
                });
            });
        }).catch(function(e) {
            _.error(e), t(e);
        });
    });
}, exports.getIsQQFollowAcc = I, exports.getIsFollowGwqAcc = b, exports.getIsKaipule = function() {
    return new x.default(function(e, t) {
        j.request.get({
            url: "https://wq.jd.com/userinfom/CheckIsKeplerSource",
            data: {
                url: location.href,
                sid: C.default.JD.cookie.get("sid"),
                USER_FLAG_CHECK: C.default.JD.cookie.get("USER_FLAG_CHECK")
            },
            ump: {
                bizId: "903",
                opId: "21",
                errBizId: "903",
                errOpId: "22",
                reportHook: function(e) {
                    return 0 == e.errcode ? {
                        code: 0
                    } : {
                        code: e.errcode,
                        message: e.msg
                    };
                }
            },
            dataType: C.default.isXCX ? "" : "jsonp"
        }).then(function(n) {
            var o = n.body;
            n.header, 0 == o.errcode ? e(o) : t();
        }).catch(function(e) {
            var n = e.code, o = e.message;
            t({
                code: n,
                message: o
            });
        });
    });
};