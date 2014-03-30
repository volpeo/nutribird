menu_state =
  create: () ->

    this.background = game.add.tileSprite(0, 0, win_width, win_height, "home")

    button = game.add.button(game.world.centerX - 78.5, 500, 'play_btn', this.start, this, 2, 1, 0);

    style = { font: "bold 30px Verdana", fill: "#f9b410", align: "center", stroke: "#4d3305", strokeThickness: 5 }
    x = game.world.width/2
    y = game.world.height/2

    text = this.game.add.text(x, y + 70, "Fais manger et bouger\nPicAssiette !", style)
    text.anchor.setTo 0.5, 0.5

  start: () ->
    this.game.state.start('play');