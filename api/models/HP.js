module.exports = {
  attributes: {

    full: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      example: 12
    },

    normal: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      example: 12
    },

    contusion: {
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
