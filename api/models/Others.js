module.exports = {
  attributes: {

    baseAttack: {
      type: 'string',
      required: false,
      allowNull: true,
      description: '',
      maxLength: 124,
      example: '25'
    },

    speed: {
      type: 'string',
      required: false,
      allowNull: true,
      description: '',
      maxLength: 124,
      example: '20'
    },


    speedArmor: {
      type: 'string',
      required: false,
      allowNull: true,
      description: '',
      maxLength: 124,
      example: '25'
    },

    spellAbility: {
      type: 'string',
      required: false,
      allowNull: true,
      description: '',
      maxLength: 124,
      example: '25'
    },


    owner: {
      model: 'character'
    }
  },
};
