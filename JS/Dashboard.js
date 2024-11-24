let orderData;
let productsData;
let categoriesData;
const today = new Date();
const day = today.getDate();         // Day of the month (1-31)
const month = today.getMonth() + 1; // Month (0-11, so +1 for 1-12)
const year = today.getFullYear();   // Full year (e.g., 2024)
const correntDate = year + '-' +month + '-' +day;

const totalProducts = document.getElementById('total-product')
const totalSale = document.getElementById('total-sales')
const saleTotalToday = document.getElementById('today-sale')
const categories = document.getElementById('categories')
let tbodyTodayOrdersTable = document.getElementById('sale-today')

let todaySale = 0;
let total_sale = 0;
let productInstock = 0;

function loadData() {
    if (JSON.parse(localStorage.getItem('products') != null)){
        productsData = JSON.parse(localStorage.getItem('products'))
    }

    if (JSON.parse(localStorage.getItem('categoryData') != null)){
        categoriesData = JSON.parse(localStorage.getItem('categoryData'))
    }

    if (JSON.parse(localStorage.getItem('orderData') != null)){
        orderData = JSON.parse(localStorage.getItem('orderData'))
    }
}


function tatals(){
    if (productsData){
        for (product of productsData){
            if (product.quantity > 0){
                productInstock += Number(product.quantity);
            }
            console.log(product.quantity);
            totalProducts.textContent = productInstock + " in stock";
        }
    }

    if (orderData){
        orderData.forEach((order, index) => {
            if (order.orderDate === correntDate) {
                todaySale += Number(order.totalPrice);
                saleTotalToday.textContent = '$' + todaySale;
                // Create a row for each order
                displayTodayOrders(order, index+1)
                console.log(todaySale+'sdasfsdf');
                // todayOrdersTable.innerHTML += row; // Append rows to the table
            }
            total_sale += Number(order.totalPrice); 
        });
        totalSale.textContent = "$" + total_sale;
    }
    categories.textContent = categoriesData.length
}

function displayTodayOrders(order, list) {
    let tr = document.createElement("tr");
    let tdList = document.createElement("td");
    let tdDate = document.createElement("td");
    let tdCustomer = document.createElement("td");
    let tdPrice = document.createElement("td");
    let tdStatus = document.createElement("td");
    let spanStatus = document.createElement("span");
    spanStatus.className = 'badge bg-success';
    
    tdList.textContent = list;
    tdDate.textContent = order.orderDate;
    tdCustomer.textContent = order.customerName;
    tdPrice.textContent = "$" + order.totalPrice;
    spanStatus.textContent = "Completed";
    tdStatus.appendChild(spanStatus);

    tr.appendChild(tdList);
    tr.appendChild(tdDate);
    tr.appendChild(tdCustomer);
    tr.appendChild(tdPrice);
    tr.appendChild(tdStatus);
    
    tbodyTodayOrdersTable.appendChild(tr);
}






loadData()
tatals()
displayTodayOrders();
console.log(productsData);
console.log(orderData);
console.log(categoriesData);
