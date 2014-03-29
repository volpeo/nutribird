(function() {
  var game, main_state;

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
      this.game.physics.enable(this.bird);
      this.bird.body.gravity.y = 1000;
      space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      space_key.onDown.add(this.jump, this);
      this.game.input.onTap.add(function() {
        return this.jump();
      }, this);
    },
    update: function() {
      if (this.bird.inWorld === false) {
        this.restart_game();
      }
      if (this.bird.angle < 20) {
        return this.bird.angle += 1;
      }
    },
    jump: function() {
      this.bird.body.velocity.y = -350;
      return this.game.add.tween(this.bird).to({
        angle: -20
      }, 100).start();
    },
    restart_game: function() {
      return this.game.state.start('main');
    }
  };

  game.state.add('main', main_state);

  game.state.start('main');

}).call(this);
