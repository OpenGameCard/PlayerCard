module.exports = {
  attributes: {

    perks: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      example: 12
    },

    other: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      example: 12
    },

    owner: {
      model: 'character'
    }

  },
};
