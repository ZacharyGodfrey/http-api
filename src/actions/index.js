const actions = [
  require('./test'),
];

modules.exports = actions.reduce((result, action) => {
  return Object.assign(result, { [action.name]: action });
}, {});