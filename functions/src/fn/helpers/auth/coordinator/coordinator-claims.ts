export const coordinatorCustomClaims = (userId: string, facultyId: string) => ({
    "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "coordinator",
        "x-hasura-allowed-roles": ["coordinator"],
        "x-hasura-user-id": userId,
        "x-hasura-faculty-id": facultyId,
    },
})