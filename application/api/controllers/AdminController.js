/**
 * AdminController
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

  index: async function (req, res) {
    var games = await Game.find()
      .populate('maps');

    var users = await User.find();

    var characters = await Character.find()
      .populate('abilities')
      .populate('skills', {
        sort: 'position ASC'
      })
      .populate('saves')
      .populate('hp')
      .populate('initiative')
      .populate('items')
      .populate('perks')
      .populate('attacks')
      .populate('ac')
      .populate('others');

    var sessions = await Sessions.find()
      .populate('author')
      .populate('players')
      .populate('characters')
      .populate('games');

    var maps = await Maps.find()
      .populate('pawns')
      .populate('tiles');

    return res.view('pages/admin/index', {
      games: games,
      users: users,
      characters: characters,
      sessions: sessions,
      maps: maps,
    });
  },

};
