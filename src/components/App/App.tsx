import React from 'react';
import s from './App.module.css';
import { AppRoutes } from '../../Routes';

const App = () => {
  return (
    <div className={s.container}>
      <AppRoutes />
    </div>
  );
};

export default App;
