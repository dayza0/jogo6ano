const paresMatematicos = [

    {
        id: 1,
        operacao: "2 + 3",
        resultado: "5"
    },

    {
        id: 2,
        operacao: "4 + 4",
        resultado: "8"
    },

    {
        id: 3,
        operacao: "10 - 5",
        resultado: "5"
    },

    {
        id: 4,
        operacao: "3 × 2",
        resultado: "6"
    },

    {
        id: 5,
        operacao: "8 ÷ 2",
        resultado: "4"
    },

    {
        id: 6,
        operacao: "5 + 5",
        resultado: "10"
    }

];


let cartas = [];

let primeiraCarta = null;
let segundaCarta = null;

let bloqueado = false;

let paresEncontrados = 0;

let tentativas = 0;


const inicio = document.getElementById("inicio");

const jogo = document.getElementById("jogo");

const final = document.getElementById("final");

const tabuleiro = document.getElementById("tabuleiro");

const pares = document.getElementById("pares");

const tentativasTexto = document.getElementById("tentativas");

const mensagemFinal = document.getElementById("mensagemFinal");

const iniciar = document.getElementById("iniciar");

const jogarNovamente = document.getElementById("jogarNovamente");


iniciar.addEventListener("click", iniciarJogo);

jogarNovamente.addEventListener("click", reiniciarJogo);


/* INICIAR */

function iniciarJogo() {

    inicio.classList.add("escondido");

    jogo.classList.remove("escondido");

    criarCartas();

}


/* CRIAR CARTAS */

function criarCartas() {

    cartas = [];

    tabuleiro.innerHTML = "";

    paresEncontrados = 0;

    tentativas = 0;

    atualizarInformacoes();


    paresMatematicos.forEach(function(par) {

        cartas.push({
            id: par.id,
            texto: par.operacao,
            tipo: "operacao"
        });


        cartas.push({
            id: par.id,
            texto: par.resultado,
            tipo: "resultado"
        });

    });


    embaralhar(cartas);


    cartas.forEach(function(carta) {

        const elemento = document.createElement("div");

        elemento.classList.add("carta");

        elemento.textContent = "?";


        elemento.dataset.id = carta.id;

        elemento.dataset.texto = carta.texto;


        elemento.addEventListener("click", function() {

            virarCarta(elemento);

        });


        tabuleiro.appendChild(elemento);

    });

}


/* EMBARALHAR */

function embaralhar(array) {

    array.sort(() => Math.random() - 0.5);

}


/* VIRAR CARTA */

function virarCarta(elemento) {

    if (bloqueado) return;

    if (elemento.classList.contains("aberta")) return;

    if (elemento.classList.contains("encontrada")) return;


    elemento.classList.add("aberta");

    elemento.textContent = elemento.dataset.texto;


    if (primeiraCarta === null) {

        primeiraCarta = elemento;

    } else {

        segundaCarta = elemento;

        tentativas++;

        atualizarInformacoes();

        verificarPar();

    }

}


/* VERIFICAR PAR */

function verificarPar() {

    const mesmoPar =
        primeiraCarta.dataset.id === segundaCarta.dataset.id;


    if (mesmoPar) {

        primeiraCarta.classList.add("encontrada");

        segundaCarta.classList.add("encontrada");


        primeiraCarta = null;

        segundaCarta = null;


        paresEncontrados++;

        atualizarInformacoes();


        if (paresEncontrados === paresMatematicos.length) {

            setTimeout(finalizarJogo, 700);

        }

    } else {

        bloqueado = true;


        setTimeout(function() {

            primeiraCarta.classList.remove("aberta");

            segundaCarta.classList.remove("aberta");


            primeiraCarta.textContent = "?";

            segundaCarta.textContent = "?";


            primeiraCarta = null;

            segundaCarta = null;

            bloqueado = false;

        }, 1000);

    }

}


/* ATUALIZAR INFORMAÇÕES */

function atualizarInformacoes() {

    pares.textContent =
        `Pares: ${paresEncontrados}/6`;

    tentativasTexto.textContent =
        `Tentativas: ${tentativas}`;

}


/* FINALIZAR */

function finalizarJogo() {

    jogo.classList.add("escondido");

    final.classList.remove("escondido");


    if (tentativas <= 8) {

        mensagemFinal.textContent =
            `🏆 Incrível! Você encontrou todos os pares em ${tentativas} tentativas!`;

    } else if (tentativas <= 12) {

        mensagemFinal.textContent =
            `🌟 Muito bem! Você encontrou todos os pares em ${tentativas} tentativas!`;

    } else {

        mensagemFinal.textContent =
            `👏 Parabéns! Você encontrou todos os pares em ${tentativas} tentativas. Continue praticando!`;

    }

}


/* REINICIAR */

function reiniciarJogo() {

    final.classList.add("escondido");

    jogo.classList.remove("escondido");

    primeiraCarta = null;

    segundaCarta = null;

    bloqueado = false;

    iniciarJogo();

}