
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/dashboard';




createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={ <Registration/>}/>
    <Route path="/login" element={ <Login/>}/>
    <Route path="/dashboard" element={ <Dashboard/>}/>

  </Routes>

  </BrowserRouter>


);
