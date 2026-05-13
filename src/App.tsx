import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SelectionProvider } from './contexts/SelectionContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import Home from './pages/Home';
import PetDetail from './pages/PetDetail';
import About from './pages/About';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <FavoritesProvider>
        <SelectionProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
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
