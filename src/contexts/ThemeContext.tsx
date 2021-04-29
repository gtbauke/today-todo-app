import React, { createContext } from 'react';

export interface Theme {
  colors: {
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    accent: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    terciary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    gray: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    white: string;
    black: string;
  };
  fontSizes: {
    sm: number;
    md: number;
    lg: number;
    larger: number;
    xl: number;
  };
}

export const ThemeContext = createContext<Theme>({} as Theme);

interface ThemeProviderProps {
  theme: Theme;
  children: React.ReactNode;
}

export const ThemeProvider = ({
  theme,
  children,
}: ThemeProviderProps): JSX.Element => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
