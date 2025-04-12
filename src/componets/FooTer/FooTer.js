import React from "react";
import "./FooTer.css";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section company-name">
          <h3>逸峰營造有限公司</h3>
        </div>
        <div className="footer-section contacts">
          <h4>Contacts</h4>
          <p><span className="icon">📍</span> 台北市文山區羅斯福路6段159巷5弄4號1樓</p>
          <p><span className="icon">📞</span> (02)2932-2797</p>
          <p><span className="icon">✉️</span> pc35.r2000@msa.hinet.net</p>
        </div>
        <div className="footer-section social-media">
          <h4>Social Media</h4>
          <a href="#/" className="social-icon"><FaFacebookF /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
