gameover_state =
  create: () ->
    this.background = game.add.tileSprite(0, 0, 2000, win_height, "game-over")
    button = game.add.button(game.world.centerX - 75, 550, 'retry', this.start, this, 2, 1, 0);

    style = { font: "bold 20px Verdana", fill: "#F9B410", stroke: "#4D3305", strokeThickness: 5 }
    
    x = game.world.width/2
    y = game.world.height/2

    best = window.localStorage.getItem("nutribird-score")
    current = window.localStorage.getItem("nutribird-current-score")

    argument_style = { font: "bold 20px Verdana", fill: "#FFF", align: "center" }
    argument = this.game.add.text(x, y + 0, "Rapelles-toi, \nPicAssiette doit bouger \net manger équilibré", argument_style)
    argument.anchor.setTo 0.5, 0.5

    best_score_label = this.game.add.text(x, y + 90, "MEILLEUR SCORE", style)
    best_score_label.anchor.setTo 0.5, 0.5

    best_score = this.game.add.text x, y + 120, best, style
    best_score.anchor.setTo 0.5, 0.5

    current_score_label = this.game.add.text x, y + 160, "TON SCORE", style
    current_score_label.anchor.setTo 0.5, 0.5

    current_score = this.game.add.text x, y + 190, current, style
    current_score.anchor.setTo 0.5, 0.5

  start: () ->
    this.game.state.start('play');