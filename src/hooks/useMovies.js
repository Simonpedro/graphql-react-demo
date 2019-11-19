import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'

const useMovies = search => {
    const { data, loading } = useQuery(SEARCH_QUERY, {
        variables: {
            search,
        },
        skip: !search,
    })

    const movies = data ? data.movies : []

    return { movies, loading }
}

export default useMovies

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
