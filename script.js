let nivel = 1;
let moedas = 0;
let entrada = "";
let respostaCorreta = 0;

function proximaPergunta() {
    const ops = ['+', '-', '*', '/', 'pow', 'sqrt'];
    // Libera operações novas de acordo com o nível
    let limiteOp = 2; // Começa só com + e -
    if (nivel > 3) limiteOp = 3; // Nível 4 libera *
    if (nivel > 6) limiteOp = 4; // Nível 7 libera /
    if (nivel > 10) limiteOp = 6; // Nível 11 libera potência e raiz

    const op = ops[Math.floor(Math.random() * limiteOp)];
    let a = Math.floor(Math.random() * (5 + nivel)) + 1;
    let b = Math.floor(Math.random() * 10) + 1;

    switch(op) {
        case '+': 
            respostaCorreta = a + b; 
            document.getElementById('pergunta').innerText = `${a} + ${b} = ?`; 
            break;
        case '-': 
            if (a < b) [a, b] = [b, a]; // Evita números negativos no início
            respostaCorreta = a - b; 
            document.getElementById('pergunta').innerText = `${a} - ${b} = ?`; 
            break;
        case '*': 
            respostaCorreta = a * b; 
            document.getElementById('pergunta').innerText = `${a} × ${b} = ?`; 
            break;
        case '/': 
            let resMult = a * b; // Garante que a divisão seja exata
            respostaCorreta = a;
            document.getElementById('pergunta').innerText = `${resMult} ÷ ${b} = ?`; 
            break;
        case 'pow':
            respostaCorreta = a * a;
            document.getElementById('pergunta').innerText = `${a}² = ?`;
            break;
        case 'sqrt':
            let quadrado = a * a;
            respostaCorreta = a;
            document.getElementById('pergunta').innerText = `√${quadrado} = ?`;
            break;
    }
    limpar();
}

function add(n) { 
    entrada += n; 
    document.getElementById('display').innerText = entrada; 
}

function limpar() { 
    entrada = ""; 
    document.getElementById('display').innerText = ""; 
}

function confirmar() {
    if(parseInt(entrada) === respostaCorreta) {
        moedas += 10;
        nivel++;
        document.getElementById('moedas').innerText = moedas;
        document.getElementById('nivel').innerText = nivel;
        alert("Excelente! +10 moedas 🪙");
        proximaPergunta();
    } else {
        alert("Ops! Resposta errada. Tente novamente.");
        limpar();
    }
}

function comprar(skin, preco) {
    if(moedas >= preco) {
        moedas -= preco;
        document.getElementById('moedas').innerText = moedas;
        aplicarSkin(skin);
    } else {
        alert("Moedas insuficientes!");
    }
}

function aplicarSkin(skin) {
    const corpo = document.getElementById('corpo-calc');
    const visor = document.getElementById('visor-bg');
    
    if(skin === 'neon') {
        corpo.style.backgroundColor = "#ff00ff";
        corpo.style.boxShadow = "0 0 30px #ff00ff";
    } else if(skin === 'dark') {
        document.querySelectorAll('button').forEach(b => {
            if(!b.classList.contains('btn-buy')) {
                b.style.backgroundColor = "#222";
                b.style.color = "#fff";
            }
        });
    } else if(skin === 'hacker') {
        visor.style.backgroundColor = "#000";
        document.getElementById('display').style.color = "#00ff00";
        document.getElementById('pergunta').style.color = "#00ff00";
    }
}

// Inicia o jogo
proximaPergunta();