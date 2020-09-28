import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import PrivateRoutes from './components/private-routes/PrivateRoutes';

function App() {
  return (
    <div className="App">
      <PrivateRoutes />
    </div>
  );
}

export default App;
