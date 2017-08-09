import { Component } from 'react'
import PropTypes from 'prop-types'

export default class CssLoader extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { id } = this.props
    this.loadDeferredStyles = () => {
      var addStylesNode = document.getElementById(id);
      var replacement = document.createElement("div");
      replacement.innerHTML = addStylesNode.textContent;
      document.body.appendChild(replacement)
      addStylesNode.parentElement.removeChild(addStylesNode);
    };

    const raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
    if (raf) {
      raf(function() {
        window.setTimeout(this.loadDeferredStyles, 0);
      });
    } else {
      window.addEventListener('load', this.loadDeferredStyles);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.loadDeferredStyles);
  }

  render() {
    // deferred-styles
    const { href, id } = this.props
    console.log(href, id);
    return (
     <div>
       <noscript id={id}>
         <link rel="stylesheet" type="text/css" href={ href }/>
       </noscript>
     </div>
    );
  }
}

CssLoader.propTypes = {
  href: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
