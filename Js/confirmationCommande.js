/* récupérer l'id de la commande */
const orderId = localStorage.getItem('orderId');
console.log(orderId);

/* récupérer le prix total des articles */
const prixTotal = localStorage.getItem('prixTotal');
console.log(prixTotal);



const orderConfirm = document.getElementById('container-order');
orderConfirm.innerHTML = `<h1 class="h1Order">Merci de votre commande!</h1>
            <div class="order-confirm">
                <p class="pOrder">Vous recevrez votre facture de <strong>${prixTotal}.00€</strong> et les détails de livraison dans votre boîte mail ou à l'adresse que vous nous avez indiquée.</p>
            <p class="pOrder">Une expédition de la commande : <strong>${orderId}</strong> est en route.</p>
            </div>`;