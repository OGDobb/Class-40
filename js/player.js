class Player{
    constructor(){
        this.name = "";
        this.distance = 0;
        this.index = 0;
        this.rank = 0;
    }

    getCount(){
       var  getCountRef = db.ref("playerCount");
       getCountRef.on("value", function(data){
        playerCount=data.val();
       });
       
       
    }

    updateCount(countValue){
        var dataRef = db.ref("/");
        dataRef.update({
            playerCount : countValue
        });
    }

    update() {
        var dbRef = db.ref("players/player" + player.index);
        console.log(player);
        dbRef.set({
            name : player.name,
            distance : player.distance,
            rank : player.rank
        });
    }

     static readPlayersDetails() {
        var playersRef = db.ref("players");
        playersRef.on("value", function(data){
            allPlayers = data.val();
        });
    }

     static getCarsAtEnd() {
        var carsRef = db.ref("carsAtEnd");
        carsRef.on("value", function(data){
            carsRank = data.val();
        });
    }

         static updateCarsAtEnd(value) {
            var updateCars = db.ref("/");
            updateCars.update({
                carsAtEnd : value
            });
    }
}

