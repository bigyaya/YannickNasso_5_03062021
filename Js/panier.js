//const { response } = require("express");

//produit dans localStorage
let productStorage = JSON.parse(localStorage.getItem('products'))
//console.log(productStorage);


//---------------------affichage du produit----------------------------//
let productCart = document.getElementById('cart-container')
//console.log(productCart);

if (productStorage === null || productStorage == 0) {
    //si le localStorage est vide
    console.log('je suis vide');
    const panierVide = `
        <div class="cart-container cartPosition">
        <div> Votre <br>panier est vide </div>
        </div>
    `;
    productCart.innerHTML = panierVide;
} else {
    // si le localStorage est rempli
    console.log('je suis rempli de produit');



    for (let k = 0; k < productStorage.length; k++) {
        console.log(productStorage[k]);
        let panier = [];
        panier += `
        <tr class="cart-content" >
        <td class="cart-item">
                            <div class="cart-info" id="cart-info">
                                <a href="product-details.html?id=${productStorage[k].id_ProductSelect}"><img src="${productStorage[k].id_image}"  alt="appareil photo"></a>
                                <div>
                                    <p>${productStorage[k].name}</p>
                                    <small>${productStorage[k].price}.00€</small>
                                    <br>
                                    <span class="remove-item"><a href="" class="link">retirer</a></span>
                                </div>
                            </div>
                        </td>
                        <td class="option_produit">${productStorage[k].option_produit}</td>
                            <td class="option_produit"></td>  
                        <td>${productStorage[k].price}.00€</td>
                        
        `;
        //console.log(panier);
        productCart.innerHTML += panier

    }
}
//--------------------Fin affichage produit-----------------//



//--------------------Bouton retirer l'article------------------//

/* récuperer les boutons(liens) retirer */
let removeItems = document.querySelectorAll('.remove-item');
//console.log(removeItems);
for (let l = 0; l < removeItems.length; l++) {
    //séléction du produit supprimé au click
    removeItems[l].addEventListener('click', (event) => {
        event.preventDefault();

        let deletProduct = productStorage[l].id_ProductSelect;
        console.log(deletProduct);

        //nouveau tableau sans le produit supprimé
        productStorage = productStorage.filter(el => el.id_ProductSelect !== deletProduct)
        console.log(productStorage);

        //nouveau tableau dans le localStorage + affichage du nouveau panier 
        localStorage.setItem('products', JSON.stringify(productStorage))
        window.location.href = "./card.html"
        //alert("Voulez-vous supprimer ce produit");
    })

}



//--------------------Bouton vider le panier------------------//
/* création du bouton avec la methode insertAdjacentHTML */
let clearAll = `
<button class="btn-clear-all">Vider le panier</button>
`;
productCart.insertAdjacentHTML("beforeend", clearAll);

/* retirer la clé du produit au click */
let clearAllCart = document.querySelector('.btn-clear-all');
//console.log(clearAllCart);
clearAllCart.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('products')
    window.location.href = "./card.html"

})



//--------------------Calcul du prix total------------------//
let priceTable = []
/* récuprer les prix dans le locaStorage */
for (let m = 0; m < productStorage.length; m++) {
    let priceStorage = productStorage[m].price;
    priceTable.push(priceStorage)
    console.log(priceTable);
}

/* calcule les prix dans le tableau de prix avec .reduce() */
let reducer = (accumulator, currentValue) => accumulator + currentValue;
let clacPrice = priceTable.reduce(reducer, 0);
console.log(clacPrice);


/* affichage du prix total */
let displayTotal = document.getElementById('total-price');
displayTotal.innerHTML = `
<table class="table-footer">
                        <tr class="cart-footer">
                            <td>Total</td>
                            <td class="total-price-num cart-total">${clacPrice}.00€</td>
                        </tr>
                    </table>
`;


//--------------------Formulaire------------------//

/* affichage du formulaire */
let displayForm = () => {
    let form = document.querySelector('.form-container');
    form.innerHTML = `
                <h2>Remplissez le formulaire</h2>
                <form name="test" action="check.php" method="post">
                <div class="form form-row">
                    <div class="col-md-4 mb-3">
                    <label for="prenom">Prénom</label><span id="firstName-error"></span>
                    <input type="text"  class="form-control" id="firstName" placeholder="Prénom" value="" pattern="[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'-]{3,20}"required>
                    </div>
                    <div class="col-md-4 mb-3">
                    <label for="nom">Nom</label><span id="lastname-error"></span>
                    <input type="text" class="form-control" id="lastName" placeholder="Nom" value="" pattern="[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'-]{3,20}"required>
                    </div>
                    <div class="col-md-4 mb-3">
                    <label for="adresse">adresse</label><span id="address-error"></span>
                    <input type="text" class="form-control" id="address" placeholder="adresse" value="" pattern="^[A-Za-z0-9\s,-.]*$" required>
                    </div>
                    <div class="col-md-3 mb-3">
                    <label for="codePostal">code postal</label><span id="zipcode-error"></span>
                    <input type="text" class="form-control" id="zipcode" placeholder="" pattern="[0-9]{5}"required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label><span id="email-error"></span>
                        <input type="email" class="form-control" id="email" placeholder="adresse@example.com" required>
                    </div>
                </div>
                <div class="form form-row">
                    <div class="col-md-6 mb-3">
                    <label for="ville">Ville</label><span id="city-error"></span>
                    <input type="text" class="form-control" id="city"  placeholder="" pattern="[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'-]{3,20}"required>
                    </div>
                    
                </div>
            
            <div class="form form-group">

            <input  type="submit" class="btn btn-primary"  id="submit" name="submit" value="commandez"></input>
            </div>
            </form>
            
            
            
            `;
}
displayForm();

//class="btn btn-primary"


//--------------/* event sur le bounton commandez */-------------------------//

let submitForm = document.getElementById('submit');
//console.log(submitForm);
submitForm.addEventListener('click', (e) => {
    e.preventDefault()
    /* var valid = true
        for (let input of document.querySelectorAll('.form input, .form textearea')) {
            input.reportValidity();
            if (!valid ){
                break;
            }
        } */

    //------------------ tableau d'ID des produits + valeur du formulaire ----------------------// 

    /* Id des produits dans un tableau */
    let products = [];
    for (let n = 0; n < productStorage.length; n++) {
        let idStorage = productStorage[n].id_ProductSelect;
        products.push(idStorage)
        console.log("products");

        console.log(products);
    }
    /* récupérer les valeurs du formulaire dans un objet + les mettre dans LocalStorage */
    let contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value + ' ' + document.getElementById('zipcode').value,

        city: document.getElementById('city').value,
        email: document.getElementById('email').value,
        /* pays: document.getElementById('pays').value,
        codePostal: document.getElementById('codePostal').value,
        message: document.getElementById('message').value */
    }


    //--------------------Valider les champs du formulaire------------------//


    const regexString = (value) => {
        return /^[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'-]{3,20}$/.test(value)
    };

    const regexAdress = (value) => {
        return /^[A-Za-z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'-\s]{5,50}$/.test(value);
    };
    /* const regexZip = (value) => {
        return /^[0-9]{5}$/.test(value)
    }; */

    const regexEmail = (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    };


    const regexVille = (value) => {
        return /^[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'-]{3,20}$/.test(value)
    };

    /* const regexPays = (value) => {
        return /^[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'-]{3,20}$/.test(value)
    }; */

    /* validation du prénom */
    function valPrenom() {
        const lePrenom = contact.firstName;
        console.log(lePrenom);
        if (regexString(lePrenom)) {
            console.log("OK");
            document.getElementById('firstName-error').textContent = "";

            return true;
        } else {
            console.log("KO");
            document.getElementById('firstName-error').textContent = "veuillez bien remplir ce champ";

            alert('chiffre et symbole ne sont pas autorisé \n min: 3 caractère, max: 20 caractère')
            return false;
        }

    };
    /* validation du Nom */
    function valNom() {
        const leNom = contact.lastName;
        console.log(leNom);
        if (regexString(leNom)) {
            console.log("OK");
            document.getElementById('lastname-error').textContent = "";

            return true;
        } else {
            console.log("KO");
            document.getElementById('lastname-error').textContent = "veuillez bien remplir ce champ";

            alert('chiffre et symbole ne sont pas autorisé \n min: 3 caractère, max: 20 caractère')
            return false;
        }

    };
    /* validation de l'adresse */
    function valAdress() {
        const leAdress = contact.address;
        console.log(leAdress);
        if (regexAdress(leAdress)) {
            console.log("OK");
            document.getElementById('address-error').textContent = "";

            return true;
        } else {
            console.log("KO");
            document.getElementById('address-error').textContent = "veuillez bien remplir ce champ";

            alert("l'adress n'est pas au bon format")
            return false;
        }
    };

    /* validation du codePostal */
    /* function valZip() {
        const leZip = contact.zipcode;
        console.log(leZip);
        if (regexZip(leZip)) {
            console.log("OK");
            document.getElementById('zipcode-error').textContent = "";

            return true;
        } else {
            console.log("KO");
            document.getElementById('zipcode-error').textContent = "veuillez bien remplir ce champ";

            alert('Le code postal ne doit contenir que des chiffres allant de 0 à 5')
            return false;
        }

    }; */


    /* validation de l'email */
    function valEmail() {
        const leEmail = contact.email;
        console.log(leEmail);
        if (regexEmail(leEmail)) {
            console.log("OK");
            document.getElementById('email-error').textContent = "";

            return true;
        } else {
            console.log("KO");
            document.getElementById('email-error').textContent = "veuillez bien remplir ce champ";

            alert("l'Email n'est pas au bon format")
            return false;
        }
    };


    /* validation de la ville */
    function valVille() {
        const leVille = contact.city;
        console.log(leVille);
        if (regexVille(leVille)) {
            console.log("OK");
            document.getElementById('city-error').textContent = "";

            return true;
        } else {
            console.log("KO");
            document.getElementById('city-error').textContent = "veuillez bien remplir ce champ";

            alert('chiffres et symboles ne sont pas autorisé \n min: 3 caractère, max: 20 caractère')
            return false;
        }

    };
    /* validation du Pays */
    /* function valPays() {
        const lePays = contact.pays;
        console.log(lePays);
        if (regexPays(lePays)) {
            console.log("OK");
            return true;
        } else {
            console.log("KO");
            alert('chiffres et symboles ne sont pas autorisé \n min: 3 caractère, max: 20 caractère')
            return false;
        }

    }; */

    /* valeur du formulaire dans locaStorage */
    if (valPrenom() && valNom() && valAdress() /* && valZip() */ && valEmail() && valVille() /* && valPays() */) {
        localStorage.setItem('contact', JSON.stringify(contact));
        localStorage.setItem('prixTotal', JSON.stringify(clacPrice));


        //----------------------POST formulaire-----------------------//

        /* formulaire + produits séléctionner */
        let sendForm = {
            contact,
            products,
            clacPrice
        };
        console.log("envoie du formulaire");
        console.log(sendForm);

        /* envoie de sendForm sur le serveur */
        const postForm = fetch("http://localhost:3000/api/cameras/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendForm),
            mode: "cors",
        });

        /* resultat du serveur dans la console */
        postForm.then(async (response) => {
            try {
                const contenu = await response.json()
                console.log("contenu de la reponse du serveur");
                console.log(contenu);

                if (response.ok) {
                    console.log(`resultat de response.ok : ${response.ok}`);

                    //récupérer l'ID du produit (orderId)
                    console.log("l'id de la reponse");
                    console.log(contenu.orderId);

                    //mettre l'id dans le localStorage
                    localStorage.setItem('orderId', contenu.orderId);

                    //aller à la page de confirmation
                    window.location = "confirmation-commande.html";
                } else {
                    console.log(`resultat de response.ok : ${response.status}`);
                    //alert(`problème avec le serveur : erreur ${response.status}`)

                }

            } catch (error) {
                console.log(" refference de l'erreur dans le catch()");
                console.log(error);
                //alert(`erreur trouver : ${error}`)
            }

        });
    } else {
    };
    //alert("Veuillez remplir le champ du formulaire")





})





//--------------------Mettre les valeur de l'objet contact du locaStorage dans le formulair------------------//

/* prendre les propriétés et les convertirs en javascript */
/* let getContact = localStorage.getItem('contact')
let parseContact = JSON.parse(getContact) */

//console.log(parseContact);

/* fonction pour remplir le formulair à partir
 des propriétés de l'objet -contact- dans le localStorage */
/* function fillForm(input) {
    if (parseContact == null) {

        console.log('il y a rien dans le formulaire');
    } else {
        document.getElementById(`${input}`).value = parseContact[input]
    }
};

fillForm('prenom')
fillForm('nom')
fillForm('adresse')
fillForm('email')
fillForm('ville')
fillForm('pays')
fillForm('codePostal')
 */
