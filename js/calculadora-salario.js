const formSalario = document.getElementById("formSalario");
const diasUteisMes = 22;

formSalario.addEventListener("submit", function (event) {
    event.preventDefault();

    const horasDia = Number(document.getElementById("horasDia").value);
    const salarioMensal = Number(document.getElementById("salarioMensal").value);
    const mensagemErro = document.getElementById("mensagemErro");
    const horasMensaisOutput = document.getElementById("horasMensais");
    const valorHoraOutput = document.getElementById("valorHora");

    mensagemErro.textContent = "";

    if (!Number.isFinite(horasDia) || horasDia <= 0 || horasDia > 24) {
        mensagemErro.textContent = "Informe uma jornada diária entre 0,1 e 24 horas.";
        return;
    }

    if (!Number.isFinite(salarioMensal) || salarioMensal <= 0) {
        mensagemErro.textContent = "Informe um salário mensal maior que zero.";
        return;
    }

    const horasMensais = horasDia * diasUteisMes;
    const valorHora = salarioMensal / horasMensais;

    horasMensaisOutput.textContent =
        horasMensais.toLocaleString("pt-BR", { maximumFractionDigits: 2 }) + " h";

    valorHoraOutput.textContent =
        valorHora.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
});
