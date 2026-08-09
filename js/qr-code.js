const botao = document.getElementById("gerar");

const texto = document.getElementById("texto");

const qrCode = document.getElementById("qrCode");

botao.addEventListener("click", gerarQRCode);

texto.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        gerarQRCode();

    }

});

function gerarQRCode(){

    if(texto.value.trim() === ""){

        alert("Digite algum texto.");

        return;

    }

    qrCode.style.display = "block";

    qrCode.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
        encodeURIComponent(texto.value);

}