import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import statusService from "../services/status.service.js";
import {Box} from "@mui/material";

const LoanCosts = () => {
    const { id } = useParams();
    const [monthlyfee, setMonthlyfee] = useState(0);
    const [creditlifeinsurance, setCreditlifeinsurance] = useState(0);
    const [fireinsurance, setFireinsurance] = useState(0);
    const [commision, setCommision] = useState(0);
    const [monthlycost, setMonthlycost] = useState(0);
    const [totalcost, setTotalcost] = useState(0);

    useEffect(() => {
        statusService.get(id).then(response => {
            console.log("Loan costs", response.data);
            setMonthlyfee(response.data.monthlyfee);
            setCreditlifeinsurance(response.data.creditlifeinsurance);
            setFireinsurance(response.data.fireinsurance);
            setCommision(response.data.commision);
            setMonthlycost(response.data.monthlycost);
            setTotalcost(response.data.totalcost);
        }).catch(e => {
            console.log(e);
        });
    }, []);

    return (
        <Box>
            <h1>Costos del Crédito</h1>
            <hr/>
            <p>Cuota Mensual: {monthlyfee}</p>
            <p>Seguro de Vida: {creditlifeinsurance}</p>
            <p>Seguro de Incendio: {fireinsurance}</p>
            <p>Comisión: {commision}</p>
            <p>Costo Mensual: {monthlycost}</p>
            <h3>Costo Total: {totalcost}</h3>
        </Box>
    )
}

export default LoanCosts;