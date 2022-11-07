import React from 'react';
import LoadingIcon from './LoadingIcon';
import styles from './LoadingOverlay.module.scss'

const LoadingOverlay = () =>
    <div className={styles.loading_overlay}>
        <h2>Processing your request</h2>
        <LoadingIcon />
    </div>

export default LoadingOverlay;
