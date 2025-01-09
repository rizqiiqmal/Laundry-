import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./home"
import Login from "./login"
import RegisterForm from './register';
import Harga from './harga';
import Hubungi from './hubungi';
import Layanan from './layanan';
import TentangKami from './tentangKami';


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
    <Route>
    <Route path="/harga" element={<Harga/>} />
    </Route>
    <Route>
    <Route path="/hubungi" element={<Hubungi/>} />
    </Route>
    <Route>
    <Route path="/layanan" element={<Layanan/>} />
    </Route>
    <Route>
    <Route path="/tentang" element={<TentangKami/>} />
    </Route>
    </Routes>
    
    )
    }
    export default App