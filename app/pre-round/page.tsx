"use client";

import { useRouter } from "next/navigation";
import { useGame } from "../GameContext";
import { getRandomCategory, getRandomWord } from "../game-play/gameLogic";
import styles from "./PreRound.module.css"; // Assuming you have a CSS module for styling

export default function PreRound() {
  const { categories, teamNames, currentTeamIndex, setCurrentCategoryAndWord } =
    useGame();
  const router = useRouter();

  const handleStartRound = () => {
    const randomCategory = getRandomCategory(categories);
    const randomWord = getRandomWord(randomCategory);
    setCurrentCategoryAndWord(randomCategory, randomWord);
    router.push("/game-play");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pre Round</h1>
      <p className={styles.description}>
        Get ready, {teamNames[currentTeamIndex]}!
      </p>
      <button className={styles.startButton} onClick={handleStartRound}>
        Start Round
      </button>
    </div>
  );
}
