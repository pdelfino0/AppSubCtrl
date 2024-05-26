const seedCliente = (connection) => {
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
};

module.exports = seedCliente;
