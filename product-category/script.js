let currentPage = 1;
const productsPerPage = 4; // Display 4 products per page

let products = []; // Array to store product data

// Fetch product data from product.json
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data; // Store product data in the products array
    renderProducts(); // Render the products on the page
  })
  .catch(error => console.error('Error loading product data:', error));



function renderProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToDisplay = products.slice(startIndex, endIndex);

    const tableBody = document.getElementById('product-rows-container');
    tableBody.innerHTML = ''; // Clear only the product rows

    productsToDisplay.forEach(product => {
        const productRow = document.createElement('div');
        productRow.classList.add('product-row');
        productRow.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-name">
                <p>${product.name}</p>
            </div>
            <div class="product-price">
                <p>${product.price}</p>
            </div>
            <div class="product-description">
                <p>${product.description}</p>
            </div>
        `;
        tableBody.appendChild(productRow);
    });

    updatePageNumber();
}

// Function to update the page number
function updatePageNumber() {
  document.querySelector('.page-number-span').textContent = currentPage;
}

// Handle 'Previous' button click
function handlePreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    renderProducts();
  }
}

// Handle 'Next' button click
function handleNextPage() {
  const totalPages = Math.ceil(products.length / productsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderProducts();
  }
}
