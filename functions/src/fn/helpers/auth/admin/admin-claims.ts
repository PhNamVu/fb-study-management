export const adminCustomClaims = (userId: string) => ({
        "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "admin",
        "x-hasura-allowed-roles": ["admin"],
        "x-hasura-user-id": userId,
    },
})