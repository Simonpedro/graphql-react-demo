import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import Autocomplete from './Autocomplete'
import useMovies from '../../hooks/useMovies'

jest.mock('../../hooks/useMovies')

describe('Autocomplete', () => {
    beforeEach(() => {
        useMovies.mockImplementation(() => ({
            movies: fakeMovies,
            loading: false,
        }))
    })

    it('renders without crashing', () => {
        render(<Autocomplete onSelected={noop} onStarred={noop} />)
    })

    it('shows the loading state', () => {
        useMovies.mockImplementation(() => ({
            movies: [],
            loading: true,
        }))
        const { queryByTestId } = render(
            <Autocomplete onSelected={noop} onStarred={noop} />
        )

        expect(queryByTestId('loading')).toBeDefined()
    })

    it('shows the correct selected option', () => {
        const { getByTestId } = render(
            <Autocomplete onSelected={noop} selectedId="4" onStarred={noop} />
        )

        expect(getByTestId('item-4').dataset.selected).toBe('true')
    })

    it('shows the options correctly when there are matching movies', () => {
        const { queryByText } = render(
            <Autocomplete onSelected={noop} onStarred={noop} />
        )

        fakeMovies.forEach(m => expect(queryByText(m.title)).toBeDefined())
    })

    it('shows the starred options correctly', () => {
        const { getByTestId } = render(
            <Autocomplete onSelected={noop} selectedId="4" onStarred={noop} />
        )

        expect(getByTestId('item-2').dataset.starred).toBe('true')
    })

    it('shows just the matching options for arbitrary search ', () => {
        jest.useFakeTimers()
        useMovies.mockImplementation(search => ({
            movies: filterMovies(fakeMovies, search),
            loading: false,
        }))
        const { getByLabelText, queryByText } = render(
            <Autocomplete onSelected={noop} onStarred={noop} />
        )
        const input = getByLabelText('Título')
        const search = 'Harr'

        fireEvent.change(input, { target: { value: search } })

        act(() => {
            jest.runAllTimers()
        })

        const moviesThatShouldExist = filterMovies(fakeMovies, search)
        const moviesThatShouldNotExist = diff(fakeMovies, moviesThatShouldExist)
        moviesThatShouldExist.forEach(m =>
            expect(queryByText(m.title)).toBeDefined()
        )
        moviesThatShouldNotExist.forEach(m =>
            expect(queryByText(m.title)).toBeNull()
        )
    })

    it('doest NOT show options for non-matching search ', () => {
        jest.useFakeTimers()
        useMovies.mockImplementation(search => ({
            movies: filterMovies(fakeMovies, search),
            loading: false,
        }))
        const { getByLabelText, queryByText } = render(
            <Autocomplete onSelected={noop} onStarred={noop} />
        )
        const input = getByLabelText('Título')
        const search = 'React Rosario'

        fireEvent.change(input, { target: { value: search } })

        act(() => {
            jest.runAllTimers()
        })

        const moviesThatShouldExist = filterMovies(fakeMovies, search)
        const moviesThatShouldNotExist = diff(fakeMovies, moviesThatShouldExist)
        expect(moviesThatShouldExist).toHaveLength(0)
        expect(moviesThatShouldNotExist).toEqual(fakeMovies)
        fakeMovies.forEach(m => expect(queryByText(m.title)).toBeNull())
    })

    it('triggers onSelected with the correct movie when option clicked', () => {
        const handleSelected = jest.fn()
        const { getByText } = render(
            <Autocomplete onSelected={handleSelected} onStarred={noop} />
        )

        fireEvent.click(getByText('Forrest Gump'))

        expect(handleSelected.mock.calls).toHaveLength(1)
        expect(handleSelected.mock.calls[0][0]).toEqual(
            getMovieByTitle('Forrest Gump')
        )
    })

    it('triggers onStarred with the correct when option starred', () => {
        const handleStarred = jest.fn()
        const { getByTitle } = render(
            <Autocomplete onSelected={noop} onStarred={handleStarred} />
        )

        fireEvent.click(getByTitle('Mark Forrest Gump as starred'))

        expect(handleStarred.mock.calls).toHaveLength(1)
        expect(handleStarred.mock.calls[0][0]).toEqual(
            getMovieByTitle('Forrest Gump')
        )
    })
})

const noop = () => {}

const fakeMovies = [
    {
        id: '1',
        title: 'Harry Potter 1',
        description: 'Harry Potter 1',
        starred: false,
        img: {
            url: 'some',
        },
        genres: [],
        similarMovies: [],
        reviews: [],
    },
    {
        id: '2',
        title: 'Harry Potter 2',
        description: 'Harry Potter 2',
        starred: true,
        img: {
            url: 'some',
        },
        genres: [],
        similarMovies: [],
        reviews: [],
    },
    {
        id: '3',
        title: 'Harry Potter 3',
        description: 'Harry Potter 3',
        starred: false,
        img: {
            url: 'some',
        },
        genres: [],
        similarMovies: [],
        reviews: [],
    },
    {
        id: '4',
        title: 'Forrest Gump',
        description: 'Forrest Gump',
        starred: false,
        img: {
            url: 'some',
        },
        genres: [],
        similarMovies: [],
        reviews: [],
    },
]

const filterMovies = (movies, search) =>
    movies.filter(m => m.title.includes(search))

const getMovieByTitle = title => fakeMovies.find(m => m.title === title)

const diff = (left, right) =>
    left.filter(lm => !right.some(rm => lm.id === rm.id))
