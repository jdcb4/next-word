"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import { GameProvider } from "./GameContext";
import styles from "./Layout.module.css"; // Assuming you have a CSS module for styling

export default function Layout({ children }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const router = useRouter();

  const handleQuit = () => {
    setShowPrompt(true);
  };

  const handleConfirmQuit = () => {
    setShowPrompt(false);
    router.push("/main-menu");
  };

  const handleCancelQuit = () => {
    setShowPrompt(false);
  };

  return (
    <html lang="en">
      <head>
        <title>NXT Word</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <GameProvider>
          <div className={styles.container}>
            <FiX className={styles.closeIcon} onClick={handleQuit} />
            {children}
            {showPrompt && (
              <div className={styles.prompt}>
                <p>Are you sure you want to quit the game?</p>
                <button
                  className={styles.promptButton}
                  onClick={handleConfirmQuit}
                >
                  Yes
                </button>
                <button
                  className={styles.promptButton}
                  onClick={handleCancelQuit}
                >
                  No
                </button>
              </div>
            )}
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
