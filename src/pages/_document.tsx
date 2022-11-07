import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
            <meta charSet="utf-8" />
            <link rel="profile" href="https://gmpg.org/xfn/11" />
            <link rel="preconnect" href="https://fonts.gstatic.com/" />
            <meta name="robots" content="noindex, nofollow" />
            <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=optional" />
            <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap" />
            <link rel="icon" href="/static/logoipsum-icon.bmp" sizes="32x32" />
            <link rel="icon" href="/static/logoipsum-icon.bmp" sizes="192x192" />
            <link rel="apple-touch-icon" href="/static/logoipsum-icon.bmp" />
            <meta name="msapplication-TileImage" content="/static/logoipsum-icon.bmp" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
