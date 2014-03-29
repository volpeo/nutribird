(->
  s = ->
    scroll 0, 0  unless scrollY
    return
  return  if typeof scrollY is "undefined"
  addEventListener "load", s
  addEventListener "orientationchange", s
  return
)()

winW = document.body.offsetWidth;
winH = document.body.offsetHeight;

game = new Phaser.Game(winW, winH, Phaser.AUTO, 'game_div');

main_state = {

  preload: () ->
    this.game.stage.backgroundColor = "#71c5cf"
    this.game.load.image "bird", "assets/bird.png"
    this.game.load.image "item", "assets/pipe.png"
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
    
    # Create a group of 20 items
    this.items = game.add.group()
    this.items.createMultiple 20, "item"
    
    this.timer = this.game.time.events.loop(1500, this.add_one_item, this)
    
    # Add a score label on the top left of the screen
  	# this.score = 0
   #    style =
  	# 	font: "30px Arial"
  	# 	fill: "#ffffff"
    
    # this.label_score = this.game.add.text(20, 20, "0", style)
    return

  update: () ->
    if (this.bird.inWorld == false)
      this.restart_game()

    if (this.bird.angle < 20)
      this.bird.angle += 1

    this.game.physics.arcade.overlap(this.bird, this.items, this.eat_item, null, this)


  eat_item: (bird, item) ->
    item.kill()

  add_one_item : () -> 
    position = Math.floor(Math.random()*5)+1
    item = this.items.getFirstDead()
    this.game.physics.enable(item)
    item.reset(400, position*60+10)
    item.body.velocity.x = -200
    item.outOfBoundsKill = true

  jump: () ->
    this.bird.body.velocity.y = -350
    this.game.add.tween(this.bird).to({angle: -20}, 100).start()

  restart_game: () ->
    this.game.state.start('main')

};

game.state.add('main', main_state);
game.state.start('main');








