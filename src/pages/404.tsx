import Link from 'next/link'
import type { ReactElement } from 'react'
import ArticleLayout from '../components/ArticleLayout'
import Layout from '../components/Layout'
import TFNLink from '../components/TFNLink'
import styles from './404.module.scss'

const NotFoundPage = () => {
  return (
    <>
        <h1>PAGE NOT FOUND</h1>
        <div className={styles.notFoundContainer}>
          <p>Please try the following:</p>
          <ul>
            <li>
              <Link href="/" rel="home" aria-current="page" passHref >
                <a className={styles.homeLink}>Click here to go to the home page</a>
              </Link>
            </li>
            <li>Use the navigation bar above to go to a specific section of the site.</li>
            <li>If you typed the URL, make sure that it is spelled correctly.</li>
          </ul>
        </div>
        <div>
          <p>If you’d like to speak with a licensed agent, please give us a call at</p>
          <p><strong><TFNLink/></strong> | Mon-Fri 9 AM-6 PM ET</p>  
        </div>
    </>
  )
}
NotFoundPage.getLayout = function getLayout(page: ReactElement){
  return (
      <Layout title="Company Slogan | Not Found | Company">
          <ArticleLayout className={'not-found'}>
          {page}
          </ArticleLayout>
      </Layout>
  )
}
export default NotFoundPage
