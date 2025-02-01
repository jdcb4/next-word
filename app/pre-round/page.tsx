"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function PreRound() {
  const searchParams = useSearchParams();
  const teamIndex = parseInt(searchParams.get("teamIndex") || "0", 10);
  const roundTime = parseInt(searchParams.get("roundTime") || "30", 10);
  const categories = searchParams.get("categories") || "";
  const freeSkips = parseInt(searchParams.get("freeSkips") || "1", 10);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    // Fetch the team name based on the teamIndex from some state or context
    // For now, we'll use a placeholder
    const teams = ["Team 1", "Team 2", "Team 3", "Team 4"];
    setTeamName(teams[teamIndex]);
  }, [teamIndex]);

  const router = useRouter();

  const handleStartRound = () => {
    console.log("Starting round for:", teamName);
    // Navigate to the game play page or start the round
    router.push(
      `/game-play?teamIndex=${teamIndex}&roundTime=${roundTime}&categories=${categories}&freeSkips=${freeSkips}`
    );
  };

  return (
    <div>
      <h1>Pre Round</h1>
      <p>Get ready, {teamName}!</p>
      <button onClick={handleStartRound}>Start Round</button>
    </div>
  );
}
