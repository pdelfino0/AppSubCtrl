const seedUsuario =  (connection) => {
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
  });
};

module.exports = seedUsuario;
