import { Component } from 'react'
import PropTypes from 'prop-types'

export default class CssLoader extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {

    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {

    }
  }

  render() {
    // deferred-styles
    const { href } = this.props
    return (
      <noscript>
        <link rel="stylesheet" type="text/css" href={ href }/>
      </noscript>
    );
  }
}

CssLoader.propTypes = {
  href: PropTypes.string.isRequired
}


/*
<noscript id="deferred-styles">
      <link rel="stylesheet" type="text/css" href="small.css"/>
    </noscript>
    <script>
      var loadDeferredStyles = function() {
        var addStylesNode = document.getElementById("deferred-styles");
        var replacement = document.createElement("div");
        replacement.innerHTML = addStylesNode.textContent;
        document.body.appendChild(replacement)
        addStylesNode.parentElement.removeChild(addStylesNode);
      };
      var raf = requestAnimationFrame || mozRequestAnimationFrame ||
          webkitRequestAnimationFrame || msRequestAnimationFrame;
      if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
      else window.addEventListener('load', loadDeferredStyles);
    </script>

    */
