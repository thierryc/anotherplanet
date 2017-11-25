import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

// -----------------------------------------------

export default class Main extends PureComponent {
  render () {
    return (<div>
      <Head>
        <title>Title</title>
      </Head>

      <header>

      </header>

      <div id='mainContainer'>
        AP 1
      </div>
    </div>)
  }
}

Main.propTypes = {

}
