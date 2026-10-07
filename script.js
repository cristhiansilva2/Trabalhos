// Seleciona o botão pelo ID
const botao = document.getElementById('btnMudarCor');

// Função para gerar uma cor hexadecimal aleatória
function corAleatoria() {
    const letras = '0123456789ABCDEF';
    let cor = '#';
    for (let i = 0; i < 6; i++) {
        cor += letras[Math.floor(Math.random() * 16)];
    }
    return cor;
}

// Adiciona um evento de clique ao botão
botao.addEventListener('click', function() {
    // Pega uma cor nova
    const novaCor = corAleatoria();
    
    // Altera a cor de fundo do body
    document.body.style.background = novaCor;
});