import dynamic from 'next/dynamic'
// components
import Layout from '~/components/layout'
import { Container, Row, Cell } from '~/components/grid'
import config from '../site-config'
// ScrollHandler component
import ScrollHandler from '~/components/scrollHandler'
// Styles
import Scss from '../scss/main.scss'
// SVG Logos
import ReactLogo from '../svgs/react-logo.svg'
import NextLogo from '../svgs/next-logo.svg'
import JsLogo from '../svgs/js-logo.svg'
import SketchLogo from '../svgs/sketch-logo.svg'
import ThreejsLogo from '../svgs/threejs-logo.svg'

// SVG Icons
import Satellite from '../svgs/satellite.svg'
import Telescope from '../svgs/telescope.svg'

import Head from 'next/head'

export default () => (
  <div>
    <Layout title="Another Planet - About">

      <Container className="ux">
        <Row>
          <Cell tablet={8} desktop={12} align={'middle'}>
            <p>I am Thierry Charbonnel a freelance designer, web developer and creative technologist based in NYC.</p>
            <p>I work with a variety of technologies including JavaScript, WebGL, SVG, Node, Python.</p>
            <p>I also do graphic design and motion design, Video and Typography.</p>
            <p>I live in NYC with my wife and my kid.</p>
          </Cell>
        </Row>
      </Container>

      <Container className="links">
        <Row>
          <Cell tablet={8} desktop={12} align={'middle'}>
            <div className="contact">
              <p className="icon-separator"><Satellite /></p>
              <p>I’m always happy <a href={ config.socialLinks.email.link }>to be involved</a> into interesting projects.</p>
              <p><b>Say hello:</b> {
                  Object.keys(config.socialLinks).map((key, index, arr) => {
                    const item = config.socialLinks[key]
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



      <Container className="ux">
        <Row>
          <Cell tablet={8} desktop={12}>
            <Telescope />
            <h2>Beyond the scene</h2>
            <p>This website is a static website build with React and Next.js.</p>
            <p>WebGl 3D Space is created by Three.js.</p>
            <p>SVG icons and logos are created in Sketch App.</p>
          </Cell>
        </Row>

        <Row>
          <Cell phone={1} tablet={2} desktop={3}>
            <ReactLogo />
          </Cell>
          <Cell phone={1} tablet={2} desktop={3}>
            <NextLogo />
          </Cell>
          <Cell phone={1} tablet={2} desktop={3}>
            <JsLogo />
          </Cell>
          <Cell phone={1} tablet={2} desktop={3}>
            <ThreejsLogo />
          </Cell>
        </Row>
        <Row>
          <Cell phone={4} tablet={8} desktop={12}>
            <SketchLogo />
          </Cell>
        </Row>

        <Row>
          <Cell tablet={8} desktop={12}>
            <p className="github"><a href={config.publicRepository} target="_blank">Browse this website code on Github</a></p>
          </Cell>
        </Row>

      </Container>


    </Layout>


    <style jsx>{`

    `}</style>
  </div>
)
