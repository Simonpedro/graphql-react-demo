import React from 'react'
import Container from '@material-ui/core/Container'
import {
    Grid,
    Paper,
    TextField,
    CircularProgress,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    Chip,
} from '@material-ui/core'
import { styled } from '@material-ui/styles'
import MovieDetails from './MovieDetails'
import ToggleStarredButton from './ToggleStarredButton'
import Title from './Title'

const Movies = ({
    search,
    onChangeSearch,
    movies,
    onMovieSelected,
    movie,
    movieSelected,
    loadingMovies,
    loadingMovie,
    onMovieToggleStarredAction,
    starredMovies,
}) => {
    return (
        <Container>
            <Grid container spacing={5}>
                <Grid item xs={6}>
                    <PaperStyledColumn>
                        <Box mb={1}>
                            <TextField
                                fullWidth
                                label="Título"
                                value={search}
                                onChange={e => onChangeSearch(e.target.value)}
                            />
                        </Box>

                        {loadingMovies && (
                            <Box my={5}>
                                <CircularProgress />
                            </Box>
                        )}
                        {movies && (
                            <BoxStyled flexGrow={1}>
                                <List>
                                    {movies.map(m => (
                                        <ListItem
                                            key={m.id}
                                            button
                                            onClick={() => onMovieSelected(m)}
                                            selected={
                                                movieSelected &&
                                                movieSelected.id === m.id
                                            }
                                        >
                                            <ListItemAvatar>
                                                {m.img && m.img.url && (
                                                    <Avatar src={m.img.url} />
                                                )}
                                            </ListItemAvatar>
                                            <ListItemText primary={m.title} />
                                            <ListItemSecondaryAction>
                                                <ToggleStarredButton
                                                    starred={m.starred}
                                                    onClick={() =>
                                                        onMovieToggleStarredAction(
                                                            m
                                                        )
                                                    }
                                                />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>
                            </BoxStyled>
                        )}
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
                        <Title>Starred movies</Title>
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
