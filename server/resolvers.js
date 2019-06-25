const MOVIE_STARRED_TOGGLED = 'MOVIE_STARRED_TOGGLED'

const resolvers = {
    Subscription: {
        starredMovies: {
            resolve: (_payload, _args, { services }) =>
                services.movies.getStarredMovies(),
            subscribe: (_parent, _args, { services }) =>
                services.pubsub.asyncIterator([MOVIE_STARRED_TOGGLED]),
        },
    },
    Query: {
        movies: async (_parent, args, { services }) => {
            const { results } = await services.moviesAPI.search({
                query: args.search,
            })
            return results
        },
        movie: (_parent, args, { services }) => {
            return services.moviesAPI.getMovieDetails(args.id)
        },
        starredMovies: (_parent, _args, { services }) =>
            services.movies.getStarredMovies(),
    },
    Mutation: {
        toggleStarredMovie: (_parent, { id }, { services }) => {
            services.movies.toggleStarredMove(id)
            services.pubsub.publish(MOVIE_STARRED_TOGGLED)
            return services.moviesAPI.getMovieDetails(id)
        },
    },
    Movie: {
        id: movie => movie.id.toString(),
        img: parent => parent.poster_path,
        description: parent => parent.overview,
        genres: async (parent, _args, { services }) => {
            if (parent.genres) {
                return parent.genres
            }
            const { genres } = await services.moviesAPI.getGenres()
            const movieGenderIds = parent.genre_ids
            return genres.filter(g => movieGenderIds.includes(g.id))
        },
        similarMovies: async (parent, _args, { services }) => {
            const { results } = await services.moviesAPI.getSimilarMovies(
                parent.id
            )
            return atMost(5, results)
        },
        reviews: async (parent, _args, { services }) => {
            const { results } = await services.moviesAPI.getReviews(parent.id)
            return atMost(5, results)
        },
        starred: (movie, _args, { services }) => {
            return services.movies.isMovieStarred(movie.id)
        },
    },
    Image: {
        url: (path, args) => {
            const size = args.width.toLowerCase()
            return `https://image.tmdb.org/t/p/${size}${path}`
        },
    },
}

module.exports = resolvers

/**
 * Return at most {quantity} elements from array
 *
 * @param {number} quantity
 * @param {array} array
 */
const atMost = (quantity, array) =>
    array.slice(0, Math.min(quantity, array.length))
