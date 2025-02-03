"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import { GameProvider, useGame } from "./GameContext";
import styles from "./Layout.module.css";

// Remove useGame from the top-level export function.
// Instead, create a child component that uses it.
function QuitButton() {
  const router = useRouter();
  const { resetGame } = useGame();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleQuit = () => {
    setShowPrompt(true);
  };

  const handleConfirmQuit = () => {
    resetGame(); // Reset all state to initial values
    setShowPrompt(false);
    router.push("/main-menu"); // Navigate to homepage
  };

  const handleCancelQuit = () => {
    setShowPrompt(false);
  };

  return (
    <>
      <FiX className={styles.closeIcon} onClick={handleQuit} />
      {showPrompt && (
        <div className={styles.prompt}>
          <p>Are you sure you want to quit the game?</p>
          <button className={styles.promptButton} onClick={handleConfirmQuit}>
            Yes
          </button>
          <button className={styles.promptButton} onClick={handleCancelQuit}>
            No
          </button>
        </div>
      )}
    </>
  );
}

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <html lang="en">
      <head>
        <title>NXT Word</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {/* Wrap children with GameProvider */}
        <GameProvider>
          <div className={styles.container}>
            {/* Render QuitButton inside provider */}
            <QuitButton />
            {children}
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
