import Link from 'next/link'
import Head from 'next/head'
// import Header from '.header'
// import Footer from '.footer'
import Scss from '../scss/main.scss'

export default ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name="viewport" content="initial-scale=1.0, width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
      <link rel="stylesheet" type="text/css" href="static/css/bundle.css"/>
    </Head>
    <header>
      {/*
      <nav>
        <Link href='/'><a>Home</a></Link> |
        <Link href='/about'><a>About</a></Link> |
        <Link href='/contact'><a>Contact</a></Link>
      </nav>
      */}
    </header>

    { children }

    <footer>
      <p>© 1994 - 2017 Thierry Charbonnel - All Rights Reserved</p>
    </footer>

    <style jsx>{`
      footer {
        font-size: 0.6666em;
        text-align: center;
        color: #5576A6;
      }
    `}</style>
  </div>
)
