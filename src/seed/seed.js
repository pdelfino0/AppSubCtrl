const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const seedCliente = require('./seed-cliente');
const seedUsario = require('./seed-usuario');
const seedAplicativo = require('./seed-aplicativo');
const seedAssinatura = require('./seed-assinatura.js');

// Carrega o arquivo de configuração
const configPath = path.resolve(__dirname, '../config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection(
  {
    host: config.database.host,
    user: config.database.username,
    password: config.database.password,
    database: config.database.database,
  },
);

// Conecta ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }

  console.log('Connected to database.');

  // Insere dados na tabela Cliente (função importada de seed-cliente.js)
  seedCliente(connection);

  // Insere dados na tabela Usuario (função importada de seed-usuario.js)
  seedUsario(connection);

  // Insere dados na tabela Aplicativo (função importada de seed-aplicativo.js)
  seedAplicativo(connection);

  // Insere dados na tabela Assinatura (função importada de seed-assinatura.js)
  seedAssinatura(connection);

  // Fecha a conexão
    connection.end((err) => {
      if (err) {
        console.error('Error closing connection: ' + err.stack);
        return;
      }

      console.log('Connection closed.');
    })
});