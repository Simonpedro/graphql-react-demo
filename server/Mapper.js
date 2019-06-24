class Mapper {
    mapMovie(movie) {
        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            imgPath: movie.poster_path,
        }
    }
}

module.exports = Mapper
