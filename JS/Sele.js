
let productData;

const containerRow = document.getElementById("productContainer");
let producSide = document.getElementById("producSide")
let productCart = document.getElementById("productChart")
const addToCartPro = document.getElementById("addtoCart")
const buttonsAddCart = document.querySelectorAll('.bntAddCart');

function loadProduct(){
    // Get product data from localStorage
    if (JSON.parse(localStorage.getItem("products")!= null)){
        productData = JSON.parse(localStorage.getItem("products"));
        // console.log(productData); 
    }

    if (JSON.parse(localStorage.getItem("addProductCart")!= null)){
        addProCarts = JSON.parse(localStorage.getItem("addProductCart"));
        // console.log(addProCarts);  // For debugging purposes
    }
}

function saveProduct(data){
    localStorage.setItem("addProductsCart", JSON.stringify(data));
}

function showProducts() {
    containerRow.innerHTML = ""; // Clear the container before adding new cards

    for (const product of productData) {
        // Create the card div
        const containercard = document.createElement("div");
        containercard.className = "col-sm-6 mb-4";
        containercard.style.margin = "0";

        const card = document.createElement("div");
        card.className = "card";
        card.style.margin = "0";

        // Create card body
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        // Create title
        const cardTitle = document.createElement("strong");
        cardTitle.className = "card-title";
        cardTitle.style.width = "300px";
        cardTitle.textContent = product.productName;

        // Create description text
        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.textContent = `Price: $${product.price}, Quantity: ${product.quantity}`;

        // Create link button
        const cardButton = document.createElement("a");
        cardButton.href = "#";
        cardButton.className = "btn btn-primary alinge-item-end bntAddCart";
        cardButton.textContent = "Add to cart";
        cardButton.addEventListener("click",function(){
            openNav();
            // addProToCart(product);
            displayAddToCart(product);
        });

        // Append title, text, and button to the card body
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardButton);

        // Append card body to the card
        card.appendChild(cardBody);

        // Append card to the container
        containercard.appendChild(card);
        containerRow.appendChild(containercard);
    }
}
// Initialize addProCarts if it's not already defined
function displayAddToCart(carts) {
    if (!carts) return;

    // Clear previous content to display only the new product
    addToCartPro.innerHTML = '';
    let totals = carts.price;

    // Helper function to create and append elements
    function createDetailRow(label, value, isInput = false) {
        const row = document.createElement('span');
        row.className = 'd-flex justify-content-between';

        const labelElem = document.createElement('strong');
        labelElem.textContent = label;

        const valueElem = isInput ? document.createElement('input') : document.createElement('strong');
        if (isInput) {
            valueElem.type = 'number';
            valueElem.value = value;
            valueElem.addEventListener('input', function () {
                console.log(`Updated Quantity: ${valueElem.value}`);
                totals = carts.price * valueElem.value
                test(totals)
            });
        } else {
            valueElem.textContent = value;
        }

        row.appendChild(labelElem);
        row.appendChild(valueElem);
        return row;
    }
    function test(dd){
        console.log(dd);
            // Create rows for product details
        addToCartPro.appendChild(createDetailRow("Product: ", carts.productName));
        addToCartPro.appendChild(createDetailRow("Price: ", dd));
        addToCartPro.appendChild(createDetailRow("Category: ", carts.categories));
        addToCartPro.appendChild(createDetailRow("Quantity: ", 1, true));
    }
    return test();
        
}




/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    producSide.classList.add("d-flex")
    productCart.style.width = "350px";
    document.getElementById("producSide").style.marginRight = "350px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeCart() {
    productCart.style.width = "0";
    document.getElementById("producSide").style.marginRight = "0";
    document.body.style.backgroundColor = "white";

    // addProCarts.push([]);
    // saveProductCart(addProCarts);
    // location.reload();
}


loadProduct()
// Call the function to display the products
showProducts();
