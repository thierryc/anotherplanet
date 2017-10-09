import {Component} from 'react'
import ReactDOM from 'react-dom'
import Head from 'next/head'
import dynamic from 'next/dynamic'
// components
import Layout from '~/components/layout'
import { Container, Row, Cell } from '~/components/grid'
import config from '../site-config'
// ScrollHandler component
import ScrollHandler from '~/components/scrollHandler'
import Spinner from '~/components/spinner'
// Styles
import Scss from '../scss/main.scss'
// SVG
import Satellite from '../svgs/satellite.svg'
import Telescope from '../svgs/telescope.svg'
// SVG Logos
import ReactLogo from '../svgs/react-logo.svg'
import NextLogo from '../svgs/next-logo.svg'
import JsLogo from '../svgs/js-logo.svg'
import SketchLogo from '../svgs/sketch-logo.svg'
import ThreejsLogo from '../svgs/threejs-logo.svg'

import ContactList from '~/components/pages/contact-list'
import { logEvent } from '../utils/analytics'

const WebGlNoSSR = dynamic(
  import('../components/webGl'),
  {
    ssr: false,
    loading: () => {
      return (
        <div className="loading">
          <Spinner backgroundColor="#282d47"/>
          <style jsx>{`
            .loading {
              margin: 10vh auto 0;
              width: 25px;
              height: 25px;
            }
          `}</style>
        </div>
      )
    }
  }
)

const DetectBrowser = dynamic(
  import('../components/detect-browser'),
  {
    ssr: false
  }
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
    this.state = {
      scrollY: scrollY,
      viewport: {
        w: 0,
        h: 0
      },
      gaViewport: false
    }
    this.scrollHandler = this.scrollHandler.bind(this)
    this.getViewport = this.getViewport.bind(this)

  }

  getInitialProps ({ req }) {
    return req
      ? { userAgent: req.headers['user-agent'] }
      : { userAgent: navigator.userAgent }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.getViewport, false )
    }
    this.getViewport();
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.getViewport, false )
    }
  }

  scrollHandler(e, last_known_scroll_position) {
    this.setState({
      scrollY: last_known_scroll_position
    });
    if(!this.state.gaViewport && last_known_scroll_position > this.state.viewport.h) {
      this.setState({
        gaViewport: true
      })
      logEvent('scroll-index', 'viewport')
    }
    if(this.state.gaViewport && last_known_scroll_position <= 0) {
      this.setState({
        gaViewport: false
      })
      logEvent('scroll-index', 'top')
    }
  }

  getViewport() {
    if (typeof window !== 'undefined') {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    this.setState({
      viewport: {
        w: w,
        h: h
      }
    });
    }
  }

  render() {
    return (
      <Layout title='Another Planet - UX / UI and Code' description='Thierry Charbonnel, UX/UI Designer based in NYC.'>
        <ScrollHandler onScrollUpdate={this.scrollHandler}>
          <main className="homepage">

            <section className='hero'>
              <WebGlNoSSR timeControl={this.state.scrollY} />
              <DetectBrowser />
              <div
                className={'scroll-view ' + ((this.state.scrollY > this.state.viewport.h) ? 'relase' : (this.state.scrollY < this.state.viewport.h) ? 'fix' : '')}
                >
                <div className='main-name'>
                  <h1>Another Planet.io</h1>
                </div>
                <div className='baseline'>
                  <p>Thierry Charbonnel <span className={ Scss.xsInlineNone }>–</span><span className={ Scss.xsInline }><br/></span> UX / UI and Code Designer<br/>
                  <span style={{ opacity: 0.5, fontSize: '0.9em' }}>NYC + Paris</span></p>
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

            <Container className="ux">
              <Row>
                <Cell tablet={8} desktop={12} align={'middle'}>
                  <div className="intro">
                    <p>I am Thierry Charbonnel, a Designer based in NYC. Specializing in <b>front-end web development</b>, prototyping and <b>UX/UI design</b>.</p>
                    <p>My focus has been on User Experience (UX), responsive design, componentized systems (atomic), graphic design, motion design and Data Visualization.</p>
                    <p>I am thinking about the intersection of technology + design.</p>
                    <p>My specialty is crafting user experiences which help businesses achieve their goals. I am passionate thinkers and makers, and I love what I do.</p>
                  </div>
                </Cell>
              </Row>
            </Container>

            <Container className="code">
              <Row>
                <Cell tablet={8} desktop={12}>
                  <Telescope />
                  <p>Beyond the scene</p>
                  <p className="github"><a href={ config.publicRepository } target="_blank" rel="noopener">Browse this React, Three.js and Next.js website code on Github</a></p>
                </Cell>
              </Row>
              <Row className="about-icons">
                <Cell phone={2} tablet={2} desktop={3}>
                  <ReactLogo />
                </Cell>
                <Cell phone={2} tablet={2} desktop={3}>
                  <NextLogo />
                </Cell>
                <Cell phone={2} tablet={2} desktop={3}>
                  <JsLogo />
                </Cell>
                <Cell phone={2} tablet={2} desktop={3}>
                  <ThreejsLogo />
                </Cell>
              </Row>
            </Container>

            <Container className="links">
              <Row>
                <Cell tablet={8} desktop={12} align={'middle'}>
                  <div className="contact">
                    <p className="icon-separator"><Satellite /></p>
                    <p>I’m always happy <a href={ config.socialLinks.email.link }>to be involved</a> into interesting projects.</p>
                    <p><b>Say hello:</b> <ContactList data={ config.socialLinks }/>
                    </p>
                  </div>
                </Cell>
              </Row>
            </Container>

          </main>
        </ScrollHandler>

        <style jsx>{`

            /* mobile first */
            .hero {
              height: 360px;
              height: 360vh;
              max-width: 100%;
              overflow: hidden;
              color: #ffffff;
              text-align: center;
            }

            /* desktop */
            @media (min-width: 576px) {
              .hero {
                height: 210vh;
              }
            }

            /*  arrow icon */
            .scroll-icon {
              position: absolute;
              bottom: 24px;
              width: 100%;
              margin: 0 auto;
            }

            .scroll-icon.fix {
              position: fixed;
            }

            /*  arrow animation */
            @keyframes arrow {
              0% { opacity: 0 }
              40% { opacity: .5 }
              80% { opacity: 0 }
              100% { opacity: 0 }
            }

            polyline.arrowBottom {
              animation: arrow 2s infinite;
            	animation-delay: 0s;
            }

            polyline.arrowMiddle {
              animation: arrow 2s infinite;
            	animation-delay: -0.5s;
            }

            polyline.arrowUp {
              animation: arrow 2s infinite;
            	animation-delay: -1s;
            }

            .homepage :global(.ux),
            .homepage :global(.ui)
            .homepage :global(.links) {
              min-height: 70vh;
            }

            .homepage :global(.code) {
              text-align: center;
              padding-top: 20vh;
              min-height: 50vh;
            }

            .homepage :global(.about-icons) {
              max-width: 1280px;
              margin: 0 auto;
            }

            .icon-separator {
              text-align: center;
            }

            .scroll-view {
              position: fixed;
              top: 0;
              width: 100%;
              height: 100vh;
              transition: opacity 500ms cubic-bezier(0.4, 0.0, 0.2, 1);
              opacity: 1;
              z-index: -1;
            }

            .scroll-view.fix {
              top: 0;
              opacity: 1;
            }

            .scroll-view.relase {
              opacity: 0;
              top: 0;
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
              transition: letter-spacing 2s 100ms cubic-bezier(0.4, 0.0, 0.2, 1);
              letter-spacing: .6em;
            }

            .scroll-view.fix h1 {
              letter-spacing: .12em;
            }

            .scroll-view.relase h1 {
              letter-spacing: .4em;;
            }

            .plugins-link {
              text-align: center;
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
              font-size: 20px;
              line-height: 32px;
            }

            @media (min-width: 576px) {
              .intro p, .contact p {
                font-size: 32px;
                line-height: 48px;
              }
            }

            :global(a) {
              border-bottom: 1px solid rgba(255,255,255,0.3)
            }

            :global(a:hover), :global(a:active), :global(a:focus) {
              text-shadow: #ffffff 0 0 10px;
            }

            .github {
              text-align: center;
            }

            `}</style>

      </Layout>
    );
  }
}
