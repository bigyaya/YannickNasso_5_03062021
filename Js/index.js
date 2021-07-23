/* gere l'affichage des produits */

async function main() {
    const fetchArticle = await getArticle()
    console.log(fetchArticle);
}

function getArticle() {
    fetch("http://localhost:3000/api/cameras")
        .then(data => data.json())
        .then(jsonListArticle => {

            for (jsonArticle of jsonListArticle) {
                let article = new Article(jsonArticle);
                document.getElementById('row').innerHTML += `
            
                <div class="col-4" id="article">
                <div class="image">
                    <a href="product-details.html?id=${article._id}"><img src="${article.imageUrl}"  data-id="${article._id}"class="img-article bag-btn" alt="appareil photo" /></a>
                    <span href="#" class="add-cart  cart">voir l'article</span>
                </div>
                <h4 class="name">${article.name}</h4>
                <p class="desciption">${article.description}</p>
                <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <p class="price">${article.price / 100}.00€</p>
                </div>`
                /* ajout du produit au panier au click */
                /* let carts = document.querySelectorAll('.add-cart');
                
                for (let i = 0; i < carts.length; i++) {
                    
                    carts[i].addEventListener('click', () => {
                        cartNumbers(jsonListArticle[i]);
                        totalCost(jsonListArticle[i])
                    })
                } */


                /* local storage */
                /* affichage du nombre de produit dans le panier */
                function onLoadCartNumber() {
                    let productNumbers = localStorage.getItem('cartNumbers');
                    if (productNumbers) {
                        document.querySelector('.cart-items').textContent = productNumbers
                    }

                }


                /* le nombre de produits dans local storage  */
                /* function cartNumbers(jsonListArticle) {
                    let productNumbers = localStorage.getItem('cartNumbers');
                    productNumbers = parseInt(productNumbers)
                    if (productNumbers) {
                        localStorage.setItem('cartNumbers', productNumbers + 1);
                        document.querySelector('.cart-items').textContent = productNumbers + 1
    
                    } else {
                        localStorage.setItem('cartNumbers', 1);
                        document.querySelector('.cart-items').textContent = 1
    
                    }
                    setItems(jsonListArticle)
                } */


                /* selection des produits par ID */
                /* function setItems(jsonListArticle) {
                    let cartItems = localStorage.getItem('productIdInCart');
                    cartItems = JSON.parse(cartItems)
    
                    if (cartItems != null) {
                        if (cartItems[jsonListArticle._id] == undefined) {
                            cartItems = {
                                ...cartItems,
                                [jsonListArticle._id]: jsonListArticle
                            }
                        }
                        cartItems[jsonListArticle._id]._id += jsonListArticle._id
                    } else {
                        jsonListArticle._id = jsonListArticle._id;
                        cartItems = {
                            [jsonListArticle._id]: jsonListArticle
    
                        }
    
                    }
                    localStorage.setItem("productIdInCart", JSON.stringify(cartItems))
                    
                } */


                /* total des prix */
                /* function totalCost(product) {
                    console.log(product.price);
                    let cartCost = localStorage.getItem("totalCost")
                    if(cartCost != null){
                        cartCost = parseInt(cartCost)
                        localStorage.setItem("totalCost", cartCost + product.price)
    
                    }else{
                        localStorage.setItem("totalCost", product.price )
                    }
                }
     */
                /* function displayCarts() {
                    let cartItems = localStorage.getItem('productInCart');
                    cartItems = JSON.parse(cartItems)
                    let articleContainer = document.getElementById('article-container')
                    if (cartItems && articleContainer) {
                    } articleContainer.innerHTML = '',
                        Object.values(cartItems).map(article => {
                            articleContainer.innerHTML += `
                        <table>
                            <tr>
                                <th>Produit</th>
                                <th>Quantité</th>
                                <th>Total</th>
                            </tr>
    
                        <!-- cart item -->
                        <tr class="cart-content" >
                            <td class="cart-item" id=${article._id}>
                                <div class="cart-info" >
                                    <img src="${article.imageUrl}" class="img-article" alt="appareil photo">
                                    <div>
                                        <p class="name">${article.name}</p>
                                        <small class="price">${article.price / 100}€</small>
                                        <br>
                                        <span class="remove-item"><a href="">retirer</a></span>
                                    </div>
                                </div>
                            </td>
                            <td><i class="fas fa-chevron-up"></i>
                                <p class="item-amount"> 1</p>
                                <i class="fas fa-chevron-down"></i></td>
                            <td class="price">${article.price / 100}</td>
                        </tr>
    
                    </table>
    
                    <div class="total-price">
                        <table>
                            <tr class="cart-footer">
                                <td>Total</td>
                                <td class="total-price-num cart-total">529.00€</td>
                            </tr>
                        </table>
                        </div>
                        `;
                        
    
                        }) */

                onLoadCartNumber()
                /* displayCarts() */
            }

        })
}
getArticle()





