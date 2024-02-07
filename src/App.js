import React from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import DataInput from './pages/capture';
import Register from './pages/register';
import { useSelector } from 'react-redux';
import Privacy from './pages/privacy';
import Terms from './pages/terms';
import Faq from './pages/faq';
import Subscribe from './pages/subscribe';
import Capture from './pages/capture';
import {Helmet} from "react-helmet";


export const PrivateRoutes = () => {
    const authState = useSelector((state) => state.auth);

    return (
        <>{authState.isAuth ? <Outlet /> : <Navigate to='/login' />}</>
    )
}
export const RestictedRoutes = () => {
    const authState = useSelector((state) => state.auth);

    return (
        <>{!authState.isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
    )
    
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route element={<PrivateRoutes />} >
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/capture' element={<Capture />} />
                </Route>
                <Route element={<RestictedRoutes />} >
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Route>
                <Route path='/home' element={<Home />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='/terms' element={<Terms />} />
                <Route path='/faq' element={<Faq />} />
                <Route path='/email-confirmation/:key' element={<Subscribe />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
