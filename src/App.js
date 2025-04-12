
import './App.css';
import Home from "./pages/Home/Home"
import AppBar from "./componets/AppBar/AppBar"
import FooTer from "./componets/FooTer/FooTer"
function App() {
  return (
    <div className="App">

        <AppBar/>
        <main className='main-content'>
            <Home/>
        </main>
        <FooTer/>
        
    </div>
  );
}

export default App;
