"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import wordsData from "../../data/words.json"; // Adjust the path if necessary

export default function GamePlay() {
  const searchParams = useSearchParams();
  const teamIndex = parseInt(searchParams.get("teamIndex") || "0", 10);
  const roundTime = parseInt(searchParams.get("roundTime") || "30", 10);
  const categories = searchParams.get("categories")?.split(",") || [];
  const freeSkips = parseInt(searchParams.get("freeSkips") || "1", 10);
  const [timeLeft, setTimeLeft] = useState(roundTime);
  const [currentWord, setCurrentWord] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [skippedWords, setSkippedWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [skipsUsed, setSkipsUsed] = useState(0);

  useEffect(() => {
    if (categories.length > 0) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      setCurrentCategory(randomCategory);

      const wordsInCategory = wordsData.filter(
        (word) => word.category === randomCategory
      );
      if (wordsInCategory.length > 0) {
        const randomWord =
          wordsInCategory[Math.floor(Math.random() * wordsInCategory.length)]
            .word;
        setCurrentWord(randomWord);
      } else {
        setCurrentWord("No words available");
      }
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array to run only once on mount

  const handleNextWord = () => {
    setCorrectWords([...correctWords, currentWord]);
    setScore(score + 1);
    updateWord();
  };

  const handleSkipWord = () => {
    setSkippedWords([...skippedWords, currentWord]);
    if (skipsUsed < freeSkips) {
      setSkipsUsed(skipsUsed + 1);
    } else {
      setScore(score - 1);
    }
    updateWord();
  };

  const updateWord = () => {
    const wordsInCategory = wordsData.filter(
      (word) => word.category === currentCategory
    );
    if (wordsInCategory.length > 0) {
      const randomWord =
        wordsInCategory[Math.floor(Math.random() * wordsInCategory.length)]
          .word;
      setCurrentWord(randomWord);
    } else {
      setCurrentWord("No words available");
    }
  };

  return (
    <div>
      <h1>Game Play</h1>
      <div>
        <h2>Time Left: {timeLeft}s</h2>
      </div>
      <div>
        <h2>Category: {currentCategory}</h2>
      </div>
      <div>
        <h2>{currentWord}</h2>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Correct</th>
              <th>Skipped</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {correctWords.map((word, index) => (
                  <div key={index}>{word}</div>
                ))}
              </td>
              <td>
                {skippedWords.map((word, index) => (
                  <div key={index}>{word}</div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={handleNextWord}>Next</button>
        <button onClick={handleSkipWord}>Skip</button>
      </div>
      <div>
        <h2>Score: {score}</h2>
      </div>
    </div>
  );
}
