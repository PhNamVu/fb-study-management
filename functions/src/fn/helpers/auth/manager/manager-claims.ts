export const managerCustomClaims = (userId: string) => ({
    "https://hasura.io/jwt/claims": {
    "x-hasura-default-role": "manager",
    "x-hasura-allowed-roles": ["manager"],
    "x-hasura-user-id": userId,
},
})