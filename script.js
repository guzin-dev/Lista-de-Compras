let btnInserir = document.getElementById('btn-inserir')
let produto = document.getElementById('produto')
let lista = document.getElementById('lista')
let itens = document.getElementById('itens')
var inseridoPopup = document.getElementById('inserido-popup');
var vazio = document.getElementById('vazio')

btnInserir.addEventListener("click", () => {
    if(produto.value.length < 8){
        alert('Insira no mímimo oito caracteres')
    } else {
        vazio.remove()
        var div = document.createElement("div")
        var div2 = document.createElement("div")
        var checkbox = document.createElement("input")
        var item = document.createTextNode(produto.value)
        var button = document.createElement("button")
        var buttonText = document.createTextNode('x')
        checkbox.type = "checkbox"
        checkbox.classList.add("checkbox")
        div.classList.add("item")
        div2.classList.add("itens-aligner")
        div.appendChild(div2)
        div2.appendChild(checkbox)
        div2.appendChild(item)
        div.appendChild(button)
        button.appendChild(buttonText)
        lista.appendChild(div)
        
        setTimeout(() => {animar()}, 3000)
        inseridoPopup.classList.toggle('animar')
        produto.value = '' 
    }
})

function animar() {
    inseridoPopup.classList.toggle('animar')
}