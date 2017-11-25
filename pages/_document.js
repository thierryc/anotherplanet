import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

// ---------------------------------------------

export default class CustomDocument extends Document {
  render () {
    return (<html lang='en-US'>
      <Head>


      </Head>

      <body>
        <Main />
        <NextScript />
        <style jsx global>{`

          @font-face {
            font-family: 'DejaWeb';
            font-weight: normal;
            font-style: normal;
            src: url('DejaWeb.eot'); /* IE9 Compat Modes */
            src:
              local('DejaWeb Regular'),
              local('DejaWeb-Regular'),
              local('DejaWeb'),
              url('/static/css/fonts/DejaWeb.eot') format('eot'),
              url('/static/css/fonts/DejaWeb.woff') format('woff'),
              url('/static/css/fonts/DejaWeb.ttf') format('truetype');
          }

          @font-face {
            font-family: 'DejaWeb';
            font-weight: normal;
            font-style: italic;
            src: url('DejaWeb-Italic.eot');
            src:
              local('DejaWeb Italic'),
              local('DejaWeb-Italic'),
              url('/static/css/fonts/DejaWeb-Italic.eot') format('eot'),
              url('/static/css/fonts/DejaWeb-Italic.woff') format('woff'),
              url('/static/css/fonts/DejaWeb-Italic.ttf') format('truetype');
          }

          @font-face {
            font-family: 'DejaWeb';
            font-weight: bold;
            font-style: normal;
            src: url('DejaWeb-Bold.eot');
            src:
              local('DejaWeb Bold'),
              local('DejaWeb-Bold'),
              url('/static/css/fonts/DejaWeb-Bold.eot') format('eot'),
              url('/static/css/fonts/DejaWeb-Bold.woff') format('woff'),
              url('/static/css/fonts/DejaWeb-Bold.ttf') format('truetype');
          }

          @font-face {
            font-family: 'DejaWeb';
            font-weight: bold;
            font-style: italic;
            src: url('DejaWeb-BoldItalic.eot');
            src:
              local('DejaWeb Bold Italic'),
              local('DejaWeb-BoldItalic'),
              url('/static/css/fonts/DejaWeb-BoldItalic.eot') format('eot'),
              url('/static/css/fonts/DejaWeb-BoldItalic.woff') format('woff'),
              url('/static/css/fonts/DejaWeb-BoldItalic.ttf') format('truetype');
          }

          html {
            font-family: 'DejaWeb', Sans-Serif;
            quotes: "“" "”";
          }

          body {
            font-family: 'DejaWeb';
            background-color: #282d47;
            color: #cdd3db;
            padding: 0;
            margin: 0;
            font-synthesis: none;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            -moz-font-feature-settings: 'liga', 'kern';
            direction: ltr;
            text-align: left;
            font-size: 18px;
            line-height: 1.4446;
            font-weight: 400;
            letter-spacing: 0em;
            font-style: normal
          }

          a {
            color: #FFFFFF;
            text-decoration: none;
          }

          span.xs-inline {
            display: none;
          }

          span.xs-inline-none {
            display: inline;
          }

          @media (max-width: 575px) {
            span.xs-inline {
              display: inline;
            }
            span.xs-inline-none {
              display: none;
            }
          }

        `}</style>
      </body>
    </html>)
  }
}
