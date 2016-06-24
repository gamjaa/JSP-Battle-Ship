<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.*, java.text.*, java.sql.*, java.io.*"  %>
<%
String filePath = application.getRealPath("/online/wait.txt");
File file = new File(filePath);
BufferedReader br = null;
br = new BufferedReader(new FileReader(file));
String myId = (String)session.getAttribute("myId");
String enemyId = br.readLine();
String time = br.readLine();
if(time == null || time.length() == 0)
	time = "0";
java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyMMddHHmmss");
String today = formatter.format(new java.util.Date());

Double todayDouble = Double.valueOf(today).doubleValue();
Double timeDouble = Double.valueOf(time).doubleValue();
if((Double.valueOf(today).doubleValue() - 3) <= Double.valueOf(time).doubleValue()) {
	if(myId.equals(enemyId)) {
		PrintWriter writer = null;
		writer = new PrintWriter(filePath);			
		writer.println(myId);
		writer.println(today);
		writer.flush();
		out.println("0");		
	}
	else {
		session.setAttribute("enemyId", enemyId);
		PrintWriter writer = null;
		writer = new PrintWriter(filePath);			
		writer.println("0");
		writer.println("0");
		writer.flush();
		out.println("1");
	}
}
else
	out.println("0");	// 없으면 0 출력
%>