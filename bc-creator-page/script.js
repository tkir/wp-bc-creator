function isTriangle(a, b, c) {
    return a + b + c - 2*Math.max(...arguments) > 0;
}

console.log(isTriangle(4, 2, 2));