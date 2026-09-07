import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './index.scss';
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { useParams } from 'react-router-dom';
import { LivrosService } from '../../api/LivrosService';
import { ToastContainer, toast } from 'react-toastify';

const LivrosEdicao = () => {
  let { livroId } = useParams(); 

  const [livro, setLivro] = useState({
    id: '',
    titulo: '',
    numeroPaginas: '',
    isbn: '',
    editora: '',
    status: 'quero-ler',
  });
  const [salvando, setSalvando] = useState(false);

  
  async function getLivro() {
    if (!livroId) {
      toast.error('ID do livro inválido!');
      return;
    }

    try {
      const { data } = await LivrosService.getLivro(livroId);

      setLivro({
        ...data,
        id: livroId,
        numeroPaginas: data.numeroPaginas ? String(data.numeroPaginas) : '', 
      });
    } catch (error) {
      handleError(error);
    }
  }

  
  async function editLivro(event) {
    event.preventDefault();

    
    if (isNaN(livro.numeroPaginas)) {
      toast.error('O número de páginas deve ser um valor numérico.');
      return;
    }

    if (!livro.titulo || !livro.numeroPaginas || !livro.isbn || !livro.editora) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    const body = {
      titulo: livro.titulo,
      numeroPaginas: Number(livro.numeroPaginas),
      isbn: livro.isbn,
      editora: livro.editora,
      status: livro.status,
    };

    setSalvando(true);
    try {
      await LivrosService.updateLivro(livroId, body);
      toast.success('Livro atualizado com sucesso!');
    } catch (error) {
      handleError(error);
    } finally {
      setSalvando(false);
    }
  }

  const handleError = (error) => {
    if (error.response) {
      toast.error(error.response.data?.message || `Erro no servidor (${error.response.status}).`);
    } else if (error.request) {
      toast.error('Erro no servidor. Não houve resposta.');
    } else {
      toast.error(`Erro desconhecido: ${error.message}`);
    }
  };

  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setLivro((prevLivro) => ({
      ...prevLivro,
      [name]: name === 'numeroPaginas' ? String(value) : value, 
    }));
  };

  
  useEffect(() => {
    getLivro(); 
  }, [livroId]);

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Edição de Livros</h1>
        <div className="form-card">
          <form onSubmit={editLivro}>
            <div className="form-group id-group">
              <label>Id</label>
              <input
                type="text"
                disabled
                required
                name="id"
                value={livro.id || ''}
              />
            </div>
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                required
                name="titulo"
                value={livro.titulo || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                required
                name="numeroPaginas"
                value={livro.numeroPaginas !== undefined ? livro.numeroPaginas : ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                required
                name="isbn"
                value={livro.isbn || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                required
                name="editora"
                value={livro.editora || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Status de leitura</label>
              <select name="status" value={livro.status || 'quero-ler'} onChange={handleChange}>
                <option value="quero-ler">Quero ler</option>
                <option value="lendo">Lendo</option>
                <option value="lido">Lido</option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit" disabled={salvando}>
                {salvando ? 'Salvando...' : 'Atualizar Livro'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LivrosEdicao;
