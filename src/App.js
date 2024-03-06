import './App.css';
import MainPage from './components/MainPage';
import {Routes, Route, Router, BrowserRouter} from "react-router-dom";
import Login from './components/LoginComponent';
import Dashboard from './components/Dashboard';
import React, { useState } from 'react';
import { SharedStateProvider } from './components/SharedContext';

export const UserContext = React.createContext();

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <SharedStateProvider>
            <Routes>
              <Route path="/" Component={MainPage} />
              <Route path="/loginPage" Component = {Login} />
              <Route path="/dashboard" Component={Dashboard} />
            </Routes>
          </SharedStateProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;
