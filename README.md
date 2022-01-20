# rpc-api

This application intends to use a small subset of the HTTP specification to implement a simple web API. Unlike RESTful APIs which focus on the *nouns* of a particular domain, this API will instead focus on the *verbs* of a domain.

## API Design Rules

The API is built according to the following rules:

1. All requests must use the HTTP `POST` method.
2. The name of the action to be performed will be contained in the request URI.
3. All input data needed to perform the action will be contained in the request body as JSON.
4. Headers, query string parameters, cookies, and all other request information will be ignored.
5. All HTTP responses will have a uniform structure.

### HTTP Request Format

TBD

### HTTP Response Format

TBD

### HTTP Status Codes

Only the following status codes will be returned:

- 200: The requested action was performed successfully.
- 400: The input data was not valid for the requested action.
- 401: The requested action requires an authentication token.
- 403: The provided authentication token is lacking required permissions to perform the requested action.
- 404: The requested action does not exist.
- 500: The server encountered an error.