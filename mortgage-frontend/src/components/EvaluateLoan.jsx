import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import loanService from "../services/loan.service.js";
import {Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, TextField} from "@mui/material";
import clientService from "../services/client.service.js";
import SaveIcon from "@mui/icons-material/Save";
import statusService from "../services/status.service.js";
import evaluateService from "../services/evaluate.service.js";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

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

    const [clientName, setClientName] = useState("");                            // nombre del cliente
    const [clientRut, setClientRut] = useState("");                              // rut del cliente
    const [clientBirthdate, setClientBirthdate] = useState("");                  // fecha de nacimiento del cliente

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [rows, setRows] = useState(Array.from({ length: 12 }, () => ({
        id: null,
        salary: 0,
        withdrawal: 0,
        deposit: 0
    })));

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
                console.log("Client found.", response.data);
                setClientName(response.data.name);
                setClientRut(response.data.rut);
                setClientBirthdate(response.data.birthdate);
            }).catch(error => {
                console.error("Error fetching client", error);
            });
        }).catch(error => {
            console.error("Error fetching loan", error);
        });

        fetchSavingsAccount();

        fetchDocuments();
    }, [loanId]);

    const fetchSavingsAccount = () => {
        loanService.getSavingsByLoanId(loanId).then(response => {
            const updatedRows = response.data.map((months) => ({
                id: months.id,
                salary: months.salary,
                withdrawal: months.withdrawal,
                deposit: months.deposit
            }));
            setRows(updatedRows);
        }).catch((error) => { console.error("Failed to fetch savings accounts", error); });
    };

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
            const response = await loanService.update(loan);
            console.log("Loan updated.", response.data);
            alert("Crédito actualizado correctamente.");
        } catch (error) { console.error("Error updating loan", error); }

        const savingsAccount = {
            loanid: loanId,
            ids: rows.map(row => row.id),
            withdrawals: rows.map(row => row.withdrawal),
            deposits: rows.map(row => row.deposit),
            salaries: rows.map(row => row.salary)
        }
        loanService.updateSavings(savingsAccount).then(response => {
            console.log("Savings account updated.", response.data);
            alert("Cuentas de ahorro actualizadas correctamente.");
        }).catch(error => {
            console.error("Error updating savings account", error);
        });
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

    const handleTableChange = (index, column, value) => {
        const updatedRows = [...rows];
        if (/^\d*$/.test(value)){
            updatedRows[index][column] = value === "" ? 0 : parseInt(value, 10);
            setRows(updatedRows);
        }
    };

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

            <h3>Cliente: {clientName}</h3>
            <ul>
                <li>Rut: {clientRut}</li>
                <li>Fecha de Nacimiento: {clientBirthdate}</li>
            </ul>

            <h3>Tipo: {type}</h3>
            <ul>
                <li>Monto: {amount}</li>
                <li>Tasa de Interés Anual: {interestRate}</li>
                <li>Duración: {duration}</li>
            </ul>
            <hr/>

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
                    label="Antigüedad Laboral"
                    variant="outlined"
                    value={employmentLongevity}
                    onChange={e => {
                        if (/^\d*$/.test(e.target.value) && e.target.value <= 50) setEmploymentLongevity(e.target.value)
                    }}
                />
            </FormControl>

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
                    label="Antigüedad de la Cuenta de Ahorros"
                    variant="outlined"
                    value={savingsAccountLongevity}
                    onChange={e => {
                        if (/^\d*$/.test(e.target.value) && e.target.value <= 50) setSavingsAccountLongevity(e.target.value)
                    }}
                />
            </FormControl>

            <FormControl>
                <h3>Cuentas de Ahorro</h3>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Mes</TableCell>
                                <TableCell align="center">Salario</TableCell>
                                <TableCell align="center">Retiro</TableCell>
                                <TableCell align="center">Depósito</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            value={row.salary}
                                            onChange={(e) => handleTableChange(index, "salary", e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            value={row.withdrawal}
                                            onChange={(e) => handleTableChange(index, "withdrawal", e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            value={row.deposit}
                                            onChange={(e) => handleTableChange(index, "deposit", e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </FormControl>

            {/* Botones */}
            <FormControl fullWidth sx={{marginBottom: 2}}>
                <Button
                    variant="contained"
                    color="info"
                    startIcon={<SaveIcon/>}
                    onClick={handleSave}
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
                                    errorMessages.push("Falla en R1: " +
                                        "Relación cuota/ingreso es mayor que el umbral establecido (35%).");
                                    break;
                                case "R2":
                                    errorMessages.push("Falla en R2: " +
                                        "Problemas con el historial crediticio del cliente en DICOM.");
                                    break;
                                case "R3":
                                    errorMessages.push("Falla en R3: " +
                                        "Se requiere que el cliente tenga al menos 1 a 2 años de antigüedad en su empleo actual.");
                                    break;
                                case "R4":
                                    errorMessages.push("Falla en R4: " +
                                        "Relación deuda/ingreso es mayor que el umbral establecido (50%).");
                                    break;
                                case "R5":
                                    errorMessages.push("Falla en R5: " +
                                        "Se supero el monto máximo de financiamiento permitido para el tipo de crédito.");
                                    break;
                                case "R6":
                                    errorMessages.push("Falla en R6: " +
                                        "Cliente supera la edad maxima permitida al momento de finalizar el préstamo.");
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
            <hr/>

        </Box>
    );
};

export default EvaluateLoan;