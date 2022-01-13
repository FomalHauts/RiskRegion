(function(t) {
    function e(e) {
        for (var i, o, r = e[0], c = e[1], l = e[2], u = 0, h = []; u < r.length; u++)
            o = r[u],
            Object.prototype.hasOwnProperty.call(s, o) && s[o] && h.push(s[o][0]),
            s[o] = 0;
        for (i in c)
            Object.prototype.hasOwnProperty.call(c, i) && (t[i] = c[i]);
        d && d(e);
        while (h.length)
            h.shift()();
        return n.push.apply(n, l || []),
        a()
    }
    function a() {
        for (var t, e = 0; e < n.length; e++) {
            for (var a = n[e], i = !0, r = 1; r < a.length; r++) {
                var c = a[r];
                0 !== s[c] && (i = !1)
            }
            i && (n.splice(e--, 1),
            t = o(o.s = a[0]))
        }
        return t
    }
    var i = {}
      , s = {
        risk: 0
    }
      , n = [];
    function o(e) {
        if (i[e])
            return i[e].exports;
        var a = i[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(a.exports, a, a.exports, o),
        a.l = !0,
        a.exports
    }
    o.m = t,
    o.c = i,
    o.d = function(t, e, a) {
        o.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: a
        })
    }
    ,
    o.r = function(t) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    o.t = function(t, e) {
        if (1 & e && (t = o(t)),
        8 & e)
            return t;
        if (4 & e && "object" === typeof t && t && t.__esModule)
            return t;
        var a = Object.create(null);
        if (o.r(a),
        Object.defineProperty(a, "default", {
            enumerable: !0,
            value: t
        }),
        2 & e && "string" != typeof t)
            for (var i in t)
                o.d(a, i, function(e) {
                    return t[e]
                }
                .bind(null, i));
        return a
    }
    ,
    o.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t["default"]
        }
        : function() {
            return t
        }
        ;
        return o.d(e, "a", e),
        e
    }
    ,
    o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    ,
    o.p = "";
    var r = window["webpackJsonp"] = window["webpackJsonp"] || []
      , c = r.push.bind(r);
    r.push = e,
    r = r.slice();
    for (var l = 0; l < r.length; l++)
        e(r[l]);
    var d = c;
    n.push([1, "chunk-vendors"]),
    a()
}
)({
    "063a": function(t, e, a) {
        function i() {
            $(".tips-box .title span").text("提示信息"),
            $(".tips-content").text("查询失败，请稍后重试！"),
            $(".tips-bg").show()
        }
        function s(t) {
            var e = ((new Date).getTime() / 1e3).toFixed()
              , a = "23y0ufFl5YxIyGrI8hWRUZmKkvtSjLQA"
              , i = "123456789abcdefg"
              , s = "zdww";
            return JSON.stringify(Object.assign({
                appId: "NcApplication",
                paasHeader: s,
                timestampHeader: e,
                nonceHeader: i,
                signatureHeader: CryptoJS.SHA256(e + a + i + e).toString(CryptoJS.enc.Hex).toUpperCase()
            }, t))
        }
        function n(t, e) {
            var a = s(t)
              , n = JSON.parse(a).timestampHeader
              , o = CryptoJS.SHA256(n + "fTN2pfuisxTavbTuYVSsNJHetwq5bJvCQkjjtiLM2dCratiA" + n).toString(CryptoJS.enc.Hex).toUpperCase();
            return $.ajax(Object.assign({
                headers: {
                    "x-wif-nonce": "QkjjtiLM2dCratiA",
                    "x-wif-paasid": "smt-application",
                    "x-wif-signature": o,
                    "x-wif-timestamp": n
                },
                url: "http://103.66.32.242:8005/zwfwMovePortal/interface/interfaceJson",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: !0 === !document.all,
                data: a
            }, {
                headers: {
                    "x-wif-nonce": "QkjjtiLM2dCratiA",
                    "x-wif-paasid": "smt-application",
                    "x-wif-signature": o,
                    "x-wif-timestamp": n
                }
            }, e)).then((function(t) {
                if (0 !== t.code)
                    throw t;
                return t
            }
            )).catch((function(t) {
                i(),
                $(".closed").on("click", (function() {
                    $(".tips-bg").hide()
                }
                ))
            }
            )).always((function() {
                $(".loading").hide()
            }
            ))
        }
        a("b680"),
        a("d3b7"),
        a("25f0"),
        window.Ajax = n
    },
    "06ca": function(t, e, a) {},
    1: function(t, e, a) {
        t.exports = a("cafc")
    },
    "5df0": function(t, e, a) {
        "use strict";
        var i = a("06ca")
          , s = a.n(i);
        s.a
    },
    cafc: function(t, e, a) {
        "use strict";
        a.r(e);
        a("e623"),
        a("e379"),
        a("5dc8"),
        a("37e1"),
        a("db4d");
        var i = a("2b0e")
          , s = function() {
            var t = this
              , e = t.$createElement
              , a = t._self._c || e;
            return a("div", [a("div", {
                staticClass: "r-header"
            }, [a("p", {
                staticClass: "r-time"
            }, [t._v("截至" + t._s(t.end_update_time) + "，全国疫情：")]), a("div", {
                staticClass: "r-high",
                class: {
                    active: "high" === t.activeName
                },
                on: {
                    click: function(e) {
                        t.activeName = "high"
                    }
                }
            }, [t._v(" 高风险等级地区"), a("span", [t._v("（" + t._s(t.hcount) + "）")])]), a("div", {
                staticClass: "r-middle",
                class: {
                    active: "middle" === t.activeName
                },
                on: {
                    click: function(e) {
                        t.activeName = "middle"
                    }
                }
            }, [t._v(" 中风险等级地区"), a("span", [t._v("（" + t._s(t.mcount) + "）")])])]), a("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: "high" === t.activeName,
                    expression: "activeName === 'high'"
                }],
                staticClass: "h-content"
            }, [a("div", {
                staticClass: "h-container"
            }, [t._l(t.highPageSlice, (function(e, i) {
                return [a("div", {
                    key: i,
                    staticClass: "h-header"
                }, [t._v(" " + t._s(e.area_name) + " "), a("span", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: !e.communitys.length,
                        expression: "!li.communitys.length"
                    }],
                    staticClass: "h-span",
                    staticStyle: {
                        color: "#F26161"
                    }
                }, [t._v(" 高风险 ")]), a("table", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.communitys.length,
                        expression: "li.communitys.length"
                    }],
                    key: "table" + i,
                    staticClass: "h-table"
                }, t._l(e.communitys, (function(e, i) {
                    return a("tr", {
                        key: i,
                        staticClass: "h-tr",
                        class: i % 2 === 0 ? "even" : "odd"
                    }, [a("td", {
                        staticClass: "h-td1"
                    }, [t._v(t._s(e))]), a("td", {
                        staticClass: "h-td2",
                        staticStyle: {
                            color: "#F26161",
                            "font-weight": "bold"
                        }
                    }, [t._v("高风险")])])
                }
                )), 0)])]
            }
            )), a("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: !t.highlist.length && t.loaded,
                    expression: "!highlist.length && loaded"
                }],
                staticClass: "nodata"
            }, [t._m(0), a("div", {
                staticStyle: {
                    "font-size": "14px",
                    color: "#666",
                    float: "right",
                    "font-weight": "normal"
                }
            }, [t._v(" 有关信息来自当地上报的疫情风险等级 ")])])], 2), a("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.highlist.length && t.loaded,
                    expression: "highlist.length && loaded"
                }],
                staticClass: "bottom-text"
            }, [a("div", {
                ref: "page",
                staticClass: "pages-box"
            }), t._m(1), a("div", {
                staticClass: "source"
            }, [t._v(" 有关信息来自当地上报的疫情风险等级 ")])])]), a("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: "middle" === t.activeName,
                    expression: "activeName === 'middle'"
                }],
                staticClass: "m-content"
            }, [a("div", {
                staticClass: "m-container"
            }, [t._l(t.middlePageSlice, (function(e, i) {
                return [a("div", {
                    key: i,
                    staticClass: "m-header"
                }, [t._v(" " + t._s(e.area_name) + " "), a("span", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: !e.communitys.length,
                        expression: "!li.communitys.length"
                    }],
                    staticClass: "m-span",
                    staticStyle: {
                        color: "#FDBE34"
                    }
                }, [t._v(" 中风险 ")]), a("table", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.communitys.length,
                        expression: "li.communitys.length"
                    }],
                    key: "table" + i,
                    staticClass: "m-table"
                }, t._l(e.communitys, (function(e, i) {
                    return a("tr", {
                        key: i,
                        staticClass: "m-tr",
                        class: i % 2 === 0 ? "even" : "odd"
                    }, [a("td", {
                        staticClass: "m-td1"
                    }, [t._v(t._s(e))]), a("td", {
                        staticClass: "m-td2",
                        staticStyle: {
                            color: "#FDBE34",
                            "font-weight": "bold"
                        }
                    }, [t._v("中风险")])])
                }
                )), 0)])]
            }
            )), a("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: !t.middlelist.length && t.loaded,
                    expression: "!middlelist.length && loaded"
                }],
                staticClass: "nodata"
            }, [t._m(2), a("div", {
                staticStyle: {
                    "font-size": "14px",
                    color: "#666",
                    float: "right",
                    "font-weight": "normal"
                }
            }, [t._v(" 有关信息来自当地上报的疫情风险等级 ")])])], 2), a("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.middlelist.length && t.loaded,
                    expression: "middlelist.length && loaded"
                }],
                staticClass: "bottom-text"
            }, [a("div", {
                ref: "page1",
                staticClass: "pages-box"
            }), t._m(3), a("div", {
                staticClass: "source"
            }, [t._v(" 有关信息来自当地上报的疫情风险等级 ")])])]), t._m(4)])
        }
          , n = [function() {
            var t = this
              , e = t.$createElement
              , a = t._self._c || e;
            return a("div", {
                staticClass: "imgbox-dj"
            }, [a("img", {
                attrs: {
                    src: "source/PC/images/tit-noct.png",
                    alt: ""
                }
            }), a("div", {
                staticClass: "img-tit-dj"
            }, [t._v("暂无高风险等级地区")])])
        }
        , function() {
            var t = this
              , e = t.$createElement
              , a = t._self._c || e;
            return a("p", [t._v("注：其余未列出地区均为"), a("span", {
                staticClass: "low-risk",
                staticStyle: {
                    "font-weight": "bold"
                }
            }, [t._v("低风险")])])
        }
        , function() {
            var t = this
              , e = t.$createElement
              , a = t._self._c || e;
            return a("div", {
                staticClass: "imgbox-dj"
            }, [a("img", {
                attrs: {
                    src: "source/PC/images/tit-noct.png",
                    alt: ""
                }
            }), a("div", {
                staticClass: "img-tit-dj"
            }, [t._v("暂无中风险等级地区")])])
        }
        , function() {
            var t = this
              , e = t.$createElement
              , a = t._self._c || e;
            return a("p", [t._v("注：其余未列出地区均为"), a("span", {
                staticClass: "low-risk",
                staticStyle: {
                    "font-weight": "bold"
                }
            }, [t._v("低风险")])])
        }
        , function() {
            var t = this
              , e = t.$createElement
              , a = t._self._c || e;
            return a("div", {
                staticClass: "main-jycx"
            }, [a("a", {
                staticClass: "contacts",
                attrs: {
                    href: "http://bmfw.www.gov.cn/ggjtmqjczcx/index.html",
                    target: "_blank"
                }
            }), a("div", {
                staticClass: "erweima"
            }), a("p", {
                staticClass: "er-txt"
            }, [t._v("微信扫码进入小程序")]), a("div", {
                staticClass: "footer_depart"
            }, [a("p", [t._v("本服务由国家卫生健康委提供")])])])
        }
        ]
          , o = (a("fb6a"),
        a("4795"),
        a("96cf"),
        a("1da1"))
          , r = {
            data: function() {
                return {
                    end_update_time: "",
                    hcount: "0",
                    mcount: "0",
                    activeName: "high",
                    highlist: [],
                    middlelist: [],
                    loaded: !1,
                    page: 1,
                    page1: 1
                }
            },
            mounted: function() {
                this.ajaxGetCount()
            },
            computed: {
                highPageSlice: function() {
                    var t = 10 * (this.page - 1)
                      , e = t + 10;
                    return this.highlist.slice(t, e)
                },
                middlePageSlice: function() {
                    var t = 10 * (this.page1 - 1)
                      , e = t + 10;
                    return this.middlelist.slice(t, e)
                }
            },
            methods: {
                ajaxGetCount: function() {
                    var t = this;
                    return Object(o["a"])(regeneratorRuntime.mark((function e() {
                        var a, i, s, n, o, r, c;
                        return regeneratorRuntime.wrap((function(e) {
                            while (1)
                                switch (e.prev = e.next) {
                                case 0:
                                    return $(".loading").show(),
                                    e.next = 3,
                                    Ajax({
                                        key: "3C502C97ABDA40D0A60FBEE50FAAD1DA"
                                    });
                                case 3:
                                    a = e.sent,
                                    i = a.data,
                                    s = i.end_update_time,
                                    n = i.hcount,
                                    o = i.mcount,
                                    r = i.highlist,
                                    c = i.middlelist,
                                    t.end_update_time = s,
                                    t.hcount = n,
                                    t.mcount = o,
                                    t.highlist = r,
                                    t.middlelist = c,
                                    t.loaded = !0,
                                    $(t.$refs.page).paging({
                                        pageNum: 1,
                                        totalNum: Math.ceil(t.highlist.length / 10),
                                        callback: function(e) {
                                            t.page = e,
                                            window.scrollTo(0, 370)
                                        }
                                    }),
                                    $(t.$refs.page1).paging({
                                        pageNum: 1,
                                        totalNum: Math.ceil(t.middlelist.length / 10),
                                        callback: function(e) {
                                            t.page1 = e,
                                            window.scrollTo(0, 370),
                                            $(".loading").show(),
                                            setTimeout((function() {
                                                $(".loading").hide()
                                            }
                                            ), 200)
                                        }
                                    });
                                case 18:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e)
                    }
                    )))()
                }
            },
            watch: {
                activeName: function(t) {
                    "high" == t && (this.ajaxGetCount(),
                    this.page = 1),
                    "middle" == t && (this.ajaxGetCount(),
                    this.page1 = 1)
                }
            }
        }
          , c = r
          , l = (a("5df0"),
        a("2877"))
          , d = Object(l["a"])(c, s, n, !1, null, null, null)
          , u = d.exports;
        a("063a");
        i["a"].config.productionTip = !1;
        new i["a"]({
            render: function(t) {
                return t(u)
            }
        }).$mount("#app")
    }
});
//# sourceMappingURL=risk.d626c246.js.map
