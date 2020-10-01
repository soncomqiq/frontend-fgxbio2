import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import PrivateRoutes from './components/private-routes/PrivateRoutes';
import LocalStorageService from './services/LocalStorageService';

function App() {
  return (
    <div className="App">
      <PrivateRoutes role={LocalStorageService.getRole()} />
    </div>
  );
}

export default App;