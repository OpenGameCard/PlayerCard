module.exports = {
  attributes: {

    name: {
      type: 'string',
      required: false,
      allowNull: true,
      description: '',
      example: 'Long sword'
    },

    bonus: {
      type: 'string',
      required: false,
      allowNull: true,
      description: '',
      example: '12'
    },

    damage: {
      type: 'string',
      required: false,
      allowNull: true,
      description: '',
      example: '2d8'
    },

    owner: {
      model: 'character'
    }

  },
};
