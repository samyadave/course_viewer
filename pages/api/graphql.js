import { ApolloServer, gql } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { Kind } from 'graphql'
import prisma from '../../db'

const server = new ApolloServer({
  typeDefs: gql`
    scalar Date

    input UserInput {
      username: String
      email: String
    }

    type User {
      id: ID
      username: String
      email: String
      createdAt: Date
      isDeleted: Boolean
    }

    type Course {
      id: ID
      title: String
      subscribers: [User]
    }

    type Query {
      getUsers: [User]
    }

    type Mutation {
      createUser(details: UserInput): User
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
    Query: {
      getUsers: () => {
        return prisma.user.findMany()
      },
    },
    Mutation: {
      createUser: (_, { details }) => {
        return prisma.user.create({
          data: { username: details.username, email: details.email },
        })
      },
    },
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

const startServer = server.start()

export default async function handler(req, res) {
  await startServer
  await server.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
