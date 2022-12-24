exports.user_schema = {
    type: 'object',
    properties: {
        username: { type: 'string', minLength: 5 },
        status: { type: 'bool' },
        role: { type: 'string', eq: ['admin', 'user'] },
        email: { type: 'string', pattern: 'email' },
        pass: { type: 'string', minLength: 5 },
    },
};