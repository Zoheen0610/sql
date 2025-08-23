import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <div className={theme === "dark" ? "dark" : ""}>
              {children}
          </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);