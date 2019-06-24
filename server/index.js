const { ApolloServer } = require('apollo-server')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
const MoviesAPI = require('./MoviesApi')
const Mapper = require('./Mapper')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        moviesAPI: new MoviesAPI(),
    }),
    context: ({ req }) => {
        req.mapper = new Mapper()
        return req
    },
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})
