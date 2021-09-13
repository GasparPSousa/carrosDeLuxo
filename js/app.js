let form = document.querySelector('#form-card'); // Fazendo referência ao formulário(form com id="form-card")
let btnAbrirForm = document.querySelector('#btn-abrir-form'); // 

let btn = document.querySelector('#criar-card'); //
const localStorageCards = JSON.parse(localStorage.getItem('meusCards'));//
let secaoCards = document.querySelector('#secao-cards'); //
let meusCards = localStorage.getItem('meusCards') !== null ? localStorageCards : [];//

const popup = document.querySelector('#pop-up');//

//Lixeira
const localStorageIdCards = JSON.parse(localStorage.getItem('idsCards'));
let indexCards = localStorage.getItem('idsCards') !== null ? localStorageIdCards : []; //array de ids para ligar lixeiras aos seu respectivos cards
//Lixeira

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

//Lixeira
for (objCard of meusCards) {//leitura de itens no localStorage
    let novoArtigo = criarCards(objCard.idCard, objCard.urlImgCard, objCard.titulo, objCard.descricao);
    secaoCards.appendChild(novoArtigo);
}


const lixeiras = document.querySelectorAll('[data-click]');
//Função para excluir cards
lixeiras.forEach(el => el.addEventListener("click", (e) => {
    let idLixeira = parseInt(el.id);//pegando o número do id que é o mesmo numero do index do card no array meusCards
    let indexCard = indexCards.indexOf(idLixeira);
    console.log(indexCard);
    let confirmacao = confirm("Você quer mesmo excluir esse card?");
    if (confirmacao) {
        popup.classList.remove('open');
        meusCards.splice(indexCard, 1);
        indexCards.splice(indexCard, 1);//removendo um elemento do indexCards para manter o sincronismo com o index de meusCards
        location.reload();

    } else
        e.stopPropagation();

    localStorage.setItem('meusCards', JSON.stringify(meusCards));//atualização do localStorage
    localStorage.setItem('idsCards', JSON.stringify(indexCards));//atualização do localStorage
}))
//Lixeira


// window.addEventListener('load', () => {//carregamento da janela
// console.log(meusCards)
// for (objCard of meusCards) {//leitura de itens no localStorage
//     const titulo = objCard.titulo;
//     const descricao = objCard.descricao;
//     const url = objCard.urlImgCard;


//     let novoArtigo = criarCards(id, url, titulo, descricao)

//     secaoCards.appendChild(novoArtigo);
// }



//evento de click para popup
let cards = document.querySelectorAll('.section__card');
cards.forEach(el => el.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add('open');
    const clone = el.cloneNode(true);
    //console.log(clone);
    const paragrafo = clone.children[2].children[1].children[0]
    clone.children[0].style.display = "none"; // Se colocar a lixeira, descomentar
    paragrafo.classList.remove('section__paragrafo');
    clone.children[2].children[1].classList.add('section__card__box__paragrafo');
    popup.appendChild(clone);
}))


// Lixeira
//função para gerar ids
function idGenerator() {
    return Math.round(Math.random() * 1000);
}

// função que cria obj com informações do card gerado para armazenar no LocalStorage // Inseri o id
const criarObj = () => { 
    let obj = {};
    obj.idCard = idGenerator();
    obj.titulo = form.titulo.value;
    obj.descricao = form.descricao.value;
    obj.urlImgCard = form.urlImgCard.value;
    return obj;
}

// Gerando uma funcão anômima para executar todo o procedimento para gerar um card.
btn.addEventListener('click', (e) => {
    e.preventDefault();

    // Fazendo a validação de dadod
    if (form.titulo.value === '' || form.urlImgCard.value === '') {
        alert('Os campos de título e url não podem estar vazios!')
        return
    }

    // Criando o Objeto
    let objCard = criarObj();
    // Passando os itens do objeto como argumentos para criar os Cards
    let novoArtigo = criarCards(objCard.idCard, objCard.urlImgCard, objCard.titulo, objCard.descricao); // Inseri o id

    //Limpando os campos
    form.titulo.value = "";
    form.descricao.value = "";
    form.urlImgCard.value = "";


    indexCards.push(objCard.idCard);//adicionando o id gerado no array indexCards
    meusCards.push(objCard); // adicionando o obj com informações do card gerado (essas informações são recuperadas no carregamento da pagina para gerar cards salvos)
    localStorage.setItem('meusCards', JSON.stringify(meusCards)); // atualização do localStorage
    localStorage.setItem('idsCards', JSON.stringify(indexCards)); //atualização do localStorage
    secaoCards.appendChild(novoArtigo); // Inserindo o card criado como filho da Secao Cards
    location.reload();

})

// Para Lixeira, inseri a parte da lixeira no html e o id no parâmetro
// Funcção para criar os Cards Dinamicamente
function criarCards(id, url, titulo, descricao) {
    let novoArtigo = document.createElement('article');
    novoArtigo.setAttribute("class", "section__card");
    novoArtigo.innerHTML = 
        `
        <dir data-click id="${id}" class="section__card__lixeira">                   
            <img loading= "lazy" class="section__card__lixeira__img1" src="./midias/lixeira-de-reciclagem-tampa.png" alt="">                    
            <img loading= "lazy" class="section__card__lixeira__img2" src="./midias/lixeira-de-reciclagem-corpo.png" alt="">                
        </dir>
        <!-- img card -->
        <div id="imagem-card">
            <img loading= "lazy" class="imagem-card" src="${url}" alt="imagem">
        </div>
        <div class="conteudo-card">
            <!-- título -->
            <div>
                <p class="section__titulo">${titulo}</p>
            </div>
            <div>
                <p class="section__paragrafo">
                ${descricao}
                </p>
            </div>
        </div>
        `
        return novoArtigo;
}


popup.addEventListener("click", () => {
    popup.classList.remove('open');
    popup.removeChild(popup.firstChild);
})

