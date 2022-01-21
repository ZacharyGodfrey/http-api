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