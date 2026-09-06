import axios from "axios";

// em produção, defina VITE_API_URL no .env com a URL do backend hospedado
// (ex.: Render); sem essa variável, usa o backend local para desenvolvimento
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export class LivrosService{
    static getLivros(){
        return axios.get(BASE_URL+'/livros');
    }

    static getLivro(id){
        return axios.get(`${BASE_URL}/livros/${id}`);
    }

    static createLivro(body){
        return axios.post(`${BASE_URL}/livros`,body);
    }

    static updateLivro(id,body){
        return axios.put(`${BASE_URL}/livros/${id}`,body);
    }

    static deleteLivro(id){
        return axios.delete(`${BASE_URL}/livros/${id}`);
    }
    
}