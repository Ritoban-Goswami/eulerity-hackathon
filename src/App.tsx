import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SelectionProvider } from './contexts/SelectionContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import Home from './pages/Home';
import PetDetail from './pages/PetDetail';
import About from './pages/About';
import Favorites from './pages/Favorites';
import VisualCollections from './pages/VisualCollections';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ErrorBoundary>
      <FavoritesProvider>
        <SelectionProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/collections" element={<VisualCollections />} />
              <Route path="/collections/:category" element={<VisualCollections />} />
              <Route path="/pet/:id" element={<PetDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </SelectionProvider>
      </FavoritesProvider>
    </ErrorBoundary>
  );
}

export default App;
