const mongoose = require('mongoose');


const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  numeroPaginas: { type: Number, required: true },
  isbn: { type: String, required: true },
  editora: { type: String, required: true },
  status: {
    type: String,
    enum: ['quero-ler', 'lendo', 'lido'],
    default: 'quero-ler'
  }
});


const livroModel = mongoose.model('Livro', livroSchema);

module.exports = { livroModel };
