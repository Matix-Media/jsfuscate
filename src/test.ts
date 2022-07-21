import * as log from "./log";
import number from "./number";
import string from "./string";

const testLogLevel: log.LogLevel = { level: 1, method: console.info, name: "TEST" };
const testFailedLogLevel: log.LogLevel = { level: 3, method: console.error, name: "TEST FAILED" };

function truncate(str: string, n: number) {
    return str.length > n ? str.substring(0, n - 1) + "..." : str;
}

export default function test() {
    log.log(testLogLevel, "Testing compiler");
    log.log(testLogLevel, "Checking numbers");

    for (let i = 0; i < 10; i++) {
        const compiled = number(i);
        const result = eval(compiled);
        if (result !== i) {
            log.log(testFailedLogLevel, `At number check for ${i}, got result "${result}". (Compiled to: "${compiled}")`, {
                failed: true,
                at: "number",
                expected: i,
                result,
                compiled,
            });
            return;
        } else {
            log.log(testLogLevel, `${i} === ${result} ("${truncate(compiled, 20)}")`, { testing: "numbers", value: i, compiled });
        }
    }

    log.log(testLogLevel, "Checking strings");
    const stringsToCheck = [
        "constructor",
        Array.from(Array(26))
            .map((e, i) => i + 65)
            .map((x) => String.fromCharCode(x))
            .join(""),
        `!"§$%&/()=?\`´+*~#',.-;:_<>|^°{[]}\\`,
    ];
    for (const stringToCheck of stringsToCheck) {
        const compiled = string(stringToCheck);
        const result = eval(compiled);
        if (result != stringToCheck) {
            log.log(testFailedLogLevel, `At string check for "${stringToCheck}", got result "${result}". (Compiled to: "${compiled}")`, {
                failed: true,
                at: "number",
                expected: stringToCheck,
                result,
                compiled,
            });
        } else {
            log.log(testLogLevel, `"${stringToCheck}" == "${result}" ("${truncate(compiled, 20)}")`, {
                testing: "strings",
                value: stringToCheck,
                compiled,
            });
        }
    }
}
