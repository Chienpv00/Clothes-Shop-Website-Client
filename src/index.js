import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'

import GlobalStyles from '~/components/GlobalStyles'
import { HelmetProvider } from 'react-helmet-async'
import AuthContextProvider from '~/context/AuthContext'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { getTokens } from './utils/manageTokens'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const tokens = getTokens()
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken
        },
    }
})

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql', 
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <HelmetProvider>
                <AuthContextProvider>
                    <GlobalStyles>
                        <App />
                    </GlobalStyles>
                </AuthContextProvider>
            </HelmetProvider>
        </ApolloProvider>
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
