import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import '../styles/globals.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const MyApp = ({ Component, pageProps }) => {
  const client = new ApolloClient({
    uri: 'localhost:3000',
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
