const { uuid } = require('./helpers');

const request = {
  fromExpress: (req) => {
    return {
      id: uuid(),
      time: new Date().toISOString(),
      token: `${req.body.token || ''}`,
      data: req.body.data,
      user: null,
    };
  },
};

const response = {
  success: (data) => ({
    status: 200,
    body: {
      data: data === undefined ? null : data,
      messages: [],
    },
  }),
  badRequest: (errors) => ({
    status: 400,
    body: {
      data: null,
      messages: errors,
    },
  }),
  forbidden: () => ({
    status: 403,
    body: {
      data: null,
      messages: ['Not Authorized']
    }
  }),
  notFound: () => ({
    status: 404,
    body: {
      data: null,
      messages: ['Not Found'],
    },
  }),
  serverError: (message) => ({
    status: 500,
    body: {
      data: null,
      messages: [message || 'Server Error'],
    },
  }),
};

module.exports = {
  request,
  response,
};