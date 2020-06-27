import React from "react"
import ScrollIcon from '../../svgs/scroll-icon.svg'

export default ({scrollcontrol = 0, ...props}) => (
  <div>
    <ScrollIcon />
    <style jsx>{`

      div {
        opacity: ${ (scrollcontrol < 100) ? 1.0 : 0.0 };
        transition: opacity 1s ease;
        width: 100px;
        margin: 0 auto;
      }

      div :global(svg > g) {
        animation: scrollIcon 2s ease infinite;
      }

      @keyframes scrollIcon {
        0% {
          opacity: 1;
          transform: translateY(0);
        }
        25% {
          opacity: 1;
        }
        35% {
          opacity: 0;
        }
        100% {
          opacity: 0;
          transform: translateY(40px);
        }
      }
    `}</style>
  </div>
)
