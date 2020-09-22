import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import UserNavBar from './components/navbar/UserBar';
import PrivateRoutes from './components/private-routes/PrivateRoutes';
import GuestNavbar from './components/navbar/GuestBar';

function App() {
  return (
    <div className="App">
      <GuestNavbar />
      <PrivateRoutes />
    </div>
  );
}

export default App;
