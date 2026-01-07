
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Rentals from './pages/Rentals';
import About from './pages/About';
import ScrollToTop from './components/layout/ScrollToTop'; // We'll create this helper

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
