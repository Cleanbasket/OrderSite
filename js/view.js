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
        _this.drawItem(categoryId);
      });

      // 카테고리 1 일 경우, 처리는 따로..
    this.drawItem(this.currentCategory);
  },

  drawItem: function(category) {
    // if (category == 1){

    // } else {

    // }
    var wrapper = $('.contents-container');
    var categoryName = storage.getMetaCategoryName(category);
    var viewItems = wrapper.find('#'+categoryName).find('.item-box');
    var items = storage.getMetaOrderItems(category);

    viewItems.html('');

    for (var itemId in items) {
      var item = items[itemId];
      var userItemData = storage.getCartItem(itemId);

      var viewItem = $("<li class= 'col s12'>");
      viewItem
        .html("<div class='item col'><div class='col s12'><div class='left item-name'>" + item.name + "</div><div class='right'>₩" + item.price + "</div></div></div><div class='qty-box col' data-price='" + item.name + "'><span class='dec left-set'>–</span><span class='qty center-set'>" + userItemData.qty + "</span><span class='inc right-set'>+</span><div class='subtotal-price' style='display: none'>0</div></div>")
        .data('itemId', itemId);

      var increaseQtyBtn = viewItem.find('.inc');
      var decreaseQtyBtn = viewItem.find('.dec');

      increaseQtyBtn.click(function() {
        var itemId = $(this).parents('li').data('itemId');
        app.increaseCartItem(itemId, category);
      });

      decreaseQtyBtn.click(function() {
        var itemId = $(this).parents('li').data('itemId');
        app.decreaseCartItem(itemId, category);
      });

      viewItems.append(viewItem);
      // app.swiperFunc();
    }
  },

  // update fields
  update: function() {

  }
};
