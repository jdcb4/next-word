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
  incrementRoundIfNeeded: () => void;
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
  const [currentRound, setCurrentRound] = useState(0);

  const addCorrectWord = (word: string) => {
    setCorrectWords((prev) => [...prev, word]);
    setScore((prev) => prev + 1);
  };

  const addSkippedWord = (word: string) => {
    setSkippedWords((prev) => [...prev, word]);
    setScore((prev) => prev - 1);
  };

  const nextTeam = useCallback(() => {
    setTeamScores((prev) => {
      const newScores = [...prev];
      newScores[currentTeamIndex] += score;
      return newScores;
    });
    setScore(0);
    setCorrectWords([]);
    setSkippedWords([]);
    setCurrentTeamIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex >= numTeams) {
        return 0;
      }
      return newIndex;
    });
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
    setCurrentRound(0);
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

  const incrementRoundIfNeeded = useCallback(() => {
    if (currentTeamIndex === 0) {
      setCurrentRound((prevRound) => prevRound + 1);
    }
  }, [currentTeamIndex]);

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
        incrementRoundIfNeeded,
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
