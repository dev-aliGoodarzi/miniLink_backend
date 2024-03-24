"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const isValid = (value, mustBe, errors = {
    errorInType: "نوع داده منطبق نیست",
    mainError: "این مقدار مجاز نیست",
    patternError: "پترن مورد نظر وارد نشده یا منطبق نیست",
}, pattern) => {
    if (mustBe === "regEx") {
        if (!pattern)
            return "مقدار پترن موجود نیست";
        if (pattern.test(value.value)) {
            return value.value;
        }
        throw {
            key: value.key,
            error: errors.patternError,
        };
    }
    if (typeof value.value !== mustBe)
        throw { key: value.key, error: errors.errorInType };
    return value.value;
};
exports.isValid = isValid;
