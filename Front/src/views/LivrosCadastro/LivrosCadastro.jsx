import { useState } from 'react';
import Header from '../../components/Header/Header';
import './index.scss';
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { LivrosService } from '../../api/LivrosService';
import { ToastContainer, toast } from 'react-toastify';

const LIVRO_VAZIO = {
  titulo: '',
  numeroPaginas: '',
  isbn: '',
  editora: '',
  status: 'quero-ler'
};

const LivrosCadastro = () => {
  const [livro, setLivro] = useState(LIVRO_VAZIO);
  const [salvando, setSalvando] = useState(false);

  async function createLivro(event) {
    event.preventDefault();

    if (isNaN(livro.numeroPaginas)) {
      toast.error('O número de páginas deve ser um valor numérico.');
      return;
    }

    if (!livro.titulo || !livro.numeroPaginas || !livro.isbn || !livro.editora) {
      toast.error('Preencha todos os campos obrigatórios.');
      return;
    }

    const body = {
      titulo: livro.titulo,
      numeroPaginas: livro.numeroPaginas,
      isbn: livro.isbn,
      editora: livro.editora,
      status: livro.status,
    };

    setSalvando(true);
    try {
      await LivrosService.createLivro(body);
      toast.success('Livro cadastrado com sucesso!');
      setLivro(LIVRO_VAZIO);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao cadastrar o livro.');
    } finally {
      setSalvando(false);
    }
  }

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLivro((prevLivro) => ({
      ...prevLivro,
      [name]: value, 
    }));
  };

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Cadastro de Livros</h1>
        <div className="form-card">
          <form onSubmit={createLivro}>
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                name="titulo"
                required
                value={livro.titulo}
                onChange={handleChange}
                placeholder="Digite o título do livro" 
              />
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                name="numeroPaginas" 
                required
                value={livro.numeroPaginas} 
                onChange={handleChange}
                placeholder="Digite o número de páginas" 
              />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                name="isbn"
                required
                value={livro.isbn}
                onChange={handleChange}
                placeholder="Digite o ISBN do livro" 
              />
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                name="editora"
                required
                value={livro.editora}
                onChange={handleChange}
                placeholder="Digite o nome da editora" 
              />
            </div>
            <div className="form-group">
              <label>Status de leitura</label>
              <select name="status" value={livro.status} onChange={handleChange}>
                <option value="quero-ler">Quero ler</option>
                <option value="lendo">Lendo</option>
                <option value="lido">Lido</option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit" disabled={salvando}>
                {salvando ? 'Salvando...' : 'Cadastrar Livro'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LivrosCadastro;
