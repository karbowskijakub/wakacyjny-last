import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Layout from './layout/Layout'; 
import SearchSection from './pages/SearchSection';
import ConfirmEmail from './pages/ConfirmEmail';
import ResetPasswordForm from './pages/ResetPasswordForm';
import AdminPanel from './pages/AdminPanel';
import MainPage from './pages/MainPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
        <Route path="/confirmationSuccess" element={<ConfirmEmail />}  />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/resetPassword" element={<ResetPasswordForm />} />
          <Route element={<Layout />}>
            <Route path="/strona-glowna" element={<MainPage />} />
            <Route path="/panel-admina" element={<AdminPanel />} />
            <Route path="/search" element={<SearchSection />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;