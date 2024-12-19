import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/actions/user';
import axiosInstance from '@/axios';
import { toast } from 'react-toastify';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField,
  styled,
  Avatar,
  IconButton
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ContentPaste from '@mui/icons-material/ContentPaste';
import LockIcon from '@mui/icons-material/Lock';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  marginBottom: theme.spacing(3),
  background: '#ffffff',
  maxWidth: '350px',
  margin: '0 auto'
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  border: '4px solid #fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
}));

const UploadButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1877f2',
  padding: '10px 20px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#166fe5'
  }
}));

function ProfileUpdateAvatar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "/user_default.png");
  const [caption, setCaption] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [loading, setLoading] = useState(false);
  const captionRef = useRef(null);

  useEffect(() => {
    const checkLogin = async () => {
      if (user && !user.is_login) {
        try {
          const response = await axiosInstance.post('/user/login');
          if (response.status === 200) {
            dispatch(setUser({
              ...user,
              ...response.data,
              is_login: true
            }));
          }
        } catch (error) {
          console.error('Lỗi khi cập nhật trạng thái đăng nhập:', error);
        }
      }
    };

    checkLogin();
  }, [user, dispatch]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Vui lòng chọn file ảnh hợp lệ!');
        return;
      }
      setSelectedAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handlePasteAvatar = async (event) => {
    event.preventDefault();
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type);
            const file = new File([blob], "pasted-image.png", { type });
            setSelectedAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
            return;
          }
        }
      }
      toast.warning('Không tìm thấy ảnh trong clipboard!');
    } catch (err) {
      toast.error('Không thể dán ảnh từ clipboard');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!selectedAvatar) {
        toast.warning('Vui lòng tải lên ảnh đại diện!');
        return;
      }

      const formData = new FormData();
      formData.append('avatar', selectedAvatar);
      formData.append('content', caption);
      formData.append('status', privacy);

      const response = await axiosInstance.post('/user/avatar/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        console.log(response.data);
        dispatch(setUser({
          ...user,
          ...response.data.user
        }));
        toast.success('Cập nhật ảnh đại diện thành công!');
        navigate('/profile-update');
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật ảnh đại diện');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 4, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Container maxWidth="sm">
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1c1e21', textAlign: 'center' }}>
          Cập nhật ảnh đại diện
        </Typography>

        <StyledPaper>
          <form onSubmit={handleSubmit}>
            <LargeAvatar src={avatarPreview || user?.avatar} />
            
            <Box sx={{ display: 'flex', gap: 1, mb: 3, justifyContent: 'center' }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <Button
                  variant="outlined"
                  component="span"
                  size="small"
                  startIcon={<PhotoCamera />}
                  sx={{ borderColor: '#1877f2', color: '#1877f2' }}
                >
                  Chọn ảnh
                </Button>
              </label>
            </Box>

            <TextField
              fullWidth
              placeholder="Nói gì đó về ảnh của bạn..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              onPaste={handlePasteAvatar}
              multiline
              rows={2}
              sx={{ mb: 2, '& .MuiInputBase-input': { fontSize: '14px' } }}
              inputRef={captionRef}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <IconButton size="small" sx={{ mr: 1 }}>
                <LockIcon fontSize="small" />
              </IconButton>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                >
                  <MenuItem value="public">Công khai</MenuItem>
                  <MenuItem value="friend">Bạn bè</MenuItem>
                  <MenuItem value="private">Chỉ mình tôi</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <UploadButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading || !selectedAvatar}
            >
              {loading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
            </UploadButton>

            <Button
              variant="text"
              fullWidth
              onClick={() => navigate('/profile-update')}
              sx={{ mt: 2 }}
            >
              Bỏ qua
            </Button>
          </form>
        </StyledPaper>
      </Container>
    </Box>
  );
}

export default ProfileUpdateAvatar;
