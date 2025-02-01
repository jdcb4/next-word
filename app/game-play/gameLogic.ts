import wordsData from "../../data/words.json"; // Adjust the path if necessary

export const getRandomCategory = (categories: string[]): string => {
  return categories[Math.floor(Math.random() * categories.length)];
};

export const getRandomWord = (category: string): string => {
  const wordsInCategory = wordsData.filter(
    (word) => word.category === category
  );
  if (wordsInCategory.length > 0) {
    return wordsInCategory[Math.floor(Math.random() * wordsInCategory.length)]
      .word;
  } else {
    return "No words available";
  }
};
