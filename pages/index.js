import Layout from '~/components/layout'
import ReactMarkdown from 'react-markdown'

export default () => (
  <Layout>
    <div>Hello World.</div>
    <p className='hello'>Hello world!</p>

    <div>

    </div>

    <style jsx>{`

      :global(body) {
        background-color: #ffffff;
      }

      .grid {
        display: grid;

      }

      .hello {
        font: 15px Helvetica, Arial, sans-serif;
        background: #ffffff;
        padding: 100px;
        text-align: center;
        transition: 100ms ease-in background;
      }
      .hello:hover {
        background: #ccc;
      }
    `}</style>
  </Layout>
)
