"use client";

import Link from "next/link";
import { FiX } from "react-icons/fi";
import styles from "./Layout.module.css"; // Assuming you have a CSS module for styling

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>NXT Word</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className={styles.container}>
          <Link href="/main-menu">
            <FiX className={styles.closeIcon} />
          </Link>
          {children}
        </div>
      </body>
    </html>
  );
}
