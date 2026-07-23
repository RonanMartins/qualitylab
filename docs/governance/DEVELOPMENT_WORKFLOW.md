# Development Workflow

## Objetivo

Este workflow estabelece a forma oficial de desenvolver o QualityLab. Ele promove qualidade, previsibilidade, colaboração, rastreabilidade e facilidade de manutenção em todas as Sprints.

## Papéis

### Product Owner / QA Engineer

Responsável por:

- requisitos;
- critérios de aceite;
- estratégia de testes;
- validação funcional.

### Solution Architect / Tech Lead

Responsável por:

- arquitetura;
- decisões técnicas;
- Design Review;
- Engineering Review;
- Quality Gate.

### Software Engineer

Responsável por:

- implementação;
- refinamentos;
- aderência às especificações.

## Fluxo Oficial de Desenvolvimento

1. **Design Review:** valida a direção arquitetural e as decisões que antecedem a mudança.
2. **Technical Specification:** registra escopo, requisitos técnicos, critérios de aceite e impactos esperados.
3. **Implementation:** implementa o escopo aprovado conforme a especificação.
4. **Definition of Done:** confirma que a Sprint está tecnicamente pronta para revisão.
5. **Commit:** registra uma alteração coesa, clara e rastreável.
6. **Push:** disponibiliza a branch para colaboração e revisão remota.
7. **Pull Request:** formaliza a proposta de integração, seu escopo e seus impactos.
8. **Engineering Review:** revisa a aderência técnica, a arquitetura e os riscos da alteração.
9. **Quality Gate:** valida os critérios finais de qualidade e regressão.
10. **Merge:** integra a mudança aprovada à `main`.

## Estratégia de Branches

As branches oficiais são `main` e `feature/sprint-x`.

O fluxo é: `feature/sprint-x` → commit → push → Pull Request → Engineering Review → Merge → exclusão da branch.

A `main` representa o estado integrado e estável do projeto. Cada Sprint é desenvolvida em uma feature branch dedicada.

## Convenção de Commits

Os commits devem ser claros, específicos e rastreáveis. O padrão recomendado é:

```text
feat(sprint-8): implement authentication module
```

Mensagens consistentes facilitam a auditoria das mudanças, a leitura do histórico e a identificação do contexto de cada entrega.

## Pull Request

Toda Pull Request deverá conter:

- Objetivo;
- Escopo;
- Implementado;
- Refinamentos;
- Fora do Escopo;
- Impacto;
- Quality Gate.

O campo **Impacto** orienta os testes de regressão e torna explícitas as áreas do sistema que devem ser revalidadas.

## Definition of Done

### Quando uma Sprint pode ser considerada pronta para revisão?

Quando cumprir o checklist mínimo:

- Código implementado;
- Build executado;
- Aplicação inicia corretamente;
- Banco sincronizado;
- Migration aplicada;
- Documentação atualizada;
- Testes executados;
- Nenhum erro bloqueante conhecido.

O Definition of Done (DoD) representa o encerramento técnico da Sprint e sua prontidão para revisão.

## Quality Gate

### Quando uma Sprint pode ser integrada na main?

Quando cumprir o checklist mínimo:

- Engineering Review aprovada;
- Critérios de aceite atendidos;
- Regressão executada;
- Segurança validada;
- Build verde;
- Pull Request aprovada.

O Quality Gate representa a validação final antes do Merge.

## Definition of Done x Quality Gate

O Definition of Done responde: **“Terminamos de desenvolver?”**

O Quality Gate responde: **“Podemos integrar na main?”**

Ambos são complementares: o DoD confirma a conclusão técnica da Sprint; o Quality Gate confirma que ela é segura e aprovada para integração.

## Never Break the Main

`main` deve permanecer sempre funcional. Este é um princípio oficial do projeto.

- O projeto inicia corretamente.
- Docker sobe corretamente.
- O banco permanece consistente.
- O build funciona.
- As dependências são válidas.
- Nenhuma alteração deve impedir outro desenvolvedor de executar o projeto.

## Princípios de Engenharia

- Decisions before implementation.
- Future-proof, not over-engineered.
- Toda alteração arquitetural passa por Design Review.
- Toda Sprint passa por Technical Specification.
- Nunca abrir Pull Request sem cumprir o Definition of Done.
- Nunca realizar Merge sem aprovação do Quality Gate.
- A qualidade deve ser construída durante o desenvolvimento e não apenas validada ao final.
