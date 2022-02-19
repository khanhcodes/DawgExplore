import axios from "axios";
import * as React from "react";
import { ThemeProvider } from "react-jss";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { Theme } from "./theme";

const { REACT_APP_BACKEND } = process.env;

export default function App() {
  React.useEffect(() => {
    axios
      .get(`${REACT_APP_BACKEND}/event/1`)
      .then((res) => {
        const person = res.data;
        console.log(person);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
