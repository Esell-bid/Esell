document.addEventListener('DOMContentLoaded', () => {
  const loggedInUserEmail = localStorage.getItem("userEmail"); // Replace with the logged-in user's email
  fetchProductDataForUser(loggedInUserEmail);
});

function fetchProductDataForUser(email) {
  fetch(`http://localhost:8080/products/${email}`)
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product) => {
        // console.log(product);
        const productCard = createProductCard(product);
        addProductToDashboard(productCard);
      });
    })
    .catch((error) => {
      console.error('Error fetching product data:', error);
    });
}

function createProductCard(product) {
  
  const card = document.createElement('div');
  card.classList.add('card');

  const images = document.createElement('img');
  images.classList.add('images');
  images.src = product.images[0];

  const name = document.createElement('h2');
  name.textContent = ` ${product.name}`;

  const description = document.createElement('p');
  description.textContent = ` ${product.description}`;

  const price = document.createElement('p');
  price.classList.add('price');
  price.textContent = `Price: ${product.price}`;

  card.appendChild(images);
  card.appendChild(name);
  card.appendChild(description);
  card.appendChild(price);

  return card;

}

function addProductToDashboard(productCard) {
  const dashboard = document.getElementById('dashboard');
  dashboard.appendChild(productCard);
}
