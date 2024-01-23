// main.js
document.addEventListener('DOMContentLoaded', function () {
  const app = new App();

  app.displayCatalog();

  window.addToCart = function (productId) {
    const selectedProduct = app.catalog.find(product => product.description === productId);
    app.addToCart(selectedProduct);
    app.displayCart();
  };

  window.placeOrder = function () {
    app.placeOrder();
    app.displayOrderHistory();
    app.displayCart();
  };

  window.registerUser = function () {
    const name = document.getElementById('name').value;
    const login = document.getElementById('login').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (app.registerUser(name, login, email, password, confirmPassword)) {
      window.location.href = "menu.html";
    }
  };
});
