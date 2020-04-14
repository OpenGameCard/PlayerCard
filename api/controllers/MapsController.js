/**
 * MapsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  _config: {
    actions: true,
    shortcuts: false,
    rest: true
  },

  show: async function (req, res) {

    var maps = await Maps.find({
        where: {
          id: req.params.mapId,
        },
        limit: 1
      })
      .populate('pawns')
      .populate('tiles');

    return res.view('pages/map', {
      map: maps[0],
    });
  },

  new: async function (req, res) {

    var _newMap;

    _newMap = await Maps.create({
      name: 'Przykładowa mapa',
      owner: req.params.gameId,
    }).fetch();

    var tiles = [];
    var i = 0;
    for (i = 0; i < (32 * 24); i++) {
      tiles.push([1, 1]);
    }

    await Tiles.create({
      properties: JSON.stringify(tiles),
      owner: _newMap.id,
    }).fetch();

    await Pawns.create({
      properties: JSON.stringify([]),
      owner: _newMap.id,
    }).fetch();

    return res.redirect('/game/show/' + req.params.gameId + '/map/' + _newMap.id + '/show');
  },

  load: async function (req, res) {

    var map = await Maps
      .findOne({
        id: req.params.mapId
      })
      .populate('pawns')
      .populate('tiles');

    return res.json({
      map: map,
    });
  },

  update: async function (req, res) {

    await Maps
      .update({
        id: req.params.mapId,
      })
      .set({
        properties: req.body.properties
      })
      .fetch();

    return res.status(201).json({
      status: 'ok!',
    });
  },

  updateSingle: async function (req, res) {

    var value = null;

    if (req.body.value) {
      value = req.body.value;
    } else {
      value = null;
    }

    var obj = {};
    obj[req.body.name] = value;
    await Maps
      .update({
        id: req.body.id
      })
      .set(obj)
      .fetch();

    return res.status(201).json({
      status: 'ok!',
    });
  },
};
