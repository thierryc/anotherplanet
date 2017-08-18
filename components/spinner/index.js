import Scss from './style.scss'

export default ({backgroundColor = '#000000'}) => (
  <div className={ Scss['loader'] } style={{ width: '25px', height: '25px' }}>
    <svg className="circular" viewBox="25 25 50 50">
      <circle className={ Scss['path']} cx="50" cy="50" r="20" fill="none" strokeWidth="5"/>
      <circle className={ Scss['background']} cx="50" cy="50" r="20" fill="none" stroke={ backgroundColor } strokeWidth="5"/>
    </svg>
  </div>
)
