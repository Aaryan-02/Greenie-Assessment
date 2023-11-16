import './index.css';
import Header from './Components/Header';
import UserDetails from "./Pages/UserDetails";
import AccountCreation from './Pages/AccountCreation';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<UserDetails />} />
        <Route path="/createAccount" element={<AccountCreation />} />
      </Routes>
    </Router>
  );
}

export default App;
