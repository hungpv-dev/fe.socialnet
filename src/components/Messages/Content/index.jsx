import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from "./main.scss";
import React, { useEffect, useState } from 'react';
import Message from '../Message';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const cx = classNames.bind(styles);

function Content() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

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

  const [replyContent, setReplyContent] = useState(null);
  function handleReply(message) {
    setReplyContent(message);
  }

  if (!user) {
    return '';
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
        <Message key={1} user={user} onReply={handleReply} me={false} />
        <Message key={2} user={user} onReply={handleReply} me={true} />
        <Message key={3} user={user} onReply={handleReply} me={true} />
        <Message key={4} user={user} onReply={handleReply} rep={{ message: 'Đã bảo là không được rồi' }} me={false} />
        <Message key={5} user={user} onReply={handleReply} me={false} />
        <Message key={6} user={user} onReply={handleReply} me={true} />
        <Message key={7} user={user} onReply={handleReply} me={false} />
        <Message key={8} user={user} onReply={handleReply} me={false} />
        <Message key={2} user={user} onReply={handleReply} me={true} />
        <Message key={3} user={user} onReply={handleReply} me={true} />
        <Message key={4} user={user} onReply={handleReply} rep={{ message: 'Đã bảo là không được rồi' }} me={false} />
        <Message key={5} user={user} onReply={handleReply} me={false} />
        <Message key={6} user={user} onReply={handleReply} me={true} />
        <Message key={7} user={user} onReply={handleReply} me={false} />
        <Message key={8} user={user} onReply={handleReply} me={false} />
        <Message key={9} user={user} me={true} rep={{ message: 'Lại là joinny đây' }} />
        <Message key={10} user={user} onReply={handleReply} me={true} />
        <Message key={11} user={user} onReply={handleReply} me={false} />
        <Message key={12} user={user} onReply={handleReply} me={false} />
        <Message key={13} user={user} onReply={handleReply} send={
          [
            { avatar: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' },
            { avatar: 'https://reputationprotectiononline.com/wp-content/uploads/2022/04/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png' },
            { avatar: 'https://i.pinimg.com/474x/0a/a8/58/0aa8581c2cb0aa948d63ce3ddad90c81.jpg' }
          ]
        } me={true} />
      </div>
      <footer className='send-messages'>
        <div className="send-message-content">
          {replyContent && (
            <div className='reply-to-message'>
              <div>
                <p className='m-0'>Đang trả lời {user.name}</p>
                <p className='m-0'><i class="bi bi-repeat"></i> {replyContent}</p>
              </div>
              <div className='icon-close'>
                <button onClick={() => handleReply(null)}>
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          )}
          <div className="content-child-message">
            <div className='send-icons'>
              <input type="file" multiple hidden id='file-message' />
              <label htmlFor='file-message'><i className="bi bi-images fs-7"></i></label>
            </div>
            <div className='send-message'>
              <input type="text" value={inputText} onInput={handleInputChange} placeholder='Aa...' />
              <div>
                <i className="bi bi-emoji-smile-fill"></i>
              </div>
            </div>
            <button className='send-button'>
              <i className={inputText ? "bi bi-send-fill" : "bi bi-emoji-kiss-fill"}></i>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Content;
