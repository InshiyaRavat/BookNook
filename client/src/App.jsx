import './App.css'
import { BrowserRouter, Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import Login from './components/Login';
import Store from './components/Store';
import Footer from './components/Footer';
import Products from './components/store/Products';
import Rent from './components/Rent';
import Cart from './components/Cart';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/login" Component={Login} />
        <Route exact path="/loading" Component={Loading} />
        <Route exact path="/product/:title" Component={Products} />
        <Route exact path="/rent" Component={Rent}/>
        <Route exact path="/cart" Component={Cart}/>
        <Route exact path='/store' Component={Store}/>
        <Route exact path="/" Component={Login}/>
        <Route path="/*" element={<div>404 : Page Not Found</div>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App
