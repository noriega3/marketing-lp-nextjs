import React from 'react';
import styles from './LoadingIcon.module.scss'

type LoadingIconProps = {
    size?: "default" | "button"
}

const LoadingIcon = ({size = 'default'}: LoadingIconProps) =>
    <div className={`${styles.loading_rects} ${size === 'button' ? styles.button : ''}`}>
        <div className={`${styles.rect_1} ${styles.rect}`}></div>
        <div className={`${styles.rect_2} ${styles.rect}`}></div>
        <div className={`${styles.rect_3} ${styles.rect}`}></div>
    </div>

export default LoadingIcon;
