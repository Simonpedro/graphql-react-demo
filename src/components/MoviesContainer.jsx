import React from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import Movies from './Movies'
import useDebounce from '../hooks/useDebounce'

const MoviesContainer = () => {
    const [search, setSearch] = React.useState('')
    const searchDebounced = useDebounce(search, 500)

    const [movieSelected, setMovieSelected] = React.useState(null)

    // Left section data
    const { data: searchQueryData, loading: loadingMovies } = useQuery(
        SEARCH_QUERY,
        {
            variables: {
                search: searchDebounced,
            },
            skip: !searchDebounced,
        }
    )
    const movies = searchQueryData && searchQueryData.movies

    // Right section data
    const { data: movieQueryData, loading: loadingMovie } = useQuery(
        MOVIE_QUERY,
        {
            variables: {
                id: movieSelected && movieSelected.id,
            },
            skip: !movieSelected,
        }
    )
    const movie = movieQueryData && movieQueryData.movie

    // Mutations
    const toggleStarred = useMutation(TOGGLE_STARRED_MOVIE)

    // Handlers
    const handleMovieToggleStarredAction = movie =>
        toggleStarred({
            variables: { id: movie.id },
        })

    return (
        <Movies
            search={search}
            onChangeSearch={setSearch}
            loadingMovies={loadingMovies}
            loadingMovie={loadingMovie}
            movies={movies}
            movie={movie}
            movieSelected={movieSelected}
            onMovieSelected={setMovieSelected}
            onMovieToggleStarredAction={handleMovieToggleStarredAction}
        />
    )
}

export default MoviesContainer

const SEARCH_QUERY = gql`
    query SearchQuery($search: String!) {
        movies(search: $search) {
            id
            title
            starred
            img {
                url(width: W92)
            }
        }
    }
`

const MOVIE_QUERY = gql`
    query MovieQuery($id: String!) {
        movie(id: $id) {
            id
            title
            starred
            description
            img {
                url(width: W185)
            }
            genres {
                id
                name
            }
            reviews {
                id
                author
                content
                url
            }
            similarMovies {
                id
                title
                img {
                    url
                }
            }
        }
    }
`

const TOGGLE_STARRED_MOVIE = gql`
    mutation ToggleStarredMovie($id: String!) {
        toggleStarredMovie(id: $id) {
            id
            starred
        }
    }
`
