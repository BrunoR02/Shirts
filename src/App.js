import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Pages/Home';
import ShirtDetails from './components/Pages/ShirtDetails';
import {useContext} from "react"
import CartPage from './components/Pages/CartPage';
import Checkout from './components/Pages/Checkout';
import Login from './components/Pages/Login';
import Cadastro from './components/Pages/Cadastro';
import AuthContext from './components/store/auth-context';
import Sobre from './components/Pages/Sobre';

export default function App() {
  const authCtx = useContext(AuthContext)
  
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/:productSlug" element={<ShirtDetails/>}/>
          <Route path="/sacola" element={<CartPage/>}/>
          <Route path="/checkout" element={authCtx.isLogged ? <Checkout/> : <Navigate to="/" replace/>}/>
          <Route path="/login" element={!authCtx.isLogged ? <Login/> : <Navigate to="/" replace/>}/>
          <Route path="/cadastro" element={!authCtx.isLogged ? <Cadastro/> : <Navigate to="/" replace/>}/>
          <Route path="/sobre" element={<Sobre/>}/>
          <Route path="*" element={<Navigate to="/sacola" replace/>}/>
        </Routes>
    </div>
  );
}