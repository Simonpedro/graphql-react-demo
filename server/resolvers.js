const resolvers = {
    Query: {
        movies: async (_parent, args, { dataSources }) => {
            const { results } = await dataSources.moviesAPI.search({
                query: args.search,
            })
            return results
        },
        movie: (parent, args, { dataSources }) => {
            return dataSources.moviesAPI.getMoviedDetails(args.id)
        },
    },
    Movie: {
        img: parent => parent.poster_path,
        description: parent => parent.overview,
        genres: async (parent, _args, { dataSources }) => {
            if (parent.genres) {
                return parent.genres
            }
            const { genres } = await dataSources.moviesAPI.getGenres()
            const movieGenderIds = parent.genre_ids
            return genres.filter(g => movieGenderIds.includes(g.id))
        },
        similarMovies: async (parent, _args, { dataSources }) => {
            const { results } = await dataSources.moviesAPI.getSimilarMovies(
                parent.id
            )
            return atMost(5, results)
        },
        reviews: async (parent, _args, { dataSources }) => {
            const { results } = await dataSources.moviesAPI.getReviews(
                parent.id
            )
            return atMost(5, results)
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
const atMost = (quantity, array) => array.slice(0, Math.min(5, array.length))
