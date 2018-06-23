import { Component } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
// utils
import { logEvent, outboundEvent } from '../utils/analytics'
// Config
import config from '../site-config'
// Components
import Layout from '../components/layout'
import ScrollHandler from '../components/scrollHandler'
import { Container, Row, Cell } from '../components/Next-React-Components/ap-layout-grid'
import ContactList from '../components/pages/contact-list'
import GlobalStyles from '../components/styles'
import defaultTheme from '../components/Next-React-Components/ap-layout-grid/default-theme'
import ScrollIcon from '../components/pages/scroll-icon'
// SVG
import Satellite from '../svgs/satellite.svg'
import Telescope from '../svgs/telescope.svg'
// SVG Logos
import ReactLogo from '../svgs/react-logo.svg'
import NextLogo from '../svgs/next-logo.svg'
import JsLogo from '../svgs/js-logo.svg'
import SketchLogo from '../svgs/sketch-logo.svg'
import ThreejsLogo from '../svgs/threejs-logo.svg'

const DetectBrowser = dynamic(
  import('../components/detect-browser'),
  {
    ssr: false,
    loading: () => {
      return (
        <div className="loading">
        </div>
      )
    }
  }
)

const WebGlNoSSR = dynamic(
  import('../components/webGl'),
  {
    ssr: false,
    loading: () => {
      return (
        <div className="loading">
        </div>
      )
    }
  }
)

export default class Index extends Component {
  static async getInitialProps ({ query }) {
    const pathname = query.slug || '/'
    return { pathname }
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

  render () {
    return (
      <Layout>
        <Head>
          <title>Another Planet - UX / UI and Code Designer</title>
          <meta name="description" content='Thierry Charbonnel, UX/UI Designer based in NYC. Specializing in front-end web development, prototyping and UX/UI design.'/>
          <script>{`
window['_fs_debug'] = false;
window['_fs_host'] = 'fullstory.com';
window['_fs_org'] = 'CY2CS';
window['_fs_namespace'] = 'FS';
(function(m,n,e,t,l,o,g,y){
    if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
    g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];
    o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';
    y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
    g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};
    g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
    g.consent=function(a){g("consent",!arguments.length||a)};
    g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
    g.clearUserCookie=function(){};
})(window,document,window['_fs_namespace'],'script','user');`
          }</script>
        </Head>
        <ScrollHandler onScrollUpdate={this.scrollHandler}>
          <main className="homepage">

            <section className='hero'>
              <WebGlNoSSR scrollcontrol={this.state.scrollY} className='webGlBg' />
              <DetectBrowser />
              <div
                className={'scroll-view ' + ((this.state.scrollY < this.state.viewport.h) ? 'fix' : 'relase' )}
                >
                <div className='main-name'>
                  <h1>Another Planet.io</h1>
                </div>
                <div className='baseline'>
                  <p>Thierry Charbonnel <span className={ 'xs-inline-none' }>– </span><br className={ 'xs-inline' }/>UX / UI and Code Designer<br/>
                  <span style={{ opacity: 0.5, fontSize: '0.9em' }}>NYC + Paris</span></p>
                </div>
              </div>
              <div className='scroll-icon'>
                <ScrollIcon scrollcontrol={this.state.scrollY} />
              </div>
            </section>

            <Container className="ux">
              <Row>
                <Cell tablet={8} desktop={12} align={'middle'}>
                  <div className="intro">
                    <p>I am Thierry Charbonnel, a Designer based in NYC. Specializing in <b>front-end web development</b>, prototyping and <b>UX/UI design</b>.</p>
                    <p>My focus has been on User Experience (UX), responsive design, componentized systems (atomic), graphic design, motion design and data visualization.</p>
                    <p>I think about the intersection of <nobr>technology + design.</nobr></p>
                    <p>My specialty is crafting user experiences which help businesses achieve their goals. I am a passionate thinker and maker, and I love what I do.</p>
                  </div>
                </Cell>
              </Row>
            </Container>

            <Container className="code">
              <Row>
                <Cell tablet={8} desktop={12}>
                  <Telescope />
                  <p>Beyond the scene</p>
                  <p className="github"><a href={ config.publicRepository } onClick={outboundEvent} target="_blank" rel="noopener">Browse this React, Three.js and Next.js website code on Github</a></p>
                </Cell>
              </Row>
              <Row className="about-icons">
                <Cell phone={2} tablet={4} desktop={3}>
                  <a href="https://reactjs.org/" onClick={outboundEvent} title="React is a JavaScript library for building user interfaces"><ReactLogo /></a>
                </Cell>
                <Cell phone={2} tablet={4} desktop={3}>
                  <a href="https://github.com/zeit/next.js/" onClick={outboundEvent} title="Next.js is a minimalistic framework for server-rendered React applications."><NextLogo /></a>
                </Cell>
                <Cell phone={2} tablet={4} desktop={3}>
                  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" onClick={outboundEvent} title="JavaScript (JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions."><JsLogo /></a>
                </Cell>
                <Cell phone={2} tablet={4} desktop={3}>
                  <a href="https://threejs.org" onClick={outboundEvent} title="three.js is a WebGl framework."><ThreejsLogo /></a>
                </Cell>
              </Row>
            </Container>

            <Container className="links">
              <Row>
                <Cell tablet={8} desktop={12} align={'middle'}>
                  <p className="icon-separator"><Satellite /></p>
                  <div className="contact">
                    <p>I’m always happy <a onClick={outboundEvent} href={ config.socialLinks.email.link }>to be involved</a> into interesting projects.</p>
                    <p>
                      <b>Say hello:</b> <ContactList data={ config.socialLinks }/>
                    </p>
                  </div>
                </Cell>
              </Row>
            </Container>
          </main>
        </ScrollHandler>
        <GlobalStyles />
        <style jsx>{`

            :global(body){
              background-color: #282d47;
              color: #cdd3db;
            }

            a {
              color: #FFFFFF;
              text-decoration: none;
            }

/*           mobile first */
            .hero {
              height: 360px;
              height: 360vh;
              max-width: 100%;
              overflow: hidden;
              color: #ffffff;
              text-align: center;
            }

/*          desktop */
            @media (min-width: 576px) {
              .hero {
                height: 210vh;
              }
            }

/*           arrow icon */
            .scroll-icon {
              position: absolute;
              bottom: 24px;
              width: 100%;
              margin: 0 auto;
            }

            .scroll-icon.fix {
              position: fixed;
            }

/*          arrow animation */
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
              position: absolute;
              top: 0;
              width: 100%;
              height: 100vh;
              transition: opacity 500ms cubic-bezier(0.4, 0.0, 0.2, 1);
              opacity: 1;
              z-index: -1;
            }

            .scroll-view.fix {
              position: fixed;
              top: 0;
              opacity: 1;
            }

            .scroll-view.relase {
              position: fixed;
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
              letter-spacing: .4em;
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

            h2 {
              text-align: center;
              font-family: sans-serif;
              font-size: 48px;
            }

            .intro, .contact {
              margin: 0 auto;
              max-width: 860px;
            }

            .intro p, .contact p {
              font-size: 20px;
              line-height: 32px;
              text-align: left;
            }

/*          tablet */
            @media (min-width: ${defaultTheme.tablet.breakpoints}px) {

              h1 {
                font-size: 32px;
                letter-spacing: .9em;
              }

              h2 {
                text-align: center;
                font-family: sans-serif;
                font-size: 64px;
              }

              .intro p, .contact p {
                font-size: 24px;
                line-height: 40px;
                text-align: center;
              }

            }

/*          desktop */
            @media (min-width: ${defaultTheme.desktop.breakpoints}px) {

              h2 {
                text-align: center;
                font-family: sans-serif;
                font-size: 96px;
              }

              .intro p, .contact p {
                font-size: 32px;
                line-height: 48px;
                text-align: center;
              }

            }

            .github {
              text-align: center;
            }

            `}</style>
      </Layout>
    )
  }
}
