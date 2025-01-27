import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // Extract token from URL after Spotify callback
    const params = new URLSearchParams(window.location.search);
    const token = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (token) {
      sessionStorage.setItem("accessToken", token);
      sessionStorage.setItem("refreshToken", refreshToken);
      setAccessToken(token);
      // Clean the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      const storedToken = sessionStorage.getItem("accessToken");
      if (storedToken) setAccessToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            accessToken ? <Dashboard accessToken={accessToken} /> : <Login />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
