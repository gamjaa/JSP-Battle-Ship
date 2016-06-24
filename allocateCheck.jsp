<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.*, java.text.*, java.sql.*, java.io.*, org.json.*"  %>
<%
// 배치 파일: 원래 없다가 배치 완료하면 저장. 상대방은 이 파일 유무로 상대 배치 여부를 판단
String enemyId = (String)session.getAttribute("enemyId");

String filePath = application.getRealPath("/online/")+enemyId+"Allocate.txt";
File file = new File(filePath);
if(file.isFile()) {
	out.print("1");
}
else
	out.print("0");
%>