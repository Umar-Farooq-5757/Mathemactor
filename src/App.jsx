import "./App.css";
import { useState } from "react";
import Header from "../components/Header.jsx";
import Equation from "../components/Equation.jsx";
import DefaultScreen from "../components/formulas/DefaultScreen.jsx";
import LinearEquation from "../components/formulas/linearEquation.jsx";
import QuadraticEquation from "../components/formulas/QuadraticEquation.jsx";
import CubicEquation from "../components/formulas/CubicEquation.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("DefaultScreen");

  return (
    <>
      <div className="bg-[#f0f0f0] min-h-[100vh]">
        {/* <div className="bg-[red] min-h-[100vh]"> */}
        <Header />
        <main className="main-container flex items-start px-2">
          <section className="equations w-[60%]">
            <Equation
              clickHandler={() => setActiveTab("LinearEquation")}
              equationType="Solve linear equation"
              equation={<span>ax + b = 0</span>}
            />
            <Equation
              clickHandler={() => setActiveTab("QuadraticEquation")}
              equationType="Solve quadratic equation"
              equation={
                <span>
                  ax<sup>2</sup> + bx + c = 0
                </span>
              }
            />
            <Equation
            clickHandler={()=>setActiveTab("CubicEquation")}
              equationType="Solve cubic equation"
              equation={
                <span>
                  ax<sup>3</sup> + bx<sup>2</sup> + cx + d = 0
                </span>
              }
            />
          </section>
          <section className="solver w-[40%]">
            {activeTab === "DefaultScreen" && <DefaultScreen/>}
            {activeTab === "LinearEquation" && <LinearEquation/>}
            {activeTab === "QuadraticEquation" && <QuadraticEquation/>}
            {activeTab === "CubicEquation" && <CubicEquation/>}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;

// import React, { useState } from 'react';

// function Tabs() {
//   const [activeTab, setActiveTab] = useState('About');

//   return (
//     <div>
//       <button onClick={() => setActiveTab('About')}>About</button>
//       <button onClick={() => setActiveTab('Projects')}>Projects</button>
//       <button onClick={() => setActiveTab('Contact')}>Contact</button>

//       {activeTab === 'About' && <div>This is the About section.</div>}
//       {activeTab === 'Projects' && <div>Here are my awesome projects!</div>}
//       {activeTab === 'Contact' && <div>You can contact me here.</div>}
//     </div>
//   );
// }

// export default Tabs;
