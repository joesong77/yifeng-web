
import './App.css';
import About from "./pages/About/About"
import Home from "./pages/Home/Home"
import Excavator from "./pages/Excavator/Excavators"
import AppBar from "./componets/AppBar/AppBar"

import FooTer from "./componets/FooTer/FooTer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">

        <AppBar />

        <main className='main-content'>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/about" element={<About />} />
          </Routes>
          <Routes>
            <Route path="/excavator" element={<Excavator  />} />
          </Routes>
        </main>

        <FooTer />

      </div>
    </Router>
  );
}

export default App;
