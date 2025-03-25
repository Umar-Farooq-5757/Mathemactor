import React, { useState, useRef, createElement } from "react";

const MiniGame = () => {
  // VARIABLES INITAILIZATION
  const [no1, setNo1] = useState(Math.round(Math.random() * 10));
  const [no2, setNo2] = useState(Math.round(Math.random() * 10));
  const [answer, setAnswer] = useState(no1 * no2);

  const [noOfRightAnswers, setNoOfRightAnswers] = useState(0);
  const inputBox = useRef();
  const correctAnswerBox = useRef();
  const wrongAnswerBox = useRef();

  const createNewQuestion = () => {
    const newNo1 = Math.round(Math.random() * 10);
    const newNo2 = Math.round(Math.random() * 10);
    setNo1(newNo1);
    setNo2(newNo2);
    setAnswer(newNo1 * newNo2);
    inputBox.current.value = "";
    inputBox.current.focus();
  };

  const checkAnswer = () => {
    if (inputBox.current.value) {
      if (inputBox.current.value == answer) {
        setNoOfRightAnswers(noOfRightAnswers + 1);
        correctAnswerBox.current.style.display = "block";
        wrongAnswerBox.current.style.display = "none";
        createNewQuestion();
      } else {
        wrongAnswerBox.current.style.display = "block";
        correctAnswerBox.current.style.display = "none";
        createNewQuestion();
      }
    }
  };
  return (
    <main className="bg-slate-800 min-h-[100vh] text-white flex flex-col items-center justify-center gap-10">
      <h1 className="uppercase text-md sm:text-3xl">
        You've gotten{" "}
        <span className="rightAnswers text-red-500 font-bold">
          {noOfRightAnswers}
        </span>{" "}
        answers right
      </h1>
      <section>
        <div
          className="result bg-green-800 p-2 px-6 sm:p-3 sm:px-12 rounded-md text-xl sm:text-3xl hidden"
          ref={correctAnswerBox}
        >
          Correct!
        </div>
        <div
          className="result bg-red-800 p-2 px-6 sm:p-3 sm:px-12 rounded-md text-xl sm:text-3xl hidden"
          ref={wrongAnswerBox}
        >
          Wrong!
        </div>
      </section>
      <section className="input text-3xl">
        {no1} &times; {no2} ={" "}
        <input
          ref={inputBox}
          className="outline-none border-none border-b-4 min-w-28 min-h-10"
          type="number"
        />
      </section>
      <div
        onClick={checkAnswer}
        className="check select-none border py-2 px-10 sm:py-4 sm:px-24 text-lg sm:text-2xl cursor-pointer text-blue-500 font-bold rounded-tl-full rounded-br-full hover:rounded-tr-full hover:rounded-bl-full hover:rounded-tl-none hover:rounded-br-none transition-all duration-300"
      >
        Check Your Answer
      </div>
    </main>
  );
};

export default MiniGame;
