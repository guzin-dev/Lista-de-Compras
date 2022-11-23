
//Variaveis
let btnInserir = document.getElementById("btn-inserir");
let produto = document.getElementById("produtoInput");
let lista = document.getElementById("lista-aligner");
let inseridoPopup = document.getElementById("inserido-popup");
let vazio = document.getElementById("listaVazia");
let preco = document.getElementById("preco");

btnInserir.addEventListener("click", () => {
  if (produto.value.length < 8) {
    alert("Insira no mímimo oito caracteres");
  } else {
    vazio.remove();
    var div = document.createElement("div");
    var div2 = document.createElement("div");
    var checkbox = document.createElement("input");
    var item = document.createTextNode(produto.value);
    var button = document.createElement("button");
    var buttonText = document.createTextNode("x");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    div.classList.add("item");
    div2.classList.add("itens-aligner");
    div.appendChild(div2);
    div2.appendChild(checkbox);
    div2.appendChild(item);
    div.appendChild(button);
    button.appendChild(buttonText);
    lista.appendChild(div);

    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.getItem(i) == undefined) {
        localStorage.setItem(`COMPRA_${produto.value}`, produto.value);
        break;
      }
    }

    checkbox.addEventListener("change", () => {
      var total = preco.innerText;
      var valNumber = parseFloat(total);
      if (checkbox.checked) {
        var valor = prompt("Insira o valor");
        valNumber += parseFloat(valor);
        preco.innerText = valNumber.toFixed(2);
        checkbox.value = valor;
      } else {
        valNumber = valNumber - parseFloat(checkbox.value);
        preco.innerText = valNumber.toFixed(2);
      }
    });

    button.addEventListener("click", (e) => {
      const pai = e.target.parentNode;
      const itens_aligner = pai.querySelector(".itens-aligner");
      localStorage.removeItem(`COMPRA_${itens_aligner.innerText}`);
      pai.remove();
    });

    setTimeout(() => {
      animar();
    }, 3000);
    inseridoPopup.classList.toggle("animar");
    produto.value = "";
  }
});

function animar() {
  inseridoPopup.classList.toggle("animar");
}

function verificador() {
  if (!localStorage.length < 1) {
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).startsWith("COMPRA_")) {
        vazio.remove();
        var div = document.createElement("div");
        var div2 = document.createElement("div");
        var checkbox = document.createElement("input");
        var item = document.createTextNode(
          localStorage.getItem(localStorage.key(i))
        );
        var button = document.createElement("button");
        var buttonText = document.createTextNode("x");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        div.classList.add("item");
        div2.classList.add("itens-aligner");
        div.appendChild(div2);
        div2.appendChild(checkbox);
        div2.appendChild(item);
        div.appendChild(button);
        button.appendChild(buttonText);
        lista.appendChild(div);

        checkbox.addEventListener("change", () => {
          var total = preco.innerText;
          var valNumber = parseFloat(total);
          if (checkbox.checked) {
            var valor = prompt("Insira o valor");
            valNumber += parseFloat(valor);
            preco.innerText = valNumber.toFixed(2);
            checkbox.value = valor;
          } else {
            valNumber = valNumber - parseFloat(checkbox.value);
            preco.innerText = valNumber.toFixed(2);
          }
        });

        button.addEventListener("click", (e) => {
          for (let j = 0; j < localStorage.length; j++) {
            const pai = e.target.parentNode;
            const itens_aligner = pai.querySelector(".itens-aligner");
            if (localStorage.getItem(localStorage.key(j)) == itens_aligner.innerText) {
              localStorage.removeItem(localStorage.key(j));
              pai.remove();
            }
          }
        });
      }
    }
  }
}

window.onload = verificador;