gameover_state =
  create: () ->

    button = game.add.button(game.world.centerX - 95, 400, 'tomate', this.start, this, 2, 1, 0);

    style = { font: "30px Arial", fill: "#ffffff" }
    x = game.world.width/2
    y = game.world.height/2

    text = this.game.add.text(x, y-50, "GameOver!", style)
    text.anchor.setTo 0.5, 0.5

    if (score > 0)
      score_label = this.game.add.text x, y+50, "score: " + score, style
      score_label.anchor.setTo 0.5, 0.5

  start: () ->
    this.game.state.start('play');