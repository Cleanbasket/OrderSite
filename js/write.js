function showCartInfo() {
    var cartHtml = "",
        session = window.sessionStorage,
        cartData = JSON.parse(session.getItem('cart-db'));

    var cartItemList = $.map(cartData.cart, function(value) {
        return [value];
    });

    // console.log(data.itemList[0].name);
    for(var i = 0; i < cartItemList.length; i++){
        var subTotalPrice = cartItemList[i].qty * cartItemList[i].price;
    	cartHtml += "<tr><td>" + cartItemList[i].name + "</td><td>" + cartItemList[i].qty + "</td><td>₩" + subTotalPrice + "</td></tr>";
    }
    cartHtml += "<tr><td>합계</td><td>" + cartData.totalItemQty + "</td><td>₩" + cartData.totalItemPrice + "</td></tr>";
    $('#show-cart').append(cartHtml);
}

function backBtn(){
	// 품목 선택 페이지로 이동
	window.location.href = 'index.html';
}

$(document).on("click",".cancel-btn",backBtn);
showCartInfo();

