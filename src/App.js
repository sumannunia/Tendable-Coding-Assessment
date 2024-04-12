import React, { useState, useEffect } from "react";
import { QUESTIONS } from "./questions";

// Mocking a function to simulate async data fetching and saving
const usePersistentState = (initialValue) => {
  const [value, setValue] = useState(() => {
    // date fetching from local storage
    const storedValue =
      JSON.parse(localStorage.getItem("scoreData")) || initialValue;
    return storedValue;
  });

  useEffect(() => {
    // setting data to local storage
    localStorage.setItem("scoreData", JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [allScores, setAllScores] = usePersistentState([]);
  const getAvgScore = () => {
    const newScores = [...allScores];

    const x =
      allScores.length > 0
        ? parseInt(newScores.reduce((a, b) => a + b, 0) / newScores.length)
        : 0;

    return x;
  };
  const handleAnswer = (answer) => {
    if (answer === "yes") {
      setYesCount(yesCount + 1);
    }
    if (currentQuestionIndex < Object.keys(QUESTIONS).length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const score = ((yesCount + 1) / Object.keys(QUESTIONS).length) * 100;
      const newScores = [...allScores, score];
      setAllScores(newScores);

      // Reset for next run
      setCurrentQuestionIndex(0);
      setYesCount(0);
    }
  };

  return (
    <div className="main__wrap">
      <main className="container">
        <p>TODO</p>
        <h1>
          Score:{" "}
          {yesCount === 4
            ? ((yesCount + 1) / Object.keys(QUESTIONS).length) * 100
            : (yesCount / Object.keys(QUESTIONS).length) * 100}
        </h1>
        <h1>Average Score: {getAvgScore()}</h1>
        {QUESTIONS[currentQuestionIndex + 1] && (
          <div>
            <p>{QUESTIONS[currentQuestionIndex + 1]}</p>
            <button onClick={() => handleAnswer("yes")}>Yes</button>
            <button onClick={() => handleAnswer("no")}>No</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
