import ReactGA from 'react-ga'
import config from '../site-config'

export const initGA = () => {
  //console.log('GA init: ' + config.GATag)
  ReactGA.initialize(config.GATag)
}

export const logPageView = () => {
  if (typeof window !== 'undefined') {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }
  // console.log(`Logging pageview for ${window.location.pathname}`)
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const outboundEvent = (event) => {
  if (event) {
    const link = event.target.href;
    ReactGA.outboundLink({
      label: link
    }, () => {
      //console.log('event sent', event);
    })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
