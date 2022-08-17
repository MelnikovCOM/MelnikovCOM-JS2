const products = [
  { id: 1, title: "Notebook", price: 2000, img: "img/note.jpg" },
  { id: 2, title: "Mouse", price: 20, img: "img/mouse.jpg" },
  { id: 3, title: "Keyboard", price: 200, img: "img/keyboard.jpg" },
  { id: 4, title: "Camepad", price: 2000, img: "img/camepad.jpg" },
];

const renderProduct = (Object) => {
  return `<div class="product-item">
                 <img class="product-item_img" src="${Object.img}">
                 <h3 class="product-item_text">${Object.title}</h3>
                 <p class="product-item_price">${Object.price}</p>
                 <button class="buy-btn">Купить</button>
            </div>`;
};

const renderPage = (list) => {
  const productsList = list.map((item) => renderProduct(item));
  console.log(productsList);
  document.querySelector(".products").innerHTML = productsList.join("");
};

renderPage(products);
