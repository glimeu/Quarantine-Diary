import mongoose from 'mongoose';

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(console.log('Banco de dados carregado com sucesso!'))
  .catch(console.log);
