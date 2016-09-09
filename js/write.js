function showCartInfo() {
    var cartHtml = "",
        session = window.sessionStorage,
        cartData = JSON.parse(session.getItem('cart'));

    // console.log(data.itemList[0].name);
    for(var i = 0; i < cartData.itemList.length; i++){
    	cartHtml += "<tr><td>" + cartData.itemList[i].name + "</td><td>" + cartData.itemList[i].qty + "</td><td>₩" + cartData.itemList[i].subtotalPrice + "</td></tr>";
    }
    cartHtml += "<tr><td>합계</td><td>" + cartData.totalNumber + "</td><td>₩" + cartData.totalPrice + "</td></tr>";
    $('#show-cart').append(cartHtml);
}

function backBtn(){
	// 품목 선택 페이지로 이동
	window.location.href = 'index.html';
}

$(document).on("click",".cancel-btn",backBtn);
showCartInfo();