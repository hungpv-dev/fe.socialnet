import "./variables.scss";
import "./main.scss";
import "./mixin.scss";

// Boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Boostrap Icon
import 'bootstrap-icons/font/bootstrap-icons.css';


function GlobalStyle({children}) {
    return children;
}

export default GlobalStyle;