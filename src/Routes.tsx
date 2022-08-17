import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './components/Router/routes';
import FlightPage from './pages/FlightPage/FlightPage';
import FlightControlDashboard from './pages/FlightControlDashboard/FlightControlDashboard';
import Page from './layout/Page';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.index} element={<Page><FlightControlDashboard /></Page>} />
        <Route path={`${routes.flight}/:id`} element={<Page><FlightPage /></Page>} />
      </Routes>
    </BrowserRouter>

  );
};
