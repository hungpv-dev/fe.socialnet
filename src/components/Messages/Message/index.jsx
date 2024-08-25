import classNames from 'classnames/bind';

import styles from "./main.scss";

const cx = classNames.bind(styles);

function Message({ user, me,rep,send,onReply }) {
  return (
    <>
      <div className={cx('user-message', { 'flex-row-reverse': me,'reply-success': rep })}>
        {!me && (
          <div className='avatar'>
            <img src={user.avatar} alt="Avatar" />
          </div>
        )}
        {rep && (
          <div className='reply'>
            {rep.message}
          </div>
        )}
        <div className='message'>
          Xin chào, tôi là Jonny
        </div>
        <div className='message-settings'>
          <ul className='list-unstyled d-flex gap-2 mb-0'>
            <li className='d-flex align-items-center'>
              <button title='Bày tỏ cảm xúc'>
                <i className="bi bi-emoji-smile"></i>
              </button>
            </li>
            <li className='d-flex align-items-center'>
              <button title='Trả lời' onClick={() => onReply('Xin chào, tôi là Phạm Văn Hung rất vui khi được gặp anh, dạo này anh khỏe không?')}>
                <i className="bi bi-reply-fill"></i>
              </button>
            </li>
            <li className='d-flex align-items-center'>
              <button title='Xem thêm'>
                <i className="bi bi-three-dots-vertical"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={cx('user-sends')}>
        {
          send && send.map((user) =>
            (
              <div className={cx('user-send')}>
                <img src={user.avatar} alt="" />
              </div>
            )
          )
        }
      </div>
    </>
  );
}

export default Message;
