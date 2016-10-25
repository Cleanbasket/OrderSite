$( document ).ready(function(){

    // 주문 내역 보여주기 
    showCartInfo();

    // 변경/추가 버튼 눌렀을 때  
    $(document).on("click",".cancel-btn",backBtn);

    // 주문접수 버튼 눌렀을 때 
    $(document).on("click",".order-btn",orderBtn);

    function showCartInfo() {
        var cartHtml = "",
            session = window.sessionStorage,
            cartData = JSON.parse(session.getItem('cart-db'));

        var cartItemList = $.map(cartData.cart, function(value) {
            return [value];
        });

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

    function orderBtn(e){
        e.preventDefault();
        
        var date_time_form = document.date_time_info,
            order_form = document.order_info,
            obj = new Object(),
            session = window.sessionStorage,
            cartData = JSON.parse(session.getItem('cart-db'));

        var cartItemList = $.map(cartData.cart, function(value) {
            return [value];
        });

        obj.pickup_date = date_time_form.pickup_date.value + " " + date_time_form.pickup_time.value;
        obj.dropoff_date = date_time_form.dropoff_date.value + " " + date_time_form.dropoff_time.value;
        
        obj.name = order_form.name.value; // form의 값을 오브젝트에 저장
        obj.phone = order_form.phone.value; // form의 값을 오브젝트에 저장
        obj.address = order_form.address.value; // form의 값을 오브젝트에 저장
        obj.addr_building = order_form.addr_building.value;

        obj.price = cartData.totalItemPrice;
        obj.item = cartItemList;
        
        // 이런식으로 object에 데이터 저장하면 됨! 

        var json_data = JSON.stringify(obj); // 오브젝트를 JSON형식으로 변환
        console.log("json_data : "  + json_data);

        // ajax post 
        // ajaxPostOrderData(json_data); 

        // 주문완료 페이지로 이동 
        window.location.href = 'complete.html';
    }

    function ajaxPostOrderData(json_data){
        $.ajax({                  
            type: "POST",
            url: "http://localhost:8080/wash/member/order/add",
            dataType: "json",
            data: json_data,
            success: function(resData) { 
              if (resData.constant == 1){ // 1 = Success 
                // TODO 
              }
            },
            error: function(){
                // TODO 
            }
        });
    }
});

