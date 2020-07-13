module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: false,
      allowNull: true,
      description: '',
      maxLength: 128,
      example: 'Namiot'
    },
    descriptionShort: {
      type: 'string',
      required: false,
      allowNull: true,
      description: '',
      maxLength: 1024,
      example: 'Różowe stringi, +10 do CHA'
    },
    descriptionFull: {
      type: 'string',
      required: false,
      allowNull: true,
      description: '',
      maxLength: 2048,
      example: 'Różowe stringi, +10 do CHA'
    },
    owner: {
      model: 'character'
    },
  },
};
