//Variaveis
let btnInserir = document.getElementById("btn-inserir");
let produtoInput = document.getElementById("produtoInput");
let lista = document.getElementById("lista-aligner");
let inseridoPopup = document.getElementById("inserido-popup");
let vazio = document.getElementById("listaVazia");
let preco = document.getElementById("preco");

btnInserir.addEventListener("click", () => {
  inserirItem();
});

function inserirItem() {
  if (produtoInput.value.length < 8) {
    alert("Insira no mímimo oito caracteres!");
  } else {
    vazio.remove(); //Apaga o texto "vazia"
    let div = document.createElement("div"); //Div pai
    let div2 = document.createElement("div"); //Div filha
    let checkbox = document.createElement("input"); //Checkbox do produto
    let item = document.createTextNode(produtoInput.value); //Nome do produto
    let deleteButton = document.createElement("button"); //Botão de apagar
    let buttonText = document.createTextNode("x"); //"x" do botão de apagar
    checkbox.type = "checkbox"; //Checkbox agora virou checkbox, antes era input normal
    div.classList.add("item"); //Adiciona a classe item pra div pai
    div2.classList.add("items-aligner"); //Adiciona a classe items-aligner na div filha
    div.appendChild(div2); //Adiciona a div filha na div pai
    div2.appendChild(checkbox); //Adiciona a checkbox na div filha
    div2.appendChild(item); //Adiciona o nome do produto na div filha
    div.appendChild(deleteButton); //Adiciona o botão de deletar na div filha
    deleteButton.appendChild(buttonText); //Adiciona o "x" do botão de deletar
    lista.appendChild(div); //Adiciona a div pai na div lista

    inserirLocalStorage(produtoInput.value); //Insere o produto no LocalStorage

    checkbox.addEventListener("change", () => {
      inserirValor(checkbox, div2); //Cria a função de adicionar valor a um produto
    });

    deleteButton.addEventListener("click", (e) => {
      removerItem(e); //Cria a função de apagar um item da lista/LocalStorage
    });

    inserirAnimation(); //Faz a animação de item adicionado
  }
}

function inserirLocalStorage(param) {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem(i) == undefined) {
      localStorage.setItem(`COMPRA_${param}`, param);
      break;
    }
  }
}

function inserirValor(param, param2) {
  let total = preco.innerText;
  total = parseFloat(total);
  if (param.checked) {
    let valor = prompt("Insira o preço do produto");
    if (valor != null && valor != 0 && valor > 0) {
      var taxado = document.createElement("div")
      taxado.classList.add("taxado")
      param2.appendChild(taxado)
      total += parseFloat(valor);
      preco.innerText = total.toFixed(2);
      param.value = valor;
    } else {
      alert("Erro ao inserir valor, por favor tente novamente!");
      param.checked = false;
    }
  } else {
    param2.querySelector(".taxado").remove()
    total = total - parseFloat(param.value);
    preco.innerText = total.toFixed(2);
  }
}

function inserirAnimation() {
  inseridoPopup.classList.toggle("animar");
  produtoInput.value = "";
}

function removerItem(param) {
  const pai = param.target.parentNode;
  const items_aligner = pai.querySelector(".items-aligner");
  localStorage.removeItem(`COMPRA_${items_aligner.innerText}`);
  pai.remove();
}

window.onload = carregarLocalStorage; //Quando a pessoa recarregar a página vai carregar todas os itens que ela já havia criado

function carregarLocalStorage() {
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