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
                    id="title"
                    fullWidth
                    label="Título"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </Box>

            {loading && (
                <Box my={5}>
                    <CircularProgress data-testid="loading" />
                </Box>
            )}
            {movies && (
                <BoxStyled flexGrow={1} data-testid="movies-list">
                    <List>
                        {movies.map(m => {
                            const selected = selectedId && selectedId === m.id
                            return (
                                <ListItem
                                    key={m.id}
                                    button
                                    onClick={() => onSelected(m)}
                                    selected={selectedId && selectedId === m.id}
                                    data-testid={`item-${m.id}`}
                                    data-selected={selected ? 'true' : 'false'}
                                    data-starred={m.starred ? 'true' : 'false'}
                                >
                                    <ListItemAvatar>
                                        {m.img && m.img.url && (
                                            <Avatar src={m.img.url} />
                                        )}
                                    </ListItemAvatar>
                                    <ListItemText primary={m.title} />
                                    <ListItemSecondaryAction
                                        onClick={() => onStarred(m)}
                                        title={`Mark ${m.title} as starred`}
                                    >
                                        <ToggleStarredButton
                                            data-testid={`toggle-starred-button-${m.id}`}
                                            starred={m.starred}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
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
