<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.*, java.text.*, java.sql.*, java.io.*"  %>
<%
String myId = (String)session.getAttribute("myId");

String filePath = application.getRealPath("/online/")+myId+"Online.txt";
File file = new File(filePath);

java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("HHmmss");
String today = formatter.format(new java.util.Date());

PrintWriter writer = null;
writer = new PrintWriter(filePath);
writer.println(today);
writer.flush();

String enemyId = (String)session.getAttribute("enemyId");
filePath = application.getRealPath("/online/")+enemyId+"Online.txt";
file = new File(filePath);

BufferedReader br = null;
br = new BufferedReader(new FileReader(file));
String time = br.readLine();
if(time == null || time.length() == 0)
	time = today;

int todayInt = Integer.parseInt(today);
int timeInt = Integer.parseInt(time);
if((todayInt - 2) > timeInt) {
	out.println("0");	// 2 이상 차이나면 0 출력
}
else
{
	out.println("1");
}
%>