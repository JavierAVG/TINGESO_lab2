import { useState } from "react";
import simulatorService from "../services/simulator.service";
import {Box, Button, FormControl, FormLabel, MenuItem, Select, TextField} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import {useNavigate, useParams} from "react-router-dom";

const Simulator = () => {
    const { id } = useParams();
    const [type, setType] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [duration, setDuration] = useState("");
    const [amount, setAmount] = useState("");
    const [monthlyFee, setMonthlyFee] = useState(0);
    const navigate = useNavigate();

    const handleSimulate = async (e) => {
        e.preventDefault();
        try {
            const response = await simulatorService.simulate({
                interestrate: interestRate,
                duration: duration,
                amount: amount
            });
            setMonthlyFee(response.data);
        } catch (error) {
            console.error("Error during simulation:", error);
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSimulate}
            alignItems="center">
            <h1>Simular Crédito</h1>
            <hr/>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <FormLabel component="legend">Tipo de Crédito</FormLabel>
                <Select
                    required={true}
                    label="Tipo de Credito"
                    variant="outlined"
                    value={type}
                    onChange={e => setType(e.target.value)}
                    sx={{ minWidth: 200 }} // Establece un ancho mínimo fijo
                >
                    <MenuItem value="primeravivienda">Primera Vivienda</MenuItem>
                    <MenuItem value="segunadavivienda">Segunda Vivienda</MenuItem>
                    <MenuItem value="propiedadescomerciales">Propiedades Comerciales</MenuItem>
                    <MenuItem value="Remodelacion">Remodelación</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <TextField
                    required={true}
                    label="Tasa de Interes (Anual)"
                    variant="outlined"
                    value={interestRate}
                    onChange={e => {
                        if (/^\d{0,2}(\.\d*)?$/.test(e.target.value)) setInterestRate(e.target.value)
                    }}
                />
            </FormControl>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <TextField
                    required={true}
                    label="Duracion (Años)"
                    variant="outlined"
                    value={duration}
                    onChange={e => {
                        if (/^\d*$/.test(e.target.value)) setDuration(e.target.value)
                    }} // Solo permite numeros
                />
            </FormControl>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <TextField
                    required={true}
                    label="Monto"
                    variant="outlined"
                    value={amount}
                    onChange={e => {
                        if (/^\d*$/.test(e.target.value)) setAmount(e.target.value)
                    }} // Solo permite numeros
                />
            </FormControl>

            <FormControl fullWidth>
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<CalculateIcon/>}
                >
                    Simular
                </Button>
            </FormControl>

            <hr/>

            <h2>Cuota Mensual: ${monthlyFee}</h2>

            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/client/${id}`)}
            >
                Volver
            </Button>
        </Box>
    );
}

export default Simulator;