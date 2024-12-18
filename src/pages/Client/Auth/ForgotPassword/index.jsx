import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  styled,
  Alert,
  CircularProgress
} from '@mui/material';
import axiosInstance from '@/axios';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  maxWidth: 396,
  margin: '0 auto',
  background: '#ffffff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.15)',
  borderRadius: '12px',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column', 
  gap: theme.spacing(2.5)
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#f5f6f7',
    height: '52px',
    '& fieldset': {
      borderColor: '#e4e6eb',
      borderWidth: '1.5px'
    },
    '&:hover fieldset': {
      borderColor: '#1877f2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1877f2',
      borderWidth: '2px',
    }
  },
  '& .MuiInputLabel-root': {
    color: '#65676b',
    fontSize: '16px',
    fontWeight: 500
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1877f2',
  padding: '12px 16px',
  borderRadius: '8px', 
  fontSize: '20px',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#166fe5',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
  }
}));

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email) {
      setError('Vui lòng nhập email');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(`password/forgot`, {
        email: email
      });

      if (response.status === 200) {
        localStorage.setItem('reset_email', email);
      } else {
        throw new Error(response.data.message);
      }
      navigate('/verify-code');
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại sau');
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0f2f5 0%, #e3e6ea 100%)',
      py: 4
    }}>
      <Container maxWidth="xs">
        <StyledPaper elevation={0}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #1877f2, #00c6ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
              mb: 3
            }}
          >
            Quên mật khẩu
          </Typography>

          <StyledForm onSubmit={handleSubmit}>
            {error && (
              <Alert
                severity="error"
                sx={{
                  width: '100%',
                  borderRadius: '8px'
                }}
              >
                {error}
              </Alert>
            )}

            <Box>
              <StyledTextField
                fullWidth
                type="email"
                placeholder="Nhập email của bạn"
                size="small"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </Box>

            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 1 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Gửi mã xác nhận'}
            </SubmitButton>

            <Box sx={{
              borderTop: '2px solid #dadde1',
              margin: '20px 0',
              padding: '20px 0 0',
              textAlign: 'center'
            }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button
                  variant="text"
                  sx={{
                    color: '#1877f2',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 500
                  }}
                >
                  Quay lại đăng nhập
                </Button>
              </Link>
            </Box>
          </StyledForm>
        </StyledPaper>
      </Container>
    </Box>
  );
}

export default ForgotPassword;
