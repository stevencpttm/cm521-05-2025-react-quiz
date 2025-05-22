import { useState } from "react";
import "./App.css";

function App() {
  const [topics, setTopics] = useState([
    {
      question: "JavaScript 與 Java 有什麼關係？",
      answers: [
        {
          value: "同公司的產品",
          correct: false,
        },
        {
          value: "新版與舊版的關係",
          correct: false,
        },
        {
          value: "一點關係也沒有",
          correct: true,
        },
        {
          value: "JavaScript 是 Java 的 Web 版本",
          correct: false,
        },
      ],
    },
    {
      question: "發明 React JS 的公司是？",
      answers: [
        {
          value: "Google",
          correct: false,
        },
        {
          value: "Facebook",
          correct: true,
        },
        {
          value: "Apple",
          correct: false,
        },
        {
          value: "Microsoft",
          correct: false,
        },
      ],
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [corrects, setCorrects] = useState(0);
  const [buttonClasses, setButtonClasses] = useState(["", "", "", ""]);

  const next = (index) => {
    const question = topics[currentIndex];
    const answered = question.answers[index];

    if (answered.correct) {
      // corrects +1
      setCorrects(corrects + 1);
    }

    // find the correct index
    const correctIndex = question.answers.findIndex((answer) => answer.correct);
    highlightButton(index, correctIndex);

    // switch to next question after 1 second
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setButtonClasses(new Array(4).fill(""));
    }, 1000);
  };

  const highlightButton = (selectedIndex, correctIndex) => {
    const classes = new Array(4).fill("");

    if (selectedIndex === correctIndex) {
      classes[selectedIndex] = "correct";
    } else {
      classes[selectedIndex] = "wrong";
      classes[correctIndex] = "correct";
    }

    setButtonClasses(classes);
  };

  const startOver = () => {
    setCurrentIndex(0);
    setCorrects(0);
    setButtonClasses(new Array(4).fill(""));
  };

  const topic = topics[currentIndex];

  return (
    <div className="App">
      <div
        className="statusBar"
        style={{
          width: `${(currentIndex / topics.length) * 100}%`,
        }}
      ></div>

      {typeof topic !== "undefined" ? (
        <div className="topics-container">
          <h2>{topic.question}</h2>

          {topic.answers.map((answer, index) => {
            return (
              <button
                className={buttonClasses[index]}
                key={index}
                onClick={() => next(index)}
              >
                {answer.value}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="fireworks">
          <div className="before"></div>
          <div className="after"></div>
          <div className="result">
            <h2>Completed!</h2>
            <h3>Your score: {Math.round((corrects / topics.length) * 100)}</h3>
            <button onClick={startOver}>Start Over</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
