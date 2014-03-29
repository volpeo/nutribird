game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

main_state = {

  preload: () ->
    this.game.stage.backgroundColor = "#71c5cf"
    this.game.load.image "bird", "assets/bird.png"
    this.game.load.image "pipe", "assets/pipe.png"
    return    
    
  create: () ->
    
    this.bird = this.game.add.sprite(100, 245, "bird")
    this.game.physics.enable(this.bird)
    this.bird.body.gravity.y = 1000
    
    space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    space_key.onDown.add this.jump, this

    this.game.input.onTap.add( () ->
        this.jump()
    , this)
    
    # Create a group of 20 pipes
    # this.pipes = game.add.group()
    # this.pipes.createMultiple 20, "pipe"
    
    # Timer that calls 'add_row_of_pipes' ever 1.5 seconds
    # this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this)
    
    # Add a score label on the top left of the screen
  	# this.score = 0
   #    style =
  	# 	font: "30px Arial"
  	# 	fill: "#ffffff"
    
    # this.label_score = this.game.add.text(20, 20, "0", style)
    return

  update: () ->
    if (this.bird.inWorld == false)
      this.restart_game();

  jump: () ->
    this.bird.body.velocity.y = -350

  restart_game: () ->
    this.game.state.start('main')

};

game.state.add('main', main_state);
game.state.start('main');








