"use client";

import Link from "next/link";
import { FiX } from "react-icons/fi";
import styles from "./Layout.module.css"; // Assuming you have a CSS module for styling

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <div className={styles.container}>
            <Link href="/main-menu">
              <FiX className={styles.closeIcon} />
            </Link>
            {children}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
