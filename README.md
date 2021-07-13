# Como Utilizar

O sistema foi configurado para funcionar na porta 8080 (pode ser alterada no arquivo index.ts) com o comando yarn dev quando todas as dependências tiverem sido instaladas localmente. E no arquivo database/database.ts estão as configurações do banco de dados que devem ser adicionadas de acordo com as configurações (nome do banco, usuário e senha).

# Funcionalidades

## Nível 1

### Movimentações Financeiras

Um usuário pode cadastrar movimentações financeiras na sua carteira assim que o mesmo estiver cadastrado e logado no sistema, começando com um saldo sempre de 0 e não sendo possível fazer transações que façam seu saldo ficar negativo.

### Observações

Cada nova transação feita pode ser salva junto com uma observação que é salva junto com ela no banco de dados.

### Mostrar quantia

No menu inicial é mostrado o valor total que está salvo na carteira.

## Nível 2

### Categorias

Na navbar há a opção categorias, que direciona para uma página onde é possível ver todas as categorias, criar, editar e excluir. Estas aparecem como opções quando uma nova transação for feita.

## Nível 3

### Histórico

Na navbar há uma opçaõ de histórico, onde são mostradas todas as transações feitas na carteira, exibindo as mais recentes primeiro.

### Filtrar por data

Na página do histórico a dois campos que podem ser preenchidos com datas, para filtrar transações apenas deste período.

### Exportar CSV

Também na página do histórico há outros dois campo com datas porém com um botão que gera o CSV para ser exportado.

## Nível 4

### Controle de acesso

Os usuário se cadastram no sistema utilizando um email e uma senha, ficando armazenada uma sessão dos mesmos.

### Amigos e identificar pagamento

Não implementado
