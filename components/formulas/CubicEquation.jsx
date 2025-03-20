import React from "react";
import { useRef } from "react";
import { BiTransferAlt } from "react-icons/bi";

const CubicEquation = () => {
  const quadraticTermInput = useRef();
  const linearTermInput = useRef();
  const constantTermInputOnLHS = useRef();
  const constantTermInputOnRHS = useRef();
  const answer1 = useRef();
  const answer2 = useRef();
  const warning = useRef();
  // answer.current.innerText = "___";
  function clearInputs() {
    quadraticTermInput.current.value = "";
    linearTermInput.current.value = "";
    constantTermInputOnLHS.current.value = "";
    constantTermInputOnRHS.current.value = "";
    answer1.current.innerText = "___";
    answer2.current.innerText = "___";
  }
  function calculateResult() {
    if (
      quadraticTermInput.current.value &&
      linearTermInput.current.value &&
      constantTermInputOnLHS.current.value &&
      constantTermInputOnRHS.current.value
    ) {
      let c =
        constantTermInputOnLHS.current.value -
        constantTermInputOnRHS.current.value;
      let b = linearTermInput.current.value;
      let a = quadraticTermInput.current.value;
      if (b * b - 4 * a * c < 0) {
        alert("Imaginary roots are not supported yet.");
      } else {
        let result1 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        answer1.current.innerText = (
            decimalToFraction(result1.toFixed(2)).numerator / decimalToFraction(result1.toFixed(2)).denominator
        ).toFixed(2);
        let result2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        answer2.current.innerText = (
            decimalToFraction(result2.toFixed(2)).numerator / decimalToFraction(result2.toFixed(2)).denominator
        ).toFixed(2);
      }
      //   answer.current.innerText = (
      //     decimalToFraction(result.toFixed(2)).numerator /
      //     decimalToFraction(result.toFixed(2)).denominator
      //   ).toFixed(2);
    } else {
      warning.current.style.display = "inline-block";
      setTimeout(() => {
        warning.current.style.display = "none";
      }, 3000);
    }
  }

  function decimalToFraction(decimal) {
    if (Number.isInteger(decimal)) {
      return { numerator: decimal, denominator: 1 };
    }

    const decimalString = decimal.toString();
    const decimalPlaces = decimalString.split(".")[1].length;
    const numerator = decimal * Math.pow(10, decimalPlaces);
    const denominator = Math.pow(10, decimalPlaces);

    function greatestCommonDivisor(a, b) {
      return b ? greatestCommonDivisor(b, a % b) : a;
    }

    const commonDivisor = greatestCommonDivisor(numerator, denominator);

    return {
      numerator: numerator / commonDivisor,
      denominator: denominator / commonDivisor,
    };
  }

  function converter() {
    if (
      quadraticTermInput.current.value &&
      linearTermInput.current.value &&
      constantTermInputOnLHS.current.value &&
      constantTermInputOnRHS.current.value
    ) {
      let c =
        constantTermInputOnLHS.current.value -
        constantTermInputOnRHS.current.value;
      let b = linearTermInput.current.value;
      let a = quadraticTermInput.current.value;
      let result1 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
      let result2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
      if (answer1.current.innerText.includes(".") && answer2.current.innerText.includes(".")) {
        answer1.current.innerText = `${
          decimalToFraction(result1.toFixed(2)).numerator
        }/${decimalToFraction(result1.toFixed(2)).denominator}`;
        answer2.current.innerText = `${
          decimalToFraction(result2.toFixed(2)).numerator
        }/${decimalToFraction(result2.toFixed(2)).denominator}`;
      } else {
        answer1.current.innerText =
          decimalToFraction(result1.toFixed(2)).numerator /
          decimalToFraction(result1.toFixed(2)).denominator;
        answer2.current.innerText =
          decimalToFraction(result2.toFixed(2)).numerator /
          decimalToFraction(result2.toFixed(2)).denominator;
      }
    }
  }
  return (
    // <main className="bg-[#DDECF8] solver border border-gray-400 rounded-sm p-3 mt-3 min-h-80">
    <main className="solver bg-[#e7e7e7]  border border-gray-400 rounded-sm p-3 mt-3 min-h-80">
      <div className="flex justify-between items-center pr-3">
        <h1 className="text-sm font-bold mb-2">
          Enter the coefficients of cubic equation:
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
            ref={quadraticTermInput}
            type="number"
          />
          <span className="variable">
            x<sup className="text-md">2</sup>
          </span>
        </div>
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
          <h2 className="font-bold text-lg mb-1">Roots:</h2>
          <div className="text-2xl">
            <b>
              x<sub>1</sub>
            </b>{" "}
            ={" "}
            <span ref={answer1} className="answer1">
              ___
            </span>
          </div>
          <div className="text-2xl">
            <b>
              x<sub>2</sub>
            </b>{" "}
            ={" "}
            <span ref={answer2} className="answer2">
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

export default CubicEquation;













// import React, { useState } from 'react';
// import { cubic } from 'mathjs';

// function CubicSolver() {
//   const [a, setA] = useState(1);
//   const [b, setB] = useState(0);
//   const [c, setC] = useState(0);
//   const [d, setD] = useState(-8);
//   const [roots, setRoots] = useState([]);

//   const solveCubic = () => {
//     const result = cubic(a, b, c, d);
//     setRoots(result);
//   };

//   return (
//     <div>
//       <div>
//         <label>a:</label>
//         <input type="number" value={a} onChange={(e) => setA(parseFloat(e.target.value))} />
//       </div>
//       <div>
//         <label>b:</label>
//         <input type="number" value={b} onChange={(e) => setB(parseFloat(e.target.value))} />
//       </div>
//       <div>
//         <label>c:</label>
//         <input type="number" value={c} onChange={(e) => setC(parseFloat(e.target.value))} />
//       </div>
//       <div>
//         <label>d:</label>
//         <input type="number" value={d} onChange={(e) => setD(parseFloat(e.target.value))} />
//       </div>
//       <button onClick={solveCubic}>Solve</button>
//       <div>
//         Roots:
//         {roots.map((root, index) => (
//           <div key={index}>{root.toString()}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CubicSolver;