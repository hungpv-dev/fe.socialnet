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
import useAuth from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setUser } from '@/actions/user';

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

const RegisterButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#42b72a',
  padding: '12px 16px',
  borderRadius: '8px',
  fontSize: '20px',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColerrorsor: '#36a420',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
  }
}));

const Register = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess('');

    if (!fullName || !email || !password || !confirmPassword) {
      setErrors({message: 'Vui lòng điền đầy đủ thông tin'});
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrors({message: 'Mật khẩu nhập lại không khớp'});
      setLoading(false);
      return;
    }

    try {
      const response = await auth.register(email, fullName, password, confirmPassword);
      if (response.status === 201) {
        let loginResponse = await auth.login(email, password);
        if (loginResponse) {
          let profile = await auth.me();
          dispatch(setUser(profile.data));
          window.location.href = '/profile-avatar';
        }
      } else {
        setErrors(response.data);
      }
    } catch (err) {
      if (err.status === 401) {
        setErrors({message: 'Không thể xác thực client'});
      } else if (err.status === 500) {
        setErrors({message: 'Tài khoản của bạn đã bị khóa'});
      } else if (err.status === 422) {
        setErrors(err.response.data);
      } else {
        setErrors({message: 'Có lỗi xảy ra, vui lòng thử lại sau'});
      }
    }
    setLoading(false);
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
            Socialnet
          </Typography>

          <StyledForm onSubmit={handleSubmit}>
            {errors.message && (
              <Alert 
                severity="error" 
                sx={{ 
                  width: '100%',
                  borderRadius: '8px'
                }}
              >
                {errors.message}
              </Alert>
            )}

            {success && (
              <Alert
                severity="success"
                sx={{
                  width: '100%',
                  borderRadius: '8px'
                }}
              >
                {success}
              </Alert>
            )}

            <Box>
              <StyledTextField
                fullWidth
                placeholder="Họ và tên"
                size="small"
                variant="outlined"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="off"
                error={!!errors?.errors?.name}
                helperText={errors?.errors?.name?.[0]}
              />
            </Box>

            <Box>
              <StyledTextField
                fullWidth
                type="email"
                placeholder="Email"
                size="small"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                error={!!errors?.errors?.email}
                helperText={errors?.errors?.email?.[0]}
              />
            </Box>

            <Box>
              <StyledTextField
                fullWidth
                type="password"
                placeholder="Mật khẩu"
                size="small"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                error={!!errors?.errors?.password}
                helperText={errors?.errors?.password?.[0]}
              />
            </Box>

            <Box>
              <StyledTextField
                fullWidth
                type="password"
                placeholder="Nhập lại mật khẩu"
                size="small"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                error={!!errors?.errors?.c_password}
                helperText={errors?.errors?.c_password?.[0]}
              />
            </Box>

            <RegisterButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 1 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng ký'}
            </RegisterButton>

            <Box sx={{
              borderTop: '2px solid #dadde1',
              margin: '20px 0',
              padding: '20px 0 0'
            }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/login')}
                sx={{
                  background: '#1877f2',
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '17px',
                  fontWeight: 'bold',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    background: '#166fe5',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                Đã có tài khoản
              </Button>
            </Box>
          </StyledForm>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default Register;
