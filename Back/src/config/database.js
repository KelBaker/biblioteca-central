const mongoose = require('mongoose');

// usa a variável de ambiente MONGO_URI em produção (Atlas, por exemplo);
// cai pro MongoDB local como padrão pra facilitar o desenvolvimento
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/livros';

const connection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro de conexão:', error);
    throw error;
  }
};

module.exports = connection;
