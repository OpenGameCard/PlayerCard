/**
 * HP.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

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
