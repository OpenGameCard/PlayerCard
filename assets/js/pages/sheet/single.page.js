parasails.registerPage('sheet_list', {
  data: {
    //…
  },

  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function () {
    //…
  },
  methods: {
    //…
  }
});

function generateMod(ability) {
  if (ability > 0) {
    return Math.floor((ability - 10) / 2);
  } else {
    return null;
  }
}

$(document).ready(() => {

  $(() => {
    $('[data-toggle="popover"]').popover();
  });

  /**
   * sortowanie skilli :)
   */
  $('#sortable').sortable({
    cursorAt: {left: 5},
    cursor: 'move',
    opacity: 0.5,
    axis: 'y',
    placeholder: 'ui-state-highlight',
    handle: 'h5 span',
    update: function () {
      var positions = $('#sortable').sortable('toArray');
      saveDropList(positions);
    },
  });

  function saveDropList(positions) {
    $.post('/sheet/show/update/skills/position', {
      positions: positions,
    });
  }

  $('#sortable').disableSelection();

  $('.make_throw').bind('click', function () {
    var value = $(this).parents().parents().parents('.input-group').find('.form-control').val();
    var name = $(this).parents().parents().parents('.input-group').find('.form-control').attr('tested_name');
    if (value >= 0) {
      $('.container').find('#set').val('d20+' + value);
    } else {
      $('.container').find('#set').val('d20' + value);
    }
    $('.container').find('#set').parents().find('#basic-addon1').html(name);
    $('#dice_table').css('display', 'inline-block');
    $('#sheet').css('display', 'none');
  });

  $('.make_throw_another_dice').bind('click', function () {
    var value = $(this).parents().parents().parents('.input-group').find('.form-control').val();
    var name = $(this).parents().parents().parents('.input-group').find('.form-control').attr('tested_name');
    if (value >= 0) {
      $('.container').find('#set').val('' + value);
    } else {
      $('.container').find('#set').val('' + value);
    }
    $('.container').find('#set').parents().find('#basic-addon1').html(name);
    $('#dice_table').css('display', 'inline-block');
    $('#sheet').css('display', 'none');
  });

  $('.container').find('#close').bind('click', () => {
    $('#sheet').css('display', 'inline-block');
  });

  //
  // zapisuje wartości character do db
  //
  $('.input_character').find('.form-control').bind('blur', function () {

    var id = $(this).attr('field_data_id');
    var name = $(this).attr('field_data_name');
    var value = $(this).val();

    $.post('/sheet/show/update/single', {
      id: id,
      name: name,
      value: value,
    });
  });


  //
  // zapisuje wartości abilities do db
  //
  $('.input_abilities').find('.form-control').bind('blur', function () {
    var id = $(this).attr('field_ability_id');
    var name = $(this).attr('field_value_id');
    var value = $(this).val();

    $.post('/sheet/show/update/abilities/single', {
      id: id,
      name: name,
      value: value,
    });
  });

  //
  // zapisuje wartości skills do db
  //
  $('.input_skills').find('.form-control').bind('blur', function () {
    var id = $(this).attr('field_skills_id');
    var name = $(this).attr('field_value_id');
    var value = $(this).val();

    $.post('/sheet/show/update/skills/single', {
      id: id,
      name: name,
      value: value,
    });
  });

  //
  // zapisuje wartości saves do db
  //
  $('.input_saves').find('.form-control').bind('blur', function () {
    var id = $(this).attr('field_save_id');
    var name = $(this).attr('field_value_id');
    var value = $(this).val();

    $.post('/sheet/show/update/saves/single', {
      id: id,
      name: name,
      value: value,
    });
  });

  //
  // zapisuje wartości hp do db
  //
  $('.form-hp').find('.form-control').bind('blur', function () {
    var id = $(this).attr('field_hp_id');
    var name = $(this).attr('field_value_id');
    var value = $(this).val();

    $.post('/sheet/show/update/hp/single', {
      id: id,
      name: name,
      value: value,
    });
  });

  //
  // zapisuje wartości ac do db
  //
  $('.form-ac').find('.form-control').bind('blur', function () {
    var id = $(this).attr('field_ac_id');
    var name = $(this).attr('field_value_id');
    var value = $(this).val();

    $.post('/sheet/show/update/ac/single', {
      id: id,
      name: name,
      value: value,
    });
  });

  //
  // zapisuje wartości initiative do db
  //
  $('.form-initiative').find('.form-control').bind('blur', function () {
    var id = $(this).attr('field_initiative_id');
    var name = $(this).attr('field_value_id');
    var value = $(this).val();

    $.post('/sheet/show/update/initiative/single', {
      id: id,
      name: name,
      value: value,
    });
  });

  //
  // zapisuje wartości others do db
  //
  $('.form-others').find('.form-control').bind('blur', function () {
    var id = $(this).attr('field_others_id');
    var name = $(this).attr('field_value_id');
    var value = $(this).val();

    $.post('/sheet/show/update/others/single', {
      id: id,
      name: name,
      value: value,
    });
  });


  //
  // zapisuje wartości ss do db
  //
  $('.form_ss').find('.form-control').bind('blur', function () {
    var id = $(this).attr('field_ss_id');
    var name = $(this).attr('field_value_id');
    var value = $(this).val();


    $.post('/sheet/show/update/ss/single', {
      id: id,
      name: name,
      value: value,
    });
  });

  //
  // zapisuje wartości items do db
  //
  $('.form-items').find('.form-control').bind('blur', function () {
    var id = $(this).attr('field_items_id');
    var name = $(this).attr('field_value_id');
    var value = $(this).val();

    $.post('/sheet/show/update/items/single', {
      id: id,
      name: name,
      value: value,
    });
  });

  $('#new_items_row').click(() => {
    $('#items_container #items_form>.form-row:last').clone(true).insertAfter('#items_container #items_form>.form-row:last');
    var characterID = $('#items_container #items_form').attr('field_character_id');

    $.post(
      '/sheet/show/create/items/single', {name: '', description: '', amount: 0, price: 0, characterID: characterID},
      (data) => {
        $('#items_container #items_form>.form-row:last').find('.form-control').attr('field_items_id', data.id);
        $('#items_container #items_form>.form-row:last').find('.btn').attr('field_row_id', data.id);
        $('#items_container #items_form>.form-row:last').find('.form-control').val('');
      }
    );
  });

  //
  // zapisuje perki (atuty) do db
  //
  $('.form-perks').find('.form-control').bind('blur', function () {

    var id = $(this).attr('field_perks_id');
    var name = $(this).attr('field_value_id');
    var value = null;

    if ($(this).val()) {
      value = $(this).val();
    } else {
      value = $(this).text();
    }

    $.post('/sheet/show/update/perks/single', {
      id: id,
      name: name,
      value: value,
    });
  });

  $('#new_perks_row').click(() => {

    $('#perks_container #perks_form>.form-row:last').clone(true).insertAfter('#perks_container #perks_form>.form-row:last');
    var characterID = $('#perks_container #perks_form').attr('field_character_id');

    $.post(
      '/sheet/show/create/perks/single', {
        name: '',
        descriptionShort: '',
        descriptionFull: '',
        characterID: characterID
      },
      (data) => {
        $('#perks_container #perks_form>.form-row:last').find('.form-control').attr('field_perks_id', data.id);
        $('#perks_container #perks_form>.form-row:last').find('.btn').attr('field_row_id', data.id);
        $('#perks_container #perks_form>.form-row:last').find('.form-control').val('');
      }
    );

  });

  //
  // zapisuje attacks do db
  //
  $('.form-attacks').find('.form-control').bind('blur', function () {

    var id = $(this).attr('field_attacks_id');
    var name = $(this).attr('field_value_id');
    var value = null;

    if ($(this).val()) {
      value = $(this).val();
    } else {
      value = $(this).text();
    }

    $.post('/sheet/show/update/attacks/single', {
      id: id,
      name: name,
      value: value,
    });
  });

  $('#new_attacks_row').click(() => {

    $('#attacks_container #attacks_form>.form-row:last').clone(true).insertAfter('#attacks_container #attacks_form>.form-row:last');
    var characterID = $('#attacks_container #attacks_form').attr('field_character_id');

    $.post(
      '/sheet/show/create/attacks/single', {name: '', bonus: '', damage: '', characterID: characterID},
      (data) => {
        $('#attacks_container #attacks_form>.form-row:last').find('.form-control').attr('field_attacks_id', data.id);
        $('#attacks_container #attacks_form>.form-row:last').find('.btn').attr('field_row_id', data.id);
        $('#attacks_container #attacks_form>.form-row:last').find('.form-control').val('');
      }
    );

  });

  //
  // aktualizacja modyfikatora dla atrybutu podstawowego
  //
  $('.input_abilities').find('.input-ability-base-value').bind('change', function () {

    var abilityName = $(this)
      .parents('.input_abilities')
      .children()
      .find('.input-name')
      .text();

    $(this)
      .parents('.input_abilities')
      .children()
      .find('.input-ability-base-mod')
      .val(
        generateMod(
          $(this).val()
        )
      );

    if ($(this).parents('.input_abilities').children().find('.input-ability-temp-value').val() > 0) {

      $(document).find('.input_other').find('.input-ability-' + abilityName).val(
        $(this).parents('.input_abilities').children().find('.input-ability-temp-mod').val()
      );

      $(document).find('.input_skills').find('.input-ability-' + abilityName).val(
        $(this).parents('.input_abilities').children().find('.input-ability-temp-mod').val()
      );

      $(document).find('.input_saves').find('.input-ability-' + abilityName).val(
        $(this).parents('.input_abilities').children().find('.input-ability-temp-mod').val()
      );

    } else {

      $(document).find('.input_other').find('.input-ability-' + abilityName).val(
        $(this).parents('.input_abilities').children().find('.input-ability-base-mod').val()
      );

      $(document).find('.input_skills').find('.input-ability-' + abilityName).val(
        $(this).parents('.input_abilities').children().find('.input-ability-base-mod').val()
      );

      $(document).find('.input_saves').find('.input-ability-' + abilityName).val(
        $(this).parents('.input_abilities').children().find('.input-ability-base-mod').val()
      );
    }

    $(document).find('.input_other').find('.input-ability-' + abilityName).change();
    $(document).find('.input_skills').find('.input-ability-' + abilityName).change();
    $(document).find('.input_saves').find('.input-ability-' + abilityName).change();
  });

  //
  // aktualizacja modyfikatora dla atrybutu tymczasowego
  //
  $('.input_abilities').find('.input-ability-temp-value').bind('change', function () {

    var abilityName = $(this)
      .parents('.input_abilities')
      .children()
      .find('.input-name')
      .text();

    $(this)
      .parents('.input_abilities')
      .children()
      .find('.input-ability-temp-mod')
      .val(
        generateMod(
          $(this).val()
        )
      );

    if ($(this).parents('.input_abilities').children().find('.input-ability-temp-value').val() > 0) {

      $(document).find('.input_other').find('.input-ability-' + abilityName).val(
        $(this).parents('.input_abilities').children().find('.input-ability-temp-mod').val()
      );

      $(document).find('.input_skills').find('.input-ability-' + abilityName).val(
        $(this).parents('.input_abilities').children().find('.input-ability-temp-mod').val()
      );

      $(document).find('.input_saves').find('.input-ability-' + abilityName).val(
        $(this).parents('.input_abilities').children().find('.input-ability-temp-mod').val()
      );

    } else {

      $(document).find('.input_other').find('.input-ability-' + abilityName).val(
        $(this).parents('.input_abilities').children().find('.input-ability-base-mod').val()
      );

      $(document).find('.input_skills').find('.input-ability-' + abilityName).val(
        $(this).parents('.input_abilities').children().find('.input-ability-base-mod').val()
      );

      $(document).find('.input_saves').find('.input-ability-' + abilityName).val(
        $(this).parents('.input_abilities').children().find('.input-ability-base-mod').val()
      );
    }

    $(document).find('.input_other').find('.input-ability-' + abilityName).change();
    $(document).find('.input_skills').find('.input-ability-' + abilityName).change();
    $(document).find('.input_saves').find('.input-ability-' + abilityName).change();
  });

  $('.input-ability-base-value').trigger('change');
  $('.input-ability-temp-value').trigger('change');

  $('.input-value-2, .input-value-3, .input-value-4').bind('change', function () {
    let ability = $(this).parents('.form-row').children().find('.input-value-2').val();
    let range = $(this).parents('.form-row').children().find('.input-value-3').val();
    let additional = $(this).parents('.form-row').children().find('.input-value-4').val();

    $(this).parents('.form-row').children().find('.input-value-1').val(
      Math.floor(ability / 1 + range / 1 + additional / 1)
    );
  }).trigger('change');

  $('.form-hp').find('#inputHPSum, #inputHPDataWounds, #inputHPDataNonLethal').bind('change', function () {
    let HPSum = $(this).parents('.form-hp').children().find('#inputHPSum').val();
    let HPDataWounds = $(this).parents('.form-hp').children().find('#inputHPDataWounds').val();
    let HPDataNonLethal = $(this).parents('.form-hp').children().find('#inputHPDataNonLethal').val();

    let HPActual = Math.floor(HPSum / 1 - HPDataWounds / 1 - HPDataNonLethal / 1);

    $(this).parents('.form-hp').children().find('#inputHPActual').val(HPActual);

    if (HPActual <= 0) {
      $(this).parents('.form-hp').children().find('#inputHPActual').addClass('is-invalid');
    }

    if (HPActual > 0) {
      $(this).parents('.form-hp').children().find('#inputHPActual').removeClass('is-invalid');
    }
  }).trigger('change');

  $('.form-ac').find('#inputACDexternity, #inputACMaxDexternity, #inputACArmor, #inputACShield, #inputACNaturalArmor, #inputACSize, #inputACOthers, #inputACReflexion').bind('change', function () {
    let ACDexternity = $(this).parents('.form-ac').children().find('#inputACDexternity').val();
    let ACMaxDexternity = $(this).parents('.form-ac').children().find('#inputACMaxDexternity').val();
    let ACArmor = $(this).parents('.form-ac').children().find('#inputACArmor').val();
    let ACShield = $(this).parents('.form-ac').children().find('#inputACShield').val();
    let ACNaturalArmor = $(this).parents('.form-ac').children().find('#inputACNaturalArmor').val();
    let ACSize = $(this).parents('.form-ac').children().find('#inputACSize').val();
    let ACOthers = $(this).parents('.form-ac').children().find('#inputACOthers').val();
    let ACReflexion = $(this).parents('.form-ac').children().find('#inputACReflexion').val();

    let ACCurentDexternity = null;

    if (ACMaxDexternity < ACDexternity && ACArmor > 0) {
      ACCurentDexternity = ACMaxDexternity;
    } else {
      ACCurentDexternity = ACDexternity;
    }

    let ACSum = Math.floor(ACCurentDexternity / 1 + ACArmor / 1 + ACShield / 1 + ACNaturalArmor / 1 + ACSize / 1 + ACOthers / 1 + ACReflexion / 1);

    $(this).parents('.form-ac').children().find('#inputACSum').val(ACSum);

  });

  $('#inputACDexternity, #inputACMaxDexternity, #inputACArmor, #inputACShield, #inputACNaturalArmor, #inputACSize, #inputACOthers, #inputACReflexion').trigger('change');

  $('.form-ss').find('#inputSSBaseSpells, #inputSSSpecSpells, #inputSSBonusSpells').bind('change', function () {
    let inputSSBaseSpells = $(this).parents('.form-ss').children().find('#inputSSBaseSpells').val();
    let inputSSSpecSpells = $(this).parents('.form-ss').children().find('#inputSSSpecSpells').val();
    let inputSSBonusSpells = $(this).parents('.form-ss').children().find('#inputSSBonusSpells').val();

    let SSSum = Math.floor(inputSSBaseSpells / 1 + inputSSSpecSpells / 1 + inputSSBonusSpells / 1);

    $(this).parents('.form-ss').children().find('#inputSSSum').val(SSSum);

  }).trigger('change');

  $('.form-initiative').find('#inputInitiativeAbility, #inputInitiativeDataPerks, #inputInitiativeDataOther').bind('change', function () {
    let InitiativeAbility = $(this).parents('.form-initiative').children().find('#inputInitiativeAbility').val();
    let InitiativeDataPerks = $(this).parents('.form-initiative').children().find('#inputInitiativeDataPerks').val();
    let InitiativeDataOther = $(this).parents('.form-initiative').children().find('#inputInitiativeDataOther').val();

    let InitiativeSum = Math.floor(InitiativeAbility / 1 + InitiativeDataPerks / 1 + InitiativeDataOther / 1);

    $(this).parents('.form-initiative').children().find('#inputInitiativeSum').val(InitiativeSum);

  });

  $('#inputInitiativeAbility, #inputInitiativeDataPerks, #inputInitiativeDataOther').trigger('change');

  $('.remove-form-row').bind('click', function () {

    let formRow = $(this).parents('.form-row');

    let fieldRowId = $(this).attr('field_row_id');
    let fieldRowModel = $(this).attr('field_row_model');
    let formRowCount = $(this).parents('.form').find('.form-row').length;

    if (formRowCount !== 1) {
      $.post(
        '/sheet/show/remove/row/single', {fieldRowId: fieldRowId, fieldRowModel: fieldRowModel},
        () => {
          formRow.remove();
        }
      );
    }
  });

  let spellAbility = $('#inputOthersSpellAbility').val();
  $('#inputOthersSpellAbilityValue').val(spellAbility);

  $('#inputOthersSpellAbility').bind('change', () => {
    let spellAbility = $('#inputOthersSpellAbility').val();
    $('#inputOthersSpellAbilityValue').val(spellAbility);
  });

  $('.form-others .input-ability, #inputOthersSpellAbility').bind('change', () => {

    let a = $('#inputOthersSpellAbility').val();
    let aVal = $('.form-others .input-ability-' + a).val();

    $(document).find('.form-row .input-value-sum').val(
      function () {
        return Math.floor(
          aVal / 1 + $(this).attr('spells_level_value') / 1
        );
      }
    );
  }).trigger('change');

  $('#new_spells_row').click(() => {

    $('#spells_container #spells_form>.form-row:last').clone(true).insertAfter('#spells_container #spells_form>.form-row:last');
    var characterID = $('#spells_container #spells_form').attr('field_character_id');

    $.post(
      '/spells', {
        level: 0,
        name: '',
        description: '',
        notepad: '',
        throw: '',
        cells: '',
        owner: characterID
      },
      (data) => {
        $('#spells_container #spells_form>.form-row:last').find('.form-control').attr('field_spells_id', data.id);
        $('#spells_container #spells_form>.form-row:last').find('.btn').attr('field_row_id', data.id);
        $('#spells_container #spells_form>.form-row:last').find('.form-control').val('');
      }
    );

  });

  $('.form-spells').find('.form-control').bind('blur', function () {

    var id = $(this).attr('field_spells_id');
    var name = $(this).attr('field_value_id');
    var value = null;

    if ($(this).val()) {
      value = $(this).val();
    } else {
      value = $(this).text();
    }

    $.post('/sheet/show/update/spells/single', {
      id: id,
      name: name,
      value: value,
    });
  });

  var url = document.location.toString();

  if (url.match('#')) {
    $('.nav-tabs a[href="#' + url.split('#')[1] + '"]').tab('show');
  }

  $('#myTab a').on('shown.bs.tab', (e) => {
    window.location.hash = e.target.hash;
  });
});
