import { outboundEvent } from '~/utils/analytics'

export default ({data}) => (
  <span>{
      Object.keys(data).map((key, index, arr) => {
        const item = data[key]
        if (item.active === false) { return }
        let end
        if(index +1 < arr.length) end =', '
        else end = '.'
        return (
          <span key={index} ><a href={ item.link } onClick={outboundEvent} target="_blank" rel="noopener">{item.name}</a>{end}</span>
        )
      })
    }
    <style jsx>{`
      a {
        text-transform: capitalize;
        padding: 0 .2em;
        border-radius: .1em;
        background-color: rgba(0,0,0,0.1);
      }
    `}</style>
  </span>
)
