$( document ).ready(function(){
	$('.button-collapse').sideNav(); // 반응형. 모바일 화면 상단바
	$('ul.tabs').tabs(); // 품목 선택 탭 
    $('.modal-trigger').leanModal(); // 모달 열기

    $('.close-btn').click(function(){ // 모달 닫기 
        $('#modal-trace').closeModal();
    });

    // 생활 물빨래 탭 item quantity box 정렬하기  
    var laundryQtyTop = $('.nav-top').height() + $('.tab-menu').height();
    laundryQtyTop = laundryQtyTop + ($('.laundry-img').height()/2.7);
    var laundryQtyLeft = ($('.laundry-img').width() - $('.laundry-qty').width())/2;

    $('.laundry-qty-container').css('top',  laundryQtyTop + 'px');
    $('.laundry-qty').css('left', laundryQtyLeft + 'px');



// click이벤트랑 touchstart 이벤트 둘 다 걸어야할듯 

	// + 누를 경우 
    $('.inc').click(function(e){
    	var currentVal = parseInt($('.qty').text());

        if (!isNaN(currentVal)) {
            $('.qty').text(currentVal + 1);
        } else {
        	$('.qty').text(0);
        }
    });

    // - 누를 경우
    $('.dec').click(function(e) {
    	var currentVal = parseInt($('.qty').text());

        if (!isNaN(currentVal) && currentVal > 0) {
    		$('.qty').text(currentVal - 1);
        } else {
        	$('.qty').text(0);
        }
    });


//    $('.contents-container').children()[0] ~ [9]
    
    // Item라는 객체 생성 
    function Item(name, price, pty){
        this.name = name;
        this.price = price;
        this.pty = pty;
    }

    var itemsList = [
        new Item("와이셔츠", 2000, 0),
        new Item("정장 한 벌", 6000, 0),
        new Item("정장 상의", 3500, 0),
        new Item("정장 하의", 3500, 0),
        new Item("여성 정장 상의", 3500, 0),
        new Item("여성 정장 하의", 3500, 0),
    ];


    // html에 추가 
    var itemsHtml = "";
    for(var i = 0; i < itemsList.length; i++){
        itemsHtml += "<ul class='row'><li class= 'col s12'><div class='col s8'><div class='col s12'><div class='left'>" + itemsList[i].name + "</div><div class='right'>₩" + itemsList[i].price + "</div></div></div><div class='qty-box col s3'><span class='dec left-set'>–</span><span class='qty center-set'>" + itemsList[i].pty + "</span><span class='inc right-set'>+</span></div></li></ul>";
    }
    $('#business').append(itemsHtml);

});



