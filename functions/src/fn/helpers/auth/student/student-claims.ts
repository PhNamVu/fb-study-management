export const studentCustomClaims = (userId: string, facultyId: string) => ({
    "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "student",
        "x-hasura-allowed-roles": ["student"],
        "x-hasura-user-id": userId,
        "x-hasura-faculty-id": facultyId,
    },
})