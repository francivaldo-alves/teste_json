// Função para exibir o número salvo no painel
function exibirNumeroSalvo(numero) {
  const numeroSalvoDiv = document.getElementById('numeroSalvo');
  numeroSalvoDiv.textContent = `Número Salvo: ${numero}`;
}

// Função para ler o número salvo do arquivo JSON
function lerNumeroSalvo() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      if (data.numero) {
        exibirNumeroSalvo(data.numero);
      }
    })
    .catch(error => console.error('Erro ao ler o arquivo JSON:', error));
}

// Função para salvar o número digitado no arquivo JSON
function salvarNumero(event) {
  event.preventDefault();
  const numeroInput = document.getElementById('numeroInput');
  const numero = parseInt(numeroInput.value, 10);

  if (!isNaN(numero)) {
    const data = { numero: numero };
    fetch('data.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      exibirNumeroSalvo(numero);
      numeroInput.value = '';
    })
    .catch(error => console.error('Erro ao salvar o número:', error));
  } else {
    alert('Por favor, digite um número válido.');
  }
}

// Event listener para o formulário de salvar número
document.getElementById('numeroForm').addEventListener('submit', salvarNumero);

// Carrega o número salvo quando a página é carregada
lerNumeroSalvo();
