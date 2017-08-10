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
  constructor(props) {
    super(props)
    this.state = {scrollY: 0, viewport: {
      w: 0,
      h: 0
    }}
    this.scrollHandler = this.scrollHandler.bind(this)
    this.getViewport = this.getViewport.bind(this)
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
                <p className='hello'>Hello world! {this.state.scrollY}</p>
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
                            <span><a href={ item.link } target="_blank" className="social-links">{item.name}</a>{end}</span>
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
              position: fixed;
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
