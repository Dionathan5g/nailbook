function handleContactForm() {
    const form = document.getElementById('form-contato');

    if (!form) return; // Se não encontrar o formulário, sai da função

    // Máscara de telefone
    const phoneField = document.getElementById('telefone-contato');
    if (phoneField) {
        phoneField.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

            if (value.length >= 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            }

            if (value.length >= 10) {
                value = value.replace(/^(\(\d{2}\)) (\d{5})(\d{4}).*/, '$1 $2-$3');
            } else if (value.length >= 9) {
                value = value.replace(/^(\(\d{2}\)) (\d{4})(\d{4}).*/, '$1 $2-$3');
            }

            e.target.value = value;
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        showLoader();

        // Obter valores
        const formData = {
            nome: getValue('nome-contato'),
            email: getValue('email-contato'),
            telefone: getValue('telefone-contato'),
            mensagem: getValue('mensagem-contato')
        };

        // Validar
        if (!validateForm(formData)) {
            hideLoader();
            return;
        }

        // Simular envio (substituir por AJAX/backend real)
        setTimeout(() => {
            saveContact(formData);
            hideLoader();
            showAlert('Mensagem enviada com sucesso!', 'success');
            form.reset();
        }, 1500);
    });
}

// Funções auxiliares
function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : '';
}

function validateForm(data) {
    if (!data.nome) {
        showAlert('Por favor, preencha seu nome', 'error');
        return false;
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        showAlert('Por favor, insira um e-mail válido', 'error');
        return false;
    }

    if (!data.telefone || !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(data.telefone)) {
        showAlert('Por favor, insira um telefone válido no formato (99) 99999-9999', 'error');
        return false;
    }

    if (!data.mensagem) {
        showAlert('Por favor, escreva sua mensagem', 'error');
        return false;
    }

    return true;
}

function saveContact(data) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push({
        ...data,
        dataEnvio: new Date().toISOString()
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Alert simples (pode ser melhorado depois com estilo visual)
function showAlert(msg, tipo) {
    alert((tipo === 'error' ? '❌ ' : '✅ ') + msg);
}

// Loader fake (caso esteja usando o .loader no HTML)
function showLoader() {
    const loader = document.querySelector('.loader');
    if (loader) loader.style.display = 'flex';
}

function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) loader.style.display = 'none';
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function () {
    handleContactForm();
});
