document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('addProductForm');
    const productTableBody = document.getElementById('productTableBody');

    // Fetch and display products on page load
    fetchProducts();

    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('productName').value;
        const price = document.getElementById('productPrice').value;
        const category = document.getElementById('productCategory').value;

        try {
            await fetch('/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, price, category })
            });
            document.getElementById('addProductForm').reset();
            fetchProducts(); // Refresh the product list
        } catch (err) {
            console.error('Error adding product:', err);
        }
    });

    async function fetchProducts() {
        try {
            const response = await fetch('/products');
            const products = await response.json();

            productTableBody.innerHTML = products.map(product => `
                <tr>
                    <td>${product._id}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.category}</td>
                    <td>
                        <button onclick="deleteProduct('${product._id}')">Delete</button>
                    </td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    }

    window.deleteProduct = async (id) => {
        try {
            await fetch(`/products/delete/${id}`, { method: 'DELETE' });
            fetchProducts(); // Refresh the product list
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };
});
