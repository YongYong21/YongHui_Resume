/** @jsxImportSource @emotion/react */
import { useState } from "react";
import "./App.css";
import { Global, css } from "@emotion/react";
import { globalDarkStyles, globalLightStyles } from "./theme";

import HeaderCS from "./components/HeaderCS";
import { useEffect } from "react";
const darkModeBtnContainer = css`
  width: 108px;
  text-align: center;
`;

const darkModeBtn = css`
  width: 96px;
  height: 32px;

  border: 1px solid gray;
  border-radius: 24px;

  margin-top: 4px;
  padding: 4px;

  cursor: pointer;

  background-color: #b1b4bd;
`;
const darkModeBtnCircle = (darkModeState: boolean) => css`
  width: 24px;
  height: 24px;

  border: 1px solid #b1b4bd;
  border-radius: 50%;

  transform: translateX(${darkModeState ? "0" : "250"}%);
  transition: transform 0.5s;

  background-color: #f8f9fb; // #171316
`;

function App(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      localStorage.setItem("hasDarkModeState", JSON.stringify(!prevMode));
      return !prevMode;
    });
  };
  useEffect(() => {
    const hasDarkModeState = localStorage.getItem("hasDarkModeState");
    if (hasDarkModeState) {
      return JSON.parse(hasDarkModeState) === false
        ? setIsDarkMode(false)
        : setIsDarkMode(true);
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDarkMode(false);
        localStorage.setItem("hasDarkModeState", JSON.stringify(isDarkMode));
      } else {
        setIsDarkMode(true);
        localStorage.setItem("hasDarkModeState", JSON.stringify(isDarkMode));
      }
    }
  }, []);

  return (
    <div className="App">
      <Global styles={isDarkMode ? globalLightStyles : globalDarkStyles} />
      <div css={darkModeBtnContainer}>
        <div>{isDarkMode ? "LightMode" : "DarkMode"}</div>
        <button css={darkModeBtn} onClick={toggleTheme}>
          <div css={darkModeBtnCircle(isDarkMode)}></div>
        </button>
      </div>
      <HeaderCS />
    </div>
  );
}

export default App;
