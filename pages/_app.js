import 'semantic-ui-css/semantic.min.css'
import Layout from 'components/Layout'
import '../css/style.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

function MyApp({ Component, pageProps }) {
    return <Layout><Component {...pageProps} /></Layout>
}

export default MyApp