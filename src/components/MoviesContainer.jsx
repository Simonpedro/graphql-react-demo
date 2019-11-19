import React from 'react'
import { useQuery, useMutation, useSubscription } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import Movies from './Movies'

const MoviesContainer = () => {
    const [search, setSearch] = React.useState('')
    const [starredMovies, setStarredMovies] = React.useState([])

    const [movieSelected, setMovieSelected] = React.useState(null)

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

    // Starred movies

    const { data: starredMoviesQueryData } = useQuery(STARRED_MOVIES_QUERY)

    // Mutations
    const toggleStarred = useMutation(TOGGLE_STARRED_MOVIE)

    // Subscriptions

    const { data: starredMoviesSubscriptionData } = useSubscription(
        STARRED_MOVIES_SUBSCRIPTION
    )

    // Handlers
    const handleMovieToggleStarredAction = movie =>
        toggleStarred({
            variables: { id: movie.id },
        })

    // Effects

    React.useEffect(() => {
        if (starredMoviesQueryData && starredMoviesQueryData.starredMovies) {
            setStarredMovies(starredMoviesQueryData.starredMovies)
        }
    }, [starredMoviesQueryData])

    React.useEffect(() => {
        if (
            starredMoviesSubscriptionData &&
            starredMoviesSubscriptionData.starredMovies
        ) {
            setStarredMovies(starredMoviesSubscriptionData.starredMovies)
        }
    }, [starredMoviesSubscriptionData])

    return (
        <Movies
            search={search}
            onChangeSearch={setSearch}
            loadingMovie={loadingMovie}
            movie={movie}
            movieSelected={movieSelected}
            onMovieSelected={setMovieSelected}
            onMovieToggleStarredAction={handleMovieToggleStarredAction}
            starredMovies={starredMovies}
        />
    )
}

export default MoviesContainer

const MOVIE_QUERY = gql`
    query MovieQuery($id: ID!) {
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

const STARRED_MOVIES_QUERY = gql`
    query StarredMovies {
        starredMovies {
            id
            title
            img {
                url(width: W92)
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

const STARRED_MOVIES_SUBSCRIPTION = gql`
    subscription StarredMoviesSubscription {
        starredMovies {
            id
            title
            img {
                url(width: W92)
            }
        }
    }
`
