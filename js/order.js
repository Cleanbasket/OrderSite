var order = {

  // quantity +
  increaseItem: function () {
    "use strict";

    var qtyCtr = $(this).prev(".qty"),
        quantity = parseInt(qtyCtr.html(), 10) + 1;

    order.updateItemSubtotal(this, quantity);
  },

  // quantity -
  decreaseItem: function () {
    "use strict";

    var qtyCtr = $(this).next(".qty"),
        num = parseInt(qtyCtr.html(), 10) - 1,
        quantity = num <= 0 ? 0 : num;

    order.updateItemSubtotal(this, quantity);
  },

  // 각 품목별 합계 금액
  updateItemSubtotal: function (context, quantity) {
    "use strict";

    var ctr = $(context).closest(".qty-box"),
        productQtyCtr = ctr.find(".qty"),
        productPrice = parseInt(ctr.data("price")),
        subtotalCtr = ctr.find(".subtotal-price"),
        subtotalPrice = quantity * productPrice;

    productQtyCtr.html(quantity);
    subtotalCtr.html(subtotalPrice);

    order.updateTotals();
  },

  // 장바구니 전체 품목 수와 전체 금액 계산 
  updateTotals: function () {
    "use strict";

    var products = $(".qty-box"),
        totalPrice = 0,
        totalNumber = 0;

    for (var i = 0; i < products.length; i += 1) {
      totalPrice += parseInt( $(products[i]).find(".subtotal-price").html() );
      totalNumber += parseInt( $(products[i]).find(".qty").html() );
    }

    $(".order-info").find(".total-price").html(totalPrice + "원");
    $(".order-info").find(".total-number").html(totalNumber + "개");
  },

  // 함수 연결 
  attachEvents: function () {
    "use strict";

    // 동적으로 생성된 elements라서 이벤트 적용이 안됨 
    // $(".inc").on("click", order.increaseItem);
    // $(".dec").on("click", order.decreaseItem);

    // 동적으로 생성되는 elements에 이벤트를 적용하는 방법 
    $(document).on("click",".inc",order.increaseItem);
    $(document).on("click",".dec",order.decreaseItem);
  }
};

order.attachEvents();