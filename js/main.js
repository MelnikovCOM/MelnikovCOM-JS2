class ProductList {
  constructor(container = ".products") {
    this.container = container;
    this.goods = [];
    this._fetchProducts(); //рекомендация, чтобы метод был вызван в текущем классе
    this.render(); //вывод товаров на страницу
  }

  allCost = 0;

  getAllCost() {
    this.goods.forEach((product) => {
      this.allCost += product.price;
    });
    return this.allCost;
  }

  _fetchProducts() {
    this.goods = [
      { id: 1, title: "Notebook", price: 2000, img: "img/note.jpg" },
      { id: 2, title: "Mouse", price: 20, img: "img/mouse.jpg" },
      { id: 3, title: "Keyboard", price: 200, img: "img/keyboard.jpg" },
      { id: 4, title: "Camepad", price: 2000, img: "img/camepad.jpg" },
    ];
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new ProductItem(product);
      block.insertAdjacentHTML("beforeend", item.render());
      //              block.innerHTML += item.render();
    }
  }
}

class ProductItem {
  constructor(product) {
    this.title = product.title;
    this.id = product.id;
    this.price = product.price;
    this.img = product.img;
  }
  render() {
    return `<div class="product-item">
              <img class="product-item_img" src="${this.img}">
              <h3 class="product-item_text">${this.title}</h3>
              <p class="product-item_price">${this.price}</p>
              <button class="buy-btn">Купить</button>
           </div>`;
  }
}

class Client {}

class Cart {
  constructor(products) {
    this.products = [];
  }

  //добавить в корзину
  addToCart() {}

  // удалить из козины
  deleteFromCart() {}

  // получить список товаров
  getListProducts() {}

  // получить продукт по id
  getListProductById(id) {
    console.log(id);
  }
}

let list = new ProductList();
console.log(list.getAllCost());
