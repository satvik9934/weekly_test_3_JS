const Products = [
    { id: 1, name: "Product-1", price: 900 },
    { id: 2, name: "Product-2", price: 800 },
    { id: 3, name: "Product-3", price: 700 },
    { id: 4, name: "Product-4", price: 600 },
    // { id: 4, name: "Product-5", price: 600 },
    // { id: 4, name: "Product-6", price: 500 },
  ];

console.log(Products);
  
  function createProductElement(product) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product1");
    productDiv.innerHTML = `
        <h5 class="productName">${product.name}</h5>
        <h5 class="productPrice">${product.price}</h5>
        <div class="quantity"  id="${product.name}">
          <button class="remove">-</button>
          <h6 class="quantProduct">0</h6>
          <button class="add">+</button>
        </div>
      `;
  
    const addButton = productDiv.querySelector(".add");
    const removeButton = productDiv.querySelector(".remove");
    const quantityDisplay = productDiv.querySelector(".quantProduct");
  
    addButton.addEventListener("click", () => {
      const currentQuantity = parseInt(quantityDisplay.textContent, 10);
      quantityDisplay.textContent = currentQuantity + 1;
      updateCart();
    });
  
    removeButton.addEventListener("click", () => {
      const currentQuantity = parseInt(quantityDisplay.textContent, 10);
      if (currentQuantity > 0) {
        quantityDisplay.textContent = currentQuantity - 1;
        updateCart();
      }
    });
  
    return productDiv;
  }
  
  function updateCart() {
    const cart = document.getElementById("cart");
    const totalAmount = document.getElementById("totalAmount");
    cart.innerHTML = "";
  
    let totalPrice = 0;
  
    Products.forEach((product) => {
      const quantity = parseInt(
        document.querySelector(`.product1 #${product.name} .quantProduct`).textContent,10
      );
      if (quantity > 0) {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <h5 class="productCartName">${product.name}</h5>
            <div class="content">
              <h5 class="quantCartProduct">${quantity}</h5>
              <h5>*</h5>
              <h5 class="productCartPrice">${product.price}</h5>
            </div>
          `;
  
        cart.appendChild(cartItem);
        totalPrice += quantity * product.price;
      }
    });
  
    if (cart.children.length === 0) {
      cart.innerHTML = "<p>No Product added</p>";
      totalAmount.textContent = "INR 0";
    } else {
      totalAmount.textContent = `INR ${totalPrice}`;
    }
  }
  
  const productList = document.getElementById("product-list");
  Products.forEach((product) => {
    productList.appendChild(createProductElement(product));
  });
  
  updateCart();
