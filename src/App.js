import "./App.css";
import { Subs } from "./components/Subs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Products } from "./components/Products";
import { useState } from "react";

function App() {
  const [subs, setSubs] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Subs subs={subs} setSubs={setSubs} />}/>
          <Route path="/products" element={<Products subs={subs} setSubs={setSubs} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
