let Basket = JSON.parse(localStorage.getItem("data")) || [];

let ShoppingCart = document.getElementById("shopping-cart");

let label = document.getElementById("label");

let generateCartItems = () => {
  if (Basket.length !== 0) {
    return (ShoppingCart.innerHTML = Basket.map((x) => {
      let { id, item } = x;
      let search = shopdata.find((y) => Number(y.id) === Number(id)) || [];
      return `
        <div class="cart-item">
          <img width="100" src=${search.img} alt="" />
          <div class="details">
  
            <div class="title-price-x">
                <h4 class="title-price">
                  <p>${search.dish}</p>
                  <p class="cart-item-price">₹ ${search.price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
  
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
  
            <h3>₹ ${item * search.price}</h3>
          </div>
        </div>
        `;
    }).join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="store">
              <button class="HomeBtn">Shop</button>
            </a>
            `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = document.getElementById(id);
  let search = Basket.find((x) => Number(x.id) === Number(selectedItem.id));
  if (search === undefined) {
    Basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(Basket));
};

let decrement = (id) => {
  let selectedItem = document.getElementById(id);
  let search = Basket.find((x) => Number(x.id) === Number(selectedItem.id));

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  Basket = Basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(Basket));
};

let update = (id) => {
  let search = Basket.find((x) => Number(x.id) === Number(id));
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = document.getElementById(id);
  // console.log(selectedItem.id);
  Basket = Basket.filter((x) => Number(x.id) !== Number(selectedItem.id));
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(Basket));
};

let clearCart = () => {
  Basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(Basket));
};

let TotalAmount = () => {
  if (Basket.length !== 0) {
    let amount = Basket.map((x) => {
      let { item, id } = x;
      let search = shopdata.find((y) => Number(y.id) === Number(id)) || [];

      return item * search.price;
    }).reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
      <h2>Total Bill :₹${amount}</h2>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
  } else return;
};

TotalAmount();
