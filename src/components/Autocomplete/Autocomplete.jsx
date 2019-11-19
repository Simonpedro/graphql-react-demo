import React from 'react'
import {
    TextField,
    CircularProgress,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core'
import { styled } from '@material-ui/styles'
import useDebounce from '../../hooks/useDebounce'
import useMovies from '../../hooks/useMovies'
import ToggleStarredButton from '../ToggleStarredButton'

const Autocomplete = ({ onSelected, selectedId, onStarred }) => {
    const [search, setSearch] = React.useState('')
    const searchDebounced = useDebounce(search, 500)

    const { movies, loading } = useMovies(searchDebounced)

    return (
        <>
            <Box mb={1}>
                <TextField
                    fullWidth
                    label="Título"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </Box>

            {loading && (
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
                                onClick={() => onSelected(m)}
                                selected={selectedId && selectedId === m.id}
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
                                        onClick={() => onStarred(m)}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </BoxStyled>
            )}
        </>
    )
}

export default Autocomplete

const BoxStyled = styled(Box)({
    overflowY: 'scroll',
})
