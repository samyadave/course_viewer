import { ApolloServer, gql } from 'apollo-server'
import { Kind } from 'graphql'

const server = new ApolloServer({
  typeDefs: gql`
    scalar Date

    input UserInput{
        username: string
        email: string
    }

    type User {
      id: ID
      username: string
      email: string
      createdAt: Date
      isDeleted: Boolean
    }

    type Course {
      id: ID
      title: string
      subscribers: [User]
    }

    type Query {
      getUsers: [User]
    }

    type Mutation{
        createUser(UserInput: $UserInput): User
    }
  `,
  resolvers: {
    Date: {
      name: 'Date',
      description: 'Date custom scalar type',
      serialize(value) {
        return value.getTime() // Convert outgoing Date to integer for JSON
      },
      parseValue(value) {
        return new Date(value) // Convert incoming integer to Date
      },
      parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
          return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
        }
        return null // Invalid hard-coded value (not an integer)
      },
    },
    mutations: {
      createUser: (_, { details }) => {
        // await prisma.create.user({
        //     username: details.username,
        //     email: details.email
        // })
      },
    },
  },
})
