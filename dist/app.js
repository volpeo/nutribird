(function() {
  var game, gameover_state, load_state, main_state, map, menu_state, score, startsWith, win_height, win_width;

  load_state = {
    preload: function() {
      var scaleManager;
      this.game.stage.backgroundColor = "#71c5cf";
      this.game.load.image("background", "assets/bg.png");
      this.game.load.image("game-over", "assets/game-over.png");
      this.game.load.image("bird1_idle", "assets/sprites/bird1_idle.png");
      this.game.load.image("bird1_fly", "assets/sprites/bird1_fly.png");
      this.game.load.image("bird2_idle", "assets/sprites/bird2_idle.png");
      this.game.load.image("bird2_fly", "assets/sprites/bird2_fly.png");
      this.game.load.image("bird3_idle", "assets/sprites/bird3_idle.png");
      this.game.load.image("bird3_fly", "assets/sprites/bird3_fly.png");
      this.game.load.image("pomme", "assets/items/pomme.png");
      this.game.load.image("aubergine", "assets/items/aubergine.png");
      this.game.load.image("banane", "assets/items/banane.png");
      this.game.load.image("orange", "assets/items/orange.png");
      this.game.load.image("tomate", "assets/items/tomate.png");
      this.game.load.image("carotte", "assets/items/carotte.png");
      this.game.load.image("s_marche", "assets/items/marche.png");
      this.game.load.image("s_tennis", "assets/items/tennis.png");
      this.game.load.image("s_basket", "assets/items/basket.png");
      this.game.load.image("b_soda", "assets/items/soda.png");
      this.game.load.image("b_hamburger", "assets/items/hamburger.png");
      this.game.load.image("b_frite", "assets/items/frite.png");
      this.game.load.image("b_canape", "assets/items/canape.png");
      this.game.load.image("retry", "assets/retry.png");
      this.game.load.audio('jump', ['assets/sounds/jump.mp3']);
      this.game.load.audio('miam', ['assets/sounds/miam.mp3']);
      scaleManager = new Phaser.ScaleManager(this.game, win_width, win_height);
      scaleManager.forcePortrait = true;
      scaleManager.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      scaleManager.setShowAll();
      return scaleManager.refresh();
    },
    create: function() {
      return this.game.state.start('menu');
    }
  };

  map = {
    pomme: {
      points: 5
    },
    aubergine: {
      points: 5
    },
    banane: {
      points: 5
    },
    orange: {
      points: 5
    },
    tomate: {
      points: 5
    },
    carotte: {
      points: 5
    },
    s_marche: {
      points: 15
    },
    s_tennis: {
      points: 30
    },
    s_basket: {
      points: 30
    },
    b_soda: {
      points: -10
    },
    b_hamburger: {
      points: -25
    },
    b_frite: {
      points: -20
    },
    b_canape: {
      points: -10
    }
  };

  startsWith = function(str, prefix) {
    return str.lastIndexOf(prefix, 0) === 0;
  };

  main_state = {
    create: function() {
      var space_key, style;
      this.background = game.add.tileSprite(0, 0, 2000, win_height, "background");
      this.current_bird = "bird1";
      this.bird = this.game.add.sprite(100, 245, this.current_bird + "_idle");
      this.bird.scale.x = this.bird.scale.y = 0.5;
      this.game.physics.enable(this.bird);
      this.bird.body.gravity.y = 1000;
      this.jump_sound = this.game.add.audio('jump');
      this.miam_sound = this.game.add.audio('miam');
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
      this.items.createMultiple(5, "carotte");
      this.items.createMultiple(5, "s_marche");
      this.items.createMultiple(5, "s_tennis");
      this.items.createMultiple(5, "s_basket");
      this.items.createMultiple(15, "b_soda");
      this.items.createMultiple(15, "b_hamburger");
      this.items.createMultiple(15, "b_frite");
      this.items.createMultiple(15, "b_canape");
      this.timer = this.game.time.events.loop(1500, this.add_one_item, this);
      this.score = 0;
      this.badItemsCount = 0;
      this.goodItemsCount = 0;
      this.goodFruitItemsCount = 0;
      this.goodSportItemsCount = 0;
      this.goodSportItemsCountScore = 0;
      this.bird_weight = 1;
      style = {
        font: "bold 30px Verdana",
        fill: "#F9B410",
        stroke: "#4D3305",
        strokeThickness: 5
      };
      this.label_score = this.game.add.text(20, 20, "0", style);
    },
    update: function() {
      if (this.bird.inWorld === false) {
        this.gameover();
      }
      if (this.bird.angle < 20) {
        this.bird.angle += 1;
      }
      this.background.tilePosition.x -= 1;
      return this.game.physics.arcade.overlap(this.bird, this.items, this.eat_item, null, this);
    },
    eat_item: function(bird, item) {
      if (this.bird.alive === false) {
        return;
      }
      this.miam_sound.play();
      item.kill();
      this.score = this.score + map[item.key].points;
      this.label_score.text = this.score;
      if (startsWith(item.key, 'b_')) {
        this.badItemsCount += 1;
        this.bird_weight += 1;
      } else {
        if (startsWith(item.key, 's_')) {
          this.goodSportItemsCount += 1;
          this.goodSportItemsCountScore = this.goodSportItemsCountScore + map[item.key].points;
        } else {
          this.goodFruitItemsCount += 1;
        }
        this.goodItemsCount += 1;
        this.bird_weight -= 1;
      }
      if (this.bird_weight === 0) {
        this.bird_weight = 1;
      }
      if (this.bird_weight === 4) {
        this.gameover();
      }
      this.current_bird = "bird" + this.bird_weight;
      this.bird.loadTexture(this.current_bird + "_idle");
      if (this.bird_weight === 1) {
        this.bird.body.gravity.y = 1000;
        this.bird.body.velocity.y = -350;
      }
      if (this.bird_weight === 2) {
        this.bird.body.gravity.y = 1500;
        this.bird.body.velocity.y = -200;
      }
      if (this.bird_weight === 3) {
        this.bird.body.gravity.y = 2000;
        return this.bird.body.velocity.y = -100;
      }
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
      if (this.bird.alive === false) {
        return;
      }
      this.jump_sound.play();
      this.bird.loadTexture(this.current_bird + "_fly");
      this.bird.body.velocity.y = -350;
      this.game.add.tween(this.bird).to({
        angle: -20
      }, 100).start();
      return this.game.time.events.add(200, function() {
        return this.bird.loadTexture(this.current_bird + "_idle");
      }, this);
    },
    gameover: function() {
      this.oldScore = window.localStorage.getItem("nutribird-score");
      window.localStorage.setItem("nutribird-current-score", this.score);
      if (this.oldScore !== null && this.oldScore < this.score) {
        window.localStorage.setItem("nutribird-score", this.score);
      }
      return this.game.state.start('gameover');
    }
  };

  menu_state = {
    create: function() {
      var button, score_label, style, text, x, y;
      button = game.add.button(game.world.centerX - 95, 400, 'tomate', this.start, this, 2, 1, 0);
      style = {
        font: "30px Arial",
        fill: "#ffffff"
      };
      x = game.world.width / 2;
      y = game.world.height / 2;
      text = this.game.add.text(x, y - 50, "Press space to start", style);
      text.anchor.setTo(0.5, 0.5);
      if (score > 0) {
        score_label = this.game.add.text(x, y + 50, "score: " + score, style);
        return score_label.anchor.setTo(0.5, 0.5);
      }
    },
    start: function() {
      return this.game.state.start('play');
    }
  };

  gameover_state = {
    create: function() {
      var argument, argument_style, best, best_score, best_score_label, button, current, current_score, current_score_label, style, x, y;
      this.background = game.add.tileSprite(0, 0, 2000, win_height, "game-over");
      button = game.add.button(game.world.centerX - 75, 550, 'retry', this.start, this, 2, 1, 0);
      style = {
        font: "bold 20px Verdana",
        fill: "#F9B410",
        stroke: "#4D3305",
        strokeThickness: 5
      };
      x = game.world.width / 2;
      y = game.world.height / 2;
      best = window.localStorage.getItem("nutribird-score");
      current = window.localStorage.getItem("nutribird-current-score");
      argument_style = {
        font: "bold 20px Verdana",
        fill: "#FFF",
        stroke: "#4D3305",
        strokeThickness: 5,
        align: "center"
      };
      argument = this.game.add.text(x, y + 0, "Rapelles-toi, \nPicAssiette doit bouger \net manger équilibré", argument_style);
      argument.anchor.setTo(0.5, 0.5);
      best_score_label = this.game.add.text(x, y + 90, "MEILLEUR SCORE", style);
      best_score_label.anchor.setTo(0.5, 0.5);
      best_score = this.game.add.text(x, y + 120, best, style);
      best_score.anchor.setTo(0.5, 0.5);
      current_score_label = this.game.add.text(x, y + 160, "TON SCORE", style);
      current_score_label.anchor.setTo(0.5, 0.5);
      current_score = this.game.add.text(x, y + 190, current, style);
      return current_score.anchor.setTo(0.5, 0.5);
    },
    start: function() {
      return this.game.state.start('play');
    }
  };

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

  win_width = 450;

  game = new Phaser.Game(win_width, win_height, Phaser.AUTO, 'game_div');

  score = 0;

  game.state.add('load', load_state);

  game.state.add('menu', menu_state);

  game.state.add('gameover', gameover_state);

  game.state.add('play', main_state);

  game.state.start('load');

}).call(this);
