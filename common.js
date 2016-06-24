/*
Backspace, F5, Ctrl + r 새로고침 막기
http://pyonji.tistory.com/18
*/
/*$(document).keydown(function(e) {
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
});*/

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