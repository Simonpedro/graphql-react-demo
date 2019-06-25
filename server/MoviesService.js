class MoviesService {
    constructor(moviesAPI) {
        this.db = require('./db')
        this.moviesAPI = moviesAPI
    }

    isMovieStarred(id) {
        const isMovieStarred = this.db
            .get('starredMoviesIds')
            .value()
            .includes(id.toString())
        return isMovieStarred
    }

    starMovie(id) {
        if (this.isMovieStarred(id)) {
            return
        }
        this.db
            .update('starredMoviesIds', starredMoviesIds =>
                starredMoviesIds.concat(id)
            )
            .write()
    }

    unstarMovie(id) {
        this.db
            .update('starredMoviesIds', starredMoviesIds =>
                starredMoviesIds.filter(starredId => starredId !== id)
            )
            .write()
    }

    toggleStarredMove(id) {
        if (this.isMovieStarred(id)) {
            this.unstarMovie(id)
        } else {
            this.starMovie(id)
        }
    }

    getStarredMoviesIds() {
        return this.db.get('starredMoviesIds').value()
    }

    getStarredMovies() {
        const ids = this.getStarredMoviesIds()
        return Promise.all(ids.map(id => this.moviesAPI.getMovieDetails(id)))
    }
}

module.exports = MoviesService
