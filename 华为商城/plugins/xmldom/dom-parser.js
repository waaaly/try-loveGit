function t(t) {
    this.options = t || {
        locator: {}
    };
}

function e(t, e, r) {
    function i(e) {
        var n = t[e];
        !n && a && (n = 2 == t.length ? function(n) {
            t(e, n);
        } : t), c[e] = n && function(t) {
            n("[xmldom " + e + "]\t" + t + o(r));
        } || function() {};
    }
    if (!t) {
        if (e instanceof n) return e;
        t = e;
    }
    var c = {}, a = t instanceof Function;
    return r = r || {}, i("warning"), i("error"), i("fatalError"), c;
}

function n() {
    this.cdata = !1;
}

function r(t, e) {
    e.lineNumber = t.lineNumber, e.columnNumber = t.columnNumber;
}

function o(t) {
    if (t) return "\n@" + (t.systemId || "") + "#[line:" + t.lineNumber + ",col:" + t.columnNumber + "]";
}

function i(t, e, n) {
    return "string" == typeof t ? t.substr(e, n) : t.length >= e + n || e ? new java.lang.String(t, e, n) + "" : t;
}

function c(t, e) {
    t.currentElement ? t.currentElement.appendChild(e) : t.doc.appendChild(e);
}

t.prototype.parseFromString = function(t, r) {
    var o = this.options, i = new l(), c = o.domBuilder || new n(), s = o.errorHandler, u = o.locator, m = o.xmlns || {}, h = /\/x?html?$/.test(r), d = h ? a.entityMap : {
        lt: "<",
        gt: ">",
        amp: "&",
        quot: '"',
        apos: "'"
    };
    return u && c.setDocumentLocator(u), i.errorHandler = e(s, c, u), i.domBuilder = o.domBuilder || c, 
    h && (m[""] = "http://www.w3.org/1999/xhtml"), m.xml = m.xml || "http://www.w3.org/XML/1998/namespace", 
    t ? i.parse(t, m, d) : i.errorHandler.error("invalid doc source"), c.doc;
}, n.prototype = {
    startDocument: function() {
        this.doc = new s().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
    },
    startElement: function(t, e, n, o) {
        var i = this.doc, a = i.createElementNS(t, n || e), l = o.length;
        c(this, a), this.currentElement = a, this.locator && r(this.locator, a);
        for (var s = 0; s < l; s++) {
            var t = o.getURI(s), u = o.getValue(s), n = o.getQName(s), m = i.createAttributeNS(t, n);
            this.locator && r(o.getLocator(s), m), m.value = m.nodeValue = u, a.setAttributeNode(m);
        }
    },
    endElement: function(t, e, n) {
        var r = this.currentElement;
        r.tagName;
        this.currentElement = r.parentNode;
    },
    startPrefixMapping: function(t, e) {},
    endPrefixMapping: function(t) {},
    processingInstruction: function(t, e) {
        var n = this.doc.createProcessingInstruction(t, e);
        this.locator && r(this.locator, n), c(this, n);
    },
    ignorableWhitespace: function(t, e, n) {},
    characters: function(t, e, n) {
        if (t = i.apply(this, arguments)) {
            if (this.cdata) o = this.doc.createCDATASection(t); else var o = this.doc.createTextNode(t);
            this.currentElement ? this.currentElement.appendChild(o) : /^\s*$/.test(t) && this.doc.appendChild(o), 
            this.locator && r(this.locator, o);
        }
    },
    skippedEntity: function(t) {},
    endDocument: function() {
        this.doc.normalize();
    },
    setDocumentLocator: function(t) {
        (this.locator = t) && (t.lineNumber = 0);
    },
    comment: function(t, e, n) {
        t = i.apply(this, arguments);
        var o = this.doc.createComment(t);
        this.locator && r(this.locator, o), c(this, o);
    },
    startCDATA: function() {
        this.cdata = !0;
    },
    endCDATA: function() {
        this.cdata = !1;
    },
    startDTD: function(t, e, n) {
        var o = this.doc.implementation;
        if (o && o.createDocumentType) {
            var i = o.createDocumentType(t, e, n);
            this.locator && r(this.locator, i), c(this, i);
        }
    },
    warning: function(t) {},
    error: function(t) {},
    fatalError: function(t) {
        throw t;
    }
}, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(t) {
    n.prototype[t] = function() {
        return null;
    };
});

var a = require("./entities"), l = require("./sax").XMLReader, s = exports.DOMImplementation = require("./dom").DOMImplementation;

exports.XMLSerializer = require("./dom").XMLSerializer, exports.DOMParser = t;