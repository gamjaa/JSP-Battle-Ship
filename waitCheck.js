setInterval( function () {
	$.ajax({
		type:"GET",
		url:"waitCheck.jsp",
		success:function(data){
			var message = $("#message");
			if(parseInt(data))
				message[0].innerHTML = "대기자가 있습니다! 게임 시작을 눌러주세요.";
			else
				message[0].innerHTML = "게임 시작을 눌러, 대전 상대를 기다려주세요!";
		},
		error:function( xhr, status, error ){
			console.log(xhr + "\n" + status + "\n" + error);
		}
	});	
}, 1000);