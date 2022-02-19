import * as React from "react";
import { ThemeProvider } from "react-jss";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { SavedEventsProvider } from "./HOC/save-events";
import EventPage from "./pages/EventPage";
import Home from "./pages/Home";
import MostPopular from "./pages/MostPopular";
import PlaceholderPage from "./pages/PlaceholderPage";
import Recommended from "./pages/Recommended";
import Upcoming from "./pages/Upcoming";
import { Theme } from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <SavedEventsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="*" element={<PlaceholderPage />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/most-popular" element={<MostPopular />} />
            <Route path="/recommended" element={<Recommended />} />
          </Routes>
        </BrowserRouter>
      </SavedEventsProvider>
    </ThemeProvider>
  );
}
