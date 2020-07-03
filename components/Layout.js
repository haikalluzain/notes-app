import Head from 'next/head'
import Navbar from 'components/Navbar'

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Notes App</title>
        </Head>
        <Navbar />
        {children}
    </>
)

export default Layout