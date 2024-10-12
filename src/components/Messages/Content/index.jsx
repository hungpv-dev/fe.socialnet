import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SendIcon from '@mui/icons-material/Send';
import styles from "./main.scss";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDateToNow } from "@/components/FormatDate";
import echo from '@/components/EchoComponent';
import { sendMessage } from '@/components/MessageComponent';
import {
  create as createMessage,
} from '@/services/messageService.js';
import {
  show as showChatRoom,
} from '@/services/chatRoomService.js';
import useAuth from '@/hooks/useAuth';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from '@/axios';
import Message from '../Message';
import { useDispatch, useSelector } from 'react-redux';
import { setRooms } from '@/actions/rooms';


const cx = classNames.bind(styles);

function Content() {
  const currentRooms = useSelector(state => state.rooms); 
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    const channel = echo.private(`room.push-message.${id}`);
    channel.listen('ChatRoom\\PushMessage', (data) => {
      const userId = data.message[0]?.user_send?.id;
      setMessages(prevMessages => {
        let newMessages = data.message.filter(newMessage =>
          !prevMessages.some(existingMessage => existingMessage.message_id === newMessage.message_id)
        );
        prevMessages = prevMessages.map(mes => {
          return {
            ...mes,
            is_seen: mes.is_seen.filter(user => user.id !== userId)
          }
        });
        sendMessage(id);
        return [...newMessages,...prevMessages];
      });
    });
    channel.listen('ChatRoom\\SendMessage', (data) => {
      const userId = data.user_id;
      const mes = data.message;
      setMessages(prevMessages => {
        const updatedMessages = prevMessages.map(currentMessage => {
          currentMessage.is_seen = currentMessage.is_seen.filter(us => us.id !== userId);
          if (currentMessage.message_id === mes.message_id) {
            currentMessage.is_seen = mes.is_seen;
          };
          return currentMessage;
        });
        return [...updatedMessages];
      });
    });

    return () => {
      channel.stopListening('ChatRoom\\PushMessage');
      channel.stopListening('ChatRoom\\SendMessage');
    };
  }, [id]);

  const { me } = useAuth();

  const [selectImages, setSelectImages] = useState([]);
  const [viewSelectImages, setViewSelectImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);

  const [inputText, setInputText] = useState('');
  const [replyContent, setReplyContent] = useState(null);

  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [maxMessage, setMaxMessage] = useState(0);


  const fetchMessages = async () => {
    try {
      const response = await axios('/messages', {params: {chat_room_id: id,page}}).then(res => res.data);
      setMessages(prevMessages => [...prevMessages, ...response.data]);
      setPage(response.meta.current_page + 1)
      setMaxMessage(pre => pre + response.meta.per_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let newRooms = currentRooms.map(room => {
      if (room.chat_room_id === parseInt(id)) {
        room.last_message.is_seen = true;
      }
      return room;
    });
    dispatch(setRooms(newRooms));
    const fetctMe = async () => {
      try {
        const response = await me();
        const user = response.data;
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };

    const showRoom = async () => {
      try {
        const response = await showChatRoom(id);
        const room = response.data.data;
        setRoom(room);
      } catch (error) {
        console.error(error);
      }
    };
    const initMessage = async () => {
      try {
        const response = await axios('/messages', {params: {chat_room_id: id,page: 1}}).then(res => res.data);
        setMessages(response.data);
        setPage(2)
        setMaxMessage(response.meta.per_page);
      } catch (error) {
        console.log(error);
      }
    };

    const loadContent = async () => {
      setIsLoadingMessages(true);
      sendMessage(id);
      await initMessage();
      await fetctMe();
      await showRoom();
      setIsLoadingMessages(false);
    };

    loadContent();
  }, [id]);


  if (isLoadingMessages) {
    return <div>Loading...</div>;
  }

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

  function handleReply(message) {
    setReplyContent(message);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let formData = new FormData();
    selectImages.forEach(file => {
      formData.append('files[]', file);
    });
    formData.append('reply_to', replyContent ? replyContent.message_id : null);
    let body = inputText;
    if (inputText === '' && selectImages.length === 0) {
      body = '👍';
    }
    formData.append('content', body);
    let response = await createMessage(id, formData);
    if (response.status === 200) {
      setInputText('');
      setSelectImages([]);
      setViewSelectImages([]);
      setReplyContent(null);
      setMessages(prevMessages => [...response.data,...prevMessages]);
    }
    setIsLoading(false);
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
              <div className="user-avatars">
                {room.users.slice(0, 4).map((user) => (
                  <div className='image-user' key={user.id}>
                    <img key={user.id} src={user.avatar} className="avatar" alt="" />
                  </div>
                ))}
              </div>
              <div className={room.status ? 'status' : ''}></div>
            </div>
            <div className='content'>
              <h5 className='m-0 mb-1 fs-6'>{room.name}</h5>
              <p className='m-0'>
                {room.status ? 'Đang hoạt động' : formatDateToNow(room.chat_room_type === 1 ? room.users[0]?.time_offline : (room.last_message?.created_at ?? new Date().toISOString()))}
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
      <div id='messages-content' style={{height: "90vh", overflowY: "scroll", display: "flex", flexDirection: "column-reverse", margin: "auto"}} className="bg-body-tertiary p-3">
        <div style={{ height: '30px' }}></div>
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMessages}
          hasMore={messages.length >= maxMessage}
          loader={<p className="text-center m-5">⏳&nbsp;Loading...</p>}
          endMessage={<p className="text-center m-5">That&apos;s all folks!🐰🥕</p>}
          style={{ display: "flex", flexDirection: "column-reverse",paddingBottom: "50px", overflow: "visible" }}
          scrollableTarget="messages-content"
          inverse={true}
        >
          {messages.map((item) => (
            <Message
              key={item.message_id}
              message={item}
              user={user}
              onReply={handleReply}
            />
          ))}
        </InfiniteScroll>
      </div>
      <footer className='send-messages'>
        <div className="send-message-content">
          {replyContent && (
            <div className='reply-to-message'>
              <div>
                <p className='m-0'>Đang trả lời {room.name}</p>
                <p className='m-0'><i className="bi bi-repeat"></i> {replyContent.content || 'Trả lời hình ảnh'}</p>
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
