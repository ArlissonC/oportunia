<h2 align="center">
 <br>Oportunia - Vagas de TI
</h2>

<h4 align="center">
Plataforma que conecta empresa e candidatos
</h4>
<img src="https://i.imgur.com/6UkhqxE.png">

## 💻 Overview

Projeto desenvolvido utilizando Next.js e .NET 7. Neste projeto, empresas podem aproveitar a plataforma para efetuar o cadastro de informações cruciais, bem como anunciar suas vagas de maneira clara e acessível. Por sua vez, os candidatos desfrutam de um processo simplificado de registro e candidatura, proporcionando uma interação intuitiva e eficaz com as oportunidades disponíveis.
## ✅ Principais Features

### Empresa
- [x] Gestão de vagas 
- [x] Gestão de candidatos
- [x] Visualização de perfil do candidato, junto a currículo e experiências
- [x] Gestão de perfil 
- [x] Gestão de endereço
- [x] Adicionar / Editar logo da empresa
- [x] Gestão de dados de login

### Candidato
- [x] Candidatura simplificada
- [x] Gestão de candidaturas
- [x] Adicionar / Editar foto de perfil
- [x] Adicionar / Editar currículo PDF
- [x] Visualização de perfil da empresa
- [x] Gestão de perfil
- [x] Gestão de dados de login

### Autenticação
- [x] Login
- [x] Registro de Empresa / Candidato
- [x] Recuperar senha
- [x] Resetar senha

## 💻 Tecnologias

- Next.js
- TailwindCSS
- Zustand
- .NET 7
- Dapper
- SQL Server
- Docker
- Entity Framework Core
- Identity Server
- SendGrid

---
#### Rodando o Projeto 
```
# Clone este repositório
$ git clone https://github.com/ArlissonC/oportunia.git

# Abra o terminal na pasta do projeto e execute o comando
$ docker-compose up

# Ainda na pasta do projeto, você precisará subir o banco de dados para o container SQL Server.
1. Copie o arquivo de backup para o cointainer
$ docker cp Oportunia.bak oportuniaDB:/tmp
2. Acesse o Terminal Dentro do Contêiner:
$ docker exec -it oportuniaDB bash
3. Restaure o banco
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P password@2023 -Q "RESTORE DATABASE Oportunia FROM DISK = '/tmp/Oportunia.bak' WITH MOVE 'Oportunia' TO '/var/opt/mssql/data/Oportunia.mdf', MOVE 'Oportunia_log' TO '/var/opt/mssql/data/Oportunia_log.ldf';"

