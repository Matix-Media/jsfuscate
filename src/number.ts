const zero = "+[]";
const one = "+!![]";

export default function number(n: number) {
    if (n === 0) return zero;
    return Array.from({ length: n }, () => one).join(" + ");
}
