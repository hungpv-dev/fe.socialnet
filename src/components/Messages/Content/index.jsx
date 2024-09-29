import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import SendIcon from "@mui/icons-material/Send";
import styles from "./main.scss";
import React, { useEffect, useState } from "react";
import Message from "../Message";
import { useParams } from "react-router-dom";
import { formatDateToNow } from "@/components/FormatDate";
import {
  index as indexMessages,
  create as createMessage,
} from "@/services/messageService.js";
import { show as showChatRoom } from "@/services/chatRoomService.js";

import useAuth from "@/hooks/useAuth";

const cx = classNames.bind(styles);

function Content() {
  const { id } = useParams();

  const { me } = useAuth();

  const [selectImages, setSelectImages] = useState([]);
  const [viewSelectImages, setViewSelectImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);

  const [inputText, setInputText] = useState("");
  const [replyContent, setReplyContent] = useState(null);

  useEffect(() => {
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

    const fetchMessages = async () => {
      try {
        const response = await indexMessages({
          chat_room_id: id,
        });
        const messages = response.data.data;
        setMessages(messages);
      } catch (error) {
        console.error(error);
      }
    };
    const loadMessages = async () => {
      setIsLoadingMessages(true);
      await fetctMe();
      await showRoom();
      await fetchMessages();
      setIsLoadingMessages(false);
    };

    loadMessages();
  }, [id]);

  if (isLoadingMessages) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setViewSelectImages((prevImages) => [...prevImages, ...imageURLs]);
    setSelectImages((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    setViewSelectImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
    setSelectImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  function handleReply(message) {
    setReplyContent(message);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let formData = new FormData();
    formData.append("content", inputText);

    selectImages.forEach((file) => {
      formData.append("files[]", file);
    });
    formData.append("reply_to", replyContent ? replyContent.id : null);

    let response = await createMessage(id, formData);
    if (response.status === 200) {
      setInputText("");
      setSelectImages([]);
      setViewSelectImages([]);
      setReplyContent(null);
      console.log(response.data);
    }
    setIsLoading(false);
  };
  return (
    <div id="content" className={cx("content")}>
      <header className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to="/messages" className="link-back">
            <i className="bi bi-chevron-left fw-bold"></i>
          </Link>
          <div className={cx("user")}>
            <div className="user-avatar">
              <img src={room.users[0]?.avatar} className="avatar" alt="" />
              <div className={room.status ? "status" : ""}></div>
            </div>
            <div className="content">
              <h5 className="m-0 mb-1 fs-6">{room.name}</h5>
              <p className="m-0">
                {room.status
                  ? "Đang hoạt động"
                  : formatDateToNow(room.users[0]?.time_offline)}
              </p>
            </div>
          </div>
        </div>
        <div className={cx("list-settings")}>
          <ul className="list-unstyled d-flex mb-0">
            <li className="d-flex align-items-center">
              <button
                title="Bắt đầu gọi thoại"
                className="modal-icon fw-bold m-1 me-3 fs-4 text-center"
              >
                <i className="bi bi-telephone-fill"></i>
              </button>
            </li>
            <li className="d-flex align-items-center">
              <button
                title="Bắt đầu gọi video"
                className="modal-icon fw-bold m-1 me-3 fs-4 text-center"
              >
                <i className="bi bi-camera-video-fill"></i>
              </button>
            </li>
            <li className="d-flex align-items-center">
              <button
                title="Thông tin cuộc trò chuyện"
                className="modal-icon fw-bold m-1 me-3 fs-4 text-center"
              >
                <i className="bi bi-exclamation-circle-fill"></i>
              </button>
            </li>
          </ul>
        </div>
      </header>
      <div id="messages-content">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            user={message.user_send}
            onReply={handleReply}
            me={user && user.id === message.user_send.id}
            rep={message.reply_to}
            send={message.is_seen}
          />
        ))}
      </div>
      <footer className="send-messages">
        <div className="send-message-content">
          {replyContent && (
            <div className="reply-to-message">
              <div>
                <p className="m-0">Đang trả lời {room.name}</p>
                <p className="m-0">
                  <i className="bi bi-repeat"></i> {replyContent.content}
                </p>
              </div>
              <div className="icon-close">
                <button onClick={() => handleReply(null)}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="content-child-message">
            <div className="send-icons">
              <input
                type="file"
                multiple
                hidden
                id="file-message"
                onChange={handleImageChange}
              />
              <label htmlFor="file-message">
                <i className="bi bi-images fs-7"></i>
              </label>
            </div>
            <div className="content-chile-mesage px-2">
              <div className="selected-images pb-1">
                {viewSelectImages.map((imageURL, index) => (
                  <div className="image-item mt-2" key={index}>
                    <img src={imageURL} alt={`Selected image ${index + 1}`} />
                    <button
                      className="btn-close-image"
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <i className="bi bi-x-circle"></i>
                    </button>
                  </div>
                ))}
              </div>
              <div className="send-message">
                <input
                  type="text"
                  value={inputText}
                  onInput={handleInputChange}
                  placeholder="Aa..."
                />
                <div>
                  <i className="bi-emoji-smile-fill"></i>
                </div>
              </div>
            </div>
            <div className="send-button">
              <LoadingButton
                loading={isLoading}
                className="send-button custom-loading-button"
                loadingPosition="center"
                endIcon={
                  !isLoading &&
                  (!Boolean(inputText || selectImages.length) ? (
                    <ThumbUpAltIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <SendIcon sx={{ fontSize: 20 }} />
                  ))
                }
                variant="contained"
                type="submit"
              ></LoadingButton>
            </div>
          </form>
        </div>
      </footer>
    </div>
  );
}

export default Content;
