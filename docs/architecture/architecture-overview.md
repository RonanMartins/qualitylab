# Arquitetura de Alto Nível

## Objetivo

Documentar a arquitetura inicial do QualityLab para orientar a implementação da infraestrutura e das aplicações do Order Management System (OMS) simplificado.

## Visão Geral

O QualityLab será composto por um frontend React + Vite, uma API NestJS e PostgreSQL como persistência principal. A solução foi planejada para permitir estudos de Engenharia de Qualidade em um cenário semelhante a um ambiente profissional.

## Modelo de Domínio

O OMS simplificado é organizado nos seguintes módulos:

- Authentication
- Users
- Customers
- Products
- Inventory
- Orders
- Dashboard

## Fluxo Principal

1. Usuário interage com o Frontend (React + Vite).
2. Frontend (React + Vite) envia uma requisição ao Backend API (NestJS).
3. Backend API (NestJS) consulta ou persiste dados no PostgreSQL.
4. Backend API (NestJS) retorna a resposta ao Frontend.

## Componentes

| Componente | Responsabilidade |
| --- | --- |
| React + Vite | Interface web utilizada pelo usuário. |
| NestJS API | Exposição da API e implementação das regras do OMS. |
| PostgreSQL | Persistência dos dados do domínio. |
| pgAdmin | Administração e inspeção do PostgreSQL em ambiente de desenvolvimento. |
| Redis (Future) | Componente futuro para necessidades de cache ou processamento assíncrono. |

## Princípios Arquiteturais

- **API First:** a API e seus contratos orientam integrações e implementação.
- **Docker First:** os componentes devem executar em ambiente reproduzível por containers.
- **Test First:** funcionalidades devem possuir estratégia de testes desde o início.
- **Documentation First:** decisões, contratos e arquitetura devem ser documentados junto à evolução do projeto.

## Evolução

A arquitetura inicia como um monólito modular, adequado ao escopo educacional e à validação dos fluxos de qualidade. Redis é mantido como previsão de evolução e poderá ser introduzido quando houver uma necessidade concreta de cache, filas ou processamento assíncrono.

## Diagrama

O diagrama Mermaid de visão do sistema está disponível em [system-overview.mmd](system-overview.mmd).

## Histórico de alterações

| Versão | Data | Descrição |
| --- | --- | --- |
| 1.0 | 2026-07-21 | Criação da documentação inicial de arquitetura. |
