import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleHomeClick = () => { navigate('/') };
    const handleClientsClick = () => { navigate('/clients') };

    return (
        <Box sx={{ width: '100%' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Button color="inherit" onClick={handleHomeClick}>
                        <Typography variant="h5">HOME</Typography>
                    </Button>
                    <Button color="inherit" onClick={handleClientsClick}>
                        <Typography variant="h6">Clientes</Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;