import React, { useEffect } from 'react';
import { getTFNWeb, formatPhone } from '../util/tfn-web';

export interface IDeviceContext {
  version: string;
  TFN: string;
  TFNpretty: string;
  TFNAppt: string;
  setTFN: (data: string) => void;
  setTFNAppt: (data: string) => void;
  setTFNPretty: (data: string) => void;
}

const DEFAULT_TFN = "8881232345"
const DEFAULT_TFN_DISPLAY = "1-888-123-2345"


export const useDevice = (): IDeviceContext => {
  const [TFN, setTFNData] = React.useState(DEFAULT_TFN);
  const [TFNAppt, setTFNApptData] = React.useState(DEFAULT_TFN);
  const [TFNpretty, setTFNDisplay] = React.useState(DEFAULT_TFN_DISPLAY);


  const setTFNAppt = React.useCallback((data) => {
    setTFNApptData(data);
  }, []);

  const setTFN = React.useCallback((data) => {
    setTFNData(data);
  }, []);

  const setTFNPretty = React.useCallback((data) => {
    setTFNDisplay(data);
  }, []);

  useEffect(() => {
    const tfn = getTFNWeb(DEFAULT_TFN)
    setTFN(tfn)
    setTFNAppt(tfn)
    setTFNPretty(formatPhone(tfn))
  }, [setTFN, setTFNAppt, setTFNPretty])

  return {
    version: process.env.REACT_APP_GIT_SHA,
    TFN,
    TFNpretty,
    TFNAppt,
    setTFN,
    setTFNAppt,
    setTFNPretty
  };
};
