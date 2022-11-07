import React, { useRef, useState } from 'react';

export interface IUIContext {
    isFixedHeader: boolean,
    contentDiv: any,
    setIsFixedHeader: (data: any) => void
}

export const useUi = (): IUIContext => {
  const [isFixedHeader, setIsFixed] = useState(false);
  const contentDiv = useRef(null)

  const setIsFixedHeader = React.useCallback((data) => {
    setIsFixed(data);
  }, []);

  return {
    isFixedHeader,
    contentDiv,
    setIsFixedHeader
  };
};