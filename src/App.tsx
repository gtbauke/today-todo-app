import React from 'react';
import { StatusBar } from 'react-native';

import { ThemeProvider } from './contexts/ThemeContext';
import { Routes } from './routes';
import { defaultTheme } from './styles/theme';

export default function App(): JSX.Element {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <StatusBar
          backgroundColor={defaultTheme.colors.white}
          barStyle="dark-content"
          translucent
        />
        <Routes />
      </ThemeProvider>
    </>
  );
}
