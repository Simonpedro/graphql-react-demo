import React from 'react'
import {
    Grid,
    Box,
    Typography,
    Chip,
    GridList,
    GridListTile,
    GridListTileBar,
} from '@material-ui/core'
import { styled } from '@material-ui/styles'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import Carousel from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import ToggleStarredButton from './ToggleStarredButton'
import Title from './Title'

const MovieDetails = ({ movie, onMovieToggleStarredAction }) => {
    return (
        <Grid container direction="column">
            <Grid container>
                <Grid item xs={3}>
                    {movie.img && movie.img.url && (
                        <img
                            src={movie.img.url}
                            alt={`Imagen de ${movie.title}`}
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    )}
                </Grid>
                <Grid item xs={9}>
                    <Box px={2} textAlign="left">
                        <Box display="flex" alignItems="center">
                            <Title>{movie.title}</Title>
                            <ToggleStarredButton
                                starred={movie.starred}
                                onClick={() =>
                                    onMovieToggleStarredAction(movie)
                                }
                            />
                        </Box>

                        <Box display="flex" flexWrap="wrap" py={1}>
                            {movie.genres.map(g => (
                                <Chip
                                    key={g.id}
                                    label={g.name}
                                    size="small"
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                        <Description>{movie.description}</Description>
                    </Box>
                </Grid>
            </Grid>
            <Box overflow="hidden" my={2} textAlign="left">
                <Title>Películas similares</Title>
                {movie.similarMovies && movie.similarMovies.length > 0 && (
                    <GridListStyled>
                        {movie.similarMovies.map(movie => (
                            <GridListTileStyled key={movie.id}>
                                {movie.img && (
                                    <img
                                        src={movie.img.url}
                                        alt={movie.title}
                                    />
                                )}
                                <GridListTileBar title={movie.title} />
                            </GridListTileStyled>
                        ))}
                    </GridListStyled>
                )}

                {!movie.similarMovies ||
                    (movie.similarMovies.length === 0 && (
                        <Typography>Sin películas relacionadas</Typography>
                    ))}
            </Box>
            <Box overflow="hidden" my={2} textAlign="left" width={1}>
                <Title>Reviews</Title>
                {movie.reviews && movie.reviews.length > 0 && (
                    <Carousel
                        arrowLeft={<ChevronLeft role="button" />}
                        arrowRight={<ChevronRight role="button" />}
                        addArrowClickHandler
                    >
                        {movie.reviews.map(review => (
                            <Review key={review.id} review={review} />
                        ))}
                    </Carousel>
                )}
                {!movie.reviews ||
                    (movie.reviews.length === 0 && (
                        <Typography>Sin reviews</Typography>
                    ))}
            </Box>
        </Grid>
    )
}

export default MovieDetails

const Description = styled(Typography)({
    fontSize: '0.8em',
    color: '#868686',
})

const GridListStyled = styled(GridList)({
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
})

const GridListTileStyled = styled(GridListTile)({})

const Blockquote = styled('blockquote')({
    color: '#868686',
    fontSize: '0.9em',
    fontStyle: 'italic',
})
const Review = ({ review }) => {
    const reviewPart = review.content.slice(0, 250)
    return (
        <div>
            <Blockquote>
                "{`${reviewPart}${review.content.length > 250 ? '...' : ''}`}"
            </Blockquote>
            <Box textAlign="right">
                <strong>{review.author}</strong>
            </Box>
        </div>
    )
}
