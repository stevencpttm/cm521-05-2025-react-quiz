import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    topics: [
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
    ],
    currentIndex: 0,
    corrects: 0,
    buttonClasses: ["", "", "", ""],
  };

  answer = (index) => {
    const question = this.state.topics[this.state.currentIndex];
    const answered = question.answers[index];

    if (answered.correct) {
      // corrects +1
      this.setState({
        corrects: this.state.corrects + 1,
      });
    }

    // find the correct index
    const correctIndex = question.answers.findIndex((answer) => answer.correct);
    this.highlightButton(index, correctIndex);

    // switch to next question after 1 second
    setTimeout(() => {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        buttonClasses: new Array(4).fill(""),
      });
    }, 1000);
  };

  highlightButton = (selectedIndex, correctIndex) => {
    const classes = new Array(4).fill("");

    if (selectedIndex === correctIndex) {
      classes[selectedIndex] = "correct";
    } else {
      classes[selectedIndex] = "wrong";
      classes[correctIndex] = "correct";
    }

    this.setState({
      buttonClasses: classes,
    });
  };

  startOver = () => {
    this.setState({
      currentIndex: 0,
      corrects: 0,
      buttonClasses: new Array(4).fill(""),
    });
  };

  render() {
    const topic = this.state.topics[this.state.currentIndex];

    return (
      <div className="App">
        <div
          className="statusBar"
          style={{
            width: `${
              (this.state.currentIndex / this.state.topics.length) * 100
            }%`,
          }}
        ></div>

        {typeof topic !== "undefined" ? (
          <div className="topics-container">
            <h2>{topic.question}</h2>

            {topic.answers.map((answer, index) => {
              return (
                <button
                  className={this.state.buttonClasses[index]}
                  key={index}
                  onClick={() => this.answer(index)}
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
              <h3>
                Your score:{" "}
                {Math.round(
                  (this.state.corrects / this.state.topics.length) * 100
                )}
              </h3>
              <button onClick={this.startOver}>Start Over</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
