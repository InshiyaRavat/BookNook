import './App.css'
import { BrowserRouter, Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import Login from './components/Login';
import Store from './components/Store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route exact path="/login" Component={Login} />
        <Route exact path="/loading" Component={Loading} />
        <Route exact path="/" Component={Store} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App
