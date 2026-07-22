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

## 📚 Engineering Practices

O QualityLab utiliza práticas de engenharia de software para garantir qualidade,
padronização, previsibilidade e rastreabilidade durante todo o ciclo de desenvolvimento.

### Governance

- [Development Workflow](docs/governance/DEVELOPMENT_WORKFLOW.md)
- [Quality Gate](docs/governance/QUALITY_GATE.md)
- [Roadmap](docs/governance/ROADMAP.md)

### Architecture

- [Architecture Overview](docs/architecture/architecture-overview.md)
- [ADR (Architecture Decision Records)](docs/architecture/ADR/)
- [Domain Model](docs/architecture/domain/domain-model.md)

### Technical Decisions

- [Sprint Technical Decisions](docs/architecture/technical-decisions/technology-decisions.md)
