import type { ReactElement } from 'react'

import Image from 'next/image'
import TFNLink from '../components/TFNLink'
import LoadingIcon from '../components/LoadingIcon'
import Layout from '../components/Layout'
import styles from './schedule-thank-you.module.scss'
import ArticleLayout from '../components/ArticleLayout'
import ThankYouImage from '../../public/images/woman-yoga.jpg'

const ScheduleThankYouPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgColumn}>
        <div>
          <Image
            src={ThankYouImage}
            alt="Woman doing yoga"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className={styles.contentColumn}>
        <h2>
          Thank you for requesting an Company Insurance plan comparison.
        </h2>
        <LoadingIcon />
        <div className={styles.content}>
          <p>A licensed insurance agent will call you shortly.</p>
          <p>
            <strong>
              Or give us a call to speak with a licensed insurance agent now.
            </strong>
          </p>
        </div>
        <div className={styles.emptySpace}></div>
        <div className={styles.contentTfn}>
          <p>
            <TFNLink isLarge className={styles.tfnLargeOverwrite} />
            <br />
            Mon-Fri 9 AM-6 PM ET
          </p>
        </div>
      </div>
    </div>
  );
}

ScheduleThankYouPage.getLayout = function getLayout(page: ReactElement){
  return (
      <Layout title="Company Slogan | Thank You | Company">
          <ArticleLayout>{page}</ArticleLayout>
      </Layout>
  )
}
export default ScheduleThankYouPage
