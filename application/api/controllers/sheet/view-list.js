module.exports = {

  friendlyName: 'friendlyName',
  description: 'description',
  inputs: {

    name: {
      description: 'name".',
      type: 'string',
      required: true
    },
  },

  exits: {
    success: {
      viewTemplatePath: 'pages/sheet/list',
      description: 'description',
    },
    notFound: {
      description: 'No characters was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function (inputs, exits) {

    var characters = await Character.find({});

    if (!characters) {
      return exits.notFound();
    }

    return exits.success();
  }
};
