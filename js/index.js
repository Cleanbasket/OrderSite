
$( document ).ready(function(){
	$('.button-collapse').sideNav(); // 반응형. 모바일 화면 상단바
	$('ul.tabs').tabs(); // 품목 선택 탭 
    //@TODO : tab눌린거 hover넣어야함! 
    $('.modal-trigger').leanModal(); // 모달 열기

    $('.close-btn').click(function(){ // 모달 닫기 
        $('#modal-trace').closeModal();
    });

    // 생활 물빨래 탭 item quantity box 정렬하기  
    var laundryQtyTop = $('.nav-top').height() + $('.tab-menu').height();
    laundryQtyTop = laundryQtyTop + ($('.laundry-img').height()/2.7);
    var laundryQtyLeft = ($('.laundry-img').width() - $('.laundry-qty').width())/2;

    $('#laundry .item-box-container').css('top',  laundryQtyTop + 'px');
    $('.laundry-qty').css('left', laundryQtyLeft + 'px');




// click, touchstart

    // // 선택한 탭의 index값(카테고리 번호)을 찾아서 ajaxtext() 실행 
    // $('.tab').click(function(e){
    //     var categoryNum = $(this).index() + 1;
    //     showItemList(categoryNum);
    // });

    // // 선택한 탭의 품목들을 보여줌
    // var showItemList = function(categoryNum){
    //     // var ptyTest = 0;
    //     var itemsHtml = "";
        
    //     $.ajax({                  
    //         type: "GET",
    //         url: "http://localhost:8080/wash/item",
    //         dataType: "json",
    //         success: function(resData) {  
    //             if (resData.constant == 1){ // 1 = Success
    //                 var data = $.parseJSON(resData.data);
                    
    //                 // '생활물빨래'탭이 아니어야 하고, 품목 리스트는 탭 클릭 최초 1회만 html에 추가해야한다   
    //                 if (categoryNum !== 1 && $('#' + data.categories[categoryNum-1].name).find('ul').length == 0){                    
    //                     for(var i = 0; i < data.orderItems.length; i++){
    //                         if(data.orderItems[i].category == categoryNum){
    //                             itemsHtml += "<ul class='item-box row'><li class= 'col s12'><div class='item col'><div class='col s12'><div class='left item-name'>" + data.orderItems[i].name + "</div><div class='right'>₩" + data.orderItems[i].price + "</div></div></div><div class='qty-box col' data-price='" + data.orderItems[i].price + "'><span class='dec left-set'>–</span><span class='qty center-set'>0</span><span class='inc right-set'>+</span><div class='subtotal-price' style='display: none'>0</div></div></li></ul>";
    //                         }
    //                     }
    //                     // 클릭한 카테고리 번호와 ajax통신으로 받아온 데이터의 카테고리 번호가 일치한지 체크한 후 
    //                     if (data.categories[categoryNum-1].id == categoryNum){
    //                         // html 넣기  
    //                         $('#' + data.categories[categoryNum-1].name).append(itemsHtml);
    //                     }   
    //                 }

    //                 updateItemList(data, categoryNum);
    //             }
    //        },
    //        error: function(res){
    //             console.log("showItemList 실패라능");
    //             console.log(res.state, res.error);
    //        }
    //     });
    // }

    // var updateItemList = function(data, categoryNum){
    //     // 세션스토리지 검사해서 qty 값 추가
    //     var session = window.sessionStorage;
    //     if(session.getItem("cart")){ // sessionStorage 'cart'가 존재하면, 
    //         console.log('있뜜');

    //         var cartData = JSON.parse(session.getItem('cart'));

    //         for(var i = 0; i < cartData.itemList.length; i++){
    //             console.log(cartData.itemList[i].categoryName );
    //             if(cartData.itemList[i].categoryName == data.categories[categoryNum-1].name){
    //                 // 뀨.. 
    //                 // cartData.itemList[i].qty
    //             }
    //         }         
        
    //     } else { 
    //         console.log('없음');
    //     }
    // }
    // showItemList();
});



