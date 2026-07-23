import React, { useState, useRef, useEffect } from "react";
import { BiTransferAlt } from "react-icons/bi";
import decimalToFraction from "../DecimalToFraction";
import TeX from "@matejmazur/react-katex";
import "katex/dist/katex.min.css";
import functionPlot from "function-plot";

const LinearEquation = ({ isDark }) => {
  const [linearTermInput, setLinearTermInput] = useState("");
  const [constantTermInputOnLHS, setConstantTermInputOnLHS] = useState("");
  const [constantTermInputOnRHS, setConstantTermInputOnRHS] = useState("");
  const [answer, setAnswer] = useState("___");
  const [isFractionView, setIsFractionView] = useState(false);
  const [solution, setSolution] = useState([]);
  const [warning, setWarning] = useState("");
  const graphRef = useRef(null);
  const [fn, setFn] = useState("");
  const [root, setRoot] = useState(null);

  function clearInputs() {
    setLinearTermInput("");
    setConstantTermInputOnLHS("");
    setConstantTermInputOnRHS("");
    setAnswer("___");
    setIsFractionView(false);
    setSolution([]);
    setFn("");
    setRoot(null);
    setWarning("");
  }

  function showWarning(msg) {
    setWarning(msg);
    setTimeout(() => {
      setWarning("");
    }, 4000);
  }

  function calculateResult() {
    if (linearTermInput !== "" && constantTermInputOnLHS !== "" && constantTermInputOnRHS !== "") {
      const linear = Number(linearTermInput);
      const lhs = Number(constantTermInputOnLHS);
      const rhs = Number(constantTermInputOnRHS);

      if (linear === 0) {
        showWarning("* 'x' coefficient cannot be zero.");
        return;
      }

      setFn(`${linear}*x + ${lhs - rhs}`);
      const result = (rhs - lhs) / linear;
      setRoot([result, 0]);

      setIsFractionView(false);
      setAnswer(result.toFixed(2));

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

      setSolution([fullEquationBlock]);
      setWarning("");
    } else {
      showWarning("* All values are required.");
    }
  }

  useEffect(() => {
  if (!graphRef.current || !fn) {
    if (graphRef.current) graphRef.current.innerHTML = "";
    return;
  }

  graphRef.current.innerHTML = "";

  const linear = Number(linearTermInput);
  const lhs = Number(constantTermInputOnLHS);
  const rhs = Number(constantTermInputOnRHS);

  const xIntercept = (rhs - lhs) / linear;
  const yIntercept = lhs - rhs;

  const maxAbsX = Math.max(Math.abs(xIntercept) * 1.5, 6);
  const maxAbsY = Math.max(Math.abs(yIntercept) * 1.5, Math.abs(xIntercept * linear) * 1.5, 6);

  const xDomain = [-maxAbsX, maxAbsX];
  const yDomain = [-maxAbsY, maxAbsY];

  try {
    const dataSeries = [
      {
        fn: fn,
        color: "#2563eb",
        graphType: "polyline",
      },
    ];

    if (root) {
      dataSeries.push({
        points: [root],
        fnType: "points",
        graphType: "scatter",
        color: "#dc2626",
        attr: { r: 6 },
      });
    }

    functionPlot({
      target: graphRef.current,
      width: 470,
      height: 400,
      grid: true,
      xAxis: { domain: xDomain },
      yAxis: { domain: yDomain },
      data: dataSeries,
    });
  } catch (err) {
    console.error("Invalid math function string:", err);
  }
}, [fn, root, linearTermInput, constantTermInputOnLHS, constantTermInputOnRHS]);

  function converter() {
    if (linearTermInput && constantTermInputOnLHS && constantTermInputOnRHS) {
      const linear = Number(linearTermInput);
      const lhs = Number(constantTermInputOnLHS);
      const rhs = Number(constantTermInputOnRHS);
      const result = (rhs - lhs) / linear;

      if (!isFractionView) {
        const frac = decimalToFraction(result); // Pass raw result for accurate fraction matching
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
          <span className="variable ml-1">x</span>
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

      <div className="relative pt-2">
        {warning && (
          <p className="warning absolute -top-2 text-sm text-red-600 font-medium">
            {warning}
          </p>
        )}
        <button
          onClick={calculateResult}
          className="calculate bg-[#00695C] cursor-pointer text-white font-bold py-1 px-2 w-full my-3 rounded-sm">
          Calculate
        </button>
      </div>

      {answer !== "___" && (
        <div className="overflow-y-auto">
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

      <section className="flex items-center justify-between pr-4 mt-4">
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
      <div ref={graphRef} className="mt-4 flex justify-center"></div>
    </main>
  );
};

export default LinearEquation;