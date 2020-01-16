/**
 * Maps.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      description: 'Name of Location',
      maxLength: 255,
      example: 'Giant\'s cave, level 2.'
    },

    description: {
      type: 'string',
      required: false,
      description: '',
      maxLength: 1048576,
      example: ''
    },

    tiles: {
      collection: 'tiles',
      via: 'owner'
    },

    pawns: {
      collection: 'pawns',
      via: 'owner'
    },

    owner: {
      model: 'game'
    },

  },

};
