import React from "react";

/**
 * ThemeContext store the current theme of the app,which is provided
 * at the /src/App.js using the /src/App.theme.js.
 * 
 * 
 */

let Themes = {
    default: "default",
    dark: "dark",
};
export let ThemeContext = React.createContext({
    name: Themes.default,
    setTheme: () => null,
  });