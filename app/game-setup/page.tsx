"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "../GameContext";
import styles from "./GameSetup.module.css"; // Assuming you have a CSS module for styling

const availableCategories = [
  "Person",
  "Place",
  "Thing",
  "Nature",
  "Action",
  "Random",
];

export default function GameSetup() {
  const [numTeams, setNumTeams] = useState(1);
  const [roundTime, setRoundTime] = useState(30);
  const [categories, setCategories] = useState<string[]>(availableCategories);
  const [freeSkips, setFreeSkips] = useState(1);
  const [numRounds, setNumRounds] = useState(3);
  const { setGameSetup } = useGame();
  const router = useRouter();

  const handleCategoryChange = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const handleNext = () => {
    if (categories.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    setGameSetup(numTeams, roundTime, categories, freeSkips, numRounds);

    console.log(
      {
        numTeams,
        roundTime,
        categories,
        freeSkips,
        numRounds,
      },
      "Game setup submission"
    );

    router.push("/team-setup");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Game Setup</h1>
      <div>
        <label>Number of Teams:</label>
        <div className={styles.bubbleContainer}>
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={`${styles.bubble} ${
                numTeams === num ? styles.selected : ""
              }`}
              onClick={() => setNumTeams(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label>Round Time:</label>
        <div className={styles.bubbleContainer}>
          {[5, 30, 45, 60].map((time) => (
            <button
              key={time}
              className={`${styles.bubble} ${
                roundTime === time ? styles.selected : ""
              }`}
              onClick={() => setRoundTime(time)}
            >
              {time}s
            </button>
          ))}
        </div>
      </div>
      <div>
        <label>Categories:</label>
        <div className={styles.categoryContainer}>
          {availableCategories.map((category) => (
            <button
              key={category}
              className={`${styles.bubble} ${
                categories.includes(category) ? styles.selected : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label>Number of Free Skips:</label>
        <div className={styles.bubbleContainer}>
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              className={`${styles.bubble} ${
                freeSkips === num ? styles.selected : ""
              }`}
              onClick={() => setFreeSkips(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label>Number of Rounds:</label>
        <div className={styles.bubbleContainer}>
          {[3, 4, 5].map((round) => (
            <button
              key={round}
              className={`${styles.bubble} ${
                numRounds === round ? styles.selected : ""
              }`}
              onClick={() => setNumRounds(round)}
            >
              {round}
            </button>
          ))}
        </div>
      </div>
      <button className={styles.nextButton} onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
