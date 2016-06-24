<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.*, java.text.*, java.sql.*, java.io.*, org.json.*"  %>
<%
String enemyId = (String)session.getAttribute("enemyId");
String filePath = application.getRealPath("/online/")+enemyId+"Attack.txt";
File file = new File(filePath);

if(file.isFile())
{
	BufferedReader br = null;
	br = new BufferedReader(new FileReader(file));
	
	int i = Integer.parseInt(br.readLine());
	int j = Integer.parseInt(br.readLine());

	file.delete();

	out.print(i);
	out.print(j);
}
else
	out.print("100");
%>