module.exports = class MoviesService {
    constructor() {
        this.db = require('./db')
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
}
