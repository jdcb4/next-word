import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface GameContextType {
  correctWords: string[];
  skippedWords: string[];
  score: number;
  teamScores: number[];
  teamNames: string[];
  currentTeamIndex: number;
  numTeams: number;
  roundTime: number;
  categories: string[];
  freeSkips: number;
  currentCategory: string;
  currentWord: string;
  numRounds: number;
  currentRound: number;
  addCorrectWord: (word: string) => void;
  addSkippedWord: (word: string) => void;
  nextTeam: () => void;
  resetGame: () => void;
  setTeamNames: (names: string[]) => void;
  setGameSetup: (
    numTeams: number,
    roundTime: number,
    categories: string[],
    freeSkips: number,
    numRounds: number
  ) => void;
  setCurrentCategoryAndWord: (category: string, word: string) => void;
  updateTeamScore: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [skippedWords, setSkippedWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [teamScores, setTeamScores] = useState<number[]>([0, 0, 0, 0]); // Assuming 4 teams
  const [teamNames, setTeamNames] = useState<string[]>([
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
  ]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [numTeams, setNumTeams] = useState(1);
  const [roundTime, setRoundTime] = useState(30);
  const [categories, setCategories] = useState<string[]>([]);
  const [freeSkips, setFreeSkips] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [numRounds, setNumRounds] = useState(3);
  const [currentRound, setCurrentRound] = useState(1);
  const [skipsUsedCurrentTurn, setSkipsUsedCurrentTurn] = useState(0);

  const addCorrectWord = (word: string) => {
    setCorrectWords((prev) => [...prev, word]);
    setScore((prev) => prev + 1);
  };

  const addSkippedWord = (word: string) => {
    setSkippedWords((prev) => [...prev, word]);
    if (skipsUsedCurrentTurn >= freeSkips) {
      setScore((prev) => prev - 1);
    }
    setSkipsUsedCurrentTurn((prev) => prev + 1);
  };

  const nextTeam = useCallback(() => {
    setCurrentRound((prevRound) => {
      const newRound = prevRound + 1;
      if (currentTeamIndex === numTeams - 1) {
        return newRound;
      } else {
        return prevRound;
      }
    });

    setCurrentTeamIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (currentTeamIndex >= numTeams - 1) {
        return 0;
      } else {
        return newIndex;
      }
    });

    setScore(0);
    setCorrectWords([]);
    setSkippedWords([]);
    setSkipsUsedCurrentTurn(0);
  }, [currentTeamIndex, numTeams, score]);

  const resetGame = () => {
    setCorrectWords([]);
    setSkippedWords([]);
    setScore(0);
    setTeamScores([0, 0, 0, 0]);
    setTeamNames(["Team 1", "Team 2", "Team 3", "Team 4"]);
    setCurrentTeamIndex(0);
    setNumTeams(1);
    setRoundTime(30);
    setCategories([]);
    setFreeSkips(1);
    setCurrentCategory("");
    setCurrentWord("");
    setNumRounds(3);
    setCurrentRound(1); // match initial useState
  };

  const setGameSetup = (
    numTeams: number,
    roundTime: number,
    categories: string[],
    freeSkips: number,
    numRounds: number
  ) => {
    setNumTeams(numTeams);
    setRoundTime(roundTime);
    setCategories(categories);
    setFreeSkips(freeSkips);
    setNumRounds(numRounds);
  };

  const setCurrentCategoryAndWord = (category: string, word: string) => {
    setCurrentCategory(category);
    setCurrentWord(word);
  };

  const updateTeamScore = useCallback(() => {
    setTeamScores((prev) => {
      const newScores = [...prev];
      newScores[currentTeamIndex] += score;
      return newScores;
    });
  }, [currentTeamIndex, score]);

  return (
    <GameContext.Provider
      value={{
        correctWords,
        skippedWords,
        score,
        teamScores,
        teamNames,
        currentTeamIndex,
        numTeams,
        roundTime,
        categories,
        freeSkips,
        currentCategory,
        currentWord,
        numRounds,
        currentRound,
        addCorrectWord,
        addSkippedWord,
        nextTeam,
        resetGame,
        setTeamNames,
        setGameSetup,
        setCurrentCategoryAndWord,
        updateTeamScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
