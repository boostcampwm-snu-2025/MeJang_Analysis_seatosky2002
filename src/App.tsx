import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import MainLayout from './layouts/MainLayout';
import Portfolio from './pages/Portfolio';
import NasdaqTop100 from './pages/NasdaqTop100';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Portfolio />} />
          <Route path="/nasdaq" element={<NasdaqTop100 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
