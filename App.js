import React from 'react';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Routes from './navigation/index';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#C8102E',
    secondary: '#418FDE',
    tertiary: '#8A8D8F',
    background: '#0C2340',
    textColor: '#f1f1f1',
  },
}; 

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Routes />
    </PaperProvider>
  )
}