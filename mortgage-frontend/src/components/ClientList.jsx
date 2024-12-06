import { useEffect, useState } from "react";
import clientService from "../services/client.service.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";

const ClientList = () => {
    const [clients, setClients] = useState([{
        "id": 0,
        "name": "no name",
        "rut": "12345678-9",
        "birthdate": "2000-01-01"
    }]);
    const navigate = useNavigate();

    useEffect(() => {
        clientService.getAll().then(response => {
            console.log("List of all clients. ",response.data);
            setClients(response.data);
        }).catch(e => {
            console.log(e);
        });
    }, []);

    return (
        <div>
            <Box sx={{
                height: "calc(100vh - 100px)",
                maxWidth: 600,
                margin: '0 auto',
                marginTop: "64px"
            }}>
                <h1>Lista de Clientes</h1>
                <Button
                    sx={{marginBottom: 2}}
                    variant="contained"
                    startIcon={<PersonAddIcon/>}
                    onClick={() => navigate('/clients/create')}
                >
                    Agregar Cliente
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Rut</TableCell>
                                <TableCell>Nombre</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients.map(client => (
                                <TableRow key={client.id}>
                                    <TableCell>{client.rut}</TableCell>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            startIcon={<EditIcon/>}
                                            onClick={() => navigate(`/client/${client.id}`)}
                                        >
                                            Ingresar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
};

export default ClientList;