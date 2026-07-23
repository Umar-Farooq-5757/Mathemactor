import React, { useState, useRef, useEffect } from "react";
import { BiTransferAlt } from "react-icons/bi";
import decimalToFraction from "../DecimalToFraction";
import TeX from "@matejmazur/react-katex";
import "katex/dist/katex.min.css";
import functionPlot from "function-plot";

const SimultaneousEquations = ({ isDark }) => {
  const [a1Input, setA1Input] = useState("");
  const [b1Input, setB1Input] = useState("");
  const [c1LhsInput, setC1LhsInput] = useState("");
  const [c1RhsInput, setC1RhsInput] = useState("");

  const [a2Input, setA2Input] = useState("");
  const [b2Input, setB2Input] = useState("");
  const [c2LhsInput, setC2LhsInput] = useState("");
  const [c2RhsInput, setC2RhsInput] = useState("");

  const [answerX, setAnswerX] = useState("___");
  const [answerY, setAnswerY] = useState("___");
  const [isFractionView, setIsFractionView] = useState(false);
  const [solution, setSolution] = useState([]);
  const [warning, setWarning] = useState("");

  const graphRef = useRef(null);
  const [fns, setFns] = useState([]);
  const [intersectionPoint, setIntersectionPoint] = useState(null);

  function clearInputs() {
    setA1Input("");
    setB1Input("");
    setC1LhsInput("");
    setC1RhsInput("");

    setA2Input("");
    setB2Input("");
    setC2LhsInput("");
    setC2RhsInput("");

    setAnswerX("___");
    setAnswerY("___");
    setIsFractionView(false);
    setSolution([]);
    setWarning("");
    setFns([]);
    setIntersectionPoint(null);
  }

  function showWarning(msg) {
    setWarning(msg);
    setTimeout(() => {
      setWarning("");
    }, 4000);
  }

  function calculateResult() {
    if (
      a1Input !== "" &&
      b1Input !== "" &&
      c1LhsInput !== "" &&
      c1RhsInput !== "" &&
      a2Input !== "" &&
      b2Input !== "" &&
      c2LhsInput !== "" &&
      c2RhsInput !== ""
    ) {
      const a1 = Number(a1Input);
      const b1 = Number(b1Input);
      const c1 = Number(c1RhsInput) - Number(c1LhsInput);

      const a2 = Number(a2Input);
      const b2 = Number(b2Input);
      const c2 = Number(c2RhsInput) - Number(c2LhsInput);

      const D = a1 * b2 - a2 * b1;
      const Dx = c1 * b2 - c2 * b1;
      const Dy = a1 * c2 - a2 * c1;

      if (D === 0) {
        if (Dx === 0 && Dy === 0) {
          showWarning("* Infinite solutions exist (lines are identical).");
        } else {
          showWarning("* No solution exists (lines are parallel).");
        }
        setAnswerX("N/A");
        setAnswerY("N/A");
        setFns([]);
        setIntersectionPoint(null);
        setSolution([]);
        return;
      }

      const xVal = Dx / D;
      const yVal = Dy / D;

      setIsFractionView(false);
      setAnswerX(xVal.toFixed(2));
      setAnswerY(yVal.toFixed(2));
      setIntersectionPoint([xVal, yVal]);

      const plotFns = [];
      if (b1 !== 0) plotFns.push(`(${c1} - ${a1}*x) / ${b1}`);
      if (b2 !== 0) plotFns.push(`(${c2} - ${a2}*x) / ${b2}`);
      setFns(plotFns);

      const block = String.raw`\begin{aligned}
        \text{System:} \quad &\begin{cases} ${a1}x + ${b1}y = ${c1} \\ ${a2}x + ${b2}y = ${c2} \end{cases} \\[10pt]
        D &= (${a1})(${b2}) - (${a2})(${b1}) = ${D} \\[4pt]
        D_x &= (${c1})(${b2}) - (${c2})(${b1}) = ${Dx} \\[4pt]
        D_y &= (${a1})(${c2}) - (${a2})(${c1}) = ${Dy} \\[10pt]
        x &= \frac{D_x}{D} = \frac{${Dx}}{${D}} = ${xVal.toFixed(2)} \\[6pt]
        y &= \frac{D_y}{D} = \frac{${Dy}}{${D}} = ${yVal.toFixed(2)}
      \end{aligned}`;

      setSolution([block]);
      setWarning("");
    } else {
      showWarning("* All values are required.");
    }
  }

  useEffect(() => {
    if (!graphRef.current || fns.length === 0) {
      if (graphRef.current) graphRef.current.innerHTML = "";
      return;
    }

    graphRef.current.innerHTML = "";

    const xCenter = intersectionPoint ? intersectionPoint[0] : 0;
    const yCenter = intersectionPoint ? intersectionPoint[1] : 0;

    const maxSpanX = Math.max(Math.abs(xCenter) * 2, 8);
    const maxSpanY = Math.max(Math.abs(yCenter) * 2, 8);

    const xDomain = [xCenter - maxSpanX, xCenter + maxSpanX];
    const yDomain = [yCenter - maxSpanY, yCenter + maxSpanY];

    const colors = ["#2563eb", "#059669"];

    try {
      const dataSeries = fns.map((fnStr, index) => ({
        fn: fnStr,
        color: colors[index % colors.length],
        graphType: "polyline",
      }));

      if (intersectionPoint) {
        dataSeries.push({
          points: [intersectionPoint],
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
  }, [fns, intersectionPoint]);

  function converter() {
    if (answerX !== "___" && answerX !== "N/A") {
      const a1 = Number(a1Input);
      const b1 = Number(b1Input);
      const c1 = Number(c1RhsInput) - Number(c1LhsInput);

      const a2 = Number(a2Input);
      const b2 = Number(b2Input);
      const c2 = Number(c2RhsInput) - Number(c2LhsInput);

      const D = a1 * b2 - a2 * b1;
      const xVal = (c1 * b2 - c2 * b1) / D;
      const yVal = (a1 * c2 - a2 * c1) / D;

      const formatVal = (val) => {
        if (!isFractionView) {
          const frac = decimalToFraction(val);
          if (frac && frac.denominator !== 1) {
            return `${frac.numerator}/${frac.denominator}`;
          }
        }
        return val.toFixed(2);
      };

      setAnswerX(formatVal(xVal));
      setAnswerY(formatVal(yVal));
      setIsFractionView(!isFractionView);
    }
  }

  return (
    <main
      id="simultaneous"
      className={`solver border border-gray-400 rounded-sm p-3 mt-3 min-h-80 ${
        isDark ? "bg-gray-800 text-white" : "bg-[#e7e7e7] text-black"
      }`}>
      <div className="flex justify-between items-center pr-3">
        <h1 className="text-sm font-bold mb-2">
          Enter coefficients for simultaneous equations:
        </h1>
        <button
          onClick={clearInputs}
          className="reset bg-[#00695C] cursor-pointer text-white font-bold py-1 px-2 rounded-sm">
          Reset
        </button>
      </div>

      {/* Equation 1 Inputs */}
      <p className="text-xs font-semibold text-gray-500 mt-2">Equation 1:</p>
      <div className="inputs flex items-center justify-start gap-2 my-2 flex-wrap">
        <div className="flex items-center justify-center">
          <input
            className="max-w-10 h-10 border px-1"
            value={a1Input}
            onChange={(e) => setA1Input(e.target.value)}
            type="number"
          />
          <span className="variable ml-1">x</span>
        </div>
        <span className="operator">+</span>
        <div className="flex items-center justify-center">
          <input
            className="max-w-10 h-10 border px-1"
            value={b1Input}
            onChange={(e) => setB1Input(e.target.value)}
            type="number"
          />
          <span className="variable ml-1">y</span>
        </div>
        <span className="operator">+</span>
        <input
          className="max-w-10 h-10 border px-1"
          value={c1LhsInput}
          onChange={(e) => setC1LhsInput(e.target.value)}
          type="number"
        />
        <span className="operator">=</span>
        <input
          className="max-w-10 h-10 border px-1"
          value={c1RhsInput}
          onChange={(e) => setC1RhsInput(e.target.value)}
          type="number"
        />
      </div>

      {/* Equation 2 Inputs */}
      <p className="text-xs font-semibold text-gray-500 mt-2">Equation 2:</p>
      <div className="inputs flex items-center justify-start gap-2 my-2 flex-wrap">
        <div className="flex items-center justify-center">
          <input
            className="max-w-10 h-10 border px-1"
            value={a2Input}
            onChange={(e) => setA2Input(e.target.value)}
            type="number"
          />
          <span className="variable ml-1">x</span>
        </div>
        <span className="operator">+</span>
        <div className="flex items-center justify-center">
          <input
            className="max-w-10 h-10 border px-1"
            value={b2Input}
            onChange={(e) => setB2Input(e.target.value)}
            type="number"
          />
          <span className="variable ml-1">y</span>
        </div>
        <span className="operator">+</span>
        <input
          className="max-w-10 h-10 border px-1"
          value={c2LhsInput}
          onChange={(e) => setC2LhsInput(e.target.value)}
          type="number"
        />
        <span className="operator">=</span>
        <input
          className="max-w-10 h-10 border px-1"
          value={c2RhsInput}
          onChange={(e) => setC2RhsInput(e.target.value)}
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

      {answerX !== "___" && solution.length > 0 && (
        <div className="overflow-y-auto">
          <h2 className="font-bold text-lg">Solution Steps:</h2>
          <div>
            {solution.map((equationBlock, idx) => (
              <div key={idx} style={{ margin: "20px 0", fontSize: "1.1rem" }}>
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
            <b>x</b> = <span className="answer1">{answerX}</span>
          </div>
          <div className="text-2xl">
            <b>y</b> = <span className="answer2">{answerY}</span>
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

export default SimultaneousEquations;
