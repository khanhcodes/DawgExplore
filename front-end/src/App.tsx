import * as React from "react";
import { ThemeProvider } from "react-jss";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import EventPage from "./pages/EventPage";
import Home from "./pages/Home";
import { Theme } from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
