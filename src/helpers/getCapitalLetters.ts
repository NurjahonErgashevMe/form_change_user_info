function getCapitalLetters(word: string): string {
  const splittingWord: string[] = word.split(" ");
  const getLetterWord: string[] = splittingWord.map((i) => i[0]);
  return getLetterWord?.join("");
}
export default getCapitalLetters;
