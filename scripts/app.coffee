(->
  s = ->
    scroll 0, 0  unless scrollY
    return
  return  if typeof scrollY is "undefined"
  addEventListener "load", s
  addEventListener "orientationchange", s
  return
)()

win_height = 654
win_width = 368

game = new Phaser.Game(win_width, win_height, Phaser.AUTO, 'game_div')

map={
  pomme :{points: 5},
  aubergine: {points: 5},
  banane : {points: 5},
  orange: {points: 5},
  tomate: {points: 5},
  carotte: {points: 5},
  marche: {points: 15},
  tennis: {points: 30},
  basket: {points: 30},
  b_soda: {points: -10},
  b_hamburger: {points: -25},
  b_frite: {points: -20},
  b_canape:{points: -10}
}


main_state = {

  preload: () ->
    this.game.stage.backgroundColor = "#71c5cf"

    this.game.load.image "bird", "assets/bird.png"
    this.game.load.image "background", "assets/bg.png"
    
    this.game.load.image "pomme", "assets/items/pomme.png"
    this.game.load.image "aubergine", "assets/items/aubergine.png"
    this.game.load.image "banane", "assets/items/banane.png"
    this.game.load.image "orange", "assets/items/orange.png"
    this.game.load.image "tomate", "assets/items/tomate.png"
    this.game.load.image "marche", "assets/items/marche.png"
    this.game.load.image "tennis", "assets/items/tennis.png"
    this.game.load.image "basket", "assets/items/basket.png"
    this.game.load.image "carotte", "assets/items/carotte.png"
    
    this.game.load.image "b_soda", "assets/items/soda.png"
    this.game.load.image "b_hamburger", "assets/items/hamburger.png"
    this.game.load.image "b_frite", "assets/items/frite.png"
    this.game.load.image "b_canape", "assets/items/canape.png"

    scaleManager = new Phaser.ScaleManager(this.game, win_width, win_height)

    scaleManager.forcePortrait = true
    scaleManager.scaleMode = Phaser.ScaleManager.SHOW_ALL

    scaleManager.setShowAll()
    scaleManager.refresh()
    return
    
  create: () ->
    this.background = game.add.tileSprite(0, 0, 2000, win_height, "background")
    
    this.bird = this.game.add.sprite(100, 245, "bird")
    this.bird.scale.x = this.bird.scale.y = 0.6

    this.game.physics.enable(this.bird)
    this.bird.body.gravity.y = 1000
    
    space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    space_key.onDown.add this.jump, this

    this.game.input.onDown.add( () ->
      this.jump()
    , this)
    
    # Create a group of 20 items
    this.items = game.add.group()
    
    this.items.createMultiple 5, "pomme"
    this.items.createMultiple 5, "aubergine"
    this.items.createMultiple 5, "banane"
    this.items.createMultiple 5, "orange"
    this.items.createMultiple 5, "tomate"
    this.items.createMultiple 5, "marche"
    this.items.createMultiple 5, "tennis"
    this.items.createMultiple 5, "basket"
    this.items.createMultiple 5, "carotte"
    this.items.createMultiple 15, "b_soda"
    this.items.createMultiple 15, "b_hamburger"
    this.items.createMultiple 15, "b_frite"
    this.items.createMultiple 15, "b_canape"

    this.timer = this.game.time.events.loop(1500, this.add_one_item, this)

    this.score = 0

    this.label_score = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" })
    return


  update: () ->
    if (this.bird.inWorld == false)
      this.restart_game()

    if (this.bird.angle < 20)
      this.bird.angle += 1

    this.background.tilePosition.x -= 1

    this.game.physics.arcade.overlap(this.bird, this.items, this.eat_item, null, this)


  eat_item: (bird, item) ->
    item.kill()
    this.score = this.score + map[item.key].points
    this.label_score.text = this.score

  add_one_item : () ->
    position = Math.floor(Math.random()*5)+1
    item = this.items.getRandom(0, this.items.length)
    this.game.physics.enable(item)
    item.reset(win_width, position*60+10)
    item.body.velocity.x = -200
    item.outOfBoundsKill = true

  jump: () ->
    this.bird.body.velocity.y = -350
    this.game.add.tween(this.bird).to({angle: -20}, 100).start()

  restart_game: () ->
    this.game.state.start('main')
};

game.state.add('main', main_state)
game.state.start('main')
