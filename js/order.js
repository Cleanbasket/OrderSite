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
 
    $(".order-info").find(".total-price").data("total-price", totalPrice);
    $(".order-info").find(".total-number").data("total-number", totalNumber);
    $(".order-info").find(".total-price").html(totalPrice + "원");
    $(".order-info").find(".total-number").html(totalNumber + "개");
  },

  setItemList: function(){
    var products = $(".qty-box"),
        items = $(".item"),
        totalNumber = $(".total-number").data("total-number"),
        totalPrice = $(".total-price").data("total-price");


    // 1. 품목이 하나도 없을 경우
    // 2. 합계금액이 10000원 미만일 경우

    
    // 품목 총 개수, 품목 총 합계 금액, 선택한 품목 리스트 
    var itemData = {
      "totalNumber": totalNumber,
      "totalPrice": totalPrice,
      "itemList": []
    };

    for(var i = 0; i < products.length; i+=1){
      if($(products[i]).find(".qty").html() > 0){
        // itemData.itemList[totalNumber]
      }
    }
    var session = window.sessionStorage,
        dataString = JSON.stringify(itemData);
    console.log(dataString);

    // sessionStorage에 저장 
    session.setItem("cart", dataString);
  },

  // 함수 연결 
  attachEvents: function () {
    "use strict";

    // 동적으로 생성되는 elements에 이벤트 연결 
    $(document).on("click",".inc",order.increaseItem);
    $(document).on("click",".dec",order.decreaseItem);
    $(document).on("click",".cart-btn",order.setItemList);
  }
};

order.attachEvents();