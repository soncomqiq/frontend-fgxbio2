import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Signup from './containers/pages/Signup/Signup';
import Login from './containers/pages/Login/Login';
import SearchPage from './containers/pages/SearchPage/SearchPage';

function App() {
  return (
    <div className="App">
      <SearchPage />
    </div>
  );
}

export default App;
