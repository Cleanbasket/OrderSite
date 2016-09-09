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

  checkTotalPrice: function(){
    var totalPrice = $(".total-price").data("total-price");

    if (totalPrice == undefined || totalPrice < 10000){
      alert("최소 주문 금액은 10,000원 입니다!");
    } else {
      order.setItemList();
    }
  },

  setItemList: function(){
    var items = $(".item-box"),
        totalNumber = $(".total-number").data("total-number"),
        totalPrice = $(".total-price").data("total-price");

    // 품목 총 개수, 품목 총 합계 금액, 선택한 품목 리스트 
    var itemData = {
      "totalNumber": totalNumber,
      "totalPrice": totalPrice,
      "itemList": []
    };

    for(var i = 0; i < items.length; i+=1){
      if($(items[i]).find(".qty").html() > 0){
        var categoryName = $(items[i]).parent().attr('id');
        var name = $(items[i]).find(".item-name").html();
        var qty = $(items[i]).find(".qty").html();
        var subtotalPrice = $(items[i]).find(".subtotal-price").html();

        itemData.itemList.push({"categoryName" : categoryName, "name": name, "qty": qty, "subtotalPrice": subtotalPrice})
      }
    }
    var session = window.sessionStorage,
        dataString = JSON.stringify(itemData);
    // console.log(dataString);

    // sessionStorage에 저장 
    session.setItem("cart", dataString);

    // 주문서 작성 페이지로 이동
    window.location.href = 'write.html';
  },

  // 함수 연결 
  attachEvents: function () {
    "use strict";

    // 동적으로 생성되는 elements에 이벤트 연결 
    $(document).on("click",".inc",order.increaseItem);
    $(document).on("click",".dec",order.decreaseItem);
    $(document).on("click",".cart-btn",order.checkTotalPrice);
  }
};

order.attachEvents();