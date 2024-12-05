import {useParams} from "react-router-dom";
import {useState} from "react";
import loanService from "../services/loan.service.js";
import {Box, Button, FormControl, FormLabel, MenuItem, Select, TextField} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

const AddLoan = () => {
    const {clientId} = useParams();
    const [type, setType] = useState("");                                        // tipo de crédito
    const [amount, setAmount] = useState("");                                    // monto del crédito
    const [interestRate, setInterestRate] = useState("");                        // tasa de interés anual
    const [duration, setDuration] = useState("");                                // plazo del crédito
    const [monthlyIncome, setMonthlyIncome] = useState("");                      // ingreso mensual
    const [employmentLongevity, setEmploymentLongevity] = useState("");          // antigüedad laboral
    const [totalDebt, setTotalDebt] = useState("");                              // deuda total
    const [propertyValue, setPropertyValue] = useState("");                      // valor de la propiedad
    const [accumulatedSalary, setAccumulatedSalary] = useState("");              // salario acumulado
    const [savingsAccountLongevity, setSavingsAccountLongevity] = useState("");  // antigüedad de la cuenta de ahorros

    const [docDicomHistory, setDocDicomHistory] = useState(null);                       // historial Dicom
    const [docIncomeProof, setDocIncomeProof] = useState(null);                         // comprobante de ingresos
    const [docAppraisalCertificate, setDocAppraisalCertificate] = useState(null);       // certificado de avalúo
    const [docCreditHistory, setDocCreditHistory] = useState(null);                     // historial crediticio
    const [docFirstHousingDeed, setDocFirstHousingDeed] = useState(null);               // escritura de primera vivienda
    const [docBusinessFinancialState, setDocBusinessFinancialState] = useState(null);   // estado financiero del negocio
    const [docBusinessPlan, setDocBusinessPlan] = useState(null);                       // plan de negocio
    const [docRemodelingBudget, setDocRemodelingBudget] = useState(null);               // presupuesto de remodelación

    const [rows, setRows] = useState(Array.from({ length: 12 }, () => ({
        id: null,
        salary: 0,
        withdrawal: 0,
        deposit: 0
    })));

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!await handleCheckDocuments()) { return }

        const loanDate = new Date().toISOString().split('T')[0]
        const loan = {
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

            // Subir los documentos
            await handleSubmitDocuments(response.data.id);

            // Subir los datos de la cuenta de ahorro
            const savingsAccount = {
                loanid: response.data.id,
                withdrawals: rows.map(row => row.withdrawal),
                deposits: rows.map(row => row.deposit),
                salaries: rows.map(row => row.salary)
            }
            loanService.saveSavings(savingsAccount).then(response => {
                console.log("Savings account saved successfully", response.data);
            }).catch(error => {
                console.error("Error saving savings account", error);
            });
        } catch (error) {
            console.error("Error saving loan", error);
            return;
        }


    };

    const handleCheckDocuments = async () => {
        // Validar que los documentos obligatorios estén cargados
        if (!docDicomHistory || !docIncomeProof || !docAppraisalCertificate) {
            alert("Debe subir los documentos obligatorios");
            return false;
        }
        if ((type === "Primera Vivienda" || type === "Segunda Vivienda") && !docCreditHistory) {
            alert("Debe subir el historial crediticio");
            return false;
        }
        if (type === "Segunda Vivienda" && !docFirstHousingDeed) {
            alert("Debe subir la escritura de la primera vivienda");
            return false;
        }
        if (type === "Propiedades Comerciales" && (!docBusinessFinancialState || !docBusinessPlan)) {
            alert("Debe subir los documentos obligatorios");
            return false;
        }
        if (type === "Remodelación" && !docRemodelingBudget) {
            alert("Debe subir el presupuesto de remodelación");
            return false;
        }
        return true;
    }

    const handleSubmitDocuments = async (loanId) => {
        // Subir los documentos
        try {
            const response = await loanService.saveDocument(loanId, "Historial DICOM", docDicomHistory);
            console.log("docDicomHistory uploaded successfully", response.data);
        } catch (error) { console.error("Error uploading document", error) }
        try {
            const response = await loanService.saveDocument(loanId, "Comprobante de Ingresos", docIncomeProof);
            console.log("docIncomeProof uploaded successfully", response.data);
        } catch (error) { console.error("Error uploading document", error) }
        try {
            const response = await loanService.saveDocument(loanId, "Certificado de Avalúo", docAppraisalCertificate);
            console.log("docAppraisalCertificate uploaded successfully", response.data);
        } catch (error) { console.error("Error uploading document", error) }


        if (type === "Primera Vivienda" || type === "Segunda Vivienda") {
            try {
                const response = await loanService.saveDocument(loanId, "Historial Crediticio", docCreditHistory);
                console.log("docCreditHistory uploaded successfully", response.data);
            } catch (error) { console.error("Error uploading document", error) }
        }

        if (type === "Segunda Vivienda") {
            try {
                const response = await loanService.saveDocument(loanId, "Escritura de Primera Vivienda", docFirstHousingDeed);
                console.log("docFirstHousingDeed uploaded successfully", response.data);
            } catch (error) { console.error("Error uploading document", error) }
        }

        if (type === "Propiedades Comerciales") {
            try {
                const response = await loanService.saveDocument(loanId, "Estado Financiero del Negocio", docBusinessFinancialState);
                console.log("docBusinessFinancialState uploaded successfully", response.data);
            } catch (error) { console.error("Error uploading document", error) }
            try {
                const response = await loanService.saveDocument(loanId, "Plan de Negocio", docBusinessPlan);
                console.log("docBusinessPlan uploaded successfully", response.data);
            } catch (error) { console.error("Error uploading document", error) }
        }

        if (type === "Remodelación") {
            try {
                const response = await loanService.saveDocument(loanId, "Presupuesto de Remodelación", docRemodelingBudget);
                console.log("docRemodelingBudget uploaded successfully", response.data);
            } catch (error) { console.error("Error uploading document", error) }
        }
    }

    const handleTableChange = (index, column, value) => {
        const updatedRows = [...rows];
        if (/^\d*$/.test(value)){
            updatedRows[index][column] = value === "" ? 0 : parseInt(value, 10);
            setRows(updatedRows);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            alignItems="center"
            sx={{
                height: "calc(100vh - 64px)",
                maxWidth: 600,
                margin: '0 auto',
                marginTop: "64px"
            }} // Establece un ancho máximo fijo y centra el formulario
        >
            <h1>Solicitar Crédito</h1>
            <hr/>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <FormLabel component="legend">Tipo de Crédito</FormLabel>
                <Select
                    required={true}
                    label="Tipo de Credito"
                    variant="outlined"
                    value={type}
                    onChange={e => setType(e.target.value)}
                    sx={{minWidth: 200, maxWidth: 500}} // Establece un ancho mínimo y máximo fijo
                >
                    <MenuItem value="Primera Vivienda">Primera Vivienda</MenuItem>
                    <MenuItem value="Segunda Vivienda">Segunda Vivienda</MenuItem>
                    <MenuItem value="Propiedades Comerciales">Propiedades Comerciales</MenuItem>
                    <MenuItem value="Remodelación">Remodelación</MenuItem>
                </Select>
            </FormControl>

            <h3>Ingresar Documentos</h3>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <FormLabel component="legend">Historial DICOM</FormLabel>
                <input type="file" onChange={(event) => setDocDicomHistory(event.target.files[0])}/>
            </FormControl>
            <FormControl fullWidth sx={{marginBottom: 2}}>
                <FormLabel component="legend">Comprobante de Ingresos</FormLabel>
                <input type="file" onChange={(event) => setDocIncomeProof(event.target.files[0])}/>
            </FormControl>
            <FormControl fullWidth sx={{marginBottom: 2}}>
                <FormLabel component="legend">Certificado de Avalúo</FormLabel>
                <input type="file" onChange={(event) => setDocAppraisalCertificate(event.target.files[0])}/>
            </FormControl>

            {(type === "Primera Vivienda" || type === "Segunda Vivienda") && (
                <FormControl fullWidth sx={{marginBottom: 2}}>
                    <FormLabel component="legend">Historial Crediticio</FormLabel>
                    <input type="file" onChange={(event) => setDocCreditHistory(event.target.files[0])}/>
                </FormControl>
            )}

            {type === "Segunda Vivienda" && (
                <FormControl fullWidth sx={{marginBottom: 2}}>
                    <FormLabel component="legend">Escritura de Primera Vivienda</FormLabel>
                    <input type="file" onChange={(event) => setDocFirstHousingDeed(event.target.files[0])}/>
                </FormControl>
            )}

            {type === "Propiedades Comerciales" && (
                <>
                    <FormControl fullWidth sx={{marginBottom: 2}}>
                        <FormLabel component="legend">Estado Financiero del Negocio</FormLabel>
                        <input type="file" onChange={(event) => setDocBusinessFinancialState(event.target.files[0])}/>
                    </FormControl>
                    <FormControl fullWidth sx={{marginBottom: 2}}>
                        <FormLabel component="legend">Plan de Negocio</FormLabel>
                        <input type="file" onChange={(event) => setDocBusinessPlan(event.target.files[0])}/>
                    </FormControl>
                </>
            )}

            {type === "Remodelación" && (
                <FormControl fullWidth sx={{marginBottom: 2}}>
                    <FormLabel component="legend">Presupuesto de Remodelación</FormLabel>
                    <input type="file" onChange={(event) => setDocRemodelingBudget(event.target.files[0])}/>
                </FormControl>
            )}

            <h3>Ingresar Datos</h3>

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
                        if (/^\d*$/.test(e.target.value) && e.target.value <= 20) setDuration(e.target.value)
                    }} // Solo permite números
                />
            </FormControl>

            <FormControl fullWidth sx={{marginBottom: 2}}>
                <TextField
                    required={true}
                    label="Monto"
                    variant="outlined"
                    value={amount}
                    onChange={e => {
                        if (/^\d*$/.test(e.target.value) && e.target.value <= 999999999) setAmount(e.target.value)
                    }}
                />
            </FormControl>

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

            <h3>Cuenta de Ahorro</h3>

            Complete la siguiente tabla con los salarios, retiros y depósitos correspondientes de su cuenta de ahorro
            durante los últimos 12 meses. Asegúrese de que estén en orden desde el mes más antiguo al más reciente.

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

            <hr/>
            <FormControl fullWidth sx={{marginBottom: 10}}>
                <Button
                    type="submit"
                    variant="contained"
                    color="info"
                    startIcon={<SaveIcon/>}
                >
                    Solicitar Crédito
                </Button>
            </FormControl>

        </Box>
    );

}

export default AddLoan;