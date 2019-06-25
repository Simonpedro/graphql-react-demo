const { gql } = require('apollo-server')
module.exports = gql`
    type Query {
        movies(search: String!): [Movie!]!

        movie(id: ID!): Movie

        starredMovies: [Movie!]!
    }

    type Mutation {
        """
        Toggle movie starred state
        """
        toggleStarredMovie(
            """
            The movie's id
            """
            id: String
        ): Movie
    }

    type Subscription {
        starredMovies: [Movie!]!
    }

    type Movie {
        id: ID!
        title: String!
        description: String
        img: Image
        genres: [Genre!]!
        similarMovies: [Movie!]!
        reviews: [Review!]!
        starred: Boolean!
    }

    type Genre {
        id: ID!
        name: String!
    }

    type Review {
        id: ID!
        author: String!
        content: String!
        url: String!
    }

    enum ImageWidth {
        W92
        W154
        W185
        W342
        W500
        W780
        ORIGINAL
    }

    type Image {
        url(width: ImageWidth = ORIGINAL): String
    }
`
