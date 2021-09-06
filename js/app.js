let form = document.querySelector('#form-card');
let btnAbrirForm = document.querySelector('#btn-abrir-form');


let contador = 0;
btnAbrirForm.addEventListener('click', e => {
    contador++;
    e.preventDefault();
    if (contador % 2 == 0) {
        form.style.animation = "remover-form ease-in-out 1s forwards"
    } else {
        form.style.animation = "mostrar-form ease-in-out 1s forwards"
    }
})