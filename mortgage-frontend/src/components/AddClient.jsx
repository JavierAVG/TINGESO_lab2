import clientService from "../services/client.service.js";
import {useState} from "react";
import {Box, Button, FormControl, FormLabel, TextField} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

const AddClient = () => {
    const [rut, setRut] = useState("");
    const [rutError, setRutError] = useState(false);
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const handleRut = (e) => {
        setRut(e.target.value);
        setRutError(!e.target.validity.valid);
    }
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleBirthdate = (e) => {
        setBirthdate(e.target.value);
    }

    const saveClient = () => {
        const data = {
            rut: rut,
            name: name,
            birthdate: birthdate
        };
        console.log("Data to save: ", data);
        clientService.create(data).then(response => {
            console.log("Client created. ", response.data);
        }).catch(e => {
            console.log("Client not created. ",e);
        });
    }

    return (
        <Box
            component="form"
            onSubmit={saveClient}
            alignItems="center">
            <h1>Agregar Cliente</h1>
            <hr/>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <TextField
                    required={true}
                    label="Rut"
                    variant="outlined"
                    value={rut}
                    onChange={handleRut}
                    error={rutError}
                    helperText={rutError ? "rut debe seguir formato xxxxxxxx-x" : "Ej: 12345678-9"}
                    slotProps={{htmlInput: {pattern: "[0-9]{8}-[0-9]{1}"} }}
                />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <TextField
                    required={true}
                    label="Nombre"
                    variant="outlined"
                    value={name}
                    onChange={handleName}
                />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <TextField
                    required={true}
                    variant="outlined"
                    value={birthdate}
                    onChange={handleBirthdate}
                    type="date"
                    sx={{
                        backgroundColor: 'white',
                        '& input::-webkit-calendar-picker-indicator': {
                            filter: 'invert(1)', // Cambia el color del ícono a negro
                        },
                    }}
                />
            </FormControl>

            <FormControl fullWidth>
                <Button
                    type="submit"
                    variant="contained"
                    color="info"
                    startIcon={<SaveIcon />}
                >
                    Guardar
                </Button>
            </FormControl>
        </Box>
    );
}

export default AddClient;