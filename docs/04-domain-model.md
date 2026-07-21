# Modelo de Domínio

## Objetivo

Definir o modelo de domínio do QualityLab como um Order Management System (OMS) simplificado. Este documento é a referência para futuras entidades Prisma, módulos NestJS, APIs e casos de teste.

O diagrama de visão geral está em `docs/diagrams/domain-overview.mmd`. O ER Diagram técnico oficial é mantido em `docs/diagrams/domain-model.mmd`.

## Entidades

### Authentication

| Entidade | Atributos principais | Responsabilidade |
| --- | --- | --- |
| User | UUID, name, email, passwordHash, roleId, active | Representa um usuário autenticado no sistema. |
| Role | UUID, name | Define o papel e as permissões atribuídas aos usuários. |

### Customer

| Entidade | Atributos principais | Responsabilidade |
| --- | --- | --- |
| Customer | UUID, name, email, phone, zipCode, street, number, complement, district, city, state, status, deletedAt, createdAt, updatedAt | Representa o cliente que realiza pedidos. |

- `email` e `phone` são únicos.
- `status` utiliza `CustomerStatus`; `deletedAt` registra a exclusão lógica.
- Os campos de endereço foram definidos para preparar o modelo para futura integração com consulta pública de CEP. Essa consulta poderá preencher os dados de endereço a partir de `zipCode`, sem alterar a estrutura principal da entidade.

### Product

| Entidade | Atributos principais | Responsabilidade |
| --- | --- | --- |
| Product | UUID, sku, name, description, imageUrl, ncm, price, category, status, createdAt, updatedAt | Representa um item disponível para venda. |

- `sku` é único.
- `name` é obrigatório.
- `description` possui no máximo 200 caracteres.
- `imageUrl` e `category` são opcionais.
- `ncm` possui exatamente 8 dígitos.
- `price` é Decimal.

### Inventory

| Entidade | Atributos principais | Responsabilidade |
| --- | --- | --- |
| Inventory | UUID, productId, quantity | Mantém o saldo disponível de cada produto. |
| InventoryMovement | UUID, inventoryId, type, quantity, createdAt | Registra entradas, saídas e ajustes de estoque. |

A versão inicial mantém um único estoque. Múltiplos estoques poderão ser adicionados em versões futuras sem alteração da estrutura principal do domínio.

### Order

| Entidade | Atributos principais | Responsabilidade |
| --- | --- | --- |
| Order | UUID, customerId, subtotal, discount, total, status, createdBy, createdAt, updatedAt | Representa o pedido realizado por um cliente. |
| OrderItem | UUID, orderId, productId, quantity, unitPrice, total | Representa cada produto incluído em um pedido. |

- `subtotal`, `discount` e `total` são Decimal.
- `createdBy` referencia o `User` responsável pela criação do pedido.

### Dashboard

O Dashboard não possui entidade própria. Ele consolida dados das entidades de pedidos, produtos, clientes e estoque.

## Relacionamentos

- Uma `Role` pode estar associada a vários `User`; cada `User` possui uma `Role`.
- Um `Customer` pode possuir vários `Order`; cada `Order` pertence a um `Customer`.
- Um `User` pode criar vários `Order`; cada `Order` possui um `createdBy`.
- Um `Product` possui um `Inventory`; cada `Inventory` pertence a um `Product`.
- Um `Inventory` possui vários `InventoryMovement`; cada movimento pertence a um estoque.
- Um `Order` possui um ou mais `OrderItem`; cada item pertence a um pedido.
- Um `Product` pode constar em vários `OrderItem`; cada item referencia um produto.

## Estados (Enums)

### OrderStatus

- `PENDING`
- `PAID`
- `CANCELLED`
- `SHIPPED`

### ProductStatus

- `ACTIVE`
- `INACTIVE`

### CustomerStatus

- `ACTIVE`
- `INACTIVE`

### InventoryMovementType

- `IN`
- `OUT`
- `ADJUSTMENT`

## Regras de Negócio

### Produto

- SKU deve ser único.
- Nome é obrigatório.
- Preço deve ser maior que zero.
- Descrição é limitada a 200 caracteres.
- NCM deve possuir exatamente 8 dígitos.
- `imageUrl` e `category` são opcionais.
- Produto com status `INACTIVE` não pode ser vendido.

### Cliente

- E-mail deve ser único.
- Telefone deve ser único.
- Cliente pode ser inativado pelos estados `ACTIVE` e `INACTIVE`.
- A exclusão é lógica e registrada em `deletedAt`.

### Pedido

- Pedido deve possuir pelo menos um item.
- Pedido não pode ser pago duas vezes.
- Ao ser pago, o pedido reduz o estoque dos produtos incluídos.
- O cancelamento não devolve estoque automaticamente.
- Desconto não pode ser negativo.
- O total nunca pode ser menor que zero.

## Próximos Passos

1. Converter o modelo em schema Prisma e migrations.
2. Criar módulos NestJS e contratos de API para cada domínio.
3. Definir cenários de teste para validação das regras de negócio e transições de estado.
4. Detalhar autenticação e autorização a partir de `User` e `Role`.
