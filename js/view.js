var view = {

  currentCategory: 1,

  // init
  init: function() { // 실행이 안됨 , 로직은 됨
    this.draw(); 
    this.update();
    this.initEvent();
  },

  initEvent: function() {
    // $('')
  },

  // draw html
  draw: function() {
    var _this = this;

    var wrapper = $('.main');
    var viewCategories = wrapper.find('.view-categories');

    var categories = storage.getMetaCategories();
    for (var categoryId in categories) {
      var category = categories[categoryId]; // { "name": "라운더리" }

      var viewCategory = $('<li>');
      viewCategory
        .html(category.name)
        .data('category', categoryId);

      viewCategory.click(function() {
        var categoryId = parseInt($(this).data('category')) + 1;
        
        console.log(categoryId);

        _this.drawItem(categoryId);
      });

      viewCategories.append(viewCategory);
    }

    this.drawItem(this.currentCategory);
  },

  drawItem: function(category) {
    var wrapper = $('.main');
    var items = storage.getMetaOrderItems(category);
    var viewItems = wrapper.find('.view-items');

    viewItems.html('');

    for (var itemId in items) {
      var item = items[itemId];
      // { name: '와이셔츠', price: 1000, category: 'category-1' }

      var userItemData = storage.getCartItem(itemId);
      // { qty : 1}

      var viewItem = $('<li>');
      viewItem
        .html(item.name + " qty: " + userItemData.qty)
        .data('itemId', itemId);

     // app
      viewItem.click(function() {
        var itemId = $(this).data('itemId');

        storage.increaseCartItem(itemId);
        view.drawItem(category);
      });
      // app end

      viewItems.append(viewItem);
    }
  },

  // update fields
  update: function() {

  }
};
