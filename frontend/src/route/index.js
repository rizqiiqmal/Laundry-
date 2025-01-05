import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./home"
import Login from "./login"
import RegisterForm from './register';
function App() {
    return(
    <Routes>
    <Route>
    <Route path="/" element={<Home/>} />
    </Route>
    <Route>
    <Route path="/login" element={<Login/>} />
    </Route>
    <Route>
    <Route path="/register" element={<RegisterForm/>} />
    </Route>
    </Routes>
    
    )
    }
    export default App