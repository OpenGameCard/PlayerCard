parasails.registerPage('session_list', {
  data: {},
  beforeMount: function () {
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function () {
  },
  methods: {}
});

$(document).ready(() => {

  $('#addPlayersToSessionModal button.addPlayersToSessionButton').click(function () {
    var userId = $(this).attr('data_user_id');
    var sessionId = $(this).attr('data_session_id');
    $.post('/session/addPlayersToSession', {
      userId: userId,
      sessionId: sessionId,
    });
  });

});
