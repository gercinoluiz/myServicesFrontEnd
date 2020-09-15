import React, { useState, useContext } from "react";

const ThemeContext = React.createContext();

 export default function ThemeChangeProvider ({ children }) {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);

  console.log(useContext(ThemeContext))

  const { theme, setTheme } = context;

  return { theme, setTheme };
}


