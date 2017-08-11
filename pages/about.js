import Head from 'next/head'
export default () => (
  <div>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <p>I am Thierry Charbonnel a freelance designer, web developer and creative technologist based in NYC.</p>
    <p>I work with a variety of technologies including JavaScript, WebGL, SVG, Node, Python.</p>
    <p>I also do graphic design and motion design, Video and Typography.</p>
    <p>I live in NYC with my wife and my kid.</p>

    <style jsx>{`
      p {
        color: red;
      }
    `}</style>
  </div>
)
