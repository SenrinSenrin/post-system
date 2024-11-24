let productData = [
    // {proId: 1,productName: "Product01", price: 12, quantity: 5, categories: "foods"},
    // {proId: 2,productName: "Product02", price: 13, quantity: 5, categories: "drinks"},
    // {proId: 3,productName: "Product03", price: 14, quantity: 5, categories: "energy"},
    // {proId: 4,productName: "Product04", price: 15, quantity: 5, categories: "equipment"},
];

let categoryData = [];

const cardContent = document.getElementById("row");
const addProductBtn = document.getElementById("addProBtn");
const titleModel = document.getElementById("exampleModalLabel")
const btnAddPro = document.getElementById("addPro")
const btnEditPro = document.getElementById("editPro")
const btnAdd = document.getElementById("addPro")
const addProBtn = document.getElementById("addBtn")
const productDetail = document.getElementById("productDetail")
const closeProDetailBtn = document.getElementById("closeProDetail").addEventListener("click", () => hideProductDetails());  // Correctly change the display style
const cateOptions = document.getElementById("proCategory")
// const productDetail = document.getElementById('productDetail');

console.log(addProductBtn);

// get product data from localStorage
function loadProduct(){
    if (JSON.parse(localStorage.getItem("products") != null)){
        productData = JSON.parse(localStorage.getItem("products"));
        // console.log(productData); 
    }

    if (JSON.parse(localStorage.getItem("categoryData") != null)){
        categoryData = JSON.parse(localStorage.getItem("categoryData"));
    }
}

// save product data to localStorage
function saveProduct(){
    localStorage.setItem("products", JSON.stringify(productData));
}

function addNewProduct() {
    // Retrieve input values
    const productName = document.getElementById('proName').value.trim();
    const price = document.getElementById('proPrice').value.trim();
    const quantity = document.getElementById('proQuantity').value.trim();
    const categories = document.getElementById('proCategory').value;

    // Validate if any field is empty
    if (!productName || !price || !quantity || !categories) {
        alert("Please fill out all fields before adding a new product.");
        return; // Stop the function if any field is empty
    }

    // Create new product object
    let newProduct = {
        proId: productData.length + 1,
        productName: productName,
        price: price,
        quantity: quantity,
        categories: categories,
    };

    // Add new product to the data array
    productData.push(newProduct);
    saveProduct();

    // Clear the form fields
    document.getElementById('proName').value = "";
    document.getElementById('proPrice').value = "";
    document.getElementById('proQuantity').value = "";
    document.getElementById('proCategory').value = "";

    // Reload and refresh
    location.reload();
    loadProduct();
    showCard();
}


function addNewPro() {
    btnAddPro.setAttribute("onclick", "addNewProduct()");
    addNewProduct();
}

function editProduct() {
    let id = localStorage.getItem('id');
    console.log(id);
    
    let product = productData.find(product => product.proId === parseInt(id));
    product.proId = Number(id);
    product.productName = `${document.getElementById('proName').value}`;
    product.price = `${document.getElementById('proPrice').value}`;
    product.quantity = `${document.getElementById('proQuantity').value}`;
    product.categories = `${document.getElementById('proCategory').value}`;

    saveProduct();
    location.reload();
    showCard();  
}

function deleteProduct(proId) {
    if (window.confirm('Are you sure you want to delete this product?')) {
        productData = productData.filter(product => product.proId!== proId);
        saveProduct();
        // Show the notification message
        location.reload();
        showCard();
        localStorage.setItem('isDeletePro', true);
        // Hide the notification after 3 seconds
    
    }
}

function editProductPopUp(proId) {
    getEachProduct(proId)
     
    titleModel.innerHTML = "<strong>Edit Product</strong>"; // Adds HTML styling
    // Toggle button visibility
    btnAddPro.style.display = "none";  // Hide the "Add" button
    btnEditPro.style.display = "block"; // Display the "Edit" button
    // console.log(titleModel);
    localStorage.setItem('id', proId)
}

function getEachProduct(productId) {
    for (const product of productData){
        if (product.proId === productId) {
            setProDataToForm(product)
            // console.log(product.proId, product);  
        }
    }
}

function setProDataToForm(product){
    document.getElementById('proName').value = product.productName;
    document.getElementById('proPrice').value = product.price;
    document.getElementById('proQuantity').value = product.quantity;
    document.getElementById('proCategory').value = product.categories;
}

function showCard() {
    // console.log(productData);
    for (const pro of productData) {
        const cardCol = document.createElement("div");
        cardCol.className = "col-md-3 mb-3"; // Each card takes up 1/4th width on medium and larger screens
    
        const cardContainer = document.createElement("div");
        cardContainer.className = "card h-100 p-2"; // Compact card with full height and padding
    
        // Product title
        const cardTitle = document.createElement("h6");
        cardTitle.addEventListener("click", ()=>showProductDetails(pro))
        cardTitle.className = "mb-1 text-dark"; // Small title with dark color
        cardTitle.textContent = pro.productName;
    
        // Product price
        const cardPrice = document.createElement("small");
        cardPrice.className = "text-muted"; // Smaller, muted price
        cardPrice.textContent = `$${pro.price}`;
    
        // Edit and Delete buttons container
        const buttonCol = document.createElement("div");
        buttonCol.className = "d-flex justify-content-end mt-2"; // Align buttons to the right with spacing

        const cardButtonDelete = document.createElement("button");
        cardButtonDelete.textContent = "Delete"; // Close icon (X)
        cardButtonDelete.className = "btn btn-danger btn-sm p-1 m-1 btnCard"; // Small button with minimal padding
        cardButtonDelete.addEventListener("click", () => deleteProduct(pro.proId));
    
        const cardButtonEdit = document.createElement("button");
        cardButtonEdit.textContent = "Edit"; // Edit icon (pencil)
        cardButtonEdit.className = "btn btn-primary btn-sm p-1 m-1 btnCard"; // Small button with minimal padding
        cardButtonEdit.addEventListener("click", () => editProductPopUp(pro.proId));
        cardButtonEdit.setAttribute("data-bs-toggle", "modal");
        cardButtonEdit.setAttribute("data-bs-target", "#exampleModal");
    
    
        buttonCol.appendChild(cardButtonDelete);
        buttonCol.appendChild(cardButtonEdit);
    
        // Append elements to the card container
        cardContainer.appendChild(cardTitle);
        cardContainer.appendChild(cardPrice);
        cardContainer.appendChild(buttonCol);
    
        // Add the card container to the column
        cardCol.appendChild(cardContainer);
    
        // Append the column to the main content container
        cardContent.appendChild(cardCol);
    }
         
    if (localStorage.getItem('isDeletePro') == 'true') {
        console.log(localStorage.getItem('isDeletePro'));
        
        deleteProSuccessMessage()
        localStorage.removeItem('isDeletePro');
    }  
    
}

function displayCategories(){
    console.log(categoryData);
    for (const category of categoryData){
        const option = document.createElement("option");
        option.textContent = category.name;
        option.value = category.name;

        cateOptions.appendChild(option);
    }
}

function deleteProSuccessMessage() {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
        
    setTimeout(() => { 
        notification.style.display = 'none';
    }, 3000); // 3000 milliseconds = 3 seconds
}

// Display product details when clicked
function showProductDetails(product) {

    if (product) {
        // Update product details content dynamically
        productDetailsContent.innerHTML = `
            <div class="cart-item mb-3">
                <div class="card-body d-flex justify-content-between align-items-center"> 
                    <span class="cart-item-name fw-bold text-primary">Product name</span>
                    <span class="cart-item-price text-success">${product.productName}</span>
                </div>
                <div class="card-body d-flex justify-content-between align-items-center"> 
                    <span class="cart-item-name fw-bold text-primary">Price</span>
                    <span class="cart-item-price text-success">$${product.price}</span>
                </div>
                <div class="card-body d-flex justify-content-between align-items-center"> 
                    <span class="cart-item-name fw-bold text-primary">Quantity</span>
                    <span class="cart-item-price text-success">${product.quantity}</span>
                </div>
                <div class="card-body d-flex justify-content-between align-items-center"> 
                    <span class="cart-item-name fw-bold text-primary">Categories</span>
                    <span class="cart-item-price text-success">${product.categories}</span>
                </div>
            </div>
        `;

        // Add the active class to start the grow animation
        productDetail.classList.add('active');
    }

}

function hideProductDetails() {

    // Remove the active class to reverse the grow animation
    productDetail.classList.remove('active');
}




addProBtn.addEventListener("click", (e) => {
    titleModel.innerHTML = "<strong>Add Product</strong>"; // Adds HTML stylingdi
    document.getElementById('proName').value = "";
    document.getElementById('proPrice').value = "";
    document.getElementById('proQuantity').value = "";
    document.getElementById('proCategory').value = "";
    // Toggle button visibility
    btnAddPro.style.display = "block";  // Hide the "Add" button
    btnEditPro.style.display = "none"; // Display the "Edit" button
})

loadProduct()
showCard();
displayCategories();



