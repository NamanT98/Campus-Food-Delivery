let shop = document.getElementById("shop");
let count = document.getElementById("count");

let Basket = JSON.parse(localStorage.getItem("data")) || [];

let generateshop = () => {
  return (shop.innerHTML = shopdata
    .map((x) => {
      let { id, dish, amount, price, img } = x;
      return `
        <div class="card">
        <div class="elements">
            <div class="imageplaceholder">  
                <img class='dishimg' src="${img}"/>
            </div>
        </div>
        <div class="bottomcontent">
            <div class="content">
                <div class="contenttxt">
                    <div class="ratings">
                        <img src="static/assets/ratingrating-group.svg"/>
                        <img src="static/assets/ratingrating-group.svg"/>
                        <img src="static/assets/ratingrating-group.svg"/>
                        <img src="static/assets/ratingrating-group.svg"/>
                        <img src="static/assets/ratingrating-group.svg"/>
                    </div>
                    <span class="dish">${dish}</span>
                    <div class="price">
                        <span class="discount">₹ ${price}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <button id=${id} onclick="Addtocart(id)">Add to cart</button>
    </div>`;
    })
    .join(""));
};

generateshop();

let Addtocart = (id) => {
  let selecteditem = id;
  let search = Basket.find((x) => x.id === selecteditem);

  if (search === undefined) {
    Basket.push({ id: selecteditem, item: 1 });
  }

  localStorage.setItem("data", JSON.stringify(Basket));
  Updatecart();
};

let Updatecart = () => {
  return (count.innerHTML = `
    <span id="count" class="count">${Basket.length}</span>
    `);
};

Updatecart();
