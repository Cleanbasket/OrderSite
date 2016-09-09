function showCartInfo() {
    var cartHtml = "",
        session = window.sessionStorage,
        data = JSON.parse(session.getItem('cart'));

    // console.log(data.itemList[0].name);
    for(var i = 0; i < data.itemList.length; i++){
    	cartHtml += "<tr><td>" + data.itemList[i].name + "</td><td>" + data.itemList[i].qty + "</td><td>₩" + data.itemList[i].subtotalPrice + "</td></tr>";
    }
    cartHtml += "<tr><td>합계</td><td>" + data.totalNumber + "</td><td>₩" + data.totalPrice + "</td></tr>";
    $('#show-cart').append(cartHtml);
}

function backBtn(){
	// 품목 선택 페이지로 이동
	window.location.href = 'index.html';
}

$(document).on("click",".cancel-btn",backBtn);
showCartInfo();