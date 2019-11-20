import React from 'react'
import { mount, shallow } from 'enzyme'
import {
    CircularProgress,
    ListItem,
    ListItemSecondaryAction,
} from '@material-ui/core'
import Autocomplete from './Autocomplete'
import useMovies from '../../hooks/useMovies'
import useDebounce from '../../hooks/useDebounce'

jest.mock('../../hooks/useMovies')
jest.mock('../../hooks/useDebounce')

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

useMovies.mockImplementation(search => ({
    movies: fakeMovies,
    loading: false,
}))

describe('Autocomplete', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
            <Autocomplete onSelected={() => {}} onStarred={() => {}} />
        )
        expect(wrapper.exists()).toBe(true)
    })
    it('shows the correct selected option', () => {
        const wrapper = shallow(
            <Autocomplete
                selectedId="1"
                nSelected={() => {}}
                onStarred={() => {}}
            />
        )
        expect(
            wrapper
                .find(ListItem)
                .first()
                .prop('selected')
        ).toBe(true)
    })
    it('shows the list items correctly when there are matching movies', () => {
        const wrapper = shallow(
            <Autocomplete onSelected={() => {}} onStarred={() => {}} />
        )

        expect(wrapper.find(ListItem).length).toBe(fakeMovies.length)
    })
    it('shows just the matching options for arbitrary search ', () => {
        useDebounce.mockImplementation(value => value)
        const wrapper = mount(
            <Autocomplete onSelected={() => {}} onStarred={() => {}} />
        )

        useMovies.mockImplementation(search => ({
            movies: fakeMovies.filter(movie => movie.title.includes(search)),
            loading: false,
        }))

        const input = wrapper.find('input')
        input.simulate('change', { target: { value: 'Harry' } })

        expect(
            wrapper.find(ListItem).someWhere(e => e.text() === 'Forrest Gump')
        ).toBe(false)
    })
    it('does not show options for non-matching search ', () => {
        useDebounce.mockImplementation(value => value)
        const wrapper = mount(
            <Autocomplete onSelected={() => {}} onStarred={() => {}} />
        )

        useMovies.mockImplementation(search => ({
            movies: fakeMovies.filter(movie => movie.title.includes(search)),
            loading: false,
        }))

        const input = wrapper.find('input')
        input.simulate('change', { target: { value: 'Some' } })

        expect(wrapper.find(ListItem).length).toBe(0)
    })
    it('triggers onSelected with the correct movie when option clicked', () => {
        const onSelected = jest.fn()
        const wrapper = mount(
            <Autocomplete onSelected={onSelected} onStarred={() => {}} />
        )

        wrapper
            .find(ListItem)
            .first()
            .props()
            .onClick()
        expect(onSelected).toBeCalled()
        expect(onSelected.mock.calls[0][0]).toEqual(fakeMovies[0])
    })
    it('triggers onStarred with the correct movie when option starred', () => {
        const onStarred = jest.fn()
        const wrapper = mount(
            <Autocomplete onSelected={() => {}} onStarred={onStarred} />
        )

        wrapper
            .find(ListItemSecondaryAction)
            .first()
            .props()
            .onClick()
        expect(onStarred).toBeCalled()
        expect(onStarred.mock.calls[0][0]).toEqual(fakeMovies[0])
    })
    it('renders the loading state', () => {
        useMovies.mockImplementation(search => ({
            movies: fakeMovies,
            loading: true,
        }))
        const wrapper = shallow(
            <Autocomplete onSelected={() => {}} onStarred={() => {}} />
        )

        const progress = wrapper.find(CircularProgress)

        expect(progress.exists()).toBe(true)
    })
})
