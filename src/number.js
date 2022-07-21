"use strict";
exports.__esModule = true;
var zero = "+[]";
var one = "+!![]";
function number(n) {
    if (n === 0)
        return zero;
    return Array.from({ length: n }, function () { return one; }).join(" + ");
}
exports["default"] = number;
