import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SendIcon from '@mui/icons-material/Send';
import styles from "./main.scss";
import React, { useEffect, useState } from 'react';
import Message from '../Message';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

function Content() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [selectImages, setSelectImages] = useState([]);
  const [viewSelectImages, setViewSelectImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    { id: 1, me: false },
    { id: 2, me: true },
    { id: 3, me: true },
    { id: 4, me: false, rep: { message: 'Đã bảo là không được rồi' } },
    { id: 5, me: false },
    { id: 6, me: true },
    { id: 7, me: false },
    { id: 8, me: false },
    { id: 9, me: true, rep: { message: 'Lại là joinny đây' } },
    { id: 10, me: true },
    { id: 11, me: false },
    { id: 12, me: false },
    {
      id: 13, me: true, send: [
        { avatar: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' },
        { avatar: 'https://reputationprotectiononline.com/wp-content/uploads/2022/04/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png' },
        { avatar: 'https://i.pinimg.com/474x/0a/a8/58/0aa8581c2cb0aa948d63ce3ddad90c81.jpg' }
      ]
    },
  ]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:2004/message_users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const [inputText, setInputText] = useState('');
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageURLs = files.map(file => URL.createObjectURL(file));
    setViewSelectImages(prevImages => [...prevImages, ...imageURLs]);
    setSelectImages(prevFiles => [...prevFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    setViewSelectImages(prevImages => prevImages.filter((_, i) => i !== index));
    setSelectImages(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const [replyContent, setReplyContent] = useState(null);
  function handleReply(message) {
    setReplyContent(message);
  }

  if (!user) {
    return '';
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(inputText);
    console.log(selectImages);
    console.log(viewSelectImages);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div id='content' className={cx("content")}>
      <header className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          <Link to='/messages' className='link-back'>
            <i className="bi bi-chevron-left fw-bold"></i>
          </Link>
          <div className={cx('user')}>
            <div className='user-avatar'>
              <img src={user.avatar} className='avatar' alt='' />
              <div className={user.status ? 'status' : ''}></div>
            </div>
            <div className='content'>
              <h5 className='m-0 mb-1 fs-6'>{user.name}</h5>
              <p className='m-0'>
                {user.status ? 'Đang hoạt động' : 'Hoạt động 6p trước'}
              </p>
            </div>
          </div>
        </div>
        <div className={cx('list-settings')}>
          <ul className='list-unstyled d-flex mb-0'>
            <li className='d-flex align-items-center'>
              <button title='Bắt đầu gọi thoại' className='modal-icon fw-bold m-1 me-3 fs-4 text-center'>
                <i className="bi bi-telephone-fill"></i>
              </button>
            </li>
            <li className='d-flex align-items-center'>
              <button title='Bắt đầu gọi video' className='modal-icon fw-bold m-1 me-3 fs-4 text-center'>
                <i className="bi bi-camera-video-fill"></i>
              </button>
            </li>
            <li className='d-flex align-items-center'>
              <button title='Thông tin cuộc trò chuyện' className='modal-icon fw-bold m-1 me-3 fs-4 text-center'>
                <i className="bi bi-exclamation-circle-fill"></i>
              </button>
            </li>
          </ul>
        </div>
      </header>
      <div id='messages-content'>
        {messages.map((message, key) => (
          <Message
            key={key}
            user={user}
            onReply={handleReply}
            me={message.me}
            rep={message.rep}
            send={message.send}
          />
        ))}
      </div>
      <footer className='send-messages'>
        <div className="send-message-content">
          {replyContent && (
            <div className='reply-to-message'>
              <div>
                <p className='m-0'>Đang trả lời {user.name}</p>
                <p className='m-0'><i className="bi bi-repeat"></i> {replyContent}</p>
              </div>
              <div className='icon-close'>
                <button onClick={() => handleReply(null)}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="content-child-message">
            <div className='send-icons'>
              <input type="file" multiple hidden id='file-message' onChange={handleImageChange} />
              <label htmlFor='file-message'><i className="bi bi-images fs-7"></i></label>
            </div>
            <div className='content-chile-mesage px-2'>
              <div className='selected-images pb-1'>
                {viewSelectImages.map((imageURL, index) => (
                  <div className='image-item mt-2' key={index}>
                    <img src={imageURL} alt={`Selected image ${index + 1}`} />
                    <button
                      className='btn-close-image'
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <i className="bi bi-x-circle"></i>
                    </button>
                  </div>
                ))}
              </div>
              <div className='send-message'>
                <input type="text" value={inputText} onInput={handleInputChange} placeholder='Aa...' />
                <div>
                  <i className="bi-emoji-smile-fill"></i>
                </div>
              </div>
            </div>
            <div className='send-button'>
              <LoadingButton
                loading={isLoading}
                className='send-button custom-loading-button'
                loadingPosition="center"
                endIcon={!isLoading && (!Boolean(inputText || selectImages.length) ?
                  <ThumbUpAltIcon sx={{ fontSize: 20 }} />
                  :
                  <SendIcon sx={{ fontSize: 20 }} />
                )}
                variant="contained"
                type="submit"
              >
              </LoadingButton>
            </div>
          </form>
        </div>
      </footer>
    </div>
  );
}

export default Content;
