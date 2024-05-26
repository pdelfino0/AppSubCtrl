const mysql = require('mysql');
const path = require('path');
const fs = require('fs');

const configPath = path.resolve(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Create a connection to the MySQL server
const connection = mysql.createConnection(
  {
    host: config.database.host,
    user: config.database.username,
    password: config.database.password,
    database: config.database.database,
  },
);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }

  console.log('Connected to database.');

  // Insert data into the Assinatura table
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
  `, (err, results, fields) => {
    if (err) {
      console.error('Error seeding Cliente table: ' + err.stack);
      return;
    }

    console.log('Cliente table seeded.');
  });

  // Insert data into the Usuario table
  connection.query(`
 INSERT INTO Usuario (usuario, senha) VALUES
  ('admin', 'admin'),
  ('usuario', 'senha') 
   `, (err, results, fields) => {
    if (err) {
      console.error('Error seeding Usuario table: ' + err.stack);
      return;
    }

    console.log('Usuario table seeded.');

    // Close the connection
    connection.end((err) => {
      if (err) {
        console.error('Error closing connection: ' + err.stack);
        return;
      }

      console.log('Connection closed.');
    });
  });
});
11;