/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'GET /': {action: 'view-homepage-or-redirect'},
  'GET /welcome/:unused?': {action: 'dashboard/view-welcome'},

  'GET /faq': {action: 'view-faq'},
  'GET /legal/terms': {action: 'legal/view-terms'},
  'GET /legal/privacy': {action: 'legal/view-privacy'},
  'GET /contact': {action: 'view-contact'},

  'GET /signup': {action: 'entrance/view-signup'},
  'GET /email/confirm': {action: 'entrance/confirm-email'},
  'GET /email/confirmed': {action: 'entrance/view-confirmed-email'},

  'GET /login': {action: 'entrance/view-login'},
  'GET /password/forgot': {action: 'entrance/view-forgot-password'},
  'GET /password/new': {action: 'entrance/view-new-password'},

  'GET /account': {action: 'account/view-account-overview'},
  'GET /account/password': {action: 'account/view-edit-password'},
  'GET /account/profile': {action: 'account/view-edit-profile'},

  '/terms': '/legal/terms',
  '/logout': '/api/v1/account/logout',

  '/api/v1/account/logout': {action: 'account/logout'},
  'PUT   /api/v1/account/update-password': {action: 'account/update-password'},
  'PUT   /api/v1/account/update-profile': {action: 'account/update-profile'},
  'PUT   /api/v1/account/update-billing-card': {action: 'account/update-billing-card'},
  'PUT   /api/v1/entrance/login': {action: 'entrance/login'},
  'POST  /api/v1/entrance/signup': {action: 'entrance/signup'},
  'POST  /api/v1/entrance/send-password-recovery-email': {action: 'entrance/send-password-recovery-email'},
  'POST  /api/v1/entrance/update-password-and-login': {action: 'entrance/update-password-and-login'},
  'POST  /api/v1/deliver-contact-form-message': {action: 'deliver-contact-form-message'},

  'GET /dice': {action: 'dice/throw'},

  'GET /game/list': 'GameController.list',
  'GET /game/new': 'GameController.new',
  'GET /game/show/:gameId': 'GameController.show',

  'GET /game/show/:gameId/map/new': 'MapsController.new',
  'GET /game/show/:gameId/map/:mapId/show': 'MapsController.show',
  'POST /game/show/:gameId/map/:mapId/load': 'MapsController.load',
  'POST /game/show/:gameId/map/:mapId/update/single': 'MapsController.updateSingle',

  'POST /command': 'SayController.command',
  'POST /map/save/character': 'SayController.saveCharacterOnMap',

  'GET /session/list': 'SessionController.list',
  'GET /session/new': 'SessionController.new',
  'GET /session/show/:sessionId': 'SessionController.show',
  'POST /session/addPlayersToSession': 'SessionController.addPlayersToSession',
  'POST /session/removePlayersToSession': 'SessionController.removePlayersToSession',

  'GET /session/play/:sessionId': 'SessionController.play',

  'GET /session/play/:sessionId/select/character/:characterId': 'SessionController.addCharacterToSession',
  'GET /session/play/:sessionId/remove/character/:characterId': 'SessionController.removeCharacterToSession',

  'GET /sheet/list': 'CharacterController.list',
  'GET /sheet/new': 'CharacterController.new',
  'GET /sheet/show/:characterId': 'CharacterController.show',
  'GET /sheet/remove/:characterId': 'CharacterController.remove',
  'POST /sheet/show/update/single': 'CharacterController.updateSingle',
  'POST /sheet/show/update/abilities/single': 'CharacterController.updateAbilitiesSingle',
  'POST /sheet/show/update/skills/single': 'CharacterController.updateSkillsSingle',
  'POST /sheet/show/update/skills/position': 'CharacterController.updateSkillsPosition',
  'POST /sheet/show/update/saves/single': 'CharacterController.updateSavesSingle',
  'POST /sheet/show/update/hp/single': 'CharacterController.updateHPSingle',
  'POST /sheet/show/update/initiative/single': 'CharacterController.updateInitiativeSingle',
  'POST /sheet/show/update/items/single': 'CharacterController.updateItemsSingle',
  'POST /sheet/show/create/items/single': 'CharacterController.createItemsSingle',
  'POST /sheet/show/update/perks/single': 'CharacterController.updatePerksSingle',
  'POST /sheet/show/create/perks/single': 'CharacterController.createPerksSingle',
  'POST /sheet/show/update/attacks/single': 'CharacterController.updateAttacksSingle',
  'POST /sheet/show/create/attacks/single': 'CharacterController.createAttacksSingle',
  'POST /sheet/show/update/ac/single': 'CharacterController.updateACSingle',
  'POST /sheet/show/update/others/single': 'CharacterController.updateOthersSingle',
  'POST /sheet/show/update/spells/single': 'CharacterController.updateSpellsSingle',
  'POST /sheet/show/update/ss/single': 'CharacterController.updateSSSingle',
  'POST /throw/save': 'CharacterController.saveThrow',

  'POST /sheet/show/remove/row/single': 'CharacterController.removeRowSingle',

  'GET /events/maps/player/load': 'EventsController.loadMaps',

  'GET /admin': 'AdminController.index',

  'GET /player': {action: 'view-player'},
  'GET /gm': {action: 'view-gm'},
};
