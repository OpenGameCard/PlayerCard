parasails.registerPage('map', {
  data: {},
  beforeMount: function () {
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function () {
  },
  methods: {},
});


$(document).ready(function () {

  if (document.getElementById('map_editor')) {

    var Loader = {
      images: {}
    };

    Loader.loadImage = function (key, src) {
      var img = new Image();

      var d = new Promise(function (resolve, reject) {
        img.onload = function () {
          this.images[key] = img;
          resolve(img);
        }.bind(this);

        img.onerror = function () {
          reject('Could not load image: ' + src);
        };
      }.bind(this));

      img.src = src;
      return d;
    };

    Loader.getImage = function (key) {
      return (key in this.images) ? this.images[key] : null;
    };

    var Game = {};

    Game.run = function (context) {
      this.ctx = context;
      this._previousElapsed = 0;

      var p = this.load();
      Promise.all(p).then(function (loaded) {
        this.init();
        window.requestAnimationFrame(this.tick);
      }.bind(this));
    };

    Game.tick = function (elapsed) {
      window.requestAnimationFrame(this.tick);

      // clear previous frame
      this.ctx.clearRect(0, 0, 1025, 769);

      // compute delta time in seconds -- also cap it
      var delta = (elapsed - this._previousElapsed) / 1000.0;
      delta = Math.min(delta, 0.25); // maximum delta of 250 ms
      this._previousElapsed = elapsed;

      this.update(delta);
      this.render();
    }.bind(Game);

    var map = {
      cols: 32,
      rows: 24,
      tsize: 32,
      tiles: JSON.parse(SAILS_LOCALS.map.tiles[0].properties),
      getTile: function (col, row) {
        return this.tiles[row * map.cols + col];
      }
    };

    var command = '';
    var listOfElements = [];

    Game.load = function () {
      return [
        Loader.loadImage('tiles', '/images/steampunkish-tilea2.png'),
        // Loader.loadImage('character1', '/images/los-person05.png'),
        // Loader.loadImage('character2', '/images/Character.png'),
      ];
    };

    Game.init = function () {

      this.tileAtlas = Loader.getImage('tiles');
      this.character = [
        // Loader.getImage('character1'),
        // Loader.getImage('character2'),
      ];
    };

    Game.update = function (delta) {
    };

    Game.render = function () {
      for (var c = 0; c < map.cols; c++) {
        for (var r = 0; r < map.rows; r++) {
          var tile = map.getTile(c, r);
          if (tile !== null) { // 0 => empty tile
            this.ctx.drawImage(
              this.tileAtlas, // image
              (tile[0] - 1) * map.tsize, // source x
              (tile[1] - 1) * map.tsize, // source y
              map.tsize, // source width
              map.tsize, // source height
              c * map.tsize,  // target x
              r * map.tsize, // target y
              map.tsize, // target width
              map.tsize // target height
            );
          }
        }
      }

      // listOfElements.forEach(
      //   function (value, index) {
      //
      //     Game.ctx.drawImage(
      //       Game.character[index],
      //       0,
      //       0,
      //       map.tsize, // source width
      //       map.tsize * 1.5, // source height
      //       value[0],  // target x
      //       value[1] - map.tsize * 0.5, // target y
      //       map.tsize, // target width
      //       map.tsize * 1.5 // target height
      //     );
      //   }
      // );

      var width = map.cols * map.tsize;
      var height = map.rows * map.tsize;
      var x, y;
      for (var r = 0; r <= map.rows; r++) {
        x = 0;
        y = r * map.tsize;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineWidth = '0.5';
        this.ctx.opacity = '1';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineTo(width, y);
        this.ctx.stroke();
      }
      for (var c = 0; c <= map.cols; c++) {
        x = c * map.tsize;
        y = 0;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, height);
        this.ctx.stroke();
      }
    };

    /**
     * zapis właściwości mapy
     */
    $('.form-map').find('.form-control').bind('blur', function () {
      var id = $(this).attr('field_map_id');
      var name = $(this).attr('field_value_id');
      var value = $(this).val();

      $.post('update/single', {
        id: id,
        name: name,
        value: value,
      });
    });

    /**
     * Rysuje planszę do gry.
     */
    var context = document.getElementById('map_editor').getContext('2d');
    Game.run(context);


    $('#block_obstacle_1').click(function () {
      command = 'block_obstacle_1';
    });

    $('#block_grass_1').click(function () {
      command = 'block_grass_1';
    });

    /**
     * Chwyta kliknięcie w planszę i przekazuję koordynaty na endpoint.
     */
    $('#map_editor').click(function (event) {

      var X = Math.floor(event.offsetX / map.tsize + 1);
      var Y = Math.floor(event.offsetY / map.tsize + 1);

      let mapID = SAILS_LOCALS.map.id;

      $.post(
        '/command',
        {
          command: command,
          map: mapID,
          coordinates: {
            X: X,
            Y: Y,
          }
        },
        function (data) {

          if (data.request.command === 'block_obstacle_1') {
            map.tiles = data.tiles;
          }

          if (data.request.command === 'block_grass_1') {
            map.tiles = data.tiles;
          }
        });

    });
  }
});
