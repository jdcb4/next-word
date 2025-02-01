"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./GamePlay.module.css"; // Assuming you have a CSS module for styling
import { getRandomCategory, getRandomWord } from "./gameLogic";

function GamePlayComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const teamIndex = parseInt(searchParams.get("teamIndex") || "0", 10);
  const roundTime = parseInt(searchParams.get("roundTime") || "30", 10);
  const categories = searchParams.get("categories")?.split(",") || [];
  const freeSkips = parseInt(searchParams.get("freeSkips") || "1", 10);
  const initialCategory = searchParams.get("category") || "";
  const initialWord = searchParams.get("word") || "";
  const teamName = searchParams.get("teamName") || "Unknown Team";
  const [timeLeft, setTimeLeft] = useState(roundTime);
  const [currentWord, setCurrentWord] = useState(initialWord);
  const [currentCategory, setCurrentCategory] = useState(initialCategory);
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [skippedWords, setSkippedWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [skipsUsed, setSkipsUsed] = useState(0);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      router.push("/leaderboard");
    } else if (timeLeft === 5) {
      const beep = new Audio("/beep.mp3");
      beep.play();
    }
  }, [timeLeft, router]);

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
    setCurrentWord(getRandomWord(currentCategory));
  };

  const getTimerBackgroundColor = () => {
    if (timeLeft > 20) {
      return "green";
    } else if (timeLeft > 5) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <div>
      <h1>Game Play - {teamName}</h1>
      <div className={styles.infoBox}>
        <span
          className={styles.boldBox}
          style={{ backgroundColor: getTimerBackgroundColor() }}
        >
          Time Left: {timeLeft}s
        </span>
        <span className={styles.boldBox}>Category: {currentCategory}</span>
      </div>
      <div className={styles.wordBox}>
        <h2>{currentWord}</h2>
      </div>
      <div className={styles.scoreBox}>
        <h2>Score: {score}</h2>
      </div>
      <div className={styles.wordListContainer}>
        <div className={styles.wordList}>
          <h3>Correct</h3>
          {correctWords.map((word, index) => (
            <div key={index}>{word}</div>
          ))}
        </div>
        <div className={styles.wordList}>
          <h3>Skipped</h3>
          {skippedWords.map((word, index) => (
            <div key={index}>{word}</div>
          ))}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${styles.nextButton}`}
          onClick={handleNextWord}
        >
          Next
        </button>
        <button
          className={`${styles.button} ${styles.skipButton}`}
          onClick={handleSkipWord}
        >
          Skip
        </button>
      </div>
    </div>
  );
}

export default function GamePlay() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GamePlayComponent />
    </Suspense>
  );
}
