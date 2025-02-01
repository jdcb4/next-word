import Link from "next/link";

export default function MainMenu() {
  return (
    <div>
      <h1>Main Menu</h1>
      <ul>
        <li>
          <Link href="/game-setup">Start Game</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
        <li>
          <Link href="/instructions">Instructions</Link>
        </li>
      </ul>
    </div>
  );
}
