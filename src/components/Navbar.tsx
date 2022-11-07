import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/images/logoipsum-logo-two.svg'
import { uiContext } from '../state/ui.context'
import TFNLink from './TFNLink'
import styles from './Navbar.module.scss'

const Navbar = () => {
  const { isFixedHeader, setIsFixedHeader } = React.useContext(uiContext);
  const [tick, setTick] = useState(false);
  const [lastPageYOffset, setLastPageYOffset] = useState(0);
  const [boundary, setBoundary] = useState(99999);
  const bannerDiv = useRef<HTMLInputElement>();
  const headerDiv = useRef<HTMLInputElement>();

  useEffect(() => {
    if (tick) { return }
    setTimeout(function () {
      if (headerDiv && headerDiv.current && headerDiv.current.getBoundingClientRect) {
        const newVal = lastPageYOffset >= boundary;
        if (newVal !== isFixedHeader) {
          setIsFixedHeader(newVal)
        }
      }
      setTick(false);
    }, 16)
  }, [tick, lastPageYOffset, boundary, isFixedHeader, setIsFixedHeader])


  useEffect(() => {
    const onScroll = () => {
      setLastPageYOffset(window.pageYOffset);
      if (!tick) {
        setTick(true);
      }
    }

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    setBoundary(headerDiv.current.getBoundingClientRect().y)

    return () => { window.removeEventListener('scroll', onScroll); }
  }, [tick])

  return (<>
    <div className={styles.topBanner} ref={bannerDiv}>
      <p className={styles.siteDescription}>Company® proudly sells Type insurance plans.</p>
    </div>
    <header id="header" className={`${styles.header} ${isFixedHeader ? styles.fixed : ''}`} ref={headerDiv}>
      <div className={styles.twoColumn}>
        <div className={styles.headerLeft}>
          <Link href="/" rel="home" aria-current="page" passHref>
            <a className={styles.customLogoLink}><Image src={logo} alt="Company Logo | Company, home" layout="intrinsic" width="250" height="60" /></a>
          </Link>
        </div>
        <div className={styles.headerRight}>
          <TFNLink colorType="alt" />
          <div>Mon-Fri 9 AM-6 PM ET</div>
        </div>
      </div>
    </header>
  </>
  )
}

export default Navbar
