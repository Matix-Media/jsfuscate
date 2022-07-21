import number from "./number";

const map: { [key: string]: string } = {};
map.a = `(+{}+[])[${number(1)}]`;
map.b = `({}+[])[${number(2)}]`;
map.o = `({}+[])[${number(1)}]`;
map.e = `({}+[])[${number(4)}]`;
map.c = `({}+[])[${number(5)}]`;
map.t = `({}+[])[${number(6)}]`;
map[" "] = `({}+[])[${number(7)}]`;
map.f = `(![]+[])[${number(0)}]`;
map.s = `(![]+[])[${number(3)}]`;
map.r = `(!![]+[])[${number(1)}]`;
map.u = `(!![]+[])[${number(2)}]`;
map.i = `((+!![]/+[])+[])[${number(3)}]`;
map.n = `((+!![]/+[])+[])[${number(4)}]`;
map.S = `([]+([]+[])[${string("constructor")}])[${number(9)}]`;
map.g = `([]+([]+[])[${string("constructor")}])[${number(14)}]`;
map.p = `([]+(/-/)[${string("constructor")}])[${number(14)}]`;
map["\\"] = `(/\\\\/+[])[${number(1)}]`;
map.d = `(${number(13)})[${string("toString")}](${number(14)})`;
map.h = `(${number(17)})[${string("toString")}](${number(18)})`;
map.m = `(${number(22)})[${string("toString")}](${number(23)})`;
map.C = `((()=>{})[${string("constructor")}](${string("return escape")})()(${map["\\"]}))[${number(2)}]`;

export default function string(s: string): string {
    return s
        .split("")
        .map((x) => {
            if (!(x in map)) {
                const charCode = x.charCodeAt(0);
                return `([]+[])[${string("constructor")}][${string("fromCharCode")}](${number(charCode)})`;
            }
            return map[x];
        })
        .join(" + ");
}
