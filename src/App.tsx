import React from 'react';
import './App.css';

import { Route, Routes } from "react-router-dom";
import { Home } from './views/home/Home';
import { Distrito } from './views/distrito/Distrito'
import { Negocio } from './views/negocio/Negocio'
import { Login } from './views/login/Login'
import { SignUp } from './views/signup/SignUp'

import useConfig from "./hooks/useConfig";

function App() {
  const config = useConfig();

  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrarse" element={<SignUp />} />
      <Route path="/distrito/:ndis" element={<Distrito />} />
      <Route path="/negocio/:id" element={<Negocio />} />
    </Routes>
  </div>
  );
}

export default App;
