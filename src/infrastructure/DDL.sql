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

CREATE TABLE IF NOT EXISTS Aplicativo(
    codigo INT PRIMARY KEY,
    codCli INT FOREIGN KEY REFERENCES ClienteEntity(codigo),
    codApp INT FOREIGN KEY REFERENCES Aplicativo(codigo),
    custoMensal DECIMAL(10, 2) );