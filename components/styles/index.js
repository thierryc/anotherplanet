import defaultTheme from '../Next-React-Components/ap-layout-grid/default-theme'

export default () => (
  <div>
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
        font-family: 'DejaWeb', Sans-Serif;
        padding: 0;
        margin: 0;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -moz-font-feature-settings: 'liga', 'kern';
        direction: ltr;
        text-align: left;
        font-size: 16px;
        line-height: 1.4446;
        font-weight: 400;
        letter-spacing: 0em;
        font-style: normal
      }

/*    utils */
      .xs-inline {
        display: inline;
      }

      .xs-block {
        display: block;
      }

      .xs-block-none,
      .xs-inline-none {
        display: none;
      }

/*    tablet + desktop */
      @media (min-width: ${defaultTheme.tablet.breakpoints}px) {
        .xs-inline,
        .xs-block {
          display: none;
        }

        .xs-inline-none {
          display: inline;
        }

        .xs-block-none {
          display: block;
        }
      }

/*    tablet */
      @media (min-width: ${defaultTheme.tablet.breakpoints}px) and (max-width: ${(defaultTheme.desktop.breakpoints - 1)}px) {

      }

/*    desktop */
      @media (min-width: ${defaultTheme.desktop.breakpoints}px) {

      }

      @media only print
      {
        body {
          background-color: #FFFFFF;
          color: #000000;
        }
        body:after { content: "Than you to print this page!"; }
      }

    `}</style>
  </div>
)
