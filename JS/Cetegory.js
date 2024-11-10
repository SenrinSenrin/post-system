let categoryData = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing"},
    { id: 3, name: "Books"}
];

const ulCategory = document.getElementById("ul-category")
const titleModel = document.getElementById("cateTitlePopup")
const btnAddCate = document.getElementById("addBtnCate")
const addCateBtn = document.getElementById("addBtn")
const addBtnCate = document.getElementById("addCate")
const editCateBtn = document.getElementById("editCate")

function loadCategoryData(){
    if (JSON.parse(localStorage.getItem("categoryData")) != null){
        categoryData = JSON.parse(localStorage.getItem("categoryData"));
    }
}

function saveCategoryData(){
    localStorage.setItem("categoryData",JSON.stringify(categoryData));
}

function addCategory(){
    let newCategoryName = document.getElementById("cateName").value;
    
    if (newCategoryName.trim() === "") {
        alert("Please enter a valid category name");
        return;
    }
    let category = { 
        id: categoryData.length + 1, 
        name: newCategoryName
    }
    
    categoryData.push(category);
    saveCategoryData();

    document.getElementById("cateName").value = ''

    location.reload();
    loadCategoryData();
    showListCategories();
}

function addNewCate(){
    btnAddCate.setAttribute("click", "addCategory()");
    addCategory();
}

function editForm(id){
    // Populate the form with the selected category
    for (let i = 0; i < categoryData.length; i++) {
        if (categoryData[i].id === id) {
            document.getElementById('cateName').value = categoryData[i].name;
            break;
        }
    }
    titleModel.innerHTML = "<strong>Edit category</strong>"; // Adds HTML stylingdi
    // Toggle button visibility
    addBtnCate.style.display = "none";  // Hide the "Add" button
    editCateBtn.style.display = "block"; // Display the "Edit" button
}

function deletCate(id) {
    if (window.confirm('Are you sure you want to delete this product?')) {
        categoryData = categoryData.filter(category => category.id!== id);
        saveCategoryData();
        // Show the notification message
        location.reload();
        showListCategories();
        localStorage.setItem('isDeleteCate', true);
        // Hide the notification after 3 seconds
    
    }
}

function showListCategories(){
    let list = 1
    for (const category of categoryData)
    {
        // console.log(category);
        const listCate = document.createElement('li');
        listCate.className = 'list-group-item d-flex justify-content-between align-items-center';

        // Container for listItem and cateName aligned to the left
        const leftSection = document.createElement('div');
        leftSection.className = 'd-flex align-items-center';

        // List item element
        const listItem = document.createElement('strong');
        listItem.textContent = list;
        listItem.classList.add('me-5'); // Optional margin for spacing

        // Category name element
        const cateName = document.createElement('strong');
        cateName.textContent = category.name;

        // Append listItem and cateName to the left section div
        leftSection.appendChild(listItem);
        leftSection.appendChild(cateName);

        // Container for Edit and Delete buttons aligned to the right
        const buttonSection = document.createElement('div');

        const cardButtonDelete = document.createElement("button");
        cardButtonDelete.textContent = "Delete";
        cardButtonDelete.className = "btn btn-danger btn-sm";
        cardButtonDelete.addEventListener("click", () => deletCate(category.id));

        const cardButtonEdit = document.createElement("button");
        cardButtonEdit.textContent = "Edit";
        cardButtonEdit.className = "btn btn-primary btn-sm me-3";
        cardButtonEdit.addEventListener("click", () =>editForm(category.id));
        cardButtonEdit.setAttribute("data-bs-toggle", "modal");
        cardButtonEdit.setAttribute("data-bs-target", "#exampleModal");

        // Append buttons to buttonSection
        buttonSection.appendChild(cardButtonEdit);
        buttonSection.appendChild(cardButtonDelete);

        // Append leftSection and buttonSection to the list item
        listCate.appendChild(leftSection);
        listCate.appendChild(buttonSection);

        // Append list item to the list
        ulCategory.appendChild(listCate);

        list += 1
        
    }
    if (localStorage.getItem('isDeleteCate') == 'true'){
        deleteProSuccessMessage();
        localStorage.removeItem('isDeleteCate'); // Remove the flag after the notification is shown
    }

}

function deleteProSuccessMessage() {
    const notification = document.getElementById("notification")
    notification.style.display = 'block';
        
    setTimeout(() => { 
        notification.style.display = 'none';
    }, 3000); // 3000 milliseconds = 3 seconds
}

addCateBtn.addEventListener("click", (e) => {
    titleModel.innerHTML = "<strong>Add category</strong>"; // Adds HTML stylingdi
    document.getElementById('cateName').value = "";
    // Toggle button visibility
    addBtnCate.style.display = "block";  // Hide the "Add" button
    editCateBtn.style.display = "none"; // Display the "Edit" button
})

loadCategoryData()
showListCategories()
