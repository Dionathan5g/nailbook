// database.js - Simula um banco de dados
const database = {
  clientes: JSON.parse(localStorage.getItem('clientes')) || [
    { id: 1, nome: "Cliente Exemplo", telefone: "11999999999", email: "exemplo@email.com" }
  ],
  
  servicos: JSON.parse(localStorage.getItem('servicos')) || [
    { id: 1, nome: "Manicure", preco: 30.00 },
    { id: 2, nome: "Pedicure", preco: 40.00 },
    { id: 3, nome: "Unha em Gel", preco: 70.00 },
    { id: 4, nome: "Francesinha", preco: 60.00 }
  ],
  
  agendamentos: JSON.parse(localStorage.getItem('agendamentos')) || []
};

function saveData() {
  localStorage.setItem('clientes', JSON.stringify(database.clientes));
  localStorage.setItem('servicos', JSON.stringify(database.servicos));
  localStorage.setItem('agendamentos', JSON.stringify(database.agendamentos));
}