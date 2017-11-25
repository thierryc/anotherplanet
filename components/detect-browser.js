import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import browser from 'detect-browser'
import semver from 'semver'

export default class DetectBrowser extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {browser: {}};
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      if (browser) {
        this.setState({ browser: browser })
        console.log(browser.name);
        console.log(browser.version);
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {}
  }

  render() {
    // deferred-styles
    if (
      browser.name == 'ie' && semver.lt(browser.version, '10.0.0')
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
