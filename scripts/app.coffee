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
	
	
	
};

game.state.add('main', main_state);
game.state.start('main');








