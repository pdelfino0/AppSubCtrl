-- Criar o banco se não existir
CREATE DATABASE IF NOT EXISTS AppSubCtrlDatabase;

-- Usar a database criada
USE AppSubCtrlDatabase;

-- Criar a tabela ClienteEntity
CREATE TABLE IF NOT EXISTS ClienteEntity (
    codigo INT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100)
);

-- Criar a tabela Aplicativo
CREATE TABLE IF NOT EXISTS Aplicativo (
    codigo INT PRIMARY KEY,
    nome VARCHAR(100),
    custoMensal DECIMAL(10, 2)
);

CREATE TABLE Assinatura (
  codigo INT PRIMARY KEY,
  appCod INT NOT NULL,
  cliCod INT NOT NULL,
  dataPagamento DATE NOT NULL,
  CONSTRAINT FK_aplicativo FOREIGN KEY (appCod) REFERENCES Aplicativo(codigo),
  CONSTRAINT FK_cliente FOREIGN KEY (cliCod) REFERENCES Cliente(codigo)
);