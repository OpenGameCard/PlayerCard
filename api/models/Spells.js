module.exports = {
  attributes: {
    level: {
      type: 'number',
      required: true,
    },
    name: {
      type: 'string',
      required: false,
      allowNull: true,
    },
    description: {
      type: 'string',
      required: false,
      allowNull: true,
    },
    notepad: {
      type: 'string',
      required: false,
      allowNull: true,
    },
    throw: {
      type: 'string',
      required: false,
      allowNull: true,
    },
    cells: {
      type: 'string',
      required: false,
      allowNull: true,
    },
    position: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      defaultsTo: 999999,
      example: 234
    },
    owner: {
      model: 'character'
    }
  },
};
