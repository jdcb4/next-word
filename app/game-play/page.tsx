"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "../GameContext";
import styles from "./GamePlay.module.css"; // Assuming you have a CSS module for styling
import { getRandomWord } from "./gameLogic";

function GamePlayComponent() {
  const router = useRouter();
  const {
    roundTime,
    categories,
    freeSkips,
    teamNames,
    currentTeamIndex,
    currentCategory,
    currentWord,
    addCorrectWord,
    addSkippedWord,
    score,
    correctWords,
    skippedWords,
    updateTeamScore,
    numRounds,
    currentRound,
    numTeams,
    nextTeam,
  } = useGame();
  const teamName = teamNames[currentTeamIndex] || "Unknown Team";
  const [timeLeft, setTimeLeft] = useState(roundTime);
  const [currentWordState, setCurrentWordState] = useState(currentWord);
  const [currentCategoryState, setCurrentCategoryState] =
    useState(currentCategory);
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
      updateTeamScore();
      router.push("/leaderboard");
    } else if (timeLeft === 5) {
      const beep = new Audio("/beep.mp3");
      beep.play();
    }
  }, [timeLeft, router, updateTeamScore]);

  const handleNextWord = () => {
    addCorrectWord(currentWordState);
    updateWord();
  };

  const handleSkipWord = () => {
    addSkippedWord(currentWordState);
    if (skipsUsed < freeSkips) {
      setSkipsUsed(skipsUsed + 1);
    }
    updateWord();
  };

  const updateWord = () => {
    setCurrentWordState(getRandomWord(currentCategoryState));
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
      <h1>
        {" "}
        Game Play - {teamName} (Rd: {currentRound})
      </h1>
      <div className={styles.infoBox}>
        <span
          className={styles.boldBox}
          style={{ backgroundColor: getTimerBackgroundColor() }}
        >
          Time Left: {timeLeft}s
        </span>
        <span className={styles.boldBox}>Category: {currentCategoryState}</span>
      </div>
      <div className={styles.wordBox}>
        <h2>{currentWordState}</h2>
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
