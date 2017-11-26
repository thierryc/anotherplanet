import { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

// -----------------------------------------------

export default class Main extends Component {
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
