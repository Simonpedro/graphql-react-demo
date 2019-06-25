const { gql } = require('apollo-server')
module.exports = gql`
    type Query {
        movies(search: String!): [Movie!]!

        movie(id: String!): Movie

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
        id: String!
        title: String!
        description: String
        img: Image
        genres: [Genre!]!
        similarMovies: [Movie!]!
        reviews: [Review!]!
        starred: Boolean!
    }

    type Genre {
        id: String!
        name: String!
    }

    type Review {
        id: String!
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
