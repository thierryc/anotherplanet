import { Component } from 'react'
import PropTypes from 'prop-types'

export default class ScrollHandler extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    const last_known_scroll_position = window.scrollY
    let ticking
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // doSomething(last_known_scroll_position);
        // console.log('scroll event')
        // console.log(e, last_known_scroll_position)
        this.props.onScrollUpdate(e, last_known_scroll_position)
        ticking = false
      });
    }
    ticking = true
  }

  render() {
    const { children } = this.props
    return (
     <div>
       {children}
     </div>
    );
  }
}

ScrollHandler.propTypes = {
  children: PropTypes.element.isRequired
};
