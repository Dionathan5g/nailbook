// Mostrar loader durante o processamento
document.addEventListener('DOMContentLoaded', function() {
    // Esconder loader quando a página carregar
    setTimeout(function() {
        document.querySelector('.loader').classList.remove('active');
    }, 1000);
    
    // Atualizar preço quando selecionar serviço
    const servicoSelect = document.getElementById('servico_id');
    if (servicoSelect) {
        servicoSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const preco = selectedOption.getAttribute('data-preco');
            if (preco) {
                document.getElementById('preco').value = 'R$ ' + parseFloat(preco).toFixed(2).replace('.', ',');
            }
        });
    }
    
    // Adicionar efeito de ripple aos botões
    document.querySelectorAll('.btn, button, .menu a').forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Mostrar loader ao enviar formulários
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            document.querySelector('.loader').classList.add('active');
        });
    });
});

// Função para mostrar alertas
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            alert.remove();
        }, 500);
    }, 3000);
}

// Adicionar keyframes dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    
    .ripple {
        position: absolute;
        background: rgba(255,255,255,0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);