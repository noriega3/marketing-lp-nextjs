import React from 'react';
import styles from './ProgressBar.module.scss'

type ProgressBarProps = {
    value: number
    valueMax?: number
    title?: string
    className?: string
}

const ProgressBar = ({className, value, valueMax = 100, title = "Form Progress"}: ProgressBarProps) =>
    <div className={`${styles.progress_container} ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin={value} aria-valuemax={valueMax} title={title}>
        <div className={styles.progress_area}></div>
    </div>

export default ProgressBar;
