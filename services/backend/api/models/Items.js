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
    description: {
      type: 'string',
      required: false,
      allowNull: true,
      description: '',
      maxLength: 1024,
      example: 'Różowe stringi, +10 do CHA'
    },
    amount: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      example: 6
    },
    price: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      example: 150
    },


    owner: {
      model: 'character'
    },
  },
};
