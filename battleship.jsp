<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" type="text/css" href="style.css" />
		<title>Term Project #2: BattleShip</title>
		<script src="jquery-3.0.0.min.js"></script>
		<script src="common.js"></script>
	</head>
	<body>
		<header><h1>Battleship</h1></header>
		<content>
			<div id="myMapContainer"><!-- 내 지도 -->
				MyMap
				<div id="myMap">
				</div><!-- 자바스크립트로 출력 -->
				<div id="ship"><!-- 배치할 배를 선택하는 부분 -->
				배치할 배(칸수) 선택<br>
					<a href="#" onClick="allocateShip(event)" id="ship1">5</a> 
					<a href="#" onClick="allocateShip(event)" id="ship2">4</a> 
					<a href="#" onClick="allocateShip(event)" id="ship3">3</a> 
					<a href="#" onClick="allocateShip(event)" id="ship4">3</a> 
					<a href="#" onClick="allocateShip(event)" id="ship5">2</a>
				</div>
			</div>
			
			<div id="enemyMapContainer"><!-- 상대방 지도 -->
				EnemyMap
				<div id="enemyMap">
					배치 대기중
				</div><!-- 자바스크립트로 출력 -->
			</div>
		</content>
		<script src="battleship.js"></script><!-- js 파일 불러오기 -->
		<footer>201404375 정경원</footer>
	</body>
</html>