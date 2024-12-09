import classNames from 'classnames/bind';

import styles from "./main.scss";
import { deleteMessage, showContentReply, showMessageContent } from '@/components/MessageComponent';
import { PopupDeleteMessage } from '@/components/PopupComponent';
import { useEffect, useRef, useState } from 'react';
import { ShowEmojiMessage } from '@/components/EmojiComponent';
const cx = classNames.bind(styles);

function Message({ message, isOut, user, onReply, updateMessage, setMessage }) {
  const [showEmoji,setShowEmoji] = useState(false)
  const me = user && user.id === message.user_send.id
  const rep = message.reply_to
  const send = message.is_seen.filter(seen => seen.id !== user.id)

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const emojiRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleClosePopup = () => {
    setShowDeletePopup(false);
  };

  const handleDeleteForMe = async () => {
    let response = await deleteMessage(message.message_id);
    if (response.status === 200) {
      let message = response.data.data;
      updateMessage(message);
    }
    setShowDeletePopup(false);
  };

  const handleDeleteForAll = async () => {
    let response = await deleteMessage(message.message_id, true);
    if (response.status === 200) {
      let message = response.data.data;
      updateMessage(message);
    }
    setShowDeletePopup(false);
  };

  if (message.is_nofi) {
    return (
      <>
        <div className={cx('user-sends')} style={{ margin: send?.length > 0 ? '10px 0' : '0px' }}>
          {
            send && send.map((user) =>
            (
              <div key={user.id} className={cx('user-send')}>
                <img src={user?.avatar || "/user_default.png"} alt="" />
              </div>
            )
            )
          }
        </div>
        <div style={{
          textAlign: 'center', 
          fontSize: '12px',
          color: '#666',
          margin: '5px 0',
          fontStyle: 'italic'
        }}>
          {message.content}
        </div>
      </>
    );
  }

  return (
    <>
      <div className={cx('user-sends')} style={{ marginBottom: '15px' }}>
        {
          send && send.map((user) =>
          (
            <div key={user.id} className={cx('user-send')}>
              <img src={user?.avatar || "/user_default.png"} alt="" />
            </div>
          )
          )
        }
      </div>
      <div className={cx('user-message', { 'flex-row-reverse': me, 'reply-success': rep })}>
        {!me && (
          <div className='avatar'>
            <img src={message.user_send?.avatar || "/user_default.png"} alt="Avatar" />
          </div>
        )}
        {rep && (
          <div className='reply' dangerouslySetInnerHTML={{ __html: showContentReply(rep) }} />
        )}
        <div className='message'>
          <div className='message-content'>
            <div className={cx('list-icon-in-message')}>
              {
                <>
                  {message.emotions.length > 0 && (() => {
                    const lastTwoEmotions = message.emotions.slice(-2);
                    return lastTwoEmotions.map((emotion, index) => (
                      <div key={index} className={`icon-${index + 1}`} style={{ zIndex: 2 - index }}>
                        <span>{emotion.emoji}</span>
                      </div>
                    ));
                  })()}
                </>
              }
            </div>
            <div dangerouslySetInnerHTML={{ __html: showMessageContent(message) }} />
            <div className={`message-settings ${showEmoji ? 'd-flex' : ''}`}>
              {!message.flagged && !isOut && (
                <ul className='list-unstyled d-flex gap-2 mb-0'>
                  <li className='d-flex align-items-center position-relative' ref={emojiRef}>
                    <button
                      title='Bày tỏ cảm xúc'
                      className='message-select-icons'
                      onClick={() => setShowEmoji(!showEmoji)}
                    >
                      <i className="bi bi-emoji-smile"></i>
                    </button>
                    {showEmoji && (
                      <ShowEmojiMessage emos={message.emotions} setMessage={setMessage} setShowEmoji={setShowEmoji} messageId={message.message_id} />
                    )}
                  </li>
                  <li className='d-flex align-items-center'>
                    <button title='Trả lời' onClick={() => onReply(message)}>
                      <i className="bi bi-reply-fill"></i>
                    </button>
                  </li>
                  <li className='d-flex align-items-center'>
                    <button title='Xóa tin nhắn' onClick={handleDeleteClick}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      {showDeletePopup && (
        <PopupDeleteMessage
          onClose={handleClosePopup}
          me={me}
          onDeleteForMe={handleDeleteForMe}
          onDeleteForAll={handleDeleteForAll}
        />
      )}
    </>
  );
}

export default Message;
