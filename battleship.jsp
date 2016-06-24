<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" type="text/css" href="style.css" />
		<title>Term Project #2: BattleShip</title>
		<script src="jquery-3.0.0.min.js"></script>
		<script src="common.js"></script>
		<script src="jquery.bpopup.min.js"></script>
		<script>
			soundPlay("./img/SW001_8-Bit-Games-163_Pickup_Coin.wav");
                	</script>
	</head>
	<body>
		<header><h1>Battleship</h1></header>
		<content>
		<div id="container">
			<div id="turn">배치 대기 중</div>

			<div id="myMapContainer"><!-- 내 지도 -->
				<span>My Map</span>
				<div id="myMap">
				</div><!-- 자바스크립트로 출력 -->
				<div id="ship"><!-- 배치할 배를 선택하는 부분 -->
				배치할 배 선택<br>
					<a href="#" onClick="allocateShip(event)" id="ship1">■■■■■</a> 
					<a href="#" onClick="allocateShip(event)" id="ship2">■■■■</a> 
					<a href="#" onClick="allocateShip(event)" id="ship3">■■■</a> 
					<a href="#" onClick="allocateShip(event)" id="ship4">■■■</a> 
					<a href="#" onClick="allocateShip(event)" id="ship5">■■</a><br><br>
					<a href="#" onClick="rotateShip()"><img src="./img/iconmonstr-refresh-3-24.png"></a>
				</div>
			</div>
			
			<div id="enemyMapContainer"><!-- 상대방 지도 -->
				<span>Enemy Map</span>
				<div id="enemyMap">
				</div><!-- 자바스크립트로 출력 -->
			</div>
		</div>
		</content>
		<script src="battleship.js"></script><!-- js 파일 불러오기 -->

		<div id="popup"></div>
		<footer>201404375 정경원</footer>
	</body>
</html>