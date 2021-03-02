import { graphqlRequestClient } from "../../../utils/graphql-request";

export class Variables {
    object:
        | {
            id: string;
            fullName: string;
            email: string;
            roles: string;
        }
        | undefined;
}

export const createManager = (variables: Variables) =>
    graphqlRequestClient(
        /* GraphQL */ `
        mutation insert_users(
            $object: users_insert_input!
        ) {
            insert_users(objects: [$object]) {
                affected_rows
            }
        }
        `,
        variables,
        true,
)
