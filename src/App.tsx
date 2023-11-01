/** @jsxImportSource @emotion/react */
import { useState, useRef } from "react";
import "./App.css";
import { Global, css } from "@emotion/react";
import { globalDarkStyles, globalLightStyles } from "./theme";

import LoadingCS from "./components/LoadingCS";
import { useEffect } from "react";

const appContainer = css``;
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
  const loadingRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      localStorage.setItem("hasDarkModeState", JSON.stringify(!prevMode));
      return !prevMode;
    });
  };
  useEffect(() => {
    const loadingComponent = setTimeout(() => {
      // loadingRef.current.style.display = "none";
      if (loadingRef.current) {
        loadingRef.current.style.display = "none";
      }
    }, 6000);

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
    return () => {
      clearTimeout(loadingComponent);
    };
  }, []);

  return (
    <div css={appContainer}>
      <Global styles={isDarkMode ? globalLightStyles : globalDarkStyles} />
      <LoadingCS ref={loadingRef} />
      <div css={darkModeBtnContainer}>
        <div>{isDarkMode ? "LightMode" : "DarkMode"}</div>
        <button css={darkModeBtn} onClick={toggleTheme}>
          <div css={darkModeBtnCircle(isDarkMode)}></div>
        </button>
      </div>
    </div>
  );
}

export default App;
