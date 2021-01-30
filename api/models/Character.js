/**
 * Character.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {

        name: {
            type: 'string',
            required: true,
            description: 'Name of the Character.',
            maxLength: 255,
            example: 'Adelmond'
        },

        level: {
            type: 'string',
            required: false,
            description: '',
            maxLength: 255,
            example: ''
        },

        classes: {
            type: 'string',
            required: false,
            description: '',
            maxLength: 255,
            example: ''
        },

        race: {
            type: 'string',
            required: false,
            description: '',
            maxLength: 255,
            example: ''
        },

        character: {
            type: 'string',
            required: false,
            description: '',
            maxLength: 255,
            example: ''
        },

        sex: {
            type: 'string',
            required: false,
            description: '',
            maxLength: 255,
            example: ''
        },

        abilities: {
            collection: 'abilities',
            via: 'owner'
        },

        skills: {
            collection: 'skills',
            via: 'owner'
        },

        saves: {
            collection: 'saves',
            via: 'owner'
        },

        hp: {
            collection: 'hp',
            via: 'owner'
        },
        attacks: {
            collection: 'attacks',
            via: 'owner'
        },
        initiative: {
            collection: 'initiatives',
            via: 'owner'
        },
        items: {
            collection: 'items',
            via: 'owner'
        },
        perks: {
            collection: 'perks',
            via: 'owner'
        },
        throws: {
            collection: 'throws',
            via: 'owner'
        },
        ac: {
            collection: 'ac',
            via: 'owner'
        },
        others: {
            collection: 'others',
            via: 'owner'
        },

        ss: {
            collection: 'ss',
            via: 'owner'
        },

        spells: {
            collection: 'spells',
            via: 'owner'
        },

        author: {
            model: 'user'
        },

        sessions: {
            collection: 'sessions',
            via: 'characters'
        },
    },
};