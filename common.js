//Backspace, F5, Ctrl + r 새로고침 막기   http://pyonji.tistory.com/18
$(document).keydown(function(e) {
    key = (e) ? e.keyCode : event.keyCode;
     
    var t = document.activeElement;
     
    if (key == 8 || key == 116 || key == 17 || key == 82) {
        if (key == 8) {
            if (t.tagName != "INPUT") {
                if (e) {
                    e.preventDefault();
                } else {
                    event.keyCode = 0;
                    event.returnValue = false;
                }
            }
        } else {
            if (e) {
                e.preventDefault();
            } else {
                event.keyCode = 0;
                event.returnValue = false;
            }
        }
    }
});

// 사운드 재생 http://zzino.co.kr/blog/?p=292
var player = new Audio('');
function soundPlay(URL){
        if(player.paused || url != player.src){
                if(player.canPlayType('audio/mp3')){
                        player.src = URL;
                }
                player.play();
        }else{
                player.pause();
            player.currentTIme = 0;
        }
}

function waitPlayer () {
    $.ajax({
        type:"GET",
        url:"waitPlayer.jsp",
        success:function(data){
            if(parseInt(data))
                location.replace("battleship.jsp");
        },
        error:function( xhr, status, error ){
            console.log(xhr + "\n" + status + "\n" + error);
        }
    }); 
}