/* ajouter les détails du produit à la page */
/* 1-selectionner la classe/id
2- ajour d'événement au click
3- implémenter les articles */

/* récuperation de la chaîne de requête dans l'URL */
//const queryString_url_id = window.location.search

//extraire juste l'ID
//const lId = queryString_url_id.slice(1)

//methode 2
//const urlSearchParams = new URLSearchParams(queryString_url_id)
//const id = urlSearchParams.get("id")

/* affichage du produit de l'objet séléctionner par id
avec fetch en mettanant la VALEUR de la CLE à la fin de l'url */

//let response =  fetch('http://localhost:3000/api/cameras/${id}')

//console.log(jsonListArticle);

// avec method .find()
//const idSelect = jsonListArticle.find((element) => element.id)



/* let response = fetch("http://localhost:3000/api/cameras/")
const idSelect = response.find((element) => element.id) */

/* 
async function getArticle (){
    const response = await fetch("http://localhost:3000/api/cameras");
    const data = await response.json();
    console.log(data);
};
getArticle() */


async function sglProduct() {
    const prodDetail = await getProduct()
    console.log(prodDetail);
}


function getProduct() {

    fetch("http://localhost:3000/api/cameras")
        .then(data => data.json())
        .then(jsonListArticle => {
            for (jsonArticle of jsonListArticle) {
                //console.log(jsonListArticle);

                /* récuperation de la chaîne de requête dans l'URL */
                const queryString_url_id = window.location.search
                //console.log(queryString_url_id);

                //extraire  l'ID
                const urlSearchParams = new URLSearchParams(queryString_url_id)
                let id = urlSearchParams.get("id")
                //console.log(id);

                //affichage du produit (de l'objet) séléctionner par id
                let idProductSelect = jsonListArticle.find((element) => element._id === id)
                //console.log(idProductSelect)


                /* function displayProducts() { */
                let productContainer = document.getElementById('product-container');
                
                productContainer.innerHTML = `
                        <div class="row" >
                <div class="col-2">
                <img src="${idProductSelect.imageUrl}"  width="100%" alt="appareil photo" id="${idProductSelect.id}">
    
                <div class="small-img-row">
                    <div class="small-img-col">
                    <img src="./images/vcam_1.jpg" width="100%" alt="appareil photo" class="small-img">
                    </div>
                    <div class="small-img-col">
                    <img src="./images/camera-801924.jpg" width="100%" alt="appareil photo" class="small-img">
                    </div>
                    <div class="small-img-col">
                    <img src="./images/camera-1055066.jpg" alt="appareil photo" class="small-img">
                    </div>
                    <div class="small-img-col">
                    <img src="./images/camera-1130731_1920.jpg"  width="100%" alt="appareil photo" class="small-img">
                    </div>
                </div>
    
    
                </div>
                <div class="col-2" id="single-product">
                <p>Accueil / appareil photo</p>
                <h1>${idProductSelect.name}</h1>
                <h4>${idProductSelect.price / 100}.00€</h4>
                <form>
                <label for="option_produit">Choisir l'otion : </label>
                <select name="option_produit" id="option_produit">
                    
                </select>
                </form>
    
                <input type="number" value="1">
            <button type="submit" id="btn_envoyer" class="btn add-cart-btn cart ><a href="" class="btn add-cart-btn cart ">Ajouter au panier</a></button>
                <h3>Détail du produit<i class="fa fa-indent"></i></h3>
                <br>
                <p>${idProductSelect.description}</p>
                </div>
            </div>`;
                //console.log(idProductSelect.lenses);


                //adaptation du nombre d'options dans l'objet du produit
                let optQuantity = idProductSelect.lenses;
                let optTab = []
                //console.log(optQuantity);

                for (let j = 0; j < optQuantity.length; j++) {
                    optTab = optTab += `
                        <option value="${optQuantity[j] + 1}">${optQuantity[j]}</option>
                        `
                }
                //console.log(optTab);

                //affichage des options
                const optList = document.getElementById('option_produit')
                    .innerHTML = optTab;
                //console.log(optList);

                //sélection de l'id de l'article
                let idForm = document.getElementById('option_produit')
                //console.log(idForm);

                //selection du bouton envoyer + écouter l'évènement
                let btnSubmit = document.getElementById('btn_envoyer')
                btnSubmit.addEventListener('click', (event) => {
                    event.preventDefault();

                    //récupérer option de l'article
                    let optForm = idForm.value;
                    //console.log(optForm);

                    //récupérer les valeur de l'article
                    let optionProduit = {
                        name: idProductSelect.name,
                        id_ProductSelect: idProductSelect._id,
                        id_description: idProductSelect.description,
                        id_image: idProductSelect.imageUrl,
                        option_produit: optForm,
                        quantite: 1,
                        price: idProductSelect.price / 100
                    }
                    //console.log(optionProduit);

                    // localSorage
                    let productStorage = JSON.parse(localStorage.getItem('products'))

                    //console.log(productStorage);
                    //alert de confirmation
                    let alertConfirmation = () => {
                        if (window.confirm(`${idProductSelect.name} option : ${optForm} à bien été ajouter au panier  
                            OK pour consulter le panier 
                            ANNULER revenir aux produits `)) {
                            window.location.href = 'card.html'
                        } else {
                            window.location.href = 'product.html'

                        }
                    }
                    //ajoute un produit dans le locaStorage
                    const idProductStorage = () => {
                        productStorage.push(optionProduit)
                        localStorage.setItem('products', JSON.stringify(productStorage))
                    }
                    //s'il y a des produits dans le localStorage
                    if (productStorage) {
                        idProductStorage()
                        alertConfirmation()
                    }//s'il n'y a pas de produits dans le localStorage
                    else {
                        productStorage = []
                        idProductStorage()
                        alertConfirmation()
                        console.log(productStorage);
                    }


                });

                

            }
        })
}
getProduct()


