export const isValid = <
  T extends string = "string" | "boolean" | "number" | "regEx"
>(
  value: {
    key: string;
    value: T;
  },
  mustBe: T,
  errors: {
    errorInType: string;
    mainError: string;
    patternError: string;
  } = {
    errorInType: "نوع داده منطبق نیست",
    mainError: "این مقدار مجاز نیست",
    patternError: "پترن مورد نظر وارد نشده یا منطبق نیست",
  },
  pattern?: RegExp
): string | { key: string; error: string } => {
  if (mustBe === "regEx") {
    if (!pattern) return "مقدار پترن موجود نیست";
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
