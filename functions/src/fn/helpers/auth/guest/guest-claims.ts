export const guestCustomClaims = (userId: string, facultyId: string) => ({
    "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "guest",
        "x-hasura-allowed-roles": ["guest"],
        "x-hasura-user-id": userId,
        "x-hasura-faculty-id": facultyId,
    },
})