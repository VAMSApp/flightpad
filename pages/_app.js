import { AppLayout } from 'layouts'
import 'styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp
