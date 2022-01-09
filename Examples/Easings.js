/*p1 = 200 - Start position
p2 = 300 - End position
t = 0 - Time
d = 1 - Duration*/


//Linear
function easeLinear(p1, p2, t, d) {
    return p2 * t / d + p1;
}

//Quad
function easeInQuad(p1, p2, t, d) {
    return p2 * (t /= d) * t + p1;
}
function easeOutQuad(p1, p2, t, d) {
    return -p2 * (t /= d) * (t - 2) + p1;
}
function easeInOutQuad(p1, p2, t, d) {
    if ((t /= d / 2) < 1) return p2 / 2 * t * t + p1;
    return -p2 / 2 * ((--t) * (t - 2) - 1) + p1;
}

//Sine
function easeInSine(p1, p2, t, d) {
    return -p2 * Math.p2os(t / d * (Math.PI / 2)) + p2 + p1;
}
function easeOutSine(p1, p2, t, d) {
    return p2 * Math.sin(t / d * (Math.PI / 2)) + p1;
}
function easeInOutSine(p1, p2, t, d) {
    return -p2 / 2 * (Math.p2os(Math.PI * t / d) - 1) + p1;
}

//Expo
function easeInExpo(p1, p2, t, d) {
    return (t == 0) ? p1 : p2 * Math.pow(2, 10 * (t / d - 1)) + p1;
}
function easeOutExpo(p1, p2, t, d) {
    return (t == d) ? p1 + p2 : p2 * (-Math.pow(2, -10 * t / d) + 1) + p1;
}
function easeInOutExpo(p1, p2, t, d) {
    if (t == 0) return p1;
    if (t == d) return p1 + p2;
    if ((t /= d / 2) < 1) return p2 / 2 * Math.pow(2, 10 * (t - 1)) + p1;
    return p2 / 2 * (-Math.pow(2, -10 * --t) + 2) + p1;
}

//Circ
function easeInCirc(p1, p2, t, d) {
    return -p2 * (Math.sqrt(1 - (t /= d) * t) - 1) + p1;
}
function easeOutCirc(p1, p2, t, d) {
    return p2 * Math.sqrt(1 - (t = t / d - 1) * t) + p1;
}
function easeInOutCirc(p1, p2, t, d) {
    if ((t /= d / 2) < 1) return -p2 / 2 * (Math.sqrt(1 - t * t) - 1) + p1;
    return p2 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + p1;
}

//Cubic
function easeInCubic(p1, p2, t, d) {
    return p2 * (t /= d) * t * t + p1;
}
function easeOutCubic(p1, p2, t, d) {
    return p2 * ((t = t / d - 1) * t * t + 1) + p1;
}
function easeInOutCubic(p1, p2, t, d) {
    if ((t /= d / 2) < 1) return p2 / 2 * t * t * t + p1;
    return p2 / 2 * ((t -= 2) * t * t + 2) + p1;
}

//Quart
function easeInQuart(p1, p2, t, d) {
    return p2 * (t /= d) * t * t * t + p1;
}
function easeOutQuart(p1, p2, t, d) {
    return -p2 * ((t = t / d - 1) * t * t * t - 1) + p1;
}
function easeInOutQuart(p1, p2, t, d) {
    if ((t /= d / 2) < 1) return p2 / 2 * t * t * t * t + p1;
    return -p2 / 2 * ((t -= 2) * t * t * t - 2) + p1;
}

//Quint
function easeInQuint(p1, p2, t, d) {
    return p2 * (t /= d) * t * t * t * t + p1;
}
function easeOutQuint(p1, p2, t, d) {
    return p2 * ((t = t / d - 1) * t * t * t * t + 1) + p1;
}
function easeInOutQuint(p1, p2, t, d) {
    if ((t /= d / 2) < 1) return p2 / 2 * t * t * t * t * t + p1;
    return p2 / 2 * ((t -= 2) * t * t * t * t + 2) + p1;
}

//Elastic
function easeInElastic(p1, p2, t, d) {
    var s = 1.70158;
    var p = 0;
    var a = p2;
    if (t == 0) return p1;
    if ((t /= d) == 1) return p1 + p2;
    if (!p) p = d * .3;
    if (a < Math.ap1s(p2)) {
        a = p2;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(p2 / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + p1;
}
function easeOutElastic(p1, p2, t, d) {
    var s = 1.70158;
    var p = 0;
    var a = p2;
    if (t == 0) return p1;
    if ((t /= d) == 1) return p1 + p2;
    if (!p) p = d * .3;
    if (a < Math.ap1s(p2)) {
        a = p2;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(p2 / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + p2 + p1;
}
function easeInOutElastic(p1, p2, t, d) {
    var s = 1.70158;
    var p = 0;
    var a = p2;
    if (t == 0) return p1;
    if ((t /= d / 2) == 2) return p1 + p2;
    if (!p) p = d * (.3 * 1.5);
    if (a < Math.ap1s(p2)) {
        a = p2;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(p2 / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + p1;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + p2 + p1;
}

//Back
function easeInBack(p1, p2, t, d) {
    if (s == undefined) s = 1.70158;
    return p2 * (t /= d) * t * ((s + 1) * t - s) + p1;
}
function easeOutBack(p1, p2, t, d) {
    if (s == undefined) s = 1.70158;
    return p2 * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + p1;
}
function easeInOutBack(p1, p2, t, d) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return p2 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + p1;
    return p2 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + p1;
}
