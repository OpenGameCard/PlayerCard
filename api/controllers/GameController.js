/**
 * GameController
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

    list: async function(req, res) {

        var games = await Game.find({
                where: {
                    author: req.me.id
                }
            })
            .populate('maps');

        return res.view('pages/game/list', {
            games: games,
        });
    },

    new: async function(req, res) {

        var _newGame;
        _newGame = await Game.create({
            title: 'Przykładowy tytuł scerariusza',
            author: req.me.id
        }).fetch();

        return res.redirect('/game/show/' + _newGame.id);
    },

    show: async function(req, res) {

        var game = await Game.find({
                where: {
                    id: req.params.gameId,
                },
                limit: 1
            })
            .populate('maps');

        return res.view('pages/game/single', {
            game: game,
        });
    },
};