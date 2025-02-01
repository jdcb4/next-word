"use client";

import Link from "next/link";
import { FiSettings, FiInfo } from "react-icons/fi";
import styles from "./MainMenu.module.css"; // Assuming you have a CSS module for styling

export default function MainMenu() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>NXT Word</h1>
      <Link href="/game-setup">
        <button className={styles.startButton}>Start Game</button>
      </Link>
      <Link href="/settings">
        <FiSettings className={styles.settingsIcon} />
      </Link>
      <Link href="/instructions">
        <FiInfo className={styles.instructionsIcon} />
      </Link>
    </div>
  );
}
