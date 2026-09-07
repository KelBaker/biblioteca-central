import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./index.scss";

const Home = () => {
  return (
    <main className="home">
      <Header />
      <section className="home__hero">
        <div className="home__eyebrow">BIBLIOTECA CENTRAL</div>
        <h1>
          Uma coleção para
          <span> voltar sempre.</span>
        </h1>
        <p>
          Organize, explore e acompanhe seus livros em um espaço simples,
          visual e feito para suas leituras.
        </p>
        <div className="home__actions">
          <Link to="/livros" className="home__primary-action">
            Explorar livros
          </Link>
          <Link to="/livros/cadastro" className="home__secondary-action">
            Cadastrar novo livro
          </Link>
        </div>
      </section>
      <section className="home__details">
        <div>
          <strong>01</strong>
          <span>Organização</span>
        </div>
        <div>
          <strong>02</strong>
          <span>Descoberta</span>
        </div>
        <div>
          <strong>03</strong>
          <span>Memória</span>
        </div>
      </section>
    </main>
  );
};

export default Home;
