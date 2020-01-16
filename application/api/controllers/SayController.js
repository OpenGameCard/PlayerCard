/**
 * SayController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  command: async function (req, res) {

    var map = null;
    var tiles = null;

    switch (req.body.command) {

      case 'block_obstacle_1':
        map = await Maps
          .find({
            where: {
              id: req.body.map,
            },
            limit: 1
          })
          .populate('pawns')
          .populate('tiles');

        tiles = JSON.parse(map[0].tiles[0].properties);
        tiles[(req.body.coordinates.Y - 1) * 32 + (req.body.coordinates.X - 1)] = [7, 4];

        await Tiles
          .update({
            id: map[0].tiles[0].id
          })
          .set({
            properties: JSON.stringify(tiles)
          })
          .fetch();

        break;


      case 'block_grass_1':
        map = await Maps
          .find({
            where: {
              id: req.body.map,
            },
            limit: 1
          })
          .populate('pawns')
          .populate('tiles');

        tiles = JSON.parse(map[0].tiles[0].properties);
        tiles[(req.body.coordinates.Y - 1) * 32 + (req.body.coordinates.X - 1)] = [1, 1];

        await Tiles
          .update({
            id: map[0].tiles[0].id
          })
          .set({
            properties: JSON.stringify(tiles)
          })
          .fetch();

        break;
    }

    return res.json({
      request: req.body,
      tiles: tiles
    });
  },

  saveCharacterOnMap: async function (req, res) {

    let map = req.body.map;

    if (req.body.pawns) {

      let pawns = req.body.pawns;

      map = await Maps
        .findOne({
          id: map.id
        })
        .populate('pawns')
        .populate('tiles');

      await Pawns
        .update({
          id: pawns.id
        })
        .set({
          properties: JSON.stringify(pawns.properties)
        })
        .fetch();
    }

    return res.json(201, {
      status: 'ok!'
    });
  },

};
