var view = {

  currentCategory: 1,

  // init
  init: function() { // 실행이 안됨 , 로직은 됨
    this.setCategory(); 
    this.update();
    this.initEvent();
  },

  initEvent: function() {
    // $('')
  },

  // view 가 아니므로 app.js로 뺄 예정 
  setCategory: function() {
    var _this = this;
    var wrapper = $('.main');
    var viewCategory = wrapper.find('.tab');

      // 카테고리 메뉴에서 클릭 시
      viewCategory.click(function() {
        var categoryId = parseInt($(this).data('category'));
        _this.drawItem(categoryId);
      });

      // 카테고리 1 일 경우, 처리는 따로.. 
    this.drawItem(this.currentCategory);
  },

  drawItem: function(category) {
    var wrapper = $('.contents-container');
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
        app.increaseCartItem(itemId, category);
      });
      // app end

      viewItems.append(viewItem);
    }
  },

  // update fields
  update: function() {

  }
};
