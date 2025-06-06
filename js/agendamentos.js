document.addEventListener('DOMContentLoaded', function() {
    // Carrega clientes e serviços nos selects
    const clienteSelect = document.getElementById('cliente_id');
    const servicoSelect = document.getElementById('servico_id');
    
    database.clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = cliente.nome;
        clienteSelect.appendChild(option);
    });
    
    database.servicos.forEach(servico => {
        const option = document.createElement('option');
        option.value = servico.id;
        option.textContent = `${servico.nome} - R$ ${servico.preco.toFixed(2)}`;
        option.dataset.preco = servico.preco;
        servicoSelect.appendChild(option);
    });
    
    // Atualiza preço quando seleciona serviço
    servicoSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        document.getElementById('preco').value = `R$ ${parseFloat(selectedOption.dataset.preco).toFixed(2)}`;
    });
    
    // Formulário de agendamento
    document.getElementById('form-agendamento').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const agendamento = {
            id: Date.now(),
            cliente_id: parseInt(this.cliente_id.value),
            servico_id: parseInt(this.servico_id.value),
            data: this.data.value,
            hora: this.hora.value,
            observacoes: this.observacoes.value,
            status: 'agendado',
            data_criacao: new Date().toISOString()
        };
        
        database.agendamentos.push(agendamento);
        saveData();
        
        showAlert('Agendamento realizado com sucesso!', 'success');
        this.reset();
        carregarAgendamentos();
    });
    
    function carregarAgendamentos() {
        const container = document.getElementById('lista-agendamentos');
        container.innerHTML = '';
        
        if (database.agendamentos.length === 0) {
            container.innerHTML = '<p>Nenhum agendamento encontrado.</p>';
            return;
        }
        
        const table = document.createElement('table');
        // Cria cabeçalho e linhas da tabela...
    }
    
    function showAlert(message, type) {
        const alert = document.getElementById('alert');
        alert.textContent = message;
        alert.className = `alert alert-${type}`;
        alert.style.display = 'block';
        
        setTimeout(() => {
            alert.style.display = 'none';
        }, 3000);
    }
    
    // Carrega os agendamentos ao iniciar
    carregarAgendamentos();
});