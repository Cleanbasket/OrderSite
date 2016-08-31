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


    // 선택한 탭의 index값(카테고리 번호)을 찾아서 ajaxtext() 실행 
    $('.tab').click(function(e){
        var categoryNum = $(this).index() + 1;
        ajaxtest(categoryNum);
    });

    // 선택한 탭의 품목들을 보여줌
    var ajaxtest = function(categoryNum){
        var ptyTest = 0;
        var itemsHtml = "";
        
        $.ajax({                  
            type: "GET",
            url: "http://localhost:8080/wash/item",
            dataType: "json",
            success: function(resData) {  
                if (resData.constant == 1){ // 1 = Success
                    console.log("ajaxtest 드러와쪄영");

                    var data = $.parseJSON(resData.data);
                    
                    for(var i = 0; i < data.orderItems.length; i++){
                        if(data.orderItems[i].category == categoryNum){
                            itemsHtml += "<ul class='row'><li class= 'col s12'><div class='col s8'><div class='col s12'><div class='left'>" + data.orderItems[i].name + "</div><div class='right'>₩" + data.orderItems[i].price + "</div></div></div><div class='qty-box col s3'><span class='dec left-set'>–</span><span class='qty center-set'>" + ptyTest + "</span><span class='inc right-set'>+</span></div></li></ul>";
                            // console.log(data.categories[i].name); 
                        }
                    }

                    // html 추가 
                    $('#' + data.categories[categoryNum].name).append(itemsHtml);
                    console.log("ajaxtest 나가께영");
                }
           },
           error: function(res){
                console.log("ajaxtest 실패라능");
                console.log(res.state, res.error);
           }
        });

    }
    ajaxtest();

});



