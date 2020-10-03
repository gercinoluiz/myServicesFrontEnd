import React, { useState, useContext } from "react";

const ThemeContext = React.createContext();
function ThemeChangeProvider({ children }) {
  const [theme, setTheme] = useState(true);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  const { theme, setTheme } = context;

  return { theme, setTheme };
}

export default React.memo(ThemeChangeProvider);
