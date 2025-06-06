// salvar.js - Simula o funcionamento do salvar.php usando LocalStorage
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se há dados no formulário
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('nome') && urlParams.has('servico') && urlParams.has('preco') && 
        urlParams.has('horario') && urlParams.has('data')) {
        
        // Recupera os dados da URL
        const nome = urlParams.get('nome');
        const servico = urlParams.get('servico');
        const preco = parseFloat(urlParams.get('preco'));
        const horario = urlParams.get('horario');
        const data = urlParams.get('data');
        
        // Formata a data para usar como chave
        const dataObj = new Date(data);
        const dataFormatada = `${dataObj.getDate().toString().padStart(2, '0')}-${(dataObj.getMonth()+1).toString().padStart(2, '0')}-${dataObj.getFullYear()}`;
        
        // Cria a estrutura de armazenamento se não existir
        let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || {};
        if (!agendamentos[dataFormatada]) {
            agendamentos[dataFormatada] = [];
        }
        
        // Adiciona o novo agendamento
        agendamentos[dataFormatada].push({
            nome: nome,
            servico: servico,
            preco: preco,
            horario: horario,
            data: data
        });
        
        // Salva no LocalStorage
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        
        // Adiciona também ao relatório geral
        let relatorios = JSON.parse(localStorage.getItem('relatorios')) || [];
        relatorios.push({
            nome: nome,
            servico: servico,
            preco: preco,
            horario: horario,
            data: data
        });
        localStorage.setItem('relatorios', JSON.stringify(relatorios));
        
        // Mostra mensagem de sucesso
        mostrarMensagemSucesso();
    }
});

function mostrarMensagemSucesso() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <div class="alert-box" style="text-align:center; margin-top: 50px;">
            <div class="alert-success" style="animation: fadeIn 0.5s, pulse 1s; display: inline-block; padding: 20px; background-color: #4CAF50; color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin-bottom: 20px;">
                <p style="font-size: 1.2em; font-weight: bold; margin: 0;">✓ Agendamento salvo com sucesso!</p>
            </div>
            <p style="margin-top:20px;">
                <a href="index.html" style="padding: 10px 20px; background-color: #c68df0; color: white; text-decoration: none; border-radius: 6px; transition: all 0.3s; display: inline-block;">Voltar</a>
            </p>
        </div>
    `;
}