import './main.scss';

const SlideBar = () => {
    return (
        <div className="col-2 bg-light sidebar">
          <h4 className="text-primary my-4">ADMIN</h4>
          <h6>Main Menu</h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Campaign
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Analytics
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                account management
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Balance
              </a>
            </li>
          </ul>
          <ul className="nav flex-column mt-4">
            <h6>Others</h6>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Guide
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Messages <span className="badge bg-danger">1</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Settings
              </a>
            </li>
          </ul>
        </div>
    );
};

export default SlideBar;