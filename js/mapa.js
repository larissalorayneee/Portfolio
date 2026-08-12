const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");

const flag = document.getElementById("flag");
const countryFlagEmoji = document.getElementById("countryFlagEmoji");
const countryName = document.getElementById("countryName");

const capital = document.getElementById("capital");
const continent = document.getElementById("continent");
const subregion = document.getElementById("subregion");
const population = document.getElementById("population");
const largestCity = document.getElementById("largestCity");
const area = document.getElementById("area");
const density = document.getElementById("density");
const language = document.getElementById("language");
const currency = document.getElementById("currency");
const callingCode = document.getElementById("callingCode");
const timezone = document.getElementById("timezone");
const coordinates = document.getElementById("coordinates");
const domain = document.getElementById("domain");
const isoCodes = document.getElementById("isoCodes");
const borders = document.getElementById("borders");

const message = document.getElementById("message");

const geographyInfo = document.getElementById("geographyInfo");
const geographyTitle = document.getElementById("geographyTitle");
const geographyType = document.getElementById("geographyType");
const geographyDescription = document.getElementById("geographyDescription");
const geographyParent = document.getElementById("geographyParent");
const geographyMembers = document.getElementById("geographyMembers");

let countries = [];
let sovereignCodes = new Set();
const largestCityCache = new Map();

const COUNTRIES_API = "https://countries.dev";

/*
 * Países soberanos usados como fallback caso a fonte de
 * classificação externa esteja indisponível.
 * Base: 193 membros da ONU + Santa Sé + Estado da Palestina,
 * com Kosovo opcionalmente reconhecido como país de facto.
 */
const FALLBACK_SOVEREIGN_CODES = new Set([
    "AF","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ",
    "BT","BO","BA","BW","BR","BN","BG","BF","BI","CV","KH","CM","CA","CF","TD","CL","CN","CO","KM",
    "CG","CD","CR","CI","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","SZ",
    "ET","FJ","FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU","IS",
    "IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV",
    "LB","LS","LR","LY","LI","LT","LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","FM","MD",
    "MC","MN","ME","MA","MZ","MM","NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW",
    "PS","PA","PG","PY","PE","PH","PL","PT","QA","RO","RU","RW","KN","LC","VC","WS","SM","ST","SA",
    "SN","RS","SC","SL","SG","SK","SI","SB","SO","ZA","SS","ES","LK","SD","SR","SE","CH","SY","TJ",
    "TZ","TH","TL","TG","TO","TT","TN","TR","TM","TV","UG","UA","AE","GB","US","UY","UZ","VU","VA",
    "VE","VN","YE","ZM","ZW","XK"
]);

/* Holanda é um nome popular. O país exibido continua sendo Países Baixos. */
const aliasesDePaises = {
    "holanda": "NL",
    "netherlands": "NL",
    "paises baixos": "NL",
    "brasil": "BR",
    "brazil": "BR",
    "estados unidos": "US",
    "eua": "US",
    "usa": "US",
    "coreia do sul": "KR",
    "south korea": "KR",
    "coreia do norte": "KP",
    "north korea": "KP",
    "russia": "RU",
    "russia": "RU",
    "tchequia": "CZ",
    "republica tcheca": "CZ",
    "czech republic": "CZ",
    "vaticano": "VA",
    "cidade do vaticano": "VA",
    "bolivia": "BO",
    "venezuela": "VE",
    "reino unido": "GB",
    "united kingdom": "GB",
    "great britain": "GB"
};

/*
 * Esses locais NÃO são tratados como países soberanos.
 * Em vez de "não encontrado", o projeto ensina o que eles são.
 */
const entidadesGeograficas = {
    "inglaterra": {
        nome: "Inglaterra",
        tipo: "País constituinte do Reino Unido",
        descricao: "A Inglaterra é um dos quatro países constituintes do Reino Unido. Ela não é um Estado soberano independente.",
        relacionado: "Reino Unido",
        codigoRelacionado: "GB",
        membros: ["Inglaterra", "Escócia", "País de Gales", "Irlanda do Norte"]
    },
    "england": {
        nome: "Inglaterra",
        tipo: "País constituinte do Reino Unido",
        descricao: "A Inglaterra é um dos quatro países constituintes do Reino Unido. Ela não é um Estado soberano independente.",
        relacionado: "Reino Unido",
        codigoRelacionado: "GB",
        membros: ["Inglaterra", "Escócia", "País de Gales", "Irlanda do Norte"]
    },
    "escocia": {
        nome: "Escócia",
        tipo: "País constituinte do Reino Unido",
        descricao: "A Escócia é um dos quatro países constituintes do Reino Unido. Ela não é um Estado soberano independente.",
        relacionado: "Reino Unido",
        codigoRelacionado: "GB",
        membros: ["Inglaterra", "Escócia", "País de Gales", "Irlanda do Norte"]
    },
    "scotland": {
        nome: "Escócia",
        tipo: "País constituinte do Reino Unido",
        descricao: "A Escócia é um dos quatro países constituintes do Reino Unido. Ela não é um Estado soberano independente.",
        relacionado: "Reino Unido",
        codigoRelacionado: "GB",
        membros: ["Inglaterra", "Escócia", "País de Gales", "Irlanda do Norte"]
    },
    "pais de gales": {
        nome: "País de Gales",
        tipo: "País constituinte do Reino Unido",
        descricao: "O País de Gales é um dos quatro países constituintes do Reino Unido. Ele não é um Estado soberano independente.",
        relacionado: "Reino Unido",
        codigoRelacionado: "GB",
        membros: ["Inglaterra", "Escócia", "País de Gales", "Irlanda do Norte"]
    },
    "wales": {
        nome: "País de Gales",
        tipo: "País constituinte do Reino Unido",
        descricao: "O País de Gales é um dos quatro países constituintes do Reino Unido. Ele não é um Estado soberano independente.",
        relacionado: "Reino Unido",
        codigoRelacionado: "GB",
        membros: ["Inglaterra", "Escócia", "País de Gales", "Irlanda do Norte"]
    },
    "irlanda do norte": {
        nome: "Irlanda do Norte",
        tipo: "País constituinte do Reino Unido",
        descricao: "A Irlanda do Norte é um dos quatro países constituintes do Reino Unido. Ela não é um Estado soberano independente.",
        relacionado: "Reino Unido",
        codigoRelacionado: "GB",
        membros: ["Inglaterra", "Escócia", "País de Gales", "Irlanda do Norte"]
    },
    "northern ireland": {
        nome: "Irlanda do Norte",
        tipo: "País constituinte do Reino Unido",
        descricao: "A Irlanda do Norte é um dos quatro países constituintes do Reino Unido. Ela não é um Estado soberano independente.",
        relacionado: "Reino Unido",
        codigoRelacionado: "GB",
        membros: ["Inglaterra", "Escócia", "País de Gales", "Irlanda do Norte"]
    },
    "caribe": {
        nome: "Caribe",
        tipo: "Região geográfica",
        descricao: "O Caribe é uma região das Américas formada pelo mar do Caribe, suas ilhas e os países e territórios da região. Não é um país.",
        relacionado: "Região do Caribe",
        codigoRelacionado: null,
        membros: ["Cuba", "Jamaica", "Haiti", "República Dominicana", "Bahamas", "Barbados", "Trinidad e Tobago"]
    },
    "caribbean": {
        nome: "Caribe",
        tipo: "Região geográfica",
        descricao: "O Caribe é uma região das Américas formada pelo mar do Caribe, suas ilhas e os países e territórios da região. Não é um país.",
        relacionado: "Região do Caribe",
        codigoRelacionado: null,
        membros: ["Cuba", "Jamaica", "Haiti", "República Dominicana", "Bahamas", "Barbados", "Trinidad e Tobago"]
    }
};


function normalizar(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function nomeEmPortugues(codigo) {
    try {
        return new Intl.DisplayNames(["pt-BR"], { type: "region" }).of(codigo) || "";
    } catch {
        return "";
    }
}

function formatarNumero(valor, casas = 0) {
    if (valor === null || valor === undefined || valor === "") return "Não informado";
    const numero = Number(valor);
    if (!Number.isFinite(numero)) return String(valor);
    return numero.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

function primeiroValor(obj, caminhos = []) {
    for (const caminho of caminhos) {
        const partes = caminho.split(".");
        let valor = obj;

        for (const parte of partes) {
            if (valor === null || valor === undefined) {
                valor = undefined;
                break;
            }
            valor = valor[parte];
        }

        if (valor !== null && valor !== undefined && valor !== "") return valor;
    }
    return null;
}

function extrairValorRich(valor) {
    if (valor === null || valor === undefined || valor === "") return null;

    if (typeof valor === "object") {
        if ("value" in valor) return extrairValorRich(valor.value);
        if ("text" in valor) return extrairValorRich(valor.text);
        if ("date" in valor) return extrairValorRich(valor.date);
        if ("description" in valor) return extrairValorRich(valor.description);

        const partes = Object.values(valor)
            .filter(item => item !== null && item !== undefined && item !== "")
            .map(item => extrairValorRich(item))
            .filter(Boolean);

        return partes.length ? partes.join(" ") : null;
    }

    return String(valor);
}

function formatarLista(lista, propriedade = "name") {
    if (!Array.isArray(lista) || lista.length === 0) return "Não informado";

    return lista
        .map(item => typeof item === "string"
            ? item
            : item?.[propriedade] || item?.common || item?.value || "")
        .filter(Boolean)
        .join(", ");
}

function ehSoberano(pais) {
    return !!pais?.alpha2Code &&
        sovereignCodes.has(normalizar(pais.alpha2Code));
}

async function carregarPaises() {
    try {
        message.textContent = "⏳ Carregando países...";

        const resposta = await fetch(`${COUNTRIES_API}/countries?full=true`);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar a lista de países.");
        }

        countries = await resposta.json();

        if (!Array.isArray(countries) || countries.length === 0) {
            throw new Error("A lista de países está vazia.");
        }

        /*
         * A API inclui países, dependências e outras áreas.
         * Para a pesquisa principal usamos Estados soberanos.
         * O fallback evita que uma falha de classificação
         * faça o projeto mostrar territórios como países.
         */
        try {
            const respostaMeta = await fetch("https://countries.altoal.com/api/v1/metadata.json");

            if (respostaMeta.ok) {
                const metadata = await respostaMeta.json();

                for (const item of Object.values(metadata?.countries || {})) {
                    const iso2 = item?.code?.iso2;
                    if (iso2 && item.type === "sovereign state") {
                        sovereignCodes.add(normalizar(iso2));
                    }
                }
            }
        } catch (erro) {
            console.warn("Classificação externa indisponível. Usando lista de segurança.", erro);
        }

        if (sovereignCodes.size === 0) {
            sovereignCodes = new Set(FALLBACK_SOVEREIGN_CODES);
        }

        message.textContent = "";

        const brasil = encontrarPais("Brasil");
        if (brasil) mostrarPais(brasil);

    } catch (erro) {
        console.error(erro);
        message.textContent = "❌ Não foi possível carregar os países. Verifique sua conexão.";
    }
}

function encontrarPais(nomeDigitado) {
    const busca = normalizar(nomeDigitado);

    /* Primeiro verifica aliases */
    const codigoAlias = aliasesDePaises[busca];

    if (codigoAlias) {
        const porCodigo = countries.find(pais =>
            normalizar(pais.alpha2Code) === normalizar(codigoAlias) &&
            ehSoberano(pais)
        );
        if (porCodigo) return porCodigo;
    }

    /* Nome original */
    let pais = countries.find(pais =>
        ehSoberano(pais) &&
        normalizar(pais.name) === busca
    );
    if (pais) return pais;

    /* Nome nativo */
    pais = countries.find(pais =>
        ehSoberano(pais) &&
        pais.nativeName &&
        normalizar(pais.nativeName) === busca
    );
    if (pais) return pais;

    /* Nome em português */
    pais = countries.find(pais => {
        if (!ehSoberano(pais) || !pais.alpha2Code) return false;
        return normalizar(nomeEmPortugues(pais.alpha2Code)) === busca;
    });
    if (pais) return pais;

    /* Grafias alternativas da API */
    pais = countries.find(pais => {
        if (!ehSoberano(pais)) return false;
        const alternativas = Array.isArray(pais.altSpellings)
            ? pais.altSpellings
            : [];
        return alternativas.some(nome => normalizar(nome) === busca);
    });
    if (pais) return pais;

    /* Busca parcial */
    if (busca.length >= 3) {
        pais = countries.find(pais => {
            if (!ehSoberano(pais)) return false;

            const nomePais = normalizar(pais.name);
            const nomePt = pais.alpha2Code
                ? normalizar(nomeEmPortugues(pais.alpha2Code))
                : "";

            const alternativas = Array.isArray(pais.altSpellings)
                ? pais.altSpellings.map(normalizar)
                : [];

            return nomePais.includes(busca) ||
                nomePt.includes(busca) ||
                alternativas.some(nome => nome.includes(busca));
        });
    }

    return pais || null;
}

function converterCodigoParaNome(codigo) {
    const pais = countries.find(item =>
        normalizar(item.alpha3Code) === normalizar(codigo) ||
        normalizar(item.alpha2Code) === normalizar(codigo)
    );

    if (!pais) return codigo;
    return nomeEmPortugues(pais.alpha2Code) || pais.name;
}

async function buscarMaiorCidade(codigoIso2) {
    const codigo = normalizar(codigoIso2);

    if (largestCityCache.has(codigo)) {
        return largestCityCache.get(codigo);
    }

    try {
        const resposta = await fetch(
            `${COUNTRIES_API}/cities?country=${encodeURIComponent(codigoIso2)}&limit=1`
        );

        if (!resposta.ok) return "Não informado";

        const cidades = await resposta.json();
        const cidade = Array.isArray(cidades) ? cidades[0] : null;

        if (!cidade) return "Não informado";

        const nome = cidade.name || "Não informado";
        const pop = cidade.population
            ? ` (${formatarNumero(cidade.population)} hab.)`
            : "";

        const resultado = nome + pop;
        largestCityCache.set(codigo, resultado);
        return resultado;

    } catch (erro) {
        console.warn("Maior cidade não disponível:", erro);
        return "Não informado";
    }
}

async function buscarInformacoesRicas(pais) {
    /*
     * O endpoint complementar é opcional. Se não responder,
     * a ficha continua funcionando com os dados de countries.dev.
     */
    return null;
}

async function mostrarPais(pais) {
    esconderFichaGeografica();

    if (pais.flags?.svg) {
        flag.src = pais.flags.svg;
        flag.hidden = false;
    } else if (pais.flags?.png) {
        flag.src = pais.flags.png;
        flag.hidden = false;
    } else {
        flag.removeAttribute("src");
        flag.hidden = true;
    }

    countryFlagEmoji.textContent = pais.flag || "";
    flag.alt = "Bandeira de " + pais.name;

    const nomePortugues = pais.alpha2Code
        ? nomeEmPortugues(pais.alpha2Code)
        : "";

    countryName.textContent = nomePortugues || pais.name;

    capital.textContent = pais.capital || "Não informado";
    continent.textContent = pais.region || "Não informado";
    subregion.textContent = pais.subregion || "Não informado";

    population.textContent = pais.population
        ? `${formatarNumero(pais.population)} habitantes`
        : "Não informado";

    area.textContent = pais.area
        ? `${formatarNumero(pais.area)} km²`
        : "Não informado";

    density.textContent =
        pais.populationDensity
            ? `${formatarNumero(pais.populationDensity, 1)} hab./km²`
            : pais.population && pais.area
                ? `${formatarNumero(pais.population / pais.area, 1)} hab./km²`
                : "Não informado";

    language.textContent = Array.isArray(pais.languages) && pais.languages.length
        ? pais.languages.map(idioma => idioma.name).join(", ")
        : "Não informado";

    currency.textContent = Array.isArray(pais.currencies) && pais.currencies.length
        ? pais.currencies.map(moeda =>
            moeda.symbol
                ? `${moeda.name} (${moeda.code} ${moeda.symbol})`
                : `${moeda.name} (${moeda.code})`
        ).join(", ")
        : "Não informado";

    callingCode.textContent = Array.isArray(pais.callingCodes) && pais.callingCodes.length
        ? pais.callingCodes.map(codigo => "+" + codigo).join(", ")
        : "Não informado";

    timezone.textContent = Array.isArray(pais.timezones) && pais.timezones.length
        ? pais.timezones.join(", ")
        : "Não informado";

    coordinates.textContent = Array.isArray(pais.latlng) && pais.latlng.length >= 2
        ? `${pais.latlng[0]}°, ${pais.latlng[1]}°`
        : "Não informado";

    domain.textContent = Array.isArray(pais.topLevelDomain) && pais.topLevelDomain.length
        ? pais.topLevelDomain.join(", ")
        : "Não informado";

    isoCodes.textContent =
        `${pais.alpha2Code || "-"} / ${pais.alpha3Code || "-"}` +
        (pais.numericCode ? ` / ${pais.numericCode}` : "");

    borders.textContent = Array.isArray(pais.borders) && pais.borders.length
        ? pais.borders.map(converterCodigoParaNome).join(", ")
        : "Não possui fronteiras terrestres";

    largestCity.textContent = "⏳ Carregando...";

    const cidade = await buscarMaiorCidade(pais.alpha2Code);
    largestCity.textContent = cidade;

    message.textContent = "";
}

function mostrarEntidade(entidade) {
    flag.removeAttribute("src");
    flag.hidden = true;
    countryFlagEmoji.textContent = "";
    flag.alt = "";

    countryName.textContent = entidade.nome;

    const campos = [
        capital, continent, subregion, population, largestCity, area,
        density, language, currency, callingCode, timezone, coordinates,
        domain, isoCodes, borders
    ];

    campos.forEach(campo => campo.textContent = "Não se aplica");

    geographyInfo.hidden = false;
    geographyTitle.textContent = "🗺️ " + entidade.nome;
    geographyType.textContent = "📍 " + entidade.tipo;
    geographyDescription.textContent = entidade.descricao;

    if (entidade.codigoRelacionado) {
        const paisRelacionado = countries.find(pais =>
            normalizar(pais.alpha2Code) === normalizar(entidade.codigoRelacionado)
        );

        geographyParent.innerHTML = paisRelacionado
            ? `🌎 País soberano relacionado: <strong>${nomeEmPortugues(paisRelacionado.alpha2Code) || paisRelacionado.name}</strong>`
            : `🌎 País relacionado: <strong>${entidade.relacionado}</strong>`;
    } else {
        geographyParent.innerHTML = `🌎 <strong>${entidade.relacionado}</strong>`;
    }

    geographyMembers.innerHTML =
        `<strong>Exemplos / composição:</strong> ${entidade.membros.join(" • ")}`;

    message.textContent =
        "ℹ️ Este local não é um país soberano, mas faz parte da geografia mundial.";
}

function esconderFichaGeografica() {
    geographyInfo.hidden = true;
    geographyTitle.textContent = "";
    geographyType.textContent = "";
    geographyDescription.textContent = "";
    geographyParent.textContent = "";
    geographyMembers.textContent = "";
}

function executarPesquisa() {
    const nome = countryInput.value.trim();

    if (nome === "") {
        message.textContent = "⚠️ Digite o nome de um país ou local.";
        return;
    }

    if (countries.length === 0) {
        message.textContent = "⏳ Aguarde os países carregarem.";
        return;
    }

    const entidade = entidadesGeograficas[normalizar(nome)];

    if (entidade) {
        mostrarEntidade(entidade);
        return;
    }

    const pais = encontrarPais(nome);

    if (!pais) {
        esconderFichaGeografica();
        message.textContent =
            "❌ País ou local não encontrado. Tente outro nome ou uma grafia diferente.";
        return;
    }

    mostrarPais(pais);
}

searchBtn.addEventListener("click", executarPesquisa);

countryInput.addEventListener("keydown", evento => {
    if (evento.key === "Enter") executarPesquisa();
});

carregarPaises();
