import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import loanService from "../services/loan.service.js";
import {Box, CircularProgress, FormControl, TextField} from "@mui/material";

const EvaluateLoan = () => {
    const { id } = useParams();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await loanService.getDocumentsByLoanId(id);
                const documents = response.data.map(doc => {
                    const byteCharacters = atob(doc.file);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: "application/pdf" });
                    const url = URL.createObjectURL(blob);
                    return { ...doc, url };
                });
                setDocuments(documents);
            } catch (error) {
                setError("Error fetching documents");
                console.error("Error fetching documents", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Box
            sx={{
                height: "calc(100vh - 64px)",   // Restar la altura de la Navbar
                display: "flex",                // Organización flex
                flexDirection: "column",        // Elementos apilados verticalmente
                padding: 2,                     // Espaciado interno
                boxSizing: "border-box",        // Calcular tamaño correctamente
                marginTop: "64px",              // Espacio para la Navbar
            }}>

            {documents.filter(doc => doc.name === "Historial DICOM")
                .map((doc, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <h3>{doc.name}</h3>
                        <iframe
                            src={doc.url}
                            width="800px"
                            height="500px"
                            title={doc.name}
                        ></iframe>
                    </Box>))
            }

            {documents.filter(doc => doc.name === "Comprobante de Ingresos")
                .map((doc, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <h3>{doc.name}</h3>
                        <iframe
                            src={doc.url}
                            width="800px"
                            height="500px"
                            title={doc.name}
                        ></iframe>
                    </Box>))
            }

            {documents.filter(doc => doc.name === "Certificado de Avalúo")
                .map((doc, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <h3>{doc.name}</h3>
                        <iframe
                            src={doc.url}
                            width="800px"
                            height="500px"
                            title={doc.name}
                        ></iframe>
                    </Box>))
            }

            <FormControl fullWidth sx={{ marginTop: 2 }}>
                <TextField
                    required
                    label="Nombre"
                    variant="outlined"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </FormControl>

            {(type === "Primera Vivienda" || type === "Segunda Vivienda") && (
                documents.filter(doc => doc.name === "Historial Crediticio")
                    .map((doc, index) => (
                        <Box key={index} sx={{ marginBottom: 2 }}>
                            <h3>{doc.name}</h3>
                            <iframe
                                src={doc.url}
                                width="800px"
                                height="500px"
                                title={doc.name}
                            ></iframe>
                        </Box>))
            )}

            {type === "Segunda Vivienda" && (
                documents.filter(doc => doc.name === "Escritura de Primera Vivienda")
                    .map((doc, index) => (
                        <Box key={index} sx={{ marginBottom: 2 }}>
                            <h3>{doc.name}</h3>
                            <iframe
                                src={doc.url}
                                width="800px"
                                height="500px"
                                title={doc.name}
                            ></iframe>
                        </Box>))
            )}

            {type === "Propiedades Comerciales" && (
                documents.filter(doc => doc.name === "Estado Financiero del Negocio")
                    .map((doc, index) => (
                        <Box key={index} sx={{ marginBottom: 2 }}>
                            <h3>{doc.name}</h3>
                            <iframe
                                src={doc.url}
                                width="800px"
                                height="500px"
                                title={doc.name}
                            ></iframe>
                        </Box>))
            )}

            {type === "Propiedades Comerciales" && (
                documents.filter(doc => doc.name === "Plan de Negocio")
                    .map((doc, index) => (
                        <Box key={index} sx={{ marginBottom: 2 }}>
                            <h3>{doc.name}</h3>
                            <iframe
                                src={doc.url}
                                width="800px"
                                height="500px"
                                title={doc.name}
                            ></iframe>
                        </Box>))
            )}

            {type === "Remodelación" && (
                documents.filter(doc => doc.name === "Presupuesto de Remodelación")
                    .map((doc, index) => (
                        <Box key={index} sx={{ marginBottom: 2 }}>
                            <h3>{doc.name}</h3>
                            <iframe
                                src={doc.url}
                                width="800px"
                                height="500px"
                                title={doc.name}
                            ></iframe>
                        </Box>))
            )}

        </Box>
    );
};

export default EvaluateLoan;