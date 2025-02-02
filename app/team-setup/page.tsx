"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "../GameContext";
import styles from "./TeamSetup.module.css"; // Assuming you have a CSS module for styling

export default function TeamSetup() {
  const { numTeams, setTeamNames } = useGame();
  const [teams, setTeams] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const initialTeams = Array.from(
      { length: numTeams },
      (_, i) => `Team ${i + 1}`
    );
    setTeams(initialTeams);
  }, [numTeams]);

  const updateTeamName = (index: number, name: string) => {
    const newTeams = [...teams];
    newTeams[index] = name;
    setTeams(newTeams);
  };

  const handleStartGame = () => {
    setTeamNames(teams);
    router.push("/pre-round");
  };

  return (
    <div className={styles.container}>
      <h1>Team Setup</h1>
      {teams.map((team, index) => (
        <div key={index} className={styles.teamInputContainer}>
          <label htmlFor={`team-${index}`}>Team {index + 1}:</label>
          <input
            id={`team-${index}`}
            type="text"
            value={team}
            onChange={(e) => updateTeamName(index, e.target.value)}
            className={styles.teamInput}
          />
        </div>
      ))}
      <button className={styles.startButton} onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
}
