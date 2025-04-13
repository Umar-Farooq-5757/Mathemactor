import React from "react";
import { useRef } from "react";
import { BiTransferAlt } from "react-icons/bi";
import decimalToFraction from "../DecimalToFraction";

const SquaredBinomial = ({ isDark }) => {
  // VARIABLES INITAILIZATION
  const a = useRef();
  const b = useRef();
  const answer = useRef();
  const warning = useRef();
  function clearInputs() {
    a.current.value = "";
    b.current.value = "";
    answer.current.innerText = "____";
  }

  // CALCULATING THE RESULT
  function calculateResult() {
    if (a.current.value && b.current.value) {
      // let result =
      //   a.current.value ** 2 +
      //   b.current.value ** 2 +
      //   2 * a.current.value * b.current.value;
      let result = (Number(a.current.value) + Number(b.current.value)) ** 2;

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
    if (a.current.value && b.current.value) {
      let result =
        a.current.value ** 2 +
        b.current.value ** 2 +
        2 * a.current.value * b.current.value;
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
      id="squaredBinomial"
      className={`solver border border-gray-400 rounded-sm p-3 mt-3 min-h-80 ${
        isDark ? "bg-gray-800 text-white" : "bg-[#e7e7e7]: text-black"
      }`}
    >
      <div className="flex justify-between items-center pr-3">
        <h1 className="text-sm font-bold mb-2">
          Enter the values of variables:
        </h1>
        <button
          onClick={clearInputs}
          className="reset bg-[#00695C] cursor-pointer text-white font-bold py-1 px-2 rounded-sm"
        >
          Reset
        </button>
      </div>
      <div className="inputs flex items-center justify-start gap-3 my-3">
        <span style={{ fontSize: "38px", fontWeight: "bold" }}>(</span>
        <input ref={a} type="number" />
        <span
          style={{ fontSize: "38px", fontWeight: "bold" }}
          className="operator"
        >
          +
        </span>
        <input ref={b} type="number" />
        <span style={{ fontSize: "38px", fontWeight: "bold" }}>)</span>
        <sup style={{ fontSize: "24px", fontWeight: "bold" }}>2</sup>
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
            <b>
              (a + b)<sup>2</sup>
            </b>{" "}
            ={" "}
            <span ref={answer} className="answer1">
              ____
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

export default SquaredBinomial;
