(function() {
  var game, main_state;

  console.log("coucou :)");

  console.log("gniii");

  game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

  main_state = {
    preload: function() {
      this.game.stage.backgroundColor = "#71c5cf";
      this.game.load.image("bird", "assets/bird.png");
      this.game.load.image("pipe", "assets/pipe.png");
    }
  };

  game.state.add('main', main_state);

  game.state.start('main');

}).call(this);
