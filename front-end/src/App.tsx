import { CssVarsProvider } from '@mui/joy/styles'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInSide from "./pages/SignInSide";
import Dashboard from "./pages/dashboard/Dashboard";
import MyProfile from './pages/dashboard/components/MyProfile';
import './App.css';
import CreateLoan from './pages/dashboard/CreateLoan';

function App() {
  return (
    <CssVarsProvider>  
      <Router>
        <Routes>
          <Route path="/"  Component={SignInSide} />
          <Route path="/dashboard"  Component={Dashboard} />
          <Route path="/loans"  Component={Dashboard} />
          <Route path="/profile-dashboard"  Component={MyProfile} />
          <Route path="/create-loan"  Component={CreateLoan} />
        </Routes>
      </Router>
    </CssVarsProvider>
  )
}

export default App;
