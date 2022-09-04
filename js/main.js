const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
  el: "#app",
  data: {
    userSearch: "", /// свойство которое соответствует введенному значению в фильтре
    showCart: false, /// по умолчанию товары в корзинке не показываем
    catalogUrl: "/catalogData.json", /// путь к файлу с товарами каталога
    cartUrl: "/getBasket.json", /// путь к файлу с товарами корзины
    cartItems: [], /// массив товаров карзины
    filtered: [], /// массив товаров фильтра
    imgCart: "https://via.placeholder.com/50x100", /// картинка
    products: [], /// массив товаров каталога
    imgProduct: "https://via.placeholder.com/200x150", /// картинка
  },
  methods: {
    getJson(url) {
      return fetch(url) /// конект к ресурсу, после конект получаем промес
        .then((result) => result.json()) /// файл с товарами в корзине, преобразуем в объект ДжаваСкрипт и возвращаем промес
        .catch((error) => console.log(error));
    },
    addProduct(item) {
      this.getJson(`${API}/addToBasket.json`).then((data) => {
        if (data.result === 1) {
          let find = this.cartItems.find(
            (el) => el.id_product === item.id_product
          );
          if (find) {
            find.quantity++;
          } else {
            const prod = Object.assign({ quantity: 1 }, item); //создание нового объекта на основе двух, указанных в параметрах
            this.cartItems.push(prod);
          }
        }
      });
    },
    remove(item) {
      /// файл отвечат за доступ к возможности удаления товаров
      /// если result === 1, то можем удалить, если поставим ноль то нельзя
      this.getJson(`${API}/deleteFromBasket.json`).then((data) => {
        if (data.result === 1) {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            /// к массиву товара применяем splice (splice принпимает два параметра
            /// индекс с которго нужно элемент удалять и сколько удаляем элементов с этого индекса )
            this.cartItems.splice(this.cartItems.indexOf(item), 1);
          }
        }
      });
    },
    /// фильтруем массив продуктс, из него извлекаем элементы и то что он возвражает
    /// помещаем в массив filtered
    filter() {
      let regexp = new RegExp(this.userSearch, "i");
      this.filtered = this.products.filter((el) =>
        regexp.test(el.product_name)
      );
    },
  },

  /// монтирование запускается после дейта
  /// запускаем метод getJson, внем передаем адрес файла с карзины
  /// после data наш объект в корзинке
  mounted() {
    this.getJson(`${API + this.cartUrl}`).then((data) => {
      /// обходим товары козины
      for (let item of data.contents) {
        /// каждый товар помещаем в массив cartItems, наполняем cartItems товарами корзины
        this.cartItems.push(item);
      }
    });
    /// указываем внешний адрес с каталогом товара
    this.getJson(`${API + this.catalogUrl}`).then((data) => {
      for (let item of data) {
        /// заполняем наши массивы одинаковыми товарами (два массива для возможности фильтрации)
        this.$data.products.push(item); /// продукс взять именно из data
        this.$data.filtered.push(item); /// фильтр взять именно из data
      }
    });
    /// парсим локальный файл
    this.getJson(`getProducts.json`).then((data) => {
      for (let item of data) {
        this.products.push(item);
        this.filtered.push(item);
      }
    });
  },
});
