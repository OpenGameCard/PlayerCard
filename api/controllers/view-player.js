module.exports = {


    friendlyName: 'View player',


    description: 'Display "Player" page.',


    exits: {

        success: {
            viewTemplatePath: 'pages/player'
        }

    },


    fn: async function() {
        var characters = await Character.find({
            where: {
                author: this.req.me.id
            }
        });

        console.log(characters);

        return {};
    }
};