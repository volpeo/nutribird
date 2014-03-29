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
    },
    create: function() {
      var space_key;
      this.bird = this.game.add.sprite(100, 245, "bird");
      this.bird.body.gravity.y = 1000;
      space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      space_key.onDown.add(this.jump, this);
      this.pipes = game.add.group();
      this.pipes.createMultiple(20, "pipe");
      this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);
      this.score = 0;
      this.label_score = this.game.add.text(20, 20, "0", style);
    }
  };

  game.state.add('main', main_state);

  game.state.start('main');

}).call(this);
