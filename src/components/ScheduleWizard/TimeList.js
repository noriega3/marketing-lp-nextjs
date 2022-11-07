import React, { useState, useEffect, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { scheduleContext } from '../../state/schedule.context';
import styles from './TimeList.module.scss';

const TimeList = () => {
    const { isTodayOfficeTime } = useContext(scheduleContext);
    const { register, getValues, watch, formState: { errors } } = useFormContext();
    const watchDate = watch("date");
    const watchTime = watch("time");
    const timeValue = getValues('time');
    const [isTimeRequired, setTimeRequired] = useState(watchDate && !isTodayOfficeTime(watchDate))
    useEffect(() => {
        const newReq = watchDate && !isTodayOfficeTime(watchDate);
        if (newReq !== isTimeRequired) {
            setTimeRequired(newReq)
        }
    }, [watchDate, isTimeRequired, isTodayOfficeTime]);


    if (!isTimeRequired) {
        return null;
    }

    return <fieldset className={`${styles.time_container} time-container ${errors?.time ? styles.has_error : ''}`}>
        <legend className={styles.form_legend}>Time of day</legend>
        <div className={styles.time_input_container}>
            <label className={`${styles.option} ${timeValue === "morning" ? styles.option_selected : ''}`}>
                <input
                    {...register("time", { required: true })}
                    type="radio"
                    value="morning"
                    aria-checked={watchTime === "morning" ? "true" : "false"}
                />
                <div className={styles.selector}>
                    <span className="time-of-day">Morning</span>
                </div>
            </label>
            <label className={`${styles.option} ${timeValue === "afternoon" ? styles.option_selected : ''}`}>
                <input
                    {...register("time", { required: true })}
                    type="radio"
                    value="afternoon"
                    aria-checked={watchTime === "afternoon" ? "true" : "false"}
                />
                <div className={styles.selector}>
                    <span className="time-of-day">Afternoon</span>
                </div>
            </label>
        </div>
        {errors?.time && <span className="zcr__error" role="alert">Error: Please select a valid time</span>}
    </fieldset>


}
export default TimeList;
