import React, { useRef, useState, useEffect } from "react";
import { BiTransferAlt } from "react-icons/bi";
import decimalToFraction from "../DecimalToFraction";
import TeX from "@matejmazur/react-katex";
import "katex/dist/katex.min.css";
import functionPlot from "function-plot";

const QuadraticEquation = ({ isDark }) => {
  const [quadraticTermInput, setQuadraticTermInput] = useState("");
  const [linearTermInput, setLinearTermInput] = useState("");
  const [constantTermInputOnLHS, setConstantTermInputOnLHS] = useState("");
  const [constantTermInputOnRHS, setConstantTermInputOnRHS] = useState("");
  const [answer1, setAnswer1] = useState("___");
  const [answer2, setAnswer2] = useState("___");
  const [isFractionView, setIsFractionView] = useState(false);
  const [solution1, setSolution1] = useState([]);
  const [solution2, setSolution2] = useState([]);
  const [warningMsg, setWarningMsg] = useState("");

  const graphRef = useRef(null);
  const [fn, setFn] = useState("");
  const [roots, setRoots] = useState([]);

  function clearInputs() {
    setQuadraticTermInput("");
    setLinearTermInput("");
    setConstantTermInputOnLHS("");
    setConstantTermInputOnRHS("");
    setAnswer1("___");
    setAnswer2("___");
    setSolution1([]);
    setSolution2([]);
    setIsFractionView(false);
    setWarningMsg("");
    setFn("");
    setRoots([]);
  }

  function showWarning(msg) {
    setWarningMsg(msg);
    setTimeout(() => {
      setWarningMsg("");
    }, 4000);
  }

  function calculateResult() {
    if (
      quadraticTermInput !== "" &&
      linearTermInput !== "" &&
      constantTermInputOnLHS !== "" &&
      constantTermInputOnRHS !== ""
    ) {
      let a = Number(quadraticTermInput);
      let b = Number(linearTermInput);
      let lhs = Number(constantTermInputOnLHS);
      let rhs = Number(constantTermInputOnRHS);
      let c = lhs - rhs;

      if (a === 0) {
        showWarning("* Coefficient 'a' cannot be 0 in a quadratic equation.");
        return;
      }

      let discriminant = b * b - 4 * a * c;
      if (discriminant < 0) {
        showWarning("* Imaginary roots are not supported yet.");
        setFn("");
        setRoots([]);
        return;
      }

      let sqrtDisc = Math.sqrt(discriminant);
      let result1 = (-b + sqrtDisc) / (2 * a);
      let result2 = (-b - sqrtDisc) / (2 * a);

      setIsFractionView(false);
      setAnswer1(result1.toFixed(2));
      setAnswer2(result2.toFixed(2));

      const fnString = `${a}*x^2 + ${b}*x + ${c}`;
      setFn(fnString);

      if (result1 === result2) {
        setRoots([[result1, 0]]);
      } else {
        setRoots([
          [result1, 0],
          [result2, 0],
        ]);
      }

      const step1_1 = `x_1 &= \\frac{-(${b}) + \\sqrt{(${b})^2 - 4(${a})(${c})}}{2(${a})}`;
      const step1_2 = `x_1 &= \\frac{-${b} + \\sqrt{${b * b} - (${4 * a * c})}}{${2 * a}}`;
      const step1_3 = `x_1 &= \\frac{-${b} + \\sqrt{${discriminant}}}{${2 * a}}`;
      const step1_4 = `x_1 &= \\frac{-${b} + ${sqrtDisc.toFixed(2)}}{${2 * a}}`;
      const step1_5 = `x_1 &= \\frac{${(-b + sqrtDisc).toFixed(2)}}{${2 * a}}`;
      const step1_6 = `x_1 &= ${result1.toFixed(2)}`;

      const fullBlock1 = String.raw`\begin{aligned}
        ${step1_1} \\
        ${step1_2} \\
        ${step1_3} \\
        ${step1_4} \\
        ${step1_5} \\
        ${step1_6}
      \end{aligned}`;

      const step2_1 = `x_2 &= \\frac{-(${b}) - \\sqrt{(${b})^2 - 4(${a})(${c})}}{2(${a})}`;
      const step2_2 = `x_2 &= \\frac{-${b} - \\sqrt{${b * b} - (${4 * a * c})}}{${2 * a}}`;
      const step2_3 = `x_2 &= \\frac{-${b} - \\sqrt{${discriminant}}}{${2 * a}}`;
      const step2_4 = `x_2 &= \\frac{-${b} - ${sqrtDisc.toFixed(2)}}{${2 * a}}`;
      const step2_5 = `x_2 &= \\frac{${(-b - sqrtDisc).toFixed(2)}}{${2 * a}}`;
      const step2_6 = `x_2 &= ${result2.toFixed(2)}`;

      const fullBlock2 = String.raw`\begin{aligned}
        ${step2_1} \\
        ${step2_2} \\
        ${step2_3} \\
        ${step2_4} \\
        ${step2_5} \\
        ${step2_6}
      \end{aligned}`;

      setSolution1([fullBlock1]);
      setSolution2([fullBlock2]);
      setWarningMsg("");
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

    let a = Number(quadraticTermInput);
    let b = Number(linearTermInput);
    let lhs = Number(constantTermInputOnLHS);
    let rhs = Number(constantTermInputOnRHS);
    let c = lhs - rhs;

    const h = -b / (2 * a);
    const k = c - (b * b) / (4 * a);

    const maxSpanX = Math.max(Math.abs(h) * 2, 8);
    const maxSpanY = Math.max(Math.abs(k) * 2, 10);

    const xDomain = [h - maxSpanX / 2, h + maxSpanX / 2];
    const yDomain = a > 0 ? [k - 2, k + maxSpanY] : [k - maxSpanY, k + 2];

    try {
      const dataSeries = [
        {
          fn: fn,
          color: "#2563eb",
          graphType: "polyline",
        },
      ];

      if (roots.length > 0) {
        dataSeries.push({
          points: roots,
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
  }, [
    fn,
    roots,
    quadraticTermInput,
    linearTermInput,
    constantTermInputOnLHS,
    constantTermInputOnRHS,
  ]);

  function converter() {
    if (
      quadraticTermInput &&
      linearTermInput &&
      constantTermInputOnLHS &&
      constantTermInputOnRHS
    ) {
      let a = Number(quadraticTermInput);
      let b = Number(linearTermInput);
      let lhs = Number(constantTermInputOnLHS);
      let rhs = Number(constantTermInputOnRHS);
      let c = lhs - rhs;

      let discriminant = b * b - 4 * a * c;
      if (discriminant < 0) return;

      let result1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      let result2 = (-b - Math.sqrt(discriminant)) / (2 * a);

      if (!isFractionView) {
        const frac1 = decimalToFraction(result1);
        const frac2 = decimalToFraction(result2);

        setAnswer1(
          frac1 && frac1.denominator !== 1
            ? `${frac1.numerator}/${frac1.denominator}`
            : result1.toFixed(2),
        );
        setAnswer2(
          frac2 && frac2.denominator !== 1
            ? `${frac2.numerator}/${frac2.denominator}`
            : result2.toFixed(2),
        );
        setIsFractionView(true);
      } else {
        setAnswer1(result1.toFixed(2));
        setAnswer2(result2.toFixed(2));
        setIsFractionView(false);
      }
    }
  }

  return (
    <main
      id="quadratic"
      className={`solver border border-gray-400 rounded-sm p-3 mt-3 min-h-80 ${
        isDark ? "bg-gray-800 text-white" : "bg-[#e7e7e7] text-black"
      }`}>
      <div className="flex justify-between items-center pr-3">
        <h1 className="text-sm font-bold mb-2">
          Enter the coefficients of quadratic equation:
        </h1>
        <button
          onClick={clearInputs}
          className="reset bg-[#00695C] cursor-pointer text-white font-bold py-1 px-2 rounded-sm">
          Reset
        </button>
      </div>

      <div className="inputs flex items-center justify-start flex-wrap gap-3 my-3">
        <div className="flex items-center justify-center">
          <input
            className="max-w-10 h-10 border px-1"
            value={quadraticTermInput}
            onChange={(e) => setQuadraticTermInput(e.target.value)}
            type="number"
          />
          <span className="variable ml-1">
            x<sup className="text-md">2</sup>
          </span>
        </div>
        <span className="operator">+</span>
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
        {warningMsg && (
          <p className="warning absolute -top-2 text-sm text-red-600 font-medium">
            {warningMsg}
          </p>
        )}
        <button
          onClick={calculateResult}
          className="calculate bg-[#00695C] cursor-pointer text-white font-bold py-1 px-2 w-full my-3 rounded-sm">
          Calculate
        </button>
      </div>

      {answer1 !== "___" && (
        <div className="overflow-y-auto">
          <h2 className="font-bold text-lg">
            Solution for x<sub>1</sub>:
          </h2>
          <div>
            {solution1.map((equationBlock, idx) => (
              <div key={idx} style={{ margin: "20px 0", fontSize: "1.2rem" }}>
                <TeX block math={equationBlock} />
              </div>
            ))}
          </div>
        </div>
      )}

      {answer2 !== "___" && (
        <div className="overflow-y-auto">
          <h2 className="font-bold text-lg">
            Solution for x<sub>2</sub>:
          </h2>
          <div>
            {solution2.map((equationBlock, idx) => (
              <div key={idx} style={{ margin: "20px 0", fontSize: "1.2rem" }}>
                <TeX block math={equationBlock} />
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="flex items-center justify-between pr-4 mt-4">
        <div className="result text-lg overflow-hidden">
          <h2 className="font-bold text-lg mb-1">Roots:</h2>
          <div className="text-2xl">
            <b>
              x<sub>1</sub>
            </b>{" "}
            = <span className="answer1">{answer1}</span>
          </div>
          <div className="text-2xl">
            <b>
              x<sub>2</sub>
            </b>{" "}
            = <span className="answer2">{answer2}</span>
          </div>
        </div>
        <button
          onClick={converter}
          className="bg-[#00695C] converter flex items-center justify-between gap-1 cursor-pointer text-white font-bold py-1 px-2 rounded-sm">
          S <BiTransferAlt /> D
        </button>
      </section>

      <div ref={graphRef} className="mt-4 flex justify-center"></div>
    </main>
  );
};

export default QuadraticEquation;
