import React, { useState } from "react";
import './AppBar.css'
import logoImage from '../AppBar/Logo.png'
function AppBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="appbar">
      <div className="logo">
        <a href="/">
        <img src={logoImage} alt="EA 逸峰營造" width={'50%'} />
        </a> 
       
      </div>

      <nav className="menu">
        <a href="/" className="menu-item">MAIN</a>
        <a href="/about" className="menu-item">關於逸峰</a>
        <a href="/construction"className="menu-item">工程實績</a>
        <a href="/excavator" className="menu-item">機具租賃</a>
        <a href="#/" className="menu-item">最新消息</a>
      </nav>

      <button className="menu-button" onClick={toggleMenu}>
        {menuOpen ? "✖️" : "☰"}
      </button>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="/" className="mobile-menu-item">MAIN</a>
          <a href="/about" className="mobile-menu-item">關於逸峰</a>
          <a href="/construction" className="mobile-menu-item">工程實績</a>
          <a href="/excavator" className="mobile-menu-item">機具租賃</a>
          <a href="#/" className="mobile-menu-item">最新消息</a>
        </div>
      )}
    </header>
  );
}

export default AppBar;
