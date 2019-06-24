const RESTDataSource = require('apollo-datasource-rest').RESTDataSource

class MoviesAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'https://api.themoviedb.org/3/'
        this.apiKey = '0765741685876d4adad477eaf203dd55'
    }

    willSendRequest(request) {
        request.params.set('api_key', this.apiKey)
    }

    search({ query }) {
        return this.get('/search/movie', {
            query: query,
        })
    }

    getGenres() {
        return this.get('/genre/movie/list')
    }

    getMoviedDetails(id) {
        return this.get(`/movie/${id}`)
    }

    getSimilarMovies(id) {
        return this.get(`/movie/${id}/similar`)
    }

    getReviews(id) {
        return this.get(`/movie/${id}/reviews`)
    }
}

module.exports = MoviesAPI
