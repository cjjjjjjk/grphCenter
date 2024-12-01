import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter, NavLink, useLocation } from "react-router-dom"

import Home from './page/Home';
import Calculator from './page/Calcurlator';

import MainHeader from './component/MainHeader';
import Login from './page/Login';

const App: React.FC = () => {

  return (
    <BrowserRouter >
      <div className='relative App-font'>
        <MainHeader />
        <main>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path="/calcurlator" element={<Calculator />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
