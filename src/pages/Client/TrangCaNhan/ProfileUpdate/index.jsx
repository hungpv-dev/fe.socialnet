import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axiosInstance from '@/axios';
import { setUser } from '@/actions/user';
import { PhotoCamera } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '12px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  marginBottom: theme.spacing(3)
}));

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3)
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#dddfe2',
      borderRadius: '8px'
    },
    '&:hover fieldset': {
      borderColor: '#1877f2'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1877f2',
      borderWidth: '2px'
    }
  }
});

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1877f2',
  padding: '12px 16px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#166fe5'
  }
}));

function ProfileUpdate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    birthday: '',
    address: '',
    hometown: '',
    relationship: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        gender: user.gender || '',
        birthday: user.birthday || '',
        address: user.address || '',
        hometown: user.hometown || '',
        relationship: user.relationship || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.put('/user/profile/update', formData);

      if (response.status === 200) {
        dispatch(setUser({
          ...user,
          ...response.data.user
        }));
        
        navigate('/friends/suggestions');
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        Object.keys(errors).forEach(key => {
          setError(errors[key][0]);
        });
      } else {
        setError('Có lỗi xảy ra khi cập nhật thông tin');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 4, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1c1e21' }}>
          Cập nhật thông tin cá nhân
        </Typography>

        <StyledPaper>
          <StyledForm onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ borderRadius: '8px' }}>
                {error}
              </Alert>
            )}

            <StyledTextField
              fullWidth
              label="Họ và tên"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <StyledTextField
              fullWidth
              label="Số điện thoại"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel>Giới tính</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                label="Giới tính"
              >
                <MenuItem value="male">Nam</MenuItem>
                <MenuItem value="female">Nữ</MenuItem>
                <MenuItem value="other">Khác</MenuItem>
              </Select>
            </FormControl>

            <StyledTextField
              fullWidth
              label="Ngày sinh"
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <StyledTextField
              fullWidth
              label="Địa chỉ hiện tại"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

            <StyledTextField
              fullWidth
              label="Quê quán"
              name="hometown"
              value={formData.hometown}
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel>Tình trạng mối quan hệ</InputLabel>
              <Select
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                label="Tình trạng mối quan hệ"
              >
                <MenuItem value="single">Độc thân</MenuItem>
                <MenuItem value="married">Đã kết hôn</MenuItem>
                <MenuItem value="divorced">Đã ly hôn</MenuItem>
                <MenuItem value="widowed">Góa phụ/phu</MenuItem>
              </Select>
            </FormControl>

            <SubmitButton
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
            </SubmitButton>
          </StyledForm>
        </StyledPaper>
      </Container>
    </Box>
  );
}

export default ProfileUpdate;
