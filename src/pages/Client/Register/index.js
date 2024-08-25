import className from "classnames/bind";
import { Link } from 'react-router-dom'
import styles from "./main.scss";

const cx = className.bind(styles);

type Props = {}

const Register = (props: Props) => {

  return (
    <div className = {cx("main")}>
        <h1>Register</h1>
        <Link to="/login">Đăng nhập</Link>
    </div>
  )
}

export default Register