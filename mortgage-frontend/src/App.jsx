import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Navbar from "./components/Navbar.jsx";
import ClientList from "./components/ClientList.jsx";
import AddClient from "./components/AddClient.jsx";
import ClientPage from "./components/ClientPage.jsx";
import Simulator from "./components/Simulator.jsx";

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
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
