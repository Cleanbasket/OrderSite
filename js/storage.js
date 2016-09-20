var storage = {
  init: function(){
    this.getMeta();
    this.load();
  },

  /* this.datas.cart를 리턴하는 함수 */
  getAllCartItem: function() {
    return this.datas.cart;
  },

  /* get cart item */
  getCartItem: function(itemId) {
    var cartItem;

    if (this.datas.cart[itemId] !== undefined) {
      cartItem = this.datas.cart[itemId];
    } else {
      cartItem = {
        qty: 0
      };
    }

    return cartItem;
  },

  /* set qty, and save */
  setCartItem: function(itemId, qty) {
    if (this.datas.cart[itemId] !== undefined) {
      this.datas.cart[itemId].qty = qty;
    } else {
      this.datas.cart[itemId] = {
        qty: qty
      };
    }

    this.save();
  },

  /* increase qty */
  increaseCartItem: function(itemId) {
    if (this.datas.cart[itemId] !== undefined) {
      this.datas.cart[itemId].qty++;
    } else {
      this.datas.cart[itemId] = {
        qty: 1
      };
    }

    this.save();
  },

  /* decrease qty */
  decreaseCartItem: function(itemId) {
    if (this.datas.cart[itemId] !== undefined) {
      var qty = this.datas.cart[itemId].qty - 1;

      this.datas.cart[itemId].qty = Math.max(0, qty);
    }

    this.save();
  },

  /* sessionStorage의 'cart-db' 데이터를 가져와(getItem) this.datas에 적용하는 함수 */
  load: function() {
    var savedData = JSON.parse(sessionStorage.getItem('cart-db'));

    if (savedData === null) {
      this.datas = {
        cart: { }
      };
    } else {
      this.datas = savedData;
    }
  },

  /* this.datas에 있는 데이터를 sessionStorage의 'cart-db'에 저장하는(setItem) 함수 */
  save: function() {
    var datas = JSON.stringify(this.datas);
    sessionStorage.setItem('cart-db', datas);
  },

  /* ajax로 this.meta 데이터를 초기 세팅하는 함수 */
  getMeta: function(){
    if(this.meta === null){
      $.ajax({                  
          type: "GET",
          url: "http://localhost:8080/wash/item",
          dataType: "json",
          success: function(resData) { 
            if (resData.constant == 1){ // 1 = Success 
              this.meta = $.parseJSON(resData.data);
            }
          }
      });
    }
  },

  /* this.meta의 'categories'를 리턴하는 함수 */
  getMetaCategories: function() {
    return this.meta.categories;
  },

  /* this.meta의 'orderItems'를 가져온 후, 해당 'category'에 있는 품목들을 리턴하는 함수 */
  getMetaOrderItems: function(category) {
    var result_items = {};

    for (var itemId in this.meta.orderItems) {
      var item = this.meta.orderItems[itemId];

      if (item.category === category) {
        result_items[itemId] = item;
      }
    }

    return result_items;
  },

  /* meta datas */
  meta: null,

  /* user db */
  datas: null
};

storage.init();