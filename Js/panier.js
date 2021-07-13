//produit dans localStorage
let productStorage = JSON.parse(localStorage.getItem('productStored'))
console.log(productStorage);

//affichage du produit
let productCart = document.getElementById('cart-container')
console.log(productCart);

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
        localStorage.setItem('productStored', JSON.stringify(productStorage))
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
console.log(clearAllCart);
clearAllCart.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('productStored')
    window.location.href = "./card.html"

})



//--------------------Calcul du prix total------------------//
let priceTable = []

/* récuprer les prix dans le locaStorage */
for (let m = 0; m < productStorage.length; m++) {
    let priceStorage = productStorage[m].price;
    priceTable.push(priceStorage)
    //console.log(priceTable);
}

/* calcule les prix dans le tableau de prix avec .reduce() */
let reducer = (accumulator, currentValue) => accumulator + currentValue;
let clacPrice = priceTable.reduce(reducer, 0);
//console.log(clacPrice);


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
let displayForm = () =>{
    let form = document.querySelector('.form-container');
    form.innerHTML = `<div class="form form-row">
                    <div class="col-md-4 mb-3">
                    <label for="prenom">Prénom</label>
                    <input type="text" class="form-control" id="prenom" placeholder="Prénom" value="" required>
                    </div>
                    <div class="col-md-4 mb-3">
                    <label for="nom">Nom</label>
                    <input type="text" class="form-control" id="nom" placeholder="Nom" value="" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Adresse mail</label>
                        <input type="email" class="form-control" id="email" placeholder="adresse@example.com">
                    </div>
                </div>
                <div class="form form-row">
                    <div class="col-md-6 mb-3">
                    <label for="ville">Ville</label>
                    <input type="text" class="form-control" id="ville" placeholder="" required>
                    </div>
                    <div class="col-md-3 mb-3">
                    <label for="pays">Pays</label>
                    <input type="text" class="form-control" id="pays" placeholder="" required>
                    </div>
                    <div class="col-md-3 mb-3">
                    <label for="codePostal">code postal</label>
                    <input type="text" class="form-control" id="codePostal" placeholder="" required>
                    </div>
                </div>
                <div class="mb-3 message">
            <label for="message" class="form-label">Votre message</label>
            <textarea class="form-control" id="message" rows="3"></textarea>
            </div>
                <div class="form form-group">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required>
                    <label class="form-check-label" for="invalidCheck2">
                        Agree to terms and conditions
                    </label>
                    </div>
                    <button class="btn btn-primary" type="submit" id="submit">Envoyer</button>
                </div>`;
}
displayForm()