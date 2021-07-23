

fetch("http://localhost:3000/api/cameras")
    .then(data => data.json())
    .then(jsonListArticle => {
        for (jsonArticle of jsonListArticle) {
            let article = new Article(jsonArticle);




            function onLoadCartNumber() {
                let productNumbers = localStorage.getItem('cartNumbers');
                if (productNumbers) {
                    document.querySelector('.cart-items').textContent = productNumbers
                }

            }




            /* affichage des produits dans le panier */
            function displayCarts() {
                let cartItems = localStorage.getItem('productIdInCart');
                cartItems = JSON.parse(cartItems)
                let articleContainer = document.getElementById('article-container')
                let cartCost = localStorage.getItem("totalCost")

                if (cartItems && articleContainer) {
                } articleContainer.innerHTML = '',
                    Object.values(cartItems).map(article => {
                        articleContainer.innerHTML += `
                    <table>
                        <tr>
                            <th>Produit</th>
                            <th>Options</th>
                            <th>Total</th>
                        </tr>

                        <!-- cart item -->
                        <tr class="cart-content" >
                            <td class="cart-item" id=${article.id}>
                                <div class="cart-info" >
                                    <img src="${article.imageUrl}" class="img-article" alt="appareil photo">
                                    <div>
                                        <p class="name">${article.name}</p>
                                        <small class="price">${article.price / 100}.00€</small>
                                        <br>
                                        <span class="remove-item"><a href="">retirer</a></span>
                                    </div>
                                </div>
                            </td>
                            <td class="option_produit">option</td>
                            <td class="option_produit">Total</td>
                        </tr>
                    </table>
                </div>

                    `;

                    })
                /* let totalPrice = document.getElementById('total-price')
                totalPrice.innerHTML = `
                <table>
                        <tr class="cart-footer">
                            <td>Total</td>
                            <td class="total-price-num cart-total">${idProductSelect.price / 100}.00€</td>
                        </tr>
                    </table>` */




            }

            onLoadCartNumber()
            displayCarts()
        }

    })
