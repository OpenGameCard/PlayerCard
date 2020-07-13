module.exports = {

  friendlyName: '.',

  description: '.',

  exits: {
    success: {
      viewTemplatePath: 'pages/dice',
      description: '.'
    },
  },

  fn: async function (inputs, exits) {
    return exits.success();
  }
};
