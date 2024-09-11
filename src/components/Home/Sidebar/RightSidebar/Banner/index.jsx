import classNames from "classnames/bind";
import styles from "./Banner.module.scss";
import { Link } from 'react-router-dom';


const cx = classNames.bind(styles);

function Banner({ image, name, link }) {
    const formattedLink = link.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

    return (
        <a target="_blank" href={link} className={cx('banner')}>
            <div className={cx('content')}>
                <div className={cx('image')}>
                    <img src={image} alt="Ảnh" />
                </div>
                <div className={cx('text-content')}>
                    <span className={cx('name')}>{name}</span>
                    <span className={cx('link')}>{formattedLink}</span>
                </div>
            </div>
        </a>
    );
}

export default Banner;
