module.exports = {
  attributes: {

    reason: {
      type: 'string',
      required: true,
      description: '',
      maxLength: 128,
    },
    result: {
      type: 'string',
      required: true,
      description: '',
      maxLength: 64,
    },
    owner: {
      model: 'character'
    },
  },
};
