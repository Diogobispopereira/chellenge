const textArea = document.querySelector(".conteudo__input");
const mensagem = document.getElementById("outputTexto");

function btnEncriptar() {
    let textoEncriptado = encriptar(textArea.value);
      if(textoEncriptado === undefined){
        return
      }
    localStorage.setItem("textoCriptografado", textoEncriptado)
    textArea.value = "";
    window.location.href = "descriptografar.html";
}

function encriptar(stringEncriptada) {
    if(/[A-Z]/.test(stringEncriptada)){
    alert("Apenas letras minúsculas são permitida")
     return
    }
    let matrizCodigo = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"]
    ];
    matrizCodigo.forEach(([original, substituto]) => {
        stringEncriptada = stringEncriptada.replaceAll(original, substituto);
    })
    console.log(stringEncriptada)
    return stringEncriptada
}

//todas as 2 formas funcionam//
  /*
    stringEncriptada = stringEncriptada.toLowerCase();

        for (let indice = 0; indice < matrizCodigo.length; indice++) {
            if (stringEncriptada.includes(matrizCodigo[indice][0])) {
                stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[indice][0], matrizCodigo[indice][1]);
            }
        }
        console.log(stringEncriptada)
        return stringEncriptada
    }
*/
function btnDesencriptar() {
    const desencriptado = desencriptar(textArea.value);
    localStorage.setItem("textoDesencriptado", desencriptado);
    textArea.value = "";
    window.location.href = "index.html";
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"]
    ];
    matrizCodigo.forEach(([original, substituto]) =>{
        stringDesencriptada = stringDesencriptada.replaceAll(substituto, original);
    }) 
    console.log(stringDesencriptada);
    return stringDesencriptada
}
//todas as 2 formas funcionam//

   /* stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let iDesencriptar = 0; iDesencriptar < matrizCodigo.length; iDesencriptar++) {
        stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[iDesencriptar][1], matrizCodigo[iDesencriptar][0]);
    }
    console.log(stringDesencriptada);
    return stringDesencriptada
}
*/
function copiarTexto() {
    const textoCopiado = document.getElementById("outputTexto").value;
    navigator.clipboard.writeText(textoCopiado)
        .then(() => {
            alert("Texto copiado com sucesso");
        })
        .catch(err => {
            console.error("Erro ao copiar", err);
        })
}

window.onload = function () {
    const url = window.location.href;
    if (url.includes('descriptografar.html')) {
        const textoCriptografado = localStorage.getItem('textoCriptografado');
        if (textoCriptografado) {
            document.querySelector(".conteudo__input-secundario").value = textoCriptografado;
        } else {
            document.querySelector(".conteudo__input-secundario").value = "";
        }
        localStorage.removeItem('textoCriptografado');
    } else if (url.includes('index.html')) {
        const textoDesencriptado = localStorage.getItem('textoDesencriptado');
        if (textoDesencriptado) {
            document.getElementById("inputTexto").value = textoDesencriptado;
        } else {
            document.getElementById("inputTexto").value = "";
        }
        mensagem.innerText = "";
        localStorage.removeItem("textoDesencriptado");
        textArea.value = "";
    }
};