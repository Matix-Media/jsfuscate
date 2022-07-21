"use strict";
exports.__esModule = true;
var number_1 = require("./number");
var string_1 = require("./string");
function truncate(str, n) {
    return str.length > n ? str.substring(0, n - 1) + "..." : str;
}
function test() {
    console.log("TEST: Testing compiler");
    console.log("TEST: Checking numbers");
    for (var i = 0; i < 10; i++) {
        var compiled = (0, number_1["default"])(i);
        var result = eval(compiled);
        console.log("TEST: ".concat(i, " === ").concat(result, " (\"").concat(truncate(compiled, 20), "\")"));
        if (result !== i) {
            console.log("TEST: FAILED! At number check for ".concat(i, ", got result \"").concat(result, "\". (Compiled to: \"").concat(compiled, "\")"));
            return;
        }
    }
    console.log("TEST: Checking strings");
    var stringsToCheck = [
        "constructor",
        Array.from(Array(26))
            .map(function (e, i) { return i + 65; })
            .map(function (x) { return String.fromCharCode(x); })
            .join(""),
        "!\"\u00A7$%&/()=?`\u00B4+*~#',.-;:_<>|^\u00B0{[]}\\",
    ];
    for (var _i = 0, stringsToCheck_1 = stringsToCheck; _i < stringsToCheck_1.length; _i++) {
        var stringToCheck = stringsToCheck_1[_i];
        var compiled = (0, string_1["default"])(stringToCheck);
        var result = eval(compiled);
        console.log("TEST: \"".concat(stringToCheck, "\" == \"").concat(result, "\" (\"").concat(truncate(compiled, 20), "\")"));
        if (result != stringToCheck) {
            console.log("TEST: FAILED! At string check for \"".concat(stringToCheck, "\", got result \"").concat(result, "\". (Compiled to: \"").concat(compiled, "\")"));
        }
    }
}
exports["default"] = test;
