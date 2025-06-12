document.addEventListener("DOMContentLoaded", () => {
  fetch("Dados/relatorios.csv")
    .then(res => res.text())
    .then(data => {
      const linhas = data.split("\n");
      const corpo = document.getElementById("relatorio-body");
      let total = 0;

      linhas.forEach(linha => {
        const colunas = linha.split(";");
        if (colunas.length >= 5) {
          const [data, nome, servico, valor, status] = colunas;
          if (status.trim().toLowerCase() === "feito") {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${data}</td>
              <td>${nome}</td>
              <td>${servico}</td>
              <td>R$ ${parseFloat(valor).toFixed(2)}</td>
            `;
            corpo.appendChild(tr);
            total += parseFloat(valor);
          }
        }
      });

      document.getElementById("valor-total").textContent = `R$ ${total.toFixed(2)}`;
    });
});
