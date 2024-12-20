import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Train from './pages/train';
import Passenger from './pages/passenger';
import Ticket from './pages/ticket';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import Entrance from './pages/Entrance';


function App() {
  const navigate = useNavigate()
  useEffect(() => {
    if (window.location.pathname === "/filter-train" && localStorage.getItem("token") || localStorage.getItem("token")) {
      navigate('/filter-train')
    }
  }, [])
  return (
    <div>
   
      {localStorage.getItem("token") ? <Routes>
        <Route path='filter-train' element={<Train />} />
        <Route path='passenger-details/:id' element={<Passenger />} />
        <Route path='ticket-summary/:id' element={<Ticket />} />
        <Route path='profile' element={<Profile />} />
      </Routes> : <Routes>
        <Route path='/' element={<Entrance />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      }

    </div>
  );
}

export default App;
