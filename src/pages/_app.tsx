import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { deviceContext } from '../state/device.context';
import { scheduleContext } from '../state/schedule.context';
import { uiContext } from '../state/ui.context';
import { useDevice } from '../hooks/device.hook';
import { useSchedule } from '../hooks/schedule.hook';

import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'
import '../styles.css'
import './App.scss'

import { useUi } from '../hooks/ui.hook';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const device = useDevice();
  const schedule = useSchedule();
  const ui = useUi();

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <deviceContext.Provider value={device}>
      <scheduleContext.Provider value={schedule}>
        <uiContext.Provider value={ui}>
          {getLayout(<Component {...pageProps} />)}
        </uiContext.Provider>
      </scheduleContext.Provider>
    </deviceContext.Provider>
  )
}

export default MyApp;
