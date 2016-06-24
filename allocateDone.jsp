<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.*, java.text.*, java.sql.*, java.io.*, org.json.*, javax.servlet.*"  %>
<%
// 배치 파일: 원래 없다가 배치 완료하면 저장. 상대방은 이 파일 유무로 상대 배치 여부를 판단
// 제대로 작동 안 함...
String myId = (String)session.getAttribute("myId");

request.setCharacterEncoding("UTF-8");
String[] aStr = request.getParameterValues("myMap[]");

String filePath = application.getRealPath("/online/")+myId+"Allocate.txt";
File file = new File(filePath);
if(!(file.isFile())) {
	String[] myMap = request.getParameterValues("myMap[]");
	PrintWriter writer = null;
	writer = new PrintWriter(filePath);
	for(int i=0; i<myMap.length; i++)
	{
		writer.println(myMap[i]);
	}
	writer.flush();
}

%>