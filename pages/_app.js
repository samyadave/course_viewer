import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import '../styles/globals.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const client = new ApolloClient({
  uri: 'api/graphql',
  cache: new InMemoryCache(),
})
const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
