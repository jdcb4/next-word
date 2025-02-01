"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./GameSetup.module.css"; // Assuming you have a CSS module for styling

export default function GameSetup() {
  const [numTeams, setNumTeams] = useState(1);
  const [roundTime, setRoundTime] = useState(30);
  const [categories, setCategories] = useState<string[]>([]);
  const [freeSkips, setFreeSkips] = useState(1);
  const router = useRouter();

  const handleCategoryChange = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const handleNext = () => {
    console.log("Number of Teams:", numTeams);
    console.log("Round Time:", roundTime);
    console.log("Categories:", categories);
    console.log("Number of Free Skips:", freeSkips);
    const selectedCategories = categories.join(",");
    router.push(
      `/team-setup?numTeams=${numTeams}&roundTime=${roundTime}&categories=${selectedCategories}&freeSkips=${freeSkips}`
    );
  };

  return (
    <div>
      <h1>Game Setup</h1>
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
          {[30, 45, 60].map((time) => (
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
          {["Person", "Place", "Thing", "Nature", "Action", "Random"].map(
            (category) => (
              <button
                key={category}
                className={`${styles.bubble} ${
                  categories.includes(category) ? styles.selected : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            )
          )}
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
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
