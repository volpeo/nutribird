load_state =
  preload: () ->
    this.game.stage.backgroundColor = "#71c5cf"

    this.game.load.image "background", "assets/bg.png"

    this.game.load.image "game-over", "assets/game-over.png"

    this.game.load.image "bird1_idle", "assets/sprites/bird1_idle.png"
    this.game.load.image "bird1_fly", "assets/sprites/bird1_fly.png"
    this.game.load.image "bird2_idle", "assets/sprites/bird2_idle.png"
    this.game.load.image "bird2_fly", "assets/sprites/bird2_fly.png"
    this.game.load.image "bird3_idle", "assets/sprites/bird3_idle.png"
    this.game.load.image "bird3_fly", "assets/sprites/bird3_fly.png"

    this.game.load.image "pomme", "assets/items/pomme.png"
    this.game.load.image "aubergine", "assets/items/aubergine.png"
    this.game.load.image "banane", "assets/items/banane.png"
    this.game.load.image "orange", "assets/items/orange.png"
    this.game.load.image "tomate", "assets/items/tomate.png"
    this.game.load.image "carotte", "assets/items/carotte.png"

    this.game.load.image "s_marche", "assets/items/marche.png"
    this.game.load.image "s_tennis", "assets/items/tennis.png"
    this.game.load.image "s_basket", "assets/items/basket.png"

    this.game.load.image "b_soda", "assets/items/soda.png"
    this.game.load.image "b_hamburger", "assets/items/hamburger.png"
    this.game.load.image "b_frite", "assets/items/frite.png"
    this.game.load.image "b_canape", "assets/items/canape.png"

    this.game.load.image "retry", "assets/retry.png"

    this.game.load.audio('jump', ['assets/sounds/jump.mp3']);
    this.game.load.audio('miam', ['assets/sounds/miam.mp3']);

    scaleManager = new Phaser.ScaleManager(this.game, win_width, win_height)

    scaleManager.forcePortrait = true
    scaleManager.scaleMode = Phaser.ScaleManager.SHOW_ALL

    scaleManager.setShowAll()
    scaleManager.refresh()

  create: () ->
    this.game.state.start 'menu'