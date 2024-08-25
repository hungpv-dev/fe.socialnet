import classNames from 'classnames/bind';

import styles from "./main.scss";

const cx = classNames.bind(styles);

function SlideBar() {
  return (
    <aside className={cx("slidebar")}>
      <header className='d-flex justify-content-between align-items-center'>
        <div className='title'>
          <h3 className='fw-bold'>Đoạn chat</h3>
        </div>
        <div className='icon d-flex justify-content-center align-items-center'>
          <i className="bi bi-three-dots fs-3"></i>
        </div>
      </header>
    </aside>
  );
}

export default SlideBar;
