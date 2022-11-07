import React from 'react';

export const DEVICE_DEFAULT_VALUE = {
    version: '',
    TFN: '',
    TFNpretty: '',
    TFNAppt: '',
    setTFN: (_e: string) => { },
    setTFNAppt: (_e: string) => { },
    setTFNPretty: (_e: string) => { }
};

export const deviceContext = React.createContext(DEVICE_DEFAULT_VALUE);
