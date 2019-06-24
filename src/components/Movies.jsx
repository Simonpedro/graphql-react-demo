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
} from '@material-ui/core'
import { styled } from '@material-ui/styles'
import MovieDetails from './MovieDetails'

const Movies = ({
    search,
    onChangeSearch,
    movies,
    onMovieSelected,
    movie,
    movieSelected,
    loadingMovies,
    loadingMovie,
}) => {
    return (
        <Container>
            <Grid container spacing={5}>
                <Grid item xs={6}>
                    <PaperStyled>
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
                                        </ListItem>
                                    ))}
                                </List>
                            </BoxStyled>
                        )}
                    </PaperStyled>
                </Grid>
                <Grid item xs={6}>
                    <PaperStyled>
                        {loadingMovie && (
                            <Box my={5}>
                                <CircularProgress />
                            </Box>
                        )}
                        {movie && <MovieDetails movie={movie} />}
                    </PaperStyled>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Movies

const PaperStyled = styled(Paper)({
    height: '70vh',
    padding: '1em 2em',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
})

const BoxStyled = styled(Box)({
    overflowY: 'scroll',
})
