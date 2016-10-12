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
    	<link rel="stylesheet" href="./resources/styles/write.css">
	</head>

	<body>
        <%@ include file="./partials/header.jspf"%>


        <div class="row"> 
            <div class="top col s12">주문서 작성</div>

            <div class="section col s12">
                <h5>주문 내역</h5>
                <div class="divider"></div>
                <table>
                    <thead>
                      <tr>
                          <th data-field="id">품목</th>
                          <th data-field="name">수량</th>
                          <th data-field="price">가격</th>
                      </tr>
                    </thead>

                    <tbody id="show-cart"></tbody>
                </table>

                <button class="cancel-btn btn waves-effect waves-light col s4" type="submit">변경/추가</button>
            </div>
            
            <div class="section col s12">
                <h5 class="headline-info">수거 및 배달 시간 선택</h5>
                <div class="select-wrapper">
                    <div class="text">수거</div>
                    <input type="date" name="date">
                    <input type="time" name="time">
                    <!-- <select name="pickup_time" id="pickuptime" class="pg-text-fieldR order-pickup input-group-addon" required> -->
                </div>
                <div class="select-wrapper row">
                    <div class="text">배달</div>
                    <input type="date" name="date">
                    <input type="time" name="time">
                </div>
            </div>


            <div class="section col s12">
                <h5 class="headline-info">주문 정보 입력</h5>
                <form>
                    <div class="input-wrapper">
                        <div class="input-field col s5">
                          <input id="name" type="text" class="validate">
                          <label for="name">성함</label>
                        </div>
                        <div class="input-field col s7">
                          <input id="phone" type="number" class="validate">
                          <label for="phone">휴대폰 번호</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                          <input id="address" type="text" class="validate">
                          <label for="address">주소 입력</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                          <input id="address2" type="text" class="validate">
                          <label for="address2">상세주소 입력</label>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light col s12" type="submit">변경/추가</button>        
                </form>
            </div>
        </div>
        <%@ include file="./partials/footer.jspf"%>

    	<!--Import jQuery before materialize.js-->
    	<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    	<script type="text/javascript" src="./resources/scripts/materialize.min.js"></script>
      <script src="./resources/scripts/index.js"></script>
    	<script src="./resources/scripts/write.js"></script>
	</body>
</html>