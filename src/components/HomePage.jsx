import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      p: 4,
      textAlign: 'center'
    }}>
      <Typography variant="h3" component="h1" gutterBottom>
        ສະບາຍດີອ້າຍຄົນຫລໍໍ່!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        You have successfully logged in.
      </Typography>
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleLogout}
        sx={{ px: 4, py: 1.5 }}
      >
        Log Out
      </Button>
    </Box>
  );
};

export default HomePage;