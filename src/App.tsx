
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Rentals from './pages/Rentals';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ActivityHistory from './pages/ActivityHistory';
import Settings from './pages/Settings';
import ScrollToTop from './components/layout/ScrollToTop'; // We'll create this helper
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/activity" element={<ActivityHistory />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
