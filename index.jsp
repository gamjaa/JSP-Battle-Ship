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
			<p id="message">게임 시작을 눌러, 대전 상대를 기다려주세요!</p>
			<button onclick="location.replace('wait.jsp');">게임 시작</button>
		</content>
		<footer>201404375 정경원</footer>
	</body>
</html>