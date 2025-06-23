import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api/v1';

function App() {
  return (
    <>
    <Toaster position="bottom-right" reverseOrder={false}/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
