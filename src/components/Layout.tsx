import React, { ReactNode } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'

type Props = {
  children?: ReactNode
  title?: string
  description?: string
}

const Layout = ({ children, title = 'Company Insurance Plan | Company', description = '' }: Props) => {

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
      </Head>
      <Navbar />
      {children}
      <footer id="colophon" className="site-footer">
        <div className="container">
          <div className="content">
            <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Tellus elementum sagittis vitae et leo duis ut diam. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Quisque sagittis purus sit amet volutpat. Sed augue lacus viverra vitae congue. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Odio ut enim blandit volutpat maecenas. In vitae turpis massa sed elementum tempus egestas sed. Leo duis ut diam quam. Sociis natoque penatibus et magnis dis parturient montes. In egestas erat imperdiet sed euismod nisi porta lorem. Sit amet aliquam id diam. Ultrices gravida dictum fusce ut placerat orci nulla. Nisl condimentum id venenatis a condimentum vitae sapien.</p>
              <p><a href="#" className="white-link" aria-describedby="ext-link-am" target="_blank" rel="noopener noreferrer"><u>Non-Discrimination Disclaimer</u></a></p>
              <p><span id="ext-link-am" style={{ display: "none" }} aria-hidden="true">This link opens a new window towards Company.com`&apos;`s non discrimination disclaimer</span></p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="cms-approval">Approval_code_here</div>
            <div className="copyright">Owned and operated by ©2099 Company<sup>®</sup>, all rights reserved.</div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Layout
