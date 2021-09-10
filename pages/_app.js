import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import '../styles/globals.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import PageLayout from '../components/PageLayout'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider
      client={
        new ApolloClient({
          uri: 'localhost:3000',
          cache: new InMemoryCache(),
        })
      }
    >
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ApolloProvider>
  )
}

export default MyApp
