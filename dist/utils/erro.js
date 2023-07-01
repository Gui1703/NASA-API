import { GraphQLError } from "graphql";
export function notFound(message) {
    return new GraphQLError(`${message}`, {
        extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 404 },
        },
    });
}
export function forbidden(message) {
    return new GraphQLError(`${message}`, {
        extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 403 },
        },
    });
}
export function unauthorized(message) {
    return new GraphQLError(`${message}`, {
        extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 401 },
        },
    });
}
