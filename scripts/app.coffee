map = {
  pomme :{points: 5},
  aubergine: {points: 5},
  banane : {points: 5},
  orange: {points: 5},
  tomate: {points: 5},
  carotte: {points: 5},
  s_marche: {points: 15},
  s_tennis: {points: 30},
  s_basket: {points: 30},
  b_soda: {points: -10},
  b_hamburger: {points: -25},
  b_frite: {points: -20},
  b_canape:{points: -10}
}

startsWith = (str, prefix) ->
  str.lastIndexOf(prefix, 0) is 0
  
main_state = {

  create: () ->
    this.background = game.add.tileSprite(0, 0, 2000, win_height, "background")
    
    this.current_bird = "bird1"
    this.bird = this.game.add.sprite(100, 245, this.current_bird + "_idle")
    this.bird.scale.x = this.bird.scale.y = 0.5

    this.game.physics.enable(this.bird)
    this.bird.body.gravity.y = 1000

    this.jump_sound = this.game.add.audio('jump')
    this.miam_sound = this.game.add.audio('miam')
    this.dead_sound = this.game.add.audio('dead')
    this.boom_sound = this.game.add.audio('boom')

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
    this.items.createMultiple 5, "carotte"
    this.items.createMultiple 5, "s_marche"
    this.items.createMultiple 5, "s_tennis"
    this.items.createMultiple 5, "s_basket"
    this.items.createMultiple 15, "b_soda"
    this.items.createMultiple 15, "b_hamburger"
    this.items.createMultiple 15, "b_frite"
    this.items.createMultiple 15, "b_canape"

    this.timer = this.game.time.events.loop(1500, this.add_one_item, this)

    this.score = 0
    this.badItemsCount = 0
    this.goodItemsCount = 0
    this.goodFruitItemsCount = 0
    this.goodSportItemsCount = 0
    this.goodSportItemsCountScore = 0
    this.bird_weight = 1

    style = { font: "bold 30px Verdana", fill: "#F9B410", stroke: "#4D3305", strokeThickness: 5 }
    this.label_score = this.game.add.text(20, 20, "0", style)
    return


  update: () ->
    if (this.bird.inWorld == false)
      this.dead_sound.play()
      this.gameover()

    if (this.bird.angle < 20)
      this.bird.angle += 1

    this.background.tilePosition.x -= 1

    this.game.physics.arcade.overlap(this.bird, this.items, this.eat_item, null, this)


  
  eat_item: (bird, item) ->
    if (this.bird.alive == false)
      return;

    this.miam_sound.play()
    item.kill()
    this.score = this.score + map[item.key].points
    this.label_score.text = this.score
    if (startsWith(item.key, 'b_'))
      this.badItemsCount += 1
      this.bird_weight += 1
    else
      if (startsWith(item.key,'s_'))
        this.goodSportItemsCount += 1
        this.goodSportItemsCountScore = this.goodSportItemsCountScore + map[item.key].points
      else
        this.goodFruitItemsCount += 1
      this.goodItemsCount += 1
      this.bird_weight -= 1

    if (this.bird_weight == 0)
      this.bird_weight = 1
    if (this.bird_weight == 4)
      this.boom_sound.play()
      this.gameover()

    this.current_bird = "bird" + this.bird_weight
    this.bird.loadTexture(this.current_bird + "_idle")

    if this.bird_weight == 1
      this.bird.body.gravity.y = 1000
      this.bird.body.velocity.y = -350

    if this.bird_weight == 2
      this.bird.body.gravity.y = 1500
      this.bird.body.velocity.y = -200

    if this.bird_weight == 3
      this.bird.body.gravity.y = 2000
      this.bird.body.velocity.y = -100

  add_one_item : () ->
    position = Math.floor(Math.random()*5)+1
    item = this.items.getRandom(0, this.items.length)
    this.game.physics.enable(item)
    item.reset(win_width, position*60+10)
    item.body.velocity.x = -200
    item.outOfBoundsKill = true

  jump: () ->
    if (this.bird.alive == false)
      return;

    this.jump_sound.play()
    this.bird.loadTexture(this.current_bird + "_fly")
    this.bird.body.velocity.y = -350
    this.game.add.tween(this.bird).to({angle: -20}, 100).start()
    this.game.time.events.add(200, () ->
      this.bird.loadTexture(this.current_bird + "_idle")
    , this);


  gameover: () ->

    this.oldScore = window.localStorage.getItem("nutribird-score")

    window.localStorage.setItem("nutribird-current-score", this.score)

    if (this.oldScore == null)
      window.localStorage.setItem("nutribird-score", 0)

    if(this.oldScore != null && this.oldScore < this.score)
      window.localStorage.setItem("nutribird-score", this.score)

    this.game.state.start('gameover')
    
    
}
