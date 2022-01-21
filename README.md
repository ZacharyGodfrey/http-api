# http-api

This project intends to use a small subset of the HTTP specification to implement a simple web API. The API will use JSON as the data format and HTTP as the transport protocol, but it's definitely not RESTful and isn't necessarily RPC either. This project is intentionally deviating from current "best practices" in pursuit of greater simplicity.

## Development Roadmap

- [x] Outline design principles in README
- [x] Build out basic server infrastructure
- [x] Add unit testing and test coverage reporting
- [ ] Add database schema and query functions
- [ ] Implement example endpoints
- [ ] Document endpoints in README

## API Design Principles

The API is built according to the following principles:

1. All requests will use the HTTP `POST` method.
2. The name of the action to be performed will be contained in the request URI.
3. All input data needed to perform the action will be contained in the request body as JSON.
4. Headers, query string parameters, cookies, and all other request information will be ignored.
5. All HTTP requests and responses will have a common format.

### HTTP Request Format

All request bodies have the following keys:

- `token`: An authentication token string (empty when not authenticated)
- `data`: The input data needed for the action (could be any valid JSON value)

```
POST /action-name
{
    "token": "auth-token-value",
    "data": {
        "key": "value"
    }
}
```

### HTTP Response Format

All response bodies have the following keys:

- `messages`: Could be success messages or error messages depending on the response status
- `data`: The output data returned from the action (could be any valid JSON value)

```
{
    "messages": [],
    "data": {
        "key": "value"
    }
}
```

### HTTP Status Codes

Only the following status codes will be returned:

- 200: The requested action was performed successfully.
- 400: The input data was not valid for the requested action.
- 401: The requested action requires a valid authentication token.
- 403: The provided authentication token is lacking required permissions to perform the requested action.
- 404: The requested action does not exist.
- 500: The server encountered an unexpected error while performing the requested action.

## Local Development

1. Create a `.env` file in the root directory of the repo
2. Add the following line to the `.env` file: `DB_CONNECTION=your-connection-string`
3. Run `npm i` to install dependencies
4. Run `npm run coverage` to execute unit tests and generage coverage report
5. Run `npm run start` to run the API locally
6. Send `POST` requests to `http://localhost:8080`