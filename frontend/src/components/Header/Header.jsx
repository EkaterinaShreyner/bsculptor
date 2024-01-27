import React from 'react'
import { Link, NavLink, useLocation} from "react-router-dom";
import './Header.css';

function Header() {

  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li>
            <NavLink to="/" className={({isActive}) => `header__nav-item ${isActive ? "header__nav-item_active" : ""}`}>Проверить свою идею</NavLink>
          </li>
          <li>
            <NavLink to="/other-ideas" className={({isActive}) => `header__nav-item ${isActive ? "header__nav-item_active" : ""}`}>Оценить чужие идеи</NavLink>
          </li>
        </ul>
        {currentPath !== '/' && <Link to="/" className="header__nav-back">Вернуться к началу</Link> }
      </nav>
    </header>
  )
}

export default Header;