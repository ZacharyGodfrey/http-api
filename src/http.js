module.exports = (config) => {
    const { environment } = config;

    return {
        request: (actionName, token, data) => {
            return {
                id: v4(),
                time: new Date().toISOString(),
                actionName,
                token,
                data,
                user: null,
            };
        },
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
                    messages: environment === 'production' ? 'Server Error' : message,
                },
            }),
        }
    };
};