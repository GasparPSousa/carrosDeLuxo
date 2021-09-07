let form = document.querySelector('#form-card');
let btnAbrirForm = document.querySelector('#btn-abrir-form');

let btn = document.querySelector('#criar-card');
const localStorageCards = JSON.parse(localStorage.getItem('meusCards'));
let secaoCards = document.querySelector('#secao-cards');
let meusCards = localStorage.getItem('meusCards') !== null ? localStorageCards : [];

const popup = document.querySelector('#pop-up');


//EVENTOS E MÉTODOS:

// Função para mostrar e remover o formulário
let contador = 0;
btnAbrirForm.addEventListener('click', (e) => {
    contador++;
    e.preventDefault();
    if (contador % 2 == 0) {
        form.style.animation = "remover-form ease-in-out 1s forwards"
    } else {
        form.style.animation = "mostrar-form ease-in-out 1s forwards"
    }
})

// window.addEventListener('load', () => {//carregamento da janela
console.log(meusCards)
for (objCard of meusCards) {//leitura de itens no localStorage
    const titulo = objCard.titulo;
    const descricao = objCard.descricao;
    const url = objCard.urlImgCard;

    let novoArtigo = document.createElement('article');
    novoArtigo.setAttribute("class", "section__card");
    novoArtigo.innerHTML =
        ` 
        <!-- img card -->
        <div id="imagem-card">
            <img class="imagem-card" src="${url}" alt="imagem">
        </div>
        <div class="conteudo-card">
            <!-- título -->
            <div>
                <p>${titulo}</p>
            </div>
            <!-- descrição -->
            <div>
                <p class="section__paragrafo">${descricao}</p>
            </div>
        </div>
    `
    secaoCards.appendChild(novoArtigo);
}

//evento de click para popup
let cards = document.querySelectorAll('.section__card');
cards.forEach(el => el.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add('open');
    const clone = el.cloneNode(true);
    const paragrafo = clone.children[2].children[1].children[0];
    clone.children[0].style.display = "none";
    paragrafo.classList.remove('section__paragrafo');
    clone.children[2].children[1].classList.add('section__card__box__paragrafo');
    popup.appendChild(clone);
}))


// função que cria obj com informações do card gerado para armazenar no LocalStorage
const criarObj = () => { 
    let obj = {};
    obj.titulo = form.titulo.value;
    obj.descricao = form.descricao.value;
    obj.urlImgCard = form.urlImgCard.value;
    return obj;
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    let objCard = criarObj();
    if (form.titulo.value === '' || form.urlImgCard.value === '') {
        alert('OS campos de título e url não podem estar vazios!')
        return
    }

    let novoArtigo = document.createElement('article');
    novoArtigo.setAttribute("class", "section__card");
    novoArtigo.innerHTML = 
        `
        <!-- img card -->
        <div id="imagem-card">
            <img class="imagem-card" src="${objCard.urlImgCard}" alt="imagem">
        </div>
        <div class="conteudo-card">
            <!-- título -->
            <div>
                <p>${objCard.titulo}</p>
            </div>
            <div>
                <p class="section__paragrafo">
                ${objCard.descricao}
                </p>
            </div>
        </div>
        `

    form.titulo.value = "";
    form.descricao.value = "";
    form.urlImgCard.value = "";

    meusCards.push(objCard); // adicionando o obj com informações do card gerado (essas informações são recuperadas no carregamento da pagina para gerar cards salvos)
    localStorage.setItem('meusCards', JSON.stringify(meusCards)); // atualização do localStorage
    secaoCards.appendChild(novoArtigo);
    location.reload();

})


popup.addEventListener("click", () => {
    popup.classList.remove('open');
    popup.removeChild(popup.firstChild);
})

