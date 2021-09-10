import '../styles/globals.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import PageLayout from '../components/PageLayout'

function MyApp({ Component, pageProps }) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}

export default MyApp
