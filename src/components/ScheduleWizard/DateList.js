import React, { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns-tz'
import { scheduleContext } from '../../state/schedule.context';
import LoadingIcon from '../LoadingIcon';
import styles from './DateList.module.scss';

const DateList = () => {
    const { availableDates, nextAvailableDay, isTodayOfficeTime, isASAPEligible } = useContext(scheduleContext);
    const { register, getValues, setValue, formState: { errors } } = useFormContext();
    const dateValue = getValues('date');

    useEffect(() => {
        if (!dateValue && availableDates.length > 0) { //When defaulting to '2nd option', then use nextAvailableDay
            console.info('Setting date to ',format(availableDates[0], 'yyyy-MM-dd'))
            setValue('date', format(availableDates[0], 'yyyy-MM-dd'));
        }
    }, [dateValue, availableDates, setValue])



    if (availableDates.length < 1 || !nextAvailableDay) {
        return <LoadingIcon size="button" />
    }

    const createDateItem = (value, title, caption) => (
        <label key={value} className={`${styles.option} ${dateValue === value ? styles.option_selected : ''}`}>
            <input aria-checked={dateValue === value ? "true" : "false"} {...register("date", { required: true })} type="radio" defaultValue={value} />
            <div className={styles.selector}>
                <span className="day-of-week">{title}</span>
                <span className="month-day">{caption}</span>
            </div>
        </label>)


    return (
        <fieldset className={`${styles.date_container} ${errors?.date ? styles.has_error : ''}`}>
            <legend className={styles.form_legend}>Select a date</legend>
            <div className={styles.date_input_container}>
                {availableDates.map((d) => {
                    if (isTodayOfficeTime(d) && isASAPEligible) return createDateItem(format(d, 'yyyy-MM-dd'), 'Today', 'ASAP')
                    return createDateItem(format(d, 'yyyy-MM-dd'), format(d, 'eee'), format(d, 'MMM d'))
                })}
            </div>
            {errors?.date && <span className="zcr__error" role="alert">Error: Please select a valid date</span>}
        </fieldset>
    )


}
export default DateList;
