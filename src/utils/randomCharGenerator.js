"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomCharGenerator = void 0;
const englishLetters_1 = require("../constants/englishLetters");
const randomCharGenerator = (maxLength) => {
    let res = "";
    for (let i = 0; i <= maxLength; i++) {
        const targetIndex = Math.floor(Math.random() * englishLetters_1.englishLetters.length);
        res += englishLetters_1.englishLetters[targetIndex];
    }
    return res;
};
exports.randomCharGenerator = randomCharGenerator;
