<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.*, java.text.*, java.sql.*, java.io.*"  %>
<%!
private String getMD5( String strVal ) {
	// MD5 생성 http://imjusti.egloos.com/2195032
	StringBuffer sb = new StringBuffer();
	try
	{
		byte[] digest = java.security.MessageDigest.getInstance("MD5").digest( strVal.getBytes() );
		sb.setLength(0);
		for( int i = 0; i < digest.length; i++ ) {
			sb.append( Integer.toString( ( digest[i] & 0xf0) >> 4, 16 ) );
			sb.append( Integer.toString( digest[i] & 0x0f, 16 ) );
		}
		return sb.toString();
	}
	catch( Exception ex )
	{
		return "";
	}
}
%>
<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" type="text/css" href="style.css" />
		<title>Term Project #2: BattleShip</title>
		<script src="jquery-3.0.0.min.js"></script>
		<script src="common.js"></script>
<%
// 대기자 유무 확인(/online/wait.txt)
// 있으면 게임 시작
// 없으면 대기열에 집어넣음 -> 1초마다 대기자 확인 -> 들어오면 효과음 재생

java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyMMddHHmmss");
String today = formatter.format(new java.util.Date());
String ip = request.getRemoteAddr();

String myId = getMD5( today + ip );

session.setAttribute("myId", myId); // 본인 아이디 세션 생성

String filePath = application.getRealPath("/online/wait.txt");
File file = new File(filePath);
BufferedReader br = null;
br = new BufferedReader(new FileReader(file));
String enemyId = br.readLine();
String time = br.readLine();
if(time == null || time.length() == 0)
	time = "0";
Double todayDouble = Double.valueOf(today).doubleValue();
Double timeDouble = Double.valueOf(time).doubleValue();

if((Double.valueOf(today).doubleValue() - 3) <= Double.valueOf(time).doubleValue()) {
	session.setAttribute("enemyId", enemyId);
	PrintWriter writer = null;
	writer = new PrintWriter(filePath);			
	writer.println(myId);
	writer.println(today);
	writer.flush();
	response.sendRedirect("battleship.jsp");
}
else {
	PrintWriter writer = null;
	writer = new PrintWriter(filePath);			
	writer.println(myId);
	writer.println(today);
	writer.flush();
	out.println("<script>setInterval('waitPlayer()', 1000);</script>");
}
%>
	</head>
	<body>
		<header><h1>Battleship</h1></header>
		<content>
			<p id="message">대전 상대를 기다리는 중</p>
		</content>
		<footer>201404375 정경원</footer>
	</body>
</html>