import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SendIcon from '@mui/icons-material/Send';
import styles from "./main.scss";
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import InfoIcon from '@mui/icons-material/Info';
import { Stack, IconButton, Typography } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import echo from '@/components/EchoComponent';
import WarningIcon from '@mui/icons-material/Warning';
import { sendMessage, showRoomAvatar } from '@/components/MessageComponent';
import {
  create as createMessage,
} from '@/services/messageService.js';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from '@/axios';
import Message from '../Message';
import { useDispatch, useSelector } from 'react-redux';
import { setRooms } from '@/actions/rooms';
import dataPicker from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import PageLoading from '@/components/LoadingComponent';
import { Drawer, LinearProgress } from '@mui/material';
import { GetTimeOffline } from '@/components/UserStatusComponent';
import ChatInfo from '../ChatInfoComponent';
import BlockUser from '../ChatInfo/BlockUser';

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
        return [...newMessages, ...prevMessages];
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
    channel.listen('ChatRoom\\DestroyMesssage', (data) => {
      const message = data.message;
      setMessages(prevMessages => {
        return prevMessages.map(msg => {
          if (msg.message_id === message.id) {
            return { ...msg, flagged: true };
          }
          return msg;
        });
      });
    });
    channel.listen('ChatRoom\\SendIcon', (data) => {
      const message = data.message;
      const icon = data.icon;
      setMessages(prevMessages => {
        return prevMessages.map(msg => {
          if (msg.message_id === message.id) {
            return { ...msg, emotions: icon };
          }
          return msg;
        });
      });
    });

    return () => {
      channel.stopListening('ChatRoom\\PushMessage');
      channel.stopListening('ChatRoom\\SendMessage');
      channel.stopListening('ChatRoom\\DestroyMesssage');
    };
  }, [id]);

  const [selectImages, setSelectImages] = useState([]);
  const [viewSelectImages, setViewSelectImages] = useState([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  let room = currentRooms.find(room => room.chat_room_id === parseInt(id));

  const user = useSelector((state) => state.user);

  const [inputText, setInputText] = useState('');
  const [replyContent, setReplyContent] = useState(null);
  const [openBlockConfirm, setOpenBlockConfirm] = useState(false);

  const [messages, setMessages] = useState([]);
  const [maxMessage, setMaxMessage] = useState(0);
  const inputRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await axios('/messages', { params: { chat_room_id: id, index: messages.length } }).then(res => res.data);
      setMessages(prevMessages => [...prevMessages, ...response.data]);
      setMaxMessage(messages.length + 20);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let newRooms = currentRooms.map(room => {
      if (room.chat_room_id === parseInt(id)) {
        if (room.last_message) {
          room.last_message.is_seen = true;
        }
        room.selected = true;
      } else {
        room.selected = false;
      }
      return room;
    });
    dispatch(setRooms(newRooms));
    const initMessage = async () => {
      try {
        const response = await axios('/messages', { params: { chat_room_id: id, index: 0 } }).then(res => res.data);
        setMessages(response.data);
        setMaxMessage(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    const loadContent = async () => {
      setIsLoadingMessages(true);
      sendMessage(id);
      await initMessage();
      setIsLoadingMessages(false);
    };

    loadContent();
  }, [id]);

  const handlePaste = useCallback((event) => {
    if (document.activeElement !== inputRef.current) return;

    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        const imageURL = URL.createObjectURL(blob);
        setViewSelectImages(prevImages => [...prevImages, imageURL]);
        setSelectImages(prevFiles => [...prevFiles, blob]);
      }
    }
  }, []);
  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  if (isLoadingMessages) {
    return <PageLoading />;
  }
  if (!room) {
    return <h1>Không tìm thấy cuộc trò chuyện</h1>;
  }
  const updateMessage = (updatedMessage) => {
    setMessages(prevMessages => prevMessages.map(msg =>
      msg.message_id === updatedMessage.message_id ? updatedMessage : msg
    ));
  };

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
    inputRef.current.focus();
    setIsPickerOpen(false);
    setReplyContent(message);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsPickerOpen(false);
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
      setMessages(prevMessages => [...response.data, ...prevMessages]);
      let newRooms = currentRooms.map(room => {
        if (room.chat_room_id === parseInt(id)) {
          if (room.last_message) {
            room.last_message.is_seen = true;
          }
          room.selected = true;
        }
        return room;
      });
      dispatch(setRooms(newRooms));
    }
    setIsLoading(false);
  }

  const isBlocked = room.block?.some(blockedUser => blockedUser === 'user_' + user.id);
  let theirUserId = room.users[0]?.id;
  const isBlockedTo = room.block?.includes('user_' + theirUserId);
  
  const handleBlockConfirmToggle = () => {
    setOpenBlockConfirm(prev => !prev);
  };

  return (
    <div id='content' className={cx("content")}>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
      >
        <ChatInfo
          room={room}
          onClose={handleDrawerClose}
        />
      </Drawer>
      <header className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          <Link to='/messages' className='link-back'>
            <i className="bi bi-chevron-left fw-bold"></i>
          </Link>
          <div className={cx('user')}>
            <div className='user-avatar'>
              {showRoomAvatar(room)}
            </div>
            <div className='content'>
              <h5 className='m-0 mb-1 fs-6'>{room.name}</h5>
              <p className='m-0'>
                <GetTimeOffline listUser={room.users} />
              </p>
            </div>
          </div>
        </div>
        <div className={cx('list-settings')}>
          <Stack direction="row" spacing={1}>
            <IconButton
              title="Bắt đầu gọi thoại"
              sx={{
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.light',
                }
              }}
            >
              <CallIcon />
            </IconButton>

            <IconButton
              title="Bắt đầu gọi video"
              sx={{
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.light',
                }
              }}
            >
              <VideocamIcon />
            </IconButton>

            <IconButton
              onClick={handleDrawerOpen}
              title="Thông tin cuộc trò chuyện"
              sx={{
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.light',
                }
              }}
            >
              <InfoIcon />
            </IconButton>
          </Stack>
        </div>
      </header>
      <div id='messages-content' style={{ height: "90vh", overflowY: "scroll", display: "flex", flexDirection: "column-reverse", margin: "auto" }} className="bg-body-tertiary p-3">
        <div style={{ height: '30px' }}></div>
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMessages}
          hasMore={messages.length >= maxMessage}
          loader={messages.length > 0 ? <LinearProgress /> : ''}
          endMessage={<p className="text-center m-5">That&apos;s all folks!🐰🥕</p>}
          style={{ display: "flex", flexDirection: "column-reverse", paddingBottom: "20px", overflow: "visible" }}
          scrollableTarget="messages-content"
          inverse={true}
        >
          {messages.map((item) => (
            <Message
              setMessage={setMessages}
              key={item.message_id}
              message={item}
              user={user}
              onReply={handleReply}
              updateMessage={updateMessage}
            />
          ))}
        </InfiniteScroll>
      </div>
      {openBlockConfirm && <BlockUser room={room} block={isBlockedTo} open={openBlockConfirm} onClose={() => setOpenBlockConfirm(false)} />}
      <footer className='send-messages'>
        {isBlockedTo ? (
          <LoadingButton
            variant="contained"
            color="inherit"
            startIcon={<WarningIcon />}
            onClick={handleBlockConfirmToggle}
            sx={{
              p: 2,
              width: '100%',
              bgcolor: 'grey.200',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              '& svg': {
                fontSize: 20,
                color: 'text.primary'
              }
            }}
          >
            Bỏ chặn người dùng này
          </LoadingButton>
        ) : (
          isBlocked ? (
            <Typography
              variant="body1"
              color="text.primary"
              align="center"
              sx={{
                p: 2,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                '& svg': {
                  fontSize: 20,
                  color: 'text.primary'
                }
              }}
            >
              <WarningIcon />
              Bạn hiện không thể thao tác trong cuộc hội thoại này
            </Typography>
          ) : (
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
                    <input
                      type="text"
                      value={inputText} autoFocus onInput={handleInputChange} placeholder='Aa...'
                      ref={inputRef}
                    />
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', bottom: '250px', right: '128px' }}>
                        {isPickerOpen ? (
                          <Picker
                            data={dataPicker}
                            emojiButtonSize={30}
                            emojiSize={20}
                            onEmojiSelect={(emoji) => {
                              setInputText(prevText => prevText + emoji.native);
                            }}
                          />
                        ) : ''}
                      </div>
                      <i onClick={() => setIsPickerOpen(!isPickerOpen)} className="bi-emoji-smile-fill"></i>
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
          )
        )}
      </footer>
    </div>
  );
}

export default Content;
