# QualityLab

Ambiente de estudos de Engenharia de Qualidade baseado em um Order Management System (OMS) simplificado.

## Pré-requisitos

- Docker Desktop com Docker Compose v2

## Como executar

1. Copie os arquivos de exemplo, se desejar executar os serviços fora dos containers:

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

2. Inicie o ambiente:

   ```bash
   docker compose up --build
   ```

   Em execuções posteriores, também é possível usar:

   ```bash
   docker compose up
   ```

3. Para encerrar os serviços, use `docker compose down`.

## URLs disponíveis

| Serviço | URL |
| --- | --- |
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |
| pgAdmin | http://localhost:5050 |
| PostgreSQL | `localhost:5432` |

O banco criado pelo ambiente é `qualitylab`.

## Project Documentation

- [`docs/`](docs/) concentra a documentação arquitetural e de domínio do projeto, incluindo seus diagramas.
- [`QUALITY_GATE.md`](QUALITY_GATE.md) define o checklist oficial para aprovação das Sprints.
- [`ROADMAP.md`](ROADMAP.md) registra a evolução do projeto e o planejamento das próximas Sprints.
