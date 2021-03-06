/**
 * Saves.js
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
            maxLength: 64,
            example: 'Wola'
        },

        code: {
            type: 'string',
            required: true,
            description: '',
            maxLength: 64,
            example: 'wola'
        },

        value3: {
            type: 'number',
            required: false,
            allowNull: true,
            description: '',
            example: 6
        },

        value4: {
            type: 'number',
            required: false,
            allowNull: true,
            description: '',
            example: 2
        },

        ability: {
            type: 'string',
            required: true,
            description: '',
            maxLength: 64,
            example: 'CHA'
        },

        owner: {
            model: 'character'
        },
    },
};