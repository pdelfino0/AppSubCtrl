const seedAssinatura = (connection) => {
  connection.query(`
  INSERT INTO Assinatura (codigo, inicioVigencia, fimVigencia, aplicativoCodigo, clienteCodigo) VALUES
  (1, '2024-05-20', '2024-06-19', 0, 0),
  (2, '2024-06-19', '2024-07-18', 0, 0),
  (3, '2024-05-20', '2024-06-19', 0, 0),
  (4, '2024-05-22', '2024-06-21', 1, 1),
  (5, '2024-02-18', '2024-03-18', 2, 2),
  (6, '2024-05-22', '2024-06-21', 3, 3),
  (7, '2024-03-22', '2024-04-22', 4, 4),
  (8, '2024-05-22', '2024-06-21', 1, 5),
  (9, '2024-05-22', '2024-06-21', 2, 9),
  (10, '2024-05-22', '2024-06-21', 2, 9)
`, (err) => {
    if (err) {
      console.error('Error seeding Assinatura table: ' + err.stack);
      return;
    }

    console.log('Assinatura table seeded.');
  });
};
module.exports = seedAssinatura;