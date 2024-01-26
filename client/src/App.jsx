import './App.css'
import { BrowserRouter, Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import Login from './components/Login';
import Store from './components/Store';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/login" Component={Login} />
        <Route exact path="/" Component={Store} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
