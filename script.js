//Variaveis
let btnInserir = document.getElementById("btn-inserir");
let produtoInput = document.getElementById("produtoInput");
let lista = document.getElementById("lista-aligner");
let inseridoPopup = document.getElementById("inserido-popup");
let vazio = document.getElementById("listaVazia");
let preco = document.getElementById("preco");

window.onload = carregarLocalStorage; //Quando a pessoa recarregar a página vai carregar todas os itens que ela já havia criado

btnInserir.addEventListener("click", () => {
  inserirItem();
});

function carregarLocalStorage() {
  if (!localStorage.length < 1) {
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).startsWith("COMPRA_")) {
        criar_carregarItem("carregar", i);
      }
    }
  }
}

function criar_carregarItem(criar_carregar, carregar_index) {
  if (criar_carregar == "criar") { //Vai criar os items
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

    let produtoObj = { nome: produtoInput.value, valor: 0 }; //Cria o objeto do produto
    let produtoObj_serialized = JSON.stringify(produtoObj); //Serializa o objeto pra inserir no LocalStorage

    inserirLocalStorage(produtoInput.value, produtoObj_serialized); //Insere o produto no LocalStorage

    let produtoValue = produtoInput.value;

    checkbox.addEventListener("change", () => {
      inserirValor(checkbox, produtoValue); //Cria a função de adicionar valor a um produto
    });

    deleteButton.addEventListener("click", (e) => {
      removerItem(e, checkbox); //Cria a função de apagar um item da lista/LocalStorage
    });

    inserirAnimation(); //Faz a animação de item adicionado
  } else if (criar_carregar == "carregar") { //Vai carregar todos os itens
    let itemObj_deserialized = JSON.parse(
      localStorage.getItem(localStorage.key(carregar_index))
    );

    vazio.remove();
    let div = document.createElement("div"); //Div pai
    let div2 = document.createElement("div"); //Div filha
    let checkbox = document.createElement("input"); //Checkbox do produto
    let item = document.createTextNode(itemObj_deserialized.nome); //Nome do produto
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

    if (itemObj_deserialized.valor != 0) {
      checkbox.checked = true;
      let total = preco.innerText;
      total = parseFloat(total);

      let antigoProduto = localStorage.getItem(
        `COMPRA_${itemObj_deserialized.nome}`
      );
      let antigoProduto_deserialized = JSON.parse(antigoProduto);
      valor = antigoProduto_deserialized.valor;
      checkbox.value = valor;

      total += parseFloat(valor);
      preco.innerText = total.toFixed(2);
    }

    let a = itemObj_deserialized.nome;

    checkbox.addEventListener("change", () => {
      inserirValor(checkbox, a); //Cria a função de adicionar valor a um produto
    });

    deleteButton.addEventListener("click", (e) => {
      removerItem(e, checkbox);
    });
  }
}

function inserirItem() {
  if (produtoInput.value.length < 8) {
    alert("Insira no mímimo oito caracteres!");
  } else {
    criar_carregarItem("criar");
  }
}

function inserirLocalStorage(produto, produtoObj_serialized) {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem(i) == undefined) {
      localStorage.setItem(`COMPRA_${produto}`, produtoObj_serialized);
      break;
    }
  }
}

function inserirValor(checkbox, produto) {
  let total = preco.innerText;
  total = parseFloat(total);

  let antigoProduto = localStorage.getItem(`COMPRA_${produto}`);
  let antigoProduto_deserialized = JSON.parse(antigoProduto);

  if (checkbox.checked) {
    let valor = prompt("Insira o preço do produto");
    if (valor != null && valor != 0 && valor > 0) {
      total += parseFloat(valor);
      preco.innerText = total.toFixed(2);
      checkbox.value = valor;

      antigoProduto_deserialized.valor = valor;
      antigoProduto = JSON.stringify(antigoProduto_deserialized);
      localStorage.removeItem(`COMPRA_${produto}`);
      localStorage.setItem(`COMPRA_${produto}`, antigoProduto);
    } else {
      alert("Erro ao inserir valor, por favor tente novamente!");
      checkbox.checked = false;
    }
  } else {
    total = total - parseFloat(checkbox.value);
    preco.innerText = total.toFixed(2);
    checkbox.value = checkbox.value - checkbox.value;

    antigoProduto_deserialized.valor =
      antigoProduto_deserialized.valor - antigoProduto_deserialized.valor;
    antigoProduto = JSON.stringify(antigoProduto_deserialized);
    localStorage.removeItem(`COMPRA_${produto}`);
    localStorage.setItem(`COMPRA_${produto}`, antigoProduto);
  }
}

function inserirAnimation() {
  inseridoPopup.classList.toggle("animar");
  produtoInput.value = "";
}

function removerItem(e, checkbox) {
  const pai = e.target.parentNode;
  const items_aligner = pai.querySelector(".items-aligner");
  localStorage.removeItem(`COMPRA_${items_aligner.innerText}`);
  if (
    checkbox.value != undefined &&
    checkbox.value != null &&
    checkbox.value != 0 &&
    checkbox.value != "on"
  ) {
    let total = preco.innerText;
    total = parseFloat(total);
    total = total - parseFloat(checkbox.value);
    preco.innerText = total.toFixed(2);
  }
  pai.remove();
}