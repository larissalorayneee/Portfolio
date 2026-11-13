
// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const form = document.getElementById("countrySearch");
const input = document.getElementById("countryInput");
const message = document.getElementById("message");
const card = document.getElementById("countryCard");
const geographyInfo = document.getElementById("geographyInfo");
const searchButton = document.getElementById("searchBtn");

const photo = document.getElementById("countryPhoto");
const photoMessage = document.getElementById("photoMessage");
const photoCaption = document.getElementById("photoCaption");

let countries = [];
let loadingCountries = null;
let currentSearch = 0;

// ==========================================
// FONTES DE DADOS
// ==========================================

const dataSources = [
    "https://cdn.jsdelivr.net/gh/mledoze/countries@master/countries.json",
    "https://raw.githubusercontent.com/mledoze/countries/master/countries.json"
];

// ==========================================
// NOMES ALTERNATIVOS
// ==========================================

const aliases = {
    "brasil": "brazil",
    "holanda": "netherlands",
    "paises baixos": "netherlands",
    "estados unidos": "united states",
    "eua": "united states",
    "coreia do sul": "south korea",
    "coreia do norte": "north korea",
    "reino unido": "united kingdom",
    "japao": "japan",
    "franca": "france",
    "alemanha": "germany",
    "espanha": "spain",
    "italia": "italy",
    "mexico": "mexico",
    "suica": "switzerland",
    "belgica": "belgium",
    "grecia": "greece",
    "tchequia": "czechia",
    "egito": "egypt",
    "marrocos": "morocco",
    "africa do sul": "south africa",
    "nova zelandia": "new zealand",
    "arabia saudita": "saudi arabia",
    "noruega": "norway",
    "suecia": "sweden",
    "dinamarca": "denmark",
    "finlandia": "finland",
    "russia": "russia",
    "turquia": "turkey"
};

// ==========================================
// TRADUÇÃO DE CONTINENTES E REGIÕES
// ==========================================

const regionTranslations = {
    "africa": "África",
    "americas": "Américas",
    "asia": "Ásia",
    "europe": "Europa",
    "oceania": "Oceania",
    "antarctic": "Antártida"
};

const subregionTranslations = {
    "southern asia": "Ásia Meridional",
    "south-eastern asia": "Sudeste Asiático",
    "eastern asia": "Ásia Oriental",
    "central asia": "Ásia Central",
    "western asia": "Ásia Ocidental",
    "south asia": "Ásia Meridional",

    "eastern europe": "Europa Oriental",
    "western europe": "Europa Ocidental",
    "northern europe": "Europa Setentrional",
    "southern europe": "Europa Meridional",

    "north america": "América do Norte",
    "south america": "América do Sul",
    "central america": "América Central",
    "caribbean": "Caribe",

    "northern africa": "África Setentrional",
    "western africa": "África Ocidental",
    "eastern africa": "África Oriental",
    "middle africa": "África Central",
    "southern africa": "África Austral",

    "australia and new zealand": "Austrália e Nova Zelândia",
    "melanesia": "Melanésia",
    "micronesia": "Micronésia",
    "polynesia": "Polinésia"
};

// ==========================================
// TRADUÇÃO DE MOEDAS
// ==========================================

const currencyTranslations = {
    "BRL": "Real brasileiro",
    "USD": "Dólar americano",
    "EUR": "Euro",
    "GBP": "Libra esterlina",
    "JPY": "Iene japonês",
    "CNY": "Yuan chinês",
    "ARS": "Peso argentino",
    "CLP": "Peso chileno",
    "COP": "Peso colombiano",
    "MXN": "Peso mexicano",
    "CAD": "Dólar canadense",
    "AUD": "Dólar australiano",
    "CHF": "Franco suíço",
    "INR": "Rupia indiana",
    "KRW": "Won sul-coreano",
    "RUB": "Rublo russo",
    "TRY": "Lira turca",
    "ZAR": "Rand sul-africano",
    "EGP": "Libra egípcia",
    "MAD": "Dirham marroquino",
    "AED": "Dirham dos Emirados Árabes Unidos",
    "SAR": "Rial saudita",
    "SEK": "Coroa sueca",
    "NOK": "Coroa norueguesa",
    "DKK": "Coroa dinamarquesa",
    "PLN": "Zloty polonês",
    "CZK": "Coroa tcheca",
    "THB": "Baht tailandês",
    "IDR": "Rupia indonésia",
    "MYR": "Ringgit malaio",
    "PHP": "Peso filipino",
    "SGD": "Dólar de Singapura",
    "NZD": "Dólar neozelandês",
    "PEN": "Sol peruano",
    "UYU": "Peso uruguaio",
    "PYG": "Guarani paraguaio",
    "BOB": "Boliviano",
    "VES": "Bolívar venezuelano",
    "CRC": "Colón costarriquenho",
    "ISK": "Coroa islandesa",
    "UAH": "Hryvnia ucraniana",
    "HUF": "Florim húngaro",
    "RON": "Leu romeno",
    "BGN": "Lev búlgaro",
    "ILS": "Novo shekel israelense",
    "IRR": "Rial iraniano",
    "PKR": "Rupia paquistanesa",
    "BDT": "Taka bengali",
    "NGN": "Naira nigeriana",
    "KES": "Xelim queniano",
    "GHS": "Cedi ganês",
    "ETB": "Birr etíope",
    "XOF": "Franco CFA da África Ocidental",
    "XAF": "Franco CFA da África Central",
    "XPF": "Franco CFP",
    "TWD": "Novo dólar taiwanês",
    "HKD": "Dólar de Hong Kong",
    "VND": "Dong vietnamita",
    "KZT": "Tenge cazaque",
    "QAR": "Rial catariano",
    "KWD": "Dinar kuwaitiano",
    "JOD": "Dinar jordaniano",
    "BHD": "Dinar bareinita",
    "OMR": "Rial omanense",
    "DZD": "Dinar argelino",
    "TND": "Dinar tunisiano"
};

// ==========================================
// TRADUÇÃO DE IDIOMAS
// ==========================================

const languageTranslations = {
    "Portuguese": "Português",
    "English": "Inglês",
    "Spanish": "Espanhol",
    "French": "Francês",
    "German": "Alemão",
    "Italian": "Italiano",
    "Japanese": "Japonês",
    "Chinese": "Chinês",
    "Mandarin": "Mandarim",
    "Korean": "Coreano",
    "Russian": "Russo",
    "Arabic": "Árabe",
    "Hindi": "Hindi",
    "Dutch": "Neerlandês",
    "Greek": "Grego",
    "Turkish": "Turco",
    "Swedish": "Sueco",
    "Norwegian": "Norueguês",
    "Danish": "Dinamarquês",
    "Finnish": "Finlandês",
    "Polish": "Polonês",
    "Hebrew": "Hebraico",
    "Thai": "Tailandês",
    "Vietnamese": "Vietnamita",
    "Indonesian": "Indonésio",
    "Malay": "Malaio",
    "Persian": "Persa",
    "Urdu": "Urdu",
    "Bengali": "Bengali",
    "Swahili": "Suaíli",
    "Romanian": "Romeno",
    "Hungarian": "Húngaro",
    "Czech": "Tcheco",
    "Slovak": "Eslovaco",
    "Ukrainian": "Ucraniano",
    "Croatian": "Croata",
    "Serbian": "Sérvio",
    "Bulgarian": "Búlgaro",
    "Albanian": "Albanês",
    "Irish": "Irlandês",
    "Icelandic": "Islandês",
    "Afrikaans": "Africâner",
    "Amharic": "Amárico",
    "Nepali": "Nepalês",
    "Tamil": "Tâmil",
    "Telugu": "Telugo"
};

// ==========================================
// REGIÕES E TERRITÓRIOS ESPECIAIS
// ==========================================

const specialPlaces = {
    "inglaterra": [
        "Inglaterra",
        "País constituinte do Reino Unido",
        "A Inglaterra é um dos quatro países constituintes do Reino Unido. Não é um Estado soberano independente.",
        "Reino Unido"
    ],

    "escocia": [
        "Escócia",
        "País constituinte do Reino Unido",
        "A Escócia é um dos quatro países constituintes do Reino Unido. Não é um Estado soberano independente.",
        "Reino Unido"
    ],

    "pais de gales": [
        "País de Gales",
        "País constituinte do Reino Unido",
        "O País de Gales é um dos quatro países constituintes do Reino Unido. Não é um Estado soberano independente.",
        "Reino Unido"
    ],

    "irlanda do norte": [
        "Irlanda do Norte",
        "País constituinte do Reino Unido",
        "A Irlanda do Norte é um dos quatro países constituintes do Reino Unido. Não é um Estado soberano independente.",
        "Reino Unido"
    ],

    "caribe": [
        "Caribe",
        "Região geográfica",
        "O Caribe é uma região formada pelo mar do Caribe, ilhas, países e territórios próximos.",
        "Região do Caribe"
    ]
};

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

function normalize(value) {
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function setValue(id, value) {
    const element = document.getElementById(id);

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        element.textContent = "Não informado";
    } else {
        element.textContent = value;
    }
}

function formatNumber(value) {
    const number = Number(value);

    if (!Number.isFinite(number) || number <= 0) {
        return "Não informado";
    }

    return number.toLocaleString("pt-BR", {
        maximumFractionDigits: 1
    });
}

function translateRegion(region) {
    if (!region) return "Não informado";

    return regionTranslations[normalize(region)] || region;
}

function translateSubregion(subregion) {
    if (!subregion) return "Não informado";

    return subregionTranslations[normalize(subregion)] || subregion;
}

function getCountryName(country) {
    return (
        country.translations?.por?.common ||
        country.translations?.pt?.common ||
        country.name?.common ||
        "País sem nome"
    );
}

function getOfficialName(country) {
    return (
        country.translations?.por?.official ||
        country.name?.official ||
        ""
    );
}

function getCurrencyName(code, currency) {
    return currencyTranslations[code] ||
        currency.name ||
        code;
}

function getLanguageNames(country) {
    return Object.values(country.languages || {})
        .map(language =>
            languageTranslations[language] || language
        )
        .join(", ");
}

function getBorderNames(borderCodes) {
    if (!borderCodes || borderCodes.length === 0) {
        return "Não possui fronteiras terrestres";
    }

    return borderCodes.map(code => {
        const neighbor = countries.find(country =>
            country.cca3 === code
        );

        return neighbor
            ? getCountryName(neighbor)
            : code;

    }).join(", ");
}

async function fetchJSON(url, timeout = 15000) {
    const controller = new AbortController();

    const timer = setTimeout(() => {
        controller.abort();
    }, timeout);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}`);
        }

        return await response.json();

    } finally {
        clearTimeout(timer);
    }
}

// ==========================================
// CARREGAMENTO DA BASE DE PAÍSES
// ==========================================

async function loadCountries() {
    if (countries.length > 0) {
        return countries;
    }

    if (loadingCountries) {
        return loadingCountries;
    }

    loadingCountries = (async () => {
        let lastError;

        for (const source of dataSources) {
            try {
                const data = await fetchJSON(source);

                if (!Array.isArray(data) || !data.length) {
                    throw new Error("Base de dados inválida.");
                }

                countries = data;

                return countries;

            } catch (error) {
                lastError = error;

                console.error(
                    "Falha na fonte de países:",
                    source,
                    error
                );
            }
        }

        throw lastError ||
            new Error("Não foi possível carregar os países.");

    })();

    try {
        return await loadingCountries;
    } finally {
        loadingCountries = null;
    }
}

// ==========================================
// PESQUISA DE PAÍSES
// ==========================================

function findCountry(query) {
    const normalizedQuery = normalize(query);

    const searchTerm =
        aliases[normalizedQuery] || normalizedQuery;

    const exactMatch = countries.find(country => {
        const names = [
            country.name?.common,
            country.name?.official,
            country.translations?.por?.common,
            country.translations?.por?.official,
            country.translations?.eng?.common
        ];

        return names.some(name =>
            normalize(name) === searchTerm
        );
    });

    if (exactMatch) {
        return exactMatch;
    }

    return countries.find(country => {
        const names = [
            country.name?.common,
            country.name?.official,
            country.translations?.por?.common,
            country.translations?.por?.official
        ];

        return names.some(name =>
            normalize(name).includes(searchTerm)
        );

    }) || null;
}

// ==========================================
// POPULAÇÃO E DENSIDADE DEMOGRÁFICA
// BANCO MUNDIAL
// ==========================================

async function getLatestIndicator(isoCode, indicator) {
    if (!isoCode) {
        throw new Error("Código ISO do país indisponível.");
    }

    const url =
        `https://api.worldbank.org/v2/country/${encodeURIComponent(isoCode)}` +
        `/indicator/${indicator}?format=json&per_page=100`;

    const data = await fetchJSON(url);

    if (!Array.isArray(data) || !Array.isArray(data[1])) {
        throw new Error("Resposta inválida do Banco Mundial.");
    }

    const record = data[1].find(item =>
        item.value !== null &&
        item.value !== undefined &&
        Number.isFinite(Number(item.value)) &&
        Number(item.value) > 0
    );

    if (!record) {
        throw new Error("Não há dados disponíveis para este indicador.");
    }

    return {
        value: Number(record.value),
        year: record.date
    };
}

async function loadPopulationData(country, requestId) {
    const populationElement = document.getElementById("population");
    const densityElement = document.getElementById("density");

    populationElement.textContent = "Consultando dados oficiais...";
    densityElement.textContent = "Consultando dados oficiais...";

    const isoCode = country.cca2 === "KR"
        ? "KOR"
        : (country.cca3 || country.cca3Code);

    if (!isoCode) {
        populationElement.textContent = "Dado indisponível";
        densityElement.textContent = "Dado indisponível";
        return;
    }

    const [populationResult, densityResult] = await Promise.allSettled([
        getLatestIndicator(isoCode, "SP.POP.TOTL"),
        getLatestIndicator(isoCode, "EN.POP.DNST")
    ]);

    if (requestId !== currentSearch) {
        return;
    }

    // População: Banco Mundial como fonte principal.
    if (populationResult.status === "fulfilled") {
        const result = populationResult.value;

        populationElement.textContent =
            `${formatNumber(result.value)} habitantes (${result.year})`;

    } else if (Number(country.population) > 0) {
        // Segunda fonte: base de países já carregada pelo mapa.
        populationElement.textContent =
            `${formatNumber(country.population)} habitantes (base de países)`;

        console.warn(
            "Banco Mundial não retornou a população. Usando a base alternativa.",
            populationResult.reason
        );

    } else {
        populationElement.textContent =
            "Dado indisponível";

        console.error(
            "Erro na população:",
            populationResult.reason
        );
    }

    // Densidade: continua usando o Banco Mundial.
    if (densityResult.status === "fulfilled") {
        const result = densityResult.value;

        densityElement.textContent =
            `${formatNumber(result.value)} hab./km² (${result.year})`;

    } else {
        densityElement.textContent =
            "Dado indisponível no Banco Mundial";

        console.error(
            "Erro na densidade:",
            densityResult.reason
        );
    }
}

// ==========================================
// FOTOGRAFIA DO PAÍS
// ==========================================

function testImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(url);

        image.onerror = () =>
            reject(new Error("Imagem não carregou."));

        image.src = url;
    });
}

async function searchCommonsPhoto(country) {
    const countryName =
        country.name?.common || getCountryName(country);

    const queries = [
        `${countryName} landscape`,
        `${countryName} city`,
        countryName
    ];

    for (const query of queries) {
        const url = new URL(
            "https://commons.wikimedia.org/w/api.php"
        );

        url.search = new URLSearchParams({
            action: "query",
            generator: "search",
            gsrsearch: query,
            gsrnamespace: "6",
            gsrlimit: "15",
            prop: "imageinfo",
            iiprop: "url",
            iiurlwidth: "1200",
            format: "json",
            origin: "*"
        });

        const data = await fetchJSON(url.toString());

        const pages = Object.values(
            data.query?.pages || {}
        );

        const blockedTerms = [
            "flag",
            "map",
            "coat of arms",
            "logo",
            "icon",
            "symbol",
            "seal",
            "locator"
        ];

        const candidates = pages.filter(page => {
            const title = normalize(page.title);

            const blocked = blockedTerms.some(term =>
                title.includes(normalize(term))
            );

            const imageInfo = page.imageinfo?.[0];

            return (
                !blocked &&
                imageInfo?.thumburl &&
                imageInfo?.mime?.startsWith("image/")
            );
        });

        for (const candidate of candidates) {
            const imageInfo = candidate.imageinfo[0];

            try {
                await testImage(imageInfo.thumburl);

                return {
                    url: imageInfo.thumburl,
                    credit: "Wikimedia Commons"
                };

            } catch (error) {
                console.warn(
                    "Imagem indisponível:",
                    candidate.title
                );
            }
        }
    }

    throw new Error("Nenhuma fotografia encontrada.");
}

async function searchWikipediaPhoto(country) {
    const countryName =
        country.name?.common || getCountryName(country);

    const url = new URL(
        "https://en.wikipedia.org/w/api.php"
    );

    url.search = new URLSearchParams({
        action: "query",
        titles: countryName,
        prop: "pageimages",
        format: "json",
        pithumbsize: "1200",
        origin: "*"
    });

    const data = await fetchJSON(url.toString());

    const pages = Object.values(
        data.query?.pages || {}
    );

    const page = pages.find(item =>
        item.thumbnail?.source
    );

    if (!page) {
        throw new Error("Fotografia não encontrada na Wikipédia.");
    }

    await testImage(page.thumbnail.source);

    return {
        url: page.thumbnail.source,
        credit: "Imagem da Wikipédia"
    };
}

async function loadCountryPhoto(country, requestId) {
    photo.hidden = true;
    photo.removeAttribute("src");

    photoMessage.hidden = false;

    photoMessage.textContent =
        "Buscando fotografia do país...";

    photoCaption.textContent = "";

    let imageResult = null;

    try {
        imageResult = await searchCommonsPhoto(country);

    } catch (error) {
        console.warn(
            "Wikimedia Commons indisponível:",
            error
        );
    }

    if (!imageResult) {
        try {
            imageResult = await searchWikipediaPhoto(country);

        } catch (error) {
            console.warn(
                "Wikipédia indisponível:",
                error
            );
        }
    }

    if (requestId !== currentSearch) {
        return;
    }

    if (!imageResult) {
        photo.hidden = true;
        photoMessage.hidden = false;

        photoMessage.textContent =
            "Não foi possível encontrar uma fotografia deste país.";

        return;
    }

    photo.onload = () => {
        if (requestId !== currentSearch) {
            return;
        }

        photo.hidden = false;
        photoMessage.hidden = true;

        photoCaption.textContent = imageResult.credit;
    };

    photo.onerror = () => {
        if (requestId !== currentSearch) {
            return;
        }

        photo.hidden = true;
        photoMessage.hidden = false;

        photoMessage.textContent =
            "A fotografia não pôde ser exibida.";
    };

    photo.src = imageResult.url;
}

// ==========================================
// EXIBIÇÃO DAS INFORMAÇÕES DO PAÍS
// ==========================================

async function showCountry(country, requestId) {
    const name = getCountryName(country);
    const officialName = getOfficialName(country);

    // Nome do país.
    setValue("countryName", name);

    document.getElementById("officialName").textContent =
        officialName && officialName !== name
            ? officialName
            : "";

    // Bandeira: esconde completamente se não carregar.
    const flag = document.getElementById("flag");

    const flagUrl =
        country.flags?.svg ||
        country.flags?.png ||
        "";

    flag.onload = () => {
        if (requestId === currentSearch) {
            flag.hidden = false;
        }
    };

    flag.onerror = () => {
        flag.hidden = true;
        flag.removeAttribute("src");
    };

    flag.hidden = true;
    flag.removeAttribute("src");

    if (flagUrl) {
        flag.alt = "";
        flag.src = flagUrl;
    }

    // Capital e localização.
    setValue(
        "capital",
        (country.capital || []).join(", ")
    );

    setValue(
        "continent",
        translateRegion(country.region)
    );

    setValue(
        "subregion",
        translateSubregion(country.subregion)
    );

    // Área territorial.
    const area = Number(country.area);

    setValue(
        "area",
        Number.isFinite(area) && area > 0
            ? formatNumber(area) + " km²"
            : "Não informado"
    );

    // Idiomas.
    setValue(
        "language",
        getLanguageNames(country)
    );

    // Moedas traduzidas.
    const currencies = Object.entries(
        country.currencies || {}
    )
        .map(([code, currency]) => {
            const currencyName =
                getCurrencyName(code, currency);

            const symbol = currency.symbol || "";

            return symbol
                ? `${currencyName} (${symbol})`
                : currencyName;

        })
        .join(", ");

    setValue("currency", currencies);

    // Código telefônico.
    let callingCode = "";

    if (country.idd?.root) {
        const suffixes = country.idd.suffixes || [];

        callingCode = country.idd.root;

        if (suffixes.length === 1) {
            callingCode += suffixes[0];
        }
    }

    setValue("callingCode", callingCode);

    // Fusos horários.
    setValue(
        "timezone",
        (country.timezones || []).join(", ")
    );

    // Coordenadas.
    const coordinates =
        Array.isArray(country.latlng) &&
        country.latlng.length === 2
            ? `${country.latlng[0]}°, ${country.latlng[1]}°`
            : "";

    setValue("coordinates", coordinates);

    // Domínio de internet.
    setValue(
        "domain",
        (country.tld || []).join(", ")
    );

    // Códigos internacionais ISO.
    setValue(
        "isoCodes",
        [country.cca2, country.cca3]
            .filter(Boolean)
            .join(" / ")
    );

    // Países vizinhos em português.
    setValue(
        "borders",
        getBorderNames(country.borders)
    );

    // Exibe o resultado.
    card.hidden = false;
    geographyInfo.hidden = true;

    message.textContent = "";

    // Atualiza dados e fotografia.
    await Promise.allSettled([
        loadPopulationData(country, requestId),
        loadCountryPhoto(country, requestId)
    ]);
}

// ==========================================
// REGIÕES ESPECIAIS
// ==========================================

function showSpecial(place) {
    card.hidden = true;
    geographyInfo.hidden = false;

    document.getElementById("geographyTitle").textContent =
        place[0];

    document.getElementById("geographyType").textContent =
        place[1];

    document.getElementById("geographyDescription").textContent =
        place[2];

    document.getElementById("geographyParent").textContent =
        "Relacionado a: " + place[3];

    message.textContent = "";
}

// ==========================================
// PESQUISA PRINCIPAL
// ==========================================

async function searchCountry(query) {
    const requestId = ++currentSearch;
    const normalizedQuery = normalize(query);

    if (specialPlaces[normalizedQuery]) {
        card.hidden = true;

        showSpecial(specialPlaces[normalizedQuery]);

        return;
    }

    message.textContent = "Pesquisando país...";

    card.hidden = true;
    geographyInfo.hidden = true;

    searchButton.disabled = true;

    try {
        await loadCountries();

        if (requestId !== currentSearch) {
            return;
        }

        const country = findCountry(query);

        if (!country) {
            message.textContent =
                "País não encontrado. Confira a escrita e tente novamente.";

            return;
        }

        await showCountry(country, requestId);

    } catch (error) {
        console.error("Erro na pesquisa:", error);

        if (requestId === currentSearch) {
            message.textContent =
                "Não foi possível carregar os dados. Tente novamente.";
        }

    } finally {
        if (requestId === currentSearch) {
            searchButton.disabled = false;
        }
    }
}

// ==========================================
// EVENTO DO FORMULÁRIO
// ==========================================

form.addEventListener("submit", event => {
    event.preventDefault();

    const query = input.value.trim();

    if (!query) {
        message.textContent =
            "Digite o nome de um país para pesquisar.";

        card.hidden = true;
        geographyInfo.hidden = true;

        return;
    }

    searchCountry(query);
});

// ==========================================
// CARREGAMENTO INICIAL
// ==========================================

loadCountries()
    .then(() => {
        message.textContent =
            "Base de dados carregada! Pesquise um país.";
    })
    .catch(error => {
        console.error(
            "Erro ao iniciar o mapa:",
            error
        );

        message.textContent =
            "Não foi possível carregar os países. Verifique sua conexão e atualize a página.";
    });
