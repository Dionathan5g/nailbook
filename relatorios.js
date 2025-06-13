document.addEventListener("DOMContentLoaded", () => {
    // Elementos da tabela
    const tabelaBody = document.querySelector("#tabela-relatorio tbody");
    const totalArrecadado = document.getElementById("total-arrecadado");
    const totalServicos = document.getElementById("total-servicos");
    const totalClientes = document.getElementById("total-clientes");
    
    // Formulário de filtro
    const formFiltro = document.getElementById("form-filtro");
    
    // Carregar dados iniciais
    carregarRelatorios();
    
    // Evento de filtro
    formFiltro.addEventListener("submit", (e) => {
        e.preventDefault();
        carregarRelatorios();
    });
    
    function carregarRelatorios() {
        // Obter valores dos filtros
        const dataInicio = document.getElementById("data-inicio").value;
        const dataFim = document.getElementById("data-fim").value;
        const statusFiltro = document.getElementById("filtro-status").value;
        
        // Obter agendamentos do localStorage
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        tabelaBody.innerHTML = '';
        
        let total = 0;
        let servicosCount = 0;
        const clientesUnicos = new Set();
        
        agendamentos.forEach(agendamento => {
            const statusFormatado = agendamento.status.toLowerCase();
            
            // Aplicar filtros
            const dataValida = (!dataInicio || agendamento.data >= dataInicio) && 
                              (!dataFim || agendamento.data <= dataFim);
            const statusValido = statusFiltro === "todos" || 
                                (statusFiltro === "concluido" && statusFormatado === "feito") ||
                                (statusFiltro === "agendado" && statusFormatado === "agendado") ||
                                (statusFiltro === "cancelado" && statusFormatado === "cancelado");
            
            if (dataValida && statusValido) {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${formatarData(agendamento.data)}</td>
                    <td>${agendamento.nome}</td>
                    <td>${agendamento.servico}</td>
                    <td>R$ ${agendamento.preco.toFixed(2)}</td>
                    <td><span class="badge ${getBadgeClass(statusFormatado)}">${formatarStatus(agendamento.status)}</span></td>
                `;
                tabelaBody.appendChild(tr);
                
                // Calcular totais apenas para serviços concluídos
                if (statusFormatado === "feito") {
                    total += agendamento.preco;
                    servicosCount++;
                    clientesUnicos.add(agendamento.nome);
                }
            }
        });
        
        // Atualizar totais
        totalArrecadado.textContent = `R$ ${total.toFixed(2)}`;
        totalServicos.textContent = servicosCount;
        totalClientes.textContent = clientesUnicos.size;
        
        // Mostrar mensagem se não houver resultados
        if (tabelaBody.children.length === 0) {
            tabelaBody.innerHTML = '<tr><td colspan="5">Nenhum agendamento encontrado com os filtros selecionados</td></tr>';
        }
    }
    
    function formatarData(data) {
        if (!data) return '';
        // Assumindo formato YYYY-MM-DD
        const partes = data.split("-");
        if (partes.length === 3) {
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
        return data;
    }
    
    function formatarStatus(status) {
        const statusMap = {
            "feito": "Concluído",
            "agendado": "Agendado",
            "cancelado": "Cancelado"
        };
        return statusMap[status.toLowerCase()] || status;
    }
    
    function getBadgeClass(status) {
        const statusLower = status.toLowerCase();
        const classMap = {
            "feito": "badge-success",
            "agendado": "badge-info",
            "cancelado": "badge-danger"
        };
        return classMap[statusLower] || "badge-primary";
    }
});
