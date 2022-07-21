"use strict";
exports.__esModule = true;
var number_1 = require("./number");
var map = {};
map.a = "(+{}+[])[".concat((0, number_1["default"])(1), "]");
map.b = "({}+[])[".concat((0, number_1["default"])(2), "]");
map.o = "({}+[])[".concat((0, number_1["default"])(1), "]");
map.e = "({}+[])[".concat((0, number_1["default"])(4), "]");
map.c = "({}+[])[".concat((0, number_1["default"])(5), "]");
map.t = "({}+[])[".concat((0, number_1["default"])(6), "]");
map[" "] = "({}+[])[".concat((0, number_1["default"])(7), "]");
map.f = "(![]+[])[".concat((0, number_1["default"])(0), "]");
map.s = "(![]+[])[".concat((0, number_1["default"])(3), "]");
map.r = "(!![]+[])[".concat((0, number_1["default"])(1), "]");
map.u = "(!![]+[])[".concat((0, number_1["default"])(2), "]");
map.i = "((+!![]/+[])+[])[".concat((0, number_1["default"])(3), "]");
map.n = "((+!![]/+[])+[])[".concat((0, number_1["default"])(4), "]");
map.S = "([]+([]+[])[".concat(string("constructor"), "])[").concat((0, number_1["default"])(9), "]");
map.g = "([]+([]+[])[".concat(string("constructor"), "])[").concat((0, number_1["default"])(14), "]");
map.p = "([]+(/-/)[".concat(string("constructor"), "])[").concat((0, number_1["default"])(14), "]");
map["\\"] = "(/\\\\/+[])[".concat((0, number_1["default"])(1), "]");
map.d = "(".concat((0, number_1["default"])(13), ")[").concat(string("toString"), "](").concat((0, number_1["default"])(14), ")");
map.h = "(".concat((0, number_1["default"])(17), ")[").concat(string("toString"), "](").concat((0, number_1["default"])(18), ")");
map.m = "(".concat((0, number_1["default"])(22), ")[").concat(string("toString"), "](").concat((0, number_1["default"])(23), ")");
map.C = "((()=>{})[".concat(string("constructor"), "](").concat(string("return escape"), ")()(").concat(map["\\"], "))[").concat((0, number_1["default"])(2), "]");
function string(s) {
    return s
        .split("")
        .map(function (x) {
        if (!(x in map)) {
            var charCode = x.charCodeAt(0);
            return "([]+[])[".concat(string("constructor"), "][").concat(string("fromCharCode"), "](").concat((0, number_1["default"])(charCode), ")");
        }
        return map[x];
    })
        .join(" + ");
}
exports["default"] = string;
