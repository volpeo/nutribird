(function() {
  var game, main_state, winH, winW;

  (function() {
    var s;
    s = function() {
      if (!scrollY) {
        scroll(0, 0);
      }
    };
    if (typeof scrollY === "undefined") {
      return;
    }
    addEventListener("load", s);
    addEventListener("orientationchange", s);
  })();

  winW = document.body.offsetWidth;

  winH = document.body.offsetHeight;

  game = new Phaser.Game(winW, winH, Phaser.AUTO, 'game_div');

  main_state = {
    preload: function() {
      this.game.stage.backgroundColor = "#71c5cf";
      this.game.load.image("bird", "assets/bird.png");
      this.game.load.image("item", "assets/pipe.png");
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
      this.items = game.add.group();
      this.items.createMultiple(20, "item");
      this.timer = this.game.time.events.loop(1500, this.add_one_item, this);
    },
    update: function() {
      if (this.bird.inWorld === false) {
        this.restart_game();
      }
      if (this.bird.angle < 20) {
        this.bird.angle += 1;
      }
      return this.game.physics.arcade.overlap(this.bird, this.items, this.eat_item, null, this);
    },
    eat_item: function(bird, item) {
      return item.kill();
    },
    add_one_item: function() {
      var item, position;
      position = Math.floor(Math.random() * 5) + 1;
      item = this.items.getFirstDead();
      this.game.physics.enable(item);
      item.reset(400, position * 60 + 10);
      item.body.velocity.x = -200;
      return item.outOfBoundsKill = true;
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
