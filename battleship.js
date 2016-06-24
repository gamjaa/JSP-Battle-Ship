/*
- 플레이어가 각자 10x10 지도에 크기가 다른 배 5척(5, 4, 3, 3, 2칸)을 배치한다.
- 각 플레이어는 본인의 지도를 확인할 수 있지만, 상대방의 지도는 빈 칸으로 표시된다.
- 두 플레이어가 모두 배치를 완료하면 게임이 시작되며, 서로 번갈아 가며 한 칸씩 선택해서 상대방의 배가 배치된 모든 칸을 먼저 찾아내는 사람이 승리한다.
*/

var myMap = new Array( new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10) );
var enemyMap = new Array( new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10) );
var shipSize = 0;
var shipSizeRemain = 0;
var shipCount = 0;

// 자신의 지도 배열을 0으로 초기화
for (var i=0; i<10; i++)
{
	for (var j=0; j<10; j++)
	{
		myMap[i][j] = 0;
	}
}

function printMyMap () {
	// 자신의 지도 출력
	var myMapDiv = document.getElementById('myMap');
	var destroyed = 0;

	myMapDiv.innerHTML = "";
	for (var i=0; i<10; i++)
	{
		for (var j=0; j<10; j++)
		{
			if (myMap[i][j] > 0)	// 배가 배치된 지점
			{
				myMapDiv.innerHTML += '<div id="m'+i+j+'" class="selected" onClick="mouseClick(event)">&nbsp;</div>';
			}
			else if (myMap[i][j] == -1)	// 파괴된 지점
			{
				myMapDiv.innerHTML += '<div id="m'+i+j+'" class="destroyed" onClick="mouseClick(event)">&nbsp;</div>';
				destroyed++;
			}
			else if (myMap[i][j] == -2)	// 폭격됐으나 배가 배치되지 않은 지점
			{
				myMapDiv.innerHTML += '<div id="m'+i+j+'" class="over">X</div>';
				destroyed++;
			}
			else	// 빈 지점
			{
				myMapDiv.innerHTML += '<div id="m'+i+j+'" onClick="mouseClick(event)" onMouseOver="mouseOver(event)" onMouseOut="mouseOut(event)">&nbsp;</div>';
			}
		}
	}
}

function allocateShip (ev) {
	// 배치할 배 선택
	if (!shipSizeRemain)
	{
		for (var i=0; i<10; i++)
		{
			for (var j=0; j<10; j++)
			{
				if (myMap[i][j] == 1)
				{
					myMap[i][j] = 2;
				}
			}
		}
		
		shipSizeRemain = eval(document.getElementById(ev.target.id).innerHTML);
		shipSize = eval(document.getElementById(ev.target.id).innerHTML);
		document.getElementById(ev.target.id).innerHTML = "";
	}	
}

function mouseOver (ev) {
	var i = ev.target.id.slice(1,2);
	var j = ev.target.id.slice(2);

}

function mouseOut (ev) {
	
}

function mouseClick (ev) {
	// 배를 배치한다
	if (shipSizeRemain)
	{
		var i = ev.target.id.slice(1,2);
		var j = ev.target.id.slice(2);
		if (myMap[i][j] == 1)
		{
			myMap[i][j] = 0;
			ev.target.setAttribute("class", "");
			shipSizeRemain++;
			shipCount--;
		}
		else if (myMap[i][j] == 0)
		{
			myMap[i][j] = 1;
			ev.target.setAttribute("class", "selected");
			shipSizeRemain--;
			shipCount++;
		}

		if (shipCount >= 17)
		{
			alert("배치 완료!");
			jQuery.ajaxSettings.traditional = true;
			$.ajax({
				type:"POST",
				url:"allocateDone.jsp",
				data: {"myMap[]":myMap},
				success:function(data){
				},
				error:function( xhr, status, error ){
					console.log(xhr + "\n" + status + "\n" + error);
				}
			});
		}
	}
}

function printEnemyMap () {
	// 적의 지도(공격한 결과) 출력
	var enemyMapDiv = document.getElementById('enemyMap');
	var destroyed = 0;

	enemyMapDiv.innerHTML = "";
	for (var i=0; i<10; i++)
	{
		for (var j=0; j<10; j++)
		{
			if (enemyMap[i][j] > 0)	// 폭격했으나 배가 배치되지 않은 지점
			{
				enemyMapDiv.innerHTML += '<div id="e'+i+j+'" class="over">X</div>';
			}
			else if (enemyMap[i][j] == -1)	// 파괴한 지점
			{
				enemyMapDiv.innerHTML += '<div id="e'+i+j+'" class="destroyed">O</div>';
				destroyed++;
				console.log(destroyed);
			}
			else	// 빈 지점
			{
				enemyMapDiv.innerHTML += '<div id="e'+i+j+'" onClick="attack(event)">&nbsp;</div>';
			}
		}
	}

	if (destroyed >= 17)
	{
		alert("파괴 완료!");
	}
}

function check (shipSize) {
	// 배를 제대로 배치했는지 체크: 미구현
}


function attack (ev) {
	// 상대방에게 폭격
	var i = ev.target.id.slice(1,2);
	var j = ev.target.id.slice(2);



	if (myMap[i][j])	// 상대방의 배가 존재(서버 통신 부분 미구현이므로 임시적으로 자신의 배치 가지고 체크)
	{
		enemyMap[i][j] = -1;
		myMap[i][j] = -1;
		printMyMap();
		printEnemyMap();
	}
	else	// 빈 공간 폭격
	{
		enemyMap[i][j] = 1;
		myMap[i][j] = -2;
		printMyMap();
		printEnemyMap();
	}
}

function allocateCheck () {
	// 상대방 배치 완료 확인
	$.ajax({
		type:"GET",
		url:"allocateCheck.jsp",
		success:function(data){
			if(parseInt(data))
			{
				printEnemyMap();
				clearInterval(allocateCheckInterval);
			}
		},
		error:function( xhr, status, error ){
			console.log(xhr + "\n" + status + "\n" + error);
		}
	});
}

printMyMap();
var allocateCheckInterval = setInterval("allocateCheck()", 1000);