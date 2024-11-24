
let productData;
let orderData = [];
const today = new Date();
const day = today.getDate();         // Day of the month (1-31)
const month = today.getMonth() + 1; // Month (0-11, so +1 for 1-12)
const year = today.getFullYear();   // Full year (e.g., 2024)
const orderDate = year + '-' +month + '-' +day;

const containerRow = document.getElementById("productContainer");
let producSide = document.getElementById("producSide")
let productCart = document.getElementById("productChart")
const addToCartPro = document.getElementById("addtoCart")
const buttonsAddCart = document.querySelectorAll('.bntAddCart');
const buttonCheckIn = document.getElementById("btnChecking")
const productNameCheck = document.getElementById('productNameCheck');
const productPriceCheck = document.getElementById('productPriceCheck');
const productCateCheck = document.getElementById('productCateCheck');
const productQtnCheck = document.getElementById('productQtnCheck');
const payBtn = document.getElementById('payBtn');
const customer = document.getElementById('customer');

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

    if (JSON.parse(localStorage.getItem("orderData")!= null)){
        orderData = JSON.parse(localStorage.getItem("orderData"));
        // console.log(orderData);  // For debugging purposes
    }
}

function saveProduct(data){
    localStorage.setItem("products", JSON.stringify(data));
}

function saveOrderData(data){
    localStorage.setItem("orderData", JSON.stringify(data));
}

function showProducts() {
    containerRow.innerHTML = ""; // Clear the container before adding new cards

    for (const product of productData) {
       if (product.quantity > 0){
         // Create the card div
         const containercard = document.createElement("div");
         containercard.className = "col-sm-6 mb-4";
         containercard.style.margin = "0";
 
         const card = document.createElement("div");
        //  card.className = "card";
         card.style.margin = "0";
 
         // Create card body
         const cardBody = document.createElement("div");
         cardBody.className = "card-body bg-light";
 
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
         const spanbtn = document.createElement("span");
         spanbtn.className = "d-flex justify-content-end";
         const cardButton = document.createElement("a");
         spanbtn.appendChild(cardButton);
         cardButton.className = "btn btn-primary alinge-item-end bntAddCart";
         cardButton.textContent = "Buy now";
         cardButton.addEventListener("click",function(){
             openNav();
             // addProToCart(product);
             displayAddToCart(product);
         });
 
         // Append title, text, and button to the card body
         cardBody.appendChild(cardTitle);
         cardBody.appendChild(cardText);
         cardBody.appendChild(spanbtn);
 
         // Append card body to the card
         card.appendChild(cardBody);
 
         // Append card to the container
         containercard.appendChild(card);
         containerRow.appendChild(containercard);
       }
    }
}
// Initialize addProCarts if it's not already defined
function displayAddToCart(carts) {
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productCate = document.getElementById('productCate');
    const productQtn = document.getElementById('productQtn');
    const numberQtnIncreast = document.getElementById('numberQtn');
    // const buttonCheckIn = document.getElementById('buttonCheckIn'); // Ensure this exists in your HTML

    // Set input attributes to limit user interaction
    numberQtnIncreast.setAttribute('min', 1);
    numberQtnIncreast.setAttribute('max', carts.quantity);
    numberQtnIncreast.value = 1;

    let selectedQtn = 1; // Variable to track the selected quantity

    // Dynamically update product details
    productName.textContent = carts.productName;
    productCate.textContent = carts.categories;
    productQtn.textContent = `${carts.quantity - 1} in stock`; // Initial quantity display
    productPrice.textContent = carts.price; // Initial price display

    // Add event listener to restrict input and update dynamically
    numberQtnIncreast.addEventListener('input', function () {
        let value = parseInt(this.value, 10);

        // Ensure value stays within range
        if (isNaN(value) || value < 1) {
            this.value = 1; // Minimum value
            value = 1;
        } else if (value > carts.quantity) {
            this.value = carts.quantity; // Maximum value
            value = carts.quantity;
        }

        selectedQtn = value; // Update the selected quantity
        update(value);
    });

    function update(value) {
        productQtn.textContent = `${carts.quantity - value} in stock`; // Remaining quantity
        productPrice.textContent = (carts.price * value).toFixed(2); // Total price for selected quantity
    }

    // Add event listener to the button
    buttonCheckIn.addEventListener("click", function () {
        // Use the updated `selectedQtn` value
        getDataCheckIn(
            carts.proId,
            productName.textContent,
            productCate.textContent,
            selectedQtn, // Pass the selected quantity here
            (carts.price * selectedQtn).toFixed(2) // Calculate total price dynamically
        );
        closeCart();
    });
}

function getDataCheckIn(productId, productName, productCate, productQtn, productPrice) {
    // Display product details for confirmation
    productNameCheck.textContent = productName;
    productPriceCheck.textContent = '$'+productPrice;
    productCateCheck.textContent = productCate;
    productQtnCheck.textContent = productQtn;

    // Handle "Pay" button click
    payBtn.addEventListener("click", function () {
        // Find the product in productData
        let product = productData.find(product => product.proId === parseInt(productId));

        if (product) {
            // Update product details (reduce stock)
            product.quantity -= parseInt(productQtn, 10);

            // Log updated product data
            console.log("Updated Product:", product);
        }

        // Create order object
        let order = {
            customerName: customer.value.trim(),
            productId: parseInt(productId, 10),
            productName: productName,
            productCategory: productCate,
            selectedQuantity: parseInt(productQtn, 10),
            totalPrice: parseFloat(productPrice),
            orderDate: orderDate
        };

        // Log order details
        console.log("Order Details:", order);

        // Save order to orderData
        orderData.push(order);

        // Update and save product data
        saveProduct(productData);

        // Save order data
        saveOrderData(orderData);

        // Redirect user to Sele.html
        location.href = "../Pages/Sele.html";
    });
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
