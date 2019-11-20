import React from 'react'
import Container from '@material-ui/core/Container'
import {
    Grid,
    Paper,
    CircularProgress,
    Box,
    Avatar,
    Chip,
} from '@material-ui/core'
import { styled } from '@material-ui/styles'
import MovieDetails from './MovieDetails'
import Title from './Title'
import Autocomplete from './Autocomplete/Autocomplete'

const Movies = ({
    onMovieSelected,
    movie,
    movieSelected,
    loadingMovie,
    onMovieToggleStarredAction,
    starredMovies,
}) => {
    return (
        <Container>
            <Grid container spacing={5}>
                <Grid item xs={6}>
                    <PaperStyledColumn>
                        <Autocomplete
                            onSelected={onMovieSelected}
                            selectedId={movieSelected && movieSelected.id}
                            onStarred={onMovieToggleStarredAction}
                        />
                    </PaperStyledColumn>
                </Grid>
                <Grid item xs={6}>
                    <PaperStyledColumn>
                        {loadingMovie && (
                            <Box my={5}>
                                <CircularProgress />
                            </Box>
                        )}
                        {movie && (
                            <MovieDetails
                                movie={movie}
                                onMovieSelected={onMovieSelected}
                                onMovieToggleStarredAction={
                                    onMovieToggleStarredAction
                                }
                            />
                        )}
                    </PaperStyledColumn>
                </Grid>
            </Grid>
            {starredMovies && starredMovies.length > 0 && (
                <Box width={1} mt="1em">
                    <PaperStyledRow>
                        <Title>Películas favoritas</Title>
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="center"
                            alignItems="center"
                            flexWrap="wrap"
                        >
                            {starredMovies.map(starredMovie => (
                                <Box p={0.5} key={starredMovie.id}>
                                    <Chip
                                        data-testid={`chip-${starredMovie.id}`}
                                        onClick={() =>
                                            onMovieSelected(starredMovie)
                                        }
                                        avatar={
                                            starredMovie.img ? (
                                                <Avatar
                                                    src={starredMovie.img.url}
                                                />
                                            ) : (
                                                    undefined
                                                )
                                        }
                                        label={starredMovie.title}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </PaperStyledRow>
                </Box>
            )}
        </Container>
    )
}

export default Movies

const PaperStyledBase = styled(Paper)({
    padding: '1em 2em',
    overflowY: 'auto',
})

const PaperStyledColumn = styled(PaperStyledBase)({
    display: 'flex',
    flexDirection: 'column',
    height: '70vh',
})

const PaperStyledRow = styled(PaperStyledBase)({})

const BoxStyled = styled(Box)({
    overflowY: 'scroll',
})
