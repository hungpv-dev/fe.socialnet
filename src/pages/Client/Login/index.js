import className from "classnames/bind";
import { Link } from 'react-router-dom'
import styles from "./main.scss";

const cx = className.bind(styles);

type Props = {}

const Login = (props: Props) => {

  return (
    <div className = {cx("main")}>
        <h1>Login</h1>
        <Link to="/">Đăng nhập</Link> -- 
        <Link to="/register">Đăng kí</Link>
    </div>
  )
}

export default Login