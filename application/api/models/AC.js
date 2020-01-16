/**
 * AC.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


module.exports = {
  attributes: {

    dexternity: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      example: 4
    },

    armor: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      example: 4
    },

    shield: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      example: 12
    },

    naturalArmor: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      example: 12
    },
    size: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      example: 12
    },

    reflexion: {
      type: 'number',
      required: false,
      allowNull: true,
      description: '',
      example: 12
    },

    others: {
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
