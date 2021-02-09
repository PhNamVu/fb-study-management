const graphqurl = require("graphqurl")
const functions = require("firebase-functions")

export const graphqlRequestClient = (
  query: any,
  variables: any,
  isAdmin: boolean = false,
  token: string | null = null
) =>
  graphqurl.query({
    query,
    endpoint: functions.config().prod.httpgraphqluri,
    headers: isAdmin
      ? {
          "x-hasura-admin-secret": functions.config().prod.httpgraphqlsecret,
        }
      : {
          authorization: `Bearer ${token}`,
        },
    variables,
  })
