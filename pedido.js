"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Calcula o total do pedido
function calcularTotal(pedido, descontoPercentual) {
    if (pedido.status === "cancelado") {
        return 0;
    }
    const total = pedido.itens.reduce((soma, item) => soma + item.preco, 0);
    if (descontoPercentual === undefined) {
        return total;
    }
    if (!Number.isFinite(descontoPercentual) ||
        descontoPercentual < 0 ||
        descontoPercentual > 100) {
        console.error("Erro: desconto inválido!");
        return total;
    }
    return total * (1 - descontoPercentual / 100);
}
// Adiciona um item ao pedido
function adicionarItem(pedido, novoItem) {
    if (pedido.status === "pago" ||
        pedido.status === "cancelado") {
        console.error("Erro: não é possível adicionar itens a um pedido pago ou cancelado.");
        return;
    }
    pedido.itens.push(novoItem);
    console.log(`Item "${novoItem.nome}" adicionado com sucesso!`);
}
// Criando um pedido para testar
const pedido = {
    id: 1,
    cliente: "João",
    status: "aberto",
    itens: [
        {
            id: 1,
            nome: "Hambúrguer",
            preco: 30,
            categoria: "prato_principal"
        },
        {
            id: 2,
            nome: "Refrigerante",
            preco: 10,
            categoria: "bebida"
        }
    ],
    observacoes: "Sem cebola"
};
// Exibindo os resultados no terminal
console.log("===== SISTEMA DE PEDIDOS =====");
console.log("Cliente:", pedido.cliente);
console.log("Total sem desconto: R$", calcularTotal(pedido));
console.log("Total com 10% de desconto: R$", calcularTotal(pedido, 10));
// Adicionando um item
adicionarItem(pedido, {
    id: 3,
    nome: "Batata frita",
    preco: 15,
    categoria: "prato_principal"
});
console.log("Total após adicionar item: R$", calcularTotal(pedido));
// Testando desconto inválido
console.log("Total com desconto inválido: R$", calcularTotal(pedido, 150));
// Testando pedido pago
pedido.status = "pago";
adicionarItem(pedido, {
    id: 4,
    nome: "Sorvete",
    preco: 12,
    categoria: "sobremesa"
});
// Testando pedido cancelado
pedido.status = "cancelado";
console.log("Total do pedido cancelado: R$", calcularTotal(pedido));
//# sourceMappingURL=pedido.js.map