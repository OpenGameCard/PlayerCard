/**
 * CharacterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    _config: {
        actions: true,
        shortcuts: false,
        rest: true
    },

    list: async function(req, res) {

        var characters = await Character.find({
            where: {
                author: req.me.id
            }
        });

        return res.view('pages/sheet/list', {
            characters: characters,
        });
    },

    new: async function(req, res) {

        var _newCharacter;
        _newCharacter = await Character.create({
            name: 'Przykładowe imie',
            author: req.me.id
        }).fetch();

        var _abilities = [{
                name: 'S',
                position: 1
            },
            {
                name: 'ZR',
                position: 2
            },
            {
                name: 'BD',
                position: 3
            },
            {
                name: 'INT',
                position: 4
            },
            {
                name: 'RZT',
                position: 5
            },
            {
                name: 'CHA',
                position: 6
            }
        ];

        _abilities.forEach(async(element) => {
            await Abilities.create({
                name: element.name,
                value1: 10,
                position: element.position,
                owner: _newCharacter.id,
            }).fetch();
        });

        var _skills = [{
                name: 'Blefowanie',
                code: 'blef',
                value3: 0,
                value4: null,
                ability: 'CHA',
            },
            {
                name: 'Ciche poruszanie',
                code: 'cich',
                value3: 0,
                value4: null,
                ability: 'ZR',
            },
            {
                name: 'Czarostwo',
                code: 'czar',
                value3: 0,
                value4: null,
                ability: 'INT',
            },
            {
                name: 'Dyplomacja',
                code: 'dyplo',
                value3: 0,
                value4: null,
                ability: 'CHA',
            },
            {
                name: 'Fałszerstwo',
                code: 'falsz',
                value3: 0,
                value4: null,
                ability: 'INT',
            },
            {
                name: 'Jeździectwo',
                code: 'jezdz',
                value3: 0,
                value4: null,
                ability: 'ZR',
            },
            {
                name: 'Koncentracja',
                code: 'konc',
                value3: 0,
                value4: null,
                ability: 'BD',
            },
            {
                name: 'Leczenie',
                code: 'lecz',
                value3: 0,
                value4: null,
                ability: 'RZT',
            },
            {
                name: 'Nasłuchiwanie',
                code: 'nasl',
                value3: 0,
                value4: null,
                ability: 'RZT',
            },
            {
                name: 'Odszyfrowanie Zapisków',
                code: 'odcyf',
                value3: 0,
                value4: null,
                ability: 'INT',
            },
            {
                name: 'Otwieranie Zamków',
                code: 'otzam',
                value3: 0,
                value4: null,
                ability: 'ZR',
            },
            {
                name: 'Postępowanie ze Zwierzętami',
                code: 'poszz',
                value3: 0,
                value4: null,
                ability: 'CHA',
            },
            {
                name: 'Przebieranie',
                code: 'przeb',
                value3: 0,
                value4: null,
                ability: 'CHA',
            },
            {
                name: 'Przeszukiwanie',
                code: 'przesz',
                value3: 0,
                value4: null,
                ability: 'INT',
            },
            {
                name: 'Pływanie',
                code: 'plyw',
                value3: 0,
                value4: null,
                ability: 'S',
            },
            {
                name: 'Rzemiosło',
                code: 'rzemio',
                value3: 0,
                value4: null,
                ability: 'INT',
            },
            {
                name: 'Skakanie',
                code: 'skak',
                value3: 0,
                value4: null,
                ability: 'S',
            },
            {
                name: 'Spostrzegawczość',
                code: 'spost',
                value3: 0,
                value4: null,
                ability: 'RZT',
            },
            {
                name: 'Szacowanie',
                code: 'szac',
                value3: 0,
                value4: null,
                ability: 'INT',
            },
            {
                name: 'Sztuka Przetrwania',
                code: 'sztprz',
                value3: 0,
                value4: null,
                ability: 'RZT',
            },
            {
                name: 'Ukrywanie się',
                code: 'ukryw',
                value3: 0,
                value4: null,
                ability: 'ZR',
            },
            {
                name: 'Unieszkodliwianie Mechanizmów',
                code: 'uniesz',
                value3: 0,
                value4: null,
                ability: 'INT',
            },
            {
                name: 'Upadanie',
                code: 'upada',
                value3: 0,
                value4: null,
                ability: 'ZR',
            },
            {
                name: 'Używanie Liny',
                code: 'uzlin',
                value3: 0,
                value4: null,
                ability: 'ZR',
            },
            {
                name: 'Używanie Magicznych Urządzeń',
                code: 'uzmech',
                value3: 0,
                value4: null,
                ability: 'CHA',
            },
            {
                name: 'Wiedza (Architektura i inynieria)',
                code: 'wiearch',
                value3: 0,
                value4: null,
                ability: 'INT',
            },
            {
                name: 'Wiedza (Geografia)',
                code: 'wiegeo',
                value3: 0,
                value4: null,
                ability: 'INT',
            },
            {
                name: 'Wiedza (Historia)',
                code: 'wiehis',
                value3: 0,
                value4: null,
                ability: 'INT',
            },
            {
                name: 'Wiedza (Plany)',
                code: 'wiepla',
                value3: 0,
                value4: null,
                ability: 'INT',
            },
            {
                name: 'Wiedza (Religia)',
                code: 'wierel',
                value3: 0,
                value4: null,
                ability: 'INT',
            },
            {
                name: 'Wiedza (Szlachta i władcy)',
                code: 'wieszla',
                value3: 0,
                value4: null,
                ability: 'INT',
            },
            {
                name: 'Wiedza (Tajemna)',
                code: 'wietaj',
                value3: 0,
                value4: null,
                ability: 'INT',
            },
            {
                name: 'Wspinaczka',
                code: 'wspin',
                value3: 0,
                value4: null,
                ability: 'S',
            },
            {
                name: 'Wyczucie Pobudek',
                code: 'wyczpo',
                value3: 0,
                value4: null,
                ability: 'RZT',
            },
            {
                name: 'Wyzwalanie się',
                code: 'wyzwal',
                value3: 0,
                value4: null,
                ability: 'ZR',
            },
            {
                name: 'Zachowanie Równowagi',
                code: 'zachr',
                value3: 0,
                value4: null,
                ability: 'ZR',
            },
            {
                name: 'Zastraszanie',
                code: 'zastr',
                value3: 0,
                value4: null,
                ability: 'CHA',
            },
            {
                name: 'Zbieranie Informacji',
                code: 'zbinfo',
                value3: 0,
                value4: null,
                ability: 'CHA',
            },
            {
                name: 'Zręczna Dłoń',
                code: 'zredl',
                value3: 0,
                value4: null,
                ability: 'ZR',
            },
        ];

        _skills.forEach(async(element) => {

            await Skills.create({
                name: element.name,
                code: element.code,
                value3: element.value3,
                value4: element.value4,
                ability: element.ability,
                owner: _newCharacter.id
            }).fetch();
        });

        var _saves = [{
                name: 'Wytrwałość',
                code: 'wytr',
                value3: 0,
                value4: null,
                ability: 'BD',
            },
            {
                name: 'Refleks',
                code: 'refl',
                value3: 0,
                value4: null,
                ability: 'ZR',
            },
            {
                name: 'Wola',
                code: 'wola',
                value3: 0,
                value4: null,
                ability: 'RZT',
            },
        ];

        _saves.forEach(async(element) => {

            await Saves.create({
                name: element.name,
                code: element.code,
                value3: element.value3,
                value4: element.value4,
                ability: element.ability,
                owner: _newCharacter.id
            }).fetch();
        });

        await HP.create({
            full: 0,
            normal: 0,
            contusion: 0,
            owner: _newCharacter.id
        }).fetch();

        await Initiatives.create({
            perks: 0,
            other: 0,
            owner: _newCharacter.id
        }).fetch();

        await Items.create({
            name: '',
            description: '',
            amount: 0,
            price: 0,
            owner: _newCharacter.id
        }).fetch();

        await Perks.create({
            name: '',
            descriptionShort: '',
            descriptionFull: '',
            owner: _newCharacter.id
        }).fetch();

        await Attacks.create({
            name: '',
            bonus: '',
            damage: '',
            owner: _newCharacter.id
        }).fetch();

        await AC.create({
            dexternity: 0,
            armor: 0,
            shield: 0,
            naturalArmor: 0,
            size: 0,
            reflexion: 0,
            others: 0,
            owner: _newCharacter.id
        }).fetch();

        await Others.create({
            speed: '',
            speedArmor: '',
            baseAttack: '',
            owner: _newCharacter.id
        }).fetch();

        var _ss = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        _ss.forEach(async(element) => {

            await SS.create({
                level: element,
                base: null,
                spec: null,
                bonus: null,
                owner: _newCharacter.id
            }).fetch();
        });

        await Spells.create({
            level: 0,
            name: 'Nazwa',
            description: 'Opis',
            notepad: 'Notatki',
            throw: 'd12+4',
            cells: '4',
            owner: _newCharacter.id
        }).fetch();

        return res.redirect('/sheet/show/' + _newCharacter.id);
    },

    show: async function(req, res) {

        var character = await Character
            .findOne({
                id: req.params.characterId
            })
            .populate('abilities', {
                sort: 'position ASC'
            })
            .populate('skills', {
                sort: 'position ASC'
            })
            .populate('saves')
            .populate('hp')
            .populate('initiative')
            .populate('items')
            .populate('perks')
            .populate('attacks')
            .populate('ac')
            .populate('others')
            .populate('spells', {
                sort: 'level ASC'
            })
            .populate('ss', {
                sort: 'level ASC'
            });

        if (character.spells.length === 0) {
            await Spells.create({
                level: 0,
                name: 'Nazwa',
                description: 'Opis',
                notepad: 'Notatki',
                throw: 'd12+4',
                cells: '4',
                owner: character.id
            }).fetch();
        }

        return res.view('pages/sheet/single', {
            character: character,
        });
    },

    remove: async function(req, res) {
        await Character
            .destroy({
                where: {
                    id: req.params.characterId
                }
            })
            .fetch();

        return res.redirect('/sheet/list');
    },

    updateSingle: async function(req, res) {

        var obj = {};
        obj[req.body.name] = req.body.value;
        await Character
            .update({
                id: req.body.id
            })
            .set(obj)
            .fetch();

        return res.status(201).json({
            status: 'ok!',
        });
    },

    updateAbilitiesSingle: async function(req, res) {

        var value = null;

        if (req.body.value) {
            value = req.body.value;
        } else {
            value = null;
        }

        var obj = {};
        obj[req.body.name] = value;
        await Abilities
            .update({
                id: req.body.id
            })
            .set(obj)
            .fetch();

        return res.status(201).json({
            status: 'ok!',
        });
    },

    updateSkillsSingle: async function(req, res) {

        var value = null;

        if (req.body.value) {
            value = req.body.value;
        } else {
            value = null;
        }

        var obj = {};
        obj[req.body.name] = value;
        await Skills
            .update({
                id: req.body.id
            })
            .set(obj)
            .fetch();

        return res.status(201).json({
            status: 'ok!',
        });
    },

    updateSkillsPosition: async function(req, res) {

        req.body.positions.forEach(async(element, index) => {

            await Skills.update({
                    id: element
                })
                .set({
                    position: index
                }).fetch();
        });


        return res.status(201).json({
            status: 'ok!',
        });
    },

    updateSavesSingle: async function(req, res) {

        var value = null;

        if (req.body.value) {
            value = req.body.value;
        } else {
            value = null;
        }

        var obj = {};
        obj[req.body.name] = value;
        await Saves
            .update({
                id: req.body.id
            })
            .set(obj)
            .fetch();

        return res.status(201).json({
            status: 'ok!',
        });
    },

    updateHPSingle: async function(req, res) {

        var value = null;

        if (req.body.value) {
            value = req.body.value;
        } else {
            value = null;
        }

        var obj = {};
        obj[req.body.name] = value;
        await HP
            .update({
                id: req.body.id
            })
            .set(obj)
            .fetch();

        return res.status(201).json({
            status: 'ok!',
        });
    },

    updateInitiativeSingle: async function(req, res) {

        var value = null;

        if (req.body.value) {
            value = req.body.value;
        } else {
            value = null;
        }

        var obj = {};
        obj[req.body.name] = value;
        await Initiatives
            .update({
                id: req.body.id
            })
            .set(obj)
            .fetch();

        return res.status(201).json({
            status: 'ok!',
        });
    },

    updateItemsSingle: async function(req, res) {

        var value = null;

        if (req.body.value) {
            value = req.body.value;
        } else {
            value = null;
        }

        var obj = {};
        obj[req.body.name] = value;
        await Items
            .update({
                id: req.body.id
            })
            .set(obj)
            .fetch();

        return res.status(201).json({
            status: 'ok!',
        });
    },

    createItemsSingle: async function(req, res) {

        var Item = await Items.create({
            name: '',
            description: '',
            amount: 0,
            price: 0,
            owner: req.body.characterID
        }).fetch();

        return res.status(201).json({
            id: Item.id
        });
    },

    updatePerksSingle: async function(req, res) {

        var value = null;

        if (req.body.value) {
            value = req.body.value;
        } else {
            value = null;
        }

        var obj = {};
        obj[req.body.name] = value;
        await Perks
            .update({
                id: req.body.id
            })
            .set(obj)
            .fetch();

        return res.status(201).json({
            status: 'ok!',
        });
    },

    createPerksSingle: async function(req, res) {

        var Perk = await Perks.create({
            name: '',
            descriptionShort: '',
            descriptionFull: '',
            owner: req.body.characterID
        }).fetch();

        return res.status(201).json({
            id: Perk.id
        });
    },

    updateAttacksSingle: async function(req, res) {

        var value = null;

        if (req.body.value) {
            value = req.body.value;
        } else {
            value = null;
        }

        var obj = {};
        obj[req.body.name] = value;
        await Attacks
            .update({
                id: req.body.id
            })
            .set(obj)
            .fetch();

        return res.status(201).json({
            status: 'ok!',
        });
    },

    createAttacksSingle: async function(req, res) {

        var Attack = await Attacks.create({
            name: '',
            bonus: '',
            damage: '',
            owner: req.body.characterID
        }).fetch();

        return res.status(201).json({
            id: Attack.id
        });
    },

    saveThrow: async function(req, res) {

        var Throw = await Throws.create({
            reason: "none",
            result: req.body.res,
            owner: req.body.characterID
        }).fetch();

        return res.status(201).json(Throw);
    },

    updateACSingle: async function(req, res) {

        var value = null;

        if (req.body.value) {
            value = req.body.value;
        } else {
            value = null;
        }

        var obj = {};
        obj[req.body.name] = value;
        await AC
            .update({
                id: req.body.id
            })
            .set(obj)
            .fetch();

        return res.status(201).json({
            status: 'ok!',
        });
    },

    updateOthersSingle: async function(req, res) {

        var value = null;

        if (req.body.value) {
            value = req.body.value;
        } else {
            value = null;
        }

        var obj = {};
        obj[req.body.name] = value;
        await Others
            .update({
                id: req.body.id
            })
            .set(obj)
            .fetch();

        return res.status(201).json({
            status: 'ok!',
        });
    },

    updateSSSingle: async function(req, res) {

        var value = null;

        if (req.body.value) {
            value = req.body.value;
        } else {
            value = null;
        }

        var obj = {};
        obj[req.body.name] = value;
        await SS
            .update({
                id: req.body.id
            })
            .set(obj)
            .fetch();

        return res.status(201).json({
            status: 'ok!',
        });
    },

    updateSpellsSingle: async function(req, res) {

        var value = null;

        if (req.body.value) {
            value = req.body.value;
        } else {
            value = null;
        }

        var obj = {};
        obj[req.body.name] = value;
        await Spells
            .update({
                id: req.body.id
            })
            .set(obj)
            .fetch();

        return res.status(201).json({
            status: 'ok!',
        });
    },

    removeRowSingle: async function(req, res) {

        switch (req.body.fieldRowModel) {
            case 'Perks':
                await Perks.destroy({
                    id: req.body.fieldRowId
                });
                break;
            case 'Items':
                await Items.destroy({
                    id: req.body.fieldRowId
                });
                break;
            case 'Attacks':
                await Attacks.destroy({
                    id: req.body.fieldRowId
                });
                break;
            case 'Spells':
                await Spells.destroy({
                    id: req.body.fieldRowId
                });
                break;
        }

        return res.status(201).json({});
    },
};