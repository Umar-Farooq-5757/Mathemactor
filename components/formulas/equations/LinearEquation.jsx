import React from "react";
import { useRef } from "react";
import { BiTransferAlt } from "react-icons/bi";
import decimalToFraction from "../DecimalToFraction";

const LinearEquation = ({ isDark }) => {
  // VARIABLES INITAILIZATION
  const linearTermInput = useRef();
  const constantTermInputOnLHS = useRef();
  const constantTermInputOnRHS = useRef();
  const answer = useRef();
  const warning = useRef();
  function clearInputs() {
    linearTermInput.current.value = "";
    constantTermInputOnLHS.current.value = "";
    constantTermInputOnRHS.current.value = "";
    answer.current.innerText = "___";
  }

  // CALCULATING THE RESULT
  function calculateResult() {
    if (
      linearTermInput.current.value &&
      constantTermInputOnLHS.current.value &&
      constantTermInputOnRHS.current.value
    ) {
      let result =
        (constantTermInputOnRHS.current.value -
          constantTermInputOnLHS.current.value) /
        linearTermInput.current.value;
      answer.current.innerText = (
        decimalToFraction(result.toFixed(2)).numerator /
        decimalToFraction(result.toFixed(2)).denominator
      ).toFixed(2);
      // console.log(decimalToFraction(result.toFixed(2)).numerator)
      // console.log(decimalToFraction(result.toFixed(2)).denominator)
    } else {
      warning.current.style.display = "inline-block";
      setTimeout(() => {
        warning.current.style.display = "none";
      }, 3000);
    }
  }

  // CONVERTING FROM DECIMAL TO FRACTION AND VICE VERSA
  function converter() {
    if (
      linearTermInput.current.value &&
      constantTermInputOnLHS.current.value &&
      constantTermInputOnRHS.current.value
    ) {
      let result =
        (constantTermInputOnRHS.current.value -
          constantTermInputOnLHS.current.value) /
        linearTermInput.current.value;
      if (answer.current.innerText.includes(".")) {
        answer.current.innerText = `${
          decimalToFraction(result.toFixed(2)).numerator
        }/${decimalToFraction(result.toFixed(2)).denominator}`;
      } else {
        answer.current.innerText =
          decimalToFraction(result.toFixed(2)).numerator /
          decimalToFraction(result.toFixed(2)).denominator;
      }
    }
  }
  return (
    // <main className="bg-[#DDECF8] solver border border-gray-400 rounded-sm p-3 mt-3 min-h-80">
    <main
      id="linear"
      className={`solver border border-gray-400 rounded-sm p-3 mt-3 min-h-80 ${
        isDark ? "bg-gray-800 text-white" : "bg-[#e7e7e7]: text-black"
      }`}
    >
      <div className="flex justify-between items-center pr-3">
        <h1 className="text-sm font-bold mb-2">
          Enter the coefficients of linear equation:
        </h1>
        <button
          onClick={clearInputs}
          className="reset bg-[#00695C] cursor-pointer text-white font-bold py-1 px-2 rounded-sm"
        >
          Reset
        </button>
      </div>
      <div className="inputs flex items-center justify-start gap-3 my-3">
        <div className="flex items-center justify-center">
          <input
            className="max-w-10 h-10"
            ref={linearTermInput}
            type="number"
          />
          <span className="variable">x</span>
        </div>
        <span className="operator">+</span>{" "}
        <input
          className="max-w-10 h-10"
          ref={constantTermInputOnLHS}
          type="number"
        />
        <span className="operator">=</span>
        <input
          className="max-w-10 h-10"
          ref={constantTermInputOnRHS}
          type="number"
        />
      </div>
      <div className="relative">
        <p
          ref={warning}
          className="warning absolute -top-2 text-sm text-red-600 hidden"
        >
          * All values are required.
        </p>
        <button
          onClick={calculateResult}
          className="calculate bg-[#00695C] cursor-pointer text-white font-bold py-[3px] px-2 w-[100%] my-3 rounded-sm"
        >
          Calculate
        </button>
      </div>
      <section className="flex items-center justify-between pr-4">
        <div className="result text-lg overflow-hidden">
          <h2 className="font-bold text-lg mb-1">Result:</h2>
          <div className="text-2xl">
            <b>x</b> ={" "}
            <span ref={answer} className="answer1">
              ___
            </span>
          </div>
        </div>
        <button
          onClick={converter}
          className="bg-[#00695C] flex items-center justify-between gap-1 cursor-pointer text-white font-bold py-1 px-2 rounded-sm"
        >
          S <BiTransferAlt /> D
        </button>
      </section>
    </main>
  );
};

export default LinearEquation;
