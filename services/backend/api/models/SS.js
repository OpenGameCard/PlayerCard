module.exports = {
  attributes: {
    level: {
      type: 'number',
      required: true,
      description: '',
      example: '0'
    },
    base: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      example: 12
    },
    spec: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      example: 12
    },
    bonus: {
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
