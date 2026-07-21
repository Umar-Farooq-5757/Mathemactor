import React, { useState, useRef } from "react";
import { BiTransferAlt } from "react-icons/bi";
import decimalToFraction from "../DecimalToFraction";
import TeX from "@matejmazur/react-katex";
import "katex/dist/katex.min.css";

const LinearEquation = ({ isDark }) => {
  const [linearTermInput, setLinearTermInput] = useState("");
  const [constantTermInputOnLHS, setConstantTermInputOnLHS] = useState("");
  const [constantTermInputOnRHS, setConstantTermInputOnRHS] = useState("");
  const [answer, setAnswer] = useState("___");
  const [isFractionView, setIsFractionView] = useState(false);
  const [solution, setSolution] = useState([]);
  const warning = useRef();

  function clearInputs() {
    setLinearTermInput("");
    setConstantTermInputOnLHS("");
    setConstantTermInputOnRHS("");
    setAnswer("___");
    setIsFractionView(false);
  }

  function calculateResult() {
    if (linearTermInput && constantTermInputOnLHS && constantTermInputOnRHS) {
      const linear = Number(linearTermInput);
      const lhs = Number(constantTermInputOnLHS);
      const rhs = Number(constantTermInputOnRHS);

      if (linear === 0) return;

      const result = (rhs - lhs) / linear;

      setIsFractionView(false);
      setAnswer(result.toFixed(2));

      setSolution(() => {
        const sumConstant = rhs - lhs;
        const step1 = `${linear}x ${lhs < 0 ? "-" : "+"} ${Math.abs(lhs)} &= ${rhs}`;
        const step2 = `${linear}x &= ${rhs} ${lhs < 0 ? "+" : "-"} ${Math.abs(lhs)}`;
        const step3 = `${linear}x &= ${sumConstant}`;
        const step4 = `x &= \\frac{${sumConstant}}{${linear}}`;
        const step5 = `x &= ${result.toFixed(2)}`;

        const fullEquationBlock = String.raw`\begin{aligned}
          ${step1} \\
          ${step2} \\
          ${step3} \\
          ${step4} \\
          ${step5}
        \end{aligned}`;
        return [fullEquationBlock];
      });
    } else {
      if (warning.current) {
        warning.current.style.display = "inline-block";
        setTimeout(() => {
          if (warning.current) warning.current.style.display = "none";
        }, 3000);
      }
    }
  }

  // TOGGLE BETWEEN DECIMAL AND FRACTION
  function converter() {
    if (linearTermInput && constantTermInputOnLHS && constantTermInputOnRHS) {
      const linear = Number(linearTermInput);
      const lhs = Number(constantTermInputOnLHS);
      const rhs = Number(constantTermInputOnRHS);
      const result = (rhs - lhs) / linear;

      if (!isFractionView) {
        const frac = decimalToFraction(result.toFixed(2));
        if (frac && frac.denominator !== 1) {
          setAnswer(`${frac.numerator}/${frac.denominator}`);
        } else {
          setAnswer(result.toFixed(2));
        }
        setIsFractionView(true);
      } else {
        setAnswer(result.toFixed(2));
        setIsFractionView(false);
      }
    }
  }

  return (
    <main
      id="linear"
      className={`solver border border-gray-400 rounded-sm p-3 mt-3 min-h-80 ${
        isDark ? "bg-gray-800 text-white" : "bg-[#e7e7e7] text-black"
      }`}>
      <div className="flex justify-between items-center pr-3">
        <h1 className="text-sm font-bold mb-2">
          Enter the coefficients of linear equation:
        </h1>
        <button
          onClick={clearInputs}
          className="reset bg-[#00695C] cursor-pointer text-white font-bold py-1 px-2 rounded-sm">
          Reset
        </button>
      </div>

      <div className="inputs flex items-center justify-start gap-3 my-3">
        <div className="flex items-center justify-center">
          <input
            className="max-w-10 h-10 border px-1"
            value={linearTermInput}
            onChange={(e) => setLinearTermInput(e.target.value)}
            type="number"
          />
          <span className="variable">x</span>
        </div>
        <span className="operator">+</span>
        <input
          className="max-w-10 h-10 border px-1"
          value={constantTermInputOnLHS}
          onChange={(e) => setConstantTermInputOnLHS(e.target.value)}
          type="number"
        />
        <span className="operator">=</span>
        <input
          className="max-w-10 h-10 border px-1"
          value={constantTermInputOnRHS}
          onChange={(e) => setConstantTermInputOnRHS(e.target.value)}
          type="number"
        />
      </div>

      <div className="relative">
        <p
          ref={warning}
          className="warning absolute -top-2 text-sm text-red-600 hidden">
          * All values are required.
        </p>
        <button
          onClick={calculateResult}
          className="calculate bg-[#00695C] cursor-pointer text-white font-bold py-0.75 px-2 w-full my-3 rounded-sm">
          Calculate
        </button>
      </div>

      {answer !== "___" && (
        <div>
          <h2 className="font-bold text-lg">Solution:</h2>
          <div>
            {solution.map((equationBlock, idx) => (
              <div key={idx} style={{ margin: "20px 0", fontSize: "1.2rem" }}>
                <TeX block math={equationBlock} />
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="flex items-center justify-between pr-4">
        <div className="result text-lg overflow-hidden">
          <h2 className="font-bold text-lg mb-1">Result:</h2>
          <div className="text-2xl">
            <b>x</b> = <span className="answer1">{answer}</span>
          </div>
        </div>
        <button
          onClick={converter}
          className="bg-[#00695C] flex items-center justify-between gap-1 cursor-pointer text-white font-bold py-1 px-2 rounded-sm">
          S <BiTransferAlt /> D
        </button>
      </section>
    </main>
  );
};

export default LinearEquation;
