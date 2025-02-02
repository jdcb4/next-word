"use client";

import { useRouter } from "next/navigation";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useGame } from "../GameContext";
import styles from "./Leaderboard.module.css"; // Assuming you have a CSS module for styling

// Register Chart.js components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function Leaderboard() {
  const {
    teamScores,
    teamNames,
    currentTeamIndex,
    nextTeam,
    resetGame,
    numTeams,
    currentRound,
    numRounds,
  } = useGame();
  const router = useRouter();

  const data = {
    labels: teamNames.slice(0, numTeams),
    datasets: [
      {
        label: "Score",
        data: teamScores.slice(0, numTeams),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: true,
        color: "black",
        font: {
          weight: "bold",
        },
        formatter: (value) => value,
      },
    },
    scales: {
      y: {
        display: false,
      },
    },
  };

  const handleNextTeam = () => {
    nextTeam();
    router.push("/game-play");
  };

  const handleReturnToMainMenu = () => {
    resetGame();
    router.push("/main-menu");
  };

  return (
    <div className={styles.container}>
      <h1>Leaderboard</h1>
      <Bar data={data} options={options} />
      {currentRound >= numRounds && currentTeamIndex === numTeams - 1 ? (
        <button className={styles.button} onClick={handleReturnToMainMenu}>
          Return to Main Menu
        </button>
      ) : (
        <button className={styles.button} onClick={handleNextTeam}>
          Next Team
        </button>
      )}
    </div>
  );
}
