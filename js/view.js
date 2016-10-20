var view = {

  currentCategory: 1,

  // init
  init: function() {
    this.drawLaundryQty();
    this.setCategory(); 
    this.drawCartInfo();
    this.initEvent();
  },

  initEvent: function() {
    $('ul.tabs').tabs(); // 품목 선택 탭 
  },

  drawLaundryQty: function(){
    // 생활 물빨래 탭 item quantity box 정렬하기
    var laundryQtyTop = $('.nav-top').height() + $('.tab-menu').height();
    laundryQtyTop += ($('.laundry-img').height()/2.7);
    $('#laundry .item-box-container').css('top',  laundryQtyTop + 'px');
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
        // _this.drawItem(categoryId);
        app.changeCategory(categoryId);
        _this.drawItem(_this.currentCategory);
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
        var userItemQty = storage.getCartItemQty(itemId);

        var viewItem = $("<div class='item-box'>");
        viewItem
          .html("<div class='laundry-qty qty-box col s3'><span class='dec left-set'>–</span><span class='qty center-set'>" + userItemQty + "</span><span class='inc right-set'>+</span></div><div class='item-price col s12'><br>₩" + item.price + "/수거가방</div>")
          .data('itemId', itemId);

        viewItems.append(viewItem);
      }
    } else {
      for (var itemId in items) {
        var item = items[itemId];
        var userItemQty = storage.getCartItemQty(itemId);

        var viewItem = $("<li class='item-box col s12'>");
        viewItem
          .html("<div class='item col'><div class='col s12'><div class='left'>" + item.name + "</div><div class='right'>₩" + item.price + "</div></div></div><div class='qty-box col'><span class='dec left-set'>–</span><span class='qty center-set'>" + userItemQty + "</span><span class='inc right-set'>+</span></div>")
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

  // update cart-info
  drawCartInfo: function() {
    var wrapper = $('.cart-info');
    var userCart = storage.getDatas();

    wrapper.find('.total-number').html(userCart.totalItemQty + "개");
    wrapper.find('.total-price').html(userCart.totalItemPrice + "원");
  }
};
