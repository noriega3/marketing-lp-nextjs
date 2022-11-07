import type { ReactElement } from 'react'
import { ScheduleFormData } from '../../../interfaces'
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router'
import formatISO from 'date-fns/formatISO'
import { useTracking } from 'react-tracking';
import { FormProvider, useForm } from "react-hook-form";
import { scheduleContext } from '../../../state/schedule.context';
import { deviceContext } from '../../../state/device.context';
import Layout from '../../../components/Layout'
import ArticleLayout from '../../../components/ArticleLayout';
import ScheduleLayout from '../../../components/ScheduleLayout';
import DateList from '../../../components/ScheduleWizard/DateList';
import TimeList from '../../../components/ScheduleWizard/TimeList';
import PhoneNumberInput from '../../../components/ScheduleWizard/PhoneNumberInput';
import LoadingIcon from '../../../components/LoadingIcon';
import LoadingOverlay from '../../../components/LoadingOverlay';
import styles from './info.module.scss'

const date = new Date();
type RequestData = {
  firstName: string;
  lastName: string;
  phone: string;
  date: string;
  time: string;
  TFN: string;
  sid: string;
  zip: string;
  fips?: string;
  contactbymiddleinitial?: string;
  contactbyemail: string;
  contactbyfax?: string;
}
function sendScheduleData(token: string, requestData: RequestData) {
  /*return fetch('https://hardcodedurl.com/scheduler/v1/weblead/', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': `Bearer ${token}`,
    },
    mode: 'cors',
    method: "POST",
    body: new URLSearchParams(requestData)
  })*/
  return new Promise((res) => {
    setTimeout(() => res({
      json: () => { return { code: "crm_200", token } }
    }), 500);
   })
}
const InfoPage = () => {
  const router = useRouter();
  const { trackEvent } = useTracking({ form: 'schedule-info-form' });
  const [formStatus, setFormStatus] = React.useState('init');
  const { TFNAppt: tfn } = useContext(deviceContext);
  const { setCurrentStep, zip, availableDates, setAvailableDates, getSubmissionToken, formData, setFormData, submissionError, setSubmissionError, sessionExpired, setSessionExpired, setAPIStatus, apiToken, resetFormData } = useContext(scheduleContext);
  const methods = useForm<ScheduleFormData>();
  const { register, reset, setValue, getValues, formState: { errors, isSubmitting } } = methods;

  const onSubmit = async (data) => {
    try {
      setFormData(data);
      if (data.contactbyemail !== 'hp@tes.com' || data.contactbymiddleinitial !== '') { throw new Error('HP') }
      setAPIStatus('submitting-info');
      setSubmissionError('');
      //set is submitting true
      const res = await sendScheduleData(apiToken, {
        ...data,
        dev: 1,
        TFN: tfn,
        test: 1,
        submissionDate: formatISO(new Date()),
        sid: 'gam' //internal side id (on GF api side)
      })
      const response = await res.json();
      if (response.code) {
        if (response.code === "crm_401") {
          setSessionExpired(true);
          setAPIStatus('expired-info');
          console.info('auth error', response);
        } else if (response.error) {
          console.info('error captured on ok', response);
          trackEvent({ event: 'formSubmit', scheduleError: true, handledError: true });
          setSubmissionError('info')
          setAPIStatus('idle');
        } else if (response.code === "crm_200") {
          console.info('no errors, render w/ data', response);
          resetFormData();
          setCurrentStep('zip')
          router.push('../../schedule-thank-you/');
          setAPIStatus('idle');
        }
      } else {
        throw new Error(response || res)
      }
    } catch (err) {
      if (err) { console.info('error', err); }
      trackEvent({ event: 'formSubmit', scheduleError: true, handledError: false });
      setSubmissionError('info');
      setAPIStatus('idle');
    }
  };

  useEffect(() => {
    console.info('set pending on mount')
    setFormStatus('pending')
    return (() => { setFormStatus('init')} )
  }, [])

  useEffect(() => {
    if(formStatus === 'pending'){
      if (!zip || zip === "" ) {
        console.info('no zip found, sending back to zip page')
        setFormStatus('init') 
        router.push(`/schedule/wizard/zip`);
      } else {
        console.info('status get dates')
        setFormStatus('get-available-dates')
      }
    }

  }, [formStatus, router, zip])

  useEffect(() => {
    if(formStatus === 'get-available-dates'){
      if (availableDates.length <= 0) {
        console.info('setting dates')
        setAvailableDates(new Date());
      } else {
        console.info('status request token')
        setFormStatus('request-token')
      }
    }

  }, [formStatus, availableDates, setAvailableDates])

  useEffect(() => {
    if (formStatus === 'request-token') {
      if (apiToken !== '' && !sessionExpired) {
        console.info('existing key found, setting ready')
        setFormStatus('ready')
        setAPIStatus('idle')
      } else {
        console.info('api call requesting token')
        getSubmissionToken()
        console.info('status requested token')
        setFormStatus('requested-token')
      }
    }
  }, [formStatus, apiToken, availableDates, getSubmissionToken, sessionExpired, setAPIStatus])

  useEffect(() => {
    if (apiToken && !sessionExpired && formStatus === 'requested-token') {
      console.info('status ready')      
      setFormStatus('ready')
      setAPIStatus('idle')
    }
  }, [formStatus, apiToken, sessionExpired, setAPIStatus])

  useEffect(() => {
    if (apiToken && sessionExpired && formStatus === "ready") {
      console.info('reload page')
      setFormStatus('init') 
      setTimeout(() => { router.reload() }, 2000);
    }
  }, [apiToken, formStatus, router, sessionExpired])

  useEffect(() => {
    if(formStatus === "ready") {
      reset(formData, { keepDirty: true });
    }
  }, [formStatus, formData, reset]);

  if(formStatus !== "ready") {
    return (<LoadingOverlay />)
  }

  return (<>
    <div className={`main-content centered ${styles.info_content}`}>
      <h2>Provide your information</h2>
      <div className={styles.sub_description}>You may opt out from receiving emails, telephone calls or messages at any time. There’s no obligation to enroll.</div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} id={`schedule-info-form`} className={`schedule-form ${Object.keys(errors).length > 0 ? 'has-error' : ''}`} >
          <div className={styles.step_container}>
            {submissionError === 'info' && !sessionExpired && <div className="zcr__error">An error occurred submitting your data, please try again in a moment.</div>}
            {submissionError === 'info' && sessionExpired && <div className="zcr__error">Your session has timed out. Please refresh and try again.</div>}
            <div className={styles.name_container}>
              <div className={`${styles.form_input_container} ${styles.first_name_container} ${errors?.firstName ? styles.has_error : ''}`}>
                <label htmlFor="firstName" className={styles.form_label} >
                  <span>First name</span>
                  <input id="firstName"
                    className={styles.form_input}
                    aria-required="true"
                    aria-invalid={errors.firstName ? "true" : "false"}
                    {...register("firstName", {
                      required: true
                    })} />
                </label>
                {errors.firstName && <span className="zcr__error" role="alert">Error: Please enter a valid first name</span>}
              </div>
              <div className={`${styles.form_input_container} ${styles.last_name_container} ${errors?.lastName ? styles.has_error : ''}`}>
                <label htmlFor="lastName" className={styles.form_label}>
                  <span>Last name</span>
                  <input id="lastName"
                    className={styles.form_input}
                    aria-required="true"
                    aria-invalid={errors.lastName ? "true" : "false"}
                    {...register("lastName", {
                      required: true
                    })} />
                </label>
                {errors.lastName && <span className="zcr__error" role="alert">Error: Please enter a valid last name</span>}
              </div>
            </div>

            <div className={`${styles.form_input_container} ${styles.phone_container} ${errors?.phone ? styles.has_error : ''}`} >
              <PhoneNumberInput register={register} getValues={getValues} setValue={setValue} error={errors?.phone} />
            </div>
            <div className={`${styles.date_time_container}`}>
              <DateList />
              <TimeList />
            </div>
            <input id="contactbyfax" className={styles.special_input} type="checkbox" value="yes" tabIndex={-1} autoComplete="off" {...register("contactbyfax")} />
            <input id="contactbymiddleinitial"
              className={styles.special_input}
              aria-required="false"
              tabIndex={-1}
              {...register("contactbymiddleinitial")} />
            <input id="contactbyemail"
              className={styles.special_input}
              aria-required="true"
              tabIndex={-1}
              {...register("contactbyemail", { required: true })} />
            <button disabled={isSubmitting || formStatus !== 'ready'} className={styles.submit_button} type="submit">{(!isSubmitting && formStatus === 'ready') ? 'Get my quote' : <LoadingIcon size="button" />}</button>
          </div>
          <div className={styles.progress_wrapper} role="progressbar" aria-valuenow={100} aria-valuemin={50} aria-valuemax={100} title="Form Progress">
            <div className={styles.progress_area}></div>
          </div>
          <div className={styles.phone_disclaimer}>By entering my contact information and pressing `&quot;`Get my quote`&quot;` above, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna sit amet purus gravida. Vulputate sapien nec sagittis aliquam malesuada bibendum. Risus nullam eget felis eget nunc. Nibh mauris cursus mattis molestie. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Egestas dui id ornare arcu odio ut sem nulla pharetra. Tincidunt eget nullam non nisi and I agree to this website`&apos;`s Privacy Policy and Terms of Use.</div>
        </form>
      </FormProvider>
    </div>
  </>)
}

InfoPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Company">
      <ArticleLayout>
        <ScheduleLayout>{page}</ScheduleLayout>
      </ArticleLayout>
    </Layout>
  )
}

export default InfoPage
