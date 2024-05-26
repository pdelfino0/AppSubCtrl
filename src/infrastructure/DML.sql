-- Inserir dados na tabela `Cliente`
INSERT INTO `Cliente`(`codigo`, `nome`, `email`) VALUES
(0, 'João Silva', 'joao.silva@example.com'),
(1, 'Maria Oliveira', 'maria.oliveira@example.com'),
(2, 'Pedro Santos', 'pedro.santos@example.com'),
(3, 'Ana Costa', 'ana.costa@example.com'),
(4, 'Carlos Pereira', 'carlos.pereira@example.com'),
(5, 'Fernanda Souza', 'fernanda.souza@example.com'),
(6, 'Ricardo Lima', 'ricardo.lima@example.com'),
(7, 'Juliana Almeida', 'juliana.almeida@example.com'),
(8, 'Roberto Ribeiro', 'roberto.ribeiro@example.com'),
(9, 'Patrícia Fernandes', 'patricia.fernandes@example.com');

-- Inserir dados na tabela `Aplicativo`
INSERT INTO `Aplicativo`(`codigo`, `nome`, `custoMensal`) VALUES
(0, 'TaskMaster', 29.99),
(1, 'BudgetTracker', 19.99),
(2, 'FitLife', 15.99),
(3, 'PhotoEditorPro', 24.99),
(4, 'TravelPlanner', 9.99);

-- Inserir dados na tabela Assinatura

INSERT INTO `Assinatura`(`codigo`, `inicioVigencia`, `fimVigencia`, `aplicativoCodigo`, `clienteCodigo`)
VALUES
(1, '2024-05-20', '2024-06-19', 0, 0),
(2, '2024-06-19', '2024-07-18', 0, 0),
(3, '2024-05-20', '2024-06-19', 0, 0),
(4, '2024-05-22', '2024-06-21', 1, 1),
(5, '2024-05-22', '2024-06-21', 2, 2),
(6, '2024-05-22', '2024-06-21', 3, 3),
(7, '2024-05-22', '2024-06-21', 4, 4),
(8, '2024-05-22', '2024-06-21', 1, 5),
(9, '2024-05-22', '2024-06-21', 2, 9),
(10, '2024-05-22', '2024-06-21', 2, 9);

--Inserir dados na tabela Usuario
INSERT INTO `Usuario`(`usuario`, `senha`) VALUES ("admin","admin")