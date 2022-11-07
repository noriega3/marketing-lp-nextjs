import type { ReactElement } from 'react'
import ArticleLayout from '../components/ArticleLayout'
import Layout from '../components/Layout'
import TFNLink from '../components/TFNLink'
import styles from './not-available.module.scss'

const NotAvailablePage = () => {
  return (
    <div className={styles.container}>
        <h1>Thank you for your interest in an Company Insurance Plan.</h1>
        <div>
          <p>If you’d like to speak with a licensed insurance agent, please give us a call at</p>
          <p><strong><TFNLink/></strong> | Mon-Fri 9 AM-6 PM ET</p>  
        </div>
    </div>
  )
}
NotAvailablePage.getLayout = function getLayout(page: ReactElement){
  return (
      <Layout title="Company Slogan | Not Available | Company">
          <ArticleLayout fullWidth>
          {page}
          </ArticleLayout>
      </Layout>
  )
}
export default NotAvailablePage
