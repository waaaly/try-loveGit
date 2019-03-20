function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, r, n) {
    this.success = function(i) {
        var o = {};
        if (e == h ? ((_ = c(i)) || (_ = s(t, r)), v++) : e == d && (S = a(i.afterSale), 
        y = a(i.packList), v++), 2 == v && (o.afterSale = S, o.packInfo = "string" == typeof y ? y : "", 
        o.specific = _, v = 0, m)) return m = !1, n(null, o);
    }, this.fail = function(e) {
        console.log("specCallback Error:", e), m && (m = !1, o({
            err: e,
            cb: n
        }));
    };
}

function r(e, t) {
    e.split(/<br[^>]+>/gi).forEach(function(e) {
        if (e.indexOf("src") > 0) {
            var r = /<[img|IMG].*?src=["|'](.*?)["|']/gi, i = /src=['"]?([^'"]*)['"]?/i, o = e.match(r);
            if (o) for (var c = 0; c < o.length; c++) {
                var s = o[c].match(i);
                if (s[1]) {
                    var u = {};
                    u.type = "image", u.value = s[1], t.push(u);
                }
            }
        }
        var l = a(e).replace("　　", "");
        if (l) {
            var g = {};
            g.type = "string", g.value = n(l), t.push(g);
        }
    });
}

function a(e) {
    return "string" == typeof e ? e.replace(/<[^>]+>/g, " ") : "";
}

function n(e) {
    if (0 == e.length) return "";
    var t = e.replace(/&amp;/g, "&");
    return t = t.replace(/&lt;/g, "<"), t = t.replace(/&gt;/g, ">"), t = t.replace(/&nbsp;/g, " "), 
    t = t.replace(/&#39;/g, "'"), t = t.replace(/&quot;/g, '"'), t = t.replace(/&hellip;/g, "..."), 
    t = t.replace(/&ldquo;/g, '"'), t = t.replace(/&rdquo;/g, '"'), t = t.replace(/&cap;/g, "∩");
}

function i(e) {
    var t = /^(http:|https:)?\/\//i;
    return e && t.test(e) ? e : "";
}

function o(e, t) {
    var r = "";
    switch (t = t || '"Network Error"', e) {
      case p.default.RET_HTTP_RESPONSE_ERROR:
        r = p.default.Text_RET_HTTP_RESPONSE_ERROR;
        break;

      case p.default.RET_WS_CONNECT_ERROR:
        r = p.default.Text_RET_WS_CONNECT_ERROR;
        break;

      case p.default.RET_WS_REQUEST_TIMEOUT:
        r = p.default.Text_RET_WS_REQUEST_TIMEOUT;
        break;

      default:
        r = t;
    }
    return r;
}

function c(e) {
    var t = [];
    try {
        var r = /<[tr].*?>(.*?)tr>/gi, a = /([^>]*?)<\/th>/gi, n = /([^>]*?)<\/td>/gi, i = e.match(r), o = void 0;
        if (i) {
            for (var c = 0; c < i.length; c++) {
                var s = i[c].match(a);
                if (s && s[0]) o && t.push(o), (o = {}).content = [], o.title = s[0].replace("</th>", ""); else {
                    var u = i[c].match(n);
                    if (u) {
                        for (var l = [], g = 0; g < u.length; g++) l.push(u[g].replace("</td>", ""));
                        o.content.push(l);
                    }
                }
            }
            o && (t.push(o), o = null);
        }
    } catch (e) {
        console.log("createSpecArray Fail" + e);
    }
    return t;
}

function s(e, t) {
    var r = [], a = {};
    if (a = e || (t || {})) {
        var n = {};
        n.content = [], n.title = "";
        for (var i in a) {
            var o = [], c = "";
            c = (o = a[i] || []) instanceof Array ? o[0] : o;
            var s = [];
            s.push(i), s.push(c), n.content.push(s);
        }
        r.push(n);
    }
    return r;
}

function u() {
    _ = [], y = {}, S = "", v = 0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getSpec = exports.getInfo = exports.getGlobalNotice = void 0;

var l = e(require("../../../libs/promise.min.js")), g = require("../../../common/request/request.js"), p = e(require("../../../common/http_constant.js")), f = {
    DETAIL_IMAGES: "https://wq.jd.com/commodity/introduction/get",
    GLOBAL_NOTICE: "https://hk.jd.com/notice/getInfo.do",
    SPEC_INFO: "https://yx.3.cn/service/info.action"
}, h = "1", d = "2", m = !0, v = 0, _ = void 0, y = void 0, S = void 0;

exports.getGlobalNotice = function(e, t) {
    if (!e || !t) return l.default.resolve([]);
    var r = {
        url: f.GLOBAL_NOTICE,
        data: {
            callback: "globalBuyNoticeCB",
            platform: "3",
            category: e,
            type: t
        }
    }, a = /<img\b.*?(?:>|\/>)/gi, n = /<img\b.*?src=["|'](.*?)["|']/;
    return g.request.get(r).then(function(e) {
        var t = e.body;
        if (t.notices && t.notices.length) {
            var r = [];
            return t.notices.forEach(function(e) {
                var t = e.htmlNotice.match(a), i = [];
                t && t.forEach(function(e) {
                    var t = n.exec(e);
                    t[1] && i.push(t[1]);
                }), r.push(i);
            }), r;
        }
        return [];
    }).catch(function(e) {
        var t = e.code, r = e.message;
        return l.default.reject({
            code: t,
            message: r
        });
    });
}, exports.getInfo = function(e, t, a, n) {
    var c = e, s = a || "d" + c, u = {
        url: f.DETAIL_IMAGES,
        data: {
            skuId: c,
            k: s,
            type: n ? "plus" : "normal"
        },
        encoding: "GBK"
    };
    return new l.default(function(e, a) {
        g.request.get(u).then(function(n) {
            var o = n.body;
            if ("2" === t || "3" === t) {
                var c = t, s = {
                    productFeatures: "产品特色",
                    editerDesc: "编辑推荐",
                    contentDesc: "内容简介",
                    authorDesc: "作者简介",
                    image: "内页插图",
                    comments: "精彩书评",
                    catalogue: "目录",
                    bookAbstract: "精彩书摘",
                    introduction: "前言/序言"
                }, u = {
                    productFeatures: "产品特色",
                    editerDesc: "编辑推荐",
                    contentDesc: "专辑介绍",
                    biography: "艺人介绍",
                    catalogue: "曲目",
                    comments: "精彩赏评",
                    image: "精彩剧照",
                    mvdColor: "色差"
                };
                if ("1" == o.success) {
                    var l = [], g = 2 == c ? s : u;
                    for (var p in g) if (o[p]) {
                        var f = {}, h = [];
                        if ("image" == p) {
                            f.title = g[p];
                            for (var d = o[p].split(";") || [], m = 0, v = d.length; m < v; m++) {
                                var _ = {};
                                _.type = "image", _.value = d[m], h.push(_);
                            }
                            f.content = h, l.push(f);
                        } else if (o[p].indexOf("<p>") >= 0) {
                            var y = /<p>(.*?)<\/p>/gi, S = o[p].match(y);
                            if (S) {
                                for (var b = 0; b < S.length; b++) r(S[b], h);
                                h.length > 0 && (f.title = g[p], f.content = h, l.push(f));
                            }
                        } else r(o[p], h), f.title = g[p], f.content = h, l.push(f);
                    }
                    e(l);
                } else a("该商品暂无商品详情");
            } else {
                o && o.content ? o = (o = o.content).replace(/\\/gi, "").replace(/\n/gi, "").replace(/\r/gi, "") : a("没有图片");
                var E = /<div[^>]+skudesign="100011"[^>]*>/gi;
                if (o.match(E)) {
                    var R = /<div[^>]+id="zbViewWeChatMiniImages"[^>]+value="([^>]*)">/i, N = o.match(R);
                    if (N && N.length > 1 && N[1]) {
                        var T = N[1].split(",").map(function(e) {
                            return "https://img30.360buyimg.com" + e;
                        });
                        return void e(T);
                    }
                }
                var I = [], P = /background-image:url\((.*?)\)/gi, D = o.match(P);
                if (D) for (var O = 0; O < D.length; O++) if (D[O].indexOf("360buyimg")) {
                    var k = D[O].replace("background-image:url(", "").replace(")", "");
                    i(k) && I.push(k);
                }
                var C = /[(&lt;)<][img|IMG].*?src=["|'](.*?)["|']/gi, A = /src=['"]?([^'"]*)['"]?/i, M = o.match(C);
                if (M) for (var x = 0; x < M.length; x++) {
                    var B = M[x].match(A);
                    i(B[1]) && I.push(B[1]);
                }
                I.length > 0 ? e(I) : a("没有图片");
            }
        }).catch(function(e) {
            var t = o(e.code, e.message);
            a(t);
        });
    });
}, exports.getSpec = function(e, r, a, n, i) {
    if (u(), 2 == r || 3 == r) {
        var o = {}, c = [], s = {
            content: [],
            title: 2 == r ? "图书参数" : "音像参数"
        }, l = {
            ISBN: "ISBN",
            ISSN: "ISSN",
            BookName: "营销书名",
            ForeignBookName: "外文书名",
            Language: "图书语言",
            Author: "作者",
            Editer: "编者",
            Proofreader: "校对",
            Remarker: "注释",
            Transfer: "译者",
            Drawer: "绘者",
            Publishers: "出版社",
            PublishNo: "出版社号",
            Series: "丛书名",
            Brand: "品牌",
            Package: "包装(装帧)",
            Pages: "页数",
            BatchNo: "版次",
            PublishTime: "出版时间",
            SizeAndHeight: "尺寸及重量",
            ChinaCatalog: "中国法分类号",
            Sheet: "印张",
            Papers: "用纸",
            Attachment: "附件",
            AttachmentNum: "附件数量",
            PackNum: "套装数量",
            Letters: "字数",
            KeyWords: "主题词",
            PickState: "捡货标记",
            Compile: "编纂",
            Photography: "摄影",
            Dictation: "口述",
            Read: "朗读",
            Finishing: "整理",
            Write: "书写",
            saleDate: "上架时间",
            Format: "开本"
        }, p = {
            Aka: "又名",
            Brand: "品牌",
            Foreignname: "外文名",
            ISBN: "ISBN",
            Mvd_Wxjz: "文像进字",
            Mvd_Gqyz: "国权音字",
            Mvd_wyjz: "文音进字",
            ISRC: "ISRC",
            Mvd_Dcz: "电出字",
            Mvd_Xcyg: "新出音管",
            Press: "出版社",
            Publishing_Company: "发行公司",
            Production_Company: "出品公司",
            Copyright: "版权提供",
            Actor: "演员",
            Director: "导演",
            Dub: "配音",
            Voiceover: "解说者",
            Screenwriter: "编剧",
            Producer: "监制",
            Singer: "演唱者",
            Performer: "演奏者",
            Authorsstr: "作词",
            Compose: "作曲",
            Command: "指挥",
            Orchestra: "知名乐团",
            Media: "介质",
            Soundtrack: "碟数",
            Number_Of_Discs: "碟片数",
            Episode: "集数",
            Record_Number: "唱片数量",
            Publication_Date: "出版日期",
            Release_Date: "投放市场的日期",
            ReleaseDate: "上映日期",
            Accessories: "附件",
            Included_Additional_Item: "附件数量",
            Set_The_Number_Of: "套装数量",
            Region: "区码",
            Length: "片长",
            Screen_Ratio: "屏幕比例",
            Audio_Encoding_Chinese: "音频格式",
            Quality_Description: "品质说明",
            Dregion: "地区",
            Language: "图书语言",
            Language_Dubbed: "配音语言",
            Language_Subtitled: "字幕语言",
            Version_Language: "版本语言",
            Language_Pronunciation: "发音语言",
            Menu_Language: "菜单语言",
            Platform: "操作系统",
            Minimum_System_Requirement_Description: "最低配置要求",
            Recommended_System_Description: "推荐配置要求",
            Online_Play_Description: "在线游戏",
            Awards: "获奖情况",
            Type_Keywords: "商品类型关键词",
            Keywords: "主题词",
            Readers: "读者对象",
            Number_Of_Players: "游戏人员数量",
            Mfg_Minimum: "最小年龄",
            Mfg_Maximum: "最大年龄",
            Compile: "编纂",
            Photography: "摄影",
            Dictation: "口述",
            Read: "朗读",
            Finishing: "整理",
            Write: "书写",
            Version: "产品评级（可链入搜索结果页）",
            Color: "厂牌（可链入搜索结果页）",
            Type: "录音模式",
            Format: "画面色彩",
            saleDate: "上架时间:"
        }, v = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e);
        }, _ = 2 == r ? l : p;
        for (var y in _) {
            var S = [];
            if (a && a[y]) {
                if (v(a[y])) {
                    for (var b, E = [], R = 0, N = a[y].length; R < N; R++) (b = a[y][R].replace(/(^\s*)|(\s*$)/g, "")) && E.push(b);
                    if (E.length < 1) continue;
                    S.push(_[y]), S.push(E.join(","));
                } else S.push(_[y]), S.push(a[y]);
                s.content.push(S);
            }
        }
        return c.push(s), o.afterSale = "", o.packInfo = "", o.specific = c, i(null, o);
    }
    m = !0;
    var T = {
        k: "g" + (e = ("" + e).trim()),
        u_source: "wxapp",
        t: Math.random()
    }, I = new t(h, n, a.expandAttrDesc, i);
    wx.$request({
        url: f.SPEC_INFO,
        method: "GET",
        dataType: "html",
        encoding: "GBK",
        data: T
    }).then(function(e) {
        var t = e.body;
        I.success(t);
    }, function(e) {
        var t = e.code;
        e.message, I.fail(t);
    });
    var P = {
        k1: e,
        t: Math.random()
    }, D = new t(d, n, a.expandAttrDesc, i), O = {
        url: f.SPEC_INFO,
        data: P,
        encoding: "GBK"
    };
    g.request.get(O).then(function(e) {
        D.success(e.body);
    }).catch(function(e) {
        var t = e.code;
        e.message, D.fail(t);
    });
};