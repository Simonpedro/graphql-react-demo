import React from 'react'
import apolloClient from './apolloClient'
import { ApolloProvider } from 'react-apollo-hooks'
import MoviesContainer from './components/MoviesContainer'
import Layout from './components/Layout'
import './App.css'

const App = () => (
    <ApolloProvider client={apolloClient}>
        <Layout>
            <MoviesContainer />
        </Layout>
    </ApolloProvider>
)

export default App
