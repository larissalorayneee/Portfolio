function calcularSalario(){

    const horas = Number(document.getElementById("horas").value);

    const valorHora = Number(document.getElementById("valorHora").value);

    if(horas <= 0 || valorHora <= 0){

        alert("Preencha os campos corretamente.");

        return;

    }

    const salarioBruto = horas * valorHora;

    let porcentagemINSS = 0;

    if(salarioBruto <= 1518){

        porcentagemINSS = 0.075;

    }

    else if(salarioBruto <= 2793.88){

        porcentagemINSS = 0.09;

    }

    else if(salarioBruto <= 4190.83){

        porcentagemINSS = 0.12;

    }

    else{

        porcentagemINSS = 0.14;

    }

    const desconto = salarioBruto * porcentagemINSS;

    const salarioLiquido = salarioBruto - desconto;

    document.getElementById("salarioBruto").innerHTML =
        salarioBruto.toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        });

    document.getElementById("inss").innerHTML =
        desconto.toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        });

    document.getElementById("salarioLiquido").innerHTML =
        salarioLiquido.toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        });

}