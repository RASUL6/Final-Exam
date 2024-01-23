// restaurantApp.js

class User {
  constructor(name, login, email, password, allergensInfo, address) {
    this.name = name;
    this.login = login;
    this.email = email;
    this.password = password;
    this.allergensInfo = allergensInfo;
    this.address = address;
  }
}

class Product {
  constructor(image, description, price, category) {
    this.image = image;
    this.description = description;
    this.price = price;
    this.category = category;
  }
}

class Cart {
  constructor() {
    this.products = [];
    this.totalPrice = 0;
  }

  addToCart(product) {
    this.products.push(product);
    this.totalPrice += product.price;
  }

  clearCart() {
    this.products = [];
    this.totalPrice = 0;
  }
}

class Order {
  constructor() {
    this.products = [];
    this.totalPrice = 0;
    this.orderDate = new Date();
  }

  placeOrder(cart) {
    this.products = cart.products.slice();
    this.totalPrice = cart.totalPrice;
  }
}

class RestaurantApp {
  constructor() {
    this.catalog = [];
    this.cart = new Cart();
    this.orderHistory = [];
  }

  // Добавляем блюда в каталог
  populateCatalog() {
    const sushiRoll = new Product("sushi.jpg", "Sushi Roll", 10.99, "Sushi");
    const pizzaRoll = new Product("pizza.jpg", "Pizza Roll", 8.99, "Pizza");
    const burger = new Product("burger.jpg", "Burger", 12.99, "Burger");
    const pasta = new Product("pasta.jpg", "Pasta", 9.99, "Pasta");
    const salad = new Product("salad.jpg", "Salad", 7.99, "Salad");
    const curry = new Product("curry.jpg", "Curry", 11.99, "Curry");
    const steak = new Product("steak.jpg", "Steak", 15.99, "Steak");
    const sandwich = new Product("sandwich.jpg", "Sandwich", 6.99, "Sandwich");
    const iceCream = new Product("icecream.jpg", "Ice Cream", 4.99, "Dessert");
    const cake = new Product("cake.jpg", "Cake", 8.99, "Dessert");

    this.catalog = [sushiRoll, pizzaRoll, burger, pasta, salad, curry, steak, sandwich, iceCream, cake];
  }

  // Метод для отображения каталога на странице
  displayCatalog() {
    const catalogDiv = document.getElementById('catalog');
    catalogDiv.innerHTML = "<h2>Menu</h2>";

    this.catalog.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.description}" width="100">
        <p>${product.description} - $${product.price.toFixed(2)}</p>
        <button onclick="addToCart('${product.description}')">Add to Cart</button>
      `;
      catalogDiv.appendChild(productDiv);
    });
  }

  // Метод для добавления товаров в корзину
  addToCart(productDescription) {
    const selectedProduct = this.catalog.find(product => product.description === productDescription);
    this.cart.addToCart(selectedProduct);
    this.displayCart();
  }

  // Метод для отображения корзины на странице
  displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = "<h2>Shopping Cart</h2>";

    this.cart.products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.innerHTML = `
        <p>${product.description} - $${product.price.toFixed(2)}</p>
      `;
      cartDiv.appendChild(productDiv);
    });

    const totalPriceSpan = document.createElement('span');
    totalPriceSpan.innerText = this.cart.totalPrice.toFixed(2);
    document.getElementById('totalPrice').innerText = totalPriceSpan.innerText;

    const placeOrderButton = document.createElement('button');
    placeOrderButton.innerText = 'Place Order';
    placeOrderButton.onclick = () => this.placeOrder();
    cartDiv.appendChild(placeOrderButton);
  }

  // Метод для оформления заказа
  placeOrder() {
    const order = new Order();
    order.placeOrder(this.cart);
    this.orderHistory.push(order);
    this.cart.clearCart();
    this.displayOrderHistory();
    this.displayCart();
  }

  // Метод для отображения истории заказов на странице
  displayOrderHistory() {
    const orderHistoryDiv = document.getElementById('orderHistory');
    orderHistoryDiv.innerHTML = "<h2>Order History</h2>";

    this.orderHistory.forEach(order => {
      const orderDiv = document.createElement('div');
      orderDiv.innerHTML = `
        <p>Total Price: $${order.totalPrice.toFixed(2)}</p>
        <p>Order Date: ${order.orderDate.toLocaleString()}</p>
      `;
      orderHistoryDiv.appendChild(orderDiv);
    });
  }

  // Метод для регистрации пользователя
  registerUser(name, login, email, password, confirmPassword) {
    if (password === confirmPassword) {
      const user = new User(name, login, email, password, "", "");
      console.log("User registered:", user);
      return true;
    } else {
      console.log("Password does not match confirmation.");
      return false;
    }
  }
}

// Создаем экземпляр RestaurantApp
const restaurantApp = new RestaurantApp();
restaurantApp.populateCatalog();
restaurantApp.displayCatalog();
