class Form{
    constructor(){
        this.title = createElement("h1", "Racing Game");
        this.title.position(windowWidth/2 - 50, 50);

        this.input = createInput("");
        this.input.position(windowWidth/2 - 50, 200);

        this.button = createButton("Play");
        this.button.position(windowWidth/2 - 50, 250);

        this.greeting = createElement("h3");
        this.greeting.position(windowWidth/2 - 50, 250);

        this.reset = createButton("Reset");
        this.reset.position(50, 150);
    }

    display() {
        // Pressing the button invoked it. Actual caller - button
        // input, button and greeting - properties of form object. 
        // We want "this" to be referring to the form (owner) rather than the button (caller)

        // Normal function : function() { -----------> this refers to the caller
        // Arrow function : () => { ------------------> this refers to the owner

        this.button.mousePressed(() => {
            this.input.hide();  
            this.button.hide();

            player.name = this.input.value();
            this.greeting.html("Hi " + player.name + "..... Wait for other players to join...");
            
            playerCount += 1; //playerCount = playerCount + 1; playerCount++;
            player.updateCount(playerCount);
            player.index = playerCount;
            console.log(player.index);
            player.update();
        });

        this.reset.mousePressed(function(){
            game.updateState(0);
            player.updateCount(0);
            Player.updateCarsAtEnd(0);
        })

        
    }
}