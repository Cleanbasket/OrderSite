$( document ).ready(function(){

    // 수거 및 배달 날짜 세팅 
    setToday();
    $(document).on("change","#pickup_date",changePickupDate);
    $(document).on("change","#pickup_time",setDropoffTime);
    $(document).on("change","#dropoff_date",setDropoffTime);

    // 주문 내역 보여주기 
    showCartInfo();
    
    // 변경/추가 버튼 눌렀을 때  
    $(document).on("click",".cancel-btn",backBtn);

    // 주문접수 버튼 눌렀을 때 
    $(document).on("click",".order-btn",orderBtn);

});

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

function setToday(){
    var today = new Date();
    setDatePicker(today);
}

function changePickupDate(){
    var changeVal = $('#pickup_date').val();
    var changeDate = new Date(changeVal);
    setDatePicker(changeDate);
}

function setDatePicker(pickup_date){
    var pickup_minDate = new Date(),
        pickup_maxDate = new Date(),
        dropoff_minDate = new Date(),
        dropoff_maxDate = new Date();

        pickup_maxDate.setDate(pickup_minDate.getDate() + 8); // 최대 수거 날짜 
        dropoff_minDate.setDate(pickup_date.getDate() + 2); // 최소 배달 날짜

    var friday = 5,
        saturday = 6,
        sunday = 0;

    // 최소 수거 날짜가 '금,토,일'일 경우 
    if(pickup_date.getDay() == friday || pickup_date.getDay() == saturday || pickup_date.getDay() == sunday){
        dropoff_minDate.setDate(pickup_date.getDate() + 3); // 최소 배달 날짜 
    }

    dropoff_maxDate.setDate(dropoff_minDate.getDate() + 8); // 최대 배달 날짜 

    // 화면에 출력 
    $('#pickup_date')
        .val(pickup_date.toDateInputValue())
        .attr({
            'min': pickup_minDate.toDateInputValue(),
            'max': pickup_maxDate.toDateInputValue()
        });

    $('#dropoff_date')
        .val(dropoff_minDate.toDateInputValue())
        .data('minDate', dropoff_minDate)
        .attr({
            'min': dropoff_minDate.toDateInputValue(),
            'max': dropoff_maxDate.toDateInputValue()
        });

    setPickupTime(pickup_date);
    setDropoffTime();
}

var hoursTextData = {
    1 : "10:00 ~ 11:00",
    2 : "11:00 ~ 12:00",
    3 : "12:00 ~ 13:00",
    4 : "13:00 ~ 14:00",
    5 : "14:00 ~ 15:00",
    6 : "15:00 ~ 16:00",
    7 : "16:00 ~ 17:00",
    8 : "17:00 ~ 18:00",
    9 : "18:00 ~ 19:00",
    10 : "19:00 ~ 20:00",
    11 : "20:00 ~ 21:00",
    12 : "21:00 ~ 22:00",
    13 : "22:00 ~ 23:00",
    14 : "23:00 ~ 24:00"
};

function setPickupTime(pickup_date) {
    var date = new Date(),
        day = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        startPoint = 1;

    if (day == pickup_date.getDate()) { // 선택된 수거 날짜가 오늘일 경우 
        if (hours >= 8) {
            startPoint = hours - 7;
            if (minutes >= 1)
                startPoint++;
        }
    }

    var select = $("#pickup_time");

    select.find("option").remove();
    
    if (startPoint <= 14) {
        for (var i = startPoint; i <= 14; i++) 
            select.append("<option value='" + i + "'>" + hoursTextData[i] + "</option>");
    }
    else { // 당일 수거가 불가능한 경우
        select.append("<option disabled>날짜를 새로 선택해주세요.</option>");
    }
}

function setDropoffTime() {
    var dropoff_minDate = $('#dropoff_date').data('minDate'),
        dropoff_date = $('#dropoff_date').val();

    var select = $("#dropoff_time");
    select.find("option").remove();
    
    if (dropoff_minDate.toDateInputValue() == dropoff_date){
        // 당일 수거가 불가능한 경우
        if ($('#pickup_time').find('option').attr('disabled') == "disabled") {
            select.append("<option disabled>날짜를 새로 선택해주세요.</option>");
            return;
        }

        var t = $("#pickup_time");
        var time = t.val();
        for (var i = time; i <= 14; i++) {
            select.append("<option value='" + i + "'>" + hoursTextData[i] + "</option>");
        }
    } else {
        for (var i = 1; i <= 14; i++)
            select.append("<option value='" + i + "'>" + hoursTextData[i] + "</option>");
    }

}

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
    cartHtml += "<tr><td>+ 배달비용</td><td></td><td>₩" + cartData.dropoff_price + "</td></tr>";
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

    obj.phone = order_form.phone.value; 
    obj.address = order_form.address.value;
    obj.addr_building = order_form.addr_building.value;
    obj.memo = order_form.memo.value; 

    obj.price = cartData.totalItemPrice;
    obj.dropoff_price = cartData.dropoff_price; 
    
    var pickupTime = parseInt(date_time_form.pickup_time.value) + 9 + ":00:00";
    var dropoffTime = parseInt(date_time_form.dropoff_time.value) + 9 + ":00:00";
    obj.pickup_date = date_time_form.pickup_date.value + " " + pickupTime;
    obj.dropoff_date = date_time_form.dropoff_date.value + " " + dropoffTime;
    
    obj.mileage = 0; 
    obj.sale = 0; 
    obj.payment_method = 0; 

    obj.item = [];
    for(var i = 0; i < cartItemList.length; i++){
        console.log(cartItemList);
        obj.item[i] = {
            item_code: cartItemList[i].item_code,
            count: cartItemList[i].qty
        }
    }
    

    var json_data = JSON.stringify(obj); // 오브젝트를 JSON형식으로 변환
    console.log("json_data : "  + json_data);

    // ajax post 
    // ajaxPostOrderData(json_data); 

    // 주문완료 페이지로 이동 
    window.location.href = 'complete.html';
}



$(document).ready(function() {
    $(':input').change(function() {
        $(window).bind('beforeunload', function() {
            return 'Do you really want to leave the page?';
        });
    });
    $("form").submit(function() {
        $(window).unbind('beforeunload');
    });
    var seoul = ['서울 '];
    var seongnam = ['경기 성남시 '];
    
    $('.order-btn').on('click', function() {
        var value = $('#address').val();
        $.each(seoul, function(idx, word) {
            value = value.replace(word, '서울특별시 ');
        });
        $.each(seongnam, function(idx, word) {
            value = value.replace(word, '성남시 ')
        })
        $('#address').val(value);
    });
});
var checkbox = $("input[type='checkbox']"),
    submitButt = $(".order-btn");
checkbox.click(function() {
    submitButt.attr("disabled", !checkbox.is(":checked"));
});
function checkAddress() {
    var addr = document.getElementById("address").value,
        addrData = [" 강남구 ", " 중구 ", " 서초구 ", " 마포구 ", " 용산구 ", " 동작구 ", " 관악구 ", " 성동구 ", " 영등포구 ", " 서대문구 아현", " 서대문구 북아현", " 서대문구 충현", " 서대문구 대신", " 서대문구 연희", " 서대문구 신촌", "성남시 분당구"]
    if (addr == "") {
        alert("주소를 입력해주세요.")
        return false;
    }
    for (var i = 0; i < addrData.length; i++) {
        if (addr.indexOf(addrData[i]) != -1)
            return true;
    }
    alert("죄송합니다. 서비스 가능 지역이 아닙니다. 하루 빨리 더 많은 고객님을 뵐 수 있도록 최선을 다하겠습니다.");
    return false;
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