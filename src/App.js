
import './App.css';
import Home from "./pages/Home/Home"
import AppBar from "./componets/AppBar/AppBar"
import FooTer from "./componets/FooTer/FooTer"
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">

        <AppBar/>
        <HashRouter>
        <main className='main-content'>
            <Home/>
        </main>
        </HashRouter>
        <FooTer/>
        
    </div>
  );
}

export default App;
