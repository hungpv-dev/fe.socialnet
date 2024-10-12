import classNames from 'classnames/bind';

import styles from "./main.scss";
import { showImages } from "@/components/ImageComponent";
const cx = classNames.bind(styles);

function Message({ message, user, onReply }) {
  const me = user && user.id === message.user_send.id
  const rep = message.reply_to
  const send = message.is_seen.filter(seen => seen.id !== user.id)
  return (
    <>
      <div className={cx('user-sends')}>
        {
          send && send.map((user) =>
          (
            <div key={user.id} className={cx('user-send')}>
              <img src={user.avatar} alt="" />
            </div>
          )
          )
        }
      </div>
      <div className={cx('user-message', { 'flex-row-reverse': me, 'reply-success': rep })}>
        {!me && (
          <div className='avatar'>
            <img src={message.user_send.avatar} alt="Avatar" />
          </div>
        )}
        {rep && (
          <div className='reply'>
            {!rep.flagged ? rep.content || 'Trả lời hình ảnh!' : 'Tin nhắn đã bị thu hồi!'}
          </div>
        )}
        <div className='message'>
          {showImages(message.files)}
          {message.content && <div className='message-content'>
            <p>
              {!message.flagged ? message.content : 'Tin nhắn đã bị thu hồi!'}
            </p>
          </div>}
        </div>
        <div className='message-settings'>
          {!message.flagged && (
            <ul className='list-unstyled d-flex gap-2 mb-0'>
              <li className='d-flex align-items-center'>
                <button title='Bày tỏ cảm xúc'>
                  <i className="bi bi-emoji-smile"></i>
                </button>
              </li>
              <li className='d-flex align-items-center'>
                <button title='Trả lời' onClick={() => onReply(message)}>
                  <i className="bi bi-reply-fill"></i>
                </button>
              </li>
              <li className='d-flex align-items-center'>
                <button title='Xem thêm'>
                  <i className="bi bi-three-dots-vertical"></i>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

    </>
  );
}

export default Message;
