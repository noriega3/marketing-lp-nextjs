import type { ReactElement } from 'react'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'
import tile1 from '../../public/images/drugs-svgrepo-com.png'
import tile2 from '../../public/images/tooth-svgrepo-com.png'
import tile3 from '../../public/images/eye-svgrepo-com.png'
import tile4 from '../../public/images/sunset-svgrepo-com.png'
import tile5 from '../../public/images/nurse-svgrepo-com.png'
import planbenefits from '../../public/images/woman-happy.jpg'
import whitelogo from '../../public/images/logoipsum-logo-one-white.svg'
import styles from './index.module.scss'
import { uiContext } from '../state/ui.context'
import TFNLink from '../components/TFNLink'
import ZipCodeInput from '../components/ZipCodeInput'

const IndexPage = () => {
    const { isFixedHeader } = React.useContext(uiContext);

    return (
        <>
            <section className={`${styles.hero} ${isFixedHeader ? styles.fixed : ''}`}>
                <div className={styles.heroBg}>
                    <div className={styles.heroContainer}>
                        <div className={styles.heroContent}>
                            <h1>Find a Medical plan that fits your needs</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <ZipCodeInput uid="1" submitText="Find a plan" />
                            <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer" aria-describedby="ext-link-am-member">Already an Company Insurance member?</a>
                            <span id="ext-link-am-member" style={{ display: "none" }} aria-hidden="true">This link opens a new window towards test.com’s member services</span>
                        </div>
                    </div>
                </div>
                <div className={styles.heroSeparator}>
                    <div className={styles.heroSeparatorContainer}>
                        <p>Speak with a licensed insurance agent | <strong><TFNLink colorType="white" /></strong> | Mon-Fri 9 AM-6 PM ET</p>
                    </div>
                </div>
            </section>
            <main>
                <article>
                    <div className={styles.entryContent}>
                        <div className={styles.contentRow}>
                            <div className={`${styles.contentWrapper} ${styles.centered}`}>
                                <h2 className={styles.tileHeader}>Company insurance plans offer some benefits <em>not</em> covered by Goverment Plan Name.</h2>
                                <div className={styles.row}>
                                    <div className={styles.tileWrapper}>
                                        <div className={styles.tile}>
                                            <div className={styles.tileLogo}>
                                                <figure>
                                                    <div className={styles.tileLogoImage}>
                                                        <Image
                                                            src={tile1}
                                                            className="vc_single_image-img attachment-medium"
                                                            alt=""
                                                            title="drugs-svgrepo-com"
                                                            layout="fixed"
                                                            width="60.078px"
                                                            height="60px"
                                                        />
                                                    </div>
                                                </figure>
                                            </div>
                                            <p className={styles.tileCaption}>Prescription Drug Coverage</p>
                                        </div>
                                        <div className={styles.tile}>
                                            <div className={styles.tileLogo}>
                                                <figure>
                                                    <div className={styles.tileLogoImage}>
                                                        <Image
                                                            src={tile2}
                                                            className="vc_single_image-img attachment-medium"
                                                            alt=""
                                                            title="tooth-svgrepo-com"
                                                            layout="fixed"
                                                            width="54.022px"
                                                            height="60px"
                                                        />
                                                    </div>
                                                </figure>
                                            </div>
                                            <p className={styles.tileCaption}>Dental Coverage</p>
                                        </div>
                                        <div className={styles.tile}>
                                            <div className={styles.tileLogo}>
                                                <figure>
                                                    <div className={`${styles.titleLogoImageEye} ${styles.tileLogoImage}`}>
                                                        <Image
                                                            src={tile3}
                                                            className="vc_single_image-img attachment-medium"
                                                            alt=""
                                                            title="eye-svgrepo-com"
                                                            layout="fixed"
                                                            width="74.844px"
                                                            height="50px"
                                                        />
                                                    </div>
                                                </figure>
                                            </div>
                                            <p className={styles.tileCaption}>Vision Coverage</p>
                                        </div>
                                        <div className={styles.tile}>
                                            <div className={styles.tileLogo}>
                                                <figure>
                                                    <div className={styles.tileLogoImage}>
                                                        <Image
                                                            src={tile4}
                                                            className="vc_single_image-img attachment-medium"
                                                            alt=""
                                                            title="sunset-svgrepo-com"
                                                            layout="fixed"
                                                            width="66.016px"
                                                            height="60px"
                                                        />
                                                    </div>
                                                </figure>
                                            </div>
                                            <p className={styles.tileCaption}>Wellness Programs</p>
                                        </div>
                                        <div className={styles.tile}>
                                            <div className={styles.tileLogo}>
                                                <figure>
                                                    <div className={styles.tileLogoImage}>
                                                        <Image
                                                            src={tile5}
                                                            className="vc_single_image-img attachment-medium"
                                                            alt=""
                                                            title="nurse-svgrepo-com"
                                                            layout="fixed"
                                                            width="60px"
                                                            height="60px"
                                                        />
                                                    </div>
                                                </figure>
                                            </div>
                                            <p className={styles.tileCaption}>24 Hour Nursing Hotline</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.row} ${styles.tileSubCaption}`}>
                                    <p>..and more.</p>
                                </div>
                                <div className={styles.row}>
                                    <Link href="/schedule/wizard/zip" title="Schedule">
                                        <button className={styles.button_primary}>Get started</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.contentRow} ${styles.bgPurple} `}>
                            <div className={`${styles.contentWrapper} ${styles.centered}`}>
                                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elie.</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<a className="white-link" href="https://www.google.com/" target="_blank" rel="noopener noreferrer" aria-describedby="ext-link-a-facts"> <u>More Company Facts</u></a></p>
                                <p><span id="ext-link-a-facts" style={{ display: "none" }} aria-hidden="true">This link opens a new window towards site.com’s more facts page</span></p>
                                <div>
                                    <Link href="/schedule/wizard/zip" title="Lorem ipsum dolor sit amet, consectetur adipiscing elie">
                                        <button className={styles.button_default}>Find your Plan</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.contentRow}`}>
                            <div className={`${styles.contentWrapper} ${styles.twoColumn}`}>
                                <div className={styles.col}>
                                    <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elie.</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <p><Link href="/schedule/wizard/zip" title="Lorem ipsum dolor sit amet, consectetur adipiscing elie" passHref>
                                        <a>Learn more about plan benefits that go beyond Original Insurance</a>
                                    </Link></p>
                                </div>
                                <div className={styles.col}>
                                    <Image src={planbenefits} width="540" height="385" alt="Plan Benefits" />
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.contentRow} ${styles.bgPurple}`}>
                            <div className={`${styles.contentWrapper} ${styles.centered}`}>
                                <Image src={whitelogo} width="300" height="69" alt="Company Logo" />
                                <h2>Request a quote online!</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <div className={styles.centeredBox}><ZipCodeInput uid="2" alt={true} className={styles.altZip} /></div>
                                <h3>Speak with a licensed agent</h3>
                                <p>
                                    <TFNLink isLarge colorType="white" />
                                </p>
                                <p>Mon-Fri 9 AM-6 PM ET</p>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        </>)
}

IndexPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Company Landing Page">
            {page}
        </Layout>
    )
}
export default IndexPage
