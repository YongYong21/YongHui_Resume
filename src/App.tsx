/** @jsxImportSource @emotion/react */
import { useState } from "react";
import "./App.css";
import { Global, css } from "@emotion/react";
import { globalDarkStyles, globalLightStyles } from "./theme";

import HeaderCS from "./components/HeaderCS";
import { useEffect } from "react";

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
      <button onClick={toggleTheme}>Toggle Theme</button>

      <Global styles={isDarkMode ? globalLightStyles : globalDarkStyles} />
      <HeaderCS />
    </div>
  );
}

export default App;
