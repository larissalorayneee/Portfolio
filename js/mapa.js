const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");

const flag = document.getElementById("flag");
const countryName = document.getElementById("countryName");

const capital = document.getElementById("capital");
const continent = document.getElementById("continent");
const population = document.getElementById("population");
const language = document.getElementById("language");
const currency = document.getElementById("currency");

const message = document.getElementById("message");


let countries = [];


/* ==========================================
   NORMALIZAR TEXTO
========================================== */

function normalizar(texto) {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

}


/* ==========================================
   NOME DO PAÍS EM PORTUGUÊS
========================================== */

function nomeEmPortugues(codigo) {

    try {

        const nomes =
            new Intl.DisplayNames(
                ["pt-BR"],
                {
                    type: "region"
                }
            );


        return nomes.of(codigo) || "";

    } catch (erro) {

        return "";

    }

}


/* ==========================================
   CARREGAR TODOS OS PAÍSES
========================================== */

async function carregarPaises() {

    try {

        message.textContent =
            "⏳ Carregando países...";


        const resposta = await fetch(
            "https://countries.dev/countries"
        );


        if (!resposta.ok) {

            throw new Error(
                "Não foi possível carregar os países."
            );

        }


        countries = await resposta.json();


        if (
            !Array.isArray(countries) ||
            countries.length === 0
        ) {

            throw new Error(
                "A lista de países está vazia."
            );

        }


        message.textContent = "";


        /*
         * Depois de carregar todos os países,
         * mostramos o Brasil.
         */

        const brasil = encontrarPais("Brasil");


        if (brasil) {

            mostrarPais(brasil);

        }


    } catch (erro) {

        console.error(erro);


        message.textContent =
            "❌ Não foi possível carregar os países.";

    }

}


/* ==========================================
   ENCONTRAR PAÍS
========================================== */

function encontrarPais(nomeDigitado) {

    const busca =
        normalizar(nomeDigitado);


    /*
     * 1. Procura pelo nome original da API
     */

    let pais = countries.find(
        pais =>
            normalizar(pais.name) === busca
    );


    if (pais) {

        return pais;

    }


    /*
     * 2. Procura pelo nome nativo
     */

    pais = countries.find(
        pais =>
            pais.nativeName &&
            normalizar(pais.nativeName) === busca
    );


    if (pais) {

        return pais;

    }


    /*
     * 3. Procura pelo nome traduzido
     * para português.
     */

    pais = countries.find(
        pais => {

            if (!pais.alpha2Code) {

                return false;

            }


            const portugues =
                nomeEmPortugues(
                    pais.alpha2Code
                );


            return (
                portugues &&
                normalizar(portugues) === busca
            );

        }
    );


    if (pais) {

        return pais;

    }


    /*
     * 4. Procura por parte do nome.
     *
     * Exemplo:
     *
     * "Coreia" encontra Coreia do Sul.
     */

    pais = countries.find(
        pais => {

            const nomePais =
                normalizar(pais.name);


            return (
                nomePais.includes(busca) &&
                busca.length >= 3
            );

        }
    );


    return pais || null;

}


/* ==========================================
   MOSTRAR PAÍS
========================================== */

function mostrarPais(pais) {

    /*
     * Bandeira
     */

    if (pais.flags?.svg) {

        flag.src = pais.flags.svg;

    } else if (pais.flags?.png) {

        flag.src = pais.flags.png;

    } else if (pais.flag) {

        flag.removeAttribute("src");

    }


    flag.alt =
        "Bandeira de " + pais.name;


    /*
     * Nome
     */

    const nomePortugues =
        pais.alpha2Code
            ? nomeEmPortugues(
                pais.alpha2Code
            )
            : "";


    countryName.textContent =
        nomePortugues ||
        pais.name;


    /*
     * Capital
     */

    capital.textContent =
        pais.capital ||
        "Não possui";


    /*
     * Continente
     */

    continent.textContent =
        pais.region ||
        "Não informado";


    /*
     * População
     */

    population.textContent =
        pais.population
            ? pais.population.toLocaleString("pt-BR")
            : "Não informado";


    /*
     * Idiomas
     */

    if (
        Array.isArray(pais.languages) &&
        pais.languages.length > 0
    ) {

        language.textContent =
            pais.languages
                .map(
                    idioma =>
                        idioma.name
                )
                .join(", ");

    } else {

        language.textContent =
            "Não informado";

    }


    /*
     * Moedas
     */

    if (
        Array.isArray(pais.currencies) &&
        pais.currencies.length > 0
    ) {

        currency.textContent =
            pais.currencies
                .map(
                    moeda =>
                        moeda.name
                )
                .join(", ");

    } else {

        currency.textContent =
            "Não informado";

    }


    message.textContent = "";

}


/* ==========================================
   PESQUISAR
========================================== */

function executarPesquisa() {

    const nome =
        countryInput.value.trim();


    if (nome === "") {

        message.textContent =
            "⚠️ Digite o nome de um país.";

        return;

    }


    if (countries.length === 0) {

        message.textContent =
            "⏳ Aguarde os países carregarem.";

        return;

    }


    const pais =
        encontrarPais(nome);


    if (!pais) {

        message.textContent =
            "❌ País não encontrado.";

        return;

    }


    mostrarPais(pais);

}


/* ==========================================
   BOTÃO
========================================== */

searchBtn.addEventListener(
    "click",
    executarPesquisa
);


/* ==========================================
   ENTER
========================================== */

countryInput.addEventListener(
    "keydown",
    function (evento) {

        if (evento.key === "Enter") {

            executarPesquisa();

        }

    }
);


/* ==========================================
   INICIAR
========================================== */

carregarPaises();

