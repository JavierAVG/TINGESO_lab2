import statusService from "../services/status.service.js";
import loanService from "../services/loan.service.js";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const LoanList = () => {
    const { idClient } = useParams();
    const [title, setTitle] = useState("[no tittle]");
    const [loans, setLoan] = useState([{
        "id": 0,
        "clientid": 0,
        "type": "[no type]",
        "amount": 999999
    }]);
    const [statuses, setStatuses] = useState([{
        "id": 0,
        "state": "Pre-Aprobado"
    }]);
    const navigate = useNavigate();

    const init = () => {
        if (idClient) {
            setTitle("Lista de Creditos del Cliente");
            loanService.getAllByClientId(idClient).then(response => {
                console.log("List of all loans of client. ", response.data);
                setLoan(response.data);
            }).catch(e => {
                console.log(e);
            });
        } else {
            setTitle("Lista de Creditos");
            loanService.getAll().then(response => {
                console.log("List of all loans. ", response.data);
                setLoan(response.data);
            }).catch(e => {
                console.log(e);
            });
        }

        statusService.getAll().then(response => {
            console.log("List of all statuses. ", response.data);
            setStatuses(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        init();
    }, []);

    const handleCancel = (id) => {
        const confirm = window.confirm("¿Está seguro que desea cancelar el crédito?");

        if (confirm) {
            statusService.updateState(id, "Cancelado").then(response => {
                console.log("Loan canceled. ", response.data);
                init();
            }).catch(e => {
                console.log(e);
            });
        }
    }

    const handleApprove = (id) => {
        const confirm = window.confirm("¿Está seguro que desea aprobar el crédito?");

        if (confirm) {
            statusService.updateState(id, "Aprobado").then(response => {
                console.log("Loan approved. ", response.data);
                init();
            }).catch(e => {
                console.log(e);
            });
        }
    }

    return (
        <div>
            <h1>{title}</h1>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id Cliente</TableCell>
                            <TableCell>Id</TableCell>
                            <TableCell>Monto</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loans.map(loan => (
                            <TableRow key={loan.id}>
                                <TableCell>{loan.clientid}</TableCell>
                                <TableCell>{loan.id}</TableCell>
                                <TableCell>{loan.amount}</TableCell>
                                <TableCell>{loan.type}</TableCell>
                                <TableCell>{statuses.find(status => status.id === loan.id)?.state}</TableCell>
                                <TableCell>
                                    {idClient && (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={() => handleCancel(loan.id)}
                                                style={{ marginLeft: "0.5rem" }}
                                                startIcon={<DeleteIcon />}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => navigate(`/loan/${loan.id}/costs`)}
                                                style={{ marginLeft: "0.5rem" }}
                                                startIcon={<AttachMoneyIcon />}
                                            >
                                                Costos
                                            </Button>
                                        </>
                                    )}
                                    {idClient && statuses.find(status => status.id === loan.id)?.state === "Pre-Aprobado" && (
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            onClick={() => handleApprove(loan.id)}
                                            style={{ marginLeft: "0.5rem" }}
                                            startIcon={<ThumbUpOffAltIcon />}
                                        >
                                            Aprobar
                                        </Button>
                                    )}
                                    {!idClient && (
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => navigate(`/loan/${loan.id}/evaluate`)}
                                            style={{ marginLeft: "0.5rem" }}
                                            startIcon={<ReceiptLongIcon />}
                                        >
                                            Evaluar
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default LoanList;