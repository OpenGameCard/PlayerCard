module.exports = {


  friendlyName: 'View gm',


  description: 'Display "Gm" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/gm'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
