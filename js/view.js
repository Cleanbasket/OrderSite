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
    var categories = storage.getMetaCategories();

      // 카테고리 메뉴에서 클릭 시
      viewCategory.click(function() {
        var categoryId = parseInt($(this).data('category'));
        _this.drawSelectedCategory(categoryId);
      });

      // 디폴트는 카테고리1 
    this.drawItem(this.currentCategory);
  },


  drawItem: function(category) {
    var wrapper = $('.contents-container');
    var categoryName = storage.getMetaCategoryName(category);
    var viewItems = wrapper.find('#'+categoryName).find('.item-box-container');
    var items = storage.getMetaOrderItems(category);

    viewItems.html('');

    if(category === 1){
      for (var itemId in items) {
        var item = items[itemId];
        var userItemData = storage.getCartItem(itemId);

        var viewItem = $("<div class='item-box'>");
        viewItem
          .html("<div class='laundry-qty qty-box col s3' data-price='" + item.price + "'><span class='dec left-set'>–</span><span class='qty center-set'>" + userItemData.qty + "</span><span class='inc right-set'>+</span><div class='item-name' style='display: none'>" + item.name + "</div><div class='subtotal-price' style='display: none'>0</div></div><div class='item-price col s12'><br>₩" + item.price + "/수거가방</div>")
          .data('itemId', itemId);

        viewItems.append(viewItem);
      }
    } else {
      for (var itemId in items) {
        var item = items[itemId];
        var userItemData = storage.getCartItem(itemId);

        var viewItem = $("<li class='item-box col s12'>");
        viewItem
          .html("<div class='item col'><div class='col s12'><div class='left item-name'>" + item.name + "</div><div class='right'>₩" + item.price + "</div></div></div><div class='qty-box col' data-price='" + item.price + "'><span class='dec left-set'>–</span><span class='qty center-set'>" + userItemData.qty + "</span><span class='inc right-set'>+</span><div class='subtotal-price' style='display: none'>0</div></div>")
          .data('itemId', itemId);

        viewItems.append(viewItem);
      }
    }

    // viewItem.find('.inc').click(function() {
    $('.inc').click(function() {
      var itemId = $(this).parents('.item-box').data('itemId');
      app.increaseCartItem(itemId, category);
    });

    // viewItem.find('.dec').click(function() {
    $('.dec').click(function() {
      var itemId = $(this).parents('.item-box').data('itemId');
      app.decreaseCartItem(itemId, category);
    });

  },

  // update fields
  update: function() {

  }
};
