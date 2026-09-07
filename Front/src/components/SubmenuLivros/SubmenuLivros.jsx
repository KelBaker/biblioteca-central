import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.scss";

function SubmenuLivros() {
  const { pathname } = useLocation();

  return (
    <aside className="submenu">
      <div className="submenu__intro">
        <span className="submenu__label">SUA BIBLIOTECA</span>
        <p>Gerencie sua coleção pessoal.</p>
      </div>

      <nav className="submenu__navigation">
        <Link
          to="/livros"
          className={`submenu__link${pathname === "/livros" ? " submenu__link--active" : ""}`}
        >
          <span>01</span>
          Todos os livros
        </Link>
        <Link
          to="/livros/cadastro"
          className={`submenu__link${pathname === "/livros/cadastro" ? " submenu__link--active" : ""}`}
        >
          <span>02</span>
          Cadastrar livro
        </Link>
      </nav>
    </aside>
  );
}

export default SubmenuLivros
