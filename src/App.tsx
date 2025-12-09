import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import Portfolio from './pages/Portfolio';
import NasdaqTop100 from './pages/NasdaqTop100';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Portfolio />} />
            <Route path="/nasdaq" element={<NasdaqTop100 />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
