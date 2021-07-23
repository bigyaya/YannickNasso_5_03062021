document.querySelector('.form button[type="submit"]').addEventListener("click", function (){
    var valid = true
    for (let input of document.querySelectorAll('.form input, .form textearea')) {
        input.reportValidity();
        if(!valid){
             break;
        }
    }
    /* if(valid){
        alert("messagez envoyer!")
    } */
})