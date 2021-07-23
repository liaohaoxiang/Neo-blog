import React from 'react'
import Head from 'next/head';
//引用highlight样式
// import 'highlight.js/styles/dracula.css'
import '../styles/globals.css'
import '../styles/markdown.css'
import '../styles/drucula.css'

export const siteTitle = "Neo's Blog";

const App = ({ Component, pageProps }) => {
  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="liaohaoxiang,Neo's Blog,廖浩翔博客,廖浩翔"/>
        <meta name="baidu-site-verification" content="code-H3YwJ5KaQg" />
        <link rel="icon shortcut" href="/images/favicon.ico" type="image/x-icon"/>
        <meta
          name="description"
          content="廖浩翔的博客,Neo's Blog"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    <Component {...pageProps} />
    </>
  )
}

export default App
