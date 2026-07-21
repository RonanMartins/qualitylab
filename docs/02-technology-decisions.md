# Decisões de Tecnologia

## Objetivo

Definir a stack inicial do QualityLab como referência para a implementação, a automação de testes e a evolução da arquitetura.

## Stack definida

| Área | Tecnologia | Decisão |
| --- | --- | --- |
| Backend | NestJS + TypeScript | Construir a API com módulos, tipagem estática e convenções consistentes. |
| Banco de dados | PostgreSQL | Utilizar banco relacional robusto e amplamente suportado. |
| ORM | Prisma | Gerenciar acesso a dados, schema e migrations de forma tipada. |
| Frontend | React + Vite | Criar uma interface web com ciclo de desenvolvimento rápido. |
| Estilização | Tailwind CSS | Aplicar estilos por utilitários com consistência visual. |
| Documentação de API | Swagger/OpenAPI | Manter o contrato da API documentado e acessível. |
| Containers | Docker Compose | Padronizar a execução local dos serviços dependentes. |
| Testes | Robot Framework, Playwright, Postman, k6 e OWASP ZAP | Cobrir testes funcionais, E2E, API, performance e segurança. |
| CI/CD | GitHub Actions | Automatizar verificações e fluxos de integração no repositório. |

## Princípios arquiteturais

- **API First:** contratos de API orientam a implementação e a integração.
- **Docker First:** o ambiente deve ser reproduzível por containers.
- **Test First:** cada funcionalidade deve possuir estratégia de testes desde o início.
- **Documentation First:** decisões, contratos e instruções devem ser registrados antes ou junto da implementação.
