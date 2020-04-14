/**
 * SessionController
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

  list: async function (req, res) {

    var sessions = await Sessions.find({
      where: {
        author: req.me.id
      }
    });

    return res.view('pages/session/list', {
      sessions: sessions,
    });
  },

  new: async function (req, res) {

    var _newSession;
    _newSession = await Sessions.create({
      name: 'Przykładowa nazwa sesji',
      author: req.me.id
    }).fetch();

    return res.redirect('/session/show/' + _newSession.id);
  },

  show: async function (req, res) {

    var session = await Sessions.find({
      where: {
        id: req.params.sessionId,
      },
      limit: 1
    })
      .populate('author')
      .populate('players')
      .populate('characters')
      .populate('games');

    var users = await User.find({});

    return res.view('pages/session/single', {
      session: session,
      users: users,
    });
  },

  addPlayersToSession: async function (req, res) {
    await Sessions.addToCollection(req.body.sessionId, 'players', req.body.userId);
    return res.status(201).json({
      status: 'ok!'
    });
  },

  removePlayersToSession: async function (req, res) {
    await Sessions.removeFromCollection(req.body.sessionId, 'players', req.body.userId);
    return res.status(201).json({
      status: 'ok!'
    });
  },

  addCharacterToSession: async function (req, res) {
    await Sessions.addToCollection(req.params.sessionId, 'characters', req.params.characterId);
    return res.redirect(201, '/session/play/' + req.params.sessionId);
  },

  removeCharacterToSession: async function (req, res) {
    await Sessions.removeFromCollection(req.params.sessionId, 'characters', req.params.characterId);
    return res.redirect(201, '/session/play/' + req.params.sessionId);
  },

  play: async function (req, res) {

    var session = await Sessions.findOne({
      where: {
        id: req.params.sessionId,
      }
    })
      .populate('author')
      .populate('players')
      .populate('characters')
      .populate('games');

    var availableCharacters = await Character.find({
      where: {
        author: req.me.id
      }
    });

    var playedCharacters = [];
    if (session.characters.length >= 1) {

      playedCharacters.push(
        await Character.findOne({
          id: session.characters[0].id
        }).populate('abilities')
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
          .populate('others')
      );
    }

    var map = await Maps.findOne({
      id: 1
    })
      .populate('pawns')
      .populate('tiles');

    return res.view('pages/session/player', {
      session: session,
      availableCharacters: availableCharacters,
      character: playedCharacters[0],
      map: map,
    });
  },

};
