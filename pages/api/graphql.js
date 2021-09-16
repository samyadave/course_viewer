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

    type Dept {
      id: String
      name: String
      courses: [Course]
    }

    type Course {
      id: String
      title: String
      number: String
      deptId: String
      dept: Dept
      classes: [Class]
    }

    type Class {
      crn: Int
      professor: String
      title: String
      section: String
      units: Float
      start: Date
      end: Date
      times: [String]
      courseId: String
      course: Course
    }

    # type Professor {
    #   id: ID
    #   name: String
    #   rating: Float
    #   reviews: [Review]
    # }

    # type Review {
    #   id: ID
    #   title: String
    #   description: String
    # }

    type Query {
      getUsers: [User]
      getDepts: [Dept]
      getDept(id: String!): Dept
    }

    type Mutation {
      createUser(details: UserInput): User
      deleteUser(id: ID!): User
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
    Dept: {
      courses: async (dept) => {
        return await prisma.course.findMany({
          where: { deptId: dept.id },
        })
      },
    },
    Course: {
      classes: async (course) => {
        return await prisma.courseclass.findMany({
          where: { courseId: course.id },
        })
      },
      dept: async (course) => {
        return await prisma.dept.findFirst({
          where: { id: course.deptId },
        })
      },
    },
    Query: {
      getUsers: async () => {
        return await prisma.user.findMany({
          where: { isDeleted: false },
        })
      },
      getDepts: async () => {
        return await prisma.dept.findMany()
      },
      getDept: async (_, { id }) => {
        return await prisma.dept.findFirst({
          where: { id: id },
        })
      },
    },

    Mutation: {
      createUser: (_, { details }) => {
        return prisma.user.create({
          data: {
            username: details.username,
            email: details.email,
          },
        })
      },

      deleteUser: (_, { id }) => {
        return prisma.user.update({
          where: { id: parseInt(id) },
          data: {
            isDeleted: true,
          },
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
