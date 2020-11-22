function start_offline(){
    hideButtons()
    document.body.style.backgroundColor = "black"

    var firstBlock = document.createElement('div')
    firstBlock.style.backgroundColor = "white"
    firstBlock.style.width = "20px"
    firstBlock.style.height = "200px"
    firstBlock.style.left = "20px"
    firstBlock.style.position = "absolute"


    var secondBlock = document.createElement('div')
    secondBlock.style.backgroundColor = "white"
    secondBlock.style.width = "20px"
    secondBlock.style.height = "200px"
    secondBlock.style.right = "20px"
    secondBlock.style.position = "absolute"

    var player1Top = window.innerHeight/2 - 100
    var player2Top = window.innerHeight/2 - 100
    var moveSpeed = 20
    
    firstBlock.style.top = player1Top + "px"
    secondBlock.style.top = player2Top + "px"
    document.body.appendChild(firstBlock)
    document.body.appendChild(secondBlock)
    document.onkeydown = function(event){
        switch(event.keyCode){
            case 87:
                console.log("Player 1 Up")
                player1Top -= moveSpeed
                break
            case 83:
                console.log("Player 1 Down")
                player1Top += moveSpeed
                break
            case 38:
                console.log("Player 2 Up")                                                                         
                player2Top -= moveSpeed                                                                            
                break                                                                                              
            case 40:                                                                                               
                console.log("Player 2 Down")                                                                       
                player2Top += moveSpeed                                                                            
                break                                                                                              
        }                                                                                                          
        if(player1Top < 2)  player1Top = 2                                                                         
        if(player2Top < 2)  player2Top = 2                                                                         
        if(player1Top +  firstBlock.clientHeight + 2 > window.innerHeight)  player1Top = window.innerHeight - 2 - firstBlock.clientHeight                                                                                             
        if(player2Top +  secondBlock.clientHeight + 2 > window.innerHeight)  player2Top = window.innerHeight - 2 - secondBlock.clientHeight                                                                                           
        firstBlock.style.top = player1Top + "px"
        secondBlock.style.top = player2Top + "px"
    }

    var ball = document.createElement('div')
    ball.style.backgroundColor = "white"
    ball.style.width = "20px"
    ball.style.height = "20px"
    ball.style.position = "absolute"
    document.body.appendChild(ball)

    var vector = {
        x:Math.random() * 3 -1.5,
        y:Math.random() * 3 -1.5
    }
    var position = {
        x:Math.round(window.innerWidth/2),
        y:Math.round(window.innerHeight/2),
        add:function(vec){
            this.x += vec.x
            this.y += vec.y
        }
    }

    setInterval(function(){
        position.add(vector)
        ball.style.left = position.x + "px"
        ball.style.top = position.y + "px"

        //Autoplay **
        /*player1Top = position.y - 100 
        player2Top = position.y - 100 
        if(player1Top < 2)  player1Top = 2
        if(player2Top < 2)  player2Top = 2
        if(player1Top +  firstBlock.clientHeight + 2 > window.innerHeight)  player1Top = window.innerHeight - 2 - firstBlock.clientHeight
        if(player2Top +  secondBlock.clientHeight + 2 > window.innerHeight)  player2Top = window.innerHeight - 2 - secondBlock.clientHeight
        firstBlock.style.top = player1Top + "px"
        secondBlock.style.top = player2Top + "px"*/
        //Autoplay **


        var result = collisionDetection(ball,vector,firstBlock,secondBlock)
        if(result == "score"){
            position.x = Math.round(window.innerWidth/2)
            position.y = Math.round(window.innerHeight/2)
            if(ball.offsetLeft > window.innerWidth / 2) scareLeft += 1
            else scoreRight += 1
            score.innerHTML = scareLeft + " : " + scoreRight
            vector.x = Math.random() * 3 -1.5
            vector.y = Math.random() * 3 -1.5
        }else if(result == "bounce"){
            var signX =  vector.x > 0 ? 1 : -1
            var signY =  vector.y > 0 ? 1 : -1
            vector.x += 0.05 * signX
            vector.y += 0.05 * signY
        }
    },1)

    function collisionDetection(object,vec,first,second){
        var posX = object.offsetLeft
        var posY = object.offsetTop
        var dim = object.clientWidth

        var rangeStartFirst = first.offsetTop
        var rangeStartSecond = second.offsetTop
        var range = first.clientHeight
        var dimension = first.clientWidth

        var distanceFirst = first.offsetLeft
        var distanceSecond = second.offsetLeft

        var result = null

        if(posY + dim >= window.innerHeight) {
            vec.y *= -1
            result = "bounce"
        }

        if(posY < rangeStartFirst + range && posY > rangeStartFirst){
            if(posX - dim <= distanceFirst ) {
                vec.x *= -1
                result = "bounce"
            }
        }

        if(posX + dim >= window.innerWidth){ 
            result = "score"
        }
        
        if(posY <= 0) {
            vec.y *= -1
            result = "bounce"
        }

        if(posY < rangeStartSecond + range && posY > rangeStartSecond){
            if(posX + dim >= distanceSecond ) {
                vec.x *= -1
                result = "bounce"
            }
        }

        if(posX <= 0) {
            result = "score"
        }
        return result
    }

    var score = document.createElement('h1')
    var scareLeft = 0
    var scoreRight = 0
    score.style.color = "white"
    score.style.left = (window.innerWidth / 2 - 40) + "px"
    score.style.top = "20px"
    score.style.position = "absolute"
    score.innerHTML = "0 : 0"
    document.body.appendChild(score)

}

function start_online(){
    hideButtons()
    document.body.style.backgroundColor = "black"

    var bar_heigth = window.innerHeight / 100 * 30
    var ball_heigth = window.innerHeight / 100 * 2

    var firstBlock = document.createElement('div')
    firstBlock.style.backgroundColor = "white"
    firstBlock.style.width = "20px"
    firstBlock.style.height = bar_heigth + "px"
    firstBlock.style.left = "20px"
    firstBlock.style.position = "absolute"


    var secondBlock = document.createElement('div')
    secondBlock.style.backgroundColor = "white"
    secondBlock.style.width = "20px"
    secondBlock.style.height = bar_heigth + "px"
    secondBlock.style.right = "20px"
    secondBlock.style.position = "absolute"

    var player1Top = window.innerHeight/2 - bar_heigth /2
    var player2Top = window.innerHeight/2 - bar_heigth /2
    
    firstBlock.style.top = player1Top + "px"
    secondBlock.style.top = player2Top + "px"
    document.body.appendChild(firstBlock)
    document.body.appendChild(secondBlock)

    var ball = document.createElement('div')
    ball.style.backgroundColor = "white"
    ball.style.width = ball_heigth +"px"
    ball.style.height = ball_heigth +"px"
    ball.style.position = "absolute"
    document.body.appendChild(ball)

    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var response = this.responseText
        var obj = JSON.parse(response);
        console.log(obj)
        firstBlock.style.top = ((obj.p1 / 100) * window.innerHeight - bar_heigth / 2) + "px"
        secondBlock.style.top = ((obj.p2 / 100) * window.innerHeight - bar_heigth / 2) + "px"

        ball.style.left = ((obj.ball_x / 100) * window.innerWidth - ball_heigth / 2)  + "px"
        ball.style.top = ((obj.ball_y / 100) * window.innerHeight - ball_heigth / 2)  + "px"
    };
    xhttp.open("GET", "join", true);
    xhttp.send();
    
    setInterval(function(){
        xhttp.open("GET", "update", true);
        xhttp.send();
    },1000)
    document.onkeydown = function(event){
        var down = 0,up = 0;
        switch(event.key){
            case "w":
            case "ArrowUp":
                down = 1
                break
            case "s":
            case "ArrowDown":
                up = 1;
                break

        }
        if(up) xhttp.open("GET", "update?top", true);
        if(down) xhttp.open("GET", "update?bot", true);
        xhttp.send();

    }
}
function hideButtons(){
    document.getElementById("button_online").style.visibility = "hidden"
    document.getElementById("button_offline").style.visibility = "hidden"
}
