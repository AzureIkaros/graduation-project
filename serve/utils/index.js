const getStr = (min, max) => {
    return Math.round(Math.random() * (max - min)) + min;
}

module.exports = function getCode() {
    let code = "";
    for (let i = 0; i < 6; i++) {
        let str = String.fromCharCode(getStr(48, 122));
        /[0-9a-zA-Z]/.test(str) ? code += str : i--;
    }
    return code;
}