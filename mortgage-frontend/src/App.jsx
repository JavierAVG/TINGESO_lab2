import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Navbar from "./components/Navbar.jsx";
import ClientList from "./components/ClientList.jsx";
import AddClient from "./components/AddClient.jsx";
import ClientPage from "./components/ClientPage.jsx";
import Simulator from "./components/Simulator.jsx";
import LoanList from "./components/LoanList.jsx";
import LoanCosts from "./components/LoanCosts.jsx";
import EvaluateLoan from "./components/EvaluateLoan.jsx";
import AddLoan from "./components/AddLoan.jsx";

function App() {
    return (
        <BrowserRouter>
            <div className="full-height">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/clients" element={<ClientList />} />
                    <Route path="/clients/create" element={<AddClient />} />
                    <Route path="/client/:id" element={<ClientPage />} />
                    <Route path="/client/:id/simulator" element={<Simulator />} />
                    <Route path="/client/:idClient/loanlist" element={<LoanList />} />
                    <Route path="/loans" element={<LoanList />} />
                    <Route path="/loan/:id/costs" element={<LoanCosts />} />
                    <Route path="/loan/:id/evaluate" element={<EvaluateLoan />} />
                    <Route path="/client/:clientId/addloan" element={<AddLoan />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
