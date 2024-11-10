
let productData;
let addProCarts = [];

const containerRow = document.getElementById("productContainer");
let producSide = document.getElementById("producSide")
let productCart = document.getElementById("productChart")
const listCart = document.getElementById("list-group")

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


function addProToCart(product) {
    if (addProCarts.length === 0) {
        // If addProCarts is empty, add the product directly
        addProCarts.push(product);
        saveProduct(addProCarts);
        displayAddToCart();
        console.log("Product added:", product);
    } else {
        // Check if the product already exists in addProCarts
        const exists = addProCarts.some(item => item.id === product.id);
        
        if (!exists) {
            // If the product does not exist, add it to the cart
            addProCarts.push(product);
            saveProduct(addProCarts);
            displayAddToCart();
            location.reload();
            console.log("Product added:", product);
        } else {
            console.log("Product already in cart:", product);
        }
    }
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
        cardButton.className = "btn btn-primary alinge-item-end";
        cardButton.textContent = "Add to cart";
        cardButton.addEventListener("click",function(){
            openNav();
            addProToCart(product);
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

function displayAddToCart(){
    for (const cart of addProCarts){
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';   
        listItem.textContent = `${cart.productName} - $${cart.price} x ${cart.quantity}`;
        btnAddToCart = document.createElement('button')
        btnAddToCart.textContent = 'Remove'
        btnAddToCart.className = 'btn btn-sm btn-danger'
        listItem.appendChild(btnAddToCart)
        listItem.querySelector('button').addEventListener('click', function(){
            removeFromCart(cart)
        })
        listCart.appendChild(listItem)
    }
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    producSide.classList.add("d-flex")
    productCart.style.width = "350px";
    document.getElementById("producSide").style.marginRight = "350px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    // console.log("log code for");
    
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeCart() {
    productCart.style.width = "0";
    document.getElementById("producSide").style.marginRight = "0";
    document.body.style.backgroundColor = "white";

    addProCarts.push([]);
    saveProductCart(addProCarts);
    // location.reload();
}


loadProduct()
// Call the function to display the products
showProducts();
