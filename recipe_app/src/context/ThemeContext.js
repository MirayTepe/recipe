import React, { useState } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, ThemeContext };
