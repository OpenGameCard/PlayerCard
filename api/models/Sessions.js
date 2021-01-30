/**
 * Sessions.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: true,
            description: '',
            maxLength: 1024,
            example: ''
        },

        description: {
            type: 'string',
            required: false,
            description: '',
            maxLength: 1048576,
            example: ''
        },

        author: {
            model: 'user'
        },

        players: {
            collection: 'user',
            via: 'sessions'
        },

        characters: {
            collection: 'character',
            via: 'sessions'
        },

        games: {
            collection: 'game',
            via: 'session'
        },

    },
};