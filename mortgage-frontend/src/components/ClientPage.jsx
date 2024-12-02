import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import clientService from "../services/client.service.js";
import { Box, Typography, List, ListItem, ListItemButton, ListItemText, Drawer } from "@mui/material";

const ClientPage = () => {
    const { id } = useParams();
    const [rut, setRut] = useState("[no rut]");
    const [name, setName] = useState("[no name]");
    const [birthdate, setBirthdate] = useState("[no birthdate]");
    const navigate = useNavigate();

    useEffect(() => {
        clientService
            .get(id)
            .then((response) => {
                console.log("Client found.", response.data);
                const client = response.data;
                setRut(client.rut);
                setName(client.name);
                setBirthdate(client.birthdate);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id]);

    const handleClientOption = (option) => {
        if (option === "Simular crédito") {
            navigate(`/client/${id}/simulator`);
        } else if (option === "Pedir crédito") {
            navigate(`/client/${id}/addloan`);
        } else if (option === "Ver créditos") {
            navigate(`/client/${id}/loanlist`);
        }
    };

    const options = ["Simular crédito", "Pedir crédito", "Ver créditos"];

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            {/* Barra lateral */}
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 240,
                        boxSizing: "border-box",
                        height: "calc(100vh - 64px)", // Ajusta la altura para descontar la Navbar
                        mt: "64px", // Mueve hacia abajo para evitar solapamiento
                    },
                }}
            >
                <List>
                    {options.map((option) => (
                        <ListItem key={option} disablePadding>
                            <ListItemButton onClick={() => handleClientOption(option)}>
                                <ListItemText primary={option} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Contenido principal */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                    mt: "64px", // Altura de la barra de navegación
                    overflow: "hidden", // Evita scroll innecesario
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Información del Cliente
                </Typography>
                <Typography variant="body1">
                    <strong>RUT:</strong> {rut}
                </Typography>
                <Typography variant="body1">
                    <strong>Nombre:</strong> {name}
                </Typography>
                <Typography variant="body1">
                    <strong>Fecha de Nacimiento:</strong> {birthdate}
                </Typography>
            </Box>
        </Box>
    );
};

export default ClientPage;
