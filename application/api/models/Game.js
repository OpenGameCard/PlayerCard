/**
 * Game.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {

    title: {
      type: 'string',
      required: true,
      description: 'Tytuł przygody/kampanii.',
      maxLength: 1024,
      example: 'Złoto i krew'
    },

    author: {
      model: 'user'
    },

    maps: {
      collection: 'maps',
      via: 'owner'
    },

    session: {
      model: 'sessions'
    },

  },
};
