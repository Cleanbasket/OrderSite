$( document ).ready(function(){
	$('.button-collapse').sideNav(); // 반응형. 모바일 화면 상단바
	$('ul.tabs').tabs(); // 품목 선택 탭 


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




});



