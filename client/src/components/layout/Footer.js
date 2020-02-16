import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer p-2 text-white text-center">
    <div className="container">
      <div className="row">
        <div className="copyright col-sm">
          &copy; 2018-{String(new Date().getFullYear()).slice(2)} VideoBurst
        </div>
        <div className="col-sm" />
        <div className="github-link text-info col-sm">
          <a
            href="https://github.com/apgsn/VideoBurst"
            target="_blank"
            rel="noopener noreferrer"
            alt="See code on Github"
          >
            See code on &nbsp;
            <i className="fab fa-github-alt" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
