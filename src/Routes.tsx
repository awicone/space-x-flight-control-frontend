import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import routes from './components/Router/routes';
import FlightPage from './pages/FlightPage/FlightPage';
import FlightControlDashboard from './pages/FlightControlDashboard/FlightControlDashboard';
import Page from './layout/Page';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page><FlightControlDashboard /></Page>} />
        <Route path="flight/:id" element={<Page><FlightPage /></Page>} />
        <Route
          path="*"
          element={<Navigate to={routes.index} replace />}
        />
      </Routes>
    </BrowserRouter>

  );
};
