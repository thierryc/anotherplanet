import {Component} from 'react'
import ReactDOM from 'react-dom'
import dynamic from 'next/dynamic'
// components
import Layout from '~/components/layout'
import { Container, Row, Cell } from '~/components/grid'
import config from '~/components/site-config'
// Styles
import Scss from '../scss/main.scss'


// ScrollHandler
import ScrollHandler from '~/components/scrollHandler'

const WebGlNoSSR = dynamic(
  import('../components/webGl'),
  { ssr: false }
)

export default class Index extends Component {
  static getInitialProps ({ req }) {
    let userAgent
    if (process.browser) {
      // userAgent = navigator.userAgent
    } else {
      // userAgent = req.headers['user-agent']
    }
    return { userAgent }
  }

  constructor(props) {
    super(props)
    let scrollY = 0
    if (typeof window !== 'undefined') {
      scrollY = window.scrollY;
    }
    this.state = {scrollY: scrollY, viewport: {
      w: 0,
      h: 0
    }}
    this.scrollHandler = this.scrollHandler.bind(this)
    this.getViewport = this.getViewport.bind(this)
  }

  getInitialProps ({ req }) {
    return req
      ? { userAgent: req.headers['user-agent'] }
      : { userAgent: navigator.userAgent }
  }

  componentDidMount() {
    window.addEventListener('resize', this.getViewport, false )
    this.getViewport();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getViewport, false )
  }

  scrollHandler(e, last_known_scroll_position) {
    this.setState({
      scrollY: last_known_scroll_position
    });
  }

  getViewport() {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    this.setState({
      viewport: {
        w: w,
        h: h
      }
    });
  }

  render() {
    return (
      <Layout title='Another Planet - UX / UI and Code'>
        <ScrollHandler onScrollUpdate={this.scrollHandler}>
          <main className="homepage">

            <section className='hero'>
              <WebGlNoSSR timeControl={this.state.scrollY}></WebGlNoSSR>
              <div
                className={'scroll-view ' + ((this.state.scrollY < this.state.viewport.h) ? 'fix' : 'relase')}
                >
                <div className='main-name'>
                  <h1>Another Planet.io</h1>
                </div>
                <div className='baseline'>
                  <p>by Thierry Charbonnel <span className={ Scss.xsInlineNone }>–</span><span className={ Scss.xsInline }><br/></span> UX / UI and Code Designer</p>
                </div>
              </div>
              <div className={'scroll-icon ' + ((this.state.scrollY < this.state.viewport.h * 2) ? 'fix' : 'relase')}>

                <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="Page-1" stroke="none" fill="none" fillRule="evenodd">
                    <g id="scroll-icon">
                      <polyline className="arrowBottom" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="38.5566864 25.8789063 24.4145508 40.0210419 10.2724152 25.8789062"></polyline>
                      <polyline className="arrowMiddle" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="38.5566864 17.8789063 24.4145508 32.0210419 10.2724152 17.8789062"></polyline>
                      <polyline className="arrowUp" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="38.5566864 9.87890625 24.4145508 24.0210419 10.2724152 9.87890625"></polyline>
                    </g>
                  </g>
                </svg>

              </div>
            </section>

            <Container className="container">
              <Row className="ux">
                <Cell tablet={8} desktop={12} align={'middle'}>
                  <div className="intro">
                    <p>I am thinking about the intersection of technology + design.</p>
                    <p>My focus has been on User experience (UX), responsive design, componentized systems (atomic) and graphic design.</p>
                  </div>
                </Cell>
              </Row>
            </Container>

            <Container className="container">
              <Row className="links">
                <Cell tablet={8} desktop={12} align={'middle'}>
                  <div className="contact">
                    <p>Say hello: {
                        config.socialLinks.map((item, index, arr) => {
                          let end
                          if(index +1 < arr.length) end =', '
                          else end = '.'
                          return (
                            <span key={index} ><a href={ item.link } target="_blank" className="social-links">{item.name}</a>{end}</span>
                          )
                        })
                      }
                    </p>
                  </div>
                </Cell>
              </Row>
            </Container>

            <Container className="container">

              <Row className="code">
                <Cell tablet={8} desktop={12}>
                  <p className="github"><a href="{config.socialLinks.publicRepository.link}" target="_blank">Browse the Code Repository of this web site on Github</a></p>
                </Cell>
              </Row>

            </Container>

          </main>
        </ScrollHandler>

        <style jsx>{`

            .hero {
              height: 350vh;
              color: #ffffff;
            }

            .scroll-icon {
              position: absolute;
              bottom: 24px;
              width: 100%;
              margin: 0 auto;
            }

            .scroll-icon.fix {
              position: fixed;
            }

            @keyframes arrow {
              0% { opacity: 0 }
              40% { opacity: 1 }
              80% { opacity: 0 }
              100% { opacity: 0 }
            }

            polyline.arrowBottom {
              animation: arrow 2s infinite;
            	animation-delay: 0s;
            }

            polyline.arrowMiddle {
              animation: arrow 2s infinite;
            	animation-delay: -.5s;
            }

            polyline.arrowUp {
              animation: arrow 2s infinite;
            	animation-delay: -1s;
            }

            @media (min-width: 576px) {
              .hero {
                height: 210vh;
              }
            }

            .container {
              z-index: 1;
            }

            .plugins-link {
              text-align: center;
            }

            .homepage :global(.ux),
            .homepage :global(.ui)
            .homepage :global(.links) {
              min-height: 70vh;
            }

            .homepage :global(.code) {
              text-align: center;
              padding-top: 50vh;
            }

            .hero {
              text-align: center;
            }

            .scroll-view {
              position: fixed;
              top: 0;
              width: 100%;
              height: 100vh;
              transition: opacity 500ms cubic-bezier(0.4, 0.0, 0.2, 1);
              opacity: 0;
              z-index: -1;
            }

            .scroll-view .main-name {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
            }

            .scroll-view .baseline {
              width: 85vw;
              margin: 50vh auto 0 auto;
              padding-top: 48px;
            }

            .scroll-view h1 {
              margin-top: 50vh;
              padding-top: 16px;
              transition: letter-spacing 3s ease 100ms;
              letter-spacing: .6em;
            }

            .scroll-view.fix {
              position: fixed;
              top: 0;
              opacity: 1;
            }

            .scroll-view.relase {
              position: absolute;
              opacity: 0;
            }
            .scroll-view.fix h1 {
              letter-spacing: .12em;
            }

            h1 {
              font-family: sans-serif;
              font-size: 24px;
              font-size: 5.9vw;
              text-transform: uppercase;
            }

            @media (min-width: 576px) {
              h1 {
                font-size: 32px;
                letter-spacing: .9em;
              }
            }

            h2 {
              text-align: center;
              font-family: sans-serif;
              font-size: 48px;
            }

            @media (min-width: 576px) {
              h2 {
                text-align: center;
                font-family: sans-serif;
                font-size: 96px;
              }
            }

            .hello {
              font: 15px Helvetica, Arial, sans-serif;
              background: #ffffff;
              opacity: 0;
              padding: 100px;
              text-align: center;
              transition: 100ms ease-in background;
            }

            .hello:hover {
              background: #ccc;
            }

            .intro, .contact {
              margin: 0 auto;
              max-width: 860px;
            }

            .intro p, .contact p {
              font-size: 24px;
            }

            @media (min-width: 576px) {
              .intro p, .contact p {
                font-size: 48px;
              }
            }

            :global(a:hover), :global(a:active), :global(a:focus) {
              text-shadow: #ffffff 0 0 10px;
            }

            .github {
              font-size: 0.6666em;
              text-align: center;
              color: #5576A6;
            }

            .social-links {
              text-transform: capitalize;
            }


            `}</style>

      </Layout>
    );
  }
}
