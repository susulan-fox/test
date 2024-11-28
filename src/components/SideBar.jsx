import "../components/sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-dark min-vh-100 d-flex flex-column justify-content-between sidebar open">
      <div>
        <button className="btn btn-primary my-3" type="button">
          <i className="bi bi-list"></i>
        </button>
        <a
          className="text-decoration-none text-white d-flex align-items-center ms-3 mt-2 dashboard-link"
          href="#"
        >
          <i className="text-light fs-4 bi bi-speedometer2"></i>
          <span className="ms-1 fs-4">Dashboard</span>
        </a>
        <hr className="text-secondary d-none d-sm-block" />
        <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
          <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
            <Link to="/dashboard-customers" className="nav-link text-white fs-5">
              <i className="bi bi-people"></i>
              <span className="ms-3">Customers</span>
            </Link>
          </li>
          <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
            <Link to="/dashboard-products" className="nav-link text-white fs-5">
              <i className="bi bi-bar-chart"></i>
              <span className="ms-3">Products</span>
            </Link>
          </li>
          <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
            <Link
              to="/dashboard-transactions"
              className="nav-link text-white fs-5"
            >
              <i className="bi bi-credit-card"></i>
              <span className="ms-3">Transactions</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="dropdown open p-3">
        <a
          className="text-decoration-none text-white d-flex align-items-center dropdown-toggle"
          id="triggerId"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          role="button"
          href="#"
        >
          <i className="bi bi-person-circle"></i>
          <span className="ms-2">Admin</span>
        </a>
        <div className="dropdown-menu" aria-labelledby="triggerId">
          <Link to="/" className="dropdown-item">
            Home
          </Link>
          <Link to="/" className="dropdown-item">
            Log Out
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
