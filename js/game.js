class Game{
    constructor(){}

    getState(){
        var gameStateRef = db.ref("gameState");
        gameStateRef.on("value", function(data) {
            gameState = data.val();
        });
    }
    
    updateState(stateValue){
        var dbRef = db.ref("/");
        dbRef.update({
            gameState : stateValue
        });
    }

    start() {
        if(gameState === 0) {
            player = new Player();
            player.getCount();
            form = new Form();
            form.display();
        }

        car1 = createSprite(windowWidth/2 - 450, 0);
        car1.addImage("car1", car1Img);
        car2 = createSprite(windowWidth/2 - 150, 0);
        car2.addImage("car2", car2Img);
        car3 = createSprite(windowWidth/2 + 150, 0);
        car3.addImage("car3", car3Img);
        car4 = createSprite(windowWidth/2 + 450, 0);
        car4.addImage("car4", car4Img);
        cars=[car1,car2,car3,car4];
        
    }

    // distance    yPos
    //   0         height 
    //   50        height - distance

    play() {
        // hide the greeting
        form.greeting.hide();

        Player.readPlayersDetails();
        Player.getCarsAtEnd();
        console.log(allPlayers);

        if(allPlayers !== undefined) {
            background(groundImg);
            image(trackImg,0, -windowHeight * 4, windowWidth, windowHeight * 5 );
            var yPos = 100;
            var index = 0;
            for(var plr in allPlayers) {
                yPos = windowHeight - 50 - allPlayers[plr].distance;
                cars[index].y = yPos;
                if(plr === "player" + player.index) {
                    fill("green");
                    ellipse(cars[index].x,cars[index].y,100,100);
                    camera.position.x = windowWidth/2;
                    camera.position.y = cars[index].y;
                } else {
                    // fill("black");
                    cars[index].shapeColor="blue"
                }

                // textSize(15);
                // text(allPlayers[plr].name + " : " + allPlayers[plr].distance, 120, yPos);
                // yPos += 20;
                index += 1;
            }
        }

        if(keyDown(UP_ARROW)){
            player.distance += 50;
            player.update();
        }

        if(player.distance > 4500) {
            gameState = 2;
            player.rank=carsRank+1;
            Player.updateCarsAtEnd(player.rank);
            player.update();
        }

        
        drawSprites();
    }
    
    end() {
        if(endMsgWrite) {
            fill("black")
            textSize(100);
            text("Game Over! Your Rank:" + player.rank, windowWidth/2 - 275, -windowHeight * 4);
            endMsgWrite = false;
        } 

    }

    showLeaderboard() {
        if(leaderboardWriter) {
        Player.readPlayersDetails();
        var x=windowWidth/2;
        var y=-windowHeight*4+300;
        for (var plr in allPlayers){
            fill("Red");
            textSize(50);
            text(allPlayers[plr].name + " : " + allPlayers[plr].rank, x, y);
            y=y+100;
            console.log("showBoard");

        }
        leaderboardWriter = false;
      }
    }
}


// var allPlayers = {
//     player1 : {
//         name : "A",
//         distance : 0
//     },
//     player2 : {
//         name : "A",
//         distance : 0
//     },
//     player3 : {
//         name : "A",
//         distance : 0
//     },
//     player4 : {
//         name : "A",
//         distance : 0
//     }
// }

