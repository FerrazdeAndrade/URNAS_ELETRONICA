
let etapa = 1;

let numeroDigitado = "";

let votos = [];


const candidatos = {

    governador: {
        numero: "22",
        nome: "Douglas Ruas",
        cargo: "GOVERNADOR",
        foto: "imagens/download.jpeg"
    },

    presidente: {
        numero: "22",
        nome: "Flavio Bolsonaro",
        cargo: "PRESIDENTE",
        foto: "imagens/D_NQ_NP_878703-MLB106309111806_022026-O-poster-flavio-bolsonaro-presidente-30x45cm-plastificado.webp"
    }

};


function digitar(numero) {

    if (numeroDigitado.length >= 2) {
        return;
    }


    numeroDigitado += numero;


    atualizarNumero();


    if (numeroDigitado.length === 2) {

        mostrarCandidato();

    }

}


function atualizarNumero() {

    document.getElementById("digito1").textContent =
        numeroDigitado[0] || "";


    document.getElementById("digito2").textContent =
        numeroDigitado[1] || "";

}


function mostrarCandidato() {

    let candidato;


    if (etapa === 1) {

        candidato = candidatos.governador;

    } else {

        candidato = candidatos.presidente;

    }


    if (numeroDigitado !== candidato.numero) {

        document.getElementById("nome").textContent =
            "VOTO NULO";


        document.getElementById("partido").textContent =
            "Número inválido";


        document.getElementById("foto").style.display =
            "none";


        document.getElementById("candidato").classList.add("mostrar");


        return;

    }


    document.getElementById("nome").textContent =
        candidato.nome;


    document.getElementById("partido").textContent =
        candidato.cargo;


    const foto = document.getElementById("foto");


    foto.src = candidato.foto;

    foto.alt = candidato.nome;

    foto.style.display = "block";


    document.getElementById("candidato")
        .classList.add("mostrar");

}


function corrigir() {

    numeroDigitado = "";


    document.getElementById("digito1").textContent = "";

    document.getElementById("digito2").textContent = "";


    document.getElementById("nome").textContent =
        "Digite o número";


    document.getElementById("partido").textContent =
        "Número: 22";


    document.getElementById("foto").src = "";

    document.getElementById("foto").style.display =
        "none";


    document.getElementById("candidato")
        .classList.remove("mostrar");

}


function branco() {

    votos.push({

        voto: etapa,

        cargo: etapa === 1
            ? "GOVERNADOR"
            : "PRESIDENTE",

        tipo: "BRANCO"

    });


    confirmarEtapa();

}


function confirmar() {

    if (numeroDigitado.length !== 2) {

        alert("Digite os dois números.");

        return;

    }


    const candidato = etapa === 1
        ? candidatos.governador
        : candidatos.presidente;


    if (numeroDigitado !== candidato.numero) {

        alert("Número inválido. Corrija o voto.");

        return;

    }


    const voto = {

        voto: etapa,

        cargo: candidato.cargo,

        numero: candidato.numero,

        candidato: candidato.nome,

        data: new Date().toLocaleString("pt-BR")

    };


    votos.push(voto);


    salvarLocalmente(voto);


    confirmarEtapa();

}


function salvarLocalmente(voto) {

    let registros =
        JSON.parse(localStorage.getItem("votos_urna")) || [];


    registros.push(voto);


    localStorage.setItem(
        "votos_urna",
        JSON.stringify(registros)
    );

}


function confirmarEtapa() {

    if (etapa === 1) {

        alert("VOTO 1 CONFIRMADO!");


        etapa = 2;


        numeroDigitado = "";


        document.getElementById("cargo").textContent =
            "VOTO 2";


        document.getElementById("tipoVoto").textContent =
            "PRESIDENTE";


        corrigir();


        return;

    }


    alert("VOTO 2 CONFIRMADO!");


    finalizarVotacao();

}


function finalizarVotacao() {

    document.getElementById("tela").style.display =
        "none";


    document.getElementById("fim").style.display =
        "flex";


    console.log("VOTOS REGISTRADOS:");

    console.log(votos);

}
