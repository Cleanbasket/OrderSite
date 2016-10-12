<%@ page trimDirectiveWhitespaces="true" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>order page</title>

    	<!--Import Google Icon Font-->
    	<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    	<!--Import materialize.css-->
    	<link type="text/css" rel="stylesheet" href="./resources/styles/materialize.min.css"  media="screen,projection"/>

	    <!--Let browser know website is optimized for mobile-->
    	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

		<!-- My css-->
    	<link rel="stylesheet" href="./resources/styles/index.css">
	</head>

	<body>
        <%@ include file="./partials/header.jspf"%>

        <div class="row main">            
            <!-- 품목 탭 메뉴 -->
            <div class="tab-menu">
              <ul class="tabs">
                <li class="tab col s3">
                    <a class="active" href="#laundry">
                        <img src="./resources/images/ic_laundry.png" alt="laundry"><div>생활빨래</div>
                    </a>
                </li>
                <li class="tab col s3">
                    <a href="#business">
                        <img src="./resources/images/ic_business.png" alt="business"><div>비즈니스</div>
                    </a>
                </li>
                <li class="tab col s3">
                    <a href="#top">
                        <img src="./resources/images/ic_top.png" alt="top"><div>상의</div>
                    </a>
                </li>
                <li class="tab col s3">
                    <a href="#bottom">
                        <img src="./resources/images/ic_bottom.png" alt="bottom"><div>하의</div>
                    </a>
                </li>
                <li class="tab col s3">
                    <a href="#outer">
                        <img src="./resources/images/ic_outer.png" alt="outer"><div>아우터</div>
                    </a>
                </li>
                <li class="tab col s3">
                    <a href="#etc">
                        <img src="./resources/images/ic_etc.png" alt="etc"><div>기타</div>
                    </a>
                </li>
                <li class="tab col s3">
                    <a href="#bedclothes">
                        <img src="./resources/images/ic_bedclothes.png" alt="bedclothes"><div>이불</div>
                    </a>
                </li>
                <li class="tab col s3">
                    <a href="#footwear">
                        <img src="./resources/images/ic_footwear.png" alt="footwear"><div>신발</div>
                    </a>
                </li>
                <li class="tab col s3">
                    <a href="#bag">
                        <img src="./resources/images/ic_bag.png" alt="bag"><div>가방</div>
                    </a>
                </li>
                <li class="tab col s3">
                    <a href="#add">
                        <img src="./resources/images/ic_add.png" alt="add"><div>추가비용</div>
                    </a>
                </li>
              </ul>
            </div>

            <!-- 선택된 품목별 컨텐츠 -->
            <div class="contents-container">

                <div id="laundry" class="contents">
                    <img class="laundry-img" src="./resources/images/tab_1.png" alt="laundry">
                    <div class="laundry-qty-container item-box">
                        <div class="laundry-qty qty-box col s3" data-price="10000">
                            <span class="dec left-set">–</span>
                            <span class="qty center-set">0</span>
                            <span class="inc right-set">+</span>
                            <div class="item-name" style="display: none">생활 물빨래</div>
                            <div class="subtotal-price" style="display: none">0</div>
                        </div>
                        <div class="col s12">₩10,000/수거가방</div>
                    </div>
                </div>

                <div id="business" class="contents">
                    <img src="./resources/images/tap_2.png" alt="business">

                   <!--  <ul class="item-box row">
                        <li class= "col s12">
                            <div class="item col">
                                <div class="col s12">
                                    <div class="left item-name">test</div>
                                    <div class="right">₩2,000</div>
                                </div>
                            </div>
                            <div class="qty-box col" data-price="2000">
                                <span class="dec left-set">–</span>
                                <span class="qty center-set">0</span>
                                <span class="inc right-set">+</span>
                                <div class="subtotal-price" style="display: none">0</div>
                            </div>
                        </li>
                    </ul> -->

                </div>
                <div id="top" class="contents">
                    <img src="./resources/images/tap_3.png" alt="top">
                </div>
                <div id="bottom" class="contents">
                    <img src="./resources/images/tap_4.png" alt="bottom">
                </div>
                <div id="outer" class="contents">
                    <img src="./resources/images/tap_5.png" alt="outer">
                </div>
                <div id="etc" class="contents">
                    <img src="./resources/images/tap_6.png" alt="etc">
                </div>
                <div id="bedclothes" class="contents">
                    <img src="./resources/images/tap_7.png" alt="bedclothes">
                </div>
                <div id="footwear" class="contents">
                    <img src="./resources/images/tap_8.png" alt="footwear">
                </div>  
                <div id="bag" class="contents">
                    <img src="./resources/images/tap_9.png" alt="bag">
                </div>  
                <div id="add" class="contents">
                    <img src="./resources/images/tap_10.png" alt="add">
                </div>  
            </div>
        </div>

        <!-- 주문 정보 -->
        <div class="order-info row">
                <div class="cart col">
                    <div class="col s12">
                        <div class="left">품목</div>
                        <div class="right total-number" data-total-number="0">0개</div>
                    </div>
                    <div class="col s12">
                        <div class="left">합계</div>
                        <div class="right total-price">0원</div>
                    </div>
                </div>
                <button class="cart-btn btn waves-effect waves-light col" type="submit">주문하기</button>
        </div>

        <%@ include file="./partials/footer.jspf"%>

    	<!--Import jQuery before materialize.js-->
    	<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    	<script type="text/javascript" src="./resources/scripts/materialize.min.js"></script>
        <script src="./resources/scripts/index.js"></script>
    	<script src="./resources/scripts/order.js"></script>
	</body>
</html>