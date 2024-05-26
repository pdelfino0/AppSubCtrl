const seedAplicativo = (connection) => {

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
    },
  );
};

module.exports = seedAplicativo;