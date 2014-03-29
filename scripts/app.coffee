console.log "coucou :)"

console.log "gniii"


game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

main_state = {
	# Function called first to load all the assets
	preload: ->
	  
	  # Change the background color of the game
	  @game.stage.backgroundColor = "#71c5cf"
	  
	  # Load the bird sprite
	  @game.load.image "bird", "assets/bird.png"
	  
	  # Load the pipe sprite
	  @game.load.image "pipe", "assets/pipe.png"
	  return
	
	
  # Fuction called after 'preload' to setup the game
  create: ->
    
    # Display the bird on the screen
    @bird = @game.add.sprite(100, 245, "bird")
    
    # Add gravity to the bird to make it fall
    @bird.body.gravity.y = 1000
    
    # Call the 'jump' function when the spacekey is hit
    space_key = @game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    space_key.onDown.add @jump, this
    
    # Create a group of 20 pipes
    @pipes = game.add.group()
    @pipes.createMultiple 20, "pipe"
    
    # Timer that calls 'add_row_of_pipes' ever 1.5 seconds
    @timer = @game.time.events.loop(1500, @add_row_of_pipes, this)
    
    # Add a score label on the top left of the screen
	@score = 0
    style =
		font: "30px Arial"
		fill: "#ffffff"
  
    @label_score = @game.add.text(20, 20, "0", style)
    return

};

game.state.add('main', main_state);
game.state.start('main');








