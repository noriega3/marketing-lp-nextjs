import type { ReactNode } from 'react'
import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useTracking } from 'react-tracking';

import { scheduleContext } from "../state/schedule.context"
import { useForm } from "react-hook-form";
import LoadingIcon from "../components/LoadingIcon"
import styles from './ZipCodeInput.module.scss';



type ZipCodeInputProps = {
    uid?: string
    alt?: boolean
    className?: string
    submitText?: string
    autoFocus?: boolean
    children?: ReactNode
}

const ZipCodeInput = ({ uid, alt, className, children, submitText = "Get my quote", autoFocus }: ZipCodeInputProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange'
    });
    const { trackEvent } = useTracking({ form: 'schedule-zip-form' })
    const router = useRouter();
    const { query } = router;
    const { step, submissionError, zip, apiStatus, getZipEligibility, fipsList, resetFormData } = useContext(scheduleContext);
    //const [formData, setFormData] = useState({ zip: query.z, fips: query.f });
    //const [fipsList, setFipsList] = useState([]);
    //const [submissionError, setSubmissionError] = useState(false);

    const renderFipsSelection = () => (
        <div className={`${styles.fips_container} ${errors.fips ? styles.has_error : ''}`}>
            <label className={styles.form_label} htmlFor="fips">
                <span>County</span>
                <select
                    className={styles.form_input}
                    aria-label="County"
                    aria-required="true"
                    aria-invalid={errors.fips ? "true" : "false"}
                    autoFocus
                    {...register("fips", { required: true })}>
                    {fipsList.map(([id, display]) => <option key={`${id}-${zip}`} value={id}>{display}</option>)}
                </select>
            </label>
            {errors.fips && <span className="zcr__error" role="alert">Error: Please select a county</span>}

        </div>
    )

    //useEffect(() => { reset(formData, { keepDirty: true }); }, [formData, reset]);

    return (
        <div className={`${className} ${styles.root} ${alt ? styles.set_alt_colors : ''}`}>
            <div className={`step_container ${styles.container}`}>
                {submissionError ==='zip' && <div className={styles.error_general} role="alert">Error: An error occurred, please try again in a moment.</div>}
                <form id={`schedule-zip-form`} className={`schedule_zip_form ${styles.schedule_form} ${Object.keys(errors).length > 0 ? styles.has_error : ''} ${fipsList.length ? styles.has_fips : ''}`} onSubmit={handleSubmit(getZipEligibility)}>
                    <div className={`zipfipinputcontainer ${fipsList.length > 0 ? styles.zipfipinputcontainer : styles.zipinputcontainer}`} >
                        <div className={`zip_container ${errors.zip ? styles.has_error : ''} ${styles.zip_container} `}>
                            <label htmlFor={`zip-${uid}`} className={styles.form_label}><span>ZIP Code {fipsList.length > 0 && <span className="reset" onClick={() => { resetFormData() }}>(reset)</span>}</span></label>
                            <input
                                id={`zip-${uid}`}
                                className={styles.form_input}
                                aria-label="Zip Code"
                                aria-required="true"
                                aria-invalid={errors.zip ? "true" : "false"}
                                readOnly={fipsList.length > 0 || isSubmitting || apiStatus ==='pending'}
                                disabled={isSubmitting || apiStatus === 'pending'}
                                autoFocus={autoFocus}
                                {...register("zip",
                                    {
                                        required: true,
                                        minLength: 5,
                                        pattern: /^[0-9]{5}(?:-[0-9]{4})?$/,
                                    })
                                }
                            />
                            {errors.zip && <span className={styles.form_input_error} role="alert">Error: Please enter a valid 5 digit US zip</span>}
                        </div>
                        {fipsList.length > 0 && renderFipsSelection()}
                        <button className={styles.btn_submit} type="submit" disabled={isSubmitting || apiStatus ==='pending'}>{(!isSubmitting && apiStatus !== 'pending') ? submitText : <LoadingIcon size="button" />}</button>
                    </div>
                </form>
                {children}
            </div>
        </div>
    );
}
export default ZipCodeInput
