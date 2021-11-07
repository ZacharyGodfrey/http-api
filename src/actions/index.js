const actions = [
  require('./test'),
];

module.exports = actions.reduce((result, action) => {
  return Object.assign(result, { [action.name]: action });
}, {});