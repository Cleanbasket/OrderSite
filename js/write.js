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
    2 : "10:30 ~ 11:30",
    3 : "11:00 ~ 12:00",
    4 : "11:30 ~ 12:30",
    5 : "12:00 ~ 13:00",
    6 : "12:30 ~ 13:30",
    7 : "13:00 ~ 14:00",
    8 : "13:30 ~ 14:30",
    9 : "14:00 ~ 15:00",
    10 : "14:30 ~ 15:30",
    11 : "15:00 ~ 16:00",
    12 : "15:30 ~ 16:30",
    13 : "16:00 ~ 17:00",
    14 : "16:30 ~ 17:30",
    15 : "17:00 ~ 18:00",
    16 : "17:30 ~ 18:30",
    17 : "18:00 ~ 19:00",
    18 : "18:30 ~ 19:30",
    19 : "19:00 ~ 20:00",
    20 : "19:30 ~ 20:30",
    21 : "20:00 ~ 21:00",
    22 : "20:30 ~ 21:30",
    23 : "21:00 ~ 22:00",
    24 : "21:30 ~ 22:30",
    25 : "22:00 ~ 23:00",
    26 : "22:30 ~ 23:30",
    27 : "23:00 ~ 24:00"
};

function setPickupTime(pickup_date) {
    var date = new Date(),
        day = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        startPoint = 1;

    if (day == pickup_date.getDate()) { // 선택된 수거 날짜가 오늘일 경우 
        if (hours >= 8) {
            startPoint = 2 * hours - 14;
            if (minutes >= 30)
                startPoint++;
        }
    }

    var select = $("#pickup_time");

    select.find("option").remove();
    
    if (startPoint <= 27) {
        for (var i = startPoint; i <= 27; i++) 
            select.append("<option value='" + i + "'>" + hoursTextData[i] + "</option>");
    }
    else {
        select.append("<option disabled>날짜를 새로 선택해주세요.</option>");
    }
}

function setDropoffTime() {
    console.log("함수드러와따 ");
    var dropoff_minDate = $('#dropoff_date').data('minDate'),
        dropoff_date = $('#dropoff_date').val();

    var select = $("#dropoff_time");
    select.find("option").remove();
    
    if (dropoff_minDate.toDateInputValue() == dropoff_date){
        console.log("if");

        if ($('#pickup_time').find('option').attr('disabled') == "disabled") {
                console.log("else if");
                select.append("<option disabled>날짜를 새로 선택해주세요.</option>");
                return;
            }
        var t = $("#pickup_time");
        var time = t.val();
        for (var i = time; i <= 27; i++) {
            select.append("<option value='" + i + "'>" + hoursTextData[i] + "</option>");
        }
    } else {
        console.log("else");
        for (var i = 1; i <= 27; i++)
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