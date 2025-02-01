"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TeamSetup() {
  const searchParams = useSearchParams();
  const numTeams = parseInt(searchParams.get("numTeams") || "1", 10);
  const roundTime = parseInt(searchParams.get("roundTime") || "30", 10);
  const categories = searchParams.get("categories")?.split(",") || [];
  const freeSkips = parseInt(searchParams.get("freeSkips") || "1", 10);
  const [teams, setTeams] = useState<string[]>([]);

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

  const router = useRouter();

  const handleStartGame = () => {
    console.log("Teams:", teams);
    // Navigate to the PreRound page for the first team
    const selectedCategories = categories.join(",");
    router.push(
      `/pre-round?teamIndex=0&roundTime=${roundTime}&categories=${selectedCategories}&freeSkips=${freeSkips}`
    );
  };

  return (
    <div>
      <h1>Team Setup</h1>
      {teams.map((team, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Team ${index + 1} Name`}
            value={team}
            onChange={(e) => updateTeamName(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
}
