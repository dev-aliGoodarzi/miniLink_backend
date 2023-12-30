import { englishLetters } from "../constants/englishLetters";

export const randomCharGenerator = (maxLength: number) => {
  let res = "";

  for (let i = 0; i <= maxLength; i++) {
    const targetIndex = Math.floor(Math.random() * englishLetters.length);
    res += englishLetters[targetIndex];
  }
  return res;
};
