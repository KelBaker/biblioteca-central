import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="brand">
        <span className="brand__mark">BC</span>
        <span className="brand__text">
          Biblioteca
          <small>Central</small>
        </span>
      </Link>

      <nav className="header__navigation">
        <Link to="/livros">Livros</Link>
        <Link to="/livros/cadastro" className="header__add-link">
          Adicionar livro
        </Link>
      </nav>
    </header>
  );
}

export default Header;
