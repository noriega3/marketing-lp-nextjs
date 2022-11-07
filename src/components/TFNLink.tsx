import React from 'react'
import Link from 'next/link'
import { deviceContext } from '../state/device.context'
import styles from './TFNLink.module.scss'

type TFNLinkProps = {
  className?: string;
  isLarge?: boolean;
  colorType?: "white" | "alt" | "primary";
}

const TFNLink = ({className = '', isLarge = false, colorType}: TFNLinkProps) => {
  const {TFN, TFNpretty}= React.useContext(deviceContext);
  const colorClass = colorType ? styles[colorType] : ''; 
  return (<Link href={`tel:${TFN}`}><a className={`${styles.tfnLink} ${isLarge ? styles.tfnLarge : ''} ${colorClass} ${className}`}>{TFNpretty} TTY:711</a></Link>)
}

export default TFNLink
