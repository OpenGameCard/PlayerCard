/**
 * Abilities.js
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
            example: 'S'
        },

        value1: {
            type: 'number',
            required: false,
            allowNull: true,
            description: '',
            example: 12
        },

        value3: {
            type: 'number',
            required: false,
            allowNull: true,
            description: '',
            example: 2
        },

        position: {
            type: 'number',
            required: false,
            allowNull: true,
            description: '',
            example: 2
        },

        owner: {
            model: 'character'
        }

    },
};