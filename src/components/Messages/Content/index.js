import classNames from 'classnames/bind';

import styles from "./main.scss";

const cx = classNames.bind(styles);

function Content() {
  return (
    <header className={cx("content")}>
      <h1>Content</h1>
    </header>
  );
}

export default Content;
