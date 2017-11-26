import { Component } from 'react'
import PropTypes from 'prop-types'
import { detect } from 'detect-browser'
import semver from 'semver'

export default class DetectBrowser extends Component {
  constructor(props) {
    super(props)
    this.state = {browser: {}};
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const browser = detect();
      if (browser) {
        this.setState({ browser: browser })
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {}
  }

  render() {
    // deferred-styles
    if (
      this.state.browser.name == 'ie' && semver.lt(this.state.browser.version, '10.0.0')
    ) {
      return (
        <p style={{ textAlign: 'center',  padding: '1em', fontSize: '13px'}}>
          Your web browser is <b>out-of-date</b>. <br/>
          Update your browser for more security, comfort and the best experience on this site.
        </p>
      )
    }
    return null
  }
}
