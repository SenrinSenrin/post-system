let orderData = [];

function loadOrderData() {
    if (JSON.parse(localStorage.getItem("orderData")) != null){
        orderData = JSON.parse(localStorage.getItem("orderData"));
        // console.log(orderData);  // For debugging purposes
    }
};

// Reference to the table body
const orderTableBody = document.getElementById('orderTableBody');

loadOrderData()
console.log(orderData); // For debugging purposes
console.log(orderTableBody); // For debugging purposes

// Dynamically populate the table
orderData.forEach((order, index) => {
    const row = `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${order.customerName}</td>
            <td>${order.productName}</td>
            <td>${order.selectedQuantity}</td>
            <td>${order.productCategory}</td>
            <td class="text-success">$${order.totalPrice}</td>
        </tr>
    `;
    orderTableBody.innerHTML += row;
});

