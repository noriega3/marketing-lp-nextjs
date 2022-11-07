import React from 'react';

export const UI_DEFAULT_VALUE = {
    isFixedHeader: false,
    contentDiv: null,
    setIsFixedHeader: (_e: any) => { return }
};

export const uiContext = React.createContext(UI_DEFAULT_VALUE);
