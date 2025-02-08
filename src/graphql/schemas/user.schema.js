const { gql } = require('@apollo/server')

const userTypeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        created_at: String
        updated_at: String    
    }

    type LoginResponse {
        message: String!
        token: String
    }

    type Query {
        "login with username and password"
        login(username: String!, password: String!):LoginResponse!
    }

    type Mutation {
        "signup with username, email and password"
        signup(
            username: String!, 
            email: String!, 
            password: String!, 
        ):User!
    }
`
module.exports = userTypeDefs;