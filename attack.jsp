<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.*, java.text.*, java.sql.*, java.io.*, org.json.*"  %>
<%
String enemyId = (String)session.getAttribute("enemyId");
String filePath = application.getRealPath("/online/")+enemyId+"Allocate.txt";
File file = new File(filePath);

if(file.isFile())
{
	BufferedReader br = null;
	br = new BufferedReader(new FileReader(file));
	String readBuffer;
	String[] arrayBuffer;

	int[][] enemyMap;
	enemyMap = new int[10][10];

	for(int i=0; i<10; i++)
	{
		readBuffer = br.readLine();
		arrayBuffer = readBuffer.split(",");
		for(int j=0; j<10; j++)
		{
			enemyMap[i][j] = Integer.parseInt(arrayBuffer[j]);
		}
	}

	int i = Integer.parseInt(request.getParameter("i"));
	int j = Integer.parseInt(request.getParameter("j"));

	if(enemyMap[i][j] == 2)
		out.print("2");
	else
		out.print("1");

	String myId = (String)session.getAttribute("myId");
	filePath = application.getRealPath("/online/")+myId+"Attack.txt";
	file = new File(filePath);
	PrintWriter writer = null;
	writer = new PrintWriter(filePath);
	writer.println(i);
	writer.println(j);
	writer.flush();
}
%>