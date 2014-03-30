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
win_width = 450

game = new Phaser.Game(win_width, win_height, Phaser.AUTO, 'game_div')

score = 0

game.state.add('load', load_state)
game.state.add('menu', menu_state)
game.state.add('gameover', gameover_state)
game.state.add('play', main_state)

game.state.start('load');