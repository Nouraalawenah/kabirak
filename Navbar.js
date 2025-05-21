import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // We will create this CSS file later
import logo from '../../assets/img/logo.jpg'; // Assuming logo is moved to src/assets

const Navbar = () => {
  // Placeholder for user authentication status
  const isLoggedIn = false;

  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid">
        <Link to="/">
          <img src={logo} style={{ width: '100px', height: '100px' }} alt="Khabirk Logo" />
        </Link>
        <button
          className="navbar-toggler shadow-none border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link" to="/">الرئيسية</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">الخدمات</Link>
              </li>
              {isLoggedIn ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">حسابي</Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">التسجيل</Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/help-center">مركز المساعدة</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

