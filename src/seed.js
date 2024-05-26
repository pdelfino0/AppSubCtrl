const mysql = require('mysql');
const path = require('path');
const fs = require('fs');

// Carrega o arquivo de configuração
const configPath = path.resolve(__dirname, 'config.json');
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

  // Insere dados na tabela Cliente
  connection.query(`
    INSERT INTO Cliente (codigo, nome, email) VALUES 
    (0, 'João Silva', 'joao.silva@example.com'),
    (1, 'Maria Oliveira', 'maria.oliveira@example.com'),
    (2, 'Pedro Santos', 'pedro.santos@example.com'),
    (3, 'Ana Costa', 'ana.costa@example.com'),
    (4, 'Carlos Pereira', 'carlos.pereira@example.com'),
    (5, 'Fernanda Souza', 'fernanda.souza@example.com'),
    (6, 'Ricardo Lima', 'ricardo.lima@example.com'),
    (7, 'Juliana Almeida', 'juliana.almeida@example.com'),
    (8, 'Roberto Ribeiro', 'roberto.ribeiro@example.com'),
    (9, 'Patrícia Fernandes', 'patricia.fernandes@example.com')
  `, (err) => {
    if (err) {
      console.error('Error seeding Cliente table: ' + err.stack);
      return;
    }

    console.log('Cliente table seeded.');
  });

  // Insere dados na tabela Usuario
  connection.query(`
 INSERT INTO Usuario (usuario, senha) VALUES
  ('admin', 'admin'),
  ('usuario', 'senha') 
   `, (err) => {
    if (err) {
      console.error('Error seeding Usuario table: ' + err.stack);
      return;
    }

    console.log('Usuario table seeded.');


    // Insere dados na tabela Aplicativo
    connection.query(`
  INSERT INTO Aplicativo (codigo, nome, custoMensal) VALUES
      (0, 'TaskMaster', 29.99),
      (1, 'BudgetTracker', 19.99),
      (2, 'FitLife', 15.99),
      (3, 'PhotoEditorPro', 24.99),
      (4, 'TravelPlanner', 9.99)
`, (err) => {
      if (err) {
        console.error('Error seeding Aplicativo table: ' + err.stack);
        return;
      }

      console.log('Aplicativo table seeded.');

      connection.query(`
  INSERT INTO Assinatura (codigo, inicioVigencia, fimVigencia, aplicativoCodigo, clienteCodigo) VALUES
  (1, '2024-05-20', '2024-06-19', 0, 0),
  (2, '2024-06-19', '2024-07-18', 0, 0),
  (3, '2024-05-20', '2024-06-19', 0, 0),
  (4, '2024-05-22', '2024-06-21', 1, 1),
  (5, '2024-05-22', '2024-06-21', 2, 2),
  (6, '2024-05-22', '2024-06-21', 3, 3),
  (7, '2024-05-22', '2024-06-21', 4, 4),
  (8, '2024-05-22', '2024-06-21', 1, 5),
  (9, '2024-05-22', '2024-06-21', 2, 9),
  (10, '2024-05-22', '2024-06-21', 2, 9)
`, (err) => {
        if (err) {
          console.error('Error seeding Assinatura table: ' + err.stack);
          return;
        }

        console.log('Assinatura table seeded.');


        // Fecha a conexão
    connection.end((err) => {
      if (err) {
        console.error('Error closing connection: ' + err.stack);
        return;
      }

      console.log('Connection closed.');
    });
      });
    })
  })
});