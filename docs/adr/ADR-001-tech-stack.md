# ADR-001 - Technology Stack

## Status

Accepted

## Context

O QualityLab é um ambiente de estudo e demonstração de práticas de qualidade. A stack precisa ser produtiva para desenvolvimento local, suportar automação em várias camadas e manter contratos e decisões fáceis de verificar.

## Decision

| Decisão | Escolha |
| --- | --- |
| Backend | NestJS com TypeScript para a API. |
| Banco de dados | PostgreSQL como banco relacional. |
| ORM | Prisma para acesso a dados, schema e migrations. |
| Frontend | React com Vite. |
| Estilização | Tailwind CSS. |
| Documentação | Swagger/OpenAPI como contrato e documentação da API. |
| Containers | Docker Compose para o ambiente local. |
| Testes | Robot Framework, Playwright, Postman, k6 e OWASP ZAP. |
| CI/CD | GitHub Actions. |
| Princípios | API First, Docker First, Test First e Documentation First. |

## Alternatives Considered

| Decisão | Alternativas consideradas |
| --- | --- |
| Backend | Express puro, Java/Spring Boot. |
| Banco de dados | MySQL, MongoDB. |
| ORM | TypeORM, Sequelize. |
| Frontend | Angular, Vue. |
| Estilização | CSS Modules, styled-components. |
| Documentação | Documentação manual sem contrato OpenAPI. |
| Containers | Execução local sem containers. |
| Testes | Uso isolado de uma única ferramenta. |
| CI/CD | Execução manual ou outros provedores de pipeline. |

## Consequences

- A equipe adota TypeScript como linguagem principal da aplicação.
- O ambiente local depende de Docker e Docker Compose.
- O schema Prisma e o contrato OpenAPI tornam-se referências obrigatórias para mudanças de dados e API.
- A automação exige manutenção de suítes e configurações para diferentes tipos de teste.
- Os fluxos de integração passam a ser definidos e executados no GitHub Actions.

## QA Perspective

- Swagger/OpenAPI permite validar contratos e gerar coleções de teste de API.
- Docker Compose reduz divergências entre ambientes de desenvolvimento e teste.
- Prisma e PostgreSQL facilitam a preparação e a inspeção de dados de teste.
- Robot Framework, Playwright, Postman, k6 e OWASP ZAP dão cobertura funcional, E2E, de API, performance e segurança.
- GitHub Actions permite executar verificações automatizadas a cada mudança.

## Interview Notes

Não aplicável nesta decisão inicial.

## References

- NestJS Documentation
- TypeScript Documentation
- PostgreSQL Documentation
- Prisma Documentation
- React and Vite Documentation
- Tailwind CSS Documentation
- OpenAPI Specification
- Docker Compose Documentation
- Robot Framework, Playwright, Postman, k6 and OWASP ZAP Documentation
- GitHub Actions Documentation

## Change History

| Version | Date | Description |
| --- | --- | --- |
| 1.0 | 2026-07-21 | Definição inicial da stack tecnológica. |
