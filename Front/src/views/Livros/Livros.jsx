import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './index.scss';
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { LivrosService } from '../../api/LivrosService';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';  

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function getLivros() {
    setLoading(true);
    try {
      const { data } = await LivrosService.getLivros();
      setLivros(data);
    } catch (error) {
      toast.error('Erro ao carregar os livros');
    } finally {
      setLoading(false);
    }
  }

  async function deleteLivro(livroId) {
    if (deleting) return; 
    setDeleting(true);
    const valida = window.confirm(`Você realmente deseja remover o livro de ID: ${livroId}?`);
    if (valida) {
      setLoading(true);
      try {
        const { data } = await LivrosService.deleteLivro(livroId);
        toast.success(data.message);
        getLivros();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Erro ao remover o livro.');
      } finally {
        setLoading(false);
        setDeleting(false);
      }
    } else {
      setDeleting(false);
    }
  }

  useEffect(() => {
    getLivros();
  }, []);

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className='livros'>
        <h1>Escolha o seu livro</h1>
        {loading ? (
          <p>Carregando livros...</p> 
        ) : livros.length === 0 ? (
          <p>Não há livros disponíveis no momento.</p>  
        ) : (
          <ul>
            {livros.map((livro) => (
              <li key={livro._id}> 
                <div className="livro-info">
                  <h2>{livro.titulo}</h2>
                  <span>{livro.editora}</span>
                </div>
                <div className='botoes'>
                  <div>
                    <Link className='btn edit' to={`/livros/edicao/${livro._id}`} disabled={loading}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                      </svg> 
                    </Link>
                  </div>
                  <div>
                    <button className='btn delete' onClick={() => { deleteLivro(livro._id) }} disabled={loading || deleting}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ToastContainer /> 
    </>
  );
}

export default Livros;
