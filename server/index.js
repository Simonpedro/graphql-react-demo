const { ApolloServer } = require('apollo-server')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
const MoviesAPI = require('./MoviesApi')
const MoviesService = require('./MoviesService')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const moviesAPI = new MoviesAPI()
        moviesAPI.initialize({})
        const services = {
            movies: new MoviesService(moviesAPI),
            moviesAPI,
        }
        req.services = services
        return req
    },
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})
