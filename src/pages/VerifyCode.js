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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
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

function VerifyCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!code) {
      setError('Vui lòng nhập mã xác nhận');
      setLoading(false);
      return;
    }

    const email = localStorage.getItem('reset_email');
    if (!email) {
      setError('Không tìm thấy email, vui lòng thử lại');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/password/check/token', {
        email: email,
        otp: code
      });

      if (response.status === 200) {
        setOpenDialog(true);
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setError('Mã xác nhận không chính xác hoặc đã hết hạn');
      } else {
        setError('Có lỗi xảy ra, vui lòng thử lại sau');
      }
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    setResetError('');
    const email = localStorage.getItem('reset_email');

    try {
      const response = await axiosInstance.post('/password/reset', {
        email: email,
        new_password: newPassword,
        c_new_password: confirmPassword
      });

      if (response.status === 200) {
        localStorage.removeItem('reset_email');
        navigate('/login');
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setResetError('Mật khẩu không hợp lệ hoặc không khớp');
      } else {
        setResetError('Có lỗi xảy ra, vui lòng thử lại sau');
      }
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
            Xác nhận mã
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#65676b',
              textAlign: 'center',
              mb: 2
            }}
          >
            Vui lòng nhập mã xác nhận đã được gửi đến email của bạn
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
                type="text"
                placeholder="Nhập mã xác nhận"
                size="small"
                variant="outlined"
                value={code}
                onChange={(e) => setCode(e.target.value)}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Xác nhận'}
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

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Đặt lại mật khẩu</DialogTitle>
          <DialogContent>
            {resetError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {resetError}
              </Alert>
            )}
            <StyledTextField
              autoFocus
              margin="dense"
              label="Mật khẩu mới"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <StyledTextField
              margin="dense"
              label="Xác nhận mật khẩu mới"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
            <Button onClick={handleResetPassword} variant="contained">
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default VerifyCode;
