/**
 * EventsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    _config: {
        actions: true,
        shortcuts: true,
        rest: true
    },

    loadMaps: async function(req, res) {
        var maps = await Maps.find({
                where: {
                    id: 1,
                },
                limit: 1
            })
            .populate('pawns')
            .populate('tiles');

        res.sse('load_maps_player_events', {
            maps: maps
        });
    },
};