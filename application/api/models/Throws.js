/**
 * Throws.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {

    reason: {
      type: 'string',
      required: true,
      description: '',
      maxLength: 128,
    },

    result: {
      type: 'string',
      required: true,
      description: '',
      maxLength: 64,
    },

    owner: {
      model: 'character'
    },

  },
};
