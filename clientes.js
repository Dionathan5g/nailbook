document.addEventListener("DOMContentLoaded", () => {
  fetch("Dados/relatorios.csv")
    .then(res => res.text())
    .then(data => {
      const linhas = data.split("\n");
      const tabela = document.getElementById("lista-clientes");

      linhas.forEach(linha => {
        const colunas = linha.split(";");
        if (colunas.length >= 5) {
          const [data, nome, servico, valor, status] = colunas;
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td>${data}</td>
            <td>${nome}</td>
            <td>${servico}</td>
            <td>${valor}</td>
            <td class="${status.trim().toLowerCase()}">${status}</td>
            <td>
              ${status.trim() === "pendente" ? `
                <button onclick="marcarStatus('${linha}', 'feito')">Feito</button>
                <button onclick="marcarStatus('${linha}', 'cancelado')">Cancelar</button>
              ` : "—"}
            </td>
          `;
          tabela.appendChild(tr);
        }
      });
    });
});

function marcarStatus(linhaOriginal, novoStatus) {
  // Isso deve chamar um backend ou script PHP para regravar o arquivo.
  alert(`Status de \"${linhaOriginal}\" atualizado para: ${novoStatus}`);
  // Aqui você poderia chamar um endpoint PHP ou Node.js para editar o CSV.
}
