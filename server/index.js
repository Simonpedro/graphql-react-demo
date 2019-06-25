const http = require('http')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
const MoviesAPI = require('./MoviesApi')
const MoviesService = require('./MoviesService')

const PORT = 4000
const app = express()

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, connection }) => {
        const moviesAPI = new MoviesAPI()
        moviesAPI.initialize({})
        const services = {
            movies: new MoviesService(moviesAPI),
            moviesAPI,
            pubsub,
        }
        if (connection) {
            connection.context.services = services
            return connection.context
        }
        req.services = services
        return req
    },
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
    console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
    console.log(
        `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
    )
})
