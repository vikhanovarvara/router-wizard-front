import { CSSProperties } from 'react';

import { SxProps, createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeText {
    muted: string;
  }

  interface BreakpointOverrides {
    m: true;
  }
}

export const color = {
  white: '#FCFCFC',
  black: '#1D2023',
  primary: '#1463F3',
  secondary: '#DBE2EF',
  success: '#06D6A0',
  warning: '#FFD166',
  error: '#EF476F',
  muted: '#a6a6a6',
};

export const defaultTheme = createTheme({
  palette: {
    common: {
      white: color.white,
      black: color.black,
    },
    primary: {
      main: color.primary,
      contrastText: color.white,
    },
    secondary: {
      main: color.secondary,
      contrastText: color.black,
    },
    success: {
      main: color.success,
    },
    warning: {
      main: color.warning,
    },
    error: {
      main: color.error,
    },
    text: {
      primary: color.black,
      secondary: color.primary,
      muted: color.muted,
    },
    background: {
      default: color.primary,
      paper: color.white,
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: ['Proxima Nova', 'Coming Soon', '-apple-system', 'sans-serif'].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      m: 745,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export function createSx<T extends { [name: string]: CSSProperties | SxProps<typeof defaultTheme> }>(cfg: T) {
  return cfg;
}

export function createOnlyCss<T extends { [name: string]: CSSProperties }>(cfg: T) {
  return cfg;
}
