const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".site-menu");
if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}


const fotos = [
    "assets/ft4.jpeg",
    "assets/ft5.png",
    "assets/ft6.jpeg",
    "assets/ft8.jpeg",
    "assets/ft9.jpeg",
    "assets/ft10.png",
    "assets/ft11.jpg",
    "assets/ft12.jpeg",
    "assets/ft13.jpg"
];

let fotoAtual = 0;

const imagemCarrossel = document.getElementById("fotoCarrossel");
const indicadores = document.getElementById("indicadores");

function criarIndicadores() {
    fotos.forEach((foto, indice) => {
        const botao = document.createElement("button");

        botao.className = "indicador";
        botao.setAttribute("aria-label", `Ir para foto ${indice + 1}`);

        botao.addEventListener("click", () => {
            fotoAtual = indice;
            atualizarCarrossel();
        });

        indicadores.appendChild(botao);
    });
}

function atualizarCarrossel() {
    imagemCarrossel.style.opacity = "0";

    setTimeout(() => {
        imagemCarrossel.src = fotos[fotoAtual];
        imagemCarrossel.style.opacity = "1";

        document.querySelectorAll(".indicador").forEach((botao, indice) => {
            botao.classList.toggle("ativo", indice === fotoAtual);
        });

    }, 180);
}

function mudarFoto(direcao) {
    fotoAtual = (fotoAtual + direcao + fotos.length) % fotos.length;
    atualizarCarrossel();
}

criarIndicadores();
atualizarCarrossel();

