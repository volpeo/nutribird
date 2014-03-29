(function() {
  var game, main_state, map, win_height, win_width;

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

  win_height = 654;

  win_width = 368;

  game = new Phaser.Game(win_width, win_height, Phaser.AUTO, 'game_div');

  map = {};

  map["pomme"] = {
    points: 5
  };

  map["aubergine"] = {
    points: 5
  };

  map["banane"] = {
    points: 5
  };

  map["orange"] = {
    points: 5
  };

  map["tomate"] = {
    points: 5
  };

  map["marche"] = {
    points: 5
  };

  map["tennis"] = {
    points: 30
  };

  map["velo"] = {
    points: 30
  };

  map["b-soda"] = {
    points: -10
  };

  map["b-hamburger"] = {
    points: -25
  };

  map["b-frite"] = {
    points: -20
  };

  map["b-canape"] = {
    points: -10
  };

  main_state = {
    preload: function() {
      var scaleManager;
      this.game.stage.backgroundColor = "#71c5cf";
      this.game.load.image("bird", "assets/bird.png");
      this.game.load.image("item", "assets/pipe.png");
      this.game.load.image("baditem", "assets/item-red.png");
      this.game.load.image("pomme", "assets/pomme.png");
      this.game.load.image("aubergine", "assets/aubergine.png");
      this.game.load.image("banane", "assets/banane.png");
      this.game.load.image("orange", "assets/orange.png");
      this.game.load.image("tomate", "assets/tomate.png");
      this.game.load.image("marche", "assets/marche.png");
      this.game.load.image("tennis", "assets/tennis.png");
      this.game.load.image("velo", "assets/velo.png");
      this.game.load.image("b-soda", "assets/soda.png");
      this.game.load.image("b-hamburger", "assets/hamburger.png");
      this.game.load.image("b-frite", "assets/frite.png");
      this.game.load.image("b-canape", "assets/canape.png");
      this.game.load.image("background", "assets/bg.png");
      scaleManager = new Phaser.ScaleManager(this.game, win_width, win_height);
      scaleManager.forcePortrait = true;
      scaleManager.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      scaleManager.setShowAll();
      scaleManager.refresh();
    },
    create: function() {
      var space_key;
      this.background = game.add.tileSprite(0, 0, 2000, win_height, "background");
      this.bird = this.game.add.sprite(100, 245, "bird");
      this.bird.scale.x = this.bird.scale.y = 0.6;
      this.game.physics.enable(this.bird);
      this.bird.body.gravity.y = 1000;
      space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      space_key.onDown.add(this.jump, this);
      this.game.input.onDown.add(function() {
        return this.jump();
      }, this);
      this.items = game.add.group();
      this.items.createMultiple(5, "pomme");
      this.items.createMultiple(5, "aubergine");
      this.items.createMultiple(5, "banane");
      this.items.createMultiple(5, "orange");
      this.items.createMultiple(5, "tomate");
      this.items.createMultiple(5, "marche");
      this.items.createMultiple(5, "tennis");
      this.items.createMultiple(5, "velo");
      this.items.createMultiple(15, "b-soda");
      this.items.createMultiple(15, "b-hamburger");
      this.items.createMultiple(15, "b-frite");
      this.items.createMultiple(15, "b-canape");
      this.timer = this.game.time.events.loop(1500, this.add_one_item, this);
      this.score = 0;
      this.label_score = this.game.add.text(20, 20, "0", {
        font: "30px Arial",
        fill: "#ffffff"
      });
    },
    update: function() {
      if (this.bird.inWorld === false) {
        this.restart_game();
      }
      if (this.bird.angle < 20) {
        this.bird.angle += 1;
      }
      this.background.tilePosition.x -= 1;
      return this.game.physics.arcade.overlap(this.bird, this.items, this.eat_item, null, this);
    },
    eat_item: function(bird, item) {
      item.kill();
      this.score = this.score + map[item.key].points;
      return this.label_score.text = this.score;
    },
    add_one_item: function() {
      var item, position;
      position = Math.floor(Math.random() * 5) + 1;
      item = this.items.getRandom(0, this.items.length);
      this.game.physics.enable(item);
      item.reset(win_width, position * 60 + 10);
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
