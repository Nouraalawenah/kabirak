import React from 'react';
import './Footer.css'; // We will create this CSS file later

const Footer = () => {
  return (
    <footer className="footer bg-body-secondary text-secondary py-4 mt-auto">
      <div className="container">
        <div className="row justify-content-center text-sm-center fs-6 p-4 border-top">
          <div className="col-md-12 ps-sm-5 col-lg-4 mb-3 mb-lg-0">
            <img src={'/assets/img/call_28dp_666666_FILL0_wght0_GRAD0_opsz48.png'} alt="Call Icon" className="footer-icon" />
            <a className="link-secondary link-underline link-underline-opacity-0 ms-2" href="tel:+962786544234">
              +962 786 544234
            </a>
          </div>
          <div className="col-md-12 ps-sm-5 col-lg-4">
            <img src={'/assets/img/mail_28dp_666666_FILL0_wght100_GRAD200_opsz48.png'} alt="Mail Icon" className="footer-icon" />
            <a className="link-secondary link-underline link-underline-opacity-0 ms-2" href="mailto:info@khabirk.com">
              info@khabirk.com
            </a>
          </div>
        </div>
        <div className="row text-center mt-3">
          <div className="col">
            <p className="mb-0">&copy; {new Date().getFullYear()} Khabirk. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

