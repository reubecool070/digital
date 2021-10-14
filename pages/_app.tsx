import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
// import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { Theme } from "../src/Theme";

// const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  console.log("theme", Theme);
  return (
    <ThemeProvider theme={Theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
