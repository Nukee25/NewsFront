import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Rise from './pages/Rise';
import Real from './pages/Real';
import Vox from './pages/Vox';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rise />} />
        <Route path="/real" element={<Real />} />
        <Route path="/vox" element={<Vox />} />
      </Routes>
      <Navigation />
    </BrowserRouter>
  );
}
