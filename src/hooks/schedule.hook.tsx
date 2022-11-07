import React from 'react';
import type { ScheduleFormData } from '../interfaces'
import utcToZonedTime from 'date-fns-tz/utcToZonedTime'
import format from 'date-fns-tz/format'
import parse from 'date-fns/parse'
import add from 'date-fns/add'
import isSameDay from 'date-fns/isSameDay'
import isDate from 'date-fns/isDate'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import { isAfter, isBefore, isWeekend, set } from 'date-fns';
import { useRouter } from 'next/router';
import { useTracking } from 'react-tracking';
import {SCHEDULE_DEFAULT_VALUE} from '../state/schedule.context'
import { useForm } from 'react-hook-form';

export interface IScheduleContext {
  apiStatus: string;
  apiToken: string;
  step: string;
  prevStep: string;
  progress: number;
  zip: string;
  fips: string;
  fipsList: string[];
  zipData: object;
  formData: ScheduleFormData;
  submissionError: string;
  sessionExpired: boolean;
  availableDates: any;
  nextAvailableDay: any;
  isASAPEligible: boolean;
  getSubmissionToken: () => void;
  getZipEligibility: (data: object) => void;
  setAPIStatus: (data: string) => void;
  setAPIToken: (data: string) => void;
  setZip: (data: string) => void;
  setFips: (data: string) => void;
  setZipData: (data: string) => void;
  setFormData: (data: object) => void;
  resetFormData: () => void;
  resetFormInfoData: () => void;
  setSubmissionError: (data: string) => void;
  setSessionExpired: (data: boolean) => void;
  setCurrentStep: (data: string) => void;
  setPreviousStep: (data: string) => void;
  setProgressStep: (data: string) => void;
  setAvailableDates: (data: Date) => void;
  setNextAvailableDay: (data: string) => void;
  isTodayOfficeTime: (data: string) => void;
}

function getZipEligibilityAPIData(url: string) {
  /*return fetch(url, {
      headers: { 
        "Content-Type": "application/json", 
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains"
      },
      mode: 'cors',
      method: "GET"
  })*/

  //mock the api call
  return new Promise((res) => {
    setTimeout(() => res({
      json: () => { return {"url": url, "code":"zcr_200","fips": [], "message":"Found eligible zip 32224","data":{"zip":"32224","state_abbr":"FL","state_name":"Florida","county_name":"Duval","county_fips":"12031","city_name":"Jacksonville","timezone":"America\/New_York","test":2}} }
    }), 1000)
   })

}

function getAPIToken() {
  /*return fetch('https://test.com/api/token/?apiKey=' + process.env.ENV FILE, {
    headers: {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    mode: 'cors',
    method: "GET"
  })*/

  return new Promise((res) => {
    setTimeout(() => res({
      json: () => { return { data: { token: "123"} } }
    }), 1000)
   })
}

export const useSchedule = (): IScheduleContext => {
  const router = useRouter();
  const {reset} = useForm<ScheduleFormData>();
  const [step, setStep] = React.useState('');
  const [apiToken, setRawToken] = React.useState('');
  const [prevStep, setPrevStep] = React.useState('');
  const [progress, setProgress] = React.useState(15)
  const [zip, setRawZip] = React.useState('');
  const [fips, setRawFips] = React.useState('');
  const [zipData, setRawZipData] = React.useState({});
  const [formData, setFormUserData] = React.useState(SCHEDULE_DEFAULT_VALUE.formData)
  const [submissionError, setRawSubmissionError] = React.useState('')
  const [sessionExpired, setRawSessionExpired] = React.useState(true)
  const [nextAvailableDay, setNextDay] = React.useState('')
  const [availableDates, setRawAvailableDates] = React.useState([])
  const [officeTime, _] = React.useState(utcToZonedTime(new Date(), 'America/Chicago'))
  const [apiStatus, setRawAPIStatus] = React.useState('idle')
  const [isASAPEligible, setIsASAPEligible] = React.useState(false);
  const { trackEvent } = useTracking({ form: 'schedule-zip-form' })
  const [fipsList, setFipsList] = React.useState([]);

  const setAPIStatus = React.useCallback((data) => {
    setRawAPIStatus(data)
  }, [])

  const setAPIToken = React.useCallback((data) => {
    setRawToken(data)
  }, [])

  const setZip = React.useCallback((data) => {
    setRawZip(data);
  }, [])

  const setFips = React.useCallback((data) => {
    setRawFips(data);
  }, [])

  const setZipData = React.useCallback((data) => {
    setRawZipData(data);
  }, [])

  
  const setCurrentStep = React.useCallback((nextStep) => {
    setStep(nextStep);
  }, []);
  
  const setPreviousStep = React.useCallback((data) => {
    setPrevStep(data);
  }, []);

  const setSubmissionError = React.useCallback((data: string) => {
    setRawSubmissionError(data);
  }, []);
  
  const setProgressStep = React.useCallback((data) => {
    setProgress(data);
  }, []);

  const setFormData = React.useCallback((data) => {
    
    if(data.zip && zip !== data.zip){
        setZip(data.zip);
        setFips(data.fips || '');
    }
    setFormUserData((prevState)=> { 
          return {...prevState, ...data} 
        }
    );
  }, [setFips, setZip, zip]);

  const resetFormData = React.useCallback(() => {

    setSubmissionError('');
    setZip(SCHEDULE_DEFAULT_VALUE.zip);
    setFips(SCHEDULE_DEFAULT_VALUE.fips);
    setFormData(SCHEDULE_DEFAULT_VALUE.formData);
    reset(SCHEDULE_DEFAULT_VALUE.formData); 
    
  }, [reset, setFips, setFormData, setSubmissionError, setZip]);


  const resetFormInfoData = React.useCallback(() => {
    setSubmissionError('');
    setFormUserData((prevState)=> { 
          return {...prevState, firstName: '', lastName: '', phone: '' } 
        }
        );
        reset({...formData, firstName: '', lastName: '', phone: ''}); 

  }, [formData, reset, setSubmissionError]);



  const setSessionExpired = React.useCallback((data: boolean) => {
    setRawSessionExpired(data);
  }, []);

  const getASAPEligible = React.useCallback(() => {
    const officeOpen = set(officeTime, { hours: 7, minutes: 50 })
    const officeClose = set(officeTime, { hours: 16, minutes: 30 })

    let isBeforeASAP = false;
    let isAfterASAP = false;

    //TODO: make dynamic for AEP to inc saturday ie isSaturday date-fns
    if (!isWeekend(officeTime)) {
      isBeforeASAP = isBefore(officeTime, officeOpen)
      isAfterASAP = isAfter(officeTime, officeClose)
    }
    return { isBeforeASAP, isAfterASAP }
  },[officeTime])

  const setAvailableDates = React.useCallback((marker: Date) => {

    const DAYS_DISPLAYED = 5;
    const DAYS_AVAILABLE = { "1": "1", "2": "2", "3": "3", "4": "4", "5": "5" };
    const DAYS_KEYS = Object.keys(DAYS_AVAILABLE);
    const { isBeforeASAP, isAfterASAP } = getASAPEligible();
    const daysExcluded = ['12-24', '12-31', '07-04'];
    let nextASAPEligibleValue = false;
    if (isAfterASAP) { daysExcluded.push(format(officeTime, 'MM-dd')) }

    if ((isBeforeASAP || (!isBeforeASAP && !isAfterASAP))) {
      nextASAPEligibleValue = true;
    }
    
    const endDate = add(new Date(marker), { weeks: DAYS_DISPLAYED }); //TODO: optimize later
    const rawDatesList = eachDayOfInterval({ start: marker, end: endDate });
    const datesList = [];
    let daysLeftToDisplay = DAYS_DISPLAYED;
    let daysIndex = 0;
    do {
      if (!daysExcluded.includes(`${format(rawDatesList[daysIndex], 'MM-dd')}`)) {
        if (DAYS_KEYS.includes(`${rawDatesList[daysIndex].getDay()}`)) {
          datesList.push(rawDatesList[daysIndex]);
          daysLeftToDisplay--;
        }
      }
      daysIndex++;

    } while (daysLeftToDisplay > 0 && (daysIndex < (rawDatesList.length - 1)));

    //preselects next day when asap is not eligible
    setNextDay(format((nextASAPEligibleValue || isBeforeASAP || isAfterASAP) ? datesList[0] : datesList[1], 'yyyy-MM-dd'));
    setRawAvailableDates(datesList)
    setIsASAPEligible(nextASAPEligibleValue)
  }, [getASAPEligible, officeTime]);

  const setNextAvailableDay = React.useCallback((data) => {
    setNextDay(data);
  }, []);

  const isTodayOfficeTime = (data) => {
    let parsedDate = data;
    if (!isDate(parsedDate)) {
      parsedDate = parse(parsedDate, 'yyyy-MM-dd', new Date());
    }
    return isSameDay(parsedDate, officeTime);
  };

  const getSubmissionToken = React.useCallback(async () => {
    const resp = await getAPIToken();
    const json = await resp.json();
    setAPIToken(json.data);
    setSessionExpired(false);
  },[setAPIToken, setSessionExpired])
  
  const getZipEligibility = React.useCallback( async (data) => {
    try {
      setFormData(data);
      setAPIStatus('pending');
      const res = await getZipEligibilityAPIData(`https://test.com/api/eligibility/?zip=${data.zip}&fips=${data.fips || false}`)
      const response = await res.json();
      if (response.code) {
        switch (response.code){
          case 'zcr_200':
            trackEvent({ event: 'formSubmit', zipEligible: true, zcData: `${zip || data.zip}|${fips || data.fips}` });
            console.info('no errors, render w/ data', response);
            resetFormInfoData();
            setPrevStep('zip')
            setCurrentStep('info');
            router.push(`/schedule/wizard/info`);
            return;
          case 'zcr_202':
            setFipsList(response.fips);
            break;
          case 'zcr_400':
          case 'zcr_404':
            //trackEvent({ event: 'formSubmit', zipEligible: false, zcData: `${zip||data.zip}|${fips||data.fips}`});
            router.push('../../not-available/?z=' + data.zip)
            break;
          default:
            //trackEvent({ event: 'formSubmit', zipError: true });
            router.push('../../not-available/?z=' + data.zip)
            break;
        }
          setAPIStatus('idle');
      } else {
        throw new Error(response); //throw new Error(response || res)
      }
    } catch (err) {
        setAPIStatus('idle');
        console.error('error', err);
        if (err && err.data && err.data.code && (err.data.code === 'zcr_400' || err.data.code === 'zcr_404')) {
          //trackEvent({ event: 'formSubmit', zipEligible: false });
          router.push('../../not-available/?z=' + data.zip)
          return;
        }
        //trackEvent({ event: 'formSubmit', zipError: true });
        setSubmissionError('zip');

    }
  },[fips, resetFormInfoData, router, setAPIStatus, setCurrentStep, setFormData, setSubmissionError, trackEvent, zip])

  return {
    apiStatus,
    apiToken,
    step,
    prevStep,
    progress,
    zip,
    fips,
    fipsList,
    zipData,
    formData,
    submissionError,
    sessionExpired,
    availableDates,
    nextAvailableDay,
    isASAPEligible,
    getSubmissionToken,
    getZipEligibility,
    setAPIStatus,
    setAPIToken,
    setZip,
    setFips,
    setZipData,
    setFormData,
    resetFormData,
    resetFormInfoData,
    setSubmissionError,
    setSessionExpired,
    setCurrentStep,
    setPreviousStep,
    setProgressStep,
    setAvailableDates,
    setNextAvailableDay,
    isTodayOfficeTime
  };
};
