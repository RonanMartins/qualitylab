# Quality Gate

## Objetivo

Estabelecer o checklist oficial para aprovação de cada Sprint do QualityLab, assegurando qualidade, estabilidade e consistência do projeto.

## Critérios obrigatórios para aprovação de uma Sprint

### Build

- [ ] Backend compila sem erros.
- [ ] Frontend compila sem erros.

### Infraestrutura

- [ ] Docker Compose executa corretamente.
- [ ] Todos os containers permanecem ativos.
- [ ] PostgreSQL está em execução.
- [ ] pgAdmin está em execução.
- [ ] Prisma validate executa sem erros.

### Aplicação

- [ ] Backend acessível.
- [ ] Frontend acessível.

### Código

- [ ] Sem erros críticos.
- [ ] Sem dependências quebradas.
- [ ] Alterações revisadas.

### Testes

Quando aplicável:

- [ ] Unit Tests.
- [ ] Integration Tests.
- [ ] API Tests.
- [ ] End-to-End Tests.

### Documentação

- [ ] README atualizado quando necessário.
- [ ] Documentação arquitetural atualizada.
- [ ] ADR criada quando houver decisão arquitetural relevante.

## Definition of Done

Nenhuma Sprint poderá ser considerada concluída enquanto houver itens obrigatórios pendentes neste Quality Gate.
