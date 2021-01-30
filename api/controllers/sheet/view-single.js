module.exports = {

    friendlyName: 'friendlyName',
    description: 'description',

    exits: {
        success: {
            viewTemplatePath: 'pages/sheet/single',
            description: 'description'
        },
    },

    fn: async function(inputs, exits) {
        return exits.success();
    }
};