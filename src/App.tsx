import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SelectionProvider } from './contexts/SelectionContext';
import { Navigation } from './components/Navigation';
import Home from './pages/Home';
import PetDetail from './pages/PetDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <SelectionProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </SelectionProvider>
  );
}

export default App;
