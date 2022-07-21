import { argv } from "process";

export function init() {
    argv.splice(0, 2);
}

export function getValue(name: string) {
    for (const arg of argv) {
        if (arg.startsWith(name + "=")) return arg.substring((name + "=").length);
    }
    return null;
}

export function exists(name: string) {
    for (const arg of argv) {
        if (arg == name || arg.startsWith(name + "=")) return true;
    }
    return false;
}

export function getParameter(index: number) {
    const parameters = [];
    for (const arg of argv) {
        if (arg.startsWith("--")) continue;
        parameters.push(arg);
    }
    return parameters[index];
}
