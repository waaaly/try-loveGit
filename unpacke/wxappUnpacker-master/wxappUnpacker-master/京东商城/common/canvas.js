function e(e, o) {
    var i = o.content, r = void 0 === i ? "" : i, a = o.left, d = void 0 === a ? 0 : a, n = o.top, l = void 0 === n ? 0 : n, v = o.color, f = void 0 === v ? "black" : v, c = o.fontSize, s = void 0 === c ? 20 : c, u = o.textDecoration, h = void 0 === u ? "" : u;
    "underline" === h ? t(e, {
        top: l + 2,
        left: d - 1,
        width: e.measureText(r).width + 3,
        height: 1,
        background: f
    }) : "line-through" === h && t(e, {
        top: l - .4 * s,
        left: d - 1,
        width: e.measureText(r).width + 3,
        height: 1,
        background: f
    });
}

function t(e, t) {
    var o = t.top, i = void 0 === o ? 0 : o, r = t.left, a = void 0 === r ? 0 : r, d = t.width, n = void 0 === d ? 0 : d, l = t.height, v = void 0 === l ? 0 : l, f = t.background, c = void 0 === f ? "#ffffff" : f;
    e.save(), e.setFillStyle(c), e.fillRect(a, i, n, v), e.fill(), e.restore();
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawText = function(t, o) {
    var i = o.width, r = void 0 === i ? 750 : i, a = o.content, d = void 0 === a ? "" : a, n = o.top, l = void 0 === n ? 0 : n, v = o.left, f = void 0 === v ? 0 : v, c = o.color, s = void 0 === c ? "black" : c, u = o.fontSize, h = void 0 === u ? 20 : u, T = o.fontWeight, x = void 0 === T ? "normal" : T, g = o.lineHeight, p = void 0 === g ? 30 : g, w = o.textIndent, m = void 0 === w ? 0 : w, b = o.textAlign, S = void 0 === b ? "left" : b, k = o.textDecoration, q = void 0 === k ? "none" : k, C = o.baseline, z = void 0 === C ? "normal" : C, D = o.maxLineNum, I = void 0 === D ? 2 : D, P = o.noBreakWord, W = void 0 !== P && P, y = 0;
    if (t.save(), t.beginPath(), t.font = x + " " + h + "px/" + p + 'px "Helvetica Neue", Helvetica, Arial, sans-serif', 
    t.setTextBaseline(z), t.setFillStyle(s), t.setTextAlign(S), W) t.fillText(d, f + m, l), 
    y = t.measureText(d).width, e(t, {
        content: d,
        left: f,
        top: l,
        color: s,
        fontSize: h,
        textDecoration: q
    }); else {
        for (var R = "", A = l, H = 1, L = 0; L < d.length; L++) {
            R += d[L];
            var M = t.measureText(R).width;
            if (1 === H && (M += m), M > r) {
                var B = 1 === H ? m + f : f;
                if (H === I && L !== d.length) {
                    R = R.substring(0, R.length - 2) + "...", t.fillText(R, B, A), e(t, {
                        content: R,
                        left: B,
                        top: A,
                        color: s,
                        fontSize: h,
                        textDecoration: q
                    }), R = "";
                    break;
                }
                var F = R.substr(-1, 1);
                R = R.substring(0, R.length - 1), t.fillText(R, B, A), e(t, {
                    content: R,
                    left: B,
                    top: A,
                    color: s,
                    fontSize: h,
                    textDecoration: q
                }), R = F, A += p, H++;
            }
        }
        var N = 1 === H ? m + f : f;
        t.fillText(R, N, A), e(t, {
            content: R,
            left: N,
            top: A,
            color: s,
            fontSize: h,
            textDecoration: q
        });
    }
    return t.restore(), y;
}, exports.drawTextLine = e, exports.drawRect = t, exports.drawRoundRect = function(e, t) {
    var o = t.top, i = void 0 === o ? 0 : o, r = t.left, a = void 0 === r ? 0 : r, d = t.width, n = void 0 === d ? 0 : d, l = t.height, v = void 0 === l ? 0 : l, f = t.color, c = void 0 === f ? "#333333" : f, s = t.lineWidth, u = void 0 === s ? 1 : s, h = t.radius, T = void 0 === h ? 0 : h;
    e.save(), e.beginPath(), e.moveTo(a + T, i), e.lineTo(a + n - T, i), e.quadraticCurveTo(a + n, i, a + n, i + T), 
    e.lineTo(a + n, i + v - T), e.quadraticCurveTo(a + n, i + v, a + n - T, i + v), 
    e.lineTo(a + T, i + v), e.quadraticCurveTo(a, i + v, a, i + v - T), e.lineTo(a, i + T), 
    e.quadraticCurveTo(a, i, a + T, i), e.closePath(), e.setLineWidth(u), e.setStrokeStyle(c), 
    e.stroke(), e.restore();
}, exports.drawImage = function(e, t) {
    var o = t.url, i = t.top, r = void 0 === i ? 0 : i, a = t.left, d = void 0 === a ? 0 : a, n = t.width, l = void 0 === n ? 200 : n, v = t.height, f = void 0 === v ? 200 : v, c = t.radius, s = void 0 === c ? 0 : c, u = t.fit, h = void 0 !== u && u, T = t.imgWidth, x = void 0 === T ? 750 : T;
    if (e.save(), s) if (e.beginPath(), e.moveTo(d, r + s), e.lineTo(d, r + f - s), 
    e.quadraticCurveTo(d, r + f, d + s, r + f), e.lineTo(d + l - s, r + f), e.quadraticCurveTo(d + l, r + f, d + l, r + f - s), 
    e.lineTo(d + l, r + s), e.quadraticCurveTo(d + l, r, d + l - s, r), e.lineTo(d + s, r), 
    e.quadraticCurveTo(d, r, d, r + s), e.closePath(), e.clip(), h) {
        var g = Math.floor(246 * x / 420);
        e.drawImage(o, d, r, x, g, d, r, l, f);
    } else e.drawImage(o, d, r, l, f); else if (h) {
        var p = Math.floor(246 * x / 420);
        e.drawImage(o, d, r, x, p, d, r, l, f);
    } else e.drawImage(o, d, r, l, f);
    e.restore();
};