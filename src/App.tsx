import "./App.css";

import * as React from "react";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";


import { Home } from './views/home/Home';
import useConfig from "./hooks/useConfig";
import logo from "./logo.svg";

/**
 * Our Web Application
 */
export default function App() {
  const config = useConfig();
  return (
    // <div>
    
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h1 className="App-title">Welcome to {config.app.TITLE}</h1>
    //     </header>
    //     <p className="App-intro">
    //       To get started, edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //   </div>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
    
  );
}
