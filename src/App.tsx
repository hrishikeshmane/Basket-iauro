import React from "react";
import "./App.css";
import { Subs } from "./components/Subs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Products } from "./components/Products";
import { Provider } from 'react-redux';
import {store}  from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Subs />}/>
            <Route path="/products" element={<Products />}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
