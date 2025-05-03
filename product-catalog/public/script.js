document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const productsContainer = document.getElementById('products');
    
    loader.style.display = 'block';
    
    fetch('/api/products')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(products => {
            loader.style.display = 'none';
            productsContainer.innerHTML = products.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h3>${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p>${product.description}</p>
                </div>
            `).join('');
        })
        .catch(error => {
            loader.style.display = 'none';
            productsContainer.innerHTML = `
                <div class="error">
                    Failed to load products. Please try again later.
                </div>
            `;
            console.error('Error:', error);
        });
});