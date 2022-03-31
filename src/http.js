const { uuid } = require('./utilities');

module.exports = (env) => {
    const { environment } = env;
    const isProd = environment === 'production';
    const defaultError = 'Server Error';

    return {
        request: (actionName, token, data) => ({
            id: uuid(),
            time: new Date().toISOString(),
            actionName,
            token,
            data,
            user: null,
        }),
        response: {
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
            notAuthorized: () => ({
                status: 401,
                body: {
                    data: null,
                    messages: ['Not Authorized']
                }
            }),
            forbidden: () => ({
                status: 403,
                body: {
                    data: null,
                    messages: ['Forbidden']
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
                    messages: [isProd ? defaultError : message],
                },
            }),
        }
    };
};