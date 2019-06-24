import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo-hooks'
import MoviesContainer from './components/MoviesContainer'
import Layout from './components/Layout'
import './App.css'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
})

const App = () => (
    <ApolloProvider client={client}>
        <Layout>
            <MoviesContainer />
        </Layout>
    </ApolloProvider>
)

export default App
