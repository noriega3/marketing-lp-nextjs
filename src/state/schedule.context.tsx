import React from 'react';

export const SCHEDULE_DEFAULT_VALUE = {
    apiStatus: 'idle',
    apiToken: '',
    step: '',
    prevStep: '',
    progress: 25,
    zip: '',
    fips: '',
    fipsList: [],
    zipData: {},
    formData: { firstName: '', lastName: '', phone: '', date: '', time: '', TFN: '', contactbyemail: 'hp@tes.com' },
    submissionError: '',
    sessionExpired: true,
    availableDates: [],
    nextAvailableDay: '',
    isASAPEligible: false,
    getSubmissionToken: () => { },
    getZipEligibility: (_e: object) => { /* TODO document why this method 'getZipEligibility' is empty */  },
    setAPIStatus: (_e: string) => { },
    setAPIToken: (_e: string) => { },
    setZip: (_e: string) => { },
    setFips: (_e: string) => { },
    setZipData: (_e: string) => { },
    setFormData: (_e: object) => { },
    resetFormData: () => { },
    resetFormInfoData: () => { },
    setSubmissionError: (_e: string) => { },
    setSessionExpired: (_e: boolean) => { },
    setCurrentStep: (_e: string) => { },
    setPreviousStep: (_e: string) => { },
    setProgressStep: (_e: string) => { },
    setAvailableDates: (_e: Date) => { },
    setNextAvailableDay: (_e: string) => { },
    isTodayOfficeTime: (_e: string) => { }
};

export const scheduleContext = React.createContext(SCHEDULE_DEFAULT_VALUE);
