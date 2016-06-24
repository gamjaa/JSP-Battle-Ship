/*
- 플레이어가 각자 10x10 지도에 크기가 다른 배 5척(5, 4, 3, 3, 2칸)을 배치한다.
- 각 플레이어는 본인의 지도를 확인할 수 있지만, 상대방의 지도는 빈 칸으로 표시된다.
- 두 플레이어가 모두 배치를 완료하면 게임이 시작되며, 서로 번갈아 가며 한 칸씩 선택해서 상대방의 배가 배치된 모든 칸을 먼저 찾아내는 사람이 승리한다.
*/

var myMap = new Array( new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10) );
var enemyMap = new Array( new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10), new Array(10) );
var myTurn = false;
var enemyMapAllocate = false;

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
			if (myMap[i][j] === 2)	// 배가 배치된 지점
			{
				myMapDiv.innerHTML += '<div id="m'+i+j+'" class="selected" onClick="mouseClick(event)" onMouseOver="mouseOver(event)" onMouseOut="mouseOut(event)">&nbsp;</div>';
			}
			else if (myMap[i][j] === -1)	// 폭격됐으나 배가 배치되지 않은 지점
			{
				myMapDiv.innerHTML += '<div id="m'+i+j+'" class="over">X</div>';
			}
			else if (myMap[i][j] === -2)	// 파괴된 지점
			{
				myMapDiv.innerHTML += '<div id="m'+i+j+'" class="destroyed" onClick="mouseClick(event)">&nbsp;</div>';
				destroyed++;
			}
			else	// 빈 지점
			{
				myMapDiv.innerHTML += '<div id="m'+i+j+'" onClick="mouseClick(event)" onMouseOver="mouseOver(event)" onMouseOut="mouseOut(event)">&nbsp;</div>';
			}
		}
	}

	if (destroyed >= 17)
	{
		// 패배 처리
		myTurn = false;
		clearInterval(connectionCheck);	
		clearInterval(turnInterval);
		$("#turn")[0].innerHTML = "<a href='index.jsp'>패배</a>";
		$("#popup")[0].innerHTML = "<h1>You Lose</h1><a href='index.jsp'>홈으로</a>";
		$('#popup').bPopup({
			autoClose: false
		});
	}
}

var shipSize = 0;
var shipCount = 0;
var shipDirection = true;
var shipAllocate = true;
var shipSelect = "";

function rotateShip () {
	// 배치할 배 방향 전환
	if(shipDirection)
		shipDirection = false;
	else
		shipDirection = true;
}

function allocateShip (ev) {
	// 배치할 배 선택
	if(ev.target.id === "ship1")
	{
		shipSize = 5;
	}
	else if(ev.target.id === "ship2")
	{
		shipSize = 4;
	}
	else if(ev.target.id === "ship3")
	{
		shipSize = 3;
	}
	else if(ev.target.id === "ship4")
	{
		shipSize = 3;
	}
	else if(ev.target.id === "ship5")
	{
		shipSize = 2;
	}

	shipSelect = ev.target.id;
}

function mouseOver (ev) {
	// 배치할 위치 미리보기
	var i = eval(ev.target.id.slice(1,2));
	var j = eval(ev.target.id.slice(2));
	if(shipDirection)
	{
		for(var jCount=0; jCount < shipSize; jCount++) {
		if((j+jCount) > 9)
		{
			if(myMap[i][(9-jCount)] < 2)
			{
				myMap[i][(9-jCount)] = 1;
				$("#m"+i+(9-jCount))[0].setAttribute("class", "selected");
			}
			else
			{
				shipAllocate = false;
			}
		}
		else
		{
			if(myMap[i][(j+jCount)] < 2)
			{
				myMap[i][(j+jCount)] = 1;
				$("#m"+i+(j+jCount))[0].setAttribute("class", "selected");
			}
			else
			{
				shipAllocate = false;
			}
		}
		}
	}
	else
	{
		for(var iCount=0; iCount < shipSize; iCount++) {
		if((i+iCount) > 9)
		{
			if(myMap[(9-iCount)][j] < 2)
			{
				myMap[(9-iCount)][j] = 1;
				$("#m"+(9-iCount)+j)[0].setAttribute("class", "selected");
			}
			else
			{
				shipAllocate = false;
			}
		}
		else
		{
			if(myMap[(i+iCount)][j] < 2)
			{
				myMap[(i+iCount)][j] = 1;
				$("#m"+(i+iCount)+j)[0].setAttribute("class", "selected");
			}
			else
			{
				shipAllocate = false;
			}
		}
		}
	}
}

function mouseOut (ev) {
	// 배치할 위치 미리보기 삭제
	shipAllocate = true;
	var i = eval(ev.target.id.slice(1,2));
	var j = eval(ev.target.id.slice(2));
	if(shipDirection)
	{
		for(var jCount=0; jCount < shipSize; jCount++) {
		if(j+jCount > 9)
		{
			if(myMap[i][(9-jCount)] < 2)
			{
				myMap[i][(9-jCount)] = 0;
				$("#m"+i+(9-jCount))[0].setAttribute("class", "");
			}
		}
		else
		{
			if(myMap[i][(j+jCount)] < 2)
			{
				myMap[i][(j+jCount)] = 0;
				$("#m"+i+(j+jCount))[0].setAttribute("class", "");
			}
		}
		}
	}
	else
	{
		for(var iCount=0; iCount < shipSize; iCount++) {
		if((i+iCount) > 9)
		{
			if(myMap[(9-iCount)][j] < 2)
			{
				myMap[(9-iCount)][j] = 0;
				$("#m"+(9-iCount)+j)[0].setAttribute("class", "");
			}
		}
		else
		{
			if(myMap[(i+iCount)][j] < 2)
			{
				myMap[(i+iCount)][j] = 0;
				$("#m"+(i+iCount)+j)[0].setAttribute("class", "");
			}
		}
		}
	}
}

function mouseClick (ev) {
	// 현재의 위치에 배 배치
	if(shipAllocate)
	{
	shipSize = 0;
	shipCount = 0;

	$("#"+shipSelect)[0].innerHTML = "";

	for (var i=0; i<10; i++)
	{
		for (var j=0; j<10; j++)
		{
			if(myMap[i][j] === 1)
			{
				myMap[i][j] = 2;
			}
			if(myMap[i][j] === 2)
			{
				shipCount++;
			}
		}
	}
	printMyMap();

	if (shipCount >= 17)
	{
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
		$("#ship")[0].innerHTML = "";
		$("#popup")[0].innerHTML = "배치 완료!";
		$('#popup').bPopup({
			autoClose: 500 //Auto closes after 1000ms/1sec
		});
		if(enemyMapAllocate)
		{
			soundPlay("./img/SW001_8-Bit-Games-163_Pickup_Coin.wav");
			$("#popup")[0].innerHTML = "게임 시작!";
			$('#popup').bPopup({
				autoClose: 500 //Auto closes after 1000ms/1sec
			});
			setTimeout(function() {
				$("#popup")[0].innerHTML = "상대방 차례!";
				$('#popup').bPopup({
					autoClose: 500 //Auto closes after 1000ms/1sec
				});
			}, 1000);
			turnInterval = setInterval("turn()", 1000);
			printEnemyMap();
			damageInterval = setInterval("damage()", 1000);
		}
		else
			myTurn = true;
	}
	}
	else
	{
		$("#popup")[0].innerHTML = "배를 겹쳐서 배치할 수 없습니다!";
		$('#popup').bPopup({
			autoClose: 500 //Auto closes after 1000ms/1sec
		});
	}
}


function allocateCheck () {
	// 상대방 배치 완료 확인
	$.ajax({
		type:"GET",
		url:"allocateCheck.jsp",
		success:function(data){
			if(parseInt(data) && myTurn)
			{
				enemyMapAllocate = true;
				clearInterval(allocateCheckInterval);
				soundPlay("./img/SW001_8-Bit-Games-163_Pickup_Coin.wav");
				$("#popup")[0].innerHTML = "게임 시작!";
				$('#popup').bPopup({
					autoClose: 500 //Auto closes after 1000ms/1sec
				});
				setTimeout(function() {
					$("#popup")[0].innerHTML = "내 차례!";
					$('#popup').bPopup({
						autoClose: 500 //Auto closes after 1000ms/1sec
					});
				}, 1000);
				turnInterval = setInterval("turn()", 1000);
				printEnemyMap();
			}
			else if(parseInt(data) && !myTurn)
			{
				enemyMapAllocate = true;
				clearInterval(allocateCheckInterval);
				$("#popup")[0].innerHTML = "상대방 배치 완료!";
				$('#popup').bPopup({
					autoClose: 500 //Auto closes after 1000ms/1sec
				});
			}

		},
		error:function( xhr, status, error ){
			console.log(xhr + "\n" + status + "\n" + error);
		}
	});
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
			if (enemyMap[i][j] === 1)	// 폭격했으나 배가 배치되지 않은 지점
			{
				enemyMapDiv.innerHTML += '<div id="e'+i+j+'" class="over">X</div>';
			}
			else if (enemyMap[i][j] === 2)	// 파괴한 지점
			{
				enemyMapDiv.innerHTML += '<div id="e'+i+j+'" class="destroyed">O</div>';
				destroyed++;
			}
			else	// 빈 지점
			{
				enemyMapDiv.innerHTML += '<div id="e'+i+j+'" onClick="attack(event)">&nbsp;</div>';
			}
		}
	}

	if (destroyed >= 17)
	{
		// 승리 처리
		myTurn = false;
		clearInterval(damageInterval);
		clearInterval(connectionCheck);
		clearInterval(turnInterval);
		$("#turn")[0].innerHTML = "<a href='index.jsp'>승리</a>";
		$("#popup")[0].innerHTML = "<h1>You Win</h1><a href='index.jsp'>홈으로</a>";
		$('#popup').bPopup({
			autoClose: false
		});
	}
}
var damageInterval;

function attack (ev) {
	// 상대방에게 공격
	if(myTurn)
	{
		myTurn = false;
		var i = eval(ev.target.id.slice(1,2));
		var j = eval(ev.target.id.slice(2));

		$.ajax({
			type:"POST",
			url:"attack.jsp",
			data: "i="+i+"&j="+j,
			success:function(data){
				if(parseInt(data) === 1)	// 빈 공간
				{
					enemyMap[i][j] = 1;
					printEnemyMap();
				}
				else if(parseInt(data) === 2)	// 배가 배치된 공간
				{
					enemyMap[i][j] = 2;
					soundPlay("./img/SW001_8-Bit-Games-017_Explosion.wav");
					printEnemyMap();
				}
			},
			error:function( xhr, status, error ){
				console.log(xhr + "\n" + status + "\n" + error);
			}
		});

		damageInterval = setInterval("damage()", 1000);

		$("#popup")[0].innerHTML = "상대방 차례!";
		$('#popup').bPopup({
			autoClose: 500 //Auto closes after 1000ms/1sec
		});
	}	
}

function damage () {
	// 상대방의 공격 처리
	$.ajax({
		type:"GET",
		url:"damage.jsp",
		success:function(data){
			if(parseInt(data) === 100)
				return;

			var i = parseInt(parseInt(data)/10);
			var j = parseInt(data)%10;
			console.log(i+", "+j);

			if(myMap[i][j] === 0)	// 빈 공간
			{
				myMap[i][j] = -1;
			}
			else if(myMap[i][j] === 2)	// 배가 배치된 공간
			{
				myMap[i][j] = -2;
				soundPlay("./img/SW001_8-Bit-Games-017_Explosion.wav");
			}

			clearInterval(damageInterval);
			myTurn = true;
			$("#popup")[0].innerHTML = "내 차례!";
			$('#popup').bPopup({
				autoClose: 500 //Auto closes after 1000ms/1sec
			});

			printMyMap();
		},
		error:function( xhr, status, error ){
			console.log(xhr + "\n" + status + "\n" + error);
		}
	});	
}

// 차례 출력
var turnInterval;
function turn () {
	if(myTurn)
		$("#turn")[0].innerHTML = "내 차례";
	else
		$("#turn")[0].innerHTML = "상대방 차례";
}

printMyMap();
var allocateCheckInterval = setInterval("allocateCheck()", 1000);
var connectionCheckErrorFilter = 0;

// 접속 유지 확인
var connectionCheck = setInterval( function () {
	$.ajax({
		type:"GET",
		url:"connectionCheck.jsp",
		success:function(data){
			if(parseInt(data) === 0)
			{
				// 59초 -> 1초 문제 해결
				connectionCheckErrorFilter++;
			}
			else
				connectionCheckErrorFilter = 0;

			if(connectionCheckErrorFilter > 2)
			{
				alert("상대방이 나갔습니다. 첫 화면으로 돌아갑니다.");
				location.replace("index.jsp");
			}
		},
		error:function( xhr, status, error ){
			console.log(xhr + "\n" + status + "\n" + error);
		}
	});
}, 1000);