document.getElementById('addProductForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const productName = document.querySelector('input[name="productName"]').value;
    const productPrice = document.querySelector('input[name="productPrice"]').value;
    const productCategory = document.querySelector('input[name="productCategory"]').value;

    try {
        const response = await fetch('/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productName, productPrice, productCategory })
        });

        if (response.ok) {
            const product = await response.json();
            addProductToTable(product); // Function to add product dynamically to the table
        }
    } catch (error) {
        console.error('Error adding product:', error);
    }
});

function addProductToTable(product) {
    const productTableBody = document.querySelector('tbody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    productTableBody.appendChild(row);
}
