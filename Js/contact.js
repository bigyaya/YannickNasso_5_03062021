//affichage et interaction de la page contact

document.querySelector('.form button[type="submit"]').addEventListener('click', function(){
    for (input of document.querySelectorAll('.form input,.form textarea')){
        input.checkValidity()
    }
})