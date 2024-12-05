import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import loanService from "../services/loan.service.js";
import {Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, TextField} from "@mui/material";
import clientService from "../services/client.service.js";
import SaveIcon from "@mui/icons-material/Save";
import statusService from "../services/status.service.js";
import evaluateService from "../services/evaluate.service.js";

const EvaluateLoan = () => {
    const navigate = useNavigate();

    const {loanId} = useParams();
    const [clientId, setClientId] = useState("");                                // id del cliente
    const [loanDate, setLoanDate] = useState("");                                // fecha de solicitud
    const [type, setType] = useState("");                                        // tipo de crédito
    const [amount, setAmount] = useState("");                                    // monto del crédito
    const [interestRate, setInterestRate] = useState("");                        // tasa de interés anual
    const [duration, setDuration] = useState("");                                // plazo del crédito

    const [monthlyIncome, setMonthlyIncome] = useState("");                      // ingreso mensual *
    const [employmentLongevity, setEmploymentLongevity] = useState("");          // antigüedad laboral *
    const [totalDebt, setTotalDebt] = useState("");                              // deuda total *
    const [propertyValue, setPropertyValue] = useState("");                      // valor de la propiedad *
    const [accumulatedSalary, setAccumulatedSalary] = useState("");              // salario acumulado *
    const [savingsAccountLongevity, setSavingsAccountLongevity] = useState("");  // antigüedad de la cuenta de ahorros *
    const [dicom, setDicom] = useState(false);                                  // DICOM *

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [clientBirthdate, setClientBirthdate] = useState("");                  // fecha de nacimiento del cliente

    const [evaluationResponse, setEvaluationResponse] = useState([""]);

    useEffect(() => {
        loanService.get(loanId).then(response => {
            console.log("Loan found.", response.data);
            const loan = response.data;
            setClientId(loan.clientid);
            setType(loan.type);
            setAmount(loan.amount);
            setInterestRate(loan.interestrate);
            setDuration(loan.duration);
            setMonthlyIncome(loan.monthlyincome);
            setEmploymentLongevity(loan.employmentlongevity);
            setTotalDebt(loan.totaldebt);
            setPropertyValue(loan.propertyvalue);
            setAccumulatedSalary(loan.accumulatedsalary);
            setSavingsAccountLongevity(loan.savingsaccountlongevity);
            setLoanDate(loan.loandate);

            clientService.get(loan.clientid).then(response => {
                setClientBirthdate(response.data.birthdate);
            }).catch(error => {
                console.error("Error fetching client", error);
            });
        }).catch(error => {
            console.error("Error fetching loan", error);
        });

        fetchDocuments();
    }, [loanId]);

    const fetchDocuments = async () => {
        try {
            const response = await loanService.getDocumentsByLoanId(loanId);
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
            console.error("Error fetching documents", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        const loan = {
            id: loanId,
            clientid: clientId,
            type: type,
            amount: amount,
            interestrate: interestRate,
            duration: duration,
            monthlyincome: monthlyIncome,
            employmentlongevity: employmentLongevity,
            totaldebt: totalDebt,
            propertyvalue: propertyValue,
            accumulatedsalary: accumulatedSalary,
            savingsaccountlongevity: savingsAccountLongevity,
            loandate: loanDate
        }

        try {
            const response = await loanService.save(loan);
            console.log("Loan saved successfully", response.data);
        } catch (error) { console.error("Error saving loan", error); }
    }

    const handleEvaluate = async () => {
        const data = {
            annualInterest: interestRate,
            monthlyIncome: monthlyIncome,
            dicom: dicom,
            employmentLongevity: employmentLongevity,
            totalDebt: totalDebt,
            loanType: type,
            loanAmount: amount,
            propertyValue: propertyValue,
            clientBirthdate: clientBirthdate,
            loanDate: loanDate,
            loanTerm: duration
        }
        console.log(data);
        evaluateService.evaluate(data).then(response => {
            console.log("Evaluation response: ", response.data);
            setEvaluationResponse(response.data);
        }).catch(e => { console.log(e); });
    }

    // statusId === loanId
    const handlePreApproval = (statusId) => {
        const confirm = window.confirm("¿Está seguro que desea pre-aprobar el crédito?");
        if (confirm) {
            statusService.updateState(statusId, "Pre-Aprobado").then(response => {
                console.log("Loan approved. ", response.data);
                navigate("/loans");
            }).catch(e => { console.log(e); });
        }
    }

    const handleRejection = (statusId) => {
        const confirm = window.confirm("¿Está seguro que desea rechazar el crédito?");
        if (confirm) {
            statusService.updateState(statusId, "Rechazado").then(response => {
                console.log("Loan rejected. ", response.data);
                navigate("/loans");
            }).catch(e => { console.log(e); });
        }
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            component="form"
            onSubmit={handleSave}
            alignItems="center"
            sx={{
                height: "calc(100vh - 64px)",   // Restar la altura de la Navbar
                display: "flex",                // Organización flex
                flexDirection: "column",        // Elementos apilados verticalmente
                padding: 2,                     // Espaciado interno
                boxSizing: "border-box",        // Calcular tamaño correctamente
                marginTop: "64px",              // Espacio para la Navbar
            }}>
            <h1>Evaluación de Crédito</h1>
            <hr/>

            <h2>Tipo: {type}</h2>

            <h3>Monto: {amount}</h3>
            <h3>Tasa de Interés Anual: {interestRate}</h3>
            <h3>Duración: {duration}</h3>
            <hr/>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <TextField
                    required={true}
                    label="Ingreso Mensual"
                    variant="outlined"
                    value={monthlyIncome}
                    onChange={e => {
                        if (/^\d*$/.test(e.target.value) && e.target.value <= 999999999) setMonthlyIncome(e.target.value)
                    }}
                />
            </FormControl>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <TextField
                    required={true}
                    label="Antigüedad Laboral"
                    variant="outlined"
                    value={employmentLongevity}
                    onChange={e => {
                        if (/^\d*$/.test(e.target.value) && e.target.value <= 50) setEmploymentLongevity(e.target.value)
                    }}
                />
            </FormControl>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <TextField
                    required={true}
                    label="Deuda Total"
                    variant="outlined"
                    value={totalDebt}
                    onChange={e => {
                        if (/^\d*$/.test(e.target.value) && e.target.value <= 999999999) setTotalDebt(e.target.value)
                    }}
                />
            </FormControl>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <TextField
                    required={true}
                    label="Valor de la Propiedad"
                    variant="outlined"
                    value={propertyValue}
                    onChange={e => {
                        if (/^\d*$/.test(e.target.value) && e.target.value <= 999999999) setPropertyValue(e.target.value)
                    }}
                />
            </FormControl>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <TextField
                    required={true}
                    label="Salario Acumulado"
                    variant="outlined"
                    value={accumulatedSalary}
                    onChange={e => {
                        if (/^\d*$/.test(e.target.value) && e.target.value <= 999999999) setAccumulatedSalary(e.target.value)
                    }}
                />
            </FormControl>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <TextField
                    required={true}
                    label="Antigüedad de la Cuenta de Ahorros"
                    variant="outlined"
                    value={savingsAccountLongevity}
                    onChange={e => {
                        if (/^\d*$/.test(e.target.value) && e.target.value <= 50) setSavingsAccountLongevity(e.target.value)
                    }}
                />
            </FormControl>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={dicom}
                            onChange={(e) => setDicom(e.target.checked)}
                            name="dicom"
                            color="primary"
                        />
                    }
                    label="DICOM"
                />
            </FormControl>

            {documents.filter(doc => doc.name === "Historial DICOM")
                .map((doc, index) => (
                    <Box key={index} sx={{marginBottom: 2}}>
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
                    <Box key={index} sx={{marginBottom: 2}}>
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
                    <Box key={index} sx={{marginBottom: 2}}>
                        <h3>{doc.name}</h3>
                        <iframe
                            src={doc.url}
                            width="800px"
                            height="500px"
                            title={doc.name}
                        ></iframe>
                    </Box>))
            }

            {(type === "Primera Vivienda" || type === "Segunda Vivienda") && (
                documents.filter(doc => doc.name === "Historial Crediticio")
                    .map((doc, index) => (
                        <Box key={index} sx={{marginBottom: 2}}>
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
                        <Box key={index} sx={{marginBottom: 2}}>
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
                        <Box key={index} sx={{marginBottom: 2}}>
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
                        <Box key={index} sx={{marginBottom: 2}}>
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
                        <Box key={index} sx={{marginBottom: 2}}>
                            <h3>{doc.name}</h3>
                            <iframe
                                src={doc.url}
                                width="800px"
                                height="500px"
                                title={doc.name}
                            ></iframe>
                        </Box>))
            )}

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <Button
                    type="submit"
                    variant="contained"
                    color="info"
                    startIcon={<SaveIcon/>}
                >
                    Guardar Cambios
                </Button>
            </FormControl>

            <FormControl fullWidth>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEvaluate}
                >
                    Evaluar
                </Button>
            </FormControl>

            {evaluationResponse.length === 0 ? (
                <>
                    <h3>Resultado de la Evaluación</h3>
                    No se encontraron errores en la evaluación. Puede proceder a pre-aprobar el crédito.
                </>
            ) : (
                <>
                    <h3>Resultado de la Evaluación</h3>
                    <ul>
                        {evaluationResponse.map((error, index) => {
                            let errorMessages = [];
                            switch (error) {
                                case "R1":
                                    errorMessages.push("Falla respecto a regla 1");
                                    break;
                                case "R2":
                                    errorMessages.push("Falla respecto a regla 2");
                                    break;
                                case "R3":
                                    errorMessages.push("Falla respecto a regla 3");
                                    break;
                                case "R4":
                                    errorMessages.push("Falla respecto a regla 4");
                                    break;
                                case "R5":
                                    errorMessages.push("Falla respecto a regla 5");
                                    break;
                                case "R6":
                                    errorMessages.push("Falla respecto a regla 6");
                                    break;
                            }
                            return (
                                <li key={index}>
                                    {errorMessages.map((msg, i) => (
                                        <div key={i}>{msg}</div>
                                    ))}
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}

            <FormControl fullWidth sx={{marginBottom: 2, marginTop: 2}}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handlePreApproval(loanId)}
                >
                    Pre-Aprobar
                </Button>
            </FormControl>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRejection(loanId)}
                >
                    Rechazar
                </Button>
            </FormControl>

        </Box>
    );
};

export default EvaluateLoan;