import { outboundEvent } from '~/utils/analytics'

export default ({userId, showCount = false, dataSize = 'large'}) => (
  <span><a
    href={'https://twitter.com/' + userId}
    className="twitter-follow-button"
    data-show-count="false"
    data-size={dataSize}
    onClick={outboundEvent}
    >Follow @{userId}</a>
    <script async src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>
  </span>
)
