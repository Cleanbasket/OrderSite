<%@ page trimDirectiveWhitespaces="true" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>

    	<!--Import Google Icon Font-->
    	<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    	<!--Import materialize.css-->
    	<link type="text/css" rel="stylesheet" href="./resources/styles/materialize.min.css"  media="screen,projection"/>

	    <!--Let browser know website is optimized for mobile-->
    	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

		<!-- My css-->
        <link rel="stylesheet" href="./resources/styles/index.css">
    	<link rel="stylesheet" href="./resources/styles/trace.css">
	</head>

	<body>
        <%@ include file="./partials/header.jspf"%>

        <div class="row">
            <div class="bg_box">
                <img class="bg_img" src="./resources/images/bg_trace.png">
            </div>
            <div class="content-wrapper">
                <div class="content">
                    <div class="title">주문조회</div>
                    <p>주문시 작성하셨던 휴대폰 번호로<br>세탁 주문 현황을 조회하실 수 있습니다.</p>
                    <input id="phone" type="number" class="validate" placeholder="휴대폰 번호">
                    <a class="trace-btn modal-trigger btn waves-effect waves-light" href="#modal-trace">주문확인</a> 
                </div>
            </div>
        </div>

        <!-- 모달 -->
        <div id="modal-trace" class="modal">
            <div class="modal-content">
                <i class="close-btn material-icons">close</i>
                <div class="caption center">최근 주문 조회</div>
                <img src="./resources/images/ic_trace.png">
                <div class="center subtitle">크린파트너<br>배정 중입니다.</div>
                
                <div class="progress-bar">
                    <div class="step">
                        <div class="circle">
                            <div class="inner-circle"></div>
                        </div>
                        <div class="progress-name">수거</div>
                    </div>
                    
                    <div class="bar"></div>

                    <div class="step">
                        <div class="circle">
                            <div class="inner-circle"></div>
                        </div>
                        <div class="progress-name">세탁</div>
                    </div>
                    
                    <div class="bar"></div>

                    <div class="step">
                        <div class="circle">
                            <div class="inner-circle"></div>
                        </div>
                        <div class="progress-name">배달</div>
                    </div>
                    
                    <div class="bar"></div>

                    <div class="step">
                        <div class="circle">
                            <div class="inner-circle"></div>
                        </div>
                        <div class="progress-name">완료</div>
                    </div>
                </div>
                
                <div class="divider"></div>

                <table class="my-order-info">
                    <tr>
                        <td>주소</td>
                        <td>
                            <div data-field="address">서울특별시 관악구 봉천동 1708</div>
                            <div data-field="address2">107동 1304</div>
                        </td>
                    </tr>
                    <tr>
                        <td>수거시간</td>
                        <td>2016-07-27 20:30</td>
                    </tr>
                    <tr>
                        <td>배달시간</td>
                        <td>2016-07-30 10:00</td>
                    </tr>
                </table>
            </div>
        </div>
    
        <%@ include file="./partials/footer.jspf"%>

    	<!--Import jQuery before materialize.js-->
    	<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    	<script type="text/javascript" src="./resources/scripts/materialize.min.js"></script>
    	<script src="./resources/scripts/index.js"></script>
	</body>
</html>