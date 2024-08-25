import className from "classnames/bind";
import { Link } from 'react-router-dom'
import styles from "./main.scss";

const cx = className.bind(styles);

type Props = {}

const Home = (props: Props) => {


  return (
    <div  className = {cx("home")}>
        <h1>Home</h1>
    </div>
  )
}

export default Home